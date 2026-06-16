"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { Task, Member, TaskStatus } from "@/types/team";
import { STATUS_META } from "@/lib/teamConstants";
import { assigneesOf } from "../shared/badges";
import { KanbanCard } from "./KanbanCard";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  memberMap: Record<string, Member>;
  onOpen: (task: Task) => void;
}

export function KanbanColumn({ status, tasks, memberMap, onOpen }: KanbanColumnProps) {
  const meta = STATUS_META[status];
  const { setNodeRef, isOver } = useDroppable({ id: `col:${status}` });

  return (
    <section className="flex w-[290px] shrink-0 flex-col">
      <header className="flex items-center justify-between border-2 border-black bg-white px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.accent }} />
          {meta.label}
        </span>
        <span className="bg-black px-1.5 font-mono text-[11px] font-bold text-white">
          {tasks.length}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className="mt-2 flex min-h-[120px] flex-1 flex-col gap-2.5 border-2 border-dashed p-2 transition-colors"
        style={{
          background: meta.tint,
          borderColor: isOver ? "#000" : "rgba(0,0,0,0.15)",
        }}
      >
        <SortableContext items={tasks.map((t) => t.task_id)} strategy={verticalListSortingStrategy}>
          {tasks.map((t) => (
            <KanbanCard
              key={t.task_id}
              task={t}
              members={assigneesOf(t.assigneeIds, memberMap)}
              onOpen={onOpen}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <p className="flex flex-1 items-center justify-center font-mono text-[10px] uppercase tracking-widest text-black/30">
            Trống
          </p>
        )}
      </div>
    </section>
  );
}
