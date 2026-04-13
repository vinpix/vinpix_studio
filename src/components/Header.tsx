"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "@/components/SmoothScroll";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();

  const isBusinessPage = pathname === "/for-business";
  
  const currentNavItems = isBusinessPage 
    ? [
        { href: "/", label: "HOME" },
        { href: "#problem", label: "WHY US" },
        { href: "#process", label: "PROCESS" },
        { href: "#contact", label: "CONTACT" },
      ]
    : [
        { href: "/#hero", label: "HOME" },
        { href: "/for-business", label: "FOR BUSINESS" },
        { href: "/#work", label: "WORK" },
        { href: "/#contact", label: "CONTACT" },
      ];

  // Handle Lenis pause when menu is open
  useEffect(() => {
    if (lenis) {
      if (isMenuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [isMenuOpen, lenis]);

  // Hide header on tools pages or contract pages
  if (pathname?.startsWith("/tools") || pathname?.startsWith("/contract")) {
    return null;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-black mix-blend-normal">
        <div className="border-b border-black/10 backdrop-blur-md bg-white/50">
          <nav className="flex h-16 items-center justify-between px-6 sm:px-12 max-w-[1920px] mx-auto">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter uppercase relative z-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Vinpix Studio
            </Link>

            <ul className="hidden sm:flex items-center gap-8">
              {currentNavItems.map((item) => (
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden relative z-50 p-2 -mr-2 hover:opacity-60 transition-opacity"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center items-center sm:hidden"
          >
            <nav className="flex flex-col items-center gap-8 p-6">
              {currentNavItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black tracking-tighter uppercase hover:text-white/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-sm font-mono uppercase tracking-widest opacity-40"
            >
              Vinpix Studio © {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
