import { allArticles, categories } from "./wikiStore";
import { plainText } from "./richText";
import type { SearchEntry } from "./search";

/** Server-side: builds the compact index served at /wiki/search-index. */
export function buildSearchIndex(): SearchEntry[] {
  const titles = new Map(categories.map((c) => [c.id, c.title]));
  return allArticles.map((a) => ({
    n: a.name,
    s: a.subtitle ? plainText(a.subtitle) : undefined,
    m: plainText(a.summary),
    c: a.category,
    ct: titles.get(a.category) ?? a.category,
    u: a.slug,
    t: a.tags?.length ? a.tags : undefined,
  }));
}
