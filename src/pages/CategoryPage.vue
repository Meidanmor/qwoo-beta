<template>
  <div class="main-wrapper-div">
    <div class="container">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Products" to="/products" />
        <q-breadcrumbs-el><span v-html="selectedCategoryOBJ?.name"></span></q-breadcrumbs-el>
      </q-breadcrumbs>

      <h1 v-html="selectedCategoryOBJ?.name || 'Products'"></h1>

      <div class="archive-layout flex no-wrap">
        <div class="filters-wrap flex" :class="{ 'shown': filtersOpen }">
          <q-btn class="mobile-only" :icon="matClose" color="secondary" @click="filtersOpen = false" />

          <div class="col-xs-12 col-md-6">
            <q-input filled v-model="search" label="Search products..." debounce="300" />
          </div>

          <div class="filters-inner-wrap q-pa-md q-mb-md" v-if="!priceMin">
            <q-skeleton type="rect" class="q-mb-md" />
          </div>

          <q-card class="filters-inner-wrap price-range-wrap q-pa-md q-mb-md" v-else>
            <div class="text-subtitle1 q-mb-sm">Filter by Price</div>
            <q-range
              v-model="priceRange"
              :min="priceMin"
              :max="priceMax"
              label-always
              label
              dense
              color="secondary"
              :step="0.01"
              @change="onPriceChange"
            />
          </q-card>
        </div>

        <div class="products-wrap">
          <div class="flex justify-between q-mb-md total-products">
            <div v-if="totalProducts" class="text-subtitle1 q-mb-sm">
              Found {{ totalProducts || 0 }} product{{ totalProducts === 1 ? '' : 's' }}
            </div>
          </div>

          <div class="flex justify-between q-mb-md sticky">
            <q-select
              filled
              v-model="sortBy"
              label="Sort by"
              emit-value
              map-options
              :options="sortOptions"
              :dropdown-icon="matArrowDropDown"
              :loading-icon="matAutorenew"
              :clear-icon="matClose"
              color="secondary"
            />
            <q-btn
              class="mobile-only"
              :icon="matFilterList"
              label="Filters"
              color="secondary"
              @click="filtersOpen = !filtersOpen"
            />
          </div>

          <div v-if="productsStore.productsLoading.value" class="products-inner row q-col-gutter-md">
            <div v-for="n in 6" :key="'skeleton-' + n" class="col-xs-12 col-sm-6 col-md-4">
              <q-card class="my-card full-height">
                <q-skeleton height="250px" square />
                <q-card-section>
                  <q-skeleton type="text" width="70%" />
                  <q-skeleton type="text" width="40%" />
                </q-card-section>
                <q-card-actions class="q-gutter-sm">
                  <q-skeleton type="rect" width="100px" height="36px" />
                  <q-skeleton type="rect" width="70px" height="36px" />
                </q-card-actions>
              </q-card>
            </div>
          </div>

          <div v-else-if="paginatedProducts.length" class="products-inner row q-col-gutter-md">
            <div
              v-for="(product, index) in paginatedProducts"
              :key="product.id"
              class="col-xs-12 col-sm-6 col-md-4 relative-position"
            >
              <ProductCard :product="product" :priority="index < 3" />
            </div>
          </div>

          <div v-else class="text-center q-mt-lg">No products found</div>

          <div v-if="totalPages > 1" class="q-mt-lg flex flex-center pagination-btns">
            <q-pagination
              v-model="currentPage"
              :max="totalPages || 1"
              max-pages="6"
              boundary-numbers
              direction-links
              :icon-prev="matKeyboardArrowLeft"
              :icon-next="matKeyboardArrowRight"
              color="secondary"
              @update:model-value="scrollToTop"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, useSSRContext, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFilterSync, parseQueryFilters } from 'src/composables/useFilterSync'
import { useMeta, scroll } from 'quasar'
import { fetchSeoForPath } from 'src/composables/useSeo'
import productsStore from 'src/stores/products'
import { matKeyboardArrowLeft, matKeyboardArrowRight, matArrowDropDown, matAutorenew, matClose, matFilterList } from '@quasar/extras/material-icons'
import ProductCard from 'src/components/ProductCard.vue'

const { setVerticalScrollPosition } = scroll
const router = useRouter()
const route  = useRoute()

function scrollToTop() {
  setVerticalScrollPosition(window, 187, 300)
}

// ─── Core state ───────────────────────────────────────────────────────────────
const selectedCategoryOBJ = ref(null)
const selectedCategory    = ref([])
const search              = ref('')
const currentPage         = ref(1)
const perPage             = 6
const sortBy              = ref('menu_order')
const filtersOpen         = ref(false)
const isReady             = ref(false)
const isInitialising      = ref(true)   // ← guards watcher during setup
const priceMin            = ref(null)
const priceMax            = ref(null)
const priceRange          = ref({ min: 0, max: 1000 })
const priceChanged        = ref(0)
const pendingPriceRange   = ref(null)
const seoData             = ref({ title: 'Products', description: 'Products description' })

const sortOptions = [
  { label: 'Default',            value: 'menu_order' },
  { label: 'Newest',             value: 'date_desc'  },
  { label: 'Price: Low to High', value: 'price_asc'  },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z',       value: 'title_asc'  },
  { label: 'Name: Z to A',       value: 'title_desc' },
  { label: 'Popularity',         value: 'popularity' },
  { label: 'Rating',             value: 'rating'     },
]

function getSortParams(sort) {
  switch (sort) {
    case 'price_asc':  return { orderby: 'price',      order: 'asc'  }
    case 'price_desc': return { orderby: 'price',      order: 'desc' }
    case 'date_desc':  return { orderby: 'date',       order: 'desc' }
    case 'title_asc':  return { orderby: 'title',      order: 'asc'  }
    case 'title_desc': return { orderby: 'title',      order: 'desc' }
    case 'popularity': return { orderby: 'popularity', order: 'desc' }
    case 'rating':     return { orderby: 'rating',     order: 'desc' }
    default:           return { orderby: 'menu_order', order: 'desc' }
  }
}

// ─── preFetch (SSR + client-nav) ──────────────────────────────────────────────
defineOptions({
  async preFetch({ ssrContext, currentRoute }) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    }

    // Redefine locally — preFetch runs outside component scope
    function getSortParams(sort) {
      switch (sort) {
        case 'price_asc':  return { orderby: 'price',      order: 'asc'  }
        case 'price_desc': return { orderby: 'price',      order: 'desc' }
        case 'date_desc':  return { orderby: 'date',       order: 'desc' }
        case 'title_asc':  return { orderby: 'title',      order: 'asc'  }
        case 'title_desc': return { orderby: 'title',      order: 'desc' }
        case 'popularity': return { orderby: 'popularity', order: 'desc' }
        case 'rating':     return { orderby: 'rating',     order: 'desc' }
        default:           return { orderby: 'menu_order', order: 'desc' }
      }
    }

    const seo        = await fetchSeoForPath(`product-category/${currentRoute.params.slug}`)
    const categories = await productsStore.prefetchCategories()
    const currentCat = categories.find(c => c.slug === currentRoute.params.slug) || null

    // ✅ Read URL filters (search, sort, page, price) just like ProductsPage
    const urlFilters  = parseQueryFilters(currentRoute.query)
    const sortParams  = getSortParams(urlFilters.sortBy || 'menu_order')
    const minPriceCents = urlFilters.priceRange?.min != null ? Math.floor(urlFilters.priceRange.min * 100) : undefined
    const maxPriceCents = urlFilters.priceRange?.max != null ? Math.ceil(urlFilters.priceRange.max * 100)  : undefined

    const [result, priceMeta] = await Promise.all([
      productsStore.preFetchProducts({
        api:       true,
        page:      urlFilters.currentPage || 1,
        per_page:  6,
        dryRun:    true,
        search:    urlFilters.search || undefined,
        // Category page: always lock to current cat; selectedCategory from URL is extra filter on top
        category:  currentCat?.id ?? undefined,
        min_price: minPriceCents,
        max_price: maxPriceCents,
        ...sortParams,
      }),
      productsStore.prefetchPriceMeta(currentCat?.id ?? null),
    ])

    if (ssrContext) {
      ssrContext.urlFilters           = urlFilters          // ✅ same as ProductsPage
      ssrContext.productsData         = result.products
      ssrContext.categoriesData       = categories
      ssrContext.selectedCategoryData = currentCat
      ssrContext.priceMetaData        = priceMeta
      ssrContext.productsTotal        = result.total
      ssrContext.pagesTotal           = result.totalPages
      ssrContext.seoData              = seo
    } else {
      window.__PRODUCTS_DATA__           = result.products   // ✅ unified naming
      window.__PRODUCTS_TOTAL__          = result.total
      window.__PAGES_TOTAL__             = result.totalPages
      window.__CATEGORIES_DATA__         = categories
      window.__PRICE_META__              = priceMeta
      window.__SELECTED_CATEGORY_DATA__  = currentCat
      window.__SEO_DATA__                = seo
    }

    productsStore.products.value        = result.products
    productsStore.totalProducts.value   = result.total
    productsStore.totalPages.value      = result.totalPages
    productsStore.productsLoading.value = false
  }
})

// ─── SSR hydration ────────────────────────────────────────────────────────────
if (process.env.SERVER) {
  const ssr = useSSRContext()
  if (ssr) {
    productsStore.categories.value = ssr.categoriesData || []
    selectedCategoryOBJ.value      = ssr.selectedCategoryData || null
    selectedCategory.value         = ssr.selectedCategoryData ? [ssr.selectedCategoryData.id] : []

    if (ssr.priceMetaData) {
      priceMin.value = Number(ssr.priceMetaData.min_price) || 0
      priceMax.value = Number(ssr.priceMetaData.max_price) || 0

      // ✅ Respect URL price filters on SSR too
      if (ssr.urlFilters?.priceRange?.min || ssr.urlFilters?.priceRange?.max) {
        priceRange.value = {
          min: ssr.urlFilters.priceRange.min ?? priceMin.value,
          max: ssr.urlFilters.priceRange.max ?? priceMax.value,
        }
      } else {
        priceRange.value = { min: priceMin.value, max: priceMax.value }
      }
    }

    if (ssr.urlFilters?.sortBy) sortBy.value = ssr.urlFilters.sortBy
    if (ssr.urlFilters?.currentPage) currentPage.value = ssr.urlFilters.currentPage
  }
}

// ─── Client hydration ─────────────────────────────────────────────────────────
const isHydrated = ref(
  process.env.CLIENT && (
    productsStore.initialized.value === true ||
    !!(window.__PRODUCTS_DATA__?.length)
  )
)

const { initFromQuery, startWatching } = useFilterSync(
  { search, priceRange, priceMin, priceMax, sortBy, currentPage },
  router,
  route
)

if (process.env.CLIENT) {
  if (window.__SEO_DATA__) seoData.value = window.__SEO_DATA__

  useMeta(() => {
    const seo = seoData.value
    return {
      title: seo?.title || 'NaturaBloom',
      meta: {
        description:    { name: 'description',    content: seo?.description || "Let's Bloom Together" },
        robots:         { name: 'robots',          content: seo?.robots      || 'index, follow'        },
        'og:title':     { property: 'og:title',    content: seo?.title       || 'NaturaBloom'          },
        'og:description':{ property: 'og:description', content: seo?.description || "Let's Bloom Together" },
        'og:image':     { property: 'og:image',    content: seo?.og_image    || ''                     },
      },
      link: [{ rel: 'canonical', href: seo?.canonical || window?.location?.href || '' }],
    }
  })

  const hasSSRProducts = Array.isArray(window.__PRODUCTS_DATA__) && window.__PRODUCTS_DATA__.length
  const currentCat     = (window.__CATEGORIES_DATA__ || []).find(c => c.slug === route.params.slug) || null

  if (hasSSRProducts) {
    // ── SSR hydration path ──────────────────────────────────────────────────
    productsStore.categories.value      = window.__CATEGORIES_DATA__ || []
    selectedCategoryOBJ.value           = window.__SELECTED_CATEGORY_DATA__ || currentCat
    selectedCategory.value              = selectedCategoryOBJ.value ? [selectedCategoryOBJ.value.id] : []
    productsStore.products.value        = window.__PRODUCTS_DATA__
    productsStore.initialized.value     = true
    productsStore.productsLoading.value = false

    if (window.__PRICE_META__) {
      priceMin.value   = Number(window.__PRICE_META__.min_price) || 0
      priceMax.value   = Number(window.__PRICE_META__.max_price) || 0
      priceRange.value = { min: priceMin.value, max: priceMax.value }
    }

    if (window.__PRODUCTS_TOTAL__) productsStore.totalProducts.value = window.__PRODUCTS_TOTAL__
    if (window.__PAGES_TOTAL__)    productsStore.totalPages.value    = window.__PAGES_TOTAL__

    initFromQuery() // ✅ apply URL sort/page/price on top of hydrated data

  } else if (productsStore.initialized.value) {
    // ── Client-nav path ─────────────────────────────────────────────────────
    productsStore.categories.value = window.__CATEGORIES_DATA__ || []
    selectedCategoryOBJ.value      = currentCat
    selectedCategory.value         = currentCat ? [currentCat.id] : []

    if (window.__PRICE_META__) {
      priceMin.value   = Number(window.__PRICE_META__.min_price)
      priceMax.value   = Number(window.__PRICE_META__.max_price)
      priceRange.value = { min: priceMin.value, max: priceMax.value }
    }

    initFromQuery()
  }

  isReady.value = true
}

// ─── Computed ─────────────────────────────────────────────────────────────────
const paginatedProducts = computed(() => productsStore.products.value || [])
const totalPages        = computed(() => productsStore.totalPages.value)
const totalProducts     = computed(() => productsStore.totalProducts.value)

if (process.env.CLIENT && window.__PRODUCTS_TOTAL__) productsStore.totalProducts.value = window.__PRODUCTS_TOTAL__
if (process.env.CLIENT && window.__PAGES_TOTAL__)    productsStore.totalPages.value    = window.__PAGES_TOTAL__


// ─── Helpers ──────────────────────────────────────────────────────────────────
const committedPrice = ref(null) // ✅ only updates on slider release

function onPriceChange() {
  committedPrice.value = { ...priceRange.value } // snapshot on release
  priceChanged.value++
}
async function fetchPriceMeta(category = null) {
  const data = await productsStore.prefetchPriceMeta(category)
  pendingPriceRange.value = {
    min: Number(data.min_price),
    max: Number(data.max_price),
  }
  return data
}

// ─── Watcher: filters → fetch ─────────────────────────────────────────────────
let requestId = 0

watch(
  () => ({
    category:     selectedCategory.value,
    search:       search.value,
    page:         currentPage.value,
    sort:         sortBy.value,
    priceTrigger: priceChanged.value,
  }),
  async (filters, prev) => {
    if (
      isInitialising.value ||        // ✅ guard — same as ProductsPage
      !isReady.value ||
      priceRange.value.min === null ||
      priceRange.value.max === null
    ) return

    const currentRequest = ++requestId

    // ✅ Snapshot price before any awaits
    const capturedPrice = committedPrice.value
      ? { ...committedPrice.value }
      : { ...priceRange.value }

    const categoryChanged =
      prev &&
      JSON.stringify([...filters.category].sort()) !==
      JSON.stringify([...prev.category].sort())

    const shouldResetPage =
      prev &&
      (filters.search !== prev.search ||
       filters.priceTrigger !== prev.priceTrigger ||
       categoryChanged)

    if (categoryChanged) {
      productsStore.productsLoading.value = true
      await fetchPriceMeta(filters.category)
      priceMin.value   = pendingPriceRange.value.min
      priceMax.value   = pendingPriceRange.value.max
      priceRange.value = { ...pendingPriceRange.value }
      committedPrice.value  = { ...pendingPriceRange.value } // ✅ sync snapshot too
    }

    if (currentRequest !== requestId) return

    if (shouldResetPage && currentPage.value !== 1) {
      currentPage.value = 1
      return
    }

    try {
      if (currentRequest !== requestId) return

    // ✅ Use capturedPrice — never re-reads priceRange.value
    const min        = Math.floor(capturedPrice.min * 100)
    const max        = Math.ceil(capturedPrice.max * 100)
    const sortParams = getSortParams(filters.sort)

      await productsStore.preFetchProducts({
        api:      true,
        page:     currentPage.value,
        per_page: perPage,
        min_price: min,
        max_price: max,
        category: filters.category.length ? filters.category.join(',') : null,
        search:   filters.search,
        ...sortParams,
      })

      if (currentRequest !== requestId) return

      if (categoryChanged) {
        priceMin.value   = pendingPriceRange.value.min
        priceMax.value   = pendingPriceRange.value.max
        priceRange.value = { ...pendingPriceRange.value }
      }
    } finally {
      // intentionally empty
    }
  }
)

// ─── Watcher: slug change (navigating between category pages) ─────────────────
watch(
  () => route.params.slug,
  async (newSlug) => {
    if (!Array.isArray(productsStore.categories.value) || !productsStore.categories.value.length) {
      await productsStore.prefetchCategories()
    }

    const cat = productsStore.categories.value.find(c => c.slug === newSlug)
    if (!cat) return

    selectedCategoryOBJ.value           = cat
    selectedCategory.value              = [cat.id]
    productsStore.products.value        = []
    productsStore.productsLoading.value = true

    await fetchPriceMeta(cat.id)
    priceMin.value   = pendingPriceRange.value.min
    priceMax.value   = pendingPriceRange.value.max
    priceRange.value = { ...pendingPriceRange.value }

    await productsStore.preFetchProducts({
      api:      true,
      page:     1,
      per_page: perPage,
      category: cat.id,
    })

    productsStore.productsLoading.value = false
  }
)

// ─── onMounted ────────────────────────────────────────────────────────────────
onMounted(async () => {
  isHydrated.value = true

  if (window.__SELECTED_CATEGORY_DATA__) {
    selectedCategoryOBJ.value = window.__SELECTED_CATEGORY_DATA__
    selectedCategory.value    = [window.__SELECTED_CATEGORY_DATA__.id]
    window.__SELECTED_CATEGORY_DATA__ = null
  }

  if (window.__PRODUCTS_DATA__) {
    productsStore.products.value        = window.__PRODUCTS_DATA__
    productsStore.totalProducts.value   = window.__PRODUCTS_TOTAL__
    productsStore.totalPages.value      = window.__PAGES_TOTAL__
    productsStore.initialized.value     = true
    productsStore.productsLoading.value = false
    window.__PRODUCTS_DATA__  = null
    window.__PRODUCTS_TOTAL__ = null
    window.__PAGES_TOTAL__    = null
  } else if (!productsStore.initialized.value) {
    productsStore.productsLoading.value = true
    await productsStore.preFetchProducts({
      api:      true,
      page:     1,
      per_page: perPage,
      category: selectedCategoryOBJ.value?.id || null,
    })
  }

  if (!priceMin.value) {
    await fetchPriceMeta(selectedCategoryOBJ.value?.id || null)
    priceMin.value   = pendingPriceRange.value.min
    priceMax.value   = pendingPriceRange.value.max
    priceRange.value = { ...pendingPriceRange.value }
    initFromQuery()  // ✅ bounds just loaded, now safe to read price from URL
  }

  if (!Array.isArray(productsStore.categories.value) || !productsStore.categories.value.length) {
    await productsStore.prefetchCategories()
  }

  if (!isReady.value) isReady.value = true

  startWatching()             // ✅ same as ProductsPage
  await nextTick()
  isInitialising.value = false // ✅ watcher is now live
})
</script>

<style scoped>
@import 'src/css/product-archive.css';
</style>