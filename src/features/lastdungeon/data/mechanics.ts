import type { WikiArticle, WikiImage } from "../types";

const pic = (file: string, alt: string, caption?: string): WikiImage => ({
  src: `/ld/wiki/mechanics/${file}`,
  alt,
  caption,
  pixelated: false,
});

/** Shorthand so every article below is created in the "mechanics" category. */
const mc = (a: Omit<WikiArticle, "category">): WikiArticle => ({ category: "mechanics", ...a });

export const mechanics: WikiArticle[] = [
  // ───────────────────────────── The run ─────────────────────────────
  mc({
    slug: "the-run",
    name: "The Run",
    subtitle: "How a run is structured",
    summary:
      "A run takes you from the hub island through twelve dungeon floors with a boss on floors 4, 8 and 12. Death is permanent for the run, but gems, chest pieces and upgrades carry over.",
    infobox: [
      { label: "Floors", value: "12, with bosses on 4, 8 and 12" },
      { label: "Players", value: "1 (solo) or up to 3 (co-op)" },
      { label: "Start kit", value: "Revolver, Blue Sword, one Health Potion and the hero's skill" },
    ],
    sections: [
      {
        heading: "Flow of a run",
        bullets: [
          "Start: pick Single player on the start screen (the first launch asks you to accept the terms and enter a name). You arrive on the [[dungeons/the-hub-island|hub island]].",
          "Step on the Altar and start. A short loading screen builds floor 1.",
          "Each floor: clear the [[dungeons/combat-room|combat rooms]], spend [[items/coin|coins]] in the [[dungeons/store-room|store]], loot [[dungeons/prize-room|Prize rooms]], then take the portal in the exit room. See [[dungeons/floors-and-rooms|Floors and rooms]].",
          "Arriving on floors 2, 3, 5, 7, 9 and 11 opens a [[mechanics/level-up-card-picks|card pick]]. Arriving on any floor above 1 heals you 30%.",
          "Floors 4, 8 and 12 are [[dungeons/boss-floors|boss arenas]]. The boss's [[items/chests|chest]] and the portal appear when it dies.",
          "The run ends when you finish floor 12 (a win) or when your health reaches zero and you do not or cannot revive. See [[mechanics/revive|Revive]].",
        ],
      },
      {
        heading: "Starting kit",
        paragraphs: [
          "Every new run clears your [[mechanics/inventory-and-bag|bag]] and gives you a [[weapons/revolver-mk-1|Revolver]] (unlimited ammo), a [[weapons/blue-sword]] and a [[items/health-potion|Health Potion]]. The [[mechanics/ammo-pool|ammo pool]] resets to full. Your hero's skill arrives as an [[items/artifacts|artifact]] in its own slot and does not take up bag space. Heroes, their stats and the upgrades you bought in the [[dungeons/the-hub-island|hub]] are kept between runs. See [[mechanics/hero-training|Hero training]].",
        ],
      },
      {
        heading: "What persists",
        table: {
          columns: ["Kept after a run", "Lost after a run"],
          rows: [
            ["[[items/gem|Gems]], [[items/ethernal]], [[mechanics/achievements|achievements]], [[mechanics/hero-training|hero training]], unlocked heroes", "Bag, weapons, [[items/armor|armor]], [[items/coin|coins]], [[items/element-stone|Element Stones]]"],
            ["[[items/chests|Chest]] pieces and [[items/reward-chests|reward chests]]", "[[mechanics/level-up-card-picks|Level-up cards]] and [[items/enchantments|enchantments]]"],
            ["Best times and the Hard unlock", "The floor, health and any curse"],
          ],
        },
      },
      {
        heading: "Run end",
        paragraphs: [
          "A win or a death leads to the results screen: [[items/gem|gems]] earned, score, a progress bar for [[items/reward-chests|reward chest]] pieces and a button to double the gems by watching an ad. From there you return to the [[dungeons/the-hub-island|hub]], or tap Play again to start a new solo run at once. See [[mechanics/run-rewards|Run rewards]].",
        ],
      },
    ],
    tags: ["Core", "Structure"],
    related: [{ category: "dungeons", slug: "floors-and-rooms" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "mechanics", slug: "save-and-continue" }, { category: "items", slug: "chests" }, { category: "dungeons", slug: "boss-floors" }],
  }),
  mc({
    slug: "difficulty-modes",
    name: "Difficulty Modes",
    subtitle: "Normal and Hard",
    summary:
      "The game offers Normal and Hard. Hard unlocks after your first Normal victory and swaps in the Castle and Sand Ruins, with much tougher monsters, a x1.25 score and x1.5 gems.",
    infobox: [
      { label: "Modes", value: "Normal, Hard" },
      { label: "Hard unlock", value: "Clear a Normal run" },
      { label: "Monster HP and damage", value: "x1.9 in Hard (solo)" },
    ],
    sections: [
      {
        heading: "Normal and Hard",
        table: {
          columns: ["", "Normal", "Hard"],
          rows: [
            ["Floors 1-4", "[[dungeons/the-dungeon|The Dungeon]]", "[[dungeons/the-castle|The Castle]]"],
            ["Floors 5-8", "[[dungeons/the-jungle|The Jungle]]", "[[dungeons/the-sand-ruins|The Sand Ruins]]"],
            ["Floors 9-12", "[[dungeons/the-lab|The Lab]]", "[[dungeons/the-lab|The Lab]]"],
            ["Bosses", "[[bosses/skeleton-seeker]] or [[bosses/old-guardian]], [[bosses/heavy-knight]], [[bosses/vegeful]]", "[[bosses/ghost-king]] or Old Guardian, [[bosses/desert-hunter]], Vegeful"],
            ["Monster health and damage", "Base", "Both x1.9"],
            ["Score", "x1", "x1.25"],
            ["[[items/gem|Gems]] at run end", "x1", "x1.5"],
            ["Run mutator", "None", "One of Frenzied, Shielded or Vampiric, named in a banner (solo only)"],
          ],
        },
      },
      {
        heading: "Unlocking Hard",
        paragraphs: [
          "Beat the game once in Normal mode and a Totem appears on the [[dungeons/the-hub-island|hub island]]. Click it to open the picker and choose Normal or Hard. Until then Hard is locked, and the game says you have not unlocked the mode. In [[mechanics/co-op-multiplayer|co-op]] the host picks the mode as a room property.",
        ],
      },
      {
        heading: "Floor scaling",
        paragraphs: [
          "In solo play monsters grow with the floor: about +23% health and +24% damage per floor over floor 1 in the current release tuning (co-op still uses the older +13% and +18%). A co-op room also adds +35% monster health and +25% damage per extra player. See [[mechanics/co-op-multiplayer|Co-op multiplayer]].",
          "Enemy aim also sharpens: in Hard it leads your movement more and scatters less.",
        ],
      },
      {
        heading: "Separate boards",
        paragraphs: [
          "Normal and Hard keep separate [[mechanics/leaderboard|leaderboards]] and separate speedrun [[mechanics/achievements|achievements]]. Two more difficulty names exist in the code but are not offered.",
        ],
      },
    ],
    tags: ["Core", "Difficulty"],
    related: [{ category: "dungeons", slug: "the-castle" }, { category: "dungeons", slug: "the-hub-island" }, { category: "mechanics", slug: "the-run" }, { category: "dungeons", slug: "the-lab" }],
  }),
  mc({
    slug: "room-clearing",
    name: "Room Clearing",
    subtitle: "What a cleared room gives",
    summary:
      "Clearing a combat room opens its doors, heals you 5% of your maximum health and spawns a chest. Arriving on a new floor also heals 30%.",
    infobox: [
      { label: "Heal on room clear", value: "5% of max health" },
      { label: "Heal on new floor", value: "30% (floors above 1)" },
      { label: "Reward", value: "Chest, quality 0 (higher for Hard and twist rooms)" },
    ],
    sections: [
      {
        heading: "Rewards",
        bullets: [
          "Doors reopen, a CLEARED banner shows and ammo still on the floor flies to you. See [[mechanics/ammo-pool|Ammo pool]].",
          "You heal 5% of your maximum health. The floor-entry heal is 30% and applies only when you arrive through the portal, never when you resume a saved run.",
          "A [[items/chests|chest]] appears at a spot in the room, not where the last enemy died. It ignores stray bullets for a moment.",
          "In [[mechanics/co-op-multiplayer|co-op]], a dead teammate is revived when the room is cleared. See [[mechanics/revive|Revive]].",
        ],
      },
      {
        heading: "Bonuses",
        paragraphs: [
          "A [[dungeons/hard-room|Hard room]] pays a quality 1 [[items/chests|chest]], and [[dungeons/twist-rooms|twist rooms]] add bonus chests on top. Your pity counter advances with every chest. See [[mechanics/pity-chests|Pity chests]].",
        ],
      },
    ],
    tags: ["Core", "Rooms"],
    related: [{ category: "dungeons", slug: "combat-room" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "revive" }, { category: "dungeons", slug: "hard-room" }],
  }),

  // ───────────────────────────── Loot, economy and crafting ─────────────────────────────
  mc({
    slug: "loot-drops",
    name: "Loot Drops",
    subtitle: "What enemies and bosses leave behind",
    summary:
      "Enemies drop coins, potions, keys and ammo rounds at low rates. Bosses always leave Sand Clocks and a boss chest.",
    infobox: [
      { label: "Coin", value: "About 1.7% of kills" },
      { label: "Potion", value: "About 6% of kills" },
      { label: "Key", value: "About 0.17% of kills" },
    ],
    sections: [
      {
        heading: "The kill roll",
        paragraphs: [
          "When an enemy dies the game picks one of six drop slots at random and then rolls the slot's own percentage. That gives the per-kill chances below (derived by dividing each slot chance by six).",
        ],
        table: {
          columns: ["Slot", "Item", "Slot chance", "Per kill"],
          rows: [
            ["Coin", "[[items/coin|Coin]]", "10%", "About 1.7%"],
            ["Potion", "[[items/health-potion|Health Potion]]", "36%", "About 6%"],
            ["Key", "[[items/key|Key]]", "1%", "About 0.17%"],
          ],
        },
      },
      {
        heading: "Ammo",
        paragraphs: [
          "The old ammo box slots are gone: enemies instead have a 45% chance to drop two to four loose rounds worth 10 units each. See [[mechanics/ammo-pool|Ammo pool]]. [[mechanics/level-up-card-picks|Level-up cards]] that help looting raise this chance.",
        ],
      },
      {
        heading: "Bosses",
        paragraphs: ["Each boss spawns [[items/sand-clock|Sand Clocks]] and, once it is dead, a [[items/boss-chest|boss chest]]. Most gear comes from [[items/chests|chests]] and the [[dungeons/store-room|store]], not from kills."],
      },
    ],
    tags: ["Economy", "Loot"],
    related: [{ category: "items", slug: "chests" }, { category: "items", slug: "health-potion" }, { category: "mechanics", slug: "ammo-pool" }, { category: "items", slug: "boss-chest" }],
  }),
  mc({
    slug: "pity-chests",
    name: "Pity Chests",
    subtitle: "Bad-luck protection",
    summary:
      "If you are still carrying weak gear and several room chests in a row hold nothing better, the next chest is forced to contain an upgrade, with armor first when you wear none.",
    infobox: [
      { label: "Applies to", value: "Solo run chests of quality 0 and 1" },
      { label: "Trigger", value: "5 dry chests (8 after your first upgrade)" },
      { label: "Only when", value: "You are behind for the floor" },
    ],
    sections: [
      {
        heading: "The rule",
        bullets: [
          "A [[items/chests|chest]] \"gives an upgrade\" if it holds a Rare or better weapon with at least 15% more damage than your best, an [[items/armor|armor]] when you wear none or one scoring over 25% higher, or an Epic or better [[items/artifacts|artifact]] or passive you do not own.",
          "Each chest without an upgrade adds to a counter. The chest that would be the fifth without an upgrade (the eighth once you have had your first) is forced to be one, but only while you are \"behind\".",
          "Behind means your best weapon's paper damage is below 16 on floors 1-3, 24 on floors 4-7 or 32 from floor 8 (measured at 10 attack).",
          "A hero who is not behind never gets a forced item, but the counter keeps running.",
          "A forced armor is Common (60%), Rare (25%) or Epic (15%).",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "Quality 2 chests and the [[items/boss-chest|boss chest]] do not count. [[mechanics/co-op-multiplayer|Co-op]] chests do not use pity. See [[items/chests|Chests]].",
        ],
      },
    ],
    tags: ["Economy", "Loot"],
    related: [{ category: "items", slug: "chests" }, { category: "items", slug: "armor" }, { category: "items", slug: "boss-chest" }],
  }),
  mc({
    slug: "shop-prices",
    name: "Shop Prices",
    subtitle: "Dungeon store price table",
    summary:
      "A store item costs its rarity's base price plus 10% of that base for every floor you have reached, so the same item gets dearer as you descend.",
    infobox: [
      { label: "Bases", value: "12, 24, 48 and 90 [[items/coin|coins]]" },
      { label: "Floor bonus", value: "+10% of the base per floor" },
    ],
    sections: [
      {
        heading: "Price table (coins)",
        table: {
          columns: ["Floor", "Common", "Rare", "Epic", "Legendary"],
          rows: [
            ["1", "13", "26", "52", "99"],
            ["2", "14", "28", "57", "108"],
            ["3", "15", "31", "62", "117"],
            ["5", "18", "36", "72", "135"],
            ["6", "19", "38", "76", "144"],
            ["7", "20", "40", "81", "153"],
            ["9", "22", "45", "91", "171"],
            ["10", "24", "48", "96", "180"],
            ["11", "25", "50", "100", "189"],
          ],
        },
        paragraphs: [
          "Calculated from the dial values (base plus a truncated 0.1 x floor x base). The hub shop sells for [[items/gem|gems]] and keeps the original, higher prices. See [[dungeons/store-room|Store room]] and [[items/item-rarity|Item rarity]].",
        ],
      },
    ],
    tags: ["Economy", "Shop"],
    related: [{ category: "dungeons", slug: "store-room" }, { category: "items", slug: "coin" }, { category: "items", slug: "gem" }],
  }),
  mc({
    slug: "crafting",
    name: "Crafting",
    subtitle: "Upgrading items",
    summary:
      "Crafting turns the item you hold into its next version for some coins. The recipe book in your bag does it anywhere in the dungeon with one tap, and the step up to Legendary also asks for 2 Gold.",
    infobox: [
      { label: "Where", value: "Recipe book in the bag, or an Alchemist" },
      { label: "Cost", value: "15-45 [[items/coin|coins]]; 2 [[items/gold]] for Epic to Legendary" },
      { label: "Recipes", value: "69" },
    ],
    sections: [
      {
        heading: "How to craft",
        bullets: [
          "Open the [[mechanics/inventory-and-bag|bag]], open [[items/recipes]] and tap Craft on a row you can afford. The guide reads: open the bag, then Recipes, then Craft.",
          "A craft eats one copy of the base item, takes the [[items/coin|coins]] (and Gold) and puts the result in the same bag spot.",
          "If the consumed item was your held weapon, the result is equipped, and the same for worn [[items/armor|armor]]. If it was a spare, the result simply joins the bag.",
          "Each row shows what you have against what you need. Crafting is refused for missing items, missing coins or a full bag.",
          "The [[dungeons/alchemist-room|Alchemist]] uses the identical transaction.",
        ],
      },
      {
        heading: "Rules of the recipe book",
        bullets: [
          "Every [[items/recipes|recipe]] is one item plus [[items/coin|coins]]. No Iron, Wood or duplicates are needed any more.",
          "Prices follow the strength of the result: about 15-35 coins for weapons and [[items/armor|armor]], 20-30 for [[items/artifacts|artifacts]] and passives, 45 for any Legendary.",
          "Only the twelve Epic to Legendary steps need 2 [[items/gold|Gold]]. Gold only comes from [[items/boss-chest|boss chests]], so the first Legendary craft is possible after the floor 8 boss.",
          "An upgrade never lowers damage and never changes the family of an item.",
          "Some items branch: [[weapons/wooden-sword-iii|Wooden Sword]], [[weapons/staff|Staff]] and [[weapons/steel-anchor-i|Steel Anchor]] each lead to several results. Crafting consumes the original, so check the new stats first.",
        ],
      },
      {
        heading: "Full list",
        paragraphs: ["Every chain is on [[items/recipes|Recipes]]. Gold is on [[items/gold|Gold]]."],
      },
    ],
    tags: ["Economy", "Crafting"],
    related: [{ category: "items", slug: "recipes" }, { category: "items", slug: "gold" }, { category: "dungeons", slug: "alchemist-room" }],
  }),
  mc({
    slug: "ammo-pool",
    name: "Ammo Pool",
    subtitle: "Shared ammunition",
    summary:
      "Every limited gun refills from one shared pool of 1000 units. Enemies drop loose rounds, the store sells boxes that refill 400 units, and you start each run with a full pool.",
    infobox: [
      { label: "Pool size", value: "1000 units" },
      { label: "Box", value: "Refills 40% (400 units)" },
      { label: "Loose rounds", value: "10 units each, 2-4 per drop, 45% of kills" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "Guns keep their own magazines but reload from the pool. A freshly picked gun comes with a full magazine only.",
          "A shell costs a number of units that depends on the gun: about 2.4 divided by its ammo scale, clamped between 1 and 20 (derived).",
          "Enemies drop rounds (see [[mechanics/loot-drops|Loot drops]]); walking near them picks them up, and clearing a room pulls any that are left to you. Leftover rounds carry to the next floor.",
          "The [[items/ammo-box|Ammo Box]] is sold only in the [[dungeons/store-room|dungeon store]] and goes straight into the pool.",
          "Pity: if the pool is under 25% after a room, you get 15% back. The [[buffs/recycle]] card gives 10% of the pool.",
          "On the [[dungeons/the-hub-island|hub island]] shots are free. The pool belongs to the dungeon run.",
          "The [[weapons/revolver-mk-1|Revolver]] never uses ammo.",
        ],
      },
      {
        heading: "Co-op",
        paragraphs: ["Each player has their own pool and their own pickups; nothing is shared over the network."],
      },
    ],
    tags: ["Economy", "Ammo"],
    related: [{ category: "items", slug: "ammo-box" }, { category: "mechanics", slug: "loot-drops" }, { category: "dungeons", slug: "store-room" }, { category: "buffs", slug: "recycle" }],
  }),
  mc({
    slug: "currencies",
    name: "Currencies",
    subtitle: "Every kind of money",
    summary:
      "The game has run currencies you lose when the run ends and lasting currencies you keep. This page is the map of which is which.",
    infobox: [
      { label: "Run", value: "Coin, Element Stone, [[mechanics/ammo-pool|ammo pool]]" },
      { label: "Lasting", value: "[[items/gem]], [[items/ethernal]], chest pieces" },
    ],
    sections: [
      {
        heading: "Overview",
        table: {
          columns: ["Currency", "Kind", "Main use"],
          rows: [
            ["[[items/coin|Coin]]", "Run", "Store, [[dungeons/shrine-rooms|gold shrine]], [[mechanics/crafting|crafting]]; becomes gems when the run ends"],
            ["[[items/element-stone|Element Stone]]", "Run", "Item enchant upgrades (hidden)"],
            ["[[items/ammo-box|Ammo]]", "Run", "Reloading guns"],
            ["[[items/gem|Gem]]", "Lasting", "[[mechanics/hero-training|Hero training]], [[mechanics/revive|revive]], hub purchases"],
            ["[[items/ethernal|Ethernal]]", "Lasting, premium", "Premium heroes; exchangeable for gems"],
            ["[[items/chests|Chest]] pieces", "Lasting", "Unlock hub [[items/reward-chests|reward chests]]"],
            ["[[items/sand-clock|Sand Clock]]", "Lasting (legacy)", "No use now"],
          ],
        },
      },
    ],
    tags: ["Economy", "Overview"],
    related: [{ category: "items", slug: "gem" }, { category: "items", slug: "coin" }, { category: "items", slug: "chests" }],
  }),

  // ───────────────────────────── Combat basics ─────────────────────────────
  mc({
    slug: "health-shield-and-dodge",
    name: "Health, Shield and Dodge",
    subtitle: "How you survive",
    summary:
      "You have a health bar, a blue shield that takes damage first, and a dodge chance. Armor adds health and dodge, and healing never refills the shield.",
    infobox: [
      { label: "Health", value: "Hero health + armor + cards" },
      { label: "Shield", value: "Absorbs damage before health" },
      { label: "Dodge", value: "Armor + Lucky Bone + Lazy Turtle" },
    ],
    sections: [
      {
        heading: "Health",
        paragraphs: [
          "Your maximum health is your hero's health (raised by [[mechanics/hero-training|training]]) plus the worn [[items/armor|armor]] and any [[buffs/life-boot]] card. Free healing comes from [[items/health-potion|potions]], heal [[items/artifacts|artifacts]], life-steal effects, 5% on a room clear and 30% on a new floor. Healing restores health only.",
        ],
      },
      {
        heading: "Shield",
        bullets: [
          "The shield is the hero's energy pool. Every hit takes shield first, and only the rest reaches health.",
          "It recharges on its own: slowly in combat and quickly when no enemy is alive. In the current design the shield starts coming back about 8 seconds after a hit in a fight (about 0.5 per second) and about 3 seconds after a hit when no enemy is alive (about 8.5 per second).",
          "Clearing a room refunds a quarter of the pool, and each kill returns 1 shield point (half a point from floor 4 on). The numbers are from the game's balance dials.",
          "[[items/heavy-shield|Heavy Shield]] enlarges the pool and halves recovery.",
        ],
      },
      {
        heading: "Dodge",
        bullets: [
          "Each hit first rolls the dodge chance. Armor gives it directly, [[items/lucky-bone|Lucky Bone]] adds 5% or 8%, and [[items/lazy-turtle|Lazy Turtle]] gives its own 30% roll.",
          "Dashing with the hero skill button dodges bullets.",
          "After a hit you are briefly immune: 0.07 seconds, and 2.5 seconds after a [[mechanics/revive|revive]].",
        ],
      },
      {
        heading: "Curses",
        paragraphs: ["A [[dungeons/curse-room|curse]] doubles incoming damage but not healing."],
      },
    ],
    tags: ["Combat", "Survival"],
    related: [{ category: "items", slug: "armor" }, { category: "items", slug: "health-potion" }, { category: "mechanics", slug: "revive" }, { category: "buffs", slug: "life-boot" }],
  }),
  mc({
    slug: "level-up-card-picks",
    name: "Level-Up Card Picks",
    subtitle: "Choosing a card",
    summary:
      "On floors 2, 3, 5, 7, 9 and 11 the game pauses and offers three cards. You tap one to select it and tap it again to take it, and once per run you may reroll the three.",
    image: pic("level-up-card-picks.jpg", "Three upgrade cards on a dark screen: Dynamo, Swiftfooted and Electric", "The pick screen: tap a card, then tap the same card again to confirm."),
    infobox: [
      { label: "Picks per run", value: "6 (floors 2, 3, 5, 7, 9, 11) plus Blood shrines" },
      { label: "Choices", value: "3 cards; 1 free reroll per run (solo)" },
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "On arrival at one of the pick floors, the game stops and shows three cards. The line reads \"Pick one upgrade: tap a card\", and once one is selected, tap it again to confirm.",
          "The cards come from the catalog of [[items/enchantments|enchantments]] you can still raise. A card has up to three tiers, and taking it again raises it. Cards that can no longer be raised are not offered, and offers favor cards that suit the weapons you carry.",
          "One free reroll per run draws three new cards, never the same three. It is solo only.",
          "A Blood shrine adds one more pick for HP. See [[dungeons/shrine-rooms|Shrine rooms]].",
          "In [[mechanics/co-op-multiplayer|co-op]] the picks stay personal and time keeps running.",
          "The offered cards are saved, so quitting and resuming shows the same three. See [[mechanics/save-and-continue|Save and Continue]].",
        ],
      },
      {
        heading: "Card details",
        paragraphs: ["What each card does is covered under Buffs and Cards. The catalog itself is described on [[items/enchantments|Enchantments]]."],
      },
    ],
    tags: ["Core", "Build"],
    related: [{ category: "items", slug: "enchantments" }, { category: "dungeons", slug: "shrine-rooms" }, { category: "mechanics", slug: "the-run" }],
  }),
  mc({
    slug: "controls",
    name: "Controls",
    subtitle: "Touch controls",
    summary:
      "Movement is a thumb stick on the left. On the right are the attack button, a reload button, the skill button, a hand button for interacting and the weapon wheel on a long press.",
    image: pic("controls.jpg", "The in-game screen with joystick and buttons", "The mobile HUD: stick on the left, buttons on the right, weapon slots at the bottom."),
    infobox: [
      { label: "Move", value: "Left thumb stick (fixed or floating)" },
      { label: "Attack", value: "Large sword button; aim stick if auto aim is off" },
      { label: "Platform", value: "Mobile (touch)" },
    ],
    sections: [
      {
        heading: "Buttons",
        bullets: [
          "Move stick: the choice of a fixed or a floating stick is in the Settings, Control tab.",
          "Attack: a big button on the right; with auto aim off it becomes an aim stick. See [[mechanics/auto-aim|Auto aim]].",
          "Reload: a small arrow button, visible with guns.",
          "Skill (gear button): your hero's skill; the first tip says \"Tap the gear button to dash. Dashing [[mechanics/health-shield-and-dodge|dodges]] bullets.\"",
          "Hand button: appears next to [[items/chests|chests]], altars, shop items, NPCs and [[items/locked-chest|locked chests]]. Tap it to interact.",
          "Potion button: one tap drinks a potion; it refuses at 90% health or more.",
          "Weapon wheel: hold a finger on the screen to open it and pick another weapon.",
          "Bag and minimap: tap the bag icon to open the [[mechanics/inventory-and-bag|bag]]; tap the minimap to enlarge it. Pause is in the corner.",
        ],
      },
      {
        heading: "Notes",
        paragraphs: ["Vibration and camera shake can be toggled in Settings. See [[mechanics/settings|Settings]]."],
      },
    ],
    tags: ["Controls", "UI"],
    related: [{ category: "mechanics", slug: "auto-aim" }, { category: "mechanics", slug: "inventory-and-bag" }, { category: "mechanics", slug: "settings" }, { category: "items", slug: "chests" }, { category: "items", slug: "locked-chest" }],
  }),
  mc({
    slug: "auto-aim",
    name: "Auto Aim",
    subtitle: "Aiming setting",
    summary:
      "Auto aim is on by default. With it on, you tap the attack button and the hero aims for you; switch it off in [[mechanics/settings|Settings]] and the attack button turns into an aim stick.",
    infobox: [
      { label: "Default", value: "On" },
      { label: "Where", value: "Settings, [[mechanics/controls|Control tab]]" },
    ],
    sections: [
      {
        heading: "Behavior",
        bullets: [
          "On: a single attack button. The hero picks a target.",
          "Off: the attack button is replaced by a stick: push it to aim and fire in that direction.",
          "The change applies at once and is remembered. It applies to guns and melee alike.",
          "Enemy aim has its own tuning: enemies lead your movement a little, scatter a few degrees and get more accurate after several misses.",
        ],
      },
    ],
    tags: ["Controls"],
    related: [{ category: "mechanics", slug: "controls" }, { category: "mechanics", slug: "settings" }, { category: "weapons", slug: "revolver-mk-1" }, { category: "weapons", slug: "blue-sword" }],
  }),
  mc({
    slug: "inventory-and-bag",
    name: "Inventory and Bag",
    subtitle: "Carrying items",
    summary:
      "The bag holds 12 cells. Potions, Iron, Wood and Gold stack two to a cell, you wear one armor, and two artifacts sit in skill slots.",
    infobox: [
      { label: "Cells", value: "12" },
      { label: "Stacks", value: "2 per cell: Health Potion, Iron, Wood, [[items/gold]]" },
      { label: "Equipped", value: "1 armor, 2 artifacts, 1 weapon in hand" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "All bag slots are open from the start; the game no longer sells extra ones.",
          "Weapons, passives and [[items/key|keys]] use one cell each. A full bag blocks pickups, store purchases, [[dungeons/shrine-rooms|shrine]] rewards and [[mechanics/crafting|crafting]] that would add a cell.",
          "The hero's skill [[items/artifacts|artifact]] takes no cell.",
          "Open the bag from the HUD. Swipe left or right to see more weapons.",
          "Items can be sold for [[items/coin|coins]] or dropped.",
          "Holding a finger on the screen opens the weapon wheel for fast swaps.",
        ],
      },
      {
        heading: "Recipes",
        paragraphs: ["The [[items/recipes|recipe]] book is part of the bag. See [[mechanics/crafting|Crafting]]. Passive items need only to be carried. See [[items/passive-items|Passive items]]."],
      },
    ],
    tags: ["Core", "UI"],
    related: [{ category: "items", slug: "artifacts" }, { category: "items", slug: "armor" }, { category: "mechanics", slug: "crafting" }, { category: "items", slug: "recipes" }],
  }),

  // ───────────────────────────── Progression ─────────────────────────────
  mc({
    slug: "hero-training",
    name: "Hero Training",
    subtitle: "Permanent stat upgrades",
    summary:
      "At the Trainer in the hub you spend gems to raise a hero's health, speed, attack and shield step by step. Each hero keeps its own upgrades.",
    infobox: [
      { label: "Where", value: "Trainer on the hub island" },
      { label: "Currency", value: "[[items/gem|Gems]]" },
      { label: "Tracks", value: "Health, speed, attack, shield (energy)" },
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Each hero has four tracks with a minimum and a maximum. A purchase moves a track one step closer to the maximum.",
          "Example: the [[heroes/archer]]'s health runs from 100 to 225, speed from 70 to 90, attack from 10 to 20 and [[mechanics/health-shield-and-dodge|shield]] energy from 50 to 100. Each track has 30 steps costing 100 [[items/gem|gems]] per step, so maxing the Archer is about 12,000 gems (derived).",
          "Other heroes have their own ranges, step counts and prices.",
          "Upgrades are stored per hero. A new hero starts from their base stats.",
          "Heroes, pets and effects are chosen in the same panel.",
        ],
      },
      {
        heading: "Favor Light",
        paragraphs: [
          "After a streak of lost solo runs the game lends a temporary boost for the next run: extra training levels on health, attack and [[mechanics/health-shield-and-dodge|shield]], shown at the Altar. The cap is eight levels before you first defeat the floor 8 boss and four afterwards. You can switch it off. A run that used it does not count for the leaderboard. See [[mechanics/leaderboard|Leaderboard]].",
        ],
      },
      {
        heading: "Account-wide training",
        paragraphs: ["A shared training for all heroes exists in the code but is switched off."],
      },
    ],
    tags: ["Progression", "Hub"],
    related: [{ category: "items", slug: "gem" }, { category: "dungeons", slug: "the-hub-island" }, { category: "mechanics", slug: "run-rewards" }, { category: "heroes", slug: "archer" }],
  }),
  mc({
    slug: "run-rewards",
    name: "Run Rewards",
    subtitle: "Gems, score and chest pieces",
    summary:
      "When a run ends the game pays gems from your coins, score, damage and progress, adds chest pieces for floors cleared, and lets you double the gems by watching an ad.",
    infobox: [
      { label: "Coins to gems", value: "0.15 per [[items/coin|coin]]" },
      { label: "Score to gems", value: "0.04 per point" },
      { label: "Progress", value: "1.2 [[items/gem|gems]] per floor cleared + 3 per boss" },
    ],
    sections: [
      {
        heading: "Gem payout",
        table: {
          columns: ["Part", "Rate"],
          rows: [
            ["Coins carried", "0.15 [[items/gem|gems]] each"],
            ["Score", "0.04 gems per point"],
            ["Damage dealt", "0.005 gems per point"],
            ["Progress", "1.2 gems per floor cleared plus 3 per boss killed"],
          ],
        },
        bullets: [
          "Hard runs multiply the total by 1.5.",
          "A run that reached floor 3 is paid at least 35 gems.",
          "Your first few rewarded runs pay double (about the first 300 lifetime gems).",
          "The ad button on the results screen pays the reward a second time.",
        ],
      },
      {
        heading: "Score",
        paragraphs: [
          "Kills add points: Knockout 10, Critical 12 and 1 Shot 1 Kill 15 (from the game code). A completed run adds (40 minus minutes) x 10 points when it took under 40 minutes of active play. Hard multiplies the final score by 1.25. The score feeds the [[mechanics/leaderboard|leaderboard]].",
        ],
      },
      {
        heading: "Chest pieces",
        paragraphs: ["Each floor cleared gives one piece, at most 13 for a win. Three pieces unlock a [[items/reward-chests|reward chest]]."],
      },
      {
        heading: "Co-op",
        paragraphs: ["[[items/gem|Gems]] are still paid after a [[mechanics/co-op-multiplayer|co-op]] run, but the solo save is untouched and no score is submitted."],
      },
    ],
    tags: ["Progression", "Rewards"],
    related: [{ category: "items", slug: "gem" }, { category: "items", slug: "reward-chests" }, { category: "mechanics", slug: "leaderboard" }, { category: "items", slug: "coin" }],
  }),
  mc({
    slug: "achievements",
    name: "Achievements",
    subtitle: "16 lifetime goals",
    summary:
      "Sixteen lifetime goals, each with several tiers that pay gems or Ethernal. The King on the hub island shows them.",
    infobox: [
      { label: "Count", value: "16 achievements" },
      { label: "Rewards", value: "[[items/gem|Gems]] and [[items/ethernal]]" },
      { label: "Where", value: "The King, hub island" },
    ],
    sections: [
      {
        heading: "List",
        table: {
          columns: ["Achievement", "Goal", "Tiers (goal: reward)"],
          rows: [
            ["Monster Hunter", "Kill monsters", "100: 100 [[items/gem|gems]]; 250: 200; 500: 400; 1000: 800; 2000: 1600"],
            ["Boss Hunter", "Kill bosses", "10: 10 gems; 20: 10 [[items/ethernal]]; 30: 10 Ethernal"],
            ["Gem Collector", "Collect gems", "500: 100 gems; 1000: 200; 5000: 300"],
            ["Potion master", "Use healing potions", "50: 100 gems; 100: 200; 300: 10 Ethernal"],
            ["Magician", "Use magic from equipment", "100: 50 gems; 200: 100"],
            ["Item Collector", "Pick up items", "300: 300 gems; 1000: 1000; 2000: 2000; 4000: 4000"],
            ["Object Destroy", "Destroy objects", "100: 100 gems; 200: 200; 400: 400; 800: 800; 1600: 1600"],
            ["Vendor", "Sell items", "100: 3 Ethernal; 200: 3; 450: 2; 1000: 2"],
            ["Epic item collector", "Collect Epic items", "10: 1000 gems; 20: 1500; 50: 3000; 100: 6000; 1000: 100 Ethernal"],
            ["Legend item collector", "Collect Legendary items", "1: 2 Ethernal; 10: 2; 20: 5; 50: 10; 100: 10"],
            ["Winner", "Complete the game", "1: 5 Ethernal; 5: 5; 10: 1000 gems; 20: 2000; 40: 4000"],
            ["Speedrun (Normal)", "Finish under N minutes", "30: 300 gems; 20: 5 Ethernal; 15: 10; 10: 10"],
            ["Speedrun (Hard)", "Finish under N minutes", "30: 5 Ethernal; 20: 5; 15: 10; 10: 10"],
            ["masquerade", "Own effects", "2: 100 gems; 4: 200; 8: 400"],
            ["pet lover", "Own pets", "2: 100 gems; 5: 10 Ethernal"],
            ["the Warriors", "Own heroes", "2: 500 gems; 4: 1000"],
          ],
        },
        paragraphs: ["Data from the achievement tables. Progress is permanent across runs and claimed at the King."],
      },
    ],
    tags: ["Progression", "Hub"],
    related: [{ category: "items", slug: "gem" }, { category: "items", slug: "ethernal" }, { category: "dungeons", slug: "the-hub-island" }],
  }),
  mc({
    slug: "daily-rewards",
    name: "Daily Rewards",
    subtitle: "Free currency each day",
    summary:
      "The hub offers a six-day reward cycle, three gift ads a day that pay 5 Ethernal, a rewarded ad for 70 gems, and timed reward chests.",
    infobox: [
      { label: "Cycle", value: "6 days" },
      { label: "Gift ads", value: "3 per day, 5 [[items/ethernal]] each" },
      { label: "Store ad", value: "70 [[items/gem|gems]] each, no daily limit" },
    ],
    sections: [
      {
        heading: "Daily reward cycle",
        table: {
          columns: ["Day", "Reward"],
          rows: [
            ["1", "50 [[items/gem|gems]]"],
            ["2", "100 gems"],
            ["3", "2 [[items/ethernal]]"],
            ["4", "300 gems"],
            ["5", "200 gems"],
            ["6", "5 Ethernal"],
          ],
        },
        paragraphs: [
          "A panel appears in the [[dungeons/the-hub-island|hub]] when a reward is ready. Claim once per day (counted from the last claim using server time when available) and the next claim shows the next day. A phone reminder is scheduled for the next day.",
        ],
      },
      {
        heading: "Other free income",
        bullets: [
          "Gift box: watch an ad for 5 [[items/ethernal]], up to three a day (the counter resets at local midnight).",
          "Store ad: watch an ad for 70 [[items/gem|gems]].",
          "[[items/reward-chests|Reward chests]]: three timed [[items/chests|chests]] filled by run pieces.",
          "[[mechanics/achievements|Achievements]] and the [[mechanics/leaderboard|leaderboard]] seasons.",
        ],
      },
    ],
    tags: ["Progression", "Retention"],
    related: [{ category: "items", slug: "ethernal" }, { category: "mechanics", slug: "ads" }, { category: "items", slug: "reward-chests" }, { category: "items", slug: "chests" }],
  }),
  mc({
    slug: "leaderboard",
    name: "Leaderboard",
    subtitle: "Score ranking",
    summary:
      "Normal and Hard each have a score leaderboard. A season lasts 48 hours and the top three players are rewarded.",
    infobox: [
      { label: "Boards", value: "Normal and Hard" },
      { label: "Season", value: "48 hours" },
      { label: "Rewarded", value: "Top 3 players" },
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Your final score (see [[mechanics/run-rewards|Run rewards]]) is submitted at the end of a solo run under your player name. Names are cleaned: no control characters, no angle brackets and at most 100 characters.",
          "The board is opened from the Altar. A countdown shows when it resets.",
          "Rewards are [[items/gem|gems]] or [[items/ethernal]], credited once per season.",
          "[[mechanics/co-op-multiplayer|Co-op]] runs submit nothing, and neither do runs that used a Favor Light boost.",
        ],
      },
    ],
    tags: ["Progression", "Online"],
    related: [{ category: "mechanics", slug: "run-rewards" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "items", slug: "gem" }, { category: "items", slug: "ethernal" }],
  }),

  // ───────────────────────────── Run safety ─────────────────────────────
  mc({
    slug: "revive",
    name: "Revive",
    subtitle: "A second chance",
    summary:
      "When your health reaches zero in solo play the game offers one revive per run: watch an ad, pay 200 gems, or use a free one if you bought the Revive pack.",
    infobox: [
      { label: "Per run", value: "One" },
      { label: "Cost", value: "A rewarded ad or 200 [[items/gem|gems]] (free with the Revive purchase)" },
      { label: "Effect", value: "Full heal and 2.5 seconds of immunity" },
    ],
    sections: [
      {
        heading: "Solo",
        bullets: [
          "On death a panel offers the options. Declining, or dying again, ends the run.",
          "Reviving heals you fully, clears bullets and blocks damage for 2.5 seconds, then you continue where you died.",
          "The panel is saved: if you close the app on it, Continue brings it back.",
        ],
      },
      {
        heading: "Co-op",
        paragraphs: ["A fallen teammate is revived when the room is cleared, with 20% health. See [[mechanics/co-op-multiplayer|Co-op multiplayer]]."],
      },
    ],
    tags: ["Core", "Survival"],
    related: [{ category: "items", slug: "gem" }, { category: "mechanics", slug: "ads" }, { category: "mechanics", slug: "save-and-continue" }, { category: "items", slug: "ethernal" }],
  }),
  mc({
    slug: "save-and-continue",
    name: "Save and Continue",
    subtitle: "Resuming a run",
    summary:
      "A solo run is saved at the start of each floor. Quit at any time and press Continue to resume from the start of the floor you were on.",
    infobox: [
      { label: "Saved at", value: "Floor start and when a card pick is confirmed" },
      { label: "Resume at", value: "Start of the current floor" },
    ],
    sections: [
      {
        heading: "What is saved",
        bullets: [
          "Your bag, [[items/coin|coins]], health, [[mechanics/health-shield-and-dodge|shield]], floor, cards, curse and the Hard mutator, plus whether you used the [[mechanics/revive|revive]].",
          "A [[mechanics/level-up-card-picks|card pick]] that was open is shown again with the same three cards.",
          "If you were dead on the revive panel, it opens again.",
          "Exiting from Settings keeps the floor-start snapshot instead of the current state.",
          "The floor is generated again on resume.",
        ],
      },
      {
        heading: "Limits",
        bullets: [
          "Ending a run (win or loss) deletes the save. Starting a new game over a save asks for confirmation.",
          "[[mechanics/co-op-multiplayer|Co-op]] never reads, writes or deletes the solo save.",
        ],
      },
    ],
    tags: ["Core", "Persistence"],
    related: [{ category: "mechanics", slug: "the-run" }, { category: "mechanics", slug: "revive" }, { category: "mechanics", slug: "level-up-card-picks" }, { category: "dungeons", slug: "floors-and-rooms" }, { category: "items", slug: "coin" }],
  }),

  // ───────────────────────────── Online ─────────────────────────────
  mc({
    slug: "co-op-multiplayer",
    name: "Co-op Multiplayer",
    subtitle: "Up to three players",
    summary:
      "Play a run with up to two friends. One player hosts a room, loot is personal, fallen players return when the room is cleared and monsters scale with the group.",
    infobox: [
      { label: "Players", value: "Up to 3" },
      { label: "Modes", value: "Normal or Hard (host picks)" },
      { label: "Loot", value: "Personal for each player" },
    ],
    sections: [
      {
        heading: "Rooms",
        bullets: [
          "Choose Multiplayer on the start screen. Create a room, join from the list or play with friends.",
          "Friends-only rooms exist. Public rooms have voice and text chat turned off.",
          "The host decides when monsters die and builds the floors.",
          "[[mechanics/difficulty-modes|Hard mode]] needs the Hard unlock. The host's choice is stored in the room.",
        ],
      },
      {
        heading: "Rules",
        table: {
          columns: ["Topic", "Co-op behavior"],
          rows: [
            ["Monsters", "+35% health and +25% damage per extra player"],
            ["Loot", "Each player rolls and picks up their own [[items/chests|chest]] contents; ammo is personal too"],
            ["[[mechanics/revive]]", "A fallen player returns with 20% health when the room is cleared (including after a boss and on new floors)"],
            ["Portal", "Takes the whole team"],
            ["Save", "No Continue; the solo save is never touched"],
            ["Score", "Not submitted to the [[mechanics/leaderboard|leaderboard]]; [[items/gem|gems]] are still paid"],
            ["[[dungeons/twist-rooms|Twist rooms]]", "[[enemies/elites-and-champions]] are not used; Vault and Spring rooms are off"],
            ["Ads", "Level ads are replaced by a shared team break"],
          ],
        },
      },
      {
        heading: "Notes",
        paragraphs: [
          "If the last other player leaves, the team is wiped. Some newer enemy and boss behaviors apply to solo play only. See [[mechanics/difficulty-modes|Difficulty modes]] and [[mechanics/save-and-continue|Save and Continue]].",
        ],
      },
    ],
    tags: ["Online", "Co-op"],
    related: [{ category: "mechanics", slug: "revive" }, { category: "mechanics", slug: "difficulty-modes" }, { category: "mechanics", slug: "ammo-pool" }, { category: "items", slug: "chests" }, { category: "dungeons", slug: "twist-rooms" }, { category: "enemies", slug: "elites-and-champions" }],
  }),

  // ───────────────────────────── Monetization and settings ─────────────────────────────
  mc({
    slug: "ads",
    name: "Ads",
    subtitle: "Forced and rewarded ads",
    summary:
      "The game shows two kinds of ads: occasional full-screen ads between floors and after a run, and optional rewarded ads that pay for a revive, gems, Ethernal or an instant chest.",
    infobox: [
      { label: "Forced", value: "Between floors (not boss floors), after a run" },
      { label: "Gap", value: "At least 180 seconds between forced ads" },
      { label: "Remove", value: "Block Ads subscription" },
    ],
    sections: [
      {
        heading: "Forced ads",
        bullets: [
          "A full-screen ad can show when you leave a floor through the portal, never from a [[dungeons/boss-floors|boss floor]], and at most once every three minutes.",
          "One more can play after a run, before the [[items/chests|chest]] screen.",
          "None appears during a fight.",
          "The Block Ads subscription removes them. In [[mechanics/co-op-multiplayer|co-op]] the team shares one break.",
        ],
      },
      {
        heading: "Rewarded ads",
        table: {
          columns: ["Where", "Reward"],
          rows: [
            ["Revive panel", "A revive"],
            ["Run end", "Doubles the [[items/gem|gems]]"],
            ["Gift box in the [[dungeons/the-hub-island|hub]]", "5 [[items/ethernal]], 3 per day"],
            ["Store", "70 gems"],
            ["Locked reward chest", "Opens it at once"],
          ],
        },
        paragraphs: ["See [[mechanics/revive|Revive]], [[mechanics/daily-rewards|Daily rewards]] and [[items/reward-chests|Reward chests]]."],
      },
    ],
    tags: ["Monetization"],
    related: [{ category: "mechanics", slug: "store-and-purchases" }, { category: "mechanics", slug: "revive" }, { category: "dungeons", slug: "boss-floors" }, { category: "items", slug: "chests" }, { category: "dungeons", slug: "the-hub-island" }],
  }),
  mc({
    slug: "store-and-purchases",
    name: "Store and Purchases",
    subtitle: "Hub store, high level",
    summary:
      "The hub store sells Ethernal packs, a one-time Revive, Double Coin, a Starter pack and an ad-removal subscription. Ethernal can be exchanged for gems.",
    infobox: [
      { label: "Packs", value: "A Few, A Chest, A Large Number of [[items/ethernal]] (40, 100, 256)" },
      { label: "One-time", value: "Revive, Double Coin, Starter pack" },
      { label: "Subscription", value: "Block Ads" },
    ],
    sections: [
      {
        heading: "Products",
        table: {
          columns: ["Product", "Effect"],
          rows: [
            ["A Few [[items/ethernal]]", "40 Ethernal"],
            ["An Ethernal [[items/chests|Chest]]", "100 Ethernal"],
            ["A Large Number Of Ethernal", "256 Ethernal"],
            ["[[mechanics/revive]]", "A free revive on every run, permanently"],
            ["Double Coin", "Every [[items/coin|coin]] pickup counts double, permanently"],
            ["Starter pack", "100 Ethernal and a starter hero"],
            ["Block Ads", "Subscription that removes [[mechanics/ads|forced ads]]"],
          ],
        },
        paragraphs: ["Prices are set by the app store. Purchases are recorded once per transaction, so a repeated delivery cannot grant twice."],
      },
      {
        heading: "Exchange and free options",
        bullets: [
          "Ethernal to gems: 5 for 100, 10 for 250, 20 for 600.",
          "A rewarded ad pays 70 gems.",
          "See [[items/ethernal|Ethernal]], [[items/gem|Gem]] and [[mechanics/ads|Ads]].",
        ],
      },
    ],
    tags: ["Monetization", "Hub"],
    related: [{ category: "items", slug: "ethernal" }, { category: "mechanics", slug: "ads" }, { category: "items", slug: "gem" }, { category: "items", slug: "chests" }],
  }),
  mc({
    slug: "settings",
    name: "Settings",
    subtitle: "Options menu",
    summary:
      "Settings lets you change language, music, vibration, brightness, torch glow, the joystick type and auto aim, and shows the guide and tutorial.",
    infobox: [
      { label: "Tabs", value: "General, Control, Graphic" },
      { label: "Where", value: "Settings button in the start screen and pause menu" },
    ],
    sections: [
      {
        heading: "Options",
        bullets: [
          "General: language, music, vibration and the exit button.",
          "Control: the fixed or floating joystick, [[mechanics/auto-aim|auto aim]] and the guide.",
          "Graphic: brightness and torch glow, plus a visual quality tier.",
          "Exiting from a solo run keeps the floor-start snapshot. See [[mechanics/save-and-continue|Save and Continue]].",
        ],
      },
    ],
    tags: ["UI", "Options"],
    related: [{ category: "mechanics", slug: "controls" }, { category: "mechanics", slug: "auto-aim" }, { category: "dungeons", slug: "the-hub-island" }, { category: "dungeons", slug: "the-tutorial" }],
  }),
];
