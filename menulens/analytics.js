(() => {
  'use strict';

  const measurementId = 'G-KJB54JTM44';
  const storageKey = 'menulens_measurement_consent_v1';
  const lifetime = 90 * 24 * 60 * 60 * 1000;
  const english = document.documentElement.lang.startsWith('en');
  const production = location.hostname === 'getesimmanager.com' &&
    location.protocol === 'https:' && location.pathname.startsWith('/menulens/');
  const gpc = navigator.globalPrivacyControl === true;
  const copy = english ? {
    title: 'Website privacy choices',
    body: 'May we send website visits and MenuLens App Store button clicks to Google Analytics and Google Ads to measure our advertising? This uses cookies, not personalized ads. No app camera images or translations are sent. A click is not an installation.',
    gpc: 'Your browser privacy signal is enabled. Optional measurement stays off.',
    accept: 'Allow measurement', reject: 'No thanks', choices: 'Privacy choices', policy: 'Privacy policy'
  } : {
    title: '網站隱私選擇',
    body: '是否同意將官網瀏覽與 MenuLens 的 App Store 按鈕點擊傳給 Google Analytics 和 Google Ads，以衡量廣告成效？此功能使用 Cookie，不用於個人化廣告，不傳送 App 的相機影像或翻譯內容。點擊不代表安裝。',
    gpc: '你的瀏覽器已啟用隱私訊號，非必要的成效追蹤將維持關閉。',
    accept: '同意成效追蹤', reject: '不同意', choices: '隱私偏好', policy: '隱私政策'
  };
  let consent = false;
  let loaded = false;
  let preferencesOpened = false;
  let saved;
  try {
    const record = JSON.parse(localStorage.getItem(storageKey));
    if (record && typeof record.allowed === 'boolean' && Number.isFinite(record.time) &&
        record.time <= Date.now() && Date.now() - record.time < lifetime) saved = record.allowed;
  } catch (_) { /* Storage may be unavailable in private browsing. */ }

  const panel = document.createElement('section');
  panel.className = 'measurement-consent';
  panel.setAttribute('aria-labelledby', 'measurement-title');
  panel.innerHTML = `<div class="measurement-inner"><h2 id="measurement-title">${copy.title}</h2>
    <p>${copy.body}</p><p class="measurement-gpc"${gpc ? '' : ' hidden'}>${copy.gpc}</p>
    <div class="measurement-actions"><button type="button" data-measurement-accept${gpc ? ' disabled' : ''}>${copy.accept}</button>
    <button type="button" data-measurement-reject>${copy.reject}</button><a href="privacy.html">${copy.policy}</a></div></div>`;
  document.querySelector('header').after(panel);
  const preferences = document.createElement('button');
  preferences.type = 'button';
  preferences.className = 'measurement-preferences';
  preferences.textContent = copy.choices;
  document.querySelector('footer').append(preferences);

  // Do not forward arbitrary query strings, fragments, or full referring URLs.
  function pageLocation() {
    const page = new URL(location.origin + location.pathname);
    const incoming = new URLSearchParams(location.search);
    for (const name of ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = incoming.get(name);
      if (value && /^[a-zA-Z0-9_.~-]{1,200}$/.test(value)) page.searchParams.set(name, value);
    }
    return page.href;
  }

  function referrerOrigin() {
    try { return new URL(document.referrer).origin; } catch (_) { return ''; }
  }

  function enable() {
    consent = !gpc;
    if (!consent || !production || loaded) return;
    loaded = true;
    window['ga-disable-' + measurementId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    const tag = window.gtag;
    tag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    tag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied' });
    tag('js', new Date());
    tag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_prefix: 'menulens', cookie_path: '/menulens', cookie_domain: 'none',
      cookie_expires: lifetime / 1000, cookie_update: false,
      page_location: pageLocation(), page_referrer: referrerOrigin()
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    script.referrerPolicy = 'strict-origin';
    document.head.append(script);
    tag('event', 'page_view', { send_to: measurementId, app_name: 'MenuLens', page_location: pageLocation(), page_referrer: referrerOrigin() });
  }

  function disable() {
    consent = false;
    window['ga-disable-' + measurementId] = true;
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (name.startsWith('menulens')) document.cookie = name + '=; Max-Age=0; Path=/menulens; Secure; SameSite=Lax';
    }
    // Unload a previously accepted tag; do not send a denied-consent ping.
    if (loaded) location.reload();
  }

  function choose(allowed) {
    const value = allowed && !gpc;
    try { localStorage.setItem(storageKey, JSON.stringify({ allowed: value, time: Date.now() })); } catch (_) {}
    panel.hidden = true;
    if (preferencesOpened) preferences.focus();
    if (value) enable(); else disable();
  }

  panel.querySelector('[data-measurement-accept]').addEventListener('click', () => choose(true));
  panel.querySelector('[data-measurement-reject]').addEventListener('click', () => choose(false));
  preferences.addEventListener('click', () => {
    preferencesOpened = true;
    panel.hidden = false;
    panel.scrollIntoView({ block: 'center' });
    panel.querySelector(gpc ? '[data-measurement-reject]' : '[data-measurement-accept]').focus();
  });

  function trackClick(event) {
    if (!consent || !production || !loaded || !event.isTrusted || event.defaultPrevented) return;
    if ((event.type === 'click' && event.button !== 0) || (event.type === 'auxclick' && event.button !== 1)) return;
    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    let link;
    try { link = new URL(anchor.href); } catch (_) { return; }
    if (link.protocol !== 'https:' || link.hostname !== 'apps.apple.com' ||
        !/\/id6815122498\/?$/.test(link.pathname)) return;
    window.gtag('event', 'menulens_app_store_click', {
      send_to: measurementId, app_name: 'MenuLens', app_id: '6815122498',
      link_url: link.origin + link.pathname, site_language: english ? 'en' : 'zh-Hant',
      page_location: pageLocation(), page_referrer: referrerOrigin(), transport_type: 'beacon'
    });
  }
  document.addEventListener('click', trackClick);
  document.addEventListener('auxclick', trackClick);
  panel.hidden = saved !== undefined;
  if (saved === true && !gpc) enable(); else disable();
})();
