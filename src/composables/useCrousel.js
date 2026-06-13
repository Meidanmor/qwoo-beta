// src/composables/useCarousel.js
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useCarouselKeyboard } from './useCarouselKeyboard'

export function useCarousel(getItems, { isHydrated }) {
  const $q = useQuasar()
  const slide = ref(0)
  const carouselKey = ref(0)
  const slideChunks = ref([])

  const getChunks = (array, size) => {
    if (!Array.isArray(array) || !array.length) return []
    const chunks = []
    for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size))
    return chunks
  }

  const recompute = async (forceRemount = false) => {
    if (!isHydrated.value) return
    const items = await getItems()
    const chunkSize = $q.screen.lt.sm ? 1 : $q.screen.lt.md ? 2 : 3
    if (forceRemount) carouselKey.value++
    slideChunks.value = getChunks(items, chunkSize)
  }

  const showControls = computed(() => slideChunks.value.length > 1)
  const total = computed(() => slideChunks.value.length)
  const { onKeydown } = useCarouselKeyboard(slide, total)

  return { slide, carouselKey, slideChunks, showControls, total, onKeydown, recompute }
}