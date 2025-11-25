"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll on tools pages
    if (pathname?.startsWith("/tools")) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.0, // Reduced duration for less "floaty" feel
      easing: (t) => 1 - Math.pow(1 - t, 3), // Standard cubic ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // Reduced from 2 to feel less aggressive
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
