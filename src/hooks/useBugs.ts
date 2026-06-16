"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Bug, BugStatus } from "@/types/team";
import * as api from "@/lib/teamApi";

type LoadState = "loading" | "ready" | "error";

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "Đã xảy ra lỗi";
}

interface CreateBugInput {
  title: string;
  description?: string;
  status?: BugStatus;
}

interface UseBugsResult {
  bugs: Bug[];
  state: LoadState;
  error: string | null;
  refetch: () => Promise<void>;
  createBug: (input: CreateBugInput) => Promise<void>;
  updateBug: (bugId: string, patch: Partial<Bug>) => Promise<void>;
  deleteBug: (bugId: string) => Promise<void>;
}

/** Self-contained bug store (separate from task data) with optimistic updates. */
export function useBugs(
  onToast: (m: string, k: "error" | "success") => void
): UseBugsResult {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<Bug[]>([]);
  ref.current = bugs;

  const refetch = useCallback(async () => {
    try {
      setState((s) => (s === "ready" ? s : "loading"));
      const b = await api.listBugs();
      setBugs(b);
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

  const createBug = useCallback<UseBugsResult["createBug"]>(
    async (input) => {
      try {
        const created = await api.createBug({
          title: input.title,
          description: input.description ?? "",
          status: input.status ?? "todo",
        });
        setBugs((cur) => [...cur, created]);
        onToast("Đã thêm bug", "success");
      } catch (e) {
        onToast(errMsg(e), "error");
      }
    },
    [onToast]
  );

  const updateBug = useCallback(
    async (bugId: string, patch: Partial<Bug>) => {
      const snapshot = ref.current;
      setBugs(snapshot.map((b) => (b.bug_id === bugId ? { ...b, ...patch } : b)));
      try {
        const updated = await api.updateBug(bugId, patch);
        setBugs((cur) => cur.map((b) => (b.bug_id === bugId ? updated : b)));
      } catch (e) {
        setBugs(snapshot);
        onToast(`Lưu thất bại — đã hoàn tác. ${errMsg(e)}`, "error");
      }
    },
    [onToast]
  );

  const deleteBug = useCallback(
    async (bugId: string) => {
      const snapshot = ref.current;
      setBugs(snapshot.filter((b) => b.bug_id !== bugId));
      try {
        await api.deleteBug(bugId);
        onToast("Đã xoá bug", "success");
      } catch (e) {
        setBugs(snapshot);
        onToast(errMsg(e), "error");
      }
    },
    [onToast]
  );

  return { bugs, state, error, refetch, createBug, updateBug, deleteBug };
}
