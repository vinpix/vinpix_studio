import type { WikiArticle } from "../types";

export const enemies: WikiArticle[] = [
  {
    "slug": "bestiary-overview",
    "category": "enemies",
    "name": "Bestiary Overview",
    "subtitle": "Enemy families, waves and elites",
    "summary": "A guide to everything that hunts you in the Backrooms: the enemy families, how waves and [[mechanics/horde-alarms|horde alarms]] send them at you, and the rules that turn an ordinary zombie into an elite.",
    "infobox": [
      {
        "label": "Type",
        "value": "Guide"
      },
      {
        "label": "Waves per floor",
        "value": "7 ([[mechanics/event-waves|event wave]] at 4, boss wave at 7)"
      },
      {
        "label": "Elites from",
        "value": "Wave 3 of each floor"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Backrooms are full of lost office workers who never found the exit and now hunt anything that still has a pulse. Most of them are **zombies**: [[enemies/shambler|Shamblers]], [[enemies/runner|Runners]], [[enemies/crawler|Crawlers]] and [[enemies/brute|Brutes]]. Deeper in, stranger things join them: **entities** that are not people at all, such as [[enemies/hound|Hounds]] and the [[enemies/smiler|Smiler]], and floor specialists that bring their own tricks.",
          "Every floor of Wave mode throws seven waves at you and ends with a boss. In Classic descent mode the four core zombies roam the levels on their own, while the rest of the roster is exclusive to Wave mode."
        ]
      },
      {
        "heading": "Enemy families",
        "paragraphs": [
          "Enemies fall into a handful of families. The family matters mostly because of **entities**: weapons that deal Holy damage, such as the Purge Gun, are built to hurt them."
        ],
        "table": {
          "columns": [
            "Family",
            "Enemies",
            "Notes"
          ],
          "rows": [
            [
              "Core zombies",
              "[[enemies/shambler|Shambler]], [[enemies/runner|Runner]], [[enemies/crawler|Crawler]], [[enemies/brute|Brute]]",
              "Present from the first floor. Not entities, even when elite."
            ],
            [
              "Entities",
              "[[enemies/hound|Hound]], [[enemies/guest|Guest]], [[enemies/smiler|Smiler]], [[enemies/digger|Digger]], [[enemies/mimic|Mimic]]",
              "Wave mode only. Vulnerable to Holy damage."
            ],
            [
              "Floor specialists",
              "[[enemies/juggler|Juggler]], [[enemies/warden|Warden]], [[enemies/bomber|Bomber]], [[enemies/bloater|Bloater]], [[enemies/human-cannonball|Human Cannonball]], [[enemies/taffy|Taffy]]",
              "Appear from the second floor on, each favouring certain floor themes."
            ],
            [
              "Event enemies",
              "[[enemies/hunter|Hunter]]",
              "Only appears during the Hunter [[mechanics/event-waves|event wave]]."
            ],
            [
              "Elites",
              "[[enemies/elite-enemies|Elite prefixes]]",
              "Any eligible enemy can roll an elite prefix."
            ],
            [
              "Bosses",
              "[[bosses/the-missing-manager|The Missing Manager]], [[bosses/the-ghost-forklift|The Ghost Forklift]], [[bosses/the-fumes|The Fumes]], [[bosses/the-swimmer|The Swimmer]], [[bosses/the-emcee|The Emcee]], [[bosses/the-smiler|The Smiler]], [[bosses/the-hum|The Hum]]",
              "One per floor theme, always on wave 7."
            ]
          ]
        }
      },
      {
        "heading": "How waves send enemies",
        "paragraphs": [
          "A floor in Wave mode is **seven waves**. You get a 15 second prep period before wave 1 and a 25 second lull between waves, enough to visit the [[items/workbench|workbench]] or [[items/vending-machine|vending machine]]; calling READY skips the wait. Each wave has a budget of bodies to spend: **8, plus 3 per wave, plus 4 per floor**, with about 35% more enemies for every extra player in [[mechanics/co-op-multiplayer|co-op]]. The budget is released in batches of two to four enemies every one to two and a half seconds, and never more than a capped number are alive at once (10, plus 2 per floor and 3 per extra player).",
          "Enemies also grow tougher the further you go: their health rises with every wave and every floor, and again for each extra player in the team. Not every enemy costs the same: a core zombie spends 1 point of the wave budget, while most entities and floor specialists cost 2."
        ],
        "subsections": [
          {
            "heading": "What shows up when",
            "bullets": [
              "**Floor 1:** Shamblers from wave 1, Runners from wave 2, Crawlers from wave 3 and at most one Brute from wave 5.",
              "**Deeper floors:** Runners from wave 1, Crawlers from wave 2 and Brutes from wave 3, in greater numbers the deeper you go (up to three Brutes per wave).",
              "**Wave 4** is always an **event wave** that rolls one of eight special rules: Horde, Blackout, Cave-In, Supply Drop, Hold the Source, the Hunter, Flood or Noclip Shortcut.",
              "**Wave 7** is the **boss wave**: the floor's boss and a steady trickle of Shamblers and Runners as adds.",
              "Floor specialists begin to debut from the second floor, tied to the floor's theme: for example Bloaters favour the pipes, Wardens and Bombers favour the warehouse."
            ]
          }
        ]
      },
      {
        "heading": "Alarms and the horde",
        "paragraphs": [
          "Zombies start out unaware and wander. They begin chasing when they see you (within 14 tiles and with a clear line of sight), when they hear a gunshot within about 20 tiles, when they hear an explosion, or when something is hit nearby. A zombie that spots you also alerts unaware neighbours around it. Silent weapons and melee swings do not carry. A zombie that stays unaware for long enough eventually catches your scent anyway.",
          "Chasing zombies that fall far behind, or are off-screen, run noticeably faster than usual to catch up, so a pack never just trails behind you.",
          "The **Horde** [[mechanics/event-waves|event wave]] is the big alarm: the wave budget rises by 50%, batches come bigger and faster, and Runners are far more common. Separately, if a wave drags on for two and a half minutes, every remaining enemy is alerted and starts hunting you at once.",
          "The Blackout event wave plays to the dark: every light goes out and Crawlers become more common. See also the Smiler and the Hound, which care about light."
        ]
      },
      {
        "heading": "Elite rules",
        "paragraphs": [
          "From wave 3 of each floor, newly spawned enemies can roll an **elite prefix**: Armored, Electric, Fast, Splitting, Glowing, Rallying or Mending. The chance starts at 5% on wave 3, grows with every later wave and every deeper floor, is capped at 30% and is halved on boss waves. Only a limited number of elites can be alive at once, and that limit grows with depth and team size. Rallying elites appear from the second floor and Mending elites from the third.",
          "Every elite deals 15% more damage, drops 50% more [[items/scrap|scrap]] and has a better chance to drop a weapon. Some enemies cannot carry certain prefixes (for example a Hound is never Fast and a Mimic is never elite). See [[enemies/elite-enemies|Elite Enemies]] for every prefix in detail."
        ]
      },
      {
        "heading": "Tips for every floor",
        "bullets": [
          "Learn the **tell** of each swing: a zombie's eyes flash white just before it strikes, and a heavy Brute trembles first.",
          "Hold a choke point. Only two zombies can swing at you from each side at once; the rest queue up behind.",
          "Lights matter. Hounds flee from them, Smilers dissolve in them and the Hunter can only be hurt while lit.",
          "Check whether a new enemy is an entity before you spend scarce energy; some weapons are far better against them.",
          "Elites are marked with a coloured tint. Kill the dangerous ones first (Electric and Rallying elites change the whole fight)."
        ]
      }
    ],
    "tags": [
      "Guide",
      "Waves",
      "Elite"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "elite-enemies"
      },
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "bosses",
        "slug": "the-missing-manager"
      },
      {
        "category": "mechanics",
        "slug": "event-waves"
      },
      {
        "category": "mechanics",
        "slug": "horde-alarms"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-scaling"
      }
    ]
  },
  {
    "slug": "shambler",
    "category": "enemies",
    "name": "Shambler",
    "subtitle": "Common zombie",
    "summary": "The Shambler is the basic lost office worker of the Backrooms: slow, sturdy enough to need a few shots, and always arriving in numbers. It is the first enemy every run meets and the baseline the other zombies are measured against.",
    "image": {
      "src": "/fz/wiki/enemies/shambler.png",
      "alt": "Shambler sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie"
      },
      {
        "label": "Health",
        "value": "40"
      },
      {
        "label": "Speed",
        "value": "2.2 tiles/s"
      },
      {
        "label": "Damage",
        "value": "12 (bite)"
      },
      {
        "label": "First seen",
        "value": "Floor 1 (Level 0, Yellow), wave 1"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (1-2), [[items/battery|battery cells]], [[items/almond-water]], health"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Shamblers are the staple of every wave and of Classic descent. A plain Shambler has **40 health** and walks at **2.2 tiles per second**, well below a player's running pace, so it is rarely dangerous alone. The danger is the crowd: waves are built mostly from Shamblers, with the faster and heavier zombies mixed in on top.",
          "Their health and damage rise with the floor and with the wave number, so a Shambler on a deep floor is noticeably tougher than the one met on Floor 1. Shamblers are ordinary zombies, not Entities.",
          "They are not stopped by terrain for long. A Shambler climbs ladders (2.4 tiles/s), jumps up ledges two tiles high and across gaps two tiles wide, and when it cannot find a way around it starts digging toward the player, chewing through walls at 6 damage per hit."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "An unaware Shambler strolls, pauses and turns at walls and drops. It begins chasing when it sees a player within 14 tiles, hears gunfire within 20 tiles (silent weapons and melee swings do not count), hears an explosion within 26 tiles, is hit, or bumps into a player. When one zombie spots you it also wakes any neighbours within 5 tiles. A zombie left alone for about 25 seconds will eventually smell a player within 32 tiles.",
          "In melee a Shambler winds up for 0.32 seconds, flashing its eyes white as a tell, lunges forward and bites for **12 damage**, then waits about a second before the next swing. Only two zombies can attack from each side of a player at once; the rest queue up behind them and sway in place until a slot opens.",
          "Hits stagger a Shambler for about 0.2 seconds, but bullets can only stagger the same zombie once every 0.6 seconds, so steady fire will not freeze it forever. A stagger early in its wind-up cancels the bite; once the swing is about halfway through, it lands regardless. Explosions always stagger."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "Shamblers can carry every [[enemies/elite-enemies|elite prefix]]: Armored, Electric, Fast, Splitting, Glowing, and from deeper floors Rallying and Mending. Elites appear from wave 3 of each floor, deal 15% more damage and pay out 50% more [[items/scrap|scrap]] than a normal Shambler.",
          "During several floor boss fights, Shamblers (together with Runners) make up the stream of reinforcements."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fight them in a corridor or on a ledge: since only two can bite from each side, a narrow position stops a mob from surrounding you.",
          "Keep moving while shooting. A Shambler's slow walk means you can back away and fire without being bitten.",
          "Explosives and other area-damage weapons are the efficient answer to a clump of Shamblers.",
          "Build or hold a chokepoint before shooting; the sound of gunfire pulls zombies from up to 20 tiles away."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Common"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "enemies",
        "slug": "crawler"
      },
      {
        "category": "enemies",
        "slug": "brute"
      },
      {
        "category": "bosses",
        "slug": "the-missing-manager"
      }
    ]
  },
  {
    "slug": "runner",
    "category": "enemies",
    "name": "Runner",
    "subtitle": "Fast zombie",
    "summary": "Runners are lean, screaming zombies that cover ground at nearly the speed of a sprinting player. They are fragile, but they close distance fast and punish anyone who stops moving.",
    "image": {
      "src": "/fz/wiki/enemies/runner.png",
      "alt": "Runner sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie"
      },
      {
        "label": "Health",
        "value": "22"
      },
      {
        "label": "Speed",
        "value": "6.5 tiles/s"
      },
      {
        "label": "Damage",
        "value": "8 (bite)"
      },
      {
        "label": "First seen",
        "value": "Floor 1 (Level 0, Yellow), wave 2"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (1), [[items/battery|battery cells]], [[items/almond-water]], health"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Runner is the first fast enemy a run introduces. It appears on wave 2 of Floor 1, and on deeper floors it shows up from the very first wave in growing numbers. It has only **22 health**, so one or two solid hits drop it, but its speed of **6.5 tiles per second** is almost a match for a player on foot.",
          "Runners have a long reach for their size: they jump up ledges three tiles high, clear gaps up to five tiles wide, and climb ladders at 4 tiles per second, so rooftops and platforms rarely buy you much time."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "When a Runner notices a player it lets out a scream that carries across the floor and alerts nearby zombies. It then charges straight in. Its bite wind-up is only 0.18 seconds and it lunges half a tile forward; it keeps pressing toward you while winding up, so a player who stops or turns back suddenly is bitten almost immediately. The bite deals **8 damage** and repeats every 0.7 seconds.",
          "In Classic descent, Runners join the floor a few seconds after the start, and the game keeps a pack of fast, aware chasers (Runners and Crawlers) behind the player on the route, so there is usually something chasing you from behind. In wave mode, Runners are weighted more heavily on [[levels/poolrooms|Poolrooms]] floors and Horde events, where they come in rushes.",
          "Runners are knocked back more easily than other zombies, which helps when you need to shove one off you."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Runner can carry any [[enemies/elite-enemies|elite prefix]]. A Fast Runner is the most dangerous combination: the prefix raises its speed by 40% to roughly 9 tiles per second, faster than a sprinting player, and shortens its wind-up and cooldown.",
          "The [[enemies/hunter|Hunter]] is a special Runner that appears in a Hunter [[mechanics/event-waves|event wave]]. It is a different threat from an ordinary Runner and is covered on its own page."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Listen for the scream and turn to face the direction it came from before the Runner arrives.",
          "Do not stop to reload in the open when Runners are near. Retreat to a spot with a wall at your back first.",
          "Runners die quickly: a short burst or one shotgun blast is usually enough. Aim for the first one in the pack, since the others follow in a line.",
          "Jumping and platforms help only a little against Runners; they climb and leap better than any other basic zombie."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Fast"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "hunter"
      },
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "enemies",
        "slug": "hound"
      },
      {
        "category": "bosses",
        "slug": "the-fumes"
      }
    ]
  },
  {
    "slug": "crawler",
    "category": "enemies",
    "name": "Crawler",
    "subtitle": "Low pouncing zombie",
    "summary": "Crawlers skitter along the floor on all fours, too low to hit easily and quick to leap at a player from several tiles away. They squeeze through gaps other zombies cannot and are the zombie most likely to catch you off guard.",
    "image": {
      "src": "/fz/wiki/enemies/crawler.png",
      "alt": "Crawler sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie"
      },
      {
        "label": "Health",
        "value": "30"
      },
      {
        "label": "Speed",
        "value": "3.8 tiles/s"
      },
      {
        "label": "Damage",
        "value": "10 (bite), 14 (pounce)"
      },
      {
        "label": "First seen",
        "value": "Floor 1 (Level 0, Yellow), wave 3"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (1-2), [[items/battery|battery cells]], [[items/almond-water]], health"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Crawler is a stooped, hissing zombie with a body only 0.8 tiles tall, half the height of a Shambler. It has **30 health** and moves at **3.8 tiles per second**. Crawlers first appear on wave 3 of Floor 1, and on deeper floors from wave 2.",
          "Because they are so low, Crawlers fit through one-tile-high gaps that taller zombies cannot, and they scale ladders faster than anything else in the basic roster (6 tiles per second). They can jump two-tile ledges and three-tile gaps."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "A Crawler hisses when it spots you and then closes in at ground level. Inside a range of roughly 1.2 to 4.5 tiles, on the same level as you and with a clear line, it **pounces**: a leap at 8.5 tiles per second that lands a single hit for **14 damage**. After a pounce it needs about 3 seconds to recover before it can leap again. Between pounces it bites like other zombies for 10 damage with a short 0.2 second wind-up.",
          "Like other zombies, a Crawler needs a free melee slot to attack, so a crowd of Crawlers still queues around you rather than all biting at once.",
          "Crawlers are weighted more heavily in the [[levels/poolrooms|Poolrooms]] and [[levels/lights-out]] floors, and a Blackout [[mechanics/event-waves|event wave]] increases their numbers further. During the fight against [[bosses/the-swimmer|The Swimmer]], most of the reinforcements are Crawlers."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Crawler can carry any [[enemies/elite-enemies|elite prefix]]. An Electric or Fast Crawler is a serious threat in tight corridors, because it reaches you before you can back up."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A pounce is a committed leap with a cooldown of about 3 seconds, so right after one lands is the safest moment to turn and shoot the Crawler.",
          "In the dark, listen for the hiss. [[levels/lights-out]] floors hide Crawlers well, so keep your [[items/flashlight|flashlight]] pointed low.",
          "Shotguns and area weapons deal with them best, since a low target is easy to miss with a single-bullet gun at range."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Ambusher"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "hound"
      },
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "bosses",
        "slug": "the-swimmer"
      }
    ]
  },
  {
    "slug": "brute",
    "category": "enemies",
    "name": "Brute",
    "subtitle": "Heavy zombie",
    "summary": "The Brute is a hulking, slow zombie that shrugs off knockback, cannot be staggered by bullets and smashes through walls without stopping. It hits harder than any basic zombie and pays out the best rewards of its tier.",
    "image": {
      "src": "/fz/wiki/enemies/brute.png",
      "alt": "Brute sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie"
      },
      {
        "label": "Health",
        "value": "220"
      },
      {
        "label": "Speed",
        "value": "1.6 tiles/s"
      },
      {
        "label": "Damage",
        "value": "25 (swing)"
      },
      {
        "label": "First seen",
        "value": "Floor 1 (Level 0, Yellow), wave 5"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (5-7), [[items/battery|battery cells]], [[items/almond-water]], health; 12% weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Brute is the heavy of the basic zombie roster. It stands 2.4 tiles tall, has **220 health** and walks at only **1.6 tiles per second**, but a single swing deals **25 damage** with heavy knockback. On Floor 1 only one Brute can be alive at a time and the first arrives on wave 5; on deeper floors Brutes can show up from wave 3, in groups of up to three.",
          "A Brute is the most generous kill among the basic zombies. It drops 5 to 7 [[items/scrap|scrap]], has a 12% chance to drop a weapon, and its ordinary loot drops are three times as likely as from a Shambler."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Brutes roar when they notice you and lumber toward you. They **smash anything in front of them without slowing down**, dealing 40 damage per hit to terrain, so walls and barricades that stop other zombies only delay a Brute. Each footstep shakes the camera when it is near, and its swing shakes the screen whether it hits or misses.",
          "The swing has a 0.5 second wind-up during which the Brute trembles, followed by a 0.6 second recovery and a 1.6 second cooldown. It advances only slowly during the wind-up, so stepping back out of its short reach as the tremble starts can avoid the hit.",
          "Brutes are very hard to push around. They take only 20% of the normal knockback, bullets never stagger them, and stun, freeze and pin effects last half as long on them. Explosions are the exception: a blast staggers any zombie, including a Brute, though only once every 0.8 seconds."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Brute can carry any [[enemies/elite-enemies|elite prefix]]. An Armored Brute is especially tanky: its prefix raises health and cuts the damage it takes from bullets."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Do not trade shots at close range. With a 1.6 tiles per second walk, a Brute is easy to kite: shoot, back up, repeat.",
          "Since bullets will not stagger it, rely on distance rather than flinching it. Explosives and freeze or stun effects are the only things that interrupt it.",
          "Break line of sight with walls only if you accept they will not hold; a Brute simply walks through them.",
          "Take the loot: a Brute is worth killing for the [[items/scrap|scrap]] and the weapon chance, as long as you can do it from range."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Heavy"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "enemies",
        "slug": "digger"
      },
      {
        "category": "bosses",
        "slug": "the-missing-manager"
      }
    ]
  },
  {
    "slug": "hound",
    "category": "enemies",
    "name": "Hound",
    "subtitle": "Light-shy pack hunter",
    "summary": "Hounds are fast, low, always-hunting Entities that arrive in packs and leap at players from several tiles away. They have little health, but they never lose a scent and are only discouraged by bright light.",
    "image": {
      "src": "/fz/wiki/enemies/hound.png",
      "alt": "Hound sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Entity"
      },
      {
        "label": "Health",
        "value": "18"
      },
      {
        "label": "Speed",
        "value": "8 tiles/s (up to 10)"
      },
      {
        "label": "Damage",
        "value": "9 (bite), about 13 (pounce)"
      },
      {
        "label": "First seen",
        "value": "Floor 2, wave 2 (Wave mode)"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (1), [[items/battery|battery cells]], [[items/almond-water]], health"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Hound is an Entity that first appears on Floor 2 from wave 2 onward, and it only appears in Wave mode, never in Classic descent. With **18 health** it is the most fragile of the regular enemies, and at **8 tiles per second** it is among the fastest, outpacing even a sprinting player. Because it is an Entity, it is vulnerable to Purge Gun and Holy damage.",
          "Hounds come in packs: each time one is chosen, two arrive together, one more from wave 5 and one more when three or more players are in the lobby, up to four at most. Only so many can be alive at once, and that cap grows on deeper floors. They are especially common in [[levels/lights-out]], [[levels/pipe-dreams]] and the [[levels/generator-room|Generator Room]], and rare in the [[levels/poolrooms|Poolrooms]] and the [[levels/party-room|Party Room]]. They also make up half the reinforcements during the fights against [[bosses/the-smiler]] and [[bosses/the-hum]]."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "A Hound is **always aware** from the moment it spawns. It follows a player's scent through the level without needing line of sight, and if its path is long (over 20 tiles) it speeds up by 25%, to a maximum of 10 tiles per second.",
          "Within 1.5 to 5 tiles with a clear line of sight, it crouches for 0.28 seconds and then **pounces** at 13 tiles per second toward the spot where you were standing when it launched. A pounce bite deals 1.5 times the normal damage, after which the Hound needs 0.6 seconds to recover and about 2.5 seconds before leaping again. Between leaps it bites for 9.",
          "Hounds are **afraid of light**. If a [[items/flashlight|flashlight]] beam falls on one, or it stands in a well-lit area, it becomes afraid after a brief moment of exposure: it turns pale, stops pouncing, and runs away at 60% speed to a spot about 8 tiles from the light. It will not dig while afraid. A Hound that is cornered, with nowhere to flee, will bite instead. A Hound lit in mid-leap still finishes the leap."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Hound can carry the Armored, Electric, Splitting and Glowing [[enemies/elite-enemies|elite prefixes]]. It cannot be Fast, and it cannot carry Rallying or Mending."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "A [[items/flashlight|flashlight]] is the best answer. Sweep the beam across a pack and they will break off the attack and run.",
          "When a Hound crouches, move sideways or jump: the leap goes where you stood, not where you are going.",
          "A Hound that just missed a pounce is helpless for about 0.6 seconds. Shoot it then.",
          "Fight packs with your back to a wall so the only approach is from the front, and shoot the leading Hound first."
        ]
      }
    ],
    "tags": [
      "Entity",
      "Fast",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "enemies",
        "slug": "smiler"
      },
      {
        "category": "bosses",
        "slug": "the-hum"
      }
    ]
  },
  {
    "slug": "guest",
    "category": "enemies",
    "name": "Guest",
    "subtitle": "Party Room reveller",
    "summary": "Guests are laughing party-goers who swell up and explode when they die, then leave floating balloons behind. They are the signature enemy of the [[levels/party-room|Party Room]], and fighting them well means choosing where they die.",
    "image": {
      "src": "/fz/wiki/enemies/guest.png",
      "alt": "Guest sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Entity"
      },
      {
        "label": "Health",
        "value": "32"
      },
      {
        "label": "Speed",
        "value": "2.6 tiles/s"
      },
      {
        "label": "Damage",
        "value": "8 (bite), 20 (death blast)"
      },
      {
        "label": "First seen",
        "value": "Party Room (floor 3B), wave 1 (Wave mode)"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (1-2), balloons"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "A Guest is a Shambler-like Entity in a party outfit. It has **32 health** and walks at **2.6 tiles per second**, a little quicker than a Shambler but weaker. It bites for 8 damage with a 0.3 second wind-up.",
          "In the [[levels/party-room|Party Room]], Guests make up the bulk of every wave from wave 1 onward. In other floors they are rare: from wave 3 on any floor past the first, and a little more often in the [[levels/generator-room|Generator Room]] from wave 2. Guests only appear in Wave mode. As Entities, they are vulnerable to Purge Gun and Holy damage."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "A Guest laughs every 3 to 5 seconds when within 14 tiles of a player, which gives away its approach.",
          "When a Guest dies (to anything but being removed from the level), it squeaks, **swells for half a second and then explodes**. Every living player within **2.4 tiles** takes **20 damage**, dropping to half at the edge of the blast, and is pushed away. Walls block the blast. The explosion lightly damages terrain in a 1.4 tile radius. Other Guests caught in it take 40 damage, so a group of Guests can set each other off in a chain; other kinds of enemy are not affected.",
          "Each dead Guest also leaves **three balloons** (four from an elite) that drift upward and last 9 seconds. Walk into one to pop it. About 70% are gold and give 1 [[items/scrap|scrap]]; the rest are red and heal 4 health."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Guest can carry every [[enemies/elite-enemies|elite prefix]] except Splitting, including Rallying and Mending on deeper floors. An elite Guest leaves four balloons instead of three."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kill Guests from more than 2.4 tiles away. Back up, then shoot: the blast is the only real danger they pose.",
          "Shoot the middle of a group of Guests to chain their explosions and clear the whole bunch while you stand safely outside the radius.",
          "Put solid terrain between you and a dying Guest: a wall stops the blast.",
          "Collect the balloons after a fight: they are free healing and [[items/scrap|scrap]], but the red ones only help if you are hurt."
        ]
      }
    ],
    "tags": [
      "Entity",
      "Explosive",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "enemies",
        "slug": "bomber"
      },
      {
        "category": "bosses",
        "slug": "the-emcee"
      }
    ]
  },
  {
    "slug": "smiler",
    "category": "enemies",
    "name": "Smiler",
    "subtitle": "Light-sensitive stalker",
    "summary": "The Smiler is a grinning Entity that is invisible in the dark and dissolves in light. In the pitch-black [[levels/lights-out]] floor, only its eyes and grin give it away until it is almost on top of you.",
    "image": {
      "src": "/fz/wiki/enemies/smiler.png",
      "alt": "Smiler sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Entity"
      },
      {
        "label": "Health",
        "value": "55"
      },
      {
        "label": "Speed",
        "value": "3.2 tiles/s"
      },
      {
        "label": "Damage",
        "value": "14 (claw)"
      },
      {
        "label": "First seen",
        "value": "Lights Out (floor 4), wave 2 (Wave mode)"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (2-3), [[items/battery|battery cells]], [[items/almond-water]], health"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Smiler is the regular enemy of the [[levels/lights-out]] floor, not to be confused with its boss counterpart [[bosses/the-smiler|The Smiler]], which is a much larger creature that haunts the end of that floor. A regular Smiler has **55 health**, walks at **3.2 tiles per second**, and claws for **14 damage** after a 0.4 second wind-up with a 1.2 second cooldown.",
          "It is an Entity, so it is vulnerable to Purge Gun and Holy damage. It shows up from wave 2 on Lights Out, from wave 3 in the [[levels/generator-room|Generator Room]], and rarely on other deep floors from wave 4. A Blackout [[mechanics/event-waves|event wave]] makes Smilers noticeably more common. Smilers appear only in Wave mode."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "A Smiler's body fades with the light around it. In darkness it becomes **completely invisible**; the only things you can see are its glowing eyes and grin. As the light around it rises to about half brightness, or if a [[items/flashlight|flashlight]] beam falls on it, it becomes fully visible. [[anomalies/anomalies-overview]] that reveal enemies, such as [[anomalies/third-eye]], keep it faintly visible (about 35%) in the dark.",
          "Light also **dissolves** it. If a flashlight beam, a bright lamp or a Glowing elite within 3 tiles lights a Smiler for about 0.3 seconds, it hisses and begins to fall apart: it slows to 60% speed, cannot start a bite, and loses **10% of its maximum health every second**. Ten seconds of light kills it, with no flash or flinch, and the kill still counts for you. Ordinary weapons work on it as well; the light only adds to them.",
          "A Smiler notices players within 14 tiles even without line of sight, and it giggles every 6 to 10 seconds when you are within 12 tiles."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Smiler can carry Armored, Electric, Fast and Splitting [[enemies/elite-enemies|elite prefixes]]. It cannot be Glowing, Rallying or Mending. Be aware that a Glowing elite of another kind lights up nearby Smilers, making them visible and vulnerable.",
          "At most three Smilers can be alive at once, or four on [[levels/lights-out]]. During the fight with the boss version, the regular enemies that come as reinforcements are Hounds and Shamblers rather than Smilers."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Keep your [[items/flashlight|flashlight]] on and sweep it. The beam makes a Smiler visible and starts it dissolving, so a lit Smiler is slow and harmless.",
          "Watch for glowing eyes and a grin floating in the dark and aim at the middle of them.",
          "Beams are best against Smilers: sustained light does 10% of its health per second even if you miss."
        ]
      }
    ],
    "tags": [
      "Entity",
      "Light-sensitive",
      "Wave mode"
    ],
    "related": [
      {
        "category": "bosses",
        "slug": "the-smiler"
      },
      {
        "category": "enemies",
        "slug": "hound"
      },
      {
        "category": "items",
        "slug": "flashlight"
      },
      {
        "category": "levels",
        "slug": "lights-out"
      }
    ]
  },
  {
    "slug": "digger",
    "category": "enemies",
    "name": "Digger",
    "subtitle": "Tunnelling Entity",
    "summary": "Diggers are drill-armed Entities that tunnel straight through the level instead of walking around it. They go after player-built barricades, steel plates and fire doors, tearing through them much faster than any other enemy.",
    "image": {
      "src": "/fz/wiki/enemies/digger.png",
      "alt": "Digger sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Entity"
      },
      {
        "label": "Health",
        "value": "75"
      },
      {
        "label": "Speed",
        "value": "2.4 tiles/s"
      },
      {
        "label": "Damage",
        "value": "14 (bite)"
      },
      {
        "label": "First seen",
        "value": "Floor 2, wave 3 (Wave mode)"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (3-4), [[items/battery|battery cells]], [[items/almond-water]], health"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Digger is a bulky Entity with a drill, **75 health** and a speed of **2.4 tiles per second**. It first appears on Floor 2 from wave 3, in Wave mode only. As an Entity it is vulnerable to Purge Gun and Holy damage.",
          "Diggers are most common in the [[levels/habitable-zone|Warehouse]] and the [[levels/generator-room|Generator Room]], and much rarer in the [[levels/poolrooms|Poolrooms]]. No more than two can be alive at once, rising to three from Floor 4. Each kill pays 3 to 4 [[items/scrap|scrap]] and a better-than-average chance of [[items/battery|battery cells]] and other drops."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Where a Shambler digs only when it is stuck, a Digger treats terrain as an ordinary path. It prefers to **tunnel straight through walls** rather than take a long detour, drilling for 30 damage every 0.4 seconds, several times faster than a Shambler's dig. A drilling Digger throws debris and dust, and you can hear the drill from a distance.",
          "While a Digger is alive it also hunts for **player-built defences**. It scans for barricades, steel plates and fire doors and, if no player is closer, heads for the nearest exposed piece and drills it. Against these built pieces its drilling is three times as strong, 90 damage per hit, which tears through most built pieces in a hit or two.",
          "In a fight it bites for 14 damage with a 0.4 second wind-up and a 1.1 second cooldown. It takes only half the usual knockback."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Digger can carry every [[enemies/elite-enemies|elite prefix]], including Rallying and Mending on deeper floors."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Do not count on a wall or a barricade to stop a Digger. Kill it before it reaches your defences.",
          "If your barricade is under attack, shoot the Digger while it drills; it is slow and large, so it is easy to hit.",
          "Walls are no protection from a Digger: it tunnels through them rather than going around, so do not treat solid cover as safe."
        ]
      }
    ],
    "tags": [
      "Entity",
      "Tunneller",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "brute"
      },
      {
        "category": "enemies",
        "slug": "bomber"
      },
      {
        "category": "enemies",
        "slug": "warden"
      }
    ]
  },
  {
    "slug": "mimic",
    "category": "enemies",
    "name": "Mimic",
    "subtitle": "Teammate impostor",
    "summary": "The Mimic is an Entity that wears the face and name of one of your teammates, walks up to you as if nothing were wrong, and reveals itself at close range. In a solo run it takes the shape of you.",
    "image": {
      "src": "/fz/wiki/enemies/mimic.png",
      "alt": "Mimic sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Entity"
      },
      {
        "label": "Health",
        "value": "60"
      },
      {
        "label": "Speed",
        "value": "3.0 tiles/s disguised, 4.2 tiles/s revealed"
      },
      {
        "label": "Damage",
        "value": "20 (bite, first bite 30), 12 (finger-gun)"
      },
      {
        "label": "First seen",
        "value": "Floor 2 onward, waves 2 to 6 (Wave mode)"
      },
      {
        "label": "Drops",
        "value": "[[items/scrap]] (3-5), [[items/battery|battery cells]], [[items/almond-water]], health; 8% weapon"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Mimic is a rare, scripted enemy. In [[mechanics/co-op-multiplayer|co-op]] it can join any wave from 2 to 6 on Floor 2 and deeper (never on a Hunter [[mechanics/event-waves|event wave]]), arriving after about 40% of the wave has spawned. The chance is roughly one wave in two on Floor 2 and rises on deeper floors, up to 85%. One Mimic joins a two-player game, two join with three or four players. It walks in from a vent at least 16 tiles away.",
          "In a solo run a Mimic only appears when you take the deal **The Call**, whose curse is that a Mimic joins waves 2 to 6. Alone, it copies you instead, wearing your own character and the label UNDERSTUDY.",
          "It has **60 health**, [[items/scrap|scrap]] drops of 3 to 5, and an 8% weapon chance. It is an Entity, so it takes Purge Gun and Holy damage, and it can never be an elite."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "While **disguised**, the Mimic looks like one of your teammates, with a name label above its head that gives it away: the label is in the wrong colour (orange). Each player sees the Mimic as a teammate other than themselves. It does not fight, does not dig, but it can hop and climb. It walks at 3.0 tiles per second toward its victim, and it retraces the victim's own recent path, speeding up the longer it takes, up to about 1.4 times the recorded pace.",
          "The Mimic **reveals** itself when it comes within 2.2 tiles of its victim, when it takes any damage (even from a teammate), when the real teammate it is copying comes within 3 tiles, shortly after that teammate dies or leaves, after 20 seconds of walking without reaching anyone (30 seconds if it is retracing a path), or if it gets stuck behind a wall for a second. The reveal freezes it for 0.6 seconds, during which it takes 50% more damage.",
          "Once revealed it walks at **4.2 tiles per second** and bites for **20 damage**; its first bite deals 50% more. Once in its life it also raises a **finger-gun**: it holds the pose for 0.9 seconds (the text BANG flashes at 0.6 seconds), then fires a shot for 12 damage along a locked line 3 to 8 tiles long. A jump clears the shot, and a hit in the first half of the pose cancels it. It takes 25% extra damage while recovering from its own shot.",
          "When it dies, it does not crumple or gib: its body rewinds along a trail of fading ghosts back to where it stood about three seconds earlier."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Look at name labels. A teammate whose name is a strange colour, who walks straight at you at a constant pace and never fires, is not your teammate.",
          "Auto-aim ignores a disguised Mimic, so you will have to aim by hand. Any hit reveals it, and the first shot also does bonus damage, since it takes 50% extra while the reveal plays.",
          "The Silent Eye anomaly outlines every enemy through walls, and marks a disguised Mimic in red.",
          "When it points the finger-gun, jump or step off the line. You can also stagger it early in the pose to cancel the shot.",
          "Stay close to your team in [[mechanics/co-op-multiplayer|co-op]]. A teammate who is nowhere near where they should be, or who walks straight at you, is the one to be suspicious of."
        ]
      }
    ],
    "tags": [
      "Entity",
      "Co-op",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "enemies",
        "slug": "smiler"
      }
    ],
    "trivia": [
      "The solo version of the Mimic is labelled UNDERSTUDY. The first time a Mimic is revealed in a run, a message reads THAT IS YOUR OWN WALK."
    ]
  },
  {
    "slug": "juggler",
    "category": "enemies",
    "name": "Juggler",
    "subtitle": "Bomb-lobbing clown on a ball",
    "summary": "A tall clown who rides a striped ball around the player while juggling three black bombs. He lobs them at your feet and drops whatever he is still carrying when he dies.",
    "image": {
      "src": "/fz/wiki/enemies/juggler.png",
      "alt": "Juggler sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie (circus)"
      },
      {
        "label": "Health",
        "value": "36"
      },
      {
        "label": "Speed",
        "value": "5.0 tiles/s on the ball, 3.8 on foot"
      },
      {
        "label": "Damage",
        "value": "12 per bomb, 9 per ball check"
      },
      {
        "label": "Drops",
        "value": "2-3 [[items/scrap|scrap]], 2% weapon chance; his carried bombs"
      },
      {
        "label": "First seen",
        "value": "Floor 2 (Pipe Dreams), wave 3"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Juggler is a clown balancing on a big striped ball. Three black bombs with orange fuse sparks orbit above his pointed hat. He never stops rolling: he circles the player at 5.0 tiles per second, keeping roughly 4 to 10 tiles away, and throws bombs instead of biting.",
          "He debuts on wave 3 of [[levels/pipe-dreams]] with the banner *JUGGLERS*, and joins the wave mix on other floors from wave 3 (most often on Pipe Dreams and the [[levels/party-room|Party Room]], rarely on the [[levels/poolrooms|Poolrooms]] and [[levels/lights-out]]). At most two are alive at once. Listed numbers are base values; health and damage grow on deeper floors and later waves."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "**Toss.** Every 2.6 to 3.2 seconds the Juggler throws a bomb at the spot where you stand, if you are 2.5 to 11 tiles away in line of sight and not standing in water. A red disc 2.8 tiles wide appears on the floor in the same instant. The bomb lands after 1.3 seconds and explodes 1.5 seconds after the throw. A player takes 12 damage (scaled by floor), less toward the edge of the disc; other zombies caught in it take 40. A wall or plank between you and the bomb shields you.",
          "**Triple toss.** From wave 5, once he has thrown at least three single bombs, he can throw all three at once as three discs placed 4 tiles apart, roughly every 11 seconds. Only the ball form can do this.",
          "**Ball check.** If you come within 2 tiles he leans back for half a second, then lunges 1.6 tiles along the floor for 9 damage. A jump clears it. Afterwards he wobbles for 0.8 seconds and takes 30% more damage; he will not check again for 4 seconds.",
          "**Ball zone.** Bullets, pellets and melee hits that land on the lower 0.7 tile of his body strike the ball: they deal half damage, but once they add up to 20% of his health he is knocked off. On foot he moves at 3.8 tiles per second, carries two bombs instead of three and can no longer triple toss. The loose ball rolls away at up to 7 tiles per second for about 10 tiles and bowls over zombies for 30 damage; it only pushes players.",
          "**Pratfall.** When he dies, the bombs he was carrying drop in a row along the direction of the killing shot, 2.8 tiles apart. They explode 1.05, 1.40 and 1.75 seconds after the kill, each with a blast radius of 1.4 tiles. The bombs on his orbit show how many he still carries; right after a triple toss his hands are empty."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Juggler can carry the Armored, Electric, Glowing or Mending prefix. It cannot be Fast, Splitting or Rallying. See [[enemies/elite-enemies|Elite Enemies]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Step out of the red disc as soon as it appears; you have a full 1.5 seconds. He does not throw at players who are standing in water.",
          "Kill him from range with a clear lane, and let the crowd that chases you stand where his row of bombs will land.",
          "A shot aimed low knocks him off the ball, slowing him and shortening his barrage; the loose ball then bowls the pack.",
          "Never stand inside two tiles of him: jump the ball check and punish the wobble.",
          "His bombs hurt other zombies as much as they hurt you (40 damage), so keep the crowd between you and the blast, or between you and the row he drops when he dies."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "human-cannonball"
      },
      {
        "category": "enemies",
        "slug": "bomber"
      },
      {
        "category": "bosses",
        "slug": "the-emcee"
      }
    ]
  },
  {
    "slug": "warden",
    "category": "enemies",
    "name": "Warden",
    "subtitle": "Door-shielded guard",
    "summary": "A uniformed guard who walks toward you holding a red fire door as a shield. Shots into the door are blocked, so the trick is to hit him where the door is not.",
    "image": {
      "src": "/fz/wiki/enemies/warden.png",
      "alt": "Warden sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie (shielded)"
      },
      {
        "label": "Health",
        "value": "45 (plus a 55 point door)"
      },
      {
        "label": "Speed",
        "value": "1.9 tiles/s (2.4 without the door)"
      },
      {
        "label": "Damage",
        "value": "14 (shove)"
      },
      {
        "label": "Drops",
        "value": "3-4 [[items/scrap|scrap]], 2% weapon chance"
      },
      {
        "label": "First seen",
        "value": "Floor 2 (The Warehouse), wave 3"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Warden is a slow, sturdy guard who keeps a red fire door between himself and the player. Its debut banner reads *WARDENS: HIT THE BACK*, which is the whole lesson: the door only guards the front.",
          "He first appears on wave 3 of the [[levels/habitable-zone|Warehouse]] and on wave 3 of [[levels/lights-out]], and is most common in the Warehouse. Up to two can be alive at once on the early floors, three from the fourth floor on, and a few more in [[mechanics/co-op-multiplayer|co-op]]."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "The Warden shambles at 1.9 tiles per second and always faces the player. When you slip behind him he needs half a second to turn around. His only attack is a shove: a 0.45 second wind-up, then 14 damage and a heavy knockback, repeated every 1.4 seconds.",
          "**The door.** Bullets, pellets and melee hits that arrive from the front, at body height, are absorbed by the door, which holds 55 points. Each blocked hit shows sparks and a *BLOCKED* tag. Once the door drops under 45% it is shown cracked, and when it is gone it breaks apart and he speeds up by 25%.",
          "**Weak spots.** Hits to the top quarter of his body (the head) go over the door. Hits from behind do 20% extra damage. Explosions are not blocked, but a blast from the front is reduced by 20%. Burn and environmental damage ignore the door entirely."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Warden can carry the Electric, Fast, Glowing, Rallying or Mending prefix. It never carries Armored or Splitting, since the door already does that job. See [[enemies/elite-enemies|Elite Enemies]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Do not waste shots on the door. Aim high for the head, or get around him; he needs 0.5 seconds to notice.",
          "Slip around him by jumping or using a ledge, and shoot his back while he turns.",
          "Explosives work, but the door still shaves 20% off a blast from the front.",
          "Keep your distance: his shove hits hard and knocks you back. He is slow enough to kite."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "brute"
      },
      {
        "category": "enemies",
        "slug": "elite-enemies"
      },
      {
        "category": "bosses",
        "slug": "the-ghost-forklift"
      }
    ]
  },
  {
    "slug": "bomber",
    "category": "enemies",
    "name": "Bomber",
    "subtitle": "Walking fuse",
    "summary": "A fast, fragile zombie that lights its own fuse when it gets close and explodes. Its blast hurts everything nearby, including other zombies.",
    "image": {
      "src": "/fz/wiki/enemies/bomber.png",
      "alt": "Bomber sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie (explosive)"
      },
      {
        "label": "Health",
        "value": "30"
      },
      {
        "label": "Speed",
        "value": "3.6 tiles/s (2.7 with a lit fuse)"
      },
      {
        "label": "Damage",
        "value": "20 (blast, falls off toward the edge)"
      },
      {
        "label": "Drops",
        "value": "1-2 [[items/scrap|scrap]], 0.8% weapon chance"
      },
      {
        "label": "First seen",
        "value": "Floor 2 (The Warehouse), wave 5"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Bomber charges the player and detonates. Its debut banner reads *BOMBERS: SHOOT FAR*. It debuts on wave 5 of the [[levels/habitable-zone|Warehouse]] and of the [[levels/party-room|Party Room]], and is most common in the Warehouse and the Party Room. At most two are alive at once, three with three or more players."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "A Bomber chases at 3.6 tiles per second without biting. When it gets within 3.4 tiles of a player with a clear line of sight (5.6 tiles if the player is standing in water) it lights its fuse. The fuse lasts 1.1 seconds, a hissing countdown with rising beeps and sparks, and a red circle 4.4 tiles across marks the blast. A Bomber with a lit fuse keeps coming but runs at 75% of its speed.",
          "It explodes when the fuse runs out, or earlier if it reaches you (within 0.9 tiles) after the fuse has burned for 0.4 seconds. The blast has a radius of 2.2 tiles. Players take 20 damage (scaled by floor), reduced by up to half toward the edge; other zombies take 40 and bosses take none. The blast also chips wooden barricades and planks in a 1.2 tile radius. Walls and planks between you and the Bomber block the blast.",
          "Killing a Bomber does not defuse it. A Bomber that dies unlit still bursts after 0.5 seconds, a lit one finishes its remaining fuse, and one killed by an explosion goes off after 0.1 seconds. Another Bomber caught in a blast has its fuse cut to 0.3 seconds, so groups chain. Hurting, stunning or freezing a lit Bomber pauses its fuse for up to 4 seconds in total."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Bomber can carry the Armored, Electric or Glowing prefix. It cannot be Fast, Splitting, Rallying or Mending. See [[enemies/elite-enemies|Elite Enemies]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Shoot it before it gets within 3.4 tiles. A Bomber killed farther away than its 2.2 tile blast radius cannot reach you.",
          "Once the fuse is lit, run: the circle is 2.2 tiles in radius and a lit Bomber is slower than you.",
          "Let it walk into a crowd of zombies and pop it there; the 40 point blast clears a corridor.",
          "A wall or plank between you and the Bomber blocks the blast, though the blast chips wooden pieces."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bloater"
      },
      {
        "category": "enemies",
        "slug": "human-cannonball"
      },
      {
        "category": "enemies",
        "slug": "juggler"
      },
      {
        "category": "bosses",
        "slug": "the-ghost-forklift"
      },
      {
        "category": "items",
        "slug": "explosive-barrel"
      }
    ]
  },
  {
    "slug": "bloater",
    "category": "enemies",
    "name": "Bloater",
    "subtitle": "Gas sack",
    "summary": "A slow, swollen worker that bursts into a cloud of poison gas when it dies. The further away it pops, the better.",
    "image": {
      "src": "/fz/wiki/enemies/bloater.png",
      "alt": "Bloater sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie (gas)"
      },
      {
        "label": "Health",
        "value": "70"
      },
      {
        "label": "Speed",
        "value": "1.6 tiles/s"
      },
      {
        "label": "Damage",
        "value": "10 (bite), 4 per gas tick"
      },
      {
        "label": "Drops",
        "value": "2-3 [[items/scrap|scrap]], 2% weapon chance"
      },
      {
        "label": "First seen",
        "value": "Floor 2 (Pipe Dreams), wave 5"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Bloater trundles toward the player at 1.6 tiles per second and bites for 10. Its debut banner reads *GAS: POP IT FAR AWAY*. It debuts on wave 5 of [[levels/pipe-dreams]], shows up most on Pipe Dreams and the [[levels/poolrooms|Poolrooms]], and is rare in the [[levels/habitable-zone|Warehouse]]. One is alive at a time on the early floors, two from the fourth floor on, and more in [[mechanics/co-op-multiplayer|co-op]]."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "Below a quarter of its health the Bloater visibly swells. When it dies, its corpse puffs up for about a third of a second and then bursts, leaving a green gas cloud. A red warning circle appears the moment it bursts and the cloud grows from 0.8 to 2.2 tiles in radius over one second.",
          "The cloud damages players only: the first tick comes 1.5 seconds after the burst, then every 1.2 seconds, for at most three ticks of 4 damage each (scaled by floor). The cloud fades after 4.2 seconds, needs a clear line to hit you, and nearby clouds merge instead of stacking. Up to four clouds can exist at once."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Bloater can carry the Armored, Glowing, Rallying or Mending prefix. See [[enemies/elite-enemies|Elite Enemies]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Kill it at range, ideally while it is still walking toward you, so the cloud forms away from your position.",
          "If a cloud does catch you, leave the red circle; you have 1.5 seconds before the first tick.",
          "Do not shoot it point blank or in a narrow corridor: you will be standing in the burst.",
          "The gas needs a clear line to reach you: a wall between you and the burst protects you."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bomber"
      },
      {
        "category": "enemies",
        "slug": "warden"
      },
      {
        "category": "bosses",
        "slug": "the-fumes"
      }
    ]
  },
  {
    "slug": "human-cannonball",
    "category": "enemies",
    "name": "Human Cannonball",
    "subtitle": "Clown that fires itself",
    "summary": "A clown in a striped cannon barrel that lights its own fuse and launches itself at the spot where you stand. Step aside and it faceplants, helpless.",
    "image": {
      "src": "/fz/wiki/enemies/human-cannonball.png",
      "alt": "Human Cannonball sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie (circus)"
      },
      {
        "label": "Health",
        "value": "44"
      },
      {
        "label": "Speed",
        "value": "2.8 tiles/s"
      },
      {
        "label": "Damage",
        "value": "14 (landing blast)"
      },
      {
        "label": "Drops",
        "value": "2-3 [[items/scrap|scrap]], 2% weapon chance; bonus scrap for a mid-air kill"
      },
      {
        "label": "First seen",
        "value": "Floor 3 (Poolrooms), wave 5"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Human Cannonball waddles after you in its striped barrel, backs up for a run-up and fires itself across the room. Its debut banner is *HUMAN CANNONBALLS*. It first shows up on wave 5 of the [[levels/poolrooms|Poolrooms]] and of [[levels/lights-out]], and does not appear before the third floor. One at a time, two with three or more players."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "When it is 5 to 11.5 tiles from you (3 tiles if it is cornered) it lights a fuse. In the same instant a solid red strip, 3 tiles wide, locks onto the floor where you stand and never moves. The clown shuffles backward for one second, then leaves the barrel and flies a flat, fast arc for 0.7 to 0.8 seconds.",
          "It lands on the strip and explodes 0.1 seconds later: a radius of 1.5 tiles, 14 damage to players (less toward the edge, scaled by floor), 40 to other zombies, and chips of damage to walls and planks. If you left the strip it lands on nothing, faceplants for 1.4 seconds and takes 50% more damage while it lies there.",
          "After a shot the Cannonball waits roughly 6 to 7.5 seconds before the next one. A Cannonball killed on the ground becomes a bowling ball: its corpse is launched along your line of fire and bumps zombies in its path for 25 damage."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Human Cannonball can carry the Armored, Glowing or Mending prefix. It cannot be Electric, Fast, Splitting or Rallying. See [[enemies/elite-enemies|Elite Enemies]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Move off the red strip as soon as it appears. You have about a second.",
          "Lure the pack onto the strip, then step out: the landing blast hits them instead of you.",
          "Shoot it in the air and it bursts in confetti, paying bonus [[items/scrap|scrap]].",
          "When it faceplants, it is a free target for 1.4 seconds at 50% extra damage."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Wave mode"
    ],
    "trivia": [
      "Hitting a Human Cannonball in mid-air is called a skeet shot and pays 2 bonus [[items/scrap|scrap]]."
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "juggler"
      },
      {
        "category": "enemies",
        "slug": "bomber"
      },
      {
        "category": "bosses",
        "slug": "the-swimmer"
      }
    ]
  },
  {
    "slug": "taffy",
    "category": "enemies",
    "name": "Taffy",
    "subtitle": "Candy lump with a rope",
    "summary": "A pink-and-cream candy lump that squats, throws a sticky rope onto your ankle and tries to reel you in. Pull the rope tight and it snaps, and the Taffy pays for it.",
    "image": {
      "src": "/fz/wiki/enemies/taffy.png",
      "alt": "Taffy sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Type",
        "value": "Zombie (candy)"
      },
      {
        "label": "Health",
        "value": "70"
      },
      {
        "label": "Speed",
        "value": "2.4 tiles/s"
      },
      {
        "label": "Damage",
        "value": "12 (slap)"
      },
      {
        "label": "Drops",
        "value": "2-3 [[items/scrap|scrap]], 0.8% weapon chance; up to 3 bead scrap on a snapped rope"
      },
      {
        "label": "First seen",
        "value": "Floor 3 (Poolrooms), wave 3"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Taffy debuts on wave 3 of the [[levels/poolrooms|Poolrooms]], where it appears alone, and carries the banner *SOMETHING REACHES FOR YOU*. It can also turn up from wave 4 of the [[levels/habitable-zone|Warehouse]] and [[levels/pipe-dreams]], and is most common in the Poolrooms and the [[levels/party-room|Party Room]]. It never appears on the first floor. At most one is alive at a time, two with three or more players."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "A Taffy walks at 2.4 tiles per second and slaps for 12. Every 11 to 12 seconds, when a player is 2 to 3 tiles away on a similar floor, it squats and the ground under that player lights with a red ring 3.2 tiles wide. The ring never moves. After 1.2 seconds the Taffy throws a rope that crosses the gap in a quarter of a second and knots on the player's ankle.",
          "Once latched, the Taffy runs along the rope toward you at 3.2 tiles per second. The rope does not pull you; it only stretches. If you move away until it is about 1.6 times its starting length, or after 3 seconds, or when it takes a heavy hit, it snaps. The strand shows its strain with fibres, then knots, then a dotted line before the tear.",
          "When the rope snaps, the half still attached to the Taffy whips back and sweeps every zombie along its path (up to six, once each) for a flat hit of about 25 damage that scales with depth, flinging them toward the Taffy. The Taffy staggers for 0.8 seconds with a gold outline and takes 50% extra damage; two players tearing two ropes inside the same moment stagger it for 1.2 seconds. A rope you tear by running also spills up to three [[items/scrap|scrap]] beads.",
          "Its body is soft: it takes 20% less damage with no rope out, normal damage with one rope, and 20% more with two. A hit of at least 15% of its maximum health within one second (at most 120) cuts the ropes. From the fourth floor on, a lone player gets two ropes at once. Dying with a rope out snaps the rope, and without one the Taffy still lashes three nearby zombies with its back strings."
        ]
      },
      {
        "heading": "Variants",
        "paragraphs": [
          "A Taffy can carry only the Armored or Glowing prefix. See [[enemies/elite-enemies|Elite Enemies]]."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Leave the red ring during the 1.2 second squat.",
          "If you are latched, run. Stand still and the Taffy walks in and slaps you.",
          "Run with the pack on your heels: when the rope tears, the lash drags the zombies that were chasing you into a heap.",
          "In [[mechanics/co-op-multiplayer|co-op]], run in opposite directions so both ropes tear together and the Taffy is stunned longer.",
          "Burst it down with a heavy hit to cut the rope early, or punish the golden stagger right after a tear."
        ]
      }
    ],
    "tags": [
      "Zombie",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "guest"
      },
      {
        "category": "enemies",
        "slug": "juggler"
      },
      {
        "category": "bosses",
        "slug": "the-swimmer"
      }
    ]
  },
  {
    "slug": "hunter",
    "category": "enemies",
    "name": "The Hunter",
    "subtitle": "Event wave elite",
    "summary": "A near-black elite Runner that is completely immune until you shine a [[items/flashlight|flashlight]] on it. It appears only in the Hunter [[mechanics/event-waves|event wave]].",
    "infobox": [
      {
        "label": "Type",
        "value": "Elite"
      },
      {
        "label": "Health",
        "value": "320 (scales with floor and wave)"
      },
      {
        "label": "Speed",
        "value": "5.9 tiles/s (3.2 while exposed)"
      },
      {
        "label": "Damage",
        "value": "12 (Runner damage x1.5)"
      },
      {
        "label": "Drops",
        "value": "A Rare or better weapon for every player, plus 20 [[items/scrap|scrap]]"
      },
      {
        "label": "First seen",
        "value": "Wave 4 of a Hunter event floor, from Floor 2"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Hunter is the star of one of the [[mechanics/event-waves|event waves]]. Wave 4 of every floor is an event wave, and from the second floor on one of the possible events is *THE HUNTER*, announced with *WAVE 4: THE HUNTER. SHINE A LIGHT*. It is most likely on [[levels/pipe-dreams]] and [[levels/lights-out]]. The first floor never rolls it.",
          "A single Hunter spawns at the spot farthest from the players and heads straight for them. The rest of the wave is about 30% smaller than usual."
        ]
      },
      {
        "heading": "Behaviour",
        "paragraphs": [
          "The Hunter is a [[enemies/runner|Runner]] with a near-black body and glowing pale eyes. It moves at 90% of a Runner's speed and bites for 50% more damage. While immune, bullets spark off it and *IMMUNE - LIGHT IT UP* floats above it.",
          "To hurt it you must light it: any player's [[items/flashlight|flashlight]] beam with enough power and a line of sight, or the Hunter standing in a bright area, counts. A charge bar on the objective fills at one per second while lit and needs 2 seconds in total. Out of the light the charge drains slowly, at 0.15 per second.",
          "Once charged, the Hunter turns pulsing red and stays exposed for 9 seconds. In that window it takes 50% extra damage and moves at 55% of its normal speed. Then it becomes immune again and the charge resets to zero.",
          "Killing it completes the objective: every player receives a weapon of at least Rare quality and 20 [[items/scrap|scrap]]. If the wave ends with the Hunter alive, the objective fails."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Keep the [[items/flashlight|flashlight]] on it from the moment it appears; you only need 2 seconds of light, and it does not have to be continuous.",
          "Save your strongest weapon for the exposed window, and burst it down within 9 seconds.",
          "In [[mechanics/co-op-multiplayer|co-op]], one player holds the light while the others shoot.",
          "Do not fire at it while it is immune. Hits do nothing and only waste shots."
        ]
      }
    ],
    "tags": [
      "Elite",
      "Event wave"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "elite-enemies"
      },
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "enemies",
        "slug": "smiler"
      },
      {
        "category": "bosses",
        "slug": "the-smiler"
      },
      {
        "category": "mechanics",
        "slug": "event-waves"
      },
      {
        "category": "mechanics",
        "slug": "flashlight-and-light"
      }
    ]
  },
  {
    "slug": "elite-enemies",
    "category": "enemies",
    "name": "Elite Enemies",
    "subtitle": "Prefix modifiers",
    "summary": "From wave 3 of each floor, ordinary enemies can spawn as elites carrying one of seven prefixes: Armored, Electric, Fast, Splitting, Glowing, Rallying and Mending. Each prefix tints the enemy and changes how it fights.",
    "infobox": [
      {
        "label": "Type",
        "value": "Modifier"
      },
      {
        "label": "Health",
        "value": "Varies by prefix"
      },
      {
        "label": "Speed",
        "value": "Varies by prefix"
      },
      {
        "label": "Damage",
        "value": "+15% for every elite"
      },
      {
        "label": "Drops",
        "value": "+50% [[items/scrap|scrap]], at least 8% weapon chance"
      },
      {
        "label": "First seen",
        "value": "Wave 3 of each floor"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "An elite is a regular enemy with a prefix such as *Armored Brute* or *Fast Guest*. The prefix tints the sprite and adds one special rule. Elites never appear on waves 1 and 2 of a floor, and the [[enemies/mimic|Mimic]] can never be elite. The [[enemies/hunter|Hunter]] is a separate event enemy."
        ]
      },
      {
        "heading": "Spawn chance",
        "paragraphs": [
          "Elites are rolled for every enemy spawned from wave 3 onward. The chance starts at 5% on wave 3, rises 3% for each wave after that and 2% for each floor you have descended, and is capped at 30%. On boss waves the chance is halved. For example, a spawn is 5% likely to be elite on wave 3 of the first floor, and about 22% on wave 6 of the fifth floor.",
          "Only so many elites can be alive at once: 2 on the first floor, plus 1 for every floor beyond it and 1 for every extra player, up to a maximum of 8. Rallying is limited to one alive at a time (two with three or more players) and Mending to two. Rallying elites do not spawn on boss waves."
        ]
      },
      {
        "heading": "Common effects",
        "bullets": [
          "Deal 15% more damage.",
          "Drop 50% more [[items/scrap|scrap]] (rounded up, at least one extra).",
          "Drop a weapon at least 8% of the time.",
          "Take a colour tint, shown in the table below.",
          "Death effects (the Splitting children, the Electric discharge, the Glowing Battery) do not trigger when the enemy is erased without a corpse by the Void effect."
        ]
      },
      {
        "heading": "The seven prefixes",
        "table": {
          "columns": [
            "Prefix",
            "Tint",
            "Effect",
            "Appears from",
            "Relative frequency"
          ],
          "rows": [
            [
              "Armored",
              "Steel blue-grey",
              "Health x1.2. Bullets and pellets deal 40% less, explosions 15% less, melee is unchanged. Knockback taken halved. Speed x0.9. Pings and sparks on deflected shots.",
              "Wave 3, any floor",
              "25"
            ],
            [
              "Electric",
              "Cyan",
              "Every 2.5 seconds (first after 1 second) it arcs at the nearest player within 5 tiles in line of sight for 6 damage; 8 tiles if both stand in water, and the shock spreads through water. On death it discharges for 10 damage within 2.2 tiles.",
              "Wave 3, any floor",
              "20"
            ],
            [
              "Fast",
              "Yellow",
              "Speed x1.4 (never above 9.5 tiles/s), attack wind-up x0.8, cooldown x0.7, health x0.85. Leaves an afterimage trail.",
              "Wave 3, any floor",
              "25"
            ],
            [
              "Splitting",
              "Magenta",
              "On death it splits into two children, each with 35% of its health, 80% of its damage and 85% of its size. Children never split again and are never elite. A Brute splits into Shamblers.",
              "Wave 3, any floor",
              "15"
            ],
            [
              "Glowing",
              "Pale cream",
              "Health x1.1. Drawn at full brightness even in the dark, with a pulsing halo and a bright rim. Drops one Battery on death. A Smiler within 3 tiles treats it as light.",
              "Wave 3, any floor",
              "15"
            ],
            [
              "Rallying",
              "Red-pink",
              "Health x1.25, speed x0.95. Allies within 4.5 tiles move 10% faster and take 8% less damage. Every 8 seconds it winds up for 0.9 seconds, then surges all allies within 7 tiles (up to 8) to +30% speed for 4 seconds. Stunning it during the wind-up cancels the surge.",
              "Floor 2 onward, not on boss waves",
              "12"
            ],
            [
              "Mending",
              "Green",
              "Heals 3.5% of its maximum health per second, after 1.5 seconds without taking damage, but only up to 60% health. Does not heal while burning or frozen. A green plus sign floats above it as it heals.",
              "Floor 3 onward",
              "10"
            ]
          ]
        }
      },
      {
        "heading": "Which enemies can carry which prefix",
        "paragraphs": [
          "Not every enemy can carry every prefix. The Mimic never becomes elite."
        ],
        "table": {
          "columns": [
            "Enemy",
            "Prefixes it can carry"
          ],
          "rows": [
            [
              "[[enemies/shambler|Shambler]], [[enemies/runner|Runner]], [[enemies/crawler|Crawler]], [[enemies/brute|Brute]], [[enemies/digger|Digger]]",
              "All seven"
            ],
            [
              "[[enemies/hound|Hound]]",
              "Armored, Electric, Splitting, Glowing (never Fast, Rallying or Mending)"
            ],
            [
              "[[enemies/guest|Guest]]",
              "Armored, Electric, Fast, Glowing, Rallying, Mending (never Splitting)"
            ],
            [
              "[[enemies/smiler|Smiler]]",
              "Armored, Electric, Fast, Splitting (never Glowing, Rallying or Mending)"
            ],
            [
              "[[enemies/mimic|Mimic]]",
              "None"
            ],
            [
              "[[enemies/juggler|Juggler]]",
              "Armored, Electric, Glowing, Mending"
            ],
            [
              "[[enemies/warden|Warden]]",
              "Electric, Fast, Glowing, Rallying, Mending"
            ],
            [
              "[[enemies/bomber|Bomber]]",
              "Armored, Electric, Glowing"
            ],
            [
              "[[enemies/bloater|Bloater]]",
              "Armored, Glowing, Rallying, Mending"
            ],
            [
              "[[enemies/human-cannonball|Human Cannonball]]",
              "Armored, Glowing, Mending"
            ],
            [
              "[[enemies/taffy|Taffy]]",
              "Armored, Glowing"
            ]
          ]
        }
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Armored: switch to melee, explosives or the strongest weapon you have. Bullets do 40% less.",
          "Electric: keep out of five tiles, and do not fight it in water. Do not stand next to its corpse.",
          "Fast: kill it at range, or hit it as it winds up. It is fragile.",
          "Splitting: expect two more enemies, so do not stand in a corner.",
          "Glowing: a free beacon in the dark. Kill it, and grab the Battery.",
          "Rallying: kill it before it pulses. The enemies around it are about to speed up.",
          "Mending: burst it down, or keep it burning; it heals when left alone for a moment."
        ]
      }
    ],
    "tags": [
      "Elite",
      "Modifier",
      "Wave mode"
    ],
    "related": [
      {
        "category": "enemies",
        "slug": "bestiary-overview"
      },
      {
        "category": "enemies",
        "slug": "hunter"
      },
      {
        "category": "enemies",
        "slug": "shambler"
      },
      {
        "category": "enemies",
        "slug": "runner"
      },
      {
        "category": "perks",
        "slug": "perks-overview"
      },
      {
        "category": "mechanics",
        "slug": "difficulty-scaling"
      }
    ]
  }
];
