"use client";

import { FileText, Pencil } from "lucide-react";
import type { Note } from "@/types/team";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onOpenPdf: (key: string) => void;
}

export function NoteCard({ note, onEdit, onOpenPdf }: NoteCardProps) {
  const progress = Math.max(0, Math.min(100, note.progress));
  return (
    <article className="flex flex-col border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-black uppercase leading-tight tracking-tight">{note.title}</h3>
        <button
          onClick={() => onEdit(note)}
          className="shrink-0 p-1 text-black/40 transition-colors hover:text-black"
          aria-label="Sửa ghi chú"
        >
          <Pencil size={15} />
        </button>
      </div>

      {note.content && (
        <p className="mb-3 line-clamp-4 whitespace-pre-wrap text-xs leading-relaxed text-black/65">
          {note.content}
        </p>
      )}

      {note.pdfKey && (
        <button
          onClick={() => onOpenPdf(note.pdfKey)}
          className="mb-3 flex items-center gap-2 self-start border-2 border-black bg-[#FEF3C7] px-2.5 py-1.5 text-xs font-bold transition-transform active:translate-y-0.5"
        >
          <FileText size={14} />
          <span className="max-w-[180px] truncate">{note.pdfName || "Tài liệu PDF"}</span>
        </button>
      )}

      {note.showProgress && (
        <div className="mt-auto pt-2">
          <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-black/45">
            <span>Tiến độ</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="relative h-2.5 border border-black bg-black/5">
            <div
              className="h-full border-r border-black bg-[#2563EB] transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </article>
  );
}
