import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { LASTDUNGEON_STORE } from "@/lib/lastdungeon";
import { Embers } from "./LandingFX";
import { Sprite, LD_ASSETS } from "./Sprite";
import { Trailer } from "./Widgets";
import type { CSSProperties } from "react";

const NAV = [
  { href: "#heroes", label: "Heroes" },
  { href: "#pets", label: "Pets" },
  { href: "#arsenal", label: "Arsenal" },
  { href: "#bosses", label: "Bosses" },
  { href: "#coop", label: "Co-op" },
  { href: "#hub", label: "Hub" },
];

export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`ld-stores ${className}`}>
      <a
        className="ld-btn"
        href={LASTDUNGEON_STORE.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Smartphone aria-hidden size={22} />
        <span>
          <small>Get it on</small>
          Google Play
        </span>
      </a>
      <a
        className="ld-btn ld-btn-alt"
        href={LASTDUNGEON_STORE.appStore}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Smartphone aria-hidden size={22} />
        <span>
          <small>Download on the</small>
          App Store
        </span>
      </a>
    </div>
  );
}

export function Torch({ side }: { side: "l" | "r" }) {
  return (
    <div aria-hidden className={`ld-torch ld-torch-${side}`}>
      <span className="ld-torch-glow" />
      <Sprite name="torch" scale={7} fps={7} />
    </div>
  );
}

export function TopBar() {
  return (
    <nav aria-label="The Last Dungeon" className="ld-nav">
      <Link href="/" className="ld-nav-brand">
        <Image
          src={`${LD_ASSETS}/logo.png`}
          alt=""
          width={36}
          height={36}
          unoptimized
          className="ld-px"
        />
        <span>The Last Dungeon</span>
      </Link>
      <ul className="ld-nav-links">
        {NAV.map((n) => (
          <li key={n.href}>
            <a href={n.href}>{n.label}</a>
          </li>
        ))}
      </ul>
      <Link href="/wiki" className="ld-btn ld-btn-sm">
        Wiki
      </Link>
    </nav>
  );
}

const LINEUP = [
  "hero-archer-idle",
  "hero-knight-idle",
  "hero-wizard-idle",
  "hero-fireman-idle",
  "hero-healman-idle",
  "hero-plague-idle",
] as const;

export function Hero() {
  return (
    <header className="ld-hero ld-sec">
      <div className="ld-hero-bg" aria-hidden>
        <div className="ld-layer ld-layer-wall" />
        <div className="ld-layer ld-layer-fog" />
        <div className="ld-glow-pool" />
      </div>
      <Torch side="l" />
      <Torch side="r" />
      <Embers />
      <TopBar />

      <div className="ld-hero-main">
        <div className="ld-hero-copy">
          <div className="ld-brandrow ld-rise" style={{ "--d": "1.3s" } as CSSProperties}>
            <Image
              src={`${LD_ASSETS}/logo.png`}
              alt="The Last Dungeon icon"
              width={96}
              height={96}
              unoptimized
              priority
              className="ld-emblem ld-px"
            />
            <p className="ld-chip">Pixel roguelike dungeon shooter</p>
          </div>
          <h1 className="ld-title" aria-label="The Last Dungeon">
            <span className="ld-title-small ld-rise" aria-hidden style={{ "--d": "1.4s" } as CSSProperties}>
              The Last
            </span>
            <span className="ld-title-big" aria-hidden>
              {"DUNGEON".split("").map((c, i) => (
                <span key={i} className="ld-drop" style={{ "--i": i } as CSSProperties}>
                  {c}
                </span>
              ))}
            </span>
          </h1>
          <p className="ld-lede ld-rise" style={{ "--d": "2s" } as CSSProperties}>
            Pick a hero, grab a pet and fight down through floors of monsters
            and bosses. Loot, craft and level up on the way, solo or with
            friends.
          </p>
          <div className="ld-rise" style={{ "--d": "2.15s" } as CSSProperties}>
            <StoreButtons />
            <p className="ld-subnote">
              On Android and iOS.{" "}
              <Link href="/wiki" className="ld-inline-link">
                Read the wiki <ArrowRight aria-hidden size={14} />
              </Link>
            </p>
          </div>
        </div>
        <div className="ld-hero-trailer ld-rise" style={{ "--d": "1.8s" } as CSSProperties}>
          <Trailer />
        </div>
      </div>

      <div className="ld-lineup" aria-hidden>
        {LINEUP.map((n, i) => (
          <span key={n} className="ld-lineup-i" style={{ "--i": i } as CSSProperties}>
            <Sprite name={n} scale={5} fps={5 + (i % 3)} />
          </span>
        ))}
      </div>
      <div className="ld-floor" aria-hidden />

      <div className="ld-gate" aria-hidden>
        <div className="ld-door ld-door-l">
          <i className="ld-ring" />
        </div>
        <div className="ld-door ld-door-r">
          <i className="ld-ring" />
        </div>
        <span className="ld-gate-light" />
      </div>
    </header>
  );
}
