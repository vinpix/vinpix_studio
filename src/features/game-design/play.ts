/**
 * Play mode — pure logic (no three / React) so it can be unit-tested.
 *
 * Ports the feel of Kitchen Together Unity `PlayerController.cs` + `BalanceConfig.cs`
 * (which in turn froze Godot's MultiplayerController.gd):
 *   - exponential-smoothing kinematic movement, 0.85 damping per 60 Hz step when idle
 *   - dash = ×2 speed for 0.2 s, 2.5 s cooldown
 *   - interact = forward ray, reach 1.95 world units
 * Collision is a simplified grid version: every non-floor object blocks its cells and the
 * duck is a circle (BalanceConfig.capsuleRadius) that slides along cell boxes.
 */

import { CELL_SIZE, type MapDoc, type MapObject } from "./types";
import { entryOf, objectCells, objectLayer, worldPositionOf } from "./mapDoc";

export const PLAY_TUNING = {
  moveSpeed: 8,
  acceleration: 15,
  rotationSpeed: 10,
  stopDampening: 0.85,
  physicsTicksPerSecond: 60,
  dashSpeedMultiplier: 2,
  dashDuration: 0.2,
  dashCooldown: 2.5,
  interactRayReach: 1.95,
  interactRayStep: 0.15,
  /** Godot capsule radius 0.64 — slightly smaller so 1-cell corridors stay walkable. */
  bodyRadius: 0.55,
} as const;

export type Vec2 = { x: number; z: number };

export type DuckState = {
  pos: Vec2;
  vel: Vec2;
  /** radians around Y, 0 = facing +z */
  yaw: number;
  dashTimer: number;
  dashCooldownTimer: number;
  isDashing: boolean;
};

export type PlayInput = {
  axis: Vec2;
  dashPressed: boolean;
};

export type HeldItem = { key: string; label: string; color: string };

export type PlayWorld = {
  held: HeldItem | null;
  /** items sitting on counters, keyed by MapObject.id */
  surfaces: Record<string, HeldItem>;
  delivered: number;
  chopped: number;
};

export type InteractResult = { world: PlayWorld; message: string | null };

// ---------------------------------------------------------------- collision grid

export type CollisionGrid = {
  width: number;
  height: number;
  blocked: Set<string>;
  /** cell -> topmost blocking object (for interaction) */
  objectAt: Map<string, MapObject>;
};

const ck = (gx: number, gy: number) => `${gx},${gy}`;

export function buildCollisionGrid(doc: MapDoc): CollisionGrid {
  const blocked = new Set<string>();
  const objectAt = new Map<string, MapObject>();
  for (const obj of doc.objects) {
    if (objectLayer(obj) === 0) continue;
    // the spawn marker is a gameplay hint, not furniture — walkable
    if (entryOf(obj)?.key === "spawn flag") continue;
    for (const [gx, gy] of objectCells(obj)) {
      const k = ck(gx, gy);
      blocked.add(k);
      // interactable layers (counter / movable) win over decor when stacked
      const prev = objectAt.get(k);
      if (!prev || objectLayer(prev) === 3) objectAt.set(k, obj);
    }
  }
  return { width: doc.width, height: doc.height, blocked, objectAt };
}

export function findSpawn(doc: MapDoc, grid: CollisionGrid): Vec2 {
  const flag = doc.objects.find((o) => entryOf(o)?.key === "spawn flag");
  if (flag) {
    const [x, , z] = worldPositionOf(flag);
    return { x, z };
  }
  const cx = (doc.width - 1) / 2;
  const cy = (doc.height - 1) / 2;
  let best: { gx: number; gy: number; d: number } | null = null;
  for (let gy = 0; gy < doc.height; gy += 1) {
    for (let gx = 0; gx < doc.width; gx += 1) {
      if (grid.blocked.has(ck(gx, gy))) continue;
      const d = (gx - cx) ** 2 + (gy - cy) ** 2;
      if (!best || d < best.d) best = { gx, gy, d };
    }
  }
  if (!best) return { x: cx * CELL_SIZE, z: cy * CELL_SIZE };
  return { x: best.gx * CELL_SIZE, z: best.gy * CELL_SIZE };
}

export function createDuckState(spawn: Vec2): DuckState {
  return { pos: { ...spawn }, vel: { x: 0, z: 0 }, yaw: Math.PI, dashTimer: 0, dashCooldownTimer: 0, isDashing: false };
}

// ---------------------------------------------------------------- movement

function resolveAxis(grid: CollisionGrid, x: number, z: number, r: number): { x: number; z: number } {
  // clamp inside the map (cells span [-1, width*2-1] in world units)
  const minX = -CELL_SIZE / 2 + r;
  const maxX = (grid.width - 0.5) * CELL_SIZE - r;
  const minZ = -CELL_SIZE / 2 + r;
  const maxZ = (grid.height - 0.5) * CELL_SIZE - r;
  x = Math.min(maxX, Math.max(minX, x));
  z = Math.min(maxZ, Math.max(minZ, z));
  return { x, z };
}

/** Push a circle out of any blocked cell it overlaps, one axis at a time (slide). */
function pushOut(grid: CollisionGrid, pos: Vec2, prev: Vec2, r: number, axis: "x" | "z"): Vec2 {
  // only resolve along an axis the duck actually moved on, so a resting contact on the other
  // axis (distance exactly r) can never be mistaken for a penetration
  if (Math.abs(pos[axis] - prev[axis]) < 1e-9) return pos;
  const half = CELL_SIZE / 2;
  const r2 = r * r - 1e-5;
  const gx0 = Math.floor((pos.x - r) / CELL_SIZE + 0.5);
  const gx1 = Math.floor((pos.x + r) / CELL_SIZE + 0.5);
  const gy0 = Math.floor((pos.z - r) / CELL_SIZE + 0.5);
  const gy1 = Math.floor((pos.z + r) / CELL_SIZE + 0.5);
  const out = { ...pos };
  for (let gy = gy0; gy <= gy1; gy += 1) {
    for (let gx = gx0; gx <= gx1; gx += 1) {
      if (!grid.blocked.has(ck(gx, gy))) continue;
      const cx = gx * CELL_SIZE;
      const cz = gy * CELL_SIZE;
      const nx = Math.max(cx - half, Math.min(out.x, cx + half));
      const nz = Math.max(cz - half, Math.min(out.z, cz + half));
      const dx = out.x - nx;
      const dz = out.z - nz;
      if (dx * dx + dz * dz >= r2) continue;
      if (axis === "x") out.x = prev.x > cx ? cx + half + r : cx - half - r;
      else out.z = prev.z > cz ? cz + half + r : cz - half - r;
    }
  }
  return out;
}

export function stepDuck(state: DuckState, input: PlayInput, dt: number, grid: CollisionGrid): DuckState {
  const T = PLAY_TUNING;
  const s: DuckState = { ...state, pos: { ...state.pos }, vel: { ...state.vel } };

  // dash timers (TickDashTimers)
  if (s.dashCooldownTimer > 0) s.dashCooldownTimer -= dt;
  if (s.isDashing) {
    s.dashTimer -= dt;
    if (s.dashTimer <= 0) s.isDashing = false;
  }
  if (input.dashPressed && !s.isDashing && s.dashCooldownTimer <= 0) {
    s.isDashing = true;
    s.dashTimer = T.dashDuration;
    s.dashCooldownTimer = T.dashCooldown;
  }

  // Move()
  let ax = input.axis.x;
  let az = input.axis.z;
  const mag2 = ax * ax + az * az;
  if (mag2 > 1) {
    const m = Math.sqrt(mag2);
    ax /= m;
    az /= m;
  }
  const hasInput = mag2 > 0.0001;
  const speed = T.moveSpeed * (s.isDashing ? T.dashSpeedMultiplier : 1);
  if (hasInput) {
    const smooth = 1 - Math.exp(-T.acceleration * dt);
    s.vel.x += (ax * speed - s.vel.x) * smooth;
    s.vel.z += (az * speed - s.vel.z) * smooth;
    // RotateToward: slerp yaw toward the input direction
    const targetYaw = Math.atan2(ax, az);
    let d = targetYaw - s.yaw;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    s.yaw += d * (1 - Math.exp(-T.rotationSpeed * dt));
  } else {
    const damp = Math.pow(T.stopDampening, dt * T.physicsTicksPerSecond);
    s.vel.x *= damp;
    s.vel.z *= damp;
    if (s.vel.x * s.vel.x + s.vel.z * s.vel.z < 0.0001) s.vel = { x: 0, z: 0 };
  }

  const prev = { ...s.pos };
  const r = T.bodyRadius;
  // x then z so the duck slides along counters instead of sticking
  let p = { x: prev.x + s.vel.x * dt, z: prev.z };
  p = pushOut(grid, p, prev, r, "x");
  const afterX = { ...p };
  p = { x: p.x, z: prev.z + s.vel.z * dt };
  p = pushOut(grid, p, afterX, r, "z");
  p = resolveAxis(grid, p.x, p.z, r);
  // kill velocity into the wall so acceleration doesn't wind up
  if (Math.abs(p.x - (prev.x + s.vel.x * dt)) > 1e-6) s.vel.x = 0;
  if (Math.abs(p.z - (prev.z + s.vel.z * dt)) > 1e-6) s.vel.z = 0;
  s.pos = p;
  return s;
}

export function dashCooldownFraction(s: DuckState): number {
  return Math.min(1, Math.max(0, s.dashCooldownTimer / PLAY_TUNING.dashCooldown));
}

// ---------------------------------------------------------------- interaction

/** Forward ray (UpdateInteractTarget): first blocking cell within reach, if it is a counter/movable. */
export function findInteractTarget(state: DuckState, grid: CollisionGrid): MapObject | null {
  const T = PLAY_TUNING;
  const dx = Math.sin(state.yaw);
  const dz = Math.cos(state.yaw);
  for (let t = 0; t <= T.interactRayReach + T.bodyRadius; t += T.interactRayStep) {
    const x = state.pos.x + dx * t;
    const z = state.pos.z + dz * t;
    const gx = Math.round(x / CELL_SIZE);
    const gy = Math.round(z / CELL_SIZE);
    const k = ck(gx, gy);
    if (!grid.blocked.has(k)) continue;
    const obj = grid.objectAt.get(k) ?? null;
    if (!obj) return null;
    const layer = objectLayer(obj);
    return layer === 1 || layer === 2 ? obj : null;
  }
  return null;
}

/** Counters that hand out an ingredient (Godot "container" counters). */
const INGREDIENT_KEYS = new Set([
  "meat_counter",
  "cabbage counter",
  "tomato counter",
  "cheese_counter",
  "bread counter",
  "dough_counter",
  "onion counter",
  "pep counter",
  "mus counter",
  "cherry counter",
  "bow counter",
  "cone counter",
  "cookie_stick",
  "waf counter",
  "ic_a",
  "ic_b",
  "ic_c",
  "plate counter",
  "carrot counter",
  "ham counter",
  "potato counter",
  "pickle counter",
  "rice_raw counter",
  "suon_raw counter",
  "food_spawn",
]);

const SURFACE_KEYS = new Set([
  "custom_counter",
  "base_counter",
  "base_counter_corner",
  "cutting_counter",
  "stove counter",
  "oven counter",
  "sink counter",
  "conveyer",
  "pin counter",
  "lo than counter",
  "noi_com",
]);

export function createPlayWorld(): PlayWorld {
  return { held: null, surfaces: {}, delivered: 0, chopped: 0 };
}

export function interact(world: PlayWorld, target: MapObject | null): InteractResult {
  if (!target) return { world, message: world.held ? "Không có gì để đặt lên" : "Không có gì để lấy" };
  const entry = entryOf(target);
  if (!entry) return { world, message: null };
  const key = entry.key;
  const onSurface = world.surfaces[target.id] ?? null;
  const name = target.label || entry.label;

  if (key === "trash counter") {
    if (!world.held) return { world, message: "Thùng rác trống tay" };
    return { world: { ...world, held: null }, message: `Đã vứt ${world.held.label}` };
  }
  if (key === "deliver counter") {
    if (!world.held) return { world, message: "Cầm món rồi mới giao" };
    return { world: { ...world, held: null, delivered: world.delivered + 1 }, message: `Đã giao ${world.held.label}!` };
  }
  if (INGREDIENT_KEYS.has(key)) {
    if (world.held) return { world, message: `Đang cầm ${world.held.label}` };
    const item: HeldItem = { key, label: entry.label, color: entry.color };
    return { world: { ...world, held: item }, message: `Lấy ${name}` };
  }
  if (SURFACE_KEYS.has(key)) {
    if (world.held && !onSurface) {
      const surfaces = { ...world.surfaces, [target.id]: world.held };
      return { world: { ...world, held: null, surfaces }, message: `Đặt ${world.held.label} lên ${name}` };
    }
    if (!world.held && onSurface) {
      const surfaces = { ...world.surfaces };
      delete surfaces[target.id];
      return { world: { ...world, held: onSurface, surfaces }, message: `Lấy ${onSurface.label}` };
    }
    if (world.held && onSurface) return { world, message: `${name} đã có ${onSurface.label}` };
    return { world, message: `${name} trống` };
  }
  return { world, message: `${name}: chưa có tương tác` };
}

/** E = chop (Unity ChopPressed): only meaningful on a cutting counter with something on it. */
export function chop(world: PlayWorld, target: MapObject | null): InteractResult {
  if (!target || entryOf(target)?.key !== "cutting_counter") return { world, message: "Đứng trước thớt để chặt" };
  const item = world.surfaces[target.id];
  if (!item) return { world, message: "Thớt trống" };
  if (item.label.endsWith(" (đã cắt)")) return { world, message: `${item.label} rồi` };
  const cut: HeldItem = { ...item, label: `${item.label} (đã cắt)` };
  return { world: { ...world, chopped: world.chopped + 1, surfaces: { ...world.surfaces, [target.id]: cut } }, message: `Chặt ${item.label}` };
}
