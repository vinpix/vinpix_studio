"use client";

import { entryOf, objectFootprint, objectLayer } from "@/features/game-design/mapDoc";
import type { MapDoc } from "@/features/game-design/types";
import { cn } from "@/lib/utils";

/** Tiny SVG top-down render of a MapDoc for cards. */
export default function MapPreview({ doc, className }: { doc: MapDoc | null; className?: string }) {
  if (!doc) {
    return <div className={cn("bg-[#e5e7eb] grid place-items-center text-[10px] uppercase tracking-wider text-gray-500", className)}>Chưa có map</div>;
  }
  const cell = 10;
  const W = doc.width * cell;
  const H = doc.height * cell;
  const sorted = [...doc.objects].sort((a, b) => objectLayer(a) - objectLayer(b));
  return (
    <svg viewBox={`-2 -2 ${W + 4} ${H + 4}`} width="100%" height="100%" className={cn("bg-[#bbdcf2] block", className)} preserveAspectRatio="xMidYMid meet">
      <rect x={0} y={0} width={W} height={H} fill="#f3f4f6" />
      {sorted.map((o) => {
        const [w, h] = objectFootprint(o);
        const e = entryOf(o);
        const layer = objectLayer(o);
        return (
          <rect
            key={o.id}
            x={o.gx * cell + (layer === 0 ? 0 : 0.6)}
            y={o.gy * cell + (layer === 0 ? 0 : 0.6)}
            width={w * cell - (layer === 0 ? 0 : 1.2)}
            height={h * cell - (layer === 0 ? 0 : 1.2)}
            fill={e?.color ?? "#9ca3af"}
            stroke={layer === 0 ? "none" : "#111"}
            strokeWidth={layer === 0 ? 0 : 0.6}
          />
        );
      })}
      {Array.from({ length: doc.width + 1 }, (_, i) => (
        <line key={`v${i}`} x1={i * cell} y1={0} x2={i * cell} y2={H} stroke="#000" strokeOpacity={0.06} strokeWidth={0.5} />
      ))}
      {Array.from({ length: doc.height + 1 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * cell} x2={W} y2={i * cell} stroke="#000" strokeOpacity={0.06} strokeWidth={0.5} />
      ))}
    </svg>
  );
}
