import { _ as _export_sfc, p as openBlock, q as createBlock, t as withCtx, z as createVNode, P as QCard, a1 as createTextVNode, B as toDisplayString, aJ as QCardSection, v as createBaseVNode, M as QSeparator, N as QInput, Q as QBtn, a7 as useQuasar, a8 as useRoute, D as onMounted, aM as fetchWithToken, r as ref } from "./index-B4eBuDfB.js";
import { Q as QPage } from "./QPage-D2VeswGg.js";
const _sfc_main = {
  __name: "ProductDetailPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const route = useRoute();
    const product = ref({});
    onMounted(fetchProduct);
    async function fetchProduct() {
      const res = await fetchWithToken(`${"https://nuxt.meidanm.com"}/wp-json/wc/v3/products/${route.params.id}`);
      product.value = await res.json();
    }
    async function updateProduct() {
      product.value.manage_stock = true;
      const res = await fetchWithToken(`${"https://nuxt.meidanm.com"}/wp-json/wc/v3/products/${route.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product.value)
      });
      if (res.ok) {
        $q.notify({ type: "positive", message: "Product updated successfully!" });
      } else {
        $q.notify({ type: "negative", message: "Update failed!" });
      }
    }
    const __returned__ = { $q, route, product, fetchProduct, updateProduct, ref, onMounted, get useQuasar() {
      return useQuasar;
    }, get useRoute() {
      return useRoute;
    }, get fetchWithToken() {
      return fetchWithToken;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "text-h6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-md" }, {
    default: withCtx(() => [
      createVNode(QCard, null, {
        default: withCtx(() => [
          createTextVNode(toDisplayString($setup.product) + " ", 1),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, "Edit Product: " + toDisplayString($setup.product.name), 1)
            ]),
            _: 1
          }),
          createVNode(QSeparator),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QInput, {
                modelValue: $setup.product.name,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.product.name = $event),
                label: "Product Name"
              }, null, 8, ["modelValue"]),
              createVNode(QInput, {
                modelValue: $setup.product.regular_price,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.product.regular_price = $event),
                label: "Regular Price",
                type: "number"
              }, null, 8, ["modelValue"]),
              createVNode(QInput, {
                modelValue: $setup.product.sale_price,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.product.sale_price = $event),
                label: "Sale Price",
                type: "number"
              }, null, 8, ["modelValue"]),
              createVNode(QInput, {
                modelValue: $setup.product.stock_quantity,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.product.stock_quantity = $event),
                label: "Stock",
                type: "number"
              }, null, 8, ["modelValue"]),
              createVNode(QInput, {
                modelValue: $setup.product.sku,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.product.sku = $event),
                label: "SKU"
              }, null, 8, ["modelValue"]),
              createVNode(QBtn, {
                label: "Save",
                color: "secondary",
                onClick: $setup.updateProduct,
                class: "q-mt-md"
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ProductDetailPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ProductDetailPage.vue"]]);
export {
  ProductDetailPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdERldGFpbFBhZ2UtZkxlMmU3RmQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9BZG1pbi9Qcm9kdWN0RGV0YWlsUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxxLXBhZ2UgY2xhc3M9XCJxLXBhLW1kXCI+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICB7eyBwcm9kdWN0IH19XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkVkaXQgUHJvZHVjdDoge3sgcHJvZHVjdC5uYW1lIH19PC9kaXY+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1zZXBhcmF0b3IgLz5cclxuXHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwicHJvZHVjdC5uYW1lXCIgbGFiZWw9XCJQcm9kdWN0IE5hbWVcIiAvPlxyXG4gICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJwcm9kdWN0LnJlZ3VsYXJfcHJpY2VcIiBsYWJlbD1cIlJlZ3VsYXIgUHJpY2VcIiB0eXBlPVwibnVtYmVyXCIgLz5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwicHJvZHVjdC5zYWxlX3ByaWNlXCIgbGFiZWw9XCJTYWxlIFByaWNlXCIgdHlwZT1cIm51bWJlclwiIC8+XHJcbiAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cInByb2R1Y3Quc3RvY2tfcXVhbnRpdHlcIiBsYWJlbD1cIlN0b2NrXCIgdHlwZT1cIm51bWJlclwiIC8+XHJcbiAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cInByb2R1Y3Quc2t1XCIgbGFiZWw9XCJTS1VcIiAvPlxyXG4gICAgICAgIDwhLS0gQWRkIG1vcmUgZmllbGRzIGFzIG5lZWRlZCAtLT5cclxuXHJcbiAgICAgICAgPHEtYnRuIGxhYmVsPVwiU2F2ZVwiIGNvbG9yPVwic2Vjb25kYXJ5XCIgQGNsaWNrPVwidXBkYXRlUHJvZHVjdFwiIGNsYXNzPVwicS1tdC1tZFwiIC8+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtcGFnZT5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInXHJcbmltcG9ydCB7IHVzZVJvdXRlIH0gZnJvbSAndnVlLXJvdXRlcidcclxuaW1wb3J0IHsgZmV0Y2hXaXRoVG9rZW4gfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdXNlQXBpRmV0Y2guanMnO1xyXG5cclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcclxuY29uc3QgcHJvZHVjdCA9IHJlZih7fSlcclxuXHJcbm9uTW91bnRlZChmZXRjaFByb2R1Y3QpXHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaFByb2R1Y3QoKSB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hXaXRoVG9rZW4oYCR7aW1wb3J0Lm1ldGEuZW52LlZJVEVfQVBJX0JBU0V9L3dwLWpzb24vd2MvdjMvcHJvZHVjdHMvJHtyb3V0ZS5wYXJhbXMuaWR9YClcclxuICBwcm9kdWN0LnZhbHVlID0gYXdhaXQgcmVzLmpzb24oKVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9kdWN0KCkge1xyXG4gIHByb2R1Y3QudmFsdWUubWFuYWdlX3N0b2NrID0gdHJ1ZTtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaFdpdGhUb2tlbihgJHtpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRX0vd3AtanNvbi93Yy92My9wcm9kdWN0cy8ke3JvdXRlLnBhcmFtcy5pZH1gLCB7XHJcbiAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgfSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHByb2R1Y3QudmFsdWUpXHJcbiAgfSlcclxuXHJcbiAgaWYgKHJlcy5vaykge1xyXG4gICAgJHEubm90aWZ5KHsgdHlwZTogJ3Bvc2l0aXZlJywgbWVzc2FnZTogJ1Byb2R1Y3QgdXBkYXRlZCBzdWNjZXNzZnVsbHkhJyB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICAkcS5ub3RpZnkoeyB0eXBlOiAnbmVnYXRpdmUnLCBtZXNzYWdlOiAnVXBkYXRlIGZhaWxlZCEnIH0pXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUE4QkEsVUFBTSxLQUFLLFVBQUE7QUFDWCxVQUFNLFFBQVEsU0FBQTtBQUNkLFVBQU0sVUFBVSxJQUFJLEVBQUU7QUFFdEIsY0FBVSxZQUFZO0FBRXRCLG1CQUFlLGVBQWU7QUFDNUIsWUFBTSxNQUFNLE1BQU0sZUFBZSxHQUFHLDBCQUE2QiwyQkFBMkIsTUFBTSxPQUFPLEVBQUUsRUFBRTtBQUM3RyxjQUFRLFFBQVEsTUFBTSxJQUFJLEtBQUE7QUFBQSxJQUM1QjtBQUVBLG1CQUFlLGdCQUFnQjtBQUM3QixjQUFRLE1BQU0sZUFBZTtBQUM3QixZQUFNLE1BQU0sTUFBTSxlQUFlLEdBQUcsMEJBQTZCLDJCQUEyQixNQUFNLE9BQU8sRUFBRSxJQUFJO0FBQUEsUUFDN0csUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ1AsZ0JBQWdCO0FBQUEsUUFBQTtBQUFBLFFBRWxCLE1BQU0sS0FBSyxVQUFVLFFBQVEsS0FBSztBQUFBLE1BQUEsQ0FDbkM7QUFFRCxVQUFJLElBQUksSUFBSTtBQUNWLFdBQUcsT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLGlDQUFpQztBQUFBLE1BQzFFLE9BQU87QUFDTCxXQUFHLE9BQU8sRUFBRSxNQUFNLFlBQVksU0FBUyxrQkFBa0I7QUFBQSxNQUMzRDtBQUFBLElBQ0Y7Ozs7Ozs7Ozs7OztBQW5EYSxNQUFBLGFBQUEsRUFBQSxPQUFNLFVBQUE7O3NCQUpqQkEsWUFvQlMsT0FBQSxFQUFBLE9BQUEsYUFwQks7QUFBQSxxQkFDWixNQWtCUztBQUFBLE1BbEJUQyxZQWtCUyxPQUFBLE1BQUE7QUFBQSx5QkFqQlAsTUFBYTtBQUFBLFVBQVZDLGdCQUFBQyxnQkFBQSxPQUFBLE9BQU8sSUFBRyxLQUNiLENBQUE7QUFBQSxVQUFBRixZQUVpQixjQUFBLE1BQUE7QUFBQSw2QkFEZixNQUEyRDtBQUFBLGNBQTNERyxnQkFBMkQsT0FBM0QsWUFBcUIsbUJBQWNELGdCQUFHLE9BQUEsUUFBUSxJQUFJLEdBQUEsQ0FBQTtBQUFBLFlBQUE7OztVQUdwREYsWUFBZSxVQUFBO0FBQUEsVUFFZkEsWUFTaUIsY0FBQSxNQUFBO0FBQUEsNkJBUmYsTUFBdUQ7QUFBQSxjQUF2REEsWUFBdUQsUUFBQTtBQUFBLGdCQUFyQyxZQUFBLE9BQUEsUUFBUTtBQUFBLGdCQUFSLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxPQUFBLFFBQVEsT0FBSTtBQUFBLGdCQUFFLE9BQU07QUFBQSxjQUFBO2NBQ3RDQSxZQUErRSxRQUFBO0FBQUEsZ0JBQTdELFlBQUEsT0FBQSxRQUFRO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLE9BQUEsUUFBUSxnQkFBYTtBQUFBLGdCQUFFLE9BQU07QUFBQSxnQkFBZ0IsTUFBSztBQUFBLGNBQUE7Y0FDcEVBLFlBQXlFLFFBQUE7QUFBQSxnQkFBdkQsWUFBQSxPQUFBLFFBQVE7QUFBQSxnQkFBUix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsT0FBQSxRQUFRLGFBQVU7QUFBQSxnQkFBRSxPQUFNO0FBQUEsZ0JBQWEsTUFBSztBQUFBLGNBQUE7Y0FDOURBLFlBQXdFLFFBQUE7QUFBQSxnQkFBdEQsWUFBQSxPQUFBLFFBQVE7QUFBQSxnQkFBUix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsT0FBQSxRQUFRLGlCQUFjO0FBQUEsZ0JBQUUsT0FBTTtBQUFBLGdCQUFRLE1BQUs7QUFBQSxjQUFBO2NBQzdEQSxZQUE2QyxRQUFBO0FBQUEsZ0JBQTNCLFlBQUEsT0FBQSxRQUFRO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLE9BQUEsUUFBUSxNQUFHO0FBQUEsZ0JBQUUsT0FBTTtBQUFBLGNBQUE7Y0FHckNBLFlBQStFLE1BQUE7QUFBQSxnQkFBeEUsT0FBTTtBQUFBLGdCQUFPLE9BQU07QUFBQSxnQkFBYSxTQUFPLE9BQUE7QUFBQSxnQkFBZSxPQUFNO0FBQUEsY0FBQTs7Ozs7Ozs7Ozs7OyJ9
