/**
 * Fetch a presigned S3 URL directly from the browser — the `springboard2025`
 * bucket CORS allows vinpixstudio.com, so large files (GLB models) come
 * straight from S3 ap-southeast-1 instead of round-tripping through the
 * /api/proxy-image Vercel function, which buffers the whole body in a US
 * region before replying. Falls back to the proxy if the direct request
 * fails (CORS regression, blocked network).
 */
export async function fetchPresigned(presignedUrl: string): Promise<Response> {
  try {
    const res = await fetch(presignedUrl);
    if (res.ok) return res;
  } catch {
    // CORS/network failure — fall through to the same-origin proxy
  }
  return fetch(`/api/proxy-image?url=${encodeURIComponent(presignedUrl)}`);
}

export interface DownloadProgress {
  loaded: number;
  /** null when the server didn't report a Content-Length */
  total: number | null;
}

/**
 * Download a presigned URL to an ArrayBuffer, streaming the body so the
 * caller can render download progress. Content-Length is CORS-safelisted,
 * so it's readable on the direct S3 response without extra ExposeHeaders.
 */
export async function downloadPresigned(
  presignedUrl: string,
  onProgress?: (progress: DownloadProgress) => void
): Promise<ArrayBuffer> {
  const res = await fetchPresigned(presignedUrl);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  if (!res.body || !onProgress) return res.arrayBuffer();

  const totalHeader = res.headers.get("content-length");
  const total = totalHeader ? parseInt(totalHeader, 10) : null;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress({ loaded, total });
  }

  const buf = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    buf.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return buf.buffer;
}
