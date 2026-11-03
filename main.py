"""mkdocs-macros module: helpers available in every page.

res("id", "text") links to a directory resource by its id, so a URL lives only in
docs/data/resources.json and is fixed (and checked) in one place.

route("id") draws a vertical schema from docs/data/routes.json (steps with a small label, an
optional arrow between steps and optional dashed notes), in the language of the page. The same data
serves the French and the English page, so a schema is written once.

default("id") writes the default wording of a tunable threshold (docs/data/defaults.json), so
"how many actions are watched" is stated in one place for every page and schema.
"""

import html
import re

# Layout, in SVG user units (the figure scales to the width of the page).
_WIDTH = 360
_BOX_X = 20
_BOX_W = 320
_GAP = 26
_TOP = 14
_TEXT_X = 58
_NOTE_H = 52
_NOTE_GAP = 10


# docs/data/defaults.json, set when the macros are defined: default wording for tunable thresholds.
_DEFAULTS = {}
_TOKEN = re.compile(r"\[\[([A-Za-z_]+)\]\]")


def default_text(name, lang):
    """The default wording called `name` ("actions"); a capital first letter capitalises it."""
    key = name[0].lower() + name[1:]
    if key not in _DEFAULTS:
        raise KeyError(f"unknown default '{name}' (see docs/data/defaults.json)")
    value = _DEFAULTS[key].get(lang) or _DEFAULTS[key]["fr"]
    return value[0].upper() + value[1:] if name[0].isupper() else value


def _fill(value, lang):
    """Replace [[name]] tokens in a string (or a list of strings) by the default wording."""
    if isinstance(value, list):
        return [_fill(item, lang) for item in value]
    if isinstance(value, str):
        return _TOKEN.sub(lambda m: default_text(m.group(1), lang), value)
    return value


def _text(value, lang):
    """A localised string: {"fr": ..., "en": ...} falls back to French; a plain string is kept."""
    if isinstance(value, dict):
        value = value.get(lang) or value["fr"]
    return _fill(value, lang)


def _esc(value):
    return html.escape(str(value), quote=False)


def _box_height(lines):
    return 42 + 15 * len(lines)


def render_route(rid, route, lang):
    steps = route["steps"]
    arrows = route.get("arrows", True)
    gap = _GAP if arrows else 14
    uid = f"route-{rid}-{lang}"
    out = [
        f'<svg viewBox="0 0 {_WIDTH} HEIGHT" role="img" aria-labelledby="{uid}-t {uid}-d" '
        'xmlns="http://www.w3.org/2000/svg">',
        f'<title id="{uid}-t">{_esc(_text(route["title"], lang))}</title>',
        f'<desc id="{uid}-d">{_esc(_text(route["desc"], lang))}</desc>',
    ]
    y = _TOP
    for index, step in enumerate(steps, start=1):
        lines = _text(step["lines"], lang)
        height = _box_height(lines)
        who = _text(step["who"], lang)
        out.append(
            f'<rect class="route__box" x="{_BOX_X}" y="{y}" width="{_BOX_W}" height="{height}" rx="6"/>'
        )
        if arrows:
            out.append(f'<circle class="route__num" cx="38" cy="{y + 26}" r="12"/>')
            out.append(
                f'<text class="route__num-label" x="38" y="{y + 31}" text-anchor="middle">{index}</text>'
            )
        text_x = _TEXT_X if arrows else _BOX_X + 16
        out.append(f'<text class="route__title" x="{text_x}" y="{y + 30}">{_esc(_text(step["title"], lang))}</text>')
        for k, line in enumerate(lines):
            out.append(f'<text class="route__text" x="{text_x}" y="{y + 48 + k * 15}">{_esc(line)}</text>')
        if who:
            chip_w = max(64, round(len(who) * 7.2 + 18))
            chip_x = _BOX_X + _BOX_W - chip_w - 10
            out.append(
                f'<rect class="route__chip" x="{chip_x}" y="{y - 9}" width="{chip_w}" height="18" rx="9"/>'
            )
            out.append(
                f'<text class="route__chip-label" x="{chip_x + chip_w / 2:g}" y="{y + 4}" '
                f'text-anchor="middle">{_esc(who)}</text>'
            )
        bottom = y + height
        if arrows and index < len(steps):
            out.append(f'<path class="route__arrow" d="M180 {bottom} V{bottom + gap - 7}"/>')
            out.append(
                f'<path class="route__head" d="M173 {bottom + gap - 8} L180 {bottom + gap} L187 {bottom + gap - 8} Z"/>'
            )
        y = bottom + gap
    notes = route.get("notes", [])
    if notes:
        y = y - gap + 22
        for note in notes:
            out.append(
                f'<rect class="route__note" x="{_BOX_X}" y="{y}" width="{_BOX_W}" height="{_NOTE_H}" rx="6"/>'
            )
            out.append(f'<text class="route__title" x="{_BOX_X + 14}" y="{y + 22}">{_esc(_text(note["title"], lang))}</text>')
            out.append(f'<text class="route__text" x="{_BOX_X + 14}" y="{y + 40}">{_esc(_text(note["text"], lang))}</text>')
            y += _NOTE_H + _NOTE_GAP
        y -= _NOTE_GAP
    else:
        y -= gap
    out.append("</svg>")
    svg = "\n".join(out).replace("HEIGHT", str(y + 14), 1)
    caption = _esc(_text(route["caption"], lang))
    return f'<figure class="route" markdown="1">\n{svg}\n<figcaption>{caption}</figcaption>\n</figure>'


def define_env(env):
    resources = {r["id"]: r for r in env.variables["resources"]}
    routes = env.variables["routes"]
    _DEFAULTS.clear()
    _DEFAULTS.update(env.variables["defaults"])

    @env.macro
    def default(name):
        lang = env.conf["theme"]["language"] or "fr"
        return default_text(name, lang)

    @env.macro
    def res(resource_id, text=None):
        if resource_id not in resources:
            raise KeyError(f"unknown resource '{resource_id}' (see docs/data/resources.json)")
        r = resources[resource_id]
        return f'[{text or r["name"]}]({r["url"]}){{ data-resource-card="{r["id"]}" }}'

    @env.macro
    def route(route_id):
        if route_id not in routes:
            raise KeyError(f"unknown route '{route_id}' (see docs/data/routes.json)")
        lang = env.conf["theme"]["language"] or "fr"
        return render_route(route_id, routes[route_id], lang)
