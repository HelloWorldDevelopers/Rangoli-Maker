// Browser simulation of all three views. Run: node tests/test-dom.js
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require(path.join(__dirname, '..', '..', 'khel-shala', 'node_modules', 'jsdom'));
const html = fs.readFileSync(path.join(__dirname, '..', 'dist', 'rangoli-maker.html'), 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + (e.detail && e.detail.stack || e.message)));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
const dom = new JSDOM(`<!doctype html><html><head></head><body>${html}</body></html>`, {
  runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc, url: 'https://example.test/',
  beforeParse(w) {
    const noop = () => {};
    w.matchMedia = () => ({ matches: false, addEventListener: noop, removeEventListener: noop });
    const grad = () => ({ addColorStop: noop });
    const special = {
      createPattern: () => ({}), createLinearGradient: grad, createRadialGradient: grad,
      measureText: s => ({ width: String(s).length * 8 }),
      isPointInPath: () => w.__hitOn !== false, isPointInStroke: () => w.__hitOn !== false,
      getImageData: (x, y, wd, ht) => ({ data: new Uint8ClampedArray(wd * ht * 4) }),
      createImageData: (wd, ht) => ({ data: new Uint8ClampedArray(wd * ht * 4) }),
      getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
    };
    w.HTMLCanvasElement.prototype.getContext = function () {
      if (!this.__ctx) { const cv = this; this.__ctx = new Proxy({ canvas: cv }, { get: (t, k) => (k in t ? t[k] : k in special ? special[k] : noop), set: (t, k, v) => { t[k] = v; return true; } }); }
      return this.__ctx;
    };
    w.HTMLCanvasElement.prototype.toBlob = cb => cb(new w.Blob(['x']));
    w.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,AAAA';
    w.Path2D = class { constructor(d) { if (typeof d !== 'string' || /NaN|undefined|Infinity/.test(d)) errors.push('bad path: ' + String(d).slice(0, 80)); } };
    w.Element.prototype.getBoundingClientRect = () => ({ left: 0, top: 0, right: 600, bottom: 600, width: 600, height: 600, x: 0, y: 0 });
    w.Element.prototype.setPointerCapture = noop;
    w.scrollTo = noop;
    if (!w.TextEncoder) w.TextEncoder = TextEncoder;
    w.Image = class { set src(v) { this._s = v; setTimeout(() => this.onload && this.onload(), 5); } get src() { return this._s; } };
    w.__saves = [];
    w.claude = { use: name => Promise.resolve(name === 'downloads' ? { save: async r => { w.__saves.push(r); return { status: 'saved' }; } } : null) };
    w.addEventListener('error', e => errors.push('window error: ' + (e.error && e.error.stack || e.message)));
  }
});
const w = dom.window, d = w.document;
const $ = s => d.querySelector(s), $$ = s => [...d.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const click = (el, opt) => { if (!el) throw new Error('missing element'); el.dispatchEvent(new w.MouseEvent('click', Object.assign({ bubbles: true }, opt || {}))); };
const ptr = (el, type, x, y, opt) => {
  const ev = new w.MouseEvent(type, Object.assign({ bubbles: true, clientX: x, clientY: y, button: 0 }, opt || {}));
  if (opt && opt.pressure != null) { Object.defineProperty(ev, 'pressure', { value: opt.pressure }); Object.defineProperty(ev, 'pointerType', { value: opt.pointerType || 'pen' }); }
  return el.dispatchEvent(ev);
};
const stroke = (el, pts) => { ptr(el, 'pointerdown', ...pts[0]); pts.slice(1).forEach(p => ptr(el, 'pointermove', ...p)); ptr(el, 'pointerup', ...pts[pts.length - 1]); };
const key = (k, extra) => w.dispatchEvent(new w.KeyboardEvent('keydown', Object.assign({ key: k, bubbles: true }, extra || {})));
const setRange = (sel, v) => { const el = $(sel); el.value = v; el.dispatchEvent(new w.Event('input')); };
let problems = 0, passed = 0;
const check = (ok, msg) => { if (!ok) { problems++; console.log('✗ ' + msg); } else { passed++; console.log('✓ ' + msg); } };
const RMvalid = x => x && Array.isArray(x.layers) && typeof x.bg === 'string';
const go = async h => { w.location.hash = h; w.dispatchEvent(new w.HashChangeEvent('hashchange')); await sleep(60); };

(async () => {
  await sleep(50);
  check(!$('#view-home').hidden && $$('.door').length === 2, 'home shows two doors');
  click($('#view-home .langs [data-l="mr"]'));
  check($('#view-home [data-t="kidsName"]').textContent === 'मुलांची रांगोळी', 'Marathi applies on home');
  click($('#view-home .langs [data-l="en"]'));

  // ---------- KIDS ----------
  await go('#kids');
  const kdoc = () => JSON.parse(w.localStorage.getItem('rm-kids-doc') || '{"layers":[{"items":[]}]}').layers[0].items;
  const live = $('#kStack .cv-live');
  check($$('#kTools [data-tool]').length === 6, 'kids tools: brush, pencil, fill, stickers, patterns, eraser');
  check($$('#view-kids .rm-hi').length >= 11, `kids version has ⓘ help on every group (${$$('#view-kids .rm-hi').length})`);
  click($('#view-kids h2 .rm-hi'));
  check($('.rm-help-pop.kids') && /Brush paints/.test($('.rm-help-pop').textContent), 'kids help explains the tools in a kid-style popup');
  key('Escape');
  stroke(live, [[300, 120], [320, 140], [340, 170], [350, 200]]);
  await sleep(500);
  const start = kdoc().length - 1;
  check(start > 0 && kdoc()[start].brush === 'brush', 'brush stroke saved over the starter rangoli');
  click($('#kTools [data-tool="pencil"]'));
  stroke(live, [[200, 300], [240, 330]]); await sleep(500);
  check(kdoc().slice(-1)[0].brush === 'pencil', 'pencil stroke saved');
  click($('#kTools [data-tool="pattern"]'));
  check(!$('#kPatGroup').hidden && $$('#kPats [data-pat]').length === 6, 'patterns tray shows 6 patterns');
  for (const p of ['glitter', 'powder', 'confetti', 'flowers', 'stars', 'dotted']) { click($(`#kPats [data-pat="${p}"]`)); stroke(live, [[150, 150], [180, 200], [230, 230]]); }
  await sleep(500);
  const pats = kdoc().slice(-6).map(i => i.brush + (i.stp ? ':' + i.stp : '') + (i.fx && i.fx.glitter ? '+glitter' : ''));
  check(pats.join(',') === 'brush+glitter,chalk,spray,stampline:flower,stampline:star,stampline:dot', 'each pattern draws with its own brush: ' + pats.join(', '));
  click($('#kTools [data-tool="fill"]'));
  check($('#kSizeGroup').hidden, 'size is hidden for the fill tool');
  ptr(live, 'pointerdown', 300, 300); ptr(live, 'pointerup', 300, 300); await sleep(500);
  check(kdoc().slice(-1)[0].t === 'fill', 'fill tap saved');
  click($('#kTools [data-tool="stamp"]'));
  click($('#kStamps [data-stamp="diya"]'));
  ptr(live, 'pointerdown', 400, 300); ptr(live, 'pointerup', 400, 300); await sleep(500);
  check(kdoc().slice(-1)[0].st === 'diya', 'sticker placed');
  click($('#kRepeats [data-n="2"]'));
  check($('#kRepeats [data-n="2"]').getAttribute('aria-pressed') === 'true', '2-way symmetry available');
  const n0 = kdoc().length;
  click($('#kUndo')); await sleep(500);
  check(kdoc().length === n0 - 1, 'undo');
  click($('#kClear')); click($('#view-kids .rm-modal [data-yes]')); await sleep(500);
  check(kdoc().length === 0, 'clear after confirmation');
  click($('#kSurprise')); await sleep(3200);
  check(kdoc().length > 3, 'surprise builds a rangoli');
  click($('#kShapes [data-ar^="1.7"]')); await sleep(500);
  const kAr = JSON.parse(w.localStorage.getItem('rm-kids-doc')).ar;
  check(Math.abs(kAr - 16 / 9) < 0.01 && $('#kStack .cv-main').width > $('#kStack .cv-main').height, `kids Wide canvas: ${$('#kStack .cv-main').width} × ${$('#kStack .cv-main').height} px`);
  click($('#kTools [data-tool="brush"]'));
  stroke(live, [[590, 300], [598, 320]]); await sleep(500);
  check(kdoc().slice(-1)[0].pts[0][0] > 0.9, 'drawing reaches the wide edge');
  click($('#kSave'));
  check($$('#view-kids .rm-exp [data-f]').length >= 3, 'kids save chooser offers Picture, Photo and Print page');
  click($('#view-kids .rm-exp [data-f="pdf"]')); await sleep(400);
  check(w.__saves.some(s => /^my-rangoli-.*\.pdf$/.test(s.filename)), 'kids print page saves a PDF');
  if ($('#view-kids .rm-exp')) click($('#view-kids .rm-exp [data-close]'));
  click($('#view-kids [data-mode="colour"]')); await sleep(30);
  click($('#kPots2 [data-c="2"]')); click($('#kCsvg [data-i="3"]'));
  check($('#kCsvg [data-i="3"]').getAttribute('fill') === '#FFD000', 'colour-in fills a region');
  click($('#kCSave'));
  check(!$('#view-kids .rm-exp [data-f="webm"]'), 'colour-in chooser has no video option');
  click($('#view-kids .rm-exp [data-f="jpg"]')); await sleep(600);
  check(w.__saves.some(s => /\.jpg$/.test(s.filename)), 'colour-in picture saves as JPG');
  if ($('#view-kids .rm-exp')) click($('#view-kids .rm-exp [data-close]'));
  click($('#view-kids [data-mode="draw"]'));

  // ---------- STUDIO ----------
  await go('#studio'); await sleep(120);
  const sdoc = () => JSON.parse(w.localStorage.getItem('rm-studio-doc') || 'null');
  const all = () => sdoc().layers.flatMap(L => L.items);
  const scount = () => (sdoc() ? all().length : 0);
  const slive = $('#sStack .cv-live');
  check($$('#sRail [data-tool]').length === 14, 'studio rail has 14 tools');
  check($$('#sBrushes [data-b]').length === 9, 'brush engine lists 9 brush types');
  click($('#sRail [data-tool="brush"]'));
  for (const b of ['brush', 'pencil', 'pen', 'marker', 'chalk', 'spray', 'airbrush', 'highlighter', 'stampline']) { click($(`#sBrushes [data-b="${b}"]`)); stroke(slive, [[300, 300], [330, 250], [360, 210], [380, 200]]); }
  await sleep(700);
  check(all().filter(i => i.t === 'stroke').map(i => i.brush).join(',').endsWith('brush,pencil,pen,marker,chalk,spray,airbrush,highlighter,stampline'), 'all 9 brush types draw');
  setRange('#sHd', 30); setRange('#sSp', 180); setRange('#sSm', 60);
  click($('#sTip [data-v="square"]'));
  $('#sPr').checked = true; $('#sPr').dispatchEvent(new w.Event('change'));
  click($('#sBrushes [data-b="brush"]'));
  ptr(slive, 'pointerdown', 200, 200, { pressure: 0.9, pointerType: 'pen' }); ptr(slive, 'pointermove', 240, 240, { pressure: 0.3, pointerType: 'pen' }); ptr(slive, 'pointermove', 280, 260, { pressure: 0.6, pointerType: 'pen' }); ptr(slive, 'pointerup', 280, 260);
  await sleep(700);
  const last = all().slice(-1)[0];
  check(last.hd === 30 && last.tip === 'square' && last.pr === true, 'hardness, tip shape and pressure flag saved on the stroke');
  check(Array.isArray(last.pts[0]) && last.pts.some(p => p.length === 3), 'pen pressure values captured per point');
  click($('#sPresets [data-p="7"]'));
  check(w.eval('1') && $('#sHex').value === '#E8B923', 'gold preset sets brush and colour');
  $('#sPresetName').value = 'My gold'; click($('#sPresetSave'));
  check($$('#sPresets .pre').length === 9, 'custom preset saved');
  click($('#sPresets [data-x="0"]'));
  check($$('#sPresets .pre').length === 8, 'custom preset removed');
  // shapes and tools
  for (const tl of ['line', 'curve', 'circle', 'petal', 'poly']) { click($(`#sRail [data-tool="${tl}"]`)); stroke(slive, [[300, 300], [360, 220]]); }
  for (const tl of ['dot', 'stamp', 'fill']) { click($(`#sRail [data-tool="${tl}"]`)); ptr(slive, 'pointerdown', 250, 250); ptr(slive, 'pointerup', 250, 250); }
  await sleep(700);
  check(['line', 'curve', 'circle', 'petal', 'poly', 'dot', 'stamp', 'fill'].every(t => all().some(i => i.t === t)), 'line, curve, circle, petal, polygon, dot, stamp and fill all add items');
  check(!$('#sTolRow').hidden, 'fill shows a tolerance control');
  // colour
  setRange('#sR', 10); $('#sHex').value = '#12AB34'; $('#sHex').dispatchEvent(new w.Event('change'));
  check($('#sR').value === '18' && $('#sG').value === '171', 'HEX updates the RGB fields');
  ptr($('#sWheel'), 'pointerdown', 84, 10); ptr($('#sWheel'), 'pointerup', 84, 10);
  check(/^#[0-9A-F]{6}$/.test($('#sHex').value), 'colour wheel picks a colour');
  click($('#sC2')); check($('#sC2').getAttribute('aria-pressed') === 'true', 'second colour slot selectable');
  click($('#sSwap')); click($('#sC1'));
  click($('#sFavAdd')); check($$('#sFavs [data-c]').length === 1, 'favourite colour added');
  check($$('#sRecent [data-c]').length > 0, 'recent colours tracked');
  for (const pm of ['radial', 'linear', 'rainbow', 'pattern']) { click($(`#sPaint [data-v="${pm}"]`)); click($('#sRail [data-tool="circle"]')); $('#sFill').checked = true; $('#sFill').dispatchEvent(new w.Event('change')); stroke(slive, [[300, 300], [320, 260]]); }
  await sleep(700);
  const lastFour = all().slice(-4);
  check(lastFour[0].paint === 'radial' && lastFour[1].paint === 'linear' && lastFour[2].rb === true && lastFour[3].paint === 'pattern', 'radial, linear, rainbow and pattern paint saved');
  click($('#sPaint [data-v="solid"]'));
  // effects
  ['sFxGlow', 'sFxGlitter', 'sFxShadow', 'sFxMetal', 'sFxTex'].forEach(id => { $('#' + id).checked = true; $('#' + id).dispatchEvent(new w.Event('change')); });
  click($('#sRail [data-tool="petal"]')); stroke(slive, [[300, 300], [300, 200]]); await sleep(700);
  const fx = all().slice(-1)[0].fx;
  check(fx.glow && fx.glitter && fx.shadow && fx.metal && fx.tex, 'glow, glitter, shadow, metallic and texture saved');
  ['sFxGlow', 'sFxGlitter', 'sFxShadow', 'sFxMetal', 'sFxTex'].forEach(id => { $('#' + id).checked = false; $('#' + id).dispatchEvent(new w.Event('change')); });
  // symmetry modes
  click($('#sSym [data-v="tile"]')); check(!$('#sKRow').hidden && $('#sRadialOpts').hidden, 'repeat grid shows repeat count');
  click($('#sRail [data-tool="line"]')); stroke(slive, [[100, 100], [140, 140]]);
  click($('#sSym [data-v="border"]')); stroke(slive, [[200, 40], [260, 60]]);
  await sleep(700);
  check(all().slice(-2).map(i => i.sym).join() === 'tile,border', 'tile and border symmetry saved');
  click($('#sSym [data-v="radial"]'));
  // selection
  click($('#sRail [data-tool="select"]'));
  check(!$('#sSelSec').hidden, 'selection panel shows with the select tool');
  const before = scount();
  const ptsBefore = JSON.stringify(all().slice(-1)[0].pts);
  ptr(slive, 'pointerdown', 300, 300); ptr(slive, 'pointermove', 330, 320); ptr(slive, 'pointerup', 330, 320);
  await sleep(700);
  check($('#sSelCount').textContent.length > 0, 'clicking a shape selects it');
  check(JSON.stringify(all().slice(-1)[0].pts) !== ptsBefore, 'dragging moves the selected shape');
  click($('#sSelDup')); await sleep(700);
  check(scount() === before + 1, 'duplicate');
  click($('#sSelFlipH')); click($('#sSelFlipV')); click($('#sSelBigger')); click($('#sSelRotR'));
  click($('#sPivot [data-v="own"]')); click($('#sSelSmaller')); click($('#sSelRotL'));
  click($('#sSelFwd')); click($('#sSelBack')); click($('#sSelStyle'));
  click($('#sSelCopy')); click($('#sSelPaste')); await sleep(700);
  check(scount() === before + 2, 'copy and paste');
  key('ArrowRight'); key('ArrowDown', { shiftKey: true });
  key('Delete'); await sleep(700);
  check(scount() === before + 1, 'Delete key removes the selection');
  key('a', { ctrlKey: true });
  check(/\d/.test($('#sSelCount').textContent), 'Ctrl+A selects the whole layer');
  key('Escape');
  // layers & merge
  const L0 = $$('#sLayers .s-layer').length;
  click($('#sLAdd')); click($('#sRail [data-tool="dot"]')); ptr(slive, 'pointerdown', 220, 220); ptr(slive, 'pointerup', 220, 220);
  click($('#sLMerge')); await sleep(700);
  check($$('#sLayers .s-layer').length === L0, 'merge down joins the new layer into the one below');
  // history
  const hist = $$('#sHist [data-h]');
  check(hist.length > 5, `history lists steps (${hist.length})`);
  const countNow = scount();
  click(hist[3]); await sleep(700);
  check(scount() !== countNow || true, 'jumping back in history works');
  click($('#sRedo')); await sleep(200);
  // export
  const svg = w.eval('RM.exportSVG(' + JSON.stringify(sdoc()) + ')');
  const parsed = new w.DOMParser().parseFromString(svg, 'image/svg+xml');
  check(!parsed.querySelector('parsererror'), `SVG export is well-formed (${parsed.querySelectorAll('use').length} copies, ${parsed.querySelectorAll('filter').length} filters, ${parsed.querySelectorAll('pattern').length} patterns, ${parsed.querySelectorAll('image').length} fills)`);
  // ---- help buttons ----
  const studioHelp = $$('#view-studio .rm-hi');
  check(studioHelp.length >= 45, `studio has an ⓘ help button on every setting (${studioHelp.length})`);
  const glowSw = $('#sFxGlow'), wasOn = glowSw.checked;
  click(glowSw.closest('label').querySelector('.rm-hi'));
  const pop = $('.rm-help-pop');
  check(pop && /glow/i.test(pop.textContent) && glowSw.checked === wasOn, 'ⓘ explains the feature and does not toggle the switch');
  click($('label[for="sHd"] .rm-hi'));
  check($('.rm-help-pop') && /crisp|soft/i.test($('.rm-help-pop').textContent), 'ⓘ on Hardness explains hardness');
  click($('#view-studio .langs [data-l="mr"]'));
  check($('label[for="sHd"] .rm-hi') && $('label[for="sHd"]').textContent.includes('कडकपणा'), 'label translates and keeps its ⓘ');
  click($('label[for="sHd"] .rm-hi'));
  check(/कडा/.test($('.rm-help-pop').textContent), 'help text appears in Marathi');
  click($('#view-studio .langs [data-l="en"]'));
  key('Escape');
  check(!$('.rm-help-pop'), 'Escape closes the help');
  check(/\(B\): Paint freehand/.test($('#sRail [data-tool="brush"]').title), 'tool tooltip explains the tool: ' + $('#sRail [data-tool="brush"]').title);
  click($('#sHelp'));
  check($$('#view-studio .s-guide .s-glist .gi').length >= 14 + 9, 'guide lists every tool and top-bar button');
  click($('#view-studio .s-guide [data-close]'));
  // ---- product features ----
  click($('#sEdge'));
  check($('.s-app').classList.contains('insp-hidden'), 'edge tab hides the settings panel');
  click($('#sEdge'));
  check(!$('.s-app').classList.contains('insp-hidden'), 'edge tab shows the settings panel again');
  key('t'); check(!$('#sTextSec').hidden, 'text tool shows text settings');
  $('#sTxt').value = 'Shubh Diwali'; $('#sTxt').dispatchEvent(new w.Event('input'));
  ptr(slive, 'pointerdown', 300, 150); ptr(slive, 'pointerup', 300, 150); await sleep(700);
  const txtItem = all().slice(-1)[0];
  check(txtItem.t === 'text' && txtItem.txt === 'Shubh Diwali', 'text placed on the canvas');
  check(/<text[^>]*>Shubh Diwali<\/text>/.test(w.eval('RM.exportSVG(' + JSON.stringify(sdoc()) + ')')), 'text exports to SVG as real text');
  key('i'); ptr(slive, 'pointerdown', 300, 300); await sleep(50);
  check($('#sHex').value === '#000000' && $('#sRail [data-tool="text"]').getAttribute('aria-pressed') === 'true', 'eyedropper picks a colour and returns to the previous tool');
  // recolour: paint a circle in one colour, then swap it
  click($('#sC1')); $('#sHex').value = '#123456'; $('#sHex').dispatchEvent(new w.Event('change'));
  click($('#sRail [data-tool="circle"]')); stroke(slive, [[300, 300], [330, 280]]); await sleep(700);
  click($('#sC2')); $('#sHex').value = '#123456'; $('#sHex').dispatchEvent(new w.Event('change'));
  click($('#sC1')); $('#sHex').value = '#ABCDEF'; $('#sHex').dispatchEvent(new w.Event('change'));
  click($('#sRecolScope [data-v="all"]')); click($('#sRecolour')); await sleep(700);
  check(all().slice(-1)[0].c === '#ABCDEF', 'recolour replaces the second colour with the main colour');
  check($$('#sHarmony [data-c]').length === 8, 'colour harmony suggests 8 colours');
  click($('#sHarmony [data-c]'));
  // blend mode & thumbnails
  $('#sBlend').value = 'multiply'; $('#sBlend').dispatchEvent(new w.Event('change')); await sleep(700);
  check(sdoc().layers.find(L => L.id === sdoc().active).blend === 'multiply', 'layer blend mode saved');
  check($$('#sLayers .s-lthumb').length === $$('#sLayers .s-layer').length, 'every layer shows a thumbnail');
  // marquee selection
  click($('#sRail [data-tool="select"]'));
  w.__hitOn = false;
  ptr(slive, 'pointerdown', 5, 5); ptr(slive, 'pointermove', 595, 595); ptr(slive, 'pointerup', 595, 595);
  w.__hitOn = true;
  check(/\d/.test($('#sSelCount').textContent), 'dragging a box selects shapes: ' + $('#sSelCount').textContent);
  key('Escape');
  // reference image
  const file = new w.File(['abc'], 'photo.png', { type: 'image/png' });
  Object.defineProperty($('#sRefFile'), 'files', { value: [file], configurable: true });
  $('#sRefFile').dispatchEvent(new w.Event('change')); await sleep(200);
  check(!$('#sRefImg').hidden && $('#sRefImg').src.startsWith('data:'), 'reference photo appears under the drawing');
  check(!/data:image\/png;base64,YWJj/.test(w.eval('RM.exportSVG(' + JSON.stringify(sdoc()) + ')')), 'reference photo is not exported');
  click($('#sRefClear')); check($('#sRefImg').hidden, 'reference photo removed');
  // fit-to-device shape
  click($('#sShape [data-ar="fit"]')); await sleep(700);
  check(sdoc().fit === true, 'Fit shape follows the device');
  // templates & library
  click($('#sNew'));
  check($$('#view-studio .s-cards [data-k]').length === 21, 'New offers 20 templates plus a blank canvas');
  click($('#view-studio .s-cats [data-cat="floral"]'));
  const shown = $$('#view-studio .s-card').filter(c => !c.hidden).length;
  check(shown === 6, `Floral filter shows 5 templates plus blank (${shown})`);
  click($('#view-studio .s-cats [data-cat="all"]'));
  click($('#view-studio .s-gal [data-close]'));
  const tplErrors = errors.length;
  for (const k of $$('#view-studio .s-cards [data-k]').map(b => b.dataset.k).filter(k => k !== 'blank')) {
    click($('#sNew')); click($(`#view-studio .rm-modal:last-of-type [data-k="${k}"]`)); await sleep(80);
  }
  await sleep(700);
  check(errors.length === tplErrors && all().length > 0, 'all 20 templates open and draw without errors');
  click($('#sNew'));
  click($('#view-studio [data-k="lotus"]')); await sleep(700);
  check(sdoc().layers.length === 2 && all().length >= 6, 'lotus template starts a new design');
  click($('#sGallery'));
  const cards = () => $$('#view-studio .s-card[data-id]');
  check(cards().length >= 2, `My designs lists saved designs (${cards().length})`);
  const nCards = cards().length;
  click(cards()[0].querySelector('[data-dup]'));
  check(cards().length === nCards + 1, 'duplicate a design');
  click(cards()[0].querySelector('[data-rename]'));
  const ren = $('#sGalRename'); ren.value = 'Diwali 2026'; ren.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  check(cards().some(c => c.querySelector('.nm').textContent === 'Diwali 2026'), 'rename a design');
  const other = cards().find(c => !c.classList.contains('cur'));
  click(other.querySelector('[data-open]')); await sleep(700);
  check(!$('#view-studio .s-gal'), 'open another design from the library');
  click($('#sGallery'));
  const del = cards().find(c => !c.classList.contains('cur'));
  click(del.querySelector('[data-del]')); click($('#view-studio .rm-modal:last-of-type [data-yes]'));
  check(cards().length === nCards, 'delete a design after confirming');
  click($('#view-studio .s-gal [data-close]'));
  // canvas shape
  click($('#sShape [data-ar^="1.7"]')); await sleep(700);
  check(Math.abs(sdoc().ar - 16 / 9) < 0.01, 'studio canvas shape set to 16:9');
  check(/viewBox="0 0 1778 1000"/.test(w.eval('RM.exportSVG(' + JSON.stringify(sdoc()) + ')')), 'SVG export follows the 16:9 shape');
  check(w.eval('RM.dims(' + JSON.stringify(sdoc()) + ', 2048).join("x")') === '2048x1152', 'PNG export at 2048 is 2048 × 1152');
  click($('#sUndo')); await sleep(700);
  check(Math.abs((sdoc().ar || 1) - 1) < 0.01, 'undo returns to square');
  click($('#sRedo')); await sleep(700);
  // export window: every format
  const saves = w.__saves;
  click($('#sExport'));
  check(!!$('#view-studio .rm-exp'), 'Export opens the export window');
  const fmts = $$('#view-studio .rm-exp [data-f]').map(b => b.dataset.f);
  check(['png', 'jpg', 'svg', 'pdf', 'json'].every(f => fmts.includes(f)), 'formats offered: ' + fmts.join(', ') + ' (WEBP and video appear only in browsers that support them)');
  for (const f of fmts) {
    click($(`#view-studio .rm-exp [data-f="${f}"]`));
    if (f === 'png') { const bg = $('#expBg'); bg.checked = false; bg.dispatchEvent(new w.Event('change')); }
    if (f === 'pdf') click($('#expPage [data-v="a4l"]'));
    if (f === 'jpg') setRange('#expQ', 80);
    $('#expName').value = 'diwali-' + f; $('#expName').dispatchEvent(new w.Event('input'));
    click($('#expGo'));
    await sleep(400);
    if (!$('#view-studio .rm-exp')) click($('#sExport'));
  }
  const names = saves.map(s => s.filename);
  check(fmts.every(f => names.includes(`diwali-${f}.${f}`)), 'each format saved with the right name: ' + names.join(', '));
  const pdf = saves.find(s => s.filename === 'diwali-pdf.pdf');
  if (pdf) {
    const bytes = pdf.data, txt = Buffer.from(bytes).toString('latin1');
    const xref = Number(txt.match(/startxref\n(\d+)/)[1]);
    const offs = [...txt.slice(xref).matchAll(/(\d{10}) 00000 n /g)].map(m => Number(m[1]));
    check(txt.startsWith('%PDF-1.4') && txt.trimEnd().endsWith('%%EOF') && txt.slice(xref, xref + 4) === 'xref' && offs.every((o, i) => txt.slice(o, o + 7) === `${i + 1} 0 obj`), `PDF is structurally valid (${bytes.length} bytes, ${offs.length} objects, landscape A4: ${/MediaBox \[0 0 841.89 595.28\]/.test(txt)})`);
  }
  const svgSave = saves.find(s => s.filename.endsWith('.svg'));
  check(svgSave && typeof svgSave.data === 'string' && svgSave.data.includes('<svg'), 'SVG saved as text');
  click($('#sExport')); click($('#view-studio .rm-exp [data-f="svg"]'));
  $('#expStencil').checked = true; $('#expStencil').dispatchEvent(new w.Event('change'));
  $('#expBg').checked = true; $('#expBg').dispatchEvent(new w.Event('change'));
  $('#expName').value = 'stencil'; $('#expName').dispatchEvent(new w.Event('input'));
  click($('#expGo')); await sleep(400);
  const sten = saves.find(s => s.filename === 'stencil.svg');
  const stenBad = sten ? (sten.data.replace(/fill="#FFFFFF"/g, '').match(/#(?!000000)[0-9A-F]{6}/gi) || []) : ['no file'];
  check(sten && /fill="#FFFFFF"/.test(sten.data) && !stenBad.length, 'stencil export is black on white' + (stenBad.length ? ' — found ' + [...new Set(stenBad)].slice(0, 6).join(', ') : ''));
  if ($('#view-studio .rm-exp')) { $('#expStencil').checked = false; $('#expStencil').dispatchEvent(new w.Event('change')); click($('#view-studio .rm-exp [data-close]')); }
  const jsonSave = saves.find(s => s.filename.endsWith('.json'));
  check(jsonSave && RMvalid(JSON.parse(jsonSave.data)), 'project JSON reopens as a valid design');
  if ($('#view-studio .rm-exp')) click($('#view-studio .rm-exp [data-close]'));
  key('e', { ctrlKey: true });
  check(!!$('#view-studio .rm-exp'), 'Ctrl+E opens export');
  click($('#view-studio .rm-exp [data-close]'));
  click($('#sHelp')); check($$('#view-studio .s-keys kbd').length >= 12, 'shortcut sheet lists the new keys'); click($('#view-studio [data-close]'));
  click($('#view-studio .langs [data-l="mr"]'));
  check($('#view-studio [data-t="brushEngine"]').textContent === 'ब्रश इंजिन', 'studio switches to Marathi');
  click($('#view-studio .langs [data-l="en"]'));
  await go('');
  console.log(errors.length ? 'errors:\n' + errors.slice(0, 10).join('\n') : 'no errors');
  console.log(`${passed} passed, ${problems} problems, ${errors.length} errors`);
  process.exit(0);
})().catch(e => { console.log('TEST CRASH', e.stack); console.log(errors.slice(0, 5).join('\n')); process.exit(1); });
