import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Plain legal-document shell for lastdungeon.vinpixstudio.com (privacy policy,
 * account deletion). Server component, no client JS. Colours follow the
 * microsite palette (dungeon stone / torch / parchment).
 */
const css = `
.ld-legal{min-height:100vh;background:#0c0a0f;color:#efe3c8;font-family:var(--font-ld-body),system-ui,sans-serif;line-height:1.6}
.ld-legal-wrap{max-width:820px;margin:0 auto;padding:40px 20px 80px}
.ld-legal a{color:#ffd36b}
.ld-legal-back{display:inline-block;margin-bottom:24px;font-size:14px}
.ld-legal h1{font-family:var(--font-ld-display),system-ui,sans-serif;font-weight:400;font-size:42px;color:#f59e2b;margin:0 0 4px;letter-spacing:.02em}
.ld-legal h2{font-size:20px;color:#ffd36b;margin:34px 0 8px}
.ld-legal .ld-legal-meta{color:#b7a98a;font-size:14px;margin:0 0 24px}
.ld-legal p,.ld-legal li{font-size:16px}
.ld-legal ul{padding-left:22px}
.ld-legal table{border-collapse:collapse;width:100%;margin:12px 0;font-size:15px}
.ld-legal th,.ld-legal td{border:1px solid #3a3144;padding:8px 10px;text-align:left;vertical-align:top}
.ld-legal th{background:#181320;color:#ffd36b}
.ld-legal-note{border:1px solid #f59e2b;background:#1a1410;padding:12px 14px;margin:16px 0}
`;

export function LegalPage({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <main className="ld-legal">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ld-legal-wrap">
        <Link className="ld-legal-back" href="/">
          &larr; The Last Dungeon
        </Link>
        <h1>{title}</h1>
        <p className="ld-legal-meta">{meta}</p>
        {children}
      </div>
    </main>
  );
}
