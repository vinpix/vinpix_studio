import type { WikiArticle } from "../types";

export const perks: WikiArticle[] = [
  {
    "slug": "perks-overview",
    "category": "perks",
    "name": "Perks and Upgrades",
    "subtitle": "Permanent upgrades, boons and trophies",
    "summary": "Besides [[anomalies/anomalies-overview|anomaly cards]], Floor Zero has permanent upgrades bought with [[items/almond-water]] between runs and three kinds of temporary or trophy perks found during a run: boons, elite trophies and boss trophies.",
    "infobox": [
      {
        "label": "Permanent upgrades",
        "value": "11 (85 levels in all)"
      },
      {
        "label": "Boons",
        "value": "10"
      },
      {
        "label": "Elite trophies",
        "value": "7"
      },
      {
        "label": "Boss trophies",
        "value": "6"
      }
    ],
    "sections": [
      {
        "heading": "Run perks and permanent upgrades",
        "paragraphs": [
          "Floor Zero separates what you pick during a run from what you build between runs. The run-time cards are called anomalies: there are 114 of them and they cover cards such as [[anomalies/triple-jump|Triple Jump]], [[anomalies/cluster-bombs|Cluster Bombs]], [[anomalies/piercing-rounds|Piercing Rounds]] and [[anomalies/vampire|Vampire]]. They have their own pages: see [[anomalies/anomalies-overview|Anomalies]].",
          "This section covers everything else: the permanent upgrade tree, the temporary boons from the wave shrine, and the trophies dropped by elites and bosses."
        ]
      },
      {
        "heading": "Permanent upgrades",
        "paragraphs": [
          "[[items/almond-water]] that you collect during runs is banked. Between runs you spend it in the upgrade tree. The tree has 11 nodes and 85 levels in all; buying every level costs 14,490 Almond Water. Each level costs more than the one before it, and each upgrade applies to every future run and every character.",
          "The Lucky Finds upgrade raises the Almond Water you collect, and the [[anomalies/holy-almond-water|Holy Almond Water]] anomaly heals you whenever you pick it up."
        ],
        "table": {
          "columns": [
            "Upgrade",
            "Effect",
            "Max level",
            "Total cost"
          ],
          "rows": [
            [
              "[[perks/vitality|Vitality]]",
              "+8 max HP per level (+12 from level 6, +20 from level 11)",
              "16",
              "4873"
            ],
            [
              "[[perks/plating|Plating]]",
              "Take 1.5% less damage per level (3% from level 6, 4.5% from level 11)",
              "14",
              "3184"
            ],
            [
              "[[perks/marksman|Marksman]]",
              "+2% damage per level (+3.5% from level 6, +5% from level 11)",
              "16",
              "4873"
            ],
            [
              "[[perks/quickdraw|Quickdraw]]",
              "+2% fire rate per level",
              "8",
              "474"
            ],
            [
              "[[perks/workshop|Workshop]]",
              "-4% [[items/workbench|workbench]] prices per level (level-ups, evolve, fuse)",
              "5",
              "357"
            ],
            [
              "[[perks/nest-egg|Nest Egg]]",
              "Start each run with +8 [[items/scrap|scrap]] per level",
              "6",
              "129"
            ],
            [
              "[[perks/field-medic|Field Medic]]",
              "+8% healing and +4% of the wave heal cap per level",
              "4",
              "168"
            ],
            [
              "[[perks/fleet-foot|Fleet Foot]]",
              "+3% movement speed per level",
              "5",
              "77"
            ],
            [
              "[[perks/power-belt|Power Belt]]",
              "+10 battery capacity per level",
              "3",
              "102"
            ],
            [
              "[[perks/grid-tap|Grid Tap]]",
              "+4% battery recharge per level",
              "3",
              "122"
            ],
            [
              "[[perks/lucky-finds|Lucky Finds]]",
              "+8% almond water per level",
              "5",
              "131"
            ]
          ]
        }
      },
      {
        "heading": "Boons",
        "paragraphs": [
          "A shrine can appear between waves and offers three boons. A boon is a strong effect with a catch, such as \"+25% damage but take 15% more damage\", and it lasts for 2 waves. You choose one or skip."
        ],
        "table": {
          "columns": [
            "Boon",
            "Effect"
          ],
          "rows": [
            [
              "[[perks/bloodlust|Bloodlust]]",
              "+25% damage but take 15% more damage."
            ],
            [
              "[[perks/bulwark|Bulwark]]",
              "Take 25% less damage but move 15% slower."
            ],
            [
              "[[perks/sprint-high|Sprint High]]",
              "Air jump: shock ring every 3 s, but -5% dmg."
            ],
            [
              "[[perks/dead-eye|Dead Eye]]",
              "+10% crit, 9+ tile hits +20% but -10% rate."
            ],
            [
              "[[perks/brawler-trance|Brawler Trance]]",
              "Melee +30% damage but guns -25% damage."
            ],
            [
              "[[perks/firebug|Firebug]]",
              "Hits ignite, foes take +6% but you take +10%."
            ],
            [
              "[[perks/second-skin|Second Skin]]",
              "15% HP shield a wave but no regen or packs."
            ],
            [
              "[[perks/long-night|Long Night]]",
              "+15% damage in dark but -10% rate in light."
            ],
            [
              "[[perks/overdrive|Overdrive]]",
              "+20% fire rate but each 12th shot costs 1 HP."
            ],
            [
              "[[perks/feast|Feast]]",
              "Kills heal 1 HP but -15% damage."
            ]
          ]
        }
      },
      {
        "heading": "Elite trophies",
        "paragraphs": [
          "Elites are stronger foes with a glowing prefix. Killing one grants a trophy automatically: a boost that lasts 15 seconds. Each prefix has its own trophy."
        ],
        "table": {
          "columns": [
            "Trophy",
            "Effect"
          ],
          "rows": [
            [
              "[[perks/elite-plate|Plate (elite trophy)]]",
              "For 15 s: take 20% less damage."
            ],
            [
              "[[perks/elite-spark|Spark (elite trophy)]]",
              "For 15 s: next 10 hits shock another foe."
            ],
            [
              "[[perks/elite-swift|Swift (elite trophy)]]",
              "For 15 s: +20% speed, +10% fire rate."
            ],
            [
              "[[perks/elite-split|Split (elite trophy)]]",
              "For 15 s: 30% of hits shock another foe."
            ],
            [
              "[[perks/elite-glow|Glow (elite trophy)]]",
              "For 15 s: up to 6 foes near you take +12%."
            ],
            [
              "[[perks/elite-rally|Rally (elite trophy)]]",
              "For 15 s: +10% fire rate."
            ],
            [
              "[[perks/elite-mend|Mend (elite trophy)]]",
              "For 15 s: heal 1 HP every second."
            ]
          ]
        }
      },
      {
        "heading": "Boss trophies",
        "paragraphs": [
          "After you clear the floor of a boss, its trophy appears as the last card of the floor-clear offer. Taking it gives a lasting bonus for the rest of the run."
        ],
        "table": {
          "columns": [
            "Trophy",
            "Boss",
            "Effect"
          ],
          "rows": [
            [
              "[[perks/trophy-managers-badge|Manager's Badge]]",
              "[[bosses/the-missing-manager]]",
              "+20 max HP, +20% damage to elites."
            ],
            [
              "[[perks/trophy-fork-tines|Fork Tines]]",
              "[[bosses/the-ghost-forklift]]",
              "+8% speed +40% push, run-up hit +50% per 3 s."
            ],
            [
              "[[perks/trophy-pressure-valve|Pressure Valve]]",
              "[[bosses/the-fumes]]",
              "Every 12 s, 2+ foes near: steam burns them."
            ],
            [
              "[[perks/trophy-tide-charm|Tide Charm]]",
              "[[bosses/the-swimmer]]",
              "Your hits slow foes 15% for 2 s, not bosses."
            ],
            [
              "[[perks/trophy-hosts-confetti|Host's Confetti]]",
              "[[bosses/the-emcee]]",
              "Every 8th kill: a confetti blast."
            ],
            [
              "[[perks/trophy-cold-stare|Cold Stare]]",
              "[[bosses/the-smiler]]",
              "+10% crit and energy drains 20% slower."
            ]
          ]
        }
      }
    ],
    "tags": [
      "Overview"
    ],
    "related": [
      {
        "category": "anomalies",
        "slug": "anomalies-overview"
      },
      {
        "category": "mechanics",
        "slug": "death-and-progression"
      },
      {
        "category": "items",
        "slug": "almond-water"
      }
    ]
  },
  {
    "slug": "vitality",
    "category": "perks",
    "name": "Vitality",
    "subtitle": "Permanent upgrade",
    "summary": "Vitality is a permanent upgrade bought with [[items/almond-water]] between runs. +8 max HP per level (+12 from level 6, +20 from level 11).",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+8 max HP per level (+12 from level 6, +20 from level 11)"
      },
      {
        "label": "Max level",
        "value": "16"
      },
      {
        "label": "Cost",
        "value": "4873 [[items/almond-water]] for all 16 levels (first level: 9)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Vitality** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+8 max HP per level (+12 from level 6, +20 from level 11)."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "9",
              "+8 max HP"
            ],
            [
              "2",
              "13",
              "+16 max HP"
            ],
            [
              "3",
              "18",
              "+24 max HP"
            ],
            [
              "4",
              "25",
              "+32 max HP"
            ],
            [
              "5",
              "35",
              "+40 max HP"
            ],
            [
              "6",
              "48",
              "+52 max HP"
            ],
            [
              "7",
              "70",
              "+64 max HP"
            ],
            [
              "8",
              "95",
              "+76 max HP"
            ],
            [
              "9",
              "135",
              "+88 max HP"
            ],
            [
              "10",
              "185",
              "+100 max HP"
            ],
            [
              "11",
              "260",
              "+120 max HP"
            ],
            [
              "12",
              "360",
              "+140 max HP"
            ],
            [
              "13",
              "510",
              "+160 max HP"
            ],
            [
              "14",
              "710",
              "+180 max HP"
            ],
            [
              "15",
              "1000",
              "+200 max HP"
            ],
            [
              "16",
              "1400",
              "+220 max HP"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "The biggest source of permanent survivability; it never stops being useful.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "mechanics",
        "slug": "health-and-healing"
      }
    ]
  },
  {
    "slug": "plating",
    "category": "perks",
    "name": "Plating",
    "subtitle": "Permanent upgrade",
    "summary": "Plating is a permanent upgrade bought with [[items/almond-water]] between runs. Take 1.5% less damage per level (3% from level 6, 4.5% from level 11).",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "Take 1.5% less damage per level (3% from level 6, 4.5% from level 11)"
      },
      {
        "label": "Max level",
        "value": "14"
      },
      {
        "label": "Cost",
        "value": "3184 [[items/almond-water]] for all 14 levels (first level: 10)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Plating** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "Take 1.5% less damage per level (3% from level 6, 4.5% from level 11)."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "10",
              "1.5% less damage taken"
            ],
            [
              "2",
              "14",
              "3% less damage taken"
            ],
            [
              "3",
              "20",
              "4.4% less damage taken"
            ],
            [
              "4",
              "29",
              "5.9% less damage taken"
            ],
            [
              "5",
              "41",
              "7.3% less damage taken"
            ],
            [
              "6",
              "60",
              "10.1% less damage taken"
            ],
            [
              "7",
              "80",
              "12.8% less damage taken"
            ],
            [
              "8",
              "115",
              "15.4% less damage taken"
            ],
            [
              "9",
              "165",
              "17.9% less damage taken"
            ],
            [
              "10",
              "230",
              "20.4% less damage taken"
            ],
            [
              "11",
              "330",
              "24% less damage taken"
            ],
            [
              "12",
              "470",
              "27.4% less damage taken"
            ],
            [
              "13",
              "670",
              "30.6% less damage taken"
            ],
            [
              "14",
              "950",
              "33.8% less damage taken"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stacks multiplicatively with in-run damage reduction cards such as [[anomalies/thick-skin]].",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "marksman",
    "category": "perks",
    "name": "Marksman",
    "subtitle": "Permanent upgrade",
    "summary": "Marksman is a permanent upgrade bought with [[items/almond-water]] between runs. +2% damage per level (+3.5% from level 6, +5% from level 11).",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+2% damage per level (+3.5% from level 6, +5% from level 11)"
      },
      {
        "label": "Max level",
        "value": "16"
      },
      {
        "label": "Cost",
        "value": "4873 [[items/almond-water]] for all 16 levels (first level: 9)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Marksman** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+2% damage per level (+3.5% from level 6, +5% from level 11)."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "9",
              "+2% damage"
            ],
            [
              "2",
              "13",
              "+4% damage"
            ],
            [
              "3",
              "18",
              "+6% damage"
            ],
            [
              "4",
              "25",
              "+8% damage"
            ],
            [
              "5",
              "35",
              "+10% damage"
            ],
            [
              "6",
              "48",
              "+13.5% damage"
            ],
            [
              "7",
              "70",
              "+17% damage"
            ],
            [
              "8",
              "95",
              "+20.5% damage"
            ],
            [
              "9",
              "135",
              "+24% damage"
            ],
            [
              "10",
              "185",
              "+27.5% damage"
            ],
            [
              "11",
              "260",
              "+32.5% damage"
            ],
            [
              "12",
              "360",
              "+37.5% damage"
            ],
            [
              "13",
              "510",
              "+42.5% damage"
            ],
            [
              "14",
              "710",
              "+47.5% damage"
            ],
            [
              "15",
              "1000",
              "+52.5% damage"
            ],
            [
              "16",
              "1400",
              "+57.5% damage"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A damage bonus that applies to every weapon you pick up.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "quickdraw",
    "category": "perks",
    "name": "Quickdraw",
    "subtitle": "Permanent upgrade",
    "summary": "Quickdraw is a permanent upgrade bought with [[items/almond-water]] between runs. +2% fire rate per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+2% fire rate per level"
      },
      {
        "label": "Max level",
        "value": "8"
      },
      {
        "label": "Cost",
        "value": "474 [[items/almond-water]] for all 8 levels (first level: 20)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Quickdraw** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+2% fire rate per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "20",
              "+2% fire rate"
            ],
            [
              "2",
              "26",
              "+4% fire rate"
            ],
            [
              "3",
              "34",
              "+6% fire rate"
            ],
            [
              "4",
              "44",
              "+8% fire rate"
            ],
            [
              "5",
              "55",
              "+10% fire rate"
            ],
            [
              "6",
              "75",
              "+12% fire rate"
            ],
            [
              "7",
              "95",
              "+14% fire rate"
            ],
            [
              "8",
              "125",
              "+16% fire rate"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A fire rate bonus that also speeds up every shot-counting [[anomalies/anomalies-overview|anomaly card]].",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "workshop",
    "category": "perks",
    "name": "Workshop",
    "subtitle": "Permanent upgrade",
    "summary": "Workshop is a permanent upgrade bought with [[items/almond-water]] between runs. -4% [[items/workbench|workbench]] prices per level (level-ups, evolve, fuse).",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "-4% workbench prices per level (level-ups, evolve, fuse)"
      },
      {
        "label": "Max level",
        "value": "5"
      },
      {
        "label": "Cost",
        "value": "357 [[items/almond-water]] for all 5 levels (first level: 32)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Workshop** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "-4% [[items/workbench|workbench]] prices per level (level-ups, evolve, fuse)."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "32",
              "-4% [[items/workbench|workbench]] prices"
            ],
            [
              "2",
              "45",
              "-8% workbench prices"
            ],
            [
              "3",
              "65",
              "-12% workbench prices"
            ],
            [
              "4",
              "90",
              "-16% workbench prices"
            ],
            [
              "5",
              "125",
              "-20% workbench prices"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Cheaper weapon upgrades: level-ups, evolutions and fusions at the [[items/workbench|workbench]] cost less.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "items",
        "slug": "workbench"
      },
      {
        "category": "mechanics",
        "slug": "weapon-levels-and-rarity"
      }
    ]
  },
  {
    "slug": "nest-egg",
    "category": "perks",
    "name": "Nest Egg",
    "subtitle": "Permanent upgrade",
    "summary": "Nest Egg is a permanent upgrade bought with [[items/almond-water]] between runs. Start each run with +8 [[items/scrap|scrap]] per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "Start each run with +8 scrap per level"
      },
      {
        "label": "Max level",
        "value": "6"
      },
      {
        "label": "Cost",
        "value": "129 [[items/almond-water]] for all 6 levels (first level: 7)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Nest Egg** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "Start each run with +8 [[items/scrap|scrap]] per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "7",
              "+8 starting [[items/scrap|scrap]]"
            ],
            [
              "2",
              "10",
              "+16 starting scrap"
            ],
            [
              "3",
              "15",
              "+24 starting scrap"
            ],
            [
              "4",
              "21",
              "+32 starting scrap"
            ],
            [
              "5",
              "31",
              "+40 starting scrap"
            ],
            [
              "6",
              "45",
              "+48 starting scrap"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Extra [[items/scrap|scrap]] at the start of every run, which helps buy a first upgrade or vending item.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "items",
        "slug": "scrap"
      },
      {
        "category": "mechanics",
        "slug": "scrap-economy"
      }
    ]
  },
  {
    "slug": "field-medic",
    "category": "perks",
    "name": "Field Medic",
    "subtitle": "Permanent upgrade",
    "summary": "Field Medic is a permanent upgrade bought with [[items/almond-water]] between runs. +8% healing and +4% of the wave heal cap per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+8% healing and +4% of the wave heal cap per level"
      },
      {
        "label": "Max level",
        "value": "4"
      },
      {
        "label": "Cost",
        "value": "168 [[items/almond-water]] for all 4 levels (first level: 18)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Field Medic** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+8% healing and +4% of the wave heal cap per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "18",
              "+8% healing, +4% wave heal cap"
            ],
            [
              "2",
              "29",
              "+16% healing, +8% wave heal cap"
            ],
            [
              "3",
              "46",
              "+24% healing, +12% wave heal cap"
            ],
            [
              "4",
              "75",
              "+32% healing, +16% wave heal cap"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Makes every heal stronger and raises the amount you can heal per wave, which helps regeneration builds.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "items",
        "slug": "health-pack"
      },
      {
        "category": "mechanics",
        "slug": "health-and-healing"
      }
    ]
  },
  {
    "slug": "fleet-foot",
    "category": "perks",
    "name": "Fleet Foot",
    "subtitle": "Permanent upgrade",
    "summary": "Fleet Foot is a permanent upgrade bought with [[items/almond-water]] between runs. +3% movement speed per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+3% movement speed per level"
      },
      {
        "label": "Max level",
        "value": "5"
      },
      {
        "label": "Cost",
        "value": "77 [[items/almond-water]] for all 5 levels (first level: 7)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Fleet Foot** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+3% movement speed per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "7",
              "+3% movement speed"
            ],
            [
              "2",
              "10",
              "+6% movement speed"
            ],
            [
              "3",
              "14",
              "+9% movement speed"
            ],
            [
              "4",
              "19",
              "+12% movement speed"
            ],
            [
              "5",
              "27",
              "+15% movement speed"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Cheap and useful for all characters, especially kiting builds.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "power-belt",
    "category": "perks",
    "name": "Power Belt",
    "subtitle": "Permanent upgrade",
    "summary": "Power Belt is a permanent upgrade bought with [[items/almond-water]] between runs. +10 battery capacity per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+10 battery capacity per level"
      },
      {
        "label": "Max level",
        "value": "3"
      },
      {
        "label": "Cost",
        "value": "102 [[items/almond-water]] for all 3 levels (first level: 14)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Power Belt** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+10 battery capacity per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "14",
              "+10 battery capacity"
            ],
            [
              "2",
              "32",
              "+20 battery capacity"
            ],
            [
              "3",
              "56",
              "+30 battery capacity"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "More battery for the [[items/flashlight|flashlight]] and for energy weapons.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "items",
        "slug": "battery"
      }
    ]
  },
  {
    "slug": "grid-tap",
    "category": "perks",
    "name": "Grid Tap",
    "subtitle": "Permanent upgrade",
    "summary": "Grid Tap is a permanent upgrade bought with [[items/almond-water]] between runs. +4% battery recharge per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+4% battery recharge per level"
      },
      {
        "label": "Max level",
        "value": "3"
      },
      {
        "label": "Cost",
        "value": "122 [[items/almond-water]] for all 3 levels (first level: 18)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Grid Tap** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+4% battery recharge per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "18",
              "+4% battery recharge"
            ],
            [
              "2",
              "38",
              "+8% battery recharge"
            ],
            [
              "3",
              "66",
              "+12% battery recharge"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Your battery refills faster, so the lamp and energy weapons run out less often.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "items",
        "slug": "battery"
      }
    ]
  },
  {
    "slug": "lucky-finds",
    "category": "perks",
    "name": "Lucky Finds",
    "subtitle": "Permanent upgrade",
    "summary": "Lucky Finds is a permanent upgrade bought with [[items/almond-water]] between runs. +8% almond water per level.",
    "infobox": [
      {
        "label": "Type",
        "value": "Permanent upgrade"
      },
      {
        "label": "Effect",
        "value": "+8% almond water per level"
      },
      {
        "label": "Max level",
        "value": "5"
      },
      {
        "label": "Cost",
        "value": "131 [[items/almond-water]] for all 5 levels (first level: 10)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Lucky Finds** is one of the 11 permanent upgrades in the between-runs upgrade tree. You buy it level by level with banked [[items/almond-water]], and its effects apply to every future run.",
          "+8% almond water per level."
        ]
      },
      {
        "heading": "Levels",
        "paragraphs": [
          "Each level costs more than the one before. The last column shows the total bonus once you own that level."
        ],
        "table": {
          "columns": [
            "Level",
            "Cost (Almond Water)",
            "Total bonus"
          ],
          "rows": [
            [
              "1",
              "10",
              "+8% [[items/almond-water|almond water]]"
            ],
            [
              "2",
              "15",
              "+16% almond water"
            ],
            [
              "3",
              "22",
              "+24% almond water"
            ],
            [
              "4",
              "34",
              "+32% almond water"
            ],
            [
              "5",
              "50",
              "+40% almond water"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Raises the [[items/almond-water]] you collect, which speeds up buying every other upgrade.",
          "Upgrades are permanent: buying them early helps every run, so cheap early levels of several upgrades usually beat finishing one upgrade first."
        ]
      }
    ],
    "tags": [
      "Permanent upgrade"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "items",
        "slug": "almond-water"
      }
    ]
  },
  {
    "slug": "bloodlust",
    "category": "perks",
    "name": "Bloodlust",
    "subtitle": "Boon",
    "summary": "Bloodlust is a boon you can choose at the wave shrine: +25% damage but take 15% more damage. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "+25% damage but take 15% more damage"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Bloodlust** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "+25% damage but take 15% more damage."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A straight damage-for-defence trade. Good when you can kill foes before they reach you.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "bulwark",
    "category": "perks",
    "name": "Bulwark",
    "subtitle": "Boon",
    "summary": "Bulwark is a boon you can choose at the wave shrine: Take 25% less damage but move 15% slower. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "Take 25% less damage but move 15% slower"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Bulwark** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "Take 25% less damage but move 15% slower."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "The mirror of Bloodlust: it makes you sturdier at the cost of mobility, so it favours stand-your-ground builds.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "sprint-high",
    "category": "perks",
    "name": "Sprint High",
    "subtitle": "Boon",
    "summary": "Sprint High is a boon you can choose at the wave shrine: Air jump: shock ring every 3 s, but -5% dmg. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "Air jump: shock ring every 3 s, but -5% dmg"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Sprint High** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "Air jump: shock ring every 3 s, but -5% dmg."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Needs air jumps to work: every 3 seconds one of them releases a shock ring. It suits motion builds.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "dead-eye",
    "category": "perks",
    "name": "Dead Eye",
    "subtitle": "Boon",
    "summary": "Dead Eye is a boon you can choose at the wave shrine: +10% crit, 9+ tile hits +20% but -10% rate. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "+10% crit, 9+ tile hits +20% but -10% rate"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Dead Eye** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "+10% crit, 9+ tile hits +20% but -10% rate."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Rewards long-range fighting: close fights will not benefit from the crit and the long-range bonus.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "brawler-trance",
    "category": "perks",
    "name": "Brawler Trance",
    "subtitle": "Boon",
    "summary": "Brawler Trance is a boon you can choose at the wave shrine: Melee +30% damage but guns -25% damage. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "Melee +30% damage but guns -25% damage"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Brawler Trance** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "Melee +30% damage but guns -25% damage."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Only take it when your main damage comes from melee, because your guns lose a quarter of their damage.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "firebug",
    "category": "perks",
    "name": "Firebug",
    "subtitle": "Boon",
    "summary": "Firebug is a boon you can choose at the wave shrine: Hits ignite, foes take +6% but you take +10%. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "Hits ignite, foes take +6% but you take +10%"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Firebug** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "Hits ignite, foes take +6% but you take +10%."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Everything you hit burns, but burning foes taking more damage is paid for with damage you take.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "second-skin",
    "category": "perks",
    "name": "Second Skin",
    "subtitle": "Boon",
    "summary": "Second Skin is a boon you can choose at the wave shrine: 15% HP shield a wave but no regen or packs. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "15% HP shield a wave but no regen or packs"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Second Skin** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "15% HP shield a wave but no regen or packs."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A fresh shield each wave, in exchange for losing regeneration and [[items/health-pack|health packs]]. Avoid it if you rely on healing.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "long-night",
    "category": "perks",
    "name": "Long Night",
    "subtitle": "Boon",
    "summary": "Long Night is a boon you can choose at the wave shrine: +15% damage in dark but -10% rate in light. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "+15% damage in dark but -10% rate in light"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Long Night** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "+15% damage in dark but -10% rate in light."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Great in dark rooms, poor under bright lights. It pairs with the [[anomalies/night-shift|Night Shift]] anomaly.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "overdrive",
    "category": "perks",
    "name": "Overdrive",
    "subtitle": "Boon",
    "summary": "Overdrive is a boon you can choose at the wave shrine: +20% fire rate but each 12th shot costs 1 HP. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "+20% fire rate but each 12th shot costs 1 HP"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Overdrive** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "+20% fire rate but each 12th shot costs 1 HP."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fast fire at a small health cost on every 12th shot, so it suits builds with a healing source.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "feast",
    "category": "perks",
    "name": "Feast",
    "subtitle": "Boon",
    "summary": "Feast is a boon you can choose at the wave shrine: Kills heal 1 HP but -15% damage. It lasts 2 waves.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boon"
      },
      {
        "label": "Effect",
        "value": "Kills heal 1 HP but -15% damage"
      },
      {
        "label": "Duration",
        "value": "2 waves"
      },
      {
        "label": "Source",
        "value": "Wave shrine"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Feast** is a boon, a temporary power that comes with a catch. Boons are offered at the shrine that arms between waves; you choose one of three and it lasts for 2 waves.",
          "Kills heal 1 HP but -15% damage."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kills heal you for a little, at the cost of damage. It suits builds that kill very quickly.",
          "A boon is temporary, so it does not replace your anomaly choices. See [[perks/perks-overview|Perks and Upgrades]] for how boons differ from [[anomalies/anomalies-overview|anomalies]]."
        ]
      }
    ],
    "tags": [
      "Boon"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-plate",
    "category": "perks",
    "name": "Plate (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Plate is the trophy dropped by Armored elites: For 15 s: take 20% less damage.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: take 20% less damage"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Armored elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Plate** is the trophy you earn by killing an elite with the Armored prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: take 20% less damage."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Defensive: use it while you fight the rest of the wave and let the 20% cut absorb the hits.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-spark",
    "category": "perks",
    "name": "Spark (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Spark is the trophy dropped by Electric elites: For 15 s: next 10 hits shock another foe.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: next 10 hits shock another foe"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Electric elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Spark** is the trophy you earn by killing an elite with the Electric prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: next 10 hits shock another foe."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Your next 10 hits shock another foe, which is a strong opener against a pack.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-swift",
    "category": "perks",
    "name": "Swift (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Swift is the trophy dropped by Fast elites: For 15 s: +20% speed, +10% fire rate.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: +20% speed, +10% fire rate"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Fast elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Swift** is the trophy you earn by killing an elite with the Fast prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: +20% speed, +10% fire rate."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Speed and fire rate for 15 seconds make it ideal for chasing down the rest of a wave.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-split",
    "category": "perks",
    "name": "Split (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Split is the trophy dropped by Splitting elites: For 15 s: 30% of hits shock another foe.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: 30% of hits shock another foe"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Splitting elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Split** is the trophy you earn by killing an elite with the Splitting prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: 30% of hits shock another foe."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Almost one in three hits chains to another foe for 15 seconds, which is excellent against crowds.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-glow",
    "category": "perks",
    "name": "Glow (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Glow is the trophy dropped by Glowing elites: For 15 s: up to 6 foes near you take +12%.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: up to 6 foes near you take +12%"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Glowing elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Glow** is the trophy you earn by killing an elite with the Glowing prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: up to 6 foes near you take +12%."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Up to 6 foes near you take extra damage while it lasts, so stay close to the crowd.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-rally",
    "category": "perks",
    "name": "Rally (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Rally is the trophy dropped by Rallying elites: For 15 s: +10% fire rate.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: +10% fire rate"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Rallying elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Rally** is the trophy you earn by killing an elite with the Rallying prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: +10% fire rate."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A modest fire rate boost that also feeds the shot-counting cards.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "elite-mend",
    "category": "perks",
    "name": "Mend (elite trophy)",
    "subtitle": "Elite trophy",
    "summary": "Mend is the trophy dropped by Mending elites: For 15 s: heal 1 HP every second.",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite trophy"
      },
      {
        "label": "Effect",
        "value": "For 15 s: heal 1 HP every second"
      },
      {
        "label": "Duration",
        "value": "15 s"
      },
      {
        "label": "Source",
        "value": "Killing a Mending elite"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Mend** is the trophy you earn by killing an elite with the Mending prefix. Elites are stronger foes with a glowing prefix, and each prefix pays out its own short boost.",
          "For 15 s: heal 1 HP every second."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Heals 1 HP every second for 15 seconds, so you can recover while fighting.",
          "Elite trophies are temporary and automatic: you do not choose them. Killing an elite quickly lets you use the boost against the foes around it."
        ]
      }
    ],
    "tags": [
      "Elite trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      }
    ]
  },
  {
    "slug": "trophy-managers-badge",
    "category": "perks",
    "name": "Manager's Badge",
    "subtitle": "Boss trophy",
    "summary": "Manager's Badge is the trophy for defeating [[bosses/the-missing-manager|the Missing Manager]]: +20 max HP, +20% damage to elites.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boss trophy"
      },
      {
        "label": "Effect",
        "value": "+20 max HP, +20% damage to elites"
      },
      {
        "label": "Boss",
        "value": "[[bosses/the-missing-manager]]"
      },
      {
        "label": "Source",
        "value": "Floor-clear reward after the boss"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Manager's Badge** is the boss trophy of [[bosses/the-missing-manager|the Missing Manager]]. After you clear that boss's floor, the trophy appears as the last card of the floor-clear reward offer, so you can take it for the rest of the run.",
          "+20 max HP, +20% damage to elites."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A health and elite-damage trophy, strong for runs that meet many elites.",
          "Trophies are always offered after the boss; you still choose among the other cards of the offer, so take the trophy only if it fits your build."
        ]
      }
    ],
    "tags": [
      "Boss trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "bosses",
        "slug": "the-missing-manager"
      }
    ]
  },
  {
    "slug": "trophy-fork-tines",
    "category": "perks",
    "name": "Fork Tines",
    "subtitle": "Boss trophy",
    "summary": "Fork Tines is the trophy for defeating [[bosses/the-ghost-forklift|the Ghost Forklift]]: +8% speed +40% push, run-up hit +50% per 3 s.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boss trophy"
      },
      {
        "label": "Effect",
        "value": "+8% speed +40% push, run-up hit +50% per 3 s"
      },
      {
        "label": "Boss",
        "value": "[[bosses/the-ghost-forklift]]"
      },
      {
        "label": "Source",
        "value": "Floor-clear reward after the boss"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Fork Tines** is the boss trophy of [[bosses/the-ghost-forklift|the Ghost Forklift]]. After you clear that boss's floor, the trophy appears as the last card of the floor-clear reward offer, so you can take it for the rest of the run.",
          "+8% speed +40% push, run-up hit +50% per 3 s."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Push and speed for run-up fighters: build speed and then hit.",
          "Trophies are always offered after the boss; you still choose among the other cards of the offer, so take the trophy only if it fits your build."
        ]
      }
    ],
    "tags": [
      "Boss trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "bosses",
        "slug": "the-ghost-forklift"
      }
    ]
  },
  {
    "slug": "trophy-pressure-valve",
    "category": "perks",
    "name": "Pressure Valve",
    "subtitle": "Boss trophy",
    "summary": "Pressure Valve is the trophy for defeating [[bosses/the-fumes|the Fumes]]: Every 12 s, 2+ foes near: steam burns them.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boss trophy"
      },
      {
        "label": "Effect",
        "value": "Every 12 s, 2+ foes near: steam burns them"
      },
      {
        "label": "Boss",
        "value": "[[bosses/the-fumes]]"
      },
      {
        "label": "Source",
        "value": "Floor-clear reward after the boss"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Pressure Valve** is the boss trophy of [[bosses/the-fumes|the Fumes]]. After you clear that boss's floor, the trophy appears as the last card of the floor-clear reward offer, so you can take it for the rest of the run.",
          "Every 12 s, 2+ foes near: steam burns them."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Steam burns groups of foes near you every 12 seconds; it needs a crowd around you to work.",
          "Trophies are always offered after the boss; you still choose among the other cards of the offer, so take the trophy only if it fits your build."
        ]
      }
    ],
    "tags": [
      "Boss trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "bosses",
        "slug": "the-fumes"
      }
    ]
  },
  {
    "slug": "trophy-tide-charm",
    "category": "perks",
    "name": "Tide Charm",
    "subtitle": "Boss trophy",
    "summary": "Tide Charm is the trophy for defeating [[bosses/the-swimmer|the Swimmer]]: Your hits slow foes 15% for 2 s, not bosses.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boss trophy"
      },
      {
        "label": "Effect",
        "value": "Your hits slow foes 15% for 2 s, not bosses"
      },
      {
        "label": "Boss",
        "value": "[[bosses/the-swimmer]]"
      },
      {
        "label": "Source",
        "value": "Floor-clear reward after the boss"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Tide Charm** is the boss trophy of [[bosses/the-swimmer|the Swimmer]]. After you clear that boss's floor, the trophy appears as the last card of the floor-clear reward offer, so you can take it for the rest of the run.",
          "Your hits slow foes 15% for 2 s, not bosses."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A slow on every hit that does not affect bosses, which feeds slow payoffs such as [[anomalies/cold-snap|Cold Snap]].",
          "Trophies are always offered after the boss; you still choose among the other cards of the offer, so take the trophy only if it fits your build."
        ]
      }
    ],
    "tags": [
      "Boss trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "bosses",
        "slug": "the-swimmer"
      }
    ]
  },
  {
    "slug": "trophy-hosts-confetti",
    "category": "perks",
    "name": "Host's Confetti",
    "subtitle": "Boss trophy",
    "summary": "Host's Confetti is the trophy for defeating [[bosses/the-emcee|the Emcee]]: Every 8th kill: a confetti blast.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boss trophy"
      },
      {
        "label": "Effect",
        "value": "Every 8th kill: a confetti blast"
      },
      {
        "label": "Boss",
        "value": "[[bosses/the-emcee]]"
      },
      {
        "label": "Source",
        "value": "Floor-clear reward after the boss"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Host's Confetti** is the boss trophy of [[bosses/the-emcee|the Emcee]]. After you clear that boss's floor, the trophy appears as the last card of the floor-clear reward offer, so you can take it for the rest of the run.",
          "Every 8th kill: a confetti blast."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A confetti blast every 8th kill, so it rewards a steady stream of kills.",
          "Trophies are always offered after the boss; you still choose among the other cards of the offer, so take the trophy only if it fits your build."
        ]
      }
    ],
    "tags": [
      "Boss trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "bosses",
        "slug": "the-emcee"
      }
    ]
  },
  {
    "slug": "trophy-cold-stare",
    "category": "perks",
    "name": "Cold Stare",
    "subtitle": "Boss trophy",
    "summary": "Cold Stare is the trophy for defeating [[bosses/the-smiler|the Smiler]]: +10% crit and energy drains 20% slower.",
    "infobox": [
      {
        "label": "Type",
        "value": "Boss trophy"
      },
      {
        "label": "Effect",
        "value": "+10% crit and energy drains 20% slower"
      },
      {
        "label": "Boss",
        "value": "[[bosses/the-smiler]]"
      },
      {
        "label": "Source",
        "value": "Floor-clear reward after the boss"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "**Cold Stare** is the boss trophy of [[bosses/the-smiler|the Smiler]]. After you clear that boss's floor, the trophy appears as the last card of the floor-clear reward offer, so you can take it for the rest of the run.",
          "+10% crit and energy drains 20% slower."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Crit and energy savings in one trophy, which makes it good for energy weapon builds.",
          "Trophies are always offered after the boss; you still choose among the other cards of the offer, so take the trophy only if it fits your build."
        ]
      }
    ],
    "tags": [
      "Boss trophy"
    ],
    "related": [
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "bosses",
        "slug": "the-smiler"
      }
    ]
  }
];
