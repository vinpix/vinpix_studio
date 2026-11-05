import type { WikiArticle } from "../types";

export const characters: WikiArticle[] = [
  {
    "slug": "accountant",
    "category": "characters",
    "name": "The Accountant",
    "subtitle": "Damage specialist, starting character",
    "summary": "The Accountant is the default survivor of Floor Zero: a tired office worker with a briefcase whose skill briefly boosts his fire rate at no extra energy cost.",
    "image": {
      "src": "/fz/wiki/characters/accountant.png",
      "alt": "The Accountant idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Damage"
      },
      {
        "label": "Skill",
        "value": "Crunch Time"
      },
      {
        "label": "Passive",
        "value": "Extra [[items/scrap]]"
      },
      {
        "label": "Difficulty",
        "value": "Easy"
      },
      {
        "label": "Health",
        "value": "100"
      },
      {
        "label": "Energy",
        "value": "100"
      },
      {
        "label": "Skill cooldown",
        "value": "45 s"
      },
      {
        "label": "Skill duration",
        "value": "10 s"
      },
      {
        "label": "Unlock",
        "value": "Free from the start"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Accountant is the character every new player starts with. He has no special tricks beyond more [[items/scrap|scrap]] and one strong skill, which makes him the baseline that other survivors are measured against.",
          "His health and energy are both 100."
        ]
      },
      {
        "heading": "Passive: Extra Scrap",
        "paragraphs": [
          "Passive: +10% [[items/scrap|scrap]] from everything you collect. Over a long run the extra scrap pays for more [[items/workbench|workbench]] upgrades and [[items/vending-machine|vending machine]] purchases."
        ]
      },
      {
        "heading": "Skill: Crunch Time",
        "paragraphs": [
          "Crunch Time (shown on the HUD as Rush Hour) boosts the fire rate of your guns for 10 seconds, and melee and device cooldowns tick down faster as well. The boost fades in three stages:"
        ],
        "bullets": [
          "Rush Hour, the first 2 seconds: fire rate x2.0.",
          "Overtime, up to 6 seconds: fire rate x1.7.",
          "Last Call, the remaining 4 seconds: fire rate x1.4.",
          "The skill is energy-neutral: each shot costs less energy in proportion to the speed-up, so you burn energy at the normal rate while firing more shots.",
          "While a boss is alive, the bonus is reduced to 80% of its normal strength, and it is trimmed further if your build already fires near the fire-rate cap.",
          "When the window ends, a Receipt slip shows how many extra shots you got (it only prints for 3 or more)."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Save Crunch Time for the start of a wave or for a boss phase where you can keep your guns on target for the full 10 seconds.",
          "Because he uses energy at the normal rate, pair him with fire-rate cards for a build that scales with the skill.",
          "The [[items/scrap|scrap]] bonus rewards long, thorough clears: break everything and pick up every drop."
        ]
      }
    ],
    "tags": [
      "Damage",
      "Easy"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "duck"
      },
      {
        "category": "characters",
        "slug": "stray"
      },
      {
        "category": "characters",
        "slug": "birthday-kid"
      },
      {
        "category": "items",
        "slug": "scrap"
      },
      {
        "category": "mechanics",
        "slug": "getting-started"
      }
    ]
  },
  {
    "slug": "banana",
    "category": "characters",
    "name": "The Banana",
    "subtitle": "Trapper",
    "summary": "The Banana lays peels with every mid-air landing and turns a belly slide into a slick lane that trips and punishes everything that follows.",
    "image": {
      "src": "/fz/wiki/characters/banana.png",
      "alt": "The Banana idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Trapper"
      },
      {
        "label": "Skill",
        "value": "Peel Off"
      },
      {
        "label": "Passive",
        "value": "Peels"
      },
      {
        "label": "Difficulty",
        "value": "Easy"
      },
      {
        "label": "Health",
        "value": "84"
      },
      {
        "label": "Energy",
        "value": "110"
      },
      {
        "label": "Skill cooldown",
        "value": "40 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Banana is a fragile trapper that wins by making the floor dangerous for zombies. He has low health, so his kit is about keeping foes tripping instead of hitting him.",
          "He can slide, double jump and skate on his own lane."
        ]
      },
      {
        "heading": "Passive: Peels",
        "paragraphs": [
          "Landing after a mid-air jump lays a peel on the ground. Foes that step on a peel slip and are left helpless for a moment."
        ]
      },
      {
        "heading": "Skill: Peel Off",
        "paragraphs": [
          "Peel Off is an 8-second skill. It starts with a 2-second unhurt belly slide through the pack at high speed. Every foe you pass (up to 8) slips and takes a pratfall of damage, and the slide leaves a slick lane behind you for the rest of the skill."
        ],
        "bullets": [
          "Foes that step on the lane slip again, up to 3 times each, and take a pratfall hit each time.",
          "A regular enemy left under the execute line by pratfalls dies on the spot.",
          "On the lane you move faster than normal (you skate on your own lane).",
          "When the skill ends the lane peels away with a last split pratfall on the bodies still lying on it, and one peel waits where you stopped.",
          "Bosses are never victims of peels or the lane."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Jump, air-jump and land often to keep peels spread across the corridor.",
          "Start the slide into the thickest part of a crowd to slip the maximum 8 foes, then retreat along the lane so that chasers cross it.",
          "With only 84 health you cannot trade blows: use the slide's unhurt window to cross dangerous gaps."
        ]
      }
    ],
    "tags": [
      "Trapper",
      "Easy"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "duck"
      },
      {
        "category": "characters",
        "slug": "mascot"
      }
    ]
  },
  {
    "slug": "mascot",
    "category": "characters",
    "name": "The Mascot",
    "subtitle": "Tank",
    "summary": "The Mascot is a huge costumed mascot that soaks up bites, then hugs the whole crowd in, squeezes it three times and pops it across the room.",
    "image": {
      "src": "/fz/wiki/characters/mascot.png",
      "alt": "The Mascot idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Tank"
      },
      {
        "label": "Skill",
        "value": "Bear Hug"
      },
      {
        "label": "Passive",
        "value": "Pile-On"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "112"
      },
      {
        "label": "Energy",
        "value": "70"
      },
      {
        "label": "Skill cooldown",
        "value": "45 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Mascot is the tankiest survivor, with 112 health, but only 70 energy: melee is its real weapon, so the usual energy guns are a poor match for it.",
          "He wants zombies on him. The more of them cling to him, the harder his skill hits."
        ]
      },
      {
        "heading": "Passive: Pile-On",
        "paragraphs": [
          "Each zombie currently on you (up to 4) makes bites 7% weaker and drags your walk speed down by 4%. The same pile also strengthens every squeeze and the final pop of Bear Hug."
        ]
      },
      {
        "heading": "Skill: Bear Hug",
        "paragraphs": [
          "Bear Hug starts with a short half-second swell where you brace, then an 8-second hug. During the hug you take 45% less damage and walk at 60% speed, and the crowd is pulled towards you every 0.4 seconds."
        ],
        "bullets": [
          "Squeezes land at 2.5, 4.5 and 6.5 seconds, each taking a share of every foe's health; the pile makes each squeeze bigger.",
          "At 8 seconds the hug ends in a Pop that hurls the crowd away and deals a larger share. With a pile of 3 or more the pop is a Full House and hits harder. A regular enemy left under the execute line dies.",
          "Nearby allies are braced and take less damage while the hug lasts.",
          "A short padded recovery follows the pop."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Run into the crowd on purpose. A full pile of 4 softens each bite by 28% and makes every squeeze and the final pop hit harder.",
          "Use melee weapons and melee cards; his small energy pool will not support heavy gun use.",
          "In [[mechanics/co-op-multiplayer|co-op]], hug near teammates: the brace covers allies standing close to you."
        ]
      }
    ],
    "tags": [
      "Tank",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "accountant"
      },
      {
        "category": "characters",
        "slug": "roach"
      }
    ]
  },
  {
    "slug": "water-boy",
    "category": "characters",
    "name": "The Water Boy",
    "subtitle": "Soaker",
    "summary": "The Water Boy hauls an [[items/almond-water|almond water]] jug on his back, lobs a bath onto the floor and then plugs it in to electrocute everything standing in it.",
    "image": {
      "src": "/fz/wiki/characters/water-boy.png",
      "alt": "The Water Boy idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Soaker"
      },
      {
        "label": "Skill",
        "value": "Bath Time"
      },
      {
        "label": "Passive",
        "value": "Hydration"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "100"
      },
      {
        "label": "Energy",
        "value": "120"
      },
      {
        "label": "Skill cooldown",
        "value": "44 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Water Boy turns water into a weapon. His energy pool of 120 is higher than most.",
          "He carries a big jug of [[items/almond-water|almond water]] on his back."
        ]
      },
      {
        "heading": "Passive: Hydration",
        "paragraphs": [
          "Each [[items/almond-water|almond water]] bottle you pick up cuts the skill cooldown by 3 seconds. The catch: while your jug is full you move 8% slower."
        ]
      },
      {
        "heading": "Skill: Bath Time",
        "paragraphs": [
          "Bath Time lobs a bath that soaks the floor for 8 seconds. Tap the skill again to plug it in for 30 energy. The live wire runs for 4.5 seconds."
        ],
        "bullets": [
          "Every half second, up to 5 soaked foes take electric damage and are stunned for 0.35 seconds.",
          "The wire only reaches soaked foes, so stand your ground until the crowd is inside the pool before you plug it in."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Collect [[items/almond-water|almond water]] bottles to shorten the cooldown, but remember that a full jug slows you down.",
          "Lob the bath where foes must pass (a corridor mouth is ideal), then plug it in when it is full.",
          "Do not plug in too early: the zap needs foes to be standing in the water."
        ]
      }
    ],
    "tags": [
      "Soaker",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "duck"
      },
      {
        "category": "characters",
        "slug": "goldfish"
      },
      {
        "category": "items",
        "slug": "almond-water"
      },
      {
        "category": "mechanics",
        "slug": "water-and-shock"
      }
    ]
  },
  {
    "slug": "duck",
    "category": "characters",
    "name": "Rubber Duck",
    "subtitle": "Control",
    "summary": "The Rubber Duck is a bath toy come alive. It floats over water, glides in the air and quacks the whole room into a dazed stupor before ducks rain from above.",
    "image": {
      "src": "/fz/wiki/characters/duck.png",
      "alt": "Rubber Duck idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Control"
      },
      {
        "label": "Skill",
        "value": "Quack!!"
      },
      {
        "label": "Passive",
        "value": "Floats"
      },
      {
        "label": "Difficulty",
        "value": "Easy"
      },
      {
        "label": "Health",
        "value": "104"
      },
      {
        "label": "Energy",
        "value": "110"
      },
      {
        "label": "Skill cooldown",
        "value": "38 s"
      },
      {
        "label": "Skill duration",
        "value": "9 s"
      },
      {
        "label": "Unlock",
        "value": "Free from the start"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Rubber Duck is a free, beginner-friendly control character. Its health is 104 and its energy 110.",
          "Every part of its kit is about keeping foes away from you: a daze, a rain of ducks and a glide that stays out of reach."
        ]
      },
      {
        "heading": "Passive: Floats",
        "paragraphs": [
          "Water never slows you down, and after your air jump you can hold jump to glide for a short time."
        ]
      },
      {
        "heading": "Skill: Quack!!",
        "paragraphs": [
          "Quack!! sends out a ring. Every foe inside it hops up in fright and stands dazed for 1.8 seconds, and mini ducks float off. You pop up and get your air jump back."
        ],
        "bullets": [
          "After the ring comes a 9-second duck rain: 21 rubber ducks fall on foes near you, each bonk dealing damage and a short daze.",
          "A giant mega duck lands on the biggest crowd at about 8.4 seconds.",
          "Bosses are skipped by the rain."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Use Quack!! as an escape when you are surrounded: the daze gives you time to reposition while the ducks keep working.",
          "The glide is your friend on tall maps: hold jump after the air jump to cross gaps and stay above melee enemies.",
          "Stay near groups: the rain falls on foes near you, so retreating too far wastes it."
        ]
      }
    ],
    "tags": [
      "Control",
      "Easy"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "accountant"
      },
      {
        "category": "characters",
        "slug": "water-boy"
      },
      {
        "category": "mechanics",
        "slug": "water-and-shock"
      }
    ]
  },
  {
    "slug": "goldfish",
    "category": "characters",
    "name": "Goldfish",
    "subtitle": "Escape artist",
    "summary": "The Goldfish is a goldfish in a bowl on little legs: it forgives its own damage, leaves a wet wake behind it and can swim back along it in an instant.",
    "image": {
      "src": "/fz/wiki/characters/goldfish.png",
      "alt": "Goldfish idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Escape"
      },
      {
        "label": "Skill",
        "value": "Backstroke"
      },
      {
        "label": "Passive",
        "value": "Short Memory"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "84"
      },
      {
        "label": "Energy",
        "value": "100"
      },
      {
        "label": "Skill cooldown",
        "value": "39.5 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Goldfish walks around in a fish bowl on two legs. It is fragile at 84 health, but its kit is about forgetting damage and escaping from it.",
          "It rewards players who can keep track of where they were a few seconds ago."
        ]
      },
      {
        "heading": "Passive: Short Memory",
        "paragraphs": [
          "If you go 3 seconds without being hit, half of your recent hit streak heals back (the healed amount is capped at 20% of max health and obeys the normal heal cap). While the skill is running, the delay is cut to 1.5 seconds."
        ]
      },
      {
        "heading": "Skill: Backstroke",
        "paragraphs": [
          "Backstroke lasts 8 seconds. Your path of the last 6 seconds becomes a wet wake: a ribbon that slows and drowns the zombies standing on it."
        ],
        "bullets": [
          "Tap the skill a second time to swim back along the wake to where you were a few seconds ago. The whole wake then strikes every body on it, and wetter bodies take more damage.",
          "A regular enemy left under the execute line dies.",
          "If you do not tap again, the wake collapses at 8 seconds with the same strike but no teleport.",
          "Arrival is a splash, not a ground slam."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Run through the crowd before the second tap so that the wake covers as many foes as possible.",
          "Swim back as an emergency exit: it works as both a teleport and a damage move.",
          "Your passive heals only if you avoid hits for a few seconds, so use the second tap to break line of contact."
        ]
      }
    ],
    "tags": [
      "Escape",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "water-boy"
      },
      {
        "category": "characters",
        "slug": "duck"
      },
      {
        "category": "mechanics",
        "slug": "water-and-shock"
      }
    ]
  },
  {
    "slug": "roach",
    "category": "characters",
    "name": "The Cockroach",
    "subtitle": "Survivor",
    "summary": "The Cockroach refuses to die: a killing hit leaves it at 1 HP once per wave and bursts it into roaches, and its skill lets loose a hungry swarm.",
    "image": {
      "src": "/fz/wiki/characters/roach.png",
      "alt": "The Cockroach idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Survivor"
      },
      {
        "label": "Skill",
        "value": "Infestation"
      },
      {
        "label": "Passive",
        "value": "Not Today"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "88"
      },
      {
        "label": "Energy",
        "value": "90"
      },
      {
        "label": "Skill cooldown",
        "value": "42 s"
      },
      {
        "label": "Skill duration",
        "value": "10 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Cockroach is the survivor of the Backrooms. Its health is 88 and its energy is 90, but it has a life insurance policy built in.",
          "Its swarm eats the wounded first and gets hungrier with every kill."
        ]
      },
      {
        "heading": "Passive: Not Today",
        "paragraphs": [
          "Once per wave, a hit that would kill you instead leaves you at 1 HP and bursts you into 6 roaches. After that, you limp for 5 seconds at reduced speed. It resets every wave."
        ]
      },
      {
        "heading": "Skill: Infestation",
        "paragraphs": [
          "After a short tell, roaches pour out of you for a 10-second infestation. They go for the wounded first, latch on, bite a share of health, slow foes and make them flinch."
        ],
        "bullets": [
          "Every kill a roach covers makes the whole colony hungrier (+5% per kill, up to +25%), breeds 2 hatchlings and feeds you 2 HP.",
          "A roach that has been poured out lives for the whole skill; at the end the swarm scatters and a Feast count floats up with the number of kills."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Use Not Today as a free life per wave: take risks near the end of a wave knowing the safety net exists, but remember the limp afterwards.",
          "Use Infestation on a crowd of already wounded foes to start the colony's growth.",
          "Because the colony favors wounded bodies, shoot a few foes first and then call the swarm."
        ]
      }
    ],
    "tags": [
      "Survivor",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "mascot"
      },
      {
        "category": "characters",
        "slug": "bacteria"
      }
    ]
  },
  {
    "slug": "poser",
    "category": "characters",
    "name": "The Poser",
    "subtitle": "Decoy",
    "summary": "The Poser freezes in place to slow whatever stares at it, and strikes a pose that lands a plastic twin, a living decoy that holds a crowd until it pops.",
    "image": {
      "src": "/fz/wiki/characters/poser.png",
      "alt": "The Poser idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Decoy"
      },
      {
        "label": "Skill",
        "value": "Strike a Pose"
      },
      {
        "label": "Passive",
        "value": "Do Not Blink"
      },
      {
        "label": "Difficulty",
        "value": "Hard"
      },
      {
        "label": "Health",
        "value": "104"
      },
      {
        "label": "Energy",
        "value": "100"
      },
      {
        "label": "Skill cooldown",
        "value": "47 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Poser is a pale, mannequin-like character built around standing still. It is the hardest character to play well because its passive punishes movement and rewards patience.",
          "It plays like a sniper with a bodyguard: slow targets from a spot and let the twin tank."
        ]
      },
      {
        "heading": "Passive: Do Not Blink",
        "paragraphs": [
          "Stand still for 1 second and the foes in the cone you are aiming at crawl at 60% of their speed. Move, and they lunge at you."
        ]
      },
      {
        "heading": "Skill: Strike a Pose",
        "paragraphs": [
          "Strike a Pose throws a plastic twin 4 tiles ahead under a spotlight. 5 foes (one more per extra player) beat on it for 8 seconds, while it strikes a pose every 2 seconds that chips and shoves anything nearby."
        ],
        "bullets": [
          "The twin pops at the end of its life, after taking 40 bites, or when you tap the skill a second time.",
          "The pop hits foes around it."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Plant yourself behind the twin and shoot the crowd that is beating on it.",
          "Keep still while a group approaches: the slow gives you extra seconds to damage them.",
          "Pop the twin early if the crowd is already bunched up around it."
        ]
      }
    ],
    "tags": [
      "Decoy",
      "Hard"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "skin-stealer"
      },
      {
        "category": "characters",
        "slug": "pumpkin"
      }
    ]
  },
  {
    "slug": "skin-stealer",
    "category": "characters",
    "name": "The Skin-Stealer",
    "subtitle": "Disguise",
    "summary": "The Skin-Stealer slips into a zombie's skin to walk through the crowd unseen, stitches the bodies together and rips all the seams at once.",
    "image": {
      "src": "/fz/wiki/characters/skin-stealer.png",
      "alt": "The Skin-Stealer idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Disguise"
      },
      {
        "label": "Skill",
        "value": "Borrowed Skin"
      },
      {
        "label": "Passive",
        "value": "Nobody Home"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "104"
      },
      {
        "label": "Energy",
        "value": "90"
      },
      {
        "label": "Skill cooldown",
        "value": "40 s"
      },
      {
        "label": "Skill duration",
        "value": "10 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Skin-Stealer is an eerie, pale figure whose kit is all about stealth and detonation. It has 104 health and 90 energy."
        ]
      },
      {
        "heading": "Passive: Nobody Home",
        "paragraphs": [
          "Enemy blasts pass straight through you, so explosions never hurt you. The price is that healing works at 60% strength (from the first blast of the run that would have hit you)."
        ]
      },
      {
        "heading": "Skill: Borrowed Skin",
        "paragraphs": [
          "Borrowed Skin lets you wear the nearest zombie's skin for 10 seconds. Ordinary zombies ignore you while you wear it. Walk through the crowd to stitch up to 10 bodies."
        ],
        "bullets": [
          "Rip the seams with a second tap, your first gun shot, taking a hit or the end of the timer.",
          "The ripped skin releases the donor's ring and a rolling pop of every stitched body.",
          "A worn Skin-Stealer keeps its team colour, so allies can still tell who it is."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Stitch as many bodies as you can before you rip. Walk slowly through the thickest part of the crowd.",
          "Use the blast immunity to stand inside explosions and detonators that would kill other survivors.",
          "Healing is weak for you: avoid damage, since it is hard to recover."
        ]
      }
    ],
    "tags": [
      "Disguise",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "poser"
      },
      {
        "category": "characters",
        "slug": "bacteria"
      },
      {
        "category": "enemies",
        "slug": "mimic"
      }
    ]
  },
  {
    "slug": "pumpkin",
    "category": "characters",
    "name": "The Pumpkin",
    "subtitle": "Fear specialist",
    "summary": "The Pumpkin is a short, round, living jack-o'-lantern. Zombies that reach its glowing face flinch, and a lantern glare terrifies the crowd in front of it.",
    "image": {
      "src": "/fz/wiki/characters/pumpkin.png",
      "alt": "The Pumpkin idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Fear"
      },
      {
        "label": "Skill",
        "value": "Boo!"
      },
      {
        "label": "Passive",
        "value": "Carved Face"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "96"
      },
      {
        "label": "Energy",
        "value": "110"
      },
      {
        "label": "Skill cooldown",
        "value": "40 s"
      },
      {
        "label": "Skill duration",
        "value": "9 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Pumpkin is a living jack-o'-lantern. Despite the cute look it plays like a crowd controller who needs to keep its face towards the horde.",
          "Its health is 96 and its energy is 110."
        ]
      },
      {
        "heading": "Passive: Carved Face",
        "paragraphs": [
          "Zombies that reach your face flinch for 1.0 seconds (1.8 seconds if you are standing in the dark), and then they are brave for 6 seconds. Your back is open: anything that reaches it is not scared."
        ]
      },
      {
        "heading": "Skill: Boo!",
        "paragraphs": [
          "Boo! is a 9-second Lantern Glare. A lit cone follows the way you face."
        ],
        "bullets": [
          "The opening burst freezes up to 10 zombies in the cone with a \"!\" for a quarter of a second, then they flee for 4.5 seconds.",
          "For the rest of the window, zombies that walk into the cone are scared too (up to 12 per activation, plus 3 per extra player).",
          "Frightened zombies show a \"?\" when they return.",
          "Bosses ignore it."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Face the crowd at all times. Standing in the dark lengthens the flinch, so lights-out areas are a strength.",
          "Open with Boo! when the crowd is large and walking towards you, then keep the cone pointing at new arrivals.",
          "Watch your back in [[mechanics/co-op-multiplayer|co-op]], where teammates can cover the open side."
        ]
      }
    ],
    "tags": [
      "Fear",
      "Medium"
    ],
    "trivia": [
      "Earlier in development this character was called the Grinner."
    ],
    "related": [
      {
        "category": "characters",
        "slug": "poser"
      },
      {
        "category": "characters",
        "slug": "bacteria"
      }
    ]
  },
  {
    "slug": "bacteria",
    "category": "characters",
    "name": "Bacteria",
    "subtitle": "Zone controller",
    "summary": "Bacteria is a mold-green blob that leaves a sickly patch wherever something dies and can start an epidemic that jumps from body to body.",
    "image": {
      "src": "/fz/wiki/characters/bacteria.png",
      "alt": "Bacteria idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Zone"
      },
      {
        "label": "Skill",
        "value": "Outbreak"
      },
      {
        "label": "Passive",
        "value": "Mold Bloom"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "108"
      },
      {
        "label": "Energy",
        "value": "90"
      },
      {
        "label": "Skill cooldown",
        "value": "36 s"
      },
      {
        "label": "Skill duration",
        "value": "10 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "Bacteria is a teal, gelatinous survivor who controls space rather than shooting at targets. Its health is 108 and its energy is 90.",
          "It is slow inside its own mold, so it plays best from the edge of the mess it makes."
        ]
      },
      {
        "heading": "Passive: Mold Bloom",
        "paragraphs": [
          "Kills leave mold on the ground. Zombies standing in the mold get sick, losing 5% of their max health per second for 5 seconds. You walk 10% slower inside it. In [[mechanics/co-op-multiplayer|co-op]], kills made by teammates also feed the mold."
        ]
      },
      {
        "heading": "Skill: Outbreak",
        "paragraphs": [
          "Outbreak is a 10-second epidemic. A sneeze glob hits a target and starts it; the seed and every sick foe become carriers."
        ],
        "bullets": [
          "The fever climbs in three stages as the epidemic goes on, damaging carriers by 6%, then 7%, then 9% of max health per second.",
          "The infection hops from body to body, a dying carrier bursts onto its neighbours, and the survivors bloom for extra damage when the window ends.",
          "At the end a tally says how large the outbreak was."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Fight from the edge of your mold: let zombies walk into it and kill them there to extend the field.",
          "Cast Outbreak on a dense pack so that it can hop as far as possible."
        ]
      }
    ],
    "tags": [
      "Zone",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "roach"
      },
      {
        "category": "characters",
        "slug": "skin-stealer"
      }
    ]
  },
  {
    "slug": "stray",
    "category": "characters",
    "name": "The Stray",
    "subtitle": "Scout",
    "summary": "The Stray is a dog with a keen nose: it smells zombies through walls, runs faster with a pack on its tail and howls up a pack of wall dogs.",
    "image": {
      "src": "/fz/wiki/characters/stray.png",
      "alt": "The Stray idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Scout"
      },
      {
        "label": "Skill",
        "value": "Howl"
      },
      {
        "label": "Passive",
        "value": "Nose"
      },
      {
        "label": "Difficulty",
        "value": "Easy"
      },
      {
        "label": "Health",
        "value": "100"
      },
      {
        "label": "Energy",
        "value": "110"
      },
      {
        "label": "Skill cooldown",
        "value": "36 s"
      },
      {
        "label": "Skill duration",
        "value": "9 s"
      },
      {
        "label": "Unlock",
        "value": "Free from the start"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Stray is a free scout whose superpower is information. It sees zombies before they see you.",
          "Its health is 100 and its energy is 110."
        ]
      },
      {
        "heading": "Passive: Nose",
        "paragraphs": [
          "Your nose shows blips of zombies through walls within 12 tiles (up to 8 at a time, in a handful of shapes). When a pack of zombies is chasing you, you run faster, up to +50% speed."
        ]
      },
      {
        "heading": "Skill: Howl",
        "paragraphs": [
          "Howl calls the Hunt for 9 seconds. Between 4 and 7 wall dogs launch one after another (the more foes you smell, the more dogs)."
        ],
        "bullets": [
          "Each hound goes for the weakest body at its moment of launch and bites it twice.",
          "The last dog is huge and goes for the biggest body.",
          "Against a boss, the dogs bite for a share of the boss's health bar, and at most 2 hounds go for it."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Use the blips to avoid being flanked: a blip on the other side of a wall is a warning.",
          "Stay ahead of the pack and let the speed bonus carry you around corners.",
          "Howl is best when several foes are scattered, because the dogs pick off the weak ones."
        ]
      }
    ],
    "tags": [
      "Scout",
      "Easy"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "accountant"
      },
      {
        "category": "characters",
        "slug": "duck"
      },
      {
        "category": "characters",
        "slug": "birthday-kid"
      },
      {
        "category": "mechanics",
        "slug": "getting-started"
      }
    ]
  },
  {
    "slug": "birthday-kid",
    "category": "characters",
    "name": "The Birthday Kid",
    "subtitle": "Gambler",
    "summary": "The Birthday Kid fills a balloon with every kill, loses air when hit, and throws it for a pop whose size depends on how much air was saved.",
    "image": {
      "src": "/fz/wiki/characters/birthday-kid.png",
      "alt": "The Birthday Kid idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Gambler"
      },
      {
        "label": "Skill",
        "value": "Surprise!"
      },
      {
        "label": "Passive",
        "value": "Balloon Bank"
      },
      {
        "label": "Difficulty",
        "value": "Easy"
      },
      {
        "label": "Health",
        "value": "100"
      },
      {
        "label": "Energy",
        "value": "90"
      },
      {
        "label": "Skill cooldown",
        "value": "18 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Free from the start"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Birthday Kid is a free, party-themed character whose skill resource is the balloon itself. The balloon, not time, is the real cooldown.",
          "Its health is 100 and its energy is 90."
        ]
      },
      {
        "heading": "Passive: Balloon Bank",
        "paragraphs": [
          "Every kill by the team adds air to your balloon (up to 12; you begin each run with 3). A hit lets half of the air out. During a boss fight the balloon gains 1 air every 2 seconds."
        ]
      },
      {
        "heading": "Skill: Surprise!",
        "paragraphs": [
          "Surprise! throws the balloon. It makes a bang whose size depends on how much air was in it. Then an 8-second Gift Party starts."
        ],
        "bullets": [
          "[[items/gift-box|Gift boxes]] fall on the pop zone one by one and burst on foes, each flinging a prize (energy, health or a [[items/surge-cell|surge cell]]) to you.",
          "A balloon with fewer than 3 air is too limp to pop."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Avoid damage: every hit halves your balloon. Hold the throw until the balloon is full for the biggest pop.",
          "Throw at a dense crowd, so the [[items/gift-box|gift boxes]] can land on many targets.",
          "Team kills fill the balloon, so it works well in [[mechanics/co-op-multiplayer|co-op]]."
        ]
      }
    ],
    "tags": [
      "Gambler",
      "Easy"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "accountant"
      },
      {
        "category": "characters",
        "slug": "stray"
      },
      {
        "category": "items",
        "slug": "gift-box"
      },
      {
        "category": "items",
        "slug": "party-balloons"
      },
      {
        "category": "levels",
        "slug": "party-room"
      }
    ]
  },
  {
    "slug": "mole",
    "category": "characters",
    "name": "The Mole",
    "subtitle": "Tunneler",
    "summary": "The Mole digs through walls just by walking into them and dives through rock to pop out under its pursuers, leaving the dirt to fly back down the tunnel.",
    "image": {
      "src": "/fz/wiki/characters/mole.png",
      "alt": "The Mole idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Tunneler"
      },
      {
        "label": "Skill",
        "value": "Bolt Hole"
      },
      {
        "label": "Passive",
        "value": "Soft Walls"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "108"
      },
      {
        "label": "Energy",
        "value": "80"
      },
      {
        "label": "Skill cooldown",
        "value": "44.5 s"
      },
      {
        "label": "Skill duration",
        "value": "8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Mole is a short-legged, nearsighted tunneler. It has 108 health but only 80 energy, and its [[items/flashlight|flashlight]] beam is shorter than normal.",
          "Destructible levels make it dangerous: the whole map is a corridor to it."
        ]
      },
      {
        "heading": "Passive: Soft Walls",
        "paragraphs": [
          "Walk into a wall to dig through it. Your claws count as a drill. You pay for it with short legs (slightly slower walking) and bad eyes (a shorter beam)."
        ]
      },
      {
        "heading": "Skill: Bolt Hole",
        "paragraphs": [
          "Bolt Hole lasts 8 seconds and lets you dive up to 3 times, each through up to 6 tiles of rock. The claws dig three times as fast while it runs."
        ],
        "bullets": [
          "0.6 seconds after a dive, the rock you cut flies back down the tunnel at whoever followed you (a lane about 1.6 tiles wide and up to 10 long).",
          "0.15 seconds after you arrive, the exit heaves the floor under whoever waited there.",
          "No single body takes more than 60% of its max health from one skill run."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Dig your own shortcuts with the passive and save Bolt Hole for an emergency exit that also hits.",
          "Dive away from a chasing crowd, so that the flying rock hits them in the lane.",
          "Be careful about energy: with 80 you cannot spend as freely as other characters."
        ]
      }
    ],
    "tags": [
      "Tunneler",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "banana"
      },
      {
        "category": "characters",
        "slug": "mascot"
      },
      {
        "category": "mechanics",
        "slug": "destruction-and-collapse"
      }
    ]
  },
  {
    "slug": "firefly",
    "category": "characters",
    "name": "The Firefly",
    "subtitle": "Light",
    "summary": "The Firefly is a living ceiling lamp. Light feeds it energy, getting hit snuffs the lamp, and its skill turns it into a lighthouse beam that burns hotter with every turn.",
    "image": {
      "src": "/fz/wiki/characters/firefly.png",
      "alt": "The Firefly idle sprite",
      "pixelated": true
    },
    "infobox": [
      {
        "label": "Role",
        "value": "Light"
      },
      {
        "label": "Skill",
        "value": "Bright Idea"
      },
      {
        "label": "Passive",
        "value": "Living Lamp"
      },
      {
        "label": "Difficulty",
        "value": "Medium"
      },
      {
        "label": "Health",
        "value": "96"
      },
      {
        "label": "Energy",
        "value": "140"
      },
      {
        "label": "Skill cooldown",
        "value": "39 s"
      },
      {
        "label": "Skill duration",
        "value": "7.8 s"
      },
      {
        "label": "Unlock",
        "value": "Character shop (or earn an unlock pick by completing character goals)"
      }
    ],
    "sections": [
      {
        "heading": "Overview",
        "paragraphs": [
          "The Firefly is a glowing bug with the largest energy pool in the game, 140, and 96 health.",
          "It feeds on light, so it likes lit rooms."
        ]
      },
      {
        "heading": "Passive: Living Lamp",
        "paragraphs": [
          "You are a lamp. Standing in light feeds your energy, and being hit snuffs the lamp for a moment."
        ]
      },
      {
        "heading": "Skill: Bright Idea",
        "paragraphs": [
          "Bright Idea pops a bulb over you for about 8 seconds and turns you into a lighthouse. A lime beam (50 degrees widening to 60, reaching 7.5 tiles) turns six times."
        ],
        "bullets": [
          "Each turn burns hotter than the last: the crossing damage climbs from 14% up to 34% of a foe's health.",
          "A regular body left under 30% health dies, and at most 8 bodies are hit per turn.",
          "Kills pay double energy for 11 seconds.",
          "At the end the bulb shatters and your lamp stays dark for 2 seconds."
        ]
      },
      {
        "heading": "Strategy",
        "bullets": [
          "Pick a spot where the beam has plenty of foes to cross.",
          "Pick lit rooms and work lights to keep the lamp full between skill uses.",
          "Avoid being hit when the lamp is on: each hit snuffs it."
        ]
      }
    ],
    "tags": [
      "Light",
      "Medium"
    ],
    "related": [
      {
        "category": "characters",
        "slug": "accountant"
      },
      {
        "category": "characters",
        "slug": "pumpkin"
      },
      {
        "category": "mechanics",
        "slug": "flashlight-and-light"
      },
      {
        "category": "items",
        "slug": "flashlight"
      }
    ]
  }
];
