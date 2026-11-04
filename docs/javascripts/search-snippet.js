/*
  Site search: show a short excerpt around the first match instead of the whole section.
  Material renders the full HTML of every matching section (lists, paragraphs…) in the results;
  this keeps one line of ~200 characters centred on the first highlighted word, and drops the
  "not found" notice for one- or two-letter words (stop words such as « à »). Offline, no request.
*/
(function () {
  'use strict';

  const BEFORE = 70;
  const AFTER = 130;
  const SKIP = 'h1, h2, h3, nav.md-tags, .md-search-result__terms, .md-search-result__icon';
  const BLOCK = /^(P|LI|UL|OL|DIV|TR|TD|TH|DD|DT|BLOCKQUOTE|PRE|H[1-6])$/;

  // Plain text of the teaser blocks and the [start, end) ranges of the highlighted words.
  function flatten(blocks) {
    let text = '';
    const marks = [];
    const walk = (node, inMark) => {
      if (node.nodeType === 3) {
        text += node.nodeValue.replace(/\s+/g, ' ');
        return;
      }
      if (node.nodeType !== 1) return;
      const isMark = node.tagName === 'MARK';
      const start = text.length;
      if (BLOCK.test(node.tagName) && text && !text.endsWith(' ')) text += ' ';
      node.childNodes.forEach((child) => walk(child, inMark || isMark));
      if (isMark && !inMark) marks.push([start, text.length]);
      if (BLOCK.test(node.tagName) && !text.endsWith(' ')) text += ' ';
    };
    blocks.forEach((b) => walk(b, false));
    return { text, marks };
  }

  function excerpt(article) {
    const blocks = [...article.children].filter((el) => !el.matches(SKIP));
    if (!blocks.length) return;
    const { text, marks } = flatten(blocks);
    if (!text.trim()) return;

    const first = marks[0];
    let from = first ? Math.max(0, first[0] - BEFORE) : 0;
    let to = Math.min(
      text.length,
      (first ? first[0] : 0) + AFTER + (first ? first[1] - first[0] : 0),
    );
    if (from > 0) {
      const space = text.indexOf(' ', from);
      if (space !== -1 && space < (first ? first[0] : to)) from = space + 1;
    }
    if (to < text.length) {
      const space = text.lastIndexOf(' ', to);
      if (space > from) to = space;
    }

    const p = document.createElement('p');
    p.className = 'md-search-result__snippet';
    if (from > 0) p.append('… ');
    let cursor = from;
    marks.forEach(([s, e]) => {
      if (e <= from || s >= to) return;
      const a = Math.max(s, from);
      const b = Math.min(e, to);
      if (a > cursor) p.append(text.slice(cursor, a));
      const m = document.createElement('mark');
      m.textContent = text.slice(a, b);
      p.append(m);
      cursor = b;
    });
    if (cursor < to) p.append(text.slice(cursor, to).trimEnd());
    if (to < text.length) p.append(' …');

    blocks.forEach((b) => b.remove());
    const anchor = article.querySelector(':scope > h1, :scope > h2, :scope > h3');
    if (anchor) anchor.after(p);
    else article.prepend(p);
  }

  function tidyTerms(article) {
    const terms = article.querySelector('.md-search-result__terms');
    if (!terms) return;
    terms.querySelectorAll('del').forEach((d) => {
      if (d.textContent.trim().length <= 2) d.remove();
    });
    if (!terms.querySelector('del')) terms.remove();
  }

  function process(root) {
    root.querySelectorAll('.md-search-result__article:not([data-snippet])').forEach((article) => {
      article.setAttribute('data-snippet', '1');
      excerpt(article);
      tidyTerms(article);
    });
  }

  function init() {
    const results = document.querySelector('[data-md-component="search-result"]');
    if (!results || results.dataset.snippetReady) return;
    results.dataset.snippetReady = '1';
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        process(results);
      });
    }).observe(results, { childList: true, subtree: true });
    process(results);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  }
})();
