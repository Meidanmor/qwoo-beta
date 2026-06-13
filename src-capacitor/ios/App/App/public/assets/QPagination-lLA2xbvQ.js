import { u as useDarkProps, b as useDark, a as hSlot, E as useFormProps, O as hDir, H as useFormInject, N as isNumber, ah as isObject, i as QInput, ai as btnDesignOptions, aj as isKeyCode, Q as QBtn, ak as btnPadding, al as getBtnDesign } from "./index-DDAg5YDa.js";
import { f as createComponent, h, g as getCurrentInstance, e as computed, R as onBeforeUnmount, j as ref, W as between, O as position, a7 as TouchPan, v as watch, S as stopAndPrevent } from "./quasar-observers-delayed-tSHCOYpR.js";
const skeletonTypes = [
  "text",
  "rect",
  "circle",
  "QBtn",
  "QBadge",
  "QChip",
  "QToolbar",
  "QCheckbox",
  "QRadio",
  "QToggle",
  "QSlider",
  "QRange",
  "QInput",
  "QAvatar"
];
const skeletonAnimations = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
const QSkeleton = createComponent({
  name: "QSkeleton",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (v) => skeletonTypes.includes(v),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (v) => skeletonAnimations.includes(v),
      default: "wave"
    },
    animationSpeed: {
      type: [String, Number],
      default: 1500
    },
    square: Boolean,
    bordered: Boolean,
    size: String,
    width: String,
    height: String
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const style = computed(() => {
      const size = props.size !== void 0 ? [props.size, props.size] : [props.width, props.height];
      return {
        "--q-skeleton-speed": `${props.animationSpeed}ms`,
        width: size[0],
        height: size[1]
      };
    });
    const classes = computed(
      () => `q-skeleton q-skeleton--${isDark.value === true ? "dark" : "light"} q-skeleton--type-${props.type}` + (props.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${props.animation}` : "") + (props.square === true ? " q-skeleton--square" : "") + (props.bordered === true ? " q-skeleton--bordered" : "")
    );
    return () => h(props.tag, {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const markerPrefixClass = "q-slider__marker-labels";
const defaultMarkerConvertFn = (v) => ({ value: v });
const defaultMarkerLabelRenderFn = ({ marker }) => h("div", {
  key: marker.value,
  style: marker.style,
  class: marker.classes
}, marker.label);
const keyCodes = [34, 37, 40, 33, 39, 38];
const useSliderProps = {
  ...useDarkProps,
  ...useFormProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  innerMin: Number,
  innerMax: Number,
  step: {
    type: Number,
    default: 1,
    validator: (v) => v >= 0
  },
  snap: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  color: String,
  markerLabelsClass: String,
  label: Boolean,
  labelColor: String,
  labelTextColor: String,
  labelAlways: Boolean,
  switchLabelSide: Boolean,
  markers: [Boolean, Number],
  markerLabels: [Boolean, Array, Object, Function],
  switchMarkerLabelsSide: Boolean,
  trackImg: String,
  trackColor: String,
  innerTrackImg: String,
  innerTrackColor: String,
  selectionColor: String,
  selectionImg: String,
  thumbSize: {
    type: String,
    default: "20px"
  },
  trackSize: {
    type: String,
    default: "4px"
  },
  disable: Boolean,
  readonly: Boolean,
  dense: Boolean,
  tabindex: [String, Number],
  thumbColor: String,
  thumbPath: {
    type: String,
    default: "M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"
  }
};
const useSliderEmits = ["pan", "update:modelValue", "change"];
function useSlider({ updateValue, updatePosition, getDragging, formAttrs }) {
  const { props, emit, slots, proxy: { $q } } = getCurrentInstance();
  const isDark = useDark(props, $q);
  const injectFormInput = useFormInject(formAttrs);
  const active = ref(false);
  const preventFocus = ref(false);
  const focus = ref(false);
  const dragging = ref(false);
  const axis = computed(() => props.vertical === true ? "--v" : "--h");
  const labelSide = computed(() => "-" + (props.switchLabelSide === true ? "switched" : "standard"));
  const isReversed = computed(() => props.vertical === true ? props.reverse === true : props.reverse !== ($q.lang.rtl === true));
  const innerMin = computed(() => isNaN(props.innerMin) === true || props.innerMin < props.min ? props.min : props.innerMin);
  const innerMax = computed(() => isNaN(props.innerMax) === true || props.innerMax > props.max ? props.max : props.innerMax);
  const editable = computed(() => props.disable !== true && props.readonly !== true && innerMin.value < innerMax.value);
  const roundValueFn = computed(() => {
    if (props.step === 0) {
      return (v) => v;
    }
    const decimals = (String(props.step).trim().split(".")[1] || "").length;
    return (v) => parseFloat(v.toFixed(decimals));
  });
  const keyStep = computed(() => props.step === 0 ? 1 : props.step);
  const tabindex = computed(() => editable.value === true ? props.tabindex || 0 : -1);
  const trackLen = computed(() => props.max - props.min);
  const innerBarLen = computed(() => innerMax.value - innerMin.value);
  const innerMinRatio = computed(() => convertModelToRatio(innerMin.value));
  const innerMaxRatio = computed(() => convertModelToRatio(innerMax.value));
  const positionProp = computed(() => props.vertical === true ? isReversed.value === true ? "bottom" : "top" : isReversed.value === true ? "right" : "left");
  const sizeProp = computed(() => props.vertical === true ? "height" : "width");
  const thicknessProp = computed(() => props.vertical === true ? "width" : "height");
  const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
  const attributes = computed(() => {
    const acc = {
      role: "slider",
      "aria-valuemin": innerMin.value,
      "aria-valuemax": innerMax.value,
      "aria-orientation": orientation.value,
      "data-step": props.step
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  const classes = computed(
    () => `q-slider q-slider${axis.value} q-slider--${active.value === true ? "" : "in"}active inline no-wrap ` + (props.vertical === true ? "row" : "column") + (props.disable === true ? " disabled" : " q-slider--enabled" + (editable.value === true ? " q-slider--editable" : "")) + (focus.value === "both" ? " q-slider--focus" : "") + (props.label || props.labelAlways === true ? " q-slider--label" : "") + (props.labelAlways === true ? " q-slider--label-always" : "") + (isDark.value === true ? " q-slider--dark" : "") + (props.dense === true ? " q-slider--dense q-slider--dense" + axis.value : "")
  );
  function getPositionClass(name) {
    const cls = "q-slider__" + name;
    return `${cls} ${cls}${axis.value} ${cls}${axis.value}${labelSide.value}`;
  }
  function getAxisClass(name) {
    const cls = "q-slider__" + name;
    return `${cls} ${cls}${axis.value}`;
  }
  const selectionBarClass = computed(() => {
    const color = props.selectionColor || props.color;
    return "q-slider__selection absolute" + (color !== void 0 ? ` text-${color}` : "");
  });
  const markerClass = computed(() => getAxisClass("markers") + " absolute overflow-hidden");
  const trackContainerClass = computed(() => getAxisClass("track-container"));
  const pinClass = computed(() => getPositionClass("pin"));
  const labelClass = computed(() => getPositionClass("label"));
  const textContainerClass = computed(() => getPositionClass("text-container"));
  const markerLabelsContainerClass = computed(
    () => getPositionClass("marker-labels-container") + (props.markerLabelsClass !== void 0 ? ` ${props.markerLabelsClass}` : "")
  );
  const trackClass = computed(
    () => "q-slider__track relative-position no-outline" + (props.trackColor !== void 0 ? ` bg-${props.trackColor}` : "")
  );
  const trackStyle = computed(() => {
    const acc = { [thicknessProp.value]: props.trackSize };
    if (props.trackImg !== void 0) {
      acc.backgroundImage = `url(${props.trackImg}) !important`;
    }
    return acc;
  });
  const innerBarClass = computed(
    () => "q-slider__inner absolute" + (props.innerTrackColor !== void 0 ? ` bg-${props.innerTrackColor}` : "")
  );
  const innerBarStyle = computed(() => {
    const innerDiff = innerMaxRatio.value - innerMinRatio.value;
    const acc = {
      [positionProp.value]: `${100 * innerMinRatio.value}%`,
      [sizeProp.value]: innerDiff === 0 ? "2px" : `${100 * innerDiff}%`
    };
    if (props.innerTrackImg !== void 0) {
      acc.backgroundImage = `url(${props.innerTrackImg}) !important`;
    }
    return acc;
  });
  function convertRatioToModel(ratio) {
    const { min, max, step } = props;
    let model = min + ratio * (max - min);
    if (step > 0) {
      const modulo = (model - innerMin.value) % step;
      model += (Math.abs(modulo) >= step / 2 ? (modulo < 0 ? -1 : 1) * step : 0) - modulo;
    }
    model = roundValueFn.value(model);
    return between(model, innerMin.value, innerMax.value);
  }
  function convertModelToRatio(model) {
    return trackLen.value === 0 ? 0 : (model - props.min) / trackLen.value;
  }
  function getDraggingRatio(evt, dragging2) {
    const pos = position(evt), val = props.vertical === true ? between((pos.top - dragging2.top) / dragging2.height, 0, 1) : between((pos.left - dragging2.left) / dragging2.width, 0, 1);
    return between(
      isReversed.value === true ? 1 - val : val,
      innerMinRatio.value,
      innerMaxRatio.value
    );
  }
  const markerStep = computed(
    () => isNumber(props.markers) === true ? props.markers : keyStep.value
  );
  const markerTicks = computed(() => {
    const acc = [];
    const step = markerStep.value;
    const max = props.max;
    let value = props.min;
    do {
      acc.push(value);
      value += step;
    } while (value < max);
    acc.push(max);
    return acc;
  });
  const markerLabelClass = computed(() => {
    const prefix = ` ${markerPrefixClass}${axis.value}-`;
    return markerPrefixClass + `${prefix}${props.switchMarkerLabelsSide === true ? "switched" : "standard"}${prefix}${isReversed.value === true ? "rtl" : "ltr"}`;
  });
  const markerLabelsList = computed(() => {
    if (props.markerLabels === false) {
      return null;
    }
    return getMarkerList(props.markerLabels).map((entry, index) => ({
      index,
      value: entry.value,
      label: entry.label || entry.value,
      classes: markerLabelClass.value + (entry.classes !== void 0 ? " " + entry.classes : ""),
      style: {
        ...getMarkerLabelStyle(entry.value),
        ...entry.style || {}
      }
    }));
  });
  const markerScope = computed(() => ({
    markerList: markerLabelsList.value,
    markerMap: markerLabelsMap.value,
    classes: markerLabelClass.value,
    // TODO ts definition
    getStyle: getMarkerLabelStyle
  }));
  const markerStyle = computed(() => {
    const size = innerBarLen.value === 0 ? "2px" : 100 * markerStep.value / innerBarLen.value;
    return {
      ...innerBarStyle.value,
      backgroundSize: props.vertical === true ? `2px ${size}%` : `${size}% 2px`
    };
  });
  function getMarkerList(def) {
    if (def === false) {
      return null;
    }
    if (def === true) {
      return markerTicks.value.map(defaultMarkerConvertFn);
    }
    if (typeof def === "function") {
      return markerTicks.value.map((value) => {
        const item = def(value);
        return isObject(item) === true ? { ...item, value } : { value, label: item };
      });
    }
    const filterFn = ({ value }) => value >= props.min && value <= props.max;
    if (Array.isArray(def) === true) {
      return def.map((item) => isObject(item) === true ? item : { value: item }).filter(filterFn);
    }
    return Object.keys(def).map((key) => {
      const item = def[key];
      const value = Number(key);
      return isObject(item) === true ? { ...item, value } : { value, label: item };
    }).filter(filterFn);
  }
  function getMarkerLabelStyle(val) {
    return { [positionProp.value]: `${100 * (val - props.min) / trackLen.value}%` };
  }
  const markerLabelsMap = computed(() => {
    if (props.markerLabels === false) {
      return null;
    }
    const acc = {};
    markerLabelsList.value.forEach((entry) => {
      acc[entry.value] = entry;
    });
    return acc;
  });
  function getMarkerLabelsContent() {
    if (slots["marker-label-group"] !== void 0) {
      return slots["marker-label-group"](markerScope.value);
    }
    const fn = slots["marker-label"] || defaultMarkerLabelRenderFn;
    return markerLabelsList.value.map((marker) => fn({
      marker,
      ...markerScope.value
    }));
  }
  const panDirective = computed(() => {
    return [[
      TouchPan,
      onPan,
      void 0,
      {
        [orientation.value]: true,
        prevent: true,
        stop: true,
        mouse: true,
        mouseAllDir: true
      }
    ]];
  });
  function onPan(event) {
    if (event.isFinal === true) {
      if (dragging.value !== void 0) {
        updatePosition(event.evt);
        event.touch === true && updateValue(true);
        dragging.value = void 0;
        emit("pan", "end");
      }
      active.value = false;
      focus.value = false;
    } else if (event.isFirst === true) {
      dragging.value = getDragging(event.evt);
      updatePosition(event.evt);
      updateValue();
      active.value = true;
      emit("pan", "start");
    } else {
      updatePosition(event.evt);
      updateValue();
    }
  }
  function onBlur() {
    focus.value = false;
  }
  function onActivate(evt) {
    updatePosition(evt, getDragging(evt));
    updateValue();
    preventFocus.value = true;
    active.value = true;
    document.addEventListener("mouseup", onDeactivate, true);
  }
  function onDeactivate() {
    preventFocus.value = false;
    active.value = false;
    updateValue(true);
    onBlur();
    document.removeEventListener("mouseup", onDeactivate, true);
  }
  function onMobileClick(evt) {
    updatePosition(evt, getDragging(evt));
    updateValue(true);
  }
  function onKeyup(evt) {
    if (keyCodes.includes(evt.keyCode)) {
      updateValue(true);
    }
  }
  function getTextContainerStyle(ratio) {
    if (props.vertical === true) {
      return null;
    }
    const p = $q.lang.rtl !== props.reverse ? 1 - ratio : ratio;
    return {
      transform: `translateX(calc(${2 * p - 1} * ${props.thumbSize} / 2 + ${50 - 100 * p}%))`
    };
  }
  function getThumbRenderFn(thumb) {
    const focusClass = computed(() => preventFocus.value === false && (focus.value === thumb.focusValue || focus.value === "both") ? " q-slider--focus" : "");
    const classes2 = computed(
      () => `q-slider__thumb q-slider__thumb${axis.value} q-slider__thumb${axis.value}-${isReversed.value === true ? "rtl" : "ltr"} absolute non-selectable` + focusClass.value + (thumb.thumbColor.value !== void 0 ? ` text-${thumb.thumbColor.value}` : "")
    );
    const style = computed(() => ({
      width: props.thumbSize,
      height: props.thumbSize,
      [positionProp.value]: `${100 * thumb.ratio.value}%`,
      zIndex: focus.value === thumb.focusValue ? 2 : void 0
    }));
    const pinColor = computed(() => thumb.labelColor.value !== void 0 ? ` text-${thumb.labelColor.value}` : "");
    const textContainerStyle = computed(() => getTextContainerStyle(thumb.ratio.value));
    const textClass = computed(() => "q-slider__text" + (thumb.labelTextColor.value !== void 0 ? ` text-${thumb.labelTextColor.value}` : ""));
    return () => {
      const thumbContent = [
        h("svg", {
          class: "q-slider__thumb-shape absolute-full",
          viewBox: "0 0 20 20",
          "aria-hidden": "true"
        }, [
          h("path", { d: props.thumbPath })
        ]),
        h("div", { class: "q-slider__focus-ring fit" })
      ];
      if (props.label === true || props.labelAlways === true) {
        thumbContent.push(
          h("div", {
            class: pinClass.value + " absolute fit no-pointer-events" + pinColor.value
          }, [
            h("div", {
              class: labelClass.value,
              style: { minWidth: props.thumbSize }
            }, [
              h("div", {
                class: textContainerClass.value,
                style: textContainerStyle.value
              }, [
                h("span", { class: textClass.value }, thumb.label.value)
              ])
            ])
          ])
        );
        if (props.name !== void 0 && props.disable !== true) {
          injectFormInput(thumbContent, "push");
        }
      }
      return h("div", {
        class: classes2.value,
        style: style.value,
        ...thumb.getNodeData()
      }, thumbContent);
    };
  }
  function getContent(selectionBarStyle, trackContainerTabindex, trackContainerEvents, injectThumb) {
    const trackContent = [];
    props.innerTrackColor !== "transparent" && trackContent.push(
      h("div", {
        key: "inner",
        class: innerBarClass.value,
        style: innerBarStyle.value
      })
    );
    props.selectionColor !== "transparent" && trackContent.push(
      h("div", {
        key: "selection",
        class: selectionBarClass.value,
        style: selectionBarStyle.value
      })
    );
    props.markers !== false && trackContent.push(
      h("div", {
        key: "marker",
        class: markerClass.value,
        style: markerStyle.value
      })
    );
    injectThumb(trackContent);
    const content = [
      hDir(
        "div",
        {
          key: "trackC",
          class: trackContainerClass.value,
          tabindex: trackContainerTabindex.value,
          ...trackContainerEvents.value
        },
        [
          h("div", {
            class: trackClass.value,
            style: trackStyle.value
          }, trackContent)
        ],
        "slide",
        editable.value,
        () => panDirective.value
      )
    ];
    if (props.markerLabels !== false) {
      const action = props.switchMarkerLabelsSide === true ? "unshift" : "push";
      content[action](
        h("div", {
          key: "markerL",
          class: markerLabelsContainerClass.value
        }, getMarkerLabelsContent())
      );
    }
    return content;
  }
  onBeforeUnmount(() => {
    document.removeEventListener("mouseup", onDeactivate, true);
  });
  return {
    state: {
      active,
      focus,
      preventFocus,
      dragging,
      editable,
      classes,
      tabindex,
      attributes,
      roundValueFn,
      keyStep,
      trackLen,
      innerMin,
      innerMinRatio,
      innerMax,
      innerMaxRatio,
      positionProp,
      sizeProp,
      isReversed
    },
    methods: {
      onActivate,
      onMobileClick,
      onBlur,
      onKeyup,
      getContent,
      getThumbRenderFn,
      convertRatioToModel,
      convertModelToRatio,
      getDraggingRatio
    }
  };
}
const dragType = {
  MIN: 0,
  RANGE: 1,
  MAX: 2
};
const QRange = createComponent({
  name: "QRange",
  props: {
    ...useSliderProps,
    modelValue: {
      type: Object,
      default: () => ({ min: null, max: null }),
      validator: (v) => "min" in v && "max" in v
    },
    dragRange: Boolean,
    dragOnlyRange: Boolean,
    leftLabelColor: String,
    leftLabelTextColor: String,
    rightLabelColor: String,
    rightLabelTextColor: String,
    leftLabelValue: [String, Number],
    rightLabelValue: [String, Number],
    leftThumbColor: String,
    rightThumbColor: String
  },
  emits: useSliderEmits,
  setup(props, { emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const { state, methods } = useSlider({
      updateValue,
      updatePosition,
      getDragging,
      formAttrs: computed(() => ({
        type: "hidden",
        name: props.name,
        value: `${props.modelValue.min}|${props.modelValue.max}`
      }))
    });
    const rootRef = ref(null);
    const curMinRatio = ref(0);
    const curMaxRatio = ref(0);
    const model = ref({ min: 0, max: 0 });
    function normalizeModel() {
      model.value.min = props.modelValue.min === null ? state.innerMin.value : between(props.modelValue.min, state.innerMin.value, state.innerMax.value);
      model.value.max = props.modelValue.max === null ? state.innerMax.value : between(props.modelValue.max, state.innerMin.value, state.innerMax.value);
    }
    watch(
      () => `${props.modelValue.min}|${props.modelValue.max}|${state.innerMin.value}|${state.innerMax.value}`,
      normalizeModel
    );
    normalizeModel();
    const modelMinRatio = computed(() => methods.convertModelToRatio(model.value.min));
    const modelMaxRatio = computed(() => methods.convertModelToRatio(model.value.max));
    const ratioMin = computed(() => state.active.value === true ? curMinRatio.value : modelMinRatio.value);
    const ratioMax = computed(() => state.active.value === true ? curMaxRatio.value : modelMaxRatio.value);
    const selectionBarStyle = computed(() => {
      const acc = {
        [state.positionProp.value]: `${100 * ratioMin.value}%`,
        [state.sizeProp.value]: `${100 * (ratioMax.value - ratioMin.value)}%`
      };
      if (props.selectionImg !== void 0) {
        acc.backgroundImage = `url(${props.selectionImg}) !important`;
      }
      return acc;
    });
    const trackContainerEvents = computed(() => {
      if (state.editable.value !== true) {
        return {};
      }
      if ($q.platform.is.mobile === true) {
        return { onClick: methods.onMobileClick };
      }
      const evt = { onMousedown: methods.onActivate };
      if (props.dragRange === true || props.dragOnlyRange === true) {
        Object.assign(evt, {
          onFocus: () => {
            state.focus.value = "both";
          },
          onBlur: methods.onBlur,
          onKeydown,
          onKeyup: methods.onKeyup
        });
      }
      return evt;
    });
    function getEvents(side) {
      return $q.platform.is.mobile !== true && state.editable.value === true && props.dragOnlyRange !== true ? {
        onFocus: () => {
          state.focus.value = side;
        },
        onBlur: methods.onBlur,
        onKeydown,
        onKeyup: methods.onKeyup
      } : {};
    }
    const thumbTabindex = computed(() => props.dragOnlyRange !== true ? state.tabindex.value : null);
    const trackContainerTabindex = computed(() => $q.platform.is.mobile !== true && (props.dragRange || props.dragOnlyRange === true) ? state.tabindex.value : null);
    const minThumbRef = ref(null);
    const minEvents = computed(() => getEvents("min"));
    const getMinThumb = methods.getThumbRenderFn({
      focusValue: "min",
      getNodeData: () => ({
        ref: minThumbRef,
        key: "tmin",
        ...minEvents.value,
        tabindex: thumbTabindex.value
      }),
      ratio: ratioMin,
      label: computed(() => props.leftLabelValue !== void 0 ? props.leftLabelValue : model.value.min),
      thumbColor: computed(() => props.leftThumbColor || props.thumbColor || props.color),
      labelColor: computed(() => props.leftLabelColor || props.labelColor),
      labelTextColor: computed(() => props.leftLabelTextColor || props.labelTextColor)
    });
    const maxEvents = computed(() => getEvents("max"));
    const getMaxThumb = methods.getThumbRenderFn({
      focusValue: "max",
      getNodeData: () => ({
        ...maxEvents.value,
        key: "tmax",
        tabindex: thumbTabindex.value
      }),
      ratio: ratioMax,
      label: computed(() => props.rightLabelValue !== void 0 ? props.rightLabelValue : model.value.max),
      thumbColor: computed(() => props.rightThumbColor || props.thumbColor || props.color),
      labelColor: computed(() => props.rightLabelColor || props.labelColor),
      labelTextColor: computed(() => props.rightLabelTextColor || props.labelTextColor)
    });
    function updateValue(change) {
      if (model.value.min !== props.modelValue.min || model.value.max !== props.modelValue.max) {
        emit("update:modelValue", { ...model.value });
      }
      change === true && emit("change", { ...model.value });
    }
    function getDragging(event) {
      const { left, top, width, height } = rootRef.value.getBoundingClientRect(), sensitivity = props.dragOnlyRange === true ? 0 : props.vertical === true ? minThumbRef.value.offsetHeight / (2 * height) : minThumbRef.value.offsetWidth / (2 * width);
      const dragging = {
        left,
        top,
        width,
        height,
        valueMin: model.value.min,
        valueMax: model.value.max,
        ratioMin: modelMinRatio.value,
        ratioMax: modelMaxRatio.value
      };
      const ratio = methods.getDraggingRatio(event, dragging);
      if (props.dragOnlyRange !== true && ratio < dragging.ratioMin + sensitivity) {
        dragging.type = dragType.MIN;
      } else if (props.dragOnlyRange === true || ratio < dragging.ratioMax - sensitivity) {
        if (props.dragRange === true || props.dragOnlyRange === true) {
          dragging.type = dragType.RANGE;
          Object.assign(dragging, {
            offsetRatio: ratio,
            offsetModel: methods.convertRatioToModel(ratio),
            rangeValue: dragging.valueMax - dragging.valueMin,
            rangeRatio: dragging.ratioMax - dragging.ratioMin
          });
        } else {
          dragging.type = dragging.ratioMax - ratio < ratio - dragging.ratioMin ? dragType.MAX : dragType.MIN;
        }
      } else {
        dragging.type = dragType.MAX;
      }
      return dragging;
    }
    function updatePosition(event, dragging = state.dragging.value) {
      let pos;
      const ratio = methods.getDraggingRatio(event, dragging);
      const localModel = methods.convertRatioToModel(ratio);
      switch (dragging.type) {
        case dragType.MIN:
          if (ratio <= dragging.ratioMax) {
            pos = {
              minR: ratio,
              maxR: dragging.ratioMax,
              min: localModel,
              max: dragging.valueMax
            };
            state.focus.value = "min";
          } else {
            pos = {
              minR: dragging.ratioMax,
              maxR: ratio,
              min: dragging.valueMax,
              max: localModel
            };
            state.focus.value = "max";
          }
          break;
        case dragType.MAX:
          if (ratio >= dragging.ratioMin) {
            pos = {
              minR: dragging.ratioMin,
              maxR: ratio,
              min: dragging.valueMin,
              max: localModel
            };
            state.focus.value = "max";
          } else {
            pos = {
              minR: ratio,
              maxR: dragging.ratioMin,
              min: localModel,
              max: dragging.valueMin
            };
            state.focus.value = "min";
          }
          break;
        case dragType.RANGE:
          const ratioDelta = ratio - dragging.offsetRatio, minR = between(dragging.ratioMin + ratioDelta, state.innerMinRatio.value, state.innerMaxRatio.value - dragging.rangeRatio), modelDelta = localModel - dragging.offsetModel, min = between(dragging.valueMin + modelDelta, state.innerMin.value, state.innerMax.value - dragging.rangeValue);
          pos = {
            minR,
            maxR: minR + dragging.rangeRatio,
            min: state.roundValueFn.value(min),
            max: state.roundValueFn.value(min + dragging.rangeValue)
          };
          state.focus.value = "both";
          break;
      }
      model.value = model.value.min === null || model.value.max === null ? { min: pos.min || props.min, max: pos.max || props.max } : { min: pos.min, max: pos.max };
      if (props.snap !== true || props.step === 0) {
        curMinRatio.value = pos.minR;
        curMaxRatio.value = pos.maxR;
      } else {
        curMinRatio.value = methods.convertModelToRatio(model.value.min);
        curMaxRatio.value = methods.convertModelToRatio(model.value.max);
      }
    }
    function onKeydown(evt) {
      if (keyCodes.includes(evt.keyCode) === false) return;
      stopAndPrevent(evt);
      const stepVal = ([34, 33].includes(evt.keyCode) ? 10 : 1) * state.keyStep.value, offset = ([34, 37, 40].includes(evt.keyCode) ? -1 : 1) * (state.isReversed.value === true ? -1 : 1) * (props.vertical === true ? -1 : 1) * stepVal;
      if (state.focus.value === "both") {
        const interval = model.value.max - model.value.min;
        const min = between(
          state.roundValueFn.value(model.value.min + offset),
          state.innerMin.value,
          state.innerMax.value - interval
        );
        model.value = {
          min,
          max: state.roundValueFn.value(min + interval)
        };
      } else if (state.focus.value === false) {
        return;
      } else {
        const which = state.focus.value;
        model.value = {
          ...model.value,
          [which]: between(
            state.roundValueFn.value(model.value[which] + offset),
            which === "min" ? state.innerMin.value : model.value.min,
            which === "max" ? state.innerMax.value : model.value.max
          )
        };
      }
      updateValue();
    }
    return () => {
      const content = methods.getContent(
        selectionBarStyle,
        trackContainerTabindex,
        trackContainerEvents,
        (node) => {
          node.push(
            getMinThumb(),
            getMaxThumb()
          );
        }
      );
      return h("div", {
        ref: rootRef,
        class: "q-range " + state.classes.value + (props.modelValue.min === null || props.modelValue.max === null ? " q-slider--no-value" : ""),
        ...state.attributes.value,
        "aria-valuenow": props.modelValue.min + "|" + props.modelValue.max
      }, content);
    };
  }
});
function getBool(val, otherwise) {
  return [true, false].includes(val) ? val : otherwise;
}
const QPagination = createComponent({
  name: "QPagination",
  props: {
    ...useDarkProps,
    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      required: true
    },
    maxPages: {
      type: [Number, String],
      default: 0,
      validator: (v) => (typeof v === "string" ? parseInt(v, 10) : v) >= 0
    },
    inputStyle: [Array, String, Object],
    inputClass: [Array, String, Object],
    size: String,
    disable: Boolean,
    input: Boolean,
    iconPrev: String,
    iconNext: String,
    iconFirst: String,
    iconLast: String,
    toFn: Function,
    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    round: Boolean,
    rounded: Boolean,
    flat: Boolean,
    outline: Boolean,
    unelevated: Boolean,
    push: Boolean,
    glossy: Boolean,
    color: {
      type: String,
      default: "primary"
    },
    textColor: String,
    activeDesign: {
      type: String,
      default: "",
      values: (v) => v === "" || btnDesignOptions.includes(v)
    },
    activeColor: String,
    activeTextColor: String,
    gutter: String,
    padding: {
      type: String,
      default: "3px 2px"
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const minProp = computed(() => parseInt(props.min, 10));
    const maxProp = computed(() => parseInt(props.max, 10));
    const maxPagesProp = computed(() => parseInt(props.maxPages, 10));
    const inputPlaceholder = computed(() => model.value + " / " + maxProp.value);
    const boundaryLinksProp = computed(() => getBool(props.boundaryLinks, props.input));
    const boundaryNumbersProp = computed(() => getBool(props.boundaryNumbers, !props.input));
    const directionLinksProp = computed(() => getBool(props.directionLinks, props.input));
    const ellipsesProp = computed(() => getBool(props.ellipses, !props.input));
    const newPage = ref(null);
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        val = parseInt(val, 10);
        if (props.disable || isNaN(val)) return;
        const value = between(val, minProp.value, maxProp.value);
        if (props.modelValue !== value) {
          emit("update:modelValue", value);
        }
      }
    });
    watch(() => `${minProp.value}|${maxProp.value}`, () => {
      model.value = props.modelValue;
    });
    const classes = computed(
      () => "q-pagination row no-wrap items-center" + (props.disable === true ? " disabled" : "")
    );
    const gutterProp = computed(() => props.gutter in btnPadding ? `${btnPadding[props.gutter]}px` : props.gutter || null);
    const gutterStyle = computed(() => gutterProp.value !== null ? `--q-pagination-gutter-parent:-${gutterProp.value};--q-pagination-gutter-child:${gutterProp.value}` : null);
    const icons = computed(() => {
      const ico = [
        props.iconFirst || $q.iconSet.pagination.first,
        props.iconPrev || $q.iconSet.pagination.prev,
        props.iconNext || $q.iconSet.pagination.next,
        props.iconLast || $q.iconSet.pagination.last
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico;
    });
    const attrs = computed(() => ({
      "aria-disabled": props.disable === true ? "true" : "false",
      role: "navigation"
    }));
    const btnDesignProp = computed(() => getBtnDesign(props, "flat"));
    const btnProps = computed(() => ({
      [btnDesignProp.value]: true,
      round: props.round,
      rounded: props.rounded,
      padding: props.padding,
      color: props.color,
      textColor: props.textColor,
      size: props.size,
      ripple: props.ripple !== null ? props.ripple : true
    }));
    const btnActiveDesignProp = computed(() => {
      const acc = { [btnDesignProp.value]: false };
      if (props.activeDesign !== "") {
        acc[props.activeDesign] = true;
      }
      return acc;
    });
    const activeBtnProps = computed(() => ({
      ...btnActiveDesignProp.value,
      color: props.activeColor || props.color,
      textColor: props.activeTextColor || props.textColor
    }));
    const btnConfig = computed(() => {
      let maxPages = Math.max(
        maxPagesProp.value,
        1 + (ellipsesProp.value ? 2 : 0) + (boundaryNumbersProp.value ? 2 : 0)
      );
      const acc = {
        pgFrom: minProp.value,
        pgTo: maxProp.value,
        ellipsesStart: false,
        ellipsesEnd: false,
        boundaryStart: false,
        boundaryEnd: false,
        marginalStyle: {
          minWidth: `${Math.max(2, String(maxProp.value).length)}em`
        }
      };
      if (maxPagesProp.value && maxPages < maxProp.value - minProp.value + 1) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        acc.pgFrom = Math.max(minProp.value, Math.min(maxProp.value - maxPages + 1, props.modelValue - Math.floor(maxPages / 2)));
        acc.pgTo = Math.min(maxProp.value, acc.pgFrom + maxPages - 1);
        if (boundaryNumbersProp.value) {
          acc.boundaryStart = true;
          acc.pgFrom++;
        }
        if (ellipsesProp.value && acc.pgFrom > minProp.value + (boundaryNumbersProp.value ? 1 : 0)) {
          acc.ellipsesStart = true;
          acc.pgFrom++;
        }
        if (boundaryNumbersProp.value) {
          acc.boundaryEnd = true;
          acc.pgTo--;
        }
        if (ellipsesProp.value && acc.pgTo < maxProp.value - (boundaryNumbersProp.value ? 1 : 0)) {
          acc.ellipsesEnd = true;
          acc.pgTo--;
        }
      }
      return acc;
    });
    function set(value) {
      model.value = value;
    }
    function setByOffset(offset) {
      model.value = model.value + offset;
    }
    const inputEvents = computed(() => {
      function updateModel() {
        model.value = newPage.value;
        newPage.value = null;
      }
      return {
        "onUpdate:modelValue": (val) => {
          newPage.value = val;
        },
        onKeyup: (e) => {
          isKeyCode(e, 13) === true && updateModel();
        },
        onBlur: updateModel
      };
    });
    function getBtn(cfg, page, active) {
      const data = {
        "aria-label": page,
        "aria-current": "false",
        ...btnProps.value,
        ...cfg
      };
      if (active === true) {
        Object.assign(data, {
          "aria-current": "true",
          ...activeBtnProps.value
        });
      }
      if (page !== void 0) {
        if (props.toFn !== void 0) {
          data.to = props.toFn(page);
        } else {
          data.onClick = () => {
            set(page);
          };
        }
      }
      return h(QBtn, data);
    }
    Object.assign(proxy, { set, setByOffset });
    return () => {
      const contentStart = [];
      const contentEnd = [];
      let contentMiddle;
      if (boundaryLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: "bls",
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[0],
            "aria-label": $q.lang.pagination.first
          }, minProp.value)
        );
        contentEnd.unshift(
          getBtn({
            key: "ble",
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[3],
            "aria-label": $q.lang.pagination.last
          }, maxProp.value)
        );
      }
      if (directionLinksProp.value === true) {
        contentStart.push(
          getBtn({
            key: "bdp",
            disable: props.disable || props.modelValue <= minProp.value,
            icon: icons.value[1],
            "aria-label": $q.lang.pagination.prev
          }, props.modelValue - 1)
        );
        contentEnd.unshift(
          getBtn({
            key: "bdn",
            disable: props.disable || props.modelValue >= maxProp.value,
            icon: icons.value[2],
            "aria-label": $q.lang.pagination.next
          }, props.modelValue + 1)
        );
      }
      if (props.input !== true) {
        contentMiddle = [];
        const { pgFrom, pgTo, marginalStyle: style } = btnConfig.value;
        if (btnConfig.value.boundaryStart === true) {
          const active = minProp.value === props.modelValue;
          contentStart.push(
            getBtn({
              key: "bns",
              style,
              disable: props.disable,
              label: minProp.value
            }, minProp.value, active)
          );
        }
        if (btnConfig.value.boundaryEnd === true) {
          const active = maxProp.value === props.modelValue;
          contentEnd.unshift(
            getBtn({
              key: "bne",
              style,
              disable: props.disable,
              label: maxProp.value
            }, maxProp.value, active)
          );
        }
        if (btnConfig.value.ellipsesStart === true) {
          contentStart.push(
            getBtn({
              key: "bes",
              style,
              disable: props.disable,
              label: "…",
              ripple: false
            }, pgFrom - 1)
          );
        }
        if (btnConfig.value.ellipsesEnd === true) {
          contentEnd.unshift(
            getBtn({
              key: "bee",
              style,
              disable: props.disable,
              label: "…",
              ripple: false
            }, pgTo + 1)
          );
        }
        for (let i = pgFrom; i <= pgTo; i++) {
          contentMiddle.push(
            getBtn({
              key: `bpg${i}`,
              style,
              disable: props.disable,
              label: i
            }, i, i === props.modelValue)
          );
        }
      }
      return h("div", {
        class: classes.value,
        ...attrs.value
      }, [
        h("div", {
          class: "q-pagination__content row no-wrap items-center",
          style: gutterStyle.value
        }, [
          ...contentStart,
          props.input === true ? h(QInput, {
            class: "inline",
            style: { width: `${inputPlaceholder.value.length / 1.5}em` },
            type: "number",
            dense: true,
            value: newPage.value,
            disable: props.disable,
            dark: isDark.value,
            borderless: true,
            inputClass: props.inputClass,
            inputStyle: props.inputStyle,
            placeholder: inputPlaceholder.value,
            min: minProp.value,
            max: maxProp.value,
            ...inputEvents.value
          }) : h("div", {
            class: "q-pagination__middle row justify-center"
          }, contentMiddle),
          ...contentEnd
        ])
      ]);
    };
  }
});
export {
  QSkeleton as Q,
  QRange as a,
  QPagination as b
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVBhZ2luYXRpb24tbExBMnhidlEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2tlbGV0b24vUVNrZWxldG9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zbGlkZXIvdXNlLXNsaWRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcmFuZ2UvUVJhbmdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdpbmF0aW9uL1FQYWdpbmF0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgY29uc3Qgc2tlbGV0b25UeXBlcyA9IFtcbiAgJ3RleHQnLCAncmVjdCcsICdjaXJjbGUnLFxuICAnUUJ0bicsICdRQmFkZ2UnLCAnUUNoaXAnLCAnUVRvb2xiYXInLFxuICAnUUNoZWNrYm94JywgJ1FSYWRpbycsICdRVG9nZ2xlJyxcbiAgJ1FTbGlkZXInLCAnUVJhbmdlJywgJ1FJbnB1dCcsXG4gICdRQXZhdGFyJ1xuXVxuXG5leHBvcnQgY29uc3Qgc2tlbGV0b25BbmltYXRpb25zID0gW1xuICAnd2F2ZScsICdwdWxzZScsICdwdWxzZS14JywgJ3B1bHNlLXknLCAnZmFkZScsICdibGluaycsICdub25lJ1xuXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNrZWxldG9uJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHNrZWxldG9uVHlwZXMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAncmVjdCdcbiAgICB9LFxuXG4gICAgYW5pbWF0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gc2tlbGV0b25BbmltYXRpb25zLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3dhdmUnXG4gICAgfSxcbiAgICBhbmltYXRpb25TcGVlZDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMTUwMFxuICAgIH0sXG5cbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG5cbiAgICBzaXplOiBTdHJpbmcsXG4gICAgd2lkdGg6IFN0cmluZyxcbiAgICBoZWlnaHQ6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaXplID0gcHJvcHMuc2l6ZSAhPT0gdm9pZCAwXG4gICAgICAgID8gWyBwcm9wcy5zaXplLCBwcm9wcy5zaXplIF1cbiAgICAgICAgOiBbIHByb3BzLndpZHRoLCBwcm9wcy5oZWlnaHQgXVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAnLS1xLXNrZWxldG9uLXNwZWVkJzogYCR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tc2AsXG4gICAgICAgIHdpZHRoOiBzaXplWyAwIF0sXG4gICAgICAgIGhlaWdodDogc2l6ZVsgMSBdXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc2tlbGV0b24gcS1za2VsZXRvbi0tJHsgaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJ2RhcmsnIDogJ2xpZ2h0JyB9IHEtc2tlbGV0b24tLXR5cGUtJHsgcHJvcHMudHlwZSB9YFxuICAgICAgKyAocHJvcHMuYW5pbWF0aW9uICE9PSAnbm9uZScgPyBgIHEtc2tlbGV0b24tLWFuaW0gcS1za2VsZXRvbi0tYW5pbS0keyBwcm9wcy5hbmltYXRpb24gfWAgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1za2VsZXRvbi0tc3F1YXJlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtc2tlbGV0b24tLWJvcmRlcmVkJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKHByb3BzLnRhZywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaC1wYW4vVG91Y2hQYW4uanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbmplY3QgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IHBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBpc051bWJlciwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcbmltcG9ydCB7IGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmNvbnN0IG1hcmtlclByZWZpeENsYXNzID0gJ3Etc2xpZGVyX19tYXJrZXItbGFiZWxzJ1xuY29uc3QgZGVmYXVsdE1hcmtlckNvbnZlcnRGbiA9IHYgPT4gKHsgdmFsdWU6IHYgfSlcbmNvbnN0IGRlZmF1bHRNYXJrZXJMYWJlbFJlbmRlckZuID0gKHsgbWFya2VyIH0pID0+IGgoJ2RpdicsIHtcbiAga2V5OiBtYXJrZXIudmFsdWUsXG4gIHN0eWxlOiBtYXJrZXIuc3R5bGUsXG4gIGNsYXNzOiBtYXJrZXIuY2xhc3Nlc1xufSwgbWFya2VyLmxhYmVsKVxuXG4vLyBQR0RPV04sIExFRlQsIERPV04sIFBHVVAsIFJJR0hULCBVUFxuZXhwb3J0IGNvbnN0IGtleUNvZGVzID0gWyAzNCwgMzcsIDQwLCAzMywgMzksIDM4IF1cblxuZXhwb3J0IGNvbnN0IHVzZVNsaWRlclByb3BzID0ge1xuICAuLi51c2VEYXJrUHJvcHMsXG4gIC4uLnVzZUZvcm1Qcm9wcyxcblxuICBtaW46IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMTAwXG4gIH0sXG4gIGlubmVyTWluOiBOdW1iZXIsXG4gIGlubmVyTWF4OiBOdW1iZXIsXG5cbiAgc3RlcDoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAxLFxuICAgIHZhbGlkYXRvcjogdiA9PiB2ID49IDBcbiAgfSxcblxuICBzbmFwOiBCb29sZWFuLFxuXG4gIHZlcnRpY2FsOiBCb29sZWFuLFxuICByZXZlcnNlOiBCb29sZWFuLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIG1hcmtlckxhYmVsc0NsYXNzOiBTdHJpbmcsXG5cbiAgbGFiZWw6IEJvb2xlYW4sXG4gIGxhYmVsQ29sb3I6IFN0cmluZyxcbiAgbGFiZWxUZXh0Q29sb3I6IFN0cmluZyxcbiAgbGFiZWxBbHdheXM6IEJvb2xlYW4sXG4gIHN3aXRjaExhYmVsU2lkZTogQm9vbGVhbixcblxuICBtYXJrZXJzOiBbIEJvb2xlYW4sIE51bWJlciBdLFxuICBtYXJrZXJMYWJlbHM6IFsgQm9vbGVhbiwgQXJyYXksIE9iamVjdCwgRnVuY3Rpb24gXSxcbiAgc3dpdGNoTWFya2VyTGFiZWxzU2lkZTogQm9vbGVhbixcblxuICB0cmFja0ltZzogU3RyaW5nLFxuICB0cmFja0NvbG9yOiBTdHJpbmcsXG4gIGlubmVyVHJhY2tJbWc6IFN0cmluZyxcbiAgaW5uZXJUcmFja0NvbG9yOiBTdHJpbmcsXG4gIHNlbGVjdGlvbkNvbG9yOiBTdHJpbmcsXG4gIHNlbGVjdGlvbkltZzogU3RyaW5nLFxuXG4gIHRodW1iU2l6ZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnMjBweCdcbiAgfSxcbiAgdHJhY2tTaXplOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICc0cHgnXG4gIH0sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcbiAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gIGRlbnNlOiBCb29sZWFuLFxuXG4gIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgdGh1bWJDb2xvcjogU3RyaW5nLFxuICB0aHVtYlBhdGg6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ00gNCwgMTAgYSA2LDYgMCAxLDAgMTIsMCBhIDYsNiAwIDEsMCAtMTIsMCdcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdXNlU2xpZGVyRW1pdHMgPSBbICdwYW4nLCAndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2hhbmdlJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7IHVwZGF0ZVZhbHVlLCB1cGRhdGVQb3NpdGlvbiwgZ2V0RHJhZ2dpbmcsIGZvcm1BdHRycyB9KSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICBjb25zdCBhY3RpdmUgPSByZWYoZmFsc2UpXG4gIGNvbnN0IHByZXZlbnRGb2N1cyA9IHJlZihmYWxzZSlcbiAgY29uc3QgZm9jdXMgPSByZWYoZmFsc2UpXG4gIGNvbnN0IGRyYWdnaW5nID0gcmVmKGZhbHNlKVxuXG4gIGNvbnN0IGF4aXMgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnLS12JyA6ICctLWgnKSlcbiAgY29uc3QgbGFiZWxTaWRlID0gY29tcHV0ZWQoKCkgPT4gJy0nICsgKHByb3BzLnN3aXRjaExhYmVsU2lkZSA9PT0gdHJ1ZSA/ICdzd2l0Y2hlZCcgOiAnc3RhbmRhcmQnKSlcblxuICBjb25zdCBpc1JldmVyc2VkID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICA/IHByb3BzLnJldmVyc2UgPT09IHRydWVcbiAgICAgIDogcHJvcHMucmV2ZXJzZSAhPT0gKCRxLmxhbmcucnRsID09PSB0cnVlKVxuICApKVxuXG4gIGNvbnN0IGlubmVyTWluID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzTmFOKHByb3BzLmlubmVyTWluKSA9PT0gdHJ1ZSB8fCBwcm9wcy5pbm5lck1pbiA8IHByb3BzLm1pblxuICAgICAgPyBwcm9wcy5taW5cbiAgICAgIDogcHJvcHMuaW5uZXJNaW5cbiAgKSlcbiAgY29uc3QgaW5uZXJNYXggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaXNOYU4ocHJvcHMuaW5uZXJNYXgpID09PSB0cnVlIHx8IHByb3BzLmlubmVyTWF4ID4gcHJvcHMubWF4XG4gICAgICA/IHByb3BzLm1heFxuICAgICAgOiBwcm9wcy5pbm5lck1heFxuICApKVxuXG4gIGNvbnN0IGVkaXRhYmxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgICAmJiBpbm5lck1pbi52YWx1ZSA8IGlubmVyTWF4LnZhbHVlXG4gICkpXG5cbiAgY29uc3Qgcm91bmRWYWx1ZUZuID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5zdGVwID09PSAwKSB7XG4gICAgICByZXR1cm4gdiA9PiB2XG4gICAgfVxuXG4gICAgY29uc3QgZGVjaW1hbHMgPSAoU3RyaW5nKHByb3BzLnN0ZXApLnRyaW0oKS5zcGxpdCgnLicpWyAxIF0gfHwgJycpLmxlbmd0aFxuICAgIHJldHVybiB2ID0+IHBhcnNlRmxvYXQodi50b0ZpeGVkKGRlY2ltYWxzKSlcbiAgfSlcblxuICBjb25zdCBrZXlTdGVwID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnN0ZXAgPT09IDAgPyAxIDogcHJvcHMuc3RlcCkpXG4gIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKGVkaXRhYmxlLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggfHwgMCA6IC0xKSlcblxuICBjb25zdCB0cmFja0xlbiA9IGNvbXB1dGVkKCgpID0+IHByb3BzLm1heCAtIHByb3BzLm1pbilcbiAgY29uc3QgaW5uZXJCYXJMZW4gPSBjb21wdXRlZCgoKSA9PiBpbm5lck1heC52YWx1ZSAtIGlubmVyTWluLnZhbHVlKVxuXG4gIGNvbnN0IGlubmVyTWluUmF0aW8gPSBjb21wdXRlZCgoKSA9PiBjb252ZXJ0TW9kZWxUb1JhdGlvKGlubmVyTWluLnZhbHVlKSlcbiAgY29uc3QgaW5uZXJNYXhSYXRpbyA9IGNvbXB1dGVkKCgpID0+IGNvbnZlcnRNb2RlbFRvUmF0aW8oaW5uZXJNYXgudmFsdWUpKVxuXG4gIGNvbnN0IHBvc2l0aW9uUHJvcCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgPyAoaXNSZXZlcnNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICdib3R0b20nIDogJ3RvcCcpXG4gICAgICA6IChpc1JldmVyc2VkLnZhbHVlID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JylcbiAgKSlcblxuICBjb25zdCBzaXplUHJvcCA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdoZWlnaHQnIDogJ3dpZHRoJykpXG4gIGNvbnN0IHRoaWNrbmVzc1Byb3AgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnd2lkdGgnIDogJ2hlaWdodCcpKVxuICBjb25zdCBvcmllbnRhdGlvbiA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcpKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0ge1xuICAgICAgcm9sZTogJ3NsaWRlcicsXG4gICAgICAnYXJpYS12YWx1ZW1pbic6IGlubmVyTWluLnZhbHVlLFxuICAgICAgJ2FyaWEtdmFsdWVtYXgnOiBpbm5lck1heC52YWx1ZSxcbiAgICAgICdhcmlhLW9yaWVudGF0aW9uJzogb3JpZW50YXRpb24udmFsdWUsXG4gICAgICAnZGF0YS1zdGVwJzogcHJvcHMuc3RlcFxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLXJlYWRvbmx5JyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLXNsaWRlciBxLXNsaWRlciR7IGF4aXMudmFsdWUgfSBxLXNsaWRlci0tJHsgYWN0aXZlLnZhbHVlID09PSB0cnVlID8gJycgOiAnaW4nIH1hY3RpdmUgaW5saW5lIG5vLXdyYXAgYFxuICAgICsgKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3JvdycgOiAnY29sdW1uJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnIHEtc2xpZGVyLS1lbmFibGVkJyArIChlZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zbGlkZXItLWVkaXRhYmxlJyA6ICcnKSlcbiAgICArIChmb2N1cy52YWx1ZSA9PT0gJ2JvdGgnID8gJyBxLXNsaWRlci0tZm9jdXMnIDogJycpXG4gICAgKyAocHJvcHMubGFiZWwgfHwgcHJvcHMubGFiZWxBbHdheXMgPT09IHRydWUgPyAnIHEtc2xpZGVyLS1sYWJlbCcgOiAnJylcbiAgICArIChwcm9wcy5sYWJlbEFsd2F5cyA9PT0gdHJ1ZSA/ICcgcS1zbGlkZXItLWxhYmVsLWFsd2F5cycgOiAnJylcbiAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2xpZGVyLS1kYXJrJyA6ICcnKVxuICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXNsaWRlci0tZGVuc2UgcS1zbGlkZXItLWRlbnNlJyArIGF4aXMudmFsdWUgOiAnJylcbiAgKVxuXG4gIGZ1bmN0aW9uIGdldFBvc2l0aW9uQ2xhc3MgKG5hbWUpIHtcbiAgICBjb25zdCBjbHMgPSAncS1zbGlkZXJfXycgKyBuYW1lXG4gICAgcmV0dXJuIGAkeyBjbHMgfSAkeyBjbHMgfSR7IGF4aXMudmFsdWUgfSAkeyBjbHMgfSR7IGF4aXMudmFsdWUgfSR7IGxhYmVsU2lkZS52YWx1ZSB9YFxuICB9XG4gIGZ1bmN0aW9uIGdldEF4aXNDbGFzcyAobmFtZSkge1xuICAgIGNvbnN0IGNscyA9ICdxLXNsaWRlcl9fJyArIG5hbWVcbiAgICByZXR1cm4gYCR7IGNscyB9ICR7IGNscyB9JHsgYXhpcy52YWx1ZSB9YFxuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uQmFyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgY29sb3IgPSBwcm9wcy5zZWxlY3Rpb25Db2xvciB8fCBwcm9wcy5jb2xvclxuICAgIHJldHVybiAncS1zbGlkZXJfX3NlbGVjdGlvbiBhYnNvbHV0ZSdcbiAgICAgICsgKGNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IgfWAgOiAnJylcbiAgfSlcbiAgY29uc3QgbWFya2VyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBnZXRBeGlzQ2xhc3MoJ21hcmtlcnMnKSArICcgYWJzb2x1dGUgb3ZlcmZsb3ctaGlkZGVuJylcbiAgY29uc3QgdHJhY2tDb250YWluZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+IGdldEF4aXNDbGFzcygndHJhY2stY29udGFpbmVyJykpXG4gIGNvbnN0IHBpbkNsYXNzID0gY29tcHV0ZWQoKCkgPT4gZ2V0UG9zaXRpb25DbGFzcygncGluJykpXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBnZXRQb3NpdGlvbkNsYXNzKCdsYWJlbCcpKVxuICBjb25zdCB0ZXh0Q29udGFpbmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBnZXRQb3NpdGlvbkNsYXNzKCd0ZXh0LWNvbnRhaW5lcicpKVxuICBjb25zdCBtYXJrZXJMYWJlbHNDb250YWluZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgZ2V0UG9zaXRpb25DbGFzcygnbWFya2VyLWxhYmVscy1jb250YWluZXInKVxuICAgICsgKHByb3BzLm1hcmtlckxhYmVsc0NsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLm1hcmtlckxhYmVsc0NsYXNzIH1gIDogJycpXG4gIClcblxuICBjb25zdCB0cmFja0NsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1zbGlkZXJfX3RyYWNrIHJlbGF0aXZlLXBvc2l0aW9uIG5vLW91dGxpbmUnXG4gICAgKyAocHJvcHMudHJhY2tDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy50cmFja0NvbG9yIH1gIDogJycpXG4gIClcbiAgY29uc3QgdHJhY2tTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7IFsgdGhpY2tuZXNzUHJvcC52YWx1ZSBdOiBwcm9wcy50cmFja1NpemUgfVxuICAgIGlmIChwcm9wcy50cmFja0ltZyAhPT0gdm9pZCAwKSB7XG4gICAgICBhY2MuYmFja2dyb3VuZEltYWdlID0gYHVybCgkeyBwcm9wcy50cmFja0ltZyB9KSAhaW1wb3J0YW50YFxuICAgIH1cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgY29uc3QgaW5uZXJCYXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3Etc2xpZGVyX19pbm5lciBhYnNvbHV0ZSdcbiAgICArIChwcm9wcy5pbm5lclRyYWNrQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuaW5uZXJUcmFja0NvbG9yIH1gIDogJycpXG4gIClcbiAgY29uc3QgaW5uZXJCYXJTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBpbm5lckRpZmYgPSBpbm5lck1heFJhdGlvLnZhbHVlIC0gaW5uZXJNaW5SYXRpby52YWx1ZVxuICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgIFsgcG9zaXRpb25Qcm9wLnZhbHVlIF06IGAkeyAxMDAgKiBpbm5lck1pblJhdGlvLnZhbHVlIH0lYCxcbiAgICAgIFsgc2l6ZVByb3AudmFsdWUgXTogaW5uZXJEaWZmID09PSAwXG4gICAgICAgID8gJzJweCdcbiAgICAgICAgOiBgJHsgMTAwICogaW5uZXJEaWZmIH0lYFxuICAgIH1cbiAgICBpZiAocHJvcHMuaW5uZXJUcmFja0ltZyAhPT0gdm9pZCAwKSB7XG4gICAgICBhY2MuYmFja2dyb3VuZEltYWdlID0gYHVybCgkeyBwcm9wcy5pbm5lclRyYWNrSW1nIH0pICFpbXBvcnRhbnRgXG4gICAgfVxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICBmdW5jdGlvbiBjb252ZXJ0UmF0aW9Ub01vZGVsIChyYXRpbykge1xuICAgIGNvbnN0IHsgbWluLCBtYXgsIHN0ZXAgfSA9IHByb3BzXG4gICAgbGV0IG1vZGVsID0gbWluICsgcmF0aW8gKiAobWF4IC0gbWluKVxuXG4gICAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgICBjb25zdCBtb2R1bG8gPSAobW9kZWwgLSBpbm5lck1pbi52YWx1ZSkgJSBzdGVwXG4gICAgICBtb2RlbCArPSAoTWF0aC5hYnMobW9kdWxvKSA+PSBzdGVwIC8gMiA/IChtb2R1bG8gPCAwID8gLTEgOiAxKSAqIHN0ZXAgOiAwKSAtIG1vZHVsb1xuICAgIH1cblxuICAgIG1vZGVsID0gcm91bmRWYWx1ZUZuLnZhbHVlKG1vZGVsKVxuXG4gICAgcmV0dXJuIGJldHdlZW4obW9kZWwsIGlubmVyTWluLnZhbHVlLCBpbm5lck1heC52YWx1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRNb2RlbFRvUmF0aW8gKG1vZGVsKSB7XG4gICAgcmV0dXJuIHRyYWNrTGVuLnZhbHVlID09PSAwXG4gICAgICA/IDBcbiAgICAgIDogKG1vZGVsIC0gcHJvcHMubWluKSAvIHRyYWNrTGVuLnZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXREcmFnZ2luZ1JhdGlvIChldnQsIGRyYWdnaW5nKSB7XG4gICAgY29uc3RcbiAgICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgICB2YWwgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICA/IGJldHdlZW4oKHBvcy50b3AgLSBkcmFnZ2luZy50b3ApIC8gZHJhZ2dpbmcuaGVpZ2h0LCAwLCAxKVxuICAgICAgICA6IGJldHdlZW4oKHBvcy5sZWZ0IC0gZHJhZ2dpbmcubGVmdCkgLyBkcmFnZ2luZy53aWR0aCwgMCwgMSlcblxuICAgIHJldHVybiBiZXR3ZWVuKFxuICAgICAgaXNSZXZlcnNlZC52YWx1ZSA9PT0gdHJ1ZSA/IDEuMCAtIHZhbCA6IHZhbCxcbiAgICAgIGlubmVyTWluUmF0aW8udmFsdWUsXG4gICAgICBpbm5lck1heFJhdGlvLnZhbHVlXG4gICAgKVxuICB9XG5cbiAgY29uc3QgbWFya2VyU3RlcCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBpc051bWJlcihwcm9wcy5tYXJrZXJzKSA9PT0gdHJ1ZSA/IHByb3BzLm1hcmtlcnMgOiBrZXlTdGVwLnZhbHVlKVxuICApXG5cbiAgY29uc3QgbWFya2VyVGlja3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0gW11cbiAgICBjb25zdCBzdGVwID0gbWFya2VyU3RlcC52YWx1ZVxuICAgIGNvbnN0IG1heCA9IHByb3BzLm1heFxuXG4gICAgbGV0IHZhbHVlID0gcHJvcHMubWluXG4gICAgZG8ge1xuICAgICAgYWNjLnB1c2godmFsdWUpXG4gICAgICB2YWx1ZSArPSBzdGVwXG4gICAgfSB3aGlsZSAodmFsdWUgPCBtYXgpXG5cbiAgICBhY2MucHVzaChtYXgpXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGNvbnN0IG1hcmtlckxhYmVsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcHJlZml4ID0gYCAkeyBtYXJrZXJQcmVmaXhDbGFzcyB9JHsgYXhpcy52YWx1ZSB9LWBcbiAgICByZXR1cm4gbWFya2VyUHJlZml4Q2xhc3NcbiAgICAgICsgYCR7IHByZWZpeCB9JHsgcHJvcHMuc3dpdGNoTWFya2VyTGFiZWxzU2lkZSA9PT0gdHJ1ZSA/ICdzd2l0Y2hlZCcgOiAnc3RhbmRhcmQnIH1gXG4gICAgICArIGAkeyBwcmVmaXggfSR7IGlzUmV2ZXJzZWQudmFsdWUgPT09IHRydWUgPyAncnRsJyA6ICdsdHInIH1gXG4gIH0pXG5cbiAgY29uc3QgbWFya2VyTGFiZWxzTGlzdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMubWFya2VyTGFiZWxzID09PSBmYWxzZSkgeyByZXR1cm4gbnVsbCB9XG5cbiAgICByZXR1cm4gZ2V0TWFya2VyTGlzdChwcm9wcy5tYXJrZXJMYWJlbHMpLm1hcCgoZW50cnksIGluZGV4KSA9PiAoe1xuICAgICAgaW5kZXgsXG4gICAgICB2YWx1ZTogZW50cnkudmFsdWUsXG4gICAgICBsYWJlbDogZW50cnkubGFiZWwgfHwgZW50cnkudmFsdWUsXG4gICAgICBjbGFzc2VzOiBtYXJrZXJMYWJlbENsYXNzLnZhbHVlXG4gICAgICAgICsgKGVudHJ5LmNsYXNzZXMgIT09IHZvaWQgMCA/ICcgJyArIGVudHJ5LmNsYXNzZXMgOiAnJyksXG4gICAgICBzdHlsZToge1xuICAgICAgICAuLi5nZXRNYXJrZXJMYWJlbFN0eWxlKGVudHJ5LnZhbHVlKSxcbiAgICAgICAgLi4uKGVudHJ5LnN0eWxlIHx8IHt9KVxuICAgICAgfVxuICAgIH0pKVxuICB9KVxuXG4gIGNvbnN0IG1hcmtlclNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBtYXJrZXJMaXN0OiBtYXJrZXJMYWJlbHNMaXN0LnZhbHVlLFxuICAgIG1hcmtlck1hcDogbWFya2VyTGFiZWxzTWFwLnZhbHVlLFxuICAgIGNsYXNzZXM6IG1hcmtlckxhYmVsQ2xhc3MudmFsdWUsIC8vIFRPRE8gdHMgZGVmaW5pdGlvblxuICAgIGdldFN0eWxlOiBnZXRNYXJrZXJMYWJlbFN0eWxlXG4gIH0pKVxuXG4gIGNvbnN0IG1hcmtlclN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHNpemUgPSBpbm5lckJhckxlbi52YWx1ZSA9PT0gMFxuICAgICAgPyAnMnB4J1xuICAgICAgOiAxMDAgKiBtYXJrZXJTdGVwLnZhbHVlIC8gaW5uZXJCYXJMZW4udmFsdWVcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5pbm5lckJhclN0eWxlLnZhbHVlLFxuICAgICAgYmFja2dyb3VuZFNpemU6IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8gYDJweCAkeyBzaXplIH0lYFxuICAgICAgICA6IGAkeyBzaXplIH0lIDJweGBcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0TWFya2VyTGlzdCAoZGVmKSB7XG4gICAgaWYgKGRlZiA9PT0gZmFsc2UpIHsgcmV0dXJuIG51bGwgfVxuXG4gICAgaWYgKGRlZiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIG1hcmtlclRpY2tzLnZhbHVlLm1hcChkZWZhdWx0TWFya2VyQ29udmVydEZuKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbWFya2VyVGlja3MudmFsdWUubWFwKHZhbHVlID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRlZih2YWx1ZSlcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KGl0ZW0pID09PSB0cnVlID8geyAuLi5pdGVtLCB2YWx1ZSB9IDogeyB2YWx1ZSwgbGFiZWw6IGl0ZW0gfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJGbiA9ICh7IHZhbHVlIH0pID0+IHZhbHVlID49IHByb3BzLm1pbiAmJiB2YWx1ZSA8PSBwcm9wcy5tYXhcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGRlZikgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBkZWZcbiAgICAgICAgLm1hcChpdGVtID0+IChpc09iamVjdChpdGVtKSA9PT0gdHJ1ZSA/IGl0ZW0gOiB7IHZhbHVlOiBpdGVtIH0pKVxuICAgICAgICAuZmlsdGVyKGZpbHRlckZuKVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkZWYpLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGRlZlsga2V5IF1cbiAgICAgIGNvbnN0IHZhbHVlID0gTnVtYmVyKGtleSlcbiAgICAgIHJldHVybiBpc09iamVjdChpdGVtKSA9PT0gdHJ1ZSA/IHsgLi4uaXRlbSwgdmFsdWUgfSA6IHsgdmFsdWUsIGxhYmVsOiBpdGVtIH1cbiAgICB9KS5maWx0ZXIoZmlsdGVyRm4pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRNYXJrZXJMYWJlbFN0eWxlICh2YWwpIHtcbiAgICByZXR1cm4geyBbIHBvc2l0aW9uUHJvcC52YWx1ZSBdOiBgJHsgMTAwICogKHZhbCAtIHByb3BzLm1pbikgLyB0cmFja0xlbi52YWx1ZSB9JWAgfVxuICB9XG5cbiAgY29uc3QgbWFya2VyTGFiZWxzTWFwID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5tYXJrZXJMYWJlbHMgPT09IGZhbHNlKSB7IHJldHVybiBudWxsIH1cblxuICAgIGNvbnN0IGFjYyA9IHt9XG4gICAgbWFya2VyTGFiZWxzTGlzdC52YWx1ZS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGFjY1sgZW50cnkudmFsdWUgXSA9IGVudHJ5XG4gICAgfSlcbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0TWFya2VyTGFiZWxzQ29udGVudCAoKSB7XG4gICAgaWYgKHNsb3RzWyAnbWFya2VyLWxhYmVsLWdyb3VwJyBdICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBzbG90c1sgJ21hcmtlci1sYWJlbC1ncm91cCcgXShtYXJrZXJTY29wZS52YWx1ZSlcbiAgICB9XG5cbiAgICBjb25zdCBmbiA9IHNsb3RzWyAnbWFya2VyLWxhYmVsJyBdIHx8IGRlZmF1bHRNYXJrZXJMYWJlbFJlbmRlckZuXG4gICAgcmV0dXJuIG1hcmtlckxhYmVsc0xpc3QudmFsdWUubWFwKG1hcmtlciA9PiBmbih7XG4gICAgICBtYXJrZXIsXG4gICAgICAuLi5tYXJrZXJTY29wZS52YWx1ZVxuICAgIH0pKVxuICB9XG5cbiAgY29uc3QgcGFuRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIC8vIGlmIGVkaXRhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgcmV0dXJuIFsgW1xuICAgICAgVG91Y2hQYW4sXG4gICAgICBvblBhbixcbiAgICAgIHZvaWQgMCxcbiAgICAgIHtcbiAgICAgICAgWyBvcmllbnRhdGlvbi52YWx1ZSBdOiB0cnVlLFxuICAgICAgICBwcmV2ZW50OiB0cnVlLFxuICAgICAgICBzdG9wOiB0cnVlLFxuICAgICAgICBtb3VzZTogdHJ1ZSxcbiAgICAgICAgbW91c2VBbGxEaXI6IHRydWVcbiAgICAgIH1cbiAgICBdIF1cbiAgfSlcblxuICBmdW5jdGlvbiBvblBhbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGRyYWdnaW5nLnZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oZXZlbnQuZXZ0KVxuICAgICAgICAvLyBvbmx5IGlmIHRvdWNoLCBiZWNhdXNlIHdlIGFsc28gaGF2ZSBtb3VzZWRvd24vdXA6XG4gICAgICAgIGV2ZW50LnRvdWNoID09PSB0cnVlICYmIHVwZGF0ZVZhbHVlKHRydWUpXG4gICAgICAgIGRyYWdnaW5nLnZhbHVlID0gdm9pZCAwXG4gICAgICAgIGVtaXQoJ3BhbicsICdlbmQnKVxuICAgICAgfVxuICAgICAgYWN0aXZlLnZhbHVlID0gZmFsc2VcbiAgICAgIGZvY3VzLnZhbHVlID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgZHJhZ2dpbmcudmFsdWUgPSBnZXREcmFnZ2luZyhldmVudC5ldnQpXG4gICAgICB1cGRhdGVQb3NpdGlvbihldmVudC5ldnQpXG4gICAgICB1cGRhdGVWYWx1ZSgpXG4gICAgICBhY3RpdmUudmFsdWUgPSB0cnVlXG4gICAgICBlbWl0KCdwYW4nLCAnc3RhcnQnKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHVwZGF0ZVBvc2l0aW9uKGV2ZW50LmV2dClcbiAgICAgIHVwZGF0ZVZhbHVlKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkJsdXIgKCkge1xuICAgIGZvY3VzLnZhbHVlID0gZmFsc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQWN0aXZhdGUgKGV2dCkge1xuICAgIHVwZGF0ZVBvc2l0aW9uKGV2dCwgZ2V0RHJhZ2dpbmcoZXZ0KSlcbiAgICB1cGRhdGVWYWx1ZSgpXG5cbiAgICBwcmV2ZW50Rm9jdXMudmFsdWUgPSB0cnVlXG4gICAgYWN0aXZlLnZhbHVlID0gdHJ1ZVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uRGVhY3RpdmF0ZSwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRGVhY3RpdmF0ZSAoKSB7XG4gICAgcHJldmVudEZvY3VzLnZhbHVlID0gZmFsc2VcbiAgICBhY3RpdmUudmFsdWUgPSBmYWxzZVxuXG4gICAgdXBkYXRlVmFsdWUodHJ1ZSlcbiAgICBvbkJsdXIoKVxuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uRGVhY3RpdmF0ZSwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW9iaWxlQ2xpY2sgKGV2dCkge1xuICAgIHVwZGF0ZVBvc2l0aW9uKGV2dCwgZ2V0RHJhZ2dpbmcoZXZ0KSlcbiAgICB1cGRhdGVWYWx1ZSh0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXl1cCAoZXZ0KSB7XG4gICAgaWYgKGtleUNvZGVzLmluY2x1ZGVzKGV2dC5rZXlDb2RlKSkge1xuICAgICAgdXBkYXRlVmFsdWUodHJ1ZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUZXh0Q29udGFpbmVyU3R5bGUgKHJhdGlvKSB7XG4gICAgaWYgKHByb3BzLnZlcnRpY2FsID09PSB0cnVlKSB7IHJldHVybiBudWxsIH1cblxuICAgIGNvbnN0IHAgPSAkcS5sYW5nLnJ0bCAhPT0gcHJvcHMucmV2ZXJzZSA/IDEgLSByYXRpbyA6IHJhdGlvXG4gICAgcmV0dXJuIHtcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoY2FsYygkeyAyICogcCAtIDEgfSAqICR7IHByb3BzLnRodW1iU2l6ZSB9IC8gMiArICR7IDUwIC0gMTAwICogcCB9JSkpYFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRodW1iUmVuZGVyRm4gKHRodW1iKSB7XG4gICAgY29uc3QgZm9jdXNDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByZXZlbnRGb2N1cy52YWx1ZSA9PT0gZmFsc2UgJiYgKGZvY3VzLnZhbHVlID09PSB0aHVtYi5mb2N1c1ZhbHVlIHx8IGZvY3VzLnZhbHVlID09PSAnYm90aCcpXG4gICAgICAgID8gJyBxLXNsaWRlci0tZm9jdXMnXG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1zbGlkZXJfX3RodW1iIHEtc2xpZGVyX190aHVtYiR7IGF4aXMudmFsdWUgfSBxLXNsaWRlcl9fdGh1bWIkeyBheGlzLnZhbHVlIH0tJHsgaXNSZXZlcnNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfSBhYnNvbHV0ZSBub24tc2VsZWN0YWJsZWBcbiAgICAgICsgZm9jdXNDbGFzcy52YWx1ZVxuICAgICAgKyAodGh1bWIudGh1bWJDb2xvci52YWx1ZSAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHRodW1iLnRodW1iQ29sb3IudmFsdWUgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICB3aWR0aDogcHJvcHMudGh1bWJTaXplLFxuICAgICAgaGVpZ2h0OiBwcm9wcy50aHVtYlNpemUsXG4gICAgICBbIHBvc2l0aW9uUHJvcC52YWx1ZSBdOiBgJHsgMTAwICogdGh1bWIucmF0aW8udmFsdWUgfSVgLFxuICAgICAgekluZGV4OiBmb2N1cy52YWx1ZSA9PT0gdGh1bWIuZm9jdXNWYWx1ZSA/IDIgOiB2b2lkIDBcbiAgICB9KSlcblxuICAgIGNvbnN0IHBpbkNvbG9yID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgdGh1bWIubGFiZWxDb2xvci52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgID8gYCB0ZXh0LSR7IHRodW1iLmxhYmVsQ29sb3IudmFsdWUgfWBcbiAgICAgICAgOiAnJ1xuICAgICkpXG5cbiAgICBjb25zdCB0ZXh0Q29udGFpbmVyU3R5bGUgPSBjb21wdXRlZCgoKSA9PiBnZXRUZXh0Q29udGFpbmVyU3R5bGUodGh1bWIucmF0aW8udmFsdWUpKVxuXG4gICAgY29uc3QgdGV4dENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJ3Etc2xpZGVyX190ZXh0J1xuICAgICAgKyAodGh1bWIubGFiZWxUZXh0Q29sb3IudmFsdWUgIT09IHZvaWQgMCA/IGAgdGV4dC0keyB0aHVtYi5sYWJlbFRleHRDb2xvci52YWx1ZSB9YCA6ICcnKVxuICAgICkpXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgdGh1bWJDb250ZW50ID0gW1xuICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXNsaWRlcl9fdGh1bWItc2hhcGUgYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgdmlld0JveDogJzAgMCAyMCAyMCcsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdwYXRoJywgeyBkOiBwcm9wcy50aHVtYlBhdGggfSlcbiAgICAgICAgXSksXG5cbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3Etc2xpZGVyX19mb2N1cy1yaW5nIGZpdCcgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmxhYmVsID09PSB0cnVlIHx8IHByb3BzLmxhYmVsQWx3YXlzID09PSB0cnVlKSB7XG4gICAgICAgIHRodW1iQ29udGVudC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiBwaW5DbGFzcy52YWx1ZSArICcgYWJzb2x1dGUgZml0IG5vLXBvaW50ZXItZXZlbnRzJyArIHBpbkNvbG9yLnZhbHVlXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogbGFiZWxDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgICAgc3R5bGU6IHsgbWluV2lkdGg6IHByb3BzLnRodW1iU2l6ZSB9XG4gICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogdGV4dENvbnRhaW5lckNsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0ZXh0Q29udGFpbmVyU3R5bGUudmFsdWVcbiAgICAgICAgICAgICAgfSwgW1xuICAgICAgICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiB0ZXh0Q2xhc3MudmFsdWUgfSwgdGh1bWIubGFiZWwudmFsdWUpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIClcblxuICAgICAgICBpZiAocHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgICAgICBpbmplY3RGb3JtSW5wdXQodGh1bWJDb250ZW50LCAncHVzaCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgLi4udGh1bWIuZ2V0Tm9kZURhdGEoKVxuICAgICAgfSwgdGh1bWJDb250ZW50KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKHNlbGVjdGlvbkJhclN0eWxlLCB0cmFja0NvbnRhaW5lclRhYmluZGV4LCB0cmFja0NvbnRhaW5lckV2ZW50cywgaW5qZWN0VGh1bWIpIHtcbiAgICBjb25zdCB0cmFja0NvbnRlbnQgPSBbXVxuXG4gICAgcHJvcHMuaW5uZXJUcmFja0NvbG9yICE9PSAndHJhbnNwYXJlbnQnICYmIHRyYWNrQ29udGVudC5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBrZXk6ICdpbm5lcicsXG4gICAgICAgIGNsYXNzOiBpbm5lckJhckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogaW5uZXJCYXJTdHlsZS52YWx1ZVxuICAgICAgfSlcbiAgICApXG5cbiAgICBwcm9wcy5zZWxlY3Rpb25Db2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiB0cmFja0NvbnRlbnQucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAga2V5OiAnc2VsZWN0aW9uJyxcbiAgICAgICAgY2xhc3M6IHNlbGVjdGlvbkJhckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2VsZWN0aW9uQmFyU3R5bGUudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcHJvcHMubWFya2VycyAhPT0gZmFsc2UgJiYgdHJhY2tDb250ZW50LnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGtleTogJ21hcmtlcicsXG4gICAgICAgIGNsYXNzOiBtYXJrZXJDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IG1hcmtlclN0eWxlLnZhbHVlXG4gICAgICB9KVxuICAgIClcblxuICAgIGluamVjdFRodW1iKHRyYWNrQ29udGVudClcblxuICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAge1xuICAgICAgICAgIGtleTogJ3RyYWNrQycsXG4gICAgICAgICAgY2xhc3M6IHRyYWNrQ29udGFpbmVyQ2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IHRyYWNrQ29udGFpbmVyVGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgLi4udHJhY2tDb250YWluZXJFdmVudHMudmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiB0cmFja0NsYXNzLnZhbHVlLFxuICAgICAgICAgICAgc3R5bGU6IHRyYWNrU3R5bGUudmFsdWVcbiAgICAgICAgICB9LCB0cmFja0NvbnRlbnQpXG4gICAgICAgIF0sXG4gICAgICAgICdzbGlkZScsXG4gICAgICAgIGVkaXRhYmxlLnZhbHVlLCAoKSA9PiBwYW5EaXJlY3RpdmUudmFsdWVcbiAgICAgIClcbiAgICBdXG5cbiAgICBpZiAocHJvcHMubWFya2VyTGFiZWxzICE9PSBmYWxzZSkge1xuICAgICAgY29uc3QgYWN0aW9uID0gcHJvcHMuc3dpdGNoTWFya2VyTGFiZWxzU2lkZSA9PT0gdHJ1ZVxuICAgICAgICA/ICd1bnNoaWZ0J1xuICAgICAgICA6ICdwdXNoJ1xuXG4gICAgICBjb250ZW50WyBhY3Rpb24gXShcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ21hcmtlckwnLFxuICAgICAgICAgIGNsYXNzOiBtYXJrZXJMYWJlbHNDb250YWluZXJDbGFzcy52YWx1ZVxuICAgICAgICB9LCBnZXRNYXJrZXJMYWJlbHNDb250ZW50KCkpXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uRGVhY3RpdmF0ZSwgdHJ1ZSlcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHN0YXRlOiB7XG4gICAgICBhY3RpdmUsXG4gICAgICBmb2N1cyxcbiAgICAgIHByZXZlbnRGb2N1cyxcbiAgICAgIGRyYWdnaW5nLFxuXG4gICAgICBlZGl0YWJsZSxcbiAgICAgIGNsYXNzZXMsXG4gICAgICB0YWJpbmRleCxcbiAgICAgIGF0dHJpYnV0ZXMsXG5cbiAgICAgIHJvdW5kVmFsdWVGbixcbiAgICAgIGtleVN0ZXAsXG4gICAgICB0cmFja0xlbixcbiAgICAgIGlubmVyTWluLFxuICAgICAgaW5uZXJNaW5SYXRpbyxcbiAgICAgIGlubmVyTWF4LFxuICAgICAgaW5uZXJNYXhSYXRpbyxcbiAgICAgIHBvc2l0aW9uUHJvcCxcbiAgICAgIHNpemVQcm9wLFxuICAgICAgaXNSZXZlcnNlZFxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICBvbkFjdGl2YXRlLFxuICAgICAgb25Nb2JpbGVDbGljayxcbiAgICAgIG9uQmx1cixcbiAgICAgIG9uS2V5dXAsXG4gICAgICBnZXRDb250ZW50LFxuICAgICAgZ2V0VGh1bWJSZW5kZXJGbixcbiAgICAgIGNvbnZlcnRSYXRpb1RvTW9kZWwsXG4gICAgICBjb252ZXJ0TW9kZWxUb1JhdGlvLFxuICAgICAgZ2V0RHJhZ2dpbmdSYXRpb1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNsaWRlciwge1xuICB1c2VTbGlkZXJQcm9wcyxcbiAgdXNlU2xpZGVyRW1pdHMsXG4gIGtleUNvZGVzXG59IGZyb20gJy4uL3NsaWRlci91c2Utc2xpZGVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5cbmNvbnN0IGRyYWdUeXBlID0ge1xuICBNSU46IDAsXG4gIFJBTkdFOiAxLFxuICBNQVg6IDJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FSYW5nZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VTbGlkZXJQcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6ICgpID0+ICh7IG1pbjogbnVsbCwgbWF4OiBudWxsIH0pLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+ICdtaW4nIGluIHYgJiYgJ21heCcgaW4gdlxuICAgIH0sXG5cbiAgICBkcmFnUmFuZ2U6IEJvb2xlYW4sXG4gICAgZHJhZ09ubHlSYW5nZTogQm9vbGVhbixcblxuICAgIGxlZnRMYWJlbENvbG9yOiBTdHJpbmcsXG4gICAgbGVmdExhYmVsVGV4dENvbG9yOiBTdHJpbmcsXG4gICAgcmlnaHRMYWJlbENvbG9yOiBTdHJpbmcsXG4gICAgcmlnaHRMYWJlbFRleHRDb2xvcjogU3RyaW5nLFxuXG4gICAgbGVmdExhYmVsVmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICByaWdodExhYmVsVmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGxlZnRUaHVtYkNvbG9yOiBTdHJpbmcsXG4gICAgcmlnaHRUaHVtYkNvbG9yOiBTdHJpbmdcbiAgfSxcblxuICBlbWl0czogdXNlU2xpZGVyRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHsgc3RhdGUsIG1ldGhvZHMgfSA9IHVzZVNsaWRlcih7XG4gICAgICB1cGRhdGVWYWx1ZSwgdXBkYXRlUG9zaXRpb24sIGdldERyYWdnaW5nLFxuICAgICAgZm9ybUF0dHJzOiBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgICAgdmFsdWU6IGAkeyBwcm9wcy5tb2RlbFZhbHVlLm1pbiB9fCR7IHByb3BzLm1vZGVsVmFsdWUubWF4IH1gXG4gICAgICB9KSlcbiAgICB9KVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGN1ck1pblJhdGlvID0gcmVmKDApXG4gICAgY29uc3QgY3VyTWF4UmF0aW8gPSByZWYoMClcbiAgICBjb25zdCBtb2RlbCA9IHJlZih7IG1pbjogMCwgbWF4OiAwIH0pXG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVNb2RlbCAoKSB7XG4gICAgICBtb2RlbC52YWx1ZS5taW4gPSBwcm9wcy5tb2RlbFZhbHVlLm1pbiA9PT0gbnVsbFxuICAgICAgICA/IHN0YXRlLmlubmVyTWluLnZhbHVlXG4gICAgICAgIDogYmV0d2Vlbihwcm9wcy5tb2RlbFZhbHVlLm1pbiwgc3RhdGUuaW5uZXJNaW4udmFsdWUsIHN0YXRlLmlubmVyTWF4LnZhbHVlKVxuXG4gICAgICBtb2RlbC52YWx1ZS5tYXggPSBwcm9wcy5tb2RlbFZhbHVlLm1heCA9PT0gbnVsbFxuICAgICAgICA/IHN0YXRlLmlubmVyTWF4LnZhbHVlXG4gICAgICAgIDogYmV0d2Vlbihwcm9wcy5tb2RlbFZhbHVlLm1heCwgc3RhdGUuaW5uZXJNaW4udmFsdWUsIHN0YXRlLmlubmVyTWF4LnZhbHVlKVxuICAgIH1cblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gYCR7IHByb3BzLm1vZGVsVmFsdWUubWluIH18JHsgcHJvcHMubW9kZWxWYWx1ZS5tYXggfXwkeyBzdGF0ZS5pbm5lck1pbi52YWx1ZSB9fCR7IHN0YXRlLmlubmVyTWF4LnZhbHVlIH1gLFxuICAgICAgbm9ybWFsaXplTW9kZWxcbiAgICApXG5cbiAgICBub3JtYWxpemVNb2RlbCgpXG5cbiAgICBjb25zdCBtb2RlbE1pblJhdGlvID0gY29tcHV0ZWQoKCkgPT4gbWV0aG9kcy5jb252ZXJ0TW9kZWxUb1JhdGlvKG1vZGVsLnZhbHVlLm1pbikpXG4gICAgY29uc3QgbW9kZWxNYXhSYXRpbyA9IGNvbXB1dGVkKCgpID0+IG1ldGhvZHMuY29udmVydE1vZGVsVG9SYXRpbyhtb2RlbC52YWx1ZS5tYXgpKVxuXG4gICAgY29uc3QgcmF0aW9NaW4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzdGF0ZS5hY3RpdmUudmFsdWUgPT09IHRydWUgPyBjdXJNaW5SYXRpby52YWx1ZSA6IG1vZGVsTWluUmF0aW8udmFsdWVcbiAgICApKVxuICAgIGNvbnN0IHJhdGlvTWF4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc3RhdGUuYWN0aXZlLnZhbHVlID09PSB0cnVlID8gY3VyTWF4UmF0aW8udmFsdWUgOiBtb2RlbE1heFJhdGlvLnZhbHVlXG4gICAgKSlcblxuICAgIGNvbnN0IHNlbGVjdGlvbkJhclN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge1xuICAgICAgICBbIHN0YXRlLnBvc2l0aW9uUHJvcC52YWx1ZSBdOiBgJHsgMTAwICogcmF0aW9NaW4udmFsdWUgfSVgLFxuICAgICAgICBbIHN0YXRlLnNpemVQcm9wLnZhbHVlIF06IGAkeyAxMDAgKiAocmF0aW9NYXgudmFsdWUgLSByYXRpb01pbi52YWx1ZSkgfSVgXG4gICAgICB9XG4gICAgICBpZiAocHJvcHMuc2VsZWN0aW9uSW1nICE9PSB2b2lkIDApIHtcbiAgICAgICAgYWNjLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHsgcHJvcHMuc2VsZWN0aW9uSW1nIH0pICFpbXBvcnRhbnRgXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIGNvbnN0IHRyYWNrQ29udGFpbmVyRXZlbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB7fVxuICAgICAgfVxuXG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB7IG9uQ2xpY2s6IG1ldGhvZHMub25Nb2JpbGVDbGljayB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2dCA9IHsgb25Nb3VzZWRvd246IG1ldGhvZHMub25BY3RpdmF0ZSB9XG5cbiAgICAgIGlmIChwcm9wcy5kcmFnUmFuZ2UgPT09IHRydWUgfHwgcHJvcHMuZHJhZ09ubHlSYW5nZSA9PT0gdHJ1ZSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGV2dCwge1xuICAgICAgICAgIG9uRm9jdXM6ICgpID0+IHsgc3RhdGUuZm9jdXMudmFsdWUgPSAnYm90aCcgfSxcbiAgICAgICAgICBvbkJsdXI6IG1ldGhvZHMub25CbHVyLFxuICAgICAgICAgIG9uS2V5ZG93bixcbiAgICAgICAgICBvbktleXVwOiBtZXRob2RzLm9uS2V5dXBcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBnZXRFdmVudHMgKHNpZGUpIHtcbiAgICAgIHJldHVybiAkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUgJiYgc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgcHJvcHMuZHJhZ09ubHlSYW5nZSAhPT0gdHJ1ZVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG9uRm9jdXM6ICgpID0+IHsgc3RhdGUuZm9jdXMudmFsdWUgPSBzaWRlIH0sXG4gICAgICAgICAgICBvbkJsdXI6IG1ldGhvZHMub25CbHVyLFxuICAgICAgICAgICAgb25LZXlkb3duLFxuICAgICAgICAgICAgb25LZXl1cDogbWV0aG9kcy5vbktleXVwXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9XG4gICAgfVxuXG4gICAgY29uc3QgdGh1bWJUYWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5kcmFnT25seVJhbmdlICE9PSB0cnVlID8gc3RhdGUudGFiaW5kZXgudmFsdWUgOiBudWxsKSlcbiAgICBjb25zdCB0cmFja0NvbnRhaW5lclRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlICYmIChwcm9wcy5kcmFnUmFuZ2UgfHwgcHJvcHMuZHJhZ09ubHlSYW5nZSA9PT0gdHJ1ZSlcbiAgICAgICAgPyBzdGF0ZS50YWJpbmRleC52YWx1ZVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgbWluVGh1bWJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtaW5FdmVudHMgPSBjb21wdXRlZCgoKSA9PiBnZXRFdmVudHMoJ21pbicpKVxuICAgIGNvbnN0IGdldE1pblRodW1iID0gbWV0aG9kcy5nZXRUaHVtYlJlbmRlckZuKHtcbiAgICAgIGZvY3VzVmFsdWU6ICdtaW4nLFxuICAgICAgZ2V0Tm9kZURhdGE6ICgpID0+ICh7XG4gICAgICAgIHJlZjogbWluVGh1bWJSZWYsXG4gICAgICAgIGtleTogJ3RtaW4nLFxuICAgICAgICAuLi5taW5FdmVudHMudmFsdWUsXG4gICAgICAgIHRhYmluZGV4OiB0aHVtYlRhYmluZGV4LnZhbHVlXG4gICAgICB9KSxcbiAgICAgIHJhdGlvOiByYXRpb01pbixcbiAgICAgIGxhYmVsOiBjb21wdXRlZCgoKSA9PiAoXG4gICAgICAgIHByb3BzLmxlZnRMYWJlbFZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHByb3BzLmxlZnRMYWJlbFZhbHVlXG4gICAgICAgICAgOiBtb2RlbC52YWx1ZS5taW5cbiAgICAgICkpLFxuICAgICAgdGh1bWJDb2xvcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMubGVmdFRodW1iQ29sb3IgfHwgcHJvcHMudGh1bWJDb2xvciB8fCBwcm9wcy5jb2xvciksXG4gICAgICBsYWJlbENvbG9yOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5sZWZ0TGFiZWxDb2xvciB8fCBwcm9wcy5sYWJlbENvbG9yKSxcbiAgICAgIGxhYmVsVGV4dENvbG9yOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5sZWZ0TGFiZWxUZXh0Q29sb3IgfHwgcHJvcHMubGFiZWxUZXh0Q29sb3IpXG4gICAgfSlcblxuICAgIGNvbnN0IG1heEV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IGdldEV2ZW50cygnbWF4JykpXG4gICAgY29uc3QgZ2V0TWF4VGh1bWIgPSBtZXRob2RzLmdldFRodW1iUmVuZGVyRm4oe1xuICAgICAgZm9jdXNWYWx1ZTogJ21heCcsXG4gICAgICBnZXROb2RlRGF0YTogKCkgPT4gKHtcbiAgICAgICAgLi4ubWF4RXZlbnRzLnZhbHVlLFxuICAgICAgICBrZXk6ICd0bWF4JyxcbiAgICAgICAgdGFiaW5kZXg6IHRodW1iVGFiaW5kZXgudmFsdWVcbiAgICAgIH0pLFxuICAgICAgcmF0aW86IHJhdGlvTWF4LFxuICAgICAgbGFiZWw6IGNvbXB1dGVkKCgpID0+IChcbiAgICAgICAgcHJvcHMucmlnaHRMYWJlbFZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHByb3BzLnJpZ2h0TGFiZWxWYWx1ZVxuICAgICAgICAgIDogbW9kZWwudmFsdWUubWF4XG4gICAgICApKSxcbiAgICAgIHRodW1iQ29sb3I6IGNvbXB1dGVkKCgpID0+IHByb3BzLnJpZ2h0VGh1bWJDb2xvciB8fCBwcm9wcy50aHVtYkNvbG9yIHx8IHByb3BzLmNvbG9yKSxcbiAgICAgIGxhYmVsQ29sb3I6IGNvbXB1dGVkKCgpID0+IHByb3BzLnJpZ2h0TGFiZWxDb2xvciB8fCBwcm9wcy5sYWJlbENvbG9yKSxcbiAgICAgIGxhYmVsVGV4dENvbG9yOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5yaWdodExhYmVsVGV4dENvbG9yIHx8IHByb3BzLmxhYmVsVGV4dENvbG9yKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVWYWx1ZSAoY2hhbmdlKSB7XG4gICAgICBpZiAobW9kZWwudmFsdWUubWluICE9PSBwcm9wcy5tb2RlbFZhbHVlLm1pbiB8fCBtb2RlbC52YWx1ZS5tYXggIT09IHByb3BzLm1vZGVsVmFsdWUubWF4KSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgeyAuLi5tb2RlbC52YWx1ZSB9KVxuICAgICAgfVxuICAgICAgY2hhbmdlID09PSB0cnVlICYmIGVtaXQoJ2NoYW5nZScsIHsgLi4ubW9kZWwudmFsdWUgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREcmFnZ2luZyAoZXZlbnQpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHsgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0IH0gPSByb290UmVmLnZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBzZW5zaXRpdml0eSA9IHByb3BzLmRyYWdPbmx5UmFuZ2UgPT09IHRydWVcbiAgICAgICAgICA/IDBcbiAgICAgICAgICA6IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IG1pblRodW1iUmVmLnZhbHVlLm9mZnNldEhlaWdodCAvICgyICogaGVpZ2h0KVxuICAgICAgICAgICAgICA6IG1pblRodW1iUmVmLnZhbHVlLm9mZnNldFdpZHRoIC8gKDIgKiB3aWR0aClcbiAgICAgICAgICAgIClcblxuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB7XG4gICAgICAgIGxlZnQsXG4gICAgICAgIHRvcCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgdmFsdWVNaW46IG1vZGVsLnZhbHVlLm1pbixcbiAgICAgICAgdmFsdWVNYXg6IG1vZGVsLnZhbHVlLm1heCxcbiAgICAgICAgcmF0aW9NaW46IG1vZGVsTWluUmF0aW8udmFsdWUsXG4gICAgICAgIHJhdGlvTWF4OiBtb2RlbE1heFJhdGlvLnZhbHVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhdGlvID0gbWV0aG9kcy5nZXREcmFnZ2luZ1JhdGlvKGV2ZW50LCBkcmFnZ2luZylcblxuICAgICAgaWYgKHByb3BzLmRyYWdPbmx5UmFuZ2UgIT09IHRydWUgJiYgcmF0aW8gPCBkcmFnZ2luZy5yYXRpb01pbiArIHNlbnNpdGl2aXR5KSB7XG4gICAgICAgIGRyYWdnaW5nLnR5cGUgPSBkcmFnVHlwZS5NSU5cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLmRyYWdPbmx5UmFuZ2UgPT09IHRydWUgfHwgcmF0aW8gPCBkcmFnZ2luZy5yYXRpb01heCAtIHNlbnNpdGl2aXR5KSB7XG4gICAgICAgIGlmIChwcm9wcy5kcmFnUmFuZ2UgPT09IHRydWUgfHwgcHJvcHMuZHJhZ09ubHlSYW5nZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGRyYWdnaW5nLnR5cGUgPSBkcmFnVHlwZS5SQU5HRVxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oZHJhZ2dpbmcsIHtcbiAgICAgICAgICAgIG9mZnNldFJhdGlvOiByYXRpbyxcbiAgICAgICAgICAgIG9mZnNldE1vZGVsOiBtZXRob2RzLmNvbnZlcnRSYXRpb1RvTW9kZWwocmF0aW8pLFxuICAgICAgICAgICAgcmFuZ2VWYWx1ZTogZHJhZ2dpbmcudmFsdWVNYXggLSBkcmFnZ2luZy52YWx1ZU1pbixcbiAgICAgICAgICAgIHJhbmdlUmF0aW86IGRyYWdnaW5nLnJhdGlvTWF4IC0gZHJhZ2dpbmcucmF0aW9NaW5cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRyYWdnaW5nLnR5cGUgPSBkcmFnZ2luZy5yYXRpb01heCAtIHJhdGlvIDwgcmF0aW8gLSBkcmFnZ2luZy5yYXRpb01pblxuICAgICAgICAgICAgPyBkcmFnVHlwZS5NQVhcbiAgICAgICAgICAgIDogZHJhZ1R5cGUuTUlOXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkcmFnZ2luZy50eXBlID0gZHJhZ1R5cGUuTUFYXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcmFnZ2luZ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uIChldmVudCwgZHJhZ2dpbmcgPSBzdGF0ZS5kcmFnZ2luZy52YWx1ZSkge1xuICAgICAgbGV0IHBvc1xuICAgICAgY29uc3QgcmF0aW8gPSBtZXRob2RzLmdldERyYWdnaW5nUmF0aW8oZXZlbnQsIGRyYWdnaW5nKVxuICAgICAgY29uc3QgbG9jYWxNb2RlbCA9IG1ldGhvZHMuY29udmVydFJhdGlvVG9Nb2RlbChyYXRpbylcblxuICAgICAgc3dpdGNoIChkcmFnZ2luZy50eXBlKSB7XG4gICAgICAgIGNhc2UgZHJhZ1R5cGUuTUlOOlxuICAgICAgICAgIGlmIChyYXRpbyA8PSBkcmFnZ2luZy5yYXRpb01heCkge1xuICAgICAgICAgICAgcG9zID0ge1xuICAgICAgICAgICAgICBtaW5SOiByYXRpbyxcbiAgICAgICAgICAgICAgbWF4UjogZHJhZ2dpbmcucmF0aW9NYXgsXG4gICAgICAgICAgICAgIG1pbjogbG9jYWxNb2RlbCxcbiAgICAgICAgICAgICAgbWF4OiBkcmFnZ2luZy52YWx1ZU1heFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUuZm9jdXMudmFsdWUgPSAnbWluJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgICAgbWluUjogZHJhZ2dpbmcucmF0aW9NYXgsXG4gICAgICAgICAgICAgIG1heFI6IHJhdGlvLFxuICAgICAgICAgICAgICBtaW46IGRyYWdnaW5nLnZhbHVlTWF4LFxuICAgICAgICAgICAgICBtYXg6IGxvY2FsTW9kZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlLmZvY3VzLnZhbHVlID0gJ21heCdcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlIGRyYWdUeXBlLk1BWDpcbiAgICAgICAgICBpZiAocmF0aW8gPj0gZHJhZ2dpbmcucmF0aW9NaW4pIHtcbiAgICAgICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgICAgbWluUjogZHJhZ2dpbmcucmF0aW9NaW4sXG4gICAgICAgICAgICAgIG1heFI6IHJhdGlvLFxuICAgICAgICAgICAgICBtaW46IGRyYWdnaW5nLnZhbHVlTWluLFxuICAgICAgICAgICAgICBtYXg6IGxvY2FsTW9kZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlLmZvY3VzLnZhbHVlID0gJ21heCdcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICAgIG1pblI6IHJhdGlvLFxuICAgICAgICAgICAgICBtYXhSOiBkcmFnZ2luZy5yYXRpb01pbixcbiAgICAgICAgICAgICAgbWluOiBsb2NhbE1vZGVsLFxuICAgICAgICAgICAgICBtYXg6IGRyYWdnaW5nLnZhbHVlTWluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZS5mb2N1cy52YWx1ZSA9ICdtaW4nXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSBkcmFnVHlwZS5SQU5HRTpcbiAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgcmF0aW9EZWx0YSA9IHJhdGlvIC0gZHJhZ2dpbmcub2Zmc2V0UmF0aW8sXG4gICAgICAgICAgICBtaW5SID0gYmV0d2VlbihkcmFnZ2luZy5yYXRpb01pbiArIHJhdGlvRGVsdGEsIHN0YXRlLmlubmVyTWluUmF0aW8udmFsdWUsIHN0YXRlLmlubmVyTWF4UmF0aW8udmFsdWUgLSBkcmFnZ2luZy5yYW5nZVJhdGlvKSxcbiAgICAgICAgICAgIG1vZGVsRGVsdGEgPSBsb2NhbE1vZGVsIC0gZHJhZ2dpbmcub2Zmc2V0TW9kZWwsXG4gICAgICAgICAgICBtaW4gPSBiZXR3ZWVuKGRyYWdnaW5nLnZhbHVlTWluICsgbW9kZWxEZWx0YSwgc3RhdGUuaW5uZXJNaW4udmFsdWUsIHN0YXRlLmlubmVyTWF4LnZhbHVlIC0gZHJhZ2dpbmcucmFuZ2VWYWx1ZSlcblxuICAgICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgIG1pblIsXG4gICAgICAgICAgICBtYXhSOiBtaW5SICsgZHJhZ2dpbmcucmFuZ2VSYXRpbyxcbiAgICAgICAgICAgIG1pbjogc3RhdGUucm91bmRWYWx1ZUZuLnZhbHVlKG1pbiksXG4gICAgICAgICAgICBtYXg6IHN0YXRlLnJvdW5kVmFsdWVGbi52YWx1ZShtaW4gKyBkcmFnZ2luZy5yYW5nZVZhbHVlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHN0YXRlLmZvY3VzLnZhbHVlID0gJ2JvdGgnXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgZWl0aGVyIG9mIHRoZSB2YWx1ZXMgdG8gYmUgZW1pdHRlZCBhcmUgbnVsbCwgc2V0IHRoZW0gdG8gdGhlIGRlZmF1bHRzIHRoZSB1c2VyIGhhcyBlbnRlcmVkLlxuICAgICAgbW9kZWwudmFsdWUgPSBtb2RlbC52YWx1ZS5taW4gPT09IG51bGwgfHwgbW9kZWwudmFsdWUubWF4ID09PSBudWxsXG4gICAgICAgID8geyBtaW46IHBvcy5taW4gfHwgcHJvcHMubWluLCBtYXg6IHBvcy5tYXggfHwgcHJvcHMubWF4IH1cbiAgICAgICAgOiB7IG1pbjogcG9zLm1pbiwgbWF4OiBwb3MubWF4IH1cblxuICAgICAgaWYgKHByb3BzLnNuYXAgIT09IHRydWUgfHwgcHJvcHMuc3RlcCA9PT0gMCkge1xuICAgICAgICBjdXJNaW5SYXRpby52YWx1ZSA9IHBvcy5taW5SXG4gICAgICAgIGN1ck1heFJhdGlvLnZhbHVlID0gcG9zLm1heFJcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjdXJNaW5SYXRpby52YWx1ZSA9IG1ldGhvZHMuY29udmVydE1vZGVsVG9SYXRpbyhtb2RlbC52YWx1ZS5taW4pXG4gICAgICAgIGN1ck1heFJhdGlvLnZhbHVlID0gbWV0aG9kcy5jb252ZXJ0TW9kZWxUb1JhdGlvKG1vZGVsLnZhbHVlLm1heClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleWRvd24gKGV2dCkge1xuICAgICAgaWYgKGtleUNvZGVzLmluY2x1ZGVzKGV2dC5rZXlDb2RlKSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHN0ZXBWYWwgPSAoWyAzNCwgMzMgXS5pbmNsdWRlcyhldnQua2V5Q29kZSkgPyAxMCA6IDEpICogc3RhdGUua2V5U3RlcC52YWx1ZSxcbiAgICAgICAgb2Zmc2V0ID0gKFxuICAgICAgICAgIChbIDM0LCAzNywgNDAgXS5pbmNsdWRlcyhldnQua2V5Q29kZSkgPyAtMSA6IDEpXG4gICAgICAgICAgKiAoc3RhdGUuaXNSZXZlcnNlZC52YWx1ZSA9PT0gdHJ1ZSA/IC0xIDogMSlcbiAgICAgICAgICAqIChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiBzdGVwVmFsXG4gICAgICAgIClcblxuICAgICAgaWYgKHN0YXRlLmZvY3VzLnZhbHVlID09PSAnYm90aCcpIHtcbiAgICAgICAgY29uc3QgaW50ZXJ2YWwgPSBtb2RlbC52YWx1ZS5tYXggLSBtb2RlbC52YWx1ZS5taW5cbiAgICAgICAgY29uc3QgbWluID0gYmV0d2VlbihcbiAgICAgICAgICBzdGF0ZS5yb3VuZFZhbHVlRm4udmFsdWUobW9kZWwudmFsdWUubWluICsgb2Zmc2V0KSxcbiAgICAgICAgICBzdGF0ZS5pbm5lck1pbi52YWx1ZSxcbiAgICAgICAgICBzdGF0ZS5pbm5lck1heC52YWx1ZSAtIGludGVydmFsXG4gICAgICAgIClcblxuICAgICAgICBtb2RlbC52YWx1ZSA9IHtcbiAgICAgICAgICBtaW4sXG4gICAgICAgICAgbWF4OiBzdGF0ZS5yb3VuZFZhbHVlRm4udmFsdWUobWluICsgaW50ZXJ2YWwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN0YXRlLmZvY3VzLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB3aGljaCA9IHN0YXRlLmZvY3VzLnZhbHVlXG5cbiAgICAgICAgbW9kZWwudmFsdWUgPSB7XG4gICAgICAgICAgLi4ubW9kZWwudmFsdWUsXG4gICAgICAgICAgWyB3aGljaCBdOiBiZXR3ZWVuKFxuICAgICAgICAgICAgc3RhdGUucm91bmRWYWx1ZUZuLnZhbHVlKG1vZGVsLnZhbHVlWyB3aGljaCBdICsgb2Zmc2V0KSxcbiAgICAgICAgICAgIHdoaWNoID09PSAnbWluJyA/IHN0YXRlLmlubmVyTWluLnZhbHVlIDogbW9kZWwudmFsdWUubWluLFxuICAgICAgICAgICAgd2hpY2ggPT09ICdtYXgnID8gc3RhdGUuaW5uZXJNYXgudmFsdWUgOiBtb2RlbC52YWx1ZS5tYXhcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdXBkYXRlVmFsdWUoKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gbWV0aG9kcy5nZXRDb250ZW50KFxuICAgICAgICBzZWxlY3Rpb25CYXJTdHlsZSxcbiAgICAgICAgdHJhY2tDb250YWluZXJUYWJpbmRleCxcbiAgICAgICAgdHJhY2tDb250YWluZXJFdmVudHMsXG4gICAgICAgIG5vZGUgPT4ge1xuICAgICAgICAgIG5vZGUucHVzaChcbiAgICAgICAgICAgIGdldE1pblRodW1iKCksXG4gICAgICAgICAgICBnZXRNYXhUaHVtYigpXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgICAgY2xhc3M6ICdxLXJhbmdlICcgKyBzdGF0ZS5jbGFzc2VzLnZhbHVlICsgKFxuICAgICAgICAgIHByb3BzLm1vZGVsVmFsdWUubWluID09PSBudWxsIHx8IHByb3BzLm1vZGVsVmFsdWUubWF4ID09PSBudWxsXG4gICAgICAgICAgICA/ICcgcS1zbGlkZXItLW5vLXZhbHVlJ1xuICAgICAgICAgICAgOiAnJ1xuICAgICAgICApLFxuICAgICAgICAuLi5zdGF0ZS5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHByb3BzLm1vZGVsVmFsdWUubWluICsgJ3wnICsgcHJvcHMubW9kZWxWYWx1ZS5tYXhcbiAgICAgIH0sIGNvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCB3YXRjaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5pbXBvcnQgUUlucHV0IGZyb20gJy4uL2lucHV0L1FJbnB1dC5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB7IGJ0bkRlc2lnbk9wdGlvbnMsIGJ0blBhZGRpbmcsIGdldEJ0bkRlc2lnbiB9IGZyb20gJy4uL2J0bi91c2UtYnRuLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5mdW5jdGlvbiBnZXRCb29sICh2YWwsIG90aGVyd2lzZSkge1xuICByZXR1cm4gWyB0cnVlLCBmYWxzZSBdLmluY2x1ZGVzKHZhbClcbiAgICA/IHZhbFxuICAgIDogb3RoZXJ3aXNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnaW5hdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgbWluOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiAxXG4gICAgfSxcbiAgICBtYXg6IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBtYXhQYWdlczoge1xuICAgICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgICAgZGVmYXVsdDogMCxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiAoXG4gICAgICAgICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyBwYXJzZUludCh2LCAxMCkgOiB2KSA+PSAwXG4gICAgICApXG4gICAgfSxcblxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcblxuICAgIHNpemU6IFN0cmluZyxcblxuICAgIGRpc2FibGU6IEJvb2xlYW4sXG5cbiAgICBpbnB1dDogQm9vbGVhbixcblxuICAgIGljb25QcmV2OiBTdHJpbmcsXG4gICAgaWNvbk5leHQ6IFN0cmluZyxcbiAgICBpY29uRmlyc3Q6IFN0cmluZyxcbiAgICBpY29uTGFzdDogU3RyaW5nLFxuXG4gICAgdG9GbjogRnVuY3Rpb24sXG5cbiAgICBib3VuZGFyeUxpbmtzOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgYm91bmRhcnlOdW1iZXJzOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgZGlyZWN0aW9uTGlua3M6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBlbGxpcHNlczoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICByb3VuZDogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIHVuZWxldmF0ZWQ6IEJvb2xlYW4sXG4gICAgcHVzaDogQm9vbGVhbixcbiAgICBnbG9zc3k6IEJvb2xlYW4sXG5cbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIGFjdGl2ZURlc2lnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJycsXG4gICAgICB2YWx1ZXM6IHYgPT4gdiA9PT0gJycgfHwgYnRuRGVzaWduT3B0aW9ucy5pbmNsdWRlcyh2KVxuICAgIH0sXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVUZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIGd1dHRlcjogU3RyaW5nLFxuICAgIHBhZGRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICczcHggMnB4J1xuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3QgbWluUHJvcCA9IGNvbXB1dGVkKCgpID0+IHBhcnNlSW50KHByb3BzLm1pbiwgMTApKVxuICAgIGNvbnN0IG1heFByb3AgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXgsIDEwKSlcbiAgICBjb25zdCBtYXhQYWdlc1Byb3AgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhQYWdlcywgMTApKVxuXG4gICAgY29uc3QgaW5wdXRQbGFjZWhvbGRlciA9IGNvbXB1dGVkKCgpID0+IG1vZGVsLnZhbHVlICsgJyAvICcgKyBtYXhQcm9wLnZhbHVlKVxuICAgIGNvbnN0IGJvdW5kYXJ5TGlua3NQcm9wID0gY29tcHV0ZWQoKCkgPT4gZ2V0Qm9vbChwcm9wcy5ib3VuZGFyeUxpbmtzLCBwcm9wcy5pbnB1dCkpXG4gICAgY29uc3QgYm91bmRhcnlOdW1iZXJzUHJvcCA9IGNvbXB1dGVkKCgpID0+IGdldEJvb2wocHJvcHMuYm91bmRhcnlOdW1iZXJzLCAhcHJvcHMuaW5wdXQpKVxuICAgIGNvbnN0IGRpcmVjdGlvbkxpbmtzUHJvcCA9IGNvbXB1dGVkKCgpID0+IGdldEJvb2wocHJvcHMuZGlyZWN0aW9uTGlua3MsIHByb3BzLmlucHV0KSlcbiAgICBjb25zdCBlbGxpcHNlc1Byb3AgPSBjb21wdXRlZCgoKSA9PiBnZXRCb29sKHByb3BzLmVsbGlwc2VzLCAhcHJvcHMuaW5wdXQpKVxuXG4gICAgY29uc3QgbmV3UGFnZSA9IHJlZihudWxsKVxuICAgIGNvbnN0IG1vZGVsID0gY29tcHV0ZWQoe1xuICAgICAgZ2V0OiAoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLFxuICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICB2YWwgPSBwYXJzZUludCh2YWwsIDEwKVxuICAgICAgICBpZiAocHJvcHMuZGlzYWJsZSB8fCBpc05hTih2YWwpKSByZXR1cm5cblxuICAgICAgICBjb25zdCB2YWx1ZSA9IGJldHdlZW4odmFsLCBtaW5Qcm9wLnZhbHVlLCBtYXhQcm9wLnZhbHVlKVxuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IGAkeyBtaW5Qcm9wLnZhbHVlIH18JHsgbWF4UHJvcC52YWx1ZSB9YCwgKCkgPT4ge1xuICAgICAgbW9kZWwudmFsdWUgPSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtcGFnaW5hdGlvbiByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBndXR0ZXJQcm9wID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZ3V0dGVyIGluIGJ0blBhZGRpbmdcbiAgICAgICAgPyBgJHsgYnRuUGFkZGluZ1sgcHJvcHMuZ3V0dGVyIF0gfXB4YFxuICAgICAgICA6IHByb3BzLmd1dHRlciB8fCBudWxsXG4gICAgKSlcbiAgICBjb25zdCBndXR0ZXJTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIGd1dHRlclByb3AudmFsdWUgIT09IG51bGxcbiAgICAgICAgPyBgLS1xLXBhZ2luYXRpb24tZ3V0dGVyLXBhcmVudDotJHsgZ3V0dGVyUHJvcC52YWx1ZSB9Oy0tcS1wYWdpbmF0aW9uLWd1dHRlci1jaGlsZDokeyBndXR0ZXJQcm9wLnZhbHVlIH1gXG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBjb25zdCBpY29ucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGljbyA9IFtcbiAgICAgICAgcHJvcHMuaWNvbkZpcnN0IHx8ICRxLmljb25TZXQucGFnaW5hdGlvbi5maXJzdCxcbiAgICAgICAgcHJvcHMuaWNvblByZXYgfHwgJHEuaWNvblNldC5wYWdpbmF0aW9uLnByZXYsXG4gICAgICAgIHByb3BzLmljb25OZXh0IHx8ICRxLmljb25TZXQucGFnaW5hdGlvbi5uZXh0LFxuICAgICAgICBwcm9wcy5pY29uTGFzdCB8fCAkcS5pY29uU2V0LnBhZ2luYXRpb24ubGFzdFxuICAgICAgXVxuICAgICAgcmV0dXJuICRxLmxhbmcucnRsID09PSB0cnVlID8gaWNvLnJldmVyc2UoKSA6IGljb1xuICAgIH0pXG5cbiAgICBjb25zdCBhdHRycyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAnYXJpYS1kaXNhYmxlZCc6IHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgcm9sZTogJ25hdmlnYXRpb24nXG4gICAgfSkpXG5cbiAgICBjb25zdCBidG5EZXNpZ25Qcm9wID0gY29tcHV0ZWQoKCkgPT4gZ2V0QnRuRGVzaWduKHByb3BzLCAnZmxhdCcpKVxuICAgIGNvbnN0IGJ0blByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIFsgYnRuRGVzaWduUHJvcC52YWx1ZSBdOiB0cnVlLFxuXG4gICAgICByb3VuZDogcHJvcHMucm91bmQsXG4gICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkLFxuXG4gICAgICBwYWRkaW5nOiBwcm9wcy5wYWRkaW5nLFxuXG4gICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICB0ZXh0Q29sb3I6IHByb3BzLnRleHRDb2xvcixcblxuICAgICAgc2l6ZTogcHJvcHMuc2l6ZSxcbiAgICAgIHJpcHBsZTogcHJvcHMucmlwcGxlICE9PSBudWxsXG4gICAgICAgID8gcHJvcHMucmlwcGxlXG4gICAgICAgIDogdHJ1ZVxuICAgIH0pKVxuXG4gICAgY29uc3QgYnRuQWN0aXZlRGVzaWduUHJvcCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIHdlIGFsc28gcmVzZXQgbm9uLWFjdGl2ZSBkZXNpZ25cbiAgICAgIGNvbnN0IGFjYyA9IHsgWyBidG5EZXNpZ25Qcm9wLnZhbHVlIF06IGZhbHNlIH1cbiAgICAgIGlmIChwcm9wcy5hY3RpdmVEZXNpZ24gIT09ICcnKSB7XG4gICAgICAgIGFjY1sgcHJvcHMuYWN0aXZlRGVzaWduIF0gPSB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcbiAgICBjb25zdCBhY3RpdmVCdG5Qcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICAuLi5idG5BY3RpdmVEZXNpZ25Qcm9wLnZhbHVlLFxuICAgICAgY29sb3I6IHByb3BzLmFjdGl2ZUNvbG9yIHx8IHByb3BzLmNvbG9yLFxuICAgICAgdGV4dENvbG9yOiBwcm9wcy5hY3RpdmVUZXh0Q29sb3IgfHwgcHJvcHMudGV4dENvbG9yXG4gICAgfSkpXG5cbiAgICBjb25zdCBidG5Db25maWcgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgbWF4UGFnZXMgPSBNYXRoLm1heChcbiAgICAgICAgbWF4UGFnZXNQcm9wLnZhbHVlLFxuICAgICAgICAxICsgKGVsbGlwc2VzUHJvcC52YWx1ZSA/IDIgOiAwKSArIChib3VuZGFyeU51bWJlcnNQcm9wLnZhbHVlID8gMiA6IDApXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgICAgcGdGcm9tOiBtaW5Qcm9wLnZhbHVlLFxuICAgICAgICBwZ1RvOiBtYXhQcm9wLnZhbHVlLFxuICAgICAgICBlbGxpcHNlc1N0YXJ0OiBmYWxzZSxcbiAgICAgICAgZWxsaXBzZXNFbmQ6IGZhbHNlLFxuICAgICAgICBib3VuZGFyeVN0YXJ0OiBmYWxzZSxcbiAgICAgICAgYm91bmRhcnlFbmQ6IGZhbHNlLFxuICAgICAgICBtYXJnaW5hbFN0eWxlOiB7XG4gICAgICAgICAgbWluV2lkdGg6IGAkeyBNYXRoLm1heCgyLCBTdHJpbmcobWF4UHJvcC52YWx1ZSkubGVuZ3RoKSB9ZW1gXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1heFBhZ2VzUHJvcC52YWx1ZSAmJiBtYXhQYWdlcyA8IChtYXhQcm9wLnZhbHVlIC0gbWluUHJvcC52YWx1ZSArIDEpKSB7XG4gICAgICAgIG1heFBhZ2VzID0gMSArIE1hdGguZmxvb3IobWF4UGFnZXMgLyAyKSAqIDJcbiAgICAgICAgYWNjLnBnRnJvbSA9IE1hdGgubWF4KG1pblByb3AudmFsdWUsIE1hdGgubWluKG1heFByb3AudmFsdWUgLSBtYXhQYWdlcyArIDEsIHByb3BzLm1vZGVsVmFsdWUgLSBNYXRoLmZsb29yKG1heFBhZ2VzIC8gMikpKVxuICAgICAgICBhY2MucGdUbyA9IE1hdGgubWluKG1heFByb3AudmFsdWUsIGFjYy5wZ0Zyb20gKyBtYXhQYWdlcyAtIDEpXG5cbiAgICAgICAgaWYgKGJvdW5kYXJ5TnVtYmVyc1Byb3AudmFsdWUpIHtcbiAgICAgICAgICBhY2MuYm91bmRhcnlTdGFydCA9IHRydWVcbiAgICAgICAgICBhY2MucGdGcm9tKytcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGxpcHNlc1Byb3AudmFsdWUgJiYgYWNjLnBnRnJvbSA+IChtaW5Qcm9wLnZhbHVlICsgKGJvdW5kYXJ5TnVtYmVyc1Byb3AudmFsdWUgPyAxIDogMCkpKSB7XG4gICAgICAgICAgYWNjLmVsbGlwc2VzU3RhcnQgPSB0cnVlXG4gICAgICAgICAgYWNjLnBnRnJvbSsrXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm91bmRhcnlOdW1iZXJzUHJvcC52YWx1ZSkge1xuICAgICAgICAgIGFjYy5ib3VuZGFyeUVuZCA9IHRydWVcbiAgICAgICAgICBhY2MucGdUby0tXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxsaXBzZXNQcm9wLnZhbHVlICYmIGFjYy5wZ1RvIDwgKG1heFByb3AudmFsdWUgLSAoYm91bmRhcnlOdW1iZXJzUHJvcC52YWx1ZSA/IDEgOiAwKSkpIHtcbiAgICAgICAgICBhY2MuZWxsaXBzZXNFbmQgPSB0cnVlXG4gICAgICAgICAgYWNjLnBnVG8tLVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc2V0ICh2YWx1ZSkge1xuICAgICAgbW9kZWwudmFsdWUgPSB2YWx1ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEJ5T2Zmc2V0IChvZmZzZXQpIHtcbiAgICAgIG1vZGVsLnZhbHVlID0gbW9kZWwudmFsdWUgKyBvZmZzZXRcbiAgICB9XG5cbiAgICBjb25zdCBpbnB1dEV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZU1vZGVsICgpIHtcbiAgICAgICAgbW9kZWwudmFsdWUgPSBuZXdQYWdlLnZhbHVlXG4gICAgICAgIG5ld1BhZ2UudmFsdWUgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogdmFsID0+IHsgbmV3UGFnZS52YWx1ZSA9IHZhbCB9LFxuICAgICAgICBvbktleXVwOiBlID0+IHsgaXNLZXlDb2RlKGUsIDEzKSA9PT0gdHJ1ZSAmJiB1cGRhdGVNb2RlbCgpIH0sXG4gICAgICAgIG9uQmx1cjogdXBkYXRlTW9kZWxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZ2V0QnRuIChjZmcsIHBhZ2UsIGFjdGl2ZSkge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwYWdlLFxuICAgICAgICAnYXJpYS1jdXJyZW50JzogJ2ZhbHNlJyxcbiAgICAgICAgLi4uYnRuUHJvcHMudmFsdWUsXG4gICAgICAgIC4uLmNmZ1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgICAgICAgICdhcmlhLWN1cnJlbnQnOiAndHJ1ZScsXG4gICAgICAgICAgLi4uYWN0aXZlQnRuUHJvcHMudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHBhZ2UgIT09IHZvaWQgMCkge1xuICAgICAgICBpZiAocHJvcHMudG9GbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgZGF0YS50byA9IHByb3BzLnRvRm4ocGFnZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkYXRhLm9uQ2xpY2sgPSAoKSA9PiB7IHNldChwYWdlKSB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoUUJ0biwgZGF0YSlcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHNldCwgc2V0QnlPZmZzZXQgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50U3RhcnQgPSBbXVxuICAgICAgY29uc3QgY29udGVudEVuZCA9IFtdXG4gICAgICBsZXQgY29udGVudE1pZGRsZVxuXG4gICAgICBpZiAoYm91bmRhcnlMaW5rc1Byb3AudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29udGVudFN0YXJ0LnB1c2goXG4gICAgICAgICAgZ2V0QnRuKHtcbiAgICAgICAgICAgIGtleTogJ2JscycsXG4gICAgICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlIHx8IHByb3BzLm1vZGVsVmFsdWUgPD0gbWluUHJvcC52YWx1ZSxcbiAgICAgICAgICAgIGljb246IGljb25zLnZhbHVlWyAwIF0sXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICRxLmxhbmcucGFnaW5hdGlvbi5maXJzdFxuICAgICAgICAgIH0sIG1pblByb3AudmFsdWUpXG4gICAgICAgIClcblxuICAgICAgICBjb250ZW50RW5kLnVuc2hpZnQoXG4gICAgICAgICAgZ2V0QnRuKHtcbiAgICAgICAgICAgIGtleTogJ2JsZScsXG4gICAgICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlIHx8IHByb3BzLm1vZGVsVmFsdWUgPj0gbWF4UHJvcC52YWx1ZSxcbiAgICAgICAgICAgIGljb246IGljb25zLnZhbHVlWyAzIF0sXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICRxLmxhbmcucGFnaW5hdGlvbi5sYXN0XG4gICAgICAgICAgfSwgbWF4UHJvcC52YWx1ZSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoZGlyZWN0aW9uTGlua3NQcm9wLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRlbnRTdGFydC5wdXNoKFxuICAgICAgICAgIGdldEJ0bih7XG4gICAgICAgICAgICBrZXk6ICdiZHAnLFxuICAgICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSB8fCBwcm9wcy5tb2RlbFZhbHVlIDw9IG1pblByb3AudmFsdWUsXG4gICAgICAgICAgICBpY29uOiBpY29ucy52YWx1ZVsgMSBdLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAkcS5sYW5nLnBhZ2luYXRpb24ucHJldlxuICAgICAgICAgIH0sIHByb3BzLm1vZGVsVmFsdWUgLSAxKVxuICAgICAgICApXG5cbiAgICAgICAgY29udGVudEVuZC51bnNoaWZ0KFxuICAgICAgICAgIGdldEJ0bih7XG4gICAgICAgICAgICBrZXk6ICdiZG4nLFxuICAgICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSB8fCBwcm9wcy5tb2RlbFZhbHVlID49IG1heFByb3AudmFsdWUsXG4gICAgICAgICAgICBpY29uOiBpY29ucy52YWx1ZVsgMiBdLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAkcS5sYW5nLnBhZ2luYXRpb24ubmV4dFxuICAgICAgICAgIH0sIHByb3BzLm1vZGVsVmFsdWUgKyAxKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5pbnB1dCAhPT0gdHJ1ZSkgeyAvLyBoYXMgYnV0dG9ucyBpbnN0ZWFkIG9mIGlucHV0Ym94XG4gICAgICAgIGNvbnRlbnRNaWRkbGUgPSBbXVxuICAgICAgICBjb25zdCB7IHBnRnJvbSwgcGdUbywgbWFyZ2luYWxTdHlsZTogc3R5bGUgfSA9IGJ0bkNvbmZpZy52YWx1ZVxuXG4gICAgICAgIGlmIChidG5Db25maWcudmFsdWUuYm91bmRhcnlTdGFydCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IG1pblByb3AudmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgICBjb250ZW50U3RhcnQucHVzaChcbiAgICAgICAgICAgIGdldEJ0bih7XG4gICAgICAgICAgICAgIGtleTogJ2JucycsXG4gICAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlLFxuICAgICAgICAgICAgICBsYWJlbDogbWluUHJvcC52YWx1ZVxuICAgICAgICAgICAgfSwgbWluUHJvcC52YWx1ZSwgYWN0aXZlKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChidG5Db25maWcudmFsdWUuYm91bmRhcnlFbmQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBhY3RpdmUgPSBtYXhQcm9wLnZhbHVlID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgICAgY29udGVudEVuZC51bnNoaWZ0KFxuICAgICAgICAgICAgZ2V0QnRuKHtcbiAgICAgICAgICAgICAga2V5OiAnYm5lJyxcbiAgICAgICAgICAgICAgc3R5bGUsXG4gICAgICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUsXG4gICAgICAgICAgICAgIGxhYmVsOiBtYXhQcm9wLnZhbHVlXG4gICAgICAgICAgICB9LCBtYXhQcm9wLnZhbHVlLCBhY3RpdmUpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJ0bkNvbmZpZy52YWx1ZS5lbGxpcHNlc1N0YXJ0ID09PSB0cnVlKSB7XG4gICAgICAgICAgY29udGVudFN0YXJ0LnB1c2goXG4gICAgICAgICAgICBnZXRCdG4oe1xuICAgICAgICAgICAgICBrZXk6ICdiZXMnLFxuICAgICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSxcbiAgICAgICAgICAgICAgbGFiZWw6ICfigKYnLFxuICAgICAgICAgICAgICByaXBwbGU6IGZhbHNlXG4gICAgICAgICAgICB9LCBwZ0Zyb20gLSAxKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChidG5Db25maWcudmFsdWUuZWxsaXBzZXNFbmQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb250ZW50RW5kLnVuc2hpZnQoXG4gICAgICAgICAgICBnZXRCdG4oe1xuICAgICAgICAgICAgICBrZXk6ICdiZWUnLFxuICAgICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSxcbiAgICAgICAgICAgICAgbGFiZWw6ICfigKYnLFxuICAgICAgICAgICAgICByaXBwbGU6IGZhbHNlXG4gICAgICAgICAgICB9LCBwZ1RvICsgMSlcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gcGdGcm9tOyBpIDw9IHBnVG87IGkrKykge1xuICAgICAgICAgIGNvbnRlbnRNaWRkbGUucHVzaChcbiAgICAgICAgICAgIGdldEJ0bih7XG4gICAgICAgICAgICAgIGtleTogYGJwZyR7IGkgfWAsXG4gICAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlLFxuICAgICAgICAgICAgICBsYWJlbDogaVxuICAgICAgICAgICAgfSwgaSwgaSA9PT0gcHJvcHMubW9kZWxWYWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIC4uLmF0dHJzLnZhbHVlXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtcGFnaW5hdGlvbl9fY29udGVudCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIHN0eWxlOiBndXR0ZXJTdHlsZS52YWx1ZVxuICAgICAgICB9LCBbXG4gICAgICAgICAgLi4uY29udGVudFN0YXJ0LFxuXG4gICAgICAgICAgcHJvcHMuaW5wdXQgPT09IHRydWVcbiAgICAgICAgICAgID8gaChRSW5wdXQsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdpbmxpbmUnLFxuICAgICAgICAgICAgICBzdHlsZTogeyB3aWR0aDogYCR7IGlucHV0UGxhY2Vob2xkZXIudmFsdWUubGVuZ3RoIC8gMS41IH1lbWAgfSxcbiAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgICAgICB2YWx1ZTogbmV3UGFnZS52YWx1ZSxcbiAgICAgICAgICAgICAgZGlzYWJsZTogcHJvcHMuZGlzYWJsZSxcbiAgICAgICAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBpbnB1dENsYXNzOiBwcm9wcy5pbnB1dENsYXNzLFxuICAgICAgICAgICAgICBpbnB1dFN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogaW5wdXRQbGFjZWhvbGRlci52YWx1ZSxcbiAgICAgICAgICAgICAgbWluOiBtaW5Qcm9wLnZhbHVlLFxuICAgICAgICAgICAgICBtYXg6IG1heFByb3AudmFsdWUsXG4gICAgICAgICAgICAgIC4uLmlucHV0RXZlbnRzLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAncS1wYWdpbmF0aW9uX19taWRkbGUgcm93IGp1c3RpZnktY2VudGVyJ1xuICAgICAgICAgICAgfSwgY29udGVudE1pZGRsZSksXG5cbiAgICAgICAgICAuLi5jb250ZW50RW5kXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJkcmFnZ2luZyIsImNsYXNzZXMiXSwibWFwcGluZ3MiOiI7O0FBT08sTUFBTSxnQkFBZ0I7QUFBQSxFQUMzQjtBQUFBLEVBQVE7QUFBQSxFQUFRO0FBQUEsRUFDaEI7QUFBQSxFQUFRO0FBQUEsRUFBVTtBQUFBLEVBQVM7QUFBQSxFQUMzQjtBQUFBLEVBQWE7QUFBQSxFQUFVO0FBQUEsRUFDdkI7QUFBQSxFQUFXO0FBQUEsRUFBVTtBQUFBLEVBQ3JCO0FBQ0Y7QUFFTyxNQUFNLHFCQUFxQjtBQUFBLEVBQ2hDO0FBQUEsRUFBUTtBQUFBLEVBQVM7QUFBQSxFQUFXO0FBQUEsRUFBVztBQUFBLEVBQVE7QUFB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LGNBQ0wsS0FBSztBQUFBLGNBQ0w7QUFBQSxjQUNBLFNBQVMsTUFBTTtBQUFBLGNBQ2YsT0FBTztBQUFBLGNBQ1AsUUFBUTtBQUFBLFlBQ3RCLEdBQWUsU0FBUyxDQUFDO0FBQUEsVUFDekI7QUFBQSxRQUNRO0FBRUEsWUFBSSxVQUFVLE1BQU0sZ0JBQWdCLE1BQU07QUFDeEMscUJBQVc7QUFBQSxZQUNULE9BQU87QUFBQSxjQUNMLEtBQUs7QUFBQSxjQUNMO0FBQUEsY0FDQSxTQUFTLE1BQU07QUFBQSxjQUNmLE9BQU87QUFBQSxjQUNQLFFBQVE7QUFBQSxZQUN0QixHQUFlLE9BQU8sQ0FBQztBQUFBLFVBQ3ZCO0FBQUEsUUFDUTtBQUVBLGlCQUFTLElBQUksUUFBUSxLQUFLLE1BQU0sS0FBSztBQUNuQyx3QkFBYztBQUFBLFlBQ1osT0FBTztBQUFBLGNBQ0wsS0FBSyxNQUFPO2NBQ1o7QUFBQSxjQUNBLFNBQVMsTUFBTTtBQUFBLGNBQ2YsT0FBTztBQUFBLFlBQ3JCLEdBQWUsR0FBRyxNQUFNLE1BQU0sVUFBVTtBQUFBLFVBQ3hDO0FBQUEsUUFDUTtBQUFBLE1BQ0Y7QUFFQSxhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsT0FBTyxRQUFRO0FBQUEsUUFDZixHQUFHLE1BQU07QUFBQSxNQUNqQixHQUFTO0FBQUEsUUFDRCxFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLE9BQU8sWUFBWTtBQUFBLFFBQzdCLEdBQVc7QUFBQSxVQUNELEdBQUc7QUFBQSxVQUVILE1BQU0sVUFBVSxPQUNaLEVBQUUsUUFBUTtBQUFBLFlBQ1YsT0FBTztBQUFBLFlBQ1AsT0FBTyxFQUFFLE9BQU8sR0FBSSxpQkFBaUIsTUFBTSxTQUFTLEdBQUcsS0FBSztBQUFBLFlBQzVELE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLE9BQU8sUUFBUTtBQUFBLFlBQ2YsU0FBUyxNQUFNO0FBQUEsWUFDZixNQUFNLE9BQU87QUFBQSxZQUNiLFlBQVk7QUFBQSxZQUNaLFlBQVksTUFBTTtBQUFBLFlBQ2xCLFlBQVksTUFBTTtBQUFBLFlBQ2xCLGFBQWEsaUJBQWlCO0FBQUEsWUFDOUIsS0FBSyxRQUFRO0FBQUEsWUFDYixLQUFLLFFBQVE7QUFBQSxZQUNiLEdBQUcsWUFBWTtBQUFBLFVBQzdCLENBQWEsSUFDQyxFQUFFLE9BQU87QUFBQSxZQUNULE9BQU87QUFBQSxVQUNyQixHQUFlLGFBQWE7QUFBQSxVQUVsQixHQUFHO0FBQUEsUUFDYixDQUFTO0FBQUEsTUFDVCxDQUFPO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzXX0=
