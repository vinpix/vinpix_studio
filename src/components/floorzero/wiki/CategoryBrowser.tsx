"use client";

import { LayoutGrid, Search, Table2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { WikiImage } from "@/features/floorzero/types";
import { CategoryIcon } from "./CategoryIcon";
import { WikiImg } from "./WikiImg";

export interface BrowserItem {
  slug: string;
  name: string;
  subtitle?: string;
  tags: string[];
  image?: WikiImage;
  /** Pre-rendered (server) infobox values, one per table column. */
  cells: ReactNode[];
  /** Lowercased searchable text for the name filter. */
  hay: string;
}

type View = "grid" | "table";
const VIEW_KEY = "fz-wiki-view";

export function CategoryBrowser({
  categoryId,
  icon,
  columns,
  items,
}: {
  categoryId: string;
  icon: string;
  columns: string[];
  items: BrowserItem[];
}) {
  const [view, setView] = useState<View>("grid");
  const [tag, setTag] = useState<string | null>(null);
  const [text, setText] = useState("");

  // Restore view + ?tag= after mount (keeps the static HTML identical).
  useEffect(() => {
    try {
      const v = localStorage.getItem(VIEW_KEY);
      if (v === "grid" || v === "table") setView(v);
    } catch {}
    const t = new URLSearchParams(window.location.search).get("tag");
    if (t && items.some((i) => i.tags.includes(t))) setTag(t);
  }, [items]);

  const changeView = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {}
  };

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) for (const t of i.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [items]);

  const shown = useMemo(() => {
    const q = text.trim().toLowerCase();
    return items.filter(
      (i) => (!tag || i.tags.includes(tag)) && (!q || i.hay.includes(q))
    );
  }, [items, tag, text]);

  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-(--fzw-line) p-8 text-center text-(--fzw-muted)">
        <CategoryIcon name={icon} size={32} className="mx-auto mb-3 text-(--fzw-accent-dim)" />
        No articles here yet. Check back soon.
      </div>
    );
  }

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs transition-colors ${
      active
        ? "border-(--fzw-accent) bg-(--fzw-accent) text-black"
        : "border-(--fzw-line) bg-(--fzw-panel) text-(--fzw-text)/85 hover:border-(--fzw-accent)"
    }`;
  const toggle = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 text-xs ${
      active ? "bg-(--fzw-accent) text-black" : "text-(--fzw-text)/85 hover:bg-(--fzw-panel2)"
    }`;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-64">
          <label htmlFor="fzw-filter" className="sr-only">
            Filter this category by name
          </label>
          <Search
            aria-hidden="true"
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--fzw-accent-dim)"
          />
          <input
            id="fzw-filter"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Filter by name..."
            autoComplete="off"
            className="w-full rounded-md border border-(--fzw-line) bg-(--fzw-panel) py-1.5 pl-9 pr-3 text-sm text-(--fzw-text) placeholder:text-(--fzw-muted) focus:border-(--fzw-accent)"
          />
        </div>
        <div
          role="group"
          aria-label="View"
          className="flex w-fit overflow-hidden rounded-md border border-(--fzw-line)"
        >
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => changeView("grid")}
            className={toggle(view === "grid")}
          >
            <LayoutGrid aria-hidden="true" size={14} /> Cards
          </button>
          <button
            type="button"
            aria-pressed={view === "table"}
            onClick={() => changeView("table")}
            className={toggle(view === "table")}
          >
            <Table2 aria-hidden="true" size={14} /> Table
          </button>
        </div>
      </div>

      {tags.length > 0 && (
        <div role="group" aria-label="Filter by tag" className="mb-5 flex flex-wrap gap-2">
          <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)} className={chip(tag === null)}>
            All ({items.length})
          </button>
          {tags.map(([t, n]) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(tag === t ? null : t)}
              className={chip(tag === t)}
            >
              {t} ({n})
            </button>
          ))}
        </div>
      )}

      <p className="mb-3 text-xs text-(--fzw-muted)" aria-live="polite">
        Showing {shown.length} of {items.length}
      </p>

      {shown.length === 0 ? (
        <p className="rounded-md border border-dashed border-(--fzw-line) p-6 text-center text-sm text-(--fzw-muted)">
          Nothing matches those filters.
        </p>
      ) : view === "grid" ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {shown.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/wiki/${categoryId}/${i.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-(--fzw-line) bg-(--fzw-panel) transition-colors hover:border-(--fzw-accent)"
              >
                {i.image ? (
                  <WikiImg
                    image={i.image}
                    ratio="4 / 3"
                    sizes="(min-width: 1280px) 20vw, (min-width: 640px) 25vw, 50vw"
                    className="border-b border-(--fzw-line)"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="fzw-checker flex items-center justify-center border-b border-(--fzw-line) text-(--fzw-accent-dim)"
                    style={{ aspectRatio: "4 / 3" }}
                  >
                    <CategoryIcon name={icon} size={34} />
                  </div>
                )}
                <div className="flex flex-col gap-1 p-3">
                  <span className="fzw-pixel text-sm leading-snug text-(--fzw-accent) group-hover:underline">
                    {i.name}
                  </span>
                  {i.subtitle && (
                    <span className="text-xs text-(--fzw-muted)">{i.subtitle}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="region"
          aria-label="Articles table"
          tabIndex={0}
          className="overflow-x-auto rounded-md border border-(--fzw-line)"
        >
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-(--fzw-panel2)">
              <tr>
                <th scope="col" className="fzw-pixel px-3 py-2 text-xs text-(--fzw-accent)">
                  Name
                </th>
                {columns.length === 0 && (
                  <th scope="col" className="fzw-pixel px-3 py-2 text-xs text-(--fzw-accent)">
                    Type
                  </th>
                )}
                {columns.map((c) => (
                  <th key={c} scope="col" className="fzw-pixel px-3 py-2 text-xs text-(--fzw-accent)">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((i) => (
                <tr key={i.slug} className="border-t border-(--fzw-line) odd:bg-(--fzw-panel) hover:bg-(--fzw-panel2)">
                  <th scope="row" className="px-3 py-2 font-normal">
                    <Link
                      href={`/wiki/${categoryId}/${i.slug}`}
                      className="flex items-center gap-2 text-(--fzw-accent) hover:underline"
                    >
                      {i.image && (
                        <span className="block w-8 shrink-0">
                          <WikiImg image={i.image} ratio="1 / 1" sizes="32px" checker={false} />
                        </span>
                      )}
                      <span>{i.name}</span>
                    </Link>
                  </th>
                  {columns.length === 0 && (
                    <td className="px-3 py-2 text-(--fzw-text)/85">{i.subtitle ?? "—"}</td>
                  )}
                  {i.cells.map((cell, k) => (
                    <td key={k} className="px-3 py-2 text-(--fzw-text)/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
