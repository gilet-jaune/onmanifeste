"""MkDocs hook: add a strict Content-Security-Policy <meta> to every built page.

GitHub Pages cannot send security headers, so the policy is injected as the first element of <head>.
Inline scripts (Material's theme bootstrap) are allowed by their SHA-256 hash, computed per page;
anything else must come from the site itself. Must run before hooks/pwa.py, which hashes the
final HTML for the service worker version.
"""
import base64
import hashlib
import re
from pathlib import Path

INLINE_SCRIPT = re.compile(r"<script(?![^>]*\bsrc=)([^>]*)>(.*?)</script>", re.S)

BASE_POLICY = [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline'",  # Material and the footer use style attributes
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
]


def _policy(html: str) -> str:
    hashes = sorted(
        {
            "'sha256-" + base64.b64encode(hashlib.sha256(body.encode()).digest()).decode() + "'"
            for attrs, body in INLINE_SCRIPT.findall(html)
            if "application/json" not in attrs and body.strip()
        }
    )
    return "; ".join(["script-src 'self' " + " ".join(hashes)] + BASE_POLICY)


def on_post_build(config, **kwargs):
    for path in Path(config["site_dir"]).rglob("*.html"):
        html = path.read_text(encoding="utf-8")
        if 'http-equiv="Content-Security-Policy"' in html or "<head>" not in html:
            continue
        meta = f'<meta http-equiv="Content-Security-Policy" content="{_policy(html)}">'
        path.write_text(html.replace("<head>", "<head>" + meta, 1), encoding="utf-8")
