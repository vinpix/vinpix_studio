# Vinpix Studio

Next.js App Router site for Vinpix Studio (marketing, tools dashboard, team board).

## Getting Started

```bash
npm install
# or: bun install

npm run dev
# http://localhost:3002
```

## Production deploy (Cloudflare)

This app deploys to **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare) — not Vercel.

```bash
# Build + deploy (keeps existing Worker vars/secrets)
npm run deploy
# or
npm run cf:deploy

# Build only
npm run cf:build

# Local CF preview
npm run cf:preview
```

Worker name: `vinpix-studio` (`wrangler.jsonc`).

**Production hosts (custom domains):**
- https://www.vinpixstudio.com
- https://vinpixstudio.com
- Fallback: https://vinpix-studio.kiet57441.workers.dev

### Environment variables

Wire all runtime env on the Worker. Non-secrets live under `vars` in `wrangler.jsonc`. Secrets:

```bash
# From .env.local values (never commit secrets)
npx wrangler secret put LAMBDA_FUNCTION_URL
npx wrangler secret put GOOGLE_PLAY_SERVICE_ACCOUNT_JSON
# optional if used
npx wrangler secret put GEMINI_API_KEY
```

| Name | Where | Notes |
|------|--------|--------|
| `LAMBDA_FUNCTION_URL` | secret | Vinpix Lambda Function URL |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | secret | Full service-account JSON string |
| `GPLAY_PACKAGE_NAMES` | var | Comma-separated package ids |
| `NEXT_PUBLIC_MAP_LAMBDA_URL` | var | Kitchen Together maps lambda URL |
| `GEMINI_API_KEY` | secret | Optional; only if stream-chat/Gemini routes are enabled |

Always deploy with `--keep-vars` (included in `npm run deploy`) so dashboard secrets/vars are not wiped.

### Custom domain

Both `vinpixstudio.com` and `www.vinpixstudio.com` are configured as custom domains
on the production Worker and were verified after the 2026-10-07 deployment.
See [deployment records](docs/Deployment/doc.md).

## Tests

```bash
npm test
```

## Vercel

Vercel is **not** the production ship path. Historical `vercel.json` may remain for old previews but new production ships use Cloudflare scripts above.
