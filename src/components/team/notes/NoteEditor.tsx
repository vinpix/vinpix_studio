"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, FileText, Upload, Loader2 } from "lucide-react";
import type { Note } from "@/types/team";

const MAX_PDF_MB = 4;

interface NoteEditorProps {
  open: boolean;
  note: Note | null; // null = create
  onClose: () => void;
  onCreate: (input: { title: string; content: string; pdfKey?: string; pdfName?: string }) => void;
  onUpdate: (noteId: string, patch: Partial<Note>) => void;
  onDelete: (noteId: string) => void;
  uploadPdf: (file: File) => Promise<{ pdfKey: string; pdfName: string }>;
  onError: (message: string) => void;
}

const labelCls = "block font-mono text-[10px] uppercase tracking-widest text-black/50 mb-1";
const inputCls =
  "w-full border-2 border-black bg-white px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black";

export function NoteEditor({
  open,
  note,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  uploadPdf,
  onError,
}: NoteEditorProps) {
  const isEdit = !!note;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfKey, setPdfKey] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setShowProgress(note?.showProgress ?? false);
    setProgress(note?.progress ?? 0);
    setPdfKey(note?.pdfKey ?? "");
    setPdfName(note?.pdfName ?? "");
  }, [open, note]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      onError("Chỉ nhận tệp PDF");
      return;
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      onError(`PDF tối đa ${MAX_PDF_MB}MB`);
      return;
    }
    setUploading(true);
    try {
      const res = await uploadPdf(file);
      setPdfKey(res.pdfKey);
      setPdfName(res.pdfName);
    } catch (e) {
      onError(e instanceof Error ? e.message : "Tải PDF thất bại");
    } finally {
      setUploading(false);
    }
  };

  const submit = () => {
    if (!title.trim()) return;
    if (isEdit && note) {
      onUpdate(note.note_id, {
        title: title.trim(),
        content,
        showProgress,
        progress: Number(progress) || 0,
        pdfKey,
        pdfName,
      });
    } else {
      onCreate({ title: title.trim(), content, pdfKey, pdfName });
      // progress flag for new note via a follow-up is overkill; created note carries pdf + text
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
                {isEdit ? "Sửa ghi chú" : "Ghi chú mới"}
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
                  placeholder="VD: Tài liệu thiết kế màn 2"
                  autoFocus
                />
              </div>

              <div>
                <label className={labelCls}>Nội dung</label>
                <textarea
                  className={`${inputCls} min-h-[120px] resize-y`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* PDF */}
              <div>
                <label className={labelCls}>Tệp PDF</label>
                {pdfKey ? (
                  <div className="flex items-center justify-between gap-2 border-2 border-black bg-[#FEF3C7] px-3 py-2">
                    <span className="flex min-w-0 items-center gap-2 text-sm font-bold">
                      <FileText size={15} className="shrink-0" />
                      <span className="truncate">{pdfName}</span>
                    </span>
                    <button
                      onClick={() => {
                        setPdfKey("");
                        setPdfName("");
                      }}
                      className="shrink-0 text-xs font-bold uppercase text-red-600 hover:underline"
                    >
                      Bỏ
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed border-black/40 px-3 py-3 text-xs font-bold uppercase tracking-wide text-black/50 hover:bg-black/5">
                    {uploading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> Đang tải...
                      </>
                    ) : (
                      <>
                        <Upload size={15} /> Chọn / kéo PDF vào đây
                      </>
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </label>
                )}
              </div>

              {/* progress (edit mode only — needs persisted note) */}
              {isEdit && (
                <div className="border-2 border-black p-3">
                  <label className="flex cursor-pointer items-center justify-between">
                    <span className={`${labelCls} mb-0`}>Hiện tiến độ</span>
                    <input
                      type="checkbox"
                      checked={showProgress}
                      onChange={(e) => setShowProgress(e.target.checked)}
                      className="h-4 w-4 accent-black"
                    />
                  </label>
                  {showProgress && (
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="flex-1 accent-black"
                      />
                      <span className="w-10 text-right font-mono text-xs tabular-nums">{progress}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <footer className="flex items-center gap-3 border-t-2 border-black bg-gray-50 p-3">
              {isEdit && (
                <button
                  onClick={() => {
                    onDelete(note!.note_id);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 border-2 border-black px-3 py-2 text-xs font-bold uppercase text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={14} /> Xoá
                </button>
              )}
              <button
                onClick={submit}
                disabled={!title.trim() || uploading}
                className="ml-auto flex-1 border-2 border-black bg-black px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5 disabled:opacity-40"
              >
                {isEdit ? "Lưu thay đổi" : "Tạo ghi chú"}
              </button>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
