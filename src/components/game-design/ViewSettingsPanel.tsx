"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { DEFAULT_VIEW_SETTINGS, ENV_OPTIONS, type ViewSettings } from "@/features/game-design/viewSettings";
import type { SceneDiag } from "./MapScene3D";

type Props = { value: ViewSettings; onChange: (next: ViewSettings) => void; onClose?: () => void; diag?: SceneDiag | null };

export default function ViewSettingsPanel({ value, onChange, onClose, diag }: Props) {
  const [open, setOpen] = useState(true);
  const set = <K extends keyof ViewSettings>(k: K, v: ViewSettings[K]) => onChange({ ...value, [k]: v });

  return (
    <div className="absolute top-2 right-2 w-64 bg-white/95 backdrop-blur border border-black text-xs shadow-lg">
      <div className="flex items-center h-8 font-bold uppercase tracking-wider">
        <button onClick={() => setOpen((o) => !o)} className="flex-1 flex items-center justify-between px-2 h-8">
          <span className="flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Ánh sáng & Env
          </span>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {onClose && (
          <button onClick={onClose} className="h-8 w-8 grid place-items-center border-l border-black/20 hover:bg-black hover:text-white" title="Đóng">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {open && (
        <div className="border-t border-black/20 p-2 space-y-2 max-h-[70vh] overflow-auto">
          <label className="block">
            <span className="text-gray-500">Env map</span>
            <select value={value.envId} onChange={(e) => set("envId", e.target.value)} className="mt-0.5 w-full border border-black px-1 h-7 bg-white">
              {ENV_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={value.envBackground} onChange={(e) => set("envBackground", e.target.checked)} />
              Env làm nền
            </label>
            <label className="flex items-center gap-1 ml-auto">
              Màu nền
              <input type="color" value={value.backgroundColor} onChange={(e) => set("backgroundColor", e.target.value)} className="w-6 h-6 border border-black p-0" />
            </label>
          </div>
          <Slider label="Env intensity" v={value.envIntensity} min={0} max={2} step={0.05} on={(v) => set("envIntensity", v)} />
          <Slider label="Exposure" v={value.exposure} min={0.4} max={1.8} step={0.02} on={(v) => set("exposure", v)} />
          <Slider label="Độ bão hòa màu" v={value.saturation} min={0.5} max={1.5} step={0.05} on={(v) => set("saturation", v)} />
          <Slider label="Nắng (sun)" v={value.sunIntensity} min={0} max={4} step={0.05} on={(v) => set("sunIntensity", v)} />
          <Slider label="Ambient" v={value.ambientIntensity} min={0} max={1.5} step={0.02} on={(v) => set("ambientIntensity", v)} />
          <Slider label="Hướng nắng (azimuth)" v={value.sunAzimuthDeg} min={-180} max={180} step={1} on={(v) => set("sunAzimuthDeg", v)} unit="°" />
          <Slider label="Độ cao nắng" v={value.sunElevationDeg} min={10} max={89} step={1} on={(v) => set("sunElevationDeg", v)} unit="°" />
          <div className="border-t border-black/10 pt-2">
            <label className="flex items-center gap-1 font-semibold">
              <input type="checkbox" checked={value.shadowEnabled} onChange={(e) => set("shadowEnabled", e.target.checked)} />
              Bóng đổ
            </label>
            <Slider label="Đậm bóng" v={value.shadowIntensity} min={0} max={1} step={0.02} on={(v) => set("shadowIntensity", v)} />
            <Slider label="Mềm bóng" v={value.shadowSoftness} min={0} max={6} step={0.1} on={(v) => set("shadowSoftness", v)} />
            <label className="block">
              <span className="text-gray-500">Độ phân giải bóng</span>
              <select value={value.shadowResolution} onChange={(e) => set("shadowResolution", Number(e.target.value) as ViewSettings["shadowResolution"])} className="mt-0.5 w-full border border-black px-1 h-7 bg-white">
                <option value={1024}>1024 (nhanh)</option>
                <option value={2048}>2048</option>
                <option value={4096}>4096 (đẹp, nặng)</option>
              </select>
            </label>
          </div>
          {diag && (
            <div className="border-t border-black/10 pt-2 text-[10px] leading-snug text-gray-600 font-mono break-all">
              <div>GPU: {diag.gpu}</div>
              <div>
                shadowMap {diag.shadowMapEnabled ? "on" : "OFF"} · type {diag.shadowMapType} · light cast {diag.lightCastShadow ? "yes" : "NO"} · map{" "}
                {diag.shadowMapAllocated ? diag.shadowMapSize : "chưa cấp phát"}
              </div>
              <div>
                mesh {diag.meshes} · cast {diag.casters} · receive {diag.receivers} · env {diag.envSet ? "ok" : "none"} · dpr {diag.pixelRatio}
              </div>
            </div>
          )}
          <button onClick={() => onChange(DEFAULT_VIEW_SETTINGS)} className="w-full h-7 border border-black flex items-center justify-center gap-1 hover:bg-black hover:text-white">
            <RotateCcw className="w-3 h-3" /> Mặc định (cân bằng)
          </button>
        </div>
      )}
    </div>
  );
}

function Slider({ label, v, min, max, step, on, unit = "" }: { label: string; v: number; min: number; max: number; step: number; on: (v: number) => void; unit?: string }) {
  return (
    <label className="block">
      <span className="flex justify-between text-gray-500">
        {label}
        <span className="tabular-nums text-black">
          {Number.isInteger(step) ? v : v.toFixed(2)}
          {unit}
        </span>
      </span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => on(Number(e.target.value))} className="w-full accent-black" />
    </label>
  );
}
