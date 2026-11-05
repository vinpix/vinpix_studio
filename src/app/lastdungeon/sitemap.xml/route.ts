import { LASTDUNGEON_ORIGIN } from "@/lib/lastdungeon";
import {
  allArticles,
  categories,
} from "@/features/lastdungeon/wikiStore";

export const dynamic = "force-static";

export function GET() {
  const paths = [
    "/",
    "/wiki",
    ...categories.map((c) => `/wiki/${c.id}`),
    ...allArticles.map((a) => `/wiki/${a.category}/${a.slug}`),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${LASTDUNGEON_ORIGIN}${p}</loc></url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
