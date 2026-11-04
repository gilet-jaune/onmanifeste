"""MkDocs hook: optional illustration for a guide, from its front matter.

    image: assets/guides/garde-a-vue.webp   # path under docs/, self-hosted
    image_alt: ""                           # description; empty = decorative (the title is next to it)

What it does, at build time (no JavaScript, works offline, no request to any other site):
- a banner under the guide title (<figure class="guide-hero">);
- a thumbnail at the top of the guide's card on the guides index (guides/index.md and its English copy);
- the link-preview image (og:image) of the page (see overrides/main.html).
Guides without `image` are untouched. The rules for the files (format, weight, rights, no text in
the picture) are checked by scripts/validate-pages.mjs and written in AGENTS.md.
"""
import html
import re
from pathlib import Path

from mkdocs.utils import get_relative_url, meta

_images = {"fr": {}, "en": {}}


def _lang(src_uri):
    return "en" if src_uri.endswith(".en.md") else "fr"


def _slug(src_uri):
    return Path(src_uri).name.removesuffix(".en.md").removesuffix(".md")


def on_files(files, config, **kwargs):
    """Read the front matter of every guide once, so the guides index knows all the images."""
    _images["fr"].clear()
    _images["en"].clear()
    for f in files.documentation_pages():
        if not f.src_uri.startswith("guides/") or Path(f.src_uri).name.startswith("index"):
            continue
        try:
            _, data = meta.get_data(Path(f.abs_src_path).read_text(encoding="utf-8"))
        except (OSError, UnicodeDecodeError):
            continue
        if data.get("image"):
            _images[_lang(f.src_uri)][_slug(f.src_uri)] = {
                "src": str(data["image"]),
                "alt": str(data.get("image_alt", "")),
            }
    return files


def _lookup(lang, slug):
    # An English page without its own front matter falls back to the French one.
    return _images[lang].get(slug) or _images["fr"].get(slug)


def _img(files, page, entry, css, alt, lazy):
    target = files.get_file_from_path(entry["src"])
    if target is None:
        return ""
    src = get_relative_url(target.url, page.url)
    loading = 'loading="lazy" ' if lazy else ""
    return (
        f'<img class="{css}" src="{html.escape(src)}" alt="{html.escape(alt)}" '
        f'{loading}decoding="async">'
    )


def on_page_content(content, page, config, files, **kwargs):
    lang = _lang(page.file.src_uri)
    src_uri = page.file.src_uri

    # Thumbnails on the guides index cards.
    if src_uri in ("guides/index.md", "guides/index.en.md"):

        def card(m):
            body = m.group(1)
            href = re.search(r'href="([^"#?]+)"', body)
            if not href or href.group(1).startswith(("http", "/")):
                return m.group(0)
            entry = _lookup(lang, href.group(1).strip("/").split("/")[-1])
            if not entry:
                return m.group(0)
            img = _img(files, page, entry, "card-thumb", "", lazy=True)
            return f'<li class="has-thumb">{img}{body}</li>' if img else m.group(0)

        def block(m):
            return re.sub(r"<li>(.*?)</li>", card, m.group(0), flags=re.S)

        return re.sub(r'<div class="grid cards">.*?</div>', block, content, flags=re.S)

    # Banner under the title of the guide itself.
    entry = page.meta.get("image") and {
        "src": str(page.meta["image"]),
        "alt": str(page.meta.get("image_alt", "")),
    }
    if entry:
        img = _img(files, page, entry, "guide-hero__img", entry["alt"], lazy=False)
        if img:
            return re.sub(r"(</h1>)", rf'\1<figure class="guide-hero">{img}</figure>', content, count=1)
    return content
