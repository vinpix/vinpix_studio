import type { Metadata } from "next";
import { categories, articlesByCategory } from "@/features/lastdungeon/data";
import { LASTDUNGEON_ORIGIN, LASTDUNGEON_STORE } from "@/lib/lastdungeon";
import "@/components/lastdungeon/landing/landing.css";
import { Hero } from "@/components/lastdungeon/landing/Hero";
import { LandingFX } from "@/components/lastdungeon/landing/LandingFX";
import {
  ArenaBand,
  LoopSection,
  HeroesSection,
  PetsSection,
  ArsenalSection,
  BossSection,
  CoopSection,
  HubSection,
  WikiSection,
  Cta,
  LandingFooter,
  type WikiTile,
} from "@/components/lastdungeon/landing/Sections";

const TITLE = "The Last Dungeon: Pixel Roguelike Dungeon Shooter for Mobile";
const DESCRIPTION =
  "The Last Dungeon is a pixel-art roguelike dungeon shooter for mobile by Vinpix Studio. Pick one of six heroes, grab a pet, loot and craft weapons, and fight through biomes of monsters and bosses, solo or with friends. On Google Play and the App Store.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "The Last Dungeon",
    "pixel art roguelike",
    "dungeon shooter",
    "top-down shooter",
    "mobile game",
    "co-op",
    "Vinpix Studio",
  ],
  openGraph: {
    type: "website",
    siteName: "The Last Dungeon",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/ld/og.png",
        width: 1200,
        height: 630,
        alt: "The Last Dungeon: pixel roguelike dungeon shooter by Vinpix Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/ld/og.png"],
  },
};

export default function LastDungeonLanding() {
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
    name: "The Last Dungeon",
    url: LASTDUNGEON_ORIGIN,
    image: `${LASTDUNGEON_ORIGIN}/ld/og.png`,
    description: DESCRIPTION,
    genre: ["Roguelike", "Shooter", "Action"],
    gamePlatform: ["Android", "iOS"],
    applicationCategory: "Game",
    playMode: ["SinglePlayer", "MultiPlayer"],
    sameAs: [LASTDUNGEON_STORE.googlePlay, LASTDUNGEON_STORE.appStore],
    publisher: {
      "@type": "Organization",
      name: "Vinpix Studio",
      url: "https://vinpixstudio.com",
    },
  };

  return (
    <div className="ld-landing">
      <a href="#main" className="ld-skip">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <ArenaBand weaponCount={weaponCount} />
        <LoopSection />
        <HeroesSection />
        <PetsSection />
        <ArsenalSection weaponCount={weaponCount} />
        <BossSection />
        <CoopSection />
        <HubSection />
        <WikiSection tiles={tiles} total={total} />
        <Cta />
      </main>
      <LandingFooter />
      <LandingFX />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
