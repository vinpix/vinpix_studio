"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Sprite } from "./Sprite";
import type { SpriteName } from "./sprites";

interface Skill {
  name: string;
  icon: SpriteName;
  text: string;
}
interface HeroDef {
  id: string;
  slug: string;
  name: string;
  role: string;
  blurb: string;
  idle: SpriteName;
  walk: SpriteName;
  skills: Skill[];
  free?: boolean;
}

const HEROES: HeroDef[] = [
  {
    id: "archer",
    slug: "archer",
    name: "Archer",
    role: "Skirmisher",
    free: true,
    blurb: "The free starter hero. Quick on his feet, and his dash doubles as a dodge.",
    idle: "hero-archer-idle",
    walk: "hero-archer-walk",
    skills: [{ name: "Dash Strike", icon: "ic-dash", text: "Dash through two enemies, slashing each one." }],
  },
  {
    id: "knight",
    slug: "knight",
    name: "Knight",
    role: "Tank",
    blurb: "The biggest shield in the dungeon, and the most skills to choose from.",
    idle: "hero-knight-idle",
    walk: "hero-knight-walk",
    skills: [
      { name: "Little Knight", icon: "ic-knight", text: "Summon a small knight to fight beside you." },
      { name: "Giant Knight", icon: "ic-shield", text: "Grow huge for a while: hit harder, take less." },
      { name: "Shield", icon: "ic-shield", text: "A short window where nothing can hurt you." },
    ],
  },
  {
    id: "wizard",
    slug: "wizard",
    name: "Wizard",
    role: "Caster",
    blurb: "Fragile, but he controls the whole room.",
    idle: "hero-wizard-idle",
    walk: "hero-wizard-idle",
    skills: [
      { name: "Lightning Bolts", icon: "ic-thunder", text: "Bolts that bounce between enemies." },
      { name: "Freeze Time", icon: "ic-clock", text: "Stop every monster and every bullet in the room." },
    ],
  },
  {
    id: "fireman",
    slug: "fireman",
    name: "Fireman",
    role: "Striker",
    blurb: "Hits the hardest of all six, and sets the room on fire doing it.",
    idle: "hero-fireman-idle",
    walk: "hero-fireman-walk",
    skills: [{ name: "Firebolt", icon: "ic-fire", text: "A slow fireball that cools down faster when it kills." }],
  },
  {
    id: "healman",
    slug: "healman",
    name: "HealMan",
    role: "Support",
    blurb: "Keeps the whole team on its feet.",
    idle: "hero-healman-idle",
    walk: "hero-healman-walk",
    skills: [{ name: "Heal", icon: "ic-heal", text: "Restore health to every player." }],
  },
  {
    id: "plague",
    slug: "plague-doctor",
    name: "Plague Doctor",
    role: "Leech",
    blurb: "Fights dirty and heals off the damage he deals.",
    idle: "hero-plague-idle",
    walk: "hero-plague-walk",
    skills: [
      { name: "Disease I", icon: "ic-poison", text: "A spray of shots in four directions, with life steal." },
      { name: "Disease II", icon: "ic-poison", text: "Poison every monster, with extra damage and life steal." },
    ],
  },
];

export function HeroPicker() {
  const [i, setI] = useState(0);
  const h = HEROES[i];
  return (
    <div className="ld-picker">
      <div className="ld-roster" role="tablist" aria-label="Heroes" aria-orientation="horizontal">
        {HEROES.map((x, k) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`ld-hero-tab-${x.id}`}
            aria-selected={k === i}
            aria-controls="ld-hero-stage"
            tabIndex={k === i ? 0 : -1}
            className="ld-roster-btn"
            data-on={k === i ? "1" : "0"}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                const n = (k + 1) % HEROES.length;
                setI(n);
                document.getElementById(`ld-hero-tab-${HEROES[n].id}`)?.focus();
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                const n = (k + HEROES.length - 1) % HEROES.length;
                setI(n);
                document.getElementById(`ld-hero-tab-${HEROES[n].id}`)?.focus();
              }
            }}
          >
            <span className="ld-roster-spr">
              <Sprite name={x.idle} scale={3} fps={6} />
            </span>
            <span className="ld-roster-name">{x.name}</span>
          </button>
        ))}
      </div>

      <div className="ld-stage ld-panel" id="ld-hero-stage" role="tabpanel" aria-labelledby={`ld-hero-tab-${h.id}`}>
        <div className="ld-stage-floor" aria-hidden>
          <div className="ld-stage-glow" />
          <div key={h.id} className="ld-stage-hero">
            <div className="ld-pace" style={{ "--dist": "max(40px, calc(100cqw - 240px))", "--dur": "7s" } as React.CSSProperties}>
              <div className="ld-flip" style={{ "--dur": "7s" } as React.CSSProperties}>
                {h.walk === h.idle ? (
                  <span className="ld-bob">
                    <Sprite name={h.walk} scale={8} fps={7} />
                  </span>
                ) : (
                  <Sprite name={h.walk} scale={8} fps={7} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div key={`t-${h.id}`} className="ld-stage-info">
          <p className="ld-chip">
            {h.role}
            {h.free ? " · Free hero" : ""}
          </p>
          <h3 className="ld-h3">{h.name}</h3>
          <p className="ld-copy">{h.blurb}</p>
          <ul className="ld-skills">
            {h.skills.map((s, k) => (
              <li key={s.name} style={{ "--i": k } as React.CSSProperties}>
                <span className="ld-skill-ic">
                  <Sprite name={s.icon} scale={Math.max(2, Math.floor(40 / 16))} />
                </span>
                <span>
                  <b>{s.name}</b>
                  <span>{s.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href={`/wiki/heroes/${h.slug}`} className="ld-link">
            {h.name} in the wiki <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
