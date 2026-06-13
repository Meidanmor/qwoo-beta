import { ar as planClientUpdate, as as clientList } from "./index-DDAg5YDa.js";
import { v as watch, B as onActivated, A as onDeactivated, z as onUnmounted, e as computed } from "./quasar-observers-delayed-tSHCOYpR.js";
function useMeta(metaOptions) {
  {
    const meta = { active: true };
    if (typeof metaOptions === "function") {
      const content = computed(metaOptions);
      meta.val = content.value;
      watch(content, (val) => {
        meta.val = val;
        meta.active === true && planClientUpdate();
      });
    } else {
      meta.val = metaOptions;
    }
    clientList.push(meta);
    planClientUpdate();
    onActivated(() => {
      meta.active = true;
      planClientUpdate();
    });
    onDeactivated(() => {
      meta.active = false;
      planClientUpdate();
    });
    onUnmounted(() => {
      clientList.splice(clientList.indexOf(meta), 1);
      planClientUpdate();
    });
  }
}
export {
  useMeta as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLW1ldGEtQlZ4T21zanMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1tZXRhL3VzZS1tZXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkLCB3YXRjaCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uVW5tb3VudGVkLCB1c2VTU1JDb250ZXh0IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGllbnRMaXN0LCBwbGFuQ2xpZW50VXBkYXRlIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9tZXRhL01ldGEuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtZXRhT3B0aW9ucykge1xuICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgY29uc3Qgc3NyQ29udGV4dCA9IHVzZVNTUkNvbnRleHQoKVxuXG4gICAgc3NyQ29udGV4dC5fX3FNZXRhTGlzdC5wdXNoKFxuICAgICAgdHlwZW9mIG1ldGFPcHRpb25zID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gbWV0YU9wdGlvbnMoKVxuICAgICAgICA6IG1ldGFPcHRpb25zXG4gICAgKVxuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IG1ldGEgPSB7IGFjdGl2ZTogdHJ1ZSB9XG5cbiAgICBpZiAodHlwZW9mIG1ldGFPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gY29tcHV0ZWQobWV0YU9wdGlvbnMpXG4gICAgICBtZXRhLnZhbCA9IGNvbnRlbnQudmFsdWVcblxuICAgICAgd2F0Y2goY29udGVudCwgdmFsID0+IHtcbiAgICAgICAgbWV0YS52YWwgPSB2YWxcbiAgICAgICAgbWV0YS5hY3RpdmUgPT09IHRydWUgJiYgcGxhbkNsaWVudFVwZGF0ZSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1ldGEudmFsID0gbWV0YU9wdGlvbnNcbiAgICB9XG5cbiAgICBjbGllbnRMaXN0LnB1c2gobWV0YSlcbiAgICBwbGFuQ2xpZW50VXBkYXRlKClcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIG1ldGEuYWN0aXZlID0gdHJ1ZVxuICAgICAgcGxhbkNsaWVudFVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgbWV0YS5hY3RpdmUgPSBmYWxzZVxuICAgICAgcGxhbkNsaWVudFVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgIGNsaWVudExpc3Quc3BsaWNlKGNsaWVudExpc3QuaW5kZXhPZihtZXRhKSwgMSlcbiAgICAgIHBsYW5DbGllbnRVcGRhdGUoKVxuICAgIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLFNBQUEsUUFBeUIsYUFBYTtBQVUvQjtBQUNILFVBQU0sT0FBTyxFQUFFLFFBQVEsS0FBQTtBQUV2QixRQUFJLE9BQU8sZ0JBQWdCLFlBQVk7QUFDckMsWUFBTSxVQUFVLFNBQVMsV0FBVztBQUNwQyxXQUFLLE1BQU0sUUFBUTtBQUVuQixZQUFNLFNBQVMsQ0FBQSxRQUFPO0FBQ3BCLGFBQUssTUFBTTtBQUNYLGFBQUssV0FBVyxRQUFRLGlCQUFBO0FBQUEsTUFDMUIsQ0FBQztBQUFBLElBQ0gsT0FDSztBQUNILFdBQUssTUFBTTtBQUFBLElBQ2I7QUFFQSxlQUFXLEtBQUssSUFBSTtBQUNwQixxQkFBQTtBQUVBLGdCQUFZLE1BQU07QUFDaEIsV0FBSyxTQUFTO0FBQ2QsdUJBQUE7QUFBQSxJQUNGLENBQUM7QUFFRCxrQkFBYyxNQUFNO0FBQ2xCLFdBQUssU0FBUztBQUNkLHVCQUFBO0FBQUEsSUFDRixDQUFDO0FBRUQsZ0JBQVksTUFBTTtBQUNoQixpQkFBVyxPQUFPLFdBQVcsUUFBUSxJQUFJLEdBQUcsQ0FBQztBQUM3Qyx1QkFBQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
