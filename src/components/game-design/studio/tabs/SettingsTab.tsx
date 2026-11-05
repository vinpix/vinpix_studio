"use client";

import { studio } from "@/features/game-design/studio/store";
import { ALL_STATIONS, STATION_META, type World } from "@/features/game-design/studio/types";
import { Chip, Field } from "../ui";

export default function SettingsTab({ world }: { world: World }) {
  return (
    <div className="flex-1 min-h-0 overflow-auto p-5">
      <div className="grid grid-cols-[minmax(0,28rem)_minmax(0,20rem)] gap-5 items-start">
        <div className="panel p-4 flex flex-col gap-3">
          <div className="label-caps">Thông tin</div>
          <div className="grid grid-cols-[1fr_5rem] gap-2">
            <Field label="Tên">
              <input className="field" value={world.name} onChange={(e) => studio.updateWorld(world.id, { name: e.target.value })} />
            </Field>
            <Field label="Cờ">
              <input className="field text-center text-lg" value={world.flag} onChange={(e) => studio.updateWorld(world.id, { flag: e.target.value })} />
            </Field>
          </div>
          <Field label="Khu vực">
            <input className="field" value={world.region} onChange={(e) => studio.updateWorld(world.id, { region: e.target.value })} />
          </Field>
          <Field label="Theme">
            <input className="field" value={world.theme} placeholder="VD: Rustic trattoria" onChange={(e) => studio.updateWorld(world.id, { theme: e.target.value })} />
          </Field>
          <Field label="Mô tả">
            <textarea className="field" rows={3} value={world.description} onChange={(e) => studio.updateWorld(world.id, { description: e.target.value })} />
          </Field>
          <Field label="Màu nhấn">
            <div className="flex items-center gap-2">
              <input type="color" className="w-9 h-9 border border-black p-0 bg-white" value={world.accent} onChange={(e) => studio.updateWorld(world.id, { accent: e.target.value })} />
              <span className="font-mono text-xs">{world.accent}</span>
            </div>
          </Field>
        </div>
        <div className="flex flex-col gap-5">
          <div className="panel p-4">
            <div className="label-caps mb-2">Trạm mặc định</div>
            <div className="flex flex-wrap gap-1">
              {ALL_STATIONS.map((s) => {
                const on = world.defaultStations.includes(s);
                return (
                  <Chip key={s} active={on} onClick={() => studio.updateWorld(world.id, { defaultStations: on ? world.defaultStations.filter((x) => x !== s) : [...world.defaultStations, s] })}>
                    {STATION_META[s].label}
                  </Chip>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-gray-500">Có sẵn trong mọi level của {world.name}. Món nào cần trạm khác thì level đó phải đặt thêm trên map.</p>
          </div>
          <div className="panel p-4">
            <div className="label-caps mb-2">Xem trước</div>
            <div className="h-28 border border-black grid place-items-center text-6xl" style={{ background: world.accent }}>
              {world.flag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
