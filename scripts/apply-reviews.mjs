// Applies a batch of reviews (JSON file sent by a reviewer) to the `check` of the entries it names.
//
// Usage: node scripts/apply-reviews.mjs <batch.json> [more.json...] [--write] [--issue=123]
//        (npm run review:apply)
// Without --write nothing is changed: the script only prints what it would do.
//
// The batch itself is NOT stored in the repository: publish it in the issue or PR that records the
// review (so it can be edited or erased on request). The script prints the SHA-256 of the batch and a
// commit message with it, so anyone can check that the published text is the one that was applied.
//
// Batch format (version 1):
//   {
//     "version": 1,
//     "reviewer": "pseudonym",            // pseudonym by default; a real name only if the person asked
//     "claimed": "volunteer|lawyer|medical|historian",   // what the reviewer says they are
//     "date": "YYYY-MM-DD",               // day of the review (not in the future)
//     "reviews": [
//       { "file": "sources|resources|history", "id": "abek",
//         "verdict": "confirmed|error|outdated", "comment": "required unless confirmed" }
//     ]
//   }
//
// The claimed level is never trusted: it is applied only if the reviewer is listed in
// docs/data/reviewers.json (added by the maintainer after checking the proof out of band):
//   { "reviewers": { "pseudonym": { "level": "lawyer", "method": "bar directory", "verified_on": "YYYY-MM-DD" } } }
// `method` and `verified_on` say how and when it was checked; never write an identifier or a document there.
// Anyone else is recorded as `volunteer`.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const FILES = {
  sources: { path: 'docs/data/sources.json', find: (d, id) => d.sources[id] },
  resources: {
    path: 'docs/data/resources.json',
    find: (d, id) => d.resources.find((r) => r.id === id),
  },
  history: { path: 'docs/data/history.json', find: (d, id) => d.events.find((e) => e.id === id) },
};
const LEVELS = ['volunteer', 'lawyer', 'medical', 'historian'];
const VERDICTS = ['confirmed', 'error', 'outdated'];
const REVIEWERS_FILE = 'docs/data/reviewers.json';
const MAX_COMMENT = 300;

const args = process.argv.slice(2);
const write = args.includes('--write');
const batches = args.filter((a) => !a.startsWith('--'));
const issue = args.find((a) => a.startsWith('--issue='))?.slice(8);
if (issue && !/^\d+$/.test(issue)) {
  console.error('--issue must be a number, e.g. --issue=123');
  process.exit(1);
}
if (!batches.length) {
  console.error('Usage: node scripts/apply-reviews.mjs <batch.json> [more.json...] [--write]');
  process.exit(1);
}

const trusted = existsSync(REVIEWERS_FILE)
  ? (JSON.parse(readFileSync(REVIEWERS_FILE, 'utf8')).reviewers ?? {})
  : {};
for (const [name, who] of Object.entries(trusted)) {
  if (!LEVELS.includes(who.level)) continue;
  if (
    who.level !== 'volunteer' &&
    (!who.method || !/^\d{4}-\d{2}-\d{2}$/.test(who.verified_on ?? ''))
  )
    console.warn(
      `⚠ ${REVIEWERS_FILE}: ${name}: ${who.level} needs "method" and "verified_on" (YYYY-MM-DD)`,
    );
}
const hashes = [];
const data = Object.fromEntries(
  Object.entries(FILES).map(([name, f]) => [name, JSON.parse(readFileSync(f.path, 'utf8'))]),
);
const touched = new Set();
const errors = [];
const today = new Date().toISOString().slice(0, 10);
let applied = 0;

// Plain text only: this ends up in a public JSON file and on the site.
const clean = (s) =>
  String(s ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

for (const file of batches) {
  const batch = JSON.parse(readFileSync(file, 'utf8'));
  // Hash of the compact JSON, so that re-indenting the batch in an issue does not change it.
  hashes.push(createHash('sha256').update(JSON.stringify(batch)).digest('hex'));
  const where = (i) => `${file}${i === undefined ? '' : `#${i}`}`;
  if (batch.version !== 1) errors.push(`${where()}: unsupported version`);
  const reviewer = clean(batch.reviewer);
  if (!reviewer) errors.push(`${where()}: reviewer is required`);
  if (!LEVELS.includes(batch.claimed))
    errors.push(`${where()}: claimed must be ${LEVELS.join('|')}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(batch.date ?? '') || batch.date > today)
    errors.push(`${where()}: date must be YYYY-MM-DD and not in the future`);
  if (!Array.isArray(batch.reviews) || !batch.reviews.length)
    errors.push(`${where()}: reviews must be a non-empty array`);
  if (errors.length) continue;

  const level = trusted[reviewer]?.level ?? 'volunteer';
  if (!LEVELS.includes(level)) {
    errors.push(`${REVIEWERS_FILE}: ${reviewer}: invalid level`);
    continue;
  }
  if (level !== batch.claimed)
    console.warn(
      `⚠ ${reviewer} claims "${batch.claimed}", applying "${level}" (not in reviewers.json)`,
    );

  batch.reviews.forEach((r, i) => {
    const target = FILES[r.file]?.find(data[r.file] ?? {}, r.id);
    if (!target) return errors.push(`${where(i)}: unknown ${r.file}/${r.id}`);
    if (!VERDICTS.includes(r.verdict)) return errors.push(`${where(i)}: invalid verdict`);
    const comment = clean(r.comment).slice(0, MAX_COMMENT);
    if (r.verdict !== 'confirmed' && !comment)
      return errors.push(`${where(i)}: a comment is required for "${r.verdict}"`);

    const was = target.check;
    // A volunteer never overwrites a professional check.
    if (level === 'volunteer' && was && !['ai', 'volunteer'].includes(was.by)) {
      return console.warn(`⚠ ${r.file}/${r.id}: kept (already checked by ${was.by})`);
    }
    const next = {
      date: batch.date,
      result: r.verdict === 'confirmed' ? 'confirmed' : 'unconfirmed',
      by: level,
    };
    if (next.result === 'unconfirmed') next.note = comment;
    target.check = next;
    touched.add(r.file);
    applied += 1;
    console.log(`${r.file}/${r.id}: ${was?.by}/${was?.result} → ${level}/${next.result}`);
  });
}

if (errors.length) {
  console.error(`❌ ${errors.length} error(s), nothing written\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
if (!write) {
  console.log(`${applied} review(s) ready. Re-run with --write to apply.`);
} else {
  const paths = [...touched].map((name) => FILES[name].path);
  for (const name of touched)
    writeFileSync(FILES[name].path, `${JSON.stringify(data[name], null, 2)}\n`);
  if (paths.length)
    execFileSync(
      process.execPath,
      [
        'node_modules/prettier/bin/prettier.cjs',
        '--write',
        ...paths,
        '--config',
        '.prettierrc.yaml',
      ],
      { stdio: 'inherit' },
    );
  console.log(`✅ ${applied} review(s) applied. Now run: npm run validate:data`);
  console.log('\nSuggested commit message:\n');
  console.log(`content: record ${applied} human review(s)\n`);
  hashes.forEach((h) => console.log(`Review-batch: sha256:${h}${issue ? ` (#${issue})` : ''}`));
}
