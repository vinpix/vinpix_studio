/**
 * The Last Dungeon microsite (lastdungeon.vinpixstudio.com).
 *
 * Same pattern as Floor Zero (see `src/lib/floorzero.ts`): the site lives under
 * `src/app/lastdungeon/*`, middleware rewrites every page request on the
 * `lastdungeon.` host to that prefix, and `/lastdungeon/*` on the studio hosts
 * 301s to the subdomain.
 *
 * Inside the microsite, always link with subdomain-root paths (`/wiki/heroes`),
 * never with the `/lastdungeon` prefix. Local dev: http://lastdungeon.localhost:3002
 */
export const LASTDUNGEON_HOST = "lastdungeon.vinpixstudio.com";
export const LASTDUNGEON_ORIGIN = `https://${LASTDUNGEON_HOST}`;
/** Internal app-router prefix the subdomain is rewritten to. */
export const LASTDUNGEON_PREFIX = "/lastdungeon";
/** Public static assets for the microsite (served from `public/ld`). */
export const LASTDUNGEON_ASSETS = "/ld";

export const LASTDUNGEON_STORE = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.Vinpix.TheLastDungeon",
  appStore: "https://apps.apple.com/us/app/the-last-dungeon/id1579078459",
  youtubeId: "NSE5iLqZHTQ",
} as const;

/** True for lastdungeon.vinpixstudio.com, lastdungeon.localhost, etc. */
export function isLastDungeonHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return host.toLowerCase().split(":")[0].startsWith("lastdungeon.");
}
