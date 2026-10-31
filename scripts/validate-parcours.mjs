// Validates the decision trees (docs/data/parcours.json, docs/data/parcours-signal.json): ids,
// labels, and that every result points to something real: a resource id, a directory situation,
// a page, or a guide section (anchor checked in FR and EN).
import { existsSync, readFileSync } from 'node:fs';

const FILES = [
  ['docs/data/parcours.json', 'parcours'],
  ['docs/data/parcours-signal.json', 'parcours_signal'],
];
const errors = [];
const registry = JSON.parse(readFileSync('docs/data/resources.json', 'utf8'));
const resourceIds = new Set(registry.resources.map((r) => r.id));
const situationIds = new Set(registry.situations.map((s) => s.id));
const PAGES = {
  sos: 'docs/sos/index',
  carte: 'docs/carte/index',
  comprendre: 'docs/comprendre/index',
  histoire: 'docs/histoire/index',
  contribuer: 'docs/contribuer/index',
  conversations: 'docs/conversations/index',
  repressions: 'docs/repressions/index',
};

// Same algorithm as Python-Markdown's default slugify (heading ids).
const slug = (text) =>
  text
    .normalize('NFKD')
    .replace(/[^\x00-\x7f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '-');
const anchorsCache = new Map();
function anchorsOf(file) {
  if (!anchorsCache.has(file)) {
    const ids = existsSync(file)
      ? readFileSync(file, 'utf8')
          .split('\n')
          .filter((l) => /^#{1,4} /.test(l))
          .map((l) => slug(l.replace(/^#+ /, '')))
      : null;
    anchorsCache.set(file, ids && new Set(ids));
  }
  return anchorsCache.get(file);
}
function checkAnchor(at, base, anchor) {
  for (const [lang, suffix] of [
    ['fr', '.md'],
    ['en', '.en.md'],
  ]) {
    const anchors = anchorsOf(base + suffix);
    if (!anchors) errors.push(`${at}: missing page ${base}${suffix}`);
    else if (anchor?.[lang] && !anchors.has(anchor[lang])) {
      errors.push(`${at}: anchor "${anchor[lang]}" not found in ${base}${suffix}`);
    }
  }
}

let failed = false;
for (const [FILE, KEY] of FILES) {
  errors.length = 0;
  const parcours = JSON.parse(readFileSync(FILE, 'utf8'))[KEY];
  const ids = new Set();
  parcours.forEach((p, i) => {
    const at = `parcours[${i}] (${p.id})`;
    if (ids.has(p.id)) errors.push(`${at}: duplicate id`);
    ids.add(p.id);
    if (!p.label?.fr || !p.label?.en) errors.push(`${at}: needs fr and en labels`);
    if (!p.needs?.length) errors.push(`${at}: needs at least one need`);
    (p.needs ?? []).forEach((n, j) => {
      const nat = `${at}.needs[${j}] (${n.id})`;
      if (!n.label?.fr || !n.label?.en) errors.push(`${nat}: needs fr and en labels`);
      if (!n.results?.length) errors.push(`${nat}: needs results`);
      (n.results ?? []).forEach((r, k) => {
        const rat = `${nat}.results[${k}]`;
        if (r.resource) {
          if (!resourceIds.has(r.resource)) errors.push(`${rat}: unknown resource "${r.resource}"`);
        } else if (r.guide) {
          checkAnchor(rat, `docs/guides/${r.guide}`, r.anchor);
        } else if (r.page) {
          if (!PAGES[r.page]) errors.push(`${rat}: unknown page "${r.page}"`);
          else checkAnchor(rat, PAGES[r.page], r.anchor);
        } else if (r.directory) {
          const s = r.directory.situation;
          if (s && !situationIds.has(s)) errors.push(`${rat}: unknown situation "${s}"`);
        } else errors.push(`${rat}: unknown result type`);
        if (!r.resource && (!r.label?.fr || !r.label?.en))
          errors.push(`${rat}: needs fr and en labels`);
      });
    });
  });

  if (errors.length) {
    console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
    failed = true;
  } else console.log(`✅ ${FILE}: ${parcours.length} profiles, all links resolve`);
}
if (failed) process.exit(1);
