"use client";

import { useCallback, useMemo } from "react";
import { Share2 } from "lucide-react";
import type { Task, Member } from "@/types/team";
import {
  MEMBER_TYPE_LABEL,
  MEMBER_CAPACITY,
} from "@/lib/teamConstants";
import { groupByAssignee, selectFiltered, isOverdue, formatRelative } from "@/lib/teamUtils";
import { useTeamData } from "@/hooks/useTeamData";
import { useTeamView } from "@/hooks/useTeamView";
import { useToast } from "../shared/Toast";
import { useTaskPanel } from "../shared/TaskPanel";
import { MemberAvatar, StatusBadge, PriorityChip, DeadlinePill } from "../shared/badges";

interface SectionProps {
  member: Member | null; // null = unassigned bucket
  tasks: Task[];
  onOpen: (t: Task) => void;
  onShare: (t: Task) => void;
}

function MemberSection({ member, tasks, onOpen, onShare }: SectionProps) {
  const open = tasks.filter((t) => t.status !== "hoan_thanh").length;
  const overdue = tasks.filter(isOverdue).length;
  const cap = Math.max(MEMBER_CAPACITY, open);
  const load = (open / cap) * 100;
  const loadColor = open > MEMBER_CAPACITY ? "#DC2626" : open === MEMBER_CAPACITY ? "#D97706" : "#16A34A";

  return (
    <section className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <header className="flex flex-wrap items-center gap-3 border-b-2 border-black bg-gray-50 px-4 py-3">
        <MemberAvatar member={member ?? undefined} size={36} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black uppercase tracking-tight">
              {member?.name ?? "Chưa giao"}
            </h3>
            {member && (
              <span className="border border-black px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide">
                {MEMBER_TYPE_LABEL[member.type]}
              </span>
            )}
          </div>
          {member?.role && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/45">{member.role}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-28">
            <div className="relative h-3 border border-black bg-black/5">
              <div className="h-full border-r border-black" style={{ width: `${load}%`, background: loadColor }} />
            </div>
            <p className="mt-1 text-right font-mono text-[9px] text-black/50">{open} đang mở</p>
          </div>
          {overdue > 0 && (
            <span className="font-mono text-[11px] font-bold text-red-600">⚠ {overdue}</span>
          )}
        </div>
      </header>

      {tasks.length === 0 ? (
        <p className="px-4 py-4 font-mono text-[11px] uppercase tracking-widest text-black/30">
          Chưa có công việc
        </p>
      ) : (
        <ul>
          {tasks
            .slice()
            .sort((a, b) => a.status.localeCompare(b.status))
            .map((t) => (
              <li
                key={t.task_id}
                className="flex items-stretch border-b border-black/10"
                style={{ borderLeft: isOverdue(t) ? "4px solid #DC2626" : "4px solid transparent" }}
              >
                <button
                  onClick={() => onOpen(t)}
                  className="flex min-w-0 flex-1 flex-wrap items-center gap-2 px-4 py-2.5 text-left hover:bg-black/[0.03]"
                >
                  <span className="font-mono text-[10px] text-black/40">{t.code}</span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-bold">{t.name}</span>
                    {t.updatedAt && (
                      <span className="font-mono text-[9px] lowercase tracking-wide text-black/35">
                        cập nhật {formatRelative(t.updatedAt)}
                      </span>
                    )}
                  </span>
                  <PriorityChip priority={t.priority} showLabel={false} />
                  <StatusBadge status={t.status} />
                  <DeadlinePill deadline={t.deadline} done={t.status === "hoan_thanh"} />
                  <span className="w-10 text-right font-mono text-[10px] text-black/50">{t.progress}%</span>
                </button>
                <button
                  onClick={() => onShare(t)}
                  title="Copy link chia sẻ công việc"
                  aria-label={`Chia sẻ công việc ${t.code}`}
                  className="flex shrink-0 items-center justify-center border-l border-black/10 px-3 text-black/45 hover:bg-black/[0.05] hover:text-black"
                >
                  <Share2 size={14} />
                </button>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

export function MemberBoard() {
  const { tasks, members } = useTeamData();
  const { filters } = useTeamView();
  const { openEdit } = useTaskPanel();
  const { notify } = useToast();

  const grouped = useMemo(() => groupByAssignee(selectFiltered(tasks, filters)), [tasks, filters]);

  const onShare = useCallback(
    async (t: Task) => {
      const url = `${window.location.origin}/team/members?task=${encodeURIComponent(t.task_id)}`;
      try {
        await navigator.clipboard.writeText(url);
        notify(`Đã copy link công việc ${t.code}`, "success");
      } catch {
        notify("Không copy được link, thử lại", "error");
      }
    },
    [notify]
  );

  return (
    <div className="space-y-5">
      {members.map((m) => (
        <MemberSection
          key={m.member_id}
          member={m}
          tasks={grouped[m.member_id] ?? []}
          onOpen={openEdit}
          onShare={onShare}
        />
      ))}
      {(grouped["__unassigned__"]?.length ?? 0) > 0 && (
        <MemberSection
          member={null}
          tasks={grouped["__unassigned__"]}
          onOpen={openEdit}
          onShare={onShare}
        />
      )}
    </div>
  );
}
