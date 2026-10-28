// Writes a Markdown report of resources whose last check (`check.date`) is older than STALE_DAYS,
// plus those whose last check could not confirm them (`check.result: unconfirmed`).
// Usage: node scripts/stale-report.mjs [output.md]   (exit code 0 either way; prints the count)
import { readFileSync, writeFileSync } from 'node:fs';

const STALE_DAYS = 365;
const out = process.argv[2] || 'stale-report.md';
const { resources } = JSON.parse(readFileSync('docs/data/resources.json', 'utf8'));

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
      '| Ressource | Dernière vérification | Lien |',
      '| --- | --- | --- |',
      ...stale.map(
        (r) =>
          `| \`${r.id}\` — ${r.name} | ${r.check.date} (${r.check.result === 'unconfirmed' ? 'non confirmée' : 'confirmée'}) | ${r.url} |`,
      ),
      '',
      'Pour chacune : ouvrir le lien, vérifier les informations (numéro, description), puis mettre à jour `check` (`date`, `result`) dans `docs/data/resources.json`.',
    ]
  : [`Aucune ressource à revérifier.`];

writeFileSync(out, `${lines.join('\n')}\n`);
console.log(stale.length);
