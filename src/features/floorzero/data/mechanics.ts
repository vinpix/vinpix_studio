import type { WikiArticle, WikiImage } from "../types";

const pic = (file: string, alt: string, caption?: string): WikiImage => ({
  src: `/fz/wiki/mechanics/${file}`,
  alt,
  caption,
});

export const mechanics: WikiArticle[] = [
  // ───────────────────────────── Start here ─────────────────────────────
  {
    slug: "getting-started",
    category: "mechanics",
    name: "Getting Started",
    subtitle: "Beginner guide",
    summary:
      "Everything a new survivor needs for a first run: what the screen shows, what to do in each phase of a floor and the habits that keep you alive.",
    image: pic("hud-energy.png", "The in-run HUD with health, energy, counters and weapon slots", "The HUD: health and energy at top left, wave counter in the middle, weapon slots at top right."),
    infobox: [
      { label: "Mode", value: "Waves (recommended for new players)" },
      { label: "Run length", value: "About 35 minutes for all five floors" },
    ],
    sections: [
      {
        heading: "Your first run",
        bullets: [
          "On the Loadout screen pick Waves mode, a character and a starting weapon, then press START RUN. You also carry an unlimited pistol and a fire axe.",
          "You spawn in an arena of four storeys. Beside you stand the [[items/workbench|workbench]] (right) and the [[items/vending-machine|vending machine]] (left). Use them during the 15-second Prep and between waves.",
          "Each floor has seven waves. Wave 4 is an event and wave 7 is a boss. After every wave you get a 25-second lull; press READY (R, or the READY button) to start the next wave early. See [[mechanics/wave-structure|Wave structure]].",
          "After wave 3 and after the boss you pick an [[anomalies/anomalies-overview|anomaly card]].",
          "Clear the boss to open two doors to the next floor. Reach and beat [[bosses/the-hum|the Hum]] on Floor 5 to win.",
        ],
      },
      {
        heading: "The HUD",
        bullets: [
          "Top left: the heart and red health bar, the yellow energy bar (the [[items/battery|battery]] that powers your [[items/flashlight|flashlight]] and energy weapons), and three counters: [[items/almond-water|almond water]], [[items/scrap|scrap]] and kills.",
          "Top centre: the floor and wave counter, the timer and the enemies left in the wave, with a tag for the event (HORDE, BLACKOUT and so on).",
          "Top right: your weapon slots. The active gun is highlighted and shows its level stars and, for energy weapons, their energy cost. The pause button is at the far right.",
          "Bottom left: your character skill and the build button.",
        ],
      },
      {
        heading: "Habits that help",
        bullets: [
          "Use every lull: upgrade a weapon to level 2 for 50 [[items/scrap|scrap]], buy health if you are low and place a sentry or two in build mode ([[mechanics/fortify-and-building|Fortify and building]]).",
          "Dig. Everything except the map border is destructible, and breaking walls and floors makes new routes and drops scrap ([[mechanics/destruction-and-collapse|Destruction and collapse]]). Walls with nothing under them collapse.",
          "Mind your battery. The [[items/flashlight|flashlight]] and energy weapons share it. Stand under a working light, a work light or the [[items/generator]] to refill ([[mechanics/flashlight-and-light|Flashlight and light]]).",
          "Read the banner. Event waves and floor rules tell you what to do: stand beside a falling crate, protect the tank, get into the light, seal the rifts ([[mechanics/event-waves|Event waves]]).",
          "Keep moving between floors. Enemies climb and dig after you, so fight where you have a ladder, a platform or an [[items/explosive-barrel|explosive barrel]] behind you.",
          "Pick up weapons from crates and drops. A spare copy of a weapon you hold is a free level.",
          "Co-op makes everything easier and tougher at once: see [[mechanics/co-op-multiplayer|Co-op multiplayer]].",
        ],
      },
      {
        heading: "When you die",
        paragraphs: [
          "[[items/scrap]] and weapons are lost, but the [[items/almond-water|almond water]] you earned is banked and buys permanent upgrades on the Loadout screen: see [[mechanics/death-and-progression|Death and progression]].",
        ],
      },
    ],
    tags: ["Guide"],
    related: [
      { category: "mechanics", slug: "controls" },
      { category: "mechanics", slug: "waves-mode" },
      { category: "mechanics", slug: "wave-structure" },
      { category: "items", slug: "workbench" },
      { category: "items", slug: "scrap" },
      { category: "enemies", slug: "bestiary-overview" },
    ],
  },
  {
    slug: "controls",
    category: "mechanics",
    name: "Controls",
    subtitle: "Touch, keyboard and gamepad",
    summary:
      "The game plays on a phone with on-screen controls, on a keyboard with a mouse, or on a gamepad. This table lists every action on each.",
    image: pic("touch-controls.png", "The touch controls: joystick, jump, fire, swap, skill and build buttons", "Touch layout: floating joystick on the left, jump and fire at the bottom right, swap, skill and build beside them."),
    infobox: [
      { label: "Platforms", value: "Android touch, keyboard and mouse, gamepad" },
    ],
    sections: [
      {
        heading: "Controls table",
        table: {
          columns: ["Action", "Touch", "Keyboard and mouse", "Gamepad"],
          rows: [
            ["Move and climb ladders", "Floating joystick, left half of the screen", "A / D and W / S, or arrow keys", "Left stick or D-pad"],
            ["Jump", "Jump button", "Space", "A"],
            ["Drop through a thin platform", "Drag down and jump", "S + Space", "Down + A"],
            ["Aim and fire", "Fire button: drag to aim and shoot; a plain tap auto-aims at the nearest enemy", "Left mouse button (aims at the cursor); J fires with auto-aim", "Right stick or RT"],
            ["Change weapon", "Swap button, or tap the weapon slot", "1 / 2, Q / E or the mouse wheel", "LB / RB"],
            ["Melee stance", "-", "V (or 3 if you have no third gun)", "Press the left stick (L3)"],
            ["Interact (take a weapon, use the [[items/workbench|workbench]] or [[items/vending-machine|vending machine]])", "Hand button, shown when something is in reach", "F", "X"],
            ["Use device", "Device button", "G", "LT"],
            ["Character skill", "Skill button", "C", "Y"],
            ["Build mode", "Build button", "B", "B"],
            ["Manual reload", "-", "R (outside Prep and lulls)", "Press the right stick (R3)"],
            ["READY between waves", "READY button on the HUD", "R", "View / Back"],
            ["Pause", "Pause button or the Android Back button", "Esc or P", "Start"],
          ],
        },
        paragraphs: [
          "Your melee weapon swings on its own when an enemy is close and you are not shooting. Auto-aim on touch picks the nearest enemy you can see. The mouse aim stays active for three seconds after the cursor last moved or while the button is held.",
        ],
      },
    ],
    tags: ["Controls"],
    related: [{ category: "mechanics", slug: "getting-started" }],
  },

  // ───────────────────────────── Modes ─────────────────────────────
  {
    slug: "waves-mode",
    category: "mechanics",
    name: "Waves Mode",
    subtitle: "Game mode",
    summary:
      "The main mode. Survive seven waves on each of five floors, with a boss at the end of every floor, and defeat [[bosses/the-hum|the Hum]] on Floor 5 to win.",
    image: pic("wave-event-blackout.png", "A wave banner announcing Wave 3 - Blackout", "A wave banner for an event wave: \"WAVE 3 - BLACKOUT\"."),
    infobox: [
      { label: "Players", value: "1-4 (co-op)" },
      { label: "Length", value: "5 floors, about 35 minutes" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Waves mode is chosen on the Loadout screen (the default). Each floor is a multi-storey arena with no exit ([[levels/level-generation|Level generation]]). You hold it against seven waves of enemies: [[mechanics/wave-structure|wave structure]] describes the phases, [[mechanics/event-waves|event waves]] the wave 4 events and the boss waits at wave 7.",
          "Between floors you choose a door ([[mechanics/floor-route-and-doors|Floor route and doors]]): the floors are the [[levels/the-lobby|Lobby]], then the [[levels/habitable-zone|Warehouse]] or [[levels/pipe-dreams]], then the [[levels/poolrooms|Poolrooms]] or the [[levels/party-room|Party Room]], then [[levels/lights-out]] and finally the [[levels/generator-room|Generator Room]]. The pacing target is about 6 minutes for Floor 1, 7 for Floor 2, 7 and a half for Floors 3 and 4 and 8 for the final floor, roughly 35 minutes for the full route.",
        ],
      },
      {
        heading: "What you do",
        bullets: [
          "Fight in the waves and between them use the [[items/workbench|workbench]], the [[items/vending-machine|vending machine]] and [[mechanics/fortify-and-building|build mode]].",
          "Everything is destructible; the arena repairs itself between waves ([[mechanics/maintenance-cycle|Maintenance cycle]]).",
          "Pick an [[anomalies/anomalies-overview|anomaly card]] after wave 3 and after each boss.",
          "Beat the final boss to win the run. Runs, wins and your clearance feed the permanent progress ([[mechanics/death-and-progression|Death and progression]]).",
        ],
      },
    ],
    tags: ["Mode"],
    related: [
      { category: "mechanics", slug: "classic-mode" },
      { category: "mechanics", slug: "wave-structure" },
      { category: "levels", slug: "the-lobby" },
      { category: "bosses", slug: "the-hum" },
      { category: "mechanics", slug: "floor-route-and-doors" },
    ],
  },
  {
    slug: "classic-mode",
    category: "mechanics",
    name: "Classic Mode",
    subtitle: "Game mode",
    summary:
      "The original way to play: descend through long procedural levels, find the exit elevator and keep going deeper. No waves, no timer.",
    infobox: [
      { label: "Players", value: "1-4 (co-op)" },
      { label: "Goal", value: "Reach the exit of each level" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "Each level is a long serpentine complex ([[levels/level-generation|Level generation]]). You spawn on the top floor at the far left and the exit elevator is on the bottom floor at the far right ([[levels/exit-room|Exit room]]).",
          "Enemies keep spawning, and a [[mechanics/horde-alarms|horde alarm]] rings every 60-90 seconds.",
          "After each level you choose one [[anomalies/anomalies-overview|anomaly card]], then the next level loads, bigger and harder. The themes run [[levels/the-lobby|Lobby]], [[levels/habitable-zone|Habitable Zone]], [[levels/poolrooms|Poolrooms]], [[levels/pipe-dreams]], [[levels/lights-out]], then repeat with deeper names and larger levels.",
          "The shop is always open. [[items/workbench|Workbenches]] are in the start room and in every [[levels/safe-room|Safe Room]]; Safe Rooms also have a [[items/vending-machine|vending machine]]. [[items/weapon-crate|Weapon crates]] are in [[levels/storage-room|Storage Rooms]] and Safe Rooms.",
          "Every second level drops a [[items/master-key]] (up to five).",
        ],
      },
      {
        heading: "Rewards",
        paragraphs: [
          "[[items/almond-water|Almond water]] is banked as usual but capped lower: 60 plus 40 per level completed. Classic runs are not ranked and do not count for the character goals.",
        ],
      },
    ],
    tags: ["Mode"],
    related: [
      { category: "mechanics", slug: "waves-mode" },
      { category: "levels", slug: "level-generation" },
      { category: "levels", slug: "the-lobby" },
      { category: "levels", slug: "safe-room" },
    ],
  },

  // ───────────────────────────── Waves ─────────────────────────────
  {
    slug: "wave-structure",
    category: "mechanics",
    name: "Wave Structure",
    subtitle: "Phases of a floor",
    summary:
      "Every Waves floor runs the same schedule: a 15-second prep, seven waves separated by 25-second lulls, with an event on wave 4 and a boss on wave 7.",
    infobox: [
      { label: "Waves per floor", value: "7 (6 regular, event on 4, boss on 7)" },
      { label: "Prep / lull", value: "15 s / 25 s" },
    ],
    sections: [
      {
        heading: "Schedule",
        table: {
          columns: ["Phase", "Length", "Notes"],
          rows: [
            ["Prep", "15 s", "Look around; use the [[items/workbench|workbench]], [[items/vending-machine|vending machine]] and build mode"],
            ["Wave 1-3", "Until cleared", "Regular waves"],
            ["Anomaly pick", "-", "After wave 3: choose one of three [[anomalies/anomalies-overview|anomaly cards]]"],
            ["Wave 4", "Until cleared", "Event wave: see [[mechanics/event-waves|Event waves]]"],
            ["Wave 5-6", "Until cleared", "Regular waves"],
            ["Lulls", "25 s", "After each of waves 1 to 6; shop open"],
            ["Wave 7", "Until the boss is dead", "The boss and its summoned enemies"],
            ["Floor cleared", "-", "Anomaly pick, rewards, heal of a quarter of your health, then the door vote"],
          ],
        },
      },
      {
        heading: "READY",
        paragraphs: [
          "Offline, pressing READY in the Prep starts wave 1 at once, and in a lull it cuts the countdown to 3 seconds. Online, every living player votes and the countdown drops to 3 seconds when all agree; a teammate still loading counts as a voter for up to 15 seconds. After the boss the same button is the door vote. If someone is AFK, the floor-cleared countdown starts anyway once one player has been ready for 120 seconds.",
          "The shop ([[items/workbench|workbench]], [[items/vending-machine|vending machine]], fuse) is shut while a wave or the boss is on.",
        ],
      },
      {
        heading: "How a wave ends",
        paragraphs: [
          "A wave ends when its whole budget of enemies has spawned and none is left alive. A wave that drags on is pushed forward: after 150 seconds every remaining enemy is alerted, and after 300 seconds up to 3 stragglers are removed. Extra fast runners start to arrive if a wave runs long (from 120 seconds on Floor 1, 10 seconds sooner per floor). Enemies come out of wall vents and ceiling grates. The number alive at once is capped (10 plus 2 per floor plus 3 per extra player).",
          "Pressure rises with the floor: a share of enemies spawn closer to you, and some waves send a RUSH, a clump of fast bodies at once. From wave 3 some enemies are elites. A scene may also change how enemies arrive ([[mechanics/wave-scenes|Wave scenes]]).",
        ],
      },
      {
        heading: "Boss wave",
        paragraphs: [
          "Wave 7 is the floor's boss: [[bosses/the-missing-manager|the Missing Manager]] ([[levels/the-lobby|Lobby]]), [[bosses/the-ghost-forklift|the Ghost Forklift]] ([[levels/habitable-zone|Warehouse]]), [[bosses/the-fumes|the Fumes]] ([[levels/pipe-dreams]]), [[bosses/the-swimmer|the Swimmer]] Under Tiles ([[levels/poolrooms|Poolrooms]]), [[bosses/the-emcee|the Emcee]] ([[levels/party-room|Party Room]]), [[bosses/the-smiler|the Smiler]] ([[levels/lights-out]]) and [[bosses/the-hum|the Hum]] ([[levels/generator-room|Generator Room]]). Bosses often summon helpers, and the repair cycle is paused during the fight. Bosses of Floors 1-4 pay a [[items/master-key]] to each player.",
        ],
      },
    ],
    tags: ["Waves"],
    related: [
      { category: "mechanics", slug: "event-waves" },
      { category: "mechanics", slug: "floor-route-and-doors" },
      { category: "bosses", slug: "the-missing-manager" },
      { category: "enemies", slug: "bestiary-overview" },
      { category: "anomalies", slug: "anomalies-overview" },
    ],
  },
  {
    slug: "event-waves",
    category: "mechanics",
    name: "Event Waves",
    subtitle: "Wave 4 events",
    summary:
      "Wave 4 of every floor is an event. One of eight is rolled for the floor, each with its own rule and reward.",
    image: pic("wave-event-blackout.png", "A wave banner announcing Wave 3 - Blackout", "A Blackout event banner: \"THE LIGHTS ARE GOING OUT\"."),
    infobox: [
      { label: "Wave", value: "4 of 7" },
      { label: "Events", value: "8" },
    ],
    sections: [
      {
        heading: "Which event?",
        paragraphs: [
          "The event is rolled once per floor from a weighted table, and is the same for every player. Floor 1 only rolls the first five; [[enemies/hunter|the Hunter]] joins on Floor 2; Flood and Noclip Shortcut arrive on Floor 3 onward. Themes bias the odds (see the theme pages).",
        ],
        table: {
          columns: ["Event", "Floor 1", "Floor 2", "Floor 3-5"],
          rows: [
            ["Horde", "22", "16", "11"],
            ["Blackout", "20", "16", "11"],
            ["Cave-In", "20", "17", "11"],
            ["Supply Drop", "20", "17", "11"],
            ["Hold the Source", "18", "17", "11"],
            ["The Hunter", "-", "17", "11"],
            ["Flood", "-", "-", "17"],
            ["Noclip Shortcut", "-", "-", "17"],
          ],
        },
      },
      {
        heading: "Events",
        subsections: [
          {
            heading: "Horde",
            paragraphs: ["A siren sounds and a bigger, faster wave swarms in: 1.5 times the enemies, in larger batches at about half the interval, with 1.4 times as many runners."],
          },
          {
            heading: "Blackout",
            paragraphs: ["Every light goes out for at least 45 seconds (and until the wave ends). [[enemies/crawler|Crawlers]] are 1.3 times as common. Your [[items/flashlight|flashlight]] and any work light still work: see [[mechanics/flashlight-and-light|Flashlight and light]]."],
          },
          {
            heading: "Cave-In",
            paragraphs: ["Five seconds into the wave, and then every 8 seconds (up to 6 times), a span of ceiling 3-5 tiles wide above a random player not on the top floor is marked with a 1.6-second warning and a rumble, then collapses as a falling slab that crushes and leaves a hole and rubble. 0.9 times the enemies."],
          },
          {
            heading: "Supply Drop",
            paragraphs: ["A crate falls from the ceiling. Stand beside it for 8 seconds to open it for a weapon, [[items/scrap|scrap]] and bonus drops while the wave comes. See [[items/supply-crate|Supply crate]]."],
          },
          {
            heading: "Hold the Source",
            paragraphs: ["The almond tank becomes a target that enemies prefer to attack. Keep it alive to the end of the wave for a full heal, 30 scrap and 2 [[items/almond-water|almond water]]; if it breaks the event fails. See [[items/almond-tank|Almond tank]]. If a floor has no tank the wave turns into a Horde."],
          },
          {
            heading: "The Hunter",
            paragraphs: ["A single hunter is placed far from you and stalks you. It is immune to damage until your flashlight beam (or a strong light) has lit it for a total of 2 seconds, and then it is exposed for 9 seconds, taking 50% extra damage, before it is immune again. The rest of the wave is a little smaller (0.7 times). Killing it gives every player a Rare or better weapon and 20 scrap."],
          },
          {
            heading: "Flood",
            paragraphs: ["Needs at least two floors of arena. After an 8-second warning with a rumble the water rises 3 rows and stays until the wave ends (40 seconds at most), then drains. Water carries shocks ([[mechanics/water-and-shock|Water and shock]]) and enemies killed in water drop 1.5 times the scrap."],
          },
          {
            heading: "Noclip Shortcut",
            paragraphs: ["Glowing rifts open near you (6 to 8 of them, depending on the number of players, at most 3 at once), spitting out enemies for 9 seconds each after a 1.5-second warning. Stand next to a rift to seal it; more players seal it faster. Seal at least half to succeed and everyone earns 30 scrap and bonus drops. Half of the wave's enemies arrive through the rifts."],
          },
        ],
      },
    ],
    tags: ["Waves", "Events"],
    related: [
      { category: "mechanics", slug: "wave-structure" },
      { category: "items", slug: "supply-crate" },
      { category: "enemies", slug: "hunter" },
    ],
  },
  {
    slug: "wave-scenes",
    category: "mechanics",
    name: "Wave Scenes",
    subtitle: "Arena twists",
    summary:
      "Most waves come with a scene: a rule that changes how the enemies arrive or what the floor does. The next scene is shown on the lull card.",
    infobox: [
      { label: "Scenes in play", value: "5" },
    ],
    sections: [
      {
        heading: "How scenes work",
        paragraphs: [
          "Between waves the lull card announces \"NEXT: WAVE 5 - <SCENE>\", or \"???\" when it is hidden, and the wave banner repeats it when the wave starts. Scenes change on most waves of a run (all except a few), are the same for every co-op player, and none of them hurts on Floor 1.",
          "Scene hits cannot take more than about a quarter of a player's health in a window. Spawn scenes telegraph their cells for 3 seconds, and enemies spawn normally again after a short fallback so a wave never stalls.",
        ],
        table: {
          columns: ["Scene", "What happens"],
          rows: [
            ["ONE WAY IN", "All the enemies come from one side: from the left, from the right, dropping from above or from two doors"],
            ["BREACH", "Only some vents are open. A glow marks which"],
            ["LIVE RAILS", "Strips on the floor arc with electricity: hop or move. A warning shows each strip first"],
            ["CEILING SHEDS", "The ceiling sheds debris on a marked spot. Watch the shadow"],
            ["WET FLOOR", "There is water on the floor and shocks spread (see [[mechanics/water-and-shock|Water and shock]])"],
          ],
        },
      },
    ],
    tags: ["Waves"],
    related: [{ category: "mechanics", slug: "wave-structure" }],
  },
  {
    slug: "lull-encounters",
    category: "mechanics",
    name: "Lull Encounters",
    subtitle: "Stops between waves",
    summary:
      "Between waves a stop may appear on the floor: a hidden weapon cache, a trader or a stranded survivor. They are optional and only last for the lull.",
    infobox: [
      { label: "Frequency", value: "Roughly one stop per floor" },
    ],
    sections: [
      {
        heading: "The stops",
        bullets: [
          "Sky Cache: a [[items/weapon-crate|weapon crate]] you can only grab while airborne after an extra jump. The first one of a run, in the first lull of Floor 1, pays a Good weapon; later ones pay [[items/scrap|scrap]] and a little health. Without an extra jump it turns into a Twin Crates.",
          "Twin Crates: two crates, one real. Opening either one spends both. The other is a mimic that bites for 35% of your health and pays some scrap.",
          "Survivor: stand next to a stranded survivor for 4 seconds to rescue them for a reward and a heal, but one in four is really a mannequin.",
          "Peddler: sells a PATCH KIT (restores 50% health; refused above 90%), a [[items/battery|BATTERY CELL]] (20 scrap, +100 energy) and a LUCKY CRATE (pick one of three weapons).",
        ],
      },
      {
        heading: "Sealed doors",
        paragraphs: [
          "Occasionally one of the two door cards after a boss is a \"??? SEALED PRIZE\": the prize is rolled when the next floor starts and replaces the door's normal reward. See [[mechanics/floor-route-and-doors|Floor route and doors]].",
        ],
      },
    ],
    tags: ["Waves"],
    related: [{ category: "mechanics", slug: "wave-structure" }],
  },
  {
    slug: "floor-route-and-doors",
    category: "mechanics",
    name: "Floor Route and Doors",
    subtitle: "Choosing the next floor",
    summary:
      "A run has five floors. After each boss the team votes between two doors, each leading to a theme and offering a different reward.",
    image: pic("door-choice.png", "The door choice screen with Floor 2A The Warehouse and Floor 2B Pipe Dreams", "The door cards: theme, rule, boss and reward."),
    infobox: [
      { label: "Floors", value: "5" },
      { label: "Final boss", value: "[[bosses/the-hum]] (Floor 5)" },
    ],
    sections: [
      {
        heading: "The route",
        table: {
          columns: ["Floor", "Door A", "Door B"],
          rows: [
            ["1", "[[levels/the-lobby|The Lobby]]", "-"],
            ["2", "[[levels/habitable-zone|The Warehouse]] (2A)", "[[levels/pipe-dreams|Pipe Dreams]] (2B)"],
            ["3", "[[levels/poolrooms|The Poolrooms]] (3A)", "[[levels/party-room|The Party Room]] (3B)"],
            ["4", "[[levels/lights-out|Lights Out]]", "Lights Out"],
            ["5", "[[levels/generator-room|The Generator Room]]", "The Generator Room"],
          ],
        },
        paragraphs: [
          "Both doors of Floors 4 and 5 lead to the same floor but offer different rewards. Each card shows the floor's rule line and its boss.",
        ],
      },
      {
        heading: "Rewards",
        paragraphs: [
          "Each door carries one of three rewards, and the two doors of a floor always differ. They are the same for every player.",
        ],
        bullets: [
          "+1 RARE WEAPON: a Rare or better weapon waits at the spawn of the next floor for each player.",
          "+1 ANOMALY: an extra anomaly pick when the next floor's prep begins.",
          "+50% SCRAP: [[items/scrap|scrap]] earned on that floor is multiplied by 1.5.",
        ],
      },
      {
        heading: "Voting",
        paragraphs: [
          "At the floor clear, pressing READY opens the door cards. Each player votes for door A or B; the door with the most votes wins and a tie goes to the host's vote, otherwise A. The vote can be changed until the door is taken, and the next floor loads after a 3-second countdown. After [[bosses/the-hum|the Hum]] there is no door: the run is won six seconds after the final boss dies.",
        ],
      },
    ],
    tags: ["Waves", "Route"],
    related: [{ category: "mechanics", slug: "waves-mode" }, { category: "levels", slug: "the-lobby" }, { category: "levels", slug: "habitable-zone" }, { category: "levels", slug: "pipe-dreams" }],
  },

  // ───────────────────────────── World ─────────────────────────────
  {
    slug: "destruction-and-collapse",
    category: "mechanics",
    name: "Destruction and Collapse",
    subtitle: "Everything breaks",
    summary:
      "Walls, floors, ceilings, ladders, doors and furniture can all be destroyed. Blocks that lose their support fall and crush what they land on.",
    infobox: [
      { label: "Indestructible", value: "The map border and the Classic exit door" },
    ],
    sections: [
      {
        heading: "Tile durability",
        table: {
          columns: ["Material", "HP", "Where"],
          rows: [
            ["Ceiling tile", "10", "Ceilings"],
            ["Wood", "8", "Crates, low walls, planks"],
            ["Wallpaper", "14", "The [[levels/the-lobby|Lobby]]"],
            ["Pool tile", "18", "[[levels/poolrooms|Poolrooms]], restrooms"],
            ["Red tile", "18", "[[levels/red-room|Red Rooms]], [[levels/party-room|Party Room]] walls"],
            ["Carpet", "22", "Lobby floors"],
            ["Party floor", "22", "Party Room"],
            ["Vent", "25", "Vents and grates"],
            ["Brick", "26", "[[levels/pipe-dreams]], [[levels/habitable-zone|Warehouse]]"],
            ["Concrete", "30", "Warehouse, barriers"],
            ["Metal", "60", "Exit dais, pipes, stall dividers"],
            ["Grating", "70", "[[levels/generator-room|Generator Room]] floors"],
            ["Steel plate", "90", "Device bases"],
            ["Glass", "3", "Windows"],
            ["Platform (one-way)", "12", "Mezzanines"],
            ["Ladder", "20", "Ladders: only explosions break them"],
          ],
        },
        paragraphs: [
          "Explosions damage tiles in a circle, at full strength in the centre and a quarter at the rim, and crack tiles on the way. Crater scars are drawn onto the walls. A window breaks as one pane: the panes next to it break a moment later.",
        ],
      },
      {
        heading: "Collapse",
        paragraphs: [
          "After anything breaks, the game checks whether the blocks around the hole are still attached to the ground. A mass of up to 64 connected tiles that has lost its anchor creaks for about a third of a second, then falls as a body. It crushes enemies and players it hits (damage depends on the speed and mass), shatters on landing or settles as rubble. Bigger masses stay put.",
          "Props hanging from a collapsed ceiling fall with it. Water drains out of holes that you open in a pool (but the tide on [[levels/poolrooms|Poolrooms]] floors is managed by the floor and does not drain).",
        ],
      },
      {
        heading: "Never stuck",
        paragraphs: [
          "Because only the outer border (and in Classic mode the exit door) is indestructible, there is always a way: you can dig through any wall or floor. The pistol and the fire axe both damage terrain. On Waves floors the arena also repairs itself between waves ([[mechanics/maintenance-cycle|Maintenance cycle]]).",
        ],
      },
      {
        heading: "Scrap from rubble",
        paragraphs: [
          "Broken tiles can drop scrap: see [[items/scrap|Scrap]].",
        ],
      },
    ],
    tags: ["World"],
    related: [
      { category: "mechanics", slug: "maintenance-cycle" },
      { category: "items", slug: "destructible-props" },
      { category: "items", slug: "explosive-barrel" },
    ],
  },
  {
    slug: "maintenance-cycle",
    category: "mechanics",
    name: "Maintenance Cycle",
    subtitle: "The arena repairs itself",
    summary:
      "In the lulls between waves the floor puts back the terrain and props that make the arena playable. Ladders, platforms and the shop are restored first.",
    infobox: [
      { label: "Applies to", value: "Waves floors only" },
    ],
    sections: [
      {
        heading: "What you see",
        paragraphs: [
          "About 0.8 seconds into a lull the toast MAINTENANCE CYCLE appears and floor strips mark what is about to return. Then the arena rebuilds in visible steps, one every 0.3 seconds, ending with AREA RESTORED. Restored tiles and props are hollow: they give no [[items/scrap|scrap]] or loot, so you cannot farm them.",
        ],
        bullets: [
          "After lulls 2, 4 and 6 a full cycle runs. After lulls 1, 3 and 5 only the critical set returns (ladders, one-way platforms, the spawn pad and the shop), unless about 8% of the structure is wrecked or three or more players are in the run.",
          "Things you built are never touched.",
          "If a ladder is lost or the shop or spawn is wrecked while you are on the floor, an emergency repair starts after a few seconds.",
          "Nothing is repaired on schedule in the boss wave, but if the way to a boss is cut for 20 seconds the service ladders return.",
        ],
      },
    ],
    tags: ["World", "Waves"],
    related: [{ category: "mechanics", slug: "destruction-and-collapse" }, { category: "items", slug: "destructible-props" }],
  },
  {
    slug: "water-and-shock",
    category: "mechanics",
    name: "Water and Shock",
    subtitle: "Poolrooms rules",
    summary:
      "Water carries electricity and the tide changes with the waves. Fire does not burn anything standing in water.",
    infobox: [
      { label: "Applies to", value: "[[levels/poolrooms|Poolrooms]], [[levels/generator-room|Generator Room]], Flood event, Wet Floor scene" },
    ],
    sections: [
      {
        heading: "Shock",
        paragraphs: [
          "An electric hit on a creature standing in water spreads to up to 8 others in the same water within 6 tiles. Enemies take 60% of the damage and are stunned for half a second; players take 30% and only from enemy sources, so you cannot hurt yourself with your own lightning. Electrical props that stand in water, such as [[items/server-rack|server racks]], spark for 6 damage every 4 seconds within 2.5 tiles.",
        ],
      },
      {
        heading: "Tides",
        paragraphs: [
          "On the Poolrooms floor the water level changes every wave and the second banner line announces it: THE TIDE IS RISING or THE TIDE IS FALLING. The water moves one row every two seconds. The [[levels/generator-room|Generator Room]] repeats the tide on waves 2, 5 and 6, and a Flood event raises the water three rows. See [[levels/poolrooms|The Poolrooms]].",
        ],
      },
    ],
    tags: ["World", "Water"],
    related: [{ category: "levels", slug: "poolrooms" }, { category: "levels", slug: "electrical-room" }, { category: "items", slug: "server-rack" }],
  },
  {
    slug: "flashlight-and-light",
    category: "mechanics",
    name: "Flashlight and Light",
    subtitle: "Seeing and being seen",
    summary:
      "Light matters: it lets you see, recharges the battery and decides how far enemies notice you.",
    image: pic("hud-energy.png", "The HUD with the energy bar", "The energy bar sits under the health bar."),
    infobox: [
      { label: "Beam", value: "9 tiles, 58-degree cone" },
      { label: "Drain", value: "0.4 energy per second" },
    ],
    sections: [
      {
        heading: "The flashlight",
        paragraphs: [
          "Your lamp points where you aim. It drains 0.4 energy per second from the 100-point [[items/battery|battery]] that energy weapons share. Below 20% the beam flickers and dims, and at 0 only a faint glow remains. Floors can change this: on [[levels/lights-out]] floors the beam is 25% longer but drains 1.6 times as fast. See [[items/flashlight|Flashlight]].",
        ],
      },
      {
        heading: "Recharging",
        bullets: [
          "Standing in a lit area recharges the battery, up to 6 energy per second in full light.",
          "Work lights (a [[items/build-pieces|build piece]]) and the [[items/generator]] recharge it even in a blackout, as do the blue charge pools of [[levels/lights-out]] and [[levels/generator-room|Generator Room]] floors.",
          "[[items/battery|Battery cells]], [[items/energy-orb|energy orbs]] and kill drops add energy directly.",
        ],
      },
      {
        heading: "Being noticed",
        paragraphs: [
          "Enemies notice you from farther away when you stand in the light and from closer when you stand in the dark. On [[levels/lights-out]] floors the multipliers are 1.35 and 0.7. Some enemies, such as [[enemies/hunter|the Hunter]], can only be hurt while light is on them.",
        ],
      },
      {
        heading: "Blackouts",
        paragraphs: [
          "The Blackout event turns off every light for at least 45 seconds. On the [[levels/generator-room|Generator Room]] floor, waves 3 and 6 and [[bosses/the-hum|the Hum]]'s darkness phase dim the whole world to 45%. Shooting out ceiling tubes makes a floor darker.",
        ],
      },
    ],
    tags: ["Light"],
    related: [
      { category: "items", slug: "battery" },
      { category: "levels", slug: "lights-out" },
      { category: "items", slug: "flashlight" },
      { category: "enemies", slug: "hunter" },
    ],
  },
  {
    slug: "horde-alarms",
    category: "mechanics",
    name: "Horde Alarms",
    subtitle: "Siren and swarm",
    summary:
      "In Classic mode a siren rings every minute or so and a crowd of enemies pours in. In Waves mode the alarm belongs to the Horde event.",
    infobox: [
      { label: "Classic interval", value: "60-90 seconds" },
      { label: "Size", value: "6-12 enemies" },
    ],
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "The toast \"!! HORDE INCOMING !!\" appears with a siren and a small screen shake. Every enemy on the level becomes aware of you at once, and a crowd of 6 plus the depth plus 0-3 enemies (at most 12) spawns over about two and a half seconds, with runners more likely. The alarm lasts six seconds and then the timer restarts.",
          "In [[mechanics/waves-mode|Waves mode]] there is no periodic alarm: the Horde event on wave 4 uses the siren ([[mechanics/event-waves|Event waves]]).",
        ],
      },
    ],
    tags: ["Classic", "Enemies"],
    related: [{ category: "mechanics", slug: "classic-mode" }, { category: "enemies", slug: "bestiary-overview" }],
  },

  // ───────────────────────────── Weapons and economy ─────────────────────────────
  {
    slug: "weapon-levels-and-rarity",
    category: "mechanics",
    name: "Weapon Levels and Rarity",
    subtitle: "Upgrading your guns",
    summary:
      "Weapons come in six rarities and can be raised to three levels. Level 2 costs [[items/scrap|scrap]], level 3 needs a [[items/master-key]].",
    infobox: [
      { label: "Rarities", value: "6" },
      { label: "Levels", value: "3 (shown as stars)" },
    ],
    sections: [
      {
        heading: "Rarity",
        paragraphs: [
          "Weapons are Common (white), Good (green), Rare (blue), Epic (purple), Legendary (orange) or Anomalous (red). The odds of a random drop depend on the floor: the best rarities only appear deeper, and Legendary never drops on Floor 1.",
        ],
        table: {
          columns: ["Floor", "Common", "Good", "Rare", "Epic", "Legendary", "Anomalous"],
          rows: [
            ["1", "62%", "30%", "7.5%", "0.5%", "-", "-"],
            ["2", "50%", "33%", "14%", "2.8%", "0.15%", "0.05%"],
            ["3", "40%", "34%", "19%", "6.3%", "0.55%", "0.15%"],
            ["4", "32%", "33%", "23%", "10.6%", "1.1%", "0.3%"],
            ["5", "26%", "31%", "26%", "14.9%", "1.6%", "0.5%"],
          ],
        },
      },
      {
        heading: "Levels",
        table: {
          columns: ["Level", "How", "Effect"],
          rows: [
            ["1", "Starting level", "Base damage"],
            ["2", "50 scrap at the [[items/workbench|workbench]], or a duplicate", "About +36% damage and better stats; unlocks a branch choice"],
            ["3 (Mastered)", "Master at the workbench: 220 scrap and a [[items/master-key|Master Key]]", "About +72% damage in total and the weapon's own signature effect"],
          ],
        },
        bullets: [
          "Duplicates: picking up a copy of a weapon you hold gives it one free level per floor. After that, a spare copy is salvaged for 30 [[items/scrap|scrap]]. A level-3 weapon is primed by its first duplicate.",
          "Branch: at level 2 the workbench offers a choice between two upgrade paths (\"BRANCH READY - USE A WORKBENCH\").",
          "Evolve: a level-3 weapon plus its matching anomaly can evolve at the workbench for 120 scrap.",
          "Fuse: the workbench can merge two weapons for 40 scrap.",
          "The [[perks/workshop]] upgrade makes all workbench prices up to 50% cheaper.",
        ],
      },
      {
        heading: "Loadout",
        paragraphs: [
          "You carry two guns (swap with 1 and 2), one melee weapon that attacks automatically and one device (G). Every run starts with an unlimited pistol, a starter weapon of your choice and the fire axe. Weapons belong to eight families: pistols, automatics, shotguns, precision, explosives, energy, melee and devices. A weapon you have seen is recorded in the Weapon Book.",
        ],
      },
    ],
    tags: ["Weapons"],
    related: [
      { category: "items", slug: "workbench" },
      { category: "items", slug: "weapon-pickup" },
      { category: "items", slug: "master-key" },
      { category: "items", slug: "scrap" },
      { category: "perks", slug: "workshop" },
    ],
  },
  {
    slug: "scrap-economy",
    category: "mechanics",
    name: "Scrap Economy",
    subtitle: "Earning and spending",
    summary:
      "[[items/scrap]] is earned from enemies, rubble and props and spent on upgrades, supplies and defences. This page explains how the numbers fit together.",
    infobox: [
      { label: "Resets", value: "Every run" },
    ],
    sections: [
      {
        heading: "Faucets",
        paragraphs: [
          "See [[items/scrap|Scrap]] for the full list. The big ones are enemy kills, objectives (20-30 each), props and the +50% Scrap door. Late joiners get 40 scrap per floor they missed, plus a free level on the starting weapon from Floor 3 and [[items/master-key|Master Keys]].",
        ],
      },
      {
        heading: "Sinks",
        table: {
          columns: ["Where", "Item", "Price"],
          rows: [
            ["Workbench", "Level 2", "50"],
            ["Workbench", "Master (and a key)", "220"],
            ["Workbench", "Evolve", "120"],
            ["Workbench", "Fuse", "40"],
            ["Workbench", "[[items/battery|Battery pack]] (+40)", "10"],
            ["[[items/vending-machine|Vending machine]]", "Health (+40)", "30, rising"],
            ["Vending machine", "Energy (+100)", "24"],
            ["Vending machine", "Weapon pick of three", "120, x1.5 each"],
            ["Vending machine", "Anomaly", "160, x1.6 each"],
            ["Vending machine", "[[items/master-key]]", "340"],
            ["Build mode", "Sentry Gun", "30"],
            ["Build mode", "Rope Ladder", "3"],
          ],
        },
        paragraphs: [
          "Starting [[items/scrap|scrap]] comes from the [[perks/nest-egg]] upgrade (+8 per level). Prices on the [[items/workbench|workbench]] fall with the [[perks/workshop]] upgrade.",
        ],
      },
      {
        heading: "Fairness in co-op",
        paragraphs: [
          "More players kill more enemies, so every kill-sourced chance and the [[items/scrap|scrap]] of a kill are divided as the lobby grows: a team of four does not earn four times the scrap per player. Scrap from props, tiles and objectives is not divided.",
        ],
      },
    ],
    tags: ["Economy"],
    related: [
      { category: "items", slug: "scrap" },
      { category: "items", slug: "vending-machine" },
      { category: "items", slug: "workbench" },
      { category: "perks", slug: "nest-egg" },
    ],
  },
  {
    slug: "health-and-healing",
    category: "mechanics",
    name: "Health and Healing",
    subtitle: "Staying alive",
    summary:
      "You start with 100 HP. Healing is capped per wave so health has to be managed rather than farmed.",
    infobox: [
      { label: "Base health", value: "100 HP" },
    ],
    sections: [
      {
        heading: "Rules",
        bullets: [
          "A hit gives a short period of invulnerability and knockback.",
          "[[items/health-pack|Health packs]] (20-25 HP), [[items/vending-machine|vending machine]] health (+40 for 30 [[items/scrap|scrap]]), medic posts (4 HP per second nearby) and kill-based healing all count as healing.",
          "Healing other than regeneration is worth its full value up to 30% of your maximum HP per wave and a quarter of its value after that. The [[perks/field-medic]] upgrade raises both the healing and the cap.",
          "A floor clear heals a quarter of your maximum HP.",
          "In co-op, a dead player returns at the start of the next lull with half health: see [[mechanics/co-op-multiplayer|Co-op multiplayer]].",
        ],
      },
    ],
    tags: ["Survival"],
    related: [{ category: "items", slug: "health-pack" }, { category: "perks", slug: "field-medic" }],
  },

  // ───────────────────────────── Building ─────────────────────────────
  {
    slug: "fortify-and-building",
    category: "mechanics",
    name: "Fortify and Building",
    subtitle: "Build mode",
    summary:
      "Press B to open build mode and place defences for [[items/scrap|scrap]]: sentries, flame posts, doors, spikes, lights and more.",
    image: pic("build-mode.png", "The build palette with piece costs over a corridor", "The build palette."),
    infobox: [
      { label: "Key", value: "B (touch: Build button; gamepad: B)" },
    ],
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "Build mode is available during a Waves floor in every phase. Move the cursor (mouse, aim stick or the touch pointer) within 6 tiles of you, pick a piece from the palette (Q and E, or the wheel, change page) and click to place it. You can drag a line of cells, demolish your own pieces and repair damaged ones for half the price. Pieces are tiles or props and last for the floor.",
          "In the middle of a wave it is a one-shot: the mode closes after one placement, after 4 seconds of idleness or when you are hit. Nothing new can be placed within 8 tiles of a living boss. Refusals tell you why (too far, no [[items/scrap|scrap]], no support, kept clear for a ladder, shop or spawn, and so on).",
          "Devices can be upgraded by clicking them in build mode or walking up and pressing interact. See [[items/build-pieces|Build pieces]] for the full list and costs.",
        ],
      },
      {
        heading: "Limits",
        bullets: [
          "80 pieces per floor for the team, +20 for every extra player.",
          "Turret-class devices (sentry, flame post, tesla coil, mortar, cryo post): 4, 6, 8 or 10 for 1-4 players.",
          "4 work lights, 6 barrels, 8 spike strips per floor.",
          "Pieces you build never drop [[items/scrap|scrap]] when broken.",
        ],
      },
    ],
    tags: ["Build"],
    related: [{ category: "items", slug: "build-pieces" }, { category: "items", slug: "scrap" }],
  },

  // ───────────────────────────── Co-op ─────────────────────────────
  {
    slug: "co-op-multiplayer",
    category: "mechanics",
    name: "Co-op Multiplayer",
    subtitle: "2-4 players",
    summary:
      "Play with up to four friends online with a room code, or on the same network over LAN. The enemies scale to match.",
    infobox: [
      { label: "Players", value: "2-4" },
      { label: "Modes", value: "Online (room code) and LAN" },
    ],
    sections: [
      {
        heading: "Hosting and joining",
        bullets: [
          "From the title screen open MULTIPLAYER.",
          "Online: one player presses HOST ONLINE and shares the 6-letter room code with friends. Friends type it in the ROOM CODE field and press JOIN ONLINE. The host presses START RUN.",
          "LAN: the host presses HOST LAN, which shows the host's IP address; the others press JOIN LAN and type that address. All players must be on the same network.",
          "If you run two copies of the game on the same computer, use LAN.",
          "Friends can also be added with friend codes in the profile screen.",
        ],
      },
      {
        heading: "What is shared",
        paragraphs: [
          "The host runs the enemies, terrain and props; everyone controls their own character. Loot is per player: each player sees and collects their own drops, [[items/scrap|scrap]], weapons and [[items/almond-water|almond water]], and the shops are local. Building is shared (the team's piece cap grows by 20 per extra player).",
        ],
      },
      {
        heading: "Scaling and teamwork",
        bullets: [
          "Enemy health rises by 60% per extra player, the number of enemies by 35% and the alive cap by 3.",
          "READY and door votes need every living player; a teammate who is loading counts for up to 15 seconds.",
          "A fallen teammate returns at the start of the next lull with 50% health.",
          "Objectives are faster with more people: crates open and rifts seal faster.",
          "At three or more players the arena gets a full repair every lull.",
          "A player who joins late gets a catch-up: 40 [[items/scrap|scrap]] per floor missed, a free level on the starter from Floor 3 and [[items/master-key|Master Keys]].",
        ],
      },
    ],
    tags: ["Co-op"],
    related: [{ category: "mechanics", slug: "getting-started" }],
  },

  // ───────────────────────────── Meta ─────────────────────────────
  {
    slug: "death-and-progression",
    category: "mechanics",
    name: "Death and Progression",
    subtitle: "What carries over",
    summary:
      "A run ends when you die or win. [[items/almond-water|Almond water]] you earned is banked and bought into permanent upgrades; everything else resets.",
    infobox: [
      { label: "Banked", value: "[[items/almond-water|Almond water]], upgrades, unlocks" },
      { label: "Lost", value: "[[items/scrap]], weapons, [[anomalies/anomalies-overview|anomalies]], builds" },
    ],
    sections: [
      {
        heading: "Death",
        paragraphs: [
          "Offline, your death ends the run. Online, a fallen player comes back at the next lull with half health, and a win ends the run too. At the end you see a run summary and the almond water you banked ([[items/almond-water|Almond Water]]).",
        ],
      },
      {
        heading: "Permanent upgrades",
        paragraphs: ["[[items/almond-water|Almond water]] is spent on the Loadout screen on eleven upgrades (85 levels in all):"],
        table: {
          columns: ["Upgrade", "Effect per level", "Levels"],
          rows: [
            ["Vitality", "+8 max HP (+12 from level 6, +20 from level 11)", "16"],
            ["Plating", "1.5% less damage taken (3% from level 6, 4.5% from level 11)", "14"],
            ["Marksman", "+2% damage (+3.5% from level 6, +5% from level 11)", "16"],
            ["Quickdraw", "+2% fire rate", "8"],
            ["Workshop", "-4% [[items/workbench|workbench]] prices", "5"],
            ["Nest Egg", "+8 [[items/scrap|scrap]] at the start of a run", "6"],
            ["Field Medic", "+8% healing and +4% of the wave heal cap", "4"],
            ["Fleet Foot", "+3% movement speed", "5"],
            ["Power Belt", "+10 battery capacity", "3"],
            ["Grid Tap", "+4% battery recharge", "3"],
            ["Lucky Finds", "+8% almond water", "5"],
          ],
        },
      },
      {
        heading: "Ascension",
        paragraphs: [
          "After you win, you can buy Ascension tiers with [[items/almond-water|almond water]] (the first costs 600 and each next one 70% more; each needs a win on the tier before). Tier 1-8 make runs harder in exchange for more reward: each tier gives enemies +8% health, +7% damage and +2% elite chance, and grants +10% almond water and +5% [[items/scrap|scrap]]. You select the tier on the Loadout screen. See [[mechanics/difficulty-scaling|Difficulty scaling]].",
        ],
      },
      {
        heading: "Record",
        paragraphs: [
          "Your best floors reached set a clearance rating, which the door cards compare against the floor you are entering, and the Weapon Book records the highest level each weapon reached.",
        ],
      },
    ],
    tags: ["Meta"],
    related: [
      { category: "items", slug: "almond-water" },
      { category: "mechanics", slug: "difficulty-scaling" },
      { category: "perks", slug: "perks-overview" },
    ],
  },
  {
    slug: "difficulty-scaling",
    category: "mechanics",
    name: "Difficulty Scaling",
    subtitle: "How hard the floors get",
    summary:
      "Enemies grow tougher by wave, by floor and by player count, and the game adds pressure when a wave drags.",
    infobox: [
      { label: "Per wave", value: "About +12% enemy health" },
      { label: "Per floor", value: "Large step up" },
      { label: "Per extra player", value: "+60% health, +35% count" },
    ],
    sections: [
      {
        heading: "Base scaling",
        bullets: [
          "Within a floor enemy health grows by about 12% per wave. Between floors it steps up strongly, and the mid-floors are tuned so fights last about as long as planned. Enemy damage rises 6% per floor.",
          "More players: +60% health and +35% enemies per additional player, and three more enemies allowed alive.",
          "At most 10 plus 2 per floor enemies are alive together (before the co-op bonus).",
          "From wave 3 elites can appear, and later floors add enemy types and more elites.",
          "Boss health is tuned so a fight lasts roughly one to two minutes.",
        ],
      },
      {
        heading: "Pressure",
        bullets: [
          "RUSH: a clump of fast enemies spawns at once during a wave.",
          "Close spawns: from Floor 2 a growing share of enemies spawn closer to you.",
          "Anti-stall: a wave that runs long sends extra runners.",
          "Floor rules and scenes (tides, darkness, traps) change the way each floor plays.",
        ],
      },
      {
        heading: "Ascension",
        paragraphs: [
          "Tiers 1 to 8 add health, damage and elites; see [[mechanics/death-and-progression|Death and progression]]. Classic mode instead grows larger levels with depth.",
        ],
      },
    ],
    tags: ["Difficulty"],
    related: [
      { category: "mechanics", slug: "wave-structure" },
      { category: "mechanics", slug: "death-and-progression" },
      { category: "enemies", slug: "elite-enemies" },
    ],
  },
];
