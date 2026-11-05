import Link from "next/link";
import type { WikiArticle } from "@/features/floorzero/types";
import { plainText } from "@/features/floorzero/richText";
import { CategoryIcon } from "./CategoryIcon";
import { WikiImg } from "./WikiImg";

/** Server-rendered card used on the home page and in Related. */
export function ArticleCard({
  article,
  categoryTitle,
  categoryIcon,
  showSummary = false,
}: {
  article: WikiArticle;
  categoryTitle?: string;
  categoryIcon?: string;
  showSummary?: boolean;
}) {
  return (
    <Link
      href={`/wiki/${article.category}/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-(--fzw-line) bg-(--fzw-panel) transition-colors hover:border-(--fzw-accent)"
    >
      {article.image ? (
        <WikiImg
          image={article.image}
          ratio="4 / 3"
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
          className="border-b border-(--fzw-line)"
        />
      ) : (
        <div
          aria-hidden="true"
          className="fzw-checker flex items-center justify-center border-b border-(--fzw-line) text-(--fzw-accent-dim)"
          style={{ aspectRatio: "4 / 3" }}
        >
          <CategoryIcon name={categoryIcon ?? "BookOpen"} size={36} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1 p-3">
        {categoryTitle && (
          <span className="text-[11px] uppercase tracking-wider text-(--fzw-muted)">
            {categoryTitle}
          </span>
        )}
        <span className="fzw-pixel text-sm leading-snug text-(--fzw-accent) group-hover:underline">
          {article.name}
        </span>
        {article.subtitle && (
          <span className="text-xs text-(--fzw-muted)">
            {plainText(article.subtitle)}
          </span>
        )}
        {showSummary && (
          <span className="mt-1 line-clamp-3 text-xs leading-relaxed text-(--fzw-text)/80">
            {plainText(article.summary)}
          </span>
        )}
      </div>
    </Link>
  );
}
