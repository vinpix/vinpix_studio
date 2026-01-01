"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Plus, Trash2, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ShowcaseImage {
  id: string;
  url: string;
  name: string;
  size: string;
}

export default function ImageShowcase() {
  const [images, setImages] = useState<ShowcaseImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: ShowcaseImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          url,
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // Clean up object URLs to prevent memory leaks
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return filtered;
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
  };

  return (
    <div className="space-y-8">
      {/* Header / Stats */}
      <div className="flex justify-between items-end border-b-2 border-black pb-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Gallery Showcase
          </h2>
          <p className="text-sm font-mono text-black/50 mt-1">
            {images.length} {images.length === 1 ? "IMAGE" : "IMAGES"} LOADED
          </p>
        </div>
        {images.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 px-3 py-2 transition-colors border border-transparent hover:border-red-200"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Upload Area */}
      {images.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative group cursor-pointer border-4 border-dashed transition-all duration-300 min-h-[400px] flex flex-col items-center justify-center p-12 ${
            isDragging
              ? "border-black bg-black/5 scale-[0.99]"
              : "border-black/10 hover:border-black/40 bg-white"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
          />
          <div className="relative">
            <motion.div
              animate={isDragging ? { y: [0, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
              className="bg-black text-white p-6 rounded-full mb-6"
            >
              <Upload size={40} strokeWidth={2.5} />
            </motion.div>
            <div className="absolute -top-2 -right-2 bg-white border-2 border-black p-1">
              <Plus size={16} strokeWidth={3} />
            </div>
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
            Drop your shots here
          </h3>
          <p className="text-black/40 font-medium max-w-xs text-center">
            Upload multiple images to see the magic happen. Only image files will be filtered.
          </p>
          
          <div className="mt-8 flex gap-4">
            <div className="px-4 py-2 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">JPG</div>
            <div className="px-4 py-2 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">PNG</div>
            <div className="px-4 py-2 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">WEBP</div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -5 }}
                className="group relative aspect-[4/5] bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 p-2"
              >
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-gray-50">
                  <Image
                    src={img.url}
                    alt={img.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      className="bg-white text-black p-2 hover:bg-red-500 hover:text-white transition-colors border border-black"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  </div>
                  
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">
                      {img.size}
                    </p>
                    <h4 className="text-white font-black uppercase tracking-tight text-lg line-clamp-1">
                      {img.name}
                    </h4>
                    <div className="mt-4 flex gap-2">
                       <button className="flex-1 bg-white text-black text-[10px] font-black uppercase tracking-widest py-2 hover:bg-gray-200 transition-colors">
                          View Full
                       </button>
                    </div>
                  </div>
                </div>

                {/* Index Badge */}
                <div className="absolute top-4 left-4 bg-black text-white w-8 h-8 flex items-center justify-center font-black text-xs border border-white/20">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
              </motion.div>
            ))}

            {/* Add More Button */}
            <motion.button
              layout
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[4/5] border-2 border-dashed border-black/20 hover:border-black flex flex-col items-center justify-center gap-4 transition-colors group bg-black/5 hover:bg-white"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFiles(e.target.files)}
                multiple
                accept="image/*"
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full border-2 border-black/20 group-hover:border-black flex items-center justify-center group-hover:rotate-90 transition-all duration-500">
                <Plus size={24} className="text-black/20 group-hover:text-black" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-black/20 group-hover:text-black">
                Add More
              </span>
            </motion.button>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
