"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import type { Bug, BugStatus } from "@/types/team";
import { BUG_STATUS_ORDER, BUG_STATUS_META } from "@/lib/teamConstants";

interface BugEditorProps {
  open: boolean;
  bug: Bug | null; // null = create
  onClose: () => void;
  onCreate: (input: { title: string; description: string; status: BugStatus }) => void;
  onUpdate: (bugId: string, patch: Partial<Bug>) => void;
  onDelete: (bugId: string) => void;
}

const labelCls = "block font-mono text-[10px] uppercase tracking-widest text-black/50 mb-1";
const inputCls =
  "w-full border-2 border-black bg-white px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black";

export function BugEditor({
  open,
  bug,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: BugEditorProps) {
  const isEdit = !!bug;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<BugStatus>("todo");

  useEffect(() => {
    if (!open) return;
    setTitle(bug?.title ?? "");
    setDescription(bug?.description ?? "");
    setStatus(bug?.status ?? "todo");
  }, [open, bug]);

  const submit = () => {
    if (!title.trim()) return;
    if (isEdit && bug) {
      onUpdate(bug.bug_id, { title: title.trim(), description, status });
    } else {
      onCreate({ title: title.trim(), description, status });
    }
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
            onClick={onClose}
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
              <h2 className="text-base font-black uppercase tracking-tight">
                {isEdit ? "Sửa bug" : "Bug mới"}
              </h2>
              <button onClick={onClose} className="p-1 hover:opacity-70" aria-label="Đóng">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <div>
                <label className={labelCls}>Tiêu đề *</label>
                <input
                  className={inputCls}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Crash khi mở phòng co-op"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
                  }}
                />
              </div>

              <div>
                <label className={labelCls}>Mô tả</label>
                <textarea
                  className={`${inputCls} min-h-[140px] resize-y`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Các bước tái hiện, thiết bị, log lỗi..."
                />
              </div>

              <div>
                <label className={labelCls}>Trạng thái</label>
                <div className="flex flex-wrap gap-2">
                  {BUG_STATUS_ORDER.map((s) => {
                    const meta = BUG_STATUS_META[s];
                    const active = s === status;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className="border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors"
                        style={
                          active
                            ? { background: meta.accent, color: "#fff", borderColor: meta.accent }
                            : { background: "#fff", color: "#000", borderColor: "#000" }
                        }
                      >
                        {meta.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <footer className="flex items-center gap-3 border-t-2 border-black bg-gray-50 p-3">
              {isEdit && (
                <button
                  onClick={() => {
                    onDelete(bug!.bug_id);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 border-2 border-black px-3 py-2 text-xs font-bold uppercase text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={14} /> Xoá
                </button>
              )}
              <button
                onClick={submit}
                disabled={!title.trim()}
                className="ml-auto flex-1 border-2 border-black bg-black px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5 disabled:opacity-40"
              >
                {isEdit ? "Lưu thay đổi" : "Thêm bug"}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
