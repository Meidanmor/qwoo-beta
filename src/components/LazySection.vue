<template>
  <div v-if="renderMe || isServer">
    <slot />
  </div>
  <div v-else class="lazy-placeholder"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Detect if we are on the server
const isServer = typeof window === 'undefined'
const renderMe = ref(false)

onMounted(() => {
  // Only the browser hits this.
  // We wait for the 'idle' state so the Hero Image can paint first.
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      renderMe.value = true
    })
  } else {
    setTimeout(() => {
      renderMe.value = true
    }, 500)
  }
})
</script>