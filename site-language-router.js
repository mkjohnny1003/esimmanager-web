(() => {
  const paths = {
    'zh-TW': '/',
    en: '/en/',
    'zh-CN': '/zh-cn/',
    ja: '/ja/',
    ko: '/ko/'
  };

  const selector = document.getElementById('site-language');
  const currentLanguage = document.documentElement.lang;
  try { localStorage.setItem('esimmanager-site-language', currentLanguage); } catch { /* unavailable in file previews */ }
  if (!selector) return;

  selector.addEventListener('change', () => {
    const destination = paths[selector.value] || paths['zh-TW'];
    try { localStorage.setItem('esimmanager-site-language', selector.value); } catch { /* unavailable in file previews */ }
    window.location.assign(destination);
  });
})();
