# Kitchen Together 2 app-ads.txt

## Source and content

- Source: `public/app-ads.txt`, served at the developer website's root.
- Existing seller entries and `ownerdomain=vinpixstudio.com` were preserved.
- On 2026-10-07, the account's official Yandex export was merged, deduplicating
  equivalent entries by comma-separated values without changing existing lines.
- Added 2,026 entries, including `yandex.com, 331288959, DIRECT` and the account
  export's reseller entries. At that point: 109,910 bytes, SHA-256
  `2ae3b39eeafb4c6df74bbd0cf6ee101acb83ea600b2df3367f0a8af6c5d1e386`.
- A subsequent account audit added 38 missing Liftoff reseller entries with
  user approval. Current file: 111,453 bytes, SHA-256
  `727913f7c7a6b0679ce2c1738422015818638755500d3bc05eb8ad3edbdadaf0`.
  See [network audit](network-audit-2026-10-07.md).

## Publication and checks

- Cloudflare Worker: `vinpix-studio`, account `029f8dde6285b361222f726c74686359`.
- The existing `.open-next` Worker bundle matched the downloaded active Worker
  byte-for-byte. Only its generated `assets/app-ads.txt` was replaced from the
  updated public source; the app was not rebuilt from unrelated local edits.
- Wrangler uploaded one changed asset, `/app-ads.txt`, with `--keep-vars`.
- New version `a7b8b611-5a84-4843-a4f0-365fc092542e` passed preview checks and
  was deployed at 100%. Prior version: `8d26d5e0-e4cf-4c0b-b757-cf76b4beb333`.
- Worker script SHA-256 remained
  `a06135c104d20d195c3031fddd40c9c69b995ddedbaa04ef56150ff89ab2e1d0`.
- Existing Worker bindings, variables and secrets were retained.
- Post-deploy GETs returned HTTP 200, `text/plain`, and the expected file bytes
  on the apex, `www`, and `vinpix-studio.kiet57441.workers.dev` hosts.
- Private backup and check reports are under
  `/Users/kietle/Desktop/Kiet/yandex-kt2-20261007/website-deploy/`.
- A subsequent user-requested full website rebuild/redeployment published
  version `71deb86c-9973-40db-911b-890b6937209c`; both app-ads endpoints still
  return exactly the expected file. See [deployment record](../Deployment/2026-10-07.md).

## Verification limits

- Publication and iOS ownership are verified separately. After clicking the iOS
  application's `Send for verification` button, the first list retained cached
  `Ownership unverified`. Reloading confirmed Active for both iOS and Android
  and removed the iOS Confirm action. Payout/contract acceptance is separate.
- Yandex documents that it checks app-ads.txt every 24 hours and its interface
  may take up to 24 hours to reflect corrections.

## Reference

- [Yandex app-ads.txt](https://ads.yandex.com/helpcenter/en/monetization/app/ads-txt)
