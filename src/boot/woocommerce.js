// src/boot/woocommerce.js
import { fetchWithToken } from 'src/composables/useApiFetch.js'

const API_BASE =
  import.meta.env.SSR
    ? process.env.VITE_API_BASE
    : import.meta.env.VITE_API_BASE

const baseURL = `${API_BASE}/wp-json/wc/store/v1`

export const fetchAPI = async (endpoint) => {
  console.log(endpoint)
  try {
    const res = await fetchWithToken(`${baseURL}${endpoint}`, { credentials: 'include' })
    if (!res || !res.ok) {
      console.error(`[fetchAPI] WooCommerce API error: ${res?.status ?? 'unknown'}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('[fetchAPI] Failed to fetch:', err)
    return null
  }
}

export async function fetchProductById(id) {
  const res = await fetchWithToken(`${baseURL}/products/${id}`, { credentials: 'include' })
  if (!res.ok) throw new Error('Product not found')
  return await res.json()
}

export async function fetchAllProducts() {
  const response = await fetchWithToken(`${baseURL}/products?per_page=100`, { credentials: 'include' })
  return await response.json()
}

/**
 * Fetches paginated draft + published products via wc/v3 (admin only).
 * Accepts the same query params as preFetchProducts so pagination,
 * filtering and sorting are handled server-side.
 *
 * Returns { products, total, totalPages }
 */
export async function fetchAdminProducts(params = {}) {
  const {
    page = 1,
    per_page = 6,
    search,
    category,
    //orderby,
    //order,
    min_price,
    max_price,
  } = params

  const buildQuery = () => {
    const q = new URLSearchParams()
    //q.append('include_status[]', 'draft')
    //q.append('include_status[]', 'publish')
    q.append('page', page)
    q.append('per_page', per_page)
    if (search)    q.append('search', search)
    if (category)  q.append('category', category)
    //if (orderby && orderby !== 'menu_order') q.append('orderby', orderby)
    //if (order)     q.append('order', order)
    if (min_price !== undefined && !isNaN(min_price)) q.append('min_price', Math.round(min_price))
    if (max_price !== undefined && !isNaN(max_price)) q.append('max_price', Math.round(max_price))
    return q.toString()
  }

  try {
    const url = `${API_BASE}/wp-json/qwoo/v1/admin-products?${buildQuery()}`

    const [productsRes] = await Promise.all([
      fetchWithToken(url, { credentials: 'include' }),
    ])

    const products    = await productsRes.json()

    // wc/v3 returns total published count in the publish response header
    const total = parseInt(productsRes.headers.get('X-WP-Total') || '0')
    const totalPages = parseInt(productsRes.headers.get('X-WP-TotalPages') || '0')
    console.log('products admin', products)

    return { products: products, total, totalPages }

  } catch (err) {
    console.error('[fetchAdminProducts] Failed:', err)
    return { products: [], total: 0, totalPages: 1 }
  }
}

const WC = {
  getProducts:       ()       => fetchAPI('/products?per_page=100'),
  getProductBySlug:  (slug)   => fetchAPI(`/products/${slug}`),
  getCategories:     ()       => fetchAPI('/products/categories'),
  getAdminProducts:  (params) => fetchAdminProducts(params),
}

export default WC