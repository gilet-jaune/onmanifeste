import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { changedSections, fingerprint, withFingerprint } from '../scripts/lib/translation-hash.mjs';

const page = (description, body) =>
  `---\ndescription: '${description}'\ntags:\n    - guides\n---\n${body}`;
const BODY = 'Intro text.\n\n## One\n\nFirst section.\n\n## Two\n\nSecond section.\n';

test('same text, different formatting: same fingerprint', () => {
  const a = fingerprint(page('A page', BODY));
  const reformatted = BODY.replaceAll('\n\n', '\n\n\n').replace(
    'First section.',
    'First   section.\n',
  );
  const b = fingerprint(
    page('A page', reformatted).replace('tags:\n    - guides', 'tags: [guides]'),
  );
  assert.equal(a.hash, b.hash);
  assert.equal(a.sections, b.sections);
});

test('CRLF and a leading BOM do not matter', () => {
  const source = page('A page', BODY);
  assert.equal(fingerprint(source).hash, fingerprint(`﻿${source.replaceAll('\n', '\r\n')}`).hash);
});

test('a changed word changes the hash and names the section', () => {
  const before = fingerprint(page('A page', BODY));
  const after = fingerprint(
    page('A page', BODY.replace('Second section.', 'Second section, edited.')),
  );
  assert.notEqual(before.hash, after.hash);
  assert.deepEqual(changedSections(before.sections, after), ['Two']);
});

test('a changed description is reported as the description', () => {
  const before = fingerprint(page('A page', BODY));
  const after = fingerprint(page('Another description', BODY));
  assert.deepEqual(changedSections(before.sections, after), ['description']);
});

test('a new section means the structure changed', () => {
  const before = fingerprint(page('A page', BODY));
  const after = fingerprint(page('A page', `${BODY}\n## Three\n\nMore.\n`));
  assert.equal(changedSections(before.sections, after), null);
});

test('other front matter keys are ignored', () => {
  const a = fingerprint(page('A page', BODY));
  const b = fingerprint(page('A page', BODY).replace('- guides', '- guides\n    - extra'));
  assert.equal(a.hash, b.hash);
});

test('withFingerprint replaces the legacy source_commit in place and is idempotent', () => {
  const english = `---\ndescription: "Hi"\nsource_commit: abc1234\ntags:\n    - guides\n---\nBody\n`;
  const french = page('Salut', BODY);
  const once = withFingerprint(english, french);
  assert.ok(!once.includes('source_commit'));
  assert.match(
    once,
    /^---\ndescription: "Hi"\nsource_hash: s1-[0-9a-f]{12}\nsource_sections: s1-[0-9a-f.]+\ntags:/,
  );
  assert.ok(once.endsWith('---\nBody\n'));
  assert.equal(withFingerprint(once, french), once);
});

test('withFingerprint adds the keys after description when none exist', () => {
  const once = withFingerprint(
    '---\ndescription: "Hi"\ntags:\n    - guides\n---\nBody\n',
    page('Salut', BODY),
  );
  assert.match(once, /^---\ndescription: "Hi"\nsource_hash: /);
});

// The MkDocs hook (Python) must compute exactly the same fingerprint as the validator (JavaScript).
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory()
      ? walk(path)
      : path.endsWith('.md') && !path.endsWith('.en.md')
        ? [path]
        : [];
  });

test('JavaScript and Python agree on every French page', (t) => {
  const python = ['python3', 'python'].find((cmd) => {
    try {
      execFileSync(cmd, ['--version'], { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  });
  if (!python) return t.skip('python not available');
  const files = walk('docs').filter((file) => existsSync(file.replace(/\.md$/, '.en.md')));
  assert.ok(files.length > 20);
  const fromPython = JSON.parse(
    execFileSync(python, ['hooks/translations.py', ...files], {
      encoding: 'utf8',
      maxBuffer: 1 << 26,
    }),
  );
  for (const file of files) {
    const js = fingerprint(readFileSync(file, 'utf8'));
    assert.equal(fromPython[file].hash, js.hash, file);
    assert.equal(fromPython[file].sections, js.sections, file);
    assert.deepEqual(fromPython[file].titles, js.titles, file);
  }
});
