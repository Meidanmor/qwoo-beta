import { boot } from 'quasar/wrappers'

export default boot(async () => {
  if (process.env.CLIENT) {
    // This stops the Quasar boot sequence until the browser
    // has had a chance to breathe and paint the SSR HTML.
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        // If the page is already loaded, wait 2 frames
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      } else {
        // Wait for the window load event (images ready)
        window.addEventListener('load', resolve, { once: true })
      }
    })
  }
})