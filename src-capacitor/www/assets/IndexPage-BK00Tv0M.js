const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-B4eBuDfB.js","./index-CqsEWChN.css"])))=>i.map(i=>d[i]);
import { c as createComponent, ao as useFormProps, ap as useSizeProps, g as getCurrentInstance, aq as onBeforeUpdate, h, a as hMergeSlot, J as QIcon, ar as useSize, as as useFormInject, b as computed, m as between, at as stopAndPrevent, au as useFormAttrs, r as ref, _ as _export_sfc, p as openBlock, x as createElementBlock, v as createBaseVNode, q as createBlock, Q as QBtn, F as Fragment, y as renderList, a0 as createStaticVNode, av as createSlots, t as withCtx, z as createVNode, aw as mergeProps, ax as QCarouselControl, ay as QCarouselSlide, C as withModifiers, az as QCarousel, B as toDisplayString, A as createCommentVNode, aA as setBlockTracking, N as QInput, Y as __vitePreload, aB as loadPageConfig, aC as productsStore, a7 as useQuasar, a8 as useRoute, aD as useMeta, D as onMounted, i as watch, aE as ProductCard, aF as useSSRContext, aG as matStar, aH as matChevronRight, aI as matChevronLeft, K as normalizeClass } from "./index-B4eBuDfB.js";
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
    const API_BASE = "https://nuxt.meidanm.com";
    const { fetchSeoForPath } = await __vitePreload(async () => {
      const { fetchSeoForPath: fetchSeoForPath2 } = await import("./index-B4eBuDfB.js").then((n) => n.bS);
      return { fetchSeoForPath: fetchSeoForPath2 };
    }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url);
    const isPreview = currentRoute.query.preview === "true";
    const [seo, configData] = await Promise.all([
      fetchSeoForPath("homepage"),
      loadPageConfig("home", isPreview)
      // The helper we'll create
    ]);
    const featuredIds = configData?.featured_products || [];
    const leanProducts = featuredIds.length ? await productsStore.getFeaturedProducts(featuredIds) : await productsStore.preFetchProducts({ api: true, per_page: 6, dryRun: true }).then((r) => r.products);
    if (ssrContext) {
      ssrContext.seoData = seo;
      ssrContext.homeProductsData = leanProducts;
      ssrContext.pageConfig = configData;
      ssrContext.heroData = {
        src: `${API_BASE}/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png`,
        srcset: `${API_BASE}/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png 300w,${"https://nuxt.meidanm.com"}/wp-content/uploads/2025/10/naturabloom-hero-cover-768x512.png 768w,${"https://nuxt.meidanm.com"}/wp-content/uploads/2025/10/naturabloom-hero-cover.png 1024w`,
        sizes: "(min-width: 768px) 50vw, calc(100vw - 40px)"
      };
    } else {
      window.__PAGE_CONFIG__ = configData;
    }
  }
}, {
  __name: "IndexPage",
  setup(__props, { expose: __expose }) {
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
        },
        link: [
          {
            rel: "canonical",
            href: seo?.canonical || window?.location?.href || ""
          }
        ]
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
      const ids = homeSettings.value?.featured_products || [];
      if (ids.length) {
        const missing = ids.filter((id) => !productsStore.products.value.find((p) => p.id == id));
        if (missing.length) {
          await productsStore.getFeaturedProducts(missing);
        }
      } else if (!productsStore.products.value.length) {
        await productsStore.preFetchProducts({ api: true, per_page: 6, dryRun: false });
      }
      let items = ids.length ? ids.map((id) => productsStore.products.value.find((p) => p.id == id)).filter(Boolean) : productsStore.products.value.slice(0, 6);
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
    const visibleStaticTestimonials = computed(() => {
      const items = testimonials.value.slice(0, 3);
      while (items.length < 3) {
        items.push({ __placeholder: true, id: `placeholder-${items.length}` });
      }
      return items;
    });
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
            requestAnimationFrame(async () => {
              isHydrated.value = true;
            });
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
          const { fetchSeoForPath: fetchSeoForPath2 } = await import("./index-B4eBuDfB.js").then((n) => n.bS);
          return { fetchSeoForPath: fetchSeoForPath2 };
        }, true ? __vite__mapDeps([0,1]) : void 0, import.meta.url);
        seoData.value = await fetchSeoForPath("homepage");
      } catch (err) {
        console.error("Hydration error:", err);
      }
    });
    watch(
      [() => productsStore.products.value, () => $q.screen.name, () => homeSettings.value],
      () => {
        if (!isHydrated.value) return;
        recomputeSlides(false);
        recomputeTestimonialSlides(false);
      }
    );
    const __returned__ = { isHydrated, $q, route, scrollToProducts, homeSettings, seoData, visibleStaticItems, API_BASE, slideChunks, testimonialSlideChunks, slide, carouselKey, testimonialCarouselKey, productSection, ctaBtn, email, getChunks, recomputeSlides, showCarouselControls, totalProductSlides, onKeydown_products, testimonials, testimonialsSlide, recomputeTestimonialSlides, visibleStaticTestimonials, showTestimonialCarouselControls, totalTestimonialSlides, onKeydown_testimonials, instagramPosts, subscribeNewsletter, ref, onMounted, watch, computed, useSSRContext, get useQuasar() {
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
    }, get loadPageConfig() {
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
  key: 0,
  title: "Go to products page",
  class: "q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded bg-secondary text-primary q-btn--actionable q-focusable q-hoverable",
  tabindex: "0",
  href: "/products",
  style: { "font-size": "14px" }
};
const _hoisted_6 = { class: "lcp-wrapper col-12 col-md-6" };
const _hoisted_7 = ["src", "srcset"];
const _hoisted_8 = {
  ref: "productSection",
  class: "featured-products"
};
const _hoisted_9 = { class: "container" };
const _hoisted_10 = {
  key: 0,
  class: "q-carousel q-panel-parent q-carousel--without-padding q-carousel--navigation-bottom rounded-borders",
  style: { "height": "100%" }
};
const _hoisted_11 = { class: "q-carousel__slides-container" };
const _hoisted_12 = {
  class: "q-panel scroll",
  role: "tabpanel",
  style: { "--q-transition-duration": "300ms" }
};
const _hoisted_13 = { class: "q-carousel__slide" };
const _hoisted_14 = { class: "row justify-between" };
const _hoisted_15 = {
  key: 0,
  class: "q-card invisible-card"
};
const _hoisted_16 = {
  key: 1,
  class: "q-card my-card full-height"
};
const _hoisted_17 = ["src", "srcset", "sizes", "alt"];
const _hoisted_18 = { class: "q-card__section q-card__section--vert" };
const _hoisted_19 = ["innerHTML"];
const _hoisted_20 = { class: "q-card__actions justify-start q-card__actions--horiz row" };
const _hoisted_21 = { key: 0 };
const _hoisted_22 = {
  key: 1,
  class: "q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-secondary text-white q-btn--actionable",
  type: "button"
};
const _hoisted_23 = { class: "row justify-between" };
const _hoisted_24 = {
  key: 0,
  class: "q-card invisible-card"
};
const _hoisted_25 = { key: 1 };
const _hoisted_26 = { class: "cta-section" };
const _hoisted_27 = { class: "container" };
const _hoisted_28 = { class: "cta-overlay" };
const _hoisted_29 = { class: "cta-content" };
const _hoisted_30 = { class: "testimonials-section" };
const _hoisted_31 = { class: "container" };
const _hoisted_32 = {
  key: 0,
  class: "q-carousel q-panel-parent q-carousel--without-padding q-carousel--navigation-bottom rounded-borders",
  style: { "height": "100%" }
};
const _hoisted_33 = { class: "q-carousel__slides-container" };
const _hoisted_34 = {
  class: "q-panel scroll",
  role: "tabpanel",
  style: { "--q-transition-duration": "300ms" }
};
const _hoisted_35 = { class: "q-carousel__slide" };
const _hoisted_36 = { class: "row q-col-gutter-md" };
const _hoisted_37 = { class: "q-card q-pa-md" };
const _hoisted_38 = {
  itemscope: "",
  itemtype: "https://schema.org/Review"
};
const _hoisted_39 = {
  class: "text-subtitle1 q-mb-sm",
  itemprop: "author",
  itemscope: "",
  itemtype: "https://schema.org/Person"
};
const _hoisted_40 = { itemprop: "name" };
const _hoisted_41 = {
  itemprop: "reviewRating",
  itemscope: "",
  itemtype: "https://schema.org/Rating",
  class: "q-mb-sm"
};
const _hoisted_42 = ["content"];
const _hoisted_43 = {
  itemprop: "reviewBody",
  class: "text-body2"
};
const _hoisted_44 = { class: "row q-col-gutter-md" };
const _hoisted_45 = { class: "q-card q-pa-md" };
const _hoisted_46 = {
  itemscope: "",
  itemtype: "https://schema.org/Review"
};
const _hoisted_47 = {
  class: "text-subtitle1 q-mb-sm",
  itemprop: "author",
  itemscope: "",
  itemtype: "https://schema.org/Person"
};
const _hoisted_48 = { itemprop: "name" };
const _hoisted_49 = {
  itemprop: "reviewRating",
  itemscope: "",
  itemtype: "https://schema.org/Rating",
  class: "q-mb-sm"
};
const _hoisted_50 = ["content"];
const _hoisted_51 = {
  itemprop: "reviewBody",
  class: "text-body2"
};
const _hoisted_52 = { class: "container" };
const _hoisted_53 = { class: "row q-col-gutter-md" };
const _hoisted_54 = ["src", "alt"];
const _hoisted_55 = { class: "newsletter-section" };
const _hoisted_56 = { class: "container text-center" };
const _hoisted_57 = {
  key: 0,
  class: "q-field row no-wrap items-start q-field--filled q-input q-field--labeled subscribe-email-input q-mb-md",
  style: {}
};
const _hoisted_58 = {
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
          _cache[13] || (_cache[13] = createBaseVNode("p", { class: "text-h6 text-secondary text-weight-light" }, " Ethically sourced botanical formulations designed to nurture your skin’s natural radiance with high-potency organic ingredients. ", -1)),
          !$setup.isHydrated ? (openBlock(), createElementBlock("a", _hoisted_5, [..._cache[12] || (_cache[12] = [
            createBaseVNode("span", {
              class: "q-focus-helper",
              tabindex: "-1"
            }, null, -1),
            createBaseVNode("span", { class: "q-btn__content text-center col items-center q-anchor--skip justify-center row" }, [
              createBaseVNode("span", { class: "block" }, "Browse Products")
            ], -1)
          ])])) : (openBlock(), createBlock(QBtn, {
            key: 1,
            title: "Go to products page",
            label: "Browse Products",
            color: "secondary",
            "text-color": "primary",
            rounded: true,
            size: "md",
            to: "/products"
          }))
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("img", {
            fetchpriority: "high",
            loading: "eager",
            decoding: "async",
            alt: "Homepage hero image",
            src: `${$setup.API_BASE}/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png`,
            srcset: `${$setup.API_BASE}/wp-content/uploads/2025/10/naturabloom-hero-cover-300x300.png 300w,${$setup.API_BASE}/wp-content/uploads/2025/10/naturabloom-hero-cover-768x512.png 768w,${$setup.API_BASE}/wp-content/uploads/2025/10/naturabloom-hero-cover.png 1024w`,
            sizes: "(min-width: 768px) 50vw, calc(100vw - 40px)",
            width: "300",
            height: "200",
            class: "hero-img"
          }, null, 8, _hoisted_7)
        ])
      ])
    ]),
    createBaseVNode("section", _hoisted_8, [
      createBaseVNode("div", _hoisted_9, [
        _cache[16] || (_cache[16] = createBaseVNode("h2", {
          class: "text-weight-normal q-mb-md",
          style: { "color": "#1D1C13", "font-size": "41px" }
        }, "Featured Products", -1)),
        !$setup.isHydrated && $setup.productsStore.products.value.length ? (openBlock(), createElementBlock("div", _hoisted_10, [
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.visibleStaticItems, (product, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: product.id,
                      class: normalizeClass(["col-12 col-sm-6 col-md-4", { "gt-xs": index === 1, "gt-sm": index === 2 }])
                    }, [
                      product.__placeholder ? (openBlock(), createElementBlock("div", _hoisted_15)) : (openBlock(), createElementBlock("div", _hoisted_16, [
                        createBaseVNode("img", {
                          loading: "lazy",
                          width: "300",
                          height: "250",
                          src: product.images?.[0]?.src || "",
                          srcset: product.images?.[0]?.srcset || "",
                          sizes: product.images?.[0]?.sizes || "",
                          alt: product?.name || ""
                        }, null, 8, _hoisted_17),
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("div", null, toDisplayString(product?.name), 1),
                          createBaseVNode("div", {
                            class: "text-subtitle2",
                            innerHTML: product?.price_html
                          }, null, 8, _hoisted_19)
                        ]),
                        createBaseVNode("div", _hoisted_20, [
                          !product?.is_in_stock ? (openBlock(), createElementBlock("div", _hoisted_21, "Out of stock")) : (openBlock(), createElementBlock("button", _hoisted_22, [..._cache[14] || (_cache[14] = [
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
          _cache[15] || (_cache[15] = createStaticVNode('<div class="q-carousel__control absolute absolute-left flex items-center" style="margin:18px;" data-v-ab0e336d><button aria-label="Previous slide" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-primary q-btn--dense" type="button" data-v-ab0e336d><span class="q-btn__content text-center col items-center justify-center row" data-v-ab0e336d><i class="q-icon" data-v-ab0e336d><svg viewBox="0 0 24 24" data-v-ab0e336d><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" data-v-ab0e336d></path></svg></i></span></button></div><div class="q-carousel__control absolute absolute-right flex items-center" style="margin:18px;" data-v-ab0e336d><button aria-label="Next slide" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-primary q-btn--dense" type="button" data-v-ab0e336d><span class="q-btn__content text-center col items-center justify-center row" data-v-ab0e336d><i class="q-icon" data-v-ab0e336d><svg viewBox="0 0 24 24" data-v-ab0e336d><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" data-v-ab0e336d></path></svg></i></span></button></div>', 2))
        ])) : (openBlock(), createBlock(QCarousel, {
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
              return openBlock(), createBlock(QCarouselSlide, {
                key: `slide-${index}-${$setup.slideChunks.length}-${slideGroup.map((p) => p.id).join("-")}`,
                name: index
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_23, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(slideGroup, (fp) => {
                      return openBlock(), createElementBlock("div", {
                        key: fp.id,
                        class: "col-12 col-sm-6 col-md-4 relative-position"
                      }, [
                        fp.__placeholder ? (openBlock(), createElementBlock("div", _hoisted_24)) : (openBlock(), createElementBlock("div", _hoisted_25, [
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
              createVNode(QCarouselControl, {
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
              createVNode(QCarouselControl, {
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
    createBaseVNode("section", _hoisted_26, [
      createBaseVNode("div", _hoisted_27, [
        createBaseVNode("div", _hoisted_28, [
          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "cta-img" }, [
            createBaseVNode("img", {
              loading: "lazy",
              alt: "Forest view",
              src: "/cta-img.webp",
              width: "728",
              height: "500"
            })
          ], -1)),
          createBaseVNode("div", _hoisted_29, [
            _cache[17] || (_cache[17] = createBaseVNode("span", { class: "text-white pre-title" }, "The Botanical Ethos", -1)),
            _cache[18] || (_cache[18] = createBaseVNode("h2", { class: "text-h4 text-white q-mb-md" }, "Grown with Care, Crafted with Soul.", -1)),
            _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-white desc" }, "Our journey began in a small glasshouse, driven by the desire to merge ancient herbal wisdom with modern dermatological science. Every ingredient is ethically harvested at its peak potency.", -1)),
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
    createBaseVNode("section", _hoisted_30, [
      createBaseVNode("div", _hoisted_31, [
        _cache[23] || (_cache[23] = createBaseVNode("h2", { class: "text-h4 text-weight-light text-center q-mb-lg" }, " What Our Customers Say ", -1)),
        !$setup.isHydrated ? (openBlock(), createElementBlock("div", _hoisted_32, [
          createBaseVNode("div", _hoisted_33, [
            createBaseVNode("div", _hoisted_34, [
              createBaseVNode("div", _hoisted_35, [
                createBaseVNode("div", _hoisted_36, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.visibleStaticTestimonials, (testimonial, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: normalizeClass(["col-12 col-md-4", { "gt-xs": index === 1, "gt-sm": index === 2 }])
                    }, [
                      createBaseVNode("div", _hoisted_37, [
                        createBaseVNode("article", _hoisted_38, [
                          createBaseVNode("h3", _hoisted_39, [
                            createBaseVNode("span", _hoisted_40, toDisplayString(testimonial.name), 1)
                          ]),
                          createBaseVNode("div", _hoisted_41, [
                            createBaseVNode("meta", {
                              itemprop: "ratingValue",
                              content: testimonial.rating
                            }, null, 8, _hoisted_42),
                            _cache[21] || (_cache[21] = createBaseVNode("meta", {
                              itemprop: "bestRating",
                              content: "5"
                            }, null, -1))
                          ]),
                          createBaseVNode("p", _hoisted_43, toDisplayString(testimonial.feedback), 1)
                        ])
                      ])
                    ], 2);
                  }), 128))
                ])
              ])
            ])
          ])
        ])) : $setup.isHydrated ? (openBlock(), createBlock(QCarousel, {
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
              return openBlock(), createBlock(QCarouselSlide, {
                key: slideIndex,
                name: slideIndex
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_44, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group, (testimonial, index) => {
                      return openBlock(), createElementBlock("div", {
                        class: "col-12 col-md-4",
                        key: index
                      }, [
                        createBaseVNode("div", _hoisted_45, [
                          createBaseVNode("article", _hoisted_46, [
                            createBaseVNode("h3", _hoisted_47, [
                              createBaseVNode("span", _hoisted_48, toDisplayString(testimonial.name), 1)
                            ]),
                            createBaseVNode("div", _hoisted_49, [
                              createBaseVNode("meta", {
                                itemprop: "ratingValue",
                                content: testimonial.rating
                              }, null, 8, _hoisted_50),
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
                            createBaseVNode("p", _hoisted_51, toDisplayString(testimonial.feedback), 1)
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
              createVNode(QCarouselControl, {
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
              createVNode(QCarouselControl, {
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
      createBaseVNode("div", _hoisted_52, [
        _cache[24] || (_cache[24] = createBaseVNode("h2", { class: "text-h4 text-weight-light text-center q-mb-lg" }, "Follow Us on Instagram", -1)),
        createBaseVNode("div", _hoisted_53, [
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
              }, null, 8, _hoisted_54)
            ]);
          }), 128))
        ])
      ])
    ])).cacheIndex = 10, setBlockTracking(1), _cache[10]),
    createBaseVNode("section", _hoisted_55, [
      createBaseVNode("div", _hoisted_56, [
        _cache[27] || (_cache[27] = createBaseVNode("h2", { class: "text-h4 text-weight-light q-mb-md" }, "Join the Garden", -1)),
        _cache[28] || (_cache[28] = createBaseVNode("p", { class: "text-body1 q-mb-lg" }, "Receive our monthly Journal on botanical wellness, plus 15% off your first ritual.", -1)),
        !$setup.isHydrated ? (openBlock(), createElementBlock("label", _hoisted_57, [..._cache[25] || (_cache[25] = [
          createStaticVNode('<div class="q-field__inner relative-position col self-stretch" data-v-ab0e336d><div class="q-field__control relative-position row no-wrap" tabindex="-1" data-v-ab0e336d><div class="q-field__control-container col relative-position row no-wrap q-anchor--skip" data-v-ab0e336d><input class="q-field__native q-placeholder" style="" tabindex="0" aria-label="Your Email" type="text" value="" data-v-ab0e336d><div class="q-field__label no-pointer-events absolute ellipsis" data-v-ab0e336d>Your Email</div></div></div></div>', 1)
        ])])) : (openBlock(), createBlock(QInput, {
          key: 1,
          filled: "",
          modelValue: $setup.email,
          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.email = $event),
          label: "Your email address",
          class: "subscribe-email-input q-mb-md"
        }, null, 8, ["modelValue"])),
        !$setup.isHydrated ? (openBlock(), createElementBlock("button", _hoisted_58, [..._cache[26] || (_cache[26] = [
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
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ab0e336d"], ["__file", "IndexPage.vue"]]);
export {
  IndexPage as default
};


//# sourceMappingURL=data:application/json;base64,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Q2hGQSxnQkFJTSxPQUpOLGFBSU07QUFBQSxXQUhKQyxVQUFBLE9BQUFGLG1CQUVNSSxVQUFBLE1BQUFDLFdBRjhDLHVCQUFjLENBQTlCLE1BQU0sVUFBSztnQ0FBL0NMLG1CQUVNO0FBQUEsY0FGRCxPQUFNO0FBQUEsY0FBMEQsS0FBSztBQUFBO2NBQ3hFQyxnQkFBeUc7QUFBQSxnQkFBcEcsT0FBTTtBQUFBLGdCQUFNLFFBQU87QUFBQSxnQkFBTyxLQUFLLEtBQUs7QUFBQSxnQkFBUSxLQUFLLEtBQUs7QUFBQSxnQkFBUyxPQUFNO0FBQUE7Ozs7OztJQU9oRkEsZ0JBU1UsV0FUVixhQVNVO0FBQUEsTUFSUkEsZ0JBT0csT0FQSCxhQU9HO0FBQUEsUUFOSCw0QkFBQUEsZ0JBQWtFLFFBQTlELE9BQU0sdUNBQW9DLG1CQUFlO0FBQUEsUUFDN0QsNEJBQUFBLGdCQUFvSCxPQUFqSCxPQUFNLHdCQUFxQixzRkFBa0Y7QUFBQSxTQUNsRyxxQkFBZEMsVUFBQSxHQUFBRixtQkFBMG1CLFNBQTFtQixhQUEwbUI7QUFBQTs4QkFDMW1CRyxZQUEwRztBQUFBO1VBQTFGO0FBQUEsc0JBQWdCO0FBQUEsd0ZBQUs7QUFBQSxVQUFFLE9BQU07QUFBQSxVQUFxQixPQUFNO0FBQUE7U0FDekQscUJBQWZELFVBQUEsR0FBQUYsbUJBQStaLFVBQS9aLGFBQStaO0FBQUEsVUFBbE1DLGdCQUFrRDtBQUFBLFlBQTVDLE9BQU07QUFBQSxZQUFpQixVQUFTO0FBQUE7VUFBWUEsZ0JBQXVJLFVBQWpJLE9BQU0sbUZBQStFO0FBQUEsWUFBQ0EsZ0JBQW9DLFVBQTlCLE9BQU0sV0FBUSxXQUFTO0FBQUE7OEJBQ3hZRSxZQUFzSDtBQUFBO1VBQXZHLFNBQVM7QUFBQSxVQUFNLE9BQU07QUFBQSxVQUFZLE9BQU07QUFBQSxVQUFZLGNBQVc7QUFBQSxVQUFXLFNBQU87QUFBQSIsIm5hbWVzIjpbImZldGNoU2VvRm9yUGF0aCIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVWTm9kZSIsIl93aXRoQ3R4IiwiX21lcmdlUHJvcHMiXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcmF0aW5nL1FSYXRpbmcuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9zYWJsZXMvdXNlQ2Fyb3VzZWxLZXlib2FyZC5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9JbmRleFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIG9uQmVmb3JlVXBkYXRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtQXR0cnMsIHVzZUZvcm1JbmplY3QgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVJhdGluZycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTaXplUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgbWF4OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiA1XG4gICAgfSxcblxuICAgIGljb246IFsgU3RyaW5nLCBBcnJheSBdLFxuICAgIGljb25IYWxmOiBbIFN0cmluZywgQXJyYXkgXSxcbiAgICBpY29uU2VsZWN0ZWQ6IFsgU3RyaW5nLCBBcnJheSBdLFxuXG4gICAgaWNvbkFyaWFMYWJlbDogWyBTdHJpbmcsIEFycmF5IF0sXG5cbiAgICBjb2xvcjogWyBTdHJpbmcsIEFycmF5IF0sXG4gICAgY29sb3JIYWxmOiBbIFN0cmluZywgQXJyYXkgXSxcbiAgICBjb2xvclNlbGVjdGVkOiBbIFN0cmluZywgQXJyYXkgXSxcblxuICAgIG5vUmVzZXQ6IEJvb2xlYW4sXG4gICAgbm9EaW1taW5nOiBCb29sZWFuLFxuXG4gICAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gICAgZGlzYWJsZTogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG4gICAgY29uc3QgZm9ybUF0dHJzID0gdXNlRm9ybUF0dHJzKHByb3BzKVxuICAgIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gICAgY29uc3QgbW91c2VNb2RlbCA9IHJlZigwKVxuXG4gICAgbGV0IGljb25SZWZzID0ge31cblxuICAgIGNvbnN0IGVkaXRhYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlICYmIHByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXJhdGluZyByb3cgaW5saW5lIGl0ZW1zLWNlbnRlcidcbiAgICAgICsgYCBxLXJhdGluZy0tJHsgZWRpdGFibGUudmFsdWUgPT09IHRydWUgPyAnJyA6ICdub24tJyB9ZWRpdGFibGVgXG4gICAgICArIChwcm9wcy5ub0RpbW1pbmcgPT09IHRydWUgPyAnIHEtcmF0aW5nLS1uby1kaW1taW5nJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJycpXG4gICAgICArIChcbiAgICAgICAgcHJvcHMuY29sb3IgIT09IHZvaWQgMCAmJiBBcnJheS5pc0FycmF5KHByb3BzLmNvbG9yKSA9PT0gZmFsc2VcbiAgICAgICAgICA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YFxuICAgICAgICAgIDogJydcbiAgICAgIClcbiAgICApXG5cbiAgICBjb25zdCBpY29uRGF0YSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGljb25MZW4gPSBBcnJheS5pc0FycmF5KHByb3BzLmljb24pID09PSB0cnVlID8gcHJvcHMuaWNvbi5sZW5ndGggOiAwLFxuICAgICAgICBzZWxJY29uTGVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5pY29uU2VsZWN0ZWQpID09PSB0cnVlID8gcHJvcHMuaWNvblNlbGVjdGVkLmxlbmd0aCA6IDAsXG4gICAgICAgIGhhbGZJY29uTGVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5pY29uSGFsZikgPT09IHRydWUgPyBwcm9wcy5pY29uSGFsZi5sZW5ndGggOiAwLFxuICAgICAgICBjb2xvckxlbiA9IEFycmF5LmlzQXJyYXkocHJvcHMuY29sb3IpID09PSB0cnVlID8gcHJvcHMuY29sb3IubGVuZ3RoIDogMCxcbiAgICAgICAgc2VsQ29sb3JMZW4gPSBBcnJheS5pc0FycmF5KHByb3BzLmNvbG9yU2VsZWN0ZWQpID09PSB0cnVlID8gcHJvcHMuY29sb3JTZWxlY3RlZC5sZW5ndGggOiAwLFxuICAgICAgICBoYWxmQ29sb3JMZW4gPSBBcnJheS5pc0FycmF5KHByb3BzLmNvbG9ySGFsZikgPT09IHRydWUgPyBwcm9wcy5jb2xvckhhbGYubGVuZ3RoIDogMFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpY29uTGVuLFxuICAgICAgICBpY29uOiBpY29uTGVuID4gMCA/IHByb3BzLmljb25bIGljb25MZW4gLSAxIF0gOiBwcm9wcy5pY29uLFxuICAgICAgICBzZWxJY29uTGVuLFxuICAgICAgICBzZWxJY29uOiBzZWxJY29uTGVuID4gMCA/IHByb3BzLmljb25TZWxlY3RlZFsgc2VsSWNvbkxlbiAtIDEgXSA6IHByb3BzLmljb25TZWxlY3RlZCxcbiAgICAgICAgaGFsZkljb25MZW4sXG4gICAgICAgIGhhbGZJY29uOiBoYWxmSWNvbkxlbiA+IDAgPyBwcm9wcy5pY29uSGFsZlsgc2VsSWNvbkxlbiAtIDEgXSA6IHByb3BzLmljb25IYWxmLFxuICAgICAgICBjb2xvckxlbixcbiAgICAgICAgY29sb3I6IGNvbG9yTGVuID4gMCA/IHByb3BzLmNvbG9yWyBjb2xvckxlbiAtIDEgXSA6IHByb3BzLmNvbG9yLFxuICAgICAgICBzZWxDb2xvckxlbixcbiAgICAgICAgc2VsQ29sb3I6IHNlbENvbG9yTGVuID4gMCA/IHByb3BzLmNvbG9yU2VsZWN0ZWRbIHNlbENvbG9yTGVuIC0gMSBdIDogcHJvcHMuY29sb3JTZWxlY3RlZCxcbiAgICAgICAgaGFsZkNvbG9yTGVuLFxuICAgICAgICBoYWxmQ29sb3I6IGhhbGZDb2xvckxlbiA+IDAgPyBwcm9wcy5jb2xvckhhbGZbIGhhbGZDb2xvckxlbiAtIDEgXSA6IHByb3BzLmNvbG9ySGFsZlxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBpY29uTGFiZWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLmljb25BcmlhTGFiZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMuaWNvbkFyaWFMYWJlbC5sZW5ndGggIT09IDAgPyBgJHsgcHJvcHMuaWNvbkFyaWFMYWJlbCB9IGAgOiAnJ1xuICAgICAgICByZXR1cm4gaSA9PiBgJHsgbGFiZWwgfSR7IGkgfWBcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMuaWNvbkFyaWFMYWJlbCkgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaU1heCA9IHByb3BzLmljb25BcmlhTGFiZWwubGVuZ3RoXG5cbiAgICAgICAgaWYgKGlNYXggPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGkgPT4gcHJvcHMuaWNvbkFyaWFMYWJlbFsgTWF0aC5taW4oaSwgaU1heCkgLSAxIF1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGksIGxhYmVsKSA9PiBgJHsgbGFiZWwgfSAkeyBpIH1gXG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3RcbiAgICAgICAgYWNjID0gW10sXG4gICAgICAgIGljb25zID0gaWNvbkRhdGEudmFsdWUsXG4gICAgICAgIGNlaWwgPSBNYXRoLmNlaWwocHJvcHMubW9kZWxWYWx1ZSksXG4gICAgICAgIHRhYmluZGV4ID0gZWRpdGFibGUudmFsdWUgPT09IHRydWUgPyAwIDogbnVsbFxuXG4gICAgICBjb25zdCBoYWxmSW5kZXggPSBwcm9wcy5pY29uSGFsZiA9PT0gdm9pZCAwIHx8IGNlaWwgPT09IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgPyAtMVxuICAgICAgICA6IGNlaWxcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcHJvcHMubWF4OyBpKyspIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBhY3RpdmUgPSAobW91c2VNb2RlbC52YWx1ZSA9PT0gMCAmJiBwcm9wcy5tb2RlbFZhbHVlID49IGkpIHx8IChtb3VzZU1vZGVsLnZhbHVlID4gMCAmJiBtb3VzZU1vZGVsLnZhbHVlID49IGkpLFxuICAgICAgICAgIGhhbGYgPSBoYWxmSW5kZXggPT09IGkgJiYgbW91c2VNb2RlbC52YWx1ZSA8IGksXG4gICAgICAgICAgZXhTZWxlY3RlZCA9IG1vdXNlTW9kZWwudmFsdWUgPiAwICYmIChoYWxmID09PSB0cnVlID8gY2VpbCA6IHByb3BzLm1vZGVsVmFsdWUpID49IGkgJiYgbW91c2VNb2RlbC52YWx1ZSA8IGksXG4gICAgICAgICAgY29sb3IgPSBoYWxmID09PSB0cnVlXG4gICAgICAgICAgICA/IChpIDw9IGljb25zLmhhbGZDb2xvckxlbiA/IHByb3BzLmNvbG9ySGFsZlsgaSAtIDEgXSA6IGljb25zLmhhbGZDb2xvcilcbiAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAgIGljb25zLnNlbENvbG9yICE9PSB2b2lkIDAgJiYgYWN0aXZlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICA/IChpIDw9IGljb25zLnNlbENvbG9yTGVuID8gcHJvcHMuY29sb3JTZWxlY3RlZFsgaSAtIDEgXSA6IGljb25zLnNlbENvbG9yKVxuICAgICAgICAgICAgICAgICAgOiAoaSA8PSBpY29ucy5jb2xvckxlbiA/IHByb3BzLmNvbG9yWyBpIC0gMSBdIDogaWNvbnMuY29sb3IpXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgbmFtZSA9IChcbiAgICAgICAgICAgIGhhbGYgPT09IHRydWVcbiAgICAgICAgICAgICAgPyAoaSA8PSBpY29ucy5oYWxmSWNvbkxlbiA/IHByb3BzLmljb25IYWxmWyBpIC0gMSBdIDogaWNvbnMuaGFsZkljb24pXG4gICAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAgICAgaWNvbnMuc2VsSWNvbiAhPT0gdm9pZCAwICYmIChhY3RpdmUgPT09IHRydWUgfHwgZXhTZWxlY3RlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgPyAoaSA8PSBpY29ucy5zZWxJY29uTGVuID8gcHJvcHMuaWNvblNlbGVjdGVkWyBpIC0gMSBdIDogaWNvbnMuc2VsSWNvbilcbiAgICAgICAgICAgICAgICAgICAgOiAoaSA8PSBpY29ucy5pY29uTGVuID8gcHJvcHMuaWNvblsgaSAtIDEgXSA6IGljb25zLmljb24pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICkgfHwgJHEuaWNvblNldC5yYXRpbmcuaWNvblxuXG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiAoXG4gICAgICAgICAgICBoYWxmID09PSB0cnVlXG4gICAgICAgICAgICAgID8gKGkgPD0gaWNvbnMuaGFsZkljb25MZW4gPyBwcm9wcy5pY29uSGFsZlsgaSAtIDEgXSA6IGljb25zLmhhbGZJY29uKVxuICAgICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICAgIGljb25zLnNlbEljb24gIT09IHZvaWQgMCAmJiAoYWN0aXZlID09PSB0cnVlIHx8IGV4U2VsZWN0ZWQgPT09IHRydWUpXG4gICAgICAgICAgICAgICAgICAgID8gKGkgPD0gaWNvbnMuc2VsSWNvbkxlbiA/IHByb3BzLmljb25TZWxlY3RlZFsgaSAtIDEgXSA6IGljb25zLnNlbEljb24pXG4gICAgICAgICAgICAgICAgICAgIDogKGkgPD0gaWNvbnMuaWNvbkxlbiA/IHByb3BzLmljb25bIGkgLSAxIF0gOiBpY29ucy5pY29uKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICApIHx8ICRxLmljb25TZXQucmF0aW5nLmljb24sXG5cbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgdGFiaW5kZXgsXG4gICAgICAgICAgICByb2xlOiAncmFkaW8nLFxuICAgICAgICAgICAgJ2FyaWEtY2hlY2tlZCc6IHByb3BzLm1vZGVsVmFsdWUgPT09IGkgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBpY29uTGFiZWwudmFsdWUoaSwgbmFtZSlcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgaWNvbkNsYXNzOiAncS1yYXRpbmdfX2ljb24nXG4gICAgICAgICAgICArIChhY3RpdmUgPT09IHRydWUgfHwgaGFsZiA9PT0gdHJ1ZSA/ICcgcS1yYXRpbmdfX2ljb24tLWFjdGl2ZScgOiAnJylcbiAgICAgICAgICAgICsgKGV4U2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtcmF0aW5nX19pY29uLS1leHNlbGVjdGVkJyA6ICcnKVxuICAgICAgICAgICAgKyAobW91c2VNb2RlbC52YWx1ZSA9PT0gaSA/ICcgcS1yYXRpbmdfX2ljb24tLWhvdmVyZWQnIDogJycpXG4gICAgICAgICAgICArIChjb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IGNvbG9yIH1gIDogJycpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0geyByb2xlOiAncmFkaW9ncm91cCcgfVxuXG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhdHRyc1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSkge1xuICAgICAgICBhdHRyc1sgJ2FyaWEtcmVhZG9ubHknIF0gPSAndHJ1ZSdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldCAodmFsdWUpIHtcbiAgICAgIGlmIChlZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIG1vZGVsID0gYmV0d2VlbihwYXJzZUludCh2YWx1ZSwgMTApLCAxLCBwYXJzZUludChwcm9wcy5tYXgsIDEwKSksXG4gICAgICAgICAgbmV3VmFsID0gcHJvcHMubm9SZXNldCAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlID09PSBtb2RlbCA/IDAgOiBtb2RlbFxuXG4gICAgICAgIG5ld1ZhbCAhPT0gcHJvcHMubW9kZWxWYWx1ZSAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5ld1ZhbClcbiAgICAgICAgbW91c2VNb2RlbC52YWx1ZSA9IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRIb3ZlclZhbHVlICh2YWx1ZSkge1xuICAgICAgaWYgKGVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIG1vdXNlTW9kZWwudmFsdWUgPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUsIGkpIHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgc2V0KGkpXG4gICAgICAgICAgcmV0dXJuIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGNhc2UgMzc6IC8vIExFRlQgQVJST1dcbiAgICAgICAgY2FzZSA0MDogLy8gRE9XTiBBUlJPV1xuICAgICAgICAgIGlmIChpY29uUmVmc1sgYHJ0JHsgaSAtIDEgfWAgXSkge1xuICAgICAgICAgICAgaWNvblJlZnNbIGBydCR7IGkgLSAxIH1gIF0uZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgY2FzZSAzOTogLy8gUklHSFQgQVJST1dcbiAgICAgICAgY2FzZSAzODogLy8gVVAgQVJST1dcbiAgICAgICAgICBpZiAoaWNvblJlZnNbIGBydCR7IGkgKyAxIH1gIF0pIHtcbiAgICAgICAgICAgIGljb25SZWZzWyBgcnQkeyBpICsgMSB9YCBdLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRNb3VzZU1vZGVsICgpIHtcbiAgICAgIG1vdXNlTW9kZWwudmFsdWUgPSAwXG4gICAgfVxuXG4gICAgb25CZWZvcmVVcGRhdGUoKCkgPT4ge1xuICAgICAgaWNvblJlZnMgPSB7fVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBzdGFycy52YWx1ZS5mb3JFYWNoKCh7IGljb25DbGFzcywgbmFtZSwgYXR0cnMgfSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgaSA9IGluZGV4ICsgMVxuXG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAga2V5OiBpLFxuICAgICAgICAgICAgcmVmOiBlbCA9PiB7IGljb25SZWZzWyBgcnQkeyBpIH1gIF0gPSBlbCB9LFxuICAgICAgICAgICAgY2xhc3M6ICdxLXJhdGluZ19faWNvbi1jb250YWluZXIgZmxleCBmbGV4LWNlbnRlcicsXG4gICAgICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgICAgIG9uQ2xpY2sgKCkgeyBzZXQoaSkgfSxcbiAgICAgICAgICAgIG9uTW91c2VvdmVyICgpIHsgc2V0SG92ZXJWYWx1ZShpKSB9LFxuICAgICAgICAgICAgb25Nb3VzZW91dDogcmVzZXRNb3VzZU1vZGVsLFxuICAgICAgICAgICAgb25Gb2N1cyAoKSB7IHNldEhvdmVyVmFsdWUoaSkgfSxcbiAgICAgICAgICAgIG9uQmx1cjogcmVzZXRNb3VzZU1vZGVsLFxuICAgICAgICAgICAgb25LZXl1cCAoZSkgeyBvbktleXVwKGUsIGkpIH1cbiAgICAgICAgICB9LCBoTWVyZ2VTbG90KFxuICAgICAgICAgICAgc2xvdHNbIGB0aXAtJHsgaSB9YCBdLFxuICAgICAgICAgICAgWyBoKFFJY29uLCB7IGNsYXNzOiBpY29uQ2xhc3MsIG5hbWUgfSkgXVxuICAgICAgICAgICkpXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICAgIGlmIChwcm9wcy5uYW1lICE9PSB2b2lkIDAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpbmplY3RGb3JtSW5wdXQoY2hpbGQsICdwdXNoJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWVcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImV4cG9ydCBmdW5jdGlvbiB1c2VDYXJvdXNlbEtleWJvYXJkKHNsaWRlUmVmLCB0b3RhbFNsaWRlc1JlZikge1xyXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XHJcbiAgICBzd2l0Y2ggKGUua2V5KSB7XHJcbiAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxyXG4gICAgICAgIHNsaWRlUmVmLnZhbHVlID1cclxuICAgICAgICAgIChzbGlkZVJlZi52YWx1ZSArIDEpICUgdG90YWxTbGlkZXNSZWYudmFsdWVcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcclxuICAgICAgICBzbGlkZVJlZi52YWx1ZSA9XHJcbiAgICAgICAgICAoc2xpZGVSZWYudmFsdWUgLSAxICsgdG90YWxTbGlkZXNSZWYudmFsdWUpICUgdG90YWxTbGlkZXNSZWYudmFsdWVcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSAnSG9tZSc6XHJcbiAgICAgICAgc2xpZGVSZWYudmFsdWUgPSAwXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgJ0VuZCc6XHJcbiAgICAgICAgc2xpZGVSZWYudmFsdWUgPSB0b3RhbFNsaWRlc1JlZi52YWx1ZSAtIDFcclxuICAgICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG9uS2V5ZG93blxyXG4gIH1cclxufSIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG48c2VjdGlvbiBjbGFzcz1cImhlcm8tc2VjdGlvbi1zZWNcIj5cclxuICA8ZGl2IGNsYXNzPVwiaGVyby1zZWN0aW9uIGNvbnRhaW5lciBoZXJvLW1hcmdpbiByb3dcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVyby1jb250ZW50IGNvbC0xMiBjb2wtbWQtNiBxLW1iLWxnXCI+XHJcbiAgICAgIDxoMSBjbGFzcz1cInRleHQtaDEgdGV4dC1zZWNvbmRhcnkgc3RhYmxlLXRleHRcIiB2LWh0bWw9XCJob21lU2V0dGluZ3M/Lmhlcm9fdGl0bGVcIj48L2gxPlxyXG4gICAgICA8cCBjbGFzcz1cInRleHQtaDYgdGV4dC1zZWNvbmRhcnkgdGV4dC13ZWlnaHQtbGlnaHRcIj5cclxuICAgICAgICBFdGhpY2FsbHkgc291cmNlZCBib3RhbmljYWwgZm9ybXVsYXRpb25zIGRlc2lnbmVkIHRvIG51cnR1cmUgeW91ciBza2lu4oCZcyBuYXR1cmFsIHJhZGlhbmNlIHdpdGggaGlnaC1wb3RlbmN5IG9yZ2FuaWMgaW5ncmVkaWVudHMuXHJcbiAgICAgIDwvcD5cclxuXHJcbiAgICAgIDxhIHYtaWY9XCIhaXNIeWRyYXRlZFwiIHRpdGxlPVwiR28gdG8gcHJvZHVjdHMgcGFnZVwiIGNsYXNzPVwicS1idG4gcS1idG4taXRlbSBub24tc2VsZWN0YWJsZSBuby1vdXRsaW5lIHEtYnRuLS1zdGFuZGFyZCBxLWJ0bi0tcmVjdGFuZ2xlIHEtYnRuLS1yb3VuZGVkIGJnLXNlY29uZGFyeSB0ZXh0LXByaW1hcnkgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGVcIiB0YWJpbmRleD1cIjBcIiBocmVmPVwiL3Byb2R1Y3RzXCIgc3R5bGU9XCJmb250LXNpemU6IDE0cHg7XCI+PHNwYW4gY2xhc3M9XCJxLWZvY3VzLWhlbHBlclwiIHRhYmluZGV4PVwiLTFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwIGp1c3RpZnktY2VudGVyIHJvd1wiPjxzcGFuIGNsYXNzPVwiYmxvY2tcIj5Ccm93c2UgUHJvZHVjdHM8L3NwYW4+PC9zcGFuPjwvYT5cclxuICAgICAgPHEtYnRuIHYtZWxzZVxyXG4gICAgICAgICAgICAgdGl0bGU9XCJHbyB0byBwcm9kdWN0cyBwYWdlXCJcclxuICAgICAgICAgICAgICBsYWJlbD1cIkJyb3dzZSBQcm9kdWN0c1wiXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgIHRleHQtY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICA6cm91bmRlZD1cInRydWVcIlxyXG4gICAgICAgICAgICAgIHNpemU9XCJtZFwiXHJcbiAgICAgICAgICAgICAgdG89XCIvcHJvZHVjdHNcIlxyXG4gICAgICAgICAgICAvPlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJsY3Atd3JhcHBlciBjb2wtMTIgY29sLW1kLTZcIj5cclxuICAgICAgPGltZ1xyXG4gICAgICAgIGZldGNocHJpb3JpdHk9XCJoaWdoXCJcclxuICAgICAgICBsb2FkaW5nPVwiZWFnZXJcIlxyXG4gICAgICAgIGRlY29kaW5nPVwiYXN5bmNcIlxyXG4gICAgICAgIGFsdD1cIkhvbWVwYWdlIGhlcm8gaW1hZ2VcIlxyXG4gICAgICAgIDpzcmM9XCJgJHtBUElfQkFTRX0vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMTAvbmF0dXJhYmxvb20taGVyby1jb3Zlci0zMDB4MzAwLnBuZ2BcIlxyXG4gICAgICAgIDpzcmNzZXQ9XCJgJHtBUElfQkFTRX0vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMTAvbmF0dXJhYmxvb20taGVyby1jb3Zlci0zMDB4MzAwLnBuZyAzMDB3LCR7QVBJX0JBU0V9L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzEwL25hdHVyYWJsb29tLWhlcm8tY292ZXItNzY4eDUxMi5wbmcgNzY4dywke0FQSV9CQVNFfS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8xMC9uYXR1cmFibG9vbS1oZXJvLWNvdmVyLnBuZyAxMDI0d2BcIlxyXG4gICAgICAgIHNpemVzPVwiKG1pbi13aWR0aDogNzY4cHgpIDUwdncsIGNhbGMoMTAwdncgLSA0MHB4KVwiXHJcbiAgICAgICAgd2lkdGg9XCIzMDBcIlxyXG4gICAgICAgIGhlaWdodD1cIjIwMFwiXHJcbiAgICAgICAgY2xhc3M9XCJoZXJvLWltZ1wiXHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9zZWN0aW9uPlxyXG5cclxuPCEtLSBGZWF0dXJlZCBQcm9kdWN0cyBTbGlkZXIgLS0+XHJcbjxzZWN0aW9uIHJlZj1cInByb2R1Y3RTZWN0aW9uXCIgY2xhc3M9XCJmZWF0dXJlZC1wcm9kdWN0c1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxoMiBjbGFzcz1cInRleHQtd2VpZ2h0LW5vcm1hbCBxLW1iLW1kXCIgc3R5bGU9XCJjb2xvcjogIzFEMUMxMzsgZm9udC1zaXplOiA0MXB4O1wiPkZlYXR1cmVkIFByb2R1Y3RzPC9oMj5cclxuPGRpdiB2LWlmPVwiIWlzSHlkcmF0ZWQgJiYgcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZS5sZW5ndGhcIiBjbGFzcz1cInEtY2Fyb3VzZWwgcS1wYW5lbC1wYXJlbnQgcS1jYXJvdXNlbC0td2l0aG91dC1wYWRkaW5nIHEtY2Fyb3VzZWwtLW5hdmlnYXRpb24tYm90dG9tIHJvdW5kZWQtYm9yZGVyc1wiIHN0eWxlPVwiaGVpZ2h0OiAxMDAlO1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJxLWNhcm91c2VsX19zbGlkZXMtY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicS1wYW5lbCBzY3JvbGxcIiByb2xlPVwidGFicGFuZWxcIiBzdHlsZT1cIi0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAzMDBtcztcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInEtY2Fyb3VzZWxfX3NsaWRlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cclxuXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHYtZm9yPVwiKHByb2R1Y3QsIGluZGV4KSBpbiB2aXNpYmxlU3RhdGljSXRlbXNcIlxyXG4gICAgICAgICAgICA6a2V5PVwicHJvZHVjdC5pZFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiY29sLTEyIGNvbC1zbS02IGNvbC1tZC00XCJcclxuICAgICAgICAgICAgOmNsYXNzPVwieyAnZ3QteHMnOiBpbmRleCA9PT0gMSwgJ2d0LXNtJzogaW5kZXggPT09IDIgfVwiXHJcbiAgICAgICAgICA+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJwcm9kdWN0Ll9fcGxhY2Vob2xkZXJcIiBjbGFzcz1cInEtY2FyZCBpbnZpc2libGUtY2FyZFwiPjwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJxLWNhcmQgbXktY2FyZCBmdWxsLWhlaWdodFwiPlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgbG9hZGluZz1cImxhenlcIlxyXG4gICAgICAgICAgICAgICAgd2lkdGg9XCIzMDBcIlxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMjUwXCJcclxuICAgICAgICAgICAgICAgIDpzcmM9XCJwcm9kdWN0LmltYWdlcz8uWzBdPy5zcmN8fCAnJ1wiXHJcbiAgICAgICAgICAgICAgICA6c3Jjc2V0PVwicHJvZHVjdC5pbWFnZXM/LlswXT8uc3Jjc2V0IHx8ICcnXCJcclxuICAgICAgICAgICAgICAgIDpzaXplcz1cInByb2R1Y3QuaW1hZ2VzPy5bMF0/LnNpemVzIHx8ICcnXCJcclxuICAgICAgICAgICAgICAgIDphbHQ9XCJwcm9kdWN0Py5uYW1lIHx8ICcnXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtY2FyZF9fc2VjdGlvbiBxLWNhcmRfX3NlY3Rpb24tLXZlcnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3sgcHJvZHVjdD8ubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyXCIgdi1odG1sPVwicHJvZHVjdD8ucHJpY2VfaHRtbFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWNhcmRfX2FjdGlvbnMganVzdGlmeS1zdGFydCBxLWNhcmRfX2FjdGlvbnMtLWhvcml6IHJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXByb2R1Y3Q/LmlzX2luX3N0b2NrXCI+T3V0IG9mIHN0b2NrPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHYtZWxzZVxyXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tc3RhbmRhcmQgcS1idG4tLXJlY3RhbmdsZSBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSBxLWJ0bi0tYWN0aW9uYWJsZVwiXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInEtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibG9ja1wiPkFkZCB0byBDYXJ0PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicS1jYXJvdXNlbF9fY29udHJvbCBhYnNvbHV0ZSBhYnNvbHV0ZS1sZWZ0IGZsZXggaXRlbXMtY2VudGVyXCIgc3R5bGU9XCJtYXJnaW46IDE4cHg7XCI+XHJcbiAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJQcmV2aW91cyBzbGlkZVwiIGNsYXNzPVwicS1idG4gcS1idG4taXRlbSBub24tc2VsZWN0YWJsZSBuby1vdXRsaW5lIHEtYnRuLS1mbGF0IHEtYnRuLS1yb3VuZCB0ZXh0LXByaW1hcnkgcS1idG4tLWRlbnNlXCIgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInEtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm93XCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJxLWljb25cIj48c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJ6XCI+PC9wYXRoPjwvc3ZnPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInEtY2Fyb3VzZWxfX2NvbnRyb2wgYWJzb2x1dGUgYWJzb2x1dGUtcmlnaHQgZmxleCBpdGVtcy1jZW50ZXJcIiBzdHlsZT1cIm1hcmdpbjogMThweDtcIj5cclxuICAgIDxidXR0b24gYXJpYS1sYWJlbD1cIk5leHQgc2xpZGVcIiBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tZmxhdCBxLWJ0bi0tcm91bmQgdGV4dC1wcmltYXJ5IHEtYnRuLS1kZW5zZVwiIHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvd1wiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwicS1pY29uXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xMCA2TDguNTkgNy40MSAxMy4xNyAxMmwtNC41OCA0LjU5TDEwIDE4bDYtNnpcIj48L3BhdGg+PC9zdmc+PC9pPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG4gICAgPCEtLSBJbnRlcmFjdGl2ZSBjYXJvdXNlbCBBRlRFUiBoeWRyYXRpb24gLS0+XHJcbiAgICA8cS1jYXJvdXNlbFxyXG4gICAgICAgIHYtZWxzZVxyXG4gICAgICA6a2V5PVwiY2Fyb3VzZWxLZXlcIlxyXG4gICAgICBAdG91Y2hzdGFydC5zdG9wXHJcbiAgICAgIEBtb3VzZWRvd24uc3RvcFxyXG4gICAgICB2LW1vZGVsPVwic2xpZGVcIlxyXG4gICAgICBhbmltYXRlZFxyXG4gICAgICA6aW5maW5pdGU9XCJzaG93Q2Fyb3VzZWxDb250cm9sc1wiXHJcbiAgICAgIDpuYXZpZ2F0aW9uPVwic2hvd0Nhcm91c2VsQ29udHJvbHNcIlxyXG4gICAgICBzd2lwZWFibGVcclxuICAgICAgOmFycm93cz1cImZhbHNlXCJcclxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXHJcbiAgICAgIGNvbnRyb2wtY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIlxyXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXHJcbiAgICAgICAgQGtleWRvd249XCJvbktleWRvd25fcHJvZHVjdHNcIlxyXG4gICAgPlxyXG5cclxuICAgICAgPHEtY2Fyb3VzZWwtc2xpZGVcclxuICAgICAgICB2LWZvcj1cIihzbGlkZUdyb3VwLCBpbmRleCkgaW4gc2xpZGVDaHVua3NcIlxyXG4gICAgICAgIDprZXk9XCJgc2xpZGUtJHtpbmRleH0tJHtzbGlkZUNodW5rcy5sZW5ndGh9LSR7c2xpZGVHcm91cC5tYXAocCA9PiBwLmlkKS5qb2luKCctJyl9YFwiXHJcbiAgICAgICAgOm5hbWU9XCJpbmRleFwiXHJcbiAgICAgID5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cclxuXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHYtZm9yPVwiZnAgaW4gc2xpZGVHcm91cFwiXHJcbiAgICAgICAgICAgIDprZXk9XCJmcC5pZFwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwiY29sLTEyIGNvbC1zbS02IGNvbC1tZC00IHJlbGF0aXZlLXBvc2l0aW9uXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiZnAuX19wbGFjZWhvbGRlclwiIGNsYXNzPVwicS1jYXJkIGludmlzaWJsZS1jYXJkXCI+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZT5cclxuICAgICAgICAgIDxQcm9kdWN0Q2FyZCA6cHJvZHVjdD1cImZwXCIgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLWNhcm91c2VsLXNsaWRlPlxyXG5cclxuICA8IS0tIEtlZXAgdGhlIGxvb2s6IGJpbmQgYnRuUHJvcHMsIGFkZCBhcmlhLWxhYmVsLCBrZWVwIHZpc3VhbCBzdHlsZSAtLT5cclxuICA8dGVtcGxhdGUgdi1pZj1cInNob3dDYXJvdXNlbENvbnRyb2xzXCIgI25hdmlnYXRpb24taWNvbj1cInsgbmFtZSwgb25DbGljaywgYnRuUHJvcHMgfVwiPlxyXG4gICAgPHEtYnRuXHJcbiAgICAgIHYtYmluZD1cImJ0blByb3BzXCJcclxuICAgICAgOmZsYXQ9XCJmYWxzZVwiXHJcbiAgICAgIDpjb2xvcj1cInNsaWRlID09PSBuYW1lID8gJ3NlY29uZGFyeScgOiAoYnRuUHJvcHMuY29sb3IgfHwgJ2dyZXktNScpXCJcclxuICAgICAgc2l6ZT1cInNtXCJcclxuICAgICAgOmljb249XCJudWxsXCJcclxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kOiB2YXIoLS1xLXNlY29uZGFyeSk7IGZvbnQtc2l6ZTogNXB4O3BhZGRpbmc6IDBcIlxyXG4gICAgICByb3VuZFxyXG4gICAgICBkZW5zZVxyXG4gICAgICA6YXJpYS1sYWJlbD1cImBHbyB0byBzbGlkZSAke25hbWUgKyAxfWBcIlxyXG4gICAgICBAY2xpY2s9XCJvbkNsaWNrXCJcclxuICAgIC8+XHJcbiAgPC90ZW1wbGF0ZT5cclxuXHJcbiAgPCEtLSBDdXN0b20gYXJyb3dzIHVzaW5nIHEtY2Fyb3VzZWwtY29udHJvbCAocG9zaXRpb25zIG1hdGNoIGRlZmF1bHQpIC0tPlxyXG4gIDx0ZW1wbGF0ZSB2LWlmPVwic2hvd0Nhcm91c2VsQ29udHJvbHNcIiAjY29udHJvbD5cclxuICAgIDxxLWNhcm91c2VsLWNvbnRyb2wgcG9zaXRpb249XCJsZWZ0XCIgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICA8cS1idG5cclxuICAgICAgICA6aWNvbj1cIm1hdENoZXZyb25MZWZ0XCJcclxuICAgICAgICBhcmlhLWxhYmVsPVwiUHJldmlvdXMgc2xpZGVcIlxyXG4gICAgICAgIGZsYXRcclxuICAgICAgICByb3VuZFxyXG4gICAgICAgIGRlbnNlXHJcbiAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgIEBjbGljaz1cInNsaWRlID0gKE51bWJlcihzbGlkZSkgLSAxICsgc2xpZGVDaHVua3MubGVuZ3RoKSAlIHNsaWRlQ2h1bmtzLmxlbmd0aFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3EtY2Fyb3VzZWwtY29udHJvbD5cclxuXHJcbiAgICA8cS1jYXJvdXNlbC1jb250cm9sIHBvc2l0aW9uPVwicmlnaHRcIiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgIDxxLWJ0blxyXG4gICAgICAgIDppY29uPVwibWF0Q2hldnJvblJpZ2h0XCJcclxuICAgICAgICBhcmlhLWxhYmVsPVwiTmV4dCBzbGlkZVwiXHJcbiAgICAgICAgZmxhdFxyXG4gICAgICAgIHJvdW5kXHJcbiAgICAgICAgZGVuc2VcclxuICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgQGNsaWNrPVwic2xpZGUgPSAoTnVtYmVyKHNsaWRlKSArIDEpICUgc2xpZGVDaHVua3MubGVuZ3RoXCJcclxuICAgICAgLz5cclxuICAgIDwvcS1jYXJvdXNlbC1jb250cm9sPlxyXG4gIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgPC9xLWNhcm91c2VsPlxyXG5cclxuICA8L2Rpdj5cclxuPC9zZWN0aW9uPlxyXG5cclxuICAgIDwhLS0gQ1RBIFNlY3Rpb24gLS0+XHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cImN0YS1zZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3RhLW92ZXJsYXlcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdGEtaW1nXCI+XHJcbiAgICAgICAgICAgIDxpbWcgbG9hZGluZz1cImxhenlcIiBhbHQ9XCJGb3Jlc3Qgdmlld1wiIHNyYz1cIi9jdGEtaW1nLndlYnBcIiB3aWR0aD1cIjcyOFwiIGhlaWdodD1cIjUwMFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdGEtY29udGVudFwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2hpdGUgcHJlLXRpdGxlXCI+VGhlIEJvdGFuaWNhbCBFdGhvczwvc3Bhbj5cclxuICAgICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1oNCB0ZXh0LXdoaXRlIHEtbWItbWRcIj5Hcm93biB3aXRoIENhcmUsIENyYWZ0ZWQgd2l0aCBTb3VsLjwvaDI+XHJcbiAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LXdoaXRlIGRlc2NcIj5PdXIgam91cm5leSBiZWdhbiBpbiBhIHNtYWxsIGdsYXNzaG91c2UsIGRyaXZlbiBieSB0aGUgZGVzaXJlIHRvIG1lcmdlXHJcbmFuY2llbnQgaGVyYmFsIHdpc2RvbSB3aXRoIG1vZGVybiBkZXJtYXRvbG9naWNhbCBzY2llbmNlLiBFdmVyeVxyXG5pbmdyZWRpZW50IGlzIGV0aGljYWxseSBoYXJ2ZXN0ZWQgYXQgaXRzIHBlYWsgcG90ZW5jeS48L3A+XHJcbiAgICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICAgIHJlZj1cImN0YUJ0blwiXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJFeHBsb3JlIE91ciBSb290c1wiXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgICA6cm91bmRlZD1cInRydWVcIlxyXG4gICAgICAgICAgICAgIHNpemU9XCJsZ1wiXHJcbiAgICAgICAgICAgICAgdG89XCIvcHJvZHVjdHNcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwhLS0gVGVzdGltb25pYWxzIFNlY3Rpb24gLS0+XHJcbjxzZWN0aW9uIGNsYXNzPVwidGVzdGltb25pYWxzLXNlY3Rpb25cIj5cclxuIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICA8aDIgY2xhc3M9XCJ0ZXh0LWg0IHRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtY2VudGVyIHEtbWItbGdcIj5cclxuICAgIFdoYXQgT3VyIEN1c3RvbWVycyBTYXlcclxuICA8L2gyPlxyXG48ZGl2IHYtaWY9XCIhaXNIeWRyYXRlZFwiIGNsYXNzPVwicS1jYXJvdXNlbCBxLXBhbmVsLXBhcmVudCBxLWNhcm91c2VsLS13aXRob3V0LXBhZGRpbmcgcS1jYXJvdXNlbC0tbmF2aWdhdGlvbi1ib3R0b20gcm91bmRlZC1ib3JkZXJzXCIgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7XCI+XHJcbiAgPGRpdiBjbGFzcz1cInEtY2Fyb3VzZWxfX3NsaWRlcy1jb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJxLXBhbmVsIHNjcm9sbFwiIHJvbGU9XCJ0YWJwYW5lbFwiIHN0eWxlPVwiLS1xLXRyYW5zaXRpb24tZHVyYXRpb246IDMwMG1zO1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicS1jYXJvdXNlbF9fc2xpZGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICB2LWZvcj1cIih0ZXN0aW1vbmlhbCwgaW5kZXgpIGluIHZpc2libGVTdGF0aWNUZXN0aW1vbmlhbHNcIlxyXG4gICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImNvbC0xMiBjb2wtbWQtNFwiXHJcbiAgICAgICAgICAgIDpjbGFzcz1cInsgJ2d0LXhzJzogaW5kZXggPT09IDEsICdndC1zbSc6IGluZGV4ID09PSAyIH1cIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1jYXJkIHEtcGEtbWRcIj5cclxuICAgICAgICAgICAgICA8YXJ0aWNsZSBpdGVtc2NvcGUgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUmV2aWV3XCI+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSBxLW1iLXNtXCIgaXRlbXByb3A9XCJhdXRob3JcIiBpdGVtc2NvcGUgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUGVyc29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGl0ZW1wcm9wPVwibmFtZVwiPnt7IHRlc3RpbW9uaWFsLm5hbWUgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpdGVtcHJvcD1cInJldmlld1JhdGluZ1wiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9SYXRpbmdcIiBjbGFzcz1cInEtbWItc21cIj5cclxuICAgICAgICAgICAgICAgICAgPG1ldGEgaXRlbXByb3A9XCJyYXRpbmdWYWx1ZVwiIDpjb250ZW50PVwidGVzdGltb25pYWwucmF0aW5nXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPG1ldGEgaXRlbXByb3A9XCJiZXN0UmF0aW5nXCIgY29udGVudD1cIjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8cCBpdGVtcHJvcD1cInJldmlld0JvZHlcIiBjbGFzcz1cInRleHQtYm9keTJcIj57eyB0ZXN0aW1vbmlhbC5mZWVkYmFjayB9fTwvcD5cclxuICAgICAgICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPHEtY2Fyb3VzZWxcclxuICAgIHRhYmluZGV4PVwiMFwiXHJcbiAgICB2LWVsc2UtaWY9XCJpc0h5ZHJhdGVkXCJcclxuICAgIDprZXk9XCJ0ZXN0aW1vbmlhbENhcm91c2VsS2V5XCJcclxuICB2LW1vZGVsPVwidGVzdGltb25pYWxzU2xpZGVcIlxyXG4gIEB0b3VjaHN0YXJ0LnN0b3BcclxuICAgICAgQG1vdXNlZG93bi5zdG9wXHJcbiAgICAgIGFuaW1hdGVkXHJcbiAgICAgIDppbmZpbml0ZT1cInNob3dUZXN0aW1vbmlhbENhcm91c2VsQ29udHJvbHNcIlxyXG4gICAgICA6bmF2aWdhdGlvbj1cInNob3dUZXN0aW1vbmlhbENhcm91c2VsQ29udHJvbHNcIlxyXG4gICAgICBzd2lwZWFibGVcclxuICAgICAgOmFycm93cz1cImZhbHNlXCJcclxuICBoZWlnaHQ9XCJhdXRvXCJcclxuICAgICAgQGtleWRvd249XCJvbktleWRvd25fdGVzdGltb25pYWxzXCJcclxuXHJcbj5cclxuICA8cS1jYXJvdXNlbC1zbGlkZVxyXG4gICAgdi1mb3I9XCIoZ3JvdXAsIHNsaWRlSW5kZXgpIGluIHRlc3RpbW9uaWFsU2xpZGVDaHVua3NcIlxyXG4gICAgOmtleT1cInNsaWRlSW5kZXhcIlxyXG4gICAgOm5hbWU9XCJzbGlkZUluZGV4XCJcclxuICA+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJjb2wtMTIgY29sLW1kLTRcIlxyXG4gICAgICAgIHYtZm9yPVwiKHRlc3RpbW9uaWFsLCBpbmRleCkgaW4gZ3JvdXBcIlxyXG4gICAgICAgIDprZXk9XCJpbmRleFwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1jYXJkIHEtcGEtbWRcIj5cclxuPGFydGljbGVcclxuICBpdGVtc2NvcGVcclxuICBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9SZXZpZXdcIlxyXG4+XHJcbiAgPCEtLSBBdXRob3IgLS0+XHJcbiAgPGgzXHJcbiAgICBjbGFzcz1cInRleHQtc3VidGl0bGUxIHEtbWItc21cIlxyXG4gICAgaXRlbXByb3A9XCJhdXRob3JcIlxyXG4gICAgaXRlbXNjb3BlXHJcbiAgICBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9QZXJzb25cIlxyXG4gID5cclxuICAgIDxzcGFuIGl0ZW1wcm9wPVwibmFtZVwiPnt7IHRlc3RpbW9uaWFsLm5hbWUgfX08L3NwYW4+XHJcbiAgPC9oMz5cclxuXHJcbiAgPCEtLSBSYXRpbmcgLS0+XHJcbiAgPGRpdlxyXG4gICAgaXRlbXByb3A9XCJyZXZpZXdSYXRpbmdcIlxyXG4gICAgaXRlbXNjb3BlXHJcbiAgICBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9SYXRpbmdcIlxyXG4gICAgY2xhc3M9XCJxLW1iLXNtXCJcclxuICA+XHJcbiAgICA8bWV0YSBpdGVtcHJvcD1cInJhdGluZ1ZhbHVlXCIgOmNvbnRlbnQ9XCJ0ZXN0aW1vbmlhbC5yYXRpbmdcIiAvPlxyXG4gICAgPG1ldGEgaXRlbXByb3A9XCJiZXN0UmF0aW5nXCIgY29udGVudD1cIjVcIiAvPlxyXG5cclxuICAgIDxxLXJhdGluZ1xyXG4gICAgICA6bW9kZWwtdmFsdWU9XCJ0ZXN0aW1vbmlhbC5yYXRpbmcgPz8gMFwiXHJcbiAgICAgIHNpemU9XCIyMHB4XCJcclxuICAgICAgY29sb3I9XCJhbWJlclwiXHJcbiAgICAgIDppY29uPVwibWF0U3RhclwiXHJcbiAgICAgIHJlYWRvbmx5XHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8IS0tIFJldmlldyB0ZXh0IC0tPlxyXG4gIDxwIGl0ZW1wcm9wPVwicmV2aWV3Qm9keVwiIGNsYXNzPVwidGV4dC1ib2R5MlwiPlxyXG4gICAge3sgdGVzdGltb25pYWwuZmVlZGJhY2sgfX1cclxuICA8L3A+XHJcbjwvYXJ0aWNsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L3EtY2Fyb3VzZWwtc2xpZGU+XHJcblxyXG4gICAgPCEtLSBLZWVwIHRoZSBsb29rOiBiaW5kIGJ0blByb3BzLCBhZGQgYXJpYS1sYWJlbCwga2VlcCB2aXN1YWwgc3R5bGUgLS0+XHJcbiAgPHRlbXBsYXRlIHYtaWY9XCJzaG93VGVzdGltb25pYWxDYXJvdXNlbENvbnRyb2xzXCIgI25hdmlnYXRpb24taWNvbj1cInsgbmFtZSwgb25DbGljaywgYnRuUHJvcHMgfVwiPlxyXG4gICAgPHEtYnRuXHJcbiAgICAgIHYtYmluZD1cImJ0blByb3BzXCJcclxuICAgICAgOmZsYXQ9XCJmYWxzZVwiXHJcbiAgICAgIDpjb2xvcj1cInRlc3RpbW9uaWFsc1NsaWRlID09PSBuYW1lID8gJ3NlY29uZGFyeScgOiAncHJpbWFyeSdcIlxyXG4gICAgICBzaXplPVwic21cIlxyXG4gICAgICA6aWNvbj1cIm51bGxcIlxyXG4gICAgICBzdHlsZT1cImJhY2tncm91bmQ6IHZhcigtLXEtc2Vjb25kYXJ5KTsgZm9udC1zaXplOiA1cHg7cGFkZGluZzogMFwiXHJcbiAgICAgIHJvdW5kXHJcbiAgICAgIGRlbnNlXHJcbiAgICAgIDphcmlhLWxhYmVsPVwiYEdvIHRvIHNsaWRlICR7bmFtZSArIDF9YFwiXHJcbiAgICAgIEBjbGljaz1cIm9uQ2xpY2tcIlxyXG4gICAgLz5cclxuICA8L3RlbXBsYXRlPlxyXG5cclxuICA8IS0tIEN1c3RvbSBhcnJvd3MgdXNpbmcgcS1jYXJvdXNlbC1jb250cm9sIChwb3NpdGlvbnMgbWF0Y2ggZGVmYXVsdCkgLS0+XHJcbiAgPHRlbXBsYXRlIHYtaWY9XCJzaG93VGVzdGltb25pYWxDYXJvdXNlbENvbnRyb2xzXCIgI2NvbnRyb2w+XHJcbiAgICA8cS1jYXJvdXNlbC1jb250cm9sIHBvc2l0aW9uPVwibGVmdFwiIGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgOmljb249XCJtYXRDaGV2cm9uTGVmdFwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD1cIlByZXZpb3VzIHNsaWRlXCJcclxuICAgICAgICBmbGF0XHJcbiAgICAgICAgcm91bmRcclxuICAgICAgICBkZW5zZVxyXG4gICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICBAY2xpY2s9XCJ0ZXN0aW1vbmlhbHNTbGlkZSA9IChOdW1iZXIodGVzdGltb25pYWxzU2xpZGUpIC0gMSArIHRlc3RpbW9uaWFsU2xpZGVDaHVua3MubGVuZ3RoKSAlIHRlc3RpbW9uaWFsU2xpZGVDaHVua3MubGVuZ3RoXCJcclxuICAgICAgLz5cclxuICAgIDwvcS1jYXJvdXNlbC1jb250cm9sPlxyXG5cclxuICAgIDxxLWNhcm91c2VsLWNvbnRyb2wgcG9zaXRpb249XCJyaWdodFwiIGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgPHEtYnRuXHJcbiAgICAgICAgOmljb249XCJtYXRDaGV2cm9uUmlnaHRcIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9XCJOZXh0IHNsaWRlXCJcclxuICAgICAgICBmbGF0XHJcbiAgICAgICAgcm91bmRcclxuICAgICAgICBkZW5zZVxyXG4gICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICBAY2xpY2s9XCJ0ZXN0aW1vbmlhbHNTbGlkZSA9IChOdW1iZXIodGVzdGltb25pYWxzU2xpZGUpICsgMSkgJSB0ZXN0aW1vbmlhbFNsaWRlQ2h1bmtzLmxlbmd0aFwiXHJcbiAgICAgIC8+XHJcbiAgICA8L3EtY2Fyb3VzZWwtY29udHJvbD5cclxuICA8L3RlbXBsYXRlPlxyXG5cclxuPC9xLWNhcm91c2VsPlxyXG4gIDwvZGl2PlxyXG48L3NlY3Rpb24+XHJcblxyXG4gICAgPCEtLSBJbnN0YWdyYW0gRmVlZCBTZWN0aW9uIC0tPlxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJpbnN0YWdyYW0tc2VjdGlvblwiIHYtb25jZT5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8aDIgY2xhc3M9XCJ0ZXh0LWg0IHRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtY2VudGVyIHEtbWItbGdcIj5Gb2xsb3cgVXMgb24gSW5zdGFncmFtPC9oMj5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgY29sLW1kLTNcIiB2LWZvcj1cIihwb3N0LCBpbmRleCkgaW4gaW5zdGFncmFtUG9zdHNcIiA6a2V5PVwiaW5kZXhcIj5cclxuICAgICAgICAgIDxpbWcgd2lkdGg9XCIyMDBcIiBoZWlnaHQ9XCIyMDBcIiA6c3JjPVwicG9zdC5pbWFnZVwiIDphbHQ9XCJwb3N0LmNhcHRpb25cIiBjbGFzcz1cInJvdW5kZWQtYm9yZGVycyBmdWxsLXdpZHRoXCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwhLS0gTmV3c2xldHRlciBTaWdudXAgU2VjdGlvbiAtLT5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwibmV3c2xldHRlci1zZWN0aW9uXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgPGgyIGNsYXNzPVwidGV4dC1oNCB0ZXh0LXdlaWdodC1saWdodCBxLW1iLW1kXCI+Sm9pbiB0aGUgR2FyZGVuPC9oMj5cclxuICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkxIHEtbWItbGdcIj5SZWNlaXZlIG91ciBtb250aGx5IEpvdXJuYWwgb24gYm90YW5pY2FsIHdlbGxuZXNzLCBwbHVzIDE1JSBvZmYgeW91ciBmaXJzdCByaXR1YWwuPC9wPlxyXG4gICAgICA8bGFiZWwgdi1pZj1cIiFpc0h5ZHJhdGVkXCIgY2xhc3M9XCJxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLWZpbGxlZCBxLWlucHV0IHEtZmllbGQtLWxhYmVsZWQgc3Vic2NyaWJlLWVtYWlsLWlucHV0IHEtbWItbWRcIiBzdHlsZT1cIlwiPjwhLS0tLT48ZGl2IGNsYXNzPVwicS1maWVsZF9faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gY29sIHNlbGYtc3RyZXRjaFwiPjxkaXYgY2xhc3M9XCJxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwXCIgdGFiaW5kZXg9XCItMVwiPjxkaXYgY2xhc3M9XCJxLWZpZWxkX19jb250cm9sLWNvbnRhaW5lciBjb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAgcS1hbmNob3ItLXNraXBcIj48aW5wdXQgY2xhc3M9XCJxLWZpZWxkX19uYXRpdmUgcS1wbGFjZWhvbGRlclwiIHN0eWxlPVwiXCIgdGFiaW5kZXg9XCIwXCIgYXJpYS1sYWJlbD1cIllvdXIgRW1haWxcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCI+PGRpdiBjbGFzcz1cInEtZmllbGRfX2xhYmVsIG5vLXBvaW50ZXItZXZlbnRzIGFic29sdXRlIGVsbGlwc2lzXCI+WW91ciBFbWFpbDwvZGl2PjwhLS0tLT48L2Rpdj48L2Rpdj48IS0tLS0+PC9kaXY+PCEtLS0tPjwvbGFiZWw+XHJcbiAgICAgIDxxLWlucHV0IHYtZWxzZSBmaWxsZWQgdi1tb2RlbD1cImVtYWlsXCIgbGFiZWw9XCJZb3VyIGVtYWlsIGFkZHJlc3NcIiBjbGFzcz1cInN1YnNjcmliZS1lbWFpbC1pbnB1dCBxLW1iLW1kXCIgLz5cclxuICAgICAgPGJ1dHRvbiB2LWlmPVwiIWlzSHlkcmF0ZWRcIiBjbGFzcz1cInJvdW5kZWQgcS1idG4gcS1idG4taXRlbSBub24tc2VsZWN0YWJsZSBuby1vdXRsaW5lIHEtYnRuLS1zdGFuZGFyZCBxLWJ0bi0tcmVjdGFuZ2xlIGJnLXNlY29uZGFyeSB0ZXh0LXdoaXRlIHEtYnRuLS1hY3Rpb25hYmxlIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlXCIgc3R5bGU9XCJcIiB0YWJpbmRleD1cIjBcIiB0eXBlPVwiYnV0dG9uXCI+PHNwYW4gY2xhc3M9XCJxLWZvY3VzLWhlbHBlclwiIHRhYmluZGV4PVwiLTFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwIGp1c3RpZnktY2VudGVyIHJvd1wiPjxzcGFuIGNsYXNzPVwiYmxvY2tcIj5TdWJzY3JpYmU8L3NwYW4+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICA8cS1idG4gdi1lbHNlIDpyb3VuZGVkPVwidHJ1ZVwiIGxhYmVsPVwiU3Vic2NyaWJlXCIgY29sb3I9XCJzZWNvbmRhcnlcIiB0ZXh0LWNvbG9yPVwicHJpbWFyeVwiIEBjbGljaz1cInN1YnNjcmliZU5ld3NsZXR0ZXJcIiAvPlxyXG4gICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgd2F0Y2gsIGNvbXB1dGVkLCB1c2VTU1JDb250ZXh0IH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgeyB1c2VRdWFzYXIsIHVzZU1ldGEgfSBmcm9tICdxdWFzYXInXHJcbmltcG9ydCB7IHVzZVJvdXRlIH0gZnJvbSAndnVlLXJvdXRlcicgLy8gU3RhbmRhcmQgaW1wb3J0IGlzIHRpbnlcclxuaW1wb3J0IHByb2R1Y3RzU3RvcmUgZnJvbSAnc3JjL3N0b3Jlcy9wcm9kdWN0cydcclxuaW1wb3J0IHsgbWF0Q2hldnJvbkxlZnQsIG1hdENoZXZyb25SaWdodCwgbWF0U3RhciB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG4vL2ltcG9ydCB7IGRlZmluZUFzeW5jQ29tcG9uZW50IH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgeyBsb2FkUGFnZUNvbmZpZyB9IGZyb20gJ3NyYy91dGlscy9jb25maWctbG9hZGVyJ1xyXG5pbXBvcnQgeyB1c2VDYXJvdXNlbEtleWJvYXJkIH0gZnJvbSAnc3JjL2NvbXBvc2FibGVzL3VzZUNhcm91c2VsS2V5Ym9hcmQnXHJcbmltcG9ydCBQcm9kdWN0Q2FyZCBmcm9tICdzcmMvY29tcG9uZW50cy9Qcm9kdWN0Q2FyZC52dWUnXHJcblxyXG4vLyBBZGQgdGhpcyBoZXJlXHJcblxyXG4vLyBJbnN0ZWFkIG9mIHN0YW5kYXJkIGltcG9ydHMsIGRvIHRoaXM6XHJcbi8qY29uc3QgUUNhcm91c2VsID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXInKS50aGVuKG0gPT4gbS5RQ2Fyb3VzZWwpKVxyXG5jb25zdCBRQ2Fyb3VzZWxTbGlkZSA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyJykudGhlbihtID0+IG0uUUNhcm91c2VsU2xpZGUpKVxyXG5jb25zdCBRQ2Fyb3VzZWxDb250cm9sID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXInKS50aGVuKG0gPT4gbS5RQ2Fyb3VzZWxDb250cm9sKSlcclxuY29uc3QgUUlucHV0ID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXInKS50aGVuKG0gPT4gbS5RSW5wdXQpKVxyXG4qL1xyXG5jb25zdCBpc0h5ZHJhdGVkID0gcmVmKGZhbHNlKVxyXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpXHJcblxyXG4vLyBTeW5jIGRhdGEgaW1tZWRpYXRlbHkgc28gdGhlIHN0YXRpYyBIVE1MIGlzIGNvcnJlY3RcclxuaWYgKHByb2Nlc3MuZW52LkNMSUVOVCAmJiB3aW5kb3cuX19IT01FX1BST0RVQ1RTX0RBVEFfXyAmJiBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0hPTUVfUFJPRFVDVFNfREFUQV9fKSkge1xyXG4gIHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUgPSB3aW5kb3cuX19IT01FX1BST0RVQ1RTX0RBVEFfX1xyXG59XHJcblxyXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKCk7XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFNjcm9sbCAtLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBzY3JvbGxUb1Byb2R1Y3RzID0gKCkgPT4ge31cclxuZGVmaW5lRXhwb3NlKHsgc2Nyb2xsVG9Qcm9kdWN0cyB9KVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gU0VPIC0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBJbnNpZGUgeW91ciBQYWdlIG9yIExheW91dFxyXG5kZWZpbmVPcHRpb25zKHtcclxuICBhc3luYyBwcmVGZXRjaCAoeyBzc3JDb250ZXh0LCBjdXJyZW50Um91dGUgfSkge1xyXG4gICAgY29uc3QgQVBJX0JBU0UgPVxyXG4gIGltcG9ydC5tZXRhLmVudi5TU1JcclxuICAgID8gcHJvY2Vzcy5lbnYuVklURV9BUElfQkFTRSAgIC8vIOKchSB5b3VyIHNlcnZlciBlbnYgKFZlcmNlbClcclxuICAgIDogaW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX0JBU0UgLy8g4pyFIGNsaWVudCBlbnZcclxuXHJcbiAgICBjb25zdCB7ZmV0Y2hTZW9Gb3JQYXRofSA9IGF3YWl0IGltcG9ydCgnc3JjL2NvbXBvc2FibGVzL3VzZVNlbycpXHJcbiAgICAvKmNvbnN0IHNlbyA9IGF3YWl0IGZldGNoU2VvRm9yUGF0aCgnaG9tZXBhZ2UnKVxyXG4gICAgLy9jb25zdCBzZW8gPSBudWxsO1xyXG4gICAgLy8gMi4gRkVUQ0ggUFJPRFVDVFMgKFRoaXMgd2FzIG1pc3NpbmchKVxyXG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5wcmVGZXRjaFByb2R1Y3RzKCkqL1xyXG4gICAgLy8gRmlyZSBib3RoIHJlcXVlc3RzIGF0IHRoZSBzYW1lIHRpbWVcclxuICAgIGNvbnN0IGlzUHJldmlldyA9IGN1cnJlbnRSb3V0ZS5xdWVyeS5wcmV2aWV3ID09PSAndHJ1ZSdcclxuXHJcbiAgICBjb25zdCBbc2VvLCBjb25maWdEYXRhXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgZmV0Y2hTZW9Gb3JQYXRoKCdob21lcGFnZScpLFxyXG4gICAgICBsb2FkUGFnZUNvbmZpZygnaG9tZScsIGlzUHJldmlldyksIC8vIFRoZSBoZWxwZXIgd2UnbGwgY3JlYXRlXHJcbiAgICBdKVxyXG5cclxuICAgIC8vY29uc29sZS5sb2coY29uZmlnRGF0YSk7XHJcbiAgICAvLyAyLiBQcmVwYXJlIHRoZSBcIkxlYW5cIiBkYXRhXHJcbiAgICAvLyBXZSBvbmx5IG5lZWQgdGhlIGZpcnN0IDYgZm9yIHRoZSBob21lcGFnZSBjYXJvdXNlbFxyXG4gICAgLy9jb25zdCBsZWFuUHJvZHVjdHMgPSBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLnNsaWNlKDAsIDYpXHJcbiAgICBjb25zdCBmZWF0dXJlZElkcyA9IGNvbmZpZ0RhdGE/LmZlYXR1cmVkX3Byb2R1Y3RzIHx8IFtdXHJcbiAgICBjb25zdCBsZWFuUHJvZHVjdHMgPSBmZWF0dXJlZElkcy5sZW5ndGhcclxuICA/IGF3YWl0IHByb2R1Y3RzU3RvcmUuZ2V0RmVhdHVyZWRQcm9kdWN0cyhmZWF0dXJlZElkcylcclxuICA6IGF3YWl0IHByb2R1Y3RzU3RvcmUucHJlRmV0Y2hQcm9kdWN0cyh7IGFwaTogdHJ1ZSwgcGVyX3BhZ2U6IDYsIGRyeVJ1bjogdHJ1ZSB9KS50aGVuKHIgPT4gci5wcm9kdWN0cylcclxuXHJcbiAgICBpZiAoc3NyQ29udGV4dCkge1xyXG4gICAgICAvLyBJbml0aWFsaXplIHRoZSBzdGF0ZSBvYmplY3QgaWYgaXQgZG9lc24ndCBleGlzdFxyXG4gICAgICBzc3JDb250ZXh0LnNlb0RhdGEgPSBzZW9cclxuICAgICAgLy8gSU5KRUNUIFBST0RVQ1RTIEhFUkU6XHJcbiAgICAgIHNzckNvbnRleHQuaG9tZVByb2R1Y3RzRGF0YSA9IGxlYW5Qcm9kdWN0c1xyXG4gICAgICBzc3JDb250ZXh0LnBhZ2VDb25maWcgPSBjb25maWdEYXRhXHJcbiAgICAgIC8vIDIuIEF0dGFjaCBpdCB0byB0aGUgcmVuZGVyZWQgc3RhdGUgKGZvciB0aGUgY29tcG9uZW50KVxyXG4gICAgICBzc3JDb250ZXh0Lmhlcm9EYXRhID0ge1xyXG4gICAgICAgIHNyYzogYCR7QVBJX0JBU0V9L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzEwL25hdHVyYWJsb29tLWhlcm8tY292ZXItMzAweDMwMC5wbmdgLFxyXG4gICAgICAgIHNyY3NldDogYCR7QVBJX0JBU0V9L3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDI1LzEwL25hdHVyYWJsb29tLWhlcm8tY292ZXItMzAweDMwMC5wbmcgMzAwdywke2ltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFfS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8xMC9uYXR1cmFibG9vbS1oZXJvLWNvdmVyLTc2OHg1MTIucG5nIDc2OHcsJHtpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRX0vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMTAvbmF0dXJhYmxvb20taGVyby1jb3Zlci5wbmcgMTAyNHdgLFxyXG4gICAgICAgIHNpemVzOiAnKG1pbi13aWR0aDogNzY4cHgpIDUwdncsIGNhbGMoMTAwdncgLSA0MHB4KSdcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93Ll9fUEFHRV9DT05GSUdfXyA9IGNvbmZpZ0RhdGE7XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgaG9tZVNldHRpbmdzID0gcmVmKG51bGwpXHJcbmNvbnN0IHNlb0RhdGEgPSByZWYobnVsbClcclxuXHJcbi8vIDMuIEFQUExZIE1FVEFcclxudXNlTWV0YSgoKSA9PiB7XHJcbiAgY29uc3Qgc2VvID0gc2VvRGF0YS52YWx1ZTtcclxuXHJcbiAgLy8gSWYgZGF0YSBpc24ndCByZWFkeSB5ZXQsIHJldHVybiBhbiBlbXB0eSBvYmplY3Qgb3IganVzdCB0aGUgZGVmYXVsdCB0aXRsZS5cclxuICAvLyBUaGlzIHByZXZlbnRzIHRoZSBcIkZsaWNrZXJcIiBhbmQgYXZvaWRzIHRoZSBWdWUgd2FybmluZy5cclxuICBpZiAoIXNlbykge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgLy8gT25jZSBzZW9EYXRhLnZhbHVlIGlzIHBvcHVsYXRlZCwgUXVhc2FyIHdpbGwgYXV0b21hdGljYWxseVxyXG4gIC8vIGRldGVjdCB0aGUgY2hhbmdlIGFuZCB1cGRhdGUgdGhlIERPTS5cclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGU6IHNlby50aXRsZSxcclxuICAgIG1ldGE6IHtcclxuICAgICAgcm9ib3RzOiB7IG5hbWU6ICdyb2JvdHMnLCBjb250ZW50OiBzZW8ucm9ib3RzLCBrZXk6ICdyb2JvdHMnIH0sXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB7IG5hbWU6ICdkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHNlby5kZXNjcmlwdGlvbiwga2V5OiAnZGVzY3JpcHRpb24nIH0sXHJcbiAgICAgICdvZzp0aXRsZSc6IHsgcHJvcGVydHk6ICdvZzp0aXRsZScsIGNvbnRlbnQ6IHNlby50aXRsZSB9LFxyXG4gICAgICAnb2c6aW1hZ2UnOiB7IHByb3BlcnR5OiAnb2c6aW1hZ2UnLCBjb250ZW50OiBzZW8ub2dfaW1hZ2UgfSxcclxuICAgIH0sXHJcbiAgICBsaW5rOiBbXHJcbiAgICAgIHtcclxuICAgICAgICByZWw6ICdjYW5vbmljYWwnLFxyXG4gICAgICAgIGhyZWY6IHNlbz8uY2Fub25pY2FsIHx8IHdpbmRvdz8ubG9jYXRpb24/LmhyZWYgfHwgJydcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH07XHJcbn0pO1xyXG4vKigoKSA9PiB7XHJcbiAgY29uc3Qgc2VvID0gc2VvRGF0YS52YWx1ZTtcclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGU6IHNlbz8udGl0bGUgfHwgJ05hdHVyYUJsb29tJyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgcm9ib3RzOiB7bmFtZTogJ3JvYm90cycsIGNvbnRlbnQ6IHNlbz8ucm9ib3RzIHx8ICdpbmRleCwgZm9sbG93J30sXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB7bmFtZTogJ2Rlc2NyaXB0aW9uJywgY29udGVudDogc2VvPy5kZXNjcmlwdGlvbn0sXHJcbiAgICAgICdvZzp0aXRsZSc6IHtwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogc2VvPy50aXRsZX0sXHJcbiAgICAgICdvZzpkZXNjcmlwdGlvbic6IHtwcm9wZXJ0eTogJ29nOmRlc2NyaXB0aW9uJywgY29udGVudDogc2VvPy5kZXNjcmlwdGlvbn0sXHJcbiAgICAgICdvZzppbWFnZSc6IHtwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogc2VvPy5vZ19pbWFnZX0sXHJcbiAgICAgICdvZzp0eXBlJzoge3Byb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6ICd3ZWJzaXRlJ30sXHJcbiAgICB9XHJcbiAgfTtcclxufSk7Ki9cclxuLy8gMS4gVEhFIFNFUlZFUiBGSVggKEZvcmNlIHRoZSBIVE1MIHRvIHBvcHVsYXRlKVxyXG5pZiAocHJvY2Vzcy5lbnYuU0VSVkVSKSB7XHJcbiAgY29uc3Qgc3NyID0gdXNlU1NSQ29udGV4dCgpXHJcbiAgaG9tZVNldHRpbmdzLnZhbHVlID0gc3NyPy5wYWdlQ29uZmlnIHx8IG51bGxcclxuICBzZW9EYXRhLnZhbHVlID0gc3NyPy5zZW9EYXRhIHx8IG51bGxcclxufVxyXG5cclxuXHJcbi8vIC0tLSBmaWxsIFNTUiBwYXlsb2FkIGZpcnN0IChpZiBleGlzdHMpIC0tLVxyXG5cclxuY29uc3QgdmlzaWJsZVN0YXRpY0l0ZW1zID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gIGNvbnN0IGlkcyA9IGhvbWVTZXR0aW5ncy52YWx1ZT8uZmVhdHVyZWRfcHJvZHVjdHMgfHwgW11cclxuICBsZXQgaXRlbXMgPSBbXVxyXG5cclxuICBpZiAoaWRzICYmIGlkcy5sZW5ndGgpIHtcclxuICAgIC8vIOKchSBTWU5DIEZJTkQ6IFRoaXMgYXZvaWRzIHRoZSBQcm9taXNlIGlzc3VlIGFuZCBmb3JjZXMgdGhlIG9yZGVyIG9mIHRoZSAnaWRzJyBhcnJheVxyXG4gICAgaXRlbXMgPSBpZHMubWFwKGlkID0+IHtcclxuICAgICAgcmV0dXJuIHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUuZmluZChwID0+IE51bWJlcihwLmlkKSA9PT0gTnVtYmVyKGlkKSlcclxuICAgIH0pLmZpbHRlcihCb29sZWFuKVxyXG4gIH1cclxuXHJcbiAgLy8gRmFsbGJhY2sgdG8gZmlyc3QgNiBpZiBubyBJRHMgYXJlIGZvdW5kICh0byBtYXRjaCByZWNvbXB1dGVTbGlkZXMgbG9naWMpXHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcclxuICAgIGl0ZW1zID0gKHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUgfHwgW10pLnNsaWNlKDAsIDYpXHJcbiAgfVxyXG5cclxuICAvLyBXZSBvbmx5IHNob3cgMyBpbiB0aGUgc3RhdGljIHZpZXdcclxuICBjb25zdCByZXN1bHQgPSBpdGVtcy5zbGljZSgwLCAzKVxyXG5cclxuICAvLyBQYWQgcGxhY2Vob2xkZXJzXHJcbiAgd2hpbGUgKHJlc3VsdC5sZW5ndGggPCAzKSB7XHJcbiAgICByZXN1bHQucHVzaCh7IF9fcGxhY2Vob2xkZXI6IHRydWUsIGlkOiBgcGxhY2Vob2xkZXItJHtyZXN1bHQubGVuZ3RofWAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHRcclxufSlcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gU2V0dXAgLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgQVBJX0JBU0UgPSBpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRVxyXG5cclxuY29uc3Qgc2xpZGVDaHVua3MgPSByZWYoW10pXHJcbmNvbnN0IHRlc3RpbW9uaWFsU2xpZGVDaHVua3MgPSByZWYoW10pXHJcbmNvbnN0IHNsaWRlID0gcmVmKDApXHJcbmNvbnN0IGNhcm91c2VsS2V5ID0gcmVmKDApXHJcbmNvbnN0IHRlc3RpbW9uaWFsQ2Fyb3VzZWxLZXkgPSByZWYoMClcclxuY29uc3QgcHJvZHVjdFNlY3Rpb24gPSByZWYobnVsbClcclxuY29uc3QgY3RhQnRuID0gcmVmKG51bGwpXHJcbmNvbnN0IGVtYWlsID0gcmVmKCcnKVxyXG5cclxuLy8gSGVscGVyOiBjaHVuayBhcnJheVxyXG5jb25zdCBnZXRDaHVua3MgPSAoYXJyYXksIHNpemUpID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpIHx8ICFhcnJheS5sZW5ndGgpIHJldHVybiBbXVxyXG4gIGNvbnN0IGNodW5rcyA9IFtdXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gc2l6ZSkgY2h1bmtzLnB1c2goYXJyYXkuc2xpY2UoaSwgaSArIHNpemUpKVxyXG4gIHJldHVybiBjaHVua3NcclxufVxyXG5cclxuLy8gVVBEQVRFIFRISVMgRlVOQ1RJT046XHJcbmNvbnN0IHJlY29tcHV0ZVNsaWRlcyA9IGFzeW5jIChmb3JjZVJlbW91bnQgPSBmYWxzZSkgPT4ge1xyXG4gIGlmICghaXNIeWRyYXRlZC52YWx1ZSkgcmV0dXJuXHJcblxyXG4gIGNvbnN0IGlkcyA9IGhvbWVTZXR0aW5ncy52YWx1ZT8uZmVhdHVyZWRfcHJvZHVjdHMgfHwgW11cclxuXHJcbiAgaWYgKGlkcy5sZW5ndGgpIHtcclxuICAgIGNvbnN0IG1pc3NpbmcgPSBpZHMuZmlsdGVyKGlkID0+ICFwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLmZpbmQocCA9PiBwLmlkID09IGlkKSlcclxuICAgIGlmIChtaXNzaW5nLmxlbmd0aCkge1xyXG4gICAgICBhd2FpdCBwcm9kdWN0c1N0b3JlLmdldEZlYXR1cmVkUHJvZHVjdHMobWlzc2luZylcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKCFwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5wcmVGZXRjaFByb2R1Y3RzKHsgYXBpOiB0cnVlLCBwZXJfcGFnZTogNiwgZHJ5UnVuOiBmYWxzZSB9KVxyXG4gIH1cclxuXHJcbiAgbGV0IGl0ZW1zID0gaWRzLmxlbmd0aFxyXG4gICAgPyBpZHMubWFwKGlkID0+IHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUuZmluZChwID0+IHAuaWQgPT0gaWQpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZS5zbGljZSgwLCA2KVxyXG5cclxuICBjb25zdCBjaHVua1NpemUgPSAkcS5zY3JlZW4ubHQuc20gPyAxIDogJHEuc2NyZWVuLmx0Lm1kID8gMiA6IDNcclxuXHJcbiAgaWYgKGNodW5rU2l6ZSA9PT0gMykge1xyXG4gICAgd2hpbGUgKGl0ZW1zLmxlbmd0aCA8IDMpIHtcclxuICAgICAgaXRlbXMucHVzaCh7IF9fcGxhY2Vob2xkZXI6IHRydWUsIGlkOiBgcGxhY2Vob2xkZXItJHtpdGVtcy5sZW5ndGh9YCB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGZvcmNlUmVtb3VudCkgY2Fyb3VzZWxLZXkudmFsdWUrK1xyXG5cclxuICBzbGlkZUNodW5rcy52YWx1ZSA9IGdldENodW5rcyhpdGVtcywgY2h1bmtTaXplKVxyXG59XHJcblxyXG5jb25zdCBzaG93Q2Fyb3VzZWxDb250cm9scyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICByZXR1cm4gc2xpZGVDaHVua3MudmFsdWUubGVuZ3RoID4gMVxyXG59KVxyXG5cclxuY29uc3QgdG90YWxQcm9kdWN0U2xpZGVzID0gY29tcHV0ZWQoKCkgPT4gc2xpZGVDaHVua3MudmFsdWUubGVuZ3RoKVxyXG5cclxuY29uc3QgeyBvbktleWRvd246IG9uS2V5ZG93bl9wcm9kdWN0cyB9ID0gdXNlQ2Fyb3VzZWxLZXlib2FyZChcclxuICBzbGlkZSxcclxuICB0b3RhbFByb2R1Y3RTbGlkZXNcclxuKVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBUZXN0aW1vbmlhbHMgJiBJbnN0YWdyYW0gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9jb25zdCBhdmF0YXJTVkcgPVxyXG4gICc8c3ZnIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4gPGNpcmNsZSBjeD1cIjQwXCIgY3k9XCI0MFwiIHI9XCI0MFwiIGZpbGw9XCIjRThGNUU5XCIvPiA8Y2lyY2xlIGN4PVwiNDBcIiBjeT1cIjMwXCIgcj1cIjEyXCIgZmlsbD1cIiM4MUM3ODRcIi8+IDxwYXRoIGQ9XCJNMjAgNjBjMC0xMCA5LTE4IDIwLTE4czIwIDggMjAgMThIMjB6XCIgZmlsbD1cIiM4MUM3ODRcIi8+IDwvc3ZnPidcclxuXHJcbmNvbnN0IHRlc3RpbW9uaWFscyA9IHJlZihbXHJcbiAgeyBuYW1lOiAnQWxpY2UgSm9obnNvbicsIGZlZWRiYWNrOiAnTmF0dXJhQmxvb20gcHJvZHVjdHMgaGF2ZSB0cmFuc2Zvcm1lZCBteSBza2luY2FyZSByb3V0aW5lIScgfSxcclxuICB7IG5hbWU6ICdNYXJrIFRob21wc29uJywgZmVlZGJhY2s6ICdJIGxvdmUgdGhlIG9yZ2FuaWMgaW5ncmVkaWVudHMgYW5kIHN1c3RhaW5hYmxlIHBhY2thZ2luZy4nIH0sXHJcbiAgeyBuYW1lOiAnU29waGllIExlZScsIGZlZWRiYWNrOiAnRmFzdCBzaGlwcGluZyBhbmQgZXhjZWxsZW50IGN1c3RvbWVyIHNlcnZpY2UuJyB9LFxyXG4gIHsgbmFtZTogJ0pvaG4gRG9lJywgZmVlZGJhY2s6ICdBbWF6aW5nIHF1YWxpdHkhJyB9LFxyXG4gIHsgbmFtZTogJ0phbmUgU21pdGgnLCBmZWVkYmFjazogJ1dpbGwgYnV5IGFnYWluLicgfVxyXG5dKVxyXG5cclxuY29uc3QgdGVzdGltb25pYWxzU2xpZGUgPSByZWYoMClcclxuXHJcbmNvbnN0IHJlY29tcHV0ZVRlc3RpbW9uaWFsU2xpZGVzID0gYXN5bmMgKGZvcmNlUmVtb3VudCA9IGZhbHNlKSA9PiB7XHJcbiAgaWYgKCFpc0h5ZHJhdGVkLnZhbHVlKSByZXR1cm5cclxuXHJcbiAgaWYgKCF0ZXN0aW1vbmlhbHMudmFsdWUubGVuZ3RoKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBjaHVua1NpemUgPSAkcS5zY3JlZW4ubHQuc20gPyAxIDogJHEuc2NyZWVuLmx0Lm1kID8gMiA6IDNcclxuXHJcbiAgaWYgKGZvcmNlUmVtb3VudCkgdGVzdGltb25pYWxDYXJvdXNlbEtleS52YWx1ZSsrXHJcblxyXG4gIHRlc3RpbW9uaWFsU2xpZGVDaHVua3MudmFsdWUgPSBnZXRDaHVua3ModGVzdGltb25pYWxzLnZhbHVlLCBjaHVua1NpemUpXHJcbn1cclxuY29uc3QgdmlzaWJsZVN0YXRpY1Rlc3RpbW9uaWFscyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICBjb25zdCBpdGVtcyA9IHRlc3RpbW9uaWFscy52YWx1ZS5zbGljZSgwLCAzKVxyXG4gIHdoaWxlIChpdGVtcy5sZW5ndGggPCAzKSB7XHJcbiAgICBpdGVtcy5wdXNoKHsgX19wbGFjZWhvbGRlcjogdHJ1ZSwgaWQ6IGBwbGFjZWhvbGRlci0ke2l0ZW1zLmxlbmd0aH1gIH0pXHJcbiAgfVxyXG4gIHJldHVybiBpdGVtc1xyXG59KVxyXG5cclxuY29uc3Qgc2hvd1Rlc3RpbW9uaWFsQ2Fyb3VzZWxDb250cm9scyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICByZXR1cm4gdGVzdGltb25pYWxTbGlkZUNodW5rcy52YWx1ZS5sZW5ndGggPiAxXHJcbn0pXHJcbi8vIGFzc3VtaW5nIHlvdSBhbHJlYWR5IGhhdmUgdGVzdGltb25pYWxTbGlkZUNodW5rc1xyXG5jb25zdCB0b3RhbFRlc3RpbW9uaWFsU2xpZGVzID0gY29tcHV0ZWQoKCkgPT4gdGVzdGltb25pYWxTbGlkZUNodW5rcy52YWx1ZS5sZW5ndGgpXHJcblxyXG5jb25zdCB7IG9uS2V5ZG93bjogb25LZXlkb3duX3Rlc3RpbW9uaWFscyB9ID0gdXNlQ2Fyb3VzZWxLZXlib2FyZChcclxuICB0ZXN0aW1vbmlhbHNTbGlkZSxcclxuICB0b3RhbFRlc3RpbW9uaWFsU2xpZGVzXHJcbilcclxuXHJcbmNvbnN0IGluc3RhZ3JhbVBvc3RzID0gcmVmKFtcclxuICB7IGltYWdlOiBgJHtBUElfQkFTRX0vd3AtY29udGVudC91cGxvYWRzLzIwMjUvMDUvcHJvY3VkdHMtY2F0YWxvZy1pbWcucG5nYCwgY2FwdGlvbjogJ091ciBsYXRlc3QgcHJvZHVjdCBsYXVuY2ghJyB9LFxyXG4gIHsgaW1hZ2U6IGAke0FQSV9CQVNFfS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8wNS9wcm9jdWR0cy1jYXRhbG9nLWltZy5wbmdgLCBjYXB0aW9uOiAnQmVoaW5kIHRoZSBzY2VuZXMgYXQgTmF0dXJhQmxvb20uJyB9LFxyXG4gIHsgaW1hZ2U6IGAke0FQSV9CQVNFfS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8wNS9wcm9jdWR0cy1jYXRhbG9nLWltZy5wbmdgLCBjYXB0aW9uOiAnQ3VzdG9tZXIgZmF2b3JpdGVzIHRoaXMgbW9udGguJyB9LFxyXG4gIHsgaW1hZ2U6IGAke0FQSV9CQVNFfS93cC1jb250ZW50L3VwbG9hZHMvMjAyNS8wNS9wcm9jdWR0cy1jYXRhbG9nLWltZy5wbmdgLCBjYXB0aW9uOiAnU3VzdGFpbmFibGUgcGFja2FnaW5nIGluIGFjdGlvbi4nIH1cclxuXSlcclxuXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBIZWxwZXJzIC0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IHN1YnNjcmliZU5ld3NsZXR0ZXIgPSAoKSA9PiB7XHJcbiAgaWYgKGVtYWlsLnZhbHVlKSB7XHJcbiAgICAkcS5ub3RpZnkoeyB0eXBlOiAncG9zaXRpdmUnLCBtZXNzYWdlOiAnU3Vic2NyaWJlZCBzdWNjZXNzZnVsbHkhJyB9KVxyXG4gICAgZW1haWwudmFsdWUgPSAnJ1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkcS5ub3RpZnkoeyB0eXBlOiAnbmVnYXRpdmUnLCBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwuJyB9KVxyXG4gIH1cclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gTW91bnRlZCAtLS0tLS0tLS0tLS0tLS0tLVxyXG5vbk1vdW50ZWQoYXN5bmMoKSA9PiB7XHJcbiAgICBpZiAod2luZG93Ll9fUEFHRV9DT05GSUdfXyAmJiBPYmplY3Qua2V5cyh3aW5kb3cuX19QQUdFX0NPTkZJR19fKS5sZW5ndGgpIHtcclxuICAgICAgaG9tZVNldHRpbmdzLnZhbHVlID0gd2luZG93Ll9fUEFHRV9DT05GSUdfX1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaXNQcmV2aWV3ID0gcm91dGUucXVlcnkucHJldmlldyA9PT0gJ3RydWUnXHJcbiAgICAgIC8vIFVzZSBpdCBkaXJlY3RseVxyXG4gICAgICBjb25zdCBmcmVzaENvbmZpZyA9IGF3YWl0IGxvYWRQYWdlQ29uZmlnKCdob21lJywgaXNQcmV2aWV3KVxyXG4gICAgICBpZiAoZnJlc2hDb25maWcpIGhvbWVTZXR0aW5ncy52YWx1ZSA9IGZyZXNoQ29uZmlnXHJcbiAgICB9XHJcblxyXG5pc0h5ZHJhdGVkLnZhbHVlID0gZmFsc2VcclxuXHJcbiAgaWYgKHByb2Nlc3MuZW52LkNMSUVOVCkge1xyXG4gICAgLy8gSWYgaXQncyBhIFNQQSBuYXZpZ2F0aW9uLCBoeWRyYXRlIGltbWVkaWF0ZWx5IGZvciBVWFxyXG4gICAgLy9jb25zdCBoYXNTc3JEYXRhID0gISF3aW5kb3cuX19QUk9EVUNUU19EQVRBX187XHJcbiAgICAvKiBpZiAocHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZS5sZW5ndGggPiAwICYmICFoYXNTc3JEYXRhKSB7XHJcbiAgICAgIGlzSHlkcmF0ZWQudmFsdWUgPSB0cnVlXHJcbiAgICAgIHJlY29tcHV0ZVNsaWRlcygpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfSovXHJcblxyXG4gICAgLy8gQ09MRCBTVEFSVDogV2FpdCBmb3IgdXNlciBpbnRlcmFjdGlvblxyXG5cclxuICBjb25zdCBoeWRyYXRlT25JbnRlcmFjdGlvbiA9ICgpID0+IHtcclxuICAgIGlmIChpc0h5ZHJhdGVkLnZhbHVlKSByZXR1cm5cclxuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaHlkcmF0ZU9uSW50ZXJhY3Rpb24pXHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoeWRyYXRlT25JbnRlcmFjdGlvbilcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoeWRyYXRlT25JbnRlcmFjdGlvbilcclxuXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaXNIeWRyYXRlZC52YWx1ZSA9IHRydWVcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHJlY29tcHV0ZVRlc3RpbW9uaWFsU2xpZGVzKClcclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaHlkcmF0ZU9uSW50ZXJhY3Rpb24sIHtwYXNzaXZlOiB0cnVlfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoeWRyYXRlT25JbnRlcmFjdGlvbiwge3Bhc3NpdmU6IHRydWV9KVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoeWRyYXRlT25JbnRlcmFjdGlvbiwge3Bhc3NpdmU6IHRydWV9KVxyXG5cclxuICAgIC8vIFNhZmV0eSBmYWxsYmFjazogSHlkcmF0ZSBhZnRlciA1IHNlY29uZHMgaWYgbm8gaW50ZXJhY3Rpb25cclxuICAgIHNldFRpbWVvdXQoaHlkcmF0ZU9uSW50ZXJhY3Rpb24sIDMwMDApXHJcblxyXG4gIH1cclxufSlcclxuXHJcbndhdGNoKGlzSHlkcmF0ZWQsIGFzeW5jICh2YWwpID0+IHtcclxuICBpZiAoIXZhbCkgcmV0dXJuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHJlY29tcHV0ZVNsaWRlcyh0cnVlKVxyXG4gICAgYXdhaXQgcmVjb21wdXRlVGVzdGltb25pYWxTbGlkZXModHJ1ZSlcclxuICAgIGNvbnN0IHsgZmV0Y2hTZW9Gb3JQYXRoIH0gPSBhd2FpdCBpbXBvcnQoJ3NyYy9jb21wb3NhYmxlcy91c2VTZW8nKVxyXG4gICAgc2VvRGF0YS52YWx1ZSA9IGF3YWl0IGZldGNoU2VvRm9yUGF0aCgnaG9tZXBhZ2UnKVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignSHlkcmF0aW9uIGVycm9yOicsIGVycilcclxuICB9XHJcbn0sIClcclxuXHJcblxyXG53YXRjaChcclxuICBbKCkgPT4gcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZSwgKCkgPT4gJHEuc2NyZWVuLm5hbWUsICgpID0+IGhvbWVTZXR0aW5ncy52YWx1ZV0sXHJcbiAgKCkgPT4ge1xyXG4gICAgaWYgKCFpc0h5ZHJhdGVkLnZhbHVlKSByZXR1cm5cclxuICAgIHJlY29tcHV0ZVNsaWRlcyhmYWxzZSkgLy8gbm8gZm9yY2VSZW1vdW50XHJcbiAgICByZWNvbXB1dGVUZXN0aW1vbmlhbFNsaWRlcyhmYWxzZSlcclxuICB9XHJcbilcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5AaW1wb3J0ICdzcmMvY3NzL2hvbWUtcGFnZS5jc3MnO1xyXG48L3N0eWxlPlxyXG4iXSwiZmlsZSI6ImFzc2V0cy9JbmRleFBhZ2UtQkswMFR2ME0uanMifQ==