// src/boot/scroll-restoration.js
export default () => {
  console.log('script is runnign')
  if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
    console.log('removing browser scroll')
    history.scrollRestoration = 'manual'
  }
}