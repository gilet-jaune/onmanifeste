"""MkDocs hook: resolve footnote citations from the central registry docs/data/sources.json.

Pages only contain footnote references ([^sp-gav]); the matching definitions (title and URL, in the
page's language) are appended here at build time, so each source is written once and checked once.
"""
import json
import re
from pathlib import Path

REF = re.compile(r"\[\^([a-z0-9]+(?:-[a-z0-9]+)*)\](?!:)")
DEF = re.compile(r"^\[\^([^\]]+)\]:", re.M)
_registry = None

# Who checked a source (check.by), shown after each footnote and in its hover tooltip.
# Keep in sync with overrides/partials/check.html.
CHECK_BY = {
    "ai": {"fr": "sourcé par IA, à vérifier par un humain", "en": "AI-sourced, awaiting human check"},
    "volunteer": {"fr": "vérifié par un·e bénévole", "en": "checked by a volunteer"},
    "lawyer": {"fr": "vérifié par un·e avocat·e", "en": "checked by a lawyer"},
    "medical": {"fr": "vérifié par un·e soignant·e", "en": "checked by a health professional"},
    "historian": {"fr": "vérifié par un·e historien·ne", "en": "checked by a historian"},
}


def check_label(check, lang):
    if not check:
        return ""
    who = CHECK_BY.get(check.get("by", "ai"), CHECK_BY["ai"])[lang]
    return f"{who} ({check['date']})" if check.get("date") else who


def _sources(config):
    global _registry
    if _registry is None:
        path = Path(config["docs_dir"]) / "data" / "sources.json"
        _registry = json.loads(path.read_text(encoding="utf-8"))["sources"]
    return _registry


def on_page_markdown(markdown, page, config, **kwargs):
    lang = "en" if page.file.src_uri.endswith(".en.md") else "fr"
    # Ignore code (examples of the footnote syntax in the contributing docs).
    prose = re.sub(r"```.*?```", "", markdown, flags=re.S)
    prose = re.sub(r"`[^`\n]*`", "", prose)
    used = list(dict.fromkeys(REF.findall(prose)))
    defined = set(DEF.findall(markdown))
    registry = _sources(config)
    lines = []
    for key in used:
        if key in defined:
            continue
        if key not in registry:
            raise ValueError(f"{page.file.src_uri}: unknown source [^{key}] (add it to docs/data/sources.json)")
        src = registry[key]
        url = src["url"][lang] if isinstance(src["url"], dict) else src["url"]
        label = check_label(src.get("check"), lang)
        suffix = f' <span class="source-check">· {label}</span>' if label else ""
        lines.append(f"[^{key}]: [{src['title'][lang]}]({url}){suffix}")
    return markdown.rstrip() + ("\n\n" + "\n\n".join(lines) + "\n" if lines else "\n")
