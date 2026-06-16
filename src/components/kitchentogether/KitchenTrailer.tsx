"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Play } from "lucide-react";

interface KitchenTrailerProps {
  youtubeId: string;
  start?: number;
}

export default function KitchenTrailer({
  youtubeId,
  start = 0,
}: KitchenTrailerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const src = useMemo(
    () =>
      `https://www.youtube.com/embed/${youtubeId}?start=${start}&autoplay=1`,
    [youtubeId, start]
  );

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video overflow-hidden border-2 border-black bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title="Kitchen Together 2 — Gameplay Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label="Play gameplay trailer"
      className="group relative block w-full aspect-video overflow-hidden border-2 border-black bg-black/5"
    >
      <Image
        src={thumbnailUrl}
        alt="Kitchen Together 2 gameplay"
        fill
        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-20 w-20 items-center justify-center border-2 border-white bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-9 w-9 fill-white text-white" />
        </span>
      </span>
      <span className="absolute bottom-0 left-0 bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
        Watch Trailer
      </span>
    </button>
  );
}
