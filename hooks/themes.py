"""MkDocs hook: the themes of a guide, from docs/data/guide-themes.json (the single source).

Vocabulary (see .agent/README.md): a THEME is one of the few subjects of the guides page; a guide has
one to three. It is shown under the guide's title as a link to the Guides page filtered on it
(overrides/partials/tags.html). The `tags:` of the front matter are KEYWORDS for the search only:
they are never shown, and the theme labels are added to them here so that the search finds a guide
by its theme too.
"""
import json
import re
from pathlib import Path

_GUIDE = re.compile(r"^(en/)?guides/([^/]+)/$")
_data = None


def _themes(config):
    global _data
    if _data is None:
        path = Path(config["docs_dir"]) / "data" / "guide-themes.json"
        raw = json.loads(path.read_text(encoding="utf-8"))["guide_themes"]
        _data = ({t["id"]: t for t in raw["themes"]}, raw["guides"])
    return _data


def on_page_markdown(markdown, page, config, **kwargs):
    found = _GUIDE.match(page.url or "")
    if not found or found.group(2) == "index":
        return markdown
    lang = "en" if found.group(1) else "fr"
    themes, by_guide = _themes(config)
    ids = by_guide.get(found.group(2), [])
    page.meta["themes"] = [
        {
            "id": i,
            "label": themes[i]["label"][lang],
            "url": f"{'en/' if lang == 'en' else ''}guides/?theme={i}",
        }
        for i in ids
        if i in themes
    ]
    # Search index only: keywords + theme labels (the tags plugin shows nothing, see tags.html).
    keywords = [str(t) for t in (page.meta.get("tags") or [])]
    page.meta["tags"] = keywords + [t["label"] for t in page.meta["themes"] if t["label"] not in keywords]
    return markdown
