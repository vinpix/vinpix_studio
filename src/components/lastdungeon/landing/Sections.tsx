import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Cog,
  Crosshair,
  Crown,
  Map as MapIcon,
  Package,
  PawPrint,
  Skull,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react";
import { LASTDUNGEON_STORE } from "@/lib/lastdungeon";
import { BossShowcase } from "./BossShowcase";
import { HeroPicker } from "./HeroPicker";
import { StoreButtons, Torch } from "./Hero";
import { LD_ASSETS, Sprite } from "./Sprite";
import type { SpriteName } from "./sprites";
import { BuffCards, Counter, LootChest } from "./Widgets";

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */
function Sec({
  id,
  labelledBy,
  tone = "a",
  children,
  className = "",
}: {
  id?: string;
  labelledBy: string;
  tone?: "a" | "b";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`ld-sec ld-section ld-tone-${tone} ${className}`}
    >
      <div className="ld-battle" aria-hidden />
      <div className="ld-wrap">{children}</div>
    </section>
  );
}

function Heading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="ld-heading" data-rv="up">
      <p className="ld-eyebrow">{eyebrow}</p>
      <h2 id={id} className="ld-h2">
        {title}
      </h2>
      {children ? <p className="ld-lead">{children}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Arena band: three heroes shooting monsters in CSS loops + counters  */
/* ------------------------------------------------------------------ */
function Lane({
  hero,
  mon,
  monScale,
  kind,
  dur,
  delay = "0s",
  flip,
}: {
  hero: SpriteName;
  mon: SpriteName;
  monScale: number;
  kind: "shot" | "fire" | "bolt";
  dur: string;
  delay?: string;
  flip?: boolean;
}) {
  return (
    <div className="ld-lane" style={v({ "--dur": dur, "--delay": delay })} aria-hidden>
      <div className="ld-lane-floor" />
      <div className="ld-lane-hero">
        <div className="ld-recoil">
          <Sprite name={hero} scale={4} fps={6} className={flip ? "ld-mirror" : ""} />
        </div>
      </div>
      <span className={`ld-bul ld-bul-${kind}`} />
      <div className="ld-mon">
        <Sprite name={mon} scale={monScale} fps={8} />
      </div>
      <span className="ld-puff" />
      <span className="ld-lane-coin">
        <Sprite name="wp-coin" scale={1} />
      </span>
    </div>
  );
}

export function ArenaBand({ weaponCount }: { weaponCount: number }) {
  const stats = [
    { n: 6, s: "", l: "Heroes" },
    { n: 11, s: "", l: "Hero skills" },
    { n: weaponCount > 0 ? weaponCount : 74, s: weaponCount > 0 ? "" : "+", l: "Weapons" },
    { n: 69, s: "", l: "Crafting recipes" },
  ];
  return (
    <Sec id="arena" labelledBy="arena-title" tone="b" className="ld-arena">
      <Heading id="arena-title" eyebrow="Top-down shooter" title={<>Shoot. Dodge. <em>Loot.</em></>}>
        Aim, dodge and keep moving: every room is a wave of monsters between
        you and the next door.
      </Heading>
      <div className="ld-lanes ld-panel" data-rv="up">
        <Lane hero="hero-archer-idle" mon="mon-slime-walk" monScale={4} kind="shot" dur="4.2s" flip />
        <Lane hero="hero-fireman-idle" mon="mon-brute-walk" monScale={2} kind="fire" dur="5.4s" delay="-1.6s" />
        <Lane hero="hero-wizard-idle" mon="mon-bat-walk" monScale={2} kind="bolt" dur="3.6s" delay="-0.8s" />
      </div>
      <ul className="ld-stats">
        {stats.map((s, i) => (
          <li key={s.l} data-rv="pop" style={v({ "--d": `${i * 0.08}s` })}>
            <b className="ld-stat-n">
              <Counter to={s.n} suffix={s.s} />
            </b>
            <span>{s.l}</span>
          </li>
        ))}
      </ul>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Core loop                                                           */
/* ------------------------------------------------------------------ */
export function LoopSection() {
  return (
    <Sec id="loop" labelledBy="loop-title">
      <Heading id="loop-title" eyebrow="The core loop" title={<>One more <em>run.</em></>}>
        Dive in, get stronger as you go, take what the dungeon drops and face
        what waits at the bottom.
      </Heading>
      <ol className="ld-steps">
        <li className="ld-step ld-panel" data-rv="up" style={v({ "--d": "0s" })}>
          <div className="ld-vig ld-vig-walk" aria-hidden>
            <span className="ld-vig-door" />
            <div className="ld-pace" style={v({ "--dist": "calc(100cqw - 150px)", "--dur": "4.5s" })}>
              <div className="ld-flip" style={v({ "--dur": "4.5s" })}>
                <Sprite name="hero-archer-walk" scale={4} fps={8} />
              </div>
            </div>
          </div>
          <span className="ld-step-n">1</span>
          <h3 className="ld-h4">Enter the dungeon</h3>
          <p>Leave the hub island and clear room after room. Every floor ends in a bigger fight.</p>
        </li>
        <li className="ld-step ld-panel" data-rv="up" style={v({ "--d": ".08s" })}>
          <div className="ld-vig ld-vig-xp" aria-hidden>
            <span className="ld-xp"><i /></span>
            <span className="ld-lvl">LEVEL UP!</span>
            <span className="ld-spark ld-spark-1" />
            <span className="ld-spark ld-spark-2" />
            <span className="ld-spark ld-spark-3" />
          </div>
          <span className="ld-step-n">2</span>
          <h3 className="ld-h4">Level up, pick a card</h3>
          <p>Each level offers cards for your guns, swords and armor. No two runs build the same.</p>
        </li>
        <li className="ld-step ld-panel" data-rv="up" style={v({ "--d": ".16s" })}>
          <div className="ld-vig ld-vig-loot" aria-hidden>
            <span className="ld-vig-anvil"><Sprite name="wp-anvil" scale={3} /></span>
            <span className="ld-vig-gun"><Sprite name="wp-shotgun" scale={3} /></span>
            <span className="ld-vig-coin"><Sprite name="wp-coin" scale={1} /></span>
            <span className="ld-clang" />
          </div>
          <span className="ld-step-n">3</span>
          <h3 className="ld-h4">Loot and craft</h3>
          <p>Open chests, grab weapons and materials, then forge something better at the anvil.</p>
        </li>
        <li className="ld-step ld-panel" data-rv="up" style={v({ "--d": ".24s" })}>
          <div className="ld-vig ld-vig-boss" aria-hidden>
            <span className="ld-warn">!</span>
            <span className="ld-vig-bossspr"><Sprite name="boss-guardian" scale={1} fps={6} /></span>
            <span className="ld-bossbar"><i /></span>
          </div>
          <span className="ld-step-n">4</span>
          <h3 className="ld-h4">Beat the boss</h3>
          <p>Bosses telegraph their attacks and change tactics in phases. Learn them, then beat them.</p>
        </li>
      </ol>

      <div className="ld-demos">
        <div className="ld-demo" data-rv="left">
          <h3 className="ld-h3">Pick a card</h3>
          <p className="ld-copy">
            Level up and the dungeon deals you a hand. Tap a card to flip it.
          </p>
          <BuffCards />
        </div>
        <div className="ld-demo" data-rv="right">
          <h3 className="ld-h3">Open the chest</h3>
          <p className="ld-copy">
            Chests hold weapons, keys and coins. Some bosses leave something
            special behind.
          </p>
          <LootChest />
        </div>
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Heroes                                                              */
/* ------------------------------------------------------------------ */
export function HeroesSection() {
  return (
    <Sec id="heroes" labelledBy="heroes-title" tone="b">
      <Heading id="heroes-title" eyebrow="Six heroes" title={<>Choose your <em>hero.</em></>}>
        Six heroes and eleven skills that change how you fight: dash through a
        crowd, summon a knight, stop time or heal the whole team.
      </Heading>
      <div data-rv="up">
        <HeroPicker />
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Pets                                                                */
/* ------------------------------------------------------------------ */
const PETS: { slug: string; name: string; idle: SpriteName; run: SpriteName; dist: string; dur: string; delay: string; y: number }[] = [
  { slug: "gum", name: "Gum", idle: "pet1-idle", run: "pet1-run", dist: "62cqw", dur: "9s", delay: "0s", y: 8 },
  { slug: "walking-leaf", name: "Walking Leaf", idle: "pet2-idle", run: "pet2-run", dist: "70cqw", dur: "11s", delay: "-3s", y: 34 },
  { slug: "bird", name: "Bird", idle: "pet5-idle", run: "pet5-idle", dist: "58cqw", dur: "8s", delay: "-5s", y: 58 },
  { slug: "orange", name: "Orange", idle: "pet8-idle", run: "pet8-run", dist: "66cqw", dur: "10s", delay: "-1s", y: 20 },
  { slug: "fox", name: "Fox", idle: "fox-idle", run: "fox-run", dist: "72cqw", dur: "12s", delay: "-6s", y: 46 },
];

export function PetsSection() {
  return (
    <Sec id="pets" labelledBy="pets-title">
      <div className="ld-split">
        <div>
          <Heading id="pets-title" eyebrow="Companions" title={<>Bring a <em>friend.</em></>}>
            Five little companions follow your hero around the hub and into the
            dungeon. They are purely cosmetic: they cannot attack and nothing
            can hurt them, so they are here to keep you company.
          </Heading>
          <div className="ld-lead-follow ld-panel" aria-hidden data-rv="up">
            <div className="ld-follow">
              <div className="ld-pace" style={v({ "--dist": "calc(100cqw - 150px)", "--dur": "6s" })}>
                <div className="ld-flip" style={v({ "--dur": "6s" })}>
                  <Sprite name="hero-knight-walk" scale={4} fps={8} />
                </div>
              </div>
              <div className="ld-pace ld-pace-late" style={v({ "--dist": "calc(100cqw - 150px)", "--dur": "6s", "--delay": ".7s" })}>
                <div className="ld-flip" style={v({ "--dur": "6s", "--delay": ".7s" })}>
                  <Sprite name="fox-run" scale={3} fps={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ld-pen ld-panel" aria-hidden data-rv="pop">
          {PETS.map((p) => (
            <div key={p.slug} className="ld-pen-pet" style={v({ bottom: `${p.y}%` })}>
              <div className="ld-pace" style={v({ "--dist": p.dist, "--dur": p.dur, "--delay": p.delay })}>
                <div className="ld-flip" style={v({ "--dur": p.dur, "--delay": p.delay })}>
                  <Sprite name={p.run} scale={p.slug === "fox" ? 3 : 4} fps={10} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ul className="ld-pets">
        {PETS.map((p, i) => (
          <li key={p.slug} data-rv="up" style={v({ "--d": `${i * 0.07}s` })}>
            <Link href={`/wiki/pets/${p.slug}`} className="ld-pet ld-panel">
              <span className="ld-pet-spr">
                <Sprite name={p.idle} scale={p.slug === "fox" ? 4 : 6} fps={5} className="ld-pet-idle" />
                <Sprite name={p.run} scale={p.slug === "fox" ? 4 : 6} fps={12} className="ld-pet-run" />
              </span>
              <b>{p.name}</b>
              <span>Cosmetic companion</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Arsenal and crafting                                                */
/* ------------------------------------------------------------------ */
const RACK: { n: SpriteName; s: number }[] = [
  { n: "wp-shotgun", s: 3 },
  { n: "wp-bow", s: 3 },
  { n: "wp-blade", s: 3 },
  { n: "wp-redgun", s: 3 },
  { n: "wp-bouncer", s: 2 },
  { n: "wp-hammer", s: 3 },
  { n: "wp-portal", s: 3 },
  { n: "wp-ak", s: 3 },
  { n: "wp-rocket", s: 2 },
  { n: "wp-shuriken", s: 4 },
];

export function ArsenalSection({ weaponCount }: { weaponCount: number }) {
  return (
    <Sec id="arsenal" labelledBy="arsenal-title" tone="b">
      <Heading id="arsenal-title" eyebrow="Arsenal and crafting" title={<>Find it. Forge it. <em>Fire it.</em></>}>
        Dozens of weapons: guns, bows, blades and strange gadgets, with 69
        crafting recipes to turn spare parts into something nastier.
      </Heading>
      <div className="ld-arsenal">
        <ul className="ld-rack ld-panel" data-rv="left">
          {RACK.map((w, i) => (
            <li key={w.n} style={v({ "--i": i })}>
              <span className="ld-rack-item">
                <Sprite name={w.n} scale={w.s} />
              </span>
            </li>
          ))}
        </ul>
        <div className="ld-forge ld-panel" data-rv="right" aria-hidden>
          <span className="ld-forge-a"><Sprite name="wp-revolver" scale={3} /></span>
          <span className="ld-forge-b"><Sprite name="wp-coin" scale={2} /></span>
          <span className="ld-forge-anvil"><Sprite name="wp-anvil" scale={5} /></span>
          <span className="ld-forge-hammer" />
          <span className="ld-forge-flash" />
          <span className="ld-forge-result"><Sprite name="wp-rocket" scale={4} /></span>
          <span className="ld-forge-ring" />
        </div>
      </div>
      <p className="ld-note" data-rv="up">
        {weaponCount > 0 ? `${weaponCount} weapons documented in the wiki. ` : ""}
        <Link href="/wiki/weapons" className="ld-inline-link">
          Browse the arsenal <ArrowRight aria-hidden size={14} />
        </Link>
      </p>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Bosses + monster parade                                             */
/* ------------------------------------------------------------------ */
const PARADE: { n: SpriteName; s: number; dur: string; delay: string; y: number }[] = [
  { n: "mon-slime-walk", s: 3, dur: "22s", delay: "-2s", y: 6 },
  { n: "mon-brute-walk", s: 2, dur: "26s", delay: "-9s", y: 20 },
  { n: "mon-bat-walk", s: 2, dur: "18s", delay: "-5s", y: 32 },
  { n: "mon-golem-walk", s: 2, dur: "30s", delay: "-14s", y: 4 },
  { n: "mon-scorpion-walk", s: 2, dur: "20s", delay: "-11s", y: 26 },
  { n: "mon-archer-walk", s: 2, dur: "24s", delay: "-17s", y: 12 },
  { n: "mon-bloat-walk", s: 2, dur: "28s", delay: "-6s", y: 30 },
  { n: "mon-acolyte-walk", s: 2, dur: "25s", delay: "-20s", y: 8 },
  { n: "mon-drone-walk", s: 2, dur: "17s", delay: "-13s", y: 34 },
  { n: "mon-thorn-walk", s: 2, dur: "27s", delay: "-3s", y: 16 },
];

export function BossSection() {
  return (
    <Sec id="bosses" labelledBy="bosses-title">
      <Heading id="bosses-title" eyebrow="Biomes and bosses" title={<>Every floor ends in a <em>fight.</em></>}>
        Fight through the dungeon, the jungle, the lab, the castle and the sand ruins. Bosses
        arrive with a name card, change tactics in phases and always warn you
        before they strike.
      </Heading>
      <div data-rv="up">
        <BossShowcase />
      </div>
      <div className="ld-parade" aria-hidden>
        <p className="ld-parade-label">Monsters of every biome</p>
        {PARADE.map((m) => (
          <span key={m.n} className="ld-march" style={v({ "--dur": m.dur, "--delay": m.delay, bottom: `${m.y}px` })}>
            <Sprite name={m.n} scale={m.s} fps={9} />
          </span>
        ))}
        <div className="ld-parade-floor" />
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Co-op                                                               */
/* ------------------------------------------------------------------ */
export function CoopSection() {
  return (
    <Sec id="coop" labelledBy="coop-title" tone="b">
      <div className="ld-split ld-split-rev">
        <div className="ld-team ld-panel" aria-hidden data-rv="pop">
          <div className="ld-team-floor" />
          <div className="ld-team-row">
            {(
              [
                ["hero-knight-idle", "Knight"],
                ["hero-healman-idle", "HealMan"],
                ["hero-archer-idle", "Archer"],
                ["hero-wizard-idle", "Wizard"],
              ] as const
            ).map(([n], i) => (
              <div key={n} className="ld-mate" style={v({ "--i": i })}>
                <span className="ld-hp"><i /></span>
                <span className="ld-plus">+</span>
                <Sprite name={n} scale={4} fps={5} />
              </div>
            ))}
          </div>
          <span className="ld-heal-ring ld-heal-ring-1" />
          <span className="ld-heal-ring ld-heal-ring-2" />
        </div>
        <div>
          <Heading id="coop-title" eyebrow="Co-op" title={<>Better <em>together.</em></>}>
            Take the dungeon online with friends. Mix heroes so every role is
            covered: a Knight to soak damage, a Wizard to control the room and a
            HealMan to keep everyone standing.
          </Heading>
          <p className="ld-note" data-rv="up">
            <Link href="/wiki/heroes" className="ld-inline-link">
              See what each hero brings <ArrowRight aria-hidden size={14} />
            </Link>
          </p>
        </div>
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Hub island                                                          */
/* ------------------------------------------------------------------ */
export function HubSection() {
  return (
    <Sec id="hub" labelledBy="hub-title">
      <Heading id="hub-title" eyebrow="The hub island" title={<>Home between <em>runs.</em></>}>
        Every run starts and ends on a lantern-lit island: gear up, train your
        heroes, test your damage on the dummy and check the hall of fame.
      </Heading>
      <div className="ld-hubgrid">
        <div className="ld-hubshot ld-window" data-rv="left">
          <div className="ld-window-in">
            <Image
              src={`${LD_ASSETS}/shots/hub.webp`}
              alt="The hub island in The Last Dungeon: stone paths, a lit lantern, a training dummy and the hero"
              width={1200}
              height={540}
              unoptimized
              className="ld-hubimg"
            />
            <span className="ld-lantern" aria-hidden />
            <span className="ld-lantern-spark" aria-hidden />
          </div>
        </div>
        <ul className="ld-npcs">
          <li className="ld-npc ld-panel" data-rv="right" style={v({ "--d": "0s" })}>
            <span className="ld-npc-spr"><Sprite name="npc-trainer" scale={5} fps={4} /></span>
            <div>
              <b>The Trainer</b>
              <p>Spend gems to train your heroes, pets and effects.</p>
            </div>
            <span className="ld-bubble ld-bubble-1" aria-hidden>Hit the dummy!</span>
          </li>
          <li className="ld-npc ld-panel" data-rv="right" style={v({ "--d": ".1s" })}>
            <span className="ld-npc-spr"><Sprite name="npc-king" scale={5} fps={4} /></span>
            <div>
              <b>The King</b>
              <p>Keeper of the achievements and the hall of fame.</p>
            </div>
            <span className="ld-bubble ld-bubble-2" aria-hidden>The sea sleeps.</span>
          </li>
          <li className="ld-npc ld-panel" data-rv="right" style={v({ "--d": ".2s" })}>
            <span className="ld-npc-spr ld-dummy" aria-hidden>
              <Sprite name="wp-dummy" scale={2} />
              <span className="ld-dmg ld-dmg-1">12</span>
              <span className="ld-dmg ld-dmg-2">27</span>
              <span className="ld-dmg ld-dmg-3">8</span>
            </span>
            <div>
              <b>Training dummy</b>
              <p>Hit it and watch your damage per second.</p>
            </div>
          </li>
        </ul>
      </div>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Wiki tiles                                                          */
/* ------------------------------------------------------------------ */
const ICONS: Record<string, LucideIcon> = {
  Swords,
  PawPrint,
  Crosshair,
  Sparkles,
  Skull,
  Crown,
  Package,
  Map: MapIcon,
  Cog,
};

export interface WikiTile {
  id: string;
  title: string;
  description: string;
  icon: string;
  count: number;
}

export function WikiSection({ tiles, total }: { tiles: WikiTile[]; total: number }) {
  return (
    <Sec id="wiki" labelledBy="wiki-title" tone="b">
      <div className="ld-wikihead">
        <Heading id="wiki-title" eyebrow="The wiki" title={<>Read the <em>archives.</em></>}>
          Every hero, pet, weapon, card, monster and boss, written down
          {total > 0 ? `: ${total} articles and counting` : ""}.
        </Heading>
        <Link href="/wiki" className="ld-btn" data-rv="up">
          Open the wiki <ArrowRight aria-hidden size={18} />
        </Link>
      </div>
      <ul className="ld-tiles">
        {tiles.map((t, i) => {
          const Icon = ICONS[t.icon] ?? Cog;
          return (
            <li key={t.id} data-rv="up" style={v({ "--d": `${(i % 3) * 0.08}s` })}>
              <Link href={`/wiki/${t.id}`} className="ld-tile ld-panel">
                <span className="ld-tile-top">
                  <span className="ld-tile-ic">
                    <Icon aria-hidden size={22} />
                  </span>
                  {t.count > 0 ? (
                    <span className="ld-tile-count">
                      {t.count} {t.count === 1 ? "article" : "articles"}
                    </span>
                  ) : null}
                </span>
                <b>{t.title}</b>
                <span>{t.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Sec>
  );
}

/* ------------------------------------------------------------------ */
/* Final call to action + footer                                       */
/* ------------------------------------------------------------------ */
export function Cta() {
  return (
    <section className="ld-sec ld-cta" aria-labelledby="cta-title">
      <Torch side="l" />
      <Torch side="r" />
      <div className="ld-wrap ld-cta-in" data-rv="pop">
        <h2 id="cta-title" className="ld-h2">
          Ready to <em>descend?</em>
        </h2>
        <p className="ld-lead">The door is open. Nobody comes back the same.</p>
        <StoreButtons className="ld-stores-c" />
      </div>
    </section>
  );
}

export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="ld-footer">
      <div className="ld-wrap ld-footer-in">
        <div>
          <p className="ld-footer-logo">
            <Image
              src={`${LD_ASSETS}/logo.png`}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="ld-px"
            />
            The Last Dungeon
          </p>
          <p className="ld-footer-small">
            A game by{" "}
            <a href="https://vinpixstudio.com" className="ld-inline-link">
              Vinpix Studio
            </a>
            . © {year} Vinpix Studio. All rights reserved.
          </p>
        </div>
        <ul className="ld-footer-links">
          <li><Link href="/wiki">Wiki</Link></li>
          <li><a href="https://vinpixstudio.com">vinpixstudio.com</a></li>
          <li><Link href="/privacy">Privacy policy</Link></li>
          <li><Link href="/delete-account">Delete account</Link></li>
          <li><a href="https://vinpixstudio.com/eula.html">EULA</a></li>
          <li><a href={LASTDUNGEON_STORE.googlePlay} target="_blank" rel="noopener noreferrer">Google Play</a></li>
          <li><a href={LASTDUNGEON_STORE.appStore} target="_blank" rel="noopener noreferrer">App Store</a></li>
        </ul>
      </div>
    </footer>
  );
}
