/**
 * Puts the in-game GIFs (built by scripts/lastdungeon-gif-build.py, listed in
 * scripts/lastdungeon-gif-manifest.json) into the wiki data as section `media`:
 *   bosses   "Phases" subsections get phase-<n>.gif, "Skills" gets one clip per skill,
 *            the boss overview's "Phases and transformations" gets one example
 *   enemies  "Attacks and telegraphs" gets attack.gif
 * Rewrites src/features/lastdungeon/data/{bosses,enemies}.ts (JSON layout). Idempotent.
 *   npx tsx scripts/lastdungeon-apply-media.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { bosses } from "../src/features/lastdungeon/data/bosses";
import { enemies } from "../src/features/lastdungeon/data/enemies";
import type { WikiArticle, WikiImage, WikiSection } from "../src/features/lastdungeon/types";

const root = process.cwd();
const manifest: Record<string, { width: number; height: number; seconds: number }> = JSON.parse(
  readFileSync(join(root, "scripts/lastdungeon-gif-manifest.json"), "utf8")
);

function clip(src: string, alt: string, caption: string): WikiImage | null {
  const m = manifest[src];
  if (!m) {
    console.warn("missing gif", src);
    return null;
  }
  return { src, alt, caption, pixelated: false, width: m.width, height: m.height };
}

const SKILLS: Record<string, [string, string][]> = {
  "skeleton-seeker": [
    ["bone-nova", "Bone Nova"], ["bone-rush", "Bone Rush"], ["bone-bomb", "Bone Bomb"],
    ["bone-scatter", "Bone Scatter"], ["skull-bowl", "Skull Bowl"], ["ossuary-gate", "Ossuary Gate (finale)"],
  ],
  "old-guardian": [
    ["stone-ward", "Stone Ward"], ["titan-stomp", "Titan Stomp"], ["faultline", "Faultline"],
    ["blast", "Blast (gap filler)"], ["lob", "Lob (a Hard-mode skill)"], ["ceiling-falls", "Ceiling Falls (finale)"],
  ],
  "heavy-knight": [
    ["executioners-hold", "Executioner's Hold"], ["halberd-whirl", "Halberd Whirl"],
    ["headsmans-cleave", "Headsman's Cleave"], ["iron-verdict", "Iron Verdict (finale)"],
  ],
  "ghost-king": [
    ["royal-silence", "Royal Silence"], ["banner-wheel", "Banner Wheel"],
    ["ghost-footprints", "Ghost Footprints"], ["the-dead-court", "The Dead Court (finale)"],
  ],
  "desert-hunter": [
    ["mirage-tide", "Mirage Tide"], ["sand-hands-1", "Sand Ruins Hands I"], ["sand-hands-2", "Sand Ruins Hands II"],
    ["sand-hands-3", "Sand Ruins Hands III"], ["mirage-doubles", "Mirage Doubles"], ["antlion-maw", "Antlion Maw (finale)"],
  ],
  vegeful: [
    ["wraith-flame", "Wraith Flame"], ["hunting-blades", "Hunting Blades"], ["soul-harvest", "Soul Harvest"],
    ["soul-siphon", "Soul Siphon"], ["last-judgment", "Last Judgment (finale)"],
  ],
};

const FOOTAGE_NOTE =
  "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot.";

const find = (secs: WikiSection[], pred: (s: WikiSection) => boolean): WikiSection | undefined => {
  for (const s of secs) {
    if (pred(s)) return s;
    const sub = find(s.subsections ?? [], pred);
    if (sub) return sub;
  }
  return undefined;
};

let added = 0;
for (const a of bosses) {
  const skills = SKILLS[a.slug];
  if (!skills) continue;
  const phases = find(a.sections, (s) => s.heading === "Phases");
  (phases?.subsections ?? []).forEach((sub, i) => {
    const n = i + 1;
    const form = sub.heading.replace(/^Phase \d+:\s*/, "");
    const c = clip(
      `/ld/wiki/bosses/${a.slug}/phase-${n}.gif`,
      `${a.name}, phase ${n}: ${form}`,
      n === 1 ? `The intro card and the first form, ${form}.` : `The phase ${n} transformation into ${form}.`
    );
    if (c) {
      sub.media = [c];
      added++;
    }
  });
  const sk = find(a.sections, (s) => s.heading === "Skills");
  if (sk) {
    sk.media = skills
      .map(([file, label]) => clip(`/ld/wiki/bosses/${a.slug}/${file}.gif`, `${a.name} casting ${label}`, label))
      .filter((m): m is WikiImage => !!m);
    added += sk.media.length;
    sk.paragraphs = [...(sk.paragraphs ?? []).filter((p) => p !== FOOTAGE_NOTE), FOOTAGE_NOTE];
  }
}
const overview = bosses.find((a) => a.slug === "boss-overview");
const pt = overview && find(overview.sections, (s) => s.heading === "Phases and transformations");
if (pt) {
  const c = clip(
    "/ld/wiki/bosses/skeleton-seeker/phase-2.gif",
    "The Skeleton Seeker transforming at 72% health",
    "A transformation: the [[bosses/skeleton-seeker|Skeleton Seeker]] collapses and rebuilds as the Bone Crown."
  );
  if (c) {
    pt.media = [c];
    added++;
  }
}

for (const a of enemies) {
  const sec = find(a.sections, (s) => s.heading === "Attacks and telegraphs") ??
    find(a.sections, (s) => s.heading === "Overview");
  const c = clip(
    `/ld/wiki/enemies/${a.slug}/attack.gif`,
    `${a.name} attacking the hero`,
    `${a.name} in a fight (in-game footage).`
  );
  if (sec && c) {
    sec.media = [c];
    added++;
  }
}

function write(file: string, name: string, list: WikiArticle[]) {
  const body = `import type { WikiArticle } from "../types";\n\nexport const ${name}: WikiArticle[] = ${JSON.stringify(list, null, 2)};\n`;
  writeFileSync(join(root, "src/features/lastdungeon/data", file), body);
}
write("bosses.ts", "bosses", bosses);
write("enemies.ts", "enemies", enemies);
console.log(`media entries: ${added}`);
