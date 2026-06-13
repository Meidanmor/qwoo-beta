import { f as createComponent, h, g as getCurrentInstance, e as computed } from "./quasar-observers-delayed-tSHCOYpR.js";
import { a as hSlot } from "./index-DDAg5YDa.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRkLVl3c3JHM05vLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYmxlL1FUZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUZCcsXG5cbiAgcHJvcHM6IHtcbiAgICBwcm9wczogT2JqZWN0LFxuICAgIGF1dG9XaWR0aDogQm9vbGVhbixcbiAgICBub0hvdmVyOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10ZCcgKyAocHJvcHMuYXV0b1dpZHRoID09PSB0cnVlID8gJyBxLXRhYmxlLS1jb2wtYXV0by13aWR0aCcgOiAnJylcbiAgICAgICsgKHByb3BzLm5vSG92ZXIgPT09IHRydWUgPyAnIHEtdGQtLW5vLWhvdmVyJyA6ICcnKVxuICAgICAgKyAnICdcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnByb3BzID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGgoJ3RkJywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmFtZSA9IHZtLnZub2RlLmtleVxuICAgICAgY29uc3QgY29sID0gKFxuICAgICAgICAocHJvcHMucHJvcHMuY29sc01hcCAhPT0gdm9pZCAwID8gcHJvcHMucHJvcHMuY29sc01hcFsgbmFtZSBdIDogbnVsbClcbiAgICAgICAgfHwgcHJvcHMucHJvcHMuY29sXG4gICAgICApXG5cbiAgICAgIGlmIChjb2wgPT09IHZvaWQgMCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHsgcm93IH0gPSBwcm9wcy5wcm9wc1xuXG4gICAgICByZXR1cm4gaCgndGQnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlICsgY29sLl9fdGRDbGFzcyhyb3cpLFxuICAgICAgICBzdHlsZTogY29sLl9fdGRTdHlsZShyb3cpXG4gICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxNQUFBLE1BQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLEVBQ2I7QUFBQSxFQUVFLE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxLQUFLLG1CQUFrQjtBQUM3QixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLFVBQVUsTUFBTSxjQUFjLE9BQU8sNkJBQTZCLE9BQy9ELE1BQU0sWUFBWSxPQUFPLG9CQUFvQixNQUM5QztBQUFBLElBQ1I7QUFFSSxXQUFPLE1BQU07QUFDWCxVQUFJLE1BQU0sVUFBVSxRQUFRO0FBQzFCLGVBQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLE1BQy9EO0FBRUEsWUFBTSxPQUFPLEdBQUcsTUFBTTtBQUN0QixZQUFNLE9BQ0gsTUFBTSxNQUFNLFlBQVksU0FBUyxNQUFNLE1BQU0sUUFBUyxJQUFJLElBQUssU0FDN0QsTUFBTSxNQUFNO0FBR2pCLFVBQUksUUFBUSxPQUFRO0FBRXBCLFlBQU0sRUFBRSxJQUFHLElBQUssTUFBTTtBQUV0QixhQUFPLEVBQUUsTUFBTTtBQUFBLFFBQ2IsT0FBTyxRQUFRLFFBQVEsSUFBSSxVQUFVLEdBQUc7QUFBQSxRQUN4QyxPQUFPLElBQUksVUFBVSxHQUFHO0FBQUEsTUFDaEMsR0FBUyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
