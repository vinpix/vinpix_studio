"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Disable smooth scroll on tools pages
    if (pathname?.startsWith("/tools")) {
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.0, // Reduced duration for less "floaty" feel
      easing: (t) => 1 - Math.pow(1 - t, 3), // Standard cubic ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5, // Reduced from 2 to feel less aggressive
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
