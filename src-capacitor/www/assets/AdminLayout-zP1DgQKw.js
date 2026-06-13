import { a as QHeader, b as QToolbar, c as QToolbarTitle, d as QDrawer, e as QPageContainer, f as QLayout } from "./QLayout-CDqCAJus.js";
import { _ as _export_sfc, n as resolveComponent, p as openBlock, q as createBlock, t as withCtx, z as createVNode, a1 as createTextVNode, a2 as QItem } from "./index-B4eBuDfB.js";
import QList from "./QList-BNLb0vFw.js";
import "./QResizeObserver-B90vPzSX.js";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lHh Lpr lFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, { elevated: "" }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QToolbarTitle, null, {
                default: withCtx(() => [..._cache[0] || (_cache[0] = [
                  createTextVNode("Admin Panel", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        "show-if-above": "",
        side: "left",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(QList, null, {
            default: withCtx(() => [
              createVNode(QItem, {
                to: "/admin",
                clickable: ""
              }, {
                default: withCtx(() => [..._cache[1] || (_cache[1] = [
                  createTextVNode("Dashboard", -1)
                ])]),
                _: 1
              }),
              createVNode(QItem, {
                to: "/admin/products",
                clickable: ""
              }, {
                default: withCtx(() => [..._cache[2] || (_cache[2] = [
                  createTextVNode("Manage Products", -1)
                ])]),
                _: 1
              }),
              createVNode(QItem, {
                to: "/admin/orders",
                clickable: ""
              }, {
                default: withCtx(() => [..._cache[3] || (_cache[3] = [
                  createTextVNode("Manage Orders", -1)
                ])]),
                _: 1
              }),
              createVNode(QItem, {
                to: "/admin/stats",
                clickable: ""
              }, {
                default: withCtx(() => [..._cache[4] || (_cache[4] = [
                  createTextVNode("Statistics", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "AdminLayout.vue"]]);
export {
  AdminLayout as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5MYXlvdXQtelAxRGdRS3cuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXRzL0FkbWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtbGF5b3V0IHZpZXc9XCJsSGggTHByIGxGZlwiPlxyXG4gICAgPHEtaGVhZGVyIGVsZXZhdGVkPlxyXG4gICAgICA8cS10b29sYmFyPlxyXG4gICAgICAgIDxxLXRvb2xiYXItdGl0bGU+QWRtaW4gUGFuZWw8L3EtdG9vbGJhci10aXRsZT5cclxuICAgICAgPC9xLXRvb2xiYXI+XHJcbiAgICA8L3EtaGVhZGVyPlxyXG5cclxuICAgIDxxLWRyYXdlciBzaG93LWlmLWFib3ZlIHNpZGU9XCJsZWZ0XCIgYm9yZGVyZWQ+XHJcbiAgICAgIDxxLWxpc3Q+XHJcbiAgICAgICAgPHEtaXRlbSB0bz1cIi9hZG1pblwiIGNsaWNrYWJsZT5EYXNoYm9hcmQ8L3EtaXRlbT5cclxuICAgICAgICA8cS1pdGVtIHRvPVwiL2FkbWluL3Byb2R1Y3RzXCIgY2xpY2thYmxlPk1hbmFnZSBQcm9kdWN0czwvcS1pdGVtPlxyXG4gICAgICAgIDxxLWl0ZW0gdG89XCIvYWRtaW4vb3JkZXJzXCIgY2xpY2thYmxlPk1hbmFnZSBPcmRlcnM8L3EtaXRlbT5cclxuICAgICAgICA8cS1pdGVtIHRvPVwiL2FkbWluL3N0YXRzXCIgY2xpY2thYmxlPlN0YXRpc3RpY3M8L3EtaXRlbT5cclxuICAgICAgPC9xLWxpc3Q+XHJcbiAgICA8L3EtZHJhd2VyPlxyXG5cclxuICAgIDxxLXBhZ2UtY29udGFpbmVyPlxyXG4gICAgICA8cm91dGVyLXZpZXcgLz5cclxuICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cclxuICA8L3EtbGF5b3V0PlxyXG48L3RlbXBsYXRlPlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O3NCQUNFQSxZQW1CVyxTQUFBLEVBQUEsTUFBQSxpQkFuQkk7QUFBQSxxQkFDYixNQUlXO0FBQUEsTUFKWEMsWUFJVyxTQUFBLEVBQUEsVUFBQSxHQUpELEdBQUE7QUFBQSx5QkFDUixNQUVZO0FBQUEsVUFGWkEsWUFFWSxVQUFBLE1BQUE7QUFBQSw2QkFEVixNQUE4QztBQUFBLGNBQTlDQSxZQUE4QyxlQUFBLE1BQUE7QUFBQSxpQ0FBN0IsTUFBVyxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxrQ0FBWCxlQUFXLEVBQUE7QUFBQTs7Ozs7Ozs7O01BSWhDQSxZQU9XLFNBQUE7QUFBQSxRQVBELGlCQUFBO0FBQUEsUUFBYyxNQUFLO0FBQUEsUUFBTyxVQUFBO0FBQUE7eUJBQ2xDLE1BS1M7QUFBQSxVQUxUQSxZQUtTLE9BQUEsTUFBQTtBQUFBLDZCQUpQLE1BQWdEO0FBQUEsY0FBaERBLFlBQWdELE9BQUE7QUFBQSxnQkFBeEMsSUFBRztBQUFBLGdCQUFTLFdBQUE7QUFBQTtpQ0FBVSxNQUFTLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLGtDQUFULGFBQVMsRUFBQTtBQUFBOzs7Y0FDdkNBLFlBQStELE9BQUE7QUFBQSxnQkFBdkQsSUFBRztBQUFBLGdCQUFrQixXQUFBO0FBQUE7aUNBQVUsTUFBZSxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxrQ0FBZixtQkFBZSxFQUFBO0FBQUE7OztjQUN0REEsWUFBMkQsT0FBQTtBQUFBLGdCQUFuRCxJQUFHO0FBQUEsZ0JBQWdCLFdBQUE7QUFBQTtpQ0FBVSxNQUFhLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLGtDQUFiLGlCQUFhLEVBQUE7QUFBQTs7O2NBQ2xEQSxZQUF1RCxPQUFBO0FBQUEsZ0JBQS9DLElBQUc7QUFBQSxnQkFBZSxXQUFBO0FBQUE7aUNBQVUsTUFBVSxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxrQ0FBVixjQUFVLEVBQUE7QUFBQTs7Ozs7Ozs7O01BSWxEQSxZQUVtQixnQkFBQSxNQUFBO0FBQUEseUJBRGpCLE1BQWU7QUFBQSxVQUFmQSxZQUFlLHNCQUFBO0FBQUE7Ozs7Ozs7OyJ9
