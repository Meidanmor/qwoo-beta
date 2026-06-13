import { reactive } from 'vue'
import { fetchWithToken } from 'src/composables/useApiFetch.js'
import { isLoggedIn } from 'src/stores/user'
import { matFavorite } from '@quasar/extras/material-icons'

/* -------------------------
   Constants
   ------------------------- */
const API_BASE = import.meta.env.VITE_STORE_API_BASE
const DEBUG = import.meta.env.DEV

/* -------------------------
   State
   ------------------------- */
const state = reactive({
  items: [],
  loading: false,
  error: null,
  offline: typeof window !== 'undefined' ? !navigator.onLine : false
})

/* -------------------------
   Helpers
   ------------------------- */
function notifyUser($q, type, message, icon) {
  if ($q?.notify) $q.notify({ type, message, icon })
}

/* -------------------------
   Persistence
   ------------------------- */
function persist() {
  try {
    localStorage.setItem('offline_wl', JSON.stringify(state.items || []))
  } catch (err) {
    if (DEBUG) console.warn('[wishlist] persist failed', err)
  }
}

function load() {
  try {
    const raw = localStorage.getItem('offline_wl')
    if (raw) state.items = JSON.parse(raw)
  } catch (err) {
    if (DEBUG) console.warn('[wishlist] load failed', err)
  }
}

/* -------------------------
   Product cache helper
   (re-uses the same getCachedProduct logic as cart,
    but we import productsStore directly to keep wishlist self-contained)
   ------------------------- */
async function _getCachedProduct(productId) {
  // Lazy import to avoid circular dependency with cart
  try {
    const productsStore = (await import('src/stores/products')).default
    const fromStore = productsStore.getById(Number(productId))
    if (fromStore) return fromStore

    if (typeof window !== 'undefined' && 'caches' in window) {
      const cache = await caches.open('products-cache')
      const res = await cache.match('/api/products')
      if (res?.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          const found = data.find(p => Number(p.id) === Number(productId))
          if (found) return found
        }
      }
    }

    if (typeof navigator !== 'undefined' && navigator.onLine) {
      await productsStore.fetchProductsIfNeeded()
      return productsStore.getById(Number(productId)) || null
    }
  } catch (err) {
    if (DEBUG) console.warn('[wishlist] _getCachedProduct failed', err)
  }
  return null
}

function _buildSlugFromPermalink(permalink) {
  try {
    const url = new URL(permalink)
    return url.pathname
      .replace(/^\/product/, '')
      .replace(/\/$/, '')
      .replace(/^\//, '')
  } catch {
    return ''
  }
}

/* -------------------------
   Public API
   ------------------------- */
async function fetchWishlistItems() {
  if (typeof window === 'undefined') return

  // Always load local first for instant UI
  load()

  if (state.offline || !isLoggedIn.value) return

  state.loading = true
  try {
    const res = await fetchWithToken(`${API_BASE}/wishlist/`, {
      method: 'GET',
      credentials: 'include'
    })
    const serverWishlist = await res.json()
    const serverItems = serverWishlist.wishlist || serverWishlist || []

    // Merge: server is authoritative, keep any local-only items not yet on server
    const serverIds = new Set(serverItems.map(i => i.id))
    const localOnly = state.items.filter(i => !serverIds.has(i.id))
    state.items = [...serverItems, ...localOnly]
    persist()
  } catch (err) {
    if (DEBUG) console.warn('[wishlist] fetchWishlistItems failed', err)
    state.error = err.message
    load() // fallback to local
  } finally {
    state.loading = false
  }
}

async function toggleWishlistItem(productId, $q = null) {
  state.loading = true

  // --- GUEST / OFFLINE LOGIC ---
  if (state.offline || !isLoggedIn.value) {
    try {
      if (!Array.isArray(state.items)) state.items = []

      const exists = state.items.find(p => p.id === productId)
      if (exists) {
        state.items = state.items.filter(p => p.id !== productId)
      } else {
        const cachedProduct = await _getCachedProduct(productId)
        const slug = cachedProduct?.permalink
          ? _buildSlugFromPermalink(cachedProduct.permalink)
          : ''
        const newItem = cachedProduct
          ? {
              id: cachedProduct.id,
              name: cachedProduct.name,
              image: cachedProduct?.images?.[0]?.thumbnail || '',
              slug
            }
          : { id: productId }
        state.items.push(newItem)
      }

      persist()
      notifyUser($q, 'positive', exists ? 'Removed from wishlist' : 'Added to wishlist', matFavorite)
    } catch (err) {
      if (DEBUG) console.warn('[wishlist] guest toggle failed', err)
    } finally {
      state.loading = false
    }
    return
  }

  // --- LOGGED-IN LOGIC (optimistic update) ---
  try {
    const exists = state.items.find(p => p.id === productId)

    // Optimistic update
    if (exists) {
      state.items = state.items.filter(p => p.id !== productId)
    } else {
      const cachedProduct = await _getCachedProduct(productId)
      const newItem = cachedProduct
        ? { id: cachedProduct.id, name: cachedProduct.name, images: cachedProduct.images }
        : { id: productId }
      state.items.push(newItem)
    }
    persist()

    // Sync with backend
    const res = await fetchWithToken(`${API_BASE}/wishlist/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId })
    })
    const wishlistData = await res.json()
    state.items = wishlistData.wishlist || wishlistData || []
    persist()

    notifyUser($q, 'positive', exists ? 'Removed from wishlist' : 'Added to wishlist', matFavorite)
  } catch (err) {
    if (DEBUG) console.error('[wishlist] toggleWishlistItem failed', err)
    state.error = err.message
  } finally {
    state.loading = false
  }
}

/* -------------------------
   Init
   ------------------------- */
if (typeof window !== 'undefined') {
  load()
  window.addEventListener('online', () => { state.offline = false })
  window.addEventListener('offline', () => { state.offline = true })
}

/* -------------------------
   Exports
   ------------------------- */
export default {
  state,
  fetchWishlistItems,
  toggleWishlistItem
}