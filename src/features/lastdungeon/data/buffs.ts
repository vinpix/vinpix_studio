import type { WikiArticle } from "../types";

// Generated from the game data (MyDataList.asset level-up cards, CardText, CardOfferRules) and hand-edited prose.
export const buffs: WikiArticle[] = [
  {
    "slug": "dynamo",
    "category": "buffs",
    "name": "Dynamo",
    "subtitle": "Offense card",
    "summary": "Dynamo turns every dash into a damage spike: the first attack you land after dashing hits for a big multiplier. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/dynamo.png",
      "alt": "Dynamo card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "x1.25 / x1.5 / x2"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      },
      {
        "label": "Synergy group",
        "value": "Dash cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dynamo** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Dynamo turns every dash into a damage spike: the first attack you land after dashing hits for a big multiplier.",
          "*In-game description: “Increase first attack after using skills.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Dynamo has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Your first hit after a dash deals x1.25 damage."
            ],
            [
              "Level II",
              "Your first hit after a dash deals x1.5 damage."
            ],
            [
              "Level III",
              "Your first hit after a dash deals x2 damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The bonus is spent by the next attack you make after a dash, whether that is a gun shot or a sword swing, so it fires once per dash.",
          "It is the opener of the dash build: the more often you dash, the more often it pays out."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Synergy: this card belongs to the Dash group ([[buffs/rush-time|Rush Time]], [[buffs/electric|Electric]], [[buffs/dash-knight|Dash Knight]], [[buffs/swiftfooted|Swiftfooted]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Pair it with [[buffs/rush-time|Rush Time]] so the dash is ready again sooner.",
          "[[buffs/electric|Electric]] and [[buffs/swiftfooted|Swiftfooted]] also trigger on dash, so the whole group rewards a dash-and-strike style."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "rush-time"
      },
      {
        "category": "buffs",
        "slug": "electric"
      },
      {
        "category": "buffs",
        "slug": "dash-knight"
      },
      {
        "category": "buffs",
        "slug": "swiftfooted"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "shockwave",
    "category": "buffs",
    "name": "Shockwave",
    "subtitle": "Melee offense card",
    "summary": "Shockwave makes the finisher of every sword combo throw a wave of force that damages enemies in front of you. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/shockwave.png",
      "alt": "Shockwave card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Melee offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "x1 / x1.5 / x2"
      },
      {
        "label": "Works with",
        "value": "Melee weapons"
      },
      {
        "label": "Synergy group",
        "value": "Melee cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Shockwave** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Shockwave makes the finisher of every sword combo throw a wave of force that damages enemies in front of you.",
          "*In-game description: “The last attack in a combo launches a shockwave, damaging enemies.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Shockwave has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "The last hit of a combo sends out a shockwave for x1 weapon damage."
            ],
            [
              "Level II",
              "The last hit of a combo sends out a shockwave for x1.5 weapon damage."
            ],
            [
              "Level III",
              "The last hit of a combo sends out a shockwave for x2 weapon damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "It triggers only on the last swing of a weapon combo, so it scales with how often you complete full combos.",
          "The shockwave deals the listed multiple of your weapon damage. The card is tagged MELEE and COMBO in the game."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a sword. With a gun in your hand its offer weight drops to 0.4 if you carry a sword in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not; a card with weight 0 is only offered when fewer than three weighted cards remain.",
          "Synergy: this card belongs to the Melee group ([[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]], [[buffs/swirling|Swirling]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Weapons with short combos reach the finisher more often, so they trigger the wave more often.",
          "Combine it with [[buffs/swirling|Swirling]], which also fires on the last hit. The starter [[weapons/blue-sword|Blue Sword]] and the fast [[weapons/mithril-sword-mk-1|Mithril Sword]] line are easy places to try it."
        ]
      }
    ],
    "tags": [
      "Melee offense",
      "Melee",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "swirling"
      },
      {
        "category": "buffs",
        "slug": "thundering"
      },
      {
        "category": "buffs",
        "slug": "fire"
      },
      {
        "category": "buffs",
        "slug": "stun"
      },
      { "category": "weapons", "slug": "blue-sword" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "looting",
    "category": "buffs",
    "name": "Looting",
    "subtitle": "Utility card",
    "summary": "Looting raises how often defeated enemies drop coins, health potions, keys and ammo. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/looting.png",
      "alt": "Looting card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "+3 / +6 / +10 percentage points"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Looting** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Looting raises how often defeated enemies drop [[items/coin|coins]], [[items/health-potion|health potions]], [[items/key|keys]] and ammo.",
          "*In-game description: “Increases the chance for enemy to drop coins.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Looting has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Enemies drop [[items/coin|coins]], potions and ammo more often: +3 percentage points."
            ],
            [
              "Level II",
              "Enemies drop coins, potions and ammo more often: +6 percentage points."
            ],
            [
              "Level III",
              "Enemies drop coins, potions and ammo more often: +10 percentage points."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The listed number is added as percentage points to each drop roll when an enemy dies, so it helps every kind of drop, including the ammo bullets that refill the [[mechanics/ammo-pool|shared ammo pool]].",
          "It does not change what [[items/chests|chests]] hold."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A good early pick when you rely on a finite-ammo gun, because bullet drops are the main way the [[mechanics/ammo-pool|shared ammo pool]] refills."
        ]
      }
    ],
    "tags": [
      "Utility",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "infinity"
      },
      {
        "category": "buffs",
        "slug": "recycle"
      },
      { "category": "items", "slug": "health-potion" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "items", "slug": "chests" },
    ]
  },
  {
    "slug": "thundering",
    "category": "buffs",
    "name": "Thundering",
    "subtitle": "Melee offense card",
    "summary": "Thundering gives your sword hits a 30% chance to call down a lightning bolt for extra damage. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/thundering.png",
      "alt": "Thundering card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Melee offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "x1 / x1.15 / x1.3"
      },
      {
        "label": "Works with",
        "value": "Melee weapons"
      },
      {
        "label": "Synergy group",
        "value": "Melee cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Thundering** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Thundering gives your sword hits a 30% chance to call down a lightning bolt for extra damage.",
          "*In-game description: “Has 30 percent summon a bolt of lightning that damages the surrounding target.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Thundering has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "30% on hit: a lightning bolt strikes for x1 weapon damage."
            ],
            [
              "Level II",
              "30% on hit: a lightning bolt strikes for x1.15 weapon damage."
            ],
            [
              "Level III",
              "30% on hit: a lightning bolt strikes for x1.3 weapon damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The 30% roll is made on every melee hit. The bolt damages enemies around the struck target.",
          "Higher levels raise the bolt damage, not the chance."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a sword. With a gun in your hand its offer weight drops to 0.4 if you carry a sword in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not; a card with weight 0 is only offered when fewer than three weighted cards remain.",
          "Synergy: this card belongs to the Melee group ([[buffs/shockwave|Shockwave]], [[buffs/fire|Fire]], [[buffs/stun|Stun]], [[buffs/swirling|Swirling]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Fast weapons roll the 30% more often, so quick blades get more bolts per second.",
          "It stacks with the other on-hit melee cards: [[buffs/fire|Fire]], [[buffs/stun|Stun]] and [[buffs/poison|Poison]]. The starter [[weapons/blue-sword|Blue Sword]] and the fast [[weapons/mithril-sword-mk-1|Mithril Sword]] line are easy places to try it."
        ]
      }
    ],
    "tags": [
      "Melee offense",
      "Melee",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "shockwave"
      },
      {
        "category": "buffs",
        "slug": "fire"
      },
      {
        "category": "buffs",
        "slug": "stun"
      },
      {
        "category": "buffs",
        "slug": "swirling"
      },
      { "category": "weapons", "slug": "blue-sword" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "fire",
    "category": "buffs",
    "name": "Fire",
    "subtitle": "Melee offense card",
    "summary": "Fire gives each sword hit a 30% chance to set the enemy ablaze, dealing damage over time. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/fire.png",
      "alt": "Fire card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Melee offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "x1.2 / x2.4 / x3.6"
      },
      {
        "label": "Works with",
        "value": "Melee weapons"
      },
      {
        "label": "Synergy group",
        "value": "Melee cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Fire** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Fire gives each sword hit a 30% chance to set the enemy ablaze, dealing damage over time.",
          "*In-game description: “Has 30% sets mobs on fire for three seconds, dealing damage over time.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Fire has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "30% on hit to ignite: x1.2 weapon damage over 1.2 s."
            ],
            [
              "Level II",
              "30% on hit to ignite: x2.4 weapon damage over 1.2 s."
            ],
            [
              "Level III",
              "30% on hit to ignite: x3.6 weapon damage over 1.2 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The burn ticks six times over 1.2 seconds, so the listed multiple is the total damage over the whole burn, not per tick.",
          "A burning enemy ignores a new ignite until its burn has ended, so the card cannot stack on one target.",
          "The shipped values are capped by the balance pass: 0.2, 0.4 and 0.6 of weapon damage per tick."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a sword. With a gun in your hand its offer weight drops to 0.4 if you carry a sword in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not; a card with weight 0 is only offered when fewer than three weighted cards remain.",
          "Synergy: this card belongs to the Melee group ([[buffs/shockwave|Shockwave]], [[buffs/thundering|Thundering]], [[buffs/stun|Stun]], [[buffs/swirling|Swirling]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Good against bosses with many health bars, because the burn is applied on top of your normal hits.",
          "At level III it is worth roughly +40 to 50% steady damage on a melee weapon (the balance pass aimed for about x1.4 to x1.5). The starter [[weapons/blue-sword|Blue Sword]] and the fast [[weapons/mithril-sword-mk-1|Mithril Sword]] line are easy places to try it."
        ]
      }
    ],
    "tags": [
      "Melee offense",
      "Melee",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "poison"
      },
      {
        "category": "buffs",
        "slug": "thundering"
      },
      {
        "category": "buffs",
        "slug": "stun"
      },
      {
        "category": "buffs",
        "slug": "burning"
      },
      { "category": "weapons", "slug": "blue-sword" },
      { "category": "weapons", "slug": "fire-staff" },
    ]
  },
  {
    "slug": "stun",
    "category": "buffs",
    "name": "Stun",
    "subtitle": "Melee offense card",
    "summary": "Stun gives sword hits a chance to freeze an enemy in place for three seconds. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/stun.png",
      "alt": "Stun card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Melee offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "5% / 10% / 15%"
      },
      {
        "label": "Works with",
        "value": "Melee weapons"
      },
      {
        "label": "Synergy group",
        "value": "Melee cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Stun** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Stun gives sword hits a chance to freeze an enemy in place for three seconds.",
          "*In-game description: “Stun enemy in 3 seconds.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Stun has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "5% chance on hit to stun for 3 s."
            ],
            [
              "Level II",
              "10% chance on hit to stun for 3 s."
            ],
            [
              "Level III",
              "15% chance on hit to stun for 3 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The chance is checked on every melee hit and the stun lasts 3 seconds.",
          "The chance is low at every level (5%, 10%, 15%), but it rolls on every swing of a fast weapon."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a sword. With a gun in your hand its offer weight drops to 0.4 if you carry a sword in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not; a card with weight 0 is only offered when fewer than three weighted cards remain.",
          "Synergy: this card belongs to the Melee group ([[buffs/shockwave|Shockwave]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/swirling|Swirling]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Strong with fast blades such as the Mithril and Energy Blade lines, which swing many times per second. The starter [[weapons/blue-sword|Blue Sword]] and the fast [[weapons/mithril-sword-mk-1|Mithril Sword]] line are easy places to try it."
        ]
      }
    ],
    "tags": [
      "Melee offense",
      "Melee",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "thundering"
      },
      {
        "category": "buffs",
        "slug": "fire"
      },
      {
        "category": "buffs",
        "slug": "poison"
      },
      { "category": "weapons", "slug": "blue-sword" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "weapons", "slug": "mithril-sword-mk-1" },
    ]
  },
  {
    "slug": "sharpness",
    "category": "buffs",
    "name": "Sharpness",
    "subtitle": "Offense card",
    "summary": "Sharpness is the plain damage card: every attack with any weapon deals extra damage. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/sharpness.png",
      "alt": "Sharpness card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "10% / 20% / 30%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sharpness** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Sharpness is the plain damage card: every attack with any weapon deals extra damage.",
          "*In-game description: “Add more dame to your weapon.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Sharpness has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Your attacks deal +10% damage."
            ],
            [
              "Level II",
              "Your attacks deal +20% damage."
            ],
            [
              "Level III",
              "Your attacks deal +30% damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The bonus is a percentage of your weapon damage added to each hit or shot.",
          "It works with every weapon, which makes it a safe pick when you are not sure which weapon you will end up with."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Take it early: it never goes dead, whatever weapon you swap to."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "cower"
      },
      {
        "category": "buffs",
        "slug": "increase-speed"
      },
      {
        "category": "buffs",
        "slug": "super-critical"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "poison",
    "category": "buffs",
    "name": "Poison",
    "subtitle": "Offense card",
    "summary": "Poison leaves a toxic cloud on the target with a 30% chance whenever you hit, damaging enemies standing in it. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/poison.png",
      "alt": "Poison card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "x0.48 / x1.02 / x1.62"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Poison** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Poison leaves a toxic cloud on the target with a 30% chance whenever you hit, damaging enemies standing in it.",
          "*In-game description: “Has 30% to summon poison area.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Poison has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "30% on hit to leave a poison cloud: x0.48 weapon damage over 4 s."
            ],
            [
              "Level II",
              "30% on hit to leave a poison cloud: x1.02 weapon damage over 4 s."
            ],
            [
              "Level III",
              "30% on hit to leave a poison cloud: x1.62 weapon damage over 4 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The cloud lasts about 4 seconds and hits twelve times, so the listed multiple is the total over the whole cloud.",
          "Clouds do not lock each other, so several of them can overlap and stack their damage.",
          "The shipped values are capped (0.04, 0.085 and 0.135 of weapon damage per tick) because the uncapped card was far stronger than every other damage card."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "It works with guns as well as swords, so it is one of the few proc cards a ranged build can use.",
          "Fast, many-hit weapons place clouds more often."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "fire"
      },
      {
        "category": "buffs",
        "slug": "thundering"
      },
      {
        "category": "buffs",
        "slug": "stun"
      },
      {
        "category": "buffs",
        "slug": "frezzing"
      },
      { "category": "weapons", "slug": "poison-staff" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "swirling",
    "category": "buffs",
    "name": "Swirling",
    "subtitle": "Melee offense card",
    "summary": "Swirling makes the last swing of a combo spin a ring of damage around you, hitting enemies on every side. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/swirling.png",
      "alt": "Swirling card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Melee offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "x1 / x1.5 / x2"
      },
      {
        "label": "Works with",
        "value": "Melee weapons"
      },
      {
        "label": "Synergy group",
        "value": "Melee cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Swirling** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Swirling makes the last swing of a combo spin a ring of damage around you, hitting enemies on every side.",
          "*In-game description: “The last attack in a combo performs a swirling attack, damaging nearby enemies.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Swirling has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "The last hit of a combo spins around you for x1 weapon damage."
            ],
            [
              "Level II",
              "The last hit of a combo spins around you for x1.5 weapon damage."
            ],
            [
              "Level III",
              "The last hit of a combo spins around you for x2 weapon damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Like Shockwave it only triggers on the final hit of the combo.",
          "The spin is centred on your weapon, so it is best when enemies surround you."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a sword. With a gun in your hand its offer weight drops to 0.4 if you carry a sword in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not; a card with weight 0 is only offered when fewer than three weighted cards remain.",
          "Synergy: this card belongs to the Melee group ([[buffs/shockwave|Shockwave]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Take both Swirling and [[buffs/shockwave|Shockwave]] on a sword build: they both fire on the same hit. The starter [[weapons/blue-sword|Blue Sword]] and the fast [[weapons/mithril-sword-mk-1|Mithril Sword]] line are easy places to try it."
        ]
      }
    ],
    "tags": [
      "Melee offense",
      "Melee",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "shockwave"
      },
      {
        "category": "buffs",
        "slug": "thundering"
      },
      {
        "category": "buffs",
        "slug": "fire"
      },
      { "category": "weapons", "slug": "blue-sword" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "weapons", "slug": "mithril-sword-mk-1" },
    ]
  },
  {
    "slug": "rampaging",
    "category": "buffs",
    "name": "Rampaging",
    "subtitle": "Offense card",
    "summary": "Rampaging gives you a chance to go into a frenzy after each kill, doubling your attack speed for a few seconds. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/rampaging.png",
      "alt": "Rampaging card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "5 s / 10 s / 15 s"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Rampaging** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Rampaging gives you a chance to go into a frenzy after each kill, doubling your attack speed for a few seconds.",
          "*In-game description: “After defeating a enemy, there is a 10% chance to increase your attack speed by +50% for a short time.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Rampaging has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "11% when you defeat an enemy: attack speed x2 for 5 s."
            ],
            [
              "Level II",
              "11% when you defeat an enemy: attack speed x2 for 10 s."
            ],
            [
              "Level III",
              "11% when you defeat an enemy: attack speed x2 for 15 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Each kill rolls an 11% chance. While the frenzy lasts, the time between your attacks is halved, for every weapon.",
          "Level I lasts 5 seconds, level II 10 seconds and level III 15 seconds."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Great against crowds of weak enemies, where kills come fast and the frenzy keeps refreshing."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "increase-speed"
      },
      {
        "category": "buffs",
        "slug": "angry"
      },
      {
        "category": "buffs",
        "slug": "leeching"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "knight",
    "category": "buffs",
    "name": "Knight",
    "subtitle": "Summon card",
    "summary": "Knight gives each kill a chance to call a knight ally who fights beside you. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/knight.png",
      "alt": "Knight card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Summon"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Knight** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Knight gives each kill a chance to call a knight ally who fights beside you.",
          "*In-game description: “Grants a chance that a knight will spawn after defeating a enemy, with up to 3 knight joining your side.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Knight has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "20% when you defeat an enemy to summon a knight ally."
            ],
            [
              "Level II",
              "30% when you defeat an enemy to summon a knight ally."
            ],
            [
              "Level III",
              "40% when you defeat an enemy to summon a knight ally."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The chance is rolled on every kill. Up to three knights can fight at once.",
          "It does not summon in places where allies are disabled."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Knights draw enemy attention, which is handy against ranged groups.",
          "[[buffs/dash-knight|Dash Knight]] is the dash-triggered version of the same ally."
        ]
      }
    ],
    "tags": [
      "Summon",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "dash-knight"
      },
      {
        "category": "buffs",
        "slug": "leeching"
      },
      { "category": "items", "slug": "knight-scroll" },
      { "category": "heroes", "slug": "knight" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "freezing",
    "category": "buffs",
    "name": "Freezing",
    "subtitle": "Utility card",
    "summary": "Freezing makes everything you hit slower for three seconds. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/freezing.png",
      "alt": "Freezing card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Freezing** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Freezing makes everything you hit slower for three seconds.",
          "*In-game description: “Slows enemy after hit for three seconds.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Freezing has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Your hits slow the enemy by 20% for 3 s."
            ],
            [
              "Level II",
              "Your hits slow the enemy by 30% for 3 s."
            ],
            [
              "Level III",
              "Your hits slow the enemy by 40% for 3 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The slow is applied by your hits, so it needs to land to work; the aura version is [[buffs/frezzing|Frezzing]].",
          "The listed percentage is how much movement speed the enemy loses."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Pair it with a fast weapon so enemies stay slowed continuously."
        ]
      }
    ],
    "tags": [
      "Utility",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "frezzing"
      },
      {
        "category": "buffs",
        "slug": "sluggish-foes"
      },
      {
        "category": "buffs",
        "slug": "stun"
      },
      { "category": "weapons", "slug": "ice-staff" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "nova-explosion",
    "category": "buffs",
    "name": "Nova Explosion",
    "subtitle": "Offense card",
    "summary": "Nova Explosion makes every enemy you kill blow up, hurting the ones around it by a share of their health. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/nova-explosion.png",
      "alt": "Nova Explosion card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "10% / 20% / 30%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Nova Explosion** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Nova Explosion makes every enemy you kill blow up, hurting the ones around it by a share of their health.",
          "*In-game description: “Enemy explode after they are defeated.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Nova Explosion has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Defeated enemies explode: nearby enemies lose 10% of their max health."
            ],
            [
              "Level II",
              "Defeated enemies explode: nearby enemies lose 20% of their max health."
            ],
            [
              "Level III",
              "Defeated enemies explode: nearby enemies lose 30% of their max health."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The damage is a percentage of the nearby enemies' maximum health, so it scales with enemy toughness rather than with your weapon."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Strongest against dense groups of weak enemies."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "bomb-shot"
      },
      {
        "category": "buffs",
        "slug": "leeching"
      },
      {
        "category": "buffs",
        "slug": "rampaging"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "super-critical",
    "category": "buffs",
    "name": "Super Critical",
    "subtitle": "Offense card",
    "summary": "Super Critical gives your hits a chance to deal triple damage. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/super-critical.png",
      "alt": "Super Critical card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "10% / 15% / 20%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Super Critical** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Super Critical gives your hits a chance to deal triple damage.",
          "*In-game description: “Gives you a chance to inflict critical hits dealing triple damage.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Super Critical has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "10% chance for a hit to deal triple damage."
            ],
            [
              "Level II",
              "15% chance for a hit to deal triple damage."
            ],
            [
              "Level III",
              "20% chance for a hit to deal triple damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The chance is rolled once for each shot or swing; a success multiplies that attack by three and counts as a critical hit."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Works with every weapon."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "sharpness"
      },
      {
        "category": "buffs",
        "slug": "cower"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "leeching",
    "category": "buffs",
    "name": "Leeching",
    "subtitle": "Defense card",
    "summary": "Leeching heals you every time you defeat an enemy, and refills a slice of your health when you break a boss health bar. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/leeching.png",
      "alt": "Leeching card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Defense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "1 HP / 2 HP / 3 HP"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Leeching** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Leeching heals you every time you defeat an enemy, and refills a slice of your health when you break a boss health bar.",
          "*In-game description: “Defeating a enemy heals you a small portion of the enmey max health.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Leeching has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Each enemy you defeat heals you 1 HP."
            ],
            [
              "Level II",
              "Each enemy you defeat heals you 2 HP."
            ],
            [
              "Level III",
              "Each enemy you defeat heals you 3 HP."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Each normal kill heals a flat 1, 2 or 3 HP.",
          "Bosses and elites pay per health bar instead of per kill: every bar you break heals 1%, 2% or 3% of your max HP (capped at 3% per bar), and the boss kill itself no longer heals."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A steady sustain card for crowd-heavy floors; against bosses the per-bar heal makes long fights survivable."
        ]
      }
    ],
    "tags": [
      "Defense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "life-boot"
      },
      {
        "category": "buffs",
        "slug": "protection"
      },
      {
        "category": "buffs",
        "slug": "nova-explosion"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "energy",
    "category": "buffs",
    "name": "Energy",
    "subtitle": "Utility card",
    "summary": "Energy gives kills a 30% chance to refund some of your energy. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/energy.png",
      "alt": "Energy card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "2 / 4 / 6"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Energy** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Energy gives kills a 30% chance to refund some of your energy.",
          "*In-game description: “killing an enemy gain a 30% chance to grant you a bunch of extra energy.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Energy has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "30% when you defeat an enemy to gain 2 energy."
            ],
            [
              "Level II",
              "30% when you defeat an enemy to gain 4 energy."
            ],
            [
              "Level III",
              "30% when you defeat an enemy to gain 6 energy."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Each kill rolls 30%; on success you gain 2, 4 or 6 energy."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Useful for heroes whose skills or [[mechanics/health-shield-and-dodge|shield]] lean on the energy bar."
        ]
      }
    ],
    "tags": [
      "Utility",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "sand-clock"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
      { "category": "mechanics", "slug": "health-shield-and-dodge" },
    ]
  },
  {
    "slug": "bomb-shot",
    "category": "buffs",
    "name": "Bomb Shot",
    "subtitle": "Ranged offense card",
    "summary": "Bomb Shot turns every few bullets that hit into a small explosion. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/bomb-shot.png",
      "alt": "Bomb Shot card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Ranged offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "Every 5th / 4th / 3rd landed bullet"
      },
      {
        "label": "Works with",
        "value": "Guns, crossbows and bows"
      },
      {
        "label": "Synergy group",
        "value": "Gun cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Bomb Shot** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Bomb Shot turns every few bullets that hit into a small explosion.",
          "*In-game description: “Every few shots has a timed charge that explodes one second after impact, dealing 100% damage to nearby enemy.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Bomb Shot has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Every 5 bullets that land, one explodes for 70% of its damage."
            ],
            [
              "Level II",
              "Every 4 bullets that land, one explodes for 70% of its damage."
            ],
            [
              "Level III",
              "Every 3 bullets that land, one explodes for 70% of its damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The counter counts bullets that land. Every 5th, 4th or 3rd one (by level) also explodes for 70% of its damage around the impact.",
          "Missed bullets do not progress the counter."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a gun, crossbow or bow. With a sword in your hand its offer weight drops to 0.4 if you carry a gun in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not.",
          "Synergy: this card belongs to the Gun group ([[buffs/multishot|Multishot]], [[buffs/supercharge|Supercharge]], [[buffs/infinity|Infinity]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Best on guns that hit often: rapid-fire guns reach the counter quickly.",
          "Part of the gun group, along with [[buffs/multishot|Multishot]], [[buffs/piercing|Piercing]] and [[buffs/growing|Growing]]. Easy to try on the starting [[weapons/revolver-mk-1|Revolver]] or a fast gun such as the [[weapons/uzi|Uzi]]."
        ]
      }
    ],
    "tags": [
      "Ranged offense",
      "Ranged",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "multishot"
      },
      {
        "category": "buffs",
        "slug": "piercing"
      },
      {
        "category": "buffs",
        "slug": "growing"
      },
      {
        "category": "buffs",
        "slug": "infinity"
      },
      {
        "category": "buffs",
        "slug": "supercharge"
      },
      { "category": "weapons", "slug": "revolver-mk-1" },
    ]
  },
  {
    "slug": "multishot",
    "category": "buffs",
    "name": "Multishot",
    "subtitle": "Ranged offense card",
    "summary": "Multishot gives each shot a chance to fire four extra bullets at once, and makes swords swing faster. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/multishot.png",
      "alt": "Multishot card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Ranged offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "Guns 10% / 15% / 20%; swords 20% / 30% / 30%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      },
      {
        "label": "Synergy group",
        "value": "Gun cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Multishot** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Multishot gives each shot a chance to fire four extra bullets at once, and makes swords swing faster.",
          "*In-game description: “Grants the chance to fire five bullets at once..”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Multishot has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "10% per shot to fire 4 extra bullets. Swords swing 20% faster."
            ],
            [
              "Level II",
              "15% per shot to fire 4 extra bullets. Swords swing 30% faster."
            ],
            [
              "Level III",
              "20% per shot to fire 4 extra bullets. Swords swing 30% faster."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Gun side: each shot has a 10%, 15% or 20% chance (levels I to III) to add 4 extra bullets, for a five-bullet volley that costs no extra round.",
          "Sword side: swords swing 20%, 30% and 30% faster. The sword bonus keeps its original values on purpose, so this card helps every weapon.",
          "The gun chance was lowered from the original 20/30/30% by the balance pass."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "Despite its Ranged tag, it also speeds up sword swings, so it counts as live with every weapon.",
          "Synergy: this card belongs to the Gun group ([[buffs/bomb-shot|Bomb Shot]], [[buffs/supercharge|Supercharge]], [[buffs/infinity|Infinity]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "It is the one gun-tagged card that also helps melee builds. Easy to try on the starting [[weapons/revolver-mk-1|Revolver]] or a fast gun such as the [[weapons/uzi|Uzi]]."
        ]
      }
    ],
    "tags": [
      "Ranged offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "bomb-shot"
      },
      {
        "category": "buffs",
        "slug": "piercing"
      },
      {
        "category": "buffs",
        "slug": "growing"
      },
      {
        "category": "buffs",
        "slug": "infinity"
      },
      { "category": "weapons", "slug": "revolver-mk-1" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "supercharge",
    "category": "buffs",
    "name": "Supercharge",
    "subtitle": "Bow offense card",
    "summary": "Supercharge makes every bow shot hit harder. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/supercharge.png",
      "alt": "Supercharge card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Bow offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Bows only"
      },
      {
        "label": "Synergy group",
        "value": "Gun cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Supercharge** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Supercharge makes every bow shot hit harder.",
          "*In-game description: “Charged shots deal more damage (only work for bow).”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Supercharge has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Bow shots deal +20% damage."
            ],
            [
              "Level II",
              "Bow shots deal +30% damage."
            ],
            [
              "Level III",
              "Bow shots deal +40% damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Only bows (weapons you hold to charge and release) are affected.",
          "The bonus is added to the shot before the double damage of a full charge."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a bow. Its offer weight drops to 0.4 if the bow is in your [[mechanics/inventory-and-bag|bag]] but not in your hand, and to 0 if you carry no bow.",
          "Synergy: this card belongs to the Gun group ([[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/infinity|Infinity]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Take it only if you are carrying a bow; on any other weapon it does nothing.",
          "Pair it with [[buffs/increase-speed|Increase Speed]], which shortens the charge time. Bows to carry it: [[weapons/wooden-bow-ii|Wooden Bow II]] and [[weapons/dryad-bow|Dryad Bow]]."
        ]
      }
    ],
    "tags": [
      "Bow offense",
      "Bow",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "increase-speed"
      },
      {
        "category": "buffs",
        "slug": "infinity"
      },
      {
        "category": "buffs",
        "slug": "growing"
      },
      {
        "category": "buffs",
        "slug": "piercing"
      },
      { "category": "weapons", "slug": "wooden-bow-ii" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "increase-speed",
    "category": "buffs",
    "name": "Increase Speed",
    "subtitle": "Offense card",
    "summary": "Increase Speed shortens the time between your attacks, whatever weapon you hold. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/increase-speed.png",
      "alt": "Increase Speed card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 30% / 45%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Increase Speed** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Increase Speed shortens the time between your attacks, whatever weapon you hold.",
          "*In-game description: “Increase your attack speed.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Increase Speed has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "You attack 20% faster."
            ],
            [
              "Level II",
              "You attack 30% faster."
            ],
            [
              "Level III",
              "You attack 45% faster."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The percentage is how much shorter the time between attacks becomes. At level III you attack about 1.8 times as often as before (derived from 1 / (1 - 0.45)).",
          "On bows it also shortens the time needed for a full charge."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "The strongest plain damage card at level III, and it never goes dead.",
          "Combine with [[buffs/rampaging|Rampaging]] and [[buffs/angry|Angry]] for very fast attack windows."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "rampaging"
      },
      {
        "category": "buffs",
        "slug": "angry"
      },
      {
        "category": "buffs",
        "slug": "supercharge"
      },
      {
        "category": "buffs",
        "slug": "sharpness"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "infinity",
    "category": "buffs",
    "name": "Infinity",
    "subtitle": "Ranged utility card",
    "summary": "Infinity gives each shot a chance not to spend a round of ammo. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/infinity.png",
      "alt": "Infinity card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Ranged utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "15% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Guns, crossbows and bows"
      },
      {
        "label": "Synergy group",
        "value": "Gun cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Infinity** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Infinity gives each shot a chance not to spend a round of ammo.",
          "*In-game description: “Chance to immediately replenish an arrow after shooting.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Infinity has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "15% chance that a shot uses no ammo."
            ],
            [
              "Level II",
              "30% chance that a shot uses no ammo."
            ],
            [
              "Level III",
              "40% chance that a shot uses no ammo."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The roll is made per shot, and a free shot does not use up a round in the magazine either.",
          "It matters most for expensive guns (bows, rockets, staffs), whose rounds cost the most from the [[mechanics/ammo-pool|shared ammo pool]]."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a gun, crossbow or bow. With a sword in your hand its offer weight drops to 0.4 if you carry a gun in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not.",
          "Synergy: this card belongs to the Gun group ([[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/supercharge|Supercharge]], [[buffs/piercing|Piercing]], [[buffs/growing|Growing]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Take it on ammo-hungry builds; the [[weapons/revolver-mk-1|Revolver]] already has infinite ammo, so it gains nothing there. Rounds cost the most on the [[weapons/staff|Staff]] and the [[weapons/rocket|Rocket]], so try it there."
        ]
      }
    ],
    "tags": [
      "Ranged utility",
      "Ranged",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "recycle"
      },
      {
        "category": "buffs",
        "slug": "looting"
      },
      {
        "category": "buffs",
        "slug": "multishot"
      },
      { "category": "weapons", "slug": "revolver-mk-1" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "weapons", "slug": "staff" },
    ]
  },
  {
    "slug": "piercing",
    "category": "buffs",
    "name": "Piercing",
    "subtitle": "Ranged offense card",
    "summary": "Piercing lets some of your bullets pass through enemies instead of stopping at the first one. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/piercing.png",
      "alt": "Piercing card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Ranged offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "Every 3rd / 2nd / every shot"
      },
      {
        "label": "Works with",
        "value": "Guns, crossbows and bows"
      },
      {
        "label": "Synergy group",
        "value": "Gun cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Piercing** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Piercing lets some of your bullets pass through enemies instead of stopping at the first one.",
          "*In-game description: “After firing a certain number of bullets, the next bullet will have the ability to penetrate.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Piercing has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Every 3rd shot pierces through enemies."
            ],
            [
              "Level II",
              "Every 2nd shot pierces through enemies."
            ],
            [
              "Level III",
              "Every shot pierces through enemies."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "At level I every 3rd shot pierces, at level II every 2nd shot, and at level III every shot.",
          "Piercing bullets can hit several enemies in a line."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a gun, crossbow or bow. With a sword in your hand its offer weight drops to 0.4 if you carry a gun in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not.",
          "Synergy: this card belongs to the Gun group ([[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/supercharge|Supercharge]], [[buffs/infinity|Infinity]], [[buffs/growing|Growing]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "At level III every shot pierces, which is ideal for rapid-fire guns in corridors. Easy to try on the starting [[weapons/revolver-mk-1|Revolver]] or a fast gun such as the [[weapons/uzi|Uzi]]."
        ]
      }
    ],
    "tags": [
      "Ranged offense",
      "Ranged",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "bomb-shot"
      },
      {
        "category": "buffs",
        "slug": "multishot"
      },
      {
        "category": "buffs",
        "slug": "growing"
      },
      {
        "category": "buffs",
        "slug": "infinity"
      },
      { "category": "weapons", "slug": "revolver-mk-1" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "growing",
    "category": "buffs",
    "name": "Growing",
    "subtitle": "Ranged offense card",
    "summary": "Growing makes bullets stronger the farther they travel. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/growing.png",
      "alt": "Growing card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Ranged offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "25% / 50% / 75%"
      },
      {
        "label": "Works with",
        "value": "Guns, crossbows and bows"
      },
      {
        "label": "Synergy group",
        "value": "Gun cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Growing** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Growing makes bullets stronger the farther they travel.",
          "*In-game description: “The farther the bullet flies, the stronger the attack.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Growing has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Bullets deal up to +25% damage the farther they fly."
            ],
            [
              "Level II",
              "Bullets deal up to +50% damage the farther they fly."
            ],
            [
              "Level III",
              "Bullets deal up to +75% damage the farther they fly."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The bonus grows with travel distance and reaches its full value at 1.5 units from the muzzle.",
          "Close-range shots get little or none of it, so it favours hanging back."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a gun, crossbow or bow. With a sword in your hand its offer weight drops to 0.4 if you carry a gun in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not.",
          "Synergy: this card belongs to the Gun group ([[buffs/bomb-shot|Bomb Shot]], [[buffs/multishot|Multishot]], [[buffs/supercharge|Supercharge]], [[buffs/infinity|Infinity]], [[buffs/piercing|Piercing]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A natural fit for bows and long-range guns; weak for point-blank shotgun play. Easy to try on the starting [[weapons/revolver-mk-1|Revolver]] or a fast gun such as the [[weapons/uzi|Uzi]]."
        ]
      }
    ],
    "tags": [
      "Ranged offense",
      "Ranged",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "bomb-shot"
      },
      {
        "category": "buffs",
        "slug": "piercing"
      },
      {
        "category": "buffs",
        "slug": "supercharge"
      },
      { "category": "weapons", "slug": "revolver-mk-1" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "weapons", "slug": "uzi" },
    ]
  },
  {
    "slug": "rush-time",
    "category": "buffs",
    "name": "Rush Time",
    "subtitle": "Mobility card",
    "summary": "Rush Time shortens the cooldown of your dash. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/rush-time.png",
      "alt": "Rush Time card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Mobility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "15% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      },
      {
        "label": "Synergy group",
        "value": "Dash cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Rush Time** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Rush Time shortens the cooldown of your dash.",
          "*In-game description: “Cooldown reduction.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Rush Time has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Your dash cooldown is 15% shorter."
            ],
            [
              "Level II",
              "Your dash cooldown is 30% shorter."
            ],
            [
              "Level III",
              "Your dash cooldown is 40% shorter."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "A shorter cooldown means more dashes, more [[mechanics/health-shield-and-dodge|dodges]] and, with the dash cards, more triggers."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Synergy: this card belongs to the Dash group ([[buffs/dynamo|Dynamo]], [[buffs/electric|Electric]], [[buffs/dash-knight|Dash Knight]], [[buffs/swiftfooted|Swiftfooted]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "It is the engine of the dash group: [[buffs/dynamo|Dynamo]], [[buffs/electric|Electric]], [[buffs/dash-knight|Dash Knight]] and [[buffs/swiftfooted|Swiftfooted]] all fire per dash."
        ]
      }
    ],
    "tags": [
      "Mobility",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "dynamo"
      },
      {
        "category": "buffs",
        "slug": "electric"
      },
      {
        "category": "buffs",
        "slug": "dash-knight"
      },
      {
        "category": "buffs",
        "slug": "swiftfooted"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "burning",
    "category": "buffs",
    "name": "Burning",
    "subtitle": "Offense card",
    "summary": "Burning sets enemies that stand right next to you on fire, whatever weapon you hold. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/burning.png",
      "alt": "Burning card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "6 / 12 / 18"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Burning** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Burning sets enemies that stand right next to you on fire, whatever weapon you hold.",
          "*In-game description: “Every 0.5s burning an enemy that near you.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Burning has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Enemies right next to you burn for 6 damage over 1.2 s."
            ],
            [
              "Level II",
              "Enemies right next to you burn for 12 damage over 1.2 s."
            ],
            [
              "Level III",
              "Enemies right next to you burn for 18 damage over 1.2 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Every half second the game looks for enemies within 0.5 units of you and ignites them for a flat amount of damage over 1.2 seconds (6 ticks).",
          "The damage is flat, not scaled by your weapon, so it is worth more with a weak weapon and less with a strong one.",
          "Bosses within range are ignited too."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Good with melee builds that stay in the thick of the fight.",
          "If you also carry [[buffs/fire|Fire]], the two share the same burn lock, so they do not stack on one target."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "fire"
      },
      {
        "category": "buffs",
        "slug": "frezzing"
      },
      {
        "category": "buffs",
        "slug": "cower"
      },
      { "category": "weapons", "slug": "fire-staff" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "frezzing",
    "category": "buffs",
    "name": "Frezzing",
    "subtitle": "Utility card",
    "summary": "Frezzing is the aura version of the slow: enemies close to you move slower. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/frezzing.png",
      "alt": "Frezzing card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 40% / 60%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Frezzing** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Frezzing is the aura version of the slow: enemies close to you move slower.",
          "*In-game description: “Every 0.5s slowing down an enemy speed that near you.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Frezzing has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Enemies near you are slowed by 20%."
            ],
            [
              "Level II",
              "Enemies near you are slowed by 40%."
            ],
            [
              "Level III",
              "Enemies near you are slowed by 60%."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Every half second the game slows enemies within 0.5 units of you.",
          "The name is spelled \"Frezzing\" in the game. It is a separate card from [[buffs/freezing|Freezing]], which slows the enemies you hit."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Strong in melee: enemies that reach you are slowed, which makes them easier to kite."
        ]
      }
    ],
    "tags": [
      "Utility",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "freezing"
      },
      {
        "category": "buffs",
        "slug": "burning"
      },
      {
        "category": "buffs",
        "slug": "sluggish-foes"
      },
      { "category": "weapons", "slug": "ice-staff" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "cower",
    "category": "buffs",
    "name": "Cower",
    "subtitle": "Offense card",
    "summary": "Cower rewards a flawless run: while your health is full you deal bonus damage. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/cower.png",
      "alt": "Cower card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Cower** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Cower rewards a flawless run: while your health is full you deal bonus damage.",
          "*In-game description: “While you are at full HP, you deal increased your damage..”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Cower has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "At full health you deal +20% damage."
            ],
            [
              "Level II",
              "At full health you deal +30% damage."
            ],
            [
              "Level III",
              "At full health you deal +40% damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The bonus applies only while your HP equals your maximum.",
          "It is lost the moment you take a hit and returns when you heal back to full."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Combine it with [[buffs/protection|Protection]], [[buffs/shield|Shield]] and [[buffs/life-boot|Life Boot]] to stay at full health."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "protection"
      },
      {
        "category": "buffs",
        "slug": "shield"
      },
      {
        "category": "buffs",
        "slug": "sharpness"
      },
      {
        "category": "buffs",
        "slug": "life-boot"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "electric",
    "category": "buffs",
    "name": "Electric",
    "subtitle": "Offense card",
    "summary": "Electric makes every dash release an electric orb that arcs between three enemies. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/electric.png",
      "alt": "Electric card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "4 / 6 / 8"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      },
      {
        "label": "Synergy group",
        "value": "Dash cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Electric** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Electric makes every dash release an electric orb that arcs between three enemies.",
          "*In-game description: “Summons 1 electric orb to attack 3 enemies.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Electric has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Each dash fires an electric orb that bounces between 3 enemies for 4 damage."
            ],
            [
              "Level II",
              "Each dash fires an electric orb that bounces between 3 enemies for 6 damage."
            ],
            [
              "Level III",
              "Each dash fires an electric orb that bounces between 3 enemies for 8 damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The orb deals a flat 4, 6 or 8 damage per hit (not scaled by your weapon), so it is a small bonus on a dash rather than a main damage source."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Synergy: this card belongs to the Dash group ([[buffs/dynamo|Dynamo]], [[buffs/rush-time|Rush Time]], [[buffs/dash-knight|Dash Knight]], [[buffs/swiftfooted|Swiftfooted]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Part of the dash group with [[buffs/rush-time|Rush Time]]."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "rush-time"
      },
      {
        "category": "buffs",
        "slug": "dynamo"
      },
      {
        "category": "buffs",
        "slug": "dash-knight"
      },
      {
        "category": "buffs",
        "slug": "swiftfooted"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "angry",
    "category": "buffs",
    "name": "Angry",
    "subtitle": "Offense card",
    "summary": "Angry is a comeback card: when you are badly hurt you attack faster. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/angry.png",
      "alt": "Angry card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Offense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "20% / 30% / 40%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Angry** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Angry is a comeback card: when you are badly hurt you attack faster.",
          "*In-game description: “if your health is below 33% you will get increased attack speed and damage.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Angry has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Below 33% health you attack 20% faster."
            ],
            [
              "Level II",
              "Below 33% health you attack 30% faster."
            ],
            [
              "Level III",
              "Below 33% health you attack 40% faster."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "It triggers below one third of your max HP and shortens the time between attacks by the listed percentage."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Risky but powerful with [[buffs/leeching|Leeching]] or healing, which can pull you back out of the danger zone."
        ]
      }
    ],
    "tags": [
      "Offense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "increase-speed"
      },
      {
        "category": "buffs",
        "slug": "rampaging"
      },
      {
        "category": "buffs",
        "slug": "cower"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "life-boot",
    "category": "buffs",
    "name": "Life Boot",
    "subtitle": "Defense card",
    "summary": "Life Boot raises your maximum health. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/life-boot.png",
      "alt": "Life Boot card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Defense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "10% / 20% / 30%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Life Boot** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Life Boot raises your maximum health.",
          "*In-game description: “Increase your heah.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Life Boot has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Your max health is +10%."
            ],
            [
              "Level II",
              "Your max health is +20%."
            ],
            [
              "Level III",
              "Your max health is +30%."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "A plain survival card: +10%, +20% or +30% max HP."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Works with every build and pairs well with healing such as [[buffs/leeching|Leeching]]."
        ]
      }
    ],
    "tags": [
      "Defense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "protection"
      },
      {
        "category": "buffs",
        "slug": "shield"
      },
      {
        "category": "buffs",
        "slug": "leeching"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "shield",
    "category": "buffs",
    "name": "Shield",
    "subtitle": "Defense card",
    "summary": "Shield gives you a window of reduced damage after drinking a potion. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/shield.png",
      "alt": "Shield card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Defense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "3 s / 4 s / 5 s"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Shield** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Shield gives you a window of reduced damage after drinking a potion.",
          "*In-game description: “Whenever you use a healing potion, you take -50% damage for a short duration.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Shield has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "After you use a healing potion, you take less damage for 3 s."
            ],
            [
              "Level II",
              "After you use a healing potion, you take less damage for 4 s."
            ],
            [
              "Level III",
              "After you use a healing potion, you take less damage for 5 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "After a potion you take 50% less damage for 3, 4 or 5 seconds (levels I to III).",
          "A hit that takes at least 25% of your max HP also opens the window, at most once every 15 seconds.",
          "Windows never add up to immunity: when several reductions overlap, the damage you take cannot fall below a safety floor."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "It turns a potion into a defensive tool as well as a heal."
        ]
      }
    ],
    "tags": [
      "Defense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "protection"
      },
      {
        "category": "buffs",
        "slug": "life-boot"
      },
      {
        "category": "buffs",
        "slug": "cower"
      },
      { "category": "items", "slug": "shield-spell" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "protection",
    "category": "buffs",
    "name": "Protection",
    "subtitle": "Defense card",
    "summary": "Protection permanently reduces all damage you take. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/protection.png",
      "alt": "Protection card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Defense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "5% / 10% / 15%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Protection** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Protection permanently reduces all damage you take.",
          "*In-game description: “Reduces damage taken.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Protection has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "You take 5% less damage."
            ],
            [
              "Level II",
              "You take 10% less damage."
            ],
            [
              "Level III",
              "You take 15% less damage."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "5%, 10% or 15% less damage from every hit."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A small but constant reduction that stacks with [[buffs/shield|Shield]]."
        ]
      }
    ],
    "tags": [
      "Defense",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "shield"
      },
      {
        "category": "buffs",
        "slug": "life-boot"
      },
      {
        "category": "buffs",
        "slug": "leeching"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "recycle",
    "category": "buffs",
    "name": "Recycle",
    "subtitle": "Ranged utility card",
    "summary": "Recycle turns the hits you take into ammo: every few hits refill part of your ammo. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/recycle.png",
      "alt": "Recycle card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Ranged utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "Every 30th / 20th / 10th hit taken"
      },
      {
        "label": "Works with",
        "value": "Guns, crossbows and bows"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Recycle** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Recycle turns the hits you take into ammo: every few hits refill part of your ammo.",
          "*In-game description: “Being hit by damage-inflicting projectiles will occasionally craft a small quiver of ammo.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Recycle has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Every 30 hits you take refill 10% of your gun's ammo."
            ],
            [
              "Level II",
              "Every 20 hits you take refill 10% of your gun's ammo."
            ],
            [
              "Level III",
              "Every 10 hits you take refill 10% of your gun's ammo."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Every 30th, 20th or 10th hit you take refills 10% of the [[mechanics/ammo-pool|shared ammo pool]] (100 of its 1000 units), whichever gun you hold.",
          "It counts damage-dealing projectiles that hit you."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It only does something with a gun, crossbow or bow. With a sword in your hand its offer weight drops to 0.4 if you carry a gun in your [[mechanics/inventory-and-bag|bag]] and to 0 if you do not.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "A niche card: it only pays off if you get hit often, so it fits builds that tank damage. It matters most on ammo-hungry guns such as the [[weapons/uzi|Uzi]]."
        ]
      }
    ],
    "tags": [
      "Ranged utility",
      "Ranged",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "infinity"
      },
      {
        "category": "buffs",
        "slug": "looting"
      },
      { "category": "weapons", "slug": "revolver-mk-1" },
      { "category": "mechanics", "slug": "ammo-pool" },
      { "category": "weapons", "slug": "uzi" },
    ]
  },
  {
    "slug": "dash-knight",
    "category": "buffs",
    "name": "Dash Knight",
    "subtitle": "Summon card",
    "summary": "Dash Knight can summon a knight ally every time you dash or defeat an enemy. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/dash-knight.png",
      "alt": "Dash Knight card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Summon"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "10% / 20% / 30%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      },
      {
        "label": "Synergy group",
        "value": "Dash cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dash Knight** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Dash Knight can summon a knight ally every time you dash or defeat an enemy.",
          "*In-game description: “Chance to summon a knight when you use skill, with up to 3 knights joining your side.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Dash Knight has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "10% to summon a knight ally when you dash or defeat an enemy."
            ],
            [
              "Level II",
              "20% to summon a knight ally when you dash or defeat an enemy."
            ],
            [
              "Level III",
              "30% to summon a knight ally when you dash or defeat an enemy."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The chance is rolled on every dash and on every kill. It is a separate card from [[buffs/knight|Knight]], so you can take both and roll twice per kill."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Synergy: this card belongs to the Dash group ([[buffs/dynamo|Dynamo]], [[buffs/rush-time|Rush Time]], [[buffs/electric|Electric]], [[buffs/swiftfooted|Swiftfooted]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Part of the dash group: [[buffs/rush-time|Rush Time]] makes you dash more often and so summon more knights."
        ]
      }
    ],
    "tags": [
      "Summon",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "knight"
      },
      {
        "category": "buffs",
        "slug": "rush-time"
      },
      {
        "category": "buffs",
        "slug": "dynamo"
      },
      {
        "category": "buffs",
        "slug": "swiftfooted"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "swiftfooted",
    "category": "buffs",
    "name": "Swiftfooted",
    "subtitle": "Mobility card",
    "summary": "Swiftfooted speeds you up for three seconds after each dash. It has 3 levels.",
    "image": {
      "src": "/ld/wiki/buffs/swiftfooted.png",
      "alt": "Swiftfooted card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Mobility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "3"
      },
      {
        "label": "Effect by level",
        "value": "30% / 40% / 50%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      },
      {
        "label": "Synergy group",
        "value": "Dash cards"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Swiftfooted** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Swiftfooted speeds you up for three seconds after each dash.",
          "*In-game description: “use skill makes you move faster for three seconds.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Swiftfooted has 3 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "After a dash you move 30% faster for 3 s."
            ],
            [
              "Level II",
              "After a dash you move 40% faster for 3 s."
            ],
            [
              "Level III",
              "After a dash you move 50% faster for 3 s."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "The speed bonus lasts 3 seconds after each dash: +30%, +40% or +50%."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Synergy: this card belongs to the Dash group ([[buffs/dynamo|Dynamo]], [[buffs/rush-time|Rush Time]], [[buffs/electric|Electric]], [[buffs/dash-knight|Dash Knight]]). Every other group card you hold adds +0.5 to its weight, up to 2x.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "With [[buffs/rush-time|Rush Time]] you can keep the bonus running almost permanently."
        ]
      }
    ],
    "tags": [
      "Mobility",
      "Any weapon",
      "3 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "rush-time"
      },
      {
        "category": "buffs",
        "slug": "dynamo"
      },
      {
        "category": "buffs",
        "slug": "electric"
      },
      {
        "category": "buffs",
        "slug": "dash-knight"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "sand-clock",
    "category": "buffs",
    "name": "Sand Clock",
    "subtitle": "Utility card",
    "summary": "Sand Clock makes your artifact skills recharge faster. It has 2 levels.",
    "image": {
      "src": "/ld/wiki/buffs/sand-clock.png",
      "alt": "Sand Clock card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "2"
      },
      {
        "label": "Effect by level",
        "value": "15% / 30%"
      },
      {
        "label": "Works with",
        "value": "Needs an artifact"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sand Clock** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Sand Clock makes your [[items/artifacts|artifact]] skills recharge faster.",
          "*In-game description: “Artifact cooldown reduction.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Sand Clock has 2 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Artifact skills recharge 15% faster."
            ],
            [
              "Level II",
              "Artifact skills recharge 30% faster."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "It only does something when you carry an [[items/artifacts|artifact]]: the offer hides it when you have none and shows it at reduced weight when the artifact is only in your [[mechanics/inventory-and-bag|bag]].",
          "It was originally one of the cards unlocked from the Cultist in the [[dungeons/the-hub-island|hub]]; the open-storage change now unlocks it from the start."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It needs an [[items/artifacts|artifact]]: full weight with an artifact equipped, 0.4 with one in your [[mechanics/inventory-and-bag|bag]], and 0 with none.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Take it if you rely on an artifact such as a magic book or a heal book."
        ]
      }
    ],
    "tags": [
      "Utility",
      "Artifact",
      "2 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "energy"
      },
      { "category": "items", "slug": "sand-clock" },
      { "category": "items", "slug": "artifacts" },
      { "category": "mechanics", "slug": "level-up-card-picks" },
    ]
  },
  {
    "slug": "sluggish-foes",
    "category": "buffs",
    "name": "Sluggish Foes",
    "subtitle": "Utility card",
    "summary": "Sluggish Foes slows every enemy you face while you hold it. It has 2 levels.",
    "image": {
      "src": "/ld/wiki/buffs/sluggish-foes.png",
      "alt": "Sluggish Foes card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Utility"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "2"
      },
      {
        "label": "Effect by level",
        "value": "20% / 35%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sluggish Foes** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Sluggish Foes slows every enemy you face while you hold it.",
          "*In-game description: “Reduce enemy movement speed.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Sluggish Foes has 2 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "All enemies move 20% slower."
            ],
            [
              "Level II",
              "All enemies move 35% slower."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "Unlike the slow cards that affect enemies one by one, this one applies to all enemies at once.",
          "It has two levels: 20% and 35% slower.",
          "Its data name is \"DontMove\"; the card is shown as Sluggish Foes."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Easier kiting for ranged builds; it stacks with the slows of [[buffs/freezing|Freezing]] and [[buffs/frezzing|Frezzing]]."
        ]
      }
    ],
    "tags": [
      "Utility",
      "Any weapon",
      "2 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "freezing"
      },
      {
        "category": "buffs",
        "slug": "frezzing"
      },
      {
        "category": "buffs",
        "slug": "amateur"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  },
  {
    "slug": "amateur",
    "category": "buffs",
    "name": "Amateur",
    "subtitle": "Defense card",
    "summary": "Amateur makes enemy bullets less accurate, so more of them miss you. It has 2 levels.",
    "image": {
      "src": "/ld/wiki/buffs/amateur.png",
      "alt": "Amateur card icon",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Defense"
      },
      {
        "label": "Rarity",
        "value": "Standard (cards have no rarity tiers)"
      },
      {
        "label": "Levels",
        "value": "2"
      },
      {
        "label": "Effect by level",
        "value": "15% / 25%"
      },
      {
        "label": "Works with",
        "value": "Any weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Amateur** is a [[mechanics/level-up-card-picks|level-up card]] in The Last Dungeon. Amateur makes enemy bullets less accurate, so more of them miss you.",
          "*In-game description: “Enemy shots will be less accurate.”*"
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Amateur has 2 levels. Taking the card again raises it by one level; a card at its top level is not raised further."
        ],
        "table": {
          "columns": [
            "Level",
            "Effect"
          ],
          "rows": [
            [
              "Level I",
              "Enemy shots spread 15% wider, so more of them miss."
            ],
            [
              "Level II",
              "Enemy shots spread 25% wider, so more of them miss."
            ]
          ]
        }
      },
      {
        "heading": "How it works",
        "bullets": [
          "It widens the spread of enemy shots by 15% (level I) or 25% (level II).",
          "It has only two levels.",
          "It was one of the cards unlocked from the Cultist before the open-storage change."
        ]
      },
      {
        "heading": "How it is offered",
        "bullets": [
          "[[mechanics/level-up-card-picks|Level-up cards]] are offered when you enter floors 2, 3, 5, 7, 9 and 11: six picks per run, three cards each. Tap a card, then tap it again to confirm.",
          "It works with every weapon, so it is always a live card for the weapon in your hand.",
          "Every card that can still be raised has the same base weight; the offer multiplies it by fit, by synergy and by 1.5 if you already hold it. From your 4th pick on, half of the offers that contain no upgrade swap one card for an upgrade of a card you hold.",
          "In solo play you get one free reroll per run, and a [[dungeons/shrine-rooms|Blood shrine]] lets you trade health for another card pick."
        ]
      },
      {
        "heading": "Tips",
        "bullets": [
          "Strong against turrets and shooting enemies; it does nothing against melee enemies."
        ]
      }
    ],
    "tags": [
      "Defense",
      "Any weapon",
      "2 levels"
    ],
    "related": [
      {
        "category": "buffs",
        "slug": "sluggish-foes"
      },
      {
        "category": "buffs",
        "slug": "protection"
      },
      { "category": "mechanics", "slug": "level-up-card-picks" },
      { "category": "dungeons", "slug": "shrine-rooms" },
    ]
  }
];
