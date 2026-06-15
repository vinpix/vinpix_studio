import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // --- /tools (admin) — guarded by vinpix_admin_session ---
  if (path.startsWith("/tools")) {
    const isLoginPath = path === "/tools/login";
    const isAuthenticated = !!request.cookies.get("vinpix_admin_session")?.value;
    if (!isLoginPath && !isAuthenticated) {
      return NextResponse.redirect(new URL("/tools/login", request.url));
    }
    if (isLoginPath && isAuthenticated) {
      return NextResponse.redirect(new URL("/tools", request.url));
    }
    return NextResponse.next();
  }

  // --- /team — guarded by a SEPARATE cookie (shared team passcode) ---
  if (path.startsWith("/team")) {
    const isLoginPath = path === "/team/login";
    const isAuthenticated = !!request.cookies.get("vinpix_team_session")?.value;
    if (!isLoginPath && !isAuthenticated) {
      return NextResponse.redirect(new URL("/team/login", request.url));
    }
    if (isLoginPath && isAuthenticated) {
      return NextResponse.redirect(new URL("/team", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Only run on protected routes to save performance
export const config = {
  matcher: ["/tools/:path*", "/team/:path*"],
};
