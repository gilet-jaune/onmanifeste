"""MkDocs hook: generate a QR code pointing to the published site (pocket card).

Written to <site_dir>/assets/social/qr.svg only when site_url is known (set by CI from the Pages
configuration); the pocket card shows it only in that case, so local builds simply omit it.
"""
from pathlib import Path

import segno


def on_post_build(config, **kwargs):
    if not config.get("site_url"):
        return
    target = Path(config["site_dir"]) / "assets" / "social" / "qr.svg"
    target.parent.mkdir(parents=True, exist_ok=True)
    segno.make(config["site_url"], error="m").save(
        str(target), kind="svg", scale=6, border=2, dark="#000000", light="#ffffff", xmldecl=False
    )
