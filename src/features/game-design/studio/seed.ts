/** Dummy content for the studio: 4 worlds, dishes, levels + sample maps. */

import { createMapDoc, placeObject } from "../mapDoc";
import type { MapDoc } from "../types";
import type { Dish, Level, RecipeStep, StudioData, World } from "./types";

const step = (id: string, input: string, station: RecipeStep["station"], result: string): RecipeStep => ({ id, input, station, result });

const dish = (
  id: string,
  worldId: string,
  name: string,
  emoji: string,
  description: string,
  ingredients: string[],
  steps: RecipeStep[],
  status: Dish["status"] = "ready",
  extra: Partial<Dish> = {},
): Dish => ({
  id,
  worldId,
  name,
  emoji,
  description,
  ingredients,
  stations: Array.from(new Set([...steps.map((s) => s.station), extra.finishStation ?? "assemble"].filter((s): s is NonNullable<typeof s> => Boolean(s)))),
  steps,
  finishStation: extra.finishStation ?? "assemble",
  status,
  prepSec: 12,
  score: 40,
  ...extra,
});

const level = (id: string, worldId: string, name: string, mapId: string, difficulty: number, newDishIds: string[], extra: Partial<Level> = {}): Level => ({
  id,
  worldId,
  name,
  mapId,
  durationSec: 180,
  players: [2, 4],
  difficulty,
  newDishIds,
  stars: { one: 200, two: 400, three: 600 },
  notes: "",
  ...extra,
});

// ---------------------------------------------------------------------------
// Dishes
// ---------------------------------------------------------------------------

const DISHES: Dish[] = [
  // Italy
  dish("it_bruschetta", "it", "Bruschetta", "🍅", "Bánh mì nướng, cà chua thái, chút phô mai.", ["bread counter", "tomato counter", "cheese_counter"], [
    step("s1", "tomato counter", "chop", "Cà chua thái"),
    step("s2", "bread counter", "oven", "Bánh mì nướng"),
  ], "ready", { score: 30 }),
  dish("it_pasta", "it", "Pasta pomodoro", "🍝", "Bột làm mì, sốt cà chua, hành phi.", ["dough_counter", "tomato counter", "onion counter"], [
    step("s1", "dough_counter", "chop", "Sợi mì"),
    step("s2", "tomato counter", "chop", "Cà chua thái"),
  ], "ready", { score: 50, prepSec: 16, finishStation: "stove" }),
  dish("it_pizza", "it", "Margherita pizza", "🍕", "Đế bột, sốt cà, phô mai, nướng lò.", ["dough_counter", "tomato counter", "cheese_counter"], [
    step("s1", "dough_counter", "chop", "Đế pizza"),
    step("s2", "tomato counter", "chop", "Sốt cà"),
  ], "ready", { score: 60, prepSec: 18, finishStation: "oven" }),
  dish("it_mushroom_pizza", "it", "Mushroom pizza", "🍄", "Pizza thêm nấm thái lát.", ["dough_counter", "tomato counter", "cheese_counter", "mus counter"], [
    step("s1", "dough_counter", "chop", "Đế pizza"),
    step("s2", "mus counter", "chop", "Nấm thái"),
  ], "draft", { score: 70, prepSec: 20, finishStation: "oven" }),
  dish("it_carbonara", "it", "Carbonara", "🥓", "Mì trứng, thịt xông khói, phô mai.", ["dough_counter", "meat_counter", "cheese_counter"], [
    step("s1", "dough_counter", "chop", "Sợi mì"),
    step("s2", "meat_counter", "fry", "Thịt chiên"),
  ], "ready", { score: 65, finishStation: "stove" }),
  dish("it_gelato", "it", "Gelato", "🍨", "Kem ba vị, ốc quế.", ["ic_a", "ic_b", "cone counter"], [
    step("s1", "ic_a", "chill", "Kem viên A"),
    step("s2", "ic_b", "chill", "Kem viên B"),
  ], "ready", { score: 35, prepSec: 8, finishStation: "chill" }),

  // Japan
  dish("jp_onigiri", "jp", "Onigiri", "🍙", "Cơm nắm rong biển.", ["dough_counter", "cabbage counter"], [
    step("s1", "dough_counter", "stove", "Cơm"),
  ], "ready", { score: 30 }),
  dish("jp_ramen", "jp", "Ramen", "🍜", "Mì, nước dùng, thịt, hành.", ["dough_counter", "meat_counter", "onion counter", "bow counter"], [
    step("s1", "dough_counter", "chop", "Sợi mì"),
    step("s2", "meat_counter", "stove", "Thịt hầm"),
    step("s3", "onion counter", "chop", "Hành thái"),
  ], "ready", { score: 70, prepSec: 22, finishStation: "stove" }),
  dish("jp_sushi", "jp", "Sushi", "🍣", "Cơm, cá, rong biển.", ["dough_counter", "meat_counter", "cabbage counter"], [
    step("s1", "dough_counter", "stove", "Cơm"),
    step("s2", "meat_counter", "chop", "Cá thái"),
  ], "ready", { score: 55 }),
  dish("jp_tempura", "jp", "Tempura", "🍤", "Rau và tôm chiên bột.", ["pep counter", "mus counter", "dough_counter"], [
  ], "draft", { score: 50, finishStation: "fry" }),
  dish("jp_mochi", "jp", "Mochi", "🍡", "Bánh gạo kem lạnh.", ["dough_counter", "ic_c"], [
    step("s1", "dough_counter", "stove", "Bột nếp"),
  ], "ready", { score: 35, finishStation: "chill" }),

  // Vietnam
  dish("vn_banhmi", "vn", "Bánh mì thịt", "🥖", "Bánh mì, thịt nướng, rau.", ["bread counter", "meat_counter", "cabbage counter"], [
    step("s1", "meat_counter", "oven", "Thịt nướng"),
    step("s2", "cabbage counter", "chop", "Rau thái"),
  ], "ready", { score: 40 }),
  dish("vn_pho", "vn", "Phở bò", "🍲", "Bánh phở, nước dùng, thịt bò, hành.", ["dough_counter", "meat_counter", "onion counter", "bow counter"], [
    step("s1", "dough_counter", "chop", "Bánh phở"),
    step("s2", "meat_counter", "chop", "Bò thái"),
    step("s3", "onion counter", "chop", "Hành thái"),
  ], "ready", { score: 75, prepSec: 24, finishStation: "stove" }),
  dish("vn_goicuon", "vn", "Gỏi cuốn", "🥗", "Bánh tráng, rau, thịt luộc.", ["dough_counter", "cabbage counter", "meat_counter"], [
    step("s1", "meat_counter", "stove", "Thịt luộc"),
    step("s2", "cabbage counter", "chop", "Rau thái"),
  ], "ready", { score: 45 }),
  dish("vn_chegao", "vn", "Chè", "🍧", "Chè đá bào.", ["ic_a", "cherry counter", "bow counter"], [
    step("s1", "ic_a", "chill", "Đá bào"),
    step("s2", "cherry counter", "chop", "Cherry thái"),
  ], "draft", { score: 30, finishStation: "chill" }),

  // Mexico
  dish("mx_taco", "mx", "Taco", "🌮", "Vỏ bánh, thịt, rau, phô mai.", ["bread counter", "meat_counter", "cabbage counter", "cheese_counter"], [
    step("s1", "meat_counter", "fry", "Thịt xào"),
    step("s2", "cabbage counter", "chop", "Rau thái"),
  ], "ready", { score: 45 }),
  dish("mx_burrito", "mx", "Burrito", "🌯", "Bánh cuộn thịt và ớt chuông.", ["bread counter", "meat_counter", "pep counter"], [
    step("s1", "meat_counter", "fry", "Thịt xào"),
    step("s2", "pep counter", "chop", "Ớt thái"),
  ], "ready", { score: 55 }),
  dish("mx_nachos", "mx", "Nachos", "🧀", "Bánh nướng giòn với phô mai chảy.", ["bread counter", "cheese_counter", "tomato counter"], [
    step("s1", "bread counter", "oven", "Bánh giòn"),
    step("s2", "tomato counter", "chop", "Salsa"),
  ], "draft", { score: 40, finishStation: "oven" }),
  dish("mx_churros", "mx", "Churros", "🥨", "Bột chiên phủ đường.", ["dough_counter", "cookie_stick"], [
    step("s1", "dough_counter", "fry", "Bột chiên"),
  ], "ready", { score: 35, finishStation: "fry" }),
];

// ---------------------------------------------------------------------------
// Levels
// ---------------------------------------------------------------------------

const LEVELS: Level[] = [
  level("it_1", "it", "Piazza mở màn", "map_it_1", 1, ["it_bruschetta"], { players: [1, 2], notes: "Dạy cắt và ráp." }),
  level("it_2", "it", "Cà chua & truyền thống", "map_it_2", 2, ["it_pasta"], { notes: "Lần đầu dùng bếp." }),
  level("it_3", "it", "Pizza ở quảng trường", "map_it_3", 3, ["it_pizza"], { notes: "Giới thiệu lò nướng." }),
  level("it_4", "it", "Luyện tập", "map_it_4", 3, [], { durationSec: 150 }),
  level("it_5", "it", "Nấm & lò lửa", "map_it_5", 4, ["it_mushroom_pizza"]),
  level("it_6", "it", "Thử thách băng chuyền", "map_it_6", 4, [], { durationSec: 210, players: [2, 4], stars: { one: 300, two: 550, three: 800 } }),

  level("jp_1", "jp", "Quán nhỏ Tokyo", "map_jp_1", 1, ["jp_onigiri"], { players: [1, 2] }),
  level("jp_2", "jp", "Đêm ramen", "map_jp_2", 2, ["jp_ramen"]),
  level("jp_3", "jp", "Sushi băng chuyền", "map_jp_3", 3, ["jp_sushi"]),
  level("jp_4", "jp", "Chiên giòn", "map_jp_4", 4, ["jp_tempura"]),
  level("jp_5", "jp", "Lễ hội mochi", "map_jp_5", 4, ["jp_mochi"]),

  level("vn_1", "vn", "Xe bánh mì", "map_vn_1", 1, ["vn_banhmi"], { players: [1, 2] }),
  level("vn_2", "vn", "Sáng phở", "map_vn_2", 2, ["vn_pho"]),
  level("vn_3", "vn", "Gỏi cuốn cuối tuần", "map_vn_3", 3, ["vn_goicuon"]),
  level("vn_4", "vn", "Chè giải nhiệt", "map_vn_4", 4, ["vn_chegao"]),

  level("mx_1", "mx", "Taco Tuesday", "map_mx_1", 1, ["mx_taco"], { players: [1, 2] }),
  level("mx_2", "mx", "Cuộn nhanh", "map_mx_2", 2, ["mx_burrito"]),
  level("mx_3", "mx", "Fiesta phô mai", "map_mx_3", 3, ["mx_nachos"]),
  level("mx_4", "mx", "Churros lúc nửa đêm", "map_mx_4", 4, ["mx_churros"], { durationSec: 200 }),
];

// ---------------------------------------------------------------------------
// Worlds
// ---------------------------------------------------------------------------

const WORLDS: World[] = [
  {
    id: "it", name: "Italy", flag: "🇮🇹", region: "Mediterranean", accent: "#e8b4a0",
    description: "Bếp ven biển, trattoria ấm cúng và chợ đông đúc.", theme: "Rustic trattoria", status: "active",
    defaultStations: ["chop", "oven", "stove"],
    dishIds: DISHES.filter((d) => d.worldId === "it").map((d) => d.id),
    levelIds: LEVELS.filter((l) => l.worldId === "it").map((l) => l.id),
  },
  {
    id: "jp", name: "Japan", flag: "🇯🇵", region: "East Asia", accent: "#f4c6cf",
    description: "Quán nhỏ trong hẻm, đèn lồng và băng chuyền sushi.", theme: "Izakaya", status: "active",
    defaultStations: ["chop", "stove", "fry"],
    dishIds: DISHES.filter((d) => d.worldId === "jp").map((d) => d.id),
    levelIds: LEVELS.filter((l) => l.worldId === "jp").map((l) => l.id),
  },
  {
    id: "vn", name: "Vietnam", flag: "🇻🇳", region: "Southeast Asia", accent: "#bfe3c2",
    description: "Xe đẩy vỉa hè, ghế nhựa và nồi phở bốc khói.", theme: "Street food", status: "draft",
    defaultStations: ["chop", "stove", "oven"],
    dishIds: DISHES.filter((d) => d.worldId === "vn").map((d) => d.id),
    levelIds: LEVELS.filter((l) => l.worldId === "vn").map((l) => l.id),
  },
  {
    id: "mx", name: "Mexico", flag: "🇲🇽", region: "Latin America", accent: "#f7d78c",
    description: "Quán taco rực rỡ, nhạc mariachi và ớt cay.", theme: "Cantina", status: "draft",
    defaultStations: ["chop", "fry", "assemble"],
    dishIds: DISHES.filter((d) => d.worldId === "mx").map((d) => d.id),
    levelIds: LEVELS.filter((l) => l.worldId === "mx").map((l) => l.id),
  },
];

export const SEED: StudioData = { version: 1, worlds: WORLDS, dishes: DISHES, levels: LEVELS };

// ---------------------------------------------------------------------------
// Sample maps for the seeded levels (variants of the starter layout)
// ---------------------------------------------------------------------------

function ring(doc: MapDoc, w: number, h: number): MapDoc {
  for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) doc = placeObject(doc, "floor_in", x, y, 0);
  for (let x = 0; x < w; x += 2) doc = placeObject(doc, "wall", x, 0, 0);
  for (let y = 1; y < h - 1; y += 1) doc = placeObject(doc, "wall_half", 0, y, 0);
  for (let y = 1; y < h - 1; y += 1) doc = placeObject(doc, "wall_half", w - 1, y, 0);
  return doc;
}

export function seedMapFor(levelId: string, mapId: string, name: string, index: number): MapDoc {
  const w = 10 + (index % 3) * 2;
  const h = 8 + (index % 2);
  let doc = createMapDoc({ id: mapId, name, notes: levelId, width: w, height: h });
  doc = ring(doc, w, h);
  const stations = ["fridge", "tomato counter", "meat_counter", "cheese_counter", "bread counter", "dough_counter", "cabbage counter", "onion counter"];
  for (let x = 1; x < w - 1; x += 1) doc = placeObject(doc, stations[(x + index) % stations.length], x, 1, 0);
  for (let x = 1; x < w - 1; x += 1) doc = placeObject(doc, x % 3 === 0 ? "deliver counter" : "base_counter", x, h - 1, 0);
  doc = placeObject(doc, "cutting_counter", 2, Math.floor(h / 2), 0);
  doc = placeObject(doc, "cutting_counter", 3, Math.floor(h / 2), 0);
  doc = placeObject(doc, "stove counter", w - 4, Math.floor(h / 2), 0);
  doc = placeObject(doc, "oven counter", w - 3, Math.floor(h / 2), 0);
  doc = placeObject(doc, "plate counter", 1, h - 3, 0);
  doc = placeObject(doc, "sink counter", w - 2, h - 3, 0);
  doc = placeObject(doc, "trash counter", w - 2, 2, 0);
  doc = placeObject(doc, "spawn flag", Math.floor(w / 2), Math.floor(h / 2) + 1, 0);
  if (index % 4 === 3) for (let x = 3; x < w - 3; x += 1) doc = placeObject(doc, "conveyer", x, h - 3, 0);
  return doc;
}
