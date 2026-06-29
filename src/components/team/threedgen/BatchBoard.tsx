"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "../shared/Toast";
import { useBatches } from "@/hooks/useBatches";
import { EmptyState } from "../shared/EmptyState";
import { BatchCard } from "./BatchCard";
import { CreateBatchModal } from "./CreateBatchModal";
import { BatchDetailPanel } from "./BatchDetailPanel";

export function BatchBoard() {
  const { notify } = useToast();
  const api = useBatches(notify);
  const [createOpen, setCreateOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const openBatch = api.batches.find((b) => b.batch_id === openId) ?? null;
  const totalImages = api.batches.reduce((n, b) => n + b.images.length, 0);

  if (api.state === "loading") {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-black/45">
          {api.batches.length} batch · {totalImages} ảnh
        </p>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-1.5 border-2 border-black bg-black px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
        >
          <Plus size={15} /> Tạo Batch
        </button>
      </div>

      {api.batches.length === 0 ? (
        <EmptyState
          message="Chưa có batch nào — tạo batch rồi thêm ảnh từ tab Chat AI"
          actionLabel="Tạo batch"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {api.batches.map((b) => (
            <BatchCard key={b.batch_id} batch={b} onOpen={() => setOpenId(b.batch_id)} />
          ))}
        </div>
      )}

      <CreateBatchModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={async (name, description) => {
          const b = await api.createBatch(name, description);
          if (b) setOpenId(b.batch_id);
        }}
      />

      {openBatch && (
        <BatchDetailPanel
          batch={openBatch}
          onClose={() => setOpenId(null)}
          onRename={(id, name) => api.updateBatch(id, { name })}
          onDelete={api.deleteBatch}
          onRemoveImage={api.removeImage}
          onGenerate3D={api.generate3D}
          onRefreshStatus={api.refreshStatus}
        />
      )}
    </div>
  );
}
