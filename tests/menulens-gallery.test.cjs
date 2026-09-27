const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const source = readFileSync(resolve(__dirname, '../menulens/gallery.js'), 'utf8');

function fixture(width, mobile = false) {
  const previous = { addEventListener(name, action) { this[name] = action; } };
  const next = { addEventListener(name, action) { this[name] = action; } };
  const controls = { hidden: true };
  const gap = mobile ? 16 : 24;
  const widths = [mobile ? 220 : 240, mobile ? 220 : 240,
    Math.min(width, mobile ? width : 720), mobile ? 220 : 240];
  let offset = 0;
  const slides = widths.map((slideWidth) => {
    const start = offset;
    offset += slideWidth + gap;
    return { start, width: slideWidth,
      getBoundingClientRect: () => ({ left: 20 + start - track.scrollLeft }) };
  });
  const track = {
    scrollLeft: 0, scrollWidth: offset - gap, clientWidth: width,
    getBoundingClientRect: () => ({ left: 20 }),
    querySelectorAll: () => slides,
    scrollTo({ left }) { this.scrollLeft = left; this.scroll?.(); },
    addEventListener(name, action) { this[name] = action; },
  };
  const elements = { '.screenshot-track': track, '.screenshot-controls': controls,
    '[data-gallery-prev]': previous, '[data-gallery-next]': next };
  let resize;
  runInNewContext(source, {
    document: { querySelectorAll: () => [{ querySelector: (selector) => elements[selector] }] },
    ResizeObserver: class { constructor(action) { resize = action; } observe() {} },
  });
  return { track, controls, previous, next, slides, resize };
}

for (const [width, mobile] of [[904, false], [350, true], [280, true]]) {
  test(`arrows reveal the entire landscape image at ${width}px`, () => {
    const { track, controls, previous, next, slides } = fixture(width, mobile);
    assert.equal(controls.hidden, false);
    assert.equal(previous.disabled, true);
    assert.equal(next.disabled, false);
    next.click();
    next.click();
    const landscape = slides[2];
    assert.ok(landscape.start >= track.scrollLeft);
    assert.ok(landscape.start + landscape.width <= track.scrollLeft + width);
    next.click();
    assert.equal(track.scrollLeft, track.scrollWidth - width);
    assert.equal(next.disabled, true);
    assert.equal(previous.disabled, false);
    next.click();
    assert.equal(track.scrollLeft, track.scrollWidth - width);
    previous.click();
    previous.click();
    previous.click();
    assert.equal(track.scrollLeft, 0);
    assert.equal(previous.disabled, true);
  });
}

test('native scrolling updates controls and arrow destinations', () => {
  const { track, next, previous, slides } = fixture(350, true);
  track.scrollLeft = 100;
  track.scroll();
  assert.equal(previous.disabled, false);
  next.click();
  assert.equal(track.scrollLeft, slides[1].start);
  track.scrollLeft = track.scrollWidth - track.clientWidth;
  track.scroll();
  assert.equal(next.disabled, true);
});

test('keyboard navigation stays scoped to the gallery container', () => {
  const { track, slides } = fixture(904);
  let prevented = false;
  track.keydown({ target: track, key: 'ArrowRight', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(track.scrollLeft, slides[1].start);
  track.keydown({ target: {}, key: 'ArrowLeft', preventDefault() { assert.fail(); } });
  assert.equal(track.scrollLeft, slides[1].start);
});

test('resize updates boundaries and fully fitting galleries disable both arrows', () => {
  const { track, resize, previous, next } = fixture(904);
  track.clientWidth = track.scrollWidth;
  resize();
  assert.equal(previous.disabled, true);
  assert.equal(next.disabled, true);
});
