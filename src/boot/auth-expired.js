// src/boot/auth-expired.js
import { Dialog } from 'quasar'

let shown = false

export function initAuthPopup(router) {
  if (typeof window === 'undefined') return

  window.addEventListener('auth-expired', () => {
    if (shown) return

    shown = true

    Dialog.create({
      title: 'Session Expired',
      class: 'expired-dialog',
      message: 'Your session ended. Continue as guest or login again.',
      ok: {label: 'Login Again', color: 'secondary'},
      cancel: {label: 'Continue as Guest', color: 'secondary'},
      persistent: true,
      noEscDismiss: true,
      noBackdropDismiss: true
    }).onOk(() => {
      router.push('/my-account')
    })
  })
}