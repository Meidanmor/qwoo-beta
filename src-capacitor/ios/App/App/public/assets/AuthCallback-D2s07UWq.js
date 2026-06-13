import { _ as _export_sfc, a2 as QSpinner, r as useRouter, c as cart } from "./index-DDAg5YDa.js";
import { Q as QPage } from "./QPage-gc4oP7_r.js";
import { o as openBlock, p as createBlock, q as withCtx, t as createVNode, x as onMounted } from "./quasar-observers-delayed-tSHCOYpR.js";
const _sfc_main = {
  __name: "AuthCallback",
  setup(__props, { expose: __expose }) {
    __expose();
    const router = useRouter();
    onMounted(async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      let state = params.get("state") || "/";
      if (!code) {
        console.error("No code returned from Google");
        router.replace("/");
        return;
      }
      try {
        const res = await fetch("https://nuxt.meidanm.com/wp-json/custom/v1/google-login-redirect", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code })
        });
        const data = await res.json();
        if (data.success) {
          if (data.token) localStorage.setItem("jwt_token", data.token);
          if (data.user) cart.state.user = data.user;
          try {
            if (state.startsWith("http")) {
              const url = new URL(state);
              state = url.pathname + url.search + url.hash;
            }
          } catch (e) {
            if (e.data) {
              console.warn(e.data);
            }
            console.warn("Invalid state URL, fallback to /");
            state = "/";
          }
          router.replace(state);
        } else {
          console.error("Google redirect login failed", data);
          router.replace("/");
        }
      } catch (err) {
        console.error("Redirect login error", err);
        router.replace("/");
      }
    });
    const __returned__ = { router, onMounted, get useRouter() {
      return useRouter;
    }, get cart() {
      return cart;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-md flex flex-center" }, {
    default: withCtx(() => [
      createVNode(QSpinner, {
        size: "3em",
        color: "secondary"
      })
    ]),
    _: 1
  });
}
const AuthCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "AuthCallback.vue"]]);
export {
  AuthCallback as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aENhbGxiYWNrLUQyczA3VVdxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvQXV0aENhbGxiYWNrLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtcGFnZSBjbGFzcz1cInEtcGEtbWQgZmxleCBmbGV4LWNlbnRlclwiPlxyXG4gICAgPHEtc3Bpbm5lciBzaXplPVwiM2VtXCIgY29sb3I9XCJzZWNvbmRhcnlcIiAvPlxyXG4gIDwvcS1wYWdlPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQuanMnXHJcblxyXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcclxuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcbiAgY29uc3QgY29kZSA9IHBhcmFtcy5nZXQoJ2NvZGUnKVxyXG4gIGxldCBzdGF0ZSA9IHBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgJy8nXHJcblxyXG4gIGlmICghY29kZSkge1xyXG4gICAgY29uc29sZS5lcnJvcignTm8gY29kZSByZXR1cm5lZCBmcm9tIEdvb2dsZScpXHJcbiAgICByb3V0ZXIucmVwbGFjZSgnLycpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9udXh0Lm1laWRhbm0uY29tL3dwLWpzb24vY3VzdG9tL3YxL2dvb2dsZS1sb2dpbi1yZWRpcmVjdCcsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXHJcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2NvZGV9KVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxyXG5cclxuICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgaWYgKGRhdGEudG9rZW4pIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdqd3RfdG9rZW4nLCBkYXRhLnRva2VuKVxyXG4gICAgICBpZiAoZGF0YS51c2VyKSBjYXJ0LnN0YXRlLnVzZXIgPSBkYXRhLnVzZXJcclxuXHJcblxyXG4vLyBJZiBzdGF0ZSBjb250YWlucyBmdWxsIFVSTCwgZXh0cmFjdCBqdXN0IHRoZSBwYXRobmFtZVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmIChzdGF0ZS5zdGFydHNXaXRoKCdodHRwJykpIHtcclxuICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoc3RhdGUpXHJcbiAgICAgICAgICBzdGF0ZSA9IHVybC5wYXRobmFtZSArIHVybC5zZWFyY2ggKyB1cmwuaGFzaFxyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmKGUuZGF0YSl7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oZS5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIHN0YXRlIFVSTCwgZmFsbGJhY2sgdG8gLycpXHJcbiAgICAgICAgc3RhdGUgPSAnLydcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVkaXJlY3QgdG8gb3JpZ2luYWwgcGFnZSBmcm9tIHN0YXRlLCBmYWxsYmFjayB0byBob21lcGFnZVxyXG4gICAgICByb3V0ZXIucmVwbGFjZShzdGF0ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSByZWRpcmVjdCBsb2dpbiBmYWlsZWQnLCBkYXRhKVxyXG4gICAgICByb3V0ZXIucmVwbGFjZSgnLycpXHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdSZWRpcmVjdCBsb2dpbiBlcnJvcicsIGVycilcclxuICAgIHJvdXRlci5yZXBsYWNlKCcvJylcclxuICB9XHJcbn0pXHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBV0EsVUFBTSxTQUFTLFVBQVM7QUFFeEIsY0FBVSxZQUFZO0FBQ3BCLFlBQU0sU0FBUyxJQUFJLGdCQUFnQixPQUFPLFNBQVMsTUFBTTtBQUN6RCxZQUFNLE9BQU8sT0FBTyxJQUFJLE1BQU07QUFDOUIsVUFBSSxRQUFRLE9BQU8sSUFBSSxPQUFPLEtBQUs7QUFFbkMsVUFBSSxDQUFDLE1BQU07QUFDVCxnQkFBUSxNQUFNLDhCQUE4QjtBQUM1QyxlQUFPLFFBQVEsR0FBRztBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJO0FBQ0YsY0FBTSxNQUFNLE1BQU0sTUFBTSxvRUFBb0U7QUFBQSxVQUMxRixRQUFRO0FBQUEsVUFDUixhQUFhO0FBQUEsVUFDYixTQUFTLEVBQUMsZ0JBQWdCLG1CQUFrQjtBQUFBLFVBQzVDLE1BQU0sS0FBSyxVQUFVLEVBQUMsS0FBSSxDQUFDO0FBQUEsUUFDakMsQ0FBSztBQUVELGNBQU0sT0FBTyxNQUFNLElBQUksS0FBSTtBQUUzQixZQUFJLEtBQUssU0FBUztBQUNoQixjQUFJLEtBQUssTUFBTyxjQUFhLFFBQVEsYUFBYSxLQUFLLEtBQUs7QUFDNUQsY0FBSSxLQUFLLEtBQU0sTUFBSyxNQUFNLE9BQU8sS0FBSztBQUl0QyxjQUFJO0FBQ0YsZ0JBQUksTUFBTSxXQUFXLE1BQU0sR0FBRztBQUM1QixvQkFBTSxNQUFNLElBQUksSUFBSSxLQUFLO0FBQ3pCLHNCQUFRLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSTtBQUFBLFlBQzFDO0FBQUEsVUFDRixTQUFTLEdBQUc7QUFDVixnQkFBRyxFQUFFLE1BQUs7QUFDUixzQkFBUSxLQUFLLEVBQUUsSUFBSTtBQUFBLFlBQ3JCO0FBQ0Esb0JBQVEsS0FBSyxrQ0FBa0M7QUFDL0Msb0JBQVE7QUFBQSxVQUNWO0FBR0EsaUJBQU8sUUFBUSxLQUFLO0FBQUEsUUFDdEIsT0FBTztBQUNMLGtCQUFRLE1BQU0sZ0NBQWdDLElBQUk7QUFDbEQsaUJBQU8sUUFBUSxHQUFHO0FBQUEsUUFDcEI7QUFBQSxNQUNGLFNBQVMsS0FBSztBQUNaLGdCQUFRLE1BQU0sd0JBQXdCLEdBQUc7QUFDekMsZUFBTyxRQUFRLEdBQUc7QUFBQSxNQUNwQjtBQUFBLElBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7c0JBOURDQSxZQUVTLE9BQUEsRUFBQSxPQUFBLDhCQUZLO0FBQUEscUJBQ1osTUFBMEM7QUFBQSxNQUExQ0MsWUFBMEMsVUFBQTtBQUFBLFFBQS9CLE1BQUs7QUFBQSxRQUFNLE9BQU07QUFBQTs7Ozs7OyJ9
