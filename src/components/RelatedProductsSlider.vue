<template>
  <section class="related-products">
  <div class="container">
    <h2 class="text-h5 q-mb-md text-center">Related Products</h2>

    <!-- GRID MODE (for few products) -->
    <div v-if="products.length <= perSlide" class="related-product-wrapper row justify-center">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-xs-12 col-sm-6 col-md-3 q-mb-md relative-position"
      >
          <ProductCard :product="product" />
      </div>
    </div>

    <!-- SLIDER MODE -->
    <q-carousel
        @touchstart.stop
        @mousedown.stop
      v-else
      v-model="slide"
      animated
      infinite
      swipeable
      :arrows="false"
      navigation
      control-color="primary"
      height="auto"
      class="bg-transparent"
    >
      <q-carousel-slide
        v-for="(group, index) in slideChunks"
        :key="index"
        :name="index"
      >
        <div class="related-product-wrapper row justify-center">
          <div
            v-for="product in group"
            :key="product.id"
            :class="[colClass, 'q-mb-md', 'relative-position']"
          >
          <ProductCard :product="product" />
          </div>
        </div>
      </q-carousel-slide>
'
      <!-- Custom navigation dots -->
      <template #navigation-icon="{ name, onClick, btnProps }">
        <q-btn
            v-bind="btnProps"
            :flat="false"
            :color="slide === name ? 'secondary' : (btnProps.color || 'grey-5')"
            size="sm"
            :icon="null"
            style="font-size: 5px;padding: 0"
            round
            dense
            :aria-label="`Go to slide ${name + 1}`"
            @click="onClick"
        />
      </template>

      <!-- Custom arrows -->
      <template #control>
        <q-carousel-control position="left" class="flex items-center">
          <q-btn
            :icon="matChevronLeft"
            aria-label="Previous"
            flat
            round
            dense
            color="secondary"
            @click="prevSlide"
          />
        </q-carousel-control>
        <q-carousel-control position="right" class="flex items-center">
          <q-btn
            :icon="matChevronRight"
            aria-label="Next"
            flat
            round
            dense
            color="secondary"
            @click="nextSlide"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
//import { fetchAllProducts } from 'src/boot/woocommerce'
import { matChevronLeft, matChevronRight } from '@quasar/extras/material-icons'
import ProductCard from 'src/components/ProductCard.vue'
import { preFetchProducts } from 'src/stores/products'
const props = defineProps({
  productId: Number,
  categoryId: Number
})

const $q = useQuasar()
const slide = ref(0)
const products = ref([])
const perSlide = ref(4) // default desktop count


const getSlugFromPermalink = (permalink) => {
  const match = permalink.match(/product\/([^/]+)\/?$/)
  return match ? match[1] : ''
}

// Responsive per-slide setup
const updatePerSlide = () => {
  if ($q.screen.lt.sm) perSlide.value = 2
  else if ($q.screen.lt.md) perSlide.value = 3
  else perSlide.value = 4
}
updatePerSlide()
watch(() => $q.screen.name, updatePerSlide)

const colClass = computed(() => {
  if ($q.screen.lt.sm) return 'col-6'
  if ($q.screen.lt.md) return 'col-4'
  return 'col-3'
})

const slideChunks = computed(() => {
  const chunks = []
  for (let i = 0; i < products.value.length; i += perSlide.value) {
    chunks.push(products.value.slice(i, i + perSlide.value))
  }
  return chunks
})

// Slide controls
const prevSlide = () => {
  slide.value = (slide.value - 1 + slideChunks.value.length) % slideChunks.value.length
}
const nextSlide = () => {
  slide.value = (slide.value + 1) % slideChunks.value.length
}

const fetchRelatedProducts = async () => {
  // Try to fetch by category first (uses live API with offline fallback)
  let result = await preFetchProducts({
    category: props.categoryId,
    per_page: 9, // fetch one extra to account for filtering out current product
  })

  // preFetchProducts can return an array or { products, total, totalPages }
  let related = (Array.isArray(result) ? result : result?.products ?? [])
    .filter((p) => p.id !== props.productId )
    .map((p) => ({
      ...p,
      slug: getSlugFromPermalink(p.permalink),
    }))

  // Fallback: if no related in same category, fetch general products
  if (related.length === 0) {
    result = await preFetchProducts({ per_page: 9 })

    related = (Array.isArray(result) ? result : result?.products ?? [])
      .filter((p) => p.id !== props.productId && p.is_in_stock)
      .slice(0, 8)
      .map((p) => ({
        ...p,
        slug: getSlugFromPermalink(p.permalink),
      }))
  }

  products.value = related
}

onMounted(fetchRelatedProducts)

watch([() => props.productId, () => props.categoryId], fetchRelatedProducts)
</script>

<style>
section.related-products {
    padding-left: 0;
    padding-right: 0;
}
.related-products .related-product-wrapper > div {
    padding: 20px 5px;
}
.related-products .related-product-wrapper > div,
.related-products .related-product-wrapper > div .q-card{
    transition: 0.3s ease;
}

.related-products .related-product-wrapper > div:hover {
  transform: translateY(-10px);
  z-index: 1;
}

.related-products .related-product-wrapper > div:hover .q-card {
  opacity: 0.8;
  box-shadow: 0px 10px 25px #00000020;
}

.related-products img.q-img__image {
  height: 100%;
}
.related-products .q-img.q-img--menu.q-mb-sm {
    height: 200px;
}
@media(max-width: 767px){
  .related-products .q-carousel img {
    max-height: 250px;
  }
}
</style>
