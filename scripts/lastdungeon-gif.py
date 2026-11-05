"""Cut wiki GIFs out of The Last Dungeon play-mode footage (VidRec JPG frames).

  python scripts/lastdungeon-gif.py <clip_dir> <start_s> <end_s> <out.gif> [--crop x0,y0,x1,y1] [--width 288] [--fps 10] [--colors 48]

clip_dir holds f000000.jpg ... at 30 fps (TLD Assets/Editor/TldPlaySmokeVidRec.cs). The default crop drops the
mobile HUD (portrait/HP on the left, buttons on the right, weapon slots at the bottom) of a 1600x720 boss clip.
Prints "<out> <w>x<h> <frames> <bytes>".
"""
import argparse
import os

from PIL import Image

SRC_FPS = 30


def frames_dir(d):
    return sorted(f for f in os.listdir(d) if f.startswith("f") and f.endswith(".jpg"))


def cut(clip, start, end, out, crop, width, fps, colors):
    names = frames_dir(clip)
    a = max(0, int(start * SRC_FPS))
    b = min(len(names), int(end * SRC_FPS))
    step = max(1, SRC_FPS // fps)  # 30 fps source: 10 fps = every 3rd frame, 15 = every 2nd
    frames = []
    for i in range(a, b, step):
        im = Image.open(os.path.join(clip, names[i])).convert("RGB")
        if crop:
            im = im.crop(crop)
        h = round(im.height * width / im.width)
        frames.append(im.resize((width, h), Image.LANCZOS))
    if not frames:
        raise SystemExit(f"no frames in {clip} {start}-{end}")
    # one shared palette from a few sample frames keeps colours stable (no flicker) and the file small
    sample_idx = sorted({0, len(frames) // 4, len(frames) // 2, 3 * len(frames) // 4, len(frames) - 1})
    w, h = frames[0].size
    sheet = Image.new("RGB", (w, h * len(sample_idx)))
    for k, i in enumerate(sample_idx):
        sheet.paste(frames[i], (0, h * k))
    pal = sheet.quantize(colors=colors, method=Image.MEDIANCUT)
    q = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    q[0].save(out, save_all=True, append_images=q[1:], duration=round(1000 * step / SRC_FPS), loop=0, optimize=True, disposal=1)
    print(out, f"{w}x{h}", len(q), os.path.getsize(out))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("clip")
    ap.add_argument("start", type=float)
    ap.add_argument("end", type=float)
    ap.add_argument("out")
    ap.add_argument("--crop", default="440,0,1300,640")
    ap.add_argument("--width", type=int, default=288)
    ap.add_argument("--fps", type=int, default=10)
    ap.add_argument("--colors", type=int, default=48)
    a = ap.parse_args()
    crop = tuple(int(v) for v in a.crop.split(",")) if a.crop else None
    cut(a.clip, a.start, a.end, a.out, crop, a.width, a.fps, a.colors)
