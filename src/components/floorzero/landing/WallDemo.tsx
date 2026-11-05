"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Hammer, RotateCcw } from "lucide-react";

/**
 * A tiny playable version of "everything is destructible": tap/click a block
 * to smash it. Blocks that lose their grip on the indestructible frame
 * (dark side pillars and the floor) collapse. Pure client toy, no deps.
 */
const COLS = 12;
const ROWS = 7;
const EDGE = (r: number, c: number) => c === 0 || c === COLS - 1 || r === ROWS - 1;

// 0 = air, 1 = solid, 2 = falling
type Grid = number[];

function fresh(): Grid {
  const g: Grid = new Array(COLS * ROWS).fill(1);
  // carve a doorway + a window so the demo reads as a room
  for (const [r, c] of [
    [4, 5], [5, 5], [4, 6], [5, 6], [2, 8], [2, 9],
  ]) g[r * COLS + c] = 0;
  return g;
}

/** tiles that are solid and NOT connected (4-neighbourhood) to the frame */
function unsupported(g: Grid): number[] {
  const seen = new Uint8Array(g.length);
  const stack: number[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      if (EDGE(r, c) && g[i] === 1) {
        seen[i] = 1;
        stack.push(i);
      }
    }
  while (stack.length) {
    const i = stack.pop()!;
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS) continue;
      const ni = nr * COLS + nc;
      if (!seen[ni] && g[ni] === 1) {
        seen[ni] = 1;
        stack.push(ni);
      }
    }
  }
  const out: number[] = [];
  g.forEach((v, i) => {
    if (v === 1 && !seen[i]) out.push(i);
  });
  return out;
}

export default function WallDemo() {
  const [grid, setGrid] = useState<Grid>(fresh);
  const [broken, setBroken] = useState(0);
  const [collapsed, setCollapsed] = useState(0);
  const [live, setLive] = useState("");
  const timers = useRef<number[]>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const gridRef = useRef<Grid>(grid);

  const smash = useCallback((index: number) => {
    const prev = gridRef.current;
    if (prev[index] !== 1) return;
    const next = prev.slice();
    next[index] = 0;
    const falling = unsupported(next);
    falling.forEach((i) => (next[i] = 2));
    gridRef.current = next;
    setGrid(next);
    setBroken((b) => b + 1);
    if (falling.length) {
      setCollapsed((c) => c + falling.length);
      setLive(`Block destroyed. ${falling.length} blocks collapsed.`);
      const id = window.setTimeout(
        () => {
          const n = gridRef.current.slice();
          falling.forEach((i) => {
            if (n[i] === 2) n[i] = 0;
          });
          gridRef.current = n;
          setGrid(n);
        },
        reduced.current ? 0 : 850
      );
      timers.current.push(id);
    } else {
      setLive("Block destroyed.");
    }
  }, []);

  const smashRandom = () => {
    const solids: number[] = [];
    gridRef.current.forEach((v, i) => {
      if (v === 1 && !EDGE(Math.floor(i / COLS), i % COLS)) solids.push(i);
    });
    if (solids.length) smash(solids[Math.floor(Math.random() * solids.length)]);
  };

  const reset = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    const g = fresh();
    gridRef.current = g;
    setGrid(g);
    setBroken(0);
    setCollapsed(0);
    setLive("Room rebuilt.");
  };

  return (
    <div className="fz-frame p-3 sm:p-4">
      <div
        role="group"
        aria-label="Destructible wall demo. Click or tap blocks to smash them."
        className="grid overflow-hidden border-2 border-black"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
          background:
            "linear-gradient(180deg,#1b1809,#0e0d08)",
          userSelect: "none",
        }}
      >
        {grid.map((v, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          const edge = EDGE(r, c);
          return (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              aria-hidden
              data-solid={v === 0 ? 0 : 1}
              data-fall={v === 2 ? 1 : 0}
              data-edge={edge ? 1 : 0}
              className="fz-tile"
              style={
                {
                  "--fz-drop": `${60 + ((i * 37) % 80)}px`,
                  "--fz-rot": `${((i * 53) % 50) - 25}deg`,
                } as React.CSSProperties
              }
              onPointerDown={(e) => {
                e.preventDefault();
                if (!edge) smash(i);
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={smashRandom}
          className="fz-btn"
          style={{ fontSize: "0.75rem", padding: "0.5rem 1rem" }}
        >
          <Hammer aria-hidden size={16} /> Smash a block
        </button>
        <button
          type="button"
          onClick={reset}
          className="fz-btn fz-btn-ghost"
          style={{ fontSize: "0.75rem", minHeight: 44, padding: "0.5rem 1rem" }}
        >
          <RotateCcw aria-hidden size={16} /> Rebuild
        </button>
        <p className="fz-term ml-auto text-xl" style={{ color: "var(--fz-yellow)" }}>
          broken {broken} · collapsed {collapsed}
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {live}
      </p>
    </div>
  );
}
