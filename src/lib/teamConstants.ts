/**
 * Shared display config for the /team feature: labels, colors, ordering.
 * Colors are concrete hex (used via inline style) so Tailwind needn't know dynamic classes.
 */
import type { TaskStatus, TaskPriority, MemberType, BugStatus } from "@/types/team";

export interface StatusMeta {
  key: TaskStatus;
  label: string;
  accent: string; // dot / bar / chip accent
  tint: string; // 8% bg wash for columns/rows
}

export const STATUS_ORDER: TaskStatus[] = [
  "chua_bat_dau",
  "dang_lam",
  "cho_review",
  "hoan_thanh",
  "tam_hoan",
];

export const STATUS_META: Record<TaskStatus, StatusMeta> = {
  chua_bat_dau: { key: "chua_bat_dau", label: "Chưa bắt đầu", accent: "#6B7280", tint: "rgba(107,114,128,0.10)" },
  dang_lam: { key: "dang_lam", label: "Đang làm", accent: "#2563EB", tint: "rgba(37,99,235,0.10)" },
  cho_review: { key: "cho_review", label: "Chờ review", accent: "#7C3AED", tint: "rgba(124,58,237,0.10)" },
  hoan_thanh: { key: "hoan_thanh", label: "Hoàn thành", accent: "#059669", tint: "rgba(5,150,105,0.10)" },
  tam_hoan: { key: "tam_hoan", label: "Tạm hoãn", accent: "#D97706", tint: "rgba(217,119,6,0.10)" },
};

export interface PriorityMeta {
  key: TaskPriority;
  label: string;
  accent: string;
  bg: string;
  text: string;
  emoji: string;
}

export const PRIORITY_ORDER: TaskPriority[] = ["cao", "trung_binh", "thap"];

export const PRIORITY_META: Record<TaskPriority, PriorityMeta> = {
  cao: { key: "cao", label: "Cao", accent: "#DC2626", bg: "#DC2626", text: "#FFFFFF", emoji: "🔴" },
  trung_binh: { key: "trung_binh", label: "Trung bình", accent: "#D97706", bg: "#FEF3C7", text: "#92400E", emoji: "🟡" },
  thap: { key: "thap", label: "Thấp", accent: "#16A34A", bg: "#DCFCE7", text: "#166534", emoji: "🟢" },
};

export const MEMBER_TYPE_LABEL: Record<MemberType, string> = {
  full_time: "Full-time",
  intern: "Thực tập",
};

export const OVERDUE_COLOR = "#DC2626";
export const SOON_COLOR = "#D97706";

export const VIEW_TABS: { key: import("@/types/team").TeamView; label: string }[] = [
  { key: "kanban", label: "Bảng" },
  { key: "table", label: "Danh sách" },
  { key: "dashboard", label: "Tổng quan" },
  { key: "members", label: "Thành viên" },
  { key: "notes", label: "Ghi chú" },
  { key: "bugs", label: "Bug" },
];

export interface BugStatusMeta {
  key: BugStatus;
  label: string;
  accent: string;
  tint: string;
}

export const BUG_STATUS_ORDER: BugStatus[] = ["todo", "review", "still_bug", "done"];

export const BUG_STATUS_META: Record<BugStatus, BugStatusMeta> = {
  todo: { key: "todo", label: "Chưa làm", accent: "#6B7280", tint: "rgba(107,114,128,0.10)" },
  review: { key: "review", label: "Cần review", accent: "#7C3AED", tint: "rgba(124,58,237,0.10)" },
  still_bug: { key: "still_bug", label: "Vẫn còn bug", accent: "#DC2626", tint: "rgba(220,38,38,0.10)" },
  done: { key: "done", label: "Done", accent: "#059669", tint: "rgba(5,150,105,0.10)" },
};

/** Soft per-person capacity used by the member workload meters. */
export const MEMBER_CAPACITY = 5;
