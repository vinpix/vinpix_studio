"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useState } from "react";
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
};

const gamesSeed: Game[] = [
  {
    id: "pixel-dreamer",
    title: "Pixel Dreamer",
    description: "This is my first game, completed in 4 months.",
    iconSrc: game1Png,
    chplayHref: "#",
    iosHref: "#",
    youtubeId: "z6TOB3UpGas",
    youtubeStart: 1,
  },
  {
    id: "last-dungeon",
    title: "Last Dungeon",
    description: "Explore the amazing dungeon, create your own weapon.",
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
    description: "A cozy co-op cooking adventure with friends.",
    iconSrc: game4Png,
    chplayHref:
      "https://play.google.com/store/apps/details?id=com.kitchentogether",
    iosHref: "https://apps.apple.com/lt/app/kitchen-together/id6480278549",
    youtubeId: "f8bi1PyrmX8",
    youtubeStart: 0,
  },
];

function YouTubeEmbed({ id, start = 0 }: { id: string; start?: number }) {
  const src = useMemo(
    () => `https://www.youtube.com/embed/${id}?start=${start}`,
    [id, start]
  );
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-foreground/10 shadow-md">
      <iframe
        className="absolute inset-0 w-full h-full"
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
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const games = gamesSeed;
  const game = games[index % games.length];

  useEffect(() => {
    setIsAnimating(true);
    const id = setTimeout(() => setIsAnimating(false), 200);
    return () => clearTimeout(id);
  }, [index]);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % games.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + games.length) % games.length);
  };

  const slideClass = isAnimating
    ? direction === 1
      ? "opacity-0 translate-x-3"
      : "opacity-0 -translate-x-3"
    : "opacity-100 translate-x-0";

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center rounded-xl border border-foreground/15 bg-background/70 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out ${slideClass}`}
    >
      <div className="flex flex-col items-start gap-3">
        <Image
          src={game.iconSrc}
          alt={`${game.title} cover`}
          width={180}
          height={180}
          className="rounded-lg shadow-md"
          priority
        />
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            {game.title}
          </h2>
          <p className="mt-1 text-base sm:text-lg opacity-90">
            {game.description}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-3">
          {game.chplayHref && (
            <a
              href={game.chplayHref}
              className="text-teal-400 hover:text-teal-300 underline-offset-4 hover:underline"
            >
              Play on CHPlay
            </a>
          )}
          <span className="opacity-40">|</span>
          {game.iosHref && (
            <a
              href={game.iosHref}
              className="text-teal-400 hover:text-teal-300 underline-offset-4 hover:underline"
            >
              Play on iOS
            </a>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={prev}
            className="inline-flex items-center justify-center rounded-full p-2 border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 transition-colors"
            aria-label="Previous project"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 5l-8 7 8 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="inline-flex items-center justify-center rounded-full p-2 border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 transition-colors"
            aria-label="Next project"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 5l8 7-8 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {games.map((g, i) => {
            const active = i === index;
            return (
              <button
                key={g.id}
                aria-label={`Go to ${g.title}`}
                aria-current={active}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  active
                    ? "w-6 bg-teal-400"
                    : "w-2.5 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <YouTubeEmbed id={game.youtubeId} start={game.youtubeStart} />
      </div>
    </div>
  );
}
