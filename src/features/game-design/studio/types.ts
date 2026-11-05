/** Game Design Studio — worlds, levels, dishes (persisted through the vinpixstudio lambda). */

export type Station = "chop" | "stove" | "oven" | "chill" | "assemble" | "fry";

export type WorldStatus = "active" | "draft";
export type DishStatus = "ready" | "draft";

export type World = {
  id: string;
  name: string;
  /** emoji flag */
  flag: string;
  region: string;
  description: string;
  theme: string;
  status: WorldStatus;
  defaultStations: Station[];
  /** ordered */
  dishIds: string[];
  /** ordered */
  levelIds: string[];
  /** tailwind-free accent for cards */
  accent: string;
  /** display order (worlds are numbered 1..n by this) */
  order?: number;
};

/** One linear prep step: take an ingredient to a station, get a result. The final assembly is implicit. */
export type RecipeStep = {
  id: string;
  /** catalog key of the ingredient counter (e.g. "tomato counter") */
  input: string;
  station: Station | null;
  /** short result label, e.g. "Cà chua thái" */
  result: string;
};

export type Dish = {
  id: string;
  worldId: string;
  name: string;
  emoji: string;
  description: string;
  /** catalog keys of ingredient counters */
  ingredients: string[];
  /** derived: stations used by steps + finishStation */
  stations: Station[];
  steps: RecipeStep[];
  /** station of the final assembly step (e.g. oven for pizza); null = plate directly */
  finishStation: Station | null;
  status: DishStatus;
  /** seconds to cook once all steps done */
  prepSec: number;
  /** base score when delivered */
  score: number;
};

export type StarThresholds = { one: number; two: number; three: number };

export type Level = {
  id: string;
  worldId: string;
  name: string;
  /** MapDoc id in the map workspace; null if not linked yet */
  mapId: string | null;
  durationSec: number;
  players: [number, number];
  /** 1..5 */
  difficulty: number;
  /** dishes unlocked for the first time in this level */
  newDishIds: string[];
  stars: StarThresholds;
  notes: string;
};

export type StudioData = {
  version: 1;
  worlds: World[];
  dishes: Dish[];
  levels: Level[];
};

export const STATION_META: Record<Station, { label: string; short: string }> = {
  chop: { label: "Thớt", short: "Cắt" },
  stove: { label: "Bếp", short: "Nấu" },
  oven: { label: "Lò nướng", short: "Nướng" },
  fry: { label: "Chảo chiên", short: "Chiên" },
  chill: { label: "Tủ lạnh", short: "Làm lạnh" },
  assemble: { label: "Bàn ráp", short: "Ráp" },
};

export const ALL_STATIONS: Station[] = ["chop", "stove", "oven", "fry", "chill", "assemble"];

/** Map a station to the catalog counter key it uses on the map. */
export const STATION_CATALOG_KEY: Record<Station, string> = {
  chop: "cutting_counter",
  stove: "stove counter",
  oven: "oven counter",
  fry: "stove counter",
  chill: "fridge",
  assemble: "base_counter",
};
