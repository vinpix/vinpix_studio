# The Last Dungeon microsite — 2026-11-04

- New custom domain `lastdungeon.vinpixstudio.com` on the `vinpix-studio` Worker
  (route in `wrangler.jsonc`). Middleware rewrites that host to `src/app/lastdungeon/*`;
  `/lastdungeon/*` on the studio hosts 301s to the subdomain. Helpers and store links:
  `src/lib/lastdungeon.ts`. The studio chrome hook (`src/hooks/useIsFloorZeroSite.ts`,
  alias `useIsGameMicrosite`) now covers both game microsites.
- Landing: `src/app/lastdungeon/page.tsx` + `src/components/lastdungeon/landing/`
  (gate intro, torches, embers, sprite-strip animations, arena lanes, flip cards, chest,
  forge, boss name cards, hub). All motion is CSS/IntersectionObserver, paused offscreen,
  off under `prefers-reduced-motion`.
- Wiki: `src/app/lastdungeon/wiki/**`, components `src/components/lastdungeon/wiki/`,
  data `src/features/lastdungeon/data/*.ts` (275 articles: heroes 6, pets 5, weapons 94,
  buffs 38, enemies 34, bosses 7, items 42, dungeons 24, mechanics 25), extracted from the
  TLD Unity project (`C:\dev\TLD` on pc2; current code wins over docs). Assets in `public/ld/`.
  Validate: `npx tsx scripts/lastdungeon-validate.ts`. Tests: `tests/lastdungeon-routing.test.ts`.
- Deployed from pc2 with the whole working tree (owner-approved): version
  `f9bb521e-2fd5-4f00-ad8b-805e2565e0cf`, rollback `68ed5bc4-4292-4215-9bb1-78153f5da66d`.
  Production checks: `/`, `/wiki`, articles, sitemap, robots, `/ld/og.png` -> 200; unknown slug -> 404;
  `www/lastdungeon/wiki` -> 301; floorzero and studio pages still 200.
- Local dev of the subdomain: http://lastdungeon.localhost:3002
- Content caveats: monster/boss HP and damage are derived from the balance formulas
  (marked "About"/"derived"); hero skill names are wiki wording (the game uses ids);
  pets are cosmetic (cannot attack); dungeon images are Editor play-mode captures.

## In-game GIFs (boss phases, boss skills, monster attacks) — 2026-11-04

- 82 GIFs in `public/ld/wiki/{bosses,enemies}/<slug>/` (288 px wide, 10 fps, 48 colours, ~98 MB total), shown as
  section `media` (new `WikiSection.media`, rendered by `SectionMedia` in `ArticleView.tsx` under the text/table).
  Bosses: one GIF per phase (Phases subsections) and per skill (Skills section); enemies: `attack.gif` in
  "Attacks and telegraphs".
- Footage is real play mode, recorded on pc2 by the TLD Play Mode harness (`D:\dev\TLD`, Unity batchmode,
  `-executeMethod TldPlaySmoke.Begin -smokeRun ...`). Phases come from the existing `vidbossa`/`vidbossb` clips;
  skills from the new `vidskill:<unit>[:only=<ids>]` scenario (`Assets/Editor/TldPlaySmokeVidSkill.cs`, forces each
  skill through BossKitForce); monsters from the new `vidmon:<n|h><floor>:u=<ids>` scenario
  (`Assets/Editor/TldPlaySmokeVidMon.cs`). Clips land in `D:\dev\TLD\Logs\vid\{skill,pass2,pass3}`.
- Rebuild: `python scripts/lastdungeon-gif-build.py [bosses|enemies]` (cuts by the clips' marks.tsv, writes
  `scripts/lastdungeon-gif-manifest.json`), then `npx tsx scripts/lastdungeon-apply-media.ts` and the validator.
- Deployed version `f9530704-1145-45f4-bcb0-eca57b367a33` (rollback `f9bb521e-2fd5-4f00-ad8b-805e2565e0cf`).
