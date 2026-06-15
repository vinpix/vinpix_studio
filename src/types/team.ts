/**
 * Team Task Management types (/team).
 * Mirrors the lambda team_tasks.py shapes. String-literal unions, not enums.
 */

export type TaskStatus =
  | "chua_bat_dau"
  | "dang_lam"
  | "cho_review"
  | "hoan_thanh"
  | "tam_hoan";

export type TaskPriority = "cao" | "trung_binh" | "thap";

export type MemberType = "full_time" | "intern";

export interface Task {
  task_id: string;
  code: string; // "T001"
  name: string;
  description: string;
  assigneeId: string;
  role: string;
  priority: TaskPriority;
  assignedDate: string; // ISO date or ""
  deadline: string; // ISO date or ""
  status: TaskStatus;
  progress: number; // 0-100
  notes: string;
  links: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Member {
  member_id: string;
  name: string;
  avatar: string;
  role: string;
  joinDate: string;
  type: MemberType;
  status: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TeamView = "kanban" | "table" | "dashboard" | "members";

export interface TaskFilters {
  assigneeId: string | null;
  status: TaskStatus | null;
  priority: TaskPriority | null;
  query: string;
}

export type CreateTaskInput = Partial<Omit<Task, "task_id" | "code">> & {
  name: string;
};
