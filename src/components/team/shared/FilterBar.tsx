"use client";

import { Search, X } from "lucide-react";
import type { Member } from "@/types/team";
import { STATUS_ORDER, STATUS_META, PRIORITY_ORDER, PRIORITY_META } from "@/lib/teamConstants";
import { useTeamView } from "@/hooks/useTeamView";

const selectCls =
  "border-2 border-black bg-white px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-black";

export function FilterBar({ members }: { members: Member[] }) {
  const { filters, setFilter, clearFilters, hasActiveFilters } = useTeamView();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-black/40" />
        <input
          value={filters.query}
          onChange={(e) => setFilter("query", e.target.value || null)}
          placeholder="Tìm công việc..."
          className="w-44 border-2 border-black bg-white py-1.5 pl-8 pr-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <select
        className={selectCls}
        value={filters.assigneeId ?? ""}
        onChange={(e) => setFilter("assigneeId", e.target.value || null)}
      >
        <option value="">Mọi người</option>
        {members.map((m) => (
          <option key={m.member_id} value={m.member_id}>
            {m.name}
          </option>
        ))}
      </select>

      <select
        className={selectCls}
        value={filters.status ?? ""}
        onChange={(e) => setFilter("status", e.target.value || null)}
      >
        <option value="">Mọi trạng thái</option>
        {STATUS_ORDER.map((s) => (
          <option key={s} value={s}>
            {STATUS_META[s].label}
          </option>
        ))}
      </select>

      <select
        className={selectCls}
        value={filters.priority ?? ""}
        onChange={(e) => setFilter("priority", e.target.value || null)}
      >
        <option value="">Mọi ưu tiên</option>
        {PRIORITY_ORDER.map((p) => (
          <option key={p} value={p}>
            {PRIORITY_META[p].label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="inline-flex items-center gap-1 border-2 border-black bg-black px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
        >
          <X size={13} /> Xoá lọc
        </button>
      )}
    </div>
  );
}
