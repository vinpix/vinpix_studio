"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "./SmoothScroll";

export default function ParallaxGridController() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Disable on tools pages
    if (pathname?.startsWith("/tools")) {
      return;
    }

    const rootElement = document.documentElement;

    const updateParallax = (scroll: number) => {
      rootElement.style.setProperty("--grid-parallax", `${scroll}px`);
    };

    // Initial set
    updateParallax(window.scrollY);

    // If Lenis is active, use it
    if (lenis) {
      const onScroll = (e: any) => {
        updateParallax(e.scroll);
      };
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    } else {
      // Fallback to native scroll if lenis is not ready yet or disabled
      const onScroll = () => {
        updateParallax(window.scrollY);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [pathname, lenis]);

  return null;
}
