/** Headed Chromium on the worker profile, for the one-time Tripo login. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

const context = await chromium.launchPersistentContext(path.join(ROOT, "profile"), {
  channel: "chromium",
  headless: false,
  viewport: { width: 1400, height: 860 },
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--start-maximized"],
});
const page = context.pages()[0] || (await context.newPage());
await page.goto("https://studio.tripo3d.ai/", { waitUntil: "domcontentloaded" });
console.log("Browser is up — log in via noVNC, then Ctrl+C the login.sh script.");
// keep alive until killed
await new Promise(() => {});
