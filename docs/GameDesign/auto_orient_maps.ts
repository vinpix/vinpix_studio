/* Auto-orient every studio map on the server (counters face the floor, walls face in, corners join, belts run to deliver). */
import { autoOrient } from "/Users/kietle/Desktop/Development/next_project/vinpix_studio/src/features/game-design/mapDoc";
import type { MapDoc } from "/Users/kietle/Desktop/Development/next_project/vinpix_studio/src/features/game-design/types";

const URL = "https://53pgcarqrmjvjpqzjtkvimg53e0hrppx.lambda-url.ap-southeast-1.on.aws/";
const DRY = process.argv.includes("--dry");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");

async function call(fn: string, params: unknown) {
  const r = await fetch(URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ function: fn, params }) });
  const j = await r.json();
  return j && typeof j === "object" && "body" in j ? (j as { body: unknown }).body : j;
}

const ARROW: Record<number, string> = { 0: "▼", 90: "▶", 180: "▲", 270: "◀" };
const BELT: Record<number, string> = { 0: "▲", 90: "◀", 180: "▼", 270: "▶" };
function grid(m: MapDoc) {
  const g: string[][] = Array.from({ length: m.height }, () => Array.from({ length: m.width }, () => " ·"));
  for (const o of m.objects) {
    const k = o.key.toLowerCase();
    if (k.startsWith("floor")) continue;
    const c = k.startsWith("spawn") ? "S" : k.startsWith("wall") ? "W" : k === "conveyer" ? "C" : k.startsWith("deliver") ? "D" : /corner/.test(k) ? "L" : k.startsWith("door") ? "T" : k.startsWith("cabinet") || k.includes("hood") || k.includes("pot") ? "c" : "B";
    g[o.gy][o.gx] = c + (c === "C" ? BELT[o.rot] : ARROW[o.rot]);
  }
  return g.map((r) => r.join("")).join("\n");
}

async function main() {
  const cur = (await call("gdLoad", {})) as { maps: MapDoc[] };
  const out: MapDoc[] = [];
  for (const m of cur.maps) {
    if (ONLY && !ONLY.includes(m.id)) continue;
    const next = autoOrient(m);
    const changed = next.objects.filter((o, i) => o.rot !== m.objects[i].rot).length;
    console.log(`\n== ${m.id} ${m.name}  changed ${changed}/${m.objects.length}`);
    if (DRY) console.log(grid(next));
    if (changed) out.push(next);
  }
  if (DRY || !out.length) return;
  const res = await call("gdSave", { maps: out });
  console.log(JSON.stringify(res));
}
void main();
