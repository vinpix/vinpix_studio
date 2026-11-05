import type { WikiArticle } from "../types";

export const bosses: WikiArticle[] = [
  {
    "slug": "the-missing-manager",
    "category": "bosses",
    "name": "The Missing Manager",
    "subtitle": "Floor boss of Level 0",
    "summary": "A giant, hunched office manager in a navy suit who holds the yellow [[levels/the-lobby|Lobby]]. He slams the floor, hurls filing cabinets, shoves swivel chairs and drops tubes of broken light on anyone who stands still, and grows larger each time he is hurt.",
    "image": {
      "src": "/fz/wiki/bosses/the-missing-manager.png",
      "alt": "The Missing Manager",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Level 0 (Yellow), Floor 1 - The Lobby"
      },
      {
        "label": "Phases",
        "value": "3 (Business Hours, Overtime, Termination)"
      },
      {
        "label": "Health",
        "value": "About 12,800 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "The [[levels/the-lobby|Lobby]]'s office floors, with vents and fluorescent ceiling fixtures"
      },
      {
        "label": "Summons",
        "value": "3 [[enemies/shambler|Shamblers]] (+1 per extra player) at each phase change"
      },
      {
        "label": "Speed",
        "value": "1.75 tiles/s (35% faster below 30% health)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Missing Manager** is the boss wave of the first floor. He is a huge [[enemies/brute]] in a suit, tall enough that his hit box (1.9 by 2.95 tiles) is only part of what you see, and he walks at a steady 1.75 tiles per second straight toward the nearest player. Knockback does nothing to him, and stuns, freezes and explosion staggers last only a quarter as long as on a normal enemy.",
          "His kit is built to punish whatever you are doing. Players who stand on the ground get the slam and the chair. Players who hide on a raised perch get a flying filing cabinet. Players who run far away get a Drop-In Meeting. Players who stand still under the ceiling lights get the lights dropped on them. Below 30% health he enrages: a red pulse, a roar and 35% more speed."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "He changes phase at 66% and 33% health. Each change is a two-second shift during which he cannot be hurt: his paperwork bursts out of him, he grows with a pop, a shock ring goes out, and a wave of [[enemies/shambler|Shamblers]] climbs out of the vents. The new phase's first attack comes about 1.2 seconds after the shift ends."
        ],
        "subsections": [
          {
            "heading": "Phase 1: Business Hours",
            "paragraphs": [
              "The plain suit at normal size. He uses four attacks: **Bite**, **Ground Slam**, **File-Cabinet Hurl** and **Swivel Chair Shove**. The slam and the hurl are about 9 seconds apart, the bite comes every 1.8 seconds if you stand next to him, and the first chair arrives 6 seconds into the fight."
            ]
          },
          {
            "heading": "Phase 2: Overtime (the All-Hands shift)",
            "paragraphs": [
              "He grows to 1.2 times his size, ties a white overtime headband around his skull and raises a stamp arm over his back like a scorpion tail. He gains **Drop-In Meeting**, **Fluorescent Fallout** and **Restructuring**."
            ]
          },
          {
            "heading": "Phase 3: Termination",
            "paragraphs": [
              "At 1.35 times his size, two broken [[items/fluorescent-light|fluorescent tubes]] are stuck in his back, flickering. All earlier attacks come faster, Fluorescent Fallout drops one extra tube, and he adds his ultimate, **Hostile Takeover**, which he opens with and repeats about every 45 seconds."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "Bite",
              "A close-range chomp after a 0.55 second wind-up.",
              "30. Cooldown 1.8 s (1.6 s in Phase 3)."
            ],
            [
              "Ground Slam",
              "Fists up for 0.7 seconds, then a shockwave along the floor within 6 tiles that cracks the floor under him. Jump it.",
              "20. Grounded players only. Every 9 s (8 s in Phase 3)."
            ],
            [
              "File-Cabinet Hurl",
              "Lifts a real filing cabinet overhead for 0.9 seconds and throws it at a perched or far-away player. The landing spot (about 3 tiles wide) is marked.",
              "15. About 1.7 s from start to impact."
            ],
            [
              "Swivel Chair Shove",
              "A red lane is marked, then a chair rolls along the floor at 11 tiles/s for up to 18 tiles toward your farthest ground player. A tap jump clears it. Phase 3 throws a second chair 1.2 s later on the same lane. He stumbles afterwards and takes 1.25x damage for 1 s.",
              "About 10. Cooldown 20 / 17 / 15 s."
            ],
            [
              "Drop-In Meeting",
              "Phases 2-3. He vanishes for 0.7 seconds, a red circle locks on a far-away ground player and he lands there 1.2 seconds later. The floor cracks. He is stuck for 1.8 seconds afterwards and takes 1.5x direct damage.",
              "24. Circle 2.6 tiles. Cooldown 28 / 22 s."
            ],
            [
              "Fluorescent Fallout",
              "Phases 2-3. Fists to the ceiling, then 3 tubes (+1 per extra player, +1 in Phase 3, at most 6) fall near the players and the lights go dark for 12 seconds. A tube that lands within 1.6 tiles of him costs him 2% of his health and stuns him for 1 second.",
              "12 per tube, radius 1.1. Cooldown 20 / 15 s."
            ],
            [
              "Restructuring",
              "Phases 2-3. A pink slip lands on the perch of up to 3 standing campers; 1.4 seconds later the platform under them is sheared away. Step off.",
              "No damage. Cooldown 24 / 20 s."
            ],
            [
              "All-Hands",
              "At each phase change [[enemies/shambler|Shamblers]] climb out of the vents.",
              "3 + 1 per extra player."
            ],
            [
              "Hostile Takeover",
              "Phase 3 ultimate. A single 8-second sequence of a Chair Shove, a Fluorescent Fallout and a Drop-In Meeting. He is armored until the moment he vanishes.",
              "Every 45 s."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Jump the slam shockwave and the chair; the cabinet and the drop-in are circles, so just walk out of the red marker.",
          "Do not camp. Standing on a raised perch invites the cabinet, and from Phase 2 the perch itself is cut out from under you. Keep moving between platforms.",
          "Punish the stumbles. He takes extra damage for about a second after a chair, and for 1.8 seconds after a Drop-In lands, so save burst weapons for those moments.",
          "In Fluorescent Fallout, try to stand so that a tube lands on him rather than you: the stun is a free damage window.",
          "In [[mechanics/co-op-multiplayer|co-op]], assign one player to clear [[enemies/shambler|Shamblers]] at every shift so the others can keep shooting him as soon as he becomes vulnerable again."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Level 0",
      "Floor boss"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-missing-manager-forms.png",
        "alt": "The Missing Manager forms",
        "pixelated": true,
        "caption": "Business Hours, Overtime, Termination"
      }
    ],
    "trivia": [
      "He is a [[enemies/brute]] under the suit, but the game shows him as his own boss with a name bar reading THE MISSING MANAGER.",
      "He never silently disappears: if he falls out of the level he is moved to the vent farthest from the players."
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-ghost-forklift"
      },
      {
        "category": "bosses",
        "slug": "the-fumes"
      },
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "enemies",
        "slug": "brute"
      },
      {
        "category": "levels",
        "slug": "the-lobby"
      },
      {
        "category": "perks",
        "slug": "trophy-managers-badge"
      }
    ]
  },
  {
    "slug": "the-ghost-forklift",
    "category": "bosses",
    "name": "The Ghost Forklift",
    "subtitle": "Floor boss of Level 1",
    "summary": "A haunted warehouse forklift that charges through walls, stabs anything that hugs its forks and hurls pallets from the racks. It becomes a tall night-shift machine and, finally, a repossessor with a cable and hook.",
    "image": {
      "src": "/fz/wiki/bosses/the-ghost-forklift.png",
      "alt": "The Ghost Forklift",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Level 1 (Concrete), Floor 2A - The Warehouse"
      },
      {
        "label": "Phases",
        "value": "3 (The Loader, The Night Mast, The Repossessor)"
      },
      {
        "label": "Health",
        "value": "About 16,000 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "[[levels/habitable-zone|Warehouse]] floors with steel shelving racks and breakable walls"
      },
      {
        "label": "Summons",
        "value": "None"
      },
      {
        "label": "Speed",
        "value": "2.4 tiles/s driving, 18 tiles/s charging"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Ghost Forklift** guards the [[levels/habitable-zone|Warehouse]], the Level 1 floor chosen by door A on the way down. It is a machine, so it is immune to knockback, stuns, freezes and pins, and it never bleeds. It drives toward you at 2.4 tiles per second, but every few seconds it stops, revs for 1.1 seconds with its horn and headlights, and charges along the floor at 18 tiles per second.",
          "The charge destroys everything in its path: walls, doors and planks break at once, steel plates in two hits. It travels up to 24 tiles. When the charge ends the Forklift crashes and is **stunned for 1.6 seconds**, taking 50% more damage. That crash is the main damage window of the whole fight.",
          "Below 30% health it enrages: its revs come every 3 seconds instead of 5 and it charges twice in a row."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "At 66% and 33% health the Forklift goes through an invulnerable two-second shift (the Night Shift, then the Ghost Shift): the engine revs, the headlights turn cyan and the cab shakes. From the second shift on it leaves cyan afterimages while it moves. Unlike most bosses it summons no help."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Loader",
            "paragraphs": [
              "A tower of steel crates rides on the tines. It uses **Charge**, **Backfire**, **Mast Strike**, **Pallet Toss** and **Fork Stab**. Stay out of its lane when it revs, and expect Backfire (a steam blast) if you wait next to it during the crash."
            ]
          },
          {
            "heading": "Phase 2: The Night Mast",
            "paragraphs": [
              "A telescoped lattice mast, a counterweight cage and a lavender lantern rise from the body. It adds **Haunted Freight** and **Ghost Charge**, and every third charge is a Ghost Charge."
            ]
          },
          {
            "heading": "Phase 3: The Repossessor",
            "paragraphs": [
              "The mast stretches a second time, a beacon replaces the lantern and a cable from the ceiling ends in a hook beside the cab. Haunted Freight throws three pallets, every second charge is a Ghost Charge and it gains the ultimate **Midnight Freight**."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "Charge",
              "A 1.1 second rev, then a run at 18 tiles/s for up to 24 tiles that smashes walls and cover. Followed by a 1.6 second stun (1.5x damage taken).",
              "About 32. Knockback 18."
            ],
            [
              "Backfire",
              "A steam blast within 3.5 tiles around its stunned body about 1.2 seconds into the crash stun.",
              "About 14."
            ],
            [
              "Mast Strike",
              "Used against raised players. A red strip is marked for 1 second, then a vertical strike breaks the perch under everyone it reaches. The Forklift is then stunned for 1 second.",
              "About 25."
            ],
            [
              "Pallet Toss",
              "A 0.7 second rev, then a pallet is lobbed at a locked circle (radius 1.6) around a more distant raised player.",
              "About 16."
            ],
            [
              "Fork Stab",
              "A 1.2 second rev when you hug it: a red zone from its centre to 3.6 tiles ahead and 1.9 tiles tall. Stunned 0.8 seconds afterwards (1.5x damage).",
              "About 22. Cooldown 7 s."
            ],
            [
              "Haunted Freight",
              "Phases 2-3. It wakes the shelving racks: ghost crates float out of a rack, then land as pallets on marked circles 1.3 seconds later. Without a rack it throws from its forks. Two circles in Phase 2, three in Phase 3.",
              "About 16 per pallet."
            ],
            [
              "Ghost Charge",
              "Phases 2-3. A 1.3 second rev in a pale lane that locks in place, then it runs through walls and cover for 28 tiles. A held jump or standing 2.3 tiles higher clears it. Exposed 1 second afterwards (1.5x damage).",
              "About 25. Cooldown 32 / 22 s."
            ],
            [
              "Ghost Phase",
              "If its target stays on another floor for 4 seconds, it fades out, teleports to the far end of that floor and fades back in.",
              "Invulnerable while faded."
            ],
            [
              "Midnight Freight",
              "Phase 3 ultimate. A burst of Haunted Freight pallets followed by a Ghost Charge. It is armored during the script.",
              "About every 45 s."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Always leave its lane the moment you hear the rev; the charge breaks the cover you hide behind. Build with steel plates if you can.",
          "Shoot hard right after each crash. A 1.6 second stun at 1.5x damage is the biggest opening you get.",
          "Against Ghost Charge, watch the pale lane: walls do not help, so jump it or climb to a ledge at least 2.3 tiles above.",
          "Shoot the shelving racks away if you do not want pallets, though it will then throw from the forks.",
          "Do not hug it. Fork Stab covers the ground from its centre outwards."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Level 1",
      "Floor boss",
      "Machine"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-ghost-forklift-forms.png",
        "alt": "The Ghost Forklift forms",
        "pixelated": true,
        "caption": "The Loader, The Night Mast, The Repossessor"
      }
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-missing-manager"
      },
      {
        "category": "bosses",
        "slug": "the-fumes"
      },
      {
        "category": "bosses",
        "slug": "the-swimmer"
      },
      {
        "category": "levels",
        "slug": "habitable-zone"
      },
      {
        "category": "perks",
        "slug": "trophy-fork-tines"
      }
    ]
  },
  {
    "slug": "the-fumes",
    "category": "bosses",
    "name": "The Fumes",
    "subtitle": "Floor boss of Level 2",
    "summary": "A floating iron heart wrapped in its own flammable cloud, drifting through the pipes of [[levels/pipe-dreams]]. The cloud makes it nearly immune until you set it alight, and then the heart is briefly naked.",
    "image": {
      "src": "/fz/wiki/bosses/the-fumes.png",
      "alt": "The Fumes",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Level 2 (Pipes), Floor 2B - Pipe Dreams"
      },
      {
        "label": "Phases",
        "value": "3 (Swaddled, Crown, Exposed)"
      },
      {
        "label": "Health",
        "value": "About 20,300 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "[[levels/pipe-dreams]] maintenance floors with floor grates, steam pipes and explosive props"
      },
      {
        "label": "Summons",
        "value": "3 Matchsticks (scorched [[enemies/runner|Runners]], +1 per extra player) at each phase change"
      },
      {
        "label": "Speed",
        "value": "3.6 tiles/s hover"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Fumes** replaced the older boiler boss. It is a hovering iron heart (1.9 by 2.1 tiles) that floats about 1.8 tiles above the floor inside a cloud of its own gas. Its rule is shown the first time you see it: *its own fumes can burn*.",
          "While the cloud is up the heart is **fogged**: direct hits do only 35% damage (50% in Phase 3), explosions 50% and burn 30%. Light the cloud, with a barrel, a rocket, a flare, a fire weapon or by killing a Matchstick inside it, and the heart is **naked** for 3.2 seconds (2.6 in Phase 3): direct hits do 2x, explosions 2.5x and burn 1x. After that the cloud is damp and cannot be lit again for 4.5 seconds, or 9 seconds if it was lit by burning.",
          "It is a machine, so knockback and stuns do nothing to it, and it never enrages from low health. Its own heartbeat is **The Breath**, which comes every 9.5 seconds in every phase and doubles as a reward: the cloud is blown off and the heart is naked afterwards."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "At 66% and 33% health it inflates for an invulnerable two seconds and Matchsticks march out of the vents. Each phase brings a new verb and a new form."
        ],
        "subsections": [
          {
            "heading": "Phase 1: Swaddled",
            "paragraphs": [
              "The heart sits on a steam pedestal with a plume above it. Its sweeping path leaves a trail of gas patches (a passive gas wake) and it uses **Wheeze**, **Ignition**, **The Breath** and **Pipe-Hop**."
            ]
          },
          {
            "heading": "Phase 2: Crown",
            "paragraphs": [
              "A brass crown cap with three spinning wheels sits on the dome. It opens with **Condensation** and adds **Hose Whip**."
            ]
          },
          {
            "heading": "Phase 3: Exposed",
            "paragraphs": [
              "Two pipe arms grow out of the body, the cloud is thinner (fogged direct damage rises to 50%) and Wheeze and Ignition are replaced by **Runaway** and the ultimate **Black Damp**, which it opens with and repeats about every 48 seconds."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "The Breath",
              "A 2.15 second inhale while a red strip marks a circle of radius 9. Anyone inside with a clear line is hit; walls are cover. Afterwards the heart is naked.",
              "About 22. Every 9.5 s."
            ],
            [
              "Wheeze",
              "Phases 1-2. Exhales an amber stippled patch of gas 6 tiles wide for 8 seconds after a 1.0 second tell.",
              "Gas ticks 3 per second. No direct hit."
            ],
            [
              "Ignition",
              "Phases 1-2. Red rings blink on every gas patch for 1.3 seconds, then they all light.",
              "About 14 inside a ringed patch."
            ],
            [
              "Pipe-Hop",
              "The heart sinks into the floor (0.9 s), glowing red grates mark 3 columns (+1 per extra player, up to 6), steam erupts one after another and the heart rises from the last one.",
              "About 6 per tick, 3 ticks."
            ],
            [
              "Condensation",
              "Phases 2-3. A 1.2 second tell, then scalding water falls from the ceiling in red lanes under every player and camper. A roof is cover.",
              "About 6 per tick, 3 ticks."
            ],
            [
              "Hose Whip",
              "Phases 2-3. If you stay within 3 tiles for 1 second, a 1.2 second tell and a lash. The heart is then in recoil for 0.8 seconds and takes 1.5x damage.",
              "About 20."
            ],
            [
              "Runaway",
              "Phase 3. It drops to the floor, squashes into a barrel and rolls for up to 14 tiles at 12 tiles/s, leaving a gas trail. A tap jump clears the roll. The trail then ignites and burns the heart itself, naked for 2 seconds.",
              "About 25 for the roll, about 14 for the trail flash."
            ],
            [
              "Black Damp",
              "Phase 3 ultimate. The cloud swells to twice its size and crawls toward the nearest player, then a ring blast goes off. The final form adds a second ring.",
              "About 19 (then 13 in the final form)."
            ],
            [
              "Matchsticks",
              "Summoned at each phase change. Scorched [[enemies/runner|Runners]] that run to the heart and are eaten, shortening the next naked window by 0.5 s each, or pop on you for 7 damage.",
              "Killing one inside the cloud lights it."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Do not shoot the fogged heart if you can avoid it. Light the cloud first, then dump everything while it is naked.",
          "Use explosives or fire on the cloud. Shooting a Matchstick while it is inside the fog also lights it, so leave one alive until it reaches the cloud.",
          "Gas patches from Wheeze are fuel for Ignition, so leave a patch the moment its rings blink red.",
          "Run out of the breath circle (9 tiles) or behind a wall, then turn around and shoot.",
          "Never stand in a Pipe-Hop grate or Condensation lane; they point where the heart will appear.",
          "In [[mechanics/co-op-multiplayer|co-op]], let one player light the cloud while the rest wait with their strongest weapons."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Level 2",
      "Floor boss",
      "Machine"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-fumes-forms.png",
        "alt": "The Fumes forms",
        "pixelated": true,
        "caption": "Swaddled, Crown, Exposed"
      }
    ],
    "trivia": [],
    "related": [
      {
        "category": "bosses",
        "slug": "the-ghost-forklift"
      },
      {
        "category": "bosses",
        "slug": "the-swimmer"
      },
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "levels",
        "slug": "pipe-dreams"
      },
      {
        "category": "perks",
        "slug": "trophy-pressure-valve"
      },
      {
        "category": "items",
        "slug": "steam-vent"
      }
    ]
  },
  {
    "slug": "the-swimmer",
    "category": "bosses",
    "name": "The Swimmer",
    "subtitle": "Floor boss of the Poolrooms",
    "summary": "A shadow with a fin that swims under the floor tiles of the [[levels/poolrooms|Poolrooms]] and can only be hurt while it is on the surface. It bursts up beneath you, sends waves along the floor and electrifies the pool boards.",
    "image": {
      "src": "/fz/wiki/bosses/the-swimmer.png",
      "alt": "The Swimmer",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Poolrooms, Floor 3A"
      },
      {
        "label": "Phases",
        "value": "3 (The Shadow, The Breach, The Leviathan)"
      },
      {
        "label": "Health",
        "value": "About 12,500 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "A flooded slab of pool tiles at least 8 cells wide on the floor"
      },
      {
        "label": "Summons",
        "value": "3 [[enemies/crawler|Crawlers]] (+1 per extra player) at each phase change"
      },
      {
        "label": "Speed",
        "value": "4 tiles/s surfaced, 7 tiles/s submerged"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Swimmer** (listed as *The Swimmer Under Tiles* on its name bar) lives in the tiled pool floors. Its whole fight is a repeating cycle: it **surfaces** and walks the slab for 3 seconds, **dives** (0.5 s), **prowls** under the floor for 3 to 5 seconds, **marks** the spots where it will come up (0.9 s), then **emerges** (0.35 s). A full cycle takes 9.75 seconds in Phase 1, 9.0 in Phase 2 and 6.95 in Phase 3.",
          "It can only be damaged while surfaced, where it takes 1.5x damage; while diving or emerging it takes half, and while submerged it cannot be hit at all. The name bar changes to (UNDER) and greys out when it is below the tiles. The first-sight hint reads: *watch the floor, hit it when it surfaces*."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "At 66% and 33% health it rises for an invulnerable two-second shift and a school of [[enemies/crawler|Crawlers]] swarms out. Each phase changes what its cycle carries."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Shadow",
            "paragraphs": [
              "Only a pale core with a thin water spout. Under the floor it is a dark 6-tile shadow with a leaning fin on the surface. Each cycle is an **Ambush Burst**, with a **Splash Spit** from the surface and a **Sonar Ping** every third cycle."
            ]
          },
          {
            "heading": "Phase 2: The Breach",
            "paragraphs": [
              "A water serpent head grows from its back and the shadow stretches to 10 tiles. Its cycles rotate through **Span Shock**, **Tidal Wave** and an Ambush Burst, with a Sonar Ping on each burst cycle."
            ]
          },
          {
            "heading": "Phase 3: The Leviathan",
            "paragraphs": [
              "A crown of seven water spikes wraps the head and the shadow is 14 tiles long. The surface time drops to 2 seconds. It opens with the ultimate **Maelstrom** and then repeats a five-cycle deck of Maelstrom, Burst, Shock, Tidal, Burst, about 35 seconds in all."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "Ambush Burst",
              "Red cracks mark where it will emerge, one under each of up to three players, 0.9 seconds ahead. Then it bursts up under them.",
              "About 27."
            ],
            [
              "Bite",
              "A 0.5 second wind-up, then a bite at 2.4 tiles in front of it while surfaced.",
              "About 31."
            ],
            [
              "Splash Spit",
              "A glob is launched at a locked circle (radius 1.6) after a 1.3 second tell: 1 glob in Phase 1, 2 in Phase 2, 3 in Phase 3.",
              "About 13."
            ],
            [
              "Span Shock",
              "Phases 2-3. The pool floor is split into segments of 3 cells, with some left safe. After a 1.4 second tell the rest are electrified. Hits anyone standing on the board (feet within 0.3 tiles of the top).",
              "About 17. Water carries shocks."
            ],
            [
              "Tidal Wave",
              "Phases 2-3. After a 1.25 second marker, two waves leave its emerge point both ways at 9 tiles/s for 22 tiles. Jump them.",
              "About 17."
            ],
            [
              "Sonar Ping",
              "Phases 1-2. A thin, one-way wave along the span during the prowl.",
              "About 13. Jump it."
            ],
            [
              "School of [[enemies/crawler|Crawlers]]",
              "Summoned at each phase change.",
              "3 + 1 per extra player."
            ],
            [
              "Maelstrom",
              "Phase 3 ultimate. One cycle that carries a spit volley, two shock boards (a board and its opposite) and a tidal wave. No armor, since it is submerged.",
              "Shock 13 per board."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Watch the cracks. They show where it will come up: leave the spot and be ready to shoot the instant it surfaces.",
          "Use the surfaced window for your high-damage weapons. Three seconds of 1.5x damage is your best chance; in Phase 3 it is only two.",
          "Jump Tidal Wave and Sonar Ping; step off the boards for Span Shock, or stay on a platform above the floor.",
          "Kill the [[enemies/crawler|Crawlers]] quickly so you can keep your eyes on the floor while it is submerged.",
          "In [[mechanics/co-op-multiplayer|co-op]], remember that each player gets their own ambush mark, so stay ready to move when yours cracks."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Poolrooms",
      "Floor boss"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-swimmer-forms.png",
        "alt": "The Swimmer forms",
        "pixelated": true,
        "caption": "The Shadow, The Breach, The Leviathan"
      }
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-emcee"
      },
      {
        "category": "bosses",
        "slug": "the-fumes"
      },
      {
        "category": "enemies",
        "slug": "crawler"
      },
      {
        "category": "levels",
        "slug": "poolrooms"
      },
      {
        "category": "perks",
        "slug": "trophy-tide-charm"
      },
      {
        "category": "mechanics",
        "slug": "water-and-shock"
      }
    ]
  },
  {
    "slug": "the-emcee",
    "category": "bosses",
    "name": "The Emcee",
    "subtitle": "Floor boss of the Party Room",
    "summary": "A gaunt comedian on a giant unicycle who tells deadly jokes to a crowd of [[enemies/guest|Guests]]. The audience is his armor: pop the crowd or heckle him in the dead air before a punchline to make him vulnerable.",
    "image": {
      "src": "/fz/wiki/bosses/the-emcee.png",
      "alt": "The Emcee",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Party Room, Floor 3B"
      },
      {
        "label": "Phases",
        "value": "3 (The Host, The Headliner, The Finale)"
      },
      {
        "label": "Health",
        "value": "About 9,500 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "A balloon-strewn party hall with vents; he rides 4 to 13 tiles from the nearest player"
      },
      {
        "label": "Summons",
        "value": "[[enemies/guest|Guests]]: 3 (+1 per extra player, +1 in Phase 3, at most 6) per Crowd Work"
      },
      {
        "label": "Speed",
        "value": "3.6 tiles/s on his unicycle"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Emcee** replaced the earlier Party Host. He rides a unicycle in a loop around the room (his body is 2 by 3 tiles), always keeping 4 to 13 tiles from the nearest player, and never stands still. Everything he does is stage business: a speech bubble of three dots fills for 1.2 seconds, red markers lock in place, a 1-second **dead air** follows (0.9 s in Phase 3) and then comes the punchline.",
          "His rule appears at first sight: *the crowd is his armor*. While two or more [[enemies/guest|Guests]] stand within 12 tiles he takes only 30% damage from direct hits, 60% from explosions and 30% from burn. Popping the whole crowd gives an **empty house**: the armor is lifted and you get an open window. A Guest that pops within 2.6 tiles of him staggers him.",
          "The other weakness is the **heckle**. If your team deals 3% of his maximum health in a burst inside a dead air, before the armor is counted, the joke is cancelled: he falls off the wheel and is stunned for 1.6 seconds, taking 1.5x damage."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "At 66% and 33% health he goes through an invulnerable two-second shift and brings in more [[enemies/guest|Guests]]. The second phase opens with Confetti Toss and the third with Standing Ovation. He has no low-health enrage."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Host",
            "paragraphs": [
              "The rider on his wheel. His kit is the joke family (**Knock Knock** with its variants **The Chicken** and **Mic Drop**), **Crowd Work**, **Gag Box**, **DJ Set** and **Balloon Rise**."
            ]
          },
          {
            "heading": "Phase 2: The Headliner",
            "paragraphs": [
              "A dark mask, two strings and two warm stage lamps hang behind his head. He adds **Laugh Track**, **The Bar** (in the DJ Set), **Spotlight** and **Confetti Toss**."
            ]
          },
          {
            "heading": "Phase 3: The Finale",
            "paragraphs": [
              "The mask opens into a loudspeaker mouth with empty eye sockets, and a lamp truss patrols over his head in a 3-tile lap. The jokes come with a 0.9 second dead air, Laugh Track has four rings and the ultimate **Standing Ovation** opens the phase and repeats every 50 seconds."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "Knock Knock",
              "A comb of 3 solid red columns (1 tile wide, spaced 3 apart) centred on the nearest player, plus one per other player. Stand in a gap or heckle.",
              "About 12."
            ],
            [
              "The Chicken",
              "A front travels both ways from his feet at 9 tiles/s for 14 tiles. A tap jump clears it.",
              "About 12."
            ],
            [
              "Mic Drop",
              "A solid red rectangle 2.6 tiles wide under the nearest player and at most two others.",
              "About 20."
            ],
            [
              "Laugh Track",
              "Phases 2-3. Rings of radius 1.8 appear under [[enemies/guest|Guests]] he primes and under a chorus he raises (3 in Phase 2, 4 in Phase 3). They pop 0.25 seconds apart.",
              "About 22."
            ],
            [
              "Crowd Work",
              "Guests arc in from the vents onto amber markers (harmless). They are his armor.",
              "No damage."
            ],
            [
              "Gag Box",
              "A [[items/gift-box|gift box]] lands on a marked circle (radius 2.6) 2.2 seconds after it is thrown.",
              "About 34."
            ],
            [
              "DJ Set",
              "2, 3 or 4 pulses (by phase) travel from one spot at 9 tiles/s for 10 tiles. Jump them. The Bar is a high pulse (0.9 to 5 tiles above the floor): stay low.",
              "About 12 per pulse."
            ],
            [
              "Balloon Rise",
              "He inflates for 0.9 seconds, floats up, vanishes and drops 1.2 seconds later onto a circle (radius 2.2) locked at your feet. Pop all five balloons to knock him down.",
              "About 24."
            ],
            [
              "Spotlight",
              "Phases 2-3. A circle (radius 2.0) locks on the longest camper for 1.2 seconds.",
              "About 20."
            ],
            [
              "Confetti Toss",
              "Phases 2-3. 3 balls (+1 per extra player, at most 5) land in circles of radius 1.2.",
              "About 8 each."
            ],
            [
              "Standing Ovation",
              "Phase 3 ultimate. The lights die, five trapdoor Guests rise, swell together (a 0.9 second dead air) and pop in a wave toward him. A heckle breaks it.",
              "Rings of 1.8 radius."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Shoot the [[enemies/guest|Guests]] first, ideally while they stand near him. An empty house removes his armor.",
          "Learn the dead air: when the three dots are full, put a big burst into him for the heckle.",
          "Sidestep the Knock Knock columns into the gaps, jump the Chicken and DJ Set pulses and stay low for The Bar.",
          "Never camp: Spotlight picks out the longest camper and Balloon Rise brings him straight to a raised or distant player.",
          "In [[mechanics/co-op-multiplayer|co-op]], share the heckle: it counts the team's combined burst, not each player's damage."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Party Room",
      "Floor boss"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-emcee-forms.png",
        "alt": "The Emcee forms",
        "pixelated": true,
        "caption": "The Host, The Headliner, The Finale"
      }
    ],
    "trivia": [
      "His death is a helium laugh: the corpse lifts away on five gold balloons and pops."
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-swimmer"
      },
      {
        "category": "bosses",
        "slug": "the-smiler"
      },
      {
        "category": "enemies",
        "slug": "guest"
      },
      {
        "category": "levels",
        "slug": "party-room"
      },
      {
        "category": "perks",
        "slug": "trophy-hosts-confetti"
      },
      {
        "category": "items",
        "slug": "gift-box"
      }
    ]
  },
  {
    "slug": "the-smiler",
    "category": "bosses",
    "name": "The Smiler",
    "subtitle": "Floor boss of Lights Out",
    "summary": "A towering grin in the dark of [[levels/lights-out]] that can only be hurt while light is on it. It stalks, vanishes behind you, rushes through the dark and finally ignites its own head into a lamp.",
    "image": {
      "src": "/fz/wiki/bosses/the-smiler.png",
      "alt": "The Smiler",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Lights Out, Floor 4"
      },
      {
        "label": "Phases",
        "value": "3 (The Watcher, The Feeder, The Lamp)"
      },
      {
        "label": "Health",
        "value": "About 11,900 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "Near-total darkness; your [[items/flashlight|flashlight]] and scattered lamps are the only light"
      },
      {
        "label": "Summons",
        "value": "2 [[enemies/smiler|Smilers]] (+1 per extra player) at each phase change"
      },
      {
        "label": "Speed",
        "value": "3.2 tiles/s stalking"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Smiler** is a far larger relative of the [[enemies/smiler|regular Smiler enemy]] and the boss of the darkest floor. It can only be hurt while it is lit. A [[items/flashlight|flashlight]] beam on it charges its light meter at 3 per second, standing in lamp light charges it at 1.5 per second, and the meter drains at 1 per second in the dark. At 0.35 or more it is vulnerable; below that it is untargetable and the name bar reads **THE SMILER (UNSEEN)** and flickers.",
          "A steady beam also drains about 2% of its maximum health every second. Holding the beam on it for 6 seconds straight makes it dissolve into smoke and scatter once per run. The first-sight hint reads: *it hides in the dark, shine your light*.",
          "It is not harmless in the light: it still bites at 1.8 tiles whether lit or not, and many attacks suppress your flashlight."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "At 66% and 33% health it goes through an invulnerable two-second shift and more [[enemies/smiler|Smilers]] pour out of the darkest vents. Each shift changes its body."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Watcher",
            "paragraphs": [
              "A pale veil rises behind its head and two ghostly hands hang at the ends of its arms. It stalks at 3.2 tiles per second, steps behind you every 7 seconds, and uses **Bite**, **Stretch Bite**, **Stalk Rush** and **Grabbing Hands**."
            ]
          },
          {
            "heading": "Phase 2: The Feeder",
            "paragraphs": [
              "The hands are shed, a mouth opens in the chest, and the face has a double grin. It keeps the earlier attacks and adds **Lights Out** (a free cast right after the shift), and its rushes and hands come faster."
            ]
          },
          {
            "heading": "Phase 3: The Lamp",
            "paragraphs": [
              "The head ignites into a white slash of light with a halo and a shaft reaching the ceiling, standing 5 tiles tall. It adds **Flash Back**, loses Grabbing Hands and opens with the ultimate **Blackout Hunt**, repeated about every 45 seconds."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "Bite",
              "A 0.55 second wind-up bite at 1.8 tiles that also suppresses your [[items/flashlight|flashlight]] for 1.5 seconds.",
              "About 30."
            ],
            [
              "Stretch Bite",
              "Its arm stretches up to a raised player after a 1.1 second tell.",
              "About 30."
            ],
            [
              "Vanish-Step",
              "Every 7 seconds (5.5 in Phase 3), if you are not within 3.5 tiles and it is unlit, it vanishes for 0.6 seconds and reappears 5 to 8 tiles behind you.",
              "No damage."
            ],
            [
              "Stalk Rush",
              "It drops to all fours for 0.9 seconds with the lane marked red, then runs at 10 tiles/s for up to 9 tiles. Jump it, or hold a beam on it for 0.3 seconds to stop it; light on it during the tell cancels the rush.",
              "About 30. Cooldown 12 / 10 / 9 s."
            ],
            [
              "Grabbing Hands",
              "Phases 1-2. Three claws are marked on the floor for 1.3 seconds and then strike at once. Light does not matter.",
              "About 13. First after 6 s."
            ],
            [
              "[[levels/lights-out]]",
              "Phases 2-3. After a 1.4 second tell, every light within 12 tiles (14 in Phase 3) of the two players nearest to it goes dark for 12 seconds.",
              "No damage. Cooldown 30 / 22 s."
            ],
            [
              "Flash Back",
              "Phase 3. A strike band 4.5 tiles long and 2.6 tall after a 1.4 second tell. Your flashlight is suppressed for 2.5 seconds, but it is lit and exposed for 1 second afterwards.",
              "About 15. Every 14 s."
            ],
            [
              "Blackout Hunt",
              "Phase 3 ultimate. Lights Out, then a Stalk Rush, then a Flash Back in the dark. It is armored until the Flash Back lands.",
              "6.8 s. Every 45 s."
            ],
            [
              "More Smiles",
              "Summoned at each phase change.",
              "2 + 1 per extra player."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Keep your [[items/flashlight|flashlight]] charged and aimed. A quick flick of light is enough to make it vulnerable, but the window fades soon after the light leaves.",
          "Do not go for the pure beam: holding it for 6 seconds scatters the Smiler away. Instead alternate bursts of light with weapon fire.",
          "Jump the rush, or stop it with a beam. During [[levels/lights-out]], stay close to a lamp.",
          "In [[mechanics/co-op-multiplayer|co-op]], one player holds the beam while another watches for the vanish-steps behind them.",
          "Kill its [[enemies/smiler|Smilers]] by their grins before you commit to the boss."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Lights Out",
      "Floor boss",
      "Light-sensitive"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-smiler-forms.png",
        "alt": "The Smiler forms",
        "pixelated": true,
        "caption": "The Watcher, The Feeder, The Lamp"
      }
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-emcee"
      },
      {
        "category": "bosses",
        "slug": "the-hum"
      },
      {
        "category": "enemies",
        "slug": "smiler"
      },
      {
        "category": "levels",
        "slug": "lights-out"
      },
      {
        "category": "perks",
        "slug": "trophy-cold-stare"
      },
      {
        "category": "mechanics",
        "slug": "flashlight-and-light"
      }
    ]
  },
  {
    "slug": "the-hum",
    "category": "bosses",
    "name": "The Hum",
    "subtitle": "Final boss",
    "summary": "A walking transformer cabinet on three legs that guards the [[levels/generator-room|Generator Room]]. It recharges at the [[items/generator]], plugs into fuse boxes and rewrites the floor as it changes shape. Silencing it ends the run in victory.",
    "image": {
      "src": "/fz/wiki/bosses/the-hum.png",
      "alt": "The Hum",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "Generator Room, Floor 5 (final)"
      },
      {
        "label": "Phases",
        "value": "3 (The Strider, The Open, The Unleashed)"
      },
      {
        "label": "Health",
        "value": "About 13,100 at 1 player (+60% of base per extra player)"
      },
      {
        "label": "Arena",
        "value": "A 12 by 5 tile boss pad with the [[items/generator]] at the left end and two fuse boxes at the right"
      },
      {
        "label": "Summons",
        "value": "2 (+1 per extra player): [[enemies/hound|Hounds]] in Phase 1, [[enemies/smiler|Smilers]] in Phase 2, [[enemies/runner|Runners]] in Phase 3"
      },
      {
        "label": "Speed",
        "value": "2.5 tiles/s stride, 2.2 creep, 3.0 hop-walk"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**The Hum** is the last boss of a run. It is a squat plated cabinet (3 by 3.4 tiles) that walks on three insulator legs, and its rule is the one the game gives you at first sight: *it recharges at the [[items/generator]]*. It is a machine: it cannot be pushed, and it never enrages from low health.",
          "Its armor is its chest panel. While **closed**, direct hits do only 30%, explosions 60% and burn 10%. The panel is **open** (full damage) in a few moments: right after a stomp, at a dock on the Generator, and when the machine is unplugged. Every 28 seconds or so it hurries back to the Generator, opens its chest panel and **docks** for 3.5 seconds. In Phases 1 and 3 it also throws a cable into a **fuse box** at the right of the pad. Shoot the box (or press interact to pull the plug) within 2.5 seconds to unplug it and open the core for 3 seconds; if nobody does, it stays **plugged** for 10 seconds with the closed numbers cut further.",
          "The pad never becomes a hazard: the Generator island is always lit and safe, and nothing fires while the Hum is docked."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "At 66% and 33% health the Hum leaps back to the [[items/generator]], kneels and changes form in an invulnerable 2.5 second shift. The phase banner reads THE HUM: SOUND, then DARKNESS, then GEOMETRY. Phase 3 opens with its ultimate."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Strider (Sound)",
            "paragraphs": [
              "The walker as you first see it, amber-cored, stomping across the pad at 2.5 tiles per second. Its **Stride Ring** and **Standing Wave** fill the floor with sound; it taps the fuse box and docks every cycle. Pylon Sparks bring in two [[enemies/hound|Hounds]]."
            ]
          },
          {
            "heading": "Phase 2: The Open (Darkness)",
            "paragraphs": [
              "Its cabinet turns dark with a cold white core and flared louvre wings open at its sides, while a dark, larger copy of the machine stands behind it. It creeps at 2.2 tiles per second and uses the Stride Ring; Pylon Sparks bring in [[enemies/smiler|Smilers]]."
            ]
          },
          {
            "heading": "Phase 3: The Unleashed (Geometry)",
            "paragraphs": [
              "A violet cabinet with glitch strips, the wings folded away. It hop-walks at about 3 tiles per second, pounds the floor, and the floor behind it glitches and falls out. It brings [[enemies/runner|Runners]], and opens the phase with **Last Dance**."
            ]
          }
        ]
      },
      {
        "heading": "Attacks",
        "table": {
          "columns": [
            "Attack",
            "Description",
            "Damage/Notes"
          ],
          "rows": [
            [
              "Stride Ring",
              "A foot lifts for 1.0 seconds while a red strip is marked both ways from it, then a ring of dust runs 14 tiles each way at 14 tiles/s. Jump it. The panel opens for 1.2 seconds afterwards.",
              "About 25."
            ],
            [
              "High Stride",
              "The same ring at head height if a player is camping on a raised perch: drop to the floor.",
              "About 25."
            ],
            [
              "Standing Wave",
              "Two complementary sets of 3-tile floor bands marked 1.2 seconds ahead; the sets fire 1.2 seconds apart. Stand on the unmarked set and hop after each pulse.",
              "About 16 per pulse."
            ],
            [
              "Mains (Dock and Tap)",
              "The dock on the [[items/generator]] opens the core for 3.5 seconds. The tap is a cable thrown to a fuse box that you can unplug.",
              "No damage."
            ],
            [
              "Geometry Rewrite",
              "Phase 3. A 1.5 second marker, then the Hum jumps and the marked spans of the floor (6 tiles wide) open for 5 seconds, or rise as steel blocks.",
              "Falling costs position, not health."
            ],
            [
              "Floor Glitch",
              "Phase 3. After landing, the two floor cells under its trailing foot are marked for 1 second and then fall out for 4 seconds. Its own adds fall in too.",
              "Falling costs position, not health."
            ],
            [
              "Pylon Sparks",
              "A leg throws sparks and a rift opens for 0.8 seconds, releasing the phase's adds. First after 4 seconds, then every 18 / 16 / 14 s.",
              "2 + 1 per extra player."
            ],
            [
              "Last Dance",
              "Phase 3 ultimate, then every 48 s. Two hop-rings, a High Stride hop, a Geometry Rewrite under the player farthest from the Generator, a Standing Wave, then a leap back to the Generator and a 4 second dock at 1.5x damage. The panel stays closed during the dance. Below 15% health the final form adds another pulse and the dock pays 2x.",
              "About 14 s of script."
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fire at the open windows: after each stomp, at every dock, and when you unplug it. In between, your damage is cut to a third.",
          "Always answer the cable. One player shoots the fuse box (or runs to it and pulls the plug) while the others hold the Hum's attention.",
          "Jump rings, hop standing waves between bands and drop to the floor for High Stride.",
          "In Phase 3, do not follow the Hum onto its trail: the floor behind it drops out. Lure adds onto it instead.",
          "Survive the Last Dance and be ready at the dock afterwards: that reward window is your biggest chance to deal damage.",
          "In [[mechanics/co-op-multiplayer|co-op]], a teammate who falls through a hole is on the floor below and can shoot up through it."
        ]
      }
    ],
    "tags": [
      "Boss",
      "Final boss",
      "Generator Room"
    ],
    "gallery": [
      {
        "src": "/fz/wiki/bosses/the-hum-forms.png",
        "alt": "The Hum forms",
        "pixelated": true,
        "caption": "The Strider, The Open, The Unleashed"
      }
    ],
    "trivia": [
      "Silencing The Hum starts the victory sequence: an explosion and a white flash, the core goes dark and the body fades, about 6 seconds before the run is won.",
      "The Hum drops no loot: the victory is the reward."
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-smiler"
      },
      {
        "category": "bosses",
        "slug": "the-missing-manager"
      },
      {
        "category": "enemies",
        "slug": "hound"
      },
      {
        "category": "enemies",
        "slug": "smiler"
      },
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "levels",
        "slug": "generator-room"
      }
    ]
  }
];
