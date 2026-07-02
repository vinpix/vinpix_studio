/**
 * Typed client for the /team "3D Gen" batch lambda functions.
 * callLambdaFunction already unwraps the `body`, so each wrapper just casts.
 */
import { callLambdaFunction } from "./auth";
import type { ImageBatch, AddBatchImageInput, TripoStatus } from "@/types/batch";

export async function listBatches(): Promise<ImageBatch[]> {
  const r = (await callLambdaFunction("listBatches", {})) as {
    batches: ImageBatch[];
  };
  return r.batches ?? [];
}

export async function createBatch(input: {
  name: string;
  description?: string;
  images?: AddBatchImageInput[];
}): Promise<ImageBatch> {
  const r = (await callLambdaFunction("createBatch", input)) as {
    batch: ImageBatch;
  };
  return r.batch;
}

export async function updateBatch(
  batchId: string,
  updates: Partial<Pick<ImageBatch, "name" | "description" | "cover" | "order">>
): Promise<ImageBatch> {
  const r = (await callLambdaFunction("updateBatch", { batchId, updates })) as {
    batch: ImageBatch;
  };
  return r.batch;
}

export async function deleteBatch(batchId: string): Promise<void> {
  await callLambdaFunction("deleteBatch", { batchId });
}

export async function addImagesToBatch(
  batchId: string,
  images: AddBatchImageInput[]
): Promise<{ batch: ImageBatch; added: number }> {
  return (await callLambdaFunction("addImagesToBatch", {
    batchId,
    images,
  })) as { batch: ImageBatch; added: number };
}

export async function removeImageFromBatch(
  batchId: string,
  imageId: string
): Promise<ImageBatch> {
  const r = (await callLambdaFunction("removeImageFromBatch", {
    batchId,
    imageId,
  })) as { batch: ImageBatch };
  return r.batch;
}

// ----- Phase 2: image -> 3D (decoupled queue) -----
// The web client only enqueues + polls; an external worker agent does the actual
// generation and writes results back via listBatch3DQueue / updateBatch3DJob.
export async function generateBatch3D(
  batchId: string,
  imageIds?: string[]
): Promise<{ batch: ImageBatch; queued: number }> {
  return (await callLambdaFunction("generateBatch3D", {
    batchId,
    imageIds,
  })) as { batch: ImageBatch; queued: number };
}

/** Delete the old model(s) and re-queue for a fresh generation. Without
 *  imageIds every finished (success/failed) image in the batch is redone. */
export async function retryBatch3D(
  batchId: string,
  imageIds?: string[]
): Promise<{ batch: ImageBatch; retried: number }> {
  return (await callLambdaFunction("retryBatch3D", {
    batchId,
    imageIds,
  })) as { batch: ImageBatch; retried: number };
}

/** Cancel a QUEUED job before the worker picks it up. A cancelled retry gets
 *  its previous model back; a cancelled first run goes back to "none". */
export async function cancelBatch3DJob(
  batchId: string,
  imageId: string
): Promise<ImageBatch> {
  const r = (await callLambdaFunction("cancelBatch3DJob", {
    batchId,
    imageId,
  })) as { batch: ImageBatch };
  return r.batch;
}

/** Store a browser-optimized low-poly GLB (base64) for one image; the lambda
 *  writes it to S3 and records model3d.lowpoly for review. */
export async function setBatch3DLowpoly(input: {
  batchId: string;
  imageId: string;
  glbBase64: string;
  vertices: number;
  triangles: number;
}): Promise<ImageBatch> {
  const r = (await callLambdaFunction("setBatch3DLowpoly", input)) as {
    batch: ImageBatch;
  };
  return r.batch;
}

/** Point modelKey at the reviewed low-poly variants (whole batch, or just
 *  imageIds). Reversible pointer swap — originals stay on hqModelKey. */
export async function replaceBatch3DLowpoly(
  batchId: string,
  imageIds?: string[]
): Promise<{ batch: ImageBatch; replaced: number }> {
  return (await callLambdaFunction("replaceBatch3DLowpoly", {
    batchId,
    imageIds,
  })) as { batch: ImageBatch; replaced: number };
}

/** Undo the swap: modelKey back to the original HQ GLB (lowpoly kept). */
export async function restoreBatch3DLowpoly(
  batchId: string,
  imageIds?: string[]
): Promise<{ batch: ImageBatch; restored: number }> {
  return (await callLambdaFunction("restoreBatch3DLowpoly", {
    batchId,
    imageIds,
  })) as { batch: ImageBatch; restored: number };
}

export async function getBatch3DStatus(batchId: string): Promise<ImageBatch> {
  const r = (await callLambdaFunction("getBatch3DStatus", { batchId })) as {
    batch: ImageBatch;
  };
  return r.batch;
}

/** Last Tripo wallet snapshot pushed by the VPS worker (null = never synced). */
export async function getTripoStatus(): Promise<TripoStatus | null> {
  const r = (await callLambdaFunction("getTripoStatus", {})) as {
    status: TripoStatus | null;
  };
  return r.status ?? null;
}

// ----- worker-agent contract (not used by the web UI; here to document it) -----
export interface Batch3DJob {
  batchId: string;
  batchName: string;
  imageId: string;
  key: string; // batch-owned S3 key to generate from
  sourceKey: string;
  name: string;
  prompt: string;
  status: "queued" | "running";
  queuedAt: string;
}

export async function listBatch3DQueue(
  status?: "queued" | "running"
): Promise<Batch3DJob[]> {
  const r = (await callLambdaFunction("listBatch3DQueue", { status })) as {
    jobs: Batch3DJob[];
  };
  return r.jobs ?? [];
}

export async function updateBatch3DJob(input: {
  batchId: string;
  imageId: string;
  status: "queued" | "running" | "success" | "failed";
  modelKey?: string;
  modelUrl?: string;
  error?: string;
  progress?: number;
  taskId?: string;
}): Promise<ImageBatch> {
  const r = (await callLambdaFunction("updateBatch3DJob", input)) as {
    batch: ImageBatch;
  };
  return r.batch;
}
