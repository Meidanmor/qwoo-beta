<!-- src/components/AppCarousel.vue -->
<template>
  <q-carousel
    :key="carouselKey"
    v-model="slide"
    animated
    swipeable
    :infinite="showControls"
    :navigation="showControls"
    :arrows="false"
    height="auto"
    control-color="primary"
    class="rounded-borders"
    tabindex="0"
    @touchstart.stop
    @mousedown.stop
    @keydown="onKeydown"
  >
    <slot />

<template v-if="showControls" #navigation-icon="{ name, onClick }">
  <q-btn
    :flat="false"
    size="sm"
    round dense
    :icon="null"
    :style="{
      background: Number(slide) === Number(name) ? 'var(--q-secondary)' : '#9e9e9e',
      fontSize: '5px',
      padding: 0
    }"
    :aria-label="`Go to slide ${name + 1}`"
    @click="onClick"
  />
</template>

    <template v-if="showControls" #control>
      <q-carousel-control position="left" class="flex items-center">
        <q-btn :icon="matChevronLeft" flat round dense color="secondary"
          aria-label="Previous slide"
          @click="slide = (slide - 1 + total) % total"
        />
      </q-carousel-control>
      <q-carousel-control position="right" class="flex items-center">
        <q-btn :icon="matChevronRight" flat round dense color="secondary"
          aria-label="Next slide"
          @click="slide = (slide + 1) % total"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script setup>
import { matChevronLeft, matChevronRight } from '@quasar/extras/material-icons'

defineProps({
  carouselKey: Number,
  showControls: Boolean,
  total:        Number,
  onKeydown:    Function,
})

const slide = defineModel()
</script>