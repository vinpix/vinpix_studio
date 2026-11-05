import Image from "next/image";
import { Skull, Zap, Crown } from "lucide-react";
import { LANDING_ASSETS, bosses, shots } from "./data";
import { Section, SectionHeading, Sprite } from "./ui";

const WAVES = [
  { n: 1, kind: "wave" },
  { n: 2, kind: "wave" },
  { n: 3, kind: "wave" },
  { n: 4, kind: "event" },
  { n: 5, kind: "wave" },
  { n: 6, kind: "wave" },
  { n: 7, kind: "boss" },
] as const;

export function WavesSection() {
  return (
    <Section id="waves" labelledBy="waves-title">
      <SectionHeading
        id="waves-title"
        eyebrow="Mode // Waves"
        title={
          <>
            Seven waves.
            <br />
            One boss.
          </>
        }
      >
        <p>
          In <strong style={{ color: "var(--fz-ink)" }}>Waves</strong> mode every floor
          is a multi-storey arena with seven waves of zombies. Catch your breath
          between them at the Workbench, then hold out until the floor boss
          shows up. Clear a floor and pick your next door. Prefer to run? <strong style={{ color: "var(--fz-ink)" }}>Classic</strong>{" "}
          mode sends you descending level after level in search of the exit.
        </p>
      </SectionHeading>

      {/* wave track */}
      <ol
        aria-label="The seven waves of a floor"
        className="mt-10 grid grid-cols-7 gap-1.5 sm:gap-3"
      >
        {WAVES.map((w) => (
          <li key={w.n} className="flex flex-col items-center gap-2 text-center">
            <span className="fz-wave-node text-sm sm:text-xl" data-kind={w.kind}>
              {w.kind === "boss" ? (
                <Crown aria-hidden className="h-5 w-5 sm:h-7 sm:w-7" />
              ) : w.kind === "event" ? (
                <Zap aria-hidden className="h-5 w-5 sm:h-7 sm:w-7" />
              ) : (
                w.n
              )}
              <span className="sr-only">
                {w.kind === "boss"
                  ? "Wave 7: boss"
                  : w.kind === "event"
                    ? "Wave 4: event wave"
                    : `Wave ${w.n}`}
              </span>
            </span>
            <span
              aria-hidden
              className="fz-pixel text-[0.55rem] uppercase leading-tight sm:text-[0.65rem]"
              style={{
                color:
                  w.kind === "boss"
                    ? "#ff9d86"
                    : w.kind === "event"
                      ? "#ffc46b"
                      : "var(--fz-muted)",
              }}
            >
              {w.kind === "boss" ? "Boss" : w.kind === "event" ? "Event" : `W${w.n}`}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="fz-frame p-5">
          <p className="fz-pixel flex items-center gap-2 text-xs uppercase" style={{ color: "#ffc46b" }}>
            <Zap aria-hidden size={16} /> Event waves
          </p>
          <p className="mt-3 leading-relaxed" style={{ color: "var(--fz-muted)" }}>
            Midway through the floor the rules change: a{" "}
            <strong style={{ color: "var(--fz-ink)" }}>Swarm</strong> floods the corridors, or a{" "}
            <strong style={{ color: "var(--fz-ink)" }}>Blackout</strong> kills the lights and
            leaves you with a flashlight and a prayer.
          </p>
        </div>
        <div className="fz-frame p-5">
          <p className="fz-pixel flex items-center gap-2 text-xs uppercase" style={{ color: "#ff9d86" }}>
            <Skull aria-hidden size={16} /> Boss wave
          </p>
          <p className="mt-3 leading-relaxed" style={{ color: "var(--fz-muted)" }}>
            Wave 7 brings the floor boss. Bosses reshape the arena, summon help,
            change form as they take damage — and go berserk when they are close
            to dying.
          </p>
        </div>
      </div>

      {/* bosses */}
      <h3 className="fz-pixel mt-16 text-xl uppercase sm:text-2xl" style={{ textShadow: "3px 3px 0 #000" }}>
        Meet the floor bosses
      </h3>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bosses.map((b, i) => (
          <li
            key={b.id}
            className={`fz-frame flex flex-col overflow-hidden ${i === bosses.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b-4 border-black bg-black">
              <Image
                src={`${LANDING_ASSETS}/bosses/${b.img}.png`}
                alt={b.alt}
                fill
                unoptimized
                sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
                className="fz-px object-cover"
                style={{ imageRendering: "pixelated", objectPosition: b.pos ?? "50% 50%" }}
              />
              <span
                className="fz-pixel absolute left-2 top-2 border-2 border-black px-2 py-1 text-[0.6rem] uppercase"
                style={{ background: "var(--fz-yellow)", color: "#1a1606" }}
              >
                {b.floor}
              </span>
            </div>
            <div className="p-4">
              <h4 className="fz-pixel text-sm font-bold uppercase leading-snug">{b.name}</h4>
              <p className="mt-2 text-[0.95rem] leading-relaxed" style={{ color: "var(--fz-muted)" }}>
                {b.blurb}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* more screens */}
      <h3 className="fz-pixel mt-16 text-xl uppercase sm:text-2xl" style={{ textShadow: "3px 3px 0 #000" }}>
        In the field
      </h3>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {shots.slice(1).map((s) => (
          <li key={s.file} className="fz-frame relative overflow-hidden">
            <Image
              src={`${LANDING_ASSETS}/shots/${s.file}.png`}
              alt={s.alt}
              width={956}
              height={511}
              unoptimized
              sizes="(min-width:640px) 50vw, 100vw"
              className="block h-auto w-full"
              loading="lazy"
            />
            <span
              className="fz-pixel absolute bottom-2 left-2 border-2 border-black px-2 py-1 text-[0.6rem] uppercase"
              style={{ background: "rgba(14,13,8,0.85)" }}
            >
              {s.caption}
            </span>
          </li>
        ))}
        <li className="fz-frame flex items-end justify-center gap-6 overflow-hidden px-4 pt-10 sm:col-span-2 fz-wallpaper-dim" aria-hidden>
          <Sprite dir="roster" file="zombie" w={12} h={27} scale={5} />
          <Sprite dir="roster" file="brute" w={23} h={33} scale={5} />
          <Sprite dir="roster" file="survivor" w={12} h={30} scale={5} />
        </li>
      </ul>
    </Section>
  );
}
