/**
 * Studio store: in-memory state loaded from the backend (`gdLoad`), subscribed
 * through useSyncExternalStore. Every mutation is applied locally first, then
 * the changed/removed records are queued to `gdSave` (see sync.ts).
 */

import { useSyncExternalStore } from "react";
import { uid } from "../mapDoc";
import { mapStore } from "../mapStore";
import { SEED, seedMapFor } from "./seed";
import { gdCall, syncQueue } from "./sync";
import type { Dish, Level, StudioData, World } from "./types";
import type { MapDoc } from "../types";

export type LoadStatus = "idle" | "loading" | "ready" | "error";
export type StudioStatus = { status: LoadStatus; error: string | null; seeded: boolean };

const EMPTY: StudioData = { version: 1, worlds: [], dishes: [], levels: [] };

let state: StudioData = EMPTY;
let status: StudioStatus = { status: "idle", error: null, seeded: false };
let loadPromise: Promise<void> | null = null;

const listeners = new Set<() => void>();
const statusListeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const notifyStatus = () => statusListeners.forEach((l) => l());

function setStatus(patch: Partial<StudioStatus>) {
  status = { ...status, ...patch };
  notifyStatus();
}

function read(): StudioData {
  return state;
}

// ---------------------------------------------------------------------------
// Loading / seeding
// ---------------------------------------------------------------------------

type LoadPayload = { worlds: World[]; dishes: Dish[]; levels: Level[]; maps: MapDoc[]; empty: boolean };

function sortWorlds(worlds: World[]): World[] {
  return [...worlds].sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9) || a.name.localeCompare(b.name));
}

function normalizeDish(d: Dish): Dish {
  return d.finishStation === undefined ? { ...d, finishStation: "assemble" } : d;
}

/** Fresh copy of the dummy content, worlds numbered so the order is stable server-side. */
function seedData(): { data: StudioData; maps: MapDoc[] } {
  const data: StudioData = JSON.parse(JSON.stringify(SEED));
  data.worlds = data.worlds.map((w, i) => ({ ...w, order: i }));
  const maps: MapDoc[] = [];
  data.worlds.forEach((w) => {
    w.levelIds.forEach((lid, i) => {
      const lv = data.levels.find((l) => l.id === lid);
      if (!lv?.mapId) return;
      maps.push(seedMapFor(lv.id, lv.mapId, `${w.name} ${levelCode(data, lv)} · ${lv.name}`, i));
    });
  });
  return { data, maps };
}

/** Make sure every level has a MapDoc (queues any it creates). */
function ensureLevelMaps(data: StudioData) {
  data.worlds.forEach((w) => {
    w.levelIds.forEach((lid, i) => {
      const lv = data.levels.find((l) => l.id === lid);
      if (!lv?.mapId || mapStore.get(lv.mapId)) return;
      mapStore.upsert(seedMapFor(lv.id, lv.mapId, `${w.name} ${levelCode(data, lv)} · ${lv.name}`, i));
    });
  });
}

function pushAll(data: StudioData, maps: MapDoc[]) {
  data.worlds.forEach((w) => syncQueue.put("world", w));
  data.dishes.forEach((d) => syncQueue.put("dish", d));
  data.levels.forEach((l) => syncQueue.put("level", l));
  maps.forEach((m) => syncQueue.put("map", m));
}

async function doLoad(): Promise<void> {
  setStatus({ status: "loading", error: null });
  try {
    const r = await gdCall<LoadPayload>("gdLoad");
    if (r.empty) {
      const { data, maps } = seedData();
      state = data;
      mapStore.replaceAll(maps);
      pushAll(data, maps);
      void syncQueue.flush();
      setStatus({ status: "ready", seeded: true });
    } else {
      state = {
        version: 1,
        worlds: sortWorlds(r.worlds ?? []),
        dishes: (r.dishes ?? []).map(normalizeDish),
        levels: r.levels ?? [],
      };
      mapStore.replaceAll(r.maps ?? []);
      ensureLevelMaps(state);
      setStatus({ status: "ready", seeded: false });
    }
    notify();
  } catch (e) {
    setStatus({ status: "error", error: e instanceof Error ? e.message : "Không tải được dữ liệu" });
    throw e;
  }
}

/** Load once from the backend (idempotent; call again after an error to retry). */
export function loadStudio(): Promise<void> {
  if (!loadPromise || status.status === "error") {
    loadPromise = doLoad().catch(() => undefined);
  }
  return loadPromise;
}

/** Kept for callers that only need the data to exist client-side. */
export function ensureStudioLoaded(): void {
  if (typeof window !== "undefined") void loadStudio();
}

export function useStudio(): StudioData {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
    read,
    () => EMPTY,
  );
}

const SERVER_STATUS: StudioStatus = { status: "loading", error: null, seeded: false };
export function useStudioStatus(): StudioStatus {
  return useSyncExternalStore(
    (l) => {
      statusListeners.add(l);
      return () => {
        statusListeners.delete(l);
      };
    },
    () => status,
    () => SERVER_STATUS,
  );
}

// ---------------------------------------------------------------------------
// Writing: apply locally, diff, queue
// ---------------------------------------------------------------------------

function diffQueue<T extends { id: string }>(kind: "world" | "dish" | "level", prev: T[], next: T[]) {
  const prevById = new Map(prev.map((x) => [x.id, x]));
  const seen = new Set<string>();
  for (const item of next) {
    seen.add(item.id);
    if (prevById.get(item.id) !== item) syncQueue.put(kind, item);
  }
  for (const item of prev) if (!seen.has(item.id)) syncQueue.remove(kind, item.id);
}

function write(next: StudioData) {
  const prev = state;
  state = next;
  diffQueue("world", prev.worlds, next.worlds);
  diffQueue("dish", prev.dishes, next.dishes);
  diffQueue("level", prev.levels, next.levels);
  notify();
}

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

export function worldOf(data: StudioData, id: string | null | undefined): World | null {
  return data.worlds.find((w) => w.id === id) ?? null;
}

export function levelsOf(data: StudioData, world: World): Level[] {
  return world.levelIds.map((id) => data.levels.find((l) => l.id === id)).filter((l): l is Level => Boolean(l));
}

export function dishesOf(data: StudioData, world: World): Dish[] {
  return world.dishIds.map((id) => data.dishes.find((d) => d.id === id)).filter((d): d is Dish => Boolean(d));
}

/** "1.3" — world index . level index (both 1-based). */
export function levelCode(data: StudioData, level: Level): string {
  const wi = data.worlds.findIndex((w) => w.id === level.worldId);
  const w = data.worlds[wi];
  const li = w ? w.levelIds.indexOf(level.id) : -1;
  return `${wi + 1}.${li + 1}`;
}

/** Dishes available in a level = all newDishIds of levels up to and including it. */
export function availableDishIds(data: StudioData, level: Level): string[] {
  const w = worldOf(data, level.worldId);
  if (!w) return [];
  const idx = w.levelIds.indexOf(level.id);
  const out: string[] = [];
  levelsOf(data, w)
    .slice(0, idx + 1)
    .forEach((l) => l.newDishIds.forEach((d) => !out.includes(d) && out.push(d)));
  return out;
}

/** First level (code) where a dish appears, or null. */
export function firstAppearance(data: StudioData, dish: Dish): Level | null {
  const w = worldOf(data, dish.worldId);
  if (!w) return null;
  return levelsOf(data, w).find((l) => l.newDishIds.includes(dish.id)) ?? null;
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export const studio = {
  /** Wipe the backend and re-seed the dummy content. */
  async reset(): Promise<void> {
    syncQueue.clear();
    await gdCall("gdReset", { confirm: true });
    const { data, maps } = seedData();
    state = data;
    mapStore.replaceAll(maps);
    pushAll(data, maps);
    notify();
    await syncQueue.flush();
  },

  updateWorld(id: string, patch: Partial<World>) {
    const s = read();
    write({ ...s, worlds: s.worlds.map((w) => (w.id === id ? { ...w, ...patch } : w)) });
  },
  addWorld(): World {
    const s = read();
    const w: World = {
      id: uid(),
      name: `World ${s.worlds.length + 1}`,
      flag: "🏳️",
      region: "—",
      description: "",
      theme: "",
      status: "draft",
      defaultStations: ["chop", "stove"],
      dishIds: [],
      levelIds: [],
      accent: "#e5e7eb",
      order: s.worlds.reduce((m, x) => Math.max(m, x.order ?? -1), -1) + 1,
    };
    write({ ...s, worlds: [...s.worlds, w] });
    return w;
  },
  removeWorld(id: string) {
    const s = read();
    const w = s.worlds.find((x) => x.id === id);
    write({
      ...s,
      worlds: s.worlds.filter((x) => x.id !== id),
      dishes: s.dishes.filter((d) => d.worldId !== id),
      levels: s.levels.filter((l) => l.worldId !== id),
    });
    // maps only live through their level; drop them too
    w?.levelIds.forEach((lid) => {
      const lv = s.levels.find((l) => l.id === lid);
      if (lv?.mapId) mapStore.remove(lv.mapId);
    });
  },

  addLevel(worldId: string): Level {
    const s = read();
    const w = s.worlds.find((x) => x.id === worldId);
    if (!w) throw new Error("world not found");
    const n = w.levelIds.length + 1;
    const mapId = uid();
    const lv: Level = {
      id: uid(),
      worldId,
      name: `Level ${n}`,
      mapId,
      durationSec: 180,
      players: [2, 4],
      difficulty: Math.min(5, Math.max(1, Math.round(n / 1.5))),
      newDishIds: [],
      stars: { one: 200, two: 400, three: 600 },
      notes: "",
    };
    mapStore.upsert(seedMapFor(lv.id, mapId, `${w.name} ${s.worlds.indexOf(w) + 1}.${n} · ${lv.name}`, n - 1));
    write({ ...s, levels: [...s.levels, lv], worlds: s.worlds.map((x) => (x.id === worldId ? { ...x, levelIds: [...x.levelIds, lv.id] } : x)) });
    return lv;
  },
  updateLevel(id: string, patch: Partial<Level>) {
    const s = read();
    write({ ...s, levels: s.levels.map((l) => (l.id === id ? { ...l, ...patch } : l)) });
  },
  removeLevel(id: string) {
    const s = read();
    write({ ...s, levels: s.levels.filter((l) => l.id !== id), worlds: s.worlds.map((w) => ({ ...w, levelIds: w.levelIds.filter((x) => x !== id) })) });
  },
  moveLevel(id: string, dir: -1 | 1) {
    const s = read();
    write({
      ...s,
      worlds: s.worlds.map((w) => {
        const i = w.levelIds.indexOf(id);
        if (i < 0) return w;
        const j = i + dir;
        if (j < 0 || j >= w.levelIds.length) return w;
        const ids = [...w.levelIds];
        [ids[i], ids[j]] = [ids[j], ids[i]];
        return { ...w, levelIds: ids };
      }),
    });
  },
  /** Toggle "dish first unlocks in this level" (a dish unlocks in at most one level). */
  toggleNewDish(levelId: string, dishId: string) {
    const s = read();
    const lv = s.levels.find((l) => l.id === levelId);
    if (!lv) return;
    const on = lv.newDishIds.includes(dishId);
    write({
      ...s,
      levels: s.levels.map((l) => {
        if (l.id === levelId) return { ...l, newDishIds: on ? l.newDishIds.filter((d) => d !== dishId) : [...l.newDishIds, dishId] };
        if (l.worldId === lv.worldId && !on && l.newDishIds.includes(dishId)) return { ...l, newDishIds: l.newDishIds.filter((d) => d !== dishId) };
        return l;
      }),
    });
  },

  addDish(worldId: string): Dish {
    const s = read();
    const w = s.worlds.find((x) => x.id === worldId);
    if (!w) throw new Error("world not found");
    const d: Dish = {
      id: uid(),
      worldId,
      name: `Món mới ${w.dishIds.length + 1}`,
      emoji: "🍽️",
      description: "",
      ingredients: [],
      stations: [],
      steps: [],
      finishStation: "assemble",
      status: "draft",
      prepSec: 12,
      score: 40,
    };
    write({ ...s, dishes: [...s.dishes, d], worlds: s.worlds.map((x) => (x.id === worldId ? { ...x, dishIds: [...x.dishIds, d.id] } : x)) });
    return d;
  },
  updateDish(id: string, patch: Partial<Dish>) {
    const s = read();
    write({
      ...s,
      dishes: s.dishes.map((d) => {
        if (d.id !== id) return d;
        const next = { ...d, ...patch };
        if (patch.steps || patch.finishStation !== undefined) {
          next.stations = Array.from(new Set([...next.steps.map((st) => st.station), next.finishStation].filter((x): x is NonNullable<typeof x> => Boolean(x))));
        }
        return next;
      }),
    });
  },
  removeDish(id: string) {
    const s = read();
    write({
      ...s,
      dishes: s.dishes.filter((d) => d.id !== id),
      worlds: s.worlds.map((w) => ({ ...w, dishIds: w.dishIds.filter((x) => x !== id) })),
      levels: s.levels.map((l) => (l.newDishIds.includes(id) ? { ...l, newDishIds: l.newDishIds.filter((x) => x !== id) } : l)),
    });
  },
};
