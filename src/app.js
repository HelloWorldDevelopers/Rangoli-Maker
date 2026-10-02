/* Router + home page */
RM.addStrings({
  brand: ['Rangoli Maker', 'रंगोली मेकर', 'रांगोळी मेकर'],
  heroA: ['Draw once.', 'एक बार बनाओ।', 'एकदा काढा.'],
  heroB: ['Watch it bloom.', 'उसे खिलते देखो।', 'ती फुलताना बघा.'],
  heroLede: ['Every line you draw repeats around the centre, like powder rangoli at a doorway. Pick the experience that fits you.', 'आपकी हर रेखा बीच के चारों ओर दोहराती है, जैसे दरवाज़े पर बनी रंगोली। अपने लिए सही अनुभव चुनें।', 'तुम्ही काढलेली प्रत्येक रेषा मध्याभोवती पुन्हा उमटते, दारातल्या रांगोळीसारखी. तुमच्यासाठी योग्य अनुभव निवडा.'],
  forKids: ['For children', 'बच्चों के लिए', 'मुलांसाठी'], forPros: ['For designers', 'डिज़ाइनरों के लिए', 'डिझायनर्ससाठी'],
  kidsName: ['Rangoli for Kids', 'बच्चों की रंगोली', 'मुलांची रांगोळी'], proName: ['Rangoli Studio', 'रंगोली स्टूडियो', 'रांगोळी स्टुडिओ'],
  kidsB1: ['Brush, pencil, paint bucket and big colour pots', 'ब्रश, पेंसिल, रंग भरने की बाल्टी और बड़े रंग', 'ब्रश, पेन्सिल, रंगाची बादली आणि मोठे रंग'],
  kidsB2: ['Stickers and pattern brushes that repeat by magic', 'स्टिकर और पैटर्न ब्रश जो जादू से दोहराते हैं', 'स्टिकर आणि नक्षी ब्रश जे जादूने पुन्हा उमटतात'],
  kidsB3: ['Colour-in rangoli designs and a Surprise button', 'रंग भरने वाले डिज़ाइन और सरप्राइज़ बटन', 'रंग भरायच्या नक्षी आणि सरप्राईज बटण'],
  kidsGo: ['Start playing', 'खेलना शुरू करो', 'खेळायला सुरुवात कर'],
  proB1: ['Brush engine: 9 brush types, hardness, spacing, smoothing, pen pressure', 'ब्रश इंजन: 9 ब्रश, कठोरता, अंतराल, स्मूदिंग, पेन दबाव', 'ब्रश इंजिन: 9 ब्रश, कडकपणा, अंतर, गुळगुळीतपणा, पेन दाब'],
  proB2: ['Radial, repeat-grid and border symmetry with snapping and kolam grids', 'स्नैप और कोलम ग्रिड के साथ वृत्ताकार, ग्रिड और किनारी सममिति', 'स्नॅप आणि ठिपक्यांच्या जाळीसह वर्तुळाकार, जाळी आणि किनार सममिती'],
  proB3: ['Text, templates, a design library, tracing, stencils, PNG, SVG, PDF and video', 'टेक्स्ट, टेम्पलेट, डिज़ाइन लाइब्रेरी, ट्रेसिंग, स्टेंसिल, PNG, SVG, PDF और वीडियो', 'मजकूर, साचे, नक्षी संग्रह, गिरवणी, स्टेन्सिल, PNG, SVG, PDF आणि व्हिडिओ'],
  proGo: ['Open the studio', 'स्टूडियो खोलें', 'स्टुडिओ उघडा'],
  homeNote: ['Your work is saved automatically in this browser.', 'आपका काम इस ब्राउज़र में अपने आप सहेजा जाता है।', 'तुमचं काम या ब्राउझरमध्ये आपोआप जतन होतं.']
});

(() => {
  const views = { home: 'view-home', kids: 'view-kids', studio: 'view-studio' };
  let homeDrawn = false;
  function drawHome() {
    if (homeDrawn) return;
    homeDrawn = true;
    const put = (id, doc, S) => { const cv = document.getElementById(id); const g = cv.getContext && cv.getContext('2d'); if (!g) return; g.drawImage(RM.exportCanvas(doc, S), 0, 0, cv.width, cv.height); };
    const hero = RM.newDoc('#24123A', 'hero'); hero.tex = true;
    hero.layers[0].items = RM.surprise(1914, ['#FF9F1C', '#D7263D', '#FFD23F', '#1B998B', '#F25F9C', '#FFFFFF'], { glow: true }).items;
    put('heroArt', hero, 920);
    const kids = RM.newDoc('#2A1240', 'k');
    kids.layers[0].items = RM.surprise(77, ['#F0353D', '#FFD000', '#2DBE60', '#2F6BFF', '#FF4FA3', '#FFFFFF'], { glow: true }).items;
    put('kidsArt', kids, 192);
    const pro = RM.newDoc('#121019', 'p');
    pro.layers[0].items = RM.surprise(3051, ['#FF9F1C', '#ECE8F4', '#1B998B'], { fine: true }).items.map(it => Object.assign(it, { f: false, w: 3 }));
    put('proArt', pro, 192);
  }
  function route() {
    const key = (location.hash || '').replace('#', '');
    const v = views[key] ? key : 'home';
    Object.entries(views).forEach(([k, id]) => { document.getElementById(id).hidden = k !== v; });
    document.body.dataset.view = v;
    if (v === 'home') drawHome();
    if (v === 'kids') Kids.show();
    if (v === 'studio') Studio.show();
    scrollTo(0, 0);
  }
  document.querySelectorAll('[data-logo]').forEach(el => { el.innerHTML = RM.logoSVG(Number(el.dataset.logo) || 32); el.style.display = 'inline-flex'; });
  document.querySelectorAll('.langs button').forEach(b => b.addEventListener('click', () => RM.setLang(b.dataset.l)));
  const nav = (navigator.language || 'en').slice(0, 2);
  RM.setLang(RM.store.get('rm-lang', ['mr', 'hi'].includes(nav) ? nav : 'en'));
  addEventListener('hashchange', route);
  route();
})();
