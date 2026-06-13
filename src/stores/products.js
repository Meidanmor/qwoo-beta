// src/stores/products.js
import { ref } from 'vue'
import api from 'src/boot/woocommerce'
import { isAdmin } from 'src/stores/user'
//import { fetchWithToken } from 'src/composables/useApiFetch.js'

 const Base =
  import.meta.env.SSR
    ? process.env.API_BASE
    : import.meta.env.API_BASE

// --- reactive state ---
const products = ref([])
const productsLoading = ref(false)
const initialized = ref(false)
export const totalProducts = ref(0)
export const totalPages = ref(1);
const categories = ref([]);
const priceMeta = ref(null);

async function getFeaturedProducts(ids = []) {
  if (!Array.isArray(ids) || !ids.length) return []

  try {
    const query = new URLSearchParams()
    query.append('include', ids.join(','))
    query.append('per_page', ids.length)

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE}/wp-json/wc/store/v1/products?${query.toString()}`
    )

    if (!res.ok) throw new Error(`API error: ${res.status}`)

    const data = await res.json()

    // Update master store so other components benefit
    if (data?.length) {
      const masterMap = new Map(products.value.map(p => [p.id, p]))
      data.forEach(p => masterMap.set(p.id, p))
      products.value = Array.from(masterMap.values())

// Return in the requested ids order
      return ids.map(id => masterMap.get(Number(id))).filter(Boolean)
    }

    return data || []

  } catch (err) {
    console.error('[products store] getFeaturedProducts failed, trying fallback', err)

    // API failed (offline or server error) — try store cache first
    const masterMap = new Map(products.value.map(p => [p.id, p]))
    const cached = ids.map(id => masterMap.get(Number(id))).filter(Boolean)
    if (cached.length) return cached

    // Nothing in cache — try products.json
    try {
      const res = await fetch('/data/products.json')
      const all = await res.json()
      return all.filter(p => ids.map(Number).includes(Number(p.id)))
    } catch {
      return []
    }
  }
}

async function getByIds(ids = []) {
  if (!Array.isArray(ids) || !ids.length) return []

  const masterMap = new Map(products.value.map(p => [p.id, p]))
  const existing = ids.map(id => masterMap.get(Number(id))).filter(Boolean)
  const missingIds = ids.filter(id => !masterMap.has(Number(id)))

  if (missingIds.length === 0) return existing

  try {
    // Parallel fetch for the missing items using the Store API endpoint
    const fetchPromises = missingIds.map(id =>
      fetch(`${import.meta.env.VITE_API_BASE}/wp-json/wc/store/v1/products/${id}`)
        .then(res => res.ok ? res.json() : null)
    )

    const fetchedMissing = (await Promise.all(fetchPromises)).filter(Boolean)

    // Merge into the Master List
    fetchedMissing.forEach(p => masterMap.set(p.id, p))
    products.value = Array.from(masterMap.values())

  } catch (err) {
    console.error('[products store] Store API getByIds failed', err)
  }

  return ids.map(id => masterMap.get(Number(id))).filter(Boolean)
}

// --- core fetchers ---
export async function preFetchProducts(ctx = {}) {
  try {
    if (!ctx.dryRun) {
      productsLoading.value = true
    }

    const {
      page = 1,
      per_page = 6,
      min_price,
      max_price,
      category,
      search,
      orderby,
      order,
    } = ctx

    // -------------------------
    // ADMIN: use wc/v3 directly
    // -------------------------
    if (isAdmin.value) {
      return await fetchAdminDrafts(ctx)
    }

    // -------------------------
    // PRIMARY: store/v1 live API
    // -------------------------
    const query = new URLSearchParams()
    query.append('page', page)
    query.append('per_page', per_page)
    if (min_price !== undefined && !isNaN(min_price)) query.append('min_price', Math.round(min_price))
    if (max_price !== undefined && !isNaN(max_price)) query.append('max_price', Math.round(max_price))
    if (category)  query.append('category', category)
    if (search)    query.append('search', search)
    if (orderby && orderby !== 'menu_order') query.append('orderby', orderby)
    if (order)     query.append('order', order)

    const url = `${import.meta.env.VITE_API_BASE}/wp-json/wc/store/v1/products?${query.toString()}`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`API error: ${res.status}`)

      const data        = await res.json()
      const total       = res.headers.get('X-WP-Total')
      const totalPagesH = res.headers.get('X-WP-TotalPages')

      if (ctx.dryRun) {
        return {
          products:   data || [],
          total:      total       ? parseInt(total)       : 0,
          totalPages: totalPagesH ? parseInt(totalPagesH) : 1,
        }
      }

      products.value      = data || []
      totalProducts.value = total       ? parseInt(total)       : 0
      totalPages.value    = totalPagesH ? parseInt(totalPagesH) : 1

      return products.value

    } catch (apiErr) {
      // -------------------------
      // FALLBACK: products.json
      // -------------------------
      console.warn('[products] API failed, using offline fallback', apiErr)

      let localProducts = []

      if (import.meta.env.DEV && import.meta.env.SSR) {
        const { readFile } = await import('fs/promises')
        const { resolve }  = await import('path')
        const filePath = resolve(process.cwd(), 'public', 'data', 'products.json')
        console.log(`[SSR] Reading products from filesystem: ${filePath}`)
        localProducts = JSON.parse(await readFile(filePath, 'utf-8'))

      } else {
        const fallbackUrl = import.meta.env.SSR
          ? `${Base}/data/products.json`
          : '/data/products.json'
        if (import.meta.env.SSR) console.log(`[SSR] Fetching products via HTTP: ${fallbackUrl}`)
        const localRes = await fetch(fallbackUrl)
        if (!localRes.ok) throw new Error('products.json fallback failed')
        localProducts = await localRes.json()
      }

      // filtering
      if (category) {
        const categoryIds = String(category).split(',').map(id => id.trim()).filter(Boolean)
        localProducts = localProducts.filter(p =>
          p.categories?.some(c => categoryIds.includes(String(c.id))) ||
          categoryIds.includes(String(p.extensions?.mpress?.default_category?.id))
        )
      }

      if (search) {
        const term = search.toLowerCase()
        localProducts = localProducts.filter(p => {
          const pSlug = p.permalink?.split('/').filter(Boolean).pop()
          return p.name?.toLowerCase().includes(term) || pSlug === term
        })
      }

      if (min_price !== undefined) {
        localProducts = localProducts.filter(p => parseFloat(p.prices?.price || 0) >= min_price)
      }

      if (max_price !== undefined) {
        localProducts = localProducts.filter(p => parseFloat(p.prices?.price || 0) <= max_price)
      }

      // sorting
      if (orderby === 'price') {
        localProducts.sort((a, b) => {
          const diff = parseFloat(a.prices?.price || 0) - parseFloat(b.prices?.price || 0)
          return order === 'desc' ? -diff : diff
        })
      } else if (orderby === 'date') {
        localProducts.sort((a, b) => {
          const diff = new Date(a.date_created) - new Date(b.date_created)
          return order === 'desc' ? -diff : diff
        })
      } else if (orderby === 'title') {
        localProducts.sort((a, b) => {
          const diff = a.name.localeCompare(b.name)
          return order === 'desc' ? -diff : diff
        })
      } else if (orderby === 'popularity') {
        localProducts.sort((a, b) =>
          (b.extensions?.offline_order?.total_sales || 0) -
          (a.extensions?.offline_order?.total_sales || 0)
        )
      } else if (orderby === 'rating') {
        localProducts.sort((a, b) =>
          (b.extensions?.offline_order?.average_rating || 0) -
          (a.extensions?.offline_order?.average_rating || 0)
        )
      }

      // pagination
      const total     = localProducts.length
      const pages     = Math.ceil(total / per_page)
      const paginated = localProducts.slice((page - 1) * per_page, page * per_page)

      if (ctx.dryRun) {
        return { products: paginated, total, totalPages: pages }
      }

      products.value      = paginated
      totalProducts.value = total
      totalPages.value    = pages

      return paginated
    }

  } catch (err) {
    console.error('[products store] catastrophic failure', err)
    return products.value || []

  } finally {
    productsLoading.value = false
  }
}

// -------------------------
// Admin: paginated wc/v3 fetch (draft + publish)
// Normalizes shape to match store/v1 so the UI needs no changes
// -------------------------
async function fetchAdminDrafts(ctx = {}) {
  try {
    const { products: adminProducts, total, totalPages: pages } =
      await api.getAdminProducts(ctx)

    if (!Array.isArray(adminProducts)) return products.value || []

    const normalized = adminProducts.map(item => {
      // date
      item.date_created = item.date_created_gmt || item.date_created || new Date().toISOString()

      // stock
      if (item.is_in_stock === undefined) {
        item.is_in_stock = item.stock_status === 'instock'
      }

      // prices — wc/v3 returns price as a decimal string, store/v1 uses minor units
      const normalizedPrice = item.price
        ? (parseFloat(item.price) * 100).toString()
        : '0'

      if (!item.prices) {
        item.prices = {
          price:         normalizedPrice,
          regular_price: normalizedPrice,
          sale_price:    normalizedPrice,
          price_range:   null,
        }
      }

      // permalink for drafts (no public slug yet)
      if (!item.slug || item.status === 'draft') {
        item.permalink = `/product/id-${item.id}`
      }

      return item
    })

    if (ctx.dryRun) {
      return { products: normalized, total, totalPages: pages }
    }

    products.value      = normalized
    totalProducts.value = total
    totalPages.value    = pages

    return normalized

  } catch (err) {
    console.warn('[fetchAdminDrafts] failed', err)
    return products.value || []
  }
}
async function fetchProductsIfNeeded(ctx) {
  if (initialized.value && products.value.length) return products.value

  // 2) Fallback network
  await preFetchProducts(ctx)
  return products.value
}

// --- consumer helpers ---
async function fetchSingleProduct(slug) {
  // 1. Check if we already have it in the existing list
  const existing = products.value.find(p => {
    const pSlug = p.permalink?.split('/').filter(Boolean).pop()
    return pSlug === slug
  })

  if (existing) return existing

  // 2. If not, fetch it specifically from the API
  try {
    productsLoading.value = true
    // You'll need a method in your woocommerce boot file that calls
    // `wp-json/wc/v3/products?slug=...`
    const fetchSingleProduct = await fetch(`${import.meta.env.VITE_API_BASE}/wp-json/wc/store/products/${slug}`)

    const data = await fetchSingleProduct.json();

    if (data) {
      // Add it to our local state so other components can use it
      products.value.push(data)
      return data
    }
  } catch (err) {
    console.error('Error fetching single product:', err)
    const results = await preFetchProducts({search: slug, api: true})
    const found = Array.isArray(results) ? results[0] : results?.products?.[0] ?? null
    if (found) {
      products.value.push(found)
      return found
    }
  } finally {
    productsLoading.value = false
  }
  return null
}
function getById(id) {
  return products.value.find(p => p.id === id) || null
}

async function prefetchCategories() {
  try {
    const url = `${import.meta.env.VITE_API_BASE}/wp-json/wc/store/products/categories`
    const apiCats = await fetch(url)
    const jsonCats = await apiCats.json()

    categories.value = jsonCats

  } catch {
    let localCategories = [];

    console.log('fetching local categories')
    if (import.meta.env.DEV && import.meta.env.SSR) {
      const { readFile } = await import('fs/promises')
      const { resolve } = await import('path')
      const filePath = resolve(process.cwd(), 'public', 'data', 'categories.json')
      console.log(`[SSR] Reading categories from filesystem: ${filePath}`)
      const raw = await readFile(filePath, 'utf-8')
      localCategories = JSON.parse(raw)
    } else {
      const url = import.meta.env.SSR ? `${Base}/data/categories.json` : '/data/categories.json'
      if (import.meta.env.SSR) console.log(`[SSR] Fetching categories via HTTP: ${url}`)
      const localRes = await fetch(url)
      if (!localRes.ok) throw new Error('categories.json fallback failed')
      localCategories = await localRes.json()
    }

    categories.value = localCategories
  }

  return categories.value;
}

async function prefetchPriceMeta(cat = null) {
  try {
    let url = `${import.meta.env.VITE_API_BASE}/wp-json/wc/store/products-meta`
    console.log('category is:', cat)
    if (cat) {
      url += `?category=${cat}`
    } else {
      //cat = 'global';
    }
    const apiPriceMeta = await fetch(url)
    const jsonPriceMeta = await apiPriceMeta.json()
    console.log('jsonPriceMeta', jsonPriceMeta)
    priceMeta.value = jsonPriceMeta?.global ? jsonPriceMeta.global : jsonPriceMeta
  } catch {
    console.log('using catch method')
    let localPriceMeta = [];

    if (import.meta.env.DEV && import.meta.env.SSR) {
      const { readFile } = await import('fs/promises')
      const { resolve } = await import('path')
      const filePath = resolve(process.cwd(), 'public', 'data', 'price-meta.json')
      console.log(`[SSR] Reading price-meta from filesystem: ${filePath}`)
      const raw = await readFile(filePath, 'utf-8')
      localPriceMeta = JSON.parse(raw)
    } else {
      const url = import.meta.env.SSR ? `${Base}/data/price-meta.json` : '/data/price-meta.json'
      if (import.meta.env.SSR) console.log(`[SSR] Fetching price-meta via HTTP: ${url}`)
      const localRes = await fetch(url)
      if (!localRes.ok) throw new Error('price-meta.json fallback failed')
      localPriceMeta = await localRes.json()
    }

    console.log(localPriceMeta)
    console.log(cat)
    console.log(!cat || (Array.isArray(cat) && cat.length === 0))
    if (!cat || (Array.isArray(cat) && cat.length === 0)) {
      localPriceMeta = localPriceMeta?.global
    } else {
      const catIds = Array.isArray(cat)
        ? cat.map(String)
        : String(cat).split(',').map(id => id.trim()).filter(Boolean)

      if (catIds.length === 1) {
        localPriceMeta = localPriceMeta?.categories?.[catIds[0]]
      } else {
        const matched = catIds
          .map(id => localPriceMeta?.categories?.[id])
          .filter(Boolean)

        localPriceMeta = matched.length
          ? { min_price: Math.min(...matched.map(m => m.min_price)), max_price: Math.max(...matched.map(m => m.max_price)) }
          : localPriceMeta?.global
      }
    }

    priceMeta.value = localPriceMeta
  }

  return priceMeta.value;
}

export default {
  products,
  categories,
  priceMeta,
  prefetchPriceMeta,
  prefetchCategories,
  productsLoading,
  initialized,
  preFetchProducts,
  fetchProductsIfNeeded,
  getById,
  getByIds,
  fetchSingleProduct,
  getFeaturedProducts,
  totalProducts,
  totalPages
}
