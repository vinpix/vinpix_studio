import Link from "next/link";
import {
  company,
  formatAddressLines,
  hasValue,
} from "@/lib/company";

type FooterProps = {
  className?: string;
};

/**
 * Shared public-site footer: dark legal/identity block.
 * Works on light (hiring) and dark (homepage contact) pages.
 * Optional legal fields render only when set in company constants.
 */
export default function Footer({ className = "" }: FooterProps) {
  // Server Component + static pages: year is fixed at build/redeploy time.
  // Prefer a redeploy near New Year over making this a client component.
  const year = new Date().getFullYear();
  const email = company.contact.email;
  const phone = company.contact.phone;
  const addressLines = formatAddressLines();

  return (
    <footer
      className={[
        "bg-black text-white border-t-2 border-white/20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="contentinfo"
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block text-xl sm:text-2xl font-black tracking-tighter uppercase hover:opacity-80 transition-opacity"
            >
              {company.brandName}
            </Link>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
              {company.tagline}
            </p>
          </div>

          {/* Company info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
              Studio / Công ty
            </h3>
            <dl className="space-y-3 text-sm sm:text-base">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Thành lập / Founded
                </dt>
                <dd className="mt-1 font-medium text-white">
                  {company.foundedYear}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  Địa chỉ / Address
                </dt>
                <dd className="mt-1 font-medium text-white">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              {hasValue(company.legalName) ? (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                    Tên pháp lý / Legal name
                  </dt>
                  <dd className="mt-1 font-medium text-white">
                    {company.legalName}
                  </dd>
                </div>
              ) : null}
              {hasValue(company.taxId) ? (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                    MST / Tax ID
                  </dt>
                  <dd className="mt-1 font-medium text-white font-mono tracking-wide">
                    {company.taxId}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
              Liên hệ / Contact
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors"
                >
                  {email}
                </a>
              </li>
              {hasValue(phone) ? (
                <li>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-1">
                    Điện thoại / Phone
                  </span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ) : null}
              <li>
                <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 mb-2">
                  Social
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {company.social.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
                    >
                      {item.label} ↗
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm font-medium text-white">
            © {year} {company.brandName}
          </p>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
            aria-label="Footer links"
          >
            <Link
              href="/support"
              className="text-white/90 hover:text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
            >
              Support
            </Link>
            <Link
              href="/hiring"
              className="text-white/90 hover:text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
            >
              Hiring
            </Link>
            <a
              href={company.urls.canonicalHost}
              className="font-mono text-xs uppercase tracking-[0.16em] text-white/80 hover:text-white transition-colors"
            >
              vinpixstudio.com
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
