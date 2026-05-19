// Patches dist/index.html after `expo export --platform web`
// Adds PWA manifest link + Apple meta tags for "Add to Home Screen"
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const htmlPath = path.join(distDir, 'index.html');
const manifestPath = path.join(distDir, 'manifest.json');

const manifest = {
  name: 'Campedèl-Hof',
  short_name: 'Campedèl',
  description: 'Digitale Speisekarte & Weinkarte',
  start_url: '/',
  display: 'standalone',
  background_color: '#F7F4F0',
  theme_color: '#83A83D',
  orientation: 'portrait',
  icons: [
    { src: '/assets/logo.877c533deb5d948f87eeccc476dd34db.png', sizes: '300x212', type: 'image/png' }
  ]
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('✓ manifest.json written');

const pwaTags = `
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#83A83D" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Campedèl-Hof" />
    <meta name="mobile-web-app-capable" content="yes" />`;

let html = fs.readFileSync(htmlPath, 'utf8');

if (html.includes('rel="manifest"')) {
  console.log('✓ PWA tags already present, skipping');
} else {
  html = html.replace('</head>', pwaTags + '\n  </head>');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✓ PWA tags injected into index.html');
}

console.log('\nDone. Deploy the dist/ folder to any static host.\n');
