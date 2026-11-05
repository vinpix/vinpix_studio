import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy for the Game Design Studio (/game_design) lambda functions.
 * Only `gd*` functions pass through, and only with the team passcode cookie.
 * Lambda replies are unwrapped to the inner `body` so the client gets plain data.
 */
const LAMBDA_URL =
  process.env.LAMBDA_FUNCTION_URL ||
  "https://53pgcarqrmjvjpqzjtkvimg53e0hrppx.lambda-url.ap-southeast-1.on.aws/";

const ALLOWED = new Set(["gdLoad", "gdSave", "gdReset"]);
// Kitchen Together admin tool (/game_design/admin): kta* functions in vinpix_lambda/src/kt_admin.py
const ALLOWED_PREFIX = /^kta[A-Z]\w*$/;

export async function POST(request: NextRequest) {
  const teamToken = request.cookies.get("vinpix_team_session")?.value;
  if (!teamToken) {
    return NextResponse.json({ error: "Chưa đăng nhập nhóm" }, { status: 401 });
  }

  let body: { function?: string; params?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }
  const fn = body?.function;
  if (!fn || !(ALLOWED.has(fn) || ALLOWED_PREFIX.test(fn))) {
    return NextResponse.json({ error: "Hàm không được phép" }, { status: 400 });
  }

  try {
    const res = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // kta* edit real player data: the Lambda verifies the signed team token itself.
      body: JSON.stringify({
        function: fn,
        params: ALLOWED_PREFIX.test(fn) ? { ...(body.params as object), teamToken } : body.params ?? {},
      }),
    });
    const text = await res.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Lambda trả về dữ liệu không phải JSON", text: text.slice(0, 500) }, { status: 502 });
    }

    // Function URLs usually unwrap {statusCode, body}; handle both shapes.
    const inner = data && typeof data === "object" && "statusCode" in data && "body" in data ? data.body : data;
    const status = data && typeof data === "object" && typeof data.statusCode === "number" ? data.statusCode : res.status;
    if (!res.ok || status >= 400 || (inner && typeof inner === "object" && "error" in inner && !("ok" in inner))) {
      const message = (inner && typeof inner === "object" && inner.error) || data?.error || `Lambda lỗi (${status})`;
      return NextResponse.json({ error: String(message) }, { status: status >= 400 ? status : 502 });
    }
    return NextResponse.json(inner);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Không gọi được backend: ${message}` }, { status: 502 });
  }
}
