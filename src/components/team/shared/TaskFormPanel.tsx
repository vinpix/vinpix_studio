"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import type { Task, Member, TaskStatus, TaskPriority, CreateTaskInput } from "@/types/team";
import { STATUS_ORDER, STATUS_META, PRIORITY_ORDER, PRIORITY_META } from "@/lib/teamConstants";
import { QuickDateField } from "./QuickDateField";
import { AssigneeMultiSelect } from "./AssigneeMultiSelect";

interface TaskFormPanelProps {
  open: boolean;
  task: Task | null; // null = create mode
  members: Member[];
  onClose: () => void;
  onCreate: (input: CreateTaskInput) => void;
  onUpdate: (taskId: string, patch: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

interface FormState {
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedDate: string;
  deadline: string;
  progress: number;
  notes: string;
  links: string;
  assigneeIds: string[];
}

function toForm(task: Task | null, members: Member[]): FormState {
  if (!task) {
    return {
      name: "",
      description: "",
      assigneeIds: [],
      priority: "trung_binh",
      status: "chua_bat_dau",
      assignedDate: "",
      deadline: "",
      progress: 0,
      notes: "",
      links: "",
    };
  }
  return {
    name: task.name,
    description: task.description,
    assigneeIds: task.assigneeIds,
    priority: task.priority,
    status: task.status,
    assignedDate: task.assignedDate,
    deadline: task.deadline,
    progress: task.progress,
    notes: task.notes,
    links: task.links.join("\n"),
  };
}

function formsEqual(a: FormState, b: FormState): boolean {
  return (
    a.name === b.name &&
    a.description === b.description &&
    a.priority === b.priority &&
    a.status === b.status &&
    a.assignedDate === b.assignedDate &&
    a.deadline === b.deadline &&
    Number(a.progress) === Number(b.progress) &&
    a.notes === b.notes &&
    a.links === b.links &&
    a.assigneeIds.join(",") === b.assigneeIds.join(",")
  );
}

const labelCls = "block font-mono text-[10px] uppercase tracking-widest text-black/50 mb-1";
const inputCls =
  "w-full border-2 border-black bg-white px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black";

export function TaskFormPanel({
  open,
  task,
  members,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: TaskFormPanelProps) {
  const [form, setForm] = useState<FormState>(() => toForm(task, members));
  const isEdit = !!task;
  // Snapshot of the form as opened, so close can skip a no-op save.
  const initialRef = useRef<FormState>(form);
  // Set when delete is pressed so close skips the auto-save for that task.
  const skipSaveRef = useRef(false);

  useEffect(() => {
    if (open) {
      const initial = toForm(task, members);
      setForm(initial);
      initialRef.current = initial;
      skipSaveRef.current = false;
    }
  }, [open, task, members]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Auto-save on close: persist if valid + changed, then close.
  const commitAndClose = () => {
    if (skipSaveRef.current || !form.name.trim()) {
      onClose();
      return;
    }
    if (isEdit && formsEqual(form, initialRef.current)) {
      onClose();
      return;
    }
    const links = form.links
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const payload = {
      name: form.name.trim(),
      description: form.description,
      assigneeIds: form.assigneeIds,
      role: members.find((m) => m.member_id === form.assigneeIds[0])?.role ?? "",
      priority: form.priority,
      status: form.status,
      assignedDate: form.assignedDate,
      deadline: form.deadline,
      progress: Number(form.progress) || 0,
      notes: form.notes,
      links,
    };
    if (isEdit && task) onUpdate(task.task_id, payload);
    else onCreate(payload);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={commitAndClose}
            className="fixed inset-0 z-[90] bg-black/30 print:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col border-l-2 border-black bg-white print:hidden"
          >
            <header className="flex items-center justify-between border-b-2 border-black bg-black px-4 py-2.5 text-white">
              <h2 className="flex items-baseline gap-2 text-base font-black uppercase tracking-tight">
                {isEdit ? "Chỉnh sửa" : "Tạo công việc"}
                <span className="font-mono text-[10px] font-bold tracking-widest opacity-60">
                  {isEdit ? task!.code : "MỚI"}
                </span>
              </h2>
              <button onClick={commitAndClose} className="p-1 hover:opacity-70" aria-label="Đóng">
                <X size={20} />
              </button>
            </header>

            <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-4">
              <div>
                <label className={labelCls}>Tên công việc *</label>
                <input
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="VD: Thiết kế màn hình thắng"
                  autoFocus
                />
              </div>
              <div>
                <label className={labelCls}>Mô tả chi tiết</label>
                <textarea
                  className={`${inputCls} min-h-[52px] resize-y`}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Người phụ trách (có thể nhiều người)</label>
                <AssigneeMultiSelect
                  members={members}
                  value={form.assigneeIds}
                  onChange={(ids) => set("assigneeIds", ids)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={labelCls}>Ưu tiên</label>
                  <select
                    className={inputCls}
                    value={form.priority}
                    onChange={(e) => set("priority", e.target.value as TaskPriority)}
                  >
                    {PRIORITY_ORDER.map((p) => (
                      <option key={p} value={p}>
                        {PRIORITY_META[p].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Trạng thái</label>
                  <select
                    className={inputCls}
                    value={form.status}
                    onChange={(e) => set("status", e.target.value as TaskStatus)}
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_META[s].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={labelCls}>Tiến độ (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className={inputCls}
                    value={form.progress}
                    onChange={(e) => set("progress", Number(e.target.value))}
                  />
                </div>
              </div>
              <QuickDateField
                label="Ngày giao"
                value={form.assignedDate}
                onChange={(v) => set("assignedDate", v)}
              />
              <QuickDateField
                label="Deadline"
                value={form.deadline}
                onChange={(v) => set("deadline", v)}
              />
              <div>
                <label className={labelCls}>Ghi chú</label>
                <input
                  className={inputCls}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Liên kết (mỗi dòng 1 link)</label>
                <textarea
                  className={`${inputCls} min-h-[42px] resize-y font-mono text-xs`}
                  value={form.links}
                  onChange={(e) => set("links", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <footer className="flex items-center gap-3 border-t-2 border-black bg-gray-50 p-3">
              {isEdit && (
                <button
                  onClick={() => {
                    skipSaveRef.current = true;
                    onDelete(task!.task_id);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 border-2 border-black px-3 py-2 text-xs font-bold uppercase text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={14} /> Xoá
                </button>
              )}
              <button
                onClick={commitAndClose}
                disabled={!isEdit && !form.name.trim()}
                className="ml-auto flex-1 border-2 border-black bg-black px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5 disabled:opacity-40"
              >
                {isEdit ? "Xong" : "Tạo công việc"}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
