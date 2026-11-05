/**
 * Floor Zero subdomain routing: host detection, middleware rewrite/redirect,
 * wrangler custom domain, and wiki data integrity.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { NextRequest } from "next/server";
import { isFloorZeroHost, isStudioProdHost } from "../src/lib/floorzero";
import { middleware } from "../src/middleware";
import { allArticles, getArticle } from "../src/features/floorzero/data";

const root = process.cwd(); // tests run from the repo root

function req(url: string, host: string) {
  return new NextRequest(url, { headers: { host } });
}

describe("floorzero host helpers", () => {
  it("detects the subdomain on any port / env", () => {
    assert.ok(isFloorZeroHost("floorzero.vinpixstudio.com"));
    assert.ok(isFloorZeroHost("FloorZero.localhost:3002"));
    assert.ok(!isFloorZeroHost("www.vinpixstudio.com"));
    assert.ok(!isFloorZeroHost("vinpixstudio.com"));
    assert.ok(!isFloorZeroHost(null));
  });
  it("detects the studio production hosts", () => {
    assert.ok(isStudioProdHost("vinpixstudio.com"));
    assert.ok(isStudioProdHost("www.vinpixstudio.com"));
    assert.ok(!isStudioProdHost("floorzero.vinpixstudio.com"));
    assert.ok(!isStudioProdHost("localhost:3002"));
  });
});

describe("middleware on the floorzero host", () => {
  it("rewrites / to the internal /floorzero tree", () => {
    const res = middleware(req("https://floorzero.vinpixstudio.com/", "floorzero.vinpixstudio.com"));
    assert.equal(
      new URL(res.headers.get("x-middleware-rewrite")!).pathname,
      "/floorzero"
    );
  });
  it("rewrites wiki paths", () => {
    const res = middleware(req("https://floorzero.vinpixstudio.com/wiki/weapons", "floorzero.vinpixstudio.com"));
    assert.equal(
      new URL(res.headers.get("x-middleware-rewrite")!).pathname,
      "/floorzero/wiki/weapons"
    );
  });
  it("does not expose studio admin routes on the subdomain", () => {
    const res = middleware(req("https://floorzero.vinpixstudio.com/tools", "floorzero.vinpixstudio.com"));
    assert.equal(
      new URL(res.headers.get("x-middleware-rewrite")!).pathname,
      "/floorzero/tools"
    );
  });
  it("strips a stray /floorzero prefix", () => {
    const res = middleware(req("https://floorzero.vinpixstudio.com/floorzero/wiki", "floorzero.vinpixstudio.com"));
    assert.equal(res.status, 308);
    assert.equal(new URL(res.headers.get("location")!).pathname, "/wiki");
  });
});

describe("middleware on the studio hosts", () => {
  it("301s /floorzero/* to the subdomain", () => {
    const res = middleware(req("https://www.vinpixstudio.com/floorzero/wiki?q=1", "www.vinpixstudio.com"));
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), "https://floorzero.vinpixstudio.com/wiki?q=1");
  });
  it("leaves other studio pages alone", () => {
    const res = middleware(req("https://www.vinpixstudio.com/hiring", "www.vinpixstudio.com"));
    assert.equal(res.headers.get("x-middleware-rewrite"), null);
    assert.equal(res.headers.get("location"), null);
  });
});

describe("wrangler", () => {
  it("declares floorzero.vinpixstudio.com as a custom domain", () => {
    const raw = readFileSync(join(root, "wrangler.jsonc"), "utf8");
    assert.match(
      raw,
      /"pattern"\s*:\s*"floorzero\.vinpixstudio\.com"\s*,\s*"custom_domain"\s*:\s*true/
    );
  });
});

describe("wiki data", () => {
  it("has unique category/slug pairs that resolve", () => {
    const keys = new Set<string>();
    for (const a of allArticles) {
      const k = `${a.category}/${a.slug}`;
      assert.ok(!keys.has(k), `duplicate ${k}`);
      keys.add(k);
      assert.equal(getArticle(a.category, a.slug), a);
    }
  });
});
