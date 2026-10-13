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
    assert.match(homepage, /consent|同意/);
    assert.match(homepage, /id6815122498/);
    assert.match(homepage, /privacy\.html/);
    assert.match(help, /privacy\.html/);
    assert.match(policy, /Google/);
    assert.equal((homepage.match(/<figure class="screenshot/g) || []).length, 4);
  });
}
