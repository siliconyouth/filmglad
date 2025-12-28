// Generate email title images with gradient using Sharp + SVG
// Usage: node scripts/generate-email-titles.mjs

import sharp from 'sharp';

// Hero gradient colors from globals.css (135deg diagonal)
const gradientStops = [
  { offset: '0%', color: '#dc2626' },
  { offset: '20%', color: '#e85d04' },
  { offset: '35%', color: '#f48c06' },
  { offset: '65%', color: '#48cae4' },
  { offset: '80%', color: '#00b4d8' },
  { offset: '100%', color: '#1e40af' },
];

function createGradientTextSvg(text, width, height, fontSize) {
  const stops = gradientStops
    .map(s => `<stop offset="${s.offset}" stop-color="${s.color}"/>`)
    .join('\n      ');

  // 135deg in CSS = top-left to bottom-right diagonal
  // x1="0%" y1="0%" = top-left, x2="100%" y2="100%" = bottom-right
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&amp;display=swap');
    </style>
    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
    </linearGradient>
  </defs>
  <text
    x="50%"
    y="55%"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="'Bebas Neue', Impact, sans-serif"
    font-weight="400"
    font-size="${fontSize}px"
    fill="url(#heroGradient)"
  >${text}</text>
</svg>`;
}

async function generateImage(text, filename, width = 700, height = 150, fontSize = 120) {
  const svg = createGradientTextSvg(text, width, height, fontSize);

  await sharp(Buffer.from(svg))
    .png()
    .toFile(`public/${filename}`);

  console.log(`Generated: public/${filename}`);
}

async function main() {
  // Generate HUNGER (English)
  await generateImage('HUNGER', 'email-title-en.png', 700, 150, 120);

  // Generate GLAD (Serbian)
  await generateImage('GLAD', 'email-title-sr.png', 500, 150, 120);

  console.log('Done! Email title images generated with hero gradient.');
}

main().catch(console.error);
