// Validates docs/data/routes.json (schemas drawn by the route() macro in main.py): French and
// English texts everywhere, text short enough to fit the drawing, every route used by a page and
// every route() call pointing at a known route.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FILE = 'docs/data/routes.json';
const errors = [];
const { routes } = JSON.parse(readFileSync(FILE, 'utf8'));

// Widths that fit the 320-unit boxes at the drawing's font sizes.
const MAX = { chip: 16, title: 32, line: 42, noteTitle: 34, noteText: 46, lines: 3 };
const LANGS = ['fr', 'en'];

const need = (where, value, label) => {
  for (const lang of LANGS) {
    if (!value?.[lang]) errors.push(`${where}: ${label} needs a "${lang}" text`);
  }
};
const fits = (where, text, max, label) => {
  if (typeof text === 'string' && text.length > max)
    errors.push(
      `${where}: ${label} is ${text.length} characters, the drawing holds ${max} ("${text}")`,
    );
};

for (const [id, route] of Object.entries(routes)) {
  const at = `route "${id}"`;
  if (!/^[a-z0-9-]+$/.test(id)) errors.push(`${at}: id must be lowercase-dashed`);
  need(at, route.title, 'title');
  need(at, route.desc, 'desc');
  need(at, route.caption, 'caption');
  if (!Array.isArray(route.steps) || route.steps.length < 2)
    errors.push(`${at}: needs at least 2 steps`);
  (route.steps ?? []).forEach((step, i) => {
    const s = `${at} step ${i + 1}`;
    need(s, step.title, 'title');
    LANGS.forEach((lang) => {
      fits(s, step.title?.[lang], MAX.title, `title (${lang})`);
      const lines = step.lines?.[lang];
      if (!Array.isArray(lines) || !lines.length) errors.push(`${s}: needs "lines" in "${lang}"`);
      else {
        if (lines.length > MAX.lines) errors.push(`${s}: at most ${MAX.lines} lines (${lang})`);
        lines.forEach((l) => fits(s, l, MAX.line, `line (${lang})`));
      }
      if (step.who) fits(s, step.who[lang], MAX.chip, `label (${lang})`);
    });
    if (step.who) need(s, step.who, 'label');
  });
  (route.notes ?? []).forEach((note, i) => {
    const s = `${at} note ${i + 1}`;
    need(s, note.title, 'title');
    need(s, note.text, 'text');
    LANGS.forEach((lang) => {
      fits(s, note.title?.[lang], MAX.noteTitle, `title (${lang})`);
      fits(s, note.text?.[lang], MAX.noteText, `text (${lang})`);
    });
  });
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.md') ? [path] : [];
  });
const used = new Set();
for (const file of walk('docs')) {
  for (const m of readFileSync(file, 'utf8').matchAll(
    /\{\{\s*route\(\s*["']([^"']+)["']\s*\)\s*\}\}/g,
  )) {
    used.add(m[1]);
    if (!routes[m[1]]) errors.push(`${file}: route("${m[1]}") is not in ${FILE}`);
  }
}
for (const id of Object.keys(routes))
  if (!used.has(id)) errors.push(`route "${id}" is not used by any page`);

if (!existsSync(FILE) || errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(
  `✅ ${FILE}: ${Object.keys(routes).length} routes, texts in French and English, all used`,
);
