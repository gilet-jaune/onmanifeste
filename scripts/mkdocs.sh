#!/usr/bin/env bash
# Run MkDocs from a local virtual environment (.venv), creating it and installing
# requirements.txt on first use or whenever requirements.txt changes.
# Usage: scripts/mkdocs.sh serve | build --strict | …  (any mkdocs arguments)
set -euo pipefail

cd "$(dirname "$0")/.."
VENV=.venv
STAMP="$VENV/.requirements.sha"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required: https://www.python.org/downloads/" >&2
  exit 1
fi

if [ ! -x "$VENV/bin/mkdocs" ] || [ "$(cat "$STAMP" 2>/dev/null)" != "$(shasum requirements.txt)" ]; then
  echo "Installing MkDocs and plugins into $VENV (first run or requirements.txt changed)…"
  [ -d "$VENV" ] || python3 -m venv "$VENV"
  "$VENV/bin/pip" install --quiet --upgrade pip
  "$VENV/bin/pip" install --quiet -r requirements.txt
  shasum requirements.txt > "$STAMP"
fi

exec "$VENV/bin/mkdocs" "$@"
