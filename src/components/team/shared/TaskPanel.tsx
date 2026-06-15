"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Task } from "@/types/team";
import { useTeamData } from "@/hooks/useTeamData";
import { TaskFormPanel } from "./TaskFormPanel";

interface TaskPanelValue {
  openCreate: () => void;
  openEdit: (task: Task) => void;
}

const TaskPanelContext = createContext<TaskPanelValue | null>(null);

export function TaskPanelProvider({ children }: { children: React.ReactNode }) {
  const { members, createTask, updateTask, deleteTask } = useTeamData();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  const openCreate = useCallback(() => {
    setTask(null);
    setOpen(true);
  }, []);

  const openEdit = useCallback((t: Task) => {
    setTask(t);
    setOpen(true);
  }, []);

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
