import type { CatalogEntry, MapLayer, Rotation } from "./types";

const A = (name: string) => `/map-preview/assets/${name}.glb`;

/**
 * Object catalog. `key` must match the Godot mapEditorKey in
 * public/map-preview/object-manifest.json so the game can load the exported JSON.
 * Footprints come from the GLB bounding boxes (counter 2x2 units = 1 cell,
 * floor tile 4x4 = 2x2 cells, wall 4 long = 2x1 cells).
 */
export const CATALOG: CatalogEntry[] = [
  // ---- floor (layer 0)
  { key: "floor_in", label: "Sàn trong", layer: 0, footprint: [2, 2], assetUrl: A("floor_inside"), color: "#e5e7eb" },
  { key: "floor_out", label: "Sàn ngoài", layer: 0, footprint: [2, 2], assetUrl: A("floor_outside"), color: "#d6d3d1" },

  // ---- counters (layer 1)
  { key: "custom_counter", label: "Custom counter", aliases: ["tuỳ chỉnh", "placeholder", "label"], layer: 1, footprint: [1, 1], assetUrl: null, color: "#ffffff", height: 1.0, custom: true },
  { key: "base_counter", label: "Bàn trống", aliases: ["counter"], layer: 1, footprint: [1, 1], assetUrl: A("base_counter"), color: "#d1d5db" },
  { key: "base_counter_corner", label: "Bàn góc", layer: 1, footprint: [1, 1], assetUrl: A("base_counter_corner"), color: "#d1d5db" },
  { key: "cutting_counter", label: "Thớt", layer: 1, footprint: [1, 1], assetUrl: A("cutting_counter"), color: "#fde68a" },
  { key: "plate counter", label: "Dĩa", aliases: ["đĩa"], layer: 1, footprint: [1, 1], assetUrl: A("plate_counter"), color: "#e0f2fe" },
  { key: "stove counter", label: "Bếp", layer: 1, footprint: [1, 1], assetUrl: A("stove_counter"), color: "#fecaca" },
  { key: "oven counter", label: "Lò nướng", layer: 1, footprint: [1, 1], assetUrl: A("oven_counter"), color: "#fca5a5" },
  { key: "sink counter", label: "Rửa chén", layer: 1, footprint: [1, 1], assetUrl: A("sink_counter"), color: "#bae6fd" },
  { key: "trash counter", label: "Thùng rác", layer: 1, footprint: [1, 1], assetUrl: A("trash_counter"), color: "#a8a29e" },
  { key: "meat_counter", label: "Thịt", layer: 1, footprint: [1, 1], assetUrl: A("meat_counter"), color: "#fda4af" },
  { key: "cabbage counter", label: "Rau", aliases: ["bắp cải", "xà lách"], layer: 1, footprint: [1, 1], assetUrl: A("cabbage_counter"), color: "#bbf7d0" },
  { key: "tomato counter", label: "Cà chua", layer: 1, footprint: [1, 1], assetUrl: A("tomato_coutner"), color: "#fecdd3" },
  { key: "cheese_counter", label: "Phô mai", layer: 1, footprint: [1, 1], assetUrl: A("cheese_counter"), color: "#fef08a" },
  { key: "bread counter", label: "Bánh mì", layer: 1, footprint: [1, 1], assetUrl: A("bread_counter"), color: "#fed7aa" },
  { key: "dough_counter", label: "Bột", layer: 1, footprint: [1, 1], assetUrl: A("dough_couter"), color: "#f5f5f4" },
  { key: "onion counter", label: "Hành", layer: 1, footprint: [1, 1], assetUrl: A("onion_couter"), color: "#e9d5ff" },
  { key: "pep counter", label: "Ớt chuông", aliases: ["pepper"], layer: 1, footprint: [1, 1], assetUrl: A("pep_couter"), color: "#bbf7d0" },
  { key: "mus counter", label: "Nấm", aliases: ["mushroom"], layer: 1, footprint: [1, 1], assetUrl: A("mus_couter"), color: "#e7e5e4" },
  { key: "cherry counter", label: "Cherry", layer: 1, footprint: [1, 1], assetUrl: A("cherry_counter"), color: "#fecdd3" },
  { key: "bow counter", label: "Tô", aliases: ["bowl"], layer: 1, footprint: [1, 1], assetUrl: A("bow_counter"), color: "#e0f2fe" },
  { key: "cone counter", label: "Ốc quế", layer: 1, footprint: [1, 1], assetUrl: A("cone_counter"), color: "#fed7aa" },
  { key: "cookie_stick", label: "Que bánh", layer: 1, footprint: [1, 1], assetUrl: A("cookie_stick_counter"), color: "#fed7aa" },
  { key: "waf counter", label: "Waffle", layer: 1, footprint: [1, 1], assetUrl: A("waf_counter"), color: "#fde68a" },
  { key: "pin counter", label: "Pin", layer: 1, footprint: [1, 1], assetUrl: A("pin_counter"), color: "#e5e7eb" },
  { key: "ic_a", label: "Kem A", aliases: ["ice cream"], layer: 1, footprint: [1, 1], assetUrl: A("ic_a_counter"), color: "#fbcfe8" },
  { key: "ic_b", label: "Kem B", layer: 1, footprint: [1, 1], assetUrl: A("ic_b_counter"), color: "#fbcfe8" },
  { key: "ic_c", label: "Kem C", layer: 1, footprint: [1, 1], assetUrl: A("ic_c_counter"), color: "#fbcfe8" },
  // ---- counters ported from Kitchen Together Unity MapObjectCatalog (2026-09-20)
  { key: "carrot counter", label: "Cà rốt", aliases: ["carrot"], layer: 1, footprint: [1, 1], assetUrl: A("carrot_counter"), color: "#fed7aa" },
  { key: "ham counter", label: "Giăm bông", aliases: ["ham"], layer: 1, footprint: [1, 1], assetUrl: A("ham_counter"), color: "#fecdd3" },
  { key: "potato counter", label: "Khoai tây", aliases: ["potato"], layer: 1, footprint: [1, 1], assetUrl: A("potato_counter"), color: "#fde68a" },
  { key: "pickle counter", label: "Dưa muối", aliases: ["pickle"], layer: 1, footprint: [1, 1], assetUrl: A("pickle_counter"), color: "#d9f99d" },
  { key: "rice_raw counter", label: "Gạo", aliases: ["rice", "rice_raw", "cơm"], layer: 1, footprint: [1, 1], assetUrl: A("rice_raw_counter"), color: "#f5f5f4" },
  { key: "suon_raw counter", label: "Sườn (xe)", aliases: ["suon", "suon_raw", "food truck"], layer: 1, footprint: [1, 1], assetUrl: A("suon_raw_counter"), color: "#fda4af", height: 3.8 },
  { key: "food_spawn", label: "Thùng trống", aliases: ["crate", "food spawn"], layer: 1, footprint: [1, 1], assetUrl: A("food_spawn"), color: "#e7e5e4" },
  { key: "lo than counter", label: "Lò than", aliases: ["lo_than", "bếp than"], layer: 1, footprint: [1, 1], assetUrl: A("lo_than_counter"), color: "#fca5a5" },
  { key: "noi_com", label: "Nồi cơm", aliases: ["noi com", "noicom", "rice cooker"], layer: 1, footprint: [1, 1], assetUrl: A("noi_com"), color: "#e5e7eb" },

  // ---- movable (layer 2)
  { key: "deliver counter", label: "Ra món", aliases: ["deliver"], layer: 2, footprint: [1, 1], assetUrl: A("deliver_counter"), color: "#bfdbfe" },
  { key: "conveyer", label: "Băng chuyền", layer: 2, footprint: [1, 1], assetUrl: A("conveyer"), color: "#fef3c7" },
  { key: "spawn flag", label: "Spawn", aliases: ["điểm bắt đầu"], layer: 2, footprint: [1, 1], assetUrl: A("spawn_flag"), color: "#c7d2fe" },

  // ---- decor / walls (layer 3)
  { key: "fridge", label: "Tủ lạnh", layer: 3, footprint: [1, 1], assetUrl: A("fridge"), color: "#bbf7d0" },
  { key: "wall", label: "Tường", layer: 3, footprint: [2, 1], assetUrl: A("wall"), color: "#cbd5e1" },
  { key: "wall_half", label: "Tường ½", layer: 3, footprint: [1, 1], assetUrl: A("wall_half"), color: "#cbd5e1" },
  { key: "wall_window_open", label: "Cửa sổ mở", layer: 3, footprint: [2, 1], assetUrl: A("wall_window_ope_n"), color: "#c7d2fe" },
  { key: "wall_window_close", label: "Cửa sổ đóng", layer: 3, footprint: [2, 1], assetUrl: A("wall_window_close"), color: "#c7d2fe" },
  { key: "door_in", label: "Cửa vào", layer: 3, footprint: [2, 1], assetUrl: A("door_in"), color: "#ddd6fe" },
  { key: "order_window", label: "Cửa order", layer: 3, footprint: [1, 1], assetUrl: A("order_window"), color: "#ddd6fe" },
  { key: "cabinet", label: "Tủ treo", layer: 3, footprint: [1, 1], assetUrl: A("cabinet"), color: "#e7e5e4" },
  { key: "cabinet_half", label: "Tủ treo ½", layer: 3, footprint: [1, 1], assetUrl: A("cabinet_half"), color: "#e7e5e4" },
  { key: "cabinet_corner", label: "Tủ treo góc", layer: 3, footprint: [1, 1], assetUrl: A("cabinet_corner"), color: "#e7e5e4" },
  { key: "cabinet_coner_half", label: "Tủ góc ½", layer: 3, footprint: [1, 1], assetUrl: A("cabinet_coner_half"), color: "#e7e5e4" },
  { key: "extractorhood", label: "Hút mùi", layer: 3, footprint: [1, 1], assetUrl: A("extractorhood"), color: "#e7e5e4" },
  { key: "shelf_papertowl", label: "Kệ giấy", layer: 3, footprint: [1, 1], assetUrl: A("shelf_papaertowel"), color: "#e7e5e4" },
  { key: "pizza_oven", label: "Lò pizza (decor)", aliases: ["pizza oven"], layer: 3, footprint: [2, 2], assetUrl: A("pizza_oven"), color: "#fdba74" },
  // ---- Sài Gòn street decor (Kitchen Together Unity, Tripo models)
  { key: "saigon_wall", label: "Tường Sài Gòn", aliases: ["saigon wall"], layer: 3, footprint: [2, 1], assetUrl: A("saigon_wall"), color: "#fde68a" },
  { key: "street_plat", label: "Vỉa hè", aliases: ["street plat", "sidewalk"], layer: 3, footprint: [2, 2], assetUrl: A("street_plat"), color: "#d6d3d1" },
  { key: "shop", label: "Tiệm", aliases: ["cửa hàng"], layer: 3, footprint: [1, 1], assetUrl: A("shop"), color: "#c7d2fe" },
  { key: "vegetable_store", label: "Sạp rau", aliases: ["vegetable store"], layer: 3, footprint: [4, 4], assetUrl: A("vegetable_store"), color: "#bbf7d0" },
  { key: "random_asian_object", label: "Đồ Á Đông", aliases: ["random asian object"], layer: 3, footprint: [3, 3], assetUrl: A("random_asian_object"), color: "#e9d5ff" },
  { key: "table_and_chair", label: "Bàn ghế", aliases: ["table and chair"], layer: 3, footprint: [1, 1], assetUrl: A("table_and_chair"), color: "#fed7aa" },
  { key: "sign", label: "Biển hiệu", aliases: ["bảng hiệu"], layer: 3, footprint: [1, 1], assetUrl: A("sign"), color: "#fef08a" },
  { key: "clock", label: "Đồng hồ", aliases: ["đồng hồ treo"], layer: 3, footprint: [1, 1], assetUrl: A("clock"), color: "#e5e7eb", height: 0.4 },
  { key: "cot_den", label: "Cột đèn", aliases: ["cot den", "lamp post"], layer: 3, footprint: [1, 1], assetUrl: A("cot_den"), color: "#e5e7eb" },
  { key: "cot_dien", label: "Cột điện", aliases: ["cot dien", "power pole"], layer: 3, footprint: [1, 1], assetUrl: A("cot_dien"), color: "#d6d3d1" },
  { key: "tru_nuoc", label: "Trụ nước", aliases: ["tru nuoc", "hydrant"], layer: 3, footprint: [1, 1], assetUrl: A("tru_nuoc"), color: "#fecaca" },
  { key: "gach", label: "Đống gạch", aliases: ["bricks"], layer: 3, footprint: [1, 1], assetUrl: A("gach"), color: "#fca5a5" },
  { key: "bike", label: "Xe đạp", aliases: ["bicycle"], layer: 3, footprint: [1, 1], assetUrl: A("bike"), color: "#bfdbfe" },
  { key: "xe", label: "Xe máy", aliases: ["motorbike", "xe may"], layer: 3, footprint: [1, 1], assetUrl: A("xe"), color: "#bfdbfe" },
  { key: "conveyer_art", label: "Băng chuyền (decor)", aliases: ["conveyer art"], layer: 3, footprint: [1, 1], assetUrl: A("conveyer_art"), color: "#fef3c7" },

  // ---- placeholders the designer uses in Figma but have no GLB yet
  { key: "flower_pot", label: "Chậu hoa", layer: 3, footprint: [1, 1], assetUrl: null, color: "#99f6e4", height: 1.2 },
];

export const CATALOG_BY_KEY: Map<string, CatalogEntry> = new Map(
  CATALOG.map((e) => [normalizeKey(e.key), e])
);

/** Keys the Godot exporter misspells / aliases (mirrors kt_onchain2 objectResolver). */
const KEY_ALIASES: Record<string, string[]> = {
  dough_counter: ["dough_couter", "dough counter"],
  tomato_counter: ["tomato_coutner", "tomato counter"],
  pep_counter: ["pep_couter", "pep counter"],
  onion_counter: ["onion_couter", "onion counter"],
  mus_counter: ["mus_couter", "mus counter"],
  ham_counter: ["ham_coutner", "ham counter"],
  carrot_counter: ["carrot_coutner", "carrot counter"],
  wall_window_open: ["wall_window_ope_n", "wall window open"],
  cookie_stick_counter: ["cookie_stick"],
  shelf_papaertowel: ["shelf_papertowl"],
  floor_inside: ["floor_in"],
  floor_outside: ["floor_out"],
  ic_a_counter: ["ic_a"],
  ic_b_counter: ["ic_b"],
  ic_c_counter: ["ic_c"],
  // Unity MapObjectCatalog godotType / objectType spellings
  oven_counter: ["oven"],
  bow_counter: ["bowl_counter", "bowl counter", "bowl"],
  meat_counter: ["meat_uncook_counter", "meat_uncook counter", "meat uncook counter", "meat_uncook"],
};

export function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.(tscn|glb|gltf)$/g, "")
    .replace(/[_\s-]+/g, "_");
}

/** Resolve an object_type coming from a JSON file to a catalog entry (tolerant). */
export function resolveCatalogEntry(objectType: string): CatalogEntry | null {
  const n = normalizeKey(objectType);
  const direct = CATALOG_BY_KEY.get(n);
  if (direct) return direct;
  for (const [canonical, aliases] of Object.entries(KEY_ALIASES)) {
    const group = [canonical, ...aliases].map(normalizeKey);
    if (group.includes(n)) {
      for (const g of group) {
        const hit = CATALOG_BY_KEY.get(g);
        if (hit) return hit;
      }
    }
  }
  // last resort: basename match against asset filename
  for (const e of CATALOG) {
    if (e.assetUrl && normalizeKey(e.assetUrl.split("/").pop() ?? "") === n) return e;
  }
  return null;
}

export const LAYER_META: Record<MapLayer, { label: string; short: string }> = {
  0: { label: "Sàn (floor)", short: "Sàn" },
  1: { label: "Bàn / Counter", short: "Bàn" },
  2: { label: "Movable", short: "Movable" },
  3: { label: "Tường / Decor", short: "Decor" },
};

/** Footprint after rotation. */
export function rotatedFootprint(entry: CatalogEntry, rot: Rotation): [number, number] {
  const [w, h] = entry.footprint;
  return rot === 90 || rot === 270 ? [h, w] : [w, h];
}
