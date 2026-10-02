// Opened as a plain file (no Claude viewer): export must fall back to a normal browser download
const fs = require('fs');
const path = require('path');
const { JSDOM } = require(path.join(__dirname, '..', '..', 'khel-shala', 'node_modules', 'jsdom'));
const html = fs.readFileSync(path.join(__dirname, '..', 'rangoli-maker.html'), 'utf8');
const dom = new JSDOM(html, {
  runScripts: 'dangerously', pretendToBeVisual: true, url: 'file:///D:/New%20folder/rangoli-maker/rangoli-maker.html',
  beforeParse(w) {
    const noop = () => {};
    w.matchMedia = () => ({ matches: false, addEventListener: noop, removeEventListener: noop });
    const ctx = new Proxy({}, { get: (t, k) => (k in t ? t[k] : ['createLinearGradient', 'createRadialGradient'].includes(k) ? () => ({ addColorStop: noop }) : k === 'createPattern' ? () => ({}) : noop), set: (t, k, v) => { t[k] = v; return true; } });
    w.HTMLCanvasElement.prototype.getContext = () => ctx;
    w.HTMLCanvasElement.prototype.toBlob = cb => cb(new w.Blob(['x']));
    w.Path2D = class {};
    w.Element.prototype.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 600, right: 600, bottom: 600 });
    w.scrollTo = noop;
    w.URL.createObjectURL = () => 'blob:test'; w.URL.revokeObjectURL = noop;
    w.__downloads = [];
    w.HTMLAnchorElement.prototype.click = function () { w.__downloads.push(this.download); };
  }
});
const w = dom.window, d = w.document;
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
setTimeout(async () => {
  w.location.hash = '#studio'; w.dispatchEvent(new w.HashChangeEvent('hashchange'));
  await new Promise(r => setTimeout(r, 150));
  click(d.querySelector('#sExport'));
  const note = d.querySelector('#view-studio .rm-exp .exp-note');
  const go = d.querySelector('#expGo');
  console.log((note.hidden ? '✓' : '✗') + ' no "not available" message when opened from disk');
  console.log((!go.disabled ? '✓' : '✗') + ' Export button is enabled');
  click(d.querySelector('[data-f="svg"]'));
  click(go);
  await new Promise(r => setTimeout(r, 300));
  console.log((w.__downloads.some(n => /\.svg$/.test(n)) ? '✓' : '✗') + ' browser download started: ' + w.__downloads.join(', '));
  console.log((d.documentElement.classList.contains('can-save') ? '✓' : '✗') + ' Save project button is shown');
  process.exit(0);
}, 100);
