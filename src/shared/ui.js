/* Shared UI helpers: icons, toast, in-page confirm */
(() => {
  const I = (d, extra) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}${extra || ''}</svg>`;
  RM.icons = {
    undo: I('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),
    redo: I('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),
    trash: I('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>'),
    sparkle: I('<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>'),
    save: I('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),
    brush: I('<path d="M18.4 2.6a2 2 0 0 1 2.9 2.9L12 14.8 9.2 12z"/><path d="M9.2 12C6 12 5 14 5 16c0 1.7-1 3-2 3 1.5 1.5 3.5 2 5 2 3 0 5-2 5-5"/>'),
    eraser: I('<path d="m7 21-4-4a2 2 0 0 1 0-2.8L13.2 4a2 2 0 0 1 2.8 0l4 4a2 2 0 0 1 0 2.8L10 21z"/><path d="M22 21H7"/><path d="m5 11 9 9"/>'),
    stamp: I('<path d="M9 3h6l-1 7h-4z"/><path d="M5 14h14v3H5z"/><path d="M4 21h16"/>'),
    mirror: I('<path d="M12 3v18"/><path d="M8 7C5 8 3 10 3 12s2 4 5 5z"/><path d="M16 7c3 1 5 3 5 5s-2 4-5 5z"/>'),
    dots: I('<circle cx="6" cy="6" r="1.4"/><circle cx="12" cy="6" r="1.4"/><circle cx="18" cy="6" r="1.4"/><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/><circle cx="6" cy="18" r="1.4"/><circle cx="12" cy="18" r="1.4"/><circle cx="18" cy="18" r="1.4"/>'),
    line: I('<path d="M5 19 19 5"/><circle cx="5" cy="19" r="1.6"/><circle cx="19" cy="5" r="1.6"/>'),
    circle: I('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1.2"/>'),
    petal: I('<path d="M12 21C6 15 6 8 12 3c6 5 6 12 0 18z"/>'),
    poly: I('<path d="m12 3 8.5 6.2-3.2 10H6.7L3.5 9.2z"/>'),
    dot: I('<circle cx="12" cy="12" r="4" fill="currentColor"/>'),
    hand: I('<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5"/><path d="M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13"/><path d="M17 11a1.5 1.5 0 0 1 3 0v3a7 7 0 0 1-7 7h-1.5a6 6 0 0 1-5-2.7L4 15.5a1.5 1.5 0 0 1 2.5-1.7L8 16"/>'),
    eye: I('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    eyeOff: I('<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4"/><path d="M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1"/>'),
    lock: I('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    unlock: I('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>'),
    plus: I('<path d="M12 5v14M5 12h14"/>'),
    minus: I('<path d="M5 12h14"/>'),
    copy: I('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/>'),
    up: I('<path d="m6 15 6-6 6 6"/>'),
    down: I('<path d="m6 9 6 6 6-6"/>'),
    fit: I('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    file: I('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>'),
    open: I('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1"/><path d="M3 7v11a2 2 0 0 0 2 2h13l3-8H7l-4 8"/>'),
    help: I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><path d="M12 17.5v.01"/>'),
    sliders: I('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    home: I('<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>'),
    soundOn: I('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/>'),
    soundOff: I('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6"/>'),
    magnet: I('<path d="M6 3v8a6 6 0 0 0 12 0V3"/><path d="M6 7h4M14 7h4"/>'),
    select: I('<path d="M5 3l14 8-6 1.6L10 19z" fill="currentColor"/>'),
    grid: I('<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>'),
    expand: I('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><path d="M4 4l6 6M20 4l-6 6M4 20l6-6M20 20l-6-6"/>'),
    image: I('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5.5 4 4 2.5-2.5L21 18"/>'),
    text: I('<path d="M5 6V4h14v2M12 4v16M9 20h6"/>'),
    eyedrop: I('<path d="m15 4 5 5-2 2-1.5-1.5L8 18H5v-3l8.5-8.5L12 5z"/><path d="M14.5 3.5a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3"/>'),
    bucket: I('<path d="M5 11 12 4l7 7-7 7z"/><path d="M5 11h14"/><path d="M20 15s2 2.4 2 3.6a2 2 0 0 1-4 0c0-1.2 2-3.6 2-3.6z" fill="currentColor"/>'),
    curve: I('<path d="M4 18C6 8 18 16 20 6"/><circle cx="4" cy="18" r="1.6"/><circle cx="20" cy="6" r="1.6"/>'),
    pencil: I('<path d="M4 20l1.2-4.4L16.5 4.3a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8z"/><path d="M14.5 6.3l3.2 3.2"/>'),
    pattern: I('<circle cx="6" cy="6" r="2" fill="currentColor"/><path d="m16 3 1.2 2.6L20 6l-2 2 .5 2.8L16 9.5l-2.5 1.3.5-2.8-2-2 2.8-.4z" fill="currentColor"/><path d="M4 15c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/><path d="M4 20c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/>')
  };
  // Older saved drawings used `g` for glow and had no symmetry mode
  RM.migrate = doc => { (doc.layers || []).forEach(L => L.items.forEach(it => { if (it.g && !it.fx) it.fx = { glow: true }; delete it.g; if (!it.sym) it.sym = 'radial'; if (it.sd == null) it.sd = Math.floor(Math.random() * 1e9); })); return doc; };
  RM.fillIcons = root => root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = RM.icons[el.dataset.icon] || ''; });
  let toastTimer = null;
  RM.toast = msg => {
    let el = document.querySelector('.rm-toast');
    if (!el) { el = document.createElement('div'); el.className = 'rm-toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
  };
  RM.confirm = (scope, msg, yes, no, onYes) => {
    const wrap = document.createElement('div');
    wrap.className = 'rm-modal';
    wrap.innerHTML = `<div class="box" role="alertdialog" aria-modal="true"><p></p><div class="row"><button type="button" data-no></button><button type="button" class="go" data-yes></button></div></div>`;
    wrap.querySelector('p').textContent = msg;
    wrap.querySelector('[data-no]').textContent = no;
    wrap.querySelector('[data-yes]').textContent = yes;
    (scope || document.body).appendChild(wrap);
    const close = () => wrap.remove();
    wrap.querySelector('[data-no]').onclick = close;
    wrap.querySelector('[data-yes]').onclick = () => { close(); onYes(); };
    wrap.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    wrap.querySelector('[data-no]').focus();
  };
})();
