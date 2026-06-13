<template>
  <q-page class="q-pa-md">
    <q-card>
      {{ product }}
      <q-card-section>
        <div class="text-h6">Edit Product: {{ product.name }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input v-model="product.name" label="Product Name" />
        <q-input v-model="product.regular_price" label="Regular Price" type="number" />
        <q-input v-model="product.sale_price" label="Sale Price" type="number" />
        <q-input v-model="product.stock_quantity" label="Stock" type="number" />
        <q-input v-model="product.sku" label="SKU" />
        <!-- Add more fields as needed -->

        <q-btn label="Save" color="secondary" @click="updateProduct" class="q-mt-md" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { fetchWithToken } from 'src/composables/useApiFetch.js';

const $q = useQuasar()
const route = useRoute()
const product = ref({})

onMounted(fetchProduct)

async function fetchProduct() {
  const res = await fetchWithToken(`${import.meta.env.VITE_API_BASE}/wp-json/wc/v3/products/${route.params.id}`)
  product.value = await res.json()
}

async function updateProduct() {
  product.value.manage_stock = true;
  const res = await fetchWithToken(`${import.meta.env.VITE_API_BASE}/wp-json/wc/v3/products/${route.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product.value)
  })

  if (res.ok) {
    $q.notify({ type: 'positive', message: 'Product updated successfully!' })
  } else {
    $q.notify({ type: 'negative', message: 'Update failed!' })
  }
}
</script>
