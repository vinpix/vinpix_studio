// Pure (no data imports) so the client search bundle stays small.
/** Compact search entry. Short keys keep the JSON small. */
export interface SearchEntry {
  /** name */
  n: string;
  /** subtitle */
  s?: string;
  /** summary (plain text) */
  m: string;
  /** category id */
  c: string;
  /** category title */
  ct: string;
  /** slug */
  u: string;
  /** tags */
  t?: string[];
}

/** Client-side ranking. Every query token must match somewhere. */
export function searchIndex(
  index: SearchEntry[],
  query: string,
  limit = 8
): SearchEntry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of index) {
    const name = e.n.toLowerCase();
    const sub = (e.s ?? "").toLowerCase();
    const tags = (e.t ?? []).join(" ").toLowerCase();
    const cat = e.ct.toLowerCase();
    const sum = e.m.toLowerCase();
    let total = 0;
    let ok = true;
    for (const t of tokens) {
      let s = 0;
      if (name.startsWith(t)) s = 100;
      else if (name.split(/[\s-]+/).some((w) => w.startsWith(t))) s = 80;
      else if (name.includes(t)) s = 60;
      else if (tags.includes(t)) s = 30;
      else if (sub.includes(t)) s = 20;
      else if (cat.includes(t)) s = 15;
      else if (sum.includes(t)) s = 5;
      if (!s) {
        ok = false;
        break;
      }
      total += s;
    }
    if (ok) scored.push({ e, score: total });
  }
  scored.sort((a, b) => b.score - a.score || a.e.n.localeCompare(b.e.n));
  return scored.slice(0, limit).map((x) => x.e);
}
