import assert from "node:assert/strict";
import { test } from "node:test";
import { createMapDoc } from "../src/features/game-design/mapDoc";
import {
  PLAY_TUNING,
  buildCollisionGrid,
  chop,
  createDuckState,
  createPlayWorld,
  findInteractTarget,
  findSpawn,
  interact,
  stepDuck,
} from "../src/features/game-design/play";
import type { MapObject } from "../src/features/game-design/types";

const obj = (id: string, key: string, gx: number, gy: number): MapObject => ({ id, key, gx, gy, rot: 0 });

function docWith(objects: MapObject[]) {
  return createMapDoc({ id: "t", name: "t", width: 6, height: 6, objects });
}

test("spawn prefers the spawn flag, else a free cell near the center", () => {
  const withFlag = docWith([obj("f", "spawn flag", 1, 1)]);
  assert.deepEqual(findSpawn(withFlag, buildCollisionGrid(withFlag)), { x: 2, z: 2 });
  const noFlag = docWith([obj("c", "base_counter", 2, 2), obj("d", "base_counter", 3, 3)]);
  const s = findSpawn(noFlag, buildCollisionGrid(noFlag));
  assert.ok(!(s.x === 4 && s.z === 4) && !(s.x === 6 && s.z === 6));
});

test("movement accelerates toward moveSpeed and damps to a stop (Unity BalanceConfig feel)", () => {
  const doc = docWith([]);
  const grid = buildCollisionGrid(doc);
  let s = createDuckState({ x: 4, z: 4 });
  for (let i = 0; i < 40; i += 1) s = stepDuck(s, { axis: { x: 1, z: 0 }, dashPressed: false }, 1 / 60, grid);
  assert.ok(Math.abs(s.vel.x - PLAY_TUNING.moveSpeed) < 0.05, `vel ${s.vel.x}`);
  assert.ok(s.pos.x > 4);
  for (let i = 0; i < 90; i += 1) s = stepDuck(s, { axis: { x: 0, z: 0 }, dashPressed: false }, 1 / 60, grid);
  assert.deepEqual(s.vel, { x: 0, z: 0 });
});

test("dash doubles speed for its duration then goes on cooldown", () => {
  const grid = buildCollisionGrid(docWith([]));
  let s = createDuckState({ x: 4, z: 4 });
  s = stepDuck(s, { axis: { x: 0, z: 1 }, dashPressed: true }, 1 / 60, grid);
  assert.equal(s.isDashing, true);
  for (let i = 0; i < 30; i += 1) s = stepDuck(s, { axis: { x: 0, z: 1 }, dashPressed: false }, 1 / 60, grid);
  assert.equal(s.isDashing, false);
  assert.ok(s.dashCooldownTimer > 0 && s.dashCooldownTimer < PLAY_TUNING.dashCooldown);
  const again = stepDuck(s, { axis: { x: 0, z: 1 }, dashPressed: true }, 1 / 60, grid);
  assert.equal(again.isDashing, false, "cooldown blocks a second dash");
});

test("counters block the duck; it slides along them instead of passing through", () => {
  const doc = docWith([obj("c", "base_counter", 3, 2)]);
  const grid = buildCollisionGrid(doc);
  let s = createDuckState({ x: 2, z: 4 }); // cell (1,2), counter at (3,2) world x=6
  for (let i = 0; i < 180; i += 1) s = stepDuck(s, { axis: { x: 1, z: 0 }, dashPressed: false }, 1 / 60, grid);
  assert.ok(s.pos.x < 6 - 1 - PLAY_TUNING.bodyRadius + 0.01, `stopped at ${s.pos.x}`);
  assert.ok(s.pos.x > 4, "still moved toward the counter");
  // diagonal input along the counter face keeps sliding in z
  for (let i = 0; i < 60; i += 1) s = stepDuck(s, { axis: { x: 1, z: 1 }, dashPressed: false }, 1 / 60, grid);
  assert.ok(s.pos.z > 4.5, `slid to z=${s.pos.z}`);
});

test("interact target is the counter in front within reach", () => {
  const doc = docWith([obj("c", "cutting_counter", 2, 1), obj("w", "wall", 2, 4)]);
  const grid = buildCollisionGrid(doc);
  const facingUp = { ...createDuckState({ x: 4, z: 4 }), yaw: Math.PI }; // -z
  assert.equal(findInteractTarget(facingUp, grid)?.id, "c");
  const facingDown = { ...createDuckState({ x: 4, z: 6 }), yaw: 0 }; // +z -> wall, not interactable
  assert.equal(findInteractTarget(facingDown, grid), null);
  const far = { ...createDuckState({ x: 4, z: 8 }), yaw: Math.PI };
  assert.equal(findInteractTarget(far, grid), null);
});

test("pick up, place, chop, deliver", () => {
  const meat = obj("m", "meat_counter", 0, 0);
  const board = obj("b", "cutting_counter", 1, 0);
  const deliver = obj("d", "deliver counter", 2, 0);
  let w = createPlayWorld();
  ({ world: w } = interact(w, meat));
  assert.equal(w.held?.label, "Thịt");
  ({ world: w } = interact(w, board));
  assert.equal(w.held, null);
  assert.equal(w.surfaces.b?.label, "Thịt");
  ({ world: w } = chop(w, board));
  assert.equal(w.surfaces.b?.label, "Thịt (đã cắt)");
  assert.equal(w.chopped, 1);
  ({ world: w } = interact(w, board));
  assert.equal(w.held?.label, "Thịt (đã cắt)");
  ({ world: w } = interact(w, deliver));
  assert.equal(w.delivered, 1);
  assert.equal(w.held, null);
});
