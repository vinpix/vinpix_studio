import type { WikiArticle, WikiImage } from "../types";

const pic = (file: string, alt: string, caption?: string): WikiImage => ({
  src: `/ld/wiki/items/${file}`,
  alt,
  caption,
});

/** Shorthand so every article below is created in the "items" category. */
const it = (a: Omit<WikiArticle, "category">): WikiArticle => ({ category: "items", ...a });

export const items: WikiArticle[] = [
  // ───────────────────────────── Currencies and pickups ─────────────────────────────
  it({
    slug: "coin",
    name: "Coin",
    subtitle: "Run currency",
    summary:
      "The gold coin you pick up inside the dungeon. It buys things in the store and at gold shrines, pays for crafting and, at the end of a run, is turned into gems.",
    image: pic("coin.png", "A gold coin", "The coin pickup."),
    infobox: [
      { label: "Type", value: "Currency (per run)" },
      { label: "Rarity", value: "[[items/item-rarity|Common]]" },
      { label: "Source", value: "[[items/chests]], enemy drops, selling" },
      { label: "Used for", value: "Store, gold shrines, crafting" },
    ],
    sections: [
      {
        heading: "Earning coins",
        bullets: [
          "Chests drop coins together with their item. The range grows with chest quality: 4-12 for a normal room chest, 3-15 for quality 1, 6-19 for quality 2 and 12-39 for the [[items/boss-chest|boss chest]]. See [[items/chests|Chests]].",
          "Enemies sometimes drop a coin. Each kill rolls one of six drop slots at random and the coin slot pays out 10% of the time, so about 1.7% of kills (derived).",
          "Every coin pickup is worth 1 coin. With the Double Coin purchase it is worth 2 (see [[mechanics/store-and-purchases|Store and purchases]]).",
        ],
      },
      {
        heading: "Spending coins",
        bullets: [
          "[[dungeons/store-room|Store room]]: potions, [[items/key|keys]], ammo and random gear.",
          "[[dungeons/shrine-rooms|Gold shrines]]: a coin price for a guaranteed rare-or-better item.",
          "[[mechanics/crafting|Crafting]]: every upgrade costs 15-45 coins on top of the item you consume.",
        ],
      },
      {
        heading: "At the end of a run",
        paragraphs: [
          "Coins do not carry over to the next run. Instead, the coins you hold when the run ends are converted into [[items/gem|gems]] at a rate of 0.15 gems per coin. See [[mechanics/run-rewards|Run rewards]].",
        ],
      },
    ],
    tags: ["Currency", "Run"],
    related: [{ category: "items", slug: "gem" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }, { category: "mechanics", slug: "store-and-purchases" }],
  }),
  it({
    slug: "gem",
    name: "Gem",
    subtitle: "Soft meta currency",
    summary:
      "The green gem is the lasting currency of the game. You earn it at the end of every run, from achievements and daily rewards, and spend it on hero training, revives and chest unlocks.",
    image: pic("gem.png", "A green gem", "The gem icon."),
    infobox: [
      { label: "Type", value: "Currency (permanent)" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]]" },
      { label: "Source", value: "Run rewards, achievements, daily rewards, rewarded ads, [[items/ethernal]] exchange" },
      { label: "Used for", value: "Hero training, revive, hub purchases" },
    ],
    sections: [
      {
        heading: "Where gems come from",
        bullets: [
          "End of run: a payout built from your [[items/coin|coins]], score, damage dealt and floors cleared. See [[mechanics/run-rewards|Run rewards]].",
          "[[mechanics/achievements|Achievements]] pay gems on most tiers.",
          "[[mechanics/daily-rewards|Daily rewards]]: the six-day cycle pays gems on four of its days.",
          "A [[mechanics/ads|rewarded ad]] in the hub store pays 70 gems each time it is watched.",
          "[[items/ethernal]] exchange: 5 Ethernal for 100 gems, 10 for 250 or 20 for 600.",
        ],
      },
      {
        heading: "What gems buy",
        bullets: [
          "Hero training at the Trainer: one stat step costs a fixed number of gems (100 for the [[heroes/archer]]). See [[mechanics/hero-training|Hero training]].",
          "A revive after dying costs 200 gems, or a [[mechanics/ads|rewarded ad]]. See [[mechanics/revive|Revive]].",
          "Instantly unlocking a [[items/reward-chests|reward chest]] and the shop in the [[dungeons/the-hub-island|hub]].",
          "Heroes, pets and cosmetics sold in the hub.",
        ],
      },
    ],
    tags: ["Currency", "Meta"],
    related: [{ category: "items", slug: "ethernal" }, { category: "mechanics", slug: "hero-training" }, { category: "mechanics", slug: "run-rewards" }, { category: "mechanics", slug: "ads" }],
  }),
  it({
    slug: "ethernal",
    name: "Ethernal",
    subtitle: "Premium currency",
    summary:
      "The rare, mostly store-bought currency. Ethernal buys premium heroes and can be exchanged for gems. A little of it also comes free from ads, daily rewards and achievements.",
    image: pic("ethernal.png", "A glowing Ethernal crystal", "The Ethernal icon."),
    infobox: [
      { label: "Type", value: "Currency (premium)" },
      { label: "Rarity", value: "[[items/item-rarity|Legendary]]" },
      { label: "Source", value: "[[dungeons/store-room|Store]] packs, rewarded ads, daily rewards, achievements, leaderboard prizes" },
      { label: "Used for", value: "Premium heroes, [[items/gem|gem]] exchange" },
    ],
    sections: [
      {
        heading: "Earning Ethernal",
        bullets: [
          "Store packs: 40, 100 and 256 Ethernal. The Starter pack also grants 100 Ethernal and a starter hero. See [[mechanics/store-and-purchases|Store and purchases]].",
          "Gift ads: up to three [[mechanics/ads|rewarded ads]] a day pay 5 Ethernal each.",
          "[[mechanics/daily-rewards|Daily rewards]]: 2 Ethernal on day 3 and 5 on day 6 of the cycle.",
          "[[mechanics/achievements|Achievements]] and the [[mechanics/leaderboard|leaderboard]] pay Ethernal on some tiers and ranks.",
        ],
      },
      {
        heading: "Spending Ethernal",
        bullets: [
          "One hero in the shop is priced in Ethernal instead of [[items/gem|gems]] (370 Ethernal for the [[heroes/plague-doctor]]).",
          "Exchange for gems: 5 for 100, 10 for 250, 20 for 600.",
        ],
      },
    ],
    tags: ["Currency", "Premium"],
    related: [{ category: "items", slug: "gem" }, { category: "mechanics", slug: "store-and-purchases" }, { category: "mechanics", slug: "daily-rewards" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "element-stone",
    name: "Element Stone",
    subtitle: "Upgrade rock",
    summary:
      "A small dark stone dropped by quality 1 chests. The run counts them as Update Rocks, the currency of per-item enchant upgrades, which are currently hidden in the item panel.",
    image: pic("element-stone.png", "A dark element stone", "The Element Stone icon."),
    infobox: [
      { label: "Type", value: "Currency (per run)" },
      { label: "Rarity", value: "[[items/item-rarity|Common]]" },
      { label: "Source", value: "Quality 1 chests" },
      { label: "Used for", value: "Item enchant upgrades (UI currently hidden)" },
    ],
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "Picking up an Element Stone adds one to the rock counter shown next to your [[items/coin|coins]]. Quality 1 [[items/chests|chests]], the reward of [[dungeons/hard-room|hard dead-end rooms]] and of the [[dungeons/bomb-rain-room|Bomb Rain]] bonus in [[dungeons/twist-rooms|twist rooms]], roll two 50% chances to drop one.",
          "The rocks are spent in the enchant panel of a weapon or [[items/armor|armor]]: each tier of an item enchant costs as many rocks as its current level. That panel is switched off in the current build because nothing in combat reads an item's own enchants; only the [[mechanics/level-up-card-picks|level-up cards]] count. See [[items/enchantments|Enchantments]].",
        ],
      },
    ],
    tags: ["Currency", "Run"],
    related: [{ category: "items", slug: "enchantments" }, { category: "items", slug: "chests" }, { category: "dungeons", slug: "hard-room" }, { category: "mechanics", slug: "level-up-card-picks" }, { category: "dungeons", slug: "bomb-rain-room" }],
  }),
  it({
    slug: "ammo-box",
    name: "Ammo Box",
    subtitle: "Ammo refill",
    summary:
      "The ammo box is sold in the dungeon store and refills the shared ammo pool that every limited gun draws from. Enemies and chests no longer drop boxes.",
    image: pic("ammo-box.png", "A bundle of arrows", "The ammo pickup icon."),
    infobox: [
      { label: "Type", value: "Money (consumable refill)" },
      { label: "Rarity", value: "[[items/item-rarity|Common]]" },
      { label: "Source", value: "Dungeon [[dungeons/store-room|store]] (fixed slot)" },
      { label: "Used for", value: "Refilling the [[mechanics/ammo-pool|shared ammo pool]]" },
    ],
    sections: [
      {
        heading: "Shared ammo pool",
        paragraphs: [
          "Guns keep their own magazine but reload from one pool that belongs to the hero: it starts a run at 1000 units. Buying a box in the [[dungeons/store-room|store]] pours 40% of the pool (400 units) back in; it is not added to the [[mechanics/inventory-and-bag|bag]].",
          "Enemies have a 45% chance on death to drop two to four loose rounds worth 10 units each. Walk close to pick them up, and when a room is cleared all rounds still on the floor fly to you. See [[mechanics/ammo-pool|Ammo pool]].",
        ],
      },
      {
        heading: "Notes",
        bullets: [
          "Cheaper-per-round guns burn through the pool slower: the cost per round is about 2.4 divided by the gun's ammo scale, clamped between 1 and 20 units (derived from the design notes).",
          "The starting [[weapons/revolver-mk-1|Revolver]] has unlimited ammo and never touches the pool.",
        ],
      },
    ],
    tags: ["Consumable", "Store"],
    related: [{ category: "mechanics", slug: "ammo-pool" }, { category: "dungeons", slug: "store-room" }, { category: "weapons", slug: "revolver-mk-1" }],
  }),
  it({
    slug: "sand-clock",
    name: "Sand Clock",
    subtitle: "Boss drop",
    summary:
      "A small hourglass that bosses drop when they die. It was the unlock currency for locked gear, and with every item now open from the start it has no remaining use.",
    image: pic("sand-clock.png", "A small golden hourglass", "The Sand Clock."),
    infobox: [
      { label: "Type", value: "Currency (legacy)" },
      { label: "Rarity", value: "[[items/item-rarity|Legendary]]" },
      { label: "Source", value: "Dropped by bosses" },
      { label: "Used for", value: "Nothing at the moment" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Every boss spawns a handful of Sand Clocks where it dies and each pickup adds one to a lifetime counter that is saved with your profile. Gear and [[mechanics/level-up-card-picks|level-up cards]] were once locked behind a Clock price, but the game now opens all items and bag slots from the first launch, and the Cultist in the [[dungeons/the-hub-island|hub]] simply answers that everything is unlocked.",
        ],
      },
    ],
    tags: ["Currency", "Legacy"],
    related: [{ category: "dungeons", slug: "the-hub-island" }, { category: "items", slug: "gem" }, { category: "buffs", slug: "sand-clock" }, { category: "mechanics", slug: "level-up-card-picks" }],
  }),

  // ───────────────────────────── Consumables ─────────────────────────────
  it({
    slug: "health-potion",
    name: "Health Potion",
    subtitle: "Consumable",
    summary:
      "The red potion that restores 30% of your maximum health. You start every run with one, and it is stackable, sold in every store and cooled down for 30 seconds after use.",
    image: pic("health-potion.png", "A red health potion", "The Health Potion."),
    infobox: [
      { label: "Type", value: "Potion" },
      { label: "Rarity", value: "[[items/item-rarity|Common]]" },
      { label: "Source", value: "Starting kit, [[dungeons/store-room|store]], enemy drops, Gauntlet rooms" },
      { label: "Heal", value: "30% of max health" },
      { label: "Cooldown", value: "30 seconds" },
    ],
    sections: [
      {
        heading: "Using it",
        bullets: [
          "Drinking heals 30% of your maximum health, or 50% if you carry [[items/more-blood|More Blood]]. A hero passive can add a little more.",
          "A one-tap potion button sits next to the weapon bar. It refuses to drink at 90% health or above, because the heal would be mostly wasted, and it shakes with a \"Health full\" message instead.",
          "Potions can also be used from the weapon wheel. Two potions share one bag cell.",
        ],
      },
      {
        heading: "Where to find them",
        bullets: [
          "Every run begins with one in the [[mechanics/inventory-and-bag|bag]], next to a [[weapons/revolver-mk-1|Revolver]] and a [[weapons/blue-sword]].",
          "The [[dungeons/store-room|store]] always keeps one in a fixed slot.",
          "Kills drop a potion on about 6% of kills (derived: a 36% roll on one of six drop slots).",
          "A Gauntlet room with two extra rounds adds a potion. See [[dungeons/gauntlet-room|Gauntlet room]].",
        ],
      },
      {
        heading: "Other healing",
        paragraphs: [
          "Besides potions the game heals you for free: 5% of your max health when a room is cleared and 30% when you arrive on a new floor above floor 1. See [[mechanics/room-clearing|Room clearing]]. Healing never touches the shield, which only recharges on its own. See [[mechanics/health-shield-and-dodge|Health, shield and dodge]].",
        ],
      },
    ],
    tags: ["Consumable", "Healing"],
    related: [{ category: "items", slug: "more-blood" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "dungeons", slug: "store-room" }, { category: "weapons", slug: "revolver-mk-1" }, { category: "mechanics", slug: "loot-drops" }],
  }),
  it({
    slug: "more-blood",
    name: "More Blood",
    subtitle: "Epic passive",
    summary:
      "A crimson shield emblem that makes every health potion restore 50% instead of 30% of your maximum health.",
    image: pic("more-blood.png", "A red shield emblem with a blood drop", "More Blood."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "Random loot (chests, shop)" },
      { label: "Effect", value: "+20% potion heal (50% total)" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "More Blood is the in-game name of the Improve Heal Potion item. While it sits in your [[mechanics/inventory-and-bag|bag]], [[items/health-potion|Health Potions]] heal 30% plus 20%, so 50% of your maximum health. It does nothing on its own and takes one bag cell, so it pairs well with a build that relies on potion stacks.",
        ],
      },
    ],
    tags: ["Passive", "Healing"],
    related: [{ category: "items", slug: "health-potion" }, { category: "items", slug: "passive-items" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "mechanics", slug: "inventory-and-bag" }],
  }),

  // ───────────────────────────── Materials and keys ─────────────────────────────
  it({
    slug: "gold",
    name: "Gold",
    subtitle: "Crafting material",
    summary:
      "The yellow ore that bosses pay out in their chest. Two Gold are needed for each upgrade from Epic to Legendary, so it is the gate to the best gear.",
    image: pic("gold.png", "A lump of gold ore", "Gold ore."),
    infobox: [
      { label: "Type", value: "Material" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/boss-chest|Boss chest]] (exactly one per chest)" },
      { label: "Used for", value: "Epic to Legendary upgrades" },
      { label: "Stack", value: "2 per bag cell" },
    ],
    sections: [
      {
        heading: "How it is used",
        paragraphs: [
          "Twelve of the roughly seventy [[items/recipes|recipes]] ask for 2 Gold on top of [[items/coin|coins]]: each is the step that turns an Epic item into a Legendary one ([[items/god-shield]], [[weapons/god-sword]], [[weapons/god-bow]], [[items/dark-magic]], [[weapons/reaper-scythe]] and so on). Every other upgrade needs only coins.",
          "The only reliable source is the [[items/boss-chest|boss chest]] left by the bosses of floors 4, 8 and 12, which always holds one Gold. A single boss therefore only covers half of one Legendary upgrade, and the first Legendary [[mechanics/crafting|craft]] is possible only after two boss kills.",
        ],
      },
    ],
    tags: ["Material", "Crafting"],
    related: [{ category: "items", slug: "boss-chest" }, { category: "mechanics", slug: "crafting" }, { category: "items", slug: "recipes" }, { category: "weapons", slug: "god-sword" }, { category: "weapons", slug: "god-bow" }],
  }),
  it({
    slug: "key",
    name: "Key",
    subtitle: "Utility item",
    summary:
      "A small golden key. Walk next to a locked chest and press the hand button to spend one and open it.",
    image: pic("key.png", "A small golden key", "The Key."),
    infobox: [
      { label: "Type", value: "Material" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]]" },
      { label: "Source", value: "[[dungeons/store-room|Store]] (fixed slot), rare enemy drop" },
      { label: "Used for", value: "Opening locked chests" },
    ],
    sections: [
      {
        heading: "Using a key",
        bullets: [
          "[[items/locked-chest|Locked chests]] only open with a key, and the key is spent by a tap on the hand button when you stand next to the [[items/chests|chest]]. Shooting or slashing the chest does not open it.",
          "A key chip appears next to your [[items/coin|coin]] counter while you carry one.",
          "On floors without a store a locked chest opens by itself when you carry no key, so the key never becomes a trap.",
          "Keys do not stack: each one occupies a bag cell.",
        ],
      },
      {
        heading: "Getting keys",
        bullets: [
          "The [[dungeons/store-room|store]] always sells one in a fixed slot.",
          "Enemies have a very small chance to drop one: a 1% roll on one of six drop slots, about 0.17% of kills (derived).",
        ],
      },
    ],
    tags: ["Material", "Utility"],
    related: [{ category: "items", slug: "locked-chest" }, { category: "dungeons", slug: "prize-room" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "iron-and-wood",
    name: "Iron and Wood",
    subtitle: "Legacy materials",
    summary:
      "Iron and Wood were the original crafting materials. After the craft diet they no longer drop from chests or enemies, and upgrades are paid in coins instead.",
    image: pic("iron-and-wood.png", "A piece of iron ore", "Iron ore."),
    infobox: [
      { label: "Type", value: "Material" },
      { label: "Rarity", value: "Iron: Rare, Wood: Common" },
      { label: "Source", value: "None any more" },
      { label: "Stack", value: "2 per bag cell" },
    ],
    sections: [
      {
        heading: "What changed",
        paragraphs: [
          "Early versions asked for Iron, Wood and several copies of the same weapon in every [[items/recipes|recipe]]. The current recipe book instead takes one base item plus [[items/coin|coins]], and [[items/chests|chests]] no longer roll either material. The items still exist in the data: their in-game description is \"Use to upgrade weapon and [[items/armor|armor]]\", and one leftover recipe converts Iron into an [[items/ammo-box|Ammo Box]]. In practice you will not see them in a normal run.",
        ],
      },
    ],
    tags: ["Material", "Legacy"],
    related: [{ category: "items", slug: "gold" }, { category: "mechanics", slug: "crafting" }, { category: "mechanics", slug: "loot-drops" }],
  }),

  // ───────────────────────────── Armor ─────────────────────────────
  it({
    slug: "armor",
    name: "Armor",
    subtitle: "Equipment overview",
    summary:
      "You wear one piece of armor at a time. It adds to your maximum health and gives a chance to dodge hits. Armor is found in chests and stores, and the best pieces are crafted.",
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Common]] to Legendary" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], [[mechanics/crafting|crafting]]" },
    ],
    sections: [
      {
        heading: "What armor does",
        bullets: [
          "Health: the armor's value is added to your maximum health. In game it shows as \"+ HP\".",
          "Miss rate: the percentage chance that an incoming hit is dodged completely. It shows as \"+ Miss rate\".",
          "Armor stacks with the hero's own health and with [[items/lucky-bone]] [[mechanics/health-shield-and-dodge|dodge]], and is shown on the item detail panel.",
          "Only the worn piece counts. Equip it from the [[mechanics/inventory-and-bag|bag]]; [[mechanics/crafting|crafting]] an upgrade of the worn armor puts the result on automatically.",
        ],
      },
      {
        heading: "The armor line",
        table: {
          columns: ["Armor", "Rarity", "Health", "Dodge", "How to get it"],
          rows: [
            ["[[items/leather-armor|Leather Armor]]", "Common", "+10", "10%", "Chests, store"],
            ["[[items/iron-armor|Iron Armor]]", "Rare", "+20", "15%", "Chests, store, [[mechanics/crafting|craft]]"],
            ["[[items/hero-armor|Hero Armor]]", "Epic", "+30", "20%", "Chests, store, craft"],
            ["[[items/crusader-helmet|Crusader Helmet]]", "Epic", "+80", "20%", "Chests, store"],
            ["[[items/golden-shield|Golden Shield]]", "Epic", "+68", "20%", "Craft only"],
            ["[[items/god-shield|God Shield I]]", "Legendary", "+150", "23%", "Craft only"],
            ["[[items/god-shield|God Shield II]]", "Legendary", "+180", "27%", "Craft only"],
          ],
        },
        paragraphs: [
          "Health values are the item's data value times 100 (derived), which matches the \"+ HP\" figure on the item panel. Pity [[items/chests|chests]] (see [[mechanics/pity-chests|Pity chests]]) give armor first when you are not wearing any.",
        ],
      },
      {
        heading: "Unobtainable variants",
        paragraphs: [
          "The game data also holds Wooden Shields (+10 to +40 HP, 2 to 8% [[mechanics/health-shield-and-dodge|dodge]]), a Dryad Shield (+60, 15%), a second [[items/golden-shield]] (+35, 12%) and two Iron Shields (+50 and +70, 7% and 9%). No loot table or [[items/recipes|recipe]] produces them, so they are not found in normal play.",
        ],
      },
    ],
    tags: ["Armor", "Overview"],
    related: [{ category: "items", slug: "leather-armor" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "items", slug: "recipes" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "leather-armor",
    name: "Leather Armor",
    subtitle: "Common armor",
    summary: "The entry-level armor: a brown leather vest that adds 10 health and a 10% dodge chance.",
    image: pic("leather-armor.png", "A brown leather armor", "Leather Armor."),
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Common]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]; pity chests when you wear no armor" },
      { label: "Health", value: "+10" },
      { label: "Dodge", value: "10%" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Leather Armor is the root of the whole [[items/armor|armor]] line. For 20 [[items/coin|coins]] it upgrades into [[items/iron-armor|Iron Armor]], and from there into [[items/hero-armor|Hero Armor]], the [[items/golden-shield|Golden Shield]] and the [[items/god-shield|God Shield]]. Because the upgrade consumes the armor you wear and equips the result, it is usually worth [[mechanics/crafting|crafting]] as soon as you have the coins.",
          "Its in-game description is \"This armor is made of leather\".",
        ],
      },
    ],
    tags: ["Armor", "Common"],
    related: [{ category: "items", slug: "armor" }, { category: "items", slug: "iron-armor" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "iron-armor",
    name: "Iron Armor",
    subtitle: "Rare armor",
    summary: "A rare steel breastplate: +20 health and a 15% dodge chance. It upgrades from Leather Armor for 20 coins.",
    image: pic("iron-armor.png", "A dark iron breastplate", "Iron Armor."),
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], craft from Leather Armor (20 [[items/coin|coins]])" },
      { label: "Health", value: "+20" },
      { label: "Dodge", value: "15%" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Iron Armor doubles the health of [[items/leather-armor]] and adds 5 points of [[mechanics/health-shield-and-dodge|dodge]]. It can be upgraded again into [[items/hero-armor|Hero Armor]] for another 20 [[items/coin|coins]].",
        ],
      },
    ],
    tags: ["Armor", "Rare"],
    related: [{ category: "items", slug: "leather-armor" }, { category: "items", slug: "hero-armor" }, { category: "dungeons", slug: "store-room" }, { category: "mechanics", slug: "health-shield-and-dodge" }],
  }),
  it({
    slug: "hero-armor",
    name: "Hero Armor",
    subtitle: "Epic armor",
    summary: "The Epic armor of the main line: +30 health and a 20% dodge chance. Its upgrade leads into the Golden Shield.",
    image: pic("hero-armor.png", "A dark red armor with a blue gem", "Hero Armor."),
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], craft from Iron Armor (20 [[items/coin|coins]])" },
      { label: "Health", value: "+30" },
      { label: "Dodge", value: "20%" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Hero Armor is the last [[items/armor|armor]] you can find in loot that sits on the [[mechanics/crafting|craft]] path. For 35 [[items/coin|coins]] it becomes the [[items/golden-shield|Golden Shield]], which carries more than double the health. Its description in game reads \"This armor is made of gold\".",
        ],
      },
    ],
    tags: ["Armor", "Epic"],
    related: [{ category: "items", slug: "iron-armor" }, { category: "items", slug: "golden-shield" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "crusader-helmet",
    name: "Crusader Helmet",
    subtitle: "Epic armor",
    summary: "A white knight's helmet with a golden cross: +80 health and a 20% dodge chance, the strongest armor you can pick up from loot.",
    image: pic("crusader-helmet.png", "A white helmet with a yellow cross", "Crusader Helmet."),
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Health", value: "+80" },
      { label: "Dodge", value: "20%" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Crusader Helmet sits outside the [[mechanics/crafting|craft]] chain: nothing upgrades into it and it has no [[items/recipes|recipe]] of its own. That makes it a lucky find, because its +80 health is better than [[items/hero-armor]]'s +30 and close to a crafted [[items/golden-shield]]. It shares the single [[items/armor|armor]] slot with the rest of the line.",
        ],
      },
    ],
    tags: ["Armor", "Epic"],
    related: [{ category: "items", slug: "armor" }, { category: "items", slug: "hero-armor" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "golden-shield",
    name: "Golden Shield",
    subtitle: "Epic armor (craft only)",
    summary: "A heavy craft-only armor with +68 health and 20% dodge, made from Hero Armor for 35 coins. It is the step before the Legendary God Shield.",
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "Craft from Hero Armor (35 [[items/coin|coins]])" },
      { label: "Health", value: "+68" },
      { label: "Dodge", value: "20%" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The Golden Shield does not drop. You reach it by [[mechanics/crafting|crafting]] [[items/hero-armor|Hero Armor]], and it in turn becomes the [[items/god-shield|God Shield]] for 45 [[items/coin|coins]] and 2 [[items/gold|Gold]]. In game it is described as \"The shield is made of gold\".",
        ],
      },
    ],
    tags: ["Armor", "Epic", "Crafted"],
    related: [{ category: "items", slug: "hero-armor" }, { category: "items", slug: "god-shield" }, { category: "mechanics", slug: "crafting" }, { category: "mechanics", slug: "health-shield-and-dodge" }],
  }),
  it({
    slug: "god-shield",
    name: "God Shield",
    subtitle: "Legendary armor (craft only)",
    summary: "The best armor in the game. God Shield I gives +150 health and 23% dodge, and God Shield II +180 and 27%. Both are crafted, and the first needs two Gold.",
    infobox: [
      { label: "Type", value: "Armor" },
      { label: "Rarity", value: "[[items/item-rarity|Legendary]]" },
      { label: "Source", value: "Craft from Golden Shield (45 [[items/coin|coins]] + 2 [[items/gold]]), then upgrade once more (45 coins)" },
      { label: "Health", value: "+150 (I), +180 (II)" },
      { label: "Dodge", value: "23% (I), 27% (II)" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The God Shield is the end of the [[items/armor|armor]] chain: [[items/leather-armor]], [[items/iron-armor]], [[items/hero-armor]], [[items/golden-shield]], God Shield I, God Shield II. The step into God Shield I is one of the twelve [[items/recipes|recipes]] that need [[items/gold|Gold]], and because Gold only comes from [[items/boss-chest|boss chests]] the earliest you can finish it is after the boss on floor 8. Making God Shield II costs [[items/coin|coins]] only.",
        ],
      },
    ],
    tags: ["Armor", "Legendary", "Crafted"],
    related: [{ category: "items", slug: "golden-shield" }, { category: "items", slug: "gold" }, { category: "mechanics", slug: "crafting" }, { category: "mechanics", slug: "health-shield-and-dodge" }],
  }),

  // ───────────────────────────── Artifacts ─────────────────────────────
  it({
    slug: "artifacts",
    name: "Artifacts",
    subtitle: "Active items",
    summary:
      "Artifacts are books, scrolls and charms with an active effect on a cooldown. Two of them can be equipped at once and are triggered from the buttons on the HUD.",
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]] to Legendary" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], [[mechanics/crafting|crafting]]" },
      { label: "Slots", value: "2 equipped at a time" },
    ],
    sections: [
      {
        heading: "How artifacts work",
        bullets: [
          "Only two artifacts can be equipped, and they sit in the two skill slots next to the weapon bar. A third automatically replaces one of them.",
          "Each artifact has its own cooldown, listed in the table below, and the slot shows a fill ring while it recharges.",
          "Hero skills (the hats, a meteorite, leaves and similar) are artifacts too. They are handed to a hero automatically, never drop, and are not sold or offered as loot.",
        ],
      },
      {
        heading: "Artifact list",
        table: {
          columns: ["Artifact", "Rarity", "Cooldown", "Effect"],
          rows: [
            ["[[items/magic-book|Magic Book]]", "Epic", "30 s", "Summons a helper that fights for you"],
            ["[[items/dark-magic|Dark Magic]]", "Legendary", "25 s", "A powerful magic ball"],
            ["[[items/power-amulet|Power Amulet]]", "Rare", "30 s", "Damage boost for 10 s"],
            ["[[items/teleport-book|Teleport Book]]", "Epic", "2 s", "Teleports you to an enemy"],
            ["[[items/shield-spell|Shield Spell]]", "Epic", "15 s", "50% less damage for 5 s"],
            ["[[items/heal-book|Heal Book]]", "Epic", "35 s", "Restores 50% health"],
            ["[[items/knight-scroll|Scroll]]", "Epic / Legendary", "30 s", "Summons a knight"],
            ["[[items/magic-pillar|Magic Pillar]]", "Epic", "30 s", "Builds a damage turret"],
          ],
        },
        paragraphs: ["Cooldowns come from the game's item data. Descriptions are the in-game ones."],
      },
    ],
    tags: ["Artifact", "Overview"],
    related: [{ category: "items", slug: "magic-book" }, { category: "items", slug: "passive-items" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "magic-book",
    name: "Magic Book",
    subtitle: "Epic artifact",
    summary: "A teal spell book whose in-game description is \"Summon your friend\". It recharges in 30 seconds and upgrades into the Legendary Dark Magic.",
    image: pic("magic-book.png", "A teal spell book", "Magic Book."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Cooldown", value: "30 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Use it from a skill slot to call a magical ally for a short fight. [[mechanics/crafting]] it with 45 [[items/coin|coins]] and 2 [[items/gold|Gold]] turns it into [[items/dark-magic|Dark Magic]]. A separate, non-loot Legendary book with the same icon exists for a healing effect.",
        ],
      },
    ],
    tags: ["Artifact", "Epic"],
    related: [{ category: "items", slug: "dark-magic" }, { category: "items", slug: "artifacts" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "dark-magic",
    name: "Dark Magic",
    subtitle: "Legendary artifact",
    summary: "A purple orb that, per its description, summons a powerful magic ball causing huge damage. It has the shortest cooldown of the damage artifacts at 25 seconds.",
    image: pic("dark-magic.png", "A purple glowing orb", "Dark Magic."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Legendary]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], craft from Magic Book (45 [[items/coin|coins]] + 2 [[items/gold]])" },
      { label: "Cooldown", value: "25 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Dark Magic is the top of the [[items/magic-book|Magic Book]] line. It is the only [[items/artifacts|artifact]] whose job is pure burst damage, so it suits builds that keep their weapons for chip damage and save the orb for a boss phase.",
        ],
      },
    ],
    tags: ["Artifact", "Legendary"],
    related: [{ category: "items", slug: "magic-book" }, { category: "items", slug: "gold" }, { category: "mechanics", slug: "crafting" }, { category: "mechanics", slug: "inventory-and-bag" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "power-amulet",
    name: "Power Amulet",
    subtitle: "Rare artifact",
    summary: "A red-gem necklace that increases your damage over a period of time: a 10 second boost every 30 seconds.",
    image: pic("power-amulet.png", "A necklace with a red gem", "Power Amulet."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Duration", value: "10 seconds" },
      { label: "Cooldown", value: "30 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Activate it before a fight starts to cover the opening seconds with extra damage. Its description in game is \"Increase your damage over a period of time\", and the item data lists a power multiplier of 0.5.",
        ],
      },
    ],
    tags: ["Artifact", "Rare"],
    related: [{ category: "items", slug: "artifacts" }, { category: "items", slug: "shield-spell" }, { category: "mechanics", slug: "inventory-and-bag" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "teleport-book",
    name: "Teleport Book",
    subtitle: "Epic artifact",
    summary: "A black book that teleports you to a monster. The upgraded Teleport Book 2 teleports you to the enemy and also increases your first attack.",
    image: pic("teleport-book.png", "A black book with a golden cross", "Teleport Book."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], craft to Teleport Book 2 (30 [[items/coin|coins]])" },
      { label: "Cooldown", value: "2 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The cooldown is only 2 seconds, which makes the book a gap closer and an escape tool rather than a damage button. Teleport Book 2 keeps the cooldown but adds the first-attack bonus, and is made by [[mechanics/crafting|crafting]] the first book for 30 [[items/coin|coins]].",
        ],
      },
    ],
    tags: ["Artifact", "Epic", "Movement"],
    related: [{ category: "items", slug: "artifacts" }, { category: "items", slug: "recipes" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "shield-spell",
    name: "Shield Spell",
    subtitle: "Epic artifact",
    summary: "A red tome that cuts the damage you take by 50% for 5 seconds. It recharges in 15 seconds.",
    image: pic("shield-spell.png", "A red spell book", "Shield Spell."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Duration", value: "5 seconds" },
      { label: "Cooldown", value: "15 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The best [[items/artifacts|artifact]] for boss fights: popped just before a heavy attack it halves everything you take for five seconds, and it is back before the next big phase. It is also one of the few ways to stay alive without spending potions.",
        ],
      },
    ],
    tags: ["Artifact", "Epic", "Defense"],
    related: [{ category: "items", slug: "artifacts" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "buffs", slug: "shield" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "heal-book",
    name: "Heal Book",
    subtitle: "Epic artifact",
    summary: "A violet healing book that restores half of your health on a 35-second cooldown.",
    image: pic("heal-book.png", "A purple healing book with a green skull", "Heal Book."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Heal", value: "50% of health" },
      { label: "Cooldown", value: "35 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Heal Book 2 is the loot version: a rechargeable half-heal that works alongside, not instead of, [[items/health-potion|Health Potions]]. A weaker 25% version exists in the data but is not offered as loot.",
        ],
      },
    ],
    tags: ["Artifact", "Epic", "Healing"],
    related: [{ category: "items", slug: "health-potion" }, { category: "items", slug: "artifacts" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "knight-scroll",
    name: "Scroll",
    subtitle: "Epic to Legendary artifact",
    summary: "A rolled scroll that summons a knight to fight for you. It upgrades twice: Epic, Epic II (30 coins), then Legendary (45 coins + 2 Gold).",
    image: pic("knight-scroll.png", "A rolled parchment scroll", "The Scroll."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]], Epic II, Legendary" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], [[mechanics/crafting|crafting]]" },
      { label: "Cooldown", value: "30 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The description in game is \"Summon a Knight that fight for you\". The scroll keeps the same cooldown through its upgrades; the chain is listed in [[items/recipes|Recipes]].",
        ],
      },
    ],
    tags: ["Artifact", "Epic", "Summon"],
    related: [{ category: "items", slug: "artifacts" }, { category: "items", slug: "recipes" }, { category: "buffs", slug: "knight" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "magic-pillar",
    name: "Magic Pillar",
    subtitle: "Epic artifact",
    summary: "A blue crystal pillar that creates a magic turret which damages nearby monsters. It recharges in 30 seconds.",
    image: pic("magic-pillar.png", "A blue crystal pillar", "Magic Pillar."),
    infobox: [
      { label: "Type", value: "Artifact" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Cooldown", value: "30 seconds" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Place the turret before a wave and keep moving: it damages monsters near it without your input, which suits builds with long reloads.",
        ],
      },
    ],
    tags: ["Artifact", "Epic", "Summon"],
    related: [{ category: "items", slug: "artifacts" }, { category: "items", slug: "knight-scroll" }, { category: "enemies", slug: "bestiary-overview" }, { category: "mechanics", slug: "inventory-and-bag" }, { category: "dungeons", slug: "store-room" }],
  }),

  // ───────────────────────────── Passive items ─────────────────────────────
  it({
    slug: "passive-items",
    name: "Passive Items",
    subtitle: "Always-on bag items",
    summary:
      "Passive items work simply by sitting in your bag. Many are pure upgrades, and a few are deliberate trade-offs that the random loot tables no longer hand out.",
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Common]] to Legendary" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], [[mechanics/crafting|crafting]]" },
    ],
    sections: [
      {
        heading: "How they work",
        paragraphs: [
          "A passive item has no button and no cooldown. As long as it is in the [[mechanics/inventory-and-bag|bag]], its effect applies, and it takes one bag cell like anything else. The item panel labels them \"Passive Spell\".",
        ],
      },
      {
        heading: "Passive list",
        table: {
          columns: ["Passive", "Rarity", "Effect"],
          rows: [
            ["[[items/eye|Eye]]", "Rare", "Wider view while carried"],
            ["[[items/bouncy-bullet|Bouncy Bullet Spell]]", "Rare, Epic", "Bullets bounce +1 or +2 times"],
            ["[[items/lucky-bone|Lucky Bone]]", "Rare", "+5% or +8% dodge"],
            ["[[items/cursed-skull|Cursed Skull]]", "Rare, Epic, Legendary", "More damage dealt and taken"],
            ["[[items/turtle-bullet|Turtle Bullet]]", "Epic", "Enemy bullets slowed 10% or 20%"],
            ["[[items/more-blood|More Blood]]", "Epic", "Potions heal 50%"],
            ["[[items/lazy-turtle|Lazy Turtle]]", "Legendary", "-30% speed, 30% dodge"],
            ["[[items/heavy-shield|Heavy Shield]]", "Common", "+25% [[items/armor|armor]], half shield recovery"],
          ],
        },
        paragraphs: [
          "Three more exist in the data without a place in normal loot: Energy Shell (converts [[mechanics/health-shield-and-dodge|shield]] energy into health), Curse Bullets (more ammo damage, less accuracy, unreleased) and the Merchant discount charms. Random rolls ([[items/chests|chests]], store and [[dungeons/shrine-rooms|gold shrines]]) deliberately skip Cursed Skull, Lazy Turtle, Heavy Shield and Curse Bullets because they punish more than they reward; you only get them from [[mechanics/crafting|crafting]] or hand-placed rewards such as the [[dungeons/curse-room|Curse Room]].",
        ],
      },
    ],
    tags: ["Passive", "Overview"],
    related: [{ category: "items", slug: "cursed-skull" }, { category: "items", slug: "artifacts" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "store-room" }, { category: "mechanics", slug: "health-shield-and-dodge" }],
  }),
  it({
    slug: "eye",
    name: "Eye",
    subtitle: "Rare passive",
    summary: "A glowing orange eyeball that increases your visibility: the camera zooms out while you carry it.",
    image: pic("eye.png", "A large orange eyeball", "The Eye."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], [[dungeons/shrine-rooms|gold shrines]]" },
      { label: "Effect", value: "Increased visibility" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The item description is \"Increase visibility when you have this item in your [[mechanics/inventory-and-bag|bag]]\". The camera controller multiplies the normal zoom by 1.25 while it is in your bag, so you see about a quarter more of the room, which helps against ranged enemies you would otherwise meet off-screen.",
        ],
      },
    ],
    tags: ["Passive", "Rare", "Utility"],
    related: [{ category: "items", slug: "passive-items" }, { category: "dungeons", slug: "store-room" }, { category: "mechanics", slug: "inventory-and-bag" }, { category: "dungeons", slug: "shrine-rooms" }],
  }),
  it({
    slug: "bouncy-bullet",
    name: "Bouncy Bullet Spell",
    subtitle: "Rare to Epic passive",
    summary: "A talisman that gives your bullets +1 bounce, or +2 bounces in its Epic form. The upgrade costs 30 coins.",
    image: pic("bouncy-bullet.png", "A red talisman charm", "Bouncy Bullet Spell."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]], then Epic" },
      { label: "Source", value: "[[items/chests]], [[mechanics/crafting|crafting]] (30 [[items/coin|coins]] for the Epic form)" },
      { label: "Effect", value: "+1 / +2 bullet bounces" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Its description reads \"This talisman will give +1 the bounce of the bullet\" (+2 for the Epic version). Bounces let shots ricochet off walls toward enemies behind cover, which makes the talisman a good pair for the weak-but-fast guns.",
        ],
      },
    ],
    tags: ["Passive", "Rare", "Epic"],
    related: [{ category: "items", slug: "passive-items" }, { category: "items", slug: "recipes" }, { category: "weapons", slug: "uzi" }, { category: "mechanics", slug: "ammo-pool" }, { category: "mechanics", slug: "crafting" }],
  }),
  it({
    slug: "lucky-bone",
    name: "Lucky Bone",
    subtitle: "Rare passive",
    summary: "A small bone charm that adds 5% to your dodge chance, or 8% after its 20-coin upgrade.",
    image: pic("lucky-bone.png", "A small bone", "Lucky Bone."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], craft to the second version (20 [[items/coin|coins]])" },
      { label: "Dodge", value: "+5% (I), +8% (II)" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The bonus stacks on top of your [[items/armor|armor]]'s dodge and is added straight to the same hit-avoid roll, so [[items/hero-armor]] plus Lucky Bone II gives 28%. See [[mechanics/health-shield-and-dodge|Health, shield and dodge]].",
        ],
      },
    ],
    tags: ["Passive", "Rare", "Defense"],
    related: [{ category: "items", slug: "armor" }, { category: "items", slug: "lazy-turtle" }, { category: "dungeons", slug: "store-room" }, { category: "mechanics", slug: "health-shield-and-dodge" }],
  }),
  it({
    slug: "cursed-skull",
    name: "Cursed Skull",
    subtitle: "Trade-off passive",
    summary: "A flaming skull that multiplies the damage of your shots and the damage you take. Three tiers exist: x1.5 and x1.5, x2 and x2, then x3 dealt and x4 taken.",
    image: pic("cursed-skull.png", "A skull with a flame on top", "Cursed Skull."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Rare]], Epic, Legendary" },
      { label: "Source", value: "Curse Room, [[mechanics/crafting|crafting]]" },
      { label: "Damage dealt", value: "x1.5 / x2 / x3" },
      { label: "Damage taken", value: "x1.5 / x2 / x4" },
    ],
    sections: [
      {
        heading: "Tiers",
        table: {
          columns: ["Tier", "Rarity", "You deal", "You take", "Upgrade"],
          rows: [
            ["I", "Rare", "150%", "150%", "30 [[items/coin|coins]]"],
            ["II", "Epic", "200%", "200%", "45 coins + 2 [[items/gold]]"],
            ["III", "Legendary", "300%", "400%", "-"],
          ],
        },
        paragraphs: [
          "The in-game text is \"Deals more damage but takes more damage in return\". The tier III multiplier on damage taken is bigger than the one on damage dealt, so the skull turns a run into a glass-cannon gamble. It never drops from random [[items/chests|chests]], stores or [[dungeons/shrine-rooms|gold shrines]]; the [[dungeons/curse-room|Curse Room]] hands one out in exchange for a curse.",
        ],
      },
    ],
    tags: ["Passive", "Trade-off"],
    related: [{ category: "dungeons", slug: "curse-room" }, { category: "items", slug: "passive-items" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "shrine-rooms" }],
  }),
  it({
    slug: "turtle-bullet",
    name: "Turtle Bullet",
    subtitle: "Epic passive",
    summary: "A shelled charm that slows enemy bullets by 10%, or by 20% in the second version. Slower shots are easier to read and sidestep.",
    image: pic("turtle-bullet.png", "A small turtle charm", "Turtle Bullet."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Epic]]" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]]" },
      { label: "Effect", value: "Enemy bullets -10% / -20% speed" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Turtle Bullet only changes the speed of bullets fired at you, not your own. Two versions exist (Turtle Bullet and Turtle Bullet II), and either one slows the shots of every ranged enemy and boss on screen.",
        ],
      },
    ],
    tags: ["Passive", "Epic", "Defense"],
    related: [{ category: "items", slug: "passive-items" }, { category: "items", slug: "lazy-turtle" }, { category: "enemies", slug: "bestiary-overview" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "lazy-turtle",
    name: "Lazy Turtle",
    subtitle: "Trade-off passive",
    summary: "Slows your movement by 30% but gives you a 30% chance to dodge every hit. Never offered by random rolls.",
    image: pic("lazy-turtle.png", "An old boot-shaped charm", "Lazy Turtle."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Legendary]]" },
      { label: "Source", value: "Placed rewards only" },
      { label: "Effect", value: "-30% speed, 30% dodge" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The item text is \"30% movement speed reduction but you have 30% [[mechanics/health-shield-and-dodge|dodge]] damage\". The dodge is an extra roll in front of the normal [[items/armor|armor]] and [[items/lucky-bone]] roll, so a worn armor still adds its own chance. It is on the list of trade-off items that [[items/chests|chests]], stores and [[dungeons/shrine-rooms|shrines]] skip.",
        ],
      },
    ],
    tags: ["Passive", "Legendary", "Trade-off"],
    related: [{ category: "items", slug: "lucky-bone" }, { category: "items", slug: "heavy-shield" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "dungeons", slug: "shrine-rooms" }],
  }),
  it({
    slug: "heavy-shield",
    name: "Heavy Shield",
    subtitle: "Trade-off passive",
    summary: "Raises your shield capacity by 25% but halves how fast the shield recovers.",
    image: pic("heavy-shield.png", "A round blue shield", "Heavy Shield."),
    infobox: [
      { label: "Type", value: "Passive item" },
      { label: "Rarity", value: "[[items/item-rarity|Common]]" },
      { label: "Source", value: "Placed rewards only" },
      { label: "Effect", value: "+25% shield, -50% recovery" },
    ],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The in-game text says \"Increases [[items/armor|armor]] by 25% but reduces armor recovery by 50%\". The armor in question is the energy shield, the blue bar below your health. It suits slow, careful play where the shield rarely needs to refill mid-fight. See [[mechanics/health-shield-and-dodge|Health, shield and dodge]].",
        ],
      },
    ],
    tags: ["Passive", "Trade-off"],
    related: [{ category: "items", slug: "passive-items" }, { category: "mechanics", slug: "health-shield-and-dodge" }, { category: "mechanics", slug: "inventory-and-bag" }],
  }),

  // ───────────────────────────── Chests ─────────────────────────────
  it({
    slug: "chests",
    name: "Chests",
    subtitle: "Loot containers",
    summary:
      "Every cleared room leaves a chest. Chests come in four qualities, each with its own item chance, rarity odds and coin range, and their look changes with the quality.",
    image: pic("chests.png", "Four chests of rising quality", "Chest quality 0 to 3, left to right."),
    infobox: [
      { label: "Type", value: "Container" },
      { label: "Rarity", value: "Quality 0 to 3" },
      { label: "Source", value: "Cleared rooms, [[dungeons/prize-room|Prize rooms]], bosses, the hub" },
    ],
    sections: [
      {
        heading: "Quality tiers",
        table: {
          columns: ["Quality", "Item chance", "Rarity odds (C/R/E/L)", "Coins", "Extras", "Where it appears"],
          rows: [
            ["0", "80%", "80 / 15 / 5 / 0", "4-12", "None", "Normal room clear, most Prize chests"],
            ["1", "70%", "35 / 55 / 10 / 0", "3-15", "Two 50% chances of an [[items/element-stone]]", "Clear chest of a [[dungeons/hard-room|hard dead-end room]], [[dungeons/bomb-rain-room|Bomb Rain]] bonus chest"],
            ["2", "80%", "10 / 40 / 40 / 10", "6-19", "None", "[[dungeons/elite-room|Elite room]] clear chest, [[dungeons/gauntlet-room|Gauntlet]] and Champion bonus chests, rare Prize chests"],
            ["3", "100%", "Epic or better only", "12-39", "Exactly 1 [[items/gold]]", "[[items/boss-chest|Boss chest]]"],
          ],
        },
        paragraphs: [
          "The item roll only draws gear: weapons, [[items/armor|armor]], [[items/artifacts|artifacts]] and [[items/passive-items|passive items]], never potions, [[items/coin|coins]] or materials. Trade-off items ([[items/cursed-skull]], [[items/lazy-turtle]], [[items/heavy-shield]]) are skipped too. Odds are the current design preset; the first column of the odds is the chance of Common.",
        ],
      },
      {
        heading: "Opening a chest",
        bullets: [
          "Regular chests break when you hit them. A chest that has just spawned ignores stray bullets for a moment, so the end of a fight does not pop it for you.",
          "A chest appears at a spot in the cleared room rather than where the last enemy died.",
          "Chests drop a pile of [[items/coin|coins]] and a single item, which spreads out around the chest.",
          "In [[mechanics/co-op-multiplayer|co-op]] every player rolls and receives their own loot from a chest.",
        ],
      },
      {
        heading: "Special chests",
        bullets: [
          "[[items/boss-chest|Boss chest]]: quality 3, a guaranteed Epic or Legendary and one [[items/gold]].",
          "[[items/locked-chest|Locked chest]]: needs a [[items/key|key]].",
          "[[items/reward-chests|Reward chests]]: the timed chests of the [[dungeons/the-hub-island|hub]], filled from the run-end chest pieces.",
          "[[dungeons/prize-room|Prize room]] chests roll their own quality: roughly 72% quality 0, 18% quality 1, 7% quality 2 and 3% quality 3 (derived from the sequential 70/60/60/60 rolls).",
        ],
      },
      {
        heading: "Pity",
        paragraphs: [
          "If your gear is weak and several chests in a row give nothing better, a chest is forced to hold an upgrade. See [[mechanics/pity-chests|Pity chests]].",
        ],
      },
    ],
    tags: ["Chest", "Loot"],
    related: [{ category: "items", slug: "boss-chest" }, { category: "items", slug: "locked-chest" }, { category: "mechanics", slug: "pity-chests" }, { category: "dungeons", slug: "prize-room" }, { category: "mechanics", slug: "co-op-multiplayer" }],
  }),
  it({
    slug: "boss-chest",
    name: "Boss Chest",
    subtitle: "Quality 3 chest",
    summary:
      "The big golden chest left by the bosses on floors 4, 8 and 12. It always contains an Epic or Legendary item, a pile of coins and one Gold.",
    image: pic("chests.png", "Four chests of rising quality", "The golden chest on the right is quality 3."),
    infobox: [
      { label: "Type", value: "Container" },
      { label: "Rarity", value: "Quality 3" },
      { label: "Source", value: "[[dungeons/boss-floors|Boss floors]]" },
      { label: "Contents", value: "1 Epic or Legendary item, 12-39 [[items/coin|coins]], 1 [[items/gold]]" },
    ],
    sections: [
      {
        heading: "Contents",
        bullets: [
          "Item: always present, Epic or better. With the 40 and 35 rarity weights left after the Common and Rare entries are cut, that is about 53% Epic and 47% Legendary (derived).",
          "Coins: between 12 and 39.",
          "Gold: exactly one. It is the only steady source of [[items/gold|Gold]], which gates the Epic to Legendary [[items/recipes|recipes]].",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Because [[mechanics/crafting|crafting]] a Legendary needs two [[items/gold]], you can only finish your first Legendary upgrade after the second boss. Plan ahead: if you hold an Epic you want to upgrade, keep the Gold for it. See [[dungeons/boss-floors|Boss floors]].",
        ],
      },
    ],
    tags: ["Chest", "Boss"],
    related: [{ category: "items", slug: "gold" }, { category: "dungeons", slug: "boss-floors" }, { category: "items", slug: "chests" }, { category: "mechanics", slug: "crafting" }],
  }),
  it({
    slug: "locked-chest",
    name: "Locked Chest",
    subtitle: "Chest with a padlock",
    summary:
      "A chest bearing a padlock. It needs a Key, and the key is spent when you press the hand button next to it.",
    image: { src: "/ld/wiki/items/locked-chest.jpg", alt: "A locked chest in a Prize room with a hint line", caption: "A locked chest in a Prize room: stand next to it and tap the hand button." },
    infobox: [
      { label: "Type", value: "Container" },
      { label: "Rarity", value: "Quality of the chest it sits on" },
      { label: "Source", value: "[[dungeons/prize-room|Prize rooms]]" },
      { label: "Opened with", value: "A Key" },
    ],
    sections: [
      {
        heading: "How to open it",
        bullets: [
          "Stand next to the [[items/chests|chest]]. The hand button appears and a line tells you whether you hold a key.",
          "Tap the hand button. One [[items/key|Key]] is spent, the padlock shatters and the chest opens.",
          "Shooting or slashing the chest does nothing. A line reminds you of that if you try.",
          "Without a key the line says to buy one in the [[dungeons/store-room|store]], or that the floor has no store.",
          "On floors with no store a locked chest unlocks itself if you carry no key.",
        ],
      },
      {
        heading: "Where they are",
        paragraphs: [
          "Locked chests live in the quiet [[dungeons/prize-room|Prize rooms]]. Some Prize room [[items/chests|chests]] carry a padlock (a randomly locked chest is locked half of the time). On the minimap the Prize room of a still-locked chest is tinted orange so you know where to spend a [[items/key|key]].",
        ],
      },
    ],
    tags: ["Chest", "Key"],
    related: [{ category: "items", slug: "key" }, { category: "dungeons", slug: "prize-room" }, { category: "items", slug: "chests" }, { category: "dungeons", slug: "store-room" }],
  }),
  it({
    slug: "reward-chests",
    name: "Reward Chests",
    subtitle: "Hub timer chests",
    summary:
      "The three chests on the hub island. Finishing runs earns chest pieces, three pieces unlock a chest, and each chest then needs two or three real-time hours to open.",
    infobox: [
      { label: "Type", value: "Container" },
      { label: "Rarity", value: "Level 1 or 2" },
      { label: "Source", value: "Run-end chest pieces" },
      { label: "Timer", value: "2 hours (level 1) or 3 hours (level 2)" },
    ],
    sections: [
      {
        heading: "Earning chests",
        bullets: [
          "A run pays one [[items/chests|chest]] piece for each floor you cleared, at most 13 for a win. Three pieces fill the progress bar and unlock one chest.",
          "Spare pieces stay on the counter. If all three slots are taken, up to five more pieces are kept for later.",
          "Each unlocked chest is level 1 (70%) or level 2 (30%).",
        ],
      },
      {
        heading: "Opening them",
        bullets: [
          "There are three [[items/chests|chest]] slots on the island. Hit a ready chest to break it open.",
          "A level 1 chest takes 2 hours and a level 2 chest takes 3 hours. A [[mechanics/ads|rewarded ad]], or [[items/gem|gems]], opens a chest right away.",
          "A phone notification tells you when one is ready.",
          "The contents use the same chest tables as the dungeon but with the original (pre-rebalance) numbers.",
        ],
      },
    ],
    tags: ["Chest", "Hub", "Timer"],
    related: [{ category: "mechanics", slug: "run-rewards" }, { category: "dungeons", slug: "the-hub-island" }, { category: "mechanics", slug: "ads" }],
  }),

  // ───────────────────────────── Enchantments and crafting ─────────────────────────────
  it({
    slug: "enchantments",
    name: "Enchantments",
    subtitle: "Powers and item slots",
    summary:
      "Enchantments are the named powers you raise each run through level-up cards and blood shrines, and an older per-item slot system whose panel is currently hidden.",
    infobox: [
      { label: "Type", value: "Power / modifier" },
      { label: "Rarity", value: "Tiered (usually three levels)" },
      { label: "Source", value: "Level-up cards, Blood shrines" },
    ],
    sections: [
      {
        heading: "Run-wide enchantments",
        paragraphs: [
          "The catalog holds about 37 enchantments, among them [[buffs/dynamo|Dynamo]], [[buffs/shockwave|Shockwave]], [[buffs/looting|Looting]], [[buffs/thundering|Thundering]], [[buffs/fire|Fire]], [[buffs/stun|Stun]], [[buffs/sharpness|Sharpness]], [[buffs/poison|Poison]], [[buffs/rampaging|Rampaging]], [[buffs/knight|Knight]], [[buffs/freezing|Freezing]], [[buffs/supercharge|Supercharge]], [[buffs/piercing|Piercing]], Regeneration and [[buffs/swiftfooted|Swiftfooted]]. Each is a tiered upgrade (the first is level 1, up to three tiers) tied to gun, sword, both or [[items/armor|armor]], and they apply to the whole run, not to one weapon. They are offered as three-card choices when you arrive on floors 2, 3, 5, 7, 9 and 11, and a Blood shrine can raise one more. See [[mechanics/level-up-card-picks|Level-up card picks]] and [[dungeons/shrine-rooms|Shrine rooms]]. The detail of each card lives in the Buffs and Cards section of the wiki.",
        ],
      },
      {
        heading: "Per-item enchant slots",
        paragraphs: [
          "Weapons and [[items/armor|armor]] also carry enchant slots: Common and Rare items one, Epic two and Legendary three, with one to three possible enchants per slot. Upgrading them costs [[items/element-stone|Element Stones]]. In the current build the Enchant button and its \"can upgrade\" badge are hidden, because nothing in combat reads an item's own enchants and the tab only suggested a benefit that did not exist.",
        ],
      },
      {
        heading: "Locking",
        paragraphs: ["A few enchantments used to be locked behind [[items/sand-clock|Sand Clocks]]. The game now opens everything from the start, so all are available."],
      },
    ],
    tags: ["Enchantment", "Cards"],
    related: [{ category: "mechanics", slug: "level-up-card-picks" }, { category: "items", slug: "element-stone" }, { category: "dungeons", slug: "shrine-rooms" }, { category: "buffs", slug: "dynamo" }],
  }),
  it({
    slug: "recipes",
    name: "Recipes",
    subtitle: "Blueprint book",
    summary:
      "Every upgrade in the game, in chains. Each recipe consumes one item you hold and some coins, and the twelve Epic to Legendary steps also take 2 Gold.",
    infobox: [
      { label: "Type", value: "Blueprints" },
      { label: "Rarity", value: "All" },
      { label: "Source", value: "The recipe book in your bag" },
    ],
    sections: [
      {
        heading: "How recipes read",
        bullets: [
          "Format: result, the single item that is consumed, and the cost in [[items/coin|coins]]. Steps marked +2 Gold need two [[items/gold|Gold]].",
          "Items with the same name at different rarities appear in game with roman numerals (for example [[weapons/wooden-sword-ii|Wooden Sword]] I to IV).",
          "A recipe never lowers your weapon's damage and never changes its family: swords stay swords.",
          "See [[mechanics/crafting|Crafting]] for how to craft, where, and what happens to your equipped item.",
        ],
      },
      {
        heading: "Upgrade chains",
        table: {
          columns: ["Family", "Chain (coins; Gold)"],
          rows: [
            ["[[items/armor|Armor]]", "[[items/leather-armor|Leather Armor]], Common - 20 - [[items/iron-armor|Iron Armor]], Rare - 20 - [[items/hero-armor|Hero Armor]], Epic - 35 - [[items/golden-shield|Golden Shield]], Epic - 45 and 2 [[items/gold]] - [[items/god-shield|God Shield]] I, Legendary - 45 - God Shield II"],
            ["Crossbows", "[[weapons/wooden-crossbow-ii|Wooden Crossbow II]], Common - 15 - [[weapons/wooden-crossbow-iv|Wooden Crossbow IV]], Rare - 15 - [[weapons/dryad-crossbow|Dryad Crossbow]], Epic - 45 and 2 Gold - [[weapons/god-crossbow|God Crossbow]], Legendary. [[weapons/golden-crossbow-mk-1|Golden Crossbow (Mk 1)]], Rare - 15 - [[weapons/golden-crossbow-mk-2|Golden Crossbow (Mk 2)]]. [[weapons/king-crossbow-mk-1|King Crossbow (Mk 1)]], Epic - 20 - [[weapons/king-crossbow-mk-2|King Crossbow (Mk 2)]], or - 20 - [[weapons/arbalest|Arbalest]]"],
            ["Wooden Sword", "[[weapons/wooden-sword-ii|Wooden Sword II]], Common - 20 - [[weapons/wooden-sword-iii|Wooden Sword III]], Rare - 20 - [[weapons/wooden-sword-iv|Wooden Sword IV]], Epic. From Rare also: 20 - [[weapons/golden-sword-i|Golden Sword I]] (then 25 - [[weapons/golden-sword-ii|Golden Sword II]]) or 20 - [[weapons/energy-sword-mk-1|Energy Sword (Mk 1)]], Epic (then 45 and 2 Gold - [[weapons/energy-sword-mk-2|Energy Sword (Mk 2)]], Legendary). From Epic: 30 - [[weapons/dryad-sword|Dryad Sword]] (then 45 and 2 Gold - [[weapons/god-sword|God Sword]]) or 35 - [[weapons/dragon-sword|Dragon Sword]]"],
            ["Iron Sword", "[[weapons/big-blue-sword|Big Blue Sword]], Rare - 30 - [[weapons/iron-sword-i|Iron Sword I]], Rare - 35 - [[weapons/iron-sword-ii|Iron Sword II]], Epic"],
            ["Bows", "[[weapons/wooden-bow-ii|Wooden Bow II]], Common - 15 - [[weapons/wooden-bow-iii|Wooden Bow III]], Rare - 15 - [[weapons/wooden-bow-iv|Wooden Bow IV]], Rare - 20 - [[weapons/dryad-bow|Dryad Bow]], Epic - 45 and 2 Gold - [[weapons/god-bow|God Bow]], Legendary. [[weapons/wooden-bow-ii|Wooden Bow II]], Common - 15 - [[weapons/staff|Staff]]. [[weapons/iron-bow-mk-1|Iron Bow (Mk 1)]], Rare - 15 - [[weapons/iron-bow-mk-2|Iron Bow (Mk 2)]], Epic"],
            ["Staffs", "[[weapons/staff|Staff]], Rare - 20 - [[weapons/fire-staff|Fire Staff]], or - 20 - [[weapons/ice-staff|Ice Staff]], or - 25 - [[weapons/poison-staff|Poison Staff]] (then 45 and 2 Gold - [[weapons/void-staff|Void Staff]], Legendary)"],
            ["Mithril line", "[[weapons/blue-sword|Blue Sword]], Common - 15 - [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]] - 20 - [[weapons/mithril-sword-mk-2|Mithril Sword (Mk 2)]] - 25 - [[weapons/mithril-sword-mk-3|Mithril Sword (Mk 3)]] - 30 - [[weapons/mithril-sword-ii-mk-1|Mithril Sword II (Mk 1)]] - 35 - [[weapons/mithril-sword-ii-mk-2|Mithril Sword II (Mk 2)]] - 45 and 2 Gold - [[weapons/reaper-scythe|Reaper Scythe]]. [[weapons/mithril-sword-mk-1|Mithril Sword (Mk 1)]] also - 25 - [[weapons/big-blue-sword|Big Blue Sword]]"],
            ["Gem Blade and Dragon Bone", "[[weapons/gem-blade-i|Gem Blade I]], Rare - 20 - [[weapons/gem-blade-ii|Gem Blade II]] - 25 - [[weapons/gem-blade-iii|Gem Blade III]], Epic - 35 - [[weapons/gem-blade-iv|Gem Blade IV]]. [[weapons/gem-blade-i|Gem Blade I]] - 20 - [[weapons/dragon-bone-ii|Dragon Bone II]], Rare - 25 - [[weapons/dragon-bone-iii|Dragon Bone III]], Epic - 35 - [[weapons/dragon-bone-iv|Dragon Bone IV]]"],
            ["Energy Blade", "[[weapons/energy-blade-mk-1|Energy Blade (Mk 1)]], Rare - 25 - [[weapons/energy-blade-mk-2|Energy Blade (Mk 2)]], Epic - 35 - [[weapons/frost-brand|Frost Brand]]"],
            ["Sphinx and Steel Anchor", "[[weapons/steel-anchor-i|Steel Anchor I]], Rare - 15 - [[weapons/sphinx-sword-i|Sphinx Sword I]], Rare - 20 - [[weapons/sphinx-sword-ii|Sphinx Sword II]], Epic - 45 and 2 Gold - [[weapons/sphinx-sword-iii|Sphinx Sword III]], Legendary - 45 - [[weapons/sphinx-sword-iv|Sphinx Sword IV]], Legendary. [[weapons/steel-anchor-i|Steel Anchor I]] - 20 - [[weapons/steel-anchor-ii|Steel Anchor II]] - 25 - [[weapons/steel-anchor-iii|Steel Anchor III]], Epic"],
            ["Other swords", "[[weapons/ninja-blade|Ninja Blade]], Rare - 15 - [[weapons/ninja-sword|Ninja Sword]]"],
            ["Guns", "[[weapons/desert-eagle-mk-1|Desert Eagle (Mk 1)]], Rare - 15 - [[weapons/desert-eagle-mk-2|Desert Eagle (Mk 2)]] - 15 - [[weapons/hand-cannon|Hand Cannon]]. [[weapons/pistol-mk-1|Pistol (Mk 1)]] - 15 - [[weapons/pistol-mk-2|Pistol (Mk 2)]]. [[weapons/revolver-mk-1|Revolver (Mk 1)]] - 15 - [[weapons/revolver-mk-2|Revolver (Mk 2)]]. [[weapons/nano-pistol-mk-1|Nano Pistol (Mk 1)]] - 25 - [[weapons/nano-pistol-mk-2|Nano Pistol (Mk 2)]]. [[weapons/shotgun-mk-1|Shotgun (Mk 1)]], Epic - 30 - [[weapons/shotgun-mk-2|Shotgun (Mk 2)]]. [[weapons/bounce-gun|Bounce Gun]], Epic - 45 and 2 Gold - [[weapons/gatling-gun|Gatling Gun]]"],
            ["[[items/artifacts|Artifacts]]", "[[items/magic-book|Magic Book]] - 45 and 2 Gold - [[items/dark-magic|Dark Magic]]. [[items/teleport-book|Teleport Book]] - 30 - Teleport Book 2. [[items/knight-scroll|Scroll]], Epic - 30 - Scroll II - 45 and 2 Gold - Scroll, Legendary"],
            ["[[items/passive-items|Passives]]", "[[items/cursed-skull|Cursed Skull]] I - 30 - II - 45 and 2 Gold - III. [[items/lucky-bone|Lucky Bone]] - 20 - II. [[items/bouncy-bullet|Bouncy Bullet Spell]] - 30 - Epic"],
            ["Leftover", "One [[items/iron-and-wood|Iron]] converts to one [[items/ammo-box|Ammo Box]] for no [[items/coin|coins]] (Iron no longer drops)"],
          ],
        },
        paragraphs: ["The [[mechanics/crafting|craft]] diet design leaves 69 recipes in total. Weapon names are the game's; the Weapons section of the wiki covers the weapons themselves."],
      },
    ],
    tags: ["Crafting", "Blueprints"],
    related: [{ category: "mechanics", slug: "crafting" }, { category: "items", slug: "gold" }, { category: "items", slug: "armor" }, { category: "weapons", slug: "wooden-sword-ii" }, { category: "weapons", slug: "big-blue-sword" }],
  }),
  it({
    slug: "item-rarity",
    name: "Item Rarity",
    subtitle: "Common to Legendary",
    summary:
      "Every item belongs to one of four rarities: Common, Rare, Epic or Legendary. Rarity drives how often loot appears, the store price and which recipes are open.",
    infobox: [
      { label: "Type", value: "System" },
      { label: "Rarity", value: "Common, Rare, Epic, Legendary" },
      { label: "Source", value: "[[items/chests]], [[dungeons/store-room|store]], shrines, [[mechanics/crafting|crafting]]" },
    ],
    sections: [
      {
        heading: "Where each rarity shows up",
        table: {
          columns: ["Source", "Common", "Rare", "Epic", "Legendary"],
          rows: [
            ["Quality 0 [[items/chests|chest]]", "80", "15", "5", "0"],
            ["Quality 1 chest", "35", "55", "10", "0"],
            ["Quality 2 chest", "10", "40", "40", "10"],
            ["Boss chest", "0", "0", "40", "35"],
            ["Store (random slots)", "65", "20", "10", "5"],
            ["[[dungeons/shrine-rooms|Gold shrine]], floors 1-3", "0", "72", "26", "2"],
            ["Gold shrine, floors 4-7", "0", "58", "36", "6"],
            ["Gold shrine, floors 9-11", "0", "45", "43", "12"],
          ],
        },
        paragraphs: ["Numbers are relative weights, not exact percentages. The [[items/boss-chest|boss chest]] weights are the quality 3 weights with Common and Rare cut."],
      },
      {
        heading: "Store prices",
        paragraphs: [
          "A store item costs its base price plus 10% of that base for each floor: 12, 24, 48 and 90 [[items/coin|coins]] for Common, Rare, Epic and Legendary, so a Rare item on floor 5 costs 36 (derived: 24 + 12). A discount charm exists in the data but is not in the loot tables. See [[dungeons/store-room|Store room]].",
        ],
      },
      {
        heading: "Crafting",
        paragraphs: ["The rarity of the result sets what a recipe costs: the Legendary steps are the only ones that need [[items/gold]]. See [[items/recipes|Recipes]]."],
      },
    ],
    tags: ["System", "Loot"],
    related: [{ category: "items", slug: "chests" }, { category: "items", slug: "recipes" }, { category: "dungeons", slug: "store-room" }, { category: "mechanics", slug: "crafting" }, { category: "dungeons", slug: "shrine-rooms" }],
  }),
];
