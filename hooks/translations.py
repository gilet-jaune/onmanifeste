"""MkDocs hook: warn readers when an English page lags behind its French original.

Each page.en.md records a fingerprint of the French page it translates (``source_hash``, see
scripts/lib/translation-hash.mjs for the rationale). If the French page's fingerprint differs, an
admonition is prepended. No git history is needed, so it also works in shallow clones.

The algorithm is implemented twice (here and in scripts/lib/translation-hash.mjs): keep both in step.
tests/translation-hash.test.mjs checks that they agree on every page.

CLI: ``python hooks/translations.py FILE...`` prints the JSON fingerprint of each French page.
"""
import hashlib
import json
import re
import sys
import unicodedata
from pathlib import Path

VERSION = "s1"
_WHITESPACE = re.compile("[ \t\n\r\f\v   ]+")
_FRONT_MATTER = re.compile(r"^---\n([\s\S]*?)\n---\n?")
_DESCRIPTION = re.compile(r"^description:[ \t]*(.+)$", re.M)
_SECTION_SPLIT = re.compile(r"^(?=## )", re.M)
_QUOTED = re.compile(r"^(['\"])([\s\S]*)\1$")

NOTICE = (
    '!!! info "This translation may be out of date"\n\n'
    "    The French version of this page has been updated since it was translated. "
    "Switch the language to French for the latest information.\n\n"
)


def _sha(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _normalise(text):
    return _WHITESPACE.sub(" ", unicodedata.normalize("NFC", text)).strip()


def fingerprint(text):
    """Fingerprint of a French page: dict(hash, sections, titles)."""
    source = text.replace("\r\n", "\n")
    if source.startswith("﻿"):
        source = source[1:]
    match = _FRONT_MATTER.match(source)
    body = source[match.end():] if match else source
    described = _DESCRIPTION.search(match.group(1)) if match else None
    description = _QUOTED.sub(r"\2", described.group(1).strip()) if described else ""

    parts = _SECTION_SPLIT.split(body)
    if parts and parts[0] == "":
        parts = parts[1:]
    items = [_normalise(description)] + [_normalise(part) for part in parts]
    titles = ["description"] + [
        part.split("\n")[0][3:].strip() if part.startswith("## ") else "introduction" for part in parts
    ]
    return {
        "hash": f"{VERSION}-{_sha(chr(1).join(items))[:12]}",
        "sections": f"{VERSION}-" + ".".join(_sha(item)[:6] for item in items),
        "titles": titles,
    }


def on_page_markdown(markdown, page, config, **kwargs):
    src = page.file.src_uri
    stored = page.meta.get("source_hash")
    if not src.endswith(".en.md") or not stored:
        return markdown
    french = Path(config["docs_dir"]) / src.replace(".en.md", ".md")
    try:
        current = fingerprint(french.read_text(encoding="utf-8"))["hash"]
    except OSError:
        return markdown
    if current != str(stored):
        return NOTICE + markdown
    return markdown


if __name__ == "__main__":
    print(json.dumps({name: fingerprint(Path(name).read_text(encoding="utf-8")) for name in sys.argv[1:]}))
