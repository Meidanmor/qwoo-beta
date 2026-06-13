import { f as createComponent, h, e as computed } from "./quasar-observers-delayed-tSHCOYpR.js";
import { a as hSlot } from "./index-DDAg5YDa.js";
const QItemSection = createComponent({
  name: "QItemSection",
  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-item__section column q-item__section--${props.avatar === true || props.side === true || props.thumbnail === true ? "side" : "main"}` + (props.top === true ? " q-item__section--top justify-start" : " justify-center") + (props.avatar === true ? " q-item__section--avatar" : "") + (props.thumbnail === true ? " q-item__section--thumbnail" : "") + (props.noWrap === true ? " q-item__section--nowrap" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
export {
  QItemSection as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUl0ZW1TZWN0aW9uLUVtNVZ3RDRyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUl0ZW1TZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJdGVtU2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICBhdmF0YXI6IEJvb2xlYW4sXG4gICAgdGh1bWJuYWlsOiBCb29sZWFuLFxuICAgIHNpZGU6IEJvb2xlYW4sXG4gICAgdG9wOiBCb29sZWFuLFxuICAgIG5vV3JhcDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pdGVtX19zZWN0aW9uIGNvbHVtbidcbiAgICAgICsgYCBxLWl0ZW1fX3NlY3Rpb24tLSR7IHByb3BzLmF2YXRhciA9PT0gdHJ1ZSB8fCBwcm9wcy5zaWRlID09PSB0cnVlIHx8IHByb3BzLnRodW1ibmFpbCA9PT0gdHJ1ZSA/ICdzaWRlJyA6ICdtYWluJyB9YFxuICAgICAgKyAocHJvcHMudG9wID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLXRvcCBqdXN0aWZ5LXN0YXJ0JyA6ICcganVzdGlmeS1jZW50ZXInKVxuICAgICAgKyAocHJvcHMuYXZhdGFyID09PSB0cnVlID8gJyBxLWl0ZW1fX3NlY3Rpb24tLWF2YXRhcicgOiAnJylcbiAgICAgICsgKHByb3BzLnRodW1ibmFpbCA9PT0gdHJ1ZSA/ICcgcS1pdGVtX19zZWN0aW9uLS10aHVtYm5haWwnIDogJycpXG4gICAgICArIChwcm9wcy5ub1dyYXAgPT09IHRydWUgPyAnIHEtaXRlbV9fc2VjdGlvbi0tbm93cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBQSxlQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFFRSxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsMkNBQ3dCLE1BQU0sV0FBVyxRQUFRLE1BQU0sU0FBUyxRQUFRLE1BQU0sY0FBYyxPQUFPLFNBQVMsTUFBTSxNQUMvRyxNQUFNLFFBQVEsT0FBTyx3Q0FBd0Msc0JBQzdELE1BQU0sV0FBVyxPQUFPLDZCQUE2QixPQUNyRCxNQUFNLGNBQWMsT0FBTyxnQ0FBZ0MsT0FDM0QsTUFBTSxXQUFXLE9BQU8sNkJBQTZCO0FBQUEsSUFDOUQ7QUFFSSxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3RFO0FBQ0YsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
