// api/sitemap.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');

  const publicDir = path.join(process.cwd(), 'public/data');
  const filePath = path.join(publicDir, 'products.json');
  let products = [];

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    products = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read products.json', e);
  }

  const staticPages = [
    '/',
    '/products',
    '/about',
    '/contact'
  ];

  const urls = [
    ...staticPages.map(url => ({ loc: `https://qwoo.meidanm.com${url}`, priority: 1 })),
    ...products.map(p => ({ loc: `https://qwoo.meidanm.com/product/${p.slug}`, priority: 0.8 }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`).join('')}
</urlset>`;

  res.status(200).send(sitemap.trim());
}