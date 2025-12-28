// Generate email title images with gradient using Sharp + SVG
// Usage: node scripts/generate-email-titles.mjs

import sharp from 'sharp';
import { writeFileSync } from 'fs';

// Hero gradient colors from globals.css
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      ${stops}
    </linearGradient>
  </defs>
  <text
    x="50%"
    y="50%"
    dominant-baseline="central"
    text-anchor="middle"
    font-family="Arial Black, Helvetica, sans-serif"
    font-weight="900"
    font-size="${fontSize}px"
    fill="url(#heroGradient)"
  >${text}</text>
</svg>`;
}

async function generateImage(text, filename, width = 700, height = 150, fontSize = 120) {
  const svg = createGradientTextSvg(text, width, height, fontSize);

  // Save SVG for debugging
  writeFileSync(`public/${filename.replace('.png', '.svg')}`, svg);

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
