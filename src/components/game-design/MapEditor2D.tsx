"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATALOG_BY_KEY, normalizeKey, rotatedFootprint } from "@/features/game-design/catalog";
import {
  entryOf,
  eraseRect,
  fillRect,
  moveObjects,
  objectFootprint,
  objectLayer,
  objectsInRect,
  topObjectAt,
} from "@/features/game-design/mapDoc";
import {
  layerTypeOf,
  type EditorTool,
  type LayerVisibility,
  type MapDoc,
  type MapObject,
  type Rotation,
} from "@/features/game-design/types";

export const CELL_PX = 56;
export const ZOOM_MIN = 0.4;
export const ZOOM_MAX = 2.5;
export const clampZoom = (z: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +z.toFixed(3)));
const PAD = 24;

import { thumbKey, type Thumb } from "@/features/game-design/thumbnails";

export type Thumbs = Record<string, Thumb>;

type Props = {
  doc: MapDoc;
  tool: EditorTool;
  activeKey: string | null;
  /** label stamped on placed custom counters */
  activeLabel?: string;
  activeRot: Rotation;
  selectedIds: string[];
  visibility: LayerVisibility;
  zoom: number;
  thumbs: Thumbs;
  showLabels: boolean;
  onChange: (next: MapDoc) => void;
  onSelect: (ids: string[]) => void;
  onToolChange: (tool: EditorTool) => void;
  onHoverCell: (cell: [number, number] | null) => void;
  onZoom?: (zoom: number) => void;
};

type Drag =
  | { kind: "move"; ids: string[]; lastX: number; lastY: number }
  | { kind: "rect"; mode: "select" | "fill" | "erase"; x0: number; y0: number; x1: number; y1: number; additive: boolean }
  | null;

function dirArrow(rot: Rotation): string {
  // "front" = +z at rot 0 (down on screen); +90 rotates counter-clockwise on screen
  return rot === 0 ? "▼" : rot === 90 ? "▶" : rot === 180 ? "▲" : "◀";
}

export default function MapEditor2D({
  doc,
  tool,
  activeKey,
  activeLabel,
  activeRot,
  selectedIds,
  visibility,
  zoom,
  thumbs,
  showLabels,
  onChange,
  onSelect,
  onToolChange,
  onHoverCell,
  onZoom,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const W = doc.width * CELL_PX;
  const H = doc.height * CELL_PX;
  const scrollRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(zoom);
  const rafRef = useRef(0);
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Wheel: cuộn / pinch → zoom về phía con trỏ. Shift+cuộn → pan.
  // Áp zoom thẳng vào DOM (không đợi React) rồi mới báo lên parent theo rAF để mượt.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !onZoom) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.shiftKey) {
        el.scrollLeft += e.deltaX || e.deltaY;
        el.scrollTop += e.deltaX ? e.deltaY : 0;
        return;
      }
      const cur = zoomRef.current;
      // pinch (ctrlKey, delta nhỏ) mạnh hơn cuộn thường một chút
      const k = e.ctrlKey ? 0.012 : 0.0025;
      const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const next = clampZoom(cur * Math.exp(-delta * k));
      if (next === cur) return;
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const px = (el.scrollLeft + cx) / cur;
      const py = (el.scrollTop + cy) / cur;
      zoomRef.current = next;
      const svg = svgRef.current;
      if (svg) {
        svg.setAttribute("width", String((W + PAD * 2) * next));
        svg.setAttribute("height", String((H + PAD * 2) * next));
      }
      el.scrollLeft = px * next - cx;
      el.scrollTop = py * next - cy;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => onZoom(zoomRef.current));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onZoom, W, H]);
  const [hover, setHover] = useState<[number, number] | null>(null);
  const [drag, setDragState] = useState<Drag>(null);
  const dragRef = useRef<Drag>(null);
  const setDrag = (d: Drag) => {
    dragRef.current = d;
    setDragState(d);
  };
  const docRef = useRef(doc);
  docRef.current = doc;
  const selRef = useRef(selectedIds);
  selRef.current = selectedIds;


  const cellFromEvent = useCallback(
    (e: { clientX: number; clientY: number }, clamp = false): [number, number] | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const rect = svg.getBoundingClientRect();
      const scaleX = rect.width / (W + PAD * 2);
      const scaleY = rect.height / (H + PAD * 2);
      const x = (e.clientX - rect.left) / scaleX - PAD;
      const y = (e.clientY - rect.top) / scaleY - PAD;
      let gx = Math.floor(x / CELL_PX);
      let gy = Math.floor(y / CELL_PX);
      const d = docRef.current;
      if (clamp) {
        gx = Math.max(0, Math.min(d.width - 1, gx));
        gy = Math.max(0, Math.min(d.height - 1, gy));
      } else if (gx < 0 || gy < 0 || gx >= d.width || gy >= d.height) return null;
      return [gx, gy];
    },
    [W, H]
  );

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const cell = cellFromEvent(e);
    if (!cell) return;
    const [gx, gy] = cell;
    e.currentTarget.setPointerCapture(e.pointerId);

    // right-drag: erase a rectangle (single click = one cell)
    if (e.button === 2) {
      return setDrag({ kind: "rect", mode: "erase", x0: gx, y0: gy, x1: gx, y1: gy, additive: false });
    }
    // paint tool: drag = fill a rectangle (single click = one cell)
    if (tool === "place") {
      return setDrag({ kind: "rect", mode: "fill", x0: gx, y0: gy, x1: gx, y1: gy, additive: false });
    }
    // select tool
    // floor only selectable with Alt held; otherwise clicking floor starts a marquee
    const raw = topObjectAt(docRef.current, gx, gy);
    const hit = raw && (objectLayer(raw) !== 0 || e.altKey) ? raw : null;
    if (!hit) {
      setDrag({ kind: "rect", mode: "select", x0: gx, y0: gy, x1: gx, y1: gy, additive: e.shiftKey || e.metaKey || e.ctrlKey });
      if (!(e.shiftKey || e.metaKey || e.ctrlKey)) onSelect([]);
      return;
    }
    let ids: string[];
    if (e.shiftKey || e.metaKey || e.ctrlKey) {
      ids = selRef.current.includes(hit.id) ? selRef.current.filter((i) => i !== hit.id) : [...selRef.current, hit.id];
      onSelect(ids);
      return;
    }
    // drag on an already-selected object moves the selection; otherwise start a marquee from here
    if (selRef.current.includes(hit.id)) {
      setDrag({ kind: "move", ids: selRef.current, lastX: gx, lastY: gy });
      return;
    }
    onSelect([]);
    setDrag({ kind: "rect", mode: "select", x0: gx, y0: gy, x1: gx, y1: gy, additive: false });
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current;
    const cell = cellFromEvent(e, d?.kind === "rect" || d?.kind === "move");
    setHover(cell);
    onHoverCell(cell);
    if (!d || !cell) return;
    const [gx, gy] = cell;
    if (d.kind === "rect") {
      if (gx !== d.x1 || gy !== d.y1) setDrag({ ...d, x1: gx, y1: gy });
    } else if (d.kind === "move") {
      const dx = gx - d.lastX;
      const dy = gy - d.lastY;
      if (!dx && !dy) return;
      const next = moveObjects(docRef.current, d.ids, dx, dy);
      if (next !== docRef.current) {
        onChange(next);
        setDrag({ ...d, lastX: gx, lastY: gy });
      }
    }
  };

  const endDrag = useCallback(
    (e?: { altKey?: boolean }) => {
      const d = dragRef.current;
      if (d?.kind === "rect") {
        const cur = docRef.current;
        if (d.mode === "select") {
          const ids = objectsInRect(cur, d.x0, d.y0, d.x1, d.y1).map((o) => o.id);
          onSelect(d.additive ? Array.from(new Set([...selRef.current, ...ids])) : ids);
        } else if (d.mode === "fill" && activeKey) {
          onChange(fillRect(cur, activeKey, activeRot, d.x0, d.y0, d.x1, d.y1, activeLabel));
        } else if (d.mode === "erase") {
          onChange(eraseRect(cur, d.x0, d.y0, d.x1, d.y1, Boolean(e?.altKey)));
        }
      }
      setDrag(null);
    },
    [activeKey, activeLabel, activeRot, onChange, onSelect]
  );

  useEffect(() => {
    const up = (e: PointerEvent) => endDrag(e);
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, [endDrag]);

  const ghost = useMemo(() => {
    if (tool !== "place" || !activeKey || !hover) return null;
    const entry = CATALOG_BY_KEY.get(normalizeKey(activeKey));
    if (!entry) return null;
    const [w, h] = rotatedFootprint(entry, activeRot);
    return { gx: hover[0], gy: hover[1], w, h, entry };
  }, [tool, activeKey, hover, activeRot]);

  const sorted = useMemo(
    () =>
      [...doc.objects].sort((a, b) => {
        const fa = objectLayer(a) === 0 ? 0 : 1;
        const fb = objectLayer(b) === 0 ? 0 : 1;
        if (fa !== fb) return fa - fb;
        const ba = a.gy + objectFootprint(a)[1];
        const bb = b.gy + objectFootprint(b)[1];
        return ba - bb || a.gx - b.gx;
      }),
    [doc.objects]
  );
  const sel = useMemo(() => new Set(selectedIds), [selectedIds]);

  const rect =
    drag?.kind === "rect"
      ? {
          x: Math.min(drag.x0, drag.x1) * CELL_PX,
          y: Math.min(drag.y0, drag.y1) * CELL_PX,
          w: (Math.abs(drag.x1 - drag.x0) + 1) * CELL_PX,
          h: (Math.abs(drag.y1 - drag.y0) + 1) * CELL_PX,
          mode: drag.mode,
        }
      : null;

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-auto bg-[#f7f7f7] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:16px_16px]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="inline-block p-6" style={{ minWidth: "100%" }}>
        <svg
          ref={svgRef}
          width={(W + PAD * 2) * zoom}
          height={(H + PAD * 2) * zoom}
          viewBox={`0 0 ${W + PAD * 2} ${H + PAD * 2}`}
          className="select-none touch-none block mx-auto"
          style={{ cursor: tool === "place" ? "crosshair" : "default" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e)}
          onPointerLeave={() => {
            setHover(null);
            onHoverCell(null);
          }}
          onDoubleClick={(e) => {
            const cell = cellFromEvent(e);
            if (!cell) return;
            const hit = topObjectAt(docRef.current, cell[0], cell[1]);
            if (hit) {
              onSelect([hit.id]);
              onToolChange("select");
            }
          }}
        >
          <g transform={`translate(${PAD} ${PAD})`}>
            <rect x={0} y={0} width={W} height={H} fill="#ffffff" stroke="#111" strokeWidth={1.5} />
            {Array.from({ length: doc.width + 1 }, (_, i) => (
              <line key={`v${i}`} x1={i * CELL_PX} y1={0} x2={i * CELL_PX} y2={H} stroke="#e5e7eb" strokeWidth={1} />
            ))}
            {Array.from({ length: doc.height + 1 }, (_, i) => (
              <line key={`h${i}`} x1={0} y1={i * CELL_PX} x2={W} y2={i * CELL_PX} stroke="#e5e7eb" strokeWidth={1} />
            ))}
            {Array.from({ length: doc.width }, (_, i) => (
              <text key={`cx${i}`} x={i * CELL_PX + CELL_PX / 2} y={-8} fontSize={10} fill="#9ca3af" textAnchor="middle">
                {i}
              </text>
            ))}
            {Array.from({ length: doc.height }, (_, i) => (
              <text key={`cy${i}`} x={-8} y={i * CELL_PX + CELL_PX / 2 + 3} fontSize={10} fill="#9ca3af" textAnchor="end">
                {i}
              </text>
            ))}

            {sorted.map((o) => (
              <Tile key={o.id} obj={o} selected={sel.has(o.id)} visibility={visibility} thumbs={thumbs} showLabels={showLabels} />
            ))}

            {ghost && (
              <g pointerEvents="none" opacity={0.65}>
                <TileArt entry={ghost.entry} rot={activeRot} x={ghost.gx * CELL_PX} y={ghost.gy * CELL_PX} w={ghost.w} h={ghost.h} thumbs={thumbs} label={showLabels} customLabel={activeLabel} />
                <rect x={ghost.gx * CELL_PX + 1} y={ghost.gy * CELL_PX + 1} width={ghost.w * CELL_PX - 2} height={ghost.h * CELL_PX - 2} fill="none" stroke="#111" strokeDasharray="4 3" />
              </g>
            )}

            {rect && (
              <rect
                pointerEvents="none"
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
                fill={rect.mode === "erase" ? "rgba(239,68,68,0.15)" : rect.mode === "fill" ? "rgba(16,185,129,0.15)" : "rgba(37,99,235,0.12)"}
                stroke={rect.mode === "erase" ? "#ef4444" : rect.mode === "fill" ? "#10b981" : "#2563eb"}
                strokeWidth={1.5}
                strokeDasharray="5 3"
              />
            )}

            {hover && tool !== "place" && !rect && (
              <rect pointerEvents="none" x={hover[0] * CELL_PX} y={hover[1] * CELL_PX} width={CELL_PX} height={CELL_PX} fill="none" stroke="#2563eb" strokeWidth={1.5} />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}

function TileArt({
  entry,
  rot,
  x,
  y,
  w,
  h,
  thumbs,
  label,
  fallbackKey,
  customLabel,
}: {
  entry: ReturnType<typeof entryOf>;
  rot: Rotation;
  x: number;
  y: number;
  w: number;
  h: number;
  thumbs: Thumbs;
  label: boolean;
  fallbackKey?: string;
  customLabel?: string;
}) {
  const pw = w * CELL_PX;
  const ph = h * CELL_PX;
  const cx = x + pw / 2;
  const cy = y + ph / 2;
  if (entry?.custom) {
    // label-only block: white square, black border, name centered
    const name = customLabel?.trim() || "?";
    const fs = name.length > 10 ? 7 : 8.5;
    const lines = wrapLabel(name, Math.max(4, Math.floor((pw - 10) / (fs * 0.58))), 3);
    const lh = fs + 1.5;
    const y0 = cy - ((lines.length - 1) * lh) / 2 + fs / 3;
    return (
      <g>
        <rect x={x + 3} y={y + 3} width={pw - 6} height={ph - 6} rx={2} fill="#fff" stroke="#111827" strokeWidth={1.5} strokeDasharray={customLabel ? undefined : "3 2"} />
        {lines.map((ln, i) => (
          <text key={i} x={cx} y={y0 + i * lh} fontSize={fs} fontWeight={700} textAnchor="middle" fill="#111827" pointerEvents="none">
            {ln}
          </text>
        ))}
      </g>
    );
  }
  const thumb = entry ? thumbs[thumbKey(entry.key, rot)] : undefined;
  const name = entry?.label ?? fallbackKey ?? "?";
  let img: React.ReactNode = null;
  if (thumb) {
    // image width == rotated footprint width; scale so it matches the tile width,
    // then align the image's ground center with the tile center (objects rise upward).
    const scale = pw / thumb.w;
    const ih = thumb.h * scale;
    img = <image href={thumb.url} x={x} y={cy - thumb.groundY * scale} width={pw} height={ih} preserveAspectRatio="none" />;
  }
  return (
    <g>
      {img ?? <rect x={x + 3} y={y + 3} width={pw - 6} height={ph - 6} rx={3} fill={entry?.color ?? "#fca5a5"} stroke="#374151" strokeWidth={1} />}
      {(label || !thumb) && (
        <g pointerEvents="none">
          <rect x={cx - Math.min(pw - 6, name.length * 5.4 + 8) / 2} y={y + ph - 15} width={Math.min(pw - 6, name.length * 5.4 + 8)} height={12} rx={2} fill="rgba(255,255,255,0.85)" />
          <text x={cx} y={y + ph - 6} fontSize={8.5} fontWeight={600} textAnchor="middle" fill="#111827">
            {name}
          </text>
        </g>
      )}
    </g>
  );
}

/** Greedy word wrap for tile labels; the last line gets an ellipsis if it still overflows. */
function wrapLabel(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxChars) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w.length > maxChars ? w.slice(0, maxChars - 1) + "…" : w;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  const rest = words.join(" ");
  if (lines.join(" ").replace(/…/g, "") !== rest && !lines[lines.length - 1].endsWith("…")) {
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.slice(0, Math.max(1, maxChars - 1)) + "…";
  }
  return lines;
}

function Tile({
  obj,
  selected,
  visibility,
  thumbs,
  showLabels,
}: {
  obj: MapObject;
  selected: boolean;
  visibility: LayerVisibility;
  thumbs: Thumbs;
  showLabels: boolean;
}) {
  const entry = entryOf(obj);
  const layer = objectLayer(obj);
  if (!visibility[layerTypeOf(layer)]) return null;
  const [w, h] = objectFootprint(obj);
  const x = obj.gx * CELL_PX;
  const y = obj.gy * CELL_PX;
  const pw = w * CELL_PX;
  const ph = h * CELL_PX;

  if (layer === 0) {
    const thumb = entry ? thumbs[thumbKey(entry.key, 0)] : undefined;
    return (
      <g opacity={selected ? 1 : 0.9}>
        {thumb ? (
          <image href={thumb.url} x={x} y={y} width={pw} height={ph} preserveAspectRatio="none" opacity={0.4} />
        ) : (
          <rect x={x + 1} y={y + 1} width={pw - 2} height={ph - 2} fill={entry?.color ?? "#eee"} opacity={0.55} />
        )}
        {selected && <rect x={x + 1} y={y + 1} width={pw - 2} height={ph - 2} fill="rgba(37,99,235,0.2)" stroke="#2563eb" strokeWidth={2} />}
      </g>
    );
  }

  return (
    <g>
      <TileArt entry={entry} rot={obj.rot} x={x} y={y} w={w} h={h} thumbs={thumbs} label={showLabels} fallbackKey={obj.key} customLabel={obj.label} />
      {layer !== 3 && (
        <text x={x + pw - 7} y={y + 9} fontSize={7} textAnchor="middle" fill="#374151" pointerEvents="none">
          {dirArrow(obj.rot)}
        </text>
      )}
      {selected && (
        <rect x={x + 1.5} y={y + 1.5} width={pw - 3} height={ph - 3} rx={2} fill="rgba(37,99,235,0.15)" stroke="#2563eb" strokeWidth={2.5} pointerEvents="none" />
      )}
    </g>
  );
}
