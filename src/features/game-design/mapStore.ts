/**
 * In-memory list of MapDocs for the studio, mirrored to the backend through the
 * sync queue. Populated by the studio store's `load()`; the editor and level
 * cards read it with `useMapStore()`.
 */

import { useSyncExternalStore } from "react";
import { syncQueue } from "./studio/sync";
import type { MapDoc } from "./types";

let maps: MapDoc[] = [];
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

const EMPTY: MapDoc[] = [];

export const mapStore = {
  getAll: (): MapDoc[] => maps,
  get: (id: string | null | undefined): MapDoc | null => (id ? maps.find((m) => m.id === id) ?? null : null),
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  /** Replace the whole list without syncing (after a server load). */
  replaceAll(next: MapDoc[]) {
    maps = [...next];
    notify();
  },
  /** Insert or update; queued to the backend. */
  upsert(doc: MapDoc, sync = true) {
    const i = maps.findIndex((m) => m.id === doc.id);
    if (i >= 0) {
      if (maps[i] === doc) return;
      maps = maps.map((m) => (m.id === doc.id ? doc : m));
    } else {
      maps = [...maps, doc];
    }
    if (sync) syncQueue.put("map", doc);
    notify();
  },
  remove(id: string) {
    if (!maps.some((m) => m.id === id)) return;
    maps = maps.filter((m) => m.id !== id);
    syncQueue.remove("map", id);
    notify();
  },
};

export function useMapStore(): MapDoc[] {
  return useSyncExternalStore(mapStore.subscribe, mapStore.getAll, () => EMPTY);
}
