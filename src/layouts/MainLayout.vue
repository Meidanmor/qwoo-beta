<template>
  <div v-if="!uiHydrated && shouldDelayHydration" class="minimal-fallback">
    <header class="q-header q-layout__section--marginal fixed-top sticky" style="padding: 5px 0px;">
      <div class="container"><div class="q-toolbar row no-wrap items-center flex justify-between q-pa-sm" role="toolbar">
        <div class="flex nav-items-el"><!-- Desktop Navigation --><div class="q-toolbar__title ellipsis nav-bar gt-sm">
          <!--v-if--><a aria-current="page" href="/" class="router-link-active router-link-exact-active text-h6 no-decoration">My Shop</a>
          <a href="/products/" class="text-h6 no-decoration">Products</a>
          <a href="/cart/" class="text-h6 no-decoration">Cart</a><a href="/checkout/" class="text-h6 no-decoration">Checkout</a>
          <a href="/my-account/" class="text-h6 no-decoration">My account</a>
        </div><!-- Mobile Menu Toggle -->
          <button class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense lt-md" tabindex="0" type="button" aria-label="Open menu" fdprocessedid="xddcdi">
            <span class="q-focus-helper"></span>
            <span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i class="q-icon" aria-hidden="true" role="img">
              <svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" style="fill: none;"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </i></span>
          </button>
        </div>
        <a aria-current="page" href="/" class="router-link-active router-link-exact-active flex items-center order-first" aria-label="Navigate to home page">
          <svg xmlns="http://www.w3.org/2000/svg" width="84" height="19" viewBox="0 0 84 19" fill="none"><path d="M7.05469 11.2266H10.7344L12.0703 12.8906L14.3203 15.4453L17.25 18.9844H13.0547L10.9688 16.5703L9.58594 14.5547L7.05469 11.2266ZM8.48438 17.9297C6.89844 17.9297 5.46289 17.5859 4.17773 16.8984C2.89258 16.2109 1.875 15.2012 1.125 13.8691C0.375 12.5371 0 10.9062 0 8.97656C0 7.03125 0.375 5.39062 1.125 4.05469C1.875 2.71875 2.89258 1.70898 4.17773 1.02539C5.46289 0.341797 6.89844 0 8.48438 0C10.0703 0 11.5039 0.341797 12.7852 1.02539C14.0664 1.70898 15.084 2.71875 15.8379 4.05469C16.5918 5.39062 16.9688 7.03125 16.9688 8.97656C16.9688 10.9141 16.5918 12.5488 15.8379 13.8809C15.084 15.2129 14.0664 16.2207 12.7852 16.9043C11.5039 17.5879 10.0703 17.9297 8.48438 17.9297ZM8.48438 13.8047C9.27344 13.8047 9.93555 13.6191 10.4707 13.248C11.0059 12.877 11.4102 12.332 11.6836 11.6133C11.957 10.8945 12.0938 10.0156 12.0938 8.97656C12.0938 7.92969 11.957 7.04492 11.6836 6.32227C11.4102 5.59961 11.0059 5.05273 10.4707 4.68164C9.93555 4.31055 9.27344 4.125 8.48438 4.125C7.70312 4.125 7.04492 4.31055 6.50977 4.68164C5.97461 5.05273 5.56836 5.59961 5.29102 6.32227C5.01367 7.04492 4.875 7.92969 4.875 8.97656C4.875 10.0156 5.01367 10.8945 5.29102 11.6133C5.56836 12.332 5.97461 12.877 6.50977 13.248C7.04492 13.6191 7.70312 13.8047 8.48438 13.8047ZM27.8555 7.19531V10.7344H19.6758V7.19531H27.8555ZM34.6289 17.6953L30 0.234375H35.2969L36.6914 7.00781C36.8711 7.85938 37.0312 8.79102 37.1719 9.80273C37.3125 10.8145 37.4512 11.8242 37.5879 12.832C37.7246 13.8398 37.8633 14.7734 38.0039 15.6328H37.0664C37.2305 14.7734 37.3867 13.8398 37.5352 12.832C37.6836 11.8242 37.8379 10.8145 37.998 9.80273C38.1582 8.79102 38.3359 7.85938 38.5312 7.00781L40.0781 0.234375H44.8125L46.3594 7.00781C46.5547 7.85938 46.7324 8.79102 46.8926 9.80273C47.0527 10.8145 47.207 11.8242 47.3555 12.832C47.5039 13.8398 47.6602 14.7734 47.8242 15.6328H46.875C47.0234 14.7734 47.1641 13.8398 47.2969 12.832C47.4297 11.8242 47.5684 10.8145 47.7129 9.80273C47.8574 8.79102 48.0156 7.85938 48.1875 7.00781L49.5938 0.234375H54.8906L50.2617 17.6953H44.9062L43.1719 10.582C42.875 9.35547 42.6387 8.03125 42.4629 6.60938C42.2871 5.1875 42.0742 3.82031 41.8242 2.50781H43.0664C42.7695 3.82031 42.5488 5.18359 42.4043 6.59766C42.2598 8.01172 42.0352 9.33984 41.7305 10.582L39.9844 17.6953H34.6289ZM61.7695 17.9297C60.3477 17.9297 59.1289 17.6465 58.1133 17.0801C57.0977 16.5137 56.3223 15.7246 55.7871 14.7129C55.252 13.7012 54.9844 12.5234 54.9844 11.1797C54.9844 9.83594 55.252 8.6582 55.7871 7.64648C56.3223 6.63477 57.0977 5.8457 58.1133 5.2793C59.1289 4.71289 60.3477 4.42969 61.7695 4.42969C63.1914 4.42969 64.4062 4.71289 65.4141 5.2793C66.4219 5.8457 67.1934 6.63477 67.7285 7.64648C68.2637 8.6582 68.5312 9.83594 68.5312 11.1797C68.5312 12.5234 68.2637 13.7012 67.7285 14.7129C67.1934 15.7246 66.4219 16.5137 65.4141 17.0801C64.4062 17.6465 63.1914 17.9297 61.7695 17.9297ZM61.7695 14.4141C62.1758 14.4141 62.5254 14.2852 62.8184 14.0273C63.1113 13.7695 63.3359 13.3965 63.4922 12.9082C63.6484 12.4199 63.7266 11.8359 63.7266 11.1562C63.7266 10.4688 63.6484 9.88672 63.4922 9.41016C63.3359 8.93359 63.1113 8.57031 62.8184 8.32031C62.5254 8.07031 62.1758 7.94531 61.7695 7.94531C61.3555 7.94531 61 8.07031 60.7031 8.32031C60.4062 8.57031 60.1797 8.93359 60.0234 9.41016C59.8672 9.88672 59.7891 10.4688 59.7891 11.1562C59.7891 11.8359 59.8672 12.4199 60.0234 12.9082C60.1797 13.3965 60.4062 13.7695 60.7031 14.0273C61 14.2852 61.3555 14.4141 61.7695 14.4141ZM76.7695 17.9297C75.3477 17.9297 74.1289 17.6465 73.1133 17.0801C72.0977 16.5137 71.3223 15.7246 70.7871 14.7129C70.252 13.7012 69.9844 12.5234 69.9844 11.1797C69.9844 9.83594 70.252 8.6582 70.7871 7.64648C71.3223 6.63477 72.0977 5.8457 73.1133 5.2793C74.1289 4.71289 75.3477 4.42969 76.7695 4.42969C78.1914 4.42969 79.4062 4.71289 80.4141 5.2793C81.4219 5.8457 82.1934 6.63477 82.7285 7.64648C83.2637 8.6582 83.5312 9.83594 83.5312 11.1797C83.5312 12.5234 83.2637 13.7012 82.7285 14.7129C82.1934 15.7246 81.4219 16.5137 80.4141 17.0801C79.4062 17.6465 78.1914 17.9297 76.7695 17.9297ZM76.7695 14.4141C77.1758 14.4141 77.5254 14.2852 77.8184 14.0273C78.1113 13.7695 78.3359 13.3965 78.4922 12.9082C78.6484 12.4199 78.7266 11.8359 78.7266 11.1562C78.7266 10.4688 78.6484 9.88672 78.4922 9.41016C78.3359 8.93359 78.1113 8.57031 77.8184 8.32031C77.5254 8.07031 77.1758 7.94531 76.7695 7.94531C76.3555 7.94531 76 8.07031 75.7031 8.32031C75.4062 8.57031 75.1797 8.93359 75.0234 9.41016C74.8672 9.88672 74.7891 10.4688 74.7891 11.1562C74.7891 11.8359 74.8672 12.4199 75.0234 12.9082C75.1797 13.3965 75.4062 13.7695 75.7031 14.0273C76 14.2852 76.3555 14.4141 76.7695 14.4141Z" fill="#005DAC"></path></svg></a><div><button class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense q-ml-sm q-mr-sm" tabindex="0" type="button" aria-label="Add to wishlist" fdprocessedid="8hppl"><span class="q-focus-helper"></span><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i class="q-icon" aria-hidden="true" role="img"><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" style="fill: none;"></path><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg></i></span></button><button class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense" tabindex="0" type="button" aria-label="View cart" fdprocessedid="vpw5od">
        <span class="q-focus-helper"></span>
        <span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">
          <i class="q-icon" aria-hidden="true" role="img"><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" style="fill: none;"></path><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></svg></i>
        </span>
      </button>
      </div>
      </div>
      </div><!---->
    </header>


    <main>
      <div style="padding-top: 0px">
    <router-view />
        </div>
    </main>

        <footer>
      <div class="container flex justify-between">
        <div class="footer-column first">
<svg xmlns="http://www.w3.org/2000/svg" width="84" height="19" viewBox="0 0 84 19" fill="none">
<path d="M7.05469 11.2266H10.7344L12.0703 12.8906L14.3203 15.4453L17.25 18.9844H13.0547L10.9688 16.5703L9.58594 14.5547L7.05469 11.2266ZM8.48438 17.9297C6.89844 17.9297 5.46289 17.5859 4.17773 16.8984C2.89258 16.2109 1.875 15.2012 1.125 13.8691C0.375 12.5371 0 10.9062 0 8.97656C0 7.03125 0.375 5.39062 1.125 4.05469C1.875 2.71875 2.89258 1.70898 4.17773 1.02539C5.46289 0.341797 6.89844 0 8.48438 0C10.0703 0 11.5039 0.341797 12.7852 1.02539C14.0664 1.70898 15.084 2.71875 15.8379 4.05469C16.5918 5.39062 16.9688 7.03125 16.9688 8.97656C16.9688 10.9141 16.5918 12.5488 15.8379 13.8809C15.084 15.2129 14.0664 16.2207 12.7852 16.9043C11.5039 17.5879 10.0703 17.9297 8.48438 17.9297ZM8.48438 13.8047C9.27344 13.8047 9.93555 13.6191 10.4707 13.248C11.0059 12.877 11.4102 12.332 11.6836 11.6133C11.957 10.8945 12.0938 10.0156 12.0938 8.97656C12.0938 7.92969 11.957 7.04492 11.6836 6.32227C11.4102 5.59961 11.0059 5.05273 10.4707 4.68164C9.93555 4.31055 9.27344 4.125 8.48438 4.125C7.70312 4.125 7.04492 4.31055 6.50977 4.68164C5.97461 5.05273 5.56836 5.59961 5.29102 6.32227C5.01367 7.04492 4.875 7.92969 4.875 8.97656C4.875 10.0156 5.01367 10.8945 5.29102 11.6133C5.56836 12.332 5.97461 12.877 6.50977 13.248C7.04492 13.6191 7.70312 13.8047 8.48438 13.8047ZM27.8555 7.19531V10.7344H19.6758V7.19531H27.8555ZM34.6289 17.6953L30 0.234375H35.2969L36.6914 7.00781C36.8711 7.85938 37.0312 8.79102 37.1719 9.80273C37.3125 10.8145 37.4512 11.8242 37.5879 12.832C37.7246 13.8398 37.8633 14.7734 38.0039 15.6328H37.0664C37.2305 14.7734 37.3867 13.8398 37.5352 12.832C37.6836 11.8242 37.8379 10.8145 37.998 9.80273C38.1582 8.79102 38.3359 7.85938 38.5312 7.00781L40.0781 0.234375H44.8125L46.3594 7.00781C46.5547 7.85938 46.7324 8.79102 46.8926 9.80273C47.0527 10.8145 47.207 11.8242 47.3555 12.832C47.5039 13.8398 47.6602 14.7734 47.8242 15.6328H46.875C47.0234 14.7734 47.1641 13.8398 47.2969 12.832C47.4297 11.8242 47.5684 10.8145 47.7129 9.80273C47.8574 8.79102 48.0156 7.85938 48.1875 7.00781L49.5938 0.234375H54.8906L50.2617 17.6953H44.9062L43.1719 10.582C42.875 9.35547 42.6387 8.03125 42.4629 6.60938C42.2871 5.1875 42.0742 3.82031 41.8242 2.50781H43.0664C42.7695 3.82031 42.5488 5.18359 42.4043 6.59766C42.2598 8.01172 42.0352 9.33984 41.7305 10.582L39.9844 17.6953H34.6289ZM61.7695 17.9297C60.3477 17.9297 59.1289 17.6465 58.1133 17.0801C57.0977 16.5137 56.3223 15.7246 55.7871 14.7129C55.252 13.7012 54.9844 12.5234 54.9844 11.1797C54.9844 9.83594 55.252 8.6582 55.7871 7.64648C56.3223 6.63477 57.0977 5.8457 58.1133 5.2793C59.1289 4.71289 60.3477 4.42969 61.7695 4.42969C63.1914 4.42969 64.4062 4.71289 65.4141 5.2793C66.4219 5.8457 67.1934 6.63477 67.7285 7.64648C68.2637 8.6582 68.5312 9.83594 68.5312 11.1797C68.5312 12.5234 68.2637 13.7012 67.7285 14.7129C67.1934 15.7246 66.4219 16.5137 65.4141 17.0801C64.4062 17.6465 63.1914 17.9297 61.7695 17.9297ZM61.7695 14.4141C62.1758 14.4141 62.5254 14.2852 62.8184 14.0273C63.1113 13.7695 63.3359 13.3965 63.4922 12.9082C63.6484 12.4199 63.7266 11.8359 63.7266 11.1562C63.7266 10.4688 63.6484 9.88672 63.4922 9.41016C63.3359 8.93359 63.1113 8.57031 62.8184 8.32031C62.5254 8.07031 62.1758 7.94531 61.7695 7.94531C61.3555 7.94531 61 8.07031 60.7031 8.32031C60.4062 8.57031 60.1797 8.93359 60.0234 9.41016C59.8672 9.88672 59.7891 10.4688 59.7891 11.1562C59.7891 11.8359 59.8672 12.4199 60.0234 12.9082C60.1797 13.3965 60.4062 13.7695 60.7031 14.0273C61 14.2852 61.3555 14.4141 61.7695 14.4141ZM76.7695 17.9297C75.3477 17.9297 74.1289 17.6465 73.1133 17.0801C72.0977 16.5137 71.3223 15.7246 70.7871 14.7129C70.252 13.7012 69.9844 12.5234 69.9844 11.1797C69.9844 9.83594 70.252 8.6582 70.7871 7.64648C71.3223 6.63477 72.0977 5.8457 73.1133 5.2793C74.1289 4.71289 75.3477 4.42969 76.7695 4.42969C78.1914 4.42969 79.4062 4.71289 80.4141 5.2793C81.4219 5.8457 82.1934 6.63477 82.7285 7.64648C83.2637 8.6582 83.5312 9.83594 83.5312 11.1797C83.5312 12.5234 83.2637 13.7012 82.7285 14.7129C82.1934 15.7246 81.4219 16.5137 80.4141 17.0801C79.4062 17.6465 78.1914 17.9297 76.7695 17.9297ZM76.7695 14.4141C77.1758 14.4141 77.5254 14.2852 77.8184 14.0273C78.1113 13.7695 78.3359 13.3965 78.4922 12.9082C78.6484 12.4199 78.7266 11.8359 78.7266 11.1562C78.7266 10.4688 78.6484 9.88672 78.4922 9.41016C78.3359 8.93359 78.1113 8.57031 77.8184 8.32031C77.5254 8.07031 77.1758 7.94531 76.7695 7.94531C76.3555 7.94531 76 8.07031 75.7031 8.32031C75.4062 8.57031 75.1797 8.93359 75.0234 9.41016C74.8672 9.88672 74.7891 10.4688 74.7891 11.1562C74.7891 11.8359 74.8672 12.4199 75.0234 12.9082C75.1797 13.3965 75.4062 13.7695 75.7031 14.0273C76 14.2852 76.3555 14.4141 76.7695 14.4141Z" fill="#005DAC"/>
</svg>
          <p>Crafting botanical excellence for the modern soul. Pure ingredients, ethical processes, lasting radiance.</p>
        </div>
        <div class="footer-column">
          <h2 class="links-title">Shop</h2>
          <nav>
            <a href="/products">Shop All</a>
            <a href="/product-category/best-sellers">Best Sellers</a>
            <a href="/product-category/new-arrival">New Arrival</a>
            <a href="/gift-card">Gift Card</a>
          </nav>
        </div>
        <div class="footer-column">
          <h2 class="links-title">Experience</h2>
          <nav>
            <a href="/sustainability">Sustainability</a>
            <a href="/our-story">Our Story</a>
          </nav>
        </div>
        <div class="footer-column">
          <h2 class="links-title">Support</h2>
          <nav>
            <a href="/shipping-and-returns">Shipping & Returns</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/contact-us">Contact Us</a>
          </nav>
        </div>
        <div class="footer-bottom">
          <span>All right reserved</span>
        </div>
      </div>
    </footer>
  </div>

  <q-layout view="hHh lpR fFf" v-else>
    <q-header class="sticky" style="padding: 5px 0;">
    <div class="container">
      <q-toolbar class="flex justify-between q-pa-sm">
       <div class="flex nav-items-el" v-if="uiHydrated">
     <!-- Desktop Navigation -->
          <q-toolbar-title class="nav-bar gt-sm">
            <router-link v-if="isSuperAdmin" to="/admin" class="text-h6 no-decoration"><q-icon :name="matAdminPanelSettings" /> Go to Admin Panel</router-link>
            <router-link to="/" class="text-h6 no-decoration">My Shop</router-link>
            <router-link to="/products/" class="text-h6 no-decoration">Products</router-link>
            <router-link to="/cart/" class="text-h6 no-decoration">Cart</router-link>
            <router-link to="/checkout/" class="text-h6 no-decoration">Checkout</router-link>
            <router-link to="/my-account/" class="text-h6 no-decoration">My account</router-link>
          </q-toolbar-title>

          <!-- Mobile Menu Toggle -->
          <q-btn flat dense :icon="matMenu" aria-label="Open menu" class="lt-md" @click="mobileMenuDrawer = true" />

       </div>
        <router-link to="/" aria-label="Navigate to home page" class="flex items-center order-first">
<svg xmlns="http://www.w3.org/2000/svg" width="84" height="19" viewBox="0 0 84 19" fill="none">
<path d="M7.05469 11.2266H10.7344L12.0703 12.8906L14.3203 15.4453L17.25 18.9844H13.0547L10.9688 16.5703L9.58594 14.5547L7.05469 11.2266ZM8.48438 17.9297C6.89844 17.9297 5.46289 17.5859 4.17773 16.8984C2.89258 16.2109 1.875 15.2012 1.125 13.8691C0.375 12.5371 0 10.9062 0 8.97656C0 7.03125 0.375 5.39062 1.125 4.05469C1.875 2.71875 2.89258 1.70898 4.17773 1.02539C5.46289 0.341797 6.89844 0 8.48438 0C10.0703 0 11.5039 0.341797 12.7852 1.02539C14.0664 1.70898 15.084 2.71875 15.8379 4.05469C16.5918 5.39062 16.9688 7.03125 16.9688 8.97656C16.9688 10.9141 16.5918 12.5488 15.8379 13.8809C15.084 15.2129 14.0664 16.2207 12.7852 16.9043C11.5039 17.5879 10.0703 17.9297 8.48438 17.9297ZM8.48438 13.8047C9.27344 13.8047 9.93555 13.6191 10.4707 13.248C11.0059 12.877 11.4102 12.332 11.6836 11.6133C11.957 10.8945 12.0938 10.0156 12.0938 8.97656C12.0938 7.92969 11.957 7.04492 11.6836 6.32227C11.4102 5.59961 11.0059 5.05273 10.4707 4.68164C9.93555 4.31055 9.27344 4.125 8.48438 4.125C7.70312 4.125 7.04492 4.31055 6.50977 4.68164C5.97461 5.05273 5.56836 5.59961 5.29102 6.32227C5.01367 7.04492 4.875 7.92969 4.875 8.97656C4.875 10.0156 5.01367 10.8945 5.29102 11.6133C5.56836 12.332 5.97461 12.877 6.50977 13.248C7.04492 13.6191 7.70312 13.8047 8.48438 13.8047ZM27.8555 7.19531V10.7344H19.6758V7.19531H27.8555ZM34.6289 17.6953L30 0.234375H35.2969L36.6914 7.00781C36.8711 7.85938 37.0312 8.79102 37.1719 9.80273C37.3125 10.8145 37.4512 11.8242 37.5879 12.832C37.7246 13.8398 37.8633 14.7734 38.0039 15.6328H37.0664C37.2305 14.7734 37.3867 13.8398 37.5352 12.832C37.6836 11.8242 37.8379 10.8145 37.998 9.80273C38.1582 8.79102 38.3359 7.85938 38.5312 7.00781L40.0781 0.234375H44.8125L46.3594 7.00781C46.5547 7.85938 46.7324 8.79102 46.8926 9.80273C47.0527 10.8145 47.207 11.8242 47.3555 12.832C47.5039 13.8398 47.6602 14.7734 47.8242 15.6328H46.875C47.0234 14.7734 47.1641 13.8398 47.2969 12.832C47.4297 11.8242 47.5684 10.8145 47.7129 9.80273C47.8574 8.79102 48.0156 7.85938 48.1875 7.00781L49.5938 0.234375H54.8906L50.2617 17.6953H44.9062L43.1719 10.582C42.875 9.35547 42.6387 8.03125 42.4629 6.60938C42.2871 5.1875 42.0742 3.82031 41.8242 2.50781H43.0664C42.7695 3.82031 42.5488 5.18359 42.4043 6.59766C42.2598 8.01172 42.0352 9.33984 41.7305 10.582L39.9844 17.6953H34.6289ZM61.7695 17.9297C60.3477 17.9297 59.1289 17.6465 58.1133 17.0801C57.0977 16.5137 56.3223 15.7246 55.7871 14.7129C55.252 13.7012 54.9844 12.5234 54.9844 11.1797C54.9844 9.83594 55.252 8.6582 55.7871 7.64648C56.3223 6.63477 57.0977 5.8457 58.1133 5.2793C59.1289 4.71289 60.3477 4.42969 61.7695 4.42969C63.1914 4.42969 64.4062 4.71289 65.4141 5.2793C66.4219 5.8457 67.1934 6.63477 67.7285 7.64648C68.2637 8.6582 68.5312 9.83594 68.5312 11.1797C68.5312 12.5234 68.2637 13.7012 67.7285 14.7129C67.1934 15.7246 66.4219 16.5137 65.4141 17.0801C64.4062 17.6465 63.1914 17.9297 61.7695 17.9297ZM61.7695 14.4141C62.1758 14.4141 62.5254 14.2852 62.8184 14.0273C63.1113 13.7695 63.3359 13.3965 63.4922 12.9082C63.6484 12.4199 63.7266 11.8359 63.7266 11.1562C63.7266 10.4688 63.6484 9.88672 63.4922 9.41016C63.3359 8.93359 63.1113 8.57031 62.8184 8.32031C62.5254 8.07031 62.1758 7.94531 61.7695 7.94531C61.3555 7.94531 61 8.07031 60.7031 8.32031C60.4062 8.57031 60.1797 8.93359 60.0234 9.41016C59.8672 9.88672 59.7891 10.4688 59.7891 11.1562C59.7891 11.8359 59.8672 12.4199 60.0234 12.9082C60.1797 13.3965 60.4062 13.7695 60.7031 14.0273C61 14.2852 61.3555 14.4141 61.7695 14.4141ZM76.7695 17.9297C75.3477 17.9297 74.1289 17.6465 73.1133 17.0801C72.0977 16.5137 71.3223 15.7246 70.7871 14.7129C70.252 13.7012 69.9844 12.5234 69.9844 11.1797C69.9844 9.83594 70.252 8.6582 70.7871 7.64648C71.3223 6.63477 72.0977 5.8457 73.1133 5.2793C74.1289 4.71289 75.3477 4.42969 76.7695 4.42969C78.1914 4.42969 79.4062 4.71289 80.4141 5.2793C81.4219 5.8457 82.1934 6.63477 82.7285 7.64648C83.2637 8.6582 83.5312 9.83594 83.5312 11.1797C83.5312 12.5234 83.2637 13.7012 82.7285 14.7129C82.1934 15.7246 81.4219 16.5137 80.4141 17.0801C79.4062 17.6465 78.1914 17.9297 76.7695 17.9297ZM76.7695 14.4141C77.1758 14.4141 77.5254 14.2852 77.8184 14.0273C78.1113 13.7695 78.3359 13.3965 78.4922 12.9082C78.6484 12.4199 78.7266 11.8359 78.7266 11.1562C78.7266 10.4688 78.6484 9.88672 78.4922 9.41016C78.3359 8.93359 78.1113 8.57031 77.8184 8.32031C77.5254 8.07031 77.1758 7.94531 76.7695 7.94531C76.3555 7.94531 76 8.07031 75.7031 8.32031C75.4062 8.57031 75.1797 8.93359 75.0234 9.41016C74.8672 9.88672 74.7891 10.4688 74.7891 11.1562C74.7891 11.8359 74.8672 12.4199 75.0234 12.9082C75.1797 13.3965 75.4062 13.7695 75.7031 14.0273C76 14.2852 76.3555 14.4141 76.7695 14.4141Z" fill="#005DAC"/>
</svg>
        </router-link>
          <div>
          <q-btn flat dense :icon="matFavoriteBorder" aria-label="Add to wishlist" @click="toggleWishlistDrawer" class="q-ml-sm q-mr-sm">
          <q-badge v-if="storeReady && wishlist.state.items && Object.keys(wishlist.state.items).length > 0" floating color="red">{{ Object.keys(wishlist.state.items).length }}</q-badge>
        </q-btn>

        <q-btn flat dense :icon="matShoppingCart" aria-label="View cart" @click="toggleCart">
          <q-no-ssr>
          <q-badge v-if="storeReady && cart.state.items_count > 0" floating color="red">{{ cart.state.items_count }}</q-badge>
          </q-no-ssr>
        </q-btn>
        </div>
      </q-toolbar>
     </div>
    </q-header>

    <!-- Mobile Navigation Drawer -->
    <q-drawer
      v-model="mobileMenuDrawer"
      side="left"
      overlay
      behavior="mobile"
      :width="drawerWidth"
      transition-show="slide-right"
      transition-hide="slide-left"
      :touch-area-width="250"
      v-if="uiHydrated"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <div class="text-h6 q-mb-md">Menu</div>
          <q-list bordered padding>
            <q-item
      v-if="isSuperAdmin"
      clickable
      v-ripple
      to="/admin"
      active-class="text-primary"
    >
      <q-item-section avatar>
        <q-icon name="admin_panel_settings" />
      </q-item-section>
      <q-item-section>Go to Admin Panel</q-item-section>
    </q-item>

            <q-item clickable v-ripple to="/" @click="mobileMenuDrawer = false">
              <q-item-section avatar><q-icon :name="matHome" /></q-item-section>
              <q-item-section>Home</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/products/" @click="mobileMenuDrawer = false">
              <q-item-section avatar><q-icon :name="matStorefront" /></q-item-section>
              <q-item-section>Products</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/cart/" @click="mobileMenuDrawer = false">
              <q-item-section avatar><q-icon :name="matShoppingCart" /></q-item-section>
              <q-item-section>Cart</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/checkout/" @click="mobileMenuDrawer = false">
              <q-item-section avatar><q-icon :name="matReceipt" /></q-item-section>
              <q-item-section>Checkout</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/my-account/" @click="mobileMenuDrawer = false">
              <q-item-section avatar><q-icon :name="matPerson" /></q-item-section>
              <q-item-section>My Account</q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-banner
          v-if="supported && permission !== 'granted' && permission !== 'denied'"
          class="bg-secondary text-white q-ma-md rounded-borders shadow-2"
          inline-actions
      >
        <div class="text-subtitle1">Enable push notifications?</div>
        <template v-slot:action>
          <q-btn style="line-height: 1;" outline padding="sm" color="secondary" text-color="white" label="Enable" @click="handleSubscribe" />
        </template>
      </q-banner>
      </q-scroll-area>
    </q-drawer>

  <!-- Wishlist Drawer -->
  <q-drawer
    v-model="wishlistDrawerOpen"
    side="right"
    overlay
    :width="drawerWidth"
    behavior="mobile"
    v-if="uiHydrated"
  >
    <WishlistDrawer />
  </q-drawer>
<!-------------- ------->
    <q-drawer
      v-model="cartDrawer"
      side="right"
      overlay
      behavior="mobile"
      :width="drawerWidth"
      class="cart-drawer"
      :touch-area-width="250"
      v-if="uiHydrated"
    >
      <q-no-ssr>

      <q-scroll-area :visible="false" class="fit">
        <h4 class="sticky">Cart</h4>
        <div v-if="cart.hasItems.value">
        <div v-for="item in cart.state.items" :key="item.id" class="q-pa-sm row items-center" :class="[item.key.includes('offline') ? 'offline-item' : '']">
          <div class="q-ml-sm flex">
          <img width="70" height="70" v-if="item.images" :src="cart.state.offline === true ? item?.images[0]?.src || '/naturaBloom-circle.svg' : item.images[0]?.thumbnail || '/naturaBloom-circle.svg'" style="width: 70px; height: 70px; object-fit: cover" />
            <div class="product-meta text-text">
            <div>{{ item.name }}</div>
           <div v-if="item.variation && item.variation.length > 0">
             <div
             v-for="(variation, index) in item.variation"
             :key="index"
             >
             {{variation.attribute}}: {{variation.value}}
             </div>
          </div>
            <div v-if="item.prices">
              {{formatCurrency(
    item.prices.price,
    {
      minorUnit: item.prices?.currency_minor_unit ?? 2,
      decimalSeparator: item.prices?.currency_decimal_separator ?? '.',
      prefix: item.prices?.currency_prefix ?? '₪',
      suffix: item.prices?.currency_suffix ?? ''
    }
  )}}
            </div>
            </div>
          </div>
            <div class="row items-center">
              <div class="qty-wrap">
              <q-btn size="xs" padding="xs" :flat="true" :icon="matRemove" @click="decrease(item.key)" :disable="item.quantity === 1" />
              <span class="q-mx-sm">{{ item.quantity }}</span>
              <q-btn size="xs" padding="xs" :flat="true" :icon="matAdd" @click="increase(item.id)" />
              </div>
              <q-btn :outline="true" size="xs" padding="xs" :icon="matClose" @click="remove(item.key, item.remote_key)" class="q-ml-sm" />
            </div>
        </div>

        </div>
        <div v-else class="q-pa-sm row items-center">
          <h2>seems like your cart is empty</h2>
          <router-link to="/products/">
            <q-btn
                color="secondary"
                label="Shop now!"
            />
          </router-link>
        </div>
        <div class="cart-details sticky" v-if="cart.hasItems.value">
          <div class="cart-totals">
            <div class="flex justify-between"><span>Subtotal:</span> <span> {{formatCurrency(
    cart.state.cart_array?.totals?.total_price ? cart.state.cart_array.totals.total_price : cart.state?.totals?.total_price,
    {
      minorUnit: cart.state?.totals?.currency_minor_unit ?? 2,
      decimalSeparator: cart.state?.totals?.currency_decimal_separator ?? '.',
      prefix: cart.state?.totals?.currency_prefix ?? '₪',
      suffix: cart.state?.totals?.currency_suffix ?? ''
    }
  )}}</span></div>
          </div>
          <div class="buttons-wrap">
        <router-link to="/checkout/">
         <q-btn
          color="secondary"
          label="Checkout"
        />
        </router-link>
        <router-link to="/cart/">
         <q-btn
             :outline="true"
          color="transparent"
          label="View Cart"
        />
        </router-link>
          </div>
          </div>
      </q-scroll-area>
       </q-no-ssr>
    </q-drawer>
    <ai-assistant v-if="uiHydrated"></ai-assistant>
    <button v-else class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded bg-primary text-white q-btn--actionable q-focusable q-hoverable q-btn--fab fixed-bottom-left q-mb-md q-ml-md z-max" tabindex="0" type="button" aria-label="Open chat"><span class="q-focus-helper" tabindex="-1"></span><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row"><i class="q-icon absolute" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" style="fill: none;"></path><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path></svg></i></span></button>
    <q-page-container style="padding-top: 0">
      <main>
        <router-view />
      </main>
    </q-page-container>

    <footer>
      <div class="container flex justify-between">
        <div class="footer-column first">
<svg xmlns="http://www.w3.org/2000/svg" width="84" height="19" viewBox="0 0 84 19" fill="none">
<path d="M7.05469 11.2266H10.7344L12.0703 12.8906L14.3203 15.4453L17.25 18.9844H13.0547L10.9688 16.5703L9.58594 14.5547L7.05469 11.2266ZM8.48438 17.9297C6.89844 17.9297 5.46289 17.5859 4.17773 16.8984C2.89258 16.2109 1.875 15.2012 1.125 13.8691C0.375 12.5371 0 10.9062 0 8.97656C0 7.03125 0.375 5.39062 1.125 4.05469C1.875 2.71875 2.89258 1.70898 4.17773 1.02539C5.46289 0.341797 6.89844 0 8.48438 0C10.0703 0 11.5039 0.341797 12.7852 1.02539C14.0664 1.70898 15.084 2.71875 15.8379 4.05469C16.5918 5.39062 16.9688 7.03125 16.9688 8.97656C16.9688 10.9141 16.5918 12.5488 15.8379 13.8809C15.084 15.2129 14.0664 16.2207 12.7852 16.9043C11.5039 17.5879 10.0703 17.9297 8.48438 17.9297ZM8.48438 13.8047C9.27344 13.8047 9.93555 13.6191 10.4707 13.248C11.0059 12.877 11.4102 12.332 11.6836 11.6133C11.957 10.8945 12.0938 10.0156 12.0938 8.97656C12.0938 7.92969 11.957 7.04492 11.6836 6.32227C11.4102 5.59961 11.0059 5.05273 10.4707 4.68164C9.93555 4.31055 9.27344 4.125 8.48438 4.125C7.70312 4.125 7.04492 4.31055 6.50977 4.68164C5.97461 5.05273 5.56836 5.59961 5.29102 6.32227C5.01367 7.04492 4.875 7.92969 4.875 8.97656C4.875 10.0156 5.01367 10.8945 5.29102 11.6133C5.56836 12.332 5.97461 12.877 6.50977 13.248C7.04492 13.6191 7.70312 13.8047 8.48438 13.8047ZM27.8555 7.19531V10.7344H19.6758V7.19531H27.8555ZM34.6289 17.6953L30 0.234375H35.2969L36.6914 7.00781C36.8711 7.85938 37.0312 8.79102 37.1719 9.80273C37.3125 10.8145 37.4512 11.8242 37.5879 12.832C37.7246 13.8398 37.8633 14.7734 38.0039 15.6328H37.0664C37.2305 14.7734 37.3867 13.8398 37.5352 12.832C37.6836 11.8242 37.8379 10.8145 37.998 9.80273C38.1582 8.79102 38.3359 7.85938 38.5312 7.00781L40.0781 0.234375H44.8125L46.3594 7.00781C46.5547 7.85938 46.7324 8.79102 46.8926 9.80273C47.0527 10.8145 47.207 11.8242 47.3555 12.832C47.5039 13.8398 47.6602 14.7734 47.8242 15.6328H46.875C47.0234 14.7734 47.1641 13.8398 47.2969 12.832C47.4297 11.8242 47.5684 10.8145 47.7129 9.80273C47.8574 8.79102 48.0156 7.85938 48.1875 7.00781L49.5938 0.234375H54.8906L50.2617 17.6953H44.9062L43.1719 10.582C42.875 9.35547 42.6387 8.03125 42.4629 6.60938C42.2871 5.1875 42.0742 3.82031 41.8242 2.50781H43.0664C42.7695 3.82031 42.5488 5.18359 42.4043 6.59766C42.2598 8.01172 42.0352 9.33984 41.7305 10.582L39.9844 17.6953H34.6289ZM61.7695 17.9297C60.3477 17.9297 59.1289 17.6465 58.1133 17.0801C57.0977 16.5137 56.3223 15.7246 55.7871 14.7129C55.252 13.7012 54.9844 12.5234 54.9844 11.1797C54.9844 9.83594 55.252 8.6582 55.7871 7.64648C56.3223 6.63477 57.0977 5.8457 58.1133 5.2793C59.1289 4.71289 60.3477 4.42969 61.7695 4.42969C63.1914 4.42969 64.4062 4.71289 65.4141 5.2793C66.4219 5.8457 67.1934 6.63477 67.7285 7.64648C68.2637 8.6582 68.5312 9.83594 68.5312 11.1797C68.5312 12.5234 68.2637 13.7012 67.7285 14.7129C67.1934 15.7246 66.4219 16.5137 65.4141 17.0801C64.4062 17.6465 63.1914 17.9297 61.7695 17.9297ZM61.7695 14.4141C62.1758 14.4141 62.5254 14.2852 62.8184 14.0273C63.1113 13.7695 63.3359 13.3965 63.4922 12.9082C63.6484 12.4199 63.7266 11.8359 63.7266 11.1562C63.7266 10.4688 63.6484 9.88672 63.4922 9.41016C63.3359 8.93359 63.1113 8.57031 62.8184 8.32031C62.5254 8.07031 62.1758 7.94531 61.7695 7.94531C61.3555 7.94531 61 8.07031 60.7031 8.32031C60.4062 8.57031 60.1797 8.93359 60.0234 9.41016C59.8672 9.88672 59.7891 10.4688 59.7891 11.1562C59.7891 11.8359 59.8672 12.4199 60.0234 12.9082C60.1797 13.3965 60.4062 13.7695 60.7031 14.0273C61 14.2852 61.3555 14.4141 61.7695 14.4141ZM76.7695 17.9297C75.3477 17.9297 74.1289 17.6465 73.1133 17.0801C72.0977 16.5137 71.3223 15.7246 70.7871 14.7129C70.252 13.7012 69.9844 12.5234 69.9844 11.1797C69.9844 9.83594 70.252 8.6582 70.7871 7.64648C71.3223 6.63477 72.0977 5.8457 73.1133 5.2793C74.1289 4.71289 75.3477 4.42969 76.7695 4.42969C78.1914 4.42969 79.4062 4.71289 80.4141 5.2793C81.4219 5.8457 82.1934 6.63477 82.7285 7.64648C83.2637 8.6582 83.5312 9.83594 83.5312 11.1797C83.5312 12.5234 83.2637 13.7012 82.7285 14.7129C82.1934 15.7246 81.4219 16.5137 80.4141 17.0801C79.4062 17.6465 78.1914 17.9297 76.7695 17.9297ZM76.7695 14.4141C77.1758 14.4141 77.5254 14.2852 77.8184 14.0273C78.1113 13.7695 78.3359 13.3965 78.4922 12.9082C78.6484 12.4199 78.7266 11.8359 78.7266 11.1562C78.7266 10.4688 78.6484 9.88672 78.4922 9.41016C78.3359 8.93359 78.1113 8.57031 77.8184 8.32031C77.5254 8.07031 77.1758 7.94531 76.7695 7.94531C76.3555 7.94531 76 8.07031 75.7031 8.32031C75.4062 8.57031 75.1797 8.93359 75.0234 9.41016C74.8672 9.88672 74.7891 10.4688 74.7891 11.1562C74.7891 11.8359 74.8672 12.4199 75.0234 12.9082C75.1797 13.3965 75.4062 13.7695 75.7031 14.0273C76 14.2852 76.3555 14.4141 76.7695 14.4141Z" fill="#005DAC"/>
</svg>
          <p>Crafting botanical excellence for the modern soul. Pure ingredients, ethical processes, lasting radiance.</p>
        </div>
        <div class="footer-column">
          <h2 class="links-title">Shop</h2>
          <nav>
            <router-link to="/products">Shop All</router-link>
            <router-link to="/product-category/best-sellers">Best Sellers</router-link>
            <router-link to="/product-category/new-arrival">New Arrival</router-link>
            <router-link to="/gift-card">Gift Card</router-link>
          </nav>
        </div>
        <div class="footer-column">
          <h2 class="links-title">Experience</h2>
          <nav>
            <router-link to="/sustainability">Sustainability</router-link>
            <router-link to="/our-story">Our Story</router-link>
          </nav>
        </div>
        <div class="footer-column">
          <h2 class="links-title">Support</h2>
          <nav>
            <router-link to="/shipping-and-returns">Shipping & Returns</router-link>
            <router-link to="/privacy-policy">Privacy Policy</router-link>
            <router-link to="/terms-of-service">Terms of Service</router-link>
            <router-link to="/contact-us">Contact Us</router-link>
          </nav>
        </div>
        <div class="footer-bottom">
          <span>All right reserved</span>
        </div>
      </div>
    </footer>

    <CookieBanner v-if="uiHydrated" />

  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'
import cart from 'src/stores/cart'
import wishlist from 'src/stores/wishlist'
import WishlistDrawer from 'src/components/WishlistDrawer.vue'
import { useRoute, useRouter } from 'vue-router'
import { Platform } from 'quasar';
import CookieBanner from "src/components/CookieBanner.vue";
import AiAssistant from "src/components/AiAssistant.vue";
import initPush, { subscribeToWebPush, initNativePush, checkNativePermission } from 'src/boot/push.js'
import { initLoadingBar } from 'boot/loading-bar'
import { initAuthPopup } from 'boot/auth-expired'
import {formatCurrency} from 'src/utils/formatters.js'

import { matShoppingCart,
  matFavoriteBorder,
  matMenu,
  matHome,
  matStorefront,
  matReceipt,
  matPerson,
  matAdminPanelSettings,
  matAdd,
  matClose,
  matRemove,
  matWifi,
  matSignalWifiOff,
  matError } from '@quasar/extras/material-icons'


async function hideSplash() {
  if (!Platform.is.capacitor) return
  try {
    const {SplashScreen} = await import(/* @vite-ignore */ '@capacitor/splash-screen')
    await SplashScreen.hide({ fadeOutDuration: 500 })
  } catch (err) {
    console.warn('SplashScreen hide failed', err)
  }
}

function normalizePermission(value) {
  if (value === 'prompt') { return 'default' } else if (value === 'initialized') { return 'granted' }
  return value
}
/* eslint-disable no-unused-vars */
const _responsiveClasses = 'gt-sm lt-md gt-md lt-sm'
/* eslint-enable no-unused-vars */

const permission = ref('default')
const supported = ref(false)
const isSuperAdmin = computed(() => cart.state.user?.is_super_admin === true)

const $q = useQuasar()
const mobileMenuDrawer = ref(false)

const wishlistDrawerOpen = ref(false)
const cartDrawer = ref(false)
const drawerWidth = computed(() => Math.min(400, $q.screen.width * 0.9))

let startX = 0
let isDragging = false

// 1. Logic for START (Touch or Mouse)
const onStart = (x) => {
  if (mobileMenuDrawer.value || cartDrawer.value || wishlistDrawerOpen.value) {
    isDragging = false
    return
  }
  startX = x
  isDragging = true
}

// 2. Logic for END (Touch or Mouse)
const onEnd = (endX) => {
  if (!isDragging) return
  isDragging = false

  const dx = endX - startX
  const absX = Math.abs(dx)

  if (absX > 70) {
    if (dx > 0) {
      mobileMenuDrawer.value = true // Swipe Right
    } else {
      cartDrawer.value = true // Swipe Left
    }
  }
}

// --- EVENT WRAPPERS ---

// Mobile Handlers
const handleTouchStart = (e) => onStart(e.touches[0].clientX, e.touches[0].clientY)
const handleTouchEnd = (e) => onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

// Desktop Handlers (Mouse)
const handleMouseDown = (e) => onStart(e.clientX, e.clientY)
const handleMouseUp = (e) => onEnd(e.clientX, e.clientY)

const toggleCart = () => (cartDrawer.value = !cartDrawer.value)
const toggleWishlistDrawer = () => (wishlistDrawerOpen.value = !wishlistDrawerOpen.value)

// Wrap cart methods so template can call directly
const increase = (id) => cart.increase(id)
const decrease = (id) => cart.decrease(id)
const remove = (itemKey=null, itemAPIkey=null) => cart.remove(itemKey,itemAPIkey)

async function handleSubscribe() {
  if (Platform.is.capacitor) {
    try {
      // request permission via the boot helper (user gesture)
      const result = await initNativePush()
      permission.value = normalizePermission(result)
      //alert('Permission status: ' + result)
    } catch (e) {
      console.error('Native permission error', e)
    }
  } else {
    await subscribeToWebPush()
    permission.value = Notification.permission
  }
}
// Utility: detect incognito (best-effort, not 100% but covers Chrome/Firefox/Safari)
async function isIncognito() {
  try {
    if (!('storage' in navigator && 'persist' in navigator.storage)) return false
    const persisted = await navigator.storage.persist()
    return !persisted
  } catch {
    return false
  }
}


const storeReady = ref(process.env.SERVER) // Immediate sync
const uiHydrated = ref(false)              // Deferred functional UI
const route = useRoute()
const router = useRouter()

const noDelayRoutes = ['/checkout/', '/cart/', '/my-account/']

const shouldDelayHydration = computed(() => {
  return !noDelayRoutes.includes(route.path)
})

const initConnectivityListeners = () => {
  if (window.__CONNECTIVITY_INITIALIZED__) return
  window.__CONNECTIVITY_INITIALIZED__ = true

  let wasOffline = !navigator.onLine

  const updateOnlineStatus = async (isOnline) => {
    console.log(isOnline)
    const becameOnline  = isOnline && wasOffline
    const becameOffline = !isOnline && !wasOffline

    if (!becameOnline && !becameOffline) return  // no actual state change, bail early

    wasOffline = !isOnline
    cart.state.offline = !isOnline

    if (becameOnline) {
      $q.notify({ type: 'positive', message: 'You are back online!', icon: matWifi, timeout: 3000 })
      await cart.fetchCart()
      await cart.fetchWishlistItems()
    } else {
      $q.notify({ type: 'warning', message: 'You are offline. Some features may be limited.', icon: matSignalWifiOff, timeout: 3000 })
    }
  }

  window.addEventListener('online',  () => updateOnlineStatus(true))
  window.addEventListener('offline', () => updateOnlineStatus(false))
  // Catches physical network changes (WiFi toggle) that window events miss

  navigator.serviceWorker.addEventListener('message', ({ data }) => {
    console.log(data);
    if (data.type === 'OFFLINE') {
      updateOnlineStatus(false)
    } else if (data.type === 'ONLINE'){
      updateOnlineStatus(true)
    }
  });

  navigator.connection?.addEventListener('change', async () => {
    try {
      await fetch(window.location.origin, {method: 'HEAD', cache: 'no-store'})
      updateOnlineStatus(true)
    } catch {
      updateOnlineStatus(false)
    }
  })

  console.log('[connectivity] listeners attached')
}

onMounted(async () => {
  storeReady.value = true
  if (!('serviceWorker' in navigator)) return

  const warm = () => {
    navigator.serviceWorker.ready.then(registration => {
      registration.active?.postMessage({ type: 'WARM_PRODUCTS_CACHE' })
    })
  }

  await router.isReady()

  const scheduler = async () => {
    if (uiHydrated.value) return
    window.removeEventListener('scroll', scheduler)
    window.removeEventListener('mousemove', scheduler)
    window.removeEventListener('touchstart', scheduler)


    try {
      //const {hydrate} = await import('../utils/lazy-quasar.js')
      //await hydrate()

      requestAnimationFrame(() => {
        uiHydrated.value = true
        hideSplash()
        initConnectivityListeners()
        warm()

        initLoadingBar(router)
        initAuthPopup(router)

        /*if (typeof window !== 'undefined' || Platform.is.capacitor) {
          initPush({router})
          checkNativePermission().then(initialPermissions => {
            permission.value = normalizePermission(initialPermissions)
          })
        }*/

        initPush({router})

        if (Platform.is.capacitor) {
          supported.value = true
          // keep only the native check, remove the web Notification.permission line below
          checkNativePermission().then(initialPermissions => {
            permission.value = normalizePermission(initialPermissions)
          })
        } else if ('Notification' in window) {
          const perm = normalizePermission(Notification.permission)
          permission.value = perm

          // If already granted, no need to show the banner or check incognito
          if (perm !== 'granted') {
            isIncognito().then(incognito => {
              if (!incognito) {
                supported.value = true
              }
            })
          }
        }
        window.addEventListener('touchstart', handleTouchStart, {passive: true})
        window.addEventListener('touchend', handleTouchEnd, {passive: true})
        window.addEventListener('mousedown', handleMouseDown, {passive: true})
        window.addEventListener('mouseup', handleMouseUp, {passive: true})
      })

    } catch (e) {
      console.error('Hydration prefetch failed', e)
      uiHydrated.value = true
    }
  }

  // Define headerBtnClick after scheduler so it can reference it
  const headerBtnClick = async (e) => {
    await scheduler()
    const btn = e.target.closest('[aria-label]')
    if (btn) {
      const label = btn.getAttribute('aria-label')
      requestAnimationFrame(() => {
        if (label === 'Open menu') mobileMenuDrawer.value = true
        else if (label === 'Add to wishlist') wishlistDrawerOpen.value = true
        else if (label === 'View cart') cartDrawer.value = true
      })
    }
  }

  document.querySelector('header').addEventListener('click', headerBtnClick, { passive: true })

  if (!shouldDelayHydration.value) {
    scheduler()
  } else {
    const cleanup = () => {
      window.removeEventListener('scroll', scheduler)
      window.removeEventListener('mousemove', scheduler)
      window.removeEventListener('touchstart', scheduler)
      clearTimeout(fallbackTimer)
    }

    const fallbackTimer = setTimeout(() => {
      cleanup()
      scheduler()
    }, 3000)

    window.addEventListener('scroll', scheduler, { passive: true })
    window.addEventListener('mousemove', scheduler, { passive: true })
    window.addEventListener('touchstart', scheduler, { passive: true })
  }
})
onUnmounted(() => {
  // Critical cleanup
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
})
watch(() => cart.state.drawerOpen, val => {
  if(val === true) {
    cartDrawer.value = val;
    cart.state.drawerOpen = false;
    //cart.fetchCart()
  }
})
watch(
  () => cart.state.rejected_items,
  (rejected) => {
    if (rejected?.length) {
      rejected.forEach(item => {
        $q.notify({
          type: 'warning',
          message: `"${item.name}" was removed — no longer available`,
          icon: matError,
          timeout: 8000
        })
      })
    }
  }
)

</script>