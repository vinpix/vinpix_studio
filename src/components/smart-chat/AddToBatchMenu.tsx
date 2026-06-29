"use client";

import { useEffect, useRef, useState } from "react";
import { FolderPlus, Plus, Loader2, Check, Box } from "lucide-react";
import type { ImageBatch, AddBatchImageInput } from "@/types/batch";
import { listBatches, createBatch, addImagesToBatch } from "@/lib/batchApi";

interface AddToBatchMenuProps {
  count: number;
  disabled?: boolean;
  /** Resolves the currently-selected images (only those with an S3 key). */
  getImages: () => AddBatchImageInput[];
  /** Fired after a successful add so the parent can exit selection mode. */
  onAdded?: (batchName: string, added: number) => void;
}

/**
 * "Add to Batch" control shown in the Smart Chat selection toolbar (team only).
 * Self-contained: fetches batches on open, supports add-to-existing or create-new.
 */
export function AddToBatchMenu({ count, disabled, getImages, onAdded }: AddToBatchMenuProps) {
  const [open, setOpen] = useState(false);
  const [batches, setBatches] = useState<ImageBatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [done, setDone] = useState<{ name: string; added: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const openMenu = async () => {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    if (next) {
      setCreating(false);
      setNewName("");
      setDone(null);
      setLoading(true);
      try {
        setBatches(await listBatches());
      } catch (e) {
        console.error("[AddToBatchMenu] listBatches failed", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const finish = (name: string, added: number) => {
    setDone({ name, added });
    setTimeout(() => {
      setOpen(false);
      setDone(null);
      onAdded?.(name, added);
    }, 1000);
  };

  const addToExisting = async (batch: ImageBatch) => {
    const imgs = getImages();
    if (imgs.length === 0) return;
    setBusyId(batch.batch_id);
    try {
      const { added } = await addImagesToBatch(batch.batch_id, imgs);
      finish(batch.name, added);
    } catch (e) {
      console.error("[AddToBatchMenu] add failed", e);
      alert("Thêm vào batch thất bại.");
    } finally {
      setBusyId(null);
    }
  };

  const createAndAdd = async () => {
    const name = newName.trim();
    if (!name) return;
    const imgs = getImages();
    setBusyId("__new__");
    try {
      const b = await createBatch({ name, images: imgs });
      finish(b.name, b.images.length);
    } catch (e) {
      console.error("[AddToBatchMenu] create failed", e);
      alert("Tạo batch thất bại.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={openMenu}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
        title="Thêm ảnh đã chọn vào batch 3D Gen"
      >
        <FolderPlus size={16} />
        <span className="hidden sm:inline">Thêm vào Batch</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="text-xs font-semibold text-gray-700">
              {done ? "Hoàn tất" : `Thêm ${count} ảnh vào…`}
            </p>
          </div>

          {done ? (
            <div className="flex items-center gap-2 px-3 py-4 text-sm text-emerald-700">
              <Check size={16} />
              Đã thêm {done.added} ảnh vào “{done.name}”.
            </div>
          ) : (
            <>
              <div className="max-h-56 overflow-y-auto py-1">
                {loading ? (
                  <div className="flex items-center justify-center py-5 text-gray-400">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                ) : batches.length === 0 ? (
                  <p className="px-3 py-4 text-center text-xs text-gray-400">
                    Chưa có batch nào — tạo mới bên dưới
                  </p>
                ) : (
                  batches.map((b) => (
                    <button
                      key={b.batch_id}
                      onClick={() => addToExisting(b)}
                      disabled={busyId !== null}
                      className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-indigo-50 disabled:opacity-50"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Box size={14} className="shrink-0 text-indigo-500" />
                        <span className="truncate font-medium text-gray-800">
                          {b.name}
                        </span>
                      </span>
                      {busyId === b.batch_id ? (
                        <Loader2 size={14} className="animate-spin text-indigo-500" />
                      ) : (
                        <span className="shrink-0 text-xs text-gray-400">
                          {b.images.length}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>

              <div className="border-t border-gray-100 p-2">
                {creating ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      autoFocus
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && createAndAdd()}
                      placeholder="Tên batch mới"
                      className="min-w-0 flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm outline-none focus:border-indigo-400"
                    />
                    <button
                      onClick={createAndAdd}
                      disabled={!newName.trim() || busyId !== null}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                      aria-label="Tạo và thêm"
                    >
                      {busyId === "__new__" ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Check size={14} />
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCreating(true)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    <Plus size={15} /> Tạo batch mới…
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
