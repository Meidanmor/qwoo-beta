export async function loadPageConfig(page, isPreview) {
  const API_BASE =
  import.meta.env.SSR
    ? process.env.VITE_API_BASE
    : import.meta.env.VITE_API_BASE

  const Base =
  import.meta.env.SSR
    ? process.env.API_BASE
    : import.meta.env.API_BASE

  // --- SERVER SIDE LOGIC ---
if (import.meta.env.SSR) {
  try {
    // 1. If Preview, fetch from WordPress API
    if (isPreview) {
      const url = `${API_BASE}/wp-json/shop-builder/v1/preview/${page}`;
      console.log(`[SSR] Fetching Preview from API: ${url}`);

      const response = await fetch(url, { cache: 'no-store' });
      if (response.ok) return await response.json();
      throw new Error(`WP API responded with ${response.status}`);
    }

    // 2. If NOT Preview — use filesystem in dev, HTTP fetch in production
    if (import.meta.env.DEV) {
      const { readFile } = await import('fs/promises')
      const { resolve } = await import('path')

      const filePath = resolve(process.cwd(), 'public', 'config', `${page}.json`)
      console.log(`[SSR] Reading config from filesystem: ${filePath}`)

      const raw = await readFile(filePath, 'utf-8')
      return JSON.parse(raw)
    } else {
      const url = `${Base}/config/${page}.json`
      console.log(`[SSR] Fetching config via HTTP: ${url}`)

      const response = await fetch(url, { cache: 'no-store' })
      if (response.ok) return await response.json()
      throw new Error(`Config fetch responded with ${response.status}`)
    }

  } catch (err) {
    console.error('[SSR] loadPageConfig Error:', err.message);
    return {};
  }
}
// --- CLIENT SIDE LOGIC ---
  else {
    try {
      const url = isPreview
        ? `${API_BASE}/wp-json/shop-builder/v1/preview/${page}`
        : `/config/${page}.json`;

      const response = await fetch(url, {
        cache: 'no-store'
      });
      if (!response.ok) return {};
      return await response.json();
    } catch (err) {
      console.error('[Client] loadPageConfig Error:', err);
      return {};
    }
  }
}