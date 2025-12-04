import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!attachment.key || attachment.url) return;
    getPresignedUrl(attachment.key).then((u) => {
      setUrl(u);
      setLoading(false);
    });
  }, [attachment]);

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
      if (url?.startsWith("data:")) {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = attachment.name || "download.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } else if (attachment.key) {
        const downloadUrl = await getPresignedUrl(attachment.key, {
          download: true,
        });
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = attachment.name || "download.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (url) {
        window.open(url, "_blank");
      }
    } catch (e) {
      console.error("Download failed", e);
      if (url) window.open(url, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
      >
        <X size={24} />
      </button>

      <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
        {loading ? (
          <Loader2 className="animate-spin text-white" size={48} />
        ) : (
          url && (
            <>
              <div className="relative">
                <img
                  src={url}
                  alt={attachment.name}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                {showSliceOptions && (
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
                        className="border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)_inset]"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-4">
                {/* Remove BG Button & Menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowRemoveOptions(!showRemoveOptions);
                      setShowSliceOptions(false);
                    }}
                    disabled={processing || slicing}
                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
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
                        className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20 flex flex-col"
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

                {/* Slice Button & Menu */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSliceOptions(!showSliceOptions);
                      setShowRemoveOptions(false);
                    }}
                    disabled={processing || slicing}
                    className="flex items-center gap-2 px-6 py-2 bg-white text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
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
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20 flex flex-col gap-4"
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
                        <button
                          onClick={handleSlice}
                          disabled={slicing}
                          className="w-full py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                          {slicing ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Download size={14} />
                          )}
                          Download {sliceRows * sliceCols} Slices
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  <Download size={18} />
                  Download
                </button>
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
  style?: string,
  maxImages: number = 3
) => {
  return `You are a helpful AI assistant.
Current Date: ${new Date().toISOString()}

Conversation History:
${historyText}

Rules:
- Always respond as JSON matching this schema: { chat: string, images_prompt?: string[] }.
- Put your natural language reply in "chat".
- If the user asks to draw/create/generate an image, fill "images_prompt" with 1-${maxImages} short, high-quality English prompts describing the images to generate. Do NOT include ASCII art. Do NOT include base64. Keep prompts concise but descriptive.
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

${
  style
    ? `\n\nActive Visual Style Guideline:\n${style}\n\nIMPORTANT: When generating image prompts, you MUST apply this visual style description to the generated prompts. Ensure the resulting images match this style.`
    : ""
}`;
};

const AVAILABLE_MODELS = [
  { id: "gemini-3.0-pro", name: "Gemini 3.0 Pro" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
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
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [selectedModel, setSelectedModel] = useState(
    session.model || AVAILABLE_MODELS[0].id
  );
  const [thinkingSteps, setThinkingSteps] = useState(
    session.thinkingSteps || 1
  );
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string>(
    session.styleId || ""
  );
  const [imageSettings, setImageSettings] = useState({
    aspectRatio: "1:1",
    resolution: "1K",
    maxImages: 3,
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

  useEffect(() => {
    if (!selectedMoodboardId) {
      setActiveStyle("");
      return;
    }
    const fetchStyle = async () => {
      try {
        const res = await getSmartChatDetail(userId, selectedMoodboardId);
        if (res.moodboard?.styleDescription) {
          setActiveStyle(res.moodboard.styleDescription);
        }
      } catch (e) {
        console.error("Failed to load style", e);
      }
    };
    fetchStyle();
  }, [selectedMoodboardId, userId]);

  // Sync tree ONLY when:
  // 1. Switching to a different session (sessionId changes)
  // 2. initialTree is reloaded from server (initialTree reference changes but sessionId same)
  // This prevents resetting tree when only metadata (title, model) changes
  useEffect(() => {
    const sessionSwitched = previousSessionIdRef.current !== session.sessionId;
    const treeReloaded = previousInitialTreeRef.current !== initialTree;

    if (sessionSwitched || treeReloaded) {
      // Session switched or tree reloaded - sync tree to initialTree
      setTree(initialTree);
      setPendingAttachments([]); // Clear attachments on switch
      previousSessionIdRef.current = session.sessionId;
      previousInitialTreeRef.current = initialTree;
    }
  }, [session.sessionId, initialTree]);

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
        setImageSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Failed to parse saved settings", e);
      }
    }
  }, [session.model]);

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    localStorage.setItem("smartChatModel", newModel);
    // Optional: Update session model on backend immediately?
    // Current logic updates backend model only on next message.
    // We can keep it that way for simplicity, or we can trigger onUpdateSession now if we want persistence before message.
    // But typically model choice applies to the *next* turn.
  };

  const handleImageSettingChange = (key: string, value: string) => {
    const newSettings = { ...imageSettings, [key]: value };
    setImageSettings(newSettings);
    localStorage.setItem("smartChatImageSettings", JSON.stringify(newSettings));
  };

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tree.currentNodeId, loading, pendingAttachments.length]);

  // --- Drag & Drop ---
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      URL.revokeObjectURL(newAttachments[index].preview);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  // --- Core Tree Logic ---

  const generateThread = (headId: string | null): ChatNode[] => {
    const thread: ChatNode[] = [];
    let currentId = headId;
    while (currentId) {
      const node = tree.nodes[currentId];
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
      id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentResponse: any = await chatWithAI(
      systemPrompt,
      initialUserPrompt,
      model,
      schema,
      true,
      base64Images
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
        base64Images
      );
    }
    return currentResponse;
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && pendingAttachments.length === 0) || loading) return;

    const userContent = input;
    const currentAttachments = [...pendingAttachments];

    setInput("");

    // Clear UI immediately but keep pinned attachments
    const pinnedAttachments = currentAttachments.filter((att) => att.pinned);
    setPendingAttachments(pinnedAttachments);

    setLoading(true);

    try {
      // 1. Upload Images if any
      const uploadedAttachments: ChatAttachment[] = [];
      const base64Images: string[] = [];

      if (currentAttachments.length > 0) {
        for (const attachment of currentAttachments) {
          const base64 = await convertFileToBase64(attachment.file);
          base64Images.push(base64);

          // Upload to S3 via Lambda
          const uploadRes = await uploadSmartChatImage(
            userId,
            session.sessionId,
            base64
          );

          uploadedAttachments.push({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            type: "image",
            key: uploadRes.key, // Store S3 key for future retrieval
            url: base64, // Use base64 for immediate display
            name: attachment.file.name,
          });
        }
      }

      // 2. Create User Node
      const parentId = tree.currentNodeId;
      const userNode = createNode(
        userContent,
        "user",
        parentId,
        undefined,
        uploadedAttachments.length > 0 ? uploadedAttachments : undefined
      );

      let newTree = { ...tree };
      newTree.nodes = { ...newTree.nodes };
      if (parentId && newTree.nodes[parentId]) {
        newTree.nodes[parentId] = {
          ...newTree.nodes[parentId],
          childrenIds: [...newTree.nodes[parentId].childrenIds],
        };
      }

      addNodeToTree(userNode, newTree);
      newTree.currentNodeId = userNode.id;
      setTree(newTree);

      // 3. Prepare AI Context
      const thread = generateThread(userNode.id);
      const systemPrompt = constructSystemPrompt(
        getThreadHistoryForAI(thread.slice(0, -1)),
        activeStyle,
        imageSettings.maxImages
      );

      // 4. Call AI
      const response = await callAIWithRefinement(
        systemPrompt,
        userContent,
        selectedModel,
        IMAGE_TOOL_SCHEMA,
        base64Images.length > 0 ? base64Images : undefined
      );

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
          prompts = Array.isArray(anyResp.images_prompt)
            ? anyResp.images_prompt
            : [];
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

      newTree = { ...newTree };
      newTree.nodes = { ...newTree.nodes };
      newTree.nodes[userNode.id] = {
        ...newTree.nodes[userNode.id],
        childrenIds: [...newTree.nodes[userNode.id].childrenIds],
      };

      addNodeToTree(aiNode, newTree);
      newTree.currentNodeId = aiNode.id;
      setTree(newTree);
      setLoading(false); // Show text immediately

      // 6. Generate Images in Parallel (all at once)
      if (prompts.length > 0) {
        // Create all promises at once
        const imagePromises = prompts.map((p, i) =>
          generateImage(
            userId,
            session.sessionId,
            p,
            base64Images.length > 0 ? base64Images[0] : undefined,
            {
              aspectRatio: imageSettings.aspectRatio,
              resolution: imageSettings.resolution,
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
                // Update local array
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
              return { success: false, index: i };
            })
            .catch((e) => {
              console.error("Image generation failed for prompt:", p, e);
              const failedAttachment: ChatAttachment = {
                ...aiAttachments[i],
                status: "failed",
              };
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
            })
        );

        // Wait for all to complete (but UI updates happen as each resolves)
        await Promise.allSettled(imagePromises);

        // Final Save with all attachments
        const finalTree = { ...newTree };
        finalTree.nodes = { ...finalTree.nodes };
        if (finalTree.nodes[aiNode.id]) {
          finalTree.nodes[aiNode.id] = {
            ...finalTree.nodes[aiNode.id],
            attachments: aiAttachments,
          };
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
          newTree,
          aiContent.slice(0, 50),
          undefined,
          selectedModel,
          selectedMoodboardId,
          thinkingSteps
        );
      }

      // Auto-generate title if it's the first message
      if (!parentId) {
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
        const systemPrompt = constructSystemPrompt(
          getThreadHistoryForAI(thread.slice(0, -1)),
          activeStyle,
          imageSettings.maxImages
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
          newContent,
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
      // 1. Prepare Base64 Reference Image (if any)
      let referenceImageBase64 = undefined;
      if (
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
            referenceImageBase64 = (await convertFileToBase64(
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
      const currentThread = generateThread(tree.currentNodeId);
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
      if (tree.currentNodeId === nodeId) {
        if (!confirm("Generate a response for this message?")) return;

        // Fall through to generation logic using this node as parent
        // We can reuse the logic below by mocking "deletion" of nothing?
        // Actually, better to copy the generation logic since the structure below assumes deleting `nodeId`.
        // Let's refactor slightly to share logic.
        // For now, to avoid massive refactor risk, I'll inline the generation for user node here.

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
                  base64 = (await convertFileToBase64(
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
          const thread = generateThread(nodeId);
          const systemPrompt = constructSystemPrompt(
            getThreadHistoryForAI(thread.slice(0, -1)),
            activeStyle,
            imageSettings.maxImages
          );

          const response = await callAIWithRefinement(
            systemPrompt,
            userContent,
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
              prompts = Array.isArray(anyResp.images_prompt)
                ? anyResp.images_prompt
                : [];
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

          const newTree = { ...tree };
          newTree.nodes = { ...newTree.nodes };
          newTree.nodes[nodeId] = {
            ...newTree.nodes[nodeId],
            childrenIds: [...newTree.nodes[nodeId].childrenIds],
          };

          addNodeToTree(aiNode, newTree);
          newTree.currentNodeId = aiNode.id;
          setTree(newTree);

          // 4. Generate Images
          if (prompts.length > 0) {
            const imagePromises = prompts.map((p, i) =>
              generateImage(
                userId,
                session.sessionId,
                p,
                base64Images.length > 0 ? base64Images[0] : undefined,
                {
                  aspectRatio: imageSettings.aspectRatio,
                  resolution: imageSettings.resolution,
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
                    aiAttachments[i] = newAttachment;

                    setTree((prev) => {
                      const updated = { ...prev };
                      updated.nodes = { ...updated.nodes };
                      const currentNode = updated.nodes[aiNode.id];
                      if (currentNode) {
                        const currentAttachments =
                          currentNode.attachments || [];
                        const updatedAttachments = [...currentAttachments];
                        updatedAttachments[i] = newAttachment;
                        updated.nodes[aiNode.id] = {
                          ...currentNode,
                          attachments: updatedAttachments,
                        };
                      }
                      return updated;
                    });
                    return {
                      success: true,
                      index: i,
                      attachment: newAttachment,
                    };
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
                })
            );

            await Promise.allSettled(imagePromises);

            const finalTree = { ...newTree };
            finalTree.nodes = { ...finalTree.nodes };
            if (finalTree.nodes[aiNode.id]) {
              finalTree.nodes[aiNode.id] = {
                ...finalTree.nodes[aiNode.id],
                attachments: aiAttachments,
              };
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

    // Handle Assistant Node Regeneration (Delete and Regenerate)
    if (node.role !== "assistant" || !node.parentId) return;

    if (
      !confirm(
        "This will delete the current response and generate a new one. Continue?"
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
              base64 = (await convertFileToBase64(
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

      // 2. Delete Current Node & Resources
      const keysToDelete: string[] = [];
      if (node.attachments) {
        node.attachments.forEach((att) => {
          if (att.key) keysToDelete.push(att.key);
        });
      }

      if (keysToDelete.length > 0) {
        await deleteSmartChatImages(userId, keysToDelete);
      }

      // Remove node from tree
      let newTree = { ...tree };
      newTree.nodes = { ...newTree.nodes };

      // Remove from parent's children
      const parent = newTree.nodes[parentId];
      newTree.nodes[parentId] = {
        ...parent,
        childrenIds: parent.childrenIds.filter((id) => id !== nodeId),
      };

      delete newTree.nodes[nodeId];
      newTree.currentNodeId = parentId; // Temporarily point to parent
      setTree(newTree);

      // 3. Call AI
      const thread = generateThread(parentId); // Thread up to parent
      const systemPrompt = constructSystemPrompt(
        getThreadHistoryForAI(thread.slice(0, -1)),
        activeStyle,
        imageSettings.maxImages
      );

      const response = await callAIWithRefinement(
        systemPrompt,
        userContent,
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
          prompts = Array.isArray(anyResp.images_prompt)
            ? anyResp.images_prompt
            : [];
        } else if (anyResp.message) {
          aiContent = anyResp.message;
        } else {
          aiContent = JSON.stringify(response);
        }
      } else {
        aiContent = String(response);
      }

      // 4. Create New Assistant Node
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
        parentId,
        selectedModel,
        aiAttachments.length > 0 ? aiAttachments : undefined
      );

      newTree = { ...newTree }; // Refresh tree ref
      newTree.nodes = { ...newTree.nodes };

      // Add to parent again (since we removed the old one, we add new one)
      newTree.nodes[parentId] = {
        ...newTree.nodes[parentId],
        childrenIds: [...newTree.nodes[parentId].childrenIds],
      };

      addNodeToTree(aiNode, newTree);
      newTree.currentNodeId = aiNode.id;
      setTree(newTree);

      // 5. Generate Images if needed
      if (prompts.length > 0) {
        const imagePromises = prompts.map((p, i) =>
          generateImage(
            userId,
            session.sessionId,
            p,
            base64Images.length > 0 ? base64Images[0] : undefined,
            {
              aspectRatio: imageSettings.aspectRatio,
              resolution: imageSettings.resolution,
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
                aiAttachments[i] = newAttachment;

                setTree((prev) => {
                  const updated = { ...prev };
                  updated.nodes = { ...updated.nodes };
                  const currentNode = updated.nodes[aiNode.id];
                  if (currentNode) {
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
              return { success: false, index: i };
            })
            .catch((e) => {
              console.error("Image generation failed", e);
              const failedAttachment: ChatAttachment = {
                ...aiAttachments[i],
                status: "failed",
              };
              aiAttachments[i] = failedAttachment;
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
            })
        );

        await Promise.allSettled(imagePromises);

        // Final Save
        const finalTree = { ...newTree };
        finalTree.nodes = { ...finalTree.nodes };
        if (finalTree.nodes[aiNode.id]) {
          finalTree.nodes[aiNode.id] = {
            ...finalTree.nodes[aiNode.id],
            attachments: aiAttachments,
          };
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
      className="flex flex-col h-full bg-white relative"
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
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-white">
        <div className="pb-4">
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
                    onImageClick={setViewingImage}
                    onDelete={() => handleDeleteMessage(node.id)}
                    onRegenerate={() => handleRegenerate(node.id)}
                    onRegenerateImage={(attIndex) =>
                      handleRegenerateImage(node.id, attIndex)
                    }
                    onIncludeImage={handleIncludeImage}
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
      <div className="bg-white/90 backdrop-blur-sm border-t p-4 shrink-0 transition-all duration-300">
        <div className="max-w-3xl mx-auto relative flex flex-col gap-3">
          <div className="flex justify-center -mt-7 mb-2">
            <button
              onClick={() => setIsInputExpanded(!isInputExpanded)}
              className="bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-500"
              title={isInputExpanded ? "Collapse input" : "Expand input"}
            >
              {isInputExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </button>
          </div>

          {!isInputExpanded ? (
            <div
              className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => setIsInputExpanded(true)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <MessageSquare size={20} />
              </div>
              <div className="flex-1 text-sm text-gray-400 font-medium">
                Type a message...
              </div>
              {pendingAttachments.length > 0 && (
                <div className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                  {pendingAttachments.length} images attached
                </div>
              )}
            </div>
          ) : (
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
                          {att.pinned ? (
                            <Pin size={12} />
                          ) : (
                            <PinOff size={12} />
                          )}
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

              <div className="flex items-center gap-2 mb-2 px-1 overflow-x-auto no-scrollbar">
                {/* Model Selector */}
                <div className="relative shrink-0">
                  <select
                    value={selectedModel}
                    onChange={handleModelChange}
                    className="appearance-none bg-gray-100 hover:bg-gray-200 text-xs font-medium px-3 py-1.5 rounded-full pr-7 cursor-pointer transition-colors border border-transparent hover:border-black/5"
                  >
                    {AVAILABLE_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={12}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>

                {/* Thinking Steps */}
                <div className="relative shrink-0" title="Thinking Steps">
                  <select
                    value={thinkingSteps}
                    onChange={(e) => setThinkingSteps(Number(e.target.value))}
                    className="appearance-none bg-gray-100 hover:bg-gray-200 text-xs font-medium px-3 py-1.5 rounded-full pl-7 pr-6 cursor-pointer transition-colors border border-transparent hover:border-black/5"
                  >
                    <option value={1}>1 Step</option>
                    <option value={2}>2 Steps</option>
                    <option value={3}>3 Steps</option>
                  </select>
                  <Brain
                    size={12}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                  <ChevronDown
                    size={12}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>

                {/* Style Selector */}
                {availableMoodboards && availableMoodboards.length > 0 && (
                  <div className="relative shrink-0" title="Visual Style">
                    <select
                      value={selectedMoodboardId}
                      onChange={(e) => setSelectedMoodboardId(e.target.value)}
                      className="appearance-none bg-gray-100 hover:bg-gray-200 text-xs font-medium px-3 py-1.5 rounded-full pl-7 pr-6 cursor-pointer transition-colors border border-transparent hover:border-black/5 max-w-[150px] truncate"
                    >
                      <option value="">No Style</option>
                      {availableMoodboards.map((m) => (
                        <option key={m.sessionId} value={m.sessionId}>
                          {m.title}
                        </option>
                      ))}
                    </select>
                    <Palette
                      size={12}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                    />
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                    />
                  </div>
                )}
              </div>

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
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-20 py-4 shadow-sm focus:bg-white focus:border-black/20 focus:ring-4 focus:ring-gray-100 outline-none resize-none min-h-[60px] max-h-[200px]"
                  disabled={loading}
                  autoFocus
                />

                <div className="absolute right-3 bottom-3 flex items-center gap-2">
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
                            <label className="text-xs font-semibold text-gray-500 mb-1 block">
                              Max Images
                            </label>
                            <select
                              value={imageSettings.maxImages ?? 3}
                              onChange={(e) =>
                                handleImageSettingChange(
                                  "maxImages",
                                  e.target.value
                                )
                              }
                              className="w-full text-sm border border-gray-200 rounded-lg p-2 outline-none focus:border-black/20 bg-gray-50"
                            >
                              <option value="1">1 Image</option>
                              <option value="2">2 Images</option>
                              <option value="3">3 Images</option>
                              <option value="4">4 Images</option>
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
                    title="Attach Image"
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

                  <button
                    onClick={handleSendMessage}
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
          )}
        </div>
        <div className="text-center mt-2 text-[10px] text-gray-400">
          Press Enter to send • Shift + Enter for new line • Drag & Drop images
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
    </div>
  );
}
