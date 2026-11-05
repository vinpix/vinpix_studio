"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { levelCode, useStudio, worldOf } from "@/features/game-design/studio/store";
import GameDesignApp from "../GameDesignApp";

export default function MapStudioClient() {
  const params = useSearchParams();
  const data = useStudio();
  const map = params.get("map");
  const back = params.get("back");
  const level = back ? data.levels.find((l) => l.id === back) ?? null : null;
  const world = level ? worldOf(data, level.worldId) : null;
  return (
    <div className="h-full flex flex-col">
      {level && world && (
        <div className="h-9 shrink-0 bg-black text-white flex items-center gap-3 px-3 text-xs">
          <Link href={`/game_design/worlds/${world.id}?tab=levels&level=${level.id}`} className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Về level {levelCode(data, level)}
          </Link>
          <span className="text-white/60">
            {world.flag} {world.name} · {level.name} · map tự lưu khi chỉnh
          </span>
        </div>
      )}
      <div className="flex-1 min-h-0">
        <GameDesignApp key={map ?? "default"} initialMapId={map} />
      </div>
    </div>
  );
}
