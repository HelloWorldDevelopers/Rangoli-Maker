/* =====================================================================
   Rangoli for Kids
   Brush · Pencil · Fill · Stickers · Patterns · Eraser · Colours · Undo · Clear · Save
   ===================================================================== */
RM.addStrings({
  kidsName: ['Rangoli for Kids', 'बच्चों की रंगोली', 'मुलांची रांगोळी'],
  home: ['Home', 'होम', 'मुख्य पान'],
  modeDraw: ['Draw', 'बनाओ', 'काढूया'],
  modeColour: ['Colour in', 'रंग भरो', 'रंग भरा'],
  colours: ['Colours', 'रंग', 'रंग'],
  rainbowPot: ['Rainbow', 'इंद्रधनुष', 'इंद्रधनुष्य'],
  tools: ['Tools', 'औज़ार', 'साधनं'],
  brush: ['Brush', 'ब्रश', 'ब्रश'], pencil: ['Pencil', 'पेंसिल', 'पेन्सिल'], fillTool: ['Fill', 'रंग भरो', 'रंग भर'], stickers: ['Stickers', 'स्टिकर', 'स्टिकर'], patterns: ['Patterns', 'पैटर्न', 'नक्षी'], eraser: ['Eraser', 'रबर', 'खोडरबर'],
  pt_glitter: ['Glitter', 'चमकी', 'चमकी'], pt_powder: ['Powder', 'पाउडर', 'रांगोळी पूड'], pt_confetti: ['Confetti', 'कंफ़ेटी', 'रंगीत ठिपके'], pt_flowers: ['Flowers', 'फूल', 'फुलं'], pt_stars: ['Stars', 'तारे', 'चांदण्या'], pt_dotted: ['Dots', 'बिंदियाँ', 'ठिपके'],
  size: ['Size', 'आकार', 'आकार'], small: ['Small', 'छोटा', 'लहान'], medium: ['Medium', 'मध्यम', 'मध्यम'], big: ['Big', 'बड़ा', 'मोठा'],
  repeats: ['Repeats', 'कितनी बार', 'किती वेळा'],
  mirror: ['Mirror', 'दर्पण', 'आरसा'],
  dotGuide: ['Dot guide', 'बिंदु मदद', 'ठिपके'],
  floor: ['Floor', 'ज़मीन', 'जमीन'], kShape: ['Canvas', 'कैनवास', 'कॅनव्हास'], shSquare: ['Square', 'चौकोर', 'चौरस'], shWide: ['Wide', 'चौड़ा', 'रुंद'], shFit: ['Fit screen', 'पूरी स्क्रीन', 'पूर्ण स्क्रीन'],
  fl_night: ['Night', 'रात', 'रात्र'], fl_clay: ['Red clay', 'लाल मिट्टी', 'लाल माती'], fl_marble: ['Marble', 'संगमरमर', 'संगमरवर'], fl_leaf: ['Green', 'हरा', 'हिरवा'],
  undo: ['Undo', 'वापस', 'मागे'], clear: ['Clear', 'मिटाओ', 'पुसा'], surprise: ['Surprise me', 'सरप्राइज़!', 'सरप्राईज!'], savePic: ['Save picture', 'चित्र सहेजो', 'चित्र जतन कर'],
  clearAsk: ['Clear your whole rangoli?', 'पूरी रंगोली मिटा दें?', 'पूर्ण रांगोळी पुसायची?'], yesClear: ['Yes, clear it', 'हाँ, मिटाओ', 'हो, पुसा'], noKeep: ['No, keep it', 'नहीं, रहने दो', 'नको, राहू दे'],
  tada: ['Ta-da! A surprise rangoli!', 'वाह! सरप्राइज़ रंगोली!', 'वा! सरप्राईज रांगोळी!'],
  saved: ['Picture saved!', 'चित्र सहेज लिया!', 'चित्र जतन झालं!'], notSaved: ['The picture was not saved.', 'चित्र सहेजा नहीं गया।', 'चित्र जतन झालं नाही.'],
  clearColours: ['Start over', 'फिर से शुरू', 'पुन्हा सुरू'], designs: ['Designs', 'डिज़ाइन', 'नक्षी'],
  colourHint: ['Pick a colour pot, then tap a shape to fill it', 'रंग चुनो, फिर किसी आकार पर दबाओ', 'रंग निवड, मग एखाद्या आकारावर दाब'],
  drawHint: ['Draw with your finger. Everything repeats around the middle!', 'उँगली से बनाओ। सब कुछ बीच के चारों ओर दोहराएगा!', 'बोटाने काढ. सगळं मध्याभोवती पुन्हा उमटेल!'],
  fillHint: ['Tap inside a shape to fill it with colour!', 'आकार के अंदर दबाओ और रंग भर जाएगा!', 'आकाराच्या आत दाब, रंग भरेल!'],
  st_flower: ['Flower', 'फूल', 'फूल'], st_star: ['Star', 'तारा', 'चांदणी'], st_leaf: ['Leaf', 'पत्ता', 'पान'], st_diya: ['Diya', 'दीया', 'पणती'], st_heart: ['Heart', 'दिल', 'बदाम'], st_paisley: ['Mango', 'कैरी', 'कोयरी'], st_dot: ['Dot', 'बिंदी', 'ठिपका'],
  soundOn: ['Sound on', 'आवाज़ चालू', 'आवाज चालू'], soundOff: ['Sound off', 'आवाज़ बंद', 'आवाज बंद'],
  tp_lotus: ['Lotus', 'कमल', 'कमळ'], tp_star: ['Star', 'तारा', 'तारा'], tp_diya: ['Diya flower', 'दीया फूल', 'पणतीचं फूल']
});

const Kids = (() => {
  const PAL = ['#F0353D', '#FF8A00', '#FFD000', '#2DBE60', '#00B4C5', '#2F6BFF', '#8E44FF', '#FF4FA3', '#FFFFFF'];
  const FLOORS = [{ id: 'night', c: '#1E1838' }, { id: 'clay', c: '#A8482B' }, { id: 'marble', c: '#F3EEE6' }, { id: 'leaf', c: '#1D5A47' }];
  const BRUSH = [8, 18, 34], STAMP = [0.045, 0.075, 0.11], ERASE = [30, 56, 92];
  const TOOLS = [['brush', 'brush', 'brush'], ['pencil', 'pencil', 'pencil'], ['fill', 'bucket', 'fillTool'], ['stamp', 'stamp', 'stickers'], ['pattern', 'pattern', 'patterns'], ['eraser', 'eraser', 'eraser']];
  const PATS = {
    glitter: { brush: 'brush', fx: { glitter: true, glow: true } },
    powder: { brush: 'chalk' },
    confetti: { brush: 'spray', rb: true },
    flowers: { brush: 'stampline', stp: 'flower' },
    stars: { brush: 'stampline', stp: 'star' },
    dotted: { brush: 'stampline', stp: 'dot', sp: 210 }
  };
  const $ = s => document.querySelector(s);
  let ready = false, R, doc, hist = [], drawing = null, busy = false, saveTimer = null;
  const P = Object.assign({ mode: 'draw', tool: 'brush', color: 0, rainbow: false, size: 1, n: 8, mirror: true, stamp: 'flower', pat: 'glitter', dots: false }, RM.store.get('rm-kids-prefs', {}));
  const savePrefs = () => RM.store.set('rm-kids-prefs', P);
  const layer = () => doc.layers[0];
  const colour = () => (P.rainbow ? '#FFFFFF' : PAL[P.color] || PAL[0]);
  const saveDoc = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => RM.store.set('rm-kids-doc', doc), 400); };
  const snapshot = () => { hist.push(JSON.stringify(layer().items)); if (hist.length > 40) hist.shift(); };

  function loadDoc() {
    const d = RM.store.get('rm-kids-doc', null);
    if (RM.validDoc(d) && d.layers.length) return RM.migrate(d);
    const fresh = RM.newDoc(FLOORS[0].c, 'Rangoli');
    fresh.tex = true; fresh.fit = true;
    fresh.layers[0].items = RM.surprise(2024, PAL.slice(0, 8), { glow: true }).items;
    return fresh;
  }

  /* ---------- controls ---------- */
  const flowerIcon = n => { let d = ''; for (let k = 0; k < n; k++) { const a = (k * 2 * Math.PI) / n - Math.PI / 2; d += RM.petalPath([Math.cos(a) * 2, Math.sin(a) * 2], [Math.cos(a) * 10, Math.sin(a) * 10], n > 6 ? 0.4 : 0.5); } return `<svg viewBox="-12 -12 24 24" aria-hidden="true"><path d="${d}" fill="currentColor"/><circle r="2.4" fill="#FFD000"/></svg>`; };
  const stampIcon = (type, fillc) => `<svg viewBox="-1.3 -1.3 2.6 2.6" aria-hidden="true"><path d="${RM.stampPath(type, [0, 0], 1)}" fill="${fillc}" stroke="#3A1230" stroke-width=".06"/></svg>`;
  function patIcon(id) {
    const c = P.rainbow ? '#FF8A00' : colour() === '#FFFFFF' ? '#8E44FF' : colour();
    const wave = 'M4 18C12 4 20 4 28 12S44 22 52 6';
    if (id === 'glitter') return `<svg class="pv" viewBox="0 0 56 24" aria-hidden="true"><path d="${wave}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/><g fill="#FFE082"><circle cx="14" cy="9" r="1.6"/><circle cx="30" cy="14" r="1.3"/><circle cx="44" cy="11" r="1.8"/><circle cx="22" cy="6" r="1"/></g></svg>`;
    if (id === 'powder') { let d = ''; const r = RM.rng(5); for (let i = 0; i < 50; i++) { const u = i / 50, x = 4 + u * 48, y = 12 - Math.sin(u * 6.28) * 6 + (r() - 0.5) * 6; d += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.6 + r()).toFixed(1)}"/>`; } return `<svg class="pv" viewBox="0 0 56 24" fill="${c}" aria-hidden="true">${d}</svg>`; }
    if (id === 'confetti') { let d = ''; const r = RM.rng(8); for (let i = 0; i < 40; i++) d += `<circle cx="${(4 + r() * 48).toFixed(1)}" cy="${(4 + r() * 16).toFixed(1)}" r="1.3" fill="hsl(${Math.round(r() * 360)},90%,55%)"/>`; return `<svg class="pv" viewBox="0 0 56 24" aria-hidden="true">${d}</svg>`; }
    const st = { flowers: 'flower', stars: 'star', dotted: 'dot' }[id];
    let d = '';
    for (let i = 0; i < 4; i++) d += RM.stampPath(st, [8 + i * 13, 12], 5, 0);
    return `<svg class="pv" viewBox="0 0 56 24" aria-hidden="true"><path d="${d}" fill="${c}"/></svg>`;
  }
  function pots(el) {
    el.innerHTML = PAL.map((c, i) => `<button type="button" class="pot" data-c="${i}" style="background:${c}" aria-label="colour ${i + 1}"></button>`).join('') + `<button type="button" class="pot rainbow" data-c="rb" data-t-label="rainbowPot"></button>`;
    el.querySelectorAll('.pot').forEach(b => b.onclick = () => { RM.wake(); RM.sfx.pop(); if (b.dataset.c === 'rb') P.rainbow = true; else { P.rainbow = false; P.color = Number(b.dataset.c); } if (P.tool === 'eraser') P.tool = 'brush'; savePrefs(); sync(); });
  }
  function build() {
    pots($('#kPots')); pots($('#kPots2'));
    $('#kTools').innerHTML = TOOLS.map(([id, icon, lbl]) => `<button type="button" class="k-tool" data-tool="${id}">${RM.icons[icon]}<span data-t="${lbl}"></span></button>`).join('');
    $('#kSizes').innerHTML = ['small', 'medium', 'big'].map((s, i) => `<button type="button" class="k-tool" data-size="${i}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="${[3, 6, 10][i]}" fill="currentColor"/></svg><span data-t="${s}"></span></button>`).join('');
    $('#kRepeats').innerHTML = [2, 4, 6, 8, 12].map(n => `<button type="button" class="k-tool" data-n="${n}">${flowerIcon(n)}<span class="num">${n}</span></button>`).join('');
    $('#kToggles').innerHTML = `<button type="button" class="k-tool" id="kMirror">${RM.icons.mirror}<span data-t="mirror"></span></button><button type="button" class="k-tool" id="kDots">${RM.icons.dots}<span data-t="dotGuide"></span></button>`;
    $('#kShapes').innerHTML = [[1, 'shSquare', '<rect x="5" y="5" width="14" height="14" rx="2"/>'], [16 / 9, 'shWide', '<rect x="2" y="7" width="20" height="11" rx="2"/>'], ['fit', 'shFit', '<path d="M3 8V4h4M21 8V4h-4M3 16v4h4M21 16v4h-4"/>']].map(([a, k, r]) => `<button type="button" class="k-tool" data-ar="${a}"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4">${r}</svg><span data-t="${k}"></span></button>`).join('');
    document.querySelectorAll('#kShapes [data-ar]').forEach(b => b.onclick = () => { RM.wake(); RM.sfx.soft(); if (b.dataset.ar === 'fit') doc.fit = true; else { doc.fit = false; doc.ar = Number(b.dataset.ar); } setShape(); saveDoc(); sync(); });
    $('#kFloors').innerHTML = FLOORS.map(fl => `<button type="button" class="k-tool" data-floor="${fl.id}"><span class="sw" style="background:${fl.c}"></span><span data-t="fl_${fl.id}"></span></button>`).join('');
    $('#kTpls').innerHTML = TEMPLATES.map((tp, i) => `<button type="button" class="k-tpl" data-tpl="${i}"><svg viewBox="-300 -300 600 600" aria-hidden="true">${tp.regions.map(d => `<path d="${d}" fill="#FFF9EC" stroke="#3A1230" stroke-width="8"/>`).join('')}</svg><span data-t="tp_${tp.id}"></span></button>`).join('');
    RM.fillIcons(document.getElementById('view-kids'));

    document.querySelectorAll('#view-kids [data-mode]').forEach(b => b.onclick = () => { P.mode = b.dataset.mode; savePrefs(); sync(); if (P.mode === 'draw') requestAnimationFrame(() => R.resize(true)); else colourRender(); });
    document.querySelectorAll('#kTools [data-tool]').forEach(b => b.onclick = () => { RM.wake(); RM.sfx.soft(); P.tool = b.dataset.tool; savePrefs(); sync(); });
    document.querySelectorAll('#kSizes [data-size]').forEach(b => b.onclick = () => { P.size = Number(b.dataset.size); savePrefs(); sync(); });
    document.querySelectorAll('#kRepeats [data-n]').forEach(b => b.onclick = () => { RM.wake(); RM.sfx.soft(); P.n = Number(b.dataset.n); savePrefs(); sync(); });
    $('#kMirror').onclick = () => { P.mirror = !P.mirror; savePrefs(); sync(); };
    $('#kDots').onclick = () => { P.dots = !P.dots; savePrefs(); sync(); };
    document.querySelectorAll('#kFloors [data-floor]').forEach(b => b.onclick = () => { snapshot(); doc.bg = FLOORS.find(x => x.id === b.dataset.floor).c; R.composite(); R.renderGuides(); saveDoc(); sync(); });
    $('#kUndo').onclick = undo;
    $('#kClear').onclick = () => RM.confirm(document.getElementById('view-kids'), RM.t('clearAsk'), RM.t('yesClear'), RM.t('noKeep'), () => { snapshot(); layer().items = []; R.renderAll(); saveDoc(); RM.sfx.soft(); sync(); });
    $('#kSurprise').onclick = surpriseMe;
    $('#kSave').onclick = () => { RM.wake(); RM.exporter.kidsDialog(document.getElementById('view-kids'), { doc }, true); };
    $('#kSound').onclick = () => { RM.sound.set(!RM.sound.on); if (RM.sound.on) { RM.wake(); RM.sfx.pop(); } sync(); };
    document.querySelectorAll('#kTpls [data-tpl]').forEach(b => b.onclick = () => { C.tpl = Number(b.dataset.tpl); C.undo = []; saveColour(); colourRender(); sync(); });
    $('#kCUndo').onclick = () => { const u = C.undo.pop(); if (!u) return; const f = fills(); if (u[1]) f[u[0]] = u[1]; else delete f[u[0]]; saveColour(); colourRender(); };
    $('#kCReset').onclick = () => { C.fills[C.tpl] = {}; C.undo = []; saveColour(); colourRender(); RM.sfx.soft(); };
    $('#kCSave').onclick = () => { RM.wake(); RM.exporter.kidsDialog(document.getElementById('view-kids'), { canvas: S => svgToCanvas(colourSVG(true), S), svg: () => colourSVG(true) }, false); };
    RM.onLang(() => { if (ready) { sync(); RM.closeHelp(); } });
    const v = document.getElementById('view-kids');
    RM.attachHelp(v, [
      ['#kDraw .k-pots .k-label', 'k_colours'], ['#kColour .k-pots .k-label', 'k_colours'],
      ['h2[data-t="tools"]', 'k_tools'], ['h2[data-t="stickers"]', 'k_stickers'], ['h2[data-t="patterns"]', 'k_patterns'], ['h2[data-t="size"]', 'k_size'],
      ['h2[data-t="repeats"]', 'k_repeats'], ['h2[data-t="kShape"]', 'k_canvas'], ['h2[data-t="floor"]', 'k_floor'], ['h2[data-t="designs"]', 'k_designs'],
      ['#kDraw .k-actions', 'k_actions', 'aboutThis']
    ]);
  }
  function report(r) { if (r === 'saved') { RM.sfx.chime(); RM.toast(RM.t('saved')); } else if (r !== 'declined') RM.toast(RM.t('notSaved')); }

  function sync() {
    const press = (sel, test) => document.querySelectorAll(sel).forEach(b => b.setAttribute('aria-pressed', String(test(b))));
    document.querySelectorAll('#view-kids [data-mode]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.mode === P.mode)));
    $('#kDraw').hidden = P.mode !== 'draw'; $('#kColour').hidden = P.mode !== 'colour';
    press('#view-kids .pot', b => (b.dataset.c === 'rb' ? P.rainbow : !P.rainbow && Number(b.dataset.c) === P.color));
    press('#kTools [data-tool]', b => b.dataset.tool === P.tool);
    press('#kSizes [data-size]', b => Number(b.dataset.size) === P.size);
    press('#kRepeats [data-n]', b => Number(b.dataset.n) === P.n);
    press('#kFloors [data-floor]', b => FLOORS.find(x => x.id === b.dataset.floor).c === doc.bg);
    press('#kShapes [data-ar]', b => (b.dataset.ar === 'fit' ? !!doc.fit : !doc.fit && Math.abs(Number(b.dataset.ar) - RM.aspectOf(doc)) < 0.01));
    press('#kTpls [data-tpl]', b => Number(b.dataset.tpl) === C.tpl);
    $('#kMirror').setAttribute('aria-pressed', String(P.mirror));
    $('#kDots').setAttribute('aria-pressed', String(P.dots));
    $('#kStampGroup').hidden = P.tool !== 'stamp';
    $('#kPatGroup').hidden = P.tool !== 'pattern';
    $('#kSizeGroup').hidden = P.tool === 'fill';
    $('#kStamps').innerHTML = RM.STAMPS.map(s => `<button type="button" class="k-tool" data-stamp="${s}" aria-pressed="${s === P.stamp}">${stampIcon(s, P.rainbow ? '#FF9F1C' : colour())}<span data-t="st_${s}"></span></button>`).join('');
    document.querySelectorAll('#kStamps [data-stamp]').forEach(b => b.onclick = () => { RM.wake(); RM.sfx.pop(); P.stamp = b.dataset.stamp; savePrefs(); sync(); });
    $('#kPats').innerHTML = Object.keys(PATS).map(id => `<button type="button" class="k-tool" data-pat="${id}" aria-pressed="${id === P.pat}">${patIcon(id)}<span data-t="pt_${id}"></span></button>`).join('');
    document.querySelectorAll('#kPats [data-pat]').forEach(b => b.onclick = () => { RM.wake(); RM.sfx.pop(); P.pat = b.dataset.pat; savePrefs(); sync(); });
    document.querySelector('#kDraw .k-hint').dataset.t = P.tool === 'fill' ? 'fillHint' : 'drawHint';
    $('#kUndo').disabled = !hist.length;
    $('#kSound').innerHTML = RM.icons[RM.sound.on ? 'soundOn' : 'soundOff'];
    $('#kSound').dataset.tLabel = RM.sound.on ? 'soundOn' : 'soundOff';
    RM.applyI18n(document.getElementById('view-kids'));
    if (R) R.renderGuides({ radial: true, n: P.n, mirror: P.mirror, rot: 0, dots: P.dots ? 13 : 0, rings: 0, sym: 'radial' });
  }

  /* ---------- drawing ---------- */
  const clamp = p => { const a = RM.aspectOf(doc); return [Math.max(-a, Math.min(a, p[0])), Math.max(-1, Math.min(1, p[1]))]; };
  // The frame sizes itself from --ar; the renderer then matches its pixels to the new shape
  function setShape() {
    // "Fit screen": match the space this device gives the drawing (wider on laptops and TVs, square on phones held upright)
    if (doc.fit) {
      const stage = document.querySelector('#kDraw .k-stage'), w = (stage && stage.clientWidth) || innerWidth, h = Math.max(240, innerHeight - 150);
      doc.ar = Math.round(Math.max(1, Math.min(2.4, (w - 24) / h)) * 1000) / 1000;
    }
    $('#kStack').parentElement.style.setProperty('--ar', String(RM.aspectOf(doc)));
    R.setDoc(doc); requestAnimationFrame(() => R.resize(true));
  }
  const base = () => ({ c: colour(), n: P.n, m: P.mirror, rot: 0, o: 1, sym: 'radial', fx: { glow: true }, rb: P.rainbow, sd: RM.newSeed() });
  function newStroke(p) {
    if (P.tool === 'eraser') return Object.assign(base(), { t: 'stroke', brush: 'brush', pts: [p], w: ERASE[P.size], e: 1, fx: {}, rb: false });
    if (P.tool === 'pencil') return Object.assign(base(), { t: 'stroke', brush: 'pencil', pts: [p], w: BRUSH[P.size] * 0.8, fx: {} });
    if (P.tool === 'pattern') { const cfg = PATS[P.pat] || PATS.glitter; return Object.assign(base(), { t: 'stroke', pts: [p], w: BRUSH[P.size] * (cfg.brush === 'stampline' ? 1.4 : 1) }, RM.clone(cfg), { rb: cfg.rb || P.rainbow, fx: Object.assign({ glow: true }, cfg.fx || {}) }); }
    return Object.assign(base(), { t: 'stroke', brush: 'brush', pts: [p], w: BRUSH[P.size] });
  }
  function bindCanvas() {
    const st = $('#kStack');
    st.addEventListener('pointerdown', e => {
      if (busy) return;
      RM.wake(); e.preventDefault();
      const p = clamp(R.toNorm(e));
      st.setPointerCapture && st.setPointerCapture(e.pointerId);
      if (P.tool === 'stamp' || P.tool === 'fill') {
        snapshot();
        const it = P.tool === 'stamp'
          ? Object.assign(base(), { t: 'stamp', st: P.stamp, pts: [p], sz: STAMP[P.size], w: 0 })
          : Object.assign(base(), { t: 'fill', pts: [p], tol: 60, fx: {} });
        layer().items.push(it); R.commit(layer(), it);
        (P.tool === 'fill' ? RM.sfx.splash : RM.sfx.pop)();
        saveDoc(); sync();
        return;
      }
      drawing = newStroke(p); drawing._s = p;
      R.drawLive(drawing);
    });
    st.addEventListener('pointermove', e => {
      if (!drawing) return;
      const raw = clamp(R.toNorm(e)), l = drawing._s, s = [l[0] + (raw[0] - l[0]) * 0.6, l[1] + (raw[1] - l[1]) * 0.6];
      drawing._s = s;
      const last = drawing.pts[drawing.pts.length - 1];
      if (Math.hypot(s[0] - last[0], s[1] - last[1]) < 0.006) return;
      drawing.pts.push(s); R.drawLive(drawing);
    });
    const end = () => {
      if (!drawing) return;
      snapshot();
      const it = drawing; drawing = null; delete it._s;
      layer().items.push(it); R.commit(layer(), it); saveDoc(); sync();
    };
    st.addEventListener('pointerup', end); st.addEventListener('pointercancel', end); st.addEventListener('lostpointercapture', end);
  }
  function undo() { const h = hist.pop(); if (h == null) return; layer().items = JSON.parse(h); R.renderAll(); saveDoc(); RM.sfx.soft(); sync(); }
  function surpriseMe() {
    if (busy) return;
    RM.wake(); busy = true; $('#kSurprise').disabled = true;
    snapshot();
    const s = RM.surprise(Date.now() & 0xffffff, PAL.slice(0, 8), { glow: true });
    layer().items = []; R.renderAll();
    P.n = s.n; savePrefs(); sync();
    s.items.forEach((it, i) => setTimeout(() => {
      layer().items.push(it); R.commit(layer(), it); RM.tone(440 + i * 70, 0, 0.14, 'triangle', 0.08);
      if (i === s.items.length - 1) { busy = false; $('#kSurprise').disabled = false; RM.sfx.chime(); RM.toast(RM.t('tada')); saveDoc(); sync(); }
    }, 220 * (i + 1)));
  }

  /* ---------- colour-in designs (centred coordinates) ---------- */
  const at = (r, a) => [r * Math.cos(a), r * Math.sin(a)], UP = -Math.PI / 2, O = [0, 0];
  const ring = (count, fn, off) => Array.from({ length: count }, (_, k) => fn(UP + (off || 0) + (k * 2 * Math.PI) / count));
  const TEMPLATES = [
    { id: 'lotus', regions: [RM.circlePath(O, 288), ...ring(16, a => RM.petalPath(at(185, a), at(280, a), 0.34)), RM.circlePath(O, 186), ...ring(8, a => RM.petalPath(at(58, a), at(176, a), 0.5), Math.PI / 8), ...ring(8, a => RM.petalPath(at(58, a), at(132, a), 0.42)), RM.circlePath(O, 62), RM.circlePath(O, 30)] },
    { id: 'star', regions: [RM.circlePath(O, 288), ...ring(24, a => RM.circlePath(at(262, a), 13)), ...ring(12, a => RM.petalPath(at(150, a), at(242, a), 0.38)), RM.circlePath(O, 150), ...ring(8, a => { const p = [at(62, a - Math.PI / 8), at(142, a), at(62, a + Math.PI / 8)]; return `M0 0L${p.map(q => q.map(v => v.toFixed(1)).join(' ')).join('L')}Z`; }), RM.circlePath(O, 40)] },
    { id: 'diya', regions: [RM.circlePath(O, 288), ...ring(12, a => RM.circlePath(at(240, a), 44)), RM.circlePath(O, 200), ...ring(6, a => RM.stampPath('diya', at(140, a), 46)), ...ring(6, a => RM.circlePath(at(176, a), 10), Math.PI / 6), ...ring(6, a => RM.petalPath(at(40, a), at(118, a), 0.42), Math.PI / 6), RM.polyPath(O, 42, 6, UP)] }
  ];
  const C = Object.assign({ tpl: 0, fills: {}, undo: [] }, RM.store.get('rm-kids-colour', {}), { undo: [] });
  const fills = () => (C.fills[C.tpl] = C.fills[C.tpl] || {});
  const saveColour = () => RM.store.set('rm-kids-colour', { tpl: C.tpl, fills: C.fills });
  function colourSVG(standalone) {
    const tp = TEMPLATES[C.tpl] || TEMPLATES[0], f = fills();
    return `<svg ${standalone ? 'xmlns="http://www.w3.org/2000/svg" ' : ''}viewBox="-300 -300 600 600" class="k-csvg" role="img" aria-label="${RM.t('tp_' + tp.id)}"><rect x="-300" y="-300" width="600" height="600" fill="#FFF9EC"/>${tp.regions.map((d, i) => `<path data-i="${i}" d="${d}" fill="${f[i] || '#FFFFFF'}" stroke="#3A1230" stroke-width="3" stroke-linejoin="round"/>`).join('')}</svg>`;
  }
  function colourRender() {
    const box = $('#kCsvg');
    box.innerHTML = colourSVG(false);
    box.firstElementChild.addEventListener('click', e => {
      const el = e.target.closest('[data-i]');
      if (!el) return;
      RM.wake();
      const i = el.dataset.i, f = fills(), c = P.rainbow ? PAL[Math.floor(Math.random() * 8)] : colour();
      C.undo.push([i, f[i] || null]); f[i] = c; el.setAttribute('fill', c); saveColour(); RM.tone(520 + (i % 8) * 40, 0, 0.12, 'triangle', 0.08);
    });
  }
  const svgToCanvas = (svg, S) => new Promise(res => {
    const img = new Image(), cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const timer = setTimeout(() => res(cv), 5000);
    img.onload = () => { clearTimeout(timer); const g = cv.getContext('2d'); g.drawImage(img, 0, 0, S, S); res(cv); };
    img.onerror = () => { clearTimeout(timer); res(cv); };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });

  function show() {
    if (!ready) {
      ready = true;
      doc = loadDoc();
      R = new RM.Renderer($('#kStack'));
      R.doc = doc;
      $('#kStack').parentElement.style.setProperty('--ar', String(RM.aspectOf(doc)));
      build(); bindCanvas();
      addEventListener('resize', () => { if (!document.getElementById('view-kids').hidden && P.mode === 'draw') { if (doc.fit) setShape(); else R.resize(); } });
    }
    sync();
    if (P.mode === 'colour') colourRender();
    requestAnimationFrame(() => { if (doc.fit) setShape(); else R.resize(true); sync(); });
  }
  return { show };
})();
