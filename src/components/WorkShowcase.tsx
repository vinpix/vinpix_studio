"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import game1Png from "@/../public/game1.png";
import game3Png from "@/../public/game3.png";
import game4Png from "@/../public/game4.png";

type Game = {
  id: string;
  title: string;
  description: string;
  iconSrc: string | StaticImageData;
  chplayHref?: string;
  iosHref?: string;
  youtubeId: string;
  youtubeStart?: number;
  isHot?: boolean;
};

const gamesSeed: Game[] = [
  {
    id: "pixel-dreamer",
    title: "Pixel Dreamer",
    description: "My debut title. Built in 4 months of sleepless nights. A testament to starting somewhere.",
    iconSrc: game1Png,
    chplayHref: "#",
    iosHref: "#",
    youtubeId: "z6TOB3UpGas",
    youtubeStart: 1,
  },
  {
    id: "last-dungeon",
    title: "Last Dungeon",
    description: "A dungeon crawler where you craft your own fate (and weapons). Pure roguelike chaos.",
    iconSrc: game3Png,
    chplayHref:
      "https://play.google.com/store/apps/details?id=com.Vinpix.TheLastDungeon",
    iosHref: "https://apps.apple.com/us/app/the-last-dungeon/id1579078459",
    youtubeId: "NSE5iLqZHTQ",
    youtubeStart: 33,
  },
  {
    id: "kitchen-together",
    title: "Kitchen Together",
    description: "Co-op chaos. Yell at your friends, burn some virtual food, and try not to ruin friendships.",
    iconSrc: game4Png,
    chplayHref:
      "https://play.google.com/store/apps/details?id=com.kitchentogether",
    iosHref: "https://apps.apple.com/lt/app/kitchen-together/id6480278549",
    youtubeId: "f8bi1PyrmX8",
    youtubeStart: 0,
    isHot: true,
  },
];

function YouTubeEmbed({ id, start = 0 }: { id: string; start?: number }) {
  const src = useMemo(
    () => `https://www.youtube.com/embed/${id}?start=${start}`,
    [id, start]
  );
  return (
    <div className="relative w-full aspect-video bg-black/5 overflow-hidden">
      <iframe
        className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
        src={src}
        title="Game Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export default function WorkShowcase() {
  const [index, setIndex] = useState(2);
  const games = gamesSeed;
  const game = games[index];

  return (
    <div className="w-full">
      {/* List / Tabs */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 border-b border-black pb-4">
        {games.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setIndex(i)}
            className={`relative text-2xl sm:text-4xl font-bold tracking-tight uppercase transition-all duration-300 ${
              i === index
                ? "text-black opacity-100"
                : "text-black/30 hover:text-black/60 hover:translate-x-1"
            }`}
          >
            {g.title}
            {g.isHot && (
              <span className="absolute -top-2 -right-6 text-[10px] sm:text-xs bg-[#FF3333] text-white px-1.5 py-0.5 rounded-sm font-black tracking-widest animate-pulse">
                HOT
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Content Info */}
          <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1 h-full">
            <div>
              {game.isHot && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4 inline-block border border-black bg-black px-3 py-1 text-xs font-bold text-white uppercase tracking-widest"
                >
                  Community Favorite
                </motion.div>
              )}
              
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-bold uppercase tracking-widest mb-2"
              >
                Description
              </motion.h3>
              <p className="text-xl sm:text-2xl leading-snug font-medium mb-8">
                {game.description}
              </p>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-bold uppercase tracking-widest mb-2"
              >
                Platform
              </motion.h3>
              <div className="flex flex-col gap-2 items-start">
                {game.chplayHref && (
                  <a
                    href={game.chplayHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-lg font-bold border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
                  >
                    GOOGLE PLAY
                    <span className="text-xs group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                      ↗
                    </span>
                  </a>
                )}
                {game.iosHref && (
                  <a
                    href={game.iosHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-lg font-bold border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
                  >
                    APP STORE
                    <span className="text-xs group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8">
              <div className="w-20 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={game.iconSrc}
                  alt="Icon"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <YouTubeEmbed id={game.youtubeId} start={game.youtubeStart} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
