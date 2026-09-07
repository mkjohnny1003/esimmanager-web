(() => {
  const selector = document.getElementById('site-language');
  const currentLanguage = document.documentElement.lang;
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  let rememberedLanguage = null;
  try { rememberedLanguage = localStorage.getItem('esimmanager-site-language'); } catch { /* unavailable in file previews */ }

  const preferredLanguage = () => {
    const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const language of candidates) {
      if (!language) continue;
      if (/^zh-(TW|HK|MO)|^zh-Hant/i.test(language)) return 'zh-TW';
      if (/^zh-(CN|SG)|^zh-Hans/i.test(language)) return 'zh-CN';
      if (/^ja/i.test(language)) return 'ja';
      if (/^ko/i.test(language)) return 'ko';
      if (/^fr/i.test(language)) return 'fr';
      if (/^de/i.test(language)) return 'de';
      if (/^es/i.test(language)) return 'es';
      if (/^en/i.test(language)) return 'en';
    }
    return 'zh-TW';
  };

  const currentPath = window.location.pathname;
  const inLocalizedFolder = /\/(?:en|zh-cn|ja|ko|fr|de|es)\/(?:index\.html)?$/i.test(currentPath);
  const siteRoot = currentPath
    .replace(/\/(?:en|zh-cn|ja|ko|fr|de|es)\/(?:index\.html)?$/i, '/')
    .replace(/\/index\.html$/i, '/');
  const browserPaths = {
    'zh-TW': `${siteRoot}?lang=zh-TW`,
    en: `${siteRoot}en/`,
    'zh-CN': `${siteRoot}zh-cn/`,
    ja: `${siteRoot}ja/`,
    ko: `${siteRoot}ko/`,
    fr: `${siteRoot}fr/`,
    de: `${siteRoot}de/`,
    es: `${siteRoot}es/`
  };
  const relativePrefix = inLocalizedFolder ? '../' : '';
  const filePaths = {
    'zh-TW': `${relativePrefix}index.html?lang=zh-TW`,
    en: `${relativePrefix}en/index.html`,
    'zh-CN': `${relativePrefix}zh-cn/index.html`,
    ja: `${relativePrefix}ja/index.html`,
    ko: `${relativePrefix}ko/index.html`,
    fr: `${relativePrefix}fr/index.html`,
    de: `${relativePrefix}de/index.html`,
    es: `${relativePrefix}es/index.html`
  };
  const paths = window.location.protocol === 'file:' ? filePaths : browserPaths;
  const supported = Object.keys(paths);

  if ((window.location.pathname === '/' || /\/index\.html$/i.test(window.location.pathname)) && !queryLanguage && !inLocalizedFolder) {
    const chosenLanguage = supported.includes(rememberedLanguage) ? rememberedLanguage : preferredLanguage();
    if (chosenLanguage !== 'zh-TW') {
      window.location.replace(paths[chosenLanguage]);
      return;
    }
  }

  const activeLanguage = supported.includes(queryLanguage) ? queryLanguage : currentLanguage;
  try { localStorage.setItem('esimmanager-site-language', activeLanguage); } catch { /* unavailable in file previews */ }
  if (queryLanguage === 'zh-TW' && window.location.protocol !== 'file:') {
    window.history.replaceState({}, '', siteRoot);
  }
  if (!selector) return;
  selector.value = activeLanguage;

  selector.addEventListener('change', () => {
    const destination = paths[selector.value] || paths['zh-TW'];
    try { localStorage.setItem('esimmanager-site-language', selector.value); } catch { /* unavailable in file previews */ }
    window.location.assign(destination);
  });
})();
