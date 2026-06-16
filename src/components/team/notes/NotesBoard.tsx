"use client";

import { useState, useCallback } from "react";
import { Plus, FilePlus2 } from "lucide-react";
import type { Note } from "@/types/team";
import { useToast } from "../shared/Toast";
import { useNotes } from "@/hooks/useNotes";
import { useTeamData } from "@/hooks/useTeamData";
import { memberMap } from "@/lib/teamUtils";
import { EmptyState } from "../shared/EmptyState";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";
import { PdfViewerModal } from "./PdfViewerModal";

const MAX_PDF_MB = 4;
const AUTHOR_KEY = "vinpix_team_author";

export function NotesBoard() {
  const { notify } = useToast();
  const notes = useNotes(notify);
  const { members } = useTeamData();
  const mMap = memberMap(members);
  const [editing, setEditing] = useState<Note | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [viewer, setViewer] = useState<{ open: boolean; url: string | null; name: string }>({
    open: false,
    url: null,
    name: "",
  });

  const openPdf = useCallback(
    async (key: string, name: string) => {
      setViewer({ open: true, url: null, name });
      try {
        const url = await notes.pdfUrl(key);
        setViewer({ open: true, url, name });
      } catch (e) {
        setViewer({ open: false, url: null, name: "" });
        notify(e instanceof Error ? e.message : "Không mở được PDF", "error");
      }
    },
    [notes, notify]
  );

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };
  const openEdit = (note: Note) => {
    setEditing(note);
    setEditorOpen(true);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
      if (!file) {
        notify("Chỉ nhận tệp PDF", "error");
        return;
      }
      if (file.size > MAX_PDF_MB * 1024 * 1024) {
        notify(`PDF tối đa ${MAX_PDF_MB}MB`, "error");
        return;
      }
      try {
        const { pdfKey, pdfName } = await notes.uploadPdf(file);
        const author = typeof window !== "undefined" ? localStorage.getItem(AUTHOR_KEY) ?? "" : "";
        await notes.createNote({
          title: file.name.replace(/\.pdf$/i, ""),
          pdfKey,
          pdfName,
          createdBy: author,
        });
      } catch (err) {
        notify(err instanceof Error ? err.message : "Tải PDF thất bại", "error");
      }
    },
    [notes, notify]
  );

  if (notes.state === "loading") {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className="relative"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-black/45">
          {notes.notes.length} ghi chú · kéo PDF vào để tạo nhanh
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 border-2 border-black bg-black px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
        >
          <Plus size={15} /> Ghi chú
        </button>
      </div>

      {notes.notes.length === 0 ? (
        <EmptyState message="Chưa có ghi chú — kéo PDF vào hoặc bấm + Ghi chú" actionLabel="Tạo ghi chú" onAction={openCreate} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.notes.map((n) => (
            <NoteCard
              key={n.note_id}
              note={n}
              author={mMap[n.createdBy]}
              onEdit={openEdit}
              onOpenPdf={openPdf}
            />
          ))}
        </div>
      )}

      {/* drag overlay */}
      {dragOver && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="flex items-center gap-3 border-2 border-black bg-white px-6 py-4 text-lg font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <FilePlus2 size={24} /> Thả PDF để tạo ghi chú
          </div>
        </div>
      )}

      <NoteEditor
        open={editorOpen}
        note={editing}
        members={members}
        onClose={() => setEditorOpen(false)}
        onCreate={notes.createNote}
        onUpdate={notes.updateNote}
        onDelete={notes.deleteNote}
        uploadPdf={notes.uploadPdf}
        onError={(m) => notify(m, "error")}
      />

      <PdfViewerModal
        open={viewer.open}
        url={viewer.url}
        name={viewer.name}
        onClose={() => setViewer({ open: false, url: null, name: "" })}
      />
    </div>
  );
}
