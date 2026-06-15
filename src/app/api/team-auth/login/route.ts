import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const LAMBDA_URL =
  process.env.LAMBDA_FUNCTION_URL ||
  "https://gr5ama7oef2mwzwikipq4xbqye0etaca.lambda-url.ap-southeast-1.on.aws/";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = body?.password?.trim();

    if (!password) {
      return NextResponse.json(
        { error: "Mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ function: "loginTeam", params: { password } }),
    });

    const data = await response.json();

    // Lambda Function URL may return 200 with an inner statusCode on error
    if (data.statusCode && data.statusCode !== 200) {
      const message =
        typeof data.body === "string"
          ? data.body
          : data.body?.error || "Đăng nhập thất bại";
      return NextResponse.json({ error: message }, { status: data.statusCode });
    }

    const sessionToken = data?.body?.sessionToken ?? data?.sessionToken;
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Không nhận được phiên đăng nhập" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("vinpix_team_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Lỗi máy chủ", message },
      { status: 500 }
    );
  }
}
