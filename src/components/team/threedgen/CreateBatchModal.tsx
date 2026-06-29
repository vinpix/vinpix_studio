"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface CreateBatchModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description?: string) => Promise<void> | void;
}

export function CreateBatchModal({ open, onClose, onCreate }: CreateBatchModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setBusy(false);
    }
  }, [open]);

  const submit = async () => {
    const trimmed = name.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    try {
      await onCreate(trimmed, description.trim() || undefined);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center justify-between border-b-2 border-black bg-black px-4 py-3">
              <h2 className="text-sm font-black uppercase tracking-wide text-white">
                Tạo batch mới
              </h2>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-white"
                aria-label="Đóng"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                  Tên batch
                </span>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="VD: Concept ghế sofa"
                  className="border-2 border-black px-3 py-2 text-sm outline-none focus:bg-black/[0.03]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">
                  Mô tả (tuỳ chọn)
                </span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Ghi chú ngắn về batch này…"
                  className="resize-none border-2 border-black px-3 py-2 text-sm outline-none focus:bg-black/[0.03]"
                />
              </label>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={onClose}
                  className="border-2 border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-black/5"
                >
                  Huỷ
                </button>
                <button
                  onClick={submit}
                  disabled={!name.trim() || busy}
                  className="border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5 disabled:opacity-40"
                >
                  {busy ? "Đang tạo…" : "Tạo batch"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
