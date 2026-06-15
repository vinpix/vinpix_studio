import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = !!cookieStore.get("vinpix_team_session")?.value;
  return NextResponse.json({ authenticated });
}
