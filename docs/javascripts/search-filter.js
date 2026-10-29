/* 
  Scope search index and results to the current language only.
  MkDocs / mkdocs-static-i18n bundles all localized documents into a single
  global search_index.json. By intercepting the search worker initialization message,
  we filter the documents so Lunr only indexes and queries documents for the active language.
*/
(function () {
  'use strict';

  function isCurrentLangEn() {
    return (
      (document.documentElement && document.documentElement.lang === 'en') ||
      window.location.pathname.includes('/en/')
    );
  }

  function filterDocs(docs) {
    if (!Array.isArray(docs)) return docs;
    const isEn = isCurrentLangEn();
    return docs.filter(function (doc) {
      if (!doc || typeof doc.location !== 'string') return true;
      const isDocEn = doc.location.startsWith('en/');
      return isEn ? isDocEn : !isDocEn;
    });
  }

  // Intercept Web Worker setup message (online / standard mode)
  if (typeof window !== 'undefined' && window.Worker) {
    const NativeWorker = window.Worker;
    window.Worker = function (scriptURL, options) {
      const worker =
        options !== undefined ? new NativeWorker(scriptURL, options) : new NativeWorker(scriptURL);
      const origPostMessage = worker.postMessage.bind(worker);
      worker.postMessage = function (msg, transfer) {
        if (msg && msg.type === 0 && msg.data && Array.isArray(msg.data.docs)) {
          msg.data.docs = filterDocs(msg.data.docs);
        }
        return transfer !== undefined ? origPostMessage(msg, transfer) : origPostMessage(msg);
      };
      return worker;
    };
    window.Worker.prototype = NativeWorker.prototype;
  }

  // Intercept offline search index (__index global in search_index.js for file:// protocol)
  try {
    let internalIndex;
    Object.defineProperty(window, '__index', {
      configurable: true,
      enumerable: true,
      get: function () {
        return internalIndex;
      },
      set: function (val) {
        if (val && Array.isArray(val.docs)) {
          val.docs = filterDocs(val.docs);
        }
        internalIndex = val;
      },
    });
  } catch (_e) {
    // Ignore if not configurable
  }
})();
