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
  retryBatch3D as apiRetry3D,
  cancelBatch3DJob as apiCancel3D,
  getBatch3DStatus as apiStatus,
  setBatch3DLowpoly as apiSetLowpoly,
  replaceBatch3DLowpoly as apiReplaceLowpoly,
  restoreBatch3DLowpoly as apiRestoreLowpoly,
} from "@/lib/batchApi";
import { getPresignedUrl } from "@/lib/smartChatApi";

/** /api/lambda goes through a Vercel function — keep the base64 payload well
 *  under its 4.5MB request-body cap. */
const MAX_LOWPOLY_UPLOAD_BYTES = 3 * 1024 * 1024;

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

  const retry3D = useCallback(
    async (batchId: string, imageIds?: string[]) => {
      try {
        const { batch, retried } = await apiRetry3D(batchId, imageIds);
        replace(batch);
        notify(`Đã đưa ${retried} ảnh vào hàng chờ tạo lại (~4 phút/model).`, "success");
      } catch (e) {
        console.error("[useBatches] retry3D failed", e);
        notify(e instanceof Error ? e.message : "Tạo lại thất bại.", "error");
      }
    },
    [notify, replace]
  );

  const cancel3D = useCallback(
    async (batchId: string, imageId: string) => {
      try {
        const b = await apiCancel3D(batchId, imageId);
        replace(b);
        notify("Đã huỷ job tạo 3D.", "success");
      } catch (e) {
        console.error("[useBatches] cancel3D failed", e);
        notify(e instanceof Error ? e.message : "Huỷ thất bại.", "error");
      }
    },
    [notify, replace]
  );

  const lowpoly3D = useCallback(
    async (batchId: string, imageId: string): Promise<boolean> => {
      try {
        const batch = batches.find((b) => b.batch_id === batchId);
        const img = batch?.images.find((i) => i.id === imageId);
        const m = img?.model3d;
        const srcKey = m?.replaced && m.hqModelKey ? m.hqModelKey : m?.modelKey;
        if (!srcKey) throw new Error("Ảnh này chưa có model 3D.");

        const presigned = await getPresignedUrl(srcKey);
        const res = await fetch(
          `/api/proxy-image?url=${encodeURIComponent(presigned)}`
        );
        if (!res.ok) throw new Error(`Tải GLB gốc thất bại (${res.status}).`);
        const buf = await res.arrayBuffer();

        // heavy WASM work — lazily loaded, runs in a Web Worker
        const { optimizeGlbBuffer, glbToBase64 } = await import("@/lib/lowpoly");
        const { glb, vertices, triangles } = await optimizeGlbBuffer(buf);
        if (glb.byteLength > MAX_LOWPOLY_UPLOAD_BYTES) {
          throw new Error("Bản low-poly vẫn quá lớn để upload (>3MB).");
        }

        const updated = await apiSetLowpoly({
          batchId,
          imageId,
          glbBase64: glbToBase64(glb),
          vertices,
          triangles,
        });
        replace(updated);
        return true;
      } catch (e) {
        console.error("[useBatches] lowpoly3D failed", e);
        notify(
          e instanceof Error ? e.message : "Tạo bản low-poly thất bại.",
          "error"
        );
        return false;
      }
    },
    [batches, notify, replace]
  );

  const replaceLowpoly3D = useCallback(
    async (batchId: string, imageIds?: string[]) => {
      try {
        const { batch, replaced } = await apiReplaceLowpoly(batchId, imageIds);
        replace(batch);
        notify(`Đã chuyển ${replaced} model sang bản nén.`, "success");
      } catch (e) {
        console.error("[useBatches] replaceLowpoly3D failed", e);
        notify(e instanceof Error ? e.message : "Chuyển sang bản nén thất bại.", "error");
      }
    },
    [notify, replace]
  );

  const restoreLowpoly3D = useCallback(
    async (batchId: string, imageIds?: string[]) => {
      try {
        const { batch, restored } = await apiRestoreLowpoly(batchId, imageIds);
        replace(batch);
        notify(`Đã khôi phục ${restored} model về bản gốc.`, "success");
      } catch (e) {
        console.error("[useBatches] restoreLowpoly3D failed", e);
        notify(e instanceof Error ? e.message : "Khôi phục bản gốc thất bại.", "error");
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
    retry3D,
    cancel3D,
    lowpoly3D,
    replaceLowpoly3D,
    restoreLowpoly3D,
    refreshStatus,
  };
}
