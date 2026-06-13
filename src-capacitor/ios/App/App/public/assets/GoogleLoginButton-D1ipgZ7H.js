const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Dmez1H6O.js","./index-DDAg5YDa.js","./quasar-observers-delayed-tSHCOYpR.js","./index-DAfOORDk.css"])))=>i.map(i=>d[i]);
import { f as createComponent, A as onDeactivated, B as onActivated, x as onMounted, h, g as getCurrentInstance, j as ref, S as stopAndPrevent, H as nextTick, I as provide, o as openBlock, p as createBlock, P as Platform } from "./quasar-observers-delayed-tSHCOYpR.js";
import { a as hSlot, aA as vmIsDestroyed, aB as addFocusFn, aC as formKey, _ as _export_sfc, Q as QBtn, r as useRouter, aD as matLogin, o as __vitePreload } from "./index-DDAg5YDa.js";
const QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validationSuccess", "validationError"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit(`validation${res === true ? "Success" : "Error"}`, ref2);
      };
      const validateComponent = (comp) => {
        const valid = comp.validate();
        return typeof valid.then === "function" ? valid.then(
          (valid2) => ({ valid: valid2, comp }),
          (err) => ({ valid: false, comp, err })
        ) : Promise.resolve({ valid, comp });
      };
      const errorsPromise = props.greedy === true ? Promise.all(registeredComponents.map(validateComponent)).then((res) => res.filter((r) => r.valid !== true)) : registeredComponents.reduce(
        (acc, comp) => acc.then(() => {
          return validateComponent(comp).then((r) => {
            if (r.valid === false) {
              return Promise.reject(r);
            }
          });
        }),
        Promise.resolve()
      ).catch((error) => [error]);
      return errorsPromise.then((errors) => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        if (index === validateIndex) {
          const { comp, err } = errors[0];
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true) {
            const activeError = errors.find(({ comp: comp2 }) => typeof comp2.focus === "function" && vmIsDestroyed(comp2.$) === false);
            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt?.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) return;
        const target = rootRef.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || rootRef.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex !== -1);
        target?.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index !== -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
const GOOGLE_WEB_CLIENT_ID = "541818756446-cpeeist28iikua9g1i436vpj5mncslmb.apps.googleusercontent.com";
const _sfc_main = {
  __name: "GoogleLoginButton",
  setup(__props, { expose: __expose }) {
    __expose();
    const loading = ref(false);
    const router = useRouter();
    async function handleLogin() {
      loading.value = true;
      try {
        if (Platform.is.capacitor) {
          await handleNativeLogin();
        } else {
          redirectToGoogleLogin();
        }
      } catch (err) {
        console.error("Google login failed:", err);
        loading.value = false;
      }
    }
    async function handleNativeLogin() {
      if (!Platform.is.capacitor) {
        console.warn("Native login not available on web.");
        return;
      }
      const { SocialLogin } = await __vitePreload(async () => {
        const { SocialLogin: SocialLogin2 } = await import("./index-Dmez1H6O.js");
        return { SocialLogin: SocialLogin2 };
      }, true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url);
      await SocialLogin.initialize({
        google: {
          webClientId: GOOGLE_WEB_CLIENT_ID
        }
      });
      const { result } = await SocialLogin.login({
        provider: "google",
        options: {
          scopes: ["email", "profile"]
        }
      });
      if (result.idToken) {
        await sendTokenToBackend(result.idToken);
      }
    }
    async function sendTokenToBackend(idToken) {
      try {
        const response = await fetch("https://nuxt.meidanm.com/wp-json/custom/v1/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken })
        });
        const data = await response.json();
        if (data.success) {
          if (data.token) localStorage.setItem("jwt_token", data.token);
          await nextTick();
          router.go(0);
        }
      } catch (error) {
        console.error("Backend sync failed:", error);
      } finally {
        loading.value = false;
      }
    }
    function redirectToGoogleLogin() {
      const redirectUri = "https://pwav.meidanm.com/auth/callback";
      const state = encodeURIComponent(window.location.href);
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_WEB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=${state}&prompt=select_account`;
      window.location.href = url;
    }
    const __returned__ = { GOOGLE_WEB_CLIENT_ID, loading, router, handleLogin, handleNativeLogin, sendTokenToBackend, redirectToGoogleLogin, ref, nextTick, get useRouter() {
      return useRouter;
    }, get matLogin() {
      return matLogin;
    }, get Platform() {
      return Platform;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    label: "Sign in with Google",
    icon: $setup.matLogin,
    color: "secondary",
    loading: $setup.loading,
    onClick: $setup.handleLogin
  }, null, 8, ["icon", "loading"]);
}
const GoogleLoginButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "GoogleLoginButton.vue"]]);
export {
  GoogleLoginButton as G,
  QForm as Q
};


//# sourceMappingURL=data:application/json;base64,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LCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9mb3JtL1FGb3JtLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvR29vZ2xlTG9naW5CdXR0b24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIHJlZiwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCBuZXh0VGljaywgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcbmltcG9ydCB7IHZtSXNEZXN0cm95ZWQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZvcm0nLFxuXG4gIHByb3BzOiB7XG4gICAgYXV0b2ZvY3VzOiBCb29sZWFuLFxuICAgIG5vRXJyb3JGb2N1czogQm9vbGVhbixcbiAgICBub1Jlc2V0Rm9jdXM6IEJvb2xlYW4sXG4gICAgZ3JlZWR5OiBCb29sZWFuLFxuXG4gICAgb25TdWJtaXQ6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2V0JywgJ3ZhbGlkYXRpb25TdWNjZXNzJywgJ3ZhbGlkYXRpb25FcnJvcicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgdmFsaWRhdGVJbmRleCA9IDBcbiAgICBjb25zdCByZWdpc3RlcmVkQ29tcG9uZW50cyA9IFtdXG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSAoc2hvdWxkRm9jdXMpIHtcbiAgICAgIGNvbnN0IGZvY3VzID0gdHlwZW9mIHNob3VsZEZvY3VzID09PSAnYm9vbGVhbidcbiAgICAgICAgPyBzaG91bGRGb2N1c1xuICAgICAgICA6IHByb3BzLm5vRXJyb3JGb2N1cyAhPT0gdHJ1ZVxuXG4gICAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgICBjb25zdCBlbWl0RXZlbnQgPSAocmVzLCByZWYpID0+IHtcbiAgICAgICAgZW1pdChgdmFsaWRhdGlvbiR7IHJlcyA9PT0gdHJ1ZSA/ICdTdWNjZXNzJyA6ICdFcnJvcicgfWAsIHJlZilcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsaWRhdGVDb21wb25lbnQgPSBjb21wID0+IHtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBjb21wLnZhbGlkYXRlKClcblxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbGlkLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHZhbGlkLnRoZW4oXG4gICAgICAgICAgICB2YWxpZCA9PiAoeyB2YWxpZCwgY29tcCB9KSxcbiAgICAgICAgICAgIGVyciA9PiAoeyB2YWxpZDogZmFsc2UsIGNvbXAsIGVyciB9KVxuICAgICAgICAgIClcbiAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh7IHZhbGlkLCBjb21wIH0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVycm9yc1Byb21pc2UgPSBwcm9wcy5ncmVlZHkgPT09IHRydWVcbiAgICAgICAgPyBQcm9taXNlXG4gICAgICAgICAgLmFsbChyZWdpc3RlcmVkQ29tcG9uZW50cy5tYXAodmFsaWRhdGVDb21wb25lbnQpKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZmlsdGVyKHIgPT4gci52YWxpZCAhPT0gdHJ1ZSkpXG4gICAgICAgIDogcmVnaXN0ZXJlZENvbXBvbmVudHNcbiAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgY29tcCkgPT4gYWNjLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVDb21wb25lbnQoY29tcCkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoci52YWxpZCA9PT0gZmFsc2UpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KHIpIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICApXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IFsgZXJyb3IgXSlcblxuICAgICAgcmV0dXJuIGVycm9yc1Byb21pc2UudGhlbihlcnJvcnMgPT4ge1xuICAgICAgICBpZiAoZXJyb3JzID09PSB2b2lkIDAgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIGVtaXRFdmVudCh0cnVlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBub3Qgb3V0ZGF0ZWQgYWxyZWFkeVxuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zdCB7IGNvbXAsIGVyciB9ID0gZXJyb3JzWyAwIF1cblxuICAgICAgICAgIGVyciAhPT0gdm9pZCAwICYmIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIGVtaXRFdmVudChmYWxzZSwgY29tcClcblxuICAgICAgICAgIGlmIChmb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGZvY3VzIGZpcnN0IG1vdW50ZWQgYW5kIGFjdGl2ZSBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUVycm9yID0gZXJyb3JzLmZpbmQoKHsgY29tcCB9KSA9PiAoXG4gICAgICAgICAgICAgIHR5cGVvZiBjb21wLmZvY3VzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICYmIHZtSXNEZXN0cm95ZWQoY29tcC4kKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVFcnJvciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZUVycm9yLmNvbXAuZm9jdXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgICAgdmFsaWRhdGVJbmRleCsrXG5cbiAgICAgIHJlZ2lzdGVyZWRDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICAgIHR5cGVvZiBjb21wLnJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb21wLnJlc2V0VmFsaWRhdGlvbigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Ym1pdCAoZXZ0KSB7XG4gICAgICBldnQgIT09IHZvaWQgMCAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gdmFsaWRhdGVJbmRleCArIDFcblxuICAgICAgdmFsaWRhdGUoKS50aGVuKHZhbCA9PiB7XG4gICAgICAgIC8vIGlmIG5vdCBvdXRkYXRlZCAmJiB2YWxpZGF0aW9uIHN1Y2NlZWRlZFxuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLm9uU3VibWl0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGVtaXQoJ3N1Ym1pdCcsIGV2dClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZXZ0Py50YXJnZXQgIT09IHZvaWQgMCAmJiB0eXBlb2YgZXZ0LnRhcmdldC5zdWJtaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQuc3VibWl0KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQgKGV2dCkge1xuICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICBlbWl0KCdyZXNldCcpXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHsgLy8gYWxsb3cgdXNlcmxhbmQgdG8gcmVzZXQgdmFsdWVzIGJlZm9yZVxuICAgICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICBpZiAocHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3BzLm5vUmVzZXRGb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgIHx8IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgIHx8IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwocm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdJyksIGVsID0+IGVsLnRhYkluZGV4ICE9PSAtMSlcblxuICAgICAgICB0YXJnZXQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwcm92aWRlKGZvcm1LZXksIHtcbiAgICAgIGJpbmRDb21wb25lbnQgKHZtUHJveHkpIHtcbiAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMucHVzaCh2bVByb3h5KVxuICAgICAgfSxcblxuICAgICAgdW5iaW5kQ29tcG9uZW50ICh2bVByb3h5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZENvbXBvbmVudHMuaW5kZXhPZih2bVByb3h5KVxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzaG91bGRBY3RpdmF0ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgZm9jdXMoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIGZvY3VzKClcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgdmFsaWRhdGUsXG4gICAgICByZXNldFZhbGlkYXRpb24sXG4gICAgICBzdWJtaXQsXG4gICAgICByZXNldCxcbiAgICAgIGZvY3VzLFxuICAgICAgZ2V0VmFsaWRhdGlvbkNvbXBvbmVudHM6ICgpID0+IHJlZ2lzdGVyZWRDb21wb25lbnRzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdmb3JtJywge1xuICAgICAgY2xhc3M6ICdxLWZvcm0nLFxuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgb25TdWJtaXQ6IHN1Ym1pdCxcbiAgICAgIG9uUmVzZXQ6IHJlc2V0XG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XHJcbjxxLWJ0blxyXG4gICAgbGFiZWw9XCJTaWduIGluIHdpdGggR29vZ2xlXCJcclxuICAgIDppY29uPVwibWF0TG9naW5cIlxyXG4gICAgY29sb3I9XCJzZWNvbmRhcnlcIlxyXG4gICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcclxuICAgIEBjbGljaz1cImhhbmRsZUxvZ2luXCJcclxuICAvPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgcmVmLCBuZXh0VGljayB9IGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcic7XHJcbmltcG9ydCB7IG1hdExvZ2luIH0gZnJvbSAnQHF1YXNhci9leHRyYXMvbWF0ZXJpYWwtaWNvbnMnO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ3F1YXNhcic7XHJcblxyXG4vLyBUaGlzIGlzIHRoZSBcIldlYiBBcHBsaWNhdGlvblwiIENsaWVudCBJRCBmcm9tIEdvb2dsZSBDb25zb2xlXHJcbmNvbnN0IEdPT0dMRV9XRUJfQ0xJRU5UX0lEID0gXCI1NDE4MTg3NTY0NDYtY3BlZWlzdDI4aWlrdWE5ZzFpNDM2dnBqNW1uY3NsbWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIjtcclxuXHJcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xyXG5cclxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUxvZ2luKCkge1xyXG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xyXG5cclxuICB0cnkge1xyXG4gICAgaWYgKFBsYXRmb3JtLmlzLmNhcGFjaXRvcikge1xyXG4gICAgICBhd2FpdCBoYW5kbGVOYXRpdmVMb2dpbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVkaXJlY3RUb0dvb2dsZUxvZ2luKCk7IC8vIFlvdXIgZXhpc3Rpbmcgd2ViIGZhbGxiYWNrXHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiR29vZ2xlIGxvZ2luIGZhaWxlZDpcIiwgZXJyKTtcclxuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZU5hdGl2ZUxvZ2luKCkge1xyXG5cclxuICAvLyBIQVJEIFNTUiBHVUFSRFxyXG4gIGlmIChpbXBvcnQubWV0YS5lbnYuU1NSKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vIEd1YXJkOiBPbmx5IGF0dGVtcHQgdGhpcyBpZiB3ZSBhcmUgYWN0dWFsbHkgb24gYSBtb2JpbGUgZGV2aWNlL25hdGl2ZSBhcHBcclxuICBpZiAoIVBsYXRmb3JtLmlzLmNhcGFjaXRvcikge1xyXG4gICAgY29uc29sZS53YXJuKCdOYXRpdmUgbG9naW4gbm90IGF2YWlsYWJsZSBvbiB3ZWIuJyk7XHJcbiAgICAvLyBUcmlnZ2VyIHdlYi1iYXNlZCBsb2dpbiBmYWxsYmFjayBoZXJlIGlmIHlvdSBoYXZlIG9uZVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICAvLyAxLiBEeW5hbWljIGltcG9ydCBzbyB3ZWIgYnVpbGRzIGRvbid0IGJyZWFrXHJcbiAgY29uc3QgeyBTb2NpYWxMb2dpbiB9ID0gYXdhaXQgaW1wb3J0KCdAY2FwZ28vY2FwYWNpdG9yLXNvY2lhbC1sb2dpbicpO1xyXG5cclxuICAvLyAyLiBJbml0aWFsaXplIChNdXN0IHVzZSBXRUIgQ2xpZW50IElEIGV2ZW4gb24gQW5kcm9pZClcclxuICBhd2FpdCBTb2NpYWxMb2dpbi5pbml0aWFsaXplKHtcclxuICAgIGdvb2dsZToge1xyXG4gICAgICB3ZWJDbGllbnRJZDogR09PR0xFX1dFQl9DTElFTlRfSUQsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyAzLiBUcmlnZ2VyIE5hdGl2ZSBCb3R0b20gU2hlZXRcclxuICBjb25zdCB7IHJlc3VsdCB9ID0gYXdhaXQgU29jaWFsTG9naW4ubG9naW4oe1xyXG4gICAgcHJvdmlkZXI6ICdnb29nbGUnLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBzY29wZXM6IFsnZW1haWwnLCAncHJvZmlsZSddLFxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBpZiAocmVzdWx0LmlkVG9rZW4pIHtcclxuICAgIGF3YWl0IHNlbmRUb2tlblRvQmFja2VuZChyZXN1bHQuaWRUb2tlbik7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzZW5kVG9rZW5Ub0JhY2tlbmQoaWRUb2tlbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vY3VzdG9tL3YxL2dvb2dsZS1sb2dpblwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0b2tlbjogaWRUb2tlbiB9KSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgIC8vIEhhbmRsZSBzdWNjZXNzZnVsIGxvZ2luIChzYXZlIEpXVCwgcmVkaXJlY3QgdXNlcilcclxuICAgICAgaWYgKGRhdGEudG9rZW4pIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiand0X3Rva2VuXCIsIGRhdGEudG9rZW4pO1xyXG5cclxuICAgICAgLy8gMS4gV2FpdCBmb3IgVnVlIHRvIGFja25vd2xlZGdlIHRoZSBsb2NhbFN0b3JhZ2UgY2hhbmdlXHJcbiAgICAgIGF3YWl0IG5leHRUaWNrKCk7XHJcblxyXG4gICAgICAvLyBUaGlzIHRlbGxzIHRoZSByb3V0ZXIgXCJIZXksIHRoZSBVUkwgY2hhbmdlZCAoc2xpZ2h0bHkpLCBwbGVhc2UgdXBkYXRlIVwiXHJcbiAgICAgIHJvdXRlci5nbygwKVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiQmFja2VuZCBzeW5jIGZhaWxlZDpcIiwgZXJyb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZWRpcmVjdCBmYWxsYmFjayB0byBHb29nbGUgT0F1dGhcclxuZnVuY3Rpb24gcmVkaXJlY3RUb0dvb2dsZUxvZ2luKCkge1xyXG4gIGNvbnN0IHJlZGlyZWN0VXJpID0gJ2h0dHBzOi8vcHdhdi5tZWlkYW5tLmNvbS9hdXRoL2NhbGxiYWNrJzsgLy8gbXVzdCBtYXRjaCBHb29nbGUgYXBwIHJlZGlyZWN0IFVSSVxyXG4gIGNvbnN0IHN0YXRlID0gZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTsgLy8gc2F2ZSBjdXJyZW50IHBhZ2VcclxuXHJcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoP2AgK1xyXG4gICAgICAgICAgICAgIGBjbGllbnRfaWQ9JHtHT09HTEVfV0VCX0NMSUVOVF9JRH1gICtcclxuICAgICAgICAgICAgICBgJnJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSl9YCArXHJcbiAgICAgICAgICAgICAgYCZyZXNwb25zZV90eXBlPWNvZGVgICtcclxuICAgICAgICAgICAgICBgJnNjb3BlPW9wZW5pZCUyMGVtYWlsJTIwcHJvZmlsZWAgK1xyXG4gICAgICAgICAgICAgIGAmc3RhdGU9JHtzdGF0ZX1gICtcclxuICAgICAgICAgICAgICBgJnByb21wdD1zZWxlY3RfYWNjb3VudGA7IC8vIG9wdGlvbmFsOiBmb3JjZXMgYWNjb3VudCBzZWxlY3Rpb25cclxuXHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbn1cclxuPC9zY3JpcHQ+XHJcbiJdLCJmaWxlIjoiYXNzZXRzL0dvb2dsZUxvZ2luQnV0dG9uLUQxaXBnWjdILmpzIn0=