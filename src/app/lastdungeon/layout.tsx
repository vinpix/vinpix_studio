import type { Metadata, Viewport } from "next";
import { Jersey_10, Pixelify_Sans } from "next/font/google";
import { LASTDUNGEON_ORIGIN } from "@/lib/lastdungeon";

/**
 * The Last Dungeon microsite shell (served at lastdungeon.vinpixstudio.com/*).
 * Nested under the studio root layout, so it hides the studio chrome
 * (header, splash cursor) with CSS on first paint and paints its own
 * full-page background. Landing (`page.tsx`) and wiki (`wiki/`) style
 * themselves inside this shell.
 *
 * Palette: dungeon stone #0c0a0f, torch #f59e2b, gold #ffd36b, parchment #efe3c8.
 */
const display = Jersey_10({
  variable: "--font-ld-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Pixelify_Sans({
  variable: "--font-ld-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(LASTDUNGEON_ORIGIN),
  title: {
    default: "The Last Dungeon — Pixel Roguelike Shooter",
    template: "%s | The Last Dungeon",
  },
  description:
    "The Last Dungeon is a pixel-art roguelike dungeon shooter by Vinpix Studio. Pick a hero, grab a pet, loot and craft weapons, and fight through biomes of monsters and bosses, solo or in co-op.",
  applicationName: "The Last Dungeon",
  icons: { icon: "/ld/icon.png", apple: "/ld/icon.png" },
  openGraph: {
    type: "website",
    siteName: "The Last Dungeon",
    locale: "en_US",
    url: "/",
    images: [{ url: "/ld/og.png", width: 1200, height: 630, alt: "The Last Dungeon" }],
  },
  twitter: { card: "summary_large_image", images: ["/ld/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0c0a0f",
};

export default function LastDungeonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide studio chrome before hydration; the components also unmount
          themselves via useIsGameMicrosite once on the client. */}
      <style>{`[data-studio-chrome]{display:none!important}body{background:#0c0a0f}`}</style>
      <div
        className={`${display.variable} ${body.variable} relative z-10 min-h-screen bg-[#0c0a0f] text-[#efe3c8]`}
      >
        {children}
      </div>
    </>
  );
}
