"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Task, Member, TaskStatus } from "@/types/team";
import { STATUS_ORDER } from "@/lib/teamConstants";
import { groupByStatus, selectFiltered, memberMap } from "@/lib/teamUtils";
import { useTeamData } from "@/hooks/useTeamData";
import { useTeamView } from "@/hooks/useTeamView";
import { useTaskPanel } from "../shared/TaskPanel";
import { assigneesOf } from "../shared/badges";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

/** Order value to drop `active` at `index` within `list` (active already removed). */
function orderFor(list: Task[], index: number): number {
  const STEP = 1000;
  const prev = list[index - 1]?.order;
  const next = list[index]?.order;
  if (prev === undefined && next === undefined) return STEP;
  if (prev === undefined) return next! - STEP;
  if (next === undefined) return prev + STEP;
  return (prev + next) / 2;
}

export function KanbanBoard() {
  const { tasks, members, moveTask } = useTeamData();
  const { filters } = useTeamView();
  const { openEdit } = useTaskPanel();
  const [activeId, setActiveId] = useState<string | null>(null);

  const mMap = useMemo(() => memberMap(members), [members]);
  const columns = useMemo(
    () => groupByStatus(selectFiltered(tasks, filters)),
    [tasks, filters]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeTask = activeId ? tasks.find((t) => t.task_id === activeId) : null;

  const handleStart = (e: DragStartEvent) => setActiveId(String(e.active.id));

  const handleEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const activeTaskId = String(active.id);
    const task = tasks.find((t) => t.task_id === activeTaskId);
    if (!task) return;

    // resolve target status
    const overId = String(over.id);
    let targetStatus: TaskStatus;
    if (overId.startsWith("col:")) {
      targetStatus = overId.slice(4) as TaskStatus;
    } else {
      const overTask = tasks.find((t) => t.task_id === overId);
      targetStatus = overTask?.status ?? task.status;
    }

    // list in target column excluding the dragged task, ordered
    const list = columns[targetStatus].filter((t) => t.task_id !== activeTaskId);
    let index = list.length;
    if (!overId.startsWith("col:")) {
      const at = list.findIndex((t) => t.task_id === overId);
      if (at >= 0) index = at;
    }

    const newOrder = orderFor(list, index);
    if (task.status === targetStatus && task.order === newOrder) return;
    moveTask(activeTaskId, targetStatus, newOrder);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleStart}
      onDragEnd={handleEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUS_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={columns[status]}
            memberMap={mMap}
            onOpen={openEdit}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <KanbanCard
            task={activeTask}
            members={assigneesOf(activeTask.assigneeIds, mMap)}
            onOpen={() => {}}
            overlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
