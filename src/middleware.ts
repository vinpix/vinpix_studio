import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  FLOORZERO_ORIGIN,
  FLOORZERO_PREFIX,
  isFloorZeroHost,
  isStudioProdHost,
} from "@/lib/floorzero";
import {
  LASTDUNGEON_ORIGIN,
  LASTDUNGEON_PREFIX,
  isLastDungeonHost,
} from "@/lib/lastdungeon";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const host = request.headers.get("host");

  // --- floorzero.vinpixstudio.com — Floor Zero landing + wiki microsite ---
  // Every page path on the subdomain maps onto the internal /floorzero tree.
  if (isFloorZeroHost(host)) {
    if (path === FLOORZERO_PREFIX || path.startsWith(FLOORZERO_PREFIX + "/")) {
      // Strip a stray internal prefix so URLs stay canonical.
      const url = request.nextUrl.clone();
      url.pathname = path.slice(FLOORZERO_PREFIX.length) || "/";
      return NextResponse.redirect(url, 308);
    }
    const url = request.nextUrl.clone();
    url.pathname = FLOORZERO_PREFIX + (path === "/" ? "" : path);
    return NextResponse.rewrite(url);
  }

  // --- lastdungeon.vinpixstudio.com — The Last Dungeon landing + wiki ---
  if (isLastDungeonHost(host)) {
    if (path === LASTDUNGEON_PREFIX || path.startsWith(LASTDUNGEON_PREFIX + "/")) {
      const url = request.nextUrl.clone();
      url.pathname = path.slice(LASTDUNGEON_PREFIX.length) || "/";
      return NextResponse.redirect(url, 308);
    }
    const url = request.nextUrl.clone();
    url.pathname = LASTDUNGEON_PREFIX + (path === "/" ? "" : path);
    return NextResponse.rewrite(url);
  }

  // --- /floorzero, /lastdungeon on the studio hosts — send to the subdomain ---
  if (isStudioProdHost(host)) {
    for (const [prefix, origin] of [
      [FLOORZERO_PREFIX, FLOORZERO_ORIGIN],
      [LASTDUNGEON_PREFIX, LASTDUNGEON_ORIGIN],
    ] as const) {
      if (path === prefix || path.startsWith(prefix + "/")) {
        const rest = path.slice(prefix.length) || "/";
        return NextResponse.redirect(
          new URL(rest + request.nextUrl.search, origin),
          301
        );
      }
    }
  }

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

  // --- /game_design — internal design studio, same team passcode cookie ---
  if (path.startsWith("/game_design")) {
    if (!request.cookies.get("vinpix_team_session")?.value) {
      const login = new URL("/team/login", request.url);
      login.searchParams.set("next", path + request.nextUrl.search);
      return NextResponse.redirect(login);
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
      const next = request.nextUrl.searchParams.get("next");
      const target = next && next.startsWith("/") && !next.startsWith("//") ? next : "/team";
      return NextResponse.redirect(new URL(target, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Page routes only: skip Next internals, API routes and static files (any
// path with a file extension). Needed broadly so the floorzero host rewrite
// sees every page request; non-matching branches fall through cheaply.
export const config = {
  // sitemap.xml / robots.txt are listed explicitly so the floorzero host can
  // serve its own (src/app/floorzero/sitemap.xml, robots.txt route handlers).
  matcher: [
    "/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)",
    "/sitemap.xml",
    "/robots.txt",
  ],
};
