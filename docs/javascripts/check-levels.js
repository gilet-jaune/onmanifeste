/*
  "Who checked and when": one wording for every card the scripts build. Labels and date format
  come from docs/data/check-levels.json, the file also read by hooks/sources.py and
  overrides/partials/check.html. Exposes window.apCheck.
*/
(function () {
  'use strict';

  const LEVELS_URL = new URL('../data/check-levels.json', document.currentScript.src);
  let promise = null;

  function load() {
    if (!promise) {
      promise = fetch(LEVELS_URL).then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json().then((d) => d.check_levels);
      });
    }
    return promise;
  }

  function formatDate(levels, iso, lang) {
    const [year, month, day] = iso.split('-');
    return levels.date_format[lang]
      .replace('{d}', String(Number(day)))
      .replace('{m}', levels.months[lang][Number(month) - 1])
      .replace('{y}', year);
  }

  // "Sourcé le <time>28 oct. 2026</time> · non relu par un humain" as DOM children.
  function line(levels, check, lang) {
    const who = (levels.by[check.by] || levels.by.ai)[lang];
    const time = document.createElement('time');
    time.setAttribute('datetime', check.date);
    time.textContent = formatDate(levels, check.date, lang);
    return [`${who} `, time, check.by === 'ai' ? ` · ${levels.ai_pending[lang]}` : ''];
  }

  window.apCheck = { load, line, formatDate };
})();
