"use client";

import { useCallback, useEffect, useState } from "react";
import type { ImageBatch } from "@/types/batch";
import {
  listBatches,
  createBatch as apiCreate,
  updateBatch as apiUpdate,
  deleteBatch as apiDelete,
  removeImageFromBatch as apiRemoveImage,
  generateBatch3D as apiGenerate3D,
  getBatch3DStatus as apiStatus,
} from "@/lib/batchApi";

type LoadState = "loading" | "ready" | "error";
type Notify = (message: string, kind: "error" | "success") => void;

/**
 * Data layer for the /team "3D Gen" tab. Mirrors the useBugs/useTeamData pattern:
 * optimistic-ish local list kept in sync with the lambda, with toast feedback.
 */
export function useBatches(notify: Notify) {
  const [batches, setBatches] = useState<ImageBatch[]>([]);
  const [state, setState] = useState<LoadState>("loading");

  const refetch = useCallback(async () => {
    try {
      const data = await listBatches();
      setBatches(data);
      setState("ready");
    } catch (e) {
      console.error("[useBatches] load failed", e);
      setState("error");
      notify("Không tải được danh sách batch.", "error");
    }
  }, [notify]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const replace = useCallback((b: ImageBatch) => {
    setBatches((prev) => prev.map((x) => (x.batch_id === b.batch_id ? b : x)));
  }, []);

  const createBatch = useCallback(
    async (name: string, description?: string): Promise<ImageBatch | null> => {
      try {
        const b = await apiCreate({ name, description });
        setBatches((prev) => [b, ...prev]);
        notify(`Đã tạo batch "${b.name}".`, "success");
        return b;
      } catch (e) {
        console.error("[useBatches] create failed", e);
        notify("Tạo batch thất bại.", "error");
        return null;
      }
    },
    [notify]
  );

  const updateBatch = useCallback(
    async (batchId: string, updates: Partial<Pick<ImageBatch, "name" | "description" | "cover" | "order">>) => {
      try {
        const b = await apiUpdate(batchId, updates);
        replace(b);
      } catch (e) {
        console.error("[useBatches] update failed", e);
        notify("Cập nhật batch thất bại.", "error");
      }
    },
    [notify, replace]
  );

  const deleteBatch = useCallback(
    async (batchId: string) => {
      const prev = batches;
      setBatches((cur) => cur.filter((x) => x.batch_id !== batchId));
      try {
        await apiDelete(batchId);
        notify("Đã xoá batch.", "success");
      } catch (e) {
        console.error("[useBatches] delete failed", e);
        setBatches(prev); // rollback
        notify("Xoá batch thất bại.", "error");
      }
    },
    [batches, notify]
  );

  const removeImage = useCallback(
    async (batchId: string, imageId: string) => {
      try {
        const b = await apiRemoveImage(batchId, imageId);
        replace(b);
      } catch (e) {
        console.error("[useBatches] removeImage failed", e);
        notify("Xoá ảnh thất bại.", "error");
      }
    },
    [notify, replace]
  );

  const generate3D = useCallback(
    async (batchId: string, imageIds?: string[]) => {
      try {
        const { batch, queued } = await apiGenerate3D(batchId, imageIds);
        replace(batch);
        notify(
          queued > 0
            ? `Đã đưa ${queued} ảnh vào hàng chờ tạo 3D.`
            : "Không có ảnh mới để đưa vào hàng chờ.",
          queued > 0 ? "success" : "error"
        );
      } catch (e) {
        console.error("[useBatches] generate3D failed", e);
        notify(e instanceof Error ? e.message : "Đưa vào hàng chờ thất bại.", "error");
      }
    },
    [notify, replace]
  );

  const refreshStatus = useCallback(
    async (batchId: string) => {
      try {
        const b = await apiStatus(batchId);
        replace(b);
        return b;
      } catch (e) {
        console.error("[useBatches] refreshStatus failed", e);
        return null;
      }
    },
    [replace]
  );

  return {
    batches,
    state,
    refetch,
    createBatch,
    updateBatch,
    deleteBatch,
    removeImage,
    generate3D,
    refreshStatus,
  };
}
