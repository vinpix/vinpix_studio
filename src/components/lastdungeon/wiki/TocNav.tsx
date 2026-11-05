"use client";

import { useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
  /** Nested sub-section links. */
  children?: { id: string; label: string }[];
}

/**
 * Article table of contents with a scroll-spy highlight. The static HTML is a
 * plain anchor list (works without JS); after hydration an IntersectionObserver
 * marks the section currently under the sticky header.
 */
export function TocNav({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = useRef(new Set<string>());

  useEffect(() => {
    const ids: string[] = [];
    for (const i of items) {
      ids.push(i.id);
      for (const c of i.children ?? []) ids.push(c.id);
    }
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const pick = () => {
      // Topmost heading currently inside the observation band.
      for (const el of els) {
        if (visible.current.has(el.id)) {
          setActive(el.id);
          return;
        }
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.current.add(e.target.id);
          else visible.current.delete(e.target.id);
        }
        pick();
      },
      // Band: below the 56px header down to ~35% of the viewport.
      { rootMargin: "-72px 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const link = (id: string, label: string) => (
    <a
      href={`#${id}`}
      onClick={(e) => go(e, id)}
      aria-current={active === id ? "true" : undefined}
    >
      {label}
    </a>
  );

  return (
    <ol className="ldw-toc list-decimal space-y-1 px-4 pb-3 pl-9 text-sm marker:text-(--ldw-muted)">
      {items.map((n) => (
        <li key={n.id}>
          {link(n.id, n.label)}
          {n.children && n.children.length > 0 && (
            <ol className="mt-1 list-decimal space-y-1 pl-5 marker:text-(--ldw-muted)">
              {n.children.map((c) => (
                <li key={c.id}>{link(c.id, c.label)}</li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}
