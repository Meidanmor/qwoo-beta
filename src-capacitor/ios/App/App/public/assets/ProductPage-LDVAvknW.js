import { f as createComponent, h, e as computed, g as getCurrentInstance, v as watch, x as onMounted, R as onBeforeUnmount, an as scrollTargetProp, L as cleanEvt, ao as clearSelection, M as addEvt, ap as getScrollTarget, T as Transition, j as ref, S as stopAndPrevent, k as resolveComponent, o as openBlock, m as createElementBlock, a9 as createBaseVNode, aa as Fragment, ab as renderList, t as createVNode, q as withCtx, p as createBlock, ad as withModifiers, ac as toDisplayString, ae as normalizeClass, s as createTextVNode, aj as mergeProps, u as createCommentVNode, ah as normalizeStyle, am as useSSRContext } from "./quasar-observers-delayed-tSHCOYpR.js";
import { u as usePanelChildProps, a as usePanelEmits, b as usePanelProps, c as usePanel } from "./use-panel-Tcj_rECq.js";
import { a as hSlot, u as useDarkProps, N as isNumber, O as hDir, Q as QBtn, h as hMergeSlot, b as useDark, S as useModelToggleEmits, T as useTransitionProps, U as useModelToggleProps, V as useTick, X as useTimeout, Y as useModelToggle, Z as usePortal, $ as useTransition, _ as _export_sfc, j as QCard, B as matFavoriteBorder, a0 as matFavorite, L as matChevronRight, M as matChevronLeft, c as cart, i as QInput, a1 as QDialog, a2 as QSpinner, J as productsStore, q as useRoute, a3 as onBeforeRouteUpdate, a4 as matArrowDropDown, a5 as matLens, s as matRemove, m as matClose, t as matAdd, a6 as fetchProductById } from "./index-DDAg5YDa.js";
import { u as useFullscreenEmits, a as useFullscreenProps, b as useFullscreen } from "./use-fullscreen-D6v2f2fY.js";
import { Q as QImg } from "./QImg-BSHjw5MV.js";
import { Q as QBreadcrumbsEl, a as QBreadcrumbs } from "./QBreadcrumbs-DAF5pwlv.js";
import { Q as QChip } from "./QChip-CN1ZGBoZ.js";
import { v as validateOffset, a as validatePosition, u as useAnchorStaticProps, b as useScrollTarget, c as useAnchor, d as addClickOutside, r as removeClickOutside, s as setPosition, p as parsePosition, Q as QSelect } from "./QSelect-xmC19IVN.js";
import { u as useQuasar } from "./use-quasar-D_HwOQSM.js";
import { u as useMeta } from "./use-meta-BVxOmsjs.js";
import { fetchSeoForPath } from "./useSeo-DQlkSlEM.js";
import "./QItem-D74-s_Zr.js";
import "./QItemSection-Em5VwD4r.js";
const QCarouselSlide = createComponent({
  name: "QCarouselSlide",
  props: {
    ...usePanelChildProps,
    imgSrc: String
  },
  setup(props, { slots }) {
    const style = computed(() => props.imgSrc ? { backgroundImage: `url("${props.imgSrc}")` } : {});
    return () => h("div", {
      class: "q-carousel__slide",
      style: style.value
    }, hSlot(slots.default));
  }
});
const navigationPositionOptions = ["top", "right", "bottom", "left"];
const controlTypeOptions = ["regular", "flat", "outline", "push", "unelevated"];
const QCarousel = createComponent({
  name: "QCarousel",
  props: {
    ...useDarkProps,
    ...usePanelProps,
    ...useFullscreenProps,
    transitionPrev: {
      // usePanelParentProps override
      type: String,
      default: "fade"
    },
    transitionNext: {
      // usePanelParentProps override
      type: String,
      default: "fade"
    },
    height: String,
    padding: Boolean,
    controlColor: String,
    controlTextColor: String,
    controlType: {
      type: String,
      validator: (v) => controlTypeOptions.includes(v),
      default: "flat"
    },
    autoplay: [Number, Boolean],
    arrows: Boolean,
    prevIcon: String,
    nextIcon: String,
    navigation: Boolean,
    navigationPosition: {
      type: String,
      validator: (v) => navigationPositionOptions.includes(v)
    },
    navigationIcon: String,
    navigationActiveIcon: String,
    thumbnails: Boolean
  },
  emits: [
    ...useFullscreenEmits,
    ...usePanelEmits
  ],
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    let timer = null, panelsLen;
    const {
      updatePanelsList,
      getPanelContent,
      panelDirectives,
      goToPanel,
      previousPanel,
      nextPanel,
      getEnabledPanels,
      panelIndex
    } = usePanel();
    const { inFullscreen } = useFullscreen();
    const style = computed(() => inFullscreen.value !== true && props.height !== void 0 ? { height: props.height } : {});
    const direction = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const navigationPosition = computed(
      () => props.navigationPosition || (props.vertical === true ? "right" : "bottom")
    );
    const classes = computed(
      () => `q-carousel q-panel-parent q-carousel--with${props.padding === true ? "" : "out"}-padding` + (inFullscreen.value === true ? " fullscreen" : "") + (isDark.value === true ? " q-carousel--dark q-dark" : "") + (props.arrows === true ? ` q-carousel--arrows-${direction.value}` : "") + (props.navigation === true ? ` q-carousel--navigation-${navigationPosition.value}` : "")
    );
    const arrowIcons = computed(() => {
      const ico = [
        props.prevIcon || $q.iconSet.carousel[props.vertical === true ? "up" : "left"],
        props.nextIcon || $q.iconSet.carousel[props.vertical === true ? "down" : "right"]
      ];
      return props.vertical === false && $q.lang.rtl === true ? ico.reverse() : ico;
    });
    const navIcon = computed(() => props.navigationIcon || $q.iconSet.carousel.navigationIcon);
    const navActiveIcon = computed(() => props.navigationActiveIcon || navIcon.value);
    const controlProps = computed(() => ({
      color: props.controlColor,
      textColor: props.controlTextColor,
      round: true,
      [props.controlType]: true,
      dense: true
    }));
    watch(() => props.modelValue, () => {
      if (props.autoplay) {
        startTimer();
      }
    });
    watch(() => props.autoplay, (val) => {
      if (val) {
        startTimer();
      } else if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    function startTimer() {
      const duration = isNumber(props.autoplay) === true ? Math.abs(props.autoplay) : 5e3;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (duration >= 0) {
          nextPanel();
        } else {
          previousPanel();
        }
      }, duration);
    }
    onMounted(() => {
      props.autoplay && startTimer();
    });
    onBeforeUnmount(() => {
      timer !== null && clearTimeout(timer);
    });
    function getNavigationContainer(type, mapping) {
      return h("div", {
        class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${type} q-carousel__navigation--${navigationPosition.value}` + (props.controlColor !== void 0 ? ` text-${props.controlColor}` : "")
      }, [
        h("div", {
          class: "q-carousel__navigation-inner flex flex-center no-wrap"
        }, getEnabledPanels().map(mapping))
      ]);
    }
    function getContent() {
      const node = [];
      if (props.navigation === true) {
        const fn = slots["navigation-icon"] !== void 0 ? slots["navigation-icon"] : (opts) => h(QBtn, {
          key: "nav" + opts.name,
          class: `q-carousel__navigation-icon q-carousel__navigation-icon--${opts.active === true ? "" : "in"}active`,
          ...opts.btnProps,
          onClick: opts.onClick
        });
        const maxIndex = panelsLen - 1;
        node.push(
          getNavigationContainer("buttons", (panel, index) => {
            const name = panel.props.name;
            const active = panelIndex.value === index;
            return fn({
              index,
              maxIndex,
              name,
              active,
              btnProps: {
                icon: active === true ? navActiveIcon.value : navIcon.value,
                size: "sm",
                ...controlProps.value
              },
              onClick: () => {
                goToPanel(name);
              }
            });
          })
        );
      } else if (props.thumbnails === true) {
        const color = props.controlColor !== void 0 ? ` text-${props.controlColor}` : "";
        node.push(getNavigationContainer("thumbnails", (panel) => {
          const slide = panel.props;
          return h("img", {
            key: "tmb#" + slide.name,
            class: `q-carousel__thumbnail q-carousel__thumbnail--${slide.name === props.modelValue ? "" : "in"}active` + color,
            src: slide.imgSrc || slide["img-src"],
            onClick: () => {
              goToPanel(slide.name);
            }
          });
        }));
      }
      if (props.arrows === true && panelIndex.value >= 0) {
        if (props.infinite === true || panelIndex.value > 0) {
          node.push(
            h("div", {
              key: "prev",
              class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${direction.value} absolute flex flex-center`
            }, [
              h(QBtn, {
                icon: arrowIcons.value[0],
                ...controlProps.value,
                onClick: previousPanel
              })
            ])
          );
        }
        if (props.infinite === true || panelIndex.value < panelsLen - 1) {
          node.push(
            h("div", {
              key: "next",
              class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${direction.value} absolute flex flex-center`
            }, [
              h(QBtn, {
                icon: arrowIcons.value[1],
                ...controlProps.value,
                onClick: nextPanel
              })
            ])
          );
        }
      }
      return hMergeSlot(slots.control, node);
    }
    return () => {
      panelsLen = updatePanelsList(slots);
      return h("div", {
        class: classes.value,
        style: style.value
      }, [
        hDir(
          "div",
          { class: "q-carousel__slides-container" },
          getPanelContent(),
          "sl-cont",
          props.swipeable,
          () => panelDirectives.value
        )
      ].concat(getContent()));
    };
  }
});
const QTooltip = createComponent({
  name: "QTooltip",
  inheritAttrs: false,
  props: {
    ...useAnchorStaticProps,
    ...useModelToggleProps,
    ...useTransitionProps,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    transitionShow: {
      ...useTransitionProps.transitionShow,
      default: "jump-down"
    },
    transitionHide: {
      ...useTransitionProps.transitionHide,
      default: "jump-up"
    },
    anchor: {
      type: String,
      default: "bottom middle",
      validator: validatePosition
    },
    self: {
      type: String,
      default: "top middle",
      validator: validatePosition
    },
    offset: {
      type: Array,
      default: () => [14, 14],
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    delay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    persistent: Boolean
  },
  emits: [
    ...useModelToggleEmits
  ],
  setup(props, { slots, emit, attrs }) {
    let unwatchPosition, observer;
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const innerRef = ref(null);
    const showing = ref(false);
    const anchorOrigin = computed(() => parsePosition(props.anchor, $q.lang.rtl));
    const selfOrigin = computed(() => parsePosition(props.self, $q.lang.rtl));
    const hideOnRouteChange = computed(() => props.persistent !== true);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow, anchorEvents } = useAnchor({ showing, configureAnchorEl });
    const { show, hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    Object.assign(anchorEvents, { delayShow, delayHide });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "tooltip");
    if ($q.platform.is.mobile === true) {
      const clickOutsideProps = {
        anchorEl,
        innerRef,
        onClickOutside(e) {
          hide(e);
          if (e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      };
      const hasClickOutside = computed(
        () => (
          // it doesn't has external model
          // (null is the default value)
          props.modelValue === null && props.persistent !== true && showing.value === true
        )
      );
      watch(hasClickOutside, (val) => {
        const fn = val === true ? addClickOutside : removeClickOutside;
        fn(clickOutsideProps);
      });
      onBeforeUnmount(() => {
        removeClickOutside(clickOutsideProps);
      });
    }
    function handleShow(evt) {
      showPortal();
      registerTick(() => {
        observer = new MutationObserver(() => updatePosition());
        observer.observe(innerRef.value, { attributes: false, childList: true, characterData: true, subtree: true });
        updatePosition();
        configureScrollTarget();
      });
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      registerTimeout(() => {
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup();
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup() {
      if (observer !== void 0) {
        observer.disconnect();
        observer = void 0;
      }
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      unconfigureScrollTarget();
      cleanEvt(anchorEvents, "tooltipTemp");
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function delayShow(evt) {
      if ($q.platform.is.mobile === true) {
        clearSelection();
        document.body.classList.add("non-selectable");
        const target = anchorEl.value;
        const evts = ["touchmove", "touchcancel", "touchend", "click"].map((e) => [target, e, "delayHide", "passiveCapture"]);
        addEvt(anchorEvents, "tooltipTemp", evts);
      }
      registerTimeout(() => {
        show(evt);
      }, props.delay);
    }
    function delayHide(evt) {
      if ($q.platform.is.mobile === true) {
        cleanEvt(anchorEvents, "tooltipTemp");
        clearSelection();
        setTimeout(() => {
          document.body.classList.remove("non-selectable");
        }, 10);
      }
      registerTimeout(() => {
        hide(evt);
      }, props.hideDelay);
    }
    function configureAnchorEl() {
      if (props.noParentEvent === true || anchorEl.value === null) return;
      const evts = $q.platform.is.mobile === true ? [
        [anchorEl.value, "touchstart", "delayShow", "passive"]
      ] : [
        [anchorEl.value, "mouseenter", "delayShow", "passive"],
        [anchorEl.value, "mouseleave", "delayHide", "passive"]
      ];
      addEvt(anchorEvents, "anchor", evts);
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        const fn = props.noParentEvent === true ? updatePosition : hide;
        changeScrollEvent(localScrollTarget.value, fn);
      }
    }
    function getTooltipContent() {
      return showing.value === true ? h("div", {
        ...attrs,
        ref: innerRef,
        class: [
          "q-tooltip q-tooltip--style q-position-engine no-pointer-events",
          attrs.class
        ],
        style: [
          attrs.style,
          transitionStyle.value
        ],
        role: "tooltip"
      }, hSlot(slots.default)) : null;
    }
    function renderPortalContent() {
      return h(Transition, transitionProps.value, getTooltipContent);
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(vm.proxy, { updatePosition });
    return renderPortal;
  }
});
const QCarouselControl = createComponent({
  name: "QCarouselControl",
  props: {
    position: {
      type: String,
      default: "bottom-right",
      validator: (v) => [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top",
        "right",
        "bottom",
        "left"
      ].includes(v)
    },
    offset: {
      type: Array,
      default: () => [18, 18],
      validator: (v) => v.length === 2
    }
  },
  setup(props, { slots }) {
    const classes = computed(() => `q-carousel__control absolute absolute-${props.position}`);
    const style = computed(() => ({
      margin: `${props.offset[1]}px ${props.offset[0]}px`
    }));
    return () => h("div", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const _sfc_main$1 = {
  __name: "RelatedProductsSlider",
  props: {
    productId: Number,
    categoryId: Number
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const $q = useQuasar();
    const slide = ref(0);
    const products = ref([]);
    const perSlide = ref(4);
    async function addToWishlist(objID = 0) {
      await cart.toggleWishlistItem(objID, $q);
    }
    const addToCart = (product) => {
      cart.add(product.id, 1, null, {}, null, product);
    };
    const getSlugFromPermalink = (permalink) => {
      const match = permalink.match(/product\/([^/]+)\/?$/);
      return match ? match[1] : "";
    };
    const updatePerSlide = () => {
      if ($q.screen.lt.sm) perSlide.value = 2;
      else if ($q.screen.lt.md) perSlide.value = 3;
      else perSlide.value = 4;
    };
    updatePerSlide();
    watch(() => $q.screen.name, updatePerSlide);
    const colClass = computed(() => {
      if ($q.screen.lt.sm) return "col-6";
      if ($q.screen.lt.md) return "col-4";
      return "col-3";
    });
    const slideChunks = computed(() => {
      const chunks = [];
      for (let i = 0; i < products.value.length; i += perSlide.value) {
        chunks.push(products.value.slice(i, i + perSlide.value));
      }
      return chunks;
    });
    const prevSlide = () => {
      slide.value = (slide.value - 1 + slideChunks.value.length) % slideChunks.value.length;
    };
    const nextSlide = () => {
      slide.value = (slide.value + 1) % slideChunks.value.length;
    };
    const fetchRelatedProducts = async () => {
      const res = await fetch("/data/products.json");
      const allProducts = await res.json();
      let related = allProducts.filter(
        (p) => p.id !== props.productId && p.categories.some((cat) => cat.id === props.categoryId) && p.is_in_stock
      ).map((p) => ({
        ...p,
        slug: getSlugFromPermalink(p.permalink)
      }));
      if (related.length === 0) {
        related = allProducts.filter((p) => p.id !== props.productId && p.is_in_stock).slice(0, 8).map((p) => ({
          ...p,
          slug: getSlugFromPermalink(p.permalink)
        }));
      }
      products.value = related;
    };
    onMounted(fetchRelatedProducts);
    watch([() => props.productId, () => props.categoryId], fetchRelatedProducts);
    const __returned__ = { props, $q, slide, products, perSlide, addToWishlist, addToCart, getSlugFromPermalink, updatePerSlide, colClass, slideChunks, prevSlide, nextSlide, fetchRelatedProducts, ref, computed, onMounted, watch, get useQuasar() {
      return useQuasar;
    }, get cart() {
      return cart;
    }, get matChevronLeft() {
      return matChevronLeft;
    }, get matChevronRight() {
      return matChevronRight;
    }, get matFavorite() {
      return matFavorite;
    }, get matFavoriteBorder() {
      return matFavoriteBorder;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { class: "related-products" };
const _hoisted_2$1 = { class: "container" };
const _hoisted_3$1 = {
  key: 0,
  class: "related-product-wrapper row justify-center"
};
const _hoisted_4$1 = { class: "item-loop-wl absolute" };
const _hoisted_5$1 = { class: "flex q-pa-md" };
const _hoisted_6$1 = { class: "full-width q-mb-sm" };
const _hoisted_7$1 = ["innerHTML"];
const _hoisted_8$1 = { key: 0 };
const _hoisted_9$1 = { key: 3 };
const _hoisted_10$1 = { class: "related-product-wrapper row justify-center" };
const _hoisted_11$1 = { class: "item-loop-wl absolute" };
const _hoisted_12$1 = { class: "flex q-pa-md" };
const _hoisted_13$1 = { class: "full-width q-mb-sm" };
const _hoisted_14$1 = ["innerHTML"];
const _hoisted_15$1 = { key: 0 };
const _hoisted_16$1 = { key: 3 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("section", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _cache[6] || (_cache[6] = createBaseVNode("h3", { class: "text-h5 q-mb-md text-center" }, "Related Products", -1)),
      $setup.products.length <= $setup.perSlide ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.products, (product) => {
          return openBlock(), createElementBlock("div", {
            key: product.id,
            class: "col-xs-12 col-sm-6 col-md-3 q-mb-md relative-position"
          }, [
            createVNode(_component_router_link, {
              to: `/product/${$setup.getSlugFromPermalink(product.permalink)}`
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_4$1, [
                  $setup.cart.state.wishlist_items && Object.values($setup.cart.state.wishlist_items).find((obj) => product.id === obj.id) ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    class: "text-black q-pa-none text-caption q-mt-sm",
                    flat: "",
                    loading: $setup.cart.state.loading.wishlist,
                    onClick: withModifiers(($event) => $setup.addToWishlist(product.id), ["prevent"]),
                    color: "accent",
                    icon: $setup.matFavorite
                  }, null, 8, ["loading", "onClick", "icon"])) : (openBlock(), createBlock(QBtn, {
                    key: 1,
                    class: "text-black q-pa-none text-caption q-mt-sm",
                    flat: "",
                    loading: $setup.cart.state.loading.wishlist,
                    onClick: withModifiers(($event) => $setup.addToWishlist(product.id), ["prevent"]),
                    color: "accent",
                    icon: $setup.matFavoriteBorder
                  }, null, 8, ["loading", "onClick", "icon"]))
                ]),
                createVNode(QCard, { class: "my-card full-height" }, {
                  default: withCtx(() => [
                    createVNode(QImg, {
                      fit: "contain",
                      "img-src": product.images[0]?.src,
                      src: product.images[0]?.src,
                      srcset: product.images[0]?.srcset,
                      sizes: product.images[0]?.sizes,
                      alt: product.name,
                      height: "150px",
                      width: "100%",
                      class: "rounded-borders"
                    }, null, 8, ["img-src", "src", "srcset", "sizes", "alt"]),
                    createBaseVNode("div", _hoisted_5$1, [
                      createBaseVNode("div", _hoisted_6$1, [
                        createBaseVNode("div", null, toDisplayString(product.name), 1),
                        createBaseVNode("div", {
                          class: "text-subtitle2",
                          innerHTML: product.price_html
                        }, null, 8, _hoisted_7$1)
                      ]),
                      product.status && product.status === "draft" ? (openBlock(), createElementBlock("div", _hoisted_8$1, [..._cache[3] || (_cache[3] = [
                        createBaseVNode("b", null, "This is a draft product. It's shown for admins only!", -1)
                      ])])) : product.is_in_stock && product.type !== "variable" ? (openBlock(), createBlock(QBtn, {
                        key: 1,
                        label: "Add to Cart",
                        color: "secondary",
                        onClick: withModifiers(($event) => $setup.addToCart(product), ["prevent"])
                      }, null, 8, ["onClick"])) : product.is_in_stock && product.type === "variable" ? (openBlock(), createBlock(QBtn, {
                        key: 2,
                        to: `/product/${$setup.getSlugFromPermalink(product.permalink)}`,
                        label: "Choose options",
                        color: "secondary"
                      }, null, 8, ["to"])) : (openBlock(), createElementBlock("div", _hoisted_9$1, "Out of stock"))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["to"])
          ]);
        }), 128))
      ])) : (openBlock(), createBlock(QCarousel, {
        key: 1,
        onTouchstart: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"])),
        onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop"])),
        modelValue: $setup.slide,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.slide = $event),
        animated: "",
        infinite: "",
        swipeable: "",
        arrows: false,
        navigation: "",
        "control-color": "primary",
        height: "auto",
        class: "bg-transparent"
      }, {
        "navigation-icon": withCtx(({ name, onClick, btnProps }) => [
          createVNode(QBtn, mergeProps(btnProps, {
            flat: false,
            color: $setup.slide === name ? "secondary" : btnProps.color || "grey-5",
            size: "sm",
            icon: null,
            style: { "font-size": "5px", "padding": "0" },
            round: "",
            dense: "",
            "aria-label": `Go to slide ${_ctx.index + 1}`,
            onClick
          }), null, 16, ["color", "aria-label", "onClick"])
        ]),
        control: withCtx(() => [
          createVNode(QCarouselControl, {
            position: "left",
            class: "flex items-center"
          }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                icon: $setup.matChevronLeft,
                "aria-label": "Previous",
                flat: "",
                round: "",
                dense: "",
                color: "secondary",
                onClick: $setup.prevSlide
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
                "aria-label": "Next",
                flat: "",
                round: "",
                dense: "",
                color: "secondary",
                onClick: $setup.nextSlide
              }, null, 8, ["icon"])
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.slideChunks, (group, index) => {
            return openBlock(), createBlock(QCarouselSlide, {
              key: index,
              name: index
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_10$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(group, (product) => {
                    return openBlock(), createElementBlock("div", {
                      key: product.id,
                      class: normalizeClass([$setup.colClass, "q-mb-md", "relative-position"])
                    }, [
                      createVNode(_component_router_link, {
                        to: `/product/${$setup.getSlugFromPermalink(product.permalink)}`
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_11$1, [
                            $setup.cart.state.wishlist_items && Object.values($setup.cart.state.wishlist_items).find((obj) => product.id === obj.id) ? (openBlock(), createBlock(QBtn, {
                              key: 0,
                              class: "text-black q-pa-none text-caption q-mt-sm",
                              flat: "",
                              loading: $setup.cart.state.loading.wishlist,
                              onClick: withModifiers(($event) => $setup.addToWishlist(product.id), ["prevent"]),
                              color: "accent",
                              icon: $setup.matFavorite
                            }, null, 8, ["loading", "onClick", "icon"])) : (openBlock(), createBlock(QBtn, {
                              key: 1,
                              class: "text-black q-pa-none text-caption q-mt-sm",
                              flat: "",
                              loading: $setup.cart.state.loading.wishlist,
                              onClick: withModifiers(($event) => $setup.addToWishlist(product.id), ["prevent"]),
                              color: "accent",
                              icon: $setup.matFavoriteBorder
                            }, null, 8, ["loading", "onClick", "icon"]))
                          ]),
                          createVNode(QCard, { class: "my-card full-height" }, {
                            default: withCtx(() => [
                              createVNode(QImg, {
                                fit: "contain",
                                "img-src": product.images[0]?.src,
                                src: product.images[0]?.src,
                                srcset: product.images[0]?.srcset,
                                sizes: product.images[0]?.sizes,
                                alt: product.name,
                                height: "150px",
                                width: "100%",
                                class: "rounded-borders"
                              }, null, 8, ["img-src", "src", "srcset", "sizes", "alt"]),
                              createBaseVNode("div", _hoisted_12$1, [
                                createBaseVNode("div", _hoisted_13$1, [
                                  createBaseVNode("div", null, toDisplayString(product.name), 1),
                                  createBaseVNode("div", {
                                    class: "text-subtitle2",
                                    innerHTML: product.price_html
                                  }, null, 8, _hoisted_14$1)
                                ]),
                                product.status && product.status === "draft" ? (openBlock(), createElementBlock("div", _hoisted_15$1, [..._cache[4] || (_cache[4] = [
                                  createBaseVNode("b", null, "This is a draft product. It's shown for admins only!", -1)
                                ])])) : product.is_in_stock && product.type !== "variable" ? (openBlock(), createBlock(QBtn, {
                                  key: 1,
                                  label: "Add to Cart",
                                  color: "secondary",
                                  onClick: withModifiers(($event) => $setup.addToCart(product), ["prevent"])
                                }, null, 8, ["onClick"])) : product.is_in_stock && product.type === "variable" ? (openBlock(), createBlock(QBtn, {
                                  key: 2,
                                  to: `/product/${$setup.getSlugFromPermalink(product.permalink)}`,
                                  label: "Choose options",
                                  color: "secondary"
                                }, null, 8, ["to"])) : (openBlock(), createElementBlock("div", _hoisted_16$1, "Out of stock"))
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ], 2);
                  }), 128))
                ])
              ]),
              _: 2
            }, 1032, ["name"]);
          }), 128)),
          _cache[5] || (_cache[5] = createTextVNode(" ' ", -1))
        ]),
        _: 1
      }, 8, ["modelValue"]))
    ])
  ]);
}
const RelatedProductsSlider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "RelatedProductsSlider.vue"]]);
const _sfc_main = /* @__PURE__ */ Object.assign({
  async preFetch({ ssrContext, currentRoute }) {
    console.log("--- PreFetch Running for:", currentRoute.params.slug);
    const seo = await fetchSeoForPath(currentRoute.path);
    if (ssrContext) {
      let productData = await productsStore.fetchSingleProduct(currentRoute.params.slug);
      if (!productData?.categories?.length) {
        productData.categories = [
          productData?.extensions?.mpress?.default_category
        ].filter(Boolean);
      }
      ssrContext.seoData = seo;
      ssrContext.productData = productData;
    }
  }
}, {
  __name: "ProductPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const route = useRoute();
    const product = ref(null);
    const activeSlide = ref(0);
    const quantity = ref(1);
    const getSlugFromPermalink = (permalink) => {
      const match = permalink.match(/product\/([^/]+)\/?$/);
      return match ? match[1] : "";
    };
    {
      if (window.__PRODUCT_DATA__ && window.__PRODUCT_DATA__.id) {
        const ssrProductSlug = getSlugFromPermalink(window.__PRODUCT_DATA__.permalink);
        if (ssrProductSlug === route.params.slug) {
          product.value = window.__PRODUCT_DATA__;
        }
      }
    }
    const seoData = ref(null);
    {
      if (window.__SEO_DATA__) {
        seoData.value = window.__SEO_DATA__;
      }
      useMeta(() => {
        const seo = seoData.value;
        return {
          title: seo?.title || "NaturaBloom",
          meta: {
            description: {
              name: "description",
              content: seo?.description || "Let's Bloom Together"
            },
            "og:title": {
              property: "og:title",
              content: seo?.title || "NaturaBloom"
            },
            "og:description": {
              property: "og:description",
              content: seo?.description || "Let's Bloom Together"
            }
          }
        };
      });
    }
    const availableAttributes = computed(() => {
      if (!product.value || !product.value.attributes) return [];
      const attrMap = {};
      for (const variation of product.value.attributes) {
        if (!attrMap[variation.name]) {
          attrMap[variation.name] = {
            name: variation.name,
            id: variation.id,
            terms: variation.terms,
            options: /* @__PURE__ */ new Set()
          };
        }
        for (const term of variation.terms) {
          attrMap[variation.name].options.add(term.name);
        }
      }
      return Object.values(attrMap).map((attr) => ({
        name: attr.name,
        slug: attr.slug,
        options: Array.from(attr.options)
      }));
    });
    const lightbox = ref({ open: false, index: 0 });
    const zoom = ref({
      scale: 1,
      x: 0,
      y: 0,
      dragging: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0
    });
    const zoomStyle = computed(() => ({
      transform: `scale(${zoom.value.scale}) translate(${zoom.value.x}px, ${zoom.value.y}px)`,
      transition: zoom.value.dragging ? "none" : "transform 0.2s ease",
      maxWidth: "100%",
      maxHeight: "100%",
      touchAction: "none",
      userSelect: "none"
    }));
    function openLightbox(index) {
      lightbox.value.index = index;
      lightbox.value.open = true;
      zoom.value = {
        scale: 1,
        x: 0,
        y: 0,
        dragging: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
      };
    }
    function addToCart(e) {
      handleAddToCart(e);
      console.log("Cart:", cart.state);
    }
    function handleAddToCart(e) {
      if (e && e.target.innerText == "QUICK CHECKOUT") {
        cart.state.loading.quickbuy = true;
      }
      console.log(e.target.innerText);
      const matchedVariation2 = product.value.variations.find((variation) => {
        return Object.entries(selectedVariations.value).every(([attrName, selectedValue]) => {
          const attr = variation.attributes.find((a) => a.name === attrName);
          if (!attr || selectedValue === null) return false;
          if (attr.value === null) return true;
          return attr.value.toLowerCase() === selectedValue.toLowerCase();
        });
      });
      console.log(matchedVariation2);
      if (!matchedVariation2) {
        console.log(product.value.id);
        cart.add(product.value.id, quantity.value, null, null, $q);
        return;
      }
      const selectedVariationsArray = {};
      selectedVariationsArray.variation = [];
      console.log(selectedVariations.value);
      for (const [key, value] of Object.entries(matchedVariation2.attributes)) {
        console.log(key);
        if (!value.value || value.value == null) {
          for (const [key2, val] of Object.entries(selectedVariations.value)) {
            if (value.name == key2) {
              value.value = val;
            }
          }
        }
        selectedVariationsArray.variation.push({ "attribute": value.name, "value": value.value });
      }
      console.log(product.value.id + "-1-" + matchedVariation2.id + "-" + selectedVariationsArray.variation);
      cart.add(product.value.id, quantity.value, matchedVariation2.id, selectedVariationsArray.variation, $q);
    }
    function increaseQty() {
      quantity.value++;
    }
    function decreaseQty() {
      if (quantity.value > 1) quantity.value--;
    }
    async function fetchProduct(slug) {
      let existing = productsStore.products.value.find((p) => {
        const pSlug = getSlugFromPermalink(p.permalink);
        return pSlug === slug;
      });
      if (existing) {
        product.value = JSON.parse(JSON.stringify(existing));
      } else {
        product.value = await productsStore.fetchSingleProduct(slug);
      }
      if (!product.value) {
        console.error("Product not found:", slug);
        return;
      }
      if (!product.value?.categories?.length) {
        product.value.categories = [
          product.value.extensions?.mpress?.default_category
        ];
      }
      quantity.value = 1;
      activeSlide.value = 0;
      lightbox.value.open = false;
      await resetVariations();
      await fetchWishlistData();
    }
    const isVariable = computed(() => product.value?.type === "variable");
    const selectedVariations = ref({});
    const selectedVariation = ref(null);
    const variationError = ref("");
    const matchedVariation = ref("");
    const wishlistAdded = ref(false);
    function resetVariations() {
      selectedVariations.value = {};
      variationError.value = "";
      selectedVariation.value = null;
    }
    const shouldDisableCartButtons = computed(() => {
      return isVariable.value && (!selectedVariation.value || selectedVariation.value === "null");
    });
    async function fetchWishlistData() {
      await cart.fetchWishlistItems();
      if (cart.state.wishlist_items && Object.values(cart.state.wishlist_items).find((obj) => selectedVariation.value ? selectedVariation.value.id : product.value.id === obj.id)) {
        wishlistAdded.value = true;
      } else {
        wishlistAdded.value = false;
      }
    }
    async function onVariationChange() {
      if (!product.value || !product.value.attributes) {
        selectedVariation.value = null;
        return;
      }
      console.log("Selected Variations:", selectedVariations.value);
      console.log("Available Variations:", product.value.variations);
      console.log(product.value.variations);
      matchedVariation.value = product.value.variations.find((variation) => {
        return Object.entries(selectedVariations.value).every(([attrName, selectedValue]) => {
          const attr = variation.attributes.find((a) => a.name === attrName);
          if (!attr || selectedValue === null) return false;
          if (attr.value === null) return true;
          return attr.value.toLowerCase() === selectedValue.toLowerCase();
        });
      });
      console.log(Object.keys(selectedVariations.value).length);
      if (matchedVariation.value) {
        console.log(Object.keys(matchedVariation.value.attributes).length);
        if (Object.keys(matchedVariation.value.attributes).length == Object.keys(selectedVariations.value).length) {
          selectedVariation.value = matchedVariation.value;
        }
        variationError.value = "";
      } else {
        selectedVariation.value = null;
        variationError.value = "Please select valid variation options.";
      }
      for (const [key, value] of Object.entries(selectedVariations.value)) {
        console.log(`${key}: ${value}`);
        if (value == null) {
          selectedVariation.value = null;
        }
      }
      if (selectedVariation.value && selectedVariation.value.id) {
        selectedVariation.value = await fetchProductById(selectedVariation.value.id);
      }
      console.log(selectedVariation.value);
    }
    function addToCartHandler(e) {
      if (isVariable.value) {
        console.log(selectedVariation.value);
        if (!selectedVariation.value) {
          variationError.value = "Please select all variation options.";
          return;
        }
        addToCart(e);
      } else {
        addToCart(e);
      }
    }
    async function addToWishlist() {
      if (selectedVariation.value) {
        await cart.toggleWishlistItem(selectedVariation.value.id, $q);
      } else {
        await cart.toggleWishlistItem(product.value.id, $q);
      }
      if (cart.state.wishlist_items) {
        console.log(Object.values(cart.state.wishlist_items).find((obj) => selectedVariation.value ? selectedVariation.value.id : product.value.id === obj.id));
        console.log(cart.state.wishlist_items);
        console.log(cart.state.wishlist_items.length);
      }
      if (cart.state.wishlist_items && Object.values(cart.state.wishlist_items).find((obj) => selectedVariation.value ? selectedVariation.value.id : product.value.id === obj.id)) {
        wishlistAdded.value = false;
      } else {
        wishlistAdded.value = true;
      }
      console.log(selectedVariation.value ? selectedVariation.value.id : product.value.id);
      console.log(wishlistAdded.value);
    }
    onMounted(async () => {
      {
        if (!product.value || !product.value.id) {
          await fetchProduct(route.params.slug);
        }
        console.log("PWA Shell detected: Fetching SEO data from API...");
        try {
          const data = await fetchSeoForPath(`product/${route.params.slug}`);
          seoData.value = data;
        } catch (e) {
          console.error("PWA SEO fetch failed", e);
        }
      }
      {
        await fetchWishlistData();
      }
    });
    onBeforeRouteUpdate(async (to) => {
      try {
        await fetchProduct(to.params.slug);
      } catch (e) {
        console.error(e);
      }
    });
    watch(
      () => route.params.slug,
      async (newSlug, oldSlug) => {
        if (newSlug === oldSlug) return;
        selectedVariation.value = null;
        selectedVariations.value = {};
        variationError.value = "";
        quantity.value = 1;
        activeSlide.value = 0;
        fetchSeoForPath(`product/${newSlug}`).then((data) => seoData.value = data);
      }
    );
    const wheelZoom = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      zoom.value.scale = Math.min(Math.max(1, zoom.value.scale + delta), 4);
    };
    const startDrag = (e) => {
      zoom.value.dragging = true;
      zoom.value.startX = e.clientX;
      zoom.value.startY = e.clientY;
    };
    const dragging = (e) => {
      if (!zoom.value.dragging || zoom.value.scale === 1) return;
      const dx = e.clientX - zoom.value.startX;
      const dy = e.clientY - zoom.value.startY;
      zoom.value.x = zoom.value.lastX + dx;
      zoom.value.y = zoom.value.lastY + dy;
    };
    const stopDrag = () => {
      zoom.value.dragging = false;
      zoom.value.lastX = zoom.value.x;
      zoom.value.lastY = zoom.value.y;
    };
    let touchStart = { x: 0, y: 0, dist: 0 };
    const startTouch = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStart.dist = Math.sqrt(dx * dx + dy * dy);
      } else {
        touchStart.x = e.touches[0].clientX;
        touchStart.y = e.touches[0].clientY;
      }
    };
    const moveTouch = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const scaleChange = dist / touchStart.dist;
        zoom.value.scale = Math.min(Math.max(1, scaleChange), 4);
      }
    };
    const endTouch = () => {
    };
    const __returned__ = { $q, route, product, activeSlide, quantity, getSlugFromPermalink, seoData, availableAttributes, lightbox, zoom, zoomStyle, openLightbox, addToCart, handleAddToCart, increaseQty, decreaseQty, fetchProduct, isVariable, selectedVariations, selectedVariation, variationError, matchedVariation, wishlistAdded, resetVariations, shouldDisableCartButtons, fetchWishlistData, onVariationChange, addToCartHandler, addToWishlist, wheelZoom, startDrag, dragging, stopDrag, get touchStart() {
      return touchStart;
    }, set touchStart(v) {
      touchStart = v;
    }, startTouch, moveTouch, endTouch, ref, onMounted, computed, useSSRContext, watch, get useRoute() {
      return useRoute;
    }, get onBeforeRouteUpdate() {
      return onBeforeRouteUpdate;
    }, get fetchProductById() {
      return fetchProductById;
    }, get cart() {
      return cart;
    }, RelatedProductsSlider, get useQuasar() {
      return useQuasar;
    }, get useMeta() {
      return useMeta;
    }, get fetchSeoForPath() {
      return fetchSeoForPath;
    }, get productsStore() {
      return productsStore;
    }, get matFavoriteBorder() {
      return matFavoriteBorder;
    }, get matFavorite() {
      return matFavorite;
    }, get matAdd() {
      return matAdd;
    }, get matClose() {
      return matClose;
    }, get matRemove() {
      return matRemove;
    }, get matLens() {
      return matLens;
    }, get matArrowDropDown() {
      return matArrowDropDown;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  key: 0,
  class: "container"
};
const _hoisted_2 = { class: "q-pa-md row q-col-gutter-lg" };
const _hoisted_3 = { class: "col-12 col-md-6" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };
const _hoisted_6 = { class: "col-12 col-md-6" };
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = { class: "text-h4 q-mb-sm" };
const _hoisted_9 = { class: "q-mb-md" };
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = { class: "q-mb-md" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = ["innerHTML"];
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = ["innerHTML"];
const _hoisted_16 = {
  key: 0,
  class: "q-mb-md"
};
const _hoisted_17 = { class: "text-subtitle2 q-mb-xs" };
const _hoisted_18 = {
  key: 0,
  class: "text-negative text-caption q-mt-xs"
};
const _hoisted_19 = { key: 1 };
const _hoisted_20 = { key: 2 };
const _hoisted_21 = { class: "row items-center q-mb-md" };
const _hoisted_22 = { key: 3 };
const _hoisted_23 = { class: "full-width" };
const _hoisted_24 = ["src"];
const _hoisted_25 = {
  key: 1,
  class: "q-pa-md flex items-center justify-center"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return $setup.product ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        $setup.product.images.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(QCarousel, {
            onTouchstart: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"])),
            onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {
            }, ["stop"])),
            animated: "",
            modelValue: $setup.activeSlide,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.activeSlide = $event),
            height: "400px",
            navigation: "",
            autoplay: "",
            "control-color": "white",
            swipeable: "",
            infinite: "",
            "transition-prev": "slide-right",
            "transition-next": "slide-left",
            "navigation-icon": $setup.matLens
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.product.images, (img, index) => {
                return openBlock(), createBlock(QCarouselSlide, {
                  key: index,
                  name: index,
                  ratio: 1,
                  fit: "contain",
                  "img-src": img.src,
                  src: img.src,
                  srcset: img.srcset,
                  sizes: img.sizes,
                  onClick: ($event) => $setup.openLightbox(index),
                  style: { "cursor": "zoom-in" }
                }, null, 8, ["name", "img-src", "src", "srcset", "sizes", "onClick"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue", "navigation-icon"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
          createVNode(QImg, {
            "img-src": $setup.product.images[0]?.src,
            src: $setup.product.images[0]?.src,
            srcset: $setup.product.images[0]?.srcset,
            sizes: $setup.product.images[0]?.sizes,
            "spinner-color": "secondary",
            fit: "contain",
            style: { "cursor": "zoom-in", "max-height": "500px" },
            onClick: _cache[3] || (_cache[3] = ($event) => $setup.openLightbox(0))
          }, null, 8, ["img-src", "src", "srcset", "sizes"])
        ]))
      ]),
      createBaseVNode("div", _hoisted_6, [
        createVNode(QBreadcrumbs, null, {
          default: withCtx(() => [
            createVNode(QBreadcrumbsEl, {
              label: "Home",
              to: "/"
            }),
            createVNode(QBreadcrumbsEl, {
              to: `/product-category/${$setup.product.categories[0]?.slug}`
            }, {
              default: withCtx(() => [
                createBaseVNode("span", {
                  innerHTML: $setup.product.categories[0]?.name
                }, null, 8, _hoisted_7)
              ]),
              _: 1
            }, 8, ["to"]),
            createVNode(QBreadcrumbsEl, {
              label: $setup.product?.name
            }, null, 8, ["label"])
          ]),
          _: 1
        }),
        createBaseVNode("h1", _hoisted_8, toDisplayString($setup.product.name), 1),
        createBaseVNode("div", _hoisted_9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.product.categories, (cat) => {
            return openBlock(), createBlock(_component_router_link, {
              key: cat.id,
              to: `/product-category/${cat.slug}`,
              class: "no-decoration"
            }, {
              default: withCtx(() => [
                createVNode(QChip, {
                  color: "secondary",
                  "text-color": "white",
                  class: "category-chip",
                  dense: "",
                  clickable: ""
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", {
                      innerHTML: cat.name
                    }, null, 8, _hoisted_10)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["to"]);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_11, [
          $setup.selectedVariation ? (openBlock(), createElementBlock("div", _hoisted_12, [
            createBaseVNode("div", {
              innerHTML: $setup.selectedVariation.price_html
            }, null, 8, _hoisted_13)
          ])) : $setup.product ? (openBlock(), createElementBlock("div", {
            key: 1,
            innerHTML: $setup.product.price_html
          }, null, 8, _hoisted_14)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", {
          class: "q-mb-md",
          innerHTML: $setup.product.description
        }, null, 8, _hoisted_15),
        $setup.isVariable ? (openBlock(), createElementBlock("div", _hoisted_16, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.availableAttributes, (attribute) => {
            return openBlock(), createElementBlock("div", {
              key: attribute.id,
              class: "q-mb-sm"
            }, [
              createBaseVNode("label", _hoisted_17, toDisplayString(attribute.name), 1),
              createVNode(QSelect, {
                modelValue: $setup.selectedVariations[attribute.name],
                "onUpdate:modelValue": [($event) => $setup.selectedVariations[attribute.name] = $event, $setup.onVariationChange],
                options: attribute.options,
                dense: "",
                "dropdown-icon": $setup.matArrowDropDown,
                clearable: "",
                placeholder: `Select a ${attribute.name}`,
                label: `Select a ${attribute.name}`,
                "emit-value": "",
                "map-options": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "dropdown-icon", "placeholder", "label"])
            ]);
          }), 128)),
          $setup.variationError ? (openBlock(), createElementBlock("div", _hoisted_18, toDisplayString($setup.variationError), 1)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        $setup.product.status && $setup.product.status === "draft" ? (openBlock(), createElementBlock("div", _hoisted_19, [..._cache[7] || (_cache[7] = [
          createBaseVNode("b", null, "This is a draft product. It's shown for admins only!", -1)
        ])])) : $setup.product.is_in_stock ? (openBlock(), createElementBlock("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            createVNode(QBtn, {
              flat: "",
              round: "",
              icon: $setup.matRemove,
              onClick: $setup.decreaseQty
            }, null, 8, ["icon"]),
            createVNode(QInput, {
              modelValue: $setup.quantity,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.quantity = $event),
              modelModifiers: { number: true },
              type: "number",
              min: "1",
              dense: "",
              style: { "width": "60px", "text-align": "center" }
            }, null, 8, ["modelValue"]),
            createVNode(QBtn, {
              flat: "",
              round: "",
              icon: $setup.matAdd,
              onClick: $setup.increaseQty
            }, null, 8, ["icon"])
          ]),
          createVNode(QBtn, {
            label: "Add to Cart",
            class: "q-mr-sm",
            color: "secondary",
            disable: $setup.shouldDisableCartButtons,
            onClick: $setup.addToCartHandler,
            loading: $setup.cart.state.loading.cart
          }, {
            default: withCtx(() => [
              $setup.shouldDisableCartButtons ? (openBlock(), createBlock(QTooltip, { key: 0 }, {
                default: withCtx(() => [..._cache[8] || (_cache[8] = [
                  createTextVNode(" Please select a variation first. ", -1)
                ])]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["disable", "loading"]),
          createVNode(QBtn, {
            label: "Quick Checkout",
            color: "black",
            to: "/checkout",
            class: "quick-checkout-btn",
            disable: $setup.shouldDisableCartButtons,
            onClick: $setup.addToCartHandler,
            loading: $setup.cart.state.loading.quickbuy
          }, {
            default: withCtx(() => [
              $setup.shouldDisableCartButtons ? (openBlock(), createBlock(QTooltip, { key: 0 }, {
                default: withCtx(() => [..._cache[9] || (_cache[9] = [
                  createTextVNode(" Please select a variation first. ", -1)
                ])]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["disable", "loading"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_22, " Out of stock ")),
        createBaseVNode("div", _hoisted_23, [
          $setup.cart.state.wishlist_items && Object.values($setup.cart.state.wishlist_items).find((obj) => $setup.selectedVariation ? $setup.selectedVariation.id : $setup.product.id === obj.id) ? (openBlock(), createBlock(QBtn, {
            key: 0,
            class: "text-black q-pa-none text-caption q-mt-sm",
            flat: "",
            loading: $setup.cart.state.loading.wishlist,
            onClick: $setup.addToWishlist,
            color: "accent",
            label: "Remove from wishlist",
            icon: $setup.matFavorite
          }, null, 8, ["loading", "icon"])) : (openBlock(), createBlock(QBtn, {
            key: 1,
            class: "text-black q-pa-none text-caption q-mt-sm",
            flat: "",
            loading: $setup.cart.state.loading.wishlist,
            onClick: $setup.addToWishlist,
            color: "accent",
            label: "Add to wishlist",
            icon: $setup.matFavoriteBorder
          }, null, 8, ["loading", "icon"]))
        ])
      ])
    ]),
    createVNode(QDialog, {
      modelValue: $setup.lightbox.open,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.lightbox.open = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, {
          class: "bg-black text-white",
          style: { "max-width": "100vw", "max-height": "100vh", "overflow": "hidden" }
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              class: "q-pa-md flex flex-center",
              ref: "zoomContainer",
              onTouchstart: $setup.startTouch,
              onTouchmove: $setup.moveTouch,
              onTouchend: $setup.endTouch,
              onWheel: $setup.wheelZoom,
              onMousedown: $setup.startDrag,
              onMousemove: $setup.dragging,
              onMouseup: $setup.stopDrag,
              onMouseleave: $setup.stopDrag,
              style: { "overflow": "hidden", "position": "relative" }
            }, [
              createBaseVNode("img", {
                src: $setup.product.images[$setup.lightbox.index]?.src,
                style: normalizeStyle($setup.zoomStyle),
                ref: "zoomImage",
                draggable: "false"
              }, null, 12, _hoisted_24),
              createVNode(QBtn, {
                round: "",
                dense: "",
                icon: $setup.matClose,
                color: "white",
                "text-color": "black",
                class: "absolute-top-right q-ma-sm z-top",
                onClick: _cache[5] || (_cache[5] = ($event) => $setup.lightbox.open = false)
              }, null, 8, ["icon"])
            ], 544)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createVNode($setup["RelatedProductsSlider"], {
      productId: $setup.product.id,
      categoryId: $setup.product.categories[0]?.id,
      maxVisible: 4
    }, null, 8, ["productId", "categoryId"])
  ])) : $setup.product === null ? (openBlock(), createElementBlock("div", _hoisted_25, [
    createVNode(QSpinner, {
      color: "secondary",
      size: "6em"
    })
  ])) : createCommentVNode("", true);
}
const ProductPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d84ed9c6"], ["__file", "ProductPage.vue"]]);
export {
  ProductPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdFBhZ2UtTERWQXZrblcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2Fyb3VzZWwvUUNhcm91c2VsU2xpZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Nhcm91c2VsL1FDYXJvdXNlbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdG9vbHRpcC9RVG9vbHRpcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2Fyb3VzZWwvUUNhcm91c2VsQ29udHJvbC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1JlbGF0ZWRQcm9kdWN0c1NsaWRlci52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvUHJvZHVjdFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wYW5lbC91c2UtcGFuZWwuanMnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcm91c2VsU2xpZGUnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUGFuZWxDaGlsZFByb3BzLFxuICAgIGltZ1NyYzogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmltZ1NyY1xuICAgICAgICA/IHsgYmFja2dyb3VuZEltYWdlOiBgdXJsKFwiJHsgcHJvcHMuaW1nU3JjIH1cIilgIH1cbiAgICAgICAgOiB7fVxuICAgICkpXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLWNhcm91c2VsX19zbGlkZScsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUGFuZWwsIHsgdXNlUGFuZWxQcm9wcywgdXNlUGFuZWxFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBhbmVsL3VzZS1wYW5lbC5qcydcbmltcG9ydCB1c2VGdWxsc2NyZWVuLCB7IHVzZUZ1bGxzY3JlZW5Qcm9wcywgdXNlRnVsbHNjcmVlbkVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZnVsbHNjcmVlbi91c2UtZnVsbHNjcmVlbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QsIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmNvbnN0IG5hdmlnYXRpb25Qb3NpdGlvbk9wdGlvbnMgPSBbICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnIF1cbmNvbnN0IGNvbnRyb2xUeXBlT3B0aW9ucyA9IFsgJ3JlZ3VsYXInLCAnZmxhdCcsICdvdXRsaW5lJywgJ3B1c2gnLCAndW5lbGV2YXRlZCcgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcm91c2VsJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuICAgIC4uLnVzZUZ1bGxzY3JlZW5Qcm9wcyxcblxuICAgIHRyYW5zaXRpb25QcmV2OiB7IC8vIHVzZVBhbmVsUGFyZW50UHJvcHMgb3ZlcnJpZGVcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbk5leHQ6IHsgLy8gdXNlUGFuZWxQYXJlbnRQcm9wcyBvdmVycmlkZVxuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2ZhZGUnXG4gICAgfSxcblxuICAgIGhlaWdodDogU3RyaW5nLFxuICAgIHBhZGRpbmc6IEJvb2xlYW4sXG5cbiAgICBjb250cm9sQ29sb3I6IFN0cmluZyxcbiAgICBjb250cm9sVGV4dENvbG9yOiBTdHJpbmcsXG4gICAgY29udHJvbFR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBjb250cm9sVHlwZU9wdGlvbnMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZmxhdCdcbiAgICB9LFxuXG4gICAgYXV0b3BsYXk6IFsgTnVtYmVyLCBCb29sZWFuIF0sXG5cbiAgICBhcnJvd3M6IEJvb2xlYW4sXG4gICAgcHJldkljb246IFN0cmluZyxcbiAgICBuZXh0SWNvbjogU3RyaW5nLFxuXG4gICAgbmF2aWdhdGlvbjogQm9vbGVhbixcbiAgICBuYXZpZ2F0aW9uUG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBuYXZpZ2F0aW9uUG9zaXRpb25PcHRpb25zLmluY2x1ZGVzKHYpXG4gICAgfSxcbiAgICBuYXZpZ2F0aW9uSWNvbjogU3RyaW5nLFxuICAgIG5hdmlnYXRpb25BY3RpdmVJY29uOiBTdHJpbmcsXG5cbiAgICB0aHVtYm5haWxzOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGdWxsc2NyZWVuRW1pdHMsXG4gICAgLi4udXNlUGFuZWxFbWl0c1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCBwYW5lbHNMZW5cblxuICAgIGNvbnN0IHtcbiAgICAgIHVwZGF0ZVBhbmVsc0xpc3QsIGdldFBhbmVsQ29udGVudCxcbiAgICAgIHBhbmVsRGlyZWN0aXZlcywgZ29Ub1BhbmVsLFxuICAgICAgcHJldmlvdXNQYW5lbCwgbmV4dFBhbmVsLCBnZXRFbmFibGVkUGFuZWxzLFxuICAgICAgcGFuZWxJbmRleFxuICAgIH0gPSB1c2VQYW5lbCgpXG5cbiAgICBjb25zdCB7IGluRnVsbHNjcmVlbiB9ID0gdXNlRnVsbHNjcmVlbigpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIGluRnVsbHNjcmVlbi52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oZWlnaHQgIT09IHZvaWQgMFxuICAgICAgICA/IHsgaGVpZ2h0OiBwcm9wcy5oZWlnaHQgfVxuICAgICAgICA6IHt9XG4gICAgKSlcblxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcpKVxuXG4gICAgY29uc3QgbmF2aWdhdGlvblBvc2l0aW9uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMubmF2aWdhdGlvblBvc2l0aW9uXG4gICAgICB8fCAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAncmlnaHQnIDogJ2JvdHRvbScpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1jYXJvdXNlbCBxLXBhbmVsLXBhcmVudCBxLWNhcm91c2VsLS13aXRoJHsgcHJvcHMucGFkZGluZyA9PT0gdHJ1ZSA/ICcnIDogJ291dCcgfS1wYWRkaW5nYFxuICAgICAgKyAoaW5GdWxsc2NyZWVuLnZhbHVlID09PSB0cnVlID8gJyBmdWxsc2NyZWVuJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNhcm91c2VsLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmFycm93cyA9PT0gdHJ1ZSA/IGAgcS1jYXJvdXNlbC0tYXJyb3dzLSR7IGRpcmVjdGlvbi52YWx1ZSB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMubmF2aWdhdGlvbiA9PT0gdHJ1ZSA/IGAgcS1jYXJvdXNlbC0tbmF2aWdhdGlvbi0keyBuYXZpZ2F0aW9uUG9zaXRpb24udmFsdWUgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBhcnJvd0ljb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgaWNvID0gW1xuICAgICAgICBwcm9wcy5wcmV2SWNvbiB8fCAkcS5pY29uU2V0LmNhcm91c2VsWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCcgXSxcbiAgICAgICAgcHJvcHMubmV4dEljb24gfHwgJHEuaWNvblNldC5jYXJvdXNlbFsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnZG93bicgOiAncmlnaHQnIF1cbiAgICAgIF1cblxuICAgICAgcmV0dXJuIHByb3BzLnZlcnRpY2FsID09PSBmYWxzZSAmJiAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZVxuICAgICAgICA/IGljby5yZXZlcnNlKClcbiAgICAgICAgOiBpY29cbiAgICB9KVxuXG4gICAgY29uc3QgbmF2SWNvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLm5hdmlnYXRpb25JY29uIHx8ICRxLmljb25TZXQuY2Fyb3VzZWwubmF2aWdhdGlvbkljb24pXG4gICAgY29uc3QgbmF2QWN0aXZlSWNvbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLm5hdmlnYXRpb25BY3RpdmVJY29uIHx8IG5hdkljb24udmFsdWUpXG5cbiAgICBjb25zdCBjb250cm9sUHJvcHMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgY29sb3I6IHByb3BzLmNvbnRyb2xDb2xvcixcbiAgICAgIHRleHRDb2xvcjogcHJvcHMuY29udHJvbFRleHRDb2xvcixcbiAgICAgIHJvdW5kOiB0cnVlLFxuICAgICAgWyBwcm9wcy5jb250cm9sVHlwZSBdOiB0cnVlLFxuICAgICAgZGVuc2U6IHRydWVcbiAgICB9KSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5hdXRvcGxheSkge1xuICAgICAgICBzdGFydFRpbWVyKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b3BsYXksIHZhbCA9PiB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHN0YXJ0VGltZXIoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc3RhcnRUaW1lciAoKSB7XG4gICAgICBjb25zdCBkdXJhdGlvbiA9IGlzTnVtYmVyKHByb3BzLmF1dG9wbGF5KSA9PT0gdHJ1ZVxuICAgICAgICA/IE1hdGguYWJzKHByb3BzLmF1dG9wbGF5KVxuICAgICAgICA6IDUwMDBcblxuICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG5cbiAgICAgICAgaWYgKGR1cmF0aW9uID49IDApIHtcbiAgICAgICAgICBuZXh0UGFuZWwoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHByZXZpb3VzUGFuZWwoKVxuICAgICAgICB9XG4gICAgICB9LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b3BsYXkgJiYgc3RhcnRUaW1lcigpXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGdldE5hdmlnYXRpb25Db250YWluZXIgKHR5cGUsIG1hcHBpbmcpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1jYXJvdXNlbF9fY29udHJvbCBxLWNhcm91c2VsX19uYXZpZ2F0aW9uIG5vLXdyYXAgYWJzb2x1dGUgZmxleCdcbiAgICAgICAgICArIGAgcS1jYXJvdXNlbF9fbmF2aWdhdGlvbi0tJHsgdHlwZSB9IHEtY2Fyb3VzZWxfX25hdmlnYXRpb24tLSR7IG5hdmlnYXRpb25Qb3NpdGlvbi52YWx1ZSB9YFxuICAgICAgICAgICsgKHByb3BzLmNvbnRyb2xDb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbnRyb2xDb2xvciB9YCA6ICcnKVxuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNhcm91c2VsX19uYXZpZ2F0aW9uLWlubmVyIGZsZXggZmxleC1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgfSwgZ2V0RW5hYmxlZFBhbmVscygpLm1hcChtYXBwaW5nKSlcbiAgICAgIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBub2RlID0gW11cblxuICAgICAgaWYgKHByb3BzLm5hdmlnYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgZm4gPSBzbG90c1sgJ25hdmlnYXRpb24taWNvbicgXSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90c1sgJ25hdmlnYXRpb24taWNvbicgXVxuICAgICAgICAgIDogb3B0cyA9PiBoKFFCdG4sIHtcbiAgICAgICAgICAgIGtleTogJ25hdicgKyBvcHRzLm5hbWUsXG4gICAgICAgICAgICBjbGFzczogYHEtY2Fyb3VzZWxfX25hdmlnYXRpb24taWNvbiBxLWNhcm91c2VsX19uYXZpZ2F0aW9uLWljb24tLSR7IG9wdHMuYWN0aXZlID09PSB0cnVlID8gJycgOiAnaW4nIH1hY3RpdmVgLFxuICAgICAgICAgICAgLi4ub3B0cy5idG5Qcm9wcyxcbiAgICAgICAgICAgIG9uQ2xpY2s6IG9wdHMub25DbGlja1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgbWF4SW5kZXggPSBwYW5lbHNMZW4gLSAxXG4gICAgICAgIG5vZGUucHVzaChcbiAgICAgICAgICBnZXROYXZpZ2F0aW9uQ29udGFpbmVyKCdidXR0b25zJywgKHBhbmVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBhbmVsLnByb3BzLm5hbWVcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHBhbmVsSW5kZXgudmFsdWUgPT09IGluZGV4XG5cbiAgICAgICAgICAgIHJldHVybiBmbih7XG4gICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICBtYXhJbmRleCxcbiAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgICAgICBidG5Qcm9wczoge1xuICAgICAgICAgICAgICAgIGljb246IGFjdGl2ZSA9PT0gdHJ1ZSA/IG5hdkFjdGl2ZUljb24udmFsdWUgOiBuYXZJY29uLnZhbHVlLFxuICAgICAgICAgICAgICAgIHNpemU6ICdzbScsXG4gICAgICAgICAgICAgICAgLi4uY29udHJvbFByb3BzLnZhbHVlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgZ29Ub1BhbmVsKG5hbWUpIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMudGh1bWJuYWlscyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBjb2xvciA9IHByb3BzLmNvbnRyb2xDb2xvciAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29udHJvbENvbG9yIH1gXG4gICAgICAgICAgOiAnJ1xuXG4gICAgICAgIG5vZGUucHVzaChnZXROYXZpZ2F0aW9uQ29udGFpbmVyKCd0aHVtYm5haWxzJywgcGFuZWwgPT4ge1xuICAgICAgICAgIGNvbnN0IHNsaWRlID0gcGFuZWwucHJvcHNcblxuICAgICAgICAgIHJldHVybiBoKCdpbWcnLCB7XG4gICAgICAgICAgICBrZXk6ICd0bWIjJyArIHNsaWRlLm5hbWUsXG4gICAgICAgICAgICBjbGFzczogYHEtY2Fyb3VzZWxfX3RodW1ibmFpbCBxLWNhcm91c2VsX190aHVtYm5haWwtLSR7IHNsaWRlLm5hbWUgPT09IHByb3BzLm1vZGVsVmFsdWUgPyAnJyA6ICdpbicgfWFjdGl2ZWAgKyBjb2xvcixcbiAgICAgICAgICAgIHNyYzogc2xpZGUuaW1nU3JjIHx8IHNsaWRlWyAnaW1nLXNyYycgXSxcbiAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgZ29Ub1BhbmVsKHNsaWRlLm5hbWUpIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmFycm93cyA9PT0gdHJ1ZSAmJiBwYW5lbEluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgaWYgKHByb3BzLmluZmluaXRlID09PSB0cnVlIHx8IHBhbmVsSW5kZXgudmFsdWUgPiAwKSB7XG4gICAgICAgICAgbm9kZS5wdXNoKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6ICdwcmV2JyxcbiAgICAgICAgICAgICAgY2xhc3M6IGBxLWNhcm91c2VsX19jb250cm9sIHEtY2Fyb3VzZWxfX2Fycm93IHEtY2Fyb3VzZWxfX3ByZXYtYXJyb3cgcS1jYXJvdXNlbF9fcHJldi1hcnJvdy0tJHsgZGlyZWN0aW9uLnZhbHVlIH0gYWJzb2x1dGUgZmxleCBmbGV4LWNlbnRlcmBcbiAgICAgICAgICAgIH0sIFtcbiAgICAgICAgICAgICAgaChRQnRuLCB7XG4gICAgICAgICAgICAgICAgaWNvbjogYXJyb3dJY29ucy52YWx1ZVsgMCBdLFxuICAgICAgICAgICAgICAgIC4uLmNvbnRyb2xQcm9wcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiBwcmV2aW91c1BhbmVsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5pbmZpbml0ZSA9PT0gdHJ1ZSB8fCBwYW5lbEluZGV4LnZhbHVlIDwgcGFuZWxzTGVuIC0gMSkge1xuICAgICAgICAgIG5vZGUucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnbmV4dCcsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1jYXJvdXNlbF9fY29udHJvbCBxLWNhcm91c2VsX19hcnJvdyBxLWNhcm91c2VsX19uZXh0LWFycm93J1xuICAgICAgICAgICAgICAgICsgYCBxLWNhcm91c2VsX19uZXh0LWFycm93LS0keyBkaXJlY3Rpb24udmFsdWUgfSBhYnNvbHV0ZSBmbGV4IGZsZXgtY2VudGVyYFxuICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgICAgICBpY29uOiBhcnJvd0ljb25zLnZhbHVlWyAxIF0sXG4gICAgICAgICAgICAgICAgLi4uY29udHJvbFByb3BzLnZhbHVlLFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IG5leHRQYW5lbFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhNZXJnZVNsb3Qoc2xvdHMuY29udHJvbCwgbm9kZSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcGFuZWxzTGVuID0gdXBkYXRlUGFuZWxzTGlzdChzbG90cylcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgICAgfSwgW1xuICAgICAgICBoRGlyKFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHsgY2xhc3M6ICdxLWNhcm91c2VsX19zbGlkZXMtY29udGFpbmVyJyB9LFxuICAgICAgICAgIGdldFBhbmVsQ29udGVudCgpLFxuICAgICAgICAgICdzbC1jb250JyxcbiAgICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICAgKCkgPT4gcGFuZWxEaXJlY3RpdmVzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIF0uY29uY2F0KGdldENvbnRlbnQoKSkpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQW5jaG9yLCB7IHVzZUFuY2hvclN0YXRpY1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYW5jaG9yL3VzZS1hbmNob3IuanMnXG5pbXBvcnQgdXNlU2Nyb2xsVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuaW1wb3J0IHVzZVBvcnRhbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wb3J0YWwvdXNlLXBvcnRhbC5qcydcbmltcG9ydCB1c2VUcmFuc2l0aW9uLCB7IHVzZVRyYW5zaXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXRyYW5zaXRpb24vdXNlLXRyYW5zaXRpb24uanMnXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aW1lb3V0L3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxUYXJnZXQsIHNjcm9sbFRhcmdldFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQsIGFkZEV2dCwgY2xlYW5FdnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBhZGRDbGlja091dHNpZGUsIHJlbW92ZUNsaWNrT3V0c2lkZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLmpzJ1xuaW1wb3J0IHtcbiAgdmFsaWRhdGVQb3NpdGlvbiwgdmFsaWRhdGVPZmZzZXQsIHNldFBvc2l0aW9uLCBwYXJzZVBvc2l0aW9uXG59IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucG9zaXRpb24tZW5naW5lL3Bvc2l0aW9uLWVuZ2luZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUb29sdGlwJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQW5jaG9yU3RhdGljUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMsXG5cbiAgICBtYXhIZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG1heFdpZHRoOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25TaG93OiB7XG4gICAgICAuLi51c2VUcmFuc2l0aW9uUHJvcHMudHJhbnNpdGlvblNob3csXG4gICAgICBkZWZhdWx0OiAnanVtcC1kb3duJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbkhpZGU6IHtcbiAgICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgIGRlZmF1bHQ6ICdqdW1wLXVwJ1xuICAgIH0sXG5cbiAgICBhbmNob3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdib3R0b20gbWlkZGxlJyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVQb3NpdGlvblxuICAgIH0sXG4gICAgc2VsZjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RvcCBtaWRkbGUnLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gWyAxNCwgMTQgXSxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVPZmZzZXRcbiAgICB9LFxuXG4gICAgc2Nyb2xsVGFyZ2V0OiBzY3JvbGxUYXJnZXRQcm9wLFxuXG4gICAgZGVsYXk6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgaGlkZURlbGF5OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW5cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHNcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQsIGF0dHJzIH0pIHtcbiAgICBsZXQgdW53YXRjaFBvc2l0aW9uLCBvYnNlcnZlclxuXG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gdm1cblxuICAgIGNvbnN0IGlubmVyUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IGFuY2hvck9yaWdpbiA9IGNvbXB1dGVkKCgpID0+IHBhcnNlUG9zaXRpb24ocHJvcHMuYW5jaG9yLCAkcS5sYW5nLnJ0bCkpXG4gICAgY29uc3Qgc2VsZk9yaWdpbiA9IGNvbXB1dGVkKCgpID0+IHBhcnNlUG9zaXRpb24ocHJvcHMuc2VsZiwgJHEubGFuZy5ydGwpKVxuICAgIGNvbnN0IGhpZGVPblJvdXRlQ2hhbmdlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZSlcblxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaWNrLCByZW1vdmVUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyB0cmFuc2l0aW9uUHJvcHMsIHRyYW5zaXRpb25TdHlsZSB9ID0gdXNlVHJhbnNpdGlvbihwcm9wcylcbiAgICBjb25zdCB7IGxvY2FsU2Nyb2xsVGFyZ2V0LCBjaGFuZ2VTY3JvbGxFdmVudCwgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgfSA9IHVzZVNjcm9sbFRhcmdldChwcm9wcywgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KVxuXG4gICAgY29uc3QgeyBhbmNob3JFbCwgY2FuU2hvdywgYW5jaG9yRXZlbnRzIH0gPSB1c2VBbmNob3IoeyBzaG93aW5nLCBjb25maWd1cmVBbmNob3JFbCB9KVxuXG4gICAgY29uc3QgeyBzaG93LCBoaWRlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7XG4gICAgICBzaG93aW5nLCBjYW5TaG93LCBoYW5kbGVTaG93LCBoYW5kbGVIaWRlLFxuICAgICAgaGlkZU9uUm91dGVDaGFuZ2UsXG4gICAgICBwcm9jZXNzT25Nb3VudDogdHJ1ZVxuICAgIH0pXG5cbiAgICBPYmplY3QuYXNzaWduKGFuY2hvckV2ZW50cywgeyBkZWxheVNob3csIGRlbGF5SGlkZSB9KVxuXG4gICAgY29uc3QgeyBzaG93UG9ydGFsLCBoaWRlUG9ydGFsLCByZW5kZXJQb3J0YWwgfSA9IHVzZVBvcnRhbCh2bSwgaW5uZXJSZWYsIHJlbmRlclBvcnRhbENvbnRlbnQsICd0b29sdGlwJylcblxuICAgIC8vIGlmIHdlJ3JlIG9uIG1vYmlsZSwgbGV0J3MgaW1wcm92ZSB0aGUgZXhwZXJpZW5jZVxuICAgIC8vIGJ5IGNsb3NpbmcgaXQgd2hlbiB1c2VyIHRhcHMgb3V0c2lkZSBvZiBpdFxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGNsaWNrT3V0c2lkZVByb3BzID0ge1xuICAgICAgICBhbmNob3JFbCxcbiAgICAgICAgaW5uZXJSZWYsXG4gICAgICAgIG9uQ2xpY2tPdXRzaWRlIChlKSB7XG4gICAgICAgICAgaGlkZShlKVxuXG4gICAgICAgICAgLy8gcHJldmVudCBjbGljayBpZiBpdCdzIG9uIGEgZGlhbG9nIGJhY2tkcm9wXG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncS1kaWFsb2dfX2JhY2tkcm9wJykpIHtcbiAgICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoYXNDbGlja091dHNpZGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgICAvLyBpdCBkb2Vzbid0IGhhcyBleHRlcm5hbCBtb2RlbFxuICAgICAgICAvLyAobnVsbCBpcyB0aGUgZGVmYXVsdCB2YWx1ZSlcbiAgICAgICAgcHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbFxuICAgICAgICAvLyBhbmQgaXQncyBub3QgcGVyc2lzdGVudFxuICAgICAgICAmJiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlXG4gICAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgIClcblxuICAgICAgd2F0Y2goaGFzQ2xpY2tPdXRzaWRlLCB2YWwgPT4ge1xuICAgICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IGFkZENsaWNrT3V0c2lkZSA6IHJlbW92ZUNsaWNrT3V0c2lkZVxuICAgICAgICBmbihjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICAgIHJlbW92ZUNsaWNrT3V0c2lkZShjbGlja091dHNpZGVQcm9wcylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0KSB7XG4gICAgICBzaG93UG9ydGFsKClcblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpY2soKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaWNrKCgpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB1cGRhdGVQb3NpdGlvbigpKVxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGlubmVyUmVmLnZhbHVlLCB7IGF0dHJpYnV0ZXM6IGZhbHNlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IHRydWUgfSlcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKVxuICAgICAgICBjb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgfSlcblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHdhdGNoKFxuICAgICAgICAgICgpID0+ICRxLnNjcmVlbi53aWR0aCArICd8JyArICRxLnNjcmVlbi5oZWlnaHQgKyAnfCcgKyBwcm9wcy5zZWxmICsgJ3wnICsgcHJvcHMuYW5jaG9yICsgJ3wnICsgJHEubGFuZy5ydGwsXG4gICAgICAgICAgdXBkYXRlUG9zaXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzaG93UG9ydGFsKHRydWUpIC8vIGRvbmUgc2hvd2luZyBwb3J0YWxcbiAgICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICAgIH0sIHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQpIHtcbiAgICAgIHJlbW92ZVRpY2soKVxuICAgICAgaGlkZVBvcnRhbCgpXG5cbiAgICAgIGFuY2hvckNsZWFudXAoKVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGltZW91dCgpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoaWRlUG9ydGFsKHRydWUpIC8vIGRvbmUgaGlkaW5nLCBub3cgZGVzdHJveVxuICAgICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuY2hvckNsZWFudXAgKCkge1xuICAgICAgaWYgKG9ic2VydmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgIG9ic2VydmVyID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmICh1bndhdGNoUG9zaXRpb24gIT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUG9zaXRpb24oKVxuICAgICAgICB1bndhdGNoUG9zaXRpb24gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY2xlYW5FdnQoYW5jaG9yRXZlbnRzLCAndG9vbHRpcFRlbXAnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uICgpIHtcbiAgICAgIHNldFBvc2l0aW9uKHtcbiAgICAgICAgdGFyZ2V0RWw6IGlubmVyUmVmLnZhbHVlLFxuICAgICAgICBvZmZzZXQ6IHByb3BzLm9mZnNldCxcbiAgICAgICAgYW5jaG9yRWw6IGFuY2hvckVsLnZhbHVlLFxuICAgICAgICBhbmNob3JPcmlnaW46IGFuY2hvck9yaWdpbi52YWx1ZSxcbiAgICAgICAgc2VsZk9yaWdpbjogc2VsZk9yaWdpbi52YWx1ZSxcbiAgICAgICAgbWF4SGVpZ2h0OiBwcm9wcy5tYXhIZWlnaHQsXG4gICAgICAgIG1heFdpZHRoOiBwcm9wcy5tYXhXaWR0aFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxheVNob3cgKGV2dCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGFuY2hvckVsLnZhbHVlXG4gICAgICAgIGNvbnN0IGV2dHMgPSBbICd0b3VjaG1vdmUnLCAndG91Y2hjYW5jZWwnLCAndG91Y2hlbmQnLCAnY2xpY2snIF1cbiAgICAgICAgICAubWFwKGUgPT4gKFsgdGFyZ2V0LCBlLCAnZGVsYXlIaWRlJywgJ3Bhc3NpdmVDYXB0dXJlJyBdKSlcblxuICAgICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAndG9vbHRpcFRlbXAnLCBldnRzKVxuICAgICAgfVxuXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4geyBzaG93KGV2dCkgfSwgcHJvcHMuZGVsYXkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsYXlIaWRlIChldnQpIHtcbiAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgY2xlYW5FdnQoYW5jaG9yRXZlbnRzLCAndG9vbHRpcFRlbXAnKVxuICAgICAgICBjbGVhclNlbGVjdGlvbigpXG4gICAgICAgIC8vIGRlbGF5IG5lZWRlZCBvdGhlcndpc2Ugc2VsZWN0aW9uIHN0aWxsIG9jY3Vyc1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgfSwgMTApXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IGhpZGUoZXZ0KSB9LCBwcm9wcy5oaWRlRGVsYXkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlQW5jaG9yRWwgKCkge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5ub1BhcmVudEV2ZW50ID09PSB0cnVlXG4gICAgICAgIHx8IGFuY2hvckVsLnZhbHVlID09PSBudWxsXG4gICAgICApIHJldHVyblxuXG4gICAgICBjb25zdCBldnRzID0gJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlXG4gICAgICAgID8gW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ3RvdWNoc3RhcnQnLCAnZGVsYXlTaG93JywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIDogW1xuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ21vdXNlZW50ZXInLCAnZGVsYXlTaG93JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2VsZWF2ZScsICdkZWxheUhpZGUnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cblxuICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIGV2dHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlU2Nyb2xsVGFyZ2V0ICgpIHtcbiAgICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCB8fCBwcm9wcy5zY3JvbGxUYXJnZXQgIT09IHZvaWQgMCkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IGdldFNjcm9sbFRhcmdldChhbmNob3JFbC52YWx1ZSwgcHJvcHMuc2Nyb2xsVGFyZ2V0KVxuICAgICAgICBjb25zdCBmbiA9IHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWVcbiAgICAgICAgICA/IHVwZGF0ZVBvc2l0aW9uXG4gICAgICAgICAgOiBoaWRlXG5cbiAgICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUsIGZuKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRvb2x0aXBDb250ZW50ICgpIHtcbiAgICAgIHJldHVybiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIHJlZjogaW5uZXJSZWYsXG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICdxLXRvb2x0aXAgcS10b29sdGlwLS1zdHlsZSBxLXBvc2l0aW9uLWVuZ2luZSBuby1wb2ludGVyLWV2ZW50cycsXG4gICAgICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgICAgIF0sXG4gICAgICAgICAgc3R5bGU6IFtcbiAgICAgICAgICAgIGF0dHJzLnN0eWxlLFxuICAgICAgICAgICAgdHJhbnNpdGlvblN0eWxlLnZhbHVlXG4gICAgICAgICAgXSxcbiAgICAgICAgICByb2xlOiAndG9vbHRpcCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclBvcnRhbENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIGgoVHJhbnNpdGlvbiwgdHJhbnNpdGlvblByb3BzLnZhbHVlLCBnZXRUb29sdGlwQ29udGVudClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoYW5jaG9yQ2xlYW51cClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24odm0ucHJveHksIHsgdXBkYXRlUG9zaXRpb24gfSlcblxuICAgIHJldHVybiByZW5kZXJQb3J0YWxcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJvdXNlbENvbnRyb2wnLFxuXG4gIHByb3BzOiB7XG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdib3R0b20tcmlnaHQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFtcbiAgICAgICAgJ3RvcC1yaWdodCcsICd0b3AtbGVmdCcsXG4gICAgICAgICdib3R0b20tcmlnaHQnLCAnYm90dG9tLWxlZnQnLFxuICAgICAgICAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J1xuICAgICAgXS5pbmNsdWRlcyh2KVxuICAgIH0sXG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFsgMTgsIDE4IF0sXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdi5sZW5ndGggPT09IDJcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4gYHEtY2Fyb3VzZWxfX2NvbnRyb2wgYWJzb2x1dGUgYWJzb2x1dGUtJHsgcHJvcHMucG9zaXRpb24gfWApXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgbWFyZ2luOiBgJHsgcHJvcHMub2Zmc2V0WyAxIF0gfXB4ICR7IHByb3BzLm9mZnNldFsgMCBdIH1weGBcbiAgICB9KSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxzZWN0aW9uIGNsYXNzPVwicmVsYXRlZC1wcm9kdWN0c1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxoMyBjbGFzcz1cInRleHQtaDUgcS1tYi1tZCB0ZXh0LWNlbnRlclwiPlJlbGF0ZWQgUHJvZHVjdHM8L2gzPlxyXG5cclxuICAgIDwhLS0gR1JJRCBNT0RFIChmb3IgZmV3IHByb2R1Y3RzKSAtLT5cclxuICAgIDxkaXYgdi1pZj1cInByb2R1Y3RzLmxlbmd0aCA8PSBwZXJTbGlkZVwiIGNsYXNzPVwicmVsYXRlZC1wcm9kdWN0LXdyYXBwZXIgcm93IGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICB2LWZvcj1cInByb2R1Y3QgaW4gcHJvZHVjdHNcIlxyXG4gICAgICAgIDprZXk9XCJwcm9kdWN0LmlkXCJcclxuICAgICAgICBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtMyBxLW1iLW1kIHJlbGF0aXZlLXBvc2l0aW9uXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxyb3V0ZXItbGluayA6dG89XCJgL3Byb2R1Y3QvJHtnZXRTbHVnRnJvbVBlcm1hbGluayhwcm9kdWN0LnBlcm1hbGluayl9YFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbG9vcC13bCBhYnNvbHV0ZVwiPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biBjbGFzcz1cInRleHQtYmxhY2sgcS1wYS1ub25lIHRleHQtY2FwdGlvbiBxLW10LXNtXCIgZmxhdCA6bG9hZGluZz1cImNhcnQuc3RhdGUubG9hZGluZy53aXNobGlzdFwiIHYtaWY9XCJjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zICYmIE9iamVjdC52YWx1ZXMoY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcykuZmluZChvYmogPT4gcHJvZHVjdC5pZCA9PT0gb2JqLmlkKVwiIEBjbGljay5wcmV2ZW50PVwiYWRkVG9XaXNobGlzdChwcm9kdWN0LmlkKVwiIGNvbG9yPVwiYWNjZW50XCIgOmljb249XCJtYXRGYXZvcml0ZVwiIC8+XHJcbiAgICAgICAgICAgICAgPHEtYnRuIGNsYXNzPVwidGV4dC1ibGFjayBxLXBhLW5vbmUgdGV4dC1jYXB0aW9uIHEtbXQtc21cIiBmbGF0IDpsb2FkaW5nPVwiY2FydC5zdGF0ZS5sb2FkaW5nLndpc2hsaXN0XCIgdi1lbHNlIEBjbGljay5wcmV2ZW50PVwiYWRkVG9XaXNobGlzdChwcm9kdWN0LmlkKVwiIGNvbG9yPVwiYWNjZW50XCIgOmljb249XCJtYXRGYXZvcml0ZUJvcmRlclwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8cS1jYXJkIGNsYXNzPVwibXktY2FyZCBmdWxsLWhlaWdodFwiPlxyXG4gICAgICAgICAgICA8cS1pbWdcclxuICAgICAgICAgICAgICAgIGZpdD1cImNvbnRhaW5cIlxyXG4gICAgICAgICAgICA6aW1nLXNyYz1cInByb2R1Y3QuaW1hZ2VzWzBdPy5zcmNcIlxyXG4gICAgICAgICAgICA6c3JjPVwicHJvZHVjdC5pbWFnZXNbMF0/LnNyY1wiXHJcbiAgICAgICAgICAgIDpzcmNzZXQ9XCJwcm9kdWN0LmltYWdlc1swXT8uc3Jjc2V0XCJcclxuICAgICAgICAgICAgOnNpemVzPVwicHJvZHVjdC5pbWFnZXNbMF0/LnNpemVzXCJcclxuICAgICAgICAgICAgOmFsdD1cInByb2R1Y3QubmFtZVwiXHJcbiAgICAgICAgICAgIGhlaWdodD1cIjE1MHB4XCJcclxuICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBxLXBhLW1kXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZ1bGwtd2lkdGggcS1tYi1zbVwiPlxyXG4gICAgICAgICAgICAgIDxkaXY+e3sgcHJvZHVjdC5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyXCIgdi1odG1sPVwicHJvZHVjdC5wcmljZV9odG1sXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJwcm9kdWN0LnN0YXR1cyAmJiBwcm9kdWN0LnN0YXR1cyA9PT0gJ2RyYWZ0J1wiPjxiPlRoaXMgaXMgYSBkcmFmdCBwcm9kdWN0LiBJdCdzIHNob3duIGZvciBhZG1pbnMgb25seSE8L2I+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPHEtYnRuIHYtZWxzZS1pZj1cInByb2R1Y3QuaXNfaW5fc3RvY2sgJiYgcHJvZHVjdC50eXBlICE9PSAndmFyaWFibGUnXCIgbGFiZWw9XCJBZGQgdG8gQ2FydFwiIGNvbG9yPVwic2Vjb25kYXJ5XCIgQGNsaWNrLnByZXZlbnQ9XCJhZGRUb0NhcnQocHJvZHVjdClcIiAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biB2LWVsc2UtaWY9XCJwcm9kdWN0LmlzX2luX3N0b2NrICYmIHByb2R1Y3QudHlwZSA9PT0gJ3ZhcmlhYmxlJ1wiIDp0bz1cImAvcHJvZHVjdC8ke2dldFNsdWdGcm9tUGVybWFsaW5rKHByb2R1Y3QucGVybWFsaW5rKX1gXCIgbGFiZWw9XCJDaG9vc2Ugb3B0aW9uc1wiIGNvbG9yPVwic2Vjb25kYXJ5XCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IHYtZWxzZT5PdXQgb2Ygc3RvY2s8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvcS1jYXJkPlxyXG4gICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSBTTElERVIgTU9ERSAtLT5cclxuICAgIDxxLWNhcm91c2VsXHJcbiAgICAgICAgQHRvdWNoc3RhcnQuc3RvcFxyXG4gICAgICAgIEBtb3VzZWRvd24uc3RvcFxyXG4gICAgICB2LWVsc2VcclxuICAgICAgdi1tb2RlbD1cInNsaWRlXCJcclxuICAgICAgYW5pbWF0ZWRcclxuICAgICAgaW5maW5pdGVcclxuICAgICAgc3dpcGVhYmxlXHJcbiAgICAgIDphcnJvd3M9XCJmYWxzZVwiXHJcbiAgICAgIG5hdmlnYXRpb25cclxuICAgICAgY29udHJvbC1jb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICBoZWlnaHQ9XCJhdXRvXCJcclxuICAgICAgY2xhc3M9XCJiZy10cmFuc3BhcmVudFwiXHJcbiAgICA+XHJcbiAgICAgIDxxLWNhcm91c2VsLXNsaWRlXHJcbiAgICAgICAgdi1mb3I9XCIoZ3JvdXAsIGluZGV4KSBpbiBzbGlkZUNodW5rc1wiXHJcbiAgICAgICAgOmtleT1cImluZGV4XCJcclxuICAgICAgICA6bmFtZT1cImluZGV4XCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZWxhdGVkLXByb2R1Y3Qtd3JhcHBlciByb3cganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIGdyb3VwXCJcclxuICAgICAgICAgICAgOmtleT1cInByb2R1Y3QuaWRcIlxyXG4gICAgICAgICAgICA6Y2xhc3M9XCJbY29sQ2xhc3MsICdxLW1iLW1kJywgJ3JlbGF0aXZlLXBvc2l0aW9uJ11cIlxyXG4gICAgICAgICAgPlxyXG5cclxuICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwiYC9wcm9kdWN0LyR7Z2V0U2x1Z0Zyb21QZXJtYWxpbmsocHJvZHVjdC5wZXJtYWxpbmspfWBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWxvb3Atd2wgYWJzb2x1dGVcIj5cclxuICAgICAgICAgICAgICA8cS1idG4gY2xhc3M9XCJ0ZXh0LWJsYWNrIHEtcGEtbm9uZSB0ZXh0LWNhcHRpb24gcS1tdC1zbVwiIGZsYXQgOmxvYWRpbmc9XCJjYXJ0LnN0YXRlLmxvYWRpbmcud2lzaGxpc3RcIiB2LWlmPVwiY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcyAmJiBPYmplY3QudmFsdWVzKGNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXMpLmZpbmQob2JqID0+IHByb2R1Y3QuaWQgPT09IG9iai5pZClcIiBAY2xpY2sucHJldmVudD1cImFkZFRvV2lzaGxpc3QocHJvZHVjdC5pZClcIiBjb2xvcj1cImFjY2VudFwiIDppY29uPVwibWF0RmF2b3JpdGVcIiAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biBjbGFzcz1cInRleHQtYmxhY2sgcS1wYS1ub25lIHRleHQtY2FwdGlvbiBxLW10LXNtXCIgZmxhdCA6bG9hZGluZz1cImNhcnQuc3RhdGUubG9hZGluZy53aXNobGlzdFwiIHYtZWxzZSBAY2xpY2sucHJldmVudD1cImFkZFRvV2lzaGxpc3QocHJvZHVjdC5pZClcIiBjb2xvcj1cImFjY2VudFwiIDppY29uPVwibWF0RmF2b3JpdGVCb3JkZXJcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgZnVsbC1oZWlnaHRcIj5cclxuICAgICAgICAgICAgPHEtaW1nXHJcbiAgICAgICAgICAgICAgICBmaXQ9XCJjb250YWluXCJcclxuICAgICAgICAgICAgOmltZy1zcmM9XCJwcm9kdWN0LmltYWdlc1swXT8uc3JjXCJcclxuICAgICAgICAgICAgOnNyYz1cInByb2R1Y3QuaW1hZ2VzWzBdPy5zcmNcIlxyXG4gICAgICAgICAgICA6c3Jjc2V0PVwicHJvZHVjdC5pbWFnZXNbMF0/LnNyY3NldFwiXHJcbiAgICAgICAgICAgIDpzaXplcz1cInByb2R1Y3QuaW1hZ2VzWzBdPy5zaXplc1wiXHJcbiAgICAgICAgICAgIDphbHQ9XCJwcm9kdWN0Lm5hbWVcIlxyXG4gICAgICAgICAgICBoZWlnaHQ9XCIxNTBweFwiXHJcbiAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggcS1wYS1tZFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmdWxsLXdpZHRoIHEtbWItc21cIj5cclxuICAgICAgICAgICAgICA8ZGl2Pnt7IHByb2R1Y3QubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMlwiIHYtaHRtbD1cInByb2R1Y3QucHJpY2VfaHRtbFwiIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiB2LWlmPVwicHJvZHVjdC5zdGF0dXMgJiYgcHJvZHVjdC5zdGF0dXMgPT09ICdkcmFmdCdcIj48Yj5UaGlzIGlzIGEgZHJhZnQgcHJvZHVjdC4gSXQncyBzaG93biBmb3IgYWRtaW5zIG9ubHkhPC9iPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDxxLWJ0biB2LWVsc2UtaWY9XCJwcm9kdWN0LmlzX2luX3N0b2NrICYmIHByb2R1Y3QudHlwZSAhPT0gJ3ZhcmlhYmxlJ1wiIGxhYmVsPVwiQWRkIHRvIENhcnRcIiBjb2xvcj1cInNlY29uZGFyeVwiIEBjbGljay5wcmV2ZW50PVwiYWRkVG9DYXJ0KHByb2R1Y3QpXCIgLz5cclxuICAgICAgICAgICAgICA8cS1idG4gdi1lbHNlLWlmPVwicHJvZHVjdC5pc19pbl9zdG9jayAmJiBwcm9kdWN0LnR5cGUgPT09ICd2YXJpYWJsZSdcIiA6dG89XCJgL3Byb2R1Y3QvJHtnZXRTbHVnRnJvbVBlcm1hbGluayhwcm9kdWN0LnBlcm1hbGluayl9YFwiIGxhYmVsPVwiQ2hvb3NlIG9wdGlvbnNcIiBjb2xvcj1cInNlY29uZGFyeVwiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiB2LWVsc2U+T3V0IG9mIHN0b2NrPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L3EtY2FyZD5cclxuICAgICAgICAgIDwvcm91dGVyLWxpbms+XHJcblxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvcS1jYXJvdXNlbC1zbGlkZT5cclxuJ1xyXG4gICAgICA8IS0tIEN1c3RvbSBuYXZpZ2F0aW9uIGRvdHMgLS0+XHJcbiAgICAgIDx0ZW1wbGF0ZSAjbmF2aWdhdGlvbi1pY29uPVwieyBuYW1lLCBvbkNsaWNrLCBidG5Qcm9wcyB9XCI+XHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIHYtYmluZD1cImJ0blByb3BzXCJcclxuICAgICAgICAgICAgOmZsYXQ9XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIDpjb2xvcj1cInNsaWRlID09PSBuYW1lID8gJ3NlY29uZGFyeScgOiAoYnRuUHJvcHMuY29sb3IgfHwgJ2dyZXktNScpXCJcclxuICAgICAgICAgICAgc2l6ZT1cInNtXCJcclxuICAgICAgICAgICAgOmljb249XCJudWxsXCJcclxuICAgICAgICAgICAgc3R5bGU9XCJmb250LXNpemU6IDVweDtwYWRkaW5nOiAwXCJcclxuICAgICAgICAgICAgcm91bmRcclxuICAgICAgICAgICAgZGVuc2VcclxuICAgICAgICAgICAgOmFyaWEtbGFiZWw9XCJgR28gdG8gc2xpZGUgJHtpbmRleCArIDF9YFwiXHJcbiAgICAgICAgICAgIEBjbGljaz1cIm9uQ2xpY2tcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvdGVtcGxhdGU+XHJcblxyXG4gICAgICA8IS0tIEN1c3RvbSBhcnJvd3MgLS0+XHJcbiAgICAgIDx0ZW1wbGF0ZSAjY29udHJvbD5cclxuICAgICAgICA8cS1jYXJvdXNlbC1jb250cm9sIHBvc2l0aW9uPVwibGVmdFwiIGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICA6aWNvbj1cIm1hdENoZXZyb25MZWZ0XCJcclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCJcclxuICAgICAgICAgICAgZmxhdFxyXG4gICAgICAgICAgICByb3VuZFxyXG4gICAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIEBjbGljaz1cInByZXZTbGlkZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJvdXNlbC1jb250cm9sPlxyXG4gICAgICAgIDxxLWNhcm91c2VsLWNvbnRyb2wgcG9zaXRpb249XCJyaWdodFwiIGNsYXNzPVwiZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgICA6aWNvbj1cIm1hdENoZXZyb25SaWdodFwiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJOZXh0XCJcclxuICAgICAgICAgICAgZmxhdFxyXG4gICAgICAgICAgICByb3VuZFxyXG4gICAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIEBjbGljaz1cIm5leHRTbGlkZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJvdXNlbC1jb250cm9sPlxyXG4gICAgICA8L3RlbXBsYXRlPlxyXG4gICAgPC9xLWNhcm91c2VsPlxyXG4gIDwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgb25Nb3VudGVkLCB3YXRjaCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQnXHJcbi8vaW1wb3J0IHsgZmV0Y2hBbGxQcm9kdWN0cyB9IGZyb20gJ3NyYy9ib290L3dvb2NvbW1lcmNlJ1xyXG5pbXBvcnQgeyBtYXRDaGV2cm9uTGVmdCwgbWF0Q2hldnJvblJpZ2h0LCBtYXRGYXZvcml0ZSwgbWF0RmF2b3JpdGVCb3JkZXIgfSBmcm9tICdAcXVhc2FyL2V4dHJhcy9tYXRlcmlhbC1pY29ucydcclxuXHJcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xyXG4gIHByb2R1Y3RJZDogTnVtYmVyLFxyXG4gIGNhdGVnb3J5SWQ6IE51bWJlclxyXG59KVxyXG5cclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5jb25zdCBzbGlkZSA9IHJlZigwKVxyXG5jb25zdCBwcm9kdWN0cyA9IHJlZihbXSlcclxuY29uc3QgcGVyU2xpZGUgPSByZWYoNCkgLy8gZGVmYXVsdCBkZXNrdG9wIGNvdW50XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhZGRUb1dpc2hsaXN0KG9iaklEID0gMCkge1xyXG4gIGF3YWl0IGNhcnQudG9nZ2xlV2lzaGxpc3RJdGVtKG9iaklELCAkcSk7XHJcbn1cclxuXHJcbmNvbnN0IGFkZFRvQ2FydCA9IChwcm9kdWN0KSA9PiB7XHJcbiAgY2FydC5hZGQocHJvZHVjdC5pZCwgMSwgbnVsbCwge30sIG51bGwsIHByb2R1Y3QpXHJcbn1cclxuXHJcbmNvbnN0IGdldFNsdWdGcm9tUGVybWFsaW5rID0gKHBlcm1hbGluaykgPT4ge1xyXG4gIGNvbnN0IG1hdGNoID0gcGVybWFsaW5rLm1hdGNoKC9wcm9kdWN0XFwvKFteL10rKVxcLz8kLylcclxuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnXHJcbn1cclxuXHJcbi8vIFJlc3BvbnNpdmUgcGVyLXNsaWRlIHNldHVwXHJcbmNvbnN0IHVwZGF0ZVBlclNsaWRlID0gKCkgPT4ge1xyXG4gIGlmICgkcS5zY3JlZW4ubHQuc20pIHBlclNsaWRlLnZhbHVlID0gMlxyXG4gIGVsc2UgaWYgKCRxLnNjcmVlbi5sdC5tZCkgcGVyU2xpZGUudmFsdWUgPSAzXHJcbiAgZWxzZSBwZXJTbGlkZS52YWx1ZSA9IDRcclxufVxyXG51cGRhdGVQZXJTbGlkZSgpXHJcbndhdGNoKCgpID0+ICRxLnNjcmVlbi5uYW1lLCB1cGRhdGVQZXJTbGlkZSlcclxuXHJcbmNvbnN0IGNvbENsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gIGlmICgkcS5zY3JlZW4ubHQuc20pIHJldHVybiAnY29sLTYnXHJcbiAgaWYgKCRxLnNjcmVlbi5sdC5tZCkgcmV0dXJuICdjb2wtNCdcclxuICByZXR1cm4gJ2NvbC0zJ1xyXG59KVxyXG5cclxuY29uc3Qgc2xpZGVDaHVua3MgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgY29uc3QgY2h1bmtzID0gW11cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2R1Y3RzLnZhbHVlLmxlbmd0aDsgaSArPSBwZXJTbGlkZS52YWx1ZSkge1xyXG4gICAgY2h1bmtzLnB1c2gocHJvZHVjdHMudmFsdWUuc2xpY2UoaSwgaSArIHBlclNsaWRlLnZhbHVlKSlcclxuICB9XHJcbiAgcmV0dXJuIGNodW5rc1xyXG59KVxyXG5cclxuLy8gU2xpZGUgY29udHJvbHNcclxuY29uc3QgcHJldlNsaWRlID0gKCkgPT4ge1xyXG4gIHNsaWRlLnZhbHVlID0gKHNsaWRlLnZhbHVlIC0gMSArIHNsaWRlQ2h1bmtzLnZhbHVlLmxlbmd0aCkgJSBzbGlkZUNodW5rcy52YWx1ZS5sZW5ndGhcclxufVxyXG5jb25zdCBuZXh0U2xpZGUgPSAoKSA9PiB7XHJcbiAgc2xpZGUudmFsdWUgPSAoc2xpZGUudmFsdWUgKyAxKSAlIHNsaWRlQ2h1bmtzLnZhbHVlLmxlbmd0aFxyXG59XHJcblxyXG5jb25zdCBmZXRjaFJlbGF0ZWRQcm9kdWN0cyA9IGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2RhdGEvcHJvZHVjdHMuanNvbicpO1xyXG4gIGNvbnN0IGFsbFByb2R1Y3RzID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICBsZXQgcmVsYXRlZCA9IGFsbFByb2R1Y3RzXHJcbiAgICAuZmlsdGVyKFxyXG4gICAgICAocCkgPT5cclxuICAgICAgICBwLmlkICE9PSBwcm9wcy5wcm9kdWN0SWQgJiZcclxuICAgICAgICBwLmNhdGVnb3JpZXMuc29tZSgoY2F0KSA9PiBjYXQuaWQgPT09IHByb3BzLmNhdGVnb3J5SWQpICYmXHJcbiAgICAgICAgcC5pc19pbl9zdG9ja1xyXG4gICAgKVxyXG4gICAgLm1hcCgocCkgPT4gKHtcclxuICAgICAgLi4ucCxcclxuICAgICAgc2x1ZzogZ2V0U2x1Z0Zyb21QZXJtYWxpbmsocC5wZXJtYWxpbmspXHJcbiAgICB9KSlcclxuXHJcbiAgaWYgKHJlbGF0ZWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICByZWxhdGVkID0gYWxsUHJvZHVjdHNcclxuICAgICAgLmZpbHRlcigocCkgPT4gcC5pZCAhPT0gcHJvcHMucHJvZHVjdElkICYmIHAuaXNfaW5fc3RvY2spXHJcbiAgICAgIC5zbGljZSgwLCA4KVxyXG4gICAgICAubWFwKChwKSA9PiAoe1xyXG4gICAgICAgIC4uLnAsXHJcbiAgICAgICAgc2x1ZzogZ2V0U2x1Z0Zyb21QZXJtYWxpbmsocC5wZXJtYWxpbmspXHJcbiAgICAgIH0pKVxyXG4gIH1cclxuXHJcbiAgcHJvZHVjdHMudmFsdWUgPSByZWxhdGVkXHJcbn1cclxuXHJcbm9uTW91bnRlZChmZXRjaFJlbGF0ZWRQcm9kdWN0cylcclxuXHJcbndhdGNoKFsoKSA9PiBwcm9wcy5wcm9kdWN0SWQsICgpID0+IHByb3BzLmNhdGVnb3J5SWRdLCBmZXRjaFJlbGF0ZWRQcm9kdWN0cylcclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbi5yZWxhdGVkLXByb2R1Y3RzIC5yZWxhdGVkLXByb2R1Y3Qtd3JhcHBlciA+IGRpdiB7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDVweDtcclxufVxyXG4ucmVsYXRlZC1wcm9kdWN0cyAucmVsYXRlZC1wcm9kdWN0LXdyYXBwZXIgPiBkaXYsXHJcbi5yZWxhdGVkLXByb2R1Y3RzIC5yZWxhdGVkLXByb2R1Y3Qtd3JhcHBlciA+IGRpdiAucS1jYXJke1xyXG4gICAgdHJhbnNpdGlvbjogMC4zcyBlYXNlO1xyXG59XHJcblxyXG4ucmVsYXRlZC1wcm9kdWN0cyAucmVsYXRlZC1wcm9kdWN0LXdyYXBwZXIgPiBkaXY6aG92ZXIge1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLnJlbGF0ZWQtcHJvZHVjdHMgLnJlbGF0ZWQtcHJvZHVjdC13cmFwcGVyID4gZGl2OmhvdmVyIC5xLWNhcmQge1xyXG4gIG9wYWNpdHk6IDAuODtcclxuICBib3gtc2hhZG93OiAwcHggMTBweCAyNXB4ICMwMDAwMDAyMDtcclxufVxyXG5cclxuLnJlbGF0ZWQtcHJvZHVjdHMgaW1nLnEtaW1nX19pbWFnZSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbi5yZWxhdGVkLXByb2R1Y3RzIC5xLWltZy5xLWltZy0tbWVudS5xLW1iLXNtIHtcclxuICAgIGhlaWdodDogMjAwcHg7XHJcbn1cclxuPC9zdHlsZT5cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiB2LWlmPVwicHJvZHVjdFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInEtcGEtbWQgcm93IHEtY29sLWd1dHRlci1sZ1wiPlxyXG4gICAgICA8IS0tIFByb2R1Y3QgSW1hZ2VzIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGNvbC1tZC02XCI+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwicHJvZHVjdC5pbWFnZXMubGVuZ3RoID4gMVwiPlxyXG4gICAgICAgICAgPHEtY2Fyb3VzZWxcclxuICAgICAgICAgICAgICBAdG91Y2hzdGFydC5zdG9wXHJcbiAgICAgICAgICAgIEBtb3VzZWRvd24uc3RvcFxyXG4gICAgICAgICAgICBhbmltYXRlZFxyXG4gICAgICAgICAgICB2LW1vZGVsPVwiYWN0aXZlU2xpZGVcIlxyXG4gICAgICAgICAgICBoZWlnaHQ9XCI0MDBweFwiXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25cclxuICAgICAgICAgICAgYXV0b3BsYXlcclxuICAgICAgICAgICAgY29udHJvbC1jb2xvcj1cIndoaXRlXCJcclxuICAgICAgICAgICAgc3dpcGVhYmxlXHJcbiAgICAgICAgICAgIGluZmluaXRlXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24tcHJldj1cInNsaWRlLXJpZ2h0XCJcclxuICAgICAgICAgICAgdHJhbnNpdGlvbi1uZXh0PVwic2xpZGUtbGVmdFwiXHJcbiAgICAgICAgICAgICAgOm5hdmlnYXRpb24taWNvbj1cIm1hdExlbnNcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8cS1jYXJvdXNlbC1zbGlkZVxyXG4gICAgICAgICAgICAgIHYtZm9yPVwiKGltZywgaW5kZXgpIGluIHByb2R1Y3QuaW1hZ2VzXCJcclxuICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxyXG4gICAgICAgICAgICAgIDpuYW1lPVwiaW5kZXhcIlxyXG4gICAgICAgICAgICAgIDpyYXRpbz1cIjFcIlxyXG4gICAgICAgICAgICAgIGZpdD1cImNvbnRhaW5cIlxyXG4gICAgICAgICAgICAgIDppbWctc3JjPVwiaW1nLnNyY1wiXHJcbiAgICAgICAgICAgICAgOnNyYz1cImltZy5zcmNcIlxyXG4gICAgICAgICAgICAgIDpzcmNzZXQ9XCJpbWcuc3Jjc2V0XCJcclxuICAgICAgICAgICAgICA6c2l6ZXM9XCJpbWcuc2l6ZXNcIlxyXG4gICAgICAgICAgICAgIEBjbGljaz1cIm9wZW5MaWdodGJveChpbmRleClcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPVwiY3Vyc29yOiB6b29tLWluXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvcS1jYXJvdXNlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtZWxzZT5cclxuICAgICAgICAgIDxxLWltZ1xyXG4gICAgICAgICAgICA6aW1nLXNyYz1cInByb2R1Y3QuaW1hZ2VzWzBdPy5zcmNcIlxyXG4gICAgICAgICAgICA6c3JjPVwicHJvZHVjdC5pbWFnZXNbMF0/LnNyY1wiXHJcbiAgICAgICAgICAgIDpzcmNzZXQ9XCJwcm9kdWN0LmltYWdlc1swXT8uc3Jjc2V0XCJcclxuICAgICAgICAgICAgOnNpemVzPVwicHJvZHVjdC5pbWFnZXNbMF0/LnNpemVzXCJcclxuICAgICAgICAgICAgc3Bpbm5lci1jb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIGZpdD1cImNvbnRhaW5cIlxyXG4gICAgICAgICAgICBzdHlsZT1cImN1cnNvcjogem9vbS1pbjsgbWF4LWhlaWdodDogNTAwcHhcIlxyXG4gICAgICAgICAgICBAY2xpY2s9XCJvcGVuTGlnaHRib3goMClcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIFByb2R1Y3QgRGV0YWlscyAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBjb2wtbWQtNlwiPlxyXG4gICAgICAgIDxxLWJyZWFkY3J1bWJzPlxyXG4gICAgICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgbGFiZWw9XCJIb21lXCIgdG89XCIvXCIgLz5cclxuICAgICAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIDp0bz1cImAvcHJvZHVjdC1jYXRlZ29yeS8ke3Byb2R1Y3QuY2F0ZWdvcmllc1swXT8uc2x1Z31gXCI+PHNwYW4gdi1odG1sPVwicHJvZHVjdC5jYXRlZ29yaWVzWzBdPy5uYW1lXCI+PC9zcGFuPjwvcS1icmVhZGNydW1icy1lbD5cclxuICAgICAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIDpsYWJlbD1cInByb2R1Y3Q/Lm5hbWVcIiAvPlxyXG4gICAgICAgIDwvcS1icmVhZGNydW1icz5cclxuXHJcbiAgICAgICAgPGgxIGNsYXNzPVwidGV4dC1oNCBxLW1iLXNtXCI+e3sgcHJvZHVjdC5uYW1lIH19PC9oMT5cclxuXHJcbiAgICAgICAgPCEtLSBDYXRlZ29yaWVzIC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLW1kXCI+XHJcbiAgICAgICAgICA8cm91dGVyLWxpbmtcclxuICAgICAgICAgICAgICB2LWZvcj1cImNhdCBpbiBwcm9kdWN0LmNhdGVnb3JpZXNcIlxyXG4gICAgICAgICAgICAgIDprZXk9XCJjYXQuaWRcIlxyXG4gICAgICAgICAgICAgIDp0bz1cImAvcHJvZHVjdC1jYXRlZ29yeS8ke2NhdC5zbHVnfWBcIlxyXG4gICAgICAgICAgY2xhc3M9XCJuby1kZWNvcmF0aW9uXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDxxLWNoaXBcclxuICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImNhdGVnb3J5LWNoaXBcIlxyXG4gICAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgICBjbGlja2FibGVcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8c3BhbiB2LWh0bWw9XCJjYXQubmFtZVwiPjwvc3Bhbj5cclxuICAgICAgICAgIDwvcS1jaGlwPlxyXG4gICAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPCEtLSBQcmljZSAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1tZFwiPlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwic2VsZWN0ZWRWYXJpYXRpb25cIj5cclxuICAgICAgICAgICAgPGRpdiB2LWh0bWw9XCJzZWxlY3RlZFZhcmlhdGlvbi5wcmljZV9odG1sXCI+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1lbHNlLWlmPVwicHJvZHVjdFwiIHYtaHRtbD1cInByb2R1Y3QucHJpY2VfaHRtbFwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1tZFwiIHYtaHRtbD1cInByb2R1Y3QuZGVzY3JpcHRpb25cIj48L2Rpdj5cclxuXHJcbiAgICAgICAgPCEtLSBWYXJpYXRpb25zIFNlbGVjdGlvbiBmb3IgVmFyaWFibGUgUHJvZHVjdCAtLT5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJpc1ZhcmlhYmxlXCIgY2xhc3M9XCJxLW1iLW1kXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHYtZm9yPVwiKGF0dHJpYnV0ZSkgaW4gYXZhaWxhYmxlQXR0cmlidXRlc1wiXHJcbiAgICAgICAgICAgIDprZXk9XCJhdHRyaWJ1dGUuaWRcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInEtbWItc21cIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiBxLW1iLXhzXCI+e3sgYXR0cmlidXRlLm5hbWUgfX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8cS1zZWxlY3RcclxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0ZWRWYXJpYXRpb25zW2F0dHJpYnV0ZS5uYW1lXVwiXHJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJhdHRyaWJ1dGUub3B0aW9uc1wiXHJcbiAgICAgICAgICAgICAgZGVuc2VcclxuICAgICAgICAgICAgICA6ZHJvcGRvd24taWNvbj1cIm1hdEFycm93RHJvcERvd25cIlxyXG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxyXG4gICAgICAgICAgICAgIDpwbGFjZWhvbGRlcj1cImBTZWxlY3QgYSAke2F0dHJpYnV0ZS5uYW1lfWBcIlxyXG4gICAgICAgICAgICAgIDpsYWJlbD1cImBTZWxlY3QgYSAke2F0dHJpYnV0ZS5uYW1lfWBcIlxyXG4gICAgICAgICAgICAgIGVtaXQtdmFsdWVcclxuICAgICAgICAgICAgICBtYXAtb3B0aW9uc1xyXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJvblZhcmlhdGlvbkNoYW5nZVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cInZhcmlhdGlvbkVycm9yXCIgY2xhc3M9XCJ0ZXh0LW5lZ2F0aXZlIHRleHQtY2FwdGlvbiBxLW10LXhzXCI+XHJcbiAgICAgICAgICAgIHt7IHZhcmlhdGlvbkVycm9yIH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiB2LWlmPVwicHJvZHVjdC5zdGF0dXMgJiYgcHJvZHVjdC5zdGF0dXMgPT09ICdkcmFmdCdcIj48Yj5UaGlzIGlzIGEgZHJhZnQgcHJvZHVjdC4gSXQncyBzaG93biBmb3IgYWRtaW5zIG9ubHkhPC9iPjwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IHYtZWxzZS1pZj1cInByb2R1Y3QuaXNfaW5fc3RvY2tcIj5cclxuICAgICAgICA8IS0tIFF1YW50aXR5IFNlbGVjdG9yIC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtbWItbWRcIj5cclxuICAgICAgICAgIDxxLWJ0biBmbGF0IHJvdW5kIDppY29uPVwibWF0UmVtb3ZlXCIgQGNsaWNrPVwiZGVjcmVhc2VRdHlcIiAvPlxyXG4gICAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgICAgdi1tb2RlbC5udW1iZXI9XCJxdWFudGl0eVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICBtaW49XCIxXCJcclxuICAgICAgICAgICAgZGVuc2VcclxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNjBweDsgdGV4dC1hbGlnbjogY2VudGVyXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8cS1idG4gZmxhdCByb3VuZCA6aWNvbj1cIm1hdEFkZFwiIEBjbGljaz1cImluY3JlYXNlUXR5XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICBsYWJlbD1cIkFkZCB0byBDYXJ0XCJcclxuICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXHJcbiAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICA6ZGlzYWJsZT1cInNob3VsZERpc2FibGVDYXJ0QnV0dG9uc1wiXHJcbiAgICAgICAgICBAY2xpY2s9XCJhZGRUb0NhcnRIYW5kbGVyXCJcclxuICAgICAgICAgIDpsb2FkaW5nPVwiY2FydC5zdGF0ZS5sb2FkaW5nLmNhcnRcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxxLXRvb2x0aXAgdi1pZj1cInNob3VsZERpc2FibGVDYXJ0QnV0dG9uc1wiPlxyXG4gICAgICAgICAgICBQbGVhc2Ugc2VsZWN0IGEgdmFyaWF0aW9uIGZpcnN0LlxyXG4gICAgICAgICAgPC9xLXRvb2x0aXA+XHJcbiAgICAgICAgPC9xLWJ0bj5cclxuXHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICBsYWJlbD1cIlF1aWNrIENoZWNrb3V0XCJcclxuICAgICAgICAgIGNvbG9yPVwiYmxhY2tcIlxyXG4gICAgICAgICAgdG89XCIvY2hlY2tvdXRcIlxyXG4gICAgICAgICAgY2xhc3M9XCJxdWljay1jaGVja291dC1idG5cIlxyXG4gICAgICAgICAgOmRpc2FibGU9XCJzaG91bGREaXNhYmxlQ2FydEJ1dHRvbnNcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiYWRkVG9DYXJ0SGFuZGxlclwiXHJcbiAgICAgICAgICA6bG9hZGluZz1cImNhcnQuc3RhdGUubG9hZGluZy5xdWlja2J1eVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHEtdG9vbHRpcCB2LWlmPVwic2hvdWxkRGlzYWJsZUNhcnRCdXR0b25zXCI+XHJcbiAgICAgICAgICAgIFBsZWFzZSBzZWxlY3QgYSB2YXJpYXRpb24gZmlyc3QuXHJcbiAgICAgICAgICA8L3EtdG9vbHRpcD5cclxuICAgICAgICA8L3EtYnRuPlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiB2LWVsc2U+IE91dCBvZiBzdG9jayA8L2Rpdj5cclxuXHJcbiAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC13aWR0aFwiPlxyXG4gICAgICAgIDxxLWJ0biBjbGFzcz1cInRleHQtYmxhY2sgcS1wYS1ub25lIHRleHQtY2FwdGlvbiBxLW10LXNtXCIgZmxhdCA6bG9hZGluZz1cImNhcnQuc3RhdGUubG9hZGluZy53aXNobGlzdFwiIHYtaWY9XCJjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zICYmIE9iamVjdC52YWx1ZXMoY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcykuZmluZChvYmogPT4gc2VsZWN0ZWRWYXJpYXRpb24gPyBzZWxlY3RlZFZhcmlhdGlvbi5pZCA6IHByb2R1Y3QuaWQgPT09IG9iai5pZClcIiBAY2xpY2s9XCJhZGRUb1dpc2hsaXN0XCIgY29sb3I9XCJhY2NlbnRcIiBsYWJlbD1cIlJlbW92ZSBmcm9tIHdpc2hsaXN0XCIgOmljb249XCJtYXRGYXZvcml0ZVwiIC8+XHJcbiAgICAgICAgPHEtYnRuIGNsYXNzPVwidGV4dC1ibGFjayBxLXBhLW5vbmUgdGV4dC1jYXB0aW9uIHEtbXQtc21cIiBmbGF0IDpsb2FkaW5nPVwiY2FydC5zdGF0ZS5sb2FkaW5nLndpc2hsaXN0XCIgdi1lbHNlIEBjbGljaz1cImFkZFRvV2lzaGxpc3RcIiBjb2xvcj1cImFjY2VudFwiIGxhYmVsPVwiQWRkIHRvIHdpc2hsaXN0XCIgOmljb249XCJtYXRGYXZvcml0ZUJvcmRlclwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSBMaWdodGJveCAtLT5cclxuICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwibGlnaHRib3gub3BlblwiPlxyXG4gICAgICA8cS1jYXJkXHJcbiAgICAgICAgY2xhc3M9XCJiZy1ibGFjayB0ZXh0LXdoaXRlXCJcclxuICAgICAgICBzdHlsZT1cIm1heC13aWR0aDogMTAwdnc7IG1heC1oZWlnaHQ6IDEwMHZoOyBvdmVyZmxvdzogaGlkZGVuXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwicS1wYS1tZCBmbGV4IGZsZXgtY2VudGVyXCJcclxuICAgICAgICAgIHJlZj1cInpvb21Db250YWluZXJcIlxyXG4gICAgICAgICAgQHRvdWNoc3RhcnQ9XCJzdGFydFRvdWNoXCJcclxuICAgICAgICAgIEB0b3VjaG1vdmU9XCJtb3ZlVG91Y2hcIlxyXG4gICAgICAgICAgQHRvdWNoZW5kPVwiZW5kVG91Y2hcIlxyXG4gICAgICAgICAgQHdoZWVsPVwid2hlZWxab29tXCJcclxuICAgICAgICAgIEBtb3VzZWRvd249XCJzdGFydERyYWdcIlxyXG4gICAgICAgICAgQG1vdXNlbW92ZT1cImRyYWdnaW5nXCJcclxuICAgICAgICAgIEBtb3VzZXVwPVwic3RvcERyYWdcIlxyXG4gICAgICAgICAgQG1vdXNlbGVhdmU9XCJzdG9wRHJhZ1wiXHJcbiAgICAgICAgICBzdHlsZT1cIm92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICA6c3JjPVwicHJvZHVjdC5pbWFnZXNbbGlnaHRib3guaW5kZXhdPy5zcmNcIlxyXG4gICAgICAgICAgICA6c3R5bGU9XCJ6b29tU3R5bGVcIlxyXG4gICAgICAgICAgICByZWY9XCJ6b29tSW1hZ2VcIlxyXG4gICAgICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgIHJvdW5kXHJcbiAgICAgICAgICAgIGRlbnNlXHJcbiAgICAgICAgICAgIDppY29uPVwibWF0Q2xvc2VcIlxyXG4gICAgICAgICAgICBjb2xvcj1cIndoaXRlXCJcclxuICAgICAgICAgICAgdGV4dC1jb2xvcj1cImJsYWNrXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJhYnNvbHV0ZS10b3AtcmlnaHQgcS1tYS1zbSB6LXRvcFwiXHJcbiAgICAgICAgICAgIEBjbGljaz1cImxpZ2h0Ym94Lm9wZW4gPSBmYWxzZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3EtY2FyZD5cclxuICAgIDwvcS1kaWFsb2c+XHJcblxyXG4gICAgPFJlbGF0ZWRQcm9kdWN0c1NsaWRlclxyXG4gICAgICA6cHJvZHVjdElkPVwicHJvZHVjdC5pZFwiXHJcbiAgICAgIDpjYXRlZ29yeUlkPVwicHJvZHVjdC5jYXRlZ29yaWVzWzBdPy5pZFwiXHJcbiAgICAgIDptYXhWaXNpYmxlPVwiNFwiXHJcbiAgICAvPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IHYtZWxzZS1pZj1cInByb2R1Y3QgPT09IG51bGxcIiBjbGFzcz1cInEtcGEtbWQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cclxuICAgIDxxLXNwaW5uZXIgY29sb3I9XCJzZWNvbmRhcnlcIiBzaXplPVwiNmVtXCIgLz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkLCBjb21wdXRlZCwgdXNlU1NSQ29udGV4dCwgd2F0Y2ggfSBmcm9tICd2dWUnXHJcbmltcG9ydCB7IHVzZVJvdXRlLCBvbkJlZm9yZVJvdXRlVXBkYXRlIH0gZnJvbSAndnVlLXJvdXRlcidcclxuaW1wb3J0IHsgZmV0Y2hQcm9kdWN0QnlJZCB9IGZyb20gJ3NyYy9ib290L3dvb2NvbW1lcmNlLmpzJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQuanMnXHJcbmltcG9ydCBSZWxhdGVkUHJvZHVjdHNTbGlkZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvUmVsYXRlZFByb2R1Y3RzU2xpZGVyLnZ1ZSdcclxuaW1wb3J0IHsgdXNlUXVhc2FyLCB1c2VNZXRhIH0gZnJvbSAncXVhc2FyJ1xyXG5pbXBvcnQgeyBmZXRjaFNlb0ZvclBhdGggfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdXNlU2VvJ1xyXG5pbXBvcnQgcHJvZHVjdHNTdG9yZSBmcm9tICdzcmMvc3RvcmVzL3Byb2R1Y3RzJ1xyXG5pbXBvcnQgeyBtYXRGYXZvcml0ZUJvcmRlciwgbWF0RmF2b3JpdGUsIG1hdEFkZCwgbWF0Q2xvc2UsIG1hdFJlbW92ZSwgbWF0TGVucywgbWF0QXJyb3dEcm9wRG93biB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG5cclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcclxuY29uc3QgcHJvZHVjdCA9IHJlZihudWxsKVxyXG5jb25zdCBhY3RpdmVTbGlkZSA9IHJlZigwKVxyXG5jb25zdCBxdWFudGl0eSA9IHJlZigxKVxyXG5jb25zdCBnZXRTbHVnRnJvbVBlcm1hbGluayA9IChwZXJtYWxpbmspID0+IHtcclxuICBjb25zdCBtYXRjaCA9IHBlcm1hbGluay5tYXRjaCgvcHJvZHVjdFxcLyhbXi9dKylcXC8/JC8pXHJcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiAnJ1xyXG59XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuU0VSVkVSKSB7XHJcbiAgY29uc3Qgc3NyQ29udGV4dCA9IHVzZVNTUkNvbnRleHQoKVxyXG5cclxuICBpZiAoc3NyQ29udGV4dD8ucHJvZHVjdERhdGEpIHtcclxuICAgIHByb2R1Y3QudmFsdWUgPSBzc3JDb250ZXh0LnByb2R1Y3REYXRhXHJcbiAgfVxyXG59XHJcbmlmIChwcm9jZXNzLmVudi5DTElFTlQpIHtcclxuICBpZiAod2luZG93Ll9fUFJPRFVDVF9EQVRBX18gJiYgd2luZG93Ll9fUFJPRFVDVF9EQVRBX18uaWQpIHtcclxuICAgIGNvbnN0IHNzclByb2R1Y3RTbHVnID0gZ2V0U2x1Z0Zyb21QZXJtYWxpbmsod2luZG93Ll9fUFJPRFVDVF9EQVRBX18ucGVybWFsaW5rKVxyXG4gICAgaWYoc3NyUHJvZHVjdFNsdWcgPT09IHJvdXRlLnBhcmFtcy5zbHVnKSB7XHJcbiAgICAgIHByb2R1Y3QudmFsdWUgPSB3aW5kb3cuX19QUk9EVUNUX0RBVEFfX1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8g8J+foiBSdW4gb24gU1NSIG9ubHlcclxuLy8gSW5zaWRlIHlvdXIgUGFnZSBvciBMYXlvdXRcclxuZGVmaW5lT3B0aW9ucyh7XHJcbiAgYXN5bmMgcHJlRmV0Y2ggKHsgc3NyQ29udGV4dCwgY3VycmVudFJvdXRlIH0pIHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0gUHJlRmV0Y2ggUnVubmluZyBmb3I6JywgY3VycmVudFJvdXRlLnBhcmFtcy5zbHVnKVxyXG4gICAgLy8gRkVUQ0ggREFUQTogVGhpcyBpcyB0aGUga2V5IGNoYW5nZVxyXG4gICAgY29uc3Qgc2VvID0gYXdhaXQgZmV0Y2hTZW9Gb3JQYXRoKGN1cnJlbnRSb3V0ZS5wYXRoKVxyXG5cclxuICAgIC8vY29uc3Qgc2VvID0gYXdhaXQgZmV0Y2hTZW9Gb3JQYXRoKGN1cnJlbnRSb3V0ZS5wYXRoKVxyXG4gICAgaWYgKHNzckNvbnRleHQpIHtcclxuICAgICAgbGV0IHByb2R1Y3REYXRhID0gYXdhaXQgcHJvZHVjdHNTdG9yZS5mZXRjaFNpbmdsZVByb2R1Y3QoY3VycmVudFJvdXRlLnBhcmFtcy5zbHVnKVxyXG5cclxuLy8g4pyFIE5vcm1hbGl6ZSBjYXRlZ29yaWVzIG9uIFNTUlxyXG4gICAgICBpZiAoIXByb2R1Y3REYXRhPy5jYXRlZ29yaWVzPy5sZW5ndGgpIHtcclxuICAgICAgICBwcm9kdWN0RGF0YS5jYXRlZ29yaWVzID0gW1xyXG4gICAgICAgICAgcHJvZHVjdERhdGE/LmV4dGVuc2lvbnM/Lm1wcmVzcz8uZGVmYXVsdF9jYXRlZ29yeVxyXG4gICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAgIH1cclxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc3RhdGUgb2JqZWN0IGlmIGl0IGRvZXNuJ3QgZXhpc3RcclxuICAgICAgc3NyQ29udGV4dC5zZW9EYXRhID0gc2VvXHJcbiAgICAgIHNzckNvbnRleHQucHJvZHVjdERhdGEgPSBwcm9kdWN0RGF0YVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IHNlb0RhdGEgPSByZWYobnVsbClcclxuXHJcbi8vIFRoaXMgb25seSBydW5zIGluIHRoZSBicm93c2VyXHJcbmlmIChwcm9jZXNzLmVudi5DTElFTlQpIHtcclxuaWYgKHdpbmRvdy5fX1NFT19EQVRBX18pIHtcclxuICBzZW9EYXRhLnZhbHVlID0gd2luZG93Ll9fU0VPX0RBVEFfX1xyXG59XHJcblxyXG4gIHVzZU1ldGEoKCkgPT4ge1xyXG4gICAgY29uc3Qgc2VvID0gc2VvRGF0YS52YWx1ZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBzZW8/LnRpdGxlIHx8ICdOYXR1cmFCbG9vbScsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHNlbz8uZGVzY3JpcHRpb24gfHwgXCJMZXQncyBCbG9vbSBUb2dldGhlclwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnb2c6dGl0bGUnOiB7XHJcbiAgICAgICAgICBwcm9wZXJ0eTogJ29nOnRpdGxlJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHNlbz8udGl0bGUgfHwgJ05hdHVyYUJsb29tJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29nOmRlc2NyaXB0aW9uJzoge1xyXG4gICAgICAgICAgcHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICBjb250ZW50OiBzZW8/LmRlc2NyaXB0aW9uIHx8IFwiTGV0J3MgQmxvb20gVG9nZXRoZXJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIExvZyBmb3IgZGVidWdnaW5nXHJcbmlmIChwcm9jZXNzLmVudi5TRVJWRVIpIHtcclxuICBjb25zb2xlLmxvZygnW1NTUl0gUHJvZHVjdFBhZ2UgbG9hZGVkIG9uIHNlcnZlcicpXHJcbn1cclxuXHJcbi8vY29uc3QgYWRkVG9DYXJ0TG9hZGluZyA9IHJlZihmYWxzZSk7XHJcbmNvbnN0IGF2YWlsYWJsZUF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgaWYgKCFwcm9kdWN0LnZhbHVlIHx8ICFwcm9kdWN0LnZhbHVlLmF0dHJpYnV0ZXMpIHJldHVybiBbXVxyXG5cclxuICBjb25zdCBhdHRyTWFwID0ge31cclxuXHJcbiAgZm9yIChjb25zdCB2YXJpYXRpb24gb2YgcHJvZHVjdC52YWx1ZS5hdHRyaWJ1dGVzKSB7XHJcbiAgICAgIGlmICghYXR0ck1hcFt2YXJpYXRpb24ubmFtZV0pIHtcclxuICAgICAgICBhdHRyTWFwW3ZhcmlhdGlvbi5uYW1lXSA9IHtcclxuICAgICAgICAgIG5hbWU6IHZhcmlhdGlvbi5uYW1lLFxyXG4gICAgICAgICAgaWQ6IHZhcmlhdGlvbi5pZCxcclxuICAgICAgICAgIHRlcm1zOiB2YXJpYXRpb24udGVybXMsXHJcbiAgICAgICAgICBvcHRpb25zOiBuZXcgU2V0KClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChjb25zdCB0ZXJtIG9mIHZhcmlhdGlvbi50ZXJtcykge1xyXG4gICAgICAgICAgYXR0ck1hcFt2YXJpYXRpb24ubmFtZV0ub3B0aW9ucy5hZGQodGVybS5uYW1lKVxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gT2JqZWN0LnZhbHVlcyhhdHRyTWFwKS5tYXAoYXR0ciA9PiAoe1xyXG4gICAgbmFtZTogYXR0ci5uYW1lLFxyXG4gICAgc2x1ZzogYXR0ci5zbHVnLFxyXG4gICAgb3B0aW9uczogQXJyYXkuZnJvbShhdHRyLm9wdGlvbnMpXHJcbiAgfSkpXHJcbn0pXHJcblxyXG5jb25zdCBsaWdodGJveCA9IHJlZih7IG9wZW46IGZhbHNlLCBpbmRleDogMCB9KVxyXG5cclxuY29uc3Qgem9vbSA9IHJlZih7XHJcbiAgc2NhbGU6IDEsXHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG4gIGRyYWdnaW5nOiBmYWxzZSxcclxuICBzdGFydFg6IDAsXHJcbiAgc3RhcnRZOiAwLFxyXG4gIGxhc3RYOiAwLFxyXG4gIGxhc3RZOiAwXHJcbn0pXHJcblxyXG5jb25zdCB6b29tU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xyXG4gIHRyYW5zZm9ybTogYHNjYWxlKCR7em9vbS52YWx1ZS5zY2FsZX0pIHRyYW5zbGF0ZSgke3pvb20udmFsdWUueH1weCwgJHt6b29tLnZhbHVlLnl9cHgpYCxcclxuICB0cmFuc2l0aW9uOiB6b29tLnZhbHVlLmRyYWdnaW5nID8gJ25vbmUnIDogJ3RyYW5zZm9ybSAwLjJzIGVhc2UnLFxyXG4gIG1heFdpZHRoOiAnMTAwJScsXHJcbiAgbWF4SGVpZ2h0OiAnMTAwJScsXHJcbiAgdG91Y2hBY3Rpb246ICdub25lJyxcclxuICB1c2VyU2VsZWN0OiAnbm9uZSdcclxufSkpXHJcblxyXG5mdW5jdGlvbiBvcGVuTGlnaHRib3goaW5kZXgpIHtcclxuICBsaWdodGJveC52YWx1ZS5pbmRleCA9IGluZGV4XHJcbiAgbGlnaHRib3gudmFsdWUub3BlbiA9IHRydWVcclxuICB6b29tLnZhbHVlID0ge1xyXG4gICAgc2NhbGU6IDEsXHJcbiAgICB4OiAwLFxyXG4gICAgeTogMCxcclxuICAgIGRyYWdnaW5nOiBmYWxzZSxcclxuICAgIHN0YXJ0WDogMCxcclxuICAgIHN0YXJ0WTogMCxcclxuICAgIGxhc3RYOiAwLFxyXG4gICAgbGFzdFk6IDBcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFRvQ2FydChlKSB7XHJcbiAgaGFuZGxlQWRkVG9DYXJ0KGUpXHJcbiAgY29uc29sZS5sb2coJ0NhcnQ6JywgY2FydC5zdGF0ZSlcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVBZGRUb0NhcnQoZSkge1xyXG4gIGlmKGUgJiYgZS50YXJnZXQuaW5uZXJUZXh0ID09ICdRVUlDSyBDSEVDS09VVCcpIHtcclxuICAgIGNhcnQuc3RhdGUubG9hZGluZy5xdWlja2J1eSA9IHRydWU7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKGUudGFyZ2V0LmlubmVyVGV4dCk7XHJcbiAgY29uc3QgbWF0Y2hlZFZhcmlhdGlvbiA9IHByb2R1Y3QudmFsdWUudmFyaWF0aW9ucy5maW5kKCh2YXJpYXRpb24pID0+IHtcclxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhzZWxlY3RlZFZhcmlhdGlvbnMudmFsdWUpLmV2ZXJ5KChbYXR0ck5hbWUsIHNlbGVjdGVkVmFsdWVdKSA9PiB7XHJcbiAgICAgIGNvbnN0IGF0dHIgPSB2YXJpYXRpb24uYXR0cmlidXRlcy5maW5kKGEgPT4gYS5uYW1lID09PSBhdHRyTmFtZSk7XHJcbiAgICAgIGlmICghYXR0ciB8fCBzZWxlY3RlZFZhbHVlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChhdHRyLnZhbHVlID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGF0dHIudmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gc2VsZWN0ZWRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnNvbGUubG9nKG1hdGNoZWRWYXJpYXRpb24pO1xyXG4gIGlmICghbWF0Y2hlZFZhcmlhdGlvbikge1xyXG4gICAgY29uc29sZS5sb2cocHJvZHVjdC52YWx1ZS5pZCk7XHJcbiAgICAvL2FsZXJ0KCdObyBtYXRjaGluZyB2YXJpYXRpb24gZm91bmQnKTtcclxuICAgIGNhcnQuYWRkKHByb2R1Y3QudmFsdWUuaWQsIHF1YW50aXR5LnZhbHVlLCBudWxsLCBudWxsLCAkcSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBzZWxlY3RlZFZhcmlhdGlvbnNBcnJheSA9IHt9O1xyXG4gIHNlbGVjdGVkVmFyaWF0aW9uc0FycmF5LnZhcmlhdGlvbiA9IFtdO1xyXG4gIGNvbnNvbGUubG9nKHNlbGVjdGVkVmFyaWF0aW9ucy52YWx1ZSk7XHJcblxyXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG1hdGNoZWRWYXJpYXRpb24uYXR0cmlidXRlcykpIHtcclxuICAgIGNvbnNvbGUubG9nKGtleSk7XHJcbiAgICBpZiAoIXZhbHVlLnZhbHVlIHx8IHZhbHVlLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKHNlbGVjdGVkVmFyaWF0aW9ucy52YWx1ZSkpIHtcclxuICAgICAgICBpZiAodmFsdWUubmFtZSA9PSBrZXkpIHtcclxuICAgICAgICAgIHZhbHVlLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdmFsdWUudmFsdWUgPSBzZWxlY3RlZFZhcmlhdGlvbnMudmFsdWUubmFtZTtcclxuICAgIH1cclxuICAgIHNlbGVjdGVkVmFyaWF0aW9uc0FycmF5LnZhcmlhdGlvbi5wdXNoKHtcImF0dHJpYnV0ZVwiOiB2YWx1ZS5uYW1lLCBcInZhbHVlXCI6IHZhbHVlLnZhbHVlfSk7XHJcbiAgfVxyXG4gIGNvbnNvbGUubG9nKHByb2R1Y3QudmFsdWUuaWQgKyAnLScgKyAxICsgJy0nICsgbWF0Y2hlZFZhcmlhdGlvbi5pZCArICctJyArIHNlbGVjdGVkVmFyaWF0aW9uc0FycmF5LnZhcmlhdGlvbik7XHJcbiAgY2FydC5hZGQocHJvZHVjdC52YWx1ZS5pZCwgcXVhbnRpdHkudmFsdWUsIG1hdGNoZWRWYXJpYXRpb24uaWQsIHNlbGVjdGVkVmFyaWF0aW9uc0FycmF5LnZhcmlhdGlvbiwgJHEpO1xyXG59XHJcbmZ1bmN0aW9uIGluY3JlYXNlUXR5KCkge1xyXG4gIHF1YW50aXR5LnZhbHVlKytcclxufVxyXG5cclxuZnVuY3Rpb24gZGVjcmVhc2VRdHkoKSB7XHJcbiAgaWYgKHF1YW50aXR5LnZhbHVlID4gMSkgcXVhbnRpdHkudmFsdWUtLVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaFByb2R1Y3Qoc2x1Zykge1xyXG4gIC8vIDEuIFRyeSBmcm9tIHN0b3JlIGZpcnN0IChmYXN0IHBhdGgpXHJcbiAgbGV0IGV4aXN0aW5nID0gcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZS5maW5kKHAgPT4ge1xyXG4gICAgY29uc3QgcFNsdWcgPSBnZXRTbHVnRnJvbVBlcm1hbGluayhwLnBlcm1hbGluaylcclxuICAgIHJldHVybiBwU2x1ZyA9PT0gc2x1Z1xyXG4gIH0pXHJcblxyXG4gIGlmIChleGlzdGluZykge1xyXG4gICAgcHJvZHVjdC52YWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZXhpc3RpbmcpKSAvLyDwn5SlIGF2b2lkIHJlZmVyZW5jZSByZXVzZVxyXG4gIH0gZWxzZSB7XHJcbiAgICBwcm9kdWN0LnZhbHVlID0gYXdhaXQgcHJvZHVjdHNTdG9yZS5mZXRjaFNpbmdsZVByb2R1Y3Qoc2x1ZylcclxuICB9XHJcblxyXG4gIC8vIOKdlyBTYWZldHkgY2hlY2sgKGltcG9ydGFudClcclxuICBpZiAoIXByb2R1Y3QudmFsdWUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2R1Y3Qgbm90IGZvdW5kOicsIHNsdWcpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIC8vIEZpeCBjYXRlZ29yaWVzIGZhbGxiYWNrICh5b3VyIGxvZ2ljKVxyXG4gIGlmICghcHJvZHVjdC52YWx1ZT8uY2F0ZWdvcmllcz8ubGVuZ3RoKSB7XHJcbiAgICBwcm9kdWN0LnZhbHVlLmNhdGVnb3JpZXMgPSBbXHJcbiAgICAgIHByb2R1Y3QudmFsdWUuZXh0ZW5zaW9ucz8ubXByZXNzPy5kZWZhdWx0X2NhdGVnb3J5XHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICBxdWFudGl0eS52YWx1ZSA9IDFcclxuICBhY3RpdmVTbGlkZS52YWx1ZSA9IDBcclxuICBsaWdodGJveC52YWx1ZS5vcGVuID0gZmFsc2VcclxuXHJcbiAgYXdhaXQgcmVzZXRWYXJpYXRpb25zKClcclxuICBhd2FpdCBmZXRjaFdpc2hsaXN0RGF0YSgpXHJcbn1cclxuXHJcbmNvbnN0IGlzVmFyaWFibGUgPSBjb21wdXRlZCgoKSA9PiBwcm9kdWN0LnZhbHVlPy50eXBlID09PSAndmFyaWFibGUnKVxyXG5cclxuY29uc3Qgc2VsZWN0ZWRWYXJpYXRpb25zID0gcmVmKHt9KVxyXG5jb25zdCBzZWxlY3RlZFZhcmlhdGlvbiA9IHJlZihudWxsKVxyXG5jb25zdCB2YXJpYXRpb25FcnJvciA9IHJlZignJylcclxuY29uc3QgbWF0Y2hlZFZhcmlhdGlvbiA9IHJlZignJyk7XHJcbmNvbnN0IHdpc2hsaXN0QWRkZWQgPSByZWYoZmFsc2UpO1xyXG5mdW5jdGlvbiByZXNldFZhcmlhdGlvbnMoKSB7XHJcbiAgc2VsZWN0ZWRWYXJpYXRpb25zLnZhbHVlID0ge31cclxuICB2YXJpYXRpb25FcnJvci52YWx1ZSA9ICcnXHJcbiAgc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUgPSBudWxsXHJcbn1cclxuXHJcbmNvbnN0IHNob3VsZERpc2FibGVDYXJ0QnV0dG9ucyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICByZXR1cm4gaXNWYXJpYWJsZS52YWx1ZSAmJiAoIXNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlIHx8IHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlID09PSAnbnVsbCcpXHJcbn0pXHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2lzaGxpc3REYXRhKCkge1xyXG5cclxuICBhd2FpdCBjYXJ0LmZldGNoV2lzaGxpc3RJdGVtcygpO1xyXG5cclxuLy9jb25zb2xlLmxvZyhjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zLndpc2hsaXN0KTtcclxuaWYoY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcyAmJiBPYmplY3QudmFsdWVzKGNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXMpLmZpbmQob2JqID0+IHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlID8gc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUuaWQgOiBwcm9kdWN0LnZhbHVlLmlkID09PSBvYmouaWQpKXtcclxuICAgIHdpc2hsaXN0QWRkZWQudmFsdWUgPSB0cnVlXHJcbiAgfSBlbHNle1xyXG4gICAgd2lzaGxpc3RBZGRlZC52YWx1ZSA9IGZhbHNlXHJcbiAgfVxyXG5cclxuLy9jb25zb2xlLmxvZyh3aXNobGlzdEFkZGVkLnZhbHVlKTtcclxuIH1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG9uVmFyaWF0aW9uQ2hhbmdlKCkge1xyXG4gIGlmICghcHJvZHVjdC52YWx1ZSB8fCAhcHJvZHVjdC52YWx1ZS5hdHRyaWJ1dGVzKSB7XHJcbiAgICBzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZSA9IG51bGxcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbmNvbnNvbGUubG9nKCdTZWxlY3RlZCBWYXJpYXRpb25zOicsIHNlbGVjdGVkVmFyaWF0aW9ucy52YWx1ZSlcclxuY29uc29sZS5sb2coJ0F2YWlsYWJsZSBWYXJpYXRpb25zOicsIHByb2R1Y3QudmFsdWUudmFyaWF0aW9ucylcclxuXHJcbmNvbnNvbGUubG9nKHByb2R1Y3QudmFsdWUudmFyaWF0aW9ucyk7XHJcblxyXG4gbWF0Y2hlZFZhcmlhdGlvbi52YWx1ZSA9IHByb2R1Y3QudmFsdWUudmFyaWF0aW9ucy5maW5kKCh2YXJpYXRpb24pID0+IHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoc2VsZWN0ZWRWYXJpYXRpb25zLnZhbHVlKS5ldmVyeSgoW2F0dHJOYW1lLCBzZWxlY3RlZFZhbHVlXSkgPT4ge1xyXG4gICAgY29uc3QgYXR0ciA9IHZhcmlhdGlvbi5hdHRyaWJ1dGVzLmZpbmQoYSA9PiBhLm5hbWUgPT09IGF0dHJOYW1lKTtcclxuXHJcbiAgICAvLyBJZiBhdHRyaWJ1dGUgbm90IGZvdW5kLCBtaXNtYXRjaFxyXG4gICAgaWYgKCFhdHRyIHx8IHNlbGVjdGVkVmFsdWUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAvLyBJZiB2YXJpYXRpb24gaGFzIG5vIHZhbHVlIChudWxsKSwgdHJlYXQgaXQgYXMgYSB3aWxkY2FyZCAobWF0Y2ggYW55dGhpbmcpXHJcbiAgICBpZiAoYXR0ci52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlLCBjb21wYXJlIHRoZSBzZWxlY3RlZCB2YWx1ZSAoY2FzZS1pbnNlbnNpdGl2ZSlcclxuICAgIHJldHVybiBhdHRyLnZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHNlbGVjdGVkVmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICB9KTtcclxufSk7XHJcbmNvbnNvbGUubG9nKE9iamVjdC5rZXlzKHNlbGVjdGVkVmFyaWF0aW9ucy52YWx1ZSkubGVuZ3RoKTtcclxuXHJcbiAgaWYgKG1hdGNoZWRWYXJpYXRpb24udmFsdWUpIHtcclxuICBjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhtYXRjaGVkVmFyaWF0aW9uLnZhbHVlLmF0dHJpYnV0ZXMpLmxlbmd0aClcclxuXHJcbiAgICBpZiggT2JqZWN0LmtleXMobWF0Y2hlZFZhcmlhdGlvbi52YWx1ZS5hdHRyaWJ1dGVzKS5sZW5ndGggPT0gT2JqZWN0LmtleXMoc2VsZWN0ZWRWYXJpYXRpb25zLnZhbHVlKS5sZW5ndGggKSB7XHJcbiAgICBzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZSA9IG1hdGNoZWRWYXJpYXRpb24udmFsdWVcclxuICAgIH1cclxuICAgIHZhcmlhdGlvbkVycm9yLnZhbHVlID0gJydcclxuICB9IGVsc2Uge1xyXG4gICAgc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUgPSBudWxsXHJcbiAgICB2YXJpYXRpb25FcnJvci52YWx1ZSA9ICdQbGVhc2Ugc2VsZWN0IHZhbGlkIHZhcmlhdGlvbiBvcHRpb25zLidcclxuICB9XHJcblxyXG5cclxuZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2VsZWN0ZWRWYXJpYXRpb25zLnZhbHVlKSkge1xyXG4gIGNvbnNvbGUubG9nKGAke2tleX06ICR7dmFsdWV9YCk7XHJcbiAgaWYodmFsdWUgPT0gbnVsbCl7XHJcbiAgICBzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZSA9IG51bGxcclxuICB9XHJcbn1cclxuXHJcbmlmKHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlICYmIHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlLmlkKXtcclxuc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUgPSBhd2FpdCBmZXRjaFByb2R1Y3RCeUlkKHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlLmlkKTtcclxufVxyXG5cclxuY29uc29sZS5sb2coc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkVG9DYXJ0SGFuZGxlcihlKSB7XHJcbiAgaWYgKGlzVmFyaWFibGUudmFsdWUpIHtcclxuICBjb25zb2xlLmxvZyhzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZSk7XHJcbiAgICBpZiAoIXNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlKSB7XHJcbiAgICAgIHZhcmlhdGlvbkVycm9yLnZhbHVlID0gJ1BsZWFzZSBzZWxlY3QgYWxsIHZhcmlhdGlvbiBvcHRpb25zLidcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBhZGRUb0NhcnQoZSlcclxuICB9IGVsc2Uge1xyXG4gICAgYWRkVG9DYXJ0KGUpXHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhZGRUb1dpc2hsaXN0KCkge1xyXG5pZihzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZSl7XHJcbiAgYXdhaXQgY2FydC50b2dnbGVXaXNobGlzdEl0ZW0oc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUuaWQsICRxKTtcclxufSBlbHNlIHtcclxuICBhd2FpdCBjYXJ0LnRvZ2dsZVdpc2hsaXN0SXRlbShwcm9kdWN0LnZhbHVlLmlkLCAkcSk7XHJcbn1cclxuaWYoY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcykge1xyXG4gIGNvbnNvbGUubG9nKE9iamVjdC52YWx1ZXMoY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcykuZmluZChvYmogPT4gc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUgPyBzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZS5pZCA6IHByb2R1Y3QudmFsdWUuaWQgPT09IG9iai5pZCkpO1xyXG5cclxuICBjb25zb2xlLmxvZyhjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zKTtcclxuICBjb25zb2xlLmxvZyhjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zLmxlbmd0aCk7XHJcbn1cclxuXHJcbiAgaWYgKGNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXMgJiYgT2JqZWN0LnZhbHVlcyhjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zKS5maW5kKG9iaiA9PiBzZWxlY3RlZFZhcmlhdGlvbi52YWx1ZSA/IHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlLmlkIDogcHJvZHVjdC52YWx1ZS5pZCA9PT0gb2JqLmlkKSkge1xyXG4gICAgd2lzaGxpc3RBZGRlZC52YWx1ZSA9IGZhbHNlO1xyXG4gIH0gZWxzZXtcclxuICAgIHdpc2hsaXN0QWRkZWQudmFsdWUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbmNvbnNvbGUubG9nKHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlID8gc2VsZWN0ZWRWYXJpYXRpb24udmFsdWUuaWQgOiBwcm9kdWN0LnZhbHVlLmlkKTtcclxuICBjb25zb2xlLmxvZyh3aXNobGlzdEFkZGVkLnZhbHVlKTtcclxufVxyXG5vbk1vdW50ZWQoYXN5bmMoKSA9PiB7XHJcbiAgaWYgKHByb2Nlc3MuZW52LkNMSUVOVCkge1xyXG4gICAgICAvLyBJZiBubyBTU1IgZGF0YSDihpIgZmV0Y2hcclxuICBpZiAoIXByb2R1Y3QudmFsdWUgfHwgIXByb2R1Y3QudmFsdWUuaWQpIHtcclxuICAgIGF3YWl0IGZldGNoUHJvZHVjdChyb3V0ZS5wYXJhbXMuc2x1ZylcclxuICB9XHJcbiAgICBjb25zb2xlLmxvZygnUFdBIFNoZWxsIGRldGVjdGVkOiBGZXRjaGluZyBTRU8gZGF0YSBmcm9tIEFQSS4uLicpXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBVc2UgeW91ciBleGlzdGluZyBmZXRjaCBmdW5jdGlvblxyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hTZW9Gb3JQYXRoKGBwcm9kdWN0LyR7cm91dGUucGFyYW1zLnNsdWd9YClcclxuICAgICAgc2VvRGF0YS52YWx1ZSA9IGRhdGFcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignUFdBIFNFTyBmZXRjaCBmYWlsZWQnLCBlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHByb2Nlc3MuZW52LkNMSUVOVCkge1xyXG4gICAgYXdhaXQgZmV0Y2hXaXNobGlzdERhdGEoKVxyXG4gIH1cclxufSlcclxuXHJcbm9uQmVmb3JlUm91dGVVcGRhdGUoYXN5bmMgKHRvKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGZldGNoUHJvZHVjdCh0by5wYXJhbXMuc2x1ZylcclxuXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKVxyXG4gIH1cclxufSlcclxuXHJcbndhdGNoKFxyXG4gICgpID0+IHJvdXRlLnBhcmFtcy5zbHVnLFxyXG4gIGFzeW5jIChuZXdTbHVnLCBvbGRTbHVnKSA9PiB7XHJcbiAgICBpZiAobmV3U2x1ZyA9PT0gb2xkU2x1ZykgcmV0dXJuXHJcblxyXG5cclxuICAgIHNlbGVjdGVkVmFyaWF0aW9uLnZhbHVlID0gbnVsbFxyXG4gICAgc2VsZWN0ZWRWYXJpYXRpb25zLnZhbHVlID0ge31cclxuICAgIHZhcmlhdGlvbkVycm9yLnZhbHVlID0gJydcclxuICAgIHF1YW50aXR5LnZhbHVlID0gMVxyXG4gICAgYWN0aXZlU2xpZGUudmFsdWUgPSAwXHJcblxyXG4gICAgLy9hd2FpdCBmZXRjaFByb2R1Y3QobmV3U2x1ZylcclxuXHJcblxyXG4gICAgZmV0Y2hTZW9Gb3JQYXRoKGBwcm9kdWN0LyR7bmV3U2x1Z31gKVxyXG4gICAgICAudGhlbihkYXRhID0+IHNlb0RhdGEudmFsdWUgPSBkYXRhKVxyXG4gIH1cclxuKVxyXG5cclxuY29uc3Qgd2hlZWxab29tID0gKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KClcclxuICBjb25zdCBkZWx0YSA9IGUuZGVsdGFZIDwgMCA/IDAuMSA6IC0wLjFcclxuICB6b29tLnZhbHVlLnNjYWxlID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgem9vbS52YWx1ZS5zY2FsZSArIGRlbHRhKSwgNClcclxufVxyXG5cclxuY29uc3Qgc3RhcnREcmFnID0gKGUpID0+IHtcclxuICB6b29tLnZhbHVlLmRyYWdnaW5nID0gdHJ1ZVxyXG4gIHpvb20udmFsdWUuc3RhcnRYID0gZS5jbGllbnRYXHJcbiAgem9vbS52YWx1ZS5zdGFydFkgPSBlLmNsaWVudFlcclxufVxyXG5cclxuY29uc3QgZHJhZ2dpbmcgPSAoZSkgPT4ge1xyXG4gIGlmICghem9vbS52YWx1ZS5kcmFnZ2luZyB8fCB6b29tLnZhbHVlLnNjYWxlID09PSAxKSByZXR1cm5cclxuICBjb25zdCBkeCA9IGUuY2xpZW50WCAtIHpvb20udmFsdWUuc3RhcnRYXHJcbiAgY29uc3QgZHkgPSBlLmNsaWVudFkgLSB6b29tLnZhbHVlLnN0YXJ0WVxyXG4gIHpvb20udmFsdWUueCA9IHpvb20udmFsdWUubGFzdFggKyBkeFxyXG4gIHpvb20udmFsdWUueSA9IHpvb20udmFsdWUubGFzdFkgKyBkeVxyXG59XHJcblxyXG5jb25zdCBzdG9wRHJhZyA9ICgpID0+IHtcclxuICB6b29tLnZhbHVlLmRyYWdnaW5nID0gZmFsc2VcclxuICB6b29tLnZhbHVlLmxhc3RYID0gem9vbS52YWx1ZS54XHJcbiAgem9vbS52YWx1ZS5sYXN0WSA9IHpvb20udmFsdWUueVxyXG59XHJcblxyXG5sZXQgdG91Y2hTdGFydCA9IHsgeDogMCwgeTogMCwgZGlzdDogMCB9XHJcblxyXG5jb25zdCBzdGFydFRvdWNoID0gKGUpID0+IHtcclxuICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgY29uc3QgZHggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGUudG91Y2hlc1sxXS5jbGllbnRYXHJcbiAgICBjb25zdCBkeSA9IGUudG91Y2hlc1swXS5jbGllbnRZIC0gZS50b3VjaGVzWzFdLmNsaWVudFlcclxuICAgIHRvdWNoU3RhcnQuZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSlcclxuICB9IGVsc2Uge1xyXG4gICAgdG91Y2hTdGFydC54ID0gZS50b3VjaGVzWzBdLmNsaWVudFhcclxuICAgIHRvdWNoU3RhcnQueSA9IGUudG91Y2hlc1swXS5jbGllbnRZXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtb3ZlVG91Y2ggPSAoZSkgPT4ge1xyXG4gIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAyKSB7XHJcbiAgICBjb25zdCBkeCA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50b3VjaGVzWzFdLmNsaWVudFhcclxuICAgIGNvbnN0IGR5ID0gZS50b3VjaGVzWzBdLmNsaWVudFkgLSBlLnRvdWNoZXNbMV0uY2xpZW50WVxyXG4gICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSlcclxuICAgIGNvbnN0IHNjYWxlQ2hhbmdlID0gZGlzdCAvIHRvdWNoU3RhcnQuZGlzdFxyXG4gICAgem9vbS52YWx1ZS5zY2FsZSA9IE1hdGgubWluKE1hdGgubWF4KDEsIHNjYWxlQ2hhbmdlKSwgNClcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGVuZFRvdWNoID0gKCkgPT4ge31cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5pbWcge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG4uY2F0ZWdvcnktY2hpcCB7XHJcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbn1cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbIl9ob2lzdGVkXzEiLCJfaG9pc3RlZF8yIiwiX2hvaXN0ZWRfNCIsIl9ob2lzdGVkXzUiLCJfaG9pc3RlZF82IiwiX2hvaXN0ZWRfMTAiLCJfaG9pc3RlZF8xMSIsIl9ob2lzdGVkXzEyIiwiX2hvaXN0ZWRfMTMiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfaG9pc3RlZF8zIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlQmxvY2siLCJfd2l0aE1vZGlmaWVycyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfaG9p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LFNBQVM7QUFBQSxNQUFULHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxPQUFBLFNBQVMsT0FBSTtBQUFBLElBQUE7dUJBQzlCLE1BaUNTO0FBQUEsUUFqQ1RBLFlBaUNTLE9BQUE7QUFBQSxVQWhDUCxPQUFNO0FBQUEsVUFDTixPQUFBLEVBQUEsYUFBQSxTQUFBLGNBQUEsU0FBQSxZQUFBLFNBQUE7QUFBQSxRQUFBOzJCQUVBLE1BNEJNO0FBQUEsWUE1Qk5KLGdCQTRCTSxPQUFBO0FBQUEsY0EzQkosT0FBTTtBQUFBLGNBQ04sS0FBSTtBQUFBLGNBQ0gsY0FBWSxPQUFBO0FBQUEsY0FDWixhQUFXLE9BQUE7QUFBQSxjQUNYLFlBQVUsT0FBQTtBQUFBLGNBQ1YsU0FBTyxPQUFBO0FBQUEsY0FDUCxhQUFXLE9BQUE7QUFBQSxjQUNYLGFBQVcsT0FBQTtBQUFBLGNBQ1gsV0FBUyxPQUFBO0FBQUEsY0FDVCxjQUFZLE9BQUE7QUFBQSxjQUNiLE9BQUEsRUFBQSxZQUFBLFVBQUEsWUFBQSxXQUFBO0FBQUEsWUFBQTtjQUVBQSxnQkFLRSxPQUFBO0FBQUEsZ0JBSkMsS0FBSyxlQUFRLE9BQU8sT0FBQSxTQUFTLEtBQUssR0FBRztBQUFBLGdCQUNyQyxzQkFBTyxPQUFBLFNBQVM7QUFBQSxnQkFDakIsS0FBSTtBQUFBLGdCQUNKLFdBQVU7QUFBQSxjQUFBO2NBRVpJLFlBUUUsTUFBQTtBQUFBLGdCQVBBLE9BQUE7QUFBQSxnQkFDQSxPQUFBO0FBQUEsZ0JBQ0MsTUFBTSxPQUFBO0FBQUEsZ0JBQ1AsT0FBTTtBQUFBLGdCQUNOLGNBQVc7QUFBQSxnQkFDWCxPQUFNO0FBQUEsZ0JBQ0wsU0FBSyxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUUsT0FBQSxTQUFTLE9BQUk7QUFBQSxjQUFBOzs7Ozs7OztJQU03QkEsWUFJRSxPQUFBLHVCQUFBLEdBQUE7QUFBQSxNQUhDLFdBQVcsT0FBQSxRQUFRO0FBQUEsTUFDbkIsWUFBWSxPQUFBLFFBQVEsZUFBZTtBQUFBLE1BQ25DLFlBQVk7QUFBQSxJQUFBO1FBSUQsT0FBQSxZQUFPLFFBQXZCTixVQUFBLEdBQUFDLG1CQUVNLE9BRk4sYUFFTTtBQUFBLElBREpLLFlBQTBDLFVBQUE7QUFBQSxNQUEvQixPQUFNO0FBQUEsTUFBWSxNQUFLO0FBQUEsSUFBQTs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsM119
