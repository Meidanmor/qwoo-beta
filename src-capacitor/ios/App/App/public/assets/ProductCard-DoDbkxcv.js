const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./quasar.client-CId9M-oB.js","./quasar-observers-delayed-tSHCOYpR.js"])))=>i.map(i=>d[i]);
import { _ as _export_sfc, Q as QBtn, c as cart, B as matFavoriteBorder, a0 as matFavorite, o as __vitePreload } from "./index-DDAg5YDa.js";
import { u as useQuasar } from "./use-quasar-D_HwOQSM.js";
import { k as resolveComponent, o as openBlock, p as createBlock, q as withCtx, a9 as createBaseVNode, ad as withModifiers, t as createVNode, ac as toDisplayString, m as createElementBlock, al as defineAsyncComponent } from "./quasar-observers-delayed-tSHCOYpR.js";
const _sfc_main = {
  __name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const QCard = defineAsyncComponent(() => __vitePreload(() => import("./quasar.client-CId9M-oB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => m.QCard));
    const QImg = defineAsyncComponent(() => __vitePreload(() => import("./quasar.client-CId9M-oB.js"), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url).then((m) => m.QImg));
    const getSlugFromPermalink = (permalink) => {
      return permalink.split("/").filter(Boolean).pop();
    };
    const addToCart = (product) => {
      cart.add(product.id, 1);
      console.log("Added to cart:", product.id);
    };
    async function addToWishlist(objID = 0) {
      await cart.toggleWishlistItem(objID, $q);
    }
    const __returned__ = { $q, QCard, QImg, getSlugFromPermalink, addToCart, addToWishlist, get matFavorite() {
      return matFavorite;
    }, get matFavoriteBorder() {
      return matFavoriteBorder;
    }, get cart() {
      return cart;
    }, get useQuasar() {
      return useQuasar;
    }, defineAsyncComponent };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "item-loop-wl absolute" };
const _hoisted_2 = { class: "flex q-pa-md" };
const _hoisted_3 = { class: "full-width q-mb-sm" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 3 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock(_component_router_link, {
    to: `/product/${$setup.getSlugFromPermalink($props.product.permalink)}`
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        $setup.cart.state.wishlist_items && Object.values($setup.cart.state.wishlist_items).find((obj) => $props.product.id === obj.id) ? (openBlock(), createBlock(QBtn, {
          key: 0,
          class: "text-black q-pa-none text-caption q-mt-sm",
          flat: "",
          loading: $setup.cart.state.loading.wishlist,
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => $setup.addToWishlist($props.product.id), ["prevent"])),
          color: "accent",
          icon: $setup.matFavorite
        }, null, 8, ["loading", "icon"])) : (openBlock(), createBlock(QBtn, {
          key: 1,
          class: "text-black q-pa-none text-caption q-mt-sm",
          flat: "",
          loading: $setup.cart.state.loading.wishlist,
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => $setup.addToWishlist($props.product.id), ["prevent"])),
          color: "accent",
          icon: $setup.matFavoriteBorder
        }, null, 8, ["loading", "icon"]))
      ]),
      createVNode($setup["QCard"], { class: "my-card full-height" }, {
        default: withCtx(() => [
          createVNode($setup["QImg"], {
            "img-src": $props.product.images[0]?.src,
            src: $props.product.images[0]?.src,
            srcset: $props.product.images[0]?.srcset,
            sizes: $props.product.images[0]?.sizes,
            alt: $props.product.name,
            height: "250px",
            width: "auto",
            class: "rounded-borders"
          }, null, 8, ["img-src", "src", "srcset", "sizes", "alt"]),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", null, toDisplayString($props.product.name), 1),
              createBaseVNode("div", {
                class: "text-subtitle2",
                innerHTML: $props.product.price_html
              }, null, 8, _hoisted_4)
            ]),
            $props.product.status && $props.product.status === "draft" ? (openBlock(), createElementBlock("div", _hoisted_5, [..._cache[3] || (_cache[3] = [
              createBaseVNode("b", null, "This is a draft product. It's shown for admins only!", -1)
            ])])) : $props.product.is_in_stock && $props.product.type !== "variable" ? (openBlock(), createBlock(QBtn, {
              key: 1,
              label: "Add to Cart",
              color: "secondary",
              onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $setup.addToCart($props.product), ["prevent"]))
            })) : $props.product.is_in_stock && $props.product.type === "variable" ? (openBlock(), createBlock(QBtn, {
              key: 2,
              to: `/product/${$setup.getSlugFromPermalink($props.product.permalink)}`,
              label: "Choose options",
              color: "secondary"
            }, null, 8, ["to"])) : (openBlock(), createElementBlock("div", _hoisted_6, "Out of stock"))
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["to"]);
}
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ProductCard.vue"]]);
export {
  ProductCard as P
};


//# sourceMappingURL=data:application/json;base64,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QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3dpdGhNb2RpZmllcnMiLCJfY3JlYXRlVk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9vcGVuQmxvY2siXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUHJvZHVjdENhcmQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cclxuICA8cm91dGVyLWxpbmsgOnRvPVwiYC9wcm9kdWN0LyR7Z2V0U2x1Z0Zyb21QZXJtYWxpbmsocHJvZHVjdC5wZXJtYWxpbmspfWBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLWxvb3Atd2wgYWJzb2x1dGVcIj5cclxuICAgICAgICAgICAgICA8cS1idG4gY2xhc3M9XCJ0ZXh0LWJsYWNrIHEtcGEtbm9uZSB0ZXh0LWNhcHRpb24gcS1tdC1zbVwiIGZsYXQgOmxvYWRpbmc9XCJjYXJ0LnN0YXRlLmxvYWRpbmcud2lzaGxpc3RcIiB2LWlmPVwiY2FydC5zdGF0ZS53aXNobGlzdF9pdGVtcyAmJiBPYmplY3QudmFsdWVzKGNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXMpLmZpbmQob2JqID0+IHByb2R1Y3QuaWQgPT09IG9iai5pZClcIiBAY2xpY2sucHJldmVudD1cImFkZFRvV2lzaGxpc3QocHJvZHVjdC5pZClcIiBjb2xvcj1cImFjY2VudFwiIDppY29uPVwibWF0RmF2b3JpdGVcIiAvPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biBjbGFzcz1cInRleHQtYmxhY2sgcS1wYS1ub25lIHRleHQtY2FwdGlvbiBxLW10LXNtXCIgZmxhdCA6bG9hZGluZz1cImNhcnQuc3RhdGUubG9hZGluZy53aXNobGlzdFwiIHYtZWxzZSBAY2xpY2sucHJldmVudD1cImFkZFRvV2lzaGxpc3QocHJvZHVjdC5pZClcIiBjb2xvcj1cImFjY2VudFwiIDppY29uPVwibWF0RmF2b3JpdGVCb3JkZXJcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgZnVsbC1oZWlnaHRcIj5cclxuICAgICAgICAgICAgPHEtaW1nXHJcbiAgICAgICAgICAgIDppbWctc3JjPVwicHJvZHVjdC5pbWFnZXNbMF0/LnNyY1wiXHJcbiAgICAgICAgICAgIDpzcmM9XCJwcm9kdWN0LmltYWdlc1swXT8uc3JjXCJcclxuICAgICAgICAgICAgOnNyY3NldD1cInByb2R1Y3QuaW1hZ2VzWzBdPy5zcmNzZXRcIlxyXG4gICAgICAgICAgICA6c2l6ZXM9XCJwcm9kdWN0LmltYWdlc1swXT8uc2l6ZXNcIlxyXG4gICAgICAgICAgICA6YWx0PVwicHJvZHVjdC5uYW1lXCJcclxuICAgICAgICAgICAgaGVpZ2h0PVwiMjUwcHhcIlxyXG4gICAgICAgICAgICB3aWR0aD1cImF1dG9cIlxyXG4gICAgICAgICAgICBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IHEtcGEtbWRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC13aWR0aCBxLW1iLXNtXCI+XHJcbiAgICAgICAgICAgICAgPGRpdj57eyBwcm9kdWN0Lm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIiB2LWh0bWw9XCJwcm9kdWN0LnByaWNlX2h0bWxcIiAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgdi1pZj1cInByb2R1Y3Quc3RhdHVzICYmIHByb2R1Y3Quc3RhdHVzID09PSAnZHJhZnQnXCI+PGI+VGhpcyBpcyBhIGRyYWZ0IHByb2R1Y3QuIEl0J3Mgc2hvd24gZm9yIGFkbWlucyBvbmx5ITwvYj48L2Rpdj5cclxuICAgICAgICAgICAgICA8cS1idG4gdi1lbHNlLWlmPVwicHJvZHVjdC5pc19pbl9zdG9jayAmJiBwcm9kdWN0LnR5cGUgIT09ICd2YXJpYWJsZSdcIiBsYWJlbD1cIkFkZCB0byBDYXJ0XCIgY29sb3I9XCJzZWNvbmRhcnlcIiBAY2xpY2sucHJldmVudD1cImFkZFRvQ2FydChwcm9kdWN0KVwiIC8+XHJcbiAgICAgICAgICAgICAgPHEtYnRuIHYtZWxzZS1pZj1cInByb2R1Y3QuaXNfaW5fc3RvY2sgJiYgcHJvZHVjdC50eXBlID09PSAndmFyaWFibGUnXCIgOnRvPVwiYC9wcm9kdWN0LyR7Z2V0U2x1Z0Zyb21QZXJtYWxpbmsocHJvZHVjdC5wZXJtYWxpbmspfWBcIiBsYWJlbD1cIkNob29zZSBvcHRpb25zXCIgY29sb3I9XCJzZWNvbmRhcnlcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgdi1lbHNlPk91dCBvZiBzdG9jazwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9xLWNhcmQ+XHJcbiAgPC9yb3V0ZXItbGluaz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbi8vaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXHJcbmltcG9ydCB7IG1hdEZhdm9yaXRlLCBtYXRGYXZvcml0ZUJvcmRlciB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQnIC8vIHlvdXIgZXhpc3RpbmcgY2FydC5qc1xyXG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInXHJcbmltcG9ydCB7IGRlZmluZUFzeW5jQ29tcG9uZW50IH0gZnJvbSAndnVlJ1xyXG5cclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5cclxuY29uc3QgUUNhcmQgPSBkZWZpbmVBc3luY0NvbXBvbmVudCgoKSA9PiBpbXBvcnQoJ3F1YXNhcicpLnRoZW4obSA9PiBtLlFDYXJkKSlcclxuY29uc3QgUUltZyA9IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgncXVhc2FyJykudGhlbihtID0+IG0uUUltZykpXHJcblxyXG5kZWZpbmVQcm9wcyh7XHJcbiAgcHJvZHVjdDoge1xyXG4gICAgdHlwZTogT2JqZWN0LFxyXG4gICAgcmVxdWlyZWQ6IHRydWVcclxuICB9XHJcbn0pXHJcblxyXG4vKmNvbnN0IGlzV2lzaGxpc3RlZCA9IGNvbXB1dGVkKCgpID0+IHtcclxuICBjb25zdCBpdGVtcyA9IGNhcnQuc3RhdGUud2lzaGxpc3RfaXRlbXMgfHwge31cclxuXHJcbiAgcmV0dXJuIE9iamVjdC52YWx1ZXMoaXRlbXMpLnNvbWUoXHJcbiAgICBpdGVtID0+IGl0ZW0uaWQgPT09IHByb3BzLnByb2R1Y3QuaWRcclxuICApXHJcbn0pKi9cclxuXHJcbmNvbnN0IGdldFNsdWdGcm9tUGVybWFsaW5rID0gKHBlcm1hbGluaykgPT4ge1xyXG4gIHJldHVybiBwZXJtYWxpbmsuc3BsaXQoJy8nKS5maWx0ZXIoQm9vbGVhbikucG9wKClcclxufVxyXG5jb25zdCBhZGRUb0NhcnQgPSAocHJvZHVjdCkgPT4ge1xyXG4gIGNhcnQuYWRkKHByb2R1Y3QuaWQsIDEpXHJcbiAgY29uc29sZS5sb2coJ0FkZGVkIHRvIGNhcnQ6JywgcHJvZHVjdC5pZClcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYWRkVG9XaXNobGlzdChvYmpJRCA9IDApIHtcclxuICBhd2FpdCBjYXJ0LnRvZ2dsZVdpc2hsaXN0SXRlbShvYmpJRCwgJHEpO1xyXG59XHJcbjwvc2NyaXB0PiJdLCJmaWxlIjoiYXNzZXRzL1Byb2R1Y3RDYXJkLURvRGJreGN2LmpzIn0=