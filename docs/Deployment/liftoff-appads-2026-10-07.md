# Liftoff app-ads.txt publication — 2026-10-07

- The user explicitly approved adding the 38 missing Liftoff reseller rows and
  deploying to Cloudflare after reviewing the proposed file.
- Updated only `public/app-ads.txt` and its generated asset copy in
  `.open-next/assets/app-ads.txt`; used the existing full website build.
- Worker: `vinpix-studio`. Previous version:
  `71deb86c-9973-40db-911b-890b6937209c`.
- New version: `587f6631-ccd2-47dc-a144-76058142eec5`.
- Command: `node node_modules/wrangler/bin/wrangler.js deploy --autoconfig=false
  --keep-vars --message 'Add 38 Liftoff reseller entries to app-ads.txt'`.
- Wrangler uploaded exactly one changed static asset, `/app-ads.txt`. Existing
  runtime variables were retained with `--keep-vars`; secrets are retained by
  Wrangler deployments.
- Dry-run succeeded. The generated OpenNext bundle's existing duplicate-case
  warning did not block deployment.
- Initial deployment attempt without `--autoconfig=false` delegated to
  OpenNext, which split the multiword message into unsupported arguments and
  exited before deployment. The explicit built-Worker deploy above succeeded.
- The first apex GET just after deploy returned old bytes. Subsequent canonical
  GETs returned new bytes on all three hosts after edge propagation.
- Production `/app-ads.txt`: HTTP 200, `text/plain`, 111,453 bytes, SHA-256
  `727913f7c7a6b0679ce2c1738422015818638755500d3bc05eb8ad3edbdadaf0`.
- Apex, `www`, and workers.dev are byte-for-byte equal to current public source.
- Comparing the first three fields against Liftoff's official current list
  leaves zero missing reseller declarations. The account's DIRECT ID was
  verified separately in the signed-in Liftoff dashboard.
- Homepage, `/kitchentogether`, and `/support` returned HTTP 200 after deployment.
- Verification report:
  `/Users/kietle/Desktop/Kiet/yandex-kt2-20261007/website-deploy/liftoff-live-verification.json`.
- [Network audit](../Ads/network-audit-2026-10-07.md).
