import type { Metadata } from "next";
import { categories, articlesByCategory } from "@/features/floorzero/data";
import { FLOORZERO_ORIGIN } from "@/lib/floorzero";
import "@/components/floorzero/landing/landing.css";
import { Hero } from "@/components/floorzero/landing/Hero";
import { WavesSection } from "@/components/floorzero/landing/WavesSection";
import {
  WorldSection,
  ArsenalSection,
  AnomaliesSection,
} from "@/components/floorzero/landing/WorldSections";
import {
  SurvivorsSection,
  CoopSection,
  WikiSection,
  LandingFooter,
  type WikiTile,
} from "@/components/floorzero/landing/PeopleSections";

const TITLE = "Floor Zero — Pixel Backrooms Roguelite for Mobile";
const DESCRIPTION =
  "Floor Zero is a 2D pixel-art platformer roguelite set in the Backrooms. Survive waves and bosses on procedurally generated, fully destructible floors, solo or in 2–4 player co-op. Coming soon to Google Play & the App Store.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "Floor Zero",
    "Backrooms game",
    "pixel art roguelite",
    "platformer",
    "co-op",
    "mobile game",
    "Vinpix Studio",
  ],
  openGraph: {
    type: "website",
    siteName: "Floor Zero",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/fz/og.png",
        width: 1200,
        height: 630,
        alt: "Floor Zero — pixel Backrooms roguelite by Vinpix Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/fz/og.png"],
  },
};

export default function FloorZeroLanding() {
  const tiles: WikiTile[] = categories.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    icon: c.icon,
    count: articlesByCategory[c.id]?.length ?? 0,
  }));
  const total = tiles.reduce((n, t) => n + t.count, 0);
  const weaponCount = tiles.find((t) => t.id === "weapons")?.count ?? 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Floor Zero",
    url: FLOORZERO_ORIGIN,
    image: `${FLOORZERO_ORIGIN}/fz/og.png`,
    description: DESCRIPTION,
    genre: ["Roguelite", "Platformer", "Action"],
    gamePlatform: ["Android"],
    applicationCategory: "Game",
    playMode: ["SinglePlayer", "MultiPlayer"],
    numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4 },
    publisher: {
      "@type": "Organization",
      name: "Vinpix Studio",
      url: "https://vinpixstudio.com",
    },
  };

  return (
    <div className="fz-landing">
      <a
        href="#main"
        className="fz-pixel sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:px-4 focus:py-3 focus:text-xs"
        style={{ background: "var(--fz-yellow)", color: "#1a1606" }}
      >
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <WavesSection />
        <WorldSection />
        <ArsenalSection weaponCount={weaponCount} />
        <AnomaliesSection />
        <SurvivorsSection />
        <CoopSection />
        <WikiSection tiles={tiles} total={total} />
      </main>
      <LandingFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
