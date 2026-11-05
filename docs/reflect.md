# Documentation Reflection Log

## 2026-10-07

- A seller ID's absence from public sellers.json is an unresolved registry
  check, not proof that the app-ads.txt ID is wrong. Verify it against the actual
  signed-in publisher account before changing it.
- Compare current official reseller recommendations as well as publisher
  DIRECT rows. Normalize domain case and whitespace; the fourth certification
  field is optional and should not inflate the missing-seller count.
- For an existing OpenNext build, Wrangler autoconfig may delegate deployment
  and lose quoting around a multiword message. Explicit `--autoconfig=false`
  deploys the already configured Worker; preserve runtime vars with `--keep-vars`.
- Check canonical public endpoints after propagation, not only a successful
  upload or cache-busted URLs.

## 2026-09-19

- For missing 3D shadows, validate the allocated render target dimensions, not only `shadow.mapSize` and cast/receive flags. Configure lights before the first frame and check a fresh 3D mount, not just settings changes that recreate the texture.

## 2026-09-09

- When the owner supplies registration facts, update the dossier, public identity and prior missing-information notes together; distinguish incorporation from studio history. Do not publish personal birth dates merely because they are included in a business dossier.

- A dossier copied from a website does not independently verify its founding year. Remove unsupported claims from both visible copy and JSON-LD.
- No vector search tool or `.codegraph/` directory was available; read summaries first and used local search.
- Keep game-specific legal policies distinct from studio-wide policies; missing business facts must not be replaced with invented commitments.

## 2026-05-27

- `docs/` did not exist before this documentation pass, so there were no existing summaries to read.
- No dedicated vector database search tool was available in this session; local repository search was used as the fallback.
- Brand guidance was derived from current product copy and code references rather than invented brand claims.
