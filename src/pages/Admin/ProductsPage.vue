<template>
  <q-page class="q-pa-md">
    <q-table
      :rows="products"
      :columns="columns"
      row-key="id"
      @row-click="goToProduct"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from 'src/boot/woocommerce';
import { useRouter } from 'vue-router'
const router = useRouter()

const products = ref([])
const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'price', label: 'Price', field: 'price' },
  { name: 'stock_status', label: 'Stock Status', field: 'stock_status' }
]

onMounted(fetchProducts)

async function fetchProducts() {
  const res = await api.getAdminProducts();
  const data = await res
  products.value = data
}

function goToProduct(_, row) {
  router.push(`/admin/products/${row.id}`)
}
</script>
