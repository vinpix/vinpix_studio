"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { searchIndex, type SearchEntry } from "@/features/floorzero/search";

const INDEX_URL = "/wiki/search-index";
let cache: SearchEntry[] | null = null;
let inflight: Promise<SearchEntry[]> | null = null;

function loadIndex(): Promise<SearchEntry[]> {
  if (cache) return Promise.resolve(cache);
  inflight ??= fetch(INDEX_URL)
    .then((r) => (r.ok ? r.json() : []))
    .then((j: SearchEntry[]) => (cache = j))
    .catch(() => {
      inflight = null;
      return [] as SearchEntry[];
    });
  return inflight;
}

export function WikiSearch({
  shortcut = false,
  size = "sm",
}: {
  /** Bind the "/" key to focus this box (only one instance per page). */
  shortcut?: boolean;
  size?: "sm" | "lg";
}) {
  const router = useRouter();
  const uid = useId();
  const listId = `${uid}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchEntry[]>(cache ?? []);
  const [loaded, setLoaded] = useState(cache !== null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchIndex(index, query), [index, query]);
  const showList = open && query.trim().length > 0;

  const prefetch = useCallback(() => {
    loadIndex().then((j) => {
      setIndex(j);
      setLoaded(true);
    });
  }, []);

  // "/" focuses the search (unless typing somewhere already).
  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT" ||
          t.isContentEditable)
      )
        return;
      e.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  // Close on outside click.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const go = (e: SearchEntry) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    router.push(`/wiki/${e.c}/${e.u}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) =>
        results.length ? (a - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter") {
      const hit = results[active] ?? results[0];
      if (showList && hit) {
        e.preventDefault();
        go(hit);
      }
    } else if (e.key === "Escape") {
      if (showList) setOpen(false);
      else inputRef.current?.blur();
    }
  };

  const big = size === "lg";
  return (
    <div ref={rootRef} className="relative w-full">
      <label htmlFor={`${uid}-input`} className="sr-only">
        Search the Floor Zero wiki
      </label>
      <Search
        aria-hidden="true"
        size={big ? 20 : 16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--fzw-accent-dim)"
      />
      <input
        id={`${uid}-input`}
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          showList && results.length ? `${uid}-opt-${active}` : undefined
        }
        autoComplete="off"
        spellCheck={false}
        placeholder="Search the wiki..."
        value={query}
        onFocus={() => {
          prefetch();
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
          prefetch();
        }}
        onKeyDown={onKeyDown}
        className={`w-full rounded-md border border-(--fzw-line) bg-(--fzw-panel) pl-9 pr-9 text-(--fzw-text) placeholder:text-(--fzw-muted) focus:border-(--fzw-accent) ${
          big ? "py-3 text-base" : "py-1.5 text-sm"
        } [&::-webkit-search-cancel-button]:hidden`}
      />
      {shortcut && !query && (
        <kbd
          aria-hidden="true"
          className="fzw-term pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-(--fzw-line) px-1.5 text-sm leading-5 text-(--fzw-muted) md:block"
        >
          /
        </kbd>
      )}
      <p className="sr-only" aria-live="polite">
        {showList
          ? `${results.length} result${results.length === 1 ? "" : "s"}`
          : ""}
      </p>
      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[70vh] overflow-y-auto rounded-md border border-(--fzw-accent-dim) bg-(--fzw-panel) shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
        >
          {results.length === 0 ? (
            <li
              role="presentation"
              className="px-3 py-3 text-sm text-(--fzw-muted)"
            >
              {loaded ? `No pages match "${query.trim()}".` : "Loading..."}
            </li>
          ) : (
            results.map((r, i) => (
              <li
                key={`${r.c}/${r.u}`}
                id={`${uid}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                className={i === active ? "bg-(--fzw-panel2)" : undefined}
              >
                <Link
                  href={`/wiki/${r.c}/${r.u}`}
                  tabIndex={-1}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                  className="block px-3 py-2"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="fzw-pixel truncate text-xs text-(--fzw-accent)">
                      {r.n}
                    </span>
                    <span className="shrink-0 text-[11px] uppercase tracking-wider text-(--fzw-muted)">
                      {r.ct}
                    </span>
                  </span>
                  <span className="mt-0.5 line-clamp-1 block text-xs text-(--fzw-text)/75">
                    {r.s ? `${r.s} — ${r.m}` : r.m}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
