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
  AlertTriangle,
  Check,
  Brush,
  Upload,
} from "lucide-react";
import JSZip from "jszip";
import {
  ChatTree,
  ChatNode,
  ChatSessionMetadata,
  ChatAttachment,
} from "@/types/smartChat";
import type { BulkTaskItem } from "@/types/bulkTask";
import { ChatMessage } from "./ChatMessage";
import { SelectRestoreEditor } from "./SelectRestoreEditor";
import MaskEditor from "./MaskEditor";
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
import {
  CHAT_MODELS as AVAILABLE_MODELS,
  IMAGE_MODELS as AVAILABLE_IMAGE_MODELS,
  supportsReferenceImage,
} from "@/lib/smartChatModels";
import { motion, AnimatePresence } from "framer-motion";
import { BulkTaskModal } from "./BulkTaskModal";
import { SelectionToolbar } from "./SelectionToolbar";
import { AddToBatchMenu } from "./AddToBatchMenu";
import type { AddBatchImageInput } from "@/types/batch";

/* eslint-disable @next/next/no-img-element */

// Resolves a reference image's S3 key to a presigned URL and renders a small
// thumbnail. Used to show, per generated image, exactly which reference(s) it
// was seeded from.
const ReferenceThumb = ({
  refItem,
}: {
  refItem: { key?: string; name?: string; pinned?: boolean };
}) => {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    if (refItem.key) {
      getPresignedUrl(refItem.key)
        .then((u) => active && setUrl(u))
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [refItem.key]);

  return (
    <div
      className={`relative w-16 h-16 rounded-md overflow-hidden border bg-white/5 flex-shrink-0 ${
        refItem.pinned ? "border-indigo-400 ring-1 ring-indigo-400/60" : "border-white/20"
      }`}
      title={
        refItem.name
          ? refItem.pinned
            ? `${refItem.name} (đã ghim từ lượt trước)`
            : refItem.name
          : "reference"
      }
    >
      {url ? (
        <img
          src={url}
          alt={refItem.name || "reference"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="animate-spin text-white/50" size={16} />
        </div>
      )}
      {refItem.pinned && (
        <span className="absolute top-0.5 left-0.5 rounded-full bg-indigo-500 text-white p-0.5 shadow">
          <Pin size={9} />
        </span>
      )}
    </div>
  );
};

// Instruction sent to the OpenAI image model (gpt-image-2) to turn the current
// image into an alpha matte: black background (+ transparent areas), white for
// fully-opaque objects, and proportional gray for semi-transparent parts.
const MASK_PROMPT =
  "Convert this exact image into a precise black-and-white alpha matte (mask). " +
  "Keep every shape, silhouette, and position IDENTICAL to the source — do not move, add, remove, or redraw anything. " +
  "Rules: the background must be solid pure black (#000000). " +
  "Every fully opaque object (icons, gloves, food, appliances, buttons) must be filled with solid pure white (#FFFFFF) matching its exact silhouette. " +
  "Semi-transparent or frosted-glass elements must be rendered as a flat gray whose brightness matches their opacity (a 50%-opaque element becomes 50% gray, a 25%-opaque element becomes dark gray). " +
  "No colors, no text, no outlines, no shading or gradients other than what opacity dictates. Output ONLY the mask.";

// How many mask variations to generate per request (AI is non-deterministic,
// so a few options give the user something to choose from).
const MASK_VARIATION_COUNT = 3;

// Aspect ratios the image backend accepts. The AI mask request is sent with the
// one closest to the source so the generated mask keeps roughly the same shape.
const MASK_ASPECT_RATIOS: { ratio: string; value: number }[] = [
  { ratio: "1:1", value: 1 },
  { ratio: "16:9", value: 16 / 9 },
  { ratio: "9:16", value: 9 / 16 },
  { ratio: "4:3", value: 4 / 3 },
  { ratio: "3:4", value: 3 / 4 },
  { ratio: "3:2", value: 3 / 2 },
  { ratio: "2:3", value: 2 / 3 },
];

const nearestMaskAspectRatio = (width: number, height: number): string => {
  if (!width || !height) return "1:1";
  const target = width / height;
  return MASK_ASPECT_RATIOS.reduce((best, cur) =>
    Math.abs(cur.value - target) < Math.abs(best.value - target) ? cur : best
  ).ratio;
};

// Solid background colors offered for previewing a transparent image (alongside
// the default checkerboard). Anything else can be picked via the color input.
const PREVIEW_BG_PRESETS = ["#ffffff", "#808080", "#000000", "#1e1e1e", "#22c55e"];

// CSS for the checkerboard preview background.
const CHECKER_BG_STYLE: React.CSSProperties = {
  backgroundImage: `conic-gradient(#333 0.25turn, #444 0.25turn 0.5turn, #333 0.5turn 0.75turn, #444 0.75turn)`,
  backgroundSize: "20px 20px",
};

// Hover tooltip for an icon-only action button. Requires a `group` ancestor.
const ActionTip = ({ children }: { children: React.ReactNode }) => (
  <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded-md bg-gray-900 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-lg">
    {children}
  </span>
);

const ImageViewer = ({
  attachment,
  onClose,
  userId,
  sessionId,
}: {
  attachment: ChatAttachment;
  onClose: () => void;
  userId: string;
  sessionId: string;
}) => {
  const [url, setUrl] = useState<string | null>(attachment.url || null);
  const [loading, setLoading] = useState(!attachment.url && !!attachment.key);
  const [processing, setProcessing] = useState(false);
  // Preview background behind the (transparent) image: "checker" or a CSS color.
  const [previewBg, setPreviewBg] = useState<string>("checker");
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [tolerance, setTolerance] = useState(40);
  // Which removal method is currently applied to the image (null = none yet).
  // Drives the active-state UI and the live re-apply when Tolerance changes.
  const [appliedMode, setAppliedMode] = useState<"magic" | "normal" | null>(
    null
  );

  // AI mask (gpt-image-2): generate alpha-matte variations of the image and
  // show them in an overlay editor. `maskGenerating` drives the button spinner.
  // `cachedMaskUrls` keeps the generated variations (and any manual edits) so
  // re-opening the editor doesn't re-call the API; `maskSelectedIndex` is the
  // active variation; `maskSourceUrl` is the image the mask was generated from
  // (used as the faded backdrop and as the source for "Apply Mask").
  const [maskGenerating, setMaskGenerating] = useState(false);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);
  const [cachedMaskUrls, setCachedMaskUrls] = useState<string[]>([]);
  const [maskSelectedIndex, setMaskSelectedIndex] = useState(0);
  const [maskSourceUrl, setMaskSourceUrl] = useState<string | null>(null);
  // Protection mask for the background-removal algorithm: white (>= the range
  // threshold) regions are left UNTOUCHED by Magic/Normal Remove; gray and
  // everything else are processed normally. `appliedMaskRef` is the synchronous
  // source of truth the algorithm reads; `appliedMaskUrl` mirrors it for the UI.
  const appliedMaskRef = useRef<string | null>(null);
  const [appliedMaskUrl, setAppliedMaskUrl] = useState<string | null>(null);
  // How white a pixel must be (luminance %, 0–100) to count as protected.
  // Lower it to also protect near-white pixels that aren't a true 255.
  const [maskWhiteThreshold, setMaskWhiteThreshold] = useState(80);
  const protectionCacheRef = useRef<{
    url: string;
    w: number;
    h: number;
    data: ImageData;
  } | null>(null);
  const maskFileInputRef = useRef<HTMLInputElement>(null);

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
  const [showSelectRestore, setShowSelectRestore] = useState(false);
  const [restorePower, setRestorePower] = useState(0);
  const [restoreSmoothness, setRestoreSmoothness] = useState(20);
  const processedImageDataRef = useRef<ImageData | null>(null);
  // The pristine source for background removal. Captured on the first Remove BG
  // so that re-applying with a different Tolerance always re-processes the
  // ORIGINAL image instead of stacking removals on an already-transparent result.
  const originalSrcRef = useRef<string | null>(null);

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

  // Ask the OpenAI image model to produce a strict black/white mask of the
  // current image and open the editor. The result is cached so the editor can
  // be re-opened (and the mask applied) without re-calling the API.
  const generateMask = async () => {
    if (!url || maskGenerating) return;
    setMaskGenerating(true);
    setShowRemoveOptions(false);
    setShowSliceOptions(false);
    setShowRestoreOptions(false);
    const sourceUrlUsed = url;
    try {
      // Load the current image — through the CORS proxy when it's a remote URL.
      const srcForCanvas = sourceUrlUsed.startsWith("data:")
        ? sourceUrlUsed
        : `/api/proxy-image?url=${encodeURIComponent(sourceUrlUsed)}`;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = srcForCanvas;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      // Downscale to keep the reference payload small. WebP keeps transparency,
      // so the model can still see object shapes against the transparent areas.
      const MAX_DIM = 1024;
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not available");
      ctx.drawImage(img, 0, 0, w, h);
      const referenceDataUrl = canvas.toDataURL("image/webp", 0.85);

      const aspectRatio = nearestMaskAspectRatio(img.width, img.height);

      // Generate several variations in parallel (AI output varies per call).
      const settled = await Promise.allSettled(
        Array.from({ length: MASK_VARIATION_COUNT }, () =>
          generateImage(userId, sessionId, MASK_PROMPT, referenceDataUrl, {
            aspectRatio,
            resolution: "1K",
            model: "gpt-image-2",
            referenceImages: [referenceDataUrl],
          })
        )
      );
      const keys = settled
        .filter(
          (r): r is PromiseFulfilledResult<{ key: string; success: boolean }> =>
            r.status === "fulfilled" && !!r.value?.key
        )
        .map((r) => r.value.key);
      if (keys.length === 0) throw new Error("No mask returned");
      const urls = await Promise.all(keys.map((k) => getPresignedUrl(k)));
      setCachedMaskUrls(urls);
      setMaskSelectedIndex(0);
      setMaskSourceUrl(sourceUrlUsed);
      setMaskUrl(urls[0]);
    } catch (e) {
      console.error("Create Mask failed:", e);
      alert("Failed to create mask. Please try again.");
    } finally {
      setMaskGenerating(false);
    }
  };

  // Button handler: open the cached masks instantly if we already have them,
  // otherwise generate fresh variations.
  const handleCreateMask = () => {
    setShowRemoveOptions(false);
    setShowSliceOptions(false);
    setShowRestoreOptions(false);
    if (cachedMaskUrls.length > 0) {
      if (!maskSourceUrl) setMaskSourceUrl(url);
      const idx = Math.min(maskSelectedIndex, cachedMaskUrls.length - 1);
      setMaskSelectedIndex(idx);
      setMaskUrl(cachedMaskUrls[idx]);
      return;
    }
    void generateMask();
  };

  // Upload a mask image from disk and open it in the editor as a new variation.
  const handleMaskFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const newIndex = cachedMaskUrls.length;
      setCachedMaskUrls((prev) => [...prev, dataUrl]);
      setMaskSelectedIndex(newIndex);
      if (!maskSourceUrl) setMaskSourceUrl(url);
      setShowRemoveOptions(false);
      setShowSliceOptions(false);
      setShowRestoreOptions(false);
      setMaskUrl(dataUrl);
    };
    reader.onerror = () => alert("Failed to read the file.");
    reader.readAsDataURL(file);
  };

  // Switch to another mask variation, caching any edits made to the current one.
  const handleSelectMask = (index: number, currentEditedDataUrl?: string) => {
    const target = cachedMaskUrls[index];
    if (!target) return;
    if (currentEditedDataUrl) {
      setCachedMaskUrls((prev) => {
        const next = [...prev];
        if (maskSelectedIndex >= 0 && maskSelectedIndex < next.length) {
          next[maskSelectedIndex] = currentEditedDataUrl;
        }
        return next;
      });
    }
    setMaskSelectedIndex(index);
    setMaskUrl(target);
  };

  // Load the applied protection mask, scaled to the working image, cached so
  // live Tolerance/range dragging doesn't reload it every time.
  const getProtectionData = async (
    w: number,
    h: number
  ): Promise<ImageData | null> => {
    const maskSrc = appliedMaskRef.current;
    if (!maskSrc) return null;
    const cached = protectionCacheRef.current;
    if (cached && cached.url === maskSrc && cached.w === w && cached.h === h) {
      return cached.data;
    }
    const src = maskSrc.startsWith("data:")
      ? maskSrc
      : `/api/proxy-image?url=${encodeURIComponent(maskSrc)}`;
    const mimg = new window.Image();
    mimg.crossOrigin = "anonymous";
    mimg.src = src;
    await new Promise<void>((resolve, reject) => {
      mimg.onload = () => resolve();
      mimg.onerror = () => reject(new Error("Failed to load protection mask"));
    });
    const mc = document.createElement("canvas");
    mc.width = w;
    mc.height = h;
    const mctx = mc.getContext("2d", { willReadFrequently: true });
    if (!mctx) return null;
    mctx.drawImage(mimg, 0, 0, w, h);
    const mdata = mctx.getImageData(0, 0, w, h);
    protectionCacheRef.current = { url: maskSrc, w, h, data: mdata };
    return mdata;
  };

  // "Apply Mask": activate the edited mask as a protection mask for background
  // removal (white = untouched), then run Magic Remove so the result shows.
  const handleApplyMask = (maskDataUrl: string) => {
    appliedMaskRef.current = maskDataUrl;
    protectionCacheRef.current = null;
    setAppliedMaskUrl(maskDataUrl);
    // Cache the applied (edited) mask into the current variation so re-opening
    // the editor shows exactly what was applied.
    setCachedMaskUrls((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const idx = Math.min(maskSelectedIndex, next.length - 1);
      next[idx] = maskDataUrl;
      return next;
    });
    setMaskUrl(null);
    void handleRemoveBackground("magic");
  };

  // "Unapply": drop the protection mask and revert to the pristine image.
  const handleUnapplyMask = () => {
    appliedMaskRef.current = null;
    protectionCacheRef.current = null;
    setAppliedMaskUrl(null);
    processedImageDataRef.current = null;
    setAppliedMode(null);
    setRestorePower(0);
    if (originalSrcRef.current) setUrl(originalSrcRef.current);
    setMaskUrl(null);
  };

  const handleRemoveBackground = async (mode: "magic" | "normal") => {
    if (!url || processing) return;
    setProcessing(true);
    // Keep the options popup open so the Tolerance slider stays available for
    // live tuning (dragging re-applies). It's dismissed by toggling Remove BG.

    try {
      // Capture the pristine image on the first run, then always process from it
      // so changing Tolerance and re-applying never removes the background twice.
      if (!originalSrcRef.current) {
        originalSrcRef.current = url;
      }
      const sourceUrl = originalSrcRef.current ?? url;

      let imageUrlToFetch = sourceUrl;
      // If it's a remote URL (not data:), use proxy to avoid CORS issues
      if (!sourceUrl.startsWith("data:")) {
        imageUrlToFetch = `/api/proxy-image?url=${encodeURIComponent(sourceUrl)}`;
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

      // Snapshot the pristine pixels so protected (white) mask regions can be
      // restored verbatim after the removal — only needed when a mask is on.
      const protectOrig = appliedMaskRef.current
        ? new Uint8ClampedArray(data)
        : null;

      // Detect background color from top-left pixel
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Store original image data if needed, but here we want to store the RESULT of removal
      // So we will do it after processing.

      if (mode === "magic") {
        // Magic Remove v3 — translucency-preserving matte.
        //
        // Purpose of "Magic" (vs "Normal"): keep the *partial transparency* of
        // glassy / frosted objects, so a translucent panel stays see-through while
        // solid objects stay opaque and the flat background goes fully transparent.
        //
        // Alpha is treated as occlusion ~ how far a pixel lifts away from the
        // background color (deviation), so frosted glass (a mild lift) gets a mid
        // alpha and reads as translucent, while bright/solid content saturates to
        // opaque. Connectivity is used only to (a) cleanly zero the real flat
        // background and (b) rescue dark, background-colored pixels that are
        // *enclosed* by foreground (e.g. a black pan inside a glass dish) — those
        // carry no opacity signal, so we keep them opaque instead of vanishing.
        //
        // Tuned + visually validated on the in-app asset sheet:
        //   tBg  = tolerance slider   (background sensitivity)
        //   GAIN = 1.3                (translucency<->opacity balance; >1.6 makes
        //                              glass look solid, <1.0 makes icons faint)
        const GAIN = 1.3;
        const width = canvas.width;
        const height = canvas.height;
        const total = width * height;

        // 1) Robust background color: median over a 3px-thick border strip.
        const sr: number[] = [];
        const sg: number[] = [];
        const sb: number[] = [];
        const STRIP = 3;
        const pushSample = (x: number, y: number) => {
          const p = (y * width + x) * 4;
          sr.push(data[p]);
          sg.push(data[p + 1]);
          sb.push(data[p + 2]);
        };
        for (let x = 0; x < width; x += 2) {
          for (let s = 0; s < STRIP; s++) {
            pushSample(x, s);
            pushSample(x, height - 1 - s);
          }
        }
        for (let y = 0; y < height; y += 2) {
          for (let s = 0; s < STRIP; s++) {
            pushSample(s, y);
            pushSample(width - 1 - s, y);
          }
        }
        const median = (arr: number[]) =>
          [...arr].sort((a, b) => a - b)[arr.length >> 1];
        const bR = median(sr);
        const bG = median(sg);
        const bB = median(sb);

        // Max-channel deviation of a pixel (by pixel index) from the background.
        const devAt = (idx: number) => {
          const p = idx * 4;
          return Math.max(
            Math.abs(data[p] - bR),
            Math.abs(data[p + 1] - bG),
            Math.abs(data[p + 2] - bB)
          );
        };

        // Background sensitivity. A pixel within tBg of bg AND connected to the
        // border is flat background; within tBg but enclosed is "rescued".
        const tBg = tolerance;

        // 2) Flood-fill the flat background from the border (4-connected).
        //    Stack of pixel indices; each pixel is pushed at most once.
        const isBg = new Uint8Array(total);
        const stack = new Int32Array(total);
        let sp = 0;
        const seed = (idx: number) => {
          if (!isBg[idx] && devAt(idx) < tBg) {
            isBg[idx] = 1;
            stack[sp++] = idx;
          }
        };
        for (let x = 0; x < width; x++) {
          seed(x);
          seed((height - 1) * width + x);
        }
        for (let y = 0; y < height; y++) {
          seed(y * width);
          seed(y * width + width - 1);
        }
        while (sp > 0) {
          const idx = stack[--sp];
          const x = idx % width;
          const y = (idx - x) / width;
          if (x > 0) seed(idx - 1);
          if (x < width - 1) seed(idx + 1);
          if (y > 0) seed(idx - width);
          if (y < height - 1) seed(idx + width);
        }

        // 3) Resolve alpha per pixel.
        for (let idx = 0; idx < total; idx++) {
          const p = idx * 4;
          if (isBg[idx]) {
            // Flat background reachable from the border => transparent.
            data[p] = 0;
            data[p + 1] = 0;
            data[p + 2] = 0;
            data[p + 3] = 0;
            continue;
          }
          const dev = devAt(idx);
          if (dev <= tBg) {
            // Enclosed background-colored foreground (e.g. dark pan inside a
            // glass dish): no opacity signal, so keep it opaque.
            data[p + 3] = 255;
            continue;
          }
          // Occlusion alpha: mild lift => translucent glass, big lift => opaque.
          let a = dev * GAIN;
          if (a > 255) a = 255;
          // Un-mix (decontaminate) the background-colored fringe; aNorm is floored
          // so the division never blows up into noise at very low alpha.
          const aNorm = Math.max(0.25, a / 255);
          // Uint8ClampedArray auto-clamps these writes to [0, 255].
          data[p] = bR + (data[p] - bR) / aNorm;
          data[p + 1] = bG + (data[p + 1] - bG) / aNorm;
          data[p + 2] = bB + (data[p + 2] - bB) / aNorm;
          data[p + 3] = a;
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

      // Protection mask: restore the pristine pixels everywhere the mask is
      // white (>= the range threshold) so the removal above never touched them.
      // Gray and everything else stay affected.
      if (protectOrig) {
        const protData = await getProtectionData(canvas.width, canvas.height);
        if (protData) {
          const pd = protData.data;
          const thr = (255 * maskWhiteThreshold) / 100;
          for (let q = 0; q < data.length; q += 4) {
            const lum = 0.299 * pd[q] + 0.587 * pd[q + 1] + 0.114 * pd[q + 2];
            if (lum >= thr) {
              data[q] = protectOrig[q];
              data[q + 1] = protectOrig[q + 1];
              data[q + 2] = protectOrig[q + 2];
              data[q + 3] = protectOrig[q + 3];
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
      // Remember the method used so the UI can mark it active and so changing
      // Tolerance can re-apply the same method live.
      setAppliedMode(mode);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Failed to remove background", e);
      alert("Failed to process image");
    } finally {
      setProcessing(false);
    }
  };

  // Live update: once a method is applied, dragging the Tolerance slider
  // re-applies that same method (debounced) without needing to click again.
  // Depends only on `tolerance` so it never fires from the initial apply
  // itself (which changes `appliedMode`, not `tolerance`).
  useEffect(() => {
    if (!appliedMode) return;
    const t = setTimeout(() => {
      handleRemoveBackground(appliedMode);
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tolerance, maskWhiteThreshold]);

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
      {showSelectRestore && url && (
        <SelectRestoreEditor
          processedUrl={url}
          originalUrl={originalSrcRef.current}
          onApply={(dataUrl) => {
            setUrl(dataUrl);
            // keep the global Fix Blur in sync with the new pixels
            const img = new window.Image();
            img.onload = () => {
              const c = document.createElement("canvas");
              c.width = img.width;
              c.height = img.height;
              const ctx = c.getContext("2d");
              if (!ctx) return;
              ctx.drawImage(img, 0, 0);
              processedImageDataRef.current = ctx.getImageData(
                0,
                0,
                c.width,
                c.height
              );
            };
            img.src = dataUrl;
          }}
          onClose={() => setShowSelectRestore(false)}
        />
      )}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all z-50"
      >
        <X size={24} />
      </button>

      {/* AI Mask editor overlay */}
      <AnimatePresence>
        {maskUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6 overflow-hidden"
          >
            {/* Original image, faded behind the editor for reference */}
            {maskSourceUrl && (
              <img
                src={maskSourceUrl}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-contain opacity-20 blur-2xl scale-110 pointer-events-none select-none"
              />
            )}
            <div className="relative z-10 w-full flex justify-center">
              <MaskEditor
                maskUrl={maskUrl}
                fileBaseName={attachment.name}
                maskOptions={cachedMaskUrls}
                selectedIndex={maskSelectedIndex}
                onSelect={handleSelectMask}
                isApplied={!!appliedMaskUrl}
                onUnapply={handleUnapplyMask}
                onBack={(editedMaskDataUrl) => {
                  // Cache the edited variation so re-opening keeps the edits.
                  if (editedMaskDataUrl) {
                    setCachedMaskUrls((prev) => {
                      const next = [...prev];
                      if (
                        maskSelectedIndex >= 0 &&
                        maskSelectedIndex < next.length
                      ) {
                        next[maskSelectedIndex] = editedMaskDataUrl;
                      }
                      return next;
                    });
                  }
                  setMaskUrl(null);
                }}
                onApply={handleApplyMask}
                onRegenerate={generateMask}
                regenerating={maskGenerating}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                {/* Preview background swatches */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur rounded-full px-2 py-1.5 shadow-lg">
                  <button
                    onClick={() => setPreviewBg("checker")}
                    title="Checkerboard"
                    className={`w-6 h-6 rounded-full border transition-shadow ${
                      previewBg === "checker"
                        ? "ring-2 ring-white border-white"
                        : "border-white/40 hover:border-white"
                    }`}
                    style={{
                      backgroundImage: `conic-gradient(#bbb 0.25turn, #fff 0.25turn 0.5turn, #bbb 0.5turn 0.75turn, #fff 0.75turn)`,
                      backgroundSize: "8px 8px",
                    }}
                  />
                  {PREVIEW_BG_PRESETS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setPreviewBg(c)}
                      title={c}
                      className={`w-6 h-6 rounded-full border transition-shadow ${
                        previewBg === c
                          ? "ring-2 ring-white border-white"
                          : "border-white/40 hover:border-white"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <label
                    title="Custom color"
                    className={`relative w-6 h-6 rounded-full border overflow-hidden cursor-pointer flex items-center justify-center bg-gradient-to-br from-fuchsia-500 via-yellow-400 to-cyan-400 ${
                      previewBg !== "checker" &&
                      !PREVIEW_BG_PRESETS.includes(previewBg)
                        ? "ring-2 ring-white border-white"
                        : "border-white/40 hover:border-white"
                    }`}
                  >
                    <Palette
                      size={13}
                      className="text-white drop-shadow"
                      strokeWidth={2.5}
                    />
                    <input
                      type="color"
                      value={previewBg.startsWith("#") ? previewBg : "#888888"}
                      onChange={(e) => setPreviewBg(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
                <div className="relative max-w-full max-h-full flex items-center justify-center">
                  <img
                    ref={imageRef}
                    src={url}
                    alt={attachment.name}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    style={
                      previewBg === "checker"
                        ? CHECKER_BG_STYLE
                        : { backgroundColor: previewBg }
                    }
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

                {/* Reference provenance — which reference image(s) seeded this */}
                {attachment.sourceRefs && attachment.sourceRefs.length > 0 && (
                  <div className="bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-lg shadow-2xl flex-shrink-0">
                    <p className="font-semibold mb-2 text-xs uppercase tracking-wider text-gray-400">
                      Generated from reference
                      {attachment.sourceRefs.length > 1 ? "s" : ""}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {attachment.sourceRefs.map((r, i) => (
                        <ReferenceThumb key={r.key || i} refItem={r} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons - Always Visible, pinned to the bottom so they
                    stay in a stable spot whether or not the optional Prompt /
                    References sections above them are present (otherwise they
                    jump up under the close button and get hard to click). */}
                <div className="flex flex-wrap gap-2 mt-auto justify-end">
                  {/* Remove BG Button & Menu */}
                  <div className="relative group">
                    <button
                      onClick={() => {
                        setShowRemoveOptions(!showRemoveOptions);
                        setShowSliceOptions(false);
                        setShowRestoreOptions(false);
                      }}
                      disabled={processing || slicing}
                      className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {processing ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Eraser size={20} />
                      )}
                    </button>
                    <ActionTip>Remove BG</ActionTip>
                    <AnimatePresence>
                      {showRemoveOptions && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 w-[19rem] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20 flex flex-col"
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
                            {appliedMode && (
                              <p className="mt-2 text-[11px] text-indigo-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                Live · drag to re-apply{" "}
                                {appliedMode === "magic" ? "Magic" : "Normal"}
                              </p>
                            )}
                          </div>
                          {appliedMaskUrl && (
                            <div className="p-3 border-b border-gray-100">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  Protect white
                                </span>
                                <span className="text-xs font-mono text-gray-400">
                                  {maskWhiteThreshold}%
                                </span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={maskWhiteThreshold}
                                onChange={(e) =>
                                  setMaskWhiteThreshold(Number(e.target.value))
                                }
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                              />
                              <p className="mt-2 text-[11px] text-gray-400">
                                Mask active · white areas stay untouched. Lower
                                it to also protect near-white pixels.
                              </p>
                            </div>
                          )}
                          <button
                            onClick={() => handleRemoveBackground("normal")}
                            className={`px-4 py-3 text-left text-sm flex items-center justify-between gap-2 transition-colors ${
                              appliedMode === "normal"
                                ? "bg-indigo-50"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex flex-col gap-1">
                              <span className="font-semibold text-gray-900">
                                Normal Remove
                              </span>
                              <span className="text-xs text-gray-500">
                                Continuous transparent fill
                              </span>
                            </span>
                            {appliedMode === "normal" && (
                              <Check
                                size={16}
                                className="text-indigo-600 flex-shrink-0"
                              />
                            )}
                          </button>
                          <div className="h-px bg-gray-100" />
                          <button
                            onClick={() => handleRemoveBackground("magic")}
                            className={`px-4 py-3 text-left text-sm flex items-center justify-between gap-2 transition-colors ${
                              appliedMode === "magic"
                                ? "bg-indigo-50"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex flex-col gap-1">
                              <span className="font-semibold text-gray-900">
                                Magic Remove
                              </span>
                              <span className="text-xs text-gray-500">
                                Alpha reconstruction
                              </span>
                            </span>
                            {appliedMode === "magic" && (
                              <Check
                                size={16}
                                className="text-indigo-600 flex-shrink-0"
                              />
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Create / Edit Mask (AI) */}
                  <div className="relative group">
                    <button
                      onClick={handleCreateMask}
                      disabled={processing || slicing || maskGenerating}
                      className="flex items-center justify-center w-12 h-12 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50"
                    >
                      {maskGenerating ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Layers size={20} />
                      )}
                    </button>
                    <ActionTip>
                      {maskGenerating
                        ? "Creating…"
                        : cachedMaskUrls.length > 0
                        ? "Edit Mask"
                        : "Create Mask"}
                    </ActionTip>
                  </div>

                  {/* Upload your own mask image */}
                  <div className="relative group">
                    <button
                      onClick={() => maskFileInputRef.current?.click()}
                      disabled={processing || slicing || maskGenerating}
                      className="flex items-center justify-center w-12 h-12 bg-white text-violet-700 border border-violet-200 rounded-xl hover:bg-violet-50 transition-colors disabled:opacity-50"
                    >
                      <Upload size={20} />
                    </button>
                    <ActionTip>Upload Mask</ActionTip>
                    <input
                      ref={maskFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMaskFileSelected}
                    />
                  </div>

                  {/* Restore / Fix Blur Button */}
                  {processedImageDataRef.current && (
                    <div className="relative group">
                      <button
                        onClick={() => {
                          setShowRestoreOptions(!showRestoreOptions);
                          setShowRemoveOptions(false);
                          setShowSliceOptions(false);
                        }}
                        className="flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                      >
                        <Wand2 size={20} />
                      </button>
                      <ActionTip>Fix Blur</ActionTip>
                      <AnimatePresence>
                        {showRestoreOptions && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute bottom-full right-0 mb-2 w-[19rem] bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20 flex flex-col gap-2"
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

                  {/* Select & Restore — paint/smart-select a region, restore opacity */}
                  {processedImageDataRef.current && (
                    <div className="relative group">
                      <button
                        onClick={() => setShowSelectRestore(true)}
                        className="flex items-center justify-center w-12 h-12 bg-white text-indigo-700 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
                      >
                        <Brush size={20} />
                      </button>
                      <ActionTip>Select &amp; Restore</ActionTip>
                    </div>
                  )}

                  {/* Slice Button & Menu */}
                  <div className="relative group">
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
                      className="flex items-center justify-center w-12 h-12 bg-white text-black border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      {slicing ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Grid3X3 size={20} />
                      )}
                    </button>
                    <ActionTip>Slice</ActionTip>
                    <AnimatePresence>
                      {showSliceOptions && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 w-[19rem] bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20 flex flex-col gap-4"
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

                  {/* Download */}
                  <div className="relative group">
                    <button
                      onClick={handleDownload}
                      className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                    >
                      <Download size={20} />
                    </button>
                    <ActionTip>Download</ActionTip>
                  </div>
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
  /** Fired the moment the user commits a message — marks the session as "used"
   *  so the parent won't garbage-collect it as an empty/never-used chat. */
  onDirty?: (sessionId: string) => void;
  /** /team-only: enables the "Add to Batch" action in the selection toolbar
   *  (feeds the 3D Gen tab). Off for the admin tools Smart Chat. */
  enableBatch?: boolean;
}

const constructSystemPrompt = (
  historyText: string,
  imageMode: boolean,
  style?: string,
  maxImages: number | string = 3,
  useSamePrompt: boolean = false,
  forceNumberOfGen: boolean = false,
  fixedGenCount: number | string = 4
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

// Model lists live in src/lib/smartChatModels.ts (single source of truth),
// imported above as AVAILABLE_MODELS (chat) and AVAILABLE_IMAGE_MODELS (image).

export function SmartChatInterface({
  userId,
  session,
  initialTree,
  onUpdateSession,
  availableMoodboards,
  onDirty,
  enableBatch = false,
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
  // Always-fresh snapshot of the committed tree, so async flows that persist
  // after several setTree calls don't save a stale closure copy.
  const treeRef = useRef<ChatTree>(initialTree);
  useEffect(() => {
    treeRef.current = tree;
  }, [tree]);

  // Best-effort removal of images that were generated/uploaded to S3 but whose
  // owning tree never persisted (e.g. saveSmartChatState threw). Without this
  // they become orphaned objects in the bucket with no DB reference.
  const cleanupStrandedImages = async (keys: (string | undefined)[]) => {
    const valid = Array.from(new Set(keys.filter((k): k is string => !!k)));
    if (valid.length === 0) return;
    try {
      await deleteSmartChatImages(userId, valid);
      console.warn(
        `[orphan-cleanup] removed ${valid.length} stranded image(s) after a failed save`
      );
    } catch (e) {
      console.error("[orphan-cleanup] failed to remove stranded images", e);
    }
  };
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBulkTaskModal, setShowBulkTaskModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(
    session.model || AVAILABLE_MODELS[0].id
  );
  const [thinkingSteps, setThinkingSteps] = useState(
    Math.min(2, Math.max(1, session.thinkingSteps || 1))
  );
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string>(
    session.styleId || ""
  );
  const [imageSettings, setImageSettings] = useState<{
    aspectRatio: string;
    resolution: string;
    // number | "" so the inputs can be cleared while typing; normalized at use-time
    maxImages: number | string;
    model: string;
    useSamePrompt: boolean;
    forceNumberOfGen: boolean;
    fixedGenCount: number | string;
    // When OFF (default): send `user prompt + style reference` verbatim to the
    // renderer (bypass the chat LLM authoring the image prompts).
    // When ON: let the chat LLM refine/author the image prompts.
    refinePrompt: boolean;
  }>({
    aspectRatio: "1:1",
    resolution: "1K",
    maxImages: 3,
    model: AVAILABLE_IMAGE_MODELS[0].id,
    useSamePrompt: false,
    forceNumberOfGen: false,
    fixedGenCount: 4,
    refinePrompt: false,
  });
  const [showImageSettings, setShowImageSettings] = useState(false);
  const [viewingImage, setViewingImage] = useState<ChatAttachment | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<
    {
      id?: string;
      file: File | null; // null while an "include in chat" image downloads
      preview: string;
      pinned: boolean;
      loading?: boolean;
    }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
  const [bulkQueue, setBulkQueue] = useState<BulkTaskItem[]>([]);
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

  // Gather currently-selected images for "Add to Batch". Only images already
  // persisted to S3 (have a `key`) can be added; blob-only/loading ones are skipped.
  const getSelectedBatchImages = (): AddBatchImageInput[] => {
    const out: AddBatchImageInput[] = [];
    const nodes = treeRef.current?.nodes || tree.nodes;
    selectedImages.forEach((indices, nodeId) => {
      const node = nodes[nodeId];
      if (!node?.attachments) return;
      indices.forEach((idx) => {
        const att = node.attachments![idx];
        if (att && att.type === "image" && att.key) {
          out.push({
            key: att.key,
            name: att.name,
            prompt: att.prompt,
            sourceNodeId: nodeId,
          });
        }
      });
    });
    return out;
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

    const nextItem = bulkQueue[0];
    const total = bulkProgress?.total || bulkQueue.length;
    const current = total - bulkQueue.length + 1;

    setBulkProgress({ current, total });

    // Use a timeout to simulate delay between messages if needed
    const timer = setTimeout(() => {
      handleSendMessage(nextItem).then(() => {
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
        // Merge with defaults to ensure new keys (like model) exist if loading old settings.
        // Force "Force Number of Gen" OFF by default each load (don't restore it).
        setImageSettings((prev) => ({ ...prev, ...parsed, forceNumberOfGen: false }));
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
    // Number fields (fixedGenCount/maxImages) are stored raw so the input can be
    // cleared/typed freely; they are clamped to a valid range only when used
    // (getValidatedImageCount/getValidatedCount at generation time).
    const newSettings = { ...imageSettings, [key]: value };
    setImageSettings(newSettings);
    localStorage.setItem("smartChatImageSettings", JSON.stringify(newSettings));

    // Clear pending attachments if switching to a model that can't use a reference image
    if (
      key === "model" &&
      typeof value === "string" &&
      !supportsReferenceImage(value) &&
      pendingAttachments.length > 0
    ) {
      setPendingAttachments([]);
    }
  };

  // Scroll to bottom on a new message — but only if the user is already near
  // the bottom, so we never yank them back while they're scrolling up to read
  // earlier messages (e.g. during image generation).
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 200;
    if (nearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [tree.currentNodeId]);

  // --- Drag & Drop ---
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only show drag overlay for reference-image-capable models and if Image Mode is ON
    if (imageMode && supportsReferenceImage(imageSettings.model)) {
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

    const hasDroppedFiles =
      e.dataTransfer.files && e.dataTransfer.files.length > 0;
    if (!hasDroppedFiles) return;

    // Only image-to-image models (Gemini 3 Pro, GPT Image 2) accept a reference image.
    // Imagen models are text-only, so tell the user instead of silently ignoring the drop.
    if (!supportsReferenceImage(imageSettings.model)) {
      alert(
        "Reference images only work with the Gemini 3 Pro or GPT Image 2 image models. Turn Image Mode on and switch the image model to one of those, then drag again.",
      );
      return;
    }

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow image upload for reference-image-capable models
    if (!supportsReferenceImage(imageSettings.model)) {
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

  // Reference images are sent to the AI inline (base64) inside a single JSON
  // POST that must clear two hard caps: Vercel function body 4.5MB and the Lambda
  // Function URL 6MB payload. base64 inflates bytes ~33%, so we bound the TOTAL
  // encoded size of ALL references regardless of how many the user attaches
  // (target: 10+), downscaling/recompressing uniformly until the batch fits.
  const REFERENCE_TOTAL_BASE64_BUDGET = 3_500_000; // ~3.5MB across all refs; headroom under 4.5MB for prompt+JSON

  // Encode a blob/file to a webp data URL, optionally downscaling the longest
  // edge to `maxDim` and compressing at `quality`.
  const encodeImageToWebP = (
    file: Blob,
    opts?: { maxDim?: number; quality?: number }
  ): Promise<string> => {
    const maxDim = opts?.maxDim ?? Infinity;
    const quality = opts?.quality ?? 0.9;
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        const longest = Math.max(width, height);
        if (Number.isFinite(maxDim) && longest > maxDim) {
          const scale = maxDim / longest;
          width = Math.max(1, Math.round(width * scale));
          height = Math.max(1, Math.round(height * scale));
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(img.src);
          reject(new Error("Canvas context failed"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const url = canvas.toDataURL("image/webp", quality);
        URL.revokeObjectURL(img.src);
        resolve(url);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(img.src);
        reject(e);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Starting per-image resolution chosen by how many references there are, so a
  // batch of up to ~10 fits the payload budget without over-shrinking 1-2 refs.
  const initialRefDimForCount = (count: number): number => {
    if (count <= 1) return 1536;
    if (count <= 2) return 1280;
    if (count <= 4) return 1024;
    if (count <= 6) return 896;
    return 720; // 7..10+
  };

  const totalBase64Bytes = (urls: string[]): number =>
    urls.reduce((sum, u) => sum + u.length, 0);

  // Resolve a node's image attachments to raw Blobs (from inline data URL or S3
  // key via presigned proxy), KEEPING each blob paired with the attachment it
  // came from. Order preserved; attachments that fail to resolve are simply
  // omitted (never mis-indexed), so downstream provenance stays exact.
  const resolveAttachmentBlobsTagged = async (
    attachments: ChatAttachment[] | undefined
  ): Promise<{ att: ChatAttachment; blob: Blob }[]> => {
    if (!attachments || attachments.length === 0) return [];
    const out: { att: ChatAttachment; blob: Blob }[] = [];
    for (const att of attachments) {
      try {
        if (att.url && att.url.startsWith("data:")) {
          const res = await fetch(att.url);
          out.push({ att, blob: await res.blob() });
        } else if (att.key) {
          const url = await getPresignedUrl(att.key);
          const res = await fetch(
            `/api/proxy-image?url=${encodeURIComponent(url)}`
          );
          out.push({ att, blob: await res.blob() });
        }
      } catch (e) {
        console.error("Failed to resolve reference image", e);
      }
    }
    return out;
  };

  // Identity-agnostic variant: just the Blobs, order preserved, failures
  // skipped. Use resolveAttachmentBlobsTagged when you need to know which
  // attachment each blob came from (e.g. to record exact provenance).
  const resolveAttachmentBlobs = async (
    attachments: ChatAttachment[] | undefined
  ): Promise<Blob[]> =>
    (await resolveAttachmentBlobsTagged(attachments)).map((r) => r.blob);

  // Encode all reference blobs for the AI call, guaranteeing the combined base64
  // size stays under budget by shrinking uniformly until it fits. Always returns
  // — even 10 large inputs converge to small thumbnails rather than failing.
  const prepareReferenceImagesForAI = async (
    blobs: Blob[]
  ): Promise<string[]> => {
    if (blobs.length === 0) return [];
    let maxDim = initialRefDimForCount(blobs.length);
    let quality = blobs.length > 6 ? 0.72 : 0.8;

    for (let attempt = 0; attempt < 6; attempt++) {
      const encoded = await Promise.all(
        blobs.map((b) => encodeImageToWebP(b, { maxDim, quality }))
      );
      if (
        totalBase64Bytes(encoded) <= REFERENCE_TOTAL_BASE64_BUDGET ||
        maxDim <= 256
      ) {
        return encoded;
      }
      maxDim = Math.max(256, Math.round(maxDim * 0.7));
      quality = Math.max(0.5, quality - 0.06);
    }
    // Hard floor (effectively unreachable): tiny thumbnails always fit.
    return Promise.all(
      blobs.map((b) => encodeImageToWebP(b, { maxDim: 256, quality: 0.5 }))
    );
  };

  // Pair each encoded reference (aligned by index with `attachments`) with its
  // source attachment, so generated images can be seeded by a specific reference
  // (round-robin) and record exact provenance. Returns [] when the model can't
  // use references or the encoded set doesn't line up with the attachments.
  const buildReferenceSources = (
    attachments: ChatAttachment[] | undefined,
    encoded: string[]
  ): { key?: string; name?: string; base64: string }[] => {
    if (
      !attachments ||
      attachments.length === 0 ||
      encoded.length !== attachments.length ||
      !supportsReferenceImage(imageSettings.model)
    ) {
      return [];
    }
    return attachments.map((a, i) => ({
      key: a.key,
      name: a.name,
      base64: encoded[i],
    }));
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

  const handleSendMessage = async (overrideInput?: string | BulkTaskItem) => {
    // If overrideInput is provided (bulk task), use it. Otherwise use state input.
    // We check specifically for string type to avoid event objects being treated as input
    const bulkTaskOverride =
      typeof overrideInput === "object" && overrideInput !== null
        ? overrideInput
        : null;
    const contentToProcess =
      typeof overrideInput === "string"
        ? overrideInput
        : bulkTaskOverride?.prompt || input;
    const bulkTaskName = bulkTaskOverride?.name?.trim() || "";

    if (
      (!contentToProcess.trim() && pendingAttachments.length === 0) ||
      loading ||
      // An included image is still downloading — wait so it isn't dropped.
      pendingAttachments.some((att) => att.loading)
    )
      return;

    // Mark the session as used as soon as the user commits a message, so the
    // parent never garbage-collects it as an empty chat mid-send.
    onDirty?.(session.sessionId);

    // DIAGNOSTIC: Check if tree state is valid
    console.log("[DEBUG] handleSendMessage START", {
      contentToProcess: contentToProcess.slice(0, 50),
      isManualSend: typeof overrideInput === "undefined",
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
    if (typeof overrideInput === "undefined") {
      setInput("");
    }

    // Only images whose bytes finished downloading can be uploaded now.
    const readyAttachments = currentAttachments.filter((att) => att.file);

    // Guard the silent trap: the current image model can't use reference images
    // (e.g. Imagen is text-only), so attached refs would be ignored entirely.
    if (
      readyAttachments.length > 0 &&
      !supportsReferenceImage(imageSettings.model)
    ) {
      const proceed = window.confirm(
        `Model ảnh hiện tại không dùng được ảnh tham chiếu — ảnh đính kèm sẽ bị BỎ QUA và kết quả sẽ không liên quan tới ảnh của bạn.\n\nĐổi sang "Gemini 3 Pro" hoặc "GPT Image 2" để dùng reference.\n\nVẫn tiếp tục (bỏ qua ảnh)?`
      );
      if (!proceed) {
        setLoading(false);
        return;
      }
    }

    // Clear UI but keep pinned images and any still-downloading "include" images.
    const keptAttachments = currentAttachments.filter(
      (att) => att.pinned || (!att.file && att.loading)
    );
    setPendingAttachments(keptAttachments);

    setLoading(true);

    try {
      // 1. Upload Images if any
      const uploadedAttachments: ChatAttachment[] = [];
      // Downscaled copies sent to the AI inline — bounded payload, supports ~10
      // references. The S3 upload below keeps full resolution for display.
      const base64Images: string[] =
        readyAttachments.length > 0
          ? await prepareReferenceImagesForAI(
              readyAttachments.map((a) => a.file!)
            )
          : [];

      if (readyAttachments.length > 0) {
        // Use Promise.allSettled to handle partial failures gracefully
        const uploadPromises = readyAttachments.map(async (attachment) => {
          const base64 = await convertImageToWebPBase64(attachment.file!);

          // Upload to S3 via Lambda (full-res for display)
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
            name: attachment.file!.name,
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

      // Persist the user message immediately so it survives a hard navigation /
      // refresh during the multi-second AI round-trip. We keep the promise and
      // await it before the final save below, so this strictly-older user-only
      // tree can never land AFTER (and overwrite) the full tree with the AI reply.
      const earlyUserSave = saveSmartChatState(
        userId,
        session.sessionId,
        newTree,
        userContent.slice(0, 50),
        undefined,
        selectedModel,
        selectedMoodboardId,
        thinkingSteps
      ).catch((e) =>
        console.error("[SmartChatInterface] early user-message save failed:", e)
      );

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

          // Helper: clamp a count to [1, 10]
          const getValidatedCount = (
            value: number | string,
            defaultVal: number
          ) => {
            const n = typeof value === "number" ? value : parseInt(String(value));
            return Math.max(1, Math.min(10, isNaN(n) ? defaultVal : n));
          };

          if (!imageSettings.refinePrompt) {
            // Refine Prompt OFF (default): ignore the LLM-authored prompts. Send the
            // user's prompt + full style reference verbatim, duplicated to the count.
            const styleRef = (activeStyle || "").trim();
            const verbatim = styleRef
              ? `${userContent}\n\n${styleRef}`
              : userContent;
            const count = imageSettings.forceNumberOfGen
              ? getValidatedCount(imageSettings.fixedGenCount, 4)
              : getValidatedCount(imageSettings.maxImages, 3);
            prompts = Array(count).fill(verbatim);
            console.log("[refinePrompt OFF] verbatim x", count, verbatim);
          } else {
            // Refine Prompt ON: use the LLM-authored prompts.
            // If useSamePrompt is enabled AND forceNumberOfGen is NOT, force first prompt only
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

            if (imageSettings.forceNumberOfGen) {
              const count = getValidatedCount(imageSettings.fixedGenCount, 4);
              prompts = rawPrompts.slice(0, count);
            } else if (imageSettings.useSamePrompt && rawPrompts.length > 0) {
              const singlePrompt = rawPrompts[0];
              const count = getValidatedCount(imageSettings.maxImages, 3);
              prompts = Array(count).fill(singlePrompt);
            } else {
              const maxCount = getValidatedCount(imageSettings.maxImages, 3);
              prompts = rawPrompts.slice(0, maxCount);
            }
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
      const getBulkAttachmentName = (prompt: string, index: number) => {
        if (!bulkTaskName) return prompt;
        if (prompts.length > 1) {
          return `${bulkTaskName}_${String(index + 1).padStart(2, "0")}`;
        }
        return bulkTaskName;
      };

      // References the renderer can actually seed from. `uploadedAttachments`
      // aligns by index with `base64Images` AND `readyAttachments` (all built
      // from readyAttachments in order). Every generated image is conditioned by
      // ALL of these references (image-to-image blend), and we record each one as
      // provenance so the panel matches exactly what the model received.
      const refsUsable =
        base64Images.length > 0 &&
        supportsReferenceImage(imageSettings.model) &&
        uploadedAttachments.length === base64Images.length;
      const referenceSources = refsUsable
        ? uploadedAttachments.map((a, i) => ({
            key: a.key,
            name: a.name,
            base64: base64Images[i],
            // Pinned refs ride along from a previous turn rather than being
            // attached fresh — flag them so the provenance panel can say so.
            pinned: readyAttachments[i]?.pinned ?? false,
          }))
        : [];
      // Each generated image is conditioned by ALL references (image-to-image
      // blend). `base64`/`key`/`name` stay as the primary (first) ref for any
      // single-ref consumer; `base64s`/`sourceRefs` carry the full set.
      const refSourceFor = (i: number) =>
        referenceSources.length > 0
          ? {
              base64: referenceSources[0].base64,
              key: referenceSources[0].key,
              name: referenceSources[0].name,
              base64s: referenceSources.map((r) => r.base64),
              sourceRefs: referenceSources.map((r) => ({
                key: r.key,
                name: r.name,
                pinned: r.pinned,
              })),
              _i: i,
            }
          : null;

      const aiAttachments: ChatAttachment[] = prompts.map((p, i) => {
        const ref = refSourceFor(i);
        return {
          id: `loading-${Date.now()}-${i}`,
          type: "image",
          name: getBulkAttachmentName(p, i),
          status: "loading",
          prompt: p,
          sourceRefs: ref?.sourceRefs,
        };
      });

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
          const ref = refSourceFor(i);
          try {
            const gen = await generateImage(
              userId,
              session.sessionId,
              p,
              ref?.base64,
              {
                aspectRatio: imageSettings.aspectRatio,
                resolution: imageSettings.resolution,
                model: imageSettings.model,
                referenceImages: ref?.base64s,
              }
            );

            if (gen?.key) {
              const newAttachment: ChatAttachment = {
                id: aiAttachments[i].id,
                type: "image",
                key: gen.key,
                name: getBulkAttachmentName(p, i).slice(0, 120),
                status: "complete",
                prompt: p,
                sourceRefs: ref?.sourceRefs,
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

        // Let the early user-only save finish first so it can't overwrite this.
        await earlyUserSave;
        try {
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
        } catch (saveErr) {
          // Final save failed: the early user save kept the user node (and its
          // uploaded images stay referenced), but these AI-generated images are
          // now unreferenced — remove them so they don't strand in S3.
          await cleanupStrandedImages(aiAttachments.map((a) => a.key));
          throw saveErr;
        }
      } else {
        // No images, just save text. Let the early save finish first.
        await earlyUserSave;
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
        // Bounded, downscaled references (supports ~10) resolved from S3 keys.
        const base64Images: string[] = await prepareReferenceImagesForAI(
          await resolveAttachmentBlobs(node.attachments)
        );

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

            const toCount = (value: number | string, def: number) => {
              const n =
                typeof value === "number" ? value : parseInt(String(value));
              return Math.max(1, Math.min(10, isNaN(n) ? def : n));
            };

            if (!imageSettings.refinePrompt) {
              // Refine Prompt OFF: verbatim user prompt + style reference.
              const styleRef = (activeStyle || "").trim();
              const verbatim = styleRef
                ? `${newContent}\n\n${styleRef}`
                : newContent;
              const count = imageSettings.forceNumberOfGen
                ? toCount(imageSettings.fixedGenCount, 4)
                : toCount(imageSettings.maxImages, 3);
              prompts = Array(count).fill(verbatim);
            } else {
              if (
                imageSettings.useSamePrompt &&
                !imageSettings.forceNumberOfGen &&
                rawPrompts.length > 1
              ) {
                rawPrompts = [rawPrompts[0]];
              }

              if (imageSettings.forceNumberOfGen) {
                const count = toCount(imageSettings.fixedGenCount, 4);
                prompts = rawPrompts.slice(0, count);
              } else if (imageSettings.useSamePrompt && rawPrompts.length > 0) {
                const singlePrompt = rawPrompts[0];
                const count = toCount(imageSettings.maxImages, 3);
                prompts = Array(count).fill(singlePrompt);
              } else {
                const maxCount = toCount(imageSettings.maxImages, 3);
                prompts = rawPrompts.slice(0, maxCount);
              }
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
        const referenceSources = buildReferenceSources(
          node.attachments,
          base64Images
        );
        const refSourceFor = (i: number) =>
          referenceSources.length > 0
            ? {
                base64: referenceSources[0].base64,
                key: referenceSources[0].key,
                name: referenceSources[0].name,
                base64s: referenceSources.map((r) => r.base64),
                sourceRefs: referenceSources.map((r) => ({
                  key: r.key,
                  name: r.name,
                })),
                _i: i,
              }
            : null;

        const aiAttachments: ChatAttachment[] = prompts.map((p, i) => {
          const ref = refSourceFor(i);
          return {
            id: `loading-${Date.now()}-${i}`,
            type: "image" as const,
            name: p,
            status: "loading" as const,
            prompt: p,
            sourceRefs: ref?.sourceRefs,
          };
        });

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
          const imagePromises = prompts.map((p, i) => {
            const ref = refSourceFor(i);
            return generateImage(
              userId,
              session.sessionId,
              p,
              ref?.base64,
              {
                aspectRatio: imageSettings.aspectRatio,
                resolution: imageSettings.resolution,
                model: imageSettings.model,
                referenceImages: ref?.base64s,
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
                    sourceRefs: ref?.sourceRefs,
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
              });
          });

          await Promise.allSettled(imagePromises);

          // Final save with all attachments using the authoritative currentTree
          // currentTree has been updated by the promises above
          try {
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
          } catch (saveErr) {
            await cleanupStrandedImages(aiAttachments.map((a) => a.key));
            throw saveErr;
          }
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
    const oldKey = attachment.key; // captured so we delete it only after a successful regen
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
      // 1. Prepare ALL of the parent's images as references (image-to-image
      //    blend) when the model supports it. Output is conditioned by every one,
      //    and exactly those are recorded as provenance.
      let referenceImagesBase64: string[] = [];
      let usedSourceRefs:
        | { key?: string; name?: string; pinned?: boolean }[]
        | undefined = undefined;
      if (
        supportsReferenceImage(imageSettings.model) &&
        parentNode?.attachments &&
        parentNode.attachments.length > 0
      ) {
        try {
          // Tagged resolve keeps each blob paired with its attachment, so a ref
          // that fails to resolve is dropped from BOTH the payload and the
          // provenance — never mis-identified by a blind index slice.
          const tagged = await resolveAttachmentBlobsTagged(
            parentNode.attachments
          );
          referenceImagesBase64 = await prepareReferenceImagesForAI(
            tagged.map((t) => t.blob)
          );
          usedSourceRefs =
            referenceImagesBase64.length > 0
              ? tagged.slice(0, referenceImagesBase64.length).map((t) => ({
                  key: t.att.key,
                  name: t.att.name,
                  pinned: (t.att as { pinned?: boolean }).pinned,
                }))
              : undefined;
        } catch (e) {
          console.error("Failed to prepare reference images", e);
        }
      }

      // 2. Update status to "loading" (keep the old image's key/url, so a failed
      //    generation can revert cleanly without losing the original).
      setTree((prev) => {
        const updated = { ...prev };
        updated.nodes = { ...updated.nodes };
        const currentNode = updated.nodes[nodeId];
        if (currentNode && currentNode.attachments) {
          const updatedAttachments = [...currentNode.attachments];
          updatedAttachments[attachmentIndex] = {
            ...updatedAttachments[attachmentIndex],
            status: "loading",
          };
          updated.nodes[nodeId] = {
            ...currentNode,
            attachments: updatedAttachments,
          };
        }
        return updated;
      });

      // 3. Generate the new image FIRST. The old image is only deleted after the
      //    new one is both generated AND persisted, so no failure path can leave
      //    the attachment with no image at all.
      const gen = await generateImage(
        userId,
        session.sessionId,
        prompt,
        referenceImagesBase64[0],
        {
          aspectRatio: imageSettings.aspectRatio,
          resolution: imageSettings.resolution,
          model: imageSettings.model,
          referenceImages: referenceImagesBase64,
        }
      );

      if (gen.key) {
        // Optimistically show the new image
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
              sourceRefs: usedSourceRefs,
            };
            updated.nodes[nodeId] = {
              ...currentNode,
              attachments: updatedAttachments,
            };
          }
          return updated;
        });

        // Persist from the freshest committed tree (treeRef), patched with the
        // regenerated image, so concurrent edits aren't clobbered by a stale
        // closure copy.
        const finalTree = { ...treeRef.current };
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
            sourceRefs: usedSourceRefs,
          };
          finalTree.nodes[nodeId] = {
            ...finalNode,
            attachments: finalAttachments,
          };
        }

        try {
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
        } catch (saveErr) {
          // Save failed: the freshly generated image is now unreferenced and the
          // old image is still intact (not yet deleted). Drop the new image; the
          // catch below restores the original attachment.
          await cleanupStrandedImages([gen.key]);
          throw saveErr;
        }

        // Save succeeded — now it's safe to delete the old image.
        if (oldKey && oldKey !== gen.key) {
          try {
            await deleteSmartChatImages(userId, [oldKey]);
          } catch (e) {
            console.warn("Failed to delete old image after regenerate", e);
          }
        }
      } else {
        throw new Error("Generation failed");
      }
    } catch (e) {
      console.error("Failed to regenerate image", e);
      // The original image was never deleted on any failure path, so restore it
      // instead of marking the attachment as permanently failed (which would
      // strand the user with a broken thumbnail despite the image still existing).
      setTree((prev) => {
        const updated = { ...prev };
        updated.nodes = { ...updated.nodes };
        const currentNode = updated.nodes[nodeId];
        if (currentNode && currentNode.attachments) {
          const updatedAttachments = [...currentNode.attachments];
          updatedAttachments[attachmentIndex] = {
            ...attachment,
            status: "complete",
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
          // Bounded, downscaled references (supports ~10) resolved from S3 keys.
          const base64Images: string[] = await prepareReferenceImagesForAI(
            await resolveAttachmentBlobs(node.attachments)
          );

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
                prompts = Array(Number(imageSettings.maxImages) || 3).fill(
                  singlePrompt
                );
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
          const referenceSources = buildReferenceSources(
            node.attachments,
            base64Images
          );
          const refSourceFor = (i: number) =>
            referenceSources.length > 0
              ? {
                  base64: referenceSources[0].base64,
                  key: referenceSources[0].key,
                  name: referenceSources[0].name,
                  base64s: referenceSources.map((r) => r.base64),
                  sourceRefs: referenceSources.map((r) => ({
                    key: r.key,
                    name: r.name,
                  })),
                  _i: i,
                }
              : null;

          const aiAttachments: ChatAttachment[] = prompts.map((p, i) => {
            const ref = refSourceFor(i);
            return {
              id: `loading-${Date.now()}-${i}`,
              type: "image" as const,
              name: p,
              status: "loading" as const,
              prompt: p,
              sourceRefs: ref?.sourceRefs,
            };
          });

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
              const ref = refSourceFor(i);
              try {
                const gen = await generateImage(
                  userId,
                  session.sessionId,
                  p,
                  ref?.base64,
                  {
                    aspectRatio: imageSettings.aspectRatio,
                    resolution: imageSettings.resolution,
                    model: imageSettings.model,
                    referenceImages: ref?.base64s,
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
                    sourceRefs: ref?.sourceRefs,
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
      // Bounded, downscaled references (supports ~10) resolved from S3 keys.
      const base64Images: string[] = await prepareReferenceImagesForAI(
        await resolveAttachmentBlobs(parentNode.attachments)
      );

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
      const referenceSources = buildReferenceSources(
        parentNode.attachments,
        base64Images
      );
      // Each generated image is conditioned by ALL references (image-to-image
      // blend). `base64`/`key`/`name` stay as the primary (first) ref for any
      // single-ref consumer; `base64s`/`sourceRefs` carry the full set.
      const refSourceFor = (i: number) =>
        referenceSources.length > 0
          ? {
              base64: referenceSources[0].base64,
              key: referenceSources[0].key,
              name: referenceSources[0].name,
              base64s: referenceSources.map((r) => r.base64),
              sourceRefs: referenceSources.map((r) => ({
                key: r.key,
                name: r.name,
              })),
              _i: i,
            }
          : null;

      const aiAttachments: ChatAttachment[] = prompts.map((p, i) => {
        const ref = refSourceFor(i);
        return {
          id: `loading-${Date.now()}-${i}`,
          type: "image" as const,
          name: p,
          status: "loading" as const,
          prompt: p,
          sourceRefs: ref?.sourceRefs,
        };
      });

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
        const imagePromises = prompts.map((p, i) => {
          const ref = refSourceFor(i);
          return generateImage(
            userId,
            session.sessionId,
            p,
            ref?.base64,
            {
              aspectRatio: imageSettings.aspectRatio,
              resolution: imageSettings.resolution,
              model: imageSettings.model,
              referenceImages: ref?.base64s,
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
                  sourceRefs: ref?.sourceRefs,
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
            });
        });

        await Promise.allSettled(imagePromises);

        // Final Save using authoritative tree
        try {
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
        } catch (saveErr) {
          await cleanupStrandedImages(aiAttachments.map((a) => a.key));
          throw saveErr;
        }
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
    let url = attachment.url;
    // Resolve presigned URL if we only have a key (fast — no image download)
    if (attachment.key && !url?.startsWith("data:")) {
      try {
        url = await getPresignedUrl(attachment.key);
      } catch (e) {
        console.error("Failed to resolve image url", e);
        alert("Failed to include image");
        return;
      }
    }

    if (!url) {
      console.error("No URL found for attachment");
      return;
    }

    // Show the thumbnail immediately using the resolved URL; download the actual
    // bytes (needed to re-upload on send) in the background so there's no wait.
    const includeId = `inc_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const fileName = attachment.name || `included-image-${Date.now()}.png`;
    setPendingAttachments((prev) => [
      ...prev,
      { id: includeId, file: null, preview: url as string, pinned: false, loading: true },
    ]);

    try {
      // Use proxy for remote URLs to avoid CORS when fetching the blob
      const imageUrlToFetch = url.startsWith("data:")
        ? url
        : `/api/proxy-image?url=${encodeURIComponent(url)}`;
      const response = await fetch(imageUrlToFetch);
      const blob = await response.blob();
      const file = new File([blob], fileName, {
        type: blob.type || "image/png",
      });
      setPendingAttachments((prev) =>
        prev.map((p) =>
          p.id === includeId ? { ...p, file, loading: false } : p
        )
      );
    } catch (e) {
      console.error("Failed to include image", e);
      // Drop the placeholder on failure
      setPendingAttachments((prev) => prev.filter((p) => p.id !== includeId));
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
            extraAction={
              enableBatch ? (
                <AddToBatchMenu
                  count={getTotalSelectedCount()}
                  disabled={
                    getTotalSelectedCount() === 0 ||
                    downloadProgress?.isDownloading
                  }
                  getImages={getSelectedBatchImages}
                  onAdded={() => {
                    setIsSelectionMode(false);
                    setSelectedImages(new Map());
                  }}
                />
              ) : undefined
            }
          />
        )}
      </AnimatePresence>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto min-h-0 bg-white relative"
      >
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

          {loading && thread[thread.length - 1]?.role !== "assistant" && (
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
                      {att.loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/55">
                          <Loader2
                            size={16}
                            className="animate-spin text-gray-600"
                          />
                        </div>
                      )}
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

            {imageMode &&
              pendingAttachments.some((a) => a.file) &&
              (() => {
                const ready = pendingAttachments.filter((a) => a.file);
                const pinnedCount = ready.filter((a) => a.pinned).length;
                const usable = supportsReferenceImage(imageSettings.model);
                return (
                  <div
                    className={`self-start flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
                      usable
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                        : "bg-amber-50 border-amber-200 text-amber-700"
                    }`}
                  >
                    {usable ? (
                      <>
                        <ImageIcon size={12} />
                        <span>
                          {ready.length} ảnh tham chiếu sẽ được dùng
                          {pinnedCount > 0 ? ` · ${pinnedCount} đã ghim` : ""}
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={12} />
                        <span>Model hiện tại bỏ qua ảnh tham chiếu</span>
                      </>
                    )}
                  </div>
                );
              })()}

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
                    {/* Thinking Steps */}
                    <div className="relative shrink-0" title="Thinking Steps">
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="2"
                          value={thinkingSteps}
                          onChange={(e) =>
                            setThinkingSteps(
                              Math.min(2, Math.max(1, parseInt(e.target.value) || 1))
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
                <div className="relative">
                    <button
                      onClick={() => setShowImageSettings(!showImageSettings)}
                      className={`p-2 rounded-xl transition-all ${
                        showImageSettings
                          ? "bg-gray-100 text-black"
                          : "text-gray-400 hover:text-black hover:bg-gray-100"
                      }`}
                      title="Settings"
                    >
                      <SlidersHorizontal size={18} />
                    </button>
                    <AnimatePresence>
                      {showImageSettings && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 w-60 max-h-[70vh] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-20 flex flex-col gap-3"
                        >
                          {/* Chat model — always available (drives the conversation) */}
                          <div>
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">
                              Chat model
                            </label>
                            <select
                              value={selectedModel}
                              onChange={handleModelChange}
                              className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                            >
                              {AVAILABLE_MODELS.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {imageMode && (
                            <>
                              <div className="border-t border-gray-100 pt-2 -mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                Tạo ảnh
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                  Image model
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
                                value={imageSettings.fixedGenCount}
                                onChange={(e) => {
                                  const raw = e.target.value;
                                  const num = parseInt(raw);
                                  handleImageSettingChange(
                                    "fixedGenCount",
                                    raw === "" || isNaN(num) ? "" : num
                                  );
                                }}
                                onBlur={(e) => {
                                  if (e.target.value === "")
                                    handleImageSettingChange("fixedGenCount", 4);
                                }}
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
                                value={imageSettings.maxImages}
                                onChange={(e) => {
                                  const raw = e.target.value;
                                  const num = parseInt(raw);
                                  handleImageSettingChange(
                                    "maxImages",
                                    raw === "" || isNaN(num) ? "" : num
                                  );
                                }}
                                onBlur={(e) => {
                                  if (e.target.value === "")
                                    handleImageSettingChange("maxImages", 3);
                                }}
                                className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                              />
                            </div>
                          )}

                          <div>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={imageSettings.refinePrompt}
                                onChange={(e) =>
                                  handleImageSettingChange(
                                    "refinePrompt",
                                    e.target.checked
                                  )
                                }
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                              />
                              <span className="text-xs font-semibold text-gray-700">
                                Refine prompt
                              </span>
                            </label>
                            <p className="text-[10px] text-gray-400 mt-1 ml-6">
                              {imageSettings.refinePrompt
                                ? "AI rewrites your prompt for better results"
                                : "Send your prompt + style reference as-is"}
                            </p>
                          </div>

                          {imageSettings.refinePrompt && (
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
                          )}
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                {imageMode && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!supportsReferenceImage(imageSettings.model)}
                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title={
                      !supportsReferenceImage(imageSettings.model)
                        ? "Image reference only available with Gemini 3 Pro or GPT Image 2"
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
                    loading ||
                    pendingAttachments.some((att) => att.loading)
                  }
                  title={
                    pendingAttachments.some((att) => att.loading)
                      ? "Đang tải ảnh đính kèm..."
                      : undefined
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
          {imageMode && supportsReferenceImage(imageSettings.model)
            ? " • Drag & Drop images"
            : ""}
        </div>
      </div>

      <AnimatePresence>
        {viewingImage && (
          <ImageViewer
            attachment={viewingImage}
            onClose={() => setViewingImage(null)}
            userId={userId}
            sessionId={session.sessionId}
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
        onStart={async (items: BulkTaskItem[], delay: number) => {
          if (items.length === 0) return;

          cancelBulkRef.current = false;
          setBulkDelay(delay);
          setBulkQueue(items);
          setIsProcessingQueue(true);
          // Initial progress
          setBulkProgress({ current: 1, total: items.length });
        }}
      />
    </div>
  );
}
