import type { WikiArticle } from "../types";

export const bosses: WikiArticle[] = [
  {
    "slug": "boss-overview",
    "category": "bosses",
    "name": "Boss Encounters",
    "subtitle": "Floor bosses and how they work",
    "summary": "A guide to the six floor bosses of The Last Dungeon: which one you meet on each floor, what they share (phases, transformations, exposure windows, doom pips) and what a boss kill pays.",
    "infobox": [
      {
        "label": "Type",
        "value": "Guide"
      },
      {
        "label": "Bosses",
        "value": "6"
      },
      {
        "label": "Boss floors",
        "value": "4, 8 and 12"
      },
      {
        "label": "Final boss",
        "value": "[[bosses/vegeful|Vegeful]] on floor 12"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Every fourth floor is a [[dungeons/boss-floors|boss floor]]: no ordinary rooms, just one arena and one boss. Which boss you meet depends on the floor and on the mode. In **[[mechanics/difficulty-modes|Normal mode]]**, floor 4 is the [[bosses/skeleton-seeker|Skeleton Seeker]] or the [[bosses/old-guardian|Old Guardian]] (50/50, but always the Seeker for the first three visits of a save), floor 8 is the [[bosses/heavy-knight|Heavy Knight]] and floor 12 is [[bosses/vegeful|Vegeful]]. In **Hard mode**, floor 4 is the [[bosses/ghost-king|Ghost King]] or the Old Guardian (50/50), floor 8 is the [[bosses/desert-hunter|Desert Hunter]] and floor 12 is Vegeful again.",
          "A seventh boss, the Twin Knights, exists in the game's data but no floor selects it."
        ]
      },
      {
        "heading": "The six bosses",
        "paragraphs": [
          "Health values are approximate solo values derived from the balance code (see the Health section)."
        ],
        "table": {
          "columns": [
            "Boss",
            "Floor",
            "Mode",
            "Phases",
            "Health"
          ],
          "rows": [
            [
              "[[bosses/skeleton-seeker|Skeleton Seeker]]",
              "4",
              "Normal",
              "3",
              "About 660"
            ],
            [
              "[[bosses/old-guardian|Old Guardian]]",
              "4",
              "Normal and Hard",
              "3",
              "About 710 (Normal), about 1,360 (Hard)"
            ],
            [
              "[[bosses/ghost-king|Ghost King]]",
              "4",
              "Hard",
              "3",
              "About 1,250"
            ],
            [
              "[[bosses/heavy-knight|Heavy Knight]]",
              "8",
              "Normal",
              "3",
              "About 1,870"
            ],
            [
              "[[bosses/desert-hunter|Desert Hunter]]",
              "8",
              "Hard",
              "3",
              "About 3,550"
            ],
            [
              "[[bosses/vegeful|Vegeful]]",
              "12",
              "Normal and Hard",
              "4",
              "About 3,210 (Normal), about 6,100 (Hard)"
            ]
          ]
        }
      },
      {
        "heading": "Phases and transformations",
        "paragraphs": [
          "Bosses have three phases (four for Vegeful). In solo play the phase changes happen at 72% and 33% of health (70% and 30% for the [[bosses/ghost-king]]; 70%, 40% and 15% for Vegeful). Each change is a **transformation**: the boss staggers, its body reshapes with new parts and a new banner, the camera pulls back a little and the boss opens the new phase with a signature skill. The last phase starts with a longer **rebirth** during which the music stops.",
          "After a transformation the boss stands exposed, with a golden outline, and takes extra damage for a moment (about 1.4 to 1.5 times). Several skills also leave the boss exposed after you solve them, for example by luring a bomb or a skull into it."
        ],
        "media": [
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/phase-2.gif",
            "alt": "The Skeleton Seeker transforming at 72% health",
            "caption": "A transformation: the [[bosses/skeleton-seeker|Skeleton Seeker]] collapses and rebuilds as the Bone Crown.",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ]
      },
      {
        "heading": "Skills, telegraphs and the oh-no",
        "paragraphs": [
          "Boss skills are built to a fairness law: every damaging skill is telegraphed with a ground marker, an aim line or a sound, and there is always a walking answer that leaves you a margin of at least about 0.1 seconds. No single skill hit exceeds 48 damage, and standing still through a whole skill costs at most about two ordinary boss hits.",
          "Each boss has one **oh-no**: its biggest skill, used in the last phase. When the boss has lost most of its health, three **doom pips** appear on its health bar (lit at 25%, 18% and 11%) and the third pip makes it cast the oh-no one more time (Vegeful instead runs a fixed loop).",
          "Between skills, a boss's ordinary melee hit still applies if you hug it, except during transformations and a few special moments."
        ]
      },
      {
        "heading": "Health",
        "paragraphs": [
          "Boss health is shown as a number of bars (15 for the Seeker and Ghost King, 16 for the [[bosses/old-guardian]], 20 for the [[bosses/desert-hunter]], 25 for Vegeful and 30 for the [[bosses/heavy-knight]]). The size of one bar is about 25 times the boss's health scale, times a floor factor of 1 + 0.23 per floor above the first, times about 1.29 and times a per-boss multiplier, then times 1.9 in [[mechanics/difficulty-modes|Hard mode]]. The totals in this wiki were derived that way for solo play.",
          "In [[mechanics/co-op-multiplayer|co-op]] games boss health is 35% higher per extra player."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell.",
          "The Gold in the chest is the main source of the Gold needed for the game's top [[mechanics/crafting|crafting]] [[items/recipes|recipes]]."
        ]
      },
      {
        "heading": "Solo and co-op",
        "paragraphs": [
          "The current skill kits, transformations, new phase thresholds and presentation are solo-only. [[mechanics/co-op-multiplayer|Co-op]] games still use the older kits of each boss (for example the Seeker's summoned skeletons and the Heavy Knight's Strike and Rampage) with the older thresholds (66% and 33%, or 65% and 30% for the Ghost King)."
        ]
      }
    ],
    "tags": [
      "Guide"
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "skeleton-seeker"
      },
      {
        "category": "bosses",
        "slug": "old-guardian"
      },
      {
        "category": "bosses",
        "slug": "heavy-knight"
      },
      {
        "category": "bosses",
        "slug": "vegeful"
      },
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "items",
        "slug": "recipes"
      }
    ]
  },
  {
    "slug": "skeleton-seeker",
    "category": "bosses",
    "name": "Skeleton Seeker",
    "subtitle": "Keeper of the Bone Throne - Floor 4 boss (Normal)",
    "summary": "A giant stitched together from the bones of the dungeon's dead. It teaches the boss rules: rings of bone arrows, fake-out charges, ticking skull bombs and a closing rib cage.",
    "image": {
      "src": "/ld/wiki/bosses/skeleton-seeker.png",
      "alt": "Skeleton Seeker sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "4 ([[dungeons/the-dungeon|Dungeon]], Normal mode)"
      },
      {
        "label": "Phases",
        "value": "3 (Ossuary Seeker, Bone Crown, Open Ribcage)"
      },
      {
        "label": "Health",
        "value": "About 660 in solo play (15 health bars; derived)"
      },
      {
        "label": "Title",
        "value": "Keeper of the Bone Throne"
      },
      {
        "label": "Base hit",
        "value": "About 40 (its skills are multiples of this)"
      },
      {
        "label": "Phase changes",
        "value": "At 72% and 33% health (solo)"
      },
      {
        "label": "Rewards",
        "value": "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]] and an exit portal"
      },
      {
        "label": "Chance to face",
        "value": "50% with the [[bosses/old-guardian|Old Guardian]]; always the Seeker for the first three visits to floor 4"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Skeleton Seeker** guards the first [[dungeons/boss-floors|boss floor]] of [[mechanics/difficulty-modes|Normal mode]]. It is the boss that teaches the rules: it shows its attacks long before they land, rewards walking out of danger and punishes standing still.",
          "A new save always meets the Seeker on its first three visits to floor 4, because the [[bosses/old-guardian]] is the harder fight. After that, floor 4 picks the Seeker or the Old Guardian at random.",
          "In a fight the Seeker towers over the hero, with a nest of skulls above two long arms. Its ordinary melee swing keeps working between and during its skills, so hugging it is never free."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "The Seeker changes phase at 72% and 33% of its health. Each change is a **transformation**: it staggers, its body reshapes and for a moment it is exposed to extra damage. The banner names are BONES RISE and THE OSSUARY OPENS."
        ],
        "subsections": [
          {
            "heading": "Phase 1: Ossuary Seeker",
            "paragraphs": [
              "The plain form: a skeleton giant with a cluster of five skulls. It uses **Bone Nova**, **Bone Rush** and **Bone Bomb**. If you hug it for more than two seconds it hops back (**Bone Scatter**) and then throws a bomb."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/skeleton-seeker/phase-1.gif",
                "alt": "Skeleton Seeker, phase 1: Ossuary Seeker",
                "caption": "The intro card and the first form, Ossuary Seeker.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 2: Bone Crown",
            "paragraphs": [
              "At 72% the skeleton collapses and rebuilds: the skulls crawl up into a crown, fins grow along the spine and two small skulls orbit it. It gains **Skull Bowl**; Bone Nova and Bone Bomb continue."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/skeleton-seeker/phase-2.gif",
                "alt": "Skeleton Seeker, phase 2: Bone Crown",
                "caption": "The phase 2 transformation into Bone Crown.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 3: Open Ribcage",
            "paragraphs": [
              "At 33% the Seeker rips open its chest, ribs fan out like teeth and a white marrow core glows inside. The music stops. Three countdown pips appear on its health bar and it opens with the **Ossuary Gate**. When the third pip lights it casts the Gate once more."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/skeleton-seeker/phase-3.gif",
                "alt": "Skeleton Seeker, phase 3: Open Ribcage",
                "caption": "The phase 3 transformation into Open Ribcage.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          }
        ]
      },
      {
        "heading": "Skills",
        "table": {
          "columns": [
            "Skill",
            "Phases",
            "What happens",
            "How to beat it"
          ],
          "rows": [
            [
              "Bone Nova",
              "All",
              "It tears bones from its chest and hangs rings of bone arrows around itself, then fires them ring by ring. Each ring has a gap and the next ring's gap is offset.",
              "Stand in the gap of each ring in turn."
            ],
            [
              "Bone Rush",
              "All",
              "It lowers its skull like a ram. From the second cast it sometimes fakes the charge. The real charge flashes its eye sockets and draws a red lane before it runs.",
              "Wait for the real charge and step sideways off the lane."
            ],
            [
              "Bone Bomb",
              "All",
              "It throws a skull in a high arc. A skeleton carrying a fuse crawls out beside you and a red disc fills over a few seconds to the sound of a heartbeat.",
              "Shoot the skeleton, or leave the disc. Lure the Seeker into the blast and it hurts itself."
            ],
            [
              "Bone Scatter",
              "All (reaction)",
              "If you stay hugged against it, it hops back (no damage) and throws a Bone Bomb.",
              "Not an attack, but a reason not to hug it."
            ],
            [
              "Skull Bowl",
              "2-3",
              "It tears a skull from its crown and rolls it along the floor into the walls, never straight at you. The path is shown in white dots ahead of time. The skull rebounds (more times and two skulls in the last phase).",
              "Stay out of the bounce segments. A skull that hits the Seeker hurts it."
            ],
            [
              "Ossuary Gate",
              "3 (finale)",
              "The screen darkens. 24 ribs drop in a ring around you and the ring closes. A single doorway narrows and drifts around the ring while the giant walks outside it.",
              "Head straight for the door. Running through a rib costs health."
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/bone-nova.gif",
            "alt": "Skeleton Seeker casting Bone Nova",
            "caption": "Bone Nova",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/bone-rush.gif",
            "alt": "Skeleton Seeker casting Bone Rush",
            "caption": "Bone Rush",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/bone-bomb.gif",
            "alt": "Skeleton Seeker casting Bone Bomb",
            "caption": "Bone Bomb",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/bone-scatter.gif",
            "alt": "Skeleton Seeker casting Bone Scatter",
            "caption": "Bone Scatter",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/skull-bowl.gif",
            "alt": "Skeleton Seeker casting Skull Bowl",
            "caption": "Skull Bowl",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/skeleton-seeker/ossuary-gate.gif",
            "alt": "Skeleton Seeker casting Ossuary Gate (finale)",
            "caption": "Ossuary Gate (finale)",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ],
        "paragraphs": [
          "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell."
        ]
      },
      {
        "heading": "Co-op note",
        "paragraphs": [
          "In a [[mechanics/co-op-multiplayer|co-op]] game the Seeker keeps its older kit (summoned skeletons, Bone Nova, Bone Rush and Bone Rain) and the older phase thresholds (66% and 33%). Its health is 35% higher per extra player."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Never hug it. Besides its swing, a hugged Seeker hops away and throws a bomb.",
          "In Bone Bomb, kill the skeleton with the fuse. If you cannot, leave the disc and let the Seeker stand in it.",
          "Treat every Skull Bowl line as a wall: stay out of the segments, not just the skull.",
          "Right after a transformation the Seeker is exposed: spend your best damage there.",
          "In the last phase, watch the doorway of the Ossuary Gate; do not try to shoot through the ribs."
        ]
      }
    ],
    "tags": [
      "Normal mode",
      "Floor 4",
      "Dungeon"
    ],
    "trivia": [
      "The Seeker's solo health thresholds are 72% and 33%; [[mechanics/co-op-multiplayer|co-op]] keeps the older 66% and 33%."
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "bosses",
        "slug": "old-guardian"
      },
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "items",
        "slug": "boss-chest"
      },
      {
        "category": "dungeons",
        "slug": "boss-floors"
      }
    ]
  },
  {
    "slug": "old-guardian",
    "category": "bosses",
    "name": "Old Guardian",
    "subtitle": "Warden of the Deep - Floor 4 boss (Normal and Hard)",
    "summary": "A sleeping stone warden whose body, floor and ceiling are all weapons. Its eye wakes when you shoot it, and every skill punishes a different habit: shooting, standing still, or staying on the ground.",
    "image": {
      "src": "/ld/wiki/bosses/old-guardian.png",
      "alt": "Old Guardian sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "4 (Dungeon in Normal mode, [[dungeons/the-castle|Castle]] in Hard mode)"
      },
      {
        "label": "Phases",
        "value": "3 (Dormant Warden, The Eye Wakes, Shell Shed)"
      },
      {
        "label": "Health",
        "value": "About 710 in Normal mode and about 1,360 in Hard mode (16 health bars; derived)"
      },
      {
        "label": "Title",
        "value": "Warden of the Deep"
      },
      {
        "label": "Base hit",
        "value": "About 33 (Normal) or 63 (Hard)"
      },
      {
        "label": "Phase changes",
        "value": "At 72% and 33% health (solo)"
      },
      {
        "label": "Rewards",
        "value": "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]] and an exit portal"
      },
      {
        "label": "Chance to face",
        "value": "50% against the [[bosses/skeleton-seeker|Skeleton Seeker]] in Normal mode and 50% against the [[bosses/ghost-king|Ghost King]] in Hard mode"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Old Guardian** is a floor 4 boss that appears in both modes. It starts as a stone statue and wakes only when you come close, hit it or after two seconds. Its shell, its fists and the ceiling of the room are its weapons.",
          "Of the two [[mechanics/difficulty-modes|Normal-mode]] floor 4 bosses it is the harder one (more health and a kit that is harder to read), which is why a new save always meets the Seeker first. Between its main skills the Guardian fills gaps with an exploding ball (**Blast**) about every five seconds, and in Hard mode also a thrown clod of dirt (**Lob**) about every fifteen."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "The Guardian changes phase at 72% and 33% health. The banners read THE EYE WAKES and THE CEILING FALLS."
        ],
        "subsections": [
          {
            "heading": "Phase 1: Dormant Warden",
            "paragraphs": [
              "A stone statue with a closed eye. It uses **Stone Ward**, **Titan Stomp** and **Faultline**."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/old-guardian/phase-1.gif",
                "alt": "Old Guardian, phase 1: Dormant Warden",
                "caption": "The intro card and the first form, Dormant Warden.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 2: The Eye Wakes",
            "paragraphs": [
              "Glowing cracks run through the shell, crystal spikes grow on the shoulders and back, and one white eye opens and follows you. Its skills run in a faster rhythm and its stomps and faults get longer chains."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/old-guardian/phase-2.gif",
                "alt": "Old Guardian, phase 2: The Eye Wakes",
                "caption": "The phase 2 transformation into The Eye Wakes.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 3: Shell Shed",
            "paragraphs": [
              "The shell splits along the spine and falls away, leaving a basalt core with a crystal ridge. The music stops and three countdown pips appear on its health bar. It opens with **Ceiling Falls** and casts it once more when the third pip lights."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/old-guardian/phase-3.gif",
                "alt": "Old Guardian, phase 3: Shell Shed",
                "caption": "The phase 3 transformation into Shell Shed.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          }
        ]
      },
      {
        "heading": "Skills",
        "table": {
          "columns": [
            "Skill",
            "Phases",
            "What happens",
            "How to beat it"
          ],
          "rows": [
            [
              "Stone Ward",
              "All",
              "Its eye closes and four stone plates slide over its shell as it walks toward you. Every bullet you fire turns into a stone shard that hangs for a moment with a fixed path pointing at where you stood, and then flies back along that path. Your fire button and aim ring flash grey with the call STOP FIRING.",
              "Stop shooting until the eye opens (a bell and a golden outline). Sidestep the returning shards. Not firing costs nothing and lengthens the bonus window."
            ],
            [
              "Titan Stomp",
              "All",
              "It raises a fist that turns into a boulder. A red disc around it fills and it slams. In later phases the disc is larger, and it follows with a second fist.",
              "Step out of the disc."
            ],
            [
              "Faultline",
              "All",
              "It kneels and slams both hands down; white cracks spread across the floor toward you. After a short silence the cracks turn red and shatter.",
              "Remember where the cracks are and stand on whole floor. Lure it onto its own cracks to hurt it. In [[mechanics/difficulty-modes|Hard mode]] (Brittle Stone) the cracks start from the nearest stomp mark."
            ],
            [
              "Ceiling Falls",
              "3 (finale)",
              "It jumps and clings to the ceiling. Six room-wide strips of rock fall one after another, each marked first by a white shadow and then red. The strip that just fell becomes a safe crater. At the end it drops, dazed, into the rubble.",
              "Stand on the edge of the next strip and step into the crater that has just fallen. The recast sweeps twice."
            ],
            [
              "Blast (gap filler)",
              "All",
              "An exploding stone ball every five seconds or so while no kit skill is running (never before the first skill).",
              "Sidestep the ball."
            ],
            [
              "Lob (Hard only)",
              "All",
              "A thrown dirt clod about every fifteen seconds in the same gaps.",
              "Sidestep the clod."
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/bosses/old-guardian/stone-ward.gif",
            "alt": "Old Guardian casting Stone Ward",
            "caption": "Stone Ward",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/old-guardian/titan-stomp.gif",
            "alt": "Old Guardian casting Titan Stomp",
            "caption": "Titan Stomp",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/old-guardian/faultline.gif",
            "alt": "Old Guardian casting Faultline",
            "caption": "Faultline",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/old-guardian/blast.gif",
            "alt": "Old Guardian casting Blast (gap filler)",
            "caption": "Blast (gap filler)",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/old-guardian/lob.gif",
            "alt": "Old Guardian casting Lob (a Hard-mode skill)",
            "caption": "Lob (a Hard-mode skill)",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/old-guardian/ceiling-falls.gif",
            "alt": "Old Guardian casting Ceiling Falls (finale)",
            "caption": "Ceiling Falls (finale)",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ],
        "paragraphs": [
          "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot."
        ]
      },
      {
        "heading": "Hard mode",
        "paragraphs": [
          "In [[mechanics/difficulty-modes|Hard mode]] the Guardian has about 1.9 times the health and damage. It also gains the rule **Brittle Stone**: its Faultline cracks start from the nearest Titan Stomp mark instead of from the Guardian."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell."
        ]
      },
      {
        "heading": "Co-op note",
        "paragraphs": [
          "In [[mechanics/co-op-multiplayer|co-op]] games the Guardian keeps its older kit (a dirt throw and an exploding ball on timers) and the older phase thresholds (66% and 33%)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stone Ward is a test of patience: let go of the fire button as soon as the eye closes.",
          "Walk out of every disc and stand on unbroken floor during Faultline.",
          "In Ceiling Falls, do not run to the far wall; the safe place is the crater that has just fallen.",
          "In Hard mode, treat each Titan Stomp mark as the start of a future fault."
        ]
      }
    ],
    "tags": [
      "Normal mode",
      "Hard mode",
      "Floor 4"
    ],
    "trivia": [
      "The Old Guardian is the only boss that can appear in both Normal and Hard mode on floor 4."
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "bosses",
        "slug": "skeleton-seeker"
      },
      {
        "category": "bosses",
        "slug": "ghost-king"
      },
      {
        "category": "items",
        "slug": "boss-chest"
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
    "slug": "heavy-knight",
    "category": "bosses",
    "name": "Heavy Knight",
    "subtitle": "The Executioner (The Iron Wall) - Floor 8 boss (Normal)",
    "summary": "The headsman of the jungle fortress. He walks slower than you and waits for you to panic: every skill of his is a test of nerve, built around a hanging halberd blade.",
    "image": {
      "src": "/ld/wiki/bosses/heavy-knight.png",
      "alt": "Heavy Knight sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "8 ([[dungeons/the-jungle|Jungle]], Normal mode)"
      },
      {
        "label": "Phases",
        "value": "3 (The Executioner, Molten Visor, The Headsman)"
      },
      {
        "label": "Health",
        "value": "About 1,870 in solo play (30 health bars; derived)"
      },
      {
        "label": "Title",
        "value": "The Iron Wall; The Executioner in solo play"
      },
      {
        "label": "Base hit",
        "value": "About 54 (skill hits are capped at 48)"
      },
      {
        "label": "Phase changes",
        "value": "At 72% and 33% health (solo)"
      },
      {
        "label": "Rewards",
        "value": "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]] and an exit portal"
      },
      {
        "label": "Chance to face",
        "value": "Always on floor 8 of Normal mode"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Heavy Knight** is the floor 8 boss of [[mechanics/difficulty-modes|Normal mode]] and, with its 30 health bars, the longest boss fight of the game. In the designers' simulations he was the single most common place for a mid-level run to end.",
          "He does not chase you; he walks more slowly than you and waits. Each of his four skills is a nerve test: stay calm, do not dash early and read the telegraph. His mechanics all circle one idea, the **halberd** he holds over his head.",
          "His ordinary melee hit still runs between skills, so hugging him is never safe; against that, his skill hits are capped (no single hit above 48 damage)."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "He changes phase at 72% and 33% health. The solo banners are MOLTEN VISOR and THE HEADSMAN."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Executioner",
            "paragraphs": [
              "A hulking armored figure with a burning crest. Each footstep shakes the screen, more when he is near. He opens the fight holding his halberd high and uses **Executioner's Hold**, **Halberd Whirl** and **Headsman's Cleave**."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/heavy-knight/phase-1.gif",
                "alt": "Heavy Knight, phase 1: The Executioner",
                "caption": "The intro card and the first form, The Executioner.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 2: Molten Visor",
            "paragraphs": [
              "The crest burns away, shackles slam onto his wrists with broken chains swinging, horns grow from the helmet and the visor glows white. His skills come faster."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/heavy-knight/phase-2.gif",
                "alt": "Heavy Knight, phase 2: Molten Visor",
                "caption": "The phase 2 transformation into Molten Visor.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 3: The Headsman",
            "paragraphs": [
              "Two pauldrons burst off and drop onto chains, a hood falls over the helm and two chains cross his chest. He draws a circle on the floor with the halberd and the music stops. He opens with **Iron Verdict** and casts it once more when the third countdown pip lights. When he dies, the armor collapses empty."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/heavy-knight/phase-3.gif",
                "alt": "Heavy Knight, phase 3: The Headsman",
                "caption": "The phase 3 transformation into The Headsman.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          }
        ]
      },
      {
        "heading": "Skills",
        "table": {
          "columns": [
            "Skill",
            "Phases",
            "What happens",
            "How to beat it"
          ],
          "rows": [
            [
              "Executioner's Hold",
              "All",
              "He lifts the halberd over his head. A ring follows you with a ghost blade drawn on it. A rising whine cuts out exactly as the blade flashes. The ring locks and fills red for about a second, then he cuts. The hold time is 0.45 or 1.0 s and cannot be predicted.",
              "Walk normally and do not dash. Step out when the blade flashes. If you stay calm and never dash during the whole attack you get a NERVES OF STEEL bonus (his health bar takes x1.6); a panic dash wastes your dash and brings the flash sooner in later phases."
            ],
            [
              "Halberd Whirl",
              "All",
              "He crouches and swings the halberd behind him; an orange ring appears around him with a hole at his feet and he spins twice. In phases 2 and 3 he spins a second time with a smaller hole.",
              "Dash into the hole next to his feet (a x1.4 bonus) or stay outside the ring."
            ],
            [
              "Headsman's Cleave",
              "All",
              "He rests the halberd on one shoulder and half the room on that side turns red, filling in about 1.6 s. In phase 2 he walks forward first; in phase 3 he turns the cleave into a Whirl.",
              "Cross to the other half of the room along the white lane behind him."
            ],
            [
              "Iron Verdict",
              "3 (finale)",
              "He plants the halberd and draws a ring of glyphs. A mark appears above your head, three shackle marks appear on his health bar and three bells toll as the room darkens.",
              "Stand within range and land the required hits on him (1, 2 and 2) before each bell. If you break all the shackles he kneels for about 4 seconds (x1.6 damage). Each unbroken shackle drops a ghost axe and locks your dash for 2.5 s."
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/bosses/heavy-knight/executioners-hold.gif",
            "alt": "Heavy Knight casting Executioner's Hold",
            "caption": "Executioner's Hold",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/heavy-knight/halberd-whirl.gif",
            "alt": "Heavy Knight casting Halberd Whirl",
            "caption": "Halberd Whirl",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/heavy-knight/headsmans-cleave.gif",
            "alt": "Heavy Knight casting Headsman's Cleave",
            "caption": "Headsman's Cleave",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/heavy-knight/iron-verdict.gif",
            "alt": "Heavy Knight casting Iron Verdict (finale)",
            "caption": "Iron Verdict (finale)",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ],
        "paragraphs": [
          "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell."
        ]
      },
      {
        "heading": "Co-op note",
        "paragraphs": [
          "In [[mechanics/co-op-multiplayer|co-op]] games the Knight uses his older kit (a Strike with a disc around him and a double-hit variant, a Quake Slam, a Rampage charge). His health is 35% higher per extra player."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stay calm during Executioner's Hold: do not dash until the blade flashes, and ideally not at all.",
          "Dash into the hole of the Whirl rather than away from it: the hole is at his feet.",
          "In Iron Verdict you have to attack him; stay in range and count your hits before each bell.",
          "Burst him down after a transformation or after a broken verdict, when his armor takes extra damage.",
          "Bring plenty of health items: the fight is long."
        ]
      }
    ],
    "tags": [
      "Normal mode",
      "Floor 8",
      "Jungle"
    ],
    "trivia": [
      "A second, unused variant called the Twin Knights exists in the game data, but no floor chooses it."
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "bosses",
        "slug": "vegeful"
      },
      {
        "category": "enemies",
        "slug": "hammer"
      },
      {
        "category": "items",
        "slug": "boss-chest"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      }
    ]
  },
  {
    "slug": "ghost-king",
    "category": "bosses",
    "name": "Ghost King",
    "subtitle": "The Hollow Crown - Floor 4 boss (Hard)",
    "summary": "A dead king who still holds court. Before him you may move only when the king allows it, and the court's rules punish both standing still and looking back.",
    "image": {
      "src": "/ld/wiki/bosses/ghost-king.png",
      "alt": "Ghost King sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "4 ([[dungeons/the-castle|Castle]], Hard mode)"
      },
      {
        "label": "Phases",
        "value": "3 (The Hollow King, The Court Rises, Wrath of the King)"
      },
      {
        "label": "Health",
        "value": "About 1,250 in solo Hard mode (15 health bars; derived)"
      },
      {
        "label": "Title",
        "value": "The Hollow Crown"
      },
      {
        "label": "Base hit",
        "value": "About 31 (its skills are multiples of this; it has no touch attack)"
      },
      {
        "label": "Phase changes",
        "value": "At 70% and 30% health (solo)"
      },
      {
        "label": "Rewards",
        "value": "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]] and an exit portal"
      },
      {
        "label": "Chance to face",
        "value": "50% against the [[bosses/old-guardian|Old Guardian]]"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Ghost King** is the [[mechanics/difficulty-modes|Hard-mode]] alternative to the [[bosses/old-guardian]] on floor 4. He is a ranged boss with no touch attack: all of his damage comes from skills, and every skill asks you to move, or not move, at a particular moment.",
          "The two rules of his court contradict each other: while his eye is open, stand still; while he points his sword at you, do not turn back."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "He changes phase at 70% and 30% health. The banners read THE COURT RISES and WRATH OF THE KING."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Hollow King",
            "paragraphs": [
              "A masked king with a five-pointed crown, a huge sword carried across the back and a tail of spirit instead of legs. He opens with whispers from the whole court and one blink of an eye over his head."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/ghost-king/phase-1.gif",
                "alt": "Ghost King, phase 1: The Hollow King",
                "caption": "The intro card and the first form, The Hollow King.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 2: The Court Rises",
            "paragraphs": [
              "He bows, four streams of souls fly into him and his body turns translucent. His crown ignites, a ghostly cloak with five funeral candles unfurls and four ghost courtiers kneel on the upper wall."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/ghost-king/phase-2.gif",
                "alt": "Ghost King, phase 2: The Court Rises",
                "caption": "The phase 2 transformation into The Court Rises.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 3: Wrath of the King",
            "paragraphs": [
              "He tears himself into four streams of fire that fly into the courtiers; the room is empty and his mask falls and shatters. After four tolls the courtiers send the fire back and he reappears as a skull with a single burning eye socket and a broken crown. Three countdown pips appear on his health bar and he opens with **The Dead Court**, which he repeats once when the third pip lights."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/ghost-king/phase-3.gif",
                "alt": "Ghost King, phase 3: Wrath of the King",
                "caption": "The phase 3 transformation into Wrath of the King.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          }
        ]
      },
      {
        "heading": "Skills",
        "table": {
          "columns": [
            "Skill",
            "Phases",
            "What happens",
            "How to beat it"
          ],
          "rows": [
            [
              "Royal Silence",
              "All",
              "He raises a hand and a huge eye opens over his head. A white ring under your feet shows you are being judged, and the king walks toward you. In phases 2 and 3 the eye squints (half closes) and snaps open again as a trick. Only a fully closed eye with a high, clear bell is safe. A low bell marks the doom countdown.",
              "Release the movement stick while the eye is open and walk only while it is fully closed."
            ],
            [
              "Banner Wheel",
              "All",
              "He glides to the middle of the room. A dotted arc shows the turn direction. Four to five funeral banners rise and sweep around like clock hands for about four seconds, each fading as it goes. In phase 2 the wheel reverses on a bell.",
              "Walk around the king in the direction of the wheel, through the gap between two banners. The banners reach all the way to the walls."
            ],
            [
              "Ghost Footprints",
              "All",
              "He points his sword at you: DO NOT LOOK BACK! For two seconds (three in the last phase) your steps leave faint footprints; then they turn violet and explode.",
              "Keep moving forward along a long curve and never step onto a violet footprint again."
            ],
            [
              "The Dead Court",
              "3 (finale)",
              "Every torch is torn from its holder and flies into his sword, so only the king is lit. Courtiers become jurors. A 140 degree cone in front of him explodes three times while he turns to follow you between blasts.",
              "Run round behind him and stay on his back, or stay beyond the cone's reach."
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/bosses/ghost-king/royal-silence.gif",
            "alt": "Ghost King casting Royal Silence",
            "caption": "Royal Silence",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/ghost-king/banner-wheel.gif",
            "alt": "Ghost King casting Banner Wheel",
            "caption": "Banner Wheel",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/ghost-king/ghost-footprints.gif",
            "alt": "Ghost King casting Ghost Footprints",
            "caption": "Ghost Footprints",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/ghost-king/the-dead-court.gif",
            "alt": "Ghost King casting The Dead Court (finale)",
            "caption": "The Dead Court (finale)",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ],
        "paragraphs": [
          "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell."
        ]
      },
      {
        "heading": "Co-op note",
        "paragraphs": [
          "[[mechanics/co-op-multiplayer|Co-op]] games use the king's older kit (summoned minions with a shield, a thrown projectile and a jump), and the older phase thresholds (65% and 30%)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Obey the eye: no stick movement while it is open.",
          "In the Banner Wheel, move with the banners, not against them.",
          "After the sword points at you, run forward along a curve; do not backtrack.",
          "In The Dead Court, run toward the king and past him, not away from the cone."
        ]
      }
    ],
    "tags": [
      "Hard mode",
      "Floor 4",
      "Castle"
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "bosses",
        "slug": "old-guardian"
      },
      {
        "category": "bosses",
        "slug": "desert-hunter"
      },
      {
        "category": "items",
        "slug": "boss-chest"
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
    "slug": "desert-hunter",
    "category": "bosses",
    "name": "Desert Hunter",
    "subtitle": "Shadow of the Dunes - Floor 8 boss (Hard)",
    "summary": "A hooded hunter made of sand. You never quite know which of him is real until the blade comes out, and at the end the desert itself drags you toward his pit.",
    "image": {
      "src": "/ld/wiki/bosses/desert-hunter.png",
      "alt": "Desert Hunter sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "8 ([[dungeons/the-sand-ruins|Sand Ruins]], Hard mode)"
      },
      {
        "label": "Phases",
        "value": "3 (The Hunter, Mirage Wraith, The Dune Tyrant)"
      },
      {
        "label": "Health",
        "value": "About 3,550 in solo Hard mode (20 health bars; derived)"
      },
      {
        "label": "Title",
        "value": "Shadow of the Dunes"
      },
      {
        "label": "Base hit",
        "value": "About 49 (its skills are multiples of this; it has no touch attack)"
      },
      {
        "label": "Phase changes",
        "value": "At 72% and 33% health (solo)"
      },
      {
        "label": "Rewards",
        "value": "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]] and an exit portal"
      },
      {
        "label": "Chance to face",
        "value": "Always on floor 8 of Hard mode"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The **Desert Hunter** is the floor 8 boss of [[mechanics/difficulty-modes|Hard mode]]. He is a ranged, skill-only boss: sand is his body, and every attack makes you guess, hide or run.",
          "Because he has no touch attack, he never needs to come near you; he plays the whole arena at range with sand."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "He changes phase at 72% and 33% health. The banners read THE HUNTER CLOSES IN and NO MORE HIDING."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Hunter",
            "paragraphs": [
              "A hooded, veiled figure with a long curved blade and white-amber eyes, rising out of a dune. Heat shimmer surrounds him from the first second."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/desert-hunter/phase-1.gif",
                "alt": "Desert Hunter, phase 1: The Hunter",
                "caption": "The intro card and the first form, The Hunter.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 2: Mirage Wraith",
            "paragraphs": [
              "[[dungeons/the-sand-ruins|Sand Ruins]] pours off his body and he steps out of his own shell: a taller form. The old shell stands empty next to him, with no eyes and no shadow, and then collapses into a dune."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/desert-hunter/phase-2.gif",
                "alt": "Desert Hunter, phase 2: Mirage Wraith",
                "caption": "The phase 2 transformation into Mirage Wraith.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 3: The Dune Tyrant",
            "paragraphs": [
              "The sand floor flows toward him; his legs become a whirlwind and two antlion mandibles grow from his hood. Thunder. Three countdown pips appear on his health bar and he opens with the **Antlion Maw**, which he repeats once at the third pip."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/desert-hunter/phase-3.gif",
                "alt": "Desert Hunter, phase 3: The Dune Tyrant",
                "caption": "The phase 3 transformation into The Dune Tyrant.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          }
        ]
      },
      {
        "heading": "Skills",
        "table": {
          "columns": [
            "Skill",
            "Phases",
            "What happens",
            "How to beat it"
          ],
          "rows": [
            [
              "Mirage Tide",
              "All",
              "He lifts the blade to the sky and a groove of sand runs from his feet to the far wall. A row of sand needles hangs faintly on the far wall and then the whole wall of needles sweeps across the room with one gap. In phase 1 a gap slides along a white arrow; in phase 2 there are two rows.",
              "Stand in the gap (follow the arrow in phase 1). Dashing through the wall earns a bigger bonus."
            ],
            [
              "[[dungeons/the-sand-ruins|Sand Ruins]] Hands I / II / III",
              "All",
              "He plunges his hands into the sand. Small circles fill over about 0.8 seconds where you are about to go (alternating with where you are standing), and hands of sand burst out.",
              "Change direction constantly and leave each circle."
            ],
            [
              "Mirage Doubles",
              "All",
              "He blurs and appears as three of himself around you (four in phase 2, in two rounds). The real one has a shadow, glowing eyes and trickling sand; the mirages are mottled with no eyes and no shadow. Each shows a fan on the ground; mirages burst into sand while the real one's fan fills red and then slashes.",
              "Find the one with the shadow and step sideways out of his fan."
            ],
            [
              "Antlion Maw",
              "3 (finale)",
              "He walks to the middle of the room and sinks to his waist into a pit. Sand Ruins trails converge, there is half a second of silence, and the sand drags you toward the pit for about five seconds (always weaker than your walking speed). The pit bites every 1.25 s and widens.",
              "Keep walking away the whole time. Standing still gets you bitten twice; walking away costs nothing. In the dead centre it takes you about 1.3 s to get out."
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/bosses/desert-hunter/mirage-tide.gif",
            "alt": "Desert Hunter casting Mirage Tide",
            "caption": "Mirage Tide",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/desert-hunter/sand-hands-1.gif",
            "alt": "Desert Hunter casting Sand Ruins Hands I",
            "caption": "Sand Ruins Hands I",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/desert-hunter/sand-hands-2.gif",
            "alt": "Desert Hunter casting Sand Ruins Hands II",
            "caption": "Sand Ruins Hands II",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/desert-hunter/sand-hands-3.gif",
            "alt": "Desert Hunter casting Sand Ruins Hands III",
            "caption": "Sand Ruins Hands III",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/desert-hunter/mirage-doubles.gif",
            "alt": "Desert Hunter casting Mirage Doubles",
            "caption": "Mirage Doubles",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/desert-hunter/antlion-maw.gif",
            "alt": "Desert Hunter casting Antlion Maw (finale)",
            "caption": "Antlion Maw (finale)",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ],
        "paragraphs": [
          "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell."
        ]
      },
      {
        "heading": "Co-op note",
        "paragraphs": [
          "In [[mechanics/co-op-multiplayer|co-op]] games he uses an older kit (an untelegraphed volley, summoned minions and sand hands). Health is 35% higher per extra player."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "In Mirage Doubles, look for the shadow and the glowing eyes, not for the fan.",
          "Sand Ruins Hands aim ahead of you; do not run in straight lines.",
          "In the Antlion Maw, walk steadily away from the pit and do not stop to shoot.",
          "Use your dash to cross a Mirage Tide wall; it pays a bonus."
        ]
      }
    ],
    "tags": [
      "Hard mode",
      "Floor 8",
      "Sand"
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "bosses",
        "slug": "ghost-king"
      },
      {
        "category": "bosses",
        "slug": "vegeful"
      },
      {
        "category": "items",
        "slug": "boss-chest"
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
    "slug": "vegeful",
    "category": "bosses",
    "name": "Vegeful",
    "subtitle": "The Last Guardian - Floor 12 boss (Normal and Hard)",
    "summary": "The grief of every hero who died in the dungeon, haloed by a ring of ghost swords. It is the final boss of both modes, with four phases, a growing wingspan of blades and a fixed finale of judgments.",
    "image": {
      "src": "/ld/wiki/bosses/vegeful.png",
      "alt": "Vegeful sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Floor",
        "value": "12 ([[dungeons/the-lab|Lab]], Normal and Hard mode)"
      },
      {
        "label": "Phases",
        "value": "4 (The Vengeful Spirit, Grief Unbound, The Blades Awaken, Last Stand)"
      },
      {
        "label": "Health",
        "value": "About 3,210 in Normal mode and about 6,100 in Hard mode (25 health bars; derived)"
      },
      {
        "label": "Title",
        "value": "The Last Guardian"
      },
      {
        "label": "Base hit",
        "value": "About 35 (Normal) or 66 (Hard); skills are multiples of this and capped at 48"
      },
      {
        "label": "Phase changes",
        "value": "At 70%, 40% and 15% health"
      },
      {
        "label": "Rewards",
        "value": "[[items/boss-chest|Boss chest]], [[items/sand-clock|Sand Clocks]] and an exit portal"
      },
      {
        "label": "Chance to face",
        "value": "Always on floor 12, in both modes"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Vegeful** is the final boss. It is a hovering skull-faced spirit in a dark red robe with a halo of three ghost swords, and its size grows with every phase: the last form stands taller than any other boss and has a sword-bladed wingspan of 128 pixels.",
          "Every time it transforms it screams, and one corner of the room's lighting goes out; by the end, only its own light remains. Its parts of the fight are about **swords**: swords that hunt you, swords that are your countdown, and a judgment that leaves one island of safety.",
          "It has no touch attack to speak of; its damage comes from the skills below."
        ]
      },
      {
        "heading": "Phases",
        "paragraphs": [
          "Vegeful is the only boss with four phases, changing at 70%, 40% and 15% health. The solo banners read GRIEF UNBOUND, THE BLADES AWAKEN and LAST STAND."
        ],
        "subsections": [
          {
            "heading": "Phase 1: The Vengeful Spirit",
            "paragraphs": [
              "A hooded skull in a dark red robe with a halo of three swords. At the start of the fight its shadow on the floor shows its final form, then shrinks. It uses **Wraith Flame**, **Hunting Blades** and **Soul Harvest**."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/vegeful/phase-1.gif",
                "alt": "Vegeful, phase 1: The Vengeful Spirit",
                "caption": "The intro card and the first form, The Vengeful Spirit.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 2: Grief Unbound",
            "paragraphs": [
              "It screams; three swords fall and stick in the floor and the lower-left torch goes out. Its robe tears, two streams of tears run from the sockets and a glowing chest wound appears. It adds **Soul Siphon**."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/vegeful/phase-2.gif",
                "alt": "Vegeful, phase 2: Grief Unbound",
                "caption": "The phase 2 transformation into Grief Unbound.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 3: The Blades Awaken",
            "paragraphs": [
              "Swords orbit it, stab inward into a cage and burst; a pair of wings made of swords unfolds, soul chains hang from its wrists and the lower-right torch goes out."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/vegeful/phase-3.gif",
                "alt": "Vegeful, phase 3: The Blades Awaken",
                "caption": "The phase 3 transformation into The Blades Awaken.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          },
          {
            "heading": "Phase 4: Last Stand",
            "paragraphs": [
              "The wings spread fully and the body turns translucent from the hem up; the faces of swallowed souls show in the robe. Twelve swords rise into a crown. The last phase runs on a fixed loop: **Last Judgment**, **Hunting Blades**, **Wraith Flame**, then Last Judgment again. Each judgment spends four of the twelve crown swords, which relight one at a time with a rising choir note, so you can hear the countdown."
            ],
            "media": [
              {
                "src": "/ld/wiki/bosses/vegeful/phase-4.gif",
                "alt": "Vegeful, phase 4: Last Stand",
                "caption": "The phase 4 transformation into Last Stand.",
                "pixelated": false,
                "width": 288,
                "height": 214
              }
            ]
          }
        ]
      },
      {
        "heading": "Skills",
        "table": {
          "columns": [
            "Skill",
            "Phases",
            "What happens",
            "How to beat it"
          ],
          "rows": [
            [
              "Wraith Flame",
              "All",
              "It pushes out a palm. A harmless white ring sits for 1.2 s where you stand now (and another beside it), then becomes a pool of teal flame that burns for about six seconds.",
              "Leave the ring and walk around the pools. The room fills up with flame over time."
            ],
            [
              "Hunting Blades",
              "All",
              "Swords from its halo float out and hang at fixed points around you with faint aim lines. Soon after the lines darken, the swords tilt back and whistle; the nearest goes first. They chase you, faster than you but with a wide turning circle. The number of swords is 3, 4, 5, 5 by phase; in later phases swords hide in the shadow of its wings and cut tight turns.",
              "Cross the flight path so the swords miss you. Better: lure a sword into another sword and it stumbles (x1.4 damage taken)."
            ],
            [
              "Soul Harvest",
              "1-3",
              "It rises and lifts a hand. Soul mist rises at three or four spots; white souls tear out of the floor, are tethered to it and drift into it. A soul that is swallowed comes back as a sword after about a second.",
              "Run a circuit to touch each soul, the one nearest to it first. You do not need to shoot."
            ],
            [
              "Soul Siphon",
              "2-3",
              "Its chest opens and a soul chain hooks you and drains your health (without healing it) while it drifts toward you. There is always a flame pool next to the chain's path.",
              "Step sideways so the chain crosses its own flame pool for 0.3 s: it burns through. Running away does not break it."
            ],
            [
              "Last Judgment",
              "4 (finale)",
              "The final giant flies to the room's centre and hovers, wings flat across the floor. The lights go out and there is one second of total silence. The floor burns orange except for a single small white island. There are three judgments; each island lies on a ring around it, at least 60 degrees from the last, and the third is the farthest.",
              "Run to the glowing island and stand in it each time."
            ]
          ]
        },
        "media": [
          {
            "src": "/ld/wiki/bosses/vegeful/wraith-flame.gif",
            "alt": "Vegeful casting Wraith Flame",
            "caption": "Wraith Flame",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/vegeful/hunting-blades.gif",
            "alt": "Vegeful casting Hunting Blades",
            "caption": "Hunting Blades",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/vegeful/soul-harvest.gif",
            "alt": "Vegeful casting Soul Harvest",
            "caption": "Soul Harvest",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/vegeful/soul-siphon.gif",
            "alt": "Vegeful casting Soul Siphon",
            "caption": "Soul Siphon",
            "pixelated": false,
            "width": 288,
            "height": 214
          },
          {
            "src": "/ld/wiki/bosses/vegeful/last-judgment.gif",
            "alt": "Vegeful casting Last Judgment (finale)",
            "caption": "Last Judgment (finale)",
            "pixelated": false,
            "width": 288,
            "height": 214
          }
        ],
        "paragraphs": [
          "The clips below were recorded in the game on the boss's own floor; the hero is a test bot that dodges and does not shoot."
        ]
      },
      {
        "heading": "Hard mode",
        "paragraphs": [
          "In [[mechanics/difficulty-modes|Hard mode]] Vegeful has about 1.9 times the health and damage and gains the rule **Haunted Court**: Wraith Flame gets one more ring pool and the pools last 2 s longer, Last Judgment's fills escalate from the first judgment, and Hunting Blades fires six swords instead of five."
        ]
      },
      {
        "heading": "Rewards",
        "paragraphs": [
          "A [[items/boss-chest|boss chest]] (quality 3) appears in the arena with one weapon, [[items/armor|armor]], [[items/artifacts|artifact]] or passive of at least Epic rarity, 12 to 39 [[items/coin|coins]] and exactly one [[items/gold]]. The boss also drops a few [[items/sand-clock|Sand Clocks]] and an exit portal opens where it fell."
        ]
      },
      {
        "heading": "Co-op note",
        "paragraphs": [
          "In [[mechanics/co-op-multiplayer|co-op]] Vegeful keeps an older kit (a sword throw and a shield). Its phase thresholds are the same. Health is 35% higher per extra player."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Keep moving: Wraith Flame fills the room with pools, so plan your route around them.",
          "Cut across the lines of Hunting Blades; fleeing in a straight line gets you hit.",
          "In Soul Siphon, step across a flame pool rather than away from the chain.",
          "In Last Judgment, listen to the crown notes and head for the island as soon as the lights go out.",
          "Save a strong damage burst for after a transformation, when it is exposed."
        ]
      }
    ],
    "tags": [
      "Normal mode",
      "Hard mode",
      "Floor 12",
      "Lab",
      "Final boss"
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "boss-overview"
      },
      {
        "category": "bosses",
        "slug": "heavy-knight"
      },
      {
        "category": "bosses",
        "slug": "desert-hunter"
      },
      {
        "category": "items",
        "slug": "boss-chest"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-modes"
      },
      {
        "category": "dungeons",
        "slug": "the-lab"
      }
    ]
  }
];
