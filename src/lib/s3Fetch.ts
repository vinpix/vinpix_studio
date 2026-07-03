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
