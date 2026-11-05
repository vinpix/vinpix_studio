import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/lastdungeon/wiki/ArticleCard";
import { CategoryIcon } from "@/components/lastdungeon/wiki/CategoryIcon";
import { WikiSearch } from "@/components/lastdungeon/wiki/WikiSearch";
import {
  allArticles,
  articlesByCategory,
  categories,
} from "@/features/lastdungeon/wikiStore";
import type { WikiArticle, WikiCategoryId } from "@/features/lastdungeon/types";

const TITLE = "The Last Dungeon Wiki";
const DESC =
  "The community-style guide to The Last Dungeon, the pixel-art roguelike dungeon shooter: heroes, pets, weapons, buffs, enemies, bosses, items, dungeons and game mechanics.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} - Heroes, Weapons, Enemies, Bosses and More` },
  description: DESC,
  alternates: { canonical: "/wiki" },
  openGraph: {
    type: "website",
    siteName: "The Last Dungeon",
    title: TITLE,
    description: DESC,
    url: "/wiki",
    images: [{ url: "/ld/og.png", width: 1200, height: 630, alt: "The Last Dungeon" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const catById = new Map(categories.map((c) => [c.id, c]));

function pickFeatured(): WikiArticle[] {
  const order: WikiCategoryId[] = ["bosses", "heroes", "weapons", "enemies", "pets", "dungeons"];
  const out: WikiArticle[] = [];
  for (const id of order) {
    const a = articlesByCategory[id].find((x) => x.image);
    if (a) out.push(a);
    if (out.length === 3) break;
  }
  // Not enough with images: fill with the first article of any category.
  for (const a of allArticles) {
    if (out.length >= 3) break;
    if (!out.includes(a)) out.push(a);
  }
  return out;
}

/** Deterministic round-robin over categories (static page, no random). */
function pickMore(skip: WikiArticle[], n: number): WikiArticle[] {
  const lists = categories.map((c) =>
    articlesByCategory[c.id].filter((a) => !skip.includes(a)).slice(1)
  );
  const out: WikiArticle[] = [];
  for (let i = 0; out.length < n; i++) {
    let any = false;
    for (const l of lists) {
      if (l[i]) {
        out.push(l[i]);
        any = true;
        if (out.length === n) break;
      }
    }
    if (!any) break;
  }
  return out;
}

const EMBERS = [
  { left: "8%", d: "7s", delay: "0s", x: "14px" },
  { left: "22%", d: "9s", delay: "2.2s", x: "-10px" },
  { left: "41%", d: "6.5s", delay: "1s", x: "18px" },
  { left: "58%", d: "8.5s", delay: "3.4s", x: "-16px" },
  { left: "74%", d: "7.5s", delay: "0.6s", x: "10px" },
  { left: "90%", d: "9.5s", delay: "4.1s", x: "-12px" },
];

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function WikiHome() {
  const total = allArticles.length;
  const featured = pickFeatured();
  const more = pickMore(featured, 8);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="ldw-rise relative mb-8 overflow-hidden rounded-md border border-(--ldw-accent-dim) bg-(--ldw-panel) p-5 shadow-[0_0_40px_-12px_rgba(245,158,43,0.35)] sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(245,158,43,0.14),transparent_70%)]"
        />
        {EMBERS.map((e, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="ldw-ember"
            style={
              { left: e.left, "--d": e.d, "--delay": e.delay, "--x": e.x } as React.CSSProperties
            }
          />
        ))}
        <div className="relative">
          <p className="ldw-label mb-1 text-sm text-(--ldw-accent-dim)">
            {total} {total === 1 ? "article" : "articles"} and counting
          </p>
          <h1 className="ldw-display mb-3 text-4xl leading-none text-(--ldw-accent) [text-shadow:0_0_22px_rgba(245,158,43,0.4)] sm:text-6xl">
            Welcome to the Last Dungeon Wiki
          </h1>
          <p className="mb-5 max-w-2xl leading-relaxed text-(--ldw-text)/90">
            Everything about <strong className="text-[#fff6d0]">The Last Dungeon</strong>, the
            pixel-art roguelike dungeon shooter by Vinpix Studio: heroes and pets, every weapon
            and buff, monsters and bosses, plus items, dungeons and the mechanics underneath.
            Pick a category or search to start digging.
          </p>
          <div className="max-w-xl">
            <WikiSearch size="lg" />
          </div>
          <p className="mt-3 text-xs text-(--ldw-muted)">
            Tip: press{" "}
            <kbd className="ldw-label rounded border border-(--ldw-line) px-1.5 text-xs">/</kbd>{" "}
            anywhere to search.
          </p>
        </div>
      </section>

      <section aria-labelledby="cats" className="mb-10">
        <h2 id="cats" className="ldw-display mb-4 text-3xl text-(--ldw-accent)">
          Browse by category
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const n = articlesByCategory[c.id].length;
            return (
              <li key={c.id} className="ldw-rise" style={rise(i)}>
                <Link
                  href={`/wiki/${c.id}`}
                  className="ldw-card group flex h-full gap-3 rounded-md border border-(--ldw-line) bg-(--ldw-panel) p-4"
                >
                  <span className="ldw-tile-icon flex size-11 shrink-0 items-center justify-center rounded border border-(--ldw-line) bg-(--ldw-bg) text-(--ldw-torch)">
                    <CategoryIcon name={c.icon} size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="ldw-display text-2xl leading-none text-(--ldw-accent) group-hover:underline">
                        {c.title}
                      </span>
                      <span className="ldw-label text-xs text-(--ldw-muted)">{n}</span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-(--ldw-text)/75">
                      {c.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {featured.length > 0 && (
        <section aria-labelledby="featured" className="mb-10">
          <h2 id="featured" className="ldw-display mb-4 text-3xl text-(--ldw-accent)">
            Featured
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {featured.map((a, i) => {
              const c = catById.get(a.category);
              return (
                <li key={`${a.category}/${a.slug}`} className="ldw-rise" style={rise(i)}>
                  <ArticleCard
                    article={a}
                    categoryTitle={c?.singular}
                    categoryIcon={c?.icon}
                    showSummary
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {more.length > 0 && (
        <section aria-labelledby="more" className="mb-6">
          <h2 id="more" className="ldw-display mb-4 text-3xl text-(--ldw-accent)">
            Jump in
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {more.map((a, i) => {
              const c = catById.get(a.category);
              return (
                <li key={`${a.category}/${a.slug}`} className="ldw-rise" style={rise(i)}>
                  <ArticleCard article={a} categoryTitle={c?.singular} categoryIcon={c?.icon} />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {total === 0 && (
        <p className="rounded-md border border-dashed border-(--ldw-line) p-8 text-center text-(--ldw-muted)">
          The wiki is being written. Articles will appear here soon.
        </p>
      )}
    </div>
  );
}
