/* =====================================================================
   Export: PNG · JPG · WEBP · SVG · PDF · video (WebM) · project JSON
   Shared engine plus the Studio export window and the Kids save chooser.
   ===================================================================== */
RM.addStrings({
  export: ['Export', 'एक्सपोर्ट', 'निर्यात'], exportTitle: ['Export design', 'डिज़ाइन एक्सपोर्ट करें', 'डिझाइन निर्यात करा'], format: ['Format', 'फ़ॉर्मेट', 'स्वरूप'],
  f_png: ['PNG image', 'PNG चित्र', 'PNG चित्र'], f_png_d: ['Sharp image, can be transparent', 'साफ़ चित्र, पारदर्शी भी हो सकता है', 'स्पष्ट चित्र, पारदर्शकही होऊ शकतं'],
  f_jpg: ['JPG photo', 'JPG फ़ोटो', 'JPG फोटो'], f_jpg_d: ['Small file for sharing and WhatsApp', 'शेयर और WhatsApp के लिए छोटी फ़ाइल', 'शेअर आणि WhatsApp साठी लहान फाइल'],
  f_webp: ['WEBP image', 'WEBP चित्र', 'WEBP चित्र'], f_webp_d: ['Modern format, small and sharp', 'आधुनिक फ़ॉर्मेट, छोटा और साफ़', 'आधुनिक स्वरूप, लहान आणि स्पष्ट'],
  f_svg: ['SVG vector', 'SVG वेक्टर', 'SVG व्हेक्टर'], f_svg_d: ['Scales to any size, for print and editing', 'किसी भी आकार में, प्रिंट और एडिटिंग के लिए', 'कोणत्याही आकारात, छपाई आणि संपादनासाठी'],
  f_pdf: ['PDF document', 'PDF दस्तावेज़', 'PDF दस्तऐवज'], f_pdf_d: ['Ready to print', 'प्रिंट के लिए तैयार', 'छपाईसाठी तयार'],
  f_webm: ['Video', 'वीडियो', 'व्हिडिओ'], f_webm_d: ['Watch the rangoli being drawn (WebM)', 'रंगोली बनते हुए देखें (WebM)', 'रांगोळी काढली जाताना पाहा (WebM)'],
  f_json: ['Project file', 'प्रोजेक्ट फ़ाइल', 'प्रोजेक्ट फाइल'], f_json_d: ['Open later to keep editing', 'बाद में खोलकर एडिट जारी रखें', 'नंतर उघडून संपादन चालू ठेवा'],
  expSizeL: ['Size', 'आकार', 'आकार'], bgInclude: ['Include background', 'पृष्ठभूमि शामिल करें', 'पार्श्वभूमी समाविष्ट करा'], bgNote: ['Turn off for a transparent background', 'पारदर्शी पृष्ठभूमि के लिए बंद करें', 'पारदर्शक पार्श्वभूमीसाठी बंद करा'],
  quality: ['Quality', 'गुणवत्ता', 'गुणवत्ता'], page: ['Page', 'पेज', 'पान'], pgSquare: ['Square', 'वर्गाकार', 'चौरस'], pgA4: ['A4 portrait', 'A4 खड़ा', 'A4 उभं'], pgA4L: ['A4 landscape', 'A4 आड़ा', 'A4 आडवं'],
  videoLen: ['Length', 'अवधि', 'कालावधी'], fileName: ['File name', 'फ़ाइल का नाम', 'फाइलचं नाव'], doExport: ['Export', 'एक्सपोर्ट करें', 'निर्यात करा'],
  preparing: ['Preparing…', 'तैयार हो रहा है…', 'तयार होत आहे…'], recording: ['Recording video… {p}%', 'वीडियो बन रहा है… {p}%', 'व्हिडिओ तयार होत आहे… {p}%'],
  noSaveHere: ['This view does not allow downloads. Open the link in a browser tab on claude.ai, or open rangoli-maker.html from your computer, to export.', 'इस व्यू में डाउनलोड की अनुमति नहीं है। एक्सपोर्ट के लिए claude.ai पर ब्राउज़र टैब में लिंक खोलें, या अपने कंप्यूटर से rangoli-maker.html खोलें।', 'या दृश्यात डाउनलोडला परवानगी नाही. निर्यातीसाठी claude.ai वर ब्राउझर टॅबमध्ये लिंक उघडा, किंवा तुमच्या संगणकावरून rangoli-maker.html उघडा.'],
  expDone: ['Saved {f}', '{f} सहेजी गई', '{f} जतन झाली'], expFail: ['The file was not saved.', 'फ़ाइल सहेजी नहीं गई।', 'फाइल जतन झाली नाही.'],
  expCancel: ['Cancel', 'रद्द करें', 'रद्द करा'],
  stencilL: ['Stencil: black outlines on white', 'स्टेंसिल: सफ़ेद पर काली रेखाएँ', 'स्टेन्सिल: पांढऱ्यावर काळ्या रेषा'], stencilNote: ['For cutting a stencil or tracing the design on the floor', 'स्टेंसिल काटने या डिज़ाइन ज़मीन पर उतारने के लिए', 'स्टेन्सिल कापण्यासाठी किंवा नक्षी जमिनीवर उतरवण्यासाठी'], expClose: ['Close', 'बंद करें', 'बंद करा'], vector: ['Vector, any size', 'वेक्टर, कोई भी आकार', 'व्हेक्टर, कोणताही आकार'],
  kSaveTitle: ['How do you want to save it?', 'कैसे सहेजना है?', 'कसं जतन करायचं?'],
  kx_png: ['Picture', 'चित्र', 'चित्र'], kx_png_d: ['Best quality', 'सबसे अच्छी क्वालिटी', 'सर्वोत्तम दर्जा'],
  kx_jpg: ['Photo', 'फ़ोटो', 'फोटो'], kx_jpg_d: ['Small and easy to share', 'छोटी और शेयर करने में आसान', 'लहान आणि शेअर करायला सोपी'],
  kx_pdf: ['Print page', 'प्रिंट पेज', 'छपाईचं पान'], kx_pdf_d: ['An A4 page to print', 'प्रिंट के लिए A4 पेज', 'छापण्यासाठी A4 पान'],
  kx_webm: ['Magic video', 'जादुई वीडियो', 'जादूचा व्हिडिओ'], kx_webm_d: ['Watch it grow!', 'बनते हुए देखो!', 'वाढताना बघ!']
});

(() => {
  const FORMATS = ['png', 'jpg', 'webp', 'svg', 'pdf', 'webm', 'json'];
  const f2 = v => Math.round(v * 100) / 100;
  let webpOK = null;
  function supports(fmt) {
    if (fmt === 'webp') {
      if (webpOK == null) { try { webpOK = document.createElement('canvas').toDataURL('image/webp').indexOf('image/webp') === 5; } catch (e) { webpOK = false; } }
      return webpOK;
    }
    if (fmt === 'webm') return !!(window.MediaRecorder && HTMLCanvasElement.prototype.captureStream && MediaRecorder.isTypeSupported && (MediaRecorder.isTypeSupported('video/webm;codecs=vp9') || MediaRecorder.isTypeSupported('video/webm')));
    return true;
  }
  const toBlob = (cv, type, q) => new Promise(res => cv.toBlob(b => res(b), type, q));
  const blobBytes = b => (b.arrayBuffer ? b.arrayBuffer() : new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsArrayBuffer(b); })).then(x => new Uint8Array(x));
  function opaque(cv) {
    // JPEG and PDF have no transparency, so lay the drawing on white first
    const out = document.createElement('canvas'); out.width = cv.width; out.height = cv.height;
    const g = out.getContext('2d');
    if (!g) return cv;
    g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, out.width, out.height); g.drawImage(cv, 0, 0);
    return out;
  }

  /* ---------- PDF: one page with the design as a JPEG image ---------- */
  function makePDF(jpg, iw, ih, page, caption) {
    const enc = new TextEncoder(), parts = [], offsets = [];
    let len = 0;
    const push = x => { const b = typeof x === 'string' ? enc.encode(x) : x; parts.push(b); len += b.length; };
    const obj = (n, body) => { offsets[n] = len; push(`${n} 0 obj\n`); body(); push('\nendobj\n'); };
    const [W, H] = page === 'a4' ? [595.28, 841.89] : page === 'a4l' ? [841.89, 595.28] : [595.28, 595.28];
    const sq = page === 'square', m = sq ? 0 : 42, availW = W - 2 * m, availH = sq ? H : H - 2 * m - 34;
    let bw = availW, bh = bw * (ih / iw);
    if (bh > availH) { bh = availH; bw = bh * (iw / ih); }
    const x = (W - bw) / 2, y = sq ? (H - bh) / 2 : H - m - bh - (page === 'a4l' ? 0 : 20);
    let content = `q ${f2(bw)} 0 0 ${f2(bh)} ${f2(x)} ${f2(y)} cm /Im0 Do Q`;
    if (!sq && caption) content += `\nBT /F1 11 Tf 0.35 0.33 0.42 rg ${f2(x)} ${f2(y - 22)} Td (${caption.replace(/[\\()]/g, '\\$&').replace(/[^\x20-\x7E]/g, '')}) Tj ET`;
    push(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34, 0x0A, 0x25, 0xE2, 0xE3, 0xCF, 0xD3, 0x0A]));
    obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
    obj(2, () => push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'));
    obj(3, () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${f2(W)} ${f2(H)}] /Resources << /XObject << /Im0 4 0 R >> /Font << /F1 6 0 R >> >> /Contents 5 0 R >>`));
    obj(4, () => { push(`<< /Type /XObject /Subtype /Image /Width ${iw} /Height ${ih} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`); push(jpg); push('\nendstream'); });
    obj(5, () => { const c = enc.encode(content); push(`<< /Length ${c.length} >>\nstream\n`); push(c); push('\nendstream'); });
    obj(6, () => push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'));
    const xref = len;
    push(`xref\n0 7\n0000000000 65535 f \n${[1, 2, 3, 4, 5, 6].map(n => String(offsets[n]).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
    const out = new Uint8Array(len);
    let o = 0;
    parts.forEach(p => { out.set(p, o); o += p.length; });
    return out;
  }

  /* ---------- video: the rangoli appears item by item, then holds ---------- */
  async function recordVideo(doc, S, seconds, onProgress) {
    const [W, H] = RM.dims(doc, S);
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const g = cv.getContext('2d'), stream = cv.captureStream(30);
    const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(m => MediaRecorder.isTypeSupported(m));
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: S >= 1080 ? 8e6 : 5e6 });
    const chunks = [];
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    const stopped = new Promise(r => { rec.onstop = r; });
    const items = [], layers = doc.layers.map(() => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; });
    doc.layers.forEach((L, i) => { if (L.visible !== false) L.items.forEach(it => items.push([i, it])); });
    rec.start(250);
    const total = seconds * 1000, build = total * 0.78, t0 = performance.now();
    let drawn = 0;
    await new Promise(resolve => {
      const frame = () => {
        const t = performance.now() - t0, target = Math.min(items.length, Math.ceil(items.length * Math.min(1, t / build)));
        while (drawn < target) { const [li, it] = items[drawn++]; RM.drawItem(layers[li].getContext('2d'), it, H / 2); }
        RM.paintBackground(g, doc, W, H);
        doc.layers.forEach((L, i) => { if (L.visible === false) return; g.globalAlpha = L.opacity != null ? L.opacity : 1; g.globalCompositeOperation = L.blend || 'source-over'; g.drawImage(layers[i], 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; });
        if (onProgress) onProgress(Math.min(1, t / total));
        if (t < total) requestAnimationFrame(frame); else resolve();
      };
      frame();
    });
    rec.stop(); await stopped;
    stream.getTracks().forEach(tr => tr.stop());
    return new Blob(chunks, { type: 'video/webm' });
  }

  /* ---------- build any format ----------
     src: { doc } for drawings, or { canvas(S) → Promise<canvas>, svg() → string } for colour-in pictures */
  async function build(fmt, src, o, onProgress) {
    if (o.stencil && src.doc && ['png', 'jpg', 'webp', 'svg', 'pdf'].includes(fmt)) src = { doc: RM.stencil(src.doc) };
    const size = o.size || 2048, bg = o.bg !== false;
    const cvFor = async (S, withBg) => (src.doc ? RM.exportCanvas(src.doc, S, { bg: withBg }) : src.canvas(S));
    switch (fmt) {
      case 'png': return { data: await toBlob(await cvFor(size, bg), 'image/png'), ext: 'png' };
      case 'jpg': return { data: await toBlob(opaque(await cvFor(size, true)), 'image/jpeg', o.q || 0.92), ext: 'jpg' };
      case 'webp': return { data: await toBlob(await cvFor(size, bg), 'image/webp', o.q || 0.92), ext: 'webp' };
      case 'svg': return { data: src.doc ? RM.exportSVG(src.doc, { bg }) : src.svg(), ext: 'svg' };
      case 'pdf': {
        const cv = opaque(await cvFor(Math.min(size, 3000), true));
        const jpg = await blobBytes(await toBlob(cv, 'image/jpeg', 0.94));
        return { data: makePDF(jpg, cv.width, cv.height, o.page || 'a4', `Rangoli Maker  -  ${new Date().toLocaleDateString('en-IN')}`), ext: 'pdf' };
      }
      case 'webm': return { data: await recordVideo(src.doc, Math.min(size, 1080), o.secs || 5, onProgress), ext: 'webm' };
      case 'json': return { data: JSON.stringify(src.doc), ext: 'json' };
    }
    return null;
  }
  const safeName = s => (String(s || 'rangoli').trim().replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-').slice(0, 60) || 'rangoli');
  async function run(fmt, src, o, name, status) {
    status(RM.t('preparing'));
    const out = await build(fmt, src, o, p => status(RM.t('recording', { p: Math.round(p * 100) })));
    if (!out || !out.data) { status(''); RM.toast(RM.t('expFail')); return false; }
    const file = `${safeName(name)}.${out.ext}`;
    const r = await RM.saveFile(file, out.data);
    status('');
    if (r === 'saved') { RM.toast(RM.t('expDone', { f: file })); RM.sfx.chime(); return true; }
    if (r !== 'declined') RM.toast(r === 'unavailable' ? RM.t('noSaveHere') : RM.t('expFail'));
    return false;
  }

  /* ---------- Studio export window ---------- */
  function studioDialog(scope, doc) {
    const o = Object.assign({ fmt: 'png', size: 2048, bg: true, q: 92, page: 'a4', secs: 5, vsize: 1080, name: 'rangoli-design' }, RM.store.get('rm-export', {}));
    if (!supports(o.fmt)) o.fmt = 'png';
    const wrap = document.createElement('div');
    wrap.className = 'rm-modal rm-exp pro';
    wrap.innerHTML = `<div class="box exp-box" role="dialog" aria-modal="true" aria-labelledby="expT">
      <div class="exp-head"><h2 id="expT">${RM.t('exportTitle')}</h2><button type="button" class="exp-x" data-close aria-label="${RM.t('expClose')}">×</button></div>
      <div class="exp-body">
        <div class="exp-prev"><div class="exp-canvas"><canvas width="420" height="420" aria-hidden="true"></canvas></div><div class="exp-meta" id="expMeta"></div></div>
        <div class="exp-opts">
          <div class="exp-label">${RM.t('format')}</div>
          <div class="exp-formats">${FORMATS.filter(supports).map(f => `<button type="button" data-f="${f}"><b>${f.toUpperCase()}</b><span>${RM.t('f_' + f + '_d')}</span></button>`).join('')}</div>
          <div class="exp-row" data-for="png jpg webp pdf"><label for="expSize">${RM.t('expSizeL')}</label><select id="expSize">${[512, 1024, 2048, 3000, 4096].map(s => { const [a, b] = RM.dims(doc, s); return `<option value="${s}">${a} × ${b} px</option>`; }).join('')}</select></div>
          <div class="exp-row" data-for="webm"><label for="expVSize">${RM.t('expSizeL')}</label><select id="expVSize">${[720, 1080].map(s => { const [a, b] = RM.dims(doc, s); return `<option value="${s}">${a} × ${b}</option>`; }).join('')}</select></div>
          <div class="exp-row" data-for="webm"><span>${RM.t('videoLen')}</span><div class="s-seg" id="expSecs">${[3, 5, 8].map(s => `<button type="button" data-v="${s}">${s} s</button>`).join('')}</div></div>
          <div class="exp-row" data-for="png jpg webp svg pdf"><label class="s-switch"><input type="checkbox" id="expStencil"><span class="tr"></span><span>${RM.t('stencilL')}</span></label><small>${RM.t('stencilNote')}</small></div>
          <div class="exp-row" data-for="png webp svg"><label class="s-switch"><input type="checkbox" id="expBg"><span class="tr"></span><span>${RM.t('bgInclude')}</span></label><small>${RM.t('bgNote')}</small></div>
          <div class="exp-row" data-for="jpg webp"><label for="expQ">${RM.t('quality')}</label><div class="s-pair"><input type="range" id="expQ" min="50" max="100"><output id="expQVal"></output></div></div>
          <div class="exp-row" data-for="pdf"><span>${RM.t('page')}</span><div class="s-seg" id="expPage"><button type="button" data-v="a4">${RM.t('pgA4')}</button><button type="button" data-v="a4l">${RM.t('pgA4L')}</button><button type="button" data-v="square">${RM.t('pgSquare')}</button></div></div>
          <div class="exp-row"><label for="expName">${RM.t('fileName')}</label><input type="text" id="expName" maxlength="60" spellcheck="false"></div>
        </div>
      </div>
      <p class="exp-note" ${RM.canSave ? 'hidden' : ''}>${RM.t('noSaveHere')}</p>
      <div class="exp-foot"><span class="exp-status" role="status"></span><button type="button" class="s-btn" data-close>${RM.t('expCancel')}</button><button type="button" class="s-btn s-primary" id="expGo">${RM.t('doExport')}</button></div>
    </div>`;
    scope.appendChild(wrap);
    const q = s => wrap.querySelector(s), pv = q('.exp-canvas canvas');
    const [pw, ph] = RM.dims(doc, 420);
    pv.width = pw; pv.height = ph; q('.exp-canvas').style.aspectRatio = `${pw} / ${ph}`;
    const save = () => RM.store.set('rm-export', o);
    const seg = (id, key) => { const box = q(id); const show = () => box.querySelectorAll('[data-v]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === String(o[key])))); box.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { o[key] = isNaN(Number(b.dataset.v)) ? b.dataset.v : Number(b.dataset.v); save(); show(); meta(); }); show(); };
    function meta() {
      const px = s => { const [a, b] = RM.dims(doc, s); return `${a} × ${b}`; };
      const m = { png: `${px(o.size)} px`, jpg: `${px(o.size)} px · ${o.q}%`, webp: `${px(o.size)} px · ${o.q}%`, svg: RM.t('vector'), pdf: { a4: 'A4', a4l: 'A4 ↔', square: RM.t('pgSquare') }[o.page], webm: `${px(o.vsize)} · ${o.secs} s`, json: RM.t('f_json') }[o.fmt];
      q('#expMeta').textContent = `${o.fmt.toUpperCase()} · ${m}`;
    }
    function preview() {
      const transparent = !o.bg && ['png', 'webp', 'svg'].includes(o.fmt);
      q('.exp-canvas').classList.toggle('checker', transparent);
      const g = pv.getContext && pv.getContext('2d');
      if (!g) return;
      g.clearRect(0, 0, pv.width, pv.height);
      const stencilOn = o.stencil && ['png', 'jpg', 'webp', 'svg', 'pdf'].includes(o.fmt);
      g.drawImage(RM.exportCanvas(stencilOn ? RM.stencil(doc) : doc, Math.max(pv.width, pv.height), { bg: !transparent }), 0, 0);
    }
    function showFmt() {
      wrap.querySelectorAll('[data-f]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.f === o.fmt)));
      wrap.querySelectorAll('[data-for]').forEach(r => { r.hidden = !r.dataset.for.split(' ').includes(o.fmt); });
      preview(); meta();
    }
    wrap.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { o.fmt = b.dataset.f; save(); showFmt(); });
    q('#expSize').value = String(o.size); q('#expSize').onchange = e => { o.size = Number(e.target.value); save(); meta(); };
    q('#expVSize').value = String(o.vsize); q('#expVSize').onchange = e => { o.vsize = Number(e.target.value); save(); meta(); };
    q('#expBg').checked = o.bg; q('#expBg').onchange = e => { o.bg = e.target.checked; save(); preview(); };
    q('#expStencil').checked = !!o.stencil; q('#expStencil').onchange = e => { o.stencil = e.target.checked; save(); preview(); meta(); };
    q('#expQ').value = o.q; q('#expQVal').textContent = o.q + '%';
    q('#expQ').oninput = e => { o.q = Number(e.target.value); q('#expQVal').textContent = o.q + '%'; save(); meta(); };
    q('#expName').value = o.name; q('#expName').oninput = e => { o.name = e.target.value; save(); };
    seg('#expSecs', 'secs'); seg('#expPage', 'page');
    showFmt();
    const close = () => { if (!busy) wrap.remove(); };
    let busy = false;
    wrap.querySelectorAll('[data-close]').forEach(b => b.onclick = close);
    wrap.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
    q('#expGo').disabled = !RM.canSave;
    q('#expGo').onclick = async () => {
      if (busy) return;
      busy = true; q('#expGo').disabled = true;
      const opts = { size: o.fmt === 'webm' ? o.vsize : o.size, bg: o.bg, q: o.q / 100, page: o.page, secs: o.secs, stencil: o.stencil };
      const ok = await run(o.fmt, { doc }, opts, o.name, s => { q('.exp-status').textContent = s; });
      busy = false; q('#expGo').disabled = !RM.canSave;
      if (ok) close();
    };
    q('[data-f][aria-pressed="true"]').focus();
  }

  /* ---------- Kids save chooser ---------- */
  function kidsDialog(scope, src, allowVideo) {
    const opts = { png: { size: 1600 }, jpg: { size: 1600, q: 0.9 }, pdf: { size: 1600, page: 'a4' }, webm: { size: 1080, secs: 5 } };
    const icons = {
      png: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="9" width="38" height="30" rx="6" fill="#FFD23F"/><circle cx="17" cy="20" r="4" fill="#fff"/><path d="M8 36l11-11 7 7 6-5 10 9z" fill="#2DA05A"/></svg>',
      jpg: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="13" width="38" height="26" rx="6" fill="#2F6BFF"/><rect x="16" y="8" width="16" height="7" rx="2" fill="#2F6BFF"/><circle cx="24" cy="26" r="8" fill="#fff"/><circle cx="24" cy="26" r="4.5" fill="#2F6BFF"/></svg>',
      pdf: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="10" y="4" width="28" height="12" rx="2" fill="#8E44FF"/><rect x="4" y="15" width="40" height="18" rx="5" fill="#3A1230"/><rect x="11" y="27" width="26" height="17" rx="2" fill="#fff" stroke="#3A1230" stroke-width="2"/><path d="M15 33h18M15 38h12" stroke="#FF4FA3" stroke-width="3" stroke-linecap="round"/></svg>',
      webm: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="10" width="40" height="28" rx="7" fill="#F0353D"/><path d="M20 17v14l12-7z" fill="#fff"/></svg>'
    };
    const list = ['png', 'jpg', 'pdf'].concat(allowVideo && supports('webm') ? ['webm'] : []);
    const wrap = document.createElement('div');
    wrap.className = 'rm-modal rm-exp kids';
    wrap.innerHTML = `<div class="box kx-box" role="dialog" aria-modal="true" aria-labelledby="kxT"><h2 id="kxT">${RM.t('kSaveTitle')}</h2>
      <div class="kx-grid">${list.map(f => `<button type="button" data-f="${f}">${icons[f]}<b>${RM.t('kx_' + f)}</b><span>${RM.t('kx_' + f + '_d')}</span></button>`).join('')}</div>
      <p class="exp-note" ${RM.canSave ? 'hidden' : ''}>${RM.t('noSaveHere')}</p>
      <p class="exp-status" role="status"></p>
      <div class="row"><button type="button" data-close>${RM.t('expClose')}</button></div></div>`;
    scope.appendChild(wrap);
    let busy = false;
    const close = () => { if (!busy) wrap.remove(); };
    wrap.querySelector('[data-close]').onclick = close;
    wrap.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    wrap.querySelectorAll('[data-f]').forEach(b => {
      b.disabled = !RM.canSave;
      b.onclick = async () => {
        if (busy) return;
        busy = true; wrap.querySelectorAll('[data-f]').forEach(x => { x.disabled = true; });
        RM.wake();
        const ok = await run(b.dataset.f, src, opts[b.dataset.f], `my-rangoli-${RM.stamp()}`, s => { wrap.querySelector('.exp-status').textContent = s; });
        busy = false; wrap.querySelectorAll('[data-f]').forEach(x => { x.disabled = !RM.canSave; });
        if (ok) close();
      };
    });
    (wrap.querySelector('[data-f]:not(:disabled)') || wrap.querySelector('[data-close]')).focus();
  }

  RM.exporter = { FORMATS, supports, build, makePDF, studioDialog, kidsDialog };
})();
