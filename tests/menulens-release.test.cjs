const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');

function page(path) {
  return readFileSync(resolve(__dirname, '../menulens', path), 'utf8');
}

for (const [locale, home, support, privacy, comparison, provider] of [
  ['zh-Hant', 'index.html', 'support.html', 'privacy.html', '購物比價', 'Google 智慧鏡頭'],
  ['en', 'en/index.html', 'en/support.html', 'en/privacy.html', 'Shopping comparison', 'Google Lens'],
]) {
  test(`${locale} release pages describe the live 2.1 modes and privacy`, () => {
    const homepage = page(home);
    const help = page(support);
    const policy = page(privacy);

    for (const content of [homepage, help, policy]) {
      assert.match(content, /Version 2\.1|2\.1 已於 App Store 上線/);
      assert.doesNotMatch(content, /Version 2\.0|MenuLens 2\.0/);
    }
    assert.ok(homepage.includes(comparison));
    assert.ok(homepage.includes(provider));
    assert.match(homepage, /class="feature-alert"[\s\S]*?<h2 id="shopping-launch-heading">[^<]+<small>[^<]+<\/small><\/h2>/);
    assert.match(homepage, /class="feature-alert"[\s\S]*?class="download-link" href="https:\/\/apps\.apple\.com/);
    assert.match(homepage, /consent|同意/);
    assert.match(homepage, /id6815122498/);
    assert.match(homepage, /privacy\.html/);
    assert.match(help, /privacy\.html/);
    assert.match(policy, /Google/);
    assert.equal((homepage.match(/<figure class="screenshot/g) || []).length, 4);
  });
}

test('shopping announcement keeps the experimental label visually secondary', () => {
  const style = page('style.css');
  assert.match(style, /\.feature-alert h2\{[^}]*font-size:42px/);
  assert.match(style, /\.feature-alert h2 small\{[^}]*font-size:14px/);
});

test('both site homepages promote MenuLens shopping comparison', () => {
  for (const [path, label] of [
    ['index.html', '新增購物比價'],
    ['en/index.html', 'New: Shopping comparison'],
  ]) {
    const homepage = readFileSync(resolve(__dirname, '..', path), 'utf8');
    assert.match(homepage, new RegExp(`<h2>MenuLens<\\/h2>[\\s\\S]*?${label}`));
    assert.match(homepage, /https:\/\/getesimmanager\.com\/menulens\//);
  }
});
