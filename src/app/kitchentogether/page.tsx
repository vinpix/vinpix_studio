import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import KitchenTrailer from "@/components/kitchentogether/KitchenTrailer";
import kt2Icon from "@/../public/kt2-icon.jpg";
import { UtensilsCrossed, Flame, Cake, Bell } from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/kitchen-together-2/id6748915442";

export const metadata: Metadata = {
  title: "Kitchen Together 2 — Co-op Cooking Chaos | Vinpix",
  description:
    "Team up with a friend and race the clock. Chop, fry, decorate, and serve your way to victory in Kitchen Together 2, the ultimate online co-op cooking game. Free on the App Store.",
  openGraph: {
    title: "Kitchen Together 2 — Co-op Cooking Chaos",
    description:
      "Online co-op cooking. Pick a role, beat the timer, don't burn the kitchen down.",
    images: ["/kt2-icon.jpg"],
  },
};

const ROLES = [
  {
    icon: UtensilsCrossed,
    title: "Chop",
    text: "Slice ingredients fast — the line starts here.",
  },
  {
    icon: Flame,
    title: "Fry",
    text: "Watch the heat. Burnt food costs you the round.",
  },
  {
    icon: Cake,
    title: "Decorate",
    text: "Plate it pretty. Presentation scores points.",
  },
  {
    icon: Bell,
    title: "Serve",
    text: "Beat the clock and ship every order out hot.",
  },
] as const;

const SPECS = [
  { label: "Genre", value: "Casual / Co-op" },
  { label: "Players", value: "2 Online" },
  { label: "Age", value: "4+" },
  { label: "Platform", value: "iOS 17+" },
  { label: "Price", value: "Free" },
  { label: "Rating", value: "4.0 ★" },
] as const;

export default function KitchenTogether2Page() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-black selection:bg-black selection:text-white font-sans">
      {/* HERO */}
      <section className="relative border-b-2 border-black px-6 pb-12 pt-32 sm:px-12 sm:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <span className="inline-block bg-[#FF3333] px-2 py-1 text-xs font-black uppercase tracking-widest text-white">
              New — Kitchen Together 2
            </span>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <h1 className="text-[13vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-[10vw] lg:text-[7.5rem]">
                  Kitchen
                  <br />
                  Together 2
                </h1>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mt-6 max-w-xl text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl">
                  Cooking with your friend. Pick a role, beat the timer, don&apos;t
                  burn the kitchen down.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-black bg-black px-6 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Download on the App Store ↗
                  </a>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-50">
                    By Vinpix Studio
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} className="lg:col-span-4">
              <div className="relative aspect-square w-40 border-2 border-black sm:w-52 lg:w-full lg:max-w-[280px]">
                <Image
                  src={kt2Icon}
                  alt="Kitchen Together 2 app icon"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SPEC STRIP */}
      <section className="border-b-2 border-black">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {SPECS.map((s, i) => (
            <div
              key={s.label}
              className={`border-black p-5 sm:p-6 ${
                i % 2 === 0 ? "border-r-2" : ""
              } sm:[&:not(:nth-child(3n))]:border-r-2 lg:[&:not(:last-child)]:border-r-2 ${
                i < SPECS.length - 2 ? "border-b-2 sm:border-b-0" : ""
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                {s.label}
              </p>
              <p className="mt-1 text-lg font-bold uppercase tracking-tight">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRAILER */}
      <section className="border-b-2 border-black bg-white px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <h2 className="mb-6 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              See the chaos
            </h2>
          </Reveal>
          <KitchenTrailer youtubeId="f8bi1PyrmX8" />
        </div>
      </section>

      {/* ROLES / FEATURES */}
      <section className="border-b-2 border-black px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <span className="block text-sm font-bold uppercase tracking-widest opacity-50">
              The kitchen line
            </span>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Four roles.
              <br />
              One team.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <Reveal key={role.title} delay={0.1 * i}>
                  <div className="group h-full border-2 border-black bg-[#F0F0F0] p-6 transition-colors hover:bg-black hover:text-white sm:-ml-[2px] sm:[&:nth-child(n+3)]:-mt-[2px] lg:mt-0">
                    <Icon className="h-9 w-9" strokeWidth={2.25} />
                    <h3 className="mt-5 text-2xl font-black uppercase tracking-tight">
                      {role.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-snug opacity-70 group-hover:opacity-90">
                      {role.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PITCH */}
      <section className="border-b-2 border-black bg-white px-6 py-20 sm:px-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl">
              Teamwork
              <br />
              meets
              <br />
              culinary
              <br />
              creativity.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-7">
            <p className="max-w-2xl text-xl font-medium leading-relaxed sm:text-2xl">
              Join your friend in the ultimate cooking challenge. Race against the
              clock to prep, cook, and plate delicious dishes. Whether you&apos;re a
              beginner or a master chef, every round serves up a hearty mix of
              excitement and collaboration.
            </p>
            <p className="mt-6 max-w-2xl text-lg opacity-70">
              Put on your chef&apos;s hat, split the roles, and cook your way to
              victory — one frantic, perfectly-timed order at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="bg-black px-6 py-24 text-white sm:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8">
          <Reveal>
            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-8xl">
              Get cooking.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md text-xl opacity-60">
              Free to play. Grab a friend, grab your phone, and don&apos;t let the
              fries burn.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-2 border-white px-8 py-4 text-base font-bold uppercase transition-colors hover:bg-white hover:text-black"
            >
              Download on the App Store ↗
            </a>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-white/20 pt-6 font-mono text-xs uppercase tracking-widest opacity-50">
            <a href="/kitchentogether/privacy" className="hover:opacity-100">
              Privacy
            </a>
            <span>•</span>
            <a href="/kitchentogether/term" className="hover:opacity-100">
              Terms
            </a>
            <span>•</span>
            <span>© {new Date().getFullYear()} Vinpix Studio</span>
          </div>
        </div>
      </section>
    </main>
  );
}
