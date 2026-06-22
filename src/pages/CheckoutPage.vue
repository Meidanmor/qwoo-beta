<template>
    <div class="container q-pa-md">
      <h1>Checkout</h1>
      <div v-if="isLoggedIn === false && checkoutReady && itemsCount !== '0'">
        <GoogleLoginButton />
      </div>

      <q-form class="flex" v-if="displayCart && itemsCount !== '0'" @submit.prevent="submitOrder" @validation-error="onValidationError">
      <div class="float-left">
      <!-- Personal Info -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Personal Details</div>
          <q-input @blur="handleInputBlur('first_name')" v-model="form.first_name" label="First Name" filled class="q-mb-sm" :rules="[val => !!val || 'First Name is required']"/>
          <q-input @blur="handleInputBlur('last_name')" v-model="form.last_name" label="Last Name" filled class="q-mb-sm" :rules="[val => !!val || 'Last Name is required']"/>
          <q-input
              @blur="handleInputBlur('email')" v-model="form.email"
              label="Email" filled class="q-mb-sm"
              type="text"
              :rules="[
                  val => !!val || 'Email is required',
    val => /^\S+@\S+\.\S+$/.test(val) || 'Please enter a valid email'
  ]"
          />
          <q-input @blur="handleInputBlur('phone')" v-model="form.phone" label="Phone" filled :rules="[val => !!val || 'Phone is required']"/>
        </q-card-section>
      </q-card>

      <!-- Shipping Address -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Shipping Address</div>
          <q-input @blur="handleInputBlur('postcode')" v-model="form.shipping.address_1" label="Address" filled class="q-mb-sm" :rules="[val => !!val || 'Address is required']"/>
          <q-input @blur="handleInputBlur('postcode')" v-model="form.shipping.city" label="City" filled class="q-mb-sm" :rules="[val => !!val || 'City is required']"/>
          <q-input @blur="handleInputBlur('postcode')" v-model="form.shipping.postcode" label="Postcode" filled class="q-mb-sm" :rules="[val => !!val || 'Postcode is required']"/>
          <q-input readonly @blur="handleInputBlur('postcode')" v-model="form.shipping.country" label="Country" filled />
        </q-card-section>

        <q-card-section>
          <q-checkbox v-model="billingSameAsShipping" label="Different billing address?" />
        </q-card-section>
      </q-card>

      <!-- Billing Address (conditional) -->
      <q-card v-if="billingSameAsShipping" class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Billing Address</div>
          <q-input @blur="handleInputBlur('postcode')" v-model="form.billing.address_1" label="Billing Address" filled class="q-mb-sm" />
          <q-input @blur="handleInputBlur('postcode')" v-model="form.billing.city" label="City" filled class="q-mb-sm" />
          <q-input @blur="handleInputBlur('postcode')" v-model="form.billing.postcode" label="Postcode" filled class="q-mb-sm" />
          <q-input @blur="handleInputBlur('postcode')" v-model="form.billing.country" label="Country" filled />
        </q-card-section>
      </q-card>

      <!-- Coupon Section -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Coupon</div>
          <div class="row items-center q-col-gutter-md">
            <div class="col">
              <q-input v-model="couponCode" label="Coupon code" filled />
            </div>
            <div class="col-auto">
              <q-btn label="Apply" color="secondary" @click="applyCoupon(couponCode)" />
            </div>
          </div>
          <div v-if="couponApplied" class="text-positive q-mt-sm">
            Coupon applied successfully!
          </div>
          <div v-if="couponError" class="text-negative q-mt-sm">
            {{ couponError }}
          </div>
          <div v-if="cart.state?.cart_array?.coupons.length">
            <div v-for="coupon in cart.state.cart_array.coupons" :key="coupon.code" class="q-mb-sm row items-center">
              <q-chip color="secondary" text-color="white" class="q-mr-sm">
                {{ coupon.code }}
              </q-chip>
              <q-btn flat color="negative" label="Remove" @click="removeCoupon(coupon.code)" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      </div>
      <div class="float-right relative-position">
        <div class="blockUi" v-if="cart.state.loading.cart === true"></div>
      <!-- Cart Items -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Your Cart</div>
          <div v-for="item in cartItems" :key="item.key" class="q-my-sm flex items-center">
          <div>
             <q-img
              v-if="item?.images?.length"
              :src="item.images[0].src"
              :alt="item.name"
              height="100px"
              width="100px"
              class="rounded-borders"
            />
            </div>
            <div class="flex">
            <div class="item-name">
      <router-link
          :to="{ path: `/product/${getSlugFromPermalink(item.permalink)}`, query: getVariationQuery(item) }"
              class="no-decoration">
              {{ item.name }}</router-link>
             <div v-if="item.variation && item.variation.length > 0">
             <div
             v-for="(variation, index) in item.variation"
             :key="index"
             >
             {{variation.attribute}}: {{variation.value}}
             </div>
          </div>
         </div>
              × {{ item.quantity }} - {{   formatCurrency(
    item.totals?.line_total ??
    (parseInt(toRaw(item.prices)?.price || 0) * item.quantity).toString(),
    {
      minorUnit: item.totals?.currency_minor_unit ?? 2,
      decimalSeparator: item.totals?.currency_decimal_separator ?? '.',
      prefix: item.totals?.currency_prefix ?? '₪',
      suffix: item.totals?.currency_suffix ?? ''
    }
  )
 }}
            </div>
          </div>
        </q-card-section>
      </q-card>

    <!-- Shipping Method -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Choose Shipping Method</div>
        <q-option-group
          v-model="selectedShippingRateId"
          :options="shippingOptions"
          type="radio"
          color="secondary"
          @update:model-value="onShippingMethodChange"
        />
      </q-card-section>
    </q-card>

      <!-- Payment -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Payment Method</div>
          <q-option-group
            v-model="paymentMethod"
            :options="paymentMethods"
            type="radio"
            color="secondary"
          />
        </q-card-section>
      </q-card>

      <!-- Total & Place Order -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div v-if="couponApplied">Total discount: {{formatCurrency(cart.state.cart_array.totals.total_discount)}}</div>
          <div class="text-h6">Total: <span v-if="couponApplied"><del>{{formatCurrency((Number(cart.state.cart_array.totals.total_discount)+Number(cart.state.cart_array.totals.total_price)))}}</del></span> {{ cartTotal }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Place Order" type="submit" color="secondary" />
        </q-card-actions>
      </q-card>
        </div>
    </q-form>

      <div v-else-if="displayCart && itemsCount === '0'">
        Your cart is empty!
        <router-link to="/products/">Go to shop</router-link>
      </div>

      <!-- Render loader and sync retry state -->
      <div v-else class="centered">
        <q-spinner color="secondary" size="2em" />
        <div>Synchronizing cart, please wait...</div>
      </div>

      <!-- Offline banner inside the form, at the top -->
      <div v-if="displayCart?._offline" class="bg-warning text-dark q-pa-sm q-mb-md rounded-borders">
        You're offline. Your form data is being saved locally and your order will be submitted when you reconnect.
      </div>

      <div v-if="syncError" class="text-negative q-mt-md text-center">
        {{ syncError }}
        <q-btn label="Retry Sync" color="secondary" @click="syncCart" class="q-ml-md" />
      </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, useSSRContext, toRaw } from 'vue';
import cart from 'src/stores/cart';
import { useRouter } from 'vue-router';
import { useMeta, useQuasar } from 'quasar';
import { fetchWithToken } from 'src/composables/useApiFetch.js';
import GoogleLoginButton from 'src/components/GoogleLoginButton.vue';
import { loadPageConfig } from 'src/utils/config-loader'
import { matError } from '@quasar/extras/material-icons'
import {formatCurrency} from 'src/utils/formatters.js'

defineOptions({
  async preFetch ({ ssrContext, currentRoute }) {
    let cartData;
    if(ssrContext) {
      cartData = await cart.fetchCart(true, ssrContext)
    } else if(cart.needsSync()) {
      cartData = await cart.syncLocalCartWithServer()
    }
     //const seo = await fetchSeoForPath('checkout')
      const seo = {
        title: 'Checkout',
        description: 'Checkout page',
        robots: 'noindex, follow'
      }
    const isPreview = currentRoute.query.preview === 'true'

    const configData = await loadPageConfig('checkout', isPreview) // The helper we'll create
    if (ssrContext) {

      ssrContext.cartArray = cartData
      ssrContext.seoData = seo
      ssrContext.pageConfig = configData
    } else {
      window.__PAGE_CONFIG__ = configData;
      window.__CART_ARRAY__ = cartData
    }

  }
})
useMeta(() => {
  return {
    title: 'Checkout',
    meta: {
      robots: {name: 'robots', content: 'noindex, follow'},
      description: {name: 'description', content: 'Checkout page'},
    }
  };
});

const $q = useQuasar()
// Change the default error icon (e.g., to 'warning')
$q.iconSet.field.error = matError

const pageConfig = ref('');

if (process.env.SERVER) {
  const ssr = useSSRContext()
  pageConfig.value = ssr?.pageConfig || null
}


const syncError = ref(null);
const token = ref('');
if(process.env.CLIENT) {
  token.value = localStorage.getItem('jwt_token');
}
/*defineOptions({
  async preFetch () {
    try {
      // Force the blocking sync here so the state is
      // already populated when the component renders
      const cartFetch = await cart.fetchCartOnce(true)
      console.log(cartFetch);
    } catch (err) {
      console.error('PreFetch sync failed:', err)
    }
  }
})*/
const checkoutReady = computed(() => {
  return !!displayCart.value
})
const isLoggedIn = ref(!!token.value)
const router = useRouter();

// 2. FORM INITIALIZATION: Do it immediately based on the store
const form = reactive({
  first_name: cart.state.cart_array?.shipping_address?.first_name || '',
  last_name: cart.state.cart_array?.shipping_address?.last_name || '',
  email: cart.state.cart_array?.billing_address?.email || '',
  phone: cart.state.cart_array?.billing_address?.phone || '',
  shipping: {
    address_1: cart.state.cart_array?.shipping_address?.address_1 || '',
    city: cart.state.cart_array?.shipping_address?.city || '',
    postcode: cart.state.cart_array?.shipping_address?.postcode || '',
    country: 'IL',
  },
  billing: {
    address_1: cart.state.cart_array?.billing_address?.address_1 || '',
    city: cart.state.cart_array?.billing_address?.city || '',
    postcode: cart.state.cart_array?.billing_address?.postcode || '',
    country: 'IL',
  }
});

// 3. COMPUTED OPTIONS: Make shipping and payment methods computed
// so they react instantly to the cart_array fetched in preFetch
/*const shippingOptions = computed(() => {
  const rates = cart.state.cart_array?.shipping_rates?.[0]?.shipping_rates || [];
  return rates.map(rate => ({
    label: `${rate.name} – ${formatCurrency(rate.price, { minorUnit: 2, prefix: '₪' })}`,
    value: rate.rate_id
  }));
});*/

/*const paymentMethods = computed(() => {
  const methods = cart.state.cart_array?.payment_methods || [];
  return methods.map(method => ({
    label: method === 'bacs' ? 'Bank transfer' : method,
    value: method
  }));
});*/
// Replace cart_array references for display with this
const displayCart = computed(() => {
  if (cart.state.cart_array) return cart.state.cart_array

  const local = cart.state.local_cart
  const visibleItems = local.items.filter(i => !i._removed)
    console.log('offline items prices:', visibleItems.map(i => ({ name: i.name, prices: i.prices })))

  if (cart.state.offline && local?.items?.length) {
    return {
      items: visibleItems,
      items_count: String(visibleItems.length),
      coupons: [],
      shipping_rates: [],
      payment_methods: ['bacs'],
      billing_address: local.billing_address || {},
      shipping_address: local.shipping_address || {},
      totals: {
    total_price: visibleItems.reduce((sum, item) => {
      const price = parseInt(toRaw(item.prices)?.price || 0)
      return sum + price * (item.quantity || 1)
    }, 0).toString(),
        total_discount: '0',
        currency_minor_unit: 2,
        currency_prefix: '₪'
      },
      _offline: true
    }
  }

  return null
})

const billingSameAsShipping = ref(false)
const couponCode = ref('');
const couponError = ref(null);
const paymentMethod = ref('bacs');
const selectedShippingRateId = ref(null);
const itemsCount = computed(() => displayCart.value?.items_count || '0')
const cartItems = computed(() => displayCart.value?.items || [])
const cartTotal = computed(() => {
  const total = displayCart.value?.totals?.total_price || '0'
  return formatCurrency(total, { minorUnit: 2, decimalSeparator: '.', prefix: '₪', suffix: '' })
})
const shippingOptions = computed(() => {
  const rates = displayCart.value?.shipping_rates?.[0]?.shipping_rates || []
  return rates.map(rate => ({
    label: `${rate.name} – ${formatCurrency(rate.price, { minorUnit: 2, prefix: '₪' })}`,
    value: rate.rate_id
  }))
})
const paymentMethods = computed(() => {
  const methods = displayCart.value?.payment_methods || []
  return methods.map(method => ({
    label: method === 'bacs' ? 'Bank transfer' : method,
    value: method
  }))
})
const couponApplied = computed(() => displayCart.value?.coupons?.length > 0)// More reliable slug extractor using regex
const getSlugFromPermalink = (permalink) => {
  if (!permalink) return ''
  const cleanUrl = permalink.split('?')[0]
  const match = cleanUrl.match(/product\/([^/]+)\/?$/)
  return match ? match[1] : ''
}

const getVariationQuery = (item) => {
  if (!item.variation?.length) return {}
  return Object.fromEntries(item.variation.map(v => [v.attribute, v.value]))
}

const initializeFormFromCart = async () => {
  const cartData = displayCart.value
  if (!cartData) return

  const saved = localStorage.getItem('checkout_form')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      Object.assign(form, parsed)
      return
    } catch (err) {
      console.error('error', err)
    }
  }

  const billing = cartData.billing_address || {}
  const shipping = cartData.shipping_address || {}
  form.first_name = shipping.first_name || ''
  form.last_name = shipping.last_name || ''
  form.email = billing.email || ''
  form.phone = billing.phone || ''
  form.shipping.address_1 = shipping.address_1 || ''
  form.shipping.city = shipping.city || ''
  form.shipping.postcode = shipping.postcode || ''
  form.shipping.country = shipping.country || 'IL'
  form.billing.address_1 = billing.address_1 || ''
  form.billing.city = billing.city || ''
  form.billing.postcode = billing.postcode || ''
  form.billing.country = billing.country || 'IL'
}

const updateShippingAddress = async () => {
  try {
    const response = await fetchWithToken(`${import.meta.env.VITE_API_BASE}/wp-json/wc/store/v1/cart/update-customer`, {
      method: 'POST',
      body: JSON.stringify({
        billing_address: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          address_1: billingSameAsShipping.value ? form.shipping.address_1 : form.billing.address_1,
          city: billingSameAsShipping.value ? form.shipping.city : form.billing.city,
          postcode: billingSameAsShipping.value ? form.shipping.postcode : form.billing.postcode,
          country: billingSameAsShipping.value ? form.shipping.country : form.billing.country,
        },
        shipping_address: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_1: form.shipping.address_1,
          city: form.shipping.city,
          postcode: form.shipping.postcode,
          country: form.shipping.country,
          phone: form.phone,
          email: form.email,
        }
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update shipping address');
    }
    const updatedCart = await response.json();
    //cart.fetchCart();
    console.log('Cart updated', updatedCart);
    // Optionally update local cart state or refresh shipping rates
  } catch (error) {
    console.error('Error updating shipping address:', error.message);
  }
};
/*const handleInputBlur = (field) => {
  const value = form.shipping[field] ? form.shipping[field] : form[field];
  if (value && value.length > 1) {
    updateShippingAddress();
    fetchShippingRates();
  }
};*/
const saveFormToLocalStorage = () => {
  localStorage.setItem('checkout_form', JSON.stringify({
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    shipping: { ...form.shipping },
    billing: { ...form.billing }
  }))
}

const handleInputBlur = (field) => {
  const value = form.shipping[field] ?? form[field]
  saveFormToLocalStorage()

  if (value && value.length > 1 && !cart.state.offline) {
    updateShippingAddress()
    fetchShippingRates()
  }
}

const applyCoupon = (coupon) => cart.applyCoupon(coupon);
const removeCoupon = (coupon) => cart.removeCoupon(coupon);
// Fetch shipping methods
const fetchShippingRates = async () => {
  if (!cart.state.cart_array) return

  //const rates = cart.state.cart_array.shipping_rates?.[0]?.shipping_rates || []

  /*shippingOptions.value = rates.map(rate => ({
    label: `${rate.name} – ${formatCurrency(rate.price, {
      minorUnit: 2,
      decimalSeparator: '.',
      prefix: '₪'
    })}`,
    value: rate.rate_id
  }))*/

  if (shippingOptions.value.length) {
    selectedShippingRateId.value ??= shippingOptions.value[0].value
  }
}

const onShippingMethodChange = async (newRateId) => {
  try {
    // Send selected shipping rate to WooCommerce
    await fetchWithToken(`${import.meta.env.VITE_API_BASE}/wp-json/wc/store/cart/select-shipping-rate`, {
      method: 'POST',
      body: JSON.stringify({package_id: 0, rate_id: newRateId})
    });
    // Re-fetch cart to get updated totals
    await cart.fetchCart();
  } catch (error) {
    console.error('Error updating shipping method:', error);
  }
};
const onValidationError = async(ref) => {
  const valid = await ref.validate()
  if (!valid) {
    // Wait a tick for Quasar to focus the first invalid field
    requestAnimationFrame(() => {
      const el = document.activeElement
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    })
    return
  }
}
const submitOrder = async () => {
  // Only place order after sync
  if (!cart.state.synced) {
    await syncCart();
    if (syncError.value) {
      return; // Don't submit if sync failed
    }
  }
  try {
    const payload = {
      billing_address: {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        address_1: billingSameAsShipping.value ? form.shipping.address_1 : form.billing.address_1,
        city: billingSameAsShipping.value ? form.shipping.city : form.billing.city,
        postcode: billingSameAsShipping.value ? form.shipping.postcode : form.billing.postcode,
        country: billingSameAsShipping.value ? form.shipping.country : form.billing.country,
      },
      shipping_address: {
        first_name: form.first_name,
        last_name: form.last_name,
        address_1: form.shipping.address_1,
        city: form.shipping.city,
        postcode: form.shipping.postcode,
        country: form.shipping.country,
        phone: form.phone,
        email: form.email,
      },
      payment_method: paymentMethod.value,
      payment_data: {},
      extensions: {},
      billing_same_as_shipping: billingSameAsShipping.value
    };
    const response = await cart.placeOrder(payload)

    router.push({
      name: 'thank-you',
      query: {orderId: response.order_id, billing_email: response.billing_address.email, order_key: response.order_key}
    });

    // Optional: clear cart, redirect to thank-you page, etc.
    await cart.fetchCart(); // Refresh cart in the store

  } catch (err) {
    console.error('Checkout error:', err.message)
  }
  localStorage.removeItem('checkout_form')

}
const syncCart = async () => {
  syncError.value = null

  if (!needsSync.value) {
    return // ⬅️ DO NOTHING
  }

  try {
    await cart.syncLocalCartWithServer()
  } catch (err) {
    console.log(err)
    syncError.value = cart.state.error || 'Failed to sync cart'
  }
}

const needsSync = computed(() => {
  // offline → never block
  if (cart.state.offline) return false
  if (cart.state.synced === false) return true

  // no server snapshot yet → need sync
// cart not hydrated yet → NOT a sync case
  if (!cart.state.cart_array || !Array.isArray(cart.state.cart_array.items)) {
    return false
  }
  const localItems = cart.state.local_cart.items || []
  const serverItems = cart.state.cart_array.items || []

  if (localItems.length !== serverItems.length) return true

  const serverSigs = new Set(
      serverItems.map(i => cart.signatureFor(i.id, i.variation))
  )

  for (const li of localItems) {
    if (li._removed) return true
    const sig = cart.signatureFor(li.id, li.variation)
    if (!serverSigs.has(sig)) return true
  }

  return false
})

// Watch displayCart instead of cart_array
watch(
  () => displayCart.value,
  (cartData) => {
    if (!cartData) return
    initializeFormFromCart()
    fetchShippingRates()
  },
  { immediate: true }
)

onMounted(async () => {
  console.log('LOCAL CART', cart.state.local_cart)
  if (window.__CART_ARRAY__ && !cart.state.cart_array && !cart.state.offline) {
    cart.state.cart_array = window.__CART_ARRAY__
    cart.state.synced = true
    window.__CART_ARRAY__ = null

    // FIX: SSR gave us the server's cart, but the local cart (localStorage)
    // may have items the server doesn't know about yet — e.g. items added
    // while offline, or before the session was established.
    // Load local cart first, then let the sync diff decide what to do.
    await cart.loadLocalCart()
    console.log(cart.state.local_cart)
    if (cart.needsSync()) {
      await cart.syncLocalCartWithServer()
    }
  } else {
    await cart.loadLocalCart()
    if (cart.needsSync()) {
      await cart.syncLocalCartWithServer()
    }
    // Only fetch after sync is complete so we never show stale data
    await cart.fetchCart()
  }
  if (window.__PAGE_CONFIG__ && Object.keys(window.__PAGE_CONFIG__).length) {
    pageConfig.value = window.__PAGE_CONFIG__
  }
  // Start the loading state
  /*checkoutReady.value = false;

  try {
    // We call fetchCartOnce with 'true' to force a blocking sync
    // This ensures cart_array is 100% accurate before we proceed
    //await cart.fetchCartOnce(true);

    // Now that the server and local are identical:
    await initializeFormFromCart();
    await fetchShippingRates();

    checkoutReady.value = true;
  } catch (err) {
    console.error('Initial sync failed:', err);
    syncError.value = "Could not sync your cart. Please check your connection.";
  }*/
});
</script>

<style scoped>
/* purgecss start ignore */
.q-field__label {
    transition: 0.3s ease;
}
.q-field--focused .q-field__label
.q-field--float .q-field__label{
  font-size: 10px;
  transform: translateY(-5px);
}
/* purgecss end ignore */

.q-form .float-left,
.q-form .float-right {
  width: 100%;
}
@media(min-width: 768px) {
  .q-form .float-left {
    width: 57%;
  }

  .q-form .float-right {
    width: 41%;
  }
}
.blockUi{
  position: absolute;
  height: 100%;
  width: 100%;
  background: #00000050;
  z-index: 999;
}
.blockUi:before {
    content: '';
    width: 30px;
    height: 30px;
    border: 5px solid #000;
    background: transparent;
    border-radius: 50%;
    display: block;
    border-top-color: #00000025;
    position: sticky;
    top: 100px;
    margin: 100px auto 0;
    animation: rotate 1s linear infinite;
}
@keyframes rotate {
  from{
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
