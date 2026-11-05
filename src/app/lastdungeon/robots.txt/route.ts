import { LASTDUNGEON_ORIGIN } from "@/lib/lastdungeon";

export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${LASTDUNGEON_ORIGIN}/sitemap.xml\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
