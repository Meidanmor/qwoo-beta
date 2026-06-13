import { c as createComponent, h, d as hSlot, g as getCurrentInstance, b as computed } from "./index-B4eBuDfB.js";
const QTd = createComponent({
  name: "QTd",
  props: {
    props: Object,
    autoWidth: Boolean,
    noHover: Boolean
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const classes = computed(
      () => "q-td" + (props.autoWidth === true ? " q-table--col-auto-width" : "") + (props.noHover === true ? " q-td--no-hover" : "") + " "
    );
    return () => {
      if (props.props === void 0) {
        return h("td", { class: classes.value }, hSlot(slots.default));
      }
      const name = vm.vnode.key;
      const col = (props.props.colsMap !== void 0 ? props.props.colsMap[name] : null) || props.props.col;
      if (col === void 0) return;
      const { row } = props.props;
      return h("td", {
        class: classes.value + col.__tdClass(row),
        style: col.__tdStyle(row)
      }, hSlot(slots.default));
    };
  }
});
export {
  QTd as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRkLUJJM3NTOHVWLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUZCcsXG5cbiAgcHJvcHM6IHtcbiAgICBwcm9wczogT2JqZWN0LFxuICAgIGF1dG9XaWR0aDogQm9vbGVhbixcbiAgICBub0hvdmVyOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10ZCcgKyAocHJvcHMuYXV0b1dpZHRoID09PSB0cnVlID8gJyBxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgOiAnJylcbiAgICAgICsgKHByb3BzLm5vSG92ZXIgPT09IHRydWUgPyAnIHEtdGQtLW5vLWhvdmVyJyA6ICcnKVxuICAgICAgKyAnICdcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnByb3BzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ3RkJywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmFtZSA9IHZtLnZub2RlLmtleVxuICAgICAgY29uc3QgY29sID0gKFxuICAgICAgICAocHJvcHMucHJvcHMuY29sc01hcCAhPT0gdm9pZCAwID8gcHJvcHMucHJvcHMuY29sc01hcFsgbmFtZSBdIDogbnVsbClcbiAgICAgICAgfHwgcHJvcHMucHJvcHMuY29sXG4gICAgICApXG5cbiAgICAgIGlmIChjb2wgPT09IHZvaWQgMCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHsgcm93IH0gPSBwcm9wcy5wcm9wc1xuXG4gICAgICByZXR1cm4gaCgndGQnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlICsgY29sLl9fdGRDbGFzcyhyb3cpLFxuICAgICAgICBzdHlsZTogY29sLl9fdGRTdHlsZShyb3cpXG4gICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQUEsTUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsRUFDYjtBQUFBLEVBRUUsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEtBQUssbUJBQWtCO0FBQzdCLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsVUFBVSxNQUFNLGNBQWMsT0FBTyw2QkFBNkIsT0FDL0QsTUFBTSxZQUFZLE9BQU8sb0JBQW9CLE1BQzlDO0FBQUEsSUFDUjtBQUVJLFdBQU8sTUFBTTtBQUNYLFVBQUksTUFBTSxVQUFVLFFBQVE7QUFDMUIsZUFBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLFFBQVEsU0FBUyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsTUFDL0Q7QUFFQSxZQUFNLE9BQU8sR0FBRyxNQUFNO0FBQ3RCLFlBQU0sT0FDSCxNQUFNLE1BQU0sWUFBWSxTQUFTLE1BQU0sTUFBTSxRQUFTLElBQUksSUFBSyxTQUM3RCxNQUFNLE1BQU07QUFHakIsVUFBSSxRQUFRLE9BQVE7QUFFcEIsWUFBTSxFQUFFLElBQUcsSUFBSyxNQUFNO0FBRXRCLGFBQU8sRUFBRSxNQUFNO0FBQUEsUUFDYixPQUFPLFFBQVEsUUFBUSxJQUFJLFVBQVUsR0FBRztBQUFBLFFBQ3hDLE9BQU8sSUFBSSxVQUFVLEdBQUc7QUFBQSxNQUNoQyxHQUFTLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
