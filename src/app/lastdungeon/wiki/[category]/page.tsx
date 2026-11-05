import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CategoryBrowser,
  type BrowserItem,
} from "@/components/lastdungeon/wiki/CategoryBrowser";
import { CategoryIcon } from "@/components/lastdungeon/wiki/CategoryIcon";
import { RichText, plainText } from "@/features/lastdungeon/richText";
import {
  articlesByCategory,
  categories,
  getCategory,
} from "@/features/lastdungeon/wikiStore";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const title = `${cat.title} - The Last Dungeon Wiki`;
  return {
    title: { absolute: title },
    description: cat.description,
    alternates: { canonical: `/wiki/${cat.id}` },
    openGraph: {
      type: "website",
      siteName: "The Last Dungeon",
      title,
      description: cat.description,
      url: `/wiki/${cat.id}`,
      images: [{ url: "/ld/og.png", width: 1200, height: 630, alt: "The Last Dungeon" }],
    },
    twitter: { card: "summary_large_image", title, description: cat.description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const list = articlesByCategory[cat.id];

  const items: BrowserItem[] = list.map((a) => {
    const rows = a.infobox ?? [];
    return {
      slug: a.slug,
      name: a.name,
      subtitle: a.subtitle ? plainText(a.subtitle) : undefined,
      tags: a.tags ?? [],
      image: a.image,
      cells: cat.tableColumns.map((col) => {
        const row = rows.find((r) => r.label.toLowerCase() === col.toLowerCase());
        return row ? (
          <RichText key={col} text={row.value} />
        ) : (
          <span key={col} className="text-(--ldw-muted)">—</span>
        );
      }),
      hay: `${a.name} ${a.subtitle ?? ""} ${(a.tags ?? []).join(" ")}`.toLowerCase(),
    };
  });

  return (
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link href="/wiki" className="text-(--ldw-muted) hover:text-(--ldw-accent) hover:underline">
              Wiki
            </Link>
          </li>
          <li aria-hidden="true" className="text-(--ldw-line)">/</li>
          <li aria-current="page">{cat.title}</li>
        </ol>
      </nav>
      <header className="ldw-rise mb-6 flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded border border-(--ldw-accent-dim) bg-(--ldw-panel) text-(--ldw-torch) shadow-[0_0_16px_-4px_rgba(245,158,43,0.5)]">
          <CategoryIcon name={cat.icon} size={24} />
        </span>
        <div>
          <h1 className="ldw-display text-4xl leading-none text-(--ldw-accent) [text-shadow:0_0_18px_rgba(245,158,43,0.35)] sm:text-5xl">
            {cat.title}
          </h1>
          <p className="mt-1.5 max-w-2xl leading-relaxed text-(--ldw-text)/85">
            {cat.description}
          </p>
        </div>
      </header>
      <CategoryBrowser
        categoryId={cat.id}
        icon={cat.icon}
        columns={cat.tableColumns}
        items={items}
      />
    </div>
  );
}
