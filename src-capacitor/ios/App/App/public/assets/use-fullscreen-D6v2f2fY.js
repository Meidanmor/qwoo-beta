import { aK as vmHasRouter, aL as History } from "./index-DDAg5YDa.js";
import { v as watch, ay as onBeforeMount, x as onMounted, R as onBeforeUnmount, g as getCurrentInstance, j as ref } from "./quasar-observers-delayed-tSHCOYpR.js";
let counter = 0;
const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};
const useFullscreenEmits = ["update:fullscreen", "fullscreen"];
function useFullscreen() {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);
  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });
  watch(() => props.fullscreen, (v) => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });
  watch(inFullscreen, (v) => {
    emit("update:fullscreen", v);
    emit("fullscreen", v);
  });
  function toggleFullscreen() {
    if (inFullscreen.value === true) {
      exitFullscreen();
    } else {
      setFullscreen();
    }
  }
  function setFullscreen() {
    if (inFullscreen.value === true) return;
    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);
    counter++;
    if (counter === 1) {
      document.body.classList.add("q-body--fullscreen-mixin");
    }
    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }
  function exitFullscreen() {
    if (inFullscreen.value !== true) return;
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;
    counter = Math.max(0, counter - 1);
    if (counter === 0) {
      document.body.classList.remove("q-body--fullscreen-mixin");
      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => {
          proxy.$el.scrollIntoView();
        });
      }
    }
  }
  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement("span");
  });
  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });
  onBeforeUnmount(exitFullscreen);
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });
  return {
    inFullscreen,
    toggleFullscreen
  };
}
export {
  useFullscreenProps as a,
  useFullscreen as b,
  useFullscreenEmits as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWZ1bGxzY3JlZW4tRDZ2MmYyZlkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZ1bGxzY3JlZW4vdXNlLWZ1bGxzY3JlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25CZWZvcmVNb3VudCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vcGx1Z2lucy9wcml2YXRlLmhpc3RvcnkvSGlzdG9yeS5qcydcbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxubGV0IGNvdW50ZXIgPSAwXG5cbmV4cG9ydCBjb25zdCB1c2VGdWxsc2NyZWVuUHJvcHMgPSB7XG4gIGZ1bGxzY3JlZW46IEJvb2xlYW4sXG4gIG5vUm91dGVGdWxsc2NyZWVuRXhpdDogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlRnVsbHNjcmVlbkVtaXRzID0gWyAndXBkYXRlOmZ1bGxzY3JlZW4nLCAnZnVsbHNjcmVlbicgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IGhpc3RvcnlFbnRyeSwgZnVsbHNjcmVlbkZpbGxlck5vZGUsIGNvbnRhaW5lclxuICBjb25zdCBpbkZ1bGxzY3JlZW4gPSByZWYoZmFsc2UpXG5cbiAgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlICYmIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgIHByb3BzLm5vUm91dGVGdWxsc2NyZWVuRXhpdCAhPT0gdHJ1ZSAmJiBleGl0RnVsbHNjcmVlbigpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgaWYgKGluRnVsbHNjcmVlbi52YWx1ZSAhPT0gdikge1xuICAgICAgdG9nZ2xlRnVsbHNjcmVlbigpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKGluRnVsbHNjcmVlbiwgdiA9PiB7XG4gICAgZW1pdCgndXBkYXRlOmZ1bGxzY3JlZW4nLCB2KVxuICAgIGVtaXQoJ2Z1bGxzY3JlZW4nLCB2KVxuICB9KVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGV4aXRGdWxsc2NyZWVuKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzZXRGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRGdWxsc2NyZWVuICgpIHtcbiAgICBpZiAoaW5GdWxsc2NyZWVuLnZhbHVlID09PSB0cnVlKSByZXR1cm5cblxuICAgIGluRnVsbHNjcmVlbi52YWx1ZSA9IHRydWVcbiAgICBjb250YWluZXIgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgIGNvbnRhaW5lci5yZXBsYWNlQ2hpbGQoZnVsbHNjcmVlbkZpbGxlck5vZGUsIHByb3h5LiRlbClcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHByb3h5LiRlbClcblxuICAgIGNvdW50ZXIrK1xuICAgIGlmIChjb3VudGVyID09PSAxKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZnVsbHNjcmVlbi1taXhpbicpXG4gICAgfVxuXG4gICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgaGFuZGxlcjogZXhpdEZ1bGxzY3JlZW5cbiAgICB9XG4gICAgSGlzdG9yeS5hZGQoaGlzdG9yeUVudHJ5KVxuICB9XG5cbiAgZnVuY3Rpb24gZXhpdEZ1bGxzY3JlZW4gKCkge1xuICAgIGlmIChpbkZ1bGxzY3JlZW4udmFsdWUgIT09IHRydWUpIHJldHVyblxuXG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG5cbiAgICBjb250YWluZXIucmVwbGFjZUNoaWxkKHByb3h5LiRlbCwgZnVsbHNjcmVlbkZpbGxlck5vZGUpXG4gICAgaW5GdWxsc2NyZWVuLnZhbHVlID0gZmFsc2VcblxuICAgIGNvdW50ZXIgPSBNYXRoLm1heCgwLCBjb3VudGVyIC0gMSlcblxuICAgIGlmIChjb3VudGVyID09PSAwKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZnVsbHNjcmVlbi1taXhpbicpXG5cbiAgICAgIGlmIChwcm94eS4kZWwuc2Nyb2xsSW50b1ZpZXcgIT09IHZvaWQgMCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgcHJveHkuJGVsLnNjcm9sbEludG9WaWV3KCkgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZU1vdW50KCgpID0+IHtcbiAgICBmdWxsc2NyZWVuRmlsbGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvcHMuZnVsbHNjcmVlbiA9PT0gdHJ1ZSAmJiBzZXRGdWxsc2NyZWVuKClcbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoZXhpdEZ1bGxzY3JlZW4pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICB0b2dnbGVGdWxsc2NyZWVuLFxuICAgIHNldEZ1bGxzY3JlZW4sXG4gICAgZXhpdEZ1bGxzY3JlZW5cbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGluRnVsbHNjcmVlbixcbiAgICB0b2dnbGVGdWxsc2NyZWVuXG4gIH1c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
