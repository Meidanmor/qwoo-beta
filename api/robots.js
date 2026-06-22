// api/robots.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  const robots = `
User-agent: *
Disallow:

Sitemap: https://qwoo.meidanm.com/sitemap.xml
`;

  res.status(200).send(robots.trim());
}