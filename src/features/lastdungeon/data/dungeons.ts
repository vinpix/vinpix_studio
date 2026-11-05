import type { WikiArticle, WikiImage } from "../types";

const pic = (file: string, alt: string, caption?: string): WikiImage => ({
  src: `/ld/wiki/dungeons/${file}`,
  alt,
  caption,
  pixelated: false,
});

/** Shorthand so every article below is created in the "dungeons" category. */
const dg = (a: Omit<WikiArticle, "category">): WikiArticle => ({ category: "dungeons", ...a });

export const dungeons: WikiArticle[] = [
  // ───────────────────────────── Biomes ─────────────────────────────
  dg({
    slug: "the-dungeon",
    name: "The Dungeon",
    subtitle: "Biome - Normal floors 1 to 4",
    summary:
      "The brick-and-flagstone cellars where every Normal run begins. Floors 1 to 4 are fought here, ending with the first boss, the Skeleton Seeker or the Old Guardian.",
    image: pic("the-dungeon.jpg", "A purple-lit dungeon room with a locked chest", "A Dungeon room on floor 2."),
    infobox: [
      { label: "Floors", value: "1-4 (Normal mode)" },
      { label: "Boss", value: "Floor 4: [[bosses/skeleton-seeker]] or [[bosses/old-guardian]]" },
      { label: "Rooms per floor", value: "2-3 combat rooms plus store, Prize room, start and exit" },
      { label: "Monsters per room", value: "3-6" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Dungeon is the first of the three Normal biomes. Its floors are stone cells with torches, and its enemies are the base roster of the game. A floor holds two or three [[dungeons/combat-room|combat rooms]] in a chain, a [[dungeons/store-room|store]] and a [[dungeons/prize-room|Prize room]] attached to free doors, and an exit room with the portal. See [[dungeons/floors-and-rooms|Floors and rooms]].",
          "Every room has one wave of 3 to 6 monsters. Floors 1, 2 and 3 always have a store and a Prize room. Monsters found here: [[enemies/small-goblin|Small Goblin]], [[enemies/spore-bat|Spore Bat]], [[enemies/goblin-sword|Goblin Sword]], [[enemies/fat-goblin|Fat Goblin]], [[enemies/fat-goblin-gun|Fat Goblin Gun]], [[enemies/goblin-archer|Goblin Archer]], [[enemies/ghost-wizard|Ghost Wizard]], [[enemies/explode-goblin|Explode Goblin]], [[enemies/skeleton-brute|Skeleton Brute]], [[enemies/bone-archer|Bone Archer]]. See the [[enemies/bestiary-overview|Bestiary]] for the full pools and weights.",
        ],
      },
      {
        heading: "The first boss",
        paragraphs: [
          "Floor 4 is a boss arena. In [[mechanics/difficulty-modes|Normal mode]] the boss is drawn from the [[bosses/skeleton-seeker]] and the [[bosses/old-guardian]], but the first three solo Normal visits to floor 4 always give the Skeleton Seeker, so new players meet a known fight first. See [[dungeons/boss-floors|Boss floors]].",
        ],
      },
      {
        heading: "Twist rooms",
        paragraphs: ["Floors 2 and 3 can hold twist rooms: a Barricade from floor 2, and a [[dungeons/bomb-rain-room|Bomb Rain]] or [[dungeons/gauntlet-room|Gauntlet]] from floor 3. See [[dungeons/twist-rooms|Twist rooms]]."],
      },
    ],
    tags: ["Biome", "Normal"],
    related: [{ category: "dungeons", slug: "the-jungle" }, { category: "dungeons", slug: "boss-floors" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "bosses", slug: "skeleton-seeker" }, { category: "enemies", slug: "small-goblin" }],
  }),
  dg({
    slug: "the-jungle",
    name: "The Jungle",
    subtitle: "Biome - Normal floors 5 to 8",
    summary:
      "Mossy ruins with teal stone and orange clay tiles. Floors 5 to 8 are fought here, and the floor 8 boss is the Heavy Knight, the Iron Wall.",
    image: pic("the-jungle.jpg", "A teal and orange jungle ruin room", "A Jungle room on floor 6."),
    infobox: [
      { label: "Floors", value: "5-8 (Normal mode)" },
      { label: "Boss", value: "Floor 8: [[bosses/heavy-knight]]" },
      { label: "Rooms per floor", value: "2-3 combat rooms plus store, Prize room, start and exit" },
      { label: "Monsters per room", value: "3-6" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Jungle brings the first change of scenery and a new set of enemies. All three Normal biomes keep the one-wave-per-room rule, so rooms stay short. Floors 5, 6 and 7 always have a store and a [[dungeons/prize-room|Prize room]].",
          "Heavier twist rooms start here: the [[dungeons/elite-room|Elite room]] and the [[dungeons/champion-room|Champion room]] become possible from floor 5, and a [[dungeons/gauntlet-room|Gauntlet]] can run two extra rounds on floor 7. See [[dungeons/twist-rooms|Twist rooms]]. Monsters found here: [[enemies/spore-bat|Spore Bat]], [[enemies/goblin-sword|Goblin Sword]], [[enemies/goblin-armor|Goblin Armor]], [[enemies/goblin-archer|Goblin Archer]], [[enemies/enchanter|Enchanter]], [[enemies/crypt-crawler|Crypt Crawler]], [[enemies/bog-bloat|Bog Bloat]], [[enemies/thorn-spitter|Thorn Spitter]], [[enemies/ring-plant|Ring Plant]], [[enemies/plant-explode|Plant Explode]], [[enemies/medium-slime|Medium Slime]], [[enemies/small-slime|Small Slime]], [[enemies/shotgun-machine|ShotGun Machine]], [[enemies/machine-sword|Machine Sword]], [[enemies/hammer|Hammer]]. See the [[enemies/bestiary-overview|Bestiary]] for the full pools and weights.",
        ],
      },
      {
        heading: "Boss",
        paragraphs: ["Floor 8 is always the [[bosses/heavy-knight]] in [[mechanics/difficulty-modes|Normal mode]]. It is the boss most runs end on, so arrive with [[items/armor|armor]], a potion stack and your best weapon. See [[dungeons/boss-floors|Boss floors]]."],
      },
    ],
    tags: ["Biome", "Normal"],
    related: [{ category: "dungeons", slug: "the-dungeon" }, { category: "dungeons", slug: "the-lab" }, { category: "dungeons", slug: "elite-room" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "bosses", slug: "heavy-knight" }, { category: "enemies", slug: "spore-bat" }],
  }),
  dg({
    slug: "the-lab",
    name: "The Lab",
    subtitle: "Biome - floors 9 to 12",
    summary:
      "A cold, blue-tiled laboratory complex. It holds the last four floors of both Normal and Hard runs and ends with the final boss, Vegeful.",
    image: pic("the-lab.jpg", "A blue tiled lab room with a locked chest", "A Lab room on floor 10."),
    infobox: [
      { label: "Floors", value: "9-12 (Normal and Hard)" },
      { label: "Boss", value: "Floor 12: [[bosses/vegeful]]" },
      { label: "Rooms per floor", value: "3-4 combat rooms; store 60%, Prize room 70%" },
      { label: "Monsters per room", value: "3-6" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Lab has the largest floors: three or four [[dungeons/combat-room|combat rooms]] in the chain instead of two or three. In return, stores and [[dungeons/prize-room|Prize rooms]] are no longer certain on these floors: a store appears on 60% of Lab floors and a Prize room on 70%, so a floor can be all fighting.",
          "Twist rooms reach their highest chance here (45% of combat rooms on floor 10), and the [[dungeons/champion-room|Champion room]] can have four health bars on floors 9 and 10. See [[dungeons/twist-rooms|Twist rooms]]. Monsters found here: [[enemies/goblin-sword|Goblin Sword]], [[enemies/goblin-armor|Goblin Armor]], [[enemies/goblin-archer|Goblin Archer]], [[enemies/ghost-wizard|Ghost Wizard]], [[enemies/goblin-wizard|Goblin Wizard]], [[enemies/bog-bloat|Bog Bloat]], [[enemies/ring-plant|Ring Plant]], [[enemies/plant-explode|Plant Explode]], [[enemies/shotgun-machine|ShotGun Machine]], [[enemies/machine-sword|Machine Sword]], [[enemies/hammer|Hammer]], [[enemies/rust-drone|Rust Drone]], [[enemies/rust-golem|Rust Golem]], [[enemies/necro-acolyte|Necro Acolyte]], [[enemies/skeleton-minion|Skeleton Minion]]. See the [[enemies/bestiary-overview|Bestiary]] for the full pools and weights.",
        ],
      },
      {
        heading: "Final boss",
        paragraphs: ["Both modes end with [[bosses/vegeful]] on floor 12. Defeating it and taking the portal completes the run. See [[dungeons/boss-floors|Boss floors]]."],
      },
    ],
    tags: ["Biome", "Normal", "Hard"],
    related: [{ category: "dungeons", slug: "the-jungle" }, { category: "dungeons", slug: "boss-floors" }, { category: "mechanics", slug: "the-run" }, { category: "bosses", slug: "vegeful" }, { category: "enemies", slug: "goblin-sword" }],
  }),
  dg({
    slug: "the-castle",
    name: "The Castle",
    subtitle: "Biome - Hard floors 1 to 4",
    summary:
      "Grey fortress halls with carpets and banners. The Castle replaces the Dungeon in Hard mode and is guarded by the Ghost King or the Old Guardian.",
    image: pic("the-castle.jpg", "A grey stone castle hall with a carpet and a shrine", "A Castle room on Hard floor 3."),
    infobox: [
      { label: "Floors", value: "1-4 (Hard mode)" },
      { label: "Boss", value: "Floor 4: [[bosses/ghost-king]] or [[bosses/old-guardian]]" },
      { label: "Rooms per floor", value: "2-3 combat rooms plus store, Prize room, start and exit" },
      { label: "Monsters per room", value: "4-7" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Castle is the first Hard biome. Rooms hold one more monster than in Normal (4 to 7 instead of 3 to 6), the [[dungeons/prize-room|Prize room]] list has an extra variant, and the [[dungeons/alchemist-room|Alchemist]] is a little rarer. All monsters also have 1.9 times the health and damage of Normal ones in solo play. See [[mechanics/difficulty-modes|Difficulty modes]]. Monsters found here: [[enemies/small-goblin|Small Goblin]], [[enemies/spore-bat|Spore Bat]], [[enemies/goblin-armor|Goblin Armor]], [[enemies/fat-goblin|Fat Goblin]], [[enemies/fat-goblin-gun|Fat Goblin Gun]], [[enemies/goblin-archer|Goblin Archer]], [[enemies/ghost-wizard|Ghost Wizard]], [[enemies/enchanter|Enchanter]], [[enemies/explode-goblin|Explode Goblin]], [[enemies/skeleton-brute|Skeleton Brute]], [[enemies/bone-archer|Bone Archer]], [[enemies/necro-acolyte|Necro Acolyte]], [[enemies/skeleton-minion|Skeleton Minion]]. See the [[enemies/bestiary-overview|Bestiary]] for the full pools and weights.",
        ],
      },
      {
        heading: "Boss",
        paragraphs: ["Floor 4 draws the [[bosses/ghost-king]] or the [[bosses/old-guardian]]. See [[dungeons/boss-floors|Boss floors]]."],
      },
    ],
    tags: ["Biome", "Hard"],
    related: [{ category: "dungeons", slug: "the-sand-ruins" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "dungeons", slug: "the-dungeon" }, { category: "bosses", slug: "ghost-king" }, { category: "enemies", slug: "small-goblin" }],
  }),
  dg({
    slug: "the-sand-ruins",
    name: "The Sand Ruins",
    subtitle: "Biome - Hard floors 5 to 8",
    summary:
      "Sun-baked stone and sand tiles. The Sand Ruins stand in for the Jungle in Hard mode, and its floor 8 is ruled by the Desert Hunter.",
    image: pic("the-sand-ruins.jpg", "A sand coloured ruin room with a locked chest", "A Sand room on Hard floor 7."),
    infobox: [
      { label: "Floors", value: "5-8 (Hard mode)" },
      { label: "Boss", value: "Floor 8: [[bosses/desert-hunter]]" },
      { label: "Rooms per floor", value: "2-3 combat rooms plus store, Prize room, start and exit" },
      { label: "Monsters per room", value: "3-6" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Sand Ruins follow the [[dungeons/the-jungle|Jungle]]'s room counts and use a desert enemy mix. Its [[dungeons/gauntlet-room|Gauntlet]] and [[dungeons/champion-room|Champion rooms]] are common, because both rooms favor the Jungle and Sand Ruins pools. In [[mechanics/difficulty-modes|Hard mode]] the twist-room chance gets a 5-point bonus, capped at 55%. See [[dungeons/twist-rooms|Twist rooms]]. Monsters found here: [[enemies/fat-goblin-gun|Fat Goblin Gun]], [[enemies/goblin-archer|Goblin Archer]], [[enemies/goblin-wizard|Goblin Wizard]], [[enemies/crypt-crawler|Crypt Crawler]], [[enemies/thorn-spitter|Thorn Spitter]], [[enemies/plant-explode|Plant Explode]], [[enemies/medium-slime|Medium Slime]], [[enemies/small-slime|Small Slime]], [[enemies/flower-monster|Flower Monster]], [[enemies/piraha|Piraha]], [[enemies/kua-toa|Kua-Toa]], [[enemies/machine-sword|Machine Sword]], [[enemies/hammer|Hammer]], [[enemies/sand-scorpion|Sand Scorpion]]. See the [[enemies/bestiary-overview|Bestiary]] for the full pools and weights.",
        ],
      },
      {
        heading: "Boss",
        paragraphs: ["Floor 8 is always the [[bosses/desert-hunter]] in [[mechanics/difficulty-modes|Hard mode]], replacing the [[bosses/heavy-knight]]. See [[dungeons/boss-floors|Boss floors]]."],
      },
    ],
    tags: ["Biome", "Hard"],
    related: [{ category: "dungeons", slug: "the-castle" }, { category: "dungeons", slug: "the-lab" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "bosses", slug: "desert-hunter" }, { category: "enemies", slug: "fat-goblin-gun" }],
  }),

  // ───────────────────────────── Floor structure ─────────────────────────────
  dg({
    slug: "floors-and-rooms",
    name: "Floors and Rooms",
    subtitle: "How a floor is built",
    summary:
      "Each floor is a small chain of rooms on a grid: start, two to four combat rooms, a store and a Prize room hanging off free doors, and an exit room with the portal.",
    infobox: [
      { label: "Floors", value: "All non-boss floors" },
      { label: "Boss", value: "None" },
      { label: "Rooms", value: "Start, 2-4 combat, store, Prize, exit" },
    ],
    sections: [
      {
        heading: "Layout",
        bullets: [
          "The map generator drops a start room in the middle of a grid and grows a chain of [[dungeons/combat-room|combat rooms]] from its doors: two or three on most floors, three or four on the [[dungeons/the-lab|Lab]].",
          "Special rooms are then attached to free doors: the store (every Dungeon, [[dungeons/the-jungle|Jungle]], [[dungeons/the-sand-ruins|Sand Ruins]] and [[dungeons/the-castle|Castle]] floor, 60% of Lab floors) and the [[dungeons/prize-room|Prize room]] (same, with 70% on the Lab).",
          "The exit room, which holds the portal, is attached last, to a dead end.",
          "Rooms are small boxes of roughly 2 by 2 world units with a door on each open side. The minimap in the corner can be tapped to enlarge it and shows start, exit, store and Prize rooms in different colors.",
        ],
      },
      {
        heading: "Room types",
        table: {
          columns: ["Room", "What happens there"],
          rows: [
            ["Start room", "You arrive here. No fight."],
            ["[[dungeons/combat-room|Combat room]]", "Doors close and monsters spawn in a wave."],
            ["[[dungeons/store-room|Store room]]", "Buy potions, [[items/key|keys]], ammo and gear with [[items/coin|coins]]."],
            ["[[dungeons/prize-room|Prize room]]", "Peaceful: [[items/chests|chest]], [[dungeons/alchemist-room|Alchemist]] or [[dungeons/curse-room]], sometimes a [[dungeons/shrine-rooms|shrine]]."],
            ["[[dungeons/hard-room|Hard room]]", "A dead-end combat room with tougher monsters and a better chest."],
            ["[[dungeons/twist-rooms|Twist rooms]]", "Combat rooms with a rule: [[dungeons/gauntlet-room|Gauntlet]], Elite, Barricade, [[dungeons/bomb-rain-room|Bomb Rain]] or Champion."],
            ["Exit room", "The portal to the next floor."],
          ],
        },
      },
      {
        heading: "Floor sequence",
        paragraphs: [
          "A run is twelve floors. Floors 4, 8 and 12 are single [[dungeons/boss-floors|boss arenas]]; every other floor uses the layout above. Entering a floor above floor 1 heals you for 30% of your maximum health, and six of the floors begin with a [[mechanics/level-up-card-picks|card pick]].",
        ],
      },
    ],
    tags: ["Structure", "Floors"],
    related: [{ category: "dungeons", slug: "combat-room" }, { category: "dungeons", slug: "boss-floors" }, { category: "mechanics", slug: "the-run" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "level-up-card-picks" }],
  }),
  dg({
    slug: "combat-room",
    name: "Combat Room",
    subtitle: "Standard room",
    summary:
      "The basic room of every floor. Doors lock when you enter, one wave of monsters spawns, and clearing it opens the doors, heals you a little and leaves a chest.",
    infobox: [
      { label: "Floors", value: "All non-boss floors" },
      { label: "Boss", value: "None" },
      { label: "Monsters", value: "3-6 in one wave (4-7 in the [[dungeons/the-castle|Castle]])" },
      { label: "Reward", value: "Quality 0 chest, 5% heal" },
    ],
    sections: [
      {
        heading: "Flow",
        bullets: [
          "Step in and the doors shut. After about one second monsters start to appear, one beat at a time; some beats are small squads of two to four.",
          "A marker shows each spawn spot before the monster appears, and the room waits for monsters that are still spawning before counting it cleared.",
          "Defeat everyone and the doors open, a banner reads cleared, you heal 5% of your maximum health and a [[items/chests|chest]] appears at a spot in the room. See [[mechanics/room-clearing|Room clearing]].",
          "Every combat room has exactly one wave. Monster counts and kinds come from the biome.",
        ],
      },
      {
        heading: "Variants",
        paragraphs: [
          "A dead-end combat room can be a [[dungeons/hard-room|Hard room]], and on later floors a combat room can carry a rule such as a [[dungeons/gauntlet-room|Gauntlet]]. See [[dungeons/twist-rooms|Twist rooms]].",
        ],
      },
    ],
    tags: ["Room", "Combat"],
    related: [{ category: "mechanics", slug: "room-clearing" }, { category: "dungeons", slug: "hard-room" }, { category: "items", slug: "chests" }],
  }),
  dg({
    slug: "hard-room",
    name: "Hard Room",
    subtitle: "Dead-end combat room",
    summary:
      "One dead-end combat room on a floor is marked with a skull and holds half again as many monsters. Its chest is one quality higher than normal.",
    infobox: [
      { label: "Floors", value: "Non-boss floors" },
      { label: "Boss", value: "None" },
      { label: "Monsters", value: "1.5 times the normal number" },
      { label: "Reward", value: "Quality 1 chest (quality 2 for an Elite room)" },
    ],
    sections: [
      {
        heading: "How it is picked",
        paragraphs: [
          "When a floor is built, a [[dungeons/combat-room|combat room]] with only one door (a dead end) is turned into the floor's Hard room, marked with a skull icon. Only one room per floor gets this. You are free to skip it, since it is off the main path.",
        ],
      },
      {
        heading: "What changes",
        bullets: [
          "The wave has 1.5 times as many monsters.",
          "The clear [[items/chests|chest]] is quality 1, which has a better rarity table and can drop [[items/element-stone|Element Stones]]. In an [[dungeons/elite-room|Elite room]] it is quality 2.",
        ],
      },
    ],
    tags: ["Room", "Combat", "Risk"],
    related: [{ category: "dungeons", slug: "combat-room" }, { category: "dungeons", slug: "elite-room" }, { category: "items", slug: "chests" }, { category: "items", slug: "element-stone" }],
  }),

  // ───────────────────────────── Boss floors ─────────────────────────────
  dg({
    slug: "boss-floors",
    name: "Boss Floors",
    subtitle: "Floors 4, 8 and 12",
    summary:
      "Every fourth floor is a single arena with one boss. There are no stores, shrines or Prize rooms there; beating the boss drops a boss chest and opens the portal.",
    image: pic("boss-floors.jpg", "The name card of the Skeleton Seeker boss", "The boss name card: Skeleton Seeker, Keeper of the Bone Throne."),
    infobox: [
      { label: "Floors", value: "4, 8 and 12" },
      { label: "Boss", value: "Normal: [[bosses/skeleton-seeker]] or [[bosses/old-guardian]], [[bosses/heavy-knight]], [[bosses/vegeful]]. Hard: [[bosses/ghost-king]] or Old Guardian, [[bosses/desert-hunter]], Vegeful" },
      { label: "Reward", value: "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]], the portal" },
    ],
    sections: [
      {
        heading: "Boss schedule",
        table: {
          columns: ["Floor", "Normal mode", "Hard mode"],
          rows: [
            ["4", "Skeleton Seeker or [[bosses/old-guardian]]", "[[bosses/ghost-king]] or Old Guardian"],
            ["8", "[[bosses/heavy-knight]]", "[[bosses/desert-hunter]]"],
            ["12", "[[bosses/vegeful]]", "Vegeful"],
          ],
        },
        paragraphs: [
          "The first three solo Normal visits to floor 4 always give the [[bosses/skeleton-seeker]], so the first fight is the same for everyone. After that the floor 4 boss is picked at random from its list.",
        ],
      },
      {
        heading: "The arena",
        bullets: [
          "The floor is one room. You arrive with the doors open and the fight begins when you walk in.",
          "A name card with the boss's title introduces it, and each phase starts with a banner.",
          "No store, no [[dungeons/prize-room|Prize room]] and no [[dungeons/shrine-rooms|shrine]] exist on a boss floor, and no random [[dungeons/twist-rooms|twist rooms]] either. Come in stocked.",
          "No [[mechanics/ads|forced ad]] plays on a boss floor.",
        ],
      },
      {
        heading: "After the kill",
        bullets: [
          "The boss drops a handful of [[items/sand-clock|Sand Clocks]] and the [[items/boss-chest|boss chest]] with an Epic or Legendary item and one [[items/gold]].",
          "The portal opens. On floors 4 and 8 it leads to the next biome; on floor 12 the run is complete. See [[mechanics/the-run|The run]].",
        ],
      },
    ],
    tags: ["Boss", "Structure"],
    related: [{ category: "items", slug: "boss-chest" }, { category: "dungeons", slug: "the-lab" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "mechanics", slug: "the-run" }],
  }),

  // ───────────────────────────── Special rooms ─────────────────────────────
  dg({
    slug: "prize-room",
    name: "Prize Room",
    subtitle: "Peaceful dead-end room",
    summary:
      "A quiet room with no enemies, attached to most non-boss floors. It holds a chest, the Alchemist or a Curse Room, and sometimes a shrine.",
    image: pic("prize-room.jpg", "A small Prize room with a locked chest and a hint line", "A Prize room: a locked chest in the middle."),
    infobox: [
      { label: "Floors", value: "1-3, 5-7 always; 9-11 on 70% of floors" },
      { label: "Boss", value: "None" },
      { label: "Contents", value: "Chest, Alchemist or Curse Room; shrine on about a third of rooms" },
    ],
    sections: [
      {
        heading: "Variants",
        table: {
          columns: ["Variant", "Share", "What it offers"],
          rows: [
            ["Chest room", "About 50%", "A chest that may be locked; its quality is rolled on opening (see [[items/chests|Chests]])"],
            ["[[dungeons/alchemist-room|Alchemist]]", "About 30%", "A [[mechanics/crafting|crafting]] NPC beside an anvil"],
            ["[[dungeons/curse-room|Curse Room]]", "About 20%", "A [[items/cursed-skull]] on a podium, for a curse"],
          ],
        },
        paragraphs: [
          "The shares come from the biome's room table and the design notes. The [[dungeons/the-castle|Castle]] has an extra variant, and its Alchemist share is 20%.",
        ],
      },
      {
        heading: "Shrines",
        paragraphs: [
          "On floors other than the [[dungeons/boss-floors|boss floors]], about a third of the rolled Prize rooms also hold an altar, a Blood shrine or a Gold shrine. See [[dungeons/shrine-rooms|Shrine rooms]].",
        ],
      },
      {
        heading: "Locked chests and keys",
        paragraphs: [
          "Prize [[items/chests|chests]] can be locked. Stand beside the chest and press the hand button with a [[items/key]] in the [[mechanics/inventory-and-bag|bag]]. Locked chests make the room orange on the minimap. See [[items/locked-chest|Locked chest]].",
        ],
      },
    ],
    tags: ["Room", "Peaceful"],
    related: [{ category: "dungeons", slug: "shrine-rooms" }, { category: "dungeons", slug: "curse-room" }, { category: "items", slug: "locked-chest" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "crafting" }],
  }),
  dg({
    slug: "store-room",
    name: "Store Room",
    subtitle: "Coin shop",
    summary:
      "A yellow room on the minimap where coins buy potions, keys, ammo and three random gear items. Prices rise a little with the floor.",
    infobox: [
      { label: "Floors", value: "1-3, 5-7 always; 9-11 on 60% of floors" },
      { label: "Boss", value: "None" },
      { label: "Stock", value: "Ammo Box, Key and Health Potion plus 3 random items" },
    ],
    sections: [
      {
        heading: "Stock",
        bullets: [
          "Three fixed slots: an [[items/ammo-box|Ammo Box]], a [[items/key|Key]] and a [[items/health-potion|Health Potion]].",
          "Three random slots that roll a rarity (65% Common, 20% Rare, 10% Epic, 5% Legendary) and then pick a matching item. Coins and money items are re-rolled; [[items/cursed-skull]], [[items/lazy-turtle]] and [[items/heavy-shield]] are never offered.",
        ],
      },
      {
        heading: "Prices",
        paragraphs: [
          "The price is a base price plus 10% of the base for each floor: Common 12, Rare 24, Epic 48 and Legendary 90 before the floor bonus. For example an Epic item on floor 6 costs 48 + 28 = 76 (derived). You need a free bag cell to buy.",
        ],
      },
      {
        heading: "Notes",
        bullets: [
          "Only the dungeon store takes [[items/coin|coins]]. The hub store uses [[items/gem|gems]] and real money; see [[mechanics/store-and-purchases|Store and purchases]].",
          "The store is the cheapest source of [[items/key|keys]] for [[items/locked-chest|locked chests]].",
          "Floors 4, 8 and 12 have no store.",
        ],
      },
    ],
    tags: ["Room", "Shop"],
    related: [{ category: "items", slug: "coin" }, { category: "items", slug: "item-rarity" }, { category: "mechanics", slug: "shop-prices" }],
  }),
  dg({
    slug: "shrine-rooms",
    name: "Shrine Rooms",
    subtitle: "Blood and Gold shrines",
    summary:
      "An altar glows in about a third of the Prize rooms. The Blood shrine trades health for a card upgrade, and the Gold shrine sells a rare-or-better item for coins.",
    image: pic("shrine-rooms.jpg", "The card picker of the Blood shrine", "The Blood shrine card picker: pay 30 HP and choose one upgrade."),
    infobox: [
      { label: "Floors", value: "1-3, 5-7 and 9-11" },
      { label: "Boss", value: "None" },
      { label: "Kinds", value: "Blood (HP) and [[items/gold]] ([[items/coin|coins]])" },
    ],
    sections: [
      {
        heading: "Blood shrine",
        bullets: [
          "Costs 30% of your current health, but never less than 10% of your maximum and never enough to leave you under 20% of your maximum.",
          "In return you pick one of up to three cards from the same pool as the level-up cards, limited to powers that can still be raised. See [[mechanics/level-up-card-picks|Level-up card picks]].",
          "Floor 1 only has Blood shrines. Back or walking away closes the picker for free, and the same cards come back when you return.",
        ],
      },
      {
        heading: "Gold shrine",
        bullets: [
          "Shows a rare-or-better item first, with its name and rarity. Tap again to confirm and pay.",
          "The price is 27 [[items/coin|coins]] times (1 + 0.15 per floor), rounded to the nearest 5, at least 25: for example 30 on floor 1, 40 on floor 3, 45 on floor 5 and 65 on floor 9 (derived).",
          "Rarity weights: floors 1-3 are 72 Rare, 26 Epic and 2 Legendary; floors 4-7 are 58, 36 and 6; floors 9-11 are 45, 43 and 12.",
          "Trade-off items ([[items/cursed-skull]], [[items/lazy-turtle]], [[items/heavy-shield]]) and Curse Bullets are never offered. You need a free bag cell.",
        ],
      },
      {
        heading: "How often",
        paragraphs: [
          "Each [[dungeons/prize-room|Prize room]]'s seeded roll gives an altar with about 32% probability. From floor 2 up, half of altars are Blood and half [[items/gold]]. Each altar works once. Altars are placed away from the doors, and Blood altars glow red, Gold altars near white on the minimap.",
        ],
      },
    ],
    tags: ["Room", "Shrine"],
    related: [{ category: "dungeons", slug: "prize-room" }, { category: "mechanics", slug: "level-up-card-picks" }, { category: "items", slug: "enchantments" }, { category: "items", slug: "gold" }],
  }),
  dg({
    slug: "curse-room",
    name: "Curse Room",
    subtitle: "Prize room variant",
    summary:
      "A Prize room with a Cursed Skull on a podium. It costs no coins: the price is a curse that makes you take double damage for the next couple of floors.",
    infobox: [
      { label: "Floors", value: "Prize room floors" },
      { label: "Boss", value: "None" },
      { label: "Reward", value: "A Cursed Skull" },
      { label: "Price", value: "A curse (double damage taken)" },
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Pick up the skull and a message says you have been cursed. The item itself is [[items/cursed-skull|Cursed Skull]], which already boosts your damage and the damage you take.",
          "While cursed, every hit you take is doubled. Healing is not doubled: potions, life steal and heal [[items/artifacts|artifacts]] work as normal.",
          "The curse is set to end two floors after the one where you took it. The message text says it lasts until the end of the next level, so treat it as a short, floor-long risk.",
          "It is saved with the run, so Continue keeps it.",
          "A curse is on you alone; in [[mechanics/co-op-multiplayer|co-op]] every player decides for themselves.",
        ],
      },
      {
        heading: "Is it worth it?",
        paragraphs: [
          "A skull gives up to triple damage, which carries a boss fight, but stacked with the curse and a x4 skull you can be killed in two hits. Take it only with a [[mechanics/health-shield-and-dodge|shield]], a [[items/shield-spell]] or [[items/armor|armor]] with lots of dodge.",
        ],
      },
    ],
    tags: ["Room", "Curse", "Trade-off"],
    related: [{ category: "items", slug: "cursed-skull" }, { category: "dungeons", slug: "prize-room" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "items", slug: "shield-spell" }],
  }),
  dg({
    slug: "alchemist-room",
    name: "Alchemist Room",
    subtitle: "Prize room variant",
    summary:
      "A Prize room with an Alchemist standing next to an anvil. The Alchemist crafts upgrades, but the same recipes are open from your bag anywhere.",
    infobox: [
      { label: "Floors", value: "Prize room floors" },
      { label: "Boss", value: "None" },
      { label: "Offers", value: "Crafting" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "A hint line says \"Find the Alchemist by an anvil in some rooms to craft\". The Alchemist uses exactly the same craft transaction as the [[items/recipes|recipe]] book in your [[mechanics/inventory-and-bag|bag]], so there is no price difference, and since recipes now work anywhere the Alchemist is a convenience, not a requirement. See [[mechanics/crafting|Crafting]].",
          "Its share of [[dungeons/prize-room|Prize rooms]] is about 30% (20% in the [[dungeons/the-castle|Castle]]).",
        ],
      },
    ],
    tags: ["Room", "Crafting"],
    related: [{ category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "prize-room" }, { category: "items", slug: "recipes" }, { category: "mechanics", slug: "inventory-and-bag" }],
  }),

  // ───────────────────────────── Twist rooms ─────────────────────────────
  dg({
    slug: "twist-rooms",
    name: "Twist Rooms",
    subtitle: "Rule-changing combat rooms",
    summary:
      "From floor 2 on, a share of combat rooms carries a twist: a Gauntlet, Elite, Barricade, Bomb Rain or Champion room. A banner at the door tells you which, and the harder ones pay a better chest.",
    infobox: [
      { label: "Floors", value: "2-3, 5-7 and 9-11" },
      { label: "Boss", value: "None" },
      { label: "Kinds", value: "Gauntlet, Elite, Barricade, Bomb Rain, Champion" },
    ],
    sections: [
      {
        heading: "Chance per floor",
        table: {
          columns: ["Floor", "Share of combat rooms with a twist"],
          rows: [
            ["1", "None"],
            ["2", "25%"],
            ["3", "30%"],
            ["5", "30%"],
            ["6 and 7", "40%"],
            ["9", "35%"],
            ["10", "45%"],
            ["11", "40%"],
            ["4, 8, 12", "None ([[dungeons/boss-floors|boss floors]])"],
          ],
        },
        paragraphs: [
          "[[mechanics/difficulty-modes|Hard mode]] adds 5 points, up to 55%. At most two twist rooms appear on a floor, and at most one of them is a heavy one ([[dungeons/gauntlet-room|Gauntlet]], Elite or Champion). The plan of a floor is the same for every player in a [[mechanics/co-op-multiplayer|co-op]] room.",
        ],
      },
      {
        heading: "The five twists",
        table: {
          columns: ["Twist", "From floor", "Reward"],
          rows: [
            ["[[dungeons/barricade-room|Barricade]]", "2", "Normal [[items/chests|chest]]"],
            ["[[dungeons/gauntlet-room|Gauntlet]]", "3", "Bonus chest, quality 2"],
            ["[[dungeons/bomb-rain-room|Bomb Rain]]", "3", "Bonus chest, quality 1"],
            ["[[dungeons/elite-room|Elite]]", "5", "Clear chest quality 2"],
            ["[[dungeons/champion-room|Champion]]", "5", "Bonus chest, quality 2"],
          ],
        },
        paragraphs: [
          "Twists never appear in the first room after the start for Gauntlet and Elite, and none in the exit room. A twist that fails to start falls back to a plain room, so a floor never gets stuck.",
        ],
      },
    ],
    tags: ["Room", "Risk"],
    related: [{ category: "dungeons", slug: "gauntlet-room" }, { category: "dungeons", slug: "elite-room" }, { category: "dungeons", slug: "champion-room" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "mechanics", slug: "co-op-multiplayer" }],
  }),
  dg({
    slug: "gauntlet-room",
    name: "Gauntlet Room",
    subtitle: "Twist room - extra rounds",
    summary:
      "A room that spawns extra rounds of monsters one after another, with the banner \"Hold the line!\". Surviving it pays a quality 2 bonus chest.",
    image: pic("gauntlet-room.jpg", "The Gauntlet banner in a room", "The Gauntlet banner: 2 rounds. Hold the line!"),
    infobox: [
      { label: "Floors", value: "From floor 3" },
      { label: "Boss", value: "None" },
      { label: "Rounds", value: "One extra (two extra on some floor 7, 9 and 10 [[dungeons/the-jungle|Jungle]] and [[dungeons/the-sand-ruins|Sand Ruins]] rooms)" },
      { label: "Reward", value: "Bonus chest, quality 2" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "The banner shows the number of rounds. A round counter reads ROUND 1/2 and so on.",
          "Normally the room adds one round, so two in total. On floors 7, 9 and 10 in the [[dungeons/the-jungle|Jungle]] or [[dungeons/the-sand-ruins|Sand Ruins]], about a third of Gauntlets add two.",
          "A Gauntlet is never the first room after the start.",
          "A room with two extra rounds also drops a potion.",
          "Clearing it pays a bonus [[items/chests|chest]] of quality 2, in addition to the normal clear chest.",
        ],
      },
    ],
    tags: ["Room", "Twist"],
    related: [{ category: "dungeons", slug: "twist-rooms" }, { category: "items", slug: "health-potion" }, { category: "items", slug: "chests" }],
  }),
  dg({
    slug: "elite-room",
    name: "Elite Room",
    subtitle: "Twist room - stronger foes",
    summary:
      "A room whose guards include elites: enemies promoted to at least two health bars, a bigger body and 1.5 times the damage. It pays a quality 2 chest.",
    image: pic("elite-room.jpg", "A room with elite enemies marked in a Jungle floor", "An Elite room on floor 7."),
    infobox: [
      { label: "Floors", value: "From floor 5" },
      { label: "Boss", value: "None" },
      { label: "Elites", value: "1 (2 from floor 7)" },
      { label: "Reward", value: "Clear chest, quality 2" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "The banner reads ELITE ROOM: stronger foes guard this room.",
          "The elites are picked from the monsters the room already spawns. Each has at least two health bars, is 25% bigger and hits 1.5 times as hard.",
          "One elite on floors 5 and 6, two from floor 7.",
          "In [[mechanics/co-op-multiplayer|co-op]] there are no elites. The room plays as a plain [[dungeons/hard-room|hard room]].",
          "The clear [[items/chests|chest]] is quality 2 instead of the normal quality 0, which also has the best chance of an Epic item.",
        ],
      },
    ],
    tags: ["Room", "Twist", "Risk"],
    related: [{ category: "dungeons", slug: "twist-rooms" }, { category: "dungeons", slug: "hard-room" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "co-op-multiplayer" }],
  }),
  dg({
    slug: "barricade-room",
    name: "Barricade Room",
    subtitle: "Twist room - cover",
    summary:
      "A combat room scattered with cover. The banner says to use the cover, and the wooden crates in it break when hit.",
    image: pic("barricade-room.jpg", "The Barricade banner above a room full of crates", "The Barricade banner: use the cover, crates break."),
    infobox: [
      { label: "Floors", value: "From floor 2" },
      { label: "Boss", value: "None" },
      { label: "Reward", value: "[[items/chests|Normal chest]]" },
    ],
    sections: [
      {
        heading: "Rules",
        paragraphs: [
          "The Barricade is the [[dungeons/twist-rooms|twist]]. Barriers and crates block shots, which lets you break line of sight with ranged enemies, but wooden crates are destroyed when hit. It pays nothing extra, so its pick weight is deliberately lower than the others'.",
        ],
      },
    ],
    tags: ["Room", "Twist"],
    related: [{ category: "dungeons", slug: "twist-rooms" }, { category: "dungeons", slug: "bomb-rain-room" }, { category: "enemies", slug: "bestiary-overview" }, { category: "items", slug: "chests" }],
  }),
  dg({
    slug: "bomb-rain-room",
    name: "Bomb Rain Room",
    subtitle: "Twist room - falling bombs",
    summary:
      "Bombs rain down all fight long, shown first as red circles on the floor. Move out of each circle before it detonates.",
    image: pic("bomb-rain-room.jpg", "Red bomb circles on the floor of a room", "Red circles mark where bombs will land."),
    infobox: [
      { label: "Floors", value: "From floor 3" },
      { label: "Boss", value: "None" },
      { label: "Tiers", value: "1 (floors up to 4), 2 (up to 8), 3 (9 and up)" },
      { label: "Reward", value: "Bonus chest, quality 1, for a spotless room" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "A banner reads BOMB RAIN: watch the red circles.",
          "The rain gets denser with the floor tier.",
          "A [[items/cursed-skull]] multiplies the bomb damage you take the same way it multiplies any other hit.",
          "Taking no bomb damage earns a bonus [[items/chests|chest]] of quality 1.",
        ],
      },
    ],
    tags: ["Room", "Twist"],
    related: [{ category: "dungeons", slug: "twist-rooms" }, { category: "items", slug: "cursed-skull" }, { category: "items", slug: "chests" }],
  }),
  dg({
    slug: "champion-room",
    name: "Champion Room",
    subtitle: "Twist room - mini boss",
    summary:
      "A room guarded by a single Champion: one huge monster with several health bars that enrages when hurt. It pays a quality 2 bonus chest.",
    image: pic("champion-room.jpg", "A champion enemy with a health bar in a Jungle room", "A Champion on floor 6."),
    infobox: [
      { label: "Floors", value: "From floor 5, except floor 11" },
      { label: "Boss", value: "None (a mini boss)" },
      { label: "Health bars", value: "3 on floors 5-8, 4 on floors 9-10" },
      { label: "Reward", value: "Bonus chest, quality 2" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "The banner reads CHAMPION: break its health bars.",
          "The Champion is made from a mobile single-bar monster of the biome, grown to 1.5 times size, with 1.5 times damage.",
          "It turns enraged partway through the fight (the toast reads \"The champion is enraged!\") and moves 25% faster.",
          "Champions only appear in the [[dungeons/the-jungle|Jungle]], [[dungeons/the-sand-ruins|Sand Ruins]] and [[dungeons/the-lab|Lab]], in the last room before the exit or in a side room, and never in [[mechanics/co-op-multiplayer|co-op]].",
        ],
      },
    ],
    tags: ["Room", "Twist", "Risk"],
    related: [{ category: "dungeons", slug: "twist-rooms" }, { category: "dungeons", slug: "elite-room" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "co-op-multiplayer" }],
  }),

  // ───────────────────────────── Inactive rooms ─────────────────────────────
  dg({
    slug: "vault-room",
    name: "Vault Room",
    subtitle: "Inactive feature",
    summary:
      "A planned empty Prize room holding one sealed, locked chest with a rare-or-better item. The code exists but the feature is switched off in current builds.",
    infobox: [
      { label: "Floors", value: "2-11 except boss floors (if enabled)" },
      { label: "Boss", value: "None" },
      { label: "Status", value: "Switched off" },
    ],
    sections: [
      {
        heading: "What it does",
        paragraphs: [
          "When enabled, about a fifth of the empty [[dungeons/prize-room|Prize rooms]] would hold a Sealed Vault: a locked chest whose single reward is a Rare, Epic or Legendary item, with the same weights as a [[dungeons/shrine-rooms|Gold shrine]]. A line on entry says a rare item or better is inside and your [[items/key]] opens it. Opening works like any [[items/locked-chest|locked chest]]. The feature is off in [[mechanics/co-op-multiplayer|co-op]].",
          "The flag that turns it on ships off, so you will not meet it in the current game.",
        ],
      },
    ],
    tags: ["Room", "Inactive"],
    related: [{ category: "dungeons", slug: "prize-room" }, { category: "dungeons", slug: "spring-room" }, { category: "items", slug: "key" }, { category: "items", slug: "locked-chest" }, { category: "mechanics", slug: "co-op-multiplayer" }],
  }),
  dg({
    slug: "spring-room",
    name: "Spring Room",
    subtitle: "Inactive feature",
    summary:
      "A planned empty Prize room with a small spring that heals 40% of your maximum health once. The code exists but the feature is switched off in current builds.",
    infobox: [
      { label: "Floors", value: "2-11 except boss floors (if enabled)" },
      { label: "Boss", value: "None" },
      { label: "Status", value: "Switched off" },
    ],
    sections: [
      {
        heading: "What it does",
        paragraphs: [
          "When enabled, roughly 15% of eligible empty [[dungeons/prize-room|Prize rooms]] would hold a spring. A tap on the hand button heals 40% of your maximum health, never more than you are missing, and the spring then dries up. A full-health hero is refused and the spring stays. It is free and off in [[mechanics/co-op-multiplayer|co-op]]. The flag is off in current builds.",
        ],
      },
    ],
    tags: ["Room", "Inactive"],
    related: [{ category: "dungeons", slug: "vault-room" }, { category: "dungeons", slug: "prize-room" }, { category: "mechanics", slug: "room-clearing" }, { category: "mechanics", slug: "co-op-multiplayer" }],
  }),

  // ───────────────────────────── Hub and tutorial ─────────────────────────────
  dg({
    slug: "the-hub-island",
    name: "The Hub Island",
    subtitle: "Lobby (Prison)",
    summary:
      "The safe island you return to between runs. The Altar starts a run, the King shows achievements, the Trainer upgrades heroes and the reward chests and daily rewards wait on the shore.",
    image: pic("the-hub-island.jpg", "The hub island at night with a torch and a hero", "The hub island by night."),
    infobox: [
      { label: "Floors", value: "None (safe lobby)" },
      { label: "Boss", value: "None" },
      { label: "Internal name", value: "Prison" },
      { label: "Services", value: "Altar, Totem, King, Trainer, Cultist, chests, shop" },
    ],
    sections: [
      {
        heading: "What is on the island",
        table: {
          columns: ["Place", "What it does"],
          rows: [
            ["Altar", "Step on it to open the [[mechanics/leaderboard|leaderboard]] and start a run. A short delay protects against accidental starts."],
            ["Totem", "Appears after your first Normal victory. Opens the Normal or Hard picker. See [[mechanics/difficulty-modes|Difficulty modes]]."],
            ["King", "Opens the achievements. See [[mechanics/achievements|Achievements]]."],
            ["Trainer", "Opens the hero, pet and effect panel and the stat upgrades. See [[mechanics/hero-training|Hero training]]."],
            ["Cultist", "Used to unlock gear. Now only answers that everything is unlocked."],
            ["Reward chests", "Three timed [[items/chests|chests]]. See [[items/reward-chests|Reward chests]]."],
            ["Daily reward and gift box", "See [[mechanics/daily-rewards|Daily rewards]]."],
            ["Store", "[[items/gem|Gems]], [[items/ethernal]] and real-money offers. See [[mechanics/store-and-purchases|Store and purchases]]."],
            ["Training dummy", "Hit it to see a live damage-per-second tag."],
          ],
        },
      },
      {
        heading: "Life on the island",
        bullets: [
          "Day and night follow your clock, and the lighting and torches change with it.",
          "A hall wall fills with banners as you defeat more bosses, and a record plaque shows your best clear times.",
          "NPCs say short lines in English or Vietnamese that depend on how far you have come: the King greets a champion, the [[mechanics/hero-training|Trainer]] suggests [[mechanics/difficulty-modes|Hard mode]] after your first win.",
          "Seagulls, a crab, jumping fish and breakable pots add life; they never affect gameplay.",
          "In the hub your guns fire free, so you can test any weapon on the dummy.",
        ],
      },
      {
        heading: "First visits",
        paragraphs: [
          "For your first three visits an arrow and a one-line hint point at the Altar. A starting-help flow replaces the old tutorial. See [[dungeons/the-tutorial|The Tutorial]].",
        ],
      },
    ],
    tags: ["Hub", "Lobby"],
    related: [{ category: "dungeons", slug: "the-tutorial" }, { category: "mechanics", slug: "hero-training" }, { category: "items", slug: "reward-chests" }, { category: "mechanics", slug: "difficulty-modes" }],
  }),
  dg({
    slug: "the-tutorial",
    name: "The Tutorial",
    subtitle: "First-run help",
    summary:
      "The original Tutorial scene is not part of current builds. New players instead get short hints that appear once each in the hub and the first dungeon floors.",
    infobox: [
      { label: "Floors", value: "Hub and early floors" },
      { label: "Boss", value: "None" },
      { label: "Status", value: "Tutorial scene disabled; hints replace it" },
    ],
    sections: [
      {
        heading: "What new players see",
        bullets: [
          "Hub: an arrow and a one-line hint pointing at the Altar, during the first three visits, until the altar has been used once.",
          "Floors: one tip per floor load, each shown once ever: first the weapon wheel (hold a finger), then [[mechanics/crafting|crafting]] (open the [[mechanics/inventory-and-bag|bag]], [[items/recipes]], then Craft).",
          "Event tips fire the first time the moment happens: using the skill button to dash, losing [[mechanics/health-shield-and-dodge|shield]], and picking up a potion.",
          "The [[mechanics/level-up-card-picks|level-up card]] screen carries a line: pick a card, then tap the same card again to confirm.",
          "Tips are labels, not pop-ups, so they cannot freeze a fight.",
        ],
      },
      {
        heading: "Scene",
        paragraphs: [
          "A Tutorial scene with a scripted [[items/chests|chest]] still exists in the project, but it is disabled in the build list. The settings menu has a Tutorial tab with the older screenshots. See [[mechanics/controls|Controls]] for the buttons.",
        ],
      },
    ],
    tags: ["Tutorial", "Hub"],
    related: [{ category: "dungeons", slug: "the-hub-island" }, { category: "mechanics", slug: "controls" }, { category: "items", slug: "recipes" }, { category: "mechanics", slug: "crafting" }],
  }),
];
