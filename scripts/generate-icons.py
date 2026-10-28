"""Generate PWA / favicon PNG icons from the SVG design (run once: python3 scripts/generate-icons.py).

Requires Pillow. The SVG (docs/assets/icons/icon.svg) and PNGs share the same geometry:
a fluorescent yellow square with a black megaphone and a reflective band.
"""
from PIL import Image, ImageDraw

BG = (221, 242, 15, 255)  # #ddf20f, fluorescent vest yellow
FG = (0, 0, 0, 255)
BAND = (195, 200, 206, 255)  # #c3c8ce, reflective band


def draw(size: int, maskable: bool) -> Image.Image:
    s = size / 512
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        d.rectangle([0, 0, size, size], fill=BG)  # full bleed for Android masks
        k, o = 0.8, size * 0.1  # keep the glyph inside the 80% safe zone
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=96 * s, fill=BG)
        k, o = 1.0, 0

    # Reflective band behind the glyph, like the stripe on a high-visibility vest.
    d.rectangle([0, o + 446 * s * k, size, o + 474 * s * k], fill=BAND)

    def p(x, y):
        return (o + x * s * k, o + y * s * k)

    d.polygon([p(120, 210), p(330, 120), p(330, 392), p(120, 302)], fill=FG)  # horn
    d.rectangle([*p(84, 210), *p(132, 302)], fill=FG)  # mouthpiece
    d.polygon([p(150, 300), p(220, 330), p(238, 410), p(180, 410)], fill=FG)  # handle
    for i, y in enumerate((170, 256, 342)):  # sound waves
        x0 = 360 + (abs(i - 1) * -8)
        d.line([p(x0, y), p(x0 + 60, y + (i - 1) * 30)], fill=FG, width=max(1, int(22 * s * k)))
    return img


for size in (192, 512):
    draw(size, False).save(f"docs/assets/icons/icon-{size}.png")
draw(512, True).save("docs/assets/icons/icon-maskable-512.png")
draw(180, True).save("docs/assets/icons/apple-touch-icon.png")
print("icons generated")
