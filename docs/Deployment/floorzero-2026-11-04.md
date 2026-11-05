# Floor Zero microsite — 2026-11-04

- New custom domain `floorzero.vinpixstudio.com` on the `vinpix-studio` Worker
  (route in `wrangler.jsonc`). Middleware rewrites that host to `src/app/floorzero/*`;
  `/floorzero/*` on the studio hosts 301s to the subdomain. Helpers: `src/lib/floorzero.ts`.
- Landing: `src/app/floorzero/page.tsx` + `src/components/floorzero/landing/`.
- Wiki: `src/app/floorzero/wiki/**`, data in `src/features/floorzero/data/*.ts`
  (417 articles, extracted from the BackroomsEscape Unity project), assets in `public/fz/`.
  Validate data: `npx tsx scripts/floorzero-validate.ts`. Tests: `tests/floorzero-routing.test.ts`.
- Local dev of the subdomain: http://floorzero.localhost:3002
- Deployed from pc2 (Windows) with the whole working tree, user-approved.
  Build needed Node 22 (pc2 has Node 18) and
  `opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion`; deploy with
  `wrangler deploy --autoconfig=false --keep-vars`.
- New version: `68ed5bc4-4292-4215-9bb1-78153f5da66d`. Previous (rollback):
  `ba0c62b3-61d9-4efc-8d36-275c9f9421a7`.
- Production checks: floorzero `/`, `/wiki`, articles, `/sitemap.xml`, `/robots.txt`,
  `/fz/og.png` → 200; unknown slug → 404; studio apex/www, `/kitchentogether`,
  `/app-ads.txt` → 200; `www/floorzero` → 301 to the subdomain.
