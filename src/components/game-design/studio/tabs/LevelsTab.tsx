"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock, ExternalLink, Play, Plus, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { availableDishIds, dishesOf, levelCode, levelsOf, studio, useStudio } from "@/features/game-design/studio/store";
import { STATION_META, type Dish, type Level, type World } from "@/features/game-design/studio/types";
import { Chip, Difficulty, Empty, Field, Section, StarRow } from "../ui";
import { useMaps } from "../useMaps";
import MapPreview from "../MapPreview";

type Data = ReturnType<typeof useStudio>;

export default function LevelsTab({ world, data }: { world: World; data: Data }) {
  const router = useRouter();
  const params = useSearchParams();
  const maps = useMaps();
  const levels = levelsOf(data, world);
  const dishes = dishesOf(data, world);
  const levelId = params.get("level");
  const level = levels.find((l) => l.id === levelId) ?? levels[0] ?? null;
  const idx = level ? levels.indexOf(level) : -1;
  const [preview, setPreview] = useState(false);

  const pick = (id: string | null) => router.replace(`/game_design/worlds/${world.id}?tab=levels${id ? `&level=${id}` : ""}`);
  const mapOf = (l: Level) => maps.find((m) => m.id === l.mapId) ?? null;

  return (
    <div className="flex-1 min-h-0 flex">
      <div className="flex-1 min-w-0 min-h-0 overflow-auto p-5 flex flex-col gap-5">
        {/* strip */}
        <div className="shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="label-caps">Tiến trình · {levels.length} levels</div>
            <div className="flex gap-1.5">
              <button onClick={() => setPreview(true)} className="btn-outline" disabled={!levels.length}>
                <Play className="w-3.5 h-3.5" /> Preview
              </button>
              <button onClick={() => pick(studio.addLevel(world.id).id)} className="btn-solid">
                <Plus className="w-3.5 h-3.5" /> Thêm level
              </button>
            </div>
          </div>
          <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
            {levels.map((l, i) => {
              const active = l.id === level?.id;
              const avail = availableDishIds(data, l);
              return (
                <div key={l.id} className="flex items-center gap-2 shrink-0">
                  <button onClick={() => pick(l.id)} className={cn("panel w-44 text-left relative transition-transform hover:-translate-y-0.5", active && "outline outline-2 outline-black outline-offset-2")}>
                    {l.newDishIds.length > 0 && <span className="absolute top-1.5 right-1.5 z-10 bg-black text-white text-[9px] font-bold uppercase tracking-wider px-1 h-4 leading-4">New</span>}
                    <div className="px-2 pt-2 font-mono text-xs text-gray-500">{levelCode(data, l)}</div>
                    <MapPreview doc={mapOf(l)} className="mx-2 h-24 border border-black" />
                    <div className="p-2">
                      <div className="text-sm font-semibold truncate">{l.name}</div>
                      <div className="mt-1 flex gap-1 h-6 items-center">
                        {avail.slice(0, 5).map((d) => (
                          <span key={d} className={cn("text-base leading-none", !l.newDishIds.includes(d) && "opacity-50")} title={data.dishes.find((x) => x.id === d)?.name}>
                            {data.dishes.find((x) => x.id === d)?.emoji}
                          </span>
                        ))}
                        {!avail.length && <span className="text-[10px] text-gray-400">chưa có món</span>}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
                        Độ khó <Difficulty value={l.difficulty} />
                      </div>
                    </div>
                  </button>
                  {i < levels.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400" />}
                </div>
              );
            })}
            {!levels.length && <Empty title="Chưa có level" hint="Bấm Thêm level. Mỗi level được tạo sẵn một map mẫu." />}
          </div>
        </div>

        {/* matrix (read-only) */}
        {levels.length > 0 && (
          <div className="panel shrink-0">
            <div className="flex items-center gap-4 px-4 py-2.5 border-b border-black/15">
              <span className="text-sm font-semibold">Món theo level</span>
              <span className="text-[11px] text-gray-500">Click cột để chọn level. Gán món mới ở panel bên phải.</span>
              <div className="flex-1" />
              <span className="flex items-center gap-1 text-[11px] text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> mở lần đầu
              </span>
              <span className="flex items-center gap-1 text-[11px] text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> có sẵn
              </span>
            </div>
            <Matrix levels={levels} dishes={dishes} data={data} activeLevel={level} onPick={pick} />
          </div>
        )}
      </div>

      {level && (
        <aside className="w-80 shrink-0 bg-white border-l-2 border-black overflow-auto">
          <Section
            title={<span className="text-black text-lg font-bold normal-case tracking-normal">Level {levelCode(data, level)}</span>}
            right={
              <span className="flex border border-black">
                <button disabled={idx <= 0} onClick={() => pick(levels[idx - 1].id)} className="w-7 h-7 grid place-items-center hover:bg-black hover:text-white disabled:opacity-30">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button disabled={idx >= levels.length - 1} onClick={() => pick(levels[idx + 1].id)} className="w-7 h-7 grid place-items-center border-l border-black hover:bg-black hover:text-white disabled:opacity-30">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </span>
            }
          >
            <MapPreview doc={mapOf(level)} className="w-full h-40 border border-black" />
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="label-caps">Map</div>
                <div className="text-sm font-semibold truncate">{mapOf(level)?.name ?? "Chưa gán"}</div>
              </div>
              <Link href={`/game_design/map_studio?map=${level.mapId ?? ""}&back=${level.id}`} className="btn-solid">
                <ExternalLink className="w-3.5 h-3.5" /> Sửa map
              </Link>
            </div>
            <Field label="Dùng map khác" className="mt-2">
              <select className="field" value={level.mapId ?? ""} onChange={(e) => studio.updateLevel(level.id, { mapId: e.target.value || null })}>
                <option value="">— không —</option>
                {maps.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.objects.length})
                  </option>
                ))}
              </select>
            </Field>
          </Section>

          <Section>
            <Field label="Tên level">
              <input className="field" value={level.name} onChange={(e) => studio.updateLevel(level.id, { name: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Field label="Thời gian (s)">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input type="number" className="field" min={30} step={10} value={level.durationSec} onChange={(e) => studio.updateLevel(level.id, { durationSec: Number(e.target.value) || 0 })} />
                </div>
              </Field>
              <Field label="Người chơi">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <input type="number" className="field w-12" min={1} max={4} value={level.players[0]} onChange={(e) => studio.updateLevel(level.id, { players: [Number(e.target.value) || 1, level.players[1]] })} />
                  <span className="text-gray-400">–</span>
                  <input type="number" className="field w-12" min={1} max={4} value={level.players[1]} onChange={(e) => studio.updateLevel(level.id, { players: [level.players[0], Number(e.target.value) || 1] })} />
                </div>
              </Field>
            </div>
            <Field label="Độ khó" className="mt-2">
              <Difficulty value={level.difficulty} size="md" onChange={(v) => studio.updateLevel(level.id, { difficulty: v })} />
            </Field>
          </Section>

          <Section title="Mở món mới ở level này">
            <div className="flex flex-wrap gap-1">
              {dishes.map((d) => (
                <Chip key={d.id} active={level.newDishIds.includes(d.id)} onClick={() => studio.toggleNewDish(level.id, d.id)}>
                  {d.emoji} {d.name}
                </Chip>
              ))}
              {!dishes.length && <span className="text-xs text-gray-500">World chưa có món. Thêm ở tab Món ăn.</span>}
            </div>
            <p className="mt-2 text-[11px] text-gray-500">Món đã mở sẽ có sẵn ở mọi level sau. Mỗi món chỉ mở ở một level.</p>
          </Section>

          <Section title="Món khả dụng">
            <AvailableDishes level={level} data={data} worldId={world.id} />
          </Section>

          <Section title="Ngưỡng sao">
            <div className="border border-black px-2">
              <StarRow n={1} score={level.stars.one} label="Hoàn thành level" />
              <StarRow n={2} score={level.stars.two} label="Hoàn thành với 3+ món" />
              <StarRow n={3} score={level.stars.three} label="Không mắc lỗi" />
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {(["one", "two", "three"] as const).map((k) => (
                <input key={k} type="number" className="field" step={50} value={level.stars[k]} onChange={(e) => studio.updateLevel(level.id, { stars: { ...level.stars, [k]: Number(e.target.value) || 0 } })} />
              ))}
            </div>
          </Section>

          <Section title="Ghi chú">
            <textarea className="field" rows={3} value={level.notes} placeholder="Ý đồ thiết kế, điều cần dạy người chơi…" onChange={(e) => studio.updateLevel(level.id, { notes: e.target.value })} />
          </Section>

          <Section className="border-b-0">
            <div className="flex gap-1">
              <button disabled={idx <= 0} onClick={() => studio.moveLevel(level.id, -1)} className="btn-outline flex-1 justify-center">
                <ArrowLeft className="w-3.5 h-3.5" /> Lên
              </button>
              <button disabled={idx >= levels.length - 1} onClick={() => studio.moveLevel(level.id, 1)} className="btn-outline flex-1 justify-center">
                Xuống <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (!window.confirm(`Xoá level "${level.name}"?`)) return;
                  const next = levels[idx + 1] ?? levels[idx - 1];
                  studio.removeLevel(level.id);
                  pick(next?.id ?? null);
                }}
                className="btn-outline text-red-600 border-red-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Section>
        </aside>
      )}

      {preview && <PreviewModal world={world} levels={levels} data={data} maps={maps} start={Math.max(0, idx)} onClose={() => setPreview(false)} />}
    </div>
  );
}

function AvailableDishes({ level, data, worldId }: { level: Level; data: Data; worldId: string }) {
  const ids = availableDishIds(data, level);
  if (!ids.length) return <div className="text-xs text-gray-500">Chưa có món nào mở đến level này.</div>;
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {ids.map((id) => {
        const d = data.dishes.find((x) => x.id === id);
        if (!d) return null;
        const isNew = level.newDishIds.includes(id);
        return (
          <Link key={id} href={`/game_design/worlds/${worldId}?tab=dishes&dish=${d.id}`} className={cn("flex items-center gap-2 border p-1.5 hover:bg-black/5", isNew ? "border-orange-500 bg-orange-50" : "border-black")}>
            <span className="text-2xl leading-none">{d.emoji}</span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold truncate">{d.name}</span>
              {isNew && <span className="block text-[10px] text-orange-700 uppercase tracking-wider">mới</span>}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function Matrix({ levels, dishes, data, activeLevel, onPick }: { levels: Level[]; dishes: Dish[]; data: Data; activeLevel: Level | null; onPick: (id: string) => void }) {
  const avail = useMemo(() => new Map(levels.map((l) => [l.id, new Set(availableDishIds(data, l))])), [levels, data]);
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#f5f5f5]">
            <th className="text-left font-semibold px-3 py-2 border-b border-black/15 w-56">Món / Level</th>
            {levels.map((l) => (
              <th key={l.id} className={cn("font-mono font-semibold px-2 py-2 border-b border-l border-black/15 text-center cursor-pointer hover:bg-black hover:text-white", l.id === activeLevel?.id && "bg-black text-white")} onClick={() => onPick(l.id)}>
                {levelCode(data, l)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dishes.map((d) => (
            <tr key={d.id}>
              <td className="px-3 py-1.5 border-b border-black/10">
                <span className="flex items-center gap-2">
                  <span className="text-xl leading-none">{d.emoji}</span>
                  <span className="font-semibold">{d.name}</span>
                </span>
              </td>
              {levels.map((l) => {
                const isNew = l.newDishIds.includes(d.id);
                const has = avail.get(l.id)?.has(d.id);
                return (
                  <td key={l.id} onClick={() => onPick(l.id)} className={cn("border-b border-l border-black/10 text-center h-10 cursor-pointer", l.id === activeLevel?.id && "bg-black/[0.04]")}>
                    {isNew ? <span className="inline-block w-3 h-3 rounded-full bg-orange-500" /> : has ? <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" /> : null}
                  </td>
                );
              })}
            </tr>
          ))}
          {!dishes.length && (
            <tr>
              <td colSpan={levels.length + 1} className="p-4 text-gray-500">
                World này chưa có món. Thêm ở tab Món ăn.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function PreviewModal({ world, levels, data, maps, start, onClose }: { world: World; levels: Level[]; data: Data; maps: ReturnType<typeof useMaps>; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const l = levels[i];
  const avail = availableDishIds(data, l).map((id) => data.dishes.find((d) => d.id === id)).filter((d): d is Dish => Boolean(d));
  const stations = Array.from(new Set(avail.flatMap((d) => d.stations)));
  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-6" onClick={onClose}>
      <div className="panel w-[760px] max-w-full" onClick={(e) => e.stopPropagation()}>
        <div className="h-12 px-4 border-b-2 border-black flex items-center justify-between">
          <div className="font-bold uppercase tracking-wider text-[13px]">
            {world.flag} {world.name} · Level {levelCode(data, l)} · {l.name}
          </div>
          <button onClick={onClose} className="btn-outline">
            Đóng
          </button>
        </div>
        <div className="grid grid-cols-[1fr_17rem]">
          <MapPreview doc={maps.find((m) => m.id === l.mapId) ?? null} className="h-80 border-r-2 border-black" />
          <div className="p-4 flex flex-col gap-3">
            <div>
              <div className="label-caps">Món trong level</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {avail.map((d) => (
                  <span key={d.id} className={cn("border px-1.5 h-7 inline-flex items-center gap-1 text-xs", l.newDishIds.includes(d.id) ? "border-orange-500 bg-orange-50" : "border-black")}>
                    {d.emoji} {d.name}
                  </span>
                ))}
                {!avail.length && <span className="text-xs text-gray-400">chưa có món</span>}
              </div>
            </div>
            <div>
              <div className="label-caps">Trạm cần có</div>
              <div className="mt-1 text-xs">{stations.map((s) => STATION_META[s].label).join(", ") || "—"}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="label-caps">Thời gian</div>
                {l.durationSec}s
              </div>
              <div>
                <div className="label-caps">Người chơi</div>
                {l.players[0]}–{l.players[1]}
              </div>
              <div>
                <div className="label-caps">Độ khó</div>
                <Difficulty value={l.difficulty} />
              </div>
              <div>
                <div className="label-caps">3 sao</div>
                {l.stars.three}
              </div>
            </div>
            {l.notes && <p className="text-xs text-gray-600 border-l-2 border-black pl-2">{l.notes}</p>}
          </div>
        </div>
        <div className="h-12 px-4 border-t-2 border-black flex items-center justify-between">
          <button disabled={i === 0} onClick={() => setI(i - 1)} className="btn-outline">
            <ChevronLeft className="w-3.5 h-3.5" /> Trước
          </button>
          <div className="flex gap-1">
            {levels.map((x, k) => (
              <button key={x.id} onClick={() => setI(k)} className={cn("w-2.5 h-2.5 border border-black", k === i ? "bg-black" : "bg-white")} />
            ))}
          </div>
          <button disabled={i === levels.length - 1} onClick={() => setI(i + 1)} className="btn-solid">
            Tiếp <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
