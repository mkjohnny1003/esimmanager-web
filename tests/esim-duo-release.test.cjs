const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const { resolve, dirname } = require('node:path');
const { test } = require('node:test');
const root = resolve(__dirname, '..');
const locales = { '': 'zh-TW', en: 'en', 'zh-cn': 'zh-CN', ja: 'ja', ko: 'ko', fr: 'fr', de: 'de', es: 'es' };

for (const [folder, lang] of Object.entries(locales)) {
  const path = resolve(root, folder, 'index.html');
  const html = readFileSync(path, 'utf8');
  test(`${lang}: live 2.3 Duo copy, real images, no unreleased version`, () => {
    // Other apps have independent version numbers in recommendation cards.
    const text = html.replace(/<article class="sister-app-card">[\s\S]*?<\/article>/g, '').replace(/<[^>]*>/g, '');
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    assert.match(html, /class="hero-badge">\s*<span>iOS 2\.3/);
    assert.match(html, /<h1>[\s\S]*?iPhone Duo[\s\S]*?<\/h1>/);
    assert.match(html, /class="hero-duo-link" href="#ios-23"/);
    assert.match(html, /class="hero-duo-screen"/);
    assert.doesNotMatch(html, /class="float-card /);
    assert.doesNotMatch(text, /2\.2|2\.3\.1|base44/i);
    assert.match(html, /id="ios-23" aria-labelledby="duo-title"/);
    const section = html.match(/<section class="duo-release"[\s\S]*?<\/section>/)[0];
    assert.equal((section.match(/class="duo-benefit"/g) || []).length, 3);
    for (const image of ['duo-inner-light.png', 'duo-inner-dark.png', 'duo-outer-detail.png']) {
      assert.ok(section.includes(image));
      assert.ok(existsSync(resolve(root, 'assets/v2_3', image)));
    }
    assert.match(section, /class="duo-caption">[^<]+/);
    assert.match(section, /class="duo-note">[^<]+/);
    assert.match(html, /assets\/duo-release\.css\?v=20261104/);
  });
  test(`${lang}: static language navigation, download and tracking preserved`, () => {
    for (const value of Object.values(locales)) assert.match(html, new RegExp(`<option value="${value}"(?: selected)?>`));
    assert.match(html, /site-language-router-v2\.js/);
    assert.match(html, /https:\/\/apps\.apple\.com\/app\/id6800212290/);
    assert.match(html, /https:\/\/play\.google\.com\/apps\/testing\/com\.mkjohnny\.esimmanager/);
    assert.match(html, /G-KJB54JTM44/);
    assert.match(html, /ca-pub-2607309542240072/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
    for (const match of html.matchAll(/(?:src|href)="([^"]*assets\/v2_3\/[^"]+|[^"]*assets\/duo-release\.css[^\"]*)"/g)) {
      assert.ok(existsSync(resolve(dirname(path), match[1].split('?')[0])), match[1]);
    }
  });
}

test('Duo images remain uncropped and the layout stacks on phones', () => {
  const css = readFileSync(resolve(root, 'assets/duo-release.css'), 'utf8');
  assert.match(css, /object-fit: contain/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i, 'Reuse the existing palette');
});
