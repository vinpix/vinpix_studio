import assert from "node:assert/strict";
import { test } from "node:test";
import { DirectionalLight, WebGLRenderTarget } from "three";
import { setShadowResolution } from "../src/features/game-design/shadows";

test("replaces a default-size texture even if the requested mapSize is already set", () => {
  const shadow = new DirectionalLight().shadow;
  shadow.mapSize.set(2048, 2048);
  shadow.map = new WebGLRenderTarget(512, 512);
  let disposed = false;
  shadow.map.addEventListener("dispose", () => { disposed = true; });
  setShadowResolution(shadow, 2048);
  assert.equal(disposed, true);
  assert.equal(shadow.map, null);
  assert.deepEqual(shadow.mapSize.toArray(), [2048, 2048]);
  assert.equal(shadow.needsUpdate, true);
});

test("keeps a matching texture and releases it when the resolution changes", () => {
  const shadow = new DirectionalLight().shadow;
  const target = new WebGLRenderTarget(2048, 2048);
  shadow.map = target;
  setShadowResolution(shadow, 2048);
  assert.equal(shadow.map, target);
  setShadowResolution(shadow, 1024);
  assert.equal(shadow.map, null);
  assert.deepEqual(shadow.mapSize.toArray(), [1024, 1024]);
});

test("sets the initial resolution before a texture exists", () => {
  const shadow = new DirectionalLight().shadow;
  setShadowResolution(shadow, 4096);
  assert.equal(shadow.map, null);
  assert.deepEqual(shadow.mapSize.toArray(), [4096, 4096]);
});
