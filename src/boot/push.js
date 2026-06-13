// src/boot/push.js
import { Platform } from 'quasar'

let PushNotifications = null

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
const APP_SERVER_KEY = 'BHSV149RpWY5IkRyGC_DvxRWQuO_29FAdwhhFu9IPyfUNHDedg7pTCer_WrlJipDvmU0JqxBy4lKHWItX2E6cLw'

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

/* ——— Native (Capacitor) helpers ——— */
async function createNotificationChannels() {
  // Orders
  await PushNotifications.createChannel({
    id: 'orders',
    name: 'Orders',
    description: 'Order confirmations and payment updates',
    importance: 4, // HIGH
    visibility: 1, // PUBLIC (shows on lock screen)
    vibration: true
  });

  // Abandoned cart
  await PushNotifications.createChannel({
    id: 'abandoned_cart',
    name: 'Abandoned Cart',
    description: 'Reminders about items left in your cart',
    importance: 4, // HIGH
    visibility: 1,
    vibration: true
  });

  // Promotions
  await PushNotifications.createChannel({
    id: 'promotions',
    name: 'Promotions',
    description: 'Sales, discounts and special offers',
    importance: 3, // DEFAULT
    visibility: 1,
    vibration: true
  });

  // System / background
  await PushNotifications.createChannel({
    id: 'system',
    name: 'System',
    description: 'System and background notifications',
    importance: 2, // LOW
    visibility: 0, // PRIVATE
    vibration: true
  });
}

/**
 * initNativePush:
 *  - dynamically imports native modules
 *  - registers listeners (registration, registrationError, received)
 *  - does NOT force a permissions prompt
 *  - safe to call on app startup to set listeners
 */
export async function initNativePush() {
  if (!Platform.is.capacitor) return 'unsupported'

  try {
    const pushModule = await import(/* @vite-ignore */ '@capacitor/push-notifications')
    PushNotifications = pushModule.PushNotifications

    // listeners (register these ONCE)
    PushNotifications.addListener('registration', async (token) => {
      console.log('🟢 Native token:', token?.value)
      try {
        const deviceId = getDeviceId()
        const cartToken = localStorage.getItem('wc_cart_token') || null
        await fetch(`${import.meta.env.VITE_API_BASE}/wp-json/pwa/v1/save-subscription`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            device_id: deviceId,
            cart_token: cartToken,
            subscription: {endpoint: token?.value, native: true}
          })
        })
      } catch (err) {
        console.error('❌ Failed saving native token to server', err)
      }
    })

    PushNotifications.addListener('registrationError', (err) => {
      console.error('❌ Native push registration error:', err)
    })

    /* --------------------------------------------------
     * 1️⃣ Foreground push (equivalent to SW "push" event)
     * -------------------------------------------------- */

    PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          alert(
              'PUSH RECEIVED\n' +
              JSON.stringify(notification, null, 2)
          )
        }
    )

    /* --------------------------------------------------
     * 2️⃣ Notification tap (equivalent to notificationclick)
     * -------------------------------------------------- */
    PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (action) => {
          console.log('[Native] Push action', action)

          const data =
              action.notification?.data?.notification ||
              action.notification?.data ||
              {}

          if (data.url) {
            if (window.$router) {
              window.$router.push(data.url).catch(() => {
                window.location.href = data.url
              })
            } else {
              window.location.href = data.url
            }
          }
        }
    )
    const perm = await PushNotifications.checkPermissions()
    if (perm.receive !== 'granted') {
      const req = await PushNotifications.requestPermissions()
      if (req.receive !== 'granted') return
    }

    /* ✅ CREATE CHANNELS */
    await createNotificationChannels()

    await PushNotifications.register()


    return 'initialized'
  } catch (e) {
    console.warn('Push plugin not available or not on mobile:', e)
    return 'default'
  }
}

/**
 * requestNativePermission:
 *  - intended to be called from a user gesture (your "Enable" button)
 *  - will requestPermissions() and attempt register() (wrapped safely)
 *  - returns the permission.receive string (e.g. 'granted'|'denied'|'prompt')
 */
export async function requestNativePermission() {
  if (!Platform.is.capacitor) return 'unsupported'
  if (!PushNotifications) {
    // ensure listeners are set up
    await initNativePush()
    if (!PushNotifications) return 'default'
  }

  try {
    const permStatus = await PushNotifications.requestPermissions()
    const p = permStatus.receive || 'default'
    // Try registering immediately — if this errors, appStateChange listener will attempt again when active
    if (p === 'granted') {
      try {
        // small delay to allow native to settle after permission dialog
        await new Promise(r => setTimeout(r, 250))
        await PushNotifications.register()
        console.log('Requested register() after permission granted')
      } catch (err) {
        console.warn('Immediate register() failed (will rely on appStateChange):', err)
      }
    }
    return p
  } catch (err) {
    console.error('requestNativePermission error', err)
    return 'default'
  }
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

    if (Platform.is && Platform.is.capacitor) {
      try {
        // dynamic import only to copy the module for plugin detection
        const { PushNotifications: NativePush } = await import(/* @vite-ignore */ '@capacitor/push-notifications')
        PushNotifications = NativePush
        // Do not request permission here — we only set up listeners in initNativePush
        //await initNativePush()
      } catch (e) {
        console.warn('Push plugin not available or not on mobile:', e)
      }
    } else if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.action === 'navigate' && event.data.url) {
          if (window.$router) {
            window.$router.push(event.data.url).catch(() => { window.location.href = event.data.url })
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
