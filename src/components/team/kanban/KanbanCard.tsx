"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link2 } from "lucide-react";
import type { Task, Member } from "@/types/team";
import { PriorityChip, ProgressBar, DeadlinePill, MemberAvatar } from "../shared/badges";
import { isOverdue } from "@/lib/teamUtils";
import { OVERDUE_COLOR } from "@/lib/teamConstants";

interface KanbanCardProps {
  task: Task;
  member?: Member;
  onOpen: (task: Task) => void;
  overlay?: boolean;
}

export function KanbanCard({ task, member, onOpen, overlay }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.task_id, data: { status: task.status } });

  const overdue = isOverdue(task);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderLeft: overdue ? `4px solid ${OVERDUE_COLOR}` : undefined,
    opacity: isDragging && !overlay ? 0.35 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onOpen(task)}
      className={`group cursor-grab border-2 border-black bg-white p-3 active:cursor-grabbing ${
        overlay
          ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]"
          : "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
      }`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-bold tracking-wider text-black/40">
          {task.code}
        </span>
        <PriorityChip priority={task.priority} showLabel={false} />
      </div>

      <h4 className="mb-2 text-sm font-bold leading-snug text-black">{task.name}</h4>

      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs text-black/60">
          <MemberAvatar member={member} size={18} />
          <span className="max-w-[90px] truncate">{member?.name ?? "Chưa giao"}</span>
        </span>
        <DeadlinePill deadline={task.deadline} done={task.status === "hoan_thanh"} />
      </div>

      <ProgressBar value={task.progress} status={task.status} />

      {task.links.length > 0 && (
        <div className="mt-2 flex items-center gap-1 font-mono text-[10px] text-black/40">
          <Link2 size={11} /> {task.links.length} liên kết
        </div>
      )}
    </article>
  );
}
