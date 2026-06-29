"use client";

import DitherWrapper from "@/components/DitherWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Dithered hero backdrop. Calms itself to a static field (no wave loop, no
 * mouse interaction) when the visitor prefers reduced motion.
 */
export default function HeroBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 opacity-20 pointer-events-none grayscale contrast-125"
    >
      <DitherWrapper
        waveColor={[0, 0, 0]}
        disableAnimation={reducedMotion}
        enableMouseInteraction={!reducedMotion}
        mouseRadius={0.3}
        colorNum={2}
        pixelSize={4}
        waveAmplitude={0.1}
        waveFrequency={2}
        waveSpeed={0.01}
      />
    </div>
  );
}
