"""MkDocs hook: "In this situation?" line at the bottom of every guide.

docs/data/parcours.json already knows which situations ("Je suis…") send people to which guide.
This hook turns that into a short list of links to the guided search, added before the "Sources"
section of each guide, in the page's language, so the guides point back to the guided search.
"""
import json
import re
from pathlib import Path

MAX_LINKS = 5
_by_guide = None

TEXT = {
    "fr": "Vous êtes dans l'une de ces situations ?",
    "en": "In one of these situations?",
}


def _paths(config):
    """guide slug -> [(profile id, French label, English label)], most relevant first."""
    global _by_guide
    if _by_guide is None:
        path = Path(config["docs_dir"]) / "data" / "parcours.json"
        profiles = json.loads(path.read_text(encoding="utf-8"))["parcours"]
        found = {}
        for order, profile in enumerate(profiles):
            for need in profile["needs"]:
                for result in need["results"]:
                    guide = result.get("guide")
                    if guide:
                        entry = found.setdefault(guide, {}).setdefault(profile["id"], [0, order, profile["label"]])
                        entry[0] += 1
        _by_guide = {
            guide: [(pid, e[2]) for pid, e in sorted(entries.items(), key=lambda kv: (-kv[1][0], kv[1][1]))]
            for guide, entries in found.items()
        }
    return _by_guide


def on_page_markdown(markdown, page, config, **kwargs):
    src = page.file.src_uri
    match = re.fullmatch(r"guides/([a-z0-9-]+)(\.en)?\.md", src)
    if not match or match.group(1) == "index":
        return markdown
    lang = "en" if match.group(2) else "fr"
    profiles = _paths(config).get(match.group(1))
    if not profiles:
        return markdown
    question = TEXT[lang]
    links = " · ".join(
        f"[{label[lang]}](../parcours/index.md?je={pid})" for pid, label in profiles[:MAX_LINKS]
    )
    block = f"**{question}** {links}\n\n"
    heading = re.search(r"^## Sources\s*$", markdown, re.M)
    if heading:
        return markdown[: heading.start()] + block + markdown[heading.start() :]
    return markdown.rstrip() + "\n\n" + block
