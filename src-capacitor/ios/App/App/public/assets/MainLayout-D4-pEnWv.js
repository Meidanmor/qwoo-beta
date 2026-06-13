const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-CbS4QANN.js","./index-DDAg5YDa.js","./quasar-observers-delayed-tSHCOYpR.js","./index-DAfOORDk.css","./lazy-quasar-eWrTe79h.js"])))=>i.map(i=>d[i]);
import { h as hMergeSlot, a as hSlot, u as useDarkProps, b as useDark, d as debounce, _ as _export_sfc, Q as QBtn, m as matClose, c as cart, e as QIcon, f as QAvatar, g as QSeparator, i as QInput, j as QCard, k as matSmartToy, l as matSend, n as matChat, o as __vitePreload, P as Plugin, D as Dialog, R as Ripple, p as QBanner, q as useRoute, r as useRouter, s as matRemove, t as matAdd, v as matAdminPanelSettings, w as matPerson, x as matReceipt, y as matStorefront, z as matHome, A as matMenu, B as matFavoriteBorder, C as matShoppingCart } from "./index-DDAg5YDa.js";
import { Q as QHeader, a as QToolbar, b as QToolbarTitle, c as QDrawer, d as QPageContainer, e as QLayout } from "./QLayout-BNTZZmED.js";
import { f as createComponent, h, e as computed, a3 as useHydration, w as withDirectives, g as getCurrentInstance, v as watch, a4 as setHorizontalScrollPosition, A as onDeactivated, B as onActivated, R as onBeforeUnmount, a5 as QResizeObserver, a6 as QScrollObserver, a7 as TouchPan, j as ref, W as between, a8 as setVerticalScrollPosition, k as resolveComponent, o as openBlock, p as createBlock, q as withCtx, a9 as createBaseVNode, m as createElementBlock, aa as Fragment, ab as renderList, t as createVNode, u as createCommentVNode, ac as toDisplayString, ad as withModifiers, x as onMounted, T as Transition, ae as normalizeClass, af as withKeys, H as nextTick, P as Platform, ag as createStaticVNode, s as createTextVNode, ah as normalizeStyle, z as onUnmounted } from "./quasar-observers-delayed-tSHCOYpR.js";
import { Q as QItemSection } from "./QItemSection-Em5VwD4r.js";
import QItem from "./QItem-D74-s_Zr.js";
import QList from "./QList-tQahs7qg.js";
const alignValues = ["top", "middle", "bottom"];
const QBadge = createComponent({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: {
      type: String,
      validator: (v) => alignValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const style = computed(() => {
      return props.align !== void 0 ? { verticalAlign: props.align } : null;
    });
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return `q-badge flex inline items-center no-wrap q-badge--${props.multiLine === true ? "multi" : "single"}-line` + (props.outline === true ? " q-badge--outline" : props.color !== void 0 ? ` bg-${props.color}` : "") + (text !== void 0 ? ` text-${text}` : "") + (props.floating === true ? " q-badge--floating" : "") + (props.rounded === true ? " q-badge--rounded" : "") + (props.transparent === true ? " q-badge--transparent" : "");
    });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      role: "status",
      "aria-label": props.label
    }, hMergeSlot(slots.default, props.label !== void 0 ? [props.label] : []));
  }
});
const QNoSsr = createComponent({
  name: "QNoSsr",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    placeholder: String
  },
  setup(props, { slots }) {
    const { isHydrated } = useHydration();
    return () => {
      if (isHydrated.value === true) {
        const node2 = hSlot(slots.default);
        return node2 === void 0 ? node2 : node2.length > 1 ? h(props.tag, {}, node2) : node2[0];
      }
      const data = {
        class: "q-no-ssr-placeholder"
      };
      const node = hSlot(slots.placeholder);
      if (node !== void 0) {
        return node.length > 1 ? h(props.tag, data, node) : node[0];
      }
      if (props.placeholder !== void 0) {
        return h(props.tag, data, props.placeholder);
      }
    };
  }
});
const ScrollAreaControls = createComponent({
  props: [
    "store",
    "barStyle",
    "verticalBarStyle",
    "horizontalBarStyle"
  ],
  setup(props) {
    return () => [
      h("div", {
        class: props.store.scroll.vertical.barClass.value,
        style: [props.barStyle, props.verticalBarStyle],
        "aria-hidden": "true",
        onMousedown: props.store.onVerticalMousedown
      }),
      h("div", {
        class: props.store.scroll.horizontal.barClass.value,
        style: [props.barStyle, props.horizontalBarStyle],
        "aria-hidden": "true",
        onMousedown: props.store.onHorizontalMousedown
      }),
      withDirectives(
        h("div", {
          ref: props.store.scroll.vertical.ref,
          class: props.store.scroll.vertical.thumbClass.value,
          style: props.store.scroll.vertical.style.value,
          "aria-hidden": "true"
        }),
        props.store.thumbVertDir
      ),
      withDirectives(
        h("div", {
          ref: props.store.scroll.horizontal.ref,
          class: props.store.scroll.horizontal.thumbClass.value,
          style: props.store.scroll.horizontal.style.value,
          "aria-hidden": "true"
        }),
        props.store.thumbHorizDir
      )
    ];
  }
});
const axisList = ["vertical", "horizontal"];
const dirProps = {
  vertical: { offset: "offsetY", scroll: "scrollTop", dir: "down", dist: "y" },
  horizontal: { offset: "offsetX", scroll: "scrollLeft", dir: "right", dist: "x" }
};
const panOpts = {
  prevent: true,
  mouse: true,
  mouseAllDir: true
};
const getMinThumbSize = (size) => size >= 250 ? 50 : Math.ceil(size / 5);
const QScrollArea = createComponent({
  name: "QScrollArea",
  props: {
    ...useDarkProps,
    thumbStyle: Object,
    verticalThumbStyle: Object,
    horizontalThumbStyle: Object,
    barStyle: [Array, String, Object],
    verticalBarStyle: [Array, String, Object],
    horizontalBarStyle: [Array, String, Object],
    verticalOffset: {
      type: Array,
      default: [0, 0]
    },
    horizontalOffset: {
      type: Array,
      default: [0, 0]
    },
    contentStyle: [Array, String, Object],
    contentActiveStyle: [Array, String, Object],
    delay: {
      type: [String, Number],
      default: 1e3
    },
    visible: {
      type: Boolean,
      default: null
    },
    tabindex: [String, Number],
    onScroll: Function
  },
  setup(props, { slots, emit }) {
    const tempShowing = ref(false);
    const panning = ref(false);
    const hover = ref(false);
    const container = {
      vertical: ref(0),
      horizontal: ref(0)
    };
    const scroll = {
      vertical: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      },
      horizontal: {
        ref: ref(null),
        position: ref(0),
        size: ref(0)
      }
    };
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props, proxy.$q);
    let timer = null, panRefPos;
    const targetRef = ref(null);
    const classes = computed(
      () => "q-scrollarea" + (isDark.value === true ? " q-scrollarea--dark" : "")
    );
    Object.assign(container, {
      verticalInner: computed(() => container.vertical.value - props.verticalOffset[0] - props.verticalOffset[1]),
      horizontalInner: computed(() => container.horizontal.value - props.horizontalOffset[0] - props.horizontalOffset[1])
    });
    scroll.vertical.percentage = computed(() => {
      const diff = scroll.vertical.size.value - container.vertical.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(scroll.vertical.position.value / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.vertical.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.vertical.size.value <= container.vertical.value + 1);
    scroll.vertical.thumbStart = computed(() => props.verticalOffset[0] + scroll.vertical.percentage.value * (container.verticalInner.value - scroll.vertical.thumbSize.value));
    scroll.vertical.thumbSize = computed(
      () => Math.round(
        between(
          container.verticalInner.value * container.verticalInner.value / scroll.vertical.size.value,
          getMinThumbSize(container.verticalInner.value),
          container.verticalInner.value
        )
      )
    );
    scroll.vertical.style = computed(() => ({
      ...props.thumbStyle,
      ...props.verticalThumbStyle,
      top: `${scroll.vertical.thumbStart.value}px`,
      height: `${scroll.vertical.thumbSize.value}px`,
      right: `${props.horizontalOffset[1]}px`
    }));
    scroll.vertical.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.vertical.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--v absolute-right" + (scroll.vertical.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    scroll.horizontal.percentage = computed(() => {
      const diff = scroll.horizontal.size.value - container.horizontal.value;
      if (diff <= 0) {
        return 0;
      }
      const p = between(Math.abs(scroll.horizontal.position.value) / diff, 0, 1);
      return Math.round(p * 1e4) / 1e4;
    });
    scroll.horizontal.thumbHidden = computed(() => (props.visible === null ? hover.value : props.visible) !== true && tempShowing.value === false && panning.value === false || scroll.horizontal.size.value <= container.horizontal.value + 1);
    scroll.horizontal.thumbStart = computed(() => props.horizontalOffset[0] + scroll.horizontal.percentage.value * (container.horizontalInner.value - scroll.horizontal.thumbSize.value));
    scroll.horizontal.thumbSize = computed(
      () => Math.round(
        between(
          container.horizontalInner.value * container.horizontalInner.value / scroll.horizontal.size.value,
          getMinThumbSize(container.horizontalInner.value),
          container.horizontalInner.value
        )
      )
    );
    scroll.horizontal.style = computed(() => ({
      ...props.thumbStyle,
      ...props.horizontalThumbStyle,
      [proxy.$q.lang.rtl === true ? "right" : "left"]: `${scroll.horizontal.thumbStart.value}px`,
      width: `${scroll.horizontal.thumbSize.value}px`,
      bottom: `${props.verticalOffset[1]}px`
    }));
    scroll.horizontal.thumbClass = computed(() => "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__thumb--invisible" : ""));
    scroll.horizontal.barClass = computed(() => "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" + (scroll.horizontal.thumbHidden.value === true ? " q-scrollarea__bar--invisible" : ""));
    const mainStyle = computed(() => scroll.vertical.thumbHidden.value === true && scroll.horizontal.thumbHidden.value === true ? props.contentStyle : props.contentActiveStyle);
    function getScroll() {
      const info = {};
      axisList.forEach((axis) => {
        const data = scroll[axis];
        Object.assign(info, {
          [axis + "Position"]: data.position.value,
          [axis + "Percentage"]: data.percentage.value,
          [axis + "Size"]: data.size.value,
          [axis + "ContainerSize"]: container[axis].value,
          [axis + "ContainerInnerSize"]: container[axis + "Inner"].value
        });
      });
      return info;
    }
    const emitScroll = debounce(() => {
      const info = getScroll();
      info.ref = proxy;
      emit("scroll", info);
    }, 0);
    function localSetScrollPosition(axis, offset, duration) {
      if (axisList.includes(axis) === false) {
        console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");
        return;
      }
      const fn = axis === "vertical" ? setVerticalScrollPosition : setHorizontalScrollPosition;
      fn(targetRef.value, offset, duration);
    }
    function updateContainer({ height, width }) {
      let change = false;
      if (container.vertical.value !== height) {
        container.vertical.value = height;
        change = true;
      }
      if (container.horizontal.value !== width) {
        container.horizontal.value = width;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScroll({ position }) {
      let change = false;
      if (scroll.vertical.position.value !== position.top) {
        scroll.vertical.position.value = position.top;
        change = true;
      }
      if (scroll.horizontal.position.value !== position.left) {
        scroll.horizontal.position.value = position.left;
        change = true;
      }
      change === true && startTimer();
    }
    function updateScrollSize({ height, width }) {
      if (scroll.horizontal.size.value !== width) {
        scroll.horizontal.size.value = width;
        startTimer();
      }
      if (scroll.vertical.size.value !== height) {
        scroll.vertical.size.value = height;
        startTimer();
      }
    }
    function onPanThumb(e, axis) {
      const data = scroll[axis];
      if (e.isFirst === true) {
        if (data.thumbHidden.value === true) return;
        panRefPos = data.position.value;
        panning.value = true;
      } else if (panning.value !== true) {
        return;
      }
      if (e.isFinal === true) {
        panning.value = false;
      }
      const dProp = dirProps[axis];
      const multiplier = (data.size.value - container[axis].value) / (container[axis + "Inner"].value - data.thumbSize.value);
      const distance = e.distance[dProp.dist];
      const pos = panRefPos + (e.direction === dProp.dir ? 1 : -1) * distance * multiplier;
      setScroll(pos, axis);
    }
    function onMousedown(evt, axis) {
      const data = scroll[axis];
      if (data.thumbHidden.value !== true) {
        const startOffset = axis === "vertical" ? props.verticalOffset[0] : props.horizontalOffset[0];
        const offset = evt[dirProps[axis].offset] - startOffset;
        const thumbStart = data.thumbStart.value - startOffset;
        if (offset < thumbStart || offset > thumbStart + data.thumbSize.value) {
          const targetThumbStart = offset - data.thumbSize.value / 2;
          const percentage = between(targetThumbStart / (container[axis + "Inner"].value - data.thumbSize.value), 0, 1);
          setScroll(percentage * Math.max(0, data.size.value - container[axis].value), axis);
        }
        if (data.ref.value !== null) {
          data.ref.value.dispatchEvent(new MouseEvent(evt.type, evt));
        }
      }
    }
    function startTimer() {
      tempShowing.value = true;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        tempShowing.value = false;
      }, props.delay);
      props.onScroll !== void 0 && emitScroll();
    }
    function setScroll(offset, axis) {
      targetRef.value[dirProps[axis].scroll] = offset;
    }
    let mouseEventTimer = null;
    function onMouseenter() {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
      }
      mouseEventTimer = setTimeout(() => {
        mouseEventTimer = null;
        hover.value = true;
      }, proxy.$q.platform.is.ios ? 50 : 0);
    }
    function onMouseleave() {
      if (mouseEventTimer !== null) {
        clearTimeout(mouseEventTimer);
        mouseEventTimer = null;
      }
      hover.value = false;
    }
    let scrollPosition = null;
    watch(() => proxy.$q.lang.rtl, (rtl) => {
      if (targetRef.value !== null) {
        setHorizontalScrollPosition(
          targetRef.value,
          Math.abs(scroll.horizontal.position.value) * (rtl === true ? -1 : 1)
        );
      }
    });
    onDeactivated(() => {
      scrollPosition = {
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      };
    });
    onActivated(() => {
      if (scrollPosition === null) return;
      const scrollTarget = targetRef.value;
      if (scrollTarget !== null) {
        setHorizontalScrollPosition(scrollTarget, scrollPosition.left);
        setVerticalScrollPosition(scrollTarget, scrollPosition.top);
      }
    });
    onBeforeUnmount(emitScroll.cancel);
    Object.assign(proxy, {
      getScrollTarget: () => targetRef.value,
      getScroll,
      getScrollPosition: () => ({
        top: scroll.vertical.position.value,
        left: scroll.horizontal.position.value
      }),
      getScrollPercentage: () => ({
        top: scroll.vertical.percentage.value,
        left: scroll.horizontal.percentage.value
      }),
      setScrollPosition: localSetScrollPosition,
      setScrollPercentage(axis, percentage, duration) {
        localSetScrollPosition(
          axis,
          percentage * (scroll[axis].size.value - container[axis].value) * (axis === "horizontal" && proxy.$q.lang.rtl === true ? -1 : 1),
          duration
        );
      }
    });
    const store = {
      scroll,
      thumbVertDir: [[
        TouchPan,
        (e) => {
          onPanThumb(e, "vertical");
        },
        void 0,
        { vertical: true, ...panOpts }
      ]],
      thumbHorizDir: [[
        TouchPan,
        (e) => {
          onPanThumb(e, "horizontal");
        },
        void 0,
        { horizontal: true, ...panOpts }
      ]],
      onVerticalMousedown(evt) {
        onMousedown(evt, "vertical");
      },
      onHorizontalMousedown(evt) {
        onMousedown(evt, "horizontal");
      }
    };
    return () => {
      return h("div", {
        class: classes.value,
        onMouseenter,
        onMouseleave
      }, [
        h("div", {
          ref: targetRef,
          class: "q-scrollarea__container scroll relative-position fit hide-scrollbar",
          tabindex: props.tabindex !== void 0 ? props.tabindex : void 0
        }, [
          h("div", {
            class: "q-scrollarea__content absolute",
            style: mainStyle.value
          }, hMergeSlot(slots.default, [
            h(QResizeObserver, {
              debounce: 0,
              onResize: updateScrollSize
            })
          ])),
          h(QScrollObserver, {
            axis: "both",
            onScroll: updateScroll
          })
        ]),
        h(QResizeObserver, {
          debounce: 0,
          onResize: updateContainer
        }),
        h(ScrollAreaControls, {
          store,
          barStyle: props.barStyle,
          verticalBarStyle: props.verticalBarStyle,
          horizontalBarStyle: props.horizontalBarStyle
        })
      ]);
    };
  }
});
const _sfc_main$3 = {
  __name: "WishlistDrawer",
  setup(__props, { expose: __expose }) {
    __expose();
    const wishlist = computed(() => cart.state.wishlist_items);
    const isHydrated = ref(false);
    async function addToCart(p) {
      cart.add(p.id, 1);
    }
    async function removeFromWishlist(id) {
      try {
        await cart.toggleWishlistItem(id);
        console.log(wishlist.value);
      } catch (err) {
        console.error("Error removing from wishlist:", err);
      }
    }
    onMounted(() => {
      isHydrated.value = true;
    });
    const __returned__ = { wishlist, isHydrated, addToCart, removeFromWishlist, computed, onMounted, ref, get cart() {
      return cart;
    }, get matClose() {
      return matClose;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$3 = {
  key: 0,
  class: "text-center text-grey"
};
const _hoisted_2$3 = ["src", "alt"];
const _hoisted_3$1 = { class: "q-ml-sm column" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return $setup.isHydrated ? (openBlock(), createBlock(QScrollArea, {
    key: 0,
    class: "fit q-pa-sm"
  }, {
    default: withCtx(() => [
      createBaseVNode("div", null, [
        _cache[0] || (_cache[0] = createBaseVNode("h4", null, " Wishlist ", -1)),
        $setup.cart.state.wishlist_items && $setup.cart.state.wishlist_items.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_1$3, " Your wishlist is empty. ")) : $setup.cart.state.wishlist_items && $setup.cart.state.wishlist_items.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList($setup.cart.state.wishlist_items, (product) => {
          return openBlock(), createElementBlock("div", {
            key: product.id,
            class: "relative-position q-pa-sm row full-width"
          }, [
            createVNode(_component_router_link, {
              to: `/product/${product.slug}/`,
              class: "flex no-wrap q-pr-lg no-decoration text-secondary full-width"
            }, {
              default: withCtx(() => [
                product.image ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: product.image,
                  alt: product.name,
                  style: { "width": "100px", "height": "100px", "object-fit": "cover" }
                }, null, 8, _hoisted_2$3)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_3$1, [
                  createBaseVNode("div", null, toDisplayString(product.name), 1),
                  createVNode(QBtn, {
                    label: "Add to Cart",
                    color: "secondary",
                    onClick: ($event) => $setup.addToCart(product)
                  }, null, 8, ["onClick"])
                ])
              ]),
              _: 2
            }, 1032, ["to"]),
            createVNode(QBtn, {
              class: "absolute absolute-top-right",
              icon: $setup.matClose,
              flat: "",
              onClick: withModifiers(($event) => $setup.removeFromWishlist(product.id), ["stop", "prevent"])
            }, null, 8, ["icon", "onClick"])
          ]);
        }), 128)) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  })) : createCommentVNode("", true);
}
const WishlistDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "WishlistDrawer.vue"]]);
const _sfc_main$2 = {
  __name: "CookieBanner",
  setup(__props, { expose: __expose }) {
    __expose();
    const visible = ref(false);
    onMounted(() => {
      const accepted = localStorage.getItem("cookie_consent");
      if (!accepted) visible.value = true;
    });
    function acceptCookies() {
      localStorage.setItem("cookie_consent", "accepted");
      visible.value = false;
    }
    const __returned__ = { visible, acceptCookies, ref, onMounted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$2 = {
  key: 0,
  class: "cookie-banner"
};
const _hoisted_2$2 = { class: "cookie-actions" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      $setup.visible ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "cookie-text" }, " We use cookies to improve your experience on our website. ", -1)),
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(QBtn, {
            flat: "",
            "no-caps": "",
            label: "Privacy Policy",
            to: "/privacy-policy",
            color: "secondary"
          }),
          createVNode(QBtn, {
            unelevated: "",
            "no-caps": "",
            color: "secondary",
            label: "Accept",
            onClick: $setup.acceptCookies
          })
        ])
      ])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const CookieBanner = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-16994dde"], ["__file", "CookieBanner.vue"]]);
const QSpace = createComponent({
  name: "QSpace",
  setup() {
    const space = h("div", { class: "q-space" });
    return () => space;
  }
});
const QBar = createComponent({
  name: "QBar",
  props: {
    ...useDarkProps,
    dense: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => `q-bar row no-wrap items-center q-bar--${props.dense === true ? "dense" : "standard"}  q-bar--${isDark.value === true ? "dark" : "light"}`
    );
    return () => h("div", {
      class: classes.value,
      role: "toolbar"
    }, hSlot(slots.default));
  }
});
const _sfc_main$1 = {
  __name: "AiAssistant",
  setup(__props, { expose: __expose }) {
    __expose();
    const messages = ref([]);
    const input = ref("");
    const visible = ref(false);
    const scrollRef = ref(null);
    const fab1 = ref(false);
    const scrollToBottom = () => {
      nextTick(() => {
        if (scrollRef.value) {
          scrollRef.value.refresh();
          scrollRef.value.setScrollPercentage("vertical", 1);
        }
      });
    };
    const sendMessage = async () => {
      if (!input.value.trim()) return;
      const userText = input.value;
      messages.value.push({ id: Date.now(), text: userText, from: "user" });
      console.log("Messages:", messages.value);
      input.value = "";
      scrollToBottom();
      try {
        const res = await fetch("https://nuxt.meidanm.com/wp-json/ai-chat/v1/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText })
        });
        const data = await res.json();
        messages.value.push({ id: Date.now() + 1, text: data.reply, from: "bot" });
        console.log("Messages:", messages.value);
        scrollToBottom();
      } catch (e) {
        console.error(e);
        messages.value.push({ id: Date.now() + 2, text: "Failed to get response.", from: "bot" });
        console.log("Messages:", messages.value);
        scrollToBottom();
      }
    };
    const __returned__ = { messages, input, visible, scrollRef, fab1, scrollToBottom, sendMessage, ref, nextTick, get matClose() {
      return matClose;
    }, get matChat() {
      return matChat;
    }, get matSend() {
      return matSend;
    }, get matSmartToy() {
      return matSmartToy;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { class: "q-pa-sm" };
const _hoisted_2$1 = { class: "bubble" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    createVNode(QBtn, {
      fab: "",
      class: "fixed-bottom-left q-mb-md q-ml-md z-max",
      color: "secondary",
      "aria-label": $setup.visible ? "Close chat" : "Open chat",
      onClick: _cache[0] || (_cache[0] = ($event) => $setup.visible = !$setup.visible)
    }, {
      default: withCtx(() => [
        createVNode(Transition, { name: "rotate-fade" }, {
          default: withCtx(() => [
            (openBlock(), createBlock(QIcon, {
              class: "absolute",
              key: $setup.visible,
              name: $setup.visible ? $setup.matClose : $setup.matChat
            }, null, 8, ["name"]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["aria-label"]),
    $setup.visible ? (openBlock(), createBlock(QCard, {
      key: 0,
      class: "fixed-bottom-left q-mb-md q-ml-md z-max shadow-8 chat-container",
      style: { "margin-bottom": "100px" }
    }, {
      default: withCtx(() => [
        createVNode(QBar, { class: "bg-primary text-white" }, {
          default: withCtx(() => [
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "text-subtitle2" }, "AI Assistant", -1)),
            createVNode(QSpace),
            createVNode(QBtn, {
              dense: "",
              flat: "",
              icon: $setup.matClose,
              "aria-label": "Close chat",
              onClick: _cache[1] || (_cache[1] = ($event) => {
                $setup.visible = false;
                $setup.fab1 = false;
              })
            }, null, 8, ["icon"])
          ]),
          _: 1
        }),
        createVNode(QScrollArea, {
          class: "chat-scroll-area",
          ref: "scrollRef",
          style: { "height": "250px" }
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.messages, (msg) => {
                return openBlock(), createElementBlock("div", {
                  key: msg.id,
                  class: normalizeClass(["chat-message", msg.from === "user" ? "user" : "bot"])
                }, [
                  msg.from === "bot" ? (openBlock(), createBlock(QAvatar, {
                    key: 0,
                    size: "24px",
                    class: "q-mr-sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(QIcon, { name: $setup.matSmartToy }, null, 8, ["name"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_2$1, toDisplayString(msg.text), 1)
                ], 2);
              }), 128))
            ])
          ]),
          _: 1
        }, 512),
        createVNode(QSeparator),
        createVNode(QInput, {
          filled: "",
          dense: "",
          modelValue: $setup.input,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.input = $event),
          placeholder: "Type your message...",
          onKeyup: withKeys($setup.sendMessage, ["enter"]),
          class: "q-pa-sm"
        }, {
          append: withCtx(() => [
            createVNode(QBtn, {
              flat: "",
              round: "",
              icon: $setup.matSend,
              onClick: $setup.sendMessage
            }, null, 8, ["icon"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ]);
}
const AiAssistant = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "AiAssistant.vue"]]);
let PushNotifications = null;
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const APP_SERVER_KEY = "BHSV149RpWY5IkRyGC_DvxRWQuO_29FAdwhhFu9IPyfUNHDedg7pTCer_WrlJipDvmU0JqxBy4lKHWItX2E6cLw";
function getDeviceId() {
  let deviceId = localStorage.getItem("pwa_device_id");
  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem("pwa_device_id", deviceId);
  }
  return deviceId;
}
async function subscribeToWebPush() {
  console.log("🚀 Push setup started (Web)");
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("🔴 Notification permission not granted.");
    return;
  }
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(APP_SERVER_KEY)
    });
    const deviceId = getDeviceId();
    const cartToken = localStorage.getItem("wc_cart_token") || null;
    const payload = {
      device_id: deviceId,
      cart_token: cartToken,
      subscription
    };
    const res = await fetch("https://nuxt.meidanm.com/wp-json/pwa/v1/save-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    console.log("✅ Push subscription saved (web):", result);
  } catch (err) {
    console.error("❌ Push subscription failed (web):", err);
  }
}
async function createNotificationChannels() {
  await PushNotifications.createChannel({
    id: "orders",
    name: "Orders",
    description: "Order confirmations and payment updates",
    importance: 4,
    // HIGH
    visibility: 1,
    // PUBLIC (shows on lock screen)
    vibration: true
  });
  await PushNotifications.createChannel({
    id: "abandoned_cart",
    name: "Abandoned Cart",
    description: "Reminders about items left in your cart",
    importance: 4,
    // HIGH
    visibility: 1,
    vibration: true
  });
  await PushNotifications.createChannel({
    id: "promotions",
    name: "Promotions",
    description: "Sales, discounts and special offers",
    importance: 3,
    // DEFAULT
    visibility: 1,
    vibration: true
  });
  await PushNotifications.createChannel({
    id: "system",
    name: "System",
    description: "System and background notifications",
    importance: 2,
    // LOW
    visibility: 0,
    // PRIVATE
    vibration: true
  });
}
async function checkNativePermission() {
  if (!Platform.is.capacitor) return "unsupported";
  try {
    const pushModule = await __vitePreload(() => import(
      /* @vite-ignore */
      "./index-CbS4QANN.js"
    ), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url);
    PushNotifications = pushModule.PushNotifications;
    const perm = await PushNotifications.checkPermissions();
    return perm.receive;
  } catch (e) {
    console.warn("have error!", e);
  }
}
async function initNativePush() {
  if (!Platform.is.capacitor) return "unsupported";
  try {
    const pushModule = await __vitePreload(() => import(
      /* @vite-ignore */
      "./index-CbS4QANN.js"
    ), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url);
    PushNotifications = pushModule.PushNotifications;
    PushNotifications.addListener("registration", async (token) => {
      console.log("🟢 Native token:", token?.value);
      try {
        const deviceId = getDeviceId();
        const cartToken = localStorage.getItem("wc_cart_token") || null;
        await fetch("https://nuxt.meidanm.com/wp-json/pwa/v1/save-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            device_id: deviceId,
            cart_token: cartToken,
            subscription: { endpoint: token?.value, native: true }
          })
        });
      } catch (err) {
        console.error("❌ Failed saving native token to server", err);
      }
    });
    PushNotifications.addListener("registrationError", (err) => {
      console.error("❌ Native push registration error:", err);
    });
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        alert(
          "PUSH RECEIVED\n" + JSON.stringify(notification, null, 2)
        );
      }
    );
    const perm = await PushNotifications.checkPermissions();
    if (perm.receive !== "granted") {
      const req = await PushNotifications.requestPermissions();
      if (req.receive !== "granted") return;
    }
    await createNotificationChannels();
    await PushNotifications.register();
    return "initialized";
  } catch (e) {
    console.warn("Push plugin not available or not on mobile:", e);
    return "default";
  }
}
function setupCartTracking() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) syncSubscriptionCartToken();
  });
}
async function syncSubscriptionCartToken() {
  const deviceId = getDeviceId();
  const cartToken = localStorage.getItem("wc_cart_token");
  if (!cartToken || !deviceId) return;
  try {
    await fetch("https://nuxt.meidanm.com/wp-json/pwa/v1/update-cart-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        device_id: deviceId,
        cart_token: cartToken,
        timestamp: Date.now()
      })
    });
    console.log("✅ Cart token synced to push subscription.");
  } catch (err) {
    console.error("❌ Failed to sync cart token:", err);
  }
}
const initPush = ({ router } = {}) => {
  if (typeof window === "undefined") return;
  if (router) window.$router = router;
  const initCarTracking = async () => {
    setupCartTracking();
    if (Platform.is && Platform.is.capacitor) {
      try {
        const nativePush = await __vitePreload(() => import(
          /* @vite-ignore */
          "./index-CbS4QANN.js"
        ), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url);
        PushNotifications = nativePush.PushNotifications;
        PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
          console.log(action);
          const data = action.notification.data;
          if (data?.url) {
            router.push(data.url);
          }
        });
      } catch (e) {
        console.warn("Push plugin not available or not on mobile:", e);
      }
    }
    console.log("✅ Push & Tracking initialized after LCP");
  };
  initCarTracking();
};
let initialized = false;
function initLoadingBar(router) {
  if (initialized) return;
  initialized = true;
  Plugin.setDefaults({
    color: "black",
    size: "5px",
    position: "top"
  });
  router.beforeEach((to, from, next) => {
    Plugin.start();
    next();
  });
  router.afterEach(() => {
    Plugin.stop();
  });
}
let shown = false;
function initAuthPopup(router) {
  if (typeof window === "undefined") return;
  window.addEventListener("auth-expired", () => {
    if (shown) return;
    shown = true;
    Dialog.create({
      title: "Session Expired",
      class: "expired-dialog",
      message: "Your session ended. Continue as guest or login again.",
      ok: { label: "Login Again", color: "secondary" },
      cancel: { label: "Continue as Guest", color: "secondary" },
      persistent: true,
      noEscDismiss: true,
      noBackdropDismiss: true
    }).onOk(() => {
      router.push("/my-account");
    });
  });
}
const _responsiveClasses = "gt-sm lt-md gt-md lt-sm";
const _sfc_main = {
  __name: "MainLayout",
  setup(__props, { expose: __expose }) {
    __expose();
    function normalizePermission(value) {
      if (value === "prompt") {
        return "default";
      } else if (value === "initialized") {
        return "granted";
      }
      return value;
    }
    const permission = ref("default");
    const supported = ref(false);
    const isSuperAdmin = computed(() => cart.state.user?.is_super_admin === true);
    const mobileMenuDrawer = ref(false);
    const wishlistDrawerOpen = ref(false);
    const cartDrawer = ref(false);
    let startX = 0;
    let isDragging = false;
    const onStart = (x) => {
      if (mobileMenuDrawer.value || cartDrawer.value || wishlistDrawerOpen.value) {
        isDragging = false;
        return;
      }
      startX = x;
      isDragging = true;
    };
    const onEnd = (endX) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = endX - startX;
      const absX = Math.abs(dx);
      if (absX > 70) {
        if (dx > 0) {
          mobileMenuDrawer.value = true;
        } else {
          cartDrawer.value = true;
        }
      }
    };
    const handleTouchStart = (e) => onStart(e.touches[0].clientX, e.touches[0].clientY);
    const handleTouchEnd = (e) => onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    const handleMouseDown = (e) => onStart(e.clientX, e.clientY);
    const handleMouseUp = (e) => onEnd(e.clientX, e.clientY);
    const toggleCart = () => cartDrawer.value = !cartDrawer.value;
    const toggleWishlistDrawer = () => wishlistDrawerOpen.value = !wishlistDrawerOpen.value;
    const increase = (id) => cart.increase(id);
    const decrease = (id) => cart.decrease(id);
    const remove = (itemKey = null, itemAPIkey = null) => cart.remove(itemKey, itemAPIkey);
    async function handleSubscribe() {
      if (Platform.is.capacitor) {
        try {
          const result = await initNativePush();
          permission.value = normalizePermission(result);
          alert("Permission status: " + result);
        } catch (e) {
          console.error("Native permission error", e);
        }
      } else {
        await subscribeToWebPush();
        permission.value = Notification.permission;
      }
    }
    const storeReady = ref(false);
    const uiHydrated = ref(false);
    const route = useRoute();
    const router = useRouter();
    const noDelayRoutes = ["/checkout", "/cart"];
    const shouldDelayHydration = computed(() => {
      return !noDelayRoutes.includes(route.path);
    });
    onMounted(() => {
      storeReady.value = true;
      const headerBtnClick = async (e) => {
        await scheduler();
        const btn = e.target.closest("[aria-label]");
        if (btn) {
          const label = btn.getAttribute("aria-label");
          requestAnimationFrame(() => {
            if (label === "Open menu") {
              mobileMenuDrawer.value = true;
            } else if (label === "Add to wishlist") {
              wishlistDrawerOpen.value = true;
            } else if (label === "View cart") {
              cartDrawer.value = true;
            }
          });
        }
      };
      document.querySelector("header").addEventListener("click", headerBtnClick, { passive: true });
      const scheduler = async () => {
        if (uiHydrated.value) return;
        window.removeEventListener("scroll", scheduler);
        window.removeEventListener("mousemove", scheduler);
        window.removeEventListener("touchstart", scheduler);
        window.removeEventListener("click", headerBtnClick);
        try {
          const { hydrate } = await __vitePreload(async () => {
            const { hydrate: hydrate2 } = await import("./lazy-quasar-eWrTe79h.js");
            return { hydrate: hydrate2 };
          }, true ? __vite__mapDeps([4,1,2,3]) : void 0, import.meta.url);
          await hydrate();
          requestAnimationFrame(() => {
            uiHydrated.value = true;
          });
        } catch (e) {
          console.error("Hydration prefetch failed", e);
          uiHydrated.value = true;
        }
        initLoadingBar(router);
        initAuthPopup(router);
        if (typeof window !== "undefined" || Platform.is.capacitor) {
          initPush({ router });
          const initialPermissions = await checkNativePermission();
          permission.value = normalizePermission(initialPermissions);
          console.log("🛒 Cart tracking active");
        }
        if (Platform.is.capacitor) {
          supported.value = true;
        } else if ("Notification" in window) {
          supported.value = true;
          permission.value = normalizePermission(Notification.permission);
        }
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        window.addEventListener("mousedown", handleMouseDown, { passive: true });
        window.addEventListener("mouseup", handleMouseUp, { passive: true });
      };
      if (!shouldDelayHydration.value) {
        scheduler();
        return;
      } else {
        window.addEventListener("scroll", scheduler, { passive: true });
        window.addEventListener("mousemove", scheduler, { passive: true });
        window.addEventListener("touchstart", scheduler, { passive: true });
        setTimeout(scheduler, 3e3);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    });
    watch(() => cart.state.drawerOpen, (val) => {
      if (val === true) {
        cartDrawer.value = val;
        cart.state.drawerOpen = false;
      }
    });
    const __returned__ = { normalizePermission, _responsiveClasses, permission, supported, isSuperAdmin, mobileMenuDrawer, wishlistDrawerOpen, cartDrawer, get startX() {
      return startX;
    }, set startX(v) {
      startX = v;
    }, get isDragging() {
      return isDragging;
    }, set isDragging(v) {
      isDragging = v;
    }, onStart, onEnd, handleTouchStart, handleTouchEnd, handleMouseDown, handleMouseUp, toggleCart, toggleWishlistDrawer, increase, decrease, remove, handleSubscribe, storeReady, uiHydrated, route, router, noDelayRoutes, shouldDelayHydration, ref, computed, watch, onMounted, onUnmounted, get cart() {
      return cart;
    }, WishlistDrawer, get useRoute() {
      return useRoute;
    }, get useRouter() {
      return useRouter;
    }, get Platform() {
      return Platform;
    }, CookieBanner, AiAssistant, get initPush() {
      return initPush;
    }, get subscribeToWebPush() {
      return subscribeToWebPush;
    }, get initNativePush() {
      return initNativePush;
    }, get checkNativePermission() {
      return checkNativePermission;
    }, get initLoadingBar() {
      return initLoadingBar;
    }, get initAuthPopup() {
      return initAuthPopup;
    }, get matShoppingCart() {
      return matShoppingCart;
    }, get matFavoriteBorder() {
      return matFavoriteBorder;
    }, get matMenu() {
      return matMenu;
    }, get matHome() {
      return matHome;
    }, get matStorefront() {
      return matStorefront;
    }, get matReceipt() {
      return matReceipt;
    }, get matPerson() {
      return matPerson;
    }, get matAdminPanelSettings() {
      return matAdminPanelSettings;
    }, get matAdd() {
      return matAdd;
    }, get matClose() {
      return matClose;
    }, get matRemove() {
      return matRemove;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = {
  key: 0,
  class: "minimal-fallback"
};
const _hoisted_2 = { class: "q-header q-layout__section--marginal fixed-top" };
const _hoisted_3 = { class: "container" };
const _hoisted_4 = {
  class: "q-toolbar row no-wrap items-center flex justify-between q-pa-sm",
  role: "toolbar"
};
const _hoisted_5 = {
  "aria-current": "page",
  href: "/",
  class: "router-link-active router-link-exact-active flex items-center q-mr-auto order-first",
  "aria-label": "Navigate to home page"
};
const _hoisted_6 = {
  width: "180px",
  height: "42px",
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 206.73 48",
  style: { "display": "block" }
};
const _hoisted_7 = { style: { "padding-top": "58px" } };
const _hoisted_8 = { class: "container" };
const _hoisted_9 = {
  key: 0,
  class: "flex nav-items-el"
};
const _hoisted_10 = {
  width: "180px",
  height: "42px",
  style: { "display": "block" },
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 206.73 48"
};
const _hoisted_11 = { class: "q-pa-md" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = ["src"];
const _hoisted_14 = { class: "q-ml-sm column" };
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { key: 1 };
const _hoisted_17 = { class: "row items-center q-mt-xs" };
const _hoisted_18 = { class: "q-mx-sm" };
const _hoisted_19 = {
  key: 1,
  class: "q-pa-sm row items-center"
};
const _hoisted_20 = {
  key: 4,
  class: "q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded bg-primary text-white q-btn--actionable q-focusable q-hoverable q-btn--fab fixed-bottom-left q-mb-md q-ml-md z-max",
  tabindex: "0",
  type: "button",
  "aria-label": "Open chat"
};
const _hoisted_21 = { class: "container flex justify-between" };
const _hoisted_22 = { class: "footer-column" };
const _hoisted_23 = { class: "footer-column" };
const _hoisted_24 = { class: "footer-column" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  const _component_router_link = resolveComponent("router-link");
  return !$setup.uiHydrated ? (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "flex" }, [
            createBaseVNode("div", { class: "q-toolbar__title ellipsis nav-bar gt-sm" }, [
              createBaseVNode("a", {
                "aria-current": "page",
                href: "/",
                class: "router-link-active router-link-exact-active text-h6 no-decoration"
              }, "My Shop"),
              createBaseVNode("a", {
                href: "/products/",
                class: "text-h6 no-decoration"
              }, "Products"),
              createBaseVNode("a", {
                href: "/cart/",
                class: "text-h6 no-decoration"
              }, "Cart"),
              createBaseVNode("a", {
                href: "/checkout/",
                class: "text-h6 no-decoration"
              }, "Checkout"),
              createBaseVNode("a", {
                href: "/my-account/",
                class: "text-h6 no-decoration"
              }, "My account")
            ]),
            createBaseVNode("button", {
              class: "q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense lt-md",
              tabindex: "0",
              type: "button",
              "aria-label": "Open menu",
              fdprocessedid: "hib2pl"
            }, [
              createBaseVNode("span", { class: "q-focus-helper" }),
              createBaseVNode("span", { class: "q-btn__content text-center col items-center q-anchor--skip justify-center row" }, [
                createBaseVNode("i", {
                  class: "q-icon",
                  "aria-hidden": "true",
                  role: "img"
                }, [
                  createBaseVNode("svg", { viewBox: "0 0 24 24" }, [
                    createBaseVNode("path", {
                      d: "M0 0h24v24H0z",
                      style: { "fill": "none" }
                    }),
                    createBaseVNode("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" })
                  ])
                ])
              ])
            ])
          ], -1)),
          createBaseVNode("a", _hoisted_5, [
            (openBlock(), createElementBlock("svg", _hoisted_6, [..._cache[9] || (_cache[9] = [
              createStaticVNode('<text transform="translate(55 23.71)" style="fill:var(--q-secondary);font-family:ArialMT, Arial;font-size:26px;isolation:isolate;"><tspan x="0" y="0">NaturaBloom</tspan></text><text transform="translate(56 41.71)" style="fill:var(--q-secondary);font-family:ArialMT, Arial;font-size:12px;isolation:isolate;"><tspan x="0" y="0">Let</tspan><tspan x="16.68" y="0" style="letter-spacing:-0.02em;">’</tspan><tspan x="19.13" y="0">s Bloom</tspan><tspan x="62.48" y="0" style="letter-spacing:-0.02em;"></tspan><tspan x="65.6" y="0" style="letter-spacing:-0.11em;">T</tspan><tspan x="71.6" y="0">ogether</tspan></text><circle cx="24" cy="24" r="24" style="fill:rgb(243, 236, 226);"></circle><path d="M24,10c6,10,6,18,0,28-6-10-6-18,0-28Z" style="fill:rgb(163, 201, 168);"></path>', 4)
            ])]))
          ]),
          _cache[11] || (_cache[11] = createBaseVNode("div", null, [
            createBaseVNode("button", {
              class: "q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense q-ml-sm q-mr-sm",
              tabindex: "0",
              type: "button",
              "aria-label": "Add to wishlist",
              fdprocessedid: "pf8ulp"
            }, [
              createBaseVNode("span", { class: "q-focus-helper" }),
              createBaseVNode("span", { class: "q-btn__content text-center col items-center q-anchor--skip justify-center row" }, [
                createBaseVNode("i", {
                  class: "q-icon",
                  "aria-hidden": "true",
                  role: "img"
                }, [
                  createBaseVNode("svg", { viewBox: "0 0 24 24" }, [
                    createBaseVNode("path", {
                      d: "M0 0h24v24H0z",
                      style: { "fill": "none" }
                    }),
                    createBaseVNode("path", { d: "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" })
                  ])
                ])
              ])
            ]),
            createBaseVNode("button", {
              class: "q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense",
              tabindex: "0",
              type: "button",
              "aria-label": "View cart",
              fdprocessedid: "m7wgaa"
            }, [
              createBaseVNode("span", { class: "q-focus-helper" }),
              createBaseVNode("span", { class: "q-btn__content text-center col items-center q-anchor--skip justify-center row" }, [
                createBaseVNode("i", {
                  class: "q-icon",
                  "aria-hidden": "true",
                  role: "img"
                }, [
                  createBaseVNode("svg", { viewBox: "0 0 24 24" }, [
                    createBaseVNode("path", {
                      d: "M0 0h24v24H0z",
                      style: { "fill": "none" }
                    }),
                    createBaseVNode("path", { d: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" })
                  ])
                ])
              ])
            ])
          ], -1))
        ])
      ])
    ]),
    createBaseVNode("main", null, [
      createBaseVNode("div", _hoisted_7, [
        createVNode(_component_router_view)
      ])
    ])
  ])) : (openBlock(), createBlock(QLayout, {
    key: 1,
    view: "hHh lpR fFf"
  }, {
    default: withCtx(() => [
      createVNode(QHeader, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_8, [
            createVNode(QToolbar, { class: "flex justify-between q-pa-sm" }, {
              default: withCtx(() => [
                $setup.uiHydrated ? (openBlock(), createElementBlock("div", _hoisted_9, [
                  createVNode(QToolbarTitle, { class: "nav-bar gt-sm" }, {
                    default: withCtx(() => [
                      $setup.isSuperAdmin ? (openBlock(), createBlock(_component_router_link, {
                        key: 0,
                        to: "/admin",
                        class: "text-h6 no-decoration"
                      }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: $setup.matAdminPanelSettings }, null, 8, ["name"]),
                          _cache[12] || (_cache[12] = createTextVNode(" Go to Admin Panel", -1))
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_router_link, {
                        to: "/",
                        class: "text-h6 no-decoration"
                      }, {
                        default: withCtx(() => [..._cache[13] || (_cache[13] = [
                          createTextVNode("My Shop", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/products/",
                        class: "text-h6 no-decoration"
                      }, {
                        default: withCtx(() => [..._cache[14] || (_cache[14] = [
                          createTextVNode("Products", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/cart/",
                        class: "text-h6 no-decoration"
                      }, {
                        default: withCtx(() => [..._cache[15] || (_cache[15] = [
                          createTextVNode("Cart", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/checkout/",
                        class: "text-h6 no-decoration"
                      }, {
                        default: withCtx(() => [..._cache[16] || (_cache[16] = [
                          createTextVNode("Checkout", -1)
                        ])]),
                        _: 1
                      }),
                      createVNode(_component_router_link, {
                        to: "/my-account/",
                        class: "text-h6 no-decoration"
                      }, {
                        default: withCtx(() => [..._cache[17] || (_cache[17] = [
                          createTextVNode("My account", -1)
                        ])]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(QBtn, {
                    flat: "",
                    dense: "",
                    icon: $setup.matMenu,
                    "aria-label": "Open menu",
                    class: "lt-md",
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.mobileMenuDrawer = true)
                  }, null, 8, ["icon"])
                ])) : createCommentVNode("", true),
                createVNode(_component_router_link, {
                  to: "/",
                  "aria-label": "Navigate to home page",
                  class: "flex items-center order-first"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock("svg", _hoisted_10, [..._cache[18] || (_cache[18] = [
                      createBaseVNode("text", {
                        transform: "translate(55 23.71)",
                        style: { "fill": "var(--q-secondary)", "font-family": "ArialMT, Arial", "font-size": "26px", "isolation": "isolate" }
                      }, [
                        createBaseVNode("tspan", {
                          x: "0",
                          y: "0"
                        }, "NaturaBloom")
                      ], -1),
                      createBaseVNode("text", {
                        transform: "translate(56 41.71)",
                        style: { "fill": "var(--q-secondary)", "font-family": "ArialMT, Arial", "font-size": "12px", "isolation": "isolate" }
                      }, [
                        createBaseVNode("tspan", {
                          x: "0",
                          y: "0"
                        }, "Let"),
                        createBaseVNode("tspan", {
                          x: "16.68",
                          y: "0",
                          style: { "letter-spacing": "-.02em" }
                        }, "’"),
                        createBaseVNode("tspan", {
                          x: "19.13",
                          y: "0"
                        }, "s Bloom"),
                        createBaseVNode("tspan", {
                          x: "62.48",
                          y: "0",
                          style: { "letter-spacing": "-.02em" }
                        }),
                        createBaseVNode("tspan", {
                          x: "65.6",
                          y: "0",
                          style: { "letter-spacing": "-.11em" }
                        }, "T"),
                        createBaseVNode("tspan", {
                          x: "71.6",
                          y: "0"
                        }, "ogether")
                      ], -1),
                      createBaseVNode("circle", {
                        cx: "24",
                        cy: "24",
                        r: "24",
                        style: { "fill": "#f3ece2" }
                      }, null, -1),
                      createBaseVNode("path", {
                        d: "M24,10c6,10,6,18,0,28-6-10-6-18,0-28Z",
                        style: { "fill": "#a3c9a8" }
                      }, null, -1)
                    ])]))
                  ]),
                  _: 1
                }),
                createBaseVNode("div", null, [
                  createVNode(QBtn, {
                    flat: "",
                    dense: "",
                    icon: $setup.matFavoriteBorder,
                    "aria-label": "Add to wishlist",
                    onClick: $setup.toggleWishlistDrawer,
                    class: "q-ml-sm q-mr-sm"
                  }, {
                    default: withCtx(() => [
                      $setup.storeReady && $setup.cart.state.wishlist_items && Object.keys($setup.cart.state.wishlist_items).length > 0 ? (openBlock(), createBlock(QBadge, {
                        key: 0,
                        floating: "",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(Object.keys($setup.cart.state.wishlist_items).length), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["icon"]),
                  createVNode(QBtn, {
                    flat: "",
                    dense: "",
                    icon: $setup.matShoppingCart,
                    "aria-label": "View cart",
                    onClick: $setup.toggleCart
                  }, {
                    default: withCtx(() => [
                      createVNode(QNoSsr, null, {
                        default: withCtx(() => [
                          $setup.storeReady && $setup.cart.state.items_count > 0 ? (openBlock(), createBlock(QBadge, {
                            key: 0,
                            floating: "",
                            color: "red"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString($setup.cart.state.items_count), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["icon"])
                ])
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }),
      $setup.uiHydrated ? (openBlock(), createBlock(QDrawer, {
        key: 0,
        modelValue: $setup.mobileMenuDrawer,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.mobileMenuDrawer = $event),
        side: "left",
        overlay: "",
        behavior: "mobile",
        width: 260,
        "transition-show": "slide-right",
        "transition-hide": "slide-left",
        "touch-area-width": 250
      }, {
        default: withCtx(() => [
          createVNode(QScrollArea, { class: "fit" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_11, [
                _cache[25] || (_cache[25] = createBaseVNode("div", { class: "text-h6 q-mb-md" }, "Menu", -1)),
                createVNode(QList, {
                  bordered: "",
                  padding: ""
                }, {
                  default: withCtx(() => [
                    $setup.isSuperAdmin ? withDirectives((openBlock(), createBlock(QItem, {
                      key: 0,
                      clickable: "",
                      to: "/admin",
                      "active-class": "text-primary"
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, { name: "admin_panel_settings" })
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [..._cache[19] || (_cache[19] = [
                            createTextVNode("Go to Admin Panel", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [Ripple]
                    ]) : createCommentVNode("", true),
                    withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      to: "/",
                      onClick: _cache[1] || (_cache[1] = ($event) => $setup.mobileMenuDrawer = false)
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, { name: $setup.matHome }, null, 8, ["name"])
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [..._cache[20] || (_cache[20] = [
                            createTextVNode("Home", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [Ripple]
                    ]),
                    withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      to: "/products/",
                      onClick: _cache[2] || (_cache[2] = ($event) => $setup.mobileMenuDrawer = false)
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, { name: $setup.matStorefront }, null, 8, ["name"])
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [..._cache[21] || (_cache[21] = [
                            createTextVNode("Products", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [Ripple]
                    ]),
                    withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      to: "/cart/",
                      onClick: _cache[3] || (_cache[3] = ($event) => $setup.mobileMenuDrawer = false)
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, { name: $setup.matShoppingCart }, null, 8, ["name"])
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [..._cache[22] || (_cache[22] = [
                            createTextVNode("Cart", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [Ripple]
                    ]),
                    withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      to: "/checkout/",
                      onClick: _cache[4] || (_cache[4] = ($event) => $setup.mobileMenuDrawer = false)
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, { name: $setup.matReceipt }, null, 8, ["name"])
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [..._cache[23] || (_cache[23] = [
                            createTextVNode("Checkout", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [Ripple]
                    ]),
                    withDirectives((openBlock(), createBlock(QItem, {
                      clickable: "",
                      to: "/my-account/",
                      onClick: _cache[5] || (_cache[5] = ($event) => $setup.mobileMenuDrawer = false)
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, { avatar: "" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, { name: $setup.matPerson }, null, 8, ["name"])
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [..._cache[24] || (_cache[24] = [
                            createTextVNode("My Account", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [Ripple]
                    ])
                  ]),
                  _: 1
                })
              ]),
              $setup.supported && $setup.permission !== "granted" && $setup.permission !== "denied" ? (openBlock(), createBlock(QBanner, {
                key: 0,
                class: "bg-primary text-white q-ma-md rounded-borders shadow-2",
                "inline-actions": ""
              }, {
                action: withCtx(() => [
                  createVNode(QBtn, {
                    dense: "",
                    color: "white",
                    "text-color": "secondary",
                    label: "Enable",
                    onClick: $setup.handleSubscribe
                  })
                ]),
                default: withCtx(() => [
                  _cache[26] || (_cache[26] = createBaseVNode("div", { class: "text-subtitle1" }, "Enable push notifications?", -1))
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])) : createCommentVNode("", true),
      $setup.uiHydrated ? (openBlock(), createBlock(QDrawer, {
        key: 1,
        modelValue: $setup.wishlistDrawerOpen,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.wishlistDrawerOpen = $event),
        side: "right",
        overlay: "",
        behavior: "mobile"
      }, {
        default: withCtx(() => [
          createVNode($setup["WishlistDrawer"])
        ]),
        _: 1
      }, 8, ["modelValue"])) : createCommentVNode("", true),
      $setup.uiHydrated ? (openBlock(), createBlock(QDrawer, {
        key: 2,
        modelValue: $setup.cartDrawer,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.cartDrawer = $event),
        side: "right",
        overlay: "",
        behavior: "mobile",
        width: 300,
        "touch-area-width": 250
      }, {
        default: withCtx(() => [
          createVNode(QNoSsr, null, {
            default: withCtx(() => [
              createVNode(QScrollArea, { class: "fit q-pa-sm" }, {
                default: withCtx(() => [
                  _cache[28] || (_cache[28] = createBaseVNode("h4", null, " Cart ", -1)),
                  $setup.cart.hasItems.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.cart.state.items, (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: item.id,
                        class: normalizeClass(["q-pa-sm row items-center", [item.key.includes("offline") ? "offline-item" : ""]])
                      }, [
                        item.images ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          src: item.images[0]?.thumbnail,
                          style: { "width": "100px", "height": "100px", "object-fit": "cover" }
                        }, null, 8, _hoisted_13)) : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_14, [
                          createBaseVNode("div", null, toDisplayString(item.name), 1),
                          item.variation && item.variation.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_15, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(item.variation, (variation, index) => {
                              return openBlock(), createElementBlock("div", { key: index }, toDisplayString(variation.attribute) + ": " + toDisplayString(variation.value), 1);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          item.prices ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(item.prices.price) + " " + toDisplayString(item.prices.currency_code), 1)) : createCommentVNode("", true),
                          createBaseVNode("div", _hoisted_17, [
                            createVNode(QBtn, {
                              dense: "",
                              round: "",
                              icon: $setup.matRemove,
                              onClick: ($event) => $setup.decrease(item.key),
                              disable: item.quantity === 1
                            }, null, 8, ["icon", "onClick", "disable"]),
                            createBaseVNode("span", _hoisted_18, toDisplayString(item.quantity), 1),
                            createVNode(QBtn, {
                              dense: "",
                              round: "",
                              icon: $setup.matAdd,
                              onClick: ($event) => $setup.increase(item.id)
                            }, null, 8, ["icon", "onClick"]),
                            createVNode(QBtn, {
                              dense: "",
                              flat: "",
                              icon: $setup.matClose,
                              onClick: ($event) => $setup.remove(item.key, item.remote_key),
                              class: "q-ml-sm"
                            }, null, 8, ["icon", "onClick"])
                          ])
                        ])
                      ], 2);
                    }), 128)),
                    createVNode(_component_router_link, { to: "/checkout/" }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          color: "secondary",
                          label: "Checkout"
                        })
                      ]),
                      _: 1
                    })
                  ])) : (openBlock(), createElementBlock("div", _hoisted_19, [
                    _cache[27] || (_cache[27] = createBaseVNode("h5", null, "seems like your cart is empty", -1)),
                    createVNode(_component_router_link, { to: "/products/" }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          color: "secondary",
                          label: "Shop now!"
                        })
                      ]),
                      _: 1
                    })
                  ]))
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])) : createCommentVNode("", true),
      $setup.uiHydrated ? (openBlock(), createBlock($setup["AiAssistant"], { key: 3 })) : (openBlock(), createElementBlock("button", _hoisted_20, [..._cache[29] || (_cache[29] = [
        createBaseVNode("span", {
          class: "q-focus-helper",
          tabindex: "-1"
        }, null, -1),
        createBaseVNode("span", { class: "q-btn__content text-center col items-center q-anchor--skip justify-center row" }, [
          createBaseVNode("i", {
            class: "q-icon absolute",
            "aria-hidden": "true"
          }, [
            createBaseVNode("svg", { viewBox: "0 0 24 24" }, [
              createBaseVNode("path", {
                d: "M0 0h24v24H0z",
                style: { "fill": "none" }
              }),
              createBaseVNode("path", { d: "M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" })
            ])
          ])
        ], -1)
      ])])),
      createVNode(QPageContainer, {
        style: normalizeStyle($setup.uiHydrated ? {} : { paddingTop: "58px" })
      }, {
        default: withCtx(() => [
          createBaseVNode("main", null, [
            createVNode(_component_router_view)
          ])
        ]),
        _: 1
      }, 8, ["style"]),
      createBaseVNode("footer", null, [
        createBaseVNode("div", _hoisted_21, [
          _cache[43] || (_cache[43] = createBaseVNode("div", { class: "footer-column first" }, [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "108",
              height: "15",
              viewBox: "0 0 108 15",
              fill: "none"
            }, [
              createBaseVNode("path", {
                d: "M10.7031 1.55273L8.94531 1.29883V0.78125H13.4082V1.29883L11.7285 1.55273V13.877H10.7812L2.70508 2.09961V13.0957L4.46289 13.3594V13.877H0V13.3594L1.67969 13.0957V1.55273L0 1.29883V0.78125H3.96484L10.7031 10.4785V1.55273ZM18.4082 4.49219C18.8249 4.49219 19.2122 4.53125 19.5703 4.60938C19.9284 4.6875 20.2376 4.82096 20.498 5.00977C20.7585 5.19857 20.9619 5.4541 21.1084 5.77637C21.2549 6.09863 21.3281 6.50391 21.3281 6.99219V13.1934L22.4707 13.4375V13.877H19.9512L19.7656 12.959C19.668 13.0566 19.5361 13.1706 19.3701 13.3008C19.2041 13.431 19.0039 13.5531 18.7695 13.667C18.5352 13.7809 18.2633 13.877 17.9541 13.9551C17.6449 14.0332 17.3014 14.0723 16.9238 14.0723C16.4811 14.0723 16.1084 14.0039 15.8057 13.8672C15.5029 13.7305 15.2604 13.54 15.0781 13.2959C14.8958 13.0518 14.7656 12.762 14.6875 12.4268C14.6094 12.0915 14.5703 11.7285 14.5703 11.3379C14.5703 10.9342 14.6191 10.5843 14.7168 10.2881C14.8145 9.99186 14.9512 9.74284 15.127 9.54102C15.3027 9.33919 15.5094 9.1748 15.7471 9.04785C15.9847 8.9209 16.2419 8.82161 16.5186 8.75C16.7952 8.67839 17.0882 8.62956 17.3975 8.60352C17.7067 8.57747 18.0176 8.5612 18.3301 8.55469L19.707 8.51562V7.08008C19.707 6.80664 19.6842 6.55762 19.6387 6.33301C19.5931 6.1084 19.5166 5.91471 19.4092 5.75195C19.3018 5.58919 19.1569 5.46224 18.9746 5.37109C18.7923 5.27995 18.5645 5.23438 18.291 5.23438C17.9785 5.23438 17.6628 5.27669 17.3438 5.36133C17.0247 5.44596 16.7448 5.55664 16.5039 5.69336L16.1719 6.83594H15.625V4.83398C16.0482 4.74284 16.486 4.66309 16.9385 4.59473C17.391 4.52637 17.8809 4.49219 18.4082 4.49219ZM19.707 9.19922L18.4277 9.23828C18.0436 9.2513 17.7116 9.28874 17.4316 9.35059C17.1517 9.41243 16.9206 9.51823 16.7383 9.66797C16.556 9.81771 16.4193 10.0228 16.3281 10.2832C16.237 10.5436 16.1914 10.8757 16.1914 11.2793C16.1914 12.4251 16.6569 12.998 17.5879 12.998C18.0306 12.998 18.4131 12.9476 18.7354 12.8467C19.0576 12.7458 19.3815 12.6172 19.707 12.4609V9.19922ZM26.0059 14.0723C25.3809 14.0723 24.9137 13.8867 24.6045 13.5156C24.2952 13.1445 24.1406 12.6237 24.1406 11.9531V5.51758H22.9395V5.07812L24.1602 4.69727L25.1465 2.61719H25.7617V4.69727H27.8613V5.51758H25.7617V11.7773C25.7617 12.2005 25.8577 12.5195 26.0498 12.7344C26.2419 12.9492 26.4941 13.0566 26.8066 13.0566C27.0475 13.0566 27.2868 13.0404 27.5244 13.0078C27.762 12.9753 27.9818 12.9395 28.1836 12.9004V13.5352C28.0859 13.6003 27.9574 13.6654 27.7979 13.7305C27.6383 13.7956 27.4626 13.8525 27.2705 13.9014C27.0785 13.9502 26.875 13.9909 26.6602 14.0234C26.4453 14.056 26.2272 14.0723 26.0059 14.0723ZM31.3574 11.2598C31.3574 11.8001 31.4795 12.2152 31.7236 12.5049C31.9678 12.7946 32.3665 12.9395 32.9199 12.9395C33.2845 12.9395 33.6621 12.915 34.0527 12.8662C34.4434 12.8174 34.821 12.7409 35.1855 12.6367V5.38086L33.7988 5.13672V4.69727H36.7969V13.1934L37.959 13.4375V13.877H35.2832L35.2051 13.1348C35.0163 13.2389 34.7917 13.3464 34.5312 13.457C34.2708 13.5677 33.999 13.6686 33.7158 13.7598C33.4326 13.8509 33.1478 13.9258 32.8613 13.9844C32.5749 14.043 32.3145 14.0723 32.0801 14.0723C31.7285 14.0723 31.4095 14.0234 31.123 13.9258C30.8366 13.8281 30.5908 13.6719 30.3857 13.457C30.1807 13.2422 30.0212 12.9639 29.9072 12.6221C29.7933 12.2803 29.7363 11.8652 29.7363 11.377V5.38086L28.5645 5.13672V4.69727H31.3574V11.2598ZM44.7852 4.45312V6.93359H44.3652L43.7988 5.85938C43.6165 5.85938 43.4212 5.8724 43.2129 5.89844C43.0046 5.92448 42.7962 5.95866 42.5879 6.00098C42.3796 6.04329 42.1794 6.09375 41.9873 6.15234C41.7952 6.21094 41.6276 6.27279 41.4844 6.33789V13.1934L43.0566 13.4375V13.877H38.7012V13.4375L39.8633 13.1934V5.38086L38.7012 5.13672V4.69727H41.377L41.4648 5.83984C41.6146 5.71615 41.8197 5.57454 42.0801 5.41504C42.3405 5.25553 42.6221 5.10417 42.9248 4.96094C43.2275 4.81771 43.5303 4.69727 43.833 4.59961C44.1357 4.50195 44.4043 4.45312 44.6387 4.45312H44.7852ZM49.502 4.49219C49.9186 4.49219 50.306 4.53125 50.6641 4.60938C51.0221 4.6875 51.3314 4.82096 51.5918 5.00977C51.8522 5.19857 52.0557 5.4541 52.2021 5.77637C52.3486 6.09863 52.4219 6.50391 52.4219 6.99219V13.1934L53.5645 13.4375V13.877H51.0449L50.8594 12.959C50.7617 13.0566 50.6299 13.1706 50.4639 13.3008C50.2979 13.431 50.0977 13.5531 49.8633 13.667C49.6289 13.7809 49.3571 13.877 49.0479 13.9551C48.7386 14.0332 48.3952 14.0723 48.0176 14.0723C47.5749 14.0723 47.2021 14.0039 46.8994 13.8672C46.5967 13.7305 46.3542 13.54 46.1719 13.2959C45.9896 13.0518 45.8594 12.762 45.7812 12.4268C45.7031 12.0915 45.6641 11.7285 45.6641 11.3379C45.6641 10.9342 45.7129 10.5843 45.8105 10.2881C45.9082 9.99186 46.0449 9.74284 46.2207 9.54102C46.3965 9.33919 46.6032 9.1748 46.8408 9.04785C47.0785 8.9209 47.3356 8.82161 47.6123 8.75C47.889 8.67839 48.182 8.62956 48.4912 8.60352C48.8005 8.57747 49.1113 8.5612 49.4238 8.55469L50.8008 8.51562V7.08008C50.8008 6.80664 50.778 6.55762 50.7324 6.33301C50.6868 6.1084 50.6104 5.91471 50.5029 5.75195C50.3955 5.58919 50.2507 5.46224 50.0684 5.37109C49.8861 5.27995 49.6582 5.23438 49.3848 5.23438C49.0723 5.23438 48.7565 5.27669 48.4375 5.36133C48.1185 5.44596 47.8385 5.55664 47.5977 5.69336L47.2656 6.83594H46.7188V4.83398C47.1419 4.74284 47.5798 4.66309 48.0322 4.59473C48.4847 4.52637 48.9746 4.49219 49.502 4.49219ZM50.8008 9.19922L49.5215 9.23828C49.1374 9.2513 48.8053 9.28874 48.5254 9.35059C48.2454 9.41243 48.0143 9.51823 47.832 9.66797C47.6497 9.81771 47.513 10.0228 47.4219 10.2832C47.3307 10.5436 47.2852 10.8757 47.2852 11.2793C47.2852 12.4251 47.7507 12.998 48.6816 12.998C49.1243 12.998 49.5068 12.9476 49.8291 12.8467C50.1514 12.7458 50.4753 12.6172 50.8008 12.4609V9.19922ZM63.1934 3.95508C63.1934 3.57096 63.1364 3.23568 63.0225 2.94922C62.9085 2.66276 62.7246 2.4235 62.4707 2.23145C62.2168 2.03939 61.888 1.89616 61.4844 1.80176C61.0807 1.70736 60.5859 1.66016 60 1.66016H57.9785V6.61133H60.1172C60.7227 6.61133 61.224 6.54785 61.6211 6.4209C62.0182 6.29395 62.3324 6.11491 62.5635 5.88379C62.7946 5.65267 62.9574 5.37435 63.0518 5.04883C63.1462 4.72331 63.1934 4.35872 63.1934 3.95508ZM64.1797 10.1465C64.1797 9.69076 64.1064 9.29688 63.96 8.96484C63.8135 8.63281 63.5856 8.35775 63.2764 8.13965C62.9671 7.92155 62.5684 7.75879 62.0801 7.65137C61.5918 7.54395 61.0059 7.49023 60.3223 7.49023H57.9785V12.998C58.278 13.0111 58.5905 13.0208 58.916 13.0273C59.196 13.0404 59.5052 13.0485 59.8438 13.0518C60.1823 13.055 60.5176 13.0566 60.8496 13.0566C61.4616 13.0566 61.9792 12.9883 62.4023 12.8516C62.8255 12.7148 63.1689 12.5212 63.4326 12.2705C63.6963 12.0199 63.8867 11.7155 64.0039 11.3574C64.1211 10.9993 64.1797 10.5957 64.1797 10.1465ZM54.4141 13.877V13.3594L56.0938 13.0957V1.55273L54.4141 1.29883V0.78125H60.4004C61.3184 0.78125 62.0833 0.851237 62.6953 0.991211C63.3073 1.13118 63.7988 1.33464 64.1699 1.60156C64.541 1.86849 64.8047 2.19238 64.9609 2.57324C65.1172 2.9541 65.1953 3.38216 65.1953 3.85742C65.1953 4.26758 65.1286 4.64193 64.9951 4.98047C64.8617 5.31901 64.6761 5.61686 64.4385 5.87402C64.2008 6.13118 63.916 6.34603 63.584 6.51855C63.252 6.69108 62.8906 6.81966 62.5 6.9043C63.0664 6.96289 63.5791 7.07682 64.0381 7.24609C64.4971 7.41536 64.8861 7.63509 65.2051 7.90527C65.5241 8.17546 65.7699 8.49609 65.9424 8.86719C66.1149 9.23828 66.2012 9.65169 66.2012 10.1074C66.2012 10.6738 66.1051 11.193 65.9131 11.665C65.721 12.137 65.4199 12.5407 65.0098 12.876C64.5996 13.2113 64.0723 13.4717 63.4277 13.6572C62.7832 13.8428 62.0052 13.9355 61.0938 13.9355C60.3646 13.9355 59.6387 13.9258 58.916 13.9062C58.1934 13.8867 57.526 13.877 56.9141 13.877H54.4141ZM70.7617 13.1934L72.334 13.4375V13.877H67.5781V13.4375L69.1406 13.1934V0.673828L67.5781 0.439453V0H70.7617V13.1934ZM81.9727 9.23828C81.9727 10.7943 81.6243 11.9889 80.9277 12.8223C80.2311 13.6556 79.1471 14.0723 77.6758 14.0723C76.2956 14.0723 75.2539 13.6589 74.5508 12.832C73.8477 12.0052 73.4961 10.8073 73.4961 9.23828C73.4961 7.6888 73.8477 6.50391 74.5508 5.68359C75.2539 4.86328 76.3216 4.45312 77.7539 4.45312C79.1471 4.45312 80.1986 4.85514 80.9082 5.65918C81.6178 6.46322 81.9727 7.65625 81.9727 9.23828ZM80.2148 9.23828C80.2148 8.60677 80.1725 8.04199 80.0879 7.54395C80.0033 7.0459 79.8617 6.62598 79.6631 6.28418C79.4645 5.94238 79.2025 5.68197 78.877 5.50293C78.5514 5.32389 78.151 5.23438 77.6758 5.23438C77.194 5.23438 76.7969 5.32389 76.4844 5.50293C76.1719 5.68197 75.9245 5.94238 75.7422 6.28418C75.5599 6.62598 75.4329 7.0459 75.3613 7.54395C75.2897 8.04199 75.2539 8.60677 75.2539 9.23828C75.2539 9.8763 75.2897 10.446 75.3613 10.9473C75.4329 11.4486 75.5599 11.8734 75.7422 12.2217C75.9245 12.57 76.1719 12.8369 76.4844 13.0225C76.7969 13.208 77.194 13.3008 77.6758 13.3008C78.151 13.3008 78.5514 13.208 78.877 13.0225C79.2025 12.8369 79.4645 12.57 79.6631 12.2217C79.8617 11.8734 80.0033 11.4486 80.0879 10.9473C80.1725 10.446 80.2148 9.8763 80.2148 9.23828ZM91.9727 9.23828C91.9727 10.7943 91.6243 11.9889 90.9277 12.8223C90.2311 13.6556 89.1471 14.0723 87.6758 14.0723C86.2956 14.0723 85.2539 13.6589 84.5508 12.832C83.8477 12.0052 83.4961 10.8073 83.4961 9.23828C83.4961 7.6888 83.8477 6.50391 84.5508 5.68359C85.2539 4.86328 86.3216 4.45312 87.7539 4.45312C89.1471 4.45312 90.1986 4.85514 90.9082 5.65918C91.6178 6.46322 91.9727 7.65625 91.9727 9.23828ZM90.2148 9.23828C90.2148 8.60677 90.1725 8.04199 90.0879 7.54395C90.0033 7.0459 89.8617 6.62598 89.6631 6.28418C89.4645 5.94238 89.2025 5.68197 88.877 5.50293C88.5514 5.32389 88.151 5.23438 87.6758 5.23438C87.194 5.23438 86.7969 5.32389 86.4844 5.50293C86.1719 5.68197 85.9245 5.94238 85.7422 6.28418C85.5599 6.62598 85.4329 7.0459 85.3613 7.54395C85.2897 8.04199 85.2539 8.60677 85.2539 9.23828C85.2539 9.8763 85.2897 10.446 85.3613 10.9473C85.4329 11.4486 85.5599 11.8734 85.7422 12.2217C85.9245 12.57 86.1719 12.8369 86.4844 13.0225C86.7969 13.208 87.194 13.3008 87.6758 13.3008C88.151 13.3008 88.5514 13.208 88.877 13.0225C89.2025 12.8369 89.4645 12.57 89.6631 12.2217C89.8617 11.8734 90.0033 11.4486 90.0879 10.9473C90.1725 10.446 90.2148 9.8763 90.2148 9.23828ZM95.918 5.43945C96.1003 5.33529 96.3167 5.22461 96.5674 5.10742C96.818 4.99023 97.0768 4.88281 97.3438 4.78516C97.6107 4.6875 97.8809 4.60775 98.1543 4.5459C98.4277 4.48405 98.6816 4.45312 98.916 4.45312C99.3652 4.45312 99.7803 4.53776 100.161 4.70703C100.542 4.8763 100.827 5.14648 101.016 5.51758C101.224 5.40039 101.475 5.27832 101.768 5.15137C102.061 5.02441 102.365 4.90885 102.681 4.80469C102.996 4.70052 103.309 4.61589 103.618 4.55078C103.927 4.48568 104.206 4.45312 104.453 4.45312C104.805 4.45312 105.124 4.50195 105.41 4.59961C105.697 4.69727 105.942 4.85352 106.147 5.06836C106.353 5.2832 106.512 5.56315 106.626 5.9082C106.74 6.25326 106.797 6.66992 106.797 7.1582V13.1934L107.979 13.4375V13.877H103.809V13.4375L105.176 13.1934V7.33398C105.176 6.79362 105.054 6.37858 104.81 6.08887C104.565 5.79915 104.167 5.6543 103.613 5.6543C103.444 5.6543 103.247 5.66732 103.022 5.69336C102.798 5.7194 102.573 5.7487 102.349 5.78125C102.124 5.8138 101.909 5.85124 101.704 5.89355C101.499 5.93587 101.328 5.97005 101.191 5.99609C101.302 6.34766 101.357 6.73503 101.357 7.1582V13.1934L102.734 13.4375V13.877H98.3789V13.4375L99.7363 13.1934V7.33398C99.7363 6.79362 99.598 6.37858 99.3213 6.08887C99.0446 5.79915 98.6296 5.6543 98.0762 5.6543C97.8939 5.6543 97.7035 5.66406 97.5049 5.68359C97.3063 5.70312 97.111 5.72591 96.9189 5.75195C96.7269 5.77799 96.5446 5.80892 96.3721 5.84473C96.1995 5.88053 96.0547 5.91146 95.9375 5.9375V13.1934L97.3145 13.4375V13.877H93.1543V13.4375L94.3164 13.1934V5.38086L93.1543 5.13672V4.69727H95.8398L95.918 5.43945Z",
                fill: "#064E3B"
              })
            ]),
            createBaseVNode("p", null, "Crafting botanical excellence for the modern soul. Pure ingredients, ethical processes, lasting radiance.")
          ], -1)),
          createBaseVNode("div", _hoisted_22, [
            _cache[34] || (_cache[34] = createBaseVNode("h5", { class: "links-title" }, "Shop", -1)),
            createBaseVNode("nav", null, [
              createVNode(_component_router_link, { to: "/products" }, {
                default: withCtx(() => [..._cache[30] || (_cache[30] = [
                  createTextVNode("Shop All", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/product-category/best-sellers" }, {
                default: withCtx(() => [..._cache[31] || (_cache[31] = [
                  createTextVNode("Best Sellers", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/product-category/new-arrival" }, {
                default: withCtx(() => [..._cache[32] || (_cache[32] = [
                  createTextVNode("New Arrival", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/gift-card" }, {
                default: withCtx(() => [..._cache[33] || (_cache[33] = [
                  createTextVNode("Gift Card", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_23, [
            _cache[37] || (_cache[37] = createBaseVNode("h5", { class: "links-title" }, "Experience", -1)),
            createBaseVNode("nav", null, [
              createVNode(_component_router_link, { to: "/sustainability" }, {
                default: withCtx(() => [..._cache[35] || (_cache[35] = [
                  createTextVNode("Sustainability", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/our-story" }, {
                default: withCtx(() => [..._cache[36] || (_cache[36] = [
                  createTextVNode("Our Story", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_24, [
            _cache[42] || (_cache[42] = createBaseVNode("h5", { class: "links-title" }, "Support", -1)),
            createBaseVNode("nav", null, [
              createVNode(_component_router_link, { to: "/shipping-and-returns" }, {
                default: withCtx(() => [..._cache[38] || (_cache[38] = [
                  createTextVNode("Shipping & Returns", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/privacy-policy" }, {
                default: withCtx(() => [..._cache[39] || (_cache[39] = [
                  createTextVNode("Privacy Policy", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/terms-of-service" }, {
                default: withCtx(() => [..._cache[40] || (_cache[40] = [
                  createTextVNode("Terms of Service", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/contact-us" }, {
                default: withCtx(() => [..._cache[41] || (_cache[41] = [
                  createTextVNode("Contact Us", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          _cache[44] || (_cache[44] = createBaseVNode("div", { class: "footer-bottom" }, [
            createBaseVNode("span", null, "All right reserved")
          ], -1))
        ])
      ]),
      $setup.uiHydrated ? (openBlock(), createBlock($setup["CookieBanner"], { key: 5 })) : createCommentVNode("", true)
    ]),
    _: 1
  }));
}
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export {
  MainLayout as default
};


//# sourceMappingURL=data:application/json;base64,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QUpKSyxZQUF3RSwwQkFBM0QsSUFBRywyQkFBdUI7QUFBQSxpQ0FBQyxNQUFrQjtBQUFBLGtDQUFsQixzQkFBa0I7QUFBQTs7O2NBQzFEQSxZQUE4RCwwQkFBakQsSUFBRyxxQkFBaUI7QUFBQSxpQ0FBQyxNQUFjO0FBQUEsa0NBQWQsa0JBQWM7QUFBQTs7O2NBQ2hEQSxZQUFrRSwwQkFBckQsSUFBRyx1QkFBbUI7QUFBQSxpQ0FBQyxNQUFnQjtBQUFBLGtDQUFoQixvQkFBZ0I7QUFBQTs7O2NBQ3BEQSxZQUFzRCwwQkFBekMsSUFBRyxpQkFBYTtBQUFBLGlDQUFDLE1BQVU7QUFBQSxrQ0FBVixjQUFVO0FBQUE7Ozs7O3NDQUc1Q0wsZ0JBRU0sU0FGRCxPQUFNLG1CQUFlO0FBQUEsWUFDeEJBLGdCQUErQixjQUF6QixvQkFBa0I7QUFBQTs7O01BS1Ysa0NBQXBCRCxZQUFrQyIsIm5hbWVzIjpbIm5vZGUiLCJfaG9pc3RlZF8zIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX29wZW5CbG9jayIsIl9GcmFnbWVudCIsIl9jcmVhdGVWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfd2l0aE1vZGlmaWVycyIsIl9ob2lzdGVkXzIiLCJfVHJhbnNpdGlvbiIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiTG9hZGluZ0JhciIsImh5ZHJhdGUiXSwiaWdub3JlTGlzdCI6WzAsMSwyLDMsNiw3XSwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JhZGdlL1FCYWRnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbm8tc3NyL1FOb1Nzci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2Nyb2xsLWFyZWEvU2Nyb2xsQXJlYUNvbnRyb2xzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zY3JvbGwtYXJlYS9RU2Nyb2xsQXJlYS5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1dpc2hsaXN0RHJhd2VyLnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Nvb2tpZUJhbm5lci52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwYWNlL1FTcGFjZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYmFyL1FCYXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BaUFzc2lzdGFudC52dWUiLCIuLi8uLi8uLi9zcmMvYm9vdC9wdXNoLm5hdGl2ZS5qcyIsIi4uLy4uLy4uL3NyYy9ib290L2xvYWRpbmctYmFyLmpzIiwiLi4vLi4vLi4vc3JjL2Jvb3QvYXV0aC1leHBpcmVkLmpzIiwiLi4vLi4vLi4vc3JjL2xheW91dHMvTWFpbkxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmNvbnN0IGFsaWduVmFsdWVzID0gWyAndG9wJywgJ21pZGRsZScsICdib3R0b20nIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCYWRnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRleHRDb2xvcjogU3RyaW5nLFxuXG4gICAgZmxvYXRpbmc6IEJvb2xlYW4sXG4gICAgdHJhbnNwYXJlbnQ6IEJvb2xlYW4sXG4gICAgbXVsdGlMaW5lOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcblxuICAgIGxhYmVsOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IGFsaWduVmFsdWVzLmluY2x1ZGVzKHYpXG4gICAgfVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gcHJvcHMuYWxpZ24gIT09IHZvaWQgMFxuICAgICAgICA/IHsgdmVydGljYWxBbGlnbjogcHJvcHMuYWxpZ24gfVxuICAgICAgICA6IG51bGxcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBwcm9wcy5vdXRsaW5lID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29sb3IgfHwgcHJvcHMudGV4dENvbG9yXG4gICAgICAgIDogcHJvcHMudGV4dENvbG9yXG5cbiAgICAgIHJldHVybiAncS1iYWRnZSBmbGV4IGlubGluZSBpdGVtcy1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgKyBgIHEtYmFkZ2UtLSR7IHByb3BzLm11bHRpTGluZSA9PT0gdHJ1ZSA/ICdtdWx0aScgOiAnc2luZ2xlJyB9LWxpbmVgXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgICA/ICcgcS1iYWRnZS0tb3V0bGluZSdcbiAgICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgICApXG4gICAgICAgICsgKHRleHQgIT09IHZvaWQgMCA/IGAgdGV4dC0keyB0ZXh0IH1gIDogJycpXG4gICAgICAgICsgKHByb3BzLmZsb2F0aW5nID09PSB0cnVlID8gJyBxLWJhZGdlLS1mbG9hdGluZycgOiAnJylcbiAgICAgICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcS1iYWRnZS0tcm91bmRlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMudHJhbnNwYXJlbnQgPT09IHRydWUgPyAnIHEtYmFkZ2UtLXRyYW5zcGFyZW50JyA6ICcnKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICByb2xlOiAnc3RhdHVzJyxcbiAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWxcbiAgICB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgPyBbIHByb3BzLmxhYmVsIF0gOiBbXSkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSHlkcmF0aW9uIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1oeWRyYXRpb24vdXNlLWh5ZHJhdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRTm9Tc3InLFxuXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBwbGFjZWhvbGRlcjogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGlzSHlkcmF0ZWQgfSA9IHVzZUh5ZHJhdGlvbigpXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGlzSHlkcmF0ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGhTbG90KHNsb3RzLmRlZmF1bHQpXG4gICAgICAgIHJldHVybiBub2RlID09PSB2b2lkIDBcbiAgICAgICAgICA/IG5vZGVcbiAgICAgICAgICA6IChub2RlLmxlbmd0aCA+IDEgPyBoKHByb3BzLnRhZywge30sIG5vZGUpIDogbm9kZVsgMCBdKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogJ3Etbm8tc3NyLXBsYWNlaG9sZGVyJ1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub2RlID0gaFNsb3Qoc2xvdHMucGxhY2Vob2xkZXIpXG4gICAgICBpZiAobm9kZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBub2RlLmxlbmd0aCA+IDFcbiAgICAgICAgICA/IGgocHJvcHMudGFnLCBkYXRhLCBub2RlKVxuICAgICAgICAgIDogbm9kZVsgMCBdXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5wbGFjZWhvbGRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBoKHByb3BzLnRhZywgZGF0YSwgcHJvcHMucGxhY2Vob2xkZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgd2l0aERpcmVjdGl2ZXMgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuLyoqXG4gKiBXZSBhcmUgdXNpbmcgYSBzdWItY29tcG9uZW50IHRvIGF2b2lkIHVubmVjZXNzYXJ5IHJlLXJlbmRlcnNcbiAqIG9mIHRoZSBRU2Nyb2xsQXJlYSBjb250ZW50IHdoZW4gdGhlIHNjcm9sbGJhcnMgYXJlIGludGVyYWN0ZWQgd2l0aC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgcHJvcHM6IFtcbiAgICAnc3RvcmUnLFxuICAgICdiYXJTdHlsZScsXG4gICAgJ3ZlcnRpY2FsQmFyU3R5bGUnLFxuICAgICdob3Jpem9udGFsQmFyU3R5bGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgcmV0dXJuICgpID0+IChbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBwcm9wcy5zdG9yZS5zY3JvbGwudmVydGljYWwuYmFyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBbIHByb3BzLmJhclN0eWxlLCBwcm9wcy52ZXJ0aWNhbEJhclN0eWxlIF0sXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgb25Nb3VzZWRvd246IHByb3BzLnN0b3JlLm9uVmVydGljYWxNb3VzZWRvd25cbiAgICAgIH0pLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBwcm9wcy5zdG9yZS5zY3JvbGwuaG9yaXpvbnRhbC5iYXJDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IFsgcHJvcHMuYmFyU3R5bGUsIHByb3BzLmhvcml6b250YWxCYXJTdHlsZSBdLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIG9uTW91c2Vkb3duOiBwcm9wcy5zdG9yZS5vbkhvcml6b250YWxNb3VzZWRvd25cbiAgICAgIH0pLFxuXG4gICAgICB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogcHJvcHMuc3RvcmUuc2Nyb2xsLnZlcnRpY2FsLnJlZixcbiAgICAgICAgICBjbGFzczogcHJvcHMuc3RvcmUuc2Nyb2xsLnZlcnRpY2FsLnRodW1iQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnN0b3JlLnNjcm9sbC52ZXJ0aWNhbC5zdHlsZS52YWx1ZSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSksXG4gICAgICAgIHByb3BzLnN0b3JlLnRodW1iVmVydERpclxuICAgICAgKSxcblxuICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHByb3BzLnN0b3JlLnNjcm9sbC5ob3Jpem9udGFsLnJlZixcbiAgICAgICAgICBjbGFzczogcHJvcHMuc3RvcmUuc2Nyb2xsLmhvcml6b250YWwudGh1bWJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuc3RvcmUuc2Nyb2xsLmhvcml6b250YWwuc3R5bGUudmFsdWUsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0pLFxuICAgICAgICBwcm9wcy5zdG9yZS50aHVtYkhvcml6RGlyXG4gICAgICApXG4gICAgXSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5cbmltcG9ydCBTY3JvbGxBcmVhQ29udHJvbHMgZnJvbSAnLi9TY3JvbGxBcmVhQ29udHJvbHMuanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5pbXBvcnQgUVNjcm9sbE9ic2VydmVyIGZyb20gJy4uL3Njcm9sbC1vYnNlcnZlci9RU2Nyb2xsT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCBUb3VjaFBhbiBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RvdWNoLXBhbi9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuLi8uLi91dGlscy9zY3JvbGwvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS9kZWJvdW5jZS5qcydcblxuY29uc3QgYXhpc0xpc3QgPSBbICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJyBdXG5jb25zdCBkaXJQcm9wcyA9IHtcbiAgdmVydGljYWw6IHsgb2Zmc2V0OiAnb2Zmc2V0WScsIHNjcm9sbDogJ3Njcm9sbFRvcCcsIGRpcjogJ2Rvd24nLCBkaXN0OiAneScgfSxcbiAgaG9yaXpvbnRhbDogeyBvZmZzZXQ6ICdvZmZzZXRYJywgc2Nyb2xsOiAnc2Nyb2xsTGVmdCcsIGRpcjogJ3JpZ2h0JywgZGlzdDogJ3gnIH1cbn1cbmNvbnN0IHBhbk9wdHMgPSB7XG4gIHByZXZlbnQ6IHRydWUsXG4gIG1vdXNlOiB0cnVlLFxuICBtb3VzZUFsbERpcjogdHJ1ZVxufVxuXG5jb25zdCBnZXRNaW5UaHVtYlNpemUgPSBzaXplID0+IChzaXplID49IDI1MCA/IDUwIDogTWF0aC5jZWlsKHNpemUgLyA1KSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTY3JvbGxBcmVhJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHRodW1iU3R5bGU6IE9iamVjdCxcbiAgICB2ZXJ0aWNhbFRodW1iU3R5bGU6IE9iamVjdCxcbiAgICBob3Jpem9udGFsVGh1bWJTdHlsZTogT2JqZWN0LFxuXG4gICAgYmFyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgdmVydGljYWxCYXJTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBob3Jpem9udGFsQmFyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICB2ZXJ0aWNhbE9mZnNldDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBbIDAsIDAgXVxuICAgIH0sXG4gICAgaG9yaXpvbnRhbE9mZnNldDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiBbIDAsIDAgXVxuICAgIH0sXG5cbiAgICBjb250ZW50U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgY29udGVudEFjdGl2ZVN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgZGVsYXk6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuXG4gICAgdmlzaWJsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIG9uU2Nyb2xsOiBGdW5jdGlvblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgLy8gc3RhdGUgbWFuYWdlbWVudFxuICAgIGNvbnN0IHRlbXBTaG93aW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IHBhbm5pbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaG92ZXIgPSByZWYoZmFsc2UpXG5cbiAgICAvLyBvdGhlci4uLlxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHtcbiAgICAgIHZlcnRpY2FsOiByZWYoMCksXG4gICAgICBob3Jpem9udGFsOiByZWYoMClcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGwgPSB7XG4gICAgICB2ZXJ0aWNhbDoge1xuICAgICAgICByZWY6IHJlZihudWxsKSxcbiAgICAgICAgcG9zaXRpb246IHJlZigwKSxcbiAgICAgICAgc2l6ZTogcmVmKDApXG4gICAgICB9LFxuXG4gICAgICBob3Jpem9udGFsOiB7XG4gICAgICAgIHJlZjogcmVmKG51bGwpLFxuICAgICAgICBwb3NpdGlvbjogcmVmKDApLFxuICAgICAgICBzaXplOiByZWYoMClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCBwYW5SZWZQb3NcblxuICAgIGNvbnN0IHRhcmdldFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zY3JvbGxhcmVhJ1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWEtLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgT2JqZWN0LmFzc2lnbihjb250YWluZXIsIHtcbiAgICAgIHZlcnRpY2FsSW5uZXI6IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICAgY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlIC0gcHJvcHMudmVydGljYWxPZmZzZXRbIDAgXSAtIHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAxIF1cbiAgICAgICkpLFxuXG4gICAgICBob3Jpem9udGFsSW5uZXI6IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICAgY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgLSBwcm9wcy5ob3Jpem9udGFsT2Zmc2V0WyAwIF0gLSBwcm9wcy5ob3Jpem9udGFsT2Zmc2V0WyAxIF1cbiAgICAgICkpXG4gICAgfSlcblxuICAgIHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZGlmZiA9IHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlIC0gY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlXG4gICAgICBpZiAoZGlmZiA8PSAwKSB7IHJldHVybiAwIH1cbiAgICAgIGNvbnN0IHAgPSBiZXR3ZWVuKHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSAvIGRpZmYsIDAsIDEpXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChwICogMTAwMDApIC8gMTAwMDBcbiAgICB9KVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIChcbiAgICAgICAgKHByb3BzLnZpc2libGUgPT09IG51bGwgPyBob3Zlci52YWx1ZSA6IHByb3BzLnZpc2libGUpICE9PSB0cnVlXG4gICAgICAgICYmIHRlbXBTaG93aW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwYW5uaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB8fCBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSA8PSBjb250YWluZXIudmVydGljYWwudmFsdWUgKyAxXG4gICAgKSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJTdGFydCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAwIF1cbiAgICAgICsgc2Nyb2xsLnZlcnRpY2FsLnBlcmNlbnRhZ2UudmFsdWUgKiAoY29udGFpbmVyLnZlcnRpY2FsSW5uZXIudmFsdWUgLSBzY3JvbGwudmVydGljYWwudGh1bWJTaXplLnZhbHVlKVxuICAgICkpXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBNYXRoLnJvdW5kKFxuICAgICAgICBiZXR3ZWVuKFxuICAgICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlICogY29udGFpbmVyLnZlcnRpY2FsSW5uZXIudmFsdWUgLyBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSxcbiAgICAgICAgICBnZXRNaW5UaHVtYlNpemUoY29udGFpbmVyLnZlcnRpY2FsSW5uZXIudmFsdWUpLFxuICAgICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIC4uLnByb3BzLnRodW1iU3R5bGUsXG4gICAgICAuLi5wcm9wcy52ZXJ0aWNhbFRodW1iU3R5bGUsXG4gICAgICB0b3A6IGAkeyBzY3JvbGwudmVydGljYWwudGh1bWJTdGFydC52YWx1ZSB9cHhgLFxuICAgICAgaGVpZ2h0OiBgJHsgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZS52YWx1ZSB9cHhgLFxuICAgICAgcmlnaHQ6IGAkeyBwcm9wcy5ob3Jpem9udGFsT2Zmc2V0WyAxIF0gfXB4YFxuICAgIH0pKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYkNsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fdGh1bWIgcS1zY3JvbGxhcmVhX190aHVtYi0tdiBhYnNvbHV0ZS1yaWdodCdcbiAgICAgICsgKHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX190aHVtYi0taW52aXNpYmxlJyA6ICcnKVxuICAgICkpXG4gICAgc2Nyb2xsLnZlcnRpY2FsLmJhckNsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fYmFyIHEtc2Nyb2xsYXJlYV9fYmFyLS12IGFic29sdXRlLXJpZ2h0J1xuICAgICAgKyAoc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX2Jhci0taW52aXNpYmxlJyA6ICcnKVxuICAgICkpXG5cbiAgICBzY3JvbGwuaG9yaXpvbnRhbC5wZXJjZW50YWdlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgZGlmZiA9IHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgLSBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZVxuICAgICAgaWYgKGRpZmYgPD0gMCkgeyByZXR1cm4gMCB9XG4gICAgICBjb25zdCBwID0gYmV0d2VlbihNYXRoLmFicyhzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZSkgLyBkaWZmLCAwLCAxKVxuICAgICAgcmV0dXJuIE1hdGgucm91bmQocCAqIDEwMDAwKSAvIDEwMDAwXG4gICAgfSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIChcbiAgICAgICAgKHByb3BzLnZpc2libGUgPT09IG51bGwgPyBob3Zlci52YWx1ZSA6IHByb3BzLnZpc2libGUpICE9PSB0cnVlXG4gICAgICAgICYmIHRlbXBTaG93aW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwYW5uaW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSB8fCBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlIDw9IGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlICsgMVxuICAgICkpXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTdGFydCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmhvcml6b250YWxPZmZzZXRbIDAgXVxuICAgICAgKyBzY3JvbGwuaG9yaXpvbnRhbC5wZXJjZW50YWdlLnZhbHVlICogKGNvbnRhaW5lci5ob3Jpem9udGFsSW5uZXIudmFsdWUgLSBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYlNpemUudmFsdWUpXG4gICAgKSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYlNpemUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgTWF0aC5yb3VuZChcbiAgICAgICAgYmV0d2VlbihcbiAgICAgICAgICBjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlICogY29udGFpbmVyLmhvcml6b250YWxJbm5lci52YWx1ZSAvIHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUsXG4gICAgICAgICAgZ2V0TWluVGh1bWJTaXplKGNvbnRhaW5lci5ob3Jpem9udGFsSW5uZXIudmFsdWUpLFxuICAgICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsSW5uZXIudmFsdWVcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC5zdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5wcm9wcy50aHVtYlN0eWxlLFxuICAgICAgLi4ucHJvcHMuaG9yaXpvbnRhbFRodW1iU3R5bGUsXG4gICAgICBbIHByb3h5LiRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdOiBgJHsgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTdGFydC52YWx1ZSB9cHhgLFxuICAgICAgd2lkdGg6IGAkeyBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYlNpemUudmFsdWUgfXB4YCxcbiAgICAgIGJvdHRvbTogYCR7IHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAxIF0gfXB4YFxuICAgIH0pKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAncS1zY3JvbGxhcmVhX190aHVtYiBxLXNjcm9sbGFyZWFfX3RodW1iLS1oIGFic29sdXRlLWJvdHRvbSdcbiAgICAgICsgKHNjcm9sbC5ob3Jpem9udGFsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlID8gJyBxLXNjcm9sbGFyZWFfX3RodW1iLS1pbnZpc2libGUnIDogJycpXG4gICAgKSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC5iYXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICdxLXNjcm9sbGFyZWFfX2JhciBxLXNjcm9sbGFyZWFfX2Jhci0taCBhYnNvbHV0ZS1ib3R0b20nXG4gICAgICArIChzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX19iYXItLWludmlzaWJsZScgOiAnJylcbiAgICApKVxuXG4gICAgY29uc3QgbWFpblN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlICYmIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iSGlkZGVuLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuY29udGVudFN0eWxlXG4gICAgICAgIDogcHJvcHMuY29udGVudEFjdGl2ZVN0eWxlXG4gICAgKSlcblxuICAgIGZ1bmN0aW9uIGdldFNjcm9sbCAoKSB7XG4gICAgICBjb25zdCBpbmZvID0ge31cblxuICAgICAgYXhpc0xpc3QuZm9yRWFjaChheGlzID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHNjcm9sbFsgYXhpcyBdXG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5mbywge1xuICAgICAgICAgIFsgYXhpcyArICdQb3NpdGlvbicgXTogZGF0YS5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgICBbIGF4aXMgKyAnUGVyY2VudGFnZScgXTogZGF0YS5wZXJjZW50YWdlLnZhbHVlLFxuICAgICAgICAgIFsgYXhpcyArICdTaXplJyBdOiBkYXRhLnNpemUudmFsdWUsXG4gICAgICAgICAgWyBheGlzICsgJ0NvbnRhaW5lclNpemUnIF06IGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlLFxuICAgICAgICAgIFsgYXhpcyArICdDb250YWluZXJJbm5lclNpemUnIF06IGNvbnRhaW5lclsgYXhpcyArICdJbm5lcicgXS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICAvLyB3ZSBoYXZlIGxvdHMgb2YgbGlzdGVuZXJzLCBzb1xuICAgIC8vIGVuc3VyZSB3ZSdyZSBub3QgZW1pdHRpbmcgc2FtZSBpbmZvXG4gICAgLy8gbXVsdGlwbGUgdGltZXNcbiAgICBjb25zdCBlbWl0U2Nyb2xsID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGdldFNjcm9sbCgpXG4gICAgICBpbmZvLnJlZiA9IHByb3h5XG4gICAgICBlbWl0KCdzY3JvbGwnLCBpbmZvKVxuICAgIH0sIDApXG5cbiAgICBmdW5jdGlvbiBsb2NhbFNldFNjcm9sbFBvc2l0aW9uIChheGlzLCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gICAgICBpZiAoYXhpc0xpc3QuaW5jbHVkZXMoYXhpcykgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tRU2Nyb2xsQXJlYV06IHdyb25nIGZpcnN0IHBhcmFtIG9mIHNldFNjcm9sbFBvc2l0aW9uICh2ZXJ0aWNhbC9ob3Jpem9udGFsKScpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBmbiA9IGF4aXMgPT09ICd2ZXJ0aWNhbCdcbiAgICAgICAgPyBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uXG4gICAgICAgIDogc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uXG5cbiAgICAgIGZuKHRhcmdldFJlZi52YWx1ZSwgb2Zmc2V0LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXIgKHsgaGVpZ2h0LCB3aWR0aCB9KSB7XG4gICAgICBsZXQgY2hhbmdlID0gZmFsc2VcblxuICAgICAgaWYgKGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAhPT0gaGVpZ2h0KSB7XG4gICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSA9IGhlaWdodFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSAhPT0gd2lkdGgpIHtcbiAgICAgICAgY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgPSB3aWR0aFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNoYW5nZSA9PT0gdHJ1ZSAmJiBzdGFydFRpbWVyKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGwgKHsgcG9zaXRpb24gfSkge1xuICAgICAgbGV0IGNoYW5nZSA9IGZhbHNlXG5cbiAgICAgIGlmIChzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUgIT09IHBvc2l0aW9uLnRvcCkge1xuICAgICAgICBzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUgPSBwb3NpdGlvbi50b3BcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUgIT09IHBvc2l0aW9uLmxlZnQpIHtcbiAgICAgICAgc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUgPSBwb3NpdGlvbi5sZWZ0XG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgY2hhbmdlID09PSB0cnVlICYmIHN0YXJ0VGltZXIoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbFNpemUgKHsgaGVpZ2h0LCB3aWR0aCB9KSB7XG4gICAgICBpZiAoc2Nyb2xsLmhvcml6b250YWwuc2l6ZS52YWx1ZSAhPT0gd2lkdGgpIHtcbiAgICAgICAgc2Nyb2xsLmhvcml6b250YWwuc2l6ZS52YWx1ZSA9IHdpZHRoXG4gICAgICAgIHN0YXJ0VGltZXIoKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSA9IGhlaWdodFxuICAgICAgICBzdGFydFRpbWVyKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhblRodW1iIChlLCBheGlzKSB7XG4gICAgICBjb25zdCBkYXRhID0gc2Nyb2xsWyBheGlzIF1cblxuICAgICAgaWYgKGUuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoZGF0YS50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgICAgcGFuUmVmUG9zID0gZGF0YS5wb3NpdGlvbi52YWx1ZVxuICAgICAgICBwYW5uaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocGFubmluZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGUuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBwYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY29uc3QgZFByb3AgPSBkaXJQcm9wc1sgYXhpcyBdXG5cbiAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSAoXG4gICAgICAgIChkYXRhLnNpemUudmFsdWUgLSBjb250YWluZXJbIGF4aXMgXS52YWx1ZSlcbiAgICAgICAgLyAoY29udGFpbmVyWyBheGlzICsgJ0lubmVyJyBdLnZhbHVlIC0gZGF0YS50aHVtYlNpemUudmFsdWUpXG4gICAgICApXG4gICAgICBjb25zdCBkaXN0YW5jZSA9IGUuZGlzdGFuY2VbIGRQcm9wLmRpc3QgXVxuICAgICAgY29uc3QgcG9zID0gcGFuUmVmUG9zICsgKGUuZGlyZWN0aW9uID09PSBkUHJvcC5kaXIgPyAxIDogLTEpICogZGlzdGFuY2UgKiBtdWx0aXBsaWVyXG5cbiAgICAgIHNldFNjcm9sbChwb3MsIGF4aXMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWRvd24gKGV2dCwgYXhpcykge1xuICAgICAgY29uc3QgZGF0YSA9IHNjcm9sbFsgYXhpcyBdXG5cbiAgICAgIGlmIChkYXRhLnRodW1iSGlkZGVuLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gYXhpcyA9PT0gJ3ZlcnRpY2FsJ1xuICAgICAgICAgID8gcHJvcHMudmVydGljYWxPZmZzZXRbIDAgXVxuICAgICAgICAgIDogcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMCBdXG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gZXZ0WyBkaXJQcm9wc1sgYXhpcyBdLm9mZnNldCBdIC0gc3RhcnRPZmZzZXRcbiAgICAgICAgY29uc3QgdGh1bWJTdGFydCA9IGRhdGEudGh1bWJTdGFydC52YWx1ZSAtIHN0YXJ0T2Zmc2V0XG5cbiAgICAgICAgaWYgKG9mZnNldCA8IHRodW1iU3RhcnQgfHwgb2Zmc2V0ID4gdGh1bWJTdGFydCArIGRhdGEudGh1bWJTaXplLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0VGh1bWJTdGFydCA9IG9mZnNldCAtIGRhdGEudGh1bWJTaXplLnZhbHVlIC8gMlxuICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBiZXR3ZWVuKHRhcmdldFRodW1iU3RhcnQgLyAoY29udGFpbmVyWyBheGlzICsgJ0lubmVyJyBdLnZhbHVlIC0gZGF0YS50aHVtYlNpemUudmFsdWUpLCAwLCAxKVxuICAgICAgICAgIHNldFNjcm9sbChwZXJjZW50YWdlICogTWF0aC5tYXgoMCwgZGF0YS5zaXplLnZhbHVlIC0gY29udGFpbmVyWyBheGlzIF0udmFsdWUpLCBheGlzKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGh1bWIgcGFuXG4gICAgICAgIGlmIChkYXRhLnJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGRhdGEucmVmLnZhbHVlLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoZXZ0LnR5cGUsIGV2dCkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyICgpIHtcbiAgICAgIHRlbXBTaG93aW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgdGVtcFNob3dpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgfSwgcHJvcHMuZGVsYXkpXG5cbiAgICAgIHByb3BzLm9uU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdFNjcm9sbCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2Nyb2xsIChvZmZzZXQsIGF4aXMpIHtcbiAgICAgIHRhcmdldFJlZi52YWx1ZVsgZGlyUHJvcHNbIGF4aXMgXS5zY3JvbGwgXSA9IG9mZnNldFxuICAgIH1cblxuICAgIGxldCBtb3VzZUV2ZW50VGltZXIgPSBudWxsXG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlZW50ZXIgKCkge1xuICAgICAgaWYgKG1vdXNlRXZlbnRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobW91c2VFdmVudFRpbWVyKVxuICAgICAgfVxuXG4gICAgICAvLyBzZXRUaW1lb3V0IG5lZWRlZCBmb3IgaU9TOyBzZWUgdGlja2V0ICMxNjIxMFxuICAgICAgbW91c2VFdmVudFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1vdXNlRXZlbnRUaW1lciA9IG51bGxcbiAgICAgICAgaG92ZXIudmFsdWUgPSB0cnVlXG4gICAgICB9LCBwcm94eS4kcS5wbGF0Zm9ybS5pcy5pb3MgPyA1MCA6IDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWxlYXZlICgpIHtcbiAgICAgIGlmIChtb3VzZUV2ZW50VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1vdXNlRXZlbnRUaW1lcilcbiAgICAgICAgbW91c2VFdmVudFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBob3Zlci52YWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gbnVsbFxuXG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHEubGFuZy5ydGwsIHJ0bCA9PiB7XG4gICAgICBpZiAodGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICB0YXJnZXRSZWYudmFsdWUsXG4gICAgICAgICAgTWF0aC5hYnMoc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUpICogKHJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNjcm9sbFBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgbGVmdDogc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29uc3Qgc2Nyb2xsVGFyZ2V0ID0gdGFyZ2V0UmVmLnZhbHVlXG5cbiAgICAgIGlmIChzY3JvbGxUYXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKHNjcm9sbFRhcmdldCwgc2Nyb2xsUG9zaXRpb24ubGVmdClcbiAgICAgICAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihzY3JvbGxUYXJnZXQsIHNjcm9sbFBvc2l0aW9uLnRvcClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KGVtaXRTY3JvbGwuY2FuY2VsKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgZ2V0U2Nyb2xsVGFyZ2V0OiAoKSA9PiB0YXJnZXRSZWYudmFsdWUsXG4gICAgICBnZXRTY3JvbGwsXG4gICAgICBnZXRTY3JvbGxQb3NpdGlvbjogKCkgPT4gKHtcbiAgICAgICAgdG9wOiBzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUsXG4gICAgICAgIGxlZnQ6IHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlXG4gICAgICB9KSxcbiAgICAgIGdldFNjcm9sbFBlcmNlbnRhZ2U6ICgpID0+ICh7XG4gICAgICAgIHRvcDogc2Nyb2xsLnZlcnRpY2FsLnBlcmNlbnRhZ2UudmFsdWUsXG4gICAgICAgIGxlZnQ6IHNjcm9sbC5ob3Jpem9udGFsLnBlcmNlbnRhZ2UudmFsdWVcbiAgICAgIH0pLFxuICAgICAgc2V0U2Nyb2xsUG9zaXRpb246IGxvY2FsU2V0U2Nyb2xsUG9zaXRpb24sXG4gICAgICBzZXRTY3JvbGxQZXJjZW50YWdlIChheGlzLCBwZXJjZW50YWdlLCBkdXJhdGlvbikge1xuICAgICAgICBsb2NhbFNldFNjcm9sbFBvc2l0aW9uKFxuICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgcGVyY2VudGFnZVxuICAgICAgICAgICAgKiAoc2Nyb2xsWyBheGlzIF0uc2l6ZS52YWx1ZSAtIGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlKVxuICAgICAgICAgICAgKiAoYXhpcyA9PT0gJ2hvcml6b250YWwnICYmIHByb3h5LiRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSxcbiAgICAgICAgICBkdXJhdGlvblxuICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHN0b3JlID0ge1xuICAgICAgc2Nyb2xsLFxuXG4gICAgICB0aHVtYlZlcnREaXI6IFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgZSA9PiB7IG9uUGFuVGh1bWIoZSwgJ3ZlcnRpY2FsJykgfSxcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7IHZlcnRpY2FsOiB0cnVlLCAuLi5wYW5PcHRzIH1cbiAgICAgIF0gXSxcblxuICAgICAgdGh1bWJIb3JpekRpcjogWyBbXG4gICAgICAgIFRvdWNoUGFuLFxuICAgICAgICBlID0+IHsgb25QYW5UaHVtYihlLCAnaG9yaXpvbnRhbCcpIH0sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgeyBob3Jpem9udGFsOiB0cnVlLCAuLi5wYW5PcHRzIH1cbiAgICAgIF0gXSxcblxuICAgICAgb25WZXJ0aWNhbE1vdXNlZG93biAoZXZ0KSB7XG4gICAgICAgIG9uTW91c2Vkb3duKGV2dCwgJ3ZlcnRpY2FsJylcbiAgICAgIH0sXG5cbiAgICAgIG9uSG9yaXpvbnRhbE1vdXNlZG93biAoZXZ0KSB7XG4gICAgICAgIG9uTW91c2Vkb3duKGV2dCwgJ2hvcml6b250YWwnKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgb25Nb3VzZWVudGVyLFxuICAgICAgICBvbk1vdXNlbGVhdmVcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogdGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1zY3JvbGxhcmVhX19jb250YWluZXIgc2Nyb2xsIHJlbGF0aXZlLXBvc2l0aW9uIGZpdCBoaWRlLXNjcm9sbGJhcicsXG4gICAgICAgICAgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4ICE9PSB2b2lkIDAgPyBwcm9wcy50YWJpbmRleCA6IHZvaWQgMFxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXNjcm9sbGFyZWFfX2NvbnRlbnQgYWJzb2x1dGUnLFxuICAgICAgICAgICAgc3R5bGU6IG1haW5TdHlsZS52YWx1ZVxuICAgICAgICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICAgICAgZGVib3VuY2U6IDAsXG4gICAgICAgICAgICAgIG9uUmVzaXplOiB1cGRhdGVTY3JvbGxTaXplXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pKSxcblxuICAgICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7XG4gICAgICAgICAgICBheGlzOiAnYm90aCcsXG4gICAgICAgICAgICBvblNjcm9sbDogdXBkYXRlU2Nyb2xsXG4gICAgICAgICAgfSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICBvblJlc2l6ZTogdXBkYXRlQ29udGFpbmVyXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGgoU2Nyb2xsQXJlYUNvbnRyb2xzLCB7XG4gICAgICAgICAgc3RvcmUsXG4gICAgICAgICAgYmFyU3R5bGU6IHByb3BzLmJhclN0eWxlLFxuICAgICAgICAgIHZlcnRpY2FsQmFyU3R5bGU6IHByb3BzLnZlcnRpY2FsQmFyU3R5bGUsXG4gICAgICAgICAgaG9yaXpvbnRhbEJhclN0eWxlOiBwcm9wcy5ob3Jpem9udGFsQmFyU3R5bGVcbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgfVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gICAgPHEtc2Nyb2xsLWFyZWEgdi1pZj1cImlzSHlkcmF0ZWRcIiBjbGFzcz1cImZpdCBxLXBhLXNtXCI+XHJcblxyXG4gICAgPGRpdj5cclxuICAgIDxoND4gV2lzaGxpc3QgPC9oND5cclxuICAgICAgPGRpdiB2LWlmPVwiY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcyAmJiBjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC1ncmV5XCI+XHJcbiAgICAgIFlvdXIgd2lzaGxpc3QgaXMgZW1wdHkuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtZWxzZS1pZj1cImNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXMgJiYgY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcy5sZW5ndGggPiAwXCIgdi1mb3I9XCJwcm9kdWN0IGluIGNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXNcIiA6a2V5PVwicHJvZHVjdC5pZFwiIGNsYXNzPVwicmVsYXRpdmUtcG9zaXRpb24gcS1wYS1zbSByb3cgZnVsbC13aWR0aFwiPlxyXG4gICAgICAgIDxyb3V0ZXItbGluayA6dG89XCJgL3Byb2R1Y3QvJHtwcm9kdWN0LnNsdWd9L2BcIiBjbGFzcz1cImZsZXggbm8td3JhcCBxLXByLWxnIG5vLWRlY29yYXRpb24gdGV4dC1zZWNvbmRhcnkgZnVsbC13aWR0aFwiPlxyXG4gICAgICAgICAgPGltZyB2LWlmPVwicHJvZHVjdC5pbWFnZVwiIDpzcmM9XCJwcm9kdWN0LmltYWdlXCIgOmFsdD1cInByb2R1Y3QubmFtZVwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4OyBvYmplY3QtZml0OiBjb3ZlclwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSBjb2x1bW5cIj5cclxuICAgICAgICAgICAgPGRpdj57eyBwcm9kdWN0Lm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgPHEtYnRuIGxhYmVsPVwiQWRkIHRvIENhcnRcIiBjb2xvcj1cInNlY29uZGFyeVwiIEBjbGljaz1cImFkZFRvQ2FydChwcm9kdWN0KVwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImFic29sdXRlIGFic29sdXRlLXRvcC1yaWdodFwiIDppY29uPVwibWF0Q2xvc2VcIiBmbGF0IEBjbGljay5zdG9wLnByZXZlbnQ9XCJyZW1vdmVGcm9tV2lzaGxpc3QocHJvZHVjdC5pZClcIiAvPlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8L3Etc2Nyb2xsLWFyZWE+XHJcblxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmIH0gZnJvbSAndnVlJztcclxuaW1wb3J0IGNhcnQgZnJvbSAnc3JjL3N0b3Jlcy9jYXJ0LmpzJ1xyXG5pbXBvcnQgeyBtYXRDbG9zZSB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG5cclxuY29uc3Qgd2lzaGxpc3QgPSBjb21wdXRlZCgoKSA9PiBjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zKVxyXG5jb25zdCBpc0h5ZHJhdGVkID0gcmVmKGZhbHNlKVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYWRkVG9DYXJ0KHApe1xyXG5jYXJ0LmFkZChwLmlkLCAxKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlRnJvbVdpc2hsaXN0KGlkKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGNhcnQudG9nZ2xlV2lzaGxpc3RJdGVtKGlkKVxyXG4gICAgY29uc29sZS5sb2cod2lzaGxpc3QudmFsdWUpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVtb3ZpbmcgZnJvbSB3aXNobGlzdDonLCBlcnIpXHJcbiAgfVxyXG59XHJcbm9uTW91bnRlZCgoKSA9PiB7XHJcbiAgaXNIeWRyYXRlZC52YWx1ZSA9IHRydWUgLy8gVnVlIGlzIG5vdyBmdWxseSBpbiBjb250cm9sIG9mIHRoZSBET01cclxufSlcclxuXHJcbjwvc2NyaXB0PlxyXG4iLCI8dGVtcGxhdGU+XHJcbiAgPHRyYW5zaXRpb24gbmFtZT1cImZhZGVcIj5cclxuICAgIDxkaXYgdi1pZj1cInZpc2libGVcIiBjbGFzcz1cImNvb2tpZS1iYW5uZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvb2tpZS10ZXh0XCI+XHJcbiAgICAgICAgV2UgdXNlIGNvb2tpZXMgdG8gaW1wcm92ZSB5b3VyIGV4cGVyaWVuY2Ugb24gb3VyIHdlYnNpdGUuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvb2tpZS1hY3Rpb25zXCI+XHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICBmbGF0XHJcbiAgICAgICAgICBuby1jYXBzXHJcbiAgICAgICAgICBsYWJlbD1cIlByaXZhY3kgUG9saWN5XCJcclxuICAgICAgICAgIHRvPVwiL3ByaXZhY3ktcG9saWN5XCJcclxuICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIHVuZWxldmF0ZWRcclxuICAgICAgICAgIG5vLWNhcHNcclxuICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgIGxhYmVsPVwiQWNjZXB0XCJcclxuICAgICAgICAgIEBjbGljaz1cImFjY2VwdENvb2tpZXNcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC90cmFuc2l0aW9uPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXHJcblxyXG5jb25zdCB2aXNpYmxlID0gcmVmKGZhbHNlKVxyXG5cclxub25Nb3VudGVkKCgpID0+IHtcclxuICBjb25zdCBhY2NlcHRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb29raWVfY29uc2VudCcpXHJcbiAgaWYgKCFhY2NlcHRlZCkgdmlzaWJsZS52YWx1ZSA9IHRydWVcclxufSlcclxuXHJcbmZ1bmN0aW9uIGFjY2VwdENvb2tpZXMoKSB7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Nvb2tpZV9jb25zZW50JywgJ2FjY2VwdGVkJylcclxuICB2aXNpYmxlLnZhbHVlID0gZmFsc2VcclxufVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbi5jb29raWUtYmFubmVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgbGVmdDogMTZweDtcclxuICByaWdodDogMTZweDtcclxuICBib3R0b206IDE2cHg7XHJcbiAgei1pbmRleDogOTk5OTtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBjb2xvcjogIzExMTtcclxuICBib3JkZXItcmFkaXVzOiAxOHB4O1xyXG4gIHBhZGRpbmc6IDQwcHggMjVweDtcclxuICBib3gtc2hhZG93OiAwIDEwcHggMzBweCByZ2JhKDAsMCwwLC4xMik7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDE0cHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG59XHJcblxyXG4uY29va2llLXRleHQge1xyXG4gIGZsZXg6IDE7XHJcbiAgbWluLXdpZHRoOiAyMjBweDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNDtcclxufVxyXG5cclxuLmNvb2tpZS1hY3Rpb25zIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogOHB4O1xyXG59XHJcblxyXG4uZmFkZS1lbnRlci1hY3RpdmUsXHJcbi5mYWRlLWxlYXZlLWFjdGl2ZSB7XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMjVzIGVhc2U7XHJcbn1cclxuXHJcbi5mYWRlLWVudGVyLWZyb20sXHJcbi5mYWRlLWxlYXZlLXRvIHtcclxuICBvcGFjaXR5OiAwO1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcclxuICAuY29va2llLWFjdGlvbnMge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5cclxuICAuY29va2llLWFjdGlvbnMgLnEtYnRuIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgfVxyXG59XHJcbjwvc3R5bGU+IiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNwYWNlJyxcblxuICBzZXR1cCAoKSB7XG4gICAgY29uc3Qgc3BhY2UgPSBoKCdkaXYnLCB7IGNsYXNzOiAncS1zcGFjZScgfSlcbiAgICByZXR1cm4gKCkgPT4gc3BhY2VcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJhcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgZGVuc2U6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYmFyIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICsgYCBxLWJhci0tJHsgcHJvcHMuZGVuc2UgPT09IHRydWUgPyAnZGVuc2UnIDogJ3N0YW5kYXJkJyB9IGBcbiAgICAgICsgYCBxLWJhci0tJHsgaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJ2RhcmsnIDogJ2xpZ2h0JyB9YFxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHJvbGU6ICd0b29sYmFyJ1xuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8IS0tIEZsb2F0aW5nIEFjdGlvbiBCdXR0b24gLS0+XHJcbjxxLWJ0blxyXG4gIGZhYlxyXG4gIGNsYXNzPVwiZml4ZWQtYm90dG9tLWxlZnQgcS1tYi1tZCBxLW1sLW1kIHotbWF4XCJcclxuICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgOmFyaWEtbGFiZWw9XCJ2aXNpYmxlID8gJ0Nsb3NlIGNoYXQnIDogJ09wZW4gY2hhdCdcIlxyXG4gIEBjbGljaz1cInZpc2libGUgPSAhdmlzaWJsZVwiXHJcbj5cclxuICA8dHJhbnNpdGlvbiBuYW1lPVwicm90YXRlLWZhZGVcIj5cclxuICAgIDxxLWljb24gY2xhc3M9XCJhYnNvbHV0ZVwiIDprZXk9XCJ2aXNpYmxlXCIgOm5hbWU9XCJ2aXNpYmxlID8gbWF0Q2xvc2UgOiBtYXRDaGF0XCIgLz5cclxuICA8L3RyYW5zaXRpb24+XHJcbjwvcS1idG4+XHJcbiAgICA8IS0tIENoYXQgQm94IC0tPlxyXG4gICAgPHEtY2FyZFxyXG4gICAgICB2LWlmPVwidmlzaWJsZVwiXHJcbiAgICAgIGNsYXNzPVwiZml4ZWQtYm90dG9tLWxlZnQgcS1tYi1tZCBxLW1sLW1kIHotbWF4IHNoYWRvdy04IGNoYXQtY29udGFpbmVyXCJcclxuICAgICAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMDBweDtcIlxyXG4gICAgPlxyXG4gICAgICA8cS1iYXIgY2xhc3M9XCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj5BSSBBc3Npc3RhbnQ8L2Rpdj5cclxuICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgIDxxLWJ0biBkZW5zZSBmbGF0IDppY29uPVwibWF0Q2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2UgY2hhdFwiIEBjbGljaz1cInZpc2libGUgPSBmYWxzZTtmYWIxID0gZmFsc2VcIiAvPlxyXG4gICAgICA8L3EtYmFyPlxyXG5cclxuPHEtc2Nyb2xsLWFyZWEgY2xhc3M9XCJjaGF0LXNjcm9sbC1hcmVhXCIgcmVmPVwic2Nyb2xsUmVmXCIgc3R5bGU9XCJoZWlnaHQ6IDI1MHB4O1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXNtXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHYtZm9yPVwibXNnIGluIG1lc3NhZ2VzXCJcclxuICAgICAgICAgICAgOmtleT1cIm1zZy5pZFwiXHJcbiAgICAgICAgICAgIDpjbGFzcz1cIlsnY2hhdC1tZXNzYWdlJywgbXNnLmZyb20gPT09ICd1c2VyJyA/ICd1c2VyJyA6ICdib3QnXVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxxLWF2YXRhclxyXG4gICAgICAgICAgICAgIHNpemU9XCIyNHB4XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxyXG4gICAgICAgICAgICAgIHYtaWY9XCJtc2cuZnJvbSA9PT0gJ2JvdCdcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT1cIm1hdFNtYXJ0VG95XCIgLz5cclxuICAgICAgICAgICAgPC9xLWF2YXRhcj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1YmJsZVwiPnt7IG1zZy50ZXh0IH19PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxyXG5cclxuICAgICAgPHEtc2VwYXJhdG9yIC8+XHJcblxyXG4gICAgICA8cS1pbnB1dFxyXG4gICAgICAgIGZpbGxlZFxyXG4gICAgICAgIGRlbnNlXHJcbiAgICAgICAgdi1tb2RlbD1cImlucHV0XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgeW91ciBtZXNzYWdlLi4uXCJcclxuICAgICAgICBAa2V5dXAuZW50ZXI9XCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgY2xhc3M9XCJxLXBhLXNtXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgPHEtYnRuIGZsYXQgcm91bmQgOmljb249XCJtYXRTZW5kXCIgQGNsaWNrPVwic2VuZE1lc3NhZ2VcIiAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgbWF0Q2xvc2UsIG1hdENoYXQsIG1hdFNlbmQsIG1hdFNtYXJ0VG95IH0gZnJvbSAnQHF1YXNhci9leHRyYXMvbWF0ZXJpYWwtaWNvbnMnXHJcblxyXG5jb25zdCBtZXNzYWdlcyA9IHJlZihbXSlcclxuY29uc3QgaW5wdXQgPSByZWYoJycpXHJcbmNvbnN0IHZpc2libGUgPSByZWYoZmFsc2UpXHJcbmNvbnN0IHNjcm9sbFJlZiA9IHJlZihudWxsKVxyXG5jb25zdCBmYWIxID0gcmVmKGZhbHNlKTtcclxuY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSAoKSA9PiB7XHJcbiAgbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgaWYgKHNjcm9sbFJlZi52YWx1ZSkge1xyXG4gICAgICBzY3JvbGxSZWYudmFsdWUucmVmcmVzaCgpOyAvLyBGb3JjZSBpdCB0byByZWNhbGN1bGF0ZSBkaW1lbnNpb25zXHJcbiAgICAgIHNjcm9sbFJlZi52YWx1ZS5zZXRTY3JvbGxQZXJjZW50YWdlKCd2ZXJ0aWNhbCcsIDEpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKCkgPT4ge1xyXG4gIGlmICghaW5wdXQudmFsdWUudHJpbSgpKSByZXR1cm5cclxuXHJcbiAgY29uc3QgdXNlclRleHQgPSBpbnB1dC52YWx1ZVxyXG4gIG1lc3NhZ2VzLnZhbHVlLnB1c2goeyBpZDogRGF0ZS5ub3coKSwgdGV4dDogdXNlclRleHQsIGZyb206ICd1c2VyJyB9KVxyXG4gIGNvbnNvbGUubG9nKCdNZXNzYWdlczonLCBtZXNzYWdlcy52YWx1ZSlcclxuXHJcbiAgaW5wdXQudmFsdWUgPSAnJ1xyXG4gIHNjcm9sbFRvQm90dG9tKClcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL251eHQubWVpZGFubS5jb20vd3AtanNvbi9haS1jaGF0L3YxL21lc3NhZ2UnLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiB1c2VyVGV4dCB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgbWVzc2FnZXMudmFsdWUucHVzaCh7IGlkOiBEYXRlLm5vdygpICsgMSwgdGV4dDogZGF0YS5yZXBseSwgZnJvbTogJ2JvdCcgfSlcclxuICAgIGNvbnNvbGUubG9nKCdNZXNzYWdlczonLCBtZXNzYWdlcy52YWx1ZSlcclxuXHJcbiAgICBzY3JvbGxUb0JvdHRvbSgpXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKVxyXG4gICAgbWVzc2FnZXMudmFsdWUucHVzaCh7IGlkOiBEYXRlLm5vdygpICsgMiwgdGV4dDogJ0ZhaWxlZCB0byBnZXQgcmVzcG9uc2UuJywgZnJvbTogJ2JvdCcgfSlcclxuICAgIGNvbnNvbGUubG9nKCdNZXNzYWdlczonLCBtZXNzYWdlcy52YWx1ZSlcclxuXHJcbiAgICBzY3JvbGxUb0JvdHRvbSgpXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PiIsIi8vIHNyYy9ib290L3B1c2guanNcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdxdWFzYXInXHJcbi8vaW1wb3J0IHsgQXBwIH0gZnJvbSAnQGNhcGFjaXRvci9hcHAnO1xyXG5cclxubGV0IFB1c2hOb3RpZmljYXRpb25zID0gbnVsbFxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKCkge1xyXG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwXHJcbiAgICBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KVxyXG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpXHJcbiAgfSlcclxufVxyXG4vKipcclxuICogQ29udmVydCBWQVBJRCBiYXNlNjQga2V5IHRvIFVJbnQ4QXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIHVybEJhc2U2NFRvVWludDhBcnJheShiYXNlNjRTdHJpbmcpIHtcclxuICBjb25zdCBwYWRkaW5nID0gJz0nLnJlcGVhdCgoNCAtIGJhc2U2NFN0cmluZy5sZW5ndGggJSA0KSAlIDQpXHJcbiAgY29uc3QgYmFzZTY0ID0gKGJhc2U2NFN0cmluZyArIHBhZGRpbmcpLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJylcclxuICBjb25zdCByYXdEYXRhID0gYXRvYihiYXNlNjQpXHJcbiAgY29uc3Qgb3V0cHV0QXJyYXkgPSBuZXcgVWludDhBcnJheShyYXdEYXRhLmxlbmd0aClcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd0RhdGEubGVuZ3RoOyArK2kpIHtcclxuICAgIG91dHB1dEFycmF5W2ldID0gcmF3RGF0YS5jaGFyQ29kZUF0KGkpXHJcbiAgfVxyXG4gIHJldHVybiBvdXRwdXRBcnJheVxyXG59XHJcblxyXG4vLyB5b3VyIFZBUElEIHB1YmxpYyBrZXkgZm9yIHdlYiBwdXNoXHJcbmNvbnN0IEFQUF9TRVJWRVJfS0VZID0gJ0JIU1YxNDlScFdZNUlrUnlHQ19EdnhSV1F1T18yOUZBZHdoaEZ1OUlQeWZVTkhEZWRnN3BUQ2VyX1dybEppcER2bVUwSnF4Qnk0bEtIV0l0WDJFNmNMdydcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3IgY3JlYXRlIGEgdW5pcXVlIGRldmljZSBJRCAoc3RvcmVkIGluIGxvY2FsU3RvcmFnZSlcclxuICovXHJcbmZ1bmN0aW9uIGdldERldmljZUlkKCkge1xyXG4gIGxldCBkZXZpY2VJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwd2FfZGV2aWNlX2lkJylcclxuICBpZiAoIWRldmljZUlkKSB7XHJcbiAgICBkZXZpY2VJZCA9IGdlbmVyYXRlVVVJRCgpXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHdhX2RldmljZV9pZCcsIGRldmljZUlkKVxyXG4gIH1cclxuICByZXR1cm4gZGV2aWNlSWRcclxufVxyXG5cclxuLyoqXHJcbiAqIFN1YnNjcmliZSB0byBwdXNoIG5vdGlmaWNhdGlvbnMgKFdlYi9QV0EpXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3Vic2NyaWJlVG9XZWJQdXNoKCkge1xyXG4gIGNvbnNvbGUubG9nKCfwn5qAIFB1c2ggc2V0dXAgc3RhcnRlZCAoV2ViKScpXHJcbiAgY29uc3QgcGVybWlzc2lvbiA9IGF3YWl0IE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpXHJcbiAgaWYgKHBlcm1pc3Npb24gIT09ICdncmFudGVkJykge1xyXG4gICAgY29uc29sZS53YXJuKCfwn5S0IE5vdGlmaWNhdGlvbiBwZXJtaXNzaW9uIG5vdCBncmFudGVkLicpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZWdpc3RyYXRpb24gPSBhd2FpdCBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeVxyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gYXdhaXQgcmVnaXN0cmF0aW9uLnB1c2hNYW5hZ2VyLnN1YnNjcmliZSh7XHJcbiAgICAgIHVzZXJWaXNpYmxlT25seTogdHJ1ZSxcclxuICAgICAgYXBwbGljYXRpb25TZXJ2ZXJLZXk6IHVybEJhc2U2NFRvVWludDhBcnJheShBUFBfU0VSVkVSX0tFWSlcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgZGV2aWNlSWQgPSBnZXREZXZpY2VJZCgpXHJcbiAgICBjb25zdCBjYXJ0VG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnd2NfY2FydF90b2tlbicpIHx8IG51bGxcclxuXHJcbiAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICBkZXZpY2VfaWQ6IGRldmljZUlkLFxyXG4gICAgICBjYXJ0X3Rva2VuOiBjYXJ0VG9rZW4sXHJcbiAgICAgIHN1YnNjcmlwdGlvbjogc3Vic2NyaXB0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3B3YS92MS9zYXZlLXN1YnNjcmlwdGlvbicsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICBjb25zb2xlLmxvZygn4pyFIFB1c2ggc3Vic2NyaXB0aW9uIHNhdmVkICh3ZWIpOicsIHJlc3VsdClcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBQdXNoIHN1YnNjcmlwdGlvbiBmYWlsZWQgKHdlYik6JywgZXJyKVxyXG4gIH1cclxufVxyXG5cclxuLyog4oCU4oCU4oCUIE5hdGl2ZSAoQ2FwYWNpdG9yKSBoZWxwZXJzIOKAlOKAlOKAlCAqL1xyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVOb3RpZmljYXRpb25DaGFubmVscygpIHtcclxuICAvLyBPcmRlcnNcclxuICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5jcmVhdGVDaGFubmVsKHtcclxuICAgIGlkOiAnb3JkZXJzJyxcclxuICAgIG5hbWU6ICdPcmRlcnMnLFxyXG4gICAgZGVzY3JpcHRpb246ICdPcmRlciBjb25maXJtYXRpb25zIGFuZCBwYXltZW50IHVwZGF0ZXMnLFxyXG4gICAgaW1wb3J0YW5jZTogNCwgLy8gSElHSFxyXG4gICAgdmlzaWJpbGl0eTogMSwgLy8gUFVCTElDIChzaG93cyBvbiBsb2NrIHNjcmVlbilcclxuICAgIHZpYnJhdGlvbjogdHJ1ZVxyXG4gIH0pO1xyXG5cclxuICAvLyBBYmFuZG9uZWQgY2FydFxyXG4gIGF3YWl0IFB1c2hOb3RpZmljYXRpb25zLmNyZWF0ZUNoYW5uZWwoe1xyXG4gICAgaWQ6ICdhYmFuZG9uZWRfY2FydCcsXHJcbiAgICBuYW1lOiAnQWJhbmRvbmVkIENhcnQnLFxyXG4gICAgZGVzY3JpcHRpb246ICdSZW1pbmRlcnMgYWJvdXQgaXRlbXMgbGVmdCBpbiB5b3VyIGNhcnQnLFxyXG4gICAgaW1wb3J0YW5jZTogNCwgLy8gSElHSFxyXG4gICAgdmlzaWJpbGl0eTogMSxcclxuICAgIHZpYnJhdGlvbjogdHJ1ZVxyXG4gIH0pO1xyXG5cclxuICAvLyBQcm9tb3Rpb25zXHJcbiAgYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMuY3JlYXRlQ2hhbm5lbCh7XHJcbiAgICBpZDogJ3Byb21vdGlvbnMnLFxyXG4gICAgbmFtZTogJ1Byb21vdGlvbnMnLFxyXG4gICAgZGVzY3JpcHRpb246ICdTYWxlcywgZGlzY291bnRzIGFuZCBzcGVjaWFsIG9mZmVycycsXHJcbiAgICBpbXBvcnRhbmNlOiAzLCAvLyBERUZBVUxUXHJcbiAgICB2aXNpYmlsaXR5OiAxLFxyXG4gICAgdmlicmF0aW9uOiB0cnVlXHJcbiAgfSk7XHJcblxyXG4gIC8vIFN5c3RlbSAvIGJhY2tncm91bmRcclxuICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5jcmVhdGVDaGFubmVsKHtcclxuICAgIGlkOiAnc3lzdGVtJyxcclxuICAgIG5hbWU6ICdTeXN0ZW0nLFxyXG4gICAgZGVzY3JpcHRpb246ICdTeXN0ZW0gYW5kIGJhY2tncm91bmQgbm90aWZpY2F0aW9ucycsXHJcbiAgICBpbXBvcnRhbmNlOiAyLCAvLyBMT1dcclxuICAgIHZpc2liaWxpdHk6IDAsIC8vIFBSSVZBVEVcclxuICAgIHZpYnJhdGlvbjogdHJ1ZVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tOYXRpdmVQZXJtaXNzaW9uKCl7XHJcbiAgaWYgKCFQbGF0Zm9ybS5pcy5jYXBhY2l0b3IpIHJldHVybiAndW5zdXBwb3J0ZWQnXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHB1c2hNb2R1bGUgPSBhd2FpdCBpbXBvcnQoLyogQHZpdGUtaWdub3JlICovICdAY2FwYWNpdG9yL3B1c2gtbm90aWZpY2F0aW9ucycpXHJcbiAgICBQdXNoTm90aWZpY2F0aW9ucyA9IHB1c2hNb2R1bGUuUHVzaE5vdGlmaWNhdGlvbnNcclxuXHJcbiAgICBjb25zdCBwZXJtID0gYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMuY2hlY2tQZXJtaXNzaW9ucygpXHJcbiAgICByZXR1cm4gcGVybS5yZWNlaXZlO1xyXG5cclxuICB9IGNhdGNoKGUpe1xyXG4gICAgY29uc29sZS53YXJuKCdoYXZlIGVycm9yIScsIGUpXHJcbiAgfVxyXG59XHJcbi8qKlxyXG4gKiBpbml0TmF0aXZlUHVzaDpcclxuICogIC0gZHluYW1pY2FsbHkgaW1wb3J0cyBuYXRpdmUgbW9kdWxlc1xyXG4gKiAgLSByZWdpc3RlcnMgbGlzdGVuZXJzIChyZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvbkVycm9yLCByZWNlaXZlZClcclxuICogIC0gZG9lcyBOT1QgZm9yY2UgYSBwZXJtaXNzaW9ucyBwcm9tcHRcclxuICogIC0gc2FmZSB0byBjYWxsIG9uIGFwcCBzdGFydHVwIHRvIHNldCBsaXN0ZW5lcnNcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0TmF0aXZlUHVzaCgpIHtcclxuICBpZiAoIVBsYXRmb3JtLmlzLmNhcGFjaXRvcikgcmV0dXJuICd1bnN1cHBvcnRlZCdcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHB1c2hNb2R1bGUgPSBhd2FpdCBpbXBvcnQoLyogQHZpdGUtaWdub3JlICovICdAY2FwYWNpdG9yL3B1c2gtbm90aWZpY2F0aW9ucycpXHJcbiAgICBQdXNoTm90aWZpY2F0aW9ucyA9IHB1c2hNb2R1bGUuUHVzaE5vdGlmaWNhdGlvbnNcclxuXHJcbiAgICAvLyBsaXN0ZW5lcnMgKHJlZ2lzdGVyIHRoZXNlIE9OQ0UpXHJcbiAgICBQdXNoTm90aWZpY2F0aW9ucy5hZGRMaXN0ZW5lcigncmVnaXN0cmF0aW9uJywgYXN5bmMgKHRva2VuKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCfwn5+iIE5hdGl2ZSB0b2tlbjonLCB0b2tlbj8udmFsdWUpXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGV2aWNlSWQgPSBnZXREZXZpY2VJZCgpXHJcbiAgICAgICAgY29uc3QgY2FydFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3djX2NhcnRfdG9rZW4nKSB8fCBudWxsXHJcbiAgICAgICAgYXdhaXQgZmV0Y2goJ2h0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3B3YS92MS9zYXZlLXN1YnNjcmlwdGlvbicsIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBkZXZpY2VfaWQ6IGRldmljZUlkLFxyXG4gICAgICAgICAgICBjYXJ0X3Rva2VuOiBjYXJ0VG9rZW4sXHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbjoge2VuZHBvaW50OiB0b2tlbj8udmFsdWUsIG5hdGl2ZTogdHJ1ZX1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign4p2MIEZhaWxlZCBzYXZpbmcgbmF0aXZlIHRva2VuIHRvIHNlcnZlcicsIGVycilcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBQdXNoTm90aWZpY2F0aW9ucy5hZGRMaXN0ZW5lcigncmVnaXN0cmF0aW9uRXJyb3InLCAoZXJyKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBOYXRpdmUgcHVzaCByZWdpc3RyYXRpb24gZXJyb3I6JywgZXJyKVxyXG4gICAgfSlcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogMe+4j+KDoyBGb3JlZ3JvdW5kIHB1c2ggKGVxdWl2YWxlbnQgdG8gU1cgXCJwdXNoXCIgZXZlbnQpXHJcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIFB1c2hOb3RpZmljYXRpb25zLmFkZExpc3RlbmVyKFxyXG4gICAgICAgICdwdXNoTm90aWZpY2F0aW9uUmVjZWl2ZWQnLFxyXG4gICAgICAgIChub3RpZmljYXRpb24pID0+IHtcclxuICAgICAgICAgIGFsZXJ0KFxyXG4gICAgICAgICAgICAgICdQVVNIIFJFQ0VJVkVEXFxuJyArXHJcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobm90aWZpY2F0aW9uLCBudWxsLCAyKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogMu+4j+KDoyBOb3RpZmljYXRpb24gdGFwIChlcXVpdmFsZW50IHRvIG5vdGlmaWNhdGlvbmNsaWNrKVxyXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qUHVzaE5vdGlmaWNhdGlvbnMuYWRkTGlzdGVuZXIoJ3B1c2hOb3RpZmljYXRpb25BY3Rpb25QZXJmb3JtZWQnLCAoYWN0aW9uKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbTmF0aXZlXSBQdXNoIGFjdGlvbiByZWNlaXZlZCcsIGFjdGlvbik7XHJcblxyXG4gICAgICAvLyAxLiBGbGF0dGVuZWQgZGF0YSBhY2Nlc3NcclxuICAgICAgY29uc3QgZGF0YSA9IGFjdGlvbi5ub3RpZmljYXRpb24uZGF0YTtcclxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gZGF0YT8udXJsO1xyXG5cclxuICAgICAgaWYgKHRhcmdldFVybCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbTmF0aXZlXSBOYXZpZ2F0aW5nIHRvOicsIHRhcmdldFVybCk7XHJcblxyXG4gICAgICAgIC8vIDIuIFVzZSB0aGUgaW1wb3J0ZWQgcm91dGUgaW5zdGFuY2VcclxuICAgICAgICAvLyBXcmFwIGluIGlzUmVhZHkgdG8gZW5zdXJlIHRoZSBhcHAgaXMgZnVsbHkgbG9hZGVkIGJlZm9yZSBuYXZpZ2F0aW5nXHJcbiAgICAgICAgcm91dGUuaXNSZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcm91dGUucHVzaCh0YXJnZXRVcmwpLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUm91dGVyIHB1c2ggZmFpbGVkLCBmYWxsaW5nIGJhY2sgdG8gaHJlZicsIGVycik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGFyZ2V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pOyovXHJcbiAgICBjb25zdCBwZXJtID0gYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMuY2hlY2tQZXJtaXNzaW9ucygpXHJcbiAgICBpZiAocGVybS5yZWNlaXZlICE9PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgY29uc3QgcmVxID0gYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMucmVxdWVzdFBlcm1pc3Npb25zKClcclxuICAgICAgaWYgKHJlcS5yZWNlaXZlICE9PSAnZ3JhbnRlZCcpIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8qIOKchSBDUkVBVEUgQ0hBTk5FTFMgKi9cclxuICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbkNoYW5uZWxzKClcclxuXHJcbiAgICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5yZWdpc3RlcigpXHJcblxyXG5cclxuICAgIHJldHVybiAnaW5pdGlhbGl6ZWQnXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS53YXJuKCdQdXNoIHBsdWdpbiBub3QgYXZhaWxhYmxlIG9yIG5vdCBvbiBtb2JpbGU6JywgZSlcclxuICAgIHJldHVybiAnZGVmYXVsdCdcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXF1ZXN0TmF0aXZlUGVybWlzc2lvbjpcclxuICogIC0gaW50ZW5kZWQgdG8gYmUgY2FsbGVkIGZyb20gYSB1c2VyIGdlc3R1cmUgKHlvdXIgXCJFbmFibGVcIiBidXR0b24pXHJcbiAqICAtIHdpbGwgcmVxdWVzdFBlcm1pc3Npb25zKCkgYW5kIGF0dGVtcHQgcmVnaXN0ZXIoKSAod3JhcHBlZCBzYWZlbHkpXHJcbiAqICAtIHJldHVybnMgdGhlIHBlcm1pc3Npb24ucmVjZWl2ZSBzdHJpbmcgKGUuZy4gJ2dyYW50ZWQnfCdkZW5pZWQnfCdwcm9tcHQnKVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3ROYXRpdmVQZXJtaXNzaW9uKCkge1xyXG4gIGlmICghUGxhdGZvcm0uaXMuY2FwYWNpdG9yKSByZXR1cm4gJ3Vuc3VwcG9ydGVkJ1xyXG4gIGlmICghUHVzaE5vdGlmaWNhdGlvbnMpIHtcclxuICAgIC8vIGVuc3VyZSBsaXN0ZW5lcnMgYXJlIHNldCB1cFxyXG4gICAgYXdhaXQgaW5pdE5hdGl2ZVB1c2goKVxyXG4gICAgaWYgKCFQdXNoTm90aWZpY2F0aW9ucykgcmV0dXJuICdkZWZhdWx0J1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHBlcm1TdGF0dXMgPSBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoKVxyXG4gICAgY29uc3QgcCA9IHBlcm1TdGF0dXMucmVjZWl2ZSB8fCAnZGVmYXVsdCdcclxuICAgIC8vIFRyeSByZWdpc3RlcmluZyBpbW1lZGlhdGVseSDigJQgaWYgdGhpcyBlcnJvcnMsIGFwcFN0YXRlQ2hhbmdlIGxpc3RlbmVyIHdpbGwgYXR0ZW1wdCBhZ2FpbiB3aGVuIGFjdGl2ZVxyXG4gICAgaWYgKHAgPT09ICdncmFudGVkJykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIHNtYWxsIGRlbGF5IHRvIGFsbG93IG5hdGl2ZSB0byBzZXR0bGUgYWZ0ZXIgcGVybWlzc2lvbiBkaWFsb2dcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSlcclxuICAgICAgICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5yZWdpc3RlcigpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3RlZCByZWdpc3RlcigpIGFmdGVyIHBlcm1pc3Npb24gZ3JhbnRlZCcpXHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignSW1tZWRpYXRlIHJlZ2lzdGVyKCkgZmFpbGVkICh3aWxsIHJlbHkgb24gYXBwU3RhdGVDaGFuZ2UpOicsIGVycilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ3JlcXVlc3ROYXRpdmVQZXJtaXNzaW9uIGVycm9yJywgZXJyKVxyXG4gICAgcmV0dXJuICdkZWZhdWx0J1xyXG4gIH1cclxufVxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICBCb290IGluaXQgdGhhdCBzZXRzIHVwIHRyYWNraW5nICYgbGlzdGVuZXJzXHJcbiAgIOKAlCB0aGlzIGlzIGNhbGxlZCBieSBRdWFzYXIgYm9vdCAoZGVmYXVsdCBleHBvcnQpXHJcbiAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuZnVuY3Rpb24gc2V0dXBDYXJ0VHJhY2tpbmcoKSB7XHJcbiAgLy8gTmF0aXZlLWZyaWVuZGx5IHdheSB0byBkZXRlY3QgdGhlIGFwcCBnb2luZyB0byBiYWNrZ3JvdW5kXHJcbiAgLypBcHAuYWRkTGlzdGVuZXIoJ2FwcFN0YXRlQ2hhbmdlJywgKHsgaXNBY3RpdmUgfSkgPT4ge1xyXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygn8J+TsSBBcHAgZ29pbmcgdG8gYmFja2dyb3VuZCwgc3luY2luZyBjYXJ0Li4uJylcclxuICAgICAgc3luY1N1YnNjcmlwdGlvbkNhcnRUb2tlbigpXHJcbiAgICB9XHJcbiAgfSk7Ki9cclxuICAvL3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBzeW5jU3Vic2NyaXB0aW9uQ2FydFRva2VuKVxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSBzeW5jU3Vic2NyaXB0aW9uQ2FydFRva2VuKClcclxuICB9KVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzeW5jU3Vic2NyaXB0aW9uQ2FydFRva2VuKCkge1xyXG4gIGNvbnN0IGRldmljZUlkID0gZ2V0RGV2aWNlSWQoKVxyXG4gIGNvbnN0IGNhcnRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3Y19jYXJ0X3Rva2VuJylcclxuXHJcbiAgaWYgKCFjYXJ0VG9rZW4gfHwgIWRldmljZUlkKSByZXR1cm5cclxuICB0cnkge1xyXG4gICAgLy8gU2VuZCB0aGUgc3RhYmxlIGRldmljZUlkIGFuZCB0aGUgdm9sYXRpbGUgY2FydFRva2VuXHJcbiAgICBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vcHdhL3YxL3VwZGF0ZS1jYXJ0LXRva2VuJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgIGtlZXBhbGl2ZTogdHJ1ZSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGRldmljZV9pZDogZGV2aWNlSWQsXHJcbiAgICAgICAgY2FydF90b2tlbjogY2FydFRva2VuLFxyXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIGNvbnNvbGUubG9nKCfinIUgQ2FydCB0b2tlbiBzeW5jZWQgdG8gcHVzaCBzdWJzY3JpcHRpb24uJylcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBGYWlsZWQgdG8gc3luYyBjYXJ0IHRva2VuOicsIGVycilcclxuICB9XHJcbn1cclxuLyoqXHJcbiAqIEluaXQgcHVzaCArIGNhcnQgdHJhY2tpbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0ICh7IHJvdXRlciB9ID0ge30pID0+IHtcclxuICAvLyAxLiBQcmV2ZW50IHNlcnZlci1zaWRlIGV4ZWN1dGlvblxyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuXHJcbiAgaWYgKHJvdXRlcikgd2luZG93LiRyb3V0ZXIgPSByb3V0ZXJcclxuXHJcbiAgY29uc3QgaW5pdENhclRyYWNraW5nID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0dXBDYXJ0VHJhY2tpbmcoKVxyXG4gICAgaWYgKFBsYXRmb3JtLmlzICYmIFBsYXRmb3JtLmlzLmNhcGFjaXRvcikge1xyXG4gICAgICB0cnkge1xyXG5cclxuICAgICAgICAvLyBkeW5hbWljIGltcG9ydCBvbmx5IHRvIGNvcHkgdGhlIG1vZHVsZSBmb3IgcGx1Z2luIGRldGVjdGlvblxyXG4gICAgICAgIGNvbnN0IG5hdGl2ZVB1c2ggPSBhd2FpdCBpbXBvcnQoLyogQHZpdGUtaWdub3JlICovICdAY2FwYWNpdG9yL3B1c2gtbm90aWZpY2F0aW9ucycpXHJcbiAgICAgICAgUHVzaE5vdGlmaWNhdGlvbnMgPSBuYXRpdmVQdXNoLlB1c2hOb3RpZmljYXRpb25zXHJcbiAgICAgICAgUHVzaE5vdGlmaWNhdGlvbnMuYWRkTGlzdGVuZXIoJ3B1c2hOb3RpZmljYXRpb25BY3Rpb25QZXJmb3JtZWQnLCAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhhY3Rpb24pO1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGFjdGlvbi5ub3RpZmljYXRpb24uZGF0YVxyXG4gICAgICAgICAgaWYgKGRhdGE/LnVybCkge1xyXG4gICAgICAgICAgICAvLyBVc2UgdGhlIHJvdXRlciBwYXNzZWQgaW4gYnkgUXVhc2FyXHJcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKGRhdGEudXJsKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gRG8gbm90IHJlcXVlc3QgcGVybWlzc2lvbiBoZXJlIOKAlCB3ZSBvbmx5IHNldCB1cCBsaXN0ZW5lcnMgaW4gaW5pdE5hdGl2ZVB1c2hcclxuICAgICAgICAvL2F3YWl0IGluaXROYXRpdmVQdXNoKClcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignUHVzaCBwbHVnaW4gbm90IGF2YWlsYWJsZSBvciBub3Qgb24gbW9iaWxlOicsIGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZygn4pyFIFB1c2ggJiBUcmFja2luZyBpbml0aWFsaXplZCBhZnRlciBMQ1AnKVxyXG4gIH1cclxuICBpbml0Q2FyVHJhY2tpbmcoKVxyXG59XHJcbiIsIi8vIGJvb3QvbG9hZGluZy1iYXIuanNcclxuaW1wb3J0IHsgTG9hZGluZ0JhciB9IGZyb20gJ3F1YXNhcidcclxuXHJcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdExvYWRpbmdCYXIocm91dGVyKSB7XHJcbiAgaWYgKGluaXRpYWxpemVkKSByZXR1cm5cclxuICBpbml0aWFsaXplZCA9IHRydWVcclxuXHJcbiAgTG9hZGluZ0Jhci5zZXREZWZhdWx0cyh7XHJcbiAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgIHNpemU6ICc1cHgnLFxyXG4gICAgcG9zaXRpb246ICd0b3AnXHJcbiAgfSlcclxuXHJcbiAgcm91dGVyLmJlZm9yZUVhY2goKHRvLCBmcm9tLCBuZXh0KSA9PiB7XHJcbiAgICBMb2FkaW5nQmFyLnN0YXJ0KClcclxuICAgIG5leHQoKVxyXG4gIH0pXHJcblxyXG4gIHJvdXRlci5hZnRlckVhY2goKCkgPT4ge1xyXG4gICAgTG9hZGluZ0Jhci5zdG9wKClcclxuICB9KVxyXG59IiwiLy8gc3JjL2Jvb3QvYXV0aC1leHBpcmVkLmpzXHJcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJ3F1YXNhcidcclxuXHJcbmxldCBzaG93biA9IGZhbHNlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdEF1dGhQb3B1cChyb3V0ZXIpIHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYXV0aC1leHBpcmVkJywgKCkgPT4ge1xyXG4gICAgaWYgKHNob3duKSByZXR1cm5cclxuXHJcbiAgICBzaG93biA9IHRydWVcclxuXHJcbiAgICBEaWFsb2cuY3JlYXRlKHtcclxuICAgICAgdGl0bGU6ICdTZXNzaW9uIEV4cGlyZWQnLFxyXG4gICAgICBjbGFzczogJ2V4cGlyZWQtZGlhbG9nJyxcclxuICAgICAgbWVzc2FnZTogJ1lvdXIgc2Vzc2lvbiBlbmRlZC4gQ29udGludWUgYXMgZ3Vlc3Qgb3IgbG9naW4gYWdhaW4uJyxcclxuICAgICAgb2s6IHtsYWJlbDogJ0xvZ2luIEFnYWluJywgY29sb3I6ICdzZWNvbmRhcnknfSxcclxuICAgICAgY2FuY2VsOiB7bGFiZWw6ICdDb250aW51ZSBhcyBHdWVzdCcsIGNvbG9yOiAnc2Vjb25kYXJ5J30sXHJcbiAgICAgIHBlcnNpc3RlbnQ6IHRydWUsXHJcbiAgICAgIG5vRXNjRGlzbWlzczogdHJ1ZSxcclxuICAgICAgbm9CYWNrZHJvcERpc21pc3M6IHRydWVcclxuICAgIH0pLm9uT2soKCkgPT4ge1xyXG4gICAgICByb3V0ZXIucHVzaCgnL215LWFjY291bnQnKVxyXG4gICAgfSlcclxuICB9KVxyXG59IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgdi1pZj1cIiF1aUh5ZHJhdGVkXCIgY2xhc3M9XCJtaW5pbWFsLWZhbGxiYWNrXCI+XHJcbjxoZWFkZXIgY2xhc3M9XCJxLWhlYWRlciBxLWxheW91dF9fc2VjdGlvbi0tbWFyZ2luYWwgZml4ZWQtdG9wXCI+PGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJxLXRvb2xiYXIgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIGZsZXgganVzdGlmeS1iZXR3ZWVuIHEtcGEtc21cIiByb2xlPVwidG9vbGJhclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImZsZXhcIj48IS0tIERlc2t0b3AgTmF2aWdhdGlvbiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInEtdG9vbGJhcl9fdGl0bGUgZWxsaXBzaXMgbmF2LWJhciBndC1zbVwiPjwhLS12LWlmLS0+XHJcbiAgICAgICAgPGEgYXJpYS1jdXJyZW50PVwicGFnZVwiIGhyZWY9XCIvXCIgY2xhc3M9XCJyb3V0ZXItbGluay1hY3RpdmUgcm91dGVyLWxpbmstZXhhY3QtYWN0aXZlIHRleHQtaDYgbm8tZGVjb3JhdGlvblwiPk15IFNob3A8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIi9wcm9kdWN0cy9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPlByb2R1Y3RzPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCIvY2FydC9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPkNhcnQ8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIi9jaGVja291dC9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPkNoZWNrb3V0PC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCIvbXktYWNjb3VudC9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPk15IGFjY291bnQ8L2E+XHJcbiAgICAgIDwvZGl2PjwhLS0gTW9iaWxlIE1lbnUgVG9nZ2xlIC0tPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwicS1idG4gcS1idG4taXRlbSBub24tc2VsZWN0YWJsZSBuby1vdXRsaW5lIHEtYnRuLS1mbGF0IHEtYnRuLS1yZWN0YW5nbGUgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUgcS1idG4tLWRlbnNlIGx0LW1kXCIgdGFiaW5kZXg9XCIwXCIgdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJPcGVuIG1lbnVcIiBmZHByb2Nlc3NlZGlkPVwiaGliMnBsXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJxLWZvY3VzLWhlbHBlclwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAganVzdGlmeS1jZW50ZXIgcm93XCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInEtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJpbWdcIj5cclxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBzdHlsZT1cImZpbGw6IG5vbmU7XCI+PC9wYXRoPjxwYXRoIGQ9XCJNMyAxOGgxOHYtMkgzdjJ6bTAtNWgxOHYtMkgzdjJ6bTAtN3YyaDE4VjZIM3pcIj48L3BhdGg+PC9zdmc+XHJcbiAgICAgICAgICA8L2k+PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGEgYXJpYS1jdXJyZW50PVwicGFnZVwiIGhyZWY9XCIvXCIgY2xhc3M9XCJyb3V0ZXItbGluay1hY3RpdmUgcm91dGVyLWxpbmstZXhhY3QtYWN0aXZlIGZsZXggaXRlbXMtY2VudGVyIHEtbXItYXV0byBvcmRlci1maXJzdFwiIGFyaWEtbGFiZWw9XCJOYXZpZ2F0ZSB0byBob21lIHBhZ2VcIj48c3ZnIHdpZHRoPVwiMTgwcHhcIiBoZWlnaHQ9XCI0MnB4XCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjA2LjczIDQ4XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj48dGV4dCB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNTUgMjMuNzEpXCIgc3R5bGU9XCJmaWxsOiB2YXIoLS1xLXNlY29uZGFyeSk7IGZvbnQtZmFtaWx5OiBBcmlhbE1ULCBBcmlhbDsgZm9udC1zaXplOiAyNnB4OyBpc29sYXRpb246IGlzb2xhdGU7XCI+PHRzcGFuIHg9XCIwXCIgeT1cIjBcIj5OYXR1cmFCbG9vbTwvdHNwYW4+PC90ZXh0Pjx0ZXh0IHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg1NiA0MS43MSlcIiBzdHlsZT1cImZpbGw6IHZhcigtLXEtc2Vjb25kYXJ5KTsgZm9udC1mYW1pbHk6IEFyaWFsTVQsIEFyaWFsOyBmb250LXNpemU6IDEycHg7IGlzb2xhdGlvbjogaXNvbGF0ZTtcIj48dHNwYW4geD1cIjBcIiB5PVwiMFwiPkxldDwvdHNwYW4+PHRzcGFuIHg9XCIxNi42OFwiIHk9XCIwXCIgc3R5bGU9XCJsZXR0ZXItc3BhY2luZzogLTAuMDJlbTtcIj7igJk8L3RzcGFuPjx0c3BhbiB4PVwiMTkuMTNcIiB5PVwiMFwiPnMgQmxvb208L3RzcGFuPjx0c3BhbiB4PVwiNjIuNDhcIiB5PVwiMFwiIHN0eWxlPVwibGV0dGVyLXNwYWNpbmc6IC0wLjAyZW07XCI+PC90c3Bhbj48dHNwYW4geD1cIjY1LjZcIiB5PVwiMFwiIHN0eWxlPVwibGV0dGVyLXNwYWNpbmc6IC0wLjExZW07XCI+VDwvdHNwYW4+PHRzcGFuIHg9XCI3MS42XCIgeT1cIjBcIj5vZ2V0aGVyPC90c3Bhbj48L3RleHQ+PGNpcmNsZSBjeD1cIjI0XCIgY3k9XCIyNFwiIHI9XCIyNFwiIHN0eWxlPVwiZmlsbDogcmdiKDI0MywgMjM2LCAyMjYpO1wiPjwvY2lyY2xlPjxwYXRoIGQ9XCJNMjQsMTBjNiwxMCw2LDE4LDAsMjgtNi0xMC02LTE4LDAtMjhaXCIgc3R5bGU9XCJmaWxsOiByZ2IoMTYzLCAyMDEsIDE2OCk7XCI+PC9wYXRoPjwvc3ZnPjwvYT5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJxLWJ0biBxLWJ0bi1pdGVtIG5vbi1zZWxlY3RhYmxlIG5vLW91dGxpbmUgcS1idG4tLWZsYXQgcS1idG4tLXJlY3RhbmdsZSBxLWJ0bi0tYWN0aW9uYWJsZSBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZSBxLWJ0bi0tZGVuc2UgcS1tbC1zbSBxLW1yLXNtXCIgdGFiaW5kZXg9XCIwXCIgdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJBZGQgdG8gd2lzaGxpc3RcIiBmZHByb2Nlc3NlZGlkPVwicGY4dWxwXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJxLWZvY3VzLWhlbHBlclwiPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAganVzdGlmeS1jZW50ZXIgcm93XCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInEtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJpbWdcIj5cclxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBzdHlsZT1cImZpbGw6IG5vbmU7XCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTYuNSAzYy0xLjc0IDAtMy40MS44MS00LjUgMi4wOUMxMC45MSAzLjgxIDkuMjQgMyA3LjUgMyA0LjQyIDMgMiA1LjQyIDIgOC41YzAgMy43OCAzLjQgNi44NiA4LjU1IDExLjU0TDEyIDIxLjM1bDEuNDUtMS4zMkMxOC42IDE1LjM2IDIyIDEyLjI4IDIyIDguNSAyMiA1LjQyIDE5LjU4IDMgMTYuNSAzem0tNC40IDE1LjU1bC0uMS4xLS4xLS4xQzcuMTQgMTQuMjQgNCAxMS4zOSA0IDguNSA0IDYuNSA1LjUgNSA3LjUgNWMxLjU0IDAgMy4wNC45OSAzLjU3IDIuMzZoMS44N0MxMy40NiA1Ljk5IDE0Ljk2IDUgMTYuNSA1YzIgMCAzLjUgMS41IDMuNSAzLjUgMCAyLjg5LTMuMTQgNS43NC03LjkgMTAuMDV6XCI+PC9wYXRoPjwvc3ZnPjwvaT5cclxuICAgICAgICA8L3NwYW4+PC9idXR0b24+PGJ1dHRvbiBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tZmxhdCBxLWJ0bi0tcmVjdGFuZ2xlIHEtYnRuLS1hY3Rpb25hYmxlIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlIHEtYnRuLS1kZW5zZVwiIHRhYmluZGV4PVwiMFwiIHR5cGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiVmlldyBjYXJ0XCIgZmRwcm9jZXNzZWRpZD1cIm03d2dhYVwiPjxzcGFuIGNsYXNzPVwicS1mb2N1cy1oZWxwZXJcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJxLWJ0bl9fY29udGVudCB0ZXh0LWNlbnRlciBjb2wgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwIGp1c3RpZnktY2VudGVyIHJvd1wiPjxpIGNsYXNzPVwicS1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cImltZ1wiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgc3R5bGU9XCJmaWxsOiBub25lO1wiPjwvcGF0aD48cGF0aCBkPVwiTTcgMThjLTEuMSAwLTEuOTkuOS0xLjk5IDJTNS45IDIyIDcgMjJzMi0uOSAyLTItLjktMi0yLTJ6TTEgMnYyaDJsMy42IDcuNTktMS4zNSAyLjQ1Yy0uMTYuMjgtLjI1LjYxLS4yNS45NiAwIDEuMS45IDIgMiAyaDEydi0ySDcuNDJjLS4xNCAwLS4yNS0uMTEtLjI1LS4yNWwuMDMtLjEyLjktMS42M2g3LjQ1Yy43NSAwIDEuNDEtLjQxIDEuNzUtMS4wM2wzLjU4LTYuNDljLjA4LS4xNC4xMi0uMzEuMTItLjQ4IDAtLjU1LS40NS0xLTEtMUg1LjIxbC0uOTQtMkgxem0xNiAxNmMtMS4xIDAtMS45OS45LTEuOTkgMnMuODkgMiAxLjk5IDIgMi0uOSAyLTItLjktMi0yLTJ6XCI+PC9wYXRoPjwvc3ZnPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG48IS0tLS0+XHJcbjwvaGVhZGVyPlxyXG5cclxuICAgIDxtYWluPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwicGFkZGluZy10b3A6IDU4cHhcIj5cclxuICAgIDxyb3V0ZXItdmlldyAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9tYWluPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8cS1sYXlvdXQgdmlldz1cImhIaCBscFIgZkZmXCIgdi1lbHNlPlxyXG4gICAgPHEtaGVhZGVyPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICA8cS10b29sYmFyIGNsYXNzPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gcS1wYS1zbVwiPlxyXG4gICAgICAgPGRpdiBjbGFzcz1cImZsZXggbmF2LWl0ZW1zLWVsXCIgdi1pZj1cInVpSHlkcmF0ZWRcIj5cclxuICAgICA8IS0tIERlc2t0b3AgTmF2aWdhdGlvbiAtLT5cclxuICAgICAgICAgIDxxLXRvb2xiYXItdGl0bGUgY2xhc3M9XCJuYXYtYmFyIGd0LXNtXCI+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB2LWlmPVwiaXNTdXBlckFkbWluXCIgdG89XCIvYWRtaW5cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPjxxLWljb24gOm5hbWU9XCJtYXRBZG1pblBhbmVsU2V0dGluZ3NcIiAvPiBHbyB0byBBZG1pbiBQYW5lbDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPk15IFNob3A8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvcHJvZHVjdHMvXCIgY2xhc3M9XCJ0ZXh0LWg2IG5vLWRlY29yYXRpb25cIj5Qcm9kdWN0czwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9jYXJ0L1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+Q2FydDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9jaGVja291dC9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPkNoZWNrb3V0PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL215LWFjY291bnQvXCIgY2xhc3M9XCJ0ZXh0LWg2IG5vLWRlY29yYXRpb25cIj5NeSBhY2NvdW50PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxyXG5cclxuICAgICAgICAgIDwhLS0gTW9iaWxlIE1lbnUgVG9nZ2xlIC0tPlxyXG4gICAgICAgICAgPHEtYnRuIGZsYXQgZGVuc2UgOmljb249XCJtYXRNZW51XCIgYXJpYS1sYWJlbD1cIk9wZW4gbWVudVwiIGNsYXNzPVwibHQtbWRcIiBAY2xpY2s9XCJtb2JpbGVNZW51RHJhd2VyID0gdHJ1ZVwiIC8+XHJcblxyXG4gICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL1wiIGFyaWEtbGFiZWw9XCJOYXZpZ2F0ZSB0byBob21lIHBhZ2VcIiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIG9yZGVyLWZpcnN0XCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTgwcHhcIiBoZWlnaHQ9XCI0MnB4XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyMDYuNzMgNDhcIj48dGV4dCB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNTUgMjMuNzEpXCIgc3R5bGU9XCJmaWxsOnZhcigtLXEtc2Vjb25kYXJ5KTtmb250LWZhbWlseTpBcmlhbE1ULCBBcmlhbDsgZm9udC1zaXplOjI2cHg7IGlzb2xhdGlvbjppc29sYXRlO1wiPjx0c3BhbiB4PVwiMFwiIHk9XCIwXCI+TmF0dXJhQmxvb208L3RzcGFuPjwvdGV4dD48dGV4dCB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNTYgNDEuNzEpXCIgc3R5bGU9XCJmaWxsOnZhcigtLXEtc2Vjb25kYXJ5KTtmb250LWZhbWlseTpBcmlhbE1ULCBBcmlhbDsgZm9udC1zaXplOjEycHg7IGlzb2xhdGlvbjppc29sYXRlO1wiPjx0c3BhbiB4PVwiMFwiIHk9XCIwXCI+TGV0PC90c3Bhbj48dHNwYW4geD1cIjE2LjY4XCIgeT1cIjBcIiBzdHlsZT1cImxldHRlci1zcGFjaW5nOi0uMDJlbTtcIj7igJk8L3RzcGFuPjx0c3BhbiB4PVwiMTkuMTNcIiB5PVwiMFwiPnMgQmxvb208L3RzcGFuPjx0c3BhbiB4PVwiNjIuNDhcIiB5PVwiMFwiIHN0eWxlPVwibGV0dGVyLXNwYWNpbmc6LS4wMmVtO1wiPiA8L3RzcGFuPjx0c3BhbiB4PVwiNjUuNlwiIHk9XCIwXCIgc3R5bGU9XCJsZXR0ZXItc3BhY2luZzotLjExZW07XCI+VDwvdHNwYW4+PHRzcGFuIHg9XCI3MS42XCIgeT1cIjBcIj5vZ2V0aGVyPC90c3Bhbj48L3RleHQ+PGNpcmNsZSBjeD1cIjI0XCIgY3k9XCIyNFwiIHI9XCIyNFwiIHN0eWxlPVwiZmlsbDojZjNlY2UyO1wiLz48cGF0aCBkPVwiTTI0LDEwYzYsMTAsNiwxOCwwLDI4LTYtMTAtNi0xOCwwLTI4WlwiIHN0eWxlPVwiZmlsbDojYTNjOWE4O1wiLz48L3N2Zz5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxxLWJ0biBmbGF0IGRlbnNlIDppY29uPVwibWF0RmF2b3JpdGVCb3JkZXJcIiBhcmlhLWxhYmVsPVwiQWRkIHRvIHdpc2hsaXN0XCIgQGNsaWNrPVwidG9nZ2xlV2lzaGxpc3REcmF3ZXJcIiBjbGFzcz1cInEtbWwtc20gcS1tci1zbVwiPlxyXG4gICAgICAgICAgPHEtYmFkZ2Ugdi1pZj1cInN0b3JlUmVhZHkgJiYgY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcyAmJiBPYmplY3Qua2V5cyhjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zKS5sZW5ndGggPiAwXCIgZmxvYXRpbmcgY29sb3I9XCJyZWRcIj57eyBPYmplY3Qua2V5cyhjYXJ0LnN0YXRlLndpc2hsaXN0X2l0ZW1zKS5sZW5ndGggfX08L3EtYmFkZ2U+XHJcbiAgICAgICAgPC9xLWJ0bj5cclxuXHJcbiAgICAgICAgPHEtYnRuIGZsYXQgZGVuc2UgOmljb249XCJtYXRTaG9wcGluZ0NhcnRcIiBhcmlhLWxhYmVsPVwiVmlldyBjYXJ0XCIgQGNsaWNrPVwidG9nZ2xlQ2FydFwiPlxyXG4gICAgICAgICAgPHEtbm8tc3NyPlxyXG4gICAgICAgICAgPHEtYmFkZ2Ugdi1pZj1cInN0b3JlUmVhZHkgJiYgY2FydC5zdGF0ZS5pdGVtc19jb3VudCA+IDBcIiBmbG9hdGluZyBjb2xvcj1cInJlZFwiPnt7IGNhcnQuc3RhdGUuaXRlbXNfY291bnQgfX08L3EtYmFkZ2U+XHJcbiAgICAgICAgICA8L3Etbm8tc3NyPlxyXG4gICAgICAgIDwvcS1idG4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvcS10b29sYmFyPlxyXG4gICAgIDwvZGl2PlxyXG4gICAgPC9xLWhlYWRlcj5cclxuXHJcbiAgICA8IS0tIE1vYmlsZSBOYXZpZ2F0aW9uIERyYXdlciAtLT5cclxuICAgIDxxLWRyYXdlclxyXG4gICAgICB2LW1vZGVsPVwibW9iaWxlTWVudURyYXdlclwiXHJcbiAgICAgIHNpZGU9XCJsZWZ0XCJcclxuICAgICAgb3ZlcmxheVxyXG4gICAgICBiZWhhdmlvcj1cIm1vYmlsZVwiXHJcbiAgICAgIDp3aWR0aD1cIjI2MFwiXHJcbiAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNsaWRlLXJpZ2h0XCJcclxuICAgICAgdHJhbnNpdGlvbi1oaWRlPVwic2xpZGUtbGVmdFwiXHJcbiAgICAgIDp0b3VjaC1hcmVhLXdpZHRoPVwiMjUwXCJcclxuICAgICAgdi1pZj1cInVpSHlkcmF0ZWRcIlxyXG4gICAgPlxyXG4gICAgICA8cS1zY3JvbGwtYXJlYSBjbGFzcz1cImZpdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW1iLW1kXCI+TWVudTwvZGl2PlxyXG4gICAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBwYWRkaW5nPlxyXG4gICAgICAgICAgICA8cS1pdGVtXHJcbiAgICAgIHYtaWY9XCJpc1N1cGVyQWRtaW5cIlxyXG4gICAgICBjbGlja2FibGVcclxuICAgICAgdi1yaXBwbGVcclxuICAgICAgdG89XCIvYWRtaW5cIlxyXG4gICAgICBhY3RpdmUtY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIlxyXG4gICAgPlxyXG4gICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxyXG4gICAgICAgIDxxLWljb24gbmFtZT1cImFkbWluX3BhbmVsX3NldHRpbmdzXCIgLz5cclxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgPHEtaXRlbS1zZWN0aW9uPkdvIHRvIEFkbWluIFBhbmVsPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgIDwvcS1pdGVtPlxyXG5cclxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGUgdG89XCIvXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj48cS1pY29uIDpuYW1lPVwibWF0SG9tZVwiIC8+PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+SG9tZTwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtPlxyXG5cclxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGUgdG89XCIvcHJvZHVjdHMvXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj48cS1pY29uIDpuYW1lPVwibWF0U3RvcmVmcm9udFwiIC8+PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+UHJvZHVjdHM8L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3EtaXRlbT5cclxuXHJcbiAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlIHRvPVwiL2NhcnQvXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj48cS1pY29uIDpuYW1lPVwibWF0U2hvcHBpbmdDYXJ0XCIgLz48L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5DYXJ0PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9xLWl0ZW0+XHJcblxyXG4gICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZSB0bz1cIi9jaGVja291dC9cIiBAY2xpY2s9XCJtb2JpbGVNZW51RHJhd2VyID0gZmFsc2VcIj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPjxxLWljb24gOm5hbWU9XCJtYXRSZWNlaXB0XCIgLz48L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5DaGVja291dDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtPlxyXG5cclxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGUgdG89XCIvbXktYWNjb3VudC9cIiBAY2xpY2s9XCJtb2JpbGVNZW51RHJhd2VyID0gZmFsc2VcIj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPjxxLWljb24gOm5hbWU9XCJtYXRQZXJzb25cIiAvPjwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPk15IEFjY291bnQ8L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICAgIDwvcS1saXN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxxLWJhbm5lclxyXG4gICAgICAgICAgdi1pZj1cInN1cHBvcnRlZCAmJiBwZXJtaXNzaW9uICE9PSAnZ3JhbnRlZCcgJiYgcGVybWlzc2lvbiAhPT0gJ2RlbmllZCdcIlxyXG4gICAgICAgICAgY2xhc3M9XCJiZy1wcmltYXJ5IHRleHQtd2hpdGUgcS1tYS1tZCByb3VuZGVkLWJvcmRlcnMgc2hhZG93LTJcIlxyXG4gICAgICAgICAgaW5saW5lLWFjdGlvbnNcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMVwiPkVuYWJsZSBwdXNoIG5vdGlmaWNhdGlvbnM/PC9kaXY+XHJcbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphY3Rpb24+XHJcbiAgICAgICAgICA8cS1idG4gZGVuc2UgY29sb3I9XCJ3aGl0ZVwiIHRleHQtY29sb3I9XCJzZWNvbmRhcnlcIiBsYWJlbD1cIkVuYWJsZVwiIEBjbGljaz1cImhhbmRsZVN1YnNjcmliZVwiIC8+XHJcbiAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgPC9xLWJhbm5lcj5cclxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxyXG4gICAgPC9xLWRyYXdlcj5cclxuXHJcbiAgPCEtLSBXaXNobGlzdCBEcmF3ZXIgLS0+XHJcbiAgPHEtZHJhd2VyXHJcbiAgICB2LW1vZGVsPVwid2lzaGxpc3REcmF3ZXJPcGVuXCJcclxuICAgIHNpZGU9XCJyaWdodFwiXHJcbiAgICBvdmVybGF5XHJcbiAgICBiZWhhdmlvcj1cIm1vYmlsZVwiXHJcbiAgICB2LWlmPVwidWlIeWRyYXRlZFwiXHJcbiAgPlxyXG4gICAgPFdpc2hsaXN0RHJhd2VyIC8+XHJcbiAgPC9xLWRyYXdlcj5cclxuPCEtLS0tLS0tLS0tLS0tLSAtLS0tLS0tPlxyXG4gICAgPHEtZHJhd2VyXHJcbiAgICAgIHYtbW9kZWw9XCJjYXJ0RHJhd2VyXCJcclxuICAgICAgc2lkZT1cInJpZ2h0XCJcclxuICAgICAgb3ZlcmxheVxyXG4gICAgICBiZWhhdmlvcj1cIm1vYmlsZVwiXHJcbiAgICAgIDp3aWR0aD1cIjMwMFwiXHJcbiAgICAgIDp0b3VjaC1hcmVhLXdpZHRoPVwiMjUwXCJcclxuICAgICAgdi1pZj1cInVpSHlkcmF0ZWRcIlxyXG4gICAgPlxyXG4gICAgICA8cS1uby1zc3I+XHJcbiAgICAgIDxxLXNjcm9sbC1hcmVhIGNsYXNzPVwiZml0IHEtcGEtc21cIj5cclxuICAgICAgICA8aDQ+IENhcnQgPC9oND5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJjYXJ0Lmhhc0l0ZW1zLnZhbHVlXCI+XHJcbiAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gY2FydC5zdGF0ZS5pdGVtc1wiIDprZXk9XCJpdGVtLmlkXCIgY2xhc3M9XCJxLXBhLXNtIHJvdyBpdGVtcy1jZW50ZXJcIiA6Y2xhc3M9XCJbaXRlbS5rZXkuaW5jbHVkZXMoJ29mZmxpbmUnKSA/ICdvZmZsaW5lLWl0ZW0nIDogJyddXCI+XHJcbiAgICAgICAgICA8aW1nIHYtaWY9XCJpdGVtLmltYWdlc1wiIDpzcmM9XCJpdGVtLmltYWdlc1swXT8udGh1bWJuYWlsXCIgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IGhlaWdodDogMTAwcHg7IG9iamVjdC1maXQ6IGNvdmVyXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW1sLXNtIGNvbHVtblwiPlxyXG4gICAgICAgICAgICA8ZGl2Pnt7IGl0ZW0ubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgIDxkaXYgdi1pZj1cIml0ZW0udmFyaWF0aW9uICYmIGl0ZW0udmFyaWF0aW9uLmxlbmd0aCA+IDBcIj5cclxuICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgIHYtZm9yPVwiKHZhcmlhdGlvbiwgaW5kZXgpIGluIGl0ZW0udmFyaWF0aW9uXCJcclxuICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICB7e3ZhcmlhdGlvbi5hdHRyaWJ1dGV9fToge3t2YXJpYXRpb24udmFsdWV9fVxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXRlbS5wcmljZXNcIj57eyBpdGVtLnByaWNlcy5wcmljZSB9fSB7eyBpdGVtLnByaWNlcy5jdXJyZW5jeV9jb2RlIH19PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtbXQteHNcIj5cclxuICAgICAgICAgICAgICA8cS1idG4gZGVuc2Ugcm91bmQgOmljb249XCJtYXRSZW1vdmVcIiBAY2xpY2s9XCJkZWNyZWFzZShpdGVtLmtleSlcIiA6ZGlzYWJsZT1cIml0ZW0ucXVhbnRpdHkgPT09IDFcIiAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicS1teC1zbVwiPnt7IGl0ZW0ucXVhbnRpdHkgfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHEtYnRuIGRlbnNlIHJvdW5kIDppY29uPVwibWF0QWRkXCIgQGNsaWNrPVwiaW5jcmVhc2UoaXRlbS5pZClcIiAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biBkZW5zZSBmbGF0IDppY29uPVwibWF0Q2xvc2VcIiBAY2xpY2s9XCJyZW1vdmUoaXRlbS5rZXksIGl0ZW0ucmVtb3RlX2tleSlcIiBjbGFzcz1cInEtbWwtc21cIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvY2hlY2tvdXQvXCI+XHJcbiAgICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgbGFiZWw9XCJDaGVja291dFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInEtcGEtc20gcm93IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgPGg1PnNlZW1zIGxpa2UgeW91ciBjYXJ0IGlzIGVtcHR5PC9oNT5cclxuICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9wcm9kdWN0cy9cIj5cclxuICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlNob3Agbm93IVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxyXG4gICAgICAgPC9xLW5vLXNzcj5cclxuICAgIDwvcS1kcmF3ZXI+XHJcbiAgICA8YWktYXNzaXN0YW50IHYtaWY9XCJ1aUh5ZHJhdGVkXCI+PC9haS1hc3Npc3RhbnQ+XHJcbiAgICA8YnV0dG9uIHYtZWxzZSBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tc3RhbmRhcmQgcS1idG4tLXJlY3RhbmdsZSBxLWJ0bi0tcm91bmRlZCBiZy1wcmltYXJ5IHRleHQtd2hpdGUgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUgcS1idG4tLWZhYiBmaXhlZC1ib3R0b20tbGVmdCBxLW1iLW1kIHEtbWwtbWQgei1tYXhcIiB0YWJpbmRleD1cIjBcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIk9wZW4gY2hhdFwiPjxzcGFuIGNsYXNzPVwicS1mb2N1cy1oZWxwZXJcIiB0YWJpbmRleD1cIi0xXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCBqdXN0aWZ5LWNlbnRlciByb3dcIj48aSBjbGFzcz1cInEtaWNvbiBhYnNvbHV0ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgc3R5bGU9XCJmaWxsOiBub25lO1wiPjwvcGF0aD48cGF0aCBkPVwiTTIwIDJINGMtMS4xIDAtMS45OS45LTEuOTkgMkwyIDIybDQtNGgxNGMxLjEgMCAyLS45IDItMlY0YzAtMS4xLS45LTItMi0yek02IDloMTJ2Mkg2Vjl6bTggNUg2di0yaDh2MnptNC02SDZWNmgxMnYyelwiPjwvcGF0aD48L3N2Zz48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgPHEtcGFnZS1jb250YWluZXIgOnN0eWxlPVwidWlIeWRyYXRlZCA/IHt9IDogeyBwYWRkaW5nVG9wOiAnNThweCcgfVwiPlxyXG4gICAgICA8bWFpbj5cclxuICAgICAgICA8cm91dGVyLXZpZXcgLz5cclxuICAgICAgPC9tYWluPlxyXG4gICAgPC9xLXBhZ2UtY29udGFpbmVyPlxyXG5cclxuICAgIDxmb290ZXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbHVtbiBmaXJzdFwiPlxyXG4gICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDhcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTA4IDE1XCIgZmlsbD1cIm5vbmVcIj48cGF0aCBkPVwiTTEwLjcwMzEgMS41NTI3M0w4Ljk0NTMxIDEuMjk4ODNWMC43ODEyNUgxMy40MDgyVjEuMjk4ODNMMTEuNzI4NSAxLjU1MjczVjEzLjg3N0gxMC43ODEyTDIuNzA1MDggMi4wOTk2MVYxMy4wOTU3TDQuNDYyODkgMTMuMzU5NFYxMy44NzdIMFYxMy4zNTk0TDEuNjc5NjkgMTMuMDk1N1YxLjU1MjczTDAgMS4yOTg4M1YwLjc4MTI1SDMuOTY0ODRMMTAuNzAzMSAxMC40Nzg1VjEuNTUyNzNaTTE4LjQwODIgNC40OTIxOUMxOC44MjQ5IDQuNDkyMTkgMTkuMjEyMiA0LjUzMTI1IDE5LjU3MDMgNC42MDkzOEMxOS45Mjg0IDQuNjg3NSAyMC4yMzc2IDQuODIwOTYgMjAuNDk4IDUuMDA5NzdDMjAuNzU4NSA1LjE5ODU3IDIwLjk2MTkgNS40NTQxIDIxLjEwODQgNS43NzYzN0MyMS4yNTQ5IDYuMDk4NjMgMjEuMzI4MSA2LjUwMzkxIDIxLjMyODEgNi45OTIxOVYxMy4xOTM0TDIyLjQ3MDcgMTMuNDM3NVYxMy44NzdIMTkuOTUxMkwxOS43NjU2IDEyLjk1OUMxOS42NjggMTMuMDU2NiAxOS41MzYxIDEzLjE3MDYgMTkuMzcwMSAxMy4zMDA4QzE5LjIwNDEgMTMuNDMxIDE5LjAwMzkgMTMuNTUzMSAxOC43Njk1IDEzLjY2N0MxOC41MzUyIDEzLjc4MDkgMTguMjYzMyAxMy44NzcgMTcuOTU0MSAxMy45NTUxQzE3LjY0NDkgMTQuMDMzMiAxNy4zMDE0IDE0LjA3MjMgMTYuOTIzOCAxNC4wNzIzQzE2LjQ4MTEgMTQuMDcyMyAxNi4xMDg0IDE0LjAwMzkgMTUuODA1NyAxMy44NjcyQzE1LjUwMjkgMTMuNzMwNSAxNS4yNjA0IDEzLjU0IDE1LjA3ODEgMTMuMjk1OUMxNC44OTU4IDEzLjA1MTggMTQuNzY1NiAxMi43NjIgMTQuNjg3NSAxMi40MjY4QzE0LjYwOTQgMTIuMDkxNSAxNC41NzAzIDExLjcyODUgMTQuNTcwMyAxMS4zMzc5QzE0LjU3MDMgMTAuOTM0MiAxNC42MTkxIDEwLjU4NDMgMTQuNzE2OCAxMC4yODgxQzE0LjgxNDUgOS45OTE4NiAxNC45NTEyIDkuNzQyODQgMTUuMTI3IDkuNTQxMDJDMTUuMzAyNyA5LjMzOTE5IDE1LjUwOTQgOS4xNzQ4IDE1Ljc0NzEgOS4wNDc4NUMxNS45ODQ3IDguOTIwOSAxNi4yNDE5IDguODIxNjEgMTYuNTE4NiA4Ljc1QzE2Ljc5NTIgOC42NzgzOSAxNy4wODgyIDguNjI5NTYgMTcuMzk3NSA4LjYwMzUyQzE3LjcwNjcgOC41Nzc0NyAxOC4wMTc2IDguNTYxMiAxOC4zMzAxIDguNTU0NjlMMTkuNzA3IDguNTE1NjJWNy4wODAwOEMxOS43MDcgNi44MDY2NCAxOS42ODQyIDYuNTU3NjIgMTkuNjM4NyA2LjMzMzAxQzE5LjU5MzEgNi4xMDg0IDE5LjUxNjYgNS45MTQ3MSAxOS40MDkyIDUuNzUxOTVDMTkuMzAxOCA1LjU4OTE5IDE5LjE1NjkgNS40NjIyNCAxOC45NzQ2IDUuMzcxMDlDMTguNzkyMyA1LjI3OTk1IDE4LjU2NDUgNS4yMzQzOCAxOC4yOTEgNS4yMzQzOEMxNy45Nzg1IDUuMjM0MzggMTcuNjYyOCA1LjI3NjY5IDE3LjM0MzggNS4zNjEzM0MxNy4wMjQ3IDUuNDQ1OTYgMTYuNzQ0OCA1LjU1NjY0IDE2LjUwMzkgNS42OTMzNkwxNi4xNzE5IDYuODM1OTRIMTUuNjI1VjQuODMzOThDMTYuMDQ4MiA0Ljc0Mjg0IDE2LjQ4NiA0LjY2MzA5IDE2LjkzODUgNC41OTQ3M0MxNy4zOTEgNC41MjYzNyAxNy44ODA5IDQuNDkyMTkgMTguNDA4MiA0LjQ5MjE5Wk0xOS43MDcgOS4xOTkyMkwxOC40Mjc3IDkuMjM4MjhDMTguMDQzNiA5LjI1MTMgMTcuNzExNiA5LjI4ODc0IDE3LjQzMTYgOS4zNTA1OUMxNy4xNTE3IDkuNDEyNDMgMTYuOTIwNiA5LjUxODIzIDE2LjczODMgOS42Njc5N0MxNi41NTYgOS44MTc3MSAxNi40MTkzIDEwLjAyMjggMTYuMzI4MSAxMC4yODMyQzE2LjIzNyAxMC41NDM2IDE2LjE5MTQgMTAuODc1NyAxNi4xOTE0IDExLjI3OTNDMTYuMTkxNCAxMi40MjUxIDE2LjY1NjkgMTIuOTk4IDE3LjU4NzkgMTIuOTk4QzE4LjAzMDYgMTIuOTk4IDE4LjQxMzEgMTIuOTQ3NiAxOC43MzU0IDEyLjg0NjdDMTkuMDU3NiAxMi43NDU4IDE5LjM4MTUgMTIuNjE3MiAxOS43MDcgMTIuNDYwOVY5LjE5OTIyWk0yNi4wMDU5IDE0LjA3MjNDMjUuMzgwOSAxNC4wNzIzIDI0LjkxMzcgMTMuODg2NyAyNC42MDQ1IDEzLjUxNTZDMjQuMjk1MiAxMy4xNDQ1IDI0LjE0MDYgMTIuNjIzNyAyNC4xNDA2IDExLjk1MzFWNS41MTc1OEgyMi45Mzk1VjUuMDc4MTJMMjQuMTYwMiA0LjY5NzI3TDI1LjE0NjUgMi42MTcxOUgyNS43NjE3VjQuNjk3MjdIMjcuODYxM1Y1LjUxNzU4SDI1Ljc2MTdWMTEuNzc3M0MyNS43NjE3IDEyLjIwMDUgMjUuODU3NyAxMi41MTk1IDI2LjA0OTggMTIuNzM0NEMyNi4yNDE5IDEyLjk0OTIgMjYuNDk0MSAxMy4wNTY2IDI2LjgwNjYgMTMuMDU2NkMyNy4wNDc1IDEzLjA1NjYgMjcuMjg2OCAxMy4wNDA0IDI3LjUyNDQgMTMuMDA3OEMyNy43NjIgMTIuOTc1MyAyNy45ODE4IDEyLjkzOTUgMjguMTgzNiAxMi45MDA0VjEzLjUzNTJDMjguMDg1OSAxMy42MDAzIDI3Ljk1NzQgMTMuNjY1NCAyNy43OTc5IDEzLjczMDVDMjcuNjM4MyAxMy43OTU2IDI3LjQ2MjYgMTMuODUyNSAyNy4yNzA1IDEzLjkwMTRDMjcuMDc4NSAxMy45NTAyIDI2Ljg3NSAxMy45OTA5IDI2LjY2MDIgMTQuMDIzNEMyNi40NDUzIDE0LjA1NiAyNi4yMjcyIDE0LjA3MjMgMjYuMDA1OSAxNC4wNzIzWk0zMS4zNTc0IDExLjI1OThDMzEuMzU3NCAxMS44MDAxIDMxLjQ3OTUgMTIuMjE1MiAzMS43MjM2IDEyLjUwNDlDMzEuOTY3OCAxMi43OTQ2IDMyLjM2NjUgMTIuOTM5NSAzMi45MTk5IDEyLjkzOTVDMzMuMjg0NSAxMi45Mzk1IDMzLjY2MjEgMTIuOTE1IDM0LjA1MjcgMTIuODY2MkMzNC40NDM0IDEyLjgxNzQgMzQuODIxIDEyLjc0MDkgMzUuMTg1NSAxMi42MzY3VjUuMzgwODZMMzMuNzk4OCA1LjEzNjcyVjQuNjk3MjdIMzYuNzk2OVYxMy4xOTM0TDM3Ljk1OSAxMy40Mzc1VjEzLjg3N0gzNS4yODMyTDM1LjIwNTEgMTMuMTM0OEMzNS4wMTYzIDEzLjIzODkgMzQuNzkxNyAxMy4zNDY0IDM0LjUzMTIgMTMuNDU3QzM0LjI3MDggMTMuNTY3NyAzMy45OTkgMTMuNjY4NiAzMy43MTU4IDEzLjc1OThDMzMuNDMyNiAxMy44NTA5IDMzLjE0NzggMTMuOTI1OCAzMi44NjEzIDEzLjk4NDRDMzIuNTc0OSAxNC4wNDMgMzIuMzE0NSAxNC4wNzIzIDMyLjA4MDEgMTQuMDcyM0MzMS43Mjg1IDE0LjA3MjMgMzEuNDA5NSAxNC4wMjM0IDMxLjEyMyAxMy45MjU4QzMwLjgzNjYgMTMuODI4MSAzMC41OTA4IDEzLjY3MTkgMzAuMzg1NyAxMy40NTdDMzAuMTgwNyAxMy4yNDIyIDMwLjAyMTIgMTIuOTYzOSAyOS45MDcyIDEyLjYyMjFDMjkuNzkzMyAxMi4yODAzIDI5LjczNjMgMTEuODY1MiAyOS43MzYzIDExLjM3N1Y1LjM4MDg2TDI4LjU2NDUgNS4xMzY3MlY0LjY5NzI3SDMxLjM1NzRWMTEuMjU5OFpNNDQuNzg1MiA0LjQ1MzEyVjYuOTMzNTlINDQuMzY1Mkw0My43OTg4IDUuODU5MzhDNDMuNjE2NSA1Ljg1OTM4IDQzLjQyMTIgNS44NzI0IDQzLjIxMjkgNS44OTg0NEM0My4wMDQ2IDUuOTI0NDggNDIuNzk2MiA1Ljk1ODY2IDQyLjU4NzkgNi4wMDA5OEM0Mi4zNzk2IDYuMDQzMjkgNDIuMTc5NCA2LjA5Mzc1IDQxLjk4NzMgNi4xNTIzNEM0MS43OTUyIDYuMjEwOTQgNDEuNjI3NiA2LjI3Mjc5IDQxLjQ4NDQgNi4zMzc4OVYxMy4xOTM0TDQzLjA1NjYgMTMuNDM3NVYxMy44NzdIMzguNzAxMlYxMy40Mzc1TDM5Ljg2MzMgMTMuMTkzNFY1LjM4MDg2TDM4LjcwMTIgNS4xMzY3MlY0LjY5NzI3SDQxLjM3N0w0MS40NjQ4IDUuODM5ODRDNDEuNjE0NiA1LjcxNjE1IDQxLjgxOTcgNS41NzQ1NCA0Mi4wODAxIDUuNDE1MDRDNDIuMzQwNSA1LjI1NTUzIDQyLjYyMjEgNS4xMDQxNyA0Mi45MjQ4IDQuOTYwOTRDNDMuMjI3NSA0LjgxNzcxIDQzLjUzMDMgNC42OTcyNyA0My44MzMgNC41OTk2MUM0NC4xMzU3IDQuNTAxOTUgNDQuNDA0MyA0LjQ1MzEyIDQ0LjYzODcgNC40NTMxMkg0NC43ODUyWk00OS41MDIgNC40OTIxOUM0OS45MTg2IDQuNDkyMTkgNTAuMzA2IDQuNTMxMjUgNTAuNjY0MSA0LjYwOTM4QzUxLjAyMjEgNC42ODc1IDUxLjMzMTQgNC44MjA5NiA1MS41OTE4IDUuMDA5NzdDNTEuODUyMiA1LjE5ODU3IDUyLjA1NTcgNS40NTQxIDUyLjIwMjEgNS43NzYzN0M1Mi4zNDg2IDYuMDk4NjMgNTIuNDIxOSA2LjUwMzkxIDUyLjQyMTkgNi45OTIxOVYxMy4xOTM0TDUzLjU2NDUgMTMuNDM3NVYxMy44NzdINTEuMDQ0OUw1MC44NTk0IDEyLjk1OUM1MC43NjE3IDEzLjA1NjYgNTAuNjI5OSAxMy4xNzA2IDUwLjQ2MzkgMTMuMzAwOEM1MC4yOTc5IDEzLjQzMSA1MC4wOTc3IDEzLjU1MzEgNDkuODYzMyAxMy42NjdDNDkuNjI4OSAxMy43ODA5IDQ5LjM1NzEgMTMuODc3IDQ5LjA0NzkgMTMuOTU1MUM0OC43Mzg2IDE0LjAzMzIgNDguMzk1MiAxNC4wNzIzIDQ4LjAxNzYgMTQuMDcyM0M0Ny41NzQ5IDE0LjA3MjMgNDcuMjAyMSAxNC4wMDM5IDQ2Ljg5OTQgMTMuODY3MkM0Ni41OTY3IDEzLjczMDUgNDYuMzU0MiAxMy41NCA0Ni4xNzE5IDEzLjI5NTlDNDUuOTg5NiAxMy4wNTE4IDQ1Ljg1OTQgMTIuNzYyIDQ1Ljc4MTIgMTIuNDI2OEM0NS43MDMxIDEyLjA5MTUgNDUuNjY0MSAxMS43Mjg1IDQ1LjY2NDEgMTEuMzM3OUM0NS42NjQxIDEwLjkzNDIgNDUuNzEyOSAxMC41ODQzIDQ1LjgxMDUgMTAuMjg4MUM0NS45MDgyIDkuOTkxODYgNDYuMDQ0OSA5Ljc0Mjg0IDQ2LjIyMDcgOS41NDEwMkM0Ni4zOTY1IDkuMzM5MTkgNDYuNjAzMiA5LjE3NDggNDYuODQwOCA5LjA0Nzg1QzQ3LjA3ODUgOC45MjA5IDQ3LjMzNTYgOC44MjE2MSA0Ny42MTIzIDguNzVDNDcuODg5IDguNjc4MzkgNDguMTgyIDguNjI5NTYgNDguNDkxMiA4LjYwMzUyQzQ4LjgwMDUgOC41Nzc0NyA0OS4xMTEzIDguNTYxMiA0OS40MjM4IDguNTU0NjlMNTAuODAwOCA4LjUxNTYyVjcuMDgwMDhDNTAuODAwOCA2LjgwNjY0IDUwLjc3OCA2LjU1NzYyIDUwLjczMjQgNi4zMzMwMUM1MC42ODY4IDYuMTA4NCA1MC42MTA0IDUuOTE0NzEgNTAuNTAyOSA1Ljc1MTk1QzUwLjM5NTUgNS41ODkxOSA1MC4yNTA3IDUuNDYyMjQgNTAuMDY4NCA1LjM3MTA5QzQ5Ljg4NjEgNS4yNzk5NSA0OS42NTgyIDUuMjM0MzggNDkuMzg0OCA1LjIzNDM4QzQ5LjA3MjMgNS4yMzQzOCA0OC43NTY1IDUuMjc2NjkgNDguNDM3NSA1LjM2MTMzQzQ4LjExODUgNS40NDU5NiA0Ny44Mzg1IDUuNTU2NjQgNDcuNTk3NyA1LjY5MzM2TDQ3LjI2NTYgNi44MzU5NEg0Ni43MTg4VjQuODMzOThDNDcuMTQxOSA0Ljc0Mjg0IDQ3LjU3OTggNC42NjMwOSA0OC4wMzIyIDQuNTk0NzNDNDguNDg0NyA0LjUyNjM3IDQ4Ljk3NDYgNC40OTIxOSA0OS41MDIgNC40OTIxOVpNNTAuODAwOCA5LjE5OTIyTDQ5LjUyMTUgOS4yMzgyOEM0OS4xMzc0IDkuMjUxMyA0OC44MDUzIDkuMjg4NzQgNDguNTI1NCA5LjM1MDU5QzQ4LjI0NTQgOS40MTI0MyA0OC4wMTQzIDkuNTE4MjMgNDcuODMyIDkuNjY3OTdDNDcuNjQ5NyA5LjgxNzcxIDQ3LjUxMyAxMC4wMjI4IDQ3LjQyMTkgMTAuMjgzMkM0Ny4zMzA3IDEwLjU0MzYgNDcuMjg1MiAxMC44NzU3IDQ3LjI4NTIgMTEuMjc5M0M0Ny4yODUyIDEyLjQyNTEgNDcuNzUwNyAxMi45OTggNDguNjgxNiAxMi45OThDNDkuMTI0MyAxMi45OTggNDkuNTA2OCAxMi45NDc2IDQ5LjgyOTEgMTIuODQ2N0M1MC4xNTE0IDEyLjc0NTggNTAuNDc1MyAxMi42MTcyIDUwLjgwMDggMTIuNDYwOVY5LjE5OTIyWk02My4xOTM0IDMuOTU1MDhDNjMuMTkzNCAzLjU3MDk2IDYzLjEzNjQgMy4yMzU2OCA2My4wMjI1IDIuOTQ5MjJDNjIuOTA4NSAyLjY2Mjc2IDYyLjcyNDYgMi40MjM1IDYyLjQ3MDcgMi4yMzE0NUM2Mi4yMTY4IDIuMDM5MzkgNjEuODg4IDEuODk2MTYgNjEuNDg0NCAxLjgwMTc2QzYxLjA4MDcgMS43MDczNiA2MC41ODU5IDEuNjYwMTYgNjAgMS42NjAxNkg1Ny45Nzg1VjYuNjExMzNINjAuMTE3MkM2MC43MjI3IDYuNjExMzMgNjEuMjI0IDYuNTQ3ODUgNjEuNjIxMSA2LjQyMDlDNjIuMDE4MiA2LjI5Mzk1IDYyLjMzMjQgNi4xMTQ5MSA2Mi41NjM1IDUuODgzNzlDNjIuNzk0NiA1LjY1MjY3IDYyLjk1NzQgNS4zNzQzNSA2My4wNTE4IDUuMDQ4ODNDNjMuMTQ2MiA0LjcyMzMxIDYzLjE5MzQgNC4zNTg3MiA2My4xOTM0IDMuOTU1MDhaTTY0LjE3OTcgMTAuMTQ2NUM2NC4xNzk3IDkuNjkwNzYgNjQuMTA2NCA5LjI5Njg4IDYzLjk2IDguOTY0ODRDNjMuODEzNSA4LjYzMjgxIDYzLjU4NTYgOC4zNTc3NSA2My4yNzY0IDguMTM5NjVDNjIuOTY3MSA3LjkyMTU1IDYyLjU2ODQgNy43NTg3OSA2Mi4wODAxIDcuNjUxMzdDNjEuNTkxOCA3LjU0Mzk1IDYxLjAwNTkgNy40OTAyMyA2MC4zMjIzIDcuNDkwMjNINTcuOTc4NVYxMi45OThDNTguMjc4IDEzLjAxMTEgNTguNTkwNSAxMy4wMjA4IDU4LjkxNiAxMy4wMjczQzU5LjE5NiAxMy4wNDA0IDU5LjUwNTIgMTMuMDQ4NSA1OS44NDM4IDEzLjA1MThDNjAuMTgyMyAxMy4wNTUgNjAuNTE3NiAxMy4wNTY2IDYwLjg0OTYgMTMuMDU2NkM2MS40NjE2IDEzLjA1NjYgNjEuOTc5MiAxMi45ODgzIDYyLjQwMjMgMTIuODUxNkM2Mi44MjU1IDEyLjcxNDggNjMuMTY4OSAxMi41MjEyIDYzLjQzMjYgMTIuMjcwNUM2My42OTYzIDEyLjAxOTkgNjMuODg2NyAxMS43MTU1IDY0LjAwMzkgMTEuMzU3NEM2NC4xMjExIDEwLjk5OTMgNjQuMTc5NyAxMC41OTU3IDY0LjE3OTcgMTAuMTQ2NVpNNTQuNDE0MSAxMy44NzdWMTMuMzU5NEw1Ni4wOTM4IDEzLjA5NTdWMS41NTI3M0w1NC40MTQxIDEuMjk4ODNWMC43ODEyNUg2MC40MDA0QzYxLjMxODQgMC43ODEyNSA2Mi4wODMzIDAuODUxMjM3IDYyLjY5NTMgMC45OTEyMTFDNjMuMzA3MyAxLjEzMTE4IDYzLjc5ODggMS4zMzQ2NCA2NC4xNjk5IDEuNjAxNTZDNjQuNTQxIDEuODY4NDkgNjQuODA0NyAyLjE5MjM4IDY0Ljk2MDkgMi41NzMyNEM2NS4xMTcyIDIuOTU0MSA2NS4xOTUzIDMuMzgyMTYgNjUuMTk1MyAzLjg1NzQyQzY1LjE5NTMgNC4yNjc1OCA2NS4xMjg2IDQuNjQxOTMgNjQuOTk1MSA0Ljk4MDQ3QzY0Ljg2MTcgNS4zMTkwMSA2NC42NzYxIDUuNjE2ODYgNjQuNDM4NSA1Ljg3NDAyQzY0LjIwMDggNi4xMzExOCA2My45MTYgNi4zNDYwMyA2My41ODQgNi41MTg1NUM2My4yNTIgNi42OTEwOCA2Mi44OTA2IDYuODE5NjYgNjIuNSA2LjkwNDNDNjMuMDY2NCA2Ljk2Mjg5IDYzLjU3OTEgNy4wNzY4MiA2NC4wMzgxIDcuMjQ2MDlDNjQuNDk3MSA3LjQxNTM2IDY0Ljg4NjEgNy42MzUwOSA2NS4yMDUxIDcuOTA1MjdDNjUuNTI0MSA4LjE3NTQ2IDY1Ljc2OTkgOC40OTYwOSA2NS45NDI0IDguODY3MTlDNjYuMTE0OSA5LjIzODI4IDY2LjIwMTIgOS42NTE2OSA2Ni4yMDEyIDEwLjEwNzRDNjYuMjAxMiAxMC42NzM4IDY2LjEwNTEgMTEuMTkzIDY1LjkxMzEgMTEuNjY1QzY1LjcyMSAxMi4xMzcgNjUuNDE5OSAxMi41NDA3IDY1LjAwOTggMTIuODc2QzY0LjU5OTYgMTMuMjExMyA2NC4wNzIzIDEzLjQ3MTcgNjMuNDI3NyAxMy42NTcyQzYyLjc4MzIgMTMuODQyOCA2Mi4wMDUyIDEzLjkzNTUgNjEuMDkzOCAxMy45MzU1QzYwLjM2NDYgMTMuOTM1NSA1OS42Mzg3IDEzLjkyNTggNTguOTE2IDEzLjkwNjJDNTguMTkzNCAxMy44ODY3IDU3LjUyNiAxMy44NzcgNTYuOTE0MSAxMy44NzdINTQuNDE0MVpNNzAuNzYxNyAxMy4xOTM0TDcyLjMzNCAxMy40Mzc1VjEzLjg3N0g2Ny41NzgxVjEzLjQzNzVMNjkuMTQwNiAxMy4xOTM0VjAuNjczODI4TDY3LjU3ODEgMC40Mzk0NTNWMEg3MC43NjE3VjEzLjE5MzRaTTgxLjk3MjcgOS4yMzgyOEM4MS45NzI3IDEwLjc5NDMgODEuNjI0MyAxMS45ODg5IDgwLjkyNzcgMTIuODIyM0M4MC4yMzExIDEzLjY1NTYgNzkuMTQ3MSAxNC4wNzIzIDc3LjY3NTggMTQuMDcyM0M3Ni4yOTU2IDE0LjA3MjMgNzUuMjUzOSAxMy42NTg5IDc0LjU1MDggMTIuODMyQzczLjg0NzcgMTIuMDA1MiA3My40OTYxIDEwLjgwNzMgNzMuNDk2MSA5LjIzODI4QzczLjQ5NjEgNy42ODg4IDczLjg0NzcgNi41MDM5MSA3NC41NTA4IDUuNjgzNTlDNzUuMjUzOSA0Ljg2MzI4IDc2LjMyMTYgNC40NTMxMiA3Ny43NTM5IDQuNDUzMTJDNzkuMTQ3MSA0LjQ1MzEyIDgwLjE5ODYgNC44NTUxNCA4MC45MDgyIDUuNjU5MThDODEuNjE3OCA2LjQ2MzIyIDgxLjk3MjcgNy42NTYyNSA4MS45NzI3IDkuMjM4MjhaTTgwLjIxNDggOS4yMzgyOEM4MC4yMTQ4IDguNjA2NzcgODAuMTcyNSA4LjA0MTk5IDgwLjA4NzkgNy41NDM5NUM4MC4wMDMzIDcuMDQ1OSA3OS44NjE3IDYuNjI1OTggNzkuNjYzMSA2LjI4NDE4Qzc5LjQ2NDUgNS45NDIzOCA3OS4yMDI1IDUuNjgxOTcgNzguODc3IDUuNTAyOTNDNzguNTUxNCA1LjMyMzg5IDc4LjE1MSA1LjIzNDM4IDc3LjY3NTggNS4yMzQzOEM3Ny4xOTQgNS4yMzQzOCA3Ni43OTY5IDUuMzIzODkgNzYuNDg0NCA1LjUwMjkzQzc2LjE3MTkgNS42ODE5NyA3NS45MjQ1IDUuOTQyMzggNzUuNzQyMiA2LjI4NDE4Qzc1LjU1OTkgNi42MjU5OCA3NS40MzI5IDcuMDQ1OSA3NS4zNjEzIDcuNTQzOTVDNzUuMjg5NyA4LjA0MTk5IDc1LjI1MzkgOC42MDY3NyA3NS4yNTM5IDkuMjM4MjhDNzUuMjUzOSA5Ljg3NjMgNzUuMjg5NyAxMC40NDYgNzUuMzYxMyAxMC45NDczQzc1LjQzMjkgMTEuNDQ4NiA3NS41NTk5IDExLjg3MzQgNzUuNzQyMiAxMi4yMjE3Qzc1LjkyNDUgMTIuNTcgNzYuMTcxOSAxMi44MzY5IDc2LjQ4NDQgMTMuMDIyNUM3Ni43OTY5IDEzLjIwOCA3Ny4xOTQgMTMuMzAwOCA3Ny42NzU4IDEzLjMwMDhDNzguMTUxIDEzLjMwMDggNzguNTUxNCAxMy4yMDggNzguODc3IDEzLjAyMjVDNzkuMjAyNSAxMi44MzY5IDc5LjQ2NDUgMTIuNTcgNzkuNjYzMSAxMi4yMjE3Qzc5Ljg2MTcgMTEuODczNCA4MC4wMDMzIDExLjQ0ODYgODAuMDg3OSAxMC45NDczQzgwLjE3MjUgMTAuNDQ2IDgwLjIxNDggOS44NzYzIDgwLjIxNDggOS4yMzgyOFpNOTEuOTcyNyA5LjIzODI4QzkxLjk3MjcgMTAuNzk0MyA5MS42MjQzIDExLjk4ODkgOTAuOTI3NyAxMi44MjIzQzkwLjIzMTEgMTMuNjU1NiA4OS4xNDcxIDE0LjA3MjMgODcuNjc1OCAxNC4wNzIzQzg2LjI5NTYgMTQuMDcyMyA4NS4yNTM5IDEzLjY1ODkgODQuNTUwOCAxMi44MzJDODMuODQ3NyAxMi4wMDUyIDgzLjQ5NjEgMTAuODA3MyA4My40OTYxIDkuMjM4MjhDODMuNDk2MSA3LjY4ODggODMuODQ3NyA2LjUwMzkxIDg0LjU1MDggNS42ODM1OUM4NS4yNTM5IDQuODYzMjggODYuMzIxNiA0LjQ1MzEyIDg3Ljc1MzkgNC40NTMxMkM4OS4xNDcxIDQuNDUzMTIgOTAuMTk4NiA0Ljg1NTE0IDkwLjkwODIgNS42NTkxOEM5MS42MTc4IDYuNDYzMjIgOTEuOTcyNyA3LjY1NjI1IDkxLjk3MjcgOS4yMzgyOFpNOTAuMjE0OCA5LjIzODI4QzkwLjIxNDggOC42MDY3NyA5MC4xNzI1IDguMDQxOTkgOTAuMDg3OSA3LjU0Mzk1QzkwLjAwMzMgNy4wNDU5IDg5Ljg2MTcgNi42MjU5OCA4OS42NjMxIDYuMjg0MThDODkuNDY0NSA1Ljk0MjM4IDg5LjIwMjUgNS42ODE5NyA4OC44NzcgNS41MDI5M0M4OC41NTE0IDUuMzIzODkgODguMTUxIDUuMjM0MzggODcuNjc1OCA1LjIzNDM4Qzg3LjE5NCA1LjIzNDM4IDg2Ljc5NjkgNS4zMjM4OSA4Ni40ODQ0IDUuNTAyOTNDODYuMTcxOSA1LjY4MTk3IDg1LjkyNDUgNS45NDIzOCA4NS43NDIyIDYuMjg0MThDODUuNTU5OSA2LjYyNTk4IDg1LjQzMjkgNy4wNDU5IDg1LjM2MTMgNy41NDM5NUM4NS4yODk3IDguMDQxOTkgODUuMjUzOSA4LjYwNjc3IDg1LjI1MzkgOS4yMzgyOEM4NS4yNTM5IDkuODc2MyA4NS4yODk3IDEwLjQ0NiA4NS4zNjEzIDEwLjk0NzNDODUuNDMyOSAxMS40NDg2IDg1LjU1OTkgMTEuODczNCA4NS43NDIyIDEyLjIyMTdDODUuOTI0NSAxMi41NyA4Ni4xNzE5IDEyLjgzNjkgODYuNDg0NCAxMy4wMjI1Qzg2Ljc5NjkgMTMuMjA4IDg3LjE5NCAxMy4zMDA4IDg3LjY3NTggMTMuMzAwOEM4OC4xNTEgMTMuMzAwOCA4OC41NTE0IDEzLjIwOCA4OC44NzcgMTMuMDIyNUM4OS4yMDI1IDEyLjgzNjkgODkuNDY0NSAxMi41NyA4OS42NjMxIDEyLjIyMTdDODkuODYxNyAxMS44NzM0IDkwLjAwMzMgMTEuNDQ4NiA5MC4wODc5IDEwLjk0NzNDOTAuMTcyNSAxMC40NDYgOTAuMjE0OCA5Ljg3NjMgOTAuMjE0OCA5LjIzODI4Wk05NS45MTggNS40Mzk0NUM5Ni4xMDAzIDUuMzM1MjkgOTYuMzE2NyA1LjIyNDYxIDk2LjU2NzQgNS4xMDc0MkM5Ni44MTggNC45OTAyMyA5Ny4wNzY4IDQuODgyODEgOTcuMzQzOCA0Ljc4NTE2Qzk3LjYxMDcgNC42ODc1IDk3Ljg4MDkgNC42MDc3NSA5OC4xNTQzIDQuNTQ1OUM5OC40Mjc3IDQuNDg0MDUgOTguNjgxNiA0LjQ1MzEyIDk4LjkxNiA0LjQ1MzEyQzk5LjM2NTIgNC40NTMxMiA5OS43ODAzIDQuNTM3NzYgMTAwLjE2MSA0LjcwNzAzQzEwMC41NDIgNC44NzYzIDEwMC44MjcgNS4xNDY0OCAxMDEuMDE2IDUuNTE3NThDMTAxLjIyNCA1LjQwMDM5IDEwMS40NzUgNS4yNzgzMiAxMDEuNzY4IDUuMTUxMzdDMTAyLjA2MSA1LjAyNDQxIDEwMi4zNjUgNC45MDg4NSAxMDIuNjgxIDQuODA0NjlDMTAyLjk5NiA0LjcwMDUyIDEwMy4zMDkgNC42MTU4OSAxMDMuNjE4IDQuNTUwNzhDMTAzLjkyNyA0LjQ4NTY4IDEwNC4yMDYgNC40NTMxMiAxMDQuNDUzIDQuNDUzMTJDMTA0LjgwNSA0LjQ1MzEyIDEwNS4xMjQgNC41MDE5NSAxMDUuNDEgNC41OTk2MUMxMDUuNjk3IDQuNjk3MjcgMTA1Ljk0MiA0Ljg1MzUyIDEwNi4xNDcgNS4wNjgzNkMxMDYuMzUzIDUuMjgzMiAxMDYuNTEyIDUuNTYzMTUgMTA2LjYyNiA1LjkwODJDMTA2Ljc0IDYuMjUzMjYgMTA2Ljc5NyA2LjY2OTkyIDEwNi43OTcgNy4xNTgyVjEzLjE5MzRMMTA3Ljk3OSAxMy40Mzc1VjEzLjg3N0gxMDMuODA5VjEzLjQzNzVMMTA1LjE3NiAxMy4xOTM0VjcuMzMzOThDMTA1LjE3NiA2Ljc5MzYyIDEwNS4wNTQgNi4zNzg1OCAxMDQuODEgNi4wODg4N0MxMDQuNTY1IDUuNzk5MTUgMTA0LjE2NyA1LjY1NDMgMTAzLjYxMyA1LjY1NDNDMTAzLjQ0NCA1LjY1NDMgMTAzLjI0NyA1LjY2NzMyIDEwMy4wMjIgNS42OTMzNkMxMDIuNzk4IDUuNzE5NCAxMDIuNTczIDUuNzQ4NyAxMDIuMzQ5IDUuNzgxMjVDMTAyLjEyNCA1LjgxMzggMTAxLjkwOSA1Ljg1MTI0IDEwMS43MDQgNS44OTM1NUMxMDEuNDk5IDUuOTM1ODcgMTAxLjMyOCA1Ljk3MDA1IDEwMS4xOTEgNS45OTYwOUMxMDEuMzAyIDYuMzQ3NjYgMTAxLjM1NyA2LjczNTAzIDEwMS4zNTcgNy4xNTgyVjEzLjE5MzRMMTAyLjczNCAxMy40Mzc1VjEzLjg3N0g5OC4zNzg5VjEzLjQzNzVMOTkuNzM2MyAxMy4xOTM0VjcuMzMzOThDOTkuNzM2MyA2Ljc5MzYyIDk5LjU5OCA2LjM3ODU4IDk5LjMyMTMgNi4wODg4N0M5OS4wNDQ2IDUuNzk5MTUgOTguNjI5NiA1LjY1NDMgOTguMDc2MiA1LjY1NDNDOTcuODkzOSA1LjY1NDMgOTcuNzAzNSA1LjY2NDA2IDk3LjUwNDkgNS42ODM1OUM5Ny4zMDYzIDUuNzAzMTIgOTcuMTExIDUuNzI1OTEgOTYuOTE4OSA1Ljc1MTk1Qzk2LjcyNjkgNS43Nzc5OSA5Ni41NDQ2IDUuODA4OTIgOTYuMzcyMSA1Ljg0NDczQzk2LjE5OTUgNS44ODA1MyA5Ni4wNTQ3IDUuOTExNDYgOTUuOTM3NSA1LjkzNzVWMTMuMTkzNEw5Ny4zMTQ1IDEzLjQzNzVWMTMuODc3SDkzLjE1NDNWMTMuNDM3NUw5NC4zMTY0IDEzLjE5MzRWNS4zODA4Nkw5My4xNTQzIDUuMTM2NzJWNC42OTcyN0g5NS44Mzk4TDk1LjkxOCA1LjQzOTQ1WlwiIGZpbGw9XCIjMDY0RTNCXCIvPjwvc3ZnPlxyXG4gICAgICAgICAgPHA+Q3JhZnRpbmcgYm90YW5pY2FsIGV4Y2VsbGVuY2UgZm9yIHRoZSBtb2Rlcm4gc291bC4gUHVyZSBpbmdyZWRpZW50cywgZXRoaWNhbCBwcm9jZXNzZXMsIGxhc3RpbmcgcmFkaWFuY2UuPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItY29sdW1uXCI+XHJcbiAgICAgICAgICA8aDUgY2xhc3M9XCJsaW5rcy10aXRsZVwiPlNob3A8L2g1PlxyXG4gICAgICAgICAgPG5hdj5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Byb2R1Y3RzXCI+U2hvcCBBbGw8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvcHJvZHVjdC1jYXRlZ29yeS9iZXN0LXNlbGxlcnNcIj5CZXN0IFNlbGxlcnM8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvcHJvZHVjdC1jYXRlZ29yeS9uZXctYXJyaXZhbFwiPk5ldyBBcnJpdmFsPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL2dpZnQtY2FyZFwiPkdpZnQgQ2FyZDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICA8L25hdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbHVtblwiPlxyXG4gICAgICAgICAgPGg1IGNsYXNzPVwibGlua3MtdGl0bGVcIj5FeHBlcmllbmNlPC9oNT5cclxuICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9zdXN0YWluYWJpbGl0eVwiPlN1c3RhaW5hYmlsaXR5PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL291ci1zdG9yeVwiPk91ciBTdG9yeTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICA8L25hdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbHVtblwiPlxyXG4gICAgICAgICAgPGg1IGNsYXNzPVwibGlua3MtdGl0bGVcIj5TdXBwb3J0PC9oNT5cclxuICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9zaGlwcGluZy1hbmQtcmV0dXJuc1wiPlNoaXBwaW5nICYgUmV0dXJuczwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9wcml2YWN5LXBvbGljeVwiPlByaXZhY3kgUG9saWN5PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Rlcm1zLW9mLXNlcnZpY2VcIj5UZXJtcyBvZiBTZXJ2aWNlPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL2NvbnRhY3QtdXNcIj5Db250YWN0IFVzPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItYm90dG9tXCI+XHJcbiAgICAgICAgICA8c3Bhbj5BbGwgcmlnaHQgcmVzZXJ2ZWQ8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb290ZXI+XHJcblxyXG4gICAgPENvb2tpZUJhbm5lciB2LWlmPVwidWlIeWRyYXRlZFwiIC8+XHJcblxyXG4gIDwvcS1sYXlvdXQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvblVubW91bnRlZCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IGNhcnQgZnJvbSAnc3JjL3N0b3Jlcy9jYXJ0J1xyXG5pbXBvcnQgV2lzaGxpc3REcmF3ZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvV2lzaGxpc3REcmF3ZXIudnVlJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZSwgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcidcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdxdWFzYXInO1xyXG5pbXBvcnQgQ29va2llQmFubmVyIGZyb20gXCJzcmMvY29tcG9uZW50cy9Db29raWVCYW5uZXIudnVlXCI7XHJcbmltcG9ydCBBaUFzc2lzdGFudCBmcm9tIFwic3JjL2NvbXBvbmVudHMvQWlBc3Npc3RhbnQudnVlXCI7XHJcbmltcG9ydCBpbml0UHVzaCwgeyBzdWJzY3JpYmVUb1dlYlB1c2gsIGluaXROYXRpdmVQdXNoLCBjaGVja05hdGl2ZVBlcm1pc3Npb24gfSBmcm9tICdzcmMvYm9vdC9wdXNoLmpzJ1xyXG5pbXBvcnQgeyBpbml0TG9hZGluZ0JhciB9IGZyb20gJ2Jvb3QvbG9hZGluZy1iYXInXHJcbmltcG9ydCB7IGluaXRBdXRoUG9wdXAgfSBmcm9tICdib290L2F1dGgtZXhwaXJlZCdcclxuXHJcbmltcG9ydCB7IG1hdFNob3BwaW5nQ2FydCxcclxuICBtYXRGYXZvcml0ZUJvcmRlcixcclxuICBtYXRNZW51LFxyXG4gIG1hdEhvbWUsXHJcbiAgbWF0U3RvcmVmcm9udCxcclxuICBtYXRSZWNlaXB0LFxyXG4gIG1hdFBlcnNvbixcclxuICBtYXRBZG1pblBhbmVsU2V0dGluZ3MsXHJcbiAgbWF0QWRkLFxyXG4gIG1hdENsb3NlLFxyXG4gIG1hdFJlbW92ZX0gZnJvbSAnQHF1YXNhci9leHRyYXMvbWF0ZXJpYWwtaWNvbnMnXHJcbi8vaW1wb3J0IHsgZGVmaW5lQXN5bmNDb21wb25lbnQgfSBmcm9tICd2dWUnXHJcblxyXG5mdW5jdGlvbiBub3JtYWxpemVQZXJtaXNzaW9uKHZhbHVlKSB7XHJcbiAgaWYgKHZhbHVlID09PSAncHJvbXB0JykgeyByZXR1cm4gJ2RlZmF1bHQnIH0gZWxzZSBpZiAodmFsdWUgPT09ICdpbml0aWFsaXplZCcpIHsgcmV0dXJuICdncmFudGVkJyB9XHJcbiAgcmV0dXJuIHZhbHVlXHJcbn1cclxuXHJcbi8vIEV4cGxpY2l0bHkgZGVmaW5lIHRoZXNlIGFzIEFzeW5jIHRvIHJlbW92ZSB0aGVtIGZyb20gdGhlIENyaXRpY2FsIFBhdGhcclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuY29uc3QgX3Jlc3BvbnNpdmVDbGFzc2VzID0gJ2d0LXNtIGx0LW1kIGd0LW1kIGx0LXNtJ1xyXG4vKmNvbnN0IFFMaXN0ID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXIvc3JjL2NvbXBvbmVudHMvaXRlbS9RTGlzdC5qcycpKVxyXG5jb25zdCBRSXRlbSA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW0uanMnKSlcclxuY29uc3QgUUl0ZW1TZWN0aW9uID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXIvc3JjL2NvbXBvbmVudHMvaXRlbS9RSXRlbVNlY3Rpb24uanMnKSlcclxuY29uc3QgUUhlYWRlciA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyL3NyYy9jb21wb25lbnRzL2hlYWRlci9RSGVhZGVyLmpzJykpXHJcbmNvbnN0IFFEcmF3ZXIgPSBkZWZpbmVBc3luY0NvbXBvbmVudCgoKSA9PiBpbXBvcnQoJ3F1YXNhci9zcmMvY29tcG9uZW50cy9kcmF3ZXIvUURyYXdlci5qcycpKVxyXG5jb25zdCBRTGF5b3V0ID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXIvc3JjL2NvbXBvbmVudHMvbGF5b3V0L1FMYXlvdXQuanMnKSlcclxuY29uc3QgUVBhZ2VDb250YWluZXIgPSBkZWZpbmVBc3luY0NvbXBvbmVudCgoKSA9PiBpbXBvcnQoJ3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzJykpXHJcbmNvbnN0IFFTY3JvbGxPYnNlcnZlciA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyL3NyYy9jb21wb25lbnRzL3Njcm9sbC1vYnNlcnZlci9RU2Nyb2xsT2JzZXJ2ZXIuanMnKSlcclxuY29uc3QgUVJlc2l6ZU9ic2VydmVyID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdxdWFzYXIvc3JjL2NvbXBvbmVudHMvcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcycpKVxyXG5jb25zdCBRVG9vbGJhciA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyL3NyYy9jb21wb25lbnRzL3Rvb2xiYXIvUVRvb2xiYXIuanMnKSlcclxuY29uc3QgUVRvb2xiYXJUaXRsZSA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyL3NyYy9jb21wb25lbnRzL3Rvb2xiYXIvUVRvb2xiYXJUaXRsZS5qcycpKVxyXG4qL1xyXG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG4vLyBNb3ZlIHRoZXNlIGZyb20gc3RhbmRhcmQgaW1wb3J0cyB0byBBc3luYyBpbXBvcnRzXHJcbi8vY29uc3QgV2lzaGxpc3REcmF3ZXIgPSBkZWZpbmVBc3luY0NvbXBvbmVudCgoKSA9PiBpbXBvcnQoJ3NyYy9jb21wb25lbnRzL1dpc2hsaXN0RHJhd2VyLnZ1ZScpKVxyXG4vL2NvbnN0IEFpQXNzaXN0YW50ID0gZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy9BaUFzc2lzdGFudC52dWUnKSlcclxuXHJcbmNvbnN0IHBlcm1pc3Npb24gPSByZWYoJ2RlZmF1bHQnKVxyXG5jb25zdCBzdXBwb3J0ZWQgPSByZWYoZmFsc2UpXHJcbmNvbnN0IGlzU3VwZXJBZG1pbiA9IGNvbXB1dGVkKCgpID0+IGNhcnQuc3RhdGUudXNlcj8uaXNfc3VwZXJfYWRtaW4gPT09IHRydWUpXHJcblxyXG4vL2NvbnN0ICRxID0gdXNlUXVhc2FyKClcclxuY29uc3QgbW9iaWxlTWVudURyYXdlciA9IHJlZihmYWxzZSlcclxuXHJcbmNvbnN0IHdpc2hsaXN0RHJhd2VyT3BlbiA9IHJlZihmYWxzZSlcclxuY29uc3QgY2FydERyYXdlciA9IHJlZihmYWxzZSlcclxuXHJcbmxldCBzdGFydFggPSAwXHJcbmxldCBpc0RyYWdnaW5nID0gZmFsc2VcclxuXHJcbi8vIDEuIExvZ2ljIGZvciBTVEFSVCAoVG91Y2ggb3IgTW91c2UpXHJcbmNvbnN0IG9uU3RhcnQgPSAoeCkgPT4ge1xyXG4gIGlmIChtb2JpbGVNZW51RHJhd2VyLnZhbHVlIHx8IGNhcnREcmF3ZXIudmFsdWUgfHwgd2lzaGxpc3REcmF3ZXJPcGVuLnZhbHVlKSB7XHJcbiAgICBpc0RyYWdnaW5nID0gZmFsc2VcclxuICAgIHJldHVyblxyXG4gIH1cclxuICBzdGFydFggPSB4XHJcbiAgaXNEcmFnZ2luZyA9IHRydWVcclxufVxyXG5cclxuLy8gMi4gTG9naWMgZm9yIEVORCAoVG91Y2ggb3IgTW91c2UpXHJcbmNvbnN0IG9uRW5kID0gKGVuZFgpID0+IHtcclxuICBpZiAoIWlzRHJhZ2dpbmcpIHJldHVyblxyXG4gIGlzRHJhZ2dpbmcgPSBmYWxzZVxyXG5cclxuICBjb25zdCBkeCA9IGVuZFggLSBzdGFydFhcclxuICBjb25zdCBhYnNYID0gTWF0aC5hYnMoZHgpXHJcblxyXG4gIGlmIChhYnNYID4gNzApIHtcclxuICAgIGlmIChkeCA+IDApIHtcclxuICAgICAgbW9iaWxlTWVudURyYXdlci52YWx1ZSA9IHRydWUgLy8gU3dpcGUgUmlnaHRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhcnREcmF3ZXIudmFsdWUgPSB0cnVlIC8vIFN3aXBlIExlZnRcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIC0tLSBFVkVOVCBXUkFQUEVSUyAtLS1cclxuXHJcbi8vIE1vYmlsZSBIYW5kbGVyc1xyXG5jb25zdCBoYW5kbGVUb3VjaFN0YXJ0ID0gKGUpID0+IG9uU3RhcnQoZS50b3VjaGVzWzBdLmNsaWVudFgsIGUudG91Y2hlc1swXS5jbGllbnRZKVxyXG5jb25zdCBoYW5kbGVUb3VjaEVuZCA9IChlKSA9PiBvbkVuZChlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSlcclxuXHJcbi8vIERlc2t0b3AgSGFuZGxlcnMgKE1vdXNlKVxyXG5jb25zdCBoYW5kbGVNb3VzZURvd24gPSAoZSkgPT4gb25TdGFydChlLmNsaWVudFgsIGUuY2xpZW50WSlcclxuY29uc3QgaGFuZGxlTW91c2VVcCA9IChlKSA9PiBvbkVuZChlLmNsaWVudFgsIGUuY2xpZW50WSlcclxuXHJcbmNvbnN0IHRvZ2dsZUNhcnQgPSAoKSA9PiAoY2FydERyYXdlci52YWx1ZSA9ICFjYXJ0RHJhd2VyLnZhbHVlKVxyXG5jb25zdCB0b2dnbGVXaXNobGlzdERyYXdlciA9ICgpID0+ICh3aXNobGlzdERyYXdlck9wZW4udmFsdWUgPSAhd2lzaGxpc3REcmF3ZXJPcGVuLnZhbHVlKVxyXG5cclxuLy8gV3JhcCBjYXJ0IG1ldGhvZHMgc28gdGVtcGxhdGUgY2FuIGNhbGwgZGlyZWN0bHlcclxuY29uc3QgaW5jcmVhc2UgPSAoaWQpID0+IGNhcnQuaW5jcmVhc2UoaWQpXHJcbmNvbnN0IGRlY3JlYXNlID0gKGlkKSA9PiBjYXJ0LmRlY3JlYXNlKGlkKVxyXG5jb25zdCByZW1vdmUgPSAoaXRlbUtleT1udWxsLCBpdGVtQVBJa2V5PW51bGwpID0+IGNhcnQucmVtb3ZlKGl0ZW1LZXksaXRlbUFQSWtleSlcclxuXHJcbi8qZnVuY3Rpb24gb25QYW4oZXZ0KSB7XHJcbiAgaWYgKGV2dC5pc0ZpbmFsKSB7XHJcbiAgICAvL2lmIChldnQuZGlyZWN0aW9uID09PSAncmlnaHQnKSBjYXJ0RHJhd2VyLnZhbHVlID0gdHJ1ZVxyXG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxyXG4gICAgY29uc3Qgc3dpcGVQZXJjZW50ID0gKGV2dC5kaXN0YW5jZS54IC8gc2NyZWVuV2lkdGgpICogMTAwXHJcblxyXG4gICAgY29uc29sZS5sb2coJ1N3aXBlIHBlcmNlbnQ6Jywgc3dpcGVQZXJjZW50KVxyXG5cclxuICAgIGNvbnNvbGUubG9nKGV2dC5ldnQudGFyZ2V0LmNsb3Nlc3QoJy5xLWNhcm91c2VsJykpO1xyXG4gICAgaWYoc3dpcGVQZXJjZW50ID4gMjApIHtcclxuICAgICAgaWYgKGV2dC5kaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xyXG4gICAgICAgIGNhcnREcmF3ZXIudmFsdWUgPSB0cnVlXHJcbiAgICAgICAgY29uc29sZS5sb2coZXZ0KTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZihldnQuZGlyZWN0aW9uID09PSAncmlnaHQnKXtcclxuICAgICAgICBtb2JpbGVNZW51RHJhd2VyLnZhbHVlID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRG8gTk9UIGNhbGwgZXZ0LnByZXZlbnREZWZhdWx0KCkgdW5sZXNzIHlvdSB3YW50IHRvIGJsb2NrIGNoaWxkIGludGVyYWN0aW9uc1xyXG4gIH1cclxufSovXHJcblxyXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVTdWJzY3JpYmUoKSB7XHJcbiAgaWYgKFBsYXRmb3JtLmlzLmNhcGFjaXRvcikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gcmVxdWVzdCBwZXJtaXNzaW9uIHZpYSB0aGUgYm9vdCBoZWxwZXIgKHVzZXIgZ2VzdHVyZSlcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgaW5pdE5hdGl2ZVB1c2goKVxyXG4gICAgICBwZXJtaXNzaW9uLnZhbHVlID0gbm9ybWFsaXplUGVybWlzc2lvbihyZXN1bHQpXHJcbiAgICAgIGFsZXJ0KCdQZXJtaXNzaW9uIHN0YXR1czogJyArIHJlc3VsdClcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTmF0aXZlIHBlcm1pc3Npb24gZXJyb3InLCBlKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhd2FpdCBzdWJzY3JpYmVUb1dlYlB1c2goKVxyXG4gICAgcGVybWlzc2lvbi52YWx1ZSA9IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzdG9yZVJlYWR5ID0gcmVmKHByb2Nlc3MuZW52LlNFUlZFUikgLy8gSW1tZWRpYXRlIHN5bmNcclxuY29uc3QgdWlIeWRyYXRlZCA9IHJlZihmYWxzZSkgICAgICAgICAgICAgIC8vIERlZmVycmVkIGZ1bmN0aW9uYWwgVUlcclxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpXHJcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXHJcblxyXG5jb25zdCBub0RlbGF5Um91dGVzID0gWycvY2hlY2tvdXQnLCAnL2NhcnQnXVxyXG5cclxuY29uc3Qgc2hvdWxkRGVsYXlIeWRyYXRpb24gPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgcmV0dXJuICFub0RlbGF5Um91dGVzLmluY2x1ZGVzKHJvdXRlLnBhdGgpXHJcbn0pXHJcblxyXG5vbk1vdW50ZWQoKCkgPT4ge1xyXG4gIC8vIFBoYXNlIDE6IFNob3cgdGhlIGJhZGdlcyBpbW1lZGlhdGVseVxyXG4gIHN0b3JlUmVhZHkudmFsdWUgPSB0cnVlXHJcblxyXG4gIGNvbnN0IGhlYWRlckJ0bkNsaWNrID0gYXN5bmMoZSkgPT4ge1xyXG4gICAgYXdhaXQgc2NoZWR1bGVyKClcclxuICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1thcmlhLWxhYmVsXScpO1xyXG4gICAgaWYgKGJ0bikge1xyXG4gICAgICBjb25zdCBsYWJlbCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgeW91ciBzcGVjaWZpYyBidXR0b24gbGFiZWxzXHJcbiAgICAgICAgaWYgKGxhYmVsID09PSAnT3BlbiBtZW51Jykge1xyXG4gICAgICAgICAgbW9iaWxlTWVudURyYXdlci52YWx1ZSA9IHRydWVcclxuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsID09PSAnQWRkIHRvIHdpc2hsaXN0Jykge1xyXG4gICAgICAgICAgd2lzaGxpc3REcmF3ZXJPcGVuLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWwgPT09ICdWaWV3IGNhcnQnKSB7XHJcbiAgICAgICAgICBjYXJ0RHJhd2VyLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGVhZGVyQnRuQ2xpY2ssIHtwYXNzaXZlOiB0cnVlfSk7XHJcbiAgLy8gUGhhc2UgMjogV2FpdCBmb3IgdGhlIEhlcm8gdG8gcGFpbnQsIHRoZW4gbG9hZCB0aGUgaGVhdnkgc3R1ZmZcclxuICBjb25zdCBzY2hlZHVsZXIgPSBhc3luYyAoKSA9PiB7XHJcblxyXG4gICAgaWYgKHVpSHlkcmF0ZWQudmFsdWUpIHJldHVyblxyXG5cclxuLy8gMi4gSW1tZWRpYXRlIGNsZWFudXAgb2YgbGlzdGVuZXJzXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2NoZWR1bGVyKVxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNjaGVkdWxlcilcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2NoZWR1bGVyKVxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGVhZGVyQnRuQ2xpY2spO1xyXG5cclxuICAgIC8vIDEuIFByZS1sb2FkIHRoZSBoZWF2eSBzY3JpcHRzIGluIHRoZSBiYWNrZ3JvdW5kXHJcbiAgICAvLyBUaGlzIGhhcHBlbnMgd2hpbGUgdGhlIHVzZXIgaXMgbG9va2luZyBhdCB0aGUgc3RhdGljIFNTUiBwYWdlXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBXZSBkeW5hbWljLWltcG9ydCB0aGUgdXRpbGl0eSwgd2hpY2ggdGhlbiBkeW5hbWljLWltcG9ydHMgUXVhc2FyLlxyXG4gICAgICAvLyBUaGlzICdkb3VibGUtaG9wJyB1c3VhbGx5IGJyZWFrcyB0aGUgYXV0by1wcmVsb2FkIHNjYW5uZXIuXHJcbiAgICAgIGNvbnN0IHtoeWRyYXRlfSA9IGF3YWl0IGltcG9ydCgnLi4vdXRpbHMvbGF6eS1xdWFzYXIuanMnKVxyXG4gICAgICBhd2FpdCBoeWRyYXRlKClcclxuXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgdWlIeWRyYXRlZC52YWx1ZSA9IHRydWVcclxuICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkh5ZHJhdGlvbiBwcmVmZXRjaCBmYWlsZWRcIiwgZSlcclxuICAgICAgdWlIeWRyYXRlZC52YWx1ZSA9IHRydWUgLy8gRmFsbGJhY2tcclxuICAgIH1cclxuXHJcbiAgICBpbml0TG9hZGluZ0Jhcihyb3V0ZXIpXHJcbiAgICBpbml0QXV0aFBvcHVwKHJvdXRlcik7XHJcbiAgICAvLyAxLiBBTFdBWVMgaW5pdGlhbGl6ZSB0cmFja2luZyAoQWJhbmRvbmVkIENhcnQgbG9naWMpXHJcbiAgICAvLyBUaGlzIGRvZXNuJ3QgYXNrIGZvciBwZXJtaXNzaW9uLCBpdCBqdXN0IHNldHMgdXAgbGlzdGVuZXJzLlxyXG4gICAgaWYgKCB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyB8fCBQbGF0Zm9ybS5pcy5jYXBhY2l0b3IgKSB7XHJcbiAgICAgIGluaXRQdXNoKHsgcm91dGVyIH0pXHJcbiAgICAgIGNvbnN0IGluaXRpYWxQZXJtaXNzaW9ucyA9IGF3YWl0IGNoZWNrTmF0aXZlUGVybWlzc2lvbigpO1xyXG4gICAgICBwZXJtaXNzaW9uLnZhbHVlID0gbm9ybWFsaXplUGVybWlzc2lvbihpbml0aWFsUGVybWlzc2lvbnMpXHJcbiAgICAgIGNvbnNvbGUubG9nKCfwn5uSIENhcnQgdHJhY2tpbmcgYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChQbGF0Zm9ybS5pcy5jYXBhY2l0b3IpIHtcclxuICAgICAgc3VwcG9ydGVkLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAvKmNvbnN0IHJlc3VsdCA9IGF3YWl0IGluaXROYXRpdmVQdXNoKClcclxuICAgICAgcGVybWlzc2lvbi52YWx1ZSA9IG5vcm1hbGl6ZVBlcm1pc3Npb24ocmVzdWx0KSovXHJcbiAgICB9IGVsc2UgaWYgKCdOb3RpZmljYXRpb24nIGluIHdpbmRvdykge1xyXG4gICAgICBzdXBwb3J0ZWQudmFsdWUgPSB0cnVlXHJcbiAgICAgIHBlcm1pc3Npb24udmFsdWUgPSBub3JtYWxpemVQZXJtaXNzaW9uKE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uKVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCwge3Bhc3NpdmU6IHRydWV9KVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGFuZGxlVG91Y2hFbmQsIHtwYXNzaXZlOiB0cnVlfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24sIHtwYXNzaXZlOiB0cnVlfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCwge3Bhc3NpdmU6IHRydWV9KVxyXG5cclxuICB9XHJcbiAgICAvLyDwn5qoIFRISVMgSVMgVEhFIElNUE9SVEFOVCBQQVJUXHJcbiAgaWYgKCFzaG91bGREZWxheUh5ZHJhdGlvbi52YWx1ZSkge1xyXG4gICAgLy8g8J+RiSBoeWRyYXRlIGltbWVkaWF0ZWx5XHJcbiAgICBzY2hlZHVsZXIoKVxyXG4gICAgcmV0dXJuXHJcbiAgfSBlbHNlIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY2hlZHVsZXIsIHtwYXNzaXZlOiB0cnVlfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzY2hlZHVsZXIsIHtwYXNzaXZlOiB0cnVlfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2NoZWR1bGVyLCB7cGFzc2l2ZTogdHJ1ZX0pXHJcblxyXG4gICAgLy8gU2FmZXR5IGZhbGxiYWNrOiBIeWRyYXRlIGFmdGVyIDUgc2Vjb25kcyBpZiBubyBpbnRlcmFjdGlvblxyXG4gICAgc2V0VGltZW91dChzY2hlZHVsZXIsIDMwMDApXHJcbiAgfVxyXG5cclxufSlcclxub25Vbm1vdW50ZWQoKCkgPT4ge1xyXG4gIC8vIENyaXRpY2FsIGNsZWFudXBcclxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnQpXHJcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGFuZGxlVG91Y2hFbmQpXHJcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlRG93bilcclxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApXHJcbn0pXHJcbndhdGNoKCgpID0+IGNhcnQuc3RhdGUuZHJhd2VyT3BlbiwgdmFsID0+IHtcclxuICBpZih2YWwgPT09IHRydWUpIHtcclxuICAgIGNhcnREcmF3ZXIudmFsdWUgPSB2YWw7XHJcbiAgICBjYXJ0LnN0YXRlLmRyYXdlck9wZW4gPSBmYWxzZTtcclxuICAgIC8vY2FydC5mZXRjaENhcnQoKVxyXG4gIH1cclxufSlcclxuXHJcbjwvc2NyaXB0PiJdLCJmaWxlIjoiYXNzZXRzL01haW5MYXlvdXQtRDQtcEVuV3YuanMifQ==