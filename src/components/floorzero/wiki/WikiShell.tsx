"use client";

import { Gamepad2, Menu, X } from "lucide-react";
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
    `flex items-center gap-2.5 rounded px-2.5 py-2 text-sm transition-colors ${
      active
        ? "bg-(--fzw-panel2) text-(--fzw-accent)"
        : "text-(--fzw-text)/85 hover:bg-(--fzw-panel) hover:text-(--fzw-accent)"
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
        <span className="fzw-term text-base text-(--fzw-muted)">{total}</span>
      </Link>
      <p className="fzw-pixel mt-3 px-2.5 text-[10px] uppercase tracking-widest text-(--fzw-accent-dim)">
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
                <span className="fzw-term text-base text-(--fzw-muted)">
                  {c.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/"
        className="mt-4 flex items-center gap-2.5 rounded border border-(--fzw-line) px-2.5 py-2 text-sm text-(--fzw-text)/85 hover:border-(--fzw-accent) hover:text-(--fzw-accent)"
      >
        <Gamepad2 aria-hidden="true" size={18} />
        Floor Zero game page
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
    <div className="fzw min-h-screen">
      <a
        href="#wiki-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-(--fzw-accent) focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-(--fzw-line) bg-(--fzw-bg)/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2 md:px-5">
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open wiki menu"
            aria-expanded={open}
            aria-controls="wiki-drawer"
            className="-ml-1 rounded p-2 text-(--fzw-accent) hover:bg-(--fzw-panel) lg:hidden"
          >
            <Menu aria-hidden="true" size={22} />
          </button>
          <Link
            href="/wiki"
            className="fzw-pixel flex items-baseline gap-2 text-sm leading-none text-(--fzw-accent) sm:text-base"
          >
            <span>FLOOR ZERO</span>
            <span className="rounded-sm bg-(--fzw-accent) px-1.5 py-0.5 text-[10px] text-black sm:text-xs">
              WIKI
            </span>
          </Link>
          <div className="order-last basis-full md:order-none md:ml-auto md:max-w-md md:flex-1 md:basis-auto">
            <WikiSearch shortcut />
          </div>
          <Link
            href="/"
            className="ml-auto flex items-center gap-1.5 rounded border border-(--fzw-line) px-2.5 py-1.5 text-xs text-(--fzw-text)/90 hover:border-(--fzw-accent) hover:text-(--fzw-accent) md:ml-0 md:text-sm"
          >
            <Gamepad2 aria-hidden="true" size={16} />
            <span className="hidden sm:inline">Game page</span>
            <span className="sm:hidden">Game</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-[53px] hidden h-[calc(100vh-53px)] w-64 shrink-0 overflow-y-auto border-r border-(--fzw-line) lg:block">
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
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Wiki menu"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-(--fzw-accent-dim) bg-(--fzw-bg)"
          >
            <div className="flex items-center justify-between border-b border-(--fzw-line) px-4 py-3">
              <span className="fzw-pixel text-sm text-(--fzw-accent)">MENU</span>
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded p-2 text-(--fzw-accent) hover:bg-(--fzw-panel)"
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
