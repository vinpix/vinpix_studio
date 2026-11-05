"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Settings2, Trash2, UtensilsCrossed, type LucideIcon, Layers3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { studio, useStudio, worldOf } from "@/features/game-design/studio/store";
import { Crumbs, Empty, StatusPill, TopBar } from "./ui";
import LevelsTab from "./tabs/LevelsTab";
import DishesTab from "./tabs/DishesTab";
import SettingsTab from "./tabs/SettingsTab";

export type WorldTab = "levels" | "dishes" | "settings";
const TABS: Array<{ id: WorldTab; label: string; icon: LucideIcon; hint: string }> = [
  { id: "levels", label: "Levels", icon: Layers3, hint: "Tiến trình, map và món mở theo level" },
  { id: "dishes", label: "Món ăn", icon: UtensilsCrossed, hint: "Danh sách món của world" },
  { id: "settings", label: "Cài đặt", icon: Settings2, hint: "Tên, vùng, trạm mặc định" },
];

export default function WorldScreen({ worldId }: { worldId: string }) {
  const data = useStudio();
  const router = useRouter();
  const params = useSearchParams();
  const world = worldOf(data, worldId);
  const tab = (params.get("tab") as WorldTab) || "levels";

  const setTab = (t: WorldTab) => router.replace(`/game_design/worlds/${worldId}?tab=${t}`);

  if (!world) {
    return (
      <>
        <TopBar>
          <Crumbs items={[{ label: "Worlds", onClick: () => router.push("/game_design/worlds") }, { label: "Không tìm thấy" }]} />
        </TopBar>
        <div className="p-6">
          <Empty title="World không tồn tại" hint="Có thể đã bị xoá hoặc dữ liệu đã reset." />
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        right={
          <>
            <button onClick={() => studio.updateWorld(world.id, { status: world.status === "active" ? "draft" : "active" })} title="Đổi trạng thái">
              <StatusPill status={world.status} />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Xoá world "${world.name}" cùng toàn bộ level và món?`)) {
                  studio.removeWorld(world.id);
                  router.replace("/game_design/worlds");
                }
              }}
              className="btn-outline text-red-600 border-red-600"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xoá world
            </button>
          </>
        }
      >
        <Crumbs items={[{ label: "Worlds", onClick: () => router.push("/game_design/worlds") }, { label: world.name }, { label: TABS.find((t) => t.id === tab)!.label }]} />
      </TopBar>

      <div className="px-5 pt-3 bg-white border-b-2 border-black">
        <div className="flex items-center gap-3 pb-3">
          <span className="w-12 h-12 grid place-items-center text-3xl border-2 border-black" style={{ background: world.accent }}>
            {world.flag}
          </span>
          <div className="min-w-0">
            <div className="text-2xl font-bold leading-tight">{world.name}</div>
            <div className="text-sm text-gray-500 truncate">
              {world.levelIds.length} levels · {world.dishIds.length} món · {world.region}
            </div>
          </div>
        </div>
        <div role="tablist" className="flex gap-1 -mb-0.5">
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            const count = t.id === "levels" ? world.levelIds.length : t.id === "dishes" ? world.dishIds.length : null;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                title={t.hint}
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-4 text-[13px] font-bold uppercase tracking-wider border-2 border-b-0 transition-colors",
                  active ? "bg-black text-white border-black" : "bg-[#f7f7f7] text-gray-600 border-black/20 hover:border-black hover:text-black hover:bg-white",
                )}
              >
                <Icon className="w-4 h-4" />
                {t.label}
                {count !== null && (
                  <span className={cn("min-w-5 h-5 px-1.5 grid place-items-center text-[10px] tabular-nums border", active ? "border-white/40 text-white" : "border-black/20 text-gray-500")}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "levels" && <LevelsTab world={world} data={data} />}
      {tab === "dishes" && <DishesTab world={world} data={data} />}
      {tab === "settings" && <SettingsTab world={world} />}
    </>
  );
}
