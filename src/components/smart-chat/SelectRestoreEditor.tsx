"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X, Brush, Wand2, Eraser, Check, Loader2, Trash2 } from "lucide-react";

interface SelectRestoreEditorProps {
  /** Current (background-removed) image. Usually a data: URL. */
  processedUrl: string;
  /** Pristine source image, used as the color fallback where pixels were fully
   *  cleared by removal. May be a remote URL (proxied) or null. */
  originalUrl: string | null;
  /** Called with the new data URL once the user applies a restore. */
  onApply: (dataUrl: string) => void;
  onClose: () => void;
}

type Tool = "wand" | "brush" | "erase";

const SELECT_RGB: [number, number, number] = [59, 130, 246]; // blue-500
const SELECT_ALPHA = 110; // overlay opacity for the selection viz
const CLEARED_ALPHA = 8; // below this a pixel is treated as "no color info"

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/** Fit natural image dimensions into the available viewport (minus the toolbar). */
function fitToViewport(w: number, h: number) {
  const availW = Math.max(240, window.innerWidth - 320 - 48);
  const availH = Math.max(240, window.innerHeight - 48);
  const scale = Math.min(availW / w, availH / h, 1);
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

/** Decode a URL into ImageData. Remote URLs go through the image proxy to
 *  avoid tainting the canvas (CORS). */
async function loadImageData(url: string): Promise<ImageData> {
  const fetchUrl = url.startsWith("data:")
    ? url
    : `/api/proxy-image?url=${encodeURIComponent(url)}`;
  const res = await fetch(fetchUrl);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  try {
    const img = new window.Image();
    img.src = blobUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d");
    if (!ctx) throw new Error("no 2d context");
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

/** Separable box blur on a single-channel mask — used to feather edges. */
function featherMask(
  src: Uint8Array,
  w: number,
  h: number,
  radius: number
): Uint8Array {
  if (radius <= 0) return src;
  const r = Math.round(radius);
  const win = 2 * r + 1;
  const tmp = new Float32Array(w * h);
  const out = new Uint8Array(w * h);
  // horizontal
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += src[row + clamp(k, 0, w - 1)];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = acc / win;
      acc +=
        src[row + clamp(x + r + 1, 0, w - 1)] - src[row + clamp(x - r, 0, w - 1)];
    }
  }
  // vertical
  for (let x = 0; x < w; x++) {
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += tmp[clamp(k, 0, h - 1) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = Math.round(acc / win);
      acc +=
        tmp[clamp(y + r + 1, 0, h - 1) * w + x] -
        tmp[clamp(y - r, 0, h - 1) * w + x];
    }
  }
  return out;
}

export function SelectRestoreEditor({
  processedUrl,
  originalUrl,
  onApply,
  onClose,
}: SelectRestoreEditorProps) {
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const procRef = useRef<ImageData | null>(null);
  const origRef = useRef<ImageData | null>(null);
  const maskRef = useRef<Uint8Array | null>(null);

  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [dispSize, setDispSize] = useState<{ w: number; h: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  const [tool, setTool] = useState<Tool>("brush");
  const [brushSize, setBrushSize] = useState(40);
  const [feather, setFeather] = useState(10);
  const [wandTolerance, setWandTolerance] = useState(32);
  // Brush cursor position in display (CSS) coords, relative to the canvas.
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  // Undo history: snapshots of state BEFORE each mutating gesture. `proc` is
  // only captured when the gesture changes the pixels (a restore apply).
  const historyRef = useRef<
    Array<{ mask: Uint8Array; proc: ImageData | null }>
  >([]);
  // Reusable scratch buffers for the wand flood fill (avoid per-call allocation
  // so dragging the Smart Select stays smooth).
  const wandVisitedRef = useRef<Uint8Array | null>(null);
  const wandStackRef = useRef<Int32Array | null>(null);
  const HISTORY_LIMIT = 24;

  // ---- Load images -----------------------------------------------------
  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      try {
        const proc = await loadImageData(processedUrl);
        let orig: ImageData | null = null;
        if (originalUrl) {
          try {
            orig = await loadImageData(originalUrl);
            if (orig.width !== proc.width || orig.height !== proc.height) {
              orig = null; // size mismatch -> can't use as a per-pixel fallback
            }
          } catch {
            orig = null;
          }
        }
        if (!alive) return;
        procRef.current = proc;
        origRef.current = orig;
        maskRef.current = new Uint8Array(proc.width * proc.height);
        // Set dims + dispSize together so the canvases mount in the same render;
        // the draw effect then runs with the canvas already attached.
        setDims({ w: proc.width, h: proc.height });
        setDispSize(fitToViewport(proc.width, proc.height));
        setHasSelection(false);
        setLoading(false);
      } catch (e) {
        console.error("SelectRestore: failed to load image", e);
        if (alive) {
          alert("Failed to load image for editing");
          onClose();
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [processedUrl, originalUrl, onClose]);

  // ---- Fit the image into the viewport --------------------------------
  useEffect(() => {
    if (!dims) return;
    const recompute = () => setDispSize(fitToViewport(dims.w, dims.h));
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [dims]);

  // ---- Draw the base image once the canvas is mounted -----------------
  // Depends on dispSize so it runs *after* the canvases mount (they only
  // render once dispSize is set). Width assignments are guarded so a resize
  // re-run never clears the canvas (canvas internal size is the natural size
  // and never changes), preserving the painted selection overlay.
  useEffect(() => {
    if (!dims || loading || !dispSize) return;
    const base = baseCanvasRef.current;
    const proc = procRef.current;
    if (!base || !proc) return;
    if (base.width !== dims.w) base.width = dims.w;
    if (base.height !== dims.h) base.height = dims.h;
    base.getContext("2d")?.putImageData(proc, 0, 0);
    const ov = overlayCanvasRef.current;
    if (ov) {
      if (ov.width !== dims.w) ov.width = dims.w;
      if (ov.height !== dims.h) ov.height = dims.h;
    }
  }, [dims, loading, dispSize]);

  // ---- Selection visualization ----------------------------------------
  const repaintOverlayFull = useCallback(() => {
    const ov = overlayCanvasRef.current;
    const mask = maskRef.current;
    if (!ov || !mask || !dims) return;
    const ctx = ov.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(dims.w, dims.h);
    const d = img.data;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i]) {
        const p = i * 4;
        d[p] = SELECT_RGB[0];
        d[p + 1] = SELECT_RGB[1];
        d[p + 2] = SELECT_RGB[2];
        d[p + 3] = SELECT_ALPHA;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [dims]);

  // Map a pointer event to natural-image pixel coords + natural radius.
  const toNatural = useCallback(
    (e: React.PointerEvent) => {
      const ov = overlayCanvasRef.current;
      if (!ov || !dims) return null;
      const rect = ov.getBoundingClientRect();
      const scale = dims.w / rect.width;
      return {
        x: Math.round((e.clientX - rect.left) * scale),
        y: Math.round((e.clientY - rect.top) * scale),
        scale,
      };
    },
    [dims]
  );

  // Stamp a filled circle into the mask + overlay (brush / erase).
  const stamp = useCallback(
    (cx: number, cy: number, radius: number, erase: boolean) => {
      const mask = maskRef.current;
      const ov = overlayCanvasRef.current;
      if (!mask || !ov || !dims) return;
      const { w, h } = dims;
      const r2 = radius * radius;
      const x0 = clamp(Math.floor(cx - radius), 0, w - 1);
      const x1 = clamp(Math.ceil(cx + radius), 0, w - 1);
      const y0 = clamp(Math.floor(cy - radius), 0, h - 1);
      const y1 = clamp(Math.ceil(cy + radius), 0, h - 1);
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= r2) mask[y * w + x] = erase ? 0 : 255;
        }
      }
      const ctx = ov.getContext("2d");
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      if (erase) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,1)";
      } else {
        ctx.fillStyle = `rgba(${SELECT_RGB[0]},${SELECT_RGB[1]},${SELECT_RGB[2]},${
          SELECT_ALPHA / 255
        })`;
      }
      ctx.fill();
      ctx.restore();
    },
    [dims]
  );

  // Magic wand: flood fill similar color+alpha from the clicked pixel.
  const wandSelect = useCallback(
    (sx: number, sy: number) => {
      const proc = procRef.current;
      const mask = maskRef.current;
      if (!proc || !mask || !dims) return;
      const { w, h } = dims;
      const data = proc.data;
      const start = sy * w + sx;
      const sp4 = start * 4;
      const r0 = data[sp4];
      const g0 = data[sp4 + 1];
      const b0 = data[sp4 + 2];
      const a0 = data[sp4 + 3];
      const tol = wandTolerance;
      // Reuse scratch buffers across drag moves; just clear `visited` each call.
      let visited = wandVisitedRef.current;
      let stack = wandStackRef.current;
      if (!visited || visited.length !== w * h) {
        visited = new Uint8Array(w * h);
        wandVisitedRef.current = visited;
      } else {
        visited.fill(0);
      }
      if (!stack || stack.length !== w * h) {
        stack = new Int32Array(w * h);
        wandStackRef.current = stack;
      }
      let sp = 0;
      const similar = (idx: number) => {
        const p = idx * 4;
        const dc = Math.max(
          Math.abs(data[p] - r0),
          Math.abs(data[p + 1] - g0),
          Math.abs(data[p + 2] - b0)
        );
        const da = Math.abs(data[p + 3] - a0);
        return Math.max(dc, da) <= tol;
      };
      if (!similar(start)) return;
      visited[start] = 1;
      stack[sp++] = start;
      while (sp > 0) {
        const idx = stack[--sp];
        mask[idx] = 255;
        const x = idx % w;
        const y = (idx - x) / w;
        const push = (n: number) => {
          if (!visited[n] && similar(n)) {
            visited[n] = 1;
            stack[sp++] = n;
          }
        };
        if (x > 0) push(idx - 1);
        if (x < w - 1) push(idx + 1);
        if (y > 0) push(idx - w);
        if (y < h - 1) push(idx + w);
      }
      repaintOverlayFull();
      setHasSelection(true);
    },
    [dims, wandTolerance, repaintOverlayFull]
  );

  // ---- Undo ------------------------------------------------------------
  const maskHasAny = (mask: Uint8Array) => {
    for (let i = 0; i < mask.length; i++) if (mask[i]) return true;
    return false;
  };

  // Snapshot state BEFORE a mutating gesture so Ctrl+Z can revert it.
  const pushHistory = useCallback((includeProc: boolean) => {
    const mask = maskRef.current;
    if (!mask) return;
    const proc = procRef.current;
    historyRef.current.push({
      mask: mask.slice(),
      proc:
        includeProc && proc
          ? new ImageData(
              new Uint8ClampedArray(proc.data),
              proc.width,
              proc.height
            )
          : null,
    });
    if (historyRef.current.length > HISTORY_LIMIT) historyRef.current.shift();
  }, []);

  const undo = useCallback(() => {
    const snap = historyRef.current.pop();
    if (!snap) return;
    const mask = maskRef.current;
    if (mask && snap.mask.length === mask.length) mask.set(snap.mask);
    if (snap.proc) {
      // A restore was undone — revert the pixels and the parent's image too.
      procRef.current = snap.proc;
      baseCanvasRef.current?.getContext("2d")?.putImageData(snap.proc, 0, 0);
      const c = document.createElement("canvas");
      c.width = snap.proc.width;
      c.height = snap.proc.height;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.putImageData(snap.proc, 0, 0);
        onApply(c.toDataURL("image/png"));
      }
    }
    repaintOverlayFull();
    setHasSelection(mask ? maskHasAny(mask) : false);
  }, [onApply, repaintOverlayFull]);

  // Ctrl/Cmd+Z to undo. Capture phase so it wins over any parent handler.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        !e.shiftKey &&
        (e.key === "z" || e.key === "Z")
      ) {
        e.preventDefault();
        e.stopPropagation();
        undo();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [undo]);

  // ---- Pointer handlers ------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (loading) return;
    const pt = toNatural(e);
    if (!pt) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pushHistory(false); // one snapshot per gesture (down -> up)
    drawingRef.current = true;
    lastPtRef.current = { x: pt.x, y: pt.y };
    if (tool === "wand") {
      wandSelect(pt.x, pt.y);
      return;
    }
    const radius = (brushSize / 2) * pt.scale;
    stamp(pt.x, pt.y, radius, tool === "erase");
    setHasSelection(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    // Keep the brush-size cursor following the pointer (brush / erase only).
    if (tool !== "wand") {
      const ov = overlayCanvasRef.current;
      if (ov) {
        const rect = ov.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    }
    if (!drawingRef.current) return;
    const pt = toNatural(e);
    if (!pt) return;

    if (tool === "wand") {
      // Drag to keep growing the selection without re-clicking. Throttle the
      // flood fill by distance so a drag doesn't run it on every pixel.
      const last = lastPtRef.current;
      if (last && Math.hypot(pt.x - last.x, pt.y - last.y) < 10) return;
      lastPtRef.current = { x: pt.x, y: pt.y };
      wandSelect(pt.x, pt.y);
      return;
    }

    const radius = (brushSize / 2) * pt.scale;
    const last = lastPtRef.current;
    if (last) {
      // Interpolate along the segment so fast strokes have no gaps.
      const dx = pt.x - last.x;
      const dy = pt.y - last.y;
      const dist = Math.hypot(dx, dy);
      const step = Math.max(1, radius / 2);
      const n = Math.floor(dist / step);
      for (let i = 1; i <= n; i++) {
        stamp(
          last.x + (dx * i) / (n + 1),
          last.y + (dy * i) / (n + 1),
          radius,
          tool === "erase"
        );
      }
    }
    stamp(pt.x, pt.y, radius, tool === "erase");
    lastPtRef.current = { x: pt.x, y: pt.y };
  };

  const endStroke = () => {
    drawingRef.current = false;
    lastPtRef.current = null;
  };

  const onPointerLeave = () => {
    endStroke();
    setCursor(null);
  };

  const clearSelection = (record = true) => {
    if (record) pushHistory(false);
    const mask = maskRef.current;
    const ov = overlayCanvasRef.current;
    if (mask) mask.fill(0);
    if (ov) ov.getContext("2d")?.clearRect(0, 0, ov.width, ov.height);
    setHasSelection(false);
  };

  // ---- Apply: restore opacity inside the (feathered) selection ---------
  const applyRestore = async () => {
    const proc = procRef.current;
    const mask = maskRef.current;
    if (!proc || !mask || !dims || !hasSelection) return;
    pushHistory(true); // snapshot pixels + selection so Ctrl+Z reverts the restore
    setApplying(true);
    try {
      const { w, h } = dims;
      // feather radius scales with the image so the slider feels consistent
      const featherNat = feather * (dims.w / (dispSize?.w || dims.w));
      const fMask = featherMask(mask, w, h, featherNat);
      const orig = origRef.current;
      const out = new ImageData(
        new Uint8ClampedArray(proc.data),
        w,
        h
      );
      const d = out.data;
      const pd = proc.data;
      const od = orig?.data;
      for (let i = 0; i < fMask.length; i++) {
        const m = fMask[i] / 255;
        if (m <= 0) continue;
        const p = i * 4;
        const pa = pd[p + 3];
        // raise alpha toward opaque, feathered by the mask
        d[p + 3] = pa + (255 - pa) * m;
        // where the pixel was fully cleared, fall back to the original color
        if (pa < CLEARED_ALPHA && od) {
          d[p] = od[p];
          d[p + 1] = od[p + 1];
          d[p + 2] = od[p + 2];
        }
      }
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) throw new Error("no 2d context");
      ctx.putImageData(out, 0, 0);
      const dataUrl = c.toDataURL("image/png");
      // commit into the working buffer so further selections stack correctly
      procRef.current = out;
      const base = baseCanvasRef.current;
      base?.getContext("2d")?.putImageData(out, 0, 0);
      clearSelection(false); // the restore already snapshotted mask + pixels
      onApply(dataUrl);
    } catch (e) {
      console.error("SelectRestore: apply failed", e);
      alert("Failed to restore selection");
    } finally {
      setApplying(false);
    }
  };

  const ToolButton = ({
    id,
    icon,
    label,
  }: {
    id: Tool;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      onClick={() => setTool(id)}
      className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors ${
        tool === id
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[120] flex bg-black/90 backdrop-blur-sm">
      {/* Image / canvas area */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        {loading || !dispSize ? (
          <Loader2 className="animate-spin text-white" size={48} />
        ) : (
          <div
            className="relative rounded-lg shadow-2xl"
            style={{
              width: dispSize.w,
              height: dispSize.h,
              backgroundImage:
                "conic-gradient(#333 0.25turn,#444 0.25turn 0.5turn,#333 0.5turn 0.75turn,#444 0.75turn)",
              backgroundSize: "20px 20px",
            }}
          >
            <canvas
              ref={baseCanvasRef}
              className="absolute inset-0 w-full h-full rounded-lg"
            />
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-full rounded-lg touch-none"
              style={{ cursor: tool === "wand" ? "crosshair" : "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endStroke}
              onPointerLeave={onPointerLeave}
            />
            {/* Brush-size cursor ring (brush / erase) */}
            {tool !== "wand" && cursor && (
              <div
                className="absolute rounded-full border-2 pointer-events-none mix-blend-difference"
                style={{
                  left: cursor.x,
                  top: cursor.y,
                  width: brushSize,
                  height: brushSize,
                  transform: "translate(-50%, -50%)",
                  borderColor:
                    tool === "erase"
                      ? "rgba(248,113,113,0.95)"
                      : "rgba(255,255,255,0.95)",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="w-80 flex-shrink-0 bg-white h-full flex flex-col p-4 gap-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Select &amp; Restore</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-gray-500 -mt-2">
          Select areas, then restore their opacity. Smart Select grows a region
          by color (click or drag); Brush paints freely.{" "}
          <span className="text-gray-400">Press ⌘/Ctrl+Z to undo.</span>
        </p>

        {/* Tools */}
        <div className="flex gap-2">
          <ToolButton id="wand" icon={<Wand2 size={18} />} label="Smart" />
          <ToolButton id="brush" icon={<Brush size={18} />} label="Brush" />
          <ToolButton id="erase" icon={<Eraser size={18} />} label="Erase" />
        </div>

        {/* Tool-specific controls */}
        {tool === "wand" ? (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-700">
                Wand Tolerance
              </span>
              <span className="text-xs font-mono text-gray-400">
                {wandTolerance}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="120"
              value={wandTolerance}
              onChange={(e) => setWandTolerance(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Click the image to grow a selection from that point.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-gray-700">
                Brush Size
              </span>
              <span className="text-xs font-mono text-gray-400">
                {brushSize}px
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="200"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* Feather (applies to the restore edge) */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-700">
              Feather
            </span>
            <span className="text-xs font-mono text-gray-400">{feather}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            value={feather}
            onChange={(e) => setFeather(Number(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[10px] text-gray-400 mt-1">
            Softens the edge of the restored area.
          </p>
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <button
          onClick={() => clearSelection()}
          disabled={!hasSelection}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-40"
        >
          <Trash2 size={16} />
          Clear selection
        </button>
        <button
          onClick={applyRestore}
          disabled={!hasSelection || applying}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40"
        >
          {applying ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Check size={18} />
          )}
          Restore opacity
        </button>
      </div>
    </div>
  );
}
