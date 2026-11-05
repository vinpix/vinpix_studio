"use client";

import { useMapStore } from "@/features/game-design/mapStore";
import type { MapDoc } from "@/features/game-design/types";

/** Maps from the studio store (loaded from the backend, live-updated). */
export function useMaps(): MapDoc[] {
  return useMapStore();
}
