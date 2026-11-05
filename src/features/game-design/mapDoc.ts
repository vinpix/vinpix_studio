import { CATALOG_BY_KEY, normalizeKey, resolveCatalogEntry, rotatedFootprint } from "./catalog";
import {
  CELL_SIZE,
  layerFromRaw,
  type CatalogEntry,
  type MapDoc,
  type MapLayer,
  type MapObject,
  type Rotation,
} from "./types";

export const DEFAULT_WIDTH = 12;
export const DEFAULT_HEIGHT = 9;
export const MAX_SIZE = 40;

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function entryOf(obj: Pick<MapObject, "key">): CatalogEntry | null {
  return CATALOG_BY_KEY.get(normalizeKey(obj.key)) ?? resolveCatalogEntry(obj.key);
}

export function objectLayer(obj: MapObject): MapLayer {
  return obj.layer ?? entryOf(obj)?.layer ?? 3;
}

export function objectFootprint(obj: MapObject): [number, number] {
  const e = entryOf(obj);
  return e ? rotatedFootprint(e, obj.rot) : [1, 1];
}

/** Cells covered by an object (top-left anchored). */
export function objectCells(obj: MapObject): Array<[number, number]> {
  const [w, h] = objectFootprint(obj);
  const out: Array<[number, number]> = [];
  for (let dy = 0; dy < h; dy += 1) for (let dx = 0; dx < w; dx += 1) out.push([obj.gx + dx, obj.gy + dy]);
  return out;
}

/** World-space center used by the game: cell center = grid * CELL_SIZE. */
export function worldPositionOf(obj: MapObject): [number, number, number] {
  const [w, h] = objectFootprint(obj);
  return [(obj.gx + (w - 1) / 2) * CELL_SIZE, 0, (obj.gy + (h - 1) / 2) * CELL_SIZE];
}

export function createMapDoc(partial?: Partial<MapDoc>): MapDoc {
  const now = new Date().toISOString();
  return {
    id: partial?.id ?? uid(),
    name: partial?.name ?? "Map mới",
    notes: partial?.notes ?? "",
    width: partial?.width ?? DEFAULT_WIDTH,
    height: partial?.height ?? DEFAULT_HEIGHT,
    objects: partial?.objects ?? [],
    createdAt: partial?.createdAt ?? now,
    updatedAt: now,
  };
}

function inBounds(doc: MapDoc, obj: MapObject): boolean {
  return objectCells(obj).every(([x, y]) => x >= 0 && y >= 0 && x < doc.width && y < doc.height);
}

/**
 * Floor (layer 0) lives under everything; every other layer competes for the
 * same footprint (a counter and a wall can't share a cell).
 */
function collides(a: MapObject, b: MapObject): boolean {
  const la = objectLayer(a);
  const lb = objectLayer(b);
  if ((la === 0) !== (lb === 0)) return false;
  const ca = objectCells(a);
  const cb = new Set(objectCells(b).map(([x, y]) => `${x},${y}`));
  return ca.some(([x, y]) => cb.has(`${x},${y}`));
}

export function objectsAt(doc: MapDoc, gx: number, gy: number): MapObject[] {
  return doc.objects.filter((o) => objectCells(o).some(([x, y]) => x === gx && y === gy));
}

/** Topmost object at a cell for selection: non-floor first. */
export function topObjectAt(doc: MapDoc, gx: number, gy: number): MapObject | null {
  const hits = objectsAt(doc, gx, gy);
  if (hits.length === 0) return null;
  return hits.find((o) => objectLayer(o) !== 0) ?? hits[0];
}

/** Place an object; overlapping same-group objects are replaced (paint semantics). */
export function placeObject(doc: MapDoc, key: string, gx: number, gy: number, rot: Rotation, label?: string): MapDoc {
  const obj: MapObject = { id: uid(), key, gx, gy, rot };
  if (label?.trim()) obj.label = label.trim();
  if (!inBounds(doc, obj)) return doc;
  const objects = doc.objects.filter((o) => !collides(o, obj));
  return touch({ ...doc, objects: [...objects, obj] });
}

export function removeObjects(doc: MapDoc, ids: string[]): MapDoc {
  const set = new Set(ids);
  return touch({ ...doc, objects: doc.objects.filter((o) => !set.has(o.id)) });
}

export function eraseAt(doc: MapDoc, gx: number, gy: number, floorToo = false): MapDoc {
  const hits = objectsAt(doc, gx, gy).filter((o) => floorToo || objectLayer(o) !== 0);
  if (hits.length === 0) {
    const floor = objectsAt(doc, gx, gy);
    return floor.length ? removeObjects(doc, floor.map((o) => o.id)) : doc;
  }
  return removeObjects(doc, hits.map((o) => o.id));
}

/** Move; refuses if out of bounds or overlapping something else. */
export function moveObject(doc: MapDoc, id: string, gx: number, gy: number): MapDoc {
  const cur = doc.objects.find((o) => o.id === id);
  if (!cur) return doc;
  const next = { ...cur, gx, gy };
  if (!inBounds(doc, next)) return doc;
  if (doc.objects.some((o) => o.id !== id && collides(o, next))) return doc;
  return touch({ ...doc, objects: doc.objects.map((o) => (o.id === id ? next : o)) });
}

/**
 * Rotate one object. Square footprints always succeed. Rectangular ones (wall 2x1…)
 * change footprint, so we try a few anchors around the original centre and keep
 * the first that fits; returns the same doc when nothing fits.
 */
export function rotateObject(doc: MapDoc, id: string, delta: 90 | -90): MapDoc {
  const cur = doc.objects.find((o) => o.id === id);
  if (!cur) return doc;
  const rot = (((cur.rot + delta) % 360) + 360) % 360 as Rotation;
  const [w0, h0] = objectFootprint(cur);
  const [w1, h1] = objectFootprint({ ...cur, rot });
  const shifts: Array<[number, number]> =
    w0 === w1 && h0 === h1
      ? [[0, 0]]
      : [
          [0, 0],
          [Math.floor((w0 - w1) / 2), Math.floor((h0 - h1) / 2)],
          [Math.ceil((w0 - w1) / 2), Math.ceil((h0 - h1) / 2)],
          [w0 - w1, 0],
          [0, h0 - h1],
          [w0 - w1, h0 - h1],
        ];
  for (const [dx, dy] of shifts) {
    const next = { ...cur, rot, gx: cur.gx + dx, gy: cur.gy + dy };
    if (!inBounds(doc, next)) continue;
    if (doc.objects.some((o) => o.id !== id && collides(o, next))) continue;
    return touch({ ...doc, objects: doc.objects.map((o) => (o.id === id ? next : o)) });
  }
  return doc;
}

/** Set an exact rotation (no re-anchoring); refuses on collision / out of bounds. */
export function setRotation(doc: MapDoc, id: string, rot: Rotation): MapDoc {
  const cur = doc.objects.find((o) => o.id === id);
  if (!cur || cur.rot === rot) return doc;
  const next = { ...cur, rot };
  if (!inBounds(doc, next)) return doc;
  if (doc.objects.some((o) => o.id !== id && collides(o, next))) return doc;
  return touch({ ...doc, objects: doc.objects.map((o) => (o.id === id ? next : o)) });
}

export function resizeMap(doc: MapDoc, width: number, height: number): MapDoc {
  const w = Math.max(2, Math.min(MAX_SIZE, Math.trunc(width)));
  const h = Math.max(2, Math.min(MAX_SIZE, Math.trunc(height)));
  const next = { ...doc, width: w, height: h };
  return touch({ ...next, objects: doc.objects.filter((o) => inBounds(next, o)) });
}

export function setObjectLabel(doc: MapDoc, id: string, label: string): MapDoc {
  const clean = label.trim();
  return touch({
    ...doc,
    objects: doc.objects.map((o) => {
      if (o.id !== id) return o;
      const next: MapObject = { ...o, label: clean };
      if (!clean) delete next.label;
      return next;
    }),
  });
}

export function touch(doc: MapDoc): MapDoc {
  return { ...doc, updatedAt: new Date().toISOString() };
}

// ---------------------------------------------------------------------------
// Kitchen Together JSON (the format the Godot game / kt_onchain2 preview read)
// ---------------------------------------------------------------------------

export type KtObjectJson = {
  object_type: string;
  type: number;
  grid_position: [number, number];
  world_position: [number, number, number];
  rotation_degrees: [number, number, number];
  scale: [number, number, number];
  /** custom counter: designer label */
  label?: string;
};

export type KtMapJson = {
  objects: KtObjectJson[];
  deliver_rule: { rules: unknown[] };
  vinpix_editor: {
    version: 1;
    name: string;
    notes: string;
    width: number;
    height: number;
    cellSize: number;
    exportedAt: string;
  };
};

export function exportMapJson(doc: MapDoc): KtMapJson {
  const objects: KtObjectJson[] = doc.objects.map((o) => ({
    object_type: o.key,
    type: objectLayer(o),
    grid_position: [o.gx, o.gy],
    world_position: worldPositionOf(o),
    rotation_degrees: [0, o.rot, 0],
    scale: [1, 1, 1],
    ...(o.label ? { label: o.label } : {}),
  }));
  return {
    objects,
    deliver_rule: { rules: [] },
    vinpix_editor: {
      version: 1,
      name: doc.name,
      notes: doc.notes,
      width: doc.width,
      height: doc.height,
      cellSize: CELL_SIZE,
      exportedAt: new Date().toISOString(),
    },
  };
}

type Dict = Record<string, unknown>;
const asRecord = (v: unknown): Dict | null =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Dict) : null;
const num = (v: unknown, fb: number) => (typeof v === "number" && Number.isFinite(v) ? v : fb);

function snapRot(v: number): Rotation {
  const r = ((Math.round(v / 90) * 90) % 360 + 360) % 360;
  return (r === 0 || r === 90 || r === 180 || r === 270 ? r : 0) as Rotation;
}

export type ImportResult = { doc: MapDoc; warnings: string[] };

/** Accepts legacy array format, dictionary format, or our own export. */
export function importMapJson(raw: unknown, fallbackName = "Map import"): ImportResult {
  const warnings: string[] = [];
  let entries: unknown[] = [];
  let meta: Dict | null = null;

  if (Array.isArray(raw)) entries = raw;
  else {
    const dict = asRecord(raw);
    if (!dict) throw new Error("JSON không phải object/array hợp lệ");
    entries = Array.isArray(dict.objects) ? dict.objects : [];
    meta = asRecord(dict.vinpix_editor);
    if (!Array.isArray(dict.objects)) warnings.push("Thiếu mảng objects; tạo map rỗng");
  }

  const objects: MapObject[] = [];
  let maxX = 0;
  let maxY = 0;

  for (const e of entries) {
    const row = asRecord(e);
    if (!row) continue;
    const objectType = typeof row.object_type === "string" ? row.object_type.trim() : "";
    if (!objectType) {
      warnings.push("Bỏ qua object không có object_type");
      continue;
    }
    const entry = resolveCatalogEntry(objectType);
    const key = entry?.key ?? objectType;
    if (!entry) warnings.push(`Không có trong catalog: "${objectType}" (giữ nguyên, hiện box)`);

    const rotArr = Array.isArray(row.rotation_degrees) ? row.rotation_degrees : [];
    const rot = snapRot(num(rotArr[1], 0));
    const fp = entry ? rotatedFootprint(entry, rot) : [1, 1];

    let gx: number;
    let gy: number;
    const grid = Array.isArray(row.grid_position) ? row.grid_position : null;
    if (grid && grid.length >= 2 && Number.isFinite(num(grid[0], NaN)) && Number.isFinite(num(grid[1], NaN))) {
      gx = Math.round(num(grid[0], 0));
      gy = Math.round(num(grid[1], 0));
    } else {
      const wp = Array.isArray(row.world_position) ? row.world_position : [0, 0, 0];
      // world center -> top-left anchor
      gx = Math.round(num(wp[0], 0) / CELL_SIZE - (fp[0] - 1) / 2);
      gy = Math.round(num(wp[2], 0) / CELL_SIZE - (fp[1] - 1) / 2);
    }

    const rawLayer = Math.trunc(num(row.type, entry?.layer ?? 3));
    const layer = layerFromRaw(rawLayer);
    const obj: MapObject = { id: uid(), key, gx, gy, rot };
    if (typeof row.label === "string" && row.label.trim()) obj.label = row.label.trim();
    if (entry && layer !== entry.layer) obj.layer = layer;
    if (!entry) obj.layer = layer;
    objects.push(obj);
    maxX = Math.max(maxX, gx + fp[0]);
    maxY = Math.max(maxY, gy + fp[1]);
  }

  // shift negative coords into view
  const minX = Math.min(0, ...objects.map((o) => o.gx));
  const minY = Math.min(0, ...objects.map((o) => o.gy));
  if (minX < 0 || minY < 0) {
    for (const o of objects) {
      o.gx -= minX;
      o.gy -= minY;
    }
    maxX -= minX;
    maxY -= minY;
    warnings.push("Toạ độ âm đã được dịch về gốc (0,0)");
  }

  const width = Math.min(MAX_SIZE, Math.max(num(meta?.width, 0), maxX, DEFAULT_WIDTH));
  const height = Math.min(MAX_SIZE, Math.max(num(meta?.height, 0), maxY, DEFAULT_HEIGHT));

  const doc = createMapDoc({
    name: typeof meta?.name === "string" && meta.name ? meta.name : fallbackName,
    notes: typeof meta?.notes === "string" ? meta.notes : "",
    width,
    height,
    objects,
  });
  return { doc, warnings };
}

// ---------------------------------------------------------------------------
// Editor UI preferences (which map is open) — the maps themselves live in mapStore
// ---------------------------------------------------------------------------

const ACTIVE_KEY = "vinpix.gameDesign.activeMap.v1";

export function loadActiveMapId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ACTIVE_KEY);
  } catch {
    return null;
  }
}

export function saveActiveMapId(id: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (id) window.localStorage.setItem(ACTIVE_KEY, id);
    else window.localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* ignore */
  }
}

/** A starter map similar to the designer's Figma layout (walls around, fridge at a corner). */
export function starterMap(): MapDoc {
  let doc = createMapDoc({ name: "Map 1.1", notes: "Dĩa xalat trộn beefsteak", width: 12, height: 9 });
  for (let y = 0; y < 9; y += 2) for (let x = 0; x < 12; x += 2) doc = placeObject(doc, "floor_in", x, Math.min(y, 7), 0);
  const top: string[] = ["fridge", "tomato counter", "meat_counter", "plate counter", "deliver counter", "deliver counter"];
  top.forEach((k, i) => (doc = placeObject(doc, k, i, 0, 0)));
  for (let x = 6; x < 12; x += 2) doc = placeObject(doc, "wall", x, 0, 0);
  const left: string[] = ["cabbage counter", "cheese_counter", "cutting_counter", "tomato counter", "tomato counter"];
  left.forEach((k, i) => (doc = placeObject(doc, k, 0, i + 1, 0)));
  const right: string[] = ["trash counter", "sink counter", "base_counter", "base_counter", "base_counter"];
  right.forEach((k, i) => (doc = placeObject(doc, k, 11, i + 1, 0)));
  const bottom: string[] = ["flower_pot", "cutting_counter", "cutting_counter", "plate counter", "deliver counter", "deliver counter", "cutting_counter", "cutting_counter", "flower_pot"];
  bottom.forEach((k, i) => (doc = placeObject(doc, k, i, 8, 0)));
  doc = placeObject(doc, "stove counter", 5, 3, 0);
  doc = placeObject(doc, "stove counter", 6, 3, 0);
  doc = placeObject(doc, "stove counter", 5, 4, 0);
  doc = placeObject(doc, "stove counter", 6, 4, 0);
  doc = placeObject(doc, "spawn flag", 2, 4, 0);
  return doc;
}

// ---------------------------------------------------------------------------
// Multi-select / clipboard / layout helpers
// ---------------------------------------------------------------------------

export function cellsOverlapRect(obj: MapObject, x0: number, y0: number, x1: number, y1: number): boolean {
  const [w, h] = objectFootprint(obj);
  const ax1 = obj.gx + w - 1;
  const ay1 = obj.gy + h - 1;
  return !(ax1 < x0 || obj.gx > x1 || ay1 < y0 || obj.gy > y1);
}

/** Objects intersecting a rectangle; floor is only returned when nothing else is inside. */
export function objectsInRect(doc: MapDoc, x0: number, y0: number, x1: number, y1: number): MapObject[] {
  const [ax, bx] = x0 <= x1 ? [x0, x1] : [x1, x0];
  const [ay, by] = y0 <= y1 ? [y0, y1] : [y1, y0];
  const hits = doc.objects.filter((o) => cellsOverlapRect(o, ax, ay, bx, by));
  const nonFloor = hits.filter((o) => objectLayer(o) !== 0);
  return nonFloor.length ? nonFloor : hits;
}

function canPlaceAll(doc: MapDoc, moving: MapObject[], ignoreIds: Set<string>): boolean {
  const others = doc.objects.filter((o) => !ignoreIds.has(o.id));
  for (const m of moving) {
    if (!inBounds(doc, m)) return false;
    if (others.some((o) => collides(o, m))) return false;
    // moving objects must not collide with each other (they didn't before, so skip)
  }
  return true;
}

/** Move a group by a delta; all-or-nothing. */
export function moveObjects(doc: MapDoc, ids: string[], dx: number, dy: number): MapDoc {
  if (!ids.length || (dx === 0 && dy === 0)) return doc;
  const set = new Set(ids);
  const moving = doc.objects.filter((o) => set.has(o.id)).map((o) => ({ ...o, gx: o.gx + dx, gy: o.gy + dy }));
  if (!canPlaceAll(doc, moving, set)) return doc;
  const byId = new Map(moving.map((o) => [o.id, o]));
  return touch({ ...doc, objects: doc.objects.map((o) => byId.get(o.id) ?? o) });
}

/** Rotate a group of objects 90° around each own anchor (best effort per object). */
export function rotateObjects(doc: MapDoc, ids: string[], delta: 90 | -90): MapDoc {
  let next = doc;
  for (const id of ids) next = rotateObject(next, id, delta);
  return next;
}

/** Clipboard payload: objects normalized so the min corner is (0,0). */
export function copyObjects(doc: MapDoc, ids: string[]): MapObject[] {
  const set = new Set(ids);
  const objs = doc.objects.filter((o) => set.has(o.id));
  if (!objs.length) return [];
  const minX = Math.min(...objs.map((o) => o.gx));
  const minY = Math.min(...objs.map((o) => o.gy));
  return objs.map((o) => ({ ...o, gx: o.gx - minX, gy: o.gy - minY }));
}

/**
 * Paste objects at (ox, oy). Overlapping existing objects of the same group are
 * replaced (paint semantics); out-of-bounds objects are dropped.
 */
export function pasteObjects(doc: MapDoc, clip: MapObject[], ox: number, oy: number): { doc: MapDoc; ids: string[] } {
  if (!clip.length) return { doc, ids: [] };
  const incoming: MapObject[] = clip
    .map((o) => ({ ...o, id: uid(), gx: o.gx + ox, gy: o.gy + oy }))
    .filter((o) => inBounds(doc, o));
  if (!incoming.length) return { doc, ids: [] };
  const kept = doc.objects.filter((o) => !incoming.some((n) => collides(o, n)));
  return { doc: touch({ ...doc, objects: [...kept, ...incoming] }), ids: incoming.map((o) => o.id) };
}

/** Fill a rectangle with an item, stepping by its footprint. */
export function fillRect(doc: MapDoc, key: string, rot: Rotation, x0: number, y0: number, x1: number, y1: number, label?: string): MapDoc {
  const entry = resolveCatalogEntry(key);
  if (!entry) return doc;
  const [w, h] = rotatedFootprint(entry, rot);
  const [ax, bx] = x0 <= x1 ? [x0, x1] : [x1, x0];
  const [ay, by] = y0 <= y1 ? [y0, y1] : [y1, y0];
  let next = doc;
  for (let y = ay; y <= by; y += h) for (let x = ax; x <= bx; x += w) next = placeObject(next, key, x, y, rot, label);
  return next;
}

export function eraseRect(doc: MapDoc, x0: number, y0: number, x1: number, y1: number, floorToo: boolean): MapDoc {
  const [ax, bx] = x0 <= x1 ? [x0, x1] : [x1, x0];
  const [ay, by] = y0 <= y1 ? [y0, y1] : [y1, y0];
  const hits = doc.objects.filter((o) => cellsOverlapRect(o, ax, ay, bx, by) && (floorToo || objectLayer(o) !== 0));
  if (!hits.length) return doc;
  return removeObjects(doc, hits.map((o) => o.id));
}

/** Copy another map's layout into this one. */
export function applyLayout(doc: MapDoc, source: MapDoc, mode: "replace" | "merge"): MapDoc {
  const width = Math.max(doc.width, source.width);
  const height = Math.max(doc.height, source.height);
  let base = mode === "replace" ? { ...doc, objects: [] as MapObject[] } : doc;
  base = resizeMap({ ...base, width, height }, width, height);
  const clip = source.objects.map((o) => ({ ...o }));
  return pasteObjects(base, clip, 0, 0).doc;
}

// ---------------------------------------------------------------------------
// Auto-orient: face counters / walls the way the real game levels do.
//
// Conventions (checked against MainAsset/SceneModel/Level/Team/level_1_1_4.tscn):
//   front of a counter / wall at rot 0 faces +z (down on the 2D grid);
//   +90 turns counter-clockwise on screen: 0 ▼, 90 ▶, 180 ▲, 270 ◀.
//   base_counter_corner / cabinet_corner at rot 0 joins the arm to the LEFT and the arm BELOW
//   (top-right corner of a ring); 90 → left+down… i.e. {down,right}, 180 → {right,up}, 270 → {up,left}.
//   conveyer feeds along -basis.z: 0 ▲, 90 ◀, 180 ▼, 270 ▶.
// ---------------------------------------------------------------------------

type Dir = "up" | "right" | "down" | "left";
const DIRS: Array<[Dir, number, number]> = [
  ["up", 0, -1],
  ["right", 1, 0],
  ["down", 0, 1],
  ["left", -1, 0],
];
const FACE_ROT: Record<Dir, Rotation> = { down: 0, right: 90, up: 180, left: 270 };
const CONVEYER_ROT: Record<Dir, Rotation> = { up: 0, left: 90, down: 180, right: 270 };
const CORNER_ROT: Array<[Dir, Dir, Rotation]> = [
  ["left", "down", 0],
  ["down", "right", 90],
  ["right", "up", 180],
  ["up", "left", 270],
];

const isCornerKey = (k: string) => /corner/.test(normalizeKey(k));
const isConveyerKey = (k: string) => normalizeKey(k) === "conveyer";
const isDeliverKey = (k: string) => normalizeKey(k).startsWith("deliver");
const isSpawnKey = (k: string) => normalizeKey(k).startsWith("spawn");
/** Counter-ish things that can form a ring with a corner piece. */
const isCounterLike = (o: MapObject) => objectLayer(o) === 1 || objectLayer(o) === 2;

class CellIndex {
  private solid = new Map<string, MapObject>();
  private floor = new Set<string>();
  constructor(private doc: MapDoc) {
    for (const o of doc.objects) {
      for (const [x, y] of objectCells(o)) {
        const k = `${x},${y}`;
        if (objectLayer(o) === 0) this.floor.add(k);
        else if (!isSpawnKey(o.key)) this.solid.set(k, o);
      }
    }
  }
  inside(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.doc.width && y < this.doc.height;
  }
  solidAt(x: number, y: number) {
    return this.solid.get(`${x},${y}`) ?? null;
  }
  /** Walkable: inside the map, no solid object (floor may be missing on outdoor gaps; still walkable). */
  open(x: number, y: number) {
    return this.inside(x, y) && !this.solid.has(`${x},${y}`);
  }
}

/** Cells just outside the object's footprint on a given side. */
function sideCells(obj: MapObject, dir: Dir): Array<[number, number]> {
  const [w, h] = objectFootprint(obj);
  const out: Array<[number, number]> = [];
  if (dir === "up") for (let i = 0; i < w; i += 1) out.push([obj.gx + i, obj.gy - 1]);
  if (dir === "down") for (let i = 0; i < w; i += 1) out.push([obj.gx + i, obj.gy + h]);
  if (dir === "left") for (let i = 0; i < h; i += 1) out.push([obj.gx - 1, obj.gy + i]);
  if (dir === "right") for (let i = 0; i < h; i += 1) out.push([obj.gx + w, obj.gy + i]);
  return out;
}

/** How much open floor lies in a direction (depth-weighted, 3 cells deep). */
function openness(idx: CellIndex, obj: MapObject, dir: Dir): number {
  const [, dx, dy] = DIRS.find((d) => d[0] === dir)!;
  let score = 0;
  for (const [x, y] of sideCells(obj, dir)) {
    for (let k = 0; k < 3; k += 1) {
      if (!idx.open(x + dx * k, y + dy * k)) break;
      score += 3 - k;
    }
  }
  return score;
}

function towardCentre(doc: MapDoc, obj: MapObject, allowed: Dir[]): Dir {
  const [w, h] = objectFootprint(obj);
  const cx = obj.gx + (w - 1) / 2 - (doc.width - 1) / 2;
  const cy = obj.gy + (h - 1) / 2 - (doc.height - 1) / 2;
  const horiz: Dir = cx > 0 ? "left" : "right";
  const vert: Dir = cy > 0 ? "up" : "down";
  const canH = allowed.includes(horiz);
  const canV = allowed.includes(vert);
  if (canH && canV) return Math.abs(cx) / doc.width >= Math.abs(cy) / doc.height ? horiz : vert;
  return canH ? horiz : vert;
}

function bestFacing(doc: MapDoc, idx: CellIndex, obj: MapObject): Dir {
  const [w, h] = objectFootprint(obj);
  // rectangular pieces keep their long axis: only flip front/back
  const allowed: Dir[] = w === h ? ["up", "right", "down", "left"] : w > h ? ["up", "down"] : ["left", "right"];
  const centre = towardCentre(doc, obj, allowed);
  let best: Dir = centre;
  let bestScore = -1;
  for (const d of allowed) {
    const s = openness(idx, obj, d) * 10 + (d === centre ? 1 : 0);
    if (s > bestScore) {
      bestScore = s;
      best = d;
    }
  }
  return best;
}

function cornerRotation(idx: CellIndex, obj: MapObject): Rotation | null {
  const arms = DIRS.filter(([, dx, dy]) => {
    const n = idx.solidAt(obj.gx + dx, obj.gy + dy);
    return n && n !== obj && (isCounterLike(n) || isCornerKey(n.key) || objectLayer(n) === objectLayer(obj));
  }).map(([d]) => d);
  if (arms.length !== 2) return null;
  const hit = CORNER_ROT.find(([a, b]) => arms.includes(a) && arms.includes(b));
  return hit ? hit[2] : null;
}

/** Point each conveyer toward the nearest deliver counter reachable along its chain; else along the chain. */
function conveyerRotations(doc: MapDoc, idx: CellIndex): Map<string, Rotation> {
  const out = new Map<string, Rotation>();
  const belts = doc.objects.filter((o) => isConveyerKey(o.key));
  if (!belts.length) return out;
  const beltAt = new Map(belts.map((b) => [`${b.gx},${b.gy}`, b]));
  // distance (in belt steps) to a deliver counter, seeded by belts adjacent to one
  const dist = new Map<string, number>();
  const seed: MapObject[] = [];
  for (const b of belts) {
    const nearDeliver = DIRS.some(([, dx, dy]) => {
      const n = idx.solidAt(b.gx + dx, b.gy + dy);
      return n && isDeliverKey(n.key);
    });
    if (nearDeliver) {
      dist.set(b.id, 0);
      seed.push(b);
    }
  }
  const queue = [...seed];
  while (queue.length) {
    const b = queue.shift()!;
    const d = dist.get(b.id)!;
    for (const [, dx, dy] of DIRS) {
      const n = beltAt.get(`${b.gx + dx},${b.gy + dy}`);
      if (n && !dist.has(n.id)) {
        dist.set(n.id, d + 1);
        queue.push(n);
      }
    }
  }
  for (const b of belts) {
    const dHere = dist.get(b.id);
    let dir: Dir | null = null;
    if (dHere === 0) {
      dir = DIRS.find(([, dx, dy]) => {
        const n = idx.solidAt(b.gx + dx, b.gy + dy);
        return n && isDeliverKey(n.key);
      })?.[0] ?? null;
    } else if (dHere !== undefined) {
      let bestD = dHere;
      for (const [d, dx, dy] of DIRS) {
        const n = beltAt.get(`${b.gx + dx},${b.gy + dy}`);
        const nd = n ? dist.get(n.id) : undefined;
        if (nd !== undefined && nd < bestD) {
          bestD = nd;
          dir = d;
        }
      }
    } else {
      // no deliver reachable along the chain: follow the chain, else head for the nearest deliver counter
      const nb = DIRS.filter(([, dx, dy]) => beltAt.has(`${b.gx + dx},${b.gy + dy}`)).map(([d]) => d);
      if (nb.length === 1) dir = nb[0];
      else if (nb.length === 0) {
        let best: MapObject | null = null;
        let bestD = Infinity;
        for (const o of doc.objects) {
          if (!isDeliverKey(o.key)) continue;
          const d = Math.abs(o.gx - b.gx) + Math.abs(o.gy - b.gy);
          if (d < bestD) {
            bestD = d;
            best = o;
          }
        }
        if (best) {
          const dx = best.gx - b.gx;
          const dy = best.gy - b.gy;
          dir = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
        }
      }
    }
    if (dir) out.set(b.id, CONVEYER_ROT[dir]);
  }
  return out;
}

/**
 * Re-orient every non-floor object (or only `ids`) so counters face the walkable
 * side, edge walls face into the room, corner pieces join their two arms and
 * conveyers run toward the deliver counters. Spawn flags are left alone.
 */
export function autoOrient(doc: MapDoc, ids?: string[]): MapDoc {
  const idx = new CellIndex(doc);
  const only = ids ? new Set(ids) : null;
  const belts = conveyerRotations(doc, idx);
  let changed = false;
  const objects = doc.objects.map((o) => {
    if (only && !only.has(o.id)) return o;
    if (objectLayer(o) === 0 || isSpawnKey(o.key)) return o;
    let rot: Rotation;
    if (isConveyerKey(o.key)) {
      const r = belts.get(o.id);
      if (r === undefined) return o;
      rot = r;
    } else if (isCornerKey(o.key)) {
      rot = cornerRotation(idx, o) ?? FACE_ROT[bestFacing(doc, idx, o)];
    } else {
      rot = FACE_ROT[bestFacing(doc, idx, o)];
    }
    if (rot === o.rot) return o;
    // rotating a rectangular piece by 90 would change its footprint; bestFacing never does that
    changed = true;
    return { ...o, rot };
  });
  return changed ? touch({ ...doc, objects }) : doc;
}
