"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { studio, useStudio } from "@/features/game-design/studio/store";
import { STATION_META } from "@/features/game-design/studio/types";
import { Crumbs, Difficulty, Empty, StatusPill, TopBar } from "./ui";
import { useMaps } from "./useMaps";
import MapPreview from "./MapPreview";

export default function WorldsIndex() {
  const data = useStudio();
  const maps = useMaps();
  const router = useRouter();
  return (
    <>
      <TopBar
        right={
          <button
            onClick={() => {
              const w = studio.addWorld();
              router.push(`/game_design/worlds/${w.id}?tab=settings`);
            }}
            className="btn-solid"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm world
          </button>
        }
      >
        <Crumbs items={[{ label: "Worlds" }]} />
      </TopBar>
      <div className="flex-1 min-h-0 overflow-auto p-5">
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">Mỗi world là một quốc gia. Vào world để sắp xếp level, gán map và thiết kế món ăn.</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {data.worlds.map((w) => {
            const levels = w.levelIds.map((id) => data.levels.find((l) => l.id === id)).filter(Boolean);
            const dishes = w.dishIds.map((id) => data.dishes.find((d) => d.id === id)).filter(Boolean);
            const firstMap = maps.find((m) => m.id === levels[0]?.mapId) ?? null;
            const maxDiff = Math.max(0, ...levels.map((l) => l!.difficulty));
            return (
              <Link key={w.id} href={`/game_design/worlds/${w.id}`} className="panel hover:-translate-y-0.5 transition-transform flex flex-col">
                <div className="h-36 relative border-b-2 border-black" style={{ background: w.accent }}>
                  <MapPreview doc={firstMap} className="absolute inset-3 border border-black opacity-90" />
                  <span className="absolute -bottom-4 left-3 w-12 h-12 grid place-items-center text-3xl bg-white border-2 border-black">{w.flag}</span>
                </div>
                <div className="p-3 pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-lg font-bold">{w.name}</div>
                    <StatusPill status={w.status} />
                  </div>
                  <div className="text-xs text-gray-500">{w.region} · {w.theme || "chưa có theme"}</div>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2 min-h-[2.5rem]">{w.description || "Chưa có mô tả."}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <Stat k="Levels" v={levels.length} />
                    <Stat k="Món" v={dishes.length} />
                    <div className="border border-black/15 py-1">
                      <div className="label-caps">Khó nhất</div>
                      <div className="flex justify-center mt-1">
                        <Difficulty value={maxDiff} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 flex-wrap">
                    <span className="text-base leading-none">{dishes.slice(0, 6).map((d) => d!.emoji).join(" ")}</span>
                    <span className="flex-1" />
                    {w.defaultStations.map((s) => (
                      <span key={s} className="text-[10px] uppercase tracking-wider border border-black/30 px-1">
                        {STATION_META[s].short}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {!data.worlds.length && <Empty title="Chưa có world" hint="Bấm Thêm world để bắt đầu." />}
      </div>
    </>
  );
}

function Stat({ k, v }: { k: string; v: number }) {
  return (
    <div className="border border-black/15 py-1">
      <div className="label-caps">{k}</div>
      <div className="text-lg font-bold tabular-nums leading-tight">{v}</div>
    </div>
  );
}
