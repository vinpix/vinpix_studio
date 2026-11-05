import type { WikiArticle, WikiSection } from "../types";

/**
 * Pets of The Last Dungeon. Data from GameData.asset (names, prices, descriptions),
 * Pet/Win2.cs (the pet panel and shop) and Pet/PetAI.cs (behaviour). Every pet shares
 * the same AI, so the numbers are the same for all five.
 */

const behaviour: WikiSection = {
  heading: "Behaviour",
  bullets: [
    "Follows you through the [[dungeons/the-hub-island|hub]] and the dungeon, always staying close to your hero.",
    "If it ends up more than 2 units away from you, it teleports back next to you.",
    "It also moves along with you when you are teleported between rooms.",
    "It cannot attack and cannot be damaged: the pet code ignores incoming damage and has no attack routine.",
    "Only one pet can be active at a time. Buying a pet selects it automatically, and you can switch between owned pets in the [[mechanics/hero-training|Trainer]]'s pet panel.",
    "Pets are not synchronised in [[mechanics/co-op-multiplayer|co-op]]: only you see your own pet.",
  ],
};

const howToGet = (price: string): WikiSection => ({
  heading: "How to get",
  paragraphs: [
    `The ${price} price is paid once, in the pet panel of the [[mechanics/hero-training|Trainer]] in the [[dungeons/the-hub-island|hub]]. There is no pet selected by default, so you start a new game without a companion.`,
  ],
});

export const pets: WikiArticle[] = [
  {
    slug: "gum",
    category: "pets",
    name: "Gum",
    subtitle: "Cosmetic companion, 600 Gems",
    summary:
      "Gum is a round purple critter on little orange feet that trots after you. It cannot attack, and it costs 600 Gems.",
    image: { src: "/ld/wiki/pets/gum.png", alt: "Gum pet sprite", pixelated: true },
    infobox: [
      { label: "Ability", value: "None (follows you, cannot attack)" },
      { label: "Quote", value: "*\"I'm not a food. Please don't eat me\"*" },
      { label: "Unlock", value: "600 [[items/gem|Gems]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Gum is the first pet in the shop list. Its description in the pet panel reads *\"I'm not a food. Please don't eat me\"*, followed by the reminder that **this pet can't attack**. It has an idle animation and a running animation, and it simply walks along behind you.",
        ],
      },
      behaviour,
      howToGet("600 [[items/gem|Gems]]"),
    ],
    tags: ["Cosmetic", "Gems"],
    related: [
      { category: "pets", slug: "walking-leaf" },
      { category: "pets", slug: "bird" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
      { category: "heroes", slug: "archer" },
    ],
  },
  {
    slug: "walking-leaf",
    category: "pets",
    name: "Walking Leaf",
    subtitle: "Cosmetic companion, 600 Gems",
    summary:
      "The Walking Leaf is a tiny green bush on two legs that follows you around. Like every pet it cannot attack.",
    image: { src: "/ld/wiki/pets/walking-leaf.png", alt: "Walking Leaf pet sprite", pixelated: true },
    infobox: [
      { label: "Ability", value: "None (follows you, cannot attack)" },
      { label: "Quote", value: "*\"Trees love me\"*" },
      { label: "Unlock", value: "600 [[items/gem|Gems]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Walking Leaf is the second pet in the shop. Its description reads *\"Trees love me\"*, plus the note that **this pet can't attack**. It has an idle and a running animation, like Gum.",
        ],
      },
      behaviour,
      howToGet("600 [[items/gem|Gems]]"),
    ],
    tags: ["Cosmetic", "Gems"],
    related: [
      { category: "pets", slug: "gum" },
      { category: "pets", slug: "orange" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
      { category: "heroes", slug: "archer" },
    ],
  },
  {
    slug: "bird",
    category: "pets",
    name: "Bird",
    subtitle: "Cosmetic companion, 600 Gems",
    summary:
      "The Bird is a round grey bird with a yellow beak that flaps along beside you. It is purely a companion.",
    image: { src: "/ld/wiki/pets/bird.png", alt: "Bird pet sprite", pixelated: true },
    infobox: [
      { label: "Ability", value: "None (follows you, cannot attack)" },
      { label: "Quote", value: "*\"Flap Flap\"*" },
      { label: "Unlock", value: "600 [[items/gem|Gems]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Bird's description is just *\"Flap Flap\"*, followed by the note that **this pet can't attack**. Its sprite uses a wing-flapping animation rather than a walk cycle.",
        ],
      },
      behaviour,
      howToGet("600 [[items/gem|Gems]]"),
    ],
    tags: ["Cosmetic", "Gems"],
    related: [
      { category: "pets", slug: "gum" },
      { category: "pets", slug: "fox" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
      { category: "heroes", slug: "archer" },
    ],
  },
  {
    slug: "orange",
    category: "pets",
    name: "Orange",
    subtitle: "Cosmetic companion, 600 Gems",
    summary:
      "Orange is a small yellow-orange one-eyed cube on green feet that tags along with you. Its only listed feature is that it cannot attack.",
    image: { src: "/ld/wiki/pets/orange.png", alt: "Orange pet sprite", pixelated: true },
    infobox: [
      { label: "Ability", value: "None (follows you, cannot attack)" },
      { label: "Unlock", value: "600 [[items/gem|Gems]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Orange is the fourth pet in the shop list. Unlike the others, it has no quote: its description is only the note that **this pet can't attack**. It uses an idle and a running animation.",
        ],
      },
      behaviour,
      howToGet("600 [[items/gem|Gems]]"),
    ],
    tags: ["Cosmetic", "Gems"],
    related: [
      { category: "pets", slug: "walking-leaf" },
      { category: "pets", slug: "fox" },
      { category: "mechanics", slug: "hero-training" },
      { category: "items", slug: "gem" },
      { category: "heroes", slug: "archer" },
    ],
  },
  {
    slug: "fox",
    category: "pets",
    name: "Fox",
    subtitle: "Premium companion, 30 Ethernal",
    summary:
      "The Fox is the only pet bought with Ethernal. It follows you like the others, but it has extra animations: it turns its head, and falls asleep when you stand still.",
    image: { src: "/ld/wiki/pets/fox.png", alt: "Fox pet sprite", pixelated: true },
    infobox: [
      { label: "Ability", value: "None (follows you, cannot attack)" },
      { label: "Special", value: "Looks back and sleeps when idle" },
      { label: "Unlock", value: "30 [[items/ethernal]]" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Fox is the last pet in the shop and the only one that costs **[[items/ethernal]]**, the premium currency, rather than [[items/gem|Gems]]. Its description is only the note that **this pet can't attack**.",
          "Every pet is a cosmetic companion, but the Fox has the most personality, with dedicated animations for walking, jumping, looking back and sleeping.",
        ],
      },
      {
        heading: "Idle animations",
        paragraphs: [
          "When you stop and the Fox settles next to you, it plays a short head-turn animation right away, and the code allows that animation to repeat only after a random 20 to 30 seconds. After 5 seconds of standing idle it falls asleep. No other pet has these animations.",
        ],
      },
      behaviour,
      howToGet("30 [[items/ethernal|Ethernal]]"),
    ],
    tags: ["Cosmetic", "Ethernal"],
    related: [
      { category: "pets", slug: "bird" },
      { category: "pets", slug: "orange" },
      { category: "items", slug: "ethernal" },
      { category: "mechanics", slug: "hero-training" },
      { category: "mechanics", slug: "store-and-purchases" },
      { category: "heroes", slug: "archer" },
    ],
  },
];
