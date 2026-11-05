import Link from "next/link";
import type { ReactNode } from "react";
import { getArticle } from "./wikiStore";

/**
 * Renders the wiki rich-text syntax (see types.ts):
 *   **bold**, *italic*, [[category/slug]], [[category/slug|label]]
 * Server-only (reads the article registry to label links). Unknown link
 * targets render as plain text instead of a broken link.
 */
const TOKEN =
  /\[\[([a-z]+)\/([a-z0-9-]+)(?:\|([^\]]+))?\]\]|\*\*(.+?)\*\*|\*(.+?)\*/g;

function parse(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyBase}-${i++}`;
    if (m[1]) {
      const article = getArticle(m[1], m[2]);
      const label = m[3] ?? article?.name ?? m[2].replace(/-/g, " ");
      out.push(
        article ? (
          <Link
            key={key}
            href={`/wiki/${m[1]}/${m[2]}`}
            className="text-(--ldw-accent) underline decoration-(--ldw-accent-dim) underline-offset-2 hover:decoration-(--ldw-accent)"
          >
            {label}
          </Link>
        ) : (
          <span key={key}>{label}</span>
        )
      );
    } else if (m[4] !== undefined) {
      out.push(
        <strong key={key} className="font-semibold text-[#fff6d0]">
          {parse(m[4], key)}
        </strong>
      );
    } else if (m[5] !== undefined) {
      out.push(<em key={key}>{parse(m[5], key)}</em>);
    }
    last = start + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function RichText({ text }: { text: string }) {
  return <>{parse(text, "r")}</>;
}

/** Strips the markup to plain text (meta descriptions, search index). */
export function plainText(text: string): string {
  return text
    .replace(/\[\[([a-z]+)\/([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_m, c, s, l) => {
      return l ?? getArticle(c, s)?.name ?? s.replace(/-/g, " ");
    })
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1");
}
