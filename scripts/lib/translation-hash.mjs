// Translation freshness: a fingerprint of the French source, stored in each page.en.md.
//
// Why a content hash and not a commit hash: a commit hash is lost as soon as history is squashed or
// rebased, and any change to the French file (even a typo or a Prettier pass) invalidates it. The
// fingerprint is computed from the normalised text of the French page, so it survives history
// rewrites and ignores whitespace and formatting.
//
// What is hashed (version "s1"): the page description, the introduction (text before the first
// "## " heading) and each "## " section, each normalised (Unicode NFC, runs of whitespace collapsed
// to one space, trimmed). Other front matter keys (tags, image, review…) are ignored.
//
// Stored in page.en.md:
//   source_hash: s1-<12 hex>            one hash for the whole page
//   source_sections: s1-<6 hex>.<6 hex>…  one per part: description, introduction, each section
//                                       (lets a report name which sections of the French changed)
//
// hooks/translations.py implements the same algorithm: keep both in step (tests/translation-hash.test.mjs
// checks that they agree on every page).
import { createHash } from 'node:crypto';

export const VERSION = 's1';
const WHITESPACE = /[ \t\n\r\f\v   ]+/g;
const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n?/;

const sha = (text) => createHash('sha256').update(text, 'utf8').digest('hex');
const normalise = (text) => text.normalize('NFC').replace(WHITESPACE, ' ').trim();

/** Fingerprint of a French page: { hash, sections, titles }. */
export function fingerprint(text) {
  const source = text.replace(/\r\n/g, '\n').replace(/^﻿/, '');
  const match = source.match(FRONT_MATTER);
  const body = match ? source.slice(match[0].length) : source;
  const described = match?.[1].match(/^description:[ \t]*(.+)$/m);
  const description = described ? described[1].trim().replace(/^(['"])([\s\S]*)\1$/, '$2') : '';

  const parts = body.split(/^(?=## )/m).filter((part, index) => !(index === 0 && part === ''));
  const items = [normalise(description), ...parts.map(normalise)];
  const titles = [
    'description',
    ...parts.map((part) =>
      part.startsWith('## ') ? part.split('\n')[0].slice(3).trim() : 'introduction',
    ),
  ];
  return {
    hash: `${VERSION}-${sha(items.join('\u0001')).slice(0, 12)}`,
    sections: `${VERSION}-${items.map((item) => sha(item).slice(0, 6)).join('.')}`,
    titles,
  };
}

/**
 * Compare the stored sections with the current ones.
 * Returns the titles of the changed parts, or null when the structure itself changed.
 */
export function changedSections(stored, current) {
  if (!stored || !stored.startsWith(`${VERSION}-`)) return null;
  const before = stored.slice(VERSION.length + 1).split('.');
  const after = current.sections.slice(VERSION.length + 1).split('.');
  if (before.length !== after.length) return null;
  return after.flatMap((hash, index) => (hash === before[index] ? [] : [current.titles[index]]));
}

const LEGACY = /^(source_commit|source_hash|source_sections):/;

/**
 * Set source_hash and source_sections in the front matter of an English page (removing the legacy
 * source_commit). They replace the first legacy line in place, or go right after `description:`.
 */
export function withFingerprint(english, frenchText) {
  const match = english.match(FRONT_MATTER);
  if (!match) throw new Error('no front matter');
  const print = fingerprint(frenchText);
  const lines = match[1].split('\n');
  const firstOld = lines.findIndex((line) => LEGACY.test(line));
  const rest = lines.filter((line) => !LEGACY.test(line));
  const at =
    firstOld !== -1
      ? firstOld
      : (() => {
          const description = rest.findIndex((line) => line.startsWith('description:'));
          return description === -1 ? rest.length : description + 1;
        })();
  rest.splice(at, 0, `source_hash: ${print.hash}`, `source_sections: ${print.sections}`);
  return `---\n${rest.join('\n')}\n---${english.slice(match[0].length - (match[0].endsWith('\n') ? 1 : 0))}`;
}
