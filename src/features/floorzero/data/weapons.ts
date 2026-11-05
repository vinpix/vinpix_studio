import type { WikiArticle } from "../types";

// Generated from the game data and hand-edited prose. 138 player weapons: guns, melee and devices.
export const weapons: WikiArticle[] = [
  {
    "slug": "duty-pistol",
    "category": "weapons",
    "name": "Duty Pistol",
    "subtitle": "Common sidearm",
    "summary": "The Duty Pistol is the standard-issue sidearm every survivor can fall back on. It never spends energy, so it keeps working after every other gun has run dry.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite (no energy)"
      },
      {
        "label": "Damage",
        "value": "18"
      },
      {
        "label": "Fire rate",
        "value": "4.5 per second"
      },
      {
        "label": "Magazine",
        "value": "12"
      },
      {
        "label": "Reload time",
        "value": "0.7 s"
      },
      {
        "label": "Range",
        "value": "32 tiles"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Duty Pistol** is a common sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is white. It is offered on the Loadout screen as the standard fallback gun, but it never turns up as a floor drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A plain hitscan pistol: one round per pull, fired automatically while the trigger is held, at 4.5 shots per second with a slight 1.6 degree jitter and a long 32 tile reach. It is one of only four guns on the free list, so the shared energy bar is never touched; the 12-round magazine reloads in 0.7 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Duty Pistol plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Akimbo** (A)",
                  "A second pistol fires along at 40% damage.",
                  "Fires 8% slower."
                ],
                [
                  "**Run and Gun** (B)",
                  "+30% fire rate while running.",
                  "No bonus while standing still."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Service Stripes**: Every 10 kills earn a stripe worth +5% damage, up to 6 stripes, and a fresh foe takes a little more."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Treat it as your insurance policy: when a heavier gun empties the energy bar, switch to the pistol and keep the lamp lit. Both level-2 branches suit it, Akimbo for flat damage and Run and Gun if you fight on the move."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "nail-gun"
      },
      {
        "category": "weapons",
        "slug": "plumb-bob"
      },
      {
        "category": "weapons",
        "slug": "squirt-gun"
      },
      {
        "category": "weapons",
        "slug": "final-demand"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/duty-pistol.png",
      "alt": "Duty Pistol weapon sprite",
      "pixelated": true,
      "width": 88,
      "height": 56
    }
  },
  {
    "slug": "pump-shotgun",
    "category": "weapons",
    "name": "Pump Shotgun",
    "subtitle": "Common shotgun",
    "summary": "The Pump Shotgun is the classic close-range weapon of the Backrooms: eight pellets, heavy knockback and a shell-by-shell reload. It is one of the starting guns on the Loadout screen.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "9 x 8 pellets"
      },
      {
        "label": "Fire rate",
        "value": "1.2 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "1.56 s"
      },
      {
        "label": "Range",
        "value": "18 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.15 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      },
      {
        "label": "Evolves into",
        "value": "Furnace Gun"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pump Shotgun** is a common shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is white. It is one of the starting guns offered on the Loadout screen, and it can also be found as a drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each blast fires eight hitscan pellets of 9 damage in a spread, at about 1.2 shots per second with an 18 tile range. The six-shell magazine is reloaded one shell at a time (1.56 seconds for a full load); a shot costs 2.15 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pump Shotgun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Breaching Round** (A)",
                  "9+ pellets on one foe deal x1.5 damage.",
                  "Close and centred. Not on bosses."
                ],
                [
                  "**Buckshot Blanket** (B)",
                  "+2 pellets. 25% wider: covers more foes.",
                  "Spreads thin at long range."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Fresh Shells**: Finish a reload and for 4 s every blast that hits ends in a pop that hurts the foes next to the last one hit."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Pump Shotgun with a chosen branch can evolve into the **Furnace Gun** at a Workbench if you hold the [[anomalies/boiler-flame]] anomaly, for 120 scrap. Every blast leaves a row of flames that burn for 2.5 seconds. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Get close: every pellet that connects counts and a point-blank blast on a single zombie is devastating. Breaching Round pays 1.5 times damage when nine or more pellets hit one foe, while Buckshot Blanket trades that for wider coverage of a crowd."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sawed-off"
      },
      {
        "category": "weapons",
        "slug": "party-popper"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      },
      {
        "category": "anomalies",
        "slug": "boiler-flame"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/pump-shotgun.png",
      "alt": "Pump Shotgun weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 49
    }
  },
  {
    "slug": "grenade-launcher",
    "category": "weapons",
    "name": "Grenade Launcher",
    "subtitle": "Good explosive launcher",
    "summary": "The Grenade Launcher lobs bouncing 40mm grenades that explode on a short fuse. It is a starting weapon, and its blasts are strong enough to launch you if you stand too close.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "90 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.15 s"
      },
      {
        "label": "Magazine",
        "value": "4"
      },
      {
        "label": "Reload time",
        "value": "1.3 s"
      },
      {
        "label": "Blast radius",
        "value": "2.8 tiles"
      },
      {
        "label": "Energy cost",
        "value": "3.45 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      },
      {
        "label": "Evolves into",
        "value": "Loudspeaker"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Grenade Launcher** is a good explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is green. It is one of the starting guns offered on the Loadout screen, and it can also be found as a drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each grenade is an arcing projectile that bounces and detonates on contact or when its 1.6 second fuse runs out, dealing 90 explosive damage in a 2.8 tile radius. It fires every 1.15 seconds from a four-grenade magazine (1.3 second reload) for 3.45 energy a shot. Blasts also hurt the shooter and can launch them, which makes blast-jumping possible."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Grenade Launcher plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Bouncing Betty** (A)",
                  "Terrain bounces pop a small blast. +1 bounce.",
                  "Lands farther before the big blast."
                ],
                [
                  "**Flat Fast Shell** (B)",
                  "40% faster and flatter shell. Blast damage +15%.",
                  "Flat arc: hard to lob over cover."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Cluster Mag**: Fire 4 shells without a 2 s pause and the last bursts into bomblets, and shells fired in mid-air hit harder."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Grenade Launcher with a chosen branch can evolve into the **Loudspeaker** at a Workbench if you hold the [[anomalies/heavy-hitter]] anomaly, for 120 scrap. Blasts send out a ring that pushes and stuns for 0.6 seconds, after which foes are immune to the ring for 2.5 seconds. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Bounce it around corners to hit zombies behind cover, and keep your distance from your own blast unless you mean to jump."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sticky-gas-can"
      },
      {
        "category": "weapons",
        "slug": "jack-in-the-box"
      },
      {
        "category": "weapons",
        "slug": "tailpipe"
      },
      {
        "category": "weapons",
        "slug": "pool-ball"
      },
      {
        "category": "anomalies",
        "slug": "heavy-hitter"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/grenade-launcher.png",
      "alt": "Grenade Launcher weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 63
    }
  },
  {
    "slug": "nail-gun",
    "category": "weapons",
    "name": "Nail Gun",
    "subtitle": "Common sidearm",
    "summary": "The Nail Gun is a common sidearm that nails zombies in place when they stand near a wall. It is one of the starting guns offered on the Loadout screen.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "20"
      },
      {
        "label": "Fire rate",
        "value": "3.6 per second"
      },
      {
        "label": "Magazine",
        "value": "16"
      },
      {
        "label": "Reload time",
        "value": "1.1 s"
      },
      {
        "label": "Range",
        "value": "26 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.75 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      },
      {
        "label": "Evolves into",
        "value": "Coffin Nailer"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Nail Gun** is a common sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is white. It is one of the starting guns offered on the Loadout screen, and it can also be found as a drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each shot is a hitscan nail for 20 damage at 3.6 shots per second. If the target is within 0.7 tiles of a wall the nail applies the Pin status, which stuns it and zeroes its velocity against the wall; away from walls it is just a hit. The magazine holds 16 nails and reloads in 1.1 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Nail Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Nailed Down** (A)",
                  "Nails into a pinned zombie deal x1.6.",
                  "Needs a wall beside the zombie."
                ],
                [
                  "**Stud Finder** (B)",
                  "Nails pass 2 walls and chew them 1.5x faster.",
                  "Also chews the walls near you."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Clincher**: Every 3 nails into the same foe the last is driven home for a heavy blow, and the count resets after 2 s."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Nail Gun with a chosen branch can evolve into the **Coffin Nailer** at a Workbench if you hold the [[anomalies/rusty-nails]] anomaly, for 120 scrap. Foes pinned to a wall become spikes that hurt their neighbours. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fight with your back to a corridor wall and shoot zombies as they press against the opposite side: a pinned zombie is a free target. Nailed Down rewards exactly that habit, while Stud Finder turns the gun into a tool for opening walls."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "duty-pistol"
      },
      {
        "category": "weapons",
        "slug": "plumb-bob"
      },
      {
        "category": "weapons",
        "slug": "squirt-gun"
      },
      {
        "category": "weapons",
        "slug": "final-demand"
      },
      {
        "category": "anomalies",
        "slug": "rusty-nails"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/nail-gun.png",
      "alt": "Nail Gun weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 80
    }
  },
  {
    "slug": "flare-gun",
    "category": "weapons",
    "name": "Flare Gun",
    "subtitle": "Good sidearm",
    "summary": "The Flare Gun lobs a burning flare that lights up the corridor and sets whatever it hits on fire. It doubles as a lamp when the lights are out.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "22"
      },
      {
        "label": "Fire rate",
        "value": "1.1 per second"
      },
      {
        "label": "Magazine",
        "value": "3"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Energy cost",
        "value": "2.7 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Flare Gun** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each flare is an arcing projectile that deals 22 damage on impact and applies Burn, 6 damage per second for 3 seconds. Where it lands it keeps lighting the area for 10 seconds. The three-flare magazine reloads in 0.8 seconds, and every shot costs 2.7 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Flare Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Road Flare** (A)",
                  "Flare burns 1.8x longer and 1.5x wider.",
                  "Burn and hit damage -15%."
                ],
                [
                  "**Campfire** (B)",
                  "A direct hit pulls foes within 2.2 tiles in.",
                  "Only a direct hit pulls."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Wildfire**: A foe your flare hits is branded for 7 s: if it dies in that time, it leaves a bonfire where it fell."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Shoot one ahead into a dark room before you enter: it reveals what is waiting and burns it at the same time. Because shots are expensive and slow, save them for groups gathered in a doorway."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-planes"
      },
      {
        "category": "weapons",
        "slug": "moth-jar"
      },
      {
        "category": "weapons",
        "slug": "fridge-magnet"
      },
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/flare-gun.png",
      "alt": "Flare Gun weapon sprite",
      "pixelated": true,
      "width": 120,
      "height": 80
    }
  },
  {
    "slug": "jammed-revolver",
    "category": "weapons",
    "name": "Jammed Revolver",
    "subtitle": "Good sidearm",
    "summary": "The Jammed Revolver is a slow, heavy-hitting sidearm whose cylinder always delivers a critical on the sixth round.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "34"
      },
      {
        "label": "Fire rate",
        "value": "2.4 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "0.75 s"
      },
      {
        "label": "Range",
        "value": "30 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.25 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Jammed Revolver** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Single hitscan rounds for 34 damage at 2.4 shots per second with a six-round cylinder (0.75 second reload). Every 6th round is a guaranteed critical hit worth triple damage, so the full cylinder is the unit of play."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Jammed Revolver plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Short Cylinder** (A)",
                  "Every 3rd shot crits for x3.5.",
                  "Fires 25% slower while moving."
                ],
                [
                  "**Fan Fire** (B)",
                  "Every crit fans 2 rays at 20% of the crit.",
                  "Fan rays miss beyond 3 tiles."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Thunderclap**: A crit sends a shockwave from the target, once per 1 s, that hurts, shoves and stuns, but bosses only take damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Count your shots and save the guaranteed critical for a tough target instead of spending it on a runner. Short Cylinder speeds the crit up to every third shot, at the price of a slower rate while moving."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paint-marker"
      },
      {
        "category": "weapons",
        "slug": "caulk-gun"
      },
      {
        "category": "weapons",
        "slug": "one-arm-bandit"
      },
      {
        "category": "weapons",
        "slug": "duty-pistol"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/jammed-revolver.png",
      "alt": "Jammed Revolver weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 88
    }
  },
  {
    "slug": "paint-marker",
    "category": "weapons",
    "name": "Paint Marker",
    "subtitle": "Good sidearm",
    "summary": "The Paint Marker is a fast, light sidearm that does little damage itself but paints zombies so that everyone's weapons hurt them more.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "10"
      },
      {
        "label": "Fire rate",
        "value": "6.2 per second"
      },
      {
        "label": "Magazine",
        "value": "24"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Range",
        "value": "24 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Paint Marker** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 10 damage hitscan rounds at 6.25 shots per second. Each hit applies Mark for 4 seconds: a marked zombie takes 30 percent more damage from every source, your teammates' guns included. A 24-round magazine reloads in one second."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Paint Marker plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Splatter** (A)",
                  "A hit also paints zombies within 1.8 tiles.",
                  "Damage -3%."
                ],
                [
                  "**Spotter** (B)",
                  "A kill you hit stacks +6% rate to 5. Fade 3 s.",
                  "Base rate -6%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Prime Target**: The biggest threat you hit is the prime target and takes +20% from this gun, and a boss is always marked first."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Pair it with a heavy slow weapon, such as a rifle or a launcher, and mark the target first. In [[mechanics/co-op-multiplayer|co-op]] it is a support gun that raises the whole squad's damage."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      },
      {
        "category": "weapons",
        "slug": "caulk-gun"
      },
      {
        "category": "weapons",
        "slug": "one-arm-bandit"
      },
      {
        "category": "weapons",
        "slug": "duty-pistol"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/paint-marker.png",
      "alt": "Paint Marker weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 96
    }
  },
  {
    "slug": "price-tagger",
    "category": "weapons",
    "name": "Price Tagger",
    "subtitle": "Rare sidearm",
    "summary": "The Price Tagger sticks a tag on zombies that turns their corpses into extra [[items/scrap|scrap]]. A rare sidearm for players who want to snowball their economy.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "14"
      },
      {
        "label": "Fire rate",
        "value": "5.6 per second"
      },
      {
        "label": "Magazine",
        "value": "20"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Range",
        "value": "26 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.65 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Price Tagger** is a rare sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 14 damage hitscan shots at 5.5 shots per second. Each hit applies the Tag status for 6 seconds, and a tagged zombie that dies drops additional [[items/scrap|scrap]]. A 20-round magazine reloads in one second."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Price Tagger plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Cash Back** (A)",
                  "+15% crit. Crits on tagged foes heal 0.75 HP.",
                  "Heals only after a foe is tagged."
                ],
                [
                  "**Bundle Deal** (B)",
                  "x1.8 damage to foes with 2 or more statuses.",
                  "Needs a status besides the tag."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Markdown**: The last foe each shot reaches is marked down: a shockwave shoves and stuns the crowd around it, about once a second."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Tag the zombies that are about to die anyway, and prefer it in the early floors when [[items/scrap|scrap]] buys the most upgrades. Bundle Deal rewards stacking other statuses on top of the tag."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "twin-sidearms"
      },
      {
        "category": "weapons",
        "slug": "hot-glue-gun"
      },
      {
        "category": "weapons",
        "slug": "block-sender"
      },
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/price-tagger.png",
      "alt": "Price Tagger weapon sprite",
      "pixelated": true,
      "width": 112,
      "height": 88
    }
  },
  {
    "slug": "twin-sidearms",
    "category": "weapons",
    "name": "Twin Sidearms",
    "subtitle": "Rare sidearm",
    "summary": "Twin Sidearms is a rapid pair of pistols that fire at two different targets at once.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8"
      },
      {
        "label": "Fire rate",
        "value": "6.7 per second"
      },
      {
        "label": "Magazine",
        "value": "24"
      },
      {
        "label": "Reload time",
        "value": "0.9 s"
      },
      {
        "label": "Range",
        "value": "28 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.55 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Twin Sidearms** is a rare sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each trigger pull sends one ray at your aim and a second ray that auto-aims at another enemy in range; with no second target, the extra ray fires in parallel about 0.3 tiles lower. Each ray deals 8 damage at 6.7 pulls per second, so damage scales well against crowds. The 24-round magazine reloads in 0.9 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Twin Sidearms plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Free Hand** (A)",
                  "Second gun: hunts any direction. Damage x1.4.",
                  "Damage -10% while moving."
                ],
                [
                  "**Crosshairs** (B)",
                  "Both guns at one foe. Second gun damage x1.6.",
                  "Never splits fire across a crowd."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Quad Fire**: Every 8 kills open a 2.5 s window: your shots fan out extra rays, a few times a second."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "It shines in a crowded corridor where there is always a second target to find. Against a single big enemy the second ray only adds a small parallel stream, so switch to Crosshairs if you meet many bosses."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "price-tagger"
      },
      {
        "category": "weapons",
        "slug": "hot-glue-gun"
      },
      {
        "category": "weapons",
        "slug": "block-sender"
      },
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/twin-sidearms.png",
      "alt": "Twin Sidearms weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 88
    }
  },
  {
    "slug": "stapler-smg",
    "category": "weapons",
    "name": "Stapler SMG",
    "subtitle": "Common automatic weapon",
    "summary": "The Stapler SMG is the cheapest automatic weapon in the arsenal: very fast, very inaccurate and almost free to fire. It is one of the starting guns on the Loadout screen.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8"
      },
      {
        "label": "Fire rate",
        "value": "10.9 per second"
      },
      {
        "label": "Magazine",
        "value": "40"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Range",
        "value": "22 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.25 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      },
      {
        "label": "Evolves into",
        "value": "Surge Stapler"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Stapler SMG** is a common automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is white. It is one of the starting guns offered on the Loadout screen, and it can also be found as a drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 8 damage staples at 10.9 rounds per second with a short 22 tile reach and a deep 40-round magazine (1 second reload). Each round costs only 0.25 energy, so a full bar lasts a long time."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Stapler SMG plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Paper Jam** (A)",
                  "Every 3rd hit jams a foe: 40% slow +20% damage.",
                  "Bosses are never jammed."
                ],
                [
                  "**Fresh Sheet** (B)",
                  "First hit on each new foe deals x2.",
                  "Foes hit within 1.5 s get no bonus."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Paper Chain**: Staples brand up to 4 foes, and a branded foe pops when it dies."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Stapler SMG with a chosen branch can evolve into the **Surge Stapler** at a Workbench if you hold the [[anomalies/trigger-happy]] anomaly, for 120 scrap. Every 10th staple arcs lightning. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Close the distance and hold the trigger: the damage comes from volume, not precision. Paper Jam is the pick when you need a slow on whatever you are focusing, and Fresh Sheet rewards switching targets constantly."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "rivet-gun"
      },
      {
        "category": "weapons",
        "slug": "take-a-number"
      },
      {
        "category": "weapons",
        "slug": "thumbtack-gun"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/stapler-smg.png",
      "alt": "Stapler SMG weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 80
    }
  },
  {
    "slug": "patrol-rifle",
    "category": "weapons",
    "name": "Patrol Rifle",
    "subtitle": "Good automatic weapon",
    "summary": "The Patrol Rifle fires tidy three-round bursts and is the accurate, mid-range option of the automatic family.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "16"
      },
      {
        "label": "Fire rate",
        "value": "1 burst of 3 rounds every 0.45 s"
      },
      {
        "label": "Magazine",
        "value": "30"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "34 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.45 per round"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Patrol Rifle** is a good automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each trigger pull fires a burst of three 16-damage rounds about 0.06 seconds apart, at one burst roughly every 0.45 seconds. It has a 34 tile range and a 30-round magazine (1.2 second reload); each round is paid for separately at 0.45 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Patrol Rifle plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Tight Group** (A)",
                  "Each 3-hit burst stacks +5% damage. Max 5.",
                  "Any miss: no stack. Fades in 2 s."
                ],
                [
                  "**Parting Shot** (B)",
                  "Each burst ends in a 50% blast: 1.2 tiles.",
                  "The last round must hit."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **On Patrol**: Walk to load the rifle: a full load makes the next burst hit +70% harder and pierce, and moving hits a bit harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire bursts rather than holding down the trigger and let each burst land on the same target. Tight Group builds damage if you keep hitting, so avoid missing."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "rivet-gun"
      },
      {
        "category": "weapons",
        "slug": "take-a-number"
      },
      {
        "category": "weapons",
        "slug": "stapler-smg"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/patrol-rifle.png",
      "alt": "Patrol Rifle weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 60
    }
  },
  {
    "slug": "warehouse-rifle",
    "category": "weapons",
    "name": "Warehouse Rifle",
    "subtitle": "Rare automatic weapon",
    "summary": "The Warehouse Rifle is a heavy auto rifle that hits hard and shoves the shooter backwards with every round.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "23"
      },
      {
        "label": "Fire rate",
        "value": "5.9 per second"
      },
      {
        "label": "Magazine",
        "value": "24"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "32 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.6 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Warehouse Rifle** is a rare automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 23 damage hitscan rifle firing about 5.9 rounds per second to 32 tiles. Each shot kicks you back, which makes it awkward to use on a ledge. The 24-round magazine reloads in 1.2 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Warehouse Rifle plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Bipod Down** (A)",
                  "Kickback -70%. Stand still 0.5 s: +30% damage.",
                  "No bonus while you steer."
                ],
                [
                  "**Full Pallet** (B)",
                  "+30% damage if 3 foes bunch within 1.5 tiles.",
                  "A lone foe takes no bonus."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Slug Shock**: After every 10 shots a slug lands with a shockwave that shoves and stuns nearby foes, bosses just take the hit."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Plant your feet before you open up: Bipod Down cuts the kickback by 70 percent and rewards standing still. Full Pallet is the pick for crowded rooms."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      },
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "rivet-gun"
      },
      {
        "category": "weapons",
        "slug": "industrial-printer"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/warehouse-rifle.png",
      "alt": "Warehouse Rifle weapon sprite",
      "pixelated": true,
      "width": 135,
      "height": 50
    }
  },
  {
    "slug": "rivet-gun",
    "category": "weapons",
    "name": "Rivet Gun",
    "subtitle": "Good automatic weapon",
    "summary": "The Rivet Gun drives rivets into walls that become temporary one-way steps you can climb.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "20"
      },
      {
        "label": "Fire rate",
        "value": "3.3 per second"
      },
      {
        "label": "Magazine",
        "value": "15"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "20 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.9 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Rivet Gun** is a good automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 20 damage hitscan rivets at 3.3 rounds per second. A rivet that lands in a wall face leaves a one-way platform tile in the air cell in front of it for 6 seconds, so you can shoot a staircase and climb it. A 15-round magazine reloads in 1.2 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Rivet Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Stepladder** (A)",
                  "Foes 1.2 tiles below you take +80%. Steps 9 s.",
                  "Needs height: a climb or a jump."
                ],
                [
                  "**Drive Home** (B)",
                  "A wall rivet stacks +7% rate: max 5 for 4 s.",
                  "Base rate -6%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Hot Rivets**: A rivet that bites a wall heats your rounds for 5 s: every hit sets the foe and those beside it ablaze."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it to reach ledges that the level gives you no way up to: shoot, climb, shoot again. In a fight, firing the stairs above your head also gives you the high ground. Stepladder makes the steps last 9 seconds."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "take-a-number"
      },
      {
        "category": "weapons",
        "slug": "stapler-smg"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/rivet-gun.png",
      "alt": "Rivet Gun weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "pneumatic-tube",
    "category": "weapons",
    "name": "Pneumatic Tube",
    "subtitle": "Rare automatic weapon",
    "summary": "The Pneumatic Tube is a fast-firing rare auto that overheats; vent it at the right moment for a burst of speed.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "14"
      },
      {
        "label": "Fire rate",
        "value": "10 per second"
      },
      {
        "label": "Range",
        "value": "24 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.35 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pneumatic Tube** is a rare automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 14 damage rounds at 10 per second. Every shot adds heat, and at full heat the gun locks for 1.6 seconds. If you release the trigger while the heat is between 70 and 95 percent, the tube vents and fires 1.5 times faster for 2 seconds. Each shot costs 0.35 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pneumatic Tube plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Burst Pipe** (A)",
                  "Overheat steam ring 40% + push. Lock 1.1 s.",
                  "Heat +10% per shot."
                ],
                [
                  "**Bleed Off** (B)",
                  "Perfect vent: +8% damage. Max 4. Boost x1.9.",
                  "Overheat lock 1.9 s instead of 1.6 s."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Relief Valve**: When an enemy hits you the tube blows off steam, a ring that shoves and stuns nearby foes, ready again after 2 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Learn the rhythm: stop firing just before the gauge locks and you get a faster burst. Bleed Off stacks a damage bonus for perfect vents."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "rivet-gun"
      },
      {
        "category": "weapons",
        "slug": "industrial-printer"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/pneumatic-tube.png",
      "alt": "Pneumatic Tube weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 104
    }
  },
  {
    "slug": "industrial-printer",
    "category": "weapons",
    "name": "Industrial Printer",
    "subtitle": "Epic automatic weapon",
    "summary": "The Industrial Printer is a paper-spitting machine gun that fires faster the longer you hold the trigger, at the price of walking slowly.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "11"
      },
      {
        "label": "Fire rate",
        "value": "16.7 per second"
      },
      {
        "label": "Range",
        "value": "30 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.25 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Evolves into",
        "value": "Deadline Printer"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Industrial Printer** is an epic automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 11 damage rounds. The interval starts at more than twice the base value and eases to 0.06 seconds (about 16.7 shots a second) over 2 seconds of holding; while firing you move at 70 percent speed. Each shot costs 0.25 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Industrial Printer plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Bulk Run** (A)",
                  "Full spin in 1.2 s. Start 43% faster.",
                  "Walk at 50% while firing."
                ],
                [
                  "**Full Bleed** (B)",
                  "At full spin every hit deals x1.35.",
                  "No bonus before full spin."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Copy Run**: Every 9 hits a fan of paper copies fires along your aim, each for part of the hit's damage."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Industrial Printer with a chosen branch can evolve into the **Deadline Printer** at a Workbench if you hold the [[anomalies/overtime]] anomaly, for 120 scrap. Fires up to 60% faster as your health drops, at maximum at 20% health. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Anchor yourself in a long corridor and keep the trigger down. Bulk Run shortens the spin-up if you fire in bursts; Full Bleed pays off if you can hold the fire for a long time."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "the-chisel"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      },
      {
        "category": "weapons",
        "slug": "shredder-minigun"
      },
      {
        "category": "anomalies",
        "slug": "overtime"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/industrial-printer.png",
      "alt": "Industrial Printer weapon sprite",
      "pixelated": true,
      "width": 156,
      "height": 84
    }
  },
  {
    "slug": "the-chisel",
    "category": "weapons",
    "name": "The Chisel",
    "subtitle": "Epic automatic weapon",
    "summary": "The Chisel is an armour-piercing rifle whose rounds bore through three wall tiles, letting you hit what hides behind them.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "33"
      },
      {
        "label": "Fire rate",
        "value": "2.9 per second"
      },
      {
        "label": "Magazine",
        "value": "12"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "36 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **The Chisel** is an epic automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 33 damage rounds at 2.9 shots per second out to 36 tiles. Each round passes through 1 enemy and 3 wall tiles (damaging them on the way). A 12-round magazine reloads in 1.2 seconds, and each shot costs 1.5 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how The Chisel plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Peephole** (A)",
                  "Rays that bore a wall hit x1.6.",
                  "No bonus in the open."
                ],
                [
                  "**Spall** (B)",
                  "A wall bore sprays 2 splinters at 60%.",
                  "No spray without a wall."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **The Hunt**: The first foe you hit is hunted and takes +20% from this gun, even through walls, and its death marks nearby foes."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Shoot zombies through rooms' dividing walls before they know you are there. Peephole boosts the damage of rounds that bore a wall; Spall sprays splinters at the far side."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "industrial-printer"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      },
      {
        "category": "weapons",
        "slug": "shredder-minigun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/the-chisel.png",
      "alt": "The Chisel weapon sprite",
      "pixelated": true,
      "width": 135,
      "height": 50
    }
  },
  {
    "slug": "shredder-minigun",
    "category": "weapons",
    "name": "Shredder Minigun",
    "subtitle": "Legendary automatic weapon",
    "summary": "The Shredder Minigun is the legendary automatic: it spins up, then shreds zombies and thin walls alike.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "10.8"
      },
      {
        "label": "Fire rate",
        "value": "22.2 per second"
      },
      {
        "label": "Range",
        "value": "26 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.25 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Shredder Minigun** is a legendary automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Needs 0.6 seconds of wind-up before the first round, then fires 10.8 damage rounds every 0.045 seconds (about 22 per second). Moving slows you to 75 percent while firing. Each round costs only 0.25 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Shredder Minigun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Freewheel** (A)",
                  "Spin fades 50% slower after release.",
                  "First wind-up 0.9 s instead of 0.6 s."
                ],
                [
                  "**Last Belt** (B)",
                  "Wind-up 30% faster. Your HP under 25%: x1.4.",
                  "No bonus above 25% HP."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Rampage**: Each kill within 2 s of the last adds +2% damage, up to +20%, and the chain ends when the timer runs out."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it from a prepared position: the wind-up makes it poor for reacting. Freewheel keeps the barrels spinning after you stop, which suits stop-and-go fights."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "industrial-printer"
      },
      {
        "category": "weapons",
        "slug": "the-chisel"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/shredder-minigun.png",
      "alt": "Shredder Minigun weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 98
    }
  },
  {
    "slug": "sawed-off",
    "category": "weapons",
    "name": "Sawed-Off",
    "subtitle": "Good shotgun",
    "summary": "The Sawed-Off fires both barrels back to back, then needs a longer reload. Shoot the floor under your feet and the recoil will launch you.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "9 x 9 pellets"
      },
      {
        "label": "Fire rate",
        "value": "2 shots, then a reload"
      },
      {
        "label": "Magazine",
        "value": "2"
      },
      {
        "label": "Reload time",
        "value": "1.03 s"
      },
      {
        "label": "Range",
        "value": "12 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.2 per barrel"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Sawed-Off** is a good shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Two quick blasts, 0.22 seconds apart, each of nine pellets for 9 damage over a short 12 tile reach, then a reload of about a second for the two-shell magazine. Each barrel costs 2.2 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Sawed-Off plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Double Boom** (A)",
                  "Fires both barrels at once: x1.25 damage.",
                  "Reload 25% longer."
                ],
                [
                  "**Sky Hop** (B)",
                  "x2 damage while airborne. Recoil x1.5.",
                  "No bonus on the ground. Kicks harder."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Close Quarters**: When 6 or more pellets hit one foe it pops and hurts the foes beside it, but never a boss."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use the recoil for mobility: aim downward on a jump to gain height. Sky Hop doubles damage while airborne, so fighting from above works well. Double Boom empties both barrels at once for 25 percent more damage."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "party-popper"
      },
      {
        "category": "weapons",
        "slug": "pump-shotgun"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/sawed-off.png",
      "alt": "Sawed-Off weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 64
    }
  },
  {
    "slug": "leaf-blower",
    "category": "weapons",
    "name": "Leaf Blower",
    "subtitle": "Rare shotgun",
    "summary": "The Leaf Blower is a short-range automatic blaster that also vacuums pickups toward you while you fire.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "5 x 5 pellets"
      },
      {
        "label": "Fire rate",
        "value": "5.4 per second"
      },
      {
        "label": "Range",
        "value": "7 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.65 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Leaf Blower** is a rare shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires five pellets of 5 damage about 5.4 times a second, but only to 7 tiles. Every shot pulls nearby pickups in a cone toward the shooter. It costs only 0.65 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Leaf Blower plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Gale Force** (A)",
                  "Every 5th hit: 50% gale fading out. 1 s rest.",
                  "Ring reaches 3 tiles. Loot cone +20%."
                ],
                [
                  "**Tidy Up** (B)",
                  "Loot pull 14 tiles. x1.2 damage within 2 tiles.",
                  "No gain beyond 2 tiles."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Full Throttle**: The longer you hold the trigger the stronger the gale: damage climbs to +22% and fades after 0.6 s of rest."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire it across a room you have just cleared to reel in loot without walking over to it. Tidy Up stretches the loot pull to 14 tiles."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "salt-gun"
      },
      {
        "category": "weapons",
        "slug": "sawed-off"
      },
      {
        "category": "weapons",
        "slug": "thousand-shards"
      },
      {
        "category": "weapons",
        "slug": "hand-heater"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/leaf-blower.png",
      "alt": "Leaf Blower weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "salt-gun",
    "category": "weapons",
    "name": "Salt Gun",
    "subtitle": "Rare shotgun",
    "summary": "The Salt Gun fires rock salt that slows the living and burns the unreal, dealing double damage to entities.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8 x 7 pellets"
      },
      {
        "label": "Fire rate",
        "value": "1.4 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "1.38 s"
      },
      {
        "label": "Range",
        "value": "16 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Evolves into",
        "value": "Purge Gun"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Salt Gun** is a rare shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Seven pellets of 8 damage per shot, 1.4 shots per second, 16 tile range. Each pellet has a 50 percent chance to slow its target by 40 percent for 2 seconds. Against entities the damage is doubled. Six-shell magazine, 1.38 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Salt Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Snow Blind** (A)",
                  "Head pellets deal x2 and stun slowed foes.",
                  "Stun 0.4 s. Once per foe every 2.9 s."
                ],
                [
                  "**Holy Ground** (B)",
                  "+15% damage. Every 6 s a 2 s ward: -30% front damage.",
                  "Ward is up 2 s of every 6 s."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Salt the Wound**: Every hit salts a foe for 5 s, and the next hit on a salted foe deals +40% and uses the salt up."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Salt Gun with a chosen branch can evolve into the **Purge Gun** at a Workbench if you hold the [[anomalies/holy-almond-water]] anomaly, for 120 scrap. Entity kills made with this gun heal the team 3 HP, and a boss kill heals up to half. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Bring it against the anomalous things that ignore normal guns."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "sawed-off"
      },
      {
        "category": "weapons",
        "slug": "thousand-shards"
      },
      {
        "category": "weapons",
        "slug": "hand-heater"
      },
      {
        "category": "anomalies",
        "slug": "holy-almond-water"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/salt-gun.png",
      "alt": "Salt Gun weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 78
    }
  },
  {
    "slug": "thousand-shards",
    "category": "weapons",
    "name": "Thousand Shards",
    "subtitle": "Epic shotgun",
    "summary": "Thousand Shards is an epic shotgun that loads glass, and its pellets ricochet off walls.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8 x 9 pellets"
      },
      {
        "label": "Fire rate",
        "value": "1.3 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "1.44 s"
      },
      {
        "label": "Range",
        "value": "16 tiles"
      },
      {
        "label": "Energy cost",
        "value": "3.25 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Thousand Shards** is an epic shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Nine pellets of 8 damage per blast; each pellet bounces off terrain twice, so a shot in a tiled room fills it with glass. Six-shell magazine, 1.44 second reload, 3.25 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Thousand Shards plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Looking Glass** (A)",
                  "+1 pellet. Bounces turn toward nearby foes.",
                  "Bounce needs a foe within 6 tiles."
                ],
                [
                  "**Storm of Glass** (B)",
                  "+2 bounces. +2 pellets.",
                  "Fires 10% slower while moving."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Breaking Glass**: Every 4th hit shatters its foe in a burst of glass that hurts the foes beside it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire toward walls in corridors and small rooms, where the bounces find targets you cannot see. Looking Glass steers bounces toward nearby foes."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hand-heater"
      },
      {
        "category": "weapons",
        "slug": "popcorn-machine"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/thousand-shards.png",
      "alt": "Thousand Shards weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 77
    }
  },
  {
    "slug": "hand-heater",
    "category": "weapons",
    "name": "Hand Heater",
    "subtitle": "Epic shotgun",
    "summary": "The Hand Heater is a shotgun whose pellets set zombies on fire.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8 x 8 pellets"
      },
      {
        "label": "Fire rate",
        "value": "1.5 per second"
      },
      {
        "label": "Magazine",
        "value": "5"
      },
      {
        "label": "Reload time",
        "value": "1.05 s"
      },
      {
        "label": "Range",
        "value": "12 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.85 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hand Heater** is an epic shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Eight pellets of 8 damage per shot, each with a 50 percent chance to apply Burn (8 damage per second for 3 seconds). Five-shell magazine with a 1.05 second reload; each shot costs 2.85 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hand Heater plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Tinderbox** (A)",
                  "Hitting a burning foe ignites foes near it.",
                  "Needs a burning foe. Water douses."
                ],
                [
                  "**Hot Coals** (B)",
                  "3rd hit: 4 s fire patch. 1 s rest. +12% damage.",
                  "Water douses it. 3 patches max."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Space Heater**: While you fire, a ring of heat sets every foe near you ablaze every 2.5 s, bosses included."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "A burning zombie keeps taking damage while it runs at you, so shoot early and back away. Water douses fire, so avoid it in flooded rooms."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "thousand-shards"
      },
      {
        "category": "weapons",
        "slug": "popcorn-machine"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/hand-heater.png",
      "alt": "Hand Heater weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 70
    }
  },
  {
    "slug": "ruler-crossbow",
    "category": "weapons",
    "name": "Ruler Crossbow",
    "subtitle": "Common precision weapon",
    "summary": "The Ruler Crossbow fires silent bolts and doubles its damage on headshots. It is a starting weapon on the Loadout screen.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "46"
      },
      {
        "label": "Fire rate",
        "value": "1.4 per second"
      },
      {
        "label": "Magazine",
        "value": "5"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Energy cost",
        "value": "1.8 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Ruler Crossbow** is a common precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is white. It is one of the starting guns offered on the Loadout screen, and it can also be found as a drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A projectile crossbow: 46 damage per bolt at about 1.4 shots per second, with a headshot multiplier of 2. Bolts are silent, so firing them does not alert nearby zombies. Five-bolt magazine, 1 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Ruler Crossbow plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Headcount** (A)",
                  "Stack +5% damage per headshot. Max 5.",
                  "Stacks fade 5 s after last headshot."
                ],
                [
                  "**Split Ends** (B)",
                  "Bolt hit: 3 splinters hit other foes at 30%.",
                  "Bolt deals 10% less damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Straight Edge**: Every 4 kills open a 3 s window in which each bolt bursts into a small blast where it lands."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Pick off zombies from range without drawing the whole floor to you. Headcount stacks bonus damage on consecutive headshots, so aim high."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pencil-bow"
      },
      {
        "category": "weapons",
        "slug": "bounced-check"
      },
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "metronome-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/ruler-crossbow.png",
      "alt": "Ruler Crossbow weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 98
    }
  },
  {
    "slug": "hunting-rifle",
    "category": "weapons",
    "name": "Hunting Rifle",
    "subtitle": "Good precision weapon",
    "summary": "The Hunting Rifle is a slow, hard-hitting hitscan rifle that sends one round through two zombies.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "55"
      },
      {
        "label": "Fire rate",
        "value": "1.2 per second"
      },
      {
        "label": "Magazine",
        "value": "5"
      },
      {
        "label": "Reload time",
        "value": "1.4 s"
      },
      {
        "label": "Range",
        "value": "40 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.55 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hunting Rifle** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "55 damage per round at about 1.2 shots per second out to 40 tiles; each round passes through two enemies. Five-round magazine, 1.4 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hunting Rifle plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Long Game** (A)",
                  "Deal +40% damage beyond 10 tiles.",
                  "No bonus under 10 tiles."
                ],
                [
                  "**Overpressure** (B)",
                  "Shockwave when a round hits 2 foes. 1 s rest.",
                  "Fires 5% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Singled Out**: The first foe your round hits is singled out: it takes +20% from this rifle until it dies or 6 s pass unhit."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Wait for a line of zombies in a corridor and fire along it. Long Game adds 40 percent damage past 10 tiles, so keep your distance."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "radar-gun"
      },
      {
        "category": "weapons",
        "slug": "the-long-memo"
      },
      {
        "category": "weapons",
        "slug": "perfect-attendance"
      },
      {
        "category": "weapons",
        "slug": "kitchen-timer"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/hunting-rifle.png",
      "alt": "Hunting Rifle weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 45
    }
  },
  {
    "slug": "the-observer",
    "category": "weapons",
    "name": "The Observer",
    "subtitle": "Rare precision weapon",
    "summary": "The Observer rewards patience: hold your aim still and its damage climbs to two and a half times.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "47"
      },
      {
        "label": "Fire rate",
        "value": "1.7 per second"
      },
      {
        "label": "Magazine",
        "value": "7"
      },
      {
        "label": "Reload time",
        "value": "1.3 s"
      },
      {
        "label": "Range",
        "value": "44 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.15 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **The Observer** is a rare precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 47 damage rifle firing every 0.6 seconds to 44 tiles. Holding a steady aim for 1.5 seconds ramps damage up to x2.5; moving or shooting resets the ramp. Headshots deal 1.5 times damage, and rounds pierce one enemy. Seven-round magazine, 1.3 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how The Observer plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Dead Stare** (A)",
                  "Aim slows foes 35%. Your shots +20%. No boss.",
                  "Only while your aim is steady."
                ],
                [
                  "**Parallax** (B)",
                  "Keep aim charge while running.",
                  "Running charges 20% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Focus Ring**: When your steady aim fills, a ring bursts around you and shoves close foes before the charged shot."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Find a corner, hold the crosshair, and fire when the ramp is full. Parallax lets you keep the charge while running."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hunting-rifle"
      },
      {
        "category": "weapons",
        "slug": "underground-cable"
      },
      {
        "category": "weapons",
        "slug": "red-tape"
      },
      {
        "category": "weapons",
        "slug": "radar-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/the-observer.png",
      "alt": "The Observer weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 60
    }
  },
  {
    "slug": "underground-cable",
    "category": "weapons",
    "name": "Underground Cable",
    "subtitle": "Epic precision weapon",
    "summary": "The Underground Cable is an epic rail gun: charge it for a second and the shot goes through every wall and zombie in line.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "90"
      },
      {
        "label": "Fire rate",
        "value": "Charge for 1 s, then fire"
      },
      {
        "label": "Range",
        "value": "48 tiles"
      },
      {
        "label": "Energy cost",
        "value": "14 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Evolves into",
        "value": "Void Cable"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Underground Cable** is an epic precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hold to charge for about a second; the released shot deals 90 damage and passes through unlimited enemies and walls out to 48 tiles. A shot is expensive at 14 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Underground Cable plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Superconductor** (A)",
                  "Keep 92% of damage per foe the rail pierces.",
                  "Rail charges 15% slower."
                ],
                [
                  "**High Current** (B)",
                  "Charge the rail 25% faster.",
                  "Battery cost +20% per shot."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Ground Fault**: The last foe on the rail is the end of the line: its hit throws sparks to the foes next to it."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Underground Cable with a chosen branch can evolve into the **Void Cable** at a Workbench if you hold the [[anomalies/night-shift]] anomaly, for 120 scrap. Leaves a 6 second dark trail in which foes take 25% more damage and ignore armour. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Line up a corridor, or fire through a wall at a room you know is full."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "red-tape"
      },
      {
        "category": "weapons",
        "slug": "the-observer"
      },
      {
        "category": "weapons",
        "slug": "reply-all"
      },
      {
        "category": "weapons",
        "slug": "long-weekend"
      },
      {
        "category": "anomalies",
        "slug": "night-shift"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/underground-cable.png",
      "alt": "Underground Cable weapon sprite",
      "pixelated": true,
      "width": 145,
      "height": 55
    }
  },
  {
    "slug": "time-clock",
    "category": "weapons",
    "name": "Time Clock",
    "subtitle": "Anomalous precision weapon",
    "summary": "The Time Clock is an anomalous rifle: its headshots stop time around the target, but every miss costs you health.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Anomalous"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "70"
      },
      {
        "label": "Fire rate",
        "value": "1.8 per second"
      },
      {
        "label": "Magazine",
        "value": "7"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "44 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.85 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Time Clock** is an anomalous precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is red. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 70 damage rifle with a 2x headshot multiplier. A headshot freezes every enemy within 3 tiles of the target for 1 second. Each shot that misses costs the shooter 3 hit points. Seven-round magazine, 1.2 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Time Clock plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Frozen Assets** (A)",
                  "Deal x1.5 to frozen foes.",
                  "Freeze radius -30%."
                ],
                [
                  "**On the Hour** (B)",
                  "Deal x2 on the next shot every 3 s.",
                  "A missed x2 shot is lost."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Time Stamp**: A headshot marks the foe and the ones beside it: they take more damage for a while, once per 2 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Only fire when you are sure of the shot. Frozen Assets multiplies damage against frozen foes, turning one headshot into a team wipe."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Anomalous"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "eviction-notice"
      },
      {
        "category": "weapons",
        "slug": "instant-replay"
      },
      {
        "category": "weapons",
        "slug": "reply-all"
      },
      {
        "category": "weapons",
        "slug": "underground-cable"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/time-clock.png",
      "alt": "Time Clock weapon sprite",
      "pixelated": true,
      "width": 156,
      "height": 84
    }
  },
  {
    "slug": "sticky-gas-can",
    "category": "weapons",
    "name": "Sticky Gas Can",
    "subtitle": "Good explosive launcher",
    "summary": "The Sticky Gas Can sticks to walls and zombies and explodes on a timer or when you shoot it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "80 blast"
      },
      {
        "label": "Fire rate",
        "value": "1.1 per second"
      },
      {
        "label": "Blast radius",
        "value": "2.5 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.8 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Sticky Gas Can** is a good explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A thrown can that sticks where it lands and detonates after 3 seconds for 80 damage in a 2.5 tile radius. Shooting it with another weapon sets it off early. It fires every 0.93 seconds for 2.8 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Sticky Gas Can plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Slow Match** (A)",
                  "+20% rate when still. Cans wait 50% longer.",
                  "No bonus while moving."
                ],
                [
                  "**Gas Leak** (B)",
                  "Blast damage +10%. Spills fire: 8 DPS for 3 s.",
                  "Needs a floor: water puts it out."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Flash Point**: The first blast to catch a foe in 3 s sets it and the foe beside it alight, bosses too, and big crowds hit harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stick one to a zombie and walk away, or plant several on a wall and shoot them together for a chain detonation. Gas Leak spills fire where the can blows."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      },
      {
        "category": "weapons",
        "slug": "jack-in-the-box"
      },
      {
        "category": "weapons",
        "slug": "tailpipe"
      },
      {
        "category": "weapons",
        "slug": "pool-ball"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/sticky-gas-can.png",
      "alt": "Sticky Gas Can weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 96
    }
  },
  {
    "slug": "pool-ball",
    "category": "weapons",
    "name": "Pool Ball",
    "subtitle": "Rare explosive launcher",
    "summary": "The Pool Ball is a bouncy shot that pops on every zombie it touches, up to three bounces.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "36 blast"
      },
      {
        "label": "Fire rate",
        "value": "1.4 per second"
      },
      {
        "label": "Blast radius",
        "value": "1.4 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.6 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pool Ball** is a rare explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A projectile that bounces three times; each zombie it touches triggers a small 36 damage blast in a 1.4 tile radius. Fuse 6 seconds, one throw every 0.74 seconds for 2.6 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pool Ball plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Carom Shot** (A)",
                  "Hops to 2 new zombies after a hit: +10% each.",
                  "Needs a 2nd foe within 5 tiles."
                ],
                [
                  "**Extra Cushion** (B)",
                  "+1 bounce: more touches. Blast damage -10%.",
                  "Each blast hits 10% weaker."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Chalk Up**: Every 6th pop the ball chalks the foe it hit, so every weapon you hold hits that foe harder for a few seconds."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Throw it into a crowded corridor so it ricochets between bodies. Carom Shot hops to two new zombies after a hit."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "emergency-elevator"
      },
      {
        "category": "weapons",
        "slug": "hot-potato"
      },
      {
        "category": "weapons",
        "slug": "bathtub-drain"
      },
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/pool-ball.png",
      "alt": "Pool Ball weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 96
    }
  },
  {
    "slug": "emergency-elevator",
    "category": "weapons",
    "name": "Emergency Elevator",
    "subtitle": "Rare explosive launcher",
    "summary": "The Emergency Elevator is a straight-flying rocket with a huge blast. It is also the classic rocket-jump launcher.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "115 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.32 s"
      },
      {
        "label": "Magazine",
        "value": "3"
      },
      {
        "label": "Reload time",
        "value": "1.3 s"
      },
      {
        "label": "Blast radius",
        "value": "3.2 tiles"
      },
      {
        "label": "Energy cost",
        "value": "4.7 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Emergency Elevator** is a rare explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A rocket that flies straight with no gravity and explodes on first contact for 115 damage in a 3.2 tile radius. Three-rocket magazine, 1.3 second reload, 4.7 energy per rocket. The blast can throw you if you stand close."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Emergency Elevator plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Freefall** (A)",
                  "0.5 s after the boom a slam hits survivors.",
                  "The blast itself hits 10% weaker."
                ],
                [
                  "**Closing Doors** (B)",
                  "The foe it strikes takes +25% more.",
                  "Blast radius 15% smaller."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Panic Button**: When a foe hits you while you hold it, the button blasts the foes around you, once per 5 s, and low health hits harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it on tough targets and rocket-jump over gaps. Closing Doors adds 25 percent to the foe the rocket hits directly."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pool-ball"
      },
      {
        "category": "weapons",
        "slug": "hot-potato"
      },
      {
        "category": "weapons",
        "slug": "bathtub-drain"
      },
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/emergency-elevator.png",
      "alt": "Emergency Elevator weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 50
    }
  },
  {
    "slug": "concrete-pillar",
    "category": "weapons",
    "name": "Concrete Pillar",
    "subtitle": "Epic explosive launcher",
    "summary": "The Concrete Pillar fires a high-arc mortar shell with big terrain damage: it can break floors and drop zombies a level.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "150 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.35 s"
      },
      {
        "label": "Magazine",
        "value": "3"
      },
      {
        "label": "Reload time",
        "value": "1.3 s"
      },
      {
        "label": "Blast radius",
        "value": "3 tiles"
      },
      {
        "label": "Energy cost",
        "value": "5.85 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Concrete Pillar** is an epic explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A high-arc shell that explodes on contact for 150 damage in a 3 tile radius with heavy terrain damage; thin floors give way and zombies fall to the level below. Three-shell magazine, 1.3 second reload, 5.85 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Concrete Pillar plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Cracked Pillar** (A)",
                  "Far shots split in 3 at the peak: 40% each.",
                  "No split in 3 tiles: lone foe -20%."
                ],
                [
                  "**Fire for Effect** (B)",
                  "A blast within 3 tiles of the last one: x1.3.",
                  "Within 3 s. First shell gets none."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Load Bearing**: Every 8 foes the pillar hits load it: the next shell also slams a shockwave into the crowd, and standing still helps."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Lob it over cover onto groups you cannot see, or crack the floor under a boss's minions. Cracked Pillar splits far shots in three at the peak."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "demolition-drill"
      },
      {
        "category": "weapons",
        "slug": "pressure-cooker"
      },
      {
        "category": "weapons",
        "slug": "carpet-bomber"
      },
      {
        "category": "weapons",
        "slug": "leftovers"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/concrete-pillar.png",
      "alt": "Concrete Pillar weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 66
    }
  },
  {
    "slug": "demolition-drill",
    "category": "weapons",
    "name": "Demolition Drill",
    "subtitle": "Epic explosive launcher",
    "summary": "The Demolition Drill bores through up to five tiles of wall and then detonates inside, making instant shortcuts.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "150 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.35 s"
      },
      {
        "label": "Magazine",
        "value": "3"
      },
      {
        "label": "Reload time",
        "value": "1.3 s"
      },
      {
        "label": "Blast radius",
        "value": "3 tiles"
      },
      {
        "label": "Energy cost",
        "value": "5.85 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Evolves into",
        "value": "Tunnel Borer"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Demolition Drill** is an epic explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A drill projectile that bores through 5 solid tiles and then explodes for 150 damage in a 3 tile radius. Three-shot magazine, 1.3 second reload, 5.85 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Demolition Drill plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Inside Job** (A)",
                  "Passes 2 foes that have foes behind them.",
                  "Blast x0.8 after a pass."
                ],
                [
                  "**Root Canal** (B)",
                  "Lodges in first foe: 4 bites then x0.6 blast.",
                  "The foe keeps walking: stay back."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Daisy Chain**: The drill wires up to 2 foes that survive its blast: a wired foe that dies pops and passes the wire on, twice."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Demolition Drill with a chosen branch can evolve into the **Tunnel Borer** at a Workbench if you hold the [[anomalies/excavator]] anomaly, for 120 scrap. Bores up to 60 tiles along the line of the shot. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire it into a wall to open a path or hit a zombie hiding behind one."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "concrete-pillar"
      },
      {
        "category": "weapons",
        "slug": "pressure-cooker"
      },
      {
        "category": "weapons",
        "slug": "carpet-bomber"
      },
      {
        "category": "weapons",
        "slug": "leftovers"
      },
      {
        "category": "anomalies",
        "slug": "excavator"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/demolition-drill.png",
      "alt": "Demolition Drill weapon sprite",
      "pixelated": true,
      "width": 138,
      "height": 78
    }
  },
  {
    "slug": "firework-chain",
    "category": "weapons",
    "name": "Firework Chain",
    "subtitle": "Legendary explosive launcher",
    "summary": "The Firework Chain is a legendary launcher whose every blast throws more blasts, and they throw more.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "90 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Magazine",
        "value": "4"
      },
      {
        "label": "Reload time",
        "value": "1.1 s"
      },
      {
        "label": "Blast radius",
        "value": "2.4 tiles"
      },
      {
        "label": "Energy cost",
        "value": "5.2 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Firework Chain** is a legendary explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each explosion (90 damage, 2.4 tile radius) throws two smaller mini-blasts, which can throw two more, for a chain of bangs from one shot. Four-shot magazine, 1.1 second reload, 5.2 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Firework Chain plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Roman Candle** (A)",
                  "Minis fly forward: lone foes take less.",
                  "Radius -30% and damage -15%."
                ],
                [
                  "**Barrage** (B)",
                  "Each blast throws 3 minis: 13 bangs a shot.",
                  "Each bang hits 20% weaker."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spark Shower**: Every 4th kill throws sparks from the body that jump to the nearest foes, at most once per 1 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire into the densest group on the screen: the chain does the rest. Barrage throws three minis for thirteen bangs a shot."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "vending-cannon"
      },
      {
        "category": "weapons",
        "slug": "concrete-pillar"
      },
      {
        "category": "weapons",
        "slug": "demolition-drill"
      },
      {
        "category": "weapons",
        "slug": "pressure-cooker"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/firework-chain.png",
      "alt": "Firework Chain weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 91
    }
  },
  {
    "slug": "tactical-flashlight",
    "category": "weapons",
    "name": "Tactical Flashlight",
    "subtitle": "Common energy weapon",
    "summary": "The Tactical Flashlight is a burning light beam that dazzles runners, and it shares the energy bar with your lamp. It is one of the starting weapons on the Loadout screen.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "6.5 per tick"
      },
      {
        "label": "Fire rate",
        "value": "10 ticks per second"
      },
      {
        "label": "Range",
        "value": "7 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.6 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Loadout",
        "value": "Starting weapon option"
      },
      {
        "label": "Evolves into",
        "value": "Soul Lamp"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Tactical Flashlight** is a common energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is white. It is one of the starting guns offered on the Loadout screen, and it can also be found as a drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A held beam that ticks every 0.1 seconds for 6.5 damage out to 7 tiles, with a 25 percent chance per tick to stun for 0.4 seconds. Each tick costs 0.6 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Tactical Flashlight plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Hot Spot** (A)",
                  "3 hits ignite a foe. Burning foes take +12%.",
                  "Max 4 burning. Water puts it out."
                ],
                [
                  "**Searchlight** (B)",
                  "Every 3rd hit: 20% to all in cone. 0.5 s rest.",
                  "+20% battery drain."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Flashbang**: Every 12th pulse of a held beam flashbangs: a ring of light shoves and stuns foes, bosses just take the hit."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Tactical Flashlight with a chosen branch can evolve into the **Soul Lamp** at a Workbench if you hold the [[anomalies/third-eye]] anomaly, for 120 scrap. Foes in the beam take 100% more damage, bosses 50% more. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Sweep it across a doorway to keep the front line stuttering."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "cctv"
      },
      {
        "category": "weapons",
        "slug": "laser-tube"
      },
      {
        "category": "weapons",
        "slug": "camera-flash"
      },
      {
        "category": "weapons",
        "slug": "carpet-shocker"
      },
      {
        "category": "anomalies",
        "slug": "third-eye"
      },
      {
        "category": "items",
        "slug": "flashlight"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/tactical-flashlight.png",
      "alt": "Tactical Flashlight weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 64
    }
  },
  {
    "slug": "laser-tube",
    "category": "weapons",
    "name": "Laser Tube",
    "subtitle": "Good energy weapon",
    "summary": "The Laser Tube is a fluorescent laser that bounces off metal and glass.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "14"
      },
      {
        "label": "Fire rate",
        "value": "8.3 per second"
      },
      {
        "label": "Range",
        "value": "36 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      },
      {
        "label": "Evolves into",
        "value": "Refractor Beam"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Laser Tube** is a good energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A hitscan laser that fires every 0.12 seconds for 14 damage out to 36 tiles, piercing one enemy. It reflects off metal, glass and pool tiles up to twice. Costs 1 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Laser Tube plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Hall of Mirrors** (A)",
                  "Plain walls bounce the beam at 40% power.",
                  "Needs a wall behind the foe."
                ],
                [
                  "**Firing Line** (B)",
                  "Stand still 1 s: laser pierces +1 foe.",
                  "No bounces. No bonus while moving."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **End of the Line**: The last foe each shot reaches, bounces included, bursts and hurts those beside it, as often as the beam can afford."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Laser Tube with a chosen branch can evolve into the **Refractor Beam** at a Workbench if you hold the [[anomalies/wet-tiles]] anomaly, for 120 scrap. The beam splits in three after crossing water. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Bank the beam off a metal wall to reach foes behind cover."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "camera-flash"
      },
      {
        "category": "weapons",
        "slug": "carpet-shocker"
      },
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "security-gate"
      },
      {
        "category": "anomalies",
        "slug": "wet-tiles"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/laser-tube.png",
      "alt": "Laser Tube weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 63
    }
  },
  {
    "slug": "camera-flash",
    "category": "weapons",
    "name": "Camera Flash",
    "subtitle": "Good energy weapon",
    "summary": "The Camera Flash is a blinding cone that stuns everything in front of you.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "20"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.2 s"
      },
      {
        "label": "Range",
        "value": "8 tiles"
      },
      {
        "label": "Energy cost",
        "value": "7 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Camera Flash** is a good energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "No ray: every enemy inside a 60 degree cone within 8 tiles is hit for 20 damage and stunned for 1.5 seconds. It fires every 1.2 seconds for 7 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Camera Flash plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Flash Mob** (A)",
                  "Drags foes into a pile. +25% cone +20% damage.",
                  "Foes bunch up ahead. Bosses stay."
                ],
                [
                  "**Afterimage** (B)",
                  "First 4 flashed foes blast 1 s later for 20%.",
                  "Late hit. Dead foes don't blast."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Overexposed**: Each flash overexposes a foe and those beside it: they take extra damage from all your weapons, bosses excepted."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "An emergency button for when the horde reaches you: flash, then back away. Flash Mob drags foes into a pile."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "laser-tube"
      },
      {
        "category": "weapons",
        "slug": "carpet-shocker"
      },
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "security-gate"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/camera-flash.png",
      "alt": "Camera Flash weapon sprite",
      "pixelated": true,
      "width": 120,
      "height": 80
    }
  },
  {
    "slug": "shock-socket",
    "category": "weapons",
    "name": "Shock Socket",
    "subtitle": "Rare energy weapon",
    "summary": "The Shock Socket is a lightning gun whose electricity jumps between zombies, and through water.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "22"
      },
      {
        "label": "Fire rate",
        "value": "2.9 per second"
      },
      {
        "label": "Range",
        "value": "18 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Shock Socket** is a rare energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each bolt hits for 22 damage and jumps to up to 3 more enemies within 4 tiles, at 80 percent of the damage per jump. Hits can stun briefly. It fires every 0.35 seconds for 2.5 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Shock Socket plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Long Chain** (A)",
                  "Chain jumps +2 times. +20% reach.",
                  "+20% battery per bolt."
                ],
                [
                  "**Power Return** (B)",
                  "+20% reach. 3+ foe bolts refund 50% battery.",
                  "No refund below 3 foes."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Power Surge**: Every 6 zaps load the socket, and the next zap discharges a fan of lightning bolts from the muzzle."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Pair it with a [[weapons/squirt-gun|Squirt Gun]] to soak the horde first. Long Chain adds two more jumps."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "security-gate"
      },
      {
        "category": "weapons",
        "slug": "laser-tube"
      },
      {
        "category": "weapons",
        "slug": "camera-flash"
      },
      {
        "category": "weapons",
        "slug": "bass-cannon"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/shock-socket.png",
      "alt": "Shock Socket weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 80
    }
  },
  {
    "slug": "microwave",
    "category": "weapons",
    "name": "Microwave",
    "subtitle": "Rare energy weapon",
    "summary": "The Microwave fires a slow plasma orb that cooks everything it passes through.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "10"
      },
      {
        "label": "Fire rate",
        "value": "1.1 per second"
      },
      {
        "label": "Energy cost",
        "value": "10 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Microwave** is a rare energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A slow orb that passes through zombies and damages every enemy around it every 0.2 seconds for 10 damage, stopping at walls. Burning enemies take 6 damage per second for 2 seconds. It fires every 0.9 seconds for 10 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Microwave plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Rising Heat** (A)",
                  "Orb swells from x0.7 to x1.4 in 1.2 s.",
                  "Point-blank orbs are 30% smaller."
                ],
                [
                  "**Fat Orb** (B)",
                  "Orb radius x1.3 from the muzzle.",
                  "Battery cost +25% per orb."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Beep Beep Ding**: Fire orbs on the beat: 2 in a row and the next orb dings for +80% damage, but a shot off the beat starts the count over."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire it down a corridor ahead of you and walk behind it. Fat Orb enlarges it at a higher cost."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "cctv"
      },
      {
        "category": "weapons",
        "slug": "security-gate"
      },
      {
        "category": "weapons",
        "slug": "10000w-bulb"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/microwave.png",
      "alt": "Microwave weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 96
    }
  },
  {
    "slug": "substation",
    "category": "weapons",
    "name": "Substation",
    "subtitle": "Epic energy weapon",
    "summary": "The Substation plants a tesla pole that zaps zombies for eight seconds.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "18"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.5 s"
      },
      {
        "label": "Energy cost",
        "value": "20 per use"
      },
      {
        "label": "Duration",
        "value": "8 s"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Substation** is an epic energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Deploys a pole that zaps the nearest enemy within 6 tiles every 0.35 seconds for 18 damage, for 8 seconds. Each pole costs a steep 20 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Substation plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Blown Fuse** (A)",
                  "Poles blow at the end or when replaced: x4.5.",
                  "Poles last 15% less. Blast 2 tiles."
                ],
                [
                  "**Arc Flash** (B)",
                  "Every 6th zap arcs to 3 foes: 65% -20% each.",
                  "+20% battery per pole."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Static Discharge**: Every zap charges its foe, up to 3 at once, and a charged foe that dies bursts and hurts those beside it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Plant it at a choke point behind you as you fall back. Blown Fuse makes the pole explode when it ends."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "coolant-hose"
      },
      {
        "category": "weapons",
        "slug": "bass-cannon"
      },
      {
        "category": "weapons",
        "slug": "overhead-projector"
      },
      {
        "category": "weapons",
        "slug": "shock-socket"
      }
    ]
  },
  {
    "slug": "10000w-bulb",
    "category": "weapons",
    "name": "10000W Bulb",
    "subtitle": "Legendary energy weapon",
    "summary": "The 10000W Bulb launches a slow artificial sun that erases darkness and burns everything it passes through.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "26"
      },
      {
        "label": "Fire rate",
        "value": "1 every 2 s"
      },
      {
        "label": "Energy cost",
        "value": "20 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **10000W Bulb** is a legendary energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A slow, huge light orb with an aura that deals 26 damage per tick to everything within 2 tiles, including wall tiles, and lights the way. It costs 20 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how 10000W Bulb plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Supernova** (A)",
                  "At 14 hits the sun blasts 5 ticks in 3 tiles.",
                  "The sun ends when it goes nova."
                ],
                [
                  "**Solar Panel** (B)",
                  "+2.4 battery/s within 5.5 tiles of your sun.",
                  "No charge unless you follow the sun."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Energy Saver**: A foe the sun kills refunds a slice of a sun's cost, about once a second, and a sun fired on the move hits harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it to flush a dark room and burn out what is hiding in it. Solar Panel recharges your battery near the sun."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "laser-pointer"
      },
      {
        "category": "weapons",
        "slug": "microwave"
      },
      {
        "category": "weapons",
        "slug": "substation"
      },
      {
        "category": "weapons",
        "slug": "coolant-hose"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/10000w-bulb.png",
      "alt": "10000W Bulb weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 96
    }
  },
  {
    "slug": "fire-axe",
    "category": "weapons",
    "name": "Fire Axe",
    "subtitle": "Common melee weapon",
    "summary": "The Fire Axe is the melee weapon every run starts with: wide chops that also dig through walls twice as fast as anything else.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "29.5 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.8 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.6 tiles"
      },
      {
        "label": "Melee class",
        "value": "Blade"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      },
      {
        "label": "Loadout",
        "value": "Default melee weapon"
      },
      {
        "label": "Evolves into",
        "value": "Rift Axe"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Fire Axe** is a common melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is white. Every run starts with it in the melee slot."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A blade with a 150 degree arc that deals 29.5 damage per chop, about 1.8 chops per second, reach 1.6 tiles. It is free to use and also chews wall tiles faster than other melee weapons, which opens shortcuts through the Backrooms."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Fire Axe plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Forced Entry** (A)",
                  "Digs 50% faster. Broken walls burst: 60% damage.",
                  "Opens holes zombies can use."
                ],
                [
                  "**Break Glass** (B)",
                  "Shatters when a foe hits you: 50% damage burst.",
                  "Needs a foe to hit you first."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Scorched Earth**: The finishing chop ends in a burst of flame that hurts its target and the foes around it."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Fire Axe with a chosen branch can evolve into the **Rift Axe** at a Workbench if you hold the [[anomalies/noclip-rounds]] anomaly, for 120 scrap. Hits open a rift, one per 0.8 seconds, which eats small foes without leaving loot. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Keep it as your reliable melee slot and dig your way out of dead ends. Forced Entry digs even faster, leaving holes that zombies can also use."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "aluminum-bat"
      },
      {
        "category": "weapons",
        "slug": "box-cutter"
      },
      {
        "category": "weapons",
        "slug": "curtain-rod"
      },
      {
        "category": "weapons",
        "slug": "stanchion"
      },
      {
        "category": "anomalies",
        "slug": "noclip-rounds"
      }
    ]
  },
  {
    "slug": "ceo-golf-club",
    "category": "weapons",
    "name": "CEO Golf Club",
    "subtitle": "Good melee weapon",
    "summary": "The CEO Golf Club launches zombies into each other, turning one swing into several hits.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "35 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.7 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.5 tiles"
      },
      {
        "label": "Melee class",
        "value": "Sweep"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **CEO Golf Club** is a good melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A sweeping club that deals 35 damage across a 120 degree arc, with a launch effect: a struck zombie is flung and hurts any enemy it flies into for 30 damage. About 1.7 swings per second at 1.5 tiles of reach."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how CEO Golf Club plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Fore** (A)",
                  "Slammed foes fly too: 2 per swing at 50% damage.",
                  "A lone foe just flies."
                ],
                [
                  "**Out of Bounds** (B)",
                  "Push +25%. Wall slams burst for 40% damage.",
                  "No burst in the open."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Long Drive**: The last foe each swing hits is the ball: it bursts where struck, hurting it and the foes beside it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Swing into the front of a crowd so the launched bodies strike the rest. Shove branches make launches even stronger."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "letter-opener"
      },
      {
        "category": "weapons",
        "slug": "jump-rope"
      },
      {
        "category": "weapons",
        "slug": "brass-knuckles"
      },
      {
        "category": "weapons",
        "slug": "umbrella"
      }
    ]
  },
  {
    "slug": "paper-shredder",
    "category": "weapons",
    "name": "Paper Shredder",
    "subtitle": "Rare melee weapon",
    "summary": "The Paper Shredder grinds non-stop and heals you a little with every kill.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "8.2 per swing"
      },
      {
        "label": "Fire rate",
        "value": "11.1 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.3 tiles"
      },
      {
        "label": "Melee class",
        "value": "Claw"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Paper Shredder** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A claw-class weapon that swings every 0.09 seconds for 8.2 damage each time, over a 90 degree arc at 1.3 tiles. Each kill heals 1 hit point."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Paper Shredder plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Deep Cut** (A)",
                  "+6% damage per hit on the same foe. Max +30%.",
                  "Resets 0.4 s after the last hit on it."
                ],
                [
                  "**Recycling** (B)",
                  "Kills heal 2 HP. Wave cap 30% HP. Damage +10%.",
                  "Past the cap kills heal only 0.5 HP."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Confetti**: The shredder brands up to 4 foes for 4 s, and a branded foe that dies bursts into confetti that hurts the crowd."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stay in the middle of a group and keep grinding. Recycling raises the heal to 2 hit points per kill, up to a wave cap of 30 percent of your health."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      },
      {
        "category": "weapons",
        "slug": "staple-remover"
      }
    ]
  },
  {
    "slug": "maintenance-sledge",
    "category": "weapons",
    "name": "Maintenance Sledge",
    "subtitle": "Rare melee weapon",
    "summary": "The Maintenance Sledge is a slow, heavy hammer whose slam sends a shockwave along the floor.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "70 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.8 tiles"
      },
      {
        "label": "Melee class",
        "value": "Hammer"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Maintenance Sledge** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 70 damage hammer swing once per second over a 180 degree arc. Each swing sends a ground shockwave (18 damage) 3 tiles each way, which cracks thin floors beneath enemies."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Maintenance Sledge plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Aftershock** (A)",
                  "Repeats the quake 0.4 s later: 30% wider.",
                  "Swings 10% slower."
                ],
                [
                  "**Wet Floor** (B)",
                  "Quake hits x1.4 and stuns near foes 0.5 s.",
                  "A foe is stunned once per 3 s."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Steam Leak**: Every 4th foe you hit is scalded by a burst pipe, and so are the foes near it, bosses included."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it on crowds standing on thin floors: the shockwave can drop them a level. Wet Floor stuns nearby foes with the quake."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      },
      {
        "category": "weapons",
        "slug": "staple-remover"
      }
    ]
  },
  {
    "slug": "endless-tape",
    "category": "weapons",
    "name": "Endless Tape",
    "subtitle": "Epic melee weapon",
    "summary": "The Endless Tape is a tape-measure spear whose thrust reaches farther with every hit in a combo.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "26 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.9 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.4 tiles"
      },
      {
        "label": "Melee class",
        "value": "Spear"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Endless Tape** is an epic melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A spear-class thrust for 26 damage, about 2.9 thrusts per second. Reach grows 0.4 tiles with every consecutive hit within the combo window, up to a longer maximum."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Endless Tape plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Skewer** (A)",
                  "+15% per extra foe in the line. Max x1.3.",
                  "A lone foe takes 10% less."
                ],
                [
                  "**Spring Loaded** (B)",
                  "After 4 chained hits: swings 30% faster.",
                  "Reach grows 15% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **On a Roll**: Every hit that follows a hit adds 8% damage, up to 45%, and a missed thrust or a hit taken resets it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Chain hits without missing to reach farther than anything else in melee. Spring Loaded speeds up the swings after four chained hits."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      },
      {
        "category": "weapons",
        "slug": "hall-mirror"
      },
      {
        "category": "weapons",
        "slug": "crt-flail"
      }
    ]
  },
  {
    "slug": "fire-door",
    "category": "weapons",
    "name": "Fire Door",
    "subtitle": "Epic melee weapon",
    "summary": "The Fire Door is a heavy door you carry as a shield: hits from the front hurt you 60 percent less, and its swings shove the horde.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "60 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.4 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.3 tiles"
      },
      {
        "label": "Melee class",
        "value": "Shield"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Fire Door** is an epic melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A shield-class weapon dealing 60 damage per swing over a 100 degree arc. While you hold it, damage from the front is reduced by 60 percent, and each swing pushes you forward."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Fire Door plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Return to Sender** (A)",
                  "Blocked hits return x2 next swing: max +80%.",
                  "Charges only when you take a hit."
                ],
                [
                  "**Revolving Door** (B)",
                  "Full-circle swing. Back hits take 40% less.",
                  "Swings 10% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Flashover**: While you fight, the door heats every foe near you every 2 s, and a burning foe takes more from it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Face the enemy and walk into the crowd: the door soaks the hits that would otherwise take your health. Return to Sender stores blocked damage for your next swing."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      },
      {
        "category": "weapons",
        "slug": "hall-mirror"
      },
      {
        "category": "weapons",
        "slug": "crt-flail"
      }
    ]
  },
  {
    "slug": "ceiling-fan-turret",
    "category": "weapons",
    "name": "Ceiling Fan Turret",
    "subtitle": "Rare deployable device",
    "summary": "The Ceiling Fan Turret is a deployable gun that sticks to the floor or ceiling and shoots the nearest zombie for twenty seconds.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "12"
      },
      {
        "label": "Range",
        "value": "14 tiles"
      },
      {
        "label": "Cooldown",
        "value": "30 s"
      },
      {
        "label": "Duration",
        "value": "20 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      },
      {
        "label": "Evolves into",
        "value": "Storm Fan"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Ceiling Fan Turret** is a rare deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Deploys a fan turret that fires every 0.25 seconds at the nearest enemy within 14 tiles for 12 damage per shot. It lasts 20 seconds and recharges over a 30 second cooldown. It uses no energy. It can be placed on the floor or the ceiling."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Ceiling Fan Turret plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**High Speed** (A)",
                  "Fire rate ramps +30% over 2 s. Range +15%.",
                  "Ramp resets 0.6 s after the last shot."
                ],
                [
                  "**Wind Shear** (B)",
                  "Near foes take 50% of a fan shot every 0.5 s.",
                  "Only 2 foes within 1.8 tiles."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Tailwind**: The fan brands up to 3 foes for 5 s, and a branded foe that dies sends out a shockwave."
            ]
          },
          {
            "heading": "Evolution",
            "paragraphs": [
              "A Level 3 Ceiling Fan Turret with a chosen branch can evolve into the **Storm Fan** at a Workbench if you hold the [[anomalies/live-wire]] anomaly, for 120 scrap. Pulls foes in and zaps them. Evolved weapons deal 15% more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Place it behind you at a chokepoint, then fight elsewhere while it covers the approach."
        ]
      }
    ],
    "tags": [
      "Device",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      },
      {
        "category": "weapons",
        "slug": "balloon-drone"
      },
      {
        "category": "weapons",
        "slug": "bowling-ball"
      },
      {
        "category": "weapons",
        "slug": "photocopier"
      },
      {
        "category": "anomalies",
        "slug": "live-wire"
      }
    ]
  },
  {
    "slug": "robot-vacuum",
    "category": "weapons",
    "name": "Robot Vacuum",
    "subtitle": "Rare deployable device",
    "summary": "The Robot Vacuum roams the floor collecting pickups for you and zapping zombies' ankles.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "8"
      },
      {
        "label": "Cooldown",
        "value": "35 s"
      },
      {
        "label": "Duration",
        "value": "25 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Robot Vacuum** is a rare deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A robot drives along the floor for 25 seconds, pulling pickups to its owner and zapping low enemies for 8 damage every 0.4 seconds within 3 tiles. The cooldown is 35 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Robot Vacuum plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Heel** (A)",
                  "Patrols 5 tiles each side of you. Runs x1.5.",
                  "Ignores foes more than 6 tiles away."
                ],
                [
                  "**Static Cling** (B)",
                  "Every 3rd zap arcs to 2 more foes. Up to 60%.",
                  "Nothing extra for a lone foe."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Carpet Burn**: When the robot's zap kills a foe the motor sparks and leaves a small fire on the carpet where it fell."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Deploy it after clearing a room to gather the loot while you press on. Heel keeps it patrolling close to you."
        ]
      }
    ],
    "tags": [
      "Device",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "balloon-drone"
      },
      {
        "category": "weapons",
        "slug": "bowling-ball"
      },
      {
        "category": "weapons",
        "slug": "photocopier"
      }
    ]
  },
  {
    "slug": "photocopier",
    "category": "weapons",
    "name": "Photocopier",
    "subtitle": "Epic deployable device",
    "summary": "The Photocopier prints a copy of you that repeats every shot you fire for eight seconds.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "None (utility)"
      },
      {
        "label": "Energy cost",
        "value": "30 per use"
      },
      {
        "label": "Cooldown",
        "value": "20 s"
      },
      {
        "label": "Duration",
        "value": "8 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Photocopier** is an epic deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Deploys a clone that stands in place for 8 seconds and repeats every shot your gun fires. Each print costs 30 energy and has a 20 second cooldown. The clone repeats ranged shots, so your best weapon matters."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Photocopier plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Duplex** (A)",
                  "Copy fires a 2nd shot: 60%. Under 5 shots/s.",
                  "+33% battery per print."
                ],
                [
                  "**Send a Fax** (B)",
                  "Copy appears 8 tiles away. Lasts 35% longer.",
                  "The copy stands away from you."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Print Run**: Every 3 prints the copier gives back a share of the energy the print cost, so the run costs less."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Print it just before a boss phase and unload the strongest gun you have. Send a Fax places the copy 8 tiles away."
        ]
      }
    ],
    "tags": [
      "Device",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "bouncy-castle"
      },
      {
        "category": "weapons",
        "slug": "elevator-music"
      },
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      }
    ]
  },
  {
    "slug": "noclip-door",
    "category": "weapons",
    "name": "Noclip Door",
    "subtitle": "Anomalous deployable device",
    "summary": "The Noclip Door opens a hole in reality: zombies that touch it vanish, but it costs you max health for the level.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Anomalous"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "None (utility)"
      },
      {
        "label": "Cooldown",
        "value": "25 s"
      },
      {
        "label": "Duration",
        "value": "6 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Noclip Door** is an anomalous deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is red. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "An anomalous device that opens a portal in front of you for 6 seconds. Any enemy touching the hole is removed from the world with no loot and no corpse. Each use costs 5 maximum health for the rest of the level. The cooldown is 25 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Noclip Door plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Event Horizon** (A)",
                  "Hole widens 6% per foe swallowed. Max x1.5.",
                  "Starts 10% smaller."
                ],
                [
                  "**Sliding Door** (B)",
                  "The hole slides the way you face at 1 tile/s.",
                  "The hole never stays where you aimed."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Late Checkout**: When the hole closes it opens once more where it stood, free of toll and as big as it was, for 60% of its first life."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Treat it as an emergency button for bosses' minions or a pinned corridor. Event Horizon makes the hole widen with every foe it swallows."
        ]
      }
    ],
    "tags": [
      "Device",
      "Anomalous"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "photocopier"
      },
      {
        "category": "weapons",
        "slug": "bouncy-castle"
      },
      {
        "category": "weapons",
        "slug": "elevator-music"
      },
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      }
    ]
  },
  {
    "slug": "aluminum-bat",
    "category": "weapons",
    "name": "Aluminum Bat",
    "subtitle": "Common melee weapon",
    "summary": "The Aluminum Bat rewards hitting with the tip: a sweet-spot strike deals nearly double damage and a big push.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "16 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.9 tiles"
      },
      {
        "label": "Melee class",
        "value": "Sweep"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Aluminum Bat** is a common melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A sweep-class bat that deals 16 damage at the handle and 1.9 times that at the tip, at 2 swings per second with a 1.9 tile reach."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Aluminum Bat plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Grand Slam** (A)",
                  "Every 4th tip hit is a home run: x2 damage.",
                  "Handle hits do not count."
                ],
                [
                  "**Bunt** (B)",
                  "Handle hits deal x1.4. 35% stun 0.4 s.",
                  "Pays off only when foes get close."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Hitting Streak**: Every 4th swing in a row that hits someone fires a line drive along your aim, and a whiff resets the streak."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Keep your distance so the tip makes contact. Grand Slam turns every fourth tip hit into a home run."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-axe"
      },
      {
        "category": "weapons",
        "slug": "box-cutter"
      },
      {
        "category": "weapons",
        "slug": "curtain-rod"
      },
      {
        "category": "weapons",
        "slug": "stanchion"
      }
    ]
  },
  {
    "slug": "red-tape",
    "category": "weapons",
    "name": "Red Tape",
    "subtitle": "Epic precision weapon",
    "summary": "Red Tape piles paperwork on its target: the more statuses on a foe, the harder the next hit.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "58"
      },
      {
        "label": "Fire rate",
        "value": "1.8 per second"
      },
      {
        "label": "Magazine",
        "value": "7"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "40 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.4 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Red Tape** is an epic precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 58 damage rifle at 1.8 shots per second with a 1.5x headshot multiplier; damage rises with the number of status effects on the target. Seven-round magazine, 1.2 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Red Tape plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Paper Trail** (A)",
                  "Repeat hits on one foe deal x1.3.",
                  "Needs 2 hits on one foe within 1.5 s."
                ],
                [
                  "**Red Flag** (B)",
                  "Mark foes: +15% damage from all. Not bosses.",
                  "Fires 6% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Pending Review**: Every 5th hit is filed and handled late: a shockwave lands a moment after it, and foes with a status take a little more."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Pair it with status guns such as the [[weapons/paint-marker|Paint Marker]] or [[weapons/hand-heater|Hand Heater]]. Red Flag marks foes so every weapon deals 15 percent more to them."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "underground-cable"
      },
      {
        "category": "weapons",
        "slug": "the-observer"
      },
      {
        "category": "weapons",
        "slug": "reply-all"
      },
      {
        "category": "weapons",
        "slug": "long-weekend"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/red-tape.png",
      "alt": "Red Tape weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 65
    }
  },
  {
    "slug": "boiler-torch",
    "category": "weapons",
    "name": "Boiler Torch",
    "subtitle": "Rare automatic weapon",
    "summary": "The Boiler Torch is a short-range flamethrower fed by an internal tank: hold to burn, run dry and it coughs.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "4.5 x 7 pellets per tick"
      },
      {
        "label": "Fire rate",
        "value": "5 ticks per second"
      },
      {
        "label": "Range",
        "value": "3.4 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.7 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Boiler Torch** is a rare automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A held beam of flame that hits everything in a cone out to 3.4 tiles, ticking every 0.2 seconds for seven flame rays of 4.5 damage. Hits can ignite targets (Burn at 5 damage per second for 3 seconds) and the flame burns the floor. An empty tank makes it cough instead of firing."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Boiler Torch plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Feed the Flame** (A)",
                  "Each kill refuels 2%. Max 3 a second.",
                  "No kills: no fuel."
                ],
                [
                  "**White Heat** (B)",
                  "Flame hits x1.35 within 1.8 tiles.",
                  "Tank 10% smaller."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Stoked**: Every 10 kills the flame burns hotter by +5% damage, up to 4 ranks, and foes already burning take a little more."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Back up into a corridor mouth and flame the whole horde as it bunches. Feed the Flame refuels the tank on kills; White Heat makes close flames hit harder."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-extinguisher"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      },
      {
        "category": "weapons",
        "slug": "laserdisc-slinger"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/boiler-torch.png",
      "alt": "Boiler Torch weapon sprite",
      "pixelated": true,
      "width": 145,
      "height": 70
    }
  },
  {
    "slug": "coolant-hose",
    "category": "weapons",
    "name": "Coolant Hose",
    "subtitle": "Epic energy weapon",
    "summary": "The Coolant Hose chills whatever it touches; frozen foes take extra damage from every weapon.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "10 per tick"
      },
      {
        "label": "Fire rate",
        "value": "10 ticks per second"
      },
      {
        "label": "Range",
        "value": "6.5 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.6 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Coolant Hose** is an epic energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A held beam of 10 damage per tick out to 6.5 tiles that chills what it touches. Frozen foes take 35 percent more damage. It costs 0.6 energy per tick."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Coolant Hose plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Cold Front** (A)",
                  "Freeze marks +15% slows foes near. 1.5 s rest.",
                  "Needs foes that survive 1 s of beam."
                ],
                [
                  "**Thin Ice** (B)",
                  "+8% a tick for 1.6 s after freeze. Gap resets.",
                  "A gap in the beam resets the ramp."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Flash Freeze**: A foe the hose freezes cracks outward in an icy burst that hurts the foes beside it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Freeze the dangerous target first, then switch to a heavy weapon. Cold Front slows nearby foes too."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "overhead-projector"
      },
      {
        "category": "weapons",
        "slug": "laser-pointer"
      },
      {
        "category": "weapons",
        "slug": "cctv"
      },
      {
        "category": "weapons",
        "slug": "substation"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/coolant-hose.png",
      "alt": "Coolant Hose weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 65
    }
  },
  {
    "slug": "pizza-wheel",
    "category": "weapons",
    "name": "Pizza Wheel",
    "subtitle": "Rare sidearm",
    "summary": "The Pizza Wheel is a thrown cutter that flies out, comes back and can be thrown again once caught. It is a free gun: it never uses energy.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite (no energy)"
      },
      {
        "label": "Damage",
        "value": "34"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pizza Wheel** is a rare sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A boomerang projectile that deals 34 damage to everything it passes, flying out to about 8 tiles and returning. You must catch it to throw again, and it flies silently so it does not alert zombies. It is one of the four free-list guns."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pizza Wheel plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Lazy Susan** (A)",
                  "Catch near foes: it spins around you 0.6 s.",
                  "No new throw while it spins."
                ],
                [
                  "**Sauce Run** (B)",
                  "Every cut sets a foe alight: 8 DPS for 3 s.",
                  "Returns 20% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Perfect Catch**: Catch the wheel after 2 or more cuts and your hand flings extra slices along your aim."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Throw it down a corridor so it cuts the line both on the way out and on the way back. Because it costs no energy it is an excellent second gun alongside an energy-hungry weapon."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "helping-hand"
      },
      {
        "category": "weapons",
        "slug": "flare-gun"
      },
      {
        "category": "weapons",
        "slug": "paper-planes"
      },
      {
        "category": "weapons",
        "slug": "moth-jar"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/pizza-wheel.png",
      "alt": "Pizza Wheel weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 66
    }
  },
  {
    "slug": "steel-toe-boots",
    "category": "weapons",
    "name": "Steel-Toe Boots",
    "subtitle": "Rare melee weapon",
    "summary": "The Steel-Toe Boots kick at close range, and falling onto a zombie's head stomps it and bounces you back up.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "30 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.1 tiles"
      },
      {
        "label": "Melee class",
        "value": "Claw"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Steel-Toe Boots** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A claw-class kick for 30 damage, 2.5 kicks per second, with only 1.1 tiles of reach. Landing on a foe from above stomps it for extra damage and bounces you."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Steel-Toe Boots plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Pogo Stick** (A)",
                  "Stomps on foes bounce you. Not near bosses.",
                  "-20% stomp damage. Hold jump to chain."
                ],
                [
                  "**Leg Sweep** (B)",
                  "Kicks slow foes 45%. Stomps on them deal x2.",
                  "x2 needs a kick in the last 1.5 s."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Kick Back**: When something hits you, your next kick lands twice as hard, at most once every 2.5 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Jump on heads to dodge ground attacks while still dealing damage. Pogo Stick chains stomps when you hold the jump button."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      },
      {
        "category": "weapons",
        "slug": "staple-remover"
      }
    ]
  },
  {
    "slug": "fan-blade-halo",
    "category": "weapons",
    "name": "Fan Blade Halo",
    "subtitle": "Rare melee weapon",
    "summary": "The Fan Blade Halo gives you a ring of orbiting blades that are always active, even while you shoot.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "30 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.9 tiles"
      },
      {
        "label": "Melee class",
        "value": "Flail"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Fan Blade Halo** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Blades orbit you in a full 360 degree ring, dealing 30 damage per hit out to 1.9 tiles. Unlike other melee weapons it needs no swing and keeps cutting while you use your guns."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Fan Blade Halo plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Death Spiral** (A)",
                  "2+ foes in the ring: blades hit 25% faster.",
                  "Plain blades against one foe."
                ],
                [
                  "**Cover Fire** (B)",
                  "While you shoot the blades hit 40% faster.",
                  "Plain blades when you don't shoot."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Shrapnel**: The 3rd blade hit on a foe within 3 s shatters it in a burst that hurts the foes beside it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Walk through the horde while firing a gun at range: the blades take care of anything that reaches you. Cover Fire speeds the blades up while you shoot."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "staple-remover"
      }
    ]
  },
  {
    "slug": "paper-planes",
    "category": "weapons",
    "name": "Paper Planes",
    "subtitle": "Good sidearm",
    "summary": "Paper Planes are folded homing projectiles that lock onto the toughest enemies in view.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "18"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Paper Planes** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hold the trigger to lock; the planes then home in on elites. A single plane deals 18 damage, travels silently and never explodes, ending after its one hit. Each shot costs 1.5 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Paper Planes plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Priority Mail** (A)",
                  "Locks 20% faster. x1.4 only vs tough foes.",
                  "No bonus vs plain foes or bosses."
                ],
                [
                  "**Sharp Edges** (B)",
                  "+15% crit chance.",
                  "None"
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Special Delivery**: The first foe your planes hit is hunted and takes +18%, and when it dies it pops and the next foe is hunted."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Hold the lock for a moment before releasing when a miniboss or elite approaches. Priority Mail is the choice when you mostly fight big targets; Sharp Edges is a generalist crit option."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "flare-gun"
      },
      {
        "category": "weapons",
        "slug": "moth-jar"
      },
      {
        "category": "weapons",
        "slug": "fridge-magnet"
      },
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/paper-planes.png",
      "alt": "Paper Planes weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 78
    }
  },
  {
    "slug": "balloon-drone",
    "category": "weapons",
    "name": "Balloon Drone",
    "subtitle": "Rare deployable device",
    "summary": "The Balloon Drone is a balloon-borne gunner that shoots whatever sneaks up behind you.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "20"
      },
      {
        "label": "Cooldown",
        "value": "28 s"
      },
      {
        "label": "Duration",
        "value": "20 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Balloon Drone** is a rare deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A balloon that floats alongside you for 20 seconds and shoots enemies within 9 tiles for 20 damage per shot, focusing on foes behind you. The cooldown is 28 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Balloon Drone plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Six O'Clock** (A)",
                  "Drone shots at foes not in front deal x1.5.",
                  "No bonus on foes in front."
                ],
                [
                  "**Point Man** (B)",
                  "Flies ahead: aimed foes first. +33% rate.",
                  "No rear cover with foes in front."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Covering Fire**: When a foe hurts you, for 5 s every foe the drone kills bursts into a spray of shots across the crowd."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Release it before running a gauntlet with enemies behind you. Six O'Clock boosts shots at foes that are not in front of you."
        ]
      }
    ],
    "tags": [
      "Device",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      },
      {
        "category": "weapons",
        "slug": "bowling-ball"
      },
      {
        "category": "weapons",
        "slug": "photocopier"
      }
    ]
  },
  {
    "slug": "staple-claymore",
    "category": "weapons",
    "name": "Staple Claymore",
    "subtitle": "Good automatic weapon",
    "summary": "The Staple Claymore is a deployable trap: place it, and it fires a spray of staples when walkers step in front.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "10 x 14 pellets"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.3 s"
      },
      {
        "label": "Energy cost",
        "value": "3.9 per use"
      },
      {
        "label": "Duration",
        "value": "45 s"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Staple Claymore** is a good automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Deploys a mine that stays armed for 45 seconds and fires 14 staples of 10 damage each toward foes that step in front of it. Each mine costs 3.9 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Staple Claymore plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Sleeper** (A)",
                  "A mine gains +2.5% damage a second. Max +30%.",
                  "A fresh mine has no bonus."
                ],
                [
                  "**Second Blast** (B)",
                  "Last foe hit pops again: 25% in 1.4 tiles.",
                  "Damage -15% while moving."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Thermite**: When a mine fires it leaves flames on the ground at the last foe it hit, and survivors standing in them burn."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Seed it in a doorway you are retreating from, or a corridor you want covered while you fight elsewhere. Sleeper rewards mines that have been waiting."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "rivet-gun"
      },
      {
        "category": "weapons",
        "slug": "take-a-number"
      },
      {
        "category": "weapons",
        "slug": "stapler-smg"
      }
    ]
  },
  {
    "slug": "rolling-chair",
    "category": "weapons",
    "name": "Rolling Chair",
    "subtitle": "Good deployable device",
    "summary": "The Rolling Chair launches you in a quick dash through the horde, stunning whatever it barges into.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "35"
      },
      {
        "label": "Cooldown",
        "value": "9 s"
      },
      {
        "label": "Duration",
        "value": "0.28 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Rolling Chair** is a good deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A dash lasting 0.28 seconds that barges through foes, dealing 35 damage and stunning each for 0.35 seconds. Nine second cooldown."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Rolling Chair plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Spin Out** (A)",
                  "A roll ends in a ring: 50% damage and push.",
                  "No ring if the roll hit nothing."
                ],
                [
                  "**Combo Roll** (B)",
                  "2 dashes. x1.2 after a dash that hit 2+ foes.",
                  "No bonus after a missed dash."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Ramming Speed**: A foe another of your weapons hit in the last 1.5 s takes +50% from the chair's barge, once per foe."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it as both an escape and an opener: dash through the line and fight the stunned survivors. Combo Roll gives you two dashes."
        ]
      }
    ],
    "tags": [
      "Device",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      },
      {
        "category": "weapons",
        "slug": "balloon-drone"
      },
      {
        "category": "weapons",
        "slug": "bowling-ball"
      }
    ]
  },
  {
    "slug": "party-popper",
    "category": "weapons",
    "name": "Party Popper",
    "subtitle": "Good shotgun",
    "summary": "The Party Popper is a confetti shotgun that fires a ring of pellets every time you air jump.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "9 x 6 pellets"
      },
      {
        "label": "Fire rate",
        "value": "1.5 per second"
      },
      {
        "label": "Magazine",
        "value": "5"
      },
      {
        "label": "Reload time",
        "value": "1.05 s"
      },
      {
        "label": "Range",
        "value": "9 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.95 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Party Popper** is a good shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A shotgun of six 9-damage pellets with a short 9 tile reach. Each air jump pops a ring of confetti rays around you. Five-shell magazine, 1.05 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Party Popper plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Big Bang** (A)",
                  "Air jump ring: 16 pellets. 5 tiles. +20% damage.",
                  "Air jump back needs 4 bodies hit."
                ],
                [
                  "**Air Show** (B)",
                  "Airborne gun shots deal x1.6. Not the ring.",
                  "No bonus on the ground."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Curtain Call**: An air jump ring that hits a foe leaves an echo: half a second later a second ring shoves and stuns foes."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Jump into the middle of a crowd and air jump to hit everything around you. Air Show boosts the damage of the gun itself while you are airborne."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sawed-off"
      },
      {
        "category": "weapons",
        "slug": "pump-shotgun"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/party-popper.png",
      "alt": "Party Popper weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 96
    }
  },
  {
    "slug": "caulk-gun",
    "category": "weapons",
    "name": "Caulk Gun",
    "subtitle": "Good sidearm",
    "summary": "The Caulk Gun sprays expanding foam that sets into a wall zombies have to chew through. It is a free gun built for controlling terrain rather than killing.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite (no energy)"
      },
      {
        "label": "Damage",
        "value": "8"
      },
      {
        "label": "Fire rate",
        "value": "2.2 per second"
      },
      {
        "label": "Range",
        "value": "9 tiles"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Caulk Gun** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each glob deals 8 damage, slows its target by 35 percent for 1.5 seconds and, where it lands, hardens into a foam wall that the horde must chew through. It spends no energy, and its shots are silent. Foam walls last for a limited time and only so many cells of foam can exist at once."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Caulk Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Quick Dry** (A)",
                  "Foam lasts 14 s. Splats are 3 tall.",
                  "[[enemies/runner|Runners]] hop a 3-tall wall."
                ],
                [
                  "**Spray Can** (B)",
                  "Splats are 6 tall. Sprays 15% slower.",
                  "A tall wall eats the 16-cell cap."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Expanding Foam**: Every 4th glob swells a moment after it hits a foe into a foam ring that hurts, shoves and stuns."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Plug a doorway or corridor to split a horde, then pick off whoever is chewing. Quick Dry lets runners jump a 3-tall wall, so use Spray Can when you need a barrier they cannot hop."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      },
      {
        "category": "weapons",
        "slug": "paint-marker"
      },
      {
        "category": "weapons",
        "slug": "one-arm-bandit"
      },
      {
        "category": "weapons",
        "slug": "duty-pistol"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/caulk-gun.png",
      "alt": "Caulk Gun weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 88
    }
  },
  {
    "slug": "bass-cannon",
    "category": "weapons",
    "name": "Bass Cannon",
    "subtitle": "Epic energy weapon",
    "summary": "The Bass Cannon charges a sonic blast that sends zombies flying into the walls.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "50"
      },
      {
        "label": "Fire rate",
        "value": "Charge for 0.5 s, then fire"
      },
      {
        "label": "Range",
        "value": "3.6 tiles"
      },
      {
        "label": "Energy cost",
        "value": "10 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Bass Cannon** is an epic energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hold for about half a second to charge, then fire a cone blast for 50 damage out to 3.6 tiles; zombies are thrown and slam into walls. It costs 10 energy per blast."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Bass Cannon plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Subwoofer** (A)",
                  "Range +20%. Slam x1.5. Cone 20% narrower.",
                  "Narrower cone misses flanks."
                ],
                [
                  "**Echo Chamber** (B)",
                  "Every 3rd body hit rings a wave. 1 s rest.",
                  "Wave: 2.5 tiles. 50% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Wall of Sound**: Every foe the blast kills sends a shockwave from its corpse that shoves the crowd, at most every 1 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire it at a crowd with a wall behind it for extra damage on the slam. Subwoofer extends the range by 20 percent."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "security-gate"
      },
      {
        "category": "weapons",
        "slug": "substation"
      },
      {
        "category": "weapons",
        "slug": "coolant-hose"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/bass-cannon.png",
      "alt": "Bass Cannon weapon sprite",
      "pixelated": true,
      "width": 138,
      "height": 78
    }
  },
  {
    "slug": "staple-remover",
    "category": "weapons",
    "name": "Staple Remover",
    "subtitle": "Rare melee weapon",
    "summary": "The Staple Remover chomps foes that are nearly dead, eating anything under 25 percent health outright.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "60 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.3 tiles"
      },
      {
        "label": "Melee class",
        "value": "Claw"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Staple Remover** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A claw-class bite for 60 damage every 0.8 seconds. It eats foes under 25 percent health, or foes within about 1.5 hits of dying."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Staple Remover plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Meal Break** (A)",
                  "Kills heal 1 HP. 0.5 s rest. Damage +8%.",
                  "Wave cap 30% HP. Past it 0.25 HP."
                ],
                [
                  "**Wide Bite** (B)",
                  "Wide 170 degree arc: hits high and low foes.",
                  "Push 40% weaker."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Hungry Jaws**: Every foe the remover kills speeds up its bite: a rate boost that stacks and lasts 3 s from the last kill."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it to finish what your guns started. Wide Bite widens the arc to 170 degrees."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "bowling-ball",
    "category": "weapons",
    "name": "Bowling Ball",
    "subtitle": "Rare deployable device",
    "summary": "The Bowling Ball rolls through the horde along the floor; knock down five pins and it counts as a strike.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "40"
      },
      {
        "label": "Cooldown",
        "value": "11 s"
      },
      {
        "label": "Duration",
        "value": "1.4 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Bowling Ball** is a rare deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Rolls a ball along the floor for about 1.4 seconds, dealing 40 damage to everything it passes. Knocking down five foes (pins) is a strike. Cooldown 11 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Bowling Ball plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Gutter Ball** (A)",
                  "The ball bounces off a wall and rolls back.",
                  "Return pass deals 70%."
                ],
                [
                  "**Kingpin** (B)",
                  "The ball bursts at the end: x3.5 last hit.",
                  "Only where the ball stops."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spare Roll**: Every 5 pins the ball knocks down count as a strike that cuts the ball's wait, so a big roll comes back soon."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Roll it along a corridor with a line of zombies in it. Gutter Ball bounces the ball back off a wall for a second pass."
        ]
      }
    ],
    "tags": [
      "Device",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      },
      {
        "category": "weapons",
        "slug": "balloon-drone"
      },
      {
        "category": "weapons",
        "slug": "photocopier"
      }
    ]
  },
  {
    "slug": "box-cutter",
    "category": "weapons",
    "name": "Box Cutter",
    "subtitle": "Common melee weapon",
    "summary": "The Box Cutter is a cheap blade whose every third swing flings a razor wave.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "17 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.9 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.4 tiles"
      },
      {
        "label": "Melee class",
        "value": "Blade"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Box Cutter** is a common melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A blade for 17 damage that swings 2.9 times a second with a 1.4 tile reach; every third swing launches a razor wave that flies forward and hits foes at range."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Box Cutter plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Snap Off** (A)",
                  "Wave flies 50% farther and pierces 1 more.",
                  "Wave damage -20%."
                ],
                [
                  "**Friction Burn** (B)",
                  "Hits burn foes for 2 s. Wave is 40% wider.",
                  "All hits deal 10% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Fresh Edge**: The first hit on any foe you have not hit for 3 s is a fresh cut and lands far harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Count your swings and line up the third with a distant zombie. Snap Off sends the wave farther and through one more enemy."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-axe"
      },
      {
        "category": "weapons",
        "slug": "aluminum-bat"
      },
      {
        "category": "weapons",
        "slug": "curtain-rod"
      },
      {
        "category": "weapons",
        "slug": "stanchion"
      }
    ]
  },
  {
    "slug": "squeegee",
    "category": "weapons",
    "name": "Squeegee",
    "subtitle": "Rare melee weapon",
    "summary": "The Squeegee wipes behind you on every swing, so zombies that sneak up from the rear are hit too.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "30 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.4 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.45 tiles"
      },
      {
        "label": "Melee class",
        "value": "Blade"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Squeegee** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A blade for 30 damage per swing, 2.4 swings per second. Each swing also wipes behind you."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Squeegee plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Double Sided** (A)",
                  "The back wipe deals full damage.",
                  "The front wipe deals 12% less."
                ],
                [
                  "**Clean Sweep** (B)",
                  "The back wipe hits 4 foes at full reach.",
                  "Swings 10% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Soap Suds**: Each foe you kill pops a soap bubble that hurts the foes next to it, at most every 0.5 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fight in corridors with enemies on both sides. Double Sided makes the back wipe deal full damage."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "seam-ripper",
    "category": "weapons",
    "name": "Seam Ripper",
    "subtitle": "Rare melee weapon",
    "summary": "The Seam Ripper leaves a rip in the air after each swing, and the rip keeps cutting.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "24 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.5 tiles"
      },
      {
        "label": "Melee class",
        "value": "Blade"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Seam Ripper** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A blade for 24 damage per swing, 2.2 swings per second. Each swing leaves behind a rip that damages foes passing through it for a short time."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Seam Ripper plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Double Stitch** (A)",
                  "Each swing leaves 2 rips.",
                  "Rips last 0.4 s less."
                ],
                [
                  "**Frayed Edge** (B)",
                  "Swings and rips slow foes for 1 s.",
                  "Rip damage -20%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Loose Threads**: Every hit loosens a thread for 4 s, up to 4 foes at once, and the next hit on a loose foe tears it for +35%."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Swing across a doorway and retreat: the rip keeps hitting what steps into it. Double Stitch leaves two rips per swing."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "letter-opener",
    "category": "weapons",
    "name": "Letter Opener",
    "subtitle": "Good melee weapon",
    "summary": "The Letter Opener cuts foes with every hit; five cuts make them bleed out.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "17 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.8 tiles"
      },
      {
        "label": "Melee class",
        "value": "Spear"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Letter Opener** is a good melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A spear-class jab for 17 damage with a long 1.8 tile reach. Each hit adds a cut to the target, and at five cuts the foe bleeds out."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Letter Opener plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Sharp Edge** (A)",
                  "Cuts bleed 60% faster.",
                  "Bleed out needs 6 cuts."
                ],
                [
                  "**Red Ink** (B)",
                  "Bleed out hits for x2.",
                  "Cuts bleed 40% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Bulk Mail**: Every 3 hits fill the mailbag: the next jab also sends a wave that shoves and stuns the foes around its target."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Focus one zombie at a time to reach five cuts quickly. Red Ink doubles the damage of the bleed-out."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceo-golf-club"
      },
      {
        "category": "weapons",
        "slug": "jump-rope"
      },
      {
        "category": "weapons",
        "slug": "brass-knuckles"
      },
      {
        "category": "weapons",
        "slug": "umbrella"
      }
    ]
  },
  {
    "slug": "curtain-rod",
    "category": "weapons",
    "name": "Curtain Rod",
    "subtitle": "Common melee weapon",
    "summary": "The Curtain Rod is the longest cheap poke in melee, and its third swing vaults you through the air.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "17 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "2 tiles"
      },
      {
        "label": "Melee class",
        "value": "Spear"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Curtain Rod** is a common melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A spear-class poke for 17 damage with a 2 tile reach, 2.5 pokes a second. The third swing in a chain vaults you."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Curtain Rod plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Full Extension** (A)",
                  "The rod reaches 25% farther.",
                  "Swings 13% slower."
                ],
                [
                  "**Plant and Vault** (B)",
                  "Vault goes 30% higher. Landing slams 40%.",
                  "Needs foes near the landing."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Telescope Pole**: Every 8 kills the pole telescopes for 3 s: it reaches farther and skewers one more foe."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Poke zombies from outside their reach, and use the vault to jump over them. Plant and Vault adds a landing slam."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-axe"
      },
      {
        "category": "weapons",
        "slug": "aluminum-bat"
      },
      {
        "category": "weapons",
        "slug": "box-cutter"
      },
      {
        "category": "weapons",
        "slug": "stanchion"
      }
    ]
  },
  {
    "slug": "bill-spike",
    "category": "weapons",
    "name": "Bill Spike",
    "subtitle": "Rare melee weapon",
    "summary": "The Bill Spike skewers a line of foes and hits the last one in the line hardest.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "29 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.9 tiles"
      },
      {
        "label": "Melee class",
        "value": "Spear"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Bill Spike** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A spear-class thrust for 29 damage that hits up to three foes in a line. The last foe in the line takes the most damage."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Bill Spike plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**File It** (A)",
                  "The rise per foe is 45% instead of 30%.",
                  "Swings 12% slower."
                ],
                [
                  "**Spike Stack** (B)",
                  "The thrust hits 1 more foe. The rise is 20%.",
                  "Each foe hit deals 10% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Paid in Full**: Every 4th thrust ends in a burst on the last foe of the line, the one that already takes the most."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Line up a corridor and thrust along it. Spike Stack lets the thrust hit one more foe."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "counterweight",
    "category": "weapons",
    "name": "Counterweight",
    "subtitle": "Rare melee weapon",
    "summary": "The Counterweight is a hammer you charge with a hold: the slam sends a long shockwave.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "62 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.1 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.5 tiles"
      },
      {
        "label": "Melee class",
        "value": "Hammer"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Counterweight** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A hammer for 62 damage per slam; holding the attack charges a stronger slam with a long shockwave. Swing rate is about 1.1 per second."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Counterweight plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Fast Set** (A)",
                  "Charges 30% faster.",
                  "Charged slam -15% damage."
                ],
                [
                  "**Fault Line** (B)",
                  "Charged slam stuns foes 1 s. Shock 25% longer.",
                  "Tap swings -10% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Backswing**: A slam that kills swings the weight back: a late shockwave shoves and stuns the foes around the corpse, once per 1 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Charge while retreating and release into a group. Fault Line stuns foes for a second."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "tally-stick",
    "category": "weapons",
    "name": "Tally Stick",
    "subtitle": "Legendary melee weapon",
    "summary": "The Tally Stick is a legendary hammer that carves a notch for every kill, and the notches keep growing.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "54 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.8 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.6 tiles"
      },
      {
        "label": "Melee class",
        "value": "Hammer"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Tally Stick** is a legendary melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A hammer for 54 damage per swing. Each kill carves a notch that adds a little damage, up to 40 notches, and the count keeps growing for as long as you carry the weapon."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Tally Stick plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Deep Grooves** (A)",
                  "Each notch adds 1% damage.",
                  "Only 24 notches fit."
                ],
                [
                  "**Big Game** (B)",
                  "Elite and boss carve 5. Notch reach x1.5.",
                  "Normal kills carve half as often."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Tally Gate**: Every 5 kills carve a gate that stays open 4 s: each kill through it bursts and hurts the foes beside it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Play it from the first wave and avoid swapping it out; it only gets better as you kill. Big Game gives extra notches for elites and bosses."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "id-lanyard"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      }
    ]
  },
  {
    "slug": "jump-rope",
    "category": "weapons",
    "name": "Jump Rope",
    "subtitle": "Good melee weapon",
    "summary": "The Jump Rope lashes twice when you swing it in the air.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "14 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.6 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.9 tiles"
      },
      {
        "label": "Melee class",
        "value": "Whip"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Jump Rope** is a good melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A whip for 14 damage with a 1.9 tile reach, 2.6 lashes a second. Swing in the air for a double lash."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Jump Rope plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Triple Lash** (A)",
                  "Air lash hits 3 times. Extras deal 25%.",
                  "Ground lash -10% damage."
                ],
                [
                  "**Skip a Beat** (B)",
                  "Landing with the rope out: next lash x2.",
                  "Once every 3 s. Air reach 30% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Double Dutch**: Every air jump skips the rope under your feet and adds a damage boost that lasts 6 s and stacks a few times."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Jump and lash into a crowd. Triple Lash raises the air lash to three hits."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceo-golf-club"
      },
      {
        "category": "weapons",
        "slug": "letter-opener"
      },
      {
        "category": "weapons",
        "slug": "brass-knuckles"
      },
      {
        "category": "weapons",
        "slug": "umbrella"
      }
    ]
  },
  {
    "slug": "tow-cable",
    "category": "weapons",
    "name": "Tow Cable",
    "subtitle": "Rare melee weapon",
    "summary": "The Tow Cable pulls foes toward you on its third swing, but if a big one hooks you, it pulls you instead.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "21 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.2 swings per second"
      },
      {
        "label": "Reach",
        "value": "2.1 tiles"
      },
      {
        "label": "Melee class",
        "value": "Whip"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Tow Cable** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A whip for 21 damage with a 2.1 tile reach. The third swing in a chain pulls up to three foes in; heavy foes pull you toward them instead."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Tow Cable plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Winch** (A)",
                  "Pulls up to 5 foes instead of 3.",
                  "All hits deal 12% less."
                ],
                [
                  "**Tow Truck** (B)",
                  "Pulled foes take 50% more for 3 s.",
                  "Pulls stop 2 tiles out."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Taut Line**: Finish a full chain of swings without a whiff and the cable goes taut: +22% damage for 3 s, renewed by each clean chain."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it to gather a spread-out group for a blast. Winch pulls up to five foes at once."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "id-lanyard",
    "category": "weapons",
    "name": "ID Lanyard",
    "subtitle": "Anomalous melee weapon",
    "summary": "The ID Lanyard has huge reach and a stinging tip, but it can tangle you.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Anomalous"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "45 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.8 swings per second"
      },
      {
        "label": "Reach",
        "value": "2.2 tiles"
      },
      {
        "label": "Melee class",
        "value": "Whip"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **ID Lanyard** is an anomalous melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is red. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "An anomalous whip for 45 damage per hit with a 2.2 tile reach; the outer tip hits much harder than the strap. Swings can tangle you."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how ID Lanyard plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Untangled** (A)",
                  "The strap never tangles you.",
                  "Tip damage -25%."
                ],
                [
                  "**Long Leash** (B)",
                  "Tip zone starts 20% farther out. Tip x3.",
                  "Tangles every 4th swing."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Snapping Point**: Every 6th swing the strap snaps taut and hits twice as hard, tangle or no tangle."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Space the zombies at the tip of the strap. Untangled makes the strap safe at a cost to tip damage."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Anomalous"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "tally-stick"
      },
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      }
    ]
  },
  {
    "slug": "stanchion",
    "category": "weapons",
    "name": "Stanchion",
    "subtitle": "Common melee weapon",
    "summary": "The Stanchion hits harder for every extra foe in the swing.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "17 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.6 tiles"
      },
      {
        "label": "Melee class",
        "value": "Sweep"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Stanchion** is a common melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A sweep for 17 damage over a 170 degree arc at 1.6 tiles; damage grows with each extra foe struck by the same swing."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Stanchion plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Standing Room** (A)",
                  "Hits 4 foes and the bonus caps at 68%.",
                  "Swings 15% slower."
                ],
                [
                  "**Velvet Rope** (B)",
                  "The finisher pushes every foe 50% harder.",
                  "The finisher deals 20% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Rush Hour**: Each kill within 2 s of the last quickens every swing +3%, up to +21%, until the line stops moving."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Wade into the middle of the crowd rather than picking at the edges. Standing Room hits four foes."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-axe"
      },
      {
        "category": "weapons",
        "slug": "aluminum-bat"
      },
      {
        "category": "weapons",
        "slug": "box-cutter"
      },
      {
        "category": "weapons",
        "slug": "curtain-rod"
      }
    ]
  },
  {
    "slug": "hand-truck",
    "category": "weapons",
    "name": "Hand Truck",
    "subtitle": "Epic melee weapon",
    "summary": "The Hand Truck lets you hold the attack to plow foes along the floor and crush them against a wall.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "54 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.4 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.5 tiles"
      },
      {
        "label": "Melee class",
        "value": "Sweep"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hand Truck** is an epic melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A sweep for 54 damage per swing. Holding the attack plows foes forward; a foe crushed against a wall takes extra damage."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hand Truck plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Heavy Load** (A)",
                  "Plow crush deals x2.",
                  "You move 15% slower while plowing."
                ],
                [
                  "**Two Wheeler** (B)",
                  "The plow lasts 2 s longer.",
                  "Tap swings 13% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Collapse**: A foe crushed against a wall sends out a shockwave that shoves and stuns the crowd, at most once a second."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Plow toward a wall with a crowd in front. Heavy Load doubles the crush damage."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "hall-mirror"
      },
      {
        "category": "weapons",
        "slug": "crt-flail"
      }
    ]
  },
  {
    "slug": "brass-knuckles",
    "category": "weapons",
    "name": "Brass Knuckles",
    "subtitle": "Good melee weapon",
    "summary": "Brass Knuckles throw fast jabs that wind up: the third hit launches a foe into the air.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "12 per swing"
      },
      {
        "label": "Fire rate",
        "value": "4.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.1 tiles"
      },
      {
        "label": "Melee class",
        "value": "Claw"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Brass Knuckles** is a good melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A claw-class weapon: 12 damage per jab at 4.5 jabs a second, 1.1 tile reach. The third hit in a chain is an uppercut that launches the target."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Brass Knuckles plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Clean Hook** (A)",
                  "Uppercut launches 2 tiles higher.",
                  "Uppercut damage -15%."
                ],
                [
                  "**Round Two** (B)",
                  "Hits on launched foes do 40% more.",
                  "Speed ramp caps at 20%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Shadow Boxing**: Every 3 kills the knuckles go into a 3 s flurry in which each jab throws two echo punches ahead of it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stay in close and chain jabs. Round Two deals 40 percent more to launched foes."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceo-golf-club"
      },
      {
        "category": "weapons",
        "slug": "letter-opener"
      },
      {
        "category": "weapons",
        "slug": "jump-rope"
      },
      {
        "category": "weapons",
        "slug": "umbrella"
      }
    ]
  },
  {
    "slug": "heavy-stapler",
    "category": "weapons",
    "name": "Heavy Stapler",
    "subtitle": "Rare melee weapon",
    "summary": "The Heavy Stapler is a short punch whose third swing fans five staples forward.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "34 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.3 tiles"
      },
      {
        "label": "Melee class",
        "value": "Claw"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Heavy Stapler** is a rare melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A claw-class punch for 34 damage at 1.3 tiles. The third swing in a chain fires a fan of five staples."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Heavy Stapler plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Full Magazine** (A)",
                  "The fan fires 8 staples.",
                  "Staple damage -20%."
                ],
                [
                  "**Staple Chain** (B)",
                  "Staples slow foes 40% for 1.5 s.",
                  "The fan shrinks to 3 staples."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Staple Storm**: Every 3 hits load the stapler, and the next punch flings a wide cone of staples along the aim."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use the staples to clear foes standing a step out of reach. Full Magazine fires eight staples."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "paper-shredder"
      },
      {
        "category": "weapons",
        "slug": "maintenance-sledge"
      },
      {
        "category": "weapons",
        "slug": "steel-toe-boots"
      },
      {
        "category": "weapons",
        "slug": "fan-blade-halo"
      }
    ]
  },
  {
    "slug": "umbrella",
    "category": "weapons",
    "name": "Umbrella",
    "subtitle": "Good melee weapon",
    "summary": "The Umbrella swats away incoming shots, and if you hold it in the air it lets you glide.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "30 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.8 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.5 tiles"
      },
      {
        "label": "Melee class",
        "value": "Shield"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Umbrella** is a good melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A shield for 30 damage per swing that deflects projectiles; hold it while airborne to glide."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Umbrella plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Wind Gust** (A)",
                  "Opening pushes foes away 50% harder.",
                  "Glide falls 20% faster."
                ],
                [
                  "**Rain Check** (B)",
                  "Deflected shots bounce back at 50% damage.",
                  "Deflect window -25%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Squall**: When something hits you the umbrella snaps open and a gust shoves and stuns the foes around you, once per 2 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Open it against ranged attackers and drift over gaps. Rain Check sends deflected shots back at half damage."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ceo-golf-club"
      },
      {
        "category": "weapons",
        "slug": "letter-opener"
      },
      {
        "category": "weapons",
        "slug": "jump-rope"
      },
      {
        "category": "weapons",
        "slug": "brass-knuckles"
      }
    ]
  },
  {
    "slug": "hall-mirror",
    "category": "weapons",
    "name": "Hall Mirror",
    "subtitle": "Epic melee weapon",
    "summary": "The Hall Mirror sends an incoming shot back along your aim when you swing it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "56 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.6 tiles"
      },
      {
        "label": "Melee class",
        "value": "Shield"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hall Mirror** is an epic melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A shield for 56 damage per swing; a swing in the path of a shot reflects it along your aim."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hall Mirror plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Funhouse** (A)",
                  "Reflected rays split in 3 at 60% each.",
                  "One reflect per 2 s."
                ],
                [
                  "**Cracked Glass** (B)",
                  "Reflect damage x2. The mirror cracks 3 s.",
                  "No guard while cracked."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Bad Luck**: The first foe the mirror hits is cursed and takes +18% from every swing until it dies or 5 s pass unhit."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Time a swing against a ranged attacker to turn its shot against its friends. Funhouse splits the reflection in three."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      },
      {
        "category": "weapons",
        "slug": "crt-flail"
      }
    ]
  },
  {
    "slug": "quarter-sock",
    "category": "weapons",
    "name": "Quarter Sock",
    "subtitle": "Common melee weapon",
    "summary": "The Quarter Sock is a sock full of coins: hold to whirl it around you and let go to sling it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "18 per swing"
      },
      {
        "label": "Fire rate",
        "value": "2.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.4 tiles"
      },
      {
        "label": "Melee class",
        "value": "Flail"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Quarter Sock** is a common melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A flail for 18 damage per hit. Holding the attack whirls it around you in a ring; releasing slings it."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Quarter Sock plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Loose Change** (A)",
                  "Whirl kills drop 1 extra scrap.",
                  "Whirl damage -20%."
                ],
                [
                  "**Spin Cycle** (B)",
                  "The ring is 25% wider and pushes foes away.",
                  "You move 20% slower whirling."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Wool Spark**: Every 3rd hit of the whirl throws a static spark that jumps from the foe to the one near it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Whirl while surrounded and release into the biggest enemy. Loose Change drops extra [[items/scrap|scrap]] on whirl kills."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fire-axe"
      },
      {
        "category": "weapons",
        "slug": "aluminum-bat"
      },
      {
        "category": "weapons",
        "slug": "box-cutter"
      },
      {
        "category": "weapons",
        "slug": "curtain-rod"
      }
    ]
  },
  {
    "slug": "crt-flail",
    "category": "weapons",
    "name": "CRT Flail",
    "subtitle": "Epic melee weapon",
    "summary": "The CRT Flail is a television on a chain that hits harder the faster you run.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "54 per swing"
      },
      {
        "label": "Fire rate",
        "value": "1.4 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.6 tiles"
      },
      {
        "label": "Melee class",
        "value": "Flail"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **CRT Flail** is an epic melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A flail for 54 damage per swing, with a damage bonus that scales with your running speed."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how CRT Flail plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Full Speed** (A)",
                  "Running swings gain 50% more damage.",
                  "Standing swings -30% damage."
                ],
                [
                  "**Static Shock** (B)",
                  "Swings shock one near foe for 40%.",
                  "Swings 10% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Channel Surf**: The tuned foe takes +22% from the flail, and when it dies a spark jumps and the nearest foe tunes in."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Run through a crowd and swing as you go. Full Speed gives 50 percent more damage to running swings."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      },
      {
        "category": "weapons",
        "slug": "hall-mirror"
      }
    ]
  },
  {
    "slug": "pendulum",
    "category": "weapons",
    "name": "Pendulum",
    "subtitle": "Epic melee weapon",
    "summary": "The Pendulum keeps swinging after one press: a single press launches four swings of the weight.",
    "infobox": [
      {
        "label": "Family",
        "value": "Melee"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite"
      },
      {
        "label": "Damage",
        "value": "60 per swing"
      },
      {
        "label": "Fire rate",
        "value": "0.5 swings per second"
      },
      {
        "label": "Reach",
        "value": "1.6 tiles"
      },
      {
        "label": "Melee class",
        "value": "Flail"
      },
      {
        "label": "Slot",
        "value": "Melee slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pendulum** is an epic melee weapon. Melee weapons have a slot of their own, never run out of ammo and swing on their own when a zombie is in reach and you are not firing.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A flail for 60 damage per swing; one press starts a series of four swings (a long 1.9 second cycle)."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Melee weapons also gain +16% reach with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pendulum plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Slow Clock** (A)",
                  "5 swings instead of 4.",
                  "Swings come 25% slower."
                ],
                [
                  "**Chime** (B)",
                  "The last swing deals x2 and pushes.",
                  "The first swing deals 25% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Free Swing**: When your other weapons kill, the next press of the pendulum starts with a swing +35% harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Press once and use the time to reposition while the weight keeps working. Slow Clock adds a fifth swing."
        ]
      }
    ],
    "tags": [
      "Melee",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "endless-tape"
      },
      {
        "category": "weapons",
        "slug": "fire-door"
      },
      {
        "category": "weapons",
        "slug": "hand-truck"
      },
      {
        "category": "weapons",
        "slug": "hall-mirror"
      }
    ]
  },
  {
    "slug": "plumb-bob",
    "category": "weapons",
    "name": "Plumb Bob",
    "subtitle": "Common sidearm",
    "summary": "The Plumb Bob is a sidearm that rewards the high ground: the further below you the target is, the harder the shot hits.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "19.5"
      },
      {
        "label": "Fire rate",
        "value": "3.3 per second"
      },
      {
        "label": "Magazine",
        "value": "10"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Range",
        "value": "22 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.8 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Plumb Bob** is a common sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 19.5 damage hitscan sidearm firing 3.3 shots per second. Damage rises with how far down you shoot, so firing from a ledge, a vent or a jump onto the horde below is the way to use it. A 10-round magazine reloads in 0.8 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Plumb Bob plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Steep Drop** (A)",
                  "Height bonus doubles and caps at 150%.",
                  "The base shot deals 10% less."
                ],
                [
                  "**Free Fall** (B)",
                  "Shots fired in the air deal +50%.",
                  "Shots on the ground deal 10% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Swing Out**: While you fire, the bob swings out every 1.5 s: a ring that hurts, shoves and stuns foes around you."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Take the upper platform of a room and shoot down at the zombies filing in beneath you. In the open it is an average pistol, so do not rely on it on flat ground."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "duty-pistol"
      },
      {
        "category": "weapons",
        "slug": "nail-gun"
      },
      {
        "category": "weapons",
        "slug": "squirt-gun"
      },
      {
        "category": "weapons",
        "slug": "final-demand"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/plumb-bob.png",
      "alt": "Plumb Bob weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 88
    }
  },
  {
    "slug": "radar-gun",
    "category": "weapons",
    "name": "Radar Gun",
    "subtitle": "Good precision weapon",
    "summary": "The Radar Gun punishes the fast: runners and chargers take extra damage from every hit.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "42"
      },
      {
        "label": "Fire rate",
        "value": "1.8 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Range",
        "value": "30 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.65 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Radar Gun** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 42 damage hitscan gun firing every 0.55 seconds to 30 tiles with a 1.5x headshot multiplier. Foes moving quickly take 75 percent more damage. Six-round magazine, 0.8 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Radar Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Speed Trap** (A)",
                  "Fast foes take 70% more.",
                  "Slow foes take 15% less."
                ],
                [
                  "**License Check** (B)",
                  "Hits on fast foes slow them 40% for 1.5 s.",
                  "The bonus is 25% lower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Radar Sweep**: Every 3 hits charge the dish: your next shot also sweeps a wide cone in front of you."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Save it for the sprinters that reach you first. License Check slows fast targets instead of increasing damage."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hunting-rifle"
      },
      {
        "category": "weapons",
        "slug": "the-long-memo"
      },
      {
        "category": "weapons",
        "slug": "perfect-attendance"
      },
      {
        "category": "weapons",
        "slug": "kitchen-timer"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/radar-gun.png",
      "alt": "Radar Gun weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 96
    }
  },
  {
    "slug": "the-long-memo",
    "category": "weapons",
    "name": "The Long Memo",
    "subtitle": "Good precision weapon",
    "summary": "The Long Memo gains power with distance: the farther the shot, the harder it lands.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "26"
      },
      {
        "label": "Fire rate",
        "value": "1.5 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "1.2 s"
      },
      {
        "label": "Range",
        "value": "42 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.95 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **The Long Memo** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "26 damage per round at base, rising with range to three times at the 42 tile maximum; the rise starts 5 tiles out. Two-times headshots, one pierce. Six-round magazine, 1.2 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how The Long Memo plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Escalate** (A)",
                  "Damage rises 40% faster with distance.",
                  "Hits within 3 tiles deal 20% less."
                ],
                [
                  "**Out of Office** (B)",
                  "Hits from 20 tiles or more mark the foe.",
                  "Fires 10% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **All Staff**: Every 4th kill sends the memo all-staff for 4 s: your round reaches farther and goes through one more foe."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Take a long corridor and fight from the far end. Out of Office marks any foe hit from 20 tiles or more."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hunting-rifle"
      },
      {
        "category": "weapons",
        "slug": "radar-gun"
      },
      {
        "category": "weapons",
        "slug": "perfect-attendance"
      },
      {
        "category": "weapons",
        "slug": "kitchen-timer"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/the-long-memo.png",
      "alt": "The Long Memo weapon sprite",
      "pixelated": true,
      "width": 145,
      "height": 35
    }
  },
  {
    "slug": "carpet-shocker",
    "category": "weapons",
    "name": "Carpet Shocker",
    "subtitle": "Good energy weapon",
    "summary": "The Carpet Shocker is a free gun: walking builds up static, and every zap uses that charge instead of energy.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Infinite (no energy)"
      },
      {
        "label": "Damage",
        "value": "33"
      },
      {
        "label": "Fire rate",
        "value": "2.9 per second"
      },
      {
        "label": "Range",
        "value": "18 tiles"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Carpet Shocker** is a good energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A hitscan zap for 33 damage every 0.35 seconds out to 18 tiles, piercing three enemies. It costs no energy; the charge comes from walking on the carpet. It is one of the four free-list guns."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3)."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Carpet Shocker plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Fuzzy Sweater** (A)",
                  "Zaps need 1 tile less of walking.",
                  "Zaps deal 15% less."
                ],
                [
                  "**Lightning Rod** (B)",
                  "A full meter fires one bolt for x1.4.",
                  "Needs a full meter."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spark Gap**: Every 3rd kill opens a 3 s window in which every kill sends lightning jumping to the nearest foe."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Keep moving between zaps. Lightning Rod saves up a full meter for a single bolt at 1.4 times damage."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "laser-tube"
      },
      {
        "category": "weapons",
        "slug": "camera-flash"
      },
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "security-gate"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/carpet-shocker.png",
      "alt": "Carpet Shocker weapon sprite",
      "pixelated": true,
      "width": 120,
      "height": 72
    }
  },
  {
    "slug": "hot-glue-gun",
    "category": "weapons",
    "name": "Hot Glue Gun",
    "subtitle": "Rare sidearm",
    "summary": "The Hot Glue Gun links two zombies together with glue so that every hit one takes is echoed to the other.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "26"
      },
      {
        "label": "Fire rate",
        "value": "3.6 per second"
      },
      {
        "label": "Magazine",
        "value": "14"
      },
      {
        "label": "Reload time",
        "value": "1.1 s"
      },
      {
        "label": "Range",
        "value": "20 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hot Glue Gun** is a rare sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hitscan glue shots for 26 damage at 3.6 shots per second. A hit slows the target (35 percent for 4 seconds) and links it to another foe within about 3.5 tiles; hits on one then echo to the other at half damage. A 14-round magazine reloads in 1.1 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hot Glue Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**String Them Up** (A)",
                  "A link echoes to 2 more foes.",
                  "Echo deals 30% less."
                ],
                [
                  "**Super Glue** (B)",
                  "Glue pins the foe for 1.5 s.",
                  "Links break at 3 tiles."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Glue Bomb**: Every 5 hits load the gun, and the next shot bursts on impact into a blast that hits the crowd around it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Glue a tough zombie to a weak one and focus the weak one only if you need echo damage. String Them Up trades echo strength for more links, which suits large rooms."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "price-tagger"
      },
      {
        "category": "weapons",
        "slug": "twin-sidearms"
      },
      {
        "category": "weapons",
        "slug": "block-sender"
      },
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/hot-glue-gun.png",
      "alt": "Hot Glue Gun weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 88
    }
  },
  {
    "slug": "reply-all",
    "category": "weapons",
    "name": "Reply All",
    "subtitle": "Legendary precision weapon",
    "summary": "Reply All copies every hit to up to nine other foes nearby, a legendary way to damage a crowd.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "60"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Range",
        "value": "34 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2.6 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Reply All** is a legendary precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 60 damage hitscan round every 0.5 seconds. Each hit is copied at 35 percent damage to up to 9 foes near the target. It costs 2.6 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Reply All plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Bcc the Boss** (A)",
                  "Copies hit 50% harder.",
                  "Reaches 3 foes fewer."
                ],
                [
                  "**Forward Chain** (B)",
                  "Copies pass on to 2 more foes.",
                  "Copies deal 8% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Reply Storm**: Your aimed shot brands its foe, up to 2 at once for 6 s: when one dies, lightning hops from the corpse."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Aim at the middle of a pack and the whole group takes damage. Against a single boss Bcc the Boss makes the copies hit harder."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "underground-cable"
      },
      {
        "category": "weapons",
        "slug": "time-clock"
      },
      {
        "category": "weapons",
        "slug": "red-tape"
      },
      {
        "category": "weapons",
        "slug": "eviction-notice"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/reply-all.png",
      "alt": "Reply All weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 72
    }
  },
  {
    "slug": "eviction-notice",
    "category": "weapons",
    "name": "Eviction Notice",
    "subtitle": "Anomalous precision weapon",
    "summary": "The Eviction Notice is an anomalous one-round rifle: a single 200 damage shot, which reloads only when it kills.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Anomalous"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "200"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Range",
        "value": "44 tiles"
      },
      {
        "label": "Energy cost",
        "value": "5.2 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Eviction Notice** is an anomalous precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is red. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires a single round that deals 200 damage with a 2x headshot multiplier and pierces two enemies. The gun does not reload normally; a kill reloads it, and a miss locks the gun for a long time. Costs 5.2 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Eviction Notice plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Certified Mail** (A)",
                  "A miss only locks the gun for 7 s.",
                  "Shot deals 10% less."
                ],
                [
                  "**Overdue** (B)",
                  "Each kill adds x1.5 to the next shot.",
                  "Lock lasts 3 s longer."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Served Papers**: A direct kill serves papers: a shockwave from the corpse shoves and stuns the foes around it, once per 2.5 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Never fire at a target you are not certain to hit. Certified Mail shortens the lockout after a miss to 7 seconds."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Anomalous"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "time-clock"
      },
      {
        "category": "weapons",
        "slug": "instant-replay"
      },
      {
        "category": "weapons",
        "slug": "reply-all"
      },
      {
        "category": "weapons",
        "slug": "underground-cable"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/eviction-notice.png",
      "alt": "Eviction Notice weapon sprite",
      "pixelated": true,
      "width": 150,
      "height": 48
    }
  },
  {
    "slug": "perfect-attendance",
    "category": "weapons",
    "name": "Perfect Attendance",
    "subtitle": "Good precision weapon",
    "summary": "Perfect Attendance rewards a clean streak: its damage builds the longer you go without being hit.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "29"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Magazine",
        "value": "7"
      },
      {
        "label": "Reload time",
        "value": "1.1 s"
      },
      {
        "label": "Range",
        "value": "30 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Perfect Attendance** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 29 damage rifle at two shots per second with a 1.5x headshot multiplier. The damage bonus grows every second you are not hit, capping at 64 percent, and is lost when you take damage. Seven-round magazine, 1.1 second reload."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Perfect Attendance plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Star Employee** (A)",
                  "The bonus grows 12% per second.",
                  "The bonus caps at 48%."
                ],
                [
                  "**Sick Day** (B)",
                  "A hit only halves the bonus.",
                  "The bonus caps at 50%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Personal Space**: While you fight, a shockwave around you shoves and stuns close foes every 3 s, to keep your streak clean."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stay behind cover and keep range. Sick Day makes a hit only halve the bonus instead of clearing it."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hunting-rifle"
      },
      {
        "category": "weapons",
        "slug": "radar-gun"
      },
      {
        "category": "weapons",
        "slug": "the-long-memo"
      },
      {
        "category": "weapons",
        "slug": "kitchen-timer"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/perfect-attendance.png",
      "alt": "Perfect Attendance weapon sprite",
      "pixelated": true,
      "width": 156,
      "height": 48
    }
  },
  {
    "slug": "block-sender",
    "category": "weapons",
    "name": "Block Sender",
    "subtitle": "Rare sidearm",
    "summary": "The Block Sender marks every zombie of the same kind as the one you hit, then lets all your weapons punish the marked species.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "38"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Magazine",
        "value": "6"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Range",
        "value": "26 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.75 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Block Sender** is a rare sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hitscan for 38 damage at two shots per second. A hit applies Mark (25 percent more damage taken for 6 seconds) to every enemy of the same kind on screen. A six-round magazine reloads in 0.8 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Block Sender plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Long Block** (A)",
                  "Mark lasts 12 s.",
                  "Mark power -10%."
                ],
                [
                  "**Spam Filter** (B)",
                  "Every foe on screen is marked.",
                  "Deals 5% less damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Inbox Zero**: Every reload sets off a blast around you that hurts everything close, so clear the inbox and keep sending."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Shoot the one runner in a pack and the whole pack is marked. It is best in a rooms full of one species and weaker against a mixed horde, where Spam Filter marks everyone but weakens the shot."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "price-tagger"
      },
      {
        "category": "weapons",
        "slug": "twin-sidearms"
      },
      {
        "category": "weapons",
        "slug": "hot-glue-gun"
      },
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/block-sender.png",
      "alt": "Block Sender weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 88
    }
  },
  {
    "slug": "instant-replay",
    "category": "weapons",
    "name": "Instant Replay",
    "subtitle": "Anomalous precision weapon",
    "summary": "The Instant Replay does no damage of its own: it replays a share of the damage you have recently dealt.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Anomalous"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "Special"
      },
      {
        "label": "Fire rate",
        "value": "1 every 6 s"
      },
      {
        "label": "Range",
        "value": "30 tiles"
      },
      {
        "label": "Energy cost",
        "value": "5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Instant Replay** is an anomalous precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is red. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires only once every 6 seconds; each shot replays 60 percent of the damage you dealt in the last 4 seconds. It costs 5 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Instant Replay plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Slow Motion** (A)",
                  "Tally window 6 s.",
                  "Replay hits at 57%."
                ],
                [
                  "**Split Screen** (B)",
                  "Replay hits up to 3 foes.",
                  "Each hit is only 30%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Second Angle**: A foe another weapon of yours hit in the last 1.5 s takes +80% from the replay, which also comes a little sooner."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire your other weapons first and use the replay on the target that took the most. Slow Motion widens the window to 6 seconds."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Anomalous"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "time-clock"
      },
      {
        "category": "weapons",
        "slug": "eviction-notice"
      },
      {
        "category": "weapons",
        "slug": "reply-all"
      },
      {
        "category": "weapons",
        "slug": "underground-cable"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/instant-replay.png",
      "alt": "Instant Replay weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 49
    }
  },
  {
    "slug": "jack-in-the-box",
    "category": "weapons",
    "name": "Jack-in-the-Box",
    "subtitle": "Good explosive launcher",
    "summary": "The Jack-in-the-Box is a mine whose box leaps up and blasts at head height.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "99 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.1 s"
      },
      {
        "label": "Blast radius",
        "value": "2.05 tiles"
      },
      {
        "label": "Energy cost",
        "value": "3.3 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Jack-in-the-Box** is a good explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Thrown to the floor, it waits until a foe is close, then springs up and explodes for 99 damage in a 2 tile radius. It fires every 1.1 seconds for 3.3 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Jack-in-the-Box plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Coil Spring** (A)",
                  "Triggers at 2 tiles.",
                  "Blast deals 10% less."
                ],
                [
                  "**Double Take** (B)",
                  "The box pops twice 0.8 s apart.",
                  "Each pop deals 40% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spilled Jacks**: One foe in every 5 that your boxes hit sheds bomblets: they burst up from it, rain down on the crowd and go off."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Lay them along the corridor you are retreating from. Double Take pops the box twice."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      },
      {
        "category": "weapons",
        "slug": "sticky-gas-can"
      },
      {
        "category": "weapons",
        "slug": "tailpipe"
      },
      {
        "category": "weapons",
        "slug": "pool-ball"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/jack-in-the-box.png",
      "alt": "Jack-in-the-Box weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 96
    }
  },
  {
    "slug": "kitchen-timer",
    "category": "weapons",
    "name": "Kitchen Timer",
    "subtitle": "Good precision weapon",
    "summary": "The Kitchen Timer tags foes, then sets them all off when the timer rings.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "12"
      },
      {
        "label": "Fire rate",
        "value": "1.7 per second"
      },
      {
        "label": "Range",
        "value": "30 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.8 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Kitchen Timer** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 12 damage hitscan shot every 0.6 seconds. Tagged foes explode when the timer runs out. Costs 1.8 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Kitchen Timer plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Expedited** (A)",
                  "Timer pops 1 s sooner.",
                  "Pop deals 20% less."
                ],
                [
                  "**Boil Over** (B)",
                  "A pop sets a 1.6 s timer on foes near.",
                  "Pop deals 30% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Grease Fire**: Every 4th shot spills a grease fire at the foe it hits: the puddle burns everyone who stands in it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Tag the whole crowd and keep moving; do not waste shots on foes that are already tagged. Boil Over chains a new timer onto the neighbours."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hunting-rifle"
      },
      {
        "category": "weapons",
        "slug": "radar-gun"
      },
      {
        "category": "weapons",
        "slug": "the-long-memo"
      },
      {
        "category": "weapons",
        "slug": "perfect-attendance"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/kitchen-timer.png",
      "alt": "Kitchen Timer weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 96
    }
  },
  {
    "slug": "cafeteria-tray",
    "category": "weapons",
    "name": "Cafeteria Tray",
    "subtitle": "Rare shotgun",
    "summary": "The Cafeteria Tray is a thrown tray that shatters into shards when it hits.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "69"
      },
      {
        "label": "Fire rate",
        "value": "1.2 per second"
      },
      {
        "label": "Energy cost",
        "value": "2.85 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Cafeteria Tray** is a rare shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A projectile for 69 damage that bursts into shards on contact, so one tray can hit several foes. It fires every 0.8 seconds for 2.85 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Cafeteria Tray plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Food Fight** (A)",
                  "Shatters into 4 more shards.",
                  "Each shard deals 25% less."
                ],
                [
                  "**Special of the Day** (B)",
                  "Tray hits 45% harder.",
                  "Only 3 shards."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Clean Plate**: Each kill fills the order, and when it is full the next tray lands in a food splat that hurts the foes around it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Aim at the middle of a group, not the closest zombie. Food Fight gives four more shards at less damage each, while Special of the Day makes the tray hit harder with only three."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "sprinkler-bow"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      },
      {
        "category": "weapons",
        "slug": "sawed-off"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/cafeteria-tray.png",
      "alt": "Cafeteria Tray weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 72
    }
  },
  {
    "slug": "popcorn-machine",
    "category": "weapons",
    "name": "Popcorn Machine",
    "subtitle": "Epic shotgun",
    "summary": "The Popcorn Machine spits kernels that stick to zombies and pop a moment later.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "Special"
      },
      {
        "label": "Fire rate",
        "value": "1.1 per second"
      },
      {
        "label": "Range",
        "value": "7 tiles"
      },
      {
        "label": "Energy cost",
        "value": "4.1 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Popcorn Machine** is an epic shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each shot sprays eight kernels over a short 7 tile range. Kernels stick to what they hit, then pop for damage after a delay. It fires every 0.95 seconds for 4.1 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Popcorn Machine plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Butter Blast** (A)",
                  "Kernels pop in a 50% wider blast.",
                  "Fires 12% slower."
                ],
                [
                  "**Burnt Batch** (B)",
                  "Kernels burn foes for 3 s.",
                  "Kernels deal 16% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Jackpot Batch**: Every 4th batch is a jackpot: all its kernels pop for far more damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Spray a crowd, then step back while the kernels pop. Burnt Batch sets stuck foes on fire."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "thousand-shards"
      },
      {
        "category": "weapons",
        "slug": "hand-heater"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/popcorn-machine.png",
      "alt": "Popcorn Machine weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 96
    }
  },
  {
    "slug": "pressure-cooker",
    "category": "weapons",
    "name": "Pressure Cooker",
    "subtitle": "Epic explosive launcher",
    "summary": "The Pressure Cooker builds pressure while you hold the trigger: a long hold means a big blast, but do not overcook it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "105 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.6 s"
      },
      {
        "label": "Blast radius",
        "value": "1.8 tiles"
      },
      {
        "label": "Energy cost",
        "value": "13.45 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pressure Cooker** is an epic explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hold to build pressure, release to throw. The blast deals 105 damage in a 1.8 tile radius, and holding too long overcooks the pot and hurts you. It fires every 1.6 seconds and costs a steep 13.45 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pressure Cooker plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Safety Valve** (A)",
                  "Vents 1 s later and hurts you 60% less.",
                  "Blasts are 10% smaller."
                ],
                [
                  "**Flash Fry** (B)",
                  "A full blast burns foes for 4 s.",
                  "Tap shots deal 30% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Steam Vent**: Every foe your pots hit fills a gauge: at 5 the next pot also vents steam jets from the muzzle as it leaves."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Hold until the glow warns you, then throw. Safety Valve reduces the damage from an overcooked pot."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "concrete-pillar"
      },
      {
        "category": "weapons",
        "slug": "demolition-drill"
      },
      {
        "category": "weapons",
        "slug": "carpet-bomber"
      },
      {
        "category": "weapons",
        "slug": "leftovers"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/pressure-cooker.png",
      "alt": "Pressure Cooker weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 104
    }
  },
  {
    "slug": "carpet-bomber",
    "category": "weapons",
    "name": "Carpet Bomber",
    "subtitle": "Epic explosive launcher",
    "summary": "The Carpet Bomber lays a line of blasts down a corridor.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "55 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.5 s"
      },
      {
        "label": "Blast radius",
        "value": "1.3 tiles"
      },
      {
        "label": "Energy cost",
        "value": "6.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Carpet Bomber** is an epic explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "One shot lands a row of seven blasts in a line, each for 55 damage in a 1.3 tile radius. It fires every 1.5 seconds for 6.5 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Carpet Bomber plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Red Carpet** (A)",
                  "The line runs 4 blasts longer.",
                  "Each blast deals 12% less."
                ],
                [
                  "**Shag Pile** (B)",
                  "Blasts leave fire for 3 s.",
                  "Line is 2 blasts shorter."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Rolling Thunder**: Every 5 kills open a 2.5 s window in which each foe your blasts hit pops again, at most a few a second."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire along the length of a hallway rather than at a single zombie. Red Carpet lengthens the line by four blasts."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "concrete-pillar"
      },
      {
        "category": "weapons",
        "slug": "demolition-drill"
      },
      {
        "category": "weapons",
        "slug": "pressure-cooker"
      },
      {
        "category": "weapons",
        "slug": "leftovers"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/carpet-bomber.png",
      "alt": "Carpet Bomber weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 63
    }
  },
  {
    "slug": "laser-pointer",
    "category": "weapons",
    "name": "Laser Pointer",
    "subtitle": "Legendary energy weapon",
    "summary": "The Laser Pointer paints foes with a red dot, and the ceiling does the rest: painted foes are struck.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "Special"
      },
      {
        "label": "Fire rate",
        "value": "10 ticks per second"
      },
      {
        "label": "Range",
        "value": "14 tiles"
      },
      {
        "label": "Energy cost",
        "value": "2 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Laser Pointer** is a legendary energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A held beam out to 14 tiles that paints up to six foes; the ceiling then strikes painted foes. The beam itself deals no damage and costs 2 energy per tick."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Laser Pointer plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Slide Deck** (A)",
                  "Paints up to 9 foes.",
                  "Strikes deal 8% less."
                ],
                [
                  "**Bullet Point** (B)",
                  "A struck foe is struck again 0.5 s later.",
                  "Paints only 4 foes."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Three Strikes**: The 3rd ceiling strike on one foe within 2.5 s sends out a shockwave that shoves the crowd."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Sweep the dot across the whole crowd and let it work. Slide Deck raises the number of painted foes to nine."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "coolant-hose"
      },
      {
        "category": "weapons",
        "slug": "overhead-projector"
      },
      {
        "category": "weapons",
        "slug": "main-breaker"
      },
      {
        "category": "weapons",
        "slug": "10000w-bulb"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/laser-pointer.png",
      "alt": "Laser Pointer weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 48
    }
  },
  {
    "slug": "hot-potato",
    "category": "weapons",
    "name": "Hot Potato",
    "subtitle": "Rare explosive launcher",
    "summary": "The Hot Potato sticks to a foe, then hops to the next one, burning as it goes.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "18 + 60 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Blast radius",
        "value": "1.5 tiles"
      },
      {
        "label": "Energy cost",
        "value": "3.55 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hot Potato** is a rare explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A thrown potato that deals 18 impact damage and sets the target on fire (6 damage per second for 2 seconds), then hops between foes before bursting for 60 damage in a 1.5 tile radius. It fires once a second for 3.55 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hot Potato plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Chefs Kiss** (A)",
                  "2 more hops.",
                  "Landings deal 13% less."
                ],
                [
                  "**Extra Crispy** (B)",
                  "Landings burn 10 DPS for 4 s.",
                  "Blast deals 25% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Well Done**: One potato in every 3 also sets fire to every foe around the spot where it lands."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Throw it at the first zombie in a pack and let it work through the crowd. Chef's Kiss adds two hops."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pool-ball"
      },
      {
        "category": "weapons",
        "slug": "emergency-elevator"
      },
      {
        "category": "weapons",
        "slug": "bathtub-drain"
      },
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/hot-potato.png",
      "alt": "Hot Potato weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 96
    }
  },
  {
    "slug": "tailpipe",
    "category": "weapons",
    "name": "Tailpipe",
    "subtitle": "Good explosive launcher",
    "summary": "The Tailpipe fires a shell forward and a blast out the back: every shot also hits foes behind you.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "85 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Magazine",
        "value": "4"
      },
      {
        "label": "Reload time",
        "value": "1.1 s"
      },
      {
        "label": "Blast radius",
        "value": "1.4 tiles"
      },
      {
        "label": "Energy cost",
        "value": "3 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Tailpipe** is a good explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each shell explodes for 85 damage in a 1.4 tile radius, and a second blast of the same size goes off behind the shooter. Four-shell magazine, 1.1 second reload, 3 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Tailpipe plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Twin Turbo** (A)",
                  "The rear blast reaches 50% farther.",
                  "The front shell deals 10% less."
                ],
                [
                  "**Cold Start** (B)",
                  "The rear blast slows foes 40% for 1.5 s.",
                  "The rear blast deals 30% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Backfire**: While you fire it, being hurt sets off the exhaust: half a second later a ring shoves and stuns, at most every 2 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it when you are being chased through a corridor with enemies on both sides. Cold Start makes the rear blast slow foes."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      },
      {
        "category": "weapons",
        "slug": "sticky-gas-can"
      },
      {
        "category": "weapons",
        "slug": "jack-in-the-box"
      },
      {
        "category": "weapons",
        "slug": "pool-ball"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/tailpipe.png",
      "alt": "Tailpipe weapon sprite",
      "pixelated": true,
      "width": 138,
      "height": 54
    }
  },
  {
    "slug": "vending-cannon",
    "category": "weapons",
    "name": "Vending Cannon",
    "subtitle": "Legendary explosive launcher",
    "summary": "The Vending Cannon lobs an entire [[items/vending-machine|vending machine]] at the horde. A kill pays energy back.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "375 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 2.4 s"
      },
      {
        "label": "Blast radius",
        "value": "1.7 tiles"
      },
      {
        "label": "Energy cost",
        "value": "12.5 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Vending Cannon** is a legendary explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A lobbed machine that explodes for 375 damage in a 1.7 tile radius and stuns for 1 second. It fires every 2.4 seconds and costs 12.5 energy, but kills made with it pay energy back."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Vending Cannon plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Exact Change** (A)",
                  "Pays 6 energy per kill.",
                  "The blast deals 8% less."
                ],
                [
                  "**Bulk Order** (B)",
                  "Drops a 2nd machine 0.4 s later.",
                  "The second one deals 49% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Shaken Soda**: One kill in every 4 shakes a soda loose: half a second later it fizzes over in a ring that shoves foes away."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it on bosses and packed crowds, where the refund adds up. Bulk Order drops a second machine 0.4 seconds later."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "firework-chain"
      },
      {
        "category": "weapons",
        "slug": "concrete-pillar"
      },
      {
        "category": "weapons",
        "slug": "demolition-drill"
      },
      {
        "category": "weapons",
        "slug": "pressure-cooker"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/vending-cannon.png",
      "alt": "Vending Cannon weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 96
    }
  },
  {
    "slug": "moth-jar",
    "category": "weapons",
    "name": "Moth Jar",
    "subtitle": "Good sidearm",
    "summary": "The Moth Jar releases a swarm of moths that fly off and hunt zombies by themselves.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "6"
      },
      {
        "label": "Fire rate",
        "value": "1.1 per second"
      },
      {
        "label": "Energy cost",
        "value": "2.7 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Moth Jar** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each throw releases four moths (a 6-damage bite each) that seek enemies without any aiming. Shots are silent and cost 2.7 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Moth Jar plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Swarm Season** (A)",
                  "6 moths per shot.",
                  "Fires 30% slower."
                ],
                [
                  "**Lone Moth** (B)",
                  "1 moth per shot that bites x4 harder.",
                  "No swarm."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Pheromones**: 3 hits on one foe within 3 s mark it and the foes right next to it, so every weapon hits them harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Throw it into a room and back off: the moths do the hunting. Lone Moth gives you a single strong moth that bites four times harder if you want focused damage."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "flare-gun"
      },
      {
        "category": "weapons",
        "slug": "paper-planes"
      },
      {
        "category": "weapons",
        "slug": "fridge-magnet"
      },
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/moth-jar.png",
      "alt": "Moth Jar weapon sprite",
      "pixelated": true,
      "width": 120,
      "height": 96
    }
  },
  {
    "slug": "laserdisc-slinger",
    "category": "weapons",
    "name": "Laserdisc Slinger",
    "subtitle": "Rare automatic weapon",
    "summary": "The Laserdisc Slinger throws discs that bounce around the room, slicing everything they cross.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "27"
      },
      {
        "label": "Fire rate",
        "value": "1.2 per second"
      },
      {
        "label": "Energy cost",
        "value": "2.85 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Laserdisc Slinger** is a rare automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each disc deals 27 damage to up to 8 enemies it passes through and bounces off surfaces up to 5 times. It fires one disc every 0.8 seconds for 2.85 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Laserdisc Slinger plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Double Feature** (A)",
                  "Throws 2 discs at once.",
                  "Fires 40% slower."
                ],
                [
                  "**Scratched Copy** (B)",
                  "Discs bounce 3 more times and last 5 s.",
                  "Disc damage -20%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Royalties**: Every foe your discs kill adds a stacking damage boost that lasts 1.5 s, and a still throw hits harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Throw it into a room with a few walls and let the discs ricochet. Scratched Copy adds three more bounces."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "work-week"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      },
      {
        "category": "weapons",
        "slug": "boiler-torch"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/laserdisc-slinger.png",
      "alt": "Laserdisc Slinger weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 80
    }
  },
  {
    "slug": "fire-extinguisher",
    "category": "weapons",
    "name": "Fire Extinguisher",
    "subtitle": "Rare automatic weapon",
    "summary": "The Fire Extinguisher sprays a slowing foam stream, and aiming it downward lifts you off the floor.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8 per tick"
      },
      {
        "label": "Fire rate",
        "value": "10 ticks per second"
      },
      {
        "label": "Range",
        "value": "6.5 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.35 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Fire Extinguisher** is a rare automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A held beam of foam that reaches 6.5 tiles and ticks every 0.1 seconds for 8 damage; it slows hit foes by 40 percent. Aim down to hover. It costs 0.35 energy per tick."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Fire Extinguisher plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**CO2 Blast** (A)",
                  "Stream slows foes by 60%.",
                  "Stream is 2 tiles shorter."
                ],
                [
                  "**Retro Rocket** (B)",
                  "Hover lift is 50% stronger.",
                  "Foam slows 30% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Soaked**: A foe that takes 8 hits of foam within 2 s is soaked and takes more damage from everything for a while."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Hover over a gap while you spray the horde below. CO2 Blast slows by 60 percent; Retro Rocket gives you more lift."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "boiler-torch"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      },
      {
        "category": "weapons",
        "slug": "pneumatic-tube"
      },
      {
        "category": "weapons",
        "slug": "laserdisc-slinger"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/fire-extinguisher.png",
      "alt": "Fire Extinguisher weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 72
    }
  },
  {
    "slug": "cctv",
    "category": "weapons",
    "name": "CCTV",
    "subtitle": "Rare energy weapon",
    "summary": "The CCTV is a beam that locks on to a foe by itself, and the longer it holds the lock the harder it hits.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "3.2 per tick"
      },
      {
        "label": "Fire rate",
        "value": "12.5 ticks per second"
      },
      {
        "label": "Range",
        "value": "10 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.3 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **CCTV** is a rare energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A beam that auto-locks within a 60 degree cone out to 10 tiles. It ticks every 0.08 seconds for 3.2 damage, ramping up the longer the lock holds. It costs 0.3 energy per tick."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how CCTV plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Wide Angle** (A)",
                  "Locks foes in a 40% wider cone.",
                  "The ramp takes 30% longer."
                ],
                [
                  "**Night Vision** (B)",
                  "A kill keeps 100% of the ramp.",
                  "The ramp peaks 20% lower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Unblinking Eye**: Every 12 hits in a row without losing the lock add a stack of damage, and the stacks fade 2 s after the lock breaks."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Keep the lock on a single tough enemy rather than switching. Night Vision keeps the ramp when you make a kill."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "coolant-hose"
      },
      {
        "category": "weapons",
        "slug": "overhead-projector"
      },
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "microwave"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/cctv.png",
      "alt": "CCTV weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "overhead-projector",
    "category": "weapons",
    "name": "Overhead Projector",
    "subtitle": "Epic energy weapon",
    "summary": "The Overhead Projector throws a wide beam of light that sweeps the room.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "11 x 9 pellets per tick"
      },
      {
        "label": "Fire rate",
        "value": "12.5 ticks per second"
      },
      {
        "label": "Range",
        "value": "11 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.35 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Overhead Projector** is an epic energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A swept beam of nine rays of 11 damage each, ticking every 0.08 seconds out to 11 tiles and piercing up to 7 enemies. It costs 0.35 energy per tick."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Overhead Projector plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Lock on** (A)",
                  "Sweep slows 60% when it hits a foe.",
                  "Sweep is 20% narrower."
                ],
                [
                  "**Slide Show** (B)",
                  "Sweep is 10% wider at 30% more speed.",
                  "Beam deals 4% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Burned in**: The longer the light stays on a foe the more it takes, up to +22%, and the count rests when the light leaves for 1.6 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stand in the middle of a room and let the sweep cover the whole circle. Slide Show widens and speeds up the sweep."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "coolant-hose"
      },
      {
        "category": "weapons",
        "slug": "laser-pointer"
      },
      {
        "category": "weapons",
        "slug": "cctv"
      },
      {
        "category": "weapons",
        "slug": "substation"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/overhead-projector.png",
      "alt": "Overhead Projector weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 70
    }
  },
  {
    "slug": "main-breaker",
    "category": "weapons",
    "name": "Main Breaker",
    "subtitle": "Anomalous energy weapon",
    "summary": "The Main Breaker dumps the entire energy bar into one beam, and the lamp dies with it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Anomalous"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "6 per tick"
      },
      {
        "label": "Fire rate",
        "value": "10 ticks per second"
      },
      {
        "label": "Range",
        "value": "12 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.5 per tick"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Main Breaker** is an anomalous energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is red. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A beam that deals 6 damage per tick out to 12 tiles and pierces four enemies; the beam builds toward a peak as the bar drains and stops when it is empty, leaving your lamp out. It costs 1.5 energy per tick."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Main Breaker plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Surge Protector** (A)",
                  "Keeps 15 energy when it trips.",
                  "Beam peaks 10% lower."
                ],
                [
                  "**Black Start** (B)",
                  "Beam peaks 35% higher.",
                  "Needs 60 energy to start."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Depth Charge**: The beam pierces 1 more foe and each deeper foe in the line takes +5% more than the one in front."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Save it for the moment you need to clear a corridor, and carry a spare battery. Surge Protector keeps 15 energy when the breaker trips."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Anomalous"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "laser-pointer"
      },
      {
        "category": "weapons",
        "slug": "coolant-hose"
      },
      {
        "category": "weapons",
        "slug": "overhead-projector"
      },
      {
        "category": "weapons",
        "slug": "10000w-bulb"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/main-breaker.png",
      "alt": "Main Breaker weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 80
    }
  },
  {
    "slug": "stair-coil",
    "category": "weapons",
    "name": "Stair Coil",
    "subtitle": "Common sidearm",
    "summary": "The Stair Coil is a springy slinky that walks toward zombies and flops through the line.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "29"
      },
      {
        "label": "Fire rate",
        "value": "1.3 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.95 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Stair Coil** is a common sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A projectile spring that hops toward foes for 29 damage per hit, passing through up to eight enemies. It is silent and costs 1.95 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Stair Coil plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Extra Coils** (A)",
                  "3 more hops.",
                  "Each hop deals 20% less."
                ],
                [
                  "**Final Flop** (B)",
                  "Final hop slams for 3x damage.",
                  "None"
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spark Coil**: Every 3 kills the coil charges up for 3 s, and each stomp it makes jumps a spark to another foe."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it on a crowd lined up in a corridor. Extra Coils adds three more hops, and Final Flop turns the last hop into a triple-damage slam."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "flare-gun"
      },
      {
        "category": "weapons",
        "slug": "paper-planes"
      },
      {
        "category": "weapons",
        "slug": "moth-jar"
      },
      {
        "category": "weapons",
        "slug": "fridge-magnet"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/stair-coil.png",
      "alt": "Stair Coil weapon sprite",
      "pixelated": true,
      "width": 136,
      "height": 80
    }
  },
  {
    "slug": "desk-yo-yo",
    "category": "weapons",
    "name": "Desk Yo-Yo",
    "subtitle": "Epic sidearm",
    "summary": "The Desk Yo-Yo is a hovering yo-yo you sweep through a crowd by holding the trigger.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "37"
      },
      {
        "label": "Fire rate",
        "value": "1.2 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.1 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Desk Yo-Yo** is an epic sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Throwing it sends the yo-yo out to about 6.5 tiles; while you hold, it hovers and follows your aim, hitting for 37 damage and piercing up to eight foes. It is silent and costs 1.1 energy a throw."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Desk Yo-Yo plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Walk the Dog** (A)",
                  "Hover follows aim 50% faster.",
                  "-10% DPS."
                ],
                [
                  "**Loop the Loop** (B)",
                  "Snap back hits 3x and drags foes in.",
                  "None"
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Sparks Fly**: A kill by the yo-yo throws sparks that set the foes around it alight, once per 0.5 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Hold it over a doorway and sweep the aim left to right. Walk the Dog makes the hover follow your aim faster; Loop the Loop pays for a snap-back that drags foes in."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "access-badge"
      },
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      },
      {
        "category": "weapons",
        "slug": "helping-hand"
      },
      {
        "category": "weapons",
        "slug": "flare-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/desk-yo-yo.png",
      "alt": "Desk Yo-Yo weapon sprite",
      "pixelated": true,
      "width": 64,
      "height": 48
    }
  },
  {
    "slug": "access-badge",
    "category": "weapons",
    "name": "Access Badge",
    "subtitle": "Epic sidearm",
    "summary": "The Access Badge is a throwable keycard: throw it, and swipe to blink to where it landed.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "100"
      },
      {
        "label": "Fire rate",
        "value": "1.7 per second"
      },
      {
        "label": "Energy cost",
        "value": "4 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Access Badge** is an epic sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A projectile for 100 damage that flies up to 12 tiles. After it lands you can swipe to teleport to it, which also creates a burst around you; the swipe has a 1.8 second cooldown and costs 4 energy per throw."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Access Badge plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Tailgate** (A)",
                  "Swipe burst +40% radius.",
                  "-1 s window."
                ],
                [
                  "**Fast Pass** (B)",
                  "Immune 0.8 s after a swipe.",
                  "-20% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Intruder Alert**: When one hit takes 10% of your health, an alarm makes the foes around you take more damage, once per 5 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "It is both an attack and an escape: throw it across a pit or behind the horde and blink out of a bad spot. Fast Pass gives 0.8 seconds of immunity after the swipe at some damage cost."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "desk-yo-yo"
      },
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      },
      {
        "category": "weapons",
        "slug": "helping-hand"
      },
      {
        "category": "weapons",
        "slug": "flare-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/access-badge.png",
      "alt": "Access Badge weapon sprite",
      "pixelated": true,
      "width": 112,
      "height": 96
    }
  },
  {
    "slug": "fridge-magnet",
    "category": "weapons",
    "name": "Fridge Magnet",
    "subtitle": "Good sidearm",
    "summary": "The Fridge Magnet sticks to a zombie and bends your bullets toward it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "20"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Energy cost",
        "value": "3 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Fridge Magnet** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A silent 20 damage projectile that attaches to the foe it hits. While it is stuck on a foe, your shots snap toward it. Costs 3 energy a throw."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Fridge Magnet plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Strong Pole** (A)",
                  "Bend radius +1.5 tiles.",
                  "Mark -10%."
                ],
                [
                  "**Magnetic Personality** (B)",
                  "Every snapped shot deals +10% damage.",
                  "None"
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Field Lines**: When the magnet lands on a new foe, every foe near it is marked too, so all your weapons hit them harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stick it to the biggest zombie and your off-target shots still land. Strong Pole widens the bend; Magnetic Personality adds 10 percent damage to every snapped shot."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "flare-gun"
      },
      {
        "category": "weapons",
        "slug": "paper-planes"
      },
      {
        "category": "weapons",
        "slug": "moth-jar"
      },
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/fridge-magnet.png",
      "alt": "Fridge Magnet weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "pencil-bow",
    "category": "weapons",
    "name": "Pencil Bow",
    "subtitle": "Common precision weapon",
    "summary": "The Pencil Bow is a draw-based bow: hold to draw, and a full draw makes the arrow pierce.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "68"
      },
      {
        "label": "Fire rate",
        "value": "5 per second"
      },
      {
        "label": "Energy cost",
        "value": "2.6 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Pencil Bow** is a common precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "An arrow bow dealing 68 damage with a 2x headshot multiplier. The arrow pierces only on a full draw. It costs 2.6 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Pencil Bow plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Sharp Points** (A)",
                  "Full draw hits deal +30% damage.",
                  "Full draw takes 15% longer."
                ],
                [
                  "**Recycled Lead** (B)",
                  "Arrows in walls give back 40% energy.",
                  "-10% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Shading**: Each hit in a row on the same foe shades it for +4% damage, up to +20%, and the shading fades after 3 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Time the draw before the zombie reaches you. Recycled Lead refunds 40 percent energy when an arrow lands in a wall."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ruler-crossbow"
      },
      {
        "category": "weapons",
        "slug": "bounced-check"
      },
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "metronome-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/pencil-bow.png",
      "alt": "Pencil Bow weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 88
    }
  },
  {
    "slug": "hole-punch-bow",
    "category": "weapons",
    "name": "Hole Punch Bow",
    "subtitle": "Good precision weapon",
    "summary": "The Hole Punch Bow nocks one more arrow for every 0.4 seconds you hold the draw.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "46"
      },
      {
        "label": "Fire rate",
        "value": "1.4 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.4 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Hole Punch Bow** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each arrow deals 46 damage; holding the draw nocks up to four arrows that fly together. It costs 1.4 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Hole Punch Bow plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Two More Holes** (A)",
                  "Nock up to 6 arrows.",
                  "Draw 10% slower."
                ],
                [
                  "**Stacked Sheet** (B)",
                  "Arrows fly straight and pierce 1 foe.",
                  "-20% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Perforated**: 3 arrows into one foe within 2.5 s perforate it and it tears open in a confetti pop that hits foes near it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Hold longer against a big target and tap against small ones. Two More Holes raises the limit to six arrows."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "metronome-bow"
      },
      {
        "category": "weapons",
        "slug": "ruler-crossbow"
      },
      {
        "category": "weapons",
        "slug": "pencil-bow"
      },
      {
        "category": "weapons",
        "slug": "cursor-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/hole-punch-bow.png",
      "alt": "Hole Punch Bow weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 88
    }
  },
  {
    "slug": "metronome-bow",
    "category": "weapons",
    "name": "Metronome Bow",
    "subtitle": "Good precision weapon",
    "summary": "The Metronome Bow keeps a beat: release on the beat for a perfect shot.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "48"
      },
      {
        "label": "Fire rate",
        "value": "3.3 per second"
      },
      {
        "label": "Energy cost",
        "value": "5.4 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Metronome Bow** is a good precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 48 damage bow with a 1.5x headshot multiplier. Releasing on the beat makes the shot perfect. It costs 5.4 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Metronome Bow plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Double Time** (A)",
                  "Beats come 30% faster.",
                  "Window -25%."
                ],
                [
                  "**Echo Beat** (B)",
                  "Perfect shot echoes a 2nd arrow at 50%.",
                  "Fires 10% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **In the Pocket**: 2 shots in a steady beat, about 1.2 s apart, make the next one hit +80% harder, on top of a perfect release."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Learn the rhythm and fire on it. Echo Beat gives each perfect shot a second arrow."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "ruler-crossbow"
      },
      {
        "category": "weapons",
        "slug": "pencil-bow"
      },
      {
        "category": "weapons",
        "slug": "cursor-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/metronome-bow.png",
      "alt": "Metronome Bow weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "cursor-bow",
    "category": "weapons",
    "name": "Cursor Bow",
    "subtitle": "Rare precision weapon",
    "summary": "The Cursor Bow fires an arrow that follows your aim after it has left the string.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "100"
      },
      {
        "label": "Fire rate",
        "value": "3.3 per second"
      },
      {
        "label": "Energy cost",
        "value": "3.55 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Cursor Bow** is a rare precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 100 damage arrow with a 1.5x headshot multiplier that can be steered by your aim for a short time after release. It costs 3.55 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Cursor Bow plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Long String** (A)",
                  "Steers 1 s longer.",
                  "Flies 20% slower."
                ],
                [
                  "**Beeline** (B)",
                  "Steered arrow pierces 1 foe.",
                  "-12% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Snap to Target**: The cursor snaps a box onto the biggest threat in reach, and that foe takes +20% from every arrow of this bow."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Shoot around corners by steering past cover. Long String extends the steering time by a second."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "fork-in-the-road"
      },
      {
        "category": "weapons",
        "slug": "action-items"
      },
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "metronome-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/cursor-bow.png",
      "alt": "Cursor Bow weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 63
    }
  },
  {
    "slug": "fork-in-the-road",
    "category": "weapons",
    "name": "Fork in the Road",
    "subtitle": "Rare precision weapon",
    "summary": "The Fork in the Road splits its arrow in three; how long you draw decides where the split happens.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "46"
      },
      {
        "label": "Fire rate",
        "value": "3.3 per second"
      },
      {
        "label": "Energy cost",
        "value": "3.7 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Fork in the Road** is a rare precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each arrow deals 46 damage and splits into three. It costs 3.7 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Fork in the Road plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Wide Load** (A)",
                  "Fork angle +60%.",
                  "Forks deal 10% less."
                ],
                [
                  "**Five-Way** (B)",
                  "Splits in 5.",
                  "Each fork deals 30% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Second Fork**: Every 6 hits a fan of rays flies on from the foe, each for part of the hit's damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "The length of your draw decides where the arrow splits, so practice the draw against the distance to your target. Five-Way splits into five at reduced damage."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "cursor-bow"
      },
      {
        "category": "weapons",
        "slug": "action-items"
      },
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "metronome-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/fork-in-the-road.png",
      "alt": "Fork in the Road weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "long-weekend",
    "category": "weapons",
    "name": "Long Weekend",
    "subtitle": "Epic precision weapon",
    "summary": "The Long Weekend is an epic bow whose long draw stuns every foe along the arrow's path.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "120"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Energy cost",
        "value": "7.8 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Long Weekend** is an epic precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 120 damage arrow that pierces everything in line and stuns each foe it hits for 2 seconds. It costs 7.8 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Long Weekend plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Read Receipt** (A)",
                  "Stunned foes take +30% damage.",
                  "-1 s stun."
                ],
                [
                  "**Extra Day** (B)",
                  "Stun lasts 50% longer.",
                  "Draw 20% slower."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Auto Reply**: When an enemy hits you, an auto-reply ring shoves and briefly stuns foes near you, ready again after 3 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Draw fully in a corridor to freeze the whole line, then follow up. Read Receipt makes stunned foes take 30 percent more damage."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "cursor-bow"
      },
      {
        "category": "weapons",
        "slug": "fork-in-the-road"
      },
      {
        "category": "weapons",
        "slug": "exit-interview"
      },
      {
        "category": "weapons",
        "slug": "action-items"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/long-weekend.png",
      "alt": "Long Weekend weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 63
    }
  },
  {
    "slug": "work-week",
    "category": "weapons",
    "name": "Work Week",
    "subtitle": "Epic automatic weapon",
    "summary": "The Work Week fires bolts in a fixed five-day cycle, Monday to Friday, each with its own role.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "52"
      },
      {
        "label": "Fire rate",
        "value": "2.2 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.95 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Work Week** is an epic automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A projectile weapon firing 52 damage bolts at 2.2 shots per second; five bolts form one week, always in the same order. Headshots deal 1.5 times damage. Each shot costs 1.95 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Work Week plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Blue Monday** (A)",
                  "Monday hits 40% harder.",
                  "Friday -40%."
                ],
                [
                  "**Four Day Week** (B)",
                  "No Tuesday bolt and fires 15% faster.",
                  "-10% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Head Office**: A headshot or crit bolt bursts into a blast at the foe, at most every 1.5 s, and sitting still hits harder."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Memorise the order and time the strongest bolts for the biggest enemies. Blue Monday boosts the first of the week at the cost of Friday."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "laserdisc-slinger"
      },
      {
        "category": "weapons",
        "slug": "industrial-printer"
      },
      {
        "category": "weapons",
        "slug": "the-chisel"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/work-week.png",
      "alt": "Work Week weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 70
    }
  },
  {
    "slug": "exit-interview",
    "category": "weapons",
    "name": "Exit Interview",
    "subtitle": "Legendary precision weapon",
    "summary": "The Exit Interview is a legendary bolt gun that skewers a foe and pins it to the wall.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Legendary"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "270"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.6 s"
      },
      {
        "label": "Energy cost",
        "value": "8.3 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Exit Interview** is a legendary precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is orange. It does not drop on the first floor and becomes more likely the deeper you go."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 270 damage bolt every 1.6 seconds over 16 tiles. A hit pins the target to a wall for 3 seconds. It costs 8.3 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Exit Interview plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Performance Plan** (A)",
                  "Pinned foes take +35% for 4 s.",
                  "-20% slam."
                ],
                [
                  "**Final Paycheck** (B)",
                  "Pin splashes 40% to foes within 2 tiles.",
                  "None"
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Third Warning**: Every 3 shots the bolt lands a final notice: a blast around the foe that hits everyone near it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Fire at big enemies that stand near a wall. Performance Plan makes pinned foes take 35 percent more damage."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Legendary"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "long-weekend"
      },
      {
        "category": "weapons",
        "slug": "reply-all"
      },
      {
        "category": "weapons",
        "slug": "cursor-bow"
      },
      {
        "category": "weapons",
        "slug": "fork-in-the-road"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/exit-interview.png",
      "alt": "Exit Interview weapon sprite",
      "pixelated": true,
      "width": 156,
      "height": 48
    }
  },
  {
    "slug": "bounced-check",
    "category": "weapons",
    "name": "Bounced Check",
    "subtitle": "Common precision weapon",
    "summary": "The Bounced Check ricochets off walls and hits harder with every bounce.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "36"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.3 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Bounced Check** is a common precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A 36 damage bolt that bounces up to 3 times, growing stronger with each bounce. It costs 1.3 energy per shot, making it one of the cheapest precision weapons."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Bounced Check plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Stop Payment** (A)",
                  "2 more bounces.",
                  "Base damage -15%."
                ],
                [
                  "**Compound Interest** (B)",
                  "Each bounce adds +46%.",
                  "Only 2 bounces."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Sufficient Funds**: Every 5 hits fill the account, and the next bolt clears for +90% damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Bank shots around corners and off ceilings. Compound Interest adds 46 percent per bounce, with only 2 bounces."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "ruler-crossbow"
      },
      {
        "category": "weapons",
        "slug": "pencil-bow"
      },
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "metronome-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/bounced-check.png",
      "alt": "Bounced Check weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 80
    }
  },
  {
    "slug": "action-items",
    "category": "weapons",
    "name": "Action Items",
    "subtitle": "Rare precision weapon",
    "summary": "Action Items lets you hang bolts in place with a tap, then assign them all to targets with a hold.",
    "infobox": [
      {
        "label": "Family",
        "value": "Precision"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "50"
      },
      {
        "label": "Fire rate",
        "value": "2.9 per second"
      },
      {
        "label": "Energy cost",
        "value": "1.65 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Action Items** is a rare precision weapon. Precision weapons deliver heavy single hits at long range.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Each bolt deals 50 damage and pierces one foe. A tap hangs a bolt where you aim; holding assigns every hanging bolt to its target. Up to three can hang at once. It costs 1.65 energy per bolt."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Precision weapons also gain +1 pierce and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Action Items plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**High Priority** (A)",
                  "Hang up to 5 bolts.",
                  "-10% damage."
                ],
                [
                  "**Auto Assign** (B)",
                  "Bolts spring on a passing foe.",
                  "-14% damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Follow Up**: Each kill flags the foes beside it for a follow up, and flagged foes take more from every source, at most every 1 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Lay bolts across a doorway while retreating, then release them as the horde arrives. High Priority raises the limit to five."
        ]
      }
    ],
    "tags": [
      "Precision",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "cursor-bow"
      },
      {
        "category": "weapons",
        "slug": "fork-in-the-road"
      },
      {
        "category": "weapons",
        "slug": "hole-punch-bow"
      },
      {
        "category": "weapons",
        "slug": "metronome-bow"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/action-items.png",
      "alt": "Action Items weapon sprite",
      "pixelated": true,
      "width": 138,
      "height": 54
    }
  },
  {
    "slug": "sprinkler-bow",
    "category": "weapons",
    "name": "Sprinkler Bow",
    "subtitle": "Rare shotgun",
    "summary": "The Sprinkler Bow loosens arrows that fall like rain where you aim, slowing whatever they land on.",
    "infobox": [
      {
        "label": "Family",
        "value": "Shotgun"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "21"
      },
      {
        "label": "Fire rate",
        "value": "2 per second"
      },
      {
        "label": "Energy cost",
        "value": "4.95 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Sprinkler Bow** is a rare shotgun. Shotguns fire spreads of pellets and hit hardest up close.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "How long you draw sets where the arrows rain. Each arrow deals 21 damage and slows its target by 25 percent for 2 seconds. A shot costs 4.95 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Shotgun weapons also gain +1 pellet and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Sprinkler Bow plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Downpour** (A)",
                  "Rain patch +50% wider.",
                  "-8% damage."
                ],
                [
                  "**Fire Alarm** (B)",
                  "Arrows set foes alight 6 DPS for 2 s.",
                  "None"
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Storm Chaser**: A foe the rain kills soaks the ground around it and slows the foes standing there, at most once every 2 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Drop a rain on a doorway before the horde reaches it. Fire Alarm adds burning to the arrows."
        ]
      }
    ],
    "tags": [
      "Shotgun",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "cafeteria-tray"
      },
      {
        "category": "weapons",
        "slug": "leaf-blower"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      },
      {
        "category": "weapons",
        "slug": "sawed-off"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/sprinkler-bow.png",
      "alt": "Sprinkler Bow weapon sprite",
      "pixelated": true,
      "width": 154,
      "height": 70
    }
  },
  {
    "slug": "squirt-gun",
    "category": "weapons",
    "name": "Squirt Gun",
    "subtitle": "Common sidearm",
    "summary": "The Squirt Gun soaks zombies with water. It is a cheap, fast sidearm that primes enemies for electric weapons.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8"
      },
      {
        "label": "Fire rate",
        "value": "8.3 per second"
      },
      {
        "label": "Range",
        "value": "9 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.3 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Squirt Gun** is a common sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A hitscan water stream for 8 damage at 8.3 shots per second, 9 tile range, costing just 0.3 energy. Soaked zombies are vulnerable to shock."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Squirt Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Firehose Pressure** (A)",
                  "Stream reaches 14 tiles.",
                  "Wet lasts 2 s less."
                ],
                [
                  "**Rinse Cycle** (B)",
                  "Soaked foes move 25% slower.",
                  "6% less damage."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Water Pressure**: The longer you hold fire the harder it hits, up to +28% after a few seconds, and a 1.5 s pause lets it fall."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Soak the horde, then switch to the [[weapons/shock-socket|Shock Socket]], a [[weapons/substation|Substation]] or any other electric weapon: wet zombies conduct shock. Firehose Pressure extends the stream to 14 tiles."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "duty-pistol"
      },
      {
        "category": "weapons",
        "slug": "nail-gun"
      },
      {
        "category": "weapons",
        "slug": "plumb-bob"
      },
      {
        "category": "weapons",
        "slug": "final-demand"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/squirt-gun.png",
      "alt": "Squirt Gun weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 104
    }
  },
  {
    "slug": "thumbtack-gun",
    "category": "weapons",
    "name": "Thumbtack Gun",
    "subtitle": "Common automatic weapon",
    "summary": "The Thumbtack Gun is a rapid-fire pin gun that leaves tacks on the floor for zombies to step on.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "8"
      },
      {
        "label": "Fire rate",
        "value": "6.2 per second"
      },
      {
        "label": "Magazine",
        "value": "30"
      },
      {
        "label": "Reload time",
        "value": "1.1 s"
      },
      {
        "label": "Energy cost",
        "value": "0.4 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Thumbtack Gun** is a common automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 8 damage tacks at 6.25 per second. Tacks that miss stay on the floor and bite foes who walk over them. A 30-round magazine reloads in 1.1 seconds, at 0.4 energy a shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Thumbtack Gun plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Tack Field** (A)",
                  "Tacks bite 3 times.",
                  "Each bite deals 25% less."
                ],
                [
                  "**Push Pin** (B)",
                  "Tack bites pin the foe for 1 s.",
                  "Tacks last 2 s less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Punch Through**: Every tack goes through 1 more foe, and a foe hit right after another takes +10% more."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Spray the floor at a chokepoint as you retreat. Tack Field lets each tack bite three times."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "stapler-smg"
      },
      {
        "category": "weapons",
        "slug": "laserdisc-slinger"
      },
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "rivet-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/thumbtack-gun.png",
      "alt": "Thumbtack Gun weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 70
    }
  },
  {
    "slug": "bathtub-drain",
    "category": "weapons",
    "name": "Bathtub Drain",
    "subtitle": "Rare explosive launcher",
    "summary": "The Bathtub Drain opens a drain on the floor that pulls foes in, then flushes.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "80 blast"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.8 s"
      },
      {
        "label": "Blast radius",
        "value": "1.5 tiles"
      },
      {
        "label": "Energy cost",
        "value": "6.4 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Bathtub Drain** is a rare explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A lobbed shell that creates a pulling well; foes nearby are dragged to the centre and the drain flushes for 80 damage in a 1.5 tile radius. It fires every 1.8 seconds for 6.4 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Bathtub Drain plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Flush Twice** (A)",
                  "The well ends with 2 flushes.",
                  "Well lasts 1 s less."
                ],
                [
                  "**Wide Open** (B)",
                  "Well is 40% wider and pulls 30% harder.",
                  "Flush deals 15% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Short Circuit**: When a drain flushes with 3 or more soaked foes in it, lightning jumps through the whole pile."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it to gather a spread-out horde before following up with a second blast."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pool-ball"
      },
      {
        "category": "weapons",
        "slug": "emergency-elevator"
      },
      {
        "category": "weapons",
        "slug": "hot-potato"
      },
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/bathtub-drain.png",
      "alt": "Bathtub Drain weapon sprite",
      "pixelated": true,
      "width": 147,
      "height": 70
    }
  },
  {
    "slug": "security-gate",
    "category": "weapons",
    "name": "Security Gate",
    "subtitle": "Rare energy weapon",
    "summary": "The Security Gate fires a laser fence into the floor that hurts anyone who crosses it.",
    "infobox": [
      {
        "label": "Family",
        "value": "Energy"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "38"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.4 s"
      },
      {
        "label": "Range",
        "value": "12 tiles"
      },
      {
        "label": "Energy cost",
        "value": "4.95 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Security Gate** is a rare energy weapon. Energy weapons are powered by the same battery as your lamp.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Places a laser gate that deals 38 damage to every foe crossing it and slows them by 40 percent. It fires every 1.4 seconds for 4.95 energy a gate."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Energy weapons also gain -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Security Gate plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Extra Shift** (A)",
                  "Up to 3 gates stand at once.",
                  "Gates last 2 s less."
                ],
                [
                  "**Alarm Tripped** (B)",
                  "Foes that cross are marked for 30%.",
                  "Gate deals 15% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Hands Off**: When a foe hits you, a blast goes off around you and hurts every foe next to you, at most every 3 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Place gates in the corridor you retreat down. Extra Shift allows up to three gates at once."
        ]
      }
    ],
    "tags": [
      "Energy",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "shock-socket"
      },
      {
        "category": "weapons",
        "slug": "laser-tube"
      },
      {
        "category": "weapons",
        "slug": "camera-flash"
      },
      {
        "category": "weapons",
        "slug": "bass-cannon"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/security-gate.png",
      "alt": "Security Gate weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 96
    }
  },
  {
    "slug": "bouncy-castle",
    "category": "weapons",
    "name": "Bouncy Castle",
    "subtitle": "Epic deployable device",
    "summary": "The Bouncy Castle places an inflatable pad that launches you into the air and lets you land with a squish.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "None (utility)"
      },
      {
        "label": "Blast radius",
        "value": "1.3 tiles"
      },
      {
        "label": "Cooldown",
        "value": "16 s"
      },
      {
        "label": "Duration",
        "value": "12 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Bouncy Castle** is an epic deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Places a pad that lasts 12 seconds. Stepping on it launches you upward; landing on foes creates a squish blast. The cooldown is 16 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Bouncy Castle plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Big Air** (A)",
                  "Launch height +40%.",
                  "The pad lasts 3 s less."
                ],
                [
                  "**House Party** (B)",
                  "Up to 3 pads stand at once.",
                  "Squish deals 25% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spring Break**: Land after 1.5 s or more in the air and the landing sends out a second, wider shockwave that shoves and stuns."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Use it to reach high ground or leave a crowd below you. House Party allows up to three pads at once."
        ]
      }
    ],
    "tags": [
      "Device",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "photocopier"
      },
      {
        "category": "weapons",
        "slug": "elevator-music"
      },
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      }
    ]
  },
  {
    "slug": "one-arm-bandit",
    "category": "weapons",
    "name": "One-Arm Bandit",
    "subtitle": "Good sidearm",
    "summary": "The One-Arm Bandit applies a random status effect with every shot and pays out a jackpot when three reels match.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "23"
      },
      {
        "label": "Fire rate",
        "value": "3.3 per second"
      },
      {
        "label": "Range",
        "value": "26 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.9 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **One-Arm Bandit** is a good sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hitscan shots for 23 damage at 3.3 shots per second. Each shot spins the reels and applies a random status to the target; when three symbols match, the shot becomes a jackpot hit. Costs 0.9 energy per shot."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how One-Arm Bandit plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Fast Reels** (A)",
                  "2 equal faces make a jackpot. Jackpot -10%.",
                  "6 s between jackpots."
                ],
                [
                  "**House Edge** (B)",
                  "Jackpot x1.5 damage and 40% wider.",
                  "All the bonus is in the jackpot."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Coin Shower**: Every 5th direct kill pays out: a blast at the corpse hurts everything near it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Do not rely on a specific status: treat the gun as a general-purpose damage dealer that sometimes gets lucky. House Edge puts all the bonus into the jackpot."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "jammed-revolver"
      },
      {
        "category": "weapons",
        "slug": "paint-marker"
      },
      {
        "category": "weapons",
        "slug": "caulk-gun"
      },
      {
        "category": "weapons",
        "slug": "duty-pistol"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/one-arm-bandit.png",
      "alt": "One-Arm Bandit weapon sprite",
      "pixelated": true,
      "width": 128,
      "height": 80
    }
  },
  {
    "slug": "helping-hand",
    "category": "weapons",
    "name": "Helping Hand",
    "subtitle": "Rare sidearm",
    "summary": "The Helping Hand launches a glove that stands on the floor and holds a pistol, shooting zombies on your behalf.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "17"
      },
      {
        "label": "Fire rate",
        "value": "1 every 1.6 s"
      },
      {
        "label": "Energy cost",
        "value": "5.65 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Helping Hand** is a rare sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is blue. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Throwing it launches a glove up to 9 tiles; where it lands it stands up holding a gun and shoots on its own for a short time. Each throw costs 5.65 energy, one of the most expensive in the arsenal."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Helping Hand plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Rubber Glove** (A)",
                  "Up to 3 hands stand and last 2 s longer.",
                  "Fires 15% slower."
                ],
                [
                  "**Second Opinion** (B)",
                  "The pistol is thrown for 80 at the end.",
                  "Hand range is 25% shorter."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Team Player**: A kill by your other weapons within 4 s powers up the next glove you throw: +20% damage."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Drop a glove behind you in a corridor to cover your back while you flee. Rubber Glove lets you keep up to 3 hands up at once."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Rare"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "pizza-wheel"
      },
      {
        "category": "weapons",
        "slug": "flare-gun"
      },
      {
        "category": "weapons",
        "slug": "paper-planes"
      },
      {
        "category": "weapons",
        "slug": "moth-jar"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/helping-hand.png",
      "alt": "Helping Hand weapon sprite",
      "pixelated": true,
      "width": 138,
      "height": 48
    }
  },
  {
    "slug": "leftovers",
    "category": "weapons",
    "name": "Leftovers",
    "subtitle": "Epic explosive launcher",
    "summary": "Leftovers throws a mold colony that keeps growing and slows whatever it touches.",
    "infobox": [
      {
        "label": "Family",
        "value": "Explosive"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "13"
      },
      {
        "label": "Fire rate",
        "value": "1 per second"
      },
      {
        "label": "Energy cost",
        "value": "4.35 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Leftovers** is an epic explosive launcher. Explosive weapons deal area damage and tear up terrain.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "A silent throw that lands a colony dealing 13 damage that slows foes by 20 percent and keeps growing the longer it lives. It fires every second for 4.35 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Explosive weapons also gain +8% blast radius and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Leftovers plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Ferment** (A)",
                  "Colony grows to 3.9 tiles.",
                  "Deals 15% less damage."
                ],
                [
                  "**Black Mold** (B)",
                  "Foes leaving it burn 8 DPS for 3 s.",
                  "Colony is 20% smaller."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Spore Bloom**: While you fight with it, spores bloom around you every 1 s and burst on the foes near you."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Put it in a doorway so the colony grows across the whole passage. Black Mold burns foes that leave it."
        ]
      }
    ],
    "tags": [
      "Explosive",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "concrete-pillar"
      },
      {
        "category": "weapons",
        "slug": "demolition-drill"
      },
      {
        "category": "weapons",
        "slug": "pressure-cooker"
      },
      {
        "category": "weapons",
        "slug": "carpet-bomber"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/leftovers.png",
      "alt": "Leftovers weapon sprite",
      "pixelated": true,
      "width": 160,
      "height": 88
    }
  },
  {
    "slug": "elevator-music",
    "category": "weapons",
    "name": "Elevator Music",
    "subtitle": "Epic deployable device",
    "summary": "Elevator Music sets down a boom box that slows nearby foes and pays tips.",
    "infobox": [
      {
        "label": "Family",
        "value": "Device"
      },
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Ammo",
        "value": "Infinite (cooldown)"
      },
      {
        "label": "Damage",
        "value": "None (utility)"
      },
      {
        "label": "Cooldown",
        "value": "24 s"
      },
      {
        "label": "Duration",
        "value": "8 s"
      },
      {
        "label": "Slot",
        "value": "Device slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Elevator Music** is an epic deployable device. Devices have a slot of their own and run on a cooldown rather than on ammo.",
          "Its rarity colour is purple. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Places a speaker that plays for 8 seconds, slowing foes within 5 tiles by 50 percent. The cooldown is 24 seconds."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Device weapons also gain -16% cooldown and +20% duration with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Elevator Music plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Smooth Jazz** (A)",
                  "Aura +1.5 tiles.",
                  "Slow is 30% weaker."
                ],
                [
                  "**Tip Jar** (B)",
                  "Kills inside pay 4 scrap.",
                  "Box plays 3 s less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Encore**: Every 2 songs the box cuts its own wait as the song ends, so it can be placed again at once."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Drop it at your feet when you hold a position and shoot the slowed crowd. Tip Jar pays [[items/scrap|scrap]] for kills inside the aura."
        ]
      }
    ],
    "tags": [
      "Device",
      "Epic"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "photocopier"
      },
      {
        "category": "weapons",
        "slug": "bouncy-castle"
      },
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      },
      {
        "category": "weapons",
        "slug": "robot-vacuum"
      }
    ]
  },
  {
    "slug": "final-demand",
    "category": "weapons",
    "name": "Final Demand",
    "subtitle": "Common sidearm",
    "summary": "The Final Demand is a sidearm that hits harder the less health you have: the closer to death, the more it bills.",
    "infobox": [
      {
        "label": "Family",
        "value": "Sidearm"
      },
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "21.5"
      },
      {
        "label": "Fire rate",
        "value": "2.5 per second"
      },
      {
        "label": "Magazine",
        "value": "8"
      },
      {
        "label": "Reload time",
        "value": "0.8 s"
      },
      {
        "label": "Range",
        "value": "22 tiles"
      },
      {
        "label": "Energy cost",
        "value": "1.05 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Final Demand** is a common sidearm. Sidearms are the light, quick guns of the arsenal, cheap to run and easy to aim.",
          "Its rarity colour is white. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Hitscan shots for 21.5 damage at 2.5 shots per second; damage rises as your health falls. The 8-round magazine reloads in 0.8 seconds, and shots cost 1.05 energy."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Sidearm weapons also gain +10% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Final Demand plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Late Fee** (A)",
                  "The HP bonus doubles.",
                  "The base shot deals 10% less."
                ],
                [
                  "**Second Notice** (B)",
                  "Above half HP shots deal 30% more.",
                  "The HP bonus caps at +40%."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Counterclaim**: A hit of 10% of your HP or more makes the next shot double, at most once per 2 s."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Great for players who like to play at the edge. Second Notice is for the opposite style: it gives up to +30 percent while you are healthy."
        ]
      }
    ],
    "tags": [
      "Sidearm",
      "Common"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "duty-pistol"
      },
      {
        "category": "weapons",
        "slug": "nail-gun"
      },
      {
        "category": "weapons",
        "slug": "plumb-bob"
      },
      {
        "category": "weapons",
        "slug": "squirt-gun"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/final-demand.png",
      "alt": "Final Demand weapon sprite",
      "pixelated": true,
      "width": 144,
      "height": 96
    }
  },
  {
    "slug": "take-a-number",
    "category": "weapons",
    "name": "Take a Number",
    "subtitle": "Good automatic weapon",
    "summary": "Take a Number is a hitscan gun that counts your hits on each foe and calls its number on the fifth.",
    "infobox": [
      {
        "label": "Family",
        "value": "Auto"
      },
      {
        "label": "Rarity",
        "value": "Good"
      },
      {
        "label": "Ammo",
        "value": "Energy"
      },
      {
        "label": "Damage",
        "value": "17"
      },
      {
        "label": "Fire rate",
        "value": "4 per second"
      },
      {
        "label": "Magazine",
        "value": "16"
      },
      {
        "label": "Reload time",
        "value": "1 s"
      },
      {
        "label": "Range",
        "value": "20 tiles"
      },
      {
        "label": "Energy cost",
        "value": "0.75 per shot"
      },
      {
        "label": "Slot",
        "value": "Gun slot"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Take a Number** is a good automatic weapon. Automatic weapons trade accuracy for volume of fire and form the backbone of most gun builds.",
          "Its rarity colour is green. It can be found as a random drop."
        ]
      },
      {
        "heading": "Mechanics",
        "paragraphs": [
          "Fires 17 damage rounds at 4 shots per second. Every 5th hit on the same foe is the called number: it deals 2.5 times damage and stuns. A 16-round magazine reloads in 1 second."
        ]
      },
      {
        "heading": "Upgrades",
        "paragraphs": [
          "Every weapon has three levels. Level 2 costs 50 [[items/scrap|scrap]] at a [[items/workbench]] (a duplicate pickup also adds a level), and reaching Level 3, *Mastered*, takes a [[items/master-key]] plus 220 scrap. Each level adds 36% to the base damage of the weapon (x1.36 at Level 2, x1.72 at Level 3). Auto weapons also gain +12% fire rate and -16% energy cost with each level."
        ],
        "subsections": [
          {
            "heading": "Branches (Level 2)",
            "paragraphs": [
              "At Level 2 you choose one of two branches at a Workbench, free of charge. Each one changes how Take a Number plays and comes with a drawback."
            ],
            "table": {
              "columns": [
                "Branch",
                "Effect",
                "Drawback"
              ],
              "rows": [
                [
                  "**Big Ticket** (A)",
                  "The call deals x4.",
                  "Calls come every 6th hit."
                ],
                [
                  "**Waiting Room** (B)",
                  "The call also stuns foes within 2 tiles.",
                  "The call deals 25% less."
                ]
              ]
            }
          },
          {
            "heading": "Mastery signature (Level 3)",
            "paragraphs": [
              "A Mastered weapon gains a signature ability. **Call Out**: Every time the machine calls a number, the called foe bursts and shoves the line around it."
            ]
          }
        ]
      },
      {
        "heading": "Strategy",
        "paragraphs": [
          "Stay on one target rather than spraying: the count is per foe. Big Ticket makes the call deal 4 times damage."
        ]
      }
    ],
    "tags": [
      "Auto",
      "Good"
    ],
    "related": [
      {
        "category": "weapons",
        "slug": "patrol-rifle"
      },
      {
        "category": "weapons",
        "slug": "rivet-gun"
      },
      {
        "category": "weapons",
        "slug": "stapler-smg"
      },
      {
        "category": "weapons",
        "slug": "warehouse-rifle"
      }
    ],
    "image": {
      "src": "/fz/wiki/weapons/take-a-number.png",
      "alt": "Take a Number weapon sprite",
      "pixelated": true,
      "width": 152,
      "height": 88
    }
  }
];
