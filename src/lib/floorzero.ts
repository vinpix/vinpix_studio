/**
 * Floor Zero microsite (floorzero.vinpixstudio.com).
 *
 * The site lives in this app under `src/app/floorzero/*`. Middleware rewrites
 * every page request on the `floorzero.` host to that prefix, so on the
 * subdomain the landing page is `/` and the wiki is `/wiki/...`. Requests for
 * `/floorzero/*` on the studio hosts are 301'd to the subdomain.
 *
 * Inside the microsite, always link with subdomain-root paths (`/wiki/weapons`),
 * never with the `/floorzero` prefix. Local dev: http://floorzero.localhost:3002
 */
export const FLOORZERO_HOST = "floorzero.vinpixstudio.com";
export const FLOORZERO_ORIGIN = `https://${FLOORZERO_HOST}`;
/** Internal app-router prefix the subdomain is rewritten to. */
export const FLOORZERO_PREFIX = "/floorzero";
/** Public static assets for the microsite (served from `public/fz`). */
export const FLOORZERO_ASSETS = "/fz";

/** True for floorzero.vinpixstudio.com, floorzero.localhost, etc. */
export function isFloorZeroHost(host: string | null | undefined): boolean {
  if (!host) return false;
  return host.toLowerCase().split(":")[0].startsWith("floorzero.");
}

/** Studio production hosts that should bounce /floorzero/* to the subdomain. */
export function isStudioProdHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const h = host.toLowerCase().split(":")[0];
  return h === "vinpixstudio.com" || h === "www.vinpixstudio.com";
}
