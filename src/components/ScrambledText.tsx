"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ScrambledTextProps = {
  className?: string;
  radius?: number; // unused for now; kept for API compatibility
  duration?: number; // seconds
  speed?: number; // scramble speed multiplier
  scrambleChars?: string; // character set to scramble with
  children: React.ReactNode;
};

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  const parts: string[] = [];
  React.Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      parts.push(String(child));
    }
  });
  return parts.join("");
}

export default function ScrambledText({
  className,
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{};:'\",.<>/?|~-",
  children,
}: ScrambledTextProps) {
  const originalText = useMemo(() => getTextFromChildren(children), [children]);
  const [display, setDisplay] = useState<string>(originalText);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const runningRef = useRef<boolean>(false);

  const start = () => {
    startRef.current = performance.now();
    runningRef.current = true;
    tick();
  };

  const stop = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    runningRef.current = false;
  };

  useEffect(() => {
    // restart when text changes
    setDisplay(originalText);
    start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalText]);

  const tick = () => {
    rafRef.current = requestAnimationFrame(() => {
      if (!startRef.current) startRef.current = performance.now();
      const now = performance.now();
      const elapsed = (now - startRef.current) / 1000; // seconds
      const progress = Math.min(1, elapsed / Math.max(0.0001, duration));

      const chars = originalText.split("");
      const len = chars.length;
      const out: string[] = new Array(len);

      // vary randomness over time using speed multiplier
      const jitterSeed = Math.floor(now * (10 * Math.max(0.1, speed)));

      for (let i = 0; i < len; i++) {
        const ch = chars[i];
        if (ch === " " || ch === "\n" || ch === "\t") {
          out[i] = ch;
          continue;
        }
        const threshold = i / Math.max(1, len - 1);
        if (progress >= threshold) {
          out[i] = ch;
        } else {
          // pick a pseudo-random char from scramble set
          const idx = Math.abs((i * 31 + jitterSeed) % scrambleChars.length);
          out[i] = scrambleChars.charAt(idx);
        }
      }

      const nextText = out.join("");
      setDisplay(nextText);

      if (progress < 1 && runningRef.current) {
        tick();
      } else {
        // finalize to original text
        setDisplay(originalText);
        stop();
      }
    });
  };

  const handleMouseEnter = () => {
    // re-trigger effect on hover
    startRef.current = performance.now();
    if (!runningRef.current) {
      runningRef.current = true;
      tick();
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      aria-label={originalText}
    >
      {display}
    </span>
  );
}
