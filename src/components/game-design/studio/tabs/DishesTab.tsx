"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUp, Pencil, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATALOG, resolveCatalogEntry } from "@/features/game-design/catalog";
import { uid } from "@/features/game-design/mapDoc";
import { dishesOf, firstAppearance, levelCode, studio, useStudio } from "@/features/game-design/studio/store";
import { ALL_STATIONS, STATION_META, type Dish, type RecipeStep, type Station, type World } from "@/features/game-design/studio/types";
import { Chip, Empty, Field, Section, StatusPill } from "../ui";

type Data = ReturnType<typeof useStudio>;

const NOT_INGREDIENT = new Set(["base_counter", "base_counter_corner", "cutting_counter", "plate counter", "stove counter", "oven counter", "sink counter", "trash counter"]);
const INGREDIENTS = CATALOG.filter((e) => e.layer === 1 && !NOT_INGREDIENT.has(e.key));
const labelOf = (key: string) => resolveCatalogEntry(key)?.label ?? key;

export default function DishesTab({ world, data }: { world: World; data: Data }) {
  const router = useRouter();
  const params = useSearchParams();
  const dishes = useMemo(() => dishesOf(data, world), [data, world]);
  // selection lives in state (URL is only mirrored) so opening the editor never depends on a router round-trip
  const [selectedId, setSelectedId] = useState<string | null>(params.get("dish"));
  const dish = dishes.find((d) => d.id === selectedId) ?? null;
  const [q, setQ] = useState("");

  const pick = (id: string | null) => {
    setSelectedId(id);
    router.replace(`/game_design/worlds/${world.id}?tab=dishes${id ? `&dish=${id}` : ""}`);
  };
  const remove = (d: Dish) => {
    if (!window.confirm(`Xoá món "${d.name}"? Món sẽ bị gỡ khỏi các level đang mở nó.`)) return;
    studio.removeDish(d.id);
    if (selectedId === d.id) pick(null);
  };
  useEffect(() => {
    const fromUrl = params.get("dish");
    if (fromUrl && fromUrl !== selectedId) setSelectedId(fromUrl);
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const list = useMemo(() => {
    const order = (d: Dish) => {
      const l = firstAppearance(data, d);
      return l ? world.levelIds.indexOf(l.id) : 999;
    };
    return dishes.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).sort((a, b) => order(a) - order(b));
  }, [dishes, q, data, world]);

  return (
    <div className="flex-1 min-h-0 flex">
      <div className="flex-1 min-w-0 min-h-0 overflow-auto p-5">
        <div className="flex items-center gap-2 mb-4">
          <input className="field max-w-xs" placeholder="Tìm món…" value={q} onChange={(e) => setQ(e.target.value)} />
          <span className="text-xs text-gray-500">{list.length} món · sắp theo level xuất hiện</span>
          <div className="flex-1" />
          <button onClick={() => pick(studio.addDish(world.id).id)} className="btn-solid">
            <Plus className="w-3.5 h-3.5" /> Thêm món
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
          {list.map((d) => {
            const first = firstAppearance(data, d);
            return (
              <div key={d.id} className={cn("panel flex flex-col hover:-translate-y-0.5 transition-transform", d.id === dish?.id && "outline outline-2 outline-black outline-offset-2")}>
                <button onClick={() => pick(d.id)} className="h-24 grid place-items-center text-5xl border-b border-black w-full" style={{ background: world.accent + "66" }} title="Mở để sửa">
                  {d.emoji}
                </button>
                <button onClick={() => pick(d.id)} className="p-2.5 text-left flex-1" title="Mở để sửa">
                  <div className="flex items-start justify-between gap-1">
                    <div className="font-semibold text-sm leading-tight">{d.name}</div>
                    <StatusPill status={d.status} />
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{first ? `Mở ở level ${levelCode(data, first)}` : "Chưa mở ở level nào"}</div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {d.stations.map((s) => (
                      <span key={s} className="text-[10px] uppercase tracking-wider border border-black/30 px-1">
                        {STATION_META[s].short}
                      </span>
                    ))}
                    {!d.stations.length && <span className="text-[10px] text-gray-400">chưa có công thức</span>}
                  </div>
                </button>
                <div className="flex border-t border-black text-[11px] font-semibold uppercase tracking-wider">
                  <button onClick={() => pick(d.id)} className="flex-1 h-8 inline-flex items-center justify-center gap-1 hover:bg-black hover:text-white">
                    <Pencil className="w-3 h-3" /> Sửa
                  </button>
                  <button onClick={() => remove(d)} className="flex-1 h-8 inline-flex items-center justify-center gap-1 border-l border-black text-red-600 hover:bg-red-600 hover:text-white">
                    <Trash2 className="w-3 h-3" /> Xoá
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {!list.length && <Empty title="Chưa có món" hint="Bấm Thêm món để tạo công thức đầu tiên." />}
      </div>

      {dish && <DishEditor key={dish.id} dish={dish} world={world} data={data} onClose={() => pick(null)} onDelete={() => remove(dish)} />}
    </div>
  );
}

function DishEditor({ dish, world, data, onClose, onDelete }: { dish: Dish; world: World; data: Data; onClose: () => void; onDelete: () => void }) {
  const first = firstAppearance(data, dish);
  const set = (patch: Partial<Dish>) => studio.updateDish(dish.id, patch);
  const setSteps = (steps: RecipeStep[]) => set({ steps });
  const updStep = (id: string, patch: Partial<RecipeStep>) => setSteps(dish.steps.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const moveStep = (id: string, dir: -1 | 1) => {
    const i = dish.steps.findIndex((s) => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= dish.steps.length) return;
    const next = [...dish.steps];
    [next[i], next[j]] = [next[j], next[i]];
    setSteps(next);
  };
  const toggleIngredient = (key: string) => {
    const on = dish.ingredients.includes(key);
    set({
      ingredients: on ? dish.ingredients.filter((k) => k !== key) : [...dish.ingredients, key],
      steps: on ? dish.steps.filter((s) => s.input !== key) : dish.steps,
    });
  };
  const unused = dish.ingredients.filter((k) => !dish.steps.some((s) => s.input === k));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <aside className="w-[22rem] shrink-0 bg-white border-l-2 border-black overflow-auto">
      <Section
        title="Sửa món"
        right={
          <span className="flex items-center gap-2">
            <button onClick={() => set({ status: dish.status === "ready" ? "draft" : "ready" })} title="Đổi trạng thái Ready / Draft">
              <StatusPill status={dish.status} />
            </button>
            <button onClick={onClose} className="w-6 h-6 grid place-items-center border border-black hover:bg-black hover:text-white" title="Đóng (Esc)">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        }
      >
        <div className="h-24 grid place-items-center text-6xl border border-black" style={{ background: world.accent + "66" }}>
          {dish.emoji}
        </div>
        <div className="grid grid-cols-[1fr_4rem] gap-2 mt-2">
          <Field label="Tên">
            <input className="field" value={dish.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Emoji">
            <input className="field text-center" value={dish.emoji} onChange={(e) => set({ emoji: e.target.value })} />
          </Field>
        </div>
        <Field label="Mô tả" className="mt-2">
          <textarea className="field" rows={2} value={dish.description} onChange={(e) => set({ description: e.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Field label="Thời gian nấu (s)">
            <input type="number" className="field" min={1} value={dish.prepSec} onChange={(e) => set({ prepSec: Number(e.target.value) || 0 })} />
          </Field>
          <Field label="Điểm">
            <input type="number" className="field" min={0} step={5} value={dish.score} onChange={(e) => set({ score: Number(e.target.value) || 0 })} />
          </Field>
        </div>
        <div className="mt-3 text-xs flex items-center justify-between border border-black/15 p-2">
          <span className="text-gray-500">Mở ở level</span>
          {first ? (
            <Link href={`/game_design/worlds/${world.id}?tab=levels&level=${first.id}`} className="font-semibold underline">
              {levelCode(data, first)} · {first.name}
            </Link>
          ) : (
            <Link href={`/game_design/worlds/${world.id}?tab=levels`} className="text-gray-500 underline">
              chưa gán → tab Levels
            </Link>
          )}
        </div>
      </Section>

      <Section title="1 · Nguyên liệu">
        <div className="flex flex-wrap gap-1">
          {INGREDIENTS.map((e) => (
            <Chip key={e.key} active={dish.ingredients.includes(e.key)} onClick={() => toggleIngredient(e.key)}>
              <span className="w-2.5 h-2.5 border border-black/40" style={{ background: e.color }} />
              {e.label}
            </Chip>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-gray-500">Mỗi nguyên liệu là một quầy trong Map Studio.</p>
      </Section>

      <Section title="2 · Sơ chế" right={<span className="text-[11px] text-gray-500">{dish.steps.length} bước</span>}>
        {!dish.ingredients.length && <div className="text-xs text-gray-500">Chọn nguyên liệu trước.</div>}
        <div className="flex flex-col gap-1.5">
          {dish.steps.map((s, i) => (
            <div key={s.id} className="border border-black p-2 grid grid-cols-[auto_1fr_auto] gap-2 items-center">
              <span className="font-mono text-xs text-gray-500 w-4">{i + 1}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{labelOf(s.input)}</div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  <select className="field h-7 text-xs" value={s.station ?? ""} onChange={(e) => updStep(s.id, { station: (e.target.value || null) as Station | null })}>
                    <option value="">Dùng ngay</option>
                    {ALL_STATIONS.map((st) => (
                      <option key={st} value={st}>
                        {STATION_META[st].label}
                      </option>
                    ))}
                  </select>
                  <input className="field h-7 text-xs" value={s.result} placeholder="Kết quả" onChange={(e) => updStep(s.id, { result: e.target.value })} />
                </div>
              </div>
              <span className="flex flex-col gap-0.5">
                <button onClick={() => moveStep(s.id, -1)} disabled={i === 0} className="w-5 h-5 grid place-items-center border border-black disabled:opacity-30 hover:bg-black hover:text-white">
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button onClick={() => moveStep(s.id, 1)} disabled={i === dish.steps.length - 1} className="w-5 h-5 grid place-items-center border border-black disabled:opacity-30 hover:bg-black hover:text-white">
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button onClick={() => setSteps(dish.steps.filter((x) => x.id !== s.id))} className="w-5 h-5 grid place-items-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            </div>
          ))}
        </div>
        {unused.length > 0 && (
          <div className="mt-2">
            <div className="text-[11px] text-gray-500 mb-1">Thêm bước cho:</div>
            <div className="flex flex-wrap gap-1">
              {unused.map((k) => (
                <Chip key={k} onClick={() => setSteps([...dish.steps, { id: uid(), input: k, station: "chop", result: `${labelOf(k)} sơ chế` }])} className="h-6 text-[11px]">
                  <Plus className="w-3 h-3" /> {labelOf(k)}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title="3 · Ráp & ra món">
        <Field label="Trạm hoàn thiện" className="mb-2">
          <select className="field" value={dish.finishStation ?? ""} onChange={(e) => set({ finishStation: (e.target.value || null) as Station | null })}>
            <option value="">Bày ra dĩa ngay</option>
            {ALL_STATIONS.map((st) => (
              <option key={st} value={st}>
                {STATION_META[st].label}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {dish.steps.map((s, i) => (
            <span key={s.id} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-400">+</span>}
              <span className="border border-black px-1.5 h-6 inline-flex items-center gap-1 bg-white">
                {s.station && <span className="text-[10px] uppercase tracking-wider text-gray-500">{STATION_META[s.station].short}</span>}
                <span className="font-semibold">{s.result || labelOf(s.input)}</span>
              </span>
            </span>
          ))}
          {dish.steps.length > 0 && <ArrowRight className="w-3 h-3 text-gray-400" />}
          {dish.finishStation && <span className="border border-black px-1.5 h-6 inline-flex items-center text-[10px] uppercase tracking-wider text-gray-600">{STATION_META[dish.finishStation].short}</span>}
          {dish.finishStation && <ArrowRight className="w-3 h-3 text-gray-400" />}
          <span className="border border-black bg-black text-white px-1.5 h-6 inline-flex items-center gap-1 font-semibold">
            {dish.emoji} {dish.name}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1 items-center">
          <span className="text-[11px] text-gray-500">Trạm cần trên map:</span>
          {dish.stations.map((st) => (
            <span key={st} className={cn("text-[10px] uppercase tracking-wider border px-1", world.defaultStations.includes(st) ? "border-black/30" : "border-orange-500 text-orange-700")} title={world.defaultStations.includes(st) ? "Trạm mặc định của world" : "Không phải trạm mặc định, level cần đặt thêm"}>
              {STATION_META[st].label}
            </span>
          ))}
          {!dish.stations.length && <span className="text-[11px] text-gray-400">—</span>}
        </div>
      </Section>

      <Section className="border-b-0">
        <button onClick={onDelete} className="btn-outline text-red-600 border-red-600 w-full justify-center">
          <Trash2 className="w-3.5 h-3.5" /> Xoá món
        </button>
      </Section>
    </aside>
  );
}
