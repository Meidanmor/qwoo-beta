<template>
  <div class="container q-pa-md">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0" class="empty-cart-msg">
      Your cart is empty. <router-link to="/products/">Go to shop</router-link>
    </div>
        <div v-else-if="cart.hasItems.value && isHydrated" class="cart-items-wrap">
        <div v-for="item in cart.state.items" :key="item.id" class="q-pa-sm row items-center" :class="[item.key.includes('offline') ? 'offline-item' : '']">
          <div class="flex">
          <img v-if="item.images" :src="cart.state.offline === true ? item?.images[0]?.src : item.images[0]?.thumbnail" style="width: 70px; height: 70px; object-fit: cover" />
            <div class="product-meta">
            <div>{{ item.name }}</div>
           <div v-if="item.variation && item.variation.length > 0">
             <div
             v-for="(variation, index) in item.variation"
             :key="index"
             >
             {{variation.attribute}}: {{variation.value}}
             </div>
          </div>
            <div v-if="item.prices">
              {{formatCurrency(
    item.prices.price,
    {
      minorUnit: item.prices?.currency_minor_unit ?? 2,
      decimalSeparator: item.prices?.currency_decimal_separator ?? '.',
      prefix: item.prices?.currency_prefix ?? '₪',
      suffix: item.prices?.currency_suffix ?? ''
    }
  )}}
            </div>
            </div>
          </div>
            <div class="row items-center">
              <div class="qty-wrap">
              <q-btn size="xs" padding="xs" :flat="true" :icon="matRemove" @click="decrease(item.key)" :disable="item.quantity === 1" />
              <span class="q-mx-sm">{{ item.quantity }}</span>
              <q-btn size="xs" padding="xs" :flat="true" :icon="matAdd" @click="increase(item.id)" />
              </div>
              <q-btn :outline="true" size="xs" padding="xs" :icon="matClose" @click="remove(item.key, item.remote_key)" class="q-ml-sm" />
            </div>
        </div>

        </div>
    </div>
</template>

<script setup>
import cart from 'src/stores/cart';
import {computed, onMounted, ref} from 'vue';
import { useMeta } from 'quasar';
import {
  matAdd,
  matClose,
  matRemove} from '@quasar/extras/material-icons'
import {formatCurrency} from 'src/utils/formatters.js'

defineOptions({
  async preFetch ({ ssrContext }) {
    //const seo = await fetchSeoForPath('checkout')
    const seo = {
      title: 'Cart',
      description: 'Cart page',
      robots: 'noindex, follow'
    }
    if (ssrContext) {
      ssrContext.seoData = seo
    }
  }
})
useMeta(() => {
  return {
    title: 'Cart',
    meta: {
      robots: {name: 'robots', content: 'noindex, follow'},
      description: {name: 'description', content: 'Cart page'},
    }
  };
});
const increase = (id) => cart.increase(id)
const decrease = (id) => cart.decrease(id)
const remove = (itemKey=null, itemAPIkey=null) => cart.remove(itemKey,itemAPIkey)

const cartItems = computed(() => cart.state.items);
const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})
</script>

<style>
.empty-cart-msg {
  padding: 20px 0;
  font-size: 20px;
}
.empty-cart-msg a {
  text-decoration: underline;
  font-weight: 600;
}
.cart-items-wrap>.row{
    justify-content: space-between;
}
.cart-items-wrap>.row:not(:last-child) {
    border-bottom: 1px solid;
}
.cart-items-wrap {
    padding: 20px;
    border: 1px solid var(--q-secondary);
    border-radius: 20px;
}
.cart-items-wrap .flex {
  column-gap: 5px;
}
</style>
