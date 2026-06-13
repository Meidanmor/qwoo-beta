import { _ as _export_sfc, j as QCard, ad as QCardSection, g as QSeparator, i as QInput, Q as QBtn, q as useRoute, ag as fetchWithToken } from "./index-DDAg5YDa.js";
import { Q as QPage } from "./QPage-gc4oP7_r.js";
import { u as useQuasar } from "./use-quasar-D_HwOQSM.js";
import { o as openBlock, p as createBlock, q as withCtx, t as createVNode, s as createTextVNode, ac as toDisplayString, a9 as createBaseVNode, x as onMounted, j as ref } from "./quasar-observers-delayed-tSHCOYpR.js";
const _sfc_main = {
  __name: "ProductDetailPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const route = useRoute();
    const product = ref({});
    onMounted(fetchProduct);
    async function fetchProduct() {
      const res = await fetchWithToken(`https://nuxt.meidanm.com/wp-json/wc/v3/products/${route.params.id}`);
      product.value = await res.json();
    }
    async function updateProduct() {
      product.value.manage_stock = true;
      const res = await fetchWithToken(`https://nuxt.meidanm.com/wp-json/wc/v3/products/${route.params.id}`, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdERldGFpbFBhZ2UtV3VYckVQMEouanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9BZG1pbi9Qcm9kdWN0RGV0YWlsUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxyXG4gIDxxLXBhZ2UgY2xhc3M9XCJxLXBhLW1kXCI+XHJcbiAgICA8cS1jYXJkPlxyXG4gICAgICB7eyBwcm9kdWN0IH19XHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkVkaXQgUHJvZHVjdDoge3sgcHJvZHVjdC5uYW1lIH19PC9kaXY+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICA8cS1zZXBhcmF0b3IgLz5cclxuXHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwicHJvZHVjdC5uYW1lXCIgbGFiZWw9XCJQcm9kdWN0IE5hbWVcIiAvPlxyXG4gICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJwcm9kdWN0LnJlZ3VsYXJfcHJpY2VcIiBsYWJlbD1cIlJlZ3VsYXIgUHJpY2VcIiB0eXBlPVwibnVtYmVyXCIgLz5cclxuICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwicHJvZHVjdC5zYWxlX3ByaWNlXCIgbGFiZWw9XCJTYWxlIFByaWNlXCIgdHlwZT1cIm51bWJlclwiIC8+XHJcbiAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cInByb2R1Y3Quc3RvY2tfcXVhbnRpdHlcIiBsYWJlbD1cIlN0b2NrXCIgdHlwZT1cIm51bWJlclwiIC8+XHJcbiAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cInByb2R1Y3Quc2t1XCIgbGFiZWw9XCJTS1VcIiAvPlxyXG4gICAgICAgIDwhLS0gQWRkIG1vcmUgZmllbGRzIGFzIG5lZWRlZCAtLT5cclxuXHJcbiAgICAgICAgPHEtYnRuIGxhYmVsPVwiU2F2ZVwiIGNvbG9yPVwic2Vjb25kYXJ5XCIgQGNsaWNrPVwidXBkYXRlUHJvZHVjdFwiIGNsYXNzPVwicS1tdC1tZFwiIC8+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICA8L3EtY2FyZD5cclxuICA8L3EtcGFnZT5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInXHJcbmltcG9ydCB7IHVzZVJvdXRlIH0gZnJvbSAndnVlLXJvdXRlcidcclxuaW1wb3J0IHsgZmV0Y2hXaXRoVG9rZW4gfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdXNlQXBpRmV0Y2guanMnO1xyXG5cclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcclxuY29uc3QgcHJvZHVjdCA9IHJlZih7fSlcclxuXHJcbm9uTW91bnRlZChmZXRjaFByb2R1Y3QpXHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaFByb2R1Y3QoKSB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hXaXRoVG9rZW4oYGh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3djL3YzL3Byb2R1Y3RzLyR7cm91dGUucGFyYW1zLmlkfWApXHJcbiAgcHJvZHVjdC52YWx1ZSA9IGF3YWl0IHJlcy5qc29uKClcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlUHJvZHVjdCgpIHtcclxuICBwcm9kdWN0LnZhbHVlLm1hbmFnZV9zdG9jayA9IHRydWU7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2hXaXRoVG9rZW4oYGh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3djL3YzL3Byb2R1Y3RzLyR7cm91dGUucGFyYW1zLmlkfWAsIHtcclxuICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICB9LFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocHJvZHVjdC52YWx1ZSlcclxuICB9KVxyXG5cclxuICBpZiAocmVzLm9rKSB7XHJcbiAgICAkcS5ub3RpZnkoeyB0eXBlOiAncG9zaXRpdmUnLCBtZXNzYWdlOiAnUHJvZHVjdCB1cGRhdGVkIHN1Y2Nlc3NmdWxseSEnIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgICRxLm5vdGlmeSh7IHR5cGU6ICduZWdhdGl2ZScsIG1lc3NhZ2U6ICdVcGRhdGUgZmFpbGVkIScgfSlcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBOEJBLFVBQU0sS0FBSyxVQUFTO0FBQ3BCLFVBQU0sUUFBUSxTQUFRO0FBQ3RCLFVBQU0sVUFBVSxJQUFJLEVBQUU7QUFFdEIsY0FBVSxZQUFZO0FBRXRCLG1CQUFlLGVBQWU7QUFDNUIsWUFBTSxNQUFNLE1BQU0sZUFBZSxtREFBbUQsTUFBTSxPQUFPLEVBQUUsRUFBRTtBQUNyRyxjQUFRLFFBQVEsTUFBTSxJQUFJLEtBQUk7QUFBQSxJQUNoQztBQUVBLG1CQUFlLGdCQUFnQjtBQUM3QixjQUFRLE1BQU0sZUFBZTtBQUM3QixZQUFNLE1BQU0sTUFBTSxlQUFlLG1EQUFtRCxNQUFNLE9BQU8sRUFBRSxJQUFJO0FBQUEsUUFDckcsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ1AsZ0JBQWdCO0FBQUEsUUFDdEI7QUFBQSxRQUNJLE1BQU0sS0FBSyxVQUFVLFFBQVEsS0FBSztBQUFBLE1BQ3RDLENBQUc7QUFFRCxVQUFJLElBQUksSUFBSTtBQUNWLFdBQUcsT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLGlDQUFpQztBQUFBLE1BQzFFLE9BQU87QUFDTCxXQUFHLE9BQU8sRUFBRSxNQUFNLFlBQVksU0FBUyxrQkFBa0I7QUFBQSxNQUMzRDtBQUFBLElBQ0Y7Ozs7Ozs7Ozs7OztBQW5EYSxNQUFBLGFBQUEsRUFBQSxPQUFNLFVBQVM7O3NCQUoxQkEsWUFvQlMsT0FBQSxFQUFBLE9BQUEsYUFwQks7QUFBQSxxQkFDWixNQWtCUztBQUFBLE1BbEJUQyxZQWtCUyxPQUFBLE1BQUE7QUFBQSx5QkFqQlAsTUFBYTtBQUFBLFVBQVZDLGdCQUFBQyxnQkFBQSxPQUFBLE9BQU8sSUFBRyxLQUNiLENBQUE7QUFBQSxVQUFBRixZQUVpQixjQUFBLE1BQUE7QUFBQSw2QkFEZixNQUEyRDtBQUFBLGNBQTNERyxnQkFBMkQsT0FBM0QsWUFBcUIsbUJBQWNELGdCQUFHLE9BQUEsUUFBUSxJQUFJLEdBQUEsQ0FBQTtBQUFBOzs7VUFHcERGLFlBQWUsVUFBQTtBQUFBLFVBRWZBLFlBU2lCLGNBQUEsTUFBQTtBQUFBLDZCQVJmLE1BQXVEO0FBQUEsY0FBdkRBLFlBQXVELFFBQUE7QUFBQSxnQkFBckMsWUFBQSxPQUFBLFFBQVE7QUFBQSxnQkFBUix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxZQUFBLE9BQUEsUUFBUSxPQUFJO0FBQUEsZ0JBQUUsT0FBTTtBQUFBO2NBQ3RDQSxZQUErRSxRQUFBO0FBQUEsZ0JBQTdELFlBQUEsT0FBQSxRQUFRO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsWUFBQSxPQUFBLFFBQVEsZ0JBQWE7QUFBQSxnQkFBRSxPQUFNO0FBQUEsZ0JBQWdCLE1BQUs7QUFBQTtjQUNwRUEsWUFBeUUsUUFBQTtBQUFBLGdCQUF2RCxZQUFBLE9BQUEsUUFBUTtBQUFBLGdCQUFSLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLFlBQUEsT0FBQSxRQUFRLGFBQVU7QUFBQSxnQkFBRSxPQUFNO0FBQUEsZ0JBQWEsTUFBSztBQUFBO2NBQzlEQSxZQUF3RSxRQUFBO0FBQUEsZ0JBQXRELFlBQUEsT0FBQSxRQUFRO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsWUFBQSxPQUFBLFFBQVEsaUJBQWM7QUFBQSxnQkFBRSxPQUFNO0FBQUEsZ0JBQVEsTUFBSztBQUFBO2NBQzdEQSxZQUE2QyxRQUFBO0FBQUEsZ0JBQTNCLFlBQUEsT0FBQSxRQUFRO0FBQUEsZ0JBQVIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsWUFBQSxPQUFBLFFBQVEsTUFBRztBQUFBLGdCQUFFLE9BQU07QUFBQTtjQUdyQ0EsWUFBK0UsTUFBQTtBQUFBLGdCQUF4RSxPQUFNO0FBQUEsZ0JBQU8sT0FBTTtBQUFBLGdCQUFhLFNBQU8sT0FBQTtBQUFBLGdCQUFlLE9BQU07QUFBQTs7Ozs7Ozs7Ozs7OyJ9
