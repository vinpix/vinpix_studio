/**
 * Web Worker wrapper for optimizeGlb — the meshopt simplify pass blocks for a
 * few seconds on 1M-vertex Tripo models, so it runs off the main thread.
 * One worker per job; the caller terminates it (keeps WASM heap from growing).
 */
import { optimizeGlb, DEFAULT_TARGET_VERTICES } from "./optimize";

self.onmessage = async (
  e: MessageEvent<{ buf: ArrayBuffer; targetVertices?: number }>
) => {
  try {
    const result = await optimizeGlb(e.data.buf, {
      targetVertices: e.data.targetVertices ?? DEFAULT_TARGET_VERTICES,
    });
    (self as unknown as Worker).postMessage({ ok: true as const, ...result }, [
      result.glb.buffer,
    ]);
  } catch (err) {
    (self as unknown as Worker).postMessage({
      ok: false as const,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
