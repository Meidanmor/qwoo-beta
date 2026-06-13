import { _ as _export_sfc, c as cart } from "./index-DDAg5YDa.js";
import { u as useMeta } from "./use-meta-BVxOmsjs.js";
import { k as resolveComponent, o as openBlock, m as createElementBlock, a9 as createBaseVNode, s as createTextVNode, t as createVNode, q as withCtx, aa as Fragment, ab as renderList, e as computed, ac as toDisplayString, u as createCommentVNode } from "./quasar-observers-delayed-tSHCOYpR.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  async preFetch({ ssrContext }) {
    const seo = {
      title: "Cart",
      description: "Cart page",
      robots: "noindex, follow"
    };
    if (ssrContext) {
      ssrContext.seoData = seo;
    }
  }
}, {
  __name: "CartPage",
  setup(__props, { expose: __expose }) {
    __expose();
    useMeta(() => {
      return {
        title: "Cart",
        meta: {
          robots: { name: "robots", content: "noindex, follow" },
          description: { name: "description", content: "Cart page" }
        }
      };
    });
    const cartItems = computed(() => cart.state.items);
    const __returned__ = { cartItems, get cart() {
      return cart;
    }, computed, get useMeta() {
      return useMeta;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "container q-pa-md" };
const _hoisted_2 = {
  key: 0,
  class: "empty-cart-msg"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "column" };
const _hoisted_6 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[2] || (_cache[2] = createBaseVNode("h2", null, "Your Cart", -1)),
    $setup.cartItems.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [
      _cache[1] || (_cache[1] = createTextVNode(" Your cart is empty. ", -1)),
      createVNode(_component_router_link, { to: "/products/" }, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createTextVNode("Go to shop", -1)
        ])]),
        _: 1
      })
    ])) : (openBlock(), createElementBlock("div", _hoisted_3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.cartItems, (item) => {
        return openBlock(), createElementBlock("div", {
          key: item.id,
          class: "q-mb-md row items-center"
        }, [
          createBaseVNode("img", {
            src: item.images[0]?.src,
            width: "80",
            height: "80",
            class: "q-mr-md"
          }, null, 8, _hoisted_4),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", null, toDisplayString(item.name), 1),
            item.variation && item.variation.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_6, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.variation, (variation, index) => {
                return openBlock(), createElementBlock("div", { key: index }, toDisplayString(variation.attribute) + ": " + toDisplayString(variation.value), 1);
              }), 128))
            ])) : createCommentVNode("", true),
            createBaseVNode("div", null, toDisplayString(item.price) + " × " + toDisplayString(item.qty), 1)
          ])
        ]);
      }), 128))
    ]))
  ]);
}
const CartPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d1289879"], ["__file", "CartPage.vue"]]);
export {
  CartPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FydFBhZ2UtM1NIakppWHkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9DYXJ0UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXIgcS1wYS1tZFwiPlxyXG4gICAgPGgyPllvdXIgQ2FydDwvaDI+XHJcbiAgICA8ZGl2IHYtaWY9XCJjYXJ0SXRlbXMubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJlbXB0eS1jYXJ0LW1zZ1wiPlxyXG4gICAgICBZb3VyIGNhcnQgaXMgZW1wdHkuIDxyb3V0ZXItbGluayB0bz1cIi9wcm9kdWN0cy9cIj5HbyB0byBzaG9wPC9yb3V0ZXItbGluaz5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiB2LWVsc2U+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICB2LWZvcj1cIml0ZW0gaW4gY2FydEl0ZW1zXCJcclxuICAgICAgICA6a2V5PVwiaXRlbS5pZFwiXHJcbiAgICAgICAgY2xhc3M9XCJxLW1iLW1kIHJvdyBpdGVtcy1jZW50ZXJcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGltZyA6c3JjPVwiaXRlbS5pbWFnZXNbMF0/LnNyY1wiIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIGNsYXNzPVwicS1tci1tZFwiIC8+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPlxyXG4gICAgICAgICAgPGRpdj57eyBpdGVtLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cIml0ZW0udmFyaWF0aW9uICYmIGl0ZW0udmFyaWF0aW9uLmxlbmd0aCA+IDBcIj5cclxuICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgIHYtZm9yPVwiKHZhcmlhdGlvbiwgaW5kZXgpIGluIGl0ZW0udmFyaWF0aW9uXCJcclxuICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICB7e3ZhcmlhdGlvbi5hdHRyaWJ1dGV9fToge3t2YXJpYXRpb24udmFsdWV9fVxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+e3sgaXRlbS5wcmljZSB9fSDDlyB7eyBpdGVtLnF0eSB9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQnO1xyXG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSc7XHJcbmltcG9ydCB7IHVzZU1ldGEgfSBmcm9tICdxdWFzYXInO1xyXG5kZWZpbmVPcHRpb25zKHtcclxuICBhc3luYyBwcmVGZXRjaCAoeyBzc3JDb250ZXh0IH0pIHtcclxuICAgIC8vY29uc3Qgc2VvID0gYXdhaXQgZmV0Y2hTZW9Gb3JQYXRoKCdjaGVja291dCcpXHJcbiAgICBjb25zdCBzZW8gPSB7XHJcbiAgICAgIHRpdGxlOiAnQ2FydCcsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2FydCBwYWdlJyxcclxuICAgICAgcm9ib3RzOiAnbm9pbmRleCwgZm9sbG93J1xyXG4gICAgfVxyXG4gICAgaWYgKHNzckNvbnRleHQpIHtcclxuICAgICAgc3NyQ29udGV4dC5zZW9EYXRhID0gc2VvXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG51c2VNZXRhKCgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGU6ICdDYXJ0JyxcclxuICAgIG1ldGE6IHtcclxuICAgICAgcm9ib3RzOiB7bmFtZTogJ3JvYm90cycsIGNvbnRlbnQ6ICdub2luZGV4LCBmb2xsb3cnfSxcclxuICAgICAgZGVzY3JpcHRpb246IHtuYW1lOiAnZGVzY3JpcHRpb24nLCBjb250ZW50OiAnQ2FydCBwYWdlJ30sXHJcbiAgICB9XHJcbiAgfTtcclxufSk7XHJcblxyXG5cclxuY29uc3QgY2FydEl0ZW1zID0gY29tcHV0ZWQoKCkgPT4gY2FydC5zdGF0ZS5pdGVtcyk7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLmVtcHR5LWNhcnQtbXNnIHtcclxuICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcbi5lbXB0eS1jYXJ0LW1zZyBhIHtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl90b0Rpc3BsYXlTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStDQSxZQUFRLE1BQU07QUFDWixhQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsVUFDSixRQUFRLEVBQUMsTUFBTSxVQUFVLFNBQVMsa0JBQWlCO0FBQUEsVUFDbkQsYUFBYSxFQUFDLE1BQU0sZUFBZSxTQUFTLFlBQVc7QUFBQSxRQUM3RDtBQUFBLE1BQ0E7QUFBQSxJQUNBLENBQUM7QUFHRCxVQUFNLFlBQVksU0FBUyxNQUFNLEtBQUssTUFBTSxLQUFLOzs7Ozs7Ozs7O0FBekQxQyxNQUFBLGFBQUEsRUFBQSxPQUFNLG9CQUFtQjs7O0VBRU8sT0FBTTs7OztBQVVoQyxNQUFBLGFBQUEsRUFBQSxPQUFNLFNBQVE7Ozs7QUFaekIsU0FBQUEsVUFBQSxHQUFBQyxtQkEwQlEsT0ExQlIsWUEwQlE7QUFBQSxJQXpCTixPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUMsZ0JBQWtCLFlBQWQsYUFBUyxFQUFBO0FBQUEsSUFDRixPQUFBLFVBQVUsV0FBTSxLQUEzQkYsYUFBQUMsbUJBRU0sT0FGTixZQUVNO0FBQUEsZ0RBRm9ELHlCQUNwQyxFQUFBO0FBQUEsTUFBQUUsWUFBcUQsd0JBQUEsRUFBeEMsSUFBRyxhQUFZLEdBQUE7QUFBQSx5QkFBQyxNQUFVLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLDBCQUFWLGNBQVUsRUFBQTtBQUFBOzs7d0JBRTdERixtQkFvQk0sT0FBQSxZQUFBO0FBQUEsd0JBbkJKQSxtQkFrQk1HLFVBQUEsTUFBQUMsV0FqQlcsT0FBQSxXQUFTLENBQWpCLFNBQUk7NEJBRGJKLG1CQWtCTSxPQUFBO0FBQUEsVUFoQkgsS0FBSyxLQUFLO0FBQUEsVUFDWCxPQUFNO0FBQUE7VUFFTkMsZ0JBQXlFLE9BQUE7QUFBQSxZQUFuRSxLQUFLLEtBQUssV0FBVztBQUFBLFlBQUssT0FBTTtBQUFBLFlBQUssUUFBTztBQUFBLFlBQUssT0FBTTtBQUFBO1VBQzdEQSxnQkFXTSxPQVhOLFlBV007QUFBQSxZQVZKQSxnQkFBMEIsT0FBQSxNQUFBSSxnQkFBbEIsS0FBSyxJQUFJLEdBQUEsQ0FBQTtBQUFBLFlBQ04sS0FBSyxhQUFhLEtBQUssVUFBVSxTQUFNLGtCQUFsREwsbUJBT00sT0FBQSxZQUFBO0FBQUEsZUFOSEQsVUFBQSxJQUFBLEdBQUFDLG1CQUtNRywyQkFKdUIsS0FBSyxXQUFTLENBQW5DLFdBQVcsVUFBSztBQUR4Qix1QkFBQUosVUFBQSxHQUFBQyxtQkFLTSxPQUFBLEVBSEwsS0FBSyxTQUFLSyxnQkFFVCxVQUFVLFNBQVMsSUFBRSxPQUFFQSxnQkFBRSxVQUFVLEtBQUssR0FBQSxDQUFBO0FBQUE7O1lBRzdDSixnQkFBNEMsT0FBQSxNQUFBSSxnQkFBcEMsS0FBSyxLQUFLLElBQUcsUUFBR0EsZ0JBQUcsS0FBSyxHQUFHLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7OyJ9
