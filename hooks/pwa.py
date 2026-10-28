"""MkDocs hook: inject the precache list and a content hash into the built service worker.

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


def on_post_build(config, **kwargs):
    site = Path(config["site_dir"])
    sw = site / "sw.js"
    if not sw.exists():
        return

    digest = hashlib.sha256()
    urls = []
    for path in sorted(p for p in site.rglob("*") if p.is_file()):
        rel = path.relative_to(site).as_posix()
        if rel in EXCLUDE or path.suffix not in PRECACHE_EXTENSIONS or any(p in rel for p in EXCLUDE_PARTS):
            continue
        digest.update(rel.encode())
        digest.update(path.read_bytes())
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
    sw.write_text(source, encoding="utf-8")
