import { am as useRouterLinkProps, an as useRouterLink, e as QIcon, h as hMergeSlot, ao as useAlignProps, ap as getNormalizedVNodes, a as hSlot, aq as useAlign } from "./index-DDAg5YDa.js";
import { f as createComponent, h, e as computed } from "./quasar-observers-delayed-tSHCOYpR.js";
const QBreadcrumbsEl = createComponent({
  name: "QBreadcrumbsEl",
  props: {
    ...useRouterLinkProps,
    label: String,
    icon: String,
    tag: {
      type: String,
      default: "span"
    }
  },
  emits: ["click"],
  setup(props, { slots }) {
    const { linkTag, linkAttrs, linkClass, navigateOnClick } = useRouterLink();
    const data = computed(() => {
      return {
        class: "q-breadcrumbs__el q-link flex inline items-center relative-position " + (props.disable !== true ? "q-link--focusable" + linkClass.value : "q-breadcrumbs__el--disable"),
        ...linkAttrs.value,
        onClick: navigateOnClick
      };
    });
    const iconClass = computed(
      () => "q-breadcrumbs__el-icon" + (props.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : "")
    );
    return () => {
      const child = [];
      props.icon !== void 0 && child.push(
        h(QIcon, {
          class: iconClass.value,
          name: props.icon
        })
      );
      props.label !== void 0 && child.push(props.label);
      return h(
        linkTag.value,
        { ...data.value },
        hMergeSlot(slots.default, child)
      );
    };
  }
});
const disabledValues = ["", true];
const QBreadcrumbs = createComponent({
  name: "QBreadcrumbs",
  props: {
    ...useAlignProps,
    separator: {
      type: String,
      default: "/"
    },
    separatorColor: String,
    activeColor: {
      type: String,
      default: "primary"
    },
    gutter: {
      type: String,
      validator: (v) => ["none", "xs", "sm", "md", "lg", "xl"].includes(v),
      default: "sm"
    }
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `flex items-center ${alignClass.value}${props.gutter === "none" ? "" : ` q-gutter-${props.gutter}`}`
    );
    const sepClass = computed(() => props.separatorColor ? ` text-${props.separatorColor}` : "");
    const activeClass = computed(() => ` text-${props.activeColor}`);
    return () => {
      if (slots.default === void 0) return;
      const vnodes = getNormalizedVNodes(
        hSlot(slots.default)
      );
      if (vnodes.length === 0) return;
      let els = 1;
      const child = [], len = vnodes.filter((c) => c.type?.name === "QBreadcrumbsEl").length, separator = slots.separator !== void 0 ? slots.separator : () => props.separator;
      vnodes.forEach((comp) => {
        if (comp.type?.name === "QBreadcrumbsEl") {
          const middle = els < len;
          const disabled = comp.props !== null && disabledValues.includes(comp.props.disable);
          const cls = (middle === true ? "" : " q-breadcrumbs--last") + (disabled !== true && middle === true ? activeClass.value : "");
          els++;
          child.push(
            h("div", {
              class: `flex items-center${cls}`
            }, [comp])
          );
          if (middle === true) {
            child.push(
              h("div", {
                class: "q-breadcrumbs__separator" + sepClass.value
              }, separator())
            );
          }
        } else {
          child.push(comp);
        }
      });
      return h("div", {
        class: "q-breadcrumbs"
      }, [
        h("div", { class: classes.value }, child)
      ]);
    };
  }
});
export {
  QBreadcrumbsEl as Q,
  QBreadcrumbs as a
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJyZWFkY3J1bWJzLURBRjVwd2x2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL1FCcmVhZGNydW1ic0VsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9RQnJlYWRjcnVtYnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHVzZVJvdXRlckxpbmssIHsgdXNlUm91dGVyTGlua1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utcm91dGVyLWxpbmsvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJyZWFkY3J1bWJzRWwnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdzcGFuJ1xuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGxpbmtUYWcsIGxpbmtBdHRycywgbGlua0NsYXNzLCBuYXZpZ2F0ZU9uQ2xpY2sgfSA9IHVzZVJvdXRlckxpbmsoKVxuXG4gICAgY29uc3QgZGF0YSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1ic19fZWwgcS1saW5rICdcbiAgICAgICAgICArICdmbGV4IGlubGluZSBpdGVtcy1jZW50ZXIgcmVsYXRpdmUtcG9zaXRpb24gJ1xuICAgICAgICAgICsgKHByb3BzLmRpc2FibGUgIT09IHRydWUgPyAncS1saW5rLS1mb2N1c2FibGUnICsgbGlua0NsYXNzLnZhbHVlIDogJ3EtYnJlYWRjcnVtYnNfX2VsLS1kaXNhYmxlJyksXG4gICAgICAgIC4uLmxpbmtBdHRycy52YWx1ZSxcbiAgICAgICAgb25DbGljazogbmF2aWdhdGVPbkNsaWNrXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGljb25DbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1icmVhZGNydW1ic19fZWwtaWNvbidcbiAgICAgICsgKHByb3BzLmxhYmVsICE9PSB2b2lkIDAgPyAnIHEtYnJlYWRjcnVtYnNfX2VsLWljb24tLXdpdGgtbGFiZWwnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogaWNvbkNsYXNzLnZhbHVlLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25cbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKHByb3BzLmxhYmVsKVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgeyAuLi5kYXRhLnZhbHVlIH0sXG4gICAgICAgIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgY2hpbGQpXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbGlnbiwgeyB1c2VBbGlnblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtYWxpZ24vdXNlLWFsaWduLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGdldE5vcm1hbGl6ZWRWTm9kZXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5jb25zdCBkaXNhYmxlZFZhbHVlcyA9IFsgJycsIHRydWUgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJyZWFkY3J1bWJzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMsXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcvJ1xuICAgIH0sXG4gICAgc2VwYXJhdG9yQ29sb3I6IFN0cmluZyxcblxuICAgIGFjdGl2ZUNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuXG4gICAgZ3V0dGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbm9uZScsICd4cycsICdzbScsICdtZCcsICdsZycsICd4bCcgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdzbSdcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBhbGlnbkNsYXNzID0gdXNlQWxpZ24ocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBmbGV4IGl0ZW1zLWNlbnRlciAkeyBhbGlnbkNsYXNzLnZhbHVlIH0keyBwcm9wcy5ndXR0ZXIgPT09ICdub25lJyA/ICcnIDogYCBxLWd1dHRlci0keyBwcm9wcy5ndXR0ZXIgfWAgfWBcbiAgICApXG5cbiAgICBjb25zdCBzZXBDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5zZXBhcmF0b3JDb2xvciA/IGAgdGV4dC0keyBwcm9wcy5zZXBhcmF0b3JDb2xvciB9YCA6ICcnKSlcbiAgICBjb25zdCBhY3RpdmVDbGFzcyA9IGNvbXB1dGVkKCgpID0+IGAgdGV4dC0keyBwcm9wcy5hY3RpdmVDb2xvciB9YClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoc2xvdHMuZGVmYXVsdCA9PT0gdm9pZCAwKSByZXR1cm5cblxuICAgICAgY29uc3Qgdm5vZGVzID0gZ2V0Tm9ybWFsaXplZFZOb2RlcyhcbiAgICAgICAgaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgIClcblxuICAgICAgaWYgKHZub2Rlcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gICAgICBsZXQgZWxzID0gMVxuXG4gICAgICBjb25zdFxuICAgICAgICBjaGlsZCA9IFtdLFxuICAgICAgICBsZW4gPSB2bm9kZXMuZmlsdGVyKGMgPT4gYy50eXBlPy5uYW1lID09PSAnUUJyZWFkY3J1bWJzRWwnKS5sZW5ndGgsXG4gICAgICAgIHNlcGFyYXRvciA9IHNsb3RzLnNlcGFyYXRvciAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90cy5zZXBhcmF0b3JcbiAgICAgICAgICA6ICgpID0+IHByb3BzLnNlcGFyYXRvclxuXG4gICAgICB2bm9kZXMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgaWYgKGNvbXAudHlwZT8ubmFtZSA9PT0gJ1FCcmVhZGNydW1ic0VsJykge1xuICAgICAgICAgIGNvbnN0IG1pZGRsZSA9IGVscyA8IGxlblxuICAgICAgICAgIGNvbnN0IGRpc2FibGVkID0gY29tcC5wcm9wcyAhPT0gbnVsbCAmJiBkaXNhYmxlZFZhbHVlcy5pbmNsdWRlcyhjb21wLnByb3BzLmRpc2FibGUpXG4gICAgICAgICAgY29uc3QgY2xzID0gKG1pZGRsZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLWJyZWFkY3J1bWJzLS1sYXN0JylcbiAgICAgICAgICAgICsgKGRpc2FibGVkICE9PSB0cnVlICYmIG1pZGRsZSA9PT0gdHJ1ZSA/IGFjdGl2ZUNsYXNzLnZhbHVlIDogJycpXG5cbiAgICAgICAgICBlbHMrK1xuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6IGBmbGV4IGl0ZW1zLWNlbnRlciR7IGNscyB9YFxuICAgICAgICAgICAgfSwgWyBjb21wIF0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKG1pZGRsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1ic19fc2VwYXJhdG9yJyArIHNlcENsYXNzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIHNlcGFyYXRvcigpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjaGlsZC5wdXNoKGNvbXApXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1icydcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBjaGlsZClcbiAgICAgIF0pXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsTUFBQSxpQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFFTixLQUFLO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDZjtBQUFBLEVBQ0E7QUFBQSxFQUVFLE9BQU8sQ0FBRSxPQUFPO0FBQUEsRUFFaEIsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEVBQUUsU0FBUyxXQUFXLFdBQVcsZ0JBQWUsSUFBSyxjQUFhO0FBRXhFLFVBQU0sT0FBTyxTQUFTLE1BQU07QUFDMUIsYUFBTztBQUFBLFFBQ0wsT0FBTywwRUFFRixNQUFNLFlBQVksT0FBTyxzQkFBc0IsVUFBVSxRQUFRO0FBQUEsUUFDdEUsR0FBRyxVQUFVO0FBQUEsUUFDYixTQUFTO0FBQUEsTUFDakI7QUFBQSxJQUNJLENBQUM7QUFFRCxVQUFNLFlBQVk7QUFBQSxNQUFTLE1BQ3pCLDRCQUNHLE1BQU0sVUFBVSxTQUFTLHdDQUF3QztBQUFBLElBQzFFO0FBRUksV0FBTyxNQUFNO0FBQ1gsWUFBTSxRQUFRLENBQUE7QUFFZCxZQUFNLFNBQVMsVUFBVSxNQUFNO0FBQUEsUUFDN0IsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPLFVBQVU7QUFBQSxVQUNqQixNQUFNLE1BQU07QUFBQSxRQUN0QixDQUFTO0FBQUEsTUFDVDtBQUVNLFlBQU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUs7QUFFaEQsYUFBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFFBQ1IsRUFBRSxHQUFHLEtBQUssTUFBSztBQUFBLFFBQ2YsV0FBVyxNQUFNLFNBQVMsS0FBSztBQUFBLE1BQ3ZDO0FBQUEsSUFDSTtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FDdERELE1BQU0saUJBQWlCLENBQUUsSUFBSSxJQUFJO0FBRWpDLE1BQUEsZUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDZjtBQUFBLElBQ0ksZ0JBQWdCO0FBQUEsSUFFaEIsYUFBYTtBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ2Y7QUFBQSxJQUVJLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFdBQVcsT0FBSyxDQUFFLFFBQVEsTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFPLFNBQVMsQ0FBQztBQUFBLE1BQ25FLFNBQVM7QUFBQSxJQUNmO0FBQUEsRUFDQTtBQUFBLEVBRUUsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLGFBQWEsU0FBUyxLQUFLO0FBRWpDLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIscUJBQXNCLFdBQVcsS0FBSyxHQUFLLE1BQU0sV0FBVyxTQUFTLEtBQUssYUFBYyxNQUFNLE1BQU0sRUFBRztBQUFBLElBQzdHO0FBRUksVUFBTSxXQUFXLFNBQVMsTUFBTyxNQUFNLGlCQUFpQixTQUFVLE1BQU0sbUJBQW9CLEVBQUc7QUFDL0YsVUFBTSxjQUFjLFNBQVMsTUFBTSxTQUFVLE1BQU0sYUFBYztBQUVqRSxXQUFPLE1BQU07QUFDWCxVQUFJLE1BQU0sWUFBWSxPQUFRO0FBRTlCLFlBQU0sU0FBUztBQUFBLFFBQ2IsTUFBTSxNQUFNLE9BQU87QUFBQSxNQUMzQjtBQUVNLFVBQUksT0FBTyxXQUFXLEVBQUc7QUFFekIsVUFBSSxNQUFNO0FBRVYsWUFDRSxRQUFRLENBQUEsR0FDUixNQUFNLE9BQU8sT0FBTyxPQUFLLEVBQUUsTUFBTSxTQUFTLGdCQUFnQixFQUFFLFFBQzVELFlBQVksTUFBTSxjQUFjLFNBQzVCLE1BQU0sWUFDTixNQUFNLE1BQU07QUFFbEIsYUFBTyxRQUFRLFVBQVE7QUFDckIsWUFBSSxLQUFLLE1BQU0sU0FBUyxrQkFBa0I7QUFDeEMsZ0JBQU0sU0FBUyxNQUFNO0FBQ3JCLGdCQUFNLFdBQVcsS0FBSyxVQUFVLFFBQVEsZUFBZSxTQUFTLEtBQUssTUFBTSxPQUFPO0FBQ2xGLGdCQUFNLE9BQU8sV0FBVyxPQUFPLEtBQUssMkJBQy9CLGFBQWEsUUFBUSxXQUFXLE9BQU8sWUFBWSxRQUFRO0FBRWhFO0FBRUEsZ0JBQU07QUFBQSxZQUNKLEVBQUUsT0FBTztBQUFBLGNBQ1AsT0FBTyxvQkFBcUIsR0FBRztBQUFBLFlBQzdDLEdBQWUsQ0FBRSxJQUFJLENBQUU7QUFBQSxVQUN2QjtBQUVVLGNBQUksV0FBVyxNQUFNO0FBQ25CLGtCQUFNO0FBQUEsY0FDSixFQUFFLE9BQU87QUFBQSxnQkFDUCxPQUFPLDZCQUE2QixTQUFTO0FBQUEsY0FDN0QsR0FBaUIsVUFBUyxDQUFFO0FBQUEsWUFDNUI7QUFBQSxVQUNVO0FBQUEsUUFDRixPQUNLO0FBQ0gsZ0JBQU0sS0FBSyxJQUFJO0FBQUEsUUFDakI7QUFBQSxNQUNGLENBQUM7QUFFRCxhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsT0FBTztBQUFBLE1BQ2YsR0FBUztBQUFBLFFBQ0QsRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLE1BQUssR0FBSSxLQUFLO0FBQUEsTUFDaEQsQ0FBTztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxXX0=
