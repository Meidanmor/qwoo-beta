import { Q as QBreadcrumbsEl, a as QBreadcrumbs } from "./QBreadcrumbs-DAF5pwlv.js";
import { _ as _export_sfc, Q as QBtn, i as QInput, a7 as QOptionGroup, j as QCard, a8 as WC, J as productsStore, q as useRoute, a9 as matFilterList, m as matClose, aa as matAutorenew, a4 as matArrowDropDown, ab as matKeyboardArrowRight, ac as matKeyboardArrowLeft, ad as QCardSection, ae as QCardActions } from "./index-DDAg5YDa.js";
import { Q as QSkeleton, a as QRange, b as QPagination } from "./QPagination-lLA2xbvQ.js";
import { Q as QSelect } from "./QSelect-xmC19IVN.js";
import { u as useQuasar } from "./use-quasar-D_HwOQSM.js";
import { u as useMeta } from "./use-meta-BVxOmsjs.js";
import { o as openBlock, m as createElementBlock, a9 as createBaseVNode, t as createVNode, q as withCtx, ae as normalizeClass, p as createBlock, u as createCommentVNode, ac as toDisplayString, aa as Fragment, ab as renderList, aq as scroll, j as ref, v as watch, x as onMounted, am as useSSRContext, e as computed } from "./quasar-observers-delayed-tSHCOYpR.js";
import { fetchSeoForPath } from "./useSeo-DQlkSlEM.js";
import { P as ProductCard } from "./ProductCard-DoDbkxcv.js";
import "./QChip-CN1ZGBoZ.js";
import "./QItem-D74-s_Zr.js";
import "./QItemSection-Em5VwD4r.js";
const perPage = 6;
const _sfc_main = /* @__PURE__ */ Object.assign({
  async preFetch({ ssrContext, currentRoute }) {
    const seo = await fetchSeoForPath("shop");
    let categories = [];
    let currentCat = null;
    let priceMeta = null;
    categories = await WC.getCategories();
    currentCat = categories.find((c) => c.slug === currentRoute.params.slug) || null;
    const productsQuery = {
      api: true,
      page: 1,
      per_page: 6,
      category: currentCat ? currentCat.id : null
    };
    const priceUrl = currentCat ? `https://nuxt.meidanm.com/wp-json/wc/store/v1/products-meta?category=${currentCat.id}` : "https://nuxt.meidanm.com/wp-json/wc/store/v1/products-meta";
    const [products, priceRes] = await Promise.all([
      productsStore.preFetchProducts(productsQuery),
      fetch(priceUrl).then((r) => r.json())
    ]);
    priceMeta = priceRes;
    if (ssrContext) {
      ssrContext.productsData = products;
      ssrContext.categoriesData = categories;
      ssrContext.selectedCategoryData = currentCat || null;
      ssrContext.ssrQuery = productsQuery;
      ssrContext.priceMetaData = priceMeta;
      ssrContext.productsTotal = productsStore.totalProducts.value;
      ssrContext.pagesTotal = productsStore.totalPages.value;
      ssrContext.seoData = seo;
    } else {
      productsStore.products.value = products;
      productsStore.initialized.value = true;
      productsStore.productsLoading.value = false;
      window.__CATEGORIES_DATA__ = categories;
    }
  }
}, {
  __name: "CategoryPage",
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
    const route = useRoute();
    const categorySlug = ref(route.params.slug || null);
    const selectedCategoryOBJ = ref(null);
    const seoData = ref({
      title: "Products",
      description: "Products description"
    });
    const isReady = ref(false);
    const priceMin = ref(null);
    const priceMax = ref(null);
    const priceRange = ref({ min: 0, max: 1e3 });
    const priceChanged = ref(0);
    function onPriceChange() {
      priceChanged.value++;
    }
    const isHydrated = ref(
      productsStore.initialized.value === true || !!window.__PRODUCTS_DATA__?.length
    );
    const isFetching = ref(false);
    const pendingPriceRange = ref(null);
    {
      if (window.__SEO_DATA__) seoData.value = window.__SEO_DATA__;
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
      const hasSSRProducts = Array.isArray(window.__PRODUCTS_DATA__) && window.__PRODUCTS_DATA__.length;
      const ssrQuery = window.__SSR_QUERY__ || null;
      const currentCat = (window.__CATEGORIES_DATA__ || []).find((c) => c.slug === route.params.slug) || null;
      const isSameCategory = (ssrQuery?.category || null) === (currentCat?.id || null);
      const isSSRMatch = hasSSRProducts && isSameCategory;
      if (isSSRMatch) {
        categories.value = window.__CATEGORIES_DATA__ || [];
        selectedCategoryOBJ.value = window.__SELECTED_CATEGORY_DATA__?.slug === route.params.slug ? window.__SELECTED_CATEGORY_DATA__ : currentCat;
        selectedCategory.value = [selectedCategoryOBJ.value?.id];
        productsStore.products.value = window.__PRODUCTS_DATA__;
        productsStore.initialized.value = true;
        productsStore.productsLoading.value = false;
        if (window.__PRICE_META__) {
          priceMin.value = Number(window.__PRICE_META__.min_price);
          priceMax.value = Number(window.__PRICE_META__.max_price);
          priceRange.value = { min: priceMin.value, max: priceMax.value };
        }
        if (window.__PRODUCTS_TOTAL__) productsStore.totalProducts.value = window.__PRODUCTS_TOTAL__;
        if (window.__PAGES_TOTAL__) productsStore.totalPages.value = window.__PAGES_TOTAL__;
      } else if (productsStore.initialized.value) {
        categories.value = window.__CATEGORIES_DATA__ || [];
        selectedCategoryOBJ.value = currentCat;
        selectedCategory.value = currentCat ? [currentCat.id] : [];
        if (productsStore.priceMeta?.value) {
          priceMin.value = productsStore.priceMeta.value.min;
          priceMax.value = productsStore.priceMeta.value.max;
          priceRange.value = { ...productsStore.priceMeta.value };
        }
      }
      isReady.value = true;
    }
    const paginatedProducts = computed(() => {
      return productsStore.products.value || [];
    });
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
        const sortParams = getSortParams(filters.sort);
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
    watch(
      () => route.params.slug,
      async (newSlug) => {
        categorySlug.value = newSlug;
        if (!categories.value.length) {
          await fetchCategories();
        }
        const cat = categories.value.find((c) => c.slug === newSlug);
        if (cat) {
          selectedCategory.value = [cat.id];
          selectedCategoryOBJ.value = cat;
          productsStore.products.value = [];
          productsStore.productsLoading.value = true;
          await fetchPriceMeta(cat.id);
          priceMin.value = pendingPriceRange.value.min;
          priceMax.value = pendingPriceRange.value.max;
          priceRange.value = { ...pendingPriceRange.value };
          await productsStore.preFetchProducts({
            api: true,
            page: 1,
            per_page: perPage,
            category: cat.id
          });
          productsStore.productsLoading.value = false;
        }
      }
    );
    onMounted(async () => {
      isHydrated.value = true;
      if (!productsStore.initialized.value) {
        productsStore.productsLoading.value = true;
        await productsStore.preFetchProducts({
          api: true,
          page: 1,
          per_page: perPage,
          category: selectedCategoryOBJ.value?.id || null
        });
      }
      if (!priceMin.value) {
        await fetchPriceMeta(selectedCategoryOBJ.value?.id || null);
        priceMin.value = pendingPriceRange.value.min;
        priceMax.value = pendingPriceRange.value.max;
        priceRange.value = { ...pendingPriceRange.value };
      }
      if (!Array.isArray(categories.value) || !categories.value.length) {
        await fetchCategories();
      }
      if (!isReady.value) {
        isReady.value = true;
      }
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
    const __returned__ = { $q, setVerticalScrollPosition, scrollToTop, categories, selectedCategory, search, currentPage, perPage, sortBy, filtersOpen, sortOptions, route, categorySlug, selectedCategoryOBJ, seoData, isReady, priceMin, priceMax, priceRange, priceChanged, onPriceChange, isHydrated, isFetching, pendingPriceRange, paginatedProducts, fetchCategories, decodeHtml, categoryOptions, totalPages, totalProducts, getSortParams, get requestId() {
      return requestId;
    }, set requestId(v) {
      requestId = v;
    }, fetchPriceMeta, ref, computed, onMounted, watch, useSSRContext, get api() {
      return WC;
    }, get useQuasar() {
      return useQuasar;
    }, get useMeta() {
      return useMeta;
    }, get scroll() {
      return scroll;
    }, get useRoute() {
      return useRoute;
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
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "container" };
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "archive-layout flex no-wrap" };
const _hoisted_6 = {
  key: 1,
  class: "col-xs-12 col-md-6"
};
const _hoisted_7 = {
  key: 2,
  class: "col-xs-12 col-md-6"
};
const _hoisted_8 = {
  key: 3,
  class: "col-xs-12 col-md-6"
};
const _hoisted_9 = {
  key: 4,
  class: "col-xs-12 col-md-6"
};
const _hoisted_10 = {
  key: 5,
  class: "q-pa-md q-mb-md"
};
const _hoisted_11 = { class: "products-wrap" };
const _hoisted_12 = { class: "flex justify-between q-mb-md total-products" };
const _hoisted_13 = {
  key: 0,
  class: "text-subtitle1 q-mb-sm"
};
const _hoisted_14 = { class: "flex justify-between q-mb-md sticky" };
const _hoisted_15 = {
  key: 0,
  class: "products-inner row q-col-gutter-md"
};
const _hoisted_16 = {
  key: 1,
  class: "products-inner row q-col-gutter-md"
};
const _hoisted_17 = {
  key: 2,
  class: "text-center q-mt-lg"
};
const _hoisted_18 = {
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
          createVNode(QBreadcrumbsEl, null, {
            default: withCtx(() => [
              createBaseVNode("span", {
                innerHTML: $setup.selectedCategoryOBJ?.name
              }, null, 8, _hoisted_3)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createBaseVNode("h1", {
        innerHTML: $setup.selectedCategoryOBJ?.name || "Products"
      }, null, 8, _hoisted_4),
      createBaseVNode("div", _hoisted_5, [
        createBaseVNode("div", {
          class: normalizeClass(["filters-wrap flex", { "shown": $setup.filtersOpen }])
        }, [
          $setup.isHydrated && $setup.$q.screen.width <= 767 ? (openBlock(), createBlock(QBtn, {
            key: 0,
            icon: $setup.matClose,
            color: "secondary",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.filtersOpen = false)
          }, null, 8, ["icon"])) : createCommentVNode("", true),
          !$setup.isHydrated ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createVNode(QSkeleton, {
              type: "rect",
              class: "q-mb-md"
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_7, [
            createVNode(QInput, {
              filled: "",
              modelValue: $setup.search,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.search = $event),
              label: "Search products...",
              debounce: "300"
            }, null, 8, ["modelValue"])
          ])),
          !$setup.isHydrated || !$setup.categoryOptions.length ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(QSkeleton, {
              type: "rect",
              class: "q-mb-md"
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_9, [
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
          !$setup.priceMin ? (openBlock(), createElementBlock("div", _hoisted_10, [
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
        createBaseVNode("div", _hoisted_11, [
          createBaseVNode("div", _hoisted_12, [
            $setup.totalProducts ? (openBlock(), createElementBlock("div", _hoisted_13, " Found " + toDisplayString($setup.totalProducts || 0) + " product" + toDisplayString($setup.totalProducts === 1 ? "" : "s"), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_14, [
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
          $setup.productsStore.productsLoading.value && $setup.isHydrated ? (openBlock(), createElementBlock("div", _hoisted_15, [
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
          ])) : $setup.paginatedProducts.length ? (openBlock(), createElementBlock("div", _hoisted_16, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.paginatedProducts, (product) => {
              return openBlock(), createElementBlock("div", {
                key: product.id,
                class: "col-xs-12 col-sm-6 col-md-4 relative-position"
              }, [
                createVNode($setup["ProductCard"], { product }, null, 8, ["product"])
              ]);
            }), 128))
          ])) : (openBlock(), createElementBlock("div", _hoisted_17, " No products found ")),
          $setup.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_18, [
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
const CategoryPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cdf1cd6"], ["__file", "CategoryPage.vue"]]);
export {
  CategoryPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlQYWdlLUNsTDNoZnNzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvQ2F0ZWdvcnlQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgPHEtYnJlYWRjcnVtYnM+XHJcbiAgICAgICAgICA8cS1icmVhZGNydW1icy1lbCBsYWJlbD1cIkhvbWVcIiB0bz1cIi9cIiAvPlxyXG4gICAgICAgICAgPHEtYnJlYWRjcnVtYnMtZWw+PHNwYW4gdi1odG1sPVwic2VsZWN0ZWRDYXRlZ29yeU9CSj8ubmFtZVwiPjwvc3Bhbj48L3EtYnJlYWRjcnVtYnMtZWw+XHJcbiAgICAgICAgPC9xLWJyZWFkY3J1bWJzPlxyXG5cclxuICAgICAgPGgxIHYtaHRtbD1cInNlbGVjdGVkQ2F0ZWdvcnlPQko/Lm5hbWUgfHwgJ1Byb2R1Y3RzJ1wiPjwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJhcmNoaXZlLWxheW91dCBmbGV4IG5vLXdyYXBcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZpbHRlcnMtd3JhcCBmbGV4XCIgOmNsYXNzPVwieyAnc2hvd24nOiBmaWx0ZXJzT3BlbiB9XCIgPlxyXG4gICAgICAgIDxxLWJ0blxyXG4gIHYtaWY9XCJpc0h5ZHJhdGVkICYmICRxLnNjcmVlbi53aWR0aCA8PSA3NjdcIlxyXG4gIDppY29uPVwibWF0Q2xvc2VcIlxyXG4gIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuICBAY2xpY2s9XCJmaWx0ZXJzT3BlbiA9IGZhbHNlXCJcclxuLz5cclxuICAgICAgPCEtLSBTZWFyY2ggYW5kIEZpbHRlciAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC02XCIgdi1pZj1cIiFpc0h5ZHJhdGVkXCI+XHJcbiAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwicmVjdFwiIGNsYXNzPVwicS1tYi1tZFwiLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC02XCIgdi1lbHNlPlxyXG4gICAgICAgICAgICA8cS1pbnB1dCBmaWxsZWQgdi1tb2RlbD1cInNlYXJjaFwiIGxhYmVsPVwiU2VhcmNoIHByb2R1Y3RzLi4uXCIgZGVib3VuY2U9XCIzMDBcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1tZC02XCIgIHYtaWY9XCIhaXNIeWRyYXRlZCB8fCAhY2F0ZWdvcnlPcHRpb25zLmxlbmd0aFwiPlxyXG4gICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInJlY3RcIiBjbGFzcz1cInEtbWItbWRcIi8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTZcIiB2LWVsc2U+XHJcbiAgICAgICAgICA8cS1jYXJkIGNsYXNzPVwicS1wYS1tZCBxLW1iLW1kXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSBxLW1iLXNtXCI+XHJcbiAgICAgICAgICAgICAgRmlsdGVyIGJ5IENhdGVnb3J5XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8cS1vcHRpb24tZ3JvdXBcclxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RlZENhdGVnb3J5XCJcclxuICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiY2F0ZWdvcnlPcHRpb25zXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L3EtY2FyZD5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kIHEtbWItbWRcIiB2LWlmPVwiIXByaWNlTWluXCI+XHJcbiAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInJlY3RcIiBjbGFzcz1cInEtbWItbWRcIi8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8cS1jYXJkXHJcbiAgICAgICAgICAgIGNsYXNzPVwicHJpY2UtcmFuZ2Utd3JhcCBxLXBhLW1kIHEtbWItbWRcIlxyXG4gICAgICAgICAgICB2LWVsc2VcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTEgcS1tYi1zbVwiPkZpbHRlciBieSBQcmljZTwvZGl2PlxyXG4gICAgICAgICAgPHEtcmFuZ2VcclxuICAgICAgICAgICAgICB2LW1vZGVsPVwicHJpY2VSYW5nZVwiXHJcbiAgICAgICAgICAgICAgOm1pbj1cInByaWNlTWluXCJcclxuICAgICAgICAgICAgICA6bWF4PVwicHJpY2VNYXhcIlxyXG4gICAgICAgICAgICAgIGxhYmVsLWFsd2F5c1xyXG4gICAgICAgICAgICAgIGxhYmVsXHJcbiAgICAgICAgICAgICAgZGVuc2VcclxuICAgICAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICAgICAgOnN0ZXA9XCIwLjAxXCJcclxuICAgICAgICAgICAgICBAY2hhbmdlPVwib25QcmljZUNoYW5nZVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvcS1jYXJkPlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdHMtd3JhcFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBxLW1iLW1kIHRvdGFsLXByb2R1Y3RzXCI+XHJcbiAgICAgIDwhLS0gVG90YWwgUHJvZHVjdHMgLS0+XHJcbiAgICAgIDxkaXYgdi1pZj1cInRvdGFsUHJvZHVjdHNcIiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHEtbWItc21cIj5cclxuICAgICAgICBGb3VuZCB7eyB0b3RhbFByb2R1Y3RzIHx8IDAgfX0gcHJvZHVjdHt7IHRvdGFsUHJvZHVjdHMgPT09IDEgPyAnJyA6ICdzJyB9fVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBxLW1iLW1kIHN0aWNreVwiPlxyXG4gICAgICAgICAgPHEtc2VsZWN0XHJcbiAgZmlsbGVkXHJcbiAgdi1tb2RlbD1cInNvcnRCeVwiXHJcbiAgbGFiZWw9XCJTb3J0IGJ5XCJcclxuICBlbWl0LXZhbHVlXHJcbiAgbWFwLW9wdGlvbnNcclxuICA6b3B0aW9ucz1cInNvcnRPcHRpb25zXCJcclxuICA6ZHJvcGRvd24taWNvbj1cIm1hdEFycm93RHJvcERvd25cIlxyXG4gIDpsb2FkaW5nLWljb249XCJtYXRBdXRvcmVuZXdcIlxyXG4gIDpjbGVhci1pY29uPVwibWF0Q2xvc2VcIlxyXG4gIGNvbG9yPVwic2Vjb25kYXJ5XCJcclxuXHJcbi8+XHJcbiAgICAgICAgICA8cS1idG5cclxuICB2LWlmPVwiaXNIeWRyYXRlZCAmJiAkcS5zY3JlZW4ud2lkdGggPD0gNzY3XCJcclxuICA6aWNvbj1cIm1hdEZpbHRlckxpc3RcIlxyXG4gIGxhYmVsPVwiRmlsdGVyc1wiXHJcbiAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gIEBjbGljaz1cImZpbHRlcnNPcGVuID0gIWZpbHRlcnNPcGVuXCJcclxuLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgdi1pZj1cInByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlICYmIGlzSHlkcmF0ZWRcIiBjbGFzcz1cInByb2R1Y3RzLWlubmVyIHJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cclxuICA8ZGl2XHJcbiAgICB2LWZvcj1cIm4gaW4gNlwiXHJcbiAgICA6a2V5PVwiJ3NrZWxldG9uLScgKyBuXCJcclxuICAgIGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC00XCJcclxuICA+XHJcbiAgICA8cS1jYXJkIGNsYXNzPVwibXktY2FyZCBmdWxsLWhlaWdodFwiPlxyXG5cclxuICAgICAgPCEtLSBJbWFnZSBza2VsZXRvbiAtLT5cclxuICAgICAgPHEtc2tlbGV0b24gaGVpZ2h0PVwiMjUwcHhcIiBzcXVhcmUgLz5cclxuXHJcbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICA8IS0tIFRpdGxlIC0tPlxyXG4gICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI3MCVcIiAvPlxyXG5cclxuICAgICAgICA8IS0tIFByaWNlIC0tPlxyXG4gICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI0MCVcIiAvPlxyXG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG5cclxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicS1ndXR0ZXItc21cIj5cclxuICAgICAgICA8IS0tIEJ1dHRvbnMgLS0+XHJcbiAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInJlY3RcIiB3aWR0aD1cIjEwMHB4XCIgaGVpZ2h0PVwiMzZweFwiIC8+XHJcbiAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInJlY3RcIiB3aWR0aD1cIjcwcHhcIiBoZWlnaHQ9XCIzNnB4XCIgLz5cclxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cclxuXHJcbiAgICA8L3EtY2FyZD5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiAgICAgIDxkaXYgdi1lbHNlLWlmPVwicGFnaW5hdGVkUHJvZHVjdHMubGVuZ3RoXCIgY2xhc3M9XCJwcm9kdWN0cy1pbm5lciByb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XHJcbiAgICAgICAgPCEtLSBQcm9kdWN0IEdyaWQgLS0+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIHBhZ2luYXRlZFByb2R1Y3RzXCJcclxuICAgICAgICAgIDprZXk9XCJwcm9kdWN0LmlkXCJcclxuICAgICAgICAgIGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC00IHJlbGF0aXZlLXBvc2l0aW9uXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8UHJvZHVjdENhcmQgOnByb2R1Y3Q9XCJwcm9kdWN0XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS0gRW1wdHkgLS0+XHJcbiAgICAgIDxkaXYgdi1lbHNlIGNsYXNzPVwidGV4dC1jZW50ZXIgcS1tdC1sZ1wiPlxyXG4gICAgICAgIE5vIHByb2R1Y3RzIGZvdW5kXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPCEtLSBQYWdpbmF0aW9uIC0tPlxyXG4gICAgICA8ZGl2IHYtaWY9XCJ0b3RhbFBhZ2VzID4gMVwiIGNsYXNzPVwicS1tdC1sZyBmbGV4IGZsZXgtY2VudGVyIHBhZ2luYXRpb24tYnRuc1wiPlxyXG4gICAgICAgIDxxLXBhZ2luYXRpb25cclxuICAgICAgICAgICAgdi1tb2RlbD1cImN1cnJlbnRQYWdlXCJcclxuICAgICAgICAgICAgOm1heD1cInRvdGFsUGFnZXMgfHwgMVwiXHJcbiAgICAgICAgICAgIG1heC1wYWdlcz1cIjZcIlxyXG4gICAgICAgICAgICBib3VuZGFyeS1udW1iZXJzXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbi1saW5rc1xyXG4gICAgICAgICAgICA6aWNvbi1wcmV2PVwibWF0S2V5Ym9hcmRBcnJvd0xlZnRcIlxyXG4gICAgICAgICAgICA6aWNvbi1uZXh0PVwibWF0S2V5Ym9hcmRBcnJvd1JpZ2h0XCJcclxuICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2Nyb2xsVG9Ub3BcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQgc2V0dXA+XHJcbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIG9uTW91bnRlZCwgd2F0Y2gsIHVzZVNTUkNvbnRleHQgfSBmcm9tICd2dWUnXHJcbmltcG9ydCBhcGkgZnJvbSAnc3JjL2Jvb3Qvd29vY29tbWVyY2UnXHJcbmltcG9ydCB7IHVzZVF1YXNhciwgdXNlTWV0YSwgc2Nyb2xsIH0gZnJvbSAncXVhc2FyJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gJ3Z1ZS1yb3V0ZXInXHJcbmltcG9ydCB7IGZldGNoU2VvRm9yUGF0aCB9IGZyb20gJ3NyYy9jb21wb3NhYmxlcy91c2VTZW8nXHJcbmltcG9ydCBwcm9kdWN0c1N0b3JlIGZyb20gJ3NyYy9zdG9yZXMvcHJvZHVjdHMnXHJcbmltcG9ydCB7IG1hdEtleWJvYXJkQXJyb3dMZWZ0LCBtYXRLZXlib2FyZEFycm93UmlnaHQsIG1hdEFycm93RHJvcERvd24sIG1hdEF1dG9yZW5ldywgbWF0Q2xvc2UsIG1hdEZpbHRlckxpc3QgfSBmcm9tICdAcXVhc2FyL2V4dHJhcy9tYXRlcmlhbC1pY29ucydcclxuaW1wb3J0IFByb2R1Y3RDYXJkIGZyb20gJ3NyYy9jb21wb25lbnRzL1Byb2R1Y3RDYXJkLnZ1ZSdcclxuXHJcbmNvbnN0ICRxID0gdXNlUXVhc2FyKClcclxuY29uc3QgeyBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIH0gPSBzY3JvbGxcclxuXHJcbmZ1bmN0aW9uIHNjcm9sbFRvVG9wKCkge1xyXG4gIC8vIE9wdGlvbiBBOiBTbW9vdGggc2Nyb2xsIHVzaW5nIFF1YXNhciB1dGlsaXR5IChCZXN0IGZlZWwpXHJcbiAgLy8gd2luZG93IGlzIHRoZSB0YXJnZXQsIDAgaXMgdGhlIHBvc2l0aW9uLCAzMDAgaXMgdGhlIGR1cmF0aW9uIGluIG1zXHJcbiAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbih3aW5kb3csIDE4NywgMzAwKVxyXG5cclxuICAvLyBPcHRpb24gQjogSW5zdGFudCBqdW1wIChGYXN0ZXN0IGZlZWwpXHJcbiAgLy8gd2luZG93LnNjcm9sbFRvKDAsIDApXHJcbn1cclxuLy8gUmVmcyBhbmQgc3RhdGVcclxuY29uc3QgY2F0ZWdvcmllcyA9IHJlZihbXSlcclxuY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeSA9IHJlZihbXSlcclxuY29uc3Qgc2VhcmNoID0gcmVmKCcnKVxyXG5jb25zdCBjdXJyZW50UGFnZSA9IHJlZigxKVxyXG5jb25zdCBwZXJQYWdlID0gNlxyXG5jb25zdCBzb3J0QnkgPSByZWYoJ21lbnVfb3JkZXInKVxyXG5jb25zdCBmaWx0ZXJzT3BlbiA9IHJlZihmYWxzZSlcclxuY29uc3Qgc29ydE9wdGlvbnMgPSBbXHJcbiAgeyBsYWJlbDogJ0RlZmF1bHQnLCB2YWx1ZTogJ21lbnVfb3JkZXInIH0sXHJcbiAgeyBsYWJlbDogJ05ld2VzdCcsIHZhbHVlOiAnZGF0ZV9kZXNjJyB9LFxyXG4gIHsgbGFiZWw6ICdQcmljZTogTG93IHRvIEhpZ2gnLCB2YWx1ZTogJ3ByaWNlX2FzYycgfSxcclxuICB7IGxhYmVsOiAnUHJpY2U6IEhpZ2ggdG8gTG93JywgdmFsdWU6ICdwcmljZV9kZXNjJyB9LFxyXG4gIHsgbGFiZWw6ICdOYW1lOiBBIHRvIFonLCB2YWx1ZTogJ3RpdGxlX2FzYycgfSxcclxuICB7IGxhYmVsOiAnTmFtZTogWiB0byBBJywgdmFsdWU6ICd0aXRsZV9kZXNjJyB9LFxyXG4gIHsgbGFiZWw6ICdQb3B1bGFyaXR5JywgdmFsdWU6ICdwb3B1bGFyaXR5JyB9LFxyXG4gIHsgbGFiZWw6ICdSYXRpbmcnLCB2YWx1ZTogJ3JhdGluZycgfVxyXG5dXHJcblxyXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKClcclxuY29uc3QgY2F0ZWdvcnlTbHVnID0gcmVmKHJvdXRlLnBhcmFtcy5zbHVnIHx8IG51bGwpXHJcbmNvbnN0IHNlbGVjdGVkQ2F0ZWdvcnlPQkogPSByZWYobnVsbClcclxuLy8gRmV0Y2ggU0VPIGRhdGEgZHVyaW5nIFNTUlxyXG4vLyDwn5+iIFJ1biBvbiBTU1Igb25seVxyXG4vLyBJbnNpZGUgeW91ciBQYWdlIG9yIExheW91dFxyXG5kZWZpbmVPcHRpb25zKHtcclxuICBhc3luYyBwcmVGZXRjaCh7IHNzckNvbnRleHQsIGN1cnJlbnRSb3V0ZSB9KSB7XHJcbiAgICBjb25zdCBzZW8gPSBhd2FpdCBmZXRjaFNlb0ZvclBhdGgoJ3Nob3AnKVxyXG5cclxuICAgIGxldCBjYXRlZ29yaWVzID0gW11cclxuICAgIGxldCBjdXJyZW50Q2F0ID0gbnVsbFxyXG4gICAgbGV0IHByaWNlTWV0YSA9IG51bGxcclxuXHJcbiAgICAvLyDinIUgUnVuIG9uIEJPVEggU1NSIGFuZCBjbGllbnQtc2lkZSBuYXZpZ2F0aW9uXHJcbiAgICBjYXRlZ29yaWVzID0gYXdhaXQgYXBpLmdldENhdGVnb3JpZXMoKVxyXG4gICAgY3VycmVudENhdCA9IGNhdGVnb3JpZXMuZmluZChjID0+IGMuc2x1ZyA9PT0gY3VycmVudFJvdXRlLnBhcmFtcy5zbHVnKSB8fCBudWxsXHJcblxyXG4gICAgY29uc3QgcHJvZHVjdHNRdWVyeSA9IHtcclxuICAgICAgYXBpOiB0cnVlLFxyXG4gICAgICBwYWdlOiAxLFxyXG4gICAgICBwZXJfcGFnZTogNixcclxuICAgICAgY2F0ZWdvcnk6IGN1cnJlbnRDYXQgPyBjdXJyZW50Q2F0LmlkIDogbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByaWNlVXJsID0gY3VycmVudENhdFxyXG4gICAgICA/IGBodHRwczovL251eHQubWVpZGFubS5jb20vd3AtanNvbi93Yy9zdG9yZS92MS9wcm9kdWN0cy1tZXRhP2NhdGVnb3J5PSR7Y3VycmVudENhdC5pZH1gXHJcbiAgICAgIDogJ2h0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3djL3N0b3JlL3YxL3Byb2R1Y3RzLW1ldGEnXHJcblxyXG4gICAgLy8g4pyFIFJ1biBib3RoIGluIHBhcmFsbGVsIGZvciBzcGVlZFxyXG4gICAgY29uc3QgW3Byb2R1Y3RzLCBwcmljZVJlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgIHByb2R1Y3RzU3RvcmUucHJlRmV0Y2hQcm9kdWN0cyhwcm9kdWN0c1F1ZXJ5KSxcclxuICAgICAgZmV0Y2gocHJpY2VVcmwpLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIF0pXHJcblxyXG4gICAgcHJpY2VNZXRhID0gcHJpY2VSZXNcclxuXHJcbiAgICBpZiAoc3NyQ29udGV4dCkge1xyXG4gICAgICAvLyBTU1I6IHN0b3JlIGluIGNvbnRleHQgZm9yIGh5ZHJhdGlvblxyXG4gICAgICBzc3JDb250ZXh0LnByb2R1Y3RzRGF0YSA9IHByb2R1Y3RzXHJcbiAgICAgIHNzckNvbnRleHQuY2F0ZWdvcmllc0RhdGEgPSBjYXRlZ29yaWVzXHJcbiAgICAgIHNzckNvbnRleHQuc2VsZWN0ZWRDYXRlZ29yeURhdGEgPSBjdXJyZW50Q2F0IHx8IG51bGxcclxuICAgICAgc3NyQ29udGV4dC5zc3JRdWVyeSA9IHByb2R1Y3RzUXVlcnlcclxuICAgICAgc3NyQ29udGV4dC5wcmljZU1ldGFEYXRhID0gcHJpY2VNZXRhXHJcbiAgICAgIHNzckNvbnRleHQucHJvZHVjdHNUb3RhbCA9IHByb2R1Y3RzU3RvcmUudG90YWxQcm9kdWN0cy52YWx1ZVxyXG4gICAgICBzc3JDb250ZXh0LnBhZ2VzVG90YWwgPSBwcm9kdWN0c1N0b3JlLnRvdGFsUGFnZXMudmFsdWVcclxuICAgICAgc3NyQ29udGV4dC5zZW9EYXRhID0gc2VvXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyDinIUgQ2xpZW50LXNpZGUgbmF2aWdhdGlvbjogcG9wdWxhdGUgc3RvcmUgZGlyZWN0bHlcclxuICAgICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZSA9IHByb2R1Y3RzXHJcbiAgICAgIHByb2R1Y3RzU3RvcmUuaW5pdGlhbGl6ZWQudmFsdWUgPSB0cnVlXHJcbiAgICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlID0gZmFsc2VcclxuICAgICAgd2luZG93Ll9fQ0FURUdPUklFU19EQVRBX18gPSBjYXRlZ29yaWVzXHJcblxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IHNlb0RhdGEgPSByZWYoe1xyXG4gIHRpdGxlOiAnUHJvZHVjdHMnLFxyXG4gIGRlc2NyaXB0aW9uOiAnUHJvZHVjdHMgZGVzY3JpcHRpb24nXHJcbn0pO1xyXG5jb25zdCBpc1JlYWR5ID0gcmVmKGZhbHNlKVxyXG4vLyBQcmljZSBmaWx0ZXJcclxuY29uc3QgcHJpY2VNaW4gPSByZWYobnVsbClcclxuY29uc3QgcHJpY2VNYXggPSByZWYobnVsbClcclxuY29uc3QgcHJpY2VSYW5nZSA9IHJlZih7IG1pbjogMCwgbWF4OiAxMDAwIH0pXHJcbmNvbnN0IHByaWNlQ2hhbmdlZCA9IHJlZigwKVxyXG5cclxuZnVuY3Rpb24gb25QcmljZUNoYW5nZSgpIHtcclxuICBwcmljZUNoYW5nZWQudmFsdWUrKyAvLyB0cmlnZ2VyIHdhdGNoZXIgbWFudWFsbHlcclxufVxyXG4vL2NvbnN0IGlzSHlkcmF0ZWQgPSByZWYoZmFsc2UpXHJcbmNvbnN0IGlzSHlkcmF0ZWQgPSByZWYoXHJcbiAgcHJvY2Vzcy5lbnYuQ0xJRU5UICYmIChcclxuICAgIHByb2R1Y3RzU3RvcmUuaW5pdGlhbGl6ZWQudmFsdWUgPT09IHRydWUgfHxcclxuICAgICEhKHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXz8ubGVuZ3RoKVxyXG4gIClcclxuKVxyXG5cclxuLy8gV2F0Y2ggcHJpY2UgcmFuZ2VcclxuXHJcbmNvbnN0IGlzRmV0Y2hpbmcgPSByZWYoZmFsc2UpXHJcbmNvbnN0IHBlbmRpbmdQcmljZVJhbmdlID0gcmVmKG51bGwpXHJcbmlmKHByb2Nlc3MuZW52LlNFUlZFUikge1xyXG4gIGNvbnN0IHNzciA9IHVzZVNTUkNvbnRleHQoKVxyXG4gIGNhdGVnb3JpZXMudmFsdWUgPSBzc3IuY2F0ZWdvcmllc0RhdGFcclxuICBzZWxlY3RlZENhdGVnb3J5T0JKLnZhbHVlID0gc3NyLnNlbGVjdGVkQ2F0ZWdvcnlEYXRhXHJcbiAgc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSA9IFtzc3Iuc2VsZWN0ZWRDYXRlZ29yeURhdGEuaWRdXHJcbn1cclxuXHJcbi8qaWYgKHByb2Nlc3MuZW52LkNMSUVOVCkge1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAxLiBTRU9cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgaWYgKHdpbmRvdy5fX1NFT19EQVRBX18pIHtcclxuICAgIHNlb0RhdGEudmFsdWUgPSB3aW5kb3cuX19TRU9fREFUQV9fXHJcbiAgfVxyXG5cclxuICB1c2VNZXRhKCgpID0+IHtcclxuICAgIGNvbnN0IHNlbyA9IHNlb0RhdGEudmFsdWVcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBzZW8/LnRpdGxlIHx8ICdOYXR1cmFCbG9vbScsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHNlbz8uZGVzY3JpcHRpb24gfHwgXCJMZXQncyBCbG9vbSBUb2dldGhlclwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnb2c6dGl0bGUnOiB7XHJcbiAgICAgICAgICBwcm9wZXJ0eTogJ29nOnRpdGxlJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHNlbz8udGl0bGUgfHwgJ05hdHVyYUJsb29tJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29nOmRlc2NyaXB0aW9uJzoge1xyXG4gICAgICAgICAgcHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICBjb250ZW50OiBzZW8/LmRlc2NyaXB0aW9uIHx8IFwiTGV0J3MgQmxvb20gVG9nZXRoZXJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAyLiBDYXRlZ29yaWVzIChiYXNlIGRhdGEpXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNhdGVnb3JpZXMudmFsdWUgPSBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0NBVEVHT1JJRVNfREFUQV9fKVxyXG4gICAgPyB3aW5kb3cuX19DQVRFR09SSUVTX0RBVEFfX1xyXG4gICAgOiBbXVxyXG5cclxuICBjb25zdCBjdXJyZW50Q2F0ID1cclxuICAgIGNhdGVnb3JpZXMudmFsdWUuZmluZChjID0+IGMuc2x1ZyA9PT0gcm91dGUucGFyYW1zLnNsdWcpIHx8IG51bGxcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIDMuIFNlbGVjdGVkIENhdGVnb3J5IChTU1Igb3IgZmFsbGJhY2spXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGlmIChcclxuICAgIHdpbmRvdy5fX1NFTEVDVEVEX0NBVEVHT1JZX0RBVEFfXyAmJlxyXG4gICAgd2luZG93Ll9fU0VMRUNURURfQ0FURUdPUllfREFUQV9fLnNsdWcgPT09IHJvdXRlLnBhcmFtcy5zbHVnXHJcbiAgKSB7XHJcbiAgICBzZWxlY3RlZENhdGVnb3J5T0JKLnZhbHVlID0gd2luZG93Ll9fU0VMRUNURURfQ0FURUdPUllfREFUQV9fXHJcbiAgfSBlbHNlIHtcclxuICAgIHNlbGVjdGVkQ2F0ZWdvcnlPQkoudmFsdWUgPSBjdXJyZW50Q2F0XHJcbiAgfVxyXG5cclxuICBzZWxlY3RlZENhdGVnb3J5LnZhbHVlID0gW3NlbGVjdGVkQ2F0ZWdvcnlPQkoudmFsdWU/LmlkXVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gNC4gRGVjaWRlOiBTU1IgcmV1c2UgT1IgZnJlc2ggZmV0Y2hcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgY29uc3Qgc3NyUXVlcnkgPSB3aW5kb3cuX19TU1JfUVVFUllfXyB8fCBudWxsXHJcblxyXG4gIGNvbnN0IGlzU2FtZUNhdGVnb3J5ID1cclxuICAgIChzc3JRdWVyeT8uY2F0ZWdvcnkgfHwgbnVsbCkgPT09IChjdXJyZW50Q2F0Py5pZCB8fCBudWxsKVxyXG5cclxuICBjb25zdCBoYXNTU1JQcm9kdWN0cyA9XHJcbiAgICBBcnJheS5pc0FycmF5KHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXykgJiZcclxuICAgIHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXy5sZW5ndGhcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIDVBLiBTU1IgTUFUQ0gg4oaSIGh5ZHJhdGUgZXZlcnl0aGluZ1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICBpZiAoaGFzU1NSUHJvZHVjdHMgJiYgaXNTYW1lQ2F0ZWdvcnkpIHtcclxuICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHMudmFsdWUgPSB3aW5kb3cuX19QUk9EVUNUU19EQVRBX19cclxuICAgIHByb2R1Y3RzU3RvcmUuaW5pdGlhbGl6ZWQudmFsdWUgPSB0cnVlXHJcblxyXG4gICAgaWYgKHdpbmRvdy5fX1BSSUNFX01FVEFfXykge1xyXG4gICAgICBwcmljZU1pbi52YWx1ZSA9IE51bWJlcih3aW5kb3cuX19QUklDRV9NRVRBX18ubWluX3ByaWNlKVxyXG4gICAgICBwcmljZU1heC52YWx1ZSA9IE51bWJlcih3aW5kb3cuX19QUklDRV9NRVRBX18ubWF4X3ByaWNlKVxyXG4gICAgICBwcmljZVJhbmdlLnZhbHVlID0ge1xyXG4gICAgICAgIG1pbjogcHJpY2VNaW4udmFsdWUsXHJcbiAgICAgICAgbWF4OiBwcmljZU1heC52YWx1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gNUIuIERJRkZFUkVOVCBDQVRFR09SWSDihpIgZmV0Y2ggZnJlc2hcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgZWxzZSBpZiAoY3VycmVudENhdCkge1xyXG4gICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZSA9IFtdXHJcbiAgICBwcm9kdWN0c1N0b3JlLmluaXRpYWxpemVkLnZhbHVlID0gZmFsc2VcclxuICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxyXG5cclxuICAgIC8vIPCflKUgcnVuIEJPVEggaW4gcGFyYWxsZWxcclxuICAgIGNvbnN0IHByaWNlUHJvbWlzZSA9IGZldGNoUHJpY2VNZXRhKGN1cnJlbnRDYXQuaWQpXHJcbiAgICBjb25zdCBwcm9kdWN0c1Byb21pc2UgPSBwcm9kdWN0c1N0b3JlLnByZUZldGNoUHJvZHVjdHMoe1xyXG4gICAgICBhcGk6IHRydWUsXHJcbiAgICAgIHBhZ2U6IDEsXHJcbiAgICAgIHBlcl9wYWdlOiBwZXJQYWdlLFxyXG4gICAgICBjYXRlZ29yeTogY3VycmVudENhdC5pZFxyXG4gICAgfSlcclxuXHJcbi8vIHdhaXQgZm9yIEJPVEggKGJ1dCBpbmRlcGVuZGVudGx5IHN0YXJ0ZWQpXHJcbiAgICBQcm9taXNlLmFsbChbcHJpY2VQcm9taXNlLCBwcm9kdWN0c1Byb21pc2VdKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIC8vIOKchSB1cGRhdGUgcHJpY2UgQUZURVIgaXQgYXJyaXZlc1xyXG4gICAgICAgICAgaWYgKHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHByaWNlTWluLnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUubWluXHJcbiAgICAgICAgICAgIHByaWNlTWF4LnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUubWF4XHJcbiAgICAgICAgICAgIHByaWNlUmFuZ2UudmFsdWUgPSB7Li4ucGVuZGluZ1ByaWNlUmFuZ2UudmFsdWV9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzTG9hZGluZy52YWx1ZSA9IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBET05FXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGlzUmVhZHkudmFsdWUgPSB0cnVlXHJcbn1cclxuLy8g4pyFIFRoaXMgcnVucyBzeW5jaHJvbm91c2x5IG9uIHNldHVwIOKAlCBiZWZvcmUgZmlyc3QgcGFpbnRcclxuaWYgKHByb2Nlc3MuZW52LkNMSUVOVCkge1xyXG4gIGNvbnN0IGlzQ2xpZW50TmF2ID0gIXdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXz8ubGVuZ3RoXHJcblxyXG4gIGlmIChpc0NsaWVudE5hdikge1xyXG4gICAgLy8gRGF0YSB3YXMgYWxyZWFkeSBsb2FkZWQgYnkgcHJlRmV0Y2ggaW50byB0aGUgc3RvcmVcclxuICAgIC8vIEp1c3Qgc3luYyBsb2NhbCByZWZzIGZyb20gc3RvcmVcclxuICAgIGNvbnN0IGNhdHMgPSBwcm9kdWN0c1N0b3JlLmNhdGVnb3JpZXNEYXRhPy52YWx1ZSB8fCBbXVxyXG4gICAgY2F0ZWdvcmllcy52YWx1ZSA9IGNhdHNcclxuICAgIGNvbnN0IGN1cnJlbnRDYXQgPSBjYXRzLmZpbmQoYyA9PiBjLnNsdWcgPT09IHJvdXRlLnBhcmFtcy5zbHVnKSB8fCBudWxsXHJcbiAgICBzZWxlY3RlZENhdGVnb3J5T0JKLnZhbHVlID0gY3VycmVudENhdFxyXG4gICAgc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSA9IGN1cnJlbnRDYXQgPyBbY3VycmVudENhdC5pZF0gOiBbXVxyXG5cclxuICAgIGlmIChwcm9kdWN0c1N0b3JlLnByaWNlTWV0YT8udmFsdWUpIHtcclxuICAgICAgcHJpY2VNaW4udmFsdWUgPSBwcm9kdWN0c1N0b3JlLnByaWNlTWV0YS52YWx1ZS5taW5cclxuICAgICAgcHJpY2VNYXgudmFsdWUgPSBwcm9kdWN0c1N0b3JlLnByaWNlTWV0YS52YWx1ZS5tYXhcclxuICAgICAgcHJpY2VSYW5nZS52YWx1ZSA9IHsgLi4ucHJvZHVjdHNTdG9yZS5wcmljZU1ldGEudmFsdWUgfVxyXG4gICAgfVxyXG4gIH1cclxufSovXHJcbmlmIChwcm9jZXNzLmVudi5DTElFTlQpIHtcclxuICAvLyAtLS0gU0VPIC0tLVxyXG4gIGlmICh3aW5kb3cuX19TRU9fREFUQV9fKSBzZW9EYXRhLnZhbHVlID0gd2luZG93Ll9fU0VPX0RBVEFfX1xyXG5cclxuICB1c2VNZXRhKCgpID0+IHtcclxuICAgIGNvbnN0IHNlbyA9IHNlb0RhdGEudmFsdWVcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBzZW8/LnRpdGxlIHx8ICdOYXR1cmFCbG9vbScsXHJcbiAgICAgIG1ldGE6IHtcclxuICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHNlbz8uZGVzY3JpcHRpb24gfHwgXCJMZXQncyBCbG9vbSBUb2dldGhlclwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnb2c6dGl0bGUnOiB7XHJcbiAgICAgICAgICBwcm9wZXJ0eTogJ29nOnRpdGxlJyxcclxuICAgICAgICAgIGNvbnRlbnQ6IHNlbz8udGl0bGUgfHwgJ05hdHVyYUJsb29tJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29nOmRlc2NyaXB0aW9uJzoge1xyXG4gICAgICAgICAgcHJvcGVydHk6ICdvZzpkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICBjb250ZW50OiBzZW8/LmRlc2NyaXB0aW9uIHx8IFwiTGV0J3MgQmxvb20gVG9nZXRoZXJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgY29uc3QgaGFzU1NSUHJvZHVjdHMgPVxyXG4gICAgQXJyYXkuaXNBcnJheSh3aW5kb3cuX19QUk9EVUNUU19EQVRBX18pICYmIHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXy5sZW5ndGhcclxuXHJcbiAgY29uc3Qgc3NyUXVlcnkgPSB3aW5kb3cuX19TU1JfUVVFUllfXyB8fCBudWxsXHJcbiAgY29uc3QgY3VycmVudENhdCA9ICh3aW5kb3cuX19DQVRFR09SSUVTX0RBVEFfXyB8fCBbXSlcclxuICAgIC5maW5kKGMgPT4gYy5zbHVnID09PSByb3V0ZS5wYXJhbXMuc2x1ZykgfHwgbnVsbFxyXG5cclxuICAvLyDinIUgQ2hlY2sgQk9USDogZGF0YSBleGlzdHMgQU5EIGl0IGJlbG9uZ3MgdG8gdGhlIGN1cnJlbnQgY2F0ZWdvcnlcclxuICBjb25zdCBpc1NhbWVDYXRlZ29yeSA9IChzc3JRdWVyeT8uY2F0ZWdvcnkgfHwgbnVsbCkgPT09IChjdXJyZW50Q2F0Py5pZCB8fCBudWxsKVxyXG4gIGNvbnN0IGlzU1NSTWF0Y2ggPSBoYXNTU1JQcm9kdWN0cyAmJiBpc1NhbWVDYXRlZ29yeVxyXG5cclxuICAvLyAtLS0gU1NSIGh5ZHJhdGlvbiBwYXRoIChjb3JyZWN0IGNhdGVnb3J5KSAtLS1cclxuICBpZiAoaXNTU1JNYXRjaCkge1xyXG4gICAgY2F0ZWdvcmllcy52YWx1ZSA9IHdpbmRvdy5fX0NBVEVHT1JJRVNfREFUQV9fIHx8IFtdXHJcbiAgICBzZWxlY3RlZENhdGVnb3J5T0JKLnZhbHVlID0gd2luZG93Ll9fU0VMRUNURURfQ0FURUdPUllfREFUQV9fPy5zbHVnID09PSByb3V0ZS5wYXJhbXMuc2x1Z1xyXG4gICAgICA/IHdpbmRvdy5fX1NFTEVDVEVEX0NBVEVHT1JZX0RBVEFfX1xyXG4gICAgICA6IGN1cnJlbnRDYXRcclxuICAgIHNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUgPSBbc2VsZWN0ZWRDYXRlZ29yeU9CSi52YWx1ZT8uaWRdXHJcblxyXG4gICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZSA9IHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfX1xyXG4gICAgcHJvZHVjdHNTdG9yZS5pbml0aWFsaXplZC52YWx1ZSA9IHRydWVcclxuICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlID0gZmFsc2VcclxuXHJcbiAgICBpZiAod2luZG93Ll9fUFJJQ0VfTUVUQV9fKSB7XHJcbiAgICAgIHByaWNlTWluLnZhbHVlID0gTnVtYmVyKHdpbmRvdy5fX1BSSUNFX01FVEFfXy5taW5fcHJpY2UpXHJcbiAgICAgIHByaWNlTWF4LnZhbHVlID0gTnVtYmVyKHdpbmRvdy5fX1BSSUNFX01FVEFfXy5tYXhfcHJpY2UpXHJcbiAgICAgIHByaWNlUmFuZ2UudmFsdWUgPSB7IG1pbjogcHJpY2VNaW4udmFsdWUsIG1heDogcHJpY2VNYXgudmFsdWUgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cuX19QUk9EVUNUU19UT1RBTF9fKSBwcm9kdWN0c1N0b3JlLnRvdGFsUHJvZHVjdHMudmFsdWUgPSB3aW5kb3cuX19QUk9EVUNUU19UT1RBTF9fXHJcbiAgICBpZiAod2luZG93Ll9fUEFHRVNfVE9UQUxfXykgcHJvZHVjdHNTdG9yZS50b3RhbFBhZ2VzLnZhbHVlID0gd2luZG93Ll9fUEFHRVNfVE9UQUxfX1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tIENsaWVudCBuYXYgcGF0aDogcHJlRmV0Y2ggYWxyZWFkeSBsb2FkZWQgdGhlIGNvcnJlY3QgY2F0ZWdvcnkgLS0tXHJcbiAgZWxzZSBpZiAocHJvZHVjdHNTdG9yZS5pbml0aWFsaXplZC52YWx1ZSkge1xyXG4gICAgY2F0ZWdvcmllcy52YWx1ZSA9IHdpbmRvdy5fX0NBVEVHT1JJRVNfREFUQV9fIHx8IFtdXHJcbiAgICBzZWxlY3RlZENhdGVnb3J5T0JKLnZhbHVlID0gY3VycmVudENhdFxyXG4gICAgc2VsZWN0ZWRDYXRlZ29yeS52YWx1ZSA9IGN1cnJlbnRDYXQgPyBbY3VycmVudENhdC5pZF0gOiBbXVxyXG5cclxuICAgIGlmIChwcm9kdWN0c1N0b3JlLnByaWNlTWV0YT8udmFsdWUpIHtcclxuICAgICAgcHJpY2VNaW4udmFsdWUgPSBwcm9kdWN0c1N0b3JlLnByaWNlTWV0YS52YWx1ZS5taW5cclxuICAgICAgcHJpY2VNYXgudmFsdWUgPSBwcm9kdWN0c1N0b3JlLnByaWNlTWV0YS52YWx1ZS5tYXhcclxuICAgICAgcHJpY2VSYW5nZS52YWx1ZSA9IHsuLi5wcm9kdWN0c1N0b3JlLnByaWNlTWV0YS52YWx1ZX1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBpc1JlYWR5LnZhbHVlID0gdHJ1ZVxyXG59XHJcbmNvbnN0IHBhZ2luYXRlZFByb2R1Y3RzID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gIHJldHVybiBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzLnZhbHVlIHx8IFtdXHJcbn0pXHJcblxyXG4vLyBGZXRjaCBjYXRlZ29yaWVzXHJcbmNvbnN0IGZldGNoQ2F0ZWdvcmllcyA9IGFzeW5jICgpID0+IHtcclxuICBjYXRlZ29yaWVzLnZhbHVlID0gYXdhaXQgYXBpLmdldENhdGVnb3JpZXMoKVxyXG59XHJcblxyXG5jb25zdCBkZWNvZGVIdG1sID0gKGh0bWwpID0+IHtcclxuICBjb25zdCB0eHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcbiAgdHh0LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgcmV0dXJuIHR4dC52YWx1ZTtcclxufTtcclxuXHJcbi8vIENvbXB1dGVkOiBjYXRlZ29yeSBvcHRpb25zXHJcbmNvbnN0IGNhdGVnb3J5T3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoY2F0ZWdvcmllcy52YWx1ZSkpIHJldHVybiBbXVxyXG5cclxuICByZXR1cm4gY2F0ZWdvcmllcy52YWx1ZS5tYXAoKGNhdCkgPT4gKHtcclxuICAgIGxhYmVsOiBkZWNvZGVIdG1sKGNhdC5uYW1lKSxcclxuICAgIHZhbHVlOiBjYXQuaWRcclxuICB9KSlcclxufSlcclxuXHJcblxyXG5cclxuLy8gQ29tcHV0ZWQ6IHBhZ2luYXRpb25cclxuY29uc3QgdG90YWxQYWdlcyA9IGNvbXB1dGVkKCgpID0+IHByb2R1Y3RzU3RvcmUudG90YWxQYWdlcy52YWx1ZSlcclxuY29uc3QgdG90YWxQcm9kdWN0cyA9IGNvbXB1dGVkKCgpID0+IHByb2R1Y3RzU3RvcmUudG90YWxQcm9kdWN0cy52YWx1ZSlcclxuLyppZiAocHJvY2Vzcy5lbnYuQ0xJRU5UICYmIHdpbmRvdy5fX1BST0RVQ1RTX1RPVEFMX18pIHtcclxuICBwcm9kdWN0c1N0b3JlLnRvdGFsUHJvZHVjdHMudmFsdWUgPSB3aW5kb3cuX19QUk9EVUNUU19UT1RBTF9fXHJcbn1cclxuaWYgKHByb2Nlc3MuZW52LkNMSUVOVCAmJiB3aW5kb3cuX19QQUdFU19UT1RBTF9fKSB7XHJcbiAgcHJvZHVjdHNTdG9yZS50b3RhbFBhZ2VzLnZhbHVlID0gd2luZG93Ll9fUEFHRVNfVE9UQUxfX1xyXG59Ki9cclxuXHJcbi8vIFdhdGNoIHByaWNlIHJhbmdlXHJcblxyXG5mdW5jdGlvbiBnZXRTb3J0UGFyYW1zKHNvcnQpIHtcclxuICBzd2l0Y2ggKHNvcnQpIHtcclxuICAgIGNhc2UgJ3ByaWNlX2FzYyc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICdwcmljZScsIG9yZGVyOiAnYXNjJyB9XHJcblxyXG4gICAgY2FzZSAncHJpY2VfZGVzYyc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICdwcmljZScsIG9yZGVyOiAnZGVzYycgfVxyXG5cclxuICAgIGNhc2UgJ2RhdGVfZGVzYyc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICdkYXRlJywgb3JkZXI6ICdkZXNjJyB9XHJcblxyXG4gICAgY2FzZSAndGl0bGVfYXNjJzpcclxuICAgICAgcmV0dXJuIHsgb3JkZXJieTogJ3RpdGxlJywgb3JkZXI6ICdhc2MnIH1cclxuXHJcbiAgICBjYXNlICd0aXRsZV9kZXNjJzpcclxuICAgICAgcmV0dXJuIHsgb3JkZXJieTogJ3RpdGxlJywgb3JkZXI6ICdkZXNjJyB9XHJcblxyXG4gICAgY2FzZSAncG9wdWxhcml0eSc6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICdwb3B1bGFyaXR5Jywgb3JkZXI6ICdkZXNjJyB9XHJcblxyXG4gICAgY2FzZSAncmF0aW5nJzpcclxuICAgICAgcmV0dXJuIHsgb3JkZXJieTogJ3JhdGluZycsIG9yZGVyOiAnZGVzYycgfVxyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiB7IG9yZGVyYnk6ICdtZW51X29yZGVyJywgb3JkZXI6ICdkZXNjJyB9XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgcmVxdWVzdElkID0gMFxyXG53YXRjaChcclxuICAoKSA9PiAoe1xyXG4gICAgY2F0ZWdvcnk6IHNlbGVjdGVkQ2F0ZWdvcnkudmFsdWUsXHJcbiAgICBzZWFyY2g6IHNlYXJjaC52YWx1ZSxcclxuICAgIHBhZ2U6IGN1cnJlbnRQYWdlLnZhbHVlLFxyXG4gICAgc29ydDogc29ydEJ5LnZhbHVlLFxyXG4gICAgcHJpY2VUcmlnZ2VyOiBwcmljZUNoYW5nZWQudmFsdWUgLy8g4pyFIG9ubHkgdHJpZ2dlciB3aGVuIHVzZXIgcmVsZWFzZXMgc2xpZGVyXHJcbiAgfSksXHJcbiAgYXN5bmMgKGZpbHRlcnMsIHByZXYpID0+IHtcclxuICAgIGlmIChcclxuICAhaXNSZWFkeS52YWx1ZSB8fFxyXG4gIHByaWNlUmFuZ2UudmFsdWUubWluID09PSBudWxsIHx8XHJcbiAgcHJpY2VSYW5nZS52YWx1ZS5tYXggPT09IG51bGxcclxuICAgICkgcmV0dXJuXHJcbiAgICBpZiAoaXNGZXRjaGluZy52YWx1ZSkgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgY3VycmVudFJlcXVlc3QgPSArK3JlcXVlc3RJZFxyXG5cclxuY29uc3QgY2F0ZWdvcnlDaGFuZ2VkID1cclxuICBwcmV2ICYmXHJcbiAgSlNPTi5zdHJpbmdpZnkoWy4uLmZpbHRlcnMuY2F0ZWdvcnldLnNvcnQoKSkgIT09XHJcbiAgSlNPTi5zdHJpbmdpZnkoWy4uLnByZXYuY2F0ZWdvcnldLnNvcnQoKSlcclxuICAgIC8qaWYgKGNhdGVnb3J5Q2hhbmdlZCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ2F0ZWdvcnkgY2hhbmdlZCDihpIgZmV0Y2hpbmcgcHJpY2UgbWV0YScpXHJcblxyXG4gICAgICBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzTG9hZGluZy52YWx1ZSA9IHRydWVcclxuICAgICAgYXdhaXQgZmV0Y2hQcmljZU1ldGEoZmlsdGVycy5jYXRlZ29yeSlcclxuXHJcbiAgICAgIC8vcmV0dXJuXHJcbiAgICB9Ki9cclxuICAgIGlmIChjYXRlZ29yeUNoYW5nZWQpIHtcclxuICAgICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0c0xvYWRpbmcudmFsdWUgPSB0cnVlXHJcblxyXG4gICAgICBhd2FpdCBmZXRjaFByaWNlTWV0YShmaWx0ZXJzLmNhdGVnb3J5KVxyXG5cclxuICAgICAgcHJpY2VNaW4udmFsdWUgPSBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5taW5cclxuICAgICAgcHJpY2VNYXgudmFsdWUgPSBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5tYXhcclxuICAgICAgcHJpY2VSYW5nZS52YWx1ZSA9IHtcclxuICAgICAgICBtaW46IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1pbixcclxuICAgICAgICBtYXg6IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1heFxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAgIHByZXYgJiZcclxuICAgICAgICAoZmlsdGVycy5zZWFyY2ggIT09IHByZXYuc2VhcmNoIHx8XHJcbiAgICAgICAgICAgIGZpbHRlcnMucHJpY2VUcmlnZ2VyICE9PSBwcmV2LnByaWNlVHJpZ2dlcilcclxuICAgICkge1xyXG4gICAgICBpZiAoY3VycmVudFBhZ2UudmFsdWUgIT09IDEpIHtcclxuICAgICAgICBjdXJyZW50UGFnZS52YWx1ZSA9IDFcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRmV0Y2hpbmcudmFsdWUgPSB0cnVlXHJcbmlmIChjdXJyZW50UmVxdWVzdCAhPT0gcmVxdWVzdElkKSByZXR1cm5cclxuICAgIGNvbnNvbGUubG9nKCdQcm9kdWN0cyBmZXRjaCB3YXRjaGVyIHRyaWdnZXJlZCEhIScpXHJcbi8qY29uc3Qgc291cmNlID0gY2F0ZWdvcnlDaGFuZ2VkXHJcbiAgPyBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZVxyXG4gIDogcHJpY2VSYW5nZS52YWx1ZSovXHJcbiAgICBjb25zdCBzb3VyY2UgPSBwcmljZVJhbmdlLnZhbHVlXHJcblxyXG5jb25zdCBtaW4gPSBNYXRoLmZsb29yKHNvdXJjZS5taW4gKiAxMDApXHJcbmNvbnN0IG1heCA9IE1hdGguY2VpbChzb3VyY2UubWF4ICogMTAwKVxyXG4gICAgY29uc3Qgc29ydFBhcmFtcyA9IGdldFNvcnRQYXJhbXMoZmlsdGVycy5zb3J0KVxyXG5cclxuICAgIGF3YWl0IHByb2R1Y3RzU3RvcmUucHJlRmV0Y2hQcm9kdWN0cyh7XHJcbiAgICAgIGFwaTogdHJ1ZSxcclxuICAgICAgcGFnZTogZmlsdGVycy5wYWdlLFxyXG4gICAgICBwZXJfcGFnZTogcGVyUGFnZSxcclxuICAgICAgbWluX3ByaWNlOiBtaW4sXHJcbiAgICAgIG1heF9wcmljZTogbWF4LFxyXG4gICAgICBjYXRlZ29yeTogZmlsdGVycy5jYXRlZ29yeS5sZW5ndGhcclxuICAgICAgICAgID8gZmlsdGVycy5jYXRlZ29yeS5qb2luKCcsJylcclxuICAgICAgICAgIDogbnVsbCxcclxuICAgICAgc2VhcmNoOiBmaWx0ZXJzLnNlYXJjaCxcclxuICAgICAgLi4uc29ydFBhcmFtc1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyA0LiBOT1cgdXBkYXRlIFVJIHRvZ2V0aGVyIPCfkqVcclxuaWYgKGNhdGVnb3J5Q2hhbmdlZCkge1xyXG4gIHByaWNlTWluLnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUubWluXHJcbiAgcHJpY2VNYXgudmFsdWUgPSBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5tYXhcclxuICBwcmljZVJhbmdlLnZhbHVlID0gcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWVcclxufVxyXG4gICAgaXNGZXRjaGluZy52YWx1ZSA9IGZhbHNlXHJcbiAgfVxyXG4pXHJcblxyXG53YXRjaChcclxuICAoKSA9PiByb3V0ZS5wYXJhbXMuc2x1ZyxcclxuICBhc3luYyAobmV3U2x1ZykgPT4ge1xyXG4gICAgY2F0ZWdvcnlTbHVnLnZhbHVlID0gbmV3U2x1Z1xyXG5cclxuICAgIGlmICghY2F0ZWdvcmllcy52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgYXdhaXQgZmV0Y2hDYXRlZ29yaWVzKClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXQgPSBjYXRlZ29yaWVzLnZhbHVlLmZpbmQoYyA9PiBjLnNsdWcgPT09IG5ld1NsdWcpXHJcblxyXG4gICAgaWYgKGNhdCkge1xyXG4gICAgICBzZWxlY3RlZENhdGVnb3J5LnZhbHVlID0gW2NhdC5pZF1cclxuICAgICAgc2VsZWN0ZWRDYXRlZ29yeU9CSi52YWx1ZSA9IGNhdFxyXG5cclxuICAgICAgLy8g8J+UpSBGSVggU1RBUlRTIEhFUkVcclxuICAgICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0cy52YWx1ZSA9IFtdXHJcbiAgICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlID0gdHJ1ZVxyXG5cclxuICAgICAgLy8gMS4gZmV0Y2ggcHJpY2UgbWV0YSBGSVJTVFxyXG4gICAgICBhd2FpdCBmZXRjaFByaWNlTWV0YShjYXQuaWQpXHJcblxyXG4gICAgICBwcmljZU1pbi52YWx1ZSA9IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1pblxyXG4gICAgICBwcmljZU1heC52YWx1ZSA9IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1heFxyXG4gICAgICBwcmljZVJhbmdlLnZhbHVlID0geyAuLi5wZW5kaW5nUHJpY2VSYW5nZS52YWx1ZSB9XHJcblxyXG4gICAgICAvLyAyLiBmZXRjaCBwcm9kdWN0cyBBRlRFUiBwcmljZSBpcyByZWFkeVxyXG4gICAgICBhd2FpdCBwcm9kdWN0c1N0b3JlLnByZUZldGNoUHJvZHVjdHMoe1xyXG4gICAgICAgIGFwaTogdHJ1ZSxcclxuICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgIHBlcl9wYWdlOiBwZXJQYWdlLFxyXG4gICAgICAgIGNhdGVnb3J5OiBjYXQuaWRcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHByb2R1Y3RzU3RvcmUucHJvZHVjdHNMb2FkaW5nLnZhbHVlID0gZmFsc2VcclxuICAgIH1cclxuICB9XHJcbilcclxuXHJcbi8qY29uc3QgaGFzU1NSUHJvZHVjdHMgPVxyXG4gIHByb2Nlc3MuZW52LkNMSUVOVCAmJlxyXG4gIEFycmF5LmlzQXJyYXkod2luZG93Ll9fUFJPRFVDVFNfREFUQV9fKSAmJlxyXG4gIHdpbmRvdy5fX1BST0RVQ1RTX0RBVEFfXy5sZW5ndGggPiAwKi9cclxuLy8gTGlmZWN5Y2xlXHJcbi8vIOKchSBGaXhcclxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcclxuICBpc0h5ZHJhdGVkLnZhbHVlID0gdHJ1ZVxyXG5cclxuICAvLyBwcmVGZXRjaCBhbHJlYWR5IGhhbmRsZWQgY2xpZW50IG5hdiDigJQgb25seSBmZXRjaCBpZiB0cnVseSBub3RoaW5nIGxvYWRlZFxyXG4gIGlmICghcHJvZHVjdHNTdG9yZS5pbml0aWFsaXplZC52YWx1ZSkge1xyXG4gICAgcHJvZHVjdHNTdG9yZS5wcm9kdWN0c0xvYWRpbmcudmFsdWUgPSB0cnVlXHJcbiAgICBhd2FpdCBwcm9kdWN0c1N0b3JlLnByZUZldGNoUHJvZHVjdHMoe1xyXG4gICAgICBhcGk6IHRydWUsXHJcbiAgICAgIHBhZ2U6IDEsXHJcbiAgICAgIHBlcl9wYWdlOiBwZXJQYWdlLFxyXG4gICAgICBjYXRlZ29yeTogc2VsZWN0ZWRDYXRlZ29yeU9CSi52YWx1ZT8uaWQgfHwgbnVsbFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGlmICghcHJpY2VNaW4udmFsdWUpIHtcclxuICAgIGF3YWl0IGZldGNoUHJpY2VNZXRhKHNlbGVjdGVkQ2F0ZWdvcnlPQkoudmFsdWU/LmlkIHx8IG51bGwpXHJcbiAgICBwcmljZU1pbi52YWx1ZSA9IHBlbmRpbmdQcmljZVJhbmdlLnZhbHVlLm1pblxyXG4gICAgcHJpY2VNYXgudmFsdWUgPSBwZW5kaW5nUHJpY2VSYW5nZS52YWx1ZS5tYXhcclxuICAgIHByaWNlUmFuZ2UudmFsdWUgPSB7IC4uLnBlbmRpbmdQcmljZVJhbmdlLnZhbHVlIH1cclxuICB9XHJcblxyXG4gIGlmICghQXJyYXkuaXNBcnJheShjYXRlZ29yaWVzLnZhbHVlKSB8fCAhY2F0ZWdvcmllcy52YWx1ZS5sZW5ndGgpIHtcclxuICAgIGF3YWl0IGZldGNoQ2F0ZWdvcmllcygpXHJcbiAgfVxyXG5cclxuICBpZiAoIWlzUmVhZHkudmFsdWUpIHtcclxuICAgIGlzUmVhZHkudmFsdWUgPSB0cnVlICAvLyBvbmx5IHNldCBpZiBub3QgYWxyZWFkeSBzZXRcclxuICB9XHJcbn0pXHJcbi8vIEZ1bmN0aW9uIHRvIHJlY2FsY3VsYXRlIHByaWNlIGxpbWl0cyBiYXNlZCBvbiBhIHByb2R1Y3QgbGlzdFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hQcmljZU1ldGEoY2F0ZWdvcnkgPSBudWxsKSB7XHJcbiAgbGV0IHVybCA9ICdodHRwczovL251eHQubWVpZGFubS5jb20vd3AtanNvbi93Yy9zdG9yZS92MS9wcm9kdWN0cy1tZXRhJ1xyXG5cclxuICBpZiAoY2F0ZWdvcnkpIHtcclxuICAgIHVybCArPSBgP2NhdGVnb3J5PSR7Y2F0ZWdvcnl9YFxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKVxyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcblxyXG4gIC8vIOKdlyBET04nVCB1cGRhdGUgVUkgeWV0XHJcbiAgcGVuZGluZ1ByaWNlUmFuZ2UudmFsdWUgPSB7XHJcbiAgICBtaW46IE51bWJlcihkYXRhLm1pbl9wcmljZSksXHJcbiAgICBtYXg6IE51bWJlcihkYXRhLm1heF9wcmljZSlcclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRhXHJcbn1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkPlxyXG5AaW1wb3J0ICdzcmMvY3NzL3Byb2R1Y3QtYXJjaGl2ZS5jc3MnO1xyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsiYXBpIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZUJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUErTEEsTUFBTSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWhCaEIsVUFBTSxLQUFLLFVBQUE7QUFDWCxVQUFNLEVBQUUsOEJBQThCO0FBRXRDLGFBQVMsY0FBYztBQUdyQixnQ0FBMEIsUUFBUSxLQUFLLEdBQUc7QUFBQSxJQUk1QztBQUVBLFVBQU0sYUFBYSxJQUFJLEVBQUU7QUFDekIsVUFBTSxtQkFBbUIsSUFBSSxFQUFFO0FBQy9CLFVBQU0sU0FBUyxJQUFJLEVBQUU7QUFDckIsVUFBTSxjQUFjLElBQUksQ0FBQztBQUV6QixVQUFNLFNBQVMsSUFBSSxZQUFZO0FBQy9CLFVBQU0sY0FBYyxJQUFJLEtBQUs7QUFDN0IsVUFBTSxjQUFjO0FBQUEsTUFDbEIsRUFBRSxPQUFPLFdBQVcsT0FBTyxhQUFBO0FBQUEsTUFDM0IsRUFBRSxPQUFPLFVBQVUsT0FBTyxZQUFBO0FBQUEsTUFDMUIsRUFBRSxPQUFPLHNCQUFzQixPQUFPLFlBQUE7QUFBQSxNQUN0QyxFQUFFLE9BQU8sc0JBQXNCLE9BQU8sYUFBQTtBQUFB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
