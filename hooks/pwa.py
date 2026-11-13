"""MkDocs hook: inject the precache list, the online-only paths and a content hash into the
built service worker.

Runs after the build so the list covers every generated page (all languages) and asset,
including the fonts self-hosted by the privacy plugin. The hash changes whenever any file
changes, which makes browsers install the new version.
"""
import hashlib
import json
from pathlib import Path

PRECACHE_EXTENSIONS = {
    ".html", ".css", ".js", ".json", ".webmanifest", ".svg", ".png", ".ico", ".woff", ".woff2",
}
EXCLUDE = {"sw.js", "404.html"}
# Large optional bundles fetched on demand (and then cached) instead of precached.
EXCLUDE_PARTS = ("mermaid",)
# Long reference timelines: not precached on first install (keeps install fast and light),
# but cached at runtime once visited so they remain readable offline afterwards.
ON_DEMAND = (
    "histoire/",
    "repressions/",
    "victimes/",
    "confiance/",
)
# Online only: project meta pages (GitHub contribution flow, legal notice) and build-time data
# files that are already rendered into static HTML. Neither precached nor cached at runtime.
# Paths are relative to the site root; the English copies live under "en/".
ONLINE_ONLY = (
    "contribuer/",
    "relire/",
    "mentions-legales/",
    "ia/",
    "data/history.json",
    "data/victimes.json",
    "data/sources.json",
)


def _strip_lang(rel):
    return rel[3:] if rel.startswith("en/") else rel


def is_online_only(rel):
    return _strip_lang(rel).startswith(ONLINE_ONLY)


def is_on_demand(rel):
    return _strip_lang(rel).startswith(ON_DEMAND)


def on_post_build(config, **kwargs):
    site = Path(config["site_dir"])
    sw = site / "sw.js"
    if not sw.exists():
        return

    digest = hashlib.sha256()
    urls = []
    for path in sorted(p for p in site.rglob("*") if p.is_file()):
        rel = path.relative_to(site).as_posix()
        if (
            rel in EXCLUDE
            or path.suffix not in PRECACHE_EXTENSIONS
            or any(p in rel for p in EXCLUDE_PARTS)
            or is_online_only(rel)
        ):
            continue
        digest.update(rel.encode())
        digest.update(path.read_bytes())
        if is_on_demand(rel):
            continue
        # Pages are requested as directory URLs ("annuaire/"), so cache them under that key.
        if rel == "index.html":
            urls.append("./")
        elif rel.endswith("/index.html"):
            urls.append(rel[: -len("index.html")])
        else:
            urls.append(rel)

    source = sw.read_text(encoding="utf-8")
    source = source.replace("'__PWA_VERSION__'", json.dumps(digest.hexdigest()[:12]))
    source = source.replace("['__PWA_PRECACHE__']", json.dumps(urls))
    source = source.replace("['__PWA_ONLINE_ONLY__']", json.dumps(list(ONLINE_ONLY)))
    sw.write_text(source, encoding="utf-8")
