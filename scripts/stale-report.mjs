// Writes a Markdown report of registry entries whose last check (`check.date`) is older than
// STALE_DAYS, plus those whose last check could not confirm them (`check.result: unconfirmed`).
// Covers resources, sources, history events and victims (and their censuses).
// Usage: node scripts/stale-report.mjs [output.md]   (exit code 0 either way; prints the count)
import { readFileSync, writeFileSync } from 'node:fs';

const STALE_DAYS = 365;
const out = process.argv[2] || 'stale-report.md';
const registry = JSON.parse(readFileSync('docs/data/resources.json', 'utf8')).resources;
const citations = Object.entries(
  JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources,
).map(([id, s]) => ({
  id,
  name: `Source : ${s.title.fr}`,
  url: typeof s.url === 'string' ? s.url : s.url.fr,
  check: s.check,
}));
const history = JSON.parse(readFileSync('docs/data/history.json', 'utf8')).events.map((e) => ({
  id: `histoire ${e.date}`,
  name: `Frise : ${e.title.fr}`,
  url: e.url,
  check: e.check,
  file: 'docs/data/history.json',
}));
const victimes = JSON.parse(readFileSync('docs/data/victimes.json', 'utf8')).victimes;
const victims = [
  ...victimes.victims.map((v) => ({
    id: `victimes ${v.date}`,
    name: `Blessé·es et mort·es : ${v.title}`,
    url: '',
    check: v.check,
    file: 'docs/data/victimes.json',
  })),
  ...victimes.censuses.map((c) => ({
    id: 'victimes (recensement)',
    name: `Recensement : ${c.name}`,
    url: c.url,
    check: c.check,
    file: 'docs/data/victimes.json',
  })),
];
const resources = [...registry, ...citations, ...history, ...victims];

const stale = resources
  .map((r) => ({
    ...r,
    age: Math.floor((Date.now() - Date.parse(`${r.check.date}T00:00:00Z`)) / 86_400_000),
  }))
  .filter((r) => r.age > STALE_DAYS || r.check.result === 'unconfirmed')
  .sort((a, b) => b.age - a.age);

const lines = stale.length
  ? [
      `${stale.length} ressource(s) à revérifier (dernière vérification il y a plus de ${STALE_DAYS} jours, ou non confirmée) :`,
      '',
      '| Entrée | Dernière vérification | Lien | Fichier |',
      '| --- | --- | --- | --- |',
      ...stale.map(
        (r) =>
          `| \`${r.id}\` — ${r.name} | ${r.check.date} (${r.check.result === 'unconfirmed' ? 'non confirmée' : 'confirmée'}) | ${r.url} | ${r.file ?? 'docs/data/resources.json / sources.json'} |`,
      ),
      '',
      'Pour chacune : ouvrir le lien, vérifier les informations (numéro, description), puis mettre à jour `check` (`date`, `result`, `by` : `volunteer`, `lawyer`, `medical` ou `historian`) dans le fichier indiqué (`docs/data/resources.json`, `sources.json`, `history.json` ou `victimes.json`).',
    ]
  : [`Aucune ressource à revérifier.`];

writeFileSync(out, `${lines.join('\n')}\n`);
console.log(stale.length);
