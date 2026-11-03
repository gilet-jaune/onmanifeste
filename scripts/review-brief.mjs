// Builds a review brief for a legal or medical guide: each sentence that cites a source,
// followed by the exact sources to open. Hand it to the professional who reviews the page.
//
// Usage: node scripts/review-brief.mjs garde-a-vue [more-guides...]   (prints Markdown)
//        node scripts/review-brief.mjs --pending                      (every page awaiting review)
import { readFileSync, readdirSync } from 'node:fs';

const sources = JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources;
const guidesDir = 'docs/guides';

function pendingGuides() {
  return readdirSync(guidesDir)
    .filter((f) => f.endsWith('.md') && !f.endsWith('.en.md'))
    .filter((f) => /review_status:\s*pending/.test(readFileSync(`${guidesDir}/${f}`, 'utf8')))
    .map((f) => f.replace(/\.md$/, ''));
}

function brief(name) {
  const text = readFileSync(`${guidesDir}/${name}.md`, 'utf8');
  const title = /^# (.+)$/m.exec(text)?.[1] ?? name;
  const out = [`## ${title}`, '', `Page : \`docs/guides/${name}.md\``, ''];
  let n = 0;
  let missing = 0;
  for (const line of text.split('\n')) {
    const ids = [...line.matchAll(/\[\^([a-z0-9-]+)\]/g)].map((m) => m[1]);
    if (!ids.length) continue;
    n += 1;
    const claim = line
      .replace(/\[\^[a-z0-9-]+\]/g, '')
      .replace(/^\s*(?:>\s*)?(?:[-*]|\d+\.)\s+(?:\[[ x]\]\s+)?/, '')
      .trim();
    out.push(`${n}. ${claim}`);
    for (const id of new Set(ids)) {
      const s = sources[id];
      if (!s) {
        missing += 1;
        out.push(`    - ⚠ source inconnue : ${id}`);
        continue;
      }
      out.push(
        `    - ${s.title.fr} : ${s.url} (contrôle ${s.check.result} le ${s.check.date}, par ${s.check.by})`,
      );
    }
    out.push('    - Verdict : exact / à corriger / incomplet — commentaire :');
    out.push('');
  }
  out.push(
    `${n} affirmations sourcées${missing ? `, ${missing} source(s) manquante(s)` : ''}.`,
    '',
  );
  return out.join('\n');
}

const args = process.argv.slice(2);
const names = args.includes('--pending') ? pendingGuides() : args;
if (!names.length) {
  console.error('Usage: node scripts/review-brief.mjs <guide> [guide...] | --pending');
  process.exit(1);
}
console.log('# Fiche de relecture juridique\n');
console.log(
  'Pour chaque affirmation : ouvrez la source, vérifiez que le texte la soutient, puis donnez votre verdict. ' +
    'Les contrôles marqués « ai » ont été faits par une IA, sans relecture humaine.\n',
);
for (const name of names) console.log(brief(name));
