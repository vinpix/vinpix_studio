"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Member } from "@/types/team";
import { AvatarGroup, MemberAvatar, assigneesOf } from "./badges";
import { memberMap } from "@/lib/teamUtils";

interface AssigneeMultiSelectProps {
  members: Member[];
  value: string[];
  onChange: (ids: string[]) => void;
  compact?: boolean; // table cell trigger
}

export function AssigneeMultiSelect({ members, value, onChange, compact }: AssigneeMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const map = memberMap(members);
  const selected = assigneesOf(value, map);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  const label =
    selected.length === 0
      ? "Chưa giao"
      : selected.length === 1
      ? selected[0].name
      : `${selected.length} người`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-1.5 border-2 ${
          compact ? "border-transparent px-1 py-1 hover:border-black" : "border-black px-2.5 py-1.5"
        } bg-white text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-black`}
      >
        <AvatarGroup members={selected} size={compact ? 20 : 22} />
        <span className={`flex-1 truncate ${selected.length ? "font-medium" : "text-black/45"}`}>
          {label}
        </span>
        <ChevronDown size={14} className="shrink-0 text-black/40" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-64 w-full min-w-[200px] overflow-y-auto border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {members.map((m) => {
            const on = value.includes(m.member_id);
            return (
              <button
                key={m.member_id}
                type="button"
                onClick={() => toggle(m.member_id)}
                className={`flex w-full items-center gap-2 border-b border-black/10 px-2.5 py-2 text-left text-sm hover:bg-black/5 ${
                  on ? "bg-black/[0.04]" : ""
                }`}
              >
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center border border-black"
                  style={{ background: on ? "#000" : "#fff" }}
                >
                  {on && <Check size={12} className="text-white" />}
                </span>
                <MemberAvatar member={m} size={20} />
                <span className="flex-1 truncate font-medium">{m.name}</span>
              </button>
            );
          })}
          {members.length === 0 && (
            <p className="px-2.5 py-2 font-mono text-[11px] text-black/40">Chưa có thành viên</p>
          )}
        </div>
      )}
    </div>
  );
}
