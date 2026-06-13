import { defineStore } from 'pinia'

export const useOfflineCart = defineStore('offlineCart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('offline-cart') || '[]'),
    isOnline: navigator.onLine,
  }),

  actions: {
    addToCart(productId, quantity = 1) {
      const existing = this.items.find(i => i.product_id === productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product_id: productId, quantity })
      }

      this.saveLocal()
      if (this.isOnline) this.syncToWoo()
    },

    removeFromCart(productId) {
      this.items = this.items.filter(i => i.product_id !== productId)
      this.saveLocal()
      if (this.isOnline) this.syncToWoo()
    },

    saveLocal() {
      localStorage.setItem('offline-cart', JSON.stringify(this.items))
    },

    async syncToWoo() {
      if (!this.isOnline || this.items.length === 0) return

      try {
        // Replace this with your real API call
        await fetch(`${import.meta.env.VITE_API_BASE}/wp-json/wc/store/v1/cart/items/bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: this.items }),
        })

        console.log('[Cart] Synced to WooCommerce!')
      } catch (err) {
        console.error('[Cart] Sync failed:', err)
      }
    },

    listenToOnlineStatus() {
      window.addEventListener('online', () => {
        this.isOnline = true
        this.syncToWoo()
      })
      window.addEventListener('offline', () => {
        this.isOnline = false
      })
    },
  }
})
