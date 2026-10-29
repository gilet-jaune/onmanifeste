"""MkDocs hook: short, readable links to share, e.g. <site>/rejoindre/retraite/.

For every profile of docs/data/rallier.json it writes a tiny redirect page (no script, no
third-party shortener) to the matching section of "Pourquoi nous rejoindre ?", in French
(rejoindre/<id>/) and English (en/rejoindre/<id>/). Runs before pwa.py so they are precached.
"""
import html
import json
from pathlib import Path

PAGE = """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{title}</title>
<link rel="canonical" href="{target}">
<meta http-equiv="refresh" content="0; url={target}">
</head>
<body>
<p><a href="{target}">{title}</a></p>
</body>
</html>
"""


def on_post_build(config, **kwargs):
    site = Path(config["site_dir"])
    data = json.loads((Path(config["docs_dir"]) / "data" / "rallier.json").read_text(encoding="utf-8"))
    for lang, prefix, title in (("fr", "", "Pourquoi nous rejoindre ?"), ("en", "en/", "Why join us?")):
        for profile in data["rallier"]["profiles"]:
            out = site / prefix / "rejoindre" / profile["id"] / "index.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            label = profile["label"].get(lang) or profile["label"]["fr"]
            out.write_text(
                PAGE.format(
                    lang=lang,
                    title=html.escape(f"{title} — {label}"),
                    target=f"../../rallier/#pourquoi-{profile['id']}",
                ),
                encoding="utf-8",
            )
