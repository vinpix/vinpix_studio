import type { WikiCategory } from "../types";

/** Display order of the wiki categories (sidebar, home grid). */
export const categories: WikiCategory[] = [
  { id: "heroes", title: "Heroes", singular: "Hero", icon: "Swords", description: "The playable heroes of the island, their skills, stats and skins.", tableColumns: ["Class", "Skill", "Unlock"] },
  { id: "pets", title: "Pets", singular: "Pet", icon: "PawPrint", description: "Companions that follow you through the island and the dungeon.", tableColumns: ["Ability", "Unlock"] },
  { id: "weapons", title: "Weapons", singular: "Weapon", icon: "Crosshair", description: "Every gun, bow, staff and blade you can loot, craft and upgrade.", tableColumns: ["Type", "Rarity", "Damage"] },
  { id: "buffs", title: "Buffs & Cards", singular: "Buff", icon: "Sparkles", description: "The level-up cards you pick between floors to shape your build.", tableColumns: ["Type", "Works with", "Levels"] },
  { id: "enemies", title: "Enemies", singular: "Enemy", icon: "Skull", description: "Monsters of every biome, how they move and how they attack.", tableColumns: ["Biome", "Role", "Health"] },
  { id: "bosses", title: "Bosses", singular: "Boss", icon: "Crown", description: "Floor bosses, their phases, skills and how to beat them.", tableColumns: ["Floor", "Phases", "Health"] },
  { id: "items", title: "Items & Gear", singular: "Item", icon: "Package", description: "Armor, enchantments, materials, chests, currencies and consumables.", tableColumns: ["Type", "Rarity", "Source"] },
  { id: "dungeons", title: "Dungeons & Rooms", singular: "Dungeon", icon: "Map", description: "Biomes, floors, special rooms and the hub island.", tableColumns: ["Floors", "Boss"] },
  { id: "mechanics", title: "Game Mechanics", singular: "Mechanic", icon: "Cog", description: "Modes, crafting, co-op, progression, controls and everything under the hood.", tableColumns: [] },
];
