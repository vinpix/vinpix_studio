/**
 * Playwright automation for https://studio.tripo3d.ai/ (image -> 3D).
 *
 * Verified flow (2026-07-02, mapped via probes — see debug/api.log):
 *   1. /workspace/generate has a hidden <input type=file accept="image/...">;
 *      setInputFiles triggers POST /v2/studio/storage/temporary_token and the
 *      file goes straight to Tripo's S3 (not through api.tripo3d.ai).
 *   2. Clicking "Generate Model" runs POST /v2/studio/audit/image then
 *      POST /v2/studio/operation/image_to_model, whose response carries
 *      {project_id, operator_id} — operator_id is the task id. The page then
 *      polls POST /v2/studio/progress {ids:[taskId]} every ~3s
 *      (progress, left_time, status running|success|failed).
 *   3. On success the page loads GET /v2/studio/project/detail/v3/{projectId}
 *      whose data.model_url is a signed CDN URL of the final PBR GLB
 *      (tripo_pbr_model_{taskId}_meshopt.glb).
 * We drive step 1-2 through the UI (auth/token handling stays the site's
 * problem) and read everything else from the page's own API traffic. The
 * returned modelUrl is handed to the lambda (updateBatch3DJob modelUrl=...),
 * which downloads + stores it to S3 server-side.
 *
 * Uses a persistent Chromium profile at ./profile — the user logs in ONCE via
 * login.sh (noVNC); the worker reuses the session headlessly afterwards.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROFILE = path.join(ROOT, "profile");
const DEBUG = path.join(ROOT, "debug");
fs.mkdirSync(DEBUG, { recursive: true });

const HEADLESS = process.env.HEADLESS !== "0";
const STUDIO_URL = "https://studio.tripo3d.ai/";
const WORKSPACE_URL = "https://studio.tripo3d.ai/workspace/generate";
const API_ORIGIN_HEADERS = {
  origin: "https://studio.tripo3d.ai",
  referer: "https://studio.tripo3d.ai/",
};

const log = (...a) => console.log(new Date().toISOString(), "[tripo]", ...a);
const loginError = (msg) => Object.assign(new Error(msg), { isLoginError: true });

async function launch() {
  const context = await chromium.launchPersistentContext(PROFILE, {
    channel: "chromium",
    headless: HEADLESS,
    viewport: { width: 1440, height: 900 },
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = context.pages()[0] || (await context.newPage());
  return { context, page };
}

async function shot(page, name) {
  try {
    await page.screenshot({ path: path.join(DEBUG, `${name}.png`) });
  } catch {}
}

async function assertLoggedIn(page, url = STUDIO_URL) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForTimeout(6_000);
  if (/login|signin|auth/i.test(page.url())) {
    throw loginError(`redirected to ${page.url()}`);
  }
  const signIn = page
    .locator("button, a")
    .filter({ hasText: /sign in|log ?in|đăng nhập/i })
    .first();
  if (await signIn.isVisible().catch(() => false)) {
    throw loginError("sign-in button visible");
  }
}

/** Cheap login probe used by the worker before touching any job. */
export async function checkLogin() {
  const { context, page } = await launch();
  try {
    await assertLoggedIn(page);
    await shot(page, "login-check");
    return { ok: true, reason: page.url() };
  } catch (e) {
    await shot(page, "login-check");
    return { ok: false, reason: e.message };
  } finally {
    await context.close().catch(() => {});
  }
}

/**
 * Full pipeline for one image. Resolves to { modelUrl, taskId } of the final
 * PBR GLB (signed CDN URL, valid long enough for the lambda to fetch it).
 * Throws { isLoginError: true } if the session is gone (job stays queued).
 */
export async function runTripoJob({ imagePath, name, onProgress = () => {} }) {
  const { context, page } = await launch();
  const tag = (name || "job").replace(/[^\w-]+/g, "_").slice(0, 40);
  try {
    // --- API traffic taps -------------------------------------------------
    let token = "";
    let projectId = "";
    let taskId = "";
    let modelUrl = "";
    let opError = "";
    const progressSeen = new Map(); // taskId -> {status, progress}

    page.on("request", (r) => {
      if (!token && /api\.tripo3d\.ai/.test(r.url())) {
        token = r.headers()["authorization"] || "";
      }
    });
    page.on("response", (r) => {
      const u = r.url();
      if (/\/v2\/studio\/progress/.test(u)) {
        r.json()
          .then((j) => {
            for (const t of j?.data || []) {
              progressSeen.set(t.id, { status: t.status, progress: t.progress ?? 0 });
            }
          })
          .catch(() => {});
      } else if (/operation\/image_to_model/.test(u)) {
        r.json()
          .then((j) => {
            if (j?.code === 0 && j?.data?.operator_id) {
              taskId = j.data.operator_id;
              projectId = j.data.project_id || "";
            } else {
              opError = `image_to_model code=${j?.code}: ${j?.message || "?"}`;
            }
          })
          .catch(() => {});
      } else if (/project\/detail\/v3\//.test(u)) {
        r.json()
          .then((j) => {
            if (j?.data?.model_url) modelUrl = j.data.model_url;
          })
          .catch(() => {});
      }
    });

    // --- 1. workspace + upload -------------------------------------------
    await assertLoggedIn(page, WORKSPACE_URL);

    const fileInput = page.locator('input[type="file"][accept*="image/png"]').first();
    await fileInput.waitFor({ state: "attached", timeout: 30_000 });
    const tokenResp = page.waitForResponse(
      (r) => /storage\/temporary_token/.test(r.url()) && r.ok(),
      { timeout: 60_000 }
    );
    await fileInput.setInputFiles(imagePath);
    await tokenResp; // upload to Tripo's S3 has started
    log(`[${tag}] image upload started`);
    await page.waitForTimeout(8_000); // direct-to-S3 upload settle
    onProgress(5);

    // --- 2. generate --------------------------------------------------------
    // clicking runs audit/image then operation/image_to_model; retry the click
    // a couple of times in case the first lands before the upload finishes
    const genBtn = page.locator("button").filter({ hasText: /generate model/i }).first();
    await genBtn.waitFor({ state: "visible", timeout: 20_000 });
    for (let attempt = 1; attempt <= 3 && !taskId && !opError; attempt++) {
      await genBtn.click().catch(() => {});
      log(`[${tag}] generate clicked (attempt ${attempt})`);
      for (let i = 0; i < 15 && !taskId && !opError; i++) await page.waitForTimeout(2_000);
    }
    if (opError) {
      await shot(page, `${tag}-op-error`);
      throw new Error(opError);
    }
    if (!taskId) {
      await shot(page, `${tag}-no-task`);
      throw new Error("generation never started (no image_to_model response)");
    }
    log(`[${tag}] task ${taskId} project ${projectId}`);
    await shot(page, `${tag}-generating`);

    // --- 3. wait for completion (page polls ~3s for us) --------------------
    const started = Date.now();
    for (;;) {
      if (Date.now() - started > 16 * 60_000) {
        await shot(page, `${tag}-timeout`);
        throw new Error(`timeout waiting for task ${taskId}`);
      }
      await page.waitForTimeout(3_000);
      const st = progressSeen.get(taskId);
      if (!st) continue;
      onProgress(5 + Math.round((st.progress / 100) * 90));
      if (st.status === "success") break;
      if (/fail|error|ban/i.test(st.status)) {
        await shot(page, `${tag}-failed`);
        throw new Error(`Tripo task ${taskId} ${st.status}`);
      }
    }
    log(`[${tag}] task success`);

    // --- 4. final model URL -------------------------------------------------
    // the page fetches project detail on success; give it a moment, then fall
    // back to calling the API ourselves with the page's own bearer token
    for (let i = 0; i < 10 && !modelUrl; i++) await page.waitForTimeout(2_000);
    if (!modelUrl && projectId && token) {
      const resp = await context.request.get(
        `https://api.tripo3d.ai/v2/studio/project/detail/v3/${projectId}`,
        { headers: { authorization: token, ...API_ORIGIN_HEADERS } }
      );
      const j = await resp.json().catch(() => null);
      modelUrl = j?.data?.model_url || "";
    }
    if (!modelUrl) {
      await shot(page, `${tag}-no-model-url`);
      throw new Error(`task ${taskId} succeeded but no model_url found`);
    }
    log(`[${tag}] model url ok (${modelUrl.split("?")[0].split("/").pop()})`);
    return { modelUrl, taskId };
  } finally {
    await context.close().catch(() => {});
  }
}
