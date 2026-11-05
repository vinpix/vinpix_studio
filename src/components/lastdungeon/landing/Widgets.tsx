"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Play } from "lucide-react";
import { LASTDUNGEON_STORE } from "@/lib/lastdungeon";
import { Sprite, LD_ASSETS } from "./Sprite";
import { SPR, type SpriteName } from "./sprites";

/* ------------------------------------------------------------------ */
/* Counter: counts up when scrolled into view (final value in the SSR  */
/* markup, so it also reads right without JS / with reduced motion).   */
/* ------------------------------------------------------------------ */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = `0${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1200);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = `${Math.round(to * eased)}${suffix}`;
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, suffix]);
  return <span ref={ref}>{`${to}${suffix}`}</span>;
}

/* ------------------------------------------------------------------ */
/* Trailer: lazy YouTube facade, the iframe only loads on click.       */
/* ------------------------------------------------------------------ */
export function Trailer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="ld-window">
      <div className="ld-window-in">
        {playing ? (
          <iframe
            className="ld-trailer-frame"
            src={`https://www.youtube-nocookie.com/embed/${LASTDUNGEON_STORE.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title="The Last Dungeon trailer"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="ld-trailer-btn"
            onClick={() => setPlaying(true)}
            aria-label="Play the trailer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${LD_ASSETS}/shots/poster.webp`}
              alt="Gameplay: the Vegeful boss fight on floor 12 of The Last Dungeon"
              width={1200}
              height={540}
              className="ld-trailer-poster"
              decoding="async"
            />
            <span className="ld-play" aria-hidden>
              <Play size={30} fill="currentColor" />
            </span>
            <span className="ld-trailer-tag" aria-hidden>
              Watch the trailer
            </span>
          </button>
        )}
      </div>
      <span aria-hidden className="ld-rivet ld-rivet-a" />
      <span aria-hidden className="ld-rivet ld-rivet-b" />
      <span aria-hidden className="ld-rivet ld-rivet-c" />
      <span aria-hidden className="ld-rivet ld-rivet-d" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buff cards: face down, flip over when scrolled to, click to flip.   */
/* ------------------------------------------------------------------ */
interface Card {
  name: string;
  kind: string;
  icon: SpriteName;
  text: string;
}
const CARDS: Card[] = [
  { name: "Multishot", kind: "Gun card", icon: "ic-multishot", text: "More bullets with every shot." },
  { name: "Piercing", kind: "Gun card", icon: "ic-pierce", text: "Shots punch through enemies." },
  { name: "Thundering", kind: "Sword card", icon: "ic-thunder", text: "Lightning rides your blade." },
  { name: "Leeching", kind: "Sword card", icon: "ic-leech", text: "Heal by hurting monsters." },
];

export function BuffCards() {
  const [open, setOpen] = useState<boolean[]>([false, false, false, false]);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        CARDS.forEach((_, i) =>
          window.setTimeout(
            () => setOpen((o) => o.map((v, j) => (j === i ? true : v))),
            450 + i * 260,
          ),
        );
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="ld-cards">
      {CARDS.map((c, i) => (
        <button
          key={c.name}
          type="button"
          className="ld-card"
          data-open={open[i] ? "1" : "0"}
          aria-pressed={open[i]}
          aria-label={`${c.name}, ${c.kind}. ${c.text}`}
          onClick={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))}
          style={{ "--i": i } as CSSProperties}
        >
          <span className="ld-card-inner">
            <span className="ld-card-face ld-card-back" aria-hidden>
              <span className="ld-card-sigil">?</span>
            </span>
            <span className="ld-card-face ld-card-front">
              <span className="ld-card-kind">{c.kind}</span>
              <span className="ld-card-icon">
                <Sprite name={c.icon} scale={Math.max(2, Math.floor(56 / Math.max(SPR[c.icon].w, SPR[c.icon].h)))} />
              </span>
              <span className="ld-card-name">{c.name}</span>
              <span className="ld-card-text">{c.text}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Loot chest: click to open, loot spills out in an arc.               */
/* ------------------------------------------------------------------ */
const LOOT: { name: SpriteName; scale: number; dx: number; dy: number; r: number }[] = [
  { name: "wp-coin", scale: 1, dx: -120, dy: -70, r: -20 },
  { name: "wp-shotgun", scale: 2, dx: -62, dy: -118, r: 14 },
  { name: "wp-coin", scale: 1, dx: -8, dy: -140, r: 8 },
  { name: "wp-key", scale: 1, dx: 52, dy: -122, r: -12 },
  { name: "wp-shuriken", scale: 2, dx: 108, dy: -78, r: 25 },
  { name: "wp-coin", scale: 1, dx: 140, dy: -20, r: 0 },
];

export function LootChest() {
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(0);
  const royal = opens % 2 === 1;
  const sheet = royal ? "chest-royal" : "chest-gold";
  const d = SPR[sheet];
  const s = 8;
  return (
    <div className="ld-chest-wrap">
      <button
        type="button"
        className="ld-chest"
        data-open={open ? "1" : "0"}
        aria-pressed={open}
        aria-label={open ? "Close the chest" : "Open the chest"}
        onClick={() => {
          setOpen((o) => {
            if (!o) setOpens((n) => n + 1);
            return !o;
          });
        }}
      >
        <span className="ld-chest-glow" aria-hidden />
        <span className="ld-loot" aria-hidden>
          {LOOT.map((l, i) => (
            <span
              key={i}
              className="ld-loot-item"
              style={{ "--dx": `${l.dx}px`, "--dy": `${l.dy}px`, "--r": `${l.r}deg`, "--i": i } as CSSProperties}
            >
              <Sprite name={l.name} scale={l.scale} />
            </span>
          ))}
        </span>
        <span
          className="ld-chest-spr"
          aria-hidden
          style={{
            width: d.w * s,
            height: d.h * s,
            backgroundImage: `url(${LD_ASSETS}/sprites/${sheet}.png)`,
            backgroundSize: `${d.n * d.w * s}px ${d.h * s}px`,
            "--cw": `${d.w * s}px`,
          } as CSSProperties}
        />
      </button>
      <p className="ld-hint" aria-live="polite">
        {open ? "Loot! Tap to close it again." : "Tap the chest."}
      </p>
    </div>
  );
}
