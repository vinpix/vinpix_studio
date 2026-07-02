/**
 * Public entry for the low-poly optimizer. Prefers a Web Worker (UI stays
 * responsive during the WASM simplify); falls back to running inline if the
 * worker can't be constructed (old bundler/browser).
 */
import type { LowpolyResult } from "./optimize";

export type { LowpolyResult } from "./optimize";

type WorkerReply =
  | ({ ok: true } & LowpolyResult)
  | { ok: false; error: string };

export async function optimizeGlbBuffer(
  buf: ArrayBuffer
): Promise<LowpolyResult> {
  let worker: Worker;
  try {
    worker = new Worker(new URL("./lowpoly.worker.ts", import.meta.url), {
      type: "module",
    });
  } catch {
    const { optimizeGlb } = await import("./optimize");
    return optimizeGlb(buf);
  }

  return new Promise<LowpolyResult>((resolve, reject) => {
    worker.onmessage = (e: MessageEvent<WorkerReply>) => {
      worker.terminate();
      if (e.data.ok) resolve(e.data);
      else reject(new Error(e.data.error));
    };
    worker.onerror = (e) => {
      worker.terminate();
      reject(new Error(e.message || "Lỗi worker optimize"));
    };
    worker.postMessage({ buf }, [buf]);
  });
}

/** Chunked Uint8Array→base64 (btoa chokes on multi-MB spreads). */
export function glbToBase64(u8: Uint8Array): string {
  const CHUNK = 0x8000;
  let binary = "";
  for (let i = 0; i < u8.length; i += CHUNK) {
    binary += String.fromCharCode(...u8.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}
