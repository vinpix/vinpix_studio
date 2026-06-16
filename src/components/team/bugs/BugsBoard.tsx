"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Bug } from "@/types/team";
import { useToast } from "../shared/Toast";
import { useBugs } from "@/hooks/useBugs";
import { BUG_STATUS_ORDER, BUG_STATUS_META } from "@/lib/teamConstants";
import { EmptyState } from "../shared/EmptyState";
import { BugCard } from "./BugCard";
import { BugEditor } from "./BugEditor";

export function BugsBoard() {
  const { notify } = useToast();
  const bugs = useBugs(notify);
  const [editing, setEditing] = useState<Bug | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setEditorOpen(true);
  };
  const openEdit = (bug: Bug) => {
    setEditing(bug);
    setEditorOpen(true);
  };

  if (bugs.state === "loading") {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
      </div>
    );
  }

  const open = bugs.bugs.filter((b) => b.status !== "done").length;

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-black/45">
          {bugs.bugs.length} bug · {open} chưa xong
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 border-2 border-black bg-black px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
        >
          <Plus size={15} /> Bug
        </button>
      </div>

      {bugs.bugs.length === 0 ? (
        <EmptyState message="Chưa có bug nào — bấm + Bug để thêm" actionLabel="Thêm bug" onAction={openCreate} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BUG_STATUS_ORDER.map((status) => {
            const meta = BUG_STATUS_META[status];
            const colBugs = bugs.bugs.filter((b) => b.status === status);
            return (
              <section key={status} className="flex flex-col" style={{ background: meta.tint }}>
                <header
                  className="flex items-center justify-between border-2 border-black px-3 py-2"
                  style={{ background: meta.accent }}
                >
                  <span className="text-xs font-black uppercase tracking-wide text-white">
                    {meta.label}
                  </span>
                  <span className="font-mono text-xs font-bold tabular-nums text-white">
                    {colBugs.length}
                  </span>
                </header>
                <div className="flex flex-col gap-3 border-2 border-t-0 border-black p-3">
                  {colBugs.length === 0 ? (
                    <p className="py-6 text-center font-mono text-[10px] uppercase tracking-widest text-black/30">
                      Trống
                    </p>
                  ) : (
                    colBugs.map((b) => (
                      <BugCard
                        key={b.bug_id}
                        bug={b}
                        onEdit={openEdit}
                        onStatus={(id, s) => bugs.updateBug(id, { status: s })}
                        onDelete={bugs.deleteBug}
                      />
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <BugEditor
        open={editorOpen}
        bug={editing}
        onClose={() => setEditorOpen(false)}
        onCreate={bugs.createBug}
        onUpdate={bugs.updateBug}
        onDelete={bugs.deleteBug}
      />
    </div>
  );
}
