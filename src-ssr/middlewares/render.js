// ssr-src/middlewares/render.js
import { defineSsrMiddleware } from '#q-app/wrappers'
// 1. Define the helper at the top of the file
const API_BASE = process.env.VITE_API_BASE || ''

const escapeHTML = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
const isIgnoredRequest = (url) => {
  return (
    url.startsWith('/.well-known') ||
    url.includes('devtools') ||
    url.endsWith('.map')
  )
}
export default defineSsrMiddleware(({ app, resolve, render, /*serve*/ }) => {
    app.get(resolve.urlPath('*'), (req, res) => {
        if (isIgnoredRequest(req.url)) {
            return res.status(404).end()
        }
        res.setHeader('Content-Type', 'text/html')

        // CSP header matching your htmlVariables settings
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; " +
            "script-src 'self' https://accounts.google.com 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: https:; " +
            `connect-src 'self' ${API_BASE ? API_BASE : ''} ws://localhost:* wss://localhost:*;` +
            "font-src 'self' https://fonts.gstatic.com; " +
            "frame-src https://accounts.google.com;"
        )

        const ssrContext = {req, res}

        render(ssrContext)
            .then(html => {
                const productsData = ssrContext.productsData || []
                const categoriesData = ssrContext.categoriesData || []
                const homeProductsData = ssrContext.homeProductsData || []
                const cartArray = ssrContext.cartArray || null
                const seoData = ssrContext.seoData || {};
                const productData = ssrContext.productData || {};
                const productsTotal = ssrContext.productsTotal || 0;
                const pagesTotal = ssrContext.pagesTotal || 1;
                const heroData = ssrContext.heroData || {};
                const pageConfig = ssrContext.pageConfig || {};
                const selectedCategoryData = ssrContext.selectedCategoryData || {};
                const priceMetaData = ssrContext.priceMetaData || {};
                const ssrQuery = ssrContext.ssrQuery || {};

                const safeTitle = escapeHTML(seoData?.title || 'NaturaBloom');
                const safeDesc = escapeHTML(seoData?.description || "Let's Bloom Together");
                const safeRobots = escapeHTML(seoData?.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
                const safeOgType = escapeHTML(seoData?.og_type || 'website');
                const safeOgImage = escapeHTML(seoData?.og_image || '');
                const safeCanonical = escapeHTML(seoData?.canonical || '');
                // 1. GENERATE SCHEMA (JSON-LD)
                // This allows Google to show Price, Rating, and Stock in search results.
                let schemaHtml = '';
                if (productData && productData.id) {
                    const schema = {
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": safeTitle,
                        "description": safeDesc,
                        "image": [safeOgImage],
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "ILS", // Change to your currency
                            "price": productData.price || '0',
                            "availability": productData.stock_status === 'instock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
                        }
                    };
                    schemaHtml = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
                }

                // 2. CRITICAL HEAD TOP: Connections, Styles, Pixels, and SEO
                const preconnects = API_BASE
                    ? `
    <link rel="preconnect" href="${API_BASE}" crossorigin>
    <link rel="dns-prefetch" href="${API_BASE}">
  `
                    : '';

                const criticalHeadTop = `${preconnects}
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}">
    <meta name="robots" content="${safeRobots}">
    <link rel="canonical" href="${safeCanonical}">

    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${safeOgImage}">
    <meta property="og:type" content="${safeOgType}">
    <meta name="twitter:card" content="summary_large_image">

    ${schemaHtml}

    ${heroData.src ? `
      <link 
        rel="preload" 
        as="image" 
        href="${heroData.src}" 
        imagesrcset="${heroData.srcset}" 
        imagesizes="${heroData.sizes}" 
        fetchpriority="high"
      >` : ''}
    <style>
      .hero-section-sec, .lcp-wrapper, .hero-img, .q-layout, .q-page-container, #q-app {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        transition: none !important;
        animation: none !important;
      }
    </style>
  `;

                // 3. HEAVY DATA: Bottom of body
                const bodyBottom = `
    <script>window.__SEO_DATA__ = ${JSON.stringify(seoData).replace(/</g, '\\u003c')}</script>
    <script>window.__PRODUCTS_DATA__ = ${JSON.stringify(productsData).replace(/</g, '\\u003c')}</script>
    <script>window.__PRODUCTS_TOTAL__ = ${productsTotal}</script>
    <script>window.__PAGES_TOTAL__ = ${pagesTotal}</script>
<script>window.__CATEGORIES_DATA__ = ${JSON.stringify(categoriesData).replace(/</g, '\\u003c')}</script>
<script>window.__SELECTED_CATEGORY_DATA__ = ${JSON.stringify(selectedCategoryData).replace(/</g, '\\u003c')}</script>
<script>window.__SSR_QUERY__ = ${JSON.stringify(ssrQuery).replace(/</g, '\\u003c')}</script>
<script>window.__PRICE_META__ = ${JSON.stringify(priceMetaData).replace(/</g, '\\u003c')}</script>
    <script>window.__HOME_PRODUCTS_DATA__ = ${JSON.stringify(homeProductsData).replace(/</g, '\\u003c')}</script>
    <script>window.__PRODUCT_DATA__ = ${JSON.stringify(productData).replace(/</g, '\\u003c')}</script>
    <script>window.__PAGE_CONFIG__ = ${JSON.stringify(pageConfig).replace(/</g, '\\u003c')}</script>
    <script>window.__CART_ARRAY__ = ${JSON.stringify(cartArray).replace(/</g, '\\u003c')}</script>
  `;

                // 4. SURGICAL PLACEMENT
                const output = html
                    .replace(/<title>.*?<\/title>/i, '')
                    .replace('<head>', `<head>${criticalHeadTop}`)
                    .replace('</body>', `${bodyBottom}</body>`);

                res.send(output);
            })
            .catch(err => {
                if (err.url) {
                    if (err.code) res.redirect(err.code, err.url)
                    else res.redirect(err.url)
                } else if (err.code === 404) {
                    res.status(404).send('404 | Page Not Found')
                } else if (process.env.DEV) {
                    console.error('SSR REAL ERROR:', err)
                    console.error(err.stack)

                    res.status(500).send(`
    <pre style="white-space: pre-wrap; color: red;">
      ${err.stack || err.message}
    </pre>
  `)
                } else {
                    res.status(500).send('500 | Internal Server Error')
                    if (process.env.DEBUGGING) console.error(err.stack)
                }
            })
    })
})
