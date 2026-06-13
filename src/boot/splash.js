// src/boot/splash.js
import { defineBoot } from '#q-app/wrappers'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'

export default defineBoot(async () => {
  // Only runs in native app
  if (!Capacitor.isNativePlatform()) return

  try {
    await SplashScreen.hide({
      fadeOutDuration: 1000  // matches your launchFadeOutDuration
    })
  } catch (err) {
    console.warn('SplashScreen hide failed', err)
  }
})
