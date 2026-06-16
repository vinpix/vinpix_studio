"use client";

import type { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import SplashCursor from "./SplashCursor";

/** Renders the fluid splash cursor everywhere except app surfaces that have their own chrome. */
export default function ConditionalSplashCursor(
  props: ComponentProps<typeof SplashCursor>
) {
  const pathname = usePathname();
  if (pathname?.startsWith("/team")) return null;
  return <SplashCursor {...props} />;
}
