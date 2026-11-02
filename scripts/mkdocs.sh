#!/usr/bin/env bash
# Run MkDocs from a local virtual environment (.venv), creating it and installing
# requirements.txt on first use or whenever requirements.txt changes.
# Works on Linux, macOS and Windows (Git Bash).
# Usage: scripts/mkdocs.sh serve | build --strict | …  (any mkdocs arguments)
set -euo pipefail

cd "$(dirname "$0")/.."
VENV=.venv
STAMP="$VENV/.requirements.sha"

# First interpreter that really runs (the Windows Store "python3" stub exists but fails).
PYTHON=""
for candidate in python3 python "py -3"; do
  # shellcheck disable=SC2086
  if $candidate -c "import sys; sys.exit(sys.version_info < (3, 9))" >/dev/null 2>&1; then
    PYTHON=$candidate
    break
  fi
done
if [ -z "$PYTHON" ]; then
  echo "Python 3.9 or newer is required: https://www.python.org/downloads/" >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  HASH=$(sha256sum requirements.txt)
else
  HASH=$(shasum -a 256 requirements.txt)
fi

# Virtual environment layout: bin/ on Linux and macOS, Scripts/ on Windows.
[ -d "$VENV/Scripts" ] && BIN="$VENV/Scripts" || BIN="$VENV/bin"

if [ ! -d "$VENV" ] || [ "$(cat "$STAMP" 2>/dev/null)" != "$HASH" ]; then
  echo "Installing MkDocs and plugins into $VENV (first run or requirements.txt changed)…"
  [ -d "$VENV" ] || $PYTHON -m venv "$VENV"
  [ -d "$VENV/Scripts" ] && BIN="$VENV/Scripts" || BIN="$VENV/bin"
  "$BIN/python" -m pip install --quiet --upgrade pip
  "$BIN/python" -m pip install --quiet -r requirements.txt
  echo "$HASH" > "$STAMP"
fi

exec "$BIN/python" -m mkdocs "$@"
