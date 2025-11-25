"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ParallaxGridController() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable on tools pages
    if (pathname?.startsWith("/tools")) {
      return;
    }

    const rootElement = document.documentElement;
    const scroller = document.querySelector("main") as HTMLElement | null;

    // Smooth eased value
    let ticking = false;
    let current = 0;
    const getScroll = () => (scroller ? scroller.scrollTop : window.scrollY);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const rafUpdate = () => {
      const target = getScroll();
      current = lerp(current, target, 0.12); // easing factor
      rootElement.style.setProperty("--grid-parallax", `${current}px`);
      if (Math.abs(target - current) > 0.2) {
        requestAnimationFrame(rafUpdate);
      } else {
        ticking = false;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(rafUpdate);
      }
    };

    // Initialize on mount
    // Initialize on mount
    current = getScroll();
    rootElement.style.setProperty("--grid-parallax", `${current}px`);
    if (scroller)
      scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (scroller) scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
