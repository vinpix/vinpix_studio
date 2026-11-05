/**
 * Backend glue for the Game Design Studio.
 *
 * - `gdCall` talks to /api/game-design (team-cookie gated proxy → lambda `gd*`).
 * - `syncQueue` batches record upserts/deletes and pushes them with `gdSave`,
 *   debounced, coalesced per record, retried on failure. UI reads `useSyncStatus()`.
 */

import { useSyncExternalStore } from "react";

export type RecordKind = "world" | "dish" | "level" | "map";
type ListKey = "worlds" | "dishes" | "levels" | "maps";
const LIST_KEY: Record<RecordKind, ListKey> = { world: "worlds", dish: "dishes", level: "levels", map: "maps" };

export type SyncStatus = "idle" | "saving" | "saved" | "error";
export type SyncState = { status: SyncStatus; error: string | null; pending: number; savedAt: string | null };

export async function gdCall<T = unknown>(fn: "gdLoad" | "gdSave" | "gdReset", params: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch("/api/game-design", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ function: fn, params }),
  });
  let data: { error?: string } | null = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON */
  }
  if (!res.ok) {
    if (res.status === 401) throw new Error("Phiên nhóm hết hạn, đăng nhập lại.");
    throw new Error(data?.error ?? `Backend lỗi (${res.status})`);
  }
  return data as T;
}

type Pending = { kind: RecordKind; id: string; item: Record<string, unknown> | null };

const FLUSH_DELAY = 700;
const RETRY_DELAY = 4000;

class SyncQueue {
  private pending = new Map<string, Pending>();
  private timer: number | null = null;
  private inflight = false;
  private state: SyncState = { status: "idle", error: null, pending: 0, savedAt: null };
  private listeners = new Set<() => void>();

  getState = () => this.state;
  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => {
      this.listeners.delete(l);
    };
  };

  private set(patch: Partial<SyncState>) {
    this.state = { ...this.state, ...patch, pending: this.pending.size };
    this.listeners.forEach((l) => l());
  }

  put(kind: RecordKind, item: { id: string } & Record<string, unknown>) {
    this.pending.set(`${kind}#${item.id}`, { kind, id: item.id, item });
    this.schedule();
  }
  remove(kind: RecordKind, id: string) {
    this.pending.set(`${kind}#${id}`, { kind, id, item: null });
    this.schedule();
  }
  /** Drop everything queued (used before a reset). */
  clear() {
    this.pending.clear();
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = null;
    this.set({ status: "idle", error: null });
  }

  private schedule(delay = FLUSH_DELAY) {
    if (typeof window === "undefined") return;
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => void this.flush(), delay);
    if (this.state.status !== "error") this.set({ status: this.pending.size ? "saving" : this.state.status });
    else this.set({});
  }

  private buildPayload(batch: Pending[]) {
    const payload: Record<string, unknown[]> = {};
    const deletes: Array<{ kind: RecordKind; id: string }> = [];
    for (const p of batch) {
      if (p.item) (payload[LIST_KEY[p.kind]] ??= []).push(p.item);
      else deletes.push({ kind: p.kind, id: p.id });
    }
    if (deletes.length) payload.deletes = deletes;
    return payload;
  }

  /** Push everything pending now. Safe to call repeatedly. */
  async flush(): Promise<void> {
    if (this.inflight) {
      this.schedule(200);
      return;
    }
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = null;
    if (!this.pending.size) {
      if (this.state.status === "saving") this.set({ status: "saved" });
      return;
    }
    const batch = Array.from(this.pending.values());
    this.pending.clear();
    this.inflight = true;
    this.set({ status: "saving" });
    try {
      const r = await gdCall<{ savedAt?: string }>("gdSave", this.buildPayload(batch));
      this.inflight = false;
      this.set({ status: this.pending.size ? "saving" : "saved", error: null, savedAt: r?.savedAt ?? new Date().toISOString() });
      if (this.pending.size) this.schedule(200);
    } catch (e) {
      this.inflight = false;
      // put the batch back (newer edits already queued win)
      for (const p of batch) {
        const key = `${p.kind}#${p.id}`;
        if (!this.pending.has(key)) this.pending.set(key, p);
      }
      this.set({ status: "error", error: e instanceof Error ? e.message : "Lưu thất bại" });
      this.schedule(RETRY_DELAY);
    }
  }

  /** Best-effort push on tab close (keepalive fetch, no await possible). */
  flushOnUnload() {
    if (!this.pending.size) return;
    const payload = this.buildPayload(Array.from(this.pending.values()));
    this.pending.clear();
    try {
      void fetch("/api/game-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        keepalive: true,
        body: JSON.stringify({ function: "gdSave", params: payload }),
      });
    } catch {
      /* ignore */
    }
  }
}

export const syncQueue = new SyncQueue();

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => syncQueue.flushOnUnload());
  window.addEventListener("beforeunload", () => syncQueue.flushOnUnload());
}

const SERVER_STATE: SyncState = { status: "idle", error: null, pending: 0, savedAt: null };

export function useSyncStatus(): SyncState {
  return useSyncExternalStore(syncQueue.subscribe, syncQueue.getState, () => SERVER_STATE);
}
