"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Loader2 } from "lucide-react";

interface PdfViewerModalProps {
  open: boolean;
  pdfKey: string | null;
  name: string;
  onClose: () => void;
}

export function PdfViewerModal({ open, pdfKey, name, onClose }: PdfViewerModalProps) {
  const url = pdfKey ? `/api/team/pdf?key=${encodeURIComponent(pdfKey)}` : null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex flex-col bg-black/60 p-3 sm:p-6 print:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex h-full w-full max-w-5xl flex-col border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <header className="flex items-center justify-between gap-3 border-b-2 border-black bg-black px-4 py-2.5 text-white">
              <h3 className="flex min-w-0 items-center gap-2 text-sm font-black uppercase tracking-tight">
                <span className="truncate">{name || "Tài liệu PDF"}</span>
              </h3>
              <div className="flex shrink-0 items-center gap-2">
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 border border-white/40 px-2 py-1 text-[11px] font-bold uppercase tracking-wide hover:bg-white/10"
                  >
                    <ExternalLink size={13} /> Tab mới
                  </a>
                )}
                <button onClick={onClose} className="p-1 hover:opacity-70" aria-label="Đóng">
                  <X size={20} />
                </button>
              </div>
            </header>

            <div className="relative flex-1 bg-[#525659]">
              {url ? (
                <iframe src={url} title={name} className="h-full w-full" />
              ) : (
                <div className="flex h-full items-center justify-center text-white">
                  <Loader2 size={28} className="animate-spin" />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
