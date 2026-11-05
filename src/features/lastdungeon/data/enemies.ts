import type { WikiArticle } from "../types";

export const enemies: WikiArticle[] = [
  {
    "slug": "bestiary-overview",
    "category": "enemies",
    "name": "Bestiary Overview",
    "subtitle": "Monsters of The Last Dungeon",
    "summary": "A guide to the regular monsters of the dungeon: the biomes they live in, the roles that decide how they move, how their health and damage scale with the floor, what their telegraphs mean and what they drop.",
    "infobox": [
      {
        "label": "Type",
        "value": "Guide"
      },
      {
        "label": "Monster types",
        "value": "29 drawn from room pools (23 in Normal mode, 6 more only in Hard mode), plus 2 that appear only as summons or splits"
      },
      {
        "label": "Biomes",
        "value": "[[dungeons/the-dungeon|Dungeon]], [[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]] (Normal mode); [[dungeons/the-castle|Castle]], [[dungeons/the-sand-ruins|Sand Ruins]], Lab (Hard mode)"
      },
      {
        "label": "Boss floors",
        "value": "4, 8 and 12 (see the [[bosses/boss-overview|Boss Encounters]] guide)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Every fight room in The Last Dungeon is filled from a **pool**: a weighted list of monster types that belongs to the biome of the current floor. A room draws a few types from the pool (two to five depending on the biome) and spawns a wave of them. The maps are set up for 3 to 6 monsters per wave (4 to 7 in the [[dungeons/the-castle|Castle]]). [[mechanics/difficulty-modes|Normal mode]] uses 23 monster types; six more ([[enemies/goblin-wizard]], [[enemies/kua-toa]], [[enemies/flower-monster]], [[enemies/piraha]], [[enemies/sand-scorpion]] and [[enemies/necro-acolyte]]) appear only in Hard mode.",
          "Normal mode runs through three biomes: the **Dungeon** (floors 1-3), the **[[dungeons/the-jungle|Jungle]]** (floors 5-7) and the **[[dungeons/the-lab|Lab]]** (floors 9-11). Floors 4, 8 and 12 are [[dungeons/boss-floors|boss floors]] with no ordinary rooms. Hard mode swaps in a different set: the **Castle** (floors 1-3), the **[[dungeons/the-sand-ruins|Sand Ruins]]** (floors 5-7) and the Lab again (9-11), with the same boss floors.",
          "On top of the base monster, rooms can carry a twist: a few monsters are promoted to marked [[enemies/monster-affixes|affix monsters]], and from floor 5 some rooms hold [[enemies/elites-and-champions|elites and champions]]."
        ]
      },
      {
        "heading": "Monster roster",
        "paragraphs": [
          "Health is the floor 1 value of the monster (see Stats and scaling below)."
        ],
        "table": {
          "columns": [
            "Monster",
            "Role",
            "Biome",
            "Health"
          ],
          "rows": [
            [
              "[[enemies/small-goblin|Small Goblin]]",
              "Swarmer",
              "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]] ([[mechanics/difficulty-modes|Hard mode]])",
              "5 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/spore-bat|Spore Bat]]",
              "Swarmer",
              "Dungeon, [[dungeons/the-jungle|Jungle]]; Castle (Hard mode)",
              "6.3 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/goblin-sword|Goblin Sword]]",
              "Bruiser",
              "Dungeon, Jungle, [[dungeons/the-lab|Lab]]; Lab (Hard mode)",
              "25 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/goblin-armor|Goblin Armor]]",
              "Bruiser",
              "Jungle, Lab; Castle, Lab (Hard mode)",
              "35 at floor 1 (2 health bars)"
            ],
            [
              "[[enemies/fat-goblin|Fat Goblin]]",
              "Bruiser",
              "Dungeon; Castle (Hard mode)",
              "76 at floor 1 (3 health bars)"
            ],
            [
              "[[enemies/fat-goblin-gun|Fat Goblin Gun]]",
              "Gunner",
              "Dungeon; Castle, [[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)",
              "50 at floor 1 (2 health bars)"
            ],
            [
              "[[enemies/goblin-archer|Goblin Archer]]",
              "Kiter",
              "Dungeon, Jungle, Lab; Castle, Sand Ruins, Lab (Hard mode)",
              "13 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/ghost-wizard|Ghost Wizard]]",
              "Caster",
              "Dungeon; Castle, Lab (Hard mode)",
              "13 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/goblin-wizard|Goblin Wizard]]",
              "Caster",
              "Sand Ruins, Lab (Hard mode)",
              "15 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/enchanter|Enchanter]]",
              "Caster",
              "Jungle; Castle (Hard mode)",
              "18 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/explode-goblin|Explode Goblin]]",
              "Suicide",
              "Dungeon; Castle (Hard mode)",
              "10 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/skeleton-brute|Skeleton Brute]]",
              "Charger",
              "Dungeon; Castle (Hard mode)",
              "30 at floor 1 (2 health bars)"
            ],
            [
              "[[enemies/bone-archer|Bone Archer]]",
              "Kiter",
              "Dungeon; Castle (Hard mode)",
              "13 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/crypt-crawler|Crypt Crawler]]",
              "Charger",
              "Jungle; Sand Ruins (Hard mode)",
              "13 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/bog-bloat|Bog Bloat]]",
              "Suicide",
              "Jungle, Lab; Lab (Hard mode)",
              "15 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/thorn-spitter|Thorn Spitter]]",
              "Turret",
              "Jungle; Sand Ruins (Hard mode)",
              "18 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/ring-plant|Ring Plant]]",
              "Turret",
              "Jungle, Lab; Lab (Hard mode)",
              "25 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/plant-explode|Plant Explode]]",
              "Suicide",
              "Jungle, Lab; Sand Ruins, Lab (Hard mode)",
              "13 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/medium-slime|Medium Slime]]",
              "Bruiser",
              "Jungle; Sand Ruins (Hard mode)",
              "15 at floor 1 (2 health bars)"
            ],
            [
              "[[enemies/small-slime|Small Slime]]",
              "Swarmer",
              "",
              "8.6 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/flower-monster|Flower Monster]]",
              "Bruiser",
              "Sand Ruins (Hard mode)",
              "25 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/piraha|Piraha]]",
              "Turret",
              "Sand Ruins (Hard mode)",
              "20 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/kua-toa|Kua-Toa]]",
              "Caster",
              "Sand Ruins (Hard mode)",
              "25 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/shotgun-machine|ShotGun Machine]]",
              "Gunner",
              "Jungle, Lab; Lab (Hard mode)",
              "18 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/machine-sword|Machine Sword]]",
              "Bruiser",
              "Jungle, Lab; Sand Ruins, Lab (Hard mode)",
              "30 at floor 1 (2 health bars)"
            ],
            [
              "[[enemies/hammer|Hammer]]",
              "Bruiser",
              "Jungle, Lab; Sand Ruins, Lab (Hard mode)",
              "25 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/sand-scorpion|Sand Scorpion]]",
              "Bruiser",
              "Sand Ruins (Hard mode)",
              "40 at floor 1 (2 health bars)"
            ],
            [
              "[[enemies/rust-drone|Rust Drone]]",
              "Kiter",
              "Lab; Lab (Hard mode)",
              "10 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/rust-golem|Rust Golem]]",
              "Bruiser",
              "Lab; Lab (Hard mode)",
              "76 at floor 1 (3 health bars)"
            ],
            [
              "[[enemies/necro-acolyte|Necro Acolyte]]",
              "Summoner",
              "Castle, Lab (Hard mode)",
              "15 at floor 1 (1 health bar)"
            ],
            [
              "[[enemies/skeleton-minion|Skeleton Minion]]",
              "Summoned archer",
              "Hard mode Castle and Lab (summoned by the Necro Acolyte)",
              "5 at floor 1 (1 health bar)"
            ]
          ]
        }
      },
      {
        "heading": "Biomes and floors",
        "table": {
          "columns": [
            "Mode",
            "Floors 1-3",
            "Floor 4",
            "Floors 5-7",
            "Floor 8",
            "Floors 9-11",
            "Floor 12"
          ],
          "rows": [
            [
              "Normal",
              "[[dungeons/the-dungeon|Dungeon]]",
              "Boss: [[bosses/skeleton-seeker|Skeleton Seeker]] or [[bosses/old-guardian|Old Guardian]]",
              "Jungle",
              "Boss: [[bosses/heavy-knight|Heavy Knight]]",
              "Lab",
              "Boss: [[bosses/vegeful|Vegeful]]"
            ],
            [
              "Hard",
              "Castle",
              "Boss: [[bosses/ghost-king|Ghost King]] or [[bosses/old-guardian|Old Guardian]]",
              "Sand Ruins",
              "Boss: [[bosses/desert-hunter|Desert Hunter]]",
              "Lab",
              "Boss: [[bosses/vegeful|Vegeful]]"
            ]
          ]
        }
      },
      {
        "heading": "Roles",
        "paragraphs": [
          "Every regular monster has a role that drives how it moves and where it stands. Roles also limit how many of a kind a room can spawn at once, so rooms stay readable."
        ],
        "table": {
          "columns": [
            "Role",
            "Behaviour",
            "Monsters"
          ],
          "rows": [
            [
              "Swarmer",
              "Fast, fragile melee monsters that arrive in groups and approach from slightly different bearings.",
              "[[enemies/small-goblin|Small Goblin]], [[enemies/spore-bat|Spore Bat]], [[enemies/small-slime|Small Slime]]"
            ],
            [
              "Bruiser",
              "Standard melee monsters with a wind-up swing and, in most cases, a heavier special strike.",
              "[[enemies/goblin-sword|Goblin Sword]], [[enemies/goblin-armor|Goblin Armor]], [[enemies/fat-goblin|Fat Goblin]], [[enemies/hammer|Hammer]], [[enemies/machine-sword|Machine Sword]], [[enemies/rust-golem|Rust Golem]], [[enemies/sand-scorpion|Sand Scorpion]], [[enemies/medium-slime|Medium Slime]], [[enemies/flower-monster|Flower Monster]]"
            ],
            [
              "Charger",
              "Wind up with a lane on the floor, then dash in a straight line. At most two act at once.",
              "[[enemies/skeleton-brute|Skeleton Brute]], [[enemies/crypt-crawler|Crypt Crawler]]"
            ],
            [
              "Kiter",
              "Ranged monsters that circle the hero, back away when approached and stand still while they aim.",
              "[[enemies/goblin-archer|Goblin Archer]], [[enemies/bone-archer|Bone Archer]], [[enemies/rust-drone|Rust Drone]]"
            ],
            [
              "Gunner",
              "Slow, sturdy shooters with a spread attack and a punishment for being hugged.",
              "[[enemies/shotgun-machine|ShotGun Machine]], [[enemies/fat-goblin-gun|Fat Goblin Gun]]"
            ],
            [
              "Turret",
              "Plants that stand (almost) still and shoot patterns.",
              "[[enemies/thorn-spitter|Thorn Spitter]], [[enemies/ring-plant|Ring Plant]], [[enemies/piraha|Piraha]]"
            ],
            [
              "Caster",
              "Spell-like attacks, buffs or traps from range.",
              "[[enemies/ghost-wizard|Ghost Wizard]], [[enemies/goblin-wizard|Goblin Wizard]], [[enemies/enchanter|Enchanter]], [[enemies/kua-toa|Kua-Toa]]"
            ],
            [
              "Summoner",
              "Keeps its distance and raises minions.",
              "[[enemies/necro-acolyte|Necro Acolyte]]"
            ],
            [
              "Suicide",
              "Run at the hero and explode after a short fuse. At most two at a time (three in [[dungeons/hard-room|Hard rooms]]).",
              "[[enemies/explode-goblin|Explode Goblin]], [[enemies/bog-bloat|Bog Bloat]], [[enemies/plant-explode|Plant Explode]]"
            ]
          ]
        }
      },
      {
        "heading": "Stats and scaling",
        "paragraphs": [
          "These numbers are for solo play and were derived from the game's balance code, so treat them as close approximations rather than values shown in the game.",
          "A monster's base health per bar is about 25 times its health scale (31.5 x 0.8), multiplied by its number of health bars. Health grows with the floor by a factor of 1 + 0.23 per floor above the first. Damage per hit is 12 times the monster's damage scale, multiplied by 1 + 0.24 per floor above the first. In [[mechanics/difficulty-modes|Hard mode]] both health and damage are multiplied by 1.9.",
          "In a [[mechanics/co-op-multiplayer|co-op]] game health rises by 35% and damage by 25% for each extra player in the room, and the per-floor growth is gentler (0.13 for health and 0.18 for damage)."
        ],
        "bullets": [
          "Example: a [[enemies/goblin-sword|Goblin Sword]] has about 25 health and hits for 12 on floor 1; on floor 7 it has about 60 health and hits for about 29.",
          "Example: the same monster in Hard mode on floor 7 has about 114 health and hits for about 56."
        ]
      },
      {
        "heading": "Telegraphs and fair fire",
        "paragraphs": [
          "Shooting monsters follow a fair-fire system. Before a shot leaves, the monster shows a **tell** (usually 0.3 to 0.5 s) and draws a **lane** on the floor. The shot is aimed at where you are heading, based on your measured velocity, and bullets are checked against walls from the muzzle so they are never fired through scenery.",
          "If you lose more than 30% of your health and shield within 5 seconds, monsters go easy for 4 seconds: their lead drops to 40% of normal and their wind-ups are 0.1 s longer. After a monster misses four times in a row its aim improves a little until it hits you.",
          "Melee monsters and many specials use a **ground marker** for strikes: the marker fills while the monster winds up, and walking out of it avoids the hit. The harder a strike hits, the longer its wind-up: pokes can be almost instant, strikes need at least a short wind-up, and heavy slams give you about a second."
        ]
      },
      {
        "heading": "Kits, reels and exposure",
        "paragraphs": [
          "Most melee and ranged monsters have a **move kit**: a few special moves on top of their basic attack. The kit never makes a monster deal more damage over time than its basic attack would; it only changes how the damage arrives.",
          "Early floors (1 and 2) use only simple pokes and strikes and at most one telegraphed special per monster. More moves unlock on later floors, which is why many entries say 'from floor 3' or 'from floor 5'.",
          "Heavy attacks leave the monster **exposed** afterwards, taking extra damage (about 1.25 to 1.4 times). Multi-bar monsters also **reel** when one of their health bars breaks: they stagger for about a second, take extra damage and then speed up a little. Kits are solo-only for now: in [[mechanics/co-op-multiplayer|co-op]], monsters use their classic attacks."
        ]
      },
      {
        "heading": "Waves and composition",
        "bullets": [
          "The first two monsters of a wave are always melee.",
          "Ranged monsters (kiters, gunners, turrets and casters) make up no more than about a third of a wave, with at most two kiters and gunners alive at once (three in [[dungeons/hard-room|Hard rooms]]) and one turret.",
          "At most one Charger at a time on floors 1-2 and two from floor 3 (one more in Hard); at most two Suicide monsters (three in Hard).",
          "Monsters come in squads of two to four spawned together, in formations such as a pincer, a swarm, a shield wall and a charge line (the last two from floor 3), and never closer than 1.2 units to the hero."
        ]
      },
      {
        "heading": "Drops",
        "paragraphs": [
          "Monsters share a small kill-drop table. Each kill can drop a [[items/health-potion|health potion]] (about 6%), a [[items/coin|coin]] (about 1.7%) or, rarely, a [[items/key|key]] (about 0.2%). Separately, about 45% of kills spill two to four bullets into your [[mechanics/ammo-pool|shared ammo pool]]. These percentages are derived from the drop code and are affected by the [[buffs/looting]] upgrade.",
          "The real rewards are in the room: clearing a fight room spawns a [[items/chests|chest]], [[enemies/elites-and-champions|elites and champions]] pay out better chests, and bosses drop a [[items/boss-chest|boss chest]] (see the [[bosses/boss-overview|Boss Encounters]] guide)."
        ]
      }
    ],
    "tags": [
      "Guide"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "monster-affixes"
      },
      {
        "category": "enemies",
        "slug": "elites-and-champions"
      },
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-sword"
      },
      {
        "category": "mechanics",
        "slug": "ammo-pool"
      },
      {
        "category": "dungeons",
        "slug": "boss-floors"
      }
    ]
  },
  {
    "slug": "monster-affixes",
    "category": "enemies",
    "name": "Monster Affixes",
    "subtitle": "Marked monsters",
    "summary": "Some ordinary monsters carry a coloured marker with a name and an extra rule. There are four: Shielded, Volatile, Frenzied and Vampiric.",
    "infobox": [
      {
        "label": "Type",
        "value": "Mechanic guide"
      },
      {
        "label": "Affixes",
        "value": "Shielded, Volatile, Frenzied, Vampiric"
      },
      {
        "label": "First seen",
        "value": "Floor 2"
      },
      {
        "label": "Co-op",
        "value": "Off (affixes do not appear in co-op games)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "A marked monster is an ordinary monster with a coloured outline, a halo and a name over it. Each carries exactly one affix ([[enemies/elites-and-champions|elites and champions]] always carry one), which changes how it fights. Marking is rolled when a monster spawns: none on floor 1, 8% on floor 2, 12% on floors 3-4, 16% on floors 5-8 and 20% on floors 9-12 (4 points more in [[mechanics/difficulty-modes|Hard mode]]). There is no marking on [[dungeons/boss-floors|boss floors]].",
          "To keep rooms fair, at least five monsters must spawn between two marked ones and at most two marked monsters can be alive at once, so the real share of marked monsters is about 6 to 11%. From floor 9, a marked monster also gains a second health bar."
        ]
      },
      {
        "heading": "The four affixes",
        "table": {
          "columns": [
            "Affix",
            "From floor",
            "Effect"
          ],
          "rows": [
            [
              "Shielded",
              "3",
              "A shield covers a 50 degree arc in front of the monster. Damage that hits the shield is multiplied by 0.35, and the shield breaks after absorbing about half of a health bar."
            ],
            [
              "Volatile",
              "2",
              "When it dies, it shows a 0.9 s tell and then explodes in a radius of 0.45 units for 1.25 times the monster's own hit (at least 5, at most 22)."
            ],
            [
              "Frenzied",
              "2",
              "Moves and animates 25% faster."
            ],
            [
              "Vampiric",
              "3",
              "Heals itself for 25% of the damage it deals."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Shielded: get behind the monster or wait for it to turn; sustained fire breaks the shield.",
          "Volatile: kill it at range or step back after the kill, the tell gives you 0.9 s to leave.",
          "Frenzied: it closes the distance faster, so shoot it before it is in melee range.",
          "Vampiric: do not trade blows with it; kill it quickly."
        ]
      },
      {
        "heading": "Notes",
        "paragraphs": [
          "Affixes are a solo-only feature at the moment. A mutator in [[mechanics/difficulty-modes|Hard mode]] may also add one of Frenzied, Shielded or Vampiric to the run's monsters. There is a reward switch that would give a [[items/coin|coin]] for each marked kill, but it is off. See also the [[enemies/bestiary-overview|Bestiary Overview]] and [[enemies/elites-and-champions|Elites and Champions]]."
        ]
      }
    ],
    "tags": [
      "Guide",
      "Affix"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "elites-and-champions"
      },
      {
        "category": "enemies",
        "slug": "goblin-sword"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "boss-floors"
      },
      {
        "category": "items",
        "slug": "coin"
      }
    ]
  },
  {
    "slug": "elites-and-champions",
    "category": "enemies",
    "name": "Elites and Champions",
    "subtitle": "Special fight rooms",
    "summary": "From floor 5, some fight rooms carry a twist: Elite rooms promote ordinary monsters into tougher versions, and Champion rooms (also called Mini-Boss rooms) put one big multi-bar monster in the room.",
    "infobox": [
      {
        "label": "Type",
        "value": "Mechanic guide"
      },
      {
        "label": "First seen",
        "value": "Floor 5"
      },
      {
        "label": "Elite",
        "value": "1 elite on floors 5-6, 2 elites from floor 7; none in co-op"
      },
      {
        "label": "Champion",
        "value": "3 bars on floors 5-8, 4 bars on floors 9-10; none in co-op"
      },
      {
        "label": "Reward",
        "value": "Elite rooms pay a quality-2 clear chest; champion rooms add a bonus chest"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "On each floor between 25% and 45% of the fight rooms get a twist (floors 1, 4, 8 and 12 get none), and no floor has more than two twisted rooms or more than one heavy twist ([[dungeons/gauntlet-room|Gauntlet]], Elite or Champion). Elites and champions can only appear from floor 5 on.",
          "Elite and champion rooms are solo-only. In a [[mechanics/co-op-multiplayer|co-op]] game an [[dungeons/elite-room|Elite room]] plays as an ordinary [[dungeons/hard-room|hard room]], and [[dungeons/champion-room|Champion rooms]] do not appear."
        ]
      },
      {
        "heading": "Elites",
        "paragraphs": [
          "An [[dungeons/elite-room|Elite room]] promotes one or two of the monsters it already spawns (one on floors 5 and 6, two from floor 7). An elite is **25% larger**, has **at least two health bars** and deals **1.5 times** the damage of a normal monster. Like a champion it also carries one [[enemies/monster-affixes|affix]]. Its pay is the quality-2 [[items/chests|chest]] that clearing the room gives."
        ]
      },
      {
        "heading": "Champions",
        "paragraphs": [
          "A [[dungeons/champion-room|Champion room]] (a Mini-Boss twist) appears only in the last room before the end of the floor or in an optional room, never on floor 11 and never in [[mechanics/co-op-multiplayer|co-op]]. The champion is built from a [[enemies/hammer|Hammer]] or a [[enemies/shotgun-machine|ShotGun Machine]] body, which is why the [[dungeons/the-dungeon|Dungeon]] and [[dungeons/the-castle|Castle]] have no champions.",
          "A champion is **50% larger**, always carries one [[enemies/monster-affixes|affix]], has **three health bars** on floors 5-8 and **four** on floors 9-10, deals **1.5 times** the normal damage and enrages for **25% more speed** when it gets hurt. Beating it pays out a bonus [[items/chests|chest]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Spend your consumables on the champion; it dwarfs a normal monster's health.",
          "Break bars to make multi-bar monsters reel, then burst them down while they are exposed.",
          "Treat the elite as the room's priority target: with 1.5 times the damage it kills faster than anything around it."
        ]
      }
    ],
    "tags": [
      "Guide",
      "Elite"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "monster-affixes"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "enemies",
        "slug": "shotgun-machine"
      },
      {
        "category": "items",
        "slug": "chests"
      },
      {
        "category": "dungeons",
        "slug": "elite-room"
      }
    ]
  },
  {
    "slug": "small-goblin",
    "category": "enemies",
    "name": "Small Goblin",
    "subtitle": "Weak swarming goblin",
    "summary": "The Small Goblin is the smallest and weakest monster of the Dungeon: a green runt that dies in a shot or two and swarms the hero in numbers.",
    "image": {
      "src": "/ld/wiki/enemies/small-goblin.png",
      "alt": "Small Goblin sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Swarmer"
      },
      {
        "label": "Health",
        "value": "About 5 at floor 1 (1 health bar)"
      },
      {
        "label": "Damage",
        "value": "About 2.4 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "1 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Small Goblins are fast for their size (1.0 units/s) and have almost no health, so the danger is never one goblin but a swarm closing in from several sides. Their bite is the weakest in the game, about 2.4 damage at floor 1.",
          "The Swarmer role makes them approach from slightly different bearings instead of piling onto the same tile. When one goblin attacks, nearby goblins get a short speed boost (a rally)."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Bite",
              "Contact hit with a 0.2 s wind-up and a 1.3 s delay between bites.",
              "About 2.4 at floor 1"
            ],
            [
              "HopBack Poke",
              "A contact poke followed by a 0.4 unit hop backwards. Wind-up 0.25 s, recovery 0.45 s, cooldown 1.6 s.",
              "About 2.4 at floor 1"
            ],
            [
              "Rally",
              "When one goblin attacks, goblins close to it gain +20% speed for 3 s (once every 6 s for an area).",
              "Speed x1.2"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/small-goblin/attack.gif",
            "alt": "Small Goblin attacking the hero",
            "caption": "Small Goblin in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "1",
              "about 14%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fight with your back to a wall or in a doorway so only two or three can reach you.",
          "The poke hops away after hitting, so chasing a single goblin is wasteful; let them come to you.",
          "Area and piercing weapons clean up a swarm quickly."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Swarmer"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-sword"
      },
      {
        "category": "enemies",
        "slug": "spore-bat"
      },
      {
        "category": "enemies",
        "slug": "goblin-archer"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "spore-bat",
    "category": "enemies",
    "name": "Spore Bat",
    "subtitle": "Fast diving bat",
    "summary": "A purple bat that flaps around the hero and dives in for a quick bite. It is the fastest regular monster in the game and easy to kill, but hard to track in a crowd.",
    "image": {
      "src": "/ld/wiki/enemies/spore-bat.png",
      "alt": "Spore Bat sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]], [[dungeons/the-jungle|Jungle]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Swarmer"
      },
      {
        "label": "Health",
        "value": "About 6.3 at floor 1 (1 health bar)"
      },
      {
        "label": "Damage",
        "value": "About 3.6 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "1.1 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Spore Bats have 1.1 units/s of speed, more than any other regular monster, and only a sliver of health. They weave from side to side while closing in and then dive.",
          "They are Swarmers, so they arrive in groups and try to come from different angles."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Bite",
              "Contact hit, 0.2 s wind-up, 1.0 s delay between bites.",
              "About 3.6 at floor 1"
            ],
            [
              "Dive Poke",
              "A telegraphed dive: a 0.6 s wind-up with a short lane (0.9 long, 0.16 wide) drawn toward the hero, then a fast dash at speed 2.6. Cooldown 3.5 s.",
              "About 4 at floor 1"
            ],
            [
              "Weave",
              "While approaching it zig-zags sideways (0.7 s period), so straight shots often miss.",
              "Movement style"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/spore-bat/attack.gif",
            "alt": "Spore Bat attacking the hero",
            "caption": "Spore Bat in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "1",
              "about 14%"
            ],
            [
              "[[dungeons/the-jungle|Jungle]]",
              "Normal mode, floors 5-7",
              "0.5",
              "about 4%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Wait for the dive lane to appear and step out of it.",
          "Use rapid-fire or spread weapons; a single slow shot misses a weaving bat.",
          "Kill bats first in a mixed group, because they reach you first."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Jungle",
      "Castle",
      "Swarmer"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "small-goblin"
      },
      {
        "category": "enemies",
        "slug": "crypt-crawler"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "goblin-sword",
    "category": "enemies",
    "name": "Goblin Sword",
    "subtitle": "Basic goblin swordsman",
    "summary": "The Goblin Sword is the standard melee monster of the game and the yardstick for the others: a goblin with a short sword, found in the pool of every biome in Normal mode.",
    "image": {
      "src": "/ld/wiki/enemies/goblin-sword.png",
      "alt": "Goblin Sword sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]], [[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 25 at floor 1 (1 health bar)"
      },
      {
        "label": "Damage",
        "value": "About 12 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.65 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "With a single health bar and a 12 damage swing at floor 1, the Goblin Sword teaches new players to read wind-ups. Its swing starts slowly (0.6 s) and the delay between swings is 2 s, so it is easy to avoid but punishing if ignored.",
          "Its walk speed is 0.65 units/s. Under a third of its health it enrages and moves 20% faster."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Sword swing",
              "Basic attack: 0.6 s wind-up, then a hit; about 2 s between swings.",
              "About 12 at floor 1"
            ],
            [
              "Combo Strike",
              "A two-beat combo (0.65 s wind-up, 0.65 s between beats). Cooldown 4.5 s.",
              "About 6.6 per beat at floor 1"
            ],
            [
              "Shove Poke",
              "From floor 3 on, a quick short poke (reach 0.26 units) used when you hug the goblin.",
              "About 2 at floor 1"
            ],
            [
              "Enrage",
              "Below 33% health the goblin gains +20% speed.",
              "Speed x1.2"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/goblin-sword/attack.gif",
            "alt": "Goblin Sword attacking the hero",
            "caption": "Goblin Sword in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "1",
              "about 14%"
            ],
            [
              "[[dungeons/the-jungle|Jungle]]",
              "Normal mode, floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Hit and step back: the wind-up gives you time to leave its reach.",
          "Do not stand adjacent; the shove poke punishes hugging from floor 3.",
          "Finish it quickly once it is hurt, the enrage makes it harder to kite."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Jungle",
      "Lab",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-armor"
      },
      {
        "category": "enemies",
        "slug": "small-goblin"
      },
      {
        "category": "enemies",
        "slug": "fat-goblin"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "goblin-armor",
    "category": "enemies",
    "name": "Goblin Armor",
    "subtitle": "Armored shield-bash goblin",
    "summary": "A tougher goblin in plate armor with two health bars. It charges in with a shield bash and braces against stuns, and is the backbone of Jungle, Lab and Sand Ruins fights.",
    "image": {
      "src": "/ld/wiki/enemies/goblin-armor.png",
      "alt": "Goblin Armor sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; [[dungeons/the-castle|Castle]], Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 35 at floor 1 (2 health bars); about 68 on floor 5"
      },
      {
        "label": "Damage",
        "value": "About 14 per hit at floor 1; about 28 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.75 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Goblin Armor is the most common monster in the [[dungeons/the-jungle|Jungle]] and [[dungeons/the-lab|Lab]] pools (a weight of 2, twice that of most others). It has two health bars and a quicker walk (0.75 units/s) than the plain [[enemies/goblin-sword]].",
          "In [[mechanics/difficulty-modes|Hard mode]] it replaces the Goblin Sword in the [[dungeons/the-castle|Castle]] pool and stays in the Lab pool."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Armored swing",
              "Basic attack: 0.4 s wind-up, 2 s delay.",
              "About 14 at floor 1"
            ],
            [
              "Shield Bash",
              "From floor 2 on: a lunge of 0.45 units at speed 2.2 after a 0.73 s wind-up, then 1.0 s recovery. Cooldown 5 s.",
              "About 8 at floor 1"
            ],
            [
              "Bar break reel",
              "When a health bar breaks the goblin is staggered for 0.8 s, takes +25% damage while reeling and then speeds up by 20%.",
              "Exposed x1.25"
            ],
            [
              "Brace",
              "If it takes six hits within 2 s it ignores stuns for 1.2 s.",
              "Stun immunity"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/goblin-armor/attack.gif",
            "alt": "Goblin Armor attacking the hero",
            "caption": "Goblin Armor in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "2",
              "about 16%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "2",
              "about 18%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "2",
              "about 14%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Burst a bar down while it is reeling; the exposed window multiplies your damage.",
          "Sidestep the bash after the wind-up; it moves in a straight line.",
          "Stun-based tactics stop working once it braces, so mix your damage sources."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Castle",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-sword"
      },
      {
        "category": "enemies",
        "slug": "fat-goblin"
      },
      {
        "category": "enemies",
        "slug": "skeleton-brute"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "fat-goblin",
    "category": "enemies",
    "name": "Fat Goblin",
    "subtitle": "Rare three-bar slammer",
    "summary": "A hulking, slow goblin with three health bars and a heavy ground slam. It is rare (a pool weight of only 0.1 in the Dungeon and Castle), so meeting one is an event.",
    "image": {
      "src": "/ld/wiki/enemies/fat-goblin.png",
      "alt": "Fat Goblin sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 76 at floor 1 (3 health bars)"
      },
      {
        "label": "Damage",
        "value": "About 18 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.5 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Fat Goblin plods at only 0.5 units/s but has three health bars and one of the heaviest legacy swings of the early monsters. Each broken bar makes it reel.",
          "It is the melee twin of the [[enemies/fat-goblin-gun|Fat Goblin Gun]]."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Club swing",
              "Basic attack: 0.4 s wind-up, 2 s delay.",
              "About 18 at floor 1"
            ],
            [
              "Slam Heavy",
              "From floor 3 on: it leads the point where you stand, a 0.9 s wind-up with a ground marker (radius 0.25 units), 1.2 s recovery. Cooldown 5.5 s. Exposed (x1.35 damage) afterwards.",
              "About 14 at floor 1"
            ],
            [
              "Bar break reels",
              "Two reels (one per broken bar): 1.0 s, +30% damage taken, speed x1.1.",
              "Exposed x1.3"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/fat-goblin/attack.gif",
            "alt": "Fat Goblin attacking the hero",
            "caption": "Fat Goblin in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "0.1",
              "about 1%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "0.1",
              "about 1%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Keep moving: it is slow, so you can always walk around its slam.",
          "Hit it right after a slam while it is exposed.",
          "Avoid fighting it in a crowd, its slam marker is easy to miss among other attacks."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "fat-goblin-gun"
      },
      {
        "category": "enemies",
        "slug": "goblin-armor"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "fat-goblin-gun",
    "category": "enemies",
    "name": "Fat Goblin Gun",
    "subtitle": "Shotgun-toting fat goblin",
    "summary": "A slow, two-bar goblin armed with a huge red gun that sprays a fan of ten bolts. It stands its ground and punishes anyone who steps on top of it.",
    "image": {
      "src": "/ld/wiki/enemies/fat-goblin-gun.png",
      "alt": "Fat Goblin Gun sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]], [[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Gunner"
      },
      {
        "label": "Health",
        "value": "About 50 at floor 1 (2 health bars)"
      },
      {
        "label": "Bolt damage",
        "value": "About 18 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.4 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The [[enemies/fat-goblin]] Gun fires a ten-bolt fan at long intervals (every 6 s) with a 0.5 s tell, a lane drawn on the floor and slow bullets (1.5 units/s). It barely moves (0.4 units/s).",
          "It is rare in the [[dungeons/the-dungeon|Dungeon]] and [[dungeons/the-castle|Castle]] pools (weight 0.2), a little more common in the [[mechanics/difficulty-modes|Hard-mode]] [[dungeons/the-sand-ruins|Sand Ruins]] pool (0.5)."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Ten-bolt fan",
              "Ten bolts 2 degrees apart. 0.4 s wind-up plus the visible tell; delay 6 s. Bullet speed 1.5.",
              "About 18 per bolt at floor 1"
            ],
            [
              "GroundPound",
              "If you stand on it (within 0.55 units): a donut from 0.15 to 0.45 units after a 1.25 s wind-up.",
              "About 11 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/fat-goblin-gun/attack.gif",
            "alt": "Fat Goblin Gun attacking the hero",
            "caption": "Fat Goblin Gun in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "0.2",
              "about 3%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "0.2",
              "about 2%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "0.5",
              "about 4%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "The fan is narrow: step sideways and it misses.",
          "Never hug it; the ground pound is the answer to point-blank play.",
          "Attack from the side, its bullets are slow."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Sand",
      "Gunner"
    ],
    "trivia": [
      "The [[enemies/fat-goblin]] and the Fat Goblin Gun share the same body sprite; the wiki shows the same image for both."
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "fat-goblin"
      },
      {
        "category": "enemies",
        "slug": "goblin-archer"
      },
      {
        "category": "enemies",
        "slug": "shotgun-machine"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "goblin-archer",
    "category": "enemies",
    "name": "Goblin Archer",
    "subtitle": "Kiting bow goblin",
    "summary": "The standard ranged monster: a goblin with a short bow that keeps its distance, circles you and shoots telegraphed arrows aimed slightly ahead of where you are heading.",
    "image": {
      "src": "/ld/wiki/enemies/goblin-archer.png",
      "alt": "Goblin Archer sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]], [[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; [[dungeons/the-castle|Castle]], [[dungeons/the-sand-ruins|Sand Ruins]], Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Kiter"
      },
      {
        "label": "Health",
        "value": "About 13 at floor 1 (1 health bar)"
      },
      {
        "label": "Arrow damage",
        "value": "About 8.4 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.45 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Archers are Kiters: they walk around you while their bow recharges, back away when you close in, and stand still while aiming so the shot can be precise.",
          "Their shots use the fair-fire system: a 0.35 s tell and a red lane appear before the arrow leaves, and the arrow leads your movement."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Arrow volley",
              "A fan of arrows 12 degrees apart. Delay 2.5 s between volleys, a 0.35 s tell and a lane on the floor.",
              "About 8 per arrow at floor 1"
            ],
            [
              "RollAway",
              "If you get within 0.4 units it crouches for 0.2 s then rolls 0.5 units sideways and away (every 4 s).",
              "Reposition"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/goblin-archer/attack.gif",
            "alt": "Goblin Archer attacking the hero",
            "caption": "Goblin Archer in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "0.9",
              "about 12%"
            ],
            [
              "[[dungeons/the-jungle|Jungle]]",
              "Normal mode, floors 5-7",
              "0.8",
              "about 7%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "0.8",
              "about 7%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Strafe across its line: the lead is tuned so walking in a straight line gets you hit, zig-zagging does not.",
          "Chase it into a corner, where its roll cannot take it far.",
          "Do not stand still in its lane."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Jungle",
      "Lab",
      "Castle",
      "Sand",
      "Kiter"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "bone-archer"
      },
      {
        "category": "enemies",
        "slug": "goblin-wizard"
      },
      {
        "category": "enemies",
        "slug": "rust-drone"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "ghost-wizard",
    "category": "enemies",
    "name": "Ghost Wizard",
    "subtitle": "Barrage-casting ghost",
    "summary": "A hooded ghost that conjures glowing orbs in a formation and sends them at you one after another. It blinks away when you get close.",
    "image": {
      "src": "/ld/wiki/enemies/ghost-wizard.png",
      "alt": "Ghost Wizard sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]], [[dungeons/the-lab|Lab]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Caster"
      },
      {
        "label": "Health",
        "value": "About 13 at floor 1 (1 health bar)"
      },
      {
        "label": "Orb damage",
        "value": "About 12 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.45 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Ghost Wizard is a Caster: it hovers at range and casts on a slow cycle (about every 9 s). Each cast spawns a pattern of orbs, holds them in place for a moment and then releases them at the hero one by one.",
          "From floor 2 on it gains a defensive teleport."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Orb barrage",
              "Conjures a formation of ghost bullets, holds it, then fires each at where you stand. Delay 9 s.",
              "About 12 per orb at floor 1"
            ],
            [
              "Blink",
              "From floor 2: if you come within 0.75 units it marks a spot 0.9 units away, waits 0.5 s, then teleports there. The destination is checked against walls and crowds. Cooldown 12 s.",
              "Reposition"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/ghost-wizard/attack.gif",
            "alt": "Ghost Wizard attacking the hero",
            "caption": "Ghost Wizard in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "1",
              "about 14%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Shoot it while the formation is still held: the orbs are not moving yet.",
          "Close the distance quickly; it can only blink once every 12 s.",
          "Do not run in a straight line while orbs are being released."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Lab",
      "Caster"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-wizard"
      },
      {
        "category": "enemies",
        "slug": "goblin-archer"
      },
      {
        "category": "enemies",
        "slug": "necro-acolyte"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "goblin-wizard",
    "category": "enemies",
    "name": "Goblin Wizard",
    "subtitle": "Potion-throwing goblin",
    "summary": "A robed goblin who lobs potions that burst into damaging puddles. It only appears in the Hard-mode pools (Sand Ruins and Lab).",
    "image": {
      "src": "/ld/wiki/enemies/goblin-wizard.png",
      "alt": "Goblin Wizard sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-sand-ruins|Sand Ruins]], [[dungeons/the-lab|Lab]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Caster"
      },
      {
        "label": "Health",
        "value": "About 15 at floor 1 (1 health bar); about 55 on floor 5 in Hard mode"
      },
      {
        "label": "Potion damage",
        "value": "About 2.4 per hit at floor 1; about 8.9 on floor 5 in Hard mode"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Goblin Wizard is a Caster with a slow 4 s cycle. It throws a random potion (picked by weight) toward your position; the potion flies for a moment, splashes and leaves a damaging area.",
          "It has no special move of its own beyond the potion lob."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Potion lob",
              "Throws a potion at where you stand; on landing it creates a damage area. Wind-up 0.25 s, delay 4 s.",
              "Area damage, about 2.4 per hit at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/goblin-wizard/attack.gif",
            "alt": "Goblin Wizard attacking the hero",
            "caption": "Goblin Wizard in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "[[mechanics/difficulty-modes|Hard mode]], floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Potions fly slowly: just walk away from the target spot.",
          "Do not stand in the puddle afterwards.",
          "Rush it: it has little health and only throws every 4 s."
        ]
      }
    ],
    "tags": [
      "Sand",
      "Lab",
      "Caster"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "ghost-wizard"
      },
      {
        "category": "enemies",
        "slug": "enchanter"
      },
      {
        "category": "enemies",
        "slug": "necro-acolyte"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      }
    ]
  },
  {
    "slug": "enchanter",
    "category": "enemies",
    "name": "Enchanter",
    "subtitle": "Buffing support monster",
    "summary": "A hooded support monster that never attacks directly. It links itself to up to three nearby monsters with glowing beams and makes them bigger and tougher.",
    "image": {
      "src": "/ld/wiki/enemies/enchanter.png",
      "alt": "Enchanter sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Caster"
      },
      {
        "label": "Health",
        "value": "About 18 at floor 1 (1 health bar); about 34 on floor 5"
      },
      {
        "label": "Damage",
        "value": "None (it has no attack of its own)"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Enchanter stays behind its allies (on the side away from the hero) and enchants monsters that come near it, up to three at once. An enchanted monster grows to 1.5 times its size, has its health doubled and deals 1.5 times the damage. When the Enchanter dies the buff is removed.",
          "It has no attack of its own, so it is only a threat through the monsters it empowers. It is in the Normal [[dungeons/the-jungle|Jungle]] pool (weight 0.6) and the [[mechanics/difficulty-modes|Hard-mode]] [[dungeons/the-castle|Castle]] pool (weight 1)."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Ability",
            "What it does",
            "Notes"
          ],
          "rows": [
            [
              "Enchant",
              "Links up to 3 monsters with a beam and a magic ring. Buffed monsters: size x1.5, health x2, damage x1.5. The buff ends when the Enchanter dies.",
              "Buff"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/enchanter/attack.gif",
            "alt": "Enchanter attacking the hero",
            "caption": "Enchanter in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "0.6",
              "about 5%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kill the Enchanter first: it dies easily and its death removes every buff.",
          "Look for the beams connecting monsters; they show who is enchanted.",
          "Do not waste time on buffed monsters until the Enchanter is gone."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Castle",
      "Caster"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "necro-acolyte"
      },
      {
        "category": "enemies",
        "slug": "goblin-wizard"
      },
      {
        "category": "enemies",
        "slug": "goblin-armor"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "explode-goblin",
    "category": "enemies",
    "name": "Explode Goblin",
    "subtitle": "Self-destructing red goblin",
    "summary": "A small red goblin that runs at you and blows up. It has no regular attack; its whole body is a bomb with a short fuse.",
    "image": {
      "src": "/ld/wiki/enemies/explode-goblin.png",
      "alt": "Explode Goblin sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Suicide"
      },
      {
        "label": "Health",
        "value": "About 10 at floor 1 (1 health bar)"
      },
      {
        "label": "Blast damage",
        "value": "20% of the target's maximum health (data value 0.2)"
      },
      {
        "label": "Speed",
        "value": "0.7 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Explode Goblin is a Suicide monster. Once it reaches you its body starts to glow, and after a fuse of 0.5 s it detonates. The blast hurts for a fraction of your maximum health and the goblin dies. If you leave its trigger range before the fuse ends the detonation is cancelled.",
          "A room may hold at most two Suicide monsters at once (three in a [[dungeons/hard-room|Hard room]])."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Fuse and blast",
              "Starts glowing on contact (0.5 s fuse), then explodes. The blast is 20% of the target's maximum health.",
              "20% of max health"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/explode-goblin/attack.gif",
            "alt": "Explode Goblin attacking the hero",
            "caption": "Explode Goblin in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "0.6",
              "about 8%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "0.5",
              "about 5%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Shoot it before it reaches you: it has very little health.",
          "If it starts to glow, run: leaving its trigger cancels the blast.",
          "Rooms with several bombers get dangerous fast: kill them one at a time as they approach."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Suicide"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "bog-bloat"
      },
      {
        "category": "enemies",
        "slug": "plant-explode"
      },
      {
        "category": "enemies",
        "slug": "small-goblin"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "skeleton-brute",
    "category": "enemies",
    "name": "Skeleton Brute",
    "subtitle": "Charging mace skeleton",
    "summary": "A hulking skeleton with a spiked mace and two health bars. It charges in a straight line and is stunned if it slams into a wall.",
    "image": {
      "src": "/ld/wiki/enemies/skeleton-brute.png",
      "alt": "Skeleton Brute sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Charger"
      },
      {
        "label": "Health",
        "value": "About 30 at floor 1 (2 health bars)"
      },
      {
        "label": "Damage",
        "value": "About 16 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Stun chance",
        "value": "60%"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Skeleton Brute is a Charger: it winds up for 0.45 s with a lane drawn on the floor, then dashes 1.1 units at 2.2 units/s. It hits at most once per dash. Only two Chargers act at the same time in a room.",
          "It is resistant to stagger (a hit staggers it only 60% of the time), but if its charge ends against a wall it is stunned for 1.2 s and takes 50% more damage."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Charge",
              "0.45 s wind-up with a lane, a 1.1 unit dash at 2.2 units/s, 0.6 s recovery. Cooldown about 4 s.",
              "About 16 at floor 1"
            ],
            [
              "Mace Slam",
              "From floor 2: a ground slam around its feet (radius 0.30 units), 0.96 s wind-up, 1.0 s recovery. Cooldown 5.5 s.",
              "About 12 at floor 1"
            ],
            [
              "Wall crash",
              "If a charge ends in a wall it is stunned for 1.2 s and takes x1.5 damage.",
              "Exposed"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/skeleton-brute/attack.gif",
            "alt": "Skeleton Brute attacking the hero",
            "caption": "Skeleton Brute in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "1",
              "about 14%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Wait for the lane to appear, then step sideways; its dash is a straight line.",
          "Lure it so that its charge ends in a wall, then dump damage.",
          "Keep an exit behind you so a charge never pins you in a corner."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Charger"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "crypt-crawler"
      },
      {
        "category": "enemies",
        "slug": "goblin-armor"
      },
      {
        "category": "enemies",
        "slug": "bone-archer"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "bone-archer",
    "category": "enemies",
    "name": "Bone Archer",
    "subtitle": "Skeleton archer with rain and snipe",
    "summary": "A skeletal bowman who mixes telegraphed arrows with two special shots: a rain of three arrows and, deeper down, a long-lane sniper shot.",
    "image": {
      "src": "/ld/wiki/enemies/bone-archer.png",
      "alt": "Bone Archer sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-dungeon|Dungeon]]; [[dungeons/the-castle|Castle]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Kiter"
      },
      {
        "label": "Health",
        "value": "About 13 at floor 1 (1 health bar)"
      },
      {
        "label": "Arrow damage",
        "value": "About 9 per hit at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.45 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Bone Archer is a Kiter like the [[enemies/goblin-archer]] but has more tricks. It shoots 9 damage arrows every 2.4 s, with a lane on the floor, and backs away when you stand close.",
          "It is more common in the [[mechanics/difficulty-modes|Hard-mode]] [[dungeons/the-castle|Castle]] pool (weight 1) than in the Normal [[dungeons/the-dungeon|Dungeon]] (0.5)."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Arrow",
              "A single arrow with a 0.35 s tell and a lane; delay 2.4 s.",
              "About 9 at floor 1"
            ],
            [
              "Rain",
              "Three arrows fall as small discs (radius 0.12 units): one on your predicted spot and two beside it, after a 0.85 s warning.",
              "About 6 each at floor 1"
            ],
            [
              "Snipe",
              "From floor 3: a thin lane (1.0 unit) is drawn for 1.1 s, then one fast arrow. The archer is exposed for a long time afterwards. Cooldown 10 s.",
              "About 14 at floor 1"
            ],
            [
              "Retreat",
              "It backs off when you stand on top of it.",
              "Reposition"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/bone-archer/attack.gif",
            "alt": "Bone Archer attacking the hero",
            "caption": "Bone Archer in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-dungeon|Dungeon]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 1-3",
              "0.5",
              "about 7%"
            ],
            [
              "[[dungeons/the-castle|Castle]]",
              "Hard mode, floors 1-3",
              "1",
              "about 10%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Leave the lane during the snipe; you have over a second.",
          "Step out of the rain markers one by one.",
          "Hit it right after a snipe, its recovery is long."
        ]
      }
    ],
    "tags": [
      "Dungeon",
      "Castle",
      "Kiter"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-archer"
      },
      {
        "category": "enemies",
        "slug": "skeleton-brute"
      },
      {
        "category": "enemies",
        "slug": "necro-acolyte"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-dungeon"
      }
    ]
  },
  {
    "slug": "crypt-crawler",
    "category": "enemies",
    "name": "Crypt Crawler",
    "subtitle": "Leaping spider charger",
    "summary": "A fast, spider-like crawler that scuttles side to side and leaps onto the spot where it predicts you will stand.",
    "image": {
      "src": "/ld/wiki/enemies/crypt-crawler.png",
      "alt": "Crypt Crawler sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]]; [[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Charger"
      },
      {
        "label": "Health",
        "value": "About 13 at floor 1 (1 health bar); about 24 on floor 5"
      },
      {
        "label": "Damage",
        "value": "About 9.6 per hit at floor 1; about 19 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.9 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Crypt Crawler is a Charger with a single health bar. It moves at 0.9 units/s, quicker than most monsters of its biome, and keeps out of straight lines.",
          "Its charge works like the [[enemies/skeleton-brute]]'s (a lane, then a straight dash), and from floor 3 on it also gets a leap strike."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Bite",
              "Contact hit with a 0.5 s wind-up; delay 2 s.",
              "About 10 at floor 1"
            ],
            [
              "Charge",
              "Role charge: lane drawn for 0.45 s, then a dash of 1.1 units at 2.2 units/s.",
              "One hit per dash"
            ],
            [
              "Leap Strike",
              "From floor 3: it aims at where you will stand, 0.74 s wind-up, a 0.35 s leap landing in a radius 0.16 unit area, 0.7 s recovery. Cooldown 3.5 s.",
              "About 10 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/crypt-crawler/attack.gif",
            "alt": "Crypt Crawler attacking the hero",
            "caption": "Crypt Crawler in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "0.5",
              "about 4%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Watch the landing marker, not the crawler: step out of the circle.",
          "Its skittering makes it hard to hit; use area shots.",
          "Kill it while it recovers after a leap."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Sand",
      "Charger"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "spore-bat"
      },
      {
        "category": "enemies",
        "slug": "skeleton-brute"
      },
      {
        "category": "enemies",
        "slug": "sand-scorpion"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "bog-bloat",
    "category": "enemies",
    "name": "Bog Bloat",
    "subtitle": "Swollen green bomber",
    "summary": "A fat green blob that waddles toward you and bursts. It is a slower, tougher cousin of the Explode Goblin with a bigger blast.",
    "image": {
      "src": "/ld/wiki/enemies/bog-bloat.png",
      "alt": "Bog Bloat sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Suicide"
      },
      {
        "label": "Health",
        "value": "About 15 at floor 1 (1 health bar); about 29 on floor 5"
      },
      {
        "label": "Blast damage",
        "value": "30% of the target's maximum health (data value 0.3)"
      },
      {
        "label": "Speed",
        "value": "0.55 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Bog Bloats move at 0.55 units/s. Once they reach you they light a fuse of 0.8 s; the burst takes 30% of your maximum health and kills the bloat.",
          "They are fairly common in the [[dungeons/the-lab|Lab]] pools (weight 1) and half as common in the [[dungeons/the-jungle|Jungle]] (0.5)."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Fuse and burst",
              "0.8 s fuse once in range, then a burst for 30% of the target's maximum health.",
              "30% of max health"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/bog-bloat/attack.gif",
            "alt": "Bog Bloat attacking the hero",
            "caption": "Bog Bloat in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "0.5",
              "about 4%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Shoot it from a distance; it is slow.",
          "Back away the moment it starts glowing.",
          "It is slow, so it is easy to kite while you deal with other monsters."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Suicide"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "explode-goblin"
      },
      {
        "category": "enemies",
        "slug": "plant-explode"
      },
      {
        "category": "enemies",
        "slug": "medium-slime"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      }
    ]
  },
  {
    "slug": "thorn-spitter",
    "category": "enemies",
    "name": "Thorn Spitter",
    "subtitle": "Stationary thorn turret",
    "summary": "A carnivorous plant that barely moves (0.15 units/s) and spits fans of thorns along lime-green lanes.",
    "image": {
      "src": "/ld/wiki/enemies/thorn-spitter.png",
      "alt": "Thorn Spitter sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]]; [[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Turret"
      },
      {
        "label": "Health",
        "value": "About 18 at floor 1 (1 health bar); about 34 on floor 5"
      },
      {
        "label": "Thorn damage",
        "value": "About 7.2 per hit at floor 1; about 14 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.15 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Thorn Spitter is a Turret: it plants itself and fires every 3 s. Its default shot is a three-thorn fan, 10 degrees apart, telegraphed by a 0.5 s tell and a lime-green lane. It does not lead your movement, so it is easy to [[mechanics/health-shield-and-dodge|dodge]].",
          "Its special moves add a wall of thorns with one gap and, from floor 5, a root burst."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Thorn fan",
              "Three thorns 10 degrees apart, 0.5 s tell, delay 3 s, bullet speed 1.2.",
              "About 7 each at floor 1"
            ],
            [
              "ThornWall",
              "Five thorns over 40 degrees with one gap (chosen by the cast's seed); four bullets deal damage. Cooldown 6 s.",
              "About 4 each at floor 1"
            ],
            [
              "RootBurst",
              "From floor 5: a disc (radius 0.15 units) where you are heading, 0.8 s warning. Cooldown 8 s.",
              "About 6 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/thorn-spitter/attack.gif",
            "alt": "Thorn Spitter attacking the hero",
            "caption": "Thorn Spitter in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Find the gap in the wall of thorns and walk through it.",
          "It hardly moves, so attack it from the side, out of its lane.",
          "Stay out of the root disc."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Sand",
      "Turret"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "ring-plant"
      },
      {
        "category": "enemies",
        "slug": "plant-explode"
      },
      {
        "category": "enemies",
        "slug": "flower-monster"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "ring-plant",
    "category": "enemies",
    "name": "Ring Plant",
    "subtitle": "Plant that fires rings of seeds",
    "summary": "A purple plant with a glowing green bulb that sprays rings of eight seeds in every direction, with a gap that follows you.",
    "image": {
      "src": "/ld/wiki/enemies/ring-plant.png",
      "alt": "Ring Plant sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Turret"
      },
      {
        "label": "Health",
        "value": "About 25 at floor 1 (1 health bar); about 48 on floor 5"
      },
      {
        "label": "Bolt damage",
        "value": "About 8.4 per hit at floor 1; about 16 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Ring Plant (listed as Plant (ring) in the game's data) is a Turret with one health bar. Every 3 s it fires a ring of eight bolts after a 0.5 s tell. The bolts fly slowly (1.6 units/s).",
          "From floor 3 on it fires two rings back to back."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Seed ring",
              "Eight bolts in a circle, 0.5 s tell, delay 3 s.",
              "About 8 per bolt at floor 1"
            ],
            [
              "Double ring",
              "From floor 3: ring A has its gap where you stand; 0.8 s later ring B, shifted half a step, fills ring A's gaps.",
              "About 4 per bolt at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/ring-plant/attack.gif",
            "alt": "Ring Plant attacking the hero",
            "caption": "Ring Plant in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stand in the gap of the first ring, then step into the gap of the second.",
          "Bolts are slow, so close in and shoot it.",
          "Do not run along the ring's edge."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Turret"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "thorn-spitter"
      },
      {
        "category": "enemies",
        "slug": "plant-explode"
      },
      {
        "category": "enemies",
        "slug": "piraha"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "plant-explode",
    "category": "enemies",
    "name": "Plant Explode",
    "subtitle": "Walking spore bomb",
    "summary": "A leafy plant creature that scuttles at you and bursts. It has the longest fuse of the bombers and the biggest blast.",
    "image": {
      "src": "/ld/wiki/enemies/plant-explode.png",
      "alt": "Plant Explode sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; [[dungeons/the-sand-ruins|Sand Ruins]], Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Suicide"
      },
      {
        "label": "Health",
        "value": "About 13 at floor 1 (1 health bar); about 24 on floor 5"
      },
      {
        "label": "Blast damage",
        "value": "50% of the target's maximum health (data value 0.5)"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Plant Explode is a Suicide monster. Once in range it flashes for 1.5 s before bursting, giving you ample time to leave. The burst deals damage equal to half of your maximum health (a data value of 0.5), the heaviest of the three bombers.",
          "It is in the Normal [[dungeons/the-jungle|Jungle]] and [[dungeons/the-lab|Lab]] pools and the Hard [[dungeons/the-sand-ruins|Sand Ruins]] and Lab pools, always with weight 1."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Fuse and burst",
              "1.5 s fuse, then a burst for 50% of the target's maximum health.",
              "50% of max health"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/plant-explode/attack.gif",
            "alt": "Plant Explode attacking the hero",
            "caption": "Plant Explode in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Do not let it touch you; the long fuse is a trap if you stay put.",
          "Shoot it early, it has only half a health bar.",
          "Prioritise it over slower monsters when it is close."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Sand",
      "Suicide"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "explode-goblin"
      },
      {
        "category": "enemies",
        "slug": "bog-bloat"
      },
      {
        "category": "enemies",
        "slug": "ring-plant"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      }
    ]
  },
  {
    "slug": "medium-slime",
    "category": "enemies",
    "name": "Medium Slime",
    "subtitle": "Splitting blue slime",
    "summary": "A blue slime with two health bars that bounces toward you and splits into three Small Slimes when it dies.",
    "image": {
      "src": "/ld/wiki/enemies/medium-slime.png",
      "alt": "Medium Slime sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]]; [[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 15 at floor 1 (2 health bars); about 29 on floor 5"
      },
      {
        "label": "Damage",
        "value": "About 4.2 per hit at floor 1; about 8.2 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Medium Slimes move slowly (0.6 units/s) and hit weakly (about 4 per hit at floor 1), but killing one releases three [[enemies/small-slime|Small Slimes]]. The first broken health bar already splits off one mini, so the death releases only two more.",
          "They also appear in the [[mechanics/difficulty-modes|Hard-mode]] [[dungeons/the-sand-ruins|Sand Ruins]] pool."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Squash",
              "Contact attack; delay 2 s.",
              "About 4 at floor 1"
            ],
            [
              "Squash Strike",
              "From floor 5: a ground squash around its body (radius 0.20 units), 0.8 s wind-up, 0.8 s recovery. Cooldown 5 s.",
              "About 4 at floor 1"
            ],
            [
              "Split",
              "One [[enemies/small-slime]] appears when the first health bar breaks; the rest appear on death (three in total).",
              "3 Small Slimes"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/medium-slime/attack.gif",
            "alt": "Medium Slime attacking the hero",
            "caption": "Medium Slime in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "0.6",
              "about 5%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fight in the open so the splits do not corner you.",
          "Use piercing or area damage to clear the minis together.",
          "Break the first bar quickly: it gives you a mini early but also makes the slime reel."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Sand",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "small-slime"
      },
      {
        "category": "enemies",
        "slug": "bog-bloat"
      },
      {
        "category": "enemies",
        "slug": "flower-monster"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      }
    ]
  },
  {
    "slug": "small-slime",
    "category": "enemies",
    "name": "Small Slime",
    "subtitle": "Slime split-off",
    "summary": "The small blue slimes released when a Medium Slime breaks. They are weak but come in threes.",
    "image": {
      "src": "/ld/wiki/enemies/small-slime.png",
      "alt": "Small Slime sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]]; [[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode), only as a split-off of the Medium Slime"
      },
      {
        "label": "Role",
        "value": "Swarmer"
      },
      {
        "label": "Health",
        "value": "About 8.6 at floor 1 (1 health bar); about 16 on floor 5"
      },
      {
        "label": "Damage",
        "value": "About 4.2 per hit at floor 1; about 8.2 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.5 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Small Slime (called Small Slim in the game's data) is never drawn from a room pool; it only appears when a [[enemies/medium-slime|Medium Slime]] splits. It moves at 0.5 units/s and has one weak health bar.",
          "Because the slimes appear at once next to you, they are most dangerous when you are already in a corner."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Squash",
              "Contact attack; delay 2 s.",
              "About 4 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/small-slime/attack.gif",
            "alt": "Small Slime attacking the hero",
            "caption": "Small Slime in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": []
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Walk away and let them string out; they are slow.",
          "Area weapons kill all three at once.",
          "Do not stand next to a [[enemies/medium-slime]] when you kill it."
        ]
      }
    ],
    "tags": [
      "Swarmer"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "medium-slime"
      },
      {
        "category": "enemies",
        "slug": "small-goblin"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      }
    ]
  },
  {
    "slug": "flower-monster",
    "category": "enemies",
    "name": "Flower Monster",
    "subtitle": "Daisy-faced walking flower",
    "summary": "A walking white flower with a skull-like face that nibbles at the hero. It appears only in Hard-mode pools.",
    "image": {
      "src": "/ld/wiki/enemies/flower-monster.png",
      "alt": "Flower Monster sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 25 at floor 1 (1 health bar); about 92 on floor 5 in Hard mode"
      },
      {
        "label": "Damage",
        "value": "About 2.4 per hit at floor 1; about 8.9 on floor 5 in Hard mode"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Flower Monster is a plain Bruiser with one health bar and no special kit. It walks at 0.6 units/s and bites after a 0.2 s wind-up, with a 1.3 s delay between bites.",
          "Its bite is weak, but in [[mechanics/difficulty-modes|Hard mode]] its health and damage are multiplied by 1.9."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Bite",
              "Contact hit with a 0.2 s wind-up.",
              "About 2.4 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/flower-monster/attack.gif",
            "alt": "Flower Monster attacking the hero",
            "caption": "Flower Monster in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "[[mechanics/difficulty-modes|Hard mode]], floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Treat it like a slightly tougher [[enemies/small-goblin]].",
          "Kill it before the stronger [[mechanics/difficulty-modes|Hard-mode]] monsters arrive.",
          "Keep moving; it has no ranged attack."
        ]
      }
    ],
    "tags": [
      "Sand",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "small-goblin"
      },
      {
        "category": "enemies",
        "slug": "piraha"
      },
      {
        "category": "enemies",
        "slug": "kua-toa"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      }
    ]
  },
  {
    "slug": "piraha",
    "category": "enemies",
    "name": "Piraha",
    "subtitle": "Seed-spitting piranha plant",
    "summary": "A piranha-headed plant that fires heavy seeds. It appears in Hard mode only.",
    "image": {
      "src": "/ld/wiki/enemies/piraha.png",
      "alt": "Piraha sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Turret"
      },
      {
        "label": "Health",
        "value": "About 20 at floor 1 (1 health bar); about 74 on floor 5 in Hard mode"
      },
      {
        "label": "Seed damage",
        "value": "About 18 per hit at floor 1; about 67 on floor 5 in Hard mode"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Piraha (spelled that way in the game's data) is a Turret. Its own animation gives it a 0.57 s wind-up before each shot, and the shot leads your movement. A seed bursts into a puff where it lands.",
          "It has no special kit, only the one attack."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Seed shot",
              "A single heavy seed toward your predicted position, 0.57 s wind-up, delay 2.5 s, bullet speed 2.",
              "About 18 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/piraha/attack.gif",
            "alt": "Piraha attacking the hero",
            "caption": "Piraha in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "[[mechanics/difficulty-modes|Hard mode]], floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Keep moving across its line; the seed is fast but flies straight.",
          "Close in from the side: it hardly moves.",
          "Do not stay in front of it while it winds up."
        ]
      }
    ],
    "tags": [
      "Sand",
      "Turret"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "ring-plant"
      },
      {
        "category": "enemies",
        "slug": "thorn-spitter"
      },
      {
        "category": "enemies",
        "slug": "flower-monster"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      }
    ]
  },
  {
    "slug": "kua-toa",
    "category": "enemies",
    "name": "Kua-Toa",
    "subtitle": "Net-throwing fishman",
    "summary": "A blue fish-man in the Hard-mode Sand Ruins pool. It throws a net that pins you in place and then closes in with a spear.",
    "image": {
      "src": "/ld/wiki/enemies/kua-toa.png",
      "alt": "Kua-Toa sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Caster"
      },
      {
        "label": "Health",
        "value": "About 25 at floor 1 (1 health bar); about 92 on floor 5 in Hard mode"
      },
      {
        "label": "Damage",
        "value": "Spear thrust about 8 at floor 1; the net deals no damage but stuns for 2 s"
      },
      {
        "label": "Speed",
        "value": "0.65 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Kua-Toa is a Caster. It hangs back and throws a net on a 4 s cycle. If the net hits you, you are trapped and stunned for 2 s; a net that misses shrinks away after a moment.",
          "It also has a spear thrust for anyone who gets close."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Net",
              "A thrown net that flies toward where you stand. If it touches you, you are stunned for 2 s. Delay 4 s.",
              "Stun 2 s"
            ],
            [
              "Spear Thrust",
              "A thrust at contact range: a line 0.35 long and 0.20 wide drawn for 0.75 s.",
              "About 8 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/kua-toa/attack.gif",
            "alt": "Kua-Toa attacking the hero",
            "caption": "Kua-Toa in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "[[mechanics/difficulty-modes|Hard mode]], floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Dodge the net rather than tank it: being stunned next to other monsters is deadly.",
          "Rush the Kua-Toa after a throw, it needs 4 s to throw again.",
          "Stay out of the thrust line when in close."
        ]
      }
    ],
    "tags": [
      "Sand",
      "Caster"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-wizard"
      },
      {
        "category": "enemies",
        "slug": "piraha"
      },
      {
        "category": "enemies",
        "slug": "enchanter"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      }
    ]
  },
  {
    "slug": "shotgun-machine",
    "category": "enemies",
    "name": "ShotGun Machine",
    "subtitle": "Turret robot with spread shot",
    "summary": "A dark, pot-bellied robot that stands in place and blasts a spread of pellets. It is also one of the bodies from which Jungle, Lab and Sand Ruins champions are made.",
    "image": {
      "src": "/ld/wiki/enemies/shotgun-machine.png",
      "alt": "ShotGun Machine sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Gunner"
      },
      {
        "label": "Health",
        "value": "About 18 at floor 1 (1 health bar); about 34 on floor 5"
      },
      {
        "label": "Pellet damage",
        "value": "About 3.6 per hit at floor 1; about 7.1 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.45 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The ShotGun Machine fires five pellets in a wide cone (60 degrees of spread in total) every 4 s, after a 0.4 s tell. The pellets are fast (2.4 units/s) but lose speed to friction.",
          "If you rush it, it vents steam around its body."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Shotgun blast",
              "Five pellets in a cone, 0.4 s tell, delay 4 s.",
              "About 4 per pellet at floor 1"
            ],
            [
              "Overheat",
              "If you rush within 0.5 units it vents a donut of steam (0.12 to 0.40 units) for a heavy hit, then is exposed (x1.4) for 1.2 s. Cooldown 17 s.",
              "About 15 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/shotgun-machine/attack.gif",
            "alt": "ShotGun Machine attacking the hero",
            "caption": "ShotGun Machine in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "0.8",
              "about 7%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "0.8",
              "about 7%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fight it from range at an angle; the pellets are weak individually.",
          "Avoid point blank range, the steam vent is a punishing answer to rushing.",
          "After a vent it is exposed, which is the moment to hit it."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Gunner"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "fat-goblin-gun"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "enemies",
        "slug": "rust-drone"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "machine-sword",
    "category": "enemies",
    "name": "Machine Sword",
    "subtitle": "Robot swordsman",
    "summary": "A robot that wields a long, glowing blade. It has two health bars and a spin attack that hits all around it.",
    "image": {
      "src": "/ld/wiki/enemies/machine-sword.png",
      "alt": "Machine Sword sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; [[dungeons/the-sand-ruins|Sand Ruins]], Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 30 at floor 1 (2 health bars); about 58 on floor 5"
      },
      {
        "label": "Damage",
        "value": "About 9.6 per hit at floor 1; about 19 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.65 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Machine Swords show up in the [[dungeons/the-jungle|Jungle]] and keep appearing in the [[dungeons/the-lab|Lab]] and the [[mechanics/difficulty-modes|Hard-mode]] [[dungeons/the-sand-ruins|Sand Ruins]] pools. They move at 0.65 units/s and have two health bars.",
          "The blade is drawn as a separate sprite from the body."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Slash",
              "Basic attack: 0.25 s wind-up, 2 s delay.",
              "About 10 at floor 1"
            ],
            [
              "Whirl",
              "Two beats around its body (radius 0.30 units): 0.96 s wind-up, 0.92 s between beats. Cooldown 5 s.",
              "About 7 per beat at floor 1"
            ],
            [
              "SlashDash",
              "A 0.7 unit dash toward you after a 0.68 s wind-up.",
              "About 6 at floor 1"
            ],
            [
              "Bar break reel",
              "0.8 s reel, +25% damage taken, speed x1.1.",
              "Exposed x1.25"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/machine-sword/attack.gif",
            "alt": "Machine Sword attacking the hero",
            "caption": "Machine Sword in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Leave the whirl circle after the wind-up; the beats are slow.",
          "Stay out of its dash line.",
          "Break a bar to make it reel."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Sand",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "enemies",
        "slug": "goblin-armor"
      },
      {
        "category": "enemies",
        "slug": "rust-golem"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "hammer",
    "category": "enemies",
    "name": "Hammer",
    "subtitle": "Hammer-wielding robot",
    "summary": "A black robot who swings a huge hammer. It is slow to wind up but one of the hardest hitters among regular monsters, and one of the bodies champions are built from.",
    "image": {
      "src": "/ld/wiki/enemies/hammer.png",
      "alt": "Hammer sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-jungle|Jungle]], [[dungeons/the-lab|Lab]]; [[dungeons/the-sand-ruins|Sand Ruins]], Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 25 at floor 1 (1 health bar); about 48 on floor 5"
      },
      {
        "label": "Damage",
        "value": "About 24 per hit at floor 1; about 47 on floor 5"
      },
      {
        "label": "Speed",
        "value": "0.65 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Hammer's basic swing is the strongest of the ordinary melee monsters (24 damage at floor 1) but is slow to land. In practice it now mostly uses a quicker sweep and, from floor 3 on, a heavy slam; the old swing is only rolled rarely.",
          "It enrages (speed x1.2) when hurt."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Hammer swing",
              "Basic attack, rolled rarely: 0.4 s wind-up, delay 2 s.",
              "About 24 at floor 1"
            ],
            [
              "Sweep Strike",
              "A sweep that punishes hugging: 0.65 s wind-up, 0.6 s recovery. Cooldown 1.75 s.",
              "About 12 at floor 1"
            ],
            [
              "Slam Heavy",
              "From floor 3: 0.92 s wind-up with a marker (radius 0.27 units), 1.3 s recovery, exposed x1.4. Cooldown 4.5 s.",
              "About 20 at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/hammer/attack.gif",
            "alt": "Hammer attacking the hero",
            "caption": "Hammer in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-jungle|Jungle]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Normal mode, floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "Hard mode, floors 5-7",
              "1",
              "about 8%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Respect the slam marker: stepping out of the circle avoids it entirely.",
          "Punish after the slam while it is exposed.",
          "Do not stay close: the sweep punishes hugging."
        ]
      }
    ],
    "tags": [
      "Jungle",
      "Lab",
      "Sand",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "machine-sword"
      },
      {
        "category": "enemies",
        "slug": "fat-goblin"
      },
      {
        "category": "enemies",
        "slug": "rust-golem"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-jungle"
      }
    ]
  },
  {
    "slug": "sand-scorpion",
    "category": "enemies",
    "name": "Sand Scorpion",
    "subtitle": "Hard-mode desert scorpion",
    "summary": "A yellow scorpion with two health bars and a heavy tail. It exists only in the Hard-mode Sand Ruins pool.",
    "image": {
      "src": "/ld/wiki/enemies/sand-scorpion.png",
      "alt": "Sand Scorpion sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-sand-ruins|Sand Ruins]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 40 at floor 1 (2 health bars); about 147 on floor 5 in Hard mode"
      },
      {
        "label": "Damage",
        "value": "About 14 per hit at floor 1; about 54 on floor 5 in Hard mode"
      },
      {
        "label": "Speed",
        "value": "0.55 units/s"
      },
      {
        "label": "Stun chance",
        "value": "40%"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Sand Scorpion hits hard and resists stagger (a hit staggers it only 40% of the time). It moves at 0.55 units/s.",
          "Its leap attack appears from floor 5, which is the first floor of the [[dungeons/the-sand-ruins|Sand Ruins]]."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Sting",
              "Basic attack: 0.5 s wind-up, 2.2 s delay.",
              "About 14 at floor 1"
            ],
            [
              "Tail Sweep",
              "A sweeping tail attack, 0.65 s wind-up. Cooldown 3 s.",
              "About 10 at floor 1"
            ],
            [
              "Leap Heavy",
              "From floor 5: a leap with a 0.85 s wind-up and 1.0 s recovery, exposed x1.4. Cooldown 7 s.",
              "About 14 at floor 1"
            ],
            [
              "Bar break reel",
              "0.8 s reel, +25% damage taken, speed x1.1.",
              "Exposed x1.25"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/sand-scorpion/attack.gif",
            "alt": "Sand Scorpion attacking the hero",
            "caption": "Sand Scorpion in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]]",
              "[[mechanics/difficulty-modes|Hard mode]], floors 5-7",
              "1",
              "about 8%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Wait for the leap marker and move away.",
          "Stay mobile: the sweep punishes standing next to it.",
          "Break a bar to make it reel."
        ]
      }
    ],
    "tags": [
      "Sand",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "crypt-crawler"
      },
      {
        "category": "enemies",
        "slug": "skeleton-brute"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "dungeons",
        "slug": "the-sand-ruins"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      }
    ]
  },
  {
    "slug": "rust-drone",
    "category": "enemies",
    "name": "Rust Drone",
    "subtitle": "Hovering laser drone",
    "summary": "A small flying robot that fires twin bolts and runs a strafing attack. It is the standard ranged monster of the Lab.",
    "image": {
      "src": "/ld/wiki/enemies/rust-drone.png",
      "alt": "Rust Drone sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-lab|Lab]]; Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Kiter"
      },
      {
        "label": "Health",
        "value": "About 10 at floor 1 (1 health bar); about 29 on floor 9"
      },
      {
        "label": "Bolt damage",
        "value": "About 8.4 per hit at floor 1; about 25 on floor 9"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Rust Drone is a Kiter with one health bar. It fires a two-bolt volley every 2 s (6 degrees apart) after a 0.45 s tell, with a lane drawn on the floor.",
          "From floor 5 on it can start a strafe run (in practice it only meets you in the [[dungeons/the-lab|Lab]], on floor 9 or later)."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Twin bolts",
              "Two bolts 6 degrees apart, a 0.45 s tell, delay 2 s.",
              "About 8 per bolt at floor 1"
            ],
            [
              "StrafeRun",
              "From floor 5: it stands for 0.6 s with the run line drawn on the floor, then dashes 0.8 units across the line of fire and shoots three bolts, 0.25 s apart, at the spot where you stood when it started.",
              "About 3 per bolt at floor 1"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/rust-drone/attack.gif",
            "alt": "Rust Drone attacking the hero",
            "caption": "Rust Drone in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-lab|Lab]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 9-11",
              "1",
              "about 9%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Walk sideways across the run line.",
          "Kill it first in a mixed group: it is fragile.",
          "Use cover to break its line of fire."
        ]
      }
    ],
    "tags": [
      "Lab",
      "Kiter"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "goblin-archer"
      },
      {
        "category": "enemies",
        "slug": "bone-archer"
      },
      {
        "category": "enemies",
        "slug": "rust-golem"
      },
      {
        "category": "dungeons",
        "slug": "the-lab"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      }
    ]
  },
  {
    "slug": "rust-golem",
    "category": "enemies",
    "name": "Rust Golem",
    "subtitle": "Heavy three-bar golem",
    "summary": "A huge rust-covered robot with three health bars. It is the slowest and heaviest regular monster, with a donut-shaped stomp.",
    "image": {
      "src": "/ld/wiki/enemies/rust-golem.png",
      "alt": "Rust Golem sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-lab|Lab]]; Lab (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Bruiser"
      },
      {
        "label": "Health",
        "value": "About 76 at floor 1 (3 health bars); about 215 on floor 9"
      },
      {
        "label": "Damage",
        "value": "About 19 per hit at floor 1; about 56 on floor 9"
      },
      {
        "label": "Speed",
        "value": "0.4 units/s"
      },
      {
        "label": "Stun chance",
        "value": "20%"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Rust Golem is the toughest ordinary monster of the [[dungeons/the-lab|Lab]]. It moves at only 0.4 units/s but has three health bars and a hard hit, and it resists stagger (a hit staggers it only 20% of the time).",
          "Each broken bar makes it reel, and the reel gets quicker after the first."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Attack",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Punch",
              "Basic attack: 0.6 s wind-up, 2.6 s delay.",
              "About 19 at floor 1"
            ],
            [
              "Cleave Strike",
              "A short punch: 0.70 s wind-up. Cooldown 3.5 s.",
              "About 12 at floor 1"
            ],
            [
              "Stomp Heavy",
              "A donut-shaped stomp (inner 0.15, outer 0.45 units), 1.2 s wind-up, 1.2 s recovery, exposed x1.4. Cooldown 6 s.",
              "About 14 at floor 1"
            ],
            [
              "Bar break reels",
              "Two reels: 0.8 s, +25% damage taken, speed x1.25 for the first and x1.1 for the second.",
              "Exposed x1.25"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/rust-golem/attack.gif",
            "alt": "Rust Golem attacking the hero",
            "caption": "Rust Golem in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-lab|Lab]]",
              "[[mechanics/difficulty-modes|Normal mode]], floors 9-11",
              "0.5",
              "about 5%"
            ],
            [
              "Lab",
              "Hard mode, floors 9-11",
              "0.5",
              "about 3%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "It is very slow: kite it around the room.",
          "The stomp is a ring with a small hole in the middle, so step away rather than relying on the hole.",
          "Use each reel after a broken bar for a damage burst."
        ]
      }
    ],
    "tags": [
      "Lab",
      "Bruiser"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "enemies",
        "slug": "machine-sword"
      },
      {
        "category": "enemies",
        "slug": "rust-drone"
      },
      {
        "category": "dungeons",
        "slug": "the-lab"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      }
    ]
  },
  {
    "slug": "necro-acolyte",
    "category": "enemies",
    "name": "Necro Acolyte",
    "subtitle": "Skeleton-summoning necromancer",
    "summary": "A purple-robed necromancer who keeps its distance and raises skeleton archers to fight for it. It appears in Hard-mode pools.",
    "image": {
      "src": "/ld/wiki/enemies/necro-acolyte.png",
      "alt": "Necro Acolyte sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "[[dungeons/the-castle|Castle]], [[dungeons/the-lab|Lab]] (Hard mode)"
      },
      {
        "label": "Role",
        "value": "Summoner"
      },
      {
        "label": "Health",
        "value": "About 15 at floor 1 (1 health bar); about 29 on floor 1 in Hard mode"
      },
      {
        "label": "Damage",
        "value": "None (its minions shoot arrows)"
      },
      {
        "label": "Speed",
        "value": "0.4 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Necro Acolyte is the game's only Summoner. Every 6 seconds it conjures one [[enemies/skeleton-minion|Skeleton Minion]] near itself, up to two alive at the same time. A marker appears and the minion spawns 0.4 s later.",
          "It keeps at least 0.7 units from you and backs off when you approach."
        ]
      },
      {
        "heading": "Attacks and telegraphs",
        "table": {
          "columns": [
            "Ability",
            "What it does",
            "Numbers"
          ],
          "rows": [
            [
              "Summon Minion",
              "Spawns a [[enemies/skeleton-minion]] within 0.8 units of itself; at most 2 alive; cooldown 6 s. The first summon comes after about 2 s.",
              "1 minion per cast"
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/enemies/necro-acolyte/attack.gif",
            "alt": "Necro Acolyte attacking the hero",
            "caption": "Necro Acolyte in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Where it appears",
        "paragraphs": [
          "Each room draws a few monster types from its biome's pool by weight. This monster's weight and share of the pool:"
        ],
        "table": {
          "columns": [
            "Biome",
            "Mode and floors",
            "Pool weight",
            "Share of pool weight"
          ],
          "rows": [
            [
              "[[dungeons/the-castle|Castle]]",
              "[[mechanics/difficulty-modes|Hard mode]], floors 1-3",
              "1",
              "about 10%"
            ],
            [
              "[[dungeons/the-lab|Lab]]",
              "Hard mode, floors 9-11",
              "1",
              "about 7%"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kill the Acolyte first: the minions are weak, but it refills them.",
          "Break line of sight so the minion arrows cannot reach you.",
          "Do not chase it into a pack."
        ]
      }
    ],
    "tags": [
      "Castle",
      "Lab",
      "Summoner"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "skeleton-minion"
      },
      {
        "category": "enemies",
        "slug": "enchanter"
      },
      {
        "category": "enemies",
        "slug": "ghost-wizard"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-castle"
      }
    ]
  },
  {
    "slug": "skeleton-minion",
    "category": "enemies",
    "name": "Skeleton Minion",
    "subtitle": "Summoned skeleton archer",
    "summary": "A small skeleton archer that the Necro Acolyte summons. It is never drawn from a room pool.",
    "image": {
      "src": "/ld/wiki/enemies/skeleton-minion.png",
      "alt": "Skeleton Minion sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Biome",
        "value": "Hard mode [[dungeons/the-castle|Castle]] and [[dungeons/the-lab|Lab]] (summoned by the Necro Acolyte)"
      },
      {
        "label": "Role",
        "value": "Summoned archer"
      },
      {
        "label": "Health",
        "value": "About 5 at floor 1 (1 health bar)"
      },
      {
        "label": "Arrow damage",
        "value": "About 2.4 per arrow at floor 1"
      },
      {
        "label": "Speed",
        "value": "0.6 units/s"
      },
      {
        "label": "Drops",
        "value": "Standard kill drops (see the [[enemies/bestiary-overview|Bestiary]])"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Skeleton Minion is a tiny, fragile archer. It shoots a single arrow with a 0.30 s tell and a lane on the floor, with a 2 s delay between shots, and the arrow leads your movement.",
          "A [[enemies/necro-acolyte|Necro Acolyte]] keeps up to two of them alive at once. Each one is a minor threat, but the pair adds a steady stream of arrows that is easy to ignore until it adds up."
        ],
        "media": [
          {
            "src": "/ld/wiki/enemies/skeleton-minion/attack.gif",
            "alt": "Skeleton Minion attacking the hero",
            "caption": "Skeleton Minion in a fight (in-game footage).",
            "pixelated": false,
            "width": 288,
            "height": 216
          }
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kill the [[enemies/necro-acolyte]] first; the minions return as long as it lives.",
          "Minions die to a single hit, so area weapons are a cheap answer.",
          "Their arrows are slow (2.2 units/s), so side-stepping works."
        ]
      }
    ],
    "tags": [
      "Castle",
      "Lab",
      "Summoned"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "necro-acolyte"
      },
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "dungeons",
        "slug": "the-castle"
      },
      {
        "category": "dungeons",
        "slug": "the-lab"
      }
    ]
  }
];
