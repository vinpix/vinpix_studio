"use client";

/**
 * Single source of truth for /team data, provided at the board layout so it
 * survives view switches. All four views read this; none refetch on switch.
 * Mutations are optimistic with snapshot -> apply -> call -> revert+toast.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Task, Member, TaskStatus, CreateTaskInput } from "@/types/team";
import * as api from "@/lib/teamApi";

type LoadState = "loading" | "ready" | "error";

interface TeamDataValue {
  tasks: Task[];
  members: Member[];
  state: LoadState;
  error: string | null;
  refetch: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (taskId: string, patch: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (taskId: string, toStatus: TaskStatus, toOrder: number) => Promise<void>;
}

const TeamDataContext = createContext<TeamDataValue | null>(null);

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "Đã xảy ra lỗi";
}

interface ProviderProps {
  children: React.ReactNode;
  onToast: (message: string, kind: "error" | "success") => void;
}

export function TeamDataProvider({ children, onToast }: ProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);

  // keep latest tasks in a ref so optimistic snapshots are always current
  const tasksRef = useRef<Task[]>([]);
  tasksRef.current = tasks;

  const refetch = useCallback(async () => {
    try {
      setState((s) => (s === "ready" ? s : "loading"));
      const [t, m] = await Promise.all([api.listTasks(), api.listMembers()]);
      setTasks(t);
      setMembers(m);
      setState("ready");
      setError(null);
    } catch (e) {
      setError(errMsg(e));
      setState("error");
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createTask = useCallback(
    async (input: CreateTaskInput) => {
      const snapshot = tasksRef.current;
      const tempId = `tmp_${Date.now()}`;
      const optimistic: Task = {
        task_id: tempId,
        code: "···",
        name: input.name,
        description: input.description ?? "",
        assigneeId: input.assigneeId ?? "",
        role: input.role ?? "",
        priority: input.priority ?? "trung_binh",
        assignedDate: input.assignedDate ?? "",
        deadline: input.deadline ?? "",
        status: input.status ?? "chua_bat_dau",
        progress: input.progress ?? 0,
        notes: input.notes ?? "",
        links: input.links ?? [],
        order: input.order ?? Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "",
      };
      setTasks([...snapshot, optimistic]);
      try {
        const created = await api.createTask(input);
        setTasks((cur) => cur.map((t) => (t.task_id === tempId ? created : t)));
        onToast(`Đã tạo ${created.code}`, "success");
      } catch (e) {
        setTasks(snapshot);
        onToast(errMsg(e), "error");
      }
    },
    [onToast]
  );

  const updateTask = useCallback(
    async (taskId: string, patch: Partial<Task>) => {
      const snapshot = tasksRef.current;
      setTasks(snapshot.map((t) => (t.task_id === taskId ? { ...t, ...patch } : t)));
      try {
        const updated = await api.updateTask(taskId, patch);
        setTasks((cur) => cur.map((t) => (t.task_id === taskId ? updated : t)));
      } catch (e) {
        setTasks(snapshot);
        onToast(`Lưu thất bại — đã hoàn tác. ${errMsg(e)}`, "error");
      }
    },
    [onToast]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      const snapshot = tasksRef.current;
      setTasks(snapshot.filter((t) => t.task_id !== taskId));
      try {
        await api.deleteTask(taskId);
        onToast("Đã xoá công việc", "success");
      } catch (e) {
        setTasks(snapshot);
        onToast(errMsg(e), "error");
      }
    },
    [onToast]
  );

  const moveTask = useCallback(
    async (taskId: string, toStatus: TaskStatus, toOrder: number) => {
      const snapshot = tasksRef.current;
      const patch: Partial<Task> = { status: toStatus, order: toOrder };
      if (toStatus === "hoan_thanh") patch.progress = 100;
      setTasks(snapshot.map((t) => (t.task_id === taskId ? { ...t, ...patch } : t)));
      try {
        const updated = await api.reorderTask(taskId, toStatus, toOrder);
        // also persist auto-completion progress if we set it
        const finalTask =
          patch.progress === 100 && updated.progress !== 100
            ? await api.updateTask(taskId, { progress: 100 })
            : updated;
        setTasks((cur) => cur.map((t) => (t.task_id === taskId ? finalTask : t)));
      } catch (e) {
        setTasks(snapshot);
        onToast(`Di chuyển thất bại — đã hoàn tác. ${errMsg(e)}`, "error");
      }
    },
    [onToast]
  );

  const value = useMemo<TeamDataValue>(
    () => ({
      tasks,
      members,
      state,
      error,
      refetch,
      createTask,
      updateTask,
      deleteTask,
      moveTask,
    }),
    [tasks, members, state, error, refetch, createTask, updateTask, deleteTask, moveTask]
  );

  return <TeamDataContext.Provider value={value}>{children}</TeamDataContext.Provider>;
}

export function useTeamData(): TeamDataValue {
  const ctx = useContext(TeamDataContext);
  if (!ctx) throw new Error("useTeamData must be used within TeamDataProvider");
  return ctx;
}
