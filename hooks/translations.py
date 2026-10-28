"""MkDocs hook: warn readers when an English page lags behind its French original.

Each page.en.md records the commit of the French page it translates (source_commit, as MDN does).
If the French file changed since, an admonition is prepended. Without git history (shallow clone),
nothing is shown.
"""
import subprocess
from pathlib import Path

NOTICE = (
    '!!! info "This translation may be out of date"\n\n'
    "    The French version of this page has been updated since it was translated. "
    "Switch the language to French for the latest information.\n\n"
)


def _changed_since(commit, path):
    try:
        subprocess.run(["git", "cat-file", "-e", f"{commit}^{{commit}}"], check=True, capture_output=True)
        diff = subprocess.run(["git", "diff", "--quiet", commit, "HEAD", "--", path], capture_output=True)
        return diff.returncode == 1
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def on_page_markdown(markdown, page, config, **kwargs):
    src = page.file.src_uri
    commit = page.meta.get("source_commit")
    if not src.endswith(".en.md") or not commit:
        return markdown
    french = Path(config["docs_dir"]) / src.replace(".en.md", ".md")
    if _changed_since(str(commit), str(french)):
        return NOTICE + markdown
    return markdown
