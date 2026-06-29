"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import SplashCursor from "./SplashCursor";
import { useIsCoarsePointer, useReducedMotion } from "@/hooks/useReducedMotion";

/** Renders the fluid splash cursor everywhere except app surfaces that have their own chrome. */
export default function ConditionalSplashCursor(
  props: ComponentProps<typeof SplashCursor>
) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  if (pathname?.startsWith("/team")) return null;
  // The fluid simulation is a cursor-driven WebGL effect: pointless on touch
  // devices and unwelcome when the visitor asked for reduced motion. Skipping
  // it there also reclaims significant GPU/CPU on the landing page.
  if (reducedMotion || coarsePointer) return null;

  return <SplashCursor {...props} />;
}
