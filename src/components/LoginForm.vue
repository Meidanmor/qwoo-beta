<template>
  <q-form @submit.prevent="login">
    <q-input
      v-model="username"
      label="Username or Email"
      filled
      :disable="loading"
    />
    <q-input
      v-model="password"
      type="password"
      label="Password"
      filled
      :disable="loading"
    />

    <q-btn
      label="Login"
      type="submit"
      color="secondary"
      :loading="loading"
    />

    <div v-if="error" class="text-negative q-mt-md">{{ error }}</div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import cart from 'src/stores/cart.js'

const username = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

const emit = defineEmits(['login-success'])

const API = import.meta.env.VITE_API_BASE

// ─── Helpers ──────────────────────────────────────────────────────────────────

// All requests use credentials: 'include' so WP session cookies are sent.
// No Authorization header, no token storage.
function apiFetch(path, options = {}) {
  return fetch(`${API}/wp-json/${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
}

// ─── Cart merge ───────────────────────────────────────────────────────────────

// If the guest had items in their cart before logging in, merge them into the
// now-authenticated session cart.
async function mergeGuestCart(guestItems) {
  if (!guestItems?.length) return

  // After wp_signon the session cookie is set, so the store API now sees the
  // logged-in user automatically via credentials: 'include'.
  const userCart = await apiFetch('wc/store/v1/cart').then(r => r.json())

  if (userCart.items_count > 0) return // user already has items — don't overwrite

  let lastResponse = null

  for (const item of guestItems) {
    const res = await apiFetch('wc/store/v1/cart/add-item', {
      method: 'POST',
      body: JSON.stringify({ id: item.id, quantity: item.quantity }),
    })
    lastResponse = await res.json()
  }

  if (lastResponse) {
    cart.state.items       = lastResponse.items       || []
    cart.state.items_count = lastResponse.items_count || 0
    cart.state.totals      = lastResponse.totals      || {}
    cart.state.coupons     = lastResponse.coupons     || []
    cart.state.cart_array  = lastResponse             || []
  }
}

// ─── Login ────────────────────────────────────────────────────────────────────

async function login() {
  error.value   = ''
  loading.value = true

  try {
    // 1. Snapshot the guest cart before login so we can merge it after
    const guestCart = await apiFetch('wc/store/v1/cart').then(r => r.json())

    // 2. Call our custom login endpoint
    const res  = await apiFetch('qwoo/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
    const data = await res.json()

    // 3. Handle login errors returned from the endpoint
    if (!data.success) {
      error.value = data.message || 'Login failed. Please try again.'
      return
    }

    // 4. Store the clean user object in the cart store
    cart.state.user = data.user

    // 5. Merge guest cart into the authenticated session if needed
    await mergeGuestCart(guestCart.items)

    // 6. Notify parent — pass user data, not a token
    emit('login-success', data.user)

  } catch (err) {
    console.error('Login error:', err)
    error.value = 'A server error occurred. Please try again later.'
  } finally {
    loading.value = false
  }
}
</script>