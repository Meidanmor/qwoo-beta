import { Q as QBreadcrumbsEl, a as QBreadcrumbs } from "./QBreadcrumbs-DAF5pwlv.js";
import { _ as _export_sfc, Q as QBtn, i as QInput, a7 as QOptionGroup, j as QCard, J as productsStore, a8 as WC, a9 as matFilterList, m as matClose, aa as matAutorenew, a4 as matArrowDropDown, ab as matKeyboardArrowRight, ac as matKeyboardArrowLeft, ad as QCardSection, ae as QCardActions } from "./index-DDAg5YDa.js";
import { Q as QSkeleton, a as QRange, b as QPagination } from "./QPagination-lLA2xbvQ.js";
import { Q as QSelect } from "./QSelect-xmC19IVN.js";
import { u as useQuasar } from "./use-quasar-D_HwOQSM.js";
import { u as useMeta } from "./use-meta-BVxOmsjs.js";
import { o as openBlock, m as createElementBlock, a9 as createBaseVNode, t as createVNode, q as withCtx, ae as normalizeClass, p as createBlock, u as createCommentVNode, ac as toDisplayString, aa as Fragment, ab as renderList, aq as scroll, v as watch, x as onMounted, e as computed, j as ref } from "./quasar-observers-delayed-tSHCOYpR.js";
import { fetchSeoForPath } from "./useSeo-DQlkSlEM.js";
import { P as ProductCard } from "./ProductCard-DoDbkxcv.js";
import "./QChip-CN1ZGBoZ.js";
import "./QItem-D74-s_Zr.js";
import "./QItemSection-Em5VwD4r.js";
const perPage = 6;
const _sfc_main = /* @__PURE__ */ Object.assign({
  async preFetch({ ssrContext, currentRoute }) {
    console.log("--- PreFetch Running for:", currentRoute.path);
    const seo = await fetchSeoForPath("shop");
    let products = [];
    let categories = [];
    let priceMeta = null;
    if (ssrContext) {
      products = await productsStore.preFetchProducts({
        api: true,
        page: 1,
        per_page: 6
      });
      categories = await WC.getCategories();
      const res = await fetch("https://nuxt.meidanm.com/wp-json/wc/store/v1/products-meta");
      priceMeta = await res.json();
      ssrContext.productsData = products;
      ssrContext.categoriesData = categories;
      ssrContext.priceMetaData = priceMeta;
      ssrContext.productsTotal = productsStore.totalProducts.value;
      ssrContext.pagesTotal = productsStore.totalPages.value;
    }
    if (ssrContext) {
      ssrContext.seoData = seo;
    }
  }
}, {
  __name: "ProductsPage",
  setup(__props, { expose: __expose }) {
    __expose();
    const $q = useQuasar();
    const { setVerticalScrollPosition } = scroll;
    function scrollToTop() {
      setVerticalScrollPosition(window, 187, 300);
    }
    const categories = ref([]);
    const selectedCategory = ref([]);
    const search = ref("");
    const currentPage = ref(1);
    const sortBy = ref("menu_order");
    const filtersOpen = ref(false);
    const sortOptions = [
      { label: "Default", value: "menu_order" },
      { label: "Newest", value: "date_desc" },
      { label: "Price: Low to High", value: "price_asc" },
      { label: "Price: High to Low", value: "price_desc" },
      { label: "Name: A to Z", value: "title_asc" },
      { label: "Name: Z to A", value: "title_desc" },
      { label: "Popularity", value: "popularity" },
      { label: "Rating", value: "rating" }
    ];
    const seoData = ref({
      title: "Products",
      description: "Products description"
    });
    {
      if (window.__SEO_DATA__) {
        seoData.value = window.__SEO_DATA__;
      }
      useMeta(() => {
        const seo = seoData.value;
        return {
          title: seo?.title || "NaturaBloom",
          meta: {
            description: {
              name: "description",
              content: seo?.description || "Let's Bloom Together"
            },
            "og:title": {
              property: "og:title",
              content: seo?.title || "NaturaBloom"
            },
            "og:description": {
              property: "og:description",
              content: seo?.description || "Let's Bloom Together"
            }
          }
        };
      });
    }
    const paginatedProducts = computed(() => {
      return productsStore.products.value || [];
    });
    const isReady = ref(false);
    const priceMin = ref(null);
    const priceMax = ref(null);
    const priceRange = ref({ min: 0, max: 1e3 });
    {
      if (Array.isArray(window.__PRODUCTS_DATA__) && window.__PRODUCTS_DATA__.length) {
        productsStore.products.value = window.__PRODUCTS_DATA__;
        productsStore.initialized.value = true;
      }
      if (Array.isArray(window.__CATEGORIES_DATA__)) {
        categories.value = window.__CATEGORIES_DATA__;
      } else {
        categories.value = [];
      }
      if (Array.isArray(window.__CATEGORIES_DATA__)) {
        priceMin.value = Number(window.__PRICE_META__.min_price);
        priceMax.value = Number(window.__PRICE_META__.max_price);
        priceRange.value = {
          min: Number(window.__PRICE_META__.min_price),
          max: Number(window.__PRICE_META__.max_price)
        };
      }
      isReady.value = true;
    }
    const fetchCategories = async () => {
      categories.value = await WC.getCategories();
    };
    const decodeHtml = (html) => {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };
    const categoryOptions = computed(() => {
      if (!Array.isArray(categories.value)) return [];
      return categories.value.map((cat) => ({
        label: decodeHtml(cat.name),
        value: cat.id
      }));
    });
    const totalPages = computed(() => productsStore.totalPages.value);
    const totalProducts = computed(() => productsStore.totalProducts.value);
    if (window.__PRODUCTS_TOTAL__) {
      productsStore.totalProducts.value = window.__PRODUCTS_TOTAL__;
    }
    if (window.__PAGES_TOTAL__) {
      productsStore.totalPages.value = window.__PAGES_TOTAL__;
    }
    const priceChanged = ref(0);
    function onPriceChange() {
      priceChanged.value++;
    }
    const isHydrated = ref(false);
    function getSortParams(sort) {
      switch (sort) {
        case "price_asc":
          return { orderby: "price", order: "asc" };
        case "price_desc":
          return { orderby: "price", order: "desc" };
        case "date_desc":
          return { orderby: "date", order: "desc" };
        case "title_asc":
          return { orderby: "title", order: "asc" };
        case "title_desc":
          return { orderby: "title", order: "desc" };
        case "popularity":
          return { orderby: "popularity", order: "desc" };
        case "rating":
          return { orderby: "rating", order: "desc" };
        default:
          return { orderby: "menu_order", order: "desc" };
      }
    }
    const isFetching = ref(false);
    const pendingPriceRange = ref(null);
    let requestId = 0;
    watch(
      () => ({
        category: selectedCategory.value,
        search: search.value,
        page: currentPage.value,
        sort: sortBy.value,
        priceTrigger: priceChanged.value
        // ✅ only trigger when user releases slider
      }),
      async (filters, prev) => {
        if (!isReady.value || priceRange.value.min === null || priceRange.value.max === null) return;
        if (isFetching.value) return;
        const currentRequest = ++requestId;
        const categoryChanged = prev && JSON.stringify([...filters.category].sort()) !== JSON.stringify([...prev.category].sort());
        if (categoryChanged) {
          productsStore.productsLoading.value = true;
          await fetchPriceMeta(filters.category);
          priceMin.value = pendingPriceRange.value.min;
          priceMax.value = pendingPriceRange.value.max;
          priceRange.value = {
            min: pendingPriceRange.value.min,
            max: pendingPriceRange.value.max
          };
        }
        if (prev && (filters.search !== prev.search || filters.priceTrigger !== prev.priceTrigger)) {
          if (currentPage.value !== 1) {
            currentPage.value = 1;
            return;
          }
        }
        isFetching.value = true;
        if (currentRequest !== requestId) return;
        console.log("Products fetch watcher triggered!!!");
        const source = priceRange.value;
        const min = Math.floor(source.min * 100);
        const max = Math.ceil(source.max * 100);
        console.log("========== FILTER DEBUG ==========");
        console.log("selectedCategory:", filters.category);
        console.log("joined category:", filters.category.join(","));
        console.log("search:", filters.search);
        console.log("page:", filters.page);
        console.log("priceRange:", priceRange.value);
        console.log("min/max:", min, max);
        console.log("categoryChanged:", categoryChanged);
        console.log("requestId:", currentRequest);
        const sortParams = getSortParams(filters.sort);
        console.log(sortParams);
        await productsStore.preFetchProducts({
          api: true,
          page: filters.page,
          per_page: perPage,
          min_price: min,
          max_price: max,
          category: filters.category.length ? filters.category.join(",") : null,
          search: filters.search,
          ...sortParams
        });
        if (categoryChanged) {
          priceMin.value = pendingPriceRange.value.min;
          priceMax.value = pendingPriceRange.value.max;
          priceRange.value = pendingPriceRange.value;
        }
        isFetching.value = false;
      }
    );
    const hasSSRProducts = Array.isArray(window.__PRODUCTS_DATA__) && window.__PRODUCTS_DATA__.length > 0;
    const hasSelectedCategory = window.__SELECTED_CATEGORY_DATA__ && Object.keys(window.__SELECTED_CATEGORY_DATA__).length > 0;
    onMounted(async () => {
      isHydrated.value = true;
      console.log(hasSelectedCategory);
      if (!hasSSRProducts || hasSelectedCategory) {
        productsStore.products.value = [];
        productsStore.preFetchProducts({
          api: true,
          page: 1,
          per_page: perPage
        });
      }
      if (!priceMin.value) {
        await fetchPriceMeta();
        priceRange.value = pendingPriceRange.value;
        priceMin.value = pendingPriceRange.value.min;
        priceMax.value = pendingPriceRange.value.max;
      }
      if (!Array.isArray(categories.value) || !categories.value.length) {
        await fetchCategories();
      }
      isReady.value = true;
    });
    async function fetchPriceMeta(category = null) {
      let url = "https://nuxt.meidanm.com/wp-json/wc/store/v1/products-meta";
      if (category) {
        url += `?category=${category}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      pendingPriceRange.value = {
        min: Number(data.min_price),
        max: Number(data.max_price)
      };
      return data;
    }
    const __returned__ = { $q, setVerticalScrollPosition, scrollToTop, categories, selectedCategory, search, currentPage, perPage, sortBy, filtersOpen, sortOptions, seoData, paginatedProducts, isReady, priceMin, priceMax, priceRange, fetchCategories, decodeHtml, categoryOptions, totalPages, totalProducts, priceChanged, onPriceChange, isHydrated, getSortParams, isFetching, pendingPriceRange, get requestId() {
      return requestId;
    }, set requestId(v) {
      requestId = v;
    }, hasSSRProducts, hasSelectedCategory, fetchPriceMeta, ref, computed, onMounted, watch, get api() {
      return WC;
    }, get useQuasar() {
      return useQuasar;
    }, get useMeta() {
      return useMeta;
    }, get scroll() {
      return scroll;
    }, get fetchSeoForPath() {
      return fetchSeoForPath;
    }, get productsStore() {
      return productsStore;
    }, get matKeyboardArrowLeft() {
      return matKeyboardArrowLeft;
    }, get matKeyboardArrowRight() {
      return matKeyboardArrowRight;
    }, get matArrowDropDown() {
      return matArrowDropDown;
    }, get matAutorenew() {
      return matAutorenew;
    }, get matClose() {
      return matClose;
    }, get matFilterList() {
      return matFilterList;
    }, ProductCard };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "main-wrapper-div" };
const _hoisted_2 = { class: "container" };
const _hoisted_3 = { class: "archive-layout flex no-wrap" };
const _hoisted_4 = {
  key: 1,
  class: "col-xs-12 col-md-6"
};
const _hoisted_5 = {
  key: 2,
  class: "col-xs-12 col-md-6"
};
const _hoisted_6 = {
  key: 3,
  class: "col-xs-12 col-md-6"
};
const _hoisted_7 = {
  key: 4,
  class: "col-xs-12 col-md-6"
};
const _hoisted_8 = {
  key: 5,
  class: "q-pa-md q-mb-md"
};
const _hoisted_9 = { class: "products-wrap" };
const _hoisted_10 = { class: "flex justify-between q-mb-md total-products" };
const _hoisted_11 = {
  key: 0,
  class: "text-subtitle1 q-mb-sm"
};
const _hoisted_12 = { class: "flex justify-between q-mb-md sticky" };
const _hoisted_13 = {
  key: 0,
  class: "products-inner row q-col-gutter-md"
};
const _hoisted_14 = {
  key: 1,
  class: "products-inner row q-col-gutter-md"
};
const _hoisted_15 = {
  key: 2,
  class: "text-center q-mt-lg"
};
const _hoisted_16 = {
  key: 3,
  class: "q-mt-lg flex flex-center pagination-btns"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createVNode(QBreadcrumbs, null, {
        default: withCtx(() => [
          createVNode(QBreadcrumbsEl, {
            label: "Home",
            to: "/"
          }),
          createVNode(QBreadcrumbsEl, { label: "Products" })
        ]),
        _: 1
      }),
      _cache[9] || (_cache[9] = createBaseVNode("h1", null, "Products", -1)),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", {
          class: normalizeClass(["filters-wrap flex", { "shown": $setup.filtersOpen }])
        }, [
          $setup.isHydrated && $setup.$q.screen.width <= 767 ? (openBlock(), createBlock(QBtn, {
            key: 0,
            icon: $setup.matClose,
            color: "secondary",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.filtersOpen = false)
          }, null, 8, ["icon"])) : createCommentVNode("", true),
          !$setup.isHydrated ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(QSkeleton, {
              type: "rect",
              class: "q-mb-md"
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
            createVNode(QInput, {
              filled: "",
              modelValue: $setup.search,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.search = $event),
              label: "Search products...",
              debounce: "300"
            }, null, 8, ["modelValue"])
          ])),
          !$setup.isHydrated || $setup.isHydrated && !Array.isArray($setup.categories) ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createVNode(QSkeleton, {
              type: "rect",
              class: "q-mb-md"
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(QCard, { class: "q-pa-md q-mb-md" }, {
              default: withCtx(() => [
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-subtitle1 q-mb-sm" }, " Filter by Category ", -1)),
                createVNode(QOptionGroup, {
                  modelValue: $setup.selectedCategory,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.selectedCategory = $event),
                  options: $setup.categoryOptions,
                  type: "checkbox",
                  color: "secondary"
                }, null, 8, ["modelValue", "options"])
              ]),
              _: 1
            })
          ])),
          !$setup.isHydrated || $setup.isHydrated && !$setup.priceMin ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(QSkeleton, {
              type: "rect",
              class: "q-mb-md"
            })
          ])) : (openBlock(), createBlock(QCard, {
            key: 6,
            class: "price-range-wrap q-pa-md q-mb-md"
          }, {
            default: withCtx(() => [
              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-subtitle1 q-mb-sm" }, "Filter by Price", -1)),
              createVNode(QRange, {
                modelValue: $setup.priceRange,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.priceRange = $event),
                min: $setup.priceMin,
                max: $setup.priceMax,
                "label-always": "",
                label: "",
                dense: "",
                color: "secondary",
                step: 0.01,
                onChange: $setup.onPriceChange
              }, null, 8, ["modelValue", "min", "max"])
            ]),
            _: 1
          }))
        ], 2),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            $setup.totalProducts ? (openBlock(), createElementBlock("div", _hoisted_11, " Found " + toDisplayString($setup.totalProducts || 0) + " product" + toDisplayString($setup.totalProducts === 1 ? "" : "s"), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_12, [
            createVNode(QSelect, {
              filled: "",
              modelValue: $setup.sortBy,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.sortBy = $event),
              label: "Sort by",
              "emit-value": "",
              "map-options": "",
              options: $setup.sortOptions,
              "dropdown-icon": $setup.matArrowDropDown,
              "loading-icon": $setup.matAutorenew,
              "clear-icon": $setup.matClose,
              color: "secondary"
            }, null, 8, ["modelValue", "dropdown-icon", "loading-icon", "clear-icon"]),
            $setup.isHydrated && $setup.$q.screen.width <= 767 ? (openBlock(), createBlock(QBtn, {
              key: 0,
              icon: $setup.matFilterList,
              label: "Filters",
              color: "secondary",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.filtersOpen = !$setup.filtersOpen)
            }, null, 8, ["icon"])) : createCommentVNode("", true)
          ]),
          $setup.productsStore.productsLoading.value && $setup.isHydrated ? (openBlock(), createElementBlock("div", _hoisted_13, [
            (openBlock(), createElementBlock(Fragment, null, renderList(6, (n) => {
              return createBaseVNode("div", {
                key: "skeleton-" + n,
                class: "col-xs-12 col-sm-6 col-md-4"
              }, [
                createVNode(QCard, { class: "my-card full-height" }, {
                  default: withCtx(() => [
                    createVNode(QSkeleton, {
                      height: "250px",
                      square: ""
                    }),
                    createVNode(QCardSection, null, {
                      default: withCtx(() => [
                        createVNode(QSkeleton, {
                          type: "text",
                          width: "70%"
                        }),
                        createVNode(QSkeleton, {
                          type: "text",
                          width: "40%"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QCardActions, { class: "q-gutter-sm" }, {
                      default: withCtx(() => [
                        createVNode(QSkeleton, {
                          type: "rect",
                          width: "100px",
                          height: "36px"
                        }),
                        createVNode(QSkeleton, {
                          type: "rect",
                          width: "70px",
                          height: "36px"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]);
            }), 64))
          ])) : $setup.paginatedProducts.length ? (openBlock(), createElementBlock("div", _hoisted_14, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.paginatedProducts, (product) => {
              return openBlock(), createElementBlock("div", {
                key: product.id,
                class: "col-xs-12 col-sm-6 col-md-4 relative-position"
              }, [
                createVNode($setup["ProductCard"], { product }, null, 8, ["product"])
              ]);
            }), 128))
          ])) : (openBlock(), createElementBlock("div", _hoisted_15, " No products found ")),
          $setup.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_16, [
            createVNode(QPagination, {
              modelValue: $setup.currentPage,
              "onUpdate:modelValue": [
                _cache[6] || (_cache[6] = ($event) => $setup.currentPage = $event),
                $setup.scrollToTop
              ],
              max: $setup.totalPages || 1,
              "max-pages": "6",
              "boundary-numbers": "",
              "direction-links": "",
              "icon-prev": $setup.matKeyboardArrowLeft,
              "icon-next": $setup.matKeyboardArrowRight,
              color: "secondary"
            }, null, 8, ["modelValue", "max", "icon-prev", "icon-next"])
          ])) : createCommentVNode("", true)
        ])
      ])
    ])
  ]);
}
const ProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-34f3321c"], ["__file", "ProductsPage.vue"]]);
export {
  ProductsPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLURnaWVpWlhOLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvUHJvZHVjdHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1haW4td3JhcHBlci1kaXZcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPHEtYnJlYWRjcnVtYnM+XHJcbiAgICAgICAgICA8cS1icmVhZGNydW1icy1lbCBsYWJlbD1cIkhvbWVcIiB0bz1cIi9cIiAvPlxyXG4gICAgICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgbGFiZWw9XCJQcm9kdWN0c1wiIC8+XHJcbiAgICAgICAgPC9xLWJyZWFkY3J1bWJzPlxyXG5cclxuXHJcbiAgICAgIDxoMT5Qcm9kdWN0czwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWxheW91dCBmbGV4IG5vLXdyYXBcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZpbHRlcnMtd3JhcCBmbGV4XCIgOmNsYXNzPVwieyAnc2hvd24nOiBmaWx0ZXJzT3BlbiB9XCIgPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gIHYtaWY9XCJpc0h5ZHJhdGVkICYmICRxLnNjcmVlbi53aWR0aCA8PSA3NjdcIlxyXG4gIDppY29uPVwibWF0Q2xvc2VcIlxyXG4gIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICBAY2xpY2s9XCJmaWx0ZXJzT3BlbiA9IGZhbHNlXCJcclxuLz5cclxuICAgICAgPCEtLSBTZWFyY2ggYW5kIEZpbHRlciAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC02XCIgdi1pZj1cIiFpc0h5ZHJhdGVkXCI+XHJcbiAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwicmVjdFwiIGNsYXNzPVwicS1tYi1tZFwiLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC02XCIgdi1lbHNlPlxyXG4gICAgICAgICAgICA8cS1pbnB1dCBmaWxsZWQgdi1tb2RlbD1cInNlYXJjaFwiIGxhYmVsPVwiU2VhcmNoIHByb2R1Y3RzLi4uXCIgZGVib3VuY2U9XCIzMDBcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC02XCIgIHYtaWY9XCIhaXNIeWRyYXRlZCB8fCBpc0h5ZHJhdGVkICYmICFBcnJheS5pc0FycmF5KGNhdGVnb3JpZXMpXCI+XHJcbiAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwicmVjdFwiIGNsYXNzPVwicS1tYi1tZFwiLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtNlwiIHYtZWxzZT5cclxuICAgICAgICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtbWItbWRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHEtbWItc21cIj5cclxuICAgICAgICAgICAgICBGaWx0ZXIgYnkgQ2F0ZWdvcnlcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxxLW9wdGlvbi1ncm91cFxyXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkQ2F0ZWdvcnlcIlxyXG4gICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJjYXRlZ29yeU9wdGlvbnNcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvcS1jYXJkPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWQgcS1tYi1tZFwiIHYtaWY9XCIhaXNIeWRyYXRlZCB8fCBpc0h5ZHJhdGVkICYmICFwcmljZU1pblwiPlxyXG4gICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJyZWN0XCIgY2xhc3M9XCJxLW1iLW1kXCIvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPHEtY2FyZFxyXG4gICAgICAgICAgICBjbGFzcz1cInByaWNlLXJhbmdlLXdyYXAgcS1wYS1tZCBxLW1iLW1kXCJcclxuICAgICAgICAgICAgdi1lbHNlXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHEtbWItc21cIj5GaWx0ZXIgYnkgUHJpY2U8L2Rpdj5cclxuICAgICAgICAgIDxxLXJhbmdlXHJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInByaWNlUmFuZ2VcIlxyXG4gICAgICAgICAgICAgIDptaW49XCJwcmljZU1pblwiXHJcbiAgICAgICAgICAgICAgOm1heD1cInByaWNlTWF4XCJcclxuICAgICAgICAgICAgICBsYWJlbC1hbHdheXNcclxuICAgICAgICAgICAgICBsYWJlbFxyXG4gICAgICAgICAgICAgIGRlbnNlXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICAgIDpzdGVwPVwiMC4wMVwiXHJcbiAgICAgICAgICAgICAgQGNoYW5nZT1cIm9uUHJpY2VDaGFuZ2VcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3EtY2FyZD5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RzLXdyYXBcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gcS1tYi1tZCB0b3RhbC1wcm9kdWN0c1wiPlxyXG4gICAgICA8IS0tIFRvdGFsIFByb2R1Y3RzIC0tPlxyXG4gICAgICA8ZGl2IHYtaWY9XCJ0b3RhbFByb2R1Y3RzXCIgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSBxLW1iLXNtXCI+XHJcbiAgICAgICAgRm91bmQge3sgdG90YWxQcm9kdWN0cyB8fCAwIH19IHByb2R1Y3R7eyB0b3RhbFByb2R1Y3RzID09PSAxID8gJycgOiAncycgfX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gcS1tYi1tZCBzdGlja3lcIj5cclxuICAgICAgICAgIDxxLXNlbGVjdFxyXG4gIGZpbGxlZFxyXG4gIHYtbW9kZWw9XCJzb3J0QnlcIlxyXG4gIGxhYmVsPVwiU29ydCBieVwiXHJcbiAgZW1pdC12YWx1ZVxyXG4gIG1hcC1vcHRpb25zXHJcbiAgOm9wdGlvbnM9XCJzb3J0T3B0aW9uc1wiXHJcbiAgOmRyb3Bkb3duLWljb249XCJtYXRBcnJvd0Ryb3BEb3duXCJcclxuICA6bG9hZGluZy1pY29uPVwibWF0QXV0b3JlbmV3XCJcclxuICA6Y2xlYXItaWNvbj1cIm1hdENsb3NlXCJcclxuICBjb2xvcj1cInNlY29uZGFyeVwiXHJcblxyXG4vPlxyXG4gICAgICAgICAgPHEtYnRuXHJcbiAgdi1pZj1cImlzSHlkcmF0ZWQgJiYgJHEuc2NyZWVuLndpZHRoIDw9IDc2N1wiXHJcbiAgOmljb249XCJtYXRGaWx0ZXJMaXN0XCJcclxuICBsYWJlbD1cIkZpbHRlcnNcIlxyXG4gIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICBAY2xpY2s9XCJmaWx0ZXJzT3BlbiA9ICFmaWx0ZXJzT3BlblwiXHJcbi8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IHYtaWY9XCJwcm9kdWN0c1N0b3JlLnByb2R1Y3RzTG9hZGluZy52YWx1ZSAmJiBpc0h5ZHJhdGVkXCIgY2xhc3M9XCJwcm9kdWN0cy1pbm5lciByb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XHJcbiAgPGRpdlxyXG4gICAgdi1mb3I9XCJuIGluIDZcIlxyXG4gICAgOmtleT1cIidza2VsZXRvbi0nICsgblwiXHJcbiAgICBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNFwiXHJcbiAgPlxyXG4gICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgZnVsbC1oZWlnaHRcIj5cclxuXHJcbiAgICAgIDwhLS0gSW1hZ2Ugc2tlbGV0b24gLS0+XHJcbiAgICAgIDxxLXNrZWxldG9uIGhlaWdodD1cIjI1MHB4XCIgc3F1YXJlIC8+XHJcblxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgPCEtLSBUaXRsZSAtLT5cclxuICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNzAlXCIgLz5cclxuXHJcbiAgICAgICAgPCEtLSBQcmljZSAtLT5cclxuICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNDAlXCIgLz5cclxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XHJcbiAgICAgICAgPCEtLSBCdXR0b25zIC0tPlxyXG4gICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJyZWN0XCIgd2lkdGg9XCIxMDBweFwiIGhlaWdodD1cIjM2cHhcIiAvPlxyXG4gICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJyZWN0XCIgd2lkdGg9XCI3MHB4XCIgaGVpZ2h0PVwiMzZweFwiIC8+XHJcbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XHJcblxyXG4gICAgPC9xLWNhcmQ+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4gICAgICA8ZGl2IHYtZWxzZS1pZj1cInBhZ2luYXRlZFByb2R1Y3RzLmxlbmd0aFwiIGNsYXNzPVwicHJvZHVjdHMtaW5uZXIgcm93IHEtY29sLWd1dHRlci1tZFwiPlxyXG4gICAgICAgIDwhLS0gUHJvZHVjdCBHcmlkIC0tPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHYtZm9yPVwicHJvZHVjdCBpbiBwYWdpbmF0ZWRQcm9kdWN0c1wiXHJcbiAgICAgICAgICA6a2V5PVwicHJvZHVjdC5pZFwiXHJcbiAgICAgICAgICBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNCByZWxhdGl2ZS1wb3NpdGlvblwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFByb2R1Y3RDYXJkIDpwcm9kdWN0PVwicHJvZHVjdFwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tIEVtcHR5IC0tPlxyXG4gICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInRleHQtY2VudGVyIHEtbXQtbGdcIj5cclxuICAgICAgICBObyBwcm9kdWN0cyBmb3VuZFxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwhLS0gUGFnaW5hdGlvbiAtLT5cclxuICAgICAgPGRpdiB2LWlmPVwidG90YWxQYWdlcyA+IDFcIiBjbGFzcz1cInEtbXQtbGcgZmxleCBmbGV4LWNlbnRlciBwYWdpbmF0aW9uLWJ0bnNcIj5cclxuICAgICAgICA8cS1wYWdpbmF0aW9uXHJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJjdXJyZW50UGFnZVwiXHJcbiAgICAgICAgICAgIDptYXg9XCJ0b3RhbFBhZ2VzIHx8IDFcIlxyXG4gICAgICAgICAgICBtYXgtcGFnZXM9XCI2XCJcclxuICAgICAgICAgICAgYm91bmRhcnktbnVtYmVyc1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24tbGlua3NcclxuICAgICAgICAgICAgOmljb24tcHJldj1cIm1hdEtleWJvYXJkQXJyb3dMZWZ0XCJcclxuICAgICAgICAgICAgOmljb24tbmV4dD1cIm1hdEtleWJvYXJkQXJyb3dSaWdodFwiXHJcbiAgICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNjcm9sbFRvVG9wXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0IHNldHVwPlxyXG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCBvbk1vdW50ZWQsIHdhdGNoIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgYXBpIGZyb20gJ3NyYy9ib290L3dvb2NvbW1lcmNlJ1xyXG5pbXBvcnQgeyB1c2VRdWFzYXIsIHVzZU1ldGEsIHNjcm9sbCB9IGZyb20gJ3F1YXNhcidcclxuaW1wb3J0IHsgZmV0Y2hTZW9Gb3JQYXRoIH0gZnJvbSAnc3JjL2NvbXBvc2FibGVzL3VzZVNlbydcclxuaW1wb3J0IHByb2R1Y3RzU3RvcmUgZnJvbSAnc3JjL3N0b3Jlcy9wcm9kdWN0cydcclxuaW1wb3J0IHsgbWF0S2V5Ym9hcmRBcnJvd0xlZnQsIG1hdEtleWJvYXJkQXJyb3dSaWdodCwgbWF0QXJyb3dEcm9wRG93biwgbWF0QXV0b3JlbmV3LCBtYXRDbG9zZSwgbWF0RmlsdGVyTGlzdCB9IGZyb20gJ0BxdWFzYXIvZXh0cmFzL21hdGVyaWFsLWljb25zJ1xyXG5pbXBvcnQgUHJvZHVjdENhcmQgZnJvbSAnc3JjL2NvbXBvbmVudHMvUHJvZHVjdENhcmQudnVlJ1xyXG5cclxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG5jb25zdCB7IHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gfSA9IHNjcm9sbFxyXG5cclxuZnVuY3Rpb24gc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgLy8gT3B0aW9uIEE6IFNtb290aCBzY3JvbGwgdXNpbmcgUXVhc2FyIHV0aWxpdHkgKEJlc3QgZmVlbClcclxuICAvLyB3aW5kb3cgaXMgdGhlIHRhcmdldCwgMCBpcyB0aGUgcG9zaXRpb24sIDMwMCBpcyB0aGUgZHVyYXRpb24gaW4gbXNcclxuICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKHdpbmRvdywgMTg3LCAzMDApXHJcblxyXG4gIC8vIE9wdGlvbiBCOiBJbnN0YW50IGp1bXAgKEZhc3Rlc3QgZmVlbClcclxuICAvLyB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcclxufVxyXG4vLyBSZWZzIGFuZCBzdGF0ZVxyXG5jb25zdCBjYXRlZ29yaWVzID0gcmVmKFtdKVxyXG5jb25zdCBzZWxlY3RlZENhdGVnb3J5ID0gcmVmKFtdKVxyXG5jb25zdCBzZWFyY2ggPSByZWYoJycpXHJcbmNvbnN0IGN1cnJlbnRQYWdlID0gcmVmKDEpXHJcbmNvbnN0IHBlclBhZ2UgPSA2XHJcbmNvbnN0IHNvcnRCeSA9IHJlZignbWVudV9vcmRlcicpXHJcbmNvbnN0IGZpbHRlcnNPcGVuID0gcmVmKGZhbHNlKVxyXG5jb25zdCBzb3J0T3B0aW9ucyA9IFtcclxuICB7IGxhYmVsOiAnRGVmYXVsdCcsIHZhbHVlOiAnbWVudV9vcmRlcicgfSxcclxuICB7IGxhYmVsOiAnTmV3ZXN0JywgdmFsdWU6ICdkYXRlX2Rlc2MnIH0sXHJcbiAgeyBsYWJlbDogJ1ByaWNlOiBMb3cgdG8gSGlnaCcsIHZhbHVlOiAncHJpY2VfYXNjJyB9LFxyXG4gIHsgbGFiZWw6ICdQcmljZTogSGlnaCB0byBMb3cnLCB2YWx1ZTogJ3ByaWNlX2Rlc2MnIH0sXHJcbiAgeyBsYWJlbDogJ05hbWU6IEEgdG8gWicsIHZhbHVlOiAndGl0bGVfYXNjJyB9LFxyXG4gIHsgbGFiZWw6ICdOYW1lOiBaIHRvIEEnLCB2YWx1ZTogJ3RpdGxlX2Rlc2MnIH0sXHJcbiAgeyBsYWJlbDogJ1BvcHVsYXJpdHknLCB2YWx1ZTogJ3BvcHVsYXJpdHknIH0sXHJcbiAgeyBsYWJlbDogJ1JhdGluZycsIHZhbHVlOiAncmF0aW5nJyB9XHJcbl1cclxuLy8gRmV0Y2ggU0VPIGRhdGEgZHVyaW5nIFNTUlxyXG4vLyDwn5+iIFJ1biBvbiBTU1Igb25seVxyXG4vLyBJbnNpZGUgeW91ciBQYWdlIG9yIExheW91dFxyXG5kZWZpbmVPcHRpb25zKHtcclxuICBhc3luYyBwcmVGZXRjaCAoeyBzc3JDb250ZXh0LCBjdXJyZW50Um91dGUgfSkge1xyXG4gICAgY29uc29sZS5sb2coJy0tLSBQcmVGZXRjaCBSdW5uaW5nIGZvcjonLCBjdXJyZW50Um91dGUucGF0aClcclxuICAgIGNvbnN0IHNlbyA9IGF3YWl0IGZldGNoU2VvRm9yUGF0aCgnc2hvcCcpXHJcblxyXG4gICAgLy8g4pyFIEFMV0FZUyBmZXRjaCBTRU8gKGxpZ2h0d2VpZ2h0KVxyXG5cclxuICAgIGxldCBwcm9kdWN0cyA9IFtdXHJcbiAgICBsZXQgY2F0ZWdvcmllcyA9IFtdXHJcbiAgICBsZXQgcHJpY2VNZXRhID0gbnVsbFxyXG5cclxuICAgIGlmIChzc3JDb250ZXh0KSB7XHJcbiAgICAgIC8vIPCfn6IgT05MWSBCTE9DSyBTU1JcclxuICAgICAgcHJvZHVjdHMgPSBhd2FpdCBwcm9kdWN0c1N0b3JlLnByZUZldGNoUHJvZHVjdHMoe1xyXG4gICAgICAgIGFwaTogdHJ1ZSxcclxuICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgIHBlcl9wYWdlOiA2LFxyXG4gICAgICB9KVxyXG5cclxuICAgICAgY2F0ZWdvcmllcyA9IGF3YWl0IGFwaS5nZXRDYXRlZ29yaWVzKClcclxuXHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCdodHRwczovL251eHQubWVpZGFubS5jb20vd3AtanNvbi93Yy9zdG9yZS92MS9wcm9kdWN0cy1tZXRhJylcclxuICAgICAgcHJpY2VNZXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG5cclxuICAgICAgc3NyQ29udGV4dC5wcm9kdWN0c0RhdGEgPSBwcm9kdWN0c1xyXG4gICAgICBzc3JDb250ZXh0LmNhdGVnb3JpZXNEYXRhID0gY2F0ZWdvcmllc1xyXG4gICAgICBzc3JDb250ZXh0LnByaWNlTWV0YURhdGEgPSBwcmljZU1ldGFcclxuICAgICAgc3NyQ29udGV4dC5wcm9kdWN0c1RvdGFsID0gcHJvZHVjdHNTdG9yZS50b3RhbFByb2R1Y3RzLnZhbHVlXHJcbiAgICAgIHNzckNvbnRleHQucGFnZXNUb3RhbCA9IHByb2R1Y3RzU3RvcmUudG90YWxQYWdlcy52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzc3JDb250ZXh0KSB7XHJcbiAgICAgIHNzckNvbnRleHQuc2VvRGF0YSA9IHNlb1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IHNlb0RhdGEgPSByZWYoe1xyXG4gIHRpdGxlOiAnUHJvZHVjdHMnLFxyXG4gIGRlc2NyaXB0aW9uOiAnUHJvZHVjdHMgZGVzY3JpcHRpb24nXHJcbn0pO1xyXG4vLyBUaGlzIG9ubHkgcnVucyBpbiB0aGUgYnJvd3NlclxyXG5pZiAocHJvY2Vzcy5lbnYuQ0xJRU5UKSB7XHJcbiAgaWYgKHdpbmRvdy5fX1NFT19EQVRBX18pIHtcclxuICAgIHNlb0RhdGEudmFsdWUgPSB3aW5kb3cuX19TRU9fREFUQV9fXHJcbiAgfVxyXG5cclxuICB1c2VNZXRhKCgpID0+IHtcclxuICAgIGNvbnN0IHNlbyA9IHNlb0RhdGEudmFsdWU7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogc2VvPy50aXRsZSB8fCAnTmF0dXJhQmxvb20nLFxyXG4gICAgICBtZXRhOiB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IHtcclxuICAgICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICBjb250ZW50OiBzZW8/LmRlc2NyaXB0aW9uIHx8IFwiTGV0J3MgQmxvb20gVG9nZXRoZXJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29nOnRpdGxlJzoge1xyXG4gICAgICAgICAgcHJvcGVydHk6ICdvZzp0aXRsZScsXHJcbiAgICAgICAgICBjb250ZW50OiBzZW8/LnRpdGxlIHx8ICdOYXR1cmFCbG9vbSdcclxuICAgICAgICB9LFxyXG4gICAgICAgICdvZzpkZXNjcmlwdGlvbic6IHtcclxuICAgICAgICAgIHByb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgY29udGVudDogc2VvPy5kZXNjcmlwdGlvbiB8fCBcIkxldCdzIEJsb29tIFRvZ2V0aGVyXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5jb25zdCBwYWdpbmF0ZWRQcm9kdWN0cyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICByZXR1cm4gcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZSB8fCBbXVxyXG59KVxyXG5cclxuY29uc3QgaXNSZWFkeSA9IHJlZihmYWxzZSlcclxuLy8gUHJpY2UgZmlsdGVyXHJcbmNvbnN0IHByaWNlTWluID0gcmVmKG51bGwpXHJcbmNvbnN0IHByaWNlTWF4ID0gcmVmKG51bGwpXHJcbmNvbnN0IHByaWNlUmFuZ2UgPSByZWYoeyBtaW46IDAsIG1heDogMTAwMCB9KVxyXG5cclxuaWYgKHByb2Nlc3MuZW52LkNMSUVOVCkge1xyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheSh3aW5kb3cuX19QUk9EVUNUU19EQVRBX18pICYmIHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXy5sZW5ndGgpIHtcclxuICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUgPSB3aW5kb3cuX19QUk9EVUNUU19EQVRBX19cclxuICAgIHByb2R1Y3RzU3RvcmUuaW5pdGlhbGl6ZWQudmFsdWUgPSB0cnVlXHJcbiAgfVxyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheSh3aW5kb3cuX19DQVRFR09SSUVTX0RBVEFfXykpIHtcclxuICAgIGNhdGVnb3JpZXMudmFsdWUgPSB3aW5kb3cuX19DQVRFR09SSUVTX0RBVEFfX1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXRlZ29yaWVzLnZhbHVlID0gW10gLy8g8J+UpSBjcml0aWNhbCBmYWxsYmFja1xyXG4gIH1cclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkod2luZG93Ll9fQ0FURUdPUklFU19EQVRBX18pKSB7XHJcbiAgICBwcmljZU1pbi52YWx1ZSA9IE51bWJlcih3aW5kb3cuX19QUklDRV9NRVRBX18ubWluX3ByaWNlKVxyXG4gICAgcHJpY2VNYXgudmFsdWUgPSBOdW1iZXIod2luZG93Ll9fUFJJQ0VfTUVUQV9fLm1heF9wcmljZSlcclxuICAgIHByaWNlUmFuZ2UudmFsdWUgPSB7XHJcbiAgICAgIG1pbjogTnVtYmVyKHdpbmRvdy5fX1BSSUNFX01FVEFfXy5taW5fcHJpY2UpLFxyXG4gICAgICBtYXg6IE51bWJlcih3aW5kb3cuX19QUklDRV9NRVRBX18ubWF4X3ByaWNlKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8g8J+UpSBUSElTIENIQU5HRVMgRVZFUllUSElOR1xyXG4gIGlzUmVhZHkudmFsdWUgPSB0cnVlXHJcbn1cclxuLy8gRmV0Y2ggY2F0ZWdvcmllc1xyXG5jb25zdCBmZXRjaENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgY2F0ZWdvcmllcy52YWx1ZSA9IGF3YWl0IGFwaS5nZXRDYXRlZ29yaWVzKClcclxufVxyXG5cclxuY29uc3QgZGVjb2RlSHRtbCA9IChodG1sKSA9PiB7XHJcbiAgY29uc3QgdHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xyXG4gIHR4dC5pbm5lckhUTUwgPSBodG1sO1xyXG4gIHJldHVybiB0eHQudmFsdWU7XHJcbn07XHJcblxyXG4vLyBDb21wdXRlZDogY2F0ZWdvcnkgb3B0aW9uc1xyXG5jb25zdCBjYXRlZ29yeU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGNhdGVnb3JpZXMudmFsdWUpKSByZXR1cm4gW11cclxuXHJcbiAgcmV0dXJuIGNhdGVnb3JpZXMudmFsdWUubWFwKChjYXQpID0+ICh7XHJcbiAgICBsYWJlbDogZGVjb2RlSHRtbChjYXQubmFtZSksXHJcbiAgICB2YWx1ZTogY2F0LmlkXHJcbiAgfSkpXHJcbn0pXHJcblxyXG5cclxuXHJcbi8vIENvbXB1dGVkOiBwYWdpbmF0aW9uXHJcbmNvbnN0IHRvdGFsUGFnZXMgPSBjb21wdXRlZCgoKSA9PiBwcm9kdWN0c1N0b3JlLnRvdGFsUGFnZXMudmFsdWUpXHJcbmNvbnN0IHRvdGFsUHJvZHVjdHMgPSBjb21wdXRlZCgoKSA9PiBwcm9kdWN0c1N0b3JlLnRvdGFsUHJvZHVjdHMudmFsdWUpXHJcbmlmIChwcm9jZXNzLmVudi5DTElFTlQgJiYgd2luZG93Ll9fUFJPRFVDVFNfVE9UQUxfXykge1xyXG4gIHByb2R1Y3RzU3RvcmUudG90YWxQcm9kdWN0cy52YWx1ZSA9IHdpbmRvdy5fX1BST0RVQ1RTX1RPVEFMX19cclxufVxyXG5pZiAocHJvY2Vzcy5lbnYuQ0xJRU5UICYmIHdpbmRvdy5fX1BBR0VTX1RPVEFMX18pIHtcclxuICBwcm9kdWN0c1N0b3JlLnRvdGFsUGFnZXMudmFsdWUgPSB3aW5kb3cuX19QQUdFU19UT1RBTF9fXHJcbn1cclxuXHJcbmNvbnN0IHByaWNlQ2hhbmdlZCA9IHJlZigwKVxyXG5cclxuZnVuY3Rpb24gb25QcmljZUNoYW5nZSgpIHtcclxuICBwcmljZUNoYW5nZWQudmFsdWUrKyAvLyB0cmlnZ2VyIHdhdGNoZXIgbWFudWFsbHlcclxufVxyXG5jb25zdCBpc0h5ZHJhdGVkID0gcmVmKGZhbHNlKVxyXG4vLyBXYXRjaCBwcmljZSByYW5nZVxyXG5cclxuZnVuY3Rpb24gZ2V0U29ydFBhcmFtcyhzb3J0KSB7XHJcbiAgc3dpdGNoIChzb3J0KSB7XHJcbiAgICBjYXNlICdwcmljZV9hc2MnOlxyXG4gICAgICByZXR1cm4geyBvcmRlcmJ5OiAncHJpY2UnLCBvcmRlcjogJ2FzYycgfVxyXG5cclxuICAgIGNhc2UgJ3ByaWNlX2Rlc2MnOlxyXG4gICAgICByZXR1cm4geyBvcmRlcmJ5OiAncHJpY2UnLCBvcmRlcjogJ2Rlc2MnIH1cclxuXHJcbiAgICBjYXNlICdkYXRlX2Rlc2MnOlxyXG4gICAgICByZXR1cm4geyBvcmRlcmJ5OiAnZGF0ZScsIG9yZGVyOiAnZGVzYycgfVxyXG5cclxuICAgIGNhc2UgJ3RpdGxlX2FzYyc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICd0aXRsZScsIG9yZGVyOiAnYXNjJyB9XHJcblxyXG4gICAgY2FzZSAndGl0bGVfZGVzYyc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICd0aXRsZScsIG9yZGVyOiAnZGVzYycgfVxyXG5cclxuICAgIGNhc2UgJ3BvcHVsYXJpdHknOlxyXG4gICAgICByZXR1cm4geyBvcmRlcmJ5OiAncG9wdWxhcml0eScsIG9yZGVyOiAnZGVzYycgfVxyXG5cclxuICAgIGNhc2UgJ3JhdGluZyc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICdyYXRpbmcnLCBvcmRlcjogJ2Rlc2MnIH1cclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4geyBvcmRlcmJ5OiAnbWVudV9vcmRlcicsIG9yZGVyOiAnZGVzYycgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgaXNGZXRjaGluZyA9IHJlZihmYWxzZSlcclxuY29uc3QgcGVuZGluZ1ByaWNlUmFuZ2UgPSByZWYobnVsbClcclxubGV0IHJlcXVlc3RJZCA9IDBcclxud2F0Y2goXHJcbiAgKCkgPT4gKHtcclxuICAgIGNhdGVnb3J5OiBzZWxlY3RlZENhdGVnb3J5LnZhbHVlLFxyXG4gICAgc2VhcmNoOiBzZWFyY2gudmFsdWUsXHJcbiAgICBwYWdlOiBjdXJyZW50UGFnZS52YWx1ZSxcclxuICAgIHNvcnQ6IHNvcnRCeS52YWx1ZSxcclxuICAgIHByaWNlVHJpZ2dlcjogcHJpY2VDaGFuZ2VkLnZhbHVlIC8vIOKchSBvbmx5IHRyaWdnZXIgd2hlbiB1c2VyIHJlbGVhc2VzIHNsaWRlclxyXG4gIH0pLFxyXG4gIGFzeW5jIChmaWx0ZXJzLCBwcmV2KSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgIWlzUmVhZHkudmFsdWUgfHxcclxuICBwcmljZVJhbmdlLnZhbHVlLm1pbiA9PT0gbnVsbCB8fFxyXG4gIHByaWNlUmFuZ2UudmFsdWUubWF4ID09PSBudWxsXHJcbiAgICApIHJldHVyblxyXG4gICAgaWYgKGlzRmV0Y2hpbmcudmFsdWUpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRSZXF1ZXN0ID0gKytyZXF1ZXN0SWRcclxuXHJcbmNvbnN0IGNhdGVnb3J5Q2hhbmdlZCA9XHJcbiAgcHJldiAmJlxyXG4gIEpTT04uc3RyaW5naWZ5KFsuLi5maWx0ZXJzLmNhdGVnb3J5XS5zb3J0KCkpICE9PVxyXG4gIEpTT04uc3RyaW5naWZ5KFsuLi5wcmV2LmNhdGVnb3J5XS5zb3J0KCkpXHJcbiAgICAvKmlmIChjYXRlZ29yeUNoYW5nZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0NhdGVnb3J5IGNoYW5nZWQg4oaSIGZldGNoaW5nIHByaWNlIG1ldGEnKVxyXG5cclxuICAgICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0c0xvYWRpbmcudmFsdWUgPSB0cnVlXHJcbiAgICAgIGF3YWl0IGZldGNoUHJpY2VNZXRhKGZpbHRlcnMuY2F0ZWdvcnkpXHJcblxyXG4gICAgICAvL3JldHVyblxyXG4gICAgfSovXHJcbiAgICBpZiAoY2F0ZWdvcnlDaGFuZ2VkKSB7XHJcbiAgICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxyXG5cclxuICAgICAgYXdhaXQgZmV0Y2hQcmljZU1ldGEoZmlsdGVycy5jYXRlZ29yeSlcclxuXHJcbiAgICAgIHByaWNlTWluLnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUubWluXHJcbiAgICAgIHByaWNlTWF4LnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUubWF4XHJcbiAgICAgIHByaWNlUmFuZ2UudmFsdWUgPSB7XHJcbiAgICAgICAgbWluOiBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5taW4sXHJcbiAgICAgICAgbWF4OiBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5tYXhcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgICBwcmV2ICYmXHJcbiAgICAgICAgKGZpbHRlcnMuc2VhcmNoICE9PSBwcmV2LnNlYXJjaCB8fFxyXG4gICAgICAgICAgICBmaWx0ZXJzLnByaWNlVHJpZ2dlciAhPT0gcHJldi5wcmljZVRyaWdnZXIpXHJcbiAgICApIHtcclxuICAgICAgaWYgKGN1cnJlbnRQYWdlLnZhbHVlICE9PSAxKSB7XHJcbiAgICAgICAgY3VycmVudFBhZ2UudmFsdWUgPSAxXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0ZldGNoaW5nLnZhbHVlID0gdHJ1ZVxyXG5pZiAoY3VycmVudFJlcXVlc3QgIT09IHJlcXVlc3RJZCkgcmV0dXJuXHJcbiAgICBjb25zb2xlLmxvZygnUHJvZHVjdHMgZmV0Y2ggd2F0Y2hlciB0cmlnZ2VyZWQhISEnKVxyXG4vKmNvbnN0IHNvdXJjZSA9IGNhdGVnb3J5Q2hhbmdlZFxyXG4gID8gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWVcclxuICA6IHByaWNlUmFuZ2UudmFsdWUqL1xyXG4gICAgY29uc3Qgc291cmNlID0gcHJpY2VSYW5nZS52YWx1ZVxyXG5cclxuY29uc3QgbWluID0gTWF0aC5mbG9vcihzb3VyY2UubWluICogMTAwKVxyXG5jb25zdCBtYXggPSBNYXRoLmNlaWwoc291cmNlLm1heCAqIDEwMClcclxuY29uc29sZS5sb2coJz09PT09PT09PT0gRklMVEVSIERFQlVHID09PT09PT09PT0nKVxyXG5jb25zb2xlLmxvZygnc2VsZWN0ZWRDYXRlZ29yeTonLCBmaWx0ZXJzLmNhdGVnb3J5KVxyXG5jb25zb2xlLmxvZygnam9pbmVkIGNhdGVnb3J5OicsIGZpbHRlcnMuY2F0ZWdvcnkuam9pbignLCcpKVxyXG5jb25zb2xlLmxvZygnc2VhcmNoOicsIGZpbHRlcnMuc2VhcmNoKVxyXG5jb25zb2xlLmxvZygncGFnZTonLCBmaWx0ZXJzLnBhZ2UpXHJcbmNvbnNvbGUubG9nKCdwcmljZVJhbmdlOicsIHByaWNlUmFuZ2UudmFsdWUpXHJcbmNvbnNvbGUubG9nKCdtaW4vbWF4OicsIG1pbiwgbWF4KVxyXG5jb25zb2xlLmxvZygnY2F0ZWdvcnlDaGFuZ2VkOicsIGNhdGVnb3J5Q2hhbmdlZClcclxuY29uc29sZS5sb2coJ3JlcXVlc3RJZDonLCBjdXJyZW50UmVxdWVzdClcclxuXHJcbiAgICBjb25zdCBzb3J0UGFyYW1zID0gZ2V0U29ydFBhcmFtcyhmaWx0ZXJzLnNvcnQpXHJcbiAgICBjb25zb2xlLmxvZyhzb3J0UGFyYW1zKVxyXG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5wcmVGZXRjaFByb2R1Y3RzKHtcclxuICAgICAgYXBpOiB0cnVlLFxyXG4gICAgICBwYWdlOiBmaWx0ZXJzLnBhZ2UsXHJcbiAgICAgIHBlcl9wYWdlOiBwZXJQYWdlLFxyXG4gICAgICBtaW5fcHJpY2U6IG1pbixcclxuICAgICAgbWF4X3ByaWNlOiBtYXgsXHJcbiAgICAgIGNhdGVnb3J5OiBmaWx0ZXJzLmNhdGVnb3J5Lmxlbmd0aFxyXG4gICAgICAgICAgPyBmaWx0ZXJzLmNhdGVnb3J5LmpvaW4oJywnKVxyXG4gICAgICAgICAgOiBudWxsLFxyXG4gICAgICBzZWFyY2g6IGZpbHRlcnMuc2VhcmNoLFxyXG4gICAgICAuLi5zb3J0UGFyYW1zXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIDQuIE5PVyB1cGRhdGUgVUkgdG9nZXRoZXIg8J+SpVxyXG5pZiAoY2F0ZWdvcnlDaGFuZ2VkKSB7XHJcbiAgcHJpY2VNaW4udmFsdWUgPSBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5taW5cclxuICBwcmljZU1heC52YWx1ZSA9IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1heFxyXG4gIHByaWNlUmFuZ2UudmFsdWUgPSBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZVxyXG59XHJcbiAgICBpc0ZldGNoaW5nLnZhbHVlID0gZmFsc2VcclxuICB9XHJcbilcclxuY29uc3QgaGFzU1NSUHJvZHVjdHMgPVxyXG4gIHByb2Nlc3MuZW52LkNMSUVOVCAmJlxyXG4gIEFycmF5LmlzQXJyYXkod2luZG93Ll9fUFJPRFVDVFNfREFUQV9fKSAmJlxyXG4gIHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXy5sZW5ndGggPiAwXHJcbmNvbnN0IGhhc1NlbGVjdGVkQ2F0ZWdvcnkgPVxyXG4gIHByb2Nlc3MuZW52LkNMSUVOVCAmJlxyXG4gIHdpbmRvdy5fX1NFTEVDVEVEX0NBVEVHT1JZX0RBVEFfXyAmJlxyXG4gIE9iamVjdC5rZXlzKHdpbmRvdy5fX1NFTEVDVEVEX0NBVEVHT1JZX0RBVEFfXykubGVuZ3RoID4gMFxyXG4vLyBMaWZlY3ljbGVcclxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcclxuICBpc0h5ZHJhdGVkLnZhbHVlID0gdHJ1ZVxyXG5cclxuICBjb25zb2xlLmxvZyhoYXNTZWxlY3RlZENhdGVnb3J5KVxyXG4gIC8vIPCfn6IgRmV0Y2ggbWlzc2luZyBkYXRhIG9ubHkgaWYgbmVlZGVkXHJcbiAgaWYgKCFoYXNTU1JQcm9kdWN0cyB8fCBoYXNTZWxlY3RlZENhdGVnb3J5KSB7XHJcbiAgICBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlID0gW11cclxuICAgIHByb2R1Y3RzU3RvcmUucHJlRmV0Y2hQcm9kdWN0cyh7XHJcbiAgICAgIGFwaTogdHJ1ZSxcclxuICAgICAgcGFnZTogMSxcclxuICAgICAgcGVyX3BhZ2U6IHBlclBhZ2VcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBpZiAoIXByaWNlTWluLnZhbHVlKSB7XHJcbiAgICBhd2FpdCBmZXRjaFByaWNlTWV0YSgpXHJcbiAgICBwcmljZVJhbmdlLnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWVcclxuICAgIHByaWNlTWluLnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUubWluXHJcbiAgICBwcmljZU1heC52YWx1ZSA9IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1heFxyXG4gIH1cclxuXHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGNhdGVnb3JpZXMudmFsdWUpIHx8ICFjYXRlZ29yaWVzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgYXdhaXQgZmV0Y2hDYXRlZ29yaWVzKClcclxuICB9XHJcblxyXG5cclxuXHJcbiAgaXNSZWFkeS52YWx1ZSA9IHRydWVcclxufSlcclxuLy8gRnVuY3Rpb24gdG8gcmVjYWxjdWxhdGUgcHJpY2UgbGltaXRzIGJhc2VkIG9uIGEgcHJvZHVjdCBsaXN0XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaFByaWNlTWV0YShjYXRlZ29yeSA9IG51bGwpIHtcclxuICBsZXQgdXJsID0gJ2h0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3djL3N0b3JlL3YxL3Byb2R1Y3RzLW1ldGEnXHJcblxyXG4gIGlmIChjYXRlZ29yeSkge1xyXG4gICAgdXJsICs9IGA/Y2F0ZWdvcnk9JHtjYXRlZ29yeX1gXHJcbiAgfVxyXG5cclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpXHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcclxuXHJcbiAgLy8g4p2XIERPTidUIHVwZGF0ZSBVSSB5ZXRcclxuICBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZSA9IHtcclxuICAgIG1pbjogTnVtYmVyKGRhdGEubWluX3ByaWNlKSxcclxuICAgIG1heDogTnVtYmVyKGRhdGEubWF4X3ByaWNlKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhdGFcclxufVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQ+XHJcbkBpbXBvcnQgJ3NyYy9jc3MvcHJvZHVjdC1hcmNoaXZlLmNzcyc7XHJcbjwvc3R5bGU+XHJcbiJdLCJuYW1lcyI6WyJhcGkiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlVk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlQmxvY2siLCJfdG9EaXNwbGF5U3RyaW5nIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQStMQSxNQUFNLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFoQmhCLFVBQU0sS0FBSyxVQUFBO0FBQ1gsVUFBTSxFQUFFLDhCQUE4QjtBQUV0QyxhQUFTLGNBQWM7QUFHckIsZ0NBQTBCLFFBQVEsS0FBSyxHQUFHO0FBQUEsSUFJNUM7QUFFQSxVQUFNLGFBQWEsSUFBSSxFQUFFO0FBQ3pCLFVBQU0sbUJBQW1CLElBQUksRUFBRTtBQUMvQixVQUFNLFNBQVMsSUFBSSxFQUFFO0FBQ3JC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
