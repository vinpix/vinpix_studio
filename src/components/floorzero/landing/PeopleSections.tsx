import Link from "next/link";
import {
  Crosshair,
  Skull,
  Crown,
  Users,
  Sparkles,
  TrendingUp,
  Map,
  Package,
  Cog,
  Wifi,
  KeyRound,
  Play,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { STUDIO_URL, survivors } from "./data";
import { Section, SectionHeading, Sprite } from "./ui";

export function SurvivorsSection() {
  return (
    <Section id="survivors" labelledBy="survivors-title">
      <SectionHeading
        id="survivors-title"
        eyebrow="Roster // Survivors"
        title={
          <>
            {survivors.length} lost souls.
            <br />
            One way down.
          </>
        }
      >
        <p>
          An accountant, a banana, a rubber duck, a very worried goldfish.
          Every survivor brings a passive trait and an active skill that change
          how a run plays — pick the one that fits your style.
        </p>
      </SectionHeading>

      <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {survivors.map((s) => (
          <li
            key={s.id}
            className="fz-frame fz-bob flex flex-col items-center justify-end gap-2 px-2 pb-3 pt-4 text-center"
            style={{ minHeight: 190 }}
          >
            <div className="flex flex-1 items-end justify-center">
              <Sprite dir="roster" file={s.img} w={s.w} h={s.h} scale={4} alt={`${s.name} pixel sprite`} />
            </div>
            <div
              aria-hidden
              className="h-1 w-full"
              style={{ background: "#2a2610", boxShadow: "0 2px 0 #000" }}
            />
            <p className="fz-pixel text-[0.6rem] font-bold uppercase leading-tight">{s.name}</p>
            <p className="fz-term text-lg leading-none" style={{ color: "var(--fz-yellow)" }}>
              {s.role}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const SLOTS = [
  { label: "P1", file: "survivor", w: 12, h: 30 },
  { label: "P2", file: "accountant", w: 12, h: 30 },
  { label: "P3", file: "duck", w: 18, h: 24 },
  { label: "P4", file: "stray", w: 18, h: 30 },
] as const;

export function CoopSection() {
  return (
    <Section id="coop" labelledBy="coop-title" tone="panel">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            id="coop-title"
            eyebrow="Mode // Co-op"
            title={
              <>
                Don&apos;t get lost
                <br />
                alone.
              </>
            }
          >
            <p>
              Team up with <strong style={{ color: "var(--fz-ink)" }}>2 to 4 players</strong>{" "}
              online. Host a room, share the room code with your friends and
              start the run together. Everyone controls their own survivor and
              collects their own loot while the whole squad takes on the same
              waves and bosses. On the same network? Jump in over LAN.
            </p>
          </SectionHeading>
          <ol className="mt-8 grid gap-4">
            {[
              { icon: Wifi, t: "Host online", d: "Open a room and get a short room code." },
              { icon: KeyRound, t: "Share the code", d: "Friends type it in to join your lobby." },
              { icon: Play, t: "Start the run", d: "Host hits start and the descent begins." },
            ].map((s, i) => (
              <li key={s.t} className="flex items-start gap-4">
                <span
                  className="fz-pixel grid h-10 w-10 shrink-0 place-items-center border-4 border-black text-sm font-bold"
                  style={{ background: "var(--fz-yellow)", color: "#1a1606" }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p style={{ color: "var(--fz-muted)" }}>
                  <strong className="fz-pixel text-xs uppercase" style={{ color: "var(--fz-ink)" }}>
                    <s.icon aria-hidden size={14} className="mr-2 inline-block align-[-2px]" />
                    {s.t}
                  </strong>
                  <br />
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* lobby mock */}
        <div className="fz-frame p-4 sm:p-6" role="img" aria-label="Illustration of a four-player lobby with a six character room code">
          <p className="fz-pixel text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "var(--fz-muted)" }}>
            Room code
          </p>
          <div className="mt-2 flex gap-2" aria-hidden>
            {["F", "Z", "4", "K", "7", "Q"].map((c, i) => (
              <span
                key={i}
                className="fz-pixel grid h-12 flex-1 place-items-center border-4 border-black text-xl font-bold sm:h-14 sm:text-2xl"
                style={{ background: "var(--fz-panel-2)", color: "var(--fz-yellow)", boxShadow: "inset 3px 3px 0 #3b3519" }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3" aria-hidden>
            {SLOTS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-end gap-2 border-4 border-black px-1 pb-2 pt-4 fz-wallpaper-dim"
                style={{ background: "var(--fz-panel-2)", minHeight: 150 }}
              >
                <Sprite dir="roster" file={s.file} w={s.w} h={s.h} scale={3} />
                <span className="fz-pixel text-[0.6rem]" style={{ color: "var(--fz-yellow)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <p className="fz-term mt-4 text-xl" style={{ color: "var(--fz-muted)" }} aria-hidden>
            2–4 players · online &amp; LAN
          </p>
        </div>
      </div>
    </Section>
  );
}

const ICONS: Record<string, LucideIcon> = {
  Crosshair,
  Skull,
  Crown,
  Users,
  Sparkles,
  TrendingUp,
  Map,
  Package,
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
    <Section id="wiki" labelledBy="wiki-title">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="wiki-title"
          eyebrow="Wiki // Field guide"
          title="Explore the wiki"
        >
          <p>
            Every weapon, enemy, boss, survivor and mechanic documented
            {total > 0 ? ` — ${total} articles and counting` : ""}.
          </p>
        </SectionHeading>
        <Link href="/wiki" className="fz-btn w-full sm:w-auto">
          Open the wiki <ArrowRight aria-hidden size={18} />
        </Link>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => {
          const Icon = ICONS[t.icon] ?? Cog;
          return (
            <li key={t.id}>
              <Link
                href={`/wiki/${t.id}`}
                className="fz-frame group flex h-full flex-col gap-3 p-5 transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center border-4 border-black"
                    style={{ background: "var(--fz-yellow)", color: "#1a1606" }}
                  >
                    <Icon aria-hidden size={22} />
                  </span>
                  {t.count > 0 ? (
                    <span className="fz-pixel text-[0.65rem] uppercase" style={{ color: "var(--fz-yellow)" }}>
                      {t.count} {t.count === 1 ? "article" : "articles"}
                    </span>
                  ) : null}
                </span>
                <span className="fz-pixel text-sm font-bold uppercase group-hover:underline underline-offset-4">
                  {t.title}
                </span>
                <span className="text-[0.95rem] leading-relaxed" style={{ color: "var(--fz-muted)" }}>
                  {t.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export function LandingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t-4 border-black px-4 pb-14 pt-12 sm:px-6" style={{ background: "#0a0905" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="fz-logo text-3xl sm:text-4xl" aria-hidden>
            Floor <span className="fz-logo-zero">Zero</span>
          </p>
          <p className="mt-6 text-sm" style={{ color: "var(--fz-muted)" }}>
            © {year} Vinpix Studio. All rights reserved.
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--fz-muted)" }}>
            Coming soon to Google Play &amp; the App Store.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          <li>
            <Link href="/wiki" className="fz-pixel text-xs uppercase underline underline-offset-4">
              Wiki
            </Link>
          </li>
          <li>
            <a
              href={STUDIO_URL}
              className="fz-pixel text-xs uppercase underline underline-offset-4"
              style={{ color: "var(--fz-yellow)" }}
            >
              vinpixstudio.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
