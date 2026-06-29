"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion: reduce` setting.
 * SSR-safe: defaults to `false` so the first paint matches the server,
 * then syncs to the real value after mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * True when the primary pointer is coarse (touch screens).
 * Used to skip cursor-only effects (e.g. the fluid splash cursor) on mobile,
 * where they cost GPU but the user can never see them.
 */
export function useIsCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return coarse;
}
