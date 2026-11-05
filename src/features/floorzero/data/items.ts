import type { WikiArticle, WikiImage } from "../types";

const pic = (file: string, alt: string, caption?: string): WikiImage => ({
  src: `/fz/wiki/items/${file}`,
  alt,
  caption,
});

export const items: WikiArticle[] = [
  // ───────────────────────────── Currencies and pickups ─────────────────────────────
  {
    slug: "scrap",
    category: "items",
    name: "Scrap",
    subtitle: "Run currency",
    summary:
      "The currency of a single run. Enemies, broken tiles and props drop scrap, and you spend it at the workbench, the vending machine and in [[mechanics/fortify-and-building|build mode]].",
    infobox: [
      { label: "Type", value: "Currency (per run)" },
      { label: "Source", value: "Enemy kills, broken tiles, props, objectives, balloons, gifts" },
      { label: "Used for", value: "Weapon upgrades, vending machine, building" },
    ],
    sections: [
      {
        heading: "Earning scrap",
        bullets: [
          "Enemies: every kill drops scrap in one or more small piles. Elites pay 1.5x, and kills in water during a Flood event pay another 1.5x.",
          "Tiles: broken walls and floors sometimes drop a piece. Metal and vent tiles 12% (2 scrap), wood 8%, concrete and brick 4%, glass 3%, everything else 2%. At most six pieces drop per half second, and tiles you built yourself never pay. On [[levels/habitable-zone|Warehouse]] floors wood pays triple.",
          "Props: crates (1-2), filing cabinets, server racks and pallet racks (1-3), computers, vending machines in [[mechanics/classic-mode|Classic mode]] and weapon crates all drop scrap when they break.",
          "Objectives: the Supply Drop crate pays 20, Hold the Source 30, [[enemies/hunter|the Hunter]] 20 and Noclip Shortcut 30.",
          "[[levels/party-room|Party Room]]: yellow COIN balloons drop 5 scrap and harmless gifts 12.",
          "Salvage: picking up a spare copy of a weapon you cannot upgrade converts it to 30 scrap.",
        ],
      },
      {
        heading: "Spending scrap",
        bullets: [
          "[[items/workbench|Workbench]]: weapon level-ups (50), Master (220 and a key), evolve (120), fuse (40), battery packs (10).",
          "[[items/vending-machine|Vending machine]]: health, energy, weapon picks, [[anomalies/anomalies-overview|anomalies]] and more.",
          "[[items/build-pieces|Build mode]]: devices, doors, spikes, ladders and lights.",
        ],
      },
      {
        heading: "Modifiers",
        paragraphs: [
          "Scrap amounts are multiplied by your scrap bonuses (characters, perks, the +50% Scrap door reward and a small bonus per Ascension tier). Fractions are remembered, so a +10% bonus really is +10% over many pickups. In [[mechanics/co-op-multiplayer|co-op]], the chance of kill drops is divided as the lobby grows, so the team's total scrap does not multiply with the number of players. Scrap resets when the run ends: see [[mechanics/scrap-economy|Scrap economy]].",
        ],
      },
    ],
    tags: ["Currency"],
    related: [{ category: "mechanics", slug: "scrap-economy" }, { category: "items", slug: "workbench" }, { category: "mechanics", slug: "getting-started" }],
  },
  {
    slug: "almond-water",
    category: "items",
    name: "Almond Water",
    subtitle: "Meta currency",
    summary:
      "Bottles of almond water are the Backrooms' lasting currency. What you collect during a run is banked when it ends and spent on permanent upgrades.",
    infobox: [
      { label: "Type", value: "Currency (permanent)" },
      { label: "Source", value: "Bottles on the floor, kills, cleared waves, bosses, winning" },
      { label: "Used for", value: "Permanent upgrades between runs" },
    ],
    sections: [
      {
        heading: "Bottles",
        paragraphs: [
          "Almond water bottles lie on the floor (4-8 per Waves floor, more in the dead-end corners of Classic levels) and drop from enemies (about one kill in ten; [[enemies/brute|Brutes]] always drop two), crates, water coolers (30% chance) and vending machines in [[mechanics/classic-mode|Classic mode]]. The big glass almond tank on each Waves floor is decoration, except during the Hold the Source event.",
        ],
      },
      {
        heading: "Banking",
        paragraphs: [
          "In [[mechanics/waves-mode|Waves mode]] almond is paid by progress as well as by pickups: each cleared regular wave pays 3 plus the floor number, each cleared floor boss 14 plus 8 per floor, and a run that lasts at least 150 seconds pays 12 for taking part. Winning adds a bonus of 150. Bottles count up to 10 plus 5 per floor on each floor, and a run's total is capped at 80 plus 140 per floor reached (the win bonus ignores the cap). Your first five Waves runs earn 1.5 times as much, and [[perks/lucky-finds]] and Ascension tiers raise it further (at most 1.8x from the almond bonus). [[mechanics/classic-mode|Classic mode]] caps a run at 60 plus 40 per level completed.",
          "The bank survives death. Spend it in the Loadout screen: see [[mechanics/death-and-progression|Death and progression]].",
        ],
      },
    ],
    tags: ["Currency"],
    related: [{ category: "mechanics", slug: "death-and-progression" }, { category: "perks", slug: "perks-overview" }],
  },
  {
    slug: "master-key",
    category: "items",
    name: "Master Key",
    subtitle: "Rare run item",
    summary:
      "A rare golden key that lets a level-2 weapon be mastered to level 3 at the workbench. It flies to you from anywhere on the floor.",
    infobox: [
      { label: "Type", value: "Keepsake (per run)" },
      { label: "Source", value: "Bosses (floors 1-4), elites, vending machine, sealed doors, stashes" },
      { label: "Used for", value: "Level 3 weapons (Master)" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "A weapon can be raised from level 1 to level 2 with scrap or duplicates, but the last step needs a Master Key plus 220 scrap at the [[items/workbench|workbench]]. The key never expires, is never merged with other items and homes in on you from across the whole level, so it cannot be lost on the floor. You see it on the HUD next to your scrap.",
        ],
      },
      {
        heading: "Sources",
        bullets: [
          "Bosses of floors 1 to 4 each give one to every player (the final boss gives none).",
          "Elite enemies: about 0.8% per kill. Wave-event objectives, sealed doors and stashes can also hold one.",
          "Vending machine: 340 scrap, one per run, from Floor 2 onward.",
          "[[mechanics/classic-mode|Classic mode]]: one every second level (up to five).",
          "The rare sources (elites, objectives, doors, stashes) share a limit of two keys per run.",
        ],
      },
    ],
    tags: ["Keepsake"],
    related: [
      { category: "mechanics", slug: "weapon-levels-and-rarity" },
      { category: "items", slug: "workbench" },
    ],
  },
  {
    slug: "health-pack",
    category: "items",
    name: "Health Pack",
    subtitle: "Pickup",
    summary: "A small red pickup that restores health. Dropped by enemies and crates, and sold at the vending machine.",
    infobox: [
      { label: "Type", value: "Pickup" },
      { label: "Source", value: "Enemy kills (4%), crates, vending machine, floor clears" },
      { label: "Used for", value: "Restore 20-25 HP" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Enemy kills drop a health pack about 4% of the time, more often when you are below 35% health, restoring 20 HP. Crates drop health (or almond water or ammo) half the time they break. The vending machine sells +40 HP for 30 scrap (the price climbs after each purchase), and a floor clear heals a quarter of your maximum health.",
          "Healing is capped per wave: non-regeneration healing counts in full up to 30% of your maximum HP per wave (more with the [[perks/field-medic]] upgrade) and at a quarter of its value beyond that, so you cannot out-heal a wave by looting.",
        ],
      },
    ],
    tags: ["Pickup", "Healing"],
    related: [{ category: "items", slug: "vending-machine" }, { category: "mechanics", slug: "health-and-healing" }, { category: "perks", slug: "field-medic" }],
  },
  {
    slug: "energy-orb",
    category: "items",
    name: "Energy Orb",
    subtitle: "Pickup",
    summary: "A small blue orb dropped by kills that flies to you and recharges the battery.",
    infobox: [
      { label: "Type", value: "Pickup" },
      { label: "Source", value: "Enemy kills" },
      { label: "Used for", value: "Recharge the battery" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Energy orbs are always drawn to you and add their charge to the [[items/battery|battery]]. They are only seen by the player who collects them: pickups are not shared between [[mechanics/co-op-multiplayer|co-op]] players, each player gets their own drops.",
        ],
      },
    ],
    tags: ["Pickup", "Energy"],
    related: [{ category: "items", slug: "battery" }],
  },
  {
    slug: "surge-cell",
    category: "items",
    name: "Surge Cell",
    subtitle: "Pickup",
    summary: "A rare cell that grants an 8-second power-up: faster fire, more damage or damage reduction.",
    infobox: [
      { label: "Type", value: "Pickup (temporary buff)" },
      { label: "Source", value: "Kill drops, ammo crates, vending machine cans" },
      { label: "Used for", value: "8-second Rush, Heavy or Ward state" },
    ],
    sections: [
      {
        heading: "States",
        table: {
          columns: ["Kind", "Effect for 8 seconds"],
          rows: [
            ["Rush", "Your guns fire about 30% faster (fire interval x0.77)"],
            ["Heavy", "Your guns deal 25% more damage"],
            ["Ward", "You take 30% less damage"],
          ],
        },
        paragraphs: [
          "Each cell carries one of the three states at random. Picking up another cell replaces the current state; it does not stack or extend it. The blinking ring around the player warns in the last 1.5 seconds. It is private to the player who picks it up.",
        ],
      },
    ],
    tags: ["Pickup", "Buff"],
    related: [
      { category: "items", slug: "battery" },
    ],
  },
  {
    slug: "weapon-pickup",
    category: "items",
    name: "Weapon Pickup",
    subtitle: "Loot",
    summary: "A weapon lying on the floor with a glow in its rarity colour. Walk up and press the interact button to take it.",
    infobox: [
      { label: "Type", value: "Loot" },
      { label: "Source", value: "Enemy drops, weapon crates, supply crates, objectives, vending machine" },
      { label: "Used for", value: "Pick up or swap a weapon" },
    ],
    sections: [
      {
        heading: "Taking a weapon",
        paragraphs: [
          "Weapons on the ground breathe a coloured glow: white for Common, green Good, blue Rare, purple Epic, orange Legendary and red Anomalous. The prompt reads \"TAKE <NAME>\" and a level mark if it is not level 1. Taking a weapon fills a free slot or swaps it for your active gun, and the weapon you swapped out drops at your feet (without any branch chosen). A weapon on the ground is at most level 2.",
          "Picking up a copy of a weapon you already hold gives it a free level (one free level per floor); later duplicates are salvaged for 30 scrap. Weapons that have evolved are never replaced by a pickup. See [[mechanics/weapon-levels-and-rarity|Weapon levels and rarity]].",
        ],
      },
    ],
    tags: ["Loot"],
    related: [
      { category: "mechanics", slug: "weapon-levels-and-rarity" },
      { category: "items", slug: "weapon-crate" },
    ],
  },

  // ───────────────────────────── Ammo ─────────────────────────────
  {
    slug: "ammo-families",
    category: "items",
    name: "Ammo Families",
    subtitle: "Overview",
    summary:
      "Weapons use one of four ammo families: Light, Shell, Explosive and Battery. In the current game only the Battery family is a real, limited resource.",
    infobox: [
      { label: "Type", value: "Ammo" },
      { label: "Source", value: "Enemy drops, crates, workbench, vending machine" },
    ],
    sections: [
      {
        heading: "The four families",
        table: {
          columns: ["Family", "Used by", "Is it limited?"],
          rows: [
            ["[[items/light-ammo|Light]]", "Many pistols, automatics and precision guns", "No: guns of this family never run dry"],
            ["[[items/shell-ammo|Shell]]", "Shotguns", "No: guns of this family never run dry"],
            ["[[items/explosive-ammo|Explosive]]", "Grenade launchers and other explosives", "No: guns of this family never run dry"],
            ["[[items/battery|Battery]]", "Energy weapons, and your flashlight", "Yes: a shared pool of 100 energy"],
          ],
        },
        paragraphs: [
          "Guns in the first three families still have a magazine and a reload animation, but they draw nothing from a reserve: the HUD shows an infinity sign for them. Only energy weapons spend the shared [[items/battery|battery]]. At zero battery an energy weapon just clicks dry.",
          "Because those three families are no longer a limited resource, the pickups that once refilled them are no longer found: ammo drops from enemies and crates turn into battery cells or Surge Cells, and the workbench sells only battery packs.",
        ],
      },
    ],
    tags: ["Ammo"],
    related: [
      { category: "items", slug: "battery" },
      { category: "mechanics", slug: "flashlight-and-light" },
    ],
  },
  {
    slug: "light-ammo",
    category: "items",
    name: "Light Ammo",
    subtitle: "Ammo family",
    summary: "The family of small-calibre rounds used by pistols and automatic guns. Unlimited for the guns that use it.",
    infobox: [
      { label: "Type", value: "Ammo family" },
      { label: "Source", value: "Not found as a pickup in the current game" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Light-family guns (the starting pistol and many automatic and precision weapons) draw no reserve ammo: they reload from their magazine and never run dry. Older versions of the game dropped 20-round Light boxes and sold 40-round packs for 8 scrap at the workbench; both are gone. See [[items/ammo-families|Ammo families]].",
        ],
      },
    ],
    tags: ["Ammo"],
  },
  {
    slug: "shell-ammo",
    category: "items",
    name: "Shell Ammo",
    subtitle: "Ammo family",
    summary: "The family of shotgun shells. Unlimited for the shotguns that use them.",
    infobox: [
      { label: "Type", value: "Ammo family" },
      { label: "Source", value: "Not found as a pickup in the current game" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Shell guns reload shell by shell from a magazine and never need a reserve. Older versions dropped six-shell boxes and sold six-shell packs for 10 scrap; both are gone. See [[items/ammo-families|Ammo families]].",
        ],
      },
    ],
    tags: ["Ammo"],
  },
  {
    slug: "explosive-ammo",
    category: "items",
    name: "Explosive Ammo",
    subtitle: "Ammo family",
    summary: "Grenades and rockets. Unlimited, but explosive weapons fire slowly and can hurt you.",
    infobox: [
      { label: "Type", value: "Ammo family" },
      { label: "Source", value: "Not found as a pickup in the current game" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Explosive guns - grenade launchers and similar weapons - no longer spend ammo. They are limited instead by a slow rate of fire and by self-damage: standing too close to your own blast hurts, though the blast can also boost you upward. Explosives are strong against walls, so they are the fastest way to break a barrier. See [[items/ammo-families|Ammo families]].",
        ],
      },
    ],
    tags: ["Ammo", "Explosives"],
  },
  {
    slug: "battery",
    category: "items",
    name: "Battery",
    subtitle: "Ammo family and power",
    summary:
      "A single energy pool of 100 that powers your flashlight and every energy weapon. Recharges under light and from cells and drops.",
    infobox: [
      { label: "Type", value: "Ammo family / resource" },
      { label: "Source", value: "Cells on the floor, kills, orbs, workbench, vending machine, light" },
      { label: "Used for", value: "Flashlight and energy weapons" },
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Capacity is 100 energy. The [[perks/power-belt|POWER BELT]] upgrade adds 10 per level.",
          "Your flashlight drains 0.4 energy per second while it is on. Below 20% the beam flickers and dims, and at zero only a faint glow is left.",
          "Energy weapons spend energy for every shot or burst. At zero they do not fire (a dry click).",
          "Standing in light recharges it, up to 6 energy per second in full light, which is why the game wants you to retreat to lit areas. Work lights and generators recharge it even in a blackout, and charge pools on [[levels/lights-out]] and [[levels/generator-room|Generator Room]] floors are blue circles of light that do the same.",
        ],
      },
      {
        heading: "Where to find energy",
        bullets: [
          "Battery cells (25 energy) lie on the floors of darker themes; kills drop a 20-energy cell about 6% of the time and small energy orbs.",
          "On [[levels/lights-out]] floors battery drops are x2.5, on dim [[levels/generator-room|Generator Room]] waves x1.8.",
          "Workbench: a 40-energy pack for 10 scrap.",
          "Vending machine: ENERGY +100 for 24 scrap (3 per floor; it refuses if you are above 90%).",
          "The [[perks/grid-tap|GRID TAP]] upgrade raises the recharge rate by 4% per level.",
        ],
      },
    ],
    tags: ["Ammo", "Energy"],
    related: [
      { category: "mechanics", slug: "flashlight-and-light" },
      { category: "items", slug: "flashlight" },
      { category: "items", slug: "energy-orb" },
      { category: "perks", slug: "power-belt" },
      { category: "perks", slug: "grid-tap" },
    ],
  },

  // ───────────────────────────── Stations ─────────────────────────────
  {
    slug: "workbench",
    category: "items",
    name: "Workbench",
    subtitle: "Station",
    summary:
      "An indestructible steel bench where you spend scrap to upgrade, master, evolve and fuse your weapons and to buy battery packs.",
    image: pic("workbench.png", "A cluttered workbench with tools and a lamp", "The workbench."),
    infobox: [
      { label: "Type", value: "Station" },
      { label: "Source", value: "Beside the spawn on every Waves floor; start room and Safe Rooms in Classic" },
      { label: "Used for", value: "Weapon upgrades, battery packs" },
    ],
    sections: [
      {
        heading: "Where it is",
        paragraphs: [
          "On Waves floors the bench stands three tiles to the right of the spawn, opposite the [[items/vending-machine|vending machine]]. In [[mechanics/classic-mode|Classic mode]] there is one in the [[levels/exit-room|start room]] and one in every [[levels/safe-room|Safe Room]]. It cannot be destroyed or shot. In [[mechanics/waves-mode|Waves mode]] it only works during the Prep, the lulls between waves and after a floor is cleared, not while a wave is running.",
        ],
      },
      {
        heading: "What it does",
        table: {
          columns: ["Action", "Cost", "Notes"],
          rows: [
            ["Level up", "50 scrap", "Level 1 to level 2: damage up by 36% and more"],
            ["Branch", "Free", "A choice of two upgrades once a weapon is at level 2 (a toast reads \"BRANCH READY - USE A WORKBENCH\")"],
            ["Master", "220 scrap and a [[items/master-key|Master Key]]", "Level 2 to level 3 (x1.72 damage) and the weapon's signature"],
            ["Evolve", "120 scrap", "Needs a level-3 weapon and its matching anomaly"],
            ["Fuse", "40 scrap", "Merge two weapons"],
            ["Battery pack", "10 scrap", "+40 energy"],
          ],
        },
        paragraphs: [
          "Each level of the [[perks/workshop]] upgrade makes workbench prices 4% cheaper (up to 50% off). Prices shown are before that discount. See [[mechanics/weapon-levels-and-rarity|Weapon levels and rarity]].",
        ],
      },
    ],
    tags: ["Station"],
    related: [
      { category: "mechanics", slug: "weapon-levels-and-rarity" },
      { category: "items", slug: "master-key" },
      { category: "items", slug: "scrap" },
      { category: "perks", slug: "workshop" },
    ],
  },
  {
    slug: "vending-machine",
    category: "items",
    name: "Vending Machine",
    subtitle: "Station",
    summary:
      "A red vending machine that sells health, energy, weapon picks, [[anomalies/anomalies-overview|anomalies]] and mystery cans for scrap. Each floor's machine has its own mood and a rotating special.",
    image: pic("vending-machine.png", "A red vending machine with coloured cans", "The vending machine."),
    infobox: [
      { label: "Type", value: "Station" },
      { label: "Source", value: "Beside the spawn on every Waves floor; Safe Rooms in Classic" },
      { label: "Used for", value: "Buying supplies with scrap" },
    ],
    sections: [
      {
        heading: "Where it is",
        paragraphs: [
          "On Waves floors the machine stands six tiles to the left of the spawn, next to the [[items/workbench|workbench]], and cannot be destroyed. In [[mechanics/classic-mode|Classic mode]] it stands in a [[levels/safe-room|Safe Room]], and a vending machine found elsewhere can be broken for almond water. In [[mechanics/waves-mode|Waves mode]] it opens during the Prep, the lulls and when a floor is cleared. Each purchase is local to you: in [[mechanics/co-op-multiplayer|co-op]], everyone buys from their own stock.",
        ],
      },
      {
        heading: "The shelf",
        table: {
          columns: ["Good", "Price (base)", "Limit"],
          rows: [
            ["HEALTH", "30 scrap, +40 HP; climbs after each purchase", "4 per floor"],
            ["ENERGY", "24 scrap, +100 battery", "3 per floor; refused above 90%"],
            ["PICK 1 OF 3", "120 scrap, x1.5 for each pick bought in the run: choose one of three level-1 weapons", "1 per floor, 4 per run"],
            ["ANOMALY", "160 scrap, x1.6 each: choose an anomaly", "1 per floor, 4 per run"],
            ["MASTER KEY", "340 scrap", "1 per run, from Floor 2"],
            ["REROLL +1", "30 scrap: a reroll token", "2 per floor, 4 per run; hold up to 6"],
            ["MYSTERY CAN", "45 scrap (rises with floor), x1.3 per can", "3 per floor"],
            ["FEATURE", "Rotating special (below)", "2 per floor, 1 per visit"],
          ],
        },
        paragraphs: [
          "The machine hands out at most two weapons per floor in total across its picks and cans, and its stock restocks for a small fee. Discounts apply for perks such as the [[anomalies/haggler]], and a floor-rotating mood and your visit count change prices a little.",
        ],
      },
      {
        heading: "Mystery can",
        paragraphs: [
          "A gamble. The can can be EMPTY (and the next can is better), contain a SURGE CELL, drop a WEAPON or an EPIC pick at your feet, let you CHOOSE AN ANOMALY, or pay a JACKPOT of scrap plus a Master Key, an epic pick or more scrap.",
        ],
      },
      {
        heading: "Feature slot",
        paragraphs: [
          "One tile changes between visits: a SALE on one of the staples, an EPIC PICK (175 scrap, 1 per run), a DEVICE PICK (130 scrap, 2 per run), FULL SERVICE (70 scrap, restores health and energy, from Floor 2), 3 DICE (three reroll tokens for 70) or a HEX CARD (an anomaly at a reduced price).",
        ],
      },
    ],
    tags: ["Station"],
    related: [
      { category: "items", slug: "scrap" },
      { category: "items", slug: "master-key" },
      { category: "mechanics", slug: "scrap-economy" },
    ],
  },

  // ───────────────────────────── Containers ─────────────────────────────
  {
    slug: "weapon-crate",
    category: "items",
    name: "Weapon Crate",
    subtitle: "Locker",
    summary:
      "A breakable steel locker that drops one random weapon. Waves floors have one; in [[mechanics/classic-mode|Classic mode]] every [[levels/storage-room]] and [[levels/safe-room]] has one.",
    infobox: [
      { label: "Type", value: "Container (60 HP)" },
      { label: "Source", value: "One per Waves floor; Storage Rooms and Safe Rooms in Classic" },
      { label: "Used for", value: "A random weapon (rarity rises with depth)" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Shoot, hit or blow open a weapon crate and a weapon drops with a glint of its rarity colour. The rarity depends on the depth: see the table in [[mechanics/weapon-levels-and-rarity|Weapon levels and rarity]]. In [[mechanics/co-op-multiplayer|co-op]] every player gets a copy of the drop on their own screen. The crate also pays 1-3 scrap.",
        ],
      },
    ],
    tags: ["Container", "Loot"],
    related: [{ category: "items", slug: "weapon-pickup" }, { category: "levels", slug: "storage-room" }, { category: "mechanics", slug: "weapon-levels-and-rarity" }],
  },
  {
    slug: "supply-crate",
    category: "items",
    name: "Supply Crate",
    subtitle: "Event reward",
    summary:
      "The reward of the Supply Drop event: a crate falls from the ceiling and opens when you stand beside it.",
    infobox: [
      { label: "Type", value: "Event crate" },
      { label: "Source", value: "Supply Drop event wave (wave 4)" },
      { label: "Used for", value: "A weapon, scrap and ammo packs" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Four seconds into the wave a crate lands at one of the floor's drop spots, preferably within 30 tiles of a player. Stand within 2.2 tiles for 8 seconds (faster with several players; the progress decays if you walk away) to open it. Every player then gets a weapon of at least Good rarity, 20 scrap and two ammo packs. An unopened crate is recalled 10 seconds after the wave ends. See [[mechanics/event-waves|Event waves]].",
        ],
      },
    ],
    tags: ["Event", "Container"],
    related: [{ category: "mechanics", slug: "event-waves" }],
  },
  {
    slug: "almond-tank",
    category: "items",
    name: "Almond Tank",
    subtitle: "Prop",
    summary:
      "A big glass tank of almond water, one per Waves floor. Decor, until the Hold the Source event makes it the thing to defend.",
    infobox: [
      { label: "Type", value: "Prop (indestructible except during the event)" },
      { label: "Source", value: "One per Waves floor" },
      { label: "Used for", value: "Hold the Source event" },
    ],
    sections: [
      {
        heading: "Hold the Source",
        paragraphs: [
          "When the event rolls, the tank gains health (900 base, +50% per floor, more with more players) and the enemies prefer attacking it. If it survives the wave, everyone is healed to full and receives 30 scrap and 2 almond water. If it breaks, the event fails.",
        ],
      },
    ],
    tags: ["Prop", "Event"],
    related: [{ category: "mechanics", slug: "event-waves" }],
  },

  // ───────────────────────────── Gear ─────────────────────────────
  {
    slug: "flashlight",
    category: "items",
    name: "Flashlight",
    subtitle: "Gear",
    summary:
      "Your built-in lamp: a 9-tile cone of light in the direction you aim, powered by the shared battery.",
    infobox: [
      { label: "Type", value: "Gear" },
      { label: "Source", value: "Always carried" },
      { label: "Used for", value: "Seeing in the dark; exposing [[enemies/hunter|the Hunter]]" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "The beam reaches 9 tiles (before perk and floor modifiers) in a cone of about 58 degrees and points where you aim. It drains 0.4 energy per second from the [[items/battery|battery]]; when the battery is low the beam flickers and then fades. It is essential in [[levels/dark-zone|Dark Zones]] and on [[levels/lights-out|Lights Out]] floors, and it is the only way to expose [[enemies/hunter|the Hunter]] during its event. See [[mechanics/flashlight-and-light|Flashlight and light]].",
        ],
      },
    ],
    tags: ["Gear", "Light"],
    related: [{ category: "mechanics", slug: "flashlight-and-light" }, { category: "enemies", slug: "hunter" }],
  },
  {
    slug: "build-pieces",
    category: "items",
    name: "Build Pieces",
    subtitle: "Fortify devices and parts",
    summary:
      "The sentries, traps, doors and lights you can place for scrap in [[mechanics/fortify-and-building|build mode]]. They stay for the floor.",
    image: { src: "/fz/wiki/mechanics/build-mode.png", alt: "The build palette over a corridor", caption: "The build palette (press B) with the cost of each piece." },
    infobox: [
      { label: "Type", value: "Placeable gear" },
      { label: "Source", value: "Build mode (B key), paid in scrap" },
      { label: "Used for", value: "Defence, healing, light" },
    ],
    sections: [
      {
        heading: "Palette",
        table: {
          columns: ["Piece", "Cost", "What it does"],
          rows: [
            ["Sentry Gun", "30", "Auto rifle that never misses and sees past planks"],
            ["Flame Post", "35", "Short cone of fire; burns for 3 seconds"],
            ["Tesla Coil", "45", "Arcs through walls to 3 zombies; needs power"],
            ["Mortar", "55", "Lobs a shell at the densest crowd"],
            ["Cryo Post", "40", "Chills zombies within 5 tiles; slows 45%"],
            ["Generator", "25", "Powers gadgets within 7 tiles; energy nearby"],
            ["Spotter Post", "30", "Marks 2 zombies: all your guns do +25% to them"],
            ["Medic Post", "25", "Heals 4 HP/s nearby (40 HP each per floor)"],
            ["Buddy Bot", "40", "Follows you and shoots zombies"],
            ["Watch Bot", "45", "Patrols its post and bursts the nearest zombie"],
            ["[[weapons/fire-door]]", "25", "You walk through, zombies must break it"],
            ["Spike Strip", "14", "Bites zombies that walk over it; wears out"],
            ["Rope Ladder", "3", "Climb up or down - zombies climb it too"],
            ["Barrel", "12", "An explosive trap; shoot it when they gather"],
            ["Work Light", "20", "Lights the area and recharges the lamp, even in a blackout"],
          ],
        },
      },
      {
        heading: "Rules",
        bullets: [
          "Placing reach is 6 tiles. Pieces stay until the floor ends or they are destroyed; building cannot be used to farm scrap, as built tiles never drop any.",
          "Caps per floor for the team: 80 pieces (+20 per extra player), 4 work lights, 6 barrels, 8 spike strips; 4/6/8/10 turret-class devices for 1-4 players.",
          "Devices can be upgraded by walking up to them or clicking them in [[mechanics/fortify-and-building|build mode]] (for example \"UPGRADE L2 30\").",
          "Some floor zones are kept clear (ladder feet, the spawn, the shop, enemy spawns, boss pads) and show as a red overlay when you try to build there.",
          "Build mode can be opened at any time during Waves. In the middle of a wave it is a one-shot: after placing one piece the mode closes, and it also closes after 4 seconds of inaction or when you are hit.",
        ],
      },
    ],
    tags: ["Gear", "Build"],
    related: [{ category: "mechanics", slug: "fortify-and-building" }],
  },

  // ───────────────────────────── Props ─────────────────────────────
  {
    slug: "destructible-props",
    category: "items",
    name: "Destructible Props",
    subtitle: "Furniture and fixtures",
    summary:
      "Nearly everything in the Backrooms can be shot, hit or blasted. This table lists the health of the common props and what they drop.",
    infobox: [
      { label: "Type", value: "Props" },
      { label: "Source", value: "Every floor" },
    ],
    sections: [
      {
        heading: "Common props",
        table: {
          columns: ["Prop", "HP", "Drops"],
          rows: [
            ["Fluorescent light", "10", "Nothing; goes dark and sparks"],
            ["Desk", "60", "Debris only"],
            ["Office chair", "25", "Debris only"],
            ["Filing cabinet", "80", "1-3 scrap"],
            ["Crate", "30", "1-2 scrap; half the time almond water, health or a pickup"],
            ["Ammo crate", "30", "1-2 scrap; a battery cell or Surge Cell (and often a second)"],
            ["Water cooler", "25", "30% almond water"],
            ["Computer", "20", "Scrap"],
            ["Server rack", "90", "1-3 scrap"],
            ["Bookshelf", "70", "Debris only"],
            ["Toilet", "45", "Debris only"],
            ["Plant", "15", "Debris only"],
            ["Mannequin", "30", "Debris only"],
            ["Door", "60", "Debris only; blocks like a wall until broken"],
            ["Explosive barrel", "35", "Explodes (see [[items/explosive-barrel|Explosive barrel]])"],
            ["Weapon crate", "60", "A weapon, 1-3 scrap"],
            ["Pallet rack", "90", "1-3 scrap; topples"],
            ["Vending machine (Classic)", "140", "2-3 almond water and maybe a pickup"],
          ],
        },
        paragraphs: [
          "In Waves arenas the vending machine and the workbench are indestructible. Heavy props (desks, cabinets, racks, shelves, vending machines) are heavy: blasts push them less. Fragile props such as coolers, plants and computers take extra damage from explosions. Props that were put back by the floor's repair cycle between waves are hollow and give no loot.",
        ],
      },
    ],
    tags: ["Props"],
    related: [{ category: "mechanics", slug: "destruction-and-collapse" }],
  },
  {
    slug: "explosive-barrel",
    category: "items",
    name: "Explosive Barrel",
    subtitle: "Prop",
    summary: "A red steel barrel that explodes when destroyed. A classic chain-reaction trap.",
    infobox: [
      { label: "Type", value: "Prop (35 HP)" },
      { label: "Source", value: "Storage rooms, corridors, Pipe Dreams; build mode (12 scrap)" },
      { label: "Used for", value: "Area damage" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "A barrel bursts in a blast of radius 3 tiles dealing 90 damage, enough to break walls, wreck groups and set off neighbouring barrels. It also hurts you. [[levels/pipe-dreams]] has the most barrels (4 per floor); [[levels/habitable-zone|Warehouse]] floors 3, [[levels/poolrooms|Poolrooms]] 1, others 2. No barrel is placed within 8 tiles of the spawn. You can place your own in [[mechanics/fortify-and-building|build mode]] (up to 6 per floor).",
        ],
      },
    ],
    tags: ["Prop", "Explosive"],
    related: [
      { category: "levels", slug: "pipe-dreams" },
    ],
  },
  {
    slug: "storage-shelf",
    category: "items",
    name: "Pallet Rack",
    subtitle: "Prop - Warehouse",
    summary: "A tall storage rack that topples when broken and crushes what it falls on.",
    infobox: [
      { label: "Type", value: "Prop (90 HP, 2x4 tiles)" },
      { label: "Source", value: "The Warehouse floors (4-6 per floor)" },
      { label: "Used for", value: "Crush enemies" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "When a rack is destroyed or loses its support it falls to the side it was hit from, or to the open side. Where it slams (a box four tiles wide) it deals 80 damage to zombies and 25 to players and knocks them away. Racks are never placed near the spawn or at a ladder foot. Break one to crush a crowd, or avoid standing beside one while enemies shoot it. They drop 1-3 scrap. See [[levels/habitable-zone|The Warehouse]].",
        ],
      },
    ],
    tags: ["Prop", "Warehouse"],
    related: [
      { category: "levels", slug: "habitable-zone" },
    ],
  },
  {
    slug: "steam-vent",
    category: "items",
    name: "Steam Vent",
    subtitle: "Hazard - Pipe Dreams",
    summary: "A floor grate that blasts scalding steam upward on a six-second rhythm.",
    infobox: [
      { label: "Type", value: "Hazard (indestructible)" },
      { label: "Source", value: "Pipe Dreams floors (4-6 per floor)" },
      { label: "Used for", value: "Hurts anything above it" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Every six seconds the vent bursts for 1.5 seconds. Anything in the column above it (3 tiles, up to the first ceiling) takes damage every quarter second: 6 for players and 10 for zombies, with knockback. Vents are out of the way of the spawn, and each vent bursts at its own phase, so you can learn the rhythm. Lure enemies over them. See [[levels/pipe-dreams|Pipe Dreams]].",
        ],
      },
    ],
    tags: ["Hazard", "Pipe Dreams"],
    related: [
      { category: "levels", slug: "pipe-dreams" },
      { category: "bosses", slug: "the-fumes" },
    ],
  },
  {
    slug: "pressure-valve",
    category: "items",
    name: "Pressure Valve",
    subtitle: "Hazard - Pipe Dreams",
    summary: "A red wheel valve that bursts into a knock-back steam blast when shot enough.",
    infobox: [
      { label: "Type", value: "Prop (30 HP)" },
      { label: "Source", value: "Pipe Dreams floors (3-5 per floor)" },
      { label: "Used for", value: "Area damage and knock-back" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Shoot a valve down to zero and, after a short pop, it releases a steam blast of radius 2.6 tiles: 45 damage and strong knock-back, plus damage to nearby walls. The blast hurts you as well. It sits on the floor at the foot of walls and ledges. See [[levels/pipe-dreams|Pipe Dreams]].",
        ],
      },
    ],
    tags: ["Hazard", "Pipe Dreams"],
    related: [
      { category: "levels", slug: "pipe-dreams" },
      { category: "bosses", slug: "the-fumes" },
    ],
  },
  {
    slug: "party-balloons",
    category: "items",
    name: "Party Balloons",
    subtitle: "Prop - Party Room",
    summary: "Balloons in four colours. Pop one for an effect: bang, splash, coins or a flare.",
    infobox: [
      { label: "Type", value: "Prop (1 HP)" },
      { label: "Source", value: "Party Room floors" },
      { label: "Used for", value: "Blast, slow, scrap or mark" },
    ],
    sections: [
      {
        heading: "Colours",
        table: {
          columns: ["Colour", "Effect"],
          rows: [
            ["Red (BANG)", "10 damage in a 1.6 tile blast"],
            ["Blue (SPLASH)", "Slows enemies 50% for 3 seconds within 3 tiles"],
            ["Yellow (COIN)", "5 scrap"],
            ["Green (FLARE)", "Marks enemies within 4 tiles for 5 seconds"],
          ],
        },
        paragraphs: ["See [[levels/party-room|The Party Room]]."],
      },
    ],
    tags: ["Prop", "Party Room"],
    related: [
      { category: "levels", slug: "party-room" },
      { category: "bosses", slug: "the-emcee" },
    ],
  },
  {
    slug: "gift-box",
    category: "items",
    name: "Gift Box",
    subtitle: "Prop - Party Room",
    summary: "A wrapped box: sometimes a harmless gift, usually a trap that explodes when approached.",
    infobox: [
      { label: "Type", value: "Prop (8 HP)" },
      { label: "Source", value: "Party Room floors (6-8)" },
      { label: "Used for", value: "Loot, or a blast" },
    ],
    sections: [
      {
        heading: "Gift or trap",
        paragraphs: [
          "About one in four boxes is a GIFT: it opens harmlessly for 12 scrap, a battery cell and an ammo pickup. The others are TRAPS: come within 1.6 tiles (or shoot it) and a short fuse lights, then the box explodes in a blast of radius 2.6 tiles for 30 damage (plus 6% per floor of depth). The blast hurts players and enemies alike. You cannot tell the two apart from their look, so shoot from a distance. See [[levels/party-room|The Party Room]].",
        ],
      },
    ],
    tags: ["Prop", "Party Room", "Trap"],
    related: [
      { category: "levels", slug: "party-room" },
      { category: "bosses", slug: "the-emcee" },
    ],
  },
  {
    slug: "generator",
    category: "items",
    name: "Generator",
    subtitle: "Prop - Generator Room",
    summary: "A huge indestructible machine in the heart of the final floor, glowing as a safe island.",
    infobox: [
      { label: "Type", value: "Prop (indestructible, 3x3)" },
      { label: "Source", value: "The Generator Room" },
      { label: "Used for", value: "Light and safety; anchors the boss arena" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "The Generator lights an area of radius 8 even in a blackout, so fights near it can be fought without the flashlight. Four fuse boxes (20 HP, electrical) stand on the walls around it; in water they conduct electric shocks. The boss of the floor, [[bosses/the-hum|the Hum]], is fought on the pad built around the Generator. A separate placeable Generator also exists in [[mechanics/fortify-and-building|build mode]] (see [[items/build-pieces|Build pieces]]). See [[levels/generator-room|The Generator Room]].",
        ],
      },
    ],
    tags: ["Prop", "Generator Room"],
    related: [
      { category: "bosses", slug: "the-hum" },
      { category: "levels", slug: "generator-room" },
    ],
  },
  {
    slug: "server-rack",
    category: "items",
    name: "Server Rack",
    subtitle: "Prop - electrical",
    summary: "A tall humming cabinet that flickers and sparks. Dangerous when it stands in water.",
    infobox: [
      { label: "Type", value: "Prop (90 HP)" },
      { label: "Source", value: "Electrical rooms" },
      { label: "Used for", value: "Scrap; electrical source" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Server racks stand in rows in [[levels/electrical-room|electrical rooms]]. They are heavy (explosions push them less), flicker with light and pay 1-3 scrap when destroyed. Submerged racks spark: 6 damage every 4 seconds within 2.5 tiles, and the shock can spread through the water.",
        ],
      },
    ],
    tags: ["Prop", "Electric"],
    related: [
      { category: "levels", slug: "electrical-room" },
      { category: "mechanics", slug: "water-and-shock" },
    ],
  },
  {
    slug: "water-cooler",
    category: "items",
    name: "Water Cooler",
    subtitle: "Prop",
    summary: "The office water cooler. A staple of corridors and every [[levels/safe-room]].",
    image: pic("water-cooler.png", "An office water cooler with a blue bottle", "A water cooler."),
    infobox: [
      { label: "Type", value: "Prop (25 HP)" },
      { label: "Source", value: "Corridors, start room, Safe Rooms" },
      { label: "Used for", value: "30% chance of almond water when broken" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Water coolers stand in corridors, offices and beside the start and [[levels/safe-room|Safe Rooms]]. They are fragile: the bottle chips on every hit and the body breaks into plastic shards. Breaking one has a 30% chance to release a bottle of [[items/almond-water|almond water]].",
        ],
      },
    ],
    tags: ["Prop"],
  },
  {
    slug: "fluorescent-light",
    category: "items",
    name: "Fluorescent Light",
    subtitle: "Prop - light source",
    summary: "Ceiling tubes that light the Backrooms. They flicker, die, and can be shot out.",
    infobox: [
      { label: "Type", value: "Prop (10 HP)" },
      { label: "Source", value: "Every floor" },
      { label: "Used for", value: "Light; recharges your battery" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Each theme has its own share of steady, flickering, dying and dead tubes (see the theme pages). A tube you break goes dark with a shower of sparks and drops nothing, and nothing puts it back during the floor except the floor's repair cycle between waves. Standing under a working tube recharges the battery, so shooting out lights in a [[levels/lights-out]] floor is rarely a good idea. See [[mechanics/flashlight-and-light|Flashlight and light]].",
        ],
      },
    ],
    tags: ["Prop", "Light"],
    related: [
      { category: "mechanics", slug: "flashlight-and-light" },
    ],
  },
];
