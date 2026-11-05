import { buildSearchIndex } from "@/features/lastdungeon/searchBuild";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}
