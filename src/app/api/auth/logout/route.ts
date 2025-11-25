import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("vinpix_admin_session");

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("[Logout API] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", message: errorMessage },
      { status: 500 }
    );
  }
}

