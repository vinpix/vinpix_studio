"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DishStatus, WorldStatus } from "@/features/game-design/studio/types";

export function Crumbs({ items }: { items: Array<{ label: string; href?: string; onClick?: () => void }> }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-300">/</span>}
          {it.onClick ? (
            <button onClick={it.onClick} className="hover:text-black">
              {it.label}
            </button>
          ) : (
            <span className={cn(i === items.length - 1 && "text-black font-semibold")}>{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function TopBar({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <header className="h-12 shrink-0 border-b-2 border-black bg-white flex items-center justify-between px-4 gap-3">
      <div className="min-w-0">{children}</div>
      {right && <div className="flex items-center gap-1.5 shrink-0">{right}</div>}
    </header>
  );
}

export function Section({ title, right, children, className }: { title?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("p-3 border-b border-black/15", className)}>
      {(title || right) && (
        <div className="flex items-center justify-between mb-2">
          {title && <div className="label-caps">{title}</div>}
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusPill({ status }: { status: WorldStatus | DishStatus }) {
  const ready = status === "active" || status === "ready";
  return (
    <span className={cn("inline-flex items-center gap-1 h-5 px-1.5 text-[10px] font-bold uppercase tracking-wider border", ready ? "border-black bg-black text-white" : "border-black/40 text-gray-600 bg-white")}>
      <span className={cn("w-1.5 h-1.5 rounded-full", ready ? "bg-emerald-400" : "bg-amber-400")} />
      {status === "active" ? "Active" : status === "ready" ? "Ready" : "Draft"}
    </span>
  );
}

export function Difficulty({ value, onChange, size = "sm" }: { value: number; onChange?: (v: number) => void; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-0.5" title={`Độ khó ${value}/5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const cls = cn(size === "sm" ? "w-3 h-2.5" : "w-4 h-3", "border border-black block", i <= value ? "bg-black" : "bg-white", onChange && "hover:bg-gray-400");
        return onChange ? <button key={i} type="button" onClick={() => onChange(i)} className={cls} /> : <span key={i} className={cls} />;
      })}
    </div>
  );
}

export function StarRow({ n, score, label }: { n: 1 | 2 | 3; score: number; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm h-9 border-b border-black/10 last:border-b-0">
      <span className="flex gap-0.5 w-12">
        {[1, 2, 3].map((i) => (
          <Star key={i} className={cn("w-3.5 h-3.5", i <= n ? "fill-black text-black" : "text-gray-300")} />
        ))}
      </span>
      <span className="font-mono tabular-nums w-12">{score}</span>
      <span className="text-gray-500 text-xs truncate">{label}</span>
    </div>
  );
}

export function Empty({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="border-2 border-dashed border-black/30 p-8 text-center text-sm text-gray-500 flex flex-col items-center gap-2">
      <div className="font-semibold text-black">{title}</div>
      {hint && <div className="text-xs">{hint}</div>}
      {action}
    </div>
  );
}

export function Chip({ children, active, onClick, className }: { children: React.ReactNode; active?: boolean; onClick?: () => void; className?: string }) {
  const El = onClick ? "button" : "span";
  return (
    <El onClick={onClick} className={cn("inline-flex items-center gap-1 h-7 px-2 text-xs font-semibold border border-black whitespace-nowrap", active ? "bg-black text-white" : "bg-white", onClick && !active && "hover:bg-black/5", className)}>
      {children}
    </El>
  );
}

export function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-xs text-gray-500 mb-1">{label}</span>
      {children}
    </label>
  );
}
