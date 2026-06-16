import { NextRequest, NextResponse } from "next/server";

const LAMBDA_URL =
  process.env.LAMBDA_FUNCTION_URL ||
  "https://gr5ama7oef2mwzwikipq4xbqye0etaca.lambda-url.ap-southeast-1.on.aws/";

// only allow keys under the team notes prefix (prevents arbitrary S3 access)
const ALLOWED_PREFIX = "vinpixstudio/team/notes/";

/**
 * Same-origin PDF proxy: resolves a presigned S3 URL via the lambda, fetches the
 * bytes server-side and streams them back inline so the browser renders the PDF
 * reliably (no cross-origin iframe quirks, no public bucket).
 */
export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get("key");
    if (!key || !key.startsWith(ALLOWED_PREFIX)) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    // 1. get presigned URL from lambda
    const presignRes = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ function: "getPresignedUrl", params: { key } }),
    });
    const data = await presignRes.json();
    const url = data?.body?.url ?? data?.url;
    if (!url) {
      return NextResponse.json({ error: "Không lấy được tệp" }, { status: 502 });
    }

    // 2. fetch the PDF bytes server-side (no CORS in server context)
    const fileRes = await fetch(url);
    if (!fileRes.ok) {
      return NextResponse.json({ error: "Tải tệp thất bại" }, { status: 502 });
    }
    const buffer = await fileRes.arrayBuffer();
    const filename = key.split("/").pop() ?? "document.pdf";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
