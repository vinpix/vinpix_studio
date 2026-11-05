"use client";

import { Flame, Gamepad2, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CategoryIcon } from "./CategoryIcon";
import { WikiSearch } from "./WikiSearch";

export interface NavCategory {
  id: string;
  title: string;
  icon: string;
  count: number;
}

/** Game icon with a flame fallback while /ld/icon.png is missing. */
function Logo() {
  const [broken, setBroken] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // onError can fire before hydration; catch an already-failed load too.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setBroken(true);
  }, []);
  if (broken) {
    return (
      <Flame
        aria-hidden="true"
        size={24}
        className="ldw-flame text-(--ldw-torch)"
      />
    );
  }
  return (
    <Image
      ref={img}
      src="/ld/icon.png"
      alt=""
      width={28}
      height={28}
      unoptimized
      onError={() => setBroken(true)}
      className="size-7 rounded-[3px]"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

function NavList({
  categories,
  total,
  pathname,
}: {
  categories: NavCategory[];
  total: number;
  pathname: string;
}) {
  const item = (active: boolean) =>
    `flex items-center gap-2.5 rounded border-l-2 px-2.5 py-2 text-sm transition-colors ${
      active
        ? "border-(--ldw-torch) bg-(--ldw-panel2) text-(--ldw-accent)"
        : "border-transparent text-(--ldw-text)/85 hover:bg-(--ldw-panel) hover:text-(--ldw-accent)"
    }`;
  return (
    <nav aria-label="Wiki categories" className="flex flex-col gap-1 p-3">
      <Link
        href="/wiki"
        aria-current={pathname === "/wiki" ? "page" : undefined}
        className={item(pathname === "/wiki")}
      >
        <CategoryIcon name="BookOpen" />
        <span className="flex-1">Wiki home</span>
        <span className="ldw-label text-xs text-(--ldw-muted)">{total}</span>
      </Link>
      <p className="ldw-label mt-3 px-2.5 text-[11px] uppercase tracking-widest text-(--ldw-accent-dim)">
        Categories
      </p>
      <ul className="flex flex-col gap-0.5">
        {categories.map((c) => {
          const href = `/wiki/${c.id}`;
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={c.id}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={item(active)}
              >
                <CategoryIcon name={c.icon} />
                <span className="flex-1">{c.title}</span>
                <span className="ldw-label text-xs text-(--ldw-muted)">
                  {c.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/"
        className="mt-4 flex items-center gap-2.5 rounded border border-(--ldw-line) px-2.5 py-2 text-sm text-(--ldw-text)/85 transition-colors hover:border-(--ldw-torch) hover:text-(--ldw-accent)"
      >
        <Gamepad2 aria-hidden="true" size={18} />
        The Last Dungeon game page
      </Link>
    </nav>
  );
}

export function WikiShell({
  categories,
  total,
  children,
}: {
  categories: NavCategory[];
  total: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Close the drawer after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Drawer: scroll lock, focus in, Escape, Tab trap, focus restore.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const btn = menuBtn.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>(
        "a[href],button:not([disabled])"
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <div className="ldw min-h-screen">
      <a
        href="#wiki-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-(--ldw-torch) focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <header className="ldw-header sticky top-0 z-40 border-b border-(--ldw-line) bg-(--ldw-bg)/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2 md:h-14 md:flex-nowrap md:px-5 md:py-0">
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open wiki menu"
            aria-expanded={open}
            aria-controls="wiki-drawer"
            className="-ml-1 rounded p-2 text-(--ldw-accent) hover:bg-(--ldw-panel) lg:hidden"
          >
            <Menu aria-hidden="true" size={22} />
          </button>
          <Link
            href="/"
            aria-label="The Last Dungeon home"
            className="relative flex shrink-0 items-center gap-2 text-(--ldw-accent)"
          >
            <span aria-hidden="true" className="ldw-torch" />
            <span className="relative flex size-7 items-center justify-center">
              <Logo />
            </span>
            <span className="ldw-display relative text-xl leading-none sm:text-2xl">
              THE LAST DUNGEON
            </span>
          </Link>
          <Link
            href="/wiki"
            className="ldw-label shrink-0 rounded-sm bg-(--ldw-torch) px-1.5 py-0.5 text-[11px] font-semibold leading-none text-black transition-colors hover:bg-(--ldw-accent) sm:text-xs"
          >
            WIKI
          </Link>
          <div className="order-last basis-full md:order-none md:ml-auto md:max-w-md md:flex-1 md:basis-auto">
            <WikiSearch shortcut />
          </div>
          <Link
            href="/"
            className="ml-auto hidden shrink-0 items-center gap-1.5 rounded border border-(--ldw-line) px-2.5 py-1.5 text-xs text-(--ldw-text)/90 transition-colors hover:border-(--ldw-torch) hover:text-(--ldw-accent) md:ml-0 md:text-sm sm:flex"
          >
            <Gamepad2 aria-hidden="true" size={16} />
            <span>Game page</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-(--ldw-line) lg:block">
          <NavList categories={categories} total={total} pathname={pathname} />
        </aside>
        <main
          id="wiki-main"
          tabIndex={-1}
          className="min-w-0 flex-1 px-4 py-6 outline-none md:px-8 md:py-8"
        >
          {children}
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" id="wiki-drawer">
          <div
            className="ldw-fade absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Wiki menu"
            className="ldw-slide-in absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-(--ldw-accent-dim) bg-(--ldw-bg)"
          >
            <div className="flex items-center justify-between border-b border-(--ldw-line) px-4 py-3">
              <span className="ldw-display text-xl text-(--ldw-accent)">MENU</span>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded p-2 text-(--ldw-accent) hover:bg-(--ldw-panel)"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <NavList categories={categories} total={total} pathname={pathname} />
          </div>
        </div>
      )}
    </div>
  );
}
