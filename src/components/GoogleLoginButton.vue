<template>
  <div class="google-login-btn-wrap">
<q-btn
    label="Sign in with Google"
    :icon="matLogin"
    color="secondary"
    :loading="loading"
    @click="handleLogin"
  />
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from 'vue-router';
import { matLogin } from '@quasar/extras/material-icons';
import { Platform } from 'quasar';

// This is the "Web Application" Client ID from Google Console
const GOOGLE_WEB_CLIENT_ID = import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID;

const loading = ref(false);

const router = useRouter();
async function handleLogin() {
  loading.value = true;

  try {
    if (Platform.is.capacitor) {
      await handleNativeLogin();
    } else {
      redirectToGoogleLogin(); // Your existing web fallback
    }
  } catch (err) {
    console.error("Google login failed:", err);
    loading.value = false;
  }
}

async function handleNativeLogin() {

  // HARD SSR GUARD
  if (import.meta.env.SSR) {
    return;
  }
  // Guard: Only attempt this if we are actually on a mobile device/native app
  if (!Platform.is.capacitor) {
    console.warn('Native login not available on web.');
    // Trigger web-based login fallback here if you have one
    return;
  }
  // 1. Dynamic import so web builds don't break
  const { SocialLogin } = await import('@capgo/capacitor-social-login');

  // 2. Initialize (Must use WEB Client ID even on Android)
  await SocialLogin.initialize({
    google: {
      webClientId: GOOGLE_WEB_CLIENT_ID,
    },
  });

  // 3. Trigger Native Bottom Sheet
  const { result } = await SocialLogin.login({
    provider: 'google',
    options: {
      scopes: ['email', 'profile'],
    }
  });

  if (result.idToken) {
    await sendTokenToBackend(result.idToken);
  }
}

async function sendTokenToBackend(idToken) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}/wp-json/custom/v1/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });
    const data = await response.json();

    if (data.success) {
      // Handle successful login (save JWT, redirect user)
      if (data.token) localStorage.setItem("jwt_token", data.token);

      // 1. Wait for Vue to acknowledge the localStorage change
      await nextTick();

      // This tells the router "Hey, the URL changed (slightly), please update!"
      router.go(0)
    }
  } catch (error) {
    console.error("Backend sync failed:", error);
  } finally {
    loading.value = false;
  }
}

// Redirect fallback to Google OAuth
function redirectToGoogleLogin() {
  const redirectUri = 'https://pwav.meidanm.com/auth/callback'; // must match Google app redirect URI
  const state = encodeURIComponent(window.location.href); // save current page

  const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
              `client_id=${GOOGLE_WEB_CLIENT_ID}` +
              `&redirect_uri=${encodeURIComponent(redirectUri)}` +
              `&response_type=code` +
              `&scope=openid%20email%20profile` +
              `&state=${state}` +
              `&prompt=select_account`; // optional: forces account selection

  window.location.href = url;
}
</script>
