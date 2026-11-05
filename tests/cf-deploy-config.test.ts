/**
 * Structural tests for the Cloudflare (OpenNext) deploy path.
 * Proves the shipped primary deploy target is CF, not Vercel.
 */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const root = join(import.meta.dirname, "..");

function read(rel: string): string {
  return readFileSync(join(root, rel), "utf8");
}

describe("Cloudflare deploy config (shipped artifacts)", () => {
  it("has wrangler.jsonc pointing at OpenNext worker + assets", () => {
    const wranglerPath = join(root, "wrangler.jsonc");
    assert.ok(existsSync(wranglerPath), "wrangler.jsonc must exist");
    const raw = read("wrangler.jsonc");

    // Assert shipped wrangler structure via source (jsonc may include comments)
    assert.match(raw, /"name"\s*:\s*"vinpix-studio"/);
    assert.match(raw, /"main"\s*:\s*"\.open-next\/worker\.js"/);
    assert.match(
      raw,
      /"nodejs_compat"/,
      "nodejs_compat required for Next API routes / gplay nodejs runtime"
    );
    assert.match(raw, /"directory"\s*:\s*"\.open-next\/assets"/);
    assert.match(raw, /"binding"\s*:\s*"ASSETS"/);

    // Non-secret env vars must be wired for production runtime
    assert.match(raw, /"GPLAY_PACKAGE_NAMES"\s*:\s*"/);
    assert.match(
      raw,
      /"NEXT_PUBLIC_MAP_LAMBDA_URL"\s*:\s*"https:\/\/[^"]+\.lambda-url\./
    );

    // Primary studio hosts must be declared as Worker custom domains
    assert.match(
      raw,
      /"pattern"\s*:\s*"vinpixstudio\.com"[\s\S]*"custom_domain"\s*:\s*true/
    );
    assert.match(
      raw,
      /"pattern"\s*:\s*"www\.vinpixstudio\.com"[\s\S]*"custom_domain"\s*:\s*true/
    );
  });

  it("declares apex + www custom domains for production Worker", () => {
    const raw = read("wrangler.jsonc");
    assert.match(raw, /"routes"\s*:\s*\[/);
    assert.ok(
      raw.includes("vinpixstudio.com") && raw.includes("www.vinpixstudio.com"),
      "both apex and www must be listed"
    );
    assert.match(raw, /"custom_domain"\s*:\s*true/);
  });

  it("has open-next.config.ts using defineCloudflareConfig", () => {
    const path = join(root, "open-next.config.ts");
    assert.ok(existsSync(path), "open-next.config.ts must exist");
    const src = read("open-next.config.ts");
    assert.match(src, /@opennextjs\/cloudflare/);
    assert.match(src, /defineCloudflareConfig/);
  });

  it("package.json primary deploy scripts target Cloudflare, not Vercel", () => {
    const pkg = JSON.parse(read("package.json")) as {
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    };

    assert.ok(pkg.scripts["cf:build"]?.includes("opennextjs-cloudflare"));
    assert.ok(pkg.scripts.deploy?.includes("opennextjs-cloudflare"));
    assert.ok(pkg.scripts.deploy?.includes("keep-vars"));
    assert.ok(
      !pkg.scripts.deploy?.includes("vercel"),
      "deploy must not invoke vercel"
    );
    assert.ok(pkg.devDependencies["@opennextjs/cloudflare"]);
    assert.ok(pkg.devDependencies.wrangler);
  });

  it("README documents Cloudflare as production deploy path", () => {
    const readme = read("README.md");
    assert.match(readme, /Cloudflare/i);
    assert.match(readme, /cf:deploy|opennextjs-cloudflare|wrangler/i);
  });
});
