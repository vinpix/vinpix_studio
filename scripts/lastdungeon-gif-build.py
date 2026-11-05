"""Build the Last Dungeon wiki GIFs (boss phases, boss skills, monster attacks) from TLD play-mode footage.

  python scripts/lastdungeon-gif-build.py [bosses|enemies|all] [--only <slug>]

Footage (D:/dev/TLD/Logs/vid, recorded by the TLD Play Mode harness, Assets/Editor/TldPlaySmokeVid*.cs):
  phases   vidbossa / vidbossb clips (the real transformations), marks "phase <n> entered" / "intro card"
  skills   vidskill clips (one forced cast per skill), marks "skill <id> cast" / "skill <id> end"
  monsters vidmon clips (one monster type per clip, the hero holds fire), marks "fight" / "fire on"
Writes public/ld/wiki/<category>/<slug>/<name>.gif and scripts/lastdungeon-gif-manifest.json
(src, width, height per GIF) for scripts/lastdungeon-apply-media.ts.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from importlib import import_module

gif = import_module("lastdungeon-gif")

VID = "D:/dev/TLD/Logs/vid"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "ld", "wiki")
MANIFEST = os.path.join(os.path.dirname(__file__), "lastdungeon-gif-manifest.json")
BOSS_CROP = (440, 0, 1300, 640)        # 1600x720 boss clips: drop the HUD
MON_CROP = (600, 162, 1320, 702)        # 1920x864 monster clips: 720x540 around the hero (the camera follows it)

# slug -> (phase clip, skill clip, phase count, [(skill id, file name, max seconds)])
BOSSES = {
    "skeleton-seeker": ("bossa39/vid_bossa39", "skill/vid_skill_39", 3,
                        [(10, "bone-nova", 7), (11, "bone-rush", 7), (13, "bone-bomb", 8), (18, "bone-scatter", 4),
                         (20, "skull-bowl", 7), (21, "ossuary-gate", 11)]),
    "old-guardian": ("bossa93_94/vid_bossa93", "skill/vid_skill_93", 3,
                     [(20, "stone-ward", 7), (21, "titan-stomp", 7), (22, "faultline", 8), (1, "blast", 4),
                      (0, "lob", 4), (23, "ceiling-falls", 11)]),
    "heavy-knight": ("bossa93_94/vid_bossa94", "skill/vid_skill_94", 3,
                     [(20, "executioners-hold", 7), (21, "halberd-whirl", 7), (22, "headsmans-cleave", 7),
                      (23, "iron-verdict", 11)]),
    "ghost-king": ("bossb_gk2/vid_vidbossb_130", "skill/vid_skill_130", 3,
                   [(15, "royal-silence", 6), (20, "banner-wheel", 8), (22, "ghost-footprints", 7), (21, "the-dead-court", 11)]),
    "desert-hunter": ("bossb_des/vid_vidbossb_138", "skill/vid_skill_138", 3,
                      [(15, "mirage-tide", 8), (10, "sand-hands-1", 7), (13, "sand-hands-2", 7), (14, "sand-hands-3", 8),
                       (20, "mirage-doubles", 8), (21, "antlion-maw", 11)]),
    "vegeful": ("bossb_veg/vid_vidbossb_112", "skill/vid_skill_112", 4,
                [(13, "wraith-flame", 8), (20, "hunting-blades", 7), (21, "soul-harvest", 8), (23, "soul-siphon", 8),
                 (22, "last-judgment", 11)]),
}
# Extra clips recorded in a later pass (retries): skill id -> clip, searched before the main skill clip.
EXTRA_SKILL_CLIPS = {"heavy-knight": ["pass2/vid_skill_94"]}

# enemy slug -> (clip folder under VID/pass3 (vid_mon_<unit ids>), seconds to keep[, start second, crop])
MONSTERS = {
    "small-goblin": ("vid_mon_41", 5.2),
    "spore-bat": ("vid_mon_142", 5.2),
    "goblin-sword": ("vid_mon_43", 5.2),
    "fat-goblin": ("vid_mon_45", 5.2),
    "fat-goblin-gun": ("vid_mon_125", 5.2),
    "goblin-archer": ("vid_mon_57", 5.2),
    "ghost-wizard": ("vid_mon_126", 5.2, 9.6, (600, 40, 1320, 580)),  # it casts from far above: only in frame later
    "explode-goblin": ("vid_mon_58", 5.2),
    "skeleton-brute": ("vid_mon_141", 5.2),
    "bone-archer": ("vid_mon_143", 5.2),
    "goblin-armor": ("vid_mon_140", 5.2),
    "enchanter": ("vid_mon_49_43", 5.2),
    "crypt-crawler": ("vid_mon_144", 5.2),
    "bog-bloat": ("vid_mon_145", 5.2),
    "thorn-spitter": ("vid_mon_146", 5.2),
    "ring-plant": ("vid_mon_87", 5.2),
    "plant-explode": ("vid_mon_88", 5.2),
    "medium-slime": ("vid_mon_89", 5.2),
    "small-slime": ("vid_mon_90", 5.2),
    "shotgun-machine": ("vid_mon_98", 5.2),
    "machine-sword": ("vid_mon_99", 5.2),
    "hammer": ("vid_mon_100", 5.2),
    "rust-drone": ("vid_mon_148", 5.2),
    "rust-golem": ("vid_mon_149", 5.2),
    "goblin-wizard": ("vid_mon_40", 5.2),
    "flower-monster": ("vid_mon_86", 5.2),
    "piraha": ("vid_mon_80", 5.2),
    "kua-toa": ("vid_mon_84", 5.2),
    "sand-scorpion": ("vid_mon_147", 5.2),
    "necro-acolyte": ("vid_mon_150", 5.2),
    "skeleton-minion": ("vid_mon_42", 5.2),
}


def marks(clip):
    rows = []
    with open(os.path.join(VID, clip, "marks.tsv"), encoding="utf8") as f:
        for line in f:
            parts = line.rstrip("\n").split("\t")
            if len(parts) >= 3:
                rows.append((float(parts[1]), parts[2]))
    return rows


def first(rows, pred):
    for t, label in rows:
        if pred(label):
            return t
    return None


def emit(manifest, rel, clip, start, end, crop, width=288):
    out = os.path.join(OUT, rel)
    gif.cut(os.path.join(VID, clip), start, end, out, crop, width, 10, 48)
    from PIL import Image
    with Image.open(out) as im:
        manifest["/ld/wiki/" + rel.replace(os.sep, "/")] = {"width": im.width, "height": im.height, "seconds": round(end - start, 1)}


def build_bosses(manifest, only):
    for slug, (pclip, sclip, nph, skills) in BOSSES.items():
        if only and slug != only:
            continue
        pm = marks(pclip)
        intro = first(pm, lambda l: "intro card" in l or l.endswith("stage Intro"))
        emit(manifest, f"bosses/{slug}/phase-1.gif", pclip, intro + 2.4, intro + 6.6, BOSS_CROP)
        for n in range(1, nph):
            t = first(pm, lambda l, n=n: l.endswith(f"phase {n} entered"))
            if t is None:
                print("!! no phase", n, "in", pclip)
                continue
            emit(manifest, f"bosses/{slug}/phase-{n + 1}.gif", pclip, t - 0.2, t + 5.4, BOSS_CROP)
        clips = EXTRA_SKILL_CLIPS.get(slug, []) + [sclip]
        for sid, name, cap in skills:
            done = False
            for clip in clips:
                if not os.path.exists(os.path.join(VID, clip, "marks.tsv")):
                    continue
                sm = marks(clip)
                c = first(sm, lambda l, s=sid: l.startswith(f"skill {s} cast"))
                e = first(sm, lambda l, s=sid: l == f"skill {s} end")
                if c is None or e is None:
                    continue
                start = max(0.0, c - 0.3)
                emit(manifest, f"bosses/{slug}/{name}.gif", clip, start, min(e, start + min(cap, 9) - (1 if cap < 9 else 0)), BOSS_CROP)
                done = True
                break
            if not done:
                print("!! no footage for", slug, sid, name)


def build_enemies(manifest, only):
    for slug, spec in MONSTERS.items():
        folder, keep = spec[0], spec[1]
        at = spec[2] if len(spec) > 2 else None
        crop = spec[3] if len(spec) > 3 else MON_CROP
        if only and slug != only:
            continue
        clip = f"pass3/{folder}"
        if not os.path.exists(os.path.join(VID, clip, "marks.tsv")):
            print("!! no clip", clip)
            continue
        m = marks(clip)
        t0 = first(m, lambda l: l.startswith("fight")) or 0.0
        fire = first(m, lambda l: l == "fire on") or (t0 + keep)
        if at is not None:
            emit(manifest, f"enemies/{slug}/attack.gif", clip, at, at + keep, crop)
        else:
            emit(manifest, f"enemies/{slug}/attack.gif", clip, t0 + 0.8, min(fire, t0 + 0.8 + keep), crop)


if __name__ == "__main__":
    what = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "all"
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
    manifest = json.load(open(MANIFEST, encoding="utf8")) if os.path.exists(MANIFEST) else {}
    if what in ("bosses", "all"):
        build_bosses(manifest, only)
    if what in ("enemies", "all"):
        build_enemies(manifest, only)
    with open(MANIFEST, "w", encoding="utf8") as f:
        json.dump(dict(sorted(manifest.items())), f, indent=1)
    total = sum(os.path.getsize(os.path.join(OUT, k[len("/ld/wiki/"):])) for k in manifest)
    print(f"{len(manifest)} gifs, {total / 1e6:.1f} MB")
