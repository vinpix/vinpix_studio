/**
 * Image Batch types for the /team "3D Gen" tab.
 * Mirrors the lambda batches.py / batch_3d.py shapes.
 */

export type Batch3DStatus = "none" | "queued" | "running" | "success" | "failed";

/** Client-side decimated copy of a generated model (setBatch3DLowpoly). */
export interface BatchLowpolyModel {
  modelKey: string; // S3 key of the low-poly GLB
  vertices: number;
  triangles: number;
  bytes: number;
  /** requested quality level (target vertex count: 3000/5000/10000…) */
  target?: number;
  createdAt?: string;
}

export interface BatchImageModel3D {
  status: Batch3DStatus;
  taskId?: string; // external worker's task id (optional)
  modelKey?: string; // S3 key of the generated GLB
  error?: string;
  progress?: number; // 0-100
  queuedAt?: string;
  updatedAt?: string;
  /** while a retry is queued: handle on the previous result so it can be
   *  restored by cancelBatch3DJob */
  prevModelKey?: string;
  prevTaskId?: string;
  /** optimized low-poly variant, generated in-browser for review */
  lowpoly?: BatchLowpolyModel;
  /** after replaceBatch3DLowpoly: original high-quality key kept for revert */
  hqModelKey?: string;
  /** true when modelKey now points at the low-poly variant */
  replaced?: boolean;
}

export interface BatchImage {
  id: string;
  key: string; // batch-owned S3 copy (durable)
  sourceKey?: string; // original smart-chat key (provenance / dedupe)
  name?: string;
  prompt?: string;
  sourceNodeId?: string;
  addedAt?: string;
  model3d?: BatchImageModel3D;
}

export type BatchStatus = "collecting" | "generating" | "done";

export interface ImageBatch {
  batch_id: string;
  name: string;
  description?: string;
  images: BatchImage[];
  cover?: string; // S3 key of the cover image
  status: BatchStatus;
  createdBy?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/** Tripo wallet snapshot pushed by the VPS worker (updateTripoStatus). */
export interface TripoStatus {
  credits: number;
  expiringCredit?: number;
  expiringDate?: string;
  plan?: string;
  planValidUntil?: string;
  updatedAt: string;
}

/** Payload for adding a Smart Chat image to a batch (carries the SOURCE key; the
 *  backend copies it into the batch-owned prefix). */
export interface AddBatchImageInput {
  key: string;
  name?: string;
  prompt?: string;
  sourceNodeId?: string;
}
