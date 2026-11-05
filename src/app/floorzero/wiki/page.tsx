import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/floorzero/wiki/ArticleCard";
import { CategoryIcon } from "@/components/floorzero/wiki/CategoryIcon";
import { WikiSearch } from "@/components/floorzero/wiki/WikiSearch";
import {
  allArticles,
  articlesByCategory,
  categories,
} from "@/features/floorzero/wikiStore";
import type { WikiArticle, WikiCategoryId } from "@/features/floorzero/types";

const TITLE = "Floor Zero Wiki";
const DESC =
  "The community-style guide to Floor Zero, the pixel-art Backrooms roguelite: weapons, enemies, bosses, characters, anomalies, perks, levels and mechanics.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} - Weapons, Enemies, Bosses and More` },
  description: DESC,
  alternates: { canonical: "/wiki" },
  openGraph: {
    type: "website",
    siteName: "Floor Zero",
    title: TITLE,
    description: DESC,
    url: "/wiki",
    images: [{ url: "/fz/og.png", width: 1200, height: 630, alt: "Floor Zero" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const catById = new Map(categories.map((c) => [c.id, c]));

function pickFeatured(): WikiArticle[] {
  const order: WikiCategoryId[] = ["bosses", "characters", "weapons", "enemies", "levels"];
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

export default function WikiHome() {
  const total = allArticles.length;
  const featured = pickFeatured();
  const more = pickMore(featured, 8);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="mb-8 rounded-md border border-(--fzw-accent-dim) bg-(--fzw-panel) p-5 sm:p-8">
        <p className="fzw-term mb-1 text-xl text-(--fzw-accent-dim)">
          {total} {total === 1 ? "article" : "articles"} and counting
        </p>
        <h1 className="fzw-pixel mb-3 text-2xl leading-tight text-(--fzw-accent) sm:text-4xl">
          Welcome to the Floor Zero Wiki
        </h1>
        <p className="mb-5 max-w-2xl leading-relaxed text-(--fzw-text)/90">
          Everything about <strong className="text-[#fff6d0]">Floor Zero</strong>, the co-op
          pixel-art Backrooms roguelite by Vinpix Studio: every weapon, enemy and boss, plus
          anomalies, perks, levels and the mechanics underneath. Pick a category or search
          to start digging.
        </p>
        <div className="max-w-xl">
          <WikiSearch size="lg" />
        </div>
        <p className="mt-3 text-xs text-(--fzw-muted)">
          Tip: press <kbd className="fzw-term rounded border border-(--fzw-line) px-1.5 text-sm">/</kbd>{" "}
          anywhere to search.
        </p>
      </section>

      <section aria-labelledby="cats" className="mb-10">
        <h2 id="cats" className="fzw-pixel mb-4 text-lg text-(--fzw-accent)">
          Browse by category
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const n = articlesByCategory[c.id].length;
            return (
              <li key={c.id}>
                <Link
                  href={`/wiki/${c.id}`}
                  className="group flex h-full gap-3 rounded-md border border-(--fzw-line) bg-(--fzw-panel) p-4 transition-colors hover:border-(--fzw-accent)"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded border border-(--fzw-line) bg-(--fzw-bg) text-(--fzw-accent)">
                    <CategoryIcon name={c.icon} size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="fzw-pixel text-sm text-(--fzw-accent) group-hover:underline">
                        {c.title}
                      </span>
                      <span className="fzw-term text-lg text-(--fzw-muted)">{n}</span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-(--fzw-text)/75">
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
          <h2 id="featured" className="fzw-pixel mb-4 text-lg text-(--fzw-accent)">
            Featured
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {featured.map((a) => {
              const c = catById.get(a.category);
              return (
                <li key={`${a.category}/${a.slug}`}>
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
          <h2 id="more" className="fzw-pixel mb-4 text-lg text-(--fzw-accent)">
            Jump in
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {more.map((a) => {
              const c = catById.get(a.category);
              return (
                <li key={`${a.category}/${a.slug}`}>
                  <ArticleCard article={a} categoryTitle={c?.singular} categoryIcon={c?.icon} />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {total === 0 && (
        <p className="rounded-md border border-dashed border-(--fzw-line) p-8 text-center text-(--fzw-muted)">
          The wiki is being written. Articles will appear here soon.
        </p>
      )}
    </div>
  );
}
