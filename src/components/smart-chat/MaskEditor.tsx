"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Ban,
  Brush,
  Circle,
  Download,
  Loader2,
  PaintBucket,
  RefreshCw,
  Sparkles,
  Square,
  Undo2,
  Wand2,
} from "lucide-react";

/**
 * Canvas editor for an AI-generated black/white mask.
 *
 * Tools: brush (paint white or black), fill (bucket flood-fill), shapes
 * (rectangle / ellipse) and "clean" (binarize — snap every pixel to pure
 * black or white by a luminance threshold, dropping greys and stray colours).
 * Undo keeps a bounded snapshot stack. Download exports the edited canvas.
 *
 * The mask is loaded through `/api/proxy-image` so the canvas stays untainted
 * and pixels remain readable/exportable.
 */

type Tool = "brush" | "fill" | "rect" | "ellipse";
type PaintColor = "white" | "black";
type Point = { x: number; y: number };

interface MaskEditorProps {
  maskUrl: string;
  fileBaseName?: string;
  /** Close the editor. Receives the current edited mask as a PNG data URL so
   *  the caller can cache it and restore the edits on re-open. */
  onBack: (editedMaskDataUrl?: string) => void;
  /** Apply the edited mask as a protection mask for background removal.
   *  Receives the mask as a PNG data URL (white = protected). */
  onApply: (maskDataUrl: string) => void;
  /** Remove the currently applied protection mask (revert). */
  onUnapply?: () => void;
  /** Whether a protection mask is currently applied. */
  isApplied?: boolean;
  /** Re-run the AI mask generation (replaces `maskUrl`). */
  onRegenerate?: () => void;
  regenerating?: boolean;
  /** All generated variations (shown as a thumbnail strip to switch between). */
  maskOptions?: string[];
  selectedIndex?: number;
  /** Switch to another variation; receives the current edited canvas so the
   *  caller can cache the edits before swapping. */
  onSelect?: (index: number, currentEditedDataUrl?: string) => void;
}

const MAX_HISTORY = 10;
// Color match tolerance for the bucket fill (Euclidean distance in RGBA).
const FILL_TOLERANCE = 40;

export default function MaskEditor({
  maskUrl,
  fileBaseName = "image",
  onBack,
  onApply,
  onUnapply,
  isApplied = false,
  onRegenerate,
  regenerating = false,
  maskOptions = [],
  selectedIndex = 0,
  onSelect,
}: MaskEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tool, setTool] = useState<Tool>("brush");
  // Foreground is white (white objects on black), so default the brush to
  // white — painting adds to the subject; black carves it back out.
  const [color, setColor] = useState<PaintColor>("white");
  const [brushSize, setBrushSize] = useState(28);
  const [threshold, setThreshold] = useState(128);
  const [canUndo, setCanUndo] = useState(false);

  const drawingRef = useRef(false);
  const lastPtRef = useRef<Point | null>(null);
  const startPtRef = useRef<Point | null>(null);
  const historyRef = useRef<ImageData[]>([]);

  // Load the mask onto the canvas (through the proxy when it's a remote URL).
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    const src = maskUrl.startsWith("data:")
      ? maskUrl
      : `/api/proxy-image?url=${encodeURIComponent(maskUrl)}`;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const overlay = overlayRef.current;
      if (!canvas || !overlay) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      overlay.width = img.naturalWidth;
      overlay.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setError(true);
        setLoading(false);
        return;
      }
      ctx.drawImage(img, 0, 0);
      ctxRef.current = ctx;
      historyRef.current = [];
      setCanUndo(false);
      setLoading(false);
    };
    img.onerror = () => {
      if (cancelled) return;
      setError(true);
      setLoading(false);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [maskUrl]);

  const fillColor = useCallback(
    () => (color === "white" ? "#ffffff" : "#000000"),
    [color]
  );

  const pushHistory = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const stack = historyRef.current;
    stack.push(snap);
    if (stack.length > MAX_HISTORY) stack.shift();
    setCanUndo(stack.length > 0);
  }, []);

  const undo = useCallback(() => {
    const ctx = ctxRef.current;
    const stack = historyRef.current;
    if (!ctx || stack.length === 0) return;
    const snap = stack.pop();
    if (snap) ctx.putImageData(snap, 0, 0);
    setCanUndo(stack.length > 0);
  }, []);

  // Map a pointer event to canvas-pixel coordinates (canvas is shown scaled).
  const getPos = useCallback((e: React.PointerEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }, []);

  const clearOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.getContext("2d")?.clearRect(0, 0, overlay.width, overlay.height);
  }, []);

  const rectFrom = (a: Point, b: Point) => ({
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    w: Math.abs(b.x - a.x),
    h: Math.abs(b.y - a.y),
  });

  const drawShapePreview = useCallback(
    (a: Point, b: Point) => {
      const overlay = overlayRef.current;
      const octx = overlay?.getContext("2d");
      if (!overlay || !octx) return;
      clearOverlay();
      const { x, y, w, h } = rectFrom(a, b);
      octx.fillStyle =
        color === "white" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
      octx.strokeStyle = color === "white" ? "#ffffff" : "#000000";
      octx.lineWidth = 2;
      if (tool === "rect") {
        octx.fillRect(x, y, w, h);
        octx.strokeRect(x, y, w, h);
      } else {
        octx.beginPath();
        octx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        octx.fill();
        octx.stroke();
      }
    },
    [clearOverlay, color, tool]
  );

  const commitShape = useCallback(
    (a: Point, b: Point) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const { x, y, w, h } = rectFrom(a, b);
      ctx.fillStyle = fillColor();
      if (tool === "rect") {
        ctx.fillRect(x, y, w, h);
      } else {
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [fillColor, tool]
  );

  const floodFill = useCallback(
    (sx: number, sy: number) => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;
      const W = canvas.width;
      const H = canvas.height;
      if (sx < 0 || sy < 0 || sx >= W || sy >= H) return;
      const imgData = ctx.getImageData(0, 0, W, H);
      const data = imgData.data;
      const start = (sy * W + sx) * 4;
      const target = [data[start], data[start + 1], data[start + 2], data[start + 3]];
      const fill =
        color === "white" ? [255, 255, 255, 255] : [0, 0, 0, 255];
      if (
        target[0] === fill[0] &&
        target[1] === fill[1] &&
        target[2] === fill[2] &&
        target[3] === fill[3]
      ) {
        return; // already that color
      }
      const tolSq = FILL_TOLERANCE * FILL_TOLERANCE;
      const matches = (i: number) => {
        const dr = data[i] - target[0];
        const dg = data[i + 1] - target[1];
        const db = data[i + 2] - target[2];
        const da = data[i + 3] - target[3];
        return dr * dr + dg * dg + db * db + da * da <= tolSq;
      };
      const visited = new Uint8Array(W * H);
      const stack: number[] = [sy * W + sx];
      while (stack.length) {
        const p = stack.pop() as number;
        if (visited[p]) continue;
        visited[p] = 1;
        const i = p * 4;
        if (!matches(i)) continue;
        data[i] = fill[0];
        data[i + 1] = fill[1];
        data[i + 2] = fill[2];
        data[i + 3] = fill[3];
        const px = p % W;
        const py = (p - px) / W;
        if (px > 0) stack.push(p - 1);
        if (px < W - 1) stack.push(p + 1);
        if (py > 0) stack.push(p - W);
        if (py < H - 1) stack.push(p + W);
      }
      ctx.putImageData(imgData, 0, 0);
    },
    [color]
  );

  // Binarize: every pixel becomes pure white or pure black (no greys/colors).
  const applyClean = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    pushHistory();
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      const v = lum >= threshold ? 255 : 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, [pushHistory, threshold]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (loading || error) return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = getPos(e);
    drawingRef.current = true;
    pushHistory();
    if (tool === "fill") {
      floodFill(Math.round(x), Math.round(y));
      drawingRef.current = false;
      return;
    }
    if (tool === "brush") {
      lastPtRef.current = { x, y };
      ctx.fillStyle = fillColor();
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    startPtRef.current = { x, y }; // rect / ellipse
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    const { x, y } = getPos(e);
    if (tool === "brush") {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const last = lastPtRef.current ?? { x, y };
      ctx.strokeStyle = fillColor();
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPtRef.current = { x, y };
    } else if ((tool === "rect" || tool === "ellipse") && startPtRef.current) {
      drawShapePreview(startPtRef.current, { x, y });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    const { x, y } = getPos(e);
    if ((tool === "rect" || tool === "ellipse") && startPtRef.current) {
      commitShape(startPtRef.current, { x, y });
      clearOverlay();
    }
    drawingRef.current = false;
    lastPtRef.current = null;
    startPtRef.current = null;
  };

  // Snapshot the current canvas as a PNG data URL (or undefined if not ready).
  const currentCanvasDataUrl = (): string | undefined => {
    const canvas = canvasRef.current;
    return canvas && !error && !loading
      ? canvas.toDataURL("image/png")
      : undefined;
  };

  // Hand the current edited canvas back so the caller can cache the edits.
  const handleBack = () => onBack(currentCanvasDataUrl());

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${fileBaseName.replace(/\.[^.]+$/, "")}-mask.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Apply the edited mask as a protection mask for Magic Remove: the caller
  // uses white (>= range threshold) regions as "do not touch". We just hand
  // over the current mask as a PNG data URL.
  const applyMask = () => {
    const canvas = canvasRef.current;
    if (!canvas || error || loading) return;
    onApply(canvas.toDataURL("image/png"));
  };

  const TOOLS: { id: Tool; label: string; icon: React.ReactNode }[] = [
    { id: "brush", label: "Brush", icon: <Brush size={16} /> },
    { id: "fill", label: "Fill", icon: <PaintBucket size={16} /> },
    { id: "rect", label: "Rect", icon: <Square size={16} /> },
    { id: "ellipse", label: "Ellipse", icon: <Circle size={16} /> },
  ];

  return (
    <div
      className="flex flex-col items-center gap-3 w-full max-w-5xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Variation thumbnails */}
      {maskOptions.length > 1 && (
        <div className="flex items-center gap-2">
          {maskOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                if (i !== selectedIndex) onSelect?.(i, currentCanvasDataUrl());
              }}
              title={`Variation ${i + 1}`}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === selectedIndex
                  ? "border-violet-500 ring-2 ring-violet-500/40"
                  : "border-white/20 hover:border-white/50"
              }`}
            >
              <img
                src={opt}
                alt={`Variation ${i + 1}`}
                className="w-full h-full object-contain bg-black"
              />
              <span className="absolute bottom-0.5 right-0.5 text-[10px] font-mono bg-black/70 text-white px-1 rounded">
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Canvas */}
      <div className="relative flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Loader2 className="animate-spin text-white" size={36} />
          </div>
        )}
        {error ? (
          <div className="text-white/80 text-sm py-12">
            Failed to load mask.
          </div>
        ) : (
          <div className="relative inline-block">
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className="block max-w-full max-h-[62vh] object-contain rounded-lg shadow-2xl bg-black cursor-crosshair"
              style={{ touchAction: "none" }}
            />
            <canvas
              ref={overlayRef}
              className="pointer-events-none absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="w-full bg-white rounded-xl shadow-2xl p-3 flex flex-wrap items-center gap-x-5 gap-y-3">
        {/* Tools */}
        <div className="flex items-center gap-1">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              title={t.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tool === t.id
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Color */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Color</span>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setColor("white")}
              className={`px-3 py-1.5 text-sm font-medium ${
                color === "white"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              White
            </button>
            <button
              onClick={() => setColor("black")}
              className={`px-3 py-1.5 text-sm font-medium ${
                color === "black"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Black
            </button>
          </div>
        </div>

        {/* Brush size */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <span className="text-xs font-semibold text-gray-500">Size</span>
          <input
            type="range"
            min={2}
            max={120}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono text-gray-400 w-7 text-right">
            {brushSize}
          </span>
        </div>

        {/* Clean (binarize) */}
        <div className="flex items-center gap-2">
          <button
            onClick={applyClean}
            title="Snap to pure black & white (drop greys/colors)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <Sparkles size={16} />
            Clean
          </button>
          <input
            type="range"
            min={1}
            max={254}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            title="Clean threshold"
            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs font-mono text-gray-400 w-7 text-right">
            {threshold}
          </span>
        </div>

        {/* Undo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-40"
        >
          <Undo2 size={16} />
          Undo
        </button>

        {/* Spacer + actions */}
        <div className="flex items-center gap-2 ml-auto">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={regenerating}
              title="Generate a fresh AI mask"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-40"
            >
              <RefreshCw
                size={16}
                className={regenerating ? "animate-spin" : ""}
              />
              Regenerate
            </button>
          )}
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={download}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <Download size={16} />
            Download
          </button>
          {isApplied && onUnapply && (
            <button
              onClick={onUnapply}
              title="Remove the protection mask and revert"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Ban size={16} />
              Unapply
            </button>
          )}
          <button
            onClick={applyMask}
            disabled={loading || !!error}
            title="Protect the white areas — Magic Remove won't touch them"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 ${
              isApplied
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
          >
            <Wand2 size={16} />
            {isApplied ? "Re-apply Mask" : "Apply Mask"}
          </button>
        </div>
      </div>
    </div>
  );
}
