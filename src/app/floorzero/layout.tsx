import type { Metadata, Viewport } from "next";
import { Silkscreen, VT323 } from "next/font/google";
import { FLOORZERO_ORIGIN } from "@/lib/floorzero";

/**
 * Floor Zero microsite shell (served at floorzero.vinpixstudio.com/*).
 * Nested under the studio root layout, so it hides the studio chrome
 * (header, splash cursor) with CSS on first paint and paints its own
 * full-page background. Landing (`page.tsx`) and wiki (`wiki/`) style
 * themselves inside this shell.
 */
const pixel = Silkscreen({
  variable: "--font-fz-pixel",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const terminal = VT323({
  variable: "--font-fz-terminal",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(FLOORZERO_ORIGIN),
  title: {
    default: "Floor Zero — Pixel Backrooms Roguelite",
    template: "%s | Floor Zero",
  },
  description:
    "Floor Zero is a co-op pixel-art roguelite set in the Backrooms by Vinpix Studio. Fight through procedurally generated, fully destructible floors.",
  applicationName: "Floor Zero",
  icons: { icon: "/fz/icon.png", apple: "/fz/icon.png" },
  openGraph: {
    type: "website",
    siteName: "Floor Zero",
    locale: "en_US",
    url: "/",
    images: [{ url: "/fz/og.png", width: 1200, height: 630, alt: "Floor Zero" }],
  },
  twitter: { card: "summary_large_image", images: ["/fz/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0e0d08",
};

export default function FloorZeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide studio chrome before hydration; the components also unmount
          themselves via useIsFloorZeroSite once on the client. */}
      <style>{`[data-studio-chrome]{display:none!important}body{background:#0e0d08}`}</style>
      <div
        className={`${pixel.variable} ${terminal.variable} relative z-10 min-h-screen bg-[#0e0d08] text-[#efe6c4]`}
      >
        {children}
      </div>
    </>
  );
}
