let authExpiredTriggered = false
let wasLoggedIn = false

export function getWasLoggedIn() {
  if (typeof window === 'undefined') return false // SSR safe
  return localStorage.getItem('wasLoggedIn') === 'true'
}

export function setLoggedIn(value) {
  if (typeof window === 'undefined') return
  if (value) {
    localStorage.setItem('wasLoggedIn', 'true')
  } else {
    localStorage.removeItem('wasLoggedIn')
    authExpiredTriggered = false
  }
}

export async function fetchWithToken(url, options = {}) {
  const isClient = typeof window !== 'undefined'

  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if ((response.status === 401 || response.status === 403) && isClient) {
    const isDataRequest =
      url.includes('wp-json') ||
      !url.match(/\.(js|css|woff2?|png|jpg)$/)

    if (isDataRequest && wasLoggedIn && !authExpiredTriggered) {
      authExpiredTriggered = true
      window.dispatchEvent(new CustomEvent('auth-expired'))
    }
  }

  return response
}