import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CategoryBrowser,
  type BrowserItem,
} from "@/components/floorzero/wiki/CategoryBrowser";
import { CategoryIcon } from "@/components/floorzero/wiki/CategoryIcon";
import { RichText, plainText } from "@/features/floorzero/richText";
import {
  articlesByCategory,
  categories,
  getCategory,
} from "@/features/floorzero/wikiStore";

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
  const title = `${cat.title} - Floor Zero Wiki`;
  return {
    title: { absolute: title },
    description: cat.description,
    alternates: { canonical: `/wiki/${cat.id}` },
    openGraph: {
      type: "website",
      siteName: "Floor Zero",
      title,
      description: cat.description,
      url: `/wiki/${cat.id}`,
      images: [{ url: "/fz/og.png", width: 1200, height: 630, alt: "Floor Zero" }],
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
          <span key={col} className="text-(--fzw-muted)">—</span>
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
            <Link href="/wiki" className="text-(--fzw-muted) hover:text-(--fzw-accent) hover:underline">
              Wiki
            </Link>
          </li>
          <li aria-hidden="true" className="text-(--fzw-line)">/</li>
          <li aria-current="page">{cat.title}</li>
        </ol>
      </nav>
      <header className="mb-6 flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded border border-(--fzw-accent-dim) bg-(--fzw-panel) text-(--fzw-accent)">
          <CategoryIcon name={cat.icon} size={24} />
        </span>
        <div>
          <h1 className="fzw-pixel text-2xl leading-tight text-(--fzw-accent) sm:text-3xl">
            {cat.title}
          </h1>
          <p className="mt-1.5 max-w-2xl leading-relaxed text-(--fzw-text)/85">
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
