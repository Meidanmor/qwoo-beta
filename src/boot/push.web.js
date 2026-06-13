// src/boot/push.js
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
/**
 * Convert VAPID base64 key to UInt8Array
 */
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// your VAPID public key for web push
const APP_SERVER_KEY = import.meta.env.VITE_VAPID_APP_SERVER_KEY

/**
 * Get or create a unique device ID (stored in localStorage)
 */
function getDeviceId() {
  let deviceId = localStorage.getItem('pwa_device_id')
  if (!deviceId) {
    deviceId = generateUUID()
    localStorage.setItem('pwa_device_id', deviceId)
  }
  return deviceId
}

/**
 * Subscribe to push notifications (Web/PWA)
 */
export async function subscribeToWebPush() {
  console.log('🚀 Push setup started (Web)')
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    console.warn('🔴 Notification permission not granted.')
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(APP_SERVER_KEY)
    })

    const deviceId = getDeviceId()
    const cartToken = localStorage.getItem('wc_cart_token') || null

    const payload = {
      device_id: deviceId,
      cart_token: cartToken,
      subscription: subscription
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/wp-json/pwa/v1/save-subscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const result = await res.json()
    console.log('✅ Push subscription saved (web):', result)
  } catch (err) {
    console.error('❌ Push subscription failed (web):', err)
  }
}

export async function checkNativePermission() {
  return 'unsupported'
}
export async function initNativePush() {
  return 'unsupported'
}

/* -------------------------
   Boot init that sets up tracking & listeners
   — this is called by Quasar boot (default export)
   ------------------------- */
function setupCartTracking() {
  //window.addEventListener('beforeunload', syncSubscriptionCartToken)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) syncSubscriptionCartToken()
  })
}

async function syncSubscriptionCartToken() {
  const deviceId = getDeviceId()
  const cartToken = localStorage.getItem('wc_cart_token')

  if (!cartToken || !deviceId) return
  try {
    // Send the stable deviceId and the volatile cartToken
    await fetch(`${import.meta.env.VITE_API_BASE}/wp-json/pwa/v1/update-cart-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        device_id: deviceId,
        cart_token: cartToken,
        timestamp: Date.now()
      })
    })
    console.log('✅ Cart token synced to push subscription.')
  } catch (err) {
    console.error('❌ Failed to sync cart token:', err)
  }
}
/**
 * Init push + cart tracking
 */
export default ({ router } = {}) => {
  // 1. Prevent server-side execution
  if (typeof window === 'undefined') return
  if (router) window.$router = router

  const initCarTracking = async () => {
      setupCartTracking()
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.addEventListener('message', (event) => {
              if (event.data?.action === 'navigate' && event.data.url) {
                  if (window.$router) {
                      window.$router.push(event.data.url).catch(() => {
                          window.location.href = event.data.url
                      })
                  } else {
                      window.location.href = event.data.url
                  }
              }
          })
      }

      console.log('✅ Push & Tracking initialized after LCP')
  }
  initCarTracking()
}
