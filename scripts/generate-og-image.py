"""Generate the Open Graph share image (docs/assets/social/og.png, 1200x630).

Run once after changing the design: python3 scripts/generate-og-image.py (requires Pillow).
Uses a condensed bold system font when available (macOS: DIN Condensed; Windows: Arial Narrow Bold), else Pillow's default (tiny, no accents: do not commit that output).
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
VEST = (221, 242, 15)
INK = (0, 0, 0)
SILVER = (195, 200, 206)
SHEEN = (238, 240, 242)

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf",
    "/System/Library/Fonts/Supplemental/Impact.ttf",
    "C:/Windows/Fonts/ARIALNB.TTF",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def font(size):
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


img = Image.new("RGB", (W, H), VEST)
d = ImageDraw.Draw(img)

# Two reflective bands across the lower part, like on a high-visibility vest.
for top in (430, 500):
    d.rectangle([0, top, W, top + 34], fill=SILVER)
    d.polygon([(560, top), (640, top), (600, top + 34), (520, top + 34)], fill=SHEEN)

# Megaphone (same geometry as the app icon), top right.
s, ox, oy = 0.55, 900, 70
P = lambda x, y: (ox + x * s, oy + y * s)
d.polygon([P(120, 210), P(330, 120), P(330, 392), P(120, 302)], fill=INK)
d.rectangle([*P(84, 210), *P(132, 302)], fill=INK)
d.polygon([P(150, 300), P(220, 330), P(238, 410), P(180, 410)], fill=INK)
for (x1, y1, x2, y2) in ((352, 170, 412, 140), (360, 256, 420, 256), (352, 342, 412, 372)):
    d.line([P(x1, y1), P(x2, y2)], fill=INK, width=12)

d.text((80, 90), "On manifeste", font=font(120), fill=INK)
d.text((84, 240), "Boîte à outils pour manifester en France", font=font(52), fill=INK)
d.text((84, 310), "Droits · Sécurité · Premiers secours · Hors ligne", font=font(38), fill=INK)

img.save("docs/assets/social/og.png", optimize=True)
print("docs/assets/social/og.png")
