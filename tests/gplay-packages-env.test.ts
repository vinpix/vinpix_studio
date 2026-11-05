/**
 * Drives the real shipped GET handler for /api/gplay/packages.
 * Proves GPLAY_PACKAGE_NAMES is read from process.env (the same path
 * OpenNext populates from wrangler vars/secrets at runtime).
 */
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

// Import the real route module (shipped entry point).
import { GET } from "../src/app/api/gplay/packages/route";

const ORIGINAL = process.env.GPLAY_PACKAGE_NAMES;

afterEach(() => {
  if (ORIGINAL === undefined) {
    delete process.env.GPLAY_PACKAGE_NAMES;
  } else {
    process.env.GPLAY_PACKAGE_NAMES = ORIGINAL;
  }
});

describe("GET /api/gplay/packages (shipped env reader)", () => {
  it("returns packages parsed from GPLAY_PACKAGE_NAMES env", async () => {
    process.env.GPLAY_PACKAGE_NAMES =
      "com.kitchentogether, com.vinpix.styleidentity";

    const res = await GET();
    assert.equal(res.status, 200);
    const body = (await res.json()) as { packages: string[]; count: number };

    assert.deepEqual(body.packages, [
      "com.kitchentogether",
      "com.vinpix.styleidentity",
    ]);
    assert.equal(body.count, 2);
  });

  it("returns empty list when env is missing (clear missing-config signal)", async () => {
    delete process.env.GPLAY_PACKAGE_NAMES;

    const res = await GET();
    assert.equal(res.status, 200);
    const body = (await res.json()) as { packages: string[]; count: number };

    assert.deepEqual(body.packages, []);
    assert.equal(body.count, 0);
  });

  it("dedupes and trims package names from env", async () => {
    process.env.GPLAY_PACKAGE_NAMES =
      " com.a ,com.b,com.a,  ,com.c ";

    const res = await GET();
    const body = (await res.json()) as { packages: string[]; count: number };

    assert.deepEqual(body.packages, ["com.a", "com.b", "com.c"]);
    assert.equal(body.count, 3);
  });
});
