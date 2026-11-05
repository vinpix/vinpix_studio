import Image from "next/image";
import { Layers, Shuffle, Mountain } from "lucide-react";
import WallDemo from "./WallDemo";
import { LANDING_ASSETS, rarities, weaponFamilies, weapons } from "./data";
import { Section, SectionHeading, Sprite } from "./ui";

const strong = { color: "var(--fz-ink)" } as const;

export function WorldSection() {
  return (
    <Section id="world" labelledBy="world-title" tone="panel">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeading
            id="world-title"
            eyebrow="World // Destruction"
            title={
              <>
                Everything
                <br />
                breaks.
              </>
            }
          >
            <p>
              Walls, floors, ceilings, ladders, doors, lamps, furniture — if you
              can hit it, you can bring it down. Blocks that lose their grip
              come crashing after it. Only the edge of the map and the EXIT
              door are unbreakable, so you can never get stuck: you can always
              dig down.
            </p>
          </SectionHeading>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li className="flex gap-3">
              <Layers aria-hidden className="mt-1 shrink-0" size={22} style={{ color: "var(--fz-yellow)" }} />
              <p style={{ color: "var(--fz-muted)" }}>
                <strong style={strong}>Multi-storey floors</strong> linked by ladders,
                gaps to jump and rooms to dive through.
              </p>
            </li>
            <li className="flex gap-3">
              <Shuffle aria-hidden className="mt-1 shrink-0" size={22} style={{ color: "var(--fz-yellow)" }} />
              <p style={{ color: "var(--fz-muted)" }}>
                <strong style={strong}>Procedurally generated</strong> every run. A
                Waves run is five floors; at each door you choose where to go
                next across seven themes: The Lobby, the Warehouse, Poolrooms,
                Pipe Dreams, Lights Out, the Party Room and the Generator Room.
              </p>
            </li>
            <li className="flex gap-3 sm:col-span-2">
              <Mountain aria-hidden className="mt-1 shrink-0" size={22} style={{ color: "var(--fz-yellow)" }} />
              <p style={{ color: "var(--fz-muted)" }}>
                <strong style={strong}>Dig your own route.</strong> Tunnel through a
                wall to flank a horde, drop a floor on top of the enemy, or
                chop a ladder and watch the climbers fall.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <p className="fz-pixel mb-3 text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "var(--fz-yellow)" }}>
            Try it — tap the blocks
          </p>
          <WallDemo />
        </div>
      </div>
    </Section>
  );
}

export function ArsenalSection({ weaponCount }: { weaponCount: number }) {
  return (
    <Section id="arsenal" labelledBy="arsenal-title">
      <SectionHeading
        id="arsenal-title"
        eyebrow="Gear // Arsenal"
        title={
          <>
            Office supplies,
            <br />
            weaponised.
          </>
        }
      >
        <p>
          <strong style={strong}>{weaponCount > 0 ? `${weaponCount} weapons` : "A huge arsenal"}</strong>{" "}
          across eight families, from sidearms and shotguns to energy rifles,
          melee and deployable devices. Each one has its own trick: a nail gun
          that pins zombies to the wall, a printer that fires faster the longer
          you hold the trigger, a fire axe that digs through walls. Carry two
          guns, a melee weapon that swings on its own and one device. Most
          guns draw from a shared energy battery, so keep an eye on your
          charge, and level your favourites up to three times at the Workbench.
        </p>
      </SectionHeading>

      <ul
        aria-label="A selection of weapons"
        className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
      >
        {weapons.map((w) => (
          <li
            key={w.file}
            className="fz-frame fz-bob flex min-h-[112px] flex-col items-center justify-between gap-2 p-3 text-center"
          >
            <div className="flex flex-1 items-center justify-center">
              <Sprite dir="weapons" file={w.file} w={w.w} h={w.h} scale={3} alt="" />
            </div>
            <span className="fz-pixel text-[0.58rem] uppercase leading-tight" style={{ color: "var(--fz-muted)" }}>
              {w.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="fz-pixel text-sm uppercase" style={{ color: "var(--fz-yellow)" }}>
            8 families
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {weaponFamilies.map((f) => (
              <li key={f} className="fz-chip" style={{ color: "var(--fz-ink)" }}>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="fz-pixel text-sm uppercase" style={{ color: "var(--fz-yellow)" }}>
            6 rarities
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {rarities.map((r) => (
              <li key={r.name} className="fz-chip" style={{ color: r.color }}>
                {r.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function AnomaliesSection() {
  return (
    <Section id="anomalies" labelledBy="anomalies-title" tone="panel">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading
            id="anomalies-title"
            eyebrow="Build // Anomalies"
            title={
              <>
                Bend the
                <br />
                rules.
              </>
            }
          >
            <p>
              Between waves the Backrooms offers you a choice of three{" "}
              <strong style={strong}>Anomalies</strong>: run-shaping cards that
              change how you fight. They come in Common, Rare and Epic — and
              some are Cursed, trading a gift for a price.
            </p>
            <p className="mt-4">
              Cards fall into play styles and feed each other. Light foes on
              fire with a <strong style={strong}>Pilot Light</strong>, then grab{" "}
              <strong style={strong}>Kindling</strong> to make every burning
              enemy take extra damage. No two runs end up the same.
            </p>
          </SectionHeading>
          <ul className="mt-6 flex flex-wrap gap-2">
            {["Common", "Rare", "Epic", "Cursed"].map((r, i) => (
              <li
                key={r}
                className="fz-chip"
                style={{ color: ["#b5b5a8", "#5fb0ff", "#c38bff", "#ff6b5f"][i] }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
        <figure className="fz-frame overflow-hidden">
          <Image
            src={`${LANDING_ASSETS}/shots/anomalies.png`}
            alt="Three Anomaly cards on offer: Pilot Light sets the first hit on each foe on fire, Kindling makes burning foes take 20 percent more damage, Tetanus boosts damage against foes with a status"
            width={1220}
            height={546}
            unoptimized
            sizes="(min-width:1024px) 560px, 100vw"
            className="block h-auto w-full"
            loading="lazy"
          />
          <figcaption className="fz-pixel border-t-4 border-black px-3 py-2 text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--fz-muted)" }}>
            Pick one of three
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
