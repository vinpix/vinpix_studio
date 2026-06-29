"use client";

import { Box, ImageIcon, Clock } from "lucide-react";
import type { ImageBatch } from "@/types/batch";
import { SecureImage } from "@/components/smart-chat/SecureImage";

interface BatchCardProps {
  batch: ImageBatch;
  onOpen: (batch: ImageBatch) => void;
}

function batchCover(batch: ImageBatch): string[] {
  const keys = batch.images.map((i) => i.key).filter(Boolean);
  return keys.slice(0, 4);
}

export function BatchCard({ batch, onOpen }: BatchCardProps) {
  const cover = batchCover(batch);
  const modelCount = batch.images.filter(
    (i) => i.model3d?.status === "success"
  ).length;
  const pendingCount = batch.images.filter(
    (i) => i.model3d?.status === "queued" || i.model3d?.status === "running"
  ).length;

  return (
    <button
      onClick={() => onOpen(batch)}
      className="group flex flex-col border-2 border-black bg-white text-left transition-transform active:translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
    >
      {/* cover mosaic */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b-2 border-black bg-[#F0F0F0]">
        {cover.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-black/25">
            <ImageIcon size={28} />
            <span className="font-mono text-[9px] uppercase tracking-widest">
              Trống
            </span>
          </div>
        ) : (
          <div
            className={`grid h-full w-full gap-px bg-black ${
              cover.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {cover.map((key, i) => (
              <div
                key={key}
                className={`relative overflow-hidden bg-[#F0F0F0] ${
                  cover.length === 3 && i === 0 ? "row-span-2" : ""
                }`}
              >
                <SecureImage
                  storageKey={key}
                  alt={batch.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {pendingCount > 0 ? (
          <span className="absolute right-2 top-2 flex items-center gap-1 border border-black bg-amber-300 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide">
            <Clock size={10} /> Chờ xử lý
          </span>
        ) : modelCount > 0 ? (
          <span className="absolute right-2 top-2 flex items-center gap-1 border border-black bg-emerald-400 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide">
            <Box size={10} /> {modelCount}
          </span>
        ) : null}
      </div>

      {/* meta */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <span className="truncate text-sm font-black uppercase tracking-tight">
          {batch.name}
        </span>
        <span className="shrink-0 font-mono text-[11px] font-bold tabular-nums text-black/45">
          {batch.images.length} ảnh
        </span>
      </div>
    </button>
  );
}
