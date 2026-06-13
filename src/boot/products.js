// src/boot/products.js
import productsStore from 'src/stores/products'

export default async ({ ssrContext }) => {
  if (import.meta.env.SSR) {
    // server: fetch once and embed into ssrContext
    await productsStore.preFetchProducts(ssrContext)
  } else {
    // client: just hydrate from SSR payload if available
    productsStore.initFromSSR()
    // ❌ don’t call preFetchProducts() here
  }
}
