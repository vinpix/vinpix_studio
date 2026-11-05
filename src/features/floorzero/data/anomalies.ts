import type { WikiArticle } from "../types";

export const anomalies: WikiArticle[] = [
  {
    "slug": "anomalies-overview",
    "category": "anomalies",
    "name": "Anomalies",
    "subtitle": "Run-shaping cards",
    "summary": "Anomalies are the cards you choose during a run to shape your build. There are 114 of them, from plain stat boosts to status combos, and each one can be taken only once per run.",
    "infobox": [
      {
        "label": "Cards",
        "value": "114"
      },
      {
        "label": "Rarities",
        "value": "Common 57, Rare 42, Epic 15"
      },
      {
        "label": "Cards per offer",
        "value": "3"
      },
      {
        "label": "Cursed cards",
        "value": "12"
      }
    ],
    "sections": [
      {
        "heading": "What anomalies are",
        "paragraphs": [
          "Anomalies are the Backrooms' way of rewriting the rules around you. Each anomaly is a card with a single effect, written as one plain sentence, such as \"Every 3rd hit on a foe shocks a nearby foe\" or \"+25% damage\". You take it once and it applies for the rest of the run.",
          "There are no levels or upgrades: a card is either in your build or not. An anomaly you already own is never offered again, so every pick adds something new."
        ]
      },
      {
        "heading": "How anomalies are offered",
        "paragraphs": [
          "At several points of a run (for example between waves, as a floor reward, at doors and at [[items/vending-machine|vending machines]]) the game shows you three anomaly cards and you choose one. You can pay [[items/scrap|scrap]] to reroll the offer.",
          "The offer is aware of your build. Cards that your weapons cannot use are hidden, battery cards only appear for builds with the lamp or an energy gun, team cards are hidden in solo runs, and payoff cards are held back until you have a way to create the status they reward. When you already own a card that creates a status, cards that reward it become more likely and a ribbon says what they pair with.",
          "A short combo message appears the first time a status starter and a payoff come together in one run."
        ]
      },
      {
        "heading": "Rarity",
        "paragraphs": [
          "Every anomaly is Common, Rare or Epic. Rarity is the only colour class of a card; a Rare or Epic card is simply stronger or more specialised. Of the 114 cards, 57 are Common, 42 are Rare and 15 are Epic.",
          "The game makes sure a Rare or Epic card turns up after a run of offers without one."
        ]
      },
      {
        "heading": "Play styles",
        "paragraphs": [
          "Every card carries a play style chip that tells you which kind of build it fits. Cards that share a chip pull on the same trigger, so they add up: a card that fires every Nth shot gets faster when you own a Rate card, and a card that triggers on landing fires on every landing when you own a jump card."
        ],
        "table": {
          "columns": [
            "Play style",
            "Cards",
            "Theme"
          ],
          "rows": [
            [
              "[[anomalies/play-style-status|Status]]",
              "13",
              "Setting foes on fire, slowing, marking or stunning them, then hitting them harder"
            ],
            [
              "[[anomalies/play-style-rate|Rate]]",
              "8",
              "Shooting faster; cards that count every Nth shot trigger sooner"
            ],
            [
              "[[anomalies/play-style-kills|Kills]]",
              "10",
              "Chaining kills so each kill pays out"
            ],
            [
              "[[anomalies/play-style-motion|Motion]]",
              "10",
              "Running, jumping and landing"
            ],
            [
              "[[anomalies/play-style-still|Still]]",
              "4",
              "Standing your ground"
            ],
            [
              "[[anomalies/play-style-comeback|Comeback]]",
              "10",
              "Getting stronger as your health drops or after you are hurt"
            ],
            [
              "[[anomalies/play-style-survive|Survive]]",
              "11",
              "Shields, healing and staying unhurt"
            ],
            [
              "[[anomalies/play-style-close|Close]]",
              "9",
              "Fighting up close with melee, shotguns and knockback"
            ],
            [
              "[[anomalies/play-style-far|Far]]",
              "5",
              "Fighting at range or alone"
            ],
            [
              "[[anomalies/play-style-walls|Walls]]",
              "5",
              "Breaking walls and using cover"
            ],
            [
              "[[anomalies/play-style-blast|Blast]]",
              "4",
              "Bigger and safer explosions"
            ],
            [
              "[[anomalies/play-style-battery|Battery]]",
              "9",
              "The [[items/flashlight|flashlight]] lamp and energy weapons"
            ],
            [
              "[[anomalies/play-style-support|Support]]",
              "6",
              "Team play, loot, vision and light"
            ],
            [
              "[[anomalies/play-style-any|Any]]",
              "10",
              "Plain numbers that fit every build"
            ]
          ]
        }
      },
      {
        "heading": "Roles and status keywords",
        "paragraphs": [
          "Each card also has a role. A **Stat** card is a plain number that works on its own. An **Engine** card does something when a trigger happens. A **Starter** creates a status on foes and a **Payoff** pays extra for foes that carry one.",
          "Foes can be **Burning** (fire damage over time), **Slowed** (moves slower), **Marked** (takes extra damage from everything) or **Stunned** (cannot move for a moment, whether pinned, frozen or stunned). Weapons can create statuses too, so a flame weapon makes your fire payoff cards work from the start."
        ],
        "table": {
          "columns": [
            "Status",
            "Starters",
            "Payoffs"
          ],
          "rows": [
            [
              "Burning",
              "[[anomalies/pyromaniac|Pyromaniac]], [[anomalies/pilot-light|Pilot Light]], [[anomalies/hot-hands|Hot Hands]], [[anomalies/ember-rounds|Ember Rounds]], [[anomalies/backdraft|Backdraft]], [[anomalies/boiler-flame|Boiler Flame]]",
              "[[anomalies/kindling|Kindling]]"
            ],
            [
              "Slowed",
              "[[anomalies/wet-suit|Wet Suit]], [[anomalies/breaker|Breaker]], [[anomalies/wet-tiles|Wet Tiles]]",
              "[[anomalies/cold-snap|Cold Snap]]"
            ],
            [
              "Marked",
              "[[anomalies/death-mark|Death Mark]], [[anomalies/marked|Marked]]",
              "Marked foes take extra damage from everything."
            ],
            [
              "Stunned",
              "[[anomalies/final-notice|Final Notice]], [[anomalies/heavy-hitter|Heavy Hitter]], [[anomalies/rusty-nails|Rusty Nails]]",
              "[[anomalies/shatter|Shatter]]"
            ],
            [
              "Any status",
              "Every starter above",
              "[[anomalies/weak-spot|Weak Spot]]"
            ]
          ]
        }
      },
      {
        "heading": "Cursed cards",
        "paragraphs": [
          "Cursed cards offer great power at a price: for example [[anomalies/glass-jaw|Glass Jaw]] and [[anomalies/dead-weight|Dead Weight]] trade health or speed for damage. They never appear in ordinary offers. Instead, a Red Shrine or a Blood Altar can appear during a floor's pause between waves; the shrine offers three cursed cards and lets you take one or walk away, and taking a card at the altar costs 30% of your health. You can switch cursed events off in Settings.",
          "The cursed cards are: [[anomalies/dead-weight|Dead Weight]], [[anomalies/cold-hands|Cold Hands]], [[anomalies/hungry-maw|Hungry Maw]], [[anomalies/fever-dream|Fever Dream]], [[anomalies/borrowed-time|Borrowed Time]], [[anomalies/redline|Redline]], [[anomalies/spite|Spite]], [[anomalies/stone-skin|Stone Skin]], [[anomalies/static-mouth|Static Mouth]], [[anomalies/two-faced|Two Faced]], [[anomalies/grave-smile|Grave Smile]], [[anomalies/glass-jaw|Glass Jaw]]."
        ]
      },
      {
        "heading": "Melee cards",
        "paragraphs": [
          "Twelve cards are written for melee weapons and are only offered when you carry one: [[anomalies/distance-learning|Distance Learning]], [[anomalies/drop-kick|Drop Kick]], [[anomalies/counter-offer|Counter Offer]], [[anomalies/hard-hat|Hard Hat]], [[anomalies/switch-hitter|Switch Hitter]], [[anomalies/staff-lunch|Staff Lunch]], [[anomalies/coffee-break|Coffee Break]], [[anomalies/final-notice|Final Notice]], [[anomalies/chain-letter|Chain Letter]], [[anomalies/swatter|Swatter]], [[anomalies/black-belt|Black Belt]], [[anomalies/wind-up|Wind Up]]."
        ]
      },
      {
        "heading": "Related upgrades",
        "paragraphs": [
          "Anomalies come and go with each run. For permanent upgrades, temporary boons and trophies, see [[perks/perks-overview|Perks and Upgrades]]."
        ]
      }
    ],
    "tags": [
      "Overview"
    ],
    "trivia": [
      "Earlier builds grouped anomalies into six elemental Frequencies (Electric, Water, Fire, Dark, Sound and Geometry) with Resonance set bonuses. Both ideas were removed: today rarity and play style are the only classifications."
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "distance-learning",
    "category": "anomalies",
    "name": "Distance Learning",
    "subtitle": "Common anomaly card",
    "summary": "Melee hits on foes 2+ tiles away do +30%. A common anomaly card of the Far play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-far|Far]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Melee hits on foes 2+ tiles away do +30%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Distance Learning** is a common anomaly card. Melee hits on foes 2+ tiles away do +30%.",
          "It is a plain number that works on its own, in the Far play style (fighting at range or alone)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Melee hits on foes 2 or more tiles away do +30%, so lunge or use long-reach weapons.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Far",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "piercing-rounds"
      },
      {
        "category": "anomalies",
        "slug": "stalker"
      },
      {
        "category": "anomalies",
        "slug": "lone-wolf"
      },
      {
        "category": "anomalies",
        "slug": "play-style-far"
      }
    ]
  },
  {
    "slug": "drop-kick",
    "category": "anomalies",
    "name": "Drop Kick",
    "subtitle": "Common anomaly card",
    "summary": "Land: melee does +22% damage for 6 s. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Land: melee does +22% damage for 6 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Drop Kick** is a common anomaly card. Land: melee does +22% damage for 6 s.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Landing buffs melee by +22% for 6 seconds, so jump into fights.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "static-charge"
      },
      {
        "category": "anomalies",
        "slug": "wet-suit"
      },
      {
        "category": "anomalies",
        "slug": "cinder-trail"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "counter-offer",
    "category": "anomalies",
    "name": "Counter Offer",
    "subtitle": "Common anomaly card",
    "summary": "When hurt: your next melee hit deals x2.5. A common anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "When hurt: your next melee hit deals x2.5."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Counter Offer** is a common anomaly card. When hurt: your next melee hit deals x2.5.",
          "It is a trigger card: when something happens, something else happens, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "When you are hurt, your next melee hit deals x2.5. Fight in close range and punish.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Comeback",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "second-wind"
      },
      {
        "category": "anomalies",
        "slug": "lifeline"
      },
      {
        "category": "anomalies",
        "slug": "last-rush"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "hard-hat",
    "category": "anomalies",
    "name": "Hard Hat",
    "subtitle": "Common anomaly card",
    "summary": "Holding melee: take 25% less damage. A common anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Holding melee: take 25% less damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Hard Hat** is a common anomaly card. Holding melee: take 25% less damage.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "While holding a melee weapon you take 25% less damage.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Survive",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "staff-lunch"
      },
      {
        "category": "anomalies",
        "slug": "swatter"
      },
      {
        "category": "anomalies",
        "slug": "deep-breath"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "switch-hitter",
    "category": "anomalies",
    "name": "Switch Hitter",
    "subtitle": "Rare anomaly card",
    "summary": "Melee kill: attacks 30% faster for 8 s. A rare anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Melee kill: attacks 30% faster for 8 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Switch Hitter** is a rare anomaly card. Melee kill: attacks 30% faster for 8 s.",
          "It is a trigger card: when something happens, something else happens, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A melee kill makes your attacks 30% faster for 8 seconds, so chain kills.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Rate",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "chain-shock"
      },
      {
        "category": "anomalies",
        "slug": "breaker"
      },
      {
        "category": "anomalies",
        "slug": "ember-rounds"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "staff-lunch",
    "category": "anomalies",
    "name": "Staff Lunch",
    "subtitle": "Rare anomaly card",
    "summary": "Melee kills heal 3 HP, max every 4 s. A rare anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Melee kills heal 3 HP, max every 4 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Staff Lunch** is a rare anomaly card. Melee kills heal 3 HP, max every 4 s.",
          "It is a trigger card: when something happens, something else happens, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Melee kills heal 3 HP, with at most one heal every 4 seconds.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "swatter"
      },
      {
        "category": "anomalies",
        "slug": "deep-breath"
      },
      {
        "category": "anomalies",
        "slug": "bubble-shield"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "coffee-break",
    "category": "anomalies",
    "name": "Coffee Break",
    "subtitle": "Rare anomaly card",
    "summary": "Every 3rd swing gives 4 energy. A rare anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Every 3rd swing gives 4 energy."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Coffee Break** is a rare anomaly card. Every 3rd swing gives 4 energy.",
          "It is a trigger card: when something happens, something else happens, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every third melee swing gives 4 energy, so it fuels gun use between swings.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Battery",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "battery-saver"
      },
      {
        "category": "anomalies",
        "slug": "grounding-rod"
      },
      {
        "category": "anomalies",
        "slug": "floodlight"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "final-notice",
    "category": "anomalies",
    "name": "Final Notice",
    "subtitle": "Rare anomaly card",
    "summary": "Every 3rd swing stuns the foes it hits 0.9 s. A rare anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Stunned"
      },
      {
        "label": "Effect",
        "value": "Every 3rd swing stuns the foes it hits 0.9 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Final Notice** is a rare anomaly card. Every 3rd swing stuns the foes it hits 0.9 s.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every third swing stuns the foes it hits for 0.9 seconds. It is the only melee stun starter, so it enables Shatter.",
          "It is only offered when your build can use it: it needs a melee weapon.",
          "Payoff cards that reward stunned foes: [[anomalies/shatter|Shatter]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Status",
      "Melee",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "cold-snap"
      },
      {
        "category": "anomalies",
        "slug": "pyromaniac"
      },
      {
        "category": "anomalies",
        "slug": "pilot-light"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "chain-letter",
    "category": "anomalies",
    "name": "Chain Letter",
    "subtitle": "Epic anomaly card",
    "summary": "Every 3rd swing chains 120% to 2 near foes. A epic anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Every 3rd swing chains 120% to 2 near foes."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Chain Letter** is an epic anomaly card. Every 3rd swing chains 120% to 2 near foes.",
          "It is a trigger card: when something happens, something else happens, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every third swing chains 120% of its damage to 2 nearby foes.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Close",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "wind-up"
      },
      {
        "category": "anomalies",
        "slug": "buckshot"
      },
      {
        "category": "anomalies",
        "slug": "heavy-hitter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "swatter",
    "category": "anomalies",
    "name": "Swatter",
    "subtitle": "Rare anomaly card",
    "summary": "Your swings swat away foe shots in front. A rare anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Your swings swat away foe shots in front."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Swatter** is a rare anomaly card. Your swings swat away foe shots in front.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Your swings knock away foe shots in front of you.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "deep-breath"
      },
      {
        "category": "anomalies",
        "slug": "bubble-shield"
      },
      {
        "category": "anomalies",
        "slug": "shadow-step"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "black-belt",
    "category": "anomalies",
    "name": "Black Belt",
    "subtitle": "Rare anomaly card",
    "summary": "Each melee kill: +4% damage, max 24%. Fades. A rare anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Each melee kill: +4% damage, max 24%. Fades."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Black Belt** is a rare anomaly card. Each melee kill: +4% damage, max 24%. Fades.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Each melee kill gives +4% damage up to 24%; the bonus fades when you stop.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Kills",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "storm-front"
      },
      {
        "category": "anomalies",
        "slug": "backdraft"
      },
      {
        "category": "anomalies",
        "slug": "umbra"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "wind-up",
    "category": "anomalies",
    "name": "Wind Up",
    "subtitle": "Epic anomaly card",
    "summary": "Hold attack 1 s: release for x2 damage. A epic anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Hold attack 1 s: release for x2 damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Wind Up** is an epic anomaly card. Hold attack 1 s: release for x2 damage.",
          "It is a trigger card: when something happens, something else happens, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Hold the attack button for 1 second and release for x2 damage. It suits big melee weapons.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Close",
      "Melee"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "buckshot"
      },
      {
        "category": "anomalies",
        "slug": "heavy-hitter"
      },
      {
        "category": "anomalies",
        "slug": "wrong-size"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "dead-weight",
    "category": "anomalies",
    "name": "Dead Weight",
    "subtitle": "Rare cursed card",
    "summary": "+55% damage but move 30% slower. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+55% damage but move 30% slower."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Dead Weight** is a rare cursed anomaly card. +55% damage but move 30% slower.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A hefty +55% damage in exchange for 30% slower movement. Only worth it in builds that do not need to dodge.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Any",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "cold-hands",
    "category": "anomalies",
    "name": "Cold Hands",
    "subtitle": "Rare cursed card",
    "summary": "+40% crit but -15% fire rate. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+40% crit but -15% fire rate."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Cold Hands** is a rare cursed anomaly card. +40% crit but -15% fire rate.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+40% crit chance but 15% slower fire rate. Good for crit-heavy slow weapons.",
          "It is only offered when your build can use it: it needs a weapon that can crit.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Any",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "hungry-maw",
    "category": "anomalies",
    "name": "Hungry Maw",
    "subtitle": "Rare cursed card",
    "summary": "Heal 1.9 HP a second but take 30% more. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "Heal 1.9 HP a second but take 30% more."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Hungry Maw** is a rare cursed anomaly card. Heal 1.9 HP a second but take 30% more.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Heals 1.9 HP every second, but you take 30% more damage. Strong for healing builds, dangerous otherwise.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "deep-breath"
      },
      {
        "category": "anomalies",
        "slug": "bubble-shield"
      },
      {
        "category": "anomalies",
        "slug": "shadow-step"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "fever-dream",
    "category": "anomalies",
    "name": "Fever Dream",
    "subtitle": "Epic cursed card",
    "summary": "+70% fire rate but take 30% more damage. A epic cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+70% fire rate but take 30% more damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Fever Dream** is an epic cursed anomaly card. +70% fire rate but take 30% more damage.",
          "It is a plain number that works on its own, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A +70% fire rate in exchange for 30% more damage taken.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Rate",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "chain-shock"
      },
      {
        "category": "anomalies",
        "slug": "breaker"
      },
      {
        "category": "anomalies",
        "slug": "ember-rounds"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "borrowed-time",
    "category": "anomalies",
    "name": "Borrowed Time",
    "subtitle": "Epic cursed card",
    "summary": "+70% damage, +15% speed but -40% max HP. A epic cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+70% damage, +15% speed but -40% max HP."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Borrowed Time** is an epic cursed anomaly card. +70% damage, +15% speed but -40% max HP.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+70% damage and +15% speed at the cost of 40% max HP. Extremely risky.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Any",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "redline",
    "category": "anomalies",
    "name": "Redline",
    "subtitle": "Epic cursed card",
    "summary": "+55% damage but energy drain +60%. A epic cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+55% damage but energy drain +60%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Redline** is an epic cursed anomaly card. +55% damage but energy drain +60%.",
          "It is a plain number that works on its own, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+55% damage but energy drains 60% faster. Combine it with energy-saving cards.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Battery",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "battery-saver"
      },
      {
        "category": "anomalies",
        "slug": "grounding-rod"
      },
      {
        "category": "anomalies",
        "slug": "floodlight"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "spite",
    "category": "anomalies",
    "name": "Spite",
    "subtitle": "Rare cursed card",
    "summary": "Hurt: shock ring but take 15% more damage. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "Hurt: shock ring but take 15% more damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Spite** is a rare cursed anomaly card. Hurt: shock ring but take 15% more damage.",
          "It is a trigger card: when something happens, something else happens, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Being hurt releases a shock ring, but you take 15% more damage.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Comeback",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "second-wind"
      },
      {
        "category": "anomalies",
        "slug": "lifeline"
      },
      {
        "category": "anomalies",
        "slug": "last-rush"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "stone-skin",
    "category": "anomalies",
    "name": "Stone Skin",
    "subtitle": "Rare cursed card",
    "summary": "Take 60% less damage but move 30% slower. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "Take 60% less damage but move 30% slower."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Stone Skin** is a rare cursed anomaly card. Take 60% less damage but move 30% slower.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Take 60% less damage, but move 30% slower. A heavy defensive trade.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "deep-breath"
      },
      {
        "category": "anomalies",
        "slug": "bubble-shield"
      },
      {
        "category": "anomalies",
        "slug": "shadow-step"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "static-mouth",
    "category": "anomalies",
    "name": "Static Mouth",
    "subtitle": "Epic cursed card",
    "summary": "Every 3rd shot shocks but energy drain +60%. A epic cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "Every 3rd shot shocks but energy drain +60%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Static Mouth** is an epic cursed anomaly card. Every 3rd shot shocks but energy drain +60%.",
          "It is a trigger card: when something happens, something else happens, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every third shot shocks, but energy drains 60% faster.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Battery",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "battery-saver"
      },
      {
        "category": "anomalies",
        "slug": "grounding-rod"
      },
      {
        "category": "anomalies",
        "slug": "floodlight"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "two-faced",
    "category": "anomalies",
    "name": "Two Faced",
    "subtitle": "Rare cursed card",
    "summary": "Melee +50% damage but guns -40% damage. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "Melee +50% damage but guns -40% damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Two Faced** is a rare cursed anomaly card. Melee +50% damage but guns -40% damage.",
          "It is a plain number that works on its own, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Melee does +50% damage while guns do 40% less. Pick it for melee builds.",
          "It is only offered when your build can use it: it needs a melee weapon.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Close",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "buckshot"
      },
      {
        "category": "anomalies",
        "slug": "heavy-hitter"
      },
      {
        "category": "anomalies",
        "slug": "wrong-size"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "grave-smile",
    "category": "anomalies",
    "name": "Grave Smile",
    "subtitle": "Epic cursed card",
    "summary": "+40% crit, +25% damage but -25% fire rate. A epic cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+40% crit, +25% damage but -25% fire rate."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Grave Smile** is an epic cursed anomaly card. +40% crit, +25% damage but -25% fire rate.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+40% crit chance and +25% damage, but 25% slower fire rate.",
          "It is only offered when your build can use it: it needs a weapon that can crit.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Any",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "chain-shock",
    "category": "anomalies",
    "name": "Chain Shock",
    "subtitle": "Common anomaly card",
    "summary": "Every 3rd hit on a foe shocks a nearby foe. A common anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Every 3rd hit on a foe shocks a nearby foe."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Chain Shock** is a common anomaly card. Every 3rd hit on a foe shocks a nearby foe.",
          "It is a trigger card: when something happens, something else happens, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "The third hit is counted per foe, so rapid-fire weapons trigger it quickly and several foes in a crowd can each start their own count."
        ]
      }
    ],
    "tags": [
      "Common",
      "Rate"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "breaker"
      },
      {
        "category": "anomalies",
        "slug": "ember-rounds"
      },
      {
        "category": "anomalies",
        "slug": "wildfire"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "static-charge",
    "category": "anomalies",
    "name": "Static Charge",
    "subtitle": "Common anomaly card",
    "summary": "Run charge, max 3: a hit shocks 1 foe each. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Run charge, max 3: a hit shocks 1 foe each."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Static Charge** is a common anomaly card. Run charge, max 3: a hit shocks 1 foe each.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Sprint between fights to bank up to 3 charges; each charge makes one of your next hits shock a foe."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "wet-suit"
      },
      {
        "category": "anomalies",
        "slug": "cinder-trail"
      },
      {
        "category": "anomalies",
        "slug": "landing-shot"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "fuse-box",
    "category": "anomalies",
    "name": "Fuse Box",
    "subtitle": "Common anomaly card",
    "summary": "In a lit area: every 2 s next hit +60%. A common anomaly card of the Support play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-support|Support]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "In a lit area: every 2 s next hit +60%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Fuse Box** is a common anomaly card. In a lit area: every 2 s next hit +60%.",
          "It is a trigger card: when something happens, something else happens, in the Support play style (team play, loot, vision and light)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "It needs a lit area, so fight under working ceiling lights or work lights. It works against a build that relies on the dark."
        ]
      }
    ],
    "tags": [
      "Common",
      "Support"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "magnet"
      },
      {
        "category": "anomalies",
        "slug": "third-eye"
      },
      {
        "category": "anomalies",
        "slug": "night-shift"
      },
      {
        "category": "anomalies",
        "slug": "play-style-support"
      }
    ]
  },
  {
    "slug": "battery-saver",
    "category": "anomalies",
    "name": "Battery Saver",
    "subtitle": "Rare anomaly card",
    "summary": "Guns and lamp use 30% less energy. A rare anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Guns and lamp use 30% less energy."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Battery Saver** is a rare anomaly card. Guns and lamp use 30% less energy.",
          "It is a plain number that works on its own, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Only worth taking if you carry an energy weapon or rely on the lamp; it cuts their energy use by 30%.",
          "It is only offered when your build can use it: it needs an energy weapon or the lamp."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Battery"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "grounding-rod"
      },
      {
        "category": "anomalies",
        "slug": "floodlight"
      },
      {
        "category": "anomalies",
        "slug": "backup-capacitor"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "grounding-rod",
    "category": "anomalies",
    "name": "Grounding Rod",
    "subtitle": "Rare anomaly card",
    "summary": "Each kill: 3 energy, up to 35% of max a wave. A rare anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Each kill: 3 energy, up to 35% of max a wave."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Grounding Rod** is a rare anomaly card. Each kill: 3 energy, up to 35% of max a wave.",
          "It is a trigger card: when something happens, something else happens, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Each kill refunds 3 energy, up to 35% of your maximum energy per wave, which keeps energy weapons fed during long fights.",
          "It is only offered when your build can use it: it needs an energy weapon or the lamp."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Battery"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "floodlight"
      },
      {
        "category": "anomalies",
        "slug": "backup-capacitor"
      },
      {
        "category": "anomalies",
        "slug": "live-wire"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "still-coil",
    "category": "anomalies",
    "name": "Still Coil",
    "subtitle": "Rare anomaly card",
    "summary": "Stand still: zap the nearest foe in 6 tiles. A rare anomaly card of the Still play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-still|Still]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Stand still: zap the nearest foe in 6 tiles."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Still Coil** is a rare anomaly card. Stand still: zap the nearest foe in 6 tiles.",
          "It is a trigger card: when something happens, something else happens, in the Still play style (standing your ground)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stop moving and it zaps the nearest foe within 6 tiles, so it makes a turret out of any stand-and-shoot build."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Still"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hush"
      },
      {
        "category": "anomalies",
        "slug": "subsonic-ring"
      },
      {
        "category": "anomalies",
        "slug": "rooted"
      },
      {
        "category": "anomalies",
        "slug": "play-style-still"
      }
    ]
  },
  {
    "slug": "storm-front",
    "category": "anomalies",
    "name": "Storm Front",
    "subtitle": "Epic anomaly card",
    "summary": "Kills add fire rate, max +30%. Fades idle. A epic anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Kills add fire rate, max +30%. Fades idle."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Storm Front** is an epic anomaly card. Kills add fire rate, max +30%. Fades idle.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Build the fire rate with unbroken kill chains. The bonus fades when you stop killing, so keep moving to the next target."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "backdraft"
      },
      {
        "category": "anomalies",
        "slug": "umbra"
      },
      {
        "category": "anomalies",
        "slug": "reaper"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "wet-suit",
    "category": "anomalies",
    "name": "Wet Suit",
    "subtitle": "Common anomaly card",
    "summary": "When you land, max every 3 s: slow near foes. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Slowed"
      },
      {
        "label": "Effect",
        "value": "When you land, max every 3 s: slow near foes."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Wet Suit** is a common anomaly card. When you land, max every 3 s: slow near foes.",
          "It is a status starter: it creates a status on foes, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Land in the middle of a group: the slow hits foes near you, but it can fire at most once every 3 seconds.",
          "Payoff cards that reward slowed foes: [[anomalies/cold-snap|Cold Snap]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "cinder-trail"
      },
      {
        "category": "anomalies",
        "slug": "landing-shot"
      },
      {
        "category": "anomalies",
        "slug": "triple-jump"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "breaker",
    "category": "anomalies",
    "name": "Breaker",
    "subtitle": "Common anomaly card",
    "summary": "Every 8th shot, 3 s gap: slow foes near you. A common anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Slowed"
      },
      {
        "label": "Effect",
        "value": "Every 8th shot, 3 s gap: slow foes near you."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Breaker** is a common anomaly card. Every 8th shot, 3 s gap: slow foes near you.",
          "It is a status starter: it creates a status on foes, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A fast fire rate fills the 8-shot counter sooner, but there is a 3-second gap between slowing bursts.",
          "Payoff cards that reward slowed foes: [[anomalies/cold-snap|Cold Snap]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Rate",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "ember-rounds"
      },
      {
        "category": "anomalies",
        "slug": "wildfire"
      },
      {
        "category": "anomalies",
        "slug": "echo"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "deep-breath",
    "category": "anomalies",
    "name": "Deep Breath",
    "subtitle": "Common anomaly card",
    "summary": "Unhit for 8 s: heal 1 HP every second. A common anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Unhit for 8 s: heal 1 HP every second."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Deep Breath** is a common anomaly card. Unhit for 8 s: heal 1 HP every second.",
          "It is a trigger card: when something happens, something else happens, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "It rewards cautious play: stay unhit for 8 seconds and you heal 1 HP every second until you are hit again."
        ]
      }
    ],
    "tags": [
      "Common",
      "Survive"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "bubble-shield"
      },
      {
        "category": "anomalies",
        "slug": "shadow-step"
      },
      {
        "category": "anomalies",
        "slug": "vampire"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "second-wind",
    "category": "anomalies",
    "name": "Second Wind",
    "subtitle": "Rare anomaly card",
    "summary": "Once a wave, when hit below 25% HP: heal 20%. A rare anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Once a wave, when hit below 25% HP: heal 20%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Second Wind** is a rare anomaly card. Once a wave, when hit below 25% HP: heal 20%.",
          "It is a trigger card: when something happens, something else happens, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A once-per-wave emergency heal that triggers when a hit takes you below 25% HP, so it can save a run once each wave."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "lifeline"
      },
      {
        "category": "anomalies",
        "slug": "last-rush"
      },
      {
        "category": "anomalies",
        "slug": "grudge"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "bubble-shield",
    "category": "anomalies",
    "name": "Bubble Shield",
    "subtitle": "Rare anomaly card",
    "summary": "Every wave starts with a 12% HP shield. A rare anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Every wave starts with a 12% HP shield."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Bubble Shield** is a rare anomaly card. Every wave starts with a 12% HP shield.",
          "It is a trigger card: when something happens, something else happens, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A free shield worth 12% of your HP at the start of every wave, which soaks damage before your health."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "shadow-step"
      },
      {
        "category": "anomalies",
        "slug": "vampire"
      },
      {
        "category": "anomalies",
        "slug": "adrenaline"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "lifeline",
    "category": "anomalies",
    "name": "Lifeline",
    "subtitle": "Epic anomaly card",
    "summary": "Below half HP: take 20% less, heal 1.15 HP/s. A epic anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Below half HP: take 20% less, heal 1.15 HP/s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Lifeline** is an epic anomaly card. Below half HP: take 20% less, heal 1.15 HP/s.",
          "It is a plain number that works on its own, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Low HP becomes your strength: below half health you take 20% less damage and regenerate 1.15 HP per second."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "last-rush"
      },
      {
        "category": "anomalies",
        "slug": "grudge"
      },
      {
        "category": "anomalies",
        "slug": "harden"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "last-rush",
    "category": "anomalies",
    "name": "Last Rush",
    "subtitle": "Common anomaly card",
    "summary": "Below half HP: a kill gives +20% damage 20 s. A common anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Below half HP: a kill gives +20% damage 20 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Last Rush** is a common anomaly card. Below half HP: a kill gives +20% damage 20 s.",
          "It is a trigger card: when something happens, something else happens, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Take it for builds that fight at low health: while below half HP, every kill boosts your damage by 20% for 20 seconds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "grudge"
      },
      {
        "category": "anomalies",
        "slug": "harden"
      },
      {
        "category": "anomalies",
        "slug": "last-stand"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "cold-snap",
    "category": "anomalies",
    "name": "Cold Snap",
    "subtitle": "Common anomaly card",
    "summary": "Slowed foes take +25% from your hits. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Payoff"
      },
      {
        "label": "Loves",
        "value": "Slowed"
      },
      {
        "label": "Effect",
        "value": "Slowed foes take +25% from your hits."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Cold Snap** is a common anomaly card. Slowed foes take +25% from your hits.",
          "It is a status payoff: it rewards foes that carry a status, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A payoff card that is weak alone: take a slowing card first (Wet Tiles, Breaker or Wet Suit), because slowed foes take the extra damage.",
          "A payoff card is never offered until your build can create the status it rewards.",
          "Status starters that feed it: [[anomalies/wet-suit|Wet Suit]], [[anomalies/breaker|Breaker]], [[anomalies/wet-tiles|Wet Tiles]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status payoff"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "pyromaniac"
      },
      {
        "category": "anomalies",
        "slug": "pilot-light"
      },
      {
        "category": "anomalies",
        "slug": "kindling"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "pyromaniac",
    "category": "anomalies",
    "name": "Pyromaniac",
    "subtitle": "Common anomaly card",
    "summary": "Up to 2 foes within 1.8 tiles catch fire. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "Up to 2 foes within 1.8 tiles catch fire."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Pyromaniac** is a common anomaly card. Up to 2 foes within 1.8 tiles catch fire.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Ignites up to 2 foes within 1.8 tiles, so a few shots into a pack set a small group on fire at once.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "pilot-light"
      },
      {
        "category": "anomalies",
        "slug": "kindling"
      },
      {
        "category": "anomalies",
        "slug": "hot-hands"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "pilot-light",
    "category": "anomalies",
    "name": "Pilot Light",
    "subtitle": "Common anomaly card",
    "summary": "Your first hit on each foe sets it on fire. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "Your first hit on each foe sets it on fire."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Pilot Light** is a common anomaly card. Your first hit on each foe sets it on fire.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Because your first hit on every foe ignites it, wide or fast weapons that hit many different foes spread fire quickly.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "kindling"
      },
      {
        "category": "anomalies",
        "slug": "hot-hands"
      },
      {
        "category": "anomalies",
        "slug": "death-mark"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "kindling",
    "category": "anomalies",
    "name": "Kindling",
    "subtitle": "Common anomaly card",
    "summary": "Burning foes take +20% from your hits. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Payoff"
      },
      {
        "label": "Loves",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "Burning foes take +20% from your hits."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Kindling** is a common anomaly card. Burning foes take +20% from your hits.",
          "It is a status payoff: it rewards foes that carry a status, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A payoff card: it needs burning foes to matter, so take it after a fire starter or with a flame weapon.",
          "A payoff card is never offered until your build can create the status it rewards.",
          "Status starters that feed it: [[anomalies/pyromaniac|Pyromaniac]], [[anomalies/pilot-light|Pilot Light]], [[anomalies/hot-hands|Hot Hands]], [[anomalies/ember-rounds|Ember Rounds]], [[anomalies/backdraft|Backdraft]], [[anomalies/boiler-flame|Boiler Flame]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status payoff"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hot-hands"
      },
      {
        "category": "anomalies",
        "slug": "death-mark"
      },
      {
        "category": "anomalies",
        "slug": "marked"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "hot-hands",
    "category": "anomalies",
    "name": "Hot Hands",
    "subtitle": "Common anomaly card",
    "summary": "Your melee hits set foes on fire. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "Your melee hits set foes on fire."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Hot Hands** is a common anomaly card. Your melee hits set foes on fire.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A fire starter for melee builds: every melee hit sets the foe alight, so burning payoffs come online right away.",
          "It is only offered when your build can use it: it needs a melee weapon.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "death-mark"
      },
      {
        "category": "anomalies",
        "slug": "marked"
      },
      {
        "category": "anomalies",
        "slug": "rusty-nails"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "cinder-trail",
    "category": "anomalies",
    "name": "Cinder Trail",
    "subtitle": "Common anomaly card",
    "summary": "Running leaves burning embers behind you. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Makes",
        "value": "Burning (when its rule applies it)"
      },
      {
        "label": "Effect",
        "value": "Running leaves burning embers behind you."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Cinder Trail** is a common anomaly card. Running leaves burning embers behind you.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Run through a corridor and enemies that follow you walk through fire. It needs you to keep moving.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "landing-shot"
      },
      {
        "category": "anomalies",
        "slug": "triple-jump"
      },
      {
        "category": "anomalies",
        "slug": "reverb"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "ember-rounds",
    "category": "anomalies",
    "name": "Ember Rounds",
    "subtitle": "Rare anomaly card",
    "summary": "Every 6th shot sets fire and hits +30%. A rare anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "Every 6th shot sets fire and hits +30%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Ember Rounds** is a rare anomaly card. Every 6th shot sets fire and hits +30%.",
          "It is a status starter: it creates a status on foes, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every 6th shot ignites its target and hits 30% harder, so higher fire rates trigger it more often.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Rate",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "wildfire"
      },
      {
        "category": "anomalies",
        "slug": "echo"
      },
      {
        "category": "anomalies",
        "slug": "rimshot"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "backdraft",
    "category": "anomalies",
    "name": "Backdraft",
    "subtitle": "Rare anomaly card",
    "summary": "3 kills in 4 s: last one explodes, 1 per 4 s. A rare anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Makes",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "3 kills in 4 s: last one explodes, 1 per 4 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Backdraft** is a rare anomaly card. 3 kills in 4 s: last one explodes, 1 per 4 s.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Needs 3 kills within 4 seconds, with the last kill exploding. It can trigger at most once every 4 seconds.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "umbra"
      },
      {
        "category": "anomalies",
        "slug": "reaper"
      },
      {
        "category": "anomalies",
        "slug": "burning-ground"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "wildfire",
    "category": "anomalies",
    "name": "Wildfire",
    "subtitle": "Epic anomaly card",
    "summary": "Every 6th shot, 1.5 s gap: ignite near foes. A epic anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Makes",
        "value": "Burning (when its rule applies it)"
      },
      {
        "label": "Effect",
        "value": "Every 6th shot, 1.5 s gap: ignite near foes."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Wildfire** is an epic anomaly card. Every 6th shot, 1.5 s gap: ignite near foes.",
          "It is a trigger card: when something happens, something else happens, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every 6th shot, with at least 1.5 seconds between uses, ignites the foes near your target.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Rate"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "echo"
      },
      {
        "category": "anomalies",
        "slug": "rimshot"
      },
      {
        "category": "anomalies",
        "slug": "switch-hitter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "umbra",
    "category": "anomalies",
    "name": "Umbra",
    "subtitle": "Common anomaly card",
    "summary": "First 3 kills of each wave: +35% damage 13 s. A common anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "First 3 kills of each wave: +35% damage 13 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Umbra** is a common anomaly card. First 3 kills of each wave: +35% damage 13 s.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kill the first 3 foes of each wave quickly to get +35% damage for 13 seconds, so it favours strong openers."
        ]
      }
    ],
    "tags": [
      "Common",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "reaper"
      },
      {
        "category": "anomalies",
        "slug": "burning-ground"
      },
      {
        "category": "anomalies",
        "slug": "loaded-dice"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "shadow-step",
    "category": "anomalies",
    "name": "Shadow Step",
    "subtitle": "Common anomaly card",
    "summary": "Unhurt 1.5 s: next hit +50%, max every 1.5 s. A common anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Unhurt 1.5 s: next hit +50%, max every 1.5 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Shadow Step** is a common anomaly card. Unhurt 1.5 s: next hit +50%, max every 1.5 s.",
          "It is a trigger card: when something happens, something else happens, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Ambush style: stay unhurt for 1.5 seconds and your next hit deals 50% more, with at most one bonus every 1.5 seconds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Survive"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "vampire"
      },
      {
        "category": "anomalies",
        "slug": "adrenaline"
      },
      {
        "category": "anomalies",
        "slug": "holy-almond-water"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "grudge",
    "category": "anomalies",
    "name": "Grudge",
    "subtitle": "Common anomaly card",
    "summary": "When hurt: +25% damage for 4 s. A common anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "When hurt: +25% damage for 4 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Grudge** is a common anomaly card. When hurt: +25% damage for 4 s.",
          "It is a trigger card: when something happens, something else happens, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every time you are hurt your damage rises by 25% for 4 seconds, which turns a hit into an opening for a counterattack."
        ]
      }
    ],
    "tags": [
      "Common",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "harden"
      },
      {
        "category": "anomalies",
        "slug": "last-stand"
      },
      {
        "category": "anomalies",
        "slug": "overtime"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "harden",
    "category": "anomalies",
    "name": "Harden",
    "subtitle": "Common anomaly card",
    "summary": "When hurt: take 25% less damage for 3 s. A common anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "When hurt: take 25% less damage for 3 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Harden** is a common anomaly card. When hurt: take 25% less damage for 3 s.",
          "It is a trigger card: when something happens, something else happens, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "When you are hurt you take 25% less damage for 3 seconds, which softens back-to-back hits."
        ]
      }
    ],
    "tags": [
      "Common",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "last-stand"
      },
      {
        "category": "anomalies",
        "slug": "overtime"
      },
      {
        "category": "anomalies",
        "slug": "counter-offer"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "glass-jaw",
    "category": "anomalies",
    "name": "Glass Jaw",
    "subtitle": "Rare cursed card",
    "summary": "+50% damage but -22% max HP. A rare cursed card offered at the Red Shrine and Blood Altar.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Offered by",
        "value": "Red Shrine and Blood Altar only"
      },
      {
        "label": "Effect",
        "value": "+50% damage but -22% max HP."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Glass Jaw** is a rare cursed anomaly card. +50% damage but -22% max HP.",
          "It is a plain number that works on its own, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A big damage boost bought with a smaller health pool. It is a risky pick offered at cursed events and favours careful players.",
          "Cursed cards never appear in ordinary offers. They are offered only at a Red Shrine or a Blood Altar, and you may refuse them."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Comeback",
      "Cursed"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "last-stand"
      },
      {
        "category": "anomalies",
        "slug": "overtime"
      },
      {
        "category": "anomalies",
        "slug": "counter-offer"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "last-stand",
    "category": "anomalies",
    "name": "Last Stand",
    "subtitle": "Rare anomaly card",
    "summary": "Below half HP: +30% damage, take 20% less. A rare anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Below half HP: +30% damage, take 20% less."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Last Stand** is a rare anomaly card. Below half HP: +30% damage, take 20% less.",
          "It is a plain number that works on its own, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Combines well with other low-health cards: below half HP you deal 30% more and take 20% less."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "overtime"
      },
      {
        "category": "anomalies",
        "slug": "counter-offer"
      },
      {
        "category": "anomalies",
        "slug": "second-wind"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      }
    ]
  },
  {
    "slug": "death-mark",
    "category": "anomalies",
    "name": "Death Mark",
    "subtitle": "Rare anomaly card",
    "summary": "Hits mark elites: they take +25% damage. A rare anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Marked"
      },
      {
        "label": "Effect",
        "value": "Hits mark elites: they take +25% damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Death Mark** is a rare anomaly card. Hits mark elites: they take +25% damage.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Hits mark elites, so they take +25% damage from everything, including allies in [[mechanics/co-op-multiplayer|co-op]].",
          "Payoff cards that reward marked foes: [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "marked"
      },
      {
        "category": "anomalies",
        "slug": "rusty-nails"
      },
      {
        "category": "anomalies",
        "slug": "weak-spot"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "reaper",
    "category": "anomalies",
    "name": "Reaper",
    "subtitle": "Epic anomaly card",
    "summary": "5 kills, no 8 s gap: next hit deals x3.5. A epic anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "5 kills, no 8 s gap: next hit deals x3.5."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Reaper** is an epic anomaly card. 5 kills, no 8 s gap: next hit deals x3.5.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "You need a streak of 5 kills without an 8-second gap; then the next hit deals x3.5, which suits boss and elite openers."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "burning-ground"
      },
      {
        "category": "anomalies",
        "slug": "loaded-dice"
      },
      {
        "category": "anomalies",
        "slug": "bounty-hunter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "hollow-points",
    "category": "anomalies",
    "name": "Hollow Points",
    "subtitle": "Common anomaly card",
    "summary": "+25% damage. A common anomaly card of the Any play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+25% damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Hollow Points** is a common anomaly card. +25% damage.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A flat +25% damage that suits every weapon and every build. It is the simplest strong pick."
        ]
      }
    ],
    "tags": [
      "Common",
      "Any"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "thick-skin"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "trigger-happy",
    "category": "anomalies",
    "name": "Trigger Happy",
    "subtitle": "Common anomaly card",
    "summary": "+20% fire rate. A common anomaly card of the Any play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+20% fire rate."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Trigger Happy** is a common anomaly card. +20% fire rate.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+20% fire rate. It also helps every card that counts shots or hits, such as Ember Rounds or Breaker."
        ]
      }
    ],
    "tags": [
      "Common",
      "Any"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "thick-skin"
      },
      {
        "category": "anomalies",
        "slug": "heart-of-steel"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      },
      {
        "category": "weapons",
        "slug": "stapler-smg"
      }
    ]
  },
  {
    "slug": "lucky",
    "category": "anomalies",
    "name": "Lucky",
    "subtitle": "Rare anomaly card",
    "summary": "+12% crit chance. A rare anomaly card of the Any play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+12% crit chance."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Lucky** is a rare anomaly card. +12% crit chance.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+12% critical chance. It is wasted on weapons that cannot crit, so check your weapons first.",
          "It is only offered when your build can use it: it needs a weapon that can crit."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Any"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "thick-skin"
      },
      {
        "category": "anomalies",
        "slug": "heart-of-steel"
      },
      {
        "category": "anomalies",
        "slug": "sprinter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "buckshot",
    "category": "anomalies",
    "name": "Buckshot",
    "subtitle": "Common anomaly card",
    "summary": "+2 pellets on shotguns. A common anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+2 pellets on shotguns."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Buckshot** is a common anomaly card. +2 pellets on shotguns.",
          "It is a plain number that works on its own, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Needs a shotgun: it adds 2 pellets to every shot, which helps shorter-range burst damage.",
          "It is only offered when your build can use it: it needs a shotgun."
        ]
      }
    ],
    "tags": [
      "Common",
      "Close"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "heavy-hitter"
      },
      {
        "category": "anomalies",
        "slug": "wrong-size"
      },
      {
        "category": "anomalies",
        "slug": "mosh-pit"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "piercing-rounds",
    "category": "anomalies",
    "name": "Piercing Rounds",
    "subtitle": "Rare anomaly card",
    "summary": "Bullets pass through 1 more foe. A rare anomaly card of the Far play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-far|Far]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Bullets pass through 1 more foe."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Piercing Rounds** is a rare anomaly card. Bullets pass through 1 more foe.",
          "It is a plain number that works on its own, in the Far play style (fighting at range or alone)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Bullets pass through one more foe, which is excellent in corridors where zombies line up.",
          "It is only offered when your build can use it: it needs a piercing weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Far"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "stalker"
      },
      {
        "category": "anomalies",
        "slug": "lone-wolf"
      },
      {
        "category": "anomalies",
        "slug": "long-shot"
      },
      {
        "category": "anomalies",
        "slug": "play-style-far"
      }
    ]
  },
  {
    "slug": "marked",
    "category": "anomalies",
    "name": "Marked",
    "subtitle": "Rare anomaly card",
    "summary": "First hit marks a foe: +10% 3 s. Not bosses. A rare anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Marked"
      },
      {
        "label": "Effect",
        "value": "First hit marks a foe: +10% 3 s. Not bosses."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Marked** is a rare anomaly card. First hit marks a foe: +10% 3 s. Not bosses.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "The first hit on each foe marks it for 3 seconds with +10% damage; it does not mark bosses.",
          "Payoff cards that reward marked foes: [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "rusty-nails"
      },
      {
        "category": "anomalies",
        "slug": "weak-spot"
      },
      {
        "category": "anomalies",
        "slug": "shatter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "echo",
    "category": "anomalies",
    "name": "Echo",
    "subtitle": "Epic anomaly card",
    "summary": "20% chance a shot fires twice. A epic anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "20% chance a shot fires twice."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Echo** is an epic anomaly card. 20% chance a shot fires twice.",
          "It is a plain number that works on its own, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A 20% chance each shot fires twice. It works with weapons that can repeat their shots."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Rate"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "rimshot"
      },
      {
        "category": "anomalies",
        "slug": "switch-hitter"
      },
      {
        "category": "anomalies",
        "slug": "chain-shock"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "landing-shot",
    "category": "anomalies",
    "name": "Landing Shot",
    "subtitle": "Common anomaly card",
    "summary": "Landing: next hit x2, max every 2.5 s. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Landing: next hit x2, max every 2.5 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Landing Shot** is a common anomaly card. Landing: next hit x2, max every 2.5 s.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Landing prepares a x2 next hit, at most every 2.5 seconds, so jump around between shots."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "triple-jump"
      },
      {
        "category": "anomalies",
        "slug": "reverb"
      },
      {
        "category": "anomalies",
        "slug": "tempo"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "hush",
    "category": "anomalies",
    "name": "Hush",
    "subtitle": "Common anomaly card",
    "summary": "Stand still 1 s: next hit x2, max every 3 s. A common anomaly card of the Still play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-still|Still]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Stand still 1 s: next hit x2, max every 3 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Hush** is a common anomaly card. Stand still 1 s: next hit x2, max every 3 s.",
          "It is a trigger card: when something happens, something else happens, in the Still play style (standing your ground)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stand still for 1 second to prime a x2 hit, with at most one per 3 seconds. It suits snipers and turret builds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Still"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "subsonic-ring"
      },
      {
        "category": "anomalies",
        "slug": "rooted"
      },
      {
        "category": "anomalies",
        "slug": "still-coil"
      },
      {
        "category": "anomalies",
        "slug": "play-style-still"
      }
    ]
  },
  {
    "slug": "heavy-hitter",
    "category": "anomalies",
    "name": "Heavy Hitter",
    "subtitle": "Common anomaly card",
    "summary": "+50% push. 4th hit stuns 0.5 s, 1.5 s gap. A common anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Stunned"
      },
      {
        "label": "Effect",
        "value": "+50% push. 4th hit stuns 0.5 s, 1.5 s gap."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Heavy Hitter** is a common anomaly card. +50% push. 4th hit stuns 0.5 s, 1.5 s gap.",
          "It is a status starter: it creates a status on foes, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "More push, and every 4th hit stuns for 0.5 seconds (with a 1.5-second gap). It starts the stunned status.",
          "Payoff cards that reward stunned foes: [[anomalies/shatter|Shatter]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Close",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "wrong-size"
      },
      {
        "category": "anomalies",
        "slug": "mosh-pit"
      },
      {
        "category": "anomalies",
        "slug": "point-blank"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      },
      {
        "category": "weapons",
        "slug": "grenade-launcher"
      }
    ]
  },
  {
    "slug": "stalker",
    "category": "anomalies",
    "name": "Stalker",
    "subtitle": "Rare anomaly card",
    "summary": "Fleeing or knocked-back foes take x2 damage. A rare anomaly card of the Far play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-far|Far]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Fleeing or knocked-back foes take x2 damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Stalker** is a rare anomaly card. Fleeing or knocked-back foes take x2 damage.",
          "It is a plain number that works on its own, in the Far play style (fighting at range or alone)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Doubles damage to foes that are fleeing or knocked back, so combine it with push effects."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Far"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "lone-wolf"
      },
      {
        "category": "anomalies",
        "slug": "long-shot"
      },
      {
        "category": "anomalies",
        "slug": "distance-learning"
      },
      {
        "category": "anomalies",
        "slug": "play-style-far"
      }
    ]
  },
  {
    "slug": "demolition",
    "category": "anomalies",
    "name": "Demolition",
    "subtitle": "Rare anomaly card",
    "summary": "+20% explosion size. A rare anomaly card of the Blast play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-blast|Blast]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+20% explosion size."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Demolition** is a rare anomaly card. +20% explosion size.",
          "It is a plain number that works on its own, in the Blast play style (bigger and safer explosions)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A 20% larger explosion radius for rockets, grenades and barrels.",
          "It is only offered when your build can use it: it needs an explosive weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Blast"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "high-explosive"
      },
      {
        "category": "anomalies",
        "slug": "cluster-bombs"
      },
      {
        "category": "anomalies",
        "slug": "loyal-barrels"
      },
      {
        "category": "anomalies",
        "slug": "play-style-blast"
      }
    ]
  },
  {
    "slug": "high-explosive",
    "category": "anomalies",
    "name": "High Explosive",
    "subtitle": "Rare anomaly card",
    "summary": "+25% explosion damage. A rare anomaly card of the Blast play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-blast|Blast]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+25% explosion damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**High Explosive** is a rare anomaly card. +25% explosion damage.",
          "It is a plain number that works on its own, in the Blast play style (bigger and safer explosions)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "25% more explosion damage; take it alongside Demolition for a blast build.",
          "It is only offered when your build can use it: it needs an explosive weapon."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Blast"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "cluster-bombs"
      },
      {
        "category": "anomalies",
        "slug": "loyal-barrels"
      },
      {
        "category": "anomalies",
        "slug": "demolition"
      },
      {
        "category": "anomalies",
        "slug": "play-style-blast"
      }
    ]
  },
  {
    "slug": "burning-ground",
    "category": "anomalies",
    "name": "Burning Ground",
    "subtitle": "Rare anomaly card",
    "summary": "Kills leave 3 s flame patches, max 2 at once. A rare anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Makes",
        "value": "Burning (when its rule applies it)"
      },
      {
        "label": "Effect",
        "value": "Kills leave 3 s flame patches, max 2 at once."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Burning Ground** is a rare anomaly card. Kills leave 3 s flame patches, max 2 at once.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kills leave flame patches that last 3 seconds, with at most 2 at once, which punish foes that keep pushing forward.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "loaded-dice"
      },
      {
        "category": "anomalies",
        "slug": "bounty-hunter"
      },
      {
        "category": "anomalies",
        "slug": "momentum"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "cluster-bombs",
    "category": "anomalies",
    "name": "Cluster Bombs",
    "subtitle": "Epic anomaly card",
    "summary": "Launcher grenades split into 2 mini bombs. A epic anomaly card of the Blast play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-blast|Blast]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Launcher grenades split into 2 mini bombs."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Cluster Bombs** is an epic anomaly card. Launcher grenades split into 2 mini bombs.",
          "It is a plain number that works on its own, in the Blast play style (bigger and safer explosions)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Launcher grenades split into 2 mini bombs. It needs a grenade launcher.",
          "It is only offered when your build can use it: it needs a grenade launcher."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Blast"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "loyal-barrels"
      },
      {
        "category": "anomalies",
        "slug": "demolition"
      },
      {
        "category": "anomalies",
        "slug": "high-explosive"
      },
      {
        "category": "anomalies",
        "slug": "play-style-blast"
      }
    ]
  },
  {
    "slug": "loyal-barrels",
    "category": "anomalies",
    "name": "Loyal Barrels",
    "subtitle": "Common anomaly card",
    "summary": "Your blasts never hurt you and deal +10%. A common anomaly card of the Blast play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-blast|Blast]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Your blasts never hurt you and deal +10%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Loyal Barrels** is a common anomaly card. Your blasts never hurt you and deal +10%.",
          "It is a plain number that works on its own, in the Blast play style (bigger and safer explosions)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Your own blasts and exploding barrels never hurt you, so you can fight in the middle of your own explosions.",
          "It is only offered when your build can use it: it needs an explosive weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Blast"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "demolition"
      },
      {
        "category": "anomalies",
        "slug": "high-explosive"
      },
      {
        "category": "anomalies",
        "slug": "cluster-bombs"
      },
      {
        "category": "anomalies",
        "slug": "play-style-blast"
      }
    ]
  },
  {
    "slug": "excavator",
    "category": "anomalies",
    "name": "Excavator",
    "subtitle": "Common anomaly card",
    "summary": "+100% damage to walls and floors. A common anomaly card of the Walls play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-walls|Walls]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+100% damage to walls and floors."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Excavator** is a common anomaly card. +100% damage to walls and floors.",
          "It is a plain number that works on its own, in the Walls play style (breaking walls and using cover)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Doubles damage to walls and floors, which speeds up digging shortcuts and feeds the Walls cards."
        ]
      }
    ],
    "tags": [
      "Common",
      "Walls"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "noclip-rounds"
      },
      {
        "category": "anomalies",
        "slug": "bunker"
      },
      {
        "category": "anomalies",
        "slug": "shard-storm"
      },
      {
        "category": "anomalies",
        "slug": "play-style-walls"
      },
      {
        "category": "weapons",
        "slug": "demolition-drill"
      }
    ]
  },
  {
    "slug": "noclip-rounds",
    "category": "anomalies",
    "name": "Noclip Rounds",
    "subtitle": "Rare anomaly card",
    "summary": "20% of bullets ignore walls. A rare anomaly card of the Walls play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-walls|Walls]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "20% of bullets ignore walls."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Noclip Rounds** is a rare anomaly card. 20% of bullets ignore walls.",
          "It is a plain number that works on its own, in the Walls play style (breaking walls and using cover)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "One in five bullets ignores walls, letting you hit foes through cover."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Walls"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "bunker"
      },
      {
        "category": "anomalies",
        "slug": "shard-storm"
      },
      {
        "category": "anomalies",
        "slug": "collapse"
      },
      {
        "category": "anomalies",
        "slug": "play-style-walls"
      },
      {
        "category": "weapons",
        "slug": "fire-axe"
      }
    ]
  },
  {
    "slug": "rusty-nails",
    "category": "anomalies",
    "name": "Rusty Nails",
    "subtitle": "Common anomaly card",
    "summary": "Every 2 s a hit pins a foe 0.8 s. Not bosses. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Stunned"
      },
      {
        "label": "Effect",
        "value": "Every 2 s a hit pins a foe 0.8 s. Not bosses."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Rusty Nails** is a common anomaly card. Every 2 s a hit pins a foe 0.8 s. Not bosses.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every 2 seconds a hit pins a foe for 0.8 seconds. Bosses are immune. It is a stun starter for Shatter.",
          "Payoff cards that reward stunned foes: [[anomalies/shatter|Shatter]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "weak-spot"
      },
      {
        "category": "anomalies",
        "slug": "shatter"
      },
      {
        "category": "anomalies",
        "slug": "wet-tiles"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      },
      {
        "category": "weapons",
        "slug": "nail-gun"
      }
    ]
  },
  {
    "slug": "weak-spot",
    "category": "anomalies",
    "name": "Weak Spot",
    "subtitle": "Common anomaly card",
    "summary": "Foes with a status take +20% from your hits. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Payoff"
      },
      {
        "label": "Loves",
        "value": "any status"
      },
      {
        "label": "Effect",
        "value": "Foes with a status take +20% from your hits."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Weak Spot** is a common anomaly card. Foes with a status take +20% from your hits.",
          "It is a status payoff: it rewards foes that carry a status, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A payoff for any status: foes that are burning, slowed, marked or stunned take 20% more from your hits.",
          "A payoff card is never offered until your build can create the status it rewards.",
          "Status starters that feed it: [[anomalies/final-notice|Final Notice]], [[anomalies/wet-suit|Wet Suit]], [[anomalies/breaker|Breaker]], [[anomalies/pyromaniac|Pyromaniac]], [[anomalies/pilot-light|Pilot Light]], [[anomalies/hot-hands|Hot Hands]], [[anomalies/ember-rounds|Ember Rounds]], [[anomalies/backdraft|Backdraft]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status payoff"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "shatter"
      },
      {
        "category": "anomalies",
        "slug": "wet-tiles"
      },
      {
        "category": "anomalies",
        "slug": "boiler-flame"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "shatter",
    "category": "anomalies",
    "name": "Shatter",
    "subtitle": "Rare anomaly card",
    "summary": "Stunned foes take +40% from your hits. A rare anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Payoff"
      },
      {
        "label": "Loves",
        "value": "Stunned"
      },
      {
        "label": "Effect",
        "value": "Stunned foes take +40% from your hits."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Shatter** is a rare anomaly card. Stunned foes take +40% from your hits.",
          "It is a status payoff: it rewards foes that carry a status, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stunned foes take +40% from your hits. Pair it with Rusty Nails, Heavy Hitter or Final Notice.",
          "A payoff card is never offered until your build can create the status it rewards.",
          "Status starters that feed it: [[anomalies/final-notice|Final Notice]], [[anomalies/heavy-hitter|Heavy Hitter]], [[anomalies/rusty-nails|Rusty Nails]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Status",
      "Status payoff"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "wet-tiles"
      },
      {
        "category": "anomalies",
        "slug": "boiler-flame"
      },
      {
        "category": "anomalies",
        "slug": "final-notice"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      }
    ]
  },
  {
    "slug": "wrong-size",
    "category": "anomalies",
    "name": "Wrong Size",
    "subtitle": "Common anomaly card",
    "summary": "+30% melee reach and knockback. A common anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+30% melee reach and knockback."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Wrong Size** is a common anomaly card. +30% melee reach and knockback.",
          "It is a plain number that works on its own, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+30% melee reach and knockback, which helps close-range builds stay out of bite range.",
          "It is only offered when your build can use it: it needs a melee weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Close"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "mosh-pit"
      },
      {
        "category": "anomalies",
        "slug": "point-blank"
      },
      {
        "category": "anomalies",
        "slug": "close-aura"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "wet-tiles",
    "category": "anomalies",
    "name": "Wet Tiles",
    "subtitle": "Common anomaly card",
    "summary": "Your hits slow foes by 30%. A common anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Slowed"
      },
      {
        "label": "Effect",
        "value": "Your hits slow foes by 30%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Wet Tiles** is a common anomaly card. Your hits slow foes by 30%.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Your hits slow foes by 30%. It is the easiest slow source for Cold Snap.",
          "Payoff cards that reward slowed foes: [[anomalies/cold-snap|Cold Snap]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Common",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "boiler-flame"
      },
      {
        "category": "anomalies",
        "slug": "final-notice"
      },
      {
        "category": "anomalies",
        "slug": "cold-snap"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      },
      {
        "category": "weapons",
        "slug": "laser-tube"
      }
    ]
  },
  {
    "slug": "thick-skin",
    "category": "anomalies",
    "name": "Thick Skin",
    "subtitle": "Common anomaly card",
    "summary": "Take 20% less damage. A common anomaly card of the Any play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Take 20% less damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Thick Skin** is a common anomaly card. Take 20% less damage.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A flat 20% less damage taken that always helps."
        ]
      }
    ],
    "tags": [
      "Common",
      "Any"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "heart-of-steel"
      },
      {
        "category": "anomalies",
        "slug": "sprinter"
      },
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "vampire",
    "category": "anomalies",
    "name": "Vampire",
    "subtitle": "Rare anomaly card",
    "summary": "Heal 4 HP for every kill. A rare anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Heal 4 HP for every kill."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Vampire** is a rare anomaly card. Heal 4 HP for every kill.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Heal 4 HP for every kill, which is strongest with fast, multi-kill weapons."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "adrenaline"
      },
      {
        "category": "anomalies",
        "slug": "holy-almond-water"
      },
      {
        "category": "anomalies",
        "slug": "hard-hat"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "adrenaline",
    "category": "anomalies",
    "name": "Adrenaline",
    "subtitle": "Rare anomaly card",
    "summary": "Heal 0.8 HP every second. A rare anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Heal 0.8 HP every second."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Adrenaline** is a rare anomaly card. Heal 0.8 HP every second.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Heal 0.8 HP every second at all times, which adds up between fights."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "holy-almond-water"
      },
      {
        "category": "anomalies",
        "slug": "hard-hat"
      },
      {
        "category": "anomalies",
        "slug": "staff-lunch"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      }
    ]
  },
  {
    "slug": "heart-of-steel",
    "category": "anomalies",
    "name": "Heart Of Steel",
    "subtitle": "Common anomaly card",
    "summary": "+25 max HP. A common anomaly card of the Any play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+25 max HP."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Heart Of Steel** is a common anomaly card. +25 max HP.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+25 max HP. It pairs with percentage-based healing and shields."
        ]
      }
    ],
    "tags": [
      "Common",
      "Any"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "sprinter"
      },
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "holy-almond-water",
    "category": "anomalies",
    "name": "Holy Almond Water",
    "subtitle": "Rare anomaly card",
    "summary": "Every [[items/almond-water|almond water]] also heals 4 HP. A rare anomaly card of the Survive play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-survive|Survive]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Every [[items/almond-water|almond water]] also heals 4 HP."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Holy Almond Water** is a rare anomaly card. Every [[items/almond-water|almond water]] also heals 4 HP.",
          "It is a plain number that works on its own, in the Survive play style (shields, healing and staying unhurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every [[items/almond-water|almond water]] you pick up also heals 4 HP. Break things and loot to keep it flowing."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Survive"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hard-hat"
      },
      {
        "category": "anomalies",
        "slug": "staff-lunch"
      },
      {
        "category": "anomalies",
        "slug": "swatter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-survive"
      },
      {
        "category": "weapons",
        "slug": "salt-gun"
      }
    ]
  },
  {
    "slug": "magnet",
    "category": "anomalies",
    "name": "Magnet",
    "subtitle": "Common anomaly card",
    "summary": "+3 tiles pickup radius. Each kill heals 0.3%. A common anomaly card of the Support play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-support|Support]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "+3 tiles pickup radius. Each kill heals 0.3%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Magnet** is a common anomaly card. +3 tiles pickup radius. Each kill heals 0.3%.",
          "It is a trigger card: when something happens, something else happens, in the Support play style (team play, loot, vision and light)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+3 tiles of pickup radius, and every kill heals 0.3%. A quiet utility pick."
        ]
      }
    ],
    "tags": [
      "Common",
      "Support"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "third-eye"
      },
      {
        "category": "anomalies",
        "slug": "night-shift"
      },
      {
        "category": "anomalies",
        "slug": "huddle"
      },
      {
        "category": "anomalies",
        "slug": "play-style-support"
      }
    ]
  },
  {
    "slug": "third-eye",
    "category": "anomalies",
    "name": "Third Eye",
    "subtitle": "Common anomaly card",
    "summary": "See foes in the dark, and unmask mimics. A common anomaly card of the Support play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-support|Support]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "See foes in the dark, and unmask mimics."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Third Eye** is a common anomaly card. See foes in the dark, and unmask mimics.",
          "It is a plain number that works on its own, in the Support play style (team play, loot, vision and light)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "See foes in the dark and unmask mimics, so disguised enemies cannot ambush you."
        ]
      }
    ],
    "tags": [
      "Common",
      "Support"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "night-shift"
      },
      {
        "category": "anomalies",
        "slug": "huddle"
      },
      {
        "category": "anomalies",
        "slug": "haggler"
      },
      {
        "category": "anomalies",
        "slug": "play-style-support"
      },
      {
        "category": "weapons",
        "slug": "tactical-flashlight"
      }
    ]
  },
  {
    "slug": "night-shift",
    "category": "anomalies",
    "name": "Night Shift",
    "subtitle": "Common anomaly card",
    "summary": "+60% damage while you stand in the dark. A common anomaly card of the Support play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-support|Support]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+60% damage while you stand in the dark."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Night Shift** is a common anomaly card. +60% damage while you stand in the dark.",
          "It is a plain number that works on its own, in the Support play style (team play, loot, vision and light)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+60% damage while you stand in the dark. It is strongest in unlit rooms."
        ]
      }
    ],
    "tags": [
      "Common",
      "Support"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "huddle"
      },
      {
        "category": "anomalies",
        "slug": "haggler"
      },
      {
        "category": "anomalies",
        "slug": "fuse-box"
      },
      {
        "category": "anomalies",
        "slug": "play-style-support"
      },
      {
        "category": "weapons",
        "slug": "underground-cable"
      }
    ]
  },
  {
    "slug": "sprinter",
    "category": "anomalies",
    "name": "Sprinter",
    "subtitle": "Common anomaly card",
    "summary": "+25% move speed. A common anomaly card of the Any play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-any|Any]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+25% move speed."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Sprinter** is a common anomaly card. +25% move speed.",
          "It is a plain number that works on its own, in the Any play style (plain numbers that fit every build)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+25% movement speed. It helps every kiting and motion build."
        ]
      }
    ],
    "tags": [
      "Common",
      "Any"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hollow-points"
      },
      {
        "category": "anomalies",
        "slug": "trigger-happy"
      },
      {
        "category": "anomalies",
        "slug": "lucky"
      },
      {
        "category": "anomalies",
        "slug": "play-style-any"
      }
    ]
  },
  {
    "slug": "triple-jump",
    "category": "anomalies",
    "name": "Triple Jump",
    "subtitle": "Rare anomaly card",
    "summary": "One more jump in mid-air: 3 jumps in all. A rare anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "One more jump in mid-air: 3 jumps in all."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Triple Jump** is a rare anomaly card. One more jump in mid-air: 3 jumps in all.",
          "It is a plain number that works on its own, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every survivor already has one air jump, so this adds a third jump. It also feeds the air-jump and landing cards."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "reverb"
      },
      {
        "category": "anomalies",
        "slug": "tempo"
      },
      {
        "category": "anomalies",
        "slug": "bass-drop"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "floodlight",
    "category": "anomalies",
    "name": "Floodlight",
    "subtitle": "Common anomaly card",
    "summary": "Energy>25%: zap a foe in 6 tiles every 1.5 s. A common anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Energy>25%: zap a foe in 6 tiles every 1.5 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Floodlight** is a common anomaly card. Energy>25%: zap a foe in 6 tiles every 1.5 s.",
          "It is a trigger card: when something happens, something else happens, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "While your energy is above 25%, it zaps a foe within 6 tiles every 1.5 seconds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Battery"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "backup-capacitor"
      },
      {
        "category": "anomalies",
        "slug": "live-wire"
      },
      {
        "category": "anomalies",
        "slug": "broken-bulb"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "backup-capacitor",
    "category": "anomalies",
    "name": "Backup Capacitor",
    "subtitle": "Common anomaly card",
    "summary": "+20 max energy, and it drains 10% slower. A common anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+20 max energy, and it drains 10% slower."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Backup Capacitor** is a common anomaly card. +20 max energy, and it drains 10% slower.",
          "It is a plain number that works on its own, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+20 max energy, and energy drains 10% slower.",
          "It is only offered when your build can use it: it needs an energy weapon or the lamp."
        ]
      }
    ],
    "tags": [
      "Common",
      "Battery"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "live-wire"
      },
      {
        "category": "anomalies",
        "slug": "broken-bulb"
      },
      {
        "category": "anomalies",
        "slug": "coffee-break"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "live-wire",
    "category": "anomalies",
    "name": "Live Wire",
    "subtitle": "Rare anomaly card",
    "summary": "+30% damage with energy-tag guns. A rare anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+30% damage with energy-tag guns."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Live Wire** is a rare anomaly card. +30% damage with energy-tag guns.",
          "It is a plain number that works on its own, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+30% damage with energy-tag guns. Useless without one.",
          "It is only offered when your build can use it: it needs an energy weapon or the lamp."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Battery"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "broken-bulb"
      },
      {
        "category": "anomalies",
        "slug": "coffee-break"
      },
      {
        "category": "anomalies",
        "slug": "battery-saver"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      },
      {
        "category": "weapons",
        "slug": "ceiling-fan-turret"
      }
    ]
  },
  {
    "slug": "broken-bulb",
    "category": "anomalies",
    "name": "Broken Bulb",
    "subtitle": "Common anomaly card",
    "summary": "+20 energy per ceiling light you break. A common anomaly card of the Battery play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-battery|Battery]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+20 energy per ceiling light you break."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Broken Bulb** is a common anomaly card. +20 energy per ceiling light you break.",
          "It is a plain number that works on its own, in the Battery play style (the [[items/flashlight|flashlight]] lamp and energy weapons)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Each ceiling light you break gives +20 energy, so shoot the lights in a lit room.",
          "It is only offered when your build can use it: it needs an energy weapon or the lamp."
        ]
      }
    ],
    "tags": [
      "Common",
      "Battery"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "coffee-break"
      },
      {
        "category": "anomalies",
        "slug": "battery-saver"
      },
      {
        "category": "anomalies",
        "slug": "grounding-rod"
      },
      {
        "category": "anomalies",
        "slug": "play-style-battery"
      }
    ]
  },
  {
    "slug": "boiler-flame",
    "category": "anomalies",
    "name": "Boiler Flame",
    "subtitle": "Rare anomaly card",
    "summary": "The 2nd hit on a foe sets it on fire. A rare anomaly card of the Status play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-status|Status]]"
      },
      {
        "label": "Role",
        "value": "Starter"
      },
      {
        "label": "Makes",
        "value": "Burning"
      },
      {
        "label": "Effect",
        "value": "The 2nd hit on a foe sets it on fire."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Boiler Flame** is a rare anomaly card. The 2nd hit on a foe sets it on fire.",
          "It is a status starter: it creates a status on foes, in the Status play style (setting foes on fire, slowing, marking or stunning them, then hitting them harder)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "The second hit on each foe sets it on fire. It is a fire starter that fits slow weapons.",
          "Payoff cards that reward burning foes: [[anomalies/kindling|Kindling]], [[anomalies/weak-spot|Weak Spot]]."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Status",
      "Status starter"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "final-notice"
      },
      {
        "category": "anomalies",
        "slug": "cold-snap"
      },
      {
        "category": "anomalies",
        "slug": "pyromaniac"
      },
      {
        "category": "anomalies",
        "slug": "play-style-status"
      },
      {
        "category": "weapons",
        "slug": "pump-shotgun"
      }
    ]
  },
  {
    "slug": "overtime",
    "category": "anomalies",
    "name": "Overtime",
    "subtitle": "Rare anomaly card",
    "summary": "Up to +70% gun fire rate as your HP drops. A rare anomaly card of the Comeback play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-comeback|Comeback]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Up to +70% gun fire rate as your HP drops."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Overtime** is a rare anomaly card. Up to +70% gun fire rate as your HP drops.",
          "It is a plain number that works on its own, in the Comeback play style (getting stronger as your health drops or after you are hurt)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Up to +70% gun fire rate as your health drops, so it fits low-health builds."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Comeback"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "counter-offer"
      },
      {
        "category": "anomalies",
        "slug": "second-wind"
      },
      {
        "category": "anomalies",
        "slug": "lifeline"
      },
      {
        "category": "anomalies",
        "slug": "play-style-comeback"
      },
      {
        "category": "weapons",
        "slug": "industrial-printer"
      }
    ]
  },
  {
    "slug": "huddle",
    "category": "anomalies",
    "name": "Huddle",
    "subtitle": "Common anomaly card",
    "summary": "Ally within 6 tiles: take 20% less damage. A common anomaly card of the Support play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-support|Support]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Ally within 6 tiles: take 20% less damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Huddle** is a common anomaly card. Ally within 6 tiles: take 20% less damage.",
          "It is a plain number that works on its own, in the Support play style (team play, loot, vision and light)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "[[mechanics/co-op-multiplayer|Co-op]] only: stay within 6 tiles of an ally and you take 20% less damage.",
          "It is a team card and is not offered in solo runs."
        ]
      }
    ],
    "tags": [
      "Common",
      "Support"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "haggler"
      },
      {
        "category": "anomalies",
        "slug": "fuse-box"
      },
      {
        "category": "anomalies",
        "slug": "magnet"
      },
      {
        "category": "anomalies",
        "slug": "play-style-support"
      }
    ]
  },
  {
    "slug": "lone-wolf",
    "category": "anomalies",
    "name": "Lone Wolf",
    "subtitle": "Common anomaly card",
    "summary": "No foe within 3 tiles: +20% gun damage. A common anomaly card of the Far play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-far|Far]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "No foe within 3 tiles: +20% gun damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Lone Wolf** is a common anomaly card. No foe within 3 tiles: +20% gun damage.",
          "It is a plain number that works on its own, in the Far play style (fighting at range or alone)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "No foe within 3 tiles gives +20% gun damage, which suits kiting builds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Far"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "long-shot"
      },
      {
        "category": "anomalies",
        "slug": "distance-learning"
      },
      {
        "category": "anomalies",
        "slug": "piercing-rounds"
      },
      {
        "category": "anomalies",
        "slug": "play-style-far"
      }
    ]
  },
  {
    "slug": "loaded-dice",
    "category": "anomalies",
    "name": "Loaded Dice",
    "subtitle": "Common anomaly card",
    "summary": "On kill, 30%: next hit +120%. +1 free reroll. A common anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "On kill, 30%: next hit +120%. +1 free reroll."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Loaded Dice** is a common anomaly card. On kill, 30%: next hit +120%. +1 free reroll.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "On kills there is a 30% chance that your next hit deals +120%. It also gives you 1 free reroll."
        ]
      }
    ],
    "tags": [
      "Common",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "bounty-hunter"
      },
      {
        "category": "anomalies",
        "slug": "momentum"
      },
      {
        "category": "anomalies",
        "slug": "hot-streak"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "haggler",
    "category": "anomalies",
    "name": "Haggler",
    "subtitle": "Common anomaly card",
    "summary": "[[items/vending-machine|Vending machines]] cost 15% less. A common anomaly card of the Support play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-support|Support]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "[[items/vending-machine|Vending machines]] cost 15% less."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Haggler** is a common anomaly card. [[items/vending-machine|Vending machines]] cost 15% less.",
          "It is a plain number that works on its own, in the Support play style (team play, loot, vision and light)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "[[items/vending-machine|Vending machines]] cost 15% less."
        ]
      }
    ],
    "tags": [
      "Common",
      "Support"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "fuse-box"
      },
      {
        "category": "anomalies",
        "slug": "magnet"
      },
      {
        "category": "anomalies",
        "slug": "third-eye"
      },
      {
        "category": "anomalies",
        "slug": "play-style-support"
      }
    ]
  },
  {
    "slug": "bounty-hunter",
    "category": "anomalies",
    "name": "Bounty Hunter",
    "subtitle": "Rare anomaly card",
    "summary": "Elite kills heal 2% of max HP. A rare anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Elite kills heal 2% of max HP."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Bounty Hunter** is a rare anomaly card. Elite kills heal 2% of max HP.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Killing an elite heals you for 2% of your max HP."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "momentum"
      },
      {
        "category": "anomalies",
        "slug": "hot-streak"
      },
      {
        "category": "anomalies",
        "slug": "black-belt"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "reverb",
    "category": "anomalies",
    "name": "Reverb",
    "subtitle": "Common anomaly card",
    "summary": "Air jump, max every 2 s: ring pushes foes. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Air jump, max every 2 s: ring pushes foes."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Reverb** is a common anomaly card. Air jump, max every 2 s: ring pushes foes.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Air jumps release a ring that pushes foes back, at most every 2 seconds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "tempo"
      },
      {
        "category": "anomalies",
        "slug": "bass-drop"
      },
      {
        "category": "anomalies",
        "slug": "high-ground"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "tempo",
    "category": "anomalies",
    "name": "Tempo",
    "subtitle": "Common anomaly card",
    "summary": "Air jump, max every 4 s: +15% fire rate 3 s. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Air jump, max every 4 s: +15% fire rate 3 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Tempo** is a common anomaly card. Air jump, max every 4 s: +15% fire rate 3 s.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "An air jump grants +15% fire rate for 3 seconds, at most every 4 seconds. Chain jumps and shots."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "bass-drop"
      },
      {
        "category": "anomalies",
        "slug": "high-ground"
      },
      {
        "category": "anomalies",
        "slug": "drop-kick"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "momentum",
    "category": "anomalies",
    "name": "Momentum",
    "subtitle": "Common anomaly card",
    "summary": "Each kill +3% fire rate, max 15%. Fades idle. A common anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Each kill +3% fire rate, max 15%. Fades idle."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Momentum** is a common anomaly card. Each kill +3% fire rate, max 15%. Fades idle.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Each kill adds 3% fire rate up to 15%. The bonus fades when you stop killing."
        ]
      }
    ],
    "tags": [
      "Common",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "hot-streak"
      },
      {
        "category": "anomalies",
        "slug": "black-belt"
      },
      {
        "category": "anomalies",
        "slug": "storm-front"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "rimshot",
    "category": "anomalies",
    "name": "Rimshot",
    "subtitle": "Common anomaly card",
    "summary": "Every 3rd quick hit on a foe deals +25%. A common anomaly card of the Rate play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-rate|Rate]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Every 3rd quick hit on a foe deals +25%."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Rimshot** is a common anomaly card. Every 3rd quick hit on a foe deals +25%.",
          "It is a trigger card: when something happens, something else happens, in the Rate play style (shooting faster; cards that count every Nth shot trigger sooner)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Every third quick hit on the same foe deals +25%. Fast weapons trigger it easily."
        ]
      }
    ],
    "tags": [
      "Common",
      "Rate"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "switch-hitter"
      },
      {
        "category": "anomalies",
        "slug": "chain-shock"
      },
      {
        "category": "anomalies",
        "slug": "breaker"
      },
      {
        "category": "anomalies",
        "slug": "play-style-rate"
      }
    ]
  },
  {
    "slug": "mosh-pit",
    "category": "anomalies",
    "name": "Mosh Pit",
    "subtitle": "Common anomaly card",
    "summary": "With 2+ foes within 5 tiles: +25% damage. A common anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "With 2+ foes within 5 tiles: +25% damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Mosh Pit** is a common anomaly card. With 2+ foes within 5 tiles: +25% damage.",
          "It is a plain number that works on its own, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "With 2 or more foes within 5 tiles you deal +25% damage, so it loves crowds."
        ]
      }
    ],
    "tags": [
      "Common",
      "Close"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "point-blank"
      },
      {
        "category": "anomalies",
        "slug": "close-aura"
      },
      {
        "category": "anomalies",
        "slug": "chain-letter"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "hot-streak",
    "category": "anomalies",
    "name": "Hot Streak",
    "subtitle": "Rare anomaly card",
    "summary": "2 kills in 3 s: +25% rate, +15% speed 5 s. A rare anomaly card of the Kills play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-kills|Kills]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "2 kills in 3 s: +25% rate, +15% speed 5 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Hot Streak** is a rare anomaly card. 2 kills in 3 s: +25% rate, +15% speed 5 s.",
          "It is a trigger card: when something happens, something else happens, in the Kills play style (chaining kills so each kill pays out)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Two kills within 3 seconds grant +25% fire rate and +15% speed for 5 seconds."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Kills"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "black-belt"
      },
      {
        "category": "anomalies",
        "slug": "storm-front"
      },
      {
        "category": "anomalies",
        "slug": "backdraft"
      },
      {
        "category": "anomalies",
        "slug": "play-style-kills"
      }
    ]
  },
  {
    "slug": "bass-drop",
    "category": "anomalies",
    "name": "Bass Drop",
    "subtitle": "Rare anomaly card",
    "summary": "Land, max every 2.5 s: shockwave pushes foes. A rare anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Land, max every 2.5 s: shockwave pushes foes."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Bass Drop** is a rare anomaly card. Land, max every 2.5 s: shockwave pushes foes.",
          "It is a trigger card: when something happens, something else happens, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "When you land, at most every 2.5 seconds, a shockwave pushes foes away."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "high-ground"
      },
      {
        "category": "anomalies",
        "slug": "drop-kick"
      },
      {
        "category": "anomalies",
        "slug": "static-charge"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "subsonic-ring",
    "category": "anomalies",
    "name": "Subsonic Ring",
    "subtitle": "Epic anomaly card",
    "summary": "Stand still: ring every 1.2 s, through walls. A epic anomaly card of the Still play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-still|Still]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Stand still: ring every 1.2 s, through walls."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Subsonic Ring** is an epic anomaly card. Stand still: ring every 1.2 s, through walls.",
          "It is a trigger card: when something happens, something else happens, in the Still play style (standing your ground)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stand still and it emits a ring every 1.2 seconds that passes through walls."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Still"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "rooted"
      },
      {
        "category": "anomalies",
        "slug": "still-coil"
      },
      {
        "category": "anomalies",
        "slug": "hush"
      },
      {
        "category": "anomalies",
        "slug": "play-style-still"
      }
    ]
  },
  {
    "slug": "rooted",
    "category": "anomalies",
    "name": "Rooted",
    "subtitle": "Common anomaly card",
    "summary": "No move or shot 3 s: small shield every 4 s. A common anomaly card of the Still play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-still|Still]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "No move or shot 3 s: small shield every 4 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Rooted** is a common anomaly card. No move or shot 3 s: small shield every 4 s.",
          "It is a trigger card: when something happens, something else happens, in the Still play style (standing your ground)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Neither moving nor shooting for 3 seconds gives a small shield every 4 seconds, which suits a patient style."
        ]
      }
    ],
    "tags": [
      "Common",
      "Still"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "still-coil"
      },
      {
        "category": "anomalies",
        "slug": "hush"
      },
      {
        "category": "anomalies",
        "slug": "subsonic-ring"
      },
      {
        "category": "anomalies",
        "slug": "play-style-still"
      }
    ]
  },
  {
    "slug": "bunker",
    "category": "anomalies",
    "name": "Bunker",
    "subtitle": "Common anomaly card",
    "summary": "Near a wall: take 25% less damage. A common anomaly card of the Walls play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-walls|Walls]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "Near a wall: take 25% less damage."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Bunker** is a common anomaly card. Near a wall: take 25% less damage.",
          "It is a plain number that works on its own, in the Walls play style (breaking walls and using cover)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stay near walls to take 25% less damage."
        ]
      }
    ],
    "tags": [
      "Common",
      "Walls"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "shard-storm"
      },
      {
        "category": "anomalies",
        "slug": "collapse"
      },
      {
        "category": "anomalies",
        "slug": "excavator"
      },
      {
        "category": "anomalies",
        "slug": "play-style-walls"
      }
    ]
  },
  {
    "slug": "point-blank",
    "category": "anomalies",
    "name": "Point Blank",
    "subtitle": "Common anomaly card",
    "summary": "+20% damage to foes within 2.5 tiles. A common anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+20% damage to foes within 2.5 tiles."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Point Blank** is a common anomaly card. +20% damage to foes within 2.5 tiles.",
          "It is a plain number that works on its own, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+20% damage to foes within 2.5 tiles, which suits shotguns and melee."
        ]
      }
    ],
    "tags": [
      "Common",
      "Close"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "close-aura"
      },
      {
        "category": "anomalies",
        "slug": "chain-letter"
      },
      {
        "category": "anomalies",
        "slug": "wind-up"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "close-aura",
    "category": "anomalies",
    "name": "Close Aura",
    "subtitle": "Common anomaly card",
    "summary": "Foes within 1.8 tiles get hit every 0.8 s. A common anomaly card of the Close play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-close|Close]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Foes within 1.8 tiles get hit every 0.8 s."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Close Aura** is a common anomaly card. Foes within 1.8 tiles get hit every 0.8 s.",
          "It is a trigger card: when something happens, something else happens, in the Close play style (fighting up close with melee, shotguns and knockback)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Foes within 1.8 tiles are hit every 0.8 seconds without you doing anything."
        ]
      }
    ],
    "tags": [
      "Common",
      "Close"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "chain-letter"
      },
      {
        "category": "anomalies",
        "slug": "wind-up"
      },
      {
        "category": "anomalies",
        "slug": "buckshot"
      },
      {
        "category": "anomalies",
        "slug": "play-style-close"
      }
    ]
  },
  {
    "slug": "long-shot",
    "category": "anomalies",
    "name": "Long Shot",
    "subtitle": "Common anomaly card",
    "summary": "+20% damage to foes 9+ tiles away. A common anomaly card of the Far play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-far|Far]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+20% damage to foes 9+ tiles away."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Long Shot** is a common anomaly card. +20% damage to foes 9+ tiles away.",
          "It is a plain number that works on its own, in the Far play style (fighting at range or alone)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+20% damage to foes 9 or more tiles away, which suits long-range weapons.",
          "It is only offered when your build can use it: it needs a long-range weapon."
        ]
      }
    ],
    "tags": [
      "Common",
      "Far"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "distance-learning"
      },
      {
        "category": "anomalies",
        "slug": "piercing-rounds"
      },
      {
        "category": "anomalies",
        "slug": "stalker"
      },
      {
        "category": "anomalies",
        "slug": "play-style-far"
      }
    ]
  },
  {
    "slug": "high-ground",
    "category": "anomalies",
    "name": "High Ground",
    "subtitle": "Common anomaly card",
    "summary": "+30% damage to foes 2+ tiles below your feet. A common anomaly card of the Motion play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Common"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-motion|Motion]]"
      },
      {
        "label": "Role",
        "value": "Stat"
      },
      {
        "label": "Effect",
        "value": "+30% damage to foes 2+ tiles below your feet."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**High Ground** is a common anomaly card. +30% damage to foes 2+ tiles below your feet.",
          "It is a plain number that works on its own, in the Motion play style (running, jumping and landing)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "+30% damage to foes 2 or more tiles below your feet. Fight from ledges and platforms."
        ]
      }
    ],
    "tags": [
      "Common",
      "Motion"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "drop-kick"
      },
      {
        "category": "anomalies",
        "slug": "static-charge"
      },
      {
        "category": "anomalies",
        "slug": "wet-suit"
      },
      {
        "category": "anomalies",
        "slug": "play-style-motion"
      }
    ]
  },
  {
    "slug": "shard-storm",
    "category": "anomalies",
    "name": "Shard Storm",
    "subtitle": "Rare anomaly card",
    "summary": "Half of broken walls throw a shard at a foe. A rare anomaly card of the Walls play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Rare"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-walls|Walls]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Half of broken walls throw a shard at a foe."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Shard Storm** is a rare anomaly card. Half of broken walls throw a shard at a foe.",
          "It is a trigger card: when something happens, something else happens, in the Walls play style (breaking walls and using cover)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Half of the walls you break throw a shard at a foe, so it works well with Excavator and other wall-breaking cards."
        ]
      }
    ],
    "tags": [
      "Rare",
      "Walls"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "collapse"
      },
      {
        "category": "anomalies",
        "slug": "excavator"
      },
      {
        "category": "anomalies",
        "slug": "noclip-rounds"
      },
      {
        "category": "anomalies",
        "slug": "play-style-walls"
      }
    ]
  },
  {
    "slug": "collapse",
    "category": "anomalies",
    "name": "Collapse",
    "subtitle": "Epic anomaly card",
    "summary": "Walls you break crush near foes, 1.5 s gap. A epic anomaly card of the Walls play style.",
    "infobox": [
      {
        "label": "Rarity",
        "value": "Epic"
      },
      {
        "label": "Play style",
        "value": "[[anomalies/play-style-walls|Walls]]"
      },
      {
        "label": "Role",
        "value": "Engine"
      },
      {
        "label": "Effect",
        "value": "Walls you break crush near foes, 1.5 s gap."
      }
    ],
    "sections": [
      {
        "heading": "Effect",
        "paragraphs": [
          "**Collapse** is an epic anomaly card. Walls you break crush near foes, 1.5 s gap.",
          "It is a trigger card: when something happens, something else happens, in the Walls play style (breaking walls and using cover)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Walls you break crush nearby foes, with a 1.5-second gap, so it rewards fighting in tight corridors."
        ]
      }
    ],
    "tags": [
      "Epic",
      "Walls"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "excavator"
      },
      {
        "category": "anomalies",
        "slug": "noclip-rounds"
      },
      {
        "category": "anomalies",
        "slug": "bunker"
      },
      {
        "category": "anomalies",
        "slug": "play-style-walls"
      }
    ]
  },
  {
    "slug": "play-style-status",
    "category": "anomalies",
    "name": "Status play style",
    "subtitle": "Anomaly play style, 13 cards",
    "summary": "The Status play style groups 13 anomaly cards about setting foes on fire, slowing, marking or stunning them, then hitting them harder.",
    "infobox": [
      {
        "label": "Cards",
        "value": "13"
      },
      {
        "label": "Theme",
        "value": "Setting foes on fire, slowing, marking or stunning them, then hitting them harder"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Status cards set foes on fire, slow, mark or stun them, or reward foes that carry a status. They form the strongest combo loop in the game: a starter card makes a status, a payoff card pays extra for it.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/final-notice|Final Notice]]",
              "Rare",
              "Starter",
              "Every 3rd swing stuns the foes it hits 0.9 s."
            ],
            [
              "[[anomalies/cold-snap|Cold Snap]]",
              "Common",
              "Payoff",
              "Slowed foes take +25% from your hits."
            ],
            [
              "[[anomalies/pyromaniac|Pyromaniac]]",
              "Common",
              "Starter",
              "Up to 2 foes within 1.8 tiles catch fire."
            ],
            [
              "[[anomalies/pilot-light|Pilot Light]]",
              "Common",
              "Starter",
              "Your first hit on each foe sets it on fire."
            ],
            [
              "[[anomalies/kindling|Kindling]]",
              "Common",
              "Payoff",
              "Burning foes take +20% from your hits."
            ],
            [
              "[[anomalies/hot-hands|Hot Hands]]",
              "Common",
              "Starter",
              "Your melee hits set foes on fire."
            ],
            [
              "[[anomalies/death-mark|Death Mark]]",
              "Rare",
              "Starter",
              "Hits mark elites: they take +25% damage."
            ],
            [
              "[[anomalies/marked|Marked]]",
              "Rare",
              "Starter",
              "First hit marks a foe: +10% 3 s. Not bosses."
            ],
            [
              "[[anomalies/rusty-nails|Rusty Nails]]",
              "Common",
              "Starter",
              "Every 2 s a hit pins a foe 0.8 s. Not bosses."
            ],
            [
              "[[anomalies/weak-spot|Weak Spot]]",
              "Common",
              "Payoff",
              "Foes with a status take +20% from your hits."
            ],
            [
              "[[anomalies/shatter|Shatter]]",
              "Rare",
              "Payoff",
              "Stunned foes take +40% from your hits."
            ],
            [
              "[[anomalies/wet-tiles|Wet Tiles]]",
              "Common",
              "Starter",
              "Your hits slow foes by 30%."
            ],
            [
              "[[anomalies/boiler-flame|Boiler Flame]]",
              "Rare",
              "Starter",
              "The 2nd hit on a foe sets it on fire."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-rate",
    "category": "anomalies",
    "name": "Rate play style",
    "subtitle": "Anomaly play style, 8 cards",
    "summary": "The Rate play style groups 8 anomaly cards about shooting faster; cards that count every Nth shot trigger sooner.",
    "infobox": [
      {
        "label": "Cards",
        "value": "8"
      },
      {
        "label": "Theme",
        "value": "Shooting faster; cards that count every Nth shot trigger sooner"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Rate cards are about shooting faster. Many anomaly cards count every Nth shot or hit, so a higher fire rate makes all of them trigger sooner.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/switch-hitter|Switch Hitter]]",
              "Rare",
              "Engine",
              "Melee kill: attacks 30% faster for 8 s."
            ],
            [
              "[[anomalies/fever-dream|Fever Dream]]",
              "Epic, cursed",
              "Stat",
              "+70% fire rate but take 30% more damage."
            ],
            [
              "[[anomalies/chain-shock|Chain Shock]]",
              "Common",
              "Engine",
              "Every 3rd hit on a foe shocks a nearby foe."
            ],
            [
              "[[anomalies/breaker|Breaker]]",
              "Common",
              "Starter",
              "Every 8th shot, 3 s gap: slow foes near you."
            ],
            [
              "[[anomalies/ember-rounds|Ember Rounds]]",
              "Rare",
              "Starter",
              "Every 6th shot sets fire and hits +30%."
            ],
            [
              "[[anomalies/wildfire|Wildfire]]",
              "Epic",
              "Engine",
              "Every 6th shot, 1.5 s gap: ignite near foes."
            ],
            [
              "[[anomalies/echo|Echo]]",
              "Epic",
              "Stat",
              "20% chance a shot fires twice."
            ],
            [
              "[[anomalies/rimshot|Rimshot]]",
              "Common",
              "Engine",
              "Every 3rd quick hit on a foe deals +25%."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-kills",
    "category": "anomalies",
    "name": "Kills play style",
    "subtitle": "Anomaly play style, 10 cards",
    "summary": "The Kills play style groups 10 anomaly cards about chaining kills so each kill pays out.",
    "infobox": [
      {
        "label": "Cards",
        "value": "10"
      },
      {
        "label": "Theme",
        "value": "Chaining kills so each kill pays out"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Kill cards pay out when you chain kills: heal, speed, damage or a blast. Several of them share the same kill streak.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/black-belt|Black Belt]]",
              "Rare",
              "Engine",
              "Each melee kill: +4% damage, max 24%. Fades."
            ],
            [
              "[[anomalies/storm-front|Storm Front]]",
              "Epic",
              "Engine",
              "Kills add fire rate, max +30%. Fades idle."
            ],
            [
              "[[anomalies/backdraft|Backdraft]]",
              "Rare",
              "Engine",
              "3 kills in 4 s: last one explodes, 1 per 4 s."
            ],
            [
              "[[anomalies/umbra|Umbra]]",
              "Common",
              "Engine",
              "First 3 kills of each wave: +35% damage 13 s."
            ],
            [
              "[[anomalies/reaper|Reaper]]",
              "Epic",
              "Engine",
              "5 kills, no 8 s gap: next hit deals x3.5."
            ],
            [
              "[[anomalies/burning-ground|Burning Ground]]",
              "Rare",
              "Engine",
              "Kills leave 3 s flame patches, max 2 at once."
            ],
            [
              "[[anomalies/loaded-dice|Loaded Dice]]",
              "Common",
              "Engine",
              "On kill, 30%: next hit +120%. +1 free reroll."
            ],
            [
              "[[anomalies/bounty-hunter|Bounty Hunter]]",
              "Rare",
              "Engine",
              "Elite kills heal 2% of max HP."
            ],
            [
              "[[anomalies/momentum|Momentum]]",
              "Common",
              "Engine",
              "Each kill +3% fire rate, max 15%. Fades idle."
            ],
            [
              "[[anomalies/hot-streak|Hot Streak]]",
              "Rare",
              "Engine",
              "2 kills in 3 s: +25% rate, +15% speed 5 s."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-motion",
    "category": "anomalies",
    "name": "Motion play style",
    "subtitle": "Anomaly play style, 10 cards",
    "summary": "The Motion play style groups 10 anomaly cards about running, jumping and landing.",
    "infobox": [
      {
        "label": "Cards",
        "value": "10"
      },
      {
        "label": "Theme",
        "value": "Running, jumping and landing"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Motion cards turn running, jumping and landing into attacks: rings in the air, shockwaves on landing and a x2 next hit after touching the ground.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/drop-kick|Drop Kick]]",
              "Common",
              "Engine",
              "Land: melee does +22% damage for 6 s."
            ],
            [
              "[[anomalies/static-charge|Static Charge]]",
              "Common",
              "Engine",
              "Run charge, max 3: a hit shocks 1 foe each."
            ],
            [
              "[[anomalies/wet-suit|Wet Suit]]",
              "Common",
              "Starter",
              "When you land, max every 3 s: slow near foes."
            ],
            [
              "[[anomalies/cinder-trail|Cinder Trail]]",
              "Common",
              "Engine",
              "Running leaves burning embers behind you."
            ],
            [
              "[[anomalies/landing-shot|Landing Shot]]",
              "Common",
              "Engine",
              "Landing: next hit x2, max every 2.5 s."
            ],
            [
              "[[anomalies/triple-jump|Triple Jump]]",
              "Rare",
              "Stat",
              "One more jump in mid-air: 3 jumps in all."
            ],
            [
              "[[anomalies/reverb|Reverb]]",
              "Common",
              "Engine",
              "Air jump, max every 2 s: ring pushes foes."
            ],
            [
              "[[anomalies/tempo|Tempo]]",
              "Common",
              "Engine",
              "Air jump, max every 4 s: +15% fire rate 3 s."
            ],
            [
              "[[anomalies/bass-drop|Bass Drop]]",
              "Rare",
              "Engine",
              "Land, max every 2.5 s: shockwave pushes foes."
            ],
            [
              "[[anomalies/high-ground|High Ground]]",
              "Common",
              "Stat",
              "+30% damage to foes 2+ tiles below your feet."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-still",
    "category": "anomalies",
    "name": "Still play style",
    "subtitle": "Anomaly play style, 4 cards",
    "summary": "The Still play style groups 4 anomaly cards about standing your ground.",
    "infobox": [
      {
        "label": "Cards",
        "value": "4"
      },
      {
        "label": "Theme",
        "value": "Standing your ground"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Still cards reward standing your ground. They share one stand-still condition, so a stationary build can use several at once.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/still-coil|Still Coil]]",
              "Rare",
              "Engine",
              "Stand still: zap the nearest foe in 6 tiles."
            ],
            [
              "[[anomalies/hush|Hush]]",
              "Common",
              "Engine",
              "Stand still 1 s: next hit x2, max every 3 s."
            ],
            [
              "[[anomalies/subsonic-ring|Subsonic Ring]]",
              "Epic",
              "Engine",
              "Stand still: ring every 1.2 s, through walls."
            ],
            [
              "[[anomalies/rooted|Rooted]]",
              "Common",
              "Engine",
              "No move or shot 3 s: small shield every 4 s."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-comeback",
    "category": "anomalies",
    "name": "Comeback play style",
    "subtitle": "Anomaly play style, 10 cards",
    "summary": "The Comeback play style groups 10 anomaly cards about getting stronger as your health drops or after you are hurt.",
    "infobox": [
      {
        "label": "Cards",
        "value": "10"
      },
      {
        "label": "Theme",
        "value": "Getting stronger as your health drops or after you are hurt"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Comeback cards get stronger when your health drops or after you have been hurt. Several read the same below-half-health state.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/counter-offer|Counter Offer]]",
              "Common",
              "Engine",
              "When hurt: your next melee hit deals x2.5."
            ],
            [
              "[[anomalies/spite|Spite]]",
              "Rare, cursed",
              "Engine",
              "Hurt: shock ring but take 15% more damage."
            ],
            [
              "[[anomalies/second-wind|Second Wind]]",
              "Rare",
              "Engine",
              "Once a wave, when hit below 25% HP: heal 20%."
            ],
            [
              "[[anomalies/lifeline|Lifeline]]",
              "Epic",
              "Stat",
              "Below half HP: take 20% less, heal 1.15 HP/s."
            ],
            [
              "[[anomalies/last-rush|Last Rush]]",
              "Common",
              "Engine",
              "Below half HP: a kill gives +20% damage 20 s."
            ],
            [
              "[[anomalies/grudge|Grudge]]",
              "Common",
              "Engine",
              "When hurt: +25% damage for 4 s."
            ],
            [
              "[[anomalies/harden|Harden]]",
              "Common",
              "Engine",
              "When hurt: take 25% less damage for 3 s."
            ],
            [
              "[[anomalies/glass-jaw|Glass Jaw]]",
              "Rare, cursed",
              "Stat",
              "+50% damage but -22% max HP."
            ],
            [
              "[[anomalies/last-stand|Last Stand]]",
              "Rare",
              "Stat",
              "Below half HP: +30% damage, take 20% less."
            ],
            [
              "[[anomalies/overtime|Overtime]]",
              "Rare",
              "Stat",
              "Up to +70% gun fire rate as your HP drops."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-survive",
    "category": "anomalies",
    "name": "Survive play style",
    "subtitle": "Anomaly play style, 11 cards",
    "summary": "The Survive play style groups 11 anomaly cards about shields, healing and staying unhurt.",
    "infobox": [
      {
        "label": "Cards",
        "value": "11"
      },
      {
        "label": "Theme",
        "value": "Shields, healing and staying unhurt"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Survive cards give shields, healing and protection while unhurt. They add up under the game's healing and shield caps.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/hard-hat|Hard Hat]]",
              "Common",
              "Stat",
              "Holding melee: take 25% less damage."
            ],
            [
              "[[anomalies/staff-lunch|Staff Lunch]]",
              "Rare",
              "Engine",
              "Melee kills heal 3 HP, max every 4 s."
            ],
            [
              "[[anomalies/swatter|Swatter]]",
              "Rare",
              "Stat",
              "Your swings swat away foe shots in front."
            ],
            [
              "[[anomalies/hungry-maw|Hungry Maw]]",
              "Rare, cursed",
              "Stat",
              "Heal 1.9 HP a second but take 30% more."
            ],
            [
              "[[anomalies/stone-skin|Stone Skin]]",
              "Rare, cursed",
              "Stat",
              "Take 60% less damage but move 30% slower."
            ],
            [
              "[[anomalies/deep-breath|Deep Breath]]",
              "Common",
              "Engine",
              "Unhit for 8 s: heal 1 HP every second."
            ],
            [
              "[[anomalies/bubble-shield|Bubble Shield]]",
              "Rare",
              "Engine",
              "Every wave starts with a 12% HP shield."
            ],
            [
              "[[anomalies/shadow-step|Shadow Step]]",
              "Common",
              "Engine",
              "Unhurt 1.5 s: next hit +50%, max every 1.5 s."
            ],
            [
              "[[anomalies/vampire|Vampire]]",
              "Rare",
              "Stat",
              "Heal 4 HP for every kill."
            ],
            [
              "[[anomalies/adrenaline|Adrenaline]]",
              "Rare",
              "Stat",
              "Heal 0.8 HP every second."
            ],
            [
              "[[anomalies/holy-almond-water|Holy Almond Water]]",
              "Rare",
              "Stat",
              "Every [[items/almond-water|almond water]] also heals 4 HP."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-close",
    "category": "anomalies",
    "name": "Close play style",
    "subtitle": "Anomaly play style, 9 cards",
    "summary": "The Close play style groups 9 anomaly cards about fighting up close with melee, shotguns and knockback.",
    "infobox": [
      {
        "label": "Cards",
        "value": "9"
      },
      {
        "label": "Theme",
        "value": "Fighting up close with melee, shotguns and knockback"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Close cards reward fighting up close: melee, shotguns, knockback and crowds of foes around you.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/chain-letter|Chain Letter]]",
              "Epic",
              "Engine",
              "Every 3rd swing chains 120% to 2 near foes."
            ],
            [
              "[[anomalies/wind-up|Wind Up]]",
              "Epic",
              "Engine",
              "Hold attack 1 s: release for x2 damage."
            ],
            [
              "[[anomalies/two-faced|Two Faced]]",
              "Rare, cursed",
              "Stat",
              "Melee +50% damage but guns -40% damage."
            ],
            [
              "[[anomalies/buckshot|Buckshot]]",
              "Common",
              "Stat",
              "+2 pellets on shotguns."
            ],
            [
              "[[anomalies/heavy-hitter|Heavy Hitter]]",
              "Common",
              "Starter",
              "+50% push. 4th hit stuns 0.5 s, 1.5 s gap."
            ],
            [
              "[[anomalies/wrong-size|Wrong Size]]",
              "Common",
              "Stat",
              "+30% melee reach and knockback."
            ],
            [
              "[[anomalies/mosh-pit|Mosh Pit]]",
              "Common",
              "Stat",
              "With 2+ foes within 5 tiles: +25% damage."
            ],
            [
              "[[anomalies/point-blank|Point Blank]]",
              "Common",
              "Stat",
              "+20% damage to foes within 2.5 tiles."
            ],
            [
              "[[anomalies/close-aura|Close Aura]]",
              "Common",
              "Engine",
              "Foes within 1.8 tiles get hit every 0.8 s."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-far",
    "category": "anomalies",
    "name": "Far play style",
    "subtitle": "Anomaly play style, 5 cards",
    "summary": "The Far play style groups 5 anomaly cards about fighting at range or alone.",
    "infobox": [
      {
        "label": "Cards",
        "value": "5"
      },
      {
        "label": "Theme",
        "value": "Fighting at range or alone"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Far cards reward range, flanking or fighting alone: long shots, piercing and lone-wolf bonuses.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/distance-learning|Distance Learning]]",
              "Common",
              "Stat",
              "Melee hits on foes 2+ tiles away do +30%."
            ],
            [
              "[[anomalies/piercing-rounds|Piercing Rounds]]",
              "Rare",
              "Stat",
              "Bullets pass through 1 more foe."
            ],
            [
              "[[anomalies/stalker|Stalker]]",
              "Rare",
              "Stat",
              "Fleeing or knocked-back foes take x2 damage."
            ],
            [
              "[[anomalies/lone-wolf|Lone Wolf]]",
              "Common",
              "Stat",
              "No foe within 3 tiles: +20% gun damage."
            ],
            [
              "[[anomalies/long-shot|Long Shot]]",
              "Common",
              "Stat",
              "+20% damage to foes 9+ tiles away."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-walls",
    "category": "anomalies",
    "name": "Walls play style",
    "subtitle": "Anomaly play style, 5 cards",
    "summary": "The Walls play style groups 5 anomaly cards about breaking walls and using cover.",
    "infobox": [
      {
        "label": "Cards",
        "value": "5"
      },
      {
        "label": "Theme",
        "value": "Breaking walls and using cover"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Walls cards turn broken walls and cover into damage and protection. Every wall you break feeds the others.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/excavator|Excavator]]",
              "Common",
              "Stat",
              "+100% damage to walls and floors."
            ],
            [
              "[[anomalies/noclip-rounds|Noclip Rounds]]",
              "Rare",
              "Stat",
              "20% of bullets ignore walls."
            ],
            [
              "[[anomalies/bunker|Bunker]]",
              "Common",
              "Stat",
              "Near a wall: take 25% less damage."
            ],
            [
              "[[anomalies/shard-storm|Shard Storm]]",
              "Rare",
              "Engine",
              "Half of broken walls throw a shard at a foe."
            ],
            [
              "[[anomalies/collapse|Collapse]]",
              "Epic",
              "Engine",
              "Walls you break crush near foes, 1.5 s gap."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-blast",
    "category": "anomalies",
    "name": "Blast play style",
    "subtitle": "Anomaly play style, 4 cards",
    "summary": "The Blast play style groups 4 anomaly cards about bigger and safer explosions.",
    "infobox": [
      {
        "label": "Cards",
        "value": "4"
      },
      {
        "label": "Theme",
        "value": "Bigger and safer explosions"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Blast cards make explosions bigger, stronger and safer for you.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/demolition|Demolition]]",
              "Rare",
              "Stat",
              "+20% explosion size."
            ],
            [
              "[[anomalies/high-explosive|High Explosive]]",
              "Rare",
              "Stat",
              "+25% explosion damage."
            ],
            [
              "[[anomalies/cluster-bombs|Cluster Bombs]]",
              "Epic",
              "Stat",
              "Launcher grenades split into 2 mini bombs."
            ],
            [
              "[[anomalies/loyal-barrels|Loyal Barrels]]",
              "Common",
              "Stat",
              "Your blasts never hurt you and deal +10%."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-battery",
    "category": "anomalies",
    "name": "Battery play style",
    "subtitle": "Anomaly play style, 9 cards",
    "summary": "The Battery play style groups 9 anomaly cards about the [[items/flashlight|flashlight]] lamp and energy weapons.",
    "infobox": [
      {
        "label": "Cards",
        "value": "9"
      },
      {
        "label": "Theme",
        "value": "The [[items/flashlight|flashlight]] lamp and energy weapons"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Battery cards support the [[items/flashlight|flashlight]] lamp and energy weapons. They are only offered to builds that carry a lamp or an energy gun.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/coffee-break|Coffee Break]]",
              "Rare",
              "Engine",
              "Every 3rd swing gives 4 energy."
            ],
            [
              "[[anomalies/redline|Redline]]",
              "Epic, cursed",
              "Stat",
              "+55% damage but energy drain +60%."
            ],
            [
              "[[anomalies/static-mouth|Static Mouth]]",
              "Epic, cursed",
              "Engine",
              "Every 3rd shot shocks but energy drain +60%."
            ],
            [
              "[[anomalies/battery-saver|Battery Saver]]",
              "Rare",
              "Stat",
              "Guns and lamp use 30% less energy."
            ],
            [
              "[[anomalies/grounding-rod|Grounding Rod]]",
              "Rare",
              "Engine",
              "Each kill: 3 energy, up to 35% of max a wave."
            ],
            [
              "[[anomalies/floodlight|Floodlight]]",
              "Common",
              "Engine",
              "Energy>25%: zap a foe in 6 tiles every 1.5 s."
            ],
            [
              "[[anomalies/backup-capacitor|Backup Capacitor]]",
              "Common",
              "Stat",
              "+20 max energy, and it drains 10% slower."
            ],
            [
              "[[anomalies/live-wire|Live Wire]]",
              "Rare",
              "Stat",
              "+30% damage with energy-tag guns."
            ],
            [
              "[[anomalies/broken-bulb|Broken Bulb]]",
              "Common",
              "Stat",
              "+20 energy per ceiling light you break."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-support",
    "category": "anomalies",
    "name": "Support play style",
    "subtitle": "Anomaly play style, 6 cards",
    "summary": "The Support play style groups 6 anomaly cards about team play, loot, vision and light.",
    "infobox": [
      {
        "label": "Cards",
        "value": "6"
      },
      {
        "label": "Theme",
        "value": "Team play, loot, vision and light"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Support cards cover team play, loot, vision and light. They are utilities that suit every build.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/fuse-box|Fuse Box]]",
              "Common",
              "Engine",
              "In a lit area: every 2 s next hit +60%."
            ],
            [
              "[[anomalies/magnet|Magnet]]",
              "Common",
              "Engine",
              "+3 tiles pickup radius. Each kill heals 0.3%."
            ],
            [
              "[[anomalies/third-eye|Third Eye]]",
              "Common",
              "Stat",
              "See foes in the dark, and unmask mimics."
            ],
            [
              "[[anomalies/night-shift|Night Shift]]",
              "Common",
              "Stat",
              "+60% damage while you stand in the dark."
            ],
            [
              "[[anomalies/huddle|Huddle]]",
              "Common",
              "Stat",
              "Ally within 6 tiles: take 20% less damage."
            ],
            [
              "[[anomalies/haggler|Haggler]]",
              "Common",
              "Stat",
              "[[items/vending-machine|Vending machines]] cost 15% less."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  },
  {
    "slug": "play-style-any",
    "category": "anomalies",
    "name": "Any play style",
    "subtitle": "Anomaly play style, 10 cards",
    "summary": "The Any play style groups 10 anomaly cards about plain numbers that fit every build.",
    "infobox": [
      {
        "label": "Cards",
        "value": "10"
      },
      {
        "label": "Theme",
        "value": "Plain numbers that fit every build"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Any cards are plain numbers such as +25% damage, +20% fire rate or +25 max HP. They fit every build and are a safe pick when nothing else lines up.",
          "See [[anomalies/anomalies-overview|Anomalies]] for how play styles and status keywords work."
        ]
      },
      {
        "heading": "Cards",
        "table": {
          "columns": [
            "Card",
            "Rarity",
            "Role",
            "Effect"
          ],
          "rows": [
            [
              "[[anomalies/dead-weight|Dead Weight]]",
              "Rare, cursed",
              "Stat",
              "+55% damage but move 30% slower."
            ],
            [
              "[[anomalies/cold-hands|Cold Hands]]",
              "Rare, cursed",
              "Stat",
              "+40% crit but -15% fire rate."
            ],
            [
              "[[anomalies/borrowed-time|Borrowed Time]]",
              "Epic, cursed",
              "Stat",
              "+70% damage, +15% speed but -40% max HP."
            ],
            [
              "[[anomalies/grave-smile|Grave Smile]]",
              "Epic, cursed",
              "Stat",
              "+40% crit, +25% damage but -25% fire rate."
            ],
            [
              "[[anomalies/hollow-points|Hollow Points]]",
              "Common",
              "Stat",
              "+25% damage."
            ],
            [
              "[[anomalies/trigger-happy|Trigger Happy]]",
              "Common",
              "Stat",
              "+20% fire rate."
            ],
            [
              "[[anomalies/lucky|Lucky]]",
              "Rare",
              "Stat",
              "+12% crit chance."
            ],
            [
              "[[anomalies/thick-skin|Thick Skin]]",
              "Common",
              "Stat",
              "Take 20% less damage."
            ],
            [
              "[[anomalies/heart-of-steel|Heart Of Steel]]",
              "Common",
              "Stat",
              "+25 max HP."
            ],
            [
              "[[anomalies/sprinter|Sprinter]]",
              "Common",
              "Stat",
              "+25% move speed."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Play style"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      }
    ]
  }
];
