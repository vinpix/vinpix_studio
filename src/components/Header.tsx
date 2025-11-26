"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/#hero", label: "HOME" },
  { href: "/pitch", label: "PITCH" },
  { href: "/roadmap", label: "ROADMAP" },
  { href: "/#work", label: "WORK" },
  { href: "/#contact", label: "CONTACT" },
  { href: "/support", label: "SUPPORT" },
];

export default function Header() {
  const pathname = usePathname();

  // Hide header on tools pages or contract pages
  if (pathname?.startsWith("/tools") || pathname?.startsWith("/contract")) {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
      <div className="border-b border-white/20 backdrop-blur-sm bg-black/5">
        <nav className="flex h-16 items-center justify-between px-6 sm:px-12 max-w-[1920px] mx-auto">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter uppercase"
          >
            Vinpix Studio
          </Link>

          <ul className="hidden sm:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Icon Placeholder */}
          <button className="sm:hidden uppercase text-sm font-bold">
            Menu
          </button>
        </nav>
      </div>
    </header>
  );
}
