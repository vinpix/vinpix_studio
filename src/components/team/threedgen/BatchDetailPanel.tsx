"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Trash2,
  Pencil,
  Check,
  Box,
  Loader2,
  Download,
  Sparkles,
  AlertCircle,
  Clock,
  RefreshCw,
  Shrink,
  Replace,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { ImageBatch, BatchImage } from "@/types/batch";
import { SecureImage } from "@/components/smart-chat/SecureImage";
import { getPresignedUrl } from "@/lib/smartChatApi";

// three.js is heavy — only pull it in when a model is actually viewed, so the
// 3D Gen board itself stays light.
const Model3DViewer = dynamic(
  () => import("./Model3DViewer").then((m) => m.Model3DViewer),
  { ssr: false }
);

interface BatchDetailPanelProps {
  batch: ImageBatch;
  onClose: () => void;
  onRename: (batchId: string, name: string) => void;
  onDelete: (batchId: string) => void;
  onRemoveImage: (batchId: string, imageId: string) => void;
  onGenerate3D: (batchId: string, imageIds?: string[]) => void;
  onRetry3D: (batchId: string, imageIds?: string[]) => void;
  onCancel3D: (batchId: string, imageId: string) => void;
  onLowpoly3D: (
    batchId: string,
    imageId: string,
    targetVertices?: number
  ) => Promise<boolean>;
  onReplaceLowpoly: (batchId: string, imageIds?: string[]) => Promise<void>;
  onRestoreLowpoly: (batchId: string, imageIds?: string[]) => Promise<void>;
  onRefreshStatus: (batchId: string) => void;
}

const fmtVerts = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
const fmtBytes = (b: number) =>
  b >= 1024 * 1024
    ? `${(b / 1048576).toFixed(1)}MB`
    : `${Math.round(b / 1024)}KB`;

/** compress quality levels (target vertex count) */
const LP_LEVELS = [
  { v: 3000, label: "3K" },
  { v: 5000, label: "5K" },
  { v: 10000, label: "10K" },
] as const;
const LP_DEFAULT_LEVEL = 3000;

const POLL_MS = 8000;

function isRunning(img: BatchImage): boolean {
  const s = img.model3d?.status;
  return s === "running" || s === "queued";
}

export function BatchDetailPanel({
  batch,
  onClose,
  onRename,
  onDelete,
  onRemoveImage,
  onGenerate3D,
  onRetry3D,
  onCancel3D,
  onLowpoly3D,
  onReplaceLowpoly,
  onRestoreLowpoly,
  onRefreshStatus,
}: BatchDetailPanelProps) {
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(batch.name);
  const [viewing, setViewing] = useState<BatchImage | null>(null);
  const [viewerVariant, setViewerVariant] = useState<"orig" | "lp">("orig");
  const [retryTarget, setRetryTarget] = useState<BatchImage | null>(null);
  const [lpBusyIds, setLpBusyIds] = useState<Set<string>>(new Set());
  const [lpAll, setLpAll] = useState<{ done: number; total: number } | null>(
    null
  );
  const [replaceConfirm, setReplaceConfirm] = useState(false);
  const [applyBusy, setApplyBusy] = useState(false);
  const [busyLevel, setBusyLevel] = useState<number | null>(null);
  const refreshRef = useRef(onRefreshStatus);
  refreshRef.current = onRefreshStatus;

  // Poll Tripo status while any image is still generating.
  const hasRunning = batch.images.some(isRunning);
  useEffect(() => {
    if (!hasRunning) return;
    const t = setInterval(() => refreshRef.current(batch.batch_id), POLL_MS);
    return () => clearInterval(t);
  }, [hasRunning, batch.batch_id]);

  const commitRename = () => {
    const n = nameDraft.trim();
    if (n && n !== batch.name) onRename(batch.batch_id, n);
    setEditingName(false);
  };

  const successCount = batch.images.filter(
    (i) => i.model3d?.status === "success"
  ).length;
  const pendingCount = batch.images.filter(
    (i) => i.model3d?.status === "queued" || i.model3d?.status === "running"
  ).length;
  // low-poly flow counters
  const lpPending = batch.images.filter(
    (i) => i.model3d?.status === "success" && !i.model3d.lowpoly
  ).length;
  const lpReplaceable = batch.images.filter(
    (i) =>
      i.model3d?.status === "success" &&
      i.model3d.lowpoly &&
      !i.model3d.replaced
  ).length;

  // `viewing`/`retryTarget` snapshots go stale when the batch prop refreshes
  // (e.g. right after a lowpoly upload) — always render from the live image
  const liveViewing = viewing
    ? batch.images.find((i) => i.id === viewing.id) ?? viewing
    : null;

  const openViewer = (img: BatchImage, variant: "orig" | "lp") => {
    setViewerVariant(variant);
    setViewing(img);
  };

  const setLpBusy = (id: string, busy: boolean) => {
    setLpBusyIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  // level given = compress (or re-compress) at that quality; no level = view
  // the existing compressed variant, compressing at the default level if none
  const handleLowpoly = async (img: BatchImage, level?: number) => {
    const lp = img.model3d?.lowpoly;
    if (lp && (!level || lp.target === level)) {
      openViewer(img, "lp");
      return;
    }
    if (lpBusyIds.has(img.id)) return;
    const target = level ?? LP_DEFAULT_LEVEL;
    setBusyLevel(target);
    setLpBusy(img.id, true);
    const ok = await onLowpoly3D(batch.batch_id, img.id, target);
    setLpBusy(img.id, false);
    setBusyLevel(null);
    if (ok) openViewer(img, "lp");
  };

  const handleLowpolyAll = async () => {
    const targets = batch.images.filter(
      (i) => i.model3d?.status === "success" && !i.model3d.lowpoly
    );
    if (!targets.length || lpAll) return;
    setLpAll({ done: 0, total: targets.length });
    for (let k = 0; k < targets.length; k++) {
      setLpBusy(targets[k].id, true);
      await onLowpoly3D(batch.batch_id, targets[k].id);
      setLpBusy(targets[k].id, false);
      setLpAll({ done: k + 1, total: targets.length });
    }
    setLpAll(null);
  };

  // viewer "Dùng bản này": make the variant being viewed the active one
  const applyViewedVariant = async (img: BatchImage) => {
    if (applyBusy) return;
    setApplyBusy(true);
    try {
      if (viewerVariant === "lp") {
        await onReplaceLowpoly(batch.batch_id, [img.id]);
      } else {
        await onRestoreLowpoly(batch.batch_id, [img.id]);
      }
    } finally {
      setApplyBusy(false);
    }
  };

  const downloadModel = async (img: BatchImage, keyOverride?: string) => {
    const key = keyOverride || img.model3d?.modelKey;
    if (!key) return;
    try {
      const url = await getPresignedUrl(key, { download: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(img.name || img.id).replace(/[^\w.-]+/g, "_")}.glb`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error("[BatchDetailPanel] download model failed", e);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex justify-end bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
          className="flex h-full w-full max-w-3xl flex-col border-l-2 border-black bg-[#F0F0F0]"
        >
          {/* header */}
          <header className="flex items-center gap-3 border-b-2 border-black bg-white px-5 py-3">
            {editingName ? (
              <div className="flex flex-1 items-center gap-2">
                <input
                  autoFocus
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitRename();
                    if (e.key === "Escape") setEditingName(false);
                  }}
                  className="flex-1 border-2 border-black px-2 py-1 text-lg font-black uppercase tracking-tight outline-none"
                />
                <button
                  onClick={commitRename}
                  className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black text-white"
                  aria-label="Lưu tên"
                >
                  <Check size={15} />
                </button>
              </div>
            ) : (
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <h2 className="truncate text-lg font-black uppercase tracking-tight">
                  {batch.name}
                </h2>
                <button
                  onClick={() => {
                    setNameDraft(batch.name);
                    setEditingName(true);
                  }}
                  className="shrink-0 text-black/40 hover:text-black"
                  aria-label="Đổi tên"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}

            <span className="shrink-0 font-mono text-[11px] font-bold tabular-nums text-black/45">
              {batch.images.length} ảnh
              {pendingCount > 0 && (
                <span className="text-amber-600"> · {pendingCount} chờ xử lý</span>
              )}
              {" · "}
              {successCount} model
            </span>
            <button
              onClick={() => {
                if (confirm(`Xoá batch "${batch.name}"? Hành động này không thể hoàn tác.`)) {
                  onDelete(batch.batch_id);
                  onClose();
                }
              }}
              className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Xoá batch"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center border-2 border-black bg-white transition-colors hover:bg-black/5"
              aria-label="Đóng"
            >
              <X size={15} />
            </button>
          </header>

          {/* action bar */}
          <div className="flex items-center justify-between gap-3 border-b-2 border-black bg-white px-5 py-2.5">
            <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-widest text-black/45">
              {batch.description || "Bộ ảnh để tạo 3D"}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              {(lpPending > 0 || lpAll) && (
                <button
                  onClick={handleLowpolyAll}
                  disabled={!!lpAll}
                  title="Tạo bản nén (~3k vertex) cho mọi model đã xong — chạy trên trình duyệt, không tốn credits. Muốn mức khác (5K/10K) thì nén từng model trong viewer."
                  className="flex items-center gap-1.5 border-2 border-black bg-violet-300 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-transform active:translate-y-0.5 disabled:opacity-70"
                >
                  {lpAll ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Nén{" "}
                      {lpAll.done}/{lpAll.total}
                    </>
                  ) : (
                    <>
                      <Shrink size={14} /> Nén tất cả
                    </>
                  )}
                </button>
              )}
              {lpReplaceable > 0 && !lpAll && (
                <button
                  onClick={() => setReplaceConfirm(true)}
                  title="Chuyển các model đã nén sang dùng bản nén (xem lại/đổi lại được trong viewer)"
                  className="flex items-center gap-1.5 border-2 border-black bg-violet-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
                >
                  <Replace size={14} /> Dùng bản nén ({lpReplaceable})
                </button>
              )}
              <button
                onClick={() => onGenerate3D(batch.batch_id)}
                disabled={batch.images.length === 0}
                className="flex items-center gap-1.5 border-2 border-black bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5 disabled:opacity-40"
              >
                <Sparkles size={14} /> Tạo 3D toàn bộ
              </button>
            </div>
          </div>

          {/* image grid */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {batch.images.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-black/25 p-12 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-black/40">
                  Batch trống — vào tab Chat AI, chọn ảnh và thêm vào batch này
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {batch.images.map((img) => (
                  <BatchImageCell
                    key={img.id}
                    img={img}
                    onRemove={() => onRemoveImage(batch.batch_id, img.id)}
                    onGenerate={() => onGenerate3D(batch.batch_id, [img.id])}
                    onRetry={() => {
                      // a failed run has nothing to lose — requeue immediately;
                      // replacing a finished model asks for confirmation
                      if (img.model3d?.status === "success") setRetryTarget(img);
                      else onRetry3D(batch.batch_id, [img.id]);
                    }}
                    onCancel={() => onCancel3D(batch.batch_id, img.id)}
                    onView={() =>
                      openViewer(img, img.model3d?.replaced ? "lp" : "orig")
                    }
                    onDownload={() => downloadModel(img)}
                    onLowpoly={() => handleLowpoly(img)}
                    lpBusy={lpBusyIds.has(img.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.aside>

        {/* retry confirm modal */}
        <AnimatePresence>
          {retryTarget && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 p-4"
              onClick={() => setRetryTarget(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2 border-b-2 border-black bg-amber-300 px-4 py-2.5">
                  <RefreshCw size={15} />
                  <span className="text-sm font-black uppercase tracking-tight">
                    Tạo lại model này?
                  </span>
                </div>
                <div className="space-y-1.5 px-4 py-3">
                  <p className="text-xs font-medium">
                    Model 3D hiện tại sẽ được thay bằng model mới. Quá trình mất
                    khoảng <strong>3–4 phút</strong> và tốn credits.
                  </p>
                  <p className="text-[11px] text-black/55">
                    Bạn vẫn có thể huỷ khi job còn ở trạng thái &quot;Chờ xử
                    lý&quot; — model cũ sẽ được giữ nguyên.
                  </p>
                </div>
                <div className="flex border-t-2 border-black">
                  <button
                    onClick={() => setRetryTarget(null)}
                    className="flex-1 border-r-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-black/5"
                  >
                    Không
                  </button>
                  <button
                    onClick={() => {
                      onRetry3D(batch.batch_id, [retryTarget.id]);
                      setRetryTarget(null);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 bg-black px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
                  >
                    <RefreshCw size={12} /> Tạo lại
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* replace-with-lowpoly confirm modal */}
        <AnimatePresence>
          {replaceConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 p-4"
              onClick={() => setReplaceConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2 border-b-2 border-black bg-violet-300 px-4 py-2.5">
                  <Replace size={15} />
                  <span className="text-sm font-black uppercase tracking-tight">
                    Dùng bản nén cho cả batch?
                  </span>
                </div>
                <div className="space-y-1.5 px-4 py-3">
                  <p className="text-xs font-medium">
                    <strong>{lpReplaceable} model</strong> sẽ chuyển sang bản nén
                    (nhẹ hơn ~90–95%) — nút Xem 3D và Tải GLB sẽ dùng bản nén.
                  </p>
                  <p className="text-[11px] text-black/55">
                    Bản gốc không mất: mở viewer, chọn &quot;Gốc&quot; rồi bấm
                    &quot;Dùng bản này&quot; để đổi lại từng model bất cứ lúc
                    nào.
                  </p>
                </div>
                <div className="flex border-t-2 border-black">
                  <button
                    onClick={() => setReplaceConfirm(false)}
                    className="flex-1 border-r-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-black/5"
                  >
                    Không
                  </button>
                  <button
                    onClick={() => {
                      onReplaceLowpoly(batch.batch_id);
                      setReplaceConfirm(false);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 bg-violet-600 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform active:translate-y-0.5"
                  >
                    <Replace size={12} /> Dùng bản nén
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D viewer overlay */}
        <AnimatePresence>
          {liveViewing?.model3d?.modelKey && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
              onClick={() => setViewing(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="flex h-[80vh] w-full max-w-4xl flex-col border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {(() => {
                  const m = liveViewing.model3d;
                  const lp = m?.lowpoly;
                  const origKey =
                    m?.replaced && m.hqModelKey ? m.hqModelKey : m?.modelKey;
                  const shownKey =
                    viewerVariant === "lp" && lp ? lp.modelKey : origKey;
                  // which variant modelKey currently points at
                  const activeVariant = m?.replaced ? "lp" : "orig";
                  const viewingActive = viewerVariant === activeVariant;
                  const compressing = lpBusyIds.has(liveViewing.id);
                  return (
                    <>
                      <div className="flex items-center justify-between gap-3 border-b-2 border-black bg-black px-4 py-2.5">
                        <span className="flex min-w-0 items-center gap-2 truncate text-sm font-black uppercase tracking-wide text-white">
                          <Box size={15} /> {liveViewing.name || "Model 3D"}
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          <div
                            className="flex items-center border border-violet-300/70"
                            title="Nén model ngay trên trình duyệt (không tốn credits) — mức càng cao càng mượt; 10K giữ texture 2048"
                          >
                            <span className="flex items-center gap-1 bg-violet-500 px-1.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                              <Shrink size={10} /> Nén
                            </span>
                            {LP_LEVELS.map((l) => {
                              const isCurrent = lp?.target === l.v;
                              const isBusy =
                                compressing && busyLevel === l.v;
                              return (
                                <button
                                  key={l.v}
                                  onClick={() =>
                                    handleLowpoly(liveViewing, l.v)
                                  }
                                  disabled={compressing}
                                  title={
                                    isCurrent
                                      ? `Đang ở mức ${l.label} — bấm để xem`
                                      : `Nén còn ~${l.label} vertex${l.v >= 8000 ? " (texture 2048)" : ""}`
                                  }
                                  className={`px-2 py-1 font-mono text-[10px] font-bold transition-colors disabled:opacity-60 ${
                                    isCurrent
                                      ? "bg-violet-300 text-black"
                                      : "text-white/80 hover:bg-white/10"
                                  }`}
                                >
                                  {isBusy ? (
                                    <Loader2
                                      size={11}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    l.label
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {lp && (
                            <>
                              <div className="flex border border-white/60 font-mono text-[10px] font-bold uppercase tracking-wide">
                                <button
                                  onClick={() => setViewerVariant("orig")}
                                  className={
                                    viewerVariant === "orig"
                                      ? "bg-white px-2 py-1 text-black"
                                      : "px-2 py-1 text-white/70 hover:text-white"
                                  }
                                >
                                  {activeVariant === "orig" ? "✓ " : ""}Gốc
                                </button>
                                <button
                                  onClick={() => setViewerVariant("lp")}
                                  title={`${lp.vertices} vertex · ${lp.triangles} tam giác`}
                                  className={
                                    viewerVariant === "lp"
                                      ? "bg-violet-300 px-2 py-1 text-black"
                                      : "px-2 py-1 text-white/70 hover:text-white"
                                  }
                                >
                                  {activeVariant === "lp" ? "✓ " : ""}Nén ·{" "}
                                  {fmtVerts(lp.vertices)}v · {fmtBytes(lp.bytes)}
                                </button>
                              </div>
                              <button
                                onClick={() => applyViewedVariant(liveViewing)}
                                disabled={viewingActive || applyBusy}
                                title={
                                  viewingActive
                                    ? "Model đang dùng bản này"
                                    : "Đặt bản đang xem làm bản chính (Xem 3D / Tải GLB sẽ dùng bản này)"
                                }
                                className={`flex items-center gap-1.5 border-2 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                                  viewingActive
                                    ? "border-white/30 text-white/50"
                                    : "border-violet-400 bg-violet-500 text-white hover:bg-violet-400"
                                }`}
                              >
                                {applyBusy ? (
                                  <Loader2 size={12} className="animate-spin" />
                                ) : viewingActive ? (
                                  "Đang dùng ✓"
                                ) : (
                                  <>
                                    <Check size={12} /> Dùng bản này
                                  </>
                                )}
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => downloadModel(liveViewing, shownKey)}
                            className="flex items-center gap-1.5 border border-white/60 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white hover:bg-white/10"
                          >
                            <Download size={12} /> GLB
                          </button>
                          <button
                            onClick={() => setViewing(null)}
                            className="text-white/70 hover:text-white"
                            aria-label="Đóng"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                      <Model3DViewer
                        modelKey={shownKey || ""}
                        className="min-h-0 flex-1 bg-[#F0F0F0]"
                      />
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

interface CellProps {
  img: BatchImage;
  onRemove: () => void;
  onGenerate: () => void;
  onRetry: () => void;
  onCancel: () => void;
  onView: () => void;
  onDownload: () => void;
  onLowpoly: () => void;
  lpBusy: boolean;
}

function BatchImageCell({ img, onRemove, onGenerate, onRetry, onCancel, onView, onDownload, onLowpoly, lpBusy }: CellProps) {
  const status = img.model3d?.status;
  const lp = img.model3d?.lowpoly;

  return (
    <div className="group relative flex flex-col border-2 border-black bg-white">
      <div className="relative aspect-square w-full overflow-hidden border-b-2 border-black bg-[#F0F0F0]">
        <SecureImage
          storageKey={img.key}
          alt={img.name || "Ảnh batch"}
          className="h-full w-full object-cover"
        />
        {img.model3d?.replaced && (
          <span
            title="Model đang dùng bản nén"
            className="absolute left-1.5 top-1.5 border border-black bg-violet-300 px-1 py-px font-mono text-[9px] font-bold uppercase"
          >
            Nén
          </span>
        )}
        <button
          onClick={onRemove}
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center border border-black bg-white/90 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
          aria-label="Xoá ảnh khỏi batch"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {/* per-image 3D status / action */}
      <div className="px-2 py-1.5">
        {status === "success" ? (
          <div className="flex gap-1">
            <button
              onClick={onView}
              className="flex flex-1 items-center justify-center gap-1 border-2 border-black bg-emerald-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-transform active:translate-y-0.5"
            >
              <Box size={11} /> Xem 3D
            </button>
            <button
              onClick={onDownload}
              className="flex items-center justify-center border-2 border-black bg-white px-2 py-1 hover:bg-black/5"
              aria-label="Tải GLB"
            >
              <Download size={11} />
            </button>
            <button
              onClick={onLowpoly}
              disabled={lpBusy}
              title={
                lp
                  ? `Xem bản nén (${lp.vertices} vertex · ${Math.round((lp.bytes || 0) / 1024)}KB)`
                  : "Nén model (~3k vertex) để review — mức khác (5K/10K) chọn trong viewer"
              }
              className={`flex items-center justify-center border-2 border-black px-2 py-1 transition-colors ${
                lp
                  ? "bg-violet-300 hover:bg-violet-400"
                  : "bg-white hover:bg-violet-100"
              }`}
              aria-label={lp ? "Xem bản nén" : "Nén model"}
            >
              {lpBusy ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <Shrink size={11} />
              )}
            </button>
            <button
              onClick={onRetry}
              title="Tạo lại model (thay model hiện tại, ~3–4 phút)"
              className="flex items-center justify-center border-2 border-black bg-amber-200 px-2 py-1 transition-colors hover:bg-amber-300"
              aria-label="Tạo lại model"
            >
              <RefreshCw size={11} />
            </button>
          </div>
        ) : status === "queued" ? (
          <div className="flex gap-1">
            <div
              className="flex flex-1 items-center justify-center gap-1.5 border-2 border-black bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-black/55"
              title="Đang chờ worker nhận — mỗi model mất khoảng 3–4 phút"
            >
              <Clock size={11} /> Chờ xử lý · ~4&apos;
            </div>
            <button
              onClick={onCancel}
              title="Huỷ job này (model cũ giữ nguyên)"
              className="flex items-center justify-center border-2 border-black bg-white px-2 py-1 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Huỷ tạo 3D"
            >
              <X size={11} />
            </button>
          </div>
        ) : status === "running" ? (
          <div className="flex items-center justify-center gap-1.5 border-2 border-black bg-amber-200 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
            <Loader2 size={11} className="animate-spin" />
            {typeof img.model3d?.progress === "number" && img.model3d.progress > 0
              ? `${img.model3d.progress}%`
              : "Đang tạo…"}
          </div>
        ) : status === "failed" ? (
          <button
            onClick={onRetry}
            title={img.model3d?.error || "Lỗi"}
            className="flex w-full items-center justify-center gap-1 border-2 border-black bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-700 transition-transform active:translate-y-0.5"
          >
            <AlertCircle size={11} /> Thử lại
          </button>
        ) : (
          <button
            onClick={onGenerate}
            className="flex w-full items-center justify-center gap-1 border-2 border-black bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors hover:bg-black hover:text-white"
          >
            <Sparkles size={11} /> Tạo 3D
          </button>
        )}
      </div>
    </div>
  );
}
