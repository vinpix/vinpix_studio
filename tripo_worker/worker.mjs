/**
 * Tripo 3D worker for vinpixstudio /team/3d-gen queue.
 *
 * - Polls the vinpixstudio Lambda (listBatch3DQueue) every POLL_INTERVAL_SEC.
 * - Exposes an HTTP endpoint so the Lambda can wake it immediately:
 *     POST /run?token=WORKER_TOKEN   -> process queue now
 *     GET  /health?token=...         -> worker state (needLogin, lastError...)
 * - For each queued image: download from S3 (presigned GET) -> drive
 *   studio.tripo3d.ai via Playwright (tripo.mjs) -> hand the resulting signed
 *   GLB URL to the lambda (updateBatch3DJob modelUrl=...), which downloads and
 *   stores it to S3 server-side.
 *
 * Login/infra failures leave jobs queued (retried next run); only
 * job-specific generation errors mark a job failed.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runTripoJob, checkLogin } from "./tripo.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const TMP = path.join(ROOT, "tmp");
fs.mkdirSync(TMP, { recursive: true });

const {
  LAMBDA_URL,
  WORKER_TOKEN,
  PORT = "8377",
  POLL_INTERVAL_SEC = "300",
  JOB_TIMEOUT_MIN = "20",
} = process.env;

if (!LAMBDA_URL || !WORKER_TOKEN) {
  console.error("LAMBDA_URL / WORKER_TOKEN missing in env");
  process.exit(1);
}

const state = {
  startedAt: new Date().toISOString(),
  running: false,
  needLogin: false,
  lastRunAt: null,
  lastError: null,
  processed: 0,
  failed: 0,
};

const log = (...a) => console.log(new Date().toISOString(), ...a);

// ---------- Lambda RPC ----------
async function lambda(fn, params = {}) {
  const r = await fetch(LAMBDA_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ function: fn, params }),
  });
  let data = {};
  try {
    data = await r.json();
  } catch {
    /* non-JSON */
  }
  if (!r.ok) {
    throw new Error(`${fn} HTTP ${r.status}: ${JSON.stringify(data).slice(0, 300)}`);
  }
  return data;
}

async function reportJob(job, fields) {
  try {
    await lambda("updateBatch3DJob", {
      batchId: job.batchId,
      imageId: job.imageId,
      ...fields,
    });
  } catch (e) {
    log(`reportJob(${job.imageId}) failed:`, e.message);
  }
}

// ---------- queue processing (single flight) ----------
let rerunWanted = false;

async function processQueue(trigger) {
  if (state.running) {
    rerunWanted = true;
    return;
  }
  state.running = true;
  try {
    do {
      rerunWanted = false;
      await processOnce(trigger);
    } while (rerunWanted);
  } finally {
    state.running = false;
  }
}

async function processOnce(trigger) {
  state.lastRunAt = new Date().toISOString();
  let jobs;
  try {
    jobs = (await lambda("listBatch3DQueue")).jobs || [];
  } catch (e) {
    state.lastError = `listBatch3DQueue: ${e.message}`;
    log(state.lastError);
    return;
  }
  if (!jobs.length) {
    log(`[${trigger}] queue empty`);
    return;
  }
  log(`[${trigger}] ${jobs.length} job(s) in queue`);

  // Single worker: anything marked "running" in DB is a stale leftover -> redo.
  const login = await checkLogin();
  if (!login.ok) {
    state.needLogin = true;
    state.lastError = `Chưa đăng nhập Tripo (${login.reason}). Chạy: bash /root/tripo-worker/login.sh rồi mở noVNC để đăng nhập 1 lần.`;
    log(state.lastError);
    return; // leave everything queued
  }
  state.needLogin = false;

  for (const job of jobs) {
    const tag = `${job.batchName}/${job.imageId}`;
    try {
      log(`>> job ${tag}`);
      await reportJob(job, { status: "running", progress: 10 });

      // 1. pull the source image from S3
      const { url } = await lambda("getPresignedUrl", { key: job.key, expires: 3600 });
      const imgResp = await fetch(url);
      if (!imgResp.ok) throw new Error(`image download HTTP ${imgResp.status}`);
      const ext = (job.key.split(".").pop() || "png").toLowerCase();
      const imagePath = path.join(TMP, `${job.imageId}.${ext}`);
      fs.writeFileSync(imagePath, Buffer.from(await imgResp.arrayBuffer()));
      await reportJob(job, { status: "running", progress: 20 });

      // 2. Tripo studio: image -> signed GLB URL
      const { modelUrl, taskId } = await withTimeout(
        runTripoJob({
          imagePath,
          name: job.name || job.imageId,
          onProgress: (p) =>
            reportJob(job, { status: "running", progress: Math.min(90, Math.max(20, 20 + Math.round(p * 0.7))) }),
        }),
        Number(JOB_TIMEOUT_MIN) * 60_000,
        "tripo generation timeout"
      );

      // 3. lambda downloads the GLB from Tripo's CDN and stores it to S3
      await lambda("updateBatch3DJob", {
        batchId: job.batchId,
        imageId: job.imageId,
        status: "success",
        modelUrl,
        taskId,
        error: "",
      });
      state.processed += 1;
      log(`<< job ${tag} DONE (task ${taskId})`);
      fs.rmSync(imagePath, { force: true });
    } catch (e) {
      const msg = String(e.message || e).slice(0, 400);
      state.lastError = `${tag}: ${msg}`;
      log(`!! job ${tag} FAILED:`, msg);
      if (e.isLoginError) {
        // session died mid-run: put the job back to queued and stop
        state.needLogin = true;
        await reportJob(job, { status: "queued", error: "" });
        return;
      }
      state.failed += 1;
      await reportJob(job, { status: "failed", error: msg });
    }
  }
}

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(label)), ms)),
  ]);
}

// ---------- HTTP trigger ----------
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.searchParams.get("token") !== WORKER_TOKEN) {
    res.writeHead(403).end("forbidden");
    return;
  }
  if (u.pathname === "/run") {
    res.writeHead(202, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, alreadyRunning: state.running }));
    processQueue("webhook").catch((e) => log("processQueue error:", e));
    return;
  }
  if (u.pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(state, null, 2));
    return;
  }
  res.writeHead(404).end("not found");
});

server.listen(Number(PORT), () => log(`worker listening on :${PORT}`));

// fallback poller
setInterval(() => {
  processQueue("poll").catch((e) => log("poll error:", e));
}, Number(POLL_INTERVAL_SEC) * 1000);

// run once on boot
processQueue("boot").catch((e) => log("boot run error:", e));
