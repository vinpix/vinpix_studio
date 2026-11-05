import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/lastdungeon/wiki/ArticleView";
import { LASTDUNGEON_ORIGIN } from "@/lib/lastdungeon";
import { plainText } from "@/features/lastdungeon/richText";
import {
  allArticles,
  getArticle,
  getCategory,
} from "@/features/lastdungeon/wikiStore";

export const dynamicParams = false;

export function generateStaticParams() {
  return allArticles.map((a) => ({ category: a.category, slug: a.slug }));
}

type Params = Promise<{ category: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  const title = `${article.name} - The Last Dungeon Wiki`;
  const description = plainText(article.summary);
  const path = `/wiki/${article.category}/${article.slug}`;
  const img = article.image;
  const images = img
    ? [{ url: img.src, alt: img.alt, width: img.width, height: img.height }]
    : [{ url: "/ld/og.png", width: 1200, height: 630, alt: "The Last Dungeon" }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "The Last Dungeon",
      title,
      description,
      url: path,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  const cat = getCategory(category);
  if (!article || !cat) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "The Last Dungeon Wiki", item: `${LASTDUNGEON_ORIGIN}/wiki` },
      { "@type": "ListItem", position: 2, name: cat.title, item: `${LASTDUNGEON_ORIGIN}/wiki/${cat.id}` },
      { "@type": "ListItem", position: 3, name: article.name, item: `${LASTDUNGEON_ORIGIN}/wiki/${cat.id}/${article.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so article text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ArticleView article={article} category={cat} />
    </>
  );
}
