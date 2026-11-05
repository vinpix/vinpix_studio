import type { WikiCategory } from "../types";

/** Display order of the wiki categories (sidebar, home grid). */
export const categories: WikiCategory[] = [
  { id: "weapons", title: "Weapons", singular: "Weapon", icon: "Crosshair", description: "Every gun, blade and gadget you can find, upgrade and fuse in the Backrooms.", tableColumns: ["Family", "Rarity", "Ammo", "Damage"] },
  { id: "enemies", title: "Enemies", singular: "Enemy", icon: "Skull", description: "The lost office workers and stranger things that hunt you floor by floor.", tableColumns: ["Type", "Health", "First seen"] },
  { id: "bosses", title: "Bosses", singular: "Boss", icon: "Crown", description: "Floor bosses, their phases and how to bring them down.", tableColumns: ["Floor", "Phases", "Health"] },
  { id: "characters", title: "Characters", singular: "Character", icon: "Users", description: "Playable survivors, their passives and skills.", tableColumns: ["Role", "Skill", "Unlock"] },
  { id: "anomalies", title: "Anomalies", singular: "Anomaly", icon: "Sparkles", description: "The run-shaping Anomaly cards you pick between waves, grouped by play style.", tableColumns: ["Play style", "Rarity"] },
  { id: "perks", title: "Perks & Upgrades", singular: "Perk", icon: "TrendingUp", description: "Permanent upgrades bought between runs, boons, and elite and boss trophies.", tableColumns: ["Type", "Effect"] },
  { id: "levels", title: "Levels & Rooms", singular: "Level", icon: "Map", description: "Floor themes, special rooms and how the procedural levels are built.", tableColumns: ["Depth", "Hazards"] },
  { id: "items", title: "Items & Gear", singular: "Item", icon: "Package", description: "Ammo, pickups, currencies, vending machines, workbenches and devices.", tableColumns: ["Type", "Source"] },
  { id: "mechanics", title: "Game Mechanics", singular: "Mechanic", icon: "Cog", description: "Modes, waves, destruction, co-op, controls and everything else under the hood.", tableColumns: [] },
];
