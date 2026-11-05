/* Build world "USA" + 3 creative level maps and push them through gdSave. */
import { autoOrient, createMapDoc, placeObject } from "/Users/kietle/Desktop/Development/next_project/vinpix_studio/src/features/game-design/mapDoc";
import type { MapDoc, Rotation } from "/Users/kietle/Desktop/Development/next_project/vinpix_studio/src/features/game-design/types";
import type { Dish, Level, RecipeStep, World } from "/Users/kietle/Desktop/Development/next_project/vinpix_studio/src/features/game-design/studio/types";

const URL = "https://53pgcarqrmjvjpqzjtkvimg53e0hrppx.lambda-url.ap-southeast-1.on.aws/";

// ----------------------------------------------------------------- helpers
type B = { doc: MapDoc };
const put = (b: B, key: string, x: number, y: number, rot: Rotation = 0) => { b.doc = placeObject(b.doc, key, x, y, rot); };
const row = (b: B, keys: string[], x0: number, y: number) => keys.forEach((k, i) => put(b, k, x0 + i, y));
const col = (b: B, keys: string[], x: number, y0: number) => keys.forEach((k, i) => put(b, k, x, y0 + i));
const floor = (b: B, key: string, x0: number, y0: number, x1: number, y1: number) => {
  for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) put(b, key, x, y);
};
const topWall = (b: B, x0: number, x1: number, y = 0) => { for (let x = x0; x <= x1; x += 2) put(b, "wall", x, y); };
const sideWall = (b: B, x: number, y0: number, y1: number) => { for (let y = y0; y <= y1; y += 1) put(b, "wall_half", x, y); };

// ----------------------------------------------------------------- map 1: Diner Route 66 (14x9)
// Retro diner: back kitchen along the top, a U-shaped island in the middle (fry line),
// the customer bar along the bottom with plates + deliver. Spawn inside the U.
function dinerMap(): MapDoc {
  const W = 14, H = 9;
  const b: B = { doc: createMapDoc({ id: "map_us_1", name: "USA 5.1 · Diner Route 66", notes: "us_1 · Cheeseburger. Bếp sau: nguyên liệu. Đảo chữ U: chảo chiên + thớt. Quầy trước: dĩa + ra món.", width: W, height: H }) };
  floor(b, "floor_in", 0, 0, W - 2, H - 1);
  // back wall with the pantry line
  topWall(b, 0, W - 2);
  row(b, ["fridge", "bread counter", "meat_counter", "meat_counter", "cheese_counter", "tomato counter", "cabbage counter", "onion counter", "trash counter"], 2, 0);
  put(b, "cabinet", 0, 0); put(b, "extractorhood", 1, 0); put(b, "cabinet", 11, 0); put(b, "cabinet_corner", 12, 0); put(b, "cabinet_corner", 13, 0);
  sideWall(b, 0, 1, H - 2); sideWall(b, W - 1, 1, H - 2);
  put(b, "door_in", 0, H - 1, 0);
  // U-shaped island (open towards the top so cooks step in from the pantry side)
  col(b, ["base_counter", "cutting_counter", "cutting_counter", "base_counter"], 3, 2);
  col(b, ["base_counter", "stove counter", "stove counter", "base_counter"], 10, 2);
  row(b, ["base_counter", "sink counter", "base_counter", "plate counter", "plate counter", "base_counter", "base_counter", "base_counter"], 3, 5);
  put(b, "base_counter_corner", 3, 5); put(b, "base_counter_corner", 10, 5);
  // customer bar: front row
  row(b, ["flower_pot", "base_counter", "deliver counter", "deliver counter", "base_counter", "plate counter", "base_counter", "base_counter", "deliver counter", "deliver counter", "base_counter", "flower_pot"], 2, H - 1);
  // stools / decor (custom placeholders labelled)
  put(b, "spawn flag", 6, 3); put(b, "spawn flag", 7, 3);
  return autoOrient(b.doc);
}

// ----------------------------------------------------------------- map 2: Hot dog cart, NYC (18x7)
// Split kitchen: the truck (left, floor_in) has the pantry + grills; the sidewalk (right, floor_out)
// has cutting boards, plates and the deliver counters. Only a conveyer hatch links them,
// so one cook grills inside and hands out through the belt.
function truckMap(): MapDoc {
  const W = 18, H = 7;
  const b: B = { doc: createMapDoc({ id: "map_us_2", name: "USA 5.2 · Xe hot dog New York", notes: "us_2 · Hot dog + Milkshake. Trong xe (trái): kho + bếp. Vỉa hè (phải): thớt, dĩa, ra món. Băng chuyền qua cửa order là đường duy nhất chuyển đồ.", width: W, height: H }) };
  floor(b, "floor_in", 0, 0, 8, H - 1);
  floor(b, "floor_out", 10, 0, W - 2, H - 1);
  // truck body
  topWall(b, 0, 8);
  row(b, ["fridge", "bread counter", "bread counter", "meat_counter", "meat_counter", "onion counter", "ic_a", "ic_b"], 1, 0);
  put(b, "cabinet_corner", 0, 0);
  sideWall(b, 0, 1, H - 1);
  col(b, ["stove counter", "stove counter", "base_counter", "trash counter"], 1, 1);
  row(b, ["base_counter", "bow counter", "cherry counter", "base_counter", "sink counter", "base_counter", "base_counter", "base_counter"], 1, H - 1);
  // truck side wall facing the street with the serving hatch (conveyer) + order window
  col(b, ["wall_half", "wall_half", "order_window", "conveyer", "wall_half", "wall_half"], 9, 0);
  put(b, "wall_half", 9, H - 1);
  // sidewalk
  topWall(b, 10, W - 2);
  row(b, ["flower_pot", "cutting_counter", "cutting_counter", "plate counter", "plate counter", "flower_pot"], 11, 0);
  put(b, "wall_half", 10, 0); put(b, "wall_half", W - 1, 0);
  sideWall(b, W - 1, 1, H - 2);
  col(b, ["base_counter", "deliver counter", "deliver counter", "base_counter"], W - 1, 1);
  row(b, ["flower_pot", "base_counter", "cutting_counter", "base_counter", "deliver counter", "deliver counter", "base_counter", "flower_pot"], 10, H - 1);
  put(b, "spawn flag", 4, 3); put(b, "spawn flag", 13, 3);
  return autoOrient(b.doc);
}

// ----------------------------------------------------------------- map 3: Texas Smokehouse (16x11)
// Backyard BBQ: an outdoor pit in the centre (2x2 ovens ringed by counters) that cooks circle
// around, the pantry on the left fence, prep on the right, and a drive-thru conveyer along the
// bottom that carries plated ribs to the deliver windows.
function smokehouseMap(): MapDoc {
  const W = 16, H = 11;
  const b: B = { doc: createMapDoc({ id: "map_us_3", name: "USA 5.3 · Texas Smokehouse", notes: "us_3 · BBQ ribs. Lò hun khói ở giữa sân, chạy vòng quanh. Kho bên trái, thớt bên phải, băng chuyền drive-thru dưới cùng đưa dĩa tới cửa ra món.", width: W, height: H }) };
  floor(b, "floor_out", 0, 0, W - 2, H - 1);
  floor(b, "floor_in", 6, 4, 8, 4);
  // fence
  topWall(b, 0, W - 2);
  row(b, ["flower_pot", "cabinet", "cabinet", "flower_pot"], 6, 0);
  sideWall(b, 0, 1, H - 2); sideWall(b, W - 1, 1, H - 2);
  // left fence = pantry
  col(b, ["fridge", "meat_counter", "meat_counter", "meat_counter", "pep counter", "pep counter", "bread counter", "bread counter", "trash counter"], 0, 1);
  // right fence = prep
  col(b, ["sink counter", "cutting_counter", "cutting_counter", "base_counter", "plate counter", "plate counter", "base_counter", "base_counter", "base_counter"], W - 1, 1);
  // the pit: 2x2 ovens with a counter ring (gaps on the four sides so you can step up to it)
  put(b, "oven counter", 7, 4); put(b, "oven counter", 8, 4); put(b, "oven counter", 7, 5); put(b, "oven counter", 8, 5);
  row(b, ["base_counter_corner", "base_counter", "base_counter", "base_counter_corner"], 6, 3);
  row(b, ["base_counter_corner", "base_counter", "base_counter", "base_counter_corner"], 6, 6);
  put(b, "base_counter", 6, 4); put(b, "base_counter", 6, 5); put(b, "base_counter", 9, 4); put(b, "base_counter", 9, 5);
  // drive-thru belt along the bottom, deliver windows at both ends
  row(b, ["deliver counter", "deliver counter"], 1, H - 1);
  for (let x = 3; x <= W - 4; x += 1) put(b, "conveyer", x, H - 1);
  row(b, ["deliver counter", "deliver counter"], W - 3, H - 1);
  put(b, "door_in", 0, H - 1);
  put(b, "spawn flag", 3, 5); put(b, "spawn flag", 12, 5);
  return autoOrient(b.doc);
}

// ----------------------------------------------------------------- dishes / levels / world
const step = (id: string, input: string, station: RecipeStep["station"], result: string): RecipeStep => ({ id, input, station, result });
const mk = (d: Omit<Dish, "stations" | "worldId" | "prepSec" | "score" | "status"> & Partial<Dish>): Dish => ({
  worldId: "us", prepSec: 12, score: 40, status: "ready", ...d,
  stations: Array.from(new Set([...d.steps.map((s) => s.station), d.finishStation].filter((s): s is NonNullable<typeof s> => Boolean(s)))),
});

const DISHES: Dish[] = [
  mk({ id: "us_burger", name: "Cheeseburger", emoji: "🍔", description: "Bánh mì, thịt chiên, phô mai, cà chua và rau.", ingredients: ["bread counter", "meat_counter", "cheese_counter", "tomato counter", "cabbage counter"],
    steps: [step("s1", "meat_counter", "fry", "Thịt chiên"), step("s2", "tomato counter", "chop", "Cà chua thái"), step("s3", "cabbage counter", "chop", "Rau thái")], finishStation: "assemble", score: 55, prepSec: 14 }),
  mk({ id: "us_hotdog", name: "Hot dog", emoji: "🌭", description: "Xúc xích nướng kẹp bánh, hành thái.", ingredients: ["bread counter", "meat_counter", "onion counter"],
    steps: [step("s1", "meat_counter", "stove", "Xúc xích nướng"), step("s2", "onion counter", "chop", "Hành thái")], finishStation: "assemble", score: 40, prepSec: 10 }),
  mk({ id: "us_milkshake", name: "Milkshake", emoji: "🥤", description: "Kem lắc lạnh, thêm cherry.", ingredients: ["ic_a", "ic_b", "cherry counter", "bow counter"],
    steps: [step("s1", "ic_a", "chill", "Kem lạnh"), step("s2", "cherry counter", "chop", "Cherry thái")], finishStation: "chill", score: 35, prepSec: 8 }),
  mk({ id: "us_ribs", name: "BBQ ribs", emoji: "🍖", description: "Sườn hun khói lò, ớt chuông nướng, bánh mì kèm.", ingredients: ["meat_counter", "pep counter", "bread counter"],
    steps: [step("s1", "meat_counter", "oven", "Sườn hun khói"), step("s2", "pep counter", "chop", "Ớt thái")], finishStation: "oven", score: 75, prepSec: 22 }),
  mk({ id: "us_cherrypie", name: "Cherry pie", emoji: "🥧", description: "Vỏ bột, nhân cherry, nướng lò.", ingredients: ["dough_counter", "cherry counter"],
    steps: [step("s1", "dough_counter", "chop", "Vỏ bánh"), step("s2", "cherry counter", "chop", "Nhân cherry")], finishStation: "oven", status: "draft", score: 50, prepSec: 18 }),
];

const LEVELS: Level[] = [
  { id: "us_1", worldId: "us", name: "Diner Route 66", mapId: "map_us_1", durationSec: 180, players: [1, 2], difficulty: 1, newDishIds: ["us_burger"], stars: { one: 200, two: 400, three: 600 },
    notes: "Diner cổ điển: nguyên liệu ở bếp sau, đảo chữ U có chảo + thớt, quầy trước ra món. Dạy chiên thịt + ráp burger." },
  { id: "us_2", worldId: "us", name: "Xe hot dog New York", mapId: "map_us_2", durationSec: 200, players: [2, 4], difficulty: 2, newDishIds: ["us_hotdog", "us_milkshake"], stars: { one: 250, two: 480, three: 700 },
    notes: "Bếp chia đôi: trong xe nướng xúc xích, ngoài vỉa hè thái hành + ra món. Băng chuyền qua cửa order là đường chuyển đồ duy nhất → buộc phối hợp." },
  { id: "us_3", worldId: "us", name: "Texas Smokehouse", mapId: "map_us_3", durationSec: 210, players: [2, 4], difficulty: 3, newDishIds: ["us_ribs"], stars: { one: 300, two: 550, three: 800 },
    notes: "Sân BBQ: lò hun khói 2x2 ở giữa, chạy vòng quanh. Băng chuyền drive-thru ở đáy đưa dĩa tới cửa ra món hai đầu → canh nhịp băng chuyền." },
];

const WORLD: World = {
  id: "us", name: "USA", flag: "🇺🇸", region: "North America", accent: "#bfdbfe",
  description: "Diner neon ven xa lộ, xe hot dog góc phố và sân BBQ khói nghi ngút.", theme: "Roadside diner", status: "draft",
  defaultStations: ["fry", "chop", "oven"],
  dishIds: DISHES.map((d) => d.id),
  levelIds: LEVELS.map((l) => l.id),
  order: 4,
};

// ----------------------------------------------------------------- push
async function call(fn: string, params: unknown) {
  const r = await fetch(URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ function: fn, params }) });
  const j = await r.json();
  return j && typeof j === "object" && "body" in j ? (j as { body: unknown }).body : j;
}

async function main() {
  const maps = [dinerMap(), truckMap(), smokehouseMap()];
  for (const m of maps) console.log(m.id, `${m.width}x${m.height}`, m.objects.length, "objects");
  const cur = (await call("gdLoad", {})) as { worlds: World[] };
  const maxOrder = Math.max(-1, ...cur.worlds.filter((w) => w.id !== "us").map((w) => w.order ?? 0));
  WORLD.order = maxOrder + 1;
  const res = await call("gdSave", { worlds: [WORLD], dishes: DISHES, levels: LEVELS, maps });
  console.log(JSON.stringify(res));
}
void main();
