import { at as emptyRenderFn, au as tabsKey, R as Ripple, e as QIcon, h as hMergeSlot, aj as isKeyCode, av as shouldIgnoreKey, V as useTick, X as useTimeout, a as hSlot, u as useDarkProps, b as useDark, O as hDir, _ as _export_sfc, i as QInput, Q as QBtn, c as cart, S as useModelToggleEmits, U as useModelToggleProps, am as useRouterLinkProps, aw as useId, Y as useModelToggle, ax as uid, g as QSeparator, j as QCard, a2 as QSpinner, ay as matKeyboardArrowDown, az as matShoppingBag, ag as fetchWithToken, L as matChevronRight, M as matChevronLeft } from "./index-DDAg5YDa.js";
import { y as inject, g as getCurrentInstance, R as onBeforeUnmount, x as onMounted, j as ref, e as computed, w as withDirectives, h, S as stopAndPrevent, f as createComponent, v as watch, A as onDeactivated, B as onActivated, a5 as QResizeObserver, I as provide, o as openBlock, p as createBlock, q as withCtx, t as createVNode, m as createElementBlock, ac as toDisplayString, u as createCommentVNode, ad as withModifiers, T as Transition, ar as vShow, D as shallowReactive, k as resolveComponent, a9 as createBaseVNode, aa as Fragment, ab as renderList, s as createTextVNode } from "./quasar-observers-delayed-tSHCOYpR.js";
import { e as rtlHasScrollBug, f as QItemLabel } from "./QSelect-xmC19IVN.js";
import { u as usePanelChildProps, a as usePanelEmits, b as usePanelProps, c as usePanel } from "./use-panel-Tcj_rECq.js";
import { Q as QPage } from "./QPage-gc4oP7_r.js";
import { Q as QForm, G as GoogleLoginButton } from "./GoogleLoginButton-D1ipgZ7H.js";
import { Q as QImg } from "./QImg-BSHjw5MV.js";
import { Q as QTd } from "./QTd-YwsrG3No.js";
import { Q as QTable } from "./QTable-CtwNAS5R.js";
import QItem from "./QItem-D74-s_Zr.js";
import { Q as QItemSection } from "./QItemSection-Em5VwD4r.js";
import "./QChip-CN1ZGBoZ.js";
import "./QList-tQahs7qg.js";
import "./use-fullscreen-D6v2f2fY.js";
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
    const emit = __emit;
    const addedItems = ref("");
    async function login() {
      try {
        const res = await fetch("https://nuxt.meidanm.com/wp-json/jwt-auth/v1/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("jwt_token", data.token);
          emit("login-success", data.token);
          console.log("Login successful:", data);
        } else {
          console.error("Login failed:", data.message);
        }
        const token = localStorage.getItem("jwt_token");
        const userRes = await fetch("https://nuxt.meidanm.com/wp-json/wp/v2/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = await userRes.json();
        console.log(user);
        cart.state.user = user;
        console.log(cart.state.user);
        const guestCart = await fetch("https://nuxt.meidanm.com/wp-json/wc/store/v1/cart", {
          credentials: "include"
        }).then((res2) => res2.json());
        const userCart = await fetch("https://nuxt.meidanm.com/wp-json/wc/store/v1/cart", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          credentials: "include"
        }).then((res2) => res2.json());
        console.log(userCart);
        if (userCart.items_count === 0 && guestCart.items.length > 0) {
          for (const item of guestCart.items) {
            const itemRes = await fetch("https://nuxt.meidanm.com/wp-json/wc/store/v1/cart/add-item", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              credentials: "include",
              body: JSON.stringify({
                id: item.id,
                quantity: item.quantity
              })
            });
            addedItems.value = await itemRes.json();
          }
          cart.state.items = addedItems.value.items || [];
          cart.state.items_count = addedItems.value.items_count || 0;
          cart.state.totals = addedItems.value.totals || {};
          cart.state.coupons = addedItems.value.coupons || [];
          cart.state.cart_array = addedItems.value || [];
          console.log("longer!!!");
        }
      } catch (err) {
        error.value = "Server error";
        console.log(err);
      }
    }
    const __returned__ = { username, password, error, emit, addedItems, login, ref, get cart() {
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
        filled: ""
      }, null, 8, ["modelValue"]),
      createVNode(QInput, {
        modelValue: $setup.password,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.password = $event),
        type: "password",
        label: "Password",
        filled: ""
      }, null, 8, ["modelValue"]),
      createVNode(QBtn, {
        label: "Login",
        type: "submit",
        color: "secondary"
      }),
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
    const token = localStorage.getItem("jwt_token");
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
      const res = await fetch("https://nuxt.meidanm.com/wp-json/wc/store/v1/my-orders", {
        cerdentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
          // From your JWT login
        }
      });
      orders.value = await res.json();
      console.log(orders);
    });
    const __returned__ = { orders, token, columns, ref, onMounted, get matShoppingBag() {
      return matShoppingBag;
    }, get matKeyboardArrowDown() {
      return matKeyboardArrowDown;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = { class: "q-mt-sm q-pa-md" };
const _hoisted_3$1 = { class: "text-body2 text-grey-7 q-mb-sm" };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = { key: 2 };
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
                  createBaseVNode("div", _hoisted_3$1, " Total: " + toDisplayString(order.total) + " " + toDisplayString(order.currency), 1),
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
    ])) : $setup.orders && $setup.orders.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
      _cache[1] || (_cache[1] = createTextVNode("No orders yet. ", -1)),
      createVNode(_component_router_link, { to: "products" }, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createTextVNode("explore our products", -1)
        ])]),
        _: 1
      }),
      _cache[2] || (_cache[2] = createTextVNode(" to start your first order!", -1))
    ])) : (openBlock(), createElementBlock("div", _hoisted_5$1, [
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
  setup(__props, { expose: __expose }) {
    __expose();
    const account = ref({
      first_name: "",
      last_name: "",
      email: ""
    });
    const token = localStorage.getItem("jwt_token");
    onMounted(async () => {
      const res = await fetch("https://nuxt.meidanm.com/wp-json/wp/v2/users/me", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      account.value = await res.json();
      console.log(account.value);
    });
    async function updateDetails() {
      console.log(account.value);
      console.log(JSON.stringify(account.value).replace("__name", "_name"));
      await fetch("https://nuxt.meidanm.com/wp-json/wp/v2/users/me", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(account.value).replaceAll("__name", "_name")
      }).then((res) => console.log(res));
    }
    const __returned__ = { account, token, updateDetails, ref, onMounted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    _cache[3] || (_cache[3] = createBaseVNode("h1", { class: "text-h4" }, "Account Details", -1)),
    $setup.account.user_email ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      createVNode(QForm, {
        onSubmit: withModifiers($setup.updateDetails, ["prevent"])
      }, {
        default: withCtx(() => [
          createVNode(QInput, {
            modelValue: $setup.account.first__name,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.account.first__name = $event),
            label: "First Name"
          }, null, 8, ["modelValue"]),
          createVNode(QInput, {
            modelValue: $setup.account.last__name,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.account.last__name = $event),
            label: "Last Name"
          }, null, 8, ["modelValue"]),
          createVNode(QInput, {
            disable: "",
            readonly: "",
            modelValue: $setup.account.user_email,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.account.user_email = $event),
            label: "Email",
            type: "email"
          }, null, 8, ["modelValue"]),
          createVNode(QBtn, {
            type: "submit",
            label: "Save Changes",
            color: "secondary"
          })
        ]),
        _: 1
      })
    ])) : (openBlock(), createElementBlock("div", _hoisted_2$1, [
      createVNode(QSpinner, {
        color: "secondary",
        size: "2em"
      })
    ]))
  ]);
}
const AccountDetails = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "AccountDetails.vue"]]);
const _sfc_main = {
  __name: "AccountPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const tab = ref("dashboard");
    const userData = ref(null);
    const token = ref(null);
    {
      token.value = localStorage.getItem("jwt_token");
    }
    const isLoggedIn = ref(!!token.value);
    async function onLogin(newToken) {
      token.value = newToken;
      {
        localStorage.setItem("jwt_token", newToken);
      }
      await fetchUser();
      isLoggedIn.value = true;
    }
    async function fetchUser() {
      const res = await fetchWithToken("https://nuxt.meidanm.com/wp-json/wp/v2/users/me");
      if (!res.ok) return;
      userData.value = await res.json();
      cart.state.user = userData.value;
    }
    function logout() {
      token.value = null;
      userData.value = null;
      isLoggedIn.value = false;
      {
        localStorage.removeItem("jwt_token");
      }
      cart.clear();
      cart.state.user = {};
    }
    onMounted(() => {
      if (isLoggedIn.value) fetchUser();
    });
    const __returned__ = { tab, userData, token, isLoggedIn, onLogin, fetchUser, logout, ref, onMounted, get fetchWithToken() {
      return fetchWithToken;
    }, LoginForm, OrdersSection, AccountDetails, get cart() {
      return cart;
    }, GoogleLoginButton, get matChevronLeft() {
      return matChevronLeft;
    }, get matChevronRight() {
      return matChevronRight;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "container" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        _cache[7] || (_cache[7] = createBaseVNode("h2", null, "My account", -1)),
        !$setup.isLoggedIn ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode($setup["LoginForm"], { onLoginSuccess: $setup.onLogin }),
          _cache[4] || (_cache[4] = createBaseVNode("h3", null, " OR ", -1)),
          createVNode($setup["GoogleLoginButton"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_3, [
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
                  $setup.userData ? (openBlock(), createElementBlock("div", _hoisted_4, "Welcome, " + toDisplayString($setup.userData?.first__name) + " " + toDisplayString($setup.userData?.last__name), 1)) : (openBlock(), createElementBlock("div", _hoisted_5, [
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
                  createVNode($setup["OrdersSection"], { token: $setup.token }, null, 8, ["token"])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "details" }, {
                default: withCtx(() => [
                  createVNode($setup["AccountDetails"], { token: $setup.token }, null, 8, ["token"])
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "logout" }, {
                default: withCtx(() => [
                  createVNode(QBtn, { onClick: $setup.logout }, {
                    default: withCtx(() => [..._cache[6] || (_cache[6] = [
                      createTextVNode("Logout", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]))
      ])
    ]),
    _: 1
  });
}
const AccountPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a935b52f"], ["__file", "AccountPage.vue"]]);
export {
  AccountPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNjb3VudFBhZ2UtQm1aaEx5Mm4uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFicy91c2UtdGFiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL1FUYWIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvUVRhYnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWItcGFuZWxzL1FUYWJQYW5lbHMuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Mb2dpbkZvcm0udnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZS10cmFuc2l0aW9uL1FTbGlkZVRyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2V4cGFuc2lvbi1pdGVtL1FFeHBhbnNpb25JdGVtLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvT3JkZXJzU2VjdGlvbi52dWUiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BY2NvdW50RGV0YWlscy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvQWNjb3VudFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGluamVjdCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcydcblxuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSwgc2hvdWxkSWdub3JlS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgeyB0YWJzS2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcblxubGV0IGlkID0gMFxuXG5leHBvcnQgY29uc3QgdXNlVGFiRW1pdHMgPSBbICdjbGljaycsICdrZXlkb3duJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJQcm9wcyA9IHtcbiAgaWNvbjogU3RyaW5nLFxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuXG4gIGFsZXJ0OiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICBhbGVydEljb246IFN0cmluZyxcblxuICBuYW1lOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6ICgpID0+IGB0XyR7IGlkKysgfWBcbiAgfSxcblxuICBub0NhcHM6IEJvb2xlYW4sXG5cbiAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgZGlzYWJsZTogQm9vbGVhbixcblxuICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICByaXBwbGU6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHNsb3RzLCBlbWl0LCByb3V0ZURhdGEpIHtcbiAgY29uc3QgJHRhYnMgPSBpbmplY3QodGFic0tleSwgZW1wdHlSZW5kZXJGbilcbiAgaWYgKCR0YWJzID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgY29uc29sZS5lcnJvcignUVRhYi9RUm91dGVUYWIgY29tcG9uZW50IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFUYWJzJylcbiAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICB9XG5cbiAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBibHVyVGFyZ2V0UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgY29uc3QgdGFiSW5kaWNhdG9yUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmlwcGxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgcHJvcHMucmlwcGxlID09PSBmYWxzZVxuICAgICAgPyBmYWxzZVxuICAgICAgOiBPYmplY3QuYXNzaWduKFxuICAgICAgICB7IGtleUNvZGVzOiBbIDEzLCAzMiBdLCBlYXJseTogdHJ1ZSB9LFxuICAgICAgICBwcm9wcy5yaXBwbGUgPT09IHRydWUgPyB7fSA6IHByb3BzLnJpcHBsZVxuICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGlzQWN0aXZlID0gY29tcHV0ZWQoKCkgPT4gJHRhYnMuY3VycmVudE1vZGVsLnZhbHVlID09PSBwcm9wcy5uYW1lKVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXRhYiByZWxhdGl2ZS1wb3NpdGlvbiBzZWxmLXN0cmV0Y2ggZmxleCBmbGV4LWNlbnRlciB0ZXh0LWNlbnRlcidcbiAgICArIChcbiAgICAgIGlzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gKFxuICAgICAgICAgICAgJyBxLXRhYi0tYWN0aXZlJ1xuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ2xhc3MgPyAnICcgKyAkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVDbGFzcyA6ICcnKVxuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ29sb3IgPyBgIHRleHQtJHsgJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ29sb3IgfWAgOiAnJylcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUJnQ29sb3IgPyBgIGJnLSR7ICR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUJnQ29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgICAgIDogJyBxLXRhYi0taW5hY3RpdmUnXG4gICAgKVxuICAgICsgKHByb3BzLmljb24gJiYgcHJvcHMubGFiZWwgJiYgJHRhYnMudGFiUHJvcHMudmFsdWUuaW5saW5lTGFiZWwgPT09IGZhbHNlID8gJyBxLXRhYi0tZnVsbCcgOiAnJylcbiAgICArIChwcm9wcy5ub0NhcHMgPT09IHRydWUgfHwgJHRhYnMudGFiUHJvcHMudmFsdWUubm9DYXBzID09PSB0cnVlID8gJyBxLXRhYi0tbm8tY2FwcycgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlIGN1cnNvci1wb2ludGVyJylcbiAgICArIChyb3V0ZURhdGEgIT09IHZvaWQgMCA/IHJvdXRlRGF0YS5saW5rQ2xhc3MudmFsdWUgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXRhYl9fY29udGVudCBzZWxmLXN0cmV0Y2ggZmxleC1jZW50ZXIgcmVsYXRpdmUtcG9zaXRpb24gcS1hbmNob3ItLXNraXAgbm9uLXNlbGVjdGFibGUgJ1xuICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmlubGluZUxhYmVsID09PSB0cnVlID8gJ3JvdyBuby13cmFwIHEtdGFiX19jb250ZW50LS1pbmxpbmUnIDogJ2NvbHVtbicpXG4gICAgKyAocHJvcHMuY29udGVudENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmNvbnRlbnRDbGFzcyB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgdGFiSW5kZXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgJHRhYnMuaGFzRm9jdXMudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IChpc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UgJiYgJHRhYnMuaGFzQWN0aXZlVGFiLnZhbHVlID09PSB0cnVlKVxuICAgIClcbiAgICAgID8gLTFcbiAgICAgIDogcHJvcHMudGFiaW5kZXggfHwgMFxuICApKVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2sgKGUsIGtleWJvYXJkKSB7XG4gICAgaWYgKGtleWJvYXJkICE9PSB0cnVlICYmIGU/LnFBdm9pZEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIC8vIHdlIHNob3VsZCBoaW5kZXIgbmF0aXZlIG5hdmlnYXRpb24gdGhvdWdoXG4gICAgICBpZiAocm91dGVEYXRhPy5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBkbyB3ZSBoYXZlIGEgUVRhYj9cbiAgICBpZiAocm91dGVEYXRhID09PSB2b2lkIDApIHtcbiAgICAgICR0YWJzLnVwZGF0ZU1vZGVsKHsgbmFtZTogcHJvcHMubmFtZSB9KVxuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBnbyA9IChvcHRzID0ge30pID0+IHtcbiAgICAgICAgLy8gaWYgcmVxdWlyaW5nIHRvIGdvIHRvIGFub3RoZXIgcm91dGUsIHRoZW4gd2VcbiAgICAgICAgLy8gbGV0IHRoZSBRVGFicyByb3V0ZSB3YXRjaGVyIGRvIGl0cyBqb2IsXG4gICAgICAgIC8vIG90aGVyd2lzZSBkaXJlY3RseSBzZWxlY3QgdGhpc1xuICAgICAgICBsZXQgaGFyZEVycm9yXG4gICAgICAgIGNvbnN0IHJlcUlkID0gb3B0cy50byA9PT0gdm9pZCAwIHx8IGlzRGVlcEVxdWFsKG9wdHMudG8sIHByb3BzLnRvKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gKCR0YWJzLmF2b2lkUm91dGVXYXRjaGVyID0gdWlkKCkpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgICAgcmV0dXJuIHJvdXRlRGF0YS5uYXZpZ2F0ZVRvUm91dGVyTGluayhlLCB7IC4uLm9wdHMsIHJldHVyblJvdXRlckVycm9yOiB0cnVlIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiB7IGhhcmRFcnJvciA9IGVyciB9KVxuICAgICAgICAgIC50aGVuKHNvZnRFcnJvciA9PiB7XG4gICAgICAgICAgICBpZiAocmVxSWQgPT09ICR0YWJzLmF2b2lkUm91dGVXYXRjaGVyKSB7XG4gICAgICAgICAgICAgICR0YWJzLmF2b2lkUm91dGVXYXRjaGVyID0gZmFsc2VcblxuICAgICAgICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFueSBoYXJkIGVycm9ycyBvciBhbnkgc29mdCBlcnJvcnMsIGV4Y2VwdCBmb3JcbiAgICAgICAgICAgICAgLy8gd2hlbiBuYXZpZ2F0aW5nIHRvIHRoZSBzYW1lIHJvdXRlIChvbiBhbGwgb3RoZXIgc29mdCBlcnJvcnMsXG4gICAgICAgICAgICAgIC8vIGxpa2Ugd2hlbiBuYXZpZ2F0aW9uIHdhcyBhYm9ydGVkIGluIGEgbmF2IGd1YXJkLCB3ZSBkb24ndCBhY3RpdmF0ZSB0aGlzIHRhYilcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGhhcmRFcnJvciA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICAgICAgICAgIHNvZnRFcnJvciA9PT0gdm9pZCAwXG4gICAgICAgICAgICAgICAgICB8fCAoc29mdEVycm9yLm1lc3NhZ2U/LnN0YXJ0c1dpdGgoJ0F2b2lkZWQgcmVkdW5kYW50IG5hdmlnYXRpb24nKSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICR0YWJzLnVwZGF0ZU1vZGVsKHsgbmFtZTogcHJvcHMubmFtZSB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnJldHVyblJvdXRlckVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYXJkRXJyb3IgIT09IHZvaWQgMCA/IFByb21pc2UucmVqZWN0KGhhcmRFcnJvcikgOiBzb2Z0RXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdjbGljaycsIGUsIGdvKVxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlICYmIGdvKClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZW1pdCgnY2xpY2snLCBlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgaWYgKGlzS2V5Q29kZShlLCBbIDEzLCAzMiBdKSkge1xuICAgICAgb25DbGljayhlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHNob3VsZElnbm9yZUtleShlKSAhPT0gdHJ1ZVxuICAgICAgJiYgZS5rZXlDb2RlID49IDM1XG4gICAgICAmJiBlLmtleUNvZGUgPD0gNDBcbiAgICAgICYmIGUuYWx0S2V5ICE9PSB0cnVlXG4gICAgICAmJiBlLm1ldGFLZXkgIT09IHRydWVcbiAgICApIHtcbiAgICAgICR0YWJzLm9uS2JkTmF2aWdhdGUoZS5rZXlDb2RlLCBwcm94eS4kZWwpID09PSB0cnVlICYmIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuXG4gICAgZW1pdCgna2V5ZG93bicsIGUpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICBjb25zdFxuICAgICAgbmFycm93ID0gJHRhYnMudGFiUHJvcHMudmFsdWUubmFycm93SW5kaWNhdG9yLFxuICAgICAgY29udGVudCA9IFtdLFxuICAgICAgaW5kaWNhdG9yID0gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHRhYkluZGljYXRvclJlZixcbiAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAncS10YWJfX2luZGljYXRvcicsXG4gICAgICAgICAgJHRhYnMudGFiUHJvcHMudmFsdWUuaW5kaWNhdG9yQ2xhc3NcbiAgICAgICAgXVxuICAgICAgfSlcblxuICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBjb250ZW50LnB1c2goXG4gICAgICBoKFFJY29uLCB7XG4gICAgICAgIGNsYXNzOiAncS10YWJfX2ljb24nLFxuICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICB9KVxuICAgIClcblxuICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgY29udGVudC5wdXNoKFxuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiX19sYWJlbCcgfSwgcHJvcHMubGFiZWwpXG4gICAgKVxuXG4gICAgcHJvcHMuYWxlcnQgIT09IGZhbHNlICYmIGNvbnRlbnQucHVzaChcbiAgICAgIHByb3BzLmFsZXJ0SWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJfX2FsZXJ0LWljb24nLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5hbGVydCAhPT0gdHJ1ZVxuICAgICAgICAgICAgPyBwcm9wcy5hbGVydFxuICAgICAgICAgICAgOiB2b2lkIDAsXG4gICAgICAgICAgbmFtZTogcHJvcHMuYWxlcnRJY29uXG4gICAgICAgIH0pXG4gICAgICAgIDogaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJfX2FsZXJ0J1xuICAgICAgICAgICAgKyAocHJvcHMuYWxlcnQgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMuYWxlcnQgfWAgOiAnJylcbiAgICAgICAgfSlcbiAgICApXG5cbiAgICBuYXJyb3cgPT09IHRydWUgJiYgY29udGVudC5wdXNoKGluZGljYXRvcilcblxuICAgIGNvbnN0IG5vZGUgPSBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clRhcmdldFJlZiB9KSxcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUgfSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjb250ZW50KSlcbiAgICBdXG5cbiAgICBuYXJyb3cgPT09IGZhbHNlICYmIG5vZGUucHVzaChpbmRpY2F0b3IpXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgY29uc3QgdGFiRGF0YSA9IHtcbiAgICBuYW1lOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lKSxcbiAgICByb290UmVmLFxuICAgIHRhYkluZGljYXRvclJlZixcbiAgICByb3V0ZURhdGFcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgJHRhYnMudW5yZWdpc3RlclRhYih0YWJEYXRhKVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgJHRhYnMucmVnaXN0ZXJUYWIodGFiRGF0YSlcbiAgfSlcblxuICBmdW5jdGlvbiByZW5kZXJUYWIgKHRhZywgY3VzdG9tRGF0YSkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHRhYmluZGV4OiB0YWJJbmRleC52YWx1ZSxcbiAgICAgIHJvbGU6ICd0YWInLFxuICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAnYXJpYS1kaXNhYmxlZCc6IHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAndHJ1ZScgOiB2b2lkIDAsXG4gICAgICBvbkNsaWNrLFxuICAgICAgb25LZXlkb3duLFxuICAgICAgLi4uY3VzdG9tRGF0YVxuICAgIH1cblxuICAgIHJldHVybiB3aXRoRGlyZWN0aXZlcyhcbiAgICAgIGgodGFnLCBkYXRhLCBnZXRDb250ZW50KCkpLFxuICAgICAgWyBbIFJpcHBsZSwgcmlwcGxlLnZhbHVlIF0gXVxuICAgIClcbiAgfVxuXG4gIHJldHVybiB7IHJlbmRlclRhYiwgJHRhYnMgfVxufVxuIiwiaW1wb3J0IHVzZVRhYiwgeyB1c2VUYWJQcm9wcywgdXNlVGFiRW1pdHMgfSBmcm9tICcuL3VzZS10YWIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWInLFxuXG4gIHByb3BzOiB1c2VUYWJQcm9wcyxcblxuICBlbWl0czogdXNlVGFiRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHJlbmRlclRhYiB9ID0gdXNlVGFiKHByb3BzLCBzbG90cywgZW1pdClcbiAgICByZXR1cm4gKCkgPT4gcmVuZGVyVGFiKCdkaXYnKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGFic0tleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgcnRsSGFzU2Nyb2xsQnVnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ydGwvcnRsLmpzJ1xuXG5mdW5jdGlvbiBnZXRJbmRpY2F0b3JDbGFzcyAoY29sb3IsIHRvcCwgdmVydGljYWwpIHtcbiAgY29uc3QgcG9zID0gdmVydGljYWwgPT09IHRydWVcbiAgICA/IFsgJ2xlZnQnLCAncmlnaHQnIF1cbiAgICA6IFsgJ3RvcCcsICdib3R0b20nIF1cblxuICByZXR1cm4gYGFic29sdXRlLSR7IHRvcCA9PT0gdHJ1ZSA/IHBvc1sgMCBdIDogcG9zWyAxIF0gfSR7IGNvbG9yID8gYCB0ZXh0LSR7IGNvbG9yIH1gIDogJycgfWBcbn1cblxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5JyBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFicycsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NlbnRlcicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgICB9LFxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDYwMFxuICAgIH0sXG5cbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBzaHJpbms6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcblxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVCZ0NvbG9yOiBTdHJpbmcsXG4gICAgaW5kaWNhdG9yQ29sb3I6IFN0cmluZyxcbiAgICBsZWZ0SWNvbjogU3RyaW5nLFxuICAgIHJpZ2h0SWNvbjogU3RyaW5nLFxuXG4gICAgb3V0c2lkZUFycm93czogQm9vbGVhbixcbiAgICBtb2JpbGVBcnJvd3M6IEJvb2xlYW4sXG5cbiAgICBzd2l0Y2hJbmRpY2F0b3I6IEJvb2xlYW4sXG5cbiAgICBuYXJyb3dJbmRpY2F0b3I6IEJvb2xlYW4sXG4gICAgaW5saW5lTGFiZWw6IEJvb2xlYW4sXG4gICAgbm9DYXBzOiBCb29sZWFuLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyU2Nyb2xsVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyVXBkYXRlQXJyb3dzVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyQW5pbWF0ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyRm9jdXNUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVGb2N1c1RpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0OiByZWdpc3RlclNjcm9sbFRvVGFiVGltZW91dCwgcmVtb3ZlVGltZW91dDogcmVtb3ZlU2Nyb2xsVG9UYWJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBjb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBjdXJyZW50TW9kZWwgPSByZWYocHJvcHMubW9kZWxWYWx1ZSlcbiAgICBjb25zdCBzY3JvbGxhYmxlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGxlZnRBcnJvdyA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHJpZ2h0QXJyb3cgPSByZWYoZmFsc2UpXG4gICAgY29uc3QganVzdGlmeSA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IHRhYkRhdGFMaXN0ID0gW11cbiAgICBjb25zdCB0YWJEYXRhTGlzdExlbiA9IHJlZigwKVxuICAgIGNvbnN0IGhhc0ZvY3VzID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGwsIHNjcm9sbFRpbWVyID0gbnVsbCwgdW53YXRjaFJvdXRlXG5cbiAgICBjb25zdCB0YWJQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBhY3RpdmVDbGFzczogcHJvcHMuYWN0aXZlQ2xhc3MsXG4gICAgICBhY3RpdmVDb2xvcjogcHJvcHMuYWN0aXZlQ29sb3IsXG4gICAgICBhY3RpdmVCZ0NvbG9yOiBwcm9wcy5hY3RpdmVCZ0NvbG9yLFxuICAgICAgaW5kaWNhdG9yQ2xhc3M6IGdldEluZGljYXRvckNsYXNzKFxuICAgICAgICBwcm9wcy5pbmRpY2F0b3JDb2xvcixcbiAgICAgICAgcHJvcHMuc3dpdGNoSW5kaWNhdG9yLFxuICAgICAgICBwcm9wcy52ZXJ0aWNhbFxuICAgICAgKSxcbiAgICAgIG5hcnJvd0luZGljYXRvcjogcHJvcHMubmFycm93SW5kaWNhdG9yLFxuICAgICAgaW5saW5lTGFiZWw6IHByb3BzLmlubGluZUxhYmVsLFxuICAgICAgbm9DYXBzOiBwcm9wcy5ub0NhcHNcbiAgICB9KSlcblxuICAgIGNvbnN0IGhhc0FjdGl2ZVRhYiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGxlbiA9IHRhYkRhdGFMaXN0TGVuLnZhbHVlXG4gICAgICBjb25zdCB2YWwgPSBjdXJyZW50TW9kZWwudmFsdWVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGFiRGF0YUxpc3RbIGkgXS5uYW1lLnZhbHVlID09PSB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICBjb25zdCBhbGlnbkNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWxpZ24gPSBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ2xlZnQnXG4gICAgICAgIDogKGp1c3RpZnkudmFsdWUgPT09IHRydWUgPyAnanVzdGlmeScgOiBwcm9wcy5hbGlnbilcblxuICAgICAgcmV0dXJuIGBxLXRhYnNfX2NvbnRlbnQtLWFsaWduLSR7IGFsaWduIH1gXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFicyByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIGAgcS10YWJzLS0keyBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlID8gJycgOiAnbm90LScgfXNjcm9sbGFibGVgXG4gICAgICArIGAgcS10YWJzLS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcgfWBcbiAgICAgICsgYCBxLXRhYnNfX2Fycm93cy0tJHsgcHJvcHMub3V0c2lkZUFycm93cyA9PT0gdHJ1ZSA/ICdvdXRzaWRlJyA6ICdpbnNpZGUnIH1gXG4gICAgICArIGAgcS10YWJzLS1tb2JpbGUtd2l0aCR7IHByb3BzLm1vYmlsZUFycm93cyA9PT0gdHJ1ZSA/ICcnIDogJ291dCcgfS1hcnJvd3NgXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJzLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnNocmluayA9PT0gdHJ1ZSA/ICcgY29sLXNocmluaycgOiAnJylcbiAgICAgICsgKHByb3BzLnN0cmV0Y2ggPT09IHRydWUgPyAnIHNlbGYtc3RyZXRjaCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRhYnNfX2NvbnRlbnQgc2Nyb2xsLS1tb2JpbGUgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHNlbGYtc3RyZXRjaCBoaWRlLXNjcm9sbGJhciByZWxhdGl2ZS1wb3NpdGlvbiAnXG4gICAgICArIGFsaWduQ2xhc3MudmFsdWVcbiAgICAgICsgKHByb3BzLmNvbnRlbnRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5jb250ZW50Q2xhc3MgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBkb21Qcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8geyBjb250YWluZXI6ICdoZWlnaHQnLCBjb250ZW50OiAnb2Zmc2V0SGVpZ2h0Jywgc2Nyb2xsOiAnc2Nyb2xsSGVpZ2h0JyB9XG4gICAgICAgIDogeyBjb250YWluZXI6ICd3aWR0aCcsIGNvbnRlbnQ6ICdvZmZzZXRXaWR0aCcsIHNjcm9sbDogJ3Njcm9sbFdpZHRoJyB9XG4gICAgKSlcblxuICAgIGNvbnN0IGlzUlRMID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudmVydGljYWwgIT09IHRydWUgJiYgJHEubGFuZy5ydGwgPT09IHRydWUpXG4gICAgY29uc3QgcnRsUG9zQ29ycmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gZmFsc2UgJiYgaXNSVEwudmFsdWUgPT09IHRydWUpXG5cbiAgICB3YXRjaChpc1JUTCwgdXBkYXRlQXJyb3dzKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgbmFtZSA9PiB7XG4gICAgICB1cGRhdGVNb2RlbCh7IG5hbWUsIHNldEN1cnJlbnQ6IHRydWUsIHNraXBFbWl0OiB0cnVlIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm91dHNpZGVBcnJvd3MsIHJlY2FsY3VsYXRlU2Nyb2xsKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTW9kZWwgKHsgbmFtZSwgc2V0Q3VycmVudCwgc2tpcEVtaXQgfSkge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlbC52YWx1ZSA9PT0gbmFtZSkgcmV0dXJuXG5cbiAgICAgIGlmIChza2lwRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgc2V0Q3VycmVudCA9PT0gdHJ1ZVxuICAgICAgICB8fCBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gPT09IHZvaWQgMFxuICAgICAgKSB7XG4gICAgICAgIGFuaW1hdGUoY3VycmVudE1vZGVsLnZhbHVlLCBuYW1lKVxuICAgICAgICBjdXJyZW50TW9kZWwudmFsdWUgPSBuYW1lXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWxjdWxhdGVTY3JvbGwgKCkge1xuICAgICAgcmVnaXN0ZXJTY3JvbGxUaWNrKCgpID0+IHtcbiAgICAgICAgcm9vdFJlZi52YWx1ZSAmJiB1cGRhdGVDb250YWluZXIoe1xuICAgICAgICAgIHdpZHRoOiByb290UmVmLnZhbHVlLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogcm9vdFJlZi52YWx1ZS5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyIChkb21TaXplKSB7XG4gICAgICAvLyBpdCBjYW4gYmUgY2FsbGVkIGZhc3RlciB0aGFuIGNvbXBvbmVudCBiZWluZyBpbml0aWFsaXplZFxuICAgICAgLy8gc28gd2UgbmVlZCB0byBwcm90ZWN0IGFnYWluc3QgdGhhdCBjYXNlXG4gICAgICAvLyAob25lIGV4YW1wbGUgb2Ygc3VjaCBjYXNlIGlzIHRoZSBkb2NzIHJlbGVhc2Ugbm90ZXMgcGFnZSlcbiAgICAgIGlmIChkb21Qcm9wcy52YWx1ZSA9PT0gdm9pZCAwIHx8IGNvbnRlbnRSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplID0gZG9tU2l6ZVsgZG9tUHJvcHMudmFsdWUuY29udGFpbmVyIF0sXG4gICAgICAgIHNjcm9sbFNpemUgPSBNYXRoLm1pbihcbiAgICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBkb21Qcm9wcy52YWx1ZS5zY3JvbGwgXSxcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoXG4gICAgICAgICAgICBjb250ZW50UmVmLnZhbHVlLmNoaWxkcmVuLFxuICAgICAgICAgICAgKGFjYywgZWwpID0+IGFjYyArIChlbFsgZG9tUHJvcHMudmFsdWUuY29udGVudCBdIHx8IDApLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgc2Nyb2xsID0gc2l6ZSA+IDAgJiYgc2Nyb2xsU2l6ZSA+IHNpemUgLy8gd2hlbiB0aGVyZSBpcyBubyB0YWIsIGluIENocm9tZSwgc2l6ZSA9PT0gMCBhbmQgc2Nyb2xsU2l6ZSA9PT0gMVxuXG4gICAgICBzY3JvbGxhYmxlLnZhbHVlID0gc2Nyb2xsXG5cbiAgICAgIC8vIEFycm93cyBuZWVkIHRvIGJlIHVwZGF0ZWQgZXZlbiBpZiB0aGUgc2Nyb2xsIHN0YXR1cyB3YXMgYWxyZWFkeSB0cnVlXG4gICAgICBzY3JvbGwgPT09IHRydWUgJiYgcmVnaXN0ZXJVcGRhdGVBcnJvd3NUaWNrKHVwZGF0ZUFycm93cylcblxuICAgICAganVzdGlmeS52YWx1ZSA9IHNpemUgPCBwYXJzZUludChwcm9wcy5icmVha3BvaW50LCAxMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlIChvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICBjb25zdFxuICAgICAgICBvbGRUYWIgPSBvbGROYW1lICE9PSB2b2lkIDAgJiYgb2xkTmFtZSAhPT0gbnVsbCAmJiBvbGROYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG9sZE5hbWUpXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBuZXdUYWIgPSBuZXdOYW1lICE9PSB2b2lkIDAgJiYgbmV3TmFtZSAhPT0gbnVsbCAmJiBuZXdOYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG5ld05hbWUpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgIGlmIChoYWRBY3RpdmF0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgLy8gQWZ0ZXIgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiByZS1hY3RpdmF0ZWRcbiAgICAgICAgLy8gd2Ugc2hvdWxkIG5vdCBhbmltYXRlIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICAvLyBDb25zaWRlciBpdCBhcyBpZiB0aGUgY29tcG9uZW50IGhhcyBqdXN0IGJlZW4gbW91bnRlZC5cbiAgICAgICAgaGFkQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG9sZFRhYiAmJiBuZXdUYWIpIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBvbGRFbCA9IG9sZFRhYi50YWJJbmRpY2F0b3JSZWYudmFsdWUsXG4gICAgICAgICAgbmV3RWwgPSBuZXdUYWIudGFiSW5kaWNhdG9yUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgb2xkRWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBvbGRFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcblxuICAgICAgICBjb25zdFxuICAgICAgICAgIG9sZFBvcyA9IG9sZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIG5ld1BvcyA9IG5ld0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNmb3JtID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IGB0cmFuc2xhdGUzZCgwLCR7IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wIH1weCwwKSBzY2FsZTNkKDEsJHsgbmV3UG9zLmhlaWdodCA/IG9sZFBvcy5oZWlnaHQgLyBuZXdQb3MuaGVpZ2h0IDogMSB9LDEpYFxuICAgICAgICAgIDogYHRyYW5zbGF0ZTNkKCR7IG9sZFBvcy5sZWZ0IC0gbmV3UG9zLmxlZnQgfXB4LDAsMCkgc2NhbGUzZCgkeyBuZXdQb3Mud2lkdGggPyBvbGRQb3Mud2lkdGggLyBuZXdQb3Mud2lkdGggOiAxIH0sMSwxKWBcblxuICAgICAgICAvLyBhbGxvdyBzY29wZSB1cGRhdGVzIHRvIGtpY2sgaW4gKFFSb3V0ZVRhYiBuZWVkcyBtb3JlIHRpbWUpXG4gICAgICAgIHJlZ2lzdGVyQW5pbWF0ZVRpY2soKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gLjI1cyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKSdcbiAgICAgICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJ1xuICAgICAgICAgIH0sIDcwKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VGFiICYmIHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RhYkVsIChlbCkge1xuICAgICAgY29uc3RcbiAgICAgICAgeyBsZWZ0LCB3aWR0aCwgdG9wLCBoZWlnaHQgfSA9IGNvbnRlbnRSZWYudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIG5ld1BvcyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgIGxldCBvZmZzZXQgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IG5ld1Bvcy50b3AgLSB0b3AgOiBuZXdQb3MubGVmdCAtIGxlZnRcblxuICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgY29udGVudFJlZi52YWx1ZVsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JyBdICs9IE1hdGguZmxvb3Iob2Zmc2V0KVxuICAgICAgICB1cGRhdGVBcnJvd3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb2Zmc2V0ICs9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gbmV3UG9zLmhlaWdodCAtIGhlaWdodCA6IG5ld1Bvcy53aWR0aCAtIHdpZHRoXG4gICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxUb3AnIDogJ3Njcm9sbExlZnQnIF0gKz0gTWF0aC5jZWlsKG9mZnNldClcbiAgICAgICAgdXBkYXRlQXJyb3dzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBcnJvd3MgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYudmFsdWVcbiAgICAgIGlmIChjb250ZW50ID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29uc3RcbiAgICAgICAgcmVjdCA9IGNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHBvcyA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gY29udGVudC5zY3JvbGxUb3AgOiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpXG5cbiAgICAgIGlmIChpc1JUTC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsZWZ0QXJyb3cudmFsdWUgPSBNYXRoLmNlaWwocG9zICsgcmVjdC53aWR0aCkgPCBjb250ZW50LnNjcm9sbFdpZHRoIC0gMVxuICAgICAgICByaWdodEFycm93LnZhbHVlID0gcG9zID4gMFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxlZnRBcnJvdy52YWx1ZSA9IHBvcyA+IDBcbiAgICAgICAgcmlnaHRBcnJvdy52YWx1ZSA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgPyBNYXRoLmNlaWwocG9zICsgcmVjdC5oZWlnaHQpIDwgY29udGVudC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICA6IE1hdGguY2VpbChwb3MgKyByZWN0LndpZHRoKSA8IGNvbnRlbnQuc2Nyb2xsV2lkdGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltU2Nyb2xsVG8gKHZhbHVlKSB7XG4gICAgICBzY3JvbGxUaW1lciAhPT0gbnVsbCAmJiBjbGVhckludGVydmFsKHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChzY3JvbGxUb3dhcmRzKHZhbHVlKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgICAgfVxuICAgICAgfSwgNSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1N0YXJ0ICgpIHtcbiAgICAgIGFuaW1TY3JvbGxUbyhydGxQb3NDb3JyZWN0aW9uLnZhbHVlID09PSB0cnVlID8gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgOiAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvRW5kICgpIHtcbiAgICAgIGFuaW1TY3JvbGxUbyhydGxQb3NDb3JyZWN0aW9uLnZhbHVlID09PSB0cnVlID8gMCA6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3BBbmltU2Nyb2xsICgpIHtcbiAgICAgIGlmIChzY3JvbGxUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbFRpbWVyKVxuICAgICAgICBzY3JvbGxUaW1lciA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktiZE5hdmlnYXRlIChrZXlDb2RlLCBmcm9tRWwpIHtcbiAgICAgIGNvbnN0IHRhYnMgPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoXG4gICAgICAgIGNvbnRlbnRSZWYudmFsdWUuY2hpbGRyZW4sXG4gICAgICAgIGVsID0+IGVsID09PSBmcm9tRWwgfHwgKGVsLm1hdGNoZXMgJiYgZWwubWF0Y2hlcygnLnEtdGFiLnEtZm9jdXNhYmxlJykgPT09IHRydWUpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxlbiA9IHRhYnMubGVuZ3RoXG4gICAgICBpZiAobGVuID09PSAwKSByZXR1cm5cblxuICAgICAgaWYgKGtleUNvZGUgPT09IDM2KSB7IC8vIEhvbWVcbiAgICAgICAgc2Nyb2xsVG9UYWJFbCh0YWJzWyAwIF0pXG4gICAgICAgIHRhYnNbIDAgXS5mb2N1cygpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gMzUpIHsgLy8gRW5kXG4gICAgICAgIHNjcm9sbFRvVGFiRWwodGFic1sgbGVuIC0gMSBdKVxuICAgICAgICB0YWJzWyBsZW4gLSAxIF0uZm9jdXMoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJQcmV2ID0ga2V5Q29kZSA9PT0gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gMzggLyogQXJyb3dVcCAqLyA6IDM3IC8qIEFycm93TGVmdCAqLylcbiAgICAgIGNvbnN0IGRpck5leHQgPSBrZXlDb2RlID09PSAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyA0MCAvKiBBcnJvd0Rvd24gKi8gOiAzOSAvKiBBcnJvd1JpZ2h0ICovKVxuXG4gICAgICBjb25zdCBkaXIgPSBkaXJQcmV2ID09PSB0cnVlID8gLTEgOiAoZGlyTmV4dCA9PT0gdHJ1ZSA/IDEgOiB2b2lkIDApXG5cbiAgICAgIGlmIChkaXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBydGxEaXIgPSBpc1JUTC52YWx1ZSA9PT0gdHJ1ZSA/IC0xIDogMVxuICAgICAgICBjb25zdCBpbmRleCA9IHRhYnMuaW5kZXhPZihmcm9tRWwpICsgZGlyICogcnRsRGlyXG5cbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICBzY3JvbGxUb1RhYkVsKHRhYnNbIGluZGV4IF0pXG4gICAgICAgICAgdGFic1sgaW5kZXggXS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbGV0J3Mgc3BlZWQgdXAgZXhlY3V0aW9uIG9mIHRpbWUtc2Vuc2l0aXZlIHNjcm9sbFRvd2FyZHMoKVxuICAgIC8vIHdpdGggYSBjb21wdXRlZCB2YXJpYWJsZSBieSBkaXJlY3RseSBhcHBseWluZyB0aGUgbWluaW1hbFxuICAgIC8vIG51bWJlciBvZiBpbnN0cnVjdGlvbnMgb24gZ2V0L3NldCBmdW5jdGlvbnNcbiAgICBjb25zdCBwb3NGbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWVcbiAgICAgICAgPyB7IGdldDogY29udGVudCA9PiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gLXBvcyB9IH1cbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IHsgZ2V0OiBjb250ZW50ID0+IGNvbnRlbnQuc2Nyb2xsVG9wLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxUb3AgPSBwb3MgfSB9XG4gICAgICAgICAgICAgIDogeyBnZXQ6IGNvbnRlbnQgPT4gY29udGVudC5zY3JvbGxMZWZ0LCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gcG9zIH0gfVxuICAgICAgICAgIClcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG93YXJkcyAodmFsdWUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50UmVmLnZhbHVlLFxuICAgICAgICB7IGdldCwgc2V0IH0gPSBwb3NGbi52YWx1ZVxuXG4gICAgICBsZXRcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICBwb3MgPSBnZXQoY29udGVudClcblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdmFsdWUgPCBwb3MgPyAtMSA6IDFcblxuICAgICAgcG9zICs9IGRpcmVjdGlvbiAqIDVcblxuICAgICAgaWYgKHBvcyA8IDApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gMFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIChkaXJlY3Rpb24gPT09IC0xICYmIHBvcyA8PSB2YWx1ZSlcbiAgICAgICAgfHwgKGRpcmVjdGlvbiA9PT0gMSAmJiBwb3MgPj0gdmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gdmFsdWVcbiAgICAgIH1cblxuICAgICAgc2V0KGNvbnRlbnQsIHBvcylcbiAgICAgIHVwZGF0ZUFycm93cygpXG5cbiAgICAgIHJldHVybiBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzUXVlcnlJbmNsdWRlZCAodGFyZ2V0UXVlcnksIG1hdGNoaW5nUXVlcnkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRhcmdldFF1ZXJ5KSB7XG4gICAgICAgIGlmICh0YXJnZXRRdWVyeVsga2V5IF0gIT09IG1hdGNoaW5nUXVlcnlbIGtleSBdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvLyAxLiBEbyBub3QgdXNlIGRpcmVjdGx5OyB1c2UgdmVyaWZ5Um91dGVNb2RlbCgpIGluc3RlYWRcbiAgICAvLyAyLiBTaG91bGQgc2V0IGhhZEFjdGl2YXRlZCB0byBmYWxzZSB1cG9uIGV4aXRcbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVSb3V0ZSAoKSB7XG4gICAgICBsZXQgbmFtZSA9IG51bGwsIGJlc3RTY29yZSA9IHsgbWF0Y2hlZExlbjogMCwgcXVlcnlEaWZmOiA5OTk5LCBocmVmTGVuOiAwIH1cblxuICAgICAgY29uc3QgbGlzdCA9IHRhYkRhdGFMaXN0LmZpbHRlcih0YWIgPT4gdGFiLnJvdXRlRGF0YT8uaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnN0IHsgaGFzaDogY3VycmVudEhhc2gsIHF1ZXJ5OiBjdXJyZW50UXVlcnkgfSA9IHByb3h5LiRyb3V0ZVxuICAgICAgY29uc3QgY3VycmVudFF1ZXJ5TGVuID0gT2JqZWN0LmtleXMoY3VycmVudFF1ZXJ5KS5sZW5ndGhcblxuICAgICAgLy8gVnVlIFJvdXRlciBkb2VzIG5vdCBrZWVwIGFjY291bnQgb2YgaGFzaCAmIHF1ZXJ5IHdoZW4gbWF0Y2hpbmdcbiAgICAgIC8vIHNvIHdlJ3JlIGRvaW5nIHRoaXMgYXMgd2VsbFxuXG4gICAgICBmb3IgKGNvbnN0IHRhYiBvZiBsaXN0KSB7XG4gICAgICAgIGNvbnN0IGV4YWN0ID0gdGFiLnJvdXRlRGF0YS5leGFjdC52YWx1ZSA9PT0gdHJ1ZVxuXG4gICAgICAgIGlmICh0YWIucm91dGVEYXRhWyBleGFjdCA9PT0gdHJ1ZSA/ICdsaW5rSXNFeGFjdEFjdGl2ZScgOiAnbGlua0lzQWN0aXZlJyBdLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaXQgY2Fubm90IG1hdGNoIGFueXRoaW5nIGFzIGl0J3Mgbm90IGFjdGl2ZSBub3IgZXhhY3QtYWN0aXZlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgaGFzaCwgcXVlcnksIG1hdGNoZWQsIGhyZWYgfSA9IHRhYi5yb3V0ZURhdGEucmVzb2x2ZWRMaW5rLnZhbHVlXG4gICAgICAgIGNvbnN0IHF1ZXJ5TGVuID0gT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aFxuXG4gICAgICAgIGlmIChleGFjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgaGFzaFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBxdWVyeUxlbiAhPT0gY3VycmVudFF1ZXJ5TGVuXG4gICAgICAgICAgICB8fCBoYXNRdWVyeUluY2x1ZGVkKGN1cnJlbnRRdWVyeSwgcXVlcnkpID09PSBmYWxzZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgcXVlcnlcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8geWV5LCB3ZSBmb3VuZCB0aGUgcGVyZmVjdCBtYXRjaCAocm91dGUgKyBoYXNoICsgcXVlcnkpXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNoICE9PSAnJyAmJiBoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgIC8vIGl0IGhhcyBoYXNoIGFuZCBpdCBkb2Vzbid0IG1hdGNoZXNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHF1ZXJ5TGVuICE9PSAwXG4gICAgICAgICAgJiYgaGFzUXVlcnlJbmNsdWRlZChxdWVyeSwgY3VycmVudFF1ZXJ5KSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gaXQgaGFzIHF1ZXJ5IGFuZCBpdCBkb2Vzbid0IGluY2x1ZGVzIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IHtcbiAgICAgICAgICBtYXRjaGVkTGVuOiBtYXRjaGVkLmxlbmd0aCxcbiAgICAgICAgICBxdWVyeURpZmY6IGN1cnJlbnRRdWVyeUxlbiAtIHF1ZXJ5TGVuLFxuICAgICAgICAgIGhyZWZMZW46IGhyZWYubGVuZ3RoIC0gaGFzaC5sZW5ndGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuID4gYmVzdFNjb3JlLm1hdGNoZWRMZW4pIHtcbiAgICAgICAgICAvLyBpdCBtYXRjaGVzIG1vcmUgcm91dGVzIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuICE9PSBiZXN0U2NvcmUubWF0Y2hlZExlbikge1xuICAgICAgICAgIC8vIGl0IG1hdGNoZXMgbGVzcyByb3V0ZXMgdGhhbiB0aGUgY3VycmVudCBjaGFtcGlvbiBzbyB3ZSBkaXNjYXJkIGl0XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5xdWVyeURpZmYgPCBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gcXVlcnkgaXMgY2xvc2VyIHRvIHRoZSBjdXJyZW50IG9uZSBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3U2NvcmUucXVlcnlEaWZmICE9PSBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gaXQgbWF0Y2hlcyBsZXNzIHJvdXRlcyB0aGFuIHRoZSBjdXJyZW50IGNoYW1waW9uIHNvIHdlIGRpc2NhcmQgaXRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLmhyZWZMZW4gPiBiZXN0U2NvcmUuaHJlZkxlbikge1xuICAgICAgICAgIC8vIGhyZWYgaXMgbGVuZ3RoaWVyIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBuYW1lID09PSBudWxsXG4gICAgICAgICYmIHRhYkRhdGFMaXN0LnNvbWUodGFiID0+IHRhYi5yb3V0ZURhdGEgPT09IHZvaWQgMCAmJiB0YWIubmFtZS52YWx1ZSA9PT0gY3VycmVudE1vZGVsLnZhbHVlKSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZG4ndCBpbnRlcmZlcmUgaWYgbm9uLXJvdXRlIHRhYiBpcyBhY3RpdmVcbiAgICAgICAgaGFkQWN0aXZhdGVkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1vZGVsKHsgbmFtZSwgc2V0Q3VycmVudDogdHJ1ZSB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNpbiAoZSkge1xuICAgICAgcmVtb3ZlRm9jdXNUaW1lb3V0KClcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNGb2N1cy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiByb290UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIGUudGFyZ2V0XG4gICAgICAgICYmIHR5cGVvZiBlLnRhcmdldC5jbG9zZXN0ID09PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdGFiID0gZS50YXJnZXQuY2xvc2VzdCgnLnEtdGFiJylcblxuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGlzIGNvbnRhaW5lZCBieSBhIFFUYWIvUVJvdXRlVGFiXG4gICAgICAgIC8vIChpdCBtaWdodCBiZSBvdGhlciBlbGVtZW50cyBmb2N1c2VkLCBsaWtlIGFkZGl0aW9uYWwgUUJ0bilcbiAgICAgICAgaWYgKHRhYiAmJiByb290UmVmLnZhbHVlLmNvbnRhaW5zKHRhYikgPT09IHRydWUpIHtcbiAgICAgICAgICBoYXNGb2N1cy52YWx1ZSA9IHRydWVcbiAgICAgICAgICBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlICYmIHNjcm9sbFRvVGFiRWwodGFiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoKSB7XG4gICAgICByZWdpc3RlckZvY3VzVGltZW91dCgoKSA9PiB7IGhhc0ZvY3VzLnZhbHVlID0gZmFsc2UgfSwgMzApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Um91dGVNb2RlbCAoKSB7XG4gICAgICBpZiAoJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlZ2lzdGVyU2Nyb2xsVG9UYWJUaW1lb3V0KHVwZGF0ZUFjdGl2ZVJvdXRlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVNjcm9sbFRvVGFiVGltZW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2F0Y2hSb3V0ZSAoKSB7XG4gICAgICBpZiAodW53YXRjaFJvdXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgdW53YXRjaCA9IHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgdmVyaWZ5Um91dGVNb2RlbClcbiAgICAgICAgdW53YXRjaFJvdXRlID0gKCkgPT4ge1xuICAgICAgICAgIHVud2F0Y2goKVxuICAgICAgICAgIHVud2F0Y2hSb3V0ZSA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJUYWIgKHRhYkRhdGEpIHtcbiAgICAgIHRhYkRhdGFMaXN0LnB1c2godGFiRGF0YSlcbiAgICAgIHRhYkRhdGFMaXN0TGVuLnZhbHVlKytcblxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuXG4gICAgICAvLyBpZiBpdCdzIGEgUVRhYiBvciB3ZSBkb24ndCBoYXZlIFZ1ZSBSb3V0ZXJcbiAgICAgIGlmICh0YWJEYXRhLnJvdXRlRGF0YSA9PT0gdm9pZCAwIHx8IHByb3h5LiRyb3V0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZCBwb3NpdGlvbiB0byB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWIgKGlmIGFueSlcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxUb1RhYlRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRNb2RlbC52YWx1ZVxuICAgICAgICAgICAgY29uc3QgbmV3VGFiID0gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJydcbiAgICAgICAgICAgICAgPyB0YWJEYXRhTGlzdC5maW5kKHRhYiA9PiB0YWIubmFtZS52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgIDogbnVsbFxuXG4gICAgICAgICAgICBuZXdUYWIgJiYgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBlbHNlIGlmIGl0J3MgYSBRUm91dGVUYWIgd2l0aCBhIHZhbGlkIGxpbmtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBzdGFydCB3YXRjaGluZyByb3V0ZVxuICAgICAgICB3YXRjaFJvdXRlKClcblxuICAgICAgICBpZiAodGFiRGF0YS5yb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5yZWdpc3RlclRhYiAodGFiRGF0YSkge1xuICAgICAgdGFiRGF0YUxpc3Quc3BsaWNlKHRhYkRhdGFMaXN0LmluZGV4T2YodGFiRGF0YSksIDEpXG4gICAgICB0YWJEYXRhTGlzdExlbi52YWx1ZS0tXG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcblxuICAgICAgaWYgKHVud2F0Y2hSb3V0ZSAhPT0gdm9pZCAwICYmIHRhYkRhdGEucm91dGVEYXRhICE9PSB2b2lkIDApIHtcbiAgICAgICAgLy8gdW53YXRjaCByb3V0ZSBpZiB3ZSBkb24ndCBoYXZlIGFueSBRUm91dGVUYWJzIGxlZnRcbiAgICAgICAgaWYgKHRhYkRhdGFMaXN0LmV2ZXJ5KHRhYiA9PiB0YWIucm91dGVEYXRhID09PSB2b2lkIDApID09PSB0cnVlKSB7XG4gICAgICAgICAgdW53YXRjaFJvdXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZW4gdXBkYXRlIG1vZGVsXG4gICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0ICR0YWJzID0ge1xuICAgICAgY3VycmVudE1vZGVsLFxuICAgICAgdGFiUHJvcHMsXG4gICAgICBoYXNGb2N1cyxcbiAgICAgIGhhc0FjdGl2ZVRhYixcblxuICAgICAgcmVnaXN0ZXJUYWIsXG4gICAgICB1bnJlZ2lzdGVyVGFiLFxuXG4gICAgICB2ZXJpZnlSb3V0ZU1vZGVsLFxuICAgICAgdXBkYXRlTW9kZWwsXG4gICAgICBvbktiZE5hdmlnYXRlLFxuXG4gICAgICBhdm9pZFJvdXRlV2F0Y2hlcjogZmFsc2UgLy8gZmFsc2UgfCBzdHJpbmcgKHVpZClcbiAgICB9XG5cbiAgICBwcm92aWRlKHRhYnNLZXksICR0YWJzKVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBhbmltYXRlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgIHVud2F0Y2hSb3V0ZT8uKClcbiAgICB9XG5cbiAgICBsZXQgaGFkUm91dGVXYXRjaGVyLCBoYWRBY3RpdmF0ZWRcblxuICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBoYWRSb3V0ZVdhdGNoZXIgPSB1bndhdGNoUm91dGUgIT09IHZvaWQgMFxuICAgICAgY2xlYW51cCgpXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGlmIChoYWRSb3V0ZVdhdGNoZXIgPT09IHRydWUpIHtcbiAgICAgICAgd2F0Y2hSb3V0ZSgpXG4gICAgICAgIGhhZEFjdGl2YXRlZCA9IHRydWVcbiAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICB9XG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHJvbGU6ICd0YWJsaXN0JyxcbiAgICAgICAgb25Gb2N1c2luLFxuICAgICAgICBvbkZvY3Vzb3V0XG4gICAgICB9LCBbXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiB1cGRhdGVDb250YWluZXIgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogY29udGVudFJlZixcbiAgICAgICAgICBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgICBvblNjcm9sbDogdXBkYXRlQXJyb3dzXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSxcblxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYnNfX2Fycm93IHEtdGFic19fYXJyb3ctLWxlZnQgYWJzb2x1dGUgcS10YWJfX2ljb24nXG4gICAgICAgICAgICArIChsZWZ0QXJyb3cudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS10YWJzX19hcnJvdy0tZmFkZWQnKSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5sZWZ0SWNvbiB8fCAkcS5pY29uU2V0LnRhYnNbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0JyBdLFxuICAgICAgICAgIG9uTW91c2Vkb3duUGFzc2l2ZTogc2Nyb2xsVG9TdGFydCxcbiAgICAgICAgICBvblRvdWNoc3RhcnRQYXNzaXZlOiBzY3JvbGxUb1N0YXJ0LFxuICAgICAgICAgIG9uTW91c2V1cFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uTW91c2VsZWF2ZVBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uVG91Y2hlbmRQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbFxuICAgICAgICB9KSxcblxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYnNfX2Fycm93IHEtdGFic19fYXJyb3ctLXJpZ2h0IGFic29sdXRlIHEtdGFiX19pY29uJ1xuICAgICAgICAgICAgKyAocmlnaHRBcnJvdy52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLXRhYnNfX2Fycm93LS1mYWRlZCcpLFxuICAgICAgICAgIG5hbWU6IHByb3BzLnJpZ2h0SWNvbiB8fCAkcS5pY29uU2V0LnRhYnNbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2Rvd24nIDogJ3JpZ2h0JyBdLFxuICAgICAgICAgIG9uTW91c2Vkb3duUGFzc2l2ZTogc2Nyb2xsVG9FbmQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0UGFzc2l2ZTogc2Nyb2xsVG9FbmQsXG4gICAgICAgICAgb25Nb3VzZXVwUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Nb3VzZWxlYXZlUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Ub3VjaGVuZFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHVzZVBhbmVsQ2hpbGRQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBhbmVsL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiUGFuZWwnLFxuXG4gIHByb3BzOiB1c2VQYW5lbENoaWxkUHJvcHMsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWItcGFuZWwnLCByb2xlOiAndGFicGFuZWwnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQYW5lbCwgeyB1c2VQYW5lbFByb3BzLCB1c2VQYW5lbEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVscycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wc1xuICB9LFxuXG4gIGVtaXRzOiB1c2VQYW5lbEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3QgeyB1cGRhdGVQYW5lbHNMaXN0LCBnZXRQYW5lbENvbnRlbnQsIHBhbmVsRGlyZWN0aXZlcyB9ID0gdXNlUGFuZWwoKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10YWItcGFuZWxzIHEtcGFuZWwtcGFyZW50J1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYi1wYW5lbHMtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0KHNsb3RzKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgZ2V0UGFuZWxDb250ZW50KCksXG4gICAgICAgICdwYW4nLFxuICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICgpID0+IHBhbmVsRGlyZWN0aXZlcy52YWx1ZVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cclxuICA8cS1mb3JtIEBzdWJtaXQucHJldmVudD1cImxvZ2luXCI+XHJcbiAgICA8cS1pbnB1dCB2LW1vZGVsPVwidXNlcm5hbWVcIiBsYWJlbD1cIlVzZXJuYW1lIG9yIEVtYWlsXCIgZmlsbGVkIC8+XHJcbiAgICA8cS1pbnB1dCB2LW1vZGVsPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIiBsYWJlbD1cIlBhc3N3b3JkXCIgZmlsbGVkIC8+XHJcblxyXG4gICAgPHEtYnRuIGxhYmVsPVwiTG9naW5cIiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJzZWNvbmRhcnlcIiAvPlxyXG4gICAgPGRpdiB2LWlmPVwiZXJyb3JcIiBjbGFzcz1cInRleHQtbmVnYXRpdmUgcS1tdC1tZFwiPnt7IGVycm9yIH19PC9kaXY+XHJcbiAgPC9xLWZvcm0+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXHJcbmltcG9ydCBjYXJ0IGZyb20gJ3NyYy9zdG9yZXMvY2FydC5qcyc7XHJcblxyXG5jb25zdCB1c2VybmFtZSA9IHJlZignJylcclxuY29uc3QgcGFzc3dvcmQgPSByZWYoJycpXHJcbmNvbnN0IGVycm9yID0gcmVmKCcnKVxyXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoWydsb2dpbi1zdWNjZXNzJ10pO1xyXG5jb25zdCBhZGRlZEl0ZW1zID0gcmVmKCcnKTtcclxuYXN5bmMgZnVuY3Rpb24gbG9naW4oKSB7XHJcbiAgdHJ5IHtcclxuXHJcbmNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL251eHQubWVpZGFubS5jb20vd3AtanNvbi9qd3QtYXV0aC92MS90b2tlbicsIHtcclxuICBtZXRob2Q6ICdQT1NUJyxcclxuICBoZWFkZXJzOiB7XHJcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgfSxcclxuICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICB1c2VybmFtZTogdXNlcm5hbWUudmFsdWUsXHJcbiAgICBwYXNzd29yZDogcGFzc3dvcmQudmFsdWVcclxuICB9KVxyXG59KVxyXG5cclxuY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XHJcblxyXG5pZiAoZGF0YS50b2tlbikge1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdqd3RfdG9rZW4nLCBkYXRhLnRva2VuKTsgLy8gU3RvcmUgdG9rZW5cclxuICBlbWl0KCdsb2dpbi1zdWNjZXNzJywgZGF0YS50b2tlbik7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdMb2dpbiBzdWNjZXNzZnVsOicsIGRhdGEpO1xyXG59IGVsc2Uge1xyXG4gIGNvbnNvbGUuZXJyb3IoJ0xvZ2luIGZhaWxlZDonLCBkYXRhLm1lc3NhZ2UpO1xyXG59XHJcblxyXG5jb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqd3RfdG9rZW4nKTtcclxuXHJcbmNvbnN0IHVzZXJSZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd3AvdjIvdXNlcnMvbWUnLCB7XHJcbiAgaGVhZGVyczoge1xyXG4gICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWBcclxuICB9XHJcbn0pO1xyXG5jb25zdCB1c2VyID0gYXdhaXQgdXNlclJlcy5qc29uKCk7XHJcbmNvbnNvbGUubG9nKHVzZXIpO1xyXG5jYXJ0LnN0YXRlLnVzZXIgPSB1c2VyO1xyXG5jb25zb2xlLmxvZyhjYXJ0LnN0YXRlLnVzZXIpO1xyXG5jb25zdCBndWVzdENhcnQgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd2Mvc3RvcmUvdjEvY2FydCcsIHtcclxuICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXHJcbn0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcblxyXG4vLyBBZnRlciBsb2dpbiwgZ2V0IHRoZSB1c2VyIGNhcnRcclxuY29uc3QgdXNlckNhcnQgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd2Mvc3RvcmUvdjEvY2FydCcsIHtcclxuICBoZWFkZXJzOiB7XHJcbiAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gIH0sXHJcbiAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xyXG59KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG5jb25zb2xlLmxvZyh1c2VyQ2FydCk7XHJcbi8vIElmIHVzZXIgY2FydCBpcyBlbXB0eSBhbmQgZ3Vlc3QgY2FydCBoYWQgaXRlbXMsIHN5bmNcclxuaWYgKHVzZXJDYXJ0Lml0ZW1zX2NvdW50ID09PSAwICYmIGd1ZXN0Q2FydC5pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgZm9yIChjb25zdCBpdGVtIG9mIGd1ZXN0Q2FydC5pdGVtcykge1xyXG4gICAgY29uc3QgaXRlbVJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL251eHQubWVpZGFubS5jb20vd3AtanNvbi93Yy9zdG9yZS92MS9jYXJ0L2FkZC1pdGVtJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWBcclxuICAgICAgfSxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGlkOiBpdGVtLmlkLFxyXG4gICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgYWRkZWRJdGVtcy52YWx1ZSA9IGF3YWl0IGl0ZW1SZXMuanNvbigpO1xyXG4gIH1cclxuXHJcbiAgICBjYXJ0LnN0YXRlLml0ZW1zID0gYWRkZWRJdGVtcy52YWx1ZS5pdGVtcyB8fCBbXTtcclxuICAgIGNhcnQuc3RhdGUuaXRlbXNfY291bnQgPSBhZGRlZEl0ZW1zLnZhbHVlLml0ZW1zX2NvdW50IHx8IDA7XHJcbiAgICBjYXJ0LnN0YXRlLnRvdGFscyA9IGFkZGVkSXRlbXMudmFsdWUudG90YWxzIHx8IHt9O1xyXG4gICAgY2FydC5zdGF0ZS5jb3Vwb25zID0gYWRkZWRJdGVtcy52YWx1ZS5jb3Vwb25zIHx8IFtdO1xyXG4gICAgY2FydC5zdGF0ZS5jYXJ0X2FycmF5ID0gYWRkZWRJdGVtcy52YWx1ZSB8fCBbXTtcclxuXHJcbiAgY29uc29sZS5sb2coJ2xvbmdlciEhIScpO1xyXG59XHJcblxyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgZXJyb3IudmFsdWUgPSAnU2VydmVyIGVycm9yJztcclxuICAgIGNvbnNvbGUubG9nKGVycilcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiIsImltcG9ydCB7IGgsIG9uQmVmb3JlVW5tb3VudCwgVHJhbnNpdGlvbiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNsaWRlVHJhbnNpdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhcHBlYXI6IEJvb2xlYW4sXG4gICAgZHVyYXRpb246IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnc2hvdycsICdoaWRlJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgbGV0IGFuaW1hdGluZyA9IGZhbHNlLCBkb25lRm4sIGVsZW1lbnRcbiAgICBsZXQgdGltZXIgPSBudWxsLCB0aW1lckZhbGxiYWNrID0gbnVsbCwgYW5pbUxpc3RlbmVyLCBsYXN0RXZlbnRcblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgZG9uZUZuPy4oKVxuICAgICAgZG9uZUZuID0gbnVsbFxuICAgICAgYW5pbWF0aW5nID0gZmFsc2VcblxuICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lckZhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lckZhbGxiYWNrKVxuICAgICAgICB0aW1lckZhbGxiYWNrID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbGVtZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYW5pbUxpc3RlbmVyKVxuICAgICAgYW5pbUxpc3RlbmVyID0gbnVsbFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJlZ2luIChlbCwgaGVpZ2h0LCBkb25lKSB7XG4gICAgICAvLyBoZXJlIG92ZXJmbG93WSBpcyAnaGlkZGVuJ1xuICAgICAgaWYgKGhlaWdodCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBoZWlnaHQgfXB4YFxuICAgICAgfVxuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbiA9IGBoZWlnaHQgJHsgcHJvcHMuZHVyYXRpb24gfW1zIGN1YmljLWJlemllciguMjUsIC44LCAuNTAsIDEpYFxuXG4gICAgICBhbmltYXRpbmcgPSB0cnVlXG4gICAgICBkb25lRm4gPSBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kIChlbCwgZXZlbnQpIHtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9IG51bGxcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IG51bGxcbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBudWxsXG4gICAgICBjbGVhbnVwKClcbiAgICAgIGV2ZW50ICE9PSBsYXN0RXZlbnQgJiYgZW1pdChldmVudClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkVudGVyIChlbCwgZG9uZSkge1xuICAgICAgbGV0IHBvcyA9IDBcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICAvLyBpZiBhbmltYXRpb25nIG92ZXJmbG93WSBpcyBhbHJlYWR5ICdoaWRkZW4nXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgICBwb3MgPSBlbC5vZmZzZXRIZWlnaHQgPT09IGVsLnNjcm9sbEhlaWdodCA/IDAgOiB2b2lkIDBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYXN0RXZlbnQgPSAnaGlkZSdcbiAgICAgICAgZWwuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICAgIH1cblxuICAgICAgYmVnaW4oZWwsIHBvcywgZG9uZSlcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAkeyBlbC5zY3JvbGxIZWlnaHQgfXB4YFxuICAgICAgICBhbmltTGlzdGVuZXIgPSBldnQgPT4ge1xuICAgICAgICAgIHRpbWVyRmFsbGJhY2sgPSBudWxsXG5cbiAgICAgICAgICBpZiAoT2JqZWN0KGV2dCkgIT09IGV2dCB8fCBldnQudGFyZ2V0ID09PSBlbCkge1xuICAgICAgICAgICAgZW5kKGVsLCAnc2hvdycpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBhbmltTGlzdGVuZXIpXG4gICAgICAgIHRpbWVyRmFsbGJhY2sgPSBzZXRUaW1lb3V0KGFuaW1MaXN0ZW5lciwgcHJvcHMuZHVyYXRpb24gKiAxLjEpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25MZWF2ZSAoZWwsIGRvbmUpIHtcbiAgICAgIGxldCBwb3NcbiAgICAgIGVsZW1lbnQgPSBlbFxuXG4gICAgICBpZiAoYW5pbWF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFudXAoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxhc3RFdmVudCA9ICdzaG93J1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIHNldCBvdmVyZmxvd1kgJ2hpZGRlbicgYmVmb3JlIGNhbGN1bGF0aW5nIHRoZSBoZWlnaHRcbiAgICAgICAgLy8gb3IgZWxzZSB3ZSBnZXQgc21hbGwgZGlmZmVyZW5jZXNcbiAgICAgICAgZWwuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICAgICAgcG9zID0gZWwuc2Nyb2xsSGVpZ2h0XG4gICAgICB9XG5cbiAgICAgIGJlZ2luKGVsLCBwb3MsIGRvbmUpXG5cbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAwXG4gICAgICAgIGFuaW1MaXN0ZW5lciA9IGV2dCA9PiB7XG4gICAgICAgICAgdGltZXJGYWxsYmFjayA9IG51bGxcblxuICAgICAgICAgIGlmIChPYmplY3QoZXZ0KSAhPT0gZXZ0IHx8IGV2dC50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgICBlbmQoZWwsICdoaWRlJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFuaW1MaXN0ZW5lcilcbiAgICAgICAgdGltZXJGYWxsYmFjayA9IHNldFRpbWVvdXQoYW5pbUxpc3RlbmVyLCBwcm9wcy5kdXJhdGlvbiAqIDEuMSlcbiAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgYW5pbWF0aW5nID09PSB0cnVlICYmIGNsZWFudXAoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaChUcmFuc2l0aW9uLCB7XG4gICAgICBjc3M6IGZhbHNlLFxuICAgICAgYXBwZWFyOiBwcm9wcy5hcHBlYXIsXG4gICAgICBvbkVudGVyLFxuICAgICAgb25MZWF2ZVxuICAgIH0sIHNsb3RzLmRlZmF1bHQpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBzaGFsbG93UmVhY3RpdmUsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlLCB2U2hvdywgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUl0ZW0gZnJvbSAnLi4vaXRlbS9RSXRlbS5qcydcbmltcG9ydCBRSXRlbVNlY3Rpb24gZnJvbSAnLi4vaXRlbS9RSXRlbVNlY3Rpb24uanMnXG5pbXBvcnQgUUl0ZW1MYWJlbCBmcm9tICcuLi9pdGVtL1FJdGVtTGFiZWwuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU2xpZGVUcmFuc2l0aW9uIGZyb20gJy4uL3NsaWRlLXRyYW5zaXRpb24vUVNsaWRlVHJhbnNpdGlvbi5qcydcbmltcG9ydCBRU2VwYXJhdG9yIGZyb20gJy4uL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZUlkIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1pZC91c2UtaWQuanMnXG5pbXBvcnQgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yb3V0ZXItbGluay91c2Utcm91dGVyLWxpbmsuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC91aWQuanMnXG5cbmNvbnN0IGl0ZW1Hcm91cHMgPSBzaGFsbG93UmVhY3RpdmUoe30pXG5jb25zdCBMSU5LX1BST1BTID0gT2JqZWN0LmtleXModXNlUm91dGVyTGlua1Byb3BzKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUV4cGFuc2lvbkl0ZW0nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBsYWJlbExpbmVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBjYXB0aW9uOiBTdHJpbmcsXG4gICAgY2FwdGlvbkxpbmVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIHRvZ2dsZUFyaWFMYWJlbDogU3RyaW5nLFxuICAgIGV4cGFuZEljb246IFN0cmluZyxcbiAgICBleHBhbmRlZEljb246IFN0cmluZyxcbiAgICBleHBhbmRJY29uQ2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgZHVyYXRpb246IHt9LFxuXG4gICAgaGVhZGVySW5zZXRMZXZlbDogTnVtYmVyLFxuICAgIGNvbnRlbnRJbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICBleHBhbmRTZXBhcmF0b3I6IEJvb2xlYW4sXG4gICAgZGVmYXVsdE9wZW5lZDogQm9vbGVhbixcbiAgICBoaWRlRXhwYW5kSWNvbjogQm9vbGVhbixcbiAgICBleHBhbmRJY29uVG9nZ2xlOiBCb29sZWFuLFxuICAgIHN3aXRjaFRvZ2dsZVNpZGU6IEJvb2xlYW4sXG4gICAgZGVuc2VUb2dnbGU6IEJvb2xlYW4sXG4gICAgZ3JvdXA6IFN0cmluZyxcbiAgICBwb3B1cDogQm9vbGVhbixcblxuICAgIGhlYWRlclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhlYWRlckNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdhZnRlclNob3cnLCAnYWZ0ZXJIaWRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGxcbiAgICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgIDogcHJvcHMuZGVmYXVsdE9wZW5lZFxuICAgIClcblxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRVaWQgPSB1c2VJZCgpXG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUsIHRvZ2dsZSB9ID0gdXNlTW9kZWxUb2dnbGUoeyBzaG93aW5nIH0pXG5cbiAgICBsZXQgdW5pcXVlSWQsIGV4aXRHcm91cFxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1leHBhbnNpb24taXRlbSBxLWl0ZW0tdHlwZSdcbiAgICAgICsgYCBxLWV4cGFuc2lvbi1pdGVtLS0keyBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnIH1gXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgcHJvcHMucG9wdXAgPT09IHRydWUgPyAncG9wdXAnIDogJ3N0YW5kYXJkJyB9YFxuICAgIClcblxuICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ1JpZ2h0JyA6ICdMZWZ0J1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgWyAncGFkZGluZycgKyBkaXIgXTogKHByb3BzLmNvbnRlbnRJbnNldExldmVsICogNTYpICsgJ3B4J1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBoYXNMaW5rID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKFxuICAgICAgICBwcm9wcy5ocmVmICE9PSB2b2lkIDBcbiAgICAgICAgfHwgKHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IGxpbmtQcm9wcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG4gICAgICBMSU5LX1BST1BTLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgYWNjWyBrZXkgXSA9IHByb3BzWyBrZXkgXVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBwcm9wcy5leHBhbmRJY29uVG9nZ2xlICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgZXhwYW5zaW9uSWNvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmV4cGFuZGVkSWNvbiAhPT0gdm9pZCAwICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5leHBhbmRlZEljb25cbiAgICAgICAgOiBwcm9wcy5leHBhbmRJY29uIHx8ICRxLmljb25TZXQuZXhwYW5zaW9uSXRlbVsgcHJvcHMuZGVuc2VUb2dnbGUgPT09IHRydWUgPyAnZGVuc2VJY29uJyA6ICdpY29uJyBdXG4gICAgKSlcblxuICAgIGNvbnN0IGFjdGl2ZVRvZ2dsZUljb24gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAoaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBwcm9wcy5leHBhbmRJY29uVG9nZ2xlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IGhlYWRlclNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBleHBhbmRlZDogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgIGRldGFpbHNJZDogdGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgdG9nZ2xlLFxuICAgICAgc2hvdyxcbiAgICAgIGhpZGVcbiAgICB9KSlcblxuICAgIGNvbnN0IHRvZ2dsZUFyaWFBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRvZ2dsZUFyaWFMYWJlbCA9IHByb3BzLnRvZ2dsZUFyaWFMYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMudG9nZ2xlQXJpYUxhYmVsXG4gICAgICAgIDogJHEubGFuZy5sYWJlbFsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdjb2xsYXBzZScgOiAnZXhwYW5kJyBdKHByb3BzLmxhYmVsKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiB0YXJnZXRVaWQudmFsdWUsXG4gICAgICAgICdhcmlhLWxhYmVsJzogdG9nZ2xlQXJpYUxhYmVsXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmdyb3VwLCBuYW1lID0+IHtcbiAgICAgIGV4aXRHcm91cD8uKClcbiAgICAgIG5hbWUgIT09IHZvaWQgMCAmJiBlbnRlckdyb3VwKClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gb25IZWFkZXJDbGljayAoZSkge1xuICAgICAgaGFzTGluay52YWx1ZSAhPT0gdHJ1ZSAmJiB0b2dnbGUoZSlcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVJY29uS2V5Ym9hcmQgKGUpIHtcbiAgICAgIGUua2V5Q29kZSA9PT0gMTMgJiYgdG9nZ2xlSWNvbihlLCB0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUljb24gKGUsIGtleWJvYXJkKSB7XG4gICAgICBpZiAoa2V5Ym9hcmQgIT09IHRydWUgJiYgZS5xQXZvaWRGb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIHRvZ2dsZShlKVxuICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNob3cgKCkge1xuICAgICAgZW1pdCgnYWZ0ZXJTaG93JylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkhpZGUgKCkge1xuICAgICAgZW1pdCgnYWZ0ZXJIaWRlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRlckdyb3VwICgpIHtcbiAgICAgIGlmICh1bmlxdWVJZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVuaXF1ZUlkID0gdWlkKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3cgPSB3YXRjaChzaG93aW5nLCB2YWwgPT4ge1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBjb25zdCBncm91cCA9IHdhdGNoKFxuICAgICAgICAoKSA9PiBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdLFxuICAgICAgICAodmFsLCBvbGRWYWwpID0+IHtcbiAgICAgICAgICBpZiAob2xkVmFsID09PSB1bmlxdWVJZCAmJiB2YWwgIT09IHZvaWQgMCAmJiB2YWwgIT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgICBoaWRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgZXhpdEdyb3VwID0gKCkgPT4ge1xuICAgICAgICBzaG93KClcbiAgICAgICAgZ3JvdXAoKVxuXG4gICAgICAgIGlmIChpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID09PSB1bmlxdWVJZCkge1xuICAgICAgICAgIGRlbGV0ZSBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdXG4gICAgICAgIH1cblxuICAgICAgICBleGl0R3JvdXAgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2dnbGVJY29uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgJ3EtZm9jdXNhYmxlIHJlbGF0aXZlLXBvc2l0aW9uIGN1cnNvci1wb2ludGVyJ1xuICAgICAgICAgICAgKyBgJHsgcHJvcHMuZGVuc2VUb2dnbGUgPT09IHRydWUgJiYgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICcgaXRlbXMtZW5kJyA6ICcnIH1gLFxuICAgICAgICAgIHByb3BzLmV4cGFuZEljb25DbGFzc1xuICAgICAgICBdLFxuICAgICAgICBzaWRlOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlICE9PSB0cnVlLFxuICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uJ1xuICAgICAgICAgICAgKyAocHJvcHMuZXhwYW5kZWRJY29uID09PSB2b2lkIDAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/ICcgcS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWljb24tLXJvdGF0ZWQnXG4gICAgICAgICAgICAgIDogJycpLFxuICAgICAgICAgIG5hbWU6IGV4cGFuc2lvbkljb24udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKGFjdGl2ZVRvZ2dsZUljb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgLi4udG9nZ2xlQXJpYUF0dHJzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHRvZ2dsZUljb24sXG4gICAgICAgICAgb25LZXl1cDogdG9nZ2xlSWNvbktleWJvYXJkXG4gICAgICAgIH0pXG5cbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICByZWY6IGJsdXJUYXJnZXRSZWYsXG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1mb2N1cyBxLWljb24gcS1mb2N1cy1oZWxwZXIgcS1mb2N1cy1oZWxwZXItLXJvdW5kZWQnLFxuICAgICAgICAgICAgdGFiaW5kZXg6IC0xXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRSXRlbVNlY3Rpb24sIGRhdGEsICgpID0+IGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlckNoaWxkICgpIHtcbiAgICAgIGxldCBjaGlsZFxuXG4gICAgICBpZiAoc2xvdHMuaGVhZGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSBbXS5jb25jYXQoc2xvdHMuaGVhZGVyKGhlYWRlclNsb3RTY29wZS52YWx1ZSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBbXG4gICAgICAgICAgaChRSXRlbVNlY3Rpb24sICgpID0+IFtcbiAgICAgICAgICAgIGgoUUl0ZW1MYWJlbCwgeyBsaW5lczogcHJvcHMubGFiZWxMaW5lcyB9LCAoKSA9PiBwcm9wcy5sYWJlbCB8fCAnJyksXG5cbiAgICAgICAgICAgIHByb3BzLmNhcHRpb25cbiAgICAgICAgICAgICAgPyBoKFFJdGVtTGFiZWwsIHsgbGluZXM6IHByb3BzLmNhcHRpb25MaW5lcywgY2FwdGlvbjogdHJ1ZSB9LCAoKSA9PiBwcm9wcy5jYXB0aW9uKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICBdKVxuICAgICAgICBdXG5cbiAgICAgICAgcHJvcHMuaWNvbiAmJiBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICdwdXNoJyA6ICd1bnNoaWZ0JyBdKFxuICAgICAgICAgIGgoUUl0ZW1TZWN0aW9uLCB7XG4gICAgICAgICAgICBzaWRlOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlLFxuICAgICAgICAgICAgYXZhdGFyOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlICE9PSB0cnVlXG4gICAgICAgICAgfSwgKCkgPT4gaChRSWNvbiwgeyBuYW1lOiBwcm9wcy5pY29uIH0pKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLmhpZGVFeHBhbmRJY29uICE9PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkWyBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlID8gJ3Vuc2hpZnQnIDogJ3B1c2gnIF0oXG4gICAgICAgICAgZ2V0VG9nZ2xlSWNvbigpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogJ2l0ZW0nLFxuICAgICAgICBzdHlsZTogcHJvcHMuaGVhZGVyU3R5bGUsXG4gICAgICAgIGNsYXNzOiBwcm9wcy5oZWFkZXJDbGFzcyxcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgIGluc2V0TGV2ZWw6IHByb3BzLmhlYWRlckluc2V0TGV2ZWxcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEuY2xpY2thYmxlID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkhlYWRlckNsaWNrXG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgPyBsaW5rUHJvcHMudmFsdWUgOiB0b2dnbGVBcmlhQXR0cnMudmFsdWVcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRSXRlbSwgZGF0YSwgZ2V0SGVhZGVyQ2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkNoaWxkICgpIHtcbiAgICAgIHJldHVybiB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2UtY29udGVudCcsXG4gICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19jb250ZW50IHJlbGF0aXZlLXBvc2l0aW9uJyxcbiAgICAgICAgICBzdHlsZTogY29udGVudFN0eWxlLnZhbHVlLFxuICAgICAgICAgIGlkOiB0YXJnZXRVaWQudmFsdWVcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpLFxuICAgICAgICBbIFtcbiAgICAgICAgICB2U2hvdyxcbiAgICAgICAgICBzaG93aW5nLnZhbHVlXG4gICAgICAgIF0gXVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3Qgbm9kZSA9IFtcbiAgICAgICAgZ2V0SGVhZGVyKCksXG5cbiAgICAgICAgaChRU2xpZGVUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgZHVyYXRpb246IHByb3BzLmR1cmF0aW9uLFxuICAgICAgICAgIG9uU2hvdyxcbiAgICAgICAgICBvbkhpZGVcbiAgICAgICAgfSwgZ2V0VHJhbnNpdGlvbkNoaWxkKVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMuZXhwYW5kU2VwYXJhdG9yID09PSB0cnVlKSB7XG4gICAgICAgIG5vZGUucHVzaChcbiAgICAgICAgICBoKFFTZXBhcmF0b3IsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fYm9yZGVyIHEtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlci0tdG9wIGFic29sdXRlLXRvcCcsXG4gICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWVcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBoKFFTZXBhcmF0b3IsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fYm9yZGVyIHEtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlci0tYm90dG9tIGFic29sdXRlLWJvdHRvbScsXG4gICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgcHJvcHMuZ3JvdXAgIT09IHZvaWQgMCAmJiBlbnRlckdyb3VwKClcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBleGl0R3JvdXA/LigpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIFtcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19jb250YWluZXIgcmVsYXRpdmUtcG9zaXRpb24nIH0sIGdldENvbnRlbnQoKSlcbiAgICBdKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8aDIgY2xhc3M9XCJ0ZXh0LWg0XCI+TXkgT3JkZXJzPC9oMj5cclxuXHJcbiAgICA8ZGl2IHYtaWY9XCJvcmRlcnMgJiYgb3JkZXJzLmxlbmd0aCA+IDBcIj5cclxuICAgIDxxLWNhcmQgZGVuc2U+XHJcbiAgICAgIDxxLWV4cGFuc2lvbi1pdGVtXHJcbiAgICAgICAgdi1mb3I9XCJvcmRlciBpbiBvcmRlcnNcIlxyXG4gICAgICAgIDprZXk9XCJvcmRlci5pZFwiXHJcbiAgICAgICAgOmxhYmVsPVwiYE9yZGVyICMke29yZGVyLm51bWJlcn1gXCJcclxuICAgICAgICA6Y2FwdGlvbj1cImAke29yZGVyLmRhdGVfY3JlYXRlZH0gfCBTdGF0dXM6ICR7b3JkZXIuc3RhdHVzfWBcIlxyXG4gICAgICAgIDppY29uPVwibWF0U2hvcHBpbmdCYWdcIlxyXG4gICAgICAgIDpleHBhbmQtaWNvbj1cIm1hdEtleWJvYXJkQXJyb3dEb3duXCJcclxuICAgICAgICBoZWFkZXItY2xhc3M9XCJ0ZXh0LXByaW1hcnkgdGV4dC1ib2xkXCJcclxuICAgICAgICBjbGFzcz1cInEtbWItc21cIlxyXG4gICAgICAgIGdyb3VwPVwic29tZWdyb3VwXCJcclxuICAgICAgICBleHBhbmQtc2VwYXJhdG9yXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1zbSBxLXBhLW1kXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LWdyZXktNyBxLW1iLXNtXCI+XHJcbiAgICAgICAgICAgIFRvdGFsOiB7eyBvcmRlci50b3RhbCB9fSB7eyBvcmRlci5jdXJyZW5jeSB9fVxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPHEtdGFibGVcclxuICAgICAgICAgICAgOnJvd3M9XCJPYmplY3QudmFsdWVzKG9yZGVyLml0ZW1zKVwiXHJcbiAgICAgICAgICAgIDpjb2x1bW5zPVwiY29sdW1uc1wiXHJcbiAgICAgICAgICAgIHJvdy1rZXk9XCJuYW1lXCJcclxuICAgICAgICAgICAgZGVuc2VcclxuICAgICAgICAgICAgZmxhdFxyXG4gICAgICAgICAgICBib3JkZXJlZFxyXG4gICAgICAgICAgICBoaWRlLWJvdHRvbVxyXG4gICAgICAgICAgPlxyXG5cclxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtdGh1bWJuYWlsPVwicHJvcHNcIj5cclxuICAgICAgICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxyXG4gICAgICAgICAgICAgICAgPHEtaW1nXHJcbiAgICAgICAgICAgICAgICAgIDpzcmM9XCJwcm9wcy5yb3cudGh1bWJuYWlsXCJcclxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNzBweDsgaGVpZ2h0OiA3MHB4O1wiXHJcbiAgICAgICAgICAgICAgICAgIHNwaW5uZXItY29sb3I9XCJncmV5LTVcIlxyXG4gICAgICAgICAgICAgICAgICByYXRpbz1cIjFcIlxyXG4gICAgICAgICAgICAgICAgICBmaXQ9XCJjb3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9xLXRkPlxyXG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgICAgPC9xLXRhYmxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L3EtZXhwYW5zaW9uLWl0ZW0+XHJcbiAgICA8L3EtY2FyZD5cclxuXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgdi1lbHNlLWlmPVwib3JkZXJzICYmIG9yZGVycy5sZW5ndGggPT09IDBcIj5ObyBvcmRlcnMgeWV0LiA8cm91dGVyLWxpbmsgdG89XCJwcm9kdWN0c1wiPmV4cGxvcmUgb3VyIHByb2R1Y3RzPC9yb3V0ZXItbGluaz4gdG8gc3RhcnQgeW91ciBmaXJzdCBvcmRlciE8L2Rpdj5cclxuICAgIDxkaXYgdi1lbHNlPiA8cS1zcGlubmVyIGNvbG9yPVwic2Vjb25kYXJ5XCIgc2l6ZT1cIjJlbVwiIC8+IDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXHJcbmltcG9ydCB7IG1hdFNob3BwaW5nQmFnLCBtYXRLZXlib2FyZEFycm93RG93biB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG5cclxuY29uc3Qgb3JkZXJzID0gcmVmKG51bGwpXHJcbmNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2p3dF90b2tlbicpO1xyXG5jb25zdCBjb2x1bW5zID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICd0aHVtYm5haWwnLFxyXG4gICAgbGFiZWw6ICcnLFxyXG4gICAgYWxpZ246ICdsZWZ0JyxcclxuICAgIGZpZWxkOiAndGh1bWJuYWlsJyxcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICduYW1lJyxcclxuICAgIGxhYmVsOiAnUHJvZHVjdCcsXHJcbiAgICBhbGlnbjogJ2xlZnQnLFxyXG4gICAgZmllbGQ6ICduYW1lJyxcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdxdWFudGl0eScsXHJcbiAgICBsYWJlbDogJ1F0eScsXHJcbiAgICBhbGlnbjogJ2NlbnRlcicsXHJcbiAgICBmaWVsZDogJ3F1YW50aXR5JyxcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICd0b3RhbCcsXHJcbiAgICBsYWJlbDogJ1RvdGFsICjigqopJyxcclxuICAgIGFsaWduOiAncmlnaHQnLFxyXG4gICAgZmllbGQ6ICd0b3RhbCcsXHJcbiAgfVxyXG5dXHJcblxyXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xyXG5jb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd2Mvc3RvcmUvdjEvbXktb3JkZXJzJywge1xyXG4gIGNlcmRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgLy8gRnJvbSB5b3VyIEpXVCBsb2dpblxyXG4gIH1cclxufSk7XHJcblxyXG5vcmRlcnMudmFsdWUgPSBhd2FpdCByZXMuanNvbigpO1xyXG5jb25zb2xlLmxvZyhvcmRlcnMpO1xyXG5cclxufSlcclxuPC9zY3JpcHQ+XHJcbjxzdHlsZT5cclxuLnEtZXhwYW5zaW9uLWl0ZW1fX2NvbnRhaW5lci5yZWxhdGl2ZS1wb3NpdGlvbiAucS1pY29uLFxyXG4ucS1leHBhbnNpb24taXRlbV9fY29udGFpbmVyLnJlbGF0aXZlLXBvc2l0aW9uIC5xLWl0ZW1fX2xhYmVsIHtcclxuICAgIGZpbGw6IHZhcigtLXEtc2Vjb25kYXJ5KTtcclxuICAgIGNvbG9yOiB2YXIoLS1xLXNlY29uZGFyeSk7XHJcbn1cclxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxoMSBjbGFzcz1cInRleHQtaDRcIj5BY2NvdW50IERldGFpbHM8L2gxPlxyXG4gICAgPGRpdiB2LWlmPVwiYWNjb3VudC51c2VyX2VtYWlsXCI+XHJcbiAgICA8cS1mb3JtIEBzdWJtaXQucHJldmVudD1cInVwZGF0ZURldGFpbHNcIj5cclxuICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImFjY291bnQuZmlyc3RfX25hbWVcIiBsYWJlbD1cIkZpcnN0IE5hbWVcIiAvPlxyXG4gICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiYWNjb3VudC5sYXN0X19uYW1lXCIgbGFiZWw9XCJMYXN0IE5hbWVcIiAvPlxyXG4gICAgICA8cS1pbnB1dCBkaXNhYmxlIHJlYWRvbmx5IHYtbW9kZWw9XCJhY2NvdW50LnVzZXJfZW1haWxcIiBsYWJlbD1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCIgLz5cclxuICAgICAgPHEtYnRuIHR5cGU9XCJzdWJtaXRcIiBsYWJlbD1cIlNhdmUgQ2hhbmdlc1wiIGNvbG9yPVwic2Vjb25kYXJ5XCIgLz5cclxuICAgIDwvcS1mb3JtPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IHYtZWxzZT4gPHEtc3Bpbm5lciBjb2xvcj1cInNlY29uZGFyeVwiIHNpemU9XCIyZW1cIiAvPiA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xyXG5cclxuY29uc3QgYWNjb3VudCA9IHJlZih7XHJcbiAgZmlyc3RfbmFtZTogJycsXHJcbiAgbGFzdF9uYW1lOiAnJyxcclxuICBlbWFpbDogJydcclxufSlcclxuXHJcbmNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2p3dF90b2tlbicpO1xyXG5cclxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd3AvdjIvdXNlcnMvbWUnLCB7XHJcbiAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWBcclxuICB9XHJcbiAgfSlcclxuICAgIGFjY291bnQudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgY29uc29sZS5sb2coYWNjb3VudC52YWx1ZSlcclxufSlcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZURldGFpbHMoKSB7XHJcbmNvbnNvbGUubG9nKGFjY291bnQudmFsdWUpO1xyXG5jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhY2NvdW50LnZhbHVlKS5yZXBsYWNlKCdfX25hbWUnLCAnX25hbWUnKSk7XHJcbiAgYXdhaXQgZmV0Y2goJ2h0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3dwL3YyL3VzZXJzL21lJywge1xyXG4gICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGFjY291bnQudmFsdWUpLnJlcGxhY2VBbGwoJ19fbmFtZScsICdfbmFtZScpXHJcbiAgfSlcclxuICAudGhlbihyZXMgPT4gY29uc29sZS5sb2cocmVzKSlcclxufVxyXG48L3NjcmlwdD5cclxuIiwiPCEtLSBBY2NvdW50UGFnZS52dWUgLS0+XHJcbjx0ZW1wbGF0ZT5cclxuICA8cS1wYWdlIGNsYXNzPVwicS1wYS1tZFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgPGgyPk15IGFjY291bnQ8L2gyPlxyXG5cclxuICAgIDxkaXYgdi1pZj1cIiFpc0xvZ2dlZEluXCI+XHJcbiAgICAgIDxMb2dpbkZvcm0gQGxvZ2luLXN1Y2Nlc3M9XCJvbkxvZ2luXCIgLz5cclxuICAgICAgPGgzPiBPUiA8L2gzPlxyXG4gICAgICA8R29vZ2xlTG9naW5CdXR0b24vPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiB2LWVsc2U+XHJcbiAgICAgIDxxLXRhYnMgQHRvdWNoc3RhcnQuc3RvcCBAbW91c2Vkb3duLnN0b3AgOnJpZ2h0LWljb249XCJtYXRDaGV2cm9uTGVmdFwiIDpsZWZ0LWljb249XCJtYXRDaGV2cm9uUmlnaHRcIiB2LW1vZGVsPVwidGFiXCIgY2xhc3M9XCJ0ZXh0LXNlY29uZGFyeVwiIGFjdGl2ZS1iZy1jb2xvcj1cInNlY29uZGFyeVwiIGFjdGl2ZS1jb2xvcj1cInByaW1hcnlcIiBhbGlnbj1cImp1c3RpZnlcIj5cclxuICAgICAgICA8cS10YWIgbmFtZT1cImRhc2hib2FyZFwiIGxhYmVsPVwiRGFzaGJvYXJkXCIgLz5cclxuICAgICAgICA8cS10YWIgbmFtZT1cIm9yZGVyc1wiIGxhYmVsPVwiTXkgT3JkZXJzXCIgLz5cclxuICAgICAgICA8cS10YWIgbmFtZT1cImRldGFpbHNcIiBsYWJlbD1cIkFjY291bnQgRGV0YWlsc1wiIC8+XHJcbiAgICAgICAgPHEtdGFiIG5hbWU9XCJsb2dvdXRcIiBsYWJlbD1cIkxvZ291dFwiIC8+XHJcbiAgICAgIDwvcS10YWJzPlxyXG5cclxuICAgICAgPHEtc2VwYXJhdG9yIC8+XHJcblxyXG4gICAgICA8cS10YWItcGFuZWxzIHYtbW9kZWw9XCJ0YWJcIiBhbmltYXRlZD5cclxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cImRhc2hib2FyZFwiPlxyXG4gICAgICAgICAgPGgyIGNsYXNzPVwidGV4dC1oNFwiPkRhc2hib2FyZDwvaDI+XHJcbiAgICAgICAgICA8ZGl2IHYtaWY9XCJ1c2VyRGF0YVwiPldlbGNvbWUsIHt7IHVzZXJEYXRhPy5maXJzdF9fbmFtZSB9fSB7eyB1c2VyRGF0YT8ubGFzdF9fbmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiB2LWVsc2U+IDxxLXNwaW5uZXIgY29sb3I9XCJzZWNvbmRhcnlcIiBzaXplPVwiMmVtXCIgLz4gPC9kaXY+XHJcbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cclxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cIm9yZGVyc1wiPjxPcmRlcnNTZWN0aW9uIDp0b2tlbj1cInRva2VuXCIgLz48L3EtdGFiLXBhbmVsPlxyXG4gICAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwiZGV0YWlsc1wiPjxBY2NvdW50RGV0YWlscyA6dG9rZW49XCJ0b2tlblwiIC8+PC9xLXRhYi1wYW5lbD5cclxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cImxvZ291dFwiPjxxLWJ0biBAY2xpY2s9XCJsb2dvdXRcIj5Mb2dvdXQ8L3EtYnRuPjwvcS10YWItcGFuZWw+XHJcbiAgICAgIDwvcS10YWItcGFuZWxzPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcclxuaW1wb3J0IHsgZmV0Y2hXaXRoVG9rZW4gfSBmcm9tICcvc3JjL2NvbXBvc2FibGVzL3VzZUFwaUZldGNoLmpzJztcclxuaW1wb3J0IExvZ2luRm9ybSBmcm9tICdjb21wb25lbnRzL0xvZ2luRm9ybS52dWUnXHJcbmltcG9ydCBPcmRlcnNTZWN0aW9uIGZyb20gJ2NvbXBvbmVudHMvT3JkZXJzU2VjdGlvbi52dWUnXHJcbmltcG9ydCBBY2NvdW50RGV0YWlscyBmcm9tICdjb21wb25lbnRzL0FjY291bnREZXRhaWxzLnZ1ZSdcclxuaW1wb3J0IGNhcnQgZnJvbSAnc3JjL3N0b3Jlcy9jYXJ0LmpzJztcclxuaW1wb3J0IEdvb2dsZUxvZ2luQnV0dG9uIGZyb20gJ3NyYy9jb21wb25lbnRzL0dvb2dsZUxvZ2luQnV0dG9uLnZ1ZSc7XHJcbmltcG9ydCB7IG1hdENoZXZyb25MZWZ0LCBtYXRDaGV2cm9uUmlnaHQgfSBmcm9tICdAcXVhc2FyL2V4dHJhcy9tYXRlcmlhbC1pY29ucydcclxuXHJcbmNvbnN0IHRhYiA9IHJlZignZGFzaGJvYXJkJylcclxuXHJcbmNvbnN0IHVzZXJEYXRhID0gcmVmKG51bGwpXHJcbmNvbnN0IHRva2VuID0gcmVmKG51bGwpXHJcblxyXG5pZihwcm9jZXNzLmVudi5DTElFTlQpIHtcclxuICB0b2tlbi52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqd3RfdG9rZW4nKVxyXG59XHJcbiAgY29uc3QgaXNMb2dnZWRJbiA9IHJlZighIXRva2VuLnZhbHVlKVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBvbkxvZ2luKG5ld1Rva2VuKSB7XHJcbiAgICB0b2tlbi52YWx1ZSA9IG5ld1Rva2VuXHJcbiAgICBpZihwcm9jZXNzLmVudi5DTElFTlQpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2p3dF90b2tlbicsIG5ld1Rva2VuKVxyXG4gICAgfVxyXG4gICAgLy9hbGVydChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnand0X3Rva2VuJykpO1xyXG4gICAgYXdhaXQgZmV0Y2hVc2VyKClcclxuICAgIGlzTG9nZ2VkSW4udmFsdWUgPSB0cnVlXHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBmZXRjaFVzZXIoKSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaFdpdGhUb2tlbignaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd3AvdjIvdXNlcnMvbWUnLCApXHJcbiAgICBpZiAoIXJlcy5vaykgcmV0dXJuIC8vIPCfmqggU1RPUCBpZiBlcnJvclxyXG4gICAgdXNlckRhdGEudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXHJcbiAgICBjYXJ0LnN0YXRlLnVzZXIgPSB1c2VyRGF0YS52YWx1ZVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbG9nb3V0KCkge1xyXG4gICAgdG9rZW4udmFsdWUgPSBudWxsXHJcbiAgICB1c2VyRGF0YS52YWx1ZSA9IG51bGxcclxuICAgIGlzTG9nZ2VkSW4udmFsdWUgPSBmYWxzZVxyXG4gICAgaWYocHJvY2Vzcy5lbnYuQ0xJRU5UKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdqd3RfdG9rZW4nKVxyXG4gICAgfVxyXG4gICAgY2FydC5jbGVhcigpO1xyXG4gICAgY2FydC5zdGF0ZS51c2VyID0ge307XHJcbiAgfVxyXG5cclxub25Nb3VudGVkKCgpID0+IHtcclxuICBpZiAoaXNMb2dnZWRJbi52YWx1ZSkgZmV0Y2hVc2VyKClcclxufSlcclxuPC9zY3JpcHQ+XHJcbjxzdHlsZSBzY29wZWQ+XHJcbi8qIHB1cmdlY3NzIHN0YXJ0IGlnbm9yZSAqL1xyXG4ucS1maWVsZF9fbGFiZWwge1xyXG4gICAgdHJhbnNpdGlvbjogMC4zcyBlYXNlO1xyXG59XHJcbi5xLWZpZWxkLS1mb2N1c2VkIC5xLWZpZWxkX19sYWJlbFxyXG4ucS1maWVsZC0tZmxvYXQgLnEtZmllbGRfX2xhYmVse1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XHJcbn1cclxuZGl2LnEtdGFiLXBhbmVscyB7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuLyogcHVyZ2Vjc3MgZW5kIGlnbm9yZSAqL1xyXG5cclxuPC9zdHlsZT5cclxuIl0sIm5hbWVzIjpbInJlcyIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX3RvRGlzcGxheVN0cmluZyIsInNob3ciLCJfaG9pc3RlZF8yIiwiX2hvaXN0ZWRfMyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl93aXRoQ3R4IiwiX2hvaXN0ZWRfNCIsIl9ob2lzdGVkXzUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBYUEsSUFBSSxLQUFLO0FBRUYsTUFBTSxjQUFjLENBQUUsU0FBUyxTQUFTO0FBRXhDLE1BQU0sY0FBYztBQUFBLEVBQ3pCLE1BQU07QUFBQSxFQUNOLE9BQU8sQ0FBRSxRQUFRLE1BQU07QUFBQSxFQUV2QixPQUFPLENBQUUsU0FBUyxNQUFNO0FBQUEsRUFDeEIsV0FBVztBQUFBLEVBRVgsTUFBTTtBQUFBLElBQ0osTUFBTSxDQUFFLFFBQVEsTUFBTTtBQUFBLElBQ3RCLFNBQVMsTUFBTSxLQUFNLElBQUk7QUFBQSxFQUM3QjtBQUFBLEVBRUUsUUFBUTtBQUFBLEVBRVIsVUFBVSxDQUFFLFFB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QUE0QztBQUFBLGNBQTVDQSxZQUE0QyxNQUFBO0FBQUEsZ0JBQXJDLE1BQUs7QUFBQSxnQkFBWSxPQUFNO0FBQUEsY0FBQTtjQUM5QkEsWUFBeUMsTUFBQTtBQUFBLGdCQUFsQyxNQUFLO0FBQUEsZ0JBQVMsT0FBTTtBQUFBLGNBQUE7Y0FDM0JBLFlBQWdELE1BQUE7QUFBQSxnQkFBekMsTUFBSztBQUFBLGdCQUFVLE9BQU07QUFBQSxjQUFBO2NBQzVCQSxZQUFzQyxNQUFBO0FBQUEsZ0JBQS9CLE1BQUs7QUFBQSxnQkFBUyxPQUFNO0FBQUEsY0FBQTs7OztVQUc3QkEsWUFBZSxVQUFBO0FBQUEsVUFFZkEsWUFTZSxZQUFBO0FBQUEsd0JBVFEsT0FBQTtBQUFBLHlFQUFBLE9BQUEsTUFBRztBQUFBLFlBQUUsVUFBQTtBQUFBLFVBQUE7NkJBQzFCLE1BSWM7QUFBQSxjQUpkQSxZQUljLFdBQUEsRUFBQSxNQUFBLGVBSkk7QUFBQSxpQ0FDaEIsTUFBa0M7QUFBQSxrQkFBbEMsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFPLGdCQUFrQyxNQUFBLEVBQTlCLE9BQU0sVUFBQSxHQUFVLGFBQVMsRUFBQTtBQUFBLGtCQUNsQixPQUFBLHlCQUFYTixtQkFBMEYsT0FBQSxZQUFyRSxjQUFTRSxnQkFBRyxPQUFBLFVBQVUsV0FBVyxJQUFHLE1BQUNBLGdCQUFHLE9BQUEsVUFBVSxVQUFVLEdBQUEsQ0FBQSxtQkFDakZGLG1CQUE4RCxPQUFBLFlBQUE7QUFBQSxvQkFBakRELFlBQTBDLFVBQUE7QUFBQSxzQkFBL0IsT0FBTTtBQUFBLHNCQUFZLE1BQUs7QUFBQSxvQkFBQTs7Ozs7Y0FFakRBLFlBQXlFLFdBQUEsRUFBQSxNQUFBLFlBQXhEO0FBQUEsaUNBQVUsTUFBZ0M7QUFBQSxrQkFBaENBLFlBQWdDLE9BQUEsZUFBQSxHQUFBLEVBQWhCLE9BQU8sT0FBQSxTQUFLLE1BQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQTtBQUFBLGdCQUFBOzs7Y0FDdkRBLFlBQTJFLFdBQUEsRUFBQSxNQUFBLGFBQXpEO0FBQUEsaUNBQVUsTUFBaUM7QUFBQSxrQkFBakNBLFlBQWlDLE9BQUEsZ0JBQUEsR0FBQSxFQUFoQixPQUFPLE9BQUEsU0FBSyxNQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUE7QUFBQSxnQkFBQTs7O2NBQ3pEQSxZQUE4RSxXQUFBLEVBQUEsTUFBQSxZQUE3RDtBQUFBLGlDQUFVLE1BQXFDO0FBQUEsa0JBQXJDQSxZQUFxQyxNQUFBLEVBQUEsU0FBQSxPQUE3QixVQUFPO0FBQUEscUNBQVEsTUFBTSxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxzQ0FBTixVQUFNLEVBQUE7QUFBQSxvQkFBQTs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsMyw0LDYsN119
