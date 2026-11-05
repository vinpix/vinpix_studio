"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Sprite, LD_ASSETS } from "./Sprite";
import type { SpriteName } from "./sprites";

interface Boss {
  id: string;
  name: string;
  title: string;
  floor?: string;
  shot: string;
  sprite: SpriteName;
  phases: string[];
}

/** Names, titles and phase banners are the strings the game itself shows. */
const BOSSES: Boss[] = [
  { id: "seeker", name: "Skeleton Seeker", title: "Keeper of the Bone Throne", floor: "Floor 4", shot: "seeker", sprite: "boss-seeker", phases: ["Bones rise", "Bone storm"] },
  { id: "guardian", name: "Old Guardian", title: "Warden of the Deep", floor: "Floor 4", shot: "guardian", sprite: "boss-guardian", phases: ["The eye wakes", "The ceiling falls"] },
  { id: "heavy", name: "Heavy Knight", title: "The Iron Wall", floor: "Floor 8", shot: "heavy", sprite: "boss-heavy", phases: ["Rampage", "Enraged"] },
  { id: "vegeful", name: "Vegeful", title: "The Last Guardian", floor: "Floor 12", shot: "vegeful", sprite: "boss-vegeful", phases: ["Phase 1", "Phase 2", "Phase 3"] },
  { id: "ghost", name: "Ghost King", title: "The Hollow Crown", floor: "Hard floor 4", shot: "ghost", sprite: "boss-ghost", phases: ["The court rises", "Wrath of the king"] },
  { id: "hunter", name: "Desert Hunter", title: "Shadow of the Dunes", floor: "Hard floor 8", shot: "hunter", sprite: "boss-hunter", phases: ["The hunter closes in", "No more hiding"] },
];

export function BossShowcase() {
  const [i, setI] = useState(0);
  const [armed, setArmed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const b = BOSSES[i];
  return (
    <div className="ld-bosses" ref={ref}>
      <div className="ld-boss-tabs" role="tablist" aria-label="Bosses">
        {BOSSES.map((x, k) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`ld-boss-tab-${x.id}`}
            aria-selected={k === i}
            aria-controls="ld-boss-view"
            tabIndex={k === i ? 0 : -1}
            className="ld-boss-tab"
            data-on={k === i ? "1" : "0"}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
              if (!d) return;
              e.preventDefault();
              const n = (k + d + BOSSES.length) % BOSSES.length;
              setI(n);
              document.getElementById(`ld-boss-tab-${BOSSES[n].id}`)?.focus();
            }}
          >
            <span className="ld-boss-tab-spr" aria-hidden>
              <Sprite name={x.sprite} scale={x.id === "vegeful" || x.id === "hunter" ? 2 : 1} fps={6} />
            </span>
            <span className="ld-boss-tab-name">{x.name}</span>
          </button>
        ))}
      </div>

      <div
        id="ld-boss-view"
        role="tabpanel"
        aria-labelledby={`ld-boss-tab-${b.id}`}
        key={armed ? b.id : "idle"}
        className="ld-boss-view"
        data-armed={armed ? "1" : "0"}
      >
        <Image
          src={`${LD_ASSETS}/shots/${b.shot}.webp`}
          alt={`In-game screenshot of the ${b.name} boss fight`}
          width={800}
          height={496}
          unoptimized
          className="ld-boss-shot"
        />
        <span className="ld-boss-vignette" aria-hidden />
        <span className="ld-boss-flash" aria-hidden />
        <div className="ld-namecard">
          <span className="ld-namecard-floor">{b.floor ?? "Boss"}</span>
          <span className="ld-namecard-name">{b.name}</span>
          <span className="ld-namecard-title">{b.title}</span>
        </div>
      </div>

      <ul className="ld-phases" aria-label={`${b.name} phase banners`}>
        {b.phases.map((p, k) => (
          <li key={`${b.id}-${p}`} style={{ "--i": k } as CSSProperties}>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
