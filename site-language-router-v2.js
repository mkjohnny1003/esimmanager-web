(() => {
  const paths = {
    'zh-TW': '/?lang=zh-TW',
    en: '/en/',
    'zh-CN': '/zh-cn/',
    ja: '/ja/',
    ko: '/ko/'
  };

  const selector = document.getElementById('site-language');
  const currentLanguage = document.documentElement.lang;
  const supported = Object.keys(paths);
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
      if (/^en/i.test(language)) return 'en';
    }
    return 'zh-TW';
  };

  if (window.location.pathname === '/' && !queryLanguage) {
    const chosenLanguage = supported.includes(rememberedLanguage) ? rememberedLanguage : preferredLanguage();
    if (chosenLanguage !== 'zh-TW') {
      window.location.replace(paths[chosenLanguage]);
      return;
    }
  }

  const activeLanguage = supported.includes(queryLanguage) ? queryLanguage : currentLanguage;
  try { localStorage.setItem('esimmanager-site-language', activeLanguage); } catch { /* unavailable in file previews */ }
  if (queryLanguage === 'zh-TW') window.history.replaceState({}, '', '/');
  if (!selector) return;

  selector.addEventListener('change', () => {
    const destination = paths[selector.value] || paths['zh-TW'];
    try { localStorage.setItem('esimmanager-site-language', selector.value); } catch { /* unavailable in file previews */ }
    window.location.assign(destination);
  });
})();
