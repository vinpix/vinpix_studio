"use client";

import { useSyncExternalStore } from "react";
import { FLOORZERO_PREFIX, isFloorZeroHost } from "@/lib/floorzero";
import { LASTDUNGEON_PREFIX, isLastDungeonHost } from "@/lib/lastdungeon";

const subscribe = () => () => {};

/**
 * True when the visitor is on a game microsite (Floor Zero or The Last
 * Dungeon: their subdomain, or the raw /floorzero or /lastdungeon prefix in
 * local dev). Always false during SSR — each microsite layout hides
 * `[data-studio-chrome]` with CSS so there is no flash; this hook then
 * unmounts the studio chrome on the client.
 */
export function useIsFloorZeroSite(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      const { hostname, pathname } = window.location;
      return (
        isFloorZeroHost(hostname) ||
        isLastDungeonHost(hostname) ||
        pathname.startsWith(FLOORZERO_PREFIX) ||
        pathname.startsWith(LASTDUNGEON_PREFIX)
      );
    },
    () => false
  );
}

/** Alias with a clearer name for new code. */
export const useIsGameMicrosite = useIsFloorZeroSite;
