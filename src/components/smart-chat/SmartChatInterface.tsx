import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  Loader2,
  GitBranch,
  Settings2,
  Image as ImageIcon,
  X,
  Download,
  SlidersHorizontal,
  Eraser,
  Pin,
  PinOff,
  Grid3X3,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Palette,
  Brain,
  Play,
  Pause,
  Wand2,
  Layers,
  CheckSquare,
} from "lucide-react";
import JSZip from "jszip";
import {
  ChatTree,
  ChatNode,
  ChatSessionMetadata,
  ChatAttachment,
} from "@/types/smartChat";
import { ChatMessage } from "./ChatMessage";
import {
  saveSmartChatState,
  chatWithAI,
  uploadSmartChatImage,
  generateImage,
  getPresignedUrl,
  deleteSmartChatImages,
  getSmartChatDetail,
} from "@/lib/smartChatApi";
import { TypingIndicator } from "./TypingIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { BulkTaskModal } from "./BulkTaskModal";
import { SelectionToolbar } from "./SelectionToolbar";

/* eslint-disable @next/next/no-img-element */
const ImageViewer = ({
  attachment,
  onClose,
}: {
  attachment: ChatAttachment;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState<string | null>(attachment.url || null);
  const [loading, setLoading] = useState(!attachment.url && !!attachment.key);
  const [processing, setProcessing] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [tolerance, setTolerance] = useState(40);

  const [showSliceOptions, setShowSliceOptions] = useState(false);
  const [sliceRows, setSliceRows] = useState(2);
  const [sliceCols, setSliceCols] = useState(2);
  const [slicing, setSlicing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSliceIndex, setCurrentSliceIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(500); // milliseconds per frame
  const animationRef = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [slicePreviewUrl, setSlicePreviewUrl] = useState<string | null>(null);

  // For Restore/Fix functionality
  const [showRestoreOptions, setShowRestoreOptions] = useState(false);
  const [restorePower, setRestorePower] = useState(0);
  const [restoreSmoothness, setRestoreSmoothness] = useState(20);
  const processedImageDataRef = useRef<ImageData | null>(null);

  useEffect(() => {
    if (!attachment.key || attachment.url) return;
    getPresignedUrl(attachment.key).then((u) => {
      setUrl(u);
      setLoading(false);
    });
  }, [attachment]);

  // Function to extract and display current slice
  const extractSlice = useCallback(
    async (index: number) => {
      if (!url || !imageRef.current) {
        setSlicePreviewUrl(null);
        return;
      }

      const totalSlices = sliceRows * sliceCols;
      if (totalSlices === 0 || index >= totalSlices) {
        setSlicePreviewUrl(null);
        return;
      }

      try {
        // Load image through proxy if needed to avoid CORS issues
        let imageUrlToFetch = url;
        if (!url.startsWith("data:")) {
          imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(url)}`;
        }

        const response = await fetch(imageUrlToFetch);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = blobUrl;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const row = Math.floor(index / sliceCols);
        const col = index % sliceCols;

        const cellWidth = Math.floor(img.width / sliceCols);
        const cellHeight = Math.floor(img.height / sliceRows);
        const x = col * cellWidth;
        const y = row * cellHeight;
        const w = col === sliceCols - 1 ? img.width - x : cellWidth;
        const h = row === sliceRows - 1 ? img.height - y : cellHeight;

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setSlicePreviewUrl(null);
          URL.revokeObjectURL(blobUrl);
          return;
        }

        ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
        const previewUrl = canvas.toDataURL("image/png");
        setSlicePreviewUrl(previewUrl);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Failed to extract slice:", error);
        setSlicePreviewUrl(null);
      }
    },
    [url, sliceRows, sliceCols]
  );

  // Animation effect
  useEffect(() => {
    if (!isAnimating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setSlicePreviewUrl(null);
      return;
    }

    const totalSlices = sliceRows * sliceCols;
    if (totalSlices === 0) return;

    // Update preview immediately when animation starts
    extractSlice(currentSliceIndex);

    let lastTime = Date.now();
    let currentIndex = currentSliceIndex;

    const animate = () => {
      const now = Date.now();
      if (now - lastTime >= animationSpeed) {
        currentIndex = (currentIndex + 1) % totalSlices;
        setCurrentSliceIndex(currentIndex);
        extractSlice(currentIndex);
        lastTime = now;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [
    isAnimating,
    animationSpeed,
    sliceRows,
    sliceCols,
    extractSlice,
    currentSliceIndex,
  ]);

  // Update preview when slice index changes (for manual updates)
  useEffect(() => {
    if (isAnimating && imageRef.current) {
      extractSlice(currentSliceIndex);
    }
  }, [currentSliceIndex, isAnimating, extractSlice]);

  const handleRemoveBackground = async (mode: "magic" | "normal") => {
    if (!url || processing) return;
    setProcessing(true);
    setShowRemoveOptions(false);

    try {
      let imageUrlToFetch = url;
      // If it's a remote URL (not data:), use proxy to avoid CORS issues
      if (!url.startsWith("data:")) {
        imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      }

      const response = await fetch(imageUrlToFetch);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const img = new window.Image();
      img.src = blobUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Detect background color from top-left pixel
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Store original image data if needed, but here we want to store the RESULT of removal
      // So we will do it after processing.

      if (mode === "magic") {
        // Apply Magic Algorithm:
        // Generalized version of the user's algorithm to work with any background color.
        // Logic: The "opacity" (alpha) is determined by the maximum deviation from the background color.
        // alpha = max(|r - bgR|, |g - bgG|, |b - bgB|)
        // Then solve for Source: Pixel = Source * alpha + BG * (1 - alpha)
        // => Source = BG + (Pixel - BG) / alpha

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate deviation from background
          const dr = r - bgR;
          const dg = g - bgG;
          const db = b - bgB;

          const alpha = Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));

          if (alpha === 0) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 0;
          } else {
            // Reconstruct source color
            // new_c = bg + (c - bg) / alphaNorm
            //       = bg + diff / (alpha / 255)
            //       = bg + (diff * 255) / alpha

            let newR = bgR + (dr * 255) / alpha;
            let newG = bgG + (dg * 255) / alpha;
            let newB = bgB + (db * 255) / alpha;

            // Clamp values
            newR = Math.min(255, Math.max(0, newR));
            newG = Math.min(255, Math.max(0, newG));
            newB = Math.min(255, Math.max(0, newB));

            data[i] = Math.floor(newR);
            data[i + 1] = Math.floor(newG);
            data[i + 2] = Math.floor(newB);
            data[i + 3] = alpha;
          }
        }
      } else {
        // Normal Remove (Flood Fill)
        // BFS to find connected pixels similar to background color and set them to transparent
        const width = canvas.width;
        const height = canvas.height;
        // Color distance tolerance

        const visited = new Uint8Array(width * height);
        const queue: [number, number][] = [[0, 0]]; // Start from top-left (0,0) assuming it's background

        // Check if start pixel is already visited or different color (unlikely for start)
        visited[0] = 1;

        while (queue.length > 0) {
          const [x, y] = queue.shift()!;
          const idx = (y * width + x) * 4;

          // Set current pixel to transparent
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
          data[idx + 3] = 0;

          // Check neighbors
          const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nIdx = (ny * width + nx) * 4;
              const vIdx = ny * width + nx;

              if (visited[vIdx] === 0) {
                // Check color similarity
                const nr = data[nIdx];
                const ng = data[nIdx + 1];
                const nb = data[nIdx + 2];

                // Simple Euclidean distance or max difference
                const dist = Math.sqrt(
                  Math.pow(nr - bgR, 2) +
                    Math.pow(ng - bgG, 2) +
                    Math.pow(nb - bgB, 2)
                );

                if (dist <= tolerance) {
                  visited[vIdx] = 1;
                  queue.push([nx, ny]);
                }
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Save processed data for Restore feature
      processedImageDataRef.current = imageData;
      // Reset restore power when new background removal is done
      setRestorePower(0);

      // Use PNG for preview performance
      const newUrl = canvas.toDataURL("image/png");

      setUrl(newUrl);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Failed to remove background", e);
      alert("Failed to process image");
    } finally {
      setProcessing(false);
    }
  };

  const handleRestore = useCallback(
    async (power: number, smoothness: number) => {
      if (!processedImageDataRef.current) return;

      // Create a copy to work on
      const originalData = processedImageDataRef.current;
      const newImageData = new ImageData(
        new Uint8ClampedArray(originalData.data),
        originalData.width,
        originalData.height
      );
      const data = newImageData.data;

      // Apply restore logic with smoothing
      // Threshold mapping: Power 0 -> 255, Power 100 -> 0
      const threshold = 255 * (1 - power / 100);
      // Smoothness mapping: 0-100 slider -> 0-100 alpha range
      const smoothRange = smoothness;

      const startSmooth = Math.max(0, threshold - smoothRange);

      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];

        if (alpha >= threshold) {
          data[i + 3] = 255;
        } else if (alpha > startSmooth) {
          // Interpolate
          // t goes from 0 (at startSmooth) to 1 (at threshold)
          const t = (alpha - startSmooth) / (threshold - startSmooth);
          // mix(alpha, 255, t)
          data[i + 3] = Math.floor(alpha * (1 - t) + 255 * t);
        }
      }

      // Render to canvas to get URL
      const canvas = document.createElement("canvas");
      canvas.width = newImageData.width;
      canvas.height = newImageData.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.putImageData(newImageData, 0, 0);
        // Use PNG for preview performance (avoid WebP encoding lag)
        setUrl(canvas.toDataURL("image/png"));
      }
    },
    []
  );

  // Effect to update restore when slider changes (debounced or on change)
  // Since we want real-time preview, let's call it but maybe throttle?
  // For now, let's just call it. Canvas ops on small images are fast enough.
  // If large images, might need debounce.
  // We will call handleRestore directly from slider onChange.

  const handleSlice = async () => {
    if (!url || slicing) return;
    setSlicing(true);
    // Keep options open or close? Let's keep open until done, then maybe close.

    try {
      let imageUrlToFetch = url;
      if (!url.startsWith("data:")) {
        imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      }

      const response = await fetch(imageUrlToFetch);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const img = new window.Image();
      img.src = blobUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      ctx.drawImage(img, 0, 0);

      const cellWidth = Math.floor(img.width / sliceCols);
      const cellHeight = Math.floor(img.height / sliceRows);

      const zip = new JSZip();

      for (let r = 0; r < sliceRows; r++) {
        for (let c = 0; c < sliceCols; c++) {
          const x = c * cellWidth;
          const y = r * cellHeight;

          // Adjust last row/col dimensions to avoid rounding gaps/overflow
          const w = c === sliceCols - 1 ? img.width - x : cellWidth;
          const h = r === sliceRows - 1 ? img.height - y : cellHeight;

          const cellCanvas = document.createElement("canvas");
          cellCanvas.width = w;
          cellCanvas.height = h;
          const cellCtx = cellCanvas.getContext("2d");
          if (!cellCtx) continue;

          cellCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);

          const sliceBlob = await new Promise<Blob | null>((resolve) =>
            cellCanvas.toBlob(resolve, "image/webp", 0.9)
          );

          if (sliceBlob) {
            zip.file(`slice_${r + 1}_${c + 1}.webp`, sliceBlob);
          }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `slices-${sliceRows}x${sliceCols}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      URL.revokeObjectURL(blobUrl);

      setShowSliceOptions(false);
    } catch (e) {
      console.error("Slice failed", e);
      alert("Failed to slice image");
    } finally {
      setSlicing(false);
    }
  };

  const handleDownload = async () => {
    try {
      let downloadUrl = url;
      // Get filename, change extension to webp
      let filename = attachment.name || "image.webp";
      if (filename.lastIndexOf(".") > 0) {
        filename = filename.substring(0, filename.lastIndexOf(".")) + ".webp";
      } else {
        filename += ".webp";
      }

      if (attachment.key && !url?.startsWith("data:")) {
        downloadUrl = await getPresignedUrl(attachment.key);
      }

      if (!downloadUrl) return;

      // Fetch image to ensure WebP conversion
      let fetchUrl = downloadUrl;
      if (!downloadUrl.startsWith("data:")) {
        fetchUrl = `/api/proxy-image?url=${encodeURIComponent(downloadUrl)}`;
      }

      const response = await fetch(fetchUrl);
      const blob = await response.blob();

      if (blob.type === "image/webp") {
        // Already WebP, download directly
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } else {
        // Convert to WebP
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context missing");

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (webpBlob) => {
            if (!webpBlob) return;
            const blobUrl = URL.createObjectURL(webpBlob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
          },
          "image/webp",
          0.9
        );
      }
    } catch (e) {
      console.error("Download failed", e);
      if (url) window.open(url, "_blank");
    }
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all z-50"
      >
        <X size={24} />
      </button>

      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex gap-4">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-white" size={48} />
          </div>
        ) : (
          url && (
            <>
              {/* Main Image Area - Centered */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative max-w-full max-h-full flex items-center justify-center">
                  <img
                    ref={imageRef}
                    src={url}
                    alt={attachment.name}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    style={{
                      backgroundImage: `conic-gradient(#333 0.25turn, #444 0.25turn 0.5turn, #333 0.5turn 0.75turn, #444 0.75turn)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {showSliceOptions && (
                    <>
                      <div
                        className="absolute inset-0 border border-indigo-500/50 pointer-events-none z-10 grid rounded-lg overflow-hidden"
                        style={{
                          gridTemplateColumns: `repeat(${sliceCols}, 1fr)`,
                          gridTemplateRows: `repeat(${sliceRows}, 1fr)`,
                        }}
                      >
                        {[...Array(sliceRows * sliceCols)].map((_, i) => (
                          <div
                            key={i}
                            className={`border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)_inset transition-opacity duration-200 ${
                              isAnimating && i === currentSliceIndex
                                ? "opacity-100 bg-indigo-500/20"
                                : "opacity-50"
                            }`}
                          />
                        ))}
                      </div>
                      {isAnimating && imageRef.current && (
                        <div
                          className="absolute pointer-events-none z-20 border-2 border-yellow-400 rounded-lg shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all duration-200"
                          style={{
                            left: `${
                              (currentSliceIndex % sliceCols) *
                              (100 / sliceCols)
                            }%`,
                            top: `${
                              Math.floor(currentSliceIndex / sliceCols) *
                              (100 / sliceRows)
                            }%`,
                            width: `${100 / sliceCols}%`,
                            height: `${100 / sliceRows}%`,
                          }}
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Preview Window - Positioned at bottom */}
                {isAnimating && slicePreviewUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-4 border-2 border-yellow-400 min-w-[200px] max-w-[300px]"
                  >
                    <div className="text-xs font-semibold text-gray-600 mb-2 text-center">
                      Slice {currentSliceIndex + 1} / {sliceRows * sliceCols}
                    </div>
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={slicePreviewUrl}
                        alt={`Slice ${currentSliceIndex + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-500">
                      Row {Math.floor(currentSliceIndex / sliceCols) + 1}, Col{" "}
                      {(currentSliceIndex % sliceCols) + 1}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Sidebar - Prompt and Action Buttons */}
              <div className="w-80 flex flex-col gap-4 max-h-[90vh]">
                {/* Prompt Display - Scrollable */}
                {attachment.prompt && (
                  <div className="bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-lg shadow-2xl overflow-y-auto flex-shrink-0 max-h-[40vh]">
                    <p className="font-semibold mb-2 text-xs uppercase tracking-wider text-gray-400">
                      Generation Prompt
                    </p>
                    <p className="text-sm leading-relaxed text-gray-100">
                      {attachment.prompt}
                    </p>
                  </div>
                )}

                {/* Action Buttons - Always Visible */}
                <div className="flex flex-col gap-3">
                  {/* Remove BG Button & Menu */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowRemoveOptions(!showRemoveOptions);
                        setShowSliceOptions(false);
                        setShowRestoreOptions(false);
                      }}
                      disabled={processing || slicing}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {processing ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Eraser size={18} />
                      )}
                      Remove BG
                    </button>
                    <AnimatePresence>
                      {showRemoveOptions && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20 flex flex-col"
                        >
                          <div className="p-3 border-b border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-gray-500">
                                Tolerance
                              </span>
                              <span className="text-xs font-mono text-gray-400">
                                {tolerance}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={tolerance}
                              onChange={(e) =>
                                setTolerance(Number(e.target.value))
                              }
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveBackground("normal")}
                            className="px-4 py-3 text-left text-sm hover:bg-gray-50 flex flex-col gap-1 transition-colors"
                          >
                            <span className="font-semibold text-gray-900">
                              Normal Remove
                            </span>
                            <span className="text-xs text-gray-500">
                              Continuous transparent fill
                            </span>
                          </button>
                          <div className="h-px bg-gray-100" />
                          <button
                            onClick={() => handleRemoveBackground("magic")}
                            className="px-4 py-3 text-left text-sm hover:bg-gray-50 flex flex-col gap-1 transition-colors"
                          >
                            <span className="font-semibold text-gray-900">
                              Magic Remove
                            </span>
                            <span className="text-xs text-gray-500">
                              Alpha reconstruction
                            </span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Restore / Fix Blur Button */}
                  {processedImageDataRef.current && (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowRestoreOptions(!showRestoreOptions);
                          setShowRemoveOptions(false);
                          setShowSliceOptions(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      >
                        <Wand2 size={18} />
                        Fix Blur
                      </button>
                      <AnimatePresence>
                        {showRestoreOptions && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20 flex flex-col gap-2"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-gray-900">
                                Restore Strength
                              </span>
                              <span className="text-xs font-mono text-gray-500">
                                {restorePower}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={restorePower}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setRestorePower(val);
                                handleRestore(val, restoreSmoothness);
                              }}
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />

                            <div className="flex justify-between items-center mb-1 mt-3">
                              <span className="text-xs font-semibold text-gray-900">
                                Smoothness
                              </span>
                              <span className="text-xs font-mono text-gray-500">
                                {restoreSmoothness}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={restoreSmoothness}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setRestoreSmoothness(val);
                                handleRestore(restorePower, val);
                              }}
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />

                            <p className="text-[10px] text-gray-500 mt-2">
                              Adjust Strength to set threshold, Smoothness to
                              blend edges.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Slice Button & Menu */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        const newShowSliceOptions = !showSliceOptions;
                        setShowSliceOptions(newShowSliceOptions);
                        setShowRemoveOptions(false);
                        setShowRestoreOptions(false);
                        if (!newShowSliceOptions) {
                          setIsAnimating(false);
                          setCurrentSliceIndex(0);
                        }
                      }}
                      disabled={processing || slicing}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-black border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      {slicing ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Grid3X3 size={18} />
                      )}
                      Slice
                    </button>
                    <AnimatePresence>
                      {showSliceOptions && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20 flex flex-col gap-4"
                        >
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Rows
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={sliceRows}
                                onChange={(e) =>
                                  setSliceRows(
                                    Math.max(1, parseInt(e.target.value) || 1)
                                  )
                                }
                                className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-black/20"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Cols
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={sliceCols}
                                onChange={(e) =>
                                  setSliceCols(
                                    Math.max(1, parseInt(e.target.value) || 1)
                                  )
                                }
                                className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-black/20"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={toggleAnimation}
                              disabled={slicing}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                isAnimating
                                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                  : "bg-indigo-500 text-white hover:bg-indigo-600"
                              } disabled:opacity-50`}
                            >
                              {isAnimating ? (
                                <>
                                  <Pause size={14} />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play size={14} />
                                  Review
                                </>
                              )}
                            </button>
                            <button
                              onClick={handleSlice}
                              disabled={slicing || isAnimating}
                              className="flex-1 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                              {slicing ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <Download size={14} />
                              )}
                              Download
                            </button>
                          </div>
                          {isAnimating && (
                            <div className="pt-2 border-t border-gray-200">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-gray-500">
                                  Speed
                                </span>
                                <span className="text-xs font-mono text-gray-400">
                                  {animationSpeed}ms
                                </span>
                              </div>
                              <input
                                type="range"
                                min="50"
                                max="2000"
                                step="50"
                                value={animationSpeed}
                                onChange={(e) =>
                                  setAnimationSpeed(Number(e.target.value))
                                }
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Fast</span>
                                <span>Slow</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-black border border-gray-200 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

interface SmartChatInterfaceProps {
  userId: string;
  session: ChatSessionMetadata;
  initialTree: ChatTree;
  onUpdateSession: (sessionId: string, title: string, model: string) => void;
  availableMoodboards?: ChatSessionMetadata[];
}

const constructSystemPrompt = (
  historyText: string,
  imageMode: boolean,
  style?: string,
  maxImages: number = 3,
  useSamePrompt: boolean = false,
  forceNumberOfGen: boolean = false,
  fixedGenCount: number = 4
) => {
  const imageCountInstruction = forceNumberOfGen
    ? `EXACTLY ${fixedGenCount}`
    : useSamePrompt
    ? "EXACTLY ONE"
    : `UP TO ${maxImages}`;

  const imageCountExplanation = forceNumberOfGen
    ? `You must generate exactly ${fixedGenCount} prompts, no more, no less.`
    : useSamePrompt
    ? "You MUST provide ONLY ONE prompt in the images_prompt array. This single prompt will be duplicated on the frontend to generate multiple variations of the same concept. DO NOT generate multiple prompts - provide EXACTLY ONE prompt only. The array length MUST be 1."
    : `NEVER EXCEED ${maxImages} prompts.`;

  const imageRules = imageMode
    ? `
Rules:
- Always respond as JSON matching this schema: { chat: string, images_prompt?: string[] }.
- Put your natural language reply in "chat".
- If the user asks to draw/create/generate an image, fill "images_prompt" with ${imageCountInstruction} short, high-quality English prompt${
        useSamePrompt || forceNumberOfGen ? "s" : "s"
      }. ${imageCountExplanation} Do NOT include ASCII art. Do NOT include base64. Keep prompt${
        useSamePrompt || forceNumberOfGen ? "s" : "s"
      } concise but descriptive.${
        useSamePrompt
          ? '\n- CRITICAL REQUIREMENT: When generating images with the same prompt setting enabled, you MUST return an array with ONLY ONE prompt element. The images_prompt array MUST contain exactly 1 prompt, not 2, not 3, ONLY 1. ARRAY LENGTH = 1 ONLY. Example correct format: {"chat": "...", "images_prompt": ["single prompt here"]}. DO NOT provide multiple prompts. DO NOT create variations. RETURN ONLY ONE PROMPT IN THE ARRAY.'
          : ""
      }
- If the user attached images, use them as visual references to generate detailed prompts that describe the style, composition, and content of those images.
- If no image is needed, set "images_prompt" to an empty array or omit it.

Special Handling for UI/Design Style Generation:
- When generating image prompts for UI designs, interfaces, or game screens, focus on describing the OVERALL STYLE and VISUAL CHARACTERISTICS, NOT individual UI elements.
- DO NOT list specific buttons, labels, or UI components (e.g., "PLAY button", "SHOP button", "SETTINGS button").
- INSTEAD, describe the style in general terms:
  * Button style characteristics (e.g., "volumetric buttons with thick white outlines", "rounded corners with 8px radius", "flat design with subtle shadows")
  * Color palette and scheme (e.g., "warm color palette with Safety Orange accents", "pastel colors with high contrast")
  * Typography style (e.g., "bubble fonts with white strokes", "rounded sans-serif with bold weights")
  * Overall aesthetic (e.g., "casual 3D art style", "claymorphism design", "isometric perspective")
  * Visual effects (e.g., "soft shadows", "gradient backgrounds", "cel-shaded rendering")
- The prompt should describe HOW elements look in general, not WHAT specific elements are present.
- Example GOOD: "Mobile game UI with volumetric buttons featuring thick white outlines, rounded corners, and bubble typography. Warm color palette with Safety Orange (#FFA000) accents. Casual 3D art style with claymorphism elements, cel-shaded rendering, and soft studio lighting."
- Example BAD: "A PLAY button with Safety Orange color, a SHOP button with purple color, a SETTINGS button with lime green color..."

Special Handling for Asset Extraction / Decomposition:
- If the user asks to separate, extract, or decompose elements from an image (e.g. "separate UI elements", "extract assets", "make sprite sheet"):
  1. GOAL: Extract elements by removing the original background and replacing it with a solid, dark, high-contrast background.
  2. Generate separate prompts for each distinct element found in the reference image.
  3. CRITICAL REQUIREMENT: You MUST include the instruction "remove background and replace with a solid dark background" (e.g. "on a solid black background", "on a solid dark grey background", "on a solid dark blue background") in every image prompt.
  4. Do NOT use gradients, shadows, patterns, or complex backgrounds. The background must be uniform, flat, and easy to key out (chroma key).
  5. Describe the element itself in high detail to maintain the original style, but isolate it completely from the surroundings.
`
    : `
Rules:
- Always respond as JSON matching this schema: { chat: string }.
- Put your natural language reply in "chat".
- DO NOT generate any image prompts. DO NOT include "images_prompt" in your response.
`;

  return `You are a helpful AI assistant.
Current Date: ${new Date().toISOString()}

Conversation History:
${historyText}
${imageRules}
${
  style && imageMode
    ? `\n\nActive Visual Style Guideline:\n${style}\n\nIMPORTANT: When generating image prompts, you MUST apply this visual style description to the generated prompts. Ensure the resulting images match this style.`
    : ""
}`;
};

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `node_${Date.now()}_${crypto.randomUUID()}`;
  }
  return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// TODO: Fetch available models from backend API instead of hardcoding
const AVAILABLE_MODELS = [
  { id: "gemini-3.0-pro", name: "Gemini 3.0 Pro" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
];

const AVAILABLE_IMAGE_MODELS = [
  { id: "models/imagen-4.0-generate-001", name: "Imagen 4.0" },
  { id: "models/imagen-4.0-ultra-generate-001", name: "Imagen 4.0 Ultra" },
  { id: "models/gemini-3-pro-image-preview", name: "Gemini 3 Pro" },
];

export function SmartChatInterface({
  userId,
  session,
  initialTree,
  onUpdateSession,
  availableMoodboards,
}: SmartChatInterfaceProps) {
  // Response schema for tool-calling: text chat plus optional image prompts
  const IMAGE_TOOL_SCHEMA = {
    type: "object",
    properties: {
      chat: { type: "string" },
      images_prompt: {
        type: "array",
        items: { type: "string" },
        default: [],
      },
    },
    required: ["chat"],
    additionalProperties: false,
  };
  const [tree, setTree] = useState<ChatTree>(initialTree);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBulkTaskModal, setShowBulkTaskModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    session.model || AVAILABLE_MODELS[0].id
  );
  const [thinkingSteps, setThinkingSteps] = useState(
    session.thinkingSteps || 1
  );
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string>(
    session.styleId || ""
  );
  const [imageSettings, setImageSettings] = useState<{
    aspectRatio: string;
    resolution: string;
    maxImages: number;
    model: string;
    useSamePrompt: boolean;
    forceNumberOfGen: boolean;
    fixedGenCount: number;
  }>({
    aspectRatio: "1:1",
    resolution: "1K",
    maxImages: 3,
    model: AVAILABLE_IMAGE_MODELS[0].id,
    useSamePrompt: false,
    forceNumberOfGen: false,
    fixedGenCount: 4,
  });
  const [showImageSettings, setShowImageSettings] = useState(false);
  const [viewingImage, setViewingImage] = useState<ChatAttachment | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<
    {
      file: File;
      preview: string;
      pinned: boolean;
    }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousSessionIdRef = useRef<string | null>(null);
  const previousInitialTreeRef = useRef<ChatTree | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeStyle, setActiveStyle] = useState<string>("");
  const [promptPrefix, setPromptPrefix] = useState<string>("");
  const [promptSuffix, setPromptSuffix] = useState<string>("");
  const [showPrefixModal, setShowPrefixModal] = useState(false);
  const [showSuffixModal, setShowSuffixModal] = useState(false);

  // --- Image Mode State ---
  const [imageMode, setImageMode] = useState(true);

  // Load Image Mode from cookie on mount
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    };
    const savedImageMode = getCookie("smartChatImageMode");
    if (savedImageMode !== undefined) {
      setImageMode(savedImageMode === "true");
    }
  }, []);

  // Save Image Mode to cookie
  const toggleImageMode = () => {
    const newMode = !imageMode;
    setImageMode(newMode);
    document.cookie = `smartChatImageMode=${newMode}; path=/; max-age=31536000`; // 1 year
  };

  // Bulk Task State
  const [bulkQueue, setBulkQueue] = useState<string[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [bulkDelay, setBulkDelay] = useState(1000);
  const cancelBulkRef = useRef(false);
  const [bulkProgress, setBulkProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);

  // Image Selection State
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    Map<string, Set<number>>
  >(new Map());
  const [downloadProgress, setDownloadProgress] = useState<{
    isDownloading: boolean;
    currentStep: "fetching" | "converting" | "zipping";
    current: number;
    total: number;
    currentFileName?: string;
  } | null>(null);

  // --- Image Selection Functions ---
  const toggleSelectionMode = () => {
    console.log("[toggleSelectionMode] Before toggle:", {
      isSelectionMode,
      selectedCount: selectedImages.size,
    });

    if (isSelectionMode && selectedImages.size > 0) {
      if (
        confirm("Exit without downloading? Selected images will be cleared.")
      ) {
        console.log("[toggleSelectionMode] Clearing selections and exiting");
        setIsSelectionMode(false);
        setSelectedImages(new Map());
      }
    } else {
      console.log("[toggleSelectionMode] Entering selection mode");
      setIsSelectionMode(!isSelectionMode);
      if (isSelectionMode) setSelectedImages(new Map());
    }
  };

  const toggleImageSelection = (nodeId: string, attachmentIndex: number) => {
    console.log("[toggleImageSelection] Before toggle:", {
      nodeId,
      attachmentIndex,
      currentSelected: selectedImages.get(nodeId),
      currentMap: new Map(selectedImages),
    });

    setSelectedImages((prev) => {
      const newMap = new Map(prev);
      const nodeSet = newMap.get(nodeId) || new Set();

      // CRITICAL FIX: Create a NEW Set instead of mutating the existing one
      const newSet = new Set(nodeSet);

      if (newSet.has(attachmentIndex)) {
        newSet.delete(attachmentIndex);
        if (newSet.size === 0) {
          newMap.delete(nodeId);
        } else {
          newMap.set(nodeId, newSet);
        }
      } else {
        newSet.add(attachmentIndex);
        newMap.set(nodeId, newSet);
      }

      console.log("[toggleImageSelection] After toggle:", {
        nodeId,
        attachmentIndex,
        newSelected: newMap.get(nodeId),
        newMap: new Map(newMap),
      });

      return newMap;
    });
  };

  const clearAllSelections = () => {
    console.log("[clearAllSelections] Clearing all selections");
    setSelectedImages(new Map());
  };

  const selectAllImages = () => {
    console.log("[selectAllImages] Selecting all images across all nodes");
    const newMap = new Map<string, Set<number>>();

    Object.values(tree.nodes).forEach((node) => {
      if (node.attachments && node.attachments.length > 0) {
        const imageIndices = new Set<number>();
        node.attachments.forEach((att, index) => {
          if (att.type === "image") {
            imageIndices.add(index);
          }
        });
        if (imageIndices.size > 0) {
          newMap.set(node.id, imageIndices);
        }
      }
    });

    setSelectedImages(newMap);
  };

  const getTotalSelectedCount = () => {
    let count = 0;
    const details: { [nodeId: string]: number } = {};
    selectedImages.forEach((set, nodeId) => {
      count += set.size;
      details[nodeId] = set.size;
    });
    console.log("[getTotalSelectedCount] Count:", {
      total: count,
      byNode: details,
      mapSize: selectedImages.size,
    });
    return count;
  };

  const isImageSelected = (
    nodeId: string,
    attachmentIndex: number
  ): boolean => {
    const nodeSet = selectedImages.get(nodeId);
    const isSelected = nodeSet?.has(attachmentIndex) || false;
    console.log("[isImageSelected] Check:", {
      nodeId,
      attachmentIndex,
      nodeSet: nodeSet ? Array.from(nodeSet) : null,
      isSelected,
      totalSelected: selectedImages.size,
    });
    return isSelected;
  };

  // ESC key handler for selection mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSelectionMode) {
        toggleSelectionMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelectionMode, selectedImages.size]);

  // Convert blob to WebP using canvas
  const convertBlobToWebP = (blob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          URL.revokeObjectURL(img.src);
          reject(new Error("Canvas context unavailable"));
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (webpBlob) => {
            URL.revokeObjectURL(img.src);
            if (webpBlob) {
              resolve(webpBlob);
            } else {
              reject(new Error("WebP conversion failed"));
            }
          },
          "image/webp",
          0.9
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error("Image load failed"));
      };
    });
  };

  // Download selected images as ZIP
  const handleDownloadSelected = async () => {
    console.log("[handleDownloadSelected] Starting download with selections:", {
      totalNodes: selectedImages.size,
      selections: Object.fromEntries(
        Array.from(selectedImages.entries()).map(([nodeId, set]) => [
          nodeId,
          Array.from(set),
        ])
      ),
    });

    if (selectedImages.size === 0) {
      console.log("[handleDownloadSelected] No selections, aborting");
      return;
    }

    // Calculate total images
    let totalImages = 0;
    selectedImages.forEach((set) => {
      totalImages += set.size;
    });

    // Warn for large selections
    if (totalImages > 50) {
      if (
        !confirm(
          `You've selected ${totalImages} images. This may take a while to process. Continue?`
        )
      ) {
        return;
      }
    }

    setDownloadProgress({
      isDownloading: true,
      currentStep: "fetching",
      current: 0,
      total: totalImages,
    });

    try {
      const zip = new JSZip();
      let processedCount = 0;

      // Collect all selected attachments
      const imagesToProcess: Array<{
        attachment: ChatAttachment;
        nodeId: string;
        index: number;
        nodeCreatedAt: number;
      }> = [];

      for (const [nodeId, indices] of selectedImages.entries()) {
        const node = tree.nodes[nodeId];
        if (!node?.attachments) continue;

        for (const idx of indices) {
          const att = node.attachments[idx];
          if (att) {
            imagesToProcess.push({
              attachment: att,
              nodeId,
              index: idx,
              nodeCreatedAt: node.createdAt || 0,
            });
          }
        }
      }

      // Sort by node creation time and then attachment index to maintain chat order
      imagesToProcess.sort((a, b) => {
        if (a.nodeCreatedAt !== b.nodeCreatedAt) {
          return a.nodeCreatedAt - b.nodeCreatedAt;
        }
        return a.index - b.index;
      });

      // Prepare mapping for full_prompt.txt
      let fullPromptContent = "VINPIX SMART CHAT - FULL PROMPT MAPPING\n";
      fullPromptContent += "==========================================\n\n";

      // Process images in parallel with a concurrency limit
      const CONCURRENCY_LIMIT = 5;
      const results: Array<{ fileName: string; blob: Blob; prompt: string }> =
        new Array(imagesToProcess.length);

      const processBatch = async (batchIndices: number[]) => {
        await Promise.all(
          batchIndices.map(async (i) => {
            const { attachment, index } = imagesToProcess[i];

            setDownloadProgress((prev) =>
              prev
                ? {
                    ...prev,
                    currentStep: "fetching",
                    currentFileName: attachment.name || `image-${index}`,
                  }
                : null
            );

            try {
              // Fetch image URL
              let url = attachment.url;
              if (attachment.key && !url?.startsWith("data:")) {
                url = await getPresignedUrl(attachment.key);
              }

              if (!url) {
                console.warn(`Skipping image without URL: ${attachment.name}`);
                return;
              }

              const proxyUrl = url.startsWith("data:")
                ? url
                : `/api/proxy-image?url=${encodeURIComponent(url)}`;

              const response = await fetch(proxyUrl);
              if (!response.ok) {
                console.warn(`Failed to fetch image: ${attachment.name}`);
                return;
              }

              const blob = await response.blob();

              // Convert to WebP
              const webpBlob = await convertBlobToWebP(blob);

              // Generate unique filename
              let baseName =
                attachment.name || attachment.prompt?.slice(0, 30) || "image";
              baseName = baseName.replace(/\.[^/.]+$/, "");
              baseName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");
              const paddedCounter = String(i + 1).padStart(3, "0");
              const fileName = `${paddedCounter}_${baseName}.webp`;

              results[i] = {
                fileName,
                blob: webpBlob,
                prompt: attachment.prompt || "No prompt available",
              };

              setDownloadProgress((prev) =>
                prev
                  ? {
                      ...prev,
                      current: prev.current + 1,
                    }
                  : null
              );
            } catch (err) {
              console.error(`Error processing image ${i}:`, err);
            }
          })
        );
      };

      // Execute in batches
      for (let i = 0; i < imagesToProcess.length; i += CONCURRENCY_LIMIT) {
        const batch = [];
        for (
          let j = i;
          j < i + CONCURRENCY_LIMIT && j < imagesToProcess.length;
          j++
        ) {
          batch.push(j);
        }
        await processBatch(batch);
      }

      // Add to ZIP and build prompt mapping
      setDownloadProgress((prev) =>
        prev
          ? {
              ...prev,
              currentStep: "zipping",
            }
          : null
      );

      results.forEach((res) => {
        if (res) {
          zip.file(res.fileName, res.blob);
          fullPromptContent += `FILE: ${res.fileName}\n`;
          fullPromptContent += `PROMPT: ${res.prompt}\n`;
          fullPromptContent += `------------------------------------------\n\n`;
        }
      });

      // Add the mapping file
      zip.file("full_prompt.txt", fullPromptContent);

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      });

      // Download
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(
        now.getHours()
      ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `vinpix-images-${timestamp}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Success: Clear selections and exit mode
      setSelectedImages(new Map());
      setIsSelectionMode(false);
    } catch (error) {
      console.error("Failed to create ZIP:", error);
      alert("Failed to download images. Please try again.");
    } finally {
      setDownloadProgress(null);
    }
  };

  // --- Bulk Task Effect ---
  useEffect(() => {
    if (!isProcessingQueue || bulkQueue.length === 0 || loading) return;

    if (cancelBulkRef.current) {
      setIsProcessingQueue(false);
      setBulkQueue([]);
      setBulkProgress(null);
      return;
    }

    const nextPrompt = bulkQueue[0];
    const total = bulkProgress?.total || bulkQueue.length;
    const current = total - bulkQueue.length + 1;

    setBulkProgress({ current, total });

    // Use a timeout to simulate delay between messages if needed
    const timer = setTimeout(() => {
      handleSendMessage(nextPrompt).then(() => {
        setBulkQueue((prev) => prev.slice(1));
        // If this was the last one, finish up
        if (bulkQueue.length <= 1) {
          setIsProcessingQueue(false);
          setBulkProgress(null);
        }
      });
    }, bulkDelay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bulkQueue, isProcessingQueue, loading, bulkDelay]);

  // Debounce style fetch to avoid excessive API calls
  useEffect(() => {
    if (!selectedMoodboardId) {
      setActiveStyle("");
      return;
    }

    // Debounce the style fetch by 300ms
    const timeoutId = setTimeout(() => {
      const fetchStyle = async () => {
        try {
          const res = await getSmartChatDetail(userId, selectedMoodboardId);
          if (res.moodboard) {
            // Define detailed analysis type
            type DetailedAnalysis = {
              overallStyle?: string;
              colorPalette?: {
                primary: Array<{ name: string; hex: string }>;
                secondary: Array<{ name: string; hex: string }>;
                accent: Array<{ name: string; hex: string }>;
              };
              lightingAndAtmosphere?: string;
              moodAndTone?: string;
              technicalSpecs?: string;
            };

            // Prefer detailed analysis if available, fallback to legacy styleDescription
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const moodboardData = res.moodboard as any;

            if (moodboardData.detailedAnalysis) {
              // Convert detailed analysis to a comprehensive style string
              const analysis =
                moodboardData.detailedAnalysis as DetailedAnalysis;
              const styleComponents: string[] = [];

              // Overall style
              if (analysis.overallStyle) {
                styleComponents.push(
                  `OVERALL STYLE:\n${analysis.overallStyle}`
                );
              }

              // Color palette
              if (analysis.colorPalette) {
                const colors: string[] = [];
                if (analysis.colorPalette.primary?.length > 0) {
                  colors.push(
                    `Primary: ${analysis.colorPalette.primary
                      .map((c) => `${c.name} (${c.hex})`)
                      .join(", ")}`
                  );
                }
                if (analysis.colorPalette.secondary?.length > 0) {
                  colors.push(
                    `Secondary: ${analysis.colorPalette.secondary
                      .map((c) => `${c.name} (${c.hex})`)
                      .join(", ")}`
                  );
                }
                if (analysis.colorPalette.accent?.length > 0) {
                  colors.push(
                    `Accent: ${analysis.colorPalette.accent
                      .map((c) => `${c.name} (${c.hex})`)
                      .join(", ")}`
                  );
                }
                if (colors.length > 0) {
                  styleComponents.push(`COLOR PALETTE:\n${colors.join("\n")}`);
                }
              }

              // Add other relevant sections for image generation
              if (analysis.lightingAndAtmosphere) {
                styleComponents.push(
                  `LIGHTING & ATMOSPHERE:\n${analysis.lightingAndAtmosphere}`
                );
              }
              if (analysis.moodAndTone) {
                styleComponents.push(`MOOD & TONE:\n${analysis.moodAndTone}`);
              }
              if (analysis.technicalSpecs) {
                styleComponents.push(
                  `TECHNICAL SPECIFICATIONS:\n${analysis.technicalSpecs}`
                );
              }

              setActiveStyle(styleComponents.join("\n\n"));
            } else if (res.moodboard.styleDescription) {
              // Legacy format
              setActiveStyle(res.moodboard.styleDescription);
            }
          }
        } catch (e) {
          console.error("Failed to load style", e);
        }
      };
      fetchStyle();
    }, 300); // 300ms debounce

    // Cleanup timeout on dependency change or unmount
    return () => clearTimeout(timeoutId);
  }, [selectedMoodboardId, userId]);

  // Sync tree ONLY when:
  // 1. Switching to a different session (sessionId changes)
  // 2. initialTree is reloaded from server (initialTree reference changes but sessionId same)
  // This prevents resetting tree when only metadata (title, model) changes
  useEffect(() => {
    const sessionSwitched = previousSessionIdRef.current !== session.sessionId;
    const treeReloaded = previousInitialTreeRef.current !== initialTree;

    if (sessionSwitched || treeReloaded) {
      // Revoke all pending attachment URLs to prevent memory leaks
      pendingAttachments.forEach((att) => {
        URL.revokeObjectURL(att.preview);
      });

      // Session switched or tree reloaded - sync tree to initialTree
      setTree(initialTree);
      setPendingAttachments([]); // Clear attachments on switch
      previousSessionIdRef.current = session.sessionId;
      previousInitialTreeRef.current = initialTree;
    }
  }, [session.sessionId, initialTree, pendingAttachments]);

  // Cleanup blob URLs on component unmount
  useEffect(() => {
    return () => {
      // Revoke all pending attachment URLs to prevent memory leaks
      pendingAttachments.forEach((att) => {
        URL.revokeObjectURL(att.preview);
      });
    };
  }, [pendingAttachments]);

  // Sync model when session.model changes (but don't reset tree)
  // And also load from localStorage on mount if session is fresh
  useEffect(() => {
    if (session.model) {
      setSelectedModel(session.model);
    } else {
      // Fallback to local storage if session has no model (though usually backend sets default)
      const saved = localStorage.getItem("smartChatModel");
      if (saved) setSelectedModel(saved);
    }

    // Load image settings
    const savedSettings = localStorage.getItem("smartChatImageSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        // Ensure maxImages is a number
        if (parsed.maxImages && typeof parsed.maxImages !== "number") {
          parsed.maxImages = parseInt(String(parsed.maxImages)) || 3;
        }
        // Merge with defaults to ensure new keys (like model) exist if loading old settings
        setImageSettings((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to parse saved settings", e);
      }
    }

    // Load prefix and suffix prompts from localStorage
    const savedPrefix = localStorage.getItem("smartChatPromptPrefix");
    if (savedPrefix) setPromptPrefix(savedPrefix);

    const savedSuffix = localStorage.getItem("smartChatPromptSuffix");
    if (savedSuffix) setPromptSuffix(savedSuffix);
  }, [session.model]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;

    // Validate model exists in list
    const isValidModel = AVAILABLE_MODELS.some((m) => m.id === newModel);
    if (!isValidModel) {
      console.error("Invalid model selected:", newModel);
      return;
    }

    setSelectedModel(newModel);
    localStorage.setItem("smartChatModel", newModel);
  };

  const handleImageSettingChange = (
    key: string,
    value: string | boolean | number
  ) => {
    // Validate and normalize fixedGenCount
    let normalizedValue = value;
    if (key === "fixedGenCount") {
      const numValue =
        typeof value === "number" ? value : parseInt(String(value));
      // Clamp between 1-10 range
      normalizedValue = Math.max(
        1,
        Math.min(10, isNaN(numValue) ? 4 : numValue)
      );
    }

    const newSettings = { ...imageSettings, [key]: normalizedValue };
    setImageSettings(newSettings);
    localStorage.setItem("smartChatImageSettings", JSON.stringify(newSettings));

    // Clear pending attachments if switching away from gemini-3-pro-image-preview
    if (
      key === "model" &&
      value !== "models/gemini-3-pro-image-preview" &&
      pendingAttachments.length > 0
    ) {
      setPendingAttachments([]);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tree.currentNodeId]);

  // --- Drag & Drop ---
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only show drag overlay for gemini-3-pro-image-preview model and if Image Mode is ON
    if (
      imageMode &&
      imageSettings.model === "models/gemini-3-pro-image-preview"
    ) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Only allow image drop for gemini-3-pro-image-preview model
    if (imageSettings.model !== "models/gemini-3-pro-image-preview") {
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow image upload for gemini-3-pro-image-preview model
    if (imageSettings.model !== "models/gemini-3-pro-image-preview") {
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) return;

    const newAttachments = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      pinned: false,
    }));

    setPendingAttachments((prev) => [...prev, ...newAttachments]);
  };

  const togglePinAttachment = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPendingAttachments((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          return { ...item, pinned: !item.pinned };
        }
        return item;
      });
    });
  };

  const removeAttachment = (index: number) => {
    setPendingAttachments((prev) => {
      const newAttachments = [...prev];
      // Revoke blob URL to prevent memory leak
      URL.revokeObjectURL(newAttachments[index].preview);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  // --- Core Tree Logic ---

  // Helper function to get all descendants of a node (for deletion)
  const getAllDescendants = (
    nodeId: string,
    currentTree: ChatTree
  ): string[] => {
    const descendantIds: string[] = [];
    const queue = [...(currentTree.nodes[nodeId]?.childrenIds || [])];

    while (queue.length > 0) {
      const id = queue.shift()!;
      const node = currentTree.nodes[id];
      if (node) {
        descendantIds.push(id);
        queue.push(...node.childrenIds);
      }
    }

    return descendantIds;
  };

  const generateThread = (
    headId: string | null,
    currentTree: ChatTree = tree
  ): ChatNode[] => {
    const thread: ChatNode[] = [];
    let currentId = headId;
    while (currentId) {
      const node = currentTree.nodes[currentId];
      if (!node) break;
      thread.unshift(node);
      currentId = node.parentId;
    }
    return thread;
  };

  const getThreadHistoryForAI = (thread: ChatNode[]) => {
    // Convert thread to format expected by AI Service (or just concat text)
    // Here we construct a simple text history or use system prompt + chat format
    // Since the lambda `chat` API expects a `prompt`, we usually send the last message as prompt
    // and the rest as context/history.
    // BUT, the current simple `chat` API in lambda might be stateless or expect full context?
    // Looking at lambda code: `call_generate_content` takes `systemInstruct` and `prompt`.
    // It doesn't seem to take a "messages" array for history (unless using OpenAI format fallback).
    // For Gemini, we typically pack history into the prompt or system prompt.
    // Let's pack history into `systemPrompt` or prepend to `prompt`.

    // Strategy: Prepend history to the prompt.
    const historyText = thread
      .map((n) => {
        let content = `${n.role === "user" ? "User" : "Assistant"}: ${
          n.content
        }`;
        if (n.attachments && n.attachments.length > 0) {
          content += `\n[User attached ${n.attachments.length} images]`;
        }
        return content;
      })
      .join("\n\n");

    return historyText;
  };

  const createNode = (
    content: string,
    role: "user" | "assistant",
    parentId: string | null,
    model?: string,
    attachments?: ChatAttachment[]
  ): ChatNode => {
    return {
      id: generateId(),
      parentId,
      childrenIds: [],
      role,
      content,
      model,
      createdAt: Date.now(),
      attachments,
    };
  };

  const addNodeToTree = (node: ChatNode, newTree: ChatTree) => {
    newTree.nodes[node.id] = node;
    if (node.parentId && newTree.nodes[node.parentId]) {
      // Avoid duplicates
      if (!newTree.nodes[node.parentId].childrenIds.includes(node.id)) {
        newTree.nodes[node.parentId].childrenIds.push(node.id);
      }
    } else if (!node.parentId) {
      // It's a root
      // If we already have a root, this new node becomes a sibling of the old root?
      // Usually only one rootNodeId in structure, but my structure allows null parent.
      // Let's assume if rootNodeId is null, we set it.
      if (!newTree.rootNodeId) {
        newTree.rootNodeId = node.id;
      } else {
        // Technically multiple roots are possible if we treat them as independent starts,
        // but UI expects a single thread start.
        // For now, let's assume we always extend from current leaf.
      }
    }
    return newTree;
  };

  // --- Actions ---

  const convertImageToWebPBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(img.src);
          reject(new Error("Canvas context failed"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const webpDataUrl = canvas.toDataURL("image/webp", 0.9);
        resolve(webpDataUrl);
        URL.revokeObjectURL(img.src);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(img.src);
        reject(e);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const callAIWithRefinement = async (
    systemPrompt: string,
    initialUserPrompt: string,
    model: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: any,
    base64Images?: string[]
  ) => {
    // Helper: Centralized validation for image count settings
    const getValidatedImageCount = (
      value: number | string | undefined,
      defaultValue: number,
      min: number = 1,
      max: number = 10
    ): number => {
      const numValue =
        typeof value === "number" ? value : parseInt(String(value));
      return Math.max(
        min,
        Math.min(max, isNaN(numValue) ? defaultValue : numValue)
      );
    };

    // Determine effective max images for backend duplication logic
    const effectiveMaxImages = imageSettings.forceNumberOfGen
      ? getValidatedImageCount(imageSettings.fixedGenCount, 4)
      : getValidatedImageCount(imageSettings.maxImages, 3);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentResponse: any = await chatWithAI(
      systemPrompt,
      initialUserPrompt,
      model,
      schema,
      true,
      base64Images,
      {
        maxImages: effectiveMaxImages,
        useSamePrompt: imageSettings.useSamePrompt,
      }
    );

    // If steps > 1, refine
    for (let step = 2; step <= thinkingSteps; step++) {
      // Extract text from current response to use as context
      let previousText = "";
      if (typeof currentResponse === "string") {
        previousText = currentResponse;
      } else if (currentResponse?.chat) {
        previousText = currentResponse.chat;
      } else if (currentResponse?.message) {
        previousText = currentResponse.message;
      } else {
        previousText = JSON.stringify(currentResponse);
      }

      const refinementPrompt = `
You are currently in Thinking Step ${step} of ${thinkingSteps}.
Your goal is to REFINE the previous response to be higher quality, more accurate, and fully aligned with the user's original request.

ORIGINAL USER REQUEST:
"${initialUserPrompt}"

YOUR PREVIOUS DRAFT RESPONSE:
"${previousText}"

CRITIQUE & REFINEMENT INSTRUCTIONS:
1. Review your previous draft critically. Does it fully answer the prompt? Is the style correct?
2. If there were images requested, do the prompts look detailed and correct?
3. Provide a Polished, Improved Version of the response.
4. Output MUST be in the same JSON format as before.
`;

      // We use the SAME system prompt (history) but a NEW user prompt (the refinement instruction)
      // We assume the model is stateless per call in this context, so we provide full context + refinement instruction.
      // We pass base64Images again to ensure visual context is available for refinement.

      currentResponse = await chatWithAI(
        systemPrompt,
        refinementPrompt,
        model,
        schema,
        true,
        base64Images,
        {
          maxImages: effectiveMaxImages,
          useSamePrompt: imageSettings.useSamePrompt,
        }
      );
    }
    return currentResponse;
  };

  const handleSendMessage = async (overrideInput?: string) => {
    // If overrideInput is provided (bulk task), use it. Otherwise use state input.
    // We check specifically for string type to avoid event objects being treated as input
    const contentToProcess =
      typeof overrideInput === "string" ? overrideInput : input;

    if (
      (!contentToProcess.trim() && pendingAttachments.length === 0) ||
      loading
    )
      return;

    // DIAGNOSTIC: Check if tree state is valid
    console.log("[DEBUG] handleSendMessage START", {
      contentToProcess: contentToProcess.slice(0, 50),
      isManualSend: typeof overrideInput !== "string",
      treeStateCurrentNodeId: tree.currentNodeId,
      treeStateNodeCount: Object.keys(tree.nodes).length,
    });

    // Apply prefix and suffix to input
    let userContent = contentToProcess;
    if (promptPrefix || promptSuffix) {
      userContent = `${promptPrefix}${
        promptPrefix ? " " : ""
      }${contentToProcess}${promptSuffix ? " " : ""}${promptSuffix}`;
    }

    const currentAttachments = [...pendingAttachments];

    // Only clear input if we are sending manually (not bulk override)
    if (typeof overrideInput !== "string") {
      setInput("");
    }

    // Clear UI immediately but keep pinned attachments
    const pinnedAttachments = currentAttachments.filter((att) => att.pinned);
    setPendingAttachments(pinnedAttachments);

    setLoading(true);

    try {
      // 1. Upload Images if any
      const uploadedAttachments: ChatAttachment[] = [];
      const base64Images: string[] = [];

      if (currentAttachments.length > 0) {
        // Use Promise.allSettled to handle partial failures gracefully
        const uploadPromises = currentAttachments.map(async (attachment) => {
          const base64 = await convertImageToWebPBase64(attachment.file);
          base64Images.push(base64);

          // Upload to S3 via Lambda
          const uploadRes = await uploadSmartChatImage(
            userId,
            session.sessionId,
            base64
          );

          return {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            type: "image" as const,
            key: uploadRes.key,
            url: base64,
            name: attachment.file.name,
          };
        });

        const uploadResults = await Promise.allSettled(uploadPromises);

        // Check if any uploads failed
        const failedUploads = uploadResults.filter(
          (result) => result.status === "rejected"
        );

        if (failedUploads.length > 0) {
          // Some uploads failed - need to clean up successful ones
          const successfulKeys: string[] = [];

          uploadResults.forEach((result) => {
            if (result.status === "fulfilled" && result.value.key) {
              successfulKeys.push(result.value.key);
            }
          });

          // Delete successfully uploaded images from S3
          if (successfulKeys.length > 0) {
            try {
              await deleteSmartChatImages(userId, successfulKeys);
              console.log(
                `[handleSendMessage] Cleaned up ${successfulKeys.length} images after upload failure`
              );
            } catch (cleanupError) {
              console.error(
                "[handleSendMessage] Failed to cleanup images after upload failure:",
                cleanupError
              );
            }
          }

          // Show error to user with details
          const failedCount = failedUploads.length;
          const successCount = uploadResults.length - failedCount;
          alert(
            `Failed to upload ${failedCount} of ${
              uploadResults.length
            } images. ${
              successCount > 0
                ? `${successCount} successfully uploaded images have been removed.`
                : ""
            }\n\nPlease try again.`
          );

          setLoading(false);
          return;
        }

        // All uploads successful - collect attachments
        uploadResults.forEach((result) => {
          if (result.status === "fulfilled") {
            uploadedAttachments.push(result.value);
          }
        });
      }

      // 2. Create User Node
      // Since we have a 'loading' guard, we can reasonably assume 'tree' is stable.
      // We calculate the new state synchronously to use it immediately for AI context.

      const parentId = tree.currentNodeId;
      const userNode = createNode(
        userContent,
        "user",
        parentId,
        undefined,
        uploadedAttachments.length > 0 ? uploadedAttachments : undefined
      );

      const newTree = { ...tree };
      newTree.nodes = { ...newTree.nodes };

      if (parentId && newTree.nodes[parentId]) {
        newTree.nodes[parentId] = {
          ...newTree.nodes[parentId],
          childrenIds: [...newTree.nodes[parentId].childrenIds],
        };
      }

      addNodeToTree(userNode, newTree);
      newTree.currentNodeId = userNode.id;

      // Update State
      setTree(newTree);

      // Use for AI context
      const treeForAI = newTree;

      console.log("[DEBUG] User node created", {
        userNodeId: userNode.id,
        parentId: userNode.parentId,
      });

      // 3. Prepare AI Context
      const thread = generateThread(userNode.id, treeForAI);

      const shouldInjectStyleInPrompt =
        imageMode && thinkingSteps >= 2 && !!activeStyle;
      const styleForSystem =
        imageMode && !shouldInjectStyleInPrompt ? activeStyle : undefined;
      const promptSuffix = shouldInjectStyleInPrompt
        ? `\n\nActive Visual Style Guideline:\n${activeStyle}`
        : "";

      const systemPrompt = constructSystemPrompt(
        getThreadHistoryForAI(thread.slice(0, -1)),
        imageMode,
        styleForSystem,
        imageMode ? imageSettings.maxImages : 0,
        imageMode ? imageSettings.useSamePrompt : false,
        imageMode ? imageSettings.forceNumberOfGen : false,
        imageSettings.fixedGenCount
      );

      // 4. Call AI with error handling
      let response;
      try {
        response = await callAIWithRefinement(
          systemPrompt,
          userContent + promptSuffix,
          selectedModel,
          IMAGE_TOOL_SCHEMA,
          base64Images.length > 0 ? base64Images : undefined
        );
      } catch (error) {
        console.error("[SmartChatInterface] AI call failed:", error);

        // Remove the user node from tree since AI failed
        setTree((prev) => {
          const rollbackTree = { ...prev };
          rollbackTree.nodes = { ...rollbackTree.nodes };

          // Remove user node
          delete rollbackTree.nodes[userNode.id];

          const pId = userNode.parentId;
          // Remove from parent's children if has parent
          if (pId && rollbackTree.nodes[pId]) {
            rollbackTree.nodes[pId] = {
              ...rollbackTree.nodes[pId],
              childrenIds: rollbackTree.nodes[pId].childrenIds.filter(
                (id) => id !== userNode.id
              ),
            };
            // Restore previous currentNodeId (parent)
            rollbackTree.currentNodeId = pId;
          }

          return rollbackTree;
        });

        // Show error to user
        alert(
          `Failed to send message: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );

        setLoading(false);
        return;
      }

      console.log("[SmartChatInterface] chatWithAI response:", response);

      let aiContent = "";
      let prompts: string[] = [];

      if (typeof response === "string") {
        aiContent = response;
      } else if (typeof response === "object" && response !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyResp = response as any;
        if (
          typeof anyResp.chat === "string" ||
          Array.isArray(anyResp.images_prompt)
        ) {
          aiContent = anyResp.chat || "";

          // Validate that AI provided meaningful content
          if (!aiContent || aiContent.trim().length === 0) {
            // If there are no image prompts either, this is an empty response
            if (!anyResp.images_prompt || anyResp.images_prompt.length === 0) {
              console.error("[SmartChatInterface] AI returned empty response");

              // Remove the user node from tree since response is empty
              setTree((prev) => {
                const rollbackTree = { ...prev };
                rollbackTree.nodes = { ...rollbackTree.nodes };

                delete rollbackTree.nodes[userNode.id];

                const pId = userNode.parentId;
                if (pId && rollbackTree.nodes[pId]) {
                  rollbackTree.nodes[pId] = {
                    ...rollbackTree.nodes[pId],
                    childrenIds: rollbackTree.nodes[pId].childrenIds.filter(
                      (id) => id !== userNode.id
                    ),
                  };
                  rollbackTree.currentNodeId = pId;
                }

                return rollbackTree;
              });

              alert("AI returned an empty response. Please try again.");
              setLoading(false);
              return;
            }
            // If there are image prompts but no chat, provide a default message
            aiContent = "Here are the generated images:";
          }

          let rawPrompts = Array.isArray(anyResp.images_prompt)
            ? anyResp.images_prompt
            : [];

          // CRITICAL FIX: If useSamePrompt is enabled AND forceNumberOfGen is NOT enabled,
          // force only the first prompt to be used
          // This ensures consistency even if the AI ignores instructions and returns multiple prompts
          if (
            imageSettings.useSamePrompt &&
            !imageSettings.forceNumberOfGen &&
            rawPrompts.length > 1
          ) {
            console.warn(
              "[useSamePrompt] AI returned multiple prompts despite instructions. Forcing first prompt only:",
              rawPrompts[0]
            );
            rawPrompts = [rawPrompts[0]];
          }

          // Helper: Get validated count from callAIWithRefinement scope
          const getValidatedCount = (value: number, defaultVal: number) => {
            return Math.max(1, Math.min(10, isNaN(value) ? defaultVal : value));
          };

          // If forceNumberOfGen is enabled, use fixed count
          if (imageSettings.forceNumberOfGen) {
            const count = getValidatedCount(imageSettings.fixedGenCount, 4);
            prompts = rawPrompts.slice(0, count);
            console.log(
              "[forceNumberOfGen] Using fixed count:",
              count,
              "images"
            );
          } else if (imageSettings.useSamePrompt && rawPrompts.length > 0) {
            const singlePrompt = rawPrompts[0];
            const count = getValidatedCount(imageSettings.maxImages, 3);
            prompts = Array(count).fill(singlePrompt);
            console.log(
              "[useSamePrompt] Duplicating prompt:",
              singlePrompt,
              "to",
              count,
              "images"
            );
            console.log("[useSamePrompt] Final prompts array:", prompts);
          } else {
            const maxCount = getValidatedCount(imageSettings.maxImages, 3);
            prompts = rawPrompts.slice(0, maxCount);
          }
        } else if (anyResp.message) {
          aiContent = anyResp.message;
        } else {
          aiContent = JSON.stringify(response);
        }
      } else {
        aiContent = String(response);
      }

      // 5. Create Assistant Node IMMEDIATELY (Text Only first)
      const aiAttachments: ChatAttachment[] = prompts.map((p, i) => ({
        id: `loading-${Date.now()}-${i}`,
        type: "image",
        name: p,
        status: "loading",
        prompt: p,
      }));

      const aiNode = createNode(
        aiContent,
        "assistant",
        userNode.id,
        selectedModel,
        aiAttachments.length > 0 ? aiAttachments : undefined
      );

      let treeAfterAI = treeForAI;
      setTree((prevTree) => {
        treeAfterAI = { ...prevTree };
        treeAfterAI.nodes = { ...treeAfterAI.nodes };
        // Ensure user node exists and update it
        if (treeAfterAI.nodes[userNode.id]) {
          treeAfterAI.nodes[userNode.id] = {
            ...treeAfterAI.nodes[userNode.id],
            childrenIds: [...treeAfterAI.nodes[userNode.id].childrenIds],
          };
        }

        addNodeToTree(aiNode, treeAfterAI);
        treeAfterAI.currentNodeId = aiNode.id;

        return treeAfterAI;
      });

      // 6. Generate Images in Parallel (all at once)
      if (prompts.length > 0) {
        // Create all promises at once
        const imagePromises = prompts.map(async (p, i) => {
          try {
            const gen = await generateImage(
              userId,
              session.sessionId,
              p,
              base64Images.length > 0 &&
                imageSettings.model === "models/gemini-3-pro-image-preview"
                ? base64Images[0]
                : undefined,
              {
                aspectRatio: imageSettings.aspectRatio,
                resolution: imageSettings.resolution,
                model: imageSettings.model,
              }
            );

            if (gen?.key) {
              const newAttachment: ChatAttachment = {
                id: aiAttachments[i].id,
                type: "image",
                key: gen.key,
                name: p.slice(0, 50),
                status: "complete",
                prompt: p,
              };

              // Update local reference for final save
              aiAttachments[i] = newAttachment;

              // Update Tree with new attachment immediately when ready
              setTree((prev) => {
                const updated = { ...prev };
                updated.nodes = { ...updated.nodes };
                const currentNode = updated.nodes[aiNode.id];
                if (currentNode) {
                  // Get current attachments from state to merge
                  const currentAttachments = currentNode.attachments || [];
                  const updatedAttachments = [...currentAttachments];
                  updatedAttachments[i] = newAttachment;
                  updated.nodes[aiNode.id] = {
                    ...currentNode,
                    attachments: updatedAttachments,
                  };
                }
                return updated;
              });
              return { success: true, index: i, attachment: newAttachment };
            }
            throw new Error("Generation failed - no key returned");
          } catch (e) {
            console.error("Image generation failed for prompt:", p, e);

            const failedAttachment: ChatAttachment = {
              ...aiAttachments[i],
              status: "failed",
            };

            // Update local reference
            aiAttachments[i] = failedAttachment;

            // Update Tree with failed status
            setTree((prev) => {
              const updated = { ...prev };
              updated.nodes = { ...updated.nodes };
              const currentNode = updated.nodes[aiNode.id];
              if (currentNode) {
                const currentAttachments = currentNode.attachments || [];
                const updatedAttachments = [...currentAttachments];
                updatedAttachments[i] = failedAttachment;
                updated.nodes[aiNode.id] = {
                  ...currentNode,
                  attachments: updatedAttachments,
                };
              }
              return updated;
            });
            return { success: false, index: i, error: e };
          }
        });

        // Wait for all to complete (but UI updates happen as each resolves)
        await Promise.allSettled(imagePromises);

        // Final Save with all attachments
        // We reconstruct final tree from treeAfterAI but update attachments
        const finalTree = { ...treeAfterAI };
        finalTree.nodes = { ...finalTree.nodes };
        if (finalTree.nodes[aiNode.id]) {
          finalTree.nodes[aiNode.id] = {
            ...finalTree.nodes[aiNode.id],
            attachments: aiAttachments,
          };
        }

        // Also ensure user node is present in final save
        if (finalTree.nodes[userNode.id]) {
          finalTree.nodes[userNode.id] = userNode;
        }

        await saveSmartChatState(
          userId,
          session.sessionId,
          finalTree,
          aiContent.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      } else {
        // No images, just save text
        await saveSmartChatState(
          userId,
          session.sessionId,
          treeAfterAI,
          aiContent.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      }

      // CRITICAL FIX: Only set loading to false AFTER all operations complete
      // This ensures bulk tasks wait for complete persistence before next iteration
      setLoading(false);

      // Auto-generate title if it's the first message
      const originalParentId = treeForAI.currentNodeId;
      if (!originalParentId) {
        let newTitle =
          userContent.slice(0, 30) + (userContent.length > 30 ? "..." : "");
        if (!newTitle && uploadedAttachments.length > 0) {
          newTitle = "Image Analysis";
        }
        if (newTitle || selectedModel !== session.model) {
          onUpdateSession(
            session.sessionId,
            newTitle || session.title,
            selectedModel
          );
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectEditMessage = async (
    nodeId: string,
    newContent: string,
    newAttachments?: ChatAttachment[]
  ) => {
    // CRITICAL: Initialize a local authoritative tree to track state synchronously
    // This avoids stale closures issues where DB save happens with old state
    const currentTree = JSON.parse(JSON.stringify(tree));
    const node = currentTree.nodes[nodeId];

    if (!node) return;

    // Get the immediate child node (first child - the direct AI response)
    const firstChildId = node.childrenIds[0];

    // Confirm destructive action if there is an immediate child
    if (firstChildId) {
      // Updated message to reflect that we try to preserve children now
      const confirmed = window.confirm(
        `This will regenerate the immediate AI response. Downstream messages will be preserved. Continue?`
      );
      if (!confirmed) return;
    }

    setLoading(true);

    try {
      // 1. Collect S3 asset keys from the immediate child node only
      const keysToDelete: string[] = [];

      // Collect keys from the immediate child only (not all descendants)
      if (firstChildId) {
        const childNode = currentTree.nodes[firstChildId];
        if (childNode?.attachments) {
          childNode.attachments.forEach((att: ChatAttachment) => {
            if (att.key) keysToDelete.push(att.key);
          });
        }
      }

      // If we're replacing attachments on the current node, delete old ones
      if (newAttachments && node.attachments) {
        node.attachments.forEach((att: ChatAttachment) => {
          if (att.key) keysToDelete.push(att.key);
        });
      }

      // 2. Delete assets from S3
      if (keysToDelete.length > 0) {
        try {
          await deleteSmartChatImages(userId, keysToDelete);
        } catch (e) {
          console.warn("Failed to delete images during direct edit", e);
        }
      }

      // 3. Update tree state locally
      // Update the target node content
      const currentNode = currentTree.nodes[nodeId];
      currentTree.nodes[nodeId] = {
        ...currentNode,
        content: newContent,
        updatedAt: Date.now(),
        attachments: newAttachments || currentNode.attachments,
      };

      // Update parent references if needed (maintain children order)
      if (currentNode.parentId && currentTree.nodes[currentNode.parentId]) {
        currentTree.nodes[currentNode.parentId] = {
          ...currentTree.nodes[currentNode.parentId],
          childrenIds: currentTree.nodes[currentNode.parentId].childrenIds.map(
            (id: string) => (id === nodeId ? nodeId : id)
          ),
        };
      }

      // Sync React State
      setTree(currentTree);

      // 4. Save the updated tree (Using the authoritative local variable)
      await saveSmartChatState(
        userId,
        session.sessionId,
        currentTree,
        newContent.slice(0, 50),
        undefined,
        selectedModel,
        selectedMoodboardId,
        thinkingSteps
      );

      // 5. If editing a user message, trigger AI regeneration
      if (node.role === "user") {
        // Prepare context using updated tree (currentTree)
        const thread = generateThread(nodeId, currentTree);
        const base64Images: string[] = [];

        // Convert attachments to base64 if needed
        if (node.attachments && node.attachments.length > 0) {
          for (const att of node.attachments) {
            try {
              let base64 = "";
              if (att.url && att.url.startsWith("data:")) {
                base64 = att.url;
              } else if (att.key) {
                const url = await getPresignedUrl(att.key);
                const imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(
                  url
                )}`;
                const res = await fetch(imageUrlToFetch);
                const blob = await res.blob();
                base64 = (await convertImageToWebPBase64(
                  new File([blob], "image.png", { type: blob.type })
                )) as string;
              }
              if (base64) base64Images.push(base64);
            } catch (e) {
              console.error("Failed to prepare image for regeneration", e);
            }
          }
        }

        const shouldInjectStyleInPrompt =
          imageMode && thinkingSteps >= 2 && !!activeStyle;
        const styleForSystem =
          imageMode && !shouldInjectStyleInPrompt ? activeStyle : undefined;
        const promptSuffix = shouldInjectStyleInPrompt
          ? `\n\nActive Visual Style Guideline:\n${activeStyle}`
          : "";

        const systemPrompt = constructSystemPrompt(
          getThreadHistoryForAI(thread.slice(0, -1)),
          imageMode,
          styleForSystem,
          imageMode ? imageSettings.maxImages : 0,
          imageMode ? imageSettings.useSamePrompt : false,
          imageMode ? imageSettings.forceNumberOfGen : false,
          imageSettings.fixedGenCount
        );

        const response = await callAIWithRefinement(
          systemPrompt,
          newContent + promptSuffix,
          selectedModel,
          IMAGE_TOOL_SCHEMA,
          base64Images.length > 0 ? base64Images : undefined
        );

        let aiContent = "";
        let prompts: string[] = [];

        if (typeof response === "string") {
          aiContent = response;
        } else if (typeof response === "object" && response !== null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const anyResp = response as any;
          if (
            typeof anyResp.chat === "string" ||
            Array.isArray(anyResp.images_prompt)
          ) {
            aiContent = anyResp.chat || "";
            let rawPrompts = Array.isArray(anyResp.images_prompt)
              ? anyResp.images_prompt
              : [];

            if (
              imageSettings.useSamePrompt &&
              !imageSettings.forceNumberOfGen &&
              rawPrompts.length > 1
            ) {
              rawPrompts = [rawPrompts[0]];
            }

            if (imageSettings.forceNumberOfGen) {
              const count =
                typeof imageSettings.fixedGenCount === "number"
                  ? imageSettings.fixedGenCount
                  : parseInt(String(imageSettings.fixedGenCount)) || 4;
              prompts = rawPrompts.slice(0, count);
            } else if (imageSettings.useSamePrompt && rawPrompts.length > 0) {
              const singlePrompt = rawPrompts[0];
              const count =
                typeof imageSettings.maxImages === "number"
                  ? imageSettings.maxImages
                  : parseInt(String(imageSettings.maxImages)) || 3;
              prompts = Array(count).fill(singlePrompt);
            } else {
              const maxCount =
                typeof imageSettings.maxImages === "number"
                  ? imageSettings.maxImages
                  : parseInt(String(imageSettings.maxImages)) || 3;
              prompts = rawPrompts.slice(0, maxCount);
            }
          } else if (anyResp.message) {
            aiContent = anyResp.message;
          } else {
            aiContent = JSON.stringify(response);
          }
        } else {
          aiContent = String(response);
        }

        // Create assistant node attachments
        const aiAttachments: ChatAttachment[] = prompts.map((p, i) => ({
          id: `loading-${Date.now()}-${i}`,
          type: "image",
          name: p,
          status: "loading",
          prompt: p,
        }));

        // Determine if we are updating an existing node or creating a new one
        let aiNode: ChatNode;
        // Use currentTree to check for existing child
        const existingChildId = currentTree.nodes[nodeId]?.childrenIds?.[0];
        const existingChild = existingChildId
          ? currentTree.nodes[existingChildId]
          : null;

        if (existingChild) {
          // Update existing node in-place to preserve grandchildren
          aiNode = {
            ...existingChild,
            content: aiContent,
            model: selectedModel,
            attachments: aiAttachments.length > 0 ? aiAttachments : undefined,
            updatedAt: Date.now(),
            childrenIds: existingChild.childrenIds || [], // Explicitly preserve children
          };
        } else {
          // No existing child, create new one
          aiNode = createNode(
            aiContent,
            "assistant",
            nodeId,
            selectedModel,
            aiAttachments.length > 0 ? aiAttachments : undefined
          );
        }

        // Update local authoritative tree
        if (!existingChild) {
          const currentEditedNode = currentTree.nodes[nodeId];
          if (currentEditedNode) {
            currentTree.nodes[nodeId] = {
              ...currentEditedNode,
              childrenIds: [aiNode.id, ...currentEditedNode.childrenIds],
            };
          }
        }

        // Save AI node to local tree
        currentTree.nodes[aiNode.id] = aiNode;

        // Correctly calculate targetId for view focus
        let targetId = aiNode.id;
        if (existingChild) {
          while (true) {
            const targetNode = currentTree.nodes[targetId];
            if (
              !targetNode ||
              !targetNode.childrenIds ||
              targetNode.childrenIds.length === 0
            )
              break;
            // Traverse down the most recent branch (last child)
            targetId =
              targetNode.childrenIds[targetNode.childrenIds.length - 1];
          }
        }
        currentTree.currentNodeId = targetId;

        // Sync React State
        setTree({ ...currentTree }); // Spread to ensure new reference for React

        // Generate images in parallel
        if (prompts.length > 0) {
          const imagePromises = prompts.map((p, i) =>
            generateImage(
              userId,
              session.sessionId,
              p,
              base64Images.length > 0 &&
                imageSettings.model === "models/gemini-3-pro-image-preview"
                ? base64Images[0]
                : undefined,
              {
                aspectRatio: imageSettings.aspectRatio,
                resolution: imageSettings.resolution,
                model: imageSettings.model,
              }
            )
              .then((gen) => {
                if (gen?.key) {
                  const newAttachment: ChatAttachment = {
                    id: aiAttachments[i].id,
                    type: "image",
                    key: gen.key,
                    name: p.slice(0, 50),
                    status: "complete",
                    prompt: p,
                  };
                  // Update local array ref
                  aiAttachments[i] = newAttachment;

                  // Update authoritative tree synchronously
                  const currentNode = currentTree.nodes[aiNode.id];
                  if (currentNode) {
                    const currentAttachments = currentNode.attachments || [];
                    const updatedAttachments = [...currentAttachments];
                    updatedAttachments[i] = newAttachment;
                    currentTree.nodes[aiNode.id] = {
                      ...currentNode,
                      attachments: updatedAttachments,
                    };
                    // Sync React State immediately for UI feedback
                    setTree({ ...currentTree });
                  }
                  return { success: true, index: i, attachment: newAttachment };
                }
                return { success: false, index: i };
              })
              .catch((e) => {
                console.error("Image generation failed", e);
                const failedAttachment: ChatAttachment = {
                  ...aiAttachments[i],
                  status: "failed",
                };
                // Update local array ref
                aiAttachments[i] = failedAttachment;

                // Update authoritative tree
                const currentNode = currentTree.nodes[aiNode.id];
                if (currentNode) {
                  const currentAttachments = currentNode.attachments || [];
                  const updatedAttachments = [...currentAttachments];
                  updatedAttachments[i] = failedAttachment;
                  currentTree.nodes[aiNode.id] = {
                    ...currentNode,
                    attachments: updatedAttachments,
                  };
                  // Sync React State
                  setTree({ ...currentTree });
                }
                return { success: false, index: i, error: e };
              })
          );

          await Promise.allSettled(imagePromises);

          // Final save with all attachments using the authoritative currentTree
          // currentTree has been updated by the promises above
          await saveSmartChatState(
            userId,
            session.sessionId,
            currentTree,
            aiContent.slice(0, 50),
            undefined,
            selectedModel,
            selectedMoodboardId,
            thinkingSteps
          );
        } else {
          // No images to wait for, save immediately
          await saveSmartChatState(
            userId,
            session.sessionId,
            currentTree,
            aiContent.slice(0, 50),
            undefined,
            selectedModel,
            selectedMoodboardId,
            thinkingSteps
          );
        }
      }
    } catch (error) {
      console.error("Direct edit failed:", error);
      alert("Failed to edit message");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMessage = async (nodeId: string, newContent: string) => {
    // Logic: Create a sibling of this node with new content.
    // If it's a User node, we typically want to re-run AI generation after it.

    const originalNode = tree.nodes[nodeId];
    if (!originalNode) return;

    // 1. Create new User Node (Sibling)
    // Ensure role is either "user" or "assistant" (not "system")
    const nodeRole =
      originalNode.role === "system"
        ? "user"
        : (originalNode.role as "user" | "assistant");

    // For edit, we currently only support text edit, preserving original attachments if any?
    // Or clear attachments? Let's preserve them for now if it's a user edit.
    const attachments = originalNode.attachments;

    const newNode = createNode(
      newContent,
      nodeRole,
      originalNode.parentId,
      originalNode.model,
      attachments
    );

    let newTree = { ...tree };
    newTree.nodes = { ...newTree.nodes };

    // Update parent to include new child
    if (newNode.parentId && newTree.nodes[newNode.parentId]) {
      const parent = newTree.nodes[newNode.parentId];
      newTree.nodes[newNode.parentId] = {
        ...parent,
        childrenIds: [...parent.childrenIds],
      };
      addNodeToTree(newNode, newTree);
    } else if (!newNode.parentId) {
      // Replacing root effectively (adding sibling root)
      addNodeToTree(newNode, newTree);
      // Note: Logic for multiple roots handled in `addNodeToTree` (it updates childrenIds of null? no).
      // If parentId is null, we don't have a parent node to update.
      // We just need to ensure we can switch to it.
      // `rootNodeId` in `tree` currently points to ONE root.
      // If we want multiple starts, we might need a "virtual root" or just swap `tree.rootNodeId`.
      // Let's assume we swap `tree.rootNodeId` if we edit the root.
      newTree.rootNodeId = newNode.id;
    }

    newTree.currentNodeId = newNode.id;
    setTree(newTree);

    // If it was a USER message, trigger AI response
    if (originalNode.role === "user") {
      setLoading(true);
      try {
        // Prepare context (history UP TO this new node)
        const thread = generateThread(newNode.id);

        const shouldInjectStyleInPrompt =
          imageMode && thinkingSteps >= 2 && !!activeStyle;
        const styleForSystem =
          imageMode && !shouldInjectStyleInPrompt ? activeStyle : undefined;
        const promptSuffix = shouldInjectStyleInPrompt
          ? `\n\nActive Visual Style Guideline:\n${activeStyle}`
          : "";

        const systemPrompt = constructSystemPrompt(
          getThreadHistoryForAI(thread.slice(0, -1)),
          imageMode,
          styleForSystem,
          imageMode ? imageSettings.maxImages : 0,
          imageMode ? imageSettings.useSamePrompt : false,
          imageMode ? imageSettings.forceNumberOfGen : false,
          imageSettings.fixedGenCount
        );

        // Note: For edited messages, re-sending images is tricky if we don't have the base64 anymore.
        // We only store the S3 URL in `attachments`.
        // AI Service expects base64 in `images` param.
        // If we want to support re-evaluating images, we'd need to fetch them from S3 or
        // pass image URLs to Gemini (Gemini Pro Vision supports URLs if using Vertex AI, but here we use API key).
        // The current `call_generate_content` expects base64.
        // LIMITATION: Editing a message with images won't re-send the images to AI, only the text history context.
        // We can inform the user or try to fetch blob. For now, we proceed with text only.

        const response = await callAIWithRefinement(
          systemPrompt,
          newContent + promptSuffix,
          selectedModel,
          undefined,
          // We only have access to attachment metadata (key/url) here, not the base64
          // So we cannot re-send the images to AI unless we re-download them or have stored base64
          // For now, pass undefined for images on edit.
          undefined
        );

        let aiContent = "";
        if (typeof response === "string") {
          aiContent = response;
        } else if (typeof response === "object" && response !== null) {
          if (response.message) {
            aiContent = response.message;
          } else {
            aiContent = JSON.stringify(response);
          }
        } else {
          aiContent = String(response);
        }

        const aiNode = createNode(
          aiContent,
          "assistant",
          newNode.id,
          selectedModel
        );

        // Add AI node
        newTree = { ...newTree };
        newTree.nodes = { ...newTree.nodes };
        newTree.nodes[newNode.id] = {
          ...newTree.nodes[newNode.id],
          childrenIds: [...newTree.nodes[newNode.id].childrenIds],
        };
        addNodeToTree(aiNode, newTree);
        newTree.currentNodeId = aiNode.id;
        setTree(newTree);

        // Save
        await saveSmartChatState(
          userId,
          session.sessionId,
          newTree,
          aiContent.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      } catch (e) {
        console.error("Failed to regenerate after edit", e);
      } finally {
        setLoading(false);
      }
    } else {
      // Editing Assistant message? Just save the edit (no re-gen)
      // Actually `editMessage` creates a NEW node, so we just save.
      await saveSmartChatState(
        userId,
        session.sessionId,
        newTree,
        newContent.slice(0, 50),
        undefined,
        selectedModel,
        selectedMoodboardId,
        thinkingSteps
      );
    }
  };

  const switchBranch = (nodeId: string, direction: "prev" | "next") => {
    const node = tree.nodes[nodeId];
    if (!node || !node.parentId) return;

    const parent = tree.nodes[node.parentId];
    if (!parent) return;

    const currentIndex = parent.childrenIds.indexOf(nodeId);
    if (currentIndex === -1) return;

    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0 || newIndex >= parent.childrenIds.length) return;

    const siblingId = parent.childrenIds[newIndex];

    // We need to find the "leaf" of this new branch to set as currentNodeId?
    // Or just set the sibling as current?
    // If we set sibling as current, we only see up to sibling.
    // Ideally, we want to restore the "last active leaf" of that branch.
    // But we don't track "last active leaf per branch".
    // So let's just find the *latest descendant* (deepest) of that sibling?
    // Or just set the sibling as current and let user scroll down?
    // Actually, if we switch to a node in the middle of history, the view should truncate there?
    // Yes, `generateThread` starts from `currentNodeId` up.
    // So if we set `currentNodeId = siblingId`, we see history ending at sibling.
    // But usually we want to see the *rest* of the conversation on that branch.
    // Let's try to find the deepest child of that sibling.

    let targetId = siblingId;
    while (true) {
      const targetNode = tree.nodes[targetId];
      if (!targetNode || targetNode.childrenIds.length === 0) break;
      // Prefer the last used child? or just the last created?
      // Let's take the last child in the array (most recent branch)
      targetId = targetNode.childrenIds[targetNode.childrenIds.length - 1];
    }

    setTree((prev) => ({ ...prev, currentNodeId: targetId }));
  };

  const handleDeleteMessage = async (nodeId: string) => {
    if (
      !confirm("Are you sure you want to delete this message and all replies?")
    )
      return;

    const toDeleteIds = new Set<string>();
    const stack = [nodeId];
    while (stack.length > 0) {
      const current = stack.pop();
      if (current) {
        toDeleteIds.add(current);
        const node = tree.nodes[current];
        if (node && node.childrenIds) {
          stack.push(...node.childrenIds);
        }
      }
    }

    const keysToDelete: string[] = [];
    toDeleteIds.forEach((id) => {
      const node = tree.nodes[id];
      if (node && node.attachments) {
        node.attachments.forEach((att) => {
          if (att.key) keysToDelete.push(att.key);
        });
      }
    });

    if (keysToDelete.length > 0) {
      try {
        await deleteSmartChatImages(userId, keysToDelete);
      } catch (e) {
        console.error("Failed to delete images", e);
      }
    }

    const newTree = { ...tree };
    newTree.nodes = { ...newTree.nodes };

    const nodeToDelete = newTree.nodes[nodeId];
    let parentIdToSelect = null;

    if (nodeToDelete && nodeToDelete.parentId) {
      const parent = newTree.nodes[nodeToDelete.parentId];
      if (parent) {
        parentIdToSelect = parent.id;
        newTree.nodes[parent.id] = {
          ...parent,
          childrenIds: parent.childrenIds.filter((id) => id !== nodeId),
        };
      }
    }

    toDeleteIds.forEach((id) => {
      delete newTree.nodes[id];
    });

    if (newTree.currentNodeId && !newTree.nodes[newTree.currentNodeId]) {
      if (parentIdToSelect && newTree.nodes[parentIdToSelect]) {
        newTree.currentNodeId = parentIdToSelect;
      } else if (newTree.rootNodeId === nodeId) {
        // Root deleted
        window.location.reload();
        return;
      }
    }

    setTree(newTree);
    await saveSmartChatState(
      userId,
      session.sessionId,
      newTree,
      "Deleted message",
      undefined,
      selectedModel,
      selectedMoodboardId,
      thinkingSteps
    );
  };

  const handleRegenerateImage = async (
    nodeId: string,
    attachmentIndex: number
  ) => {
    const node = tree.nodes[nodeId];
    if (
      !node ||
      !node.attachments ||
      !node.attachments[attachmentIndex] ||
      !node.parentId
    )
      return;

    const attachment = node.attachments[attachmentIndex];
    const prompt = attachment.prompt || attachment.name; // Fallback to name if prompt missing
    if (!prompt) {
      alert("Cannot regenerate image: Missing prompt");
      return;
    }

    if (
      !confirm(
        "This will delete the current image and generate a new one. Continue?"
      )
    )
      return;

    const parentId = node.parentId;
    const parentNode = tree.nodes[parentId];

    try {
      // 1. Prepare Base64 Reference Image (if any and model supports it)
      let referenceImageBase64 = undefined;
      if (
        imageSettings.model === "models/gemini-3-pro-image-preview" &&
        parentNode &&
        parentNode.attachments &&
        parentNode.attachments.length > 0
      ) {
        // Use the first user image as reference (simplification)
        const att = parentNode.attachments[0];
        try {
          if (att.url && att.url.startsWith("data:")) {
            referenceImageBase64 = att.url;
          } else if (att.key) {
            const url = await getPresignedUrl(att.key);
            const imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(
              url
            )}`;
            const res = await fetch(imageUrlToFetch);
            const blob = await res.blob();
            referenceImageBase64 = (await convertImageToWebPBase64(
              new File([blob], "ref.png", { type: blob.type })
            )) as string;
          }
        } catch (e) {
          console.error("Failed to fetch reference image", e);
        }
      }

      // 2. Delete Old Image
      if (attachment.key) {
        await deleteSmartChatImages(userId, [attachment.key]);
      }

      // 3. Update Status to Loading
      setTree((prev) => {
        const updated = { ...prev };
        updated.nodes = { ...updated.nodes };
        const currentNode = updated.nodes[nodeId];
        if (currentNode && currentNode.attachments) {
          const updatedAttachments = [...currentNode.attachments];
          updatedAttachments[attachmentIndex] = {
            ...updatedAttachments[attachmentIndex],
            status: "loading",
            key: undefined, // Clear key while loading
            url: undefined,
          };
          updated.nodes[nodeId] = {
            ...currentNode,
            attachments: updatedAttachments,
          };
        }
        return updated;
      });

      // 4. Generate New Image
      const gen = await generateImage(
        userId,
        session.sessionId,
        prompt,
        referenceImageBase64,
        {
          aspectRatio: imageSettings.aspectRatio,
          resolution: imageSettings.resolution,
          model: imageSettings.model,
        }
      );

      if (gen.key) {
        // Success
        setTree((prev) => {
          const updated = { ...prev };
          updated.nodes = { ...updated.nodes };
          const currentNode = updated.nodes[nodeId];
          if (currentNode && currentNode.attachments) {
            const updatedAttachments = [...currentNode.attachments];
            updatedAttachments[attachmentIndex] = {
              ...updatedAttachments[attachmentIndex],
              status: "complete",
              key: gen.key,
              prompt: prompt, // Preserve prompt
              name: prompt.slice(0, 50),
            };
            updated.nodes[nodeId] = {
              ...currentNode,
              attachments: updatedAttachments,
            };
          }
          return updated;
        });

        // Save State
        await saveSmartChatState(
          userId,
          session.sessionId,
          tree // Note: tree inside setTree might be fresher, but we usually sync.
          // Actually saving stale tree is risky.
          // Better to rely on React state update or fetch latest?
          // For now, let's construct the new tree object manually for save.
          // Wait, `tree` variable here is stale (closure).
          // We need the updated tree.
          // Let's modify a local clone and save that.
        );

        // Correct saving approach:
        const currentTree = tree; // Accessing current state closure?
        // Actually, we should use functional update pattern or just clone it here since we are inside the function.
        // We already updated state via setTree.
        // Let's create `finalTree` locally to save.

        const finalTree = { ...tree };
        finalTree.nodes = { ...finalTree.nodes };
        const finalNode = finalTree.nodes[nodeId];
        if (finalNode && finalNode.attachments) {
          const finalAttachments = [...finalNode.attachments];
          finalAttachments[attachmentIndex] = {
            ...finalAttachments[attachmentIndex],
            status: "complete",
            key: gen.key,
            prompt: prompt,
            name: prompt.slice(0, 50),
            url: undefined, // key is enough
          };
          finalTree.nodes[nodeId] = {
            ...finalNode,
            attachments: finalAttachments,
          };
        }

        await saveSmartChatState(
          userId,
          session.sessionId,
          finalTree,
          node.content.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      } else {
        throw new Error("Generation failed");
      }
    } catch (e) {
      console.error("Failed to regenerate image", e);
      // Revert to failed state
      setTree((prev) => {
        const updated = { ...prev };
        updated.nodes = { ...updated.nodes };
        const currentNode = updated.nodes[nodeId];
        if (currentNode && currentNode.attachments) {
          const updatedAttachments = [...currentNode.attachments];
          updatedAttachments[attachmentIndex] = {
            ...updatedAttachments[attachmentIndex],
            status: "failed",
          };
          updated.nodes[nodeId] = {
            ...currentNode,
            attachments: updatedAttachments,
          };
        }
        return updated;
      });
      alert("Failed to regenerate image");
    }
  };

  const handleRegenerate = async (nodeId: string) => {
    const node = tree.nodes[nodeId];
    if (!node) return;

    // Handle User Node Regeneration (Find response and regenerate it)
    if (node.role === "user") {
      // Find the child node that is in the current active thread
      // We need to be careful with 'tree.currentNodeId' as it might not include the branch we are clicking on if it's not active.
      // But typically we regenerate from active view.
      const currentThread = generateThread(tree.currentNodeId, tree);
      const nodeIndex = currentThread.findIndex((n) => n.id === nodeId);
      const childNode =
        nodeIndex !== -1 && nodeIndex < currentThread.length - 1
          ? currentThread[nodeIndex + 1]
          : null;

      if (childNode && childNode.role === "assistant") {
        await handleRegenerate(childNode.id);
        return;
      }

      // If no response exists (e.g. leaf node), trigger generation
      // We check if it is indeed a leaf in the current thread context
      if (tree.currentNodeId === nodeId) {
        if (!confirm("Generate a response for this message?")) return;

        setLoading(true);
        try {
          // 1. Prepare User Context
          const userContent = node.content;
          const base64Images: string[] = [];

          if (node.attachments && node.attachments.length > 0) {
            for (const att of node.attachments) {
              try {
                let base64 = "";
                if (att.url && att.url.startsWith("data:")) {
                  base64 = att.url;
                } else if (att.key) {
                  const url = await getPresignedUrl(att.key);
                  const imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(
                    url
                  )}`;
                  const res = await fetch(imageUrlToFetch);
                  const blob = await res.blob();
                  base64 = (await convertImageToWebPBase64(
                    new File([blob], "image.png", { type: blob.type })
                  )) as string;
                }
                if (base64) base64Images.push(base64);
              } catch (e) {
                console.error("Failed to prepare image", e);
              }
            }
          }

          // 2. Call AI
          const thread = generateThread(nodeId, tree);

          const shouldInjectStyleInPrompt =
            imageMode && thinkingSteps >= 2 && !!activeStyle;
          const styleForSystem =
            imageMode && !shouldInjectStyleInPrompt ? activeStyle : undefined;
          const promptSuffix = shouldInjectStyleInPrompt
            ? `\n\nActive Visual Style Guideline:\n${activeStyle}`
            : "";

          const systemPrompt = constructSystemPrompt(
            getThreadHistoryForAI(thread.slice(0, -1)),
            imageMode,
            styleForSystem,
            imageMode ? imageSettings.maxImages : 0,
            imageMode ? imageSettings.useSamePrompt : false,
            imageMode ? imageSettings.forceNumberOfGen : false,
            imageSettings.fixedGenCount
          );

          const response = await callAIWithRefinement(
            systemPrompt,
            userContent + promptSuffix,
            selectedModel,
            IMAGE_TOOL_SCHEMA,
            base64Images.length > 0 ? base64Images : undefined
          );

          let aiContent = "";
          let prompts: string[] = [];

          if (typeof response === "string") {
            aiContent = response;
          } else if (typeof response === "object" && response !== null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const anyResp = response as any;
            if (
              typeof anyResp.chat === "string" ||
              Array.isArray(anyResp.images_prompt)
            ) {
              aiContent = anyResp.chat || "";
              let rawPrompts = Array.isArray(anyResp.images_prompt)
                ? anyResp.images_prompt
                : [];

              if (
                imageSettings.useSamePrompt &&
                !imageSettings.forceNumberOfGen &&
                rawPrompts.length > 1
              ) {
                rawPrompts = [rawPrompts[0]];
              }

              if (imageSettings.forceNumberOfGen) {
                prompts = rawPrompts.slice(0, imageSettings.fixedGenCount);
              } else if (imageSettings.useSamePrompt && rawPrompts.length > 0) {
                const singlePrompt = rawPrompts[0];
                prompts = Array(imageSettings.maxImages).fill(singlePrompt);
              } else {
                prompts = rawPrompts.slice(0, imageSettings.maxImages);
              }
            } else if (anyResp.message) {
              aiContent = anyResp.message;
            } else {
              aiContent = JSON.stringify(response);
            }
          } else {
            aiContent = String(response);
          }

          // 3. Create Assistant Node
          const aiAttachments: ChatAttachment[] = prompts.map((p, i) => ({
            id: `loading-${Date.now()}-${i}`,
            type: "image",
            name: p,
            status: "loading",
            prompt: p,
          }));

          const aiNode = createNode(
            aiContent,
            "assistant",
            nodeId,
            selectedModel,
            aiAttachments.length > 0 ? aiAttachments : undefined
          );

          // Use local authoritative tree
          // We must ensure 'currentTree' is fresh for this operation
          // But 'tree' is stale inside async function.
          // Wait, 'tree' (component state) is stale, but we need the latest state.
          // Since we are adding a NEW node to an existing node, we can construct the new state from 'tree' (closure) + new node?
          // NO, 'tree' closure might be old if multiple ops happened.
          // Ideally we use a fresh copy. But we are inside an async callback.
          // For simplicity in this function context (user clicked regenerate), we assume 'tree' was fresh at start of handleRegenerate.
          // Let's create a local mutable copy similar to handleDirectEditMessage.
          const currentTree = JSON.parse(JSON.stringify(tree));

          // Update parent (User Node)
          const parentNodeToUpdate = currentTree.nodes[nodeId];
          if (parentNodeToUpdate) {
            currentTree.nodes[nodeId] = {
              ...parentNodeToUpdate,
              childrenIds: [...parentNodeToUpdate.childrenIds],
            };
          }

          // Add AI node
          addNodeToTree(aiNode, currentTree);
          currentTree.currentNodeId = aiNode.id;

          // Sync React State
          setTree(currentTree);

          // 4. Generate Images
          if (prompts.length > 0) {
            const imagePromises = prompts.map(async (p, i) => {
              try {
                const gen = await generateImage(
                  userId,
                  session.sessionId,
                  p,
                  base64Images.length > 0 &&
                    imageSettings.model === "models/gemini-3-pro-image-preview"
                    ? base64Images[0]
                    : undefined,
                  {
                    aspectRatio: imageSettings.aspectRatio,
                    resolution: imageSettings.resolution,
                    model: imageSettings.model,
                  }
                );

                if (gen?.key) {
                  const newAttachment: ChatAttachment = {
                    id: aiAttachments[i].id,
                    type: "image",
                    key: gen.key,
                    name: p.slice(0, 50),
                    status: "complete",
                    prompt: p,
                  };
                  // Update local array ref
                  aiAttachments[i] = newAttachment;

                  // Update authoritative tree synchronously
                  const currentNode = currentTree.nodes[aiNode.id];
                  if (currentNode) {
                    const currentAttachments = currentNode.attachments || [];
                    const updatedAttachments = [...currentAttachments];
                    updatedAttachments[i] = newAttachment;
                    currentTree.nodes[aiNode.id] = {
                      ...currentNode,
                      attachments: updatedAttachments,
                    };
                    // Sync React State
                    setTree({ ...currentTree });
                  }
                  return { success: true, index: i, attachment: newAttachment };
                }
                throw new Error("Generation failed - no key");
              } catch (e) {
                console.error("Image generation failed", e);
                const failedAttachment: ChatAttachment = {
                  ...aiAttachments[i],
                  status: "failed",
                };
                aiAttachments[i] = failedAttachment;

                const currentNode = currentTree.nodes[aiNode.id];
                if (currentNode) {
                  const currentAttachments = currentNode.attachments || [];
                  const updatedAttachments = [...currentAttachments];
                  updatedAttachments[i] = failedAttachment;
                  currentTree.nodes[aiNode.id] = {
                    ...currentNode,
                    attachments: updatedAttachments,
                  };
                  setTree({ ...currentTree });
                }
                return { success: false, index: i, error: e };
              }
            });

            await Promise.allSettled(imagePromises);

            await saveSmartChatState(
              userId,
              session.sessionId,
              currentTree,
              aiContent.slice(0, 50),
              undefined,
              selectedModel,
              selectedMoodboardId,
              thinkingSteps
            );
          } else {
            await saveSmartChatState(
              userId,
              session.sessionId,
              currentTree,
              aiContent.slice(0, 50),
              undefined,
              selectedModel,
              selectedMoodboardId,
              thinkingSteps
            );
          }
        } catch (e) {
          console.error("Failed to generate response", e);
          alert("Failed to generate response");
        } finally {
          setLoading(false);
        }
      }
      return;
    }

    // Handle Assistant Node Regeneration (Update in-place to preserve children)
    if (node.role !== "assistant" || !node.parentId) return;

    if (
      !confirm(
        "This will regenerate the response. Downstream messages (if any) will be preserved but might need context update. Continue?"
      )
    )
      return;

    const parentId = node.parentId;
    const parentNode = tree.nodes[parentId];
    if (!parentNode) return;

    setLoading(true);

    try {
      // 1. Prepare User Context (Content & Images)
      const userContent = parentNode.content;
      const base64Images: string[] = [];

      // Fetch/Convert images from parent node if any
      if (parentNode.attachments && parentNode.attachments.length > 0) {
        for (const att of parentNode.attachments) {
          try {
            let base64 = "";
            if (att.url && att.url.startsWith("data:")) {
              base64 = att.url;
            } else if (att.key) {
              // Fetch from S3
              const url = await getPresignedUrl(att.key);
              // Use proxy to fetch
              const imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(
                url
              )}`;
              const res = await fetch(imageUrlToFetch);
              const blob = await res.blob();
              base64 = (await convertImageToWebPBase64(
                new File([blob], "image.png", { type: blob.type })
              )) as string;
            }

            if (base64) {
              base64Images.push(base64);
            }
          } catch (e) {
            console.error("Failed to prepare image for regeneration", e);
          }
        }
      }

      // 2. Delete OLD Attachments resources (cleanup S3)
      const keysToDelete: string[] = [];
      if (node.attachments) {
        node.attachments.forEach((att) => {
          if (att.key) keysToDelete.push(att.key);
        });
      }

      if (keysToDelete.length > 0) {
        await deleteSmartChatImages(userId, keysToDelete);
      }

      // Use local authoritative tree
      const currentTree = JSON.parse(JSON.stringify(tree));

      // 3. Call AI
      // NOTE: We use parentId to get thread history UP TO the user message (excluding the node being regenerated)
      const thread = generateThread(parentId, currentTree);

      const shouldInjectStyleInPrompt =
        imageMode && thinkingSteps >= 2 && !!activeStyle;
      const styleForSystem =
        imageMode && !shouldInjectStyleInPrompt ? activeStyle : undefined;
      const promptSuffix = shouldInjectStyleInPrompt
        ? `\n\nActive Visual Style Guideline:\n${activeStyle}`
        : "";

      const systemPrompt = constructSystemPrompt(
        getThreadHistoryForAI(thread.slice(0, -1)),
        imageMode,
        styleForSystem,
        imageMode ? imageSettings.maxImages : 0,
        imageMode ? imageSettings.useSamePrompt : false,
        imageMode ? imageSettings.forceNumberOfGen : false,
        imageSettings.fixedGenCount
      );

      const response = await callAIWithRefinement(
        systemPrompt,
        userContent + promptSuffix,
        selectedModel,
        IMAGE_TOOL_SCHEMA,
        base64Images.length > 0 ? base64Images : undefined
      );

      let aiContent = "";
      let prompts: string[] = [];

      if (typeof response === "string") {
        aiContent = response;
      } else if (typeof response === "object" && response !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyResp = response as any;
        if (
          typeof anyResp.chat === "string" ||
          Array.isArray(anyResp.images_prompt)
        ) {
          aiContent = anyResp.chat || "";
          let rawPrompts = Array.isArray(anyResp.images_prompt)
            ? anyResp.images_prompt
            : [];

          if (
            imageSettings.useSamePrompt &&
            !imageSettings.forceNumberOfGen &&
            rawPrompts.length > 1
          ) {
            console.warn(
              "[useSamePrompt][HandleRegenerate] AI returned multiple prompts. Forcing first prompt only:",
              rawPrompts[0]
            );
            rawPrompts = [rawPrompts[0]];
          }

          if (imageSettings.forceNumberOfGen) {
            const count =
              typeof imageSettings.fixedGenCount === "number"
                ? imageSettings.fixedGenCount
                : parseInt(String(imageSettings.fixedGenCount)) || 4;
            prompts = rawPrompts.slice(0, count);
            console.log(
              "[forceNumberOfGen] Using fixed count:",
              count,
              "images"
            );
          } else if (imageSettings.useSamePrompt && rawPrompts.length > 0) {
            const singlePrompt = rawPrompts[0];
            const count =
              typeof imageSettings.maxImages === "number"
                ? imageSettings.maxImages
                : parseInt(String(imageSettings.maxImages)) || 3;
            prompts = Array(count).fill(singlePrompt);
            console.log(
              "[useSamePrompt] Duplicating prompt:",
              singlePrompt,
              "to",
              count,
              "images"
            );
            console.log("[useSamePrompt] Final prompts array:", prompts);
          } else {
            const maxCount =
              typeof imageSettings.maxImages === "number"
                ? imageSettings.maxImages
                : parseInt(String(imageSettings.maxImages)) || 3;
            prompts = rawPrompts.slice(0, maxCount);
          }
        } else if (anyResp.message) {
          aiContent = anyResp.message;
        } else {
          aiContent = JSON.stringify(response);
        }
      } else {
        aiContent = String(response);
      }

      // 4. Update Existing Assistant Node (In-Place)
      const aiAttachments: ChatAttachment[] = prompts.map((p, i) => ({
        id: `loading-${Date.now()}-${i}`,
        type: "image",
        name: p,
        status: "loading",
        prompt: p,
      }));

      // Update the node in currentTree
      if (currentTree.nodes[nodeId]) {
        currentTree.nodes[nodeId] = {
          ...currentTree.nodes[nodeId],
          content: aiContent,
          model: selectedModel,
          attachments: aiAttachments.length > 0 ? aiAttachments : undefined,
          updatedAt: Date.now(),
          // Preserve childrenIds
          childrenIds: currentTree.nodes[nodeId].childrenIds,
        };
      }

      // Sync React State
      // Note: We do NOT change currentNodeId. If the user was viewing a descendant, they stay there.
      // If they were viewing this node, they see the update.
      setTree(currentTree);

      // 5. Generate Images if needed
      if (prompts.length > 0) {
        const imagePromises = prompts.map((p, i) =>
          generateImage(
            userId,
            session.sessionId,
            p,
            base64Images.length > 0 &&
              imageSettings.model === "models/gemini-3-pro-image-preview"
              ? base64Images[0]
              : undefined,
            {
              aspectRatio: imageSettings.aspectRatio,
              resolution: imageSettings.resolution,
              model: imageSettings.model,
            }
          )
            .then((gen) => {
              if (gen?.key) {
                const newAttachment: ChatAttachment = {
                  id: aiAttachments[i].id,
                  type: "image",
                  key: gen.key,
                  name: p.slice(0, 50),
                  status: "complete",
                  prompt: p,
                };
                // Update local array ref
                aiAttachments[i] = newAttachment;

                // Update authoritative tree synchronously
                const currentNode = currentTree.nodes[nodeId];
                if (currentNode) {
                  const currentAttachments = currentNode.attachments || [];
                  const updatedAttachments = [...currentAttachments];
                  updatedAttachments[i] = newAttachment;
                  currentTree.nodes[nodeId] = {
                    ...currentNode,
                    attachments: updatedAttachments,
                  };
                  // Sync React State
                  setTree({ ...currentTree });
                }
                return { success: true, index: i, attachment: newAttachment };
              }
              return { success: false, index: i };
            })
            .catch((e) => {
              console.error("Image generation failed", e);
              const failedAttachment: ChatAttachment = {
                ...aiAttachments[i],
                status: "failed",
              };
              aiAttachments[i] = failedAttachment;

              const currentNode = currentTree.nodes[nodeId];
              if (currentNode) {
                const currentAttachments = currentNode.attachments || [];
                const updatedAttachments = [...currentAttachments];
                updatedAttachments[i] = failedAttachment;
                currentTree.nodes[nodeId] = {
                  ...currentNode,
                  attachments: updatedAttachments,
                };
                setTree({ ...currentTree });
              }
              return { success: false, index: i, error: e };
            })
        );

        await Promise.allSettled(imagePromises);

        // Final Save using authoritative tree
        await saveSmartChatState(
          userId,
          session.sessionId,
          currentTree,
          aiContent.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      } else {
        await saveSmartChatState(
          userId,
          session.sessionId,
          currentTree,
          aiContent.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      }
    } catch (e) {
      console.error("Regeneration failed", e);
      alert("Failed to regenerate response");
    } finally {
      setLoading(false);
    }
  };

  const handleIncludeImage = async (attachment: ChatAttachment) => {
    try {
      let url = attachment.url;
      // Resolve presigned URL if we only have a key
      if (attachment.key && !url?.startsWith("data:")) {
        url = await getPresignedUrl(attachment.key);
      }

      if (!url) {
        console.error("No URL found for attachment");
        return;
      }

      // Use proxy if it's a remote URL to avoid CORS when fetching blob
      let imageUrlToFetch = url;
      if (!url.startsWith("data:")) {
        imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      }

      const response = await fetch(imageUrlToFetch);
      const blob = await response.blob();

      // Create a File object
      const fileName = attachment.name || `included-image-${Date.now()}.png`;
      const file = new File([blob], fileName, { type: blob.type });

      // Create preview URL
      const preview = URL.createObjectURL(file);

      setPendingAttachments((prev) => [
        ...prev,
        { file, preview, pinned: false },
      ]);
    } catch (e) {
      console.error("Failed to include image", e);
      alert("Failed to include image");
    }
  };

  // --- Render ---

  const thread = generateThread(tree.currentNodeId);

  return (
    <div
      className="flex flex-col h-full bg-white relative overflow-hidden"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-indigo-500/10 backdrop-blur-sm border-2 border-indigo-500 border-dashed rounded-lg m-4 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-3">
              <ImageIcon className="w-12 h-12 text-indigo-500" />
              <p className="font-bold text-lg text-indigo-600">
                Drop images here
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-6 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <GitBranch className="text-purple-600" />
          <div>
            <h2 className="font-bold text-lg leading-none">
              {session.title || "Smart Chat"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {thread.length} messages • Branching enabled
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSelectionMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
              isSelectionMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Select Images"
          >
            <CheckSquare size={18} />
            <span className="hidden sm:inline">
              {isSelectionMode ? "Selection Mode" : "Select Images"}
            </span>
            {!isSelectionMode && getTotalSelectedCount() > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                {getTotalSelectedCount()}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowBulkTaskModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
            title="Create Bulk Task"
          >
            <Layers size={18} />
            <span className="hidden sm:inline">Create Bulk Task</span>
          </button>
        </div>
      </div>

      {/* Selection Toolbar */}
      <AnimatePresence>
        {isSelectionMode && (
          <SelectionToolbar
            selectedCount={getTotalSelectedCount()}
            onDownload={handleDownloadSelected}
            onClear={clearAllSelections}
            onSelectAll={selectAllImages}
            onExit={toggleSelectionMode}
            downloadProgress={downloadProgress}
          />
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white relative">
        <div className="pb-40">
          <AnimatePresence initial={false} mode="popLayout">
            {thread.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-400"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <GitBranch size={32} className="opacity-50" />
                </div>
                <h3 className="font-bold text-gray-700">Start a new thread</h3>
                <p className="max-w-xs mx-auto mt-2 text-sm">
                  Messages are stored in a tree structure. You can edit any
                  message to create a new alternate timeline.
                </p>
                <p className="mt-4 text-xs text-gray-400">
                  Tip: Drag & drop images to chat with them.
                </p>
              </motion.div>
            ) : (
              thread.map((node, index) => {
                // Calculate sibling info
                let siblingCount = 1;
                let currentSiblingIndex = 0;
                let referencedAttachments: ChatAttachment[] | undefined;

                if (node.parentId && tree.nodes[node.parentId]) {
                  const parent = tree.nodes[node.parentId];
                  siblingCount = parent.childrenIds.length;
                  currentSiblingIndex = parent.childrenIds.indexOf(node.id);
                  if (parent.role === "user" && parent.attachments?.length) {
                    referencedAttachments = parent.attachments;
                  }
                } else if (!node.parentId) {
                  // Root node logic
                }

                return (
                  <ChatMessage
                    key={node.id}
                    node={node}
                    isLeaf={index === thread.length - 1}
                    siblingCount={siblingCount}
                    currentSiblingIndex={currentSiblingIndex}
                    referenceAttachments={referencedAttachments}
                    onPrevSibling={() => switchBranch(node.id, "prev")}
                    onNextSibling={() => switchBranch(node.id, "next")}
                    onEdit={(newContent) =>
                      handleEditMessage(node.id, newContent)
                    }
                    onDirectEdit={(newContent) =>
                      handleDirectEditMessage(node.id, newContent)
                    }
                    onImageClick={setViewingImage}
                    onDelete={() => handleDeleteMessage(node.id)}
                    onRegenerate={() => handleRegenerate(node.id)}
                    onRegenerateImage={(attIndex) =>
                      handleRegenerateImage(node.id, attIndex)
                    }
                    onIncludeImage={handleIncludeImage}
                    isSelectionMode={isSelectionMode}
                    selectedAttachments={selectedImages.get(node.id)}
                    onToggleImageSelection={(attIndex) =>
                      toggleImageSelection(node.id, attIndex)
                    }
                  />
                );
              })
            )}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-6 max-w-3xl mx-auto flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Loader2 size={16} className="animate-spin text-white" />
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 shadow-sm">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none transition-all duration-300">
        <div className="max-w-3xl mx-auto relative flex flex-col gap-3 pointer-events-auto">
          <>
            {/* Attachments Preview */}
            <AnimatePresence>
              {pendingAttachments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2 overflow-x-auto p-2"
                >
                  {pendingAttachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="relative group shrink-0 w-20 h-20"
                    >
                      <Image
                        src={att.preview}
                        alt="preview"
                        fill
                        className={`object-cover rounded-lg border shadow-sm ${
                          att.pinned
                            ? "border-indigo-500 ring-2 ring-indigo-200"
                            : "border-gray-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={(e) => togglePinAttachment(idx, e)}
                        className={`absolute -top-1.5 -left-1.5 rounded-full p-1.5 shadow-md transition-colors z-20 ${
                          att.pinned
                            ? "bg-indigo-500 text-white hover:bg-indigo-600"
                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                        }`}
                        title={att.pinned ? "Unpin image" : "Pin image"}
                      >
                        {att.pinned ? <Pin size={12} /> : <PinOff size={12} />}
                      </button>
                      <button
                        onClick={() => removeAttachment(idx)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-20"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  pendingAttachments.length > 0
                    ? "Ask about these images..."
                    : "Type a message..."
                }
                className={`w-full bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl pl-4 pr-20 pt-4 shadow-lg focus:bg-white focus:border-black/20 focus:ring-4 focus:ring-gray-100 outline-none resize-none transition-all ${
                  imageMode ? "pb-12 min-h-[100px]" : "pb-4 min-h-[60px]"
                } max-h-[300px]`}
                disabled={loading}
                autoFocus
              />

              <div
                className={`absolute left-3 bottom-3 flex items-center gap-2 max-w-[calc(100%-120px)] overflow-x-auto no-scrollbar pb-0.5 transition-all ${
                  !imageMode ? "opacity-30 hover:opacity-100" : ""
                }`}
              >
                {/* Image Mode Toggle */}
                <button
                  onClick={toggleImageMode}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-medium transition-colors border rounded-lg ${
                    imageMode
                      ? "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200 px-2.5 py-1.5"
                      : "bg-transparent text-gray-400 border-transparent hover:bg-gray-100 p-1"
                  }`}
                  title={imageMode ? "Image Mode: ON" : "Image Mode: OFF"}
                >
                  <ImageIcon size={imageMode ? 14 : 18} />
                  {imageMode && (
                    <span className="hidden sm:inline">Img On</span>
                  )}
                </button>

                {imageMode && (
                  <>
                    {/* Model Selector */}
                    <div className="relative shrink-0">
                      <select
                        value={selectedModel}
                        onChange={handleModelChange}
                        className="appearance-none bg-gray-100 hover:bg-gray-200 text-[10px] font-bold px-2 py-1.5 rounded-lg pr-6 cursor-pointer transition-colors border border-transparent hover:border-black/5 uppercase tracking-tight"
                      >
                        {AVAILABLE_MODELS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={10}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                      />
                    </div>

                    {/* Thinking Steps */}
                    <div className="relative shrink-0" title="Thinking Steps">
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          value={thinkingSteps}
                          onChange={(e) =>
                            setThinkingSteps(
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                          className="w-14 bg-gray-100 hover:bg-gray-200 text-xs font-bold px-2 py-1.5 rounded-lg pl-6 outline-none transition-colors border border-transparent hover:border-black/5"
                        />
                        <Brain
                          size={12}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                        />
                      </div>
                    </div>

                    {/* Style Selector */}
                    {availableMoodboards && availableMoodboards.length > 0 && (
                      <div className="relative shrink-0" title="Visual Style">
                        <select
                          value={selectedMoodboardId}
                          onChange={(e) =>
                            setSelectedMoodboardId(e.target.value)
                          }
                          className="appearance-none bg-gray-100 hover:bg-gray-200 text-[10px] font-bold px-2 py-1.5 rounded-lg pl-6 pr-5 cursor-pointer transition-colors border border-transparent hover:border-black/5 max-w-[100px] truncate"
                        >
                          <option value="">Style</option>
                          {availableMoodboards.map((m) => (
                            <option key={m.sessionId} value={m.sessionId}>
                              {m.title}
                            </option>
                          ))}
                        </select>
                        <Palette
                          size={12}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                        />
                        <ChevronDown
                          size={10}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                        />
                      </div>
                    )}

                    {/* Prefix Prompt Button */}
                    <button
                      onClick={() => setShowPrefixModal(true)}
                      className={`shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors border ${
                        promptPrefix
                          ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
                      }`}
                      title={promptPrefix || "Set Prefix Prompt"}
                    >
                      PRE{promptPrefix ? " ✓" : ""}
                    </button>

                    {/* Suffix Prompt Button */}
                    <button
                      onClick={() => setShowSuffixModal(true)}
                      className={`shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors border ${
                        promptSuffix
                          ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                          : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
                      }`}
                      title={promptSuffix || "Set Suffix Prompt"}
                    >
                      SUF{promptSuffix ? " ✓" : ""}
                    </button>
                  </>
                )}
              </div>

              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                {imageMode && (
                  <div className="relative">
                    <button
                      onClick={() => setShowImageSettings(!showImageSettings)}
                      className={`p-2 rounded-xl transition-all ${
                        showImageSettings
                          ? "bg-gray-100 text-black"
                          : "text-gray-400 hover:text-black hover:bg-gray-100"
                      }`}
                      title="Image Generation Settings"
                    >
                      <SlidersHorizontal size={18} />
                    </button>
                    <AnimatePresence>
                      {showImageSettings && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-20 flex flex-col gap-3"
                        >
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">
                              Model
                            </label>
                            <select
                              value={imageSettings.model}
                              onChange={(e) =>
                                handleImageSettingChange(
                                  "model",
                                  e.target.value
                                )
                              }
                              className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                            >
                              {AVAILABLE_IMAGE_MODELS.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">
                              Aspect Ratio
                            </label>
                            <select
                              value={imageSettings.aspectRatio}
                              onChange={(e) =>
                                handleImageSettingChange(
                                  "aspectRatio",
                                  e.target.value
                                )
                              }
                              className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                            >
                              <option value="1:1">1:1 (Square)</option>
                              <option value="9:16">9:16 (Portrait)</option>
                              <option value="16:9">16:9 (Widescreen)</option>
                              <option value="3:4">3:4 (Vertical)</option>
                              <option value="4:3">4:3 (Standard)</option>
                              <option value="3:2">3:2 (Landscape)</option>
                              <option value="2:3">2:3 (Portrait)</option>
                              <option value="Auto">Auto</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">
                              Resolution
                            </label>
                            <select
                              value={imageSettings.resolution}
                              onChange={(e) =>
                                handleImageSettingChange(
                                  "resolution",
                                  e.target.value
                                )
                              }
                              className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                            >
                              <option value="1K">1K</option>
                              <option value="2K">2K</option>
                              <option value="4K">4K</option>
                            </select>
                          </div>

                          <div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={imageSettings.forceNumberOfGen}
                                onChange={(e) =>
                                  handleImageSettingChange(
                                    "forceNumberOfGen",
                                    e.target.checked
                                  )
                                }
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                              <span className="text-xs font-semibold text-gray-700">
                                Force Number of Gen
                              </span>
                            </label>
                            <p className="text-[10px] text-gray-400 mt-1 ml-6">
                              Generate exactly N images
                            </p>
                          </div>

                          {imageSettings.forceNumberOfGen ? (
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Fixed Gen Count
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={imageSettings.fixedGenCount ?? 4}
                                onChange={(e) =>
                                  handleImageSettingChange(
                                    "fixedGenCount",
                                    parseInt(e.target.value) || 4
                                  )
                                }
                                className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Max Images
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={imageSettings.maxImages ?? 3}
                                onChange={(e) =>
                                  handleImageSettingChange(
                                    "maxImages",
                                    parseInt(e.target.value) || 3
                                  )
                                }
                                className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                              />
                            </div>
                          )}

                          <div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={imageSettings.useSamePrompt}
                                onChange={(e) =>
                                  handleImageSettingChange(
                                    "useSamePrompt",
                                    e.target.checked
                                  )
                                }
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                              <span className="text-xs text-gray-700">
                                Use same prompt
                              </span>
                            </label>
                            <p className="text-[10px] text-gray-400 mt-1 ml-6">
                              Generate multiple variations from one prompt
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {imageMode && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={
                      imageSettings.model !==
                      "models/gemini-3-pro-image-preview"
                    }
                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title={
                      imageSettings.model !==
                      "models/gemini-3-pro-image-preview"
                        ? "Image reference only available with Gemini 3 Pro model"
                        : "Attach Image"
                    }
                  >
                    <ImageIcon size={18} />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileInput}
                    />
                  </button>
                )}

                <button
                  onClick={() => handleSendMessage()}
                  disabled={
                    (!input.trim() && pendingAttachments.length === 0) ||
                    loading
                  }
                  className="p-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black transition-all"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </>
        </div>
        <div className="text-center mt-2 text-[10px] text-gray-400">
          Press Enter to send • Shift + Enter for new line
          {imageMode &&
          imageSettings.model === "models/gemini-3-pro-image-preview"
            ? " • Drag & Drop images"
            : ""}
        </div>
      </div>

      <AnimatePresence>
        {viewingImage && (
          <ImageViewer
            attachment={viewingImage}
            onClose={() => setViewingImage(null)}
          />
        )}
      </AnimatePresence>

      {/* Prefix Prompt Modal */}
      <AnimatePresence>
        {showPrefixModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPrefixModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Set Prefix Prompt</h3>
              <p className="text-sm text-gray-600 mb-4">
                This text will be automatically added at the beginning of every
                prompt you send.
              </p>
              <textarea
                value={promptPrefix}
                onChange={(e) => setPromptPrefix(e.target.value)}
                placeholder="e.g., You are a professional designer..."
                className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black/20 focus:ring-4 focus:ring-gray-100 resize-none min-h-[100px]"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    localStorage.setItem("smartChatPromptPrefix", promptPrefix);
                    setShowPrefixModal(false);
                  }}
                  className="flex-1 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setPromptPrefix("");
                    localStorage.removeItem("smartChatPromptPrefix");
                    setShowPrefixModal(false);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-2 font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowPrefixModal(false)}
                  className="px-4 bg-gray-100 text-gray-700 rounded-lg py-2 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suffix Prompt Modal */}
      <AnimatePresence>
        {showSuffixModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSuffixModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Set Suffix Prompt</h3>
              <p className="text-sm text-gray-600 mb-4">
                This text will be automatically added at the end of every prompt
                you send.
              </p>
              <textarea
                value={promptSuffix}
                onChange={(e) => setPromptSuffix(e.target.value)}
                placeholder="e.g., Please be concise and professional..."
                className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-black/20 focus:ring-4 focus:ring-gray-100 resize-none min-h-[100px]"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    localStorage.setItem("smartChatPromptSuffix", promptSuffix);
                    setShowSuffixModal(false);
                  }}
                  className="flex-1 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setPromptSuffix("");
                    localStorage.removeItem("smartChatPromptSuffix");
                    setShowSuffixModal(false);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 rounded-lg py-2 font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowSuffixModal(false)}
                  className="px-4 bg-gray-100 text-gray-700 rounded-lg py-2 font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Progress Bar for Bulk Tasks */}
      <AnimatePresence>
        {bulkProgress && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 shadow-2xl rounded-xl p-5 w-80"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Bulk Execution
                </h3>
                <p className="text-xs text-gray-500">
                  Processing task {bulkProgress.current} of {bulkProgress.total}
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {Math.round((bulkProgress.current / bulkProgress.total) * 100)}%
              </div>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (bulkProgress.current / bulkProgress.total) * 100
                  }%`,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            <button
              onClick={() => {
                cancelBulkRef.current = true;
              }}
              className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg text-xs font-bold transition-all border border-red-100 uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <X size={14} />
              Stop Execution
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Task Modal */}
      <BulkTaskModal
        isOpen={showBulkTaskModal}
        onClose={() => setShowBulkTaskModal(false)}
        onStart={async (prompts: string[], delay: number) => {
          if (prompts.length === 0) return;

          cancelBulkRef.current = false;
          setBulkDelay(delay);
          setBulkQueue(prompts);
          setIsProcessingQueue(true);
          // Initial progress
          setBulkProgress({ current: 1, total: prompts.length });
        }}
      />
    </div>
  );
}
