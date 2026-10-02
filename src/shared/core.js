/* =====================================================================
   Rangoli Maker · shared core
   Vector document model, brush engine, symmetry (radial / tile / border),
   paint (solid, gradients, rainbow, patterns), effects, bucket fill,
   hit-testing, PNG/SVG export, generators, translations, storage, sound.
   ===================================================================== */
const RM = (() => {
  'use strict';

  /* ---------- translations ---------- */
  const I18N = {};
  const LI = { en: 0, hi: 1, mr: 2 };
  let LANG = 'en';
  const t = (k, v) => {
    const e = I18N[k];
    let s = e ? (e[LI[LANG]] != null ? e[LI[LANG]] : e[0]) : k;
    if (v) s = s.replace(/\{(\w+)\}/g, (_, x) => (v[x] != null ? v[x] : ''));
    return s;
  };
  const addStrings = o => Object.assign(I18N, o);
  function applyI18n(root) {
    root.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    root.querySelectorAll('[data-t-label]').forEach(el => { const s = t(el.dataset.tLabel); el.setAttribute('aria-label', s); el.title = s; });
    root.querySelectorAll('[data-t-ph]').forEach(el => { el.placeholder = t(el.dataset.tPh); });
  }
  const langListeners = [];
  function setLang(l) {
    LANG = LI[l] != null ? l : 'en';
    document.documentElement.lang = LANG;
    store.set('rm-lang', LANG);
    applyI18n(document);
    document.querySelectorAll('.langs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.l === LANG)));
    langListeners.forEach(f => f(LANG));
  }

  /* ---------- storage (per-viewer drafts only) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- file saving through the downloads capability ---------- */
  // Inside Claude, files go through the viewer's download capability.
  // Opened as a plain file in a browser (no Claude viewer), a normal browser download works instead.
  let DL = null;
  const inViewer = !!(window.claude && window.claude.use);
  if (!inViewer) document.documentElement.classList.add('can-save');
  const dlReady = inViewer
    ? window.claude.use('downloads').then(d => { DL = d; document.documentElement.classList.toggle('can-save', !!d); return d; }).catch(() => null)
    : Promise.resolve(null);
  function browserDownload(name, data) {
    try {
      const blob = data instanceof Blob ? data : new Blob([data], { type: /\.svg$/.test(name) ? 'image/svg+xml' : /\.json$/.test(name) ? 'application/json' : /\.pdf$/.test(name) ? 'application/pdf' : 'application/octet-stream' });
      const url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = name; a.rel = 'noopener'; a.style.display = 'none';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      return 'saved';
    } catch (e) { return 'error'; }
  }
  async function saveFile(name, data) {
    if (!DL) return inViewer ? 'unavailable' : browserDownload(name, data);
    try { await DL.save({ filename: name, data }); return 'saved'; }
    catch (e) { return (e && e.code) || 'error'; }
  }
  const canvasBlob = cv => new Promise(res => cv.toBlob(b => res(b), 'image/png'));
  const stamp = () => new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '');

  /* ---------- sound ---------- */
  let AC = null, soundOn = store.get('rm-sound', true);
  function wake() {
    try {
      if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (C) AC = new C(); }
      if (AC && AC.state === 'suspended') AC.resume();
    } catch (e) {}
  }
  function tone(f, t0, dur, type, vol, f2) {
    if (!soundOn || !AC) return;
    try {
      const at = AC.currentTime + t0, o = AC.createOscillator(), g = AC.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, at);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, at + dur);
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol || 0.12, at + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      o.connect(g).connect(AC.destination); o.start(at); o.stop(at + dur + 0.05);
    } catch (e) {}
  }
  const sfx = {
    pop: () => tone(660, 0, 0.09, 'triangle', 0.08, 880),
    chime: () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.07, 0.3, 'triangle', 0.1)),
    soft: () => tone(392, 0, 0.12, 'sine', 0.06),
    splash: () => { tone(300, 0, 0.18, 'sine', 0.08, 700); tone(900, 0.06, 0.12, 'triangle', 0.05); }
  };
  const sound = { get on() { return soundOn; }, set(v) { soundOn = v; store.set('rm-sound', v); } };

  /* ---------- randomness & colour helpers ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let x = Math.imul(a ^ (a >>> 15), 1 | a); x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x; return ((x ^ (x >>> 14)) >>> 0) / 4294967296; };
  }
  const pickR = (r, a) => a[Math.floor(r() * a.length)];
  const newSeed = () => Math.floor(Math.random() * 1e9);
  function hexToRgb(hex) { const h = String(hex || '#000').replace('#', ''); const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h.padEnd(6, '0'); return [parseInt(v.slice(0, 2), 16) || 0, parseInt(v.slice(2, 4), 16) || 0, parseInt(v.slice(4, 6), 16) || 0]; }
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
  const shade = (hex, amt) => { const [r, g, b] = hexToRgb(hex); const tgt = amt < 0 ? 0 : 255, k = Math.abs(amt); return rgbToHex(r + (tgt - r) * k, g + (tgt - g) * k, b + (tgt - b) * k); };
  function hsvToHex(h, s, v) { const f = n => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); }; return rgbToHex(f(5) * 255, f(3) * 255, f(1) * 255); }
  function hexToHsv(hex) { const [r, g, b] = hexToRgb(hex).map(x => x / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; } return [h, mx ? d / mx : 0, mx]; }
  const lum = hex => { const [r, g, b] = hexToRgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
  const isHex = c => typeof c === 'string' && /^#[0-9a-f]{6}$/i.test(c);

  /* ---------- geometry → path data (shared by canvas and SVG) ---------- */
  const f = v => Math.round(v * 100) / 100;
  function smoothPath(P) {
    if (P.length === 1) return `M${f(P[0][0])} ${f(P[0][1])}L${f(P[0][0] + 0.01)} ${f(P[0][1])}`;
    let d = `M${f(P[0][0])} ${f(P[0][1])}`;
    for (let i = 1; i < P.length - 1; i++) d += `Q${f(P[i][0])} ${f(P[i][1])} ${f((P[i][0] + P[i + 1][0]) / 2)} ${f((P[i][1] + P[i + 1][1]) / 2)}`;
    const l = P[P.length - 1];
    return d + `L${f(l[0])} ${f(l[1])}`;
  }
  const circlePath = (c, r) => { r = Math.max(0.5, r); return `M${f(c[0] - r)} ${f(c[1])}A${f(r)} ${f(r)} 0 1 0 ${f(c[0] + r)} ${f(c[1])}A${f(r)} ${f(r)} 0 1 0 ${f(c[0] - r)} ${f(c[1])}Z`; };
  function petalPath(a, b, pw) {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1e-6, nx = -dy / len, ny = dx / len;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, h = len * pw;
    return `M${f(a[0])} ${f(a[1])}Q${f(mx + nx * h)} ${f(my + ny * h)} ${f(b[0])} ${f(b[1])}Q${f(mx - nx * h)} ${f(my - ny * h)} ${f(a[0])} ${f(a[1])}Z`;
  }
  function polyPath(c, r, s, ang) {
    let d = '';
    for (let i = 0; i < s; i++) { const a = ang + (i * 2 * Math.PI) / s; d += (i ? 'L' : 'M') + f(c[0] + r * Math.cos(a)) + ' ' + f(c[1] + r * Math.sin(a)); }
    return d + 'Z';
  }
  function starPoly(c, R, r, pts, ang) {
    let d = '';
    for (let i = 0; i < pts * 2; i++) { const a = ang + (i * Math.PI) / pts, q = i % 2 ? r : R; d += (i ? 'L' : 'M') + f(c[0] + q * Math.cos(a)) + ' ' + f(c[1] + q * Math.sin(a)); }
    return d + 'Z';
  }
  // Stamps: local "up" points away from the centre, or along `angle` when given
  const STAMPS = ['flower', 'star', 'leaf', 'diya', 'heart', 'paisley', 'dot'];
  function stampPath(type, a, s, angle) {
    const ang = angle != null ? angle : (Math.hypot(a[0], a[1]) < 1e-3 ? 0 : Math.atan2(a[1], a[0]) + Math.PI / 2);
    const c = Math.cos(ang), sn = Math.sin(ang);
    const T = (x, y) => [a[0] + x * c - y * sn, a[1] + x * sn + y * c];
    const P = (x, y) => { const p = T(x, y); return `${f(p[0])} ${f(p[1])}`; };
    switch (type) {
      case 'flower': { let d = ''; for (let k = 0; k < 5; k++) { const q = -Math.PI / 2 + (k * 2 * Math.PI) / 5; d += petalPath(T(0, 0), T(Math.cos(q) * s, Math.sin(q) * s), 0.5); } return d + circlePath(T(0, 0), s * 0.26); }
      case 'star': return starPoly(T(0, 0), s, s * 0.45, 5, ang - Math.PI / 2);
      case 'leaf': return petalPath(T(0, s * 0.9), T(0, -s), 0.42);
      case 'diya': return `M${P(-s, 0)}Q${P(0, s * 1.1)} ${P(s, 0)}Z` + petalPath(T(0, -s * 0.12), T(0, -s * 1.05), 0.36);
      case 'heart': return `M${P(0, s * 0.8)}C${P(-s * 1.1, 0)} ${P(-s * 0.6, -s * 0.95)} ${P(0, -s * 0.35)}C${P(s * 0.6, -s * 0.95)} ${P(s * 1.1, 0)} ${P(0, s * 0.8)}Z`;
      case 'paisley': return `M${P(0, s)}C${P(-s, s * 0.6)} ${P(-s * 0.75, -s * 0.9)} ${P(s * 0.15, -s)}C${P(s * 0.8, -s * 0.9)} ${P(s * 0.65, -s * 0.15)} ${P(s * 0.12, -s * 0.2)}C${P(-s * 0.3, -s * 0.2)} ${P(-s * 0.2, s * 0.45)} ${P(0, s)}Z`;
      default: return circlePath(a, s * 0.55);
    }
  }
  // Walk a polyline and return evenly spaced samples [x, y, angle, pressure]
  function resample(P, step) {
    if (P.length === 1) return [[P[0][0], P[0][1], 0, P[0][2]]];
    const out = [[P[0][0], P[0][1], Math.atan2(P[1][1] - P[0][1], P[1][0] - P[0][0]), P[0][2]]];
    let carry = 0;
    for (let i = 1; i < P.length; i++) {
      const ax = P[i - 1][0], ay = P[i - 1][1], dx = P[i][0] - ax, dy = P[i][1] - ay, len = Math.hypot(dx, dy);
      if (!len) continue;
      const ang = Math.atan2(dy, dx);
      let d = step - carry;
      while (d <= len) { const k = d / len; out.push([ax + dx * k, ay + dy * k, ang, P[i][2]]); d += step; if (out.length > 4000) return out; }
      carry = len - (d - step);
    }
    return out;
  }

  /* ---------- brush engine ----------
     item = { t, pts:[[x,y,pressure?]] in -1..1, c, c2, paint, pat, w (1/1000 of canvas), o, hd hardness,
              brush, tip, sp spacing %, stp stamp tip, pr pressure, sym, n, m, rot, k, f, pw, s, st, sz, bend,
              fx:{glow, glitter, shadow, metal, tex}, e eraser, rb rainbow, sd seed, tol fill tolerance } */
  const BRUSHES = ['brush', 'pencil', 'pen', 'marker', 'chalk', 'spray', 'airbrush', 'highlighter', 'stampline'];
  const KIND = {
    brush: { w: 1, a: 1, cap: 'round', join: 'round' },
    pencil: { w: 0.45, a: 0.92, cap: 'round', join: 'round', grain: true },
    pen: { w: 1, a: 1, cap: 'round', join: 'round' },
    marker: { w: 1.1, a: 0.9, cap: 'square', join: 'miter' },
    chalk: { w: 1, a: 1 },
    spray: { w: 1, a: 1 },
    airbrush: { w: 1.3, a: 0.6, cap: 'round', join: 'round', soft: 1 },
    highlighter: { w: 1.8, a: 0.38, cap: 'butt', join: 'bevel' },
    stampline: { w: 1, a: 1 }
  };
  const GEO = new WeakMap();
  // A stroke being drawn grows in place, so the key includes its length and last point
  const geoKey = (it, R) => { const p = it.pts || [], l = p[p.length - 1] || []; return [R, it.t, it.w, it.brush, it.sp, it.stp, it.sz, it.pw, it.s, it.bend, it.pr, it.f, it.st, it.sd, p.length, l[0], l[1], it.txt, it.ts, it.font, it.bold].join('|'); };
  function geom(it, R) {
    const key = geoKey(it, R), hit = GEO.get(it);
    if (hit && hit.key === key && hit.pts === it.pts) return hit.g;
    const g = buildGeom(it, R);
    GEO.set(it, { key, pts: it.pts, g });
    return g;
  }
  function buildGeom(it, R) {
    const P = (it.pts || []).map(p => [p[0] * R, p[1] * R, p[2]]), a = P[0] || [0, 0], b = P[1] || a;
    const lw = Math.max(0.5, ((it.w || 1) / 500) * R), dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const out = { paths: [], dabs: '', segs: null, samples: [], lw };
    const add = (d, mode) => out.paths.push({ d, mode });
    switch (it.t) {
      case 'stroke': {
        const kind = it.brush || 'brush', r = rng(it.sd || 1);
        if (kind === 'chalk' || kind === 'spray') {
          const spray = kind === 'spray', step = Math.max(1, lw * (spray ? 0.6 : 0.3) * ((it.sp || 100) / 100));
          let d = '';
          for (const s of resample(P, step)) {
            const pm = it.pr && s[3] != null ? 0.3 + s[3] * 1.4 : 1;
            for (let i = 0; i < (spray ? 14 : 7); i++) {
              const rr = (spray ? lw * 1.2 : lw / 2) * pm * Math.sqrt(r()), an = r() * Math.PI * 2;
              d += circlePath([s[0] + rr * Math.cos(an), s[1] + rr * Math.sin(an)], lw * pm * (spray ? 0.03 + 0.05 * r() : 0.06 + 0.12 * r()));
            }
          }
          out.dabs = d;
        } else if (kind === 'stampline') {
          const size = lw * 0.9, step = Math.max(2, size * 2 * ((it.sp || 130) / 100));
          let d = '';
          for (const s of resample(P, step)) d += stampPath(it.stp || 'flower', [s[0], s[1]], size * (it.pr && s[3] != null ? 0.4 + s[3] * 1.2 : 1), s[2] + Math.PI / 2);
          add(d, 'fill');
        } else if (kind === 'pen') {
          const nib = [Math.cos(-Math.PI / 4), Math.sin(-Math.PI / 4)];
          let d = '';
          const Q = P.length === 1 ? [P[0], [P[0][0] + 0.01, P[0][1], P[0][2]]] : P;
          for (let i = 1; i < Q.length; i++) {
            const h0 = (lw / 2) * (it.pr && Q[i - 1][2] != null ? 0.3 + Q[i - 1][2] * 1.4 : 1), h1 = (lw / 2) * (it.pr && Q[i][2] != null ? 0.3 + Q[i][2] * 1.4 : 1);
            const p0 = Q[i - 1], p1 = Q[i];
            d += `M${f(p0[0] + nib[0] * h0)} ${f(p0[1] + nib[1] * h0)}L${f(p1[0] + nib[0] * h1)} ${f(p1[1] + nib[1] * h1)}L${f(p1[0] - nib[0] * h1)} ${f(p1[1] - nib[1] * h1)}L${f(p0[0] - nib[0] * h0)} ${f(p0[1] - nib[1] * h0)}Z`;
          }
          add(d, 'fill');
        } else if (it.pr && P.length > 1 && P.some(p => p[2] != null)) {
          out.segs = [];
          for (let i = 1; i < P.length; i++) out.segs.push([P[i - 1][0], P[i - 1][1], P[i][0], P[i][1], 0.25 + ((P[i][2] != null ? P[i][2] : 0.5) * 1.5)]);
        } else add(smoothPath(P), 'stroke');
        out.samples = resample(P, Math.max(3, lw * 1.2)).map(s => [s[0], s[1]]);
        break;
      }
      case 'line': add(`M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`, 'stroke'); out.samples = resample([a, b], Math.max(3, lw * 1.5)).map(s => [s[0], s[1]]); break;
      case 'curve': {
        const nx = -(b[1] - a[1]) / (dist || 1), ny = (b[0] - a[0]) / (dist || 1), k = (it.bend != null ? it.bend : 0.35) * dist;
        const c = [(a[0] + b[0]) / 2 + nx * k, (a[1] + b[1]) / 2 + ny * k];
        add(`M${f(a[0])} ${f(a[1])}Q${f(c[0])} ${f(c[1])} ${f(b[0])} ${f(b[1])}`, 'stroke');
        for (let i = 0; i <= 16; i++) { const u = i / 16; out.samples.push([(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]); }
        break;
      }
      case 'circle': add(circlePath(a, dist), it.f ? 'fill' : 'stroke'); ring(out, a, dist, 24); break;
      case 'petal': add(petalPath(a, b, it.pw != null ? it.pw : 0.45), it.f ? 'fill' : 'stroke'); out.samples = resample([a, b], Math.max(3, dist / 10)).map(s => [s[0], s[1]]); break;
      case 'poly': add(polyPath(a, Math.max(0.5, dist), it.s || 6, Math.atan2(b[1] - a[1], b[0] - a[0])), it.f ? 'fill' : 'stroke'); ring(out, a, dist, 18); break;
      case 'dot': add(circlePath(a, Math.max(0.6, ((it.w || 1) / 1000) * R)), 'fill'); ring(out, a, ((it.w || 1) / 1000) * R * 0.6, 6); break;
      case 'stamp': add(stampPath(it.st, a, (it.sz || 0.06) * R), 'fill'); ring(out, a, (it.sz || 0.06) * R * 0.7, 10); break;
      case 'text': {
        const fs = (it.ts || 0.08) * R, w = Math.max(1, String(it.txt || '').length) * fs * 0.56;
        out.text = { x: a[0], y: a[1], font: `${it.bold ? 700 : 400} ${f(fs)}px "${it.font || 'Hind'}", "Nirmala UI", sans-serif`, fs, family: it.font || 'Hind' };
        for (let i = 0; i < 24; i++) out.samples.push([a[0] + ((i % 8) / 7 - 0.5) * w, a[1] + ((Math.floor(i / 8) / 2) - 0.5) * fs * 0.8]);
        break;
      }
    }
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    (out.samples.length ? out.samples : P).forEach(p => { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
    if (!isFinite(x0)) { x0 = y0 = -1; x1 = y1 = 1; }
    const pad = lw;
    out.box = [x0 - pad, y0 - pad, x1 + pad, y1 + pad];
    out.p2d = typeof Path2D !== 'undefined' ? { paths: out.paths.map(p => new Path2D(p.d)), dabs: out.dabs ? new Path2D(out.dabs) : null } : null;
    return out;
  }
  function ring(out, c, r, n) { for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; out.samples.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } }

  /* ---------- symmetry ---------- */
  const SYMS = ['radial', 'tile', 'border'];
  function xforms(it) {
    const out = [], sym = it.sym || 'radial', rot0 = ((it.rot || 0) * Math.PI) / 180;
    if (sym === 'tile') {
      const k = Math.max(1, Math.min(6, it.k || 3)), cell = 2 / k, N = (2 * k - 1) ** 2;
      let i = 0;
      for (let x = -(k - 1); x <= k - 1; x++) for (let y = -(k - 1); y <= k - 1; y++) out.push({ a: 0, m: 1, tx: x * cell, ty: y * cell, k: i++, N });
      return out;
    }
    if (sym === 'border') {
      const k = Math.max(1, Math.min(12, it.k || 4)), cell = 2 / k;
      for (let s = 0; s < 4; s++) for (let j = -(k - 1); j <= k - 1; j++) out.push({ a: rot0 + (s * Math.PI) / 2, m: 1, tx: j * cell, ty: 0, k: s, N: 4 });
      return out;
    }
    const n = Math.max(1, it.n || 1);
    for (let k = 0; k < n; k++) for (const m of it.m ? [1, -1] : [1]) out.push({ a: rot0 + (k * 2 * Math.PI) / n, m, tx: 0, ty: 0, k, N: n });
    return out;
  }
  // R is half the canvas height (the drawing scale); the centre is the middle of the canvas, so wide canvases work too
  const centreX = (g, R) => { const w = g && g.canvas && g.canvas.width; return typeof w === 'number' && w > 0 ? w / 2 : R; };
  function applyX(g, R, x, cx, cy) { g.translate(cx != null ? cx : centreX(g, R), cy != null ? cy : R); g.rotate(x.a); g.scale(x.m, 1); if (x.tx || x.ty) g.translate(x.tx * R, x.ty * R); }
  function xfPoint(p, x, R, cx, cy) { const X = (p[0] + x.tx * R) * x.m, Y = p[1] + x.ty * R, c = Math.cos(x.a), s = Math.sin(x.a); return [(cx != null ? cx : R) + X * c - Y * s, (cy != null ? cy : R) + X * s + Y * c]; }
  function xfInverse(px, x, R) { const X = px[0] - R, Y = px[1] - R, c = Math.cos(-x.a), s = Math.sin(-x.a); const rx = X * c - Y * s, ry = X * s + Y * c; return [rx * x.m - x.tx * R, ry - x.ty * R]; }
  function xfDelta(d, x) { const c = Math.cos(-x.a), s = Math.sin(-x.a); return [(d[0] * c - d[1] * s) * x.m, d[0] * s + d[1] * c]; }

  /* ---------- paint ---------- */
  const rainbow = (k, n) => `hsl(${Math.round(((k * 360) / Math.max(1, n) + 8) % 360)}, 90%, 60%)`;
  const PATTERNS = ['dots', 'stripes', 'checks', 'zigzag'];
  const patCache = new Map();
  function patternTile(type, c, c2, R) {
    const size = Math.max(6, Math.round(R * 0.05)), key = [type, c, c2, size].join('|');
    if (patCache.has(key)) return patCache.get(key);
    const cv = document.createElement('canvas'); cv.width = cv.height = size;
    const g = cv.getContext('2d');
    if (!g) return null;
    if (c2 && c2 !== 'transparent') { g.fillStyle = c2; g.fillRect(0, 0, size, size); }
    g.fillStyle = c; g.strokeStyle = c; g.lineWidth = size * 0.18;
    if (type === 'dots') { g.beginPath(); g.arc(size / 2, size / 2, size * 0.22, 0, 7); g.fill(); }
    else if (type === 'stripes') { g.beginPath(); g.moveTo(0, size); g.lineTo(size, 0); g.moveTo(-size / 2, size / 2); g.lineTo(size / 2, -size / 2); g.moveTo(size / 2, size * 1.5); g.lineTo(size * 1.5, size / 2); g.stroke(); }
    else if (type === 'checks') { g.fillRect(0, 0, size / 2, size / 2); g.fillRect(size / 2, size / 2, size / 2, size / 2); }
    else { g.beginPath(); g.moveTo(0, size * 0.7); g.lineTo(size / 2, size * 0.3); g.lineTo(size, size * 0.7); g.stroke(); }
    patCache.set(key, cv);
    return cv;
  }
  function paintStyle(g, it, x, R, box) {
    if (it.e) return '#000';
    if (it.rb) return rainbow(x.k, x.N);
    const c = isHex(it.c) ? it.c : (it.c || '#FFFFFF'), c2 = isHex(it.c2) ? it.c2 : '#FFD23F';
    if (it.fx && it.fx.metal && isHex(c) && g.createLinearGradient) {
      const gr = g.createLinearGradient(box[0], box[1], box[2], box[3]);
      gr.addColorStop(0, shade(c, -0.45)); gr.addColorStop(0.42, shade(c, 0.55)); gr.addColorStop(0.5, '#FFFFFF'); gr.addColorStop(0.6, c); gr.addColorStop(1, shade(c, -0.5));
      return gr;
    }
    if (it.paint === 'radial' && g.createRadialGradient) { const gr = g.createRadialGradient(0, 0, 0, 0, 0, R); gr.addColorStop(0, c); gr.addColorStop(1, c2); return gr; }
    if (it.paint === 'linear' && g.createLinearGradient) { const gr = g.createLinearGradient(box[0], box[1], box[2], box[3]); gr.addColorStop(0, c); gr.addColorStop(1, c2); return gr; }
    if (it.paint === 'pattern' && g.createPattern) { const tile = patternTile(it.pat || 'dots', c, c2, R); const p = tile && g.createPattern(tile, 'repeat'); if (p) return p; }
    return c;
  }
  const solidOf = (it, x) => (it.rb ? rainbow(x.k, x.N) : isHex(it.c) ? it.c : '#FFFFFF');

  /* ---------- drawing an item onto a 2D context ---------- */
  function strokeOrFill(g, geo, it) {
    if (geo.text) { g.font = geo.text.font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(it && it.txt || ''), geo.text.x, geo.text.y); return; }
    const P2 = geo.p2d;
    geo.paths.forEach((p, i) => { const path = P2 ? P2.paths[i] : null; if (!path) return; if (p.mode === 'fill') g.fill(path); else g.stroke(path); });
    if (geo.dabs && P2 && P2.dabs) g.fill(P2.dabs);
    if (geo.segs) { const lw = g.lineWidth; geo.segs.forEach(s => { g.lineWidth = lw * s[4]; g.beginPath(); g.moveTo(s[0], s[1]); g.lineTo(s[2], s[3]); g.stroke(); }); g.lineWidth = lw; }
  }
  // Draws with the shape pushed off-canvas so only its blurred shadow lands in place (soft edges, drop shadows)
  function shadowPass(g, color, blur, dx, dy, fn) {
    if (!g.getTransform || !g.setTransform) return;
    const M = g.getTransform(), OFF = 20000;
    g.save();
    g.setTransform(M.a, M.b, M.c, M.d, M.e - OFF, M.f);
    g.shadowColor = color; g.shadowBlur = blur; g.shadowOffsetX = OFF + dx; g.shadowOffsetY = dy;
    fn();
    g.restore();
  }
  function sparkles(g, geo, it, lw, R) {
    const r = rng((it.sd || 7) + 11), pts = geo.samples;
    if (!pts.length) return;
    const n = Math.min(160, Math.max(6, Math.round(pts.length * 1.3)));
    g.save();
    g.shadowBlur = 0; g.globalCompositeOperation = 'source-over';
    for (let i = 0; i < n; i++) {
      const p = pts[Math.floor(r() * pts.length)], j = lw * 0.6, x = p[0] + (r() - 0.5) * j * 2, y = p[1] + (r() - 0.5) * j * 2, s = Math.max(0.6, R * 0.004 + r() * lw * 0.12);
      g.fillStyle = r() < 0.6 ? 'rgba(255,255,255,0.95)' : 'rgba(255,224,130,0.95)';
      g.beginPath(); g.arc(x, y, s, 0, 7); g.fill();
      if (r() < 0.25) { g.fillRect(x - s * 2.6, y - s * 0.25, s * 5.2, s * 0.5); g.fillRect(x - s * 0.25, y - s * 2.6, s * 0.5, s * 5.2); }
    }
    g.restore();
  }
  function texture(g, geo, it, R) {
    const path = geo.p2d && geo.p2d.paths[0];
    if (!path || !geo.paths[0] || geo.paths[0].mode !== 'fill') return;
    const r = rng((it.sd || 3) + 5), b = geo.box, area = (b[2] - b[0]) * (b[3] - b[1]), n = Math.min(900, Math.max(30, area / (R * R * 0.0006)));
    g.save(); g.clip(path); g.shadowBlur = 0;
    for (let i = 0; i < n; i++) { g.fillStyle = r() < 0.5 ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'; const s = R * (0.002 + r() * 0.004); g.fillRect(b[0] + r() * (b[2] - b[0]), b[1] + r() * (b[3] - b[1]), s, s); }
    g.restore();
  }
  function drawItem(g, it, R, opt) {
    opt = opt || {};
    if (it.t === 'fill') { if (!opt.preview) drawFill(g, it, R, opt); return; }
    // where this item's symmetry centre lands on the canvas: the view's origin plus the item's own offset
    const ccx = (opt.cx != null ? opt.cx : centreX(g, R)) + (it.ox || 0) * R, ccy = (opt.cy != null ? opt.cy : R) + (it.oy || 0) * R;
    const geo = geom(it, R);
    if (!geo.p2d) return;
    const kind = it.t === 'stroke' ? KIND[it.brush || 'brush'] || KIND.brush : KIND.brush;
    const lw = geo.lw * (kind.w || 1), fx = it.fx || {}, preview = opt.preview;
    const hard = kind.soft ? 0 : it.hd != null ? it.hd : 100;
    g.save();
    g.lineWidth = lw;
    g.lineCap = it.tip === 'square' ? 'square' : kind.cap || 'round';
    g.lineJoin = it.tip === 'square' ? 'miter' : kind.join || 'round';
    g.globalAlpha = (it.o != null ? it.o : 1) * (kind.a || 1);
    if (it.e && !preview) g.globalCompositeOperation = 'destination-out';
    for (const x of xforms(it)) {
      g.save();
      applyX(g, R, x, ccx, ccy);
      const style = opt.outline ? opt.outline : it.e && preview ? 'rgba(255,255,255,0.55)' : paintStyle(g, it, x, R, geo.box);
      g.fillStyle = style; g.strokeStyle = style;
      if (opt.outline) { g.globalAlpha = 1; g.setLineDash && g.setLineDash([R * 0.012, R * 0.01]); g.lineWidth = Math.max(1.5, R * 0.004); const o = geo.box; g.strokeRect(o[0], o[1], o[2] - o[0], o[3] - o[1]); g.restore(); continue; }
      // Live previews skip blur-based effects (glow, soft edges, shadow): they are the slowest canvas operation
      if (preview) { if (hard < 100 && !it.e) g.globalAlpha *= 0.75; strokeOrFill(g, geo, it); g.restore(); continue; }
      if (fx.shadow && !it.e) shadowPass(g, 'rgba(0,0,0,0.5)', R * 0.012 + lw * 0.3, R * 0.008, R * 0.012, () => strokeOrFill(g, geo, it));
      if (hard < 100 && !it.e) shadowPass(g, solidOf(it, x), ((100 - hard) / 100) * lw * 1.6 + 1, 0, 0, () => strokeOrFill(g, geo, it));
      else {
        if (fx.glow && !it.e) { g.shadowColor = solidOf(it, x); g.shadowBlur = Math.max(4, lw * 1.2); }
        strokeOrFill(g, geo, it);
        g.shadowBlur = 0;
      }
      if (kind.grain && !it.e) { const r = rng(it.sd || 9); g.save(); g.globalAlpha *= 0.35; g.lineWidth = lw * 0.5; g.translate((r() - 0.5) * lw, (r() - 0.5) * lw); strokeOrFill(g, geo, it); g.restore(); }
      if (fx.tex && !it.e && !preview) texture(g, geo, it, R);
      if (fx.glitter && !it.e && !preview) sparkles(g, geo, it, lw, R);
      g.restore();
    }
    g.restore();
  }

  /* ---------- bucket fill (raster, replayed in order so undo and export stay exact) ---------- */
  function fillCanvas(src, it, R, ocx, ocy) {
    const S = src.width, H = src.height || S, sg = src.getContext('2d');
    if (!sg || !sg.getImageData || !S) return null;
    let img;
    try { img = sg.getImageData(0, 0, S, H); } catch (e) { return null; }
    const d = img.data, N = S * H, mask = new Uint8Array(N), tol = it.tol != null ? it.tol : 40;
    const seeds = xforms(it).map(x => xfPoint([it.pts[0][0] * R, it.pts[0][1] * R], x, R, (ocx != null ? ocx : S / 2) + (it.ox || 0) * R, (ocy != null ? ocy : R) + (it.oy || 0) * R)).map(p => [Math.round(p[0]), Math.round(p[1])]).filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < S && p[1] < H);
    const stack = [];
    for (const [sx, sy] of seeds) {
      const si = sy * S + sx;
      if (mask[si]) continue;
      const o = si * 4, r0 = d[o], g0 = d[o + 1], b0 = d[o + 2], a0 = d[o + 3], clear = a0 < 64;
      const same = i => { const q = i * 4; if (clear) return d[q + 3] < 128; return Math.abs(d[q] - r0) <= tol && Math.abs(d[q + 1] - g0) <= tol && Math.abs(d[q + 2] - b0) <= tol && Math.abs(d[q + 3] - a0) <= tol * 2; };
      stack.push(si);
      while (stack.length) {
        const i = stack.pop();
        if (mask[i] || !same(i)) continue;
        const y = (i / S) | 0;
        let l = i, rr = i;
        while (l % S > 0 && !mask[l - 1] && same(l - 1)) l--;
        while (rr % S < S - 1 && !mask[rr + 1] && same(rr + 1)) rr++;
        for (let j = l; j <= rr; j++) {
          mask[j] = 1;
          if (y > 0 && !mask[j - S]) stack.push(j - S);
          if (y < H - 1 && !mask[j + S]) stack.push(j + S);
        }
      }
    }
    const out = document.createElement('canvas'); out.width = S; out.height = H;
    const og = out.getContext('2d');
    if (!og) return null;
    const mi = og.createImageData(S, H), md = mi.data;
    for (let i = 0; i < N; i++) {
      // grow the mask by one pixel so the fill tucks under anti-aliased edges
      if (mask[i] || (i % S > 0 && mask[i - 1]) || (i % S < S - 1 && mask[i + 1]) || (i >= S && mask[i - S]) || (i < N - S && mask[i + S])) md[i * 4 + 3] = 255;
    }
    og.putImageData(mi, 0, 0);
    og.globalCompositeOperation = 'source-in';
    og.translate(S / 2, R);
    const x0 = { k: 0, N: 1 };
    og.fillStyle = paintStyle(og, it, x0, R, [-S / 2, -R, S / 2, R]);
    og.fillRect(-S / 2, -R, S, H);
    og.setTransform(1, 0, 0, 1, 0, 0);
    og.globalCompositeOperation = 'source-atop';
    if (it.fx && it.fx.tex) { const r = rng((it.sd || 3) + 5); for (let i = 0; i < S * 2; i++) { og.fillStyle = r() < 0.5 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'; const s = R * (0.002 + r() * 0.004); og.fillRect(r() * S, r() * H, s, s); } }
    if (it.fx && it.fx.glitter) { const r = rng((it.sd || 7) + 11); for (let i = 0; i < 260; i++) { og.fillStyle = r() < 0.6 ? 'rgba(255,255,255,0.9)' : 'rgba(255,224,130,0.9)'; og.beginPath(); og.arc(r() * S, r() * H, Math.max(0.6, R * 0.004 + r() * R * 0.004), 0, 7); og.fill(); } }
    return out;
  }
  function drawFill(g, it, R, opt) {
    const src = g.canvas;
    if (!src) return;
    const fc = fillCanvas(src, it, R, opt && opt.cx, opt && opt.cy);
    if (!fc) return;
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = it.e ? 'destination-out' : 'source-over'; g.globalAlpha = it.o != null ? it.o : 1; g.drawImage(fc, 0, 0); g.restore();
  }

  /* ---------- document ---------- */
  let uid = 0;
  const newId = () => 'L' + Date.now().toString(36) + (uid++).toString(36);
  const newLayer = name => ({ id: newId(), name, visible: true, locked: false, opacity: 1, items: [] });
  const newDoc = (bg, layerName) => ({ v: 2, bg, tex: false, layers: [newLayer(layerName || 'Layer 1')], active: null });
  function validDoc(d) { return d && typeof d === 'object' && typeof d.bg === 'string' && Array.isArray(d.layers) && d.layers.every(L => L && Array.isArray(L.items)); }
  const clone = o => JSON.parse(JSON.stringify(o));

  let TEX = null;
  function floorTexture() {
    if (TEX) return TEX;
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d');
    if (!g) return null;
    const r = rng(7);
    for (let i = 0; i < 1400; i++) { g.fillStyle = r() < 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)'; g.fillRect(r() * 256, r() * 256, 1 + r() * 2, 1 + r() * 2); }
    TEX = c;
    return c;
  }
  function paintBackground(g, doc, W, H) {
    H = H || W;
    g.fillStyle = doc.bg; g.fillRect(0, 0, W, H);
    if (doc.tex) { const tx = floorTexture(); if (tx && g.createPattern) { const pat = g.createPattern(tx, 'repeat'); if (pat) { g.fillStyle = pat; g.fillRect(0, 0, W, H); } } }
  }
  // Canvas shape: width ÷ height. Square is 1.
  const ASPECTS = [1, 4 / 3, 3 / 2, 16 / 9, 2];
  const aspectOf = doc => { if (doc && doc.board) { const b = boardBounds(doc); return Math.max(0.2, Math.min(5, (b[2] - b[0]) / (b[3] - b[1]))); } const a = Number(doc && doc.ar); return a > 0.4 && a < 3 ? a : 1; };
  // How far each item reaches from its own centre, so a board export can crop to what is drawn
  function itemReach(it) {
    const pts = it.pts || [[0, 0]], far = Math.max(0, ...pts.map(p => Math.hypot(p[0], p[1])));
    const a = pts[0] || [0, 0], b = pts[1] || a, span = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const extra = it.t === 'stamp' ? (it.sz || 0.06) * 1.3 : it.t === 'text' ? (it.ts || 0.08) * Math.max(1, String(it.txt || '').length) * 0.32 : ['circle', 'poly'].includes(it.t) ? span : ((it.w || 4) / 500) * 1.5;
    let reach = far + extra;
    if (it.sym === 'tile' || it.sym === 'border') { const k = Math.max(1, it.k || 3); reach += ((k - 1) * 2) / k + (it.sym === 'border' ? 1 : 0); }
    return reach;
  }
  function boardBounds(doc) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    (doc.layers || []).forEach(L => { if (L.visible === false) return; L.items.forEach(it => { if (it.e) return; const r = itemReach(it), ox = it.ox || 0, oy = it.oy || 0; x0 = Math.min(x0, ox - r); y0 = Math.min(y0, oy - r); x1 = Math.max(x1, ox + r); y1 = Math.max(y1, oy + r); }); });
    if (!isFinite(x0)) return [-1, -1, 1, 1];
    const pad = Math.max(x1 - x0, y1 - y0) * 0.05;
    return [x0 - pad, y0 - pad, x1 + pad, y1 + pad];
  }
  // World units → export pixels for a W×H output
  function exportMap(doc, W, H) { if (!doc.board) return { R: H / 2, cx: W / 2, cy: H / 2 }; const b = boardBounds(doc), R = H / (b[3] - b[1]); return { R, cx: -b[0] * R, cy: -b[1] * R }; }
  const dims = (doc, S) => { const a = aspectOf(doc); return a >= 1 ? [S, Math.round(S / a)] : [Math.round(S * a), S]; };

  /* ---------- renderer: artwork, guides and live canvases ---------- */
  class Renderer {
    constructor(stack) {
      this.stack = stack;
      this.main = stack.querySelector('.cv-main'); this.guide = stack.querySelector('.cv-guide'); this.live = stack.querySelector('.cv-live');
      this.cache = new Map(); this.S = 0; this.W = 0; this.doc = null; this.hidden = new Set();
      this.cam = { x: 0, y: 0, z: 1 };
      this.guides = { radial: false, rings: 0, dots: 0, n: 8, mirror: true, rot: 0, sym: 'radial', k: 4, centre: [0, 0], grid: true };
    }
    ctx(cv) { return cv.getContext('2d'); }
    get board() { return !!(this.doc && this.doc.board); }
    // Drawing scale and where the world origin sits on the canvas.
    // Fixed canvas: origin at the middle, one unit = half the height. Infinite board: from the camera.
    get map() {
      const S = this.S, W = this.W || S;
      if (!this.board) return { R: S / 2, cx: W / 2, cy: S / 2 };
      const R = (S / 2) * this.cam.z;
      return { R, cx: W / 2 - this.cam.x * R, cy: S / 2 - this.cam.y * R };
    }
    // S is the canvas height in pixels; W is the width (wider for non-square shapes, the whole workspace on a board)
    resize(force) {
      const ar = aspectOf(this.doc);
      if (!this.board) this.stack.style.setProperty('--ar', String(ar));
      const r = this.main.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      let S, W;
      if (this.board) {
        W = Math.round((r.width || 600) * dpr); S = Math.round((r.height || r.width || 600) * dpr);
        const k = Math.min(1, 2400 / Math.max(W, S)); W = Math.round(W * k); S = Math.round(S * k);
      } else {
        S = Math.round(((r.height || (r.width || 600) / ar) || 600) * dpr); W = Math.round(S * ar);
        if (W > 2400) { W = 2400; S = Math.round(W / ar); }
        if (S > 2048) { S = 2048; W = Math.round(S * ar); }
      }
      S = Math.max(64, S); W = Math.max(64, W);
      if (!force && S === this.S && W === this.W) return;
      this.S = S; this.W = W;
      [this.main, this.guide, this.live].forEach(c => { c.width = W; c.height = S; });
      this.cache.clear();
      if (this.doc) this.renderAll();
      this.renderGuides();
    }
    setDoc(doc) { this.doc = doc; this.cache.clear(); if (doc && doc.cam) this.cam = Object.assign({ x: 0, y: 0, z: 1 }, doc.cam); if (!this.board) this.stack.style.setProperty('--ar', String(aspectOf(doc))); if (this.S) this.resize(true); }
    // Board camera moves redraw everything, at most once per frame
    setCamera(cam) {
      Object.assign(this.cam, cam);
      this.cam.z = Math.max(0.05, Math.min(40, this.cam.z));
      if (this.doc) this.doc.cam = { x: this.cam.x, y: this.cam.y, z: this.cam.z };
      if (this.camFrame) return;
      this.camFrame = requestAnimationFrame(() => { this.camFrame = 0; this.renderAll(); this.renderGuides(); });
    }
    worldAt(px, py) { const m = this.map; return [(px - m.cx) / m.R, (py - m.cy) / m.R]; }
    layerCanvas(L) {
      let c = this.cache.get(L.id);
      if (!c || c.width !== this.W || c.height !== this.S) { c = document.createElement('canvas'); c.width = this.W; c.height = this.S; this.cache.set(L.id, c); this.paintLayer(L, c); }
      return c;
    }
    paintLayer(L, c) {
      c = c || this.layerCanvas(L);
      const g = this.ctx(c);
      if (!g) return;
      g.clearRect(0, 0, this.W, this.S);
      const m = this.map;
      L.items.forEach(it => { if (!this.hidden.has(it)) drawItem(g, it, m.R, { cx: m.cx, cy: m.cy }); });
    }
    renderAll() { if (!this.doc) return; this.doc.layers.forEach(L => { const c = this.cache.get(L.id); if (c && c.width === this.W && c.height === this.S) this.paintLayer(L, c); else this.layerCanvas(L); }); this.composite(); }
    composite() {
      const g = this.ctx(this.main);
      if (!g || !this.doc) return;
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
      paintBackground(g, this.doc, this.W, this.S);
      this.doc.layers.forEach(L => { if (L.visible === false) return; g.globalAlpha = L.opacity != null ? L.opacity : 1; g.globalCompositeOperation = L.blend || 'source-over'; g.drawImage(this.layerCanvas(L), 0, 0); });
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    }
    commit(L, it) { const g = this.ctx(this.layerCanvas(L)), m = this.map; if (g) drawItem(g, it, m.R, { cx: m.cx, cy: m.cy }); this.composite(); this.clearLive(); }
    clearLive() { this.cancelLive(); const g = this.ctx(this.live); if (g) g.clearRect(0, 0, this.W, this.S); }
    cancelLive() { if (this.liveFrame) { cancelAnimationFrame(this.liveFrame); this.liveFrame = 0; } this.livePending = null; }
    // Pointer events can arrive far faster than the screen refreshes; draw at most once per frame
    drawLive(items, outline) {
      const first = !this.livePending;
      this.livePending = [items, outline];
      if (first && !this.liveFrame) this.liveFrame = requestAnimationFrame(() => { this.liveFrame = 0; const p = this.livePending; this.livePending = null; if (p) this.paintLive(p[0], p[1]); });
    }
    paintLive(items, outline) {
      const g = this.ctx(this.live);
      if (!g) return;
      g.clearRect(0, 0, this.W, this.S);
      const m = this.map, o = { cx: m.cx, cy: m.cy };
      (Array.isArray(items) ? items : [items]).forEach(it => it && drawItem(g, it, m.R, Object.assign({ preview: true }, o)));
      (outline || []).forEach(it => it && drawItem(g, it, m.R, Object.assign({ preview: true, outline: 'rgba(255,159,28,0.95)' }, o)));
      const mq = this.marquee;
      if (mq) {
        const R = m.R, x0 = m.cx + Math.min(mq[0], mq[2]) * R, y0 = m.cy + Math.min(mq[1], mq[3]) * R;
        g.save(); g.fillStyle = 'rgba(255,159,28,0.10)'; g.strokeStyle = 'rgba(255,159,28,0.95)'; g.lineWidth = Math.max(1.5, this.S * 0.002);
        g.setLineDash && g.setLineDash([this.S * 0.008, this.S * 0.005]);
        g.fillRect(x0, y0, Math.abs(mq[2] - mq[0]) * R, Math.abs(mq[3] - mq[1]) * R); g.strokeRect(x0, y0, Math.abs(mq[2] - mq[0]) * R, Math.abs(mq[3] - mq[1]) * R);
        g.restore();
      }
    }
    renderGuides(opts) {
      if (opts) Object.assign(this.guides, opts);
      const G = this.guides, g = this.ctx(this.guide), S = this.S, W = this.W || S, m = this.map, R = m.R;
      if (!g || !S) return;
      g.clearRect(0, 0, W, S);
      const dark = this.doc ? lum(this.doc.bg) < 0.55 : true;
      const ink = dark ? 'rgba(255,255,255,' : 'rgba(30,20,50,';
      const c = G.centre || [0, 0], ccx = m.cx + c[0] * R, ccy = m.cy + c[1] * R;
      g.lineWidth = Math.max(1, S / 900);
      // draw.io-style grid on the infinite board: fine lines plus a stronger line every 5
      if (this.board && G.grid !== false) {
        let step = 0.1;
        while (step * R < 14) step *= 5;
        while (step * R > 70) step /= 5;
        const [wx0, wy0] = this.worldAt(0, 0), [wx1, wy1] = this.worldAt(W, S);
        for (let x = Math.floor(wx0 / step) * step; x <= wx1; x += step) { const px = m.cx + x * R, major = Math.abs(Math.round(x / step)) % 5 === 0; g.strokeStyle = ink + (major ? '0.13)' : '0.055)'); g.beginPath(); g.moveTo(px, 0); g.lineTo(px, S); g.stroke(); }
        for (let y = Math.floor(wy0 / step) * step; y <= wy1; y += step) { const py = m.cy + y * R, major = Math.abs(Math.round(y / step)) % 5 === 0; g.strokeStyle = ink + (major ? '0.13)' : '0.055)'); g.beginPath(); g.moveTo(0, py); g.lineTo(W, py); g.stroke(); }
      }
      if (G.dots > 1) {
        const stepU = 2 / G.dots, stepPx = stepU * R;
        g.fillStyle = ink + '0.38)';
        if (this.board) {
          if (stepPx > 6) { const [wx0, wy0] = this.worldAt(0, 0), [wx1, wy1] = this.worldAt(W, S); for (let x = Math.floor(wx0 / stepU) * stepU; x <= wx1; x += stepU) for (let y = Math.floor(wy0 / stepU) * stepU; y <= wy1; y += stepU) { g.beginPath(); g.arc(m.cx + x * R, m.cy + y * R, Math.max(1.5, S / 420), 0, 7); g.fill(); } }
        } else {
          const cols = Math.floor(W / stepPx), x0 = (W - cols * stepPx) / 2;
          for (let i = 0; i < cols; i++) for (let j = 0; j < G.dots; j++) { g.beginPath(); g.arc(x0 + stepPx * (i + 0.5), stepPx * (j + 0.5), Math.max(1.5, S / 420), 0, 7); g.fill(); }
        }
      }
      if (G.sym === 'tile' || G.sym === 'border') {
        const k = Math.max(1, G.k || 4), cell = (2 / k) * R;
        g.strokeStyle = ink + '0.22)';
        if (G.sym === 'tile') {
          for (let x = ccx % cell; x < W; x += cell) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, S); g.stroke(); }
          for (let y = ccy % cell; y < S; y += cell) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
        } else { g.strokeRect(ccx - R + cell * 0.02, ccy - R + cell * 0.02, 2 * R - cell * 0.04, 2 * R - cell * 0.04); g.strokeRect(ccx - R + cell, ccy - R + cell, 2 * R - 2 * cell, 2 * R - 2 * cell); }
      } else {
        if (G.rings > 0) {
          g.strokeStyle = ink + '0.16)';
          for (let i = 1; i <= G.rings; i++) { g.beginPath(); g.arc(ccx, ccy, (R * i) / G.rings, 0, 7); g.stroke(); }
        }
        if (G.radial) {
          const n = Math.max(1, G.n), lines = n * (G.mirror ? 2 : 1), len = this.board ? R : Math.hypot(W, S) / 2;
          for (let k = 0; k < lines; k++) {
            const a = ((G.rot || 0) * Math.PI) / 180 + (k * Math.PI * 2) / lines - Math.PI / 2;
            g.strokeStyle = ink + (k % (G.mirror ? 2 : 1) === 0 ? '0.3)' : '0.14)');
            g.beginPath(); g.moveTo(ccx, ccy); g.lineTo(ccx + len * Math.cos(a), ccy + len * Math.sin(a)); g.stroke();
          }
        }
      }
      // symmetry centre marker (shown when it has been moved, and always on the board)
      if (this.board || c[0] || c[1]) {
        const s = Math.max(8, S * 0.012);
        g.save(); g.strokeStyle = 'rgba(255,159,28,0.95)'; g.lineWidth = Math.max(1.5, S / 600);
        g.beginPath(); g.arc(ccx, ccy, s, 0, 7); g.moveTo(ccx - s * 1.8, ccy); g.lineTo(ccx + s * 1.8, ccy); g.moveTo(ccx, ccy - s * 1.8); g.lineTo(ccx, ccy + s * 1.8); g.stroke();
        g.restore();
      }
    }
    // Pointer → world coordinates (units: half the canvas height on a fixed canvas; camera-scaled on a board)
    toNorm(e) {
      const r = this.main.getBoundingClientRect(), h = r.height || r.width;
      if (!this.board) return [((e.clientX - r.left - r.width / 2) / h) * 2, ((e.clientY - r.top) / h) * 2 - 1];
      const k = this.W / (r.width || this.W);
      return this.worldAt((e.clientX - r.left) * k, (e.clientY - r.top) * k);
    }
    get aspect() { return aspectOf(this.doc); }
  }

  /* ---------- hit testing (Studio selection) ---------- */
  let HIT = null;
  function hitTest(items, p, R) {
    R = R || 300;
    if (!HIT) { const c = document.createElement('canvas'); c.width = c.height = R * 2; HIT = c.getContext('2d'); }
    if (!HIT || !HIT.isPointInPath) return null;
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      const px = [(p[0] - (it.ox || 0) + 1) * R, (p[1] - (it.oy || 0) + 1) * R];
      if (it.t === 'fill' || it.e) continue;
      const geo = geom(it, R);
      if (!geo.p2d) continue;
      const lw = geo.lw * ((it.t === 'stroke' && KIND[it.brush || 'brush'] || KIND.brush).w || 1);
      for (const x of xforms(it)) {
        const [lx, ly] = xfInverse(px, x, R);
        let on = false;
        HIT.lineWidth = Math.max(lw, R * 0.03);
        geo.paths.forEach((pth, j) => { if (on) return; const path = geo.p2d.paths[j]; on = pth.mode === 'fill' ? HIT.isPointInPath(path, lx, ly) || HIT.isPointInStroke(path, lx, ly) : HIT.isPointInStroke(path, lx, ly); });
        if (!on && (geo.dabs || geo.segs)) on = geo.samples.some(s => Math.hypot(s[0] - lx, s[1] - ly) < Math.max(lw, R * 0.03));
        if (!on && geo.text) { const b = geo.box; on = lx >= b[0] && lx <= b[2] && ly >= b[1] && ly <= b[3]; }
        if (on) return { index: i, item: it, x };
      }
    }
    return null;
  }

  /* ---------- export ---------- */
  // S is the long side in pixels
  function exportCanvas(doc, S, opt) {
    const [W, H] = dims(doc, S);
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d');
    if (!g) return c;
    if (!opt || opt.bg !== false) paintBackground(g, doc, W, H);
    doc.layers.forEach(L => {
      if (L.visible === false) return;
      const lc = document.createElement('canvas'); lc.width = W; lc.height = H;
      const lg = lc.getContext('2d');
      const em = exportMap(doc, W, H);
      L.items.forEach(it => drawItem(lg, it, em.R, { cx: em.cx, cy: em.cy }));
      g.globalAlpha = L.opacity != null ? L.opacity : 1; g.globalCompositeOperation = L.blend || 'source-over'; g.drawImage(lc, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    });
    return c;
  }
  function exportSVG(doc, opt) {
    const S = 1000, W = Math.round(S * aspectOf(doc)), EM = exportMap(doc, W, S), R = EM.R, CX = EM.cx, CY = EM.cy, withBg = !opt || opt.bg !== false;
    let defs = '', body = '', id = 0;
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    for (const L of doc.layers) {
      if (L.visible === false) continue;
      let inner = '';
      const hasFill = L.items.some(it => it.t === 'fill');
      let lc = null, lg = null;
      if (hasFill) { lc = document.createElement('canvas'); lc.width = W; lc.height = S; lg = lc.getContext('2d'); }
      for (const it of L.items) {
        if (it.t === 'fill') {
          if (lg) {
            const fc = fillCanvas(lc, it, R, CX, CY);
            if (fc && fc.toDataURL) {
              const url = fc.toDataURL('image/png');
              const img = `<image href="${url}" xlink:href="${url}" x="0" y="0" width="${W}" height="${S}"${it.o != null && it.o < 1 ? ` opacity="${it.o}"` : ''}/>`;
              if (it.e) { const mid = 'm' + id++; defs += `<mask id="${mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${S}"><rect width="${W}" height="${S}" fill="#fff"/>${img.replace('<image', '<image style="filter:brightness(0)"')}</mask>`; inner = `<g mask="url(#${mid})">${inner}</g>`; }
              else inner += img;
            }
            drawItem(lg, it, R, { cx: CX, cy: CY });
          }
          continue;
        }
        if (lg) drawItem(lg, it, R, { cx: CX, cy: CY });
        const geo = geom(it, R);
        const kind = it.t === 'stroke' ? KIND[it.brush || 'brush'] || KIND.brush : KIND.brush;
        const lw = geo.lw * (kind.w || 1), fx = it.fx || {}, op = (it.o != null ? it.o : 1) * (kind.a || 1);
        const hard = kind.soft ? 0 : it.hd != null ? it.hd : 100;
        const parts = [];
        geo.paths.forEach(p => parts.push({ d: p.d, mode: p.mode }));
        if (geo.dabs) parts.push({ d: geo.dabs, mode: 'fill' });
        let segsSvg = '';
        if (geo.segs) segsSvg = geo.segs.map(s => `<line x1="${f(s[0])}" y1="${f(s[1])}" x2="${f(s[2])}" y2="${f(s[3])}" stroke-width="${f(lw * s[4])}"/>`).join('');
        const pid = 'p' + id++;
        const textSvg = geo.text ? `<text x="${f(geo.text.x)}" y="${f(geo.text.y)}" font-family="${esc(geo.text.family)}, Nirmala UI, sans-serif" font-size="${f(geo.text.fs)}" font-weight="${it.bold ? 700 : 400}" text-anchor="middle" dominant-baseline="central" stroke="none">${esc(it.txt || '')}</text>` : '';
        defs += `<g id="${pid}">${parts.map(p => `<path d="${p.d}"${p.mode === 'fill' ? ' stroke="none"' : ' fill="none"'}/>`).join('')}${segsSvg ? `<g fill="none">${segsSvg}</g>` : ''}${textSvg}</g>`;
        // paint server
        let fillRef = null;
        const c = isHex(it.c) ? it.c : '#FFFFFF', c2 = isHex(it.c2) ? it.c2 : '#FFD23F';
        if (!it.e && !it.rb) {
          if (fx.metal) { const gid = 'g' + id++; defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(c, -0.45)}"/><stop offset=".42" stop-color="${shade(c, 0.55)}"/><stop offset=".5" stop-color="#fff"/><stop offset=".6" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -0.5)}"/></linearGradient>`; fillRef = `url(#${gid})`; }
          else if (it.paint === 'radial') { const gid = 'g' + id++; defs += `<radialGradient id="${gid}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="${R}"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`; fillRef = `url(#${gid})`; }
          else if (it.paint === 'linear') { const gid = 'g' + id++; defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`; fillRef = `url(#${gid})`; }
          else if (it.paint === 'pattern') {
            const gid = 'g' + id++, s = Math.max(6, Math.round(R * 0.05)), bg = `<rect width="${s}" height="${s}" fill="${c2}"/>`;
            const fg = { dots: `<circle cx="${s / 2}" cy="${s / 2}" r="${f(s * 0.22)}" fill="${c}"/>`, stripes: `<path d="M0 ${s}L${s} 0M${-s / 2} ${s / 2}L${s / 2} ${-s / 2}M${s / 2} ${s * 1.5}L${s * 1.5} ${s / 2}" stroke="${c}" stroke-width="${f(s * 0.18)}"/>`, checks: `<rect width="${s / 2}" height="${s / 2}" fill="${c}"/><rect x="${s / 2}" y="${s / 2}" width="${s / 2}" height="${s / 2}" fill="${c}"/>`, zigzag: `<path d="M0 ${f(s * 0.7)}L${s / 2} ${f(s * 0.3)}L${s} ${f(s * 0.7)}" fill="none" stroke="${c}" stroke-width="${f(s * 0.18)}"/>` }[it.pat || 'dots'];
            defs += `<pattern id="${gid}" patternUnits="userSpaceOnUse" width="${s}" height="${s}">${bg}${fg}</pattern>`;
            fillRef = `url(#${gid})`;
          }
        }
        // filters
        let filt = '';
        if (!it.e && (fx.glow || fx.shadow || hard < 100)) {
          const fid = 'f' + id++;
          let fe = '';
          if (hard < 100) fe += `<feGaussianBlur stdDeviation="${f(((100 - hard) / 100) * lw * 0.8 + 0.5)}"/>`;
          else if (fx.glow) fe += `<feGaussianBlur in="SourceGraphic" stdDeviation="${f(Math.max(2, lw * 0.6))}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>`;
          if (fx.shadow) fe = `<feDropShadow dx="${f(R * 0.008)}" dy="${f(R * 0.012)}" stdDeviation="${f(R * 0.006 + lw * 0.15)}" flood-color="#000" flood-opacity=".5"/>` + fe;
          defs += `<filter id="${fid}" x="-50%" y="-50%" width="200%" height="200%">${fe}</filter>`;
          filt = ` filter="url(#${fid})"`;
        }
        const cap = it.tip === 'square' ? 'square' : kind.cap || 'round', join = it.tip === 'square' ? 'miter' : kind.join || 'round';
        let glit = '';
        if (fx.glitter && !it.e) {
          const r = rng((it.sd || 7) + 11), pts = geo.samples, n = Math.min(160, Math.max(6, Math.round(pts.length * 1.3)));
          for (let i = 0; i < n && pts.length; i++) { const p = pts[Math.floor(r() * pts.length)], j = lw * 0.6, x = p[0] + (r() - 0.5) * j * 2, y = p[1] + (r() - 0.5) * j * 2, s = Math.max(0.6, R * 0.004 + r() * lw * 0.12); glit += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s)}" fill="${r() < 0.6 ? '#fff' : '#FFE082'}"/>`; r(); }
          if (glit) { const gl = 'p' + id++; defs += `<g id="${gl}">${glit}</g>`; glit = gl; }
        }
        const uses = xforms(it).map(x => {
          const col = it.e ? '#000' : it.rb ? rainbow(x.k, x.N) : fillRef || c;
          const tr = `rotate(${f((x.a * 180) / Math.PI)}) scale(${x.m} 1)${x.tx || x.ty ? ` translate(${f(x.tx * R)} ${f(x.ty * R)})` : ''}`;
          return `<g transform="${tr}"><use href="#${pid}" xlink:href="#${pid}" fill="${col}" stroke="${col}" stroke-width="${f(lw)}" stroke-linecap="${cap}" stroke-linejoin="${join}"${filt}/>${glit ? `<use href="#${glit}" xlink:href="#${glit}"/>` : ''}</g>`;
        }).join('');
        const grp = `<g transform="translate(${f(CX + (it.ox || 0) * R)} ${f(CY + (it.oy || 0) * R)})"${op < 1 ? ` opacity="${f(op)}"` : ''}>${uses}</g>`;
        if (it.e) {
          const mid = 'm' + id++;
          defs += `<mask id="${mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${S}"><rect width="${W}" height="${S}" fill="#fff"/>${grp}</mask>`;
          inner = `<g mask="url(#${mid})">${inner}</g>`;
        } else inner += grp;
      }
      body += `<g opacity="${L.opacity != null ? L.opacity : 1}"${L.blend && L.blend !== 'source-over' ? ` style="mix-blend-mode:${L.blend}"` : ''} data-layer="${esc(L.name || '')}">${inner}</g>`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${S}" width="${W}" height="${S}"><defs>${defs}</defs>${withBg ? `<rect width="${W}" height="${S}" fill="${doc.bg}"/>` : ''}${body}</svg>`;
  }

  /* ---------- where every copy of an item lands (normalised coords), for marquee selection ---------- */
  function copyCentres(it) {
    const n = it.pts.length, c = [it.pts.reduce((a, p) => a + p[0], 0) / n, it.pts.reduce((a, p) => a + p[1], 0) / n];
    return xforms(it).map(x => { const p = xfPoint(c, x, 1, 0, 0); return [p[0] + (it.ox || 0), p[1] + (it.oy || 0)]; });
  }
  /* ---------- stencil: black outlines on white, for cutting or tracing ---------- */
  function stencil(doc) {
    const d = clone(doc);
    d.bg = '#FFFFFF'; d.tex = false;
    d.layers.forEach(L => {
      L.opacity = 1; L.blend = 'source-over';
      L.items = L.items.filter(it => it.t !== 'fill' || it.e).map(it => Object.assign(it, {
        c: '#000000', paint: 'solid', rb: false, fx: {}, o: 1, hd: 100,
        f: ['circle', 'petal', 'poly'].includes(it.t) ? false : it.f,
        w: ['circle', 'petal', 'poly', 'line', 'curve'].includes(it.t) ? Math.max(3, Math.min(it.w || 4, 8)) : it.w,
        brush: it.t === 'stroke' && ['chalk', 'spray', 'airbrush', 'highlighter'].includes(it.brush) ? 'brush' : it.brush
      }));
    });
    return d;
  }

  /* ---------- snapping (Studio) ---------- */
  function snap(p, o) {
    if (o.dots > 1) {
      // same dot positions the guide draws: centred columns across the (possibly wider) canvas
      const step = 2 / o.dots, cols = Math.floor(o.dots * (o.ar || 1));
      const i = Math.max(0, Math.min(cols - 1, Math.round(p[0] / step + cols / 2 - 0.5))), j = Math.max(0, Math.min(o.dots - 1, Math.round((p[1] + 1) / step - 0.5)));
      return [(i + 0.5 - cols / 2) * step, (j + 0.5) * step - 1];
    }
    if (o.sym === 'tile' || o.sym === 'border') { const step = 2 / Math.max(1, o.k || 4) / 4; return [Math.round(p[0] / step) * step, Math.round(p[1] / step) * step]; }
    const r = Math.hypot(p[0], p[1]);
    if (r < 0.02) return [0, 0];
    const lines = Math.max(1, o.n) * (o.mirror ? 2 : 1) * 2, astep = (Math.PI * 2) / lines, base = ((o.rot || 0) * Math.PI) / 180 - Math.PI / 2;
    const a = Math.round((Math.atan2(p[1], p[0]) - base) / astep) * astep + base;
    const rs = o.rings > 0 ? Math.round(r * o.rings * 2) / (o.rings * 2) : r;
    return [rs * Math.cos(a), rs * Math.sin(a)];
  }

  /* ---------- motif rings & the surprise generator ---------- */
  const MOTIFS = ['petals', 'dots', 'scallops', 'diamonds', 'leaves', 'ring', 'flowers', 'centre'];
  function motif(type, r, size, base) {
    const n = Math.max(1, base.n || 8), up = -Math.PI / 2, x = r * Math.cos(up), y = r * Math.sin(up);
    const at = (rr, a) => [rr * Math.cos(up + a), rr * Math.sin(up + a)];
    const it = Object.assign({ o: 1, rot: 0, m: false, sd: newSeed() }, base, { sym: 'radial' });
    switch (type) {
      case 'petals': return Object.assign(it, { t: 'petal', pts: [at(r - size / 2, 0), at(r + size / 2, 0)], pw: 0.42, f: true });
      case 'dots': return Object.assign(it, { t: 'dot', pts: [[x, y]], w: size * 260 });
      case 'scallops': return Object.assign(it, { t: 'circle', pts: [[x, y], [x + r * Math.sin(Math.PI / n), y]], f: false });
      case 'diamonds': return Object.assign(it, { t: 'poly', s: 4, pts: [[x, y], at(r + size / 2, 0)], f: true });
      case 'leaves': return Object.assign(it, { t: 'petal', pts: [at(r, -size / (2 * Math.max(r, 0.1))), at(r, size / (2 * Math.max(r, 0.1)))], pw: 0.32, f: true });
      case 'ring': return Object.assign(it, { t: 'circle', pts: [[0, 0], [0, -r]], n: 1, m: false, f: false });
      case 'flowers': return Object.assign(it, { t: 'stamp', st: 'flower', pts: [[x, y]], sz: size * 0.55 });
      case 'centre': return Object.assign(it, { t: 'circle', pts: [[0, 0], [0, -r]], n: 1, m: false, f: true });
      default: return null;
    }
  }
  function surprise(seed, palette, opt) {
    const r = rng(seed), n = pickR(r, [6, 8, 8, 12, 12, 16]), items = [];
    const base = { n, m: true, fx: opt && opt.glow ? { glow: true } : {} };
    items.push({ t: 'dot', pts: [[0, 0]], w: 45, c: pickR(r, palette), n: 1, m: false, o: 1, rot: 0, sym: 'radial', sd: 1 });
    let rad = 0.1;
    const lineW = opt && opt.fine ? 3 : 8;
    for (let i = 0; i < 9 && rad < 0.9; i++) {
      const type = pickR(r, ['petals', 'petals', 'dots', 'scallops', 'diamonds', 'leaves', 'ring', 'flowers']);
      const size = 0.06 + r() * 0.1;
      rad += size * 0.75 + 0.02;
      if (rad + size / 2 > 0.97) break;
      const it = motif(type, rad, size, Object.assign({}, base, { c: pickR(r, palette), w: lineW, rot: r() < 0.5 ? 0 : 180 / n, sd: Math.floor(r() * 1e9) }));
      if (it) items.push(it);
      rad += size * 0.3;
    }
    return { n, items };
  }

  /* ---------- brand mark ---------- */
  function logoSVG(size) {
    const petals = [0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = (k * Math.PI) / 4 - Math.PI / 2; return `<path d="${petalPath([20 + 4 * Math.cos(a), 20 + 4 * Math.sin(a)], [20 + 18 * Math.cos(a), 20 + 18 * Math.sin(a)], 0.42)}" fill="${k % 2 ? '#D7263D' : '#FF9F1C'}"/>`; }).join('');
    return `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">${petals}<circle cx="20" cy="20" r="6.5" fill="#1B998B"/><circle cx="20" cy="20" r="2.6" fill="#FFD23F"/></svg>`;
  }

  return {
    t, addStrings, applyI18n, setLang, onLang: fn => langListeners.push(fn), get lang() { return LANG; },
    store, saveFile, canvasBlob, dlReady, get canSave() { return !!DL || !inViewer; }, stamp,
    wake, tone, sfx, sound,
    rng, pickR, newSeed, hexToRgb, rgbToHex, hsvToHex, hexToHsv, shade, lum, isHex,
    Renderer, drawItem, geom, xforms, xfDelta, hitTest, petalPath, circlePath, polyPath, starPoly, stampPath, STAMPS, BRUSHES, SYMS, PATTERNS,
    newDoc, newLayer, validDoc, clone, exportCanvas, exportSVG, paintBackground, ASPECTS, aspectOf, dims, copyCentres, stencil, boardBounds, exportMap, snap, motif, MOTIFS, surprise, logoSVG
  };
})();
