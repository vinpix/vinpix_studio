# Production deployment

- Production uses the `vinpix-studio` Cloudflare Worker with OpenNext.
- [`2026-10-07.md`](2026-10-07.md): full rebuild and redeployment of the current
  main working tree, 19 passing tests and successful production HTTP checks.
- [`liftoff-appads-2026-10-07.md`](liftoff-appads-2026-10-07.md): subsequent
  approved publication of 38 missing Liftoff reseller rows, with one changed
  asset uploaded and public endpoint verification.
- [`floorzero-2026-11-04.md`](floorzero-2026-11-04.md): floorzero.vinpixstudio.com landing + wiki.
- [`lastdungeon-2026-11-04.md`](lastdungeon-2026-11-04.md): lastdungeon.vinpixstudio.com landing + wiki.
- Current version: `f9530704-1145-45f4-bcb0-eca57b367a33` (previous: `f9bb521e-2fd5-4f00-ad8b-805e2565e0cf`).
- Production domains: `vinpixstudio.com`, `www.vinpixstudio.com`, `floorzero.vinpixstudio.com`, `lastdungeon.vinpixstudio.com`.
- Use the README deployment scripts with `--keep-vars` to preserve runtime
  variables and secrets.
