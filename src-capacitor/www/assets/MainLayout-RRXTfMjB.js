const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-0iPSr63v.js","./index-B4eBuDfB.js","./index-CqsEWChN.css","./index-Cc29tare.js","./lazy-quasar--dZaCbB9.js"])))=>i.map(i=>d[i]);
import { c as createComponent, h, a as hMergeSlot, b as computed, d as hSlot, w as withDirectives, u as useDarkProps, g as getCurrentInstance, e as useDark, f as debounce, i as watch, s as setHorizontalScrollPosition, o as onDeactivated, j as onActivated, k as setVerticalScrollPosition, l as onBeforeUnmount, T as TouchPan, r as ref, m as between, _ as _export_sfc, n as resolveComponent, p as openBlock, q as createBlock, t as withCtx, v as createBaseVNode, x as createElementBlock, F as Fragment, y as renderList, z as createVNode, A as createCommentVNode, B as toDisplayString, Q as QBtn, C as withModifiers, D as onMounted, E as matClose, G as wishlist, H as cart, I as Transition, J as QIcon, K as normalizeClass, L as QAvatar, M as QSeparator, N as QInput, O as withKeys, P as QCard, R as nextTick, S as matSmartToy, U as matSend, V as matChat, X as Platform, Y as __vitePreload, Z as Plugin, $ as Dialog, a0 as createStaticVNode, a1 as createTextVNode, a2 as QItem, a3 as QItemSection, a4 as Ripple, a5 as QBanner, a6 as normalizeStyle, a7 as useQuasar, a8 as useRoute, a9 as useRouter, aa as onUnmounted, ab as matError, ac as matSignalWifiOff, ad as matWifi, ae as matRemove, af as matAdd, ag as matAdminPanelSettings, ah as matPerson, ai as matReceipt, aj as matStorefront, ak as matHome, al as matMenu, am as matFavoriteBorder, an as matShoppingCart } from "./index-B4eBuDfB.js";
import { Q as QScrollObserver, a as QHeader, b as QToolbar, c as QToolbarTitle, d as QDrawer, e as QPageContainer, f as QLayout } from "./QLayout-CDqCAJus.js";
import { u as useHydration, Q as QResizeObserver } from "./QResizeObserver-B90vPzSX.js";
import QList from "./QList-BNLb0vFw.js";
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
    const isHydrated = ref(false);
    async function addToCart(p) {
      cart.add(p.id, 1);
    }
    async function removeFromWishlist(id) {
      try {
        await wishlist.toggleWishlistItem(id);
        console.log(wishlist.value);
      } catch (err) {
        console.error("Error removing from wishlist:", err);
      }
    }
    onMounted(() => {
      isHydrated.value = true;
    });
    const __returned__ = { isHydrated, addToCart, removeFromWishlist, onMounted, ref, get cart() {
      return cart;
    }, get wishlist() {
      return wishlist;
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
        $setup.wishlist.state.items && $setup.wishlist.state.items.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_1$3, " Your wishlist is empty. ")) : $setup.wishlist.state.items && $setup.wishlist.state.items.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList($setup.wishlist.state.items, (product) => {
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
const CookieBanner = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "CookieBanner.vue"]]);
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
        const res = await fetch(`${"https://nuxt.meidanm.com"}/wp-json/ai-chat/v1/message`, {
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
      class: "fixed-bottom-left q-mb-md q-ml-md",
      style: { "z-index": "2999" },
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
const APP_SERVER_KEY = "BNSai4j0Ar-yQKbrW4C8URlQDZLR30e-STVez4765Hvc2RZsg2TJirL4MHyILJQdWwSg1PrRtdFywoAYYdnZibw";
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
    const res = await fetch(`${"https://nuxt.meidanm.com"}/wp-json/pwa/v1/save-subscription`, {
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
      "./index-0iPSr63v.js"
    ), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url);
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
      "./index-0iPSr63v.js"
    ), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url);
    PushNotifications = pushModule.PushNotifications;
    PushNotifications.addListener("registration", async (token) => {
      console.log("🟢 Native token:", token?.value);
      try {
        const deviceId = getDeviceId();
        const cartToken = localStorage.getItem("wc_cart_token") || null;
        await fetch(`${"https://nuxt.meidanm.com"}/wp-json/pwa/v1/save-subscription`, {
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
    await fetch(`${"https://nuxt.meidanm.com"}/wp-json/pwa/v1/update-cart-token`, {
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
          "./index-0iPSr63v.js"
        ), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url);
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
    function formatCurrency(amountStr, {
      minorUnit = 2,
      decimalSeparator = ".",
      prefix = "$",
      suffix = ""
    } = {}) {
      const amount = parseInt(amountStr, 10);
      if (isNaN(amount)) return `${prefix}0${decimalSeparator}${"0".repeat(minorUnit)}${suffix}`;
      const factor = Math.pow(10, minorUnit);
      const number = amount / factor;
      return `${number.toLocaleString(void 0, {
        minimumFractionDigits: minorUnit,
        maximumFractionDigits: minorUnit
      })}${suffix}${prefix}`;
    }
    async function hideSplash() {
      if (!Platform.is.capacitor) return;
      try {
        const { SplashScreen } = await __vitePreload(async () => {
          const { SplashScreen: SplashScreen2 } = await import(
            /* @vite-ignore */
            "./index-Cc29tare.js"
          );
          return { SplashScreen: SplashScreen2 };
        }, true ? __vite__mapDeps([3,1,2]) : void 0, import.meta.url);
        await SplashScreen.hide({ fadeOutDuration: 500 });
      } catch (err) {
        console.warn("SplashScreen hide failed", err);
      }
    }
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
    const $q = useQuasar();
    const mobileMenuDrawer = ref(false);
    const wishlistDrawerOpen = ref(false);
    const cartDrawer = ref(false);
    const drawerWidth = computed(() => Math.min(400, $q.screen.width * 0.9));
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
    async function isIncognito() {
      try {
        if (!("storage" in navigator && "persist" in navigator.storage)) return false;
        const persisted = await navigator.storage.persist();
        return !persisted;
      } catch {
        return false;
      }
    }
    const storeReady = ref(false);
    const uiHydrated = ref(false);
    const route = useRoute();
    const router = useRouter();
    const noDelayRoutes = ["/checkout/", "/cart/", "/my-account/"];
    const shouldDelayHydration = computed(() => {
      return !noDelayRoutes.includes(route.path);
    });
    const initConnectivityListeners = () => {
      if (window.__CONNECTIVITY_INITIALIZED__) return;
      window.__CONNECTIVITY_INITIALIZED__ = true;
      let wasOffline = !navigator.onLine;
      const updateOnlineStatus = async (isOnline) => {
        console.log(isOnline);
        const becameOnline = isOnline && wasOffline;
        const becameOffline = !isOnline && !wasOffline;
        if (!becameOnline && !becameOffline) return;
        wasOffline = !isOnline;
        cart.state.offline = !isOnline;
        if (becameOnline) {
          $q.notify({ type: "positive", message: "You are back online!", icon: matWifi, timeout: 3e3 });
          await cart.fetchCart();
          await cart.fetchWishlistItems();
        } else {
          $q.notify({ type: "warning", message: "You are offline. Some features may be limited.", icon: matSignalWifiOff, timeout: 3e3 });
        }
      };
      window.addEventListener("online", () => updateOnlineStatus(true));
      window.addEventListener("offline", () => updateOnlineStatus(false));
      navigator.serviceWorker.addEventListener("message", ({ data }) => {
        console.log(data);
        if (data.type === "OFFLINE") {
          updateOnlineStatus(false);
        } else if (data.type === "ONLINE") {
          updateOnlineStatus(true);
        }
      });
      navigator.connection?.addEventListener("change", async () => {
        try {
          await fetch(window.location.origin, { method: "HEAD", cache: "no-store" });
          updateOnlineStatus(true);
        } catch {
          updateOnlineStatus(false);
        }
      });
      console.log("[connectivity] listeners attached");
    };
    onMounted(async () => {
      storeReady.value = true;
      if (!("serviceWorker" in navigator)) return;
      const warm = () => {
        navigator.serviceWorker.ready.then((registration) => {
          registration.active?.postMessage({ type: "WARM_PRODUCTS_CACHE" });
        });
      };
      await router.isReady();
      const scheduler = async () => {
        if (uiHydrated.value) return;
        window.removeEventListener("scroll", scheduler);
        window.removeEventListener("mousemove", scheduler);
        window.removeEventListener("touchstart", scheduler);
        try {
          const { hydrate } = await __vitePreload(async () => {
            const { hydrate: hydrate2 } = await import("./lazy-quasar--dZaCbB9.js");
            return { hydrate: hydrate2 };
          }, true ? __vite__mapDeps([4,1,2]) : void 0, import.meta.url);
          await hydrate();
          requestAnimationFrame(() => {
            uiHydrated.value = true;
            hideSplash();
            initConnectivityListeners();
            warm();
            initLoadingBar(router);
            initAuthPopup(router);
            initPush({ router });
            if (Platform.is.capacitor) {
              supported.value = true;
              checkNativePermission().then((initialPermissions) => {
                permission.value = normalizePermission(initialPermissions);
              });
            } else if ("Notification" in window) {
              const perm = normalizePermission(Notification.permission);
              permission.value = perm;
              if (perm !== "granted") {
                isIncognito().then((incognito) => {
                  if (!incognito) {
                    supported.value = true;
                  }
                });
              }
            }
            window.addEventListener("touchstart", handleTouchStart, { passive: true });
            window.addEventListener("touchend", handleTouchEnd, { passive: true });
            window.addEventListener("mousedown", handleMouseDown, { passive: true });
            window.addEventListener("mouseup", handleMouseUp, { passive: true });
          });
        } catch (e) {
          console.error("Hydration prefetch failed", e);
          uiHydrated.value = true;
        }
      };
      const headerBtnClick = async (e) => {
        await scheduler();
        const btn = e.target.closest("[aria-label]");
        if (btn) {
          const label = btn.getAttribute("aria-label");
          requestAnimationFrame(() => {
            if (label === "Open menu") mobileMenuDrawer.value = true;
            else if (label === "Add to wishlist") wishlistDrawerOpen.value = true;
            else if (label === "View cart") cartDrawer.value = true;
          });
        }
      };
      document.querySelector("header").addEventListener("click", headerBtnClick, { passive: true });
      if (!shouldDelayHydration.value) {
        scheduler();
      } else {
        const cleanup = () => {
          window.removeEventListener("scroll", scheduler);
          window.removeEventListener("mousemove", scheduler);
          window.removeEventListener("touchstart", scheduler);
          clearTimeout(fallbackTimer);
        };
        const fallbackTimer = setTimeout(() => {
          cleanup();
          scheduler();
        }, 3e3);
        window.addEventListener("scroll", scheduler, { passive: true });
        window.addEventListener("mousemove", scheduler, { passive: true });
        window.addEventListener("touchstart", scheduler, { passive: true });
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
    watch(
      () => cart.state.rejected_items,
      (rejected) => {
        if (rejected?.length) {
          rejected.forEach((item) => {
            $q.notify({
              type: "warning",
              message: `"${item.name}" was removed — no longer available`,
              icon: matError,
              timeout: 8e3
            });
          });
        }
      }
    );
    const __returned__ = { formatCurrency, hideSplash, normalizePermission, _responsiveClasses, permission, supported, isSuperAdmin, $q, mobileMenuDrawer, wishlistDrawerOpen, cartDrawer, drawerWidth, get startX() {
      return startX;
    }, set startX(v) {
      startX = v;
    }, get isDragging() {
      return isDragging;
    }, set isDragging(v) {
      isDragging = v;
    }, onStart, onEnd, handleTouchStart, handleTouchEnd, handleMouseDown, handleMouseUp, toggleCart, toggleWishlistDrawer, increase, decrease, remove, handleSubscribe, isIncognito, storeReady, uiHydrated, route, router, noDelayRoutes, shouldDelayHydration, initConnectivityListeners, ref, computed, watch, onMounted, onUnmounted, get useQuasar() {
      return useQuasar;
    }, get cart() {
      return cart;
    }, get wishlist() {
      return wishlist;
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
    }, get matWifi() {
      return matWifi;
    }, get matSignalWifiOff() {
      return matSignalWifiOff;
    }, get matError() {
      return matError;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = {
  key: 0,
  class: "minimal-fallback"
};
const _hoisted_2 = { class: "q-header q-layout__section--marginal sticky" };
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
const _hoisted_13 = { class: "q-ml-sm flex" };
const _hoisted_14 = ["src"];
const _hoisted_15 = { class: "product-meta" };
const _hoisted_16 = { key: 0 };
const _hoisted_17 = { key: 1 };
const _hoisted_18 = { class: "row items-center" };
const _hoisted_19 = { class: "qty-wrap" };
const _hoisted_20 = { class: "q-mx-sm" };
const _hoisted_21 = {
  key: 1,
  class: "q-pa-sm row items-center"
};
const _hoisted_22 = {
  key: 2,
  class: "cart-details sticky"
};
const _hoisted_23 = { class: "cart-totals" };
const _hoisted_24 = { class: "flex justify-between" };
const _hoisted_25 = { class: "buttons-wrap" };
const _hoisted_26 = {
  key: 4,
  class: "q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded bg-primary text-white q-btn--actionable q-focusable q-hoverable q-btn--fab fixed-bottom-left q-mb-md q-ml-md z-max",
  tabindex: "0",
  type: "button",
  "aria-label": "Open chat"
};
const _hoisted_27 = { class: "container flex justify-between" };
const _hoisted_28 = { class: "footer-column" };
const _hoisted_29 = { class: "footer-column" };
const _hoisted_30 = { class: "footer-column" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  const _component_router_link = resolveComponent("router-link");
  return !$setup.uiHydrated && $setup.shouldDelayHydration ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
      createVNode(QHeader, { class: "sticky" }, {
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
                      $setup.storeReady && $setup.wishlist.state.items && Object.keys($setup.wishlist.state.items).length > 0 ? (openBlock(), createBlock(QBadge, {
                        key: 0,
                        floating: "",
                        color: "red"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(Object.keys($setup.wishlist.state.items).length), 1)
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
        width: $setup.drawerWidth,
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
                class: "bg-secondary text-white q-ma-md rounded-borders shadow-2",
                "inline-actions": ""
              }, {
                action: withCtx(() => [
                  createVNode(QBtn, {
                    style: { "line-height": "1" },
                    outline: "",
                    padding: "sm",
                    color: "secondary",
                    "text-color": "white",
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
      }, 8, ["modelValue", "width"])) : createCommentVNode("", true),
      $setup.uiHydrated ? (openBlock(), createBlock(QDrawer, {
        key: 1,
        modelValue: $setup.wishlistDrawerOpen,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.wishlistDrawerOpen = $event),
        side: "right",
        overlay: "",
        width: $setup.drawerWidth,
        behavior: "mobile"
      }, {
        default: withCtx(() => [
          createVNode($setup["WishlistDrawer"])
        ]),
        _: 1
      }, 8, ["modelValue", "width"])) : createCommentVNode("", true),
      $setup.uiHydrated ? (openBlock(), createBlock(QDrawer, {
        key: 2,
        modelValue: $setup.cartDrawer,
        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.cartDrawer = $event),
        side: "right",
        overlay: "",
        behavior: "mobile",
        width: $setup.drawerWidth,
        class: "cart-drawer",
        "touch-area-width": 250
      }, {
        default: withCtx(() => [
          createVNode(QNoSsr, null, {
            default: withCtx(() => [
              createVNode(QScrollArea, {
                visible: false,
                class: "fit"
              }, {
                default: withCtx(() => [
                  _cache[30] || (_cache[30] = createBaseVNode("h4", { class: "sticky" }, "Cart", -1)),
                  $setup.cart.hasItems.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.cart.state.items, (item) => {
                      return openBlock(), createElementBlock("div", {
                        key: item.id,
                        class: normalizeClass(["q-pa-sm row items-center", [item.key.includes("offline") ? "offline-item" : ""]])
                      }, [
                        createBaseVNode("div", _hoisted_13, [
                          item.images ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: $setup.cart.state.offline === true ? item?.images[0]?.src : item.images[0]?.thumbnail,
                            style: { "width": "70px", "height": "70px", "object-fit": "cover" }
                          }, null, 8, _hoisted_14)) : createCommentVNode("", true),
                          createBaseVNode("div", _hoisted_15, [
                            createBaseVNode("div", null, toDisplayString(item.name), 1),
                            item.variation && item.variation.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(item.variation, (variation, index) => {
                                return openBlock(), createElementBlock("div", { key: index }, toDisplayString(variation.attribute) + ": " + toDisplayString(variation.value), 1);
                              }), 128))
                            ])) : createCommentVNode("", true),
                            item.prices ? (openBlock(), createElementBlock("div", _hoisted_17, toDisplayString($setup.formatCurrency(
                              item.prices.price,
                              {
                                minorUnit: item.prices?.currency_minor_unit ?? 2,
                                decimalSeparator: item.prices?.currency_decimal_separator ?? ".",
                                prefix: item.prices?.currency_prefix ?? "₪",
                                suffix: item.prices?.currency_suffix ?? ""
                              }
                            )), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("div", _hoisted_19, [
                            createVNode(QBtn, {
                              size: "xs",
                              padding: "xs",
                              flat: true,
                              icon: $setup.matRemove,
                              onClick: ($event) => $setup.decrease(item.key),
                              disable: item.quantity === 1
                            }, null, 8, ["icon", "onClick", "disable"]),
                            createBaseVNode("span", _hoisted_20, toDisplayString(item.quantity), 1),
                            createVNode(QBtn, {
                              size: "xs",
                              padding: "xs",
                              flat: true,
                              icon: $setup.matAdd,
                              onClick: ($event) => $setup.increase(item.id)
                            }, null, 8, ["icon", "onClick"])
                          ]),
                          createVNode(QBtn, {
                            outline: true,
                            size: "xs",
                            padding: "xs",
                            icon: $setup.matClose,
                            onClick: ($event) => $setup.remove(item.key, item.remote_key),
                            class: "q-ml-sm"
                          }, null, 8, ["icon", "onClick"])
                        ])
                      ], 2);
                    }), 128))
                  ])) : (openBlock(), createElementBlock("div", _hoisted_21, [
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
                  ])),
                  $setup.cart.hasItems.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
                    createBaseVNode("div", _hoisted_23, [
                      createBaseVNode("div", _hoisted_24, [
                        _cache[28] || (_cache[28] = createBaseVNode("span", null, "Subtotal:", -1)),
                        _cache[29] || (_cache[29] = createTextVNode()),
                        createBaseVNode("span", null, toDisplayString($setup.formatCurrency(
                          $setup.cart.state.cart_array?.totals?.total_price ? $setup.cart.state.cart_array.totals.total_price : $setup.cart.state?.totals?.total_price,
                          {
                            minorUnit: $setup.cart.state?.totals?.currency_minor_unit ?? 2,
                            decimalSeparator: $setup.cart.state?.totals?.currency_decimal_separator ?? ".",
                            prefix: $setup.cart.state?.totals?.currency_prefix ?? "₪",
                            suffix: $setup.cart.state?.totals?.currency_suffix ?? ""
                          }
                        )), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_25, [
                      createVNode(_component_router_link, { to: "/checkout/" }, {
                        default: withCtx(() => [
                          createVNode(QBtn, {
                            color: "secondary",
                            label: "Checkout"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_router_link, { to: "/cart/" }, {
                        default: withCtx(() => [
                          createVNode(QBtn, {
                            outline: true,
                            color: "transparent",
                            label: "View Cart"
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "width"])) : createCommentVNode("", true),
      $setup.uiHydrated ? (openBlock(), createBlock($setup["AiAssistant"], { key: 3 })) : (openBlock(), createElementBlock("button", _hoisted_26, [..._cache[31] || (_cache[31] = [
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
        createBaseVNode("div", _hoisted_27, [
          _cache[45] || (_cache[45] = createBaseVNode("div", { class: "footer-column first" }, [
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
          createBaseVNode("div", _hoisted_28, [
            _cache[36] || (_cache[36] = createBaseVNode("h5", { class: "links-title" }, "Shop", -1)),
            createBaseVNode("nav", null, [
              createVNode(_component_router_link, { to: "/products" }, {
                default: withCtx(() => [..._cache[32] || (_cache[32] = [
                  createTextVNode("Shop All", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/product-category/best-sellers" }, {
                default: withCtx(() => [..._cache[33] || (_cache[33] = [
                  createTextVNode("Best Sellers", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/product-category/new-arrival" }, {
                default: withCtx(() => [..._cache[34] || (_cache[34] = [
                  createTextVNode("New Arrival", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/gift-card" }, {
                default: withCtx(() => [..._cache[35] || (_cache[35] = [
                  createTextVNode("Gift Card", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_29, [
            _cache[39] || (_cache[39] = createBaseVNode("h5", { class: "links-title" }, "Experience", -1)),
            createBaseVNode("nav", null, [
              createVNode(_component_router_link, { to: "/sustainability" }, {
                default: withCtx(() => [..._cache[37] || (_cache[37] = [
                  createTextVNode("Sustainability", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/our-story" }, {
                default: withCtx(() => [..._cache[38] || (_cache[38] = [
                  createTextVNode("Our Story", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_30, [
            _cache[44] || (_cache[44] = createBaseVNode("h5", { class: "links-title" }, "Support", -1)),
            createBaseVNode("nav", null, [
              createVNode(_component_router_link, { to: "/shipping-and-returns" }, {
                default: withCtx(() => [..._cache[40] || (_cache[40] = [
                  createTextVNode("Shipping & Returns", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/privacy-policy" }, {
                default: withCtx(() => [..._cache[41] || (_cache[41] = [
                  createTextVNode("Privacy Policy", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/terms-of-service" }, {
                default: withCtx(() => [..._cache[42] || (_cache[42] = [
                  createTextVNode("Terms of Service", -1)
                ])]),
                _: 1
              }),
              createVNode(_component_router_link, { to: "/contact-us" }, {
                default: withCtx(() => [..._cache[43] || (_cache[43] = [
                  createTextVNode("Contact Us", -1)
                ])]),
                _: 1
              })
            ])
          ]),
          _cache[46] || (_cache[46] = createBaseVNode("div", { class: "footer-bottom" }, [
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


//# sourceMappingURL=data:application/json;base64,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Q0FBK0I7QUFBQSxpQ0FBQyxNQUFXO0FBQUEsa0NBQVgsZUFBVztBQUFBOzs7Y0FDM0RBLFlBQW9ELDBCQUF2QyxJQUFHLGdCQUFZO0FBQUEsaUNBQUMsTUFBUztBQUFBLGtDQUFULGFBQVM7QUFBQTs7Ozs7VUFHMUNMLGdCQU1NLE9BTk4sYUFNTTtBQUFBLFlBTEosNEJBQUFBLGdCQUF1QyxRQUFuQyxPQUFNLGlCQUFjLGNBQVU7QUFBQSxZQUNsQ0EsZ0JBR007QUFBQSxjQUZKSyxZQUE4RCwwQkFBakQsSUFBRyxxQkFBaUI7QUFBQSxpQ0FBQyxNQUFjO0FBQUEsa0NBQWQsa0JBQWM7QUFBQTs7O2NBQ2hEQSxZQUFvRCwwQkFBdkMsSUFBRyxnQkFBWTtBQUFBLGlDQUFDLE1BQVM7QUFBQSxrQ0FBVCxhQUFTO0FBQUE7Ozs7O1VBRzFDTCxnQkFRTSxPQVJOLGFBUU07QUFBQSxZQVBKLDRCQUFBQSxnQkFBb0MsUUFBaEMsT0FBTSxpQkFBYyxXQUFPO0FBQUEsWUFDL0JBLGdCQUtNO0FBQUEsY0FKSkssWUFBd0UsMEJBQTNELElBQUcsMkJBQXVCO0FBQUEsaUNBQUMsTUFBa0I7QUFBQSxrQ0FBbEIsc0JBQWtCO0FBQUE7OztjQUMxREEsWUFBOEQsMEJBQWpELElBQUcscUJBQWlCO0FBQUEsaUNBQUMsTUFBYztBQUFBLGtDQUFkLGtCQUFjO0FBQUE7OztjQUNoREEsWUFBa0UsMEJBQXJELElBQUcsdUJBQW1CO0FBQUEsaUNBQUMsTUFBZ0I7QUFBQSxrQ0FBaEIsb0JBQWdCO0FBQUE7OztjQUNwREEsWUFBc0QsMEJBQXpDLElBQUcsaUJBQWE7QUFBQSxpQ0FBQyxNQUFVO0FBQUEsa0NBQVYsY0FBVTtBQUFBOzs7OztzQ0FHNUNMLGdCQUVNLFNBRkQsT0FBTSxtQkFBZTtBQUFBLFlBQ3hCQSxnQkFBK0IsY0FBekIsb0JBQWtCO0FBQUE7OztNQUtWLGtDQUFwQkQsWUFBa0MiLCJuYW1lcyI6WyJub2RlIiwiX2hvaXN0ZWRfMyIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2hvaXN0ZWRfMSIsIl9vcGVuQmxvY2siLCJfRnJhZ21lbnQiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX3dpdGhNb2RpZmllcnMiLCJfaG9pc3RlZF8yIiwiX1RyYW5zaXRpb24iLCJfcmVuZGVyTGlzdCIsIl9ub3JtYWxpemVDbGFzcyIsIkxvYWRpbmdCYXIiLCJTcGxhc2hTY3JlZW4iLCJoeWRyYXRlIl0sImlnbm9yZUxpc3QiOlswLDEsMiwzLDYsN10sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9iYWRnZS9RQmFkZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL25vLXNzci9RTm9Tc3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Njcm9sbC1hcmVhL1Njcm9sbEFyZWFDb250cm9scy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2Nyb2xsLWFyZWEvUVNjcm9sbEFyZWEuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XaXNobGlzdERyYXdlci52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db29raWVCYW5uZXIudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zcGFjZS9RU3BhY2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Jhci9RQmFyLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQWlBc3Npc3RhbnQudnVlIiwiLi4vLi4vLi4vc3JjL2Jvb3QvcHVzaC5uYXRpdmUuanMiLCIuLi8uLi8uLi9zcmMvYm9vdC9sb2FkaW5nLWJhci5qcyIsIi4uLy4uLy4uL3NyYy9ib290L2F1dGgtZXhwaXJlZC5qcyIsIi4uLy4uLy4uL3NyYy9sYXlvdXRzL01haW5MYXlvdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5jb25zdCBhbGlnblZhbHVlcyA9IFsgJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQmFkZ2UnLFxuXG4gIHByb3BzOiB7XG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIGZsb2F0aW5nOiBCb29sZWFuLFxuICAgIHRyYW5zcGFyZW50OiBCb29sZWFuLFxuICAgIG11bHRpTGluZTogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW4sXG5cbiAgICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gICAgYWxpZ246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBhbGlnblZhbHVlcy5pbmNsdWRlcyh2KVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHByb3BzLmFsaWduICE9PSB2b2lkIDBcbiAgICAgICAgPyB7IHZlcnRpY2FsQWxpZ246IHByb3BzLmFsaWduIH1cbiAgICAgICAgOiBudWxsXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gcHJvcHMub3V0bGluZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmNvbG9yIHx8IHByb3BzLnRleHRDb2xvclxuICAgICAgICA6IHByb3BzLnRleHRDb2xvclxuXG4gICAgICByZXR1cm4gJ3EtYmFkZ2UgZmxleCBpbmxpbmUgaXRlbXMtY2VudGVyIG5vLXdyYXAnXG4gICAgICAgICsgYCBxLWJhZGdlLS0keyBwcm9wcy5tdWx0aUxpbmUgPT09IHRydWUgPyAnbXVsdGknIDogJ3NpbmdsZScgfS1saW5lYFxuICAgICAgICArIChwcm9wcy5vdXRsaW5lID09PSB0cnVlXG4gICAgICAgICAgPyAnIHEtYmFkZ2UtLW91dGxpbmUnXG4gICAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKVxuICAgICAgICArICh0ZXh0ICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgdGV4dCB9YCA6ICcnKVxuICAgICAgICArIChwcm9wcy5mbG9hdGluZyA9PT0gdHJ1ZSA/ICcgcS1iYWRnZS0tZmxvYXRpbmcnIDogJycpXG4gICAgICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtYmFkZ2UtLXJvdW5kZWQnIDogJycpXG4gICAgICAgICsgKHByb3BzLnRyYW5zcGFyZW50ID09PSB0cnVlID8gJyBxLWJhZGdlLS10cmFuc3BhcmVudCcgOiAnJylcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgcm9sZTogJ3N0YXR1cycsXG4gICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsXG4gICAgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwID8gWyBwcm9wcy5sYWJlbCBdIDogW10pKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUh5ZHJhdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtaHlkcmF0aW9uL3VzZS1oeWRyYXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUU5vU3NyJyxcblxuICBwcm9wczoge1xuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgcGxhY2Vob2xkZXI6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBpc0h5ZHJhdGVkIH0gPSB1c2VIeWRyYXRpb24oKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChpc0h5ZHJhdGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgICByZXR1cm4gbm9kZSA9PT0gdm9pZCAwXG4gICAgICAgICAgPyBub2RlXG4gICAgICAgICAgOiAobm9kZS5sZW5ndGggPiAxID8gaChwcm9wcy50YWcsIHt9LCBub2RlKSA6IG5vZGVbIDAgXSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgY2xhc3M6ICdxLW5vLXNzci1wbGFjZWhvbGRlcidcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZSA9IGhTbG90KHNsb3RzLnBsYWNlaG9sZGVyKVxuICAgICAgaWYgKG5vZGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gbm9kZS5sZW5ndGggPiAxXG4gICAgICAgICAgPyBoKHByb3BzLnRhZywgZGF0YSwgbm9kZSlcbiAgICAgICAgICA6IG5vZGVbIDAgXVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMucGxhY2Vob2xkZXIgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIHByb3BzLnBsYWNlaG9sZGVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbi8qKlxuICogV2UgYXJlIHVzaW5nIGEgc3ViLWNvbXBvbmVudCB0byBhdm9pZCB1bm5lY2Vzc2FyeSByZS1yZW5kZXJzXG4gKiBvZiB0aGUgUVNjcm9sbEFyZWEgY29udGVudCB3aGVuIHRoZSBzY3JvbGxiYXJzIGFyZSBpbnRlcmFjdGVkIHdpdGguXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIHByb3BzOiBbXG4gICAgJ3N0b3JlJyxcbiAgICAnYmFyU3R5bGUnLFxuICAgICd2ZXJ0aWNhbEJhclN0eWxlJyxcbiAgICAnaG9yaXpvbnRhbEJhclN0eWxlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIHJldHVybiAoKSA9PiAoW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogcHJvcHMuc3RvcmUuc2Nyb2xsLnZlcnRpY2FsLmJhckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogWyBwcm9wcy5iYXJTdHlsZSwgcHJvcHMudmVydGljYWxCYXJTdHlsZSBdLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIG9uTW91c2Vkb3duOiBwcm9wcy5zdG9yZS5vblZlcnRpY2FsTW91c2Vkb3duXG4gICAgICB9KSxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogcHJvcHMuc3RvcmUuc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBbIHByb3BzLmJhclN0eWxlLCBwcm9wcy5ob3Jpem9udGFsQmFyU3R5bGUgXSxcbiAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICBvbk1vdXNlZG93bjogcHJvcHMuc3RvcmUub25Ib3Jpem9udGFsTW91c2Vkb3duXG4gICAgICB9KSxcblxuICAgICAgd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHByb3BzLnN0b3JlLnNjcm9sbC52ZXJ0aWNhbC5yZWYsXG4gICAgICAgICAgY2xhc3M6IHByb3BzLnN0b3JlLnNjcm9sbC52ZXJ0aWNhbC50aHVtYkNsYXNzLnZhbHVlLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5zdG9yZS5zY3JvbGwudmVydGljYWwuc3R5bGUudmFsdWUsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0pLFxuICAgICAgICBwcm9wcy5zdG9yZS50aHVtYlZlcnREaXJcbiAgICAgICksXG5cbiAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBwcm9wcy5zdG9yZS5zY3JvbGwuaG9yaXpvbnRhbC5yZWYsXG4gICAgICAgICAgY2xhc3M6IHByb3BzLnN0b3JlLnNjcm9sbC5ob3Jpem9udGFsLnRodW1iQ2xhc3MudmFsdWUsXG4gICAgICAgICAgc3R5bGU6IHByb3BzLnN0b3JlLnNjcm9sbC5ob3Jpem9udGFsLnN0eWxlLnZhbHVlLFxuICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICB9KSxcbiAgICAgICAgcHJvcHMuc3RvcmUudGh1bWJIb3JpekRpclxuICAgICAgKVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgU2Nyb2xsQXJlYUNvbnRyb2xzIGZyb20gJy4vU2Nyb2xsQXJlYUNvbnRyb2xzLmpzJ1xuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuaW1wb3J0IFFTY3JvbGxPYnNlcnZlciBmcm9tICcuLi9zY3JvbGwtb2JzZXJ2ZXIvUVNjcm9sbE9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UvZGVib3VuY2UuanMnXG5cbmNvbnN0IGF4aXNMaXN0ID0gWyAndmVydGljYWwnLCAnaG9yaXpvbnRhbCcgXVxuY29uc3QgZGlyUHJvcHMgPSB7XG4gIHZlcnRpY2FsOiB7IG9mZnNldDogJ29mZnNldFknLCBzY3JvbGw6ICdzY3JvbGxUb3AnLCBkaXI6ICdkb3duJywgZGlzdDogJ3knIH0sXG4gIGhvcml6b250YWw6IHsgb2Zmc2V0OiAnb2Zmc2V0WCcsIHNjcm9sbDogJ3Njcm9sbExlZnQnLCBkaXI6ICdyaWdodCcsIGRpc3Q6ICd4JyB9XG59XG5jb25zdCBwYW5PcHRzID0ge1xuICBwcmV2ZW50OiB0cnVlLFxuICBtb3VzZTogdHJ1ZSxcbiAgbW91c2VBbGxEaXI6IHRydWVcbn1cblxuY29uc3QgZ2V0TWluVGh1bWJTaXplID0gc2l6ZSA9PiAoc2l6ZSA+PSAyNTAgPyA1MCA6IE1hdGguY2VpbChzaXplIC8gNSkpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2Nyb2xsQXJlYScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICB0aHVtYlN0eWxlOiBPYmplY3QsXG4gICAgdmVydGljYWxUaHVtYlN0eWxlOiBPYmplY3QsXG4gICAgaG9yaXpvbnRhbFRodW1iU3R5bGU6IE9iamVjdCxcblxuICAgIGJhclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIHZlcnRpY2FsQmFyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaG9yaXpvbnRhbEJhclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgdmVydGljYWxPZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWyAwLCAwIF1cbiAgICB9LFxuICAgIGhvcml6b250YWxPZmZzZXQ6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogWyAwLCAwIF1cbiAgICB9LFxuXG4gICAgY29udGVudFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGNvbnRlbnRBY3RpdmVTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIGRlbGF5OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxMDAwXG4gICAgfSxcblxuICAgIHZpc2libGU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBvblNjcm9sbDogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIC8vIHN0YXRlIG1hbmFnZW1lbnRcbiAgICBjb25zdCB0ZW1wU2hvd2luZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBwYW5uaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGhvdmVyID0gcmVmKGZhbHNlKVxuXG4gICAgLy8gb3RoZXIuLi5cbiAgICBjb25zdCBjb250YWluZXIgPSB7XG4gICAgICB2ZXJ0aWNhbDogcmVmKDApLFxuICAgICAgaG9yaXpvbnRhbDogcmVmKDApXG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsID0ge1xuICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgcmVmOiByZWYobnVsbCksXG4gICAgICAgIHBvc2l0aW9uOiByZWYoMCksXG4gICAgICAgIHNpemU6IHJlZigwKVxuICAgICAgfSxcblxuICAgICAgaG9yaXpvbnRhbDoge1xuICAgICAgICByZWY6IHJlZihudWxsKSxcbiAgICAgICAgcG9zaXRpb246IHJlZigwKSxcbiAgICAgICAgc2l6ZTogcmVmKDApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuXG4gICAgbGV0IHRpbWVyID0gbnVsbCwgcGFuUmVmUG9zXG5cbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc2Nyb2xsYXJlYSdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyLCB7XG4gICAgICB2ZXJ0aWNhbElubmVyOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAgIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZSAtIHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAwIF0gLSBwcm9wcy52ZXJ0aWNhbE9mZnNldFsgMSBdXG4gICAgICApKSxcblxuICAgICAgaG9yaXpvbnRhbElubmVyOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlIC0gcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMCBdIC0gcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMSBdXG4gICAgICApKVxuICAgIH0pXG5cbiAgICBzY3JvbGwudmVydGljYWwucGVyY2VudGFnZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSBzY3JvbGwudmVydGljYWwuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lci52ZXJ0aWNhbC52YWx1ZVxuICAgICAgaWYgKGRpZmYgPD0gMCkgeyByZXR1cm4gMCB9XG4gICAgICBjb25zdCBwID0gYmV0d2VlbihzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUgLyBkaWZmLCAwLCAxKVxuICAgICAgcmV0dXJuIE1hdGgucm91bmQocCAqIDEwMDAwKSAvIDEwMDAwXG4gICAgfSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAoXG4gICAgICAgIChwcm9wcy52aXNpYmxlID09PSBudWxsID8gaG92ZXIudmFsdWUgOiBwcm9wcy52aXNpYmxlKSAhPT0gdHJ1ZVxuICAgICAgICAmJiB0ZW1wU2hvd2luZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgJiYgcGFubmluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkgfHwgc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgPD0gY29udGFpbmVyLnZlcnRpY2FsLnZhbHVlICsgMVxuICAgICkpXG4gICAgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy52ZXJ0aWNhbE9mZnNldFsgMCBdXG4gICAgICArIHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlICogKGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlIC0gc2Nyb2xsLnZlcnRpY2FsLnRodW1iU2l6ZS52YWx1ZSlcbiAgICApKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgTWF0aC5yb3VuZChcbiAgICAgICAgYmV0d2VlbihcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWxJbm5lci52YWx1ZSAqIGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlIC8gc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUsXG4gICAgICAgICAgZ2V0TWluVGh1bWJTaXplKGNvbnRhaW5lci52ZXJ0aWNhbElubmVyLnZhbHVlKSxcbiAgICAgICAgICBjb250YWluZXIudmVydGljYWxJbm5lci52YWx1ZVxuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC5zdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5wcm9wcy50aHVtYlN0eWxlLFxuICAgICAgLi4ucHJvcHMudmVydGljYWxUaHVtYlN0eWxlLFxuICAgICAgdG9wOiBgJHsgc2Nyb2xsLnZlcnRpY2FsLnRodW1iU3RhcnQudmFsdWUgfXB4YCxcbiAgICAgIGhlaWdodDogYCR7IHNjcm9sbC52ZXJ0aWNhbC50aHVtYlNpemUudmFsdWUgfXB4YCxcbiAgICAgIHJpZ2h0OiBgJHsgcHJvcHMuaG9yaXpvbnRhbE9mZnNldFsgMSBdIH1weGBcbiAgICB9KSlcbiAgICBzY3JvbGwudmVydGljYWwudGh1bWJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICdxLXNjcm9sbGFyZWFfX3RodW1iIHEtc2Nyb2xsYXJlYV9fdGh1bWItLXYgYWJzb2x1dGUtcmlnaHQnXG4gICAgICArIChzY3JvbGwudmVydGljYWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fdGh1bWItLWludmlzaWJsZScgOiAnJylcbiAgICApKVxuICAgIHNjcm9sbC52ZXJ0aWNhbC5iYXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICdxLXNjcm9sbGFyZWFfX2JhciBxLXNjcm9sbGFyZWFfX2Jhci0tdiBhYnNvbHV0ZS1yaWdodCdcbiAgICAgICsgKHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX19iYXItLWludmlzaWJsZScgOiAnJylcbiAgICApKVxuXG4gICAgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGRpZmYgPSBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlIC0gY29udGFpbmVyLmhvcml6b250YWwudmFsdWVcbiAgICAgIGlmIChkaWZmIDw9IDApIHsgcmV0dXJuIDAgfVxuICAgICAgY29uc3QgcCA9IGJldHdlZW4oTWF0aC5hYnMoc2Nyb2xsLmhvcml6b250YWwucG9zaXRpb24udmFsdWUpIC8gZGlmZiwgMCwgMSlcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHAgKiAxMDAwMCkgLyAxMDAwMFxuICAgIH0pXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAoXG4gICAgICAgIChwcm9wcy52aXNpYmxlID09PSBudWxsID8gaG92ZXIudmFsdWUgOiBwcm9wcy52aXNpYmxlKSAhPT0gdHJ1ZVxuICAgICAgICAmJiB0ZW1wU2hvd2luZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICAgJiYgcGFubmluZy52YWx1ZSA9PT0gZmFsc2VcbiAgICAgICkgfHwgc2Nyb2xsLmhvcml6b250YWwuc2l6ZS52YWx1ZSA8PSBjb250YWluZXIuaG9yaXpvbnRhbC52YWx1ZSArIDFcbiAgICApKVxuICAgIHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU3RhcnQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5ob3Jpem9udGFsT2Zmc2V0WyAwIF1cbiAgICAgICsgc2Nyb2xsLmhvcml6b250YWwucGVyY2VudGFnZS52YWx1ZSAqIChjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlIC0gc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplLnZhbHVlKVxuICAgICkpXG4gICAgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIE1hdGgucm91bmQoXG4gICAgICAgIGJldHdlZW4oXG4gICAgICAgICAgY29udGFpbmVyLmhvcml6b250YWxJbm5lci52YWx1ZSAqIGNvbnRhaW5lci5ob3Jpem9udGFsSW5uZXIudmFsdWUgLyBzY3JvbGwuaG9yaXpvbnRhbC5zaXplLnZhbHVlLFxuICAgICAgICAgIGdldE1pblRodW1iU2l6ZShjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlKSxcbiAgICAgICAgICBjb250YWluZXIuaG9yaXpvbnRhbElubmVyLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcbiAgICApXG4gICAgc2Nyb2xsLmhvcml6b250YWwuc3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgLi4ucHJvcHMudGh1bWJTdHlsZSxcbiAgICAgIC4uLnByb3BzLmhvcml6b250YWxUaHVtYlN0eWxlLFxuICAgICAgWyBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogYCR7IHNjcm9sbC5ob3Jpem9udGFsLnRodW1iU3RhcnQudmFsdWUgfXB4YCxcbiAgICAgIHdpZHRoOiBgJHsgc2Nyb2xsLmhvcml6b250YWwudGh1bWJTaXplLnZhbHVlIH1weGAsXG4gICAgICBib3R0b206IGAkeyBwcm9wcy52ZXJ0aWNhbE9mZnNldFsgMSBdIH1weGBcbiAgICB9KSlcbiAgICBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkNsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJ3Etc2Nyb2xsYXJlYV9fdGh1bWIgcS1zY3JvbGxhcmVhX190aHVtYi0taCBhYnNvbHV0ZS1ib3R0b20nXG4gICAgICArIChzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zY3JvbGxhcmVhX190aHVtYi0taW52aXNpYmxlJyA6ICcnKVxuICAgICkpXG4gICAgc2Nyb2xsLmhvcml6b250YWwuYmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAncS1zY3JvbGxhcmVhX19iYXIgcS1zY3JvbGxhcmVhX19iYXItLWggYWJzb2x1dGUtYm90dG9tJ1xuICAgICAgKyAoc2Nyb2xsLmhvcml6b250YWwudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtc2Nyb2xsYXJlYV9fYmFyLS1pbnZpc2libGUnIDogJycpXG4gICAgKSlcblxuICAgIGNvbnN0IG1haW5TdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbC52ZXJ0aWNhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBzY3JvbGwuaG9yaXpvbnRhbC50aHVtYkhpZGRlbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmNvbnRlbnRTdHlsZVxuICAgICAgICA6IHByb3BzLmNvbnRlbnRBY3RpdmVTdHlsZVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBnZXRTY3JvbGwgKCkge1xuICAgICAgY29uc3QgaW5mbyA9IHt9XG5cbiAgICAgIGF4aXNMaXN0LmZvckVhY2goYXhpcyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuICAgICAgICBPYmplY3QuYXNzaWduKGluZm8sIHtcbiAgICAgICAgICBbIGF4aXMgKyAnUG9zaXRpb24nIF06IGRhdGEucG9zaXRpb24udmFsdWUsXG4gICAgICAgICAgWyBheGlzICsgJ1BlcmNlbnRhZ2UnIF06IGRhdGEucGVyY2VudGFnZS52YWx1ZSxcbiAgICAgICAgICBbIGF4aXMgKyAnU2l6ZScgXTogZGF0YS5zaXplLnZhbHVlLFxuICAgICAgICAgIFsgYXhpcyArICdDb250YWluZXJTaXplJyBdOiBjb250YWluZXJbIGF4aXMgXS52YWx1ZSxcbiAgICAgICAgICBbIGF4aXMgKyAnQ29udGFpbmVySW5uZXJTaXplJyBdOiBjb250YWluZXJbIGF4aXMgKyAnSW5uZXInIF0udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgLy8gd2UgaGF2ZSBsb3RzIG9mIGxpc3RlbmVycywgc29cbiAgICAvLyBlbnN1cmUgd2UncmUgbm90IGVtaXR0aW5nIHNhbWUgaW5mb1xuICAgIC8vIG11bHRpcGxlIHRpbWVzXG4gICAgY29uc3QgZW1pdFNjcm9sbCA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgIGNvbnN0IGluZm8gPSBnZXRTY3JvbGwoKVxuICAgICAgaW5mby5yZWYgPSBwcm94eVxuICAgICAgZW1pdCgnc2Nyb2xsJywgaW5mbylcbiAgICB9LCAwKVxuXG4gICAgZnVuY3Rpb24gbG9jYWxTZXRTY3JvbGxQb3NpdGlvbiAoYXhpcywgb2Zmc2V0LCBkdXJhdGlvbikge1xuICAgICAgaWYgKGF4aXNMaXN0LmluY2x1ZGVzKGF4aXMpID09PSBmYWxzZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUVNjcm9sbEFyZWFdOiB3cm9uZyBmaXJzdCBwYXJhbSBvZiBzZXRTY3JvbGxQb3NpdGlvbiAodmVydGljYWwvaG9yaXpvbnRhbCknKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBheGlzID09PSAndmVydGljYWwnXG4gICAgICAgID8gc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvblxuICAgICAgICA6IHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvblxuXG4gICAgICBmbih0YXJnZXRSZWYudmFsdWUsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyICh7IGhlaWdodCwgd2lkdGggfSkge1xuICAgICAgbGV0IGNoYW5nZSA9IGZhbHNlXG5cbiAgICAgIGlmIChjb250YWluZXIudmVydGljYWwudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXIudmVydGljYWwudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFpbmVyLmhvcml6b250YWwudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgIGNvbnRhaW5lci5ob3Jpem9udGFsLnZhbHVlID0gd2lkdGhcbiAgICAgICAgY2hhbmdlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjaGFuZ2UgPT09IHRydWUgJiYgc3RhcnRUaW1lcigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsICh7IHBvc2l0aW9uIH0pIHtcbiAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZVxuXG4gICAgICBpZiAoc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlICE9PSBwb3NpdGlvbi50b3ApIHtcbiAgICAgICAgc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24udG9wXG4gICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlICE9PSBwb3NpdGlvbi5sZWZ0KSB7XG4gICAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb24ubGVmdFxuICAgICAgICBjaGFuZ2UgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNoYW5nZSA9PT0gdHJ1ZSAmJiBzdGFydFRpbWVyKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxTaXplICh7IGhlaWdodCwgd2lkdGggfSkge1xuICAgICAgaWYgKHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgIHNjcm9sbC5ob3Jpem9udGFsLnNpemUudmFsdWUgPSB3aWR0aFxuICAgICAgICBzdGFydFRpbWVyKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbC52ZXJ0aWNhbC5zaXplLnZhbHVlICE9PSBoZWlnaHQpIHtcbiAgICAgICAgc2Nyb2xsLnZlcnRpY2FsLnNpemUudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgc3RhcnRUaW1lcigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QYW5UaHVtYiAoZSwgYXhpcykge1xuICAgICAgY29uc3QgZGF0YSA9IHNjcm9sbFsgYXhpcyBdXG5cbiAgICAgIGlmIChlLmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGRhdGEudGh1bWJIaWRkZW4udmFsdWUgPT09IHRydWUpIHJldHVyblxuXG4gICAgICAgIHBhblJlZlBvcyA9IGRhdGEucG9zaXRpb24udmFsdWVcbiAgICAgICAgcGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHBhbm5pbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlLmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgcGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRQcm9wID0gZGlyUHJvcHNbIGF4aXMgXVxuXG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gKFxuICAgICAgICAoZGF0YS5zaXplLnZhbHVlIC0gY29udGFpbmVyWyBheGlzIF0udmFsdWUpXG4gICAgICAgIC8gKGNvbnRhaW5lclsgYXhpcyArICdJbm5lcicgXS52YWx1ZSAtIGRhdGEudGh1bWJTaXplLnZhbHVlKVxuICAgICAgKVxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBlLmRpc3RhbmNlWyBkUHJvcC5kaXN0IF1cbiAgICAgIGNvbnN0IHBvcyA9IHBhblJlZlBvcyArIChlLmRpcmVjdGlvbiA9PT0gZFByb3AuZGlyID8gMSA6IC0xKSAqIGRpc3RhbmNlICogbXVsdGlwbGllclxuXG4gICAgICBzZXRTY3JvbGwocG9zLCBheGlzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2Vkb3duIChldnQsIGF4aXMpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzY3JvbGxbIGF4aXMgXVxuXG4gICAgICBpZiAoZGF0YS50aHVtYkhpZGRlbi52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IGF4aXMgPT09ICd2ZXJ0aWNhbCdcbiAgICAgICAgICA/IHByb3BzLnZlcnRpY2FsT2Zmc2V0WyAwIF1cbiAgICAgICAgICA6IHByb3BzLmhvcml6b250YWxPZmZzZXRbIDAgXVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IGV2dFsgZGlyUHJvcHNbIGF4aXMgXS5vZmZzZXQgXSAtIHN0YXJ0T2Zmc2V0XG4gICAgICAgIGNvbnN0IHRodW1iU3RhcnQgPSBkYXRhLnRodW1iU3RhcnQudmFsdWUgLSBzdGFydE9mZnNldFxuXG4gICAgICAgIGlmIChvZmZzZXQgPCB0aHVtYlN0YXJ0IHx8IG9mZnNldCA+IHRodW1iU3RhcnQgKyBkYXRhLnRodW1iU2l6ZS52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHRhcmdldFRodW1iU3RhcnQgPSBvZmZzZXQgLSBkYXRhLnRodW1iU2l6ZS52YWx1ZSAvIDJcbiAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gYmV0d2Vlbih0YXJnZXRUaHVtYlN0YXJ0IC8gKGNvbnRhaW5lclsgYXhpcyArICdJbm5lcicgXS52YWx1ZSAtIGRhdGEudGh1bWJTaXplLnZhbHVlKSwgMCwgMSlcbiAgICAgICAgICBzZXRTY3JvbGwocGVyY2VudGFnZSAqIE1hdGgubWF4KDAsIGRhdGEuc2l6ZS52YWx1ZSAtIGNvbnRhaW5lclsgYXhpcyBdLnZhbHVlKSwgYXhpcylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFjdGl2YXRlIHRodW1iIHBhblxuICAgICAgICBpZiAoZGF0YS5yZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBkYXRhLnJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2dC50eXBlLCBldnQpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRUaW1lciAoKSB7XG4gICAgICB0ZW1wU2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIHRlbXBTaG93aW5nLnZhbHVlID0gZmFsc2VcbiAgICAgIH0sIHByb3BzLmRlbGF5KVxuXG4gICAgICBwcm9wcy5vblNjcm9sbCAhPT0gdm9pZCAwICYmIGVtaXRTY3JvbGwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbCAob2Zmc2V0LCBheGlzKSB7XG4gICAgICB0YXJnZXRSZWYudmFsdWVbIGRpclByb3BzWyBheGlzIF0uc2Nyb2xsIF0gPSBvZmZzZXRcbiAgICB9XG5cbiAgICBsZXQgbW91c2VFdmVudFRpbWVyID0gbnVsbFxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWVudGVyICgpIHtcbiAgICAgIGlmIChtb3VzZUV2ZW50VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1vdXNlRXZlbnRUaW1lcilcbiAgICAgIH1cblxuICAgICAgLy8gc2V0VGltZW91dCBuZWVkZWQgZm9yIGlPUzsgc2VlIHRpY2tldCAjMTYyMTBcbiAgICAgIG1vdXNlRXZlbnRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb3VzZUV2ZW50VGltZXIgPSBudWxsXG4gICAgICAgIGhvdmVyLnZhbHVlID0gdHJ1ZVxuICAgICAgfSwgcHJveHkuJHEucGxhdGZvcm0uaXMuaW9zID8gNTAgOiAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VsZWF2ZSAoKSB7XG4gICAgICBpZiAobW91c2VFdmVudFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChtb3VzZUV2ZW50VGltZXIpXG4gICAgICAgIG1vdXNlRXZlbnRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaG92ZXIudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGxldCBzY3JvbGxQb3NpdGlvbiA9IG51bGxcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBydGwgPT4ge1xuICAgICAgaWYgKHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24oXG4gICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlLFxuICAgICAgICAgIE1hdGguYWJzKHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlKSAqIChydGwgPT09IHRydWUgPyAtMSA6IDEpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzY3JvbGxQb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBzY3JvbGwudmVydGljYWwucG9zaXRpb24udmFsdWUsXG4gICAgICAgIGxlZnQ6IHNjcm9sbC5ob3Jpem9udGFsLnBvc2l0aW9uLnZhbHVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHNjcm9sbFRhcmdldCA9IHRhcmdldFJlZi52YWx1ZVxuXG4gICAgICBpZiAoc2Nyb2xsVGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihzY3JvbGxUYXJnZXQsIHNjcm9sbFBvc2l0aW9uLmxlZnQpXG4gICAgICAgIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oc2Nyb2xsVGFyZ2V0LCBzY3JvbGxQb3NpdGlvbi50b3ApXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudChlbWl0U2Nyb2xsLmNhbmNlbClcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIGdldFNjcm9sbFRhcmdldDogKCkgPT4gdGFyZ2V0UmVmLnZhbHVlLFxuICAgICAgZ2V0U2Nyb2xsLFxuICAgICAgZ2V0U2Nyb2xsUG9zaXRpb246ICgpID0+ICh7XG4gICAgICAgIHRvcDogc2Nyb2xsLnZlcnRpY2FsLnBvc2l0aW9uLnZhbHVlLFxuICAgICAgICBsZWZ0OiBzY3JvbGwuaG9yaXpvbnRhbC5wb3NpdGlvbi52YWx1ZVxuICAgICAgfSksXG4gICAgICBnZXRTY3JvbGxQZXJjZW50YWdlOiAoKSA9PiAoe1xuICAgICAgICB0b3A6IHNjcm9sbC52ZXJ0aWNhbC5wZXJjZW50YWdlLnZhbHVlLFxuICAgICAgICBsZWZ0OiBzY3JvbGwuaG9yaXpvbnRhbC5wZXJjZW50YWdlLnZhbHVlXG4gICAgICB9KSxcbiAgICAgIHNldFNjcm9sbFBvc2l0aW9uOiBsb2NhbFNldFNjcm9sbFBvc2l0aW9uLFxuICAgICAgc2V0U2Nyb2xsUGVyY2VudGFnZSAoYXhpcywgcGVyY2VudGFnZSwgZHVyYXRpb24pIHtcbiAgICAgICAgbG9jYWxTZXRTY3JvbGxQb3NpdGlvbihcbiAgICAgICAgICBheGlzLFxuICAgICAgICAgIHBlcmNlbnRhZ2VcbiAgICAgICAgICAgICogKHNjcm9sbFsgYXhpcyBdLnNpemUudmFsdWUgLSBjb250YWluZXJbIGF4aXMgXS52YWx1ZSlcbiAgICAgICAgICAgICogKGF4aXMgPT09ICdob3Jpem9udGFsJyAmJiBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSksXG4gICAgICAgICAgZHVyYXRpb25cbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBzdG9yZSA9IHtcbiAgICAgIHNjcm9sbCxcblxuICAgICAgdGh1bWJWZXJ0RGlyOiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIGUgPT4geyBvblBhblRodW1iKGUsICd2ZXJ0aWNhbCcpIH0sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgeyB2ZXJ0aWNhbDogdHJ1ZSwgLi4ucGFuT3B0cyB9XG4gICAgICBdIF0sXG5cbiAgICAgIHRodW1iSG9yaXpEaXI6IFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgZSA9PiB7IG9uUGFuVGh1bWIoZSwgJ2hvcml6b250YWwnKSB9LFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHsgaG9yaXpvbnRhbDogdHJ1ZSwgLi4ucGFuT3B0cyB9XG4gICAgICBdIF0sXG5cbiAgICAgIG9uVmVydGljYWxNb3VzZWRvd24gKGV2dCkge1xuICAgICAgICBvbk1vdXNlZG93bihldnQsICd2ZXJ0aWNhbCcpXG4gICAgICB9LFxuXG4gICAgICBvbkhvcml6b250YWxNb3VzZWRvd24gKGV2dCkge1xuICAgICAgICBvbk1vdXNlZG93bihldnQsICdob3Jpem9udGFsJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIG9uTW91c2VlbnRlcixcbiAgICAgICAgb25Nb3VzZWxlYXZlXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3Etc2Nyb2xsYXJlYV9fY29udGFpbmVyIHNjcm9sbCByZWxhdGl2ZS1wb3NpdGlvbiBmaXQgaGlkZS1zY3JvbGxiYXInLFxuICAgICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCAhPT0gdm9pZCAwID8gcHJvcHMudGFiaW5kZXggOiB2b2lkIDBcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1zY3JvbGxhcmVhX19jb250ZW50IGFic29sdXRlJyxcbiAgICAgICAgICAgIHN0eWxlOiBtYWluU3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgICAgIGRlYm91bmNlOiAwLFxuICAgICAgICAgICAgICBvblJlc2l6ZTogdXBkYXRlU2Nyb2xsU2l6ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKSksXG5cbiAgICAgICAgICBoKFFTY3JvbGxPYnNlcnZlciwge1xuICAgICAgICAgICAgYXhpczogJ2JvdGgnLFxuICAgICAgICAgICAgb25TY3JvbGw6IHVwZGF0ZVNjcm9sbFxuICAgICAgICAgIH0pXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7XG4gICAgICAgICAgZGVib3VuY2U6IDAsXG4gICAgICAgICAgb25SZXNpemU6IHVwZGF0ZUNvbnRhaW5lclxuICAgICAgICB9KSxcblxuICAgICAgICBoKFNjcm9sbEFyZWFDb250cm9scywge1xuICAgICAgICAgIHN0b3JlLFxuICAgICAgICAgIGJhclN0eWxlOiBwcm9wcy5iYXJTdHlsZSxcbiAgICAgICAgICB2ZXJ0aWNhbEJhclN0eWxlOiBwcm9wcy52ZXJ0aWNhbEJhclN0eWxlLFxuICAgICAgICAgIGhvcml6b250YWxCYXJTdHlsZTogcHJvcHMuaG9yaXpvbnRhbEJhclN0eWxlXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cclxuICAgIDxxLXNjcm9sbC1hcmVhIHYtaWY9XCJpc0h5ZHJhdGVkXCIgY2xhc3M9XCJmaXQgcS1wYS1zbVwiPlxyXG5cclxuICAgIDxkaXY+XHJcbiAgICA8aDQ+IFdpc2hsaXN0IDwvaDQ+XHJcbiAgICAgIDxkaXYgdi1pZj1cIndpc2hsaXN0LnN0YXRlLml0ZW1zICYmIHdpc2hsaXN0LnN0YXRlLml0ZW1zLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC1ncmV5XCI+XHJcbiAgICAgIFlvdXIgd2lzaGxpc3QgaXMgZW1wdHkuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHYtZWxzZS1pZj1cIndpc2hsaXN0LnN0YXRlLml0ZW1zICYmIHdpc2hsaXN0LnN0YXRlLml0ZW1zLmxlbmd0aCA+IDBcIiB2LWZvcj1cInByb2R1Y3QgaW4gd2lzaGxpc3Quc3RhdGUuaXRlbXNcIiA6a2V5PVwicHJvZHVjdC5pZFwiIGNsYXNzPVwicmVsYXRpdmUtcG9zaXRpb24gcS1wYS1zbSByb3cgZnVsbC13aWR0aFwiPlxyXG4gICAgICAgIDxyb3V0ZXItbGluayA6dG89XCJgL3Byb2R1Y3QvJHtwcm9kdWN0LnNsdWd9L2BcIiBjbGFzcz1cImZsZXggbm8td3JhcCBxLXByLWxnIG5vLWRlY29yYXRpb24gdGV4dC1zZWNvbmRhcnkgZnVsbC13aWR0aFwiPlxyXG4gICAgICAgICAgPGltZyB2LWlmPVwicHJvZHVjdC5pbWFnZVwiIDpzcmM9XCJwcm9kdWN0LmltYWdlXCIgOmFsdD1cInByb2R1Y3QubmFtZVwiIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBoZWlnaHQ6IDEwMHB4OyBvYmplY3QtZml0OiBjb3ZlclwiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSBjb2x1bW5cIj5cclxuICAgICAgICAgICAgPGRpdj57eyBwcm9kdWN0Lm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgPHEtYnRuIGxhYmVsPVwiQWRkIHRvIENhcnRcIiBjb2xvcj1cInNlY29uZGFyeVwiIEBjbGljaz1cImFkZFRvQ2FydChwcm9kdWN0KVwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImFic29sdXRlIGFic29sdXRlLXRvcC1yaWdodFwiIDppY29uPVwibWF0Q2xvc2VcIiBmbGF0IEBjbGljay5zdG9wLnByZXZlbnQ9XCJyZW1vdmVGcm9tV2lzaGxpc3QocHJvZHVjdC5pZClcIiAvPlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8L3Etc2Nyb2xsLWFyZWE+XHJcblxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgb25Nb3VudGVkLCByZWYgfSBmcm9tICd2dWUnO1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQuanMnXHJcbmltcG9ydCB3aXNobGlzdCBmcm9tICdzcmMvc3RvcmVzL3dpc2hsaXN0LmpzJ1xyXG5pbXBvcnQgeyBtYXRDbG9zZSB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG5cclxuY29uc3QgaXNIeWRyYXRlZCA9IHJlZihmYWxzZSlcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGFkZFRvQ2FydChwKXtcclxuY2FydC5hZGQocC5pZCwgMSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUZyb21XaXNobGlzdChpZCkge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB3aXNobGlzdC50b2dnbGVXaXNobGlzdEl0ZW0oaWQpXHJcbiAgICBjb25zb2xlLmxvZyh3aXNobGlzdC52YWx1ZSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciByZW1vdmluZyBmcm9tIHdpc2hsaXN0OicsIGVycilcclxuICB9XHJcbn1cclxub25Nb3VudGVkKCgpID0+IHtcclxuICBpc0h5ZHJhdGVkLnZhbHVlID0gdHJ1ZSAvLyBWdWUgaXMgbm93IGZ1bGx5IGluIGNvbnRyb2wgb2YgdGhlIERPTVxyXG59KVxyXG5cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT5cclxuICA8dHJhbnNpdGlvbiBuYW1lPVwiZmFkZVwiPlxyXG4gICAgPGRpdiB2LWlmPVwidmlzaWJsZVwiIGNsYXNzPVwiY29va2llLWJhbm5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29va2llLXRleHRcIj5cclxuICAgICAgICBXZSB1c2UgY29va2llcyB0byBpbXByb3ZlIHlvdXIgZXhwZXJpZW5jZSBvbiBvdXIgd2Vic2l0ZS5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29va2llLWFjdGlvbnNcIj5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGZsYXRcclxuICAgICAgICAgIG5vLWNhcHNcclxuICAgICAgICAgIGxhYmVsPVwiUHJpdmFjeSBQb2xpY3lcIlxyXG4gICAgICAgICAgdG89XCIvcHJpdmFjeS1wb2xpY3lcIlxyXG4gICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxxLWJ0blxyXG4gICAgICAgICAgdW5lbGV2YXRlZFxyXG4gICAgICAgICAgbm8tY2Fwc1xyXG4gICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgbGFiZWw9XCJBY2NlcHRcIlxyXG4gICAgICAgICAgQGNsaWNrPVwiYWNjZXB0Q29va2llc1wiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L3RyYW5zaXRpb24+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcclxuXHJcbmNvbnN0IHZpc2libGUgPSByZWYoZmFsc2UpXHJcblxyXG5vbk1vdW50ZWQoKCkgPT4ge1xyXG4gIGNvbnN0IGFjY2VwdGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Nvb2tpZV9jb25zZW50JylcclxuICBpZiAoIWFjY2VwdGVkKSB2aXNpYmxlLnZhbHVlID0gdHJ1ZVxyXG59KVxyXG5cclxuZnVuY3Rpb24gYWNjZXB0Q29va2llcygpIHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29va2llX2NvbnNlbnQnLCAnYWNjZXB0ZWQnKVxyXG4gIHZpc2libGUudmFsdWUgPSBmYWxzZVxyXG59XHJcbjwvc2NyaXB0PiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTcGFjZScsXG5cbiAgc2V0dXAgKCkge1xuICAgIGNvbnN0IHNwYWNlID0gaCgnZGl2JywgeyBjbGFzczogJ3Etc3BhY2UnIH0pXG4gICAgcmV0dXJuICgpID0+IHNwYWNlXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCYXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIGRlbnNlOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhciByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIGAgcS1iYXItLSR7IHByb3BzLmRlbnNlID09PSB0cnVlID8gJ2RlbnNlJyA6ICdzdGFuZGFyZCcgfSBgXG4gICAgICArIGAgcS1iYXItLSR7IGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICdkYXJrJyA6ICdsaWdodCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICByb2xlOiAndG9vbGJhcidcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPCEtLSBGbG9hdGluZyBBY3Rpb24gQnV0dG9uIC0tPlxyXG48cS1idG5cclxuICBmYWJcclxuICBjbGFzcz1cImZpeGVkLWJvdHRvbS1sZWZ0IHEtbWItbWQgcS1tbC1tZFwiXHJcbiAgc3R5bGU9XCJ6LWluZGV4OiAyOTk5XCJcclxuICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgOmFyaWEtbGFiZWw9XCJ2aXNpYmxlID8gJ0Nsb3NlIGNoYXQnIDogJ09wZW4gY2hhdCdcIlxyXG4gIEBjbGljaz1cInZpc2libGUgPSAhdmlzaWJsZVwiXHJcbj5cclxuICA8dHJhbnNpdGlvbiBuYW1lPVwicm90YXRlLWZhZGVcIj5cclxuICAgIDxxLWljb24gY2xhc3M9XCJhYnNvbHV0ZVwiIDprZXk9XCJ2aXNpYmxlXCIgOm5hbWU9XCJ2aXNpYmxlID8gbWF0Q2xvc2UgOiBtYXRDaGF0XCIgLz5cclxuICA8L3RyYW5zaXRpb24+XHJcbjwvcS1idG4+XHJcbiAgICA8IS0tIENoYXQgQm94IC0tPlxyXG4gICAgPHEtY2FyZFxyXG4gICAgICB2LWlmPVwidmlzaWJsZVwiXHJcbiAgICAgIGNsYXNzPVwiZml4ZWQtYm90dG9tLWxlZnQgcS1tYi1tZCBxLW1sLW1kIHotbWF4IHNoYWRvdy04IGNoYXQtY29udGFpbmVyXCJcclxuICAgICAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMDBweDtcIlxyXG4gICAgPlxyXG4gICAgICA8cS1iYXIgY2xhc3M9XCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj5BSSBBc3Npc3RhbnQ8L2Rpdj5cclxuICAgICAgICA8cS1zcGFjZSAvPlxyXG4gICAgICAgIDxxLWJ0biBkZW5zZSBmbGF0IDppY29uPVwibWF0Q2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2UgY2hhdFwiIEBjbGljaz1cInZpc2libGUgPSBmYWxzZTtmYWIxID0gZmFsc2VcIiAvPlxyXG4gICAgICA8L3EtYmFyPlxyXG5cclxuPHEtc2Nyb2xsLWFyZWEgY2xhc3M9XCJjaGF0LXNjcm9sbC1hcmVhXCIgcmVmPVwic2Nyb2xsUmVmXCIgc3R5bGU9XCJoZWlnaHQ6IDI1MHB4O1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXNtXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIHYtZm9yPVwibXNnIGluIG1lc3NhZ2VzXCJcclxuICAgICAgICAgICAgOmtleT1cIm1zZy5pZFwiXHJcbiAgICAgICAgICAgIDpjbGFzcz1cIlsnY2hhdC1tZXNzYWdlJywgbXNnLmZyb20gPT09ICd1c2VyJyA/ICd1c2VyJyA6ICdib3QnXVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxxLWF2YXRhclxyXG4gICAgICAgICAgICAgIHNpemU9XCIyNHB4XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxyXG4gICAgICAgICAgICAgIHYtaWY9XCJtc2cuZnJvbSA9PT0gJ2JvdCdcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT1cIm1hdFNtYXJ0VG95XCIgLz5cclxuICAgICAgICAgICAgPC9xLWF2YXRhcj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1YmJsZVwiPnt7IG1zZy50ZXh0IH19PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxyXG5cclxuICAgICAgPHEtc2VwYXJhdG9yIC8+XHJcblxyXG4gICAgICA8cS1pbnB1dFxyXG4gICAgICAgIGZpbGxlZFxyXG4gICAgICAgIGRlbnNlXHJcbiAgICAgICAgdi1tb2RlbD1cImlucHV0XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgeW91ciBtZXNzYWdlLi4uXCJcclxuICAgICAgICBAa2V5dXAuZW50ZXI9XCJzZW5kTWVzc2FnZVwiXHJcbiAgICAgICAgY2xhc3M9XCJxLXBhLXNtXCJcclxuICAgICAgPlxyXG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxyXG4gICAgICAgICAgPHEtYnRuIGZsYXQgcm91bmQgOmljb249XCJtYXRTZW5kXCIgQGNsaWNrPVwic2VuZE1lc3NhZ2VcIiAvPlxyXG4gICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgIDwvcS1pbnB1dD5cclxuICAgIDwvcS1jYXJkPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgbWF0Q2xvc2UsIG1hdENoYXQsIG1hdFNlbmQsIG1hdFNtYXJ0VG95IH0gZnJvbSAnQHF1YXNhci9leHRyYXMvbWF0ZXJpYWwtaWNvbnMnXHJcblxyXG5jb25zdCBtZXNzYWdlcyA9IHJlZihbXSlcclxuY29uc3QgaW5wdXQgPSByZWYoJycpXHJcbmNvbnN0IHZpc2libGUgPSByZWYoZmFsc2UpXHJcbmNvbnN0IHNjcm9sbFJlZiA9IHJlZihudWxsKVxyXG5jb25zdCBmYWIxID0gcmVmKGZhbHNlKTtcclxuY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSAoKSA9PiB7XHJcbiAgbmV4dFRpY2soKCkgPT4ge1xyXG4gICAgaWYgKHNjcm9sbFJlZi52YWx1ZSkge1xyXG4gICAgICBzY3JvbGxSZWYudmFsdWUucmVmcmVzaCgpOyAvLyBGb3JjZSBpdCB0byByZWNhbGN1bGF0ZSBkaW1lbnNpb25zXHJcbiAgICAgIHNjcm9sbFJlZi52YWx1ZS5zZXRTY3JvbGxQZXJjZW50YWdlKCd2ZXJ0aWNhbCcsIDEpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKCkgPT4ge1xyXG4gIGlmICghaW5wdXQudmFsdWUudHJpbSgpKSByZXR1cm5cclxuXHJcbiAgY29uc3QgdXNlclRleHQgPSBpbnB1dC52YWx1ZVxyXG4gIG1lc3NhZ2VzLnZhbHVlLnB1c2goeyBpZDogRGF0ZS5ub3coKSwgdGV4dDogdXNlclRleHQsIGZyb206ICd1c2VyJyB9KVxyXG4gIGNvbnNvbGUubG9nKCdNZXNzYWdlczonLCBtZXNzYWdlcy52YWx1ZSlcclxuXHJcbiAgaW5wdXQudmFsdWUgPSAnJ1xyXG4gIHNjcm9sbFRvQm90dG9tKClcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke2ltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFfS93cC1qc29uL2FpLWNoYXQvdjEvbWVzc2FnZWAsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IHVzZXJUZXh0IH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICBtZXNzYWdlcy52YWx1ZS5wdXNoKHsgaWQ6IERhdGUubm93KCkgKyAxLCB0ZXh0OiBkYXRhLnJlcGx5LCBmcm9tOiAnYm90JyB9KVxyXG4gICAgY29uc29sZS5sb2coJ01lc3NhZ2VzOicsIG1lc3NhZ2VzLnZhbHVlKVxyXG5cclxuICAgIHNjcm9sbFRvQm90dG9tKClcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpXHJcbiAgICBtZXNzYWdlcy52YWx1ZS5wdXNoKHsgaWQ6IERhdGUubm93KCkgKyAyLCB0ZXh0OiAnRmFpbGVkIHRvIGdldCByZXNwb25zZS4nLCBmcm9tOiAnYm90JyB9KVxyXG4gICAgY29uc29sZS5sb2coJ01lc3NhZ2VzOicsIG1lc3NhZ2VzLnZhbHVlKVxyXG5cclxuICAgIHNjcm9sbFRvQm90dG9tKClcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+IiwiLy8gc3JjL2Jvb3QvcHVzaC5qc1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ3F1YXNhcidcclxuLy9pbXBvcnQgeyBBcHAgfSBmcm9tICdAY2FwYWNpdG9yL2FwcCc7XHJcblxyXG5sZXQgUHVzaE5vdGlmaWNhdGlvbnMgPSBudWxsXHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7XHJcbiAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xyXG4gICAgY29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDBcclxuICAgIGNvbnN0IHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpXHJcbiAgICByZXR1cm4gdi50b1N0cmluZygxNilcclxuICB9KVxyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0IFZBUElEIGJhc2U2NCBrZXkgdG8gVUludDhBcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gdXJsQmFzZTY0VG9VaW50OEFycmF5KGJhc2U2NFN0cmluZykge1xyXG4gIGNvbnN0IHBhZGRpbmcgPSAnPScucmVwZWF0KCg0IC0gYmFzZTY0U3RyaW5nLmxlbmd0aCAlIDQpICUgNClcclxuICBjb25zdCBiYXNlNjQgPSAoYmFzZTY0U3RyaW5nICsgcGFkZGluZykucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKVxyXG4gIGNvbnN0IHJhd0RhdGEgPSBhdG9iKGJhc2U2NClcclxuICBjb25zdCBvdXRwdXRBcnJheSA9IG5ldyBVaW50OEFycmF5KHJhd0RhdGEubGVuZ3RoKVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmF3RGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgb3V0cHV0QXJyYXlbaV0gPSByYXdEYXRhLmNoYXJDb2RlQXQoaSlcclxuICB9XHJcbiAgcmV0dXJuIG91dHB1dEFycmF5XHJcbn1cclxuXHJcbi8vIHlvdXIgVkFQSUQgcHVibGljIGtleSBmb3Igd2ViIHB1c2hcclxuY29uc3QgQVBQX1NFUlZFUl9LRVkgPSBpbXBvcnQubWV0YS5lbnYuVklURV9WQVBJRF9BUFBfU0VSVkVSX0tFWVxyXG5cclxuLyoqXHJcbiAqIEdldCBvciBjcmVhdGUgYSB1bmlxdWUgZGV2aWNlIElEIChzdG9yZWQgaW4gbG9jYWxTdG9yYWdlKVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RGV2aWNlSWQoKSB7XHJcbiAgbGV0IGRldmljZUlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3B3YV9kZXZpY2VfaWQnKVxyXG4gIGlmICghZGV2aWNlSWQpIHtcclxuICAgIGRldmljZUlkID0gZ2VuZXJhdGVVVUlEKClcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwd2FfZGV2aWNlX2lkJywgZGV2aWNlSWQpXHJcbiAgfVxyXG4gIHJldHVybiBkZXZpY2VJZFxyXG59XHJcblxyXG4vKipcclxuICogU3Vic2NyaWJlIHRvIHB1c2ggbm90aWZpY2F0aW9ucyAoV2ViL1BXQSlcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJzY3JpYmVUb1dlYlB1c2goKSB7XHJcbiAgY29uc29sZS5sb2coJ/CfmoAgUHVzaCBzZXR1cCBzdGFydGVkIChXZWIpJylcclxuICBjb25zdCBwZXJtaXNzaW9uID0gYXdhaXQgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKClcclxuICBpZiAocGVybWlzc2lvbiAhPT0gJ2dyYW50ZWQnKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ/CflLQgTm90aWZpY2F0aW9uIHBlcm1pc3Npb24gbm90IGdyYW50ZWQuJylcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlZ2lzdHJhdGlvbiA9IGF3YWl0IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlYWR5XHJcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBhd2FpdCByZWdpc3RyYXRpb24ucHVzaE1hbmFnZXIuc3Vic2NyaWJlKHtcclxuICAgICAgdXNlclZpc2libGVPbmx5OiB0cnVlLFxyXG4gICAgICBhcHBsaWNhdGlvblNlcnZlcktleTogdXJsQmFzZTY0VG9VaW50OEFycmF5KEFQUF9TRVJWRVJfS0VZKVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkZXZpY2VJZCA9IGdldERldmljZUlkKClcclxuICAgIGNvbnN0IGNhcnRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3Y19jYXJ0X3Rva2VuJykgfHwgbnVsbFxyXG5cclxuICAgIGNvbnN0IHBheWxvYWQgPSB7XHJcbiAgICAgIGRldmljZV9pZDogZGV2aWNlSWQsXHJcbiAgICAgIGNhcnRfdG9rZW46IGNhcnRUb2tlbixcclxuICAgICAgc3Vic2NyaXB0aW9uOiBzdWJzY3JpcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRX0vd3AtanNvbi9wd2EvdjEvc2F2ZS1zdWJzY3JpcHRpb25gLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgY29uc29sZS5sb2coJ+KchSBQdXNoIHN1YnNjcmlwdGlvbiBzYXZlZCAod2ViKTonLCByZXN1bHQpXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCfinYwgUHVzaCBzdWJzY3JpcHRpb24gZmFpbGVkICh3ZWIpOicsIGVycilcclxuICB9XHJcbn1cclxuXHJcbi8qIOKAlOKAlOKAlCBOYXRpdmUgKENhcGFjaXRvcikgaGVscGVycyDigJTigJTigJQgKi9cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTm90aWZpY2F0aW9uQ2hhbm5lbHMoKSB7XHJcbiAgLy8gT3JkZXJzXHJcbiAgYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMuY3JlYXRlQ2hhbm5lbCh7XHJcbiAgICBpZDogJ29yZGVycycsXHJcbiAgICBuYW1lOiAnT3JkZXJzJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnT3JkZXIgY29uZmlybWF0aW9ucyBhbmQgcGF5bWVudCB1cGRhdGVzJyxcclxuICAgIGltcG9ydGFuY2U6IDQsIC8vIEhJR0hcclxuICAgIHZpc2liaWxpdHk6IDEsIC8vIFBVQkxJQyAoc2hvd3Mgb24gbG9jayBzY3JlZW4pXHJcbiAgICB2aWJyYXRpb246IHRydWVcclxuICB9KTtcclxuXHJcbiAgLy8gQWJhbmRvbmVkIGNhcnRcclxuICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5jcmVhdGVDaGFubmVsKHtcclxuICAgIGlkOiAnYWJhbmRvbmVkX2NhcnQnLFxyXG4gICAgbmFtZTogJ0FiYW5kb25lZCBDYXJ0JyxcclxuICAgIGRlc2NyaXB0aW9uOiAnUmVtaW5kZXJzIGFib3V0IGl0ZW1zIGxlZnQgaW4geW91ciBjYXJ0JyxcclxuICAgIGltcG9ydGFuY2U6IDQsIC8vIEhJR0hcclxuICAgIHZpc2liaWxpdHk6IDEsXHJcbiAgICB2aWJyYXRpb246IHRydWVcclxuICB9KTtcclxuXHJcbiAgLy8gUHJvbW90aW9uc1xyXG4gIGF3YWl0IFB1c2hOb3RpZmljYXRpb25zLmNyZWF0ZUNoYW5uZWwoe1xyXG4gICAgaWQ6ICdwcm9tb3Rpb25zJyxcclxuICAgIG5hbWU6ICdQcm9tb3Rpb25zJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnU2FsZXMsIGRpc2NvdW50cyBhbmQgc3BlY2lhbCBvZmZlcnMnLFxyXG4gICAgaW1wb3J0YW5jZTogMywgLy8gREVGQVVMVFxyXG4gICAgdmlzaWJpbGl0eTogMSxcclxuICAgIHZpYnJhdGlvbjogdHJ1ZVxyXG4gIH0pO1xyXG5cclxuICAvLyBTeXN0ZW0gLyBiYWNrZ3JvdW5kXHJcbiAgYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMuY3JlYXRlQ2hhbm5lbCh7XHJcbiAgICBpZDogJ3N5c3RlbScsXHJcbiAgICBuYW1lOiAnU3lzdGVtJyxcclxuICAgIGRlc2NyaXB0aW9uOiAnU3lzdGVtIGFuZCBiYWNrZ3JvdW5kIG5vdGlmaWNhdGlvbnMnLFxyXG4gICAgaW1wb3J0YW5jZTogMiwgLy8gTE9XXHJcbiAgICB2aXNpYmlsaXR5OiAwLCAvLyBQUklWQVRFXHJcbiAgICB2aWJyYXRpb246IHRydWVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTmF0aXZlUGVybWlzc2lvbigpe1xyXG4gIGlmICghUGxhdGZvcm0uaXMuY2FwYWNpdG9yKSByZXR1cm4gJ3Vuc3VwcG9ydGVkJ1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwdXNoTW9kdWxlID0gYXdhaXQgaW1wb3J0KC8qIEB2aXRlLWlnbm9yZSAqLyAnQGNhcGFjaXRvci9wdXNoLW5vdGlmaWNhdGlvbnMnKVxyXG4gICAgUHVzaE5vdGlmaWNhdGlvbnMgPSBwdXNoTW9kdWxlLlB1c2hOb3RpZmljYXRpb25zXHJcblxyXG4gICAgY29uc3QgcGVybSA9IGF3YWl0IFB1c2hOb3RpZmljYXRpb25zLmNoZWNrUGVybWlzc2lvbnMoKVxyXG4gICAgcmV0dXJuIHBlcm0ucmVjZWl2ZTtcclxuXHJcbiAgfSBjYXRjaChlKXtcclxuICAgIGNvbnNvbGUud2FybignaGF2ZSBlcnJvciEnLCBlKVxyXG4gIH1cclxufVxyXG4vKipcclxuICogaW5pdE5hdGl2ZVB1c2g6XHJcbiAqICAtIGR5bmFtaWNhbGx5IGltcG9ydHMgbmF0aXZlIG1vZHVsZXNcclxuICogIC0gcmVnaXN0ZXJzIGxpc3RlbmVycyAocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25FcnJvciwgcmVjZWl2ZWQpXHJcbiAqICAtIGRvZXMgTk9UIGZvcmNlIGEgcGVybWlzc2lvbnMgcHJvbXB0XHJcbiAqICAtIHNhZmUgdG8gY2FsbCBvbiBhcHAgc3RhcnR1cCB0byBzZXQgbGlzdGVuZXJzXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdE5hdGl2ZVB1c2goKSB7XHJcbiAgaWYgKCFQbGF0Zm9ybS5pcy5jYXBhY2l0b3IpIHJldHVybiAndW5zdXBwb3J0ZWQnXHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwdXNoTW9kdWxlID0gYXdhaXQgaW1wb3J0KC8qIEB2aXRlLWlnbm9yZSAqLyAnQGNhcGFjaXRvci9wdXNoLW5vdGlmaWNhdGlvbnMnKVxyXG4gICAgUHVzaE5vdGlmaWNhdGlvbnMgPSBwdXNoTW9kdWxlLlB1c2hOb3RpZmljYXRpb25zXHJcblxyXG4gICAgLy8gbGlzdGVuZXJzIChyZWdpc3RlciB0aGVzZSBPTkNFKVxyXG4gICAgUHVzaE5vdGlmaWNhdGlvbnMuYWRkTGlzdGVuZXIoJ3JlZ2lzdHJhdGlvbicsIGFzeW5jICh0b2tlbikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygn8J+foiBOYXRpdmUgdG9rZW46JywgdG9rZW4/LnZhbHVlKVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGRldmljZUlkID0gZ2V0RGV2aWNlSWQoKVxyXG4gICAgICAgIGNvbnN0IGNhcnRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3Y19jYXJ0X3Rva2VuJykgfHwgbnVsbFxyXG4gICAgICAgIGF3YWl0IGZldGNoKGAke2ltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFfS93cC1qc29uL3B3YS92MS9zYXZlLXN1YnNjcmlwdGlvbmAsIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBkZXZpY2VfaWQ6IGRldmljZUlkLFxyXG4gICAgICAgICAgICBjYXJ0X3Rva2VuOiBjYXJ0VG9rZW4sXHJcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbjoge2VuZHBvaW50OiB0b2tlbj8udmFsdWUsIG5hdGl2ZTogdHJ1ZX1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign4p2MIEZhaWxlZCBzYXZpbmcgbmF0aXZlIHRva2VuIHRvIHNlcnZlcicsIGVycilcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBQdXNoTm90aWZpY2F0aW9ucy5hZGRMaXN0ZW5lcigncmVnaXN0cmF0aW9uRXJyb3InLCAoZXJyKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBOYXRpdmUgcHVzaCByZWdpc3RyYXRpb24gZXJyb3I6JywgZXJyKVxyXG4gICAgfSlcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogMe+4j+KDoyBGb3JlZ3JvdW5kIHB1c2ggKGVxdWl2YWxlbnQgdG8gU1cgXCJwdXNoXCIgZXZlbnQpXHJcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuICAgIFB1c2hOb3RpZmljYXRpb25zLmFkZExpc3RlbmVyKFxyXG4gICAgICAgICdwdXNoTm90aWZpY2F0aW9uUmVjZWl2ZWQnLFxyXG4gICAgICAgIChub3RpZmljYXRpb24pID0+IHtcclxuICAgICAgICAgIGFsZXJ0KFxyXG4gICAgICAgICAgICAgICdQVVNIIFJFQ0VJVkVEXFxuJyArXHJcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkobm90aWZpY2F0aW9uLCBudWxsLCAyKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICogMu+4j+KDoyBOb3RpZmljYXRpb24gdGFwIChlcXVpdmFsZW50IHRvIG5vdGlmaWNhdGlvbmNsaWNrKVxyXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qUHVzaE5vdGlmaWNhdGlvbnMuYWRkTGlzdGVuZXIoJ3B1c2hOb3RpZmljYXRpb25BY3Rpb25QZXJmb3JtZWQnLCAoYWN0aW9uKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdbTmF0aXZlXSBQdXNoIGFjdGlvbiByZWNlaXZlZCcsIGFjdGlvbik7XHJcblxyXG4gICAgICAvLyAxLiBGbGF0dGVuZWQgZGF0YSBhY2Nlc3NcclxuICAgICAgY29uc3QgZGF0YSA9IGFjdGlvbi5ub3RpZmljYXRpb24uZGF0YTtcclxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gZGF0YT8udXJsO1xyXG5cclxuICAgICAgaWYgKHRhcmdldFVybCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbTmF0aXZlXSBOYXZpZ2F0aW5nIHRvOicsIHRhcmdldFVybCk7XHJcblxyXG4gICAgICAgIC8vIDIuIFVzZSB0aGUgaW1wb3J0ZWQgcm91dGUgaW5zdGFuY2VcclxuICAgICAgICAvLyBXcmFwIGluIGlzUmVhZHkgdG8gZW5zdXJlIHRoZSBhcHAgaXMgZnVsbHkgbG9hZGVkIGJlZm9yZSBuYXZpZ2F0aW5nXHJcbiAgICAgICAgcm91dGUuaXNSZWFkeSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgcm91dGUucHVzaCh0YXJnZXRVcmwpLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUm91dGVyIHB1c2ggZmFpbGVkLCBmYWxsaW5nIGJhY2sgdG8gaHJlZicsIGVycik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGFyZ2V0VXJsO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pOyovXHJcbiAgICBjb25zdCBwZXJtID0gYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMuY2hlY2tQZXJtaXNzaW9ucygpXHJcbiAgICBpZiAocGVybS5yZWNlaXZlICE9PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgY29uc3QgcmVxID0gYXdhaXQgUHVzaE5vdGlmaWNhdGlvbnMucmVxdWVzdFBlcm1pc3Npb25zKClcclxuICAgICAgaWYgKHJlcS5yZWNlaXZlICE9PSAnZ3JhbnRlZCcpIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8qIOKchSBDUkVBVEUgQ0hBTk5FTFMgKi9cclxuICAgIGF3YWl0IGNyZWF0ZU5vdGlmaWNhdGlvbkNoYW5uZWxzKClcclxuXHJcbiAgICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5yZWdpc3RlcigpXHJcblxyXG5cclxuICAgIHJldHVybiAnaW5pdGlhbGl6ZWQnXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS53YXJuKCdQdXNoIHBsdWdpbiBub3QgYXZhaWxhYmxlIG9yIG5vdCBvbiBtb2JpbGU6JywgZSlcclxuICAgIHJldHVybiAnZGVmYXVsdCdcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXF1ZXN0TmF0aXZlUGVybWlzc2lvbjpcclxuICogIC0gaW50ZW5kZWQgdG8gYmUgY2FsbGVkIGZyb20gYSB1c2VyIGdlc3R1cmUgKHlvdXIgXCJFbmFibGVcIiBidXR0b24pXHJcbiAqICAtIHdpbGwgcmVxdWVzdFBlcm1pc3Npb25zKCkgYW5kIGF0dGVtcHQgcmVnaXN0ZXIoKSAod3JhcHBlZCBzYWZlbHkpXHJcbiAqICAtIHJldHVybnMgdGhlIHBlcm1pc3Npb24ucmVjZWl2ZSBzdHJpbmcgKGUuZy4gJ2dyYW50ZWQnfCdkZW5pZWQnfCdwcm9tcHQnKVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3ROYXRpdmVQZXJtaXNzaW9uKCkge1xyXG4gIGlmICghUGxhdGZvcm0uaXMuY2FwYWNpdG9yKSByZXR1cm4gJ3Vuc3VwcG9ydGVkJ1xyXG4gIGlmICghUHVzaE5vdGlmaWNhdGlvbnMpIHtcclxuICAgIC8vIGVuc3VyZSBsaXN0ZW5lcnMgYXJlIHNldCB1cFxyXG4gICAgYXdhaXQgaW5pdE5hdGl2ZVB1c2goKVxyXG4gICAgaWYgKCFQdXNoTm90aWZpY2F0aW9ucykgcmV0dXJuICdkZWZhdWx0J1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHBlcm1TdGF0dXMgPSBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5yZXF1ZXN0UGVybWlzc2lvbnMoKVxyXG4gICAgY29uc3QgcCA9IHBlcm1TdGF0dXMucmVjZWl2ZSB8fCAnZGVmYXVsdCdcclxuICAgIC8vIFRyeSByZWdpc3RlcmluZyBpbW1lZGlhdGVseSDigJQgaWYgdGhpcyBlcnJvcnMsIGFwcFN0YXRlQ2hhbmdlIGxpc3RlbmVyIHdpbGwgYXR0ZW1wdCBhZ2FpbiB3aGVuIGFjdGl2ZVxyXG4gICAgaWYgKHAgPT09ICdncmFudGVkJykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIHNtYWxsIGRlbGF5IHRvIGFsbG93IG5hdGl2ZSB0byBzZXR0bGUgYWZ0ZXIgcGVybWlzc2lvbiBkaWFsb2dcclxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMjUwKSlcclxuICAgICAgICBhd2FpdCBQdXNoTm90aWZpY2F0aW9ucy5yZWdpc3RlcigpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3RlZCByZWdpc3RlcigpIGFmdGVyIHBlcm1pc3Npb24gZ3JhbnRlZCcpXHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignSW1tZWRpYXRlIHJlZ2lzdGVyKCkgZmFpbGVkICh3aWxsIHJlbHkgb24gYXBwU3RhdGVDaGFuZ2UpOicsIGVycilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ3JlcXVlc3ROYXRpdmVQZXJtaXNzaW9uIGVycm9yJywgZXJyKVxyXG4gICAgcmV0dXJuICdkZWZhdWx0J1xyXG4gIH1cclxufVxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICBCb290IGluaXQgdGhhdCBzZXRzIHVwIHRyYWNraW5nICYgbGlzdGVuZXJzXHJcbiAgIOKAlCB0aGlzIGlzIGNhbGxlZCBieSBRdWFzYXIgYm9vdCAoZGVmYXVsdCBleHBvcnQpXHJcbiAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuZnVuY3Rpb24gc2V0dXBDYXJ0VHJhY2tpbmcoKSB7XHJcbiAgLy8gTmF0aXZlLWZyaWVuZGx5IHdheSB0byBkZXRlY3QgdGhlIGFwcCBnb2luZyB0byBiYWNrZ3JvdW5kXHJcbiAgLypBcHAuYWRkTGlzdGVuZXIoJ2FwcFN0YXRlQ2hhbmdlJywgKHsgaXNBY3RpdmUgfSkgPT4ge1xyXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygn8J+TsSBBcHAgZ29pbmcgdG8gYmFja2dyb3VuZCwgc3luY2luZyBjYXJ0Li4uJylcclxuICAgICAgc3luY1N1YnNjcmlwdGlvbkNhcnRUb2tlbigpXHJcbiAgICB9XHJcbiAgfSk7Ki9cclxuICAvL3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBzeW5jU3Vic2NyaXB0aW9uQ2FydFRva2VuKVxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSBzeW5jU3Vic2NyaXB0aW9uQ2FydFRva2VuKClcclxuICB9KVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzeW5jU3Vic2NyaXB0aW9uQ2FydFRva2VuKCkge1xyXG4gIGNvbnN0IGRldmljZUlkID0gZ2V0RGV2aWNlSWQoKVxyXG4gIGNvbnN0IGNhcnRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3Y19jYXJ0X3Rva2VuJylcclxuXHJcbiAgaWYgKCFjYXJ0VG9rZW4gfHwgIWRldmljZUlkKSByZXR1cm5cclxuICB0cnkge1xyXG4gICAgLy8gU2VuZCB0aGUgc3RhYmxlIGRldmljZUlkIGFuZCB0aGUgdm9sYXRpbGUgY2FydFRva2VuXHJcbiAgICBhd2FpdCBmZXRjaChgJHtpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRX0vd3AtanNvbi9wd2EvdjEvdXBkYXRlLWNhcnQtdG9rZW5gLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAga2VlcGFsaXZlOiB0cnVlLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZGV2aWNlX2lkOiBkZXZpY2VJZCxcclxuICAgICAgICBjYXJ0X3Rva2VuOiBjYXJ0VG9rZW4sXHJcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgY29uc29sZS5sb2coJ+KchSBDYXJ0IHRva2VuIHN5bmNlZCB0byBwdXNoIHN1YnNjcmlwdGlvbi4nKVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcign4p2MIEZhaWxlZCB0byBzeW5jIGNhcnQgdG9rZW46JywgZXJyKVxyXG4gIH1cclxufVxyXG4vKipcclxuICogSW5pdCBwdXNoICsgY2FydCB0cmFja2luZ1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgKHsgcm91dGVyIH0gPSB7fSkgPT4ge1xyXG4gIC8vIDEuIFByZXZlbnQgc2VydmVyLXNpZGUgZXhlY3V0aW9uXHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm5cclxuICBpZiAocm91dGVyKSB3aW5kb3cuJHJvdXRlciA9IHJvdXRlclxyXG5cclxuICBjb25zdCBpbml0Q2FyVHJhY2tpbmcgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBzZXR1cENhcnRUcmFja2luZygpXHJcbiAgICBpZiAoUGxhdGZvcm0uaXMgJiYgUGxhdGZvcm0uaXMuY2FwYWNpdG9yKSB7XHJcbiAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgIC8vIGR5bmFtaWMgaW1wb3J0IG9ubHkgdG8gY29weSB0aGUgbW9kdWxlIGZvciBwbHVnaW4gZGV0ZWN0aW9uXHJcbiAgICAgICAgY29uc3QgbmF0aXZlUHVzaCA9IGF3YWl0IGltcG9ydCgvKiBAdml0ZS1pZ25vcmUgKi8gJ0BjYXBhY2l0b3IvcHVzaC1ub3RpZmljYXRpb25zJylcclxuICAgICAgICBQdXNoTm90aWZpY2F0aW9ucyA9IG5hdGl2ZVB1c2guUHVzaE5vdGlmaWNhdGlvbnNcclxuICAgICAgICBQdXNoTm90aWZpY2F0aW9ucy5hZGRMaXN0ZW5lcigncHVzaE5vdGlmaWNhdGlvbkFjdGlvblBlcmZvcm1lZCcsIChhY3Rpb24pID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGFjdGlvbik7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYWN0aW9uLm5vdGlmaWNhdGlvbi5kYXRhXHJcbiAgICAgICAgICBpZiAoZGF0YT8udXJsKSB7XHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgcm91dGVyIHBhc3NlZCBpbiBieSBRdWFzYXJcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goZGF0YS51cmwpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBEbyBub3QgcmVxdWVzdCBwZXJtaXNzaW9uIGhlcmUg4oCUIHdlIG9ubHkgc2V0IHVwIGxpc3RlbmVycyBpbiBpbml0TmF0aXZlUHVzaFxyXG4gICAgICAgIC8vYXdhaXQgaW5pdE5hdGl2ZVB1c2goKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdQdXNoIHBsdWdpbiBub3QgYXZhaWxhYmxlIG9yIG5vdCBvbiBtb2JpbGU6JywgZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCfinIUgUHVzaCAmIFRyYWNraW5nIGluaXRpYWxpemVkIGFmdGVyIExDUCcpXHJcbiAgfVxyXG4gIGluaXRDYXJUcmFja2luZygpXHJcbn1cclxuIiwiLy8gYm9vdC9sb2FkaW5nLWJhci5qc1xyXG5pbXBvcnQgeyBMb2FkaW5nQmFyIH0gZnJvbSAncXVhc2FyJ1xyXG5cclxubGV0IGluaXRpYWxpemVkID0gZmFsc2VcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TG9hZGluZ0Jhcihyb3V0ZXIpIHtcclxuICBpZiAoaW5pdGlhbGl6ZWQpIHJldHVyblxyXG4gIGluaXRpYWxpemVkID0gdHJ1ZVxyXG5cclxuICBMb2FkaW5nQmFyLnNldERlZmF1bHRzKHtcclxuICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgc2l6ZTogJzVweCcsXHJcbiAgICBwb3NpdGlvbjogJ3RvcCdcclxuICB9KVxyXG5cclxuICByb3V0ZXIuYmVmb3JlRWFjaCgodG8sIGZyb20sIG5leHQpID0+IHtcclxuICAgIExvYWRpbmdCYXIuc3RhcnQoKVxyXG4gICAgbmV4dCgpXHJcbiAgfSlcclxuXHJcbiAgcm91dGVyLmFmdGVyRWFjaCgoKSA9PiB7XHJcbiAgICBMb2FkaW5nQmFyLnN0b3AoKVxyXG4gIH0pXHJcbn0iLCIvLyBzcmMvYm9vdC9hdXRoLWV4cGlyZWQuanNcclxuaW1wb3J0IHsgRGlhbG9nIH0gZnJvbSAncXVhc2FyJ1xyXG5cclxubGV0IHNob3duID0gZmFsc2VcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0QXV0aFBvcHVwKHJvdXRlcikge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuXHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdhdXRoLWV4cGlyZWQnLCAoKSA9PiB7XHJcbiAgICBpZiAoc2hvd24pIHJldHVyblxyXG5cclxuICAgIHNob3duID0gdHJ1ZVxyXG5cclxuICAgIERpYWxvZy5jcmVhdGUoe1xyXG4gICAgICB0aXRsZTogJ1Nlc3Npb24gRXhwaXJlZCcsXHJcbiAgICAgIGNsYXNzOiAnZXhwaXJlZC1kaWFsb2cnLFxyXG4gICAgICBtZXNzYWdlOiAnWW91ciBzZXNzaW9uIGVuZGVkLiBDb250aW51ZSBhcyBndWVzdCBvciBsb2dpbiBhZ2Fpbi4nLFxyXG4gICAgICBvazoge2xhYmVsOiAnTG9naW4gQWdhaW4nLCBjb2xvcjogJ3NlY29uZGFyeSd9LFxyXG4gICAgICBjYW5jZWw6IHtsYWJlbDogJ0NvbnRpbnVlIGFzIEd1ZXN0JywgY29sb3I6ICdzZWNvbmRhcnknfSxcclxuICAgICAgcGVyc2lzdGVudDogdHJ1ZSxcclxuICAgICAgbm9Fc2NEaXNtaXNzOiB0cnVlLFxyXG4gICAgICBub0JhY2tkcm9wRGlzbWlzczogdHJ1ZVxyXG4gICAgfSkub25PaygoKSA9PiB7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvbXktYWNjb3VudCcpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn0iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiB2LWlmPVwiIXVpSHlkcmF0ZWQgJiYgc2hvdWxkRGVsYXlIeWRyYXRpb25cIiBjbGFzcz1cIm1pbmltYWwtZmFsbGJhY2tcIj5cclxuPGhlYWRlciBjbGFzcz1cInEtaGVhZGVyIHEtbGF5b3V0X19zZWN0aW9uLS1tYXJnaW5hbCBzdGlja3lcIj48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cInEtdG9vbGJhciByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgZmxleCBqdXN0aWZ5LWJldHdlZW4gcS1wYS1zbVwiIHJvbGU9XCJ0b29sYmFyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZmxleFwiPjwhLS0gRGVza3RvcCBOYXZpZ2F0aW9uIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicS10b29sYmFyX190aXRsZSBlbGxpcHNpcyBuYXYtYmFyIGd0LXNtXCI+PCEtLXYtaWYtLT5cclxuICAgICAgICA8YSBhcmlhLWN1cnJlbnQ9XCJwYWdlXCIgaHJlZj1cIi9cIiBjbGFzcz1cInJvdXRlci1saW5rLWFjdGl2ZSByb3V0ZXItbGluay1leGFjdC1hY3RpdmUgdGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+TXkgU2hvcDwvYT5cclxuICAgICAgICA8YSBocmVmPVwiL3Byb2R1Y3RzL1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+UHJvZHVjdHM8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIi9jYXJ0L1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+Q2FydDwvYT5cclxuICAgICAgICA8YSBocmVmPVwiL2NoZWNrb3V0L1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+Q2hlY2tvdXQ8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIi9teS1hY2NvdW50L1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+TXkgYWNjb3VudDwvYT5cclxuICAgICAgPC9kaXY+PCEtLSBNb2JpbGUgTWVudSBUb2dnbGUgLS0+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJxLWJ0biBxLWJ0bi1pdGVtIG5vbi1zZWxlY3RhYmxlIG5vLW91dGxpbmUgcS1idG4tLWZsYXQgcS1idG4tLXJlY3RhbmdsZSBxLWJ0bi0tYWN0aW9uYWJsZSBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZSBxLWJ0bi0tZGVuc2UgbHQtbWRcIiB0YWJpbmRleD1cIjBcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIk9wZW4gbWVudVwiIGZkcHJvY2Vzc2VkaWQ9XCJoaWIycGxcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtZm9jdXMtaGVscGVyXCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCBqdXN0aWZ5LWNlbnRlciByb3dcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwicS1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cImltZ1wiPlxyXG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIHN0eWxlPVwiZmlsbDogbm9uZTtcIj48L3BhdGg+PHBhdGggZD1cIk0zIDE4aDE4di0ySDN2MnptMC01aDE4di0ySDN2MnptMC03djJoMThWNkgzelwiPjwvcGF0aD48L3N2Zz5cclxuICAgICAgICAgIDwvaT48L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YSBhcmlhLWN1cnJlbnQ9XCJwYWdlXCIgaHJlZj1cIi9cIiBjbGFzcz1cInJvdXRlci1saW5rLWFjdGl2ZSByb3V0ZXItbGluay1leGFjdC1hY3RpdmUgZmxleCBpdGVtcy1jZW50ZXIgcS1tci1hdXRvIG9yZGVyLWZpcnN0XCIgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIHRvIGhvbWUgcGFnZVwiPjxzdmcgd2lkdGg9XCIxODBweFwiIGhlaWdodD1cIjQycHhcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyMDYuNzMgNDhcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPjx0ZXh0IHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg1NSAyMy43MSlcIiBzdHlsZT1cImZpbGw6IHZhcigtLXEtc2Vjb25kYXJ5KTsgZm9udC1mYW1pbHk6IEFyaWFsTVQsIEFyaWFsOyBmb250LXNpemU6IDI2cHg7IGlzb2xhdGlvbjogaXNvbGF0ZTtcIj48dHNwYW4geD1cIjBcIiB5PVwiMFwiPk5hdHVyYUJsb29tPC90c3Bhbj48L3RleHQ+PHRleHQgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDU2IDQxLjcxKVwiIHN0eWxlPVwiZmlsbDogdmFyKC0tcS1zZWNvbmRhcnkpOyBmb250LWZhbWlseTogQXJpYWxNVCwgQXJpYWw7IGZvbnQtc2l6ZTogMTJweDsgaXNvbGF0aW9uOiBpc29sYXRlO1wiPjx0c3BhbiB4PVwiMFwiIHk9XCIwXCI+TGV0PC90c3Bhbj48dHNwYW4geD1cIjE2LjY4XCIgeT1cIjBcIiBzdHlsZT1cImxldHRlci1zcGFjaW5nOiAtMC4wMmVtO1wiPuKAmTwvdHNwYW4+PHRzcGFuIHg9XCIxOS4xM1wiIHk9XCIwXCI+cyBCbG9vbTwvdHNwYW4+PHRzcGFuIHg9XCI2Mi40OFwiIHk9XCIwXCIgc3R5bGU9XCJsZXR0ZXItc3BhY2luZzogLTAuMDJlbTtcIj48L3RzcGFuPjx0c3BhbiB4PVwiNjUuNlwiIHk9XCIwXCIgc3R5bGU9XCJsZXR0ZXItc3BhY2luZzogLTAuMTFlbTtcIj5UPC90c3Bhbj48dHNwYW4geD1cIjcxLjZcIiB5PVwiMFwiPm9nZXRoZXI8L3RzcGFuPjwvdGV4dD48Y2lyY2xlIGN4PVwiMjRcIiBjeT1cIjI0XCIgcj1cIjI0XCIgc3R5bGU9XCJmaWxsOiByZ2IoMjQzLCAyMzYsIDIyNik7XCI+PC9jaXJjbGU+PHBhdGggZD1cIk0yNCwxMGM2LDEwLDYsMTgsMCwyOC02LTEwLTYtMTgsMC0yOFpcIiBzdHlsZT1cImZpbGw6IHJnYigxNjMsIDIwMSwgMTY4KTtcIj48L3BhdGg+PC9zdmc+PC9hPlxyXG4gICAgPGRpdj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tZmxhdCBxLWJ0bi0tcmVjdGFuZ2xlIHEtYnRuLS1hY3Rpb25hYmxlIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlIHEtYnRuLS1kZW5zZSBxLW1sLXNtIHEtbXItc21cIiB0YWJpbmRleD1cIjBcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIkFkZCB0byB3aXNobGlzdFwiIGZkcHJvY2Vzc2VkaWQ9XCJwZjh1bHBcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInEtZm9jdXMtaGVscGVyXCI+PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCBqdXN0aWZ5LWNlbnRlciByb3dcIj5cclxuICAgICAgICAgIDxpIGNsYXNzPVwicS1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cImltZ1wiPlxyXG4gICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIHN0eWxlPVwiZmlsbDogbm9uZTtcIj48L3BhdGg+PHBhdGggZD1cIk0xNi41IDNjLTEuNzQgMC0zLjQxLjgxLTQuNSAyLjA5QzEwLjkxIDMuODEgOS4yNCAzIDcuNSAzIDQuNDIgMyAyIDUuNDIgMiA4LjVjMCAzLjc4IDMuNCA2Ljg2IDguNTUgMTEuNTRMMTIgMjEuMzVsMS40NS0xLjMyQzE4LjYgMTUuMzYgMjIgMTIuMjggMjIgOC41IDIyIDUuNDIgMTkuNTggMyAxNi41IDN6bS00LjQgMTUuNTVsLS4xLjEtLjEtLjFDNy4xNCAxNC4yNCA0IDExLjM5IDQgOC41IDQgNi41IDUuNSA1IDcuNSA1YzEuNTQgMCAzLjA0Ljk5IDMuNTcgMi4zNmgxLjg3QzEzLjQ2IDUuOTkgMTQuOTYgNSAxNi41IDVjMiAwIDMuNSAxLjUgMy41IDMuNSAwIDIuODktMy4xNCA1Ljc0LTcuOSAxMC4wNXpcIj48L3BhdGg+PC9zdmc+PC9pPlxyXG4gICAgICAgIDwvc3Bhbj48L2J1dHRvbj48YnV0dG9uIGNsYXNzPVwicS1idG4gcS1idG4taXRlbSBub24tc2VsZWN0YWJsZSBuby1vdXRsaW5lIHEtYnRuLS1mbGF0IHEtYnRuLS1yZWN0YW5nbGUgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUgcS1idG4tLWRlbnNlXCIgdGFiaW5kZXg9XCIwXCIgdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJWaWV3IGNhcnRcIiBmZHByb2Nlc3NlZGlkPVwibTd3Z2FhXCI+PHNwYW4gY2xhc3M9XCJxLWZvY3VzLWhlbHBlclwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInEtYnRuX19jb250ZW50IHRleHQtY2VudGVyIGNvbCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAganVzdGlmeS1jZW50ZXIgcm93XCI+PGkgY2xhc3M9XCJxLWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwiaW1nXCI+PHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0wIDBoMjR2MjRIMHpcIiBzdHlsZT1cImZpbGw6IG5vbmU7XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNyAxOGMtMS4xIDAtMS45OS45LTEuOTkgMlM1LjkgMjIgNyAyMnMyLS45IDItMi0uOS0yLTItMnpNMSAydjJoMmwzLjYgNy41OS0xLjM1IDIuNDVjLS4xNi4yOC0uMjUuNjEtLjI1Ljk2IDAgMS4xLjkgMiAyIDJoMTJ2LTJINy40MmMtLjE0IDAtLjI1LS4xMS0uMjUtLjI1bC4wMy0uMTIuOS0xLjYzaDcuNDVjLjc1IDAgMS40MS0uNDEgMS43NS0xLjAzbDMuNTgtNi40OWMuMDgtLjE0LjEyLS4zMS4xMi0uNDggMC0uNTUtLjQ1LTEtMS0xSDUuMjFsLS45NC0ySDF6bTE2IDE2Yy0xLjEgMC0xLjk5LjktMS45OSAycy44OSAyIDEuOTkgMiAyLS45IDItMi0uOS0yLTItMnpcIj48L3BhdGg+PC9zdmc+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjwhLS0tLT5cclxuPC9oZWFkZXI+XHJcblxyXG4gICAgPG1haW4+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nLXRvcDogNThweFwiPlxyXG4gICAgPHJvdXRlci12aWV3IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L21haW4+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxxLWxheW91dCB2aWV3PVwiaEhoIGxwUiBmRmZcIiB2LWVsc2U+XHJcbiAgICA8cS1oZWFkZXIgY2xhc3M9XCJzdGlja3lcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPHEtdG9vbGJhciBjbGFzcz1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHEtcGEtc21cIj5cclxuICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IG5hdi1pdGVtcy1lbFwiIHYtaWY9XCJ1aUh5ZHJhdGVkXCI+XHJcbiAgICAgPCEtLSBEZXNrdG9wIE5hdmlnYXRpb24gLS0+XHJcbiAgICAgICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwibmF2LWJhciBndC1zbVwiPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdi1pZj1cImlzU3VwZXJBZG1pblwiIHRvPVwiL2FkbWluXCIgY2xhc3M9XCJ0ZXh0LWg2IG5vLWRlY29yYXRpb25cIj48cS1pY29uIDpuYW1lPVwibWF0QWRtaW5QYW5lbFNldHRpbmdzXCIgLz4gR28gdG8gQWRtaW4gUGFuZWw8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvXCIgY2xhc3M9XCJ0ZXh0LWg2IG5vLWRlY29yYXRpb25cIj5NeSBTaG9wPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Byb2R1Y3RzL1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+UHJvZHVjdHM8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvY2FydC9cIiBjbGFzcz1cInRleHQtaDYgbm8tZGVjb3JhdGlvblwiPkNhcnQ8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvY2hlY2tvdXQvXCIgY2xhc3M9XCJ0ZXh0LWg2IG5vLWRlY29yYXRpb25cIj5DaGVja291dDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9teS1hY2NvdW50L1wiIGNsYXNzPVwidGV4dC1oNiBuby1kZWNvcmF0aW9uXCI+TXkgYWNjb3VudDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICA8L3EtdG9vbGJhci10aXRsZT5cclxuXHJcbiAgICAgICAgICA8IS0tIE1vYmlsZSBNZW51IFRvZ2dsZSAtLT5cclxuICAgICAgICAgIDxxLWJ0biBmbGF0IGRlbnNlIDppY29uPVwibWF0TWVudVwiIGFyaWEtbGFiZWw9XCJPcGVuIG1lbnVcIiBjbGFzcz1cImx0LW1kXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IHRydWVcIiAvPlxyXG5cclxuICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9cIiBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgdG8gaG9tZSBwYWdlXCIgY2xhc3M9XCJmbGV4IGl0ZW1zLWNlbnRlciBvcmRlci1maXJzdFwiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjE4MHB4XCIgaGVpZ2h0PVwiNDJweFwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjA2LjczIDQ4XCI+PHRleHQgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDU1IDIzLjcxKVwiIHN0eWxlPVwiZmlsbDp2YXIoLS1xLXNlY29uZGFyeSk7Zm9udC1mYW1pbHk6QXJpYWxNVCwgQXJpYWw7IGZvbnQtc2l6ZToyNnB4OyBpc29sYXRpb246aXNvbGF0ZTtcIj48dHNwYW4geD1cIjBcIiB5PVwiMFwiPk5hdHVyYUJsb29tPC90c3Bhbj48L3RleHQ+PHRleHQgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDU2IDQxLjcxKVwiIHN0eWxlPVwiZmlsbDp2YXIoLS1xLXNlY29uZGFyeSk7Zm9udC1mYW1pbHk6QXJpYWxNVCwgQXJpYWw7IGZvbnQtc2l6ZToxMnB4OyBpc29sYXRpb246aXNvbGF0ZTtcIj48dHNwYW4geD1cIjBcIiB5PVwiMFwiPkxldDwvdHNwYW4+PHRzcGFuIHg9XCIxNi42OFwiIHk9XCIwXCIgc3R5bGU9XCJsZXR0ZXItc3BhY2luZzotLjAyZW07XCI+4oCZPC90c3Bhbj48dHNwYW4geD1cIjE5LjEzXCIgeT1cIjBcIj5zIEJsb29tPC90c3Bhbj48dHNwYW4geD1cIjYyLjQ4XCIgeT1cIjBcIiBzdHlsZT1cImxldHRlci1zcGFjaW5nOi0uMDJlbTtcIj4gPC90c3Bhbj48dHNwYW4geD1cIjY1LjZcIiB5PVwiMFwiIHN0eWxlPVwibGV0dGVyLXNwYWNpbmc6LS4xMWVtO1wiPlQ8L3RzcGFuPjx0c3BhbiB4PVwiNzEuNlwiIHk9XCIwXCI+b2dldGhlcjwvdHNwYW4+PC90ZXh0PjxjaXJjbGUgY3g9XCIyNFwiIGN5PVwiMjRcIiByPVwiMjRcIiBzdHlsZT1cImZpbGw6I2YzZWNlMjtcIi8+PHBhdGggZD1cIk0yNCwxMGM2LDEwLDYsMTgsMCwyOC02LTEwLTYtMTgsMC0yOFpcIiBzdHlsZT1cImZpbGw6I2EzYzlhODtcIi8+PC9zdmc+XHJcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8cS1idG4gZmxhdCBkZW5zZSA6aWNvbj1cIm1hdEZhdm9yaXRlQm9yZGVyXCIgYXJpYS1sYWJlbD1cIkFkZCB0byB3aXNobGlzdFwiIEBjbGljaz1cInRvZ2dsZVdpc2hsaXN0RHJhd2VyXCIgY2xhc3M9XCJxLW1sLXNtIHEtbXItc21cIj5cclxuICAgICAgICAgIDxxLWJhZGdlIHYtaWY9XCJzdG9yZVJlYWR5ICYmIHdpc2hsaXN0LnN0YXRlLml0ZW1zICYmIE9iamVjdC5rZXlzKHdpc2hsaXN0LnN0YXRlLml0ZW1zKS5sZW5ndGggPiAwXCIgZmxvYXRpbmcgY29sb3I9XCJyZWRcIj57eyBPYmplY3Qua2V5cyh3aXNobGlzdC5zdGF0ZS5pdGVtcykubGVuZ3RoIH19PC9xLWJhZGdlPlxyXG4gICAgICAgIDwvcS1idG4+XHJcblxyXG4gICAgICAgIDxxLWJ0biBmbGF0IGRlbnNlIDppY29uPVwibWF0U2hvcHBpbmdDYXJ0XCIgYXJpYS1sYWJlbD1cIlZpZXcgY2FydFwiIEBjbGljaz1cInRvZ2dsZUNhcnRcIj5cclxuICAgICAgICAgIDxxLW5vLXNzcj5cclxuICAgICAgICAgIDxxLWJhZGdlIHYtaWY9XCJzdG9yZVJlYWR5ICYmIGNhcnQuc3RhdGUuaXRlbXNfY291bnQgPiAwXCIgZmxvYXRpbmcgY29sb3I9XCJyZWRcIj57eyBjYXJ0LnN0YXRlLml0ZW1zX2NvdW50IH19PC9xLWJhZGdlPlxyXG4gICAgICAgICAgPC9xLW5vLXNzcj5cclxuICAgICAgICA8L3EtYnRuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3EtdG9vbGJhcj5cclxuICAgICA8L2Rpdj5cclxuICAgIDwvcS1oZWFkZXI+XHJcblxyXG4gICAgPCEtLSBNb2JpbGUgTmF2aWdhdGlvbiBEcmF3ZXIgLS0+XHJcbiAgICA8cS1kcmF3ZXJcclxuICAgICAgdi1tb2RlbD1cIm1vYmlsZU1lbnVEcmF3ZXJcIlxyXG4gICAgICBzaWRlPVwibGVmdFwiXHJcbiAgICAgIG92ZXJsYXlcclxuICAgICAgYmVoYXZpb3I9XCJtb2JpbGVcIlxyXG4gICAgICA6d2lkdGg9XCJkcmF3ZXJXaWR0aFwiXHJcbiAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNsaWRlLXJpZ2h0XCJcclxuICAgICAgdHJhbnNpdGlvbi1oaWRlPVwic2xpZGUtbGVmdFwiXHJcbiAgICAgIDp0b3VjaC1hcmVhLXdpZHRoPVwiMjUwXCJcclxuICAgICAgdi1pZj1cInVpSHlkcmF0ZWRcIlxyXG4gICAgPlxyXG4gICAgICA8cS1zY3JvbGwtYXJlYSBjbGFzcz1cImZpdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW1iLW1kXCI+TWVudTwvZGl2PlxyXG4gICAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBwYWRkaW5nPlxyXG4gICAgICAgICAgICA8cS1pdGVtXHJcbiAgICAgIHYtaWY9XCJpc1N1cGVyQWRtaW5cIlxyXG4gICAgICBjbGlja2FibGVcclxuICAgICAgdi1yaXBwbGVcclxuICAgICAgdG89XCIvYWRtaW5cIlxyXG4gICAgICBhY3RpdmUtY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIlxyXG4gICAgPlxyXG4gICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxyXG4gICAgICAgIDxxLWljb24gbmFtZT1cImFkbWluX3BhbmVsX3NldHRpbmdzXCIgLz5cclxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgPHEtaXRlbS1zZWN0aW9uPkdvIHRvIEFkbWluIFBhbmVsPC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgIDwvcS1pdGVtPlxyXG5cclxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGUgdG89XCIvXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj48cS1pY29uIDpuYW1lPVwibWF0SG9tZVwiIC8+PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+SG9tZTwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtPlxyXG5cclxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGUgdG89XCIvcHJvZHVjdHMvXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj48cS1pY29uIDpuYW1lPVwibWF0U3RvcmVmcm9udFwiIC8+PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+UHJvZHVjdHM8L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3EtaXRlbT5cclxuXHJcbiAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlIHRvPVwiL2NhcnQvXCIgQGNsaWNrPVwibW9iaWxlTWVudURyYXdlciA9IGZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj48cS1pY29uIDpuYW1lPVwibWF0U2hvcHBpbmdDYXJ0XCIgLz48L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5DYXJ0PC9xLWl0ZW0tc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9xLWl0ZW0+XHJcblxyXG4gICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZSB0bz1cIi9jaGVja291dC9cIiBAY2xpY2s9XCJtb2JpbGVNZW51RHJhd2VyID0gZmFsc2VcIj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPjxxLWljb24gOm5hbWU9XCJtYXRSZWNlaXB0XCIgLz48L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5DaGVja291dDwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvcS1pdGVtPlxyXG5cclxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGUgdG89XCIvbXktYWNjb3VudC9cIiBAY2xpY2s9XCJtb2JpbGVNZW51RHJhd2VyID0gZmFsc2VcIj5cclxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPjxxLWljb24gOm5hbWU9XCJtYXRQZXJzb25cIiAvPjwvcS1pdGVtLXNlY3Rpb24+XHJcbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPk15IEFjY291bnQ8L3EtaXRlbS1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L3EtaXRlbT5cclxuICAgICAgICAgIDwvcS1saXN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxxLWJhbm5lclxyXG4gICAgICAgICAgdi1pZj1cInN1cHBvcnRlZCAmJiBwZXJtaXNzaW9uICE9PSAnZ3JhbnRlZCcgJiYgcGVybWlzc2lvbiAhPT0gJ2RlbmllZCdcIlxyXG4gICAgICAgICAgY2xhc3M9XCJiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZSBxLW1hLW1kIHJvdW5kZWQtYm9yZGVycyBzaGFkb3ctMlwiXHJcbiAgICAgICAgICBpbmxpbmUtYWN0aW9uc1xyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxXCI+RW5hYmxlIHB1c2ggbm90aWZpY2F0aW9ucz88L2Rpdj5cclxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFjdGlvbj5cclxuICAgICAgICAgIDxxLWJ0biBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxO1wiIG91dGxpbmUgcGFkZGluZz1cInNtXCIgY29sb3I9XCJzZWNvbmRhcnlcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBsYWJlbD1cIkVuYWJsZVwiIEBjbGljaz1cImhhbmRsZVN1YnNjcmliZVwiIC8+XHJcbiAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgPC9xLWJhbm5lcj5cclxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxyXG4gICAgPC9xLWRyYXdlcj5cclxuXHJcbiAgPCEtLSBXaXNobGlzdCBEcmF3ZXIgLS0+XHJcbiAgPHEtZHJhd2VyXHJcbiAgICB2LW1vZGVsPVwid2lzaGxpc3REcmF3ZXJPcGVuXCJcclxuICAgIHNpZGU9XCJyaWdodFwiXHJcbiAgICBvdmVybGF5XHJcbiAgICA6d2lkdGg9XCJkcmF3ZXJXaWR0aFwiXHJcbiAgICBiZWhhdmlvcj1cIm1vYmlsZVwiXHJcbiAgICB2LWlmPVwidWlIeWRyYXRlZFwiXHJcbiAgPlxyXG4gICAgPFdpc2hsaXN0RHJhd2VyIC8+XHJcbiAgPC9xLWRyYXdlcj5cclxuPCEtLS0tLS0tLS0tLS0tLSAtLS0tLS0tPlxyXG4gICAgPHEtZHJhd2VyXHJcbiAgICAgIHYtbW9kZWw9XCJjYXJ0RHJhd2VyXCJcclxuICAgICAgc2lkZT1cInJpZ2h0XCJcclxuICAgICAgb3ZlcmxheVxyXG4gICAgICBiZWhhdmlvcj1cIm1vYmlsZVwiXHJcbiAgICAgIDp3aWR0aD1cImRyYXdlcldpZHRoXCJcclxuICAgICAgY2xhc3M9XCJjYXJ0LWRyYXdlclwiXHJcbiAgICAgIDp0b3VjaC1hcmVhLXdpZHRoPVwiMjUwXCJcclxuICAgICAgdi1pZj1cInVpSHlkcmF0ZWRcIlxyXG4gICAgPlxyXG4gICAgICA8cS1uby1zc3I+XHJcblxyXG4gICAgICA8cS1zY3JvbGwtYXJlYSA6dmlzaWJsZT1cImZhbHNlXCIgY2xhc3M9XCJmaXRcIj5cclxuICAgICAgICA8aDQgY2xhc3M9XCJzdGlja3lcIj5DYXJ0PC9oND5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJjYXJ0Lmhhc0l0ZW1zLnZhbHVlXCI+XHJcbiAgICAgICAgPGRpdiB2LWZvcj1cIml0ZW0gaW4gY2FydC5zdGF0ZS5pdGVtc1wiIDprZXk9XCJpdGVtLmlkXCIgY2xhc3M9XCJxLXBhLXNtIHJvdyBpdGVtcy1jZW50ZXJcIiA6Y2xhc3M9XCJbaXRlbS5rZXkuaW5jbHVkZXMoJ29mZmxpbmUnKSA/ICdvZmZsaW5lLWl0ZW0nIDogJyddXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSBmbGV4XCI+XHJcbiAgICAgICAgICA8aW1nIHYtaWY9XCJpdGVtLmltYWdlc1wiIDpzcmM9XCJjYXJ0LnN0YXRlLm9mZmxpbmUgPT09IHRydWUgPyBpdGVtPy5pbWFnZXNbMF0/LnNyYyA6IGl0ZW0uaW1hZ2VzWzBdPy50aHVtYm5haWxcIiBzdHlsZT1cIndpZHRoOiA3MHB4OyBoZWlnaHQ6IDcwcHg7IG9iamVjdC1maXQ6IGNvdmVyXCIgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtbWV0YVwiPlxyXG4gICAgICAgICAgICA8ZGl2Pnt7IGl0ZW0ubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgIDxkaXYgdi1pZj1cIml0ZW0udmFyaWF0aW9uICYmIGl0ZW0udmFyaWF0aW9uLmxlbmd0aCA+IDBcIj5cclxuICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgIHYtZm9yPVwiKHZhcmlhdGlvbiwgaW5kZXgpIGluIGl0ZW0udmFyaWF0aW9uXCJcclxuICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICB7e3ZhcmlhdGlvbi5hdHRyaWJ1dGV9fToge3t2YXJpYXRpb24udmFsdWV9fVxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwiaXRlbS5wcmljZXNcIj5cclxuICAgICAgICAgICAgICB7e2Zvcm1hdEN1cnJlbmN5KFxyXG4gICAgaXRlbS5wcmljZXMucHJpY2UsXHJcbiAgICB7XHJcbiAgICAgIG1pbm9yVW5pdDogaXRlbS5wcmljZXM/LmN1cnJlbmN5X21pbm9yX3VuaXQgPz8gMixcclxuICAgICAgZGVjaW1hbFNlcGFyYXRvcjogaXRlbS5wcmljZXM/LmN1cnJlbmN5X2RlY2ltYWxfc2VwYXJhdG9yID8/ICcuJyxcclxuICAgICAgcHJlZml4OiBpdGVtLnByaWNlcz8uY3VycmVuY3lfcHJlZml4ID8/ICfigqonLFxyXG4gICAgICBzdWZmaXg6IGl0ZW0ucHJpY2VzPy5jdXJyZW5jeV9zdWZmaXggPz8gJydcclxuICAgIH1cclxuICApfX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInF0eS13cmFwXCI+XHJcbiAgICAgICAgICAgICAgPHEtYnRuIHNpemU9XCJ4c1wiIHBhZGRpbmc9XCJ4c1wiIDpmbGF0PVwidHJ1ZVwiIDppY29uPVwibWF0UmVtb3ZlXCIgQGNsaWNrPVwiZGVjcmVhc2UoaXRlbS5rZXkpXCIgOmRpc2FibGU9XCJpdGVtLnF1YW50aXR5ID09PSAxXCIgLz5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInEtbXgtc21cIj57eyBpdGVtLnF1YW50aXR5IH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biBzaXplPVwieHNcIiBwYWRkaW5nPVwieHNcIiA6ZmxhdD1cInRydWVcIiA6aWNvbj1cIm1hdEFkZFwiIEBjbGljaz1cImluY3JlYXNlKGl0ZW0uaWQpXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8cS1idG4gOm91dGxpbmU9XCJ0cnVlXCIgc2l6ZT1cInhzXCIgcGFkZGluZz1cInhzXCIgOmljb249XCJtYXRDbG9zZVwiIEBjbGljaz1cInJlbW92ZShpdGVtLmtleSwgaXRlbS5yZW1vdGVfa2V5KVwiIGNsYXNzPVwicS1tbC1zbVwiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInEtcGEtc20gcm93IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICAgICAgPGg1PnNlZW1zIGxpa2UgeW91ciBjYXJ0IGlzIGVtcHR5PC9oNT5cclxuICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9wcm9kdWN0cy9cIj5cclxuICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlNob3Agbm93IVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJ0LWRldGFpbHMgc3RpY2t5XCIgdi1pZj1cImNhcnQuaGFzSXRlbXMudmFsdWVcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJ0LXRvdGFsc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj48c3Bhbj5TdWJ0b3RhbDo8L3NwYW4+IDxzcGFuPiB7e2Zvcm1hdEN1cnJlbmN5KFxyXG4gICAgY2FydC5zdGF0ZS5jYXJ0X2FycmF5Py50b3RhbHM/LnRvdGFsX3ByaWNlID8gY2FydC5zdGF0ZS5jYXJ0X2FycmF5LnRvdGFscy50b3RhbF9wcmljZSA6IGNhcnQuc3RhdGU/LnRvdGFscz8udG90YWxfcHJpY2UsXHJcbiAgICB7XHJcbiAgICAgIG1pbm9yVW5pdDogY2FydC5zdGF0ZT8udG90YWxzPy5jdXJyZW5jeV9taW5vcl91bml0ID8/IDIsXHJcbiAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IGNhcnQuc3RhdGU/LnRvdGFscz8uY3VycmVuY3lfZGVjaW1hbF9zZXBhcmF0b3IgPz8gJy4nLFxyXG4gICAgICBwcmVmaXg6IGNhcnQuc3RhdGU/LnRvdGFscz8uY3VycmVuY3lfcHJlZml4ID8/ICfigqonLFxyXG4gICAgICBzdWZmaXg6IGNhcnQuc3RhdGU/LnRvdGFscz8uY3VycmVuY3lfc3VmZml4ID8/ICcnXHJcbiAgICB9XHJcbiAgKX19PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy13cmFwXCI+XHJcbiAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL2NoZWNrb3V0L1wiPlxyXG4gICAgICAgICA8cS1idG5cclxuICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgIGxhYmVsPVwiQ2hlY2tvdXRcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvY2FydC9cIj5cclxuICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICA6b3V0bGluZT1cInRydWVcIlxyXG4gICAgICAgICAgY29sb3I9XCJ0cmFuc3BhcmVudFwiXHJcbiAgICAgICAgICBsYWJlbD1cIlZpZXcgQ2FydFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9xLXNjcm9sbC1hcmVhPlxyXG4gICAgICAgPC9xLW5vLXNzcj5cclxuICAgIDwvcS1kcmF3ZXI+XHJcbiAgICA8YWktYXNzaXN0YW50IHYtaWY9XCJ1aUh5ZHJhdGVkXCI+PC9haS1hc3Npc3RhbnQ+XHJcbiAgICA8YnV0dG9uIHYtZWxzZSBjbGFzcz1cInEtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSBxLWJ0bi0tc3RhbmRhcmQgcS1idG4tLXJlY3RhbmdsZSBxLWJ0bi0tcm91bmRlZCBiZy1wcmltYXJ5IHRleHQtd2hpdGUgcS1idG4tLWFjdGlvbmFibGUgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUgcS1idG4tLWZhYiBmaXhlZC1ib3R0b20tbGVmdCBxLW1iLW1kIHEtbWwtbWQgei1tYXhcIiB0YWJpbmRleD1cIjBcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cIk9wZW4gY2hhdFwiPjxzcGFuIGNsYXNzPVwicS1mb2N1cy1oZWxwZXJcIiB0YWJpbmRleD1cIi0xXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwicS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCBqdXN0aWZ5LWNlbnRlciByb3dcIj48aSBjbGFzcz1cInEtaWNvbiBhYnNvbHV0ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgc3R5bGU9XCJmaWxsOiBub25lO1wiPjwvcGF0aD48cGF0aCBkPVwiTTIwIDJINGMtMS4xIDAtMS45OS45LTEuOTkgMkwyIDIybDQtNGgxNGMxLjEgMCAyLS45IDItMlY0YzAtMS4xLS45LTItMi0yek02IDloMTJ2Mkg2Vjl6bTggNUg2di0yaDh2MnptNC02SDZWNmgxMnYyelwiPjwvcGF0aD48L3N2Zz48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgPHEtcGFnZS1jb250YWluZXIgOnN0eWxlPVwidWlIeWRyYXRlZCA/IHt9IDogeyBwYWRkaW5nVG9wOiAnNThweCcgfVwiPlxyXG4gICAgICA8bWFpbj5cclxuICAgICAgICA8cm91dGVyLXZpZXcgLz5cclxuICAgICAgPC9tYWluPlxyXG4gICAgPC9xLXBhZ2UtY29udGFpbmVyPlxyXG5cclxuICAgIDxmb290ZXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbHVtbiBmaXJzdFwiPlxyXG4gICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDhcIiBoZWlnaHQ9XCIxNVwiIHZpZXdCb3g9XCIwIDAgMTA4IDE1XCIgZmlsbD1cIm5vbmVcIj48cGF0aCBkPVwiTTEwLjcwMzEgMS41NTI3M0w4Ljk0NTMxIDEuMjk4ODNWMC43ODEyNUgxMy40MDgyVjEuMjk4ODNMMTEuNzI4NSAxLjU1MjczVjEzLjg3N0gxMC43ODEyTDIuNzA1MDggMi4wOTk2MVYxMy4wOTU3TDQuNDYyODkgMTMuMzU5NFYxMy44NzdIMFYxMy4zNTk0TDEuNjc5NjkgMTMuMDk1N1YxLjU1MjczTDAgMS4yOTg4M1YwLjc4MTI1SDMuOTY0ODRMMTAuNzAzMSAxMC40Nzg1VjEuNTUyNzNaTTE4LjQwODIgNC40OTIxOUMxOC44MjQ5IDQuNDkyMTkgMTkuMjEyMiA0LjUzMTI1IDE5LjU3MDMgNC42MDkzOEMxOS45Mjg0IDQuNjg3NSAyMC4yMzc2IDQuODIwOTYgMjAuNDk4IDUuMDA5NzdDMjAuNzU4NSA1LjE5ODU3IDIwLjk2MTkgNS40NTQxIDIxLjEwODQgNS43NzYzN0MyMS4yNTQ5IDYuMDk4NjMgMjEuMzI4MSA2LjUwMzkxIDIxLjMyODEgNi45OTIxOVYxMy4xOTM0TDIyLjQ3MDcgMTMuNDM3NVYxMy44NzdIMTkuOTUxMkwxOS43NjU2IDEyLjk1OUMxOS42NjggMTMuMDU2NiAxOS41MzYxIDEzLjE3MDYgMTkuMzcwMSAxMy4zMDA4QzE5LjIwNDEgMTMuNDMxIDE5LjAwMzkgMTMuNTUzMSAxOC43Njk1IDEzLjY2N0MxOC41MzUyIDEzLjc4MDkgMTguMjYzMyAxMy44NzcgMTcuOTU0MSAxMy45NTUxQzE3LjY0NDkgMTQuMDMzMiAxNy4zMDE0IDE0LjA3MjMgMTYuOTIzOCAxNC4wNzIzQzE2LjQ4MTEgMTQuMDcyMyAxNi4xMDg0IDE0LjAwMzkgMTUuODA1NyAxMy44NjcyQzE1LjUwMjkgMTMuNzMwNSAxNS4yNjA0IDEzLjU0IDE1LjA3ODEgMTMuMjk1OUMxNC44OTU4IDEzLjA1MTggMTQuNzY1NiAxMi43NjIgMTQuNjg3NSAxMi40MjY4QzE0LjYwOTQgMTIuMDkxNSAxNC41NzAzIDExLjcyODUgMTQuNTcwMyAxMS4zMzc5QzE0LjU3MDMgMTAuOTM0MiAxNC42MTkxIDEwLjU4NDMgMTQuNzE2OCAxMC4yODgxQzE0LjgxNDUgOS45OTE4NiAxNC45NTEyIDkuNzQyODQgMTUuMTI3IDkuNTQxMDJDMTUuMzAyNyA5LjMzOTE5IDE1LjUwOTQgOS4xNzQ4IDE1Ljc0NzEgOS4wNDc4NUMxNS45ODQ3IDguOTIwOSAxNi4yNDE5IDguODIxNjEgMTYuNTE4NiA4Ljc1QzE2Ljc5NTIgOC42NzgzOSAxNy4wODgyIDguNjI5NTYgMTcuMzk3NSA4LjYwMzUyQzE3LjcwNjcgOC41Nzc0NyAxOC4wMTc2IDguNTYxMiAxOC4zMzAxIDguNTU0NjlMMTkuNzA3IDguNTE1NjJWNy4wODAwOEMxOS43MDcgNi44MDY2NCAxOS42ODQyIDYuNTU3NjIgMTkuNjM4NyA2LjMzMzAxQzE5LjU5MzEgNi4xMDg0IDE5LjUxNjYgNS45MTQ3MSAxOS40MDkyIDUuNzUxOTVDMTkuMzAxOCA1LjU4OTE5IDE5LjE1NjkgNS40NjIyNCAxOC45NzQ2IDUuMzcxMDlDMTguNzkyMyA1LjI3OTk1IDE4LjU2NDUgNS4yMzQzOCAxOC4yOTEgNS4yMzQzOEMxNy45Nzg1IDUuMjM0MzggMTcuNjYyOCA1LjI3NjY5IDE3LjM0MzggNS4zNjEzM0MxNy4wMjQ3IDUuNDQ1OTYgMTYuNzQ0OCA1LjU1NjY0IDE2LjUwMzkgNS42OTMzNkwxNi4xNzE5IDYuODM1OTRIMTUuNjI1VjQuODMzOThDMTYuMDQ4MiA0Ljc0Mjg0IDE2LjQ4NiA0LjY2MzA5IDE2LjkzODUgNC41OTQ3M0MxNy4zOTEgNC41MjYzNyAxNy44ODA5IDQuNDkyMTkgMTguNDA4MiA0LjQ5MjE5Wk0xOS43MDcgOS4xOTkyMkwxOC40Mjc3IDkuMjM4MjhDMTguMDQzNiA5LjI1MTMgMTcuNzExNiA5LjI4ODc0IDE3LjQzMTYgOS4zNTA1OUMxNy4xNTE3IDkuNDEyNDMgMTYuOTIwNiA5LjUxODIzIDE2LjczODMgOS42Njc5N0MxNi41NTYgOS44MTc3MSAxNi40MTkzIDEwLjAyMjggMTYuMzI4MSAxMC4yODMyQzE2LjIzNyAxMC41NDM2IDE2LjE5MTQgMTAuODc1NyAxNi4xOTE0IDExLjI3OTNDMTYuMTkxNCAxMi40MjUxIDE2LjY1NjkgMTIuOTk4IDE3LjU4NzkgMTIuOTk4QzE4LjAzMDYgMTIuOTk4IDE4LjQxMzEgMTIuOTQ3NiAxOC43MzU0IDEyLjg0NjdDMTkuMDU3NiAxMi43NDU4IDE5LjM4MTUgMTIuNjE3MiAxOS43MDcgMTIuNDYwOVY5LjE5OTIyWk0yNi4wMDU5IDE0LjA3MjNDMjUuMzgwOSAxNC4wNzIzIDI0LjkxMzcgMTMuODg2NyAyNC42MDQ1IDEzLjUxNTZDMjQuMjk1MiAxMy4xNDQ1IDI0LjE0MDYgMTIuNjIzNyAyNC4xNDA2IDExLjk1MzFWNS41MTc1OEgyMi45Mzk1VjUuMDc4MTJMMjQuMTYwMiA0LjY5NzI3TDI1LjE0NjUgMi42MTcxOUgyNS43NjE3VjQuNjk3MjdIMjcuODYxM1Y1LjUxNzU4SDI1Ljc2MTdWMTEuNzc3M0MyNS43NjE3IDEyLjIwMDUgMjUuODU3NyAxMi41MTk1IDI2LjA0OTggMTIuNzM0NEMyNi4yNDE5IDEyLjk0OTIgMjYuNDk0MSAxMy4wNTY2IDI2LjgwNjYgMTMuMDU2NkMyNy4wNDc1IDEzLjA1NjYgMjcuMjg2OCAxMy4wNDA0IDI3LjUyNDQgMTMuMDA3OEMyNy43NjIgMTIuOTc1MyAyNy45ODE4IDEyLjkzOTUgMjguMTgzNiAxMi45MDA0VjEzLjUzNTJDMjguMDg1OSAxMy42MDAzIDI3Ljk1NzQgMTMuNjY1NCAyNy43OTc5IDEzLjczMDVDMjcuNjM4MyAxMy43OTU2IDI3LjQ2MjYgMTMuODUyNSAyNy4yNzA1IDEzLjkwMTRDMjcuMDc4NSAxMy45NTAyIDI2Ljg3NSAxMy45OTA5IDI2LjY2MDIgMTQuMDIzNEMyNi40NDUzIDE0LjA1NiAyNi4yMjcyIDE0LjA3MjMgMjYuMDA1OSAxNC4wNzIzWk0zMS4zNTc0IDExLjI1OThDMzEuMzU3NCAxMS44MDAxIDMxLjQ3OTUgMTIuMjE1MiAzMS43MjM2IDEyLjUwNDlDMzEuOTY3OCAxMi43OTQ2IDMyLjM2NjUgMTIuOTM5NSAzMi45MTk5IDEyLjkzOTVDMzMuMjg0NSAxMi45Mzk1IDMzLjY2MjEgMTIuOTE1IDM0LjA1MjcgMTIuODY2MkMzNC40NDM0IDEyLjgxNzQgMzQuODIxIDEyLjc0MDkgMzUuMTg1NSAxMi42MzY3VjUuMzgwODZMMzMuNzk4OCA1LjEzNjcyVjQuNjk3MjdIMzYuNzk2OVYxMy4xOTM0TDM3Ljk1OSAxMy40Mzc1VjEzLjg3N0gzNS4yODMyTDM1LjIwNTEgMTMuMTM0OEMzNS4wMTYzIDEzLjIzODkgMzQuNzkxNyAxMy4zNDY0IDM0LjUzMTIgMTMuNDU3QzM0LjI3MDggMTMuNTY3NyAzMy45OTkgMTMuNjY4NiAzMy43MTU4IDEzLjc1OThDMzMuNDMyNiAxMy44NTA5IDMzLjE0NzggMTMuOTI1OCAzMi44NjEzIDEzLjk4NDRDMzIuNTc0OSAxNC4wNDMgMzIuMzE0NSAxNC4wNzIzIDMyLjA4MDEgMTQuMDcyM0MzMS43Mjg1IDE0LjA3MjMgMzEuNDA5NSAxNC4wMjM0IDMxLjEyMyAxMy45MjU4QzMwLjgzNjYgMTMuODI4MSAzMC41OTA4IDEzLjY3MTkgMzAuMzg1NyAxMy40NTdDMzAuMTgwNyAxMy4yNDIyIDMwLjAyMTIgMTIuOTYzOSAyOS45MDcyIDEyLjYyMjFDMjkuNzkzMyAxMi4yODAzIDI5LjczNjMgMTEuODY1MiAyOS43MzYzIDExLjM3N1Y1LjM4MDg2TDI4LjU2NDUgNS4xMzY3MlY0LjY5NzI3SDMxLjM1NzRWMTEuMjU5OFpNNDQuNzg1MiA0LjQ1MzEyVjYuOTMzNTlINDQuMzY1Mkw0My43OTg4IDUuODU5MzhDNDMuNjE2NSA1Ljg1OTM4IDQzLjQyMTIgNS44NzI0IDQzLjIxMjkgNS44OTg0NEM0My4wMDQ2IDUuOTI0NDggNDIuNzk2MiA1Ljk1ODY2IDQyLjU4NzkgNi4wMDA5OEM0Mi4zNzk2IDYuMDQzMjkgNDIuMTc5NCA2LjA5Mzc1IDQxLjk4NzMgNi4xNTIzNEM0MS43OTUyIDYuMjEwOTQgNDEuNjI3NiA2LjI3Mjc5IDQxLjQ4NDQgNi4zMzc4OVYxMy4xOTM0TDQzLjA1NjYgMTMuNDM3NVYxMy44NzdIMzguNzAxMlYxMy40Mzc1TDM5Ljg2MzMgMTMuMTkzNFY1LjM4MDg2TDM4LjcwMTIgNS4xMzY3MlY0LjY5NzI3SDQxLjM3N0w0MS40NjQ4IDUuODM5ODRDNDEuNjE0NiA1LjcxNjE1IDQxLjgxOTcgNS41NzQ1NCA0Mi4wODAxIDUuNDE1MDRDNDIuMzQwNSA1LjI1NTUzIDQyLjYyMjEgNS4xMDQxNyA0Mi45MjQ4IDQuOTYwOTRDNDMuMjI3NSA0LjgxNzcxIDQzLjUzMDMgNC42OTcyNyA0My44MzMgNC41OTk2MUM0NC4xMzU3IDQuNTAxOTUgNDQuNDA0MyA0LjQ1MzEyIDQ0LjYzODcgNC40NTMxMkg0NC43ODUyWk00OS41MDIgNC40OTIxOUM0OS45MTg2IDQuNDkyMTkgNTAuMzA2IDQuNTMxMjUgNTAuNjY0MSA0LjYwOTM4QzUxLjAyMjEgNC42ODc1IDUxLjMzMTQgNC44MjA5NiA1MS41OTE4IDUuMDA5NzdDNTEuODUyMiA1LjE5ODU3IDUyLjA1NTcgNS40NTQxIDUyLjIwMjEgNS43NzYzN0M1Mi4zNDg2IDYuMDk4NjMgNTIuNDIxOSA2LjUwMzkxIDUyLjQyMTkgNi45OTIxOVYxMy4xOTM0TDUzLjU2NDUgMTMuNDM3NVYxMy44NzdINTEuMDQ0OUw1MC44NTk0IDEyLjk1OUM1MC43NjE3IDEzLjA1NjYgNTAuNjI5OSAxMy4xNzA2IDUwLjQ2MzkgMTMuMzAwOEM1MC4yOTc5IDEzLjQzMSA1MC4wOTc3IDEzLjU1MzEgNDkuODYzMyAxMy42NjdDNDkuNjI4OSAxMy43ODA5IDQ5LjM1NzEgMTMuODc3IDQ5LjA0NzkgMTMuOTU1MUM0OC43Mzg2IDE0LjAzMzIgNDguMzk1MiAxNC4wNzIzIDQ4LjAxNzYgMTQuMDcyM0M0Ny41NzQ5IDE0LjA3MjMgNDcuMjAyMSAxNC4wMDM5IDQ2Ljg5OTQgMTMuODY3MkM0Ni41OTY3IDEzLjczMDUgNDYuMzU0MiAxMy41NCA0Ni4xNzE5IDEzLjI5NTlDNDUuOTg5NiAxMy4wNTE4IDQ1Ljg1OTQgMTIuNzYyIDQ1Ljc4MTIgMTIuNDI2OEM0NS43MDMxIDEyLjA5MTUgNDUuNjY0MSAxMS43Mjg1IDQ1LjY2NDEgMTEuMzM3OUM0NS42NjQxIDEwLjkzNDIgNDUuNzEyOSAxMC41ODQzIDQ1LjgxMDUgMTAuMjg4MUM0NS45MDgyIDkuOTkxODYgNDYuMDQ0OSA5Ljc0Mjg0IDQ2LjIyMDcgOS41NDEwMkM0Ni4zOTY1IDkuMzM5MTkgNDYuNjAzMiA5LjE3NDggNDYuODQwOCA5LjA0Nzg1QzQ3LjA3ODUgOC45MjA5IDQ3LjMzNTYgOC44MjE2MSA0Ny42MTIzIDguNzVDNDcuODg5IDguNjc4MzkgNDguMTgyIDguNjI5NTYgNDguNDkxMiA4LjYwMzUyQzQ4LjgwMDUgOC41Nzc0NyA0OS4xMTEzIDguNTYxMiA0OS40MjM4IDguNTU0NjlMNTAuODAwOCA4LjUxNTYyVjcuMDgwMDhDNTAuODAwOCA2LjgwNjY0IDUwLjc3OCA2LjU1NzYyIDUwLjczMjQgNi4zMzMwMUM1MC42ODY4IDYuMTA4NCA1MC42MTA0IDUuOTE0NzEgNTAuNTAyOSA1Ljc1MTk1QzUwLjM5NTUgNS41ODkxOSA1MC4yNTA3IDUuNDYyMjQgNTAuMDY4NCA1LjM3MTA5QzQ5Ljg4NjEgNS4yNzk5NSA0OS42NTgyIDUuMjM0MzggNDkuMzg0OCA1LjIzNDM4QzQ5LjA3MjMgNS4yMzQzOCA0OC43NTY1IDUuMjc2NjkgNDguNDM3NSA1LjM2MTMzQzQ4LjExODUgNS40NDU5NiA0Ny44Mzg1IDUuNTU2NjQgNDcuNTk3NyA1LjY5MzM2TDQ3LjI2NTYgNi44MzU5NEg0Ni43MTg4VjQuODMzOThDNDcuMTQxOSA0Ljc0Mjg0IDQ3LjU3OTggNC42NjMwOSA0OC4wMzIyIDQuNTk0NzNDNDguNDg0NyA0LjUyNjM3IDQ4Ljk3NDYgNC40OTIxOSA0OS41MDIgNC40OTIxOVpNNTAuODAwOCA5LjE5OTIyTDQ5LjUyMTUgOS4yMzgyOEM0OS4xMzc0IDkuMjUxMyA0OC44MDUzIDkuMjg4NzQgNDguNTI1NCA5LjM1MDU5QzQ4LjI0NTQgOS40MTI0MyA0OC4wMTQzIDkuNTE4MjMgNDcuODMyIDkuNjY3OTdDNDcuNjQ5NyA5LjgxNzcxIDQ3LjUxMyAxMC4wMjI4IDQ3LjQyMTkgMTAuMjgzMkM0Ny4zMzA3IDEwLjU0MzYgNDcuMjg1MiAxMC44NzU3IDQ3LjI4NTIgMTEuMjc5M0M0Ny4yODUyIDEyLjQyNTEgNDcuNzUwNyAxMi45OTggNDguNjgxNiAxMi45OThDNDkuMTI0MyAxMi45OTggNDkuNTA2OCAxMi45NDc2IDQ5LjgyOTEgMTIuODQ2N0M1MC4xNTE0IDEyLjc0NTggNTAuNDc1MyAxMi42MTcyIDUwLjgwMDggMTIuNDYwOVY5LjE5OTIyWk02My4xOTM0IDMuOTU1MDhDNjMuMTkzNCAzLjU3MDk2IDYzLjEzNjQgMy4yMzU2OCA2My4wMjI1IDIuOTQ5MjJDNjIuOTA4NSAyLjY2Mjc2IDYyLjcyNDYgMi40MjM1IDYyLjQ3MDcgMi4yMzE0NUM2Mi4yMTY4IDIuMDM5MzkgNjEuODg4IDEuODk2MTYgNjEuNDg0NCAxLjgwMTc2QzYxLjA4MDcgMS43MDczNiA2MC41ODU5IDEuNjYwMTYgNjAgMS42NjAxNkg1Ny45Nzg1VjYuNjExMzNINjAuMTE3MkM2MC43MjI3IDYuNjExMzMgNjEuMjI0IDYuNTQ3ODUgNjEuNjIxMSA2LjQyMDlDNjIuMDE4MiA2LjI5Mzk1IDYyLjMzMjQgNi4xMTQ5MSA2Mi41NjM1IDUuODgzNzlDNjIuNzk0NiA1LjY1MjY3IDYyLjk1NzQgNS4zNzQzNSA2My4wNTE4IDUuMDQ4ODNDNjMuMTQ2MiA0LjcyMzMxIDYzLjE5MzQgNC4zNTg3MiA2My4xOTM0IDMuOTU1MDhaTTY0LjE3OTcgMTAuMTQ2NUM2NC4xNzk3IDkuNjkwNzYgNjQuMTA2NCA5LjI5Njg4IDYzLjk2IDguOTY0ODRDNjMuODEzNSA4LjYzMjgxIDYzLjU4NTYgOC4zNTc3NSA2My4yNzY0IDguMTM5NjVDNjIuOTY3MSA3LjkyMTU1IDYyLjU2ODQgNy43NTg3OSA2Mi4wODAxIDcuNjUxMzdDNjEuNTkxOCA3LjU0Mzk1IDYxLjAwNTkgNy40OTAyMyA2MC4zMjIzIDcuNDkwMjNINTcuOTc4NVYxMi45OThDNTguMjc4IDEzLjAxMTEgNTguNTkwNSAxMy4wMjA4IDU4LjkxNiAxMy4wMjczQzU5LjE5NiAxMy4wNDA0IDU5LjUwNTIgMTMuMDQ4NSA1OS44NDM4IDEzLjA1MThDNjAuMTgyMyAxMy4wNTUgNjAuNTE3NiAxMy4wNTY2IDYwLjg0OTYgMTMuMDU2NkM2MS40NjE2IDEzLjA1NjYgNjEuOTc5MiAxMi45ODgzIDYyLjQwMjMgMTIuODUxNkM2Mi44MjU1IDEyLjcxNDggNjMuMTY4OSAxMi41MjEyIDYzLjQzMjYgMTIuMjcwNUM2My42OTYzIDEyLjAxOTkgNjMuODg2NyAxMS43MTU1IDY0LjAwMzkgMTEuMzU3NEM2NC4xMjExIDEwLjk5OTMgNjQuMTc5NyAxMC41OTU3IDY0LjE3OTcgMTAuMTQ2NVpNNTQuNDE0MSAxMy44NzdWMTMuMzU5NEw1Ni4wOTM4IDEzLjA5NTdWMS41NTI3M0w1NC40MTQxIDEuMjk4ODNWMC43ODEyNUg2MC40MDA0QzYxLjMxODQgMC43ODEyNSA2Mi4wODMzIDAuODUxMjM3IDYyLjY5NTMgMC45OTEyMTFDNjMuMzA3MyAxLjEzMTE4IDYzLjc5ODggMS4zMzQ2NCA2NC4xNjk5IDEuNjAxNTZDNjQuNTQxIDEuODY4NDkgNjQuODA0NyAyLjE5MjM4IDY0Ljk2MDkgMi41NzMyNEM2NS4xMTcyIDIuOTU0MSA2NS4xOTUzIDMuMzgyMTYgNjUuMTk1MyAzLjg1NzQyQzY1LjE5NTMgNC4yNjc1OCA2NS4xMjg2IDQuNjQxOTMgNjQuOTk1MSA0Ljk4MDQ3QzY0Ljg2MTcgNS4zMTkwMSA2NC42NzYxIDUuNjE2ODYgNjQuNDM4NSA1Ljg3NDAyQzY0LjIwMDggNi4xMzExOCA2My45MTYgNi4zNDYwMyA2My41ODQgNi41MTg1NUM2My4yNTIgNi42OTEwOCA2Mi44OTA2IDYuODE5NjYgNjIuNSA2LjkwNDNDNjMuMDY2NCA2Ljk2Mjg5IDYzLjU3OTEgNy4wNzY4MiA2NC4wMzgxIDcuMjQ2MDlDNjQuNDk3MSA3LjQxNTM2IDY0Ljg4NjEgNy42MzUwOSA2NS4yMDUxIDcuOTA1MjdDNjUuNTI0MSA4LjE3NTQ2IDY1Ljc2OTkgOC40OTYwOSA2NS45NDI0IDguODY3MTlDNjYuMTE0OSA5LjIzODI4IDY2LjIwMTIgOS42NTE2OSA2Ni4yMDEyIDEwLjEwNzRDNjYuMjAxMiAxMC42NzM4IDY2LjEwNTEgMTEuMTkzIDY1LjkxMzEgMTEuNjY1QzY1LjcyMSAxMi4xMzcgNjUuNDE5OSAxMi41NDA3IDY1LjAwOTggMTIuODc2QzY0LjU5OTYgMTMuMjExMyA2NC4wNzIzIDEzLjQ3MTcgNjMuNDI3NyAxMy42NTcyQzYyLjc4MzIgMTMuODQyOCA2Mi4wMDUyIDEzLjkzNTUgNjEuMDkzOCAxMy45MzU1QzYwLjM2NDYgMTMuOTM1NSA1OS42Mzg3IDEzLjkyNTggNTguOTE2IDEzLjkwNjJDNTguMTkzNCAxMy44ODY3IDU3LjUyNiAxMy44NzcgNTYuOTE0MSAxMy44NzdINTQuNDE0MVpNNzAuNzYxNyAxMy4xOTM0TDcyLjMzNCAxMy40Mzc1VjEzLjg3N0g2Ny41NzgxVjEzLjQzNzVMNjkuMTQwNiAxMy4xOTM0VjAuNjczODI4TDY3LjU3ODEgMC40Mzk0NTNWMEg3MC43NjE3VjEzLjE5MzRaTTgxLjk3MjcgOS4yMzgyOEM4MS45NzI3IDEwLjc5NDMgODEuNjI0MyAxMS45ODg5IDgwLjkyNzcgMTIuODIyM0M4MC4yMzExIDEzLjY1NTYgNzkuMTQ3MSAxNC4wNzIzIDc3LjY3NTggMTQuMDcyM0M3Ni4yOTU2IDE0LjA3MjMgNzUuMjUzOSAxMy42NTg5IDc0LjU1MDggMTIuODMyQzczLjg0NzcgMTIuMDA1MiA3My40OTYxIDEwLjgwNzMgNzMuNDk2MSA5LjIzODI4QzczLjQ5NjEgNy42ODg4IDczLjg0NzcgNi41MDM5MSA3NC41NTA4IDUuNjgzNTlDNzUuMjUzOSA0Ljg2MzI4IDc2LjMyMTYgNC40NTMxMiA3Ny43NTM5IDQuNDUzMTJDNzkuMTQ3MSA0LjQ1MzEyIDgwLjE5ODYgNC44NTUxNCA4MC45MDgyIDUuNjU5MThDODEuNjE3OCA2LjQ2MzIyIDgxLjk3MjcgNy42NTYyNSA4MS45NzI3IDkuMjM4MjhaTTgwLjIxNDggOS4yMzgyOEM4MC4yMTQ4IDguNjA2NzcgODAuMTcyNSA4LjA0MTk5IDgwLjA4NzkgNy41NDM5NUM4MC4wMDMzIDcuMDQ1OSA3OS44NjE3IDYuNjI1OTggNzkuNjYzMSA2LjI4NDE4Qzc5LjQ2NDUgNS45NDIzOCA3OS4yMDI1IDUuNjgxOTcgNzguODc3IDUuNTAyOTNDNzguNTUxNCA1LjMyMzg5IDc4LjE1MSA1LjIzNDM4IDc3LjY3NTggNS4yMzQzOEM3Ny4xOTQgNS4yMzQzOCA3Ni43OTY5IDUuMzIzODkgNzYuNDg0NCA1LjUwMjkzQzc2LjE3MTkgNS42ODE5NyA3NS45MjQ1IDUuOTQyMzggNzUuNzQyMiA2LjI4NDE4Qzc1LjU1OTkgNi42MjU5OCA3NS40MzI5IDcuMDQ1OSA3NS4zNjEzIDcuNTQzOTVDNzUuMjg5NyA4LjA0MTk5IDc1LjI1MzkgOC42MDY3NyA3NS4yNTM5IDkuMjM4MjhDNzUuMjUzOSA5Ljg3NjMgNzUuMjg5NyAxMC40NDYgNzUuMzYxMyAxMC45NDczQzc1LjQzMjkgMTEuNDQ4NiA3NS41NTk5IDExLjg3MzQgNzUuNzQyMiAxMi4yMjE3Qzc1LjkyNDUgMTIuNTcgNzYuMTcxOSAxMi44MzY5IDc2LjQ4NDQgMTMuMDIyNUM3Ni43OTY5IDEzLjIwOCA3Ny4xOTQgMTMuMzAwOCA3Ny42NzU4IDEzLjMwMDhDNzguMTUxIDEzLjMwMDggNzguNTUxNCAxMy4yMDggNzguODc3IDEzLjAyMjVDNzkuMjAyNSAxMi44MzY5IDc5LjQ2NDUgMTIuNTcgNzkuNjYzMSAxMi4yMjE3Qzc5Ljg2MTcgMTEuODczNCA4MC4wMDMzIDExLjQ0ODYgODAuMDg3OSAxMC45NDczQzgwLjE3MjUgMTAuNDQ2IDgwLjIxNDggOS44NzYzIDgwLjIxNDggOS4yMzgyOFpNOTEuOTcyNyA5LjIzODI4QzkxLjk3MjcgMTAuNzk0MyA5MS42MjQzIDExLjk4ODkgOTAuOTI3NyAxMi44MjIzQzkwLjIzMTEgMTMuNjU1NiA4OS4xNDcxIDE0LjA3MjMgODcuNjc1OCAxNC4wNzIzQzg2LjI5NTYgMTQuMDcyMyA4NS4yNTM5IDEzLjY1ODkgODQuNTUwOCAxMi44MzJDODMuODQ3NyAxMi4wMDUyIDgzLjQ5NjEgMTAuODA3MyA4My40OTYxIDkuMjM4MjhDODMuNDk2MSA3LjY4ODggODMuODQ3NyA2LjUwMzkxIDg0LjU1MDggNS42ODM1OUM4NS4yNTM5IDQuODYzMjggODYuMzIxNiA0LjQ1MzEyIDg3Ljc1MzkgNC40NTMxMkM4OS4xNDcxIDQuNDUzMTIgOTAuMTk4NiA0Ljg1NTE0IDkwLjkwODIgNS42NTkxOEM5MS42MTc4IDYuNDYzMjIgOTEuOTcyNyA3LjY1NjI1IDkxLjk3MjcgOS4yMzgyOFpNOTAuMjE0OCA5LjIzODI4QzkwLjIxNDggOC42MDY3NyA5MC4xNzI1IDguMDQxOTkgOTAuMDg3OSA3LjU0Mzk1QzkwLjAwMzMgNy4wNDU5IDg5Ljg2MTcgNi42MjU5OCA4OS42NjMxIDYuMjg0MThDODkuNDY0NSA1Ljk0MjM4IDg5LjIwMjUgNS42ODE5NyA4OC44NzcgNS41MDI5M0M4OC41NTE0IDUuMzIzODkgODguMTUxIDUuMjM0MzggODcuNjc1OCA1LjIzNDM4Qzg3LjE5NCA1LjIzNDM4IDg2Ljc5NjkgNS4zMjM4OSA4Ni40ODQ0IDUuNTAyOTNDODYuMTcxOSA1LjY4MTk3IDg1LjkyNDUgNS45NDIzOCA4NS43NDIyIDYuMjg0MThDODUuNTU5OSA2LjYyNTk4IDg1LjQzMjkgNy4wNDU5IDg1LjM2MTMgNy41NDM5NUM4NS4yODk3IDguMDQxOTkgODUuMjUzOSA4LjYwNjc3IDg1LjI1MzkgOS4yMzgyOEM4NS4yNTM5IDkuODc2MyA4NS4yODk3IDEwLjQ0NiA4NS4zNjEzIDEwLjk0NzNDODUuNDMyOSAxMS40NDg2IDg1LjU1OTkgMTEuODczNCA4NS43NDIyIDEyLjIyMTdDODUuOTI0NSAxMi41NyA4Ni4xNzE5IDEyLjgzNjkgODYuNDg0NCAxMy4wMjI1Qzg2Ljc5NjkgMTMuMjA4IDg3LjE5NCAxMy4zMDA4IDg3LjY3NTggMTMuMzAwOEM4OC4xNTEgMTMuMzAwOCA4OC41NTE0IDEzLjIwOCA4OC44NzcgMTMuMDIyNUM4OS4yMDI1IDEyLjgzNjkgODkuNDY0NSAxMi41NyA4OS42NjMxIDEyLjIyMTdDODkuODYxNyAxMS44NzM0IDkwLjAwMzMgMTEuNDQ4NiA5MC4wODc5IDEwLjk0NzNDOTAuMTcyNSAxMC40NDYgOTAuMjE0OCA5Ljg3NjMgOTAuMjE0OCA5LjIzODI4Wk05NS45MTggNS40Mzk0NUM5Ni4xMDAzIDUuMzM1MjkgOTYuMzE2NyA1LjIyNDYxIDk2LjU2NzQgNS4xMDc0MkM5Ni44MTggNC45OTAyMyA5Ny4wNzY4IDQuODgyODEgOTcuMzQzOCA0Ljc4NTE2Qzk3LjYxMDcgNC42ODc1IDk3Ljg4MDkgNC42MDc3NSA5OC4xNTQzIDQuNTQ1OUM5OC40Mjc3IDQuNDg0MDUgOTguNjgxNiA0LjQ1MzEyIDk4LjkxNiA0LjQ1MzEyQzk5LjM2NTIgNC40NTMxMiA5OS43ODAzIDQuNTM3NzYgMTAwLjE2MSA0LjcwNzAzQzEwMC41NDIgNC44NzYzIDEwMC44MjcgNS4xNDY0OCAxMDEuMDE2IDUuNTE3NThDMTAxLjIyNCA1LjQwMDM5IDEwMS40NzUgNS4yNzgzMiAxMDEuNzY4IDUuMTUxMzdDMTAyLjA2MSA1LjAyNDQxIDEwMi4zNjUgNC45MDg4NSAxMDIuNjgxIDQuODA0NjlDMTAyLjk5NiA0LjcwMDUyIDEwMy4zMDkgNC42MTU4OSAxMDMuNjE4IDQuNTUwNzhDMTAzLjkyNyA0LjQ4NTY4IDEwNC4yMDYgNC40NTMxMiAxMDQuNDUzIDQuNDUzMTJDMTA0LjgwNSA0LjQ1MzEyIDEwNS4xMjQgNC41MDE5NSAxMDUuNDEgNC41OTk2MUMxMDUuNjk3IDQuNjk3MjcgMTA1Ljk0MiA0Ljg1MzUyIDEwNi4xNDcgNS4wNjgzNkMxMDYuMzUzIDUuMjgzMiAxMDYuNTEyIDUuNTYzMTUgMTA2LjYyNiA1LjkwODJDMTA2Ljc0IDYuMjUzMjYgMTA2Ljc5NyA2LjY2OTkyIDEwNi43OTcgNy4xNTgyVjEzLjE5MzRMMTA3Ljk3OSAxMy40Mzc1VjEzLjg3N0gxMDMuODA5VjEzLjQzNzVMMTA1LjE3NiAxMy4xOTM0VjcuMzMzOThDMTA1LjE3NiA2Ljc5MzYyIDEwNS4wNTQgNi4zNzg1OCAxMDQuODEgNi4wODg4N0MxMDQuNTY1IDUuNzk5MTUgMTA0LjE2NyA1LjY1NDMgMTAzLjYxMyA1LjY1NDNDMTAzLjQ0NCA1LjY1NDMgMTAzLjI0NyA1LjY2NzMyIDEwMy4wMjIgNS42OTMzNkMxMDIuNzk4IDUuNzE5NCAxMDIuNTczIDUuNzQ4NyAxMDIuMzQ5IDUuNzgxMjVDMTAyLjEyNCA1LjgxMzggMTAxLjkwOSA1Ljg1MTI0IDEwMS43MDQgNS44OTM1NUMxMDEuNDk5IDUuOTM1ODcgMTAxLjMyOCA1Ljk3MDA1IDEwMS4xOTEgNS45OTYwOUMxMDEuMzAyIDYuMzQ3NjYgMTAxLjM1NyA2LjczNTAzIDEwMS4zNTcgNy4xNTgyVjEzLjE5MzRMMTAyLjczNCAxMy40Mzc1VjEzLjg3N0g5OC4zNzg5VjEzLjQzNzVMOTkuNzM2MyAxMy4xOTM0VjcuMzMzOThDOTkuNzM2MyA2Ljc5MzYyIDk5LjU5OCA2LjM3ODU4IDk5LjMyMTMgNi4wODg4N0M5OS4wNDQ2IDUuNzk5MTUgOTguNjI5NiA1LjY1NDMgOTguMDc2MiA1LjY1NDNDOTcuODkzOSA1LjY1NDMgOTcuNzAzNSA1LjY2NDA2IDk3LjUwNDkgNS42ODM1OUM5Ny4zMDYzIDUuNzAzMTIgOTcuMTExIDUuNzI1OTEgOTYuOTE4OSA1Ljc1MTk1Qzk2LjcyNjkgNS43Nzc5OSA5Ni41NDQ2IDUuODA4OTIgOTYuMzcyMSA1Ljg0NDczQzk2LjE5OTUgNS44ODA1MyA5Ni4wNTQ3IDUuOTExNDYgOTUuOTM3NSA1LjkzNzVWMTMuMTkzNEw5Ny4zMTQ1IDEzLjQzNzVWMTMuODc3SDkzLjE1NDNWMTMuNDM3NUw5NC4zMTY0IDEzLjE5MzRWNS4zODA4Nkw5My4xNTQzIDUuMTM2NzJWNC42OTcyN0g5NS44Mzk4TDk1LjkxOCA1LjQzOTQ1WlwiIGZpbGw9XCIjMDY0RTNCXCIvPjwvc3ZnPlxyXG4gICAgICAgICAgPHA+Q3JhZnRpbmcgYm90YW5pY2FsIGV4Y2VsbGVuY2UgZm9yIHRoZSBtb2Rlcm4gc291bC4gUHVyZSBpbmdyZWRpZW50cywgZXRoaWNhbCBwcm9jZXNzZXMsIGxhc3RpbmcgcmFkaWFuY2UuPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItY29sdW1uXCI+XHJcbiAgICAgICAgICA8aDUgY2xhc3M9XCJsaW5rcy10aXRsZVwiPlNob3A8L2g1PlxyXG4gICAgICAgICAgPG5hdj5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Byb2R1Y3RzXCI+U2hvcCBBbGw8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvcHJvZHVjdC1jYXRlZ29yeS9iZXN0LXNlbGxlcnNcIj5CZXN0IFNlbGxlcnM8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvcHJvZHVjdC1jYXRlZ29yeS9uZXctYXJyaXZhbFwiPk5ldyBBcnJpdmFsPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL2dpZnQtY2FyZFwiPkdpZnQgQ2FyZDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICA8L25hdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbHVtblwiPlxyXG4gICAgICAgICAgPGg1IGNsYXNzPVwibGlua3MtdGl0bGVcIj5FeHBlcmllbmNlPC9oNT5cclxuICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9zdXN0YWluYWJpbGl0eVwiPlN1c3RhaW5hYmlsaXR5PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL291ci1zdG9yeVwiPk91ciBTdG9yeTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICA8L25hdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWNvbHVtblwiPlxyXG4gICAgICAgICAgPGg1IGNsYXNzPVwibGlua3MtdGl0bGVcIj5TdXBwb3J0PC9oNT5cclxuICAgICAgICAgIDxuYXY+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9zaGlwcGluZy1hbmQtcmV0dXJuc1wiPlNoaXBwaW5nICYgUmV0dXJuczwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9wcml2YWN5LXBvbGljeVwiPlByaXZhY3kgUG9saWN5PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Rlcm1zLW9mLXNlcnZpY2VcIj5UZXJtcyBvZiBTZXJ2aWNlPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL2NvbnRhY3QtdXNcIj5Db250YWN0IFVzPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgIDwvbmF2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItYm90dG9tXCI+XHJcbiAgICAgICAgICA8c3Bhbj5BbGwgcmlnaHQgcmVzZXJ2ZWQ8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb290ZXI+XHJcblxyXG4gICAgPENvb2tpZUJhbm5lciB2LWlmPVwidWlIeWRyYXRlZFwiIC8+XHJcblxyXG4gIDwvcS1sYXlvdXQ+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvblVubW91bnRlZCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSAncXVhc2FyJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQnXHJcbmltcG9ydCB3aXNobGlzdCBmcm9tICdzcmMvc3RvcmVzL3dpc2hsaXN0J1xyXG5pbXBvcnQgV2lzaGxpc3REcmF3ZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvV2lzaGxpc3REcmF3ZXIudnVlJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZSwgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcidcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdxdWFzYXInO1xyXG5pbXBvcnQgQ29va2llQmFubmVyIGZyb20gXCJzcmMvY29tcG9uZW50cy9Db29raWVCYW5uZXIudnVlXCI7XHJcbmltcG9ydCBBaUFzc2lzdGFudCBmcm9tIFwic3JjL2NvbXBvbmVudHMvQWlBc3Npc3RhbnQudnVlXCI7XHJcbmltcG9ydCBpbml0UHVzaCwgeyBzdWJzY3JpYmVUb1dlYlB1c2gsIGluaXROYXRpdmVQdXNoLCBjaGVja05hdGl2ZVBlcm1pc3Npb24gfSBmcm9tICdzcmMvYm9vdC9wdXNoLmpzJ1xyXG5pbXBvcnQgeyBpbml0TG9hZGluZ0JhciB9IGZyb20gJ2Jvb3QvbG9hZGluZy1iYXInXHJcbmltcG9ydCB7IGluaXRBdXRoUG9wdXAgfSBmcm9tICdib290L2F1dGgtZXhwaXJlZCdcclxuXHJcbmltcG9ydCB7IG1hdFNob3BwaW5nQ2FydCxcclxuICBtYXRGYXZvcml0ZUJvcmRlcixcclxuICBtYXRNZW51LFxyXG4gIG1hdEhvbWUsXHJcbiAgbWF0U3RvcmVmcm9udCxcclxuICBtYXRSZWNlaXB0LFxyXG4gIG1hdFBlcnNvbixcclxuICBtYXRBZG1pblBhbmVsU2V0dGluZ3MsXHJcbiAgbWF0QWRkLFxyXG4gIG1hdENsb3NlLFxyXG4gIG1hdFJlbW92ZSxcclxuICBtYXRXaWZpLFxyXG4gIG1hdFNpZ25hbFdpZmlPZmYsXHJcbiAgbWF0RXJyb3IgfSBmcm9tICdAcXVhc2FyL2V4dHJhcy9tYXRlcmlhbC1pY29ucydcclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRDdXJyZW5jeShhbW91bnRTdHIsIHtcclxuICBtaW5vclVuaXQgPSAyLFxyXG4gIGRlY2ltYWxTZXBhcmF0b3IgPSAnLicsXHJcbiAgcHJlZml4ID0gJyQnLFxyXG4gIHN1ZmZpeCA9ICcnXHJcbn0gPSB7fSkge1xyXG4gIGNvbnN0IGFtb3VudCA9IHBhcnNlSW50KGFtb3VudFN0ciwgMTApO1xyXG4gIGlmIChpc05hTihhbW91bnQpKSByZXR1cm4gYCR7cHJlZml4fTAke2RlY2ltYWxTZXBhcmF0b3J9JHsnMCcucmVwZWF0KG1pbm9yVW5pdCl9JHtzdWZmaXh9YDtcclxuICBjb25zdCBmYWN0b3IgPSBNYXRoLnBvdygxMCwgbWlub3JVbml0KTtcclxuICBjb25zdCBudW1iZXIgPSBhbW91bnQgLyBmYWN0b3I7XHJcbiAgcmV0dXJuIGAke251bWJlci50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogbWlub3JVbml0LFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBtaW5vclVuaXRcclxuICB9KX0ke3N1ZmZpeH0ke3ByZWZpeH1gO1xyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIGhpZGVTcGxhc2goKSB7XHJcbiAgaWYgKCFQbGF0Zm9ybS5pcy5jYXBhY2l0b3IpIHJldHVyblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7U3BsYXNoU2NyZWVufSA9IGF3YWl0IGltcG9ydCgvKiBAdml0ZS1pZ25vcmUgKi8gJ0BjYXBhY2l0b3Ivc3BsYXNoLXNjcmVlbicpXHJcbiAgICBhd2FpdCBTcGxhc2hTY3JlZW4uaGlkZSh7IGZhZGVPdXREdXJhdGlvbjogNTAwIH0pXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ1NwbGFzaFNjcmVlbiBoaWRlIGZhaWxlZCcsIGVycilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZVBlcm1pc3Npb24odmFsdWUpIHtcclxuICBpZiAodmFsdWUgPT09ICdwcm9tcHQnKSB7IHJldHVybiAnZGVmYXVsdCcgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2luaXRpYWxpemVkJykgeyByZXR1cm4gJ2dyYW50ZWQnIH1cclxuICByZXR1cm4gdmFsdWVcclxufVxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5jb25zdCBfcmVzcG9uc2l2ZUNsYXNzZXMgPSAnZ3Qtc20gbHQtbWQgZ3QtbWQgbHQtc20nXHJcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmNvbnN0IHBlcm1pc3Npb24gPSByZWYoJ2RlZmF1bHQnKVxyXG5jb25zdCBzdXBwb3J0ZWQgPSByZWYoZmFsc2UpXHJcbmNvbnN0IGlzU3VwZXJBZG1pbiA9IGNvbXB1dGVkKCgpID0+IGNhcnQuc3RhdGUudXNlcj8uaXNfc3VwZXJfYWRtaW4gPT09IHRydWUpXHJcblxyXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpXHJcbmNvbnN0IG1vYmlsZU1lbnVEcmF3ZXIgPSByZWYoZmFsc2UpXHJcblxyXG5jb25zdCB3aXNobGlzdERyYXdlck9wZW4gPSByZWYoZmFsc2UpXHJcbmNvbnN0IGNhcnREcmF3ZXIgPSByZWYoZmFsc2UpXHJcbmNvbnN0IGRyYXdlcldpZHRoID0gY29tcHV0ZWQoKCkgPT4gTWF0aC5taW4oNDAwLCAkcS5zY3JlZW4ud2lkdGggKiAwLjkpKVxyXG5cclxubGV0IHN0YXJ0WCA9IDBcclxubGV0IGlzRHJhZ2dpbmcgPSBmYWxzZVxyXG5cclxuLy8gMS4gTG9naWMgZm9yIFNUQVJUIChUb3VjaCBvciBNb3VzZSlcclxuY29uc3Qgb25TdGFydCA9ICh4KSA9PiB7XHJcbiAgaWYgKG1vYmlsZU1lbnVEcmF3ZXIudmFsdWUgfHwgY2FydERyYXdlci52YWx1ZSB8fCB3aXNobGlzdERyYXdlck9wZW4udmFsdWUpIHtcclxuICAgIGlzRHJhZ2dpbmcgPSBmYWxzZVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG4gIHN0YXJ0WCA9IHhcclxuICBpc0RyYWdnaW5nID0gdHJ1ZVxyXG59XHJcblxyXG4vLyAyLiBMb2dpYyBmb3IgRU5EIChUb3VjaCBvciBNb3VzZSlcclxuY29uc3Qgb25FbmQgPSAoZW5kWCkgPT4ge1xyXG4gIGlmICghaXNEcmFnZ2luZykgcmV0dXJuXHJcbiAgaXNEcmFnZ2luZyA9IGZhbHNlXHJcblxyXG4gIGNvbnN0IGR4ID0gZW5kWCAtIHN0YXJ0WFxyXG4gIGNvbnN0IGFic1ggPSBNYXRoLmFicyhkeClcclxuXHJcbiAgaWYgKGFic1ggPiA3MCkge1xyXG4gICAgaWYgKGR4ID4gMCkge1xyXG4gICAgICBtb2JpbGVNZW51RHJhd2VyLnZhbHVlID0gdHJ1ZSAvLyBTd2lwZSBSaWdodFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2FydERyYXdlci52YWx1ZSA9IHRydWUgLy8gU3dpcGUgTGVmdFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gLS0tIEVWRU5UIFdSQVBQRVJTIC0tLVxyXG5cclxuLy8gTW9iaWxlIEhhbmRsZXJzXHJcbmNvbnN0IGhhbmRsZVRvdWNoU3RhcnQgPSAoZSkgPT4gb25TdGFydChlLnRvdWNoZXNbMF0uY2xpZW50WCwgZS50b3VjaGVzWzBdLmNsaWVudFkpXHJcbmNvbnN0IGhhbmRsZVRvdWNoRW5kID0gKGUpID0+IG9uRW5kKGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZKVxyXG5cclxuLy8gRGVza3RvcCBIYW5kbGVycyAoTW91c2UpXHJcbmNvbnN0IGhhbmRsZU1vdXNlRG93biA9IChlKSA9PiBvblN0YXJ0KGUuY2xpZW50WCwgZS5jbGllbnRZKVxyXG5jb25zdCBoYW5kbGVNb3VzZVVwID0gKGUpID0+IG9uRW5kKGUuY2xpZW50WCwgZS5jbGllbnRZKVxyXG5cclxuY29uc3QgdG9nZ2xlQ2FydCA9ICgpID0+IChjYXJ0RHJhd2VyLnZhbHVlID0gIWNhcnREcmF3ZXIudmFsdWUpXHJcbmNvbnN0IHRvZ2dsZVdpc2hsaXN0RHJhd2VyID0gKCkgPT4gKHdpc2hsaXN0RHJhd2VyT3Blbi52YWx1ZSA9ICF3aXNobGlzdERyYXdlck9wZW4udmFsdWUpXHJcblxyXG4vLyBXcmFwIGNhcnQgbWV0aG9kcyBzbyB0ZW1wbGF0ZSBjYW4gY2FsbCBkaXJlY3RseVxyXG5jb25zdCBpbmNyZWFzZSA9IChpZCkgPT4gY2FydC5pbmNyZWFzZShpZClcclxuY29uc3QgZGVjcmVhc2UgPSAoaWQpID0+IGNhcnQuZGVjcmVhc2UoaWQpXHJcbmNvbnN0IHJlbW92ZSA9IChpdGVtS2V5PW51bGwsIGl0ZW1BUElrZXk9bnVsbCkgPT4gY2FydC5yZW1vdmUoaXRlbUtleSxpdGVtQVBJa2V5KVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3Vic2NyaWJlKCkge1xyXG4gIGlmIChQbGF0Zm9ybS5pcy5jYXBhY2l0b3IpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIHJlcXVlc3QgcGVybWlzc2lvbiB2aWEgdGhlIGJvb3QgaGVscGVyICh1c2VyIGdlc3R1cmUpXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGluaXROYXRpdmVQdXNoKClcclxuICAgICAgcGVybWlzc2lvbi52YWx1ZSA9IG5vcm1hbGl6ZVBlcm1pc3Npb24ocmVzdWx0KVxyXG4gICAgICBhbGVydCgnUGVybWlzc2lvbiBzdGF0dXM6ICcgKyByZXN1bHQpXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05hdGl2ZSBwZXJtaXNzaW9uIGVycm9yJywgZSlcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgYXdhaXQgc3Vic2NyaWJlVG9XZWJQdXNoKClcclxuICAgIHBlcm1pc3Npb24udmFsdWUgPSBOb3RpZmljYXRpb24ucGVybWlzc2lvblxyXG4gIH1cclxufVxyXG4vLyBVdGlsaXR5OiBkZXRlY3QgaW5jb2duaXRvIChiZXN0LWVmZm9ydCwgbm90IDEwMCUgYnV0IGNvdmVycyBDaHJvbWUvRmlyZWZveC9TYWZhcmkpXHJcbmFzeW5jIGZ1bmN0aW9uIGlzSW5jb2duaXRvKCkge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoISgnc3RvcmFnZScgaW4gbmF2aWdhdG9yICYmICdwZXJzaXN0JyBpbiBuYXZpZ2F0b3Iuc3RvcmFnZSkpIHJldHVybiBmYWxzZVxyXG4gICAgY29uc3QgcGVyc2lzdGVkID0gYXdhaXQgbmF2aWdhdG9yLnN0b3JhZ2UucGVyc2lzdCgpXHJcbiAgICByZXR1cm4gIXBlcnNpc3RlZFxyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5cclxuY29uc3Qgc3RvcmVSZWFkeSA9IHJlZihwcm9jZXNzLmVudi5TRVJWRVIpIC8vIEltbWVkaWF0ZSBzeW5jXHJcbmNvbnN0IHVpSHlkcmF0ZWQgPSByZWYoZmFsc2UpICAgICAgICAgICAgICAvLyBEZWZlcnJlZCBmdW5jdGlvbmFsIFVJXHJcbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKVxyXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxuY29uc3Qgbm9EZWxheVJvdXRlcyA9IFsnL2NoZWNrb3V0LycsICcvY2FydC8nLCAnL215LWFjY291bnQvJ11cclxuXHJcbmNvbnN0IHNob3VsZERlbGF5SHlkcmF0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gIHJldHVybiAhbm9EZWxheVJvdXRlcy5pbmNsdWRlcyhyb3V0ZS5wYXRoKVxyXG59KVxyXG5cclxuY29uc3QgaW5pdENvbm5lY3Rpdml0eUxpc3RlbmVycyA9ICgpID0+IHtcclxuICBpZiAod2luZG93Ll9fQ09OTkVDVElWSVRZX0lOSVRJQUxJWkVEX18pIHJldHVyblxyXG4gIHdpbmRvdy5fX0NPTk5FQ1RJVklUWV9JTklUSUFMSVpFRF9fID0gdHJ1ZVxyXG5cclxuICBsZXQgd2FzT2ZmbGluZSA9ICFuYXZpZ2F0b3Iub25MaW5lXHJcblxyXG4gIGNvbnN0IHVwZGF0ZU9ubGluZVN0YXR1cyA9IGFzeW5jIChpc09ubGluZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coaXNPbmxpbmUpXHJcbiAgICBjb25zdCBiZWNhbWVPbmxpbmUgID0gaXNPbmxpbmUgJiYgd2FzT2ZmbGluZVxyXG4gICAgY29uc3QgYmVjYW1lT2ZmbGluZSA9ICFpc09ubGluZSAmJiAhd2FzT2ZmbGluZVxyXG5cclxuICAgIGlmICghYmVjYW1lT25saW5lICYmICFiZWNhbWVPZmZsaW5lKSByZXR1cm4gIC8vIG5vIGFjdHVhbCBzdGF0ZSBjaGFuZ2UsIGJhaWwgZWFybHlcclxuXHJcbiAgICB3YXNPZmZsaW5lID0gIWlzT25saW5lXHJcbiAgICBjYXJ0LnN0YXRlLm9mZmxpbmUgPSAhaXNPbmxpbmVcclxuXHJcbiAgICBpZiAoYmVjYW1lT25saW5lKSB7XHJcbiAgICAgICRxLm5vdGlmeSh7IHR5cGU6ICdwb3NpdGl2ZScsIG1lc3NhZ2U6ICdZb3UgYXJlIGJhY2sgb25saW5lIScsIGljb246IG1hdFdpZmksIHRpbWVvdXQ6IDMwMDAgfSlcclxuICAgICAgYXdhaXQgY2FydC5mZXRjaENhcnQoKVxyXG4gICAgICBhd2FpdCBjYXJ0LmZldGNoV2lzaGxpc3RJdGVtcygpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkcS5ub3RpZnkoeyB0eXBlOiAnd2FybmluZycsIG1lc3NhZ2U6ICdZb3UgYXJlIG9mZmxpbmUuIFNvbWUgZmVhdHVyZXMgbWF5IGJlIGxpbWl0ZWQuJywgaWNvbjogbWF0U2lnbmFsV2lmaU9mZiwgdGltZW91dDogMzAwMCB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsICAoKSA9PiB1cGRhdGVPbmxpbmVTdGF0dXModHJ1ZSkpXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29mZmxpbmUnLCAoKSA9PiB1cGRhdGVPbmxpbmVTdGF0dXMoZmFsc2UpKVxyXG4gIC8vIENhdGNoZXMgcGh5c2ljYWwgbmV0d29yayBjaGFuZ2VzIChXaUZpIHRvZ2dsZSkgdGhhdCB3aW5kb3cgZXZlbnRzIG1pc3NcclxuXHJcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBpZiAoZGF0YS50eXBlID09PSAnT0ZGTElORScpIHtcclxuICAgICAgdXBkYXRlT25saW5lU3RhdHVzKGZhbHNlKVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLnR5cGUgPT09ICdPTkxJTkUnKXtcclxuICAgICAgdXBkYXRlT25saW5lU3RhdHVzKHRydWUpXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIG5hdmlnYXRvci5jb25uZWN0aW9uPy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBmZXRjaCh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCB7bWV0aG9kOiAnSEVBRCcsIGNhY2hlOiAnbm8tc3RvcmUnfSlcclxuICAgICAgdXBkYXRlT25saW5lU3RhdHVzKHRydWUpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgdXBkYXRlT25saW5lU3RhdHVzKGZhbHNlKVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGNvbnNvbGUubG9nKCdbY29ubmVjdGl2aXR5XSBsaXN0ZW5lcnMgYXR0YWNoZWQnKVxyXG59XHJcblxyXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xyXG4gIHN0b3JlUmVhZHkudmFsdWUgPSB0cnVlXHJcbiAgaWYgKCEoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikpIHJldHVyblxyXG5cclxuICBjb25zdCB3YXJtID0gKCkgPT4ge1xyXG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVhZHkudGhlbihyZWdpc3RyYXRpb24gPT4ge1xyXG4gICAgICByZWdpc3RyYXRpb24uYWN0aXZlPy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdXQVJNX1BST0RVQ1RTX0NBQ0hFJyB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGF3YWl0IHJvdXRlci5pc1JlYWR5KClcclxuXHJcbiAgY29uc3Qgc2NoZWR1bGVyID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHVpSHlkcmF0ZWQudmFsdWUpIHJldHVyblxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjaGVkdWxlcilcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzY2hlZHVsZXIpXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjaGVkdWxlcilcclxuXHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qge2h5ZHJhdGV9ID0gYXdhaXQgaW1wb3J0KCcuLi91dGlscy9sYXp5LXF1YXNhci5qcycpXHJcbiAgICAgIGF3YWl0IGh5ZHJhdGUoKVxyXG5cclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICB1aUh5ZHJhdGVkLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIGhpZGVTcGxhc2goKVxyXG4gICAgICAgIGluaXRDb25uZWN0aXZpdHlMaXN0ZW5lcnMoKVxyXG4gICAgICAgIHdhcm0oKVxyXG5cclxuICAgICAgICBpbml0TG9hZGluZ0Jhcihyb3V0ZXIpXHJcbiAgICAgICAgaW5pdEF1dGhQb3B1cChyb3V0ZXIpXHJcblxyXG4gICAgICAgIC8qaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnIHx8IFBsYXRmb3JtLmlzLmNhcGFjaXRvcikge1xyXG4gICAgICAgICAgaW5pdFB1c2goe3JvdXRlcn0pXHJcbiAgICAgICAgICBjaGVja05hdGl2ZVBlcm1pc3Npb24oKS50aGVuKGluaXRpYWxQZXJtaXNzaW9ucyA9PiB7XHJcbiAgICAgICAgICAgIHBlcm1pc3Npb24udmFsdWUgPSBub3JtYWxpemVQZXJtaXNzaW9uKGluaXRpYWxQZXJtaXNzaW9ucylcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSovXHJcbmluaXRQdXNoKHtyb3V0ZXJ9KVxyXG5cclxuICAgICAgICBpZiAoUGxhdGZvcm0uaXMuY2FwYWNpdG9yKSB7XHJcbiAgICAgICAgICBzdXBwb3J0ZWQudmFsdWUgPSB0cnVlXHJcbiAgICAgICAgICAvLyBrZWVwIG9ubHkgdGhlIG5hdGl2ZSBjaGVjaywgcmVtb3ZlIHRoZSB3ZWIgTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gbGluZSBiZWxvd1xyXG4gICAgICAgICAgY2hlY2tOYXRpdmVQZXJtaXNzaW9uKCkudGhlbihpbml0aWFsUGVybWlzc2lvbnMgPT4ge1xyXG4gICAgICAgICAgICBwZXJtaXNzaW9uLnZhbHVlID0gbm9ybWFsaXplUGVybWlzc2lvbihpbml0aWFsUGVybWlzc2lvbnMpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAoJ05vdGlmaWNhdGlvbicgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICBjb25zdCBwZXJtID0gbm9ybWFsaXplUGVybWlzc2lvbihOb3RpZmljYXRpb24ucGVybWlzc2lvbilcclxuICAgICAgICAgIHBlcm1pc3Npb24udmFsdWUgPSBwZXJtXHJcblxyXG4gICAgICAgICAgLy8gSWYgYWxyZWFkeSBncmFudGVkLCBubyBuZWVkIHRvIHNob3cgdGhlIGJhbm5lciBvciBjaGVjayBpbmNvZ25pdG9cclxuICAgICAgICAgIGlmIChwZXJtICE9PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICAgICAgaXNJbmNvZ25pdG8oKS50aGVuKGluY29nbml0byA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFpbmNvZ25pdG8pIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZC52YWx1ZSA9IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCwge3Bhc3NpdmU6IHRydWV9KVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZVRvdWNoRW5kLCB7cGFzc2l2ZTogdHJ1ZX0pXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlRG93biwge3Bhc3NpdmU6IHRydWV9KVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCwge3Bhc3NpdmU6IHRydWV9KVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignSHlkcmF0aW9uIHByZWZldGNoIGZhaWxlZCcsIGUpXHJcbiAgICAgIHVpSHlkcmF0ZWQudmFsdWUgPSB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBEZWZpbmUgaGVhZGVyQnRuQ2xpY2sgYWZ0ZXIgc2NoZWR1bGVyIHNvIGl0IGNhbiByZWZlcmVuY2UgaXRcclxuICBjb25zdCBoZWFkZXJCdG5DbGljayA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICBhd2FpdCBzY2hlZHVsZXIoKVxyXG4gICAgY29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnW2FyaWEtbGFiZWxdJylcclxuICAgIGlmIChidG4pIHtcclxuICAgICAgY29uc3QgbGFiZWwgPSBidG4uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJylcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICBpZiAobGFiZWwgPT09ICdPcGVuIG1lbnUnKSBtb2JpbGVNZW51RHJhd2VyLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIGVsc2UgaWYgKGxhYmVsID09PSAnQWRkIHRvIHdpc2hsaXN0Jykgd2lzaGxpc3REcmF3ZXJPcGVuLnZhbHVlID0gdHJ1ZVxyXG4gICAgICAgIGVsc2UgaWYgKGxhYmVsID09PSAnVmlldyBjYXJ0JykgY2FydERyYXdlci52YWx1ZSA9IHRydWVcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGVhZGVyQnRuQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KVxyXG5cclxuICBpZiAoIXNob3VsZERlbGF5SHlkcmF0aW9uLnZhbHVlKSB7XHJcbiAgICBzY2hlZHVsZXIoKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2NoZWR1bGVyKVxyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2NoZWR1bGVyKVxyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjaGVkdWxlcilcclxuICAgICAgY2xlYXJUaW1lb3V0KGZhbGxiYWNrVGltZXIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmFsbGJhY2tUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjbGVhbnVwKClcclxuICAgICAgc2NoZWR1bGVyKClcclxuICAgIH0sIDMwMDApXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjaGVkdWxlciwgeyBwYXNzaXZlOiB0cnVlIH0pXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2NoZWR1bGVyLCB7IHBhc3NpdmU6IHRydWUgfSlcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2NoZWR1bGVyLCB7IHBhc3NpdmU6IHRydWUgfSlcclxuICB9XHJcbn0pXHJcbm9uVW5tb3VudGVkKCgpID0+IHtcclxuICAvLyBDcml0aWNhbCBjbGVhbnVwXHJcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaFN0YXJ0KVxyXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZVRvdWNoRW5kKVxyXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pXHJcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKVxyXG59KVxyXG53YXRjaCgoKSA9PiBjYXJ0LnN0YXRlLmRyYXdlck9wZW4sIHZhbCA9PiB7XHJcbiAgaWYodmFsID09PSB0cnVlKSB7XHJcbiAgICBjYXJ0RHJhd2VyLnZhbHVlID0gdmFsO1xyXG4gICAgY2FydC5zdGF0ZS5kcmF3ZXJPcGVuID0gZmFsc2U7XHJcbiAgICAvL2NhcnQuZmV0Y2hDYXJ0KClcclxuICB9XHJcbn0pXHJcbndhdGNoKFxyXG4gICgpID0+IGNhcnQuc3RhdGUucmVqZWN0ZWRfaXRlbXMsXHJcbiAgKHJlamVjdGVkKSA9PiB7XHJcbiAgICBpZiAocmVqZWN0ZWQ/Lmxlbmd0aCkge1xyXG4gICAgICByZWplY3RlZC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICRxLm5vdGlmeSh7XHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBtZXNzYWdlOiBgXCIke2l0ZW0ubmFtZX1cIiB3YXMgcmVtb3ZlZCDigJQgbm8gbG9uZ2VyIGF2YWlsYWJsZWAsXHJcbiAgICAgICAgICBpY29uOiBtYXRFcnJvcixcclxuICAgICAgICAgIHRpbWVvdXQ6IDgwMDBcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuKVxyXG5cclxuPC9zY3JpcHQ+Il0sImZpbGUiOiJhc3NldHMvTWFpbkxheW91dC1SUlhUZk1qQi5qcyJ9