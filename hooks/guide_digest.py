"""MkDocs hook: extract a short digest of every guide for the guided search (parcours).

For each guide page and language it keeps the title, the "L'essentiel" / "Key points" bullets and,
for every section heading (h2/h3 with an id), its first points (list items) or first paragraph.
The digest is written to data/guides-digest.json after the build, so docs/javascripts/parcours.js
can show the answer directly in the results. It is precached like the other data files (offline).
Only <strong> and <em> are kept; links, footnote references and nested lists are dropped.
"""
import html
import json
from html.parser import HTMLParser
from pathlib import Path

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
KEEP = {"strong", "em"}
MAX_POINTS = 5
MAX_CHARS = 260

_digest = {"fr": {}, "en": {}}


class _Node:
    def __init__(self, tag, attrs, parent):
        self.tag = tag
        self.attrs = dict(attrs)
        self.parent = parent
        self.children = []

    def classes(self):
        return (self.attrs.get("class") or "").split()


class _Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = _Node("root", [], None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = _Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_endtag(self, tag):
        node = self.cur
        while node is not self.root and node.tag != tag:
            node = node.parent
        if node is not self.root:
            self.cur = node.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def _inner(node, nested=False):
    """Text of a node with <strong>/<em> kept; footnotes, permalinks and nested lists dropped."""
    out = []
    for child in node.children:
        if isinstance(child, str):
            out.append(html.escape(child, quote=False))
        elif child.tag == "sup" or "headerlink" in child.classes():
            continue
        elif child.tag in ("ul", "ol") and not nested:
            continue
        elif child.tag in KEEP:
            out.append(f"<{child.tag}>{_inner(child, nested)}</{child.tag}>")
        else:
            out.append(_inner(child, nested))
    return " ".join("".join(out).split())


def _clip(text):
    return text if len(text) <= MAX_CHARS else text[: MAX_CHARS - 1].rsplit(" ", 1)[0] + "…"


def _find(node, pred):
    for child in node.children:
        if isinstance(child, str):
            continue
        if pred(child):
            return child
        found = _find(child, pred)
        if found:
            return found
    return None


def _points(nodes):
    """First list items of a run of sibling nodes, or the first paragraph."""
    for node in nodes:
        lst = node if node.tag in ("ul", "ol") else _find(node, lambda n: n.tag in ("ul", "ol"))
        items = [c for c in lst.children if not isinstance(c, str) and c.tag == "li"] if lst else []
        if items:
            return [_clip(_inner(li)) for li in items[:MAX_POINTS]]
    for node in nodes:
        if node.tag == "p":
            return [_clip(_inner(node))]
    return []


def on_page_content(content, page, **kwargs):
    src = page.file.src_uri
    if not src.startswith("guides/") or src.startswith("guides/index"):
        return content
    lang = "en" if src.endswith(".en.md") else "fr"
    slug = src[len("guides/"):].removesuffix(".md").removesuffix(".en")

    tree = _Tree()
    tree.feed(content)
    top = [c for c in tree.root.children if not isinstance(c, str)]

    box = _find(tree.root, lambda n: n.tag == "div" and {"admonition", "abstract"} <= set(n.classes()))
    essentiel = _points([box]) if box else []

    sections = {}
    for i, node in enumerate(top):
        if node.tag not in ("h2", "h3") or node.attrs.get("id") in (None, "sources"):
            continue
        body = []
        for nxt in top[i + 1:]:
            if nxt.tag in ("h2",) or (node.tag == "h3" and nxt.tag == "h3"):
                break
            body.append(nxt)
        sections[node.attrs["id"]] = {"title": _inner(node), "points": _points(body)}

    _digest[lang][slug] = {"title": page.title, "essentiel": essentiel, "sections": sections}
    return content


def on_post_build(config, **kwargs):
    out = Path(config["site_dir"]) / "data" / "guides-digest.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(_digest, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
