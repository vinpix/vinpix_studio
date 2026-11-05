/**
 * Validates the Floor Zero wiki data.
 *   npx tsx scripts/floorzero-validate.ts            # all categories
 *   npx tsx scripts/floorzero-validate.ts weapons    # only report errors for these categories
 * Exits 1 on any error. Checks: slug format/uniqueness, category field,
 * required text, internal [[links]] and `related` resolve, images exist.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { articlesByCategory, categories, getArticle } from "../src/features/floorzero/data";
import type { WikiArticle, WikiSection } from "../src/features/floorzero/types";

const root = process.cwd(); // run from the repo root
const only = new Set(process.argv.slice(2));
const errors: string[] = [];
const LINK = /\[\[([a-z]+)\/([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g;

function texts(a: WikiArticle): string[] {
  const out: string[] = [a.summary, ...(a.trivia ?? [])];
  for (const r of a.infobox ?? []) out.push(r.value);
  const walk = (s: WikiSection) => {
    out.push(...(s.paragraphs ?? []), ...(s.bullets ?? []));
    for (const row of s.table?.rows ?? []) out.push(...row);
    (s.subsections ?? []).forEach(walk);
  };
  a.sections.forEach(walk);
  return out;
}

let total = 0;
for (const cat of categories) {
  const list = articlesByCategory[cat.id];
  total += list.length;
  if (only.size && !only.has(cat.id)) continue;
  const seen = new Set<string>();
  for (const a of list) {
    const where = `${cat.id}/${a.slug}`;
    const err = (m: string) => errors.push(`${where}: ${m}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) err("slug must be kebab-case");
    if (seen.has(a.slug)) err("duplicate slug");
    seen.add(a.slug);
    if (a.category !== cat.id) err(`category field is "${a.category}"`);
    if (!a.name?.trim()) err("missing name");
    if (!a.summary?.trim()) err("missing summary");
    if (!a.sections?.length) err("no sections");
    for (const t of texts(a)) {
      for (const m of t.matchAll(LINK)) {
        if (!getArticle(m[1], m[2])) err(`broken link [[${m[1]}/${m[2]}]]`);
      }
      if (/\[\[(?![a-z]+\/[a-z0-9-]+(\|[^\]]+)?\]\])/.test(t)) err(`malformed link in: ${t.slice(0, 60)}`);
    }
    for (const r of a.related ?? []) {
      if (!getArticle(r.category, r.slug)) err(`related -> ${r.category}/${r.slug} missing`);
    }
    for (const img of [a.image, ...(a.gallery ?? [])]) {
      if (!img) continue;
      if (!img.src.startsWith("/fz/")) err(`image src must start with /fz/: ${img.src}`);
      else if (!existsSync(join(root, "public", img.src))) err(`image file missing: public${img.src}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log(
  `OK — ${total} articles: ` +
    categories.map((c) => `${c.id} ${articlesByCategory[c.id].length}`).join(", ")
);
