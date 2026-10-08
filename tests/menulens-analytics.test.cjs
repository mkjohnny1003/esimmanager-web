const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');
const source = readFileSync(resolve(__dirname, '../menulens/analytics.js'), 'utf8');

function fixture(options = {}) {
  const handlers = {};
  const accept = { addEventListener(name, fn) { this[name] = fn; }, focus() {} };
  const reject = { ...accept };
  const panel = { setAttribute() {}, querySelector(s) { return s.includes('accept') ? accept : reject; }, scrollIntoView() {} };
  const preferences = { ...accept };
  const scripts = [];
  const storage = new Map();
  if (options.saved !== undefined) storage.set('menulens_measurement_consent_v1', JSON.stringify({ allowed: options.saved, time: options.time ?? Date.now() }));
  let created = 0;
  let reloads = 0;
  const cookieWrites = [];
  const document = {
    documentElement: { lang: options.lang || 'zh-Hant-TW' },
    referrer: 'https://example.com/private?email=someone@example.com',
    head: { append(script) { scripts.push(script); } },
    createElement(tag) { return tag === 'script' ? {} : created++ === 0 ? panel : preferences; },
    querySelector(selector) { return selector === 'header' ? { after() {} } : { append() {} }; },
    addEventListener(name, fn) { handlers[name] = fn; }
  };
  Object.defineProperty(document, 'cookie', {
    get() { return 'menulens_ga=123; menulens_ga_KJB54JTM44=abc; other_app=keep'; },
    set(value) { cookieWrites.push(value); }
  });
  const location = Object.assign(new URL(options.url || 'https://getesimmanager.com/menulens/?email=private&gclid=abc-123&utm_campaign=MenuLens#secret'), { reload() { reloads++; } });
  const window = {};
  runInNewContext(source, {
    document, location, window, navigator: { globalPrivacyControl: options.gpc || false }, URL, URLSearchParams,
    localStorage: {
      getItem(key) { if (options.blocked) throw Error('blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (options.blocked) throw Error('blocked'); storage.set(key, value); }
    }
  });
  return { scripts, panel, preferences, accept, reject, window, storage, cookieWrites,
    reloads: () => reloads,
    events: () => (window.dataLayer || []).map(args => [...args]),
    click(href = 'https://apps.apple.com/tw/app/id6815122498', override = {}) {
      const event = { type: 'click', button: 0, isTrusted: true, defaultPrevented: false,
        target: { closest() { return { href }; } }, ...override };
      handlers[event.type](event);
    }
  };
}

test('no Google tag or queued telemetry before consent or after rejection', () => {
  const f = fixture();
  assert.equal(f.panel.hidden, false);
  f.click();
  f.reject.click();
  assert.equal(f.scripts.length, 0);
  assert.equal(f.events().length, 0);
  assert.equal(f.panel.hidden, true);
  assert.equal(fixture({ saved: false }).scripts.length, 0);
});

test('acceptance loads one tag and one page view with safe configuration', () => {
  const f = fixture();
  f.accept.click();
  f.accept.click();
  assert.equal(f.scripts.length, 1);
  assert.equal(f.events().filter(e => e[1] === 'page_view').length, 1);
  const config = f.events().find(e => e[0] === 'config')[2];
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.allow_ad_personalization_signals, false);
  assert.equal(config.cookie_path, '/menulens');
  assert.equal(config.cookie_domain, 'none');
  assert.equal(config.page_location, 'https://getesimmanager.com/menulens/?gclid=abc-123&utm_campaign=MenuLens');
  assert.equal(config.page_referrer, 'https://example.com');
  assert.equal(f.events().find(e => e[1] === 'update')[2].ad_personalization, 'denied');
});

test('tracks only trusted MenuLens App Store clicks, including middle clicks', () => {
  const f = fixture({ saved: true });
  f.click();
  f.click('https://apps.apple.com/us/app/menulens/id6815122498?private=ignore', { type: 'auxclick', button: 1 });
  for (const href of ['https://apps.apple.com/app/id11111', 'https://apps.apple.com.evil.test/app/id6815122498', 'http://apps.apple.com/app/id6815122498', 'https://example.com/', 'invalid']) f.click(href);
  f.click(undefined, { isTrusted: false });
  f.click(undefined, { defaultPrevented: true });
  f.click(undefined, { type: 'auxclick', button: 2 });
  const events = f.events().filter(e => e[1] === 'menulens_app_store_click');
  assert.equal(events.length, 2);
  assert.equal(events[1][2].link_url, 'https://apps.apple.com/us/app/menulens/id6815122498');
  assert.equal(events[0][2].send_to, 'G-KJB54JTM44');
  assert.equal(f.events().some(e => e[1] === 'app_store_click'), false);
});

test('withdrawal stops clicks, clears only own cookies and reloads', () => {
  const f = fixture({ saved: true });
  f.preferences.click();
  assert.equal(f.panel.hidden, false);
  f.reject.click();
  f.click();
  assert.equal(f.events().filter(e => e[1] === 'menulens_app_store_click').length, 0);
  assert.equal(f.window['ga-disable-G-KJB54JTM44'], true);
  assert.equal(f.reloads(), 1);
  assert.equal(f.cookieWrites.length, 2);
  assert.ok(f.cookieWrites.every(c => c.startsWith('menulens')));
  assert.equal(JSON.parse(f.storage.get('menulens_measurement_consent_v1')).allowed, false);
});

test('expired and future-dated choices require consent again', () => {
  for (const time of [Date.now() - 91 * 86400000, Date.now() + 86400000]) {
    const f = fixture({ saved: true, time });
    assert.equal(f.scripts.length, 0);
    assert.equal(f.panel.hidden, false);
  }
});

test('GPC overrides saved acceptance and prevents tracking', () => {
  const f = fixture({ saved: true, gpc: true });
  f.accept.click();
  f.click();
  assert.equal(f.scripts.length, 0);
  assert.equal(f.events().length, 0);
});

test('blocked storage is safe and localhost/other paths never load Google', () => {
  const blocked = fixture({ blocked: true });
  blocked.accept.click();
  assert.equal(blocked.scripts.length, 1);
  for (const url of ['http://localhost:5199/menulens/', 'https://getesimmanager.com/', 'https://preview.example/menulens/']) {
    const f = fixture({ url, saved: true });
    f.click();
    assert.equal(f.scripts.length, 0);
  }
});

test('English pages have English controls and event language', () => {
  const f = fixture({ lang: 'en', saved: true });
  assert.match(f.panel.innerHTML, /Allow measurement/);
  f.click();
  assert.equal(f.events().find(e => e[1] === 'menulens_app_store_click')[2].site_language, 'en');
});

test('all six localized pages include consent code and style exactly once', () => {
  for (const language of ['', 'en/']) for (const page of ['index', 'support', 'privacy']) {
    const html = readFileSync(resolve(__dirname, `../menulens/${language}${page}.html`), 'utf8');
    assert.equal((html.match(/analytics\.js\?v=20261008/g) || []).length, 1);
    assert.equal((html.match(/analytics\.css\?v=20261008/g) || []).length, 1);
    assert.doesNotMatch(html, /googletagmanager\.com/);
  }
});
