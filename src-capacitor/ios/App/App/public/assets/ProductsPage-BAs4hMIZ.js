import { Q as QTable } from "./QTable-CtwNAS5R.js";
import { Q as QPage } from "./QPage-gc4oP7_r.js";
import { _ as _export_sfc, r as useRouter, a8 as WC } from "./index-DDAg5YDa.js";
import { o as openBlock, p as createBlock, q as withCtx, t as createVNode, x as onMounted, j as ref } from "./quasar-observers-delayed-tSHCOYpR.js";
import "./QList-tQahs7qg.js";
import "./QSelect-xmC19IVN.js";
import "./QChip-CN1ZGBoZ.js";
import "./QItem-D74-s_Zr.js";
import "./QItemSection-Em5VwD4r.js";
import "./use-fullscreen-D6v2f2fY.js";
const _sfc_main = {
  __name: "ProductsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const router = useRouter();
    const products = ref([]);
    const columns = [
      { name: "id", label: "ID", field: "id" },
      { name: "name", label: "Name", field: "name" },
      { name: "price", label: "Price", field: "price" },
      { name: "stock_status", label: "Stock Status", field: "stock_status" }
    ];
    onMounted(fetchProducts);
    async function fetchProducts() {
      const res = await WC.getAdminProducts();
      const data = await res;
      products.value = data;
    }
    function goToProduct(_, row) {
      router.push(`/admin/products/${row.id}`);
    }
    const __returned__ = { router, products, columns, fetchProducts, goToProduct, ref, onMounted, get api() {
      return WC;
    }, get useRouter() {
      return useRouter;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-md" }, {
    default: withCtx(() => [
      createVNode(QTable, {
        rows: $setup.products,
        columns: $setup.columns,
        "row-key": "id",
        onRowClick: $setup.goToProduct
      }, null, 8, ["rows"])
    ]),
    _: 1
  });
}
const ProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ProductsPage.vue"]]);
export {
  ProductsPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLUJBczRoTUlaLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvQWRtaW4vUHJvZHVjdHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtcGFnZSBjbGFzcz1cInEtcGEtbWRcIj5cclxuICAgIDxxLXRhYmxlXHJcbiAgICAgIDpyb3dzPVwicHJvZHVjdHNcIlxyXG4gICAgICA6Y29sdW1ucz1cImNvbHVtbnNcIlxyXG4gICAgICByb3cta2V5PVwiaWRcIlxyXG4gICAgICBAcm93LWNsaWNrPVwiZ29Ub1Byb2R1Y3RcIlxyXG4gICAgLz5cclxuICA8L3EtcGFnZT5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgYXBpIGZyb20gJ3NyYy9ib290L3dvb2NvbW1lcmNlJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcidcclxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcclxuXHJcbmNvbnN0IHByb2R1Y3RzID0gcmVmKFtdKVxyXG5jb25zdCBjb2x1bW5zID0gW1xyXG4gIHsgbmFtZTogJ2lkJywgbGFiZWw6ICdJRCcsIGZpZWxkOiAnaWQnIH0sXHJcbiAgeyBuYW1lOiAnbmFtZScsIGxhYmVsOiAnTmFtZScsIGZpZWxkOiAnbmFtZScgfSxcclxuICB7IG5hbWU6ICdwcmljZScsIGxhYmVsOiAnUHJpY2UnLCBmaWVsZDogJ3ByaWNlJyB9LFxyXG4gIHsgbmFtZTogJ3N0b2NrX3N0YXR1cycsIGxhYmVsOiAnU3RvY2sgU3RhdHVzJywgZmllbGQ6ICdzdG9ja19zdGF0dXMnIH1cclxuXVxyXG5cclxub25Nb3VudGVkKGZldGNoUHJvZHVjdHMpXHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaFByb2R1Y3RzKCkge1xyXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5nZXRBZG1pblByb2R1Y3RzKCk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc1xyXG4gIHByb2R1Y3RzLnZhbHVlID0gZGF0YVxyXG59XHJcblxyXG5mdW5jdGlvbiBnb1RvUHJvZHVjdChfLCByb3cpIHtcclxuICByb3V0ZXIucHVzaChgL2FkbWluL3Byb2R1Y3RzLyR7cm93LmlkfWApXHJcbn1cclxuPC9zY3JpcHQ+XHJcbiJdLCJuYW1lcyI6WyJhcGkiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBZUEsVUFBTSxTQUFTLFVBQVM7QUFFeEIsVUFBTSxXQUFXLElBQUksRUFBRTtBQUN2QixVQUFNLFVBQVU7QUFBQSxNQUNkLEVBQUUsTUFBTSxNQUFNLE9BQU8sTUFBTSxPQUFPLEtBQUk7QUFBQSxNQUN0QyxFQUFFLE1BQU0sUUFBUSxPQUFPLFFBQVEsT0FBTyxPQUFNO0FBQUEsTUFDNUMsRUFBRSxNQUFNLFNBQVMsT0FBTyxTQUFTLE9BQU8sUUFBTztBQUFBLE1BQy9DLEVBQUUsTUFBTSxnQkFBZ0IsT0FBTyxnQkFBZ0IsT0FBTyxlQUFjO0FBQUEsSUFDdEU7QUFFQSxjQUFVLGFBQWE7QUFFdkIsbUJBQWUsZ0JBQWdCO0FBQzdCLFlBQU0sTUFBTSxNQUFNQSxHQUFJO0FBQ3RCLFlBQU0sT0FBTyxNQUFNO0FBQ25CLGVBQVMsUUFBUTtBQUFBLElBQ25CO0FBRUEsYUFBUyxZQUFZLEdBQUcsS0FBSztBQUMzQixhQUFPLEtBQUssbUJBQW1CLElBQUksRUFBRSxFQUFFO0FBQUEsSUFDekM7Ozs7Ozs7Ozs7O3NCQWxDRUMsWUFPUyxPQUFBLEVBQUEsT0FBQSxhQVBLO0FBQUEscUJBQ1osTUFLRTtBQUFBLE1BTEZDLFlBS0UsUUFBQTtBQUFBLFFBSkMsTUFBTSxPQUFBO0FBQUEsUUFDTixTQUFTLE9BQUE7QUFBQSxRQUNWLFdBQVE7QUFBQSxRQUNQLFlBQVcsT0FBQTtBQUFBOzs7Ozs7In0=
