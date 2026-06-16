"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Note } from "@/types/team";
import * as api from "@/lib/teamApi";

type LoadState = "loading" | "ready" | "error";

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "Đã xảy ra lỗi";
}

interface UseNotesResult {
  notes: Note[];
  state: LoadState;
  error: string | null;
  refetch: () => Promise<void>;
  createNote: (input: { title: string; content?: string; pdfKey?: string; pdfName?: string; createdBy?: string }) => Promise<void>;
  updateNote: (noteId: string, patch: Partial<Note>) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  uploadPdf: (file: File) => Promise<{ pdfKey: string; pdfName: string }>;
  pdfUrl: (key: string) => Promise<string>;
}

/** Self-contained notes store (separate from task data) with optimistic updates. */
export function useNotes(onToast: (m: string, k: "error" | "success") => void): UseNotesResult {
  const [notes, setNotes] = useState<Note[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<Note[]>([]);
  ref.current = notes;

  const refetch = useCallback(async () => {
    try {
      setState((s) => (s === "ready" ? s : "loading"));
      const n = await api.listNotes();
      setNotes(n);
      setState("ready");
      setError(null);
    } catch (e) {
      setError(errMsg(e));
      setState("error");
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createNote = useCallback<UseNotesResult["createNote"]>(
    async (input) => {
      try {
        const created = await api.createNote({
          title: input.title,
          content: input.content ?? "",
          pdfKey: input.pdfKey ?? "",
          pdfName: input.pdfName ?? "",
          createdBy: input.createdBy ?? "",
        });
        setNotes((cur) => [...cur, created]);
        onToast("Đã tạo ghi chú", "success");
      } catch (e) {
        onToast(errMsg(e), "error");
      }
    },
    [onToast]
  );

  const updateNote = useCallback(
    async (noteId: string, patch: Partial<Note>) => {
      const snapshot = ref.current;
      setNotes(snapshot.map((n) => (n.note_id === noteId ? { ...n, ...patch } : n)));
      try {
        const updated = await api.updateNote(noteId, patch);
        setNotes((cur) => cur.map((n) => (n.note_id === noteId ? updated : n)));
      } catch (e) {
        setNotes(snapshot);
        onToast(`Lưu thất bại — đã hoàn tác. ${errMsg(e)}`, "error");
      }
    },
    [onToast]
  );

  const deleteNote = useCallback(
    async (noteId: string) => {
      const snapshot = ref.current;
      setNotes(snapshot.filter((n) => n.note_id !== noteId));
      try {
        await api.deleteNote(noteId);
        onToast("Đã xoá ghi chú", "success");
      } catch (e) {
        setNotes(snapshot);
        onToast(errMsg(e), "error");
      }
    },
    [onToast]
  );

  const uploadPdf = useCallback(async (file: File) => {
    const base64 = await fileToDataUrl(file);
    return api.uploadNotePdf(base64, file.name);
  }, []);

  const pdfUrl = useCallback((key: string) => api.getPdfUrl(key), []);

  return { notes, state, error, refetch, createNote, updateNote, deleteNote, uploadPdf, pdfUrl };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Không đọc được tệp"));
    reader.readAsDataURL(file);
  });
}
