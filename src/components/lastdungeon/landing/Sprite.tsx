import Image from "next/image";
import type { CSSProperties } from "react";
import { SPR, type SpriteName } from "./sprites";

export const LD_ASSETS = "/ld/landing";

/**
 * Pixel-art sprite at an integer scale. Strips (n > 1) animate with CSS
 * `steps()`; single images render as a plain unoptimized next/image. A strip
 * stays on frame 0 under prefers-reduced-motion (see landing.css).
 */
export function Sprite({
  name,
  scale = 4,
  fps = 8,
  className = "",
  style,
  label,
}: {
  name: SpriteName;
  scale?: number;
  fps?: number;
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  const d = SPR[name];
  const url = `${LD_ASSETS}/${d.src}/${name.replace(/^(wp|ic)-/, "")}.png`;
  const w = d.w * scale;
  const h = d.h * scale;
  if (d.n === 1) {
    return (
      <Image
        src={url}
        alt={label ?? ""}
        width={w}
        height={h}
        unoptimized
        className={`ld-px ${className}`}
        style={{ width: w, height: h, ...style }}
      />
    );
  }
  const vars = {
    "--sw": `${d.n * w}px`,
    width: w,
    height: h,
    backgroundImage: `url(${url})`,
    backgroundSize: `${d.n * w}px ${h}px`,
    animationDuration: `${d.n / fps}s`,
    animationTimingFunction: `steps(${d.n})`,
    ...style,
  } as CSSProperties;
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`ld-spr ${className}`}
      style={vars}
    />
  );
}
