/**
 * The Last Dungeon subdomain routing: host detection, middleware rewrite/redirect,
 * wrangler custom domain, and wiki data integrity.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { NextRequest } from "next/server";
import { isLastDungeonHost } from "../src/lib/lastdungeon";
import { isFloorZeroHost } from "../src/lib/floorzero";
import { middleware } from "../src/middleware";
import { allArticles, getArticle } from "../src/features/lastdungeon/data";

const root = process.cwd(); // tests run from the repo root
const HOST = "lastdungeon.vinpixstudio.com";

function req(url: string, host: string) {
  return new NextRequest(url, { headers: { host } });
}
const rewritePath = (res: Response) =>
  new URL(res.headers.get("x-middleware-rewrite")!).pathname;

describe("lastdungeon host helper", () => {
  it("detects the subdomain on any port / env", () => {
    assert.ok(isLastDungeonHost(HOST));
    assert.ok(isLastDungeonHost("LastDungeon.localhost:3002"));
    assert.ok(!isLastDungeonHost("www.vinpixstudio.com"));
    assert.ok(!isLastDungeonHost("floorzero.vinpixstudio.com"));
    assert.ok(!isLastDungeonHost(null));
    assert.ok(!isFloorZeroHost(HOST));
  });
});

describe("middleware on the lastdungeon host", () => {
  it("rewrites / to the internal /lastdungeon tree", () => {
    assert.equal(rewritePath(middleware(req(`https://${HOST}/`, HOST))), "/lastdungeon");
  });
  it("rewrites wiki paths", () => {
    assert.equal(
      rewritePath(middleware(req(`https://${HOST}/wiki/heroes`, HOST))),
      "/lastdungeon/wiki/heroes"
    );
  });
  it("keeps studio admin routes off the subdomain", () => {
    assert.equal(rewritePath(middleware(req(`https://${HOST}/tools`, HOST))), "/lastdungeon/tools");
  });
  it("serves its own sitemap and robots", () => {
    assert.equal(
      rewritePath(middleware(req(`https://${HOST}/sitemap.xml`, HOST))),
      "/lastdungeon/sitemap.xml"
    );
  });
  it("strips a stray /lastdungeon prefix", () => {
    const res = middleware(req(`https://${HOST}/lastdungeon/wiki`, HOST));
    assert.equal(res.status, 308);
    assert.equal(new URL(res.headers.get("location")!).pathname, "/wiki");
  });
});

describe("middleware on the studio hosts", () => {
  it("301s /lastdungeon/* to the subdomain", () => {
    const res = middleware(req("https://vinpixstudio.com/lastdungeon/wiki?q=1", "vinpixstudio.com"));
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), `https://${HOST}/wiki?q=1`);
  });
  it("still 301s /floorzero/* to its own subdomain", () => {
    const res = middleware(req("https://www.vinpixstudio.com/floorzero", "www.vinpixstudio.com"));
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), "https://floorzero.vinpixstudio.com/");
  });
  it("does not catch look-alike paths", () => {
    const res = middleware(req("https://www.vinpixstudio.com/lastdungeonx", "www.vinpixstudio.com"));
    assert.equal(res.headers.get("location"), null);
  });
});

describe("wrangler", () => {
  it("declares lastdungeon.vinpixstudio.com as a custom domain", () => {
    const raw = readFileSync(join(root, "wrangler.jsonc"), "utf8");
    assert.match(
      raw,
      /"pattern"\s*:\s*"lastdungeon\.vinpixstudio\.com"\s*,\s*"custom_domain"\s*:\s*true/
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
