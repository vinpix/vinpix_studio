import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { LANDING_ASSETS } from "./data";
import { Sprite } from "./ui";

const NAV = [
  { href: "#waves", label: "Waves" },
  { href: "#world", label: "World" },
  { href: "#arsenal", label: "Arsenal" },
  { href: "#anomalies", label: "Anomalies" },
  { href: "#survivors", label: "Survivors" },
  { href: "#coop", label: "Co-op" },
];

export function TopBar() {
  return (
    <header
      className="relative z-20 border-b-4 border-black"
      style={{ background: "rgba(14,13,8,0.92)" }}
    >
      <nav
        aria-label="Floor Zero"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="fz-pixel flex items-center gap-3 text-sm font-bold uppercase tracking-wider"
          style={{ color: "var(--fz-ink)" }}
        >
          <Image
            src="/fz/icon.png"
            alt=""
            width={32}
            height={32}
            unoptimized
            className="fz-px border-2 border-black"
            style={{ imageRendering: "pixelated" }}
          />
          Floor Zero
        </Link>
        <ul className="hidden items-center gap-5 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="fz-pixel text-[0.7rem] uppercase tracking-widest hover:underline underline-offset-4"
                style={{ color: "var(--fz-muted)" }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/wiki" className="fz-btn min-h-[40px]! px-4! py-2! text-xs!">
          Wiki
        </Link>
      </nav>
    </header>
  );
}

function StoreBadge({ store }: { store: string }) {
  return (
    <div className="fz-badge" role="img" aria-label={`${store}: coming soon`}>
      <Smartphone aria-hidden size={22} />
      <span className="leading-tight">
        <span className="fz-pixel block text-[0.6rem] uppercase tracking-[0.2em]">
          Coming soon
        </span>
        <span className="fz-pixel block text-sm font-bold uppercase" style={{ color: "var(--fz-ink)" }}>
          {store}
        </span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* wallpaper + dark fade */}
      <div aria-hidden className="fz-wallpaper absolute inset-0 -z-20 opacity-[0.4]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(14,13,8,0.45), #0e0d08 92%), linear-gradient(180deg, rgba(14,13,8,0.05), #0e0d08 99%)",
        }}
      />
      {/* ceiling fluorescent tubes */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 flex justify-around px-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="fz-tube"
            style={{
              width: "min(26vw, 260px)",
              height: 10,
              background: "#fffbe0",
              border: "3px solid #000",
              boxShadow: "0 0 40px 12px rgba(255,244,170,0.35), 0 40px 110px 30px rgba(231,200,63,0.18)",
            }}
          />
        ))}
      </div>
      {/* whole-hero flicker */}
      <div
        aria-hidden
        className="fz-flicker pointer-events-none absolute inset-0 z-10"
        style={{ background: "rgba(255,244,170,0.14)", mixBlendMode: "screen" }}
      />

      <TopBar />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10 lg:pb-28">
        <div>
          <p
            className="fz-pixel mb-5 inline-block border-2 border-black px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] sm:text-xs"
            style={{ background: "var(--fz-yellow)", color: "#1a1606" }}
          >
            Pixel roguelite for mobile
          </p>
          <h1 className="fz-logo text-[clamp(3rem,19vw,8rem)]" aria-label="Floor Zero">
            <span className="block">Floor</span>
            <span className="fz-logo-zero block">Zero</span>
          </h1>
          <p className="mt-9 max-w-xl text-lg leading-relaxed sm:text-xl" style={{ color: "var(--fz-ink)" }}>
            Break through the Backrooms one floor at a time. Fight lost office
            workers in procedurally generated, fully destructible storeys —
            solo or with up to 3 friends.
          </p>
          <p className="fz-term mt-3 text-xl sm:text-2xl" style={{ color: "var(--fz-yellow)" }}>
            &gt; the lights are buzzing. keep digging.
            <span className="fz-blink ml-1 inline-block w-3 bg-current align-[-2px]" style={{ height: "1em" }} />
          </p>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link href="/wiki" className="fz-btn w-full sm:w-auto">
              Read the Wiki <ArrowRight aria-hidden size={18} />
            </Link>
            <a href="#waves" className="fz-btn fz-btn-ghost w-full sm:w-auto">
              See the game
            </a>
          </div>

          <div className="mt-8">
            <p className="sr-only">Store availability</p>
            <div className="flex flex-wrap gap-3">
              <StoreBadge store="Google Play" />
              <StoreBadge store="App Store" />
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--fz-muted)" }}>
              Coming soon to Google Play &amp; the App Store.
            </p>
          </div>
        </div>

        {/* gameplay monitor */}
        <div className="relative">
          <div className="fz-frame fz-scanlines relative overflow-hidden">
            <Image
              src={`${LANDING_ASSETS}/shots/lobby.png`}
              alt="Floor Zero gameplay: the hulking Missing Manager boss on a filing cabinet in the yellow Lobby while zombies climb ladders and the HUD shows wave 7"
              width={956}
              height={511}
              priority
              unoptimized
              className="block h-auto w-full"
            />
            <div
              aria-hidden
              className="fz-flicker pointer-events-none absolute inset-0 z-[3]"
              style={{ background: "rgba(255,244,170,0.18)", mixBlendMode: "screen" }}
            />
          </div>
          <p className="fz-pixel mt-4 text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "var(--fz-muted)" }}>
            Floor 1 · Boss wave
          </p>
          {/* sprites standing on the monitor frame */}
          <div aria-hidden className="pointer-events-none absolute -top-[88px] right-4 hidden sm:block">
            <Sprite dir="roster" file="survivor" w={12} h={30} scale={3} />
          </div>
          <div aria-hidden className="pointer-events-none absolute -top-[84px] right-24 hidden sm:block">
            <Sprite dir="roster" file="zombie" w={12} h={27} scale={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
