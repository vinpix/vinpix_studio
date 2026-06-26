"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Task } from "@/types/team";
import { useTeamData } from "@/hooks/useTeamData";
import { TaskFormPanel } from "./TaskFormPanel";

interface TaskPanelValue {
  openCreate: () => void;
  openEdit: (task: Task) => void;
}

const TaskPanelContext = createContext<TaskPanelValue | null>(null);

export function TaskPanelProvider({ children }: { children: React.ReactNode }) {
  const { members, tasks, createTask, updateTask, deleteTask } = useTeamData();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  // Tracks the last ?task= value handled, so the deep-link opens only once.
  const handledRef = useRef<string | null>(null);

  const openCreate = useCallback(() => {
    setTask(null);
    setOpen(true);
  }, []);

  const openEdit = useCallback((t: Task) => {
    setTask(t);
    setOpen(true);
  }, []);

  // Deep-link: a shared ?task=<id|code> link opens that task's panel, then the
  // param is stripped so closing/reopening doesn't re-trigger it.
  useEffect(() => {
    const ref = params.get("task");
    if (!ref) {
      handledRef.current = null;
      return;
    }
    if (handledRef.current === ref) return;
    if (tasks.length === 0) return; // wait for data to load
    handledRef.current = ref;
    const found = tasks.find(
      (t) => t.task_id === ref || t.code.toLowerCase() === ref.toLowerCase()
    );
    const next = new URLSearchParams(params.toString());
    next.delete("task");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    if (found) openEdit(found);
  }, [params, tasks, pathname, router, openEdit]);

  return (
    <TaskPanelContext.Provider value={{ openCreate, openEdit }}>
      {children}
      <TaskFormPanel
        open={open}
        task={task}
        members={members}
        onClose={() => setOpen(false)}
        onCreate={createTask}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </TaskPanelContext.Provider>
  );
}

export function useTaskPanel(): TaskPanelValue {
  const ctx = useContext(TaskPanelContext);
  if (!ctx) throw new Error("useTaskPanel must be used within TaskPanelProvider");
  return ctx;
}
