import Link from "next/link";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#website", label: "Website" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact Me" },
  { href: "/support", label: "Support" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <nav className="flex h-16 items-center justify-between backdrop-blur-md bg-background/60 border-b border-foreground/10 rounded-b-xl px-4">
          <Link href="/" className="font-semibold tracking-tight">
            VINPIX STUDIO
          </Link>
          <ul className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center px-3 py-2 text-sm sm:text-base text-foreground/90"
                >
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-foreground">
                    {item.label}
                  </span>
                  <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-foreground/5 blur-sm" />
                  <span className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-foreground/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
