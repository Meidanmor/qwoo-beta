import { _ as _export_sfc, j as QCard, ad as QCardSection, i as QInput, af as QCheckbox, Q as QBtn, a7 as QOptionGroup, ae as QCardActions, a2 as QSpinner, r as useRouter, c as cart, ag as fetchWithToken } from "./index-DDAg5YDa.js";
import { Q as QChip } from "./QChip-CN1ZGBoZ.js";
import { Q as QImg } from "./QImg-BSHjw5MV.js";
import { Q as QForm, G as GoogleLoginButton } from "./GoogleLoginButton-D1ipgZ7H.js";
import { k as resolveComponent, o as openBlock, m as createElementBlock, a9 as createBaseVNode, t as createVNode, u as createCommentVNode, p as createBlock, q as withCtx, ac as toDisplayString, aa as Fragment, ab as renderList, s as createTextVNode, ad as withModifiers, j as ref, r as reactive, x as onMounted, e as computed } from "./quasar-observers-delayed-tSHCOYpR.js";
import { u as useMeta } from "./use-meta-BVxOmsjs.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  async preFetch({ ssrContext }) {
    const seo = {
      title: "Checkout",
      description: "Checkout page",
      robots: "noindex, follow"
    };
    if (ssrContext) {
      ssrContext.seoData = seo;
    }
  }
}, {
  __name: "CheckoutPage",
  setup(__props, { expose: __expose }) {
    __expose();
    useMeta(() => {
      return {
        title: "Checkout",
        meta: {
          robots: { name: "robots", content: "noindex, follow" },
          description: { name: "description", content: "Checkout page" }
        }
      };
    });
    const syncError = ref(null);
    const token = ref("");
    {
      token.value = localStorage.getItem("jwt_token");
      console.log(!!token.value);
    }
    const checkoutReady = ref(false);
    const isLoggedIn = ref(!!token.value);
    const router = useRouter();
    const form = reactive({
      first_name: cart.state.cart_array?.shipping_address?.first_name || "",
      last_name: cart.state.cart_array?.shipping_address?.last_name || "",
      email: cart.state.cart_array?.billing_address?.email || "",
      phone: cart.state.cart_array?.billing_address?.phone || "",
      shipping: {
        address_1: cart.state.cart_array?.shipping_address?.address_1 || "",
        city: cart.state.cart_array?.shipping_address?.city || "",
        postcode: cart.state.cart_array?.shipping_address?.postcode || "",
        country: "IL"
      },
      billing: {
        address_1: cart.state.cart_array?.billing_address?.address_1 || "",
        city: cart.state.cart_array?.billing_address?.city || "",
        postcode: cart.state.cart_array?.billing_address?.postcode || "",
        country: "IL"
      }
    });
    const shippingOptions = computed(() => {
      const rates = cart.state.cart_array?.shipping_rates?.[0]?.shipping_rates || [];
      return rates.map((rate) => ({
        label: `${rate.name} – ${formatCurrency(rate.price, { minorUnit: 2, prefix: "₪" })}`,
        value: rate.rate_id
      }));
    });
    const paymentMethods = computed(() => {
      const methods = cart.state.cart_array?.payment_methods || [];
      return methods.map((method) => ({
        label: method === "bacs" ? "Bank transfer" : method,
        value: method
      }));
    });
    const itemsCount = computed(() => cart.state.cart_array?.items_count || "0");
    const billingSameAsShipping = ref(true);
    const couponCode = ref("");
    const couponApplied = ref(false);
    const couponError = ref(null);
    const paymentMethod = ref("bacs");
    const selectedShippingRateId = ref(null);
    const cartItems = computed(() => cart.state.cart_array.items);
    const cartTotal = computed(() => {
      const total = cart.state.totals?.total_price || "0";
      const formattedTotal = formatCurrency(total, { minorUnit: 2, decimalSeparator: ".", prefix: "₪", suffix: "" });
      return formattedTotal;
    });
    const getSlugFromPermalink = (permalink) => {
      if (permalink) {
        const match = permalink.match(/product\/([^/]+)\/?$/);
        return match ? match[1] : "";
      }
      return "";
    };
    const initializeFormFromCart = async () => {
      const cartData = cart.state.cart_array;
      if (!cartData) {
        console.warn("Cart not ready yet, skipping form init");
        return;
      }
      const billing = cartData.billing_address || {};
      const shipping = cartData.shipping_address || {};
      form.first_name = shipping.first_name || "";
      form.last_name = shipping.last_name || "";
      form.email = billing.email || "";
      form.phone = billing.phone || "";
      form.shipping.address_1 = shipping.address_1 || "";
      form.shipping.city = shipping.city || "";
      form.shipping.postcode = shipping.postcode || "";
      form.shipping.country = shipping.country || "IL";
      form.billing.address_1 = billing.address_1 || "";
      form.billing.city = billing.city || "";
      form.billing.postcode = billing.postcode || "";
      form.billing.country = billing.country || "IL";
    };
    const updateShippingAddress = async () => {
      try {
        const response = await fetchWithToken("https://nuxt.meidanm.com/wp-json/wc/store/v1/cart/update-customer", {
          method: "POST",
          body: JSON.stringify({
            billing_address: {
              first_name: form.first_name,
              last_name: form.last_name,
              email: form.email,
              phone: form.phone,
              address_1: billingSameAsShipping.value ? form.shipping.address_1 : form.billing.address_1,
              city: billingSameAsShipping.value ? form.shipping.city : form.billing.city,
              postcode: billingSameAsShipping.value ? form.shipping.postcode : form.billing.postcode,
              country: billingSameAsShipping.value ? form.shipping.country : form.billing.country
            },
            shipping_address: {
              first_name: form.first_name,
              last_name: form.last_name,
              address_1: form.shipping.address_1,
              city: form.shipping.city,
              postcode: form.shipping.postcode,
              country: form.shipping.country,
              phone: form.phone,
              email: form.email
            }
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update shipping address");
        }
        const updatedCart = await response.json();
        console.log("Cart updated", updatedCart);
      } catch (error) {
        console.error("Error updating shipping address:", error.message);
      }
    };
    const handleInputBlur = (field) => {
      const value = form.shipping[field] ? form.shipping[field] : form[field];
      if (value && value.length > 1) {
        updateShippingAddress();
        fetchShippingRates();
      }
    };
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
    const applyCoupon = () => cart.applyCoupon(couponCode.value);
    const removeCoupon = () => cart.removeCoupon(couponCode.value);
    const fetchShippingRates = async () => {
      if (!cart.state.cart_array) return;
      if (shippingOptions.value.length) {
        selectedShippingRateId.value ??= shippingOptions.value[0].value;
      }
    };
    const onShippingMethodChange = async (newRateId) => {
      try {
        await fetchWithToken("https://nuxt.meidanm.com/wp-json/wc/store/cart/select-shipping-rate", {
          method: "POST",
          body: JSON.stringify({ package_id: 0, rate_id: newRateId })
        });
        await cart.fetchCart();
        console.log(cart);
      } catch (error) {
        console.error("Error updating shipping method:", error);
      }
    };
    const onValidationError = async (ref2) => {
      const valid = await ref2.validate();
      if (!valid) {
        requestAnimationFrame(() => {
          const el = document.activeElement;
          if (el && typeof el.scrollIntoView === "function") {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
        return;
      }
    };
    const submitOrder = async () => {
      if (!cart.state.synced) {
        await syncCart();
        if (syncError.value) {
          return;
        }
      }
      try {
        const payload = {
          billing_address: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone,
            address_1: billingSameAsShipping.value ? form.shipping.address_1 : form.billing.address_1,
            city: billingSameAsShipping.value ? form.shipping.city : form.billing.city,
            postcode: billingSameAsShipping.value ? form.shipping.postcode : form.billing.postcode,
            country: billingSameAsShipping.value ? form.shipping.country : form.billing.country
          },
          shipping_address: {
            first_name: form.first_name,
            last_name: form.last_name,
            address_1: form.shipping.address_1,
            city: form.shipping.city,
            postcode: form.shipping.postcode,
            country: form.shipping.country,
            phone: form.phone,
            email: form.email
          },
          payment_method: paymentMethod.value,
          payment_data: {},
          extensions: {},
          billing_same_as_shipping: billingSameAsShipping.value
        };
        console.log(paymentMethod.value);
        console.log(payload);
        console.log(form);
        const response = await cart.placeOrder(payload);
        console.log("Order placed:", response);
        router.push({
          name: "thank-you",
          query: { orderId: response.order_id, billing_email: response.billing_address.email, order_key: response.order_key }
        });
        await cart.fetchCart();
      } catch (err) {
        console.error("Checkout error:", err.message);
      }
    };
    const syncCart = async () => {
      syncError.value = null;
      if (!needsSync.value) {
        return;
      }
      try {
        await cart.syncLocalCartWithServer();
      } catch (err) {
        console.log(err);
        syncError.value = cart.state.error || "Failed to sync cart";
      }
    };
    const needsSync = computed(() => {
      if (cart.state.offline) return false;
      if (cart.state.synced === false) return true;
      if (!cart.state.cart_array || !Array.isArray(cart.state.cart_array.items)) {
        return false;
      }
      const localItems = cart.state.local_cart.items || [];
      const serverItems = cart.state.cart_array.items || [];
      if (localItems.length !== serverItems.length) return true;
      const serverSigs = new Set(
        serverItems.map((i) => cart.signatureFor(i.id, i.variation))
      );
      for (const li of localItems) {
        if (li._removed) return true;
        const sig = cart.signatureFor(li.id, li.variation);
        if (!serverSigs.has(sig)) return true;
      }
      return false;
    });
    onMounted(async () => {
      checkoutReady.value = false;
      try {
        await initializeFormFromCart();
        await fetchShippingRates();
        checkoutReady.value = true;
      } catch (err) {
        console.error("Initial sync failed:", err);
        syncError.value = "Could not sync your cart. Please check your connection.";
      }
    });
    const __returned__ = { syncError, token, checkoutReady, isLoggedIn, router, form, shippingOptions, paymentMethods, itemsCount, billingSameAsShipping, couponCode, couponApplied, couponError, paymentMethod, selectedShippingRateId, cartItems, cartTotal, getSlugFromPermalink, initializeFormFromCart, updateShippingAddress, handleInputBlur, formatCurrency, applyCoupon, removeCoupon, fetchShippingRates, onShippingMethodChange, onValidationError, submitOrder, syncCart, needsSync, ref, computed, reactive, onMounted, get cart() {
      return cart;
    }, get useRouter() {
      return useRouter;
    }, get useMeta() {
      return useMeta;
    }, get fetchWithToken() {
      return fetchWithToken;
    }, GoogleLoginButton };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "container q-pa-md" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { class: "float-left" };
const _hoisted_4 = { class: "row items-center q-col-gutter-md" };
const _hoisted_5 = { class: "col" };
const _hoisted_6 = { class: "col-auto" };
const _hoisted_7 = {
  key: 0,
  class: "text-positive q-mt-sm"
};
const _hoisted_8 = {
  key: 1,
  class: "text-negative q-mt-sm"
};
const _hoisted_9 = { key: 2 };
const _hoisted_10 = { class: "float-right" };
const _hoisted_11 = { class: "flex" };
const _hoisted_12 = { class: "item-name" };
const _hoisted_13 = { key: 0 };
const _hoisted_14 = { class: "text-h6" };
const _hoisted_15 = {
  key: 2,
  class: "centered"
};
const _hoisted_16 = { key: 3 };
const _hoisted_17 = {
  key: 4,
  class: "text-negative q-mt-md text-center"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[38] || (_cache[38] = createBaseVNode("h1", null, "Checkout", -1)),
    $setup.isLoggedIn === false && $setup.checkoutReady && $setup.itemsCount !== "0" ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode($setup["GoogleLoginButton"])
    ])) : createCommentVNode("", true),
    $setup.checkoutReady && $setup.itemsCount !== "0" ? (openBlock(), createBlock(QForm, {
      key: 1,
      class: "flex",
      onSubmit: withModifiers($setup.submitOrder, ["prevent"]),
      onValidationError: $setup.onValidationError
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_3, [
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[28] || (_cache[28] = createBaseVNode("div", { class: "text-h6" }, "Personal Details", -1)),
                  createVNode(QInput, {
                    onBlur: _cache[0] || (_cache[0] = ($event) => $setup.handleInputBlur("first_name")),
                    modelValue: $setup.form.first_name,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.first_name = $event),
                    label: "First Name",
                    filled: "",
                    class: "q-mb-sm",
                    rules: [(val) => !!val || "First Name is required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    onBlur: _cache[2] || (_cache[2] = ($event) => $setup.handleInputBlur("last_name")),
                    modelValue: $setup.form.last_name,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.last_name = $event),
                    label: "Last Name",
                    filled: "",
                    class: "q-mb-sm",
                    rules: [(val) => !!val || "Last Name is required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    onBlur: _cache[4] || (_cache[4] = ($event) => $setup.handleInputBlur("email")),
                    modelValue: $setup.form.email,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.form.email = $event),
                    label: "Email",
                    filled: "",
                    class: "q-mb-sm",
                    type: "text",
                    rules: [
                      (val) => !!val || "Email is required",
                      (val) => /^\S+@\S+\.\S+$/.test(val) || "Please enter a valid email"
                    ]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    onBlur: _cache[6] || (_cache[6] = ($event) => $setup.handleInputBlur("phone")),
                    modelValue: $setup.form.phone,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.form.phone = $event),
                    label: "Phone",
                    filled: "",
                    rules: [(val) => !!val || "Phone is required"]
                  }, null, 8, ["modelValue", "rules"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[29] || (_cache[29] = createBaseVNode("div", { class: "text-h6" }, "Shipping Address", -1)),
                  createVNode(QInput, {
                    onBlur: _cache[8] || (_cache[8] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.shipping.address_1,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.form.shipping.address_1 = $event),
                    label: "Address",
                    filled: "",
                    class: "q-mb-sm",
                    rules: [(val) => !!val || "Address is required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    onBlur: _cache[10] || (_cache[10] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.shipping.city,
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.form.shipping.city = $event),
                    label: "City",
                    filled: "",
                    class: "q-mb-sm",
                    rules: [(val) => !!val || "City is required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    onBlur: _cache[12] || (_cache[12] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.shipping.postcode,
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.form.shipping.postcode = $event),
                    label: "Postcode",
                    filled: "",
                    class: "q-mb-sm",
                    rules: [(val) => !!val || "Postcode is required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    readonly: "",
                    onBlur: _cache[14] || (_cache[14] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.shipping.country,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.form.shipping.country = $event),
                    label: "Country",
                    filled: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QCheckbox, {
                    modelValue: $setup.billingSameAsShipping,
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.billingSameAsShipping = $event),
                    label: "Different billing address?"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          !$setup.billingSameAsShipping ? (openBlock(), createBlock(QCard, {
            key: 0,
            class: "q-mb-md"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[30] || (_cache[30] = createBaseVNode("div", { class: "text-h6" }, "Billing Address", -1)),
                  createVNode(QInput, {
                    onBlur: _cache[17] || (_cache[17] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.billing.address_1,
                    "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => $setup.form.billing.address_1 = $event),
                    label: "Billing Address",
                    filled: "",
                    class: "q-mb-sm"
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    onBlur: _cache[19] || (_cache[19] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.billing.city,
                    "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.form.billing.city = $event),
                    label: "City",
                    filled: "",
                    class: "q-mb-sm"
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    onBlur: _cache[21] || (_cache[21] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.billing.postcode,
                    "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.form.billing.postcode = $event),
                    label: "Postcode",
                    filled: "",
                    class: "q-mb-sm"
                  }, null, 8, ["modelValue"]),
                  createVNode(QInput, {
                    onBlur: _cache[23] || (_cache[23] = ($event) => $setup.handleInputBlur("postcode")),
                    modelValue: $setup.form.billing.country,
                    "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $setup.form.billing.country = $event),
                    label: "Country",
                    filled: ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[31] || (_cache[31] = createBaseVNode("div", { class: "text-h6" }, "Coupon", -1)),
                  createBaseVNode("div", _hoisted_4, [
                    createBaseVNode("div", _hoisted_5, [
                      createVNode(QInput, {
                        modelValue: $setup.couponCode,
                        "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => $setup.couponCode = $event),
                        label: "Coupon code",
                        filled: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_6, [
                      createVNode(QBtn, {
                        label: "Apply",
                        color: "secondary",
                        onClick: $setup.applyCoupon
                      }),
                      $setup.couponApplied ? (openBlock(), createBlock(QBtn, {
                        key: 0,
                        label: "Remove Coupon",
                        color: "negative",
                        onClick: $setup.removeCoupon
                      })) : createCommentVNode("", true)
                    ])
                  ]),
                  $setup.couponApplied ? (openBlock(), createElementBlock("div", _hoisted_7, " Coupon applied successfully! ")) : createCommentVNode("", true),
                  $setup.couponError ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString($setup.couponError), 1)) : createCommentVNode("", true),
                  $setup.cart.state.coupons.length ? (openBlock(), createElementBlock("div", _hoisted_9, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList($setup.cart.state.coupons, (coupon) => {
                      return openBlock(), createElementBlock("div", {
                        key: coupon.code,
                        class: "q-mb-sm row items-center"
                      }, [
                        createVNode(QChip, {
                          color: "secondary",
                          "text-color": "white",
                          class: "q-mr-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(coupon.code), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QBtn, {
                          flat: "",
                          color: "negative",
                          label: "Remove",
                          onClick: ($event) => $setup.removeCoupon(coupon.code)
                        }, null, 8, ["onClick"])
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_10, [
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[32] || (_cache[32] = createBaseVNode("div", { class: "text-h6" }, "Your Cart", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList($setup.cartItems, (item) => {
                    return openBlock(), createElementBlock("div", {
                      key: item.key,
                      class: "q-my-sm flex items-center"
                    }, [
                      createBaseVNode("div", null, [
                        item.images.length ? (openBlock(), createBlock(QImg, {
                          key: 0,
                          src: item.images[0].src,
                          alt: item.name,
                          height: "100px",
                          width: "100px",
                          class: "rounded-borders"
                        }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_11, [
                        createBaseVNode("div", _hoisted_12, [
                          createVNode(_component_router_link, {
                            to: `/product/${$setup.getSlugFromPermalink(item.permalink)}`,
                            class: "no-decoration"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["to"]),
                          item.variation && item.variation.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(item.variation, (variation, index) => {
                              return openBlock(), createElementBlock("div", { key: index }, toDisplayString(variation.attribute) + ": " + toDisplayString(variation.value), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ]),
                        createTextVNode(" × " + toDisplayString(item.quantity) + " - " + toDisplayString($setup.formatCurrency(item.totals?.line_total, { minorUnit: item.totals?.currency_minor_unit, decimalSeparator: item.totals?.currency_decimal_separator, prefix: item.totals?.currency_prefix, suffix: item.totals?.currency_suffix })), 1)
                      ])
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[33] || (_cache[33] = createBaseVNode("div", { class: "text-h6" }, "Choose Shipping Method", -1)),
                  createVNode(QOptionGroup, {
                    modelValue: $setup.selectedShippingRateId,
                    "onUpdate:modelValue": [
                      _cache[26] || (_cache[26] = ($event) => $setup.selectedShippingRateId = $event),
                      $setup.onShippingMethodChange
                    ],
                    options: $setup.shippingOptions,
                    type: "radio",
                    color: "secondary"
                  }, null, 8, ["modelValue", "options"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _cache[34] || (_cache[34] = createBaseVNode("div", { class: "text-h6" }, "Payment Method", -1)),
                  createVNode(QOptionGroup, {
                    modelValue: $setup.paymentMethod,
                    "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $setup.paymentMethod = $event),
                    options: $setup.paymentMethods,
                    type: "radio",
                    color: "secondary"
                  }, null, 8, ["modelValue", "options"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, { class: "q-mb-md" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_14, "Total: " + toDisplayString($setup.cartTotal), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, null, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    label: "Place Order",
                    type: "submit",
                    color: "secondary"
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])
      ]),
      _: 1
    })) : !$setup.checkoutReady ? (openBlock(), createElementBlock("div", _hoisted_15, [
      createVNode(QSpinner, {
        color: "secondary",
        size: "2em"
      }),
      _cache[35] || (_cache[35] = createBaseVNode("div", null, "Synchronizing cart, please wait...", -1))
    ])) : $setup.checkoutReady && $setup.itemsCount === "0" ? (openBlock(), createElementBlock("div", _hoisted_16, [
      _cache[37] || (_cache[37] = createTextVNode(" Your cart is empty! ", -1)),
      createVNode(_component_router_link, { to: "/products/" }, {
        default: withCtx(() => [..._cache[36] || (_cache[36] = [
          createTextVNode("Go to shop", -1)
        ])]),
        _: 1
      })
    ])) : createCommentVNode("", true),
    $setup.syncError ? (openBlock(), createElementBlock("div", _hoisted_17, [
      createTextVNode(toDisplayString($setup.syncError) + " ", 1),
      createVNode(QBtn, {
        label: "Retry Sync",
        color: "secondary",
        onClick: $setup.syncCart,
        class: "q-ml-md"
      })
    ])) : createCommentVNode("", true)
  ]);
}
const CheckoutPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-03edb1d8"], ["__file", "CheckoutPage.vue"]]);
export {
  CheckoutPage as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tvdXRQYWdlLUR4blVXZXRELmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvQ2hlY2tvdXRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHEtcGEtbWRcIj5cclxuICAgICAgPGgxPkNoZWNrb3V0PC9oMT5cclxuICAgICAgPGRpdiB2LWlmPVwiaXNMb2dnZWRJbiA9PT0gZmFsc2UgJiYgY2hlY2tvdXRSZWFkeSAmJiBpdGVtc0NvdW50ICE9PSAnMCdcIj5cclxuICAgICAgICA8R29vZ2xlTG9naW5CdXR0b24gLz5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8cS1mb3JtIGNsYXNzPVwiZmxleFwiIHYtaWY9XCJjaGVja291dFJlYWR5ICYmIGl0ZW1zQ291bnQgIT09ICcwJ1wiIEBzdWJtaXQucHJldmVudD1cInN1Ym1pdE9yZGVyXCIgQHZhbGlkYXRpb24tZXJyb3I9XCJvblZhbGlkYXRpb25FcnJvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxvYXQtbGVmdFwiPlxyXG4gICAgICA8IS0tIFBlcnNvbmFsIEluZm8gLS0+XHJcbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJxLW1iLW1kXCI+XHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5QZXJzb25hbCBEZXRhaWxzPC9kaXY+XHJcbiAgICAgICAgICA8cS1pbnB1dCBAYmx1cj1cImhhbmRsZUlucHV0Qmx1cignZmlyc3RfbmFtZScpXCIgdi1tb2RlbD1cImZvcm0uZmlyc3RfbmFtZVwiIGxhYmVsPVwiRmlyc3QgTmFtZVwiIGZpbGxlZCBjbGFzcz1cInEtbWItc21cIiA6cnVsZXM9XCJbdmFsID0+ICEhdmFsIHx8ICdGaXJzdCBOYW1lIGlzIHJlcXVpcmVkJ11cIi8+XHJcbiAgICAgICAgICA8cS1pbnB1dCBAYmx1cj1cImhhbmRsZUlucHV0Qmx1cignbGFzdF9uYW1lJylcIiB2LW1vZGVsPVwiZm9ybS5sYXN0X25hbWVcIiBsYWJlbD1cIkxhc3QgTmFtZVwiIGZpbGxlZCBjbGFzcz1cInEtbWItc21cIiA6cnVsZXM9XCJbdmFsID0+ICEhdmFsIHx8ICdMYXN0IE5hbWUgaXMgcmVxdWlyZWQnXVwiLz5cclxuICAgICAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgICAgICAgQGJsdXI9XCJoYW5kbGVJbnB1dEJsdXIoJ2VtYWlsJylcIiB2LW1vZGVsPVwiZm9ybS5lbWFpbFwiXHJcbiAgICAgICAgICAgICAgbGFiZWw9XCJFbWFpbFwiIGZpbGxlZCBjbGFzcz1cInEtbWItc21cIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICA6cnVsZXM9XCJbXHJcbiAgICAgICAgICAgICAgICAgIHZhbCA9PiAhIXZhbCB8fCAnRW1haWwgaXMgcmVxdWlyZWQnLFxyXG4gICAgdmFsID0+IC9eXFxTK0BcXFMrXFwuXFxTKyQvLnRlc3QodmFsKSB8fCAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwnXHJcbiAgXVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPHEtaW5wdXQgQGJsdXI9XCJoYW5kbGVJbnB1dEJsdXIoJ3Bob25lJylcIiB2LW1vZGVsPVwiZm9ybS5waG9uZVwiIGxhYmVsPVwiUGhvbmVcIiBmaWxsZWQgOnJ1bGVzPVwiW3ZhbCA9PiAhIXZhbCB8fCAnUGhvbmUgaXMgcmVxdWlyZWQnXVwiLz5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8L3EtY2FyZD5cclxuXHJcbiAgICAgIDwhLS0gU2hpcHBpbmcgQWRkcmVzcyAtLT5cclxuICAgICAgPHEtY2FyZCBjbGFzcz1cInEtbWItbWRcIj5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlNoaXBwaW5nIEFkZHJlc3M8L2Rpdj5cclxuICAgICAgICAgIDxxLWlucHV0IEBibHVyPVwiaGFuZGxlSW5wdXRCbHVyKCdwb3N0Y29kZScpXCIgdi1tb2RlbD1cImZvcm0uc2hpcHBpbmcuYWRkcmVzc18xXCIgbGFiZWw9XCJBZGRyZXNzXCIgZmlsbGVkIGNsYXNzPVwicS1tYi1zbVwiIDpydWxlcz1cIlt2YWwgPT4gISF2YWwgfHwgJ0FkZHJlc3MgaXMgcmVxdWlyZWQnXVwiLz5cclxuICAgICAgICAgIDxxLWlucHV0IEBibHVyPVwiaGFuZGxlSW5wdXRCbHVyKCdwb3N0Y29kZScpXCIgdi1tb2RlbD1cImZvcm0uc2hpcHBpbmcuY2l0eVwiIGxhYmVsPVwiQ2l0eVwiIGZpbGxlZCBjbGFzcz1cInEtbWItc21cIiA6cnVsZXM9XCJbdmFsID0+ICEhdmFsIHx8ICdDaXR5IGlzIHJlcXVpcmVkJ11cIi8+XHJcbiAgICAgICAgICA8cS1pbnB1dCBAYmx1cj1cImhhbmRsZUlucHV0Qmx1cigncG9zdGNvZGUnKVwiIHYtbW9kZWw9XCJmb3JtLnNoaXBwaW5nLnBvc3Rjb2RlXCIgbGFiZWw9XCJQb3N0Y29kZVwiIGZpbGxlZCBjbGFzcz1cInEtbWItc21cIiA6cnVsZXM9XCJbdmFsID0+ICEhdmFsIHx8ICdQb3N0Y29kZSBpcyByZXF1aXJlZCddXCIvPlxyXG4gICAgICAgICAgPHEtaW5wdXQgcmVhZG9ubHkgQGJsdXI9XCJoYW5kbGVJbnB1dEJsdXIoJ3Bvc3Rjb2RlJylcIiB2LW1vZGVsPVwiZm9ybS5zaGlwcGluZy5jb3VudHJ5XCIgbGFiZWw9XCJDb3VudHJ5XCIgZmlsbGVkIC8+XHJcbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuXHJcbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgICAgPHEtY2hlY2tib3ggdi1tb2RlbD1cImJpbGxpbmdTYW1lQXNTaGlwcGluZ1wiIGxhYmVsPVwiRGlmZmVyZW50IGJpbGxpbmcgYWRkcmVzcz9cIiAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG5cclxuICAgICAgPCEtLSBCaWxsaW5nIEFkZHJlc3MgKGNvbmRpdGlvbmFsKSAtLT5cclxuICAgICAgPHEtY2FyZCB2LWlmPVwiIWJpbGxpbmdTYW1lQXNTaGlwcGluZ1wiIGNsYXNzPVwicS1tYi1tZFwiPlxyXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+QmlsbGluZyBBZGRyZXNzPC9kaXY+XHJcbiAgICAgICAgICA8cS1pbnB1dCBAYmx1cj1cImhhbmRsZUlucHV0Qmx1cigncG9zdGNvZGUnKVwiIHYtbW9kZWw9XCJmb3JtLmJpbGxpbmcuYWRkcmVzc18xXCIgbGFiZWw9XCJCaWxsaW5nIEFkZHJlc3NcIiBmaWxsZWQgY2xhc3M9XCJxLW1iLXNtXCIgLz5cclxuICAgICAgICAgIDxxLWlucHV0IEBibHVyPVwiaGFuZGxlSW5wdXRCbHVyKCdwb3N0Y29kZScpXCIgdi1tb2RlbD1cImZvcm0uYmlsbGluZy5jaXR5XCIgbGFiZWw9XCJDaXR5XCIgZmlsbGVkIGNsYXNzPVwicS1tYi1zbVwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCBAYmx1cj1cImhhbmRsZUlucHV0Qmx1cigncG9zdGNvZGUnKVwiIHYtbW9kZWw9XCJmb3JtLmJpbGxpbmcucG9zdGNvZGVcIiBsYWJlbD1cIlBvc3Rjb2RlXCIgZmlsbGVkIGNsYXNzPVwicS1tYi1zbVwiIC8+XHJcbiAgICAgICAgICA8cS1pbnB1dCBAYmx1cj1cImhhbmRsZUlucHV0Qmx1cigncG9zdGNvZGUnKVwiIHYtbW9kZWw9XCJmb3JtLmJpbGxpbmcuY291bnRyeVwiIGxhYmVsPVwiQ291bnRyeVwiIGZpbGxlZCAvPlxyXG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgIDwvcS1jYXJkPlxyXG5cclxuICAgICAgPCEtLSBDb3Vwb24gU2VjdGlvbiAtLT5cclxuICAgICAgPHEtY2FyZCBjbGFzcz1cInEtbWItbWRcIj5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkNvdXBvbjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1jb2wtZ3V0dGVyLW1kXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiY291cG9uQ29kZVwiIGxhYmVsPVwiQ291cG9uIGNvZGVcIiBmaWxsZWQgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPlxyXG4gICAgICAgICAgICAgIDxxLWJ0biBsYWJlbD1cIkFwcGx5XCIgY29sb3I9XCJzZWNvbmRhcnlcIiBAY2xpY2s9XCJhcHBseUNvdXBvblwiIC8+XHJcbiAgICAgICAgICAgICAgPHEtYnRuXHJcbiAgICAgICAgICAgICAgICAgIHYtaWY9XCJjb3Vwb25BcHBsaWVkXCJcclxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJSZW1vdmUgQ291cG9uXCJcclxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlbW92ZUNvdXBvblwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cImNvdXBvbkFwcGxpZWRcIiBjbGFzcz1cInRleHQtcG9zaXRpdmUgcS1tdC1zbVwiPlxyXG4gICAgICAgICAgICBDb3Vwb24gYXBwbGllZCBzdWNjZXNzZnVsbHkhXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgdi1pZj1cImNvdXBvbkVycm9yXCIgY2xhc3M9XCJ0ZXh0LW5lZ2F0aXZlIHEtbXQtc21cIj5cclxuICAgICAgICAgICAge3sgY291cG9uRXJyb3IgfX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiB2LWlmPVwiY2FydC5zdGF0ZS5jb3Vwb25zLmxlbmd0aFwiPlxyXG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwiY291cG9uIGluIGNhcnQuc3RhdGUuY291cG9uc1wiIDprZXk9XCJjb3Vwb24uY29kZVwiIGNsYXNzPVwicS1tYi1zbSByb3cgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgPHEtY2hpcCBjb2xvcj1cInNlY29uZGFyeVwiIHRleHQtY29sb3I9XCJ3aGl0ZVwiIGNsYXNzPVwicS1tci1zbVwiPlxyXG4gICAgICAgICAgICAgICAge3sgY291cG9uLmNvZGUgfX1cclxuICAgICAgICAgICAgICA8L3EtY2hpcD5cclxuICAgICAgICAgICAgICA8cS1idG4gZmxhdCBjb2xvcj1cIm5lZ2F0aXZlXCIgbGFiZWw9XCJSZW1vdmVcIiBAY2xpY2s9XCJyZW1vdmVDb3Vwb24oY291cG9uLmNvZGUpXCIgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8L3EtY2FyZD5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxvYXQtcmlnaHRcIj5cclxuICAgICAgPCEtLSBDYXJ0IEl0ZW1zIC0tPlxyXG4gICAgICA8cS1jYXJkIGNsYXNzPVwicS1tYi1tZFwiPlxyXG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+WW91ciBDYXJ0PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHYtZm9yPVwiaXRlbSBpbiBjYXJ0SXRlbXNcIiA6a2V5PVwiaXRlbS5rZXlcIiBjbGFzcz1cInEtbXktc20gZmxleCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICA8cS1pbWdcclxuICAgICAgICAgICAgICB2LWlmPVwiaXRlbS5pbWFnZXMubGVuZ3RoXCJcclxuICAgICAgICAgICAgICA6c3JjPVwiaXRlbS5pbWFnZXNbMF0uc3JjXCJcclxuICAgICAgICAgICAgICA6YWx0PVwiaXRlbS5uYW1lXCJcclxuICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDBweFwiXHJcbiAgICAgICAgICAgICAgd2lkdGg9XCIxMDBweFwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXhcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPlxyXG4gICAgICA8cm91dGVyLWxpbmtcclxuICA6dG89XCJgL3Byb2R1Y3QvJHtnZXRTbHVnRnJvbVBlcm1hbGluayhpdGVtLnBlcm1hbGluayl9YFwiXHJcbiAgY2xhc3M9XCJuby1kZWNvcmF0aW9uXCI+XHJcbiAgICAgICAgICAgICAge3sgaXRlbS5uYW1lIH19PC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgIDxkaXYgdi1pZj1cIml0ZW0udmFyaWF0aW9uICYmIGl0ZW0udmFyaWF0aW9uLmxlbmd0aCA+IDBcIj5cclxuICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgIHYtZm9yPVwiKHZhcmlhdGlvbiwgaW5kZXgpIGluIGl0ZW0udmFyaWF0aW9uXCJcclxuICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICB7e3ZhcmlhdGlvbi5hdHRyaWJ1dGV9fToge3t2YXJpYXRpb24udmFsdWV9fVxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgw5cge3sgaXRlbS5xdWFudGl0eSB9fSAtIHt7IGZvcm1hdEN1cnJlbmN5KGl0ZW0udG90YWxzPy5saW5lX3RvdGFsLCB7bWlub3JVbml0OiBpdGVtLnRvdGFscz8uY3VycmVuY3lfbWlub3JfdW5pdCwgZGVjaW1hbFNlcGFyYXRvcjogaXRlbS50b3RhbHM/LmN1cnJlbmN5X2RlY2ltYWxfc2VwYXJhdG9yLCBwcmVmaXg6IGl0ZW0udG90YWxzPy5jdXJyZW5jeV9wcmVmaXgsIHN1ZmZpeDogaXRlbS50b3RhbHM/LmN1cnJlbmN5X3N1ZmZpeH0pIH19XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cclxuICAgICAgPC9xLWNhcmQ+XHJcblxyXG4gICAgPCEtLSBTaGlwcGluZyBNZXRob2QgLS0+XHJcbiAgICA8cS1jYXJkIGNsYXNzPVwicS1tYi1tZFwiPlxyXG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5DaG9vc2UgU2hpcHBpbmcgTWV0aG9kPC9kaXY+XHJcbiAgICAgICAgPHEtb3B0aW9uLWdyb3VwXHJcbiAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0ZWRTaGlwcGluZ1JhdGVJZFwiXHJcbiAgICAgICAgICA6b3B0aW9ucz1cInNoaXBwaW5nT3B0aW9uc1wiXHJcbiAgICAgICAgICB0eXBlPVwicmFkaW9cIlxyXG4gICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIm9uU2hpcHBpbmdNZXRob2RDaGFuZ2VcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XHJcbiAgICA8L3EtY2FyZD5cclxuXHJcbiAgICAgIDwhLS0gUGF5bWVudCAtLT5cclxuICAgICAgPHEtY2FyZCBjbGFzcz1cInEtbWItbWRcIj5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlBheW1lbnQgTWV0aG9kPC9kaXY+XHJcbiAgICAgICAgICA8cS1vcHRpb24tZ3JvdXBcclxuICAgICAgICAgICAgdi1tb2RlbD1cInBheW1lbnRNZXRob2RcIlxyXG4gICAgICAgICAgICA6b3B0aW9ucz1cInBheW1lbnRNZXRob2RzXCJcclxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcclxuICAgICAgICAgICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICA8L3EtY2FyZD5cclxuXHJcbiAgICAgIDwhLS0gVG90YWwgJiBQbGFjZSBPcmRlciAtLT5cclxuICAgICAgPHEtY2FyZCBjbGFzcz1cInEtbWItbWRcIj5cclxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlRvdGFsOiB7eyBjYXJ0VG90YWwgfX08L2Rpdj5cclxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxyXG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucz5cclxuICAgICAgICAgIDxxLWJ0biBsYWJlbD1cIlBsYWNlIE9yZGVyXCIgdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwic2Vjb25kYXJ5XCIgLz5cclxuICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxyXG4gICAgICA8L3EtY2FyZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvcS1mb3JtPlxyXG4gICAgICA8IS0tIFJlbmRlciBsb2FkZXIgYW5kIHN5bmMgcmV0cnkgc3RhdGUgLS0+XHJcbiAgICAgIDxkaXYgdi1lbHNlLWlmPVwiIWNoZWNrb3V0UmVhZHlcIiBjbGFzcz1cImNlbnRlcmVkXCI+XHJcbiAgICAgICAgPHEtc3Bpbm5lciBjb2xvcj1cInNlY29uZGFyeVwiIHNpemU9XCIyZW1cIiAvPlxyXG4gICAgICAgIDxkaXY+U3luY2hyb25pemluZyBjYXJ0LCBwbGVhc2Ugd2FpdC4uLjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgdi1lbHNlLWlmPVwiY2hlY2tvdXRSZWFkeSAmJiBpdGVtc0NvdW50ID09PSAnMCdcIj5cclxuICAgICAgICBZb3VyIGNhcnQgaXMgZW1wdHkhXHJcbiAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3Byb2R1Y3RzL1wiPkdvIHRvIHNob3A8L3JvdXRlci1saW5rPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgdi1pZj1cInN5bmNFcnJvclwiIGNsYXNzPVwidGV4dC1uZWdhdGl2ZSBxLW10LW1kIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAge3sgc3luY0Vycm9yIH19XHJcbiAgICAgICAgPHEtYnRuIGxhYmVsPVwiUmV0cnkgU3luY1wiIGNvbG9yPVwic2Vjb25kYXJ5XCIgQGNsaWNrPVwic3luY0NhcnRcIiBjbGFzcz1cInEtbWwtbWRcIiAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgcmVhY3RpdmUsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSc7XHJcbmltcG9ydCBjYXJ0IGZyb20gJ3NyYy9zdG9yZXMvY2FydCc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInO1xyXG5pbXBvcnQgeyB1c2VNZXRhIH0gZnJvbSAncXVhc2FyJztcclxuaW1wb3J0IHsgZmV0Y2hXaXRoVG9rZW4gfSBmcm9tICdzcmMvY29tcG9zYWJsZXMvdXNlQXBpRmV0Y2guanMnO1xyXG5pbXBvcnQgR29vZ2xlTG9naW5CdXR0b24gZnJvbSAnc3JjL2NvbXBvbmVudHMvR29vZ2xlTG9naW5CdXR0b24udnVlJztcclxuZGVmaW5lT3B0aW9ucyh7XHJcbiAgYXN5bmMgcHJlRmV0Y2ggKHsgc3NyQ29udGV4dCB9KSB7XHJcbiAgICAvL2NvbnN0IHNlbyA9IGF3YWl0IGZldGNoU2VvRm9yUGF0aCgnY2hlY2tvdXQnKVxyXG4gICAgY29uc3Qgc2VvID0ge1xyXG4gICAgICB0aXRsZTogJ0NoZWNrb3V0JyxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaGVja291dCBwYWdlJyxcclxuICAgICAgcm9ib3RzOiAnbm9pbmRleCwgZm9sbG93J1xyXG4gICAgfVxyXG4gICAgaWYgKHNzckNvbnRleHQpIHtcclxuICAgICAgc3NyQ29udGV4dC5zZW9EYXRhID0gc2VvXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG51c2VNZXRhKCgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdGl0bGU6ICdDaGVja291dCcsXHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIHJvYm90czoge25hbWU6ICdyb2JvdHMnLCBjb250ZW50OiAnbm9pbmRleCwgZm9sbG93J30sXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB7bmFtZTogJ2Rlc2NyaXB0aW9uJywgY29udGVudDogJ0NoZWNrb3V0IHBhZ2UnfSxcclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuXHJcbmNvbnN0IHN5bmNFcnJvciA9IHJlZihudWxsKTtcclxuY29uc3QgdG9rZW4gPSByZWYoJycpO1xyXG5pZihwcm9jZXNzLmVudi5DTElFTlQpIHtcclxuICB0b2tlbi52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqd3RfdG9rZW4nKTtcclxuICBjb25zb2xlLmxvZyghIXRva2VuLnZhbHVlKTtcclxufVxyXG4vKmRlZmluZU9wdGlvbnMoe1xyXG4gIGFzeW5jIHByZUZldGNoICgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIEZvcmNlIHRoZSBibG9ja2luZyBzeW5jIGhlcmUgc28gdGhlIHN0YXRlIGlzXHJcbiAgICAgIC8vIGFscmVhZHkgcG9wdWxhdGVkIHdoZW4gdGhlIGNvbXBvbmVudCByZW5kZXJzXHJcbiAgICAgIGNvbnN0IGNhcnRGZXRjaCA9IGF3YWl0IGNhcnQuZmV0Y2hDYXJ0T25jZSh0cnVlKVxyXG4gICAgICBjb25zb2xlLmxvZyhjYXJ0RmV0Y2gpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1ByZUZldGNoIHN5bmMgZmFpbGVkOicsIGVycilcclxuICAgIH1cclxuICB9XHJcbn0pKi9cclxuY29uc3QgY2hlY2tvdXRSZWFkeSA9IHJlZihmYWxzZSlcclxuY29uc3QgaXNMb2dnZWRJbiA9IHJlZighIXRva2VuLnZhbHVlKVxyXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbi8vIDIuIEZPUk0gSU5JVElBTElaQVRJT046IERvIGl0IGltbWVkaWF0ZWx5IGJhc2VkIG9uIHRoZSBzdG9yZVxyXG5jb25zdCBmb3JtID0gcmVhY3RpdmUoe1xyXG4gIGZpcnN0X25hbWU6IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uc2hpcHBpbmdfYWRkcmVzcz8uZmlyc3RfbmFtZSB8fCAnJyxcclxuICBsYXN0X25hbWU6IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uc2hpcHBpbmdfYWRkcmVzcz8ubGFzdF9uYW1lIHx8ICcnLFxyXG4gIGVtYWlsOiBjYXJ0LnN0YXRlLmNhcnRfYXJyYXk/LmJpbGxpbmdfYWRkcmVzcz8uZW1haWwgfHwgJycsXHJcbiAgcGhvbmU6IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uYmlsbGluZ19hZGRyZXNzPy5waG9uZSB8fCAnJyxcclxuICBzaGlwcGluZzoge1xyXG4gICAgYWRkcmVzc18xOiBjYXJ0LnN0YXRlLmNhcnRfYXJyYXk/LnNoaXBwaW5nX2FkZHJlc3M/LmFkZHJlc3NfMSB8fCAnJyxcclxuICAgIGNpdHk6IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uc2hpcHBpbmdfYWRkcmVzcz8uY2l0eSB8fCAnJyxcclxuICAgIHBvc3Rjb2RlOiBjYXJ0LnN0YXRlLmNhcnRfYXJyYXk/LnNoaXBwaW5nX2FkZHJlc3M/LnBvc3Rjb2RlIHx8ICcnLFxyXG4gICAgY291bnRyeTogJ0lMJyxcclxuICB9LFxyXG4gIGJpbGxpbmc6IHtcclxuICAgIGFkZHJlc3NfMTogY2FydC5zdGF0ZS5jYXJ0X2FycmF5Py5iaWxsaW5nX2FkZHJlc3M/LmFkZHJlc3NfMSB8fCAnJyxcclxuICAgIGNpdHk6IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uYmlsbGluZ19hZGRyZXNzPy5jaXR5IHx8ICcnLFxyXG4gICAgcG9zdGNvZGU6IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uYmlsbGluZ19hZGRyZXNzPy5wb3N0Y29kZSB8fCAnJyxcclxuICAgIGNvdW50cnk6ICdJTCcsXHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIDMuIENPTVBVVEVEIE9QVElPTlM6IE1ha2Ugc2hpcHBpbmcgYW5kIHBheW1lbnQgbWV0aG9kcyBjb21wdXRlZFxyXG4vLyBzbyB0aGV5IHJlYWN0IGluc3RhbnRseSB0byB0aGUgY2FydF9hcnJheSBmZXRjaGVkIGluIHByZUZldGNoXHJcbmNvbnN0IHNoaXBwaW5nT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICBjb25zdCByYXRlcyA9IGNhcnQuc3RhdGUuY2FydF9hcnJheT8uc2hpcHBpbmdfcmF0ZXM/LlswXT8uc2hpcHBpbmdfcmF0ZXMgfHwgW107XHJcbiAgcmV0dXJuIHJhdGVzLm1hcChyYXRlID0+ICh7XHJcbiAgICBsYWJlbDogYCR7cmF0ZS5uYW1lfSDigJMgJHtmb3JtYXRDdXJyZW5jeShyYXRlLnByaWNlLCB7IG1pbm9yVW5pdDogMiwgcHJlZml4OiAn4oKqJyB9KX1gLFxyXG4gICAgdmFsdWU6IHJhdGUucmF0ZV9pZFxyXG4gIH0pKTtcclxufSk7XHJcblxyXG5jb25zdCBwYXltZW50TWV0aG9kcyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICBjb25zdCBtZXRob2RzID0gY2FydC5zdGF0ZS5jYXJ0X2FycmF5Py5wYXltZW50X21ldGhvZHMgfHwgW107XHJcbiAgcmV0dXJuIG1ldGhvZHMubWFwKG1ldGhvZCA9PiAoe1xyXG4gICAgbGFiZWw6IG1ldGhvZCA9PT0gJ2JhY3MnID8gJ0JhbmsgdHJhbnNmZXInIDogbWV0aG9kLFxyXG4gICAgdmFsdWU6IG1ldGhvZFxyXG4gIH0pKTtcclxufSk7XHJcblxyXG5jb25zdCBpdGVtc0NvdW50ID0gY29tcHV0ZWQoKCkgPT4gY2FydC5zdGF0ZS5jYXJ0X2FycmF5Py5pdGVtc19jb3VudCB8fCAnMCcpO1xyXG5jb25zdCBiaWxsaW5nU2FtZUFzU2hpcHBpbmcgPSByZWYodHJ1ZSlcclxuY29uc3QgY291cG9uQ29kZSA9IHJlZignJyk7XHJcbmNvbnN0IGNvdXBvbkFwcGxpZWQgPSByZWYoZmFsc2UpO1xyXG5jb25zdCBjb3Vwb25FcnJvciA9IHJlZihudWxsKTtcclxuY29uc3QgcGF5bWVudE1ldGhvZCA9IHJlZignYmFjcycpO1xyXG5jb25zdCBzZWxlY3RlZFNoaXBwaW5nUmF0ZUlkID0gcmVmKG51bGwpO1xyXG5jb25zdCBjYXJ0SXRlbXMgPSBjb21wdXRlZCgoKSA9PiBjYXJ0LnN0YXRlLmNhcnRfYXJyYXkuaXRlbXMpO1xyXG5jb25zdCBjYXJ0VG90YWwgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgY29uc3QgdG90YWwgPSBjYXJ0LnN0YXRlLnRvdGFscz8udG90YWxfcHJpY2UgfHwgJzAnO1xyXG4gIGNvbnN0IGZvcm1hdHRlZFRvdGFsID0gZm9ybWF0Q3VycmVuY3kodG90YWwsIHttaW5vclVuaXQ6IDIsIGRlY2ltYWxTZXBhcmF0b3I6ICcuJywgcHJlZml4OiAn4oKqJywgc3VmZml4OiAnJ30pO1xyXG4gIHJldHVybiBmb3JtYXR0ZWRUb3RhbDtcclxufSk7XHJcbi8vIE1vcmUgcmVsaWFibGUgc2x1ZyBleHRyYWN0b3IgdXNpbmcgcmVnZXhcclxuY29uc3QgZ2V0U2x1Z0Zyb21QZXJtYWxpbmsgPSAocGVybWFsaW5rKSA9PiB7XHJcbiAgaWYocGVybWFsaW5rKSB7XHJcbiAgICBjb25zdCBtYXRjaCA9IHBlcm1hbGluay5tYXRjaCgvcHJvZHVjdFxcLyhbXi9dKylcXC8/JC8pXHJcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnXHJcbiAgfVxyXG4gIHJldHVybiAnJztcclxufVxyXG5jb25zdCBpbml0aWFsaXplRm9ybUZyb21DYXJ0ID0gYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGNhcnREYXRhID0gY2FydC5zdGF0ZS5jYXJ0X2FycmF5XHJcblxyXG4gIGlmICghY2FydERhdGEpIHtcclxuICAgIGNvbnNvbGUud2FybignQ2FydCBub3QgcmVhZHkgeWV0LCBza2lwcGluZyBmb3JtIGluaXQnKVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICAvL3BheW1lbnRNZXRob2RzLnZhbHVlID0gW11cclxuXHJcbiAgLyppZiAoQXJyYXkuaXNBcnJheShjYXJ0RGF0YS5wYXltZW50X21ldGhvZHMpKSB7XHJcbiAgICBjYXJ0RGF0YS5wYXltZW50X21ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xyXG4gICAgICBwYXltZW50TWV0aG9kcy52YWx1ZS5wdXNoKHtcclxuICAgICAgICBsYWJlbDogbWV0aG9kID09PSAnYmFjcycgPyAnQmFuayB0cmFuc2ZlcicgOiBtZXRob2QsXHJcbiAgICAgICAgdmFsdWU6IG1ldGhvZFxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9Ki9cclxuXHJcbiAgLy9pdGVtc0NvdW50LnZhbHVlID0gY2FydERhdGEuaXRlbXNfY291bnQgfHwgJzAnXHJcblxyXG4gIGNvbnN0IGJpbGxpbmcgPSBjYXJ0RGF0YS5iaWxsaW5nX2FkZHJlc3MgfHwge31cclxuICBjb25zdCBzaGlwcGluZyA9IGNhcnREYXRhLnNoaXBwaW5nX2FkZHJlc3MgfHwge31cclxuXHJcbiAgZm9ybS5maXJzdF9uYW1lID0gc2hpcHBpbmcuZmlyc3RfbmFtZSB8fCAnJ1xyXG4gIGZvcm0ubGFzdF9uYW1lID0gc2hpcHBpbmcubGFzdF9uYW1lIHx8ICcnXHJcbiAgZm9ybS5lbWFpbCA9IGJpbGxpbmcuZW1haWwgfHwgJydcclxuICBmb3JtLnBob25lID0gYmlsbGluZy5waG9uZSB8fCAnJ1xyXG5cclxuICBmb3JtLnNoaXBwaW5nLmFkZHJlc3NfMSA9IHNoaXBwaW5nLmFkZHJlc3NfMSB8fCAnJ1xyXG4gIGZvcm0uc2hpcHBpbmcuY2l0eSA9IHNoaXBwaW5nLmNpdHkgfHwgJydcclxuICBmb3JtLnNoaXBwaW5nLnBvc3Rjb2RlID0gc2hpcHBpbmcucG9zdGNvZGUgfHwgJydcclxuICBmb3JtLnNoaXBwaW5nLmNvdW50cnkgPSBzaGlwcGluZy5jb3VudHJ5IHx8ICdJTCdcclxuXHJcbiAgZm9ybS5iaWxsaW5nLmFkZHJlc3NfMSA9IGJpbGxpbmcuYWRkcmVzc18xIHx8ICcnXHJcbiAgZm9ybS5iaWxsaW5nLmNpdHkgPSBiaWxsaW5nLmNpdHkgfHwgJydcclxuICBmb3JtLmJpbGxpbmcucG9zdGNvZGUgPSBiaWxsaW5nLnBvc3Rjb2RlIHx8ICcnXHJcbiAgZm9ybS5iaWxsaW5nLmNvdW50cnkgPSBiaWxsaW5nLmNvdW50cnkgfHwgJ0lMJ1xyXG59O1xyXG5jb25zdCB1cGRhdGVTaGlwcGluZ0FkZHJlc3MgPSBhc3luYyAoKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hXaXRoVG9rZW4oJ2h0dHBzOi8vbnV4dC5tZWlkYW5tLmNvbS93cC1qc29uL3djL3N0b3JlL3YxL2NhcnQvdXBkYXRlLWN1c3RvbWVyJywge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGJpbGxpbmdfYWRkcmVzczoge1xyXG4gICAgICAgICAgZmlyc3RfbmFtZTogZm9ybS5maXJzdF9uYW1lLFxyXG4gICAgICAgICAgbGFzdF9uYW1lOiBmb3JtLmxhc3RfbmFtZSxcclxuICAgICAgICAgIGVtYWlsOiBmb3JtLmVtYWlsLFxyXG4gICAgICAgICAgcGhvbmU6IGZvcm0ucGhvbmUsXHJcbiAgICAgICAgICBhZGRyZXNzXzE6IGJpbGxpbmdTYW1lQXNTaGlwcGluZy52YWx1ZSA/IGZvcm0uc2hpcHBpbmcuYWRkcmVzc18xIDogZm9ybS5iaWxsaW5nLmFkZHJlc3NfMSxcclxuICAgICAgICAgIGNpdHk6IGJpbGxpbmdTYW1lQXNTaGlwcGluZy52YWx1ZSA/IGZvcm0uc2hpcHBpbmcuY2l0eSA6IGZvcm0uYmlsbGluZy5jaXR5LFxyXG4gICAgICAgICAgcG9zdGNvZGU6IGJpbGxpbmdTYW1lQXNTaGlwcGluZy52YWx1ZSA/IGZvcm0uc2hpcHBpbmcucG9zdGNvZGUgOiBmb3JtLmJpbGxpbmcucG9zdGNvZGUsXHJcbiAgICAgICAgICBjb3VudHJ5OiBiaWxsaW5nU2FtZUFzU2hpcHBpbmcudmFsdWUgPyBmb3JtLnNoaXBwaW5nLmNvdW50cnkgOiBmb3JtLmJpbGxpbmcuY291bnRyeSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoaXBwaW5nX2FkZHJlc3M6IHtcclxuICAgICAgICAgIGZpcnN0X25hbWU6IGZvcm0uZmlyc3RfbmFtZSxcclxuICAgICAgICAgIGxhc3RfbmFtZTogZm9ybS5sYXN0X25hbWUsXHJcbiAgICAgICAgICBhZGRyZXNzXzE6IGZvcm0uc2hpcHBpbmcuYWRkcmVzc18xLFxyXG4gICAgICAgICAgY2l0eTogZm9ybS5zaGlwcGluZy5jaXR5LFxyXG4gICAgICAgICAgcG9zdGNvZGU6IGZvcm0uc2hpcHBpbmcucG9zdGNvZGUsXHJcbiAgICAgICAgICBjb3VudHJ5OiBmb3JtLnNoaXBwaW5nLmNvdW50cnksXHJcbiAgICAgICAgICBwaG9uZTogZm9ybS5waG9uZSxcclxuICAgICAgICAgIGVtYWlsOiBmb3JtLmVtYWlsLFxyXG4gICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICB9KTtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgc2hpcHBpbmcgYWRkcmVzcycpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdXBkYXRlZENhcnQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAvL2NhcnQuZmV0Y2hDYXJ0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnQ2FydCB1cGRhdGVkJywgdXBkYXRlZENhcnQpO1xyXG4gICAgLy8gT3B0aW9uYWxseSB1cGRhdGUgbG9jYWwgY2FydCBzdGF0ZSBvciByZWZyZXNoIHNoaXBwaW5nIHJhdGVzXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHNoaXBwaW5nIGFkZHJlc3M6JywgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59O1xyXG5jb25zdCBoYW5kbGVJbnB1dEJsdXIgPSAoZmllbGQpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IGZvcm0uc2hpcHBpbmdbZmllbGRdID8gZm9ybS5zaGlwcGluZ1tmaWVsZF0gOiBmb3JtW2ZpZWxkXTtcclxuICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMSkge1xyXG4gICAgdXBkYXRlU2hpcHBpbmdBZGRyZXNzKCk7XHJcbiAgICBmZXRjaFNoaXBwaW5nUmF0ZXMoKTtcclxuICB9XHJcbn07XHJcbmZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5KGFtb3VudFN0ciwge1xyXG4gIG1pbm9yVW5pdCA9IDIsXHJcbiAgZGVjaW1hbFNlcGFyYXRvciA9ICcuJyxcclxuICBwcmVmaXggPSAnJCcsXHJcbiAgc3VmZml4ID0gJydcclxufSA9IHt9KSB7XHJcbiAgY29uc3QgYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50U3RyLCAxMCk7XHJcbiAgaWYgKGlzTmFOKGFtb3VudCkpIHJldHVybiBgJHtwcmVmaXh9MCR7ZGVjaW1hbFNlcGFyYXRvcn0keycwJy5yZXBlYXQobWlub3JVbml0KX0ke3N1ZmZpeH1gO1xyXG4gIGNvbnN0IGZhY3RvciA9IE1hdGgucG93KDEwLCBtaW5vclVuaXQpO1xyXG4gIGNvbnN0IG51bWJlciA9IGFtb3VudCAvIGZhY3RvcjtcclxuICByZXR1cm4gYCR7bnVtYmVyLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBtaW5vclVuaXQsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG1pbm9yVW5pdFxyXG4gIH0pfSR7c3VmZml4fSR7cHJlZml4fWA7XHJcbn1cclxuY29uc3QgYXBwbHlDb3Vwb24gPSAoKSA9PiBjYXJ0LmFwcGx5Q291cG9uKGNvdXBvbkNvZGUudmFsdWUpO1xyXG5jb25zdCByZW1vdmVDb3Vwb24gPSAoKSA9PiBjYXJ0LnJlbW92ZUNvdXBvbihjb3Vwb25Db2RlLnZhbHVlKTtcclxuLy8gRmV0Y2ggc2hpcHBpbmcgbWV0aG9kc1xyXG5jb25zdCBmZXRjaFNoaXBwaW5nUmF0ZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgaWYgKCFjYXJ0LnN0YXRlLmNhcnRfYXJyYXkpIHJldHVyblxyXG5cclxuICAvL2NvbnN0IHJhdGVzID0gY2FydC5zdGF0ZS5jYXJ0X2FycmF5LnNoaXBwaW5nX3JhdGVzPy5bMF0/LnNoaXBwaW5nX3JhdGVzIHx8IFtdXHJcblxyXG4gIC8qc2hpcHBpbmdPcHRpb25zLnZhbHVlID0gcmF0ZXMubWFwKHJhdGUgPT4gKHtcclxuICAgIGxhYmVsOiBgJHtyYXRlLm5hbWV9IOKAkyAke2Zvcm1hdEN1cnJlbmN5KHJhdGUucHJpY2UsIHtcclxuICAgICAgbWlub3JVbml0OiAyLFxyXG4gICAgICBkZWNpbWFsU2VwYXJhdG9yOiAnLicsXHJcbiAgICAgIHByZWZpeDogJ+KCqidcclxuICAgIH0pfWAsXHJcbiAgICB2YWx1ZTogcmF0ZS5yYXRlX2lkXHJcbiAgfSkpKi9cclxuXHJcbiAgaWYgKHNoaXBwaW5nT3B0aW9ucy52YWx1ZS5sZW5ndGgpIHtcclxuICAgIHNlbGVjdGVkU2hpcHBpbmdSYXRlSWQudmFsdWUgPz89IHNoaXBwaW5nT3B0aW9ucy52YWx1ZVswXS52YWx1ZVxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgb25TaGlwcGluZ01ldGhvZENoYW5nZSA9IGFzeW5jIChuZXdSYXRlSWQpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gU2VuZCBzZWxlY3RlZCBzaGlwcGluZyByYXRlIHRvIFdvb0NvbW1lcmNlXHJcbiAgICBhd2FpdCBmZXRjaFdpdGhUb2tlbignaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vd2Mvc3RvcmUvY2FydC9zZWxlY3Qtc2hpcHBpbmctcmF0ZScsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtwYWNrYWdlX2lkOiAwLCByYXRlX2lkOiBuZXdSYXRlSWR9KVxyXG4gICAgfSk7XHJcbiAgICAvLyBSZS1mZXRjaCBjYXJ0IHRvIGdldCB1cGRhdGVkIHRvdGFsc1xyXG4gICAgYXdhaXQgY2FydC5mZXRjaENhcnQoKTtcclxuICAgIGNvbnNvbGUubG9nKGNhcnQpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciB1cGRhdGluZyBzaGlwcGluZyBtZXRob2Q6JywgZXJyb3IpO1xyXG4gIH1cclxufTtcclxuY29uc3Qgb25WYWxpZGF0aW9uRXJyb3IgPSBhc3luYyhyZWYpID0+IHtcclxuICBjb25zdCB2YWxpZCA9IGF3YWl0IHJlZi52YWxpZGF0ZSgpXHJcbiAgaWYgKCF2YWxpZCkge1xyXG4gICAgLy8gV2FpdCBhIHRpY2sgZm9yIFF1YXNhciB0byBmb2N1cyB0aGUgZmlyc3QgaW52YWxpZCBmaWVsZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XHJcbiAgICAgIGlmIChlbCAmJiB0eXBlb2YgZWwuc2Nyb2xsSW50b1ZpZXcgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBlbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcid9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG59XHJcbmNvbnN0IHN1Ym1pdE9yZGVyID0gYXN5bmMgKCkgPT4ge1xyXG4gIC8vIE9ubHkgcGxhY2Ugb3JkZXIgYWZ0ZXIgc3luY1xyXG4gIGlmICghY2FydC5zdGF0ZS5zeW5jZWQpIHtcclxuICAgIGF3YWl0IHN5bmNDYXJ0KCk7XHJcbiAgICBpZiAoc3luY0Vycm9yLnZhbHVlKSB7XHJcbiAgICAgIHJldHVybjsgLy8gRG9uJ3Qgc3VibWl0IGlmIHN5bmMgZmFpbGVkXHJcbiAgICB9XHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICBiaWxsaW5nX2FkZHJlc3M6IHtcclxuICAgICAgICBmaXJzdF9uYW1lOiBmb3JtLmZpcnN0X25hbWUsXHJcbiAgICAgICAgbGFzdF9uYW1lOiBmb3JtLmxhc3RfbmFtZSxcclxuICAgICAgICBlbWFpbDogZm9ybS5lbWFpbCxcclxuICAgICAgICBwaG9uZTogZm9ybS5waG9uZSxcclxuICAgICAgICBhZGRyZXNzXzE6IGJpbGxpbmdTYW1lQXNTaGlwcGluZy52YWx1ZSA/IGZvcm0uc2hpcHBpbmcuYWRkcmVzc18xIDogZm9ybS5iaWxsaW5nLmFkZHJlc3NfMSxcclxuICAgICAgICBjaXR5OiBiaWxsaW5nU2FtZUFzU2hpcHBpbmcudmFsdWUgPyBmb3JtLnNoaXBwaW5nLmNpdHkgOiBmb3JtLmJpbGxpbmcuY2l0eSxcclxuICAgICAgICBwb3N0Y29kZTogYmlsbGluZ1NhbWVBc1NoaXBwaW5nLnZhbHVlID8gZm9ybS5zaGlwcGluZy5wb3N0Y29kZSA6IGZvcm0uYmlsbGluZy5wb3N0Y29kZSxcclxuICAgICAgICBjb3VudHJ5OiBiaWxsaW5nU2FtZUFzU2hpcHBpbmcudmFsdWUgPyBmb3JtLnNoaXBwaW5nLmNvdW50cnkgOiBmb3JtLmJpbGxpbmcuY291bnRyeSxcclxuICAgICAgfSxcclxuICAgICAgc2hpcHBpbmdfYWRkcmVzczoge1xyXG4gICAgICAgIGZpcnN0X25hbWU6IGZvcm0uZmlyc3RfbmFtZSxcclxuICAgICAgICBsYXN0X25hbWU6IGZvcm0ubGFzdF9uYW1lLFxyXG4gICAgICAgIGFkZHJlc3NfMTogZm9ybS5zaGlwcGluZy5hZGRyZXNzXzEsXHJcbiAgICAgICAgY2l0eTogZm9ybS5zaGlwcGluZy5jaXR5LFxyXG4gICAgICAgIHBvc3Rjb2RlOiBmb3JtLnNoaXBwaW5nLnBvc3Rjb2RlLFxyXG4gICAgICAgIGNvdW50cnk6IGZvcm0uc2hpcHBpbmcuY291bnRyeSxcclxuICAgICAgICBwaG9uZTogZm9ybS5waG9uZSxcclxuICAgICAgICBlbWFpbDogZm9ybS5lbWFpbCxcclxuICAgICAgfSxcclxuICAgICAgcGF5bWVudF9tZXRob2Q6IHBheW1lbnRNZXRob2QudmFsdWUsXHJcbiAgICAgIHBheW1lbnRfZGF0YToge30sXHJcbiAgICAgIGV4dGVuc2lvbnM6IHt9LFxyXG4gICAgICBiaWxsaW5nX3NhbWVfYXNfc2hpcHBpbmc6IGJpbGxpbmdTYW1lQXNTaGlwcGluZy52YWx1ZVxyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKHBheW1lbnRNZXRob2QudmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2cocGF5bG9hZCk7XHJcbiAgICBjb25zb2xlLmxvZyhmb3JtKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FydC5wbGFjZU9yZGVyKHBheWxvYWQpXHJcbiAgICBjb25zb2xlLmxvZygnT3JkZXIgcGxhY2VkOicsIHJlc3BvbnNlKVxyXG5cclxuICAgIHJvdXRlci5wdXNoKHtcclxuICAgICAgbmFtZTogJ3RoYW5rLXlvdScsXHJcbiAgICAgIHF1ZXJ5OiB7b3JkZXJJZDogcmVzcG9uc2Uub3JkZXJfaWQsIGJpbGxpbmdfZW1haWw6IHJlc3BvbnNlLmJpbGxpbmdfYWRkcmVzcy5lbWFpbCwgb3JkZXJfa2V5OiByZXNwb25zZS5vcmRlcl9rZXl9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPcHRpb25hbDogY2xlYXIgY2FydCwgcmVkaXJlY3QgdG8gdGhhbmsteW91IHBhZ2UsIGV0Yy5cclxuICAgIGF3YWl0IGNhcnQuZmV0Y2hDYXJ0KCk7IC8vIFJlZnJlc2ggY2FydCBpbiB0aGUgc3RvcmVcclxuXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdDaGVja291dCBlcnJvcjonLCBlcnIubWVzc2FnZSlcclxuICB9XHJcbn1cclxuY29uc3Qgc3luY0NhcnQgPSBhc3luYyAoKSA9PiB7XHJcbiAgc3luY0Vycm9yLnZhbHVlID0gbnVsbFxyXG5cclxuICBpZiAoIW5lZWRzU3luYy52YWx1ZSkge1xyXG4gICAgcmV0dXJuIC8vIOKshe+4jyBETyBOT1RISU5HXHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgY2FydC5zeW5jTG9jYWxDYXJ0V2l0aFNlcnZlcigpXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICBzeW5jRXJyb3IudmFsdWUgPSBjYXJ0LnN0YXRlLmVycm9yIHx8ICdGYWlsZWQgdG8gc3luYyBjYXJ0J1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbmVlZHNTeW5jID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gIC8vIG9mZmxpbmUg4oaSIG5ldmVyIGJsb2NrXHJcbiAgaWYgKGNhcnQuc3RhdGUub2ZmbGluZSkgcmV0dXJuIGZhbHNlXHJcbiAgaWYgKGNhcnQuc3RhdGUuc3luY2VkID09PSBmYWxzZSkgcmV0dXJuIHRydWVcclxuXHJcbiAgLy8gbm8gc2VydmVyIHNuYXBzaG90IHlldCDihpIgbmVlZCBzeW5jXHJcbi8vIGNhcnQgbm90IGh5ZHJhdGVkIHlldCDihpIgTk9UIGEgc3luYyBjYXNlXHJcbiAgaWYgKCFjYXJ0LnN0YXRlLmNhcnRfYXJyYXkgfHwgIUFycmF5LmlzQXJyYXkoY2FydC5zdGF0ZS5jYXJ0X2FycmF5Lml0ZW1zKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG4gIGNvbnN0IGxvY2FsSXRlbXMgPSBjYXJ0LnN0YXRlLmxvY2FsX2NhcnQuaXRlbXMgfHwgW11cclxuICBjb25zdCBzZXJ2ZXJJdGVtcyA9IGNhcnQuc3RhdGUuY2FydF9hcnJheS5pdGVtcyB8fCBbXVxyXG5cclxuICBpZiAobG9jYWxJdGVtcy5sZW5ndGggIT09IHNlcnZlckl0ZW1zLmxlbmd0aCkgcmV0dXJuIHRydWVcclxuXHJcbiAgY29uc3Qgc2VydmVyU2lncyA9IG5ldyBTZXQoXHJcbiAgICAgIHNlcnZlckl0ZW1zLm1hcChpID0+IGNhcnQuc2lnbmF0dXJlRm9yKGkuaWQsIGkudmFyaWF0aW9uKSlcclxuICApXHJcblxyXG4gIGZvciAoY29uc3QgbGkgb2YgbG9jYWxJdGVtcykge1xyXG4gICAgaWYgKGxpLl9yZW1vdmVkKSByZXR1cm4gdHJ1ZVxyXG4gICAgY29uc3Qgc2lnID0gY2FydC5zaWduYXR1cmVGb3IobGkuaWQsIGxpLnZhcmlhdGlvbilcclxuICAgIGlmICghc2VydmVyU2lncy5oYXMoc2lnKSkgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZVxyXG59KVxyXG5cclxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcclxuICAvLyBTdGFydCB0aGUgbG9hZGluZyBzdGF0ZVxyXG4gIGNoZWNrb3V0UmVhZHkudmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIFdlIGNhbGwgZmV0Y2hDYXJ0T25jZSB3aXRoICd0cnVlJyB0byBmb3JjZSBhIGJsb2NraW5nIHN5bmNcclxuICAgIC8vIFRoaXMgZW5zdXJlcyBjYXJ0X2FycmF5IGlzIDEwMCUgYWNjdXJhdGUgYmVmb3JlIHdlIHByb2NlZWRcclxuICAgIC8vYXdhaXQgY2FydC5mZXRjaENhcnRPbmNlKHRydWUpO1xyXG5cclxuICAgIC8vIE5vdyB0aGF0IHRoZSBzZXJ2ZXIgYW5kIGxvY2FsIGFyZSBpZGVudGljYWw6XHJcbiAgICBhd2FpdCBpbml0aWFsaXplRm9ybUZyb21DYXJ0KCk7XHJcbiAgICBhd2FpdCBmZXRjaFNoaXBwaW5nUmF0ZXMoKTtcclxuXHJcbiAgICBjaGVja291dFJlYWR5LnZhbHVlID0gdHJ1ZTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0luaXRpYWwgc3luYyBmYWlsZWQ6JywgZXJyKTtcclxuICAgIHN5bmNFcnJvci52YWx1ZSA9IFwiQ291bGQgbm90IHN5bmMgeW91ciBjYXJ0LiBQbGVhc2UgY2hlY2sgeW91ciBjb25uZWN0aW9uLlwiO1xyXG4gIH1cclxufSk7XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZD5cclxuLyogcHVyZ2Vjc3Mgc3RhcnQgaWdub3JlICovXHJcbi5xLWZpZWxkX19sYWJlbCB7XHJcbiAgICB0cmFuc2l0aW9uOiAwLjNzIGVhc2U7XHJcbn1cclxuLnEtZmllbGQtLWZvY3VzZWQgLnEtZmllbGRfX2xhYmVsXHJcbi5xLWZpZWxkLS1mbG9hdCAucS1maWVsZF9fbGFiZWx7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxufVxyXG4vKiBwdXJnZWNzcyBlbmQgaWdub3JlICovXHJcblxyXG4ucS1mb3JtIC5mbG9hdC1sZWZ0LFxyXG4ucS1mb3JtIC5mbG9hdC1yaWdodCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuQG1lZGlhKG1pbi13aWR0aDogNzY4cHgpIHtcclxuICAucS1mb3JtIC5mbG9hdC1sZWZ0IHtcclxuICAgIHdpZHRoOiA1NyU7XHJcbiAgfVxyXG5cclxuICAucS1mb3JtIC5mbG9hdC1yaWdodCB7XHJcbiAgICB3aWR0aDogNDElO1xyXG4gIH1cclxufVxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOlsicmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZUJsb2NrIiwiX3RvRGlzcGxheVN0cmluZyIsIl9GcmFnbWVudCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMk1BLFlBQVEsTUFBTTtBQUNaLGFBQU87QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxVQUNKLFFBQVEsRUFBQyxNQUFNLFVBQVUsU0FBUyxrQkFBQTtB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
