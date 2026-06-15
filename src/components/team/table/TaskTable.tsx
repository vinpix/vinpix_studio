"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Task, TaskStatus, TaskPriority } from "@/types/team";
import {
  STATUS_ORDER,
  STATUS_META,
  PRIORITY_ORDER,
  PRIORITY_META,
} from "@/lib/teamConstants";
import { memberMap, selectFiltered, isOverdue } from "@/lib/teamUtils";
import { useTeamData } from "@/hooks/useTeamData";
import { useTeamView } from "@/hooks/useTeamView";
import { useTaskPanel } from "../shared/TaskPanel";
import { DeadlinePill, MemberAvatar, ProgressBar } from "../shared/badges";
import { EmptyState } from "../shared/EmptyState";

type SortKey = "code" | "name" | "assignee" | "priority" | "deadline" | "status" | "progress";

const PRIO_RANK: Record<TaskPriority, number> = { cao: 0, trung_binh: 1, thap: 2 };
const STATUS_RANK: Record<TaskStatus, number> = {
  chua_bat_dau: 0,
  dang_lam: 1,
  cho_review: 2,
  hoan_thanh: 3,
  tam_hoan: 4,
};

const cellSelect =
  "w-full cursor-pointer border-2 border-transparent bg-transparent px-1 py-1 text-xs font-bold hover:border-black focus:border-black focus:outline-none";

export function TaskTable() {
  const { tasks, members, updateTask } = useTeamData();
  const { filters } = useTeamView();
  const { openCreate, openEdit } = useTaskPanel();
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "code",
    dir: "asc",
  });

  const mMap = useMemo(() => memberMap(members), [members]);

  const rows = useMemo(() => {
    const filtered = selectFiltered(tasks, filters);
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      switch (sort.key) {
        case "assignee":
          av = mMap[a.assigneeId]?.name ?? "";
          bv = mMap[b.assigneeId]?.name ?? "";
          break;
        case "priority":
          av = PRIO_RANK[a.priority];
          bv = PRIO_RANK[b.priority];
          break;
        case "status":
          av = STATUS_RANK[a.status];
          bv = STATUS_RANK[b.status];
          break;
        case "progress":
          av = a.progress;
          bv = b.progress;
          break;
        case "deadline":
          av = a.deadline || "9999";
          bv = b.deadline || "9999";
          break;
        case "name":
          av = a.name.toLowerCase();
          bv = b.name.toLowerCase();
          break;
        default:
          av = a.code;
          bv = b.code;
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [tasks, filters, sort, mMap]);

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );

  if (rows.length === 0) {
    return (
      <EmptyState
        message="Không có công việc khớp bộ lọc"
        actionLabel="Tạo công việc"
        onAction={openCreate}
      />
    );
  }

  const SortHead = ({ label, k, className }: { label: string; k: SortKey; className?: string }) => (
    <th className={`px-3 py-2 text-left ${className ?? ""}`}>
      <button
        onClick={() => toggleSort(k)}
        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest hover:text-white/80"
      >
        {label}
        {sort.key === k ? (
          sort.dir === "asc" ? (
            <ArrowUp size={11} />
          ) : (
            <ArrowDown size={11} />
          )
        ) : (
          <ArrowUpDown size={11} className="opacity-40" />
        )}
      </button>
    </th>
  );

  return (
    <div className="overflow-x-auto border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead className="bg-black text-white">
          <tr>
            <SortHead label="Mã" k="code" />
            <SortHead label="Công việc" k="name" />
            <SortHead label="Phụ trách" k="assignee" />
            <SortHead label="Ưu tiên" k="priority" />
            <SortHead label="Hạn" k="deadline" />
            <SortHead label="Trạng thái" k="status" />
            <SortHead label="Tiến độ" k="progress" className="w-[150px]" />
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const overdue = isOverdue(t);
            return (
              <tr
                key={t.task_id}
                className="border-b border-black/10 hover:bg-black/[0.03]"
                style={{
                  borderLeft: `4px solid ${overdue ? "#DC2626" : STATUS_META[t.status].accent}`,
                }}
              >
                <td className="px-3 py-2 font-mono text-[11px] text-black/50">{t.code}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="text-left text-sm font-bold hover:underline"
                  >
                    {t.name}
                  </button>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <MemberAvatar member={mMap[t.assigneeId]} size={20} />
                    <select
                      className={cellSelect}
                      value={t.assigneeId}
                      onChange={(e) => updateTask(t.task_id, { assigneeId: e.target.value })}
                    >
                      <option value="">Chưa giao</option>
                      {members.map((m) => (
                        <option key={m.member_id} value={m.member_id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <select
                    className={cellSelect}
                    value={t.priority}
                    style={{ color: PRIORITY_META[t.priority].accent }}
                    onChange={(e) =>
                      updateTask(t.task_id, { priority: e.target.value as TaskPriority })
                    }
                  >
                    {PRIORITY_ORDER.map((p) => (
                      <option key={p} value={p}>
                        {PRIORITY_META[p].label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <DeadlinePill deadline={t.deadline} done={t.status === "hoan_thanh"} />
                </td>
                <td className="px-3 py-2">
                  <select
                    className={cellSelect}
                    value={t.status}
                    style={{ color: STATUS_META[t.status].accent }}
                    onChange={(e) =>
                      updateTask(t.task_id, { status: e.target.value as TaskStatus })
                    }
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_META[s].label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <ProgressBar value={t.progress} status={t.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
