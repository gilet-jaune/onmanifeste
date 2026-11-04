// Page metadata checks:
// - review: juridique|medical with review_status: pending|reviewed (reviewed_on required once reviewed)
// - description: every page has one, 160 characters at most (meta description and line shown under
//   the title in the site search results)
// - translations: every page.en.md records the commit of the French page it translates
//   (source_commit, as MDN does); a French page changed since then makes the translation outdated.
// Usage: node scripts/validate-pages.mjs [--report file.md]   (outdated translations are warnings)
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const outdated = [];
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.md') ? [path] : [];
  });
const frontMatter = (file) => {
  const match = readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  return Object.fromEntries(
    (match?.[1] ?? '')
      .split('\n')
      .map((line) => line.match(/^([a-z_]+):\s*(.+)$/))
      .filter(Boolean)
      .map(([, k, v]) => [k, v.trim()]),
  );
};
const git = (...args) => {
  try {
    return execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
};

for (const file of walk('docs')) {
  const fm = frontMatter(file);
  if (fm.review) {
    if (!['juridique', 'medical'].includes(fm.review))
      errors.push(`${file}: review must be juridique or medical`);
    if (!['pending', 'reviewed'].includes(fm.review_status)) {
      errors.push(`${file}: review_status must be pending or reviewed`);
    }
    if (fm.review_status === 'reviewed' && !/^\d{4}-\d{2}-\d{2}$/.test(fm.reviewed_on ?? '')) {
      errors.push(`${file}: reviewed pages need reviewed_on: YYYY-MM-DD`);
    }
  }
  const description = (fm.description ?? '').replace(/^(['"])(.*)$/, '$2');
  if (!description) errors.push(`${file}: missing description`);
  else if (description.length > 160)
    errors.push(`${file}: description is ${description.length} characters (160 max)`);
  if (file.endsWith('.en.md')) {
    const fr = file.replace(/\.en\.md$/, '.md');
    if (!existsSync(fr)) errors.push(`${file}: no French page ${fr}`);
    else if (!fm.source_commit)
      errors.push(`${file}: missing source_commit (commit of ${fr} it translates)`);
    else if (git('cat-file', '-e', `${fm.source_commit}^{commit}`) === null) {
      // shallow clone or unknown commit: cannot tell, skip
    } else if (git('diff', '--quiet', fm.source_commit, 'HEAD', '--', fr) === null) {
      outdated.push({ file, fr, since: fm.source_commit.slice(0, 7) });
    }
  }
}

const reportArg = process.argv.indexOf('--report');
if (reportArg !== -1) {
  const lines = outdated.length
    ? [
        `${outdated.length} traduction(s) en retard sur la version française :`,
        '',
        ...outdated.map((o) => `- \`${o.file}\` (français modifié depuis \`${o.since}\`)`),
        '',
        'Mettre à jour la traduction, puis `source_commit` avec le dernier commit de la page française.',
      ]
    : ['Toutes les traductions sont à jour.'];
  writeFileSync(process.argv[reportArg + 1], `${lines.join('\n')}\n`);
}
if (outdated.length) {
  console.warn(
    `⚠️  ${outdated.length} outdated translation(s)\n- ${outdated.map((o) => o.file).join('\n- ')}`,
  );
}
if (errors.length) {
  console.error(`❌ pages: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('✅ pages: review metadata valid, every translation records its source commit');
