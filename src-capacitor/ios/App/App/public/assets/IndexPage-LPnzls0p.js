const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./quasar.client-CId9M-oB.js","./quasar-observers-delayed-tSHCOYpR.js"])))=>i.map(i=>d[i]);
import { E as useFormProps, F as useSizeProps, h as hMergeSlot, e as QIcon, G as useSize, H as useFormInject, I as useFormAttrs, _ as _export_sfc, Q as QBtn, o as __vitePreload, J as productsStore, q as useRoute, K as matStar, L as matChevronRight, M as matChevronLeft } from "./index-DDAg5YDa.js";
import { f as createComponent, g as getCurrentInstance, a1 as onBeforeUpdate, h, e as computed, W as between, S as stopAndPrevent, j as ref, o as openBlock, m as createElementBlock, a9 as createBaseVNode, s as createTextVNode, aa as Fragment, ab as renderList, ag as createStaticVNode, p as createBlock, ai as createSlots, q as withCtx, t as createVNode, aj as mergeProps, ad as withModifiers, ac as toDisplayString, u as createCommentVNode, ak as setBlockTracking, x as onMounted, v as watch, al as defineAsyncComponent, am as useSSRContext, ae as normalizeClass } from "./quasar-observers-delayed-tSHCOYpR.js";
import { u as useQuasar } from "./use-quasar-D_HwOQSM.js";
import { u as useMeta } from "./use-meta-BVxOmsjs.js";
import { P as ProductCard } from "./ProductCard-DoDbkxcv.js";
const QRating = createComponent({
  name: "QRating",
  props: {
    ...useSizeProps,
    ...useFormProps,
    modelValue: {
      type: Number,
      required: true
    },
    max: {
      type: [String, Number],
      default: 5
    },
    icon: [String, Array],
    iconHalf: [String, Array],
    iconSelected: [String, Array],
    iconAriaLabel: [String, Array],
    color: [String, Array],
    colorHalf: [String, Array],
    colorSelected: [String, Array],
    noReset: Boolean,
    noDimming: Boolean,
    readonly: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const formAttrs = useFormAttrs(props);
    const injectFormInput = useFormInject(formAttrs);
    const mouseModel = ref(0);
    let iconRefs = {};
    const editable = computed(
      () => props.readonly !== true && props.disable !== true
    );
    const classes = computed(
      () => `q-rating row inline items-center q-rating--${editable.value === true ? "" : "non-"}editable` + (props.noDimming === true ? " q-rating--no-dimming" : "") + (props.disable === true ? " disabled" : "") + (props.color !== void 0 && Array.isArray(props.color) === false ? ` text-${props.color}` : "")
    );
    const iconData = computed(() => {
      const iconLen = Array.isArray(props.icon) === true ? props.icon.length : 0, selIconLen = Array.isArray(props.iconSelected) === true ? props.iconSelected.length : 0, halfIconLen = Array.isArray(props.iconHalf) === true ? props.iconHalf.length : 0, colorLen = Array.isArray(props.color) === true ? props.color.length : 0, selColorLen = Array.isArray(props.colorSelected) === true ? props.colorSelected.length : 0, halfColorLen = Array.isArray(props.colorHalf) === true ? props.colorHalf.length : 0;
      return {
        iconLen,
        icon: iconLen > 0 ? props.icon[iconLen - 1] : props.icon,
        selIconLen,
        selIcon: selIconLen > 0 ? props.iconSelected[selIconLen - 1] : props.iconSelected,
        halfIconLen,
        halfIcon: halfIconLen > 0 ? props.iconHalf[selIconLen - 1] : props.iconHalf,
        colorLen,
        color: colorLen > 0 ? props.color[colorLen - 1] : props.color,
        selColorLen,
        selColor: selColorLen > 0 ? props.colorSelected[selColorLen - 1] : props.colorSelected,
        halfColorLen,
        halfColor: halfColorLen > 0 ? props.colorHalf[halfColorLen - 1] : props.colorHalf
      };
    });
    const iconLabel = computed(() => {
      if (typeof props.iconAriaLabel === "string") {
        const label = props.iconAriaLabel.length !== 0 ? `${props.iconAriaLabel} ` : "";
        return (i) => `${label}${i}`;
      }
      if (Array.isArray(props.iconAriaLabel) === true) {
        const iMax = props.iconAriaLabel.length;
        if (iMax > 0) {
          return (i) => props.iconAriaLabel[Math.min(i, iMax) - 1];
        }
      }
      return (i, label) => `${label} ${i}`;
    });
    const stars = computed(() => {
      const acc = [], icons = iconData.value, ceil = Math.ceil(props.modelValue), tabindex = editable.value === true ? 0 : null;
      const halfIndex = props.iconHalf === void 0 || ceil === props.modelValue ? -1 : ceil;
      for (let i = 1; i <= props.max; i++) {
        const active = mouseModel.value === 0 && props.modelValue >= i || mouseModel.value > 0 && mouseModel.value >= i, half = halfIndex === i && mouseModel.value < i, exSelected = mouseModel.value > 0 && (half === true ? ceil : props.modelValue) >= i && mouseModel.value < i, color = half === true ? i <= icons.halfColorLen ? props.colorHalf[i - 1] : icons.halfColor : icons.selColor !== void 0 && active === true ? i <= icons.selColorLen ? props.colorSelected[i - 1] : icons.selColor : i <= icons.colorLen ? props.color[i - 1] : icons.color, name = (half === true ? i <= icons.halfIconLen ? props.iconHalf[i - 1] : icons.halfIcon : icons.selIcon !== void 0 && (active === true || exSelected === true) ? i <= icons.selIconLen ? props.iconSelected[i - 1] : icons.selIcon : i <= icons.iconLen ? props.icon[i - 1] : icons.icon) || $q.iconSet.rating.icon;
        acc.push({
          name: (half === true ? i <= icons.halfIconLen ? props.iconHalf[i - 1] : icons.halfIcon : icons.selIcon !== void 0 && (active === true || exSelected === true) ? i <= icons.selIconLen ? props.iconSelected[i - 1] : icons.selIcon : i <= icons.iconLen ? props.icon[i - 1] : icons.icon) || $q.iconSet.rating.icon,
          attrs: {
            tabindex,
            role: "radio",
            "aria-checked": props.modelValue === i ? "true" : "false",
            "aria-label": iconLabel.value(i, name)
          },
          iconClass: "q-rating__icon" + (active === true || half === true ? " q-rating__icon--active" : "") + (exSelected === true ? " q-rating__icon--exselected" : "") + (mouseModel.value === i ? " q-rating__icon--hovered" : "") + (color !== void 0 ? ` text-${color}` : "")
        });
      }
      return acc;
    });
    const attributes = computed(() => {
      const attrs = { role: "radiogroup" };
      if (props.disable === true) {
        attrs["aria-disabled"] = "true";
      }
      if (props.readonly === true) {
        attrs["aria-readonly"] = "true";
      }
      return attrs;
    });
    function set(value) {
      if (editable.value === true) {
        const model = between(parseInt(value, 10), 1, parseInt(props.max, 10)), newVal = props.noReset !== true && props.modelValue === model ? 0 : model;
        newVal !== props.modelValue && emit("update:modelValue", newVal);
        mouseModel.value = 0;
      }
    }
    function setHoverValue(value) {
      if (editable.value === true) {
        mouseModel.value = value;
      }
    }
    function onKeyup(e, i) {
      switch (e.keyCode) {
        case 13:
        case 32:
          set(i);
          return stopAndPrevent(e);
        case 37:
        // LEFT ARROW
        case 40:
          if (iconRefs[`rt${i - 1}`]) {
            iconRefs[`rt${i - 1}`].focus();
          }
          return stopAndPrevent(e);
        case 39:
        // RIGHT ARROW
        case 38:
          if (iconRefs[`rt${i + 1}`]) {
            iconRefs[`rt${i + 1}`].focus();
          }
          return stopAndPrevent(e);
      }
    }
    function resetMouseModel() {
      mouseModel.value = 0;
    }
    onBeforeUpdate(() => {
      iconRefs = {};
    });
    return () => {
      const child = [];
      stars.value.forEach(({ iconClass, name, attrs }, index) => {
        const i = index + 1;
        child.push(
          h("div", {
            key: i,
            ref: (el) => {
              iconRefs[`rt${i}`] = el;
            },
            class: "q-rating__icon-container flex flex-center",
            ...attrs,
            onClick() {
              set(i);
            },
            onMouseover() {
              setHoverValue(i);
            },
            onMouseout: resetMouseModel,
            onFocus() {
              setHoverValue(i);
            },
            onBlur: resetMouseModel,
            onKeyup(e) {
              onKeyup(e, i);
            }
          }, hMergeSlot(
            slots[`tip-${i}`],
            [h(QIcon, { class: iconClass, name })]
          ))
        );
      });
      if (props.name !== void 0 && props.disable !== true) {
        injectFormInput(child, "push");
      }
      return h("div", {
        class: classes.value,
        style: sizeStyle.value,
        ...attributes.value
      }, child);
    };
  }
});
async function loadPageConfig(page, isPreview) {
  {
    try {
      const url = isPreview ? `https://nuxt.meidanm.com/wp-json/shop-builder/v1/preview/${page}` : `/config/${page}.json`;
      const response = await fetch(url, {
        cache: "no-store"
      });
      if (!response.ok) return {};
      return await response.json();
    } catch (err) {
      console.error("[Client] loadPageConfig Error:", err);
      return {};
    }
  }
}
function useCarouselKeyboard(slideRef, totalSlidesRef) {
  function onKeydown(e) {
    switch (e.key) {
      case "ArrowRight":
        slideRef.value = (slideRef.value + 1) % totalSlidesRef.value;
        break;
      case "ArrowLeft":
        slideRef.value = (slideRef.value - 1 + totalSlidesRef.value) % totalSlidesRef.value;
        break;
      case "Home":
        slideRef.value = 0;
        break;
      case "End":
        slideRef.value = totalSlidesRef.value - 1;
        break;
    }
  }
  return {
    onKeydown
  };
}
const _sfc_main = /* @__PURE__ */ Object.assign({
  async preFetch({ ssrContext, currentRoute }) {
    console.log("--- PreFetch Running for:", currentRoute.path);
    const { fetchSeoForPath } = await __vitePreload(async () => {
      const { fetchSeoForPath: fetchSeoForPath2 } = await import("./useSeo-DQlkSlEM.js");
      return { fetchSeoForPath: fetchSeoForPath2 };
    }, true ? [] : void 0, import.meta.url);
    const isPreview = currentRoute.query.preview === "true";
    const [seo, configData] = await Promise.all([
      fetchSeoForPath("homepage"),
      loadPageConfig("home", isPreview)
      // The helper we'll create
    ]);
    const featuredIds = configData?.featured_products || [];
    const leanProducts = featuredIds.length ? await productsStore.getByIds(featuredIds) : productsStore.products.value.slice(0, 6);
    if (ssrContext) {
      ssrContext.seoData = seo;
      ssrContext.homeProductsData = leanProducts;
      ssrContext.pageConfig = configData;
      ssrContext.heroData = {
        src: "https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png",
        srcset: "https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png 300w,https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover-768x512.png 768w,https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover.png 1024w",
        sizes: "(min-width: 768px) 50vw, calc(100vw - 40px)"
      };
    }
  }
}, {
  __name: "IndexPage",
  setup(__props, { expose: __expose }) {
    const QCarousel = defineAsyncComponent(() => __vitePreload(() => import("./quasar.client-CId9M-oB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => m.QCarousel));
    const QCarouselSlide = defineAsyncComponent(() => __vitePreload(() => import("./quasar.client-CId9M-oB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => m.QCarouselSlide));
    const QCarouselControl = defineAsyncComponent(() => __vitePreload(() => import("./quasar.client-CId9M-oB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => m.QCarouselControl));
    const QInput = defineAsyncComponent(() => __vitePreload(() => import("./quasar.client-CId9M-oB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => m.QInput));
    const isHydrated = ref(false);
    const $q = useQuasar();
    if (window.__HOME_PRODUCTS_DATA__ && Array.isArray(window.__HOME_PRODUCTS_DATA__)) {
      productsStore.products.value = window.__HOME_PRODUCTS_DATA__;
    }
    const route = useRoute();
    const scrollToProducts = () => {
    };
    __expose({ scrollToProducts });
    const homeSettings = ref(null);
    const seoData = ref(null);
    useMeta(() => {
      const seo = seoData.value;
      if (!seo) {
        return {};
      }
      return {
        title: seo.title,
        meta: {
          robots: { name: "robots", content: seo.robots, key: "robots" },
          description: { name: "description", content: seo.description, key: "description" },
          "og:title": { property: "og:title", content: seo.title },
          "og:image": { property: "og:image", content: seo.og_image }
        }
      };
    });
    const visibleStaticItems = computed(() => {
      const ids = homeSettings.value?.featured_products || [];
      let items = [];
      if (ids && ids.length) {
        items = ids.map((id) => {
          return productsStore.products.value.find((p) => Number(p.id) === Number(id));
        }).filter(Boolean);
      }
      if (!items.length) {
        items = (productsStore.products.value || []).slice(0, 6);
      }
      const result = items.slice(0, 3);
      while (result.length < 3) {
        result.push({ __placeholder: true, id: `placeholder-${result.length}` });
      }
      return result;
    });
    const API_BASE = "https://nuxt.meidanm.com";
    const slideChunks = ref([]);
    const testimonialSlideChunks = ref([]);
    const slide = ref(0);
    const carouselKey = ref(0);
    const testimonialCarouselKey = ref(0);
    const productSection = ref(null);
    const ctaBtn = ref(null);
    const email = ref("");
    const getChunks = (array, size) => {
      if (!Array.isArray(array) || !array.length) return [];
      const chunks = [];
      for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
      return chunks;
    };
    const recomputeSlides = async (forceRemount = false) => {
      if (!isHydrated.value) return;
      if (!productsStore.products.value.length) {
        await productsStore.preFetchProducts("", true);
      }
      const ids = homeSettings.value?.featured_products || [];
      const allProducts = await productsStore.getByIds(ids) || [];
      let items = ids.length ? ids.map((id) => allProducts.find((p) => p.id == id)).filter(Boolean) : allProducts.slice(0, 6);
      const chunkSize = $q.screen.lt.sm ? 1 : $q.screen.lt.md ? 2 : 3;
      if (chunkSize === 3) {
        while (items.length < 3) {
          items.push({ __placeholder: true, id: `placeholder-${items.length}` });
        }
      }
      if (forceRemount) carouselKey.value++;
      slideChunks.value = getChunks(items, chunkSize);
    };
    const showCarouselControls = computed(() => {
      return slideChunks.value.length > 1;
    });
    const totalProductSlides = computed(() => slideChunks.value.length);
    const { onKeydown: onKeydown_products } = useCarouselKeyboard(
      slide,
      totalProductSlides
    );
    const testimonials = ref([
      { name: "Alice Johnson", feedback: "NaturaBloom products have transformed my skincare routine!" },
      { name: "Mark Thompson", feedback: "I love the organic ingredients and sustainable packaging." },
      { name: "Sophie Lee", feedback: "Fast shipping and excellent customer service." },
      { name: "John Doe", feedback: "Amazing quality!" },
      { name: "Jane Smith", feedback: "Will buy again." }
    ]);
    const testimonialsSlide = ref(0);
    const recomputeTestimonialSlides = async (forceRemount = false) => {
      if (!isHydrated.value) return;
      if (!testimonials.value.length) {
        return;
      }
      const chunkSize = $q.screen.lt.sm ? 1 : $q.screen.lt.md ? 2 : 3;
      if (forceRemount) testimonialCarouselKey.value++;
      testimonialSlideChunks.value = getChunks(testimonials.value, chunkSize);
    };
    const showTestimonialCarouselControls = computed(() => {
      return testimonialSlideChunks.value.length > 1;
    });
    const totalTestimonialSlides = computed(() => testimonialSlideChunks.value.length);
    const { onKeydown: onKeydown_testimonials } = useCarouselKeyboard(
      testimonialsSlide,
      totalTestimonialSlides
    );
    const instagramPosts = ref([
      { image: `${API_BASE}/wp-content/uploads/2025/05/procudts-catalog-img.png`, caption: "Our latest product launch!" },
      { image: `${API_BASE}/wp-content/uploads/2025/05/procudts-catalog-img.png`, caption: "Behind the scenes at NaturaBloom." },
      { image: `${API_BASE}/wp-content/uploads/2025/05/procudts-catalog-img.png`, caption: "Customer favorites this month." },
      { image: `${API_BASE}/wp-content/uploads/2025/05/procudts-catalog-img.png`, caption: "Sustainable packaging in action." }
    ]);
    const subscribeNewsletter = () => {
      if (email.value) {
        $q.notify({ type: "positive", message: "Subscribed successfully!" });
        email.value = "";
      } else {
        $q.notify({ type: "negative", message: "Please enter a valid email." });
      }
    };
    onMounted(async () => {
      if (window.__PAGE_CONFIG__ && Object.keys(window.__PAGE_CONFIG__).length) {
        homeSettings.value = window.__PAGE_CONFIG__;
      } else {
        const isPreview = route.query.preview === "true";
        const freshConfig = await loadPageConfig("home", isPreview);
        if (freshConfig) homeSettings.value = freshConfig;
      }
      isHydrated.value = false;
      {
        const hydrateOnInteraction = () => {
          if (isHydrated.value) return;
          requestIdleCallback(() => {
            window.removeEventListener("scroll", hydrateOnInteraction);
            window.removeEventListener("mousemove", hydrateOnInteraction);
            window.removeEventListener("touchstart", hydrateOnInteraction);
            requestAnimationFrame(() => {
              isHydrated.value = true;
            });
            recomputeSlides();
            recomputeTestimonialSlides();
          });
        };
        window.addEventListener("scroll", hydrateOnInteraction, { passive: true });
        window.addEventListener("mousemove", hydrateOnInteraction, { passive: true });
        window.addEventListener("touchstart", hydrateOnInteraction, { passive: true });
        setTimeout(hydrateOnInteraction, 3e3);
      }
    });
    watch(isHydrated, async (val) => {
      if (!val) return;
      try {
        await recomputeSlides(true);
        await recomputeTestimonialSlides(true);
        const { fetchSeoForPath } = await __vitePreload(async () => {
          const { fetchSeoForPath: fetchSeoForPath2 } = await import("./useSeo-DQlkSlEM.js");
          return { fetchSeoForPath: fetchSeoForPath2 };
        }, true ? [] : void 0, import.meta.url);
        seoData.value = await fetchSeoForPath("homepage");
      } catch (err) {
        console.error("Hydration error:", err);
      }
    }, { immediate: true });
    watch(
      [() => productsStore.products.value, () => $q.screen.name, () => homeSettings.value],
      () => {
        if (!isHydrated.value) return;
        recomputeSlides(true);
        recomputeTestimonialSlides(true);
      }
    );
    const __returned__ = { QCarousel, QCarouselSlide, QCarouselControl, QInput, isHydrated, $q, route, scrollToProducts, homeSettings, seoData, visibleStaticItems, API_BASE, slideChunks, testimonialSlideChunks, slide, carouselKey, testimonialCarouselKey, productSection, ctaBtn, email, getChunks, recomputeSlides, showCarouselControls, totalProductSlides, onKeydown_products, testimonials, testimonialsSlide, recomputeTestimonialSlides, showTestimonialCarouselControls, totalTestimonialSlides, onKeydown_testimonials, instagramPosts, subscribeNewsletter, ref, onMounted, watch, computed, useSSRContext, get useQuasar() {
      return useQuasar;
    }, get useMeta() {
      return useMeta;
    }, get useRoute() {
      return useRoute;
    }, get productsStore() {
      return productsStore;
    }, get matChevronLeft() {
      return matChevronLeft;
    }, get matChevronRight() {
      return matChevronRight;
    }, get matStar() {
      return matStar;
    }, defineAsyncComponent, get loadPageConfig() {
      return loadPageConfig;
    }, get useCarouselKeyboard() {
      return useCarouselKeyboard;
    }, ProductCard };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "hero-section-sec" };
const _hoisted_2 = { class: "hero-section container hero-margin row" };
const _hoisted_3 = { class: "hero-content col-12 col-md-6 q-mb-lg" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = {
  ref: "productSection",
  class: "featured-products"
};
const _hoisted_6 = { class: "container" };
const _hoisted_7 = {
  key: 0,
  class: "q-carousel q-panel-parent q-carousel--without-padding q-carousel--navigation-bottom rounded-borders",
  style: { "height": "100%" }
};
const _hoisted_8 = { class: "q-carousel__slides-container" };
const _hoisted_9 = {
  class: "q-panel scroll",
  role: "tabpanel",
  style: { "--q-transition-duration": "300ms" }
};
const _hoisted_10 = { class: "q-carousel__slide" };
const _hoisted_11 = { class: "row justify-between" };
const _hoisted_12 = {
  key: 0,
  class: "q-card invisible-card"
};
const _hoisted_13 = {
  key: 1,
  class: "q-card my-card full-height"
};
const _hoisted_14 = ["src", "srcset", "sizes", "alt"];
const _hoisted_15 = { class: "q-card__section q-card__section--vert" };
const _hoisted_16 = ["innerHTML"];
const _hoisted_17 = { class: "q-card__actions justify-start q-card__actions--horiz row" };
const _hoisted_18 = { key: 0 };
const _hoisted_19 = {
  key: 1,
  class: "q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-secondary text-white q-btn--actionable",
  type: "button"
};
const _hoisted_20 = { class: "row justify-between" };
const _hoisted_21 = {
  key: 0,
  class: "q-card invisible-card"
};
const _hoisted_22 = { key: 1 };
const _hoisted_23 = { class: "cta-section" };
const _hoisted_24 = { class: "container" };
const _hoisted_25 = { class: "cta-overlay" };
const _hoisted_26 = { class: "cta-content" };
const _hoisted_27 = { class: "testimonials-section" };
const _hoisted_28 = { class: "container" };
const _hoisted_29 = { class: "row q-col-gutter-md" };
const _hoisted_30 = { class: "q-card q-pa-md" };
const _hoisted_31 = {
  itemscope: "",
  itemtype: "https://schema.org/Review"
};
const _hoisted_32 = {
  class: "text-subtitle1 q-mb-sm",
  itemprop: "author",
  itemscope: "",
  itemtype: "https://schema.org/Person"
};
const _hoisted_33 = { itemprop: "name" };
const _hoisted_34 = {
  itemprop: "reviewRating",
  itemscope: "",
  itemtype: "https://schema.org/Rating",
  class: "q-mb-sm"
};
const _hoisted_35 = ["content"];
const _hoisted_36 = {
  itemprop: "reviewBody",
  class: "text-body2"
};
const _hoisted_37 = { class: "container" };
const _hoisted_38 = { class: "row q-col-gutter-md" };
const _hoisted_39 = ["src", "alt"];
const _hoisted_40 = { class: "newsletter-section" };
const _hoisted_41 = { class: "container text-center" };
const _hoisted_42 = {
  key: 0,
  class: "q-field row no-wrap items-start q-field--filled q-input q-field--labeled subscribe-email-input q-mb-md",
  style: {}
};
const _hoisted_43 = {
  key: 2,
  class: "rounded q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-secondary text-white q-btn--actionable q-focusable q-hoverable",
  style: {},
  tabindex: "0",
  type: "button"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("section", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("h1", {
            class: "text-h1 text-secondary stable-text",
            innerHTML: $setup.homeSettings?.hero_title
          }, null, 8, _hoisted_4),
          _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-h6 text-secondary text-weight-light" }, " Ethically sourced botanical formulations designed to nurture your skin’s natural radiance with high-potency organic ingredients. ", -1)),
          _cache[13] || (_cache[13] = createBaseVNode("button", { class: "hero-btn q-btn" }, [
            createBaseVNode("span", {
              class: "q-focus-helper",
              tabindex: "-1"
            }),
            createTextVNode(" Browse Products ")
          ], -1))
        ]),
        _cache[14] || (_cache[14] = createBaseVNode("div", { class: "lcp-wrapper col-12 col-md-6" }, [
          createBaseVNode("img", {
            fetchpriority: "high",
            loading: "eager",
            decoding: "async",
            alt: "Homepage hero image",
            src: "https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png",
            srcset: "https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png 300w,https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover-768x512.png 768w,https://nuxt.meidanm.com/wp-content/uploads/2025/10/naturabloom-hero-cover.png 1024w",
            sizes: "(min-width: 768px) 50vw, calc(100vw - 40px)",
            width: "300",
            height: "200",
            class: "hero-img"
          })
        ], -1))
      ])
    ]),
    createBaseVNode("section", _hoisted_5, [
      createBaseVNode("div", _hoisted_6, [
        _cache[17] || (_cache[17] = createBaseVNode("h2", {
          class: "text-weight-normal q-mb-md",
          style: { "color": "#1D1C13", "font-size": "41px" }
        }, "Featured Products", -1)),
        !$setup.isHydrated && $setup.productsStore.products.value.length ? (openBlock(), createElementBlock("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createBaseVNode("div", _hoisted_11, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.visibleStaticItems, (product, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: product.id,
                      class: normalizeClass(["col-12 col-sm-6 col-md-4", { "gt-xs": index === 1, "gt-sm": index === 2 }])
                    }, [
                      product.__placeholder ? (openBlock(), createElementBlock("div", _hoisted_12)) : (openBlock(), createElementBlock("div", _hoisted_13, [
                        createBaseVNode("img", {
                          loading: "lazy",
                          width: "300",
                          height: "250",
                          src: product.images?.[0]?.src || "",
                          srcset: product.images?.[0]?.srcset || "",
                          sizes: product.images?.[0]?.sizes || "",
                          alt: product?.name || ""
                        }, null, 8, _hoisted_14),
                        createBaseVNode("div", _hoisted_15, [
                          createBaseVNode("div", null, toDisplayString(product?.name), 1),
                          createBaseVNode("div", {
                            class: "text-subtitle2",
                            innerHTML: product?.price_html
                          }, null, 8, _hoisted_16)
                        ]),
                        createBaseVNode("div", _hoisted_17, [
                          !product?.is_in_stock ? (openBlock(), createElementBlock("div", _hoisted_18, "Out of stock")) : (openBlock(), createElementBlock("button", _hoisted_19, [..._cache[15] || (_cache[15] = [
                            createBaseVNode("span", { class: "q-btn__content text-center col items-center justify-center row" }, [
                              createBaseVNode("span", { class: "block" }, "Add to Cart")
                            ], -1)
                          ])]))
                        ])
                      ]))
                    ], 2);
                  }), 128))
                ])
              ])
            ])
          ]),
          _cache[16] || (_cache[16] = createStaticVNode('<div class="q-carousel__control absolute absolute-left flex items-center" style="margin:18px;" data-v-02b236e3><button aria-label="Previous slide" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-primary q-btn--dense" type="button" data-v-02b236e3><span class="q-btn__content text-center col items-center justify-center row" data-v-02b236e3><i class="q-icon" data-v-02b236e3><svg viewBox="0 0 24 24" data-v-02b236e3><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" data-v-02b236e3></path></svg></i></span></button></div><div class="q-carousel__control absolute absolute-right flex items-center" style="margin:18px;" data-v-02b236e3><button aria-label="Next slide" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-primary q-btn--dense" type="button" data-v-02b236e3><span class="q-btn__content text-center col items-center justify-center row" data-v-02b236e3><i class="q-icon" data-v-02b236e3><svg viewBox="0 0 24 24" data-v-02b236e3><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" data-v-02b236e3></path></svg></i></span></button></div>', 2))
        ])) : (openBlock(), createBlock($setup["QCarousel"], {
          key: $setup.carouselKey,
          onTouchstart: _cache[2] || (_cache[2] = withModifiers(() => {
          }, ["stop"])),
          onMousedown: _cache[3] || (_cache[3] = withModifiers(() => {
          }, ["stop"])),
          modelValue: $setup.slide,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.slide = $event),
          animated: "",
          infinite: $setup.showCarouselControls,
          navigation: $setup.showCarouselControls,
          swipeable: "",
          arrows: false,
          height: "100%",
          "control-color": "primary",
          class: "rounded-borders",
          tabindex: "0",
          onKeydown: $setup.onKeydown_products
        }, createSlots({
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.slideChunks, (slideGroup, index) => {
              return openBlock(), createBlock($setup["QCarouselSlide"], {
                key: `slide-${index}-${$setup.slideChunks.length}-${slideGroup.map((p) => p.id).join("-")}`,
                name: index
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_20, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(slideGroup, (fp) => {
                      return openBlock(), createElementBlock("div", {
                        key: fp.id,
                        class: "col-12 col-sm-6 col-md-4 relative-position"
                      }, [
                        fp.__placeholder ? (openBlock(), createElementBlock("div", _hoisted_21)) : (openBlock(), createElementBlock("div", _hoisted_22, [
                          createVNode($setup["ProductCard"], { product: fp }, null, 8, ["product"])
                        ]))
                      ]);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1032, ["name"]);
            }), 128))
          ]),
          _: 2
        }, [
          $setup.showCarouselControls ? {
            name: "navigation-icon",
            fn: withCtx(({ name, onClick, btnProps }) => [
              createVNode(QBtn, mergeProps(btnProps, {
                flat: false,
                color: $setup.slide === name ? "secondary" : btnProps.color || "grey-5",
                size: "sm",
                icon: null,
                style: { "background": "var(--q-secondary)", "font-size": "5px", "padding": "0" },
                round: "",
                dense: "",
                "aria-label": `Go to slide ${name + 1}`,
                onClick
              }), null, 16, ["color", "aria-label", "onClick"])
            ]),
            key: "0"
          } : void 0,
          $setup.showCarouselControls ? {
            name: "control",
            fn: withCtx(() => [
              createVNode($setup["QCarouselControl"], {
                position: "left",
                class: "flex items-center"
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    icon: $setup.matChevronLeft,
                    "aria-label": "Previous slide",
                    flat: "",
                    round: "",
                    dense: "",
                    color: "secondary",
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.slide = (Number($setup.slide) - 1 + $setup.slideChunks.length) % $setup.slideChunks.length)
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }),
              createVNode($setup["QCarouselControl"], {
                position: "right",
                class: "flex items-center"
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    icon: $setup.matChevronRight,
                    "aria-label": "Next slide",
                    flat: "",
                    round: "",
                    dense: "",
                    color: "secondary",
                    onClick: _cache[1] || (_cache[1] = ($event) => $setup.slide = (Number($setup.slide) + 1) % $setup.slideChunks.length)
                  }, null, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["modelValue", "infinite", "navigation", "onKeydown"]))
      ])
    ], 512),
    createBaseVNode("section", _hoisted_23, [
      createBaseVNode("div", _hoisted_24, [
        createBaseVNode("div", _hoisted_25, [
          _cache[21] || (_cache[21] = createBaseVNode("div", { class: "cta-img" }, [
            createBaseVNode("img", {
              loading: "lazy",
              alt: "Forest view",
              src: "/cta-img.png",
              width: "728",
              height: "500"
            })
          ], -1)),
          createBaseVNode("div", _hoisted_26, [
            _cache[18] || (_cache[18] = createBaseVNode("span", { class: "text-white pre-title" }, "The Botanical Ethos", -1)),
            _cache[19] || (_cache[19] = createBaseVNode("h2", { class: "text-h4 text-white q-mb-md" }, "Grown with Care, Crafted with Soul.", -1)),
            _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-white desc" }, "Our journey began in a small glasshouse, driven by the desire to merge ancient herbal wisdom with modern dermatological science. Every ingredient is ethically harvested at its peak potency.", -1)),
            createVNode(QBtn, {
              ref: "ctaBtn",
              label: "Explore Our Roots",
              color: "primary",
              "text-color": "secondary",
              rounded: true,
              size: "lg",
              to: "/products"
            }, null, 512)
          ])
        ])
      ])
    ]),
    createBaseVNode("section", _hoisted_27, [
      createBaseVNode("div", _hoisted_28, [
        _cache[23] || (_cache[23] = createBaseVNode("h2", { class: "text-h4 text-weight-light text-center q-mb-lg" }, " What Our Customers Say ", -1)),
        $setup.isHydrated ? (openBlock(), createBlock($setup["QCarousel"], {
          tabindex: "0",
          key: $setup.testimonialCarouselKey,
          modelValue: $setup.testimonialsSlide,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.testimonialsSlide = $event),
          onTouchstart: _cache[8] || (_cache[8] = withModifiers(() => {
          }, ["stop"])),
          onMousedown: _cache[9] || (_cache[9] = withModifiers(() => {
          }, ["stop"])),
          animated: "",
          infinite: $setup.showTestimonialCarouselControls,
          navigation: $setup.showTestimonialCarouselControls,
          swipeable: "",
          arrows: false,
          height: "auto",
          onKeydown: $setup.onKeydown_testimonials
        }, createSlots({
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.testimonialSlideChunks, (group, slideIndex) => {
              return openBlock(), createBlock($setup["QCarouselSlide"], {
                key: slideIndex,
                name: slideIndex
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_29, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group, (testimonial, index) => {
                      return openBlock(), createElementBlock("div", {
                        class: "col-12 col-md-4",
                        key: index
                      }, [
                        createBaseVNode("div", _hoisted_30, [
                          createBaseVNode("article", _hoisted_31, [
                            createBaseVNode("h3", _hoisted_32, [
                              createBaseVNode("span", _hoisted_33, toDisplayString(testimonial.name), 1)
                            ]),
                            createBaseVNode("div", _hoisted_34, [
                              createBaseVNode("meta", {
                                itemprop: "ratingValue",
                                content: testimonial.rating
                              }, null, 8, _hoisted_35),
                              _cache[22] || (_cache[22] = createBaseVNode("meta", {
                                itemprop: "bestRating",
                                content: "5"
                              }, null, -1)),
                              createVNode(QRating, {
                                "model-value": testimonial.rating ?? 0,
                                size: "20px",
                                color: "amber",
                                icon: $setup.matStar,
                                readonly: ""
                              }, null, 8, ["model-value", "icon"])
                            ]),
                            createBaseVNode("p", _hoisted_36, toDisplayString(testimonial.feedback), 1)
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1032, ["name"]);
            }), 128))
          ]),
          _: 2
        }, [
          $setup.showTestimonialCarouselControls ? {
            name: "navigation-icon",
            fn: withCtx(({ name, onClick, btnProps }) => [
              createVNode(QBtn, mergeProps(btnProps, {
                flat: false,
                color: $setup.testimonialsSlide === name ? "secondary" : "primary",
                size: "sm",
                icon: null,
                style: { "background": "var(--q-secondary)", "font-size": "5px", "padding": "0" },
                round: "",
                dense: "",
                "aria-label": `Go to slide ${name + 1}`,
                onClick
              }), null, 16, ["color", "aria-label", "onClick"])
            ]),
            key: "0"
          } : void 0,
          $setup.showTestimonialCarouselControls ? {
            name: "control",
            fn: withCtx(() => [
              createVNode($setup["QCarouselControl"], {
                position: "left",
                class: "flex items-center"
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    icon: $setup.matChevronLeft,
                    "aria-label": "Previous slide",
                    flat: "",
                    round: "",
                    dense: "",
                    color: "secondary",
                    onClick: _cache[5] || (_cache[5] = ($event) => $setup.testimonialsSlide = (Number($setup.testimonialsSlide) - 1 + $setup.testimonialSlideChunks.length) % $setup.testimonialSlideChunks.length)
                  }, null, 8, ["icon"])
                ]),
                _: 1
              }),
              createVNode($setup["QCarouselControl"], {
                position: "right",
                class: "flex items-center"
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    icon: $setup.matChevronRight,
                    "aria-label": "Next slide",
                    flat: "",
                    round: "",
                    dense: "",
                    color: "secondary",
                    onClick: _cache[6] || (_cache[6] = ($event) => $setup.testimonialsSlide = (Number($setup.testimonialsSlide) + 1) % $setup.testimonialSlideChunks.length)
                  }, null, 8, ["icon"])
                ]),
                _: 1
              })
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["modelValue", "infinite", "navigation", "onKeydown"])) : createCommentVNode("", true)
      ])
    ]),
    _cache[10] || (setBlockTracking(-1, true), (_cache[10] = createBaseVNode("section", { class: "instagram-section" }, [
      createBaseVNode("div", _hoisted_37, [
        _cache[24] || (_cache[24] = createBaseVNode("h2", { class: "text-h4 text-weight-light text-center q-mb-lg" }, "Follow Us on Instagram", -1)),
        createBaseVNode("div", _hoisted_38, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.instagramPosts, (post, index) => {
            return openBlock(), createElementBlock("div", {
              class: "col-6 col-md-3",
              key: index
            }, [
              createBaseVNode("img", {
                width: "200",
                height: "200",
                src: post.image,
                alt: post.caption,
                class: "rounded-borders full-width"
              }, null, 8, _hoisted_39)
            ]);
          }), 128))
        ])
      ])
    ])).cacheIndex = 10, setBlockTracking(1), _cache[10]),
    createBaseVNode("section", _hoisted_40, [
      createBaseVNode("div", _hoisted_41, [
        _cache[27] || (_cache[27] = createBaseVNode("h2", { class: "text-h4 text-weight-light q-mb-md" }, "Join the Garden", -1)),
        _cache[28] || (_cache[28] = createBaseVNode("p", { class: "text-body1 q-mb-lg" }, "Receive our monthly Journal on botanical wellness, plus 15% off your first ritual.", -1)),
        !$setup.isHydrated ? (openBlock(), createElementBlock("label", _hoisted_42, [..._cache[25] || (_cache[25] = [
          createStaticVNode('<div class="q-field__inner relative-position col self-stretch" data-v-02b236e3><div class="q-field__control relative-position row no-wrap" tabindex="-1" data-v-02b236e3><div class="q-field__control-container col relative-position row no-wrap q-anchor--skip" data-v-02b236e3><input class="q-field__native q-placeholder" style="" tabindex="0" aria-label="Your Email" type="text" value="" data-v-02b236e3><div class="q-field__label no-pointer-events absolute ellipsis" data-v-02b236e3>Your Email</div></div></div></div>', 1)
        ])])) : (openBlock(), createBlock($setup["QInput"], {
          key: 1,
          filled: "",
          modelValue: $setup.email,
          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.email = $event),
          label: "Your email address",
          class: "subscribe-email-input q-mb-md"
        }, null, 8, ["modelValue"])),
        !$setup.isHydrated ? (openBlock(), createElementBlock("button", _hoisted_43, [..._cache[26] || (_cache[26] = [
          createBaseVNode("span", {
            class: "q-focus-helper",
            tabindex: "-1"
          }, null, -1),
          createBaseVNode("span", { class: "q-btn__content text-center col items-center q-anchor--skip justify-center row" }, [
            createBaseVNode("span", { class: "block" }, "Subscribe")
          ], -1)
        ])])) : (openBlock(), createBlock(QBtn, {
          key: 3,
          rounded: true,
          label: "Subscribe",
          color: "secondary",
          "text-color": "primary",
          onClick: $setup.subscribeNewsletter
        }))
      ])
    ])
  ]);
}
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-02b236e3"], ["__file", "IndexPage.vue"]]);
export {
  IndexPage as default
};


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBWUEsZ0JBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBRUgsWUFBWTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ2hCO0FBQUEsSUFFSSxLQUFLO0FBQUEsTUFDSCxNQUFNLENBQUUsUUFBUSxNQUFNO0FBQUEsTUFDdEIsU0FBUztBQUFBLElBQ2Y7QUFBQSxJQUVJLE1BQU0sQ0FBRSxRQUFRLEtBQUs7QUFBQSxJQUNyQixVQUFVLENBQUUsUUFBUSxLQUFLO0FBQUEsSUFDekIsY0FBYyxDQUFFLFFBQVEsS0FBSztBQUFBLElBRTdCLGVBQWUsQ0FBRSxRQUFRLEtBQUs7QUFBQSxJQUU5QixPQUFPLENBQUUsUUFBUSxLQUFLO0FBQUEsSUFDdEIsV0FBVyxDQUFFLFFBQVEsS0FBSztBQUFBLElBQzFCLGVBQWUsQ0FBRSxRQUFRLEtBQUs7QUFBQSxJQUU5QixTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFFWCxVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsRUFDYjtBQUFBLEVBRUUsT0FBTyxDQUFFLG1CQUFtQjtBQUFBLEVBRTVCLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBRSxFQUFFLElBQUssbUJBQWtCO0FBRTVDLFVBQU0sWUFBWSxRQUFRLEtBQUs7QUFDL0IsVUFBTSxZQUFZLGFBQWEsS0FBSztBQUNwQyxVQUFNLGtCQUFrQixjQUFjLFNBQVM7QUFFL0MsVUFBTSxhQUFhLElBQUksQ0FBQztBQUV4QixRQUFJLFdBQVc7QUFFZixVQUFNLFdBQVc7QUFBQSxNQUFTLE1BQ3hCLE1BQU0sYUFBYSxRQUFRLE1BQU0sWUFBWTtBQUFBLElBQ25EO0FBRUksVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2Qiw4Q0FDaUIsU0FBUyxVQUFVLE9BQU8sS0FBSyxvQkFDN0MsTUFBTSxjQUFjLE9BQU8sMEJBQTBCLE9BQ3JELE1BQU0sWUFBWSxPQUFPLGNBQWMsT0FFeEMsTUFBTSxVQUFVLFVBQVUsTUFBTSxRQUFRLE1BQU0sS0FBSyxNQUFNLFFBQ3JELFNBQVUsTUFBTSxLQUFLLEtBQ3JCO0FBQUEsSUFFWjtBQUVJLFVBQU0sV0FBVyxTQUFTLE1BQU07QUFDOUIsWUFDRSxVQUFVLE1BQU0sUUFBUSxNQUFNLElBQUksTUFBTSxPQUFPLE1BQU0sS0FBSyxTQUFTLEdBQ25FLGFBQWEsTUFBTSxRQUFRLE1BQU0sWUFBWSxNQUFNLE9BQU8sTUFBTSxhQUFhLFNBQVMsR0FDdEYsY0FBYyxNQUFNLFFBQVEsTUFBTSxRQUFRLE1BQU0sT0FBTyxNQUFNLFNBQVMsU0FBUyxHQUMvRSxXQUFXLE1BQU0sUUFBUSxNQUFNLEtBQUssTUFBTSxPQUFPLE1BQU0sTUFBTSxTQUFTLEdBQ3RFLGNBQWMsTUFBTSxRQUFRLE1BQU0sYUFBYSxNQUFNLE9BQU8sTUFBTSxjQUFjLFNBQVMsR0FDekYsZUFBZSxNQUFNLFFBQVEsTUFBTSxTQUFTLE1BQU0sT0FBTyxNQUFNLFVBQVUsU0FBUztBQUVwRixhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsTUFBTSxVQUFVLElBQUksTUFBTSxLQUFNLFVBQVUsS0FBTSxNQUFNO0FBQUEsUUFDdEQ7QUFBQSxRQUNBLFNBQVMsYUFBYSxJQUFJLE1BQU0sYUFBYyxhQUFhLEtBQU0sTUFBTTtBQUFBLFFBQ3ZFO0FBQUEsUUFDQSxVQUFVLGNBQWMsSUFBSSxNQUFNLFNBQVUsYUFBYSxLQUFNLE1BQU07QUFBQSxRQUNyRTtBQUFBLFFBQ0EsT0FBTyxXQUFXLElBQUksTUFBTSxNQUFPLFdBQVcsS0FBTSxNQUFNO0FBQUEsUUFDMUQ7QUFBQSxRQUNBLFVBQVUsY0FBYyxJQUFJLE1BQU0sY0FBZSxjQUFjLEtBQU0sTUFBTTtBQUFBLFFBQzNFO0FBQUEsUUFDQSxXQUFXLGVBQWUsSUFBSSxNQUFNLFVBQVcsZUFBZSxDQUFDLElBQUssTUFBTTtBQUFBLE1BQ2xGO0FBQUEsSUFDSSxDQUFDO0FBRUQsVUFBTSxZQUFZLFNBQVMsTUFBTTtBQUMvQixVQUFJLE9BQU8sTUFBTSxrQkFBa0IsVUFBVTtBQUMzQyxjQUFNLFFBQVEsTUFBTSxjQUFjLFdBQVcsSUFBSSxHQUFJLE1BQU0sYUFBYSxNQUFPO0FBQy9FLGVBQU8sT0FBSyxHQUFJLEtBQUssR0FBSyxDQUFDO0FBQUEsTUFDN0I7QUFFQSxVQUFJLE1BQU0sUUFBUSxNQUFNLGFBQWEsTUFBTSxNQUFNO0FBQy9DLGNBQU0sT0FBTyxNQUFNLGNBQWM7QUFFakMsWUFBSSxPQUFPLEdBQUc7QUFDWixpQkFBTyxPQUFLLE1BQU0sY0FBZSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQztBQUFBLFFBQ3hEO0FBQUEsTUFDRjtBQUVBLGFBQU8sQ0FBQyxHQUFHLFVBQVUsR0FBSSxLQUFLLElBQU0sQ0FBQztBQUFBLElBQ3ZDLENBQUM7QUFFRCxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFlBQ0UsTUFBTSxJQUNOLFFBQVEsU0FBUyxPQUNqQixPQUFPLEtBQUssS0FBSyxNQUFNLFVBQVUsR0FDakMsV0FBVyxTQUFTLFVBQVUsT0FBTyxJQUFJO0FBRTNDLFlBQU0sWUFBWSxNQUFNLGFBQWEsVUFBVSxTQUFTLE1BQU0sYUFDMUQsS0FDQTtBQUVKLGVBQVMsSUFBSSxHQUFHLEtBQUssTUFBTSxLQUFLLEtBQUs7QUFDbkMsY0FDRSxTQUFVLFdBQVcsVUFBVSxLQUFLLE1BQU0sY0FBYyxLQUFPLFdBQVcsUUFBUSxLQUFLLFdBQVcsU0FBUyxHQUMzRyxPQUFPLGNBQWMsS0FBSyxXQUFXLFFBQVEsR0FDN0MsYUFBYSxXQUFXLFFBQVEsTUFBTSxTQUFTLE9BQU8sT0FBTyxNQUFNLGVBQWUsS0FBSyxXQUFXLFFBQVEsR0FDMUcsUUFBUSxTQUFTLE9BQ1osS0FBSyxNQUFNLGVBQWUsTUFBTSxVQUFXLElBQUksS0FBTSxNQUFNLFlBRTFELE1BQU0sYUFBYSxVQUFVLFdBQVcsT0FDbkMsS0FBSyxNQUFNLGNBQWMsTUFBTSxjQUFlLElBQUksS0FBTSxNQUFNLFdBQzlELEtBQUssTUFBTSxXQUFXLE1BQU0sTUFBTyxJQUFJLEtBQU0sTUFBTSxPQUU5RCxRQUNFLFNBQVMsT0FDSixLQUFLLE1BQU0sY0FBYyxNQUFNLFNBQVUsSUFBSSxLQUFNLE1BQU0sV0FFeEQsTUFBTSxZQUFZLFdBQVcsV0FBVyxRQUFRLGVBQWUsUUFDMUQsS0FBSyxNQUFNLGFBQWEsTUFBTSxhQUFjLElBQUksS0FBTSxNQUFNLFVBQzVELEtBQUssTUFBTSxVQUFVLE1BQU0sS0FBTSxJQUFJLEtBQU0sTUFBTSxTQUV6RCxHQUFHLFFBQVEsT0FBTztBQUV6QixZQUFJLEtBQUs7QUFBQSxVQUNQLE9BQ0UsU0FBUyxPQUNKLEtBQUssTUFBTSxjQUFjLE1BQU0sU0FBVSxJQUFJLEtBQU0sTUFBTSxXQUV4RCxNQUFNLFlBQVksV0FBVyxXQUFXLFFBQVEsZUFBZSxRQUMxRCxLQUFLLE1BQU0sYUFBYSxNQUFNLGFBQWMsSUFBSSxLQUFNLE1BQU0sVUFDNUQsS0FBSyxNQUFNLFVBQVUsTUFBTSxLQUFNLElBQUksS0FBTSxNQUFNLFNBRXpELEdBQUcsUUFBUSxPQUFPO0FBQUEsVUFFdkIsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBLE1BQU07QUFBQSxZQUNOLGdCQUFnQixNQUFNLGVBQWUsSUFBSSxTQUFTO0FBQUEsWUFDbEQsY0FBYyxVQUFVLE1BQU0sR0FBRyxJQUFJO0FBQUEsVUFDakQ7QUFBQSxVQUVVLFdBQVcsb0JBQ04sV0FBVyxRQUFRLFNBQVMsT0FBTyw0QkFBNEIsT0FDL0QsZUFBZSxPQUFPLGdDQUFnQyxPQUN0RCxXQUFXLFVBQVUsSUFBSSw2QkFBNkIsT0FDdEQsVUFBVSxTQUFTLFNBQVUsS0FBSyxLQUFNO0FBQUEsUUFDdkQsQ0FBUztBQUFBLE1BQ0g7QUFFQSxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBRUQsVUFBTSxhQUFhLFNBQVMsTUFBTTtBQUNoQyxZQUFNLFFBQVEsRUFBRSxNQUFNLGFBQVk7QUFFbEMsVUFBSSxNQUFNLFlBQVksTUFBTTtBQUMxQixjQUFPLGVBQWUsSUFBSztBQUFBLE1BQzdCO0FBQ0EsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixjQUFPLGVBQWUsSUFBSztBQUFBLE1BQzdCO0FBRUEsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUVELGFBQVMsSUFBSyxPQUFPO0FBQ25CLFVBQUksU0FBUyxVQUFVLE1BQU07QUFDM0IsY0FDRSxRQUFRLFFBQVEsU0FBUyxPQUFPLEVBQUUsR0FBRyxHQUFHLFNBQVMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxHQUMvRCxTQUFTLE1BQU0sWUFBWSxRQUFRLE1BQU0sZUFBZSxRQUFRLElBQUk7QUFFdEUsbUJBQVcsTUFBTSxjQUFjLEtBQUsscUJBQXFCLE1BQU07QUFDL0QsbUJBQVcsUUFBUTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUVBLGFBQVMsY0FBZSxPQUFPO0FBQzdCLFVBQUksU0FBUyxVQUFVLE1BQU07QUFDM0IsbUJBQVcsUUFBUTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUVBLGFBQVMsUUFBUyxHQUFHLEdBQUc7QUFDdEIsY0FBUSxFQUFFLFNBQU87QUFBQSxRQUNmLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFDSCxjQUFJLENBQUM7QUFDTCxpQkFBTyxlQUFlLENBQUM7QUFBQSxRQUN6QixLQUFLO0FBQUE7QUFBQSxRQUNMLEtBQUs7QUFDSCxjQUFJLFNBQVUsS0FBTSxJQUFJLENBQUMsRUFBRyxHQUFJO0FBQzlCLHFCQUFVLEtBQU0sSUFBSSxDQUFDLEVBQUcsRUFBRyxNQUFLO0FBQUEsVUFDbEM7QUFDQSxpQkFBTyxlQUFlLENBQUM7QUFBQSxRQUN6QixLQUFLO0FBQUE7QUFBQSxRQUNMLEtBQUs7QUFDSCxjQUFJLFNBQVUsS0FBTSxJQUFJLENBQUMsRUFBRyxHQUFJO0FBQzlCLHFCQUFVLEtBQU0sSUFBSSxDQUFDLEVBQUcsRUFBRyxNQUFLO0FBQUEsVUFDbEM7QUFDQSxpQkFBTyxlQUFlLENBQUM7QUFBQSxNQUNqQztBQUFBLElBQ0k7QUFFQSxhQUFTLGtCQUFtQjtBQUMxQixpQkFBVyxRQUFRO0FBQUEsSUFDckI7QUFFQSxtQkFBZSxNQUFNO0FBQ25CLGlCQUFXO0FBQUEsSUFDYixDQUFDO0FBRUQsV0FBTyxNQUFNO0FBQ1gsWUFBTSxRQUFRO0FBRWQsWUFBTSxNQUFNLFFBQVEsQ0FBQyxFQUFFLFdBQVcsTUFBTSxNQUFLLEdBQUksVUFBVTtBQUN6RCxjQUFNLElBQUksUUFBUTtBQUVsQixjQUFNO0FBQUEsVUFDSixFQUFFLE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLEtBQUssUUFBTTtBQUFFLHVCQUFVLEtBQU0sQ0FBQyxNQUFRO0FBQUEsWUFBRztBQUFBLFlBQ3pDLE9BQU87QUFBQSxZQUNQLEdBQUc7QUFBQSxZQUNILFVBQVc7QUFBRSxrQkFBSSxDQUFDO0FBQUEsWUFBRTtBQUFBLFlBQ3BCLGNBQWU7QUFBRSw0QkFBYyxDQUFDO0FBQUEsWUFBRTtBQUFBLFlBQ2xDLFlBQVk7QUFBQSxZQUNaLFVBQVc7QUFBRSw0QkFBYyxDQUFDO0FBQUEsWUFBRTtBQUFBLFlBQzlCLFFBQVE7QUFBQSxZQUNSLFFBQVMsR0FBRztBQUFFLHNCQUFRLEdBQUcsQ0FBQztBQUFBLFlBQUU7QUFBQSxVQUN4QyxHQUFhO0FBQUEsWUFDRCxNQUFPLE9BQVEsQ0FBQyxFQUFHO0FBQUEsWUFDbkIsQ0FBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLFdBQVcsS0FBSSxDQUFFLENBQUM7QUFBQSxVQUNsRCxDQUFXO0FBQUEsUUFDWDtBQUFBLE1BQ00sQ0FBQztBQUVELFVBQUksTUFBTSxTQUFTLFVBQVUsTUFBTSxZQUFZLE1BQU07QUFDbkQsd0JBQWdCLE9BQU8sTUFBTTtBQUFBLE1BQy9CO0FBRUEsYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsUUFDakIsR0FBRyxXQUFXO0FBQUEsTUFDdEIsR0FBUyxLQUFLO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FDbFJELGVBQXNCLGVBQWUsTUFBTSxXQUFXO0FBcUMvQztBQUNILFFBQUk7QUFDRixZQUFNLE1BQU0sWUFDUiw0REFBNEQsSUFBSSxLQUNoRSxXQUFXLElBQUk7QUFFbkIsWUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLO0FBQUEsUUFDaEMsT0FBTztBQUFBLE9BQ1I7QUFDRCxVQUFJLENBQUMsU0FBUyxHQUFJLFFBQU87QUFDekIsYUFBTyxNQUFNLFNBQVM7QUFBQSxJQUN4QixTQUFTLEtBQUs7QUFDWixjQUFRLE1BQU0sa0NBQWtDLEdBQUc7QUFDbkQsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0Y7QUNyRE8sU0FBUyxvQkFBb0IsVUFBVSxnQkFBZ0I7QUFDNUQsV0FBUyxVQUFVLEdBQUc7QUFDcEIsWUFBUSxFQUFFLEtBQUc7QUFBQSxNQUNYLEtBQUs7QUFDSCxpQkFBUyxTQUNOLFNBQVMsUUFBUSxLQUFLLGVBQWU7QUFDeEM7QUFBQSxNQUVGLEtBQUs7QUFDSCxpQkFBUyxTQUNOLFNBQVMsUUFBUSxJQUFJLGVBQWUsU0FBUyxlQUFlO0FBQy9EO0FBQUEsTUFFRixLQUFLO0FBQ0gsaUJBQVMsUUFBUTtBQUNqQjtBQUFBLE1BRUYsS0FBSztBQUNILGlCQUFTLFFBQVEsZUFBZSxRQUFRO0FBQ3hDO0FBQUEsSUFDUjtBQUFBLEVBQ0U7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDc1dBLFVBQU0sWUFBWSxxQkFBcUIsMEJBQU0sT0FBTyw2QkFBUSw0REFBRSxLQUFLLE9BQUssRUFBRSxTQUFTLENBQUM7QUFDcEYsVUFBTSxpQkFBaUIscUJBQXFCLDBCQUFNLE9BQU8sNkJBQVEsNERBQUUsS0FBSyxPQUFLLEVBQUUsY0FBYyxDQUFDO0FBQzlGLFVBQU0sbUJBQW1CLHFCQUFxQiwwQkFBTSxPQUFPLDZCQUFRLDREQUFFLEtBQUssT0FBSyxFQUFFLGdCQUFnQixDQUFDO0FBQ2xHLFVBQU0sU0FBUyxxQkFBcUIsMEJBQU0sT0FBTyw2QkFBUSw0REFBRSxLQUFLLE9BQUssRUFBRSxNQUFNLENBQUM7QUFFOUUsVUFBTSxhQUFhLElBQUksS0FBSztBQUM1QixVQUFNLEtBQUs7QUFHWCxRQUEwQixPQUFPLDBCQUEwQixNQUFNLFFBQVEsT0FBTyxzQkFBc0IsR0FBRztBQUN2RyxvQkFBYyxTQUFTLFFBQVEsT0FBTztBQUFBLElBQ3hDO0FBRUEsVUFBTSxRQUFRO0FBRWQsVUFBTSxtQkFBbUIsTUFBTTtBQUFBLElBQUM7QUFDaEMsYUFBYSxFQUFFLGtCQUFrQjtBQThDakMsVUFBTSxlQUFlLElBQUksSUFBSTtBQUM3QixVQUFNLFVBQVUsSUFBSSxJQUFJO0FBR3hCLFlBQVEsTUFBTTtBQUNaLFlBQU0sTUFBTSxRQUFRO0FBSXBCLFVBQUksQ0FBQyxLQUFLO0FBQ1IsZUFBTztBQUFBLE1BQ1Q7QUFJQSxhQUFPO0FBQUEsUUFDTCxPQUFPLElBQUk7QUFBQSxRQUNYLE1BQU07QUFBQSxVQUNKLFFBQVEsRUFBRSxNQUFNLFVBQVUsU0FBUyxJQUFJLFFBQVEsS0FBSztBQUFBLFVBQ3BELGFBQWEsRUFBRSxNQUFNLGVBQWUsU0FBUyxJQUFJLGFBQWEsS0FBSztBQUFBLFVBQ25FLFlBQVksRUFBRSxVQUFVLFlBQVksU0FBUyxJQUFJO0FBQUEsVUFDakQsWUFBWSxFQUFFLFVBQVUsWUFBWSxTQUFTLElBQUk7QUFBQSxRQUFTO0FBQUEsTUFDNUQ7QUFBQSxJQUVKLENBQUM7QUF5QkQsVUFBTSxxQkFBcUIsU0FBUyxNQUFNO0FBQ3hDLFlBQU0sTUFBTSxhQUFhLE9BQU8scUJBQXFCO0FBQ3JELFVBQUksUUFBUTtBQUVaLFVBQUksT0FBTyxJQUFJLFFBQVE7QUFFckIsZ0JBQVEsSUFBSSxJQUFJLFFBQU07QUFDcEIsaUJBQU8sY0FBYyxTQUFTLE1BQU0sS0FBSyxPQUFLLE9BQU8sRUFBRSxFQUFFLE1BQU0sT0FBTyxFQUFFLENBQUM7QUFBQSxRQUMzRSxDQUFDLEVBQUUsT0FBTyxPQUFPO0FBQUEsTUFDbkI7QUFHQSxVQUFJLENBQUMsTUFBTSxRQUFRO0FBQ2pCLGlCQUFTLGNBQWMsU0FBUyxTQUFTLElBQUksTUFBTSxHQUFHLENBQUM7QUFBQSxNQUN6RDtBQUdBLFlBQU0sU0FBUyxNQUFNLE1BQU0sR0FBRyxDQUFDO0FBRy9CLGFBQU8sT0FBTyxTQUFTLEdBQUc7QUFDeEIsZUFBTyxLQUFLLEVBQUUsZUFBZSxNQUFNLElBQUksZUFBZSxPQUFPLE1BQU0sSUFBSTtBQUFBLE1BQ3pFO0FBRUEsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sV0FBVztBQUVqQixVQUFNLGNBQWMsSUFBSSxFQUFFO0FBQzFCLFVBQU0seUJBQXlCLElBQUksRUFBRTtBQUNyQyxVQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ25CLFVBQU0sY0FBYyxJQUFJLENBQUM7QUFDekIsVUFBTSx5QkFBeUIsSUFBSSxDQUFDO0FBQ3BDLFVBQU0saUJBQWlCLElBQUksSUFBSTtBQUMvQixVQUFNLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFVBQU0sUUFBUSxJQUFJLEVBQUU7QUFHcEIsVUFBTSxZQUFZLENBQUMsT0FBTyxTQUFTO0FBQ2pDLFVBQUksQ0FBQyxNQUFNLFFBQVEsS0FBSyxLQUFLLENBQUMsTUFBTSxPQUFRLFFBQU87QUFDbkQsWUFBTSxTQUFTO0FBQ2YsZUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSyxLQUFNLFFBQU8sS0FBSyxNQUFNLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQztBQUNqRixhQUFPO0FBQUEsSUFDVDtBQUdBLFVBQU0sa0JBQWtCLE9BQU8sZUFBZSxVQUFVO0FBQ3RELFVBQUksQ0FBQyxXQUFXLE1BQU87QUFFdkIsVUFBSSxDQUFDLGNBQWMsU0FBUyxNQUFNLFFBQVE7QUFDeEMsY0FBTSxjQUFjLGlCQUFpQixJQUFJLElBQUk7QUFBQSxNQUMvQztBQUVBLFlBQU0sTUFBTSxhQUFhLE9BQU8scUJBQXFCO0FBQ3JELFlBQU0sY0FBYyxNQUFNLGNBQWMsU0FBUyxHQUFHLEtBQUs7QUFFekQsVUFBSSxRQUFRLElBQUksU0FDZCxJQUFJLElBQUksUUFBTSxZQUFZLEtBQUssT0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsT0FBTyxPQUFPLElBQy9ELFlBQVksTUFBTSxHQUFHLENBQUM7QUFFeEIsWUFBTSxZQUFZLEdBQUcsT0FBTyxHQUFHLEtBQUssSUFBSSxHQUFHLE9BQU8sR0FBRyxLQUFLLElBQUk7QUFFOUQsVUFBRyxjQUFjLEdBQUc7QUFFbEIsZUFBTyxNQUFNLFNBQVMsR0FBRztBQUN2QixnQkFBTSxLQUFLLEVBQUMsZUFBZSxNQUFNLElBQUksZUFBZSxNQUFNLE1BQU0sSUFBRztBQUFBLFFBQ3JFO0FBQUEsTUFDRjtBQUNBLFVBQUksYUFBYyxhQUFZO0FBRTlCLGtCQUFZLFFBQVEsVUFBVSxPQUFPLFNBQVM7QUFBQSxJQUNoRDtBQUNBLFVBQU0sdUJBQXVCLFNBQVMsTUFBTTtBQUMxQyxhQUFPLFlBQVksTUFBTSxTQUFTO0FBQUEsSUFDcEMsQ0FBQztBQUVELFVBQU0scUJBQXFCLFNBQVMsTUFBTSxZQUFZLE1BQU0sTUFBTTtBQUVsRSxVQUFNLEVBQUUsV0FBVyx1QkFBdUI7QUFBQSxNQUN4QztBQUFBLE1BQ0E7QUFBQTtBQU1GLFVBQU0sZUFBZSxJQUFJO0FBQUEsTUFDdkIsRUFBRSxNQUFNLGlCQUFpQixVQUFVO0FBQUEsTUFDbkMsRUFBRSxNQUFNLGlCQUFpQixVQUFVO0FBQUEsTUFDbkMsRUFBRSxNQUFNLGNBQWMsVUFBVTtBQUFBLE1BQ2hDLEVBQUUsTUFBTSxZQUFZLFVBQVU7QUFBQSxNQUM5QixFQUFFLE1BQU0sY0FBYyxVQUFVO0FBQUEsSUFBa0IsQ0FDbkQ7QUFFRCxVQUFNLG9CQUFvQixJQUFJLENBQUM7QUFFL0IsVUFBTSw2QkFBNkIsT0FBTyxlQUFlLFVBQVU7QUFDakUsVUFBSSxDQUFDLFdBQVcsTUFBTztBQUV2QixVQUFJLENBQUMsYUFBYSxNQUFNLFFBQVE7QUFDOUI7QUFBQSxNQUNGO0FBRUEsWUFBTSxZQUFZLEdBQUcsT0FBTyxHQUFHLEtBQUssSUFBSSxHQUFHLE9BQU8sR0FBRyxLQUFLLElBQUk7QUFFOUQsVUFBSSxhQUFjLHdCQUF1QjtBQUV6Qyw2QkFBdUIsUUFBUSxVQUFVLGFBQWEsT0FBTyxTQUFTO0FBQUEsSUFDeEU7QUFFQSxVQUFNLGtDQUFrQyxTQUFTLE1BQU07QUFDckQsYUFBTyx1QkFBdUIsTUFBTSxTQUFTO0FBQUEsSUFDL0MsQ0FBQztBQUVELFVBQU0seUJBQXlCLFNBQVMsTUFBTSx1QkFBdUIsTUFBTSxNQUFNO0FBRWpGLFVBQU0sRUFBRSxXQUFXLDJCQUEyQjtBQUFBLE1BQzVDO0FBQUEsTUFDQTtBQUFBO0FBR0YsVUFBTSxpQkFBaUIsSUFBSTtBQUFBLE1BQ3pCLEVBQUUsT0FBTyxHQUFHLFFBQVEsd0RBQXdELFNBQVM7QUFBQSxNQUNyRixFQUFFLE9BQU8sR0FBRyxRQUFRLHdEQUF3RCxTQUFTO0FBQUEsTUFDckYsRUFBRSxPQUFPLEdBQUcsUUFBUSx3REFBd0QsU0FBUztBQUFBLE1BQ3JGLEVBQUUsT0FBTyxHQUFHLFFBQVEsd0RBQXdELFNBQVM7QUFBQSxJQUFtQyxDQUN6SDtBQUlELFVBQU0sc0JBQXNCLE1BQU07QUFDaEMsVUFBSSxNQUFNLE9BQU87QUFDZixXQUFHLE9BQU8sRUFBRSxNQUFNLFlBQVksU0FBUyw0QkFBNEI7QUFDbkUsY0FBTSxRQUFRO0FBQUEsTUFDaEIsT0FBTztBQUNMLFdBQUcsT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLCtCQUErQjtBQUFBLE1BQ3hFO0FBQUEsSUFDRjtBQUdBLGNBQVUsWUFBVztBQUNqQixVQUFJLE9BQU8sbUJBQW1CLE9BQU8sS0FBSyxPQUFPLGVBQWUsRUFBRSxRQUFRO0FBQ3hFLHFCQUFhLFFBQVEsT0FBTztBQUFBLE1BQzlCLE9BQU87QUFDTCxjQUFNLFlBQVksTUFBTSxNQUFNLFlBQVk7QUFFMUMsY0FBTSxjQUFjLE1BQU0sZUFBZSxRQUFRLFNBQVM7QUFDMUQsWUFBSSwwQkFBMEIsUUFBUTtBQUFBLE1BQ3hDO0FBRUosaUJBQVcsUUFBUTtBQUVPO0FBVXRCLGNBQU0sdUJBQXVCLE1BQU07QUFDakMsY0FBSSxXQUFXLE1BQU87QUFFdEIsOEJBQW9CLE1BQU07QUFHeEIsbUJBQU8sb0JBQW9CLFVBQVUsb0JBQW9CO0FBQ3pELG1CQUFPLG9CQUFvQixhQUFhLG9CQUFvQjtBQUM1RCxtQkFBTyxvQkFBb0IsY0FBYyxvQkFBb0I7QUFDN0Qsa0NBQXNCLE1BQU07QUFDMUIseUJBQVcsUUFBUTtBQUFBLFlBQ3JCLENBQUM7QUFFRDtBQUNBO0FBQUEsVUFFRixDQUFDO0FBQUEsUUFDSDtBQUVBLGVBQU8saUJBQWlCLFVBQVUsc0JBQXNCLEVBQUMsU0FBUyxNQUFLO0FBQ3ZFLGVBQU8saUJBQWlCLGFBQWEsc0JBQXNCLEVBQUMsU0FBUyxNQUFLO0FBQzFFLGVBQU8saUJBQWlCLGNBQWMsc0JBQXNCLEVBQUMsU0FBUyxNQUFLO0FBRzNFLG1CQUFXLHNCQUFzQixHQUFJO0FBQUEsTUFFdkM7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLFlBQVksT0FBTyxRQUFRO0FBQy9CLFVBQUksQ0FBQyxJQUFLO0FBRVYsVUFBSTtBQUlGLGNBQU0sZ0JBQWdCLElBQUk7QUFFMUIsY0FBTSwyQkFBMkIsSUFBSTtBQUVyQyxjQUFNLEVBQUMsb0JBQW1CO0FBQUEsbUNBQUFBLHFCQUFBLE1BQU0sT0FBTyxzQkFBd0I7QUFBQSxvQ0FBQUEsaUJBQUE7QUFBQTtBQUUvRCxnQkFBUSxRQUFRLE1BQU0sZ0JBQWdCLFVBQVU7QUFBQSxNQUtsRCxTQUFTLEtBQUs7QUFDWixnQkFBUSxNQUFNLG9CQUFvQixHQUFHO0FBQUEsTUFDdkM7QUFBQSxJQUNGLEdBQUcsRUFBRSxXQUFXLE1BQU07QUFFdEI7QUFBQSxNQUNFLENBQUMsTUFBTSxjQUFjLFNBQVMsT0FBTyxNQUFNLEdBQUcsT0FBTyxNQUFNLE1BQU0sYUFBYSxLQUFLO0FBQUEsTUFDbkYsTUFBTTtBQUNKLFlBQUksQ0FBQyxXQUFXLE1BQU87QUFDdkIsd0JBQWdCLElBQUk7QUFDcEIsbUNBQTJCLElBQUk7QUFBQSxNQUVqQztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEzc0JPLDRCQUFNO0FBQ1IsNEJBQU07QUFFSiw0QkFBTTs7O0VBOEJOLEtBQUk7QUFBQSxFQUFpQixPQUFNOztBQUM3Qiw0QkFBTTs7O0VBRWtELE9BQU07QUFBQSxFQUFzRzs7QUFDcEssNEJBQU07O0VBQ0osT0FBTTtBQUFBLEVBQWlCLE1BQUs7QUFBQSxFQUFXOztBQUNyQyw2QkFBTTtBQUNKLDZCQUFNOzs7RUFTMkIsT0FBTTs7OztFQUU1QixPQUFNOzs7QUFVWCw2QkFBTTs7QUFJTiw2QkFBTTs7OztFQUlQLE9BQU07QUFBQSxFQUNOLE1BQUs7O0FBdURWLDZCQUFNOzs7RUFPc0IsT0FBTTs7O0FBMERsQyw2QkFBTTtBQUNSLDZCQUFNO0FBQ0osNkJBQU07QUFJSiw2QkFBTTtBQXFCWiw2QkFBTTtBQUNULDZCQUFNO0FBMEJILDZCQUFNO0FBTUYsNkJBQU07O0VBRWpCO0FBQUEsRUFDQSxVQUFTOzs7RUFJUCxPQUFNO0FBQUEsRUFDTixVQUFTO0FBQUEsRUFDVDtBQUFBLEVBQ0EsVUFBUzs7QUFFSCxnQ0FBUzs7RUFLZixVQUFTO0FBQUEsRUFDVDtBQUFBLEVBQ0EsVUFBUztBQUFBLEVBQ1QsT0FBTTs7OztFQWVMLFVBQVM7QUFBQSxFQUFhLE9BQU07O0FBMER0Qiw2QkFBTTtBQUVOLDZCQUFNOztBQVNKLDZCQUFNO0FBQ1IsNkJBQU07OztFQUdlLE9BQU07QUFBQSxFQUF5Rzs7OztFQUU5RyxPQUFNO0FBQUEsRUFBd0o7QUFBQSxFQUFTLFVBQVM7QUFBQSxFQUFJLE1BQUs7OztzQkF6V3hOQyxtQkE4V007QUFBQSxJQTdXUkMsZ0JBOEJVLFdBOUJWLFlBOEJVO0FBQUEsTUE3QlJBLGdCQTRCTSxPQTVCTixZQTRCTTtBQUFBLFFBMUJKQSxnQkFVTSxPQVZOLFlBVU07QUFBQSxVQVRKQSxnQkFBc0Y7QUFBQSxZQUFsRixPQUFNO0FBQUEsWUFBcUMsV0FBUSxxQkFBYztBQUFBO1VBQ3JFLDRCQUFBQSxnQkFFSSxPQUZELE9BQU0sOENBQTJDLHNJQUVwRDtBQUFBLHNDQUVBQSxnQkFHUyxZQUhELE9BQU0sb0JBQWdCO0FBQUEsWUFDNUJBLGdCQUFrRDtBQUFBLGNBQTVDLE9BQU07QUFBQSxjQUFpQixVQUFTO0FBQUE7NEJBQVksbUJBRXBEO0FBQUE7O29DQUdGQSxnQkFhTSxTQWJELE9BQU0saUNBQTZCO0FBQUEsVUFDdENBLGdCQVdFO0FBQUEsWUFWQSxlQUFjO0FBQUEsWUFDZCxTQUFRO0FBQUEsWUFDUixVQUFTO0FBQUEsWUFDVCxLQUFJO0FBQUEsWUFDSixLQUFJO0FBQUEsWUFDSixRQUFPO0FBQUEsWUFDUCxPQUFNO0FBQUEsWUFDTixPQUFNO0FBQUEsWUFDTixRQUFPO0FBQUEsWUFDUCxPQUFNO0FBQUE7Ozs7SUFPZEEsZ0JBMEpVLFdBMUpWLFlBMEpVO0FBQUEsTUF6SlJBLGdCQXdKTSxPQXhKTixZQXdKTTtBQUFBLG9DQXZKSkEsZ0JBQXNHO0FBQUEsVUFBbEcsT0FBTTtBQUFBLFVBQTZCO0FBQUEsV0FBeUMscUJBQWlCO0FBQUEsUUFDekYsc0JBQWMscUJBQWMsU0FBUyxNQUFNLFVBQXZEQyxVQUFBLEdBQUFGLG1CQThETSxPQTlETixZQThETTtBQUFBLFVBN0RKQyxnQkE2Q00sT0E3Q04sWUE2Q007QUFBQSxZQTVDSkEsZ0JBMkNNLE9BM0NOLFlBMkNNO0FBQUEsY0ExQ0pBLGdCQXlDTSxPQXpDTixhQXlDTTtBQUFBLGdCQXhDSkEsZ0JBdUNRLE9BdkNSLGFBdUNRO0FBQUEsbUJBckNOQyxVQUFBLE9BQUFGLG1CQW9DTUcsVUFBQSxNQUFBQyxXQW5DdUIsMkJBQWtCLENBQXJDLFNBQVMsVUFBSzt3Q0FEeEJKLG1CQW9DTTtBQUFBLHNCQWxDSCxLQUFLLFFBQVE7QUFBQSxzQkFDZCxPQUFLSyxlQUFBLENBQUMsNEJBQTBCLFdBQ2Isc0JBQXNCLFVBQUs7QUFBQTtzQkFHbkMsUUFBUSxpQkFBbkJILFVBQUEsR0FBQUYsbUJBQXNFLE9BQXRFLFdBQXNFLE1BRXRFRSxVQUFBLEdBQUFGLG1CQTBCTSxPQTFCTixhQTBCTTtBQUFBLHdCQXpCSkMsZ0JBUUM7QUFBQSwwQkFQRyxTQUFRO0FBQUEsMEJBQ1YsT0FBTTtBQUFBLDBCQUNOLFFBQU87QUFBQSwwQkFDTixLQUFLLFFBQVEsYUFBYSxPQUFHO0FBQUEsMEJBQzdCLFFBQVEsUUFBUSxhQUFhLFVBQU07QUFBQSwwQkFDbkMsT0FBTyxRQUFRLGFBQWEsU0FBSztBQUFBLDBCQUNqQyxLQUFLLFNBQVMsUUFBSTtBQUFBO3dCQUVyQkEsZ0JBR00sT0FITixhQUdNO0FBQUEsMEJBRkpBLGdCQUE4QixhQUFBSyxnQkFBdEIsU0FBUyxJQUFJO0FBQUEsMEJBQ3JCTCxnQkFBK0Q7QUFBQSw0QkFBMUQsT0FBTTtBQUFBLDRCQUFpQixXQUFRLFNBQVM7QUFBQTs7d0JBRS9DQSxnQkFXTSxPQVhOLGFBV007QUFBQSwwQkFWUSxVQUFTLGVBQXJCQyxVQUFBLEdBQUFGLG1CQUFvRCxvQkFBbEIsY0FBWSxNQUM5Q0UsVUFBQSxHQUFBRixtQkFRUyxVQVJULGFBUVM7QUFBQSw0QkFIUEMsZ0JBRU8sVUFGRCxPQUFNLG9FQUFnRTtBQUFBLDhCQUMxRUEsZ0JBQXNDLFVBQWhDLE9BQU0sV0FBUSxhQUFXO0FBQUE7Ozs7Ozs7Ozs7OzRCQTRCL0NNLFlBbUZhO0FBQUEsVUFqRlYsS0FBSztBQUFBLFVBQ0wsc0RBQUQ7QUFBQSxhQUFnQjtBQUFBLFVBQ2YscURBQUQ7QUFBQSxhQUFlO0FBQUEsc0JBQ047QUFBQSxzRkFBSztBQUFBLFVBQ2Q7QUFBQSxVQUNDLFVBQVU7QUFBQSxVQUNWLFlBQVk7QUFBQSxVQUNiO0FBQUEsVUFDQyxRQUFRO0FBQUEsVUFDVCxRQUFPO0FBQUEsVUFDUCxpQkFBYztBQUFBLFVBQ2QsT0FBTTtBQUFBLFVBQ0osVUFBUztBQUFBLFVBQ1IsV0FBUztBQUFBOzJCQUlWLE1BQTBDO0FBQUEsYUFENUNMLFVBQUEsT0FBQUYsbUJBb0JtQkcsVUFBQSxNQUFBQyxXQW5CYSxvQkFBVyxDQUFqQyxZQUFZLFVBQUs7a0NBRDNCRyxZQW9CbUI7QUFBQSxnQkFsQmhCLGNBQWMsS0FBSyxJQUFJLG1CQUFZLE1BQU0sSUFBSSxXQUFXLElBQUksT0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFJO0FBQUEsZ0JBQzNFLE1BQU07QUFBQTtpQ0FHUCxNQWFNO0FBQUEsa0JBYk5OLGdCQWFNLE9BYk4sYUFhTTtBQUFBLHNDQVhKRCxtQkFVTUcsVUFBQSxNQUFBQyxXQVRTLFlBQVUsQ0FBaEIsT0FBRTswQ0FEWEosbUJBVU07QUFBQSx3QkFSSCxLQUFLLEdBQUc7QUFBQSx3QkFDVCxPQUFNO0FBQUE7d0JBRUssR0FBRyxpQkFBZEUsVUFBQSxHQUFBRixtQkFBaUUsT0FBakUsV0FBaUUsbUJBRWpFQSxtQkFFTTtBQUFBLDBCQURSUSxZQUE2Qix5QkFBZixTQUFTLE1BQUU7QUFBQTs7Ozs7Ozs7Ozs7VUFPakI7a0JBQXVCO0FBQUEsWUFDckMsSUFBQUMsUUFBQSxDQVdFLEVBWnNELE1BQU0sU0FBUyxlQUFRO0FBQUEsY0FDL0VELFlBV0UsTUFBQUUsV0FYRjtBQUFBLGdCQUVHLE1BQU07QUFBQSxnQkFDTixPQUFPLGlCQUFVLE9BQUksY0FBa0IsU0FBUyxTQUFLO0FBQUEsZ0JBQ3RELE1BQUs7QUFBQSxnQkFDSixNQUFNO0FBQUEsZ0JBQ1A7QUFBQSxnQkFDQTtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0MsNkJBQTJCLE9BQUk7QUFBQSxnQkFDL0I7QUFBQTs7OztVQUtXO2tCQUF1QjtBQUFBLHdCQUNyQyxNQVVxQjtBQUFBLGNBVnJCRixZQVVxQjtBQUFBLGdCQVZELFVBQVM7QUFBQSxnQkFBTyxPQUFNO0FBQUE7aUNBQ3hDLE1BUUU7QUFBQSxrQkFSRkEsWUFRRTtBQUFBLG9CQVBDLE1BQU07QUFBQSxvQkFDUCxjQUFXO0FBQUEsb0JBQ1g7QUFBQSxvQkFDQTtBQUFBLG9CQUNBO0FBQUEsb0JBQ0EsT0FBTTtBQUFBLG9CQUNMLFNBQUssc0NBQUUsZ0JBQVMsT0FBTyxZQUFLLFFBQVEsbUJBQVksVUFBVSxtQkFBWTtBQUFBOzs7O2NBSTNFQSxZQVVxQjtBQUFBLGdCQVZELFVBQVM7QUFBQSxnQkFBUSxPQUFNO0FBQUE7aUNBQ3pDLE1BUUU7QUFBQSxrQkFSRkEsWUFRRTtBQUFBLG9CQVBDLE1BQU07QUFBQSxvQkFDUCxjQUFXO0FBQUEsb0JBQ1g7QUFBQSxvQkFDQTtBQUFBLG9CQUNBO0FBQUEsb0JBQ0EsT0FBTTtBQUFBLG9CQUNMLFNBQUssc0NBQUUsZ0JBQVMsT0FBTyxZQUFLLFNBQVMsbUJBQVk7QUFBQTs7Ozs7Ozs7OztJQVd0RFAsZ0JBd0JVLFdBeEJWLGFBd0JVO0FBQUEsTUF2QlJBLGdCQXNCTSxPQXRCTixhQXNCTTtBQUFBLFFBckJKQSxnQkFvQk0sT0FwQk4sYUFvQk07QUFBQSxzQ0FuQkpBLGdCQUVNLFNBRkQsT0FBTSxhQUFTO0FBQUEsWUFDbEJBLGdCQUFvRjtBQUFBLGNBQS9FLFNBQVE7QUFBQSxjQUFPLEtBQUk7QUFBQSxjQUFjLEtBQUk7QUFBQSxjQUFlLE9BQU07QUFBQSxjQUFNLFFBQU87QUFBQTs7VUFFOUVBLGdCQWVNLE9BZk4sYUFlTTtBQUFBLFlBZEosNEJBQUFBLGdCQUE2RCxVQUF2RCxPQUFNLDBCQUF1Qix1QkFBbUI7QUFBQSxZQUN0RCw0QkFBQUEsZ0JBQStFLFFBQTNFLE9BQU0sZ0NBQTZCLHVDQUFtQztBQUFBLFlBQzNFLDRCQUFBQSxnQkFFK0MsT0FGNUMsT0FBTSxxQkFBa0IsaU1BRWdCO0FBQUEsWUFDMUNPLFlBUUU7QUFBQSxjQVBBLEtBQUk7QUFBQSxjQUNKLE9BQU07QUFBQSxjQUNOLE9BQU07QUFBQSxjQUNOLGNBQVc7QUFBQSxjQUNWLFNBQVM7QUFBQSxjQUNWLE1BQUs7QUFBQSxjQUNMLElBQUc7QUFBQTs7Ozs7SUFRakJQLGdCQTBIVSxXQTFIVixhQTBIVTtBQUFBLE1BekhUQSxnQkF3SE8sT0F4SFAsYUF3SE87QUFBQSxRQXZITiw0QkFBQUEsZ0JBRUssUUFGRCxPQUFNLG1EQUFnRCw0QkFFMUQ7QUFBQSxRQUlRLGtDQUZWTSxZQWtIYTtBQUFBLFVBakhULFVBQVM7QUFBQSxVQUVSLEtBQUs7QUFBQSxzQkFDQztBQUFBLGtHQUFpQjtBQUFBLFVBQ3pCLHNEQUFEO0FBQUEsYUFBZ0I7QUFBQSxVQUNYLHFEQUFEO0FBQUEsYUFBZTtBQUFBLFVBQ2Y7QUFBQSxVQUNDLFVBQVU7QUFBQSxVQUNWLFlBQVk7QUFBQSxVQUNiO0FBQUEsVUFDQyxRQUFRO0FBQUEsVUFDYixRQUFPO0FBQUEsVUFDRixXQUFTO0FBQUE7MkJBSVosTUFBcUQ7QUFBQSxhQUR2REwsVUFBQSxPQUFBRixtQkFxRG1CRyxVQUFBLE1BQUFDLFdBcERhLCtCQUFzQixDQUE1QyxPQUFPLGVBQVU7a0NBRDNCRyxZQXFEbUI7QUFBQSxnQkFuRGhCLEtBQUs7QUFBQSxnQkFDTCxNQUFNO0FBQUE7aUNBRVAsTUErQ007QUFBQSxrQkEvQ05OLGdCQStDTSxPQS9DTixhQStDTTtBQUFBLHFCQTlDSkMsVUFBQSxPQUFBRixtQkE2Q01HLFVBQUEsTUFBQUMsV0EzQzJCLE9BQUssQ0FBNUIsYUFBYSxVQUFLOzBDQUY1QkosbUJBNkNNO0FBQUEsd0JBNUNKLE9BQU07QUFBQSx3QkFFTCxLQUFLO0FBQUE7d0JBRU5DLGdCQXVDTSxPQXZDTixhQXVDTTtBQUFBLDBCQXRDZEEsZ0JBcUNVLFdBckNWLGFBcUNVO0FBQUEsNEJBaENSQSxnQkFPSyxNQVBMLGFBT0s7QUFBQSw4QkFESEEsZ0JBQW1ELFFBQW5ELGFBQW1ESyxnQkFBMUIsWUFBWSxJQUFJO0FBQUE7NEJBSTNDTCxnQkFnQk0sT0FoQk4sYUFnQk07QUFBQSw4QkFWSkEsZ0JBQTZEO0FBQUEsZ0NBQXZELFVBQVM7QUFBQSxnQ0FBZSxTQUFTLFlBQVk7QUFBQTswREFDbkRBLGdCQUEwQztBQUFBLGdDQUFwQyxVQUFTO0FBQUEsZ0NBQWEsU0FBUTtBQUFBOzhCQUVwQ08sWUFNRTtBQUFBLGdDQUxDLGVBQWEsWUFBWSxVQUFNO0FBQUEsZ0NBQ2hDLE1BQUs7QUFBQSxnQ0FDTCxPQUFNO0FBQUEsZ0NBQ0wsTUFBTTtBQUFBLGdDQUNQO0FBQUE7OzRCQUtKUCxnQkFFSSxLQUZKLGFBRUlLLGdCQURDLFlBQVksUUFBUTtBQUFBOzs7Ozs7Ozs7Ozs7VUFTVDtrQkFBa0M7QUFBQSxZQUNoRCxJQUFBRyxRQUFBLENBV0UsRUFaaUUsTUFBTSxTQUFTLGVBQVE7QUFBQSxjQUMxRkQsWUFXRSxNQUFBRSxXQVhGO0FBQUEsZ0JBRUcsTUFBTTtBQUFBLGdCQUNOLE9BQU8sNkJBQXNCLE9BQUk7QUFBQSxnQkFDbEMsTUFBSztBQUFBLGdCQUNKLE1BQU07QUFBQSxnQkFDUDtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQyw2QkFBMkIsT0FBSTtBQUFBLGdCQUMvQjtBQUFBOzs7O1VBS1c7a0JBQWtDO0FBQUEsd0JBQ2hELE1BVXFCO0FBQUEsY0FWckJGLFlBVXFCO0FBQUEsZ0JBVkQsVUFBUztBQUFBLGdCQUFPLE9BQU07QUFBQTtpQ0FDeEMsTUFRRTtBQUFBLGtCQVJGQSxZQVFFO0FBQUEsb0JBUEMsTUFBTTtBQUFBLG9CQUNQLGNBQVc7QUFBQSxvQkFDWDtBQUFBLG9CQUNBO0FBQUEsb0JBQ0E7QUFBQSxvQkFDQSxPQUFNO0FBQUEsb0JBQ0wsU0FBSyxzQ0FBRSw0QkFBcUIsT0FBTyx3QkFBaUIsUUFBUSw4QkFBdUIsVUFBVSw4QkFBdUI7QUFBQTs7OztjQUl6SEEsWUFVcUI7QUFBQSxnQkFWRCxVQUFTO0FBQUEsZ0JBQVEsT0FBTTtBQUFBO2lDQUN6QyxNQVFFO0FBQUEsa0JBUkZBLFlBUUU7QUFBQSxvQkFQQyxNQUFNO0FBQUEsb0JBQ1AsY0FBVztBQUFBLG9CQUNYO0FBQUEsb0JBQ0E7QUFBQSxvQkFDQTtBQUFBLG9CQUNBLE9BQU07QUFBQSxvQkFDTCxTQUFLLHNDQUFFLDRCQUFxQixPQUFPLHdCQUFpQixTQUFTLDhCQUF1QjtBQUFBOzs7Ozs7Ozs7OzZEQVV6RlAsZ0JBU1UsYUFURCxPQUFNLHVCQUFtQjtBQUFBLE1BQ2hDQSxnQkFPTSxPQVBOLGFBT007QUFBQSxRQU5OLDRCQUFBQSxnQkFBcUYsUUFBakYsT0FBTSxtREFBZ0QsMEJBQXNCO0FBQUEsUUFDaEZBLGdCQUlNLE9BSk4sYUFJTTtBQUFBLFdBSEpDLFVBQUEsT0FBQUYsbUJBRU1HLFVBQUEsTUFBQUMsV0FGOEMsdUJBQWMsQ0FBOUIsTUFBTSxVQUFLO2dDQUEvQ0osbUJBRU07QUFBQSxjQUZELE9BQU07QUFBQSxjQUEwRCxLQUFLO0FBQUE7Y0FDeEVDLGdCQUF5RztBQUFBLGdCQUFwRyxPQUFNO0FBQUEsZ0JBQU0sUUFBTztBQUFBLGdCQUFPLEtBQUssS0FBSztBQUFBLGdCQUFRLEtBQUssS0FBSztBQUFBLGdCQUFTLE9BQU07QUFBQTs7Ozs7O0lBT2hGQSxnQkFTVSxXQVRWLGFBU1U7QUFBQSxNQVJSQSxnQkFPRyxPQVBILGFBT0c7QUFBQSxRQU5ILDRCQUFBQSxnQkFBa0UsUUFBOUQsT0FBTSx1Q0FBb0MsbUJBQWU7QUFBQSxRQUM3RCw0QkFBQUEsZ0JBQW9ILE9BQWpILE9BQU0sd0JBQXFCLHNGQUFrRjtBQUFBLFNBQ2xHLHFCQUFkQyxVQUFBLEdBQUFGLG1CQUEwbUIsU0FBMW1CLGFBQTBtQjtBQUFBOzhCQUMxbUJPLFlBQTBHO0FBQUE7VUFBMUY7QUFBQSxzQkFBZ0I7QUFBQSx3RkFBSztBQUFBLFVBQUUsT0FBTTtBQUFBLFVBQXFCLE9BQU07QUFBQTtTQUN6RCxxQkFBZkwsVUFBQSxHQUFBRixtQkFBK1osVUFBL1osYUFBK1o7QUFBQSxVQUFsTUMsZ0JBQWtEO0FBQUEsWUFBNUMsT0FBTTtBQUFBLFlBQWlCLFVBQVM7QUFBQTtVQUFZQSxnQkFBdUksVUFBakksT0FBTSxtRkFBK0U7QUFBQSxZQUFDQSxnQkFBb0MsVUFBOUIsT0FBTSxXQUFRLFdBQVM7QUFBQTs4QkFDeFlNLFlBQXNIO0FBQUE7VUFBdkcsU0FBUztBQUFBLFVBQU0sT0FBTTtBQUFBLFVBQVksT0FBTTtBQUFBLFVBQVksY0FBVztBQUFBLFVBQVcsU0FBTztBQUFBIiwibmFtZXMiOlsiZmV0Y2hTZW9Gb3JQYXRoIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX3dpdGhDdHgiLCJfbWVyZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9yYXRpbmcvUVJhdGluZy5qcyIsIi4uLy4uLy4uL3NyYy91dGlscy9jb25maWctbG9hZGVyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL3VzZUNhcm91c2VsS2V5Ym9hcmQuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvSW5kZXhQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBvbkJlZm9yZVVwZGF0ZSwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2l6ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUF0dHJzLCB1c2VGb3JtSW5qZWN0IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSYXRpbmcnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlU2l6ZVByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcblxuICAgIG1heDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNVxuICAgIH0sXG5cbiAgICBpY29uOiBbIFN0cmluZywgQXJyYXkgXSxcbiAgICBpY29uSGFsZjogWyBTdHJpbmcsIEFycmF5IF0sXG4gICAgaWNvblNlbGVjdGVkOiBbIFN0cmluZywgQXJyYXkgXSxcblxuICAgIGljb25BcmlhTGFiZWw6IFsgU3RyaW5nLCBBcnJheSBdLFxuXG4gICAgY29sb3I6IFsgU3RyaW5nLCBBcnJheSBdLFxuICAgIGNvbG9ySGFsZjogWyBTdHJpbmcsIEFycmF5IF0sXG4gICAgY29sb3JTZWxlY3RlZDogWyBTdHJpbmcsIEFycmF5IF0sXG5cbiAgICBub1Jlc2V0OiBCb29sZWFuLFxuICAgIG5vRGltbWluZzogQm9vbGVhbixcblxuICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuICAgIGRpc2FibGU6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzKVxuICAgIGNvbnN0IGZvcm1BdHRycyA9IHVzZUZvcm1BdHRycyhwcm9wcylcbiAgICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICAgIGNvbnN0IG1vdXNlTW9kZWwgPSByZWYoMClcblxuICAgIGxldCBpY29uUmVmcyA9IHt9XG5cbiAgICBjb25zdCBlZGl0YWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1yYXRpbmcgcm93IGlubGluZSBpdGVtcy1jZW50ZXInXG4gICAgICArIGAgcS1yYXRpbmctLSR7IGVkaXRhYmxlLnZhbHVlID09PSB0cnVlID8gJycgOiAnbm9uLScgfWVkaXRhYmxlYFxuICAgICAgKyAocHJvcHMubm9EaW1taW5nID09PSB0cnVlID8gJyBxLXJhdGluZy0tbm8tZGltbWluZycgOiAnJylcbiAgICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIHByb3BzLmNvbG9yICE9PSB2b2lkIDAgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5jb2xvcikgPT09IGZhbHNlXG4gICAgICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWBcbiAgICAgICAgICA6ICcnXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgaWNvbkRhdGEgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBpY29uTGVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5pY29uKSA9PT0gdHJ1ZSA/IHByb3BzLmljb24ubGVuZ3RoIDogMCxcbiAgICAgICAgc2VsSWNvbkxlbiA9IEFycmF5LmlzQXJyYXkocHJvcHMuaWNvblNlbGVjdGVkKSA9PT0gdHJ1ZSA/IHByb3BzLmljb25TZWxlY3RlZC5sZW5ndGggOiAwLFxuICAgICAgICBoYWxmSWNvbkxlbiA9IEFycmF5LmlzQXJyYXkocHJvcHMuaWNvbkhhbGYpID09PSB0cnVlID8gcHJvcHMuaWNvbkhhbGYubGVuZ3RoIDogMCxcbiAgICAgICAgY29sb3JMZW4gPSBBcnJheS5pc0FycmF5KHByb3BzLmNvbG9yKSA9PT0gdHJ1ZSA/IHByb3BzLmNvbG9yLmxlbmd0aCA6IDAsXG4gICAgICAgIHNlbENvbG9yTGVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5jb2xvclNlbGVjdGVkKSA9PT0gdHJ1ZSA/IHByb3BzLmNvbG9yU2VsZWN0ZWQubGVuZ3RoIDogMCxcbiAgICAgICAgaGFsZkNvbG9yTGVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5jb2xvckhhbGYpID09PSB0cnVlID8gcHJvcHMuY29sb3JIYWxmLmxlbmd0aCA6IDBcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWNvbkxlbixcbiAgICAgICAgaWNvbjogaWNvbkxlbiA+IDAgPyBwcm9wcy5pY29uWyBpY29uTGVuIC0gMSBdIDogcHJvcHMuaWNvbixcbiAgICAgICAgc2VsSWNvbkxlbixcbiAgICAgICAgc2VsSWNvbjogc2VsSWNvbkxlbiA+IDAgPyBwcm9wcy5pY29uU2VsZWN0ZWRbIHNlbEljb25MZW4gLSAxIF0gOiBwcm9wcy5pY29uU2VsZWN0ZWQsXG4gICAgICAgIGhhbGZJY29uTGVuLFxuICAgICAgICBoYWxmSWNvbjogaGFsZkljb25MZW4gPiAwID8gcHJvcHMuaWNvbkhhbGZbIHNlbEljb25MZW4gLSAxIF0gOiBwcm9wcy5pY29uSGFsZixcbiAgICAgICAgY29sb3JMZW4sXG4gICAgICAgIGNvbG9yOiBjb2xvckxlbiA+IDAgPyBwcm9wcy5jb2xvclsgY29sb3JMZW4gLSAxIF0gOiBwcm9wcy5jb2xvcixcbiAgICAgICAgc2VsQ29sb3JMZW4sXG4gICAgICAgIHNlbENvbG9yOiBzZWxDb2xvckxlbiA+IDAgPyBwcm9wcy5jb2xvclNlbGVjdGVkWyBzZWxDb2xvckxlbiAtIDEgXSA6IHByb3BzLmNvbG9yU2VsZWN0ZWQsXG4gICAgICAgIGhhbGZDb2xvckxlbixcbiAgICAgICAgaGFsZkNvbG9yOiBoYWxmQ29sb3JMZW4gPiAwID8gcHJvcHMuY29sb3JIYWxmWyBoYWxmQ29sb3JMZW4gLSAxIF0gOiBwcm9wcy5jb2xvckhhbGZcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaWNvbkxhYmVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcy5pY29uQXJpYUxhYmVsID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHByb3BzLmljb25BcmlhTGFiZWwubGVuZ3RoICE9PSAwID8gYCR7IHByb3BzLmljb25BcmlhTGFiZWwgfSBgIDogJydcbiAgICAgICAgcmV0dXJuIGkgPT4gYCR7IGxhYmVsIH0keyBpIH1gXG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BzLmljb25BcmlhTGFiZWwpID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlNYXggPSBwcm9wcy5pY29uQXJpYUxhYmVsLmxlbmd0aFxuXG4gICAgICAgIGlmIChpTWF4ID4gMCkge1xuICAgICAgICAgIHJldHVybiBpID0+IHByb3BzLmljb25BcmlhTGFiZWxbIE1hdGgubWluKGksIGlNYXgpIC0gMSBdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChpLCBsYWJlbCkgPT4gYCR7IGxhYmVsIH0gJHsgaSB9YFxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGFjYyA9IFtdLFxuICAgICAgICBpY29ucyA9IGljb25EYXRhLnZhbHVlLFxuICAgICAgICBjZWlsID0gTWF0aC5jZWlsKHByb3BzLm1vZGVsVmFsdWUpLFxuICAgICAgICB0YWJpbmRleCA9IGVkaXRhYmxlLnZhbHVlID09PSB0cnVlID8gMCA6IG51bGxcblxuICAgICAgY29uc3QgaGFsZkluZGV4ID0gcHJvcHMuaWNvbkhhbGYgPT09IHZvaWQgMCB8fCBjZWlsID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgID8gLTFcbiAgICAgICAgOiBjZWlsXG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHByb3BzLm1heDsgaSsrKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgYWN0aXZlID0gKG1vdXNlTW9kZWwudmFsdWUgPT09IDAgJiYgcHJvcHMubW9kZWxWYWx1ZSA+PSBpKSB8fCAobW91c2VNb2RlbC52YWx1ZSA+IDAgJiYgbW91c2VNb2RlbC52YWx1ZSA+PSBpKSxcbiAgICAgICAgICBoYWxmID0gaGFsZkluZGV4ID09PSBpICYmIG1vdXNlTW9kZWwudmFsdWUgPCBpLFxuICAgICAgICAgIGV4U2VsZWN0ZWQgPSBtb3VzZU1vZGVsLnZhbHVlID4gMCAmJiAoaGFsZiA9PT0gdHJ1ZSA/IGNlaWwgOiBwcm9wcy5tb2RlbFZhbHVlKSA+PSBpICYmIG1vdXNlTW9kZWwudmFsdWUgPCBpLFxuICAgICAgICAgIGNvbG9yID0gaGFsZiA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyAoaSA8PSBpY29ucy5oYWxmQ29sb3JMZW4gPyBwcm9wcy5jb2xvckhhbGZbIGkgLSAxIF0gOiBpY29ucy5oYWxmQ29sb3IpXG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICBpY29ucy5zZWxDb2xvciAhPT0gdm9pZCAwICYmIGFjdGl2ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgPyAoaSA8PSBpY29ucy5zZWxDb2xvckxlbiA/IHByb3BzLmNvbG9yU2VsZWN0ZWRbIGkgLSAxIF0gOiBpY29ucy5zZWxDb2xvcilcbiAgICAgICAgICAgICAgICAgIDogKGkgPD0gaWNvbnMuY29sb3JMZW4gPyBwcm9wcy5jb2xvclsgaSAtIDEgXSA6IGljb25zLmNvbG9yKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgIG5hbWUgPSAoXG4gICAgICAgICAgICBoYWxmID09PSB0cnVlXG4gICAgICAgICAgICAgID8gKGkgPD0gaWNvbnMuaGFsZkljb25MZW4gPyBwcm9wcy5pY29uSGFsZlsgaSAtIDEgXSA6IGljb25zLmhhbGZJY29uKVxuICAgICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICAgIGljb25zLnNlbEljb24gIT09IHZvaWQgMCAmJiAoYWN0aXZlID09PSB0cnVlIHx8IGV4U2VsZWN0ZWQgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgID8gKGkgPD0gaWNvbnMuc2VsSWNvbkxlbiA/IHByb3BzLmljb25TZWxlY3RlZFsgaSAtIDEgXSA6IGljb25zLnNlbEljb24pXG4gICAgICAgICAgICAgICAgICAgIDogKGkgPD0gaWNvbnMuaWNvbkxlbiA/IHByb3BzLmljb25bIGkgLSAxIF0gOiBpY29ucy5pY29uKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICApIHx8ICRxLmljb25TZXQucmF0aW5nLmljb25cblxuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgbmFtZTogKFxuICAgICAgICAgICAgaGFsZiA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IChpIDw9IGljb25zLmhhbGZJY29uTGVuID8gcHJvcHMuaWNvbkhhbGZbIGkgLSAxIF0gOiBpY29ucy5oYWxmSWNvbilcbiAgICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgICBpY29ucy5zZWxJY29uICE9PSB2b2lkIDAgJiYgKGFjdGl2ZSA9PT0gdHJ1ZSB8fCBleFNlbGVjdGVkID09PSB0cnVlKVxuICAgICAgICAgICAgICAgICAgICA/IChpIDw9IGljb25zLnNlbEljb25MZW4gPyBwcm9wcy5pY29uU2VsZWN0ZWRbIGkgLSAxIF0gOiBpY29ucy5zZWxJY29uKVxuICAgICAgICAgICAgICAgICAgICA6IChpIDw9IGljb25zLmljb25MZW4gPyBwcm9wcy5pY29uWyBpIC0gMSBdIDogaWNvbnMuaWNvbilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgKSB8fCAkcS5pY29uU2V0LnJhdGluZy5pY29uLFxuXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHRhYmluZGV4LFxuICAgICAgICAgICAgcm9sZTogJ3JhZGlvJyxcbiAgICAgICAgICAgICdhcmlhLWNoZWNrZWQnOiBwcm9wcy5tb2RlbFZhbHVlID09PSBpID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogaWNvbkxhYmVsLnZhbHVlKGksIG5hbWUpXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGljb25DbGFzczogJ3EtcmF0aW5nX19pY29uJ1xuICAgICAgICAgICAgKyAoYWN0aXZlID09PSB0cnVlIHx8IGhhbGYgPT09IHRydWUgPyAnIHEtcmF0aW5nX19pY29uLS1hY3RpdmUnIDogJycpXG4gICAgICAgICAgICArIChleFNlbGVjdGVkID09PSB0cnVlID8gJyBxLXJhdGluZ19faWNvbi0tZXhzZWxlY3RlZCcgOiAnJylcbiAgICAgICAgICAgICsgKG1vdXNlTW9kZWwudmFsdWUgPT09IGkgPyAnIHEtcmF0aW5nX19pY29uLS1ob3ZlcmVkJyA6ICcnKVxuICAgICAgICAgICAgKyAoY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBjb2xvciB9YCA6ICcnKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRycyA9IHsgcm9sZTogJ3JhZGlvZ3JvdXAnIH1cblxuICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICB9XG4gICAgICBpZiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLXJlYWRvbmx5JyBdID0gJ3RydWUnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyc1xuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBzZXQgKHZhbHVlKSB7XG4gICAgICBpZiAoZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBtb2RlbCA9IGJldHdlZW4ocGFyc2VJbnQodmFsdWUsIDEwKSwgMSwgcGFyc2VJbnQocHJvcHMubWF4LCAxMCkpLFxuICAgICAgICAgIG5ld1ZhbCA9IHByb3BzLm5vUmVzZXQgIT09IHRydWUgJiYgcHJvcHMubW9kZWxWYWx1ZSA9PT0gbW9kZWwgPyAwIDogbW9kZWxcblxuICAgICAgICBuZXdWYWwgIT09IHByb3BzLm1vZGVsVmFsdWUgJiYgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBuZXdWYWwpXG4gICAgICAgIG1vdXNlTW9kZWwudmFsdWUgPSAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SG92ZXJWYWx1ZSAodmFsdWUpIHtcbiAgICAgIGlmIChlZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBtb3VzZU1vZGVsLnZhbHVlID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlLCBpKSB7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgIHNldChpKVxuICAgICAgICAgIHJldHVybiBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBjYXNlIDM3OiAvLyBMRUZUIEFSUk9XXG4gICAgICAgIGNhc2UgNDA6IC8vIERPV04gQVJST1dcbiAgICAgICAgICBpZiAoaWNvblJlZnNbIGBydCR7IGkgLSAxIH1gIF0pIHtcbiAgICAgICAgICAgIGljb25SZWZzWyBgcnQkeyBpIC0gMSB9YCBdLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGNhc2UgMzk6IC8vIFJJR0hUIEFSUk9XXG4gICAgICAgIGNhc2UgMzg6IC8vIFVQIEFSUk9XXG4gICAgICAgICAgaWYgKGljb25SZWZzWyBgcnQkeyBpICsgMSB9YCBdKSB7XG4gICAgICAgICAgICBpY29uUmVmc1sgYHJ0JHsgaSArIDEgfWAgXS5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdG9wQW5kUHJldmVudChlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0TW91c2VNb2RlbCAoKSB7XG4gICAgICBtb3VzZU1vZGVsLnZhbHVlID0gMFxuICAgIH1cblxuICAgIG9uQmVmb3JlVXBkYXRlKCgpID0+IHtcbiAgICAgIGljb25SZWZzID0ge31cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgc3RhcnMudmFsdWUuZm9yRWFjaCgoeyBpY29uQ2xhc3MsIG5hbWUsIGF0dHJzIH0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGkgPSBpbmRleCArIDFcblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGtleTogaSxcbiAgICAgICAgICAgIHJlZjogZWwgPT4geyBpY29uUmVmc1sgYHJ0JHsgaSB9YCBdID0gZWwgfSxcbiAgICAgICAgICAgIGNsYXNzOiAncS1yYXRpbmdfX2ljb24tY29udGFpbmVyIGZsZXggZmxleC1jZW50ZXInLFxuICAgICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgICBvbkNsaWNrICgpIHsgc2V0KGkpIH0sXG4gICAgICAgICAgICBvbk1vdXNlb3ZlciAoKSB7IHNldEhvdmVyVmFsdWUoaSkgfSxcbiAgICAgICAgICAgIG9uTW91c2VvdXQ6IHJlc2V0TW91c2VNb2RlbCxcbiAgICAgICAgICAgIG9uRm9jdXMgKCkgeyBzZXRIb3ZlclZhbHVlKGkpIH0sXG4gICAgICAgICAgICBvbkJsdXI6IHJlc2V0TW91c2VNb2RlbCxcbiAgICAgICAgICAgIG9uS2V5dXAgKGUpIHsgb25LZXl1cChlLCBpKSB9XG4gICAgICAgICAgfSwgaE1lcmdlU2xvdChcbiAgICAgICAgICAgIHNsb3RzWyBgdGlwLSR7IGkgfWAgXSxcbiAgICAgICAgICAgIFsgaChRSWNvbiwgeyBjbGFzczogaWNvbkNsYXNzLCBuYW1lIH0pIF1cbiAgICAgICAgICApKVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICBpZiAocHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgICAgaW5qZWN0Rm9ybUlucHV0KGNoaWxkLCAncHVzaCcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlXG4gICAgICB9LCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2VDb25maWcocGFnZSwgaXNQcmV2aWV3KSB7XHJcbiAgLy8gLS0tIFNFUlZFUiBTSURFIExPR0lDIC0tLVxyXG4gIGlmIChpbXBvcnQubWV0YS5lbnYuU1NSKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwYXRoID0gYXdhaXQgaW1wb3J0KCdwYXRoJylcclxuICAgICAgY29uc3QgZnMgPSBhd2FpdCBpbXBvcnQoJ2ZzJylcclxuXHJcbiAgICAgIC8vIDEuIElmIFByZXZpZXcsIGZldGNoIGZyb20gV29yZFByZXNzIEFQSVxyXG4gICAgICBpZiAoaXNQcmV2aWV3KSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3Nob3AtYnVpbGRlci92MS9wcmV2aWV3LyR7cGFnZX1gO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbU1NSXSBGZXRjaGluZyBQcmV2aWV3IGZyb20gQVBJOiAke3VybH1gKTtcclxuXHJcbiAgICAgICAgLy8gV2UgdXNlIGEgZHluYW1pYyBpbXBvcnQgZm9yICdub2RlLWZldGNoJyBvciBzaW1pbGFyIGlmIGdsb2JhbCBmZXRjaCBpc24ndCBhdmFpbGFibGVcclxuICAgICAgICAvLyBidXQgdXN1YWxseSwgaW4gUXVhc2FyIFNTUiwgZ2xvYmFsIGZldGNoIGlzIGF2YWlsYWJsZS5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgICAgY2FjaGU6ICduby1zdG9yZSdcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBXUCBBUEkgcmVzcG9uZGVkIHdpdGggJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIDIuIElmIE5PVCBQcmV2aWV3LCByZWFkIGZyb20gbG9jYWwgcHVibGljIGZvbGRlciAobGlrZSBwcm9kdWN0cy5qcylcclxuICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYHB1YmxpYy9jb25maWcvJHtwYWdlfS5qc29uYCk7XHJcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xyXG4gICAgICAgIGNvbnN0IHJhdyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0Zi04Jyk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS53YXJuKGBbU1NSXSBDb25maWcgZmlsZSBub3QgZm91bmQgYXQ6ICR7ZmlsZVBhdGh9YCk7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdbU1NSXSBsb2FkUGFnZUNvbmZpZyBFcnJvcjonLCBlcnIubWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiB7fTsgLy8gUmV0dXJuIGVtcHR5IG9iamVjdCB0byBwcmV2ZW50IDUwMCBlcnJvclxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tIENMSUVOVCBTSURFIExPR0lDIC0tLVxyXG4gIGVsc2Uge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXJsID0gaXNQcmV2aWV3XHJcbiAgICAgICAgPyBgaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vc2hvcC1idWlsZGVyL3YxL3ByZXZpZXcvJHtwYWdlfWBcclxuICAgICAgICA6IGAvY29uZmlnLyR7cGFnZX0uanNvbmA7XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgIGNhY2hlOiAnbm8tc3RvcmUnXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSByZXR1cm4ge307XHJcbiAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignW0NsaWVudF0gbG9hZFBhZ2VDb25maWcgRXJyb3I6JywgZXJyKTtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiB1c2VDYXJvdXNlbEtleWJvYXJkKHNsaWRlUmVmLCB0b3RhbFNsaWRlc1JlZikge1xyXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XHJcbiAgICBzd2l0Y2ggKGUua2V5KSB7XHJcbiAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxyXG4gICAgICAgIHNsaWRlUmVmLnZhbHVlID1cclxuICAgICAgICAgIChzbGlkZVJlZi52YWx1ZSArIDEpICUgdG90YWxTbGlkZXNSZWYudmFsdWVcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcclxuICAgICAgICBzbGlkZVJlZi52YWx1ZSA9XHJcbiAgICAgICAgICAoc2xpZGVSZWYudmFsdWUgLSAxICsgdG90YWxTbGlkZXNSZWYudmFsdWUpICUgdG90YWxTbGlkZXNSZWYudmFsdWVcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSAnSG9tZSc6XHJcbiAgICAgICAgc2xpZGVSZWYudmFsdWUgPSAwXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgJ0VuZCc6XHJcbiAgICAgICAgc2xpZGVSZWYudmFsdWUgPSB0b3RhbFNsaWRlc1JlZi52YWx1ZSAtIDFcclxuICAgICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9uS2V5ZG93blxyXG4gIH1cclxufSIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG48c2VjdGlvbiBjbGFzcz1cImhlcm8tc2VjdGlvbi1zZWNcIj5cclxuICA8ZGl2IGNsYXNzPVwiaGVyby1zZWN0aW9uIGNvbnRhaW5lciBoZXJvLW1hcmdpbiByb3dcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVyby1jb250ZW50IGNvbC0xMiBjb2wtbWQtNiBxLW1iLWxnXCI+XHJcbiAgICAgIDxoMSBjbGFzcz1cInRleHQtaDEgdGV4dC1zZWNvbmRhcnkgc3RhYmxlLXRleHRcIiB2LWh0bWw9XCJob21lU2V0dGluZ3M/Lmhlcm9fdGl0bGVcIj48L2gxPlxyXG4gICAgICA8cCBjbGFzcz1cInRleHQtaDYgdGV4dC1zZWNvbmRhcnkgdGV4dC13ZWlnaHQtbGlnaHRcIj5cclxuICAgICAgICBFdGhpY2FsbHkgc291cmNlZCBib3RhbmljYWwgZm9ybXVsYXRpb25zIGRlc2lnbmVkIHRvIG51cnR1cmUgeW91ciBza2lu4oCZcyBuYXR1cmFsIHJhZGlhbmNlIHdpdGggaGlnaC1wb3RlbmN5IG9yZ2FuaWMgaW5ncmVkaWVudHMuXHJcbiAgICAgIDwvcD5cclxuXHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJoZXJvLWJ0biBxLWJ0blwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicS1mb2N1cy1oZWxwZXJcIiB0YWJpbmRleD1cIi0xXCI+PC9zcGFuPlxyXG4gICAgICAgIEJyb3dzZSBQcm9kdWN0c1xyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJsY3Atd3JhcHBlciBjb2wtMTIgY29sLW1kLTZcIj5cclxuICAgICAgPGltZ1xyXG4gICAgICAgIGZldGNocHJpb3JpdHk9XCJoaWdoXCJcclxuICAgICAgICBsb2FkaW5nPVwiZWFnZXJcIlxyXG4gICAgICAgIGRlY29kaW5nPVwiYXN5bmNcIlxyXG4gICAgICAgIGFsdD1cIkhvbWVwYWdlIGhlcm8gaW1hZ2VcIlxyXG4gICAgICAgIHNyYz1cImh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8xMC9uYXR1cmFibG9vbS1oZXJvLWNvdmVyLTMwMHgzMDAucG5nXCJcclxuICAgICAgICBzcmNzZXQ9XCJodHRwczovL251eHQubWVpZGFubS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMTAvbmF0dXJhYmxvb20taGVyby1jb3Zlci0zMDB4MzAwLnBuZyAzMDB3LGh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8xMC9uYXR1cmFibG9vbS1oZXJvLWNvdmVyLTc2OHg1MTIucG5nIDc2OHcsaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzEwL25hdHVyYWJsb29tLWhlcm8tY292ZXIucG5nIDEwMjR3XCJcclxuICAgICAgICBzaXplcz1cIihtaW4td2lkdGg6IDc2OHB4KSA1MHZ3LCBjYWxjKDEwMHZ3IC0gNDBweClcIlxyXG4gICAgICAgIHdpZHRoPVwiMzAwXCJcclxuICAgICAgICBoZWlnaHQ9XCIyMDBcIlxyXG4gICAgICAgIGNsYXNzPVwiaGVyby1pbWdcIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvc2VjdGlvbj5cclxuXHJcbjwhLS0gRmVhdHVyZWQgUHJvZHVjdHMgU2xpZGVyIC0tPlxyXG48c2VjdGlvbiByZWY9XCJwcm9kdWN0U2VjdGlvblwiIGNsYXNzPVwiZmVhdHVyZWQtcHJvZHVjdHNcIj5cclxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8aDIgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ub3JtYWwgcS1tYi1tZFwiIHN0eWxlPVwiY29sb3I6ICMxRDFDMTM7IGZvbnQtc2l6ZTogNDFweDtcIj5GZWF0dXJlZCBQcm9kdWN0czwvaDI+XHJcbjxkaXYgdi1pZj1cIiFpc0h5ZHJhdGVkICYmIHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUubGVuZ3RoXCIgY2xhc3M9XCJxLWNhcm91c2VsIHEtcGFuZWwtcGFyZW50IHEtY2Fyb3VzZWwtLXdpdGhvdXQtcGFkZGluZyBxLWNhcm91c2VsLS1uYXZpZ2F0aW9uLWJvdHRvbSByb3VuZGVkLWJvcmRlcnNcIiBzdHlsZT1cImhlaWdodDogMTAwJTtcIj5cclxuICA8ZGl2IGNsYXNzPVwicS1jYXJvdXNlbF9fc2xpZGVzLWNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInEtcGFuZWwgc2Nyb2xsXCIgcm9sZT1cInRhYnBhbmVsXCIgc3R5bGU9XCItLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogMzAwbXM7XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJxLWNhcm91c2VsX19zbGlkZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XHJcblxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICB2LWZvcj1cIihwcm9kdWN0LCBpbmRleCkgaW4gdmlzaWJsZVN0YXRpY0l0ZW1zXCJcclxuICAgICAgICAgICAgOmtleT1cInByb2R1Y3QuaWRcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImNvbC0xMiBjb2wtc20tNiBjb2wtbWQtNFwiXHJcbiAgICAgICAgICAgIDpjbGFzcz1cInsgJ2d0LXhzJzogaW5kZXggPT09IDEsICdndC1zbSc6IGluZGV4ID09PSAyIH1cIlxyXG4gICAgICAgICAgPlxyXG5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwicHJvZHVjdC5fX3BsYWNlaG9sZGVyXCIgY2xhc3M9XCJxLWNhcmQgaW52aXNpYmxlLWNhcmRcIj48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgdi1lbHNlIGNsYXNzPVwicS1jYXJkIG15LWNhcmQgZnVsbC1oZWlnaHRcIj5cclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgIGxvYWRpbmc9XCJsYXp5XCJcclxuICAgICAgICAgICAgICAgIHdpZHRoPVwiMzAwXCJcclxuICAgICAgICAgICAgICAgIGhlaWdodD1cIjI1MFwiXHJcbiAgICAgICAgICAgICAgICA6c3JjPVwicHJvZHVjdC5pbWFnZXM/LlswXT8uc3JjfHwgJydcIlxyXG4gICAgICAgICAgICAgICAgOnNyY3NldD1cInByb2R1Y3QuaW1hZ2VzPy5bMF0/LnNyY3NldCB8fCAnJ1wiXHJcbiAgICAgICAgICAgICAgICA6c2l6ZXM9XCJwcm9kdWN0LmltYWdlcz8uWzBdPy5zaXplcyB8fCAnJ1wiXHJcbiAgICAgICAgICAgICAgICA6YWx0PVwicHJvZHVjdD8ubmFtZSB8fCAnJ1wiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWNhcmRfX3NlY3Rpb24gcS1jYXJkX19zZWN0aW9uLS12ZXJ0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IHByb2R1Y3Q/Lm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMlwiIHYtaHRtbD1cInByb2R1Y3Q/LnByaWNlX2h0bWxcIj48L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1jYXJkX19hY3Rpb25zIGp1c3RpZnktc3RhcnQgcS1jYXJkX19hY3Rpb25zLS1ob3JpeiByb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cIiFwcm9kdWN0Py5pc19pbl9zdG9ja1wiPk91dCBvZiBzdG9jazwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB2LWVsc2VcclxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLWJ0biBxLWJ0bi1pdGVtIG5vbi1zZWxlY3RhYmxlIG5vLW91dGxpbmUgcS1idG4tLXN0YW5kYXJkIHEtYnRuLS1yZWN0YW5nbGUgYmctc2Vjb25kYXJ5IHRleHQtd2hpdGUgcS1idG4tLWFjdGlvbmFibGVcIlxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxvY2tcIj5BZGQgdG8gQ2FydDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInEtY2Fyb3VzZWxfX2NvbnRyb2wgYWJzb2x1dGUgYWJzb2x1dGUtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlclwiIHN0eWxlPVwibWFyZ2luOiAxOHB4O1wiPlxyXG4gICAgPGJ1dHRvbiBhcmlhLWxhYmVsPVwiUHJldmlvdXMgc2xpZGVcIiBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tZmxhdCBxLWJ0bi0tcm91bmQgdGV4dC1wcmltYXJ5IHEtYnRuLS1kZW5zZVwiIHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvd1wiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwicS1pY29uXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xNS40MSA3LjQxTDE0IDZsLTYgNiA2IDYgMS40MS0xLjQxTDEwLjgzIDEyelwiPjwvcGF0aD48L3N2Zz48L2k+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJxLWNhcm91c2VsX19jb250cm9sIGFic29sdXRlIGFic29sdXRlLXJpZ2h0IGZsZXggaXRlbXMtY2VudGVyXCIgc3R5bGU9XCJtYXJnaW46IDE4cHg7XCI+XHJcbiAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJOZXh0IHNsaWRlXCIgY2xhc3M9XCJxLWJ0biBxLWJ0bi1pdGVtIG5vbi1zZWxlY3RhYmxlIG5vLW91dGxpbmUgcS1idG4tLWZsYXQgcS1idG4tLXJvdW5kIHRleHQtcHJpbWFyeSBxLWJ0bi0tZGVuc2VcIiB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwicS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3dcIj5cclxuICAgICAgICA8aSBjbGFzcz1cInEtaWNvblwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTAgNkw4LjU5IDcuNDEgMTMuMTcgMTJsLTQuNTggNC41OUwxMCAxOGw2LTZ6XCI+PC9wYXRoPjwvc3ZnPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuICAgIDwhLS0gSW50ZXJhY3RpdmUgY2Fyb3VzZWwgQUZURVIgaHlkcmF0aW9uIC0tPlxyXG4gICAgPHEtY2Fyb3VzZWxcclxuICAgICAgICB2LWVsc2VcclxuICAgICAgOmtleT1cImNhcm91c2VsS2V5XCJcclxuICAgICAgQHRvdWNoc3RhcnQuc3RvcFxyXG4gICAgICBAbW91c2Vkb3duLnN0b3BcclxuICAgICAgdi1tb2RlbD1cInNsaWRlXCJcclxuICAgICAgYW5pbWF0ZWRcclxuICAgICAgOmluZmluaXRlPVwic2hvd0Nhcm91c2VsQ29udHJvbHNcIlxyXG4gICAgICA6bmF2aWdhdGlvbj1cInNob3dDYXJvdXNlbENvbnRyb2xzXCJcclxuICAgICAgc3dpcGVhYmxlXHJcbiAgICAgIDphcnJvd3M9XCJmYWxzZVwiXHJcbiAgICAgIGhlaWdodD1cIjEwMCVcIlxyXG4gICAgICBjb250cm9sLWNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCJcclxuICAgICAgICB0YWJpbmRleD1cIjBcIlxyXG4gICAgICAgIEBrZXlkb3duPVwib25LZXlkb3duX3Byb2R1Y3RzXCJcclxuICAgID5cclxuXHJcbiAgICAgIDxxLWNhcm91c2VsLXNsaWRlXHJcbiAgICAgICAgdi1mb3I9XCIoc2xpZGVHcm91cCwgaW5kZXgpIGluIHNsaWRlQ2h1bmtzXCJcclxuICAgICAgICA6a2V5PVwiYHNsaWRlLSR7aW5kZXh9LSR7c2xpZGVDaHVua3MubGVuZ3RofS0ke3NsaWRlR3JvdXAubWFwKHAgPT4gcC5pZCkuam9pbignLScpfWBcIlxyXG4gICAgICAgIDpuYW1lPVwiaW5kZXhcIlxyXG4gICAgICA+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XHJcblxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICB2LWZvcj1cImZwIGluIHNsaWRlR3JvdXBcIlxyXG4gICAgICAgICAgICA6a2V5PVwiZnAuaWRcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImNvbC0xMiBjb2wtc20tNiBjb2wtbWQtNCByZWxhdGl2ZS1wb3NpdGlvblwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgdi1pZj1cImZwLl9fcGxhY2Vob2xkZXJcIiBjbGFzcz1cInEtY2FyZCBpbnZpc2libGUtY2FyZFwiPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiB2LWVsc2U+XHJcbiAgICAgICAgICA8UHJvZHVjdENhcmQgOnByb2R1Y3Q9XCJmcFwiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvcS1jYXJvdXNlbC1zbGlkZT5cclxuXHJcbiAgPCEtLSBLZWVwIHRoZSBsb29rOiBiaW5kIGJ0blByb3BzLCBhZGQgYXJpYS1sYWJlbCwga2VlcCB2aXN1YWwgc3R5bGUgLS0+XHJcbiAgPHRlbXBsYXRlIHYtaWY9XCJzaG93Q2Fyb3VzZWxDb250cm9sc1wiICNuYXZpZ2F0aW9uLWljb249XCJ7IG5hbWUsIG9uQ2xpY2ssIGJ0blByb3BzIH1cIj5cclxuICAgIDxxLWJ0blxyXG4gICAgICB2LWJpbmQ9XCJidG5Qcm9wc1wiXHJcbiAgICAgIDpmbGF0PVwiZmFsc2VcIlxyXG4gICAgICA6Y29sb3I9XCJzbGlkZSA9PT0gbmFtZSA/ICdzZWNvbmRhcnknIDogKGJ0blByb3BzLmNvbG9yIHx8ICdncmV5LTUnKVwiXHJcbiAgICAgIHNpemU9XCJzbVwiXHJcbiAgICAgIDppY29uPVwibnVsbFwiXHJcbiAgICAgIHN0eWxlPVwiYmFja2dyb3VuZDogdmFyKC0tcS1zZWNvbmRhcnkpOyBmb250LXNpemU6IDVweDtwYWRkaW5nOiAwXCJcclxuICAgICAgcm91bmRcclxuICAgICAgZGVuc2VcclxuICAgICAgOmFyaWEtbGFiZWw9XCJgR28gdG8gc2xpZGUgJHtuYW1lICsgMX1gXCJcclxuICAgICAgQGNsaWNrPVwib25DbGlja1wiXHJcbiAgICAvPlxyXG4gIDwvdGVtcGxhdGU+XHJcblxyXG4gIDwhLS0gQ3VzdG9tIGFycm93cyB1c2luZyBxLWNhcm91c2VsLWNvbnRyb2wgKHBvc2l0aW9ucyBtYXRjaCBkZWZhdWx0KSAtLT5cclxuICA8dGVtcGxhdGUgdi1pZj1cInNob3dDYXJvdXNlbENvbnRyb2xzXCIgI2NvbnRyb2w+XHJcbiAgICA8cS1jYXJvdXNlbC1jb250cm9sIHBvc2l0aW9uPVwibGVmdFwiIGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgOmljb249XCJtYXRDaGV2cm9uTGVmdFwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cIlByZXZpb3VzIHNsaWRlXCJcclxuICAgICAgICBmbGF0XHJcbiAgICAgICAgcm91bmRcclxuICAgICAgICBkZW5zZVxyXG4gICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICBAY2xpY2s9XCJzbGlkZSA9IChOdW1iZXIoc2xpZGUpIC0gMSArIHNsaWRlQ2h1bmtzLmxlbmd0aCkgJSBzbGlkZUNodW5rcy5sZW5ndGhcIlxyXG4gICAgICAvPlxyXG4gICAgPC9xLWNhcm91c2VsLWNvbnRyb2w+XHJcblxyXG4gICAgPHEtY2Fyb3VzZWwtY29udHJvbCBwb3NpdGlvbj1cInJpZ2h0XCIgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICA6aWNvbj1cIm1hdENoZXZyb25SaWdodFwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cIk5leHQgc2xpZGVcIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICByb3VuZFxyXG4gICAgICAgIGRlbnNlXHJcbiAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgIEBjbGljaz1cInNsaWRlID0gKE51bWJlcihzbGlkZSkgKyAxKSAlIHNsaWRlQ2h1bmtzLmxlbmd0aFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3EtY2Fyb3VzZWwtY29udHJvbD5cclxuICA8L3RlbXBsYXRlPlxyXG5cclxuICAgIDwvcS1jYXJvdXNlbD5cclxuXHJcbiAgPC9kaXY+XHJcbjwvc2VjdGlvbj5cclxuXHJcbiAgICA8IS0tIENUQSBTZWN0aW9uIC0tPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJjdGEtc2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImN0YS1vdmVybGF5XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3RhLWltZ1wiPlxyXG4gICAgICAgICAgICA8aW1nIGxvYWRpbmc9XCJsYXp5XCIgYWx0PVwiRm9yZXN0IHZpZXdcIiBzcmM9XCIvY3RhLWltZy5wbmdcIiB3aWR0aD1cIjcyOFwiIGhlaWdodD1cIjUwMFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdGEtY29udGVudFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2hpdGUgcHJlLXRpdGxlXCI+VGhlIEJvdGFuaWNhbCBFdGhvczwvc3Bhbj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1oNCB0ZXh0LXdoaXRlIHEtbWItbWRcIj5Hcm93biB3aXRoIENhcmUsIENyYWZ0ZWQgd2l0aCBTb3VsLjwvaDI+XHJcbiAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LXdoaXRlIGRlc2NcIj5PdXIgam91cm5leSBiZWdhbiBpbiBhIHNtYWxsIGdsYXNzaG91c2UsIGRyaXZlbiBieSB0aGUgZGVzaXJlIHRvIG1lcmdlXHJcbmFuY2llbnQgaGVyYmFsIHdpc2RvbSB3aXRoIG1vZGVybiBkZXJtYXRvbG9naWNhbCBzY2llbmNlLiBFdmVyeVxyXG5pbmdyZWRpZW50IGlzIGV0aGljYWxseSBoYXJ2ZXN0ZWQgYXQgaXRzIHBlYWsgcG90ZW5jeS48L3A+XHJcbiAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgIHJlZj1cImN0YUJ0blwiXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJFeHBsb3JlIE91ciBSb290c1wiXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICA6cm91bmRlZD1cInRydWVcIlxyXG4gICAgICAgICAgICAgIHNpemU9XCJsZ1wiXHJcbiAgICAgICAgICAgICAgdG89XCIvcHJvZHVjdHNcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwhLS0gVGVzdGltb25pYWxzIFNlY3Rpb24gLS0+XHJcbjxzZWN0aW9uIGNsYXNzPVwidGVzdGltb25pYWxzLXNlY3Rpb25cIj5cclxuIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICA8aDIgY2xhc3M9XCJ0ZXh0LWg0IHRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtY2VudGVyIHEtbWItbGdcIj5cclxuICAgIFdoYXQgT3VyIEN1c3RvbWVycyBTYXlcclxuICA8L2gyPlxyXG5cclxuPHEtY2Fyb3VzZWxcclxuICAgIHRhYmluZGV4PVwiMFwiXHJcbiAgICB2LWlmPVwiaXNIeWRyYXRlZFwiXHJcbiAgICA6a2V5PVwidGVzdGltb25pYWxDYXJvdXNlbEtleVwiXHJcbiAgdi1tb2RlbD1cInRlc3RpbW9uaWFsc1NsaWRlXCJcclxuICBAdG91Y2hzdGFydC5zdG9wXHJcbiAgICAgIEBtb3VzZWRvd24uc3RvcFxyXG4gICAgICBhbmltYXRlZFxyXG4gICAgICA6aW5maW5pdGU9XCJzaG93VGVzdGltb25pYWxDYXJvdXNlbENvbnRyb2xzXCJcclxuICAgICAgOm5hdmlnYXRpb249XCJzaG93VGVzdGltb25pYWxDYXJvdXNlbENvbnRyb2xzXCJcclxuICAgICAgc3dpcGVhYmxlXHJcbiAgICAgIDphcnJvd3M9XCJmYWxzZVwiXHJcbiAgaGVpZ2h0PVwiYXV0b1wiXHJcbiAgICAgIEBrZXlkb3duPVwib25LZXlkb3duX3Rlc3RpbW9uaWFsc1wiXHJcblxyXG4+XHJcbiAgPHEtY2Fyb3VzZWwtc2xpZGVcclxuICAgIHYtZm9yPVwiKGdyb3VwLCBzbGlkZUluZGV4KSBpbiB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzXCJcclxuICAgIDprZXk9XCJzbGlkZUluZGV4XCJcclxuICAgIDpuYW1lPVwic2xpZGVJbmRleFwiXHJcbiAgPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwiY29sLTEyIGNvbC1tZC00XCJcclxuICAgICAgICB2LWZvcj1cIih0ZXN0aW1vbmlhbCwgaW5kZXgpIGluIGdyb3VwXCJcclxuICAgICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInEtY2FyZCBxLXBhLW1kXCI+XHJcbjxhcnRpY2xlXHJcbiAgaXRlbXNjb3BlXHJcbiAgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUmV2aWV3XCJcclxuPlxyXG4gIDwhLS0gQXV0aG9yIC0tPlxyXG4gIDxoM1xyXG4gICAgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSBxLW1iLXNtXCJcclxuICAgIGl0ZW1wcm9wPVwiYXV0aG9yXCJcclxuICAgIGl0ZW1zY29wZVxyXG4gICAgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUGVyc29uXCJcclxuICA+XHJcbiAgICA8c3BhbiBpdGVtcHJvcD1cIm5hbWVcIj57eyB0ZXN0aW1vbmlhbC5uYW1lIH19PC9zcGFuPlxyXG4gIDwvaDM+XHJcblxyXG4gIDwhLS0gUmF0aW5nIC0tPlxyXG4gIDxkaXZcclxuICAgIGl0ZW1wcm9wPVwicmV2aWV3UmF0aW5nXCJcclxuICAgIGl0ZW1zY29wZVxyXG4gICAgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUmF0aW5nXCJcclxuICAgIGNsYXNzPVwicS1tYi1zbVwiXHJcbiAgPlxyXG4gICAgPG1ldGEgaXRlbXByb3A9XCJyYXRpbmdWYWx1ZVwiIDpjb250ZW50PVwidGVzdGltb25pYWwucmF0aW5nXCIgLz5cclxuICAgIDxtZXRhIGl0ZW1wcm9wPVwiYmVzdFJhdGluZ1wiIGNvbnRlbnQ9XCI1XCIgLz5cclxuXHJcbiAgICA8cS1yYXRpbmdcclxuICAgICAgOm1vZGVsLXZhbHVlPVwidGVzdGltb25pYWwucmF0aW5nID8/IDBcIlxyXG4gICAgICBzaXplPVwiMjBweFwiXHJcbiAgICAgIGNvbG9yPVwiYW1iZXJcIlxyXG4gICAgICA6aWNvbj1cIm1hdFN0YXJcIlxyXG4gICAgICByZWFkb25seVxyXG4gICAgLz5cclxuICA8L2Rpdj5cclxuXHJcbiAgPCEtLSBSZXZpZXcgdGV4dCAtLT5cclxuICA8cCBpdGVtcHJvcD1cInJldmlld0JvZHlcIiBjbGFzcz1cInRleHQtYm9keTJcIj5cclxuICAgIHt7IHRlc3RpbW9uaWFsLmZlZWRiYWNrIH19XHJcbiAgPC9wPlxyXG48L2FydGljbGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9xLWNhcm91c2VsLXNsaWRlPlxyXG5cclxuICAgIDwhLS0gS2VlcCB0aGUgbG9vazogYmluZCBidG5Qcm9wcywgYWRkIGFyaWEtbGFiZWwsIGtlZXAgdmlzdWFsIHN0eWxlIC0tPlxyXG4gIDx0ZW1wbGF0ZSB2LWlmPVwic2hvd1Rlc3RpbW9uaWFsQ2Fyb3VzZWxDb250cm9sc1wiICNuYXZpZ2F0aW9uLWljb249XCJ7IG5hbWUsIG9uQ2xpY2ssIGJ0blByb3BzIH1cIj5cclxuICAgIDxxLWJ0blxyXG4gICAgICB2LWJpbmQ9XCJidG5Qcm9wc1wiXHJcbiAgICAgIDpmbGF0PVwiZmFsc2VcIlxyXG4gICAgICA6Y29sb3I9XCJ0ZXN0aW1vbmlhbHNTbGlkZSA9PT0gbmFtZSA/ICdzZWNvbmRhcnknIDogJ3ByaW1hcnknXCJcclxuICAgICAgc2l6ZT1cInNtXCJcclxuICAgICAgOmljb249XCJudWxsXCJcclxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kOiB2YXIoLS1xLXNlY29uZGFyeSk7IGZvbnQtc2l6ZTogNXB4O3BhZGRpbmc6IDBcIlxyXG4gICAgICByb3VuZFxyXG4gICAgICBkZW5zZVxyXG4gICAgICA6YXJpYS1sYWJlbD1cImBHbyB0byBzbGlkZSAke25hbWUgKyAxfWBcIlxyXG4gICAgICBAY2xpY2s9XCJvbkNsaWNrXCJcclxuICAgIC8+XHJcbiAgPC90ZW1wbGF0ZT5cclxuXHJcbiAgPCEtLSBDdXN0b20gYXJyb3dzIHVzaW5nIHEtY2Fyb3VzZWwtY29udHJvbCAocG9zaXRpb25zIG1hdGNoIGRlZmF1bHQpIC0tPlxyXG4gIDx0ZW1wbGF0ZSB2LWlmPVwic2hvd1Rlc3RpbW9uaWFsQ2Fyb3VzZWxDb250cm9sc1wiICNjb250cm9sPlxyXG4gICAgPHEtY2Fyb3VzZWwtY29udHJvbCBwb3NpdGlvbj1cImxlZnRcIiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIDppY29uPVwibWF0Q2hldnJvbkxlZnRcIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBzbGlkZVwiXHJcbiAgICAgICAgZmxhdFxyXG4gICAgICAgIHJvdW5kXHJcbiAgICAgICAgZGVuc2VcclxuICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgQGNsaWNrPVwidGVzdGltb25pYWxzU2xpZGUgPSAoTnVtYmVyKHRlc3RpbW9uaWFsc1NsaWRlKSAtIDEgKyB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzLmxlbmd0aCkgJSB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzLmxlbmd0aFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3EtY2Fyb3VzZWwtY29udHJvbD5cclxuXHJcbiAgICA8cS1jYXJvdXNlbC1jb250cm9sIHBvc2l0aW9uPVwicmlnaHRcIiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIDppY29uPVwibWF0Q2hldnJvblJpZ2h0XCJcclxuICAgICAgICBhcmlhLWxhYmVsPVwiTmV4dCBzbGlkZVwiXHJcbiAgICAgICAgZmxhdFxyXG4gICAgICAgIHJvdW5kXHJcbiAgICAgICAgZGVuc2VcclxuICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgQGNsaWNrPVwidGVzdGltb25pYWxzU2xpZGUgPSAoTnVtYmVyKHRlc3RpbW9uaWFsc1NsaWRlKSArIDEpICUgdGVzdGltb25pYWxTbGlkZUNodW5rcy5sZW5ndGhcIlxyXG4gICAgICAvPlxyXG4gICAgPC9xLWNhcm91c2VsLWNvbnRyb2w+XHJcbiAgPC90ZW1wbGF0ZT5cclxuXHJcbjwvcS1jYXJvdXNlbD5cclxuICA8L2Rpdj5cclxuPC9zZWN0aW9uPlxyXG5cclxuICAgIDwhLS0gSW5zdGFncmFtIEZlZWQgU2VjdGlvbiAtLT5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwiaW5zdGFncmFtLXNlY3Rpb25cIiB2LW9uY2U+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPGgyIGNsYXNzPVwidGV4dC1oNCB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWNlbnRlciBxLW1iLWxnXCI+Rm9sbG93IFVzIG9uIEluc3RhZ3JhbTwvaDI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IGNvbC1tZC0zXCIgdi1mb3I9XCIocG9zdCwgaW5kZXgpIGluIGluc3RhZ3JhbVBvc3RzXCIgOmtleT1cImluZGV4XCI+XHJcbiAgICAgICAgICA8aW1nIHdpZHRoPVwiMjAwXCIgaGVpZ2h0PVwiMjAwXCIgOnNyYz1cInBvc3QuaW1hZ2VcIiA6YWx0PVwicG9zdC5jYXB0aW9uXCIgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnMgZnVsbC13aWR0aFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICA8IS0tIE5ld3NsZXR0ZXIgU2lnbnVwIFNlY3Rpb24gLS0+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cIm5ld3NsZXR0ZXItc2VjdGlvblwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHRleHQtY2VudGVyXCI+XHJcbiAgICAgIDxoMiBjbGFzcz1cInRleHQtaDQgdGV4dC13ZWlnaHQtbGlnaHQgcS1tYi1tZFwiPkpvaW4gdGhlIEdhcmRlbjwvaDI+XHJcbiAgICAgIDxwIGNsYXNzPVwidGV4dC1ib2R5MSBxLW1iLWxnXCI+UmVjZWl2ZSBvdXIgbW9udGhseSBKb3VybmFsIG9uIGJvdGFuaWNhbCB3ZWxsbmVzcywgcGx1cyAxNSUgb2ZmIHlvdXIgZmlyc3Qgcml0dWFsLjwvcD5cclxuICAgICAgPGxhYmVsIHYtaWY9XCIhaXNIeWRyYXRlZFwiIGNsYXNzPVwicS1maWVsZCByb3cgbm8td3JhcCBpdGVtcy1zdGFydCBxLWZpZWxkLS1maWxsZWQgcS1pbnB1dCBxLWZpZWxkLS1sYWJlbGVkIHN1YnNjcmliZS1lbWFpbC1pbnB1dCBxLW1iLW1kXCIgc3R5bGU9XCJcIj48IS0tLS0+PGRpdiBjbGFzcz1cInEtZmllbGRfX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIGNvbCBzZWxmLXN0cmV0Y2hcIj48ZGl2IGNsYXNzPVwicS1maWVsZF9fY29udHJvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcFwiIHRhYmluZGV4PVwiLTFcIj48ZGl2IGNsYXNzPVwicS1maWVsZF9fY29udHJvbC1jb250YWluZXIgY29sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwIHEtYW5jaG9yLS1za2lwXCI+PGlucHV0IGNsYXNzPVwicS1maWVsZF9fbmF0aXZlIHEtcGxhY2Vob2xkZXJcIiBzdHlsZT1cIlwiIHRhYmluZGV4PVwiMFwiIGFyaWEtbGFiZWw9XCJZb3VyIEVtYWlsXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiPjxkaXYgY2xhc3M9XCJxLWZpZWxkX19sYWJlbCBuby1wb2ludGVyLWV2ZW50cyBhYnNvbHV0ZSBlbGxpcHNpc1wiPllvdXIgRW1haWw8L2Rpdj48IS0tLS0+PC9kaXY+PC9kaXY+PCEtLS0tPjwvZGl2PjwhLS0tLT48L2xhYmVsPlxyXG4gICAgICA8cS1pbnB1dCB2LWVsc2UgZmlsbGVkIHYtbW9kZWw9XCJlbWFpbFwiIGxhYmVsPVwiWW91ciBlbWFpbCBhZGRyZXNzXCIgY2xhc3M9XCJzdWJzY3JpYmUtZW1haWwtaW5wdXQgcS1tYi1tZFwiIC8+XHJcbiAgICAgIDxidXR0b24gdi1pZj1cIiFpc0h5ZHJhdGVkXCIgY2xhc3M9XCJyb3VuZGVkIHEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tc3RhbmRhcmQgcS1idG4tLXJlY3RhbmdsZSBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSBxLWJ0bi0tYWN0aW9uYWJsZSBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZVwiIHN0eWxlPVwiXCIgdGFiaW5kZXg9XCIwXCIgdHlwZT1cImJ1dHRvblwiPjxzcGFuIGNsYXNzPVwicS1mb2N1cy1oZWxwZXJcIiB0YWJpbmRleD1cIi0xXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCBqdXN0aWZ5LWNlbnRlciByb3dcIj48c3BhbiBjbGFzcz1cImJsb2NrXCI+U3Vic2NyaWJlPC9zcGFuPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgPHEtYnRuIHYtZWxzZSA6cm91bmRlZD1cInRydWVcIiBsYWJlbD1cIlN1YnNjcmliZVwiIGNvbG9yPVwic2Vjb25kYXJ5XCIgdGV4dC1jb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJzdWJzY3JpYmVOZXdzbGV0dGVyXCIgLz5cclxuICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcblxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIHdhdGNoLCBjb21wdXRlZCwgdXNlU1NSQ29udGV4dCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgdXNlUXVhc2FyLCB1c2VNZXRhIH0gZnJvbSAncXVhc2FyJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gJ3Z1ZS1yb3V0ZXInIC8vIFN0YW5kYXJkIGltcG9ydCBpcyB0aW55XHJcbmltcG9ydCBwcm9kdWN0c1N0b3JlIGZyb20gJ3NyYy9zdG9yZXMvcHJvZHVjdHMnXHJcbmltcG9ydCB7IG1hdENoZXZyb25MZWZ0LCBtYXRDaGV2cm9uUmlnaHQsIG1hdFN0YXIgfSBmcm9tICdAcXVhc2FyL2V4dHJhcy9tYXRlcmlhbC1pY29ucydcclxuaW1wb3J0IHsgZGVmaW5lQXN5bmNDb21wb25lbnQgfSBmcm9tICd2dWUnXHJcbmltcG9ydCB7IGxvYWRQYWdlQ29uZmlnIH0gZnJvbSAnc3JjL3V0aWxzL2NvbmZpZy1sb2FkZXInXHJcbmltcG9ydCB7IHVzZUNhcm91c2VsS2V5Ym9hcmQgfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdXNlQ2Fyb3VzZWxLZXlib2FyZCdcclxuaW1wb3J0IFByb2R1Y3RDYXJkIGZyb20gJ3NyYy9jb21wb25lbnRzL1Byb2R1Y3RDYXJkLnZ1ZSdcclxuXHJcbi8vIEFkZCB0aGlzIGhlcmVcclxuXHJcbi8vIEluc3RlYWQgb2Ygc3RhbmRhcmQgaW1wb3J0cywgZG8gdGhpczpcclxuY29uc3QgUUNhcm91c2VsID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXInKS50aGVuKG0gPT4gbS5RQ2Fyb3VzZWwpKVxyXG5jb25zdCBRQ2Fyb3VzZWxTbGlkZSA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyJykudGhlbihtID0+IG0uUUNhcm91c2VsU2xpZGUpKVxyXG5jb25zdCBRQ2Fyb3VzZWxDb250cm9sID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXInKS50aGVuKG0gPT4gbS5RQ2Fyb3VzZWxDb250cm9sKSlcclxuY29uc3QgUUlucHV0ID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXInKS50aGVuKG0gPT4gbS5RSW5wdXQpKVxyXG5cclxuY29uc3QgaXNIeWRyYXRlZCA9IHJlZihmYWxzZSlcclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5cclxuLy8gU3luYyBkYXRhIGltbWVkaWF0ZWx5IHNvIHRoZSBzdGF0aWMgSFRNTCBpcyBjb3JyZWN0XHJcbmlmIChwcm9jZXNzLmVudi5DTElFTlQgJiYgd2luZG93Ll9fSE9NRV9QUk9EVUNUU19EQVRBX18gJiYgQXJyYXkuaXNBcnJheSh3aW5kb3cuX19IT01FX1BST0RVQ1RTX0RBVEFfXykpIHtcclxuICBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlID0gd2luZG93Ll9fSE9NRV9QUk9EVUNUU19EQVRBX19cclxufVxyXG5cclxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBTY3JvbGwgLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3Qgc2Nyb2xsVG9Qcm9kdWN0cyA9ICgpID0+IHt9XHJcbmRlZmluZUV4cG9zZSh7IHNjcm9sbFRvUHJvZHVjdHMgfSlcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFNFTyAtLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gSW5zaWRlIHlvdXIgUGFnZSBvciBMYXlvdXRcclxuZGVmaW5lT3B0aW9ucyh7XHJcbiAgYXN5bmMgcHJlRmV0Y2ggKHsgc3NyQ29udGV4dCwgY3VycmVudFJvdXRlIH0pIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0gUHJlRmV0Y2ggUnVubmluZyBmb3I6JywgY3VycmVudFJvdXRlLnBhdGgpXHJcbiAgICBjb25zdCB7ZmV0Y2hTZW9Gb3JQYXRofSA9IGF3YWl0IGltcG9ydCgnc3JjL2NvbXBvc2FibGVzL3VzZVNlbycpXHJcbiAgICAvKmNvbnN0IHNlbyA9IGF3YWl0IGZldGNoU2VvRm9yUGF0aCgnaG9tZXBhZ2UnKVxyXG4gICAgLy9jb25zdCBzZW8gPSBudWxsO1xyXG4gICAgLy8gMi4gRkVUQ0ggUFJPRFVDVFMgKFRoaXMgd2FzIG1pc3NpbmchKVxyXG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5wcmVGZXRjaFByb2R1Y3RzKCkqL1xyXG4gICAgLy8gRmlyZSBib3RoIHJlcXVlc3RzIGF0IHRoZSBzYW1lIHRpbWVcclxuICAgIGNvbnN0IGlzUHJldmlldyA9IGN1cnJlbnRSb3V0ZS5xdWVyeS5wcmV2aWV3ID09PSAndHJ1ZSdcclxuXHJcbiAgICBjb25zdCBbc2VvLCBjb25maWdEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgZmV0Y2hTZW9Gb3JQYXRoKCdob21lcGFnZScpLFxyXG4gICAgICBsb2FkUGFnZUNvbmZpZygnaG9tZScsIGlzUHJldmlldyksIC8vIFRoZSBoZWxwZXIgd2UnbGwgY3JlYXRlXHJcbiAgICBdKVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coY29uZmlnRGF0YSk7XHJcbiAgICAvLyAyLiBQcmVwYXJlIHRoZSBcIkxlYW5cIiBkYXRhXHJcbiAgICAvLyBXZSBvbmx5IG5lZWQgdGhlIGZpcnN0IDYgZm9yIHRoZSBob21lcGFnZSBjYXJvdXNlbFxyXG4gICAgLy9jb25zdCBsZWFuUHJvZHVjdHMgPSBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLnNsaWNlKDAsIDYpXHJcbiAgICBjb25zdCBmZWF0dXJlZElkcyA9IGNvbmZpZ0RhdGE/LmZlYXR1cmVkX3Byb2R1Y3RzIHx8IFtdXHJcbiAgICBjb25zdCBsZWFuUHJvZHVjdHMgPSBmZWF0dXJlZElkcy5sZW5ndGhcclxuICA/IGF3YWl0IHByb2R1Y3RzU3RvcmUuZ2V0QnlJZHMoZmVhdHVyZWRJZHMpXHJcbiAgOiBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLnNsaWNlKDAsIDYpXHJcblxyXG4gICAgaWYgKHNzckNvbnRleHQpIHtcclxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc3RhdGUgb2JqZWN0IGlmIGl0IGRvZXNuJ3QgZXhpc3RcclxuICAgICAgc3NyQ29udGV4dC5zZW9EYXRhID0gc2VvXHJcbiAgICAgIC8vIElOSkVDVCBQUk9EVUNUUyBIRVJFOlxyXG4gICAgICBzc3JDb250ZXh0LmhvbWVQcm9kdWN0c0RhdGEgPSBsZWFuUHJvZHVjdHNcclxuICAgICAgc3NyQ29udGV4dC5wYWdlQ29uZmlnID0gY29uZmlnRGF0YVxyXG4gICAgICAvLyAyLiBBdHRhY2ggaXQgdG8gdGhlIHJlbmRlcmVkIHN0YXRlIChmb3IgdGhlIGNvbXBvbmVudClcclxuICAgICAgc3NyQ29udGV4dC5oZXJvRGF0YSA9IHtcclxuICAgICAgICBzcmM6ICdodHRwczovL251eHQubWVpZGFubS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMTAvbmF0dXJhYmxvb20taGVyby1jb3Zlci0zMDB4MzAwLnBuZycsXHJcbiAgICAgICAgc3Jjc2V0OiAnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzEwL25hdHVyYWJsb29tLWhlcm8tY292ZXItMzAweDMwMC5wbmcgMzAwdyxodHRwczovL251eHQubWVpZGFubS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMTAvbmF0dXJhYmxvb20taGVyby1jb3Zlci03Njh4NTEyLnBuZyA3Njh3LGh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8xMC9uYXR1cmFibG9vbS1oZXJvLWNvdmVyLnBuZyAxMDI0dycsXHJcbiAgICAgICAgc2l6ZXM6ICcobWluLXdpZHRoOiA3NjhweCkgNTB2dywgY2FsYygxMDB2dyAtIDQwcHgpJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgaG9tZVNldHRpbmdzID0gcmVmKG51bGwpXHJcbmNvbnN0IHNlb0RhdGEgPSByZWYobnVsbClcclxuXHJcbi8vIDMuIEFQUExZIE1FVEFcclxudXNlTWV0YSgoKSA9PiB7XHJcbiAgY29uc3Qgc2VvID0gc2VvRGF0YS52YWx1ZTtcclxuXHJcbiAgLy8gSWYgZGF0YSBpc24ndCByZWFkeSB5ZXQsIHJldHVybiBhbiBlbXB0eSBvYmplY3Qgb3IganVzdCB0aGUgZGVmYXVsdCB0aXRsZS5cclxuICAvLyBUaGlzIHByZXZlbnRzIHRoZSBcIkZsaWNrZXJcIiBhbmQgYXZvaWRzIHRoZSBWdWUgd2FybmluZy5cclxuICBpZiAoIXNlbykge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgLy8gT25jZSBzZW9EYXRhLnZhbHVlIGlzIHBvcHVsYXRlZCwgUXVhc2FyIHdpbGwgYXV0b21hdGljYWxseVxyXG4gIC8vIGRldGVjdCB0aGUgY2hhbmdlIGFuZCB1cGRhdGUgdGhlIERPTS5cclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGU6IHNlby50aXRsZSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgcm9ib3RzOiB7IG5hbWU6ICdyb2JvdHMnLCBjb250ZW50OiBzZW8ucm9ib3RzLCBrZXk6ICdyb2JvdHMnIH0sXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB7IG5hbWU6ICdkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNlby5kZXNjcmlwdGlvbiwga2V5OiAnZGVzY3JpcHRpb24nIH0sXHJcbiAgICAgICdvZzp0aXRsZSc6IHsgcHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNlby50aXRsZSB9LFxyXG4gICAgICAnb2c6aW1hZ2UnOiB7IHByb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBzZW8ub2dfaW1hZ2UgfSxcclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuLyooKCkgPT4ge1xyXG4gIGNvbnN0IHNlbyA9IHNlb0RhdGEudmFsdWU7XHJcbiAgcmV0dXJuIHtcclxuICAgIHRpdGxlOiBzZW8/LnRpdGxlIHx8ICdOYXR1cmFCbG9vbScsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIHJvYm90czoge25hbWU6ICdyb2JvdHMnLCBjb250ZW50OiBzZW8/LnJvYm90cyB8fCAnaW5kZXgsIGZvbGxvdyd9LFxyXG4gICAgICBkZXNjcmlwdGlvbjoge25hbWU6ICdkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNlbz8uZGVzY3JpcHRpb259LFxyXG4gICAgICAnb2c6dGl0bGUnOiB7cHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNlbz8udGl0bGV9LFxyXG4gICAgICAnb2c6ZGVzY3JpcHRpb24nOiB7cHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNlbz8uZGVzY3JpcHRpb259LFxyXG4gICAgICAnb2c6aW1hZ2UnOiB7cHJvcGVydHk6ICdvZzppbWFnZScsIGNvbnRlbnQ6IHNlbz8ub2dfaW1hZ2V9LFxyXG4gICAgICAnb2c6dHlwZSc6IHtwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAnd2Vic2l0ZSd9LFxyXG4gICAgfVxyXG4gIH07XHJcbn0pOyovXHJcbi8vIDEuIFRIRSBTRVJWRVIgRklYIChGb3JjZSB0aGUgSFRNTCB0byBwb3B1bGF0ZSlcclxuaWYgKHByb2Nlc3MuZW52LlNFUlZFUikge1xyXG4gIGNvbnN0IHNzciA9IHVzZVNTUkNvbnRleHQoKVxyXG4gIGhvbWVTZXR0aW5ncy52YWx1ZSA9IHNzcj8ucGFnZUNvbmZpZyB8fCBudWxsXHJcbiAgc2VvRGF0YS52YWx1ZSA9IHNzcj8uc2VvRGF0YSB8fCBudWxsXHJcbn1cclxuXHJcblxyXG4vLyAtLS0gZmlsbCBTU1IgcGF5bG9hZCBmaXJzdCAoaWYgZXhpc3RzKSAtLS1cclxuXHJcbmNvbnN0IHZpc2libGVTdGF0aWNJdGVtcyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICBjb25zdCBpZHMgPSBob21lU2V0dGluZ3MudmFsdWU/LmZlYXR1cmVkX3Byb2R1Y3RzIHx8IFtdXHJcbiAgbGV0IGl0ZW1zID0gW11cclxuXHJcbiAgaWYgKGlkcyAmJiBpZHMubGVuZ3RoKSB7XHJcbiAgICAvLyDinIUgU1lOQyBGSU5EOiBUaGlzIGF2b2lkcyB0aGUgUHJvbWlzZSBpc3N1ZSBhbmQgZm9yY2VzIHRoZSBvcmRlciBvZiB0aGUgJ2lkcycgYXJyYXlcclxuICAgIGl0ZW1zID0gaWRzLm1hcChpZCA9PiB7XHJcbiAgICAgIHJldHVybiBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLmZpbmQocCA9PiBOdW1iZXIocC5pZCkgPT09IE51bWJlcihpZCkpXHJcbiAgICB9KS5maWx0ZXIoQm9vbGVhbilcclxuICB9XHJcblxyXG4gIC8vIEZhbGxiYWNrIHRvIGZpcnN0IDYgaWYgbm8gSURzIGFyZSBmb3VuZCAodG8gbWF0Y2ggcmVjb21wdXRlU2xpZGVzIGxvZ2ljKVxyXG4gIGlmICghaXRlbXMubGVuZ3RoKSB7XHJcbiAgICBpdGVtcyA9IChwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlIHx8IFtdKS5zbGljZSgwLCA2KVxyXG4gIH1cclxuXHJcbiAgLy8gV2Ugb25seSBzaG93IDMgaW4gdGhlIHN0YXRpYyB2aWV3XHJcbiAgY29uc3QgcmVzdWx0ID0gaXRlbXMuc2xpY2UoMCwgMylcclxuXHJcbiAgLy8gUGFkIHBsYWNlaG9sZGVyc1xyXG4gIHdoaWxlIChyZXN1bHQubGVuZ3RoIDwgMykge1xyXG4gICAgcmVzdWx0LnB1c2goeyBfX3BsYWNlaG9sZGVyOiB0cnVlLCBpZDogYHBsYWNlaG9sZGVyLSR7cmVzdWx0Lmxlbmd0aH1gIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0XHJcbn0pXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFNldHVwIC0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IEFQSV9CQVNFID0gaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX0JBU0VcclxuXHJcbmNvbnN0IHNsaWRlQ2h1bmtzID0gcmVmKFtdKVxyXG5jb25zdCB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzID0gcmVmKFtdKVxyXG5jb25zdCBzbGlkZSA9IHJlZigwKVxyXG5jb25zdCBjYXJvdXNlbEtleSA9IHJlZigwKVxyXG5jb25zdCB0ZXN0aW1vbmlhbENhcm91c2VsS2V5ID0gcmVmKDApXHJcbmNvbnN0IHByb2R1Y3RTZWN0aW9uID0gcmVmKG51bGwpXHJcbmNvbnN0IGN0YUJ0biA9IHJlZihudWxsKVxyXG5jb25zdCBlbWFpbCA9IHJlZignJylcclxuXHJcbi8vIEhlbHBlcjogY2h1bmsgYXJyYXlcclxuY29uc3QgZ2V0Q2h1bmtzID0gKGFycmF5LCBzaXplKSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSB8fCAhYXJyYXkubGVuZ3RoKSByZXR1cm4gW11cclxuICBjb25zdCBjaHVua3MgPSBbXVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IHNpemUpIGNodW5rcy5wdXNoKGFycmF5LnNsaWNlKGksIGkgKyBzaXplKSlcclxuICByZXR1cm4gY2h1bmtzXHJcbn1cclxuXHJcbi8vIFVQREFURSBUSElTIEZVTkNUSU9OOlxyXG5jb25zdCByZWNvbXB1dGVTbGlkZXMgPSBhc3luYyAoZm9yY2VSZW1vdW50ID0gZmFsc2UpID0+IHtcclxuICBpZiAoIWlzSHlkcmF0ZWQudmFsdWUpIHJldHVyblxyXG5cclxuICBpZiAoIXByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUubGVuZ3RoKSB7XHJcbiAgICBhd2FpdCBwcm9kdWN0c1N0b3JlLnByZUZldGNoUHJvZHVjdHMoJycsIHRydWUpXHJcbiAgfVxyXG5cclxuICBjb25zdCBpZHMgPSBob21lU2V0dGluZ3MudmFsdWU/LmZlYXR1cmVkX3Byb2R1Y3RzIHx8IFtdXHJcbiAgY29uc3QgYWxsUHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0c1N0b3JlLmdldEJ5SWRzKGlkcykgfHwgW11cclxuXHJcbiAgbGV0IGl0ZW1zID0gaWRzLmxlbmd0aFxyXG4gID8gaWRzLm1hcChpZCA9PiBhbGxQcm9kdWN0cy5maW5kKHAgPT4gcC5pZCA9PSBpZCkpLmZpbHRlcihCb29sZWFuKVxyXG4gIDogYWxsUHJvZHVjdHMuc2xpY2UoMCwgNilcclxuXHJcbiAgY29uc3QgY2h1bmtTaXplID0gJHEuc2NyZWVuLmx0LnNtID8gMSA6ICRxLnNjcmVlbi5sdC5tZCA/IDIgOiAzXHJcblxyXG4gIGlmKGNodW5rU2l6ZSA9PT0gMykge1xyXG4gICAgLy8gcGFkIHRvIGFsd2F5cyAzXHJcbiAgICB3aGlsZSAoaXRlbXMubGVuZ3RoIDwgMykge1xyXG4gICAgICBpdGVtcy5wdXNoKHtfX3BsYWNlaG9sZGVyOiB0cnVlLCBpZDogYHBsYWNlaG9sZGVyLSR7aXRlbXMubGVuZ3RofWB9KVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoZm9yY2VSZW1vdW50KSBjYXJvdXNlbEtleS52YWx1ZSsrXHJcblxyXG4gIHNsaWRlQ2h1bmtzLnZhbHVlID0gZ2V0Q2h1bmtzKGl0ZW1zLCBjaHVua1NpemUpXHJcbn1cclxuY29uc3Qgc2hvd0Nhcm91c2VsQ29udHJvbHMgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgcmV0dXJuIHNsaWRlQ2h1bmtzLnZhbHVlLmxlbmd0aCA+IDFcclxufSlcclxuXHJcbmNvbnN0IHRvdGFsUHJvZHVjdFNsaWRlcyA9IGNvbXB1dGVkKCgpID0+IHNsaWRlQ2h1bmtzLnZhbHVlLmxlbmd0aClcclxuXHJcbmNvbnN0IHsgb25LZXlkb3duOiBvbktleWRvd25fcHJvZHVjdHMgfSA9IHVzZUNhcm91c2VsS2V5Ym9hcmQoXHJcbiAgc2xpZGUsXHJcbiAgdG90YWxQcm9kdWN0U2xpZGVzXHJcbilcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gVGVzdGltb25pYWxzICYgSW5zdGFncmFtIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vY29uc3QgYXZhdGFyU1ZHID1cclxuICAnPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+IDxjaXJjbGUgY3g9XCI0MFwiIGN5PVwiNDBcIiByPVwiNDBcIiBmaWxsPVwiI0U4RjVFOVwiLz4gPGNpcmNsZSBjeD1cIjQwXCIgY3k9XCIzMFwiIHI9XCIxMlwiIGZpbGw9XCIjODFDNzg0XCIvPiA8cGF0aCBkPVwiTTIwIDYwYzAtMTAgOS0xOCAyMC0xOHMyMCA4IDIwIDE4SDIwelwiIGZpbGw9XCIjODFDNzg0XCIvPiA8L3N2Zz4nXHJcblxyXG5jb25zdCB0ZXN0aW1vbmlhbHMgPSByZWYoW1xyXG4gIHsgbmFtZTogJ0FsaWNlIEpvaG5zb24nLCBmZWVkYmFjazogJ05hdHVyYUJsb29tIHByb2R1Y3RzIGhhdmUgdHJhbnNmb3JtZWQgbXkgc2tpbmNhcmUgcm91dGluZSEnIH0sXHJcbiAgeyBuYW1lOiAnTWFyayBUaG9tcHNvbicsIGZlZWRiYWNrOiAnSSBsb3ZlIHRoZSBvcmdhbmljIGluZ3JlZGllbnRzIGFuZCBzdXN0YWluYWJsZSBwYWNrYWdpbmcuJyB9LFxyXG4gIHsgbmFtZTogJ1NvcGhpZSBMZWUnLCBmZWVkYmFjazogJ0Zhc3Qgc2hpcHBpbmcgYW5kIGV4Y2VsbGVudCBjdXN0b21lciBzZXJ2aWNlLicgfSxcclxuICB7IG5hbWU6ICdKb2huIERvZScsIGZlZWRiYWNrOiAnQW1hemluZyBxdWFsaXR5IScgfSxcclxuICB7IG5hbWU6ICdKYW5lIFNtaXRoJywgZmVlZGJhY2s6ICdXaWxsIGJ1eSBhZ2Fpbi4nIH1cclxuXSlcclxuXHJcbmNvbnN0IHRlc3RpbW9uaWFsc1NsaWRlID0gcmVmKDApXHJcblxyXG5jb25zdCByZWNvbXB1dGVUZXN0aW1vbmlhbFNsaWRlcyA9IGFzeW5jIChmb3JjZVJlbW91bnQgPSBmYWxzZSkgPT4ge1xyXG4gIGlmICghaXNIeWRyYXRlZC52YWx1ZSkgcmV0dXJuXHJcblxyXG4gIGlmICghdGVzdGltb25pYWxzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2h1bmtTaXplID0gJHEuc2NyZWVuLmx0LnNtID8gMSA6ICRxLnNjcmVlbi5sdC5tZCA/IDIgOiAzXHJcblxyXG4gIGlmIChmb3JjZVJlbW91bnQpIHRlc3RpbW9uaWFsQ2Fyb3VzZWxLZXkudmFsdWUrK1xyXG5cclxuICB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzLnZhbHVlID0gZ2V0Q2h1bmtzKHRlc3RpbW9uaWFscy52YWx1ZSwgY2h1bmtTaXplKVxyXG59XHJcblxyXG5jb25zdCBzaG93VGVzdGltb25pYWxDYXJvdXNlbENvbnRyb2xzID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gIHJldHVybiB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzLnZhbHVlLmxlbmd0aCA+IDFcclxufSlcclxuLy8gYXNzdW1pbmcgeW91IGFscmVhZHkgaGF2ZSB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzXHJcbmNvbnN0IHRvdGFsVGVzdGltb25pYWxTbGlkZXMgPSBjb21wdXRlZCgoKSA9PiB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzLnZhbHVlLmxlbmd0aClcclxuXHJcbmNvbnN0IHsgb25LZXlkb3duOiBvbktleWRvd25fdGVzdGltb25pYWxzIH0gPSB1c2VDYXJvdXNlbEtleWJvYXJkKFxyXG4gIHRlc3RpbW9uaWFsc1NsaWRlLFxyXG4gIHRvdGFsVGVzdGltb25pYWxTbGlkZXNcclxuKVxyXG5cclxuY29uc3QgaW5zdGFncmFtUG9zdHMgPSByZWYoW1xyXG4gIHsgaW1hZ2U6IGAke0FQSV9CQVNFfS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8wNS9wcm9jdWR0cy1jYXRhbG9nLWltZy5wbmdgLCBjYXB0aW9uOiAnT3VyIGxhdGVzdCBwcm9kdWN0IGxhdW5jaCEnIH0sXHJcbiAgeyBpbWFnZTogYCR7QVBJX0JBU0V9L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzA1L3Byb2N1ZHRzLWNhdGFsb2ctaW1nLnBuZ2AsIGNhcHRpb246ICdCZWhpbmQgdGhlIHNjZW5lcyBhdCBOYXR1cmFCbG9vbS4nIH0sXHJcbiAgeyBpbWFnZTogYCR7QVBJX0JBU0V9L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzA1L3Byb2N1ZHRzLWNhdGFsb2ctaW1nLnBuZ2AsIGNhcHRpb246ICdDdXN0b21lciBmYXZvcml0ZXMgdGhpcyBtb250aC4nIH0sXHJcbiAgeyBpbWFnZTogYCR7QVBJX0JBU0V9L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzA1L3Byb2N1ZHRzLWNhdGFsb2ctaW1nLnBuZ2AsIGNhcHRpb246ICdTdXN0YWluYWJsZSBwYWNrYWdpbmcgaW4gYWN0aW9uLicgfVxyXG5dKVxyXG5cclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tIEhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3Qgc3Vic2NyaWJlTmV3c2xldHRlciA9ICgpID0+IHtcclxuICBpZiAoZW1haWwudmFsdWUpIHtcclxuICAgICRxLm5vdGlmeSh7IHR5cGU6ICdwb3NpdGl2ZScsIG1lc3NhZ2U6ICdTdWJzY3JpYmVkIHN1Y2Nlc3NmdWxseSEnIH0pXHJcbiAgICBlbWFpbC52YWx1ZSA9ICcnXHJcbiAgfSBlbHNlIHtcclxuICAgICRxLm5vdGlmeSh7IHR5cGU6ICduZWdhdGl2ZScsIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbC4nIH0pXHJcbiAgfVxyXG59XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBNb3VudGVkIC0tLS0tLS0tLS0tLS0tLS0tXHJcbm9uTW91bnRlZChhc3luYygpID0+IHtcclxuICAgIGlmICh3aW5kb3cuX19QQUdFX0NPTkZJR19fICYmIE9iamVjdC5rZXlzKHdpbmRvdy5fX1BBR0VfQ09ORklHX18pLmxlbmd0aCkge1xyXG4gICAgICBob21lU2V0dGluZ3MudmFsdWUgPSB3aW5kb3cuX19QQUdFX0NPTkZJR19fXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpc1ByZXZpZXcgPSByb3V0ZS5xdWVyeS5wcmV2aWV3ID09PSAndHJ1ZSdcclxuICAgICAgLy8gVXNlIGl0IGRpcmVjdGx5XHJcbiAgICAgIGNvbnN0IGZyZXNoQ29uZmlnID0gYXdhaXQgbG9hZFBhZ2VDb25maWcoJ2hvbWUnLCBpc1ByZXZpZXcpXHJcbiAgICAgIGlmIChmcmVzaENvbmZpZykgaG9tZVNldHRpbmdzLnZhbHVlID0gZnJlc2hDb25maWdcclxuICAgIH1cclxuXHJcbmlzSHlkcmF0ZWQudmFsdWUgPSBmYWxzZVxyXG5cclxuICBpZiAocHJvY2Vzcy5lbnYuQ0xJRU5UKSB7XHJcbiAgICAvLyBJZiBpdCdzIGEgU1BBIG5hdmlnYXRpb24sIGh5ZHJhdGUgaW1tZWRpYXRlbHkgZm9yIFVYXHJcbiAgICAvL2NvbnN0IGhhc1NzckRhdGEgPSAhIXdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXztcclxuICAgIC8qIGlmIChwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLmxlbmd0aCA+IDAgJiYgIWhhc1NzckRhdGEpIHtcclxuICAgICAgaXNIeWRyYXRlZC52YWx1ZSA9IHRydWVcclxuICAgICAgcmVjb21wdXRlU2xpZGVzKClcclxuICAgICAgcmV0dXJuXHJcbiAgICB9Ki9cclxuXHJcbiAgICAvLyBDT0xEIFNUQVJUOiBXYWl0IGZvciB1c2VyIGludGVyYWN0aW9uXHJcbiAgICBjb25zdCBoeWRyYXRlT25JbnRlcmFjdGlvbiA9ICgpID0+IHtcclxuICAgICAgaWYgKGlzSHlkcmF0ZWQudmFsdWUpIHJldHVyblxyXG5cclxuICAgICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIENsZWFudXAgbGlzdGVuZXJzXHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGh5ZHJhdGVPbkludGVyYWN0aW9uKVxyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoeWRyYXRlT25JbnRlcmFjdGlvbilcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGh5ZHJhdGVPbkludGVyYWN0aW9uKVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICBpc0h5ZHJhdGVkLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJlY29tcHV0ZVNsaWRlcygpXHJcbiAgICAgICAgcmVjb21wdXRlVGVzdGltb25pYWxTbGlkZXMoKTtcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGh5ZHJhdGVPbkludGVyYWN0aW9uLCB7cGFzc2l2ZTogdHJ1ZX0pXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaHlkcmF0ZU9uSW50ZXJhY3Rpb24sIHtwYXNzaXZlOiB0cnVlfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaHlkcmF0ZU9uSW50ZXJhY3Rpb24sIHtwYXNzaXZlOiB0cnVlfSlcclxuXHJcbiAgICAvLyBTYWZldHkgZmFsbGJhY2s6IEh5ZHJhdGUgYWZ0ZXIgNSBzZWNvbmRzIGlmIG5vIGludGVyYWN0aW9uXHJcbiAgICBzZXRUaW1lb3V0KGh5ZHJhdGVPbkludGVyYWN0aW9uLCAzMDAwKVxyXG5cclxuICB9XHJcbn0pXHJcblxyXG53YXRjaChpc0h5ZHJhdGVkLCBhc3luYyAodmFsKSA9PiB7XHJcbiAgaWYgKCF2YWwpIHJldHVybjtcclxuXHJcbiAgdHJ5IHtcclxuXHJcbiAgICAvLyA0LiBVSSBJTklUSUFMSVpBVElPTlxyXG4gICAgLy8gTm93IHRoYXQgZGF0YSBpcyBndWFyYW50ZWVkIHRvIGJlIGluIHRoZSBzdG9yZSwgd2Ugc2V0dXAgdGhlIGNhcm91c2VsXHJcbiAgICBhd2FpdCByZWNvbXB1dGVTbGlkZXModHJ1ZSk7XHJcblxyXG4gICAgYXdhaXQgcmVjb21wdXRlVGVzdGltb25pYWxTbGlkZXModHJ1ZSk7XHJcbiAgICAvLyAxLiBEQVRBIEZFVENISU5HIChQYXJhbGxlbClcclxuICAgIGNvbnN0IHtmZXRjaFNlb0ZvclBhdGh9ID0gYXdhaXQgaW1wb3J0KCdzcmMvY29tcG9zYWJsZXMvdXNlU2VvJyk7XHJcbiAgICAvLyAyLiBTRU8gVVBEQVRFXHJcbiAgICBzZW9EYXRhLnZhbHVlID0gYXdhaXQgZmV0Y2hTZW9Gb3JQYXRoKCdob21lcGFnZScpO1xyXG5cclxuICAgIC8vIDUuIFJFU1BPTlNJVkUgTElTVEVORVJcclxuICAgIC8vIFdlIG9ubHkgc3RhcnQgbGlzdGVuaW5nIHRvIHNjcmVlbi9zdG9yZSBjaGFuZ2VzIEFGVEVSIGluaXRpYWwgaHlkcmF0aW9uIGlzIGRvbmVcclxuXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdIeWRyYXRpb24gZXJyb3I6JywgZXJyKTtcclxuICB9XHJcbn0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pO1xyXG5cclxud2F0Y2goXHJcbiAgWygpID0+IHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUsICgpID0+ICRxLnNjcmVlbi5uYW1lLCAoKSA9PiBob21lU2V0dGluZ3MudmFsdWVdLFxyXG4gICgpID0+IHtcclxuICAgIGlmICghaXNIeWRyYXRlZC52YWx1ZSkgcmV0dXJuXHJcbiAgICByZWNvbXB1dGVTbGlkZXModHJ1ZSlcclxuICAgIHJlY29tcHV0ZVRlc3RpbW9uaWFsU2xpZGVzKHRydWUpO1xyXG5cclxuICB9XHJcbilcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG4uaGVyby1zZWN0aW9uLXNlY3stLXRleHQ6IzFlMWUxZTstLW11dGVkOiM2ZjZmNmY7LyotLXByaW1hcnkxOiNmNmYyZTc7LS1wcmltYXJ5MjojZTlkZGM0Oy0tcHJpbWFyeTM6I2QwYzFhMzstLXByaW1hcnk0OiNiZmEwN2M7LS1wcmltYXJ5NTojYTg4MzYwOyovLS1jYXJkLXNoYWRvdzowIDEycHggNDBweCByZ2JhKDE2LDE2LDE2LDAuMDgpO3Bvc2l0aW9uOnJlbGF0aXZlO2luc2V0OjA7LypkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfS5oZXJvLXNlY3Rpb24tc2VjOmJlZm9yZXtjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt6LWluZGV4OjA7dG9wOjA7bGVmdDowO2JhY2tncm91bmQ6cmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAyMCUgMzAlLCNmZmYgMCx0cmFuc3BhcmVudCA2MCUpLHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgODAlIDcwJSxyZ2JhKDI1NSwyNTUsMjU1LC43KSAwLHRyYW5zcGFyZW50IDYwJSkscmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA1MCUgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjM4KSAwLCMwMDAwMDAwMCA2MCUpO2JhY2tncm91bmQtc2l6ZToyMDAlIDIwMCUqLyBiYWNrZ3JvdW5kOiB2YXIoLS1xLXByaW1hcnkpO30uaGVyby1zZWN0aW9ue3BhZGRpbmc6MCAyMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjt6LWluZGV4OjE7d2lkdGg6MTAwJX0uaGVyby1jb250ZW50IGgxe292ZXJmbG93LXdyYXA6YW55d2hlcmU7dGV4dC1pbmRlbnQ6LTRweDtmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjE0dnc7bGluZS1oZWlnaHQ6MS4xO21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjEycHg7ZGlzcGxheTpibG9ja30uaGVyby1jb250ZW50IC50ZXh0LWg2e21heC13aWR0aDo0NTBweDttYXJnaW4tYm90dG9tOjI0cHghaW1wb3J0YW50fS5sY3Atd3JhcHBlcntkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7YXNwZWN0LXJhdGlvOjMvMjtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyLXJhZGl1czo1MHB4Oy8qYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7Y29udGFpbjpwYWludDt0cmFuc2Zvcm06dHJhbnNsYXRlWigwKSovfS5oZXJvLWltZ3t3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6YmxvY2s7b2JqZWN0LWZpdDpjb3Zlcn0uaGVyby1jb250ZW50IGJ1dHRvbi5oZXJvLWJ0bntib3JkZXItcmFkaXVzOjUwcHg7cGFkZGluZzoxMHB4IDI0cHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOnZhcigtLXByaW1hcnktZ3JhZGllbnQpO2JvcmRlcjpub25lO2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2ZvbnQtd2VpZ2h0OjQwMDtoZWlnaHQ6NDRweDtkaXNwbGF5OmlubGluZS1mbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5oZXJvLWNvbnRlbnQgYnV0dG9uOmJlZm9yZXtjb250ZW50OlwiXCI7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtpbnNldDowO2JvcmRlci1yYWRpdXM6aW5oZXJpdDtib3gtc2hhZG93OjAgMXB4IDVweCByZ2JhKDAsMCwwLC4yKSwwIDJweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjEyKTt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjUsMSl9Lmhlcm8tY29udGVudCBidXR0b246aG92ZXIgLnEtZm9jdXMtaGVscGVye29wYWNpdHk6MX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmxjcC13cmFwcGVye3dpZHRoOjUwJX0uaGVyby1jb250ZW50IGgxe2ZvbnQtc2l6ZTo0cmVtfX1cclxuXHJcbkBrZXlmcmFtZXMgZ3JhZGllbnRBbmltYXRpb24ge1xyXG4gIDAlIHtiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwJSA1MCU7fVxyXG4gIDUwJSB7YmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSA1MCU7fVxyXG4gIDEwMCUge2JhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTt9XHJcbn1cclxuXHJcbnNlY3Rpb24uZmVhdHVyZWQtcHJvZHVjdHMge1xyXG4gICAgbWluLWhlaWdodDogNjY0cHg7XHJcbiAgYmFja2dyb3VuZDogI0Y4RjNFNDtcclxufVxyXG5cclxuZGl2LnEtaW1nX19sb2FkaW5nID4gc3Zne1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5teS1jYXJkIGltZyB7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxufVxyXG5cclxuLmhlcm8tY29udGVudCBidXR0b246aG92ZXIgLnEtZm9jdXMtaGVscGVyOmFmdGVyIHtcclxuICBvcGFjaXR5OiAwLjE1O1xyXG59XHJcblxyXG4ucHJlLWFuaW1hdGUge1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG59XHJcblxyXG4ubmV3c2xldHRlci1zZWN0aW9uLCAuaW5zdGFncmFtLXNlY3Rpb24ge1xyXG4gIGNvbnRlbnQtdmlzaWJpbGl0eTogYXV0bztcclxufVxyXG5cclxuLyogSE9NRVBBR0UgREVGRkVSRUQgQ1NTICovXHJcbi5jdGEtc2VjdGlvbiB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgbWluLWhlaWdodDogNDAwcHg7XHJcbiAgLypwYWRkaW5nOiAwOyovXHJcbiAgYmFja2dyb3VuZDogIzM0NTY0NjtcclxufVxyXG4uY3RhLXNlY3Rpb24gLmNvbnRhaW5lciB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG1heC13aWR0aDogMTUwMHB4O1xyXG59XHJcblxyXG4uY3RhLXNlY3Rpb24gLmN0YS1pbWcgaW1nIHtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcclxufVxyXG4uY3RhLW92ZXJsYXkge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAvKnotaW5kZXg6IDE7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgtNDVkZWcsICM0YzZlNWQ5NiwgdmFyKC0tcS1wcmltYXJ5KSwgIzRjNmU1ZDk2KTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IDYwMCUgNjAwJTtcclxuICBhbmltYXRpb246IG5vbmU7Ki9cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBwYWRkaW5nOiA0MHB4IDIwcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmN0YS1vdmVybGF5OmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IHVuc2V0O1xyXG4gICAgbGVmdDogYXV0bztcclxuICAgIHdpZHRoOiA0MDBweDtcclxuICAgIGhlaWdodDogNTAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzA1L3Byb2N1ZHRzLWNhdGFsb2ctaW1nLnBuZyk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBib3R0b206IC0zMCU7XHJcbiAgICB6LWluZGV4OiAtMTtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg1MCUpO1xyXG59XHJcbi5jdGEtb3ZlcmxheTpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLXEtcHJpbWFyeSk7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogYXV0bztcclxuICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gIHotaW5kZXg6IC0xO1xyXG4gIHRyYW5zaXRpb246IDFzO1xyXG59XHJcbi5jdGEtY29udGVudCB7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBtYXJnaW46IDAgYXV0byBhdXRvO1xyXG4gIHBhZGRpbmctdG9wOiA0MHB4O1xyXG59XHJcbi5jdGEtY29udGVudCAucHJlLXRpdGxlIHtcclxuIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuLmN0YS1jb250ZW50IC5kZXNjIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxufVxyXG5AbWVkaWEobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gIC5oZXJvLWNvbnRlbnQgaDEudGV4dC1oMSB7XHJcbiAgICBmb250LXNpemU6IDE0dnc7XHJcbiAgfVxyXG5cclxuICAuaGVyby1zZWN0aW9uIHtcclxuICAgIHBhZGRpbmc6IDBweDtcclxuICB9XHJcblxyXG59XHJcbkBtZWRpYShtYXgtd2lkdGg6IDEwMjNweCl7XHJcbiAgLmN0YS1vdmVybGF5IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgfVxyXG4gIC5jdGEtc2VjdGlvbiAuY3RhLWltZyBpbWcge1xyXG4gICAgbWF4LWhlaWdodDogMjAwcHg7XHJcbiAgfVxyXG59XHJcbkBtZWRpYShtaW4td2lkdGg6IDYwMHB4KSB7XHJcbiAgLnJvdy5qdXN0aWZ5LWJldHdlZW4gLmNvbC1tZC00IHtcclxuICAgIHdpZHRoOiBjYWxjKDEwMCUgLyAyIC0gMTBweCk7XHJcbiAgfVxyXG59XHJcbkBtZWRpYShtaW4td2lkdGg6IDEwMjRweCkge1xyXG4gIC5yb3cuanVzdGlmeS1iZXR3ZWVuIC5jb2wtbWQtNCB7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC8gMyAtIDEwcHgpO1xyXG4gIH1cclxuICAuaGVyby1jb250ZW50LmNvbC0xMi5jb2wtbWQtNi5xLW1iLWxnIHtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDM1cHg7XHJcbiAgfVxyXG5cclxuICAuY3RhLXNlY3Rpb24gLmN0YS1pbWcge1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICB9XHJcbiAgLmN0YS1jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDQwcHggMjBweDtcclxuICB9XHJcbn1cclxuXHJcbi8qLmN0YS1zZWN0aW9uOjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGluc2V0OiAwO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgYmxhY2ssIHRyYW5zcGFyZW50KTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMC42KSBibHVyKDJweCk7XHJcbiAgei1pbmRleDogMDtcclxufSovXHJcblxyXG5Aa2V5ZnJhbWVzIGdyYWRpZW50U2hpZnQge1xyXG4gIDAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlOyB9XHJcbiAgNTAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSA1MCU7IH1cclxuICAxMDAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlOyB9XHJcbn1cclxuXHJcbi5jdGEtb3ZlcmxheS5hbmltYXRlLWJnIHtcclxuICAgIGFuaW1hdGlvbjogZ3JhZGllbnRTaGlmdCAxMHMgZWFzZSBpbmZpbml0ZTtcclxufVxyXG5cclxuLmhlcm8tc2VjdGlvbi1zZWMuYW5pbWF0ZS1iZyB7XHJcbiAgICBhbmltYXRpb246IGdyYWRpZW50QW5pbWF0aW9uIDI1cyBlYXNlIGluZmluaXRlO1xyXG59XHJcblxyXG4udGVzdGltb25pYWxzLXNlY3Rpb24ge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLXEtcHJpbWFyeSk7XHJcbn1cclxuLnRlc3RpbW9uaWFscy1zZWN0aW9uIC5xLWNhcmQge1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xyXG4gIGJhY2tncm91bmQ6ICNGOEYzRTQ7XHJcbn1cclxuLnRlc3RpbW9uaWFscy1zZWN0aW9uIHEtY2FyZDpob3ZlciB7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xyXG59XHJcblxyXG4ubmV3c2xldHRlci1zZWN0aW9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkVGOUVBO1xyXG59XHJcbi5uZXdzbGV0dGVyLXNlY3Rpb24gLmNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiA4OTZweDtcclxuICBiYWNrZ3JvdW5kOiAjZTdlMmQ0O1xyXG4gIGJvcmRlci1yYWRpdXM6IDI4cHg7XHJcbiAgcGFkZGluZzogNzBweCAxNnB4O1xyXG59XHJcbi5uZXdzbGV0dGVyLXNlY3Rpb24gOmRlZXAoLnEtZmllbGRfX2NvbnRyb2wpIHtcclxuICBib3JkZXItcmFkaXVzOiAyOHB4O1xyXG59XHJcblxyXG4uaW5zdGFncmFtLXNlY3Rpb24ge1xyXG4gIGJhY2tncm91bmQ6ICNGOEYzRTQ7XHJcbn1cclxuLmluc3RhZ3JhbS1zZWN0aW9uIGltZyB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzO1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG59XHJcbi5pbnN0YWdyYW0tc2VjdGlvbiBpbWc6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7XHJcbn1cclxuXHJcbi5zdWJzY3JpYmUtZW1haWwtaW5wdXQge1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG59XHJcblxyXG48L3N0eWxlPlxyXG4iXSwiZmlsZSI6ImFzc2V0cy9JbmRleFBhZ2UtTFBuemxzMHAuanMifQ==