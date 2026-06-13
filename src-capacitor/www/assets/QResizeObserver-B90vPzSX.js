import { r as ref, bo as isRuntimeSsrPreHydration, D as onMounted, c as createComponent, g as getCurrentInstance, l as onBeforeUnmount, bi as noop, R as nextTick, h, bf as listenOpts } from "./index-B4eBuDfB.js";
function useHydration() {
  const isHydrated = ref(!isRuntimeSsrPreHydration.value);
  if (isHydrated.value === false) {
    onMounted(() => {
      isHydrated.value = true;
    });
  }
  return { isHydrated };
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
const QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size.width || height !== size.height) {
          size = { width, height };
          emit("resize", size);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    proxy.trigger = trigger;
    if (hasObserver === true) {
      let observer;
      const init = (stop) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl?.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const { isHydrated } = useHydration();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      return () => {
        if (isHydrated.value === true) {
          return h("object", {
            class: "q--avoid-card-border",
            style: resizeProps.style,
            tabindex: -1,
            // fix for Firefox
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
const QResizeObserver$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QResizeObserver
}, Symbol.toStringTag, { value: "Module" }));
export {
  QResizeObserver as Q,
  QResizeObserver$1 as a,
  useHydration as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJlc2l6ZU9ic2VydmVyLUI5MHZQelNYLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtaHlkcmF0aW9uL3VzZS1oeWRyYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbi8vIHVzaW5nIGl0IHRvIG1hbmFnZSBTU1IgcmVuZGVyaW5nIHdpdGggYmVzdCBwZXJmb3JtYW5jZVxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpc0h5ZHJhdGVkID0gcmVmKCFpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUpXG5cbiAgaWYgKGlzSHlkcmF0ZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGlzSHlkcmF0ZWQudmFsdWUgPSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7IGlzSHlkcmF0ZWQgfVxufVxuIiwiaW1wb3J0IHsgaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIeWRyYXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWh5ZHJhdGlvbi91c2UtaHlkcmF0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5cbmNvbnN0IGhhc09ic2VydmVyID0gdHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJ1xuY29uc3QgcmVzaXplUHJvcHMgPSBoYXNPYnNlcnZlciA9PT0gdHJ1ZVxuICA/IHt9XG4gIDoge1xuICAgICAgc3R5bGU6ICdkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3BvaW50ZXItZXZlbnRzOm5vbmU7ei1pbmRleDotMTsnLFxuICAgICAgdXJsOiAnYWJvdXQ6YmxhbmsnXG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVJlc2l6ZU9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGRlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2l6ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykgeyByZXR1cm4gbm9vcCB9XG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCB0YXJnZXRFbCwgc2l6ZSA9IHsgd2lkdGg6IC0xLCBoZWlnaHQ6IC0xIH1cblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuZGVib3VuY2UgPT09IDAgfHwgcHJvcHMuZGVib3VuY2UgPT09ICcwJykge1xuICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVtaXRFdmVudCwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aDogd2lkdGgsIG9mZnNldEhlaWdodDogaGVpZ2h0IH0gPSB0YXJnZXRFbFxuXG4gICAgICAgIGlmICh3aWR0aCAhPT0gc2l6ZS53aWR0aCB8fCBoZWlnaHQgIT09IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgc2l6ZSA9IHsgd2lkdGgsIGhlaWdodCB9XG4gICAgICAgICAgZW1pdCgncmVzaXplJywgc2l6ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZFxuICAgIHByb3h5LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICBpZiAoaGFzT2JzZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgIGxldCBvYnNlcnZlclxuXG4gICAgICAvLyBpbml0aWFsaXplIGFzIHNvb24gYXMgcG9zc2libGVcbiAgICAgIGNvbnN0IGluaXQgPSBzdG9wID0+IHtcbiAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCkge1xuICAgICAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHRyaWdnZXIpXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbClcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0b3AgIT09IHRydWUpIHtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7IGluaXQodHJ1ZSkgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4geyBpbml0KCkgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuXG4gICAgICAgIGlmIChvYnNlcnZlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLmRpc2Nvbm5lY3QgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHRhcmdldEVsKSB7IC8vIEZGIGZvciBBbmRyb2lkXG4gICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH1cbiAgICBlbHNlIHsgLy8gbm8gb2JzZXJ2ZXIsIHNvIGZhbGxiYWNrIHRvIG9sZCBpZnJhbWUgbWV0aG9kXG4gICAgICBjb25zdCB7IGlzSHlkcmF0ZWQgfSA9IHVzZUh5ZHJhdGlvbigpXG5cbiAgICAgIGxldCBjdXJEb2NWaWV3XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyRG9jVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gaU9TIGlzIGZ1enp5LCBuZWVkIHRvIGNoZWNrIGl0IGZpcnN0XG4gICAgICAgICAgaWYgKGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uT2JqTG9hZCAoKSB7XG4gICAgICAgIGNsZWFudXAoKVxuXG4gICAgICAgIGlmICh0YXJnZXRFbD8uY29udGVudERvY3VtZW50KSB7XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHRhcmdldEVsLmNvbnRlbnREb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgICAgICAgIGN1ckRvY1ZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdHJpZ2dlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgICAgICAgIGVtaXRFdmVudCgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHRhcmdldEVsID0gcHJveHkuJGVsXG4gICAgICAgICAgdGFyZ2V0RWwgJiYgb25PYmpMb2FkKClcbiAgICAgICAgfSlcbiAgICAgIH0pXG5cbiAgICAgIG9uQmVmb3JlVW5tb3VudChjbGVhbnVwKVxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoaXNIeWRyYXRlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBoKCdvYmplY3QnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtLWF2b2lkLWNhcmQtYm9yZGVyJyxcbiAgICAgICAgICAgIHN0eWxlOiByZXNpemVQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMSwgLy8gZml4IGZvciBGaXJlZm94XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9odG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHJlc2l6ZVByb3BzLnVybCxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgIG9uTG9hZDogb25PYmpMb2FkXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS2UsU0FBQSxlQUFZO0FBQ3pCLFFBQU0sYUFBYSxJQUFJLENBQUMseUJBQXlCLEtBQUs7QUFFdEQsTUFBSSxXQUFXLFVBQVUsT0FBTztBQUM5QixjQUFVLE1BQU07QUFDZCxpQkFBVyxRQUFRO0FBQUEsSUFDckIsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPLEVBQUUsV0FBVTtBQUNyQjtBQ1JBLE1BQU0sY0FBYyxPQUFPLG1CQUFtQjtBQUM5QyxNQUFNLGNBQWMsZ0JBQWdCLE9BQ2hDLEtBQ0E7QUFBQSxFQUNFLE9BQU87QUFBQSxFQUNQLEtBQUs7QUFDUDtBQUVKLE1BQUEsa0JBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsVUFBVTtBQUFBLE1BQ1IsTUFBTSxDQUFFLFFBQVEsTUFBTztBQUFBLE1BQ3ZCLFNBQVM7QUFBQSxJQUFBO0FBQUEsRUFDWDtBQUFBLEVBR0YsT0FBTyxDQUFFLFFBQVM7QUFBQSxFQUVsQixNQUFPLE9BQU8sRUFBRSxRQUFRO0FBR3RCLFFBQUksUUFBUSxNQUFNLFVBQVUsT0FBTyxFQUFFLE9BQU8sSUFBSSxRQUFRLEdBQUE7QUFFeEQsYUFBUyxRQUFTLGFBQWE7QUFDN0IsVUFBSSxnQkFBZ0IsUUFBUSxNQUFNLGFBQWEsS0FBSyxNQUFNLGFBQWEsS0FBSztBQUMxRSxrQkFBQTtBQUFBLE1BQ0YsV0FDUyxVQUFVLE1BQU07QUFDdkIsZ0JBQVEsV0FBVyxXQUFXLE1BQU0sUUFBUTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUVBLGFBQVMsWUFBYTtBQUNwQixVQUFJLFVBQVUsTUFBTTtBQUNsQixxQkFBYSxLQUFLO0FBQ2xCLGdCQUFRO0FBQUEsTUFDVjtBQUVBLFVBQUksVUFBVTtBQUNaLGNBQU0sRUFBRSxhQUFhLE9BQU8sY0FBYyxXQUFXO0FBRXJELFlBQUksVUFBVSxLQUFLLFNBQVMsV0FBVyxLQUFLLFFBQVE7QUFDbEQsaUJBQU8sRUFBRSxPQUFPLE9BQUE7QUFDaEIsZUFBSyxVQUFVLElBQUk7QUFBQSxRQUNyQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxFQUFFLE1BQUEsSUFBVSxtQkFBQTtBQUdsQixVQUFNLFVBQVU7QUFFaEIsUUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixVQUFJO0FBR0osWUFBTSxPQUFPLENBQUEsU0FBUTtBQUNuQixtQkFBVyxNQUFNLElBQUk7QUFFckIsWUFBSSxVQUFVO0FBQ1oscUJBQVcsSUFBSSxlQUFlLE9BQU87QUFDckMsbUJBQVMsUUFBUSxRQUFRO0FBQ3pCLG9CQUFBO0FBQUEsUUFDRixXQUNTLFNBQVMsTUFBTTtBQUN0QixtQkFBUyxNQUFNO0FBQUUsaUJBQUssSUFBSTtBQUFBLFVBQUUsQ0FBQztBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUVBLGdCQUFVLE1BQU07QUFBRSxhQUFBO0FBQUEsTUFBTyxDQUFDO0FBRTFCLHNCQUFnQixNQUFNO0FBQ3BCLGtCQUFVLFFBQVEsYUFBYSxLQUFLO0FBRXBDLFlBQUksYUFBYSxRQUFRO0FBQ3ZCLGNBQUksU0FBUyxlQUFlLFFBQVE7QUFDbEMscUJBQVMsV0FBQTtBQUFBLFVBQ1gsV0FDUyxVQUFVO0FBQ2pCLHFCQUFTLFVBQVUsUUFBUTtBQUFBLFVBQzdCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELGFBQU87QUFBQSxJQUNULE9BQ0s7QUFLSCxVQUFTLFVBQVQsV0FBb0I7QUFDbEIsWUFBSSxVQUFVLE1BQU07QUFDbEIsdUJBQWEsS0FBSztBQUNsQixrQkFBUTtBQUFBLFFBQ1Y7QUFFQSxZQUFJLGVBQWUsUUFBUTtBQUV6QixjQUFJLFdBQVcsd0JBQXdCLFFBQVE7QUFDN0MsdUJBQVcsb0JBQW9CLFVBQVUsU0FBUyxXQUFXLE9BQU87QUFBQSxVQUN0RTtBQUNBLHVCQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0YsR0FFUyxZQUFULFdBQXNCO0FBQ3BCLGdCQUFBO0FBRUEsWUFBSSxVQUFVLGlCQUFpQjtBQUM3Qix1QkFBYSxTQUFTLGdCQUFnQjtBQUN0QyxxQkFBVyxpQkFBaUIsVUFBVSxTQUFTLFdBQVcsT0FBTztBQUNqRSxvQkFBQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBM0JBLFlBQU0sRUFBRSxXQUFBLElBQWUsYUFBQTtBQUV2QixVQUFJO0FBMkJKLGdCQUFVLE1BQU07QUFDZCxpQkFBUyxNQUFNO0FBQ2IscUJBQVcsTUFBTTtBQUNqQixzQkFBWSxVQUFBO0FBQUEsUUFDZCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsc0JBQWdCLE9BQU87QUFFdkIsYUFBTyxNQUFNO0FBQ1gsWUFBSSxXQUFXLFVBQVUsTUFBTTtBQUM3QixpQkFBTyxFQUFFLFVBQVU7QUFBQSxZQUNqQixPQUFPO0FBQUEsWUFDUCxPQUFPLFlBQVk7QUFBQSxZQUNuQixVQUFVO0FBQUE7QUFBQSxZQUNWLE1BQU07QUFBQSxZQUNOLE1BQU0sWUFBWTtBQUFBLFlBQ2xCLGVBQWU7QUFBQSxZQUNmLFFBQVE7QUFBQSxVQUFBLENBQ1Q7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMV19
