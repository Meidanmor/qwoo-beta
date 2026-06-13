// src/boot/deferred-css.js

/**
 * Polyfill for requestIdleCallback
 */
const runWhenIdle = (cb) => {
  if (typeof window === 'undefined') return
  if ('requestIdleCallback' in window) {
    requestIdleCallback(cb)
  } else {
    setTimeout(() => cb(Date.now()), 1)
  }
}

export default async () => {
  if (typeof window !== 'undefined') {
    runWhenIdle(() => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = '/assets/deferred.css' // make sure this exists in /dist/assets/
      link.media = 'print'
      link.onload = () => {
        link.media = 'all'
        console.log('Deferred CSS loaded.')
      }
      document.head.appendChild(link)
    })
  }
}
