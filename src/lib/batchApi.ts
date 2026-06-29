/**
 * Typed client for the /team "3D Gen" batch lambda functions.
 * callLambdaFunction already unwraps the `body`, so each wrapper just casts.
 */
import { callLambdaFunction } from "./auth";
import type { ImageBatch, AddBatchImageInput } from "@/types/batch";

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

export async function getBatch3DStatus(batchId: string): Promise<ImageBatch> {
  const r = (await callLambdaFunction("getBatch3DStatus", { batchId })) as {
    batch: ImageBatch;
  };
  return r.batch;
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
