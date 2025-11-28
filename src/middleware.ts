import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define paths
  const isToolsPath = path.startsWith("/tools");
  const isLoginPath = path === "/tools/login";
  
  // Check for session cookie (HttpOnly cookie set by your API)
  const sessionToken = request.cookies.get("vinpix_admin_session")?.value;
  const isAuthenticated = !!sessionToken;

  // 1. Unauthenticated user trying to access protected tools -> Redirect to Login
  if (isToolsPath && !isLoginPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/tools/login", request.url));
  }

  // 2. Authenticated user trying to access Login -> Redirect to Dashboard
  if (isLoginPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/tools", request.url));
  }

  return NextResponse.next();
}

// Only run on /tools routes to save performance
export const config = {
  matcher: ["/tools/:path*"],
};

