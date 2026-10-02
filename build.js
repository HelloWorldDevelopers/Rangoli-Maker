// Builds dist/rangoli-maker.html from src/ (one page, three views: #home, #kids, #studio)
const fs = require('fs');
const path = require('path');
const src = f => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const css = ['shared/brand.css', 'kids/kids.css', 'studio/studio.css'].map(src).join('\n');
const html = ['shared/home.html', 'kids/kids.html', 'studio/studio.html'].map(src).join('\n');
const js = ['shared/core.js', 'shared/ui.js', 'shared/help.js', 'shared/export.js', 'kids/kids.js', 'studio/studio.js', 'app.js'].map(src).join('\n');
const page = `<title>Rangoli Maker</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Yatra+One&family=Baloo+2:wght@600;700;800&family=Hind:wght@400;500;600&display=swap">
<style>
${css}
</style>
${html}
<script>
${js}
</script>
`;
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'rangoli-maker.html'), page);
fs.writeFileSync(path.join(__dirname, 'dist', '.bundle-check.js'), js);
// Standalone copy for opening straight from disk (double-click): full document with doctype and viewport
const icon = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#170F2C"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(k => { const a = k * Math.PI / 4 - Math.PI / 2, p = (r) => `${(20 + r * Math.cos(a)).toFixed(1)} ${(20 + r * Math.sin(a)).toFixed(1)}`; return `<path d="M${p(5)}L${p(17)}" stroke="${k % 2 ? '#D7263D' : '#FF9F1C'}" stroke-width="6" stroke-linecap="round"/>`; }).join('') + '<circle cx="20" cy="20" r="6" fill="#1B998B"/><circle cx="20" cy="20" r="2.5" fill="#FFD23F"/></svg>')}`;
const local = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Rangoli Maker: draw symmetric rangoli in Marathi, English or Hindi. A playful version for children and a full studio for artists.">
<meta name="theme-color" content="#170F2C">
<meta property="og:title" content="Rangoli Maker">
<meta property="og:description" content="Draw once. Watch it bloom. Symmetric rangoli for children and artists.">
<link rel="icon" href="${icon}">
${page.slice(0, page.indexOf('</style>') + 8)}
</head>
<body>
${page.slice(page.indexOf('</style>') + 8)}
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'rangoli-maker.html'), local);
// Ready-to-upload folder for any free static host (Netlify, GitHub Pages, Cloudflare Pages, Vercel)
fs.mkdirSync(path.join(__dirname, 'deploy'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'deploy', 'index.html'), local);
console.log('built deploy/index.html (upload this folder to a static host)');
console.log('built rangoli-maker.html (open this one locally)');
console.log('built dist/rangoli-maker.html', (page.length / 1024).toFixed(0) + ' KB');
