"""MkDocs hook: write the description of every page to data/search-descriptions.json.

docs/javascripts/search-snippet.js shows it as one line under the title of each page result in the
site search, so a result says what the page is about before any excerpt. Keys are the page URLs
relative to the site root ("guides/garde-a-vue/", "en/guides/garde-a-vue/", "" for the home page).
The file is precached like the other data files, so the search stays offline. Descriptions come from
the `description:` front matter (checked by scripts/validate-pages.mjs: present, 160 characters max).
"""
import json
from pathlib import Path

_descriptions = {}


def on_page_markdown(markdown, page, **kwargs):
    description = " ".join(str(page.meta.get("description", "")).split())
    if description:
        _descriptions[page.url] = description
    return markdown


def on_post_build(config, **kwargs):
    out = Path(config["site_dir"]) / "data" / "search-descriptions.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(
        json.dumps(_descriptions, ensure_ascii=False, separators=(",", ":"), sort_keys=True),
        encoding="utf-8",
    )
