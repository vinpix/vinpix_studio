import type { WikiArticle, WikiImage, WikiSection } from "../types";

/**
 * Heroes of The Last Dungeon. Numbers come from GameData.asset (stat ranges, prices,
 * upgrade steps), the skill scripts under Resources/Data/Scripts/Artifact and the
 * release-tuned skill table (TLD.Core.HeroKit "Proposed", all SkillFlags ON).
 * "Shield" is the stat called Energy in the game data: it soaks damage before health.
 */

interface StatRow {
  stat: string;
  start: number;
  max: number;
}

/** Shared "Base stats" section built from the data-asset ranges. */
function statsSection(
  hero: string,
  rows: StatRow[],
  steps: number,
  cost: number,
  extra: string[] = [],
): WikiSection {
  const total = steps * cost * rows.length;
  const hp = rows[0];
  const sh = rows[3];
  return {
    heading: "Base stats",
    paragraphs: [
      `${hero} starts every stat at its minimum and can be trained in the [[mechanics/hero-training|Trainer's hero panel]]. Each stat has **${steps} upgrade steps**, and every step costs **${cost} [[items/gem|Gems]]**. The steps are spread evenly between the starting value and the maximum.`,
      `About ${total.toLocaleString("en-US")} Gems trains all four stats to the maximum (${rows.length} stats x ${steps} steps x ${cost} Gems, derived). Stat upgrades are stored per hero, so training one hero does not help another.`,
      `Health plus [[mechanics/health-shield-and-dodge|shield]] (derived): **${hp.start + sh.start}** at the start, **${hp.max + sh.max}** fully trained.`,
      ...extra,
    ],
    table: {
      columns: ["Stat", "Start", "Maximum"],
      rows: rows.map((r) => [r.stat, String(r.start), String(r.max)]),
    },
  };
}

const effectsSection: WikiSection = {
  heading: "Effects",
  paragraphs: [
    "Separate from skins, the [[mechanics/hero-training|Trainer]] also sells 17 cosmetic **effects** that restyle your hero's outline or colors. Effects have no effect on stats. Prices are 500 [[items/gem|Gems]] for each of the four outline colors, 2,000 for Wave, 5,000 for Rainbow, and between 300 and 1,000 Gems for most color ramps (BumbleBerry 800, Downwell 300, Metroid ii 500, Mist GB 600, Grey 600, Toon 1,000, Inverse 1,000). Four of them cost [[items/ethernal]] instead: Fire 1 (30), Fire 2 (60), 8 bits (60) and 8 bits 2 (30).",
  ],
};

const skillPinNote =
  "Your equipped skill is added to your [[mechanics/inventory-and-bag|bag]] as an [[items/artifacts|artifact]] at the start of each run. It is pinned: it cannot be sold or dropped by accident and does not count toward bag capacity. Only one skill book is active at a time, and buying a book equips it.";

const stale =
  "The text printed on the skill books in the hero panel still shows some older, pre-tuning numbers. The values on this page come from the current game code.";

const skinImg = (file: string, alt: string, caption: string): WikiImage => ({
  src: `/ld/wiki/heroes/skins/${file}.png`,
  alt,
  pixelated: true,
  caption,
});

export const heroes: WikiArticle[] = [
  {
    slug: "archer",
    category: "heroes",
    name: "Archer",
    subtitle: "Starter hero, skirmisher",
    summary:
      "The Archer is the free starting hero of The Last Dungeon: the hero with the highest starting health and shield, plus a dash that slashes through two enemies and doubles as a dodge.",
    image: { src: "/ld/wiki/heroes/archer.png", alt: "Archer idle sprite", pixelated: true },
    infobox: [
      { label: "Class", value: "Skirmisher" },
      { label: "Skill", value: "Dash Strike" },
      { label: "Other skills", value: "Dash Rush (1,000 [[items/gem|Gems]])" },
      { label: "Health", value: "100 (max 225)" },
      { label: "Shield", value: "50 (max 100)" },
      { label: "Speed", value: "70 (max 90)" },
      { label: "Attack", value: "10 (max 20)" },
      { label: "Skins", value: "4" },
      { label: "Unlock", value: "Free from the start" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Archer is the hero you start with and the only one that costs nothing. Its skill is a dash: a short burst through the crowd that tags two random enemies and briefly makes you immune to enemy bullets. It is the simplest kit in the game, which makes the Archer the reference point the other heroes are balanced against. Like every hero it starts a run with the [[weapons/revolver-mk-1|Revolver]] and the [[weapons/blue-sword|Blue Sword]], and you can raise its stats between runs in [[mechanics/hero-training|hero training]].",
          "Its dialogue line in the hero panel is *\"I can't remember why I'm here\"*.",
        ],
      },
      statsSection(
        "The Archer",
        [
          { stat: "Health", start: 100, max: 225 },
          { stat: "Move speed", start: 70, max: 90 },
          { stat: "Attack", start: 10, max: 20 },
          { stat: "Shield", start: 50, max: 100 },
        ],
        30,
        100,
        ["The Archer has the cheapest full training of all six heroes."],
      ),
      {
        heading: "Skills",
        paragraphs: [skillPinNote],
        table: {
          columns: ["Skill", "Price", "Cooldown", "Effect"],
          rows: [
            ["Dash Strike", "Free (default)", "10 s", "Dash through 2 random enemies; each takes 20% of its max health, clamped between 10 and 50 damage. You take no bullet damage for 0.8 s."],
            ["Dash Rush", "1,000 [[items/gem|Gems]]", "9 s", "For 3 s: speed +30%, damage taken -20%, attack intervals x0.6 (about +67% attack speed)."],
          ],
        },
        subsections: [
          {
            heading: "Dash Strike",
            paragraphs: [
              "The free skill. The two targets are picked at random, and the damage is a share of the target's max health bar, so it hits tough enemies much harder than a regular shot but is capped at 50. The 0.8 s without bullet damage makes it a decent panic button as well as an attack.",
            ],
          },
          {
            heading: "Dash Rush",
            paragraphs: [
              "A pure buff: no damage of its own, but three seconds of faster movement, faster shooting and reduced damage taken. It suits builds with a strong weapon where the extra fire rate matters more than a guaranteed 2 targets.",
            ],
          },
        ],
      },
      {
        heading: "Skins",
        paragraphs: [
          "The Archer has four skins. They are purely cosmetic and are bought in the [[mechanics/hero-training|Trainer]]'s character panel. The first one is the default.",
        ],
        table: {
          columns: ["Skin", "Price", "Notes"],
          rows: [
            ["Archer", "Free (default)", "*\"I can't remember why I'm here\"*"],
            ["Creepy Archer", "2,000 Gems", "A skull mask. *\"Behind the mask is another mask\"*"],
            ["UnHat Archer", "5,000 Gems", "Hat off, dark hair. *\"I like the wind blowing through my hair\"*"],
            ["Shadow Archer", "40 [[items/ethernal]]", "A dark-haired variant. Extra visual effects appear when you use it with buffs."],
          ],
        },
      },
      effectsSection,
      {
        heading: "Tips",
        bullets: [
          "Dash Strike's bullet immunity is short but reliable; use it to cross a bullet pattern as well as to damage enemies.",
          "Since the hero and its default skill are free, all of your early Gems can go into stat upgrades.",
          "With 100 health and 50 [[mechanics/health-shield-and-dodge|shield]] (150 combined, derived) the Archer has the highest starting toughness of all six heroes, so it is the most forgiving hero early on.",
        ],
      },
    ],
    gallery: [
      skinImg("creepy-archer", "Creepy Archer sprite", "Creepy Archer"),
      skinImg("unhat-archer", "UnHat Archer sprite", "UnHat Archer"),
      skinImg("shadow-archer", "Shadow Archer sprite", "Shadow Archer"),
    ],
    trivia: [
      stale,
      "The Archer is the only hero with neither a passive nor a second hero-specific mechanic: its identity is the dash.",
      "The Dash Strike was nerfed in the release tuning pass, from 45% of max health every 6 s to 20% every 10 s, because the free skill was the lever that brought the other heroes closer to the Archer in the balance simulations.",
    ],
    tags: ["Skirmisher", "Free", "Starter"],
    related: [
      { category: "heroes", slug: "knight" },
      { category: "heroes", slug: "wizard" },
      { category: "pets", slug: "fox" },
      { category: "weapons", slug: "revolver-mk-1" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
    ],
  },
  {
    slug: "knight",
    category: "heroes",
    name: "Knight",
    subtitle: "Tank, shield hero",
    summary:
      "The Knight trades health for the biggest shield in the game. It has three skills: a summoned ally, a giant form, and a short invulnerability.",
    image: { src: "/ld/wiki/heroes/knight.png", alt: "Knight idle sprite", pixelated: true },
    infobox: [
      { label: "Class", value: "Tank" },
      { label: "Skill", value: "Little Knight" },
      { label: "Other skills", value: "Giant Knight (1,500 [[items/gem|Gems]]), Shield (1,000 Gems)" },
      { label: "Health", value: "25 (max 60)" },
      { label: "Shield", value: "100 (max 300)" },
      { label: "Speed", value: "60 (max 90)" },
      { label: "Attack", value: "12 (max 20)" },
      { label: "Skins", value: "2" },
      { label: "Unlock", value: "3,070 Gems" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Knight lives on its [[mechanics/health-shield-and-dodge|shield]]. It has the lowest health of any hero (25 at the start, 60 at most) but starts with 100 shield and can train it up to 300, far beyond any other hero. Damage is absorbed by the shield first, so as long as it holds, the small health pool is never touched. Like every hero it starts a run with the [[weapons/revolver-mk-1|Revolver]] and the [[weapons/blue-sword|Blue Sword]], and you can raise its stats between runs in [[mechanics/hero-training|hero training]].",
          "It is also the hero with the most skills to pick from: three skill books, each with a different style (an ally, a damage boost, and a full invulnerability window).",
        ],
      },
      statsSection(
        "The Knight",
        [
          { stat: "Health", start: 25, max: 60 },
          { stat: "Move speed", start: 60, max: 90 },
          { stat: "Attack", start: 12, max: 20 },
          { stat: "Shield", start: 100, max: 300 },
        ],
        40,
        100,
      ),
      {
        heading: "Skills",
        paragraphs: [skillPinNote],
        table: {
          columns: ["Skill", "Price", "Cooldown", "Effect"],
          rows: [
            ["Little Knight", "Free (default)", "60 s", "Summons a small knight that fights for you. It attacks every 0.7 s."],
            ["Giant Knight", "1,500 [[items/gem|Gems]]", "50 s", "For 10 s: damage taken -20%, attack damage +50%, movement +30%."],
            ["Shield", "1,000 Gems", "20 s", "You take no damage for 3 s."],
          ],
        },
        subsections: [
          {
            heading: "Little Knight",
            paragraphs: [
              "The default skill spawns an ally body next to you. The Shadow Knight skin summons a shadow version of the ally instead; the stats are the same.",
              "The cooldown was raised from 20 s to 60 s in the release tuning, so treat the summon as a once-per-room tool.",
            ],
          },
          {
            heading: "Giant Knight",
            paragraphs: [
              "A long 10 s buff that turns you into a giant: you hit 50% harder, take 20% less damage and move 30% faster. With a 50 s cooldown you will usually get it once per big fight.",
            ],
          },
          {
            heading: "Shield",
            paragraphs: [
              "Three seconds of complete damage immunity every 20 s. It is the shortest and cheapest of the three books, and the best answer to boss attacks you cannot [[mechanics/health-shield-and-dodge|dodge]].",
            ],
          },
        ],
      },
      {
        heading: "Skins",
        paragraphs: ["The Knight has one extra skin. It is cosmetic, apart from changing which ally the Little Knight summons."],
        table: {
          columns: ["Skin", "Price", "Notes"],
          rows: [
            ["Knight", "Free (default)", "*\"A hero can be anyone\"*"],
            ["Shadow Knight", "20,000 Gems", "Horned dark helmet. *\"Be fear me\"*. Summons the shadow little knight."],
          ],
        },
      },
      effectsSection,
      {
        heading: "Tips",
        bullets: [
          "Put your first upgrades into Shield, not Health: the shield is the stat that actually protects a Knight.",
          "Health gains are small (25 to 60), so every point of Health you do not lose is valuable. Avoid chip damage once the shield is gone.",
          "Giant Knight raises both your damage and your speed, so save it for the fights where you can stay on the offensive.",
        ],
      },
    ],
    gallery: [skinImg("shadow-knight", "Shadow Knight sprite", "Shadow Knight")],
    trivia: [
      stale,
      "The in-game text for the Shield skill promises a 20 s shield, but 20 s is its cooldown: the invulnerability itself lasts 3 s. The Little Knight text still says 15 s cooldown, the real value is now 60 s.",
      "The code contains a dormant Knight passive, *Bulwark* (shield regen delay halved and regen x4 in combat). It is switched off in the current build.",
    ],
    tags: ["Tank", "Gems"],
    related: [
      { category: "heroes", slug: "archer" },
      { category: "heroes", slug: "healman" },
      { category: "weapons", slug: "blue-sword" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
      { category: "pets", slug: "gum" },
    ],
  },
  {
    slug: "wizard",
    category: "heroes",
    name: "Wizard",
    subtitle: "Caster, crowd control",
    summary:
      "The Wizard is the control hero: bouncing lightning bolts by default and, for 3,000 Gems, a skill that freezes monsters and every bullet in the room.",
    image: { src: "/ld/wiki/heroes/wizard.png", alt: "Wizard idle sprite", pixelated: true },
    infobox: [
      { label: "Class", value: "Caster" },
      { label: "Skill", value: "Lightning Bolts" },
      { label: "Other skills", value: "Freeze Time (3,000 [[items/gem|Gems]])" },
      { label: "Health", value: "50 (max 100)" },
      { label: "Shield", value: "40 (max 100)" },
      { label: "Speed", value: "60 (max 85)" },
      { label: "Attack", value: "10 (max 20)" },
      { label: "Skins", value: "1" },
      { label: "Unlock", value: "4,070 Gems" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Wizard is the most fragile hero in the game: 50 health and 40 [[mechanics/health-shield-and-dodge|shield]] at the start, 90 total, which is the lowest of all six. In exchange it has the most controlling skills, and its second skill book is the priciest [[items/gem]]-priced book in the game (3,000 Gems). Like every hero it starts a run with the [[weapons/revolver-mk-1|Revolver]] and the [[weapons/blue-sword|Blue Sword]], and you can raise its stats between runs in [[mechanics/hero-training|hero training]].",
        ],
      },
      statsSection(
        "The Wizard",
        [
          { stat: "Health", start: 50, max: 100 },
          { stat: "Move speed", start: 60, max: 85 },
          { stat: "Attack", start: 10, max: 20 },
          { stat: "Shield", start: 40, max: 100 },
        ],
        40,
        100,
        ["The Wizard has the lowest speed cap (85) of any hero."],
      ),
      {
        heading: "Skills",
        paragraphs: [skillPinNote],
        table: {
          columns: ["Skill", "Price", "Cooldown", "Effect"],
          rows: [
            ["Lightning Bolts", "Free (default)", "14 s", "Fires 3 bolts that bounce between enemies, 4 bounces each, 0.2x reference damage per hit."],
            ["Freeze Time", "3,000 Gems", "18 s", "Freezes monsters for 3 s (bosses for 1.5 s) and stops every bullet in the room."],
          ],
        },
        subsections: [
          {
            heading: "Lightning Bolts",
            paragraphs: [
              "Three slow bolts (speed 1.25) bounce between enemies, four times each. Their damage scales with your build: it is 0.2 times a reference value, which is the damage of your weapon in hand or 0.42 times your hero Attack, whichever is higher (derived from the game code). If only one enemy is nearby, it takes all the bounces.",
            ],
          },
          {
            heading: "Freeze Time",
            paragraphs: [
              "Stops all monsters for 3 seconds, but a boss is frozen for only 1.5 s. It also freezes every bullet, and that includes your own. Bullets thaw together with the boss while one is alive, or with the other monsters otherwise.",
              "The cooldown was raised to 18 s in the release tuning; the original skill froze everything for 4 s every 15 s.",
            ],
          },
        ],
      },
      {
        heading: "Skins",
        paragraphs: ["The Wizard has only its default skin. Its internal skin entry is named *Knight* and carries the line *\"A hero can be anyone\"*, the same as the Knight's."],
      },
      effectsSection,
      {
        heading: "Tips",
        bullets: [
          "Because of its low health, put early upgrades into Health and Shield before Attack.",
          "Freeze Time is a defensive tool: use it to cross a dense bullet pattern or to reposition, not to shoot, since your own bullets stop as well.",
          "On a boss the freeze is half as long, so do not count on it for a full damage window.",
        ],
      },
    ],
    trivia: [
      stale,
      "The Wizard's skill text for the second book is just *\"Freeze the time\"*.",
      "The code contains a dormant Wizard passive, *Arcane Tempo* (skill cooldown x0.85). It is switched off in the current build.",
    ],
    tags: ["Caster", "Gems"],
    related: [
      { category: "heroes", slug: "fireman" },
      { category: "heroes", slug: "archer" },
      { category: "weapons", slug: "revolver-mk-1" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "artifacts" },
      { category: "pets", slug: "gum" },
    ],
  },
  {
    slug: "fireman",
    category: "heroes",
    name: "Fireman",
    subtitle: "Striker, fire caster",
    summary:
      "The Fireman has the highest Attack cap in the game and a single skill: a slow fireball that cools down faster when it kills.",
    image: { src: "/ld/wiki/heroes/fireman.png", alt: "Fireman idle sprite", pixelated: true },
    infobox: [
      { label: "Class", value: "Striker" },
      { label: "Skill", value: "Firebolt" },
      { label: "Health", value: "60 (max 120)" },
      { label: "Shield", value: "65 (max 120)" },
      { label: "Speed", value: "70 (max 90)" },
      { label: "Attack", value: "12 (max 24)" },
      { label: "Skins", value: "1" },
      { label: "Unlock", value: "7,070 [[items/gem|Gems]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Fireman is the most expensive hero to buy with [[items/gem|Gems]] (7,070), and the most expensive to train: each upgrade costs 150 Gems instead of 100. It is also the only hero whose Attack can grow to 24. Its kit is a single skill, with no alternate book. Like every hero it starts a run with the [[weapons/revolver-mk-1|Revolver]] and the [[weapons/blue-sword|Blue Sword]], and you can raise its stats between runs in [[mechanics/hero-training|hero training]].",
        ],
      },
      statsSection(
        "The Fireman",
        [
          { stat: "Health", start: 60, max: 120 },
          { stat: "Move speed", start: 70, max: 90 },
          { stat: "Attack", start: 12, max: 24 },
          { stat: "Shield", start: 65, max: 120 },
        ],
        40,
        150,
        ["Its full training is the most expensive of all heroes."],
      ),
      {
        heading: "Skills",
        paragraphs: [skillPinNote],
        table: {
          columns: ["Skill", "Price", "Cooldown", "Effect"],
          rows: [
            ["Firebolt", "Free (default)", "3 s", "Launches a slow fireball (speed 2) at your current target for 1.25x reference damage. A kill takes 1 s off the skill's own cooldown."],
          ],
        },
        subsections: [
          {
            heading: "Firebolt",
            paragraphs: [
              "Firebolt needs a target: if there is no enemy in range, the skill does nothing. Its damage is 1.25 times a reference value, which is the damage of your weapon in hand or 0.42 times your hero Attack, whichever is higher (derived from the game code), so it follows your build.",
              "Originally the fireball did a flat 8 damage and a kill refunded 2 s of the dash cooldown, which made it almost useless on later floors; the release tuning replaced both.",
            ],
          },
        ],
      },
      {
        heading: "Skins",
        paragraphs: ["The Fireman has only its default skin, which has a burning head. It carries the same *\"A hero can be anyone\"* line as the Knight."],
      },
      effectsSection,
      {
        heading: "Tips",
        bullets: [
          "Every kill by the fireball makes the next one come 1 s sooner, so chain it on weak enemies to keep it nearly always ready.",
          "With a 3 s cooldown, this is the skill you use constantly, not an emergency button.",
          "The Fireman's higher Attack cap makes fire-rate and damage cards stronger in a long run, but it takes the most Gems to reach it.",
        ],
      },
    ],
    trivia: [
      stale,
      "The in-game text says the cooldown is 2.5 seconds, but the skill's cooldown is 3 s.",
      "The code contains a dormant Fireman passive, *Kindling* (burn damage x1.3). It is switched off in the current build.",
    ],
    tags: ["Striker", "Gems"],
    related: [
      { category: "heroes", slug: "wizard" },
      { category: "heroes", slug: "plague-doctor" },
      { category: "weapons", slug: "revolver-mk-1" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
      { category: "pets", slug: "gum" },
    ],
  },
  {
    slug: "healman",
    category: "heroes",
    name: "HealMan",
    subtitle: "Support, healer",
    summary:
      "HealMan is the support hero: a big health pool that grows to 200, and a skill that heals every player for 10% of max health.",
    image: { src: "/ld/wiki/heroes/healman.png", alt: "HealMan idle sprite", pixelated: true },
    infobox: [
      { label: "Class", value: "Support" },
      { label: "Skill", value: "Heal" },
      { label: "Health", value: "70 (max 200)" },
      { label: "Shield", value: "50 (max 90)" },
      { label: "Speed", value: "70 (max 90)" },
      { label: "Attack", value: "10 (max 20)" },
      { label: "Skins", value: "1" },
      { label: "Unlock", value: "3,070 [[items/gem|Gems]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "HealMan is the only hero whose skill helps other players. Its hero panel description reads *\"heals all allies for 10%\"*. In [[mechanics/co-op-multiplayer|co-op]] it keeps the team alive, and solo it is a self-heal on a short cooldown. Like every hero it starts a run with the [[weapons/revolver-mk-1|Revolver]] and the [[weapons/blue-sword|Blue Sword]], and you can raise its stats between runs in [[mechanics/hero-training|hero training]].",
          "It also has the largest health growth of any hero, from 70 up to 200 at full training (only the Archer's 225 cap is higher).",
        ],
      },
      statsSection(
        "HealMan",
        [
          { stat: "Health", start: 70, max: 200 },
          { stat: "Move speed", start: 70, max: 90 },
          { stat: "Attack", start: 10, max: 20 },
          { stat: "Shield", start: 50, max: 90 },
        ],
        35,
        150,
        ["It has fewer upgrade steps than every hero except the Archer (35 against the Archer's 30), but each costs 150 Gems."],
      ),
      {
        heading: "Skills",
        paragraphs: [skillPinNote],
        table: {
          columns: ["Skill", "Price", "Cooldown", "Effect"],
          rows: [
            ["Heal", "Free (default)", "8 s", "Heals every player for 10% of their max health."],
          ],
        },
        subsections: [
          {
            heading: "Heal",
            paragraphs: [
              "A flat 10% of max health, not a fixed number, so it gets stronger as you train Health: at 200 max health it restores 20 per cast. In solo play the only player healed is you.",
              "The cooldown was lowered from 10 s to 8 s in the release tuning.",
            ],
          },
        ],
      },
      {
        heading: "Skins",
        paragraphs: ["HealMan has only its default skin, a white-haired healer in a white robe."],
      },
      effectsSection,
      {
        heading: "Tips",
        bullets: [
          "Put upgrades into Health: because the heal is a percentage, more max health also means a bigger heal.",
          "Healing restores health, not [[mechanics/health-shield-and-dodge|shield]].",
          "In [[mechanics/co-op-multiplayer|co-op]], use the skill when a teammate is low rather than on cooldown, since it heals everyone.",
        ],
      },
    ],
    trivia: [
      stale,
      "The hero's skill description in the data is simply *\"heal player\"*.",
      "The code contains a dormant HealMan passive, *Medic* (potions heal an extra 10% of max health and you start with one more potion). It is switched off in the current build.",
    ],
    tags: ["Support", "Gems"],
    related: [
      { category: "heroes", slug: "knight" },
      { category: "heroes", slug: "plague-doctor" },
      { category: "weapons", slug: "blue-sword" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "health-potion" },
      { category: "pets", slug: "gum" },
    ],
  },
  {
    slug: "plague-doctor",
    category: "heroes",
    name: "Plague Doctor",
    subtitle: "Leech, life-steal hero",
    summary:
      "The Plague Doctor heals by hurting: it has a permanent 10% life steal, a burst of machine-gun fire, and a poison that taints every monster.",
    image: { src: "/ld/wiki/heroes/plague-doctor.png", alt: "Plague Doctor idle sprite", pixelated: true },
    infobox: [
      { label: "Class", value: "Leech" },
      { label: "Skill", value: "Disease I" },
      { label: "Other skills", value: "Disease II (100 [[items/ethernal]])" },
      { label: "Passive", value: "Leech: +10% life steal" },
      { label: "Health", value: "65 (max 125)" },
      { label: "Shield", value: "50 (max 100)" },
      { label: "Speed", value: "70 (max 90)" },
      { label: "Attack", value: "10 (max 20)" },
      { label: "Skins", value: "1" },
      { label: "Unlock", value: "370 Ethernal" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Plague Doctor is the only hero with a passive that is live in the current build: **+10% life steal**. A share of the damage your bullets and swings deal comes back as health. Its hero panel reads *\"+10% lifesteal, +20% lifesteal while you play the skill\"*. Like every hero it starts a run with the [[weapons/revolver-mk-1|Revolver]] and the [[weapons/blue-sword|Blue Sword]], and you can raise its stats between runs in [[mechanics/hero-training|hero training]].",
          "It is also the only hero bought with **[[items/ethernal]]**, the premium currency, instead of [[items/gem|Gems]].",
        ],
      },
      statsSection(
        "The Plague Doctor",
        [
          { stat: "Health", start: 65, max: 125 },
          { stat: "Move speed", start: 70, max: 90 },
          { stat: "Attack", start: 10, max: 20 },
          { stat: "Shield", start: 50, max: 100 },
        ],
        40,
        120,
        ["Stat upgrades are bought with Gems (120 each), only the hero and its second skill need Ethernal."],
      ),
      {
        heading: "Passive: Leech",
        paragraphs: [
          "Every hit from your bullets and swings heals you for 10% of the damage dealt. Life steal heals health only: it never refills the [[mechanics/health-shield-and-dodge|shield]].",
        ],
      },
      {
        heading: "Skills",
        paragraphs: [skillPinNote],
        table: {
          columns: ["Skill", "Price", "Cooldown", "Effect"],
          rows: [
            ["Disease I", "Free (default)", "20 s", "A machine gun fires bullets in 4 fixed directions every 0.1 s for 4 s. +20% life steal while it runs."],
            ["Disease II", "100 Ethernal", "60 s", "Poisons every monster for 6 s. +25% damage and +20% life steal for 5 s."],
          ],
        },
        subsections: [
          {
            heading: "Disease I",
            paragraphs: [
              "A machine gun is deployed and sprays bullets up, down, left and right, 4 bullets per volley, a volley every 0.1 s for 4 seconds. Each bullet does 0.03 times a reference damage (the weapon in hand or 0.42 times your Attack, whichever is higher, derived from the game code). The extra 20% life steal covers the whole 4 s.",
            ],
          },
          {
            heading: "Disease II",
            paragraphs: [
              "Poisons every monster at once for 6 seconds. A poisoned monster takes a tick every 0.5 s equal to 10% of its health bar, clamped to 1 to 20 damage. For 5 s you also deal 25% more damage and gain +20% life steal. The cooldown was raised from 15 s to 60 s in the release tuning.",
            ],
          },
        ],
      },
      {
        heading: "Skins",
        paragraphs: ["The Plague Doctor has only its default skin, whose entry in the data is named *\"Does it hurt, let me heal you!\"*."],
      },
      effectsSection,
      {
        heading: "Tips",
        bullets: [
          "Life steal scales with the damage you deal, so the Plague Doctor gets much more from a strong weapon than from heals.",
          "Poison ticks are clamped to 1-20, so Disease II is best against large crowds of weak monsters, less so against a single boss.",
        ],
      },
    ],
    trivia: [
      stale,
      "A design review of the game noted that the Plague Doctor's 370 Ethernal price is higher than the largest Ethernal in-app purchase pack (256 Ethernal).",
    ],
    tags: ["Leech", "Ethernal", "Passive"],
    related: [
      { category: "heroes", slug: "healman" },
      { category: "heroes", slug: "fireman" },
      { category: "weapons", slug: "revolver-mk-1" },
      { category: "mechanics", slug: "hero-training" },
      { category: "mechanics", slug: "health-shield-and-dodge" },
      { category: "pets", slug: "gum" },
    ],
  },
];
