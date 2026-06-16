"use client";

import { addDays, setDay, format, parseISO, isValid } from "date-fns";

interface QuickDateFieldProps {
  label: string;
  value: string; // yyyy-MM-dd or ""
  onChange: (value: string) => void;
}

const iso = (d: Date) => format(d, "yyyy-MM-dd");

/** Quick presets so users tap a chip instead of typing a full date. */
function presets(): { label: string; value: string }[] {
  const today = new Date();
  return [
    { label: "Hôm nay", value: iso(today) },
    { label: "Mai", value: iso(addDays(today, 1)) },
    { label: "+3 ngày", value: iso(addDays(today, 3)) },
    // Friday of the current week (week starts Monday)
    { label: "T6 này", value: iso(setDay(today, 5, { weekStartsOn: 1 })) },
    { label: "+1 tuần", value: iso(addDays(today, 7)) },
  ];
}

const labelCls = "font-mono text-[10px] uppercase tracking-widest text-black/50";

export function QuickDateField({ label, value, onChange }: QuickDateFieldProps) {
  const chips = presets();
  const current = value && isValid(parseISO(value)) ? value : "";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className={labelCls}>{label}</span>
        {current && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="font-mono text-[10px] uppercase tracking-wide text-black/40 hover:text-red-600"
          >
            Xoá
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-stretch gap-1">
        {chips.map((c) => {
          const active = c.value === current;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => onChange(c.value)}
              className={`border-2 border-black px-1.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-transform active:translate-y-0.5 ${
                active ? "bg-black text-white" : "bg-white text-black/70 hover:bg-black/5"
              }`}
            >
              {c.label}
            </button>
          );
        })}
        <input
          type="date"
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-[120px] flex-1 border-2 border-black bg-white px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  );
}
