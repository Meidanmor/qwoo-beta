import { _ as _export_sfc, j as QCard, ad as QCardSection, g as QSeparator, a2 as QSpinner, q as useRoute, ag as fetchWithToken } from "./index-DDAg5YDa.js";
import { Q as QImg } from "./QImg-BSHjw5MV.js";
import { Q as QTd } from "./QTd-YwsrG3No.js";
import { Q as QTable } from "./QTable-CtwNAS5R.js";
import { Q as QPage } from "./QPage-gc4oP7_r.js";
import { o as openBlock, p as createBlock, q as withCtx, a9 as createBaseVNode, m as createElementBlock, s as createTextVNode, ac as toDisplayString, t as createVNode, x as onMounted, j as ref } from "./quasar-observers-delayed-tSHCOYpR.js";
import "./QList-tQahs7qg.js";
import "./QSelect-xmC19IVN.js";
import "./QChip-CN1ZGBoZ.js";
import "./QItem-D74-s_Zr.js";
import "./QItemSection-Em5VwD4r.js";
import "./use-fullscreen-D6v2f2fY.js";
const _sfc_main = {
  __name: "ThankYouPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const route = useRoute();
    const order = ref(null);
    const columns = [
      { name: "thumbnail", label: "", align: "left", field: "thumbnail" },
      { name: "name", label: "Product", align: "left", field: "name" },
      { name: "quantity", label: "Qty", align: "center", field: "quantity" },
      { name: "total", label: "Total", align: "right", field: "total" }
    ];
    function formatCurrency(amountStr, {
      minorUnit = 2,
      decimalSeparator = ".",
      prefix = "$",
      suffix = ""
    } = {}) {
      const amount = parseInt(amountStr, 10);
      if (isNaN(amount)) return `${prefix}0${decimalSeparator}${"0".repeat(minorUnit)}${suffix}`;
      const factor = Math.pow(10, minorUnit);
      const number = amount / factor;
      return `${number.toLocaleString(void 0, {
        minimumFractionDigits: minorUnit,
        maximumFractionDigits: minorUnit
      })}${suffix}${prefix}`;
    }
    onMounted(async () => {
      const orderID = route.query.orderId;
      const email = route.query.billing_email;
      const order_key = route.query.order_key;
      try {
        const res = await fetchWithToken(
          `https://nuxt.meidanm.com/wp-json/wc/store/v1/order/${orderID}?key=${order_key}&billing_email=${email}`,
          { credentials: "include" }
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch order: ${res.status}`);
        }
        const data = await res.json();
        order.value = data;
        console.log(order.value);
      } catch (err) {
        console.error(err);
      }
    });
    const __returned__ = { route, order, columns, formatCurrency, ref, onMounted, get useRoute() {
      return useRoute;
    }, get fetchWithToken() {
      return fetchWithToken;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "container" };
const _hoisted_2 = {
  key: 0,
  class: "q-gutter-md"
};
const _hoisted_3 = { class: "text-subtitle1 text-center" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { style: { "text-decoration": "line-through" } };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = {
  key: 1,
  class: "text-center q-my-xl"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-md" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        $setup.order ? (openBlock(), createElementBlock("div", _hoisted_2, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-h4 text-center" }, "Thank you!", -1)),
          createBaseVNode("div", _hoisted_3, [
            createTextVNode(" Hey " + toDisplayString($setup.order.billing_address.first_name) + ". Your order is being processed and will get to you soon! Please check your email inbox at ", 1),
            createBaseVNode("strong", null, toDisplayString($setup.order.billing_address.email), 1),
            _cache[0] || (_cache[0] = createTextVNode(" for more details. ", -1))
          ]),
          createVNode(QCard, null, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[6] || (_cache[6] = createBaseVNode("div", { class: "text-h6" }, "Order Summary", -1)),
                  createVNode(QSeparator, { class: "q-my-sm" }),
                  createBaseVNode("div", null, [
                    _cache[1] || (_cache[1] = createBaseVNode("strong", null, "Order Number:", -1)),
                    createTextVNode(" " + toDisplayString($setup.order.id), 1)
                  ]),
                  $setup.order.totals.total_items === 0 || $setup.order.totals.total_items !== $setup.order.totals.subtotal ? (openBlock(), createElementBlock("div", _hoisted_4, [
                    _cache[2] || (_cache[2] = createBaseVNode("strong", null, "Subtotal:", -1)),
                    createBaseVNode("span", _hoisted_5, toDisplayString($setup.formatCurrency($setup.order.totals.subtotal, {
                      minorUnit: parseInt($setup.order.totals.currency_minor_unit),
                      symbol: $setup.order.totals.currency_symbol,
                      prefix: $setup.order.totals.currency_prefix,
                      suffix: $setup.order.totals.currency_suffix,
                      decimalSeparator: $setup.order.totals.currency_decimal_separator,
                      thousandSeparator: $setup.order.totals.currency_thousand_separator
                    })), 1),
                    createTextVNode(" " + toDisplayString($setup.formatCurrency($setup.order.totals.total_items, {
                      minorUnit: parseInt($setup.order.totals.currency_minor_unit),
                      symbol: $setup.order.totals.currency_symbol,
                      prefix: $setup.order.totals.currency_prefix,
                      suffix: $setup.order.totals.currency_suffix,
                      decimalSeparator: $setup.order.totals.currency_decimal_separator,
                      thousandSeparator: $setup.order.totals.currency_thousand_separator
                    })), 1)
                  ])) : (openBlock(), createElementBlock("div", _hoisted_6, [
                    _cache[3] || (_cache[3] = createBaseVNode("strong", null, "Subtotal:", -1)),
                    createTextVNode(" " + toDisplayString($setup.formatCurrency($setup.order.totals.subtotal, {
                      minorUnit: parseInt($setup.order.totals.currency_minor_unit),
                      symbol: $setup.order.totals.currency_symbol,
                      prefix: $setup.order.totals.currency_prefix,
                      suffix: $setup.order.totals.currency_suffix,
                      decimalSeparator: $setup.order.totals.currency_decimal_separator,
                      thousandSeparator: $setup.order.totals.currency_thousand_separator
                    })), 1)
                  ])),
                  createBaseVNode("div", null, [
                    _cache[4] || (_cache[4] = createBaseVNode("strong", null, "Shipping:", -1)),
                    createTextVNode(" " + toDisplayString($setup.formatCurrency($setup.order.totals.total_shipping, {
                      minorUnit: parseInt($setup.order.totals.currency_minor_unit),
                      symbol: $setup.order.totals.currency_symbol,
                      prefix: $setup.order.totals.currency_prefix,
                      suffix: $setup.order.totals.currency_suffix,
                      decimalSeparator: $setup.order.totals.currency_decimal_separator,
                      thousandSeparator: $setup.order.totals.currency_thousand_separator
                    })), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[5] || (_cache[5] = createBaseVNode("strong", null, "Total:", -1)),
                    createTextVNode(" " + toDisplayString($setup.formatCurrency($setup.order.totals.total_price, {
                      minorUnit: parseInt($setup.order.totals.currency_minor_unit),
                      symbol: $setup.order.totals.currency_symbol,
                      prefix: $setup.order.totals.currency_prefix,
                      suffix: $setup.order.totals.currency_suffix,
                      decimalSeparator: $setup.order.totals.currency_decimal_separator,
                      thousandSeparator: $setup.order.totals.currency_thousand_separator
                    })), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-h6 q-mb-md" }, "Products", -1)),
                  createVNode(QTable, {
                    rows: $setup.order.items,
                    columns: $setup.columns,
                    flat: "",
                    dense: "",
                    "row-key": "id",
                    "hide-bottom": ""
                  }, {
                    "body-cell-thumbnail": withCtx((props) => [
                      createVNode(QTd, null, {
                        default: withCtx(() => [
                          createVNode(QImg, {
                            src: props.row.images?.[0]?.src,
                            style: { "width": "100px", "height": "100px" },
                            "spinner-color": "grey-5",
                            alt: props.row.name
                          }, null, 8, ["src", "alt"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    "body-cell-total": withCtx((props) => [
                      createVNode(QTd, { align: "right" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($setup.formatCurrency(props.row.totals?.line_total, {
                            minorUnit: parseInt($setup.order.totals.currency_minor_unit),
                            symbol: $setup.order.totals.currency_symbol,
                            prefix: $setup.order.totals.currency_prefix,
                            suffix: $setup.order.totals.currency_suffix,
                            decimalSeparator: $setup.order.totals.currency_decimal_separator,
                            thousandSeparator: $setup.order.totals.currency_thousand_separator
                          })), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
          createVNode(QSpinner, {
            color: "secondary",
            size: "lg"
          }),
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "q-mt-md" }, "Loading your order...", -1))
        ]))
      ])
    ]),
    _: 1
  });
}
const ThankYouPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ThankYouPage.vue"]]);
export {
  ThankYouPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGhhbmtZb3VQYWdlLWhSRkdRUTYwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvVGhhbmtZb3VQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtcGFnZSBjbGFzcz1cInEtcGEtbWRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPGRpdiB2LWlmPVwib3JkZXJcIiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDQgdGV4dC1jZW50ZXJcIj5UaGFuayB5b3UhPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICBIZXkge3sgb3JkZXIuYmlsbGluZ19hZGRyZXNzLmZpcnN0X25hbWUgfX0uIFlvdXIgb3JkZXIgaXMgYmVpbmcgcHJvY2Vzc2VkIGFuZCB3aWxsIGdldCB0byB5b3Ugc29vbiFcclxuICAgICAgICAgIFBsZWFzZSBjaGVjayB5b3VyIGVtYWlsIGluYm94IGF0IDxzdHJvbmc+e3sgb3JkZXIuYmlsbGluZ19hZGRyZXNzLmVtYWlsIH19PC9zdHJvbmc+IGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxxLWNhcmQ+XHJcbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+T3JkZXIgU3VtbWFyeTwvZGl2PlxyXG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW15LXNtXCIvPlxyXG4gICAgICAgICAgICA8ZGl2PjxzdHJvbmc+T3JkZXIgTnVtYmVyOjwvc3Ryb25nPiB7eyBvcmRlci5pZCB9fTwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiB2LWlmPVwib3JkZXIudG90YWxzLnRvdGFsX2l0ZW1zID09PSAwIHx8IG9yZGVyLnRvdGFscy50b3RhbF9pdGVtcyAhPT0gb3JkZXIudG90YWxzLnN1YnRvdGFsXCI+PHN0cm9uZz5TdWJ0b3RhbDo8L3N0cm9uZz5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjpsaW5lLXRocm91Z2g7XCI+e3tcclxuICAgICAgICAgICAgICAgICAgZm9ybWF0Q3VycmVuY3kob3JkZXIudG90YWxzLnN1YnRvdGFsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWlub3JVbml0OiBwYXJzZUludChvcmRlci50b3RhbHMuY3VycmVuY3lfbWlub3JfdW5pdCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBvcmRlci50b3RhbHMuY3VycmVuY3lfc3ltYm9sLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3ByZWZpeCxcclxuICAgICAgICAgICAgICAgICAgICBzdWZmaXg6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9zdWZmaXgsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogb3JkZXIudG90YWxzLmN1cnJlbmN5X2RlY2ltYWxfc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfdGhvdXNhbmRfc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfX0gPC9zcGFuPlxyXG4gICAgICAgICAgICAgIHt7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXRDdXJyZW5jeShvcmRlci50b3RhbHMudG90YWxfaXRlbXMsIHtcclxuICAgICAgICAgICAgICAgICAgbWlub3JVbml0OiBwYXJzZUludChvcmRlci50b3RhbHMuY3VycmVuY3lfbWlub3JfdW5pdCksXHJcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3N5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgcHJlZml4OiBvcmRlci50b3RhbHMuY3VycmVuY3lfcHJlZml4LFxyXG4gICAgICAgICAgICAgICAgICBzdWZmaXg6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9zdWZmaXgsXHJcbiAgICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9kZWNpbWFsX3NlcGFyYXRvcixcclxuICAgICAgICAgICAgICAgICAgdGhvdXNhbmRTZXBhcmF0b3I6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV90aG91c2FuZF9zZXBhcmF0b3IsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHYtZWxzZT48c3Ryb25nPlN1YnRvdGFsOjwvc3Ryb25nPiB7e1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Q3VycmVuY3kob3JkZXIudG90YWxzLnN1YnRvdGFsLCB7XHJcbiAgICAgICAgICAgICAgICAgIG1pbm9yVW5pdDogcGFyc2VJbnQob3JkZXIudG90YWxzLmN1cnJlbmN5X21pbm9yX3VuaXQpLFxyXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgIHByZWZpeDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3ByZWZpeCxcclxuICAgICAgICAgICAgICAgICAgc3VmZml4OiBvcmRlci50b3RhbHMuY3VycmVuY3lfc3VmZml4LFxyXG4gICAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfZGVjaW1hbF9zZXBhcmF0b3IsXHJcbiAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfdGhvdXNhbmRfc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPlNoaXBwaW5nOjwvc3Ryb25nPiB7e1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Q3VycmVuY3kob3JkZXIudG90YWxzLnRvdGFsX3NoaXBwaW5nLCB7XHJcbiAgICAgICAgICAgICAgICAgIG1pbm9yVW5pdDogcGFyc2VJbnQob3JkZXIudG90YWxzLmN1cnJlbmN5X21pbm9yX3VuaXQpLFxyXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgIHByZWZpeDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3ByZWZpeCxcclxuICAgICAgICAgICAgICAgICAgc3VmZml4OiBvcmRlci50b3RhbHMuY3VycmVuY3lfc3VmZml4LFxyXG4gICAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfZGVjaW1hbF9zZXBhcmF0b3IsXHJcbiAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfdGhvdXNhbmRfc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPlRvdGFsOjwvc3Ryb25nPiB7e1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Q3VycmVuY3kob3JkZXIudG90YWxzLnRvdGFsX3ByaWNlLCB7XHJcbiAgICAgICAgICAgICAgICAgIG1pbm9yVW5pdDogcGFyc2VJbnQob3JkZXIudG90YWxzLmN1cnJlbmN5X21pbm9yX3VuaXQpLFxyXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9zeW1ib2wsXHJcbiAgICAgICAgICAgICAgICAgIHByZWZpeDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3ByZWZpeCxcclxuICAgICAgICAgICAgICAgICAgc3VmZml4OiBvcmRlci50b3RhbHMuY3VycmVuY3lfc3VmZml4LFxyXG4gICAgICAgICAgICAgICAgICBkZWNpbWFsU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfZGVjaW1hbF9zZXBhcmF0b3IsXHJcbiAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfdGhvdXNhbmRfc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcblxyXG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW1iLW1kXCI+UHJvZHVjdHM8L2Rpdj5cclxuICAgICAgICAgICAgPHEtdGFibGVcclxuICAgICAgICAgICAgICA6cm93cz1cIm9yZGVyLml0ZW1zXCJcclxuICAgICAgICAgICAgICA6Y29sdW1ucz1cImNvbHVtbnNcIlxyXG4gICAgICAgICAgICAgIGZsYXRcclxuICAgICAgICAgICAgICBkZW5zZVxyXG4gICAgICAgICAgICAgIHJvdy1rZXk9XCJpZFwiXHJcbiAgICAgICAgICAgICAgaGlkZS1ib3R0b21cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRodW1ibmFpbD1cInByb3BzXCI+XHJcbiAgICAgICAgICAgICAgICA8cS10ZD5cclxuICAgICAgICAgICAgICAgICAgPHEtaW1nXHJcbiAgICAgICAgICAgICAgICAgICAgOnNyYz1cInByb3BzLnJvdy5pbWFnZXM/LlswXT8uc3JjXCJcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweDsgaGVpZ2h0OiAxMDBweFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci1jb2xvcj1cImdyZXktNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgOmFsdD1cInByb3BzLnJvdy5uYW1lXCJcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvcS10ZD5cclxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxyXG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRvdGFsPVwicHJvcHNcIj5cclxuICAgICAgICAgICAgICAgIDxxLXRkIGFsaWduPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAge3tcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRDdXJyZW5jeShwcm9wcy5yb3cudG90YWxzPy5saW5lX3RvdGFsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBtaW5vclVuaXQ6IHBhcnNlSW50KG9yZGVyLnRvdGFscy5jdXJyZW5jeV9taW5vcl91bml0KSxcclxuICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3N5bWJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgIHByZWZpeDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3ByZWZpeCxcclxuICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogb3JkZXIudG90YWxzLmN1cnJlbmN5X3N1ZmZpeCxcclxuICAgICAgICAgICAgICAgICAgICAgIGRlY2ltYWxTZXBhcmF0b3I6IG9yZGVyLnRvdGFscy5jdXJyZW5jeV9kZWNpbWFsX3NlcGFyYXRvcixcclxuICAgICAgICAgICAgICAgICAgICAgIHRob3VzYW5kU2VwYXJhdG9yOiBvcmRlci50b3RhbHMuY3VycmVuY3lfdGhvdXNhbmRfc2VwYXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA8L3EtdGQ+XHJcbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPC9xLXRhYmxlPlxyXG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8L3EtY2FyZD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInRleHQtY2VudGVyIHEtbXkteGxcIj5cclxuICAgICAgICA8cS1zcGlubmVyIGNvbG9yPVwic2Vjb25kYXJ5XCIgc2l6ZT1cImxnXCIvPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+TG9hZGluZyB5b3VyIG9yZGVyLi4uPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQge3JlZiwgb25Nb3VudGVkfSBmcm9tICd2dWUnXHJcbmltcG9ydCB7dXNlUm91dGV9IGZyb20gJ3Z1ZS1yb3V0ZXInXHJcbmltcG9ydCB7ZmV0Y2hXaXRoVG9rZW59IGZyb20gJ3NyYy9jb21wb3NhYmxlcy91c2VBcGlGZXRjaC5qcyc7XHJcblxyXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcclxuY29uc3Qgb3JkZXIgPSByZWYobnVsbClcclxuXHJcbmNvbnN0IGNvbHVtbnMgPSBbXHJcbiAge25hbWU6ICd0aHVtYm5haWwnLCBsYWJlbDogJycsIGFsaWduOiAnbGVmdCcsIGZpZWxkOiAndGh1bWJuYWlsJ30sXHJcbiAge25hbWU6ICduYW1lJywgbGFiZWw6ICdQcm9kdWN0JywgYWxpZ246ICdsZWZ0JywgZmllbGQ6ICduYW1lJ30sXHJcbiAge25hbWU6ICdxdWFudGl0eScsIGxhYmVsOiAnUXR5JywgYWxpZ246ICdjZW50ZXInLCBmaWVsZDogJ3F1YW50aXR5J30sXHJcbiAge25hbWU6ICd0b3RhbCcsIGxhYmVsOiAnVG90YWwnLCBhbGlnbjogJ3JpZ2h0JywgZmllbGQ6ICd0b3RhbCd9XHJcbl1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5KGFtb3VudFN0ciwge1xyXG4gIG1pbm9yVW5pdCA9IDIsXHJcbiAgZGVjaW1hbFNlcGFyYXRvciA9ICcuJyxcclxuICBwcmVmaXggPSAnJCcsXHJcbiAgc3VmZml4ID0gJydcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50U3RyLCAxMCk7XHJcblxyXG4gIGlmIChpc05hTihhbW91bnQpKSByZXR1cm4gYCR7cHJlZml4fTAke2RlY2ltYWxTZXBhcmF0b3J9JHsnMCcucmVwZWF0KG1pbm9yVW5pdCl9JHtzdWZmaXh9YDtcclxuXHJcbiAgY29uc3QgZmFjdG9yID0gTWF0aC5wb3coMTAsIG1pbm9yVW5pdCk7XHJcbiAgY29uc3QgbnVtYmVyID0gYW1vdW50IC8gZmFjdG9yO1xyXG5cclxuICByZXR1cm4gYCR7bnVtYmVyLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBtaW5vclVuaXQsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG1pbm9yVW5pdFxyXG4gIH0pfSR7c3VmZml4fSR7cHJlZml4fWA7XHJcbn1cclxuXHJcblxyXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IG9yZGVySUQgPSByb3V0ZS5xdWVyeS5vcmRlcklkXHJcbiAgY29uc3QgZW1haWwgPSByb3V0ZS5xdWVyeS5iaWxsaW5nX2VtYWlsXHJcbiAgY29uc3Qgb3JkZXJfa2V5ID0gcm91dGUucXVlcnkub3JkZXJfa2V5XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaFdpdGhUb2tlbihcclxuICAgICAgYGh0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3djL3N0b3JlL3YxL29yZGVyLyR7b3JkZXJJRH0/a2V5PSR7b3JkZXJfa2V5fSZiaWxsaW5nX2VtYWlsPSR7ZW1haWx9YCxcclxuICAgICAge2NyZWRlbnRpYWxzOiAnaW5jbHVkZSd9XHJcbiAgICApXHJcbiAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBvcmRlcjogJHtyZXMuc3RhdHVzfWApXHJcbiAgICB9XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG4gICAgb3JkZXIudmFsdWUgPSBkYXRhXHJcbiAgICBjb25zb2xlLmxvZyhvcmRlci52YWx1ZSlcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gIH1cclxufSlcclxuPC9zY3JpcHQ+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVWTm9kZSIsIl93aXRoQ3R4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBNkhBLFVBQU0sUUFBUSxTQUFRO0FBQ3RCLFVBQU0sUUFBUSxJQUFJLElBQUk7QUFFdEIsVUFBTSxVQUFVO0FBQUEsTUFDZCxFQUFDLE1BQU0sYUFBYSxPQUFPLElBQUksT0FBTyxRQUFRLE9BQU8sWUFBVztBQUFBLE1BQ2hFLEVBQUMsTUFBTSxRQUFRLE9BQU8sV0FBVyxPQUFPLFFBQVEsT0FBTyxPQUFNO0FBQUEsTUFDN0QsRUFBQyxNQUFNLFlBQVksT0FBTyxPQUFPLE9BQU8sVUFBVSxPQUFPLFdBQVU7QUFBQSxNQUNuRSxFQUFDLE1BQU0sU0FBUyxPQUFPLFNBQVMsT0FBTyxTQUFTLE9BQU8sUUFBTztBQUFBLElBQ2hFO0FBRUEsYUFBUyxlQUFlLFdBQVc7QUFBQSxNQUNqQyxZQUFZO0FBQUEsTUFDWixtQkFBbUI7QUFBQSxNQUNuQixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsSUFDWCxJQUFJLElBQUk7QUFDTixZQUFNLFNBQVMsU0FBUyxXQUFXLEVBQUU7QUFFckMsVUFBSSxNQUFNLE1BQU0sRUFBRyxRQUFPLEdBQUcsTUFBTSxJQUFJLGdCQUFnQixHQUFHLElBQUksT0FBTyxTQUFTLENBQUMsR0FBRyxNQUFNO0FBRXhGLFlBQU0sU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTO0FBQ3JDLFlBQU0sU0FBUyxTQUFTO0FBRXhCLGFBQU8sR0FBRyxPQUFPLGVBQWUsUUFBVztBQUFBLFFBQ3pDLHVCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLE1BQzNCLENBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNO0FBQUEsSUFDdEI7QUFHQSxjQUFVLFlBQVk7QUFDcEIsWUFBTSxVQUFVLE1BQU0sTUFBTTtBQUM1QixZQUFNLFFBQVEsTUFBTSxNQUFNO0FBQzFCLFlBQU0sWUFBWSxNQUFNLE1BQU07QUFFOUIsVUFBSTtBQUNGLGNBQU0sTUFBTSxNQUFNO0FBQUEsVUFDaEIsc0RBQXNELE9BQU8sUUFBUSxTQUFTLGtCQUFrQixLQUFLO0FBQUEsVUFDckcsRUFBQyxhQUFhLFVBQVM7QUFBQSxRQUM3QjtBQUNJLFlBQUksQ0FBQyxJQUFJLElBQUk7QUFDWCxnQkFBTSxJQUFJLE1BQU0sMEJBQTBCLElBQUksTUFBTSxFQUFFO0FBQUEsUUFDeEQ7QUFDQSxjQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUk7QUFDM0IsY0FBTSxRQUFRO0FBQ2QsZ0JBQVEsSUFBSSxNQUFNLEtBQUs7QUFBQSxNQUN6QixTQUFTLEtBQUs7QUFDWixnQkFBUSxNQUFNLEdBQUc7QUFBQSxNQUNuQjtBQUFBLElBQ0YsQ0FBQzs7Ozs7Ozs7OztBQTVLUSxNQUFBLGFBQUEsRUFBQSxPQUFNLFlBQVc7OztFQUNGLE9BQU07O0FBRWpCLE1BQUEsYUFBQSxFQUFBLE9BQU0sNkJBQTRCOztBQVkzQixNQUFBLGFBQUEsRUFBQSxPQUFBLEVBQUEsbUJBQUEsZUFBQSxFQUFxQzs7OztFQStGdkMsT0FBTTs7O3NCQS9HdEJBLFlBb0hTLE9BQUEsRUFBQSxPQUFBLGFBcEhLO0FBQUEscUJBQ1osTUFrSE07QUFBQSxNQWxITkMsZ0JBa0hNLE9BbEhOLFlBa0hNO0FBQUEsUUFqSE8sT0FBQSxTQUFYQyxhQUFBQyxtQkEyR00sT0EzR04sWUEyR007QUFBQSxVQTFHSixPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUYsZ0JBQWlELE9BQUEsRUFBNUMsT0FBTSxzQkFBcUIsR0FBQyxjQUFVLEVBQUE7QUFBQSxVQUMzQ0EsZ0JBR00sT0FITixZQUdNO0FBQUEsWUFIa0NHLGdCQUFBLDBCQUMvQixPQUFBLE1BQU0sZ0JBQWdCLFVBQVUsSUFBRywrRkFDVCxDQUFBO0FBQUEsWUFBQUgsZ0JBQWtELFVBQUEsTUFBQUksZ0JBQXZDLE9BQUEsTUFBTSxnQkFBZ0IsS0FBSyxHQUFBLENBQUE7QUFBQSxzREFBWSx1QkFDckYsRUFBQTtBQUFBO1VBRUFDLFlBbUdTLE9BQUEsTUFBQTtBQUFBLDZCQWxHUCxNQTREaUI7QUFBQSxjQTVEakJBLFlBNERpQixjQUFBLE1BQUE7QUFBQSxpQ0EzRGYsTUFBd0M7QUFBQSxrQkFBeEMsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFMLGdCQUF3QyxPQUFBLEVBQW5DLE9BQU0sVUFBUyxHQUFDLGlCQUFhLEVBQUE7QUFBQSxrQkFDbENLLFlBQThCLFlBQUEsRUFBQSxPQUFBLFVBQWpCLENBQUs7QUFBQSxrQkFDbEJMLGdCQUF3RCxPQUFBLE1BQUE7QUFBQSxvQkFBbkQsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFBLGdCQUE4QixnQkFBdEIsaUJBQWEsRUFBQTtBQUFBLG9DQUFTLE1BQUNJLGdCQUFHLE9BQUEsTUFBTSxFQUFFLEdBQUEsQ0FBQTtBQUFBO2tCQUVwQyxPQUFBLE1BQU0sT0FBTyxxQkFBcUIsT0FBQSxNQUFNLE9BQU8sZ0JBQWdCLE9BQUEsTUFBTSxPQUFPLHlCQUF2RkYsbUJBcUJNLE9BQUEsWUFBQTtBQUFBLG9CQXJCMkYsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFGLGdCQUEwQixnQkFBbEIsYUFBUyxFQUFBO0FBQUEsb0JBQ2hIQSxnQkFTWSxRQVRaLFlBU1lJLGdCQVJSLE9BQUEsZUFBZSxPQUFBLE1BQU0sT0FBTyxVQUFRO0FBQUEsc0JBQW9DLFdBQUEsU0FBUyxPQUFBLE1BQU0sT0FBTyxtQkFBbUI7QUFBQSw4QkFBZ0MsT0FBQSxNQUFNLE9BQU87QUFBQSw4QkFBOEMsT0FBQSxNQUFNLE9BQU87QUFBQSw4QkFBOEMsT0FBQSxNQUFNLE9BQU87QUFBQSx3Q0FBd0QsT0FBQSxNQUFNLE9BQU87QUFBQSx5Q0FBb0UsT0FBQSxNQUFNLE9BQU87QUFBQTtvQkFRbGFELGdCQUFBLHNCQUVWLE9BQUEsZUFBZSxhQUFNLE9BQU8sYUFBVztBQUFBLHNCQUFrQyxXQUFBLFNBQVMsT0FBQSxNQUFNLE9BQU8sbUJBQW1CO0FBQUEsOEJBQThCLE9BQUEsTUFBTSxPQUFPO0FBQUEsOEJBQTRDLE9BQUEsTUFBTSxPQUFPO0FBQUEsOEJBQTRDLE9BQUEsTUFBTSxPQUFPO0FBQUEsd0NBQXNELE9BQUEsTUFBTSxPQUFPO0FBQUEseUNBQWtFLE9BQUEsTUFBTSxPQUFPO0FBQUE7c0NBVXJhRCxtQkFVTSxPQUFBLFlBQUE7QUFBQSxvQkFWTSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUYsZ0JBQTBCLGdCQUFsQixhQUFTLEVBQUE7QUFBQSxvQkFBU0csZ0JBQUEsc0JBQ2xDLE9BQUEsZUFBZSxhQUFNLE9BQU8sVUFBUTtBQUFBLHNCQUFrQyxXQUFBLFNBQVMsT0FBQSxNQUFNLE9BQU8sbUJBQW1CO0FBQUEsOEJBQThCLE9BQUEsTUFBTSxPQUFPO0FBQUEsOEJBQTRDLE9BQUEsTUFBTSxPQUFPO0FBQUEsOEJBQTRDLE9BQUEsTUFBTSxPQUFPO0FBQUEsd0NBQXNELE9BQUEsTUFBTSxPQUFPO0FBQUEseUNBQWtFLE9BQUEsTUFBTSxPQUFPO0FBQUE7O2tCQVVsYUgsZ0JBVU0sT0FBQSxNQUFBO0FBQUEsb0JBVkQsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFBLGdCQUEwQixnQkFBbEIsYUFBUyxFQUFBO0FBQUEsb0JBQVNHLGdCQUFBLHNCQUMzQixPQUFBLGVBQWUsYUFBTSxPQUFPLGdCQUFjO0FBQUEsc0JBQWtDLFdBQUEsU0FBUyxPQUFBLE1BQU0sT0FBTyxtQkFBbUI7QUFBQSw4QkFBOEIsT0FBQSxNQUFNLE9BQU87QUFBQSw4QkFBNEMsT0FBQSxNQUFNLE9BQU87QUFBQSw4QkFBNEMsT0FBQSxNQUFNLE9BQU87QUFBQSx3Q0FBc0QsT0FBQSxNQUFNLE9BQU87QUFBQSx5Q0FBa0UsT0FBQSxNQUFNLE9BQU87QUFBQTs7a0JBVXhhSCxnQkFVTSxPQUFBLE1BQUE7QUFBQSxvQkFWRCxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUEsZ0JBQXVCLGdCQUFmLFVBQU0sRUFBQTtBQUFBLG9CQUFTRyxnQkFBQSxzQkFDeEIsT0FBQSxlQUFlLGFBQU0sT0FBTyxhQUFXO0FBQUEsc0JBQWtDLFdBQUEsU0FBUyxPQUFBLE1BQU0sT0FBTyxtQkFBbUI7QUFBQSw4QkFBOEIsT0FBQSxNQUFNLE9BQU87QUFBQSw4QkFBNEMsT0FBQSxNQUFNLE9BQU87QUFBQSw4QkFBNEMsT0FBQSxNQUFNLE9BQU87QUFBQSx3Q0FBc0QsT0FBQSxNQUFNLE9BQU87QUFBQSx5Q0FBa0UsT0FBQSxNQUFNLE9BQU87QUFBQTs7Ozs7Y0FZdmFFLFlBbUNpQixjQUFBLE1BQUE7QUFBQSxpQ0FsQ2YsTUFBMkM7QUFBQSxrQkFBM0MsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFMLGdCQUEyQyxPQUFBLEVBQXRDLE9BQU0sa0JBQWlCLEdBQUMsWUFBUSxFQUFBO0FBQUEsa0JBQ3JDSyxZQWdDVSxRQUFBO0FBQUEsb0JBL0JQLE1BQU0sT0FBQSxNQUFNO0FBQUEsb0JBQ1osU0FBUyxPQUFBO0FBQUEsb0JBQ1YsTUFBQTtBQUFBLG9CQUNBLE9BQUE7QUFBQSxvQkFDQSxXQUFRO0FBQUEsb0JBQ1IsZUFBQTtBQUFBO29CQUVpQix1QkFBbUJDLFFBQ2xDLENBRG9DLFVBQUs7QUFBQSxzQkFDekNELFlBT08sS0FBQSxNQUFBO0FBQUEseUNBTkwsTUFLRTtBQUFBLDBCQUxGQSxZQUtFLE1BQUE7QUFBQSw0QkFKQyxLQUFLLE1BQU0sSUFBSSxhQUFhO0FBQUEsNEJBQzdCLE9BQUEsRUFBQSxTQUFBLFNBQUEsVUFBQSxRQUFBO0FBQUEsNEJBQ0EsaUJBQWM7QUFBQSw0QkFDYixLQUFLLE1BQU0sSUFBSTtBQUFBOzs7OztvQkFJTCxtQkFBZUMsUUFDOUIsQ0FEZ0MsVUFBSztBQUFBLHNCQUNyQ0QsWUFXTyxLQUFBLEVBQUEsT0FBQSxRQVhELEdBQUs7QUFBQSx5Q0FDVCxNQVNFO0FBQUEsMEJBUkFGLGdCQUFBQyxnQkFBQSxPQUFBLGVBQWUsTUFBTSxJQUFJLFFBQVEsWUFBVTtBQUFBLDRCQUFzQyxXQUFBLFNBQVMsT0FBQSxNQUFNLE9BQU8sbUJBQW1CO0FBQUEsb0NBQWtDLE9BQUEsTUFBTSxPQUFPO0FBQUEsb0NBQWdELE9BQUEsTUFBTSxPQUFPO0FBQUEsb0NBQWdELE9BQUEsTUFBTSxPQUFPO0FBQUEsOENBQTBELE9BQUEsTUFBTSxPQUFPO0FBQUEsK0NBQXNFLE9BQUEsTUFBTSxPQUFPO0FBQUE7Ozs7Ozs7Ozs7Ozs7ZUFnQjNjSCxhQUFBQyxtQkFHTSxPQUhOLFlBR007QUFBQSxVQUZKRyxZQUF3QyxVQUFBO0FBQUEsWUFBN0IsT0FBTTtBQUFBLFlBQVksTUFBSztBQUFBO1VBQ2xDLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBTCxnQkFBZ0QsT0FBQSxFQUEzQyxPQUFNLFVBQVMsR0FBQyx5QkFBcUIsRUFBQTtBQUFBOzs7Ozs7OyJ9
