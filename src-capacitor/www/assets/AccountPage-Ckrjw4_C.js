import { aN as inject, aO as emptyRenderFn, aP as tabsKey, g as getCurrentInstance, l as onBeforeUnmount, D as onMounted, r as ref, b as computed, w as withDirectives, a4 as Ripple, h, J as QIcon, a as hMergeSlot, aQ as isKeyCode, aR as shouldIgnoreKey, at as stopAndPrevent, c as createComponent, aS as useTick, aT as useTimeout, i as watch, aU as provide, o as onDeactivated, j as onActivated, d as hSlot, aV as rtlHasScrollBug, aW as usePanelChildProps, aX as usePanelEmits, u as useDarkProps, aY as usePanelProps, e as useDark, aZ as usePanel, a_ as hDir, _ as _export_sfc, p as openBlock, q as createBlock, t as withCtx, z as createVNode, N as QInput, Q as QBtn, x as createElementBlock, B as toDisplayString, A as createCommentVNode, C as withModifiers, a$ as QForm, H as cart, I as Transition, b0 as useModelToggleEmits, b1 as useModelToggleProps, b2 as useRouterLinkProps, b3 as useId, b4 as useModelToggle, b5 as uid, M as QSeparator, b6 as shallowReactive, a2 as QItem, b7 as vShow, b8 as QItemLabel, a3 as QItemSection, n as resolveComponent, v as createBaseVNode, F as Fragment, y as renderList, aK as QImg, P as QCard, a1 as createTextVNode, aL as QSpinner, aM as fetchWithToken, b9 as matKeyboardArrowDown, ba as matShoppingBag, bb as setLoggedIn, bc as GoogleLoginButton, aH as matChevronRight, aI as matChevronLeft } from "./index-B4eBuDfB.js";
import { Q as QResizeObserver } from "./QResizeObserver-B90vPzSX.js";
import { Q as QTd } from "./QTd-BI3sS8uV.js";
import { Q as QTable } from "./QTable-B9QaIvK0.js";
import "./QList-BNLb0vFw.js";
let id = 0;
const useTabEmits = ["click", "keydown"];
const useTabProps = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${id++}`
  },
  noCaps: Boolean,
  tabindex: [String, Number],
  disable: Boolean,
  contentClass: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  }
};
function useTab(props, slots, emit, routeData) {
  const $tabs = inject(tabsKey, emptyRenderFn);
  if ($tabs === emptyRenderFn) {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
    return emptyRenderFn;
  }
  const { proxy } = getCurrentInstance();
  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);
  const ripple = computed(() => props.disable === true || props.ripple === false ? false : Object.assign(
    { keyCodes: [13, 32], early: true },
    props.ripple === true ? {} : props.ripple
  ));
  const isActive = computed(() => $tabs.currentModel.value === props.name);
  const classes = computed(
    () => "q-tab relative-position self-stretch flex flex-center text-center" + (isActive.value === true ? " q-tab--active" + ($tabs.tabProps.value.activeClass ? " " + $tabs.tabProps.value.activeClass : "") + ($tabs.tabProps.value.activeColor ? ` text-${$tabs.tabProps.value.activeColor}` : "") + ($tabs.tabProps.value.activeBgColor ? ` bg-${$tabs.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? " q-tab--full" : "") + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? " q-tab--no-caps" : "") + (props.disable === true ? " disabled" : " q-focusable q-hoverable cursor-pointer")
  );
  const innerClass = computed(
    () => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + ($tabs.tabProps.value.inlineLabel === true ? "row no-wrap q-tab__content--inline" : "column") + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
  );
  const tabIndex = computed(() => props.disable === true || $tabs.hasFocus.value === true || isActive.value === false && $tabs.hasActiveTab.value === true ? -1 : props.tabindex || 0);
  function onClick(e, keyboard) {
    if (keyboard !== true && e?.qAvoidFocus !== true) {
      blurTargetRef.value?.focus();
    }
    if (props.disable === true) {
      return;
    }
    {
      $tabs.updateModel({ name: props.name });
      emit("click", e);
      return;
    }
  }
  function onKeydown(e) {
    if (isKeyCode(e, [13, 32])) {
      onClick(e, true);
    } else if (shouldIgnoreKey(e) !== true && e.keyCode >= 35 && e.keyCode <= 40 && e.altKey !== true && e.metaKey !== true) {
      $tabs.onKbdNavigate(e.keyCode, proxy.$el) === true && stopAndPrevent(e);
    }
    emit("keydown", e);
  }
  function getContent() {
    const narrow = $tabs.tabProps.value.narrowIndicator, content = [], indicator = h("div", {
      ref: tabIndicatorRef,
      class: [
        "q-tab__indicator",
        $tabs.tabProps.value.indicatorClass
      ]
    });
    props.icon !== void 0 && content.push(
      h(QIcon, {
        class: "q-tab__icon",
        name: props.icon
      })
    );
    props.label !== void 0 && content.push(
      h("div", { class: "q-tab__label" }, props.label)
    );
    props.alert !== false && content.push(
      props.alertIcon !== void 0 ? h(QIcon, {
        class: "q-tab__alert-icon",
        color: props.alert !== true ? props.alert : void 0,
        name: props.alertIcon
      }) : h("div", {
        class: "q-tab__alert" + (props.alert !== true ? ` text-${props.alert}` : "")
      })
    );
    narrow === true && content.push(indicator);
    const node = [
      h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef }),
      h("div", { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];
    narrow === false && node.push(indicator);
    return node;
  }
  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routeData
  };
  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
  });
  onMounted(() => {
    $tabs.registerTab(tabData);
  });
  function renderTab(tag, customData) {
    const data = {
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: "tab",
      "aria-selected": isActive.value === true ? "true" : "false",
      "aria-disabled": props.disable === true ? "true" : void 0,
      onClick,
      onKeydown,
      ...customData
    };
    return withDirectives(
      h(tag, data, getContent()),
      [[Ripple, ripple.value]]
    );
  }
  return { renderTab, $tabs };
}
const QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
function getIndicatorClass(color, top, vertical) {
  const pos = vertical === true ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${top === true ? pos[0] : pos[1]}${color ? ` text-${color}` : ""}`;
}
const alignValues = ["left", "center", "right", "justify"];
const QTabs = createComponent({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (v) => alignValues.includes(v)
    },
    breakpoint: {
      type: [String, Number],
      default: 600
    },
    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,
    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,
    outsideArrows: Boolean,
    mobileArrows: Boolean,
    switchIndicator: Boolean,
    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,
    dense: Boolean,
    contentClass: String,
    "onUpdate:modelValue": [Function, Array]
  },
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const { registerTick: registerScrollTick } = useTick();
    const { registerTick: registerUpdateArrowsTick } = useTick();
    const { registerTick: registerAnimateTick } = useTick();
    const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
    const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);
    const tabDataList = [];
    const tabDataListLen = ref(0);
    const hasFocus = ref(false);
    let animateTimer = null, scrollTimer = null, unwatchRoute;
    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(
        props.indicatorColor,
        props.switchIndicator,
        props.vertical
      ),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));
    const hasActiveTab = computed(() => {
      const len = tabDataListLen.value;
      const val = currentModel.value;
      for (let i = 0; i < len; i++) {
        if (tabDataList[i].name.value === val) {
          return true;
        }
      }
      return false;
    });
    const alignClass = computed(() => {
      const align = scrollable.value === true ? "left" : justify.value === true ? "justify" : props.align;
      return `q-tabs__content--align-${align}`;
    });
    const classes = computed(
      () => `q-tabs row no-wrap items-center q-tabs--${scrollable.value === true ? "" : "not-"}scrollable q-tabs--${props.vertical === true ? "vertical" : "horizontal"} q-tabs__arrows--${props.outsideArrows === true ? "outside" : "inside"} q-tabs--mobile-with${props.mobileArrows === true ? "" : "out"}-arrows` + (props.dense === true ? " q-tabs--dense" : "") + (props.shrink === true ? " col-shrink" : "") + (props.stretch === true ? " self-stretch" : "")
    );
    const innerClass = computed(
      () => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + alignClass.value + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
    );
    const domProps = computed(() => props.vertical === true ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" });
    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => rtlHasScrollBug === false && isRTL.value === true);
    watch(isRTL, updateArrows);
    watch(() => props.modelValue, (name) => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });
    watch(() => props.outsideArrows, recalculateScroll);
    function updateModel({ name, setCurrent, skipEmit }) {
      if (currentModel.value === name) return;
      if (skipEmit !== true && props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", name);
      }
      if (setCurrent === true || props["onUpdate:modelValue"] === void 0) {
        animate(currentModel.value, name);
        currentModel.value = name;
      }
    }
    function recalculateScroll() {
      registerScrollTick(() => {
        rootRef.value && updateContainer({
          width: rootRef.value.offsetWidth,
          height: rootRef.value.offsetHeight
        });
      });
    }
    function updateContainer(domSize) {
      if (domProps.value === void 0 || contentRef.value === null) return;
      const size = domSize[domProps.value.container], scrollSize = Math.min(
        contentRef.value[domProps.value.scroll],
        Array.prototype.reduce.call(
          contentRef.value.children,
          (acc, el) => acc + (el[domProps.value.content] || 0),
          0
        )
      ), scroll = size > 0 && scrollSize > size;
      scrollable.value = scroll;
      scroll === true && registerUpdateArrowsTick(updateArrows);
      justify.value = size < parseInt(props.breakpoint, 10);
    }
    function animate(oldName, newName) {
      const oldTab = oldName !== void 0 && oldName !== null && oldName !== "" ? tabDataList.find((tab) => tab.name.value === oldName) : null, newTab = newName !== void 0 && newName !== null && newName !== "" ? tabDataList.find((tab) => tab.name.value === newName) : null;
      if (hadActivated === true) {
        hadActivated = false;
      } else if (oldTab && newTab) {
        const oldEl = oldTab.tabIndicatorRef.value, newEl = newTab.tabIndicatorRef.value;
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
          animateTimer = null;
        }
        oldEl.style.transition = "none";
        oldEl.style.transform = "none";
        newEl.style.transition = "none";
        newEl.style.transform = "none";
        const oldPos = oldEl.getBoundingClientRect(), newPos = newEl.getBoundingClientRect();
        newEl.style.transform = props.vertical === true ? `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)` : `translate3d(${oldPos.left - newPos.left}px,0,0) scale3d(${newPos.width ? oldPos.width / newPos.width : 1},1,1)`;
        registerAnimateTick(() => {
          animateTimer = setTimeout(() => {
            animateTimer = null;
            newEl.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)";
            newEl.style.transform = "none";
          }, 70);
        });
      }
      if (newTab && scrollable.value === true) {
        scrollToTabEl(newTab.rootRef.value);
      }
    }
    function scrollToTabEl(el) {
      const { left, width, top, height } = contentRef.value.getBoundingClientRect(), newPos = el.getBoundingClientRect();
      let offset = props.vertical === true ? newPos.top - top : newPos.left - left;
      if (offset < 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.floor(offset);
        updateArrows();
        return;
      }
      offset += props.vertical === true ? newPos.height - height : newPos.width - width;
      if (offset > 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.ceil(offset);
        updateArrows();
      }
    }
    function updateArrows() {
      const content = contentRef.value;
      if (content === null) return;
      const rect = content.getBoundingClientRect(), pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);
      if (isRTL.value === true) {
        leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
        rightArrow.value = pos > 0;
      } else {
        leftArrow.value = pos > 0;
        rightArrow.value = props.vertical === true ? Math.ceil(pos + rect.height) < content.scrollHeight : Math.ceil(pos + rect.width) < content.scrollWidth;
      }
    }
    function animScrollTo(value) {
      scrollTimer !== null && clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }
    function scrollToStart() {
      animScrollTo(rtlPosCorrection.value === true ? Number.MAX_SAFE_INTEGER : 0);
    }
    function scrollToEnd() {
      animScrollTo(rtlPosCorrection.value === true ? 0 : Number.MAX_SAFE_INTEGER);
    }
    function stopAnimScroll() {
      if (scrollTimer !== null) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    }
    function onKbdNavigate(keyCode, fromEl) {
      const tabs = Array.prototype.filter.call(
        contentRef.value.children,
        (el) => el === fromEl || el.matches && el.matches(".q-tab.q-focusable") === true
      );
      const len = tabs.length;
      if (len === 0) return;
      if (keyCode === 36) {
        scrollToTabEl(tabs[0]);
        tabs[0].focus();
        return true;
      }
      if (keyCode === 35) {
        scrollToTabEl(tabs[len - 1]);
        tabs[len - 1].focus();
        return true;
      }
      const dirPrev = keyCode === (props.vertical === true ? 38 : 37);
      const dirNext = keyCode === (props.vertical === true ? 40 : 39);
      const dir = dirPrev === true ? -1 : dirNext === true ? 1 : void 0;
      if (dir !== void 0) {
        const rtlDir = isRTL.value === true ? -1 : 1;
        const index = tabs.indexOf(fromEl) + dir * rtlDir;
        if (index >= 0 && index < len) {
          scrollToTabEl(tabs[index]);
          tabs[index].focus({ preventScroll: true });
        }
        return true;
      }
    }
    const posFn = computed(() => rtlPosCorrection.value === true ? { get: (content) => Math.abs(content.scrollLeft), set: (content, pos) => {
      content.scrollLeft = -pos;
    } } : props.vertical === true ? { get: (content) => content.scrollTop, set: (content, pos) => {
      content.scrollTop = pos;
    } } : { get: (content) => content.scrollLeft, set: (content, pos) => {
      content.scrollLeft = pos;
    } });
    function scrollTowards(value) {
      const content = contentRef.value, { get, set } = posFn.value;
      let done = false, pos = get(content);
      const direction = value < pos ? -1 : 1;
      pos += direction * 5;
      if (pos < 0) {
        done = true;
        pos = 0;
      } else if (direction === -1 && pos <= value || direction === 1 && pos >= value) {
        done = true;
        pos = value;
      }
      set(content, pos);
      updateArrows();
      return done;
    }
    function hasQueryIncluded(targetQuery, matchingQuery) {
      for (const key in targetQuery) {
        if (targetQuery[key] !== matchingQuery[key]) {
          return false;
        }
      }
      return true;
    }
    function updateActiveRoute() {
      let name = null, bestScore = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };
      const list = tabDataList.filter((tab) => tab.routeData?.hasRouterLink.value === true);
      const { hash: currentHash, query: currentQuery } = proxy.$route;
      const currentQueryLen = Object.keys(currentQuery).length;
      for (const tab of list) {
        const exact = tab.routeData.exact.value === true;
        if (tab.routeData[exact === true ? "linkIsExactActive" : "linkIsActive"].value !== true) {
          continue;
        }
        const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
        const queryLen = Object.keys(query).length;
        if (exact === true) {
          if (hash !== currentHash) {
            continue;
          }
          if (queryLen !== currentQueryLen || hasQueryIncluded(currentQuery, query) === false) {
            continue;
          }
          name = tab.name.value;
          break;
        }
        if (hash !== "" && hash !== currentHash) {
          continue;
        }
        if (queryLen !== 0 && hasQueryIncluded(query, currentQuery) === false) {
          continue;
        }
        const newScore = {
          matchedLen: matched.length,
          queryDiff: currentQueryLen - queryLen,
          hrefLen: href.length - hash.length
        };
        if (newScore.matchedLen > bestScore.matchedLen) {
          name = tab.name.value;
          bestScore = newScore;
          continue;
        } else if (newScore.matchedLen !== bestScore.matchedLen) {
          continue;
        }
        if (newScore.queryDiff < bestScore.queryDiff) {
          name = tab.name.value;
          bestScore = newScore;
        } else if (newScore.queryDiff !== bestScore.queryDiff) {
          continue;
        }
        if (newScore.hrefLen > bestScore.hrefLen) {
          name = tab.name.value;
          bestScore = newScore;
        }
      }
      if (name === null && tabDataList.some((tab) => tab.routeData === void 0 && tab.name.value === currentModel.value) === true) {
        hadActivated = false;
        return;
      }
      updateModel({ name, setCurrent: true });
    }
    function onFocusin(e) {
      removeFocusTimeout();
      if (hasFocus.value !== true && rootRef.value !== null && e.target && typeof e.target.closest === "function") {
        const tab = e.target.closest(".q-tab");
        if (tab && rootRef.value.contains(tab) === true) {
          hasFocus.value = true;
          scrollable.value === true && scrollToTabEl(tab);
        }
      }
    }
    function onFocusout() {
      registerFocusTimeout(() => {
        hasFocus.value = false;
      }, 30);
    }
    function verifyRouteModel() {
      if ($tabs.avoidRouteWatcher === false) {
        registerScrollToTabTimeout(updateActiveRoute);
      } else {
        removeScrollToTabTimeout();
      }
    }
    function watchRoute() {
      if (unwatchRoute === void 0) {
        const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
        unwatchRoute = () => {
          unwatch();
          unwatchRoute = void 0;
        };
      }
    }
    function registerTab(tabData) {
      tabDataList.push(tabData);
      tabDataListLen.value++;
      recalculateScroll();
      if (tabData.routeData === void 0 || proxy.$route === void 0) {
        registerScrollToTabTimeout(() => {
          if (scrollable.value === true) {
            const value = currentModel.value;
            const newTab = value !== void 0 && value !== null && value !== "" ? tabDataList.find((tab) => tab.name.value === value) : null;
            newTab && scrollToTabEl(newTab.rootRef.value);
          }
        });
      } else {
        watchRoute();
        if (tabData.routeData.hasRouterLink.value === true) {
          verifyRouteModel();
        }
      }
    }
    function unregisterTab(tabData) {
      tabDataList.splice(tabDataList.indexOf(tabData), 1);
      tabDataListLen.value--;
      recalculateScroll();
      if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
        if (tabDataList.every((tab) => tab.routeData === void 0) === true) {
          unwatchRoute();
        }
        verifyRouteModel();
      }
    }
    const $tabs = {
      currentModel,
      tabProps,
      hasFocus,
      hasActiveTab,
      registerTab,
      unregisterTab,
      verifyRouteModel,
      updateModel,
      onKbdNavigate,
      avoidRouteWatcher: false
      // false | string (uid)
    };
    provide(tabsKey, $tabs);
    function cleanup() {
      animateTimer !== null && clearTimeout(animateTimer);
      stopAnimScroll();
      unwatchRoute?.();
    }
    let hadRouteWatcher, hadActivated;
    onBeforeUnmount(cleanup);
    onDeactivated(() => {
      hadRouteWatcher = unwatchRoute !== void 0;
      cleanup();
    });
    onActivated(() => {
      if (hadRouteWatcher === true) {
        watchRoute();
        hadActivated = true;
        verifyRouteModel();
      }
      recalculateScroll();
    });
    return () => {
      return h("div", {
        ref: rootRef,
        class: classes.value,
        role: "tablist",
        onFocusin,
        onFocusout
      }, [
        h(QResizeObserver, { onResize: updateContainer }),
        h("div", {
          ref: contentRef,
          class: innerClass.value,
          onScroll: updateArrows
        }, hSlot(slots.default)),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (leftArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.leftIcon || $q.iconSet.tabs[props.vertical === true ? "up" : "left"],
          onMousedownPassive: scrollToStart,
          onTouchstartPassive: scrollToStart,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        }),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (rightArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.rightIcon || $q.iconSet.tabs[props.vertical === true ? "down" : "right"],
          onMousedownPassive: scrollToEnd,
          onTouchstartPassive: scrollToEnd,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        })
      ]);
    };
  }
});
const QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
const QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
const _sfc_main$3 = {
  __name: "LoginForm",
  emits: ["login-success"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    const emit = __emit;
    const API = "https://nuxt.meidanm.com";
    function apiFetch(path, options = {}) {
      return fetch(`${API}/wp-json/${path}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers || {}
        }
      });
    }
    async function mergeGuestCart(guestItems) {
      if (!guestItems?.length) return;
      const userCart = await apiFetch("wc/store/v1/cart").then((r) => r.json());
      if (userCart.items_count > 0) return;
      let lastResponse = null;
      for (const item of guestItems) {
        const res = await apiFetch("wc/store/v1/cart/add-item", {
          method: "POST",
          body: JSON.stringify({ id: item.id, quantity: item.quantity })
        });
        lastResponse = await res.json();
      }
      if (lastResponse) {
        cart.state.items = lastResponse.items || [];
        cart.state.items_count = lastResponse.items_count || 0;
        cart.state.totals = lastResponse.totals || {};
        cart.state.coupons = lastResponse.coupons || [];
        cart.state.cart_array = lastResponse || [];
      }
    }
    async function login() {
      error.value = "";
      loading.value = true;
      try {
        const guestCart = await apiFetch("wc/store/v1/cart").then((r) => r.json());
        const res = await apiFetch("qwoo/v1/login", {
          method: "POST",
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        }).then(
          apiFetch("qwoo/v1/debug").then((r) => r.json()).then(console.log)
        );
        const data = await res.json();
        if (!data.success) {
          error.value = data.message || "Login failed. Please try again.";
          return;
        }
        cart.state.user = data.user;
        await mergeGuestCart(guestCart.items);
        emit("login-success", data.user);
      } catch (err) {
        console.error("Login error:", err);
        error.value = "A server error occurred. Please try again later.";
      } finally {
        loading.value = false;
      }
    }
    const __returned__ = { username, password, error, loading, emit, API, apiFetch, mergeGuestCart, login, ref, get cart() {
      return cart;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$3 = {
  key: 0,
  class: "text-negative q-mt-md"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QForm, {
    onSubmit: withModifiers($setup.login, ["prevent"])
  }, {
    default: withCtx(() => [
      createVNode(QInput, {
        modelValue: $setup.username,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.username = $event),
        label: "Username or Email",
        filled: "",
        disable: $setup.loading
      }, null, 8, ["modelValue", "disable"]),
      createVNode(QInput, {
        modelValue: $setup.password,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
        type: "password",
        label: "Password",
        filled: "",
        disable: $setup.loading
      }, null, 8, ["modelValue", "disable"]),
      createVNode(QBtn, {
        label: "Login",
        type: "submit",
        color: "secondary",
        loading: $setup.loading
      }, null, 8, ["loading"]),
      $setup.error ? (openBlock(), createElementBlock("div", _hoisted_1$3, toDisplayString($setup.error), 1)) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const LoginForm = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "LoginForm.vue"]]);
const QSlideTransition = createComponent({
  name: "QSlideTransition",
  props: {
    appear: Boolean,
    duration: {
      type: Number,
      default: 300
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit }) {
    let animating = false, doneFn, element;
    let timer = null, timerFallback = null, animListener, lastEvent;
    function cleanup() {
      doneFn?.();
      doneFn = null;
      animating = false;
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (timerFallback !== null) {
        clearTimeout(timerFallback);
        timerFallback = null;
      }
      element?.removeEventListener("transitionend", animListener);
      animListener = null;
    }
    function begin(el, height, done) {
      if (height !== void 0) {
        el.style.height = `${height}px`;
      }
      el.style.transition = `height ${props.duration}ms cubic-bezier(.25, .8, .50, 1)`;
      animating = true;
      doneFn = done;
    }
    function end(el, event) {
      el.style.overflowY = null;
      el.style.height = null;
      el.style.transition = null;
      cleanup();
      event !== lastEvent && emit(event);
    }
    function onEnter(el, done) {
      let pos = 0;
      element = el;
      if (animating === true) {
        cleanup();
        pos = el.offsetHeight === el.scrollHeight ? 0 : void 0;
      } else {
        lastEvent = "hide";
        el.style.overflowY = "hidden";
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = `${el.scrollHeight}px`;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "show");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    function onLeave(el, done) {
      let pos;
      element = el;
      if (animating === true) {
        cleanup();
      } else {
        lastEvent = "show";
        el.style.overflowY = "hidden";
        pos = el.scrollHeight;
      }
      begin(el, pos, done);
      timer = setTimeout(() => {
        timer = null;
        el.style.height = 0;
        animListener = (evt) => {
          timerFallback = null;
          if (Object(evt) !== evt || evt.target === el) {
            end(el, "hide");
          }
        };
        el.addEventListener("transitionend", animListener);
        timerFallback = setTimeout(animListener, props.duration * 1.1);
      }, 100);
    }
    onBeforeUnmount(() => {
      animating === true && cleanup();
    });
    return () => h(Transition, {
      css: false,
      appear: props.appear,
      onEnter,
      onLeave
    }, slots.default);
  }
});
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
const QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: {},
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(
      props.modelValue !== null ? props.modelValue : props.defaultOpened
    );
    const blurTargetRef = ref(null);
    const targetUid = useId();
    const { show, hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(
      () => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`
    );
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(
      () => props.disable !== true && (props.href !== void 0 || props.to !== void 0 && props.to !== null && props.to !== "")
    );
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(
      () => hasLink.value === true || props.expandIconToggle !== true
    );
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(
      () => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );
    const headerSlotScope = computed(() => ({
      expanded: showing.value === true,
      detailsId: targetUid.value,
      toggle,
      show,
      hide
    }));
    const toggleAriaAttrs = computed(() => {
      const toggleAriaLabel = props.toggleAriaLabel !== void 0 ? props.toggleAriaLabel : $q.lang.label[showing.value === true ? "collapse" : "expand"](props.label);
      return {
        role: "button",
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-controls": targetUid.value,
        "aria-label": toggleAriaLabel
      };
    });
    watch(() => props.group, (name) => {
      exitGroup?.();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      if (keyboard !== true && e.qAvoidFocus !== true) {
        blurTargetRef.value?.focus();
      }
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("afterShow");
    }
    function onHide() {
      emit("afterHide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show2 = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(
        () => itemGroups[props.group],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );
      exitGroup = () => {
        show2();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          ...toggleAriaAttrs.value,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(
          h("div", {
            ref: blurTargetRef,
            class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
            tabindex: -1
          })
        );
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header(headerSlotScope.value));
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](
          h(QItemSection, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(QIcon, { name: props.icon }))
        );
      }
      if (props.disable !== true && props.hideExpandIcon !== true) {
        child[props.switchToggleSide === true ? "unshift" : "push"](
          getToggleIcon()
        );
      }
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        Object.assign(
          data,
          hasLink.value === true ? linkProps.value : toggleAriaAttrs.value
        );
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(
        h("div", {
          key: "e-content",
          class: "q-expansion-item__content relative-position",
          style: contentStyle.value,
          id: targetUid.value
        }, hSlot(slots.default)),
        [[
          vShow,
          showing.value
        ]]
      );
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
            dark: isDark.value
          }),
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
            dark: isDark.value
          })
        );
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup?.();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
const _sfc_main$2 = {
  __name: "OrdersSection",
  setup(__props, { expose: __expose }) {
    __expose();
    const orders = ref(null);
    const columns = [
      {
        name: "thumbnail",
        label: "",
        align: "left",
        field: "thumbnail"
      },
      {
        name: "name",
        label: "Product",
        align: "left",
        field: "name"
      },
      {
        name: "quantity",
        label: "Qty",
        align: "center",
        field: "quantity"
      },
      {
        name: "total",
        label: "Total (₪)",
        align: "right",
        field: "total"
      }
    ];
    onMounted(async () => {
      const res = await fetchWithToken(`${"https://nuxt.meidanm.com"}/wp-json/wc/store/v1/my-orders`);
      orders.value = await res.json();
      console.log(orders);
    });
    const __returned__ = { orders, columns, ref, onMounted, get matShoppingBag() {
      return matShoppingBag;
    }, get matKeyboardArrowDown() {
      return matKeyboardArrowDown;
    }, get fetchWithToken() {
      return fetchWithToken;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = { class: "q-mt-sm q-pa-md" };
const _hoisted_3$2 = { class: "text-body2 text-grey-7 q-mb-sm" };
const _hoisted_4$2 = { key: 1 };
const _hoisted_5$2 = { key: 2 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", null, [
    _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "text-h4" }, "My Orders", -1)),
    $setup.orders && $setup.orders.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
      createVNode(QCard, { dense: "" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.orders, (order) => {
            return openBlock(), createBlock(QExpansionItem, {
              key: order.id,
              label: `Order #${order.number}`,
              caption: `${order.date_created} | Status: ${order.status}`,
              icon: $setup.matShoppingBag,
              "expand-icon": $setup.matKeyboardArrowDown,
              "header-class": "text-primary text-bold",
              class: "q-mb-sm",
              group: "somegroup",
              "expand-separator": ""
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2$2, [
                  createBaseVNode("div", _hoisted_3$2, " Total: " + toDisplayString(order.total) + " " + toDisplayString(order.currency), 1),
                  createVNode(QTable, {
                    rows: Object.values(order.items),
                    columns: $setup.columns,
                    "row-key": "name",
                    dense: "",
                    flat: "",
                    bordered: "",
                    "hide-bottom": ""
                  }, {
                    "body-cell-thumbnail": withCtx((props) => [
                      createVNode(QTd, { props }, {
                        default: withCtx(() => [
                          createVNode(QImg, {
                            src: props.row.thumbnail,
                            style: { "width": "70px", "height": "70px" },
                            "spinner-color": "grey-5",
                            ratio: "1",
                            fit: "cover",
                            class: "rounded-borders"
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ]),
              _: 2
            }, 1032, ["label", "caption", "icon", "expand-icon"]);
          }), 128))
        ]),
        _: 1
      })
    ])) : $setup.orders && $setup.orders.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
      _cache[1] || (_cache[1] = createTextVNode("No orders yet. ", -1)),
      createVNode(_component_router_link, { to: "products" }, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createTextVNode("explore our products", -1)
        ])]),
        _: 1
      }),
      _cache[2] || (_cache[2] = createTextVNode(" to start your first order!", -1))
    ])) : (openBlock(), createElementBlock("div", _hoisted_5$2, [
      createVNode(QSpinner, {
        color: "secondary",
        size: "2em"
      })
    ]))
  ]);
}
const OrdersSection = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "OrdersSection.vue"]]);
const _sfc_main$1 = {
  __name: "AccountDetails",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const account = ref({
      first_name: props?.user?.first_name,
      last_name: props?.user?.last_name,
      email: props?.user?.email
    });
    const API = "https://nuxt.meidanm.com";
    const saving = ref(false);
    const saveError = ref("");
    const saveSuccess = ref(false);
    async function updateDetails() {
      saveError.value = "";
      saveSuccess.value = false;
      saving.value = true;
      try {
        const res = await fetchWithToken(`${API}/wp-json/qwoo/v1/me`, {
          method: "POST",
          body: JSON.stringify({
            first_name: account.value.first_name,
            last_name: account.value.last_name
          })
        });
        const data = await res.json();
        if (!data.success) {
          saveError.value = data.message || "Failed to save changes. Please try again.";
          return;
        }
        account.value = {
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email
        };
        saveSuccess.value = true;
      } catch (err) {
        console.error("Failed to update account:", err);
        saveError.value = "A server error occurred. Please try again later.";
      } finally {
        saving.value = false;
      }
    }
    const __returned__ = { props, account, API, saving, saveError, saveSuccess, updateDetails, ref, get fetchWithToken() {
      return fetchWithToken;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = {
  key: 1,
  class: "text-negative"
};
const _hoisted_3$1 = { key: 2 };
const _hoisted_4$1 = {
  key: 0,
  class: "text-negative q-mt-md"
};
const _hoisted_5$1 = {
  key: 1,
  class: "text-positive q-mt-md"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    _cache[3] || (_cache[3] = createBaseVNode("h1", { class: "text-h4" }, "Account Details", -1)),
    _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(QSpinner, {
        color: "secondary",
        size: "2em"
      })
    ])) : _ctx.loadError ? (openBlock(), createElementBlock("div", _hoisted_2$1, toDisplayString(_ctx.loadError), 1)) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
      createVNode(QForm, {
        onSubmit: withModifiers($setup.updateDetails, ["prevent"])
      }, {
        default: withCtx(() => [
          createVNode(QInput, {
            modelValue: $setup.account.first_name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.account.first_name = $event),
            label: "First Name",
            disable: $setup.saving
          }, null, 8, ["modelValue", "disable"]),
          createVNode(QInput, {
            modelValue: $setup.account.last_name,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.account.last_name = $event),
            label: "Last Name",
            disable: $setup.saving
          }, null, 8, ["modelValue", "disable"]),
          createVNode(QInput, {
            modelValue: $setup.account.email,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.account.email = $event),
            label: "Email",
            type: "email",
            disable: "",
            readonly: ""
          }, null, 8, ["modelValue"]),
          createVNode(QBtn, {
            type: "submit",
            label: "Save Changes",
            color: "secondary",
            loading: $setup.saving
          }, null, 8, ["loading"]),
          $setup.saveError ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString($setup.saveError), 1)) : createCommentVNode("", true),
          $setup.saveSuccess ? (openBlock(), createElementBlock("div", _hoisted_5$1, "Profile updated successfully.")) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]))
  ]);
}
const AccountDetails = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "AccountDetails.vue"]]);
const _sfc_main = {
  __name: "AccountPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const API = "https://nuxt.meidanm.com";
    const tab = ref("dashboard");
    const userData = ref(null);
    const isLoggedIn = ref(false);
    const sessionLoading = ref(true);
    const logoutLoading = ref(false);
    const logoutError = ref("");
    let sessionChecked = false;
    onMounted(async () => {
      if (sessionChecked) return;
      sessionChecked = true;
      console.trace("AccountPage onMounted fired");
      try {
        const res = await fetchWithToken(`${API}/wp-json/qwoo/v1/me`);
        if (res.ok) {
          const data = await res.json();
          userData.value = data.user;
          cart.state.user = data.user;
          setLoggedIn(true);
          isLoggedIn.value = true;
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        sessionLoading.value = false;
      }
    });
    function onLogin(user) {
      userData.value = user;
      cart.state.user = user;
      setLoggedIn(true);
      isLoggedIn.value = true;
    }
    async function logout() {
      logoutError.value = "";
      logoutLoading.value = true;
      try {
        await fetchWithToken(`${API}/wp-json/qwoo/v1/logout`, { method: "POST" });
      } catch (err) {
        console.error("Logout request failed:", err);
        logoutError.value = "Logout failed. Please try again.";
        return;
      } finally {
        logoutLoading.value = false;
      }
      userData.value = null;
      isLoggedIn.value = false;
      setLoggedIn(false);
      cart.clear();
      cart.state.user = {};
    }
    const __returned__ = { API, tab, userData, isLoggedIn, sessionLoading, logoutLoading, logoutError, get sessionChecked() {
      return sessionChecked;
    }, set sessionChecked(v) {
      sessionChecked = v;
    }, onLogin, logout, ref, onMounted, get fetchWithToken() {
      return fetchWithToken;
    }, get setLoggedIn() {
      return setLoggedIn;
    }, LoginForm, OrdersSection, AccountDetails, GoogleLoginButton, get cart() {
      return cart;
    }, get matChevronLeft() {
      return matChevronLeft;
    }, get matChevronRight() {
      return matChevronRight;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "container" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { key: 2 };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = {
  key: 0,
  class: "text-negative q-mt-md"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _cache[6] || (_cache[6] = createBaseVNode("h2", null, "My account", -1)),
      $setup.sessionLoading ? (openBlock(), createElementBlock("div", _hoisted_3, [
        createVNode(QSpinner, {
          color: "secondary",
          size: "2em"
        })
      ])) : !$setup.isLoggedIn ? (openBlock(), createElementBlock("div", _hoisted_4, [
        createVNode($setup["LoginForm"], { onLoginSuccess: $setup.onLogin }),
        _cache[4] || (_cache[4] = createBaseVNode("h3", null, "OR", -1)),
        createVNode($setup["GoogleLoginButton"])
      ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
        createVNode(QTabs, {
          onTouchstart: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"])),
          onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"])),
          "right-icon": $setup.matChevronLeft,
          "left-icon": $setup.matChevronRight,
          modelValue: $setup.tab,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.tab = $event),
          class: "text-secondary",
          "active-bg-color": "secondary",
          "active-color": "primary",
          align: "justify"
        }, {
          default: withCtx(() => [
            createVNode(QTab, {
              name: "dashboard",
              label: "Dashboard"
            }),
            createVNode(QTab, {
              name: "orders",
              label: "My Orders"
            }),
            createVNode(QTab, {
              name: "details",
              label: "Account Details"
            }),
            createVNode(QTab, {
              name: "logout",
              label: "Logout"
            })
          ]),
          _: 1
        }, 8, ["right-icon", "left-icon", "modelValue"]),
        createVNode(QSeparator),
        createVNode(QTabPanels, {
          modelValue: $setup.tab,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.tab = $event),
          animated: ""
        }, {
          default: withCtx(() => [
            createVNode(QTabPanel, { name: "dashboard" }, {
              default: withCtx(() => [
                _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "text-h4" }, "Dashboard", -1)),
                $setup.userData ? (openBlock(), createElementBlock("div", _hoisted_6, " Welcome, " + toDisplayString($setup.userData.first_name) + " " + toDisplayString($setup.userData.last_name), 1)) : (openBlock(), createElementBlock("div", _hoisted_7, [
                  createVNode(QSpinner, {
                    color: "secondary",
                    size: "2em"
                  })
                ]))
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "orders" }, {
              default: withCtx(() => [
                createVNode($setup["OrdersSection"])
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "details" }, {
              default: withCtx(() => [
                $setup.userData ? (openBlock(), createBlock($setup["AccountDetails"], {
                  key: 0,
                  user: $setup.userData
                }, null, 8, ["user"])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "logout" }, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  onClick: $setup.logout,
                  loading: $setup.logoutLoading,
                  label: "Logout"
                }, null, 8, ["loading"]),
                $setup.logoutError ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString($setup.logoutError), 1)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]))
    ])
  ]);
}
const AccountPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8a51071"], ["__file", "AccountPage.vue"]]);
export {
  AccountPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudFBhZ2UtQ2tyanc0X0MuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFicy91c2UtdGFiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL1FUYWIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvUVRhYnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWItcGFuZWxzL1FUYWJQYW5lbHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Mb2dpbkZvcm0udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2V4cGFuc2lvbi1pdGVtL1FFeHBhbnNpb25JdGVtLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvT3JkZXJzU2VjdGlvbi52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BY2NvdW50RGV0YWlscy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvQWNjb3VudFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGluamVjdCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcydcblxuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSwgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgeyB0YWJzS2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcblxubGV0IGlkID0gMFxuXG5leHBvcnQgY29uc3QgdXNlVGFiRW1pdHMgPSBbICdjbGljaycsICdrZXlkb3duJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJQcm9wcyA9IHtcbiAgaWNvbjogU3RyaW5nLFxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gIGFsZXJ0OiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICBhbGVydEljb246IFN0cmluZyxcblxuICBuYW1lOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6ICgpID0+IGB0XyR7IGlkKysgfWBcbiAgfSxcblxuICBub0NhcHM6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgZGlzYWJsZTogQm9vbGVhbixcblxuICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHNsb3RzLCBlbWl0LCByb3V0ZURhdGEpIHtcbiAgY29uc3QgJHRhYnMgPSBpbmplY3QodGFic0tleSwgZW1wdHlSZW5kZXJGbilcbiAgaWYgKCR0YWJzID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgY29uc29sZS5lcnJvcignUVRhYi9RUm91dGVUYWIgY29tcG9uZW50IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFUYWJzJylcbiAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICB9XG5cbiAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgY29uc3QgdGFiSW5kaWNhdG9yUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmlwcGxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMucmlwcGxlID09PSBmYWxzZVxuICAgICAgPyBmYWxzZVxuICAgICAgOiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7IGtleUNvZGVzOiBbIDEzLCAzMiBdLCBlYXJseTogdHJ1ZSB9LFxuICAgICAgICBwcm9wcy5yaXBwbGUgPT09IHRydWUgPyB7fSA6IHByb3BzLnJpcHBsZVxuICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGlzQWN0aXZlID0gY29tcHV0ZWQoKCkgPT4gJHRhYnMuY3VycmVudE1vZGVsLnZhbHVlID09PSBwcm9wcy5uYW1lKVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXRhYiByZWxhdGl2ZS1wb3NpdGlvbiBzZWxmLXN0cmV0Y2ggZmxleCBmbGV4LWNlbnRlciB0ZXh0LWNlbnRlcidcbiAgICArIChcbiAgICAgIGlzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gKFxuICAgICAgICAgICAgJyBxLXRhYi0tYWN0aXZlJ1xuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ2xhc3MgPyAnICcgKyAkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVDbGFzcyA6ICcnKVxuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ29sb3IgPyBgIHRleHQtJHsgJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ29sb3IgfWAgOiAnJylcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUJnQ29sb3IgPyBgIGJnLSR7ICR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUJnQ29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgICAgIDogJyBxLXRhYi0taW5hY3RpdmUnXG4gICAgKVxuICAgICsgKHByb3BzLmljb24gJiYgcHJvcHMubGFiZWwgJiYgJHRhYnMudGFiUHJvcHMudmFsdWUuaW5saW5lTGFiZWwgPT09IGZhbHNlID8gJyBxLXRhYi0tZnVsbCcgOiAnJylcbiAgICArIChwcm9wcy5ub0NhcHMgPT09IHRydWUgfHwgJHRhYnMudGFiUHJvcHMudmFsdWUubm9DYXBzID09PSB0cnVlID8gJyBxLXRhYi0tbm8tY2FwcycgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlIGN1cnNvci1wb2ludGVyJylcbiAgICArIChyb3V0ZURhdGEgIT09IHZvaWQgMCA/IHJvdXRlRGF0YS5saW5rQ2xhc3MudmFsdWUgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXRhYl9fY29udGVudCBzZWxmLXN0cmV0Y2ggZmxleC1jZW50ZXIgcmVsYXRpdmUtcG9zaXRpb24gcS1hbmNob3ItLXNraXAgbm9uLXNlbGVjdGFibGUgJ1xuICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmlubGluZUxhYmVsID09PSB0cnVlID8gJ3JvdyBuby13cmFwIHEtdGFiX19jb250ZW50LS1pbmxpbmUnIDogJ2NvbHVtbicpXG4gICAgKyAocHJvcHMuY29udGVudENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmNvbnRlbnRDbGFzcyB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgdGFiSW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgJHRhYnMuaGFzRm9jdXMudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IChpc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UgJiYgJHRhYnMuaGFzQWN0aXZlVGFiLnZhbHVlID09PSB0cnVlKVxuICAgIClcbiAgICAgID8gLTFcbiAgICAgIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICApKVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2sgKGUsIGtleWJvYXJkKSB7XG4gICAgaWYgKGtleWJvYXJkICE9PSB0cnVlICYmIGU/LnFBdm9pZEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIC8vIHdlIHNob3VsZCBoaW5kZXIgbmF0aXZlIG5hdmlnYXRpb24gdGhvdWdoXG4gICAgICBpZiAocm91dGVEYXRhPy5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGEgUVRhYj9cbiAgICBpZiAocm91dGVEYXRhID09PSB2b2lkIDApIHtcbiAgICAgICR0YWJzLnVwZGF0ZU1vZGVsKHsgbmFtZTogcHJvcHMubmFtZSB9KVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBnbyA9IChvcHRzID0ge30pID0+IHtcbiAgICAgICAgLy8gaWYgcmVxdWlyaW5nIHRvIGdvIHRvIGFub3RoZXIgcm91dGUsIHRoZW4gd2VcbiAgICAgICAgLy8gbGV0IHRoZSBRVGFicyByb3V0ZSB3YXRjaGVyIGRvIGl0cyBqb2IsXG4gICAgICAgIC8vIG90aGVyd2lzZSBkaXJlY3RseSBzZWxlY3QgdGhpc1xuICAgICAgICBsZXQgaGFyZEVycm9yXG4gICAgICAgIGNvbnN0IHJlcUlkID0gb3B0cy50byA9PT0gdm9pZCAwIHx8IGlzRGVlcEVxdWFsKG9wdHMudG8sIHByb3BzLnRvKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gKCR0YWJzLmF2b2lkUm91dGVXYXRjaGVyID0gdWlkKCkpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgICAgcmV0dXJuIHJvdXRlRGF0YS5uYXZpZ2F0ZVRvUm91dGVyTGluayhlLCB7IC4uLm9wdHMsIHJldHVyblJvdXRlckVycm9yOiB0cnVlIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7IGhhcmRFcnJvciA9IGVyciB9KVxuICAgICAgICAgIC50aGVuKHNvZnRFcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAocmVxSWQgPT09ICR0YWJzLmF2b2lkUm91dGVXYXRjaGVyKSB7XG4gICAgICAgICAgICAgICR0YWJzLmF2b2lkUm91dGVXYXRjaGVyID0gZmFsc2VcblxuICAgICAgICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFueSBoYXJkIGVycm9ycyBvciBhbnkgc29mdCBlcnJvcnMsIGV4Y2VwdCBmb3JcbiAgICAgICAgICAgICAgLy8gd2hlbiBuYXZpZ2F0aW5nIHRvIHRoZSBzYW1lIHJvdXRlIChvbiBhbGwgb3RoZXIgc29mdCBlcnJvcnMsXG4gICAgICAgICAgICAgIC8vIGxpa2Ugd2hlbiBuYXZpZ2F0aW9uIHdhcyBhYm9ydGVkIGluIGEgbmF2IGd1YXJkLCB3ZSBkb24ndCBhY3RpdmF0ZSB0aGlzIHRhYilcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGhhcmRFcnJvciA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICAgICAgICAgIHNvZnRFcnJvciA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgICB8fCAoc29mdEVycm9yLm1lc3NhZ2U/LnN0YXJ0c1dpdGgoJ0F2b2lkZWQgcmVkdW5kYW50IG5hdmlnYXRpb24nKSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICR0YWJzLnVwZGF0ZU1vZGVsKHsgbmFtZTogcHJvcHMubmFtZSB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnJldHVyblJvdXRlckVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYXJkRXJyb3IgIT09IHZvaWQgMCA/IFByb21pc2UucmVqZWN0KGhhcmRFcnJvcikgOiBzb2Z0RXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdjbGljaycsIGUsIGdvKVxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlICYmIGdvKClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZW1pdCgnY2xpY2snLCBlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgaWYgKGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSkge1xuICAgICAgb25DbGljayhlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHNob3VsZElnbm9yZUtleShlKSAhPT0gdHJ1ZVxuICAgICAgJiYgZS5rZXlDb2RlID49IDM1XG4gICAgICAmJiBlLmtleUNvZGUgPD0gNDBcbiAgICAgICYmIGUuYWx0S2V5ICE9PSB0cnVlXG4gICAgICAmJiBlLm1ldGFLZXkgIT09IHRydWVcbiAgICApIHtcbiAgICAgICR0YWJzLm9uS2JkTmF2aWdhdGUoZS5rZXlDb2RlLCBwcm94eS4kZWwpID09PSB0cnVlICYmIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZW1pdCgna2V5ZG93bicsIGUpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdFxuICAgICAgbmFycm93ID0gJHRhYnMudGFiUHJvcHMudmFsdWUubmFycm93SW5kaWNhdG9yLFxuICAgICAgY29udGVudCA9IFtdLFxuICAgICAgaW5kaWNhdG9yID0gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHRhYkluZGljYXRvclJlZixcbiAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAncS10YWJfX2luZGljYXRvcicsXG4gICAgICAgICAgJHRhYnMudGFiUHJvcHMudmFsdWUuaW5kaWNhdG9yQ2xhc3NcbiAgICAgICAgXVxuICAgICAgfSlcblxuICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBjb250ZW50LnB1c2goXG4gICAgICBoKFFJY29uLCB7XG4gICAgICAgIGNsYXNzOiAncS10YWJfX2ljb24nLFxuICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICB9KVxuICAgIClcblxuICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgY29udGVudC5wdXNoKFxuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiX19sYWJlbCcgfSwgcHJvcHMubGFiZWwpXG4gICAgKVxuXG4gICAgcHJvcHMuYWxlcnQgIT09IGZhbHNlICYmIGNvbnRlbnQucHVzaChcbiAgICAgIHByb3BzLmFsZXJ0SWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJfX2FsZXJ0LWljb24nLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5hbGVydCAhPT0gdHJ1ZVxuICAgICAgICAgICAgPyBwcm9wcy5hbGVydFxuICAgICAgICAgICAgOiB2b2lkIDAsXG4gICAgICAgICAgbmFtZTogcHJvcHMuYWxlcnRJY29uXG4gICAgICAgIH0pXG4gICAgICAgIDogaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJfX2FsZXJ0J1xuICAgICAgICAgICAgKyAocHJvcHMuYWxlcnQgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMuYWxlcnQgfWAgOiAnJylcbiAgICAgICAgfSlcbiAgICApXG5cbiAgICBuYXJyb3cgPT09IHRydWUgJiYgY29udGVudC5wdXNoKGluZGljYXRvcilcblxuICAgIGNvbnN0IG5vZGUgPSBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clRhcmdldFJlZiB9KSxcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjb250ZW50KSlcbiAgICBdXG5cbiAgICBuYXJyb3cgPT09IGZhbHNlICYmIG5vZGUucHVzaChpbmRpY2F0b3IpXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgY29uc3QgdGFiRGF0YSA9IHtcbiAgICBuYW1lOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lKSxcbiAgICByb290UmVmLFxuICAgIHRhYkluZGljYXRvclJlZixcbiAgICByb3V0ZURhdGFcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgJHRhYnMudW5yZWdpc3RlclRhYih0YWJEYXRhKVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgJHRhYnMucmVnaXN0ZXJUYWIodGFiRGF0YSlcbiAgfSlcblxuICBmdW5jdGlvbiByZW5kZXJUYWIgKHRhZywgY3VzdG9tRGF0YSkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHRhYmluZGV4OiB0YWJJbmRleC52YWx1ZSxcbiAgICAgIHJvbGU6ICd0YWInLFxuICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAnYXJpYS1kaXNhYmxlZCc6IHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAndHJ1ZScgOiB2b2lkIDAsXG4gICAgICBvbkNsaWNrLFxuICAgICAgb25LZXlkb3duLFxuICAgICAgLi4uY3VzdG9tRGF0YVxuICAgIH1cblxuICAgIHJldHVybiB3aXRoRGlyZWN0aXZlcyhcbiAgICAgIGgodGFnLCBkYXRhLCBnZXRDb250ZW50KCkpLFxuICAgICAgWyBbIFJpcHBsZSwgcmlwcGxlLnZhbHVlIF0gXVxuICAgIClcbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlclRhYiwgJHRhYnMgfVxufVxuIiwiaW1wb3J0IHVzZVRhYiwgeyB1c2VUYWJQcm9wcywgdXNlVGFiRW1pdHMgfSBmcm9tICcuL3VzZS10YWIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWInLFxuXG4gIHByb3BzOiB1c2VUYWJQcm9wcyxcblxuICBlbWl0czogdXNlVGFiRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHJlbmRlclRhYiB9ID0gdXNlVGFiKHByb3BzLCBzbG90cywgZW1pdClcbiAgICByZXR1cm4gKCkgPT4gcmVuZGVyVGFiKCdkaXYnKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGFic0tleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgcnRsSGFzU2Nyb2xsQnVnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ydGwvcnRsLmpzJ1xuXG5mdW5jdGlvbiBnZXRJbmRpY2F0b3JDbGFzcyAoY29sb3IsIHRvcCwgdmVydGljYWwpIHtcbiAgY29uc3QgcG9zID0gdmVydGljYWwgPT09IHRydWVcbiAgICA/IFsgJ2xlZnQnLCAncmlnaHQnIF1cbiAgICA6IFsgJ3RvcCcsICdib3R0b20nIF1cblxuICByZXR1cm4gYGFic29sdXRlLSR7IHRvcCA9PT0gdHJ1ZSA/IHBvc1sgMCBdIDogcG9zWyAxIF0gfSR7IGNvbG9yID8gYCB0ZXh0LSR7IGNvbG9yIH1gIDogJycgfWBcbn1cblxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5JyBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFicycsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NlbnRlcicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgICB9LFxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDYwMFxuICAgIH0sXG5cbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBzaHJpbms6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcblxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVCZ0NvbG9yOiBTdHJpbmcsXG4gICAgaW5kaWNhdG9yQ29sb3I6IFN0cmluZyxcbiAgICBsZWZ0SWNvbjogU3RyaW5nLFxuICAgIHJpZ2h0SWNvbjogU3RyaW5nLFxuXG4gICAgb3V0c2lkZUFycm93czogQm9vbGVhbixcbiAgICBtb2JpbGVBcnJvd3M6IEJvb2xlYW4sXG5cbiAgICBzd2l0Y2hJbmRpY2F0b3I6IEJvb2xlYW4sXG5cbiAgICBuYXJyb3dJbmRpY2F0b3I6IEJvb2xlYW4sXG4gICAgaW5saW5lTGFiZWw6IEJvb2xlYW4sXG4gICAgbm9DYXBzOiBCb29sZWFuLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyU2Nyb2xsVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyVXBkYXRlQXJyb3dzVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyQW5pbWF0ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyRm9jdXNUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVGb2N1c1RpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0OiByZWdpc3RlclNjcm9sbFRvVGFiVGltZW91dCwgcmVtb3ZlVGltZW91dDogcmVtb3ZlU2Nyb2xsVG9UYWJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBjb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBjdXJyZW50TW9kZWwgPSByZWYocHJvcHMubW9kZWxWYWx1ZSlcbiAgICBjb25zdCBzY3JvbGxhYmxlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGxlZnRBcnJvdyA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHJpZ2h0QXJyb3cgPSByZWYoZmFsc2UpXG4gICAgY29uc3QganVzdGlmeSA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IHRhYkRhdGFMaXN0ID0gW11cbiAgICBjb25zdCB0YWJEYXRhTGlzdExlbiA9IHJlZigwKVxuICAgIGNvbnN0IGhhc0ZvY3VzID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGwsIHNjcm9sbFRpbWVyID0gbnVsbCwgdW53YXRjaFJvdXRlXG5cbiAgICBjb25zdCB0YWJQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBhY3RpdmVDbGFzczogcHJvcHMuYWN0aXZlQ2xhc3MsXG4gICAgICBhY3RpdmVDb2xvcjogcHJvcHMuYWN0aXZlQ29sb3IsXG4gICAgICBhY3RpdmVCZ0NvbG9yOiBwcm9wcy5hY3RpdmVCZ0NvbG9yLFxuICAgICAgaW5kaWNhdG9yQ2xhc3M6IGdldEluZGljYXRvckNsYXNzKFxuICAgICAgICBwcm9wcy5pbmRpY2F0b3JDb2xvcixcbiAgICAgICAgcHJvcHMuc3dpdGNoSW5kaWNhdG9yLFxuICAgICAgICBwcm9wcy52ZXJ0aWNhbFxuICAgICAgKSxcbiAgICAgIG5hcnJvd0luZGljYXRvcjogcHJvcHMubmFycm93SW5kaWNhdG9yLFxuICAgICAgaW5saW5lTGFiZWw6IHByb3BzLmlubGluZUxhYmVsLFxuICAgICAgbm9DYXBzOiBwcm9wcy5ub0NhcHNcbiAgICB9KSlcblxuICAgIGNvbnN0IGhhc0FjdGl2ZVRhYiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGxlbiA9IHRhYkRhdGFMaXN0TGVuLnZhbHVlXG4gICAgICBjb25zdCB2YWwgPSBjdXJyZW50TW9kZWwudmFsdWVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGFiRGF0YUxpc3RbIGkgXS5uYW1lLnZhbHVlID09PSB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICBjb25zdCBhbGlnbkNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWxpZ24gPSBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ2xlZnQnXG4gICAgICAgIDogKGp1c3RpZnkudmFsdWUgPT09IHRydWUgPyAnanVzdGlmeScgOiBwcm9wcy5hbGlnbilcblxuICAgICAgcmV0dXJuIGBxLXRhYnNfX2NvbnRlbnQtLWFsaWduLSR7IGFsaWduIH1gXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFicyByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIGAgcS10YWJzLS0keyBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlID8gJycgOiAnbm90LScgfXNjcm9sbGFibGVgXG4gICAgICArIGAgcS10YWJzLS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcgfWBcbiAgICAgICsgYCBxLXRhYnNfX2Fycm93cy0tJHsgcHJvcHMub3V0c2lkZUFycm93cyA9PT0gdHJ1ZSA/ICdvdXRzaWRlJyA6ICdpbnNpZGUnIH1gXG4gICAgICArIGAgcS10YWJzLS1tb2JpbGUtd2l0aCR7IHByb3BzLm1vYmlsZUFycm93cyA9PT0gdHJ1ZSA/ICcnIDogJ291dCcgfS1hcnJvd3NgXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJzLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnNocmluayA9PT0gdHJ1ZSA/ICcgY29sLXNocmluaycgOiAnJylcbiAgICAgICsgKHByb3BzLnN0cmV0Y2ggPT09IHRydWUgPyAnIHNlbGYtc3RyZXRjaCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRhYnNfX2NvbnRlbnQgc2Nyb2xsLS1tb2JpbGUgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHNlbGYtc3RyZXRjaCBoaWRlLXNjcm9sbGJhciByZWxhdGl2ZS1wb3NpdGlvbiAnXG4gICAgICArIGFsaWduQ2xhc3MudmFsdWVcbiAgICAgICsgKHByb3BzLmNvbnRlbnRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5jb250ZW50Q2xhc3MgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBkb21Qcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8geyBjb250YWluZXI6ICdoZWlnaHQnLCBjb250ZW50OiAnb2Zmc2V0SGVpZ2h0Jywgc2Nyb2xsOiAnc2Nyb2xsSGVpZ2h0JyB9XG4gICAgICAgIDogeyBjb250YWluZXI6ICd3aWR0aCcsIGNvbnRlbnQ6ICdvZmZzZXRXaWR0aCcsIHNjcm9sbDogJ3Njcm9sbFdpZHRoJyB9XG4gICAgKSlcblxuICAgIGNvbnN0IGlzUlRMID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudmVydGljYWwgIT09IHRydWUgJiYgJHEubGFuZy5ydGwgPT09IHRydWUpXG4gICAgY29uc3QgcnRsUG9zQ29ycmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gZmFsc2UgJiYgaXNSVEwudmFsdWUgPT09IHRydWUpXG5cbiAgICB3YXRjaChpc1JUTCwgdXBkYXRlQXJyb3dzKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgbmFtZSA9PiB7XG4gICAgICB1cGRhdGVNb2RlbCh7IG5hbWUsIHNldEN1cnJlbnQ6IHRydWUsIHNraXBFbWl0OiB0cnVlIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm91dHNpZGVBcnJvd3MsIHJlY2FsY3VsYXRlU2Nyb2xsKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTW9kZWwgKHsgbmFtZSwgc2V0Q3VycmVudCwgc2tpcEVtaXQgfSkge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlbC52YWx1ZSA9PT0gbmFtZSkgcmV0dXJuXG5cbiAgICAgIGlmIChza2lwRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2V0Q3VycmVudCA9PT0gdHJ1ZVxuICAgICAgICB8fCBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gPT09IHZvaWQgMFxuICAgICAgKSB7XG4gICAgICAgIGFuaW1hdGUoY3VycmVudE1vZGVsLnZhbHVlLCBuYW1lKVxuICAgICAgICBjdXJyZW50TW9kZWwudmFsdWUgPSBuYW1lXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWxjdWxhdGVTY3JvbGwgKCkge1xuICAgICAgcmVnaXN0ZXJTY3JvbGxUaWNrKCgpID0+IHtcbiAgICAgICAgcm9vdFJlZi52YWx1ZSAmJiB1cGRhdGVDb250YWluZXIoe1xuICAgICAgICAgIHdpZHRoOiByb290UmVmLnZhbHVlLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogcm9vdFJlZi52YWx1ZS5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyIChkb21TaXplKSB7XG4gICAgICAvLyBpdCBjYW4gYmUgY2FsbGVkIGZhc3RlciB0aGFuIGNvbXBvbmVudCBiZWluZyBpbml0aWFsaXplZFxuICAgICAgLy8gc28gd2UgbmVlZCB0byBwcm90ZWN0IGFnYWluc3QgdGhhdCBjYXNlXG4gICAgICAvLyAob25lIGV4YW1wbGUgb2Ygc3VjaCBjYXNlIGlzIHRoZSBkb2NzIHJlbGVhc2Ugbm90ZXMgcGFnZSlcbiAgICAgIGlmIChkb21Qcm9wcy52YWx1ZSA9PT0gdm9pZCAwIHx8IGNvbnRlbnRSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplID0gZG9tU2l6ZVsgZG9tUHJvcHMudmFsdWUuY29udGFpbmVyIF0sXG4gICAgICAgIHNjcm9sbFNpemUgPSBNYXRoLm1pbihcbiAgICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBkb21Qcm9wcy52YWx1ZS5zY3JvbGwgXSxcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoXG4gICAgICAgICAgICBjb250ZW50UmVmLnZhbHVlLmNoaWxkcmVuLFxuICAgICAgICAgICAgKGFjYywgZWwpID0+IGFjYyArIChlbFsgZG9tUHJvcHMudmFsdWUuY29udGVudCBdIHx8IDApLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgc2Nyb2xsID0gc2l6ZSA+IDAgJiYgc2Nyb2xsU2l6ZSA+IHNpemUgLy8gd2hlbiB0aGVyZSBpcyBubyB0YWIsIGluIENocm9tZSwgc2l6ZSA9PT0gMCBhbmQgc2Nyb2xsU2l6ZSA9PT0gMVxuXG4gICAgICBzY3JvbGxhYmxlLnZhbHVlID0gc2Nyb2xsXG5cbiAgICAgIC8vIEFycm93cyBuZWVkIHRvIGJlIHVwZGF0ZWQgZXZlbiBpZiB0aGUgc2Nyb2xsIHN0YXR1cyB3YXMgYWxyZWFkeSB0cnVlXG4gICAgICBzY3JvbGwgPT09IHRydWUgJiYgcmVnaXN0ZXJVcGRhdGVBcnJvd3NUaWNrKHVwZGF0ZUFycm93cylcblxuICAgICAganVzdGlmeS52YWx1ZSA9IHNpemUgPCBwYXJzZUludChwcm9wcy5icmVha3BvaW50LCAxMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlIChvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICBjb25zdFxuICAgICAgICBvbGRUYWIgPSBvbGROYW1lICE9PSB2b2lkIDAgJiYgb2xkTmFtZSAhPT0gbnVsbCAmJiBvbGROYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG9sZE5hbWUpXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBuZXdUYWIgPSBuZXdOYW1lICE9PSB2b2lkIDAgJiYgbmV3TmFtZSAhPT0gbnVsbCAmJiBuZXdOYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG5ld05hbWUpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgIGlmIChoYWRBY3RpdmF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgLy8gQWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiByZS1hY3RpdmF0ZWRcbiAgICAgICAgLy8gd2Ugc2hvdWxkIG5vdCBhbmltYXRlIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICAvLyBDb25zaWRlciBpdCBhcyBpZiB0aGUgY29tcG9uZW50IGhhcyBqdXN0IGJlZW4gbW91bnRlZC5cbiAgICAgICAgaGFkQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9sZFRhYiAmJiBuZXdUYWIpIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBvbGRFbCA9IG9sZFRhYi50YWJJbmRpY2F0b3JSZWYudmFsdWUsXG4gICAgICAgICAgbmV3RWwgPSBuZXdUYWIudGFiSW5kaWNhdG9yUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgb2xkRWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBvbGRFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcblxuICAgICAgICBjb25zdFxuICAgICAgICAgIG9sZFBvcyA9IG9sZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIG5ld1BvcyA9IG5ld0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNmb3JtID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IGB0cmFuc2xhdGUzZCgwLCR7IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wIH1weCwwKSBzY2FsZTNkKDEsJHsgbmV3UG9zLmhlaWdodCA/IG9sZFBvcy5oZWlnaHQgLyBuZXdQb3MuaGVpZ2h0IDogMSB9LDEpYFxuICAgICAgICAgIDogYHRyYW5zbGF0ZTNkKCR7IG9sZFBvcy5sZWZ0IC0gbmV3UG9zLmxlZnQgfXB4LDAsMCkgc2NhbGUzZCgkeyBuZXdQb3Mud2lkdGggPyBvbGRQb3Mud2lkdGggLyBuZXdQb3Mud2lkdGggOiAxIH0sMSwxKWBcblxuICAgICAgICAvLyBhbGxvdyBzY29wZSB1cGRhdGVzIHRvIGtpY2sgaW4gKFFSb3V0ZVRhYiBuZWVkcyBtb3JlIHRpbWUpXG4gICAgICAgIHJlZ2lzdGVyQW5pbWF0ZVRpY2soKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gLjI1cyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKSdcbiAgICAgICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJ1xuICAgICAgICAgIH0sIDcwKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VGFiICYmIHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RhYkVsIChlbCkge1xuICAgICAgY29uc3RcbiAgICAgICAgeyBsZWZ0LCB3aWR0aCwgdG9wLCBoZWlnaHQgfSA9IGNvbnRlbnRSZWYudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIG5ld1BvcyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgIGxldCBvZmZzZXQgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IG5ld1Bvcy50b3AgLSB0b3AgOiBuZXdQb3MubGVmdCAtIGxlZnRcblxuICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgY29udGVudFJlZi52YWx1ZVsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JyBdICs9IE1hdGguZmxvb3Iob2Zmc2V0KVxuICAgICAgICB1cGRhdGVBcnJvd3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb2Zmc2V0ICs9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gbmV3UG9zLmhlaWdodCAtIGhlaWdodCA6IG5ld1Bvcy53aWR0aCAtIHdpZHRoXG4gICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxUb3AnIDogJ3Njcm9sbExlZnQnIF0gKz0gTWF0aC5jZWlsKG9mZnNldClcbiAgICAgICAgdXBkYXRlQXJyb3dzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBcnJvd3MgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYudmFsdWVcbiAgICAgIGlmIChjb250ZW50ID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29uc3RcbiAgICAgICAgcmVjdCA9IGNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHBvcyA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gY29udGVudC5zY3JvbGxUb3AgOiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpXG5cbiAgICAgIGlmIChpc1JUTC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsZWZ0QXJyb3cudmFsdWUgPSBNYXRoLmNlaWwocG9zICsgcmVjdC53aWR0aCkgPCBjb250ZW50LnNjcm9sbFdpZHRoIC0gMVxuICAgICAgICByaWdodEFycm93LnZhbHVlID0gcG9zID4gMFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxlZnRBcnJvdy52YWx1ZSA9IHBvcyA+IDBcbiAgICAgICAgcmlnaHRBcnJvdy52YWx1ZSA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgPyBNYXRoLmNlaWwocG9zICsgcmVjdC5oZWlnaHQpIDwgY29udGVudC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICA6IE1hdGguY2VpbChwb3MgKyByZWN0LndpZHRoKSA8IGNvbnRlbnQuc2Nyb2xsV2lkdGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltU2Nyb2xsVG8gKHZhbHVlKSB7XG4gICAgICBzY3JvbGxUaW1lciAhPT0gbnVsbCAmJiBjbGVhckludGVydmFsKHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChzY3JvbGxUb3dhcmRzKHZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgICAgfVxuICAgICAgfSwgNSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1N0YXJ0ICgpIHtcbiAgICAgIGFuaW1TY3JvbGxUbyhydGxQb3NDb3JyZWN0aW9uLnZhbHVlID09PSB0cnVlID8gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgOiAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvRW5kICgpIHtcbiAgICAgIGFuaW1TY3JvbGxUbyhydGxQb3NDb3JyZWN0aW9uLnZhbHVlID09PSB0cnVlID8gMCA6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BBbmltU2Nyb2xsICgpIHtcbiAgICAgIGlmIChzY3JvbGxUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbFRpbWVyKVxuICAgICAgICBzY3JvbGxUaW1lciA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktiZE5hdmlnYXRlIChrZXlDb2RlLCBmcm9tRWwpIHtcbiAgICAgIGNvbnN0IHRhYnMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoXG4gICAgICAgIGNvbnRlbnRSZWYudmFsdWUuY2hpbGRyZW4sXG4gICAgICAgIGVsID0+IGVsID09PSBmcm9tRWwgfHwgKGVsLm1hdGNoZXMgJiYgZWwubWF0Y2hlcygnLnEtdGFiLnEtZm9jdXNhYmxlJykgPT09IHRydWUpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxlbiA9IHRhYnMubGVuZ3RoXG4gICAgICBpZiAobGVuID09PSAwKSByZXR1cm5cblxuICAgICAgaWYgKGtleUNvZGUgPT09IDM2KSB7IC8vIEhvbWVcbiAgICAgICAgc2Nyb2xsVG9UYWJFbCh0YWJzWyAwIF0pXG4gICAgICAgIHRhYnNbIDAgXS5mb2N1cygpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gMzUpIHsgLy8gRW5kXG4gICAgICAgIHNjcm9sbFRvVGFiRWwodGFic1sgbGVuIC0gMSBdKVxuICAgICAgICB0YWJzWyBsZW4gLSAxIF0uZm9jdXMoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJQcmV2ID0ga2V5Q29kZSA9PT0gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gMzggLyogQXJyb3dVcCAqLyA6IDM3IC8qIEFycm93TGVmdCAqLylcbiAgICAgIGNvbnN0IGRpck5leHQgPSBrZXlDb2RlID09PSAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyA0MCAvKiBBcnJvd0Rvd24gKi8gOiAzOSAvKiBBcnJvd1JpZ2h0ICovKVxuXG4gICAgICBjb25zdCBkaXIgPSBkaXJQcmV2ID09PSB0cnVlID8gLTEgOiAoZGlyTmV4dCA9PT0gdHJ1ZSA/IDEgOiB2b2lkIDApXG5cbiAgICAgIGlmIChkaXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBydGxEaXIgPSBpc1JUTC52YWx1ZSA9PT0gdHJ1ZSA/IC0xIDogMVxuICAgICAgICBjb25zdCBpbmRleCA9IHRhYnMuaW5kZXhPZihmcm9tRWwpICsgZGlyICogcnRsRGlyXG5cbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICBzY3JvbGxUb1RhYkVsKHRhYnNbIGluZGV4IF0pXG4gICAgICAgICAgdGFic1sgaW5kZXggXS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbGV0J3Mgc3BlZWQgdXAgZXhlY3V0aW9uIG9mIHRpbWUtc2Vuc2l0aXZlIHNjcm9sbFRvd2FyZHMoKVxuICAgIC8vIHdpdGggYSBjb21wdXRlZCB2YXJpYWJsZSBieSBkaXJlY3RseSBhcHBseWluZyB0aGUgbWluaW1hbFxuICAgIC8vIG51bWJlciBvZiBpbnN0cnVjdGlvbnMgb24gZ2V0L3NldCBmdW5jdGlvbnNcbiAgICBjb25zdCBwb3NGbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWVcbiAgICAgICAgPyB7IGdldDogY29udGVudCA9PiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gLXBvcyB9IH1cbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IHsgZ2V0OiBjb250ZW50ID0+IGNvbnRlbnQuc2Nyb2xsVG9wLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxUb3AgPSBwb3MgfSB9XG4gICAgICAgICAgICAgIDogeyBnZXQ6IGNvbnRlbnQgPT4gY29udGVudC5zY3JvbGxMZWZ0LCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gcG9zIH0gfVxuICAgICAgICAgIClcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG93YXJkcyAodmFsdWUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50UmVmLnZhbHVlLFxuICAgICAgICB7IGdldCwgc2V0IH0gPSBwb3NGbi52YWx1ZVxuXG4gICAgICBsZXRcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICBwb3MgPSBnZXQoY29udGVudClcblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdmFsdWUgPCBwb3MgPyAtMSA6IDFcblxuICAgICAgcG9zICs9IGRpcmVjdGlvbiAqIDVcblxuICAgICAgaWYgKHBvcyA8IDApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gMFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIChkaXJlY3Rpb24gPT09IC0xICYmIHBvcyA8PSB2YWx1ZSlcbiAgICAgICAgfHwgKGRpcmVjdGlvbiA9PT0gMSAmJiBwb3MgPj0gdmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gdmFsdWVcbiAgICAgIH1cblxuICAgICAgc2V0KGNvbnRlbnQsIHBvcylcbiAgICAgIHVwZGF0ZUFycm93cygpXG5cbiAgICAgIHJldHVybiBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzUXVlcnlJbmNsdWRlZCAodGFyZ2V0UXVlcnksIG1hdGNoaW5nUXVlcnkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRhcmdldFF1ZXJ5KSB7XG4gICAgICAgIGlmICh0YXJnZXRRdWVyeVsga2V5IF0gIT09IG1hdGNoaW5nUXVlcnlbIGtleSBdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvLyAxLiBEbyBub3QgdXNlIGRpcmVjdGx5OyB1c2UgdmVyaWZ5Um91dGVNb2RlbCgpIGluc3RlYWRcbiAgICAvLyAyLiBTaG91bGQgc2V0IGhhZEFjdGl2YXRlZCB0byBmYWxzZSB1cG9uIGV4aXRcbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVSb3V0ZSAoKSB7XG4gICAgICBsZXQgbmFtZSA9IG51bGwsIGJlc3RTY29yZSA9IHsgbWF0Y2hlZExlbjogMCwgcXVlcnlEaWZmOiA5OTk5LCBocmVmTGVuOiAwIH1cblxuICAgICAgY29uc3QgbGlzdCA9IHRhYkRhdGFMaXN0LmZpbHRlcih0YWIgPT4gdGFiLnJvdXRlRGF0YT8uaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnN0IHsgaGFzaDogY3VycmVudEhhc2gsIHF1ZXJ5OiBjdXJyZW50UXVlcnkgfSA9IHByb3h5LiRyb3V0ZVxuICAgICAgY29uc3QgY3VycmVudFF1ZXJ5TGVuID0gT2JqZWN0LmtleXMoY3VycmVudFF1ZXJ5KS5sZW5ndGhcblxuICAgICAgLy8gVnVlIFJvdXRlciBkb2VzIG5vdCBrZWVwIGFjY291bnQgb2YgaGFzaCAmIHF1ZXJ5IHdoZW4gbWF0Y2hpbmdcbiAgICAgIC8vIHNvIHdlJ3JlIGRvaW5nIHRoaXMgYXMgd2VsbFxuXG4gICAgICBmb3IgKGNvbnN0IHRhYiBvZiBsaXN0KSB7XG4gICAgICAgIGNvbnN0IGV4YWN0ID0gdGFiLnJvdXRlRGF0YS5leGFjdC52YWx1ZSA9PT0gdHJ1ZVxuXG4gICAgICAgIGlmICh0YWIucm91dGVEYXRhWyBleGFjdCA9PT0gdHJ1ZSA/ICdsaW5rSXNFeGFjdEFjdGl2ZScgOiAnbGlua0lzQWN0aXZlJyBdLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaXQgY2Fubm90IG1hdGNoIGFueXRoaW5nIGFzIGl0J3Mgbm90IGFjdGl2ZSBub3IgZXhhY3QtYWN0aXZlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgaGFzaCwgcXVlcnksIG1hdGNoZWQsIGhyZWYgfSA9IHRhYi5yb3V0ZURhdGEucmVzb2x2ZWRMaW5rLnZhbHVlXG4gICAgICAgIGNvbnN0IHF1ZXJ5TGVuID0gT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aFxuXG4gICAgICAgIGlmIChleGFjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgaGFzaFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBxdWVyeUxlbiAhPT0gY3VycmVudFF1ZXJ5TGVuXG4gICAgICAgICAgICB8fCBoYXNRdWVyeUluY2x1ZGVkKGN1cnJlbnRRdWVyeSwgcXVlcnkpID09PSBmYWxzZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgcXVlcnlcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8geWV5LCB3ZSBmb3VuZCB0aGUgcGVyZmVjdCBtYXRjaCAocm91dGUgKyBoYXNoICsgcXVlcnkpXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNoICE9PSAnJyAmJiBoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgIC8vIGl0IGhhcyBoYXNoIGFuZCBpdCBkb2Vzbid0IG1hdGNoZXNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHF1ZXJ5TGVuICE9PSAwXG4gICAgICAgICAgJiYgaGFzUXVlcnlJbmNsdWRlZChxdWVyeSwgY3VycmVudFF1ZXJ5KSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gaXQgaGFzIHF1ZXJ5IGFuZCBpdCBkb2Vzbid0IGluY2x1ZGVzIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IHtcbiAgICAgICAgICBtYXRjaGVkTGVuOiBtYXRjaGVkLmxlbmd0aCxcbiAgICAgICAgICBxdWVyeURpZmY6IGN1cnJlbnRRdWVyeUxlbiAtIHF1ZXJ5TGVuLFxuICAgICAgICAgIGhyZWZMZW46IGhyZWYubGVuZ3RoIC0gaGFzaC5sZW5ndGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuID4gYmVzdFNjb3JlLm1hdGNoZWRMZW4pIHtcbiAgICAgICAgICAvLyBpdCBtYXRjaGVzIG1vcmUgcm91dGVzIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuICE9PSBiZXN0U2NvcmUubWF0Y2hlZExlbikge1xuICAgICAgICAgIC8vIGl0IG1hdGNoZXMgbGVzcyByb3V0ZXMgdGhhbiB0aGUgY3VycmVudCBjaGFtcGlvbiBzbyB3ZSBkaXNjYXJkIGl0XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5xdWVyeURpZmYgPCBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gcXVlcnkgaXMgY2xvc2VyIHRvIHRoZSBjdXJyZW50IG9uZSBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3U2NvcmUucXVlcnlEaWZmICE9PSBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gaXQgbWF0Y2hlcyBsZXNzIHJvdXRlcyB0aGFuIHRoZSBjdXJyZW50IGNoYW1waW9uIHNvIHdlIGRpc2NhcmQgaXRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLmhyZWZMZW4gPiBiZXN0U2NvcmUuaHJlZkxlbikge1xuICAgICAgICAgIC8vIGhyZWYgaXMgbGVuZ3RoaWVyIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBuYW1lID09PSBudWxsXG4gICAgICAgICYmIHRhYkRhdGFMaXN0LnNvbWUodGFiID0+IHRhYi5yb3V0ZURhdGEgPT09IHZvaWQgMCAmJiB0YWIubmFtZS52YWx1ZSA9PT0gY3VycmVudE1vZGVsLnZhbHVlKSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZG4ndCBpbnRlcmZlcmUgaWYgbm9uLXJvdXRlIHRhYiBpcyBhY3RpdmVcbiAgICAgICAgaGFkQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1vZGVsKHsgbmFtZSwgc2V0Q3VycmVudDogdHJ1ZSB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNpbiAoZSkge1xuICAgICAgcmVtb3ZlRm9jdXNUaW1lb3V0KClcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNGb2N1cy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiByb290UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIGUudGFyZ2V0XG4gICAgICAgICYmIHR5cGVvZiBlLnRhcmdldC5jbG9zZXN0ID09PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdGFiID0gZS50YXJnZXQuY2xvc2VzdCgnLnEtdGFiJylcblxuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGlzIGNvbnRhaW5lZCBieSBhIFFUYWIvUVJvdXRlVGFiXG4gICAgICAgIC8vIChpdCBtaWdodCBiZSBvdGhlciBlbGVtZW50cyBmb2N1c2VkLCBsaWtlIGFkZGl0aW9uYWwgUUJ0bilcbiAgICAgICAgaWYgKHRhYiAmJiByb290UmVmLnZhbHVlLmNvbnRhaW5zKHRhYikgPT09IHRydWUpIHtcbiAgICAgICAgICBoYXNGb2N1cy52YWx1ZSA9IHRydWVcbiAgICAgICAgICBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlICYmIHNjcm9sbFRvVGFiRWwodGFiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoKSB7XG4gICAgICByZWdpc3RlckZvY3VzVGltZW91dCgoKSA9PiB7IGhhc0ZvY3VzLnZhbHVlID0gZmFsc2UgfSwgMzApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Um91dGVNb2RlbCAoKSB7XG4gICAgICBpZiAoJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlZ2lzdGVyU2Nyb2xsVG9UYWJUaW1lb3V0KHVwZGF0ZUFjdGl2ZVJvdXRlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVNjcm9sbFRvVGFiVGltZW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2F0Y2hSb3V0ZSAoKSB7XG4gICAgICBpZiAodW53YXRjaFJvdXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgdW53YXRjaCA9IHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgdmVyaWZ5Um91dGVNb2RlbClcbiAgICAgICAgdW53YXRjaFJvdXRlID0gKCkgPT4ge1xuICAgICAgICAgIHVud2F0Y2goKVxuICAgICAgICAgIHVud2F0Y2hSb3V0ZSA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJUYWIgKHRhYkRhdGEpIHtcbiAgICAgIHRhYkRhdGFMaXN0LnB1c2godGFiRGF0YSlcbiAgICAgIHRhYkRhdGFMaXN0TGVuLnZhbHVlKytcblxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuXG4gICAgICAvLyBpZiBpdCdzIGEgUVRhYiBvciB3ZSBkb24ndCBoYXZlIFZ1ZSBSb3V0ZXJcbiAgICAgIGlmICh0YWJEYXRhLnJvdXRlRGF0YSA9PT0gdm9pZCAwIHx8IHByb3h5LiRyb3V0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZCBwb3NpdGlvbiB0byB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWIgKGlmIGFueSlcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxUb1RhYlRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRNb2RlbC52YWx1ZVxuICAgICAgICAgICAgY29uc3QgbmV3VGFiID0gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJydcbiAgICAgICAgICAgICAgPyB0YWJEYXRhTGlzdC5maW5kKHRhYiA9PiB0YWIubmFtZS52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgIDogbnVsbFxuXG4gICAgICAgICAgICBuZXdUYWIgJiYgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBlbHNlIGlmIGl0J3MgYSBRUm91dGVUYWIgd2l0aCBhIHZhbGlkIGxpbmtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBzdGFydCB3YXRjaGluZyByb3V0ZVxuICAgICAgICB3YXRjaFJvdXRlKClcblxuICAgICAgICBpZiAodGFiRGF0YS5yb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5yZWdpc3RlclRhYiAodGFiRGF0YSkge1xuICAgICAgdGFiRGF0YUxpc3Quc3BsaWNlKHRhYkRhdGFMaXN0LmluZGV4T2YodGFiRGF0YSksIDEpXG4gICAgICB0YWJEYXRhTGlzdExlbi52YWx1ZS0tXG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcblxuICAgICAgaWYgKHVud2F0Y2hSb3V0ZSAhPT0gdm9pZCAwICYmIHRhYkRhdGEucm91dGVEYXRhICE9PSB2b2lkIDApIHtcbiAgICAgICAgLy8gdW53YXRjaCByb3V0ZSBpZiB3ZSBkb24ndCBoYXZlIGFueSBRUm91dGVUYWJzIGxlZnRcbiAgICAgICAgaWYgKHRhYkRhdGFMaXN0LmV2ZXJ5KHRhYiA9PiB0YWIucm91dGVEYXRhID09PSB2b2lkIDApID09PSB0cnVlKSB7XG4gICAgICAgICAgdW53YXRjaFJvdXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZW4gdXBkYXRlIG1vZGVsXG4gICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0ICR0YWJzID0ge1xuICAgICAgY3VycmVudE1vZGVsLFxuICAgICAgdGFiUHJvcHMsXG4gICAgICBoYXNGb2N1cyxcbiAgICAgIGhhc0FjdGl2ZVRhYixcblxuICAgICAgcmVnaXN0ZXJUYWIsXG4gICAgICB1bnJlZ2lzdGVyVGFiLFxuXG4gICAgICB2ZXJpZnlSb3V0ZU1vZGVsLFxuICAgICAgdXBkYXRlTW9kZWwsXG4gICAgICBvbktiZE5hdmlnYXRlLFxuXG4gICAgICBhdm9pZFJvdXRlV2F0Y2hlcjogZmFsc2UgLy8gZmFsc2UgfCBzdHJpbmcgKHVpZClcbiAgICB9XG5cbiAgICBwcm92aWRlKHRhYnNLZXksICR0YWJzKVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBhbmltYXRlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgIHVud2F0Y2hSb3V0ZT8uKClcbiAgICB9XG5cbiAgICBsZXQgaGFkUm91dGVXYXRjaGVyLCBoYWRBY3RpdmF0ZWRcblxuICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBoYWRSb3V0ZVdhdGNoZXIgPSB1bndhdGNoUm91dGUgIT09IHZvaWQgMFxuICAgICAgY2xlYW51cCgpXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGlmIChoYWRSb3V0ZVdhdGNoZXIgPT09IHRydWUpIHtcbiAgICAgICAgd2F0Y2hSb3V0ZSgpXG4gICAgICAgIGhhZEFjdGl2YXRlZCA9IHRydWVcbiAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICB9XG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHJvbGU6ICd0YWJsaXN0JyxcbiAgICAgICAgb25Gb2N1c2luLFxuICAgICAgICBvbkZvY3Vzb3V0XG4gICAgICB9LCBbXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiB1cGRhdGVDb250YWluZXIgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogY29udGVudFJlZixcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBvblNjcm9sbDogdXBkYXRlQXJyb3dzXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSxcblxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYnNfX2Fycm93IHEtdGFic19fYXJyb3ctLWxlZnQgYWJzb2x1dGUgcS10YWJfX2ljb24nXG4gICAgICAgICAgICArIChsZWZ0QXJyb3cudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS10YWJzX19hcnJvdy0tZmFkZWQnKSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5sZWZ0SWNvbiB8fCAkcS5pY29uU2V0LnRhYnNbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0JyBdLFxuICAgICAgICAgIG9uTW91c2Vkb3duUGFzc2l2ZTogc2Nyb2xsVG9TdGFydCxcbiAgICAgICAgICBvblRvdWNoc3RhcnRQYXNzaXZlOiBzY3JvbGxUb1N0YXJ0LFxuICAgICAgICAgIG9uTW91c2V1cFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uTW91c2VsZWF2ZVBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uVG91Y2hlbmRQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbFxuICAgICAgICB9KSxcblxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYnNfX2Fycm93IHEtdGFic19fYXJyb3ctLXJpZ2h0IGFic29sdXRlIHEtdGFiX19pY29uJ1xuICAgICAgICAgICAgKyAocmlnaHRBcnJvdy52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLXRhYnNfX2Fycm93LS1mYWRlZCcpLFxuICAgICAgICAgIG5hbWU6IHByb3BzLnJpZ2h0SWNvbiB8fCAkcS5pY29uU2V0LnRhYnNbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2Rvd24nIDogJ3JpZ2h0JyBdLFxuICAgICAgICAgIG9uTW91c2Vkb3duUGFzc2l2ZTogc2Nyb2xsVG9FbmQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0UGFzc2l2ZTogc2Nyb2xsVG9FbmQsXG4gICAgICAgICAgb25Nb3VzZXVwUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Nb3VzZWxlYXZlUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Ub3VjaGVuZFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHVzZVBhbmVsQ2hpbGRQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBhbmVsL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiUGFuZWwnLFxuXG4gIHByb3BzOiB1c2VQYW5lbENoaWxkUHJvcHMsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWItcGFuZWwnLCByb2xlOiAndGFicGFuZWwnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQYW5lbCwgeyB1c2VQYW5lbFByb3BzLCB1c2VQYW5lbEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVscycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wc1xuICB9LFxuXG4gIGVtaXRzOiB1c2VQYW5lbEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3QgeyB1cGRhdGVQYW5lbHNMaXN0LCBnZXRQYW5lbENvbnRlbnQsIHBhbmVsRGlyZWN0aXZlcyB9ID0gdXNlUGFuZWwoKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10YWItcGFuZWxzIHEtcGFuZWwtcGFyZW50J1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYi1wYW5lbHMtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0KHNsb3RzKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgZ2V0UGFuZWxDb250ZW50KCksXG4gICAgICAgICdwYW4nLFxuICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICgpID0+IHBhbmVsRGlyZWN0aXZlcy52YWx1ZVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1mb3JtIEBzdWJtaXQucHJldmVudD1cImxvZ2luXCI+XHJcbiAgICA8cS1pbnB1dFxyXG4gICAgICB2LW1vZGVsPVwidXNlcm5hbWVcIlxyXG4gICAgICBsYWJlbD1cIlVzZXJuYW1lIG9yIEVtYWlsXCJcclxuICAgICAgZmlsbGVkXHJcbiAgICAgIDpkaXNhYmxlPVwibG9hZGluZ1wiXHJcbiAgICAvPlxyXG4gICAgPHEtaW5wdXRcclxuICAgICAgdi1tb2RlbD1cInBhc3N3b3JkXCJcclxuICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXHJcbiAgICAgIGZpbGxlZFxyXG4gICAgICA6ZGlzYWJsZT1cImxvYWRpbmdcIlxyXG4gICAgLz5cclxuXHJcbiAgICA8cS1idG5cclxuICAgICAgbGFiZWw9XCJMb2dpblwiXHJcbiAgICAgIHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXHJcbiAgICAvPlxyXG5cclxuICAgIDxkaXYgdi1pZj1cImVycm9yXCIgY2xhc3M9XCJ0ZXh0LW5lZ2F0aXZlIHEtbXQtbWRcIj57eyBlcnJvciB9fTwvZGl2PlxyXG4gIDwvcS1mb3JtPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQuanMnXHJcblxyXG5jb25zdCB1c2VybmFtZSA9IHJlZignJylcclxuY29uc3QgcGFzc3dvcmQgPSByZWYoJycpXHJcbmNvbnN0IGVycm9yICAgID0gcmVmKCcnKVxyXG5jb25zdCBsb2FkaW5nICA9IHJlZihmYWxzZSlcclxuXHJcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ2xvZ2luLXN1Y2Nlc3MnXSlcclxuXHJcbmNvbnN0IEFQSSA9IGltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFXHJcblxyXG4vLyDilIDilIDilIAgSGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbi8vIEFsbCByZXF1ZXN0cyB1c2UgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyBzbyBXUCBzZXNzaW9uIGNvb2tpZXMgYXJlIHNlbnQuXHJcbi8vIE5vIEF1dGhvcml6YXRpb24gaGVhZGVyLCBubyB0b2tlbiBzdG9yYWdlLlxyXG5mdW5jdGlvbiBhcGlGZXRjaChwYXRoLCBvcHRpb25zID0ge30pIHtcclxuICByZXR1cm4gZmV0Y2goYCR7QVBJfS93cC1qc29uLyR7cGF0aH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgLi4uKG9wdGlvbnMuaGVhZGVycyB8fCB7fSksXHJcbiAgICB9LFxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOKUgOKUgOKUgCBDYXJ0IG1lcmdlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuLy8gSWYgdGhlIGd1ZXN0IGhhZCBpdGVtcyBpbiB0aGVpciBjYXJ0IGJlZm9yZSBsb2dnaW5nIGluLCBtZXJnZSB0aGVtIGludG8gdGhlXHJcbi8vIG5vdy1hdXRoZW50aWNhdGVkIHNlc3Npb24gY2FydC5cclxuYXN5bmMgZnVuY3Rpb24gbWVyZ2VHdWVzdENhcnQoZ3Vlc3RJdGVtcykge1xyXG4gIGlmICghZ3Vlc3RJdGVtcz8ubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgLy8gQWZ0ZXIgd3Bfc2lnbm9uIHRoZSBzZXNzaW9uIGNvb2tpZSBpcyBzZXQsIHNvIHRoZSBzdG9yZSBBUEkgbm93IHNlZXMgdGhlXHJcbiAgLy8gbG9nZ2VkLWluIHVzZXIgYXV0b21hdGljYWxseSB2aWEgY3JlZGVudGlhbHM6ICdpbmNsdWRlJy5cclxuICBjb25zdCB1c2VyQ2FydCA9IGF3YWl0IGFwaUZldGNoKCd3Yy9zdG9yZS92MS9jYXJ0JykudGhlbihyID0+IHIuanNvbigpKVxyXG5cclxuICBpZiAodXNlckNhcnQuaXRlbXNfY291bnQgPiAwKSByZXR1cm4gLy8gdXNlciBhbHJlYWR5IGhhcyBpdGVtcyDigJQgZG9uJ3Qgb3ZlcndyaXRlXHJcblxyXG4gIGxldCBsYXN0UmVzcG9uc2UgPSBudWxsXHJcblxyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBndWVzdEl0ZW1zKSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGlGZXRjaCgnd2Mvc3RvcmUvdjEvY2FydC9hZGQtaXRlbScsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgaWQ6IGl0ZW0uaWQsIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5IH0pLFxyXG4gICAgfSlcclxuICAgIGxhc3RSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKClcclxuICB9XHJcblxyXG4gIGlmIChsYXN0UmVzcG9uc2UpIHtcclxuICAgIGNhcnQuc3RhdGUuaXRlbXMgICAgICAgPSBsYXN0UmVzcG9uc2UuaXRlbXMgICAgICAgfHwgW11cclxuICAgIGNhcnQuc3RhdGUuaXRlbXNfY291bnQgPSBsYXN0UmVzcG9uc2UuaXRlbXNfY291bnQgfHwgMFxyXG4gICAgY2FydC5zdGF0ZS50b3RhbHMgICAgICA9IGxhc3RSZXNwb25zZS50b3RhbHMgICAgICB8fCB7fVxyXG4gICAgY2FydC5zdGF0ZS5jb3Vwb25zICAgICA9IGxhc3RSZXNwb25zZS5jb3Vwb25zICAgICB8fCBbXVxyXG4gICAgY2FydC5zdGF0ZS5jYXJ0X2FycmF5ICA9IGxhc3RSZXNwb25zZSAgICAgICAgICAgICB8fCBbXVxyXG4gIH1cclxufVxyXG5cclxuLy8g4pSA4pSA4pSAIExvZ2luIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9naW4oKSB7XHJcbiAgZXJyb3IudmFsdWUgICA9ICcnXHJcbiAgbG9hZGluZy52YWx1ZSA9IHRydWVcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIDEuIFNuYXBzaG90IHRoZSBndWVzdCBjYXJ0IGJlZm9yZSBsb2dpbiBzbyB3ZSBjYW4gbWVyZ2UgaXQgYWZ0ZXJcclxuICAgIGNvbnN0IGd1ZXN0Q2FydCA9IGF3YWl0IGFwaUZldGNoKCd3Yy9zdG9yZS92MS9jYXJ0JykudGhlbihyID0+IHIuanNvbigpKVxyXG5cclxuICAgIC8vIDIuIENhbGwgb3VyIGN1c3RvbSBsb2dpbiBlbmRwb2ludFxyXG4gICAgY29uc3QgcmVzICA9IGF3YWl0IGFwaUZldGNoKCdxd29vL3YxL2xvZ2luJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZS52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmQudmFsdWUsXHJcbiAgICAgIH0pLFxyXG4gICAgfSkudGhlbihcclxuICAgICAgICBhcGlGZXRjaCgncXdvby92MS9kZWJ1ZycpLnRoZW4ociA9PiByLmpzb24oKSkudGhlbihjb25zb2xlLmxvZylcclxuXHJcbiAgICApXHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuXHJcbiAgICAvLyAzLiBIYW5kbGUgbG9naW4gZXJyb3JzIHJldHVybmVkIGZyb20gdGhlIGVuZHBvaW50XHJcbiAgICBpZiAoIWRhdGEuc3VjY2Vzcykge1xyXG4gICAgICBlcnJvci52YWx1ZSA9IGRhdGEubWVzc2FnZSB8fCAnTG9naW4gZmFpbGVkLiBQbGVhc2UgdHJ5IGFnYWluLidcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gU3RvcmUgdGhlIGNsZWFuIHVzZXIgb2JqZWN0IGluIHRoZSBjYXJ0IHN0b3JlXHJcbiAgICBjYXJ0LnN0YXRlLnVzZXIgPSBkYXRhLnVzZXJcclxuXHJcbiAgICAvLyA1LiBNZXJnZSBndWVzdCBjYXJ0IGludG8gdGhlIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBpZiBuZWVkZWRcclxuICAgIGF3YWl0IG1lcmdlR3Vlc3RDYXJ0KGd1ZXN0Q2FydC5pdGVtcylcclxuXHJcbiAgICAvLyA2LiBOb3RpZnkgcGFyZW50IOKAlCBwYXNzIHVzZXIgZGF0YSwgbm90IGEgdG9rZW5cclxuICAgIGVtaXQoJ2xvZ2luLXN1Y2Nlc3MnLCBkYXRhLnVzZXIpXHJcblxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignTG9naW4gZXJyb3I6JywgZXJyKVxyXG4gICAgZXJyb3IudmFsdWUgPSAnQSBzZXJ2ZXIgZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJ1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2VcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+IiwiaW1wb3J0IHsgaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2xpZGVUcmFuc2l0aW9uJyxcblxuICBwcm9wczoge1xuICAgIGFwcGVhcjogQm9vbGVhbixcbiAgICBkdXJhdGlvbjoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzaG93JywgJ2hpZGUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBsZXQgYW5pbWF0aW5nID0gZmFsc2UsIGRvbmVGbiwgZWxlbWVudFxuICAgIGxldCB0aW1lciA9IG51bGwsIHRpbWVyRmFsbGJhY2sgPSBudWxsLCBhbmltTGlzdGVuZXIsIGxhc3RFdmVudFxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBkb25lRm4/LigpXG4gICAgICBkb25lRm4gPSBudWxsXG4gICAgICBhbmltYXRpbmcgPSBmYWxzZVxuXG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWVyRmFsbGJhY2sgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyRmFsbGJhY2spXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICBhbmltTGlzdGVuZXIgPSBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmVnaW4gKGVsLCBoZWlnaHQsIGRvbmUpIHtcbiAgICAgIC8vIGhlcmUgb3ZlcmZsb3dZIGlzICdoaWRkZW4nXG4gICAgICBpZiAoaGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7IGhlaWdodCB9cHhgXG4gICAgICB9XG4gICAgICBlbC5zdHlsZS50cmFuc2l0aW9uID0gYGhlaWdodCAkeyBwcm9wcy5kdXJhdGlvbiB9bXMgY3ViaWMtYmV6aWVyKC4yNSwgLjgsIC41MCwgMSlgXG5cbiAgICAgIGFuaW1hdGluZyA9IHRydWVcbiAgICAgIGRvbmVGbiA9IGRvbmVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmQgKGVsLCBldmVudCkge1xuICAgICAgZWwuc3R5bGUub3ZlcmZsb3dZID0gbnVsbFxuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gbnVsbFxuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IG51bGxcbiAgICAgIGNsZWFudXAoKVxuICAgICAgZXZlbnQgIT09IGxhc3RFdmVudCAmJiBlbWl0KGV2ZW50KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRW50ZXIgKGVsLCBkb25lKSB7XG4gICAgICBsZXQgcG9zID0gMFxuICAgICAgZWxlbWVudCA9IGVsXG5cbiAgICAgIC8vIGlmIGFuaW1hdGlvbmcgb3ZlcmZsb3dZIGlzIGFscmVhZHkgJ2hpZGRlbidcbiAgICAgIGlmIChhbmltYXRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgY2xlYW51cCgpXG4gICAgICAgIHBvcyA9IGVsLm9mZnNldEhlaWdodCA9PT0gZWwuc2Nyb2xsSGVpZ2h0ID8gMCA6IHZvaWQgMFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxhc3RFdmVudCA9ICdoaWRlJ1xuICAgICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgfVxuXG4gICAgICBiZWdpbihlbCwgcG9zLCBkb25lKVxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7IGVsLnNjcm9sbEhlaWdodCB9cHhgXG4gICAgICAgIGFuaW1MaXN0ZW5lciA9IGV2dCA9PiB7XG4gICAgICAgICAgdGltZXJGYWxsYmFjayA9IG51bGxcblxuICAgICAgICAgIGlmIChPYmplY3QoZXZ0KSAhPT0gZXZ0IHx8IGV2dC50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgICBlbmQoZWwsICdzaG93JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFuaW1MaXN0ZW5lcilcbiAgICAgICAgdGltZXJGYWxsYmFjayA9IHNldFRpbWVvdXQoYW5pbUxpc3RlbmVyLCBwcm9wcy5kdXJhdGlvbiAqIDEuMSlcbiAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkxlYXZlIChlbCwgZG9uZSkge1xuICAgICAgbGV0IHBvc1xuICAgICAgZWxlbWVudCA9IGVsXG5cbiAgICAgIGlmIChhbmltYXRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgY2xlYW51cCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGFzdEV2ZW50ID0gJ3Nob3cnXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gc2V0IG92ZXJmbG93WSAnaGlkZGVuJyBiZWZvcmUgY2FsY3VsYXRpbmcgdGhlIGhlaWdodFxuICAgICAgICAvLyBvciBlbHNlIHdlIGdldCBzbWFsbCBkaWZmZXJlbmNlc1xuICAgICAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgICBwb3MgPSBlbC5zY3JvbGxIZWlnaHRcbiAgICAgIH1cblxuICAgICAgYmVnaW4oZWwsIHBvcywgZG9uZSlcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IDBcbiAgICAgICAgYW5pbUxpc3RlbmVyID0gZXZ0ID0+IHtcbiAgICAgICAgICB0aW1lckZhbGxiYWNrID0gbnVsbFxuXG4gICAgICAgICAgaWYgKE9iamVjdChldnQpICE9PSBldnQgfHwgZXZ0LnRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVuZChlbCwgJ2hpZGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gc2V0VGltZW91dChhbmltTGlzdGVuZXIsIHByb3BzLmR1cmF0aW9uICogMS4xKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBhbmltYXRpbmcgPT09IHRydWUgJiYgY2xlYW51cCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKFRyYW5zaXRpb24sIHtcbiAgICAgIGNzczogZmFsc2UsXG4gICAgICBhcHBlYXI6IHByb3BzLmFwcGVhcixcbiAgICAgIG9uRW50ZXIsXG4gICAgICBvbkxlYXZlXG4gICAgfSwgc2xvdHMuZGVmYXVsdClcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHNoYWxsb3dSZWFjdGl2ZSwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UsIHZTaG93LCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSXRlbSBmcm9tICcuLi9pdGVtL1FJdGVtLmpzJ1xuaW1wb3J0IFFJdGVtU2VjdGlvbiBmcm9tICcuLi9pdGVtL1FJdGVtU2VjdGlvbi5qcydcbmltcG9ydCBRSXRlbUxhYmVsIGZyb20gJy4uL2l0ZW0vUUl0ZW1MYWJlbC5qcydcbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTbGlkZVRyYW5zaXRpb24gZnJvbSAnLi4vc2xpZGUtdHJhbnNpdGlvbi9RU2xpZGVUcmFuc2l0aW9uLmpzJ1xuaW1wb3J0IFFTZXBhcmF0b3IgZnJvbSAnLi4vc2VwYXJhdG9yL1FTZXBhcmF0b3IuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlSWQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWlkL3VzZS1pZC5qcydcbmltcG9ydCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXJvdXRlci1saW5rL3VzZS1yb3V0ZXItbGluay5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkL3VpZC5qcydcblxuY29uc3QgaXRlbUdyb3VwcyA9IHNoYWxsb3dSZWFjdGl2ZSh7fSlcbmNvbnN0IExJTktfUFJPUFMgPSBPYmplY3Qua2V5cyh1c2VSb3V0ZXJMaW5rUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRXhwYW5zaW9uSXRlbScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG4gICAgLi4udXNlTW9kZWxUb2dnbGVQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGxhYmVsTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGNhcHRpb246IFN0cmluZyxcbiAgICBjYXB0aW9uTGluZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgdG9nZ2xlQXJpYUxhYmVsOiBTdHJpbmcsXG4gICAgZXhwYW5kSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZGVkSWNvbjogU3RyaW5nLFxuICAgIGV4cGFuZEljb25DbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBkdXJhdGlvbjoge30sXG5cbiAgICBoZWFkZXJJbnNldExldmVsOiBOdW1iZXIsXG4gICAgY29udGVudEluc2V0TGV2ZWw6IE51bWJlcixcblxuICAgIGV4cGFuZFNlcGFyYXRvcjogQm9vbGVhbixcbiAgICBkZWZhdWx0T3BlbmVkOiBCb29sZWFuLFxuICAgIGhpZGVFeHBhbmRJY29uOiBCb29sZWFuLFxuICAgIGV4cGFuZEljb25Ub2dnbGU6IEJvb2xlYW4sXG4gICAgc3dpdGNoVG9nZ2xlU2lkZTogQm9vbGVhbixcbiAgICBkZW5zZVRvZ2dsZTogQm9vbGVhbixcbiAgICBncm91cDogU3RyaW5nLFxuICAgIHBvcHVwOiBCb29sZWFuLFxuXG4gICAgaGVhZGVyU3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaGVhZGVyQ2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlRW1pdHMsXG4gICAgJ2NsaWNrJywgJ2FmdGVyU2hvdycsICdhZnRlckhpZGUnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbFxuICAgICAgICA/IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgOiBwcm9wcy5kZWZhdWx0T3BlbmVkXG4gICAgKVxuXG4gICAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHRhcmdldFVpZCA9IHVzZUlkKClcblxuICAgIGNvbnN0IHsgc2hvdywgaGlkZSwgdG9nZ2xlIH0gPSB1c2VNb2RlbFRvZ2dsZSh7IHNob3dpbmcgfSlcblxuICAgIGxldCB1bmlxdWVJZCwgZXhpdEdyb3VwXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWV4cGFuc2lvbi1pdGVtIHEtaXRlbS10eXBlJ1xuICAgICAgKyBgIHEtZXhwYW5zaW9uLWl0ZW0tLSR7IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCcgfWBcbiAgICAgICsgYCBxLWV4cGFuc2lvbi1pdGVtLS0keyBwcm9wcy5wb3B1cCA9PT0gdHJ1ZSA/ICdwb3B1cCcgOiAnc3RhbmRhcmQnIH1gXG4gICAgKVxuXG4gICAgY29uc3QgY29udGVudFN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmNvbnRlbnRJbnNldExldmVsID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAnUmlnaHQnIDogJ0xlZnQnXG4gICAgICByZXR1cm4ge1xuICAgICAgICBbICdwYWRkaW5nJyArIGRpciBdOiAocHJvcHMuY29udGVudEluc2V0TGV2ZWwgKiA1NikgKyAncHgnXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGhhc0xpbmsgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAoXG4gICAgICAgIHByb3BzLmhyZWYgIT09IHZvaWQgMFxuICAgICAgICB8fCAocHJvcHMudG8gIT09IHZvaWQgMCAmJiBwcm9wcy50byAhPT0gbnVsbCAmJiBwcm9wcy50byAhPT0gJycpXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgbGlua1Byb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cbiAgICAgIExJTktfUFJPUFMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBhY2NbIGtleSBdID0gcHJvcHNbIGtleSBdXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBoYXNMaW5rLnZhbHVlID09PSB0cnVlIHx8IHByb3BzLmV4cGFuZEljb25Ub2dnbGUgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBleHBhbnNpb25JY29uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZXhwYW5kZWRJY29uICE9PSB2b2lkIDAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmV4cGFuZGVkSWNvblxuICAgICAgICA6IHByb3BzLmV4cGFuZEljb24gfHwgJHEuaWNvblNldC5leHBhbnNpb25JdGVtWyBwcm9wcy5kZW5zZVRvZ2dsZSA9PT0gdHJ1ZSA/ICdkZW5zZUljb24nIDogJ2ljb24nIF1cbiAgICApKVxuXG4gICAgY29uc3QgYWN0aXZlVG9nZ2xlSWNvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIChoYXNMaW5rLnZhbHVlID09PSB0cnVlIHx8IHByb3BzLmV4cGFuZEljb25Ub2dnbGUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgaGVhZGVyU2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIGV4cGFuZGVkOiBzaG93aW5nLnZhbHVlID09PSB0cnVlLFxuICAgICAgZGV0YWlsc0lkOiB0YXJnZXRVaWQudmFsdWUsXG4gICAgICB0b2dnbGUsXG4gICAgICBzaG93LFxuICAgICAgaGlkZVxuICAgIH0pKVxuXG4gICAgY29uc3QgdG9nZ2xlQXJpYUF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdG9nZ2xlQXJpYUxhYmVsID0gcHJvcHMudG9nZ2xlQXJpYUxhYmVsICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy50b2dnbGVBcmlhTGFiZWxcbiAgICAgICAgOiAkcS5sYW5nLmxhYmVsWyBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ2NvbGxhcHNlJyA6ICdleHBhbmQnIF0ocHJvcHMubGFiZWwpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IHRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiB0b2dnbGVBcmlhTGFiZWxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZ3JvdXAsIG5hbWUgPT4ge1xuICAgICAgZXhpdEdyb3VwPy4oKVxuICAgICAgbmFtZSAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbkhlYWRlckNsaWNrIChlKSB7XG4gICAgICBoYXNMaW5rLnZhbHVlICE9PSB0cnVlICYmIHRvZ2dsZShlKVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUljb25LZXlib2FyZCAoZSkge1xuICAgICAgZS5rZXlDb2RlID09PSAxMyAmJiB0b2dnbGVJY29uKGUsIHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbiAoZSwga2V5Ym9hcmQpIHtcbiAgICAgIGlmIChrZXlib2FyZCAhPT0gdHJ1ZSAmJiBlLnFBdm9pZEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgIGJsdXJUYXJnZXRSZWYudmFsdWU/LmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgdG9nZ2xlKGUpXG4gICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2hvdyAoKSB7XG4gICAgICBlbWl0KCdhZnRlclNob3cnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uSGlkZSAoKSB7XG4gICAgICBlbWl0KCdhZnRlckhpZGUnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVudGVyR3JvdXAgKCkge1xuICAgICAgaWYgKHVuaXF1ZUlkID09PSB2b2lkIDApIHtcbiAgICAgICAgdW5pcXVlSWQgPSB1aWQoKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID0gdW5pcXVlSWRcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2hvdyA9IHdhdGNoKHNob3dpbmcsIHZhbCA9PiB7XG4gICAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID0gdW5pcXVlSWRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID09PSB1bmlxdWVJZCkge1xuICAgICAgICAgIGRlbGV0ZSBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGdyb3VwID0gd2F0Y2goXG4gICAgICAgICgpID0+IGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0sXG4gICAgICAgICh2YWwsIG9sZFZhbCkgPT4ge1xuICAgICAgICAgIGlmIChvbGRWYWwgPT09IHVuaXF1ZUlkICYmIHZhbCAhPT0gdm9pZCAwICYmIHZhbCAhPT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICAgIGhpZGUoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuXG4gICAgICBleGl0R3JvdXAgPSAoKSA9PiB7XG4gICAgICAgIHNob3coKVxuICAgICAgICBncm91cCgpXG5cbiAgICAgICAgaWYgKGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF0gPT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgZGVsZXRlIGl0ZW1Hcm91cHNbIHByb3BzLmdyb3VwIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGV4aXRHcm91cCA9IHZvaWQgMFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRvZ2dsZUljb24gKCkge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAncS1mb2N1c2FibGUgcmVsYXRpdmUtcG9zaXRpb24gY3Vyc29yLXBvaW50ZXInXG4gICAgICAgICAgICArIGAkeyBwcm9wcy5kZW5zZVRvZ2dsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlID8gJyBpdGVtcy1lbmQnIDogJycgfWAsXG4gICAgICAgICAgcHJvcHMuZXhwYW5kSWNvbkNsYXNzXG4gICAgICAgIF0sXG4gICAgICAgIHNpZGU6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgIT09IHRydWUsXG4gICAgICAgIGF2YXRhcjogcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWljb24nXG4gICAgICAgICAgICArIChwcm9wcy5leHBhbmRlZEljb24gPT09IHZvaWQgMCAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gJyBxLWV4cGFuc2lvbi1pdGVtX190b2dnbGUtaWNvbi0tcm90YXRlZCdcbiAgICAgICAgICAgICAgOiAnJyksXG4gICAgICAgICAgbmFtZTogZXhwYW5zaW9uSWNvbi52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBpZiAoYWN0aXZlVG9nZ2xlSWNvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgICAuLi50b2dnbGVBcmlhQXR0cnMudmFsdWUsXG4gICAgICAgICAgb25DbGljazogdG9nZ2xlSWNvbixcbiAgICAgICAgICBvbktleXVwOiB0b2dnbGVJY29uS2V5Ym9hcmRcbiAgICAgICAgfSlcblxuICAgICAgICBjaGlsZC51bnNoaWZ0KFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIHJlZjogYmx1clRhcmdldFJlZixcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWZvY3VzIHEtaWNvbiBxLWZvY3VzLWhlbHBlciBxLWZvY3VzLWhlbHBlci0tcm91bmRlZCcsXG4gICAgICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFJdGVtU2VjdGlvbiwgZGF0YSwgKCkgPT4gY2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyQ2hpbGQgKCkge1xuICAgICAgbGV0IGNoaWxkXG5cbiAgICAgIGlmIChzbG90cy5oZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZCA9IFtdLmNvbmNhdChzbG90cy5oZWFkZXIoaGVhZGVyU2xvdFNjb3BlLnZhbHVlKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjaGlsZCA9IFtcbiAgICAgICAgICBoKFFJdGVtU2VjdGlvbiwgKCkgPT4gW1xuICAgICAgICAgICAgaChRSXRlbUxhYmVsLCB7IGxpbmVzOiBwcm9wcy5sYWJlbExpbmVzIH0sICgpID0+IHByb3BzLmxhYmVsIHx8ICcnKSxcblxuICAgICAgICAgICAgcHJvcHMuY2FwdGlvblxuICAgICAgICAgICAgICA/IGgoUUl0ZW1MYWJlbCwgeyBsaW5lczogcHJvcHMuY2FwdGlvbkxpbmVzLCBjYXB0aW9uOiB0cnVlIH0sICgpID0+IHByb3BzLmNhcHRpb24pXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgIF0pXG4gICAgICAgIF1cblxuICAgICAgICBwcm9wcy5pY29uICYmIGNoaWxkWyBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlID8gJ3B1c2gnIDogJ3Vuc2hpZnQnIF0oXG4gICAgICAgICAgaChRSXRlbVNlY3Rpb24sIHtcbiAgICAgICAgICAgIHNpZGU6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUsXG4gICAgICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgIT09IHRydWVcbiAgICAgICAgICB9LCAoKSA9PiBoKFFJY29uLCB7IG5hbWU6IHByb3BzLmljb24gfSkpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMuaGlkZUV4cGFuZEljb24gIT09IHRydWUpIHtcbiAgICAgICAgY2hpbGRbIHByb3BzLnN3aXRjaFRvZ2dsZVNpZGUgPT09IHRydWUgPyAndW5zaGlmdCcgOiAncHVzaCcgXShcbiAgICAgICAgICBnZXRUb2dnbGVJY29uKClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXIgKCkge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcmVmOiAnaXRlbScsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5oZWFkZXJTdHlsZSxcbiAgICAgICAgY2xhc3M6IHByb3BzLmhlYWRlckNsYXNzLFxuICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWUsXG4gICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUsXG4gICAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgICAgaW5zZXRMZXZlbDogcHJvcHMuaGVhZGVySW5zZXRMZXZlbFxuICAgICAgfVxuXG4gICAgICBpZiAoaXNDbGlja2FibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZGF0YS5jbGlja2FibGUgPSB0cnVlXG4gICAgICAgIGRhdGEub25DbGljayA9IG9uSGVhZGVyQ2xpY2tcblxuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSA/IGxpbmtQcm9wcy52YWx1ZSA6IHRvZ2dsZUFyaWFBdHRycy52YWx1ZVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFJdGVtLCBkYXRhLCBnZXRIZWFkZXJDaGlsZClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uQ2hpbGQgKCkge1xuICAgICAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAga2V5OiAnZS1jb250ZW50JyxcbiAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2NvbnRlbnQgcmVsYXRpdmUtcG9zaXRpb24nLFxuICAgICAgICAgIHN0eWxlOiBjb250ZW50U3R5bGUudmFsdWUsXG4gICAgICAgICAgaWQ6IHRhcmdldFVpZC52YWx1ZVxuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSksXG4gICAgICAgIFsgW1xuICAgICAgICAgIHZTaG93LFxuICAgICAgICAgIHNob3dpbmcudmFsdWVcbiAgICAgICAgXSBdXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBub2RlID0gW1xuICAgICAgICBnZXRIZWFkZXIoKSxcblxuICAgICAgICBoKFFTbGlkZVRyYW5zaXRpb24sIHtcbiAgICAgICAgICBkdXJhdGlvbjogcHJvcHMuZHVyYXRpb24sXG4gICAgICAgICAgb25TaG93LFxuICAgICAgICAgIG9uSGlkZVxuICAgICAgICB9LCBnZXRUcmFuc2l0aW9uQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5leHBhbmRTZXBhcmF0b3IgPT09IHRydWUpIHtcbiAgICAgICAgbm9kZS5wdXNoKFxuICAgICAgICAgIGgoUVNlcGFyYXRvciwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXIgcS1leHBhbnNpb24taXRlbV9fYm9yZGVyLS10b3AgYWJzb2x1dGUtdG9wJyxcbiAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGgoUVNlcGFyYXRvciwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19ib3JkZXIgcS1leHBhbnNpb24taXRlbV9fYm9yZGVyLS1ib3R0b20gYWJzb2x1dGUtYm90dG9tJyxcbiAgICAgICAgICAgIGRhcms6IGlzRGFyay52YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBwcm9wcy5ncm91cCAhPT0gdm9pZCAwICYmIGVudGVyR3JvdXAoKVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGV4aXRHcm91cD8uKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgW1xuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX2NvbnRhaW5lciByZWxhdGl2ZS1wb3NpdGlvbicgfSwgZ2V0Q29udGVudCgpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxoMiBjbGFzcz1cInRleHQtaDRcIj5NeSBPcmRlcnM8L2gyPlxyXG5cclxuICAgIDxkaXYgdi1pZj1cIm9yZGVycyAmJiBvcmRlcnMubGVuZ3RoID4gMFwiPlxyXG4gICAgPHEtY2FyZCBkZW5zZT5cclxuICAgICAgPHEtZXhwYW5zaW9uLWl0ZW1cclxuICAgICAgICB2LWZvcj1cIm9yZGVyIGluIG9yZGVyc1wiXHJcbiAgICAgICAgOmtleT1cIm9yZGVyLmlkXCJcclxuICAgICAgICA6bGFiZWw9XCJgT3JkZXIgIyR7b3JkZXIubnVtYmVyfWBcIlxyXG4gICAgICAgIDpjYXB0aW9uPVwiYCR7b3JkZXIuZGF0ZV9jcmVhdGVkfSB8IFN0YXR1czogJHtvcmRlci5zdGF0dXN9YFwiXHJcbiAgICAgICAgOmljb249XCJtYXRTaG9wcGluZ0JhZ1wiXHJcbiAgICAgICAgOmV4cGFuZC1pY29uPVwibWF0S2V5Ym9hcmRBcnJvd0Rvd25cIlxyXG4gICAgICAgIGhlYWRlci1jbGFzcz1cInRleHQtcHJpbWFyeSB0ZXh0LWJvbGRcIlxyXG4gICAgICAgIGNsYXNzPVwicS1tYi1zbVwiXHJcbiAgICAgICAgZ3JvdXA9XCJzb21lZ3JvdXBcIlxyXG4gICAgICAgIGV4cGFuZC1zZXBhcmF0b3JcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXNtIHEtcGEtbWRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkyIHRleHQtZ3JleS03IHEtbWItc21cIj5cclxuICAgICAgICAgICAgVG90YWw6IHt7IG9yZGVyLnRvdGFsIH19IHt7IG9yZGVyLmN1cnJlbmN5IH19XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8cS10YWJsZVxyXG4gICAgICAgICAgICA6cm93cz1cIk9iamVjdC52YWx1ZXMob3JkZXIuaXRlbXMpXCJcclxuICAgICAgICAgICAgOmNvbHVtbnM9XCJjb2x1bW5zXCJcclxuICAgICAgICAgICAgcm93LWtleT1cIm5hbWVcIlxyXG4gICAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgICBmbGF0XHJcbiAgICAgICAgICAgIGJvcmRlcmVkXHJcbiAgICAgICAgICAgIGhpZGUtYm90dG9tXHJcbiAgICAgICAgICA+XHJcblxyXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC10aHVtYm5haWw9XCJwcm9wc1wiPlxyXG4gICAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XHJcbiAgICAgICAgICAgICAgICA8cS1pbWdcclxuICAgICAgICAgICAgICAgICAgOnNyYz1cInByb3BzLnJvdy50aHVtYm5haWxcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiA3MHB4OyBoZWlnaHQ6IDcwcHg7XCJcclxuICAgICAgICAgICAgICAgICAgc3Bpbm5lci1jb2xvcj1cImdyZXktNVwiXHJcbiAgICAgICAgICAgICAgICAgIHJhdGlvPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgIGZpdD1cImNvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3EtdGQ+XHJcbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XHJcbiAgICAgICAgICA8L3EtdGFibGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvcS1leHBhbnNpb24taXRlbT5cclxuICAgIDwvcS1jYXJkPlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiB2LWVsc2UtaWY9XCJvcmRlcnMgJiYgb3JkZXJzLmxlbmd0aCA9PT0gMFwiPk5vIG9yZGVycyB5ZXQuIDxyb3V0ZXItbGluayB0bz1cInByb2R1Y3RzXCI+ZXhwbG9yZSBvdXIgcHJvZHVjdHM8L3JvdXRlci1saW5rPiB0byBzdGFydCB5b3VyIGZpcnN0IG9yZGVyITwvZGl2PlxyXG4gICAgPGRpdiB2LWVsc2U+IDxxLXNwaW5uZXIgY29sb3I9XCJzZWNvbmRhcnlcIiBzaXplPVwiMmVtXCIgLz4gPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgbWF0U2hvcHBpbmdCYWcsIG1hdEtleWJvYXJkQXJyb3dEb3duIH0gZnJvbSAnQHF1YXNhci9leHRyYXMvbWF0ZXJpYWwtaWNvbnMnXHJcbmltcG9ydCB7IGZldGNoV2l0aFRva2VuIH0gZnJvbSAnc3JjL2NvbXBvc2FibGVzL3VzZUFwaUZldGNoLmpzJ1xyXG5cclxuXHJcbmNvbnN0IG9yZGVycyA9IHJlZihudWxsKVxyXG5jb25zdCBjb2x1bW5zID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICd0aHVtYm5haWwnLFxyXG4gICAgbGFiZWw6ICcnLFxyXG4gICAgYWxpZ246ICdsZWZ0JyxcclxuICAgIGZpZWxkOiAndGh1bWJuYWlsJyxcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICduYW1lJyxcclxuICAgIGxhYmVsOiAnUHJvZHVjdCcsXHJcbiAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgZmllbGQ6ICduYW1lJyxcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdxdWFudGl0eScsXHJcbiAgICBsYWJlbDogJ1F0eScsXHJcbiAgICBhbGlnbjogJ2NlbnRlcicsXHJcbiAgICBmaWVsZDogJ3F1YW50aXR5JyxcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICd0b3RhbCcsXHJcbiAgICBsYWJlbDogJ1RvdGFsICjigqopJyxcclxuICAgIGFsaWduOiAncmlnaHQnLFxyXG4gICAgZmllbGQ6ICd0b3RhbCcsXHJcbiAgfVxyXG5dXHJcblxyXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xyXG5jb25zdCByZXMgPSBhd2FpdCBmZXRjaFdpdGhUb2tlbihgJHtpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRX0vd3AtanNvbi93Yy9zdG9yZS92MS9teS1vcmRlcnNgKTtcclxuXHJcbm9yZGVycy52YWx1ZSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbmNvbnNvbGUubG9nKG9yZGVycyk7XHJcblxyXG59KVxyXG48L3NjcmlwdD5cclxuPHN0eWxlPlxyXG4ucS1leHBhbnNpb24taXRlbV9fY29udGFpbmVyLnJlbGF0aXZlLXBvc2l0aW9uIC5xLWljb24sXHJcbi5xLWV4cGFuc2lvbi1pdGVtX19jb250YWluZXIucmVsYXRpdmUtcG9zaXRpb24gLnEtaXRlbV9fbGFiZWwge1xyXG4gICAgZmlsbDogdmFyKC0tcS1zZWNvbmRhcnkpO1xyXG4gICAgY29sb3I6IHZhcigtLXEtc2Vjb25kYXJ5KTtcclxufVxyXG48L3N0eWxlPiIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGgxIGNsYXNzPVwidGV4dC1oNFwiPkFjY291bnQgRGV0YWlsczwvaDE+XHJcblxyXG4gICAgPCEtLSBMb2FkaW5nIHN0YXRlIC0tPlxyXG4gICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiPlxyXG4gICAgICA8cS1zcGlubmVyIGNvbG9yPVwic2Vjb25kYXJ5XCIgc2l6ZT1cIjJlbVwiIC8+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8IS0tIEVycm9yIGxvYWRpbmcgdXNlciAtLT5cclxuICAgIDxkaXYgdi1lbHNlLWlmPVwibG9hZEVycm9yXCIgY2xhc3M9XCJ0ZXh0LW5lZ2F0aXZlXCI+XHJcbiAgICAgIHt7IGxvYWRFcnJvciB9fVxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLSBBY2NvdW50IGZvcm0gLS0+XHJcbiAgICA8ZGl2IHYtZWxzZT5cclxuICAgICAgPHEtZm9ybSBAc3VibWl0LnByZXZlbnQ9XCJ1cGRhdGVEZXRhaWxzXCI+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHYtbW9kZWw9XCJhY2NvdW50LmZpcnN0X25hbWVcIlxyXG4gICAgICAgICAgbGFiZWw9XCJGaXJzdCBOYW1lXCJcclxuICAgICAgICAgIDpkaXNhYmxlPVwic2F2aW5nXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICB2LW1vZGVsPVwiYWNjb3VudC5sYXN0X25hbWVcIlxyXG4gICAgICAgICAgbGFiZWw9XCJMYXN0IE5hbWVcIlxyXG4gICAgICAgICAgOmRpc2FibGU9XCJzYXZpbmdcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPHEtaW5wdXRcclxuICAgICAgICAgIHYtbW9kZWw9XCJhY2NvdW50LmVtYWlsXCJcclxuICAgICAgICAgIGxhYmVsPVwiRW1haWxcIlxyXG4gICAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICAgIGRpc2FibGVcclxuICAgICAgICAgIHJlYWRvbmx5XHJcbiAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICB0eXBlPVwic3VibWl0XCJcclxuICAgICAgICAgIGxhYmVsPVwiU2F2ZSBDaGFuZ2VzXCJcclxuICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgIDpsb2FkaW5nPVwic2F2aW5nXCJcclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICA8IS0tIFNhdmUgZmVlZGJhY2sgLS0+XHJcbiAgICAgICAgPGRpdiB2LWlmPVwic2F2ZUVycm9yXCIgY2xhc3M9XCJ0ZXh0LW5lZ2F0aXZlIHEtbXQtbWRcIj57eyBzYXZlRXJyb3IgfX08L2Rpdj5cclxuICAgICAgICA8ZGl2IHYtaWY9XCJzYXZlU3VjY2Vzc1wiIGNsYXNzPVwidGV4dC1wb3NpdGl2ZSBxLW10LW1kXCI+UHJvZmlsZSB1cGRhdGVkIHN1Y2Nlc3NmdWxseS48L2Rpdj5cclxuICAgICAgPC9xLWZvcm0+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgZmV0Y2hXaXRoVG9rZW4gfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdXNlQXBpRmV0Y2gnXHJcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xyXG4gIHVzZXI6IHtcclxuICAgIHR5cGU6IE9iamVjdCxcclxuICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgYWNjb3VudCA9IHJlZih7XHJcbiAgZmlyc3RfbmFtZTogcHJvcHM/LnVzZXI/LmZpcnN0X25hbWUsXHJcbiAgbGFzdF9uYW1lOiAgcHJvcHM/LnVzZXI/Lmxhc3RfbmFtZSxcclxuICBlbWFpbDogICAgICBwcm9wcz8udXNlcj8uZW1haWwsXHJcbn0pXHJcblxyXG5jb25zdCBBUEkgPSBpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRVxyXG5cclxuY29uc3Qgc2F2aW5nICAgICA9IHJlZihmYWxzZSlcclxuY29uc3Qgc2F2ZUVycm9yICA9IHJlZignJylcclxuY29uc3Qgc2F2ZVN1Y2Nlc3MgPSByZWYoZmFsc2UpXHJcblxyXG5cclxuLy8g4pSA4pSA4pSAIFNhdmUgY2hhbmdlcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZURldGFpbHMoKSB7XHJcbiAgc2F2ZUVycm9yLnZhbHVlICAgPSAnJ1xyXG4gIHNhdmVTdWNjZXNzLnZhbHVlID0gZmFsc2VcclxuICBzYXZpbmcudmFsdWUgICAgICA9IHRydWVcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlcyAgPSBhd2FpdCBmZXRjaFdpdGhUb2tlbihgJHtBUEl9L3dwLWpzb24vcXdvby92MS9tZWAsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBmaXJzdF9uYW1lOiBhY2NvdW50LnZhbHVlLmZpcnN0X25hbWUsXHJcbiAgICAgICAgbGFzdF9uYW1lOiAgYWNjb3VudC52YWx1ZS5sYXN0X25hbWUsXHJcbiAgICAgIH0pLFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG5cclxuICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIHNhdmVFcnJvci52YWx1ZSA9IGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHNhdmUgY2hhbmdlcy4gUGxlYXNlIHRyeSBhZ2Fpbi4nXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIC8vIEtlZXAgbG9jYWwgc3RhdGUgaW4gc3luYyB3aXRoIHdoYXQgdGhlIHNlcnZlciBjb25maXJtZWRcclxuICAgIGFjY291bnQudmFsdWUgPSB7XHJcbiAgICAgIGZpcnN0X25hbWU6IGRhdGEudXNlci5maXJzdF9uYW1lLFxyXG4gICAgICBsYXN0X25hbWU6ICBkYXRhLnVzZXIubGFzdF9uYW1lLFxyXG4gICAgICBlbWFpbDogICAgICBkYXRhLnVzZXIuZW1haWwsXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVN1Y2Nlc3MudmFsdWUgPSB0cnVlXHJcblxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBhY2NvdW50OicsIGVycilcclxuICAgIHNhdmVFcnJvci52YWx1ZSA9ICdBIHNlcnZlciBlcnJvciBvY2N1cnJlZC4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nXHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHNhdmluZy52YWx1ZSA9IGZhbHNlXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PiIsIjwhLS0gQWNjb3VudFBhZ2UudnVlIC0tPlxyXG48dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPGgyPk15IGFjY291bnQ8L2gyPlxyXG5cclxuICAgICAgPCEtLSBDaGVja2luZyBzZXNzaW9uIG9uIG1vdW50IC0tPlxyXG4gICAgICA8ZGl2IHYtaWY9XCJzZXNzaW9uTG9hZGluZ1wiPlxyXG4gICAgICAgIDxxLXNwaW5uZXIgY29sb3I9XCJzZWNvbmRhcnlcIiBzaXplPVwiMmVtXCIgLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIE5vdCBsb2dnZWQgaW4gLS0+XHJcbiAgICAgIDxkaXYgdi1lbHNlLWlmPVwiIWlzTG9nZ2VkSW5cIj5cclxuICAgICAgICA8TG9naW5Gb3JtIEBsb2dpbi1zdWNjZXNzPVwib25Mb2dpblwiIC8+XHJcbiAgICAgICAgPGgzPk9SPC9oMz5cclxuICAgICAgICA8R29vZ2xlTG9naW5CdXR0b24gLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8IS0tIExvZ2dlZCBpbiAtLT5cclxuICAgICAgPGRpdiB2LWVsc2U+XHJcbiAgICAgICAgPHEtdGFic1xyXG4gICAgICAgICAgQHRvdWNoc3RhcnQuc3RvcFxyXG4gICAgICAgICAgQG1vdXNlZG93bi5zdG9wXHJcbiAgICAgICAgICA6cmlnaHQtaWNvbj1cIm1hdENoZXZyb25MZWZ0XCJcclxuICAgICAgICAgIDpsZWZ0LWljb249XCJtYXRDaGV2cm9uUmlnaHRcIlxyXG4gICAgICAgICAgdi1tb2RlbD1cInRhYlwiXHJcbiAgICAgICAgICBjbGFzcz1cInRleHQtc2Vjb25kYXJ5XCJcclxuICAgICAgICAgIGFjdGl2ZS1iZy1jb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICBhY3RpdmUtY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgIGFsaWduPVwianVzdGlmeVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHEtdGFiIG5hbWU9XCJkYXNoYm9hcmRcIiBsYWJlbD1cIkRhc2hib2FyZFwiIC8+XHJcbiAgICAgICAgICA8cS10YWIgbmFtZT1cIm9yZGVyc1wiICAgIGxhYmVsPVwiTXkgT3JkZXJzXCIgLz5cclxuICAgICAgICAgIDxxLXRhYiBuYW1lPVwiZGV0YWlsc1wiICAgbGFiZWw9XCJBY2NvdW50IERldGFpbHNcIiAvPlxyXG4gICAgICAgICAgPHEtdGFiIG5hbWU9XCJsb2dvdXRcIiAgICBsYWJlbD1cIkxvZ291dFwiIC8+XHJcbiAgICAgICAgPC9xLXRhYnM+XHJcblxyXG4gICAgICAgIDxxLXNlcGFyYXRvciAvPlxyXG5cclxuICAgICAgICA8cS10YWItcGFuZWxzIHYtbW9kZWw9XCJ0YWJcIiBhbmltYXRlZD5cclxuXHJcbiAgICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cImRhc2hib2FyZFwiPlxyXG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ0ZXh0LWg0XCI+RGFzaGJvYXJkPC9oMj5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwidXNlckRhdGFcIj5cclxuICAgICAgICAgICAgICBXZWxjb21lLCB7eyB1c2VyRGF0YS5maXJzdF9uYW1lIH19IHt7IHVzZXJEYXRhLmxhc3RfbmFtZSB9fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiB2LWVsc2U+XHJcbiAgICAgICAgICAgICAgPHEtc3Bpbm5lciBjb2xvcj1cInNlY29uZGFyeVwiIHNpemU9XCIyZW1cIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvcS10YWItcGFuZWw+XHJcblxyXG4gICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJvcmRlcnNcIj5cclxuICAgICAgICAgICAgPCEtLSBUT0RPOiB1cGRhdGUgT3JkZXJzU2VjdGlvbiB0byBkcm9wIHRoZSB0b2tlbiBwcm9wXHJcbiAgICAgICAgICAgICAgICAgb25jZSB0aGF0IGNvbXBvbmVudCBpcyBtaWdyYXRlZCB0byBjb29raWUgYXV0aCAtLT5cclxuICAgICAgICAgICAgPE9yZGVyc1NlY3Rpb24gLz5cclxuICAgICAgICAgIDwvcS10YWItcGFuZWw+XHJcblxyXG4gICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJkZXRhaWxzXCI+XHJcbiAgICAgICAgICAgIDxBY2NvdW50RGV0YWlscyB2LWlmPVwidXNlckRhdGFcIiA6dXNlcj1cInVzZXJEYXRhXCIgLz5cclxuICAgICAgICAgIDwvcS10YWItcGFuZWw+XHJcblxyXG4gICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJsb2dvdXRcIj5cclxuICAgICAgICAgICAgPHEtYnRuIEBjbGljaz1cImxvZ291dFwiIDpsb2FkaW5nPVwibG9nb3V0TG9hZGluZ1wiIGxhYmVsPVwiTG9nb3V0XCIgLz5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwibG9nb3V0RXJyb3JcIiBjbGFzcz1cInRleHQtbmVnYXRpdmUgcS1tdC1tZFwiPnt7IGxvZ291dEVycm9yIH19PC9kaXY+XHJcbiAgICAgICAgICA8L3EtdGFiLXBhbmVsPlxyXG5cclxuICAgICAgICA8L3EtdGFiLXBhbmVscz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgZmV0Y2hXaXRoVG9rZW4sIHNldExvZ2dlZEluIH0gZnJvbSAnc3JjL2NvbXBvc2FibGVzL3VzZUFwaUZldGNoLmpzJ1xyXG5pbXBvcnQgTG9naW5Gb3JtICAgICAgICAgIGZyb20gJ2NvbXBvbmVudHMvTG9naW5Gb3JtLnZ1ZSdcclxuaW1wb3J0IE9yZGVyc1NlY3Rpb24gICAgICBmcm9tICdjb21wb25lbnRzL09yZGVyc1NlY3Rpb24udnVlJ1xyXG5pbXBvcnQgQWNjb3VudERldGFpbHMgICAgIGZyb20gJ2NvbXBvbmVudHMvQWNjb3VudERldGFpbHMudnVlJ1xyXG5pbXBvcnQgR29vZ2xlTG9naW5CdXR0b24gIGZyb20gJ3NyYy9jb21wb25lbnRzL0dvb2dsZUxvZ2luQnV0dG9uLnZ1ZSdcclxuaW1wb3J0IGNhcnQgICAgICAgICAgICAgICBmcm9tICdzcmMvc3RvcmVzL2NhcnQuanMnXHJcbmltcG9ydCB7IG1hdENoZXZyb25MZWZ0LCBtYXRDaGV2cm9uUmlnaHQgfSBmcm9tICdAcXVhc2FyL2V4dHJhcy9tYXRlcmlhbC1pY29ucydcclxuXHJcbmNvbnN0IEFQSSA9IGltcG9ydC5tZXRhLmVudi5WSVRFX0FQSV9CQVNFXHJcblxyXG5jb25zdCB0YWIgICAgICAgICAgID0gcmVmKCdkYXNoYm9hcmQnKVxyXG5jb25zdCB1c2VyRGF0YSAgICAgID0gcmVmKG51bGwpXHJcbmNvbnN0IGlzTG9nZ2VkSW4gICAgPSByZWYoZmFsc2UpXHJcbmNvbnN0IHNlc3Npb25Mb2FkaW5nID0gcmVmKHRydWUpICAvLyB0cnVlIHdoaWxlIHdlIGNoZWNrIHRoZSBzZXNzaW9uIG9uIG1vdW50XHJcbmNvbnN0IGxvZ291dExvYWRpbmcgID0gcmVmKGZhbHNlKVxyXG5jb25zdCBsb2dvdXRFcnJvciAgICA9IHJlZignJylcclxuXHJcbi8vIOKUgOKUgOKUgCBDaGVjayBzZXNzaW9uIG9uIG1vdW50IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4vLyBXZSBjYW4ndCByZWx5IG9uIGxvY2FsU3RvcmFnZSBhbnltb3JlIOKAlCB0aGUgb25seSBzb3VyY2Ugb2YgdHJ1dGggaXMgd2hldGhlclxyXG4vLyB0aGUgV1Agc2Vzc2lvbiBjb29raWUgaXMgc3RpbGwgdmFsaWQuIEEgR0VUIC9xd29vL3YxL21lIGNhbGwgdGVsbHMgdXMgdGhhdC5cclxubGV0IHNlc3Npb25DaGVja2VkID0gZmFsc2U7XHJcbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XHJcbiAgaWYgKHNlc3Npb25DaGVja2VkKSByZXR1cm5cclxuICBzZXNzaW9uQ2hlY2tlZCA9IHRydWVcclxuICBjb25zb2xlLnRyYWNlKCdBY2NvdW50UGFnZSBvbk1vdW50ZWQgZmlyZWQnKVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hXaXRoVG9rZW4oYCR7QVBJfS93cC1qc29uL3F3b28vdjEvbWVgKVxyXG5cclxuICAgIGlmIChyZXMub2spIHtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuICAgICAgdXNlckRhdGEudmFsdWUgICA9IGRhdGEudXNlclxyXG4gICAgICBjYXJ0LnN0YXRlLnVzZXIgID0gZGF0YS51c2VyXHJcbiAgICAgIHNldExvZ2dlZEluKHRydWUpXHJcbiAgICAgIGlzTG9nZ2VkSW4udmFsdWUgPSB0cnVlXHJcbiAgICB9XHJcbiAgICAvLyA0MDEgbWVhbnMgbm8gYWN0aXZlIHNlc3Npb24g4oCUIHN0YXkgbG9nZ2VkIG91dCwgZmV0Y2hXaXRoVG9rZW5cclxuICAgIC8vIGhhbmRsZXMgdGhlIGF1dGgtZXhwaXJlZCBldmVudCBpZiBuZWVkZWRcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1Nlc3Npb24gY2hlY2sgZmFpbGVkOicsIGVycilcclxuICB9IGZpbmFsbHkge1xyXG4gICAgc2Vzc2lvbkxvYWRpbmcudmFsdWUgPSBmYWxzZVxyXG4gIH1cclxufSlcclxuXHJcbi8vIOKUgOKUgOKUgCBBZnRlciBsb2dpbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuLy8gTG9naW5Gb3JtIG5vdyBlbWl0cyB0aGUgdXNlciBvYmplY3QgZGlyZWN0bHkgKG5vdCBhIHRva2VuKVxyXG5cclxuZnVuY3Rpb24gb25Mb2dpbih1c2VyKSB7XHJcbiAgdXNlckRhdGEudmFsdWUgICA9IHVzZXJcclxuICBjYXJ0LnN0YXRlLnVzZXIgID0gdXNlclxyXG4gIHNldExvZ2dlZEluKHRydWUpXHJcbiAgaXNMb2dnZWRJbi52YWx1ZSA9IHRydWVcclxufVxyXG5cclxuLy8g4pSA4pSA4pSAIExvZ291dCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuLy8gTXVzdCBjYWxsIHRoZSBzZXJ2ZXIgdG8gZXhwaXJlIHRoZSBzZXNzaW9uIGNvb2tpZSDigJQgdGhlIGZyb250ZW5kXHJcbi8vIGNhbm5vdCBjbGVhciBhbiBIdHRwT25seSBjb29raWUgb24gaXRzIG93bi5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvZ291dCgpIHtcclxuICBsb2dvdXRFcnJvci52YWx1ZSAgID0gJydcclxuICBsb2dvdXRMb2FkaW5nLnZhbHVlID0gdHJ1ZVxyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZmV0Y2hXaXRoVG9rZW4oYCR7QVBJfS93cC1qc29uL3F3b28vdjEvbG9nb3V0YCwgeyBtZXRob2Q6ICdQT1NUJyB9KVxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcignTG9nb3V0IHJlcXVlc3QgZmFpbGVkOicsIGVycilcclxuICAgIGxvZ291dEVycm9yLnZhbHVlID0gJ0xvZ291dCBmYWlsZWQuIFBsZWFzZSB0cnkgYWdhaW4uJ1xyXG4gICAgcmV0dXJuXHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGxvZ291dExvYWRpbmcudmFsdWUgPSBmYWxzZVxyXG4gIH1cclxuXHJcbiAgLy8gQ2xlYXIgbG9jYWwgc3RhdGUgcmVnYXJkbGVzcyBvZiBzZXJ2ZXIgcmVzcG9uc2VcclxuICB1c2VyRGF0YS52YWx1ZSAgID0gbnVsbFxyXG4gIGlzTG9nZ2VkSW4udmFsdWUgPSBmYWxzZVxyXG4gIHNldExvZ2dlZEluKGZhbHNlKVxyXG4gIGNhcnQuY2xlYXIoKVxyXG4gIGNhcnQuc3RhdGUudXNlciAgPSB7fVxyXG59XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLyogcHVyZ2Vjc3Mgc3RhcnQgaWdub3JlICovXHJcbi5xLWZpZWxkX19sYWJlbCB7XHJcbiAgdHJhbnNpdGlvbjogMC4zcyBlYXNlO1xyXG59XHJcbi5xLWZpZWxkLS1mb2N1c2VkIC5xLWZpZWxkX19sYWJlbCxcclxuLnEtZmllbGQtLWZsb2F0IC5xLWZpZWxkX19sYWJlbCB7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxufVxyXG5kaXYucS10YWItcGFuZWxzIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG4vKiBwdXJnZWNzcyBlbmQgaWdub3JlICovXHJcbjwvc3R5bGU+Il0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX3RvRGlzcGxheVN0cmluZyIsInNob3ciLCJfaG9pc3RlZF8yIiwiX2hvaXN0ZWRfMyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl93aXRoQ3R4IiwiX2hvaXN0ZWRfNCIsIl9ob2lzdGVkXzUiLCJfb3BlbkJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7OztBQWFBLElBQUksS0FBSztBQUVGLE1BQU0sY0FBYyxDQUFFLFNBQVMsU0FBUztBQUV4QyxNQUFNLGNBQWM7QUFBQSxFQUN6QixNQUFNO0FBQUEsRUFDTixPQUFPLENBQUUsUUFBUSxNQUFNO0FBQUEsRUFFdkIsT0FBTyxDQUFFLFNBQVMsTUFBTTtBQUFBLEVBQ3hCLFdBQVc7QUFBQSxFQUVYLE1BQU07QUFBQSxJQUNKLE1BQU0sQ0FBRSxRQUFRLE1BQU07QUFBQSxJQUN0QixTQUFTLE1BQU0sS0FBTSxJQUFJO0FBQUEsRUFDN0I7QUFBQSxFQUVFLFFBQVE7QUFBQSxFQUVSLFVBQVUsQ0FBRSxRQUFRLE1BQU07QUFBQSxFQUMxQixTQUFTO0FBQUEsRUFFVCxjQUFjO0FBQUEsRUFFZCxRQUFRO0FBQUEsSUFDTixNQUFNLENBQUUsU0FBUyxNQUFNO0FBQUEsSUFDdkIsU0FBUztBQUFBLEVBQ2I7QUFDQTtBQUVlLFNBQUEsT0FBVSxPQUFPLE9BQU8sTUFBTSxXQUFXO0FBQ3RELFFBQU0sUUFBUSxPQUFPLFNBQVMsYUFBYTtBQUMzQyxNQUFJLFVBQVUsZUFBZTtBQUMzQixZQUFRLE1BQU0scURBQXFEO0FBQ25FLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxFQUFFLE1BQUssSUFBSyxtQkFBa0I7QUFFcEMsUUFBTSxnQkFBZ0IsSUFBSSxJQUFJO0FBQzlCLFFBQU0sVUFBVSxJQUFJLElBQUk7QUFDeEIsUUFBTSxrQkFBa0IsSUFBSSxJQUFJO0FBRWhDLFFBQU0sU0FBUyxTQUFTLE1BQ3RCLE1BQU0sWUFBWSxRQUFRLE1BQU0sV0FBVyxRQUN2QyxRQUNBLE9BQU87QUFBQSxJQUNQLEVBQUUsVUFBVSxDQUFFLElBQUksRUFBRSxHQUFJLE9BQU8sS0FBSTtBQUFBLElBQ25DLE1BQU0sV0FBVyxPQUFPLENBQUEsSUFBSyxNQUFNO0FBQUEsRUFDM0MsQ0FDRztBQUVELFFBQU0sV0FBVyxTQUFTLE1BQU0sTUFBTSxhQUFhLFVBQVUsTUFBTSxJQUFJO0FBRXZFLFFBQU0sVUFBVTtBQUFBLElBQVMsTUFDdkIsdUVBRUUsU0FBUyxVQUFVLE9BRWIsb0JBQ0csTUFBTSxTQUFTLE1BQU0sY0FBYyxNQUFNLE1BQU0sU0FBUyxNQUFNLGNBQWMsT0FDNUUsTUFBTSxTQUFTLE1BQU0sY0FBYyxTQUFVLE1BQU0sU0FBUyxNQUFNLFdBQVcsS0FBTSxPQUNuRixNQUFNLFNBQVMsTUFBTSxnQkFBZ0IsT0FBUSxNQUFNLFNBQVMsTUFBTSxhQUFhLEtBQU0sTUFFMUYsdUJBRUgsTUFBTSxRQUFRLE1BQU0sU0FBUyxNQUFNLFNBQVMsTUFBTSxnQkFBZ0IsUUFBUSxpQkFBaUIsT0FDM0YsTUFBTSxXQUFXLFFBQVEsTUFBTSxTQUFTLE1BQU0sV0FBVyxPQUFPLG9CQUFvQixPQUNwRixNQUFNLFlBQVksT0FBTyxjQUFjO0FBQUEsRUFFOUM7QUFFRSxRQUFNLGFBQWE7QUFBQSxJQUFTLE1BQzFCLDhGQUNHLE1BQU0sU0FBUyxNQUFNLGdCQUFnQixPQUFPLHVDQUF1QyxhQUNuRixNQUFNLGlCQUFpQixTQUFTLElBQUssTUFBTSxZQUFZLEtBQU07QUFBQSxFQUNwRTtBQUVFLFFBQU0sV0FBVyxTQUFTLE1BRXRCLE1BQU0sWUFBWSxRQUNmLE1BQU0sU0FBUyxVQUFVLFFBQ3hCLFNBQVMsVUFBVSxTQUFTLE1BQU0sYUFBYSxVQUFVLE9BRTNELEtBQ0EsTUFBTSxZQUFZLENBQ3ZCO0FBRUQsV0FBUyxRQUFTLEdBQUcsVUFBVTtBQUM3QixRQUFJLGFBQWEsUUFBUSxHQUFHLGdCQUFnQixNQUFNO0FBQ2hELG9CQUFjLE9BQU8sTUFBSztBQUFBLElBQzVCO0FBRUEsUUFBSSxNQUFNLFlBQVksTUFBTTtBQUsxQjtBQUFBLElBQ0Y7QUFHMEI7QUFDeEIsWUFBTSxZQUFZLEVBQUUsTUFBTSxNQUFNLEtBQUksQ0FBRTtBQUN0QyxXQUFLLFNBQVMsQ0FBQztBQUNmO0FBQUEsSUFDRjtBQUFBLEVBNENGO0FBRUEsV0FBUyxVQUFXLEdBQUc7QUFDckIsUUFBSSxVQUFVLEdBQUcsQ0FBRSxJQUFJLEVBQUUsQ0FBRSxHQUFHO0FBQzVCLGNBQVEsR0FBRyxJQUFJO0FBQUEsSUFDakIsV0FFRSxnQkFBZ0IsQ0FBQyxNQUFNLFFBQ3BCLEVBQUUsV0FBVyxNQUNiLEVBQUUsV0FBVyxNQUNiLEVBQUUsV0FBVyxRQUNiLEVBQUUsWUFBWSxNQUNqQjtBQUNBLFlBQU0sY0FBYyxFQUFFLFNBQVMsTUFBTSxHQUFHLE1BQU0sUUFBUSxlQUFlLENBQUM7QUFBQSxJQUN4RTtBQUVBLFNBQUssV0FBVyxDQUFDO0FBQUEsRUFDbkI7QUFFQSxXQUFTLGFBQWM7QUFDckIsVUFDRSxTQUFTLE1BQU0sU0FBUyxNQUFNLGlCQUM5QixVQUFVLENBQUEsR0FDVixZQUFZLEVBQUUsT0FBTztBQUFBLE1BQ25CLEtBQUs7QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNMO0FBQUEsUUFDQSxNQUFNLFNBQVMsTUFBTTtBQUFBLE1BQy9CO0FBQUEsSUFDQSxDQUFPO0FBRUgsVUFBTSxTQUFTLFVBQVUsUUFBUTtBQUFBLE1BQy9CLEVBQUUsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsTUFBTSxNQUFNO0FBQUEsTUFDcEIsQ0FBTztBQUFBLElBQ1A7QUFFSSxVQUFNLFVBQVUsVUFBVSxRQUFRO0FBQUEsTUFDaEMsRUFBRSxPQUFPLEVBQUUsT0FBTyxlQUFjLEdBQUksTUFBTSxLQUFLO0FBQUEsSUFDckQ7QUFFSSxVQUFNLFVBQVUsU0FBUyxRQUFRO0FBQUEsTUFDL0IsTUFBTSxjQUFjLFNBQ2hCLEVBQUUsT0FBTztBQUFBLFFBQ1QsT0FBTztBQUFBLFFBQ1AsT0FBTyxNQUFNLFVBQVUsT0FDbkIsTUFBTSxRQUNOO0FBQUEsUUFDSixNQUFNLE1BQU07QUFBQSxNQUN0QixDQUFTLElBQ0MsRUFBRSxPQUFPO0FBQUEsUUFDVCxPQUFPLGtCQUNGLE1BQU0sVUFBVSxPQUFPLFNBQVUsTUFBTSxLQUFLLEtBQU07QUFBQSxNQUNqRSxDQUFTO0FBQUEsSUFDVDtBQUVJLGVBQVcsUUFBUSxRQUFRLEtBQUssU0FBUztBQUV6QyxVQUFNLE9BQU87QUFBQSxNQUNYLEVBQUUsT0FBTyxFQUFFLE9BQU8sa0JBQWtCLFVBQVUsSUFBSSxLQUFLLGVBQWU7QUFBQSxNQUN0RSxFQUFFLE9BQU8sRUFBRSxPQUFPLFdBQVcsTUFBSyxHQUFJLFdBQVcsTUFBTSxTQUFTLE9BQU8sQ0FBQztBQUFBLElBQzlFO0FBRUksZUFBVyxTQUFTLEtBQUssS0FBSyxTQUFTO0FBRXZDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxVQUFVO0FBQUEsSUFDZCxNQUFNLFNBQVMsTUFBTSxNQUFNLElBQUk7QUFBQSxJQUMvQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUVFLGtCQUFnQixNQUFNO0FBQ3BCLFVBQU0sY0FBYyxPQUFPO0FBQUEsRUFDN0IsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFVBQU0sWUFBWSxPQUFPO0FBQUEsRUFDM0IsQ0FBQztBQUVELFdBQVMsVUFBVyxLQUFLLFlBQVk7QUFDbkMsVUFBTSxPQUFPO0FBQUEsTUFDWCxLQUFLO0FBQUEsTUFDTCxPQUFPLFFBQVE7QUFBQSxNQUNmLFVBQVUsU0FBUztBQUFBLE1BQ25CLE1BQU07QUFBQSxNQUNOLGlCQUFpQixTQUFTLFVBQVUsT0FBTyxTQUFTO0FBQUEsTUFDcEQsaUJBQWlCLE1BQU0sWUFBWSxPQUFPLFNBQVM7QUFBQSxNQUNuRDtBQUFBLE1BQ0E7QUFBQSxNQUNBLEdBQUc7QUFBQSxJQUNUO0FBRUksV0FBTztBQUFBLE1BQ0wsRUFBRSxLQUFLLE1BQU0sWUFBWTtBQUFBLE1BQ3pCLENBQUUsQ0FBRSxRQUFRLE9BQU8sS0FBSyxDQUFFO0FBQUEsSUFDaEM7QUFBQSxFQUNFO0FBRUEsU0FBTyxFQUFFLFdBQVcsTUFBSztBQUMzQjtBQ3RRQSxNQUFBLE9BQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLEVBRVAsT0FBTztBQUFBLEVBRVAsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLFVBQVMsSUFBSyxPQUFPLE9BQU8sT0FBTyxJQUFJO0FBQy9DLFdBQU8sTUFBTSxVQUFVLEtBQUs7QUFBQSxFQUM5QjtBQUNGLENBQUM7QUNGRCxTQUFTLGtCQUFtQixPQUFPLEtBQUssVUFBVTtBQUNoRCxRQUFNLE1BQU0sYUFBYSxPQUNyQixDQUFFLFFBQVEsT0FBTyxJQUNqQixDQUFFLE9BQU8sUUFBUTtBQUVyQixTQUFPLFlBQWEsUUFBUSxPQUFPLElBQUssQ0FBQyxJQUFLLElBQUssQ0FBQyxDQUFFLEdBQUssUUFBUSxTQUFVLEtBQUssS0FBTSxFQUFFO0FBQzVGO0FBRUEsTUFBTSxjQUFjLENBQUUsUUFBUSxVQUFVLFNBQVMsU0FBUztBQUUxRCxNQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsWUFBWSxDQUFFLFFBQVEsTUFBTTtBQUFBLElBRTVCLE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVcsT0FBSyxZQUFZLFNBQVMsQ0FBQztBQUFBLElBQzVDO0FBQUEsSUFDSSxZQUFZO0FBQUEsTUFDVixNQUFNLENBQUUsUUFBUSxNQUFNO0FBQUEsTUFDdEIsU0FBUztBQUFBLElBQ2Y7QUFBQSxJQUVJLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUVULGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUVYLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUVkLGlCQUFpQjtBQUFBLElBRWpCLGlCQUFpQjtBQUFBLElBQ2pCLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUVSLE9BQU87QUFBQSxJQUVQLGNBQWM7QUFBQSxJQUVkLHVCQUF1QixDQUFFLFVBQVUsS0FBSztBQUFBLEVBQzVDO0FBQUEsRUFFRSxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEVBQUUsTUFBSyxJQUFLLG1CQUFrQjtBQUNwQyxVQUFNLEVBQUUsR0FBRSxJQUFLO0FBRWYsVUFBTSxFQUFFLGNBQWMsbUJBQWtCLElBQUssUUFBTztBQUNwRCxVQUFNLEVBQUUsY0FBYyx5QkFBd0IsSUFBSyxRQUFPO0FBQzFELFVBQU0sRUFBRSxjQUFjLG9CQUFtQixJQUFLLFFBQU87QUFFckQsVUFBTSxFQUFFLGlCQUFpQixzQkFBc0IsZUFBZSxtQkFBa0IsSUFBSyxXQUFVO0FBQy9GLFVBQU0sRUFBRSxpQkFBaUIsNEJBQTRCLGVBQWUseUJBQXdCLElBQUssV0FBVTtBQUUzRyxVQUFNLFVBQVUsSUFBSSxJQUFJO0FBQ3hCLFVBQU0sYUFBYSxJQUFJLElBQUk7QUFFM0IsVUFBTSxlQUFlLElBQUksTUFBTSxVQUFVO0FBQ3pDLFVBQU0sYUFBYSxJQUFJLEtBQUs7QUFDNUIsVUFBTSxZQUFZLElBQUksSUFBSTtBQUMxQixVQUFNLGFBQWEsSUFBSSxLQUFLO0FBQzVCLFVBQU0sVUFBVSxJQUFJLEtBQUs7QUFFekIsVUFBTSxjQUFjLENBQUE7QUFDcEIsVUFBTSxpQkFBaUIsSUFBSSxDQUFDO0FBQzVCLFVBQU0sV0FBVyxJQUFJLEtBQUs7QUFFMUIsUUFBSSxlQUFlLE1BQU0sY0FBYyxNQUFNO0FBRTdDLFVBQU0sV0FBVyxTQUFTLE9BQU87QUFBQSxNQUMvQixhQUFhLE1BQU07QUFBQSxNQUNuQixhQUFhLE1BQU07QUFBQSxNQUNuQixlQUFlLE1BQU07QUFBQSxNQUNyQixnQkFBZ0I7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNkO0FBQUEsTUFDTSxpQkFBaUIsTUFBTTtBQUFBLE1BQ3ZCLGFBQWEsTUFBTTtBQUFBLE1BQ25CLFFBQVEsTUFBTTtBQUFBLElBQ3BCLEVBQU07QUFFRixVQUFNLGVBQWUsU0FBUyxNQUFNO0FBQ2xDLFlBQU0sTUFBTSxlQUFlO0FBQzNCLFlBQU0sTUFBTSxhQUFhO0FBRXpCLGVBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLFlBQUksWUFBYSxDQUFDLEVBQUcsS0FBSyxVQUFVLEtBQUs7QUFDdkMsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUVBLGFBQU87QUFBQSxJQUNULENBQUM7QUFFRCxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLFlBQU0sUUFBUSxXQUFXLFVBQVUsT0FDL0IsU0FDQyxRQUFRLFVBQVUsT0FBTyxZQUFZLE1BQU07QUFFaEQsYUFBTywwQkFBMkIsS0FBSztBQUFBLElBQ3pDLENBQUM7QUFFRCxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLDJDQUNlLFdBQVcsVUFBVSxPQUFPLEtBQUssNEJBQ2pDLE1BQU0sYUFBYSxPQUFPLGFBQWEsWUFBWSxvQkFDM0MsTUFBTSxrQkFBa0IsT0FBTyxZQUFZLFFBQVEsdUJBQ2hELE1BQU0saUJBQWlCLE9BQU8sS0FBSyxrQkFDMUQsTUFBTSxVQUFVLE9BQU8sbUJBQW1CLE9BQzFDLE1BQU0sV0FBVyxPQUFPLGdCQUFnQixPQUN4QyxNQUFNLFlBQVksT0FBTyxrQkFBa0I7QUFBQSxJQUNwRDtBQUVJLFVBQU0sYUFBYTtBQUFBLE1BQVMsTUFDMUIsMkdBQ0UsV0FBVyxTQUNWLE1BQU0saUJBQWlCLFNBQVMsSUFBSyxNQUFNLFlBQVksS0FBTTtBQUFBLElBQ3RFO0FBRUksVUFBTSxXQUFXLFNBQVMsTUFDeEIsTUFBTSxhQUFhLE9BQ2YsRUFBRSxXQUFXLFVBQVUsU0FBUyxnQkFBZ0IsUUFBUSxlQUFjLElBQ3RFLEVBQUUsV0FBVyxTQUFTLFNBQVMsZUFBZSxRQUFRLGNBQWEsQ0FDeEU7QUFFRCxVQUFNLFFBQVEsU0FBUyxNQUFNLE1BQU0sYUFBYSxRQUFRLEdBQUcsS0FBSyxRQUFRLElBQUk7QUFDNUUsVUFBTSxtQkFBbUIsU0FBUyxNQUFNLG9CQUFvQixTQUFTLE1BQU0sVUFBVSxJQUFJO0FBRXpGLFVBQU0sT0FBTyxZQUFZO0FBRXpCLFVBQU0sTUFBTSxNQUFNLFlBQVksVUFBUTtBQUNwQyxrQkFBWSxFQUFFLE1BQU0sWUFBWSxNQUFNLFVBQVUsS0FBSSxDQUFFO0FBQUEsSUFDeEQsQ0FBQztBQUVELFVBQU0sTUFBTSxNQUFNLGVBQWUsaUJBQWlCO0FBRWxELGFBQVMsWUFBYSxFQUFFLE1BQU0sWUFBWSxTQUFRLEdBQUk7QUFDcEQsVUFBSSxhQUFhLFVBQVUsS0FBTTtBQUVqQyxVQUFJLGFBQWEsUUFBUSxNQUFPLHFCQUFxQixNQUFPLFFBQVE7QUFDbEUsYUFBSyxxQkFBcUIsSUFBSTtBQUFBLE1BQ2hDO0FBRUEsVUFDRSxlQUFlLFFBQ1osTUFBTyxxQkFBcUIsTUFBTyxRQUN0QztBQUNBLGdCQUFRLGFBQWEsT0FBTyxJQUFJO0FBQ2hDLHFCQUFhLFFBQVE7QUFBQSxNQUN2QjtBQUFBLElBQ0Y7QUFFQSxhQUFTLG9CQUFxQjtBQUM1Qix5QkFBbUIsTUFBTTtBQUN2QixnQkFBUSxTQUFTLGdCQUFnQjtBQUFBLFVBQy9CLE9BQU8sUUFBUSxNQUFNO0FBQUEsVUFDckIsUUFBUSxRQUFRLE1BQU07QUFBQSxRQUNoQyxDQUFTO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsZ0JBQWlCLFNBQVM7QUFJakMsVUFBSSxTQUFTLFVBQVUsVUFBVSxXQUFXLFVBQVUsS0FBTTtBQUU1RCxZQUNFLE9BQU8sUUFBUyxTQUFTLE1BQU0sU0FBUyxHQUN4QyxhQUFhLEtBQUs7QUFBQSxRQUNoQixXQUFXLE1BQU8sU0FBUyxNQUFNLE1BQU07QUFBQSxRQUN2QyxNQUFNLFVBQVUsT0FBTztBQUFBLFVBQ3JCLFdBQVcsTUFBTTtBQUFBLFVBQ2pCLENBQUMsS0FBSyxPQUFPLE9BQU8sR0FBSSxTQUFTLE1BQU0sT0FBTyxLQUFNO0FBQUEsVUFDcEQ7QUFBQSxRQUNaO0FBQUEsTUFDQSxHQUNRLFNBQVMsT0FBTyxLQUFLLGFBQWE7QUFFcEMsaUJBQVcsUUFBUTtBQUduQixpQkFBVyxRQUFRLHlCQUF5QixZQUFZO0FBRXhELGNBQVEsUUFBUSxPQUFPLFNBQVMsTUFBTSxZQUFZLEVBQUU7QUFBQSxJQUN0RDtBQUVBLGFBQVMsUUFBUyxTQUFTLFNBQVM7QUFDbEMsWUFDRSxTQUFTLFlBQVksVUFBVSxZQUFZLFFBQVEsWUFBWSxLQUMzRCxZQUFZLEtBQUssU0FBTyxJQUFJLEtBQUssVUFBVSxPQUFPLElBQ2xELE1BQ0osU0FBUyxZQUFZLFVBQVUsWUFBWSxRQUFRLFlBQVksS0FDM0QsWUFBWSxLQUFLLFNBQU8sSUFBSSxLQUFLLFVBQVUsT0FBTyxJQUNsRDtBQUVOLFVBQUksaUJBQWlCLE1BQU07QUFJekIsdUJBQWU7QUFBQSxNQUNqQixXQUNTLFVBQVUsUUFBUTtBQUN6QixjQUNFLFFBQVEsT0FBTyxnQkFBZ0IsT0FDL0IsUUFBUSxPQUFPLGdCQUFnQjtBQUVqQyxZQUFJLGlCQUFpQixNQUFNO0FBQ3pCLHVCQUFhLFlBQVk7QUFDekIseUJBQWU7QUFBQSxRQUNqQjtBQUVBLGNBQU0sTUFBTSxhQUFhO0FBQ3pCLGNBQU0sTUFBTSxZQUFZO0FBQ3hCLGNBQU0sTUFBTSxhQUFhO0FBQ3pCLGNBQU0sTUFBTSxZQUFZO0FBRXhCLGNBQ0UsU0FBUyxNQUFNLHNCQUFxQixHQUNwQyxTQUFTLE1BQU0sc0JBQXFCO0FBRXRDLGNBQU0sTUFBTSxZQUFZLE1BQU0sYUFBYSxPQUN2QyxpQkFBa0IsT0FBTyxNQUFNLE9BQU8sR0FBRyxtQkFBcUIsT0FBTyxTQUFTLE9BQU8sU0FBUyxPQUFPLFNBQVMsQ0FBQyxRQUMvRyxlQUFnQixPQUFPLE9BQU8sT0FBTyxJQUFJLG1CQUFxQixPQUFPLFFBQVEsT0FBTyxRQUFRLE9BQU8sUUFBUSxDQUFDO0FBR2hILDRCQUFvQixNQUFNO0FBQ3hCLHlCQUFlLFdBQVcsTUFBTTtBQUM5QiwyQkFBZTtBQUNmLGtCQUFNLE1BQU0sYUFBYTtBQUN6QixrQkFBTSxNQUFNLFlBQVk7QUFBQSxVQUMxQixHQUFHLEVBQUU7QUFBQSxRQUNQLENBQUM7QUFBQSxNQUNIO0FBRUEsVUFBSSxVQUFVLFdBQVcsVUFBVSxNQUFNO0FBQ3ZDLHNCQUFjLE9BQU8sUUFBUSxLQUFLO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBRUEsYUFBUyxjQUFlLElBQUk7QUFDMUIsWUFDRSxFQUFFLE1BQU0sT0FBTyxLQUFLLE9BQU0sSUFBSyxXQUFXLE1BQU0sc0JBQXFCLEdBQ3JFLFNBQVMsR0FBRyxzQkFBcUI7QUFFbkMsVUFBSSxTQUFTLE1BQU0sYUFBYSxPQUFPLE9BQU8sTUFBTSxNQUFNLE9BQU8sT0FBTztBQUV4RSxVQUFJLFNBQVMsR0FBRztBQUNkLG1CQUFXLE1BQU8sTUFBTSxhQUFhLE9BQU8sY0FBYyxZQUFZLEtBQU0sS0FBSyxNQUFNLE1BQU07QUFDN0YscUJBQVk7QUFDWjtBQUFBLE1BQ0Y7QUFFQSxnQkFBVSxNQUFNLGFBQWEsT0FBTyxPQUFPLFNBQVMsU0FBUyxPQUFPLFFBQVE7QUFDNUUsVUFBSSxTQUFTLEdBQUc7QUFDZCxtQkFBVyxNQUFPLE1BQU0sYUFBYSxPQUFPLGNBQWMsWUFBWSxLQUFNLEtBQUssS0FBSyxNQUFNO0FBQzVGLHFCQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFFQSxhQUFTLGVBQWdCO0FBQ3ZCLFlBQU0sVUFBVSxXQUFXO0FBQzNCLFVBQUksWUFBWSxLQUFNO0FBRXRCLFlBQ0UsT0FBTyxRQUFRLHNCQUFxQixHQUNwQyxNQUFNLE1BQU0sYUFBYSxPQUFPLFFBQVEsWUFBWSxLQUFLLElBQUksUUFBUSxVQUFVO0FBRWpGLFVBQUksTUFBTSxVQUFVLE1BQU07QUFDeEIsa0JBQVUsUUFBUSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssSUFBSSxRQUFRLGNBQWM7QUFDdEUsbUJBQVcsUUFBUSxNQUFNO0FBQUEsTUFDM0IsT0FDSztBQUNILGtCQUFVLFFBQVEsTUFBTTtBQUN4QixtQkFBVyxRQUFRLE1BQU0sYUFBYSxPQUNsQyxLQUFLLEtBQUssTUFBTSxLQUFLLE1BQU0sSUFBSSxRQUFRLGVBQ3ZDLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxJQUFJLFFBQVE7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFFQSxhQUFTLGFBQWMsT0FBTztBQUM1QixzQkFBZ0IsUUFBUSxjQUFjLFdBQVc7QUFDakQsb0JBQWMsWUFBWSxNQUFNO0FBQzlCLFlBQUksY0FBYyxLQUFLLE1BQU0sTUFBTTtBQUNqQyx5QkFBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRixHQUFHLENBQUM7QUFBQSxJQUNOO0FBRUEsYUFBUyxnQkFBaUI7QUFDeEIsbUJBQWEsaUJBQWlCLFVBQVUsT0FBTyxPQUFPLG1CQUFtQixDQUFDO0FBQUEsSUFDNUU7QUFFQSxhQUFTLGNBQWU7QUFDdEIsbUJBQWEsaUJBQWlCLFVBQVUsT0FBTyxJQUFJLE9BQU8sZ0JBQWdCO0FBQUEsSUFDNUU7QUFFQSxhQUFTLGlCQUFrQjtBQUN6QixVQUFJLGdCQUFnQixNQUFNO0FBQ3hCLHNCQUFjLFdBQVc7QUFDekIsc0JBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFFQSxhQUFTLGNBQWUsU0FBUyxRQUFRO0FBQ3ZDLFlBQU0sT0FBTyxNQUFNLFVBQVUsT0FBTztBQUFBLFFBQ2xDLFdBQVcsTUFBTTtBQUFBLFFBQ2pCLFFBQU0sT0FBTyxVQUFXLEdBQUcsV0FBVyxHQUFHLFFBQVEsb0JBQW9CLE1BQU07QUFBQSxNQUNuRjtBQUVNLFlBQU0sTUFBTSxLQUFLO0FBQ2pCLFVBQUksUUFBUSxFQUFHO0FBRWYsVUFBSSxZQUFZLElBQUk7QUFDbEIsc0JBQWMsS0FBTSxDQUFDLENBQUU7QUFDdkIsYUFBTSxDQUFDLEVBQUcsTUFBSztBQUNmLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxZQUFZLElBQUk7QUFDbEIsc0JBQWMsS0FBTSxNQUFNLENBQUMsQ0FBRTtBQUM3QixhQUFNLE1BQU0sQ0FBQyxFQUFHLE1BQUs7QUFDckIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFVBQVUsYUFBYSxNQUFNLGFBQWEsT0FBTyxLQUFtQjtBQUMxRSxZQUFNLFVBQVUsYUFBYSxNQUFNLGFBQWEsT0FBTyxLQUFxQjtBQUU1RSxZQUFNLE1BQU0sWUFBWSxPQUFPLEtBQU0sWUFBWSxPQUFPLElBQUk7QUFFNUQsVUFBSSxRQUFRLFFBQVE7QUFDbEIsY0FBTSxTQUFTLE1BQU0sVUFBVSxPQUFPLEtBQUs7QUFDM0MsY0FBTSxRQUFRLEtBQUssUUFBUSxNQUFNLElBQUksTUFBTTtBQUUzQyxZQUFJLFNBQVMsS0FBSyxRQUFRLEtBQUs7QUFDN0Isd0JBQWMsS0FBTSxLQUFLLENBQUU7QUFDM0IsZUFBTSxLQUFLLEVBQUcsTUFBTSxFQUFFLGVBQWUsS0FBSSxDQUFFO0FBQUEsUUFDN0M7QUFFQSxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFLQSxVQUFNLFFBQVEsU0FBUyxNQUNyQixpQkFBaUIsVUFBVSxPQUN2QixFQUFFLEtBQUssYUFBVyxLQUFLLElBQUksUUFBUSxVQUFVLEdBQUcsS0FBSyxDQUFDLFNBQVMsUUFBUTtBQUFFLGNBQVEsYUFBYSxDQUFDO0FBQUEsSUFBSSxFQUFDLElBRWxHLE1BQU0sYUFBYSxPQUNmLEVBQUUsS0FBSyxhQUFXLFFBQVEsV0FBVyxLQUFLLENBQUMsU0FBUyxRQUFRO0FBQUUsY0FBUSxZQUFZO0FBQUEsSUFBSSxFQUFDLElBQ3ZGLEVBQUUsS0FBSyxhQUFXLFFBQVEsWUFBWSxLQUFLLENBQUMsU0FBUyxRQUFRO0FBQUUsY0FBUSxhQUFhO0FBQUEsSUFBSSxFQUFDLENBRXBHO0FBRUQsYUFBUyxjQUFlLE9BQU87QUFDN0IsWUFDRSxVQUFVLFdBQVcsT0FDckIsRUFBRSxLQUFLLElBQUcsSUFBSyxNQUFNO0FBRXZCLFVBQ0UsT0FBTyxPQUNQLE1BQU0sSUFBSSxPQUFPO0FBRW5CLFlBQU0sWUFBWSxRQUFRLE1BQU0sS0FBSztBQUVyQyxhQUFPLFlBQVk7QUFFbkIsVUFBSSxNQUFNLEdBQUc7QUFDWCxlQUFPO0FBQ1AsY0FBTTtBQUFBLE1BQ1IsV0FFRyxjQUFjLE1BQU0sT0FBTyxTQUN4QixjQUFjLEtBQUssT0FBTyxPQUM5QjtBQUNBLGVBQU87QUFDUCxjQUFNO0FBQUEsTUFDUjtBQUVBLFVBQUksU0FBUyxHQUFHO0FBQ2hCLG1CQUFZO0FBRVosYUFBTztBQUFBLElBQ1Q7QUFFQSxhQUFTLGlCQUFrQixhQUFhLGVBQWU7QUFDckQsaUJBQVcsT0FBTyxhQUFhO0FBQzdCLFlBQUksWUFBYSxHQUFHLE1BQU8sY0FBZSxHQUFHLEdBQUk7QUFDL0MsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBSUEsYUFBUyxvQkFBcUI7QUFDNUIsVUFBSSxPQUFPLE1BQU0sWUFBWSxFQUFFLFlBQVksR0FBRyxXQUFXLE1BQU0sU0FBUyxFQUFDO0FBRXpFLFlBQU0sT0FBTyxZQUFZLE9BQU8sU0FBTyxJQUFJLFdBQVcsY0FBYyxVQUFVLElBQUk7QUFDbEYsWUFBTSxFQUFFLE1BQU0sYUFBYSxPQUFPLGFBQVksSUFBSyxNQUFNO0FBQ3pELFlBQU0sa0JBQWtCLE9BQU8sS0FBSyxZQUFZLEVBQUU7QUFLbEQsaUJBQVcsT0FBTyxNQUFNO0FBQ3RCLGNBQU0sUUFBUSxJQUFJLFVBQVUsTUFBTSxVQUFVO0FBRTVDLFlBQUksSUFBSSxVQUFXLFVBQVUsT0FBTyxzQkFBc0IsY0FBYyxFQUFHLFVBQVUsTUFBTTtBQUV6RjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLEVBQUUsTUFBTSxPQUFPLFNBQVMsS0FBSSxJQUFLLElBQUksVUFBVSxhQUFhO0FBQ2xFLGNBQU0sV0FBVyxPQUFPLEtBQUssS0FBSyxFQUFFO0FBRXBDLFlBQUksVUFBVSxNQUFNO0FBQ2xCLGNBQUksU0FBUyxhQUFhO0FBRXhCO0FBQUEsVUFDRjtBQUVBLGNBQ0UsYUFBYSxtQkFDVixpQkFBaUIsY0FBYyxLQUFLLE1BQU0sT0FDN0M7QUFFQTtBQUFBLFVBQ0Y7QUFHQSxpQkFBTyxJQUFJLEtBQUs7QUFDaEI7QUFBQSxRQUNGO0FBRUEsWUFBSSxTQUFTLE1BQU0sU0FBUyxhQUFhO0FBRXZDO0FBQUEsUUFDRjtBQUVBLFlBQ0UsYUFBYSxLQUNWLGlCQUFpQixPQUFPLFlBQVksTUFBTSxPQUM3QztBQUVBO0FBQUEsUUFDRjtBQUVBLGNBQU0sV0FBVztBQUFBLFVBQ2YsWUFBWSxRQUFRO0FBQUEsVUFDcEIsV0FBVyxrQkFBa0I7QUFBQSxVQUM3QixTQUFTLEtBQUssU0FBUyxLQUFLO0FBQUEsUUFDdEM7QUFFUSxZQUFJLFNBQVMsYUFBYSxVQUFVLFlBQVk7QUFFOUMsaUJBQU8sSUFBSSxLQUFLO0FBQ2hCLHNCQUFZO0FBQ1o7QUFBQSxRQUNGLFdBQ1MsU0FBUyxlQUFlLFVBQVUsWUFBWTtBQUVyRDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFNBQVMsWUFBWSxVQUFVLFdBQVc7QUFFNUMsaUJBQU8sSUFBSSxLQUFLO0FBQ2hCLHNCQUFZO0FBQUEsUUFDZCxXQUNTLFNBQVMsY0FBYyxVQUFVLFdBQVc7QUFFbkQ7QUFBQSxRQUNGO0FBRUEsWUFBSSxTQUFTLFVBQVUsVUFBVSxTQUFTO0FBRXhDLGlCQUFPLElBQUksS0FBSztBQUNoQixzQkFBWTtBQUFBLFFBQ2Q7QUFBQSxNQUNGO0FBRUEsVUFDRSxTQUFTLFFBQ04sWUFBWSxLQUFLLFNBQU8sSUFBSSxjQUFjLFVBQVUsSUFBSSxLQUFLLFVBQVUsYUFBYSxLQUFLLE1BQU0sTUFDbEc7QUFFQSx1QkFBZTtBQUNmO0FBQUEsTUFDRjtBQUVBLGtCQUFZLEVBQUUsTUFBTSxZQUFZLEtBQUksQ0FBRTtBQUFBLElBQ3hDO0FBRUEsYUFBUyxVQUFXLEdBQUc7QUFDckIseUJBQWtCO0FBRWxCLFVBQ0UsU0FBUyxVQUFVLFFBQ2hCLFFBQVEsVUFBVSxRQUNsQixFQUFFLFVBQ0YsT0FBTyxFQUFFLE9BQU8sWUFBWSxZQUMvQjtBQUNBLGNBQU0sTUFBTSxFQUFFLE9BQU8sUUFBUSxRQUFRO0FBSXJDLFlBQUksT0FBTyxRQUFRLE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTTtBQUMvQyxtQkFBUyxRQUFRO0FBQ2pCLHFCQUFXLFVBQVUsUUFBUSxjQUFjLEdBQUc7QUFBQSxRQUNoRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsYUFBUyxhQUFjO0FBQ3JCLDJCQUFxQixNQUFNO0FBQUUsaUJBQVMsUUFBUTtBQUFBLE1BQU0sR0FBRyxFQUFFO0FBQUEsSUFDM0Q7QUFFQSxhQUFTLG1CQUFvQjtBQUMzQixVQUFJLE1BQU0sc0JBQXNCLE9BQU87QUFDckMsbUNBQTJCLGlCQUFpQjtBQUFBLE1BQzlDLE9BQ0s7QUFDSCxpQ0FBd0I7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFFQSxhQUFTLGFBQWM7QUFDckIsVUFBSSxpQkFBaUIsUUFBUTtBQUMzQixjQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sT0FBTyxVQUFVLGdCQUFnQjtBQUNuRSx1QkFBZSxNQUFNO0FBQ25CLGtCQUFPO0FBQ1AseUJBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsYUFBUyxZQUFhLFNBQVM7QUFDN0Isa0JBQVksS0FBSyxPQUFPO0FBQ3hCLHFCQUFlO0FBRWYsd0JBQWlCO0FBR2pCLFVBQUksUUFBUSxjQUFjLFVBQVUsTUFBTSxXQUFXLFFBQVE7QUFFM0QsbUNBQTJCLE1BQU07QUFDL0IsY0FBSSxXQUFXLFVBQVUsTUFBTTtBQUM3QixrQkFBTSxRQUFRLGFBQWE7QUFDM0Isa0JBQU0sU0FBUyxVQUFVLFVBQVUsVUFBVSxRQUFRLFVBQVUsS0FDM0QsWUFBWSxLQUFLLFNBQU8sSUFBSSxLQUFLLFVBQVUsS0FBSyxJQUNoRDtBQUVKLHNCQUFVLGNBQWMsT0FBTyxRQUFRLEtBQUs7QUFBQSxVQUM5QztBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsT0FFSztBQUVILG1CQUFVO0FBRVYsWUFBSSxRQUFRLFVBQVUsY0FBYyxVQUFVLE1BQU07QUFDbEQsMkJBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLGFBQVMsY0FBZSxTQUFTO0FBQy9CLGtCQUFZLE9BQU8sWUFBWSxRQUFRLE9BQU8sR0FBRyxDQUFDO0FBQ2xELHFCQUFlO0FBRWYsd0JBQWlCO0FBRWpCLFVBQUksaUJBQWlCLFVBQVUsUUFBUSxjQUFjLFFBQVE7QUFFM0QsWUFBSSxZQUFZLE1BQU0sU0FBTyxJQUFJLGNBQWMsTUFBTSxNQUFNLE1BQU07QUFDL0QsdUJBQVk7QUFBQSxRQUNkO0FBR0EseUJBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxRQUFRO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BRUE7QUFBQSxNQUNBO0FBQUEsTUFFQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFFQSxtQkFBbUI7QUFBQTtBQUFBLElBQ3pCO0FBRUksWUFBUSxTQUFTLEtBQUs7QUFFdEIsYUFBUyxVQUFXO0FBQ2xCLHVCQUFpQixRQUFRLGFBQWEsWUFBWTtBQUNsRCxxQkFBYztBQUNkLHFCQUFZO0FBQUEsSUFDZDtBQUVBLFFBQUksaUJBQWlCO0FBRXJCLG9CQUFnQixPQUFPO0FBRXZCLGtCQUFjLE1BQU07QUFDbEIsd0JBQWtCLGlCQUFpQjtBQUNuQyxjQUFPO0FBQUEsSUFDVCxDQUFDO0FBRUQsZ0JBQVksTUFBTTtBQUNoQixVQUFJLG9CQUFvQixNQUFNO0FBQzVCLG1CQUFVO0FBQ1YsdUJBQWU7QUFDZix5QkFBZ0I7QUFBQSxNQUNsQjtBQUVBLHdCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFFRCxXQUFPLE1BQU07QUFDWCxhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsS0FBSztBQUFBLFFBQ0wsT0FBTyxRQUFRO0FBQUEsUUFDZixNQUFNO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxNQUNSLEdBQVM7QUFBQSxRQUNELEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxnQkFBZSxDQUFFO0FBQUEsUUFFaEQsRUFBRSxPQUFPO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxPQUFPLFdBQVc7QUFBQSxVQUNsQixVQUFVO0FBQUEsUUFDcEIsR0FBVyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsUUFFdkIsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPLDREQUNGLFVBQVUsVUFBVSxPQUFPLEtBQUs7QUFBQSxVQUNyQyxNQUFNLE1BQU0sWUFBWSxHQUFHLFFBQVEsS0FBTSxNQUFNLGFBQWEsT0FBTyxPQUFPLE1BQU07QUFBQSxVQUNoRixvQkFBb0I7QUFBQSxVQUNwQixxQkFBcUI7QUFBQSxVQUNyQixrQkFBa0I7QUFBQSxVQUNsQixxQkFBcUI7QUFBQSxVQUNyQixtQkFBbUI7QUFBQSxRQUM3QixDQUFTO0FBQUEsUUFFRCxFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU8sNkRBQ0YsV0FBVyxVQUFVLE9BQU8sS0FBSztBQUFBLFVBQ3RDLE1BQU0sTUFBTSxhQUFhLEdBQUcsUUFBUSxLQUFNLE1BQU0sYUFBYSxPQUFPLFNBQVMsT0FBTztBQUFBLFVBQ3BGLG9CQUFvQjtBQUFBLFVBQ3BCLHFCQUFxQjtBQUFBLFVBQ3JCLGtCQUFrQjtBQUFBLFVBQ2xCLHFCQUFxQjtBQUFBLFVBQ3JCLG1CQUFtQjtBQUFBLFFBQzdCLENBQVM7QUFBQSxNQUNULENBQU87QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGLENBQUM7QUNqckJELE1BQUEsWUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsRUFFUCxNQUFPLEdBQUcsRUFBRSxTQUFTO0FBQ25CLFdBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLGVBQWUsTUFBTSxXQUFVLEdBQUksTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3hGO0FBQ0YsQ0FBQztBQ1BELE1BQUEsYUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsRUFDUDtBQUFBLEVBRUUsT0FBTztBQUFBLEVBRVAsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEtBQUssbUJBQWtCO0FBQzdCLFVBQU0sU0FBUyxRQUFRLE9BQU8sR0FBRyxNQUFNLEVBQUU7QUFFekMsVUFBTSxFQUFFLGtCQUFrQixpQkFBaUIsZ0JBQWUsSUFBSyxTQUFRO0FBRXZFLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsaUNBQ0csT0FBTyxVQUFVLE9BQU8sK0JBQStCO0FBQUEsSUFDaEU7QUFFSSxXQUFPLE1BQU07QUFDWCx1QkFBaUIsS0FBSztBQUV0QixhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsRUFBRSxPQUFPLFFBQVEsTUFBSztBQUFBLFFBQ3RCLGdCQUFlO0FBQUEsUUFDZjtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ04sTUFBTSxnQkFBZ0I7QUFBQSxNQUM5QjtBQUFBLElBQ0k7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7Ozs7O0FDWEQsVUFBTSxXQUFXLElBQUksRUFBRTtBQUN2QixVQUFNLFdBQVcsSUFBSSxFQUFFO0FBQ3ZCLFVBQU0sUUFBVyxJQUFJLEVBQUU7QUFDdkIsVUFBTSxVQUFXLElBQUksS0FBSztBQUUxQixVQUFNLE9BQU87QUFFYixVQUFNLE1BQU07QUFNWixhQUFTLFNBQVMsTUFBTSxVQUFVLElBQUk7QUFDcEMsYUFBTyxNQUFNLEdBQUcsR0FBRyxZQUFZLElBQUksSUFBSTtBQUFBLFFBQ3JDLEdBQUc7QUFBQSxRQUNILGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFVBQ2hCLEdBQUksUUFBUSxXQUFXLENBQUE7QUFBQSxRQUFDO0FBQUEsTUFDMUIsQ0FDRDtBQUFBLElBQ0g7QUFNQSxtQkFBZSxlQUFlLFlBQVk7QUFDeEMsVUFBSSxDQUFDLFlBQVksT0FBUTtBQUl6QixZQUFNLFdBQVcsTUFBTSxTQUFTLGtCQUFrQixFQUFFLEtBQUssQ0FBQSxNQUFLLEVBQUUsTUFBTTtBQUV0RSxVQUFJLFNBQVMsY0FBYyxFQUFHO0FBRTlCLFVBQUksZUFBZTtBQUVuQixpQkFBVyxRQUFRLFlBQVk7QUFDN0IsY0FBTSxNQUFNLE1BQU0sU0FBUyw2QkFBNkI7QUFBQSxVQUN0RCxRQUFRO0FBQUEsVUFDUixNQUFNLEtBQUssVUFBVSxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVUsS0FBSyxTQUFBLENBQVU7QUFBQSxRQUFBLENBQzlEO0FBQ0QsdUJBQWUsTUFBTSxJQUFJLEtBQUE7QUFBQSxNQUMzQjtBQUVBLFVBQUksY0FBYztBQUNoQixhQUFLLE1BQU0sUUFBYyxhQUFhLFNBQWUsQ0FBQTtBQUNyRCxhQUFLLE1BQU0sY0FBYyxhQUFhLGVBQWU7QUFDckQsYUFBSyxNQUFNLFNBQWMsYUFBYSxVQUFlLENBQUE7QUFDckQsYUFBSyxNQUFNLFVBQWMsYUFBYSxXQUFlLENBQUE7QUFDckQsYUFBSyxNQUFNLGFBQWMsZ0JBQTRCLENBQUE7QUFBQSxNQUN2RDtBQUFBLElBQ0Y7QUFJQSxtQkFBZSxRQUFRO0FBQ3JCLFlBQU0sUUFBVTtBQUNoQixjQUFRLFFBQVE7QUFFaEIsVUFBSTtBQUVGLGNBQU0sWUFBWSxNQUFNLFNBQVMsa0JBQWtCLEVBQUUsS0FBSyxDQUFBLE1BQUssRUFBRSxNQUFNO0FBR3ZFLGNBQU0sTUFBTyxNQUFNLFNBQVMsaUJBQWlCO0FBQUEsVUFDM0MsUUFBUTtBQUFBLFVBQ1IsTUFBTSxLQUFLLFVBQVU7QUFBQSxZQUNuQixVQUFVLFNBQVM7QUFBQSxZQUNuQixVQUFVLFNBQVM7QUFBQSxVQUFBLENBQ3BCO0FBQUEsUUFBQSxDQUNGLEVBQUU7QUFBQSxVQUNDLFNBQVMsZUFBZSxFQUFFLEtBQUssQ0FBQSxNQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssUUFBUSxHQUFHO0FBQUEsUUFBQTtBQUlsRSxjQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUE7QUFHdkIsWUFBSSxDQUFDLEtBQUssU0FBUztBQUNqQixnQkFBTSxRQUFRLEtBQUssV0FBVztBQUM5QjtBQUFBLFFBQ0Y7QUFHQSxhQUFLLE1BQU0sT0FBTyxLQUFLO0FBR3ZCLGNBQU0sZUFBZSxVQUFVLEtBQUs7QUFHcEMsYUFBSyxpQkFBaUIsS0FBSyxJQUFJO0FBQUEsTUFFakMsU0FBUyxLQUFLO0FBQ1osZ0JBQVEsTUFBTSxnQkFBZ0IsR0FBRztBQUNqQyxjQUFNLFFBQVE7QUFBQSxNQUNoQixVQUFBO0FBQ0UsZ0JBQVEsUUFBUTtBQUFBLE1BQ2xCO0FBQUEsSUFDRjs7Ozs7Ozs7OztFQTdHc0IsT0FBTTs7O3NCQXRCMUJBLFlBdUJTLE9BQUE7QUFBQSxJQXZCQSx3QkFBZ0IsT0FBQSxPQUFLLENBQUEsU0FBQSxDQUFBO0FBQUEsRUFBQTtxQkFDNUIsTUFLRTtBQUFBLE1BTEZDLFlBS0UsUUFBQTtBQUFBLG9CQUpTLE9BQUE7QUFBQSxxRUFBQSxPQUFBLFdBQVE7QUFBQSxRQUNqQixPQUFNO0FBQUEsUUFDTixRQUFBO0FBQUEsUUFDQyxTQUFTLE9BQUE7QUFBQSxNQUFBO01BRVpBLFlBTUUsUUFBQTtBQUFBLG9CQUxTLE9BQUE7QUFBQSxxRUFBQSxPQUFBLFdBQVE7QUFBQSxRQUNqQixNQUFLO0FBQUEsUUFDTCxPQUFNO0FBQUEsUUFDTixRQUFBO0FBQUEsUUFDQyxTQUFTLE9BQUE7QUFBQSxNQUFBO01BR1pBLFlBS0UsTUFBQTtBQUFBLFFBSkEsT0FBTTtBQUFBLFFBQ04sTUFBSztBQUFBLFFBQ0wsT0FBTTtBQUFBLFFBQ0wsU0FBUyxPQUFBO0FBQUEsTUFBQTtNQUdELE9BQUEsc0JBQVhDLG1CQUFpRSxPQUFqRUMsY0FBaUVDLGdCQUFkLE9BQUEsS0FBSyxHQUFBLENBQUE7Ozs7OztBQ25CNUQsTUFBQSxtQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUVFLE9BQU8sQ0FBRSxRQUFRLE1BQU07QUFBQSxFQUV2QixNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixRQUFJLFlBQVksT0FBTyxRQUFRO0FBQy9CLFFBQUksUUFBUSxNQUFNLGdCQUFnQixNQUFNLGNBQWM7QUFFdEQsYUFBUyxVQUFXO0FBQ2xCLGVBQU07QUFDTixlQUFTO0FBQ1Qsa0JBQVk7QUFFWixVQUFJLFVBQVUsTUFBTTtBQUNsQixxQkFBYSxLQUFLO0FBQ2xCLGdCQUFRO0FBQUEsTUFDVjtBQUVBLFVBQUksa0JBQWtCLE1BQU07QUFDMUIscUJBQWEsYUFBYTtBQUMxQix3QkFBZ0I7QUFBQSxNQUNsQjtBQUVBLGVBQVMsb0JBQW9CLGlCQUFpQixZQUFZO0FBQzFELHFCQUFlO0FBQUEsSUFDakI7QUFFQSxhQUFTLE1BQU8sSUFBSSxRQUFRLE1BQU07QUFFaEMsVUFBSSxXQUFXLFFBQVE7QUFDckIsV0FBRyxNQUFNLFNBQVMsR0FBSSxNQUFNO0FBQUEsTUFDOUI7QUFDQSxTQUFHLE1BQU0sYUFBYSxVQUFXLE1BQU07QUFFdkMsa0JBQVk7QUFDWixlQUFTO0FBQUEsSUFDWDtBQUVBLGFBQVMsSUFBSyxJQUFJLE9BQU87QUFDdkIsU0FBRyxNQUFNLFlBQVk7QUFDckIsU0FBRyxNQUFNLFNBQVM7QUFDbEIsU0FBRyxNQUFNLGFBQWE7QUFDdEIsY0FBTztBQUNQLGdCQUFVLGFBQWEsS0FBSyxLQUFLO0FBQUEsSUFDbkM7QUFFQSxhQUFTLFFBQVMsSUFBSSxNQUFNO0FBQzFCLFVBQUksTUFBTTtBQUNWLGdCQUFVO0FBR1YsVUFBSSxjQUFjLE1BQU07QUFDdEIsZ0JBQU87QUFDUCxjQUFNLEdBQUcsaUJBQWlCLEdBQUcsZUFBZSxJQUFJO0FBQUEsTUFDbEQsT0FDSztBQUNILG9CQUFZO0FBQ1osV0FBRyxNQUFNLFlBQVk7QUFBQSxNQUN2QjtBQUVBLFlBQU0sSUFBSSxLQUFLLElBQUk7QUFFbkIsY0FBUSxXQUFXLE1BQU07QUFDdkIsZ0JBQVE7QUFDUixXQUFHLE1BQU0sU0FBUyxHQUFJLEdBQUcsWUFBWTtBQUNyQyx1QkFBZSxTQUFPO0FBQ3BCLDBCQUFnQjtBQUVoQixjQUFJLE9BQU8sR0FBRyxNQUFNLE9BQU8sSUFBSSxXQUFXLElBQUk7QUFDNUMsZ0JBQUksSUFBSSxNQUFNO0FBQUEsVUFDaEI7QUFBQSxRQUNGO0FBQ0EsV0FBRyxpQkFBaUIsaUJBQWlCLFlBQVk7QUFDakQsd0JBQWdCLFdBQVcsY0FBYyxNQUFNLFdBQVcsR0FBRztBQUFBLE1BQy9ELEdBQUcsR0FBRztBQUFBLElBQ1I7QUFFQSxhQUFTLFFBQVMsSUFBSSxNQUFNO0FBQzFCLFVBQUk7QUFDSixnQkFBVTtBQUVWLFVBQUksY0FBYyxNQUFNO0FBQ3RCLGdCQUFPO0FBQUEsTUFDVCxPQUNLO0FBQ0gsb0JBQVk7QUFHWixXQUFHLE1BQU0sWUFBWTtBQUNyQixjQUFNLEdBQUc7QUFBQSxNQUNYO0FBRUEsWUFBTSxJQUFJLEtBQUssSUFBSTtBQUVuQixjQUFRLFdBQVcsTUFBTTtBQUN2QixnQkFBUTtBQUNSLFdBQUcsTUFBTSxTQUFTO0FBQ2xCLHVCQUFlLFNBQU87QUFDcEIsMEJBQWdCO0FBRWhCLGNBQUksT0FBTyxHQUFHLE1BQU0sT0FBTyxJQUFJLFdBQVcsSUFBSTtBQUM1QyxnQkFBSSxJQUFJLE1BQU07QUFBQSxVQUNoQjtBQUFBLFFBQ0Y7QUFDQSxXQUFHLGlCQUFpQixpQkFBaUIsWUFBWTtBQUNqRCx3QkFBZ0IsV0FBVyxjQUFjLE1BQU0sV0FBVyxHQUFHO0FBQUEsTUFDL0QsR0FBRyxHQUFHO0FBQUEsSUFDUjtBQUVBLG9CQUFnQixNQUFNO0FBQ3BCLG9CQUFjLFFBQVEsUUFBTztBQUFBLElBQy9CLENBQUM7QUFFRCxXQUFPLE1BQU0sRUFBRSxZQUFZO0FBQUEsTUFDekIsS0FBSztBQUFBLE1BQ0wsUUFBUSxNQUFNO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxJQUNOLEdBQU8sTUFBTSxPQUFPO0FBQUEsRUFDbEI7QUFDRixDQUFDO0FDbEhELE1BQU0sYUFBYSxnQkFBZ0IsQ0FBQSxDQUFFO0FBQ3JDLE1BQU0sYUFBYSxPQUFPLEtBQUssa0JBQWtCO0FBRWpELE1BQUEsaUJBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBRUgsTUFBTTtBQUFBLElBRU4sT0FBTztBQUFBLElBQ1AsWUFBWSxDQUFFLFFBQVEsTUFBTTtBQUFBLElBRTVCLFNBQVM7QUFBQSxJQUNULGNBQWMsQ0FBRSxRQUFRLE1BQU07QUFBQSxJQUU5QixPQUFPO0FBQUEsSUFFUCxpQkFBaUI7QUFBQSxJQUNqQixZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxpQkFBaUIsQ0FBRSxPQUFPLFFBQVEsTUFBTTtBQUFBLElBQ3hDLFVBQVUsQ0FBQTtBQUFBLElBRVYsa0JBQWtCO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFFbkIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLElBRVAsYUFBYSxDQUFFLE9BQU8sUUFBUSxNQUFNO0FBQUEsSUFDcEMsYUFBYSxDQUFFLE9BQU8sUUFBUSxNQUFNO0FBQUEsRUFDeEM7QUFBQSxFQUVFLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNIO0FBQUEsSUFBUztBQUFBLElBQWE7QUFBQSxFQUMxQjtBQUFBLEVBRUUsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFFLEVBQUUsSUFBSyxtQkFBa0I7QUFDNUMsVUFBTSxTQUFTLFFBQVEsT0FBTyxFQUFFO0FBRWhDLFVBQU0sVUFBVTtBQUFBLE1BQ2QsTUFBTSxlQUFlLE9BQ2pCLE1BQU0sYUFDTixNQUFNO0FBQUEsSUFDaEI7QUFFSSxVQUFNLGdCQUFnQixJQUFJLElBQUk7QUFDOUIsVUFBTSxZQUFZLE1BQUs7QUFFdkIsVUFBTSxFQUFFLE1BQU0sTUFBTSxPQUFNLElBQUssZUFBZSxFQUFFLFFBQU8sQ0FBRTtBQUV6RCxRQUFJLFVBQVU7QUFFZCxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLGtEQUN5QixRQUFRLFVBQVUsT0FBTyxhQUFhLFdBQVcsc0JBQ2pELE1BQU0sVUFBVSxPQUFPLFVBQVUsVUFBVTtBQUFBLElBQzFFO0FBRUksVUFBTSxlQUFlLFNBQVMsTUFBTTtBQUNsQyxVQUFJLE1BQU0sc0JBQXNCLFFBQVE7QUFDdEMsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLE1BQU0sR0FBRyxLQUFLLFFBQVEsT0FBTyxVQUFVO0FBQzdDLGFBQU87QUFBQSxRQUNMLENBQUUsWUFBWSxHQUFHLEdBQUssTUFBTSxvQkFBb0IsS0FBTTtBQUFBLE1BQzlEO0FBQUEsSUFDSSxDQUFDO0FBRUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixNQUFNLFlBQVksU0FDaEIsTUFBTSxTQUFTLFVBQ1gsTUFBTSxPQUFPLFVBQVUsTUFBTSxPQUFPLFFBQVEsTUFBTSxPQUFPO0FBQUEsSUFFckU7QUFFSSxVQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLFlBQU0sTUFBTSxDQUFBO0FBQ1osaUJBQVcsUUFBUSxTQUFPO0FBQ3hCLFlBQUssT0FBUSxNQUFPLEdBQUc7QUFBQSxNQUN6QixDQUFDO0FBQ0QsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0IsUUFBUSxVQUFVLFFBQVEsTUFBTSxxQkFBcUI7QUFBQSxJQUMzRDtBQUVJLFVBQU0sZ0JBQWdCLFNBQVMsTUFDN0IsTUFBTSxpQkFBaUIsVUFBVSxRQUFRLFVBQVUsT0FDL0MsTUFBTSxlQUNOLE1BQU0sY0FBYyxHQUFHLFFBQVEsY0FBZSxNQUFNLGdCQUFnQixPQUFPLGNBQWMsTUFBTSxDQUNwRztBQUVELFVBQU0sbUJBQW1CO0FBQUEsTUFBUyxNQUNoQyxNQUFNLFlBQVksU0FBUyxRQUFRLFVBQVUsUUFBUSxNQUFNLHFCQUFxQjtBQUFBLElBQ3RGO0FBRUksVUFBTSxrQkFBa0IsU0FBUyxPQUFPO0FBQUEsTUFDdEMsVUFBVSxRQUFRLFVBQVU7QUFBQSxNQUM1QixXQUFXLFVBQVU7QUFBQSxNQUNyQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDTixFQUFNO0FBRUYsVUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFlBQU0sa0JBQWtCLE1BQU0sb0JBQW9CLFNBQzlDLE1BQU0sa0JBQ04sR0FBRyxLQUFLLE1BQU8sUUFBUSxVQUFVLE9BQU8sYUFBYSxVQUFXLE1BQU0sS0FBSztBQUUvRSxhQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixpQkFBaUIsUUFBUSxVQUFVLE9BQU8sU0FBUztBQUFBLFFBQ25ELGlCQUFpQixVQUFVO0FBQUEsUUFDM0IsY0FBYztBQUFBLE1BQ3RCO0FBQUEsSUFDSSxDQUFDO0FBRUQsVUFBTSxNQUFNLE1BQU0sT0FBTyxVQUFRO0FBQy9CLGtCQUFTO0FBQ1QsZUFBUyxVQUFVLFdBQVU7QUFBQSxJQUMvQixDQUFDO0FBRUQsYUFBUyxjQUFlLEdBQUc7QUFDekIsY0FBUSxVQUFVLFFBQVEsT0FBTyxDQUFDO0FBQ2xDLFdBQUssU0FBUyxDQUFDO0FBQUEsSUFDakI7QUFFQSxhQUFTLG1CQUFvQixHQUFHO0FBQzlCLFFBQUUsWUFBWSxNQUFNLFdBQVcsR0FBRyxJQUFJO0FBQUEsSUFDeEM7QUFFQSxhQUFTLFdBQVksR0FBRyxVQUFVO0FBQ2hDLFVBQUksYUFBYSxRQUFRLEVBQUUsZ0JBQWdCLE1BQU07QUFDL0Msc0JBQWMsT0FBTyxNQUFLO0FBQUEsTUFDNUI7QUFFQSxhQUFPLENBQUM7QUFDUixxQkFBZSxDQUFDO0FBQUEsSUFDbEI7QUFFQSxhQUFTLFNBQVU7QUFDakIsV0FBSyxXQUFXO0FBQUEsSUFDbEI7QUFFQSxhQUFTLFNBQVU7QUFDakIsV0FBSyxXQUFXO0FBQUEsSUFDbEI7QUFFQSxhQUFTLGFBQWM7QUFDckIsVUFBSSxhQUFhLFFBQVE7QUFDdkIsbUJBQVcsSUFBRztBQUFBLE1BQ2hCO0FBRUEsVUFBSSxRQUFRLFVBQVUsTUFBTTtBQUMxQixtQkFBWSxNQUFNLFNBQVU7QUFBQSxNQUM5QjtBQUVBLFlBQU1DLFFBQU8sTUFBTSxTQUFTLFNBQU87QUFDakMsWUFBSSxRQUFRLE1BQU07QUFDaEIscUJBQVksTUFBTSxTQUFVO0FBQUEsUUFDOUIsV0FDUyxXQUFZLE1BQU0sS0FBSyxNQUFPLFVBQVU7QUFDL0MsaUJBQU8sV0FBWSxNQUFNLEtBQUs7QUFBQSxRQUNoQztBQUFBLE1BQ0YsQ0FBQztBQUVELFlBQU0sUUFBUTtBQUFBLFFBQ1osTUFBTSxXQUFZLE1BQU0sS0FBSztBQUFBLFFBQzdCLENBQUMsS0FBSyxXQUFXO0FBQ2YsY0FBSSxXQUFXLFlBQVksUUFBUSxVQUFVLFFBQVEsVUFBVTtBQUM3RCxpQkFBSTtBQUFBLFVBQ047QUFBQSxRQUNGO0FBQUEsTUFDUjtBQUVNLGtCQUFZLE1BQU07QUFDaEIsUUFBQUEsTUFBSTtBQUNKLGNBQUs7QUFFTCxZQUFJLFdBQVksTUFBTSxLQUFLLE1BQU8sVUFBVTtBQUMxQyxpQkFBTyxXQUFZLE1BQU0sS0FBSztBQUFBLFFBQ2hDO0FBRUEsb0JBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUVBLGFBQVMsZ0JBQWlCO0FBQ3hCLFlBQU0sT0FBTztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0wsK0NBQ1EsTUFBTSxnQkFBZ0IsUUFBUSxNQUFNLHFCQUFxQixPQUFPLGVBQWU7VUFDdkYsTUFBTTtBQUFBLFFBQ2hCO0FBQUEsUUFDUSxNQUFNLE1BQU0scUJBQXFCO0FBQUEsUUFDakMsUUFBUSxNQUFNO0FBQUEsTUFDdEI7QUFFTSxZQUFNLFFBQVE7QUFBQSxRQUNaLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTyxtQ0FDRixNQUFNLGlCQUFpQixVQUFVLFFBQVEsVUFBVSxPQUNsRCw0Q0FDQTtBQUFBLFVBQ04sTUFBTSxjQUFjO0FBQUEsUUFDOUIsQ0FBUztBQUFBLE1BQ1Q7QUFFTSxVQUFJLGlCQUFpQixVQUFVLE1BQU07QUFDbkMsZUFBTyxPQUFPLE1BQU07QUFBQSxVQUNsQixVQUFVO0FBQUEsVUFDVixHQUFHLGdCQUFnQjtBQUFBLFVBQ25CLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNuQixDQUFTO0FBRUQsY0FBTTtBQUFBLFVBQ0osRUFBRSxPQUFPO0FBQUEsWUFDUCxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxVQUFVO0FBQUEsVUFDdEIsQ0FBVztBQUFBLFFBQ1g7QUFBQSxNQUNNO0FBRUEsYUFBTyxFQUFFLGNBQWMsTUFBTSxNQUFNLEtBQUs7QUFBQSxJQUMxQztBQUVBLGFBQVMsaUJBQWtCO0FBQ3pCLFVBQUk7QUFFSixVQUFJLE1BQU0sV0FBVyxRQUFRO0FBQzNCLGdCQUFRLENBQUEsRUFBRyxPQUFPLE1BQU0sT0FBTyxnQkFBZ0IsS0FBSyxDQUFDO0FBQUEsTUFDdkQsT0FDSztBQUNILGdCQUFRO0FBQUEsVUFDTixFQUFFLGNBQWMsTUFBTTtBQUFBLFlBQ3BCLEVBQUUsWUFBWSxFQUFFLE9BQU8sTUFBTSxXQUFVLEdBQUksTUFBTSxNQUFNLFNBQVMsRUFBRTtBQUFBLFlBRWxFLE1BQU0sVUFDRixFQUFFLFlBQVksRUFBRSxPQUFPLE1BQU0sY0FBYyxTQUFTLEtBQUksR0FBSSxNQUFNLE1BQU0sT0FBTyxJQUMvRTtBQUFBLFVBQ2hCLENBQVc7QUFBQSxRQUNYO0FBRVEsY0FBTSxRQUFRLE1BQU8sTUFBTSxxQkFBcUIsT0FBTyxTQUFTLFNBQVM7QUFBQSxVQUN2RSxFQUFFLGNBQWM7QUFBQSxZQUNkLE1BQU0sTUFBTSxxQkFBcUI7QUFBQSxZQUNqQyxRQUFRLE1BQU0scUJBQXFCO0FBQUEsVUFDL0MsR0FBYSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFBQSxRQUNqRDtBQUFBLE1BQ007QUFFQSxVQUFJLE1BQU0sWUFBWSxRQUFRLE1BQU0sbUJBQW1CLE1BQU07QUFDM0QsY0FBTyxNQUFNLHFCQUFxQixPQUFPLFlBQVksTUFBTTtBQUFBLFVBQ3pELGNBQWE7QUFBQSxRQUN2QjtBQUFBLE1BQ007QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLGFBQVMsWUFBYTtBQUNwQixZQUFNLE9BQU87QUFBQSxRQUNYLEtBQUs7QUFBQSxRQUNMLE9BQU8sTUFBTTtBQUFBLFFBQ2IsT0FBTyxNQUFNO0FBQUEsUUFDYixNQUFNLE9BQU87QUFBQSxRQUNiLFNBQVMsTUFBTTtBQUFBLFFBQ2YsT0FBTyxNQUFNO0FBQUEsUUFDYixZQUFZLE1BQU07QUFBQSxNQUMxQjtBQUVNLFVBQUksWUFBWSxVQUFVLE1BQU07QUFDOUIsYUFBSyxZQUFZO0FBQ2pCLGFBQUssVUFBVTtBQUVmLGVBQU87QUFBQSxVQUNMO0FBQUEsVUFDQSxRQUFRLFVBQVUsT0FBTyxVQUFVLFFBQVEsZ0JBQWdCO0FBQUEsUUFDckU7QUFBQSxNQUNNO0FBRUEsYUFBTyxFQUFFLE9BQU8sTUFBTSxjQUFjO0FBQUEsSUFDdEM7QUFFQSxhQUFTLHFCQUFzQjtBQUM3QixhQUFPO0FBQUEsUUFDTCxFQUFFLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLE9BQU8sYUFBYTtBQUFBLFVBQ3BCLElBQUksVUFBVTtBQUFBLFFBQ3hCLEdBQVcsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLFFBQ3ZCLENBQUU7QUFBQSxVQUNBO0FBQUEsVUFDQSxRQUFRO0FBQUEsUUFDbEIsQ0FBUztBQUFBLE1BQ1Q7QUFBQSxJQUNJO0FBRUEsYUFBUyxhQUFjO0FBQ3JCLFlBQU0sT0FBTztBQUFBLFFBQ1gsVUFBUztBQUFBLFFBRVQsRUFBRSxrQkFBa0I7QUFBQSxVQUNsQixVQUFVLE1BQU07QUFBQSxVQUNoQjtBQUFBLFVBQ0E7QUFBQSxRQUNWLEdBQVcsa0JBQWtCO0FBQUEsTUFDN0I7QUFFTSxVQUFJLE1BQU0sb0JBQW9CLE1BQU07QUFDbEMsYUFBSztBQUFBLFVBQ0gsRUFBRSxZQUFZO0FBQUEsWUFDWixPQUFPO0FBQUEsWUFDUCxNQUFNLE9BQU87QUFBQSxVQUN6QixDQUFXO0FBQUEsVUFDRCxFQUFFLFlBQVk7QUFBQSxZQUNaLE9BQU87QUFBQSxZQUNQLE1BQU0sT0FBTztBQUFBLFVBQ3pCLENBQVc7QUFBQSxRQUNYO0FBQUEsTUFDTTtBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxVQUFVLFVBQVUsV0FBVTtBQUVwQyxvQkFBZ0IsTUFBTTtBQUNwQixrQkFBUztBQUFBLElBQ1gsQ0FBQztBQUVELFdBQU8sTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLFFBQVEsU0FBUztBQUFBLE1BQzlDLEVBQUUsT0FBTyxFQUFFLE9BQU8sZ0RBQStDLEdBQUksV0FBVSxDQUFFO0FBQUEsSUFDdkYsQ0FBSztBQUFBLEVBQ0g7QUFDRixDQUFDOzs7OztBQ3RURCxVQUFNLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFVBQU0sVUFBVTtBQUFBLE1BQ2Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUFBO0FBQUEsTUFFVDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQUE7QUFBQSxNQUVUO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFBQTtBQUFBLE1BRVQ7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUFBO0FBQUEsSUFDVDtBQUdGLGNBQVUsWUFBWTtBQUN0QixZQUFNLE1BQU0sTUFBTSxlQUFlLEdBQUcsMEJBQTZCLGdDQUFnQztBQUVqRyxhQUFPLFFBQVEsTUFBTSxJQUFJLEtBQUE7QUFDekIsY0FBUSxJQUFJLE1BQU07QUFBQSxJQUVsQixDQUFDOzs7Ozs7Ozs7Ozs7O0FBOUVZLE1BQUFDLGVBQUEsRUFBQSxPQUFNLGtCQUFBO0FBQ0osTUFBQUMsZUFBQSxFQUFBLE9BQU0saUNBQUE7Ozs7O3NCQWxCbkJMLG1CQW9ETSxPQUFBLE1BQUE7QUFBQSxJQW5ESixPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQU0sZ0JBQWtDLE1BQUEsRUFBOUIsT0FBTSxVQUFBLEdBQVUsYUFBUyxFQUFBO0FBQUEsSUFFbEIsT0FBQSxVQUFVLE9BQUEsT0FBTyxTQUFNLGtCQUFsQ04sbUJBOENNLE9BQUFDLGNBQUE7QUFBQSxNQTdDTkYsWUEyQ1MsT0FBQSxFQUFBLE9BQUEsTUEzQ0Q7QUFBQSx5QkFFSixNQUF1QjtBQUFBLDRCQUR6QkMsbUJBeUNtQk8sVUFBQSxNQUFBQyxXQXhDRCxPQUFBLFFBQU0sQ0FBZixVQUFLO2dDQURkVixZQXlDbUIsZ0JBQUE7QUFBQSxjQXZDaEIsS0FBSyxNQUFNO0FBQUEsY0FDWCxPQUFLLFVBQVksTUFBTSxNQUFNO0FBQUEsY0FDN0IsWUFBWSxNQUFNLFlBQVksY0FBYyxNQUFNLE1BQU07QUFBQSxjQUN4RCxNQUFNLE9BQUE7QUFBQSxjQUNOLGVBQWEsT0FBQTtBQUFBLGNBQ2QsZ0JBQWE7QUFBQSxjQUNiLE9BQU07QUFBQSxjQUNOLE9BQU07QUFBQSxjQUNOLG9CQUFBO0FBQUEsWUFBQTsrQkFFQSxNQTRCTTtBQUFBLGdCQTVCTlEsZ0JBNEJNLE9BNUJORixjQTRCTTtBQUFBLGtCQTNCSkUsZ0JBRU0sT0FGTkQsY0FBNEMsYUFDbkNILGdCQUFHLE1BQU0sS0FBSyxJQUFHLE1BQUNBLGdCQUFHLE1BQU0sUUFBUSxHQUFBLENBQUE7QUFBQSxrQkFHNUNILFlBc0JVLFFBQUE7QUFBQSxvQkFyQlAsTUFBTSxPQUFPLE9BQU8sTUFBTSxLQUFLO0FBQUEsb0JBQy9CLFNBQVMsT0FBQTtBQUFBLG9CQUNWLFdBQVE7QUFBQSxvQkFDUixPQUFBO0FBQUEsb0JBQ0EsTUFBQTtBQUFBLG9CQUNBLFVBQUE7QUFBQSxvQkFDQSxlQUFBO0FBQUEsa0JBQUE7b0JBR2lCLHVCQUFtQlUsUUFDbEMsQ0FEb0MsVUFBSztBQUFBLHNCQUN6Q1YsWUFTTyxLQUFBLEVBQUEsU0FUQTtBQUFBLHlDQUNMLE1BT0U7QUFBQSwwQkFQRkEsWUFPRSxNQUFBO0FBQUEsNEJBTkMsS0FBSyxNQUFNLElBQUk7QUFBQSw0QkFDaEIsT0FBQSxFQUFBLFNBQUEsUUFBQSxVQUFBLE9BQUE7QUFBQSw0QkFDQSxpQkFBYztBQUFBLDRCQUNkLE9BQU07QUFBQSw0QkFDTixLQUFJO0FBQUEsNEJBQ0osT0FBTTtBQUFBLDBCQUFBOzs7Ozs7Ozs7Ozs7Ozs7VUFVSixPQUFBLFVBQVUsT0FBQSxPQUFPLFdBQU0sa0JBQXZDQyxtQkFBNEosT0FBQVUsY0FBQTtBQUFBLGdEQUE3RyxtQkFBZSxFQUFBO0FBQUEsTUFBQVgsWUFBNkQsd0JBQUEsRUFBaEQsSUFBRyxjQUFVO0FBQUEseUJBQUMsTUFBb0IsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsMEJBQXBCLHdCQUFvQixFQUFBO0FBQUEsUUFBQTs7O2dEQUFjLCtCQUEyQixFQUFBO0FBQUEsSUFBQSxvQkFDdEpDLG1CQUE4RCxPQUFBVyxjQUFBO0FBQUEsTUFBakRaLFlBQTBDLFVBQUE7QUFBQSxRQUEvQixPQUFNO0FBQUEsUUFBWSxNQUFLO0FBQUEsTUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQ25ELFVBQU0sUUFBUTtBQU9kLFVBQU0sVUFBVSxJQUFJO0FBQUEsTUFDbEIsWUFBWSxPQUFPLE1BQU07QUFBQSxNQUN6QixXQUFZLE9BQU8sTUFBTTtBQUFBLE1BQ3pCLE9BQVksT0FBTyxNQUFNO0FBQUEsSUFBQSxDQUMxQjtBQUVELFVBQU0sTUFBTTtBQUVaLFVBQU0sU0FBYSxJQUFJLEtBQUs7QUFDNUIsVUFBTSxZQUFhLElBQUksRUFBRTtBQUN6QixVQUFNLGNBQWMsSUFBSSxLQUFLO0FBSzdCLG1CQUFlLGdCQUFnQjtBQUM3QixnQkFBVSxRQUFVO0FBQ3BCLGtCQUFZLFFBQVE7QUFDcEIsYUFBTyxRQUFhO0FBRXBCLFVBQUk7QUFDRixjQUFNLE1BQU8sTUFBTSxlQUFlLEdBQUcsR0FBRyx1QkFBdUI7QUFBQSxVQUM3RCxRQUFRO0FBQUEsVUFDUixNQUFNLEtBQUssVUFBVTtBQUFBLFlBQ25CLFlBQVksUUFBUSxNQUFNO0FBQUEsWUFDMUIsV0FBWSxRQUFRLE1BQU07QUFBQSxVQUFBLENBQzNCO0FBQUEsUUFBQSxDQUNGO0FBRUQsY0FBTSxPQUFPLE1BQU0sSUFBSSxLQUFBO0FBRXZCLFlBQUksQ0FBQyxLQUFLLFNBQVM7QUFDakIsb0JBQVUsUUFBUSxLQUFLLFdBQVc7QUFDbEM7QUFBQSxRQUNGO0FBR0EsZ0JBQVEsUUFBUTtBQUFBLFVBQ2QsWUFBWSxLQUFLLEtBQUs7QUFBQSxVQUN0QixXQUFZLEtBQUssS0FBSztBQUFBLFVBQ3RCLE9BQVksS0FBSyxLQUFLO0FBQUEsUUFBQTtBQUd4QixvQkFBWSxRQUFRO0FBQUEsTUFFdEIsU0FBUyxLQUFLO0FBQ1osZ0JBQVEsTUFBTSw2QkFBNkIsR0FBRztBQUM5QyxrQkFBVSxRQUFRO0FBQUEsTUFDcEIsVUFBQTtBQUNFLGVBQU8sUUFBUTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjs7Ozs7Ozs7Ozs7RUFyRytCLE9BQU07Ozs7O0VBaUNQLE9BQU07Ozs7RUFDSixPQUFNOzs7c0JBM0NwQ0MsbUJBOENNLE9BQUEsTUFBQTtBQUFBLElBN0NKLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBTSxnQkFBd0MsTUFBQSxFQUFwQyxPQUFNLFVBQUEsR0FBVSxtQkFBZSxFQUFBO0FBQUEsSUFHeEIsS0FBQSx3QkFBWE4sbUJBRU0sT0FBQUMsY0FBQTtBQUFBLE1BREpGLFlBQTBDLFVBQUE7QUFBQSxRQUEvQixPQUFNO0FBQUEsUUFBWSxNQUFLO0FBQUEsTUFBQTtVQUlwQixLQUFBLDBCQUFoQkMsbUJBRU0sT0FGTkksY0FFTUYsZ0JBREQsS0FBQSxTQUFTLEdBQUEsQ0FBQSxtQkFJZEYsbUJBK0JNLE9BQUFLLGNBQUE7QUFBQSxNQTlCSk4sWUE2QlMsT0FBQTtBQUFBLFFBN0JBLHdCQUFnQixPQUFBLGVBQWEsQ0FBQSxTQUFBLENBQUE7QUFBQSxNQUFBO3lCQUNwQyxNQUlFO0FBQUEsVUFKRkEsWUFJRSxRQUFBO0FBQUEsWUFIUyxZQUFBLE9BQUEsUUFBUTtBQUFBLFlBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLE9BQUEsUUFBUSxhQUFVO0FBQUEsWUFDM0IsT0FBTTtBQUFBLFlBQ0wsU0FBUyxPQUFBO0FBQUEsVUFBQTtVQUVaQSxZQUlFLFFBQUE7QUFBQSxZQUhTLFlBQUEsT0FBQSxRQUFRO0FBQUEsWUFBUix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsT0FBQSxRQUFRLFlBQVM7QUFBQSxZQUMxQixPQUFNO0FBQUEsWUFDTCxTQUFTLE9BQUE7QUFBQSxVQUFBO1VBRVpBLFlBTUUsUUFBQTtBQUFBLFlBTFMsWUFBQSxPQUFBLFFBQVE7QUFBQSxZQUFSLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxPQUFBLFFBQVEsUUFBSztBQUFBLFlBQ3RCLE9BQU07QUFBQSxZQUNOLE1BQUs7QUFBQSxZQUNMLFNBQUE7QUFBQSxZQUNBLFVBQUE7QUFBQSxVQUFBO1VBR0ZBLFlBS0UsTUFBQTtBQUFBLFlBSkEsTUFBSztBQUFBLFlBQ0wsT0FBTTtBQUFBLFlBQ04sT0FBTTtBQUFBLFlBQ0wsU0FBUyxPQUFBO0FBQUEsVUFBQTtVQUlELE9BQUEsMEJBQVhDLG1CQUF5RSxPQUF6RVUsY0FBeUVSLGdCQUFsQixPQUFBLFNBQVMsR0FBQSxDQUFBO1VBQ3JELE9BQUEsNEJBQVhGLG1CQUF5RixPQUF6RlcsY0FBc0QsK0JBQTZCOzs7Ozs7Ozs7Ozs7QUN1QzNGLFVBQU0sTUFBTTtBQUVaLFVBQU0sTUFBZ0IsSUFBSSxXQUFXO0FBQ3JDLFVBQU0sV0FBZ0IsSUFBSSxJQUFJO0FBQzlCLFVBQU0sYUFBZ0IsSUFBSSxLQUFLO0FBQy9CLFVBQU0saUJBQWlCLElBQUksSUFBSTtBQUMvQixVQUFNLGdCQUFpQixJQUFJLEtBQUs7QUFDaEMsVUFBTSxjQUFpQixJQUFJLEVBQUU7QUFLN0IsUUFBSSxpQkFBaUI7QUFDckIsY0FBVSxZQUFZO0FBQ3BCLFVBQUksZUFBZ0I7QUFDcEIsdUJBQWlCO0FBQ2pCLGNBQVEsTUFBTSw2QkFBNkI7QUFFM0MsVUFBSTtBQUNGLGNBQU0sTUFBTSxNQUFNLGVBQWUsR0FBRyxHQUFHLHFCQUFxQjtBQUU1RCxZQUFJLElBQUksSUFBSTtBQUNWLGdCQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUE7QUFDdkIsbUJBQVMsUUFBVSxLQUFLO0FBQ3hCLGVBQUssTUFBTSxPQUFRLEtBQUs7QUFDeEIsc0JBQVksSUFBSTtBQUNoQixxQkFBVyxRQUFRO0FBQUEsUUFDckI7QUFBQSxNQUdGLFNBQVMsS0FBSztBQUNaLGdCQUFRLE1BQU0seUJBQXlCLEdBQUc7QUFBQSxNQUM1QyxVQUFBO0FBQ0UsdUJBQWUsUUFBUTtBQUFBLE1BQ3pCO0FBQUEsSUFDRixDQUFDO0FBS0QsYUFBUyxRQUFRLE1BQU07QUFDckIsZUFBUyxRQUFVO0FBQ25CLFdBQUssTUFBTSxPQUFRO0FBQ25CLGtCQUFZLElBQUk7QUFDaEIsaUJBQVcsUUFBUTtBQUFBLElBQ3JCO0FBTUEsbUJBQWUsU0FBUztBQUN0QixrQkFBWSxRQUFVO0FBQ3RCLG9CQUFjLFFBQVE7QUFFdEIsVUFBSTtBQUNGLGNBQU0sZUFBZSxHQUFHLEdBQUcsMkJBQTJCLEVBQUUsUUFBUSxRQUFRO0FBQUEsTUFDMUUsU0FBUyxLQUFLO0FBQ1osZ0JBQVEsTUFBTSwwQkFBMEIsR0FBRztBQUMzQyxvQkFBWSxRQUFRO0FBQ3BCO0FBQUEsTUFDRixVQUFBO0FBQ0Usc0JBQWMsUUFBUTtBQUFBLE1BQ3hCO0FBR0EsZUFBUyxRQUFVO0FBQ25CLGlCQUFXLFFBQVE7QUFDbkIsa0JBQVksS0FBSztBQUNqQixXQUFLLE1BQUE7QUFDTCxXQUFLLE1BQU0sT0FBUSxDQUFBO0FBQUEsSUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeEpPLE1BQUEsYUFBQSxFQUFBLE9BQU0sVUFBQTtBQUNKLE1BQUEsYUFBQSxFQUFBLE9BQU0sWUFBQTs7Ozs7Ozs7RUE0RHFCLE9BQU07OztBQTdEeEMsU0FBQUMsVUFBQSxHQUFBWixtQkFvRU0sT0FwRU4sWUFvRU07QUFBQSxJQW5FSk0sZ0JBa0VNLE9BbEVOLFlBa0VNO0FBQUEsTUFqRUosT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFBLGdCQUFtQixZQUFmLGNBQVUsRUFBQTtBQUFBLE1BR0gsT0FBQSwrQkFBWE4sbUJBRU0sT0FBQSxZQUFBO0FBQUEsUUFESkQsWUFBMEMsVUFBQTtBQUFBLFVBQS9CLE9BQU07QUFBQSxVQUFZLE1BQUs7QUFBQSxRQUFBO2FBSW5CLE9BQUEsMkJBQWpCQyxtQkFJTSxPQUFBLFlBQUE7QUFBQSxRQUhKRCxZQUFzQyxPQUFBLFdBQUEsR0FBQSxFQUExQixnQkFBZSxPQUFBLFNBQU87QUFBQSxRQUNsQyxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQU8sZ0JBQVcsWUFBUCxNQUFFLEVBQUE7QUFBQSxRQUNOUCxZQUFxQixPQUFBLG1CQUFBLENBQUE7QUFBQSxNQUFBLG9CQUl2QkMsbUJBZ0RNLE9BQUEsWUFBQTtBQUFBLFFBL0NKRCxZQWVTLE9BQUE7QUFBQSxVQWROLHNEQUFELE1BQUE7QUFBQSxVQUFBLEdBQWdCLENBQUEsTUFBQSxDQUFBO0FBQUEsVUFDZixxREFBRCxNQUFBO0FBQUEsVUFBQSxHQUFlLENBQUEsTUFBQSxDQUFBO0FBQUEsVUFDZCxjQUFZLE9BQUE7QUFBQSxVQUNaLGFBQVcsT0FBQTtBQUFBLHNCQUNILE9BQUE7QUFBQSx1RUFBQSxPQUFBLE1BQUc7QUFBQSxVQUNaLE9BQU07QUFBQSxVQUNOLG1CQUFnQjtBQUFBLFVBQ2hCLGdCQUFhO0FBQUEsVUFDYixPQUFNO0FBQUEsUUFBQTsyQkFFTixNQUE0QztBQUFBLFlBQTVDQSxZQUE0QyxNQUFBO0FBQUEsY0FBckMsTUFBSztBQUFBLGNBQVksT0FBTTtBQUFBLFlBQUE7WUFDOUJBLFlBQTRDLE1BQUE7QUFBQSxjQUFyQyxNQUFLO0FBQUEsY0FBWSxPQUFNO0FBQUEsWUFBQTtZQUM5QkEsWUFBa0QsTUFBQTtBQUFBLGNBQTNDLE1BQUs7QUFBQSxjQUFZLE9BQU07QUFBQSxZQUFBO1lBQzlCQSxZQUF5QyxNQUFBO0FBQUEsY0FBbEMsTUFBSztBQUFBLGNBQVksT0FBTTtBQUFBLFlBQUE7Ozs7UUFHaENBLFlBQWUsVUFBQTtBQUFBLFFBRWZBLFlBMkJlLFlBQUE7QUFBQSxzQkEzQlEsT0FBQTtBQUFBLHVFQUFBLE9BQUEsTUFBRztBQUFBLFVBQUUsVUFBQTtBQUFBLFFBQUE7MkJBRTFCLE1BUWM7QUFBQSxZQVJkQSxZQVFjLFdBQUEsRUFBQSxNQUFBLGVBUkk7QUFBQSwrQkFDaEIsTUFBa0M7QUFBQSxnQkFBbEMsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFPLGdCQUFrQyxNQUFBLEVBQTlCLE9BQU0sVUFBQSxHQUFVLGFBQVMsRUFBQTtBQUFBLGdCQUNsQixPQUFBLHlCQUFYTixtQkFFTSxPQUFBLFlBRmUsZUFDVkUsZ0JBQUcsT0FBQSxTQUFTLFVBQVUsSUFBRyxNQUFDQSxnQkFBRyxPQUFBLFNBQVMsU0FBUyxHQUFBLENBQUEsbUJBRTFERixtQkFFTSxPQUFBLFlBQUE7QUFBQSxrQkFESkQsWUFBMEMsVUFBQTtBQUFBLG9CQUEvQixPQUFNO0FBQUEsb0JBQVksTUFBSztBQUFBLGtCQUFBOzs7OztZQUl0Q0EsWUFJYyxXQUFBLEVBQUEsTUFBQSxZQUpHO0FBQUEsK0JBR2YsTUFBaUI7QUFBQSxnQkFBakJBLFlBQWlCLE9BQUEsZUFBQSxDQUFBO0FBQUEsY0FBQTs7O1lBR25CQSxZQUVjLFdBQUEsRUFBQSxNQUFBLGFBRkk7QUFBQSwrQkFDaEIsTUFBbUQ7QUFBQSxnQkFBN0IsT0FBQSx5QkFBdEJELFlBQW1ELE9BQUEsZ0JBQUEsR0FBQTtBQUFBO2tCQUFsQixNQUFNLE9BQUE7QUFBQSxnQkFBQTs7OztZQUd6Q0MsWUFHYyxXQUFBLEVBQUEsTUFBQSxZQUhHO0FBQUEsK0JBQ2YsTUFBaUU7QUFBQSxnQkFBakVBLFlBQWlFLE1BQUE7QUFBQSxrQkFBekQsU0FBTyxPQUFBO0FBQUEsa0JBQVMsU0FBUyxPQUFBO0FBQUEsa0JBQWUsT0FBTTtBQUFBLGdCQUFBO2dCQUMzQyxPQUFBLDRCQUFYQyxtQkFBNkUsT0FBN0UsWUFBNkVFLGdCQUFwQixPQUFBLFdBQVcsR0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw2LDddfQ==
