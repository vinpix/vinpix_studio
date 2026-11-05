import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RichText } from "@/features/lastdungeon/richText";
import { articlesByCategory, getArticle } from "@/features/lastdungeon/wikiStore";
import type {
  WikiArticle,
  WikiCategory,
  WikiImage,
  WikiSection,
} from "@/features/lastdungeon/types";
import { ArticleCard } from "./ArticleCard";
import { CategoryIcon } from "./CategoryIcon";
import { TocNav, type TocItem } from "./TocNav";
import { WikiImg } from "./WikiImg";

interface TocNode {
  id: string;
  heading: string;
  children: TocNode[];
}

/** Stable, de-duplicated heading ids shared by the TOC and the sections. */
function buildToc(sections: WikiSection[]): TocNode[] {
  const used = new Set<string>(["trivia", "gallery", "related", "overview"]);
  const slug = (h: string) => {
    const base =
      h
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "section";
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  };
  const walk = (s: WikiSection): TocNode => ({
    id: slug(s.heading),
    heading: s.heading,
    children: (s.subsections ?? []).map(walk),
  });
  return sections.map(walk);
}

/**
 * In-game clips (GIFs) of a section: one wide clip, or a 2-column grid.
 * Plain <img> (lazy) so the browser plays the GIF as is.
 */
function SectionMedia({ media }: { media: WikiImage[] }) {
  const single = media.length === 1;
  return (
    <ul className={`mb-4 grid gap-3 ${single ? "max-w-2xl grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
      {media.map((m, i) => (
        <li key={m.src} className="ldw-rise" style={{ "--i": i } as React.CSSProperties}>
          <figure className="ldw-clip m-0 overflow-hidden rounded-md border border-(--ldw-line) bg-(--ldw-panel)">
            {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF, served as is */}
            <img
              src={m.src}
              alt={m.alt}
              width={m.width}
              height={m.height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full bg-black"
              style={{ aspectRatio: m.width && m.height ? `${m.width} / ${m.height}` : undefined }}
            />
            {m.caption && (
              <figcaption className="border-t border-(--ldw-line) px-2.5 py-1.5 text-xs text-(--ldw-muted)">
                <RichText text={m.caption} />
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}

function Section({
  section,
  node,
  level,
}: {
  section: WikiSection;
  node: TocNode;
  level: 2 | 3;
}) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <section aria-labelledby={node.id} className="mb-8">
      <H
        id={node.id}
        className={
          level === 2
            ? "ldw-display ldw-sec-title mb-3 scroll-mt-24 border-b border-(--ldw-line) pb-1.5 text-3xl text-(--ldw-accent)"
            : "ldw-display ldw-sec-title mb-2 mt-5 scroll-mt-24 text-2xl text-(--ldw-accent)"
        }
      >
        {section.heading}
      </H>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mb-3 leading-relaxed text-(--ldw-text)/90">
          <RichText text={p} />
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mb-3 list-disc space-y-1.5 pl-5 marker:text-(--ldw-accent-dim)">
          {section.bullets.map((b, i) => (
            <li key={i} className="leading-relaxed text-(--ldw-text)/90">
              <RichText text={b} />
            </li>
          ))}
        </ul>
      )}
      {section.table && (
        <div
          role="region"
          aria-label={`${section.heading} table`}
          tabIndex={0}
          className="mb-4 max-w-full overflow-x-auto rounded-md border border-(--ldw-line)"
        >
          <table className="ldw-table w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-(--ldw-panel2)">
              <tr>
                {section.table.columns.map((c, i) => (
                  <th key={i} scope="col" className="ldw-label px-3 py-2 text-xs text-(--ldw-accent)">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, r) => (
                <tr key={r} className="border-t border-(--ldw-line) odd:bg-(--ldw-panel)">
                  {row.map((cell, c) => (
                    <td key={c} className="px-3 py-2 align-top text-(--ldw-text)/90">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.media && section.media.length > 0 && <SectionMedia media={section.media} />}
      {section.subsections?.map((s, i) => (
        <Section key={i} section={s} node={node.children[i]} level={3} />
      ))}
    </section>
  );
}

function Toc({ nodes, extra }: { nodes: TocNode[]; extra: { id: string; label: string }[] }) {
  const items: TocItem[] = [
    ...nodes.map((n) => ({
      id: n.id,
      label: n.heading,
      children: n.children.map((c) => ({ id: c.id, label: c.heading })),
    })),
    ...extra,
  ];
  return (
    <nav aria-label="Contents" className="mb-6 max-w-full rounded-md border border-(--ldw-line) bg-(--ldw-panel) md:w-fit md:min-w-64">
      <details open>
        <summary className="ldw-label cursor-pointer select-none px-4 py-2.5 text-sm text-(--ldw-accent)">
          Contents
        </summary>
        <TocNav items={items} />
      </details>
    </nav>
  );
}

function Infobox({ article }: { article: WikiArticle }) {
  const rows = article.infobox ?? [];
  if (!article.image && rows.length === 0) return null;
  return (
    <aside
      aria-label={`${article.name} quick facts`}
      className="mb-6 overflow-hidden rounded-md border ldw-rise border-(--ldw-accent-dim) bg-(--ldw-panel) shadow-[0_0_24px_-8px_rgba(245,158,43,0.35)] md:float-right md:mb-4 md:ml-6 md:w-80"
    >
      <div className="ldw-display bg-(--ldw-torch) px-3 py-1.5 text-center text-2xl text-black">
        {article.name}
      </div>
      {article.image && (
        <figure className="m-0">
          <WikiImg image={article.image} priority bob sizes="(min-width: 768px) 320px, 100vw" />
          {article.image.caption && (
            <figcaption className="border-t border-(--ldw-line) px-3 py-1.5 text-center text-xs text-(--ldw-muted)">
              {article.image.caption}
            </figcaption>
          )}
        </figure>
      )}
      {rows.length > 0 && (
        <dl className="text-sm">
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[minmax(5.5rem,2fr)_3fr] gap-3 border-t border-(--ldw-line) px-3 py-2"
            >
              <dt className="ldw-label text-xs leading-5 text-(--ldw-accent)">{r.label}</dt>
              <dd className="m-0 min-w-0 break-words text-(--ldw-text)/90">
                <RichText text={r.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </aside>
  );
}

export function ArticleView({
  article,
  category,
}: {
  article: WikiArticle;
  category: WikiCategory;
}) {
  const toc = buildToc(article.sections);
  const gallery = article.gallery ?? [];
  const trivia = article.trivia ?? [];
  const related = (article.related ?? [])
    .map((r) => getArticle(r.category, r.slug))
    .filter((a): a is WikiArticle => !!a);

  const extra: { id: string; label: string }[] = [];
  if (gallery.length) extra.push({ id: "gallery", label: "Gallery" });
  if (trivia.length) extra.push({ id: "trivia", label: "Trivia" });
  if (related.length) extra.push({ id: "related", label: "Related" });

  const siblings = articlesByCategory[category.id];
  const idx = siblings.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  const crumb = "text-(--ldw-muted) hover:text-(--ldw-accent) hover:underline";
  return (
    <article className="mx-auto max-w-5xl">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/wiki" className={crumb}>
              Wiki
            </Link>
          </li>
          <li aria-hidden="true" className="text-(--ldw-line)">/</li>
          <li>
            <Link href={`/wiki/${category.id}`} className={crumb}>
              {category.title}
            </Link>
          </li>
          <li aria-hidden="true" className="text-(--ldw-line)">/</li>
          <li aria-current="page" className="text-(--ldw-text)">
            {article.name}
          </li>
        </ol>
      </nav>

      <header className="mb-5">
        <h1 className="ldw-display text-4xl leading-none text-(--ldw-accent) [text-shadow:0_0_18px_rgba(245,158,43,0.35)] sm:text-5xl">
          {article.name}
        </h1>
        {article.subtitle && (
          <p className="mt-1.5 text-sm italic text-(--ldw-muted)">
            <RichText text={article.subtitle} />
          </p>
        )}
      </header>

      <div className="flow-root">
        <Infobox article={article} />
        <p className="mb-6 text-base leading-relaxed text-(--ldw-text)">
          <RichText text={article.summary} />
        </p>
        {(toc.length > 1 || extra.length > 0) && <Toc nodes={toc} extra={extra} />}

        {article.sections.map((s, i) => (
          <Section key={toc[i].id} section={s} node={toc[i]} level={2} />
        ))}

        {gallery.length > 0 && (
          <section aria-labelledby="gallery" className="mb-8 clear-both">
            <h2 id="gallery" className="ldw-display ldw-sec-title mb-3 scroll-mt-24 border-b border-(--ldw-line) pb-1.5 text-3xl text-(--ldw-accent)">
              Gallery
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g, i) => (
                <li key={i} className="ldw-rise" style={{ "--i": i } as React.CSSProperties}>
                  <figure className="m-0 overflow-hidden rounded-md border border-(--ldw-line) bg-(--ldw-panel)">
                    <WikiImg image={g} sizes="(min-width: 640px) 33vw, 50vw" />
                    {g.caption && (
                      <figcaption className="px-2.5 py-1.5 text-xs text-(--ldw-muted)">
                        {g.caption}
                      </figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}

        {trivia.length > 0 && (
          <section aria-labelledby="trivia" className="mb-8">
            <h2 id="trivia" className="ldw-display ldw-sec-title mb-3 scroll-mt-24 border-b border-(--ldw-line) pb-1.5 text-3xl text-(--ldw-accent)">
              Trivia
            </h2>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-(--ldw-accent-dim)">
              {trivia.map((t, i) => (
                <li key={i} className="leading-relaxed text-(--ldw-text)/90">
                  <RichText text={t} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mb-8 clear-both">
          <h2 id="related" className="ldw-display ldw-sec-title mb-3 scroll-mt-24 border-b border-(--ldw-line) pb-1.5 text-3xl text-(--ldw-accent)">
            Related
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r, n) => (
              <li key={`${r.category}/${r.slug}`} className="ldw-rise" style={{ "--i": n } as React.CSSProperties}>
                <ArticleCard article={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="clear-both mt-10 border-t border-(--ldw-line) pt-4">
        <p className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-(--ldw-muted)">
          <span className="font-semibold text-(--ldw-text)/85">Categories:</span>
          <Link
            href={`/wiki/${category.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-(--ldw-accent-dim) px-2.5 py-0.5 text-xs text-(--ldw-accent) hover:bg-(--ldw-panel2)"
          >
            <CategoryIcon name={category.icon} size={12} />
            {category.title}
          </Link>
          {(article.tags ?? []).map((t) => (
            <span key={t} className="contents">
              <span aria-hidden="true">·</span>
              <Link
                href={`/wiki/${category.id}?tag=${encodeURIComponent(t)}`}
                className="rounded-full border border-(--ldw-line) px-2.5 py-0.5 text-xs text-(--ldw-text)/85 hover:border-(--ldw-torch) hover:text-(--ldw-accent)"
              >
                {t}
              </Link>
            </span>
          ))}
        </p>

        {(prev || next) && (
          <nav aria-label="More in this category" className="grid grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/wiki/${prev.category}/${prev.slug}`}
                rel="prev"
                className="ldw-card group flex items-center gap-2 rounded-md border border-(--ldw-line) bg-(--ldw-panel) p-3"
              >
                <ChevronLeft aria-hidden="true" size={18} className="shrink-0 text-(--ldw-accent)" />
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-(--ldw-muted)">Previous</span>
                  <span className="ldw-display block truncate text-lg text-(--ldw-accent) group-hover:underline">
                    {prev.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/wiki/${next.category}/${next.slug}`}
                rel="next"
                className="ldw-card group flex items-center justify-end gap-2 rounded-md border border-(--ldw-line) bg-(--ldw-panel) p-3 text-right"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-(--ldw-muted)">Next</span>
                  <span className="ldw-display block truncate text-lg text-(--ldw-accent) group-hover:underline">
                    {next.name}
                  </span>
                </span>
                <ChevronRight aria-hidden="true" size={18} className="shrink-0 text-(--ldw-accent)" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </footer>
    </article>
  );
}
