"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Bug, BugStatus } from "@/types/team";
import { BUG_STATUS_META, BUG_STATUS_ORDER } from "@/lib/teamConstants";

interface BugCardProps {
  bug: Bug;
  onEdit: (bug: Bug) => void;
  onStatus: (bugId: string, status: BugStatus) => void;
  onDelete: (bugId: string) => void;
}

export function BugCard({ bug, onEdit, onStatus, onDelete }: BugCardProps) {
  const meta = BUG_STATUS_META[bug.status];
  return (
    <article
      className="flex flex-col border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
      style={{ borderLeftWidth: 6, borderLeftColor: meta.accent }}
    >
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <h3 className="text-sm font-black uppercase leading-tight tracking-tight">
          {bug.title}
        </h3>
        <div className="flex shrink-0 gap-0.5">
          <button
            onClick={() => onEdit(bug)}
            className="p-1 text-black/40 transition-colors hover:text-black"
            aria-label="Sửa bug"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(bug.bug_id)}
            className="p-1 text-black/40 transition-colors hover:text-red-600"
            aria-label="Xoá bug"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {bug.description && (
        <p className="mb-2.5 line-clamp-4 whitespace-pre-wrap text-xs leading-relaxed text-black/65">
          {bug.description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-1 border-t border-black/10 pt-2">
        {BUG_STATUS_ORDER.map((s) => {
          const sMeta = BUG_STATUS_META[s];
          const active = s === bug.status;
          return (
            <button
              key={s}
              onClick={() => !active && onStatus(bug.bug_id, s)}
              className="border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-colors"
              style={
                active
                  ? { background: sMeta.accent, color: "#fff", borderColor: sMeta.accent }
                  : { background: "transparent", color: "#000", borderColor: "rgba(0,0,0,0.2)" }
              }
            >
              {sMeta.label}
            </button>
          );
        })}
      </div>
    </article>
  );
}
