import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("vinpix_admin_session")?.value;

    console.log("[Verify API] Checking session:", {
      hasToken: !!sessionToken,
      tokenLength: sessionToken?.length,
      allCookies: cookieStore.getAll().map((c) => c.name),
    });

    if (!sessionToken) {
      // Return 200 with authenticated: false instead of 401
      // This allows client to handle gracefully
      return NextResponse.json({
        authenticated: false,
        error: "No session found",
      });
    }

    // For now, just check if session exists
    // In production, verify token with lambda
    return NextResponse.json({
      authenticated: true,
      message: "Session is valid",
    });
  } catch (error) {
    console.error("[Verify API] Error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
