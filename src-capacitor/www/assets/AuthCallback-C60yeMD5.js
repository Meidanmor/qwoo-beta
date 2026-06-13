import { _ as _export_sfc, p as openBlock, q as createBlock, t as withCtx, z as createVNode, aL as QSpinner, a9 as useRouter, D as onMounted, H as cart } from "./index-B4eBuDfB.js";
import { Q as QPage } from "./QPage-D2VeswGg.js";
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
        const res = await fetch(`${"https://nuxt.meidanm.com"}/wp-json/custom/v1/google-login-redirect`, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aENhbGxiYWNrLUM2MHllTUQ1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvQXV0aENhbGxiYWNrLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcbiAgPHEtcGFnZSBjbGFzcz1cInEtcGEtbWQgZmxleCBmbGV4LWNlbnRlclwiPlxyXG4gICAgPHEtc3Bpbm5lciBzaXplPVwiM2VtXCIgY29sb3I9XCJzZWNvbmRhcnlcIiAvPlxyXG4gIDwvcS1wYWdlPlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdCBzZXR1cD5cclxuaW1wb3J0IHsgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJ1xyXG5pbXBvcnQgY2FydCBmcm9tICdzcmMvc3RvcmVzL2NhcnQuanMnXHJcblxyXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcclxuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXHJcbiAgY29uc3QgY29kZSA9IHBhcmFtcy5nZXQoJ2NvZGUnKVxyXG4gIGxldCBzdGF0ZSA9IHBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgJy8nXHJcblxyXG4gIGlmICghY29kZSkge1xyXG4gICAgY29uc29sZS5lcnJvcignTm8gY29kZSByZXR1cm5lZCBmcm9tIEdvb2dsZScpXHJcbiAgICByb3V0ZXIucmVwbGFjZSgnLycpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtpbXBvcnQubWV0YS5lbnYuVklURV9BUElfQkFTRX0vd3AtanNvbi9jdXN0b20vdjEvZ29vZ2xlLWxvZ2luLXJlZGlyZWN0YCwge1xyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcclxuICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y29kZX0pXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpXHJcblxyXG4gICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICBpZiAoZGF0YS50b2tlbikgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2p3dF90b2tlbicsIGRhdGEudG9rZW4pXHJcbiAgICAgIGlmIChkYXRhLnVzZXIpIGNhcnQuc3RhdGUudXNlciA9IGRhdGEudXNlclxyXG5cclxuXHJcbi8vIElmIHN0YXRlIGNvbnRhaW5zIGZ1bGwgVVJMLCBleHRyYWN0IGp1c3QgdGhlIHBhdGhuYW1lXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHN0YXRlLnN0YXJ0c1dpdGgoJ2h0dHAnKSkge1xyXG4gICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChzdGF0ZSlcclxuICAgICAgICAgIHN0YXRlID0gdXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaCArIHVybC5oYXNoXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYoZS5kYXRhKXtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihlLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgc3RhdGUgVVJMLCBmYWxsYmFjayB0byAvJylcclxuICAgICAgICBzdGF0ZSA9ICcvJ1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZWRpcmVjdCB0byBvcmlnaW5hbCBwYWdlIGZyb20gc3RhdGUsIGZhbGxiYWNrIHRvIGhvbWVwYWdlXHJcbiAgICAgIHJvdXRlci5yZXBsYWNlKHN0YXRlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcignR29vZ2xlIHJlZGlyZWN0IGxvZ2luIGZhaWxlZCcsIGRhdGEpXHJcbiAgICAgIHJvdXRlci5yZXBsYWNlKCcvJylcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1JlZGlyZWN0IGxvZ2luIGVycm9yJywgZXJyKVxyXG4gICAgcm91dGVyLnJlcGxhY2UoJy8nKVxyXG4gIH1cclxufSlcclxuPC9zY3JpcHQ+XHJcbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVdBLFVBQU0sU0FBUyxVQUFBO0FBRWYsY0FBVSxZQUFZO0FBQ3BCLFlBQU0sU0FBUyxJQUFJLGdCQUFnQixPQUFPLFNBQVMsTUFBTTtBQUN6RCxZQUFNLE9BQU8sT0FBTyxJQUFJLE1BQU07QUFDOUIsVUFBSSxRQUFRLE9BQU8sSUFBSSxPQUFPLEtBQUs7QUFFbkMsVUFBSSxDQUFDLE1BQU07QUFDVCxnQkFBUSxNQUFNLDhCQUE4QjtBQUM1QyxlQUFPLFFBQVEsR0FBRztBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJO0FBQ0YsY0FBTSxNQUFNLE1BQU0sTUFBTSxHQUFHLDBCQUE2Qiw0Q0FBNEM7QUFBQSxVQUNsRyxRQUFRO0FBQUEsVUFDUixhQUFhO0FBQUEsVUFDYixTQUFTLEVBQUMsZ0JBQWdCLG1CQUFBO0FBQUEsVUFDMUIsTUFBTSxLQUFLLFVBQVUsRUFBQyxNQUFLO0FBQUEsUUFBQSxDQUM1QjtBQUVELGNBQU0sT0FBTyxNQUFNLElBQUksS0FBQTtBQUV2QixZQUFJLEtBQUssU0FBUztBQUNoQixjQUFJLEtBQUssTUFBTyxjQUFhLFFBQVEsYUFBYSxLQUFLLEtBQUs7QUFDNUQsY0FBSSxLQUFLLEtBQU0sTUFBSyxNQUFNLE9BQU8sS0FBSztBQUl0QyxjQUFJO0FBQ0YsZ0JBQUksTUFBTSxXQUFXLE1BQU0sR0FBRztBQUM1QixvQkFBTSxNQUFNLElBQUksSUFBSSxLQUFLO0FBQ3pCLHNCQUFRLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSTtBQUFBLFlBQzFDO0FBQUEsVUFDRixTQUFTLEdBQUc7QUFDVixnQkFBRyxFQUFFLE1BQUs7QUFDUixzQkFBUSxLQUFLLEVBQUUsSUFBSTtBQUFBLFlBQ3JCO0FBQ0Esb0JBQVEsS0FBSyxrQ0FBa0M7QUFDL0Msb0JBQVE7QUFBQSxVQUNWO0FBR0EsaUJBQU8sUUFBUSxLQUFLO0FBQUEsUUFDdEIsT0FBTztBQUNMLGtCQUFRLE1BQU0sZ0NBQWdDLElBQUk7QUFDbEQsaUJBQU8sUUFBUSxHQUFHO0FBQUEsUUFDcEI7QUFBQSxNQUNGLFNBQVMsS0FBSztBQUNaLGdCQUFRLE1BQU0sd0JBQXdCLEdBQUc7QUFDekMsZUFBTyxRQUFRLEdBQUc7QUFBQSxNQUNwQjtBQUFBLElBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7c0JBOURDQSxZQUVTLE9BQUEsRUFBQSxPQUFBLDhCQUZLO0FBQUEscUJBQ1osTUFBMEM7QUFBQSxNQUExQ0MsWUFBMEMsVUFBQTtBQUFBLFFBQS9CLE1BQUs7QUFBQSxRQUFNLE9BQU07QUFBQSxNQUFBOzs7Ozs7In0=
