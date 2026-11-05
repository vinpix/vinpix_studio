import type { WikiArticle } from "../types";

// Generated from the game data (item prefabs, Gridly texts, craft recipes) and hand-edited prose. One article per weapon a player can obtain.
export const weapons: WikiArticle[] = [
  {
    "slug": "wooden-crossbow-ii",
    "category": "weapons",
    "name": "Wooden Crossbow II",
    "subtitle": "Common crossbow",
    "summary": "Wooden Crossbow II is a common crossbow dealing 0.7 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-crossbow-ii.png",
      "alt": "Wooden Crossbow II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.7 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.7 s"
      },
      {
        "label": "Ammo cost",
        "value": "7 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "17"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Crossbow II** is a common crossbow in The Last Dungeon, a gun found as loot in the dungeon.",
          "In the game this is step II of the numbered Wooden Crossbow upgrade line.",
          "*In-game description: “The crossbow is made of wood.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.7 x hero ATK per bolt; about 7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "1 rounds / 0.7 s"
            ],
            [
              "Ammo",
              "7 ammo unit(s) per round from the shared pool of 1000 (about 142 rounds from a full pool, 7 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/wooden-crossbow-iv|Wooden Crossbow IV]] (Rare) for 15 [[items/coin|coins]]. Damage 0.82 x [[mechanics/hero-training|hero ATK]], compared with 0.7 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Common",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-crossbow-iv"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "wooden-crossbow-iv",
    "category": "weapons",
    "name": "Wooden Crossbow IV",
    "subtitle": "Rare crossbow",
    "summary": "Wooden Crossbow IV is a rare crossbow dealing 0.82 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-crossbow-iv.png",
      "alt": "Wooden Crossbow IV weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.82 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.6 s"
      },
      {
        "label": "Ammo cost",
        "value": "7 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.37 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-crossbow-ii]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "19"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Crossbow IV** is a rare crossbow in The Last Dungeon, a gun crafted from [[weapons/wooden-crossbow-ii|Wooden Crossbow II]].",
          "In the game this is step IV of the numbered Wooden Crossbow upgrade line.",
          "*In-game description: “The crossbow is made of wood.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.82 x hero ATK per bolt; about 8.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "1 rounds / 0.6 s"
            ],
            [
              "Ammo",
              "7 ammo unit(s) per round from the shared pool of 1000 (about 142 rounds from a full pool, 7 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.37 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-crossbow-ii|Wooden Crossbow II]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-crossbow-ii|Wooden Crossbow II]].",
          "Upgrades into [[weapons/dryad-crossbow|Dryad Crossbow]] (Epic) for 15 [[items/coin|coins]]. Damage 0.9 x [[mechanics/hero-training|hero ATK]], compared with 0.82 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Rare",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-crossbow-ii"
      },
      {
        "category": "weapons",
        "slug": "dryad-crossbow"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "dryad-crossbow",
    "category": "weapons",
    "name": "Dryad Crossbow",
    "subtitle": "Epic crossbow",
    "summary": "Dryad Crossbow is an epic crossbow dealing 0.9 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/dryad-crossbow.png",
      "alt": "Dryad Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.9 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.55 s"
      },
      {
        "label": "Ammo cost",
        "value": "12 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.64 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-crossbow-iv]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "20"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dryad Crossbow** is an epic crossbow in The Last Dungeon, a gun crafted from [[weapons/wooden-crossbow-iv|Wooden Crossbow IV]].",
          "*In-game description: “The crossbow is made by the god of the forest.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.9 x hero ATK per bolt; about 9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "1 rounds / 0.55 s"
            ],
            [
              "Ammo",
              "12 ammo unit(s) per round from the shared pool of 1000 (about 83 rounds from a full pool, 12 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.64 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-crossbow-iv|Wooden Crossbow IV]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-crossbow-iv|Wooden Crossbow IV]].",
          "Upgrades into [[weapons/god-crossbow|God Crossbow]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 1.232 x [[mechanics/hero-training|hero ATK]], compared with 0.9 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-crossbow-iv"
      },
      {
        "category": "weapons",
        "slug": "god-crossbow"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "golden-crossbow-mk-1",
    "category": "weapons",
    "name": "Golden Crossbow (Mk 1)",
    "subtitle": "Rare crossbow",
    "summary": "Golden Crossbow (Mk 1) is a rare crossbow dealing 0.8 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/golden-crossbow-mk-1.png",
      "alt": "Golden Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.8 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.4 s between shots (about 2.5 per second)"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "1.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.04 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "21"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Golden Crossbow (Mk 1)** is a rare crossbow in The Last Dungeon, a gun found as loot in the dungeon.",
          "The game shows this weapon simply as \"Golden Crossbow\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “The crossbow is made of gold.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.8 x hero ATK per bolt; about 8 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.4 s between shots"
            ],
            [
              "Magazine / reload",
              "3 rounds / 1.5 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 18 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.04 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/golden-crossbow-mk-2|Golden Crossbow (Mk 2)]] (Rare) for 15 [[items/coin|coins]]. Damage 1 x [[mechanics/hero-training|hero ATK]], compared with 0.8 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "golden-crossbow-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "golden-crossbow-mk-2",
    "category": "weapons",
    "name": "Golden Crossbow (Mk 2)",
    "subtitle": "Rare crossbow",
    "summary": "Golden Crossbow (Mk 2) is a rare crossbow dealing 1 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/golden-crossbow-mk-2.png",
      "alt": "Golden Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "1 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.35 s between shots (about 2.9 per second)"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "1.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.36 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/golden-crossbow-mk-1]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "22"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Golden Crossbow (Mk 2)** is a rare crossbow in The Last Dungeon, a gun crafted from [[weapons/golden-crossbow-mk-1|Golden Crossbow (Mk 1)]].",
          "The game shows this weapon simply as \"Golden Crossbow\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “The crossbow is made of gold.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1 x hero ATK per bolt; about 10 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.35 s between shots"
            ],
            [
              "Magazine / reload",
              "3 rounds / 1.5 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 18 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.36 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/golden-crossbow-mk-1|Golden Crossbow (Mk 1)]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/golden-crossbow-mk-1|Golden Crossbow (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Rare",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "golden-crossbow-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "king-crossbow-mk-1",
    "category": "weapons",
    "name": "King Crossbow (Mk 1)",
    "subtitle": "Epic crossbow",
    "summary": "King Crossbow (Mk 1) is an epic crossbow dealing 0.8 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/king-crossbow-mk-1.png",
      "alt": "King Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.8 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "2 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.75 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.52 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "23"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**King Crossbow (Mk 1)** is an epic crossbow in The Last Dungeon, a gun found as loot in the dungeon.",
          "The game shows this weapon simply as \"King Crossbow\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “The crossbow is made of gold and iron.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.8 x hero ATK per bolt; about 8 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "2 rounds / 0.75 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 16 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.52 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/king-crossbow-mk-2|King Crossbow (Mk 2)]] (Epic) for 20 [[items/coin|coins]]. Damage 0.9 x [[mechanics/hero-training|hero ATK]], compared with 0.8 now.",
          "Upgrades into [[weapons/arbalest|Arbalest]] (Epic) for 20 coins. Damage 1.85 x hero ATK, compared with 0.8 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "king-crossbow-mk-2"
      },
      {
        "category": "weapons",
        "slug": "arbalest"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "king-crossbow-mk-2",
    "category": "weapons",
    "name": "King Crossbow (Mk 2)",
    "subtitle": "Epic crossbow",
    "summary": "King Crossbow (Mk 2) is an epic crossbow dealing 0.9 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/king-crossbow-mk-2.png",
      "alt": "King Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.9 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.25 s between shots (about 4 per second)"
      },
      {
        "label": "Magazine",
        "value": "2 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.75 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.8 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/king-crossbow-mk-1]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "24"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**King Crossbow (Mk 2)** is an epic crossbow in The Last Dungeon, a gun crafted from [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]].",
          "The game shows this weapon simply as \"King Crossbow\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “The crossbow is made of gold and iron.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.9 x hero ATK per bolt; about 9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.25 s between shots"
            ],
            [
              "Magazine / reload",
              "2 rounds / 0.75 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 16 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.8 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "king-crossbow-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "god-crossbow",
    "category": "weapons",
    "name": "God Crossbow",
    "subtitle": "Legendary crossbow",
    "summary": "God Crossbow is a legendary crossbow dealing 1.232 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/god-crossbow.png",
      "alt": "God Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.232 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "1.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "3-bolt fan"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 5.28 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/dryad-crossbow]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "25"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**God Crossbow** is a legendary crossbow in The Last Dungeon, a gun crafted from [[weapons/dryad-crossbow|Dryad Crossbow]].",
          "*In-game description: “The crossbow is made by god.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.232 x hero ATK per bolt; about 12.3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "3 rounds / 1.5 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 18 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 5.28 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each shot fires a fan of 3 arrows, 6 degrees apart.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/dryad-crossbow|Dryad Crossbow]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/dryad-crossbow|Dryad Crossbow]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Legendary",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "dryad-crossbow"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "wooden-sword-ii",
    "category": "weapons",
    "name": "Wooden Sword II",
    "subtitle": "Common sword",
    "summary": "Wooden Sword II is a common sword dealing 0.308 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-sword-ii.png",
      "alt": "Wooden Sword II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.308 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.3, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.27 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "27"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Sword II** is a common sword in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "In the game this is step II of the numbered Wooden Sword upgrade line.",
          "*In-game description: “The sword is made of wood.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.308 x hero ATK per hit; about 3.1 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.3, x1, x2 (total x6.3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.27 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.3, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/wooden-sword-iii|Wooden Sword III]] (Rare) for 20 [[items/coin|coins]]. Damage 0.385 x [[mechanics/hero-training|hero ATK]], compared with 0.308 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Common",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-iii"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "wooden-sword-iii",
    "category": "weapons",
    "name": "Wooden Sword III",
    "subtitle": "Rare sword",
    "summary": "Wooden Sword III is a rare sword dealing 0.385 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-sword-iii.png",
      "alt": "Wooden Sword III weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.385 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.3, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.59 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-sword-ii]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "28"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Sword III** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/wooden-sword-ii|Wooden Sword II]].",
          "In the game this is step III of the numbered Wooden Sword upgrade line.",
          "*In-game description: “The sword is made of wood.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.385 x hero ATK per hit; about 3.9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.3, x1, x2 (total x6.3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.59 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.3, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-sword-ii|Wooden Sword II]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-sword-ii|Wooden Sword II]].",
          "Upgrades into [[weapons/wooden-sword-iv|Wooden Sword IV]] (Epic) for 20 [[items/coin|coins]]. Damage 0.462 x [[mechanics/hero-training|hero ATK]], compared with 0.385 now.",
          "Upgrades into [[weapons/golden-sword-i|Golden Sword I]] (Rare) for 20 coins. Damage 0.629 x hero ATK, compared with 0.385 now.",
          "Upgrades into [[weapons/energy-sword-mk-1|Energy Sword (Mk 1)]] (Epic) for 20 coins. Damage 0.608 x hero ATK, compared with 0.385 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-ii"
      },
      {
        "category": "weapons",
        "slug": "wooden-sword-iv"
      },
      {
        "category": "weapons",
        "slug": "golden-sword-i"
      },
      {
        "category": "weapons",
        "slug": "energy-sword-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
    ]
  },
  {
    "slug": "wooden-sword-iv",
    "category": "weapons",
    "name": "Wooden Sword IV",
    "subtitle": "Epic sword",
    "summary": "Wooden Sword IV is an epic sword dealing 0.462 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-sword-iv.png",
      "alt": "Wooden Sword IV weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.462 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.3, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.91 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-sword-iii]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "29"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Sword IV** is an epic sword in The Last Dungeon, a melee weapon found as loot and also craftable from [[weapons/wooden-sword-iii|Wooden Sword III]].",
          "In the game this is step IV of the numbered Wooden Sword upgrade line.",
          "*In-game description: “The sword is made of wood.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.462 x hero ATK per hit; about 4.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.3, x1, x2 (total x6.3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.91 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.3, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-sword-iii|Wooden Sword III]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-sword-iii|Wooden Sword III]].",
          "Upgrades into [[weapons/dryad-sword|Dryad Sword]] (Epic) for 30 [[items/coin|coins]]. Damage 0.7 x [[mechanics/hero-training|hero ATK]], compared with 0.462 now.",
          "Upgrades into [[weapons/dragon-sword|Dragon Sword]] (Epic) for 35 coins. Damage 0.996 x hero ATK, compared with 0.462 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-iii"
      },
      {
        "category": "weapons",
        "slug": "dryad-sword"
      },
      {
        "category": "weapons",
        "slug": "dragon-sword"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "dryad-sword",
    "category": "weapons",
    "name": "Dryad Sword",
    "subtitle": "Epic sword",
    "summary": "Dryad Sword is an epic sword dealing 0.7 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/dryad-sword.png",
      "alt": "Dryad Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.7 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.3, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.89 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-sword-iv]] + 30 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "30"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dryad Sword** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/wooden-sword-iv|Wooden Sword IV]].",
          "*In-game description: “The sword is made by the god of forest.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.7 x hero ATK per hit; about 7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.3, x1, x2 (total x6.3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.89 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.3, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-sword-iv|Wooden Sword IV]] plus 30 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-sword-iv|Wooden Sword IV]].",
          "Upgrades into [[weapons/god-sword|God Sword]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 1.3 x [[mechanics/hero-training|hero ATK]], compared with 0.7 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-iv"
      },
      {
        "category": "weapons",
        "slug": "god-sword"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "golden-sword-i",
    "category": "weapons",
    "name": "Golden Sword I",
    "subtitle": "Rare sword",
    "summary": "Golden Sword I is a rare sword dealing 0.629 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/golden-sword-i.png",
      "alt": "Golden Sword I weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.629 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x0.6, x0.6, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.76 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-sword-iii]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "31"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Golden Sword I** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/wooden-sword-iii|Wooden Sword III]].",
          "In the game this is step I of the numbered Golden Sword upgrade line.",
          "*In-game description: “The sword is made of gold.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.629 x hero ATK per hit; about 6.3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x0.6, x0.6, x1 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.76 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x0.6, x0.6, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-sword-iii|Wooden Sword III]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-sword-iii|Wooden Sword III]].",
          "Upgrades into [[weapons/golden-sword-ii|Golden Sword II]] (Rare) for 25 [[items/coin|coins]]. Damage 0.74 x [[mechanics/hero-training|hero ATK]], compared with 0.629 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-iii"
      },
      {
        "category": "weapons",
        "slug": "golden-sword-ii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "golden-sword-ii",
    "category": "weapons",
    "name": "Golden Sword II",
    "subtitle": "Rare sword",
    "summary": "Golden Sword II is a rare sword dealing 0.74 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/golden-sword-ii.png",
      "alt": "Golden Sword II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.74 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x0.6, x0.6, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.07 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/golden-sword-i]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "32"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Golden Sword II** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/golden-sword-i|Golden Sword I]].",
          "In the game this is step II of the numbered Golden Sword upgrade line.",
          "*In-game description: “The sword is made of gold.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.74 x hero ATK per hit; about 7.4 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x0.6, x0.6, x1 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.07 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x0.6, x0.6, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/golden-sword-i|Golden Sword I]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/golden-sword-i|Golden Sword I]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "golden-sword-i"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "iron-sword-i",
    "category": "weapons",
    "name": "Iron Sword I",
    "subtitle": "Rare sword",
    "summary": "Iron Sword I is a rare sword dealing 0.763 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/iron-sword-i.png",
      "alt": "Iron Sword I weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.763 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.23 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x0.6, x0.6, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.79 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/big-blue-sword]] + 30 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "33"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Iron Sword I** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/big-blue-sword|Big Blue Sword]].",
          "In the game this is step I of the numbered Iron Sword upgrade line.",
          "*In-game description: “This sword is made of iron.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.763 x hero ATK per hit; about 7.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.23 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x0.6, x0.6, x1 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.79 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x0.6, x0.6, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/big-blue-sword|Big Blue Sword]] plus 30 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/big-blue-sword|Big Blue Sword]].",
          "Upgrades into [[weapons/iron-sword-ii|Iron Sword II]] (Epic) for 35 [[items/coin|coins]]. Damage 0.81 x [[mechanics/hero-training|hero ATK]], compared with 0.763 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "big-blue-sword"
      },
      {
        "category": "weapons",
        "slug": "iron-sword-ii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "iron-sword-ii",
    "category": "weapons",
    "name": "Iron Sword II",
    "subtitle": "Epic sword",
    "summary": "Iron Sword II is an epic sword dealing 0.81 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/iron-sword-ii.png",
      "alt": "Iron Sword II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.81 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.23 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x0.6, x0.6, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.96 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/iron-sword-i]] + 35 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "34"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Iron Sword II** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/iron-sword-i|Iron Sword I]].",
          "In the game this is step II of the numbered Iron Sword upgrade line.",
          "*In-game description: “This sword is made of iron.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.81 x hero ATK per hit; about 8.1 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.23 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x0.6, x0.6, x1 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.96 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x0.6, x0.6, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/iron-sword-i|Iron Sword I]] plus 35 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/iron-sword-i|Iron Sword I]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "iron-sword-i"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "god-sword",
    "category": "weapons",
    "name": "God Sword",
    "subtitle": "Legendary sword",
    "summary": "God Sword is a legendary sword dealing 1.3 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/god-sword.png",
      "alt": "God Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.3 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x0.6, x0.6, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 4.37 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/dryad-sword]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "35"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**God Sword** is a legendary sword in The Last Dungeon, a melee weapon crafted from [[weapons/dryad-sword|Dryad Sword]].",
          "*In-game description: “The sword is made by god.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.3 x hero ATK per hit; about 13 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x0.6, x0.6, x1 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 4.37 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x0.6, x0.6, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/dryad-sword|Dryad Sword]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/dryad-sword|Dryad Sword]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Legendary",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "dryad-sword"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "wooden-bow-ii",
    "category": "weapons",
    "name": "Wooden Bow II",
    "subtitle": "Common bow",
    "summary": "Wooden Bow II is a common bow dealing 0.7 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-bow-ii.png",
      "alt": "Wooden Bow II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.7 x hero ATK per arrow (1.4 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.7 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "7 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "37"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Bow II** is a common bow in The Last Dungeon, a bow found as loot in the dungeon.",
          "In the game this is step II of the numbered Wooden Bow upgrade line.",
          "*In-game description: “The bow is made of wood.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.7 x hero ATK per arrow (1.4 fully charged); about 7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.7 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "1 rounds / 1 s"
            ],
            [
              "Ammo",
              "7 ammo unit(s) per round from the shared pool of 1000 (about 142 rounds from a full pool, 7 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 1 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/wooden-bow-iii|Wooden Bow III]] (Rare) for 15 [[items/coin|coins]]. Damage 0.8 x [[mechanics/hero-training|hero ATK]], compared with 0.7 now.",
          "Upgrades into [[weapons/staff|Staff]] (Rare) for 15 coins. Damage 1.9 x hero ATK, compared with 0.7 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Common",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-bow-iii"
      },
      {
        "category": "weapons",
        "slug": "staff"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "wooden-bow-iii",
    "category": "weapons",
    "name": "Wooden Bow III",
    "subtitle": "Rare bow",
    "summary": "Wooden Bow III is a rare bow dealing 0.8 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-bow-iii.png",
      "alt": "Wooden Bow III weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.8 x hero ATK per arrow (1.6 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.7 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "7 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.14 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-bow-ii]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "38"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Bow III** is a rare bow in The Last Dungeon, a bow found as loot and also craftable from [[weapons/wooden-bow-ii|Wooden Bow II]].",
          "In the game this is step III of the numbered Wooden Bow upgrade line.",
          "*In-game description: “The bow is made of wood.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.8 x hero ATK per arrow (1.6 fully charged); about 8 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.7 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "1 rounds / 1 s"
            ],
            [
              "Ammo",
              "7 ammo unit(s) per round from the shared pool of 1000 (about 142 rounds from a full pool, 7 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 1.14 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-bow-ii|Wooden Bow II]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-bow-ii|Wooden Bow II]].",
          "Upgrades into [[weapons/wooden-bow-iv|Wooden Bow IV]] (Rare) for 15 [[items/coin|coins]]. Damage 0.9 x [[mechanics/hero-training|hero ATK]], compared with 0.8 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-bow-ii"
      },
      {
        "category": "weapons",
        "slug": "wooden-bow-iv"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "wooden-bow-iv",
    "category": "weapons",
    "name": "Wooden Bow IV",
    "subtitle": "Rare bow",
    "summary": "Wooden Bow IV is a rare bow dealing 0.9 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/wooden-bow-iv.png",
      "alt": "Wooden Bow IV weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.9 x hero ATK per arrow (1.8 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.65 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Ammo cost",
        "value": "7 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.38 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-bow-iii]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "39"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Wooden Bow IV** is a rare bow in The Last Dungeon, a bow found as loot and also craftable from [[weapons/wooden-bow-iii|Wooden Bow III]].",
          "In the game this is step IV of the numbered Wooden Bow upgrade line.",
          "*In-game description: “The bow is made of wood.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.9 x hero ATK per arrow (1.8 fully charged); about 9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.65 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "1 rounds / 0.8 s"
            ],
            [
              "Ammo",
              "7 ammo unit(s) per round from the shared pool of 1000 (about 142 rounds from a full pool, 7 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 1.38 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-bow-iii|Wooden Bow III]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-bow-iii|Wooden Bow III]].",
          "Upgrades into [[weapons/dryad-bow|Dryad Bow]] (Epic) for 20 [[items/coin|coins]]. Damage 1.2 x [[mechanics/hero-training|hero ATK]], compared with 0.9 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-bow-iii"
      },
      {
        "category": "weapons",
        "slug": "dryad-bow"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "dryad-bow",
    "category": "weapons",
    "name": "Dryad Bow",
    "subtitle": "Epic bow",
    "summary": "Dryad Bow is an epic bow dealing 1.2 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/dryad-bow.png",
      "alt": "Dryad Bow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "1.2 x hero ATK per arrow (2.4 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.6 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.7 s"
      },
      {
        "label": "Ammo cost",
        "value": "12 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-bow-iv]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "40"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dryad Bow** is an epic bow in The Last Dungeon, a bow found as loot and also craftable from [[weapons/wooden-bow-iv|Wooden Bow IV]].",
          "*In-game description: “The bow is made by the god of forest.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.2 x hero ATK per arrow (2.4 fully charged); about 12 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.6 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "1 rounds / 0.7 s"
            ],
            [
              "Ammo",
              "12 ammo unit(s) per round from the shared pool of 1000 (about 83 rounds from a full pool, 12 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 2 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-bow-iv|Wooden Bow IV]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-bow-iv|Wooden Bow IV]].",
          "Upgrades into [[weapons/god-bow|God Bow]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 1.7 x [[mechanics/hero-training|hero ATK]], compared with 1.2 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-bow-iv"
      },
      {
        "category": "weapons",
        "slug": "god-bow"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "golden-bow",
    "category": "weapons",
    "name": "Golden Bow",
    "subtitle": "Epic bow",
    "summary": "Golden Bow is an epic bow dealing 1.35 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/golden-bow.png",
      "alt": "Golden Bow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "1.35 x hero ATK per arrow (2.7 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.7 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.7 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.93 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "41"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Golden Bow** is an epic bow in The Last Dungeon, a bow found as loot in the dungeon.",
          "*In-game description: “The bow that made of gold.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.35 x hero ATK per arrow (2.7 fully charged); about 13.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.7 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "3 rounds / 0.7 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 24 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 1.93 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "iron-bow-mk-1",
    "category": "weapons",
    "name": "Iron Bow (Mk 1)",
    "subtitle": "Rare bow",
    "summary": "Iron Bow (Mk 1) is a rare bow dealing 0.8 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/iron-bow-mk-1.png",
      "alt": "Iron Bow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.8 x hero ATK per arrow (1.6 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.6 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "2 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Ammo cost",
        "value": "10 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.33 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "43"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Iron Bow (Mk 1)** is a rare bow in The Last Dungeon, a bow found as loot in the dungeon.",
          "The game shows this weapon simply as \"Iron Bow\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “This bow is made of iron.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.8 x hero ATK per arrow (1.6 fully charged); about 8 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.6 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "2 rounds / 0.8 s"
            ],
            [
              "Ammo",
              "10 ammo unit(s) per round from the shared pool of 1000 (about 100 rounds from a full pool, 20 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 1.33 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/iron-bow-mk-2|Iron Bow (Mk 2)]] (Epic) for 15 [[items/coin|coins]]. Damage 0.9 x [[mechanics/hero-training|hero ATK]], compared with 0.8 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "iron-bow-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "iron-bow-mk-2",
    "category": "weapons",
    "name": "Iron Bow (Mk 2)",
    "subtitle": "Epic bow",
    "summary": "Iron Bow (Mk 2) is an epic bow dealing 0.9 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/iron-bow-mk-2.png",
      "alt": "Iron Bow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.9 x hero ATK per arrow (1.8 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.55 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "2 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.7 s"
      },
      {
        "label": "Ammo cost",
        "value": "10 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.64 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/iron-bow-mk-1]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "44"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Iron Bow (Mk 2)** is an epic bow in The Last Dungeon, a bow crafted from [[weapons/iron-bow-mk-1|Iron Bow (Mk 1)]].",
          "The game shows this weapon simply as \"Iron Bow\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “This bow is made of iron.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.9 x hero ATK per arrow (1.8 fully charged); about 9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.55 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "2 rounds / 0.7 s"
            ],
            [
              "Ammo",
              "10 ammo unit(s) per round from the shared pool of 1000 (about 100 rounds from a full pool, 20 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 1.64 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/iron-bow-mk-1|Iron Bow (Mk 1)]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/iron-bow-mk-1|Iron Bow (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "iron-bow-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "supercharge" },
    ]
  },
  {
    "slug": "god-bow",
    "category": "weapons",
    "name": "God Bow",
    "subtitle": "Legendary bow",
    "summary": "God Bow is a legendary bow dealing 1.7 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/god-bow.png",
      "alt": "God Bow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.7 x hero ATK per arrow (3.4 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.35 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.6 s"
      },
      {
        "label": "Ammo cost",
        "value": "12 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 4.86 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/dryad-bow]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "45"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**God Bow** is a legendary bow in The Last Dungeon, a bow crafted from [[weapons/dryad-bow|Dryad Bow]].",
          "*In-game description: “The bow that made by god.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.7 x hero ATK per arrow (3.4 fully charged); about 17 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.35 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "3 rounds / 0.6 s"
            ],
            [
              "Ammo",
              "12 ammo unit(s) per round from the shared pool of 1000 (about 83 rounds from a full pool, 36 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 4.86 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/dryad-bow|Dryad Bow]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/dryad-bow|Dryad Bow]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Legendary",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "dryad-bow"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "supercharge" },
    ]
  },
  {
    "slug": "jungle-bow",
    "category": "weapons",
    "name": "Jungle Bow",
    "subtitle": "Epic bow",
    "summary": "Jungle Bow is an epic bow dealing 0.7 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/jungle-bow.png",
      "alt": "Jungle Bow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.7 x hero ATK per arrow (1.4 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.5 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "2.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "3-arrow fan"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.8 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "46"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Jungle Bow** is an epic bow in The Last Dungeon, a bow found as loot in the dungeon.",
          "*In-game description: “The bow that made by god of forest.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.7 x hero ATK per arrow (1.4 fully charged); about 7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.5 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "3 rounds / 2.5 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 18 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 2.8 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "Each shot fires a fan of 3 arrows, 3 degrees apart, and the magazine takes a very long 2.5 seconds to reload.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "shotgun-mk-1",
    "category": "weapons",
    "name": "Shotgun (Mk 1)",
    "subtitle": "Epic shotgun",
    "summary": "Shotgun (Mk 1) is an epic shotgun dealing 0.2 x hero ATK per pellet. It fires a spread of pellets.",
    "image": {
      "src": "/ld/wiki/weapons/shotgun-mk-1.png",
      "alt": "Shotgun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.2 x hero ATK per pellet"
      },
      {
        "label": "Fire rate",
        "value": "0.55 s between shots (about 1.8 per second)"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "4 pellets, random spread up to 16 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.45 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "48"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Shotgun (Mk 1)** is an epic shotgun in The Last Dungeon, a gun found as loot in the dungeon.",
          "The game shows this weapon simply as \"Shotgun\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “The gun can shoot multiple bullets.”*",
          "Shotguns fire a spread of pellets with a random scatter. Each pellet carries the full weapon damage, so they are strongest up close where most pellets land."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.2 x hero ATK per pellet; about 2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.55 s between shots"
            ],
            [
              "Magazine / reload",
              "1 rounds / 0.5 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 8 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.45 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every pull of the trigger fires several pellets at once, each flying at its own random angle inside the spread. Every pellet that lands deals the weapon's damage. When the magazine runs dry the gun reloads by itself.",
          "The magazine holds a single shell, so you reload after every shot, but the reload is quick (0.5 seconds).",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/shotgun-mk-2|Shotgun (Mk 2)]] (Epic) for 30 [[items/coin|coins]]. Damage 0.25 x [[mechanics/hero-training|hero ATK]], compared with 0.2 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Stay close: at long range most pellets miss.",
          "Every pellet rolls the on-hit effects, so [[buffs/poison|Poison]] clouds and [[buffs/bomb-shot|Bomb Shot]] counters fill quickly.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "shotgun-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "shotgun-mk-2",
    "category": "weapons",
    "name": "Shotgun (Mk 2)",
    "subtitle": "Epic shotgun",
    "summary": "Shotgun (Mk 2) is an epic shotgun dealing 0.25 x hero ATK per pellet. It fires a spread of pellets.",
    "image": {
      "src": "/ld/wiki/weapons/shotgun-mk-2.png",
      "alt": "Shotgun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.25 x hero ATK per pellet"
      },
      {
        "label": "Fire rate",
        "value": "0.44 s between shots (about 2.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "2 rounds"
      },
      {
        "label": "Reload time",
        "value": "0 s"
      },
      {
        "label": "Ammo cost",
        "value": "7 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "5 pellets, random spread up to 16 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.84 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/shotgun-mk-1]] + 30 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "49"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Shotgun (Mk 2)** is an epic shotgun in The Last Dungeon, a gun crafted from [[weapons/shotgun-mk-1|Shotgun (Mk 1)]].",
          "The game shows this weapon simply as \"Shotgun\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “The gun can shoot multiple bullets.”*",
          "Shotguns fire a spread of pellets with a random scatter. Each pellet carries the full weapon damage, so they are strongest up close where most pellets land."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.25 x hero ATK per pellet; about 2.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.44 s between shots"
            ],
            [
              "Magazine / reload",
              "2 rounds / 0 s"
            ],
            [
              "Ammo",
              "7 ammo unit(s) per round from the shared pool of 1000 (about 142 rounds from a full pool, 14 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 2.84 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every pull of the trigger fires several pellets at once, each flying at its own random angle inside the spread. Every pellet that lands deals the weapon's damage. When the magazine runs dry the gun reloads by itself.",
          "The data gives this upgrade no reload time at all, so its two-shell magazine refills instantly.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/shotgun-mk-1|Shotgun (Mk 1)]] plus 30 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/shotgun-mk-1|Shotgun (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Stay close: at long range most pellets miss.",
          "Every pellet rolls the on-hit effects, so [[buffs/poison|Poison]] clouds and [[buffs/bomb-shot|Bomb Shot]] counters fill quickly.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "shotgun-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "bomb-shot" },
    ]
  },
  {
    "slug": "blue-sword",
    "category": "weapons",
    "name": "Blue Sword",
    "subtitle": "Common sword",
    "summary": "Blue Sword is a common sword dealing 0.36 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/blue-sword.png",
      "alt": "Blue Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.36 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1.5"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.05 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Starter weapon, also loot"
      },
      {
        "label": "Item ID",
        "value": "50"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Blue Sword** is a common sword and one of the two weapons every new run starts with (the other is [[weapons/revolver-mk-1|Revolver (Mk 1)]]). It is also in the loot pool.",
          "*In-game description: “This sword is a mystery.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.36 x hero ATK per hit; about 3.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.5 (total x3.5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.05 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 3 steps with damage multipliers x1, x1, x1.5. The last step (x1.5) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/the-run|Starter weapon]]: it is in your [[mechanics/inventory-and-bag|bag]] at the start of every run.",
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]] (Common) for 15 [[items/coin|coins]]. Damage 0.36 x [[mechanics/hero-training|hero ATK]], compared with 0.36 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Common",
      "Melee",
      "Starter"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-1"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "dragon-sword",
    "category": "weapons",
    "name": "Dragon Sword",
    "subtitle": "Epic sword",
    "summary": "Dragon Sword is an epic sword dealing 0.996 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/dragon-sword.png",
      "alt": "Dragon Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.996 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.16 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-sword-iv]] + 35 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "52"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dragon Sword** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/wooden-sword-iv|Wooden Sword IV]].",
          "*In-game description: “This sword can burn enemies to death.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.996 x hero ATK per hit; about 10 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1 (total x5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 3.16 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-sword-iv|Wooden Sword IV]] plus 35 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-sword-iv|Wooden Sword IV]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-iv"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "dragon-bone-ii",
    "category": "weapons",
    "name": "Dragon Bone II",
    "subtitle": "Rare sword",
    "summary": "Dragon Bone II is a rare sword dealing 0.527 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/dragon-bone-ii.png",
      "alt": "Dragon Bone II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.527 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.86 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/gem-blade-i]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "76"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dragon Bone II** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/gem-blade-i|Gem Blade I]].",
          "In the game this is step II of the numbered Dragon Bone upgrade line.",
          "*In-game description: “This sword is made of dragon bone.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.527 x hero ATK per hit; about 5.3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x2 (total x6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.86 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/gem-blade-i|Gem Blade I]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/gem-blade-i|Gem Blade I]].",
          "Upgrades into [[weapons/dragon-bone-iii|Dragon Bone III]] (Epic) for 25 [[items/coin|coins]]. Damage 0.659 x [[mechanics/hero-training|hero ATK]], compared with 0.527 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "gem-blade-i"
      },
      {
        "category": "weapons",
        "slug": "dragon-bone-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "dragon-bone-iii",
    "category": "weapons",
    "name": "Dragon Bone III",
    "subtitle": "Epic sword",
    "summary": "Dragon Bone III is an epic sword dealing 0.659 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/dragon-bone-iii.png",
      "alt": "Dragon Bone III weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.659 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.47 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/dragon-bone-ii]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "77"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dragon Bone III** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/dragon-bone-ii|Dragon Bone II]].",
          "In the game this is step III of the numbered Dragon Bone upgrade line.",
          "*In-game description: “This sword is made of dragon bone.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.659 x hero ATK per hit; about 6.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x2 (total x6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.47 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/dragon-bone-ii|Dragon Bone II]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/dragon-bone-ii|Dragon Bone II]].",
          "Upgrades into [[weapons/dragon-bone-iv|Dragon Bone IV]] (Epic) for 35 [[items/coin|coins]]. Damage 0.79 x [[mechanics/hero-training|hero ATK]], compared with 0.659 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "dragon-bone-ii"
      },
      {
        "category": "weapons",
        "slug": "dragon-bone-iv"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "dragon-bone-iv",
    "category": "weapons",
    "name": "Dragon Bone IV",
    "subtitle": "Epic sword",
    "summary": "Dragon Bone IV is an epic sword dealing 0.79 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/dragon-bone-iv.png",
      "alt": "Dragon Bone IV weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.79 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.16 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/dragon-bone-iii]] + 35 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "78"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dragon Bone IV** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/dragon-bone-iii|Dragon Bone III]].",
          "In the game this is step IV of the numbered Dragon Bone upgrade line.",
          "*In-game description: “This sword is made of dragon bone.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.79 x hero ATK per hit; about 7.9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x2 (total x6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 3.16 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/dragon-bone-iii|Dragon Bone III]] plus 35 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/dragon-bone-iii|Dragon Bone III]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "dragon-bone-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "energy-sword-mk-2",
    "category": "weapons",
    "name": "Energy Sword (Mk 2)",
    "subtitle": "Legendary sword",
    "summary": "Energy Sword (Mk 2) is a legendary sword dealing 1.172 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/energy-sword-mk-2.png",
      "alt": "Energy Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.172 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.91 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/energy-sword-mk-1]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "79"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Energy Sword (Mk 2)** is a legendary sword in The Last Dungeon, a melee weapon crafted from [[weapons/energy-sword-mk-1|Energy Sword (Mk 1)]].",
          "The game shows this weapon simply as \"Energy Sword\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “Made by the best masters.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.172 x hero ATK per hit; about 11.7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x2 (total x4 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 3.91 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 3 steps with damage multipliers x1, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/energy-sword-mk-1|Energy Sword (Mk 1)]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/energy-sword-mk-1|Energy Sword (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Legendary",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "energy-sword-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "energy-sword-mk-1",
    "category": "weapons",
    "name": "Energy Sword (Mk 1)",
    "subtitle": "Epic sword",
    "summary": "Energy Sword (Mk 1) is an epic sword dealing 0.608 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/energy-sword-mk-1.png",
      "alt": "Energy Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.608 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.03 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-sword-iii]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "80"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Energy Sword (Mk 1)** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/wooden-sword-iii|Wooden Sword III]].",
          "The game shows this weapon simply as \"Energy Sword\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “Made by the best masters.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.608 x hero ATK per hit; about 6.1 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x2 (total x4 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.03 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 3 steps with damage multipliers x1, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-sword-iii|Wooden Sword III]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-sword-iii|Wooden Sword III]].",
          "Upgrades into [[weapons/energy-sword-mk-2|Energy Sword (Mk 2)]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 1.172 x [[mechanics/hero-training|hero ATK]], compared with 0.608 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-sword-iii"
      },
      {
        "category": "weapons",
        "slug": "energy-sword-mk-2"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "energy-blade-mk-1",
    "category": "weapons",
    "name": "Energy Blade (Mk 1)",
    "subtitle": "Rare fast blade",
    "summary": "Energy Blade (Mk 1) is a rare fast blade dealing 0.3 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/energy-blade-mk-1.png",
      "alt": "Energy Blade weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.3 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.3 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "82"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Energy Blade (Mk 1)** is a rare fast blade in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "The game shows this weapon simply as \"Energy Blade\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “Some say that this sword has been cursed.”*",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.3 x hero ATK per hit; about 3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.3 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/energy-blade-mk-2|Energy Blade (Mk 2)]] (Epic) for 25 [[items/coin|coins]]. Damage 0.4 x [[mechanics/hero-training|hero ATK]], compared with 0.3 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "energy-blade-mk-2"
      },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "energy-blade-mk-2",
    "category": "weapons",
    "name": "Energy Blade (Mk 2)",
    "subtitle": "Epic fast blade",
    "summary": "Energy Blade (Mk 2) is an epic fast blade dealing 0.4 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/energy-blade-mk-2.png",
      "alt": "Energy Blade weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.4 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.15 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.32 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/energy-blade-mk-1]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "83"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Energy Blade (Mk 2)** is an epic fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/energy-blade-mk-1|Energy Blade (Mk 1)]].",
          "The game shows this weapon simply as \"Energy Blade\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “Some say that this sword has been cursed.”*",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.4 x hero ATK per hit; about 4 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.15 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.32 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/energy-blade-mk-1|Energy Blade (Mk 1)]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/energy-blade-mk-1|Energy Blade (Mk 1)]].",
          "Upgrades into [[weapons/frost-brand|Frost Brand]] (Epic) for 35 [[items/coin|coins]]. Damage 0.723 x [[mechanics/hero-training|hero ATK]], compared with 0.4 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "energy-blade-mk-1"
      },
      {
        "category": "weapons",
        "slug": "frost-brand"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "gem-blade-i",
    "category": "weapons",
    "name": "Gem Blade I",
    "subtitle": "Rare sword",
    "summary": "Gem Blade I is a rare sword dealing 0.374 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/gem-blade-i.png",
      "alt": "Gem Blade I weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.374 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.04 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "84"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Gem Blade I** is a rare sword in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "In the game this is step I of the numbered Gem Blade upgrade line.",
          "*In-game description: “This is the treasure of thieves.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.374 x hero ATK per hit; about 3.7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1 (total x5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.04 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/dragon-bone-ii|Dragon Bone II]] (Rare) for 20 [[items/coin|coins]]. Damage 0.527 x [[mechanics/hero-training|hero ATK]], compared with 0.374 now.",
          "Upgrades into [[weapons/gem-blade-ii|Gem Blade II]] (Rare) for 20 coins. Damage 0.498 x hero ATK, compared with 0.374 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "dragon-bone-ii"
      },
      {
        "category": "weapons",
        "slug": "gem-blade-ii"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "gem-blade-ii",
    "category": "weapons",
    "name": "Gem Blade II",
    "subtitle": "Rare sword",
    "summary": "Gem Blade II is a rare sword dealing 0.498 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/gem-blade-ii.png",
      "alt": "Gem Blade II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.498 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.72 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/gem-blade-i]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "85"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Gem Blade II** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/gem-blade-i|Gem Blade I]].",
          "In the game this is step II of the numbered Gem Blade upgrade line.",
          "*In-game description: “This is the treasure of thieves.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.498 x hero ATK per hit; about 5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1 (total x5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.72 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/gem-blade-i|Gem Blade I]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/gem-blade-i|Gem Blade I]].",
          "Upgrades into [[weapons/gem-blade-iii|Gem Blade III]] (Epic) for 25 [[items/coin|coins]]. Damage 0.623 x [[mechanics/hero-training|hero ATK]], compared with 0.498 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "gem-blade-i"
      },
      {
        "category": "weapons",
        "slug": "gem-blade-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "gem-blade-iii",
    "category": "weapons",
    "name": "Gem Blade III",
    "subtitle": "Epic sword",
    "summary": "Gem Blade III is an epic sword dealing 0.623 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/gem-blade-iii.png",
      "alt": "Gem Blade III weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.623 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.23 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/gem-blade-ii]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "86"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Gem Blade III** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/gem-blade-ii|Gem Blade II]].",
          "In the game this is step III of the numbered Gem Blade upgrade line.",
          "*In-game description: “This is the treasure of thieves.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.623 x hero ATK per hit; about 6.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1 (total x5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.23 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/gem-blade-ii|Gem Blade II]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/gem-blade-ii|Gem Blade II]].",
          "Upgrades into [[weapons/gem-blade-iv|Gem Blade IV]] (Epic) for 35 [[items/coin|coins]]. Damage 0.748 x [[mechanics/hero-training|hero ATK]], compared with 0.623 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "gem-blade-ii"
      },
      {
        "category": "weapons",
        "slug": "gem-blade-iv"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "gem-blade-iv",
    "category": "weapons",
    "name": "Gem Blade IV",
    "subtitle": "Epic sword",
    "summary": "Gem Blade IV is an epic sword dealing 0.748 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/gem-blade-iv.png",
      "alt": "Gem Blade IV weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.748 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.23 s per swing"
      },
      {
        "label": "Combo",
        "value": "6 steps, damage multipliers x1, x1, x1, x1, x1, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.16 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/gem-blade-iii]] + 35 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "87"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Gem Blade IV** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/gem-blade-iii|Gem Blade III]].",
          "In the game this is step IV of the numbered Gem Blade upgrade line.",
          "*In-game description: “This is the treasure of thieves.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.748 x hero ATK per hit; about 7.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.23 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "6"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x2 (total x7 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 3.16 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 6 steps with damage multipliers x1, x1, x1, x1, x1, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/gem-blade-iii|Gem Blade III]] plus 35 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/gem-blade-iii|Gem Blade III]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "gem-blade-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "mithril-sword-mk-1",
    "category": "weapons",
    "name": "Mithril Sword (Mk 1)",
    "subtitle": "Common fast blade",
    "summary": "Mithril Sword (Mk 1) is a common fast blade dealing 0.36 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/mithril-sword-mk-1.png",
      "alt": "Mithril Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.36 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.4 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/blue-sword]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "88"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Mithril Sword (Mk 1)** is a common fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/blue-sword|Blue Sword]].",
          "The game shows this weapon simply as \"Mithril Sword\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "*In-game description: “Unknow.”*",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.36 x hero ATK per hit; about 3.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.4 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/blue-sword|Blue Sword]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/blue-sword|Blue Sword]].",
          "Upgrades into [[weapons/mithril-sword-mk-2|Mithril Sword (Mk 2)]] (Common) for 20 [[items/coin|coins]]. Damage 0.449 x [[mechanics/hero-training|hero ATK]], compared with 0.36 now.",
          "Upgrades into [[weapons/big-blue-sword|Big Blue Sword]] (Rare) for 25 coins. Damage 0.565 x hero ATK, compared with 0.36 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Common",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "blue-sword"
      },
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-2"
      },
      {
        "category": "weapons",
        "slug": "big-blue-sword"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "mithril-sword-mk-2",
    "category": "weapons",
    "name": "Mithril Sword (Mk 2)",
    "subtitle": "Common fast blade",
    "summary": "Mithril Sword (Mk 2) is a common fast blade dealing 0.449 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/mithril-sword-mk-2.png",
      "alt": "Mithril Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.449 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.81 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/mithril-sword-mk-1]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "89"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Mithril Sword (Mk 2)** is a common fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]].",
          "The game shows this weapon simply as \"Mithril Sword\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "*In-game description: “Unknow.”*",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.449 x hero ATK per hit; about 4.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.81 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]].",
          "Upgrades into [[weapons/mithril-sword-mk-3|Mithril Sword (Mk 3)]] (Rare) for 25 [[items/coin|coins]]. Damage 0.531 x [[mechanics/hero-training|hero ATK]], compared with 0.449 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Common",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-1"
      },
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-3"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "mithril-sword-mk-3",
    "category": "weapons",
    "name": "Mithril Sword (Mk 3)",
    "subtitle": "Rare fast blade",
    "summary": "Mithril Sword (Mk 3) is a rare fast blade dealing 0.531 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/mithril-sword-mk-3.png",
      "alt": "Mithril Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.531 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.31 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/mithril-sword-mk-2]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "90"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Mithril Sword (Mk 3)** is a rare fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/mithril-sword-mk-2|Mithril Sword (Mk 2)]].",
          "The game shows this weapon simply as \"Mithril Sword\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 3) in upgrade order so that each has its own page.",
          "*In-game description: “Unknow.”*",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.531 x hero ATK per hit; about 5.3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.31 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/mithril-sword-mk-2|Mithril Sword (Mk 2)]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/mithril-sword-mk-2|Mithril Sword (Mk 2)]].",
          "Upgrades into [[weapons/mithril-sword-ii-mk-1|Mithril Sword II (Mk 1)]] (Rare) for 30 [[items/coin|coins]]. Damage 0.654 x [[mechanics/hero-training|hero ATK]], compared with 0.531 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-2"
      },
      {
        "category": "weapons",
        "slug": "mithril-sword-ii-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "mithril-sword-ii-mk-1",
    "category": "weapons",
    "name": "Mithril Sword II (Mk 1)",
    "subtitle": "Rare fast blade",
    "summary": "Mithril Sword II (Mk 1) is a rare fast blade dealing 0.654 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/mithril-sword-ii-mk-1.png",
      "alt": "Mithril Sword II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.654 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.87 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/mithril-sword-mk-3]] + 30 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "93"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Mithril Sword II (Mk 1)** is a rare fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/mithril-sword-mk-3|Mithril Sword (Mk 3)]].",
          "The game shows this weapon simply as \"Mithril Sword II\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.654 x hero ATK per hit; about 6.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.87 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/mithril-sword-mk-3|Mithril Sword (Mk 3)]] plus 30 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/mithril-sword-mk-3|Mithril Sword (Mk 3)]].",
          "Upgrades into [[weapons/mithril-sword-ii-mk-2|Mithril Sword II (Mk 2)]] (Epic) for 35 [[items/coin|coins]]. Damage 0.719 x [[mechanics/hero-training|hero ATK]], compared with 0.654 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-3"
      },
      {
        "category": "weapons",
        "slug": "mithril-sword-ii-mk-2"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "mithril-sword-ii-mk-2",
    "category": "weapons",
    "name": "Mithril Sword II (Mk 2)",
    "subtitle": "Epic fast blade",
    "summary": "Mithril Sword II (Mk 2) is an epic fast blade dealing 0.719 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/mithril-sword-ii-mk-2.png",
      "alt": "Mithril Sword II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.719 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "8 steps, damage multipliers x1, x1, x1, x1, x1, x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.16 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/mithril-sword-ii-mk-1]] + 35 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "94"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Mithril Sword II (Mk 2)** is an epic fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/mithril-sword-ii-mk-1|Mithril Sword II (Mk 1)]].",
          "The game shows this weapon simply as \"Mithril Sword II\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.719 x hero ATK per hit; about 7.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "8"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1, x1, x1, x1 (total x8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 3.16 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 8 steps with damage multipliers x1, x1, x1, x1, x1, x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/mithril-sword-ii-mk-1|Mithril Sword II (Mk 1)]] plus 35 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/mithril-sword-ii-mk-1|Mithril Sword II (Mk 1)]].",
          "Upgrades into [[weapons/reaper-scythe|Reaper Scythe]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 1.268 x [[mechanics/hero-training|hero ATK]], compared with 0.719 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-ii-mk-1"
      },
      {
        "category": "weapons",
        "slug": "reaper-scythe"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "ninja-sword",
    "category": "weapons",
    "name": "Ninja Sword",
    "subtitle": "Rare fast blade",
    "summary": "Ninja Sword is a rare fast blade dealing 0.65 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/ninja-sword.png",
      "alt": "Ninja Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.65 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.5 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/ninja-blade]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "95"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Ninja Sword** is a rare fast blade in The Last Dungeon, a melee weapon crafted from [[weapons/ninja-blade|Ninja Blade]].",
          "*In-game description: “with just enough speed can cut everything.”*",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.65 x hero ATK per hit; about 6.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1 (total x3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.5 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 3 steps with damage multipliers x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/ninja-blade|Ninja Blade]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/ninja-blade|Ninja Blade]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ninja-blade"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "ninja-blade",
    "category": "weapons",
    "name": "Ninja Blade",
    "subtitle": "Rare fast blade",
    "summary": "Ninja Blade is a rare fast blade dealing 0.5 x hero ATK per hit. It chains many quick swings into long combos.",
    "image": {
      "src": "/ld/wiki/weapons/ninja-blade.png",
      "alt": "Ninja Blade weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Fast blade"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.5 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.2 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.15 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "96"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Ninja Blade** is a rare fast blade in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "Fast blades swing at very short intervals and chain long combos, so each hit is light but the blade lands many hits per second."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.5 x hero ATK per hit; about 5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.2 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1 (total x3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.15 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Because the swing time is short, the blade lands far more hits than a normal sword.",
          "Combo: 3 steps with damage multipliers x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/ninja-sword|Ninja Sword]] (Rare) for 15 [[items/coin|coins]]. Damage 0.65 x [[mechanics/hero-training|hero ATK]], compared with 0.5 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "On-hit [[mechanics/level-up-card-picks|cards]] such as [[buffs/stun|Stun]] and [[buffs/thundering|Thundering]] roll on every swing, so fast blades trigger them far more often.",
          "Melee weapons use no ammo, so a fast blade is a reliable fallback.",
          "Melee combo cards that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Fast blade",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ninja-sword"
      },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "sphinx-sword-i",
    "category": "weapons",
    "name": "Sphinx Sword I",
    "subtitle": "Rare sword",
    "summary": "Sphinx Sword I is a rare sword dealing 0.464 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/sphinx-sword-i.png",
      "alt": "Sphinx Sword I weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.464 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "10 steps, damage multipliers x1, x1, x1.2, x1.2, x1.2, x1, x1, x1.2, x1.2, x1.2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.52 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/steel-anchor-i]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "97"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sphinx Sword I** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/steel-anchor-i|Steel Anchor I]].",
          "In the game this is step I of the numbered Sphinx Sword upgrade line.",
          "*In-game description: “Sword taken from tombs in pyramids.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.464 x hero ATK per hit; about 4.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "10"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.2, x1.2, x1.2, x1, x1, x1.2, x1.2, x1.2 (total x11.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.52 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 10 steps with damage multipliers x1, x1, x1.2, x1.2, x1.2, x1, x1, x1.2, x1.2, x1.2. The last step (x1.2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/steel-anchor-i|Steel Anchor I]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/steel-anchor-i|Steel Anchor I]].",
          "Upgrades into [[weapons/sphinx-sword-ii|Sphinx Sword II]] (Epic) for 20 [[items/coin|coins]]. Damage 0.557 x [[mechanics/hero-training|hero ATK]], compared with 0.464 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "steel-anchor-i"
      },
      {
        "category": "weapons",
        "slug": "sphinx-sword-ii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "sphinx-sword-ii",
    "category": "weapons",
    "name": "Sphinx Sword II",
    "subtitle": "Epic sword",
    "summary": "Sphinx Sword II is an epic sword dealing 0.557 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/sphinx-sword-ii.png",
      "alt": "Sphinx Sword II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.557 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.32 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.2, x1.2, x1.2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.65 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/sphinx-sword-i]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "98"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sphinx Sword II** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/sphinx-sword-i|Sphinx Sword I]].",
          "In the game this is step II of the numbered Sphinx Sword upgrade line.",
          "*In-game description: “Sword taken from tombs in pyramids.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.557 x hero ATK per hit; about 5.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.32 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.2, x1.2, x1.2 (total x5.6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.65 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.2, x1.2, x1.2. The last step (x1.2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/sphinx-sword-i|Sphinx Sword I]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/sphinx-sword-i|Sphinx Sword I]].",
          "Upgrades into [[weapons/sphinx-sword-iii|Sphinx Sword III]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 0.974 x [[mechanics/hero-training|hero ATK]], compared with 0.557 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sphinx-sword-i"
      },
      {
        "category": "weapons",
        "slug": "sphinx-sword-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "sphinx-sword-iii",
    "category": "weapons",
    "name": "Sphinx Sword III",
    "subtitle": "Legendary sword",
    "summary": "Sphinx Sword III is a legendary sword dealing 0.974 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/sphinx-sword-iii.png",
      "alt": "Sphinx Sword III weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "0.974 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.26 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.2, x1.2, x1.2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 4.03 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/sphinx-sword-ii]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "99"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sphinx Sword III** is a legendary sword in The Last Dungeon, a melee weapon crafted from [[weapons/sphinx-sword-ii|Sphinx Sword II]].",
          "In the game this is step III of the numbered Sphinx Sword upgrade line.",
          "*In-game description: “Sword taken from tombs in pyramids.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.974 x hero ATK per hit; about 9.7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Swing time",
              "0.26 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.2, x1.2, x1.2 (total x5.6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 4.03 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.2, x1.2, x1.2. The last step (x1.2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/sphinx-sword-ii|Sphinx Sword II]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/sphinx-sword-ii|Sphinx Sword II]].",
          "Upgrades into [[weapons/sphinx-sword-iv|Sphinx Sword IV]] (Legendary) for 45 [[items/coin|coins]]. Damage 1.114 x [[mechanics/hero-training|hero ATK]], compared with 0.974 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Legendary",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sphinx-sword-ii"
      },
      {
        "category": "weapons",
        "slug": "sphinx-sword-iv"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "sphinx-sword-iv",
    "category": "weapons",
    "name": "Sphinx Sword IV",
    "subtitle": "Legendary sword",
    "summary": "Sphinx Sword IV is a legendary sword dealing 1.114 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/sphinx-sword-iv.png",
      "alt": "Sphinx Sword IV weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.114 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1.2, x1.2, x1.2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 4.8 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/sphinx-sword-iii]] + 45 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "100"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sphinx Sword IV** is a legendary sword in The Last Dungeon, a melee weapon crafted from [[weapons/sphinx-sword-iii|Sphinx Sword III]].",
          "In the game this is step IV of the numbered Sphinx Sword upgrade line.",
          "*In-game description: “Sword taken from tombs in pyramids.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.114 x hero ATK per hit; about 11.1 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.2, x1.2, x1.2 (total x5.6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 4.8 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 5 steps with damage multipliers x1, x1, x1.2, x1.2, x1.2. The last step (x1.2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/sphinx-sword-iii|Sphinx Sword III]] plus 45 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/sphinx-sword-iii|Sphinx Sword III]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Legendary",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sphinx-sword-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "steel-anchor-i",
    "category": "weapons",
    "name": "Steel Anchor I",
    "subtitle": "Rare heavy melee",
    "summary": "Steel Anchor I is a rare heavy melee dealing 0.422 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/steel-anchor-i.png",
      "alt": "Steel Anchor I weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.422 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.35 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.06 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "101"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Steel Anchor I** is a rare heavy melee in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "In the game this is step I of the numbered Steel Anchor upgrade line.",
          "*In-game description: “Extreamly heavy.”*",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.422 x hero ATK per hit; about 4.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.35 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1 (total x3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.06 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "Combo: 3 steps with damage multipliers x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/sphinx-sword-i|Sphinx Sword I]] (Rare) for 15 [[items/coin|coins]]. Damage 0.464 x [[mechanics/hero-training|hero ATK]], compared with 0.422 now.",
          "Upgrades into [[weapons/steel-anchor-ii|Steel Anchor II]] (Rare) for 20 coins. Damage 0.549 x hero ATK, compared with 0.422 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sphinx-sword-i"
      },
      {
        "category": "weapons",
        "slug": "steel-anchor-ii"
      },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "steel-anchor-ii",
    "category": "weapons",
    "name": "Steel Anchor II",
    "subtitle": "Rare heavy melee",
    "summary": "Steel Anchor II is a rare heavy melee dealing 0.549 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/steel-anchor-ii.png",
      "alt": "Steel Anchor II weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.549 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.35 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.38 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/steel-anchor-i]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "102"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Steel Anchor II** is a rare heavy melee in The Last Dungeon, a melee weapon found as loot and also craftable from [[weapons/steel-anchor-i|Steel Anchor I]].",
          "In the game this is step II of the numbered Steel Anchor upgrade line.",
          "*In-game description: “Extreamly heavy.”*",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.549 x hero ATK per hit; about 5.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.35 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1 (total x3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.38 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "Combo: 3 steps with damage multipliers x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/steel-anchor-i|Steel Anchor I]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/steel-anchor-i|Steel Anchor I]].",
          "Upgrades into [[weapons/steel-anchor-iii|Steel Anchor III]] (Epic) for 25 [[items/coin|coins]]. Damage 0.591 x [[mechanics/hero-training|hero ATK]], compared with 0.549 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "steel-anchor-i"
      },
      {
        "category": "weapons",
        "slug": "steel-anchor-iii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "steel-anchor-iii",
    "category": "weapons",
    "name": "Steel Anchor III",
    "subtitle": "Epic heavy melee",
    "summary": "Steel Anchor III is an epic heavy melee dealing 0.591 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/steel-anchor-iii.png",
      "alt": "Steel Anchor III weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.591 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.74 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/steel-anchor-ii]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "103"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Steel Anchor III** is an epic heavy melee in The Last Dungeon, a melee weapon crafted from [[weapons/steel-anchor-ii|Steel Anchor II]].",
          "In the game this is step III of the numbered Steel Anchor upgrade line.",
          "*In-game description: “Extreamly heavy.”*",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.591 x hero ATK per hit; about 5.9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1 (total x3 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.74 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "Combo: 3 steps with damage multipliers x1, x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/steel-anchor-ii|Steel Anchor II]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/steel-anchor-ii|Steel Anchor II]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "steel-anchor-ii"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "staff",
    "category": "weapons",
    "name": "Staff",
    "subtitle": "Rare staff",
    "summary": "Staff is a rare staff dealing 1.9 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/staff.png",
      "alt": "Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "1.9 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "1 s between shots (about 1 per second)"
      },
      {
        "label": "Magazine",
        "value": "3 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.42 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/wooden-bow-ii]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "112"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Staff** is a rare staff in The Last Dungeon, a gun crafted from [[weapons/wooden-bow-ii|Wooden Bow II]].",
          "*In-game description: “A normal staff.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.9 x hero ATK per bolt; about 19 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "1 s between shots"
            ],
            [
              "Magazine / reload",
              "3 rounds / 2 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 24 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.42 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It fires a plain arcane bolt.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/wooden-bow-ii|Wooden Bow II]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/wooden-bow-ii|Wooden Bow II]].",
          "Upgrades into [[weapons/fire-staff|Fire Staff]] (Epic) for 20 [[items/coin|coins]]. Damage 2.25 x [[mechanics/hero-training|hero ATK]], compared with 1.9 now.",
          "Upgrades into [[weapons/ice-staff|Ice Staff]] (Epic) for 20 coins. Damage 2.25 x hero ATK, compared with 1.9 now.",
          "Upgrades into [[weapons/poison-staff|Poison Staff]] (Epic) for 25 coins. Damage 2.25 x hero ATK, compared with 1.9 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Rare",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "wooden-bow-ii"
      },
      {
        "category": "weapons",
        "slug": "fire-staff"
      },
      {
        "category": "weapons",
        "slug": "ice-staff"
      },
      {
        "category": "weapons",
        "slug": "poison-staff"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
    ]
  },
  {
    "slug": "fire-staff",
    "category": "weapons",
    "name": "Fire Staff",
    "subtitle": "Epic staff",
    "summary": "Fire Staff is an epic staff dealing 2.25 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/fire-staff.png",
      "alt": "Fire Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "2.25 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "1 s between shots (about 1 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.88 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/staff]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "113"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Fire Staff** is an epic staff in The Last Dungeon, a gun crafted from [[weapons/staff|Staff]].",
          "*In-game description: “Summon a fireball to attack enemy.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "2.25 x hero ATK per bolt; about 22.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "1 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 2 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 30 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.88 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each bolt that hits has a 40% chance to set the target on fire.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/staff|Staff]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/staff|Staff]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "staff"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "ice-staff",
    "category": "weapons",
    "name": "Ice Staff",
    "subtitle": "Epic staff",
    "summary": "Ice Staff is an epic staff dealing 2.25 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/ice-staff.png",
      "alt": "Ice Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "2.25 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "1 s between shots (about 1 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.88 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/staff]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "114"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Ice Staff** is an epic staff in The Last Dungeon, a gun crafted from [[weapons/staff|Staff]].",
          "*In-game description: “Summon an ice to attack enemy.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "2.25 x hero ATK per bolt; about 22.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "1 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 2 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 30 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.88 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each bolt that hits has a 40% chance to stun the target for 1.5 seconds.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/staff|Staff]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/staff|Staff]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "staff"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "poison-staff",
    "category": "weapons",
    "name": "Poison Staff",
    "subtitle": "Epic staff",
    "summary": "Poison Staff is an epic staff dealing 2.25 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/poison-staff.png",
      "alt": "Poison Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "2.25 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.5 s between shots (about 2 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "3 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.25 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/staff]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "115"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Poison Staff** is an epic staff in The Last Dungeon, a gun crafted from [[weapons/staff|Staff]].",
          "*In-game description: “Summon a magic ball attack enemy.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "2.25 x hero ATK per bolt; about 22.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.5 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 3 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 30 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 2.25 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each bolt that hits has a 40% chance to leave a poison cloud on the target.",
          "It fires twice as often as the other elemental staffs (0.5 seconds between shots) but reloads for 3 seconds.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/staff|Staff]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/staff|Staff]].",
          "Upgrades into [[weapons/void-staff|Void Staff]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 3 x [[mechanics/hero-training|hero ATK]], compared with 2.25 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "staff"
      },
      {
        "category": "weapons",
        "slug": "void-staff"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "cursed-staff",
    "category": "weapons",
    "name": "Cursed Staff",
    "subtitle": "Legendary staff",
    "summary": "Cursed Staff is a legendary staff dealing 2.4 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/cursed-staff.png",
      "alt": "Cursed Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "2.4 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.5 s between shots (about 2 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "124"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Cursed Staff** is a legendary staff in The Last Dungeon, a gun found as loot in the dungeon.",
          "*In-game description: “There is a witch spirit trapped in this staff.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "2.4 x hero ATK per bolt; about 24 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Fire rate",
              "0.5 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 2 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 40 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "1"
            ],
            [
              "Sustained damage (derived)",
              "About 3 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each shot launches a magic bolt that homes in on enemies instead of flying in a straight line. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "The bolt is a homing bolt: it flies to the nearest target first, then hops between random living enemies, hitting up to 4 times in all. With a single enemy alive it hits once.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 4 legendary gear items that can drop, so this weapon is about 1 in 4 of the legendary rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "Legendary rolls are rare in ordinary chests. The [[items/boss-chest|boss chest]] never gives Common or Rare gear and has the best odds of Legendary."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Legendary",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "ak47",
    "category": "weapons",
    "name": "AK47",
    "subtitle": "Rare rifle",
    "summary": "AK47 is a rare rifle dealing 0.4 x hero ATK per bullet. It fires a steady stream of accurate bullets.",
    "image": {
      "src": "/ld/wiki/weapons/ak47.png",
      "alt": "AK47 weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Rifle"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.4 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.15 s between shots (about 6.7 per second)"
      },
      {
        "label": "Magazine",
        "value": "30 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "3 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 11 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.89 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "128"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**AK47** is a rare rifle in The Last Dungeon, a gun found as loot in the dungeon.",
          "Rifles fire bullets at a steady rate from a decent magazine and are the all-round long-range guns of the arsenal."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.4 x hero ATK per bullet; about 4 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.15 s between shots"
            ],
            [
              "Magazine / reload",
              "30 rounds / 2 s"
            ],
            [
              "Ammo",
              "3 ammo unit(s) per round from the shared pool of 1000 (about 333 rounds from a full pool, 90 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.89 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It fires 30-round magazines with a small random scatter of up to 11 degrees.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Rifles are accurate enough to benefit from [[buffs/growing|Growing]], which adds damage the farther a bullet flies.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Rifle",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "bm-129-laser-rifle",
    "category": "weapons",
    "name": "BM-129 Laser Rifle",
    "subtitle": "Epic rifle",
    "summary": "BM-129 Laser Rifle is an epic rifle dealing 0.9 x hero ATK per bullet. It fires a steady stream of accurate bullets.",
    "image": {
      "src": "/ld/wiki/weapons/bm-129-laser-rifle.png",
      "alt": "BM-129 Laser Rifle weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Rifle"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.9 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.7 s between shots (about 1.4 per second)"
      },
      {
        "label": "Magazine",
        "value": "10 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 11 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.08 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "129"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**BM-129 Laser Rifle** is an epic rifle in The Last Dungeon, a gun found as loot in the dungeon.",
          "Rifles fire bullets at a steady rate from a decent magazine and are the all-round long-range guns of the arsenal."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.9 x hero ATK per bullet; about 9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.7 s between shots"
            ],
            [
              "Magazine / reload",
              "10 rounds / 2 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 80 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.08 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Its laser bolts ricochet: each bolt can bounce up to 5 times, reflecting off walls and jumping to the next nearest enemy within 8 units after a hit.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Rifles are accurate enough to benefit from [[buffs/growing|Growing]], which adds damage the farther a bullet flies.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Rifle",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "desert-eagle-mk-1",
    "category": "weapons",
    "name": "Desert Eagle (Mk 1)",
    "subtitle": "Rare heavy pistol",
    "summary": "Desert Eagle (Mk 1) is a rare heavy pistol dealing 0.5 x hero ATK per bullet. It fires single shots with a modest magazine.",
    "image": {
      "src": "/ld/wiki/weapons/desert-eagle-mk-1.png",
      "alt": "Desert Eagle weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy pistol"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.5 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.7 s between shots (about 1.4 per second)"
      },
      {
        "label": "Magazine",
        "value": "7 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "3 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 0.56 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "130"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Desert Eagle (Mk 1)** is a rare heavy pistol in The Last Dungeon, a gun found as loot in the dungeon.",
          "The game shows this weapon simply as \"Desert Eagle\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "Pistols and heavy pistols are single-shot guns with a modest magazine and a small random scatter."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.5 x hero ATK per bullet; about 5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.7 s between shots"
            ],
            [
              "Magazine / reload",
              "7 rounds / 2 s"
            ],
            [
              "Ammo",
              "3 ammo unit(s) per round from the shared pool of 1000 (about 333 rounds from a full pool, 21 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4.5"
            ],
            [
              "Sustained damage (derived)",
              "About 0.56 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Its bullets are fast (projectile speed 4.5) and the magazine holds 7 rounds.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/desert-eagle-mk-2|Desert Eagle (Mk 2)]] (Rare) for 15 [[items/coin|coins]]. Damage 0.9 x [[mechanics/hero-training|hero ATK]], compared with 0.5 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A cheap, accurate gun for the early floors; upgrade it along its line as [[items/coin|coins]] allow.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy pistol",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "desert-eagle-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "pistol-mk-1",
    "category": "weapons",
    "name": "Pistol (Mk 1)",
    "subtitle": "Common heavy pistol",
    "summary": "Pistol (Mk 1) is a common heavy pistol dealing 0.3 x hero ATK per bullet. It fires single shots with a modest magazine.",
    "image": {
      "src": "/ld/wiki/weapons/pistol-mk-1.png",
      "alt": "Pistol weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy pistol"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.3 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "10 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "4 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 0.81 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "131"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Pistol (Mk 1)** is a common heavy pistol in The Last Dungeon, a gun found as loot in the dungeon.",
          "The game shows this weapon simply as \"Pistol\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "Pistols and heavy pistols are single-shot guns with a modest magazine and a small random scatter."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.3 x hero ATK per bullet; about 3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "10 rounds / 1 s"
            ],
            [
              "Ammo",
              "4 ammo unit(s) per round from the shared pool of 1000 (about 250 rounds from a full pool, 40 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.2"
            ],
            [
              "Sustained damage (derived)",
              "About 0.81 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/pistol-mk-2|Pistol (Mk 2)]] (Common) for 15 [[items/coin|coins]]. Damage 0.4 x [[mechanics/hero-training|hero ATK]], compared with 0.3 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A cheap, accurate gun for the early floors; upgrade it along its line as [[items/coin|coins]] allow.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy pistol",
      "Common",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pistol-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "pistol-mk-2",
    "category": "weapons",
    "name": "Pistol (Mk 2)",
    "subtitle": "Common heavy pistol",
    "summary": "Pistol (Mk 2) is a common heavy pistol dealing 0.4 x hero ATK per bullet. It fires single shots with a modest magazine.",
    "image": {
      "src": "/ld/wiki/weapons/pistol-mk-2.png",
      "alt": "Pistol weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy pistol"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.4 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.25 s between shots (about 4 per second)"
      },
      {
        "label": "Magazine",
        "value": "10 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "3 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.23 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/pistol-mk-1]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "132"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Pistol (Mk 2)** is a common heavy pistol in The Last Dungeon, a gun crafted from [[weapons/pistol-mk-1|Pistol (Mk 1)]].",
          "The game shows this weapon simply as \"Pistol\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "Pistols and heavy pistols are single-shot guns with a modest magazine and a small random scatter."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.4 x hero ATK per bullet; about 4 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Fire rate",
              "0.25 s between shots"
            ],
            [
              "Magazine / reload",
              "10 rounds / 1 s"
            ],
            [
              "Ammo",
              "3 ammo unit(s) per round from the shared pool of 1000 (about 333 rounds from a full pool, 30 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.2"
            ],
            [
              "Sustained damage (derived)",
              "About 1.23 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/pistol-mk-1|Pistol (Mk 1)]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/pistol-mk-1|Pistol (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A cheap, accurate gun for the early floors; upgrade it along its line as [[items/coin|coins]] allow.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy pistol",
      "Common",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pistol-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "bomb-shot" },
    ]
  },
  {
    "slug": "desert-eagle-mk-2",
    "category": "weapons",
    "name": "Desert Eagle (Mk 2)",
    "subtitle": "Rare heavy pistol",
    "summary": "Desert Eagle (Mk 2) is a rare heavy pistol dealing 0.9 x hero ATK per bullet. It fires single shots with a modest magazine.",
    "image": {
      "src": "/ld/wiki/weapons/desert-eagle-mk-2.png",
      "alt": "Desert Eagle weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy pistol"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.9 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.6 s between shots (about 1.7 per second)"
      },
      {
        "label": "Magazine",
        "value": "7 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "5 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.12 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/desert-eagle-mk-1]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "133"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Desert Eagle (Mk 2)** is a rare heavy pistol in The Last Dungeon, a gun found as loot and also craftable from [[weapons/desert-eagle-mk-1|Desert Eagle (Mk 1)]].",
          "The game shows this weapon simply as \"Desert Eagle\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "Pistols and heavy pistols are single-shot guns with a modest magazine and a small random scatter."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.9 x hero ATK per bullet; about 9 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.6 s between shots"
            ],
            [
              "Magazine / reload",
              "7 rounds / 2 s"
            ],
            [
              "Ammo",
              "5 ammo unit(s) per round from the shared pool of 1000 (about 200 rounds from a full pool, 35 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4.5"
            ],
            [
              "Sustained damage (derived)",
              "About 1.12 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "The upgraded Desert Eagle hits almost twice as hard as the first one and fires slightly faster.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/desert-eagle-mk-1|Desert Eagle (Mk 1)]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/desert-eagle-mk-1|Desert Eagle (Mk 1)]].",
          "Upgrades into [[weapons/hand-cannon|Hand Cannon]] (Epic) for 15 [[items/coin|coins]]. Damage 1.25 x [[mechanics/hero-training|hero ATK]], compared with 0.9 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A cheap, accurate gun for the early floors; upgrade it along its line as coins allow.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy pistol",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "desert-eagle-mk-1"
      },
      {
        "category": "weapons",
        "slug": "hand-cannon"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "revolver-mk-1",
    "category": "weapons",
    "name": "Revolver (Mk 1)",
    "subtitle": "Rare revolver",
    "summary": "Revolver (Mk 1) is a rare revolver dealing 0.42 x hero ATK per bullet. It never needs ammo.",
    "image": {
      "src": "/ld/wiki/weapons/revolver-mk-1.png",
      "alt": "Revolver weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Revolver"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.42 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.6 s between shots (about 1.7 per second)"
      },
      {
        "label": "Magazine",
        "value": "6 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "None (infinite ammo)"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 0.63 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Starter weapon, also loot"
      },
      {
        "label": "Item ID",
        "value": "134"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Revolver (Mk 1)** is a rare revolver and one of the two weapons every new run starts with (the other is [[weapons/blue-sword|Blue Sword]]). It is also in the loot pool.",
          "The game shows this weapon simply as \"Revolver\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "The Revolver is the [[mechanics/the-run|starting gun]]: a six-shot sidearm with infinite ammo that never touches the [[mechanics/ammo-pool|shared ammo pool]]."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.42 x hero ATK per bullet; about 4.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.6 s between shots"
            ],
            [
              "Magazine / reload",
              "6 rounds / 1 s"
            ],
            [
              "Ammo",
              "Infinite: never draws from the [[mechanics/ammo-pool|shared ammo pool]]"
            ],
            [
              "Projectile speed",
              "4.5"
            ],
            [
              "Sustained damage (derived)",
              "About 0.63 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It fires one bullet per shot with a little random scatter, six shots per magazine.",
          "Its ammo is infinite, so it keeps working when the [[mechanics/ammo-pool|shared ammo pool]] is empty."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/the-run|Starter weapon]]: it is in your [[mechanics/inventory-and-bag|bag]] at the start of every run.",
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/revolver-mk-2|Revolver (Mk 2)]] (Rare) for 15 [[items/coin|coins]]. Damage 0.42 x [[mechanics/hero-training|hero ATK]], compared with 0.42 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Because its ammo is infinite, it is the fallback when your other guns have emptied the shared ammo pool. Cards that save ammo, such as [[buffs/infinity|Infinity]], do nothing for it.",
          "[[mechanics/crafting|Craft]] it up early: each upgrade is cheap in [[items/coin|coins]].",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Revolver",
      "Rare",
      "Ranged",
      "Starter"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "revolver-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "revolver-mk-2",
    "category": "weapons",
    "name": "Revolver (Mk 2)",
    "subtitle": "Rare revolver",
    "summary": "Revolver (Mk 2) is a rare revolver dealing 0.42 x hero ATK per bullet. It never needs ammo.",
    "image": {
      "src": "/ld/wiki/weapons/revolver-mk-2.png",
      "alt": "Revolver weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Revolver"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.42 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.4 s between shots (about 2.5 per second)"
      },
      {
        "label": "Magazine",
        "value": "6 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "None (infinite ammo)"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.01 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot and craft"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/revolver-mk-1]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "135"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Revolver (Mk 2)** is a rare revolver in The Last Dungeon, a gun found as loot and also craftable from [[weapons/revolver-mk-1|Revolver (Mk 1)]].",
          "The game shows this weapon simply as \"Revolver\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "The Revolver is the [[mechanics/the-run|starting gun]]: a six-shot sidearm with infinite ammo that never touches the [[mechanics/ammo-pool|shared ammo pool]]."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.42 x hero ATK per bullet; about 4.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.4 s between shots"
            ],
            [
              "Magazine / reload",
              "6 rounds / 0.5 s"
            ],
            [
              "Ammo",
              "Infinite: never draws from the [[mechanics/ammo-pool|shared ammo pool]]"
            ],
            [
              "Projectile speed",
              "4.5"
            ],
            [
              "Sustained damage (derived)",
              "About 1.01 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "This is the upgraded Revolver: the same damage as the first one, but it fires and reloads faster.",
          "Its ammo is infinite, so it keeps working when the [[mechanics/ammo-pool|shared ammo pool]] is empty."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "[[mechanics/crafting|Craft]]: from [[weapons/revolver-mk-1|Revolver (Mk 1)]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/revolver-mk-1|Revolver (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Because its ammo is infinite, it is the fallback when your other guns have emptied the shared ammo pool. Cards that save ammo, such as [[buffs/infinity|Infinity]], do nothing for it.",
          "[[mechanics/crafting|Craft]] it up early: each upgrade is cheap in [[items/coin|coins]].",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Revolver",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "revolver-mk-1"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "recipes" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "nano-pistol-mk-1",
    "category": "weapons",
    "name": "Nano Pistol (Mk 1)",
    "subtitle": "Rare SMG",
    "summary": "Nano Pistol (Mk 1) is a rare SMG dealing 0.182 x hero ATK per bullet. It trades damage per bullet for sheer volume.",
    "image": {
      "src": "/ld/wiki/weapons/nano-pistol-mk-1.png",
      "alt": "Nano Pistol weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "SMG"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.182 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.4 s between shots (about 2.5 per second)"
      },
      {
        "label": "Magazine",
        "value": "6 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "4 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "Burst of 2 bullets, 0.15 s apart"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 0.73 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "136"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Nano Pistol (Mk 1)** is a rare SMG in The Last Dungeon, a gun found as loot in the dungeon.",
          "The game shows this weapon simply as \"Nano Pistol\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 1) in upgrade order so that each has its own page.",
          "SMGs fire very fast streams of small bullets from a big magazine, so they are strong at close and medium range but burn through ammo quickly."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.182 x hero ATK per bullet; about 1.8 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.4 s between shots"
            ],
            [
              "Magazine / reload",
              "6 rounds / 1 s"
            ],
            [
              "Ammo",
              "4 ammo unit(s) per round from the shared pool of 1000 (about 250 rounds from a full pool, 24 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "5"
            ],
            [
              "Sustained damage (derived)",
              "About 0.73 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each trigger pull fires a burst of 2 bullets, 0.15 seconds apart.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/nano-pistol-mk-2|Nano Pistol (Mk 2)]] (Rare) for 25 [[items/coin|coins]]. Damage 0.228 x [[mechanics/hero-training|hero ATK]], compared with 0.182 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each bullet is weak, so [[mechanics/level-up-card-picks|cards]] that raise damage per hit ([[buffs/sharpness|Sharpness]]) and extra effects per bullet ([[buffs/bomb-shot|Bomb Shot]], [[buffs/piercing|Piercing]]) work very well.",
          "Watch the [[mechanics/ammo-pool|ammo pool]]: a fast gun can empty it in a long fight.",
          "Gun cards that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "SMG",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "nano-pistol-mk-2"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "nano-pistol-mk-2",
    "category": "weapons",
    "name": "Nano Pistol (Mk 2)",
    "subtitle": "Rare SMG",
    "summary": "Nano Pistol (Mk 2) is a rare SMG dealing 0.228 x hero ATK per bullet. It trades damage per bullet for sheer volume.",
    "image": {
      "src": "/ld/wiki/weapons/nano-pistol-mk-2.png",
      "alt": "Nano Pistol weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "SMG"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.228 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "7 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "4 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "Burst of 4 bullets, 0.1 s apart"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.28 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/nano-pistol-mk-1]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "137"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Nano Pistol (Mk 2)** is a rare SMG in The Last Dungeon, a gun crafted from [[weapons/nano-pistol-mk-1|Nano Pistol (Mk 1)]].",
          "The game shows this weapon simply as \"Nano Pistol\", the same name as its other upgrade steps. The wiki numbers the steps (Mk 2) in upgrade order so that each has its own page.",
          "SMGs fire very fast streams of small bullets from a big magazine, so they are strong at close and medium range but burn through ammo quickly."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.228 x hero ATK per bullet; about 2.3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "7 rounds / 1 s"
            ],
            [
              "Ammo",
              "4 ammo unit(s) per round from the shared pool of 1000 (about 250 rounds from a full pool, 28 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "5"
            ],
            [
              "Sustained damage (derived)",
              "About 2.28 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each trigger pull fires a burst of 4 bullets, 0.1 seconds apart.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/nano-pistol-mk-1|Nano Pistol (Mk 1)]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/nano-pistol-mk-1|Nano Pistol (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each bullet is weak, so [[mechanics/level-up-card-picks|cards]] that raise damage per hit ([[buffs/sharpness|Sharpness]]) and extra effects per bullet ([[buffs/bomb-shot|Bomb Shot]], [[buffs/piercing|Piercing]]) work very well.",
          "Watch the [[mechanics/ammo-pool|ammo pool]]: a fast gun can empty it in a long fight.",
          "Gun cards that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "SMG",
      "Rare",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "nano-pistol-mk-1"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "recipes" },
      { "category": "buffs", "slug": "sharpness" },
    ]
  },
  {
    "slug": "nano-shotgun",
    "category": "weapons",
    "name": "Nano Shotgun",
    "subtitle": "Rare shotgun",
    "summary": "Nano Shotgun is a rare shotgun dealing 0.2 x hero ATK per pellet. It fires a spread of pellets.",
    "image": {
      "src": "/ld/wiki/weapons/nano-shotgun.png",
      "alt": "Nano Shotgun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.2 x hero ATK per pellet"
      },
      {
        "label": "Fire rate",
        "value": "0.5 s between shots (about 2 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "5 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "5 pellets, random spread up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.67 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "138"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Nano Shotgun** is a rare shotgun in The Last Dungeon, a gun found as loot in the dungeon.",
          "Shotguns fire a spread of pellets with a random scatter. Each pellet carries the full weapon damage, so they are strongest up close where most pellets land."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.2 x hero ATK per pellet; about 2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.5 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 1 s"
            ],
            [
              "Ammo",
              "5 ammo unit(s) per round from the shared pool of 1000 (about 200 rounds from a full pool, 25 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "5"
            ],
            [
              "Sustained damage (derived)",
              "About 1.67 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every pull of the trigger fires several pellets at once, each flying at its own random angle inside the spread. Every pellet that lands deals the weapon's damage. When the magazine runs dry the gun reloads by itself.",
          "Each shot fires 5 pellets with a random scatter of up to 10 degrees.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Stay close: at long range most pellets miss.",
          "Every pellet rolls the on-hit effects, so [[buffs/poison|Poison]] clouds and [[buffs/bomb-shot|Bomb Shot]] counters fill quickly.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "uzi",
    "category": "weapons",
    "name": "Uzi",
    "subtitle": "Common SMG",
    "summary": "Uzi is a common SMG dealing 0.1 x hero ATK per bullet. It trades damage per bullet for sheer volume.",
    "image": {
      "src": "/ld/wiki/weapons/uzi.png",
      "alt": "Uzi weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "SMG"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.1 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.08 s between shots (about 12.5 per second)"
      },
      {
        "label": "Magazine",
        "value": "20 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "2 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 15 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 0.79 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "139"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Uzi** is a common SMG in The Last Dungeon, a gun found as loot in the dungeon.",
          "SMGs fire very fast streams of small bullets from a big magazine, so they are strong at close and medium range but burn through ammo quickly."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.1 x hero ATK per bullet; about 1 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Fire rate",
              "0.08 s between shots"
            ],
            [
              "Magazine / reload",
              "20 rounds / 1 s"
            ],
            [
              "Ammo",
              "2 ammo unit(s) per round from the shared pool of 1000 (about 500 rounds from a full pool, 40 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "5"
            ],
            [
              "Sustained damage (derived)",
              "About 0.79 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It has a 20-round magazine and fires one bullet every 0.08 seconds, the fastest rate of any gun. The bullets are small and push enemies back only a little.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each bullet is weak, so [[mechanics/level-up-card-picks|cards]] that raise damage per hit ([[buffs/sharpness|Sharpness]]) and extra effects per bullet ([[buffs/bomb-shot|Bomb Shot]], [[buffs/piercing|Piercing]]) work very well.",
          "Watch the [[mechanics/ammo-pool|ammo pool]]: a fast gun can empty it in a long fight.",
          "Gun cards that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "SMG",
      "Common",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "bounce-gun",
    "category": "weapons",
    "name": "Bounce Gun",
    "subtitle": "Epic SMG",
    "summary": "Bounce Gun is an epic SMG dealing 0.4 x hero ATK per bullet. It trades damage per bullet for sheer volume.",
    "image": {
      "src": "/ld/wiki/weapons/bounce-gun.png",
      "alt": "Bounce Gun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "SMG"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.4 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.15 s between shots (about 6.7 per second)"
      },
      {
        "label": "Magazine",
        "value": "30 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "2 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 15.1 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.24 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "140"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Bounce Gun** is an epic SMG in The Last Dungeon, a gun found as loot in the dungeon.",
          "SMGs fire very fast streams of small bullets from a big magazine, so they are strong at close and medium range but burn through ammo quickly."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.4 x hero ATK per bullet; about 4 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.15 s between shots"
            ],
            [
              "Magazine / reload",
              "30 rounds / 1 s"
            ],
            [
              "Ammo",
              "2 ammo unit(s) per round from the shared pool of 1000 (about 500 rounds from a full pool, 60 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.5"
            ],
            [
              "Sustained damage (derived)",
              "About 2.24 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Its bullets bounce: each bullet can ricochet up to 3 times, off walls or onto the next nearest enemy within 8 units after a hit. [[items/passive-items|Passive items]] that add bounces stack with this.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades into [[weapons/gatling-gun|Gatling Gun]] (Legendary) for 45 [[items/coin|coins]] and 2 [[items/gold]]. Damage 0.65 x [[mechanics/hero-training|hero ATK]], compared with 0.4 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each bullet is weak, so [[mechanics/level-up-card-picks|cards]] that raise damage per hit ([[buffs/sharpness|Sharpness]]) and extra effects per bullet ([[buffs/bomb-shot|Bomb Shot]], [[buffs/piercing|Piercing]]) work very well.",
          "Watch the [[mechanics/ammo-pool|ammo pool]]: a fast gun can empty it in a long fight.",
          "Gun cards that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "SMG",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "gatling-gun"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
      { "category": "dungeons", "slug": "store-room" },
    ]
  },
  {
    "slug": "big-blue-sword",
    "category": "weapons",
    "name": "Big Blue Sword",
    "subtitle": "Rare sword",
    "summary": "Big Blue Sword is a rare sword dealing 0.565 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/big-blue-sword.png",
      "alt": "Big Blue Sword weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.565 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.25 s per swing"
      },
      {
        "label": "Combo",
        "value": "4 steps, damage multipliers x1, x1, x1.5, x2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.07 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/mithril-sword-mk-1]] + 25 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "143"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Big Blue Sword** is a rare sword in The Last Dungeon, a melee weapon crafted from [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]].",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.565 x hero ATK per hit; about 5.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.25 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "4"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.5, x2 (total x5.5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.07 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Combo: 4 steps with damage multipliers x1, x1, x1.5, x2. The last step (x2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]] plus 25 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]].",
          "Upgrades into [[weapons/iron-sword-i|Iron Sword I]] (Rare) for 30 [[items/coin|coins]]. Damage 0.763 x [[mechanics/hero-training|hero ATK]], compared with 0.565 now."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-mk-1"
      },
      {
        "category": "weapons",
        "slug": "iron-sword-i"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "ice-gun",
    "category": "weapons",
    "name": "Ice Gun",
    "subtitle": "Epic special gun",
    "summary": "Ice Gun is an epic special gun dealing 0.75 x hero ATK per bullet. It fires an unusual projectile.",
    "image": {
      "src": "/ld/wiki/weapons/ice-gun.png",
      "alt": "Ice Gun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Special gun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.75 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.5 s between shots (about 2 per second)"
      },
      {
        "label": "Magazine",
        "value": "7 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.31 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "167"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Ice Gun** is an epic special gun in The Last Dungeon, a gun found as loot in the dungeon.",
          "*In-game description: “Reduce enemy movement speed.”*",
          "Special guns fire projectiles with an unusual twist instead of plain bullets."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.75 x hero ATK per bullet; about 7.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.5 s between shots"
            ],
            [
              "Magazine / reload",
              "7 rounds / 1 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 56 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.2"
            ],
            [
              "Sustained damage (derived)",
              "About 1.31 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each bullet that hits slows the enemy by 80% for 1 second.",
          "The Ice Gun was one of the guns unlocked in the [[dungeons/the-hub-island|hub]] for 12 clocks; the open-storage change now unlocks it from the start.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the hub costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "It was originally locked and unlocked in the [[dungeons/the-hub-island|hub]] for 12 clocks. The open-storage change now unlocks it from the first launch."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Check the behaviour section for what makes its projectile different.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Special gun",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "rocket",
    "category": "weapons",
    "name": "Rocket",
    "subtitle": "Epic special gun",
    "summary": "Rocket is an epic special gun dealing 0.75 x hero ATK per bullet. It fires an unusual projectile.",
    "image": {
      "src": "/ld/wiki/weapons/rocket.png",
      "alt": "Rocket weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Special gun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.75 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.6 s between shots (about 1.7 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "10 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.1 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "168"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Rocket** is an epic special gun in The Last Dungeon, a gun found as loot in the dungeon.",
          "Special guns fire projectiles with an unusual twist instead of plain bullets."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.75 x hero ATK per bullet; about 7.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.6 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 1 s"
            ],
            [
              "Ammo",
              "10 ammo unit(s) per round from the shared pool of 1000 (about 100 rounds from a full pool, 50 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.2"
            ],
            [
              "Sustained damage (derived)",
              "About 1.1 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It fires rockets, with the lowest ammo reserve of the special guns, so each round costs 10 ammo units.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "It was originally locked and unlocked in the [[dungeons/the-hub-island|hub]] for 10 clocks. The open-storage change now unlocks it from the first launch."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Check the behaviour section for what makes its projectile different.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Special gun",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "keblo-gun",
    "category": "weapons",
    "name": "Keblo Gun",
    "subtitle": "Epic special gun",
    "summary": "Keblo Gun is an epic special gun dealing 0.85 x hero ATK per bullet. It fires an unusual projectile.",
    "image": {
      "src": "/ld/wiki/weapons/keblo-gun.png",
      "alt": "Keblo Gun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Special gun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.85 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.5 s between shots (about 2 per second)"
      },
      {
        "label": "Magazine",
        "value": "15 rounds"
      },
      {
        "label": "Reload time",
        "value": "3 s"
      },
      {
        "label": "Ammo cost",
        "value": "4 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.27 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "169"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Keblo Gun** is an epic special gun in The Last Dungeon, a gun found as loot in the dungeon.",
          "Special guns fire projectiles with an unusual twist instead of plain bullets."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.85 x hero ATK per bullet; about 8.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.5 s between shots"
            ],
            [
              "Magazine / reload",
              "15 rounds / 3 s"
            ],
            [
              "Ammo",
              "4 ammo unit(s) per round from the shared pool of 1000 (about 250 rounds from a full pool, 60 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.2"
            ],
            [
              "Sustained damage (derived)",
              "About 1.27 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Its bullets are tougher than normal ones: they have 5 points of bullet resistance instead of 1, so they can cancel several enemy projectiles before breaking.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "It was originally locked and unlocked in the [[dungeons/the-hub-island|hub]] for 15 clocks. The open-storage change now unlocks it from the first launch."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Check the behaviour section for what makes its projectile different.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Special gun",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "fantasy-hammer",
    "category": "weapons",
    "name": "Fantasy Hammer",
    "subtitle": "Rare heavy melee",
    "summary": "Fantasy Hammer is a rare heavy melee dealing 0.8 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/fantasy-hammer.png",
      "alt": "Fantasy Hammer weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.8 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "2 steps, damage multipliers x1, x1"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.07 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "170"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Fantasy Hammer** is a rare heavy melee in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.8 x hero ATK per hit; about 8 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "2"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1 (total x2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.07 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "The hammer swings twice, with a long recovery (1.5 times the swing time) after each swing.",
          "Combo: 2 steps with damage multipliers x1, x1. The last step (x1) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "It was originally locked and unlocked in the [[dungeons/the-hub-island|hub]] for 15 clocks. The open-storage change now unlocks it from the first launch."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [ { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" }, { "category": "mechanics", "slug": "level-up-card-picks" } ]
  },
  {
    "slug": "shuriken",
    "category": "weapons",
    "name": "Shuriken",
    "subtitle": "Epic special gun",
    "summary": "Shuriken is an epic special gun dealing 0.3 x hero ATK per bullet. It fires an unusual projectile.",
    "image": {
      "src": "/ld/wiki/weapons/shuriken.png",
      "alt": "Shuriken weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Special gun"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.3 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.4 s between shots (about 2.5 per second)"
      },
      {
        "label": "Magazine",
        "value": "10 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "4 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "3-bullet fan"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.96 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "171"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Shuriken** is an epic special gun in The Last Dungeon, a gun found as loot in the dungeon.",
          "Special guns fire projectiles with an unusual twist instead of plain bullets."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.3 x hero ATK per bullet; about 3 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.4 s between shots"
            ],
            [
              "Magazine / reload",
              "10 rounds / 1 s"
            ],
            [
              "Ammo",
              "4 ammo unit(s) per round from the shared pool of 1000 (about 250 rounds from a full pool, 40 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3.2"
            ],
            [
              "Sustained damage (derived)",
              "About 1.96 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each shot throws a fan of 3 shuriken that spin along a circular path, and each shuriken can bounce up to 2 times.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "It was originally locked and unlocked in the [[dungeons/the-hub-island|hub]] for 12 clocks. The open-storage change now unlocks it from the first launch."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Check the behaviour section for what makes its projectile different.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Special gun",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "nail-bat",
    "category": "weapons",
    "name": "Nail Bat",
    "subtitle": "Common heavy melee",
    "summary": "Nail Bat is a common heavy melee dealing 0.4 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/nail-bat.png",
      "alt": "Nail Bat weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Common]]"
      },
      {
        "label": "Damage",
        "value": "0.4 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.3 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x1.5"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.17 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "178"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Nail Bat** is a common heavy melee in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "*In-game description: “A club studded with rusty nails. Cheap, but it hits harder than it looks.”*",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.4 x hero ATK per hit; about 4 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Common]]"
            ],
            [
              "Swing time",
              "0.3 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1.5 (total x3.5 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.17 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "Two slashes are followed by a x1.5 stab with a long recovery.",
          "Combo: 3 steps with damage multipliers x1, x1, x1.5. The last step (x1.5) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 8 common gear items that can drop, so this weapon is about 1 in 8 of the common rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Common",
      "Melee",
      "Loot"
    ],
    "related": [ { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" }, { "category": "mechanics", "slug": "level-up-card-picks" } ]
  },
  {
    "slug": "iron-spear",
    "category": "weapons",
    "name": "Iron Spear",
    "subtitle": "Rare sword",
    "summary": "Iron Spear is a rare sword dealing 0.473 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/iron-spear.png",
      "alt": "Iron Spear weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.473 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.28 s per swing"
      },
      {
        "label": "Combo",
        "value": "4 steps, damage multipliers x1, x1, x1, x1.6"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.73 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "179"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Iron Spear** is a rare sword in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "*In-game description: “A long spear with an iron head. Three quick thrusts, then a rising finisher.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.473 x hero ATK per hit; about 4.7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Swing time",
              "0.28 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "4"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1.6 (total x4.6 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 1.73 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Three quick thrusts end in a rising finisher that deals x1.6 damage.",
          "Combo: 4 steps with damage multipliers x1, x1, x1, x1.6. The last step (x1.6) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Rare",
      "Melee",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "war-hammer",
    "category": "weapons",
    "name": "War Hammer",
    "subtitle": "Epic heavy melee",
    "summary": "War Hammer is an epic heavy melee dealing 0.853 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/war-hammer.png",
      "alt": "War Hammer weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.853 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.34 s per swing"
      },
      {
        "label": "Combo",
        "value": "3 steps, damage multipliers x1, x1, x2.2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.63 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "180"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**War Hammer** is an epic heavy melee in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "*In-game description: “A heavy war hammer. Two slow blows end in a crushing spin.”*",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.853 x hero ATK per hit; about 8.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.34 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "3"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x2.2 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 2.63 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "Two slow blows end in a spinning finisher that deals x2.2 damage.",
          "Combo: 3 steps with damage multipliers x1, x1, x2.2. The last step (x2.2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Epic",
      "Melee",
      "Loot"
    ],
    "related": [ { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" }, { "category": "mechanics", "slug": "level-up-card-picks" } ]
  },
  {
    "slug": "frost-brand",
    "category": "weapons",
    "name": "Frost Brand",
    "subtitle": "Epic sword",
    "summary": "Frost Brand is an epic sword dealing 0.723 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/frost-brand.png",
      "alt": "Frost Brand weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "0.723 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.24 s per swing"
      },
      {
        "label": "Combo",
        "value": "4 steps, damage multipliers x1, x1, x1, x1.2"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.16 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/energy-blade-mk-2]] + 35 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "181"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Frost Brand** is an epic sword in The Last Dungeon, a melee weapon crafted from [[weapons/energy-blade-mk-2|Energy Blade (Mk 2)]].",
          "*In-game description: “A blade of living ice. Its frozen edge bites through armor.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.723 x hero ATK per hit; about 7.2 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Swing time",
              "0.24 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "4"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1.2 (total x4.2 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 3.16 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "Its four-step combo ends in a x1.2 downward thrust.",
          "Combo: 4 steps with damage multipliers x1, x1, x1, x1.2. The last step (x1.2) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/energy-blade-mk-2|Energy Blade (Mk 2)]] plus 35 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/energy-blade-mk-2|Energy Blade (Mk 2)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Epic",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "energy-blade-mk-2"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "ember-blade",
    "category": "weapons",
    "name": "Ember Blade",
    "subtitle": "Legendary sword",
    "summary": "Ember Blade is a legendary sword dealing 1.059 x hero ATK per hit. It needs no ammo, so it never runs dry.",
    "image": {
      "src": "/ld/wiki/weapons/ember-blade.png",
      "alt": "Ember Blade weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Sword"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.059 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.26 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x1.4"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 4 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "182"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Ember Blade** is a legendary sword in The Last Dungeon, a melee weapon found as loot in the dungeon.",
          "*In-game description: “A sword that burns forever. Five strikes, each hotter than the last.”*",
          "Swords are the basic melee weapons: you swing them in a combo, they use no ammo, and you hit everything the blade touches."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.059 x hero ATK per hit; about 10.6 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Swing time",
              "0.26 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1.4 (total x5.4 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 4 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher. Each swing also lunges you forward a little.",
          "A five-step combo ending in a x1.4 thrust.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x1.4. The last step (x1.4) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 4 legendary gear items that can drop, so this weapon is about 1 in 4 of the legendary rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "Legendary rolls are rare in ordinary chests. The [[items/boss-chest|boss chest]] never gives Common or Rare gear and has the best odds of Legendary."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Melee weapons use no ammo, so a sword is the safe fallback when the [[mechanics/ammo-pool|shared ammo pool]] runs low.",
          "Keep moving: dash between combos, because enemy bullets still hit you while you swing.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Sword",
      "Legendary",
      "Melee",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "reaper-scythe",
    "category": "weapons",
    "name": "Reaper Scythe",
    "subtitle": "Legendary heavy melee",
    "summary": "Reaper Scythe is a legendary heavy melee dealing 1.268 x hero ATK per hit. It swings slowly but hits with weighty finishers.",
    "image": {
      "src": "/ld/wiki/weapons/reaper-scythe.png",
      "alt": "Reaper Scythe weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy melee"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.268 x hero ATK per hit"
      },
      {
        "label": "Swing time",
        "value": "0.28 s per swing"
      },
      {
        "label": "Combo",
        "value": "5 steps, damage multipliers x1, x1, x1, x1, x1.8"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 4.69 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/mithril-sword-ii-mk-2]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "183"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Reaper Scythe** is a legendary heavy melee in The Last Dungeon, a melee weapon crafted from [[weapons/mithril-sword-ii-mk-2|Mithril Sword II (Mk 2)]].",
          "*In-game description: “A curved scythe that sweeps wide. Its last spin reaps everything around you.”*",
          "Heavy melee weapons (hammers, anchors, bats and scythes) trade swing speed for weight: longer pauses and bigger finishing blows."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.268 x hero ATK per hit; about 12.7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Swing time",
              "0.28 s per swing; the finishing swing of the combo can pause longer before the next combo"
            ],
            [
              "Combo steps",
              "5"
            ],
            [
              "Combo damage",
              "Multipliers x1, x1, x1, x1, x1.8 (total x5.8 weapon damage per full combo)"
            ],
            [
              "Ammo",
              "None (melee)"
            ],
            [
              "Sustained damage (derived)",
              "About 4.69 x hero ATK per second, from the game balance formula. It ignores critical hits and [[mechanics/level-up-card-picks|cards]]."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each attack starts the next step of the weapon's combo. Every step deals the weapon's damage times that step's multiplier, and the last step is the finisher, often with a long pause before the next combo. Each swing also lunges you forward a little.",
          "Its five-step combo alternates full spins and downward slashes and ends in a x1.8 spinning finisher.",
          "Combo: 5 steps with damage multipliers x1, x1, x1, x1, x1.8. The last step (x1.8) is the finisher that triggers combo [[mechanics/level-up-card-picks|cards]] such as [[buffs/shockwave|Shockwave]] and [[buffs/swirling|Swirling]]."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/mithril-sword-ii-mk-2|Mithril Sword II (Mk 2)]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/mithril-sword-ii-mk-2|Mithril Sword II (Mk 2)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Time your finisher: the big last step is where most of the damage is, so avoid cancelling the combo before it.",
          "Melee weapons use no ammo, so they are a good partner for a gun that is low on ammo.",
          "Melee combo [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/shockwave|Shockwave]], [[buffs/swirling|Swirling]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy melee",
      "Legendary",
      "Melee",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "mithril-sword-ii-mk-2"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "crafting" },
      { "category": "buffs", "slug": "shockwave" },
    ]
  },
  {
    "slug": "battle-rifle",
    "category": "weapons",
    "name": "Battle Rifle",
    "subtitle": "Epic rifle",
    "summary": "Battle Rifle is an epic rifle dealing 1 x hero ATK per bullet. It fires a steady stream of accurate bullets.",
    "image": {
      "src": "/ld/wiki/weapons/battle-rifle.png",
      "alt": "Battle Rifle weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Rifle"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "1 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "12 rounds"
      },
      {
        "label": "Reload time",
        "value": "1.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "4 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 4 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.5 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "184"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Battle Rifle** is an epic rifle in The Last Dungeon, a gun found as loot in the dungeon.",
          "*In-game description: “A dependable assault rifle with a tight spread.”*",
          "Rifles fire bullets at a steady rate from a decent magazine and are the all-round long-range guns of the arsenal."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1 x hero ATK per bullet; about 10 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "12 rounds / 1.5 s"
            ],
            [
              "Ammo",
              "4 ammo unit(s) per round from the shared pool of 1000 (about 250 rounds from a full pool, 48 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 2.5 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Its spread is tight, a random scatter of only 4 degrees, so most bullets land at range.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Rifles are accurate enough to benefit from [[buffs/growing|Growing]], which adds damage the farther a bullet flies.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Rifle",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "gatling-gun",
    "category": "weapons",
    "name": "Gatling Gun",
    "subtitle": "Legendary SMG",
    "summary": "Gatling Gun is a legendary SMG dealing 0.65 x hero ATK per bullet. It trades damage per bullet for sheer volume.",
    "image": {
      "src": "/ld/wiki/weapons/gatling-gun.png",
      "alt": "Gatling Gun weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "SMG"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "0.65 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.12 s between shots (about 8.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "45 rounds"
      },
      {
        "label": "Reload time",
        "value": "2.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "3 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 15 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.76 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/bounce-gun]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "185"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Gatling Gun** is a legendary SMG in The Last Dungeon, a gun crafted from [[weapons/bounce-gun|Bounce Gun]].",
          "*In-game description: “A heavy gun that pours out a storm of bullets. Slow to reload.”*",
          "SMGs fire very fast streams of small bullets from a big magazine, so they are strong at close and medium range but burn through ammo quickly."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.65 x hero ATK per bullet; about 6.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Fire rate",
              "0.12 s between shots"
            ],
            [
              "Magazine / reload",
              "45 rounds / 2.5 s"
            ],
            [
              "Ammo",
              "3 ammo unit(s) per round from the shared pool of 1000 (about 333 rounds from a full pool, 135 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "5"
            ],
            [
              "Sustained damage (derived)",
              "About 3.76 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It holds 45 rounds and fires every 0.12 seconds, but the reload is slow at 2.5 seconds.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/bounce-gun|Bounce Gun]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/bounce-gun|Bounce Gun]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each bullet is weak, so [[mechanics/level-up-card-picks|cards]] that raise damage per hit ([[buffs/sharpness|Sharpness]]) and extra effects per bullet ([[buffs/bomb-shot|Bomb Shot]], [[buffs/piercing|Piercing]]) work very well.",
          "Watch the [[mechanics/ammo-pool|ammo pool]]: a fast gun can empty it in a long fight.",
          "Gun cards that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "SMG",
      "Legendary",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "bounce-gun"
      },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "recipes" },
      { "category": "buffs", "slug": "sharpness" },
    ]
  },
  {
    "slug": "hand-cannon",
    "category": "weapons",
    "name": "Hand Cannon",
    "subtitle": "Epic heavy pistol",
    "summary": "Hand Cannon is an epic heavy pistol dealing 1.25 x hero ATK per bullet. It fires single shots with a modest magazine.",
    "image": {
      "src": "/ld/wiki/weapons/hand-cannon.png",
      "alt": "Hand Cannon weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Heavy pistol"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "1.25 x hero ATK per bullet"
      },
      {
        "label": "Fire rate",
        "value": "0.8 s between shots (about 1.2 per second)"
      },
      {
        "label": "Magazine",
        "value": "6 rounds"
      },
      {
        "label": "Reload time",
        "value": "2 s"
      },
      {
        "label": "Ammo cost",
        "value": "5 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bullet, random scatter up to 10 degrees"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.25 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/desert-eagle-mk-2]] + 15 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "186"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Hand Cannon** is an epic heavy pistol in The Last Dungeon, a gun crafted from [[weapons/desert-eagle-mk-2|Desert Eagle (Mk 2)]].",
          "*In-game description: “A massive revolver. Slow to fire, but every shot hits very hard.”*",
          "Pistols and heavy pistols are single-shot guns with a modest magazine and a small random scatter."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.25 x hero ATK per bullet; about 12.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.8 s between shots"
            ],
            [
              "Magazine / reload",
              "6 rounds / 2 s"
            ],
            [
              "Ammo",
              "5 ammo unit(s) per round from the shared pool of 1000 (about 200 rounds from a full pool, 30 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4.5"
            ],
            [
              "Sustained damage (derived)",
              "About 1.25 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "A single heavy shot per 0.8 seconds; the bullets are fast (projectile speed 4.5).",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/desert-eagle-mk-2|Desert Eagle (Mk 2)]] plus 15 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/desert-eagle-mk-2|Desert Eagle (Mk 2)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A cheap, accurate gun for the early floors; upgrade it along its line as [[items/coin|coins]] allow.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Heavy pistol",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "desert-eagle-mk-2"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "bomb-shot" },
    ]
  },
  {
    "slug": "repeater-crossbow",
    "category": "weapons",
    "name": "Repeater Crossbow",
    "subtitle": "Rare crossbow",
    "summary": "Repeater Crossbow is a rare crossbow dealing 0.7 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/repeater-crossbow.png",
      "alt": "Repeater Crossbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "0.7 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.3 s between shots (about 3.3 per second)"
      },
      {
        "label": "Magazine",
        "value": "6 rounds"
      },
      {
        "label": "Reload time",
        "value": "1.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.4 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "187"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Repeater Crossbow** is a rare crossbow in The Last Dungeon, a gun found as loot in the dungeon.",
          "*In-game description: “A crossbow with a six-bolt magazine for fast, steady fire.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "0.7 x hero ATK per bolt; about 7 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.3 s between shots"
            ],
            [
              "Magazine / reload",
              "6 rounds / 1.5 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 36 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.4 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Its magazine holds 6 bolts, the biggest of the crossbows, so it fires quickly before it must reload.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "ruby-longbow",
    "category": "weapons",
    "name": "Ruby Longbow",
    "subtitle": "Legendary bow",
    "summary": "Ruby Longbow is a legendary bow dealing 1.9 x hero ATK per arrow. It is a charge weapon: hold to draw, release to fire.",
    "image": {
      "src": "/ld/wiki/weapons/ruby-longbow.png",
      "alt": "Ruby Longbow weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "1.9 x hero ATK per arrow (3.8 fully charged)"
      },
      {
        "label": "Full charge",
        "value": "0.5 s of holding the attack button"
      },
      {
        "label": "Magazine",
        "value": "2 rounds"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 arrow, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.8 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "188"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Ruby Longbow** is a legendary bow in The Last Dungeon, a bow found as loot in the dungeon.",
          "*In-game description: “A longbow with ruby limbs. Hold to charge for a double damage shot.”*",
          "Bows are charge weapons. You hold the attack button to draw, release to loose the arrow, and a full draw doubles the damage."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.9 x hero ATK per arrow (3.8 fully charged); about 19 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Charge",
              "Hold the attack button for 0.5 s for a full charge, which doubles the arrow damage; release early for a normal shot"
            ],
            [
              "Magazine / reload",
              "2 rounds / 0.8 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 16 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "4"
            ],
            [
              "Sustained damage (derived)",
              "About 3.8 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Hold the attack button to charge and release to fire. Holding for the full charge time doubles the arrow damage; releasing early fires a normal arrow. Arrows fly in a straight line until they hit something, and the bow reloads by itself when the magazine is empty.",
          "The magazine holds 2 arrows and a full charge doubles the damage.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 4 legendary gear items that can drop, so this weapon is about 1 in 4 of the legendary rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]].",
          "Legendary rolls are rare in ordinary chests. The [[items/boss-chest|boss chest]] never gives Common or Rare gear and has the best odds of Legendary."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Bows are the only weapons the [[buffs/supercharge|Supercharge]] card works with.",
          "[[buffs/increase-speed|Increase Speed]] shortens the time needed for a full charge.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/supercharge|Supercharge]], [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Bow",
      "Legendary",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "arbalest",
    "category": "weapons",
    "name": "Arbalest",
    "subtitle": "Epic crossbow",
    "summary": "Arbalest is an epic crossbow dealing 1.85 x hero ATK per bolt. It fires powerful single bolts from a tiny magazine.",
    "image": {
      "src": "/ld/wiki/weapons/arbalest.png",
      "alt": "Arbalest weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Crossbow"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "1.85 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.55 s between shots (about 1.8 per second)"
      },
      {
        "label": "Magazine",
        "value": "1 rounds"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.85 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/king-crossbow-mk-1]] + 20 [[items/coin|coins]]"
      },
      {
        "label": "Item ID",
        "value": "189"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Arbalest** is an epic crossbow in The Last Dungeon, a gun crafted from [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]].",
          "*In-game description: “A heavy crossbow. One slow bolt, one heavy hit.”*",
          "Crossbows fire a single powerful bolt per shot from a small magazine, with a straight, accurate flight."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.85 x hero ATK per bolt; about 18.5 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.55 s between shots"
            ],
            [
              "Magazine / reload",
              "1 rounds / 1 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 8 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.85 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It fires one very heavy bolt per shot, reloading after every bolt.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]] plus 20 [[items/coin|coins]].",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Each round is expensive in ammo units, so make every bolt count and consider [[buffs/infinity|Infinity]].",
          "Bolts are accurate, so [[buffs/growing|Growing]] and [[buffs/piercing|Piercing]] work well.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Crossbow",
      "Epic",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "king-crossbow-mk-1"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  },
  {
    "slug": "arcane-staff",
    "category": "weapons",
    "name": "Arcane Staff",
    "subtitle": "Rare staff",
    "summary": "Arcane Staff is a rare staff dealing 1.9 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/arcane-staff.png",
      "alt": "Arcane Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Rare]]"
      },
      {
        "label": "Damage",
        "value": "1.9 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.8 s between shots (about 1.2 per second)"
      },
      {
        "label": "Magazine",
        "value": "4 rounds"
      },
      {
        "label": "Reload time",
        "value": "2.4 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 1.58 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "190"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Arcane Staff** is a rare staff in The Last Dungeon, a gun found as loot in the dungeon.",
          "*In-game description: “A staff set with a blue gem that fires arcane bolts.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "1.9 x hero ATK per bolt; about 19 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Rare]]"
            ],
            [
              "Fire rate",
              "0.8 s between shots"
            ],
            [
              "Magazine / reload",
              "4 rounds / 2.4 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 24 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 1.58 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "It fires a plain arcane bolt.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 24 rare gear items that can drop, so this weapon is about 1 in 24 of the rare rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Rare",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "tome-of-embers",
    "category": "weapons",
    "name": "Tome of Embers",
    "subtitle": "Epic staff",
    "summary": "Tome of Embers is an epic staff dealing 2.4 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/tome-of-embers.png",
      "alt": "Tome of Embers weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Epic]]"
      },
      {
        "label": "Damage",
        "value": "2.4 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.8 s between shots (about 1.2 per second)"
      },
      {
        "label": "Magazine",
        "value": "5 rounds"
      },
      {
        "label": "Reload time",
        "value": "2.4 s"
      },
      {
        "label": "Ammo cost",
        "value": "6 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 2.14 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Loot"
      },
      {
        "label": "Item ID",
        "value": "191"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Tome of Embers** is an epic staff in The Last Dungeon, a gun found as loot in the dungeon.",
          "*In-game description: “A grimoire bound in red leather. Its fireballs can set enemies ablaze.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "2.4 x hero ATK per bolt; about 24 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Epic]]"
            ],
            [
              "Fire rate",
              "0.8 s between shots"
            ],
            [
              "Magazine / reload",
              "5 rounds / 2.4 s"
            ],
            [
              "Ammo",
              "6 ammo unit(s) per round from the shared pool of 1000 (about 166 rounds from a full pool, 30 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "3"
            ],
            [
              "Sustained damage (derived)",
              "About 2.14 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Every bullet flies in a straight line until it hits an enemy or a wall and carries the weapon's full damage. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "Each fireball that hits has a 40% chance to set the target on fire.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "Loot: it can be rolled from dungeon [[items/chests|chests]] (a chest roll first picks a rarity, then one of the 28 epic gear items that can drop, so this weapon is about 1 in 28 of the epic rolls). It can also appear in the random slots of the [[dungeons/store-room|dungeon shop]] and come out of the [[items/reward-chests|hub weapon chest]]."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Epic",
      "Ranged",
      "Loot"
    ],
    "related": [ { "category": "mechanics", "slug": "ammo-pool" }, { "category": "items", "slug": "chests" }, { "category": "dungeons", "slug": "store-room" } ]
  },
  {
    "slug": "void-staff",
    "category": "weapons",
    "name": "Void Staff",
    "subtitle": "Legendary staff",
    "summary": "Void Staff is a legendary staff dealing 3 x hero ATK per bolt. It fires magic bolts with a large damage multiplier.",
    "image": {
      "src": "/ld/wiki/weapons/void-staff.png",
      "alt": "Void Staff weapon icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Staff"
      },
      {
        "label": "Rarity",
        "value": "[[items/item-rarity|Legendary]]"
      },
      {
        "label": "Damage",
        "value": "3 x hero ATK per bolt"
      },
      {
        "label": "Fire rate",
        "value": "0.5 s between shots (about 2 per second)"
      },
      {
        "label": "Magazine",
        "value": "6 rounds"
      },
      {
        "label": "Reload time",
        "value": "2.5 s"
      },
      {
        "label": "Ammo cost",
        "value": "8 ammo units per round"
      },
      {
        "label": "Pattern",
        "value": "1 bolt, straight shot"
      },
      {
        "label": "Sustained damage (derived)",
        "value": "About 3.6 x hero ATK per second"
      },
      {
        "label": "Source",
        "value": "Craft only"
      },
      {
        "label": "Crafted from",
        "value": "[[weapons/poison-staff]] + 45 [[items/coin|coins]] and 2 [[items/gold]]"
      },
      {
        "label": "Item ID",
        "value": "192"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Void Staff** is a legendary staff in The Last Dungeon, a gun crafted from [[weapons/poison-staff|Poison Staff]].",
          "*In-game description: “A staff that channels the void. Its dark bolts leap between nearby enemies.”*",
          "Staffs fire magic bolts with a high damage multiplier but a slow rate of fire and a long reload."
        ]
      },
      {
        "heading": "Stats",
        "paragraphs": [
          "Weapon damage is a multiplier of your [[mechanics/hero-training|hero's ATK stat]], which runs from about 10 to 24 depending on the hero and its upgrades. A weapon showing 0.42 therefore deals roughly 4 to 10 damage per hit."
        ],
        "table": {
          "columns": [
            "Stat",
            "Value"
          ],
          "rows": [
            [
              "Damage",
              "3 x hero ATK per bolt; about 30 per hit at hero ATK 10"
            ],
            [
              "Rarity",
              "[[items/item-rarity|Legendary]]"
            ],
            [
              "Fire rate",
              "0.5 s between shots"
            ],
            [
              "Magazine / reload",
              "6 rounds / 2.5 s"
            ],
            [
              "Ammo",
              "8 ammo unit(s) per round from the shared pool of 1000 (about 125 rounds from a full pool, 48 units for one full magazine)"
            ],
            [
              "Projectile speed",
              "1"
            ],
            [
              "Sustained damage (derived)",
              "About 3.6 x hero ATK per second, from the game balance formula. It counts reloads and ignores critical hits, [[mechanics/level-up-card-picks|cards]] and missed shots."
            ]
          ]
        }
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Each shot launches a magic bolt that homes in on enemies instead of flying in a straight line. When the magazine runs dry the gun reloads by itself, and while it reloads you cannot shoot.",
          "The bolt is a homing bolt: it flies to the nearest target first, then hops between random living enemies, hitting up to 4 times in all.",
          "This gun reloads from the one [[mechanics/ammo-pool|shared ammo pool]] every hero carries (1000 units, refilled by enemy drops, shop ammo boxes and the room-clear refill). Firing in the [[dungeons/the-hub-island|hub]] costs nothing."
        ]
      },
      {
        "heading": "How to get it",
        "bullets": [
          "[[mechanics/crafting|Craft]]: from [[weapons/poison-staff|Poison Staff]] plus 45 [[items/coin|coins]] and 2 [[items/gold]]. Gold comes from [[items/boss-chest|boss chests]] (one per boss on floors 4, 8 and 12), so this step is only possible after beating a boss.",
          "Craft from your [[mechanics/inventory-and-bag|bag]] at any time: tap [[items/recipes]], then Craft. The weapon you consume is replaced by the upgraded one."
        ]
      },
      {
        "heading": "Upgrade path",
        "bullets": [
          "Upgrades from: [[weapons/poison-staff|Poison Staff]].",
          "This is the end of the line: it has no further upgrade."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Staff rounds are costly in ammo units, so [[buffs/infinity|Infinity]] and ammo drops matter for staff builds.",
          "Gun [[mechanics/level-up-card-picks|cards]] that fit this weapon: [[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]], [[buffs/infinity|Infinity]], [[buffs/recycle|Recycle]]. Cards that work with any weapon, such as [[buffs/sharpness|Sharpness]] and [[buffs/increase-speed|Increase Speed]], also apply."
        ]
      }
    ],
    "tags": [
      "Staff",
      "Legendary",
      "Ranged",
      "Craft only"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "poison-staff"
      },
      { "category": "items", "slug": "recipes" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "buffs", "slug": "infinity" },
    ]
  }
];
