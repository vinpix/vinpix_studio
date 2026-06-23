/**
 * Pure helpers + selectors for the /team feature.
 * All derivation (filter / group / stats / deadline) lives here so every view
 * shares identical logic and stays small.
 */
import {
  differenceInCalendarDays,
  formatDistanceToNow,
  isValid,
  parseISO,
  format,
} from "date-fns";
import { vi } from "date-fns/locale";
import type {
  Task,
  Member,
  TaskFilters,
  TaskStatus,
  TaskPriority,
} from "@/types/team";
import { STATUS_ORDER, PRIORITY_ORDER } from "./teamConstants";

// ----- deadlines -----
export type DeadlineState = "none" | "overdue" | "soon" | "ok";

export interface DeadlineInfo {
  state: DeadlineState;
  label: string; // "dd/MM" or "Hôm nay" / "Quá 3 ngày"
  days: number | null; // days until deadline (negative = past)
}

export function getDeadlineInfo(deadline: string, done: boolean): DeadlineInfo {
  if (!deadline) return { state: "none", label: "—", days: null };
  const d = parseISO(deadline);
  if (!isValid(d)) return { state: "none", label: "—", days: null };
  const days = differenceInCalendarDays(d, new Date());
  const short = format(d, "dd/MM");
  if (done) return { state: "ok", label: short, days };
  if (days < 0) return { state: "overdue", label: short, days };
  if (days <= 2) return { state: "soon", label: short, days };
  return { state: "ok", label: short, days };
}

export function isOverdue(task: Task): boolean {
  return getDeadlineInfo(task.deadline, task.status === "hoan_thanh").state === "overdue";
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = parseISO(iso);
  return isValid(d) ? format(d, "dd/MM/yyyy") : "—";
}

/** Relative "x phút/giờ/ngày trước" for last-updated timestamps. */
export function formatRelative(iso: string): string {
  if (!iso) return "";
  const d = parseISO(iso);
  if (!isValid(d)) return "";
  return formatDistanceToNow(d, { addSuffix: true, locale: vi });
}

// ----- members -----
export function memberMap(members: Member[]): Record<string, Member> {
  return members.reduce<Record<string, Member>>((acc, m) => {
    acc[m.member_id] = m;
    return acc;
  }, {});
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ----- filtering -----
export function selectFiltered(tasks: Task[], f: TaskFilters): Task[] {
  const q = f.query.trim().toLowerCase();
  return tasks.filter((t) => {
    if (f.assigneeId && !t.assigneeIds.includes(f.assigneeId)) return false;
    if (f.status && t.status !== f.status) return false;
    if (f.priority && t.priority !== f.priority) return false;
    if (q) {
      const hay = `${t.code} ${t.name} ${t.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

// ----- grouping -----
export function groupByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  const out = {} as Record<TaskStatus, Task[]>;
  for (const s of STATUS_ORDER) out[s] = [];
  for (const t of tasks) (out[t.status] ??= []).push(t);
  for (const s of STATUS_ORDER) out[s].sort((a, b) => a.order - b.order);
  return out;
}

export interface AssigneeGroup {
  memberId: string;
  tasks: Task[];
}

export function groupByAssignee(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce<Record<string, Task[]>>((acc, t) => {
    const keys = t.assigneeIds.length > 0 ? t.assigneeIds : ["__unassigned__"];
    for (const key of keys) {
      (acc[key] ??= []).push(t);
    }
    return acc;
  }, {});
}

// ----- stats (derived client-side so they honour the browser clock) -----
export interface TeamStats {
  total: number;
  done: number;
  inProgress: number;
  overdue: number;
  completionRate: number; // 0-100
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  upcoming: Task[]; // not-done, sorted by deadline asc
}

export function computeStats(tasks: Task[]): TeamStats {
  const byStatus = {} as Record<TaskStatus, number>;
  for (const s of STATUS_ORDER) byStatus[s] = 0;
  const byPriority = {} as Record<TaskPriority, number>;
  for (const p of PRIORITY_ORDER) byPriority[p] = 0;

  let done = 0;
  let overdue = 0;
  for (const t of tasks) {
    byStatus[t.status] = (byStatus[t.status] ?? 0) + 1;
    byPriority[t.priority] = (byPriority[t.priority] ?? 0) + 1;
    if (t.status === "hoan_thanh") done += 1;
    if (isOverdue(t)) overdue += 1;
  }

  const upcoming = tasks
    .filter((t) => t.status !== "hoan_thanh" && t.deadline)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 6);

  const total = tasks.length;
  return {
    total,
    done,
    inProgress: byStatus.dang_lam,
    overdue,
    completionRate: total ? Math.round((done / total) * 100) : 0,
    byStatus,
    byPriority,
    upcoming,
  };
}
