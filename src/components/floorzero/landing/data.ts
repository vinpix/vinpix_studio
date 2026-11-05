/** Static content + asset manifest for the Floor Zero landing page. */

export const LANDING_ASSETS = "/fz/landing";

export const STUDIO_URL = "https://vinpixstudio.com";

export interface Boss {
  id: string;
  name: string;
  floor: string;
  blurb: string;
  img: string;
  alt: string;
  /** object-position for the 4:3 crop */
  pos?: string;
}

export const bosses: Boss[] = [
  {
    id: "manager",
    name: "The Missing Manager",
    floor: "Floor 1",
    blurb:
      "Pounds the floor until your storey collapses, calls in minions when hurt and goes berserk at low health.",
    img: "manager",
    alt: "The Missing Manager, a tower of filing cabinets topped with stacked clerks, in the yellow Lobby",
  },
  {
    id: "forklift",
    name: "The Ghost Forklift",
    floor: "Floor 2A",
    blurb:
      "A haunted warehouse forklift that charges down the aisle. Dodge it, and a missed charge leaves it wide open.",
    img: "forklift",
    alt: "The Ghost Forklift with a tall mast and a hanging hook in a warehouse",
  },
  {
    id: "fumes",
    name: "The Fumes",
    floor: "Floor 2B",
    blurb:
      "A pipe-fed gas spirit with valve-wheel crown and brass pipe arms. Its own fumes can burn.",
    img: "fumes",
    alt: "The Fumes, a floating barrel face with a valve crown and long brass pipe arms",
  },
  {
    id: "swimmer",
    name: "The Swimmer",
    floor: "Floor 3A",
    blurb:
      "Something circles beneath the pool tiles. Watch the floor and hit it when it surfaces.",
    img: "swimmer",
    alt: "A pale sea serpent surfacing in a tiled Poolrooms level",
  },
  {
    id: "emcee",
    name: "The Emcee",
    floor: "Floor 3B",
    blurb:
      "A crowned host on a unicycle in a magenta curtain hall. The show always demands one more song.",
    img: "emcee",
    alt: "The Emcee, a crowned showman on a unicycle in front of a magenta stage curtain",
  },
  {
    id: "smiler",
    name: "The Smiler",
    floor: "Floor 4",
    blurb:
      "Fights in the dark with only a spotlight and a grin. Lights Out has a price.",
    img: "smiler",
    alt: "The Smiler, a black silhouette with a wide white grin standing in a pool of light",
    pos: "50% 55%",
  },
  {
    id: "hum",
    name: "The Hum",
    floor: "Floor 5",
    blurb:
      "A wired walker that carries a giant shadow behind it. The Hum never stops.",
    img: "hum",
    alt: "The Hum, a boxy mechanical walker with open metal wings and a single glowing eye",
  },
];

export interface Survivor {
  id: string;
  name: string;
  role: string;
  /** file name (without .png) in /roster */
  img: string;
  w: number;
  h: number;
}

/** Native sprite sizes (px) — rendered at an integer multiple. */
export const survivors: Survivor[] = [
  { id: "accountant", name: "The Accountant", role: "Damage", img: "accountant", w: 12, h: 30 },
  { id: "banana", name: "The Banana", role: "Trapper", img: "banana", w: 15, h: 27 },
  { id: "birthday-kid", name: "The Birthday Kid", role: "Gambler", img: "birthday-kid", w: 11, h: 31 },
  { id: "duck", name: "Rubber Duck", role: "Control", img: "duck", w: 18, h: 24 },
  { id: "firefly", name: "The Firefly", role: "Light", img: "firefly", w: 14, h: 29 },
  { id: "goldfish", name: "Goldfish", role: "Escape", img: "goldfish", w: 20, h: 27 },
  { id: "pumpkin", name: "The Pumpkin", role: "Fear", img: "pumpkin", w: 17, h: 23 },
  { id: "mascot", name: "The Mascot", role: "Tank", img: "mascot", w: 20, h: 27 },
  { id: "mole", name: "The Mole", role: "Tunneler", img: "mole", w: 20, h: 23 },
  { id: "poser", name: "The Poser", role: "Decoy", img: "poser", w: 13, h: 30 },
  { id: "cockroach", name: "The Cockroach", role: "Survivor", img: "roach", w: 13, h: 30 },
  { id: "skin-stealer", name: "The Skin-Stealer", role: "Disguise", img: "skin-stealer", w: 13, h: 29 },
  { id: "stray", name: "The Stray", role: "Scout", img: "stray", w: 18, h: 30 },
  { id: "water-boy", name: "The Water Boy", role: "Soaker", img: "water-boy", w: 16, h: 29 },
  { id: "bacteria", name: "Bacteria", role: "Zone", img: "bacteria", w: 18, h: 21 },
];

export interface Weapon {
  name: string;
  file: string;
  w: number;
  h: number;
}

export const weapons: Weapon[] = [
  { name: "Bounced Check", file: "bounced_check", w: 20, h: 10 },
  { name: "Final Demand", file: "final_demand", w: 18, h: 12 },
  { name: "Fire Extinguisher", file: "fire_extinguisher", w: 20, h: 9 },
  { name: "Hot Glue Gun", file: "hot_glue_gun", w: 18, h: 11 },
  { name: "Nail Gun", file: "nail_gun", w: 16, h: 10 },
  { name: "Party Popper", file: "party_popper", w: 19, h: 12 },
  { name: "Popcorn Machine", file: "popcorn_machine", w: 19, h: 12 },
  { name: "Red Tape", file: "red_tape", w: 30, h: 13 },
  { name: "Stapler SMG", file: "stapler_smg", w: 18, h: 10 },
  { name: "Thumbtack Gun", file: "thumbtack_gun", w: 21, h: 10 },
  { name: "Time Clock", file: "time_clock", w: 26, h: 14 },
  { name: "Kilowatt Bulb", file: "kilowatt_bulb", w: 17, h: 12 },
  { name: "Industrial Printer", file: "industrial_printer", w: 26, h: 14 },
  { name: "Tailpipe", file: "tailpipe", w: 23, h: 9 },
  { name: "Price Tagger", file: "price_tagger", w: 14, h: 11 },
  { name: "Sprinkler Bow", file: "sprinkler_bow", w: 22, h: 10 },
  { name: "Hunting Rifle", file: "hunting_rifle", w: 30, h: 9 },
  { name: "Leftovers", file: "leftovers", w: 20, h: 11 },
  { name: "Microwave", file: "microwave", w: 18, h: 12 },
  { name: "Fridge Magnet", file: "fridge_magnet", w: 20, h: 11 },
  { name: "Eviction Notice", file: "eviction_notice", w: 25, h: 8 },
  { name: "Concrete Mortar", file: "concrete_mortar", w: 25, h: 11 },
  { name: "Demolition Drill", file: "demolition_drill", w: 23, h: 13 },
  { name: "Long Weekend", file: "long_weekend", w: 22, h: 9 },
];

export const weaponFamilies = [
  "Sidearm",
  "Auto",
  "Shotgun",
  "Precision",
  "Explosive",
  "Energy",
  "Melee",
  "Device",
];

export const rarities: { name: string; color: string }[] = [
  { name: "Common", color: "#b5b5a8" },
  { name: "Good", color: "#7bd88f" },
  { name: "Rare", color: "#5fb0ff" },
  { name: "Epic", color: "#c38bff" },
  { name: "Legendary", color: "#ffb347" },
  { name: "Anomalous", color: "#ff5fa8" },
];

export const shots = [
  { file: "lobby", alt: "A boss wave in the yellow Lobby: a hulking Missing Manager on a filing cabinet while zombies climb ladders", caption: "The Lobby" },
  { file: "pool", alt: "The Swimmer surfacing in the flooded Poolrooms", caption: "Poolrooms" },
  { file: "stage", alt: "The Emcee on a unicycle on a magenta stage floor, with party zombies around", caption: "Boss wave" },
  { file: "warehouse", alt: "The Ghost Forklift in a dark warehouse with shelving and crates", caption: "Warehouse" },
];
