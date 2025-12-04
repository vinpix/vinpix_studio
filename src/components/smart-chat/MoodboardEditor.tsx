import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Loader2,
  Upload,
  Sparkles,
  Save,
  Trash2,
  X,
  Palette,
  LayoutGrid,
} from "lucide-react";
import { MoodboardData, ChatSessionMetadata } from "@/types/smartChat";
import {
  uploadSmartChatImage,
  deleteSmartChatImages,
  updateSmartChatMoodboard,
  analyzeSmartChatMoodboard,
  getPresignedUrl,
} from "@/lib/smartChatApi";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MoodboardEditorProps {
  userId: string;
  metadata: ChatSessionMetadata;
  initialData: MoodboardData;
  onUpdate: (newData: MoodboardData, newTitle?: string) => void;
}

export function MoodboardEditor({
  userId,
  metadata,
  initialData,
  onUpdate,
}: MoodboardEditorProps) {
  const [data, setData] = useState<MoodboardData>(initialData);
  const [title, setTitle] = useState(metadata.title || "Untitled Moodboard");
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with initialData if it changes (e.g. from parent re-fetch)
  useEffect(() => {
    setData(initialData);
    setTitle(metadata.title || "Untitled Moodboard");
  }, [initialData, metadata.title]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target?.result) return reject("Failed to read file");

        const imageElement = new window.Image();
        imageElement.src = e.target.result as string;

        imageElement.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = imageElement.width;
          canvas.height = imageElement.height;

          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas context not available");

          ctx.drawImage(imageElement, 0, 0);

          // Compress to WebP at 50%
          const compressedBase64 = canvas.toDataURL("image/webp", 0.5);
          resolve(compressedBase64);
        };

        imageElement.onerror = (err) => reject(err);
      };

      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    const newImages = [...data.images];

    try {
      await Promise.all(
        files.map(async (file) => {
          if (!file.type.startsWith("image/")) return;

          try {
            const base64 = await compressImage(file);

            const res = await uploadSmartChatImage(
              userId,
              metadata.sessionId,
              base64
            );

            if (res.success) {
              newImages.push({
                key: res.key,
                url: base64, // Use compressed base64 for immediate preview
                name: file.name.replace(/\.[^/.]+$/, "") + ".webp", // Update extension
              });
            }
          } catch (e) {
            console.error("Image processing/upload failed", e);
          }
        })
      );

      const newData = { ...data, images: newImages };
      setData(newData);
      await updateSmartChatMoodboard(
        userId,
        metadata.sessionId,
        newImages,
        undefined
      );
      onUpdate(newData);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
    }
  };

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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDeleteImage = async (index: number) => {
    if (!confirm("Remove this image?")) return;

    // Copy current images
    const currentImages = [...data.images];

    // Identify image to delete and filter it out
    const imageToDelete = currentImages[index];
    const newImages = currentImages.filter((_, i) => i !== index);

    const newData = { ...data, images: newImages };

    // Optimistic update
    setData(newData);
    onUpdate(newData);

    // Sync with backend
    try {
      // Delete file from S3
      await deleteSmartChatImages(userId, [imageToDelete.key]);
      // Update moodboard record with new list
      await updateSmartChatMoodboard(
        userId,
        metadata.sessionId,
        newImages,
        undefined
      );
    } catch (e) {
      console.error("Failed to delete image", e);
      // Revert on error if needed, but for now we just log
    }
  };

  const handleAnalyze = async () => {
    if (data.images.length === 0) return;
    setAnalyzing(true);
    try {
      const res = await analyzeSmartChatMoodboard(userId, metadata.sessionId);
      if (res.success && res.styleDescription) {
        const newData = { ...data, styleDescription: res.styleDescription };
        setData(newData);
        onUpdate(newData);
      } else {
        alert("Analysis failed or returned empty description.");
      }
    } catch (e) {
      console.error("Analysis error", e);
      alert("Failed to analyze images.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveDescription = async () => {
    setSaving(true);
    try {
      await updateSmartChatMoodboard(
        userId,
        metadata.sessionId,
        undefined,
        data.styleDescription,
        title
      );
      // Notify parent to update list
      onUpdate({ ...data, styleDescription: data.styleDescription }, title);
    } catch (e) {
      console.error("Save error", e);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // Resolve presigned URLs for images that don't have them (e.g. on page reload)
  useEffect(() => {
    const loadUrls = async () => {
      let updated = false;
      const newImages = await Promise.all(
        data.images.map(async (img) => {
          if (!img.url || !img.url.startsWith("data:")) {
            // It's a key, fetch presigned url
            try {
              const url = await getPresignedUrl(img.key);
              updated = true;
              return { ...img, url };
            } catch (e) {
              console.error("Failed to get url for", img.key);
              return img;
            }
          }
          return img;
        })
      );

      if (updated) {
        setData((prev) => ({ ...prev, images: newImages }));
      }
    };

    // Only run if there are images without URLs
    if (data.images.some((img) => !img.url)) {
      loadUrls();
    }
  }, [data.images]);

  const handleTitleSave = async () => {
    if (title === metadata.title) return; // No change

    // Optimistic update in parent immediately
    onUpdate(data, title);

    try {
      await updateSmartChatMoodboard(
        userId,
        metadata.sessionId,
        undefined,
        undefined, // Don't overwrite description if not intended, though backend handles merging if we pass current?
        // Actually our updateSmartChatMoodboard wrapper sends all args.
        // Backend handles None/undefined args by not updating them?
        // Let's check backend... backend checks `if style_description is not None`.
        // So passing undefined is safe.
        title
      );
    } catch (e) {
      console.error("Title save error", e);
      // Revert if failed? For now just alert
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-gray-50/50 relative"
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
            className="absolute inset-0 z-50 bg-purple-500/10 backdrop-blur-sm border-2 border-purple-500 border-dashed rounded-lg m-4 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-3">
              <Upload className="w-12 h-12 text-purple-500" />
              <p className="font-bold text-lg text-purple-600">
                Drop images here
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-6 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Palette className="text-purple-600" />
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur(); // Triggers onBlur
                }
              }}
              className="font-bold text-lg leading-none bg-transparent outline-none focus:border-b focus:border-purple-500 transition-colors w-64"
              placeholder="Moodboard Name"
            />
            <p className="text-xs text-gray-500 mt-1">
              {data.images.length} images •{" "}
              {data.styleDescription ? "Style Analyzed" : "No Analysis"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <LayoutGrid size={18} /> Reference Images
            </h3>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
            >
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              Upload Images
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
            />
          </div>

          {data.images.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors min-h-[300px]"
            >
              <Upload size={48} className="mb-4 opacity-50" />
              <p className="font-medium">Drop images here or click to upload</p>
              <p className="text-sm mt-2">
                Upload multiple images to analyze their style
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {data.images.map((img, idx) => (
                  <motion.div
                    key={img.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-200"
                  >
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={img.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Loader2 className="animate-spin text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => handleDeleteImage(idx)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right: Analysis Panel */}
        <div className="w-full md:w-96 bg-white border-l border-gray-200 flex flex-col shadow-lg z-20">
          <div className="p-4 border-b border-gray-200 bg-gray-50/50">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-500" /> Style Analysis
            </h3>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4">
            <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg leading-relaxed border border-blue-100">
              The AI will analyze your images to create a "Style Profile". This
              text will be used to guide image generation in your chats.
            </div>

            <div className="flex-1 relative">
              <textarea
                value={data.styleDescription}
                onChange={(e) =>
                  setData({ ...data, styleDescription: e.target.value })
                }
                placeholder="Style description will appear here..."
                className="w-full h-full p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 outline-none transition-all text-sm leading-relaxed"
              />
              {!data.styleDescription && !analyzing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-400 text-sm">No analysis yet</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || data.images.length === 0}
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
              >
                {analyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Analyzing
                    Images...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Analyze Style
                  </>
                )}
              </button>

              <button
                onClick={handleSaveDescription}
                disabled={saving}
                className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
