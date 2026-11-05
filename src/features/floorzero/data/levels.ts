import type { WikiArticle, WikiImage } from "../types";

const pic = (file: string, alt: string, caption?: string): WikiImage => ({
  src: `/fz/wiki/levels/${file}`,
  alt,
  caption,
});

export const levels: WikiArticle[] = [
  // ───────────────────────────── Floor themes ─────────────────────────────
  {
    slug: "the-lobby",
    category: "levels",
    name: "The Lobby",
    subtitle: "Floor theme - Level 0",
    summary:
      "The yellow-wallpaper office maze where every run begins. Humming [[items/fluorescent-light|fluorescent tubes]], damp carpet and long corridors make up Floor 1, guarded by [[bosses/the-missing-manager|the Missing Manager]].",
    image: pic("the-lobby.png", "A yellow-wallpaper corridor with a water cooler, workbench, plant and office chair", "The Lobby: wallpaper, carpet, ceiling tiles and fluorescent tubes."),
    infobox: [
      { label: "Depth", value: "Floor 1 (Waves) / Level 0 (Classic)" },
      { label: "Hazards", value: "None beyond the enemies - \"The hum never stops\"" },
      { label: "Loot", value: "Standard: crates, ammo crates, [[items/weapon-crate|weapon crate]], [[items/almond-water|almond water]]" },
      { label: "Boss", value: "[[bosses/the-missing-manager]]" },
      { label: "Look", value: "Wallpaper walls, carpet floors, ceiling-tile ceilings" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Lobby is the first theme of every run and the baseline the other themes are measured against. Its walls are yellow wallpaper (with stained patches), the floors are carpet and the ceilings are drop-ceiling tiles, lit by a mix of steady, flickering, dying and dead [[items/fluorescent-light|fluorescent tubes]]. It is the only floor with no special rule: the floor rule shown on the door card simply reads \"THE HUM NEVER STOPS\".",
          "In [[mechanics/waves-mode|Waves mode]] the Lobby is always Floor 1. In [[mechanics/classic-mode|Classic mode]] it is Level 0, and when the five Classic themes cycle it comes back as the harder sub-levels Level 0.1 \"The Endless Lobby\", \"Humming Halls\", \"Mono-Yellow Maze\" and \"The Old Carpet\".",
        ],
      },
      {
        heading: "Room mix",
        paragraphs: [
          "The Lobby is \"mono-yellow\": ordinary [[levels/offices-and-corridors|corridors and offices]] dominate. In Classic levels the generator caps rooms that are not wallpapered at about a fifth of the level, and keeps [[levels/dark-zone|Dark Zones]], [[levels/electrical-room|electrical rooms]] and [[levels/restrooms|restrooms]] together under about a tenth, so the level always reads as yellow.",
        ],
        bullets: [
          "Most common: corridors (weight 40), offices (14), door mazes (7), flooded carpets (6), libraries (4).",
          "Rare: Red Rooms, Dark Zones, electrical rooms and pool rooms (1-2 each), upside-down rooms (3).",
          "Tubes: about 62% steady, 18% flickering, 5% dying and 15% dead. Red emergency lights appear in about 3% of corridor-like rooms.",
          "Tile durability: wallpaper 14 HP, carpet 22 HP, ceiling tile 10 HP, so the Lobby is easy to dig through.",
        ],
      },
      {
        heading: "In Waves mode",
        paragraphs: [
          "Floor 1 is the gentlest floor: the first [[mechanics/event-waves|wave event]] rolls from a table that excludes [[enemies/hunter|the Hunter]], Flood and Noclip Shortcut events. The floor ends with [[mechanics/wave-structure|wave 7]], the fight against [[bosses/the-missing-manager|the Missing Manager]], after which the team chooses between [[levels/habitable-zone|The Warehouse]] and [[levels/pipe-dreams|Pipe Dreams]] (see [[mechanics/floor-route-and-doors|Floor route and doors]]).",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 1"],
    related: [
      { category: "levels", slug: "level-generation" },
      { category: "mechanics", slug: "floor-route-and-doors" },
      { category: "bosses", slug: "the-missing-manager" },
      { category: "mechanics", slug: "waves-mode" },
    ],
  },
  {
    slug: "habitable-zone",
    category: "levels",
    name: "The Warehouse (Habitable Zone)",
    subtitle: "Floor theme - Level 1",
    summary:
      "Grey concrete storage halls with toppling [[items/storage-shelf|pallet racks]] and piles of wooden crates. Called The Warehouse on the Waves route (Floor 2A) and Habitable Zone in [[mechanics/classic-mode|Classic mode]].",
    image: pic("habitable-zone-map.png", "Map overview of a generated concrete floor", "Map overview of a generated Warehouse floor (debug view: red crosses are enemy spawns)."),
    infobox: [
      { label: "Depth", value: "Floor 2A (Waves) / Level 1 (Classic)" },
      { label: "Hazards", value: "Toppling pallet racks" },
      { label: "Loot", value: "Wood gives triple [[items/scrap|scrap]]; extra crates and ammo crates" },
      { label: "Boss", value: "[[bosses/the-ghost-forklift]]" },
      { label: "Look", value: "Concrete and brick, dimmer lights" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The second theme swaps wallpaper for bare concrete and brick. The door card for this floor reads \"SHELVES TOPPLE. WOOD GIVES MORE SCRAP\". On the Waves route it is door A of the choice after Floor 1; the other door leads to [[levels/pipe-dreams|Pipe Dreams]].",
          "[[mechanics/classic-mode|Classic mode]] calls the same theme the Habitable Zone (Level 1). When the themes cycle it returns as \"The Warehouse\", \"Grey Corridors\", \"Concrete Depths\" and \"The Loading Docks\".",
        ],
      },
      {
        heading: "Hazards and features",
        bullets: [
          "[[items/storage-shelf|Pallet racks]]: 4-6 tall storage shelves (2 tiles wide, 4 tall) stand on each Waves floor. A rack topples when it is broken or loses its support and crushes whatever it lands on. None stands near the spawn.",
          "More wood: low cover walls are wooden most of the time and storage rooms stack wooden crates, so a Warehouse floor has about twice the wood of other themes. Wooden tiles drop three times the usual [[items/scrap|scrap]] here.",
          "[[items/explosive-barrel|Explosive barrels]]: 3 per floor.",
          "Concrete is tougher than wallpaper (30 HP per tile, brick 26 HP), and the lights are dimmer: about 55% steady tubes and 8% red emergency lights.",
        ],
      },
      {
        heading: "Room mix",
        paragraphs: [
          "[[levels/storage-room|Storage rooms]] (weight 14 in Classic) and [[levels/electrical-room|electrical rooms]] (10) are far more common than in the Lobby, alongside the usual corridors (30). [[levels/pillar-hall|Pillar halls]] and storage atria are the favoured tall rooms.",
        ],
      },
      {
        heading: "Events",
        paragraphs: [
          "On this floor the wave-4 event is biased towards Cave-In (x1.5) and Supply Drop (x1.3). See [[mechanics/event-waves|Event waves]].",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 2"],
    related: [
      { category: "items", slug: "storage-shelf" },
      { category: "levels", slug: "storage-room" },
      { category: "mechanics", slug: "event-waves" },
      { category: "bosses", slug: "the-ghost-forklift" },
    ],
  },
  {
    slug: "poolrooms",
    category: "levels",
    name: "The Poolrooms",
    subtitle: "Floor theme - Level 37",
    summary:
      "A bright white-tiled complex where the water level rises and falls with the waves, and electricity spreads through every puddle. Floor 3A on the Waves route.",
    image: pic("poolrooms-map.png", "Map overview of a generated tiled pool floor", "Map overview of a generated Poolrooms floor (debug view)."),
    infobox: [
      { label: "Depth", value: "Floor 3A (Waves) / Level 37 (Classic)" },
      { label: "Hazards", value: "Rising tides, electric shocks through water" },
      { label: "Loot", value: "Wet kills pay extra [[items/scrap|scrap]] during a Flood" },
      { label: "Boss", value: "[[bosses/the-swimmer|The Swimmer Under Tiles]]" },
      { label: "Look", value: "White pool tile everywhere, cyan light" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Everything here is pool tile: floors, walls and ceilings are white, and the light is bright and clean. The door card says \"TIDES RISE. WATER CARRIES SHOCKS\". It is door A after Floor 2 (the other door is the [[levels/party-room|Party Room]]). In [[mechanics/classic-mode|Classic mode]] it is Level 37 and cycles back as \"The Deep End\", \"Chlorine Dreams\", \"Endless Pools\" and \"The Baths\".",
        ],
      },
      {
        heading: "The tide",
        paragraphs: [
          "Each wave has its own water level. The banner under the wave title announces \"THE TIDE IS RISING\" or \"THE TIDE IS FALLING\". Tide height by wave is 1, 2, 3, then back to 1 on wave 4, 2, 3 on waves 5-6 and 2 on the boss wave 7. The water moves one row every two seconds, so there is time to climb.",
          "Floors of this theme are built so that most of the two-row slab under every floor is pool tile: the boss glides inside it. Poolrooms floors never contain the two-storey atrium, and at least two rooms on the lower floors are pool rooms.",
        ],
      },
      {
        heading: "Electric water",
        paragraphs: [
          "Water conducts electricity. When an electric hit lands on something standing in water, the shock spreads to other creatures in the same water within about 6 tiles (up to 8 of them): enemies take 60% of the damage and are stunned for half a second, players only 30% and only from enemy sources. Submerged [[levels/electrical-room|electrical]] props such as [[items/server-rack|server racks]] keep sparking (6 damage every 4 seconds, 2.5 tiles). Fire does not burn anything standing in water.",
        ],
      },
      {
        heading: "Events and enemies",
        bullets: [
          "The Flood event is twice as likely here and Cave-In half as likely (see [[mechanics/event-waves|Event waves]]). During a Flood, enemies killed in water drop 1.5x [[items/scrap|scrap]].",
          "[[enemies/runner|Runners]] and crawlers are a little more common (x1.2 and x1.4); hounds and diggers are rarer.",
          "Decor: deck chairs and lifebuoys by the water's edge, three of each per floor.",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 3", "Water"],
    related: [
      { category: "levels", slug: "pool-room" },
      { category: "levels", slug: "restrooms" },
      { category: "mechanics", slug: "event-waves" },
      { category: "bosses", slug: "the-swimmer" },
      { category: "mechanics", slug: "water-and-shock" },
    ],
  },
  {
    slug: "pipe-dreams",
    category: "levels",
    name: "Pipe Dreams",
    subtitle: "Floor theme - Level 2",
    summary:
      "Dark maintenance tunnels of red brick and metal pipe, lit by red emergency lights. [[items/steam-vent|Steam vents]] burst and [[items/pressure-valve|pressure valves]] explode. Floor 2B on the Waves route.",
    image: pic("pipe-dreams-map.png", "Map overview of a generated brick tunnel floor", "Map overview of a generated Pipe Dreams floor (debug view; the purple box marks the boss's boiler pad)."),
    infobox: [
      { label: "Depth", value: "Floor 2B (Waves) / Level 2 (Classic)" },
      { label: "Hazards", value: "Steam vents, pressure valves, explosive barrels" },
      { label: "Loot", value: "Barrels and electrical rooms; standard crates" },
      { label: "Boss", value: "[[bosses/the-fumes]]" },
      { label: "Look", value: "Brick walls, concrete floor, metal pipes, red lights" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The brick tunnels of Pipe Dreams are the dark, loud counterpart to the Warehouse (door B after Floor 1). The door card reads \"STEAM VENTS BURST. VALVES EXPLODE\". In [[mechanics/classic-mode|Classic mode]] it is Level 2 and cycles back as \"Boiler Rooms\", \"The Steam Tunnels\", \"Rusted Depths\" and \"Maintenance Hell\".",
        ],
      },
      {
        heading: "Hazards",
        bullets: [
          "[[items/steam-vent|Steam vents]]: 4-6 floor grates per floor that burst scalding steam upward on a rhythm. It hurts zombies as well as you.",
          "Pressure valves: 3-5 red valves standing on pipe stubs. Shoot one enough and it bursts in a steam blast about 2.6 tiles wide that knocks everything back, a useful way to clear a crowd.",
          "Barrels: 4 [[items/explosive-barrel|explosive barrels]] per floor, more than any other theme, plus extra barrels in corridors and storage rooms for chain reactions.",
          "Pipes: metal pipe runs hang under many ceilings, and red emergency lights are everywhere (about 45% of corridor-like rooms).",
        ],
      },
      {
        heading: "Room mix and enemies",
        paragraphs: [
          "[[levels/electrical-room|Electrical rooms]] are the signature room (weight 16 in Classic), followed by [[levels/storage-room|storage rooms]] (14) and [[levels/dark-zone|Dark Zones]] (10). [[enemies/hound|Hounds]] are slightly more common (x1.2). The Blackout and [[enemies/hunter|Hunter]] events are favoured here (x1.3 each).",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 2", "Hazards"],
    related: [
      { category: "items", slug: "steam-vent" },
      { category: "items", slug: "pressure-valve" },
      { category: "items", slug: "explosive-barrel" },
      { category: "bosses", slug: "the-fumes" },
    ],
  },
  {
    slug: "lights-out",
    category: "levels",
    name: "Lights Out",
    subtitle: "Floor theme - Level 6",
    summary:
      "Floor 4. Almost no light, a [[items/flashlight|flashlight]] that drains fast and a handful of lit islands to retreat to. [[bosses/the-smiler]] waits in the dark.",
    image: pic("lights-out-map.png", "Map overview of a generated dark floor with islands of light", "Map overview of a generated Lights Out floor (debug view)."),
    infobox: [
      { label: "Depth", value: "Floor 4 (Waves) / Level 6 (Classic)" },
      { label: "Hazards", value: "Near-total darkness, fast battery drain, stalking enemies" },
      { label: "Loot", value: "[[items/battery|Battery cells]]; battery drops x2.5" },
      { label: "Boss", value: "[[bosses/the-smiler]]" },
      { label: "Look", value: "Stained wallpaper and carpet, most tubes dead" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Both doors after Floor 3 lead here: Floor 4 is a single theme with two gift options. The card reads \"NEAR TOTAL DARK. BATTERY DRAINS FAST\". On a Waves floor about three quarters of the tubes are dead (3% steady, 7% flickering, 15% dying, 75% off), so the beam of your [[items/flashlight|flashlight]] is the main light you have. In [[mechanics/classic-mode|Classic mode]] it is Level 6 and cycles back as \"Total Darkness\", \"The Blackout\", \"Where Light Dies\" and \"Night Shift\".",
        ],
      },
      {
        heading: "Rules during the waves",
        table: {
          columns: ["Rule", "Value"],
          rows: [
            ["[[items/flashlight]] battery drain", "x1.6 (x1.3 in the boss wave)"],
            ["Flashlight range", "x1.25"],
            ["Enemies notice you in the light from", "x1.35 farther away"],
            ["Enemies notice you in the dark from", "x0.7 as far"],
            ["Work-light build cost", "x0.6"],
            ["Battery drops from kills", "x2.5"],
          ],
        },
        paragraphs: [
          "Standing in the dark is safer than standing in the light, but the lamp is the only thing that lets you see. Spend the battery carefully: it is shared with energy weapons (see [[items/battery|Battery]] and [[mechanics/flashlight-and-light|Flashlight and light]]).",
        ],
      },
      {
        heading: "Islands of light",
        bullets: [
          "Safe islands: warm lights (radius 5) that always stay on, at the spawn and around the [[items/workbench|workbench]], the [[items/vending-machine|vending machine]] and the [[items/almond-tank|almond tank]].",
          "Charge pools: blue pools of light (radius 3.5), two per floor, that recharge the battery.",
          "Battery cells: six [[items/battery|Battery]] pickups lie on the floor, away from the islands.",
        ],
      },
      {
        heading: "Events and enemies",
        paragraphs: [
          "Blackout and [[enemies/hunter|Hunter]] events are x1.5 more likely and Flood half as likely. [[enemies/smiler|Smilers]] are weighted heavily on this floor and crawlers are slightly more frequent.",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 4", "Darkness"],
    related: [
      { category: "mechanics", slug: "flashlight-and-light" },
      { category: "items", slug: "battery" },
      { category: "levels", slug: "dark-zone" },
      { category: "bosses", slug: "the-smiler" },
      { category: "enemies", slug: "smiler" },
    ],
  },
  {
    slug: "party-room",
    category: "levels",
    name: "The Party Room",
    subtitle: "Floor theme - Level 7",
    summary:
      "A checkerboard birthday nightmare of balloons, [[items/gift-box|gift boxes]] and speaker stacks. Pop the right balloons, and avoid the trapped gifts. Floor 3B on the Waves route.",
    image: pic("party-room.png", "A pink and purple party floor with balloons, a vending machine and gift boxes", "The Party Room: patterned walls, checker floor, balloons and gifts."),
    infobox: [
      { label: "Depth", value: "Floor 3B (Waves only)" },
      { label: "Hazards", value: "Trapped gift boxes, bang balloons" },
      { label: "Loot", value: "Coin balloons (+5 [[items/scrap|scrap]]), harmless gifts" },
      { label: "Boss", value: "[[bosses/the-emcee]]" },
      { label: "Look", value: "Red tile walls, party floor, balloons, disco lights" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Door B after Floor 2 leads to the Party Room: \"POP BALLOONS. TRAPPED GIFTS BLAST\". It only appears on the Waves route. Its floors are a pink-and-cream party tile, its walls red tile, its lights bright (about a quarter flicker, like a disco) and its [[levels/red-room|red rooms]] are turned into dance floors with pulsing pink, cyan and yellow lights.",
        ],
      },
      {
        heading: "Balloons",
        paragraphs: [
          "16-22 balloons hang in clusters of three above the floors, and the game adds 4 more at the start of waves 2, 3, 5 and 6 (6 on the [[mechanics/event-waves|event wave]] 4), at most 12 live at a time. Any damage pops a balloon, and its colour decides what happens:",
        ],
        table: {
          columns: ["Colour", "Name", "Effect"],
          rows: [
            ["Red", "BANG", "A small blast (radius 1.6 tiles, 10 damage)"],
            ["Blue", "SPLASH", "Slows enemies by 50% for 3 seconds (radius 3)"],
            ["Yellow", "COIN", "Drops 5 [[items/scrap|scrap]]"],
            ["Green", "FLARE", "Marks enemies in a 4-tile radius for 5 seconds"],
          ],
        },
      },
      {
        heading: "Gift boxes",
        paragraphs: [
          "6-8 gift boxes sit on the floors. About one in four is a harmless GIFT that opens for 12 [[items/scrap|scrap]] plus a [[items/battery|battery cell]] and an ammo pickup. The rest are TRAPS: walking within 1.6 tiles lights a 0.6-second fuse, and the blast (radius 2.6 tiles, 30 damage, plus 6% per floor depth) hurts everyone, enemies too. Shooting a box lights a shorter fuse, so a trap can be set off from a distance. See [[items/gift-box|Gift box]] and [[items/party-balloons|Party balloons]].",
        ],
      },
      {
        heading: "Room mix and events",
        paragraphs: [
          "The room mix is unique to this theme: dance floors (weight 30), offices (18), pillar halls (16), corridors (14), storage (8), restrooms (6) and electrical rooms (4). There are also six party tables and four speaker stacks per floor. Horde and Noclip Shortcut events are favoured (x1.3) and Flood never happens.",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 3", "Waves only"],
    related: [
      { category: "items", slug: "party-balloons" },
      { category: "items", slug: "gift-box" },
      { category: "levels", slug: "red-room" },
      { category: "bosses", slug: "the-emcee" },
      { category: "enemies", slug: "guest" },
    ],
  },
  {
    slug: "generator-room",
    category: "levels",
    name: "The Generator Room",
    subtitle: "Floor theme - Level 11",
    summary:
      "The final floor, Floor 5. A humming power plant where every earlier rule returns in turn: tides, dimming lights, balloons and shocks. Silence [[bosses/the-hum|the Hum]] to win.",
    image: pic("generator-room-map.png", "Map overview of a generated dark industrial floor", "Map overview of a generated Generator Room floor (debug view)."),
    infobox: [
      { label: "Depth", value: "Floor 5 - final floor (Waves only)" },
      { label: "Hazards", value: "Tides, dimming lights, water shock, steam, trapped gifts" },
      { label: "Loot", value: "[[items/battery|Battery cells]], charge pools" },
      { label: "Boss", value: "[[bosses/the-hum]]" },
      { label: "Look", value: "Metal grating floors, machinery, red emergency lights" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Both doors after Floor 4 lead to the Generator Room, the last floor of a run. The card reads \"ALL RULES AT ONCE. SILENCE THE HUM\". There is no door afterwards: defeating the boss ends the run in victory a few seconds later.",
        ],
      },
      {
        heading: "Rules by wave",
        table: {
          columns: ["Wave", "Rule"],
          rows: [
            ["1", "Normal"],
            ["2", "Tide of 1 row; water carries shocks"],
            ["3", "Lights fade: global light x0.45, battery drain x1.4, [[items/flashlight|flashlight]] range x1.15, battery drops x1.8"],
            ["4", "The [[mechanics/event-waves|event wave]] stands alone (rules suspended)"],
            ["5", "Tide of 2 rows; water carries shocks"],
            ["6", "Combo: lights fade and a tide of 1 row"],
            ["7", "[[bosses/the-hum]], in three phases: sound, darkness (lights fade), geometry"],
          ],
        },
      },
      {
        heading: "Features",
        bullets: [
          "The [[items/generator]]: a big 3x3 machine that cannot be destroyed. It gives off light (radius 8) and acts as a safe island, and the boss arena is built around it.",
          "Fuse boxes: four wall boxes. They count as electric sources if they stand in water.",
          "Also present: [[items/storage-shelf|pallet racks]], [[items/steam-vent|steam vents]], [[items/pressure-valve|pressure valves]], [[items/party-balloons|party balloons]], [[items/gift-box|gift boxes]], speaker stacks, [[items/battery|battery cells]] and three off-grid charge pools.",
          "Floors are metal grating (70 HP per tile), the toughest floors in the game apart from steel.",
          "The room mix favours electrical rooms (weight 30), storage (14), Dark Zones (14) and pool rooms (10).",
        ],
      },
    ],
    tags: ["Floor theme", "Floor 5", "Final floor"],
    related: [
      { category: "items", slug: "generator" },
      { category: "mechanics", slug: "floor-route-and-doors" },
      { category: "levels", slug: "lights-out" },
      { category: "bosses", slug: "the-hum" },
    ],
  },

  // ───────────────────────────── Special rooms ─────────────────────────────
  {
    slug: "red-room",
    category: "levels",
    name: "Red Room",
    subtitle: "Special room",
    summary:
      "A room with red tile walls and floor, lit only by pulsing red emergency lights. Mannequins stand in the corners.",
    image: pic("red-room.png", "A dark red room with red tiles next to a yellow wallpaper room", "A Red Room (right) next to a wallpaper room."),
    infobox: [
      { label: "Depth", value: "Any floor; most common in Pipe Dreams and the Party Room" },
      { label: "Hazards", value: "Poor visibility, ambushes" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Red Rooms use red tile for the floor and walls (18 HP per tile) and a dark red wall background. One to two red emergency lights, and a pulsing red ambient light that fills the room, give them an oppressive glow. Up to two mannequins stand in them. The room you spawn in is never a Red Room.",
          "In the [[levels/party-room|Party Room]] the same room becomes a dance floor, with tubes and pulsing pink, cyan and yellow lights instead of red.",
        ],
      },
      {
        heading: "How common",
        paragraphs: [
          "Red Rooms are rare in the Lobby, Poolrooms and Habitable Zone (weight 2-3) and more common in [[levels/pipe-dreams|Pipe Dreams]] (6), [[levels/lights-out|Lights Out]] (5) and the Party Room (30, as dance floors).",
        ],
      },
    ],
    tags: ["Special room"],
    related: [{ category: "levels", slug: "dark-zone" }],
  },
  {
    slug: "dark-zone",
    category: "levels",
    name: "Dark Zone",
    subtitle: "Special room",
    summary:
      "A room with no working lights at all. Only your [[items/flashlight|flashlight]] shows the way.",
    infobox: [
      { label: "Depth", value: "Any floor; very common in Lights Out" },
      { label: "Hazards", value: "No light, hidden enemies" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "The ceiling tubes in a Dark Zone are dead (zero to two broken fixtures), the background is dark wall and nothing lights the room. Stand in the dark and the screen goes almost black, so your [[items/flashlight|flashlight]] beam is the only thing that can show you what is ahead. There may be a mannequin (about one room in three), puddles and a plant.",
          "Because the flashlight drains the shared [[items/battery|battery]], a Dark Zone is a trade-off between seeing and saving power. See [[mechanics/flashlight-and-light|Flashlight and light]].",
        ],
      },
      {
        heading: "How common",
        paragraphs: [
          "Dark Zones are very common in [[levels/lights-out|Lights Out]] (weight 22), common in [[levels/pipe-dreams|Pipe Dreams]] (10) and the [[levels/generator-room|Generator Room]] (14), and rare in the Lobby (2), where they are capped to keep the level yellow.",
        ],
      },
    ],
    tags: ["Special room", "Darkness"],
    related: [{ category: "levels", slug: "lights-out" }, { category: "mechanics", slug: "flashlight-and-light" }, { category: "items", slug: "flashlight" }],
  },
  {
    slug: "electrical-room",
    category: "levels",
    name: "Electrical Room",
    subtitle: "Special room",
    summary:
      "A concrete room full of humming, spark-throwing [[items/server-rack|server racks]]. Dangerous in water.",
    infobox: [
      { label: "Depth", value: "Any floor; most common in Pipe Dreams and the Generator Room" },
      { label: "Hazards", value: "Sparks, barrels, shocks in water" },
      { label: "Loot", value: "[[items/scrap]] from [[items/server-rack|server racks]] (1-3 each)" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Server racks stand in rows of two to four, 2.9 tiles tall, each group casting a flickering light. Racks are electrical: they spark, and if one is submerged (see [[levels/poolrooms|The Poolrooms]]) it sparks for 6 damage every 4 seconds within 2.5 tiles. Pipe Dreams adds pipe runs and a chance of an [[items/explosive-barrel|explosive barrel]]; the room often has ceiling vents.",
          "A server rack has 90 HP and drops 1-3 [[items/scrap|scrap]] when destroyed. See [[items/server-rack|Server rack]].",
        ],
      },
    ],
    tags: ["Special room", "Electric"],
    related: [{ category: "items", slug: "server-rack" }, { category: "mechanics", slug: "water-and-shock" }],
  },
  {
    slug: "upside-down-room",
    category: "levels",
    name: "Upside-Down Room",
    subtitle: "Special room",
    summary:
      "A room where the furniture hangs from the ceiling and the floor is made of ceiling tiles.",
    infobox: [
      { label: "Depth", value: "Any floor" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "In an Upside-Down Room the materials of the floor and ceiling are swapped, so the floor is made of drop-ceiling tile and the ceiling of carpet. Desks, office chairs, filing cabinets, plants, [[items/water-cooler|water coolers]] and computers hang from the ceiling, while [[items/fluorescent-light|fluorescent tubes]] stand on the floor, some of them flickering. A vent grate sits near the middle.",
          "The room is harmless on its own and uncommon (weight 2-5 depending on the theme), but its oddness reads as a Backrooms landmark.",
        ],
      },
    ],
    tags: ["Special room"],
  },
  {
    slug: "door-maze",
    category: "levels",
    name: "Door Maze",
    subtitle: "Special room - Classic mode",
    summary:
      "A cluster of narrow cells with many door frames, where some cells are sealed and hide secret stashes.",
    infobox: [
      { label: "Depth", value: "Classic mode only" },
      { label: "Hazards", value: "Dead ends" },
      { label: "Loot", value: "Secret stashes in sealed cells" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Door Mazes appear in Classic levels (the wave arenas do not use them). They are built from a row of small cells that share a group, usually in a dead-end side pocket off the main route, with lights over the cells and an occasional mannequin. Up to three cells stay sealed behind wooden walls: those are secret stashes, and breaking in is how you find the loot. See [[levels/level-generation|Level generation]].",
        ],
      },
    ],
    tags: ["Special room", "Classic"],
  },
  {
    slug: "library",
    category: "levels",
    name: "Library",
    subtitle: "Special room",
    summary:
      "A room lined with wooden bookshelves and a mezzanine you reach by a wooden step.",
    infobox: [
      { label: "Depth", value: "Any floor" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Bookshelves (70 HP, wood) stand along the room, filling about three out of four of every other tile. Wide libraries add a one-way mezzanine platform: hop up a wooden step and drop through the platform from above. The room's background is office panelling (or wallpaper in the Lobby), and the floor is carpet. Libraries are tall-room candidates and can span two floors.",
        ],
      },
    ],
    tags: ["Special room"],
  },
  {
    slug: "restrooms",
    category: "levels",
    name: "Restrooms",
    subtitle: "Special room",
    summary:
      "A tiled room of toilet stalls. Metal dividers hang from the ceiling between the toilets.",
    infobox: [
      { label: "Depth", value: "Any floor; most common in Poolrooms" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Restrooms have pool-tile walls and floors and a tile background. A toilet (45 HP) stands every third tile, usually facing the same way, with a metal stall divider hanging from the ceiling between them. Restrooms are one of the three rooms (with Dark Zones and electrical rooms) limited in the Lobby to keep it yellow. They are most common in [[levels/poolrooms|The Poolrooms]] (weight 12).",
        ],
      },
    ],
    tags: ["Special room"],
  },
  {
    slug: "safe-room",
    category: "levels",
    name: "Safe Room",
    subtitle: "Special room - Classic mode",
    summary:
      "A calm green-lit refuge with a [[items/workbench|workbench]], a [[items/vending-machine|vending machine]] and a [[items/weapon-crate|weapon crate]]. [[mechanics/classic-mode|Classic mode]] only.",
    infobox: [
      { label: "Depth", value: "Classic mode only" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "[[items/weapon-crate|Weapon crate]], [[items/vending-machine|vending machine]], [[items/workbench|workbench]], [[items/water-cooler|water cooler]]" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Safe Rooms are carpeted, metal-walled rooms with a steady green light. Inside you find a [[items/workbench|workbench]] in the middle, a [[items/vending-machine|vending machine]] on the left, a [[items/water-cooler|water cooler]] on the right, a plant and a [[items/weapon-crate|weapon crate]] a couple of tiles right of the bench. At least about 40 tiles separate two Safe Rooms. They are the place to spend [[items/scrap|scrap]], upgrade a weapon and catch your breath.",
          "In [[mechanics/waves-mode|Waves mode]] there are no Safe Rooms: the workbench and vending machine stand beside the spawn instead (see [[levels/level-generation|Level generation]]).",
        ],
      },
    ],
    tags: ["Special room", "Classic"],
    related: [
      { category: "items", slug: "workbench" },
      { category: "items", slug: "vending-machine" },
    ],
  },
  {
    slug: "storage-room",
    category: "levels",
    name: "Storage Room",
    subtitle: "Special room",
    summary:
      "A room piled with wooden crates, shelves and barrels. Contains a weapon locker in [[mechanics/classic-mode|Classic mode]].",
    infobox: [
      { label: "Depth", value: "Any floor; very common in the Warehouse and Pipe Dreams" },
      { label: "Hazards", value: "Explosive barrels" },
      { label: "Loot", value: "Crates, ammo crates, [[items/weapon-crate|weapon crate]] (Classic)" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Storage rooms stack wooden crates one or two high (hop over them), add a one-way shelf with a crate step, scatter [[items/destructible-props|crates and ammo crates]] and, in Pipe Dreams and in storage rooms themselves, [[items/explosive-barrel|explosive barrels]]. At least one ammo crate is always present. In [[mechanics/classic-mode|Classic mode]] every Storage room has one [[items/weapon-crate|weapon crate]].",
          "They are the joint most common tall room in the [[levels/habitable-zone|Warehouse]], where wood drops triple [[items/scrap|scrap]], and the most common in [[levels/pipe-dreams|Pipe Dreams]].",
        ],
      },
    ],
    tags: ["Special room"],
    related: [
      { category: "items", slug: "weapon-crate" },
      { category: "items", slug: "explosive-barrel" },
    ],
  },
  {
    slug: "pool-room",
    category: "levels",
    name: "Pool Room",
    subtitle: "Special room",
    summary:
      "A bright tiled room with sunken pools of water. You can swim, but electricity travels.",
    infobox: [
      { label: "Depth", value: "Any floor; dominant in The Poolrooms" },
      { label: "Hazards", value: "Water, electric shock" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Pool Rooms are tiled in white pool tile, lit cyan and dotted with sunken pools three to eight tiles wide. Some pools are overfilled so the water reaches the floor line. The pits are shallow: you can walk in and jump out, or jump across. See [[levels/poolrooms|The Poolrooms]] for the tide and shock rules.",
        ],
      },
    ],
    tags: ["Special room", "Water"],
    related: [
      { category: "mechanics", slug: "water-and-shock" },
    ],
  },
  {
    slug: "flooded-carpet",
    category: "levels",
    name: "Flooded Carpet",
    subtitle: "Special room",
    summary: "A dim carpeted room with water-filled dips in the floor and scattered puddles.",
    infobox: [
      { label: "Depth", value: "Any floor" },
      { label: "Hazards", value: "Water" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Flooded Carpet rooms keep a carpeted floor but break it with two-to-six-tile dips filled with water, and add puddles in between. They are a gentle form of pit: you can walk through them or jump across. They exist in every theme (weight 5-6 in Classic).",
        ],
      },
    ],
    tags: ["Special room", "Water"],
    related: [
      { category: "mechanics", slug: "water-and-shock" },
    ],
  },
  {
    slug: "pillar-hall",
    category: "levels",
    name: "Pillar Hall",
    subtitle: "Special room",
    summary: "A tall two-storey hall with rows of pillars. Often the grandest room of a level.",
    infobox: [
      { label: "Depth", value: "Any floor" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "Standard" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Pillar Halls are atria that span two floors. They only appear as tall rooms (the generator never makes a single-floor one), and are the most common tall room in the Lobby, Lights Out and the Party Room (and tied with storage rooms in the Warehouse). Posts stand along the floor. They are good places to fight: there is room to jump and shoot up and down. In Waves arenas, rows of pillars also appear in some wide rooms.",
        ],
      },
    ],
    tags: ["Special room", "Atrium"],
  },
  {
    slug: "offices-and-corridors",
    category: "levels",
    name: "Offices and Corridors",
    subtitle: "Common rooms",
    summary:
      "The default rooms of the Backrooms: long corridors with [[items/water-cooler|water coolers]] and plants, and offices of cubicle walls and desks.",
    infobox: [
      { label: "Depth", value: "Any floor" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "Crates and [[items/scrap|scrap]] from furniture" },
    ],
    sections: [
      {
        heading: "Corridors",
        paragraphs: [
          "The most common room. Corridors have rows of ceiling tubes, vents and, every few tiles, a [[items/water-cooler|water cooler]], a plant, a puddle, an office chair or a mannequin. Some have a lowered soffit ceiling or a raised step. Every Classic level also contains one \"long hall\": an uninterrupted corridor 40-52 tiles long. Crawl spaces with only two rows of headroom appear on the way.",
        ],
      },
      {
        heading: "Offices",
        paragraphs: [
          "Offices are corridors with wooden cubicle partitions one or two tiles tall (hop over them), desks, office chairs and computers. In the Lobby they use yellow wallpaper with stained patches. All of the furniture is destructible: see [[items/destructible-props|Destructible props]].",
        ],
      },
    ],
    tags: ["Common room"],
    related: [{ category: "items", slug: "destructible-props" }],
  },
  {
    slug: "ladder-shaft",
    category: "levels",
    name: "Ladder Shaft",
    subtitle: "Special room - Classic mode",
    summary: "A tall vertical shaft spanning three to four floors with a ladder connecting them.",
    infobox: [
      { label: "Depth", value: "Classic mode only" },
      { label: "Hazards", value: "Falls" },
      { label: "Loot", value: "None" },
    ],
    sections: [
      {
        heading: "Description",
        paragraphs: [
          "Classic levels are long serpentines in which each floor is walked end to end. A Ladder Shaft is the transition between two walked floors: a three-to-four-floor vertical shaft with a ladder (concrete backdrop, dark wall). Its sections on the floors in between are sealed. See [[levels/level-generation|Level generation]].",
        ],
      },
    ],
    tags: ["Special room", "Classic"],
  },
  {
    slug: "exit-room",
    category: "levels",
    name: "Exit and Start Rooms",
    subtitle: "Special room - Classic mode",
    summary:
      "In [[mechanics/classic-mode|Classic mode]] you start in a room on the top floor at the far left and finish at an elevator door on the bottom floor at the far right.",
    infobox: [
      { label: "Depth", value: "Classic mode only" },
      { label: "Hazards", value: "None" },
      { label: "Loot", value: "[[items/workbench]] in the start room" },
    ],
    sections: [
      {
        heading: "Start room",
        paragraphs: [
          "You begin on the top floor. A [[items/workbench|workbench]], a plant and a [[items/water-cooler|water cooler]] are in the start room, a few tiles from the spawn.",
        ],
      },
      {
        heading: "Exit room",
        paragraphs: [
          "The exit is an elevator door on the bottom floor at the far right, on a metal floor behind a two-tile step: you must make one ledge jump before the door. A green EXIT sign hangs above it. Reaching the door completes the level. The exit and the map border cannot be destroyed, but everything else can, so you can always dig down to the exit (see [[mechanics/destruction-and-collapse|Destruction and collapse]]).",
          "[[mechanics/waves-mode|Waves mode]] has no exit room; a floor ends when you beat wave 7.",
        ],
      },
    ],
    tags: ["Special room", "Classic"],
    related: [{ category: "mechanics", slug: "classic-mode" }, { category: "mechanics", slug: "floor-route-and-doors" }],
  },

  // ───────────────────────────── Overviews ─────────────────────────────
  {
    slug: "level-generation",
    category: "levels",
    name: "Level Generation",
    subtitle: "Overview",
    summary:
      "Every floor is built from a seed: multi-storey layouts joined by ladders, pits to jump, and rooms picked by theme. The two modes build levels in different ways.",
    infobox: [
      { label: "Depth", value: "All floors" },
      { label: "Hazards", value: "Pits, drop holes, barriers" },
    ],
    sections: [
      {
        heading: "Seeds",
        paragraphs: [
          "A level is a pure function of the run's seed and the floor, so in [[mechanics/co-op-multiplayer|co-op]] every player builds the same map. If a generated level fails its own checks the generator retries (up to six times for an arena, three for a Classic level), then falls back to a simple always-valid layout.",
        ],
      },
      {
        heading: "Waves arenas",
        paragraphs: [
          "A Waves floor is an arena built to be fought in, not crossed: 72 tiles wide and four storeys tall, with no exit.",
        ],
        bullets: [
          "Each storey has two to four wide rooms (at least 12 tiles) connected by open arches and doorways.",
          "Every storey has at least three ladders and one or two jumpable drop holes (2-3 tiles wide), so you can always get up and down.",
          "55% of arenas contain a two-storey atrium. 30% have one breakable wall of wood or glass.",
          "Wall vents at both ends of every floor and 2-4 ceiling grates are where enemies enter. At least eight enemy spawn points exist.",
          "The [[items/workbench|workbench]] stands just to the right of the spawn and the [[items/vending-machine|vending machine]] to the left. One [[items/weapon-crate|weapon crate]] stands on another floor and 4-8 bottles of [[items/almond-water|almond water]] are scattered about. Each arena also has an [[items/almond-tank|almond tank]] and six spots where [[items/supply-crate|supply crates]] can drop.",
          "Cover is built in: one-way mezzanines, low walls, ledges and pillars.",
          "Every floor repairs itself between waves - see [[mechanics/destruction-and-collapse|Destruction and collapse]].",
        ],
      },
      {
        heading: "Classic levels",
        paragraphs: [
          "A Classic level is a long serpentine: the top floor runs left to right, the next right to left, and so on, with ladders at the ends. The number of storeys is 4 + half the depth (at most 7), and the width is 140 + 12 per depth (at most 240) tiles.",
        ],
        bullets: [
          "Floors alternate between walked \"legs\" and sealed \"service\" pockets that hold dead ends, secret stashes (loot behind breakable walls) and ladder detours. A pocket links to only one leg, so none can shortcut the route.",
          "Barriers: each leg is crossed by a two-tile wall of concrete or brick. Dig through it (the fire axe takes about two swings, or about 40 pistol shots) or take the detour through a side pocket. The number of barriers per leg grows with depth.",
          "Every leg has a ledge and a pit, so the way always needs jumps; pits are two to four tiles wide and one deep (water in the Poolrooms).",
          "Some rooms are crawl spaces (two rows of headroom), split-level rooms with a two-tile ledge, or atria spanning two storeys. At least 30% of rooms are non-standard.",
          "The level is always completable without digging, and if you do dig you cannot get stuck, because everything but the map border and the exit can be destroyed.",
        ],
      },
      {
        heading: "Room mix by theme",
        paragraphs: ["Relative chance of each room type in a Classic level (higher means more common; Waves arenas leave out the Door Maze, Safe Room and shafts)."],
        table: {
          columns: ["Room", "Lobby", "Habitable", "Poolrooms", "Pipe Dreams", "Lights Out"],
          rows: [
            ["Corridor", "40", "30", "16", "26", "24"],
            ["Office", "14", "6", "2", "3", "8"],
            ["Pool room", "1", "1", "34", "1", "1"],
            ["Red Room", "2", "3", "2", "6", "5"],
            ["Dark Zone", "2", "6", "3", "10", "22"],
            ["Electrical", "2", "10", "2", "16", "4"],
            ["Upside-down", "3", "2", "2", "2", "5"],
            ["Door Maze", "7", "6", "3", "6", "8"],
            ["Storage", "3", "14", "3", "14", "6"],
            ["Restrooms", "2", "4", "12", "3", "3"],
            ["Library", "4", "3", "2", "1", "5"],
            ["Flooded carpet", "6", "5", "6", "6", "5"],
          ],
        },
      },
      {
        heading: "Depth and difficulty",
        paragraphs: [
          "[[mechanics/classic-mode|Classic mode]] runs the themes in order: Lobby (depth 0), Habitable Zone, Poolrooms, Pipe Dreams, Lights Out, and then the cycle repeats with bigger, denser levels and the deeper level names listed on each theme page. In [[mechanics/waves-mode|Waves mode]] the floors follow the door route instead; the enemies grow tougher by floor (see [[mechanics/difficulty-scaling|Difficulty scaling]]).",
        ],
      },
      {
        heading: "Open layouts",
        paragraphs: [
          "About 40% of Waves floors roll one of eight alternative open layouts instead: see [[levels/open-layouts|Open layouts]].",
        ],
      },
    ],
    tags: ["Overview"],
    related: [
      { category: "levels", slug: "open-layouts" },
      { category: "mechanics", slug: "classic-mode" },
      { category: "mechanics", slug: "waves-mode" },
    ],
  },
  {
    slug: "open-layouts",
    category: "levels",
    name: "Open Layouts",
    subtitle: "Overview",
    summary:
      "About two Waves floors in five use a more open, jump-heavy layout instead of rooms and partitions.",
    infobox: [
      { label: "Depth", value: "Waves floors, about 40% of them" },
      { label: "Hazards", value: "Pits, chasms, falls" },
    ],
    sections: [
      {
        heading: "How they work",
        paragraphs: [
          "Each Waves floor has a 40% chance to use one of eight open layouts, chosen from the floor's seed so every [[mechanics/co-op-multiplayer|co-op]] player gets the same map. Even floors (1, 3, 5) and odd floors (2, 4) draw from different groups of layouts, so two floors in a row never share one. The standard room-and-partition arena is used the rest of the time, and also whenever a wild layout fails its own checks.",
        ],
      },
      {
        heading: "The layouts",
        bullets: [
          "Cathedral: a huge central nave cut through every storey, with balconies, a chain of chandeliers and sometimes a crypt or altar.",
          "Colosseum: a four-storey sunken bowl with platform flights up the sides and a broken bridge over the rim.",
          "Chasm: two tower blocks around a full-height chasm spanned by broken decks, bridges and stairs.",
          "Helix: a tall core with a double spiral of one-way platforms.",
          "Sky Islands: floating islands joined by planks and rope ladders, with a tall shop tower.",
          "Switchback: full-height shafts with crossed zig-zag stairs and bridges.",
          "Scaffold: a half-built plant of one-way grating planks, mounds and poles.",
          "Collapse: a funnel-shaped cave-in with terraced rubble and stepping stones.",
        ],
      },
      {
        heading: "Notes",
        paragraphs: [
          "Poolrooms floors can only use the Helix or Switchback layouts, because their pool-tile slab rule has no room for the others; Party Room and Generator Room floors need a flat boss pad and cannot use Sky Islands or Collapse. Everything the standard arena guarantees (ladders to every storey, a [[items/workbench|workbench]], a [[items/vending-machine|vending machine]], enemy spawns) is guaranteed here too.",
        ],
      },
    ],
    tags: ["Overview", "Waves"],
    related: [{ category: "levels", slug: "level-generation" }],
  },
];
