import { W as WebPlugin } from "./index-B4eBuDfB.js";
class BaseSocialLogin extends WebPlugin {
  constructor() {
    super();
  }
  parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(jsonPayload);
  }
  async loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
}
BaseSocialLogin.OAUTH_STATE_KEY = "social_login_oauth_pending";
class AppleSocialLogin extends BaseSocialLogin {
  constructor() {
    super(...arguments);
    this.clientId = null;
    this.redirectUrl = null;
    this.scriptLoaded = false;
    this.scriptUrl = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    this.useProperTokenExchange = false;
  }
  async initialize(clientId, redirectUrl, useProperTokenExchange = false) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl || null;
    this.useProperTokenExchange = useProperTokenExchange;
    if (clientId) {
      await this.loadAppleScript();
    }
  }
  async login(options) {
    if (!this.clientId) {
      throw new Error("Apple Client ID not set. Call initialize() first.");
    }
    if (!this.scriptLoaded) {
      throw new Error("Apple Sign-In script not loaded.");
    }
    return new Promise((resolve, reject) => {
      var _a, _b;
      AppleID.auth.init({
        clientId: (_a = this.clientId) !== null && _a !== void 0 ? _a : "",
        scope: ((_b = options.scopes) === null || _b === void 0 ? void 0 : _b.join(" ")) || "name email",
        redirectURI: this.redirectUrl || window.location.href,
        state: options.state,
        nonce: options.nonce,
        usePopup: true
      });
      AppleID.auth.signIn().then((res) => {
        var _a2, _b2, _c, _d, _e;
        let accessToken = null;
        if (this.useProperTokenExchange) {
          accessToken = null;
        } else {
          accessToken = {
            token: res.authorization.code || ""
          };
        }
        const result = Object.assign({ profile: {
          user: res.user || "",
          email: ((_a2 = res.user) === null || _a2 === void 0 ? void 0 : _a2.email) || null,
          givenName: ((_c = (_b2 = res.user) === null || _b2 === void 0 ? void 0 : _b2.name) === null || _c === void 0 ? void 0 : _c.firstName) || null,
          familyName: ((_e = (_d = res.user) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.lastName) || null
        }, accessToken, idToken: res.authorization.id_token || null }, this.useProperTokenExchange && { authorizationCode: res.authorization.code });
        resolve({ provider: "apple", result });
      }).catch((error) => {
        reject(error);
      });
    });
  }
  async logout() {
    console.log("Apple logout: Session should be managed on the client side");
  }
  async isLoggedIn() {
    console.log("Apple login status should be managed on the client side");
    return { isLoggedIn: false };
  }
  async getAuthorizationCode() {
    console.log("Apple authorization code should be stored during login");
    throw new Error("Apple authorization code not available");
  }
  async refresh() {
    console.log("Apple refresh not available on web");
  }
  async loadAppleScript() {
    if (this.scriptLoaded)
      return;
    return this.loadScript(this.scriptUrl).then(() => {
      this.scriptLoaded = true;
    });
  }
}
class FacebookSocialLogin extends BaseSocialLogin {
  constructor() {
    super(...arguments);
    this.appId = null;
    this.scriptLoaded = false;
    this.locale = "en_US";
  }
  async initialize(appId, locale) {
    this.appId = appId;
    if (locale) {
      this.locale = locale;
    }
    if (appId) {
      await this.loadFacebookScript(this.locale);
      FB.init({
        appId: this.appId,
        version: "v17.0",
        xfbml: true,
        cookie: true
      });
    }
  }
  async login(options) {
    if (!this.appId) {
      throw new Error("Facebook App ID not set. Call initialize() first.");
    }
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        if (response.status === "connected") {
          FB.api("/me", { fields: "id,name,email,picture" }, (userInfo) => {
            var _a, _b;
            const result = {
              accessToken: {
                token: response.authResponse.accessToken,
                userId: response.authResponse.userID
              },
              profile: {
                userID: userInfo.id,
                name: userInfo.name,
                email: userInfo.email || null,
                imageURL: ((_b = (_a = userInfo.picture) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url) || null,
                friendIDs: [],
                birthday: null,
                ageRange: null,
                gender: null,
                location: null,
                hometown: null,
                profileURL: null
              },
              idToken: null
            };
            resolve({ provider: "facebook", result });
          });
        } else {
          reject(new Error("Facebook login failed"));
        }
      }, { scope: options.permissions.join(",") });
    });
  }
  async logout() {
    return new Promise((resolve) => {
      FB.logout(() => resolve());
    });
  }
  async isLoggedIn() {
    return new Promise((resolve) => {
      FB.getLoginStatus((response) => {
        resolve({ isLoggedIn: response.status === "connected" });
      });
    });
  }
  async getAuthorizationCode() {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        var _a;
        if (response.status === "connected") {
          resolve({ accessToken: ((_a = response.authResponse) === null || _a === void 0 ? void 0 : _a.accessToken) || "" });
        } else {
          reject(new Error("No Facebook authorization code available"));
        }
      });
    });
  }
  async refresh(options) {
    await this.login(options);
  }
  async loadFacebookScript(locale) {
    if (this.scriptLoaded)
      return;
    const existingScript = document.querySelector('script[src*="connect.facebook.net"]');
    if (existingScript) {
      existingScript.remove();
    }
    return this.loadScript(`https://connect.facebook.net/${locale}/sdk.js`).then(() => {
      this.scriptLoaded = true;
    });
  }
}
class GoogleSocialLogin extends BaseSocialLogin {
  constructor() {
    super(...arguments);
    this.clientId = null;
    this.loginType = "online";
    this.GOOGLE_TOKEN_REQUEST_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo";
    this.GOOGLE_STATE_KEY = "capgo_social_login_google_state";
  }
  async initialize(clientId, mode, hostedDomain, redirectUrl) {
    this.clientId = clientId;
    if (mode) {
      this.loginType = mode;
    }
    this.hostedDomain = hostedDomain;
    this.redirectUrl = redirectUrl;
  }
  async login(options) {
    if (!this.clientId) {
      throw new Error("Google Client ID not set. Call initialize() first.");
    }
    let scopes = options.scopes || [];
    if (scopes.length > 0) {
      if (!scopes.includes("https://www.googleapis.com/auth/userinfo.email")) {
        scopes.push("https://www.googleapis.com/auth/userinfo.email");
      }
      if (!scopes.includes("https://www.googleapis.com/auth/userinfo.profile")) {
        scopes.push("https://www.googleapis.com/auth/userinfo.profile");
      }
      if (!scopes.includes("openid")) {
        scopes.push("openid");
      }
    } else {
      scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid"
      ];
    }
    const nonce = options.nonce || Math.random().toString(36).substring(2);
    return this.traditionalOAuth({
      scopes,
      nonce,
      hostedDomain: this.hostedDomain,
      prompt: options.prompt
    });
  }
  async logout() {
    if (this.loginType === "offline") {
      return Promise.reject("Offline login doesn't store tokens. logout is not available");
    }
    const state = this.getGoogleState();
    if (!state)
      return;
    await this.rawLogoutGoogle(state.accessToken);
  }
  async isLoggedIn() {
    if (this.loginType === "offline") {
      return Promise.reject("Offline login doesn't store tokens. isLoggedIn is not available");
    }
    const state = this.getGoogleState();
    if (!state)
      return { isLoggedIn: false };
    try {
      const isValidAccessToken = await this.accessTokenIsValid(state.accessToken);
      const isValidIdToken = this.idTokenValid(state.idToken);
      if (isValidAccessToken && isValidIdToken) {
        return { isLoggedIn: true };
      } else {
        try {
          await this.rawLogoutGoogle(state.accessToken, false);
        } catch (e) {
          console.error("Access token is not valid, but cannot logout", e);
        }
        return { isLoggedIn: false };
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async getAuthorizationCode() {
    if (this.loginType === "offline") {
      return Promise.reject("Offline login doesn't store tokens. getAuthorizationCode is not available");
    }
    const state = this.getGoogleState();
    if (!state)
      throw new Error("No Google authorization code available");
    try {
      const isValidAccessToken = await this.accessTokenIsValid(state.accessToken);
      const isValidIdToken = this.idTokenValid(state.idToken);
      if (isValidAccessToken && isValidIdToken) {
        return { accessToken: state.accessToken, jwt: state.idToken };
      } else {
        try {
          await this.rawLogoutGoogle(state.accessToken, false);
        } catch (e) {
          console.error("Access token is not valid, but cannot logout", e);
        }
        throw new Error("No Google authorization code available");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async refresh() {
    return Promise.reject("Not implemented");
  }
  handleOAuthRedirect(url) {
    const paramsRaw = url.searchParams;
    const errorInParams = paramsRaw.get("error");
    if (errorInParams) {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
      const errorDescription = paramsRaw.get("error_description") || errorInParams;
      return { error: errorDescription };
    }
    const code = paramsRaw.get("code");
    if (code && paramsRaw.has("scope")) {
      return {
        provider: "google",
        result: {
          serverAuthCode: code,
          responseType: "offline"
        }
      };
    }
    const hash = url.hash.substring(1);
    console.log("handleOAuthRedirect", url.hash);
    if (!hash)
      return null;
    const params = new URLSearchParams(hash);
    const error = params.get("error");
    if (error) {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
      const errorDescription = params.get("error_description") || error;
      return { error: errorDescription };
    }
    console.log("handleOAuthRedirect ok");
    const accessToken = params.get("access_token");
    const idToken = params.get("id_token");
    if (accessToken && idToken) {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
      const profile = this.parseJwt(idToken);
      return {
        provider: "google",
        result: {
          accessToken: {
            token: accessToken
          },
          idToken,
          profile: {
            email: profile.email || null,
            familyName: profile.family_name || null,
            givenName: profile.given_name || null,
            id: profile.sub || null,
            name: profile.name || null,
            imageUrl: profile.picture || null
          },
          responseType: "online"
        }
      };
    }
    return null;
  }
  async accessTokenIsValid(accessToken) {
    const url = `${this.GOOGLE_TOKEN_REQUEST_URL}?access_token=${encodeURIComponent(accessToken)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response not successful. Status code: ${response.status}. Assuming that the token is not valid`);
        return false;
      }
      const responseBody = await response.text();
      if (!responseBody) {
        console.error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response body is null`);
        throw new Error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response body is null`);
      }
      let jsonObject;
      try {
        jsonObject = JSON.parse(responseBody);
      } catch (e) {
        console.error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response body is not valid JSON. Error: ${e}`);
        throw new Error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response body is not valid JSON. Error: ${e}`);
      }
      const expiresInStr = jsonObject["expires_in"];
      if (expiresInStr === void 0 || expiresInStr === null) {
        console.error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response JSON does not include 'expires_in'.`);
        throw new Error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. Response JSON does not include 'expires_in'.`);
      }
      let expiresInInt;
      try {
        expiresInInt = parseInt(expiresInStr, 10);
        if (isNaN(expiresInInt)) {
          throw new Error(`'expires_in' is not a valid integer`);
        }
      } catch (e) {
        console.error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. 'expires_in': ${expiresInStr} is not a valid integer. Error: ${e}`);
        throw new Error(`Invalid response from ${this.GOOGLE_TOKEN_REQUEST_URL}. 'expires_in': ${expiresInStr} is not a valid integer. Error: ${e}`);
      }
      return expiresInInt > 5;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  idTokenValid(idToken) {
    try {
      const parsed = this.parseJwt(idToken);
      const currentTime = Math.ceil(Date.now() / 1e3) + 5;
      return parsed.exp && currentTime < parsed.exp;
    } catch (e) {
      return false;
    }
  }
  async rawLogoutGoogle(accessToken, tokenValid = null) {
    if (tokenValid === null) {
      tokenValid = await this.accessTokenIsValid(accessToken);
    }
    if (tokenValid === true) {
      try {
        await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${encodeURIComponent(accessToken)}`);
        this.clearStateGoogle();
      } catch (e) {
      }
      return;
    } else {
      this.clearStateGoogle();
      return;
    }
  }
  persistStateGoogle(accessToken, idToken) {
    try {
      window.localStorage.setItem(this.GOOGLE_STATE_KEY, JSON.stringify({ accessToken, idToken }));
    } catch (e) {
      console.error("Cannot persist state google", e);
    }
  }
  clearStateGoogle() {
    try {
      window.localStorage.removeItem(this.GOOGLE_STATE_KEY);
    } catch (e) {
      console.error("Cannot clear state google", e);
    }
  }
  getGoogleState() {
    try {
      const state = window.localStorage.getItem(this.GOOGLE_STATE_KEY);
      if (!state)
        return null;
      const { accessToken, idToken } = JSON.parse(state);
      return { accessToken, idToken };
    } catch (e) {
      console.error("Cannot get state google", e);
      return null;
    }
  }
  async traditionalOAuth({ scopes, hostedDomain, nonce, prompt }) {
    var _a;
    const uniqueScopes = [.../* @__PURE__ */ new Set([...scopes || [], "openid"])];
    const params = new URLSearchParams(Object.assign(Object.assign({ client_id: (_a = this.clientId) !== null && _a !== void 0 ? _a : "", redirect_uri: this.redirectUrl || window.location.origin + window.location.pathname, response_type: this.loginType === "offline" ? "code" : "token id_token", scope: uniqueScopes.join(" ") }, nonce && { nonce }), { include_granted_scopes: "true", state: "popup" }));
    if (hostedDomain !== void 0) {
      params.append("hd", hostedDomain);
    }
    if (prompt !== void 0) {
      params.append("prompt", prompt);
    }
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    localStorage.setItem(BaseSocialLogin.OAUTH_STATE_KEY, JSON.stringify({ provider: "google", loginType: this.loginType }));
    const popup = window.open(url, "Google Sign In", `width=${width},height=${height},left=${left},top=${top},popup=1`);
    let popupClosedInterval;
    let timeoutHandle;
    return new Promise((resolve, reject) => {
      if (!popup) {
        reject(new Error("Failed to open popup"));
        return;
      }
      const handleMessage = (event) => {
        var _a2, _b, _c, _d;
        if (event.origin !== window.location.origin || ((_b = (_a2 = event.data) === null || _a2 === void 0 ? void 0 : _a2.source) === null || _b === void 0 ? void 0 : _b.startsWith("angular")))
          return;
        if (((_c = event.data) === null || _c === void 0 ? void 0 : _c.type) === "oauth-response") {
          window.removeEventListener("message", handleMessage);
          clearInterval(popupClosedInterval);
          clearTimeout(timeoutHandle);
          if (this.loginType === "online") {
            const { accessToken, idToken } = event.data;
            if (accessToken && idToken) {
              const profile = this.parseJwt(idToken);
              this.persistStateGoogle(accessToken.token, idToken);
              resolve({
                provider: "google",
                result: {
                  accessToken: {
                    token: accessToken.token
                  },
                  idToken,
                  profile: {
                    email: profile.email || null,
                    familyName: profile.family_name || null,
                    givenName: profile.given_name || null,
                    id: profile.sub || null,
                    name: profile.name || null,
                    imageUrl: profile.picture || null
                  },
                  responseType: "online"
                }
              });
            }
          } else {
            const { serverAuthCode } = event.data;
            resolve({
              provider: "google",
              result: {
                responseType: "offline",
                serverAuthCode
              }
            });
          }
        } else if (((_d = event.data) === null || _d === void 0 ? void 0 : _d.type) === "oauth-error") {
          window.removeEventListener("message", handleMessage);
          clearInterval(popupClosedInterval);
          clearTimeout(timeoutHandle);
          const errorMessage = event.data.error || "User cancelled the OAuth flow";
          reject(new Error(errorMessage));
        }
      };
      window.addEventListener("message", handleMessage);
      timeoutHandle = setTimeout(() => {
        clearTimeout(timeoutHandle);
        window.removeEventListener("message", handleMessage);
        popup.close();
        reject(new Error("OAuth timeout"));
      }, 3e5);
      popupClosedInterval = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupClosedInterval);
          reject(new Error("Popup closed"));
        }
      }, 1e3);
    });
  }
}
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
class TwitterSocialLogin extends BaseSocialLogin {
  constructor() {
    super(...arguments);
    this.clientId = null;
    this.redirectUrl = null;
    this.defaultScopes = ["tweet.read", "users.read"];
    this.forceLogin = false;
    this.TOKENS_KEY = "capgo_social_login_twitter_tokens_v1";
    this.STATE_PREFIX = "capgo_social_login_twitter_state_";
  }
  async initialize(clientId, redirectUrl, defaultScopes, forceLogin, audience) {
    this.clientId = clientId;
    this.redirectUrl = redirectUrl !== null && redirectUrl !== void 0 ? redirectUrl : null;
    if (defaultScopes === null || defaultScopes === void 0 ? void 0 : defaultScopes.length) {
      this.defaultScopes = defaultScopes;
    }
    this.forceLogin = forceLogin !== null && forceLogin !== void 0 ? forceLogin : false;
    this.audience = audience !== null && audience !== void 0 ? audience : void 0;
  }
  async login(options) {
    var _a, _b, _c, _d, _e, _f;
    if (!this.clientId) {
      throw new Error("Twitter Client ID not configured. Call initialize() first.");
    }
    const redirectUri = (_b = (_a = options.redirectUrl) !== null && _a !== void 0 ? _a : this.redirectUrl) !== null && _b !== void 0 ? _b : window.location.origin + window.location.pathname;
    const scopes = ((_c = options.scopes) === null || _c === void 0 ? void 0 : _c.length) ? options.scopes : this.defaultScopes;
    const state = (_d = options.state) !== null && _d !== void 0 ? _d : this.generateState();
    const codeVerifier = (_e = options.codeVerifier) !== null && _e !== void 0 ? _e : this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    this.persistPendingLogin(state, {
      codeVerifier,
      redirectUri,
      scopes
    });
    localStorage.setItem(BaseSocialLogin.OAUTH_STATE_KEY, JSON.stringify({ provider: "twitter", state }));
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(" "),
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });
    if (((_f = options.forceLogin) !== null && _f !== void 0 ? _f : this.forceLogin) === true) {
      params.set("force_login", "true");
    }
    if (this.audience) {
      params.set("audience", this.audience);
    }
    const authUrl = `https://x.com/i/oauth2/authorize?${params.toString()}`;
    const width = 500;
    const height = 650;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(authUrl, "XLogin", `width=${width},height=${height},left=${left},top=${top},popup=1`);
    return new Promise((resolve, reject) => {
      if (!popup) {
        reject(new Error("Unable to open login window. Please allow popups."));
        return;
      }
      const cleanup = (messageHandler2, timeoutHandle2, intervalHandle) => {
        window.removeEventListener("message", messageHandler2);
        clearTimeout(timeoutHandle2);
        clearInterval(intervalHandle);
      };
      const messageHandler = (event) => {
        var _a2, _b2, _c2, _d2;
        if (event.origin !== window.location.origin) {
          return;
        }
        if (((_a2 = event.data) === null || _a2 === void 0 ? void 0 : _a2.type) === "oauth-response") {
          if (((_b2 = event.data) === null || _b2 === void 0 ? void 0 : _b2.provider) && event.data.provider !== "twitter") {
            return;
          }
          cleanup(messageHandler, timeoutHandle, popupClosedInterval);
          const _e2 = event.data, { provider: _ignoredProvider } = _e2, payload = __rest(_e2, ["provider"]);
          resolve({
            provider: "twitter",
            result: payload
          });
        } else if (((_c2 = event.data) === null || _c2 === void 0 ? void 0 : _c2.type) === "oauth-error") {
          if (((_d2 = event.data) === null || _d2 === void 0 ? void 0 : _d2.provider) && event.data.provider !== "twitter") {
            return;
          }
          cleanup(messageHandler, timeoutHandle, popupClosedInterval);
          reject(new Error(event.data.error || "Twitter login was cancelled."));
        }
      };
      window.addEventListener("message", messageHandler);
      const timeoutHandle = window.setTimeout(() => {
        window.removeEventListener("message", messageHandler);
        popup.close();
        reject(new Error("Twitter login timed out."));
      }, 3e5);
      const popupClosedInterval = window.setInterval(() => {
        if (popup.closed) {
          window.removeEventListener("message", messageHandler);
          clearInterval(popupClosedInterval);
          clearTimeout(timeoutHandle);
          reject(new Error("Twitter login window was closed."));
        }
      }, 1e3);
    });
  }
  async logout() {
    localStorage.removeItem(this.TOKENS_KEY);
  }
  async isLoggedIn() {
    const tokens = this.getStoredTokens();
    if (!tokens) {
      return { isLoggedIn: false };
    }
    const isValid = tokens.expiresAt > Date.now();
    if (!isValid) {
      localStorage.removeItem(this.TOKENS_KEY);
    }
    return { isLoggedIn: isValid };
  }
  async getAuthorizationCode() {
    const tokens = this.getStoredTokens();
    if (!tokens) {
      throw new Error("Twitter access token is not available.");
    }
    return {
      accessToken: tokens.accessToken
    };
  }
  async refresh() {
    const tokens = this.getStoredTokens();
    if (!(tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken)) {
      throw new Error("No Twitter refresh token is available. Include offline.access scope to receive one.");
    }
    await this.refreshWithRefreshToken(tokens.refreshToken);
  }
  async handleOAuthRedirect(url, expectedState) {
    const params = url.searchParams;
    const stateFromUrl = expectedState !== null && expectedState !== void 0 ? expectedState : params.get("state");
    if (!stateFromUrl) {
      return null;
    }
    const pending = this.consumePendingLogin(stateFromUrl);
    if (!pending) {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
      return { error: "Twitter login session expired or state mismatch." };
    }
    const error = params.get("error");
    if (error) {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
      return { error: params.get("error_description") || error };
    }
    const code = params.get("code");
    if (!code) {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
      return { error: "Twitter authorization code missing from redirect." };
    }
    try {
      const tokens = await this.exchangeAuthorizationCode(code, pending);
      const profile = await this.fetchProfile(tokens.access_token);
      const expiresAt = Date.now() + tokens.expires_in * 1e3;
      const scopeArray = tokens.scope.split(" ").filter(Boolean);
      this.persistTokens({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
        scope: scopeArray,
        tokenType: tokens.token_type,
        userId: profile.id,
        profile
      });
      return {
        provider: "twitter",
        result: {
          accessToken: {
            token: tokens.access_token,
            tokenType: tokens.token_type,
            expires: new Date(expiresAt).toISOString(),
            userId: profile.id
          },
          refreshToken: tokens.refresh_token,
          scope: scopeArray,
          tokenType: tokens.token_type,
          expiresIn: tokens.expires_in,
          profile
        }
      };
    } catch (err) {
      if (err instanceof Error) {
        return { error: err.message };
      }
      return { error: "Twitter login failed unexpectedly." };
    } finally {
      localStorage.removeItem(BaseSocialLogin.OAUTH_STATE_KEY);
    }
  }
  async exchangeAuthorizationCode(code, pending) {
    var _a;
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: (_a = this.clientId) !== null && _a !== void 0 ? _a : "",
      code,
      redirect_uri: pending.redirectUri,
      code_verifier: pending.codeVerifier
    });
    const response = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Twitter token exchange failed (${response.status}): ${text}`);
    }
    return await response.json();
  }
  async refreshWithRefreshToken(refreshToken) {
    var _a, _b;
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: (_a = this.clientId) !== null && _a !== void 0 ? _a : ""
    });
    const response = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Twitter refresh failed (${response.status}): ${text}`);
    }
    const tokens = await response.json();
    const profile = await this.fetchProfile(tokens.access_token);
    const expiresAt = Date.now() + tokens.expires_in * 1e3;
    const scopeArray = tokens.scope.split(" ").filter(Boolean);
    this.persistTokens({
      accessToken: tokens.access_token,
      refreshToken: (_b = tokens.refresh_token) !== null && _b !== void 0 ? _b : refreshToken,
      expiresAt,
      scope: scopeArray,
      tokenType: tokens.token_type,
      userId: profile.id,
      profile
    });
  }
  async fetchProfile(accessToken) {
    var _a, _b, _c, _d;
    const fields = ["profile_image_url", "verified", "name", "username"];
    const response = await fetch(`https://api.x.com/2/users/me?user.fields=${fields.join(",")}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Unable to fetch Twitter profile (${response.status}): ${text}`);
    }
    const payload = await response.json();
    if (!payload.data) {
      throw new Error("Twitter profile payload is missing data.");
    }
    return {
      id: payload.data.id,
      username: payload.data.username,
      name: (_a = payload.data.name) !== null && _a !== void 0 ? _a : null,
      profileImageUrl: (_b = payload.data.profile_image_url) !== null && _b !== void 0 ? _b : null,
      verified: (_c = payload.data.verified) !== null && _c !== void 0 ? _c : false,
      email: (_d = payload.data.email) !== null && _d !== void 0 ? _d : null
    };
  }
  persistTokens(tokens) {
    localStorage.setItem(this.TOKENS_KEY, JSON.stringify(tokens));
  }
  getStoredTokens() {
    const raw = localStorage.getItem(this.TOKENS_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse stored Twitter tokens", err);
      return null;
    }
  }
  persistPendingLogin(state, payload) {
    localStorage.setItem(`${this.STATE_PREFIX}${state}`, JSON.stringify(payload));
  }
  consumePendingLogin(state) {
    const key = `${this.STATE_PREFIX}${state}`;
    const raw = localStorage.getItem(key);
    localStorage.removeItem(key);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.warn("Failed to parse pending Twitter login payload", err);
      return null;
    }
  }
  generateState() {
    return [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  generateCodeVerifier() {
    const array = new Uint8Array(64);
    crypto.getRandomValues(array);
    return Array.from(array).map((b) => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"[b % 66]).join("");
  }
  async generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return this.base64UrlEncode(new Uint8Array(digest));
  }
  base64UrlEncode(buffer) {
    let binary = "";
    buffer.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
}
class SocialLoginWeb extends WebPlugin {
  constructor() {
    super();
    this.googleProvider = new GoogleSocialLogin();
    this.appleProvider = new AppleSocialLogin();
    this.facebookProvider = new FacebookSocialLogin();
    this.twitterProvider = new TwitterSocialLogin();
    if (localStorage.getItem(SocialLoginWeb.OAUTH_STATE_KEY)) {
      console.log("OAUTH_STATE_KEY found");
      this.handleOAuthRedirect().catch((error) => {
        console.error("Failed to finish OAuth redirect", error);
        window.close();
      });
    }
  }
  async handleOAuthRedirect() {
    var _a, _b, _c;
    const url = new URL(window.location.href);
    const stateRaw = localStorage.getItem(SocialLoginWeb.OAUTH_STATE_KEY);
    let provider = null;
    let state;
    if (stateRaw) {
      try {
        const parsed = JSON.parse(stateRaw);
        provider = (_a = parsed.provider) !== null && _a !== void 0 ? _a : null;
        state = parsed.state;
      } catch (_d) {
        provider = stateRaw === "true" ? "google" : null;
      }
    }
    let result = null;
    switch (provider) {
      case "twitter":
        result = await this.twitterProvider.handleOAuthRedirect(url, state);
        break;
      case "google":
      default:
        result = this.googleProvider.handleOAuthRedirect(url);
        break;
    }
    if (!result) {
      return;
    }
    if ("error" in result) {
      const resolvedProvider = provider !== null && provider !== void 0 ? provider : null;
      (_b = window.opener) === null || _b === void 0 ? void 0 : _b.postMessage({
        type: "oauth-error",
        provider: resolvedProvider,
        error: result.error
      }, window.location.origin);
    } else {
      (_c = window.opener) === null || _c === void 0 ? void 0 : _c.postMessage(Object.assign({ type: "oauth-response", provider: result.provider }, result.result), window.location.origin);
    }
    window.close();
  }
  async initialize(options) {
    var _a, _b, _c, _d;
    const initPromises = [];
    if ((_a = options.google) === null || _a === void 0 ? void 0 : _a.webClientId) {
      initPromises.push(this.googleProvider.initialize(options.google.webClientId, options.google.mode, options.google.hostedDomain, options.google.redirectUrl));
    }
    if ((_b = options.apple) === null || _b === void 0 ? void 0 : _b.clientId) {
      initPromises.push(this.appleProvider.initialize(options.apple.clientId, options.apple.redirectUrl, options.apple.useProperTokenExchange));
    }
    if ((_c = options.facebook) === null || _c === void 0 ? void 0 : _c.appId) {
      initPromises.push(this.facebookProvider.initialize(options.facebook.appId, options.facebook.locale));
    }
    if ((_d = options.twitter) === null || _d === void 0 ? void 0 : _d.clientId) {
      initPromises.push(this.twitterProvider.initialize(options.twitter.clientId, options.twitter.redirectUrl, options.twitter.defaultScopes, options.twitter.forceLogin, options.twitter.audience));
    }
    await Promise.all(initPromises);
  }
  async login(options) {
    switch (options.provider) {
      case "google":
        return this.googleProvider.login(options.options);
      case "apple":
        return this.appleProvider.login(options.options);
      case "facebook":
        return this.facebookProvider.login(options.options);
      case "twitter":
        return this.twitterProvider.login(options.options);
      default:
        throw new Error(`Login for ${options.provider} is not implemented on web`);
    }
  }
  async logout(options) {
    switch (options.provider) {
      case "google":
        return this.googleProvider.logout();
      case "apple":
        return this.appleProvider.logout();
      case "facebook":
        return this.facebookProvider.logout();
      case "twitter":
        return this.twitterProvider.logout();
      default:
        throw new Error(`Logout for ${options.provider} is not implemented`);
    }
  }
  async isLoggedIn(options) {
    switch (options.provider) {
      case "google":
        return this.googleProvider.isLoggedIn();
      case "apple":
        return this.appleProvider.isLoggedIn();
      case "facebook":
        return this.facebookProvider.isLoggedIn();
      case "twitter":
        return this.twitterProvider.isLoggedIn();
      default:
        throw new Error(`isLoggedIn for ${options.provider} is not implemented`);
    }
  }
  async getAuthorizationCode(options) {
    switch (options.provider) {
      case "google":
        return this.googleProvider.getAuthorizationCode();
      case "apple":
        return this.appleProvider.getAuthorizationCode();
      case "facebook":
        return this.facebookProvider.getAuthorizationCode();
      case "twitter":
        return this.twitterProvider.getAuthorizationCode();
      default:
        throw new Error(`getAuthorizationCode for ${options.provider} is not implemented`);
    }
  }
  async refresh(options) {
    switch (options.provider) {
      case "google":
        return this.googleProvider.refresh();
      case "apple":
        return this.appleProvider.refresh();
      case "facebook":
        return this.facebookProvider.refresh(options.options);
      case "twitter":
        return this.twitterProvider.refresh();
      default:
        throw new Error(`Refresh for ${options.provider} is not implemented`);
    }
  }
  async providerSpecificCall(options) {
    throw new Error(`Provider specific call for ${options.call} is not implemented`);
  }
  async getPluginVersion() {
    return { version: "web" };
  }
}
SocialLoginWeb.OAUTH_STATE_KEY = "social_login_oauth_pending";
export {
  SocialLoginWeb
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLUNHWDdMWkZmLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvQGNhcGdvL2NhcGFjaXRvci1zb2NpYWwtbG9naW4vZGlzdC9lc20vYmFzZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwZ28vY2FwYWNpdG9yLXNvY2lhbC1sb2dpbi9kaXN0L2VzbS9hcHBsZS1wcm92aWRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwZ28vY2FwYWNpdG9yLXNvY2lhbC1sb2dpbi9kaXN0L2VzbS9mYWNlYm9vay1wcm92aWRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwZ28vY2FwYWNpdG9yLXNvY2lhbC1sb2dpbi9kaXN0L2VzbS9nb29nbGUtcHJvdmlkZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGNhcGdvL2NhcGFjaXRvci1zb2NpYWwtbG9naW4vZGlzdC9lc20vdHdpdHRlci1wcm92aWRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwZ28vY2FwYWNpdG9yLXNvY2lhbC1sb2dpbi9kaXN0L2VzbS93ZWIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2ViUGx1Z2luIH0gZnJvbSAnQGNhcGFjaXRvci9jb3JlJztcbmV4cG9ydCBjbGFzcyBCYXNlU29jaWFsTG9naW4gZXh0ZW5kcyBXZWJQbHVnaW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICBwYXJzZUp3dCh0b2tlbikge1xuICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICAgICAgY29uc3QganNvblBheWxvYWQgPSBkZWNvZGVVUklDb21wb25lbnQoYXRvYihiYXNlNjQpXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAubWFwKChjKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJykpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShqc29uUGF5bG9hZCk7XG4gICAgfVxuICAgIGFzeW5jIGxvYWRTY3JpcHQoc3JjKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbkJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkgPSAnc29jaWFsX2xvZ2luX29hdXRoX3BlbmRpbmcnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZS5qcy5tYXAiLCJpbXBvcnQgeyBCYXNlU29jaWFsTG9naW4gfSBmcm9tICcuL2Jhc2UnO1xuZXhwb3J0IGNsYXNzIEFwcGxlU29jaWFsTG9naW4gZXh0ZW5kcyBCYXNlU29jaWFsTG9naW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNsaWVudElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2NyaXB0TG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NyaXB0VXJsID0gJ2h0dHBzOi8vYXBwbGVpZC5jZG4tYXBwbGUuY29tL2FwcGxlYXV0aC9zdGF0aWMvanNhcGkvYXBwbGVpZC8xL2VuX1VTL2FwcGxlaWQuYXV0aC5qcyc7XG4gICAgICAgIHRoaXMudXNlUHJvcGVyVG9rZW5FeGNoYW5nZSA9IGZhbHNlO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplKGNsaWVudElkLCByZWRpcmVjdFVybCwgdXNlUHJvcGVyVG9rZW5FeGNoYW5nZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9IHJlZGlyZWN0VXJsIHx8IG51bGw7XG4gICAgICAgIHRoaXMudXNlUHJvcGVyVG9rZW5FeGNoYW5nZSA9IHVzZVByb3BlclRva2VuRXhjaGFuZ2U7XG4gICAgICAgIGlmIChjbGllbnRJZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkQXBwbGVTY3JpcHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBsb2dpbihvcHRpb25zKSB7XG4gICAgICAgIGlmICghdGhpcy5jbGllbnRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcHBsZSBDbGllbnQgSUQgbm90IHNldC4gQ2FsbCBpbml0aWFsaXplKCkgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNjcmlwdExvYWRlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcHBsZSBTaWduLUluIHNjcmlwdCBub3QgbG9hZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgQXBwbGVJRC5hdXRoLmluaXQoe1xuICAgICAgICAgICAgICAgIGNsaWVudElkOiAoX2EgPSB0aGlzLmNsaWVudElkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJyxcbiAgICAgICAgICAgICAgICBzY29wZTogKChfYiA9IG9wdGlvbnMuc2NvcGVzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuam9pbignICcpKSB8fCAnbmFtZSBlbWFpbCcsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RVUkk6IHRoaXMucmVkaXJlY3RVcmwgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICAgICAgc3RhdGU6IG9wdGlvbnMuc3RhdGUsXG4gICAgICAgICAgICAgICAgbm9uY2U6IG9wdGlvbnMubm9uY2UsXG4gICAgICAgICAgICAgICAgdXNlUG9wdXA6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEFwcGxlSUQuYXV0aFxuICAgICAgICAgICAgICAgIC5zaWduSW4oKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICAgICAgICAgIGxldCBhY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlUHJvcGVyVG9rZW5FeGNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHVzaW5nIHByb3BlciB0b2tlbiBleGNoYW5nZSwgdGhlIGF1dGhvcml6YXRpb24gY29kZSBzaG91bGQgYmUgZXhjaGFuZ2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBhIHByb3BlciBhY2Nlc3MgdG9rZW4gb24gdGhlIGJhY2tlbmQuIEZvciBub3csIHdlIHNldCBhY2Nlc3NUb2tlbiB0byBudWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBwcm92aWRlIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgaW4gYSBzZXBhcmF0ZSBmaWVsZCBmb3IgYmFja2VuZCBwcm9jZXNzaW5nLlxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBMZWdhY3kgYmVoYXZpb3I6IHVzZSBhdXRob3JpemF0aW9uIGNvZGUgYXMgYWNjZXNzIHRva2VuIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IHJlcy5hdXRob3JpemF0aW9uLmNvZGUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oeyBwcm9maWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiByZXMudXNlciB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiAoKF9hID0gcmVzLnVzZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lbWFpbCkgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdpdmVuTmFtZTogKChfYyA9IChfYiA9IHJlcy51c2VyKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubmFtZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmZpcnN0TmFtZSkgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbWlseU5hbWU6ICgoX2UgPSAoX2QgPSByZXMudXNlcikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLm5hbWUpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5sYXN0TmFtZSkgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSwgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLCBpZFRva2VuOiByZXMuYXV0aG9yaXphdGlvbi5pZF90b2tlbiB8fCBudWxsIH0sICh0aGlzLnVzZVByb3BlclRva2VuRXhjaGFuZ2UgJiYgeyBhdXRob3JpemF0aW9uQ29kZTogcmVzLmF1dGhvcml6YXRpb24uY29kZSB9KSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHByb3ZpZGVyOiAnYXBwbGUnLCByZXN1bHQgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBsb2dvdXQoKSB7XG4gICAgICAgIC8vIEFwcGxlIGRvZXNuJ3QgcHJvdmlkZSBhIGxvZ291dCBtZXRob2QgZm9yIHdlYlxuICAgICAgICBjb25zb2xlLmxvZygnQXBwbGUgbG9nb3V0OiBTZXNzaW9uIHNob3VsZCBiZSBtYW5hZ2VkIG9uIHRoZSBjbGllbnQgc2lkZScpO1xuICAgIH1cbiAgICBhc3luYyBpc0xvZ2dlZEluKCkge1xuICAgICAgICAvLyBBcHBsZSBkb2Vzbid0IHByb3ZpZGUgYSBtZXRob2QgdG8gY2hlY2sgbG9naW4gc3RhdHVzIG9uIHdlYlxuICAgICAgICBjb25zb2xlLmxvZygnQXBwbGUgbG9naW4gc3RhdHVzIHNob3VsZCBiZSBtYW5hZ2VkIG9uIHRoZSBjbGllbnQgc2lkZScpO1xuICAgICAgICByZXR1cm4geyBpc0xvZ2dlZEluOiBmYWxzZSB9O1xuICAgIH1cbiAgICBhc3luYyBnZXRBdXRob3JpemF0aW9uQ29kZSgpIHtcbiAgICAgICAgLy8gQXBwbGUgYXV0aG9yaXphdGlvbiBjb2RlIHNob3VsZCBiZSBvYnRhaW5lZCBkdXJpbmcgbG9naW5cbiAgICAgICAgY29uc29sZS5sb2coJ0FwcGxlIGF1dGhvcml6YXRpb24gY29kZSBzaG91bGQgYmUgc3RvcmVkIGR1cmluZyBsb2dpbicpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwcGxlIGF1dGhvcml6YXRpb24gY29kZSBub3QgYXZhaWxhYmxlJyk7XG4gICAgfVxuICAgIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgICAgIC8vIEFwcGxlIGRvZXNuJ3QgcHJvdmlkZSBhIHJlZnJlc2ggbWV0aG9kIGZvciB3ZWJcbiAgICAgICAgY29uc29sZS5sb2coJ0FwcGxlIHJlZnJlc2ggbm90IGF2YWlsYWJsZSBvbiB3ZWInKTtcbiAgICB9XG4gICAgYXN5bmMgbG9hZEFwcGxlU2NyaXB0KCkge1xuICAgICAgICBpZiAodGhpcy5zY3JpcHRMb2FkZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRTY3JpcHQodGhpcy5zY3JpcHRVcmwpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zY3JpcHRMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHBsZS1wcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBCYXNlU29jaWFsTG9naW4gfSBmcm9tICcuL2Jhc2UnO1xuZXhwb3J0IGNsYXNzIEZhY2Vib29rU29jaWFsTG9naW4gZXh0ZW5kcyBCYXNlU29jaWFsTG9naW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmFwcElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhbGUgPSAnZW5fVVMnO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplKGFwcElkLCBsb2NhbGUpIHtcbiAgICAgICAgdGhpcy5hcHBJZCA9IGFwcElkO1xuICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXBwSWQpIHtcbiAgICAgICAgICAgIC8vIExvYWQgd2l0aCB0aGUgc3BlY2lmaWVkIGxvY2FsZSBvciBkZWZhdWx0XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRGYWNlYm9va1NjcmlwdCh0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBGQi5pbml0KHtcbiAgICAgICAgICAgICAgICBhcHBJZDogdGhpcy5hcHBJZCxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiAndjE3LjAnLFxuICAgICAgICAgICAgICAgIHhmYm1sOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvb2tpZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGxvZ2luKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhY2Vib29rIEFwcCBJRCBub3Qgc2V0LiBDYWxsIGluaXRpYWxpemUoKSBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgRkIubG9naW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgRkIuYXBpKCcvbWUnLCB7IGZpZWxkczogJ2lkLG5hbWUsZW1haWwscGljdHVyZScgfSwgKHVzZXJJbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiByZXNwb25zZS5hdXRoUmVzcG9uc2UuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogcmVzcG9uc2UuYXV0aFJlc3BvbnNlLnVzZXJJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklEOiB1c2VySW5mby5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlckluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlVVJMOiAoKF9iID0gKF9hID0gdXNlckluZm8ucGljdHVyZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRhdGEpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi51cmwpIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyaWVuZElEczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpcnRoZGF5OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VSYW5nZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9tZXRvd246IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVVUkw6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFRva2VuOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyBwcm92aWRlcjogJ2ZhY2Vib29rJywgcmVzdWx0IH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ZhY2Vib29rIGxvZ2luIGZhaWxlZCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7IHNjb3BlOiBvcHRpb25zLnBlcm1pc3Npb25zLmpvaW4oJywnKSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGxvZ291dCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBGQi5sb2dvdXQoKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGlzTG9nZ2VkSW46IHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGdldEF1dGhvcml6YXRpb25Db2RlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyBhY2Nlc3NUb2tlbjogKChfYSA9IHJlc3BvbnNlLmF1dGhSZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc1Rva2VuKSB8fCAnJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ05vIEZhY2Vib29rIGF1dGhvcml6YXRpb24gY29kZSBhdmFpbGFibGUnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyByZWZyZXNoKG9wdGlvbnMpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2dpbihvcHRpb25zKTtcbiAgICB9XG4gICAgYXN5bmMgbG9hZEZhY2Vib29rU2NyaXB0KGxvY2FsZSkge1xuICAgICAgICBpZiAodGhpcy5zY3JpcHRMb2FkZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgRmFjZWJvb2sgU0RLIHNjcmlwdFxuICAgICAgICBjb25zdCBleGlzdGluZ1NjcmlwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtzcmMqPVwiY29ubmVjdC5mYWNlYm9vay5uZXRcIl0nKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nU2NyaXB0KSB7XG4gICAgICAgICAgICBleGlzdGluZ1NjcmlwdC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2FkU2NyaXB0KGBodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0LyR7bG9jYWxlfS9zZGsuanNgKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NyaXB0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFjZWJvb2stcHJvdmlkZXIuanMubWFwIiwiaW1wb3J0IHsgQmFzZVNvY2lhbExvZ2luIH0gZnJvbSAnLi9iYXNlJztcbmV4cG9ydCBjbGFzcyBHb29nbGVTb2NpYWxMb2dpbiBleHRlbmRzIEJhc2VTb2NpYWxMb2dpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvZ2luVHlwZSA9ICdvbmxpbmUnO1xuICAgICAgICB0aGlzLkdPT0dMRV9UT0tFTl9SRVFVRVNUX1VSTCA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjMvdG9rZW5pbmZvJztcbiAgICAgICAgdGhpcy5HT09HTEVfU1RBVEVfS0VZID0gJ2NhcGdvX3NvY2lhbF9sb2dpbl9nb29nbGVfc3RhdGUnO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplKGNsaWVudElkLCBtb2RlLCBob3N0ZWREb21haW4sIHJlZGlyZWN0VXJsKSB7XG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcbiAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5UeXBlID0gbW9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RlZERvbWFpbiA9IGhvc3RlZERvbWFpbjtcbiAgICAgICAgdGhpcy5yZWRpcmVjdFVybCA9IHJlZGlyZWN0VXJsO1xuICAgIH1cbiAgICBhc3luYyBsb2dpbihvcHRpb25zKSB7XG4gICAgICAgIGlmICghdGhpcy5jbGllbnRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHb29nbGUgQ2xpZW50IElEIG5vdCBzZXQuIENhbGwgaW5pdGlhbGl6ZSgpIGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzY29wZXMgPSBvcHRpb25zLnNjb3BlcyB8fCBbXTtcbiAgICAgICAgaWYgKHNjb3Blcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBJZiBzY29wZXMgYXJlIHByb3ZpZGVkLCBkaXJlY3RseSB1c2UgdGhlIHRyYWRpdGlvbmFsIE9BdXRoIGZsb3dcbiAgICAgICAgICAgIGlmICghc2NvcGVzLmluY2x1ZGVzKCdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsJykpIHtcbiAgICAgICAgICAgICAgICBzY29wZXMucHVzaCgnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5lbWFpbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzY29wZXMuaW5jbHVkZXMoJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZScpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVzLnB1c2goJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzY29wZXMuaW5jbHVkZXMoJ29wZW5pZCcpKSB7XG4gICAgICAgICAgICAgICAgc2NvcGVzLnB1c2goJ29wZW5pZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2NvcGVzID0gW1xuICAgICAgICAgICAgICAgICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsJyxcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlJyxcbiAgICAgICAgICAgICAgICAnb3BlbmlkJyxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9uY2UgPSBvcHRpb25zLm5vbmNlIHx8IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKTtcbiAgICAgICAgLy8gSWYgc2NvcGVzIGFyZSBwcm92aWRlZCwgZGlyZWN0bHkgdXNlIHRoZSB0cmFkaXRpb25hbCBPQXV0aCBmbG93XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWRpdGlvbmFsT0F1dGgoe1xuICAgICAgICAgICAgc2NvcGVzLFxuICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICBob3N0ZWREb21haW46IHRoaXMuaG9zdGVkRG9tYWluLFxuICAgICAgICAgICAgcHJvbXB0OiBvcHRpb25zLnByb21wdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGxvZ291dCgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9naW5UeXBlID09PSAnb2ZmbGluZScpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk9mZmxpbmUgbG9naW4gZG9lc24ndCBzdG9yZSB0b2tlbnMuIGxvZ291dCBpcyBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0R29vZ2xlU3RhdGUoKTtcbiAgICAgICAgaWYgKCFzdGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYXdhaXQgdGhpcy5yYXdMb2dvdXRHb29nbGUoc3RhdGUuYWNjZXNzVG9rZW4pO1xuICAgIH1cbiAgICBhc3luYyBpc0xvZ2dlZEluKCkge1xuICAgICAgICBpZiAodGhpcy5sb2dpblR5cGUgPT09ICdvZmZsaW5lJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwiT2ZmbGluZSBsb2dpbiBkb2Vzbid0IHN0b3JlIHRva2Vucy4gaXNMb2dnZWRJbiBpcyBub3QgYXZhaWxhYmxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0R29vZ2xlU3RhdGUoKTtcbiAgICAgICAgaWYgKCFzdGF0ZSlcbiAgICAgICAgICAgIHJldHVybiB7IGlzTG9nZ2VkSW46IGZhbHNlIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkQWNjZXNzVG9rZW4gPSBhd2FpdCB0aGlzLmFjY2Vzc1Rva2VuSXNWYWxpZChzdGF0ZS5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkSWRUb2tlbiA9IHRoaXMuaWRUb2tlblZhbGlkKHN0YXRlLmlkVG9rZW4pO1xuICAgICAgICAgICAgaWYgKGlzVmFsaWRBY2Nlc3NUb2tlbiAmJiBpc1ZhbGlkSWRUb2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGlzTG9nZ2VkSW46IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmF3TG9nb3V0R29vZ2xlKHN0YXRlLmFjY2Vzc1Rva2VuLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FjY2VzcyB0b2tlbiBpcyBub3QgdmFsaWQsIGJ1dCBjYW5ub3QgbG9nb3V0JywgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGlzTG9nZ2VkSW46IGZhbHNlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRBdXRob3JpemF0aW9uQ29kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubG9naW5UeXBlID09PSAnb2ZmbGluZScpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIk9mZmxpbmUgbG9naW4gZG9lc24ndCBzdG9yZSB0b2tlbnMuIGdldEF1dGhvcml6YXRpb25Db2RlIGlzIG5vdCBhdmFpbGFibGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRHb29nbGVTdGF0ZSgpO1xuICAgICAgICBpZiAoIXN0YXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBHb29nbGUgYXV0aG9yaXphdGlvbiBjb2RlIGF2YWlsYWJsZScpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaXNWYWxpZEFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5hY2Nlc3NUb2tlbklzVmFsaWQoc3RhdGUuYWNjZXNzVG9rZW4pO1xuICAgICAgICAgICAgY29uc3QgaXNWYWxpZElkVG9rZW4gPSB0aGlzLmlkVG9rZW5WYWxpZChzdGF0ZS5pZFRva2VuKTtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkQWNjZXNzVG9rZW4gJiYgaXNWYWxpZElkVG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBhY2Nlc3NUb2tlbjogc3RhdGUuYWNjZXNzVG9rZW4sIGp3dDogc3RhdGUuaWRUb2tlbiB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yYXdMb2dvdXRHb29nbGUoc3RhdGUuYWNjZXNzVG9rZW4sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQWNjZXNzIHRva2VuIGlzIG5vdCB2YWxpZCwgYnV0IGNhbm5vdCBsb2dvdXQnLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBHb29nbGUgYXV0aG9yaXphdGlvbiBjb2RlIGF2YWlsYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgLy8gRm9yIEdvb2dsZSwgd2UgY2FuIHByb21wdCBmb3IgcmUtYXV0aGVudGljYXRpb25cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG4gICAgaGFuZGxlT0F1dGhSZWRpcmVjdCh1cmwpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zUmF3ID0gdXJsLnNlYXJjaFBhcmFtcztcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGVycm9ycyBpbiBzZWFyY2ggcGFyYW1zIGZpcnN0IChmb3Igb2ZmbGluZSBtb2RlKVxuICAgICAgICBjb25zdCBlcnJvckluUGFyYW1zID0gcGFyYW1zUmF3LmdldCgnZXJyb3InKTtcbiAgICAgICAgaWYgKGVycm9ySW5QYXJhbXMpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JEZXNjcmlwdGlvbiA9IHBhcmFtc1Jhdy5nZXQoJ2Vycm9yX2Rlc2NyaXB0aW9uJykgfHwgZXJyb3JJblBhcmFtcztcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBlcnJvckRlc2NyaXB0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29kZSA9IHBhcmFtc1Jhdy5nZXQoJ2NvZGUnKTtcbiAgICAgICAgaWYgKGNvZGUgJiYgcGFyYW1zUmF3Lmhhcygnc2NvcGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogJ2dvb2dsZScsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckF1dGhDb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdvZmZsaW5lJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNoID0gdXJsLmhhc2guc3Vic3RyaW5nKDEpO1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlT0F1dGhSZWRpcmVjdCcsIHVybC5oYXNoKTtcbiAgICAgICAgaWYgKCFoYXNoKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoaGFzaCk7XG4gICAgICAgIC8vIENoZWNrIGZvciBlcnJvciBjYXNlcyBpbiBoYXNoIChlLmcuLCB1c2VyIGNhbmNlbGxlZClcbiAgICAgICAgY29uc3QgZXJyb3IgPSBwYXJhbXMuZ2V0KCdlcnJvcicpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JEZXNjcmlwdGlvbiA9IHBhcmFtcy5nZXQoJ2Vycm9yX2Rlc2NyaXB0aW9uJykgfHwgZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogZXJyb3JEZXNjcmlwdGlvbiB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVPQXV0aFJlZGlyZWN0IG9rJyk7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gcGFyYW1zLmdldCgnYWNjZXNzX3Rva2VuJyk7XG4gICAgICAgIGNvbnN0IGlkVG9rZW4gPSBwYXJhbXMuZ2V0KCdpZF90b2tlbicpO1xuICAgICAgICBpZiAoYWNjZXNzVG9rZW4gJiYgaWRUb2tlbikge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oQmFzZVNvY2lhbExvZ2luLk9BVVRIX1NUQVRFX0tFWSk7XG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gdGhpcy5wYXJzZUp3dChpZFRva2VuKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6ICdnb29nbGUnLFxuICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IGFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBpZFRva2VuLFxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogcHJvZmlsZS5lbWFpbCB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFtaWx5TmFtZTogcHJvZmlsZS5mYW1pbHlfbmFtZSB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2l2ZW5OYW1lOiBwcm9maWxlLmdpdmVuX25hbWUgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9maWxlLnN1YiB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZmlsZS5uYW1lIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybDogcHJvZmlsZS5waWN0dXJlIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ29ubGluZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGFzeW5jIGFjY2Vzc1Rva2VuSXNWYWxpZChhY2Nlc3NUb2tlbikge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLkdPT0dMRV9UT0tFTl9SRVFVRVNUX1VSTH0/YWNjZXNzX3Rva2VuPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFjY2Vzc1Rva2VuKX1gO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTWFrZSB0aGUgR0VUIHJlcXVlc3QgdXNpbmcgZmV0Y2hcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSByZXNwb25zZSBpcyBzdWNjZXNzZnVsXG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEludmFsaWQgcmVzcG9uc2UgZnJvbSAke3RoaXMuR09PR0xFX1RPS0VOX1JFUVVFU1RfVVJMfS4gUmVzcG9uc2Ugbm90IHN1Y2Nlc3NmdWwuIFN0YXR1cyBjb2RlOiAke3Jlc3BvbnNlLnN0YXR1c30uIEFzc3VtaW5nIHRoYXQgdGhlIHRva2VuIGlzIG5vdCB2YWxpZGApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEdldCB0aGUgcmVzcG9uc2UgYm9keSBhcyB0ZXh0XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZUJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlQm9keSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcmVzcG9uc2UgZnJvbSAke3RoaXMuR09PR0xFX1RPS0VOX1JFUVVFU1RfVVJMfS4gUmVzcG9uc2UgYm9keSBpcyBudWxsYCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGZyb20gJHt0aGlzLkdPT0dMRV9UT0tFTl9SRVFVRVNUX1VSTH0uIFJlc3BvbnNlIGJvZHkgaXMgbnVsbGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIHJlc3BvbnNlIGJvZHkgYXMgSlNPTlxuICAgICAgICAgICAgbGV0IGpzb25PYmplY3Q7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGpzb25PYmplY3QgPSBKU09OLnBhcnNlKHJlc3BvbnNlQm9keSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcmVzcG9uc2UgZnJvbSAke3RoaXMuR09PR0xFX1RPS0VOX1JFUVVFU1RfVVJMfS4gUmVzcG9uc2UgYm9keSBpcyBub3QgdmFsaWQgSlNPTi4gRXJyb3I6ICR7ZX1gKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgZnJvbSAke3RoaXMuR09PR0xFX1RPS0VOX1JFUVVFU1RfVVJMfS4gUmVzcG9uc2UgYm9keSBpcyBub3QgdmFsaWQgSlNPTi4gRXJyb3I6ICR7ZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEV4dHJhY3QgdGhlICdleHBpcmVzX2luJyBmaWVsZFxuICAgICAgICAgICAgY29uc3QgZXhwaXJlc0luU3RyID0ganNvbk9iamVjdFsnZXhwaXJlc19pbiddO1xuICAgICAgICAgICAgaWYgKGV4cGlyZXNJblN0ciA9PT0gdW5kZWZpbmVkIHx8IGV4cGlyZXNJblN0ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgcmVzcG9uc2UgZnJvbSAke3RoaXMuR09PR0xFX1RPS0VOX1JFUVVFU1RfVVJMfS4gUmVzcG9uc2UgSlNPTiBkb2VzIG5vdCBpbmNsdWRlICdleHBpcmVzX2luJy5gKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgZnJvbSAke3RoaXMuR09PR0xFX1RPS0VOX1JFUVVFU1RfVVJMfS4gUmVzcG9uc2UgSlNPTiBkb2VzIG5vdCBpbmNsdWRlICdleHBpcmVzX2luJy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFBhcnNlICdleHBpcmVzX2luJyBhcyBhbiBpbnRlZ2VyXG4gICAgICAgICAgICBsZXQgZXhwaXJlc0luSW50O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBleHBpcmVzSW5JbnQgPSBwYXJzZUludChleHBpcmVzSW5TdHIsIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oZXhwaXJlc0luSW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCdleHBpcmVzX2luJyBpcyBub3QgYSB2YWxpZCBpbnRlZ2VyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGZyb20gJHt0aGlzLkdPT0dMRV9UT0tFTl9SRVFVRVNUX1VSTH0uICdleHBpcmVzX2luJzogJHtleHBpcmVzSW5TdHJ9IGlzIG5vdCBhIHZhbGlkIGludGVnZXIuIEVycm9yOiAke2V9YCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGZyb20gJHt0aGlzLkdPT0dMRV9UT0tFTl9SRVFVRVNUX1VSTH0uICdleHBpcmVzX2luJzogJHtleHBpcmVzSW5TdHJ9IGlzIG5vdCBhIHZhbGlkIGludGVnZXIuIEVycm9yOiAke2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFjY2VzcyB0b2tlbiBpcyB2YWxpZCBiYXNlZCBvbiAnZXhwaXJlc19pbidcbiAgICAgICAgICAgIHJldHVybiBleHBpcmVzSW5JbnQgPiA1O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZFRva2VuVmFsaWQoaWRUb2tlbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5wYXJzZUp3dChpZFRva2VuKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gTWF0aC5jZWlsKERhdGUubm93KCkgLyAxMDAwKSArIDU7IC8vIENvbnZlcnQgY3VycmVudCB0aW1lIHRvIHNlY29uZHMgc2luY2UgZXBvY2hcbiAgICAgICAgICAgIHJldHVybiBwYXJzZWQuZXhwICYmIGN1cnJlbnRUaW1lIDwgcGFyc2VkLmV4cDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHJhd0xvZ291dEdvb2dsZShhY2Nlc3NUb2tlbiwgdG9rZW5WYWxpZCA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRva2VuVmFsaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRva2VuVmFsaWQgPSBhd2FpdCB0aGlzLmFjY2Vzc1Rva2VuSXNWYWxpZChhY2Nlc3NUb2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuVmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZmV0Y2goYGh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9yZXZva2U/dG9rZW49JHtlbmNvZGVVUklDb21wb25lbnQoYWNjZXNzVG9rZW4pfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZUdvb2dsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdGF0ZUdvb2dsZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBlcnNpc3RTdGF0ZUdvb2dsZShhY2Nlc3NUb2tlbiwgaWRUb2tlbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuR09PR0xFX1NUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkoeyBhY2Nlc3NUb2tlbiwgaWRUb2tlbiB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBwZXJzaXN0IHN0YXRlIGdvb2dsZScsIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyU3RhdGVHb29nbGUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5HT09HTEVfU1RBVEVfS0VZKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2Fubm90IGNsZWFyIHN0YXRlIGdvb2dsZScsIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEdvb2dsZVN0YXRlKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5HT09HTEVfU1RBVEVfS0VZKTtcbiAgICAgICAgICAgIGlmICghc3RhdGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBjb25zdCB7IGFjY2Vzc1Rva2VuLCBpZFRva2VuIH0gPSBKU09OLnBhcnNlKHN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB7IGFjY2Vzc1Rva2VuLCBpZFRva2VuIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBnZXQgc3RhdGUgZ29vZ2xlJywgZSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyB0cmFkaXRpb25hbE9BdXRoKHsgc2NvcGVzLCBob3N0ZWREb21haW4sIG5vbmNlLCBwcm9tcHQsIH0pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB1bmlxdWVTY29wZXMgPSBbLi4ubmV3IFNldChbLi4uKHNjb3BlcyB8fCBbXSksICdvcGVuaWQnXSldO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7IGNsaWVudF9pZDogKF9hID0gdGhpcy5jbGllbnRJZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycsIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVybCB8fCB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCByZXNwb25zZV90eXBlOiB0aGlzLmxvZ2luVHlwZSA9PT0gJ29mZmxpbmUnID8gJ2NvZGUnIDogJ3Rva2VuIGlkX3Rva2VuJywgc2NvcGU6IHVuaXF1ZVNjb3Blcy5qb2luKCcgJykgfSwgKG5vbmNlICYmIHsgbm9uY2UgfSkpLCB7IGluY2x1ZGVfZ3JhbnRlZF9zY29wZXM6ICd0cnVlJywgc3RhdGU6ICdwb3B1cCcgfSkpO1xuICAgICAgICBpZiAoaG9zdGVkRG9tYWluICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ2hkJywgaG9zdGVkRG9tYWluKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvbXB0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ3Byb21wdCcsIHByb21wdCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoPyR7cGFyYW1zLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1MDA7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDYwMDtcbiAgICAgICAgY29uc3QgbGVmdCA9IHdpbmRvdy5zY3JlZW5YICsgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICAgICAgY29uc3QgdG9wID0gd2luZG93LnNjcmVlblkgKyAod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVksIEpTT04uc3RyaW5naWZ5KHsgcHJvdmlkZXI6ICdnb29nbGUnLCBsb2dpblR5cGU6IHRoaXMubG9naW5UeXBlIH0pKTtcbiAgICAgICAgY29uc3QgcG9wdXAgPSB3aW5kb3cub3Blbih1cmwsICdHb29nbGUgU2lnbiBJbicsIGB3aWR0aD0ke3dpZHRofSxoZWlnaHQ9JHtoZWlnaHR9LGxlZnQ9JHtsZWZ0fSx0b3A9JHt0b3B9LHBvcHVwPTFgKTtcbiAgICAgICAgbGV0IHBvcHVwQ2xvc2VkSW50ZXJ2YWw7XG4gICAgICAgIGxldCB0aW1lb3V0SGFuZGxlO1xuICAgICAgICAvLyBUaGlzIG1heSBuZXZlciByZXR1cm4uLi5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghcG9wdXApIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdGYWlsZWQgdG8gb3BlbiBwb3B1cCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gfHwgKChfYiA9IChfYSA9IGV2ZW50LmRhdGEpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zb3VyY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGFydHNXaXRoKCdhbmd1bGFyJykpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCgoX2MgPSBldmVudC5kYXRhKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudHlwZSkgPT09ICdvYXV0aC1yZXNwb25zZScpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2dpblR5cGUgPT09ICdvbmxpbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGFjY2Vzc1Rva2VuLCBpZFRva2VuIH0gPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjY2Vzc1Rva2VuICYmIGlkVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlID0gdGhpcy5wYXJzZUp3dChpZFRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcnNpc3RTdGF0ZUdvb2dsZShhY2Nlc3NUb2tlbi50b2tlbiwgaWRUb2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiAnZ29vZ2xlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbi50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZFRva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBwcm9maWxlLmVtYWlsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFtaWx5TmFtZTogcHJvZmlsZS5mYW1pbHlfbmFtZSB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpdmVuTmFtZTogcHJvZmlsZS5naXZlbl9uYW1lIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHByb2ZpbGUuc3ViIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZmlsZS5uYW1lIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHByb2ZpbGUucGljdHVyZSB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ29ubGluZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHNlcnZlckF1dGhDb2RlIH0gPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6ICdnb29nbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdvZmZsaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyQXV0aENvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCgoX2QgPSBldmVudC5kYXRhKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QudHlwZSkgPT09ICdvYXV0aC1lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBldmVudC5kYXRhLmVycm9yIHx8ICdVc2VyIGNhbmNlbGxlZCB0aGUgT0F1dGggZmxvdyc7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERvbid0IHJlamVjdCBmb3Igbm9uLU9BdXRoIG1lc3NhZ2VzLCBqdXN0IGlnbm9yZSB0aGVtXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBoYW5kbGVNZXNzYWdlKTtcbiAgICAgICAgICAgIC8vIFRpbWVvdXQgYWZ0ZXIgNSBtaW51dGVzXG4gICAgICAgICAgICB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgaGFuZGxlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcG9wdXAuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdPQXV0aCB0aW1lb3V0JykpO1xuICAgICAgICAgICAgfSwgMzAwMDAwKTtcbiAgICAgICAgICAgIHBvcHVwQ2xvc2VkSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHBvcHVwQ2xvc2VkSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdQb3B1cCBjbG9zZWQnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdvb2dsZS1wcm92aWRlci5qcy5tYXAiLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBCYXNlU29jaWFsTG9naW4gfSBmcm9tICcuL2Jhc2UnO1xuZXhwb3J0IGNsYXNzIFR3aXR0ZXJTb2NpYWxMb2dpbiBleHRlbmRzIEJhc2VTb2NpYWxMb2dpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBudWxsO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZWZhdWx0U2NvcGVzID0gWyd0d2VldC5yZWFkJywgJ3VzZXJzLnJlYWQnXTtcbiAgICAgICAgdGhpcy5mb3JjZUxvZ2luID0gZmFsc2U7XG4gICAgICAgIHRoaXMuVE9LRU5TX0tFWSA9ICdjYXBnb19zb2NpYWxfbG9naW5fdHdpdHRlcl90b2tlbnNfdjEnO1xuICAgICAgICB0aGlzLlNUQVRFX1BSRUZJWCA9ICdjYXBnb19zb2NpYWxfbG9naW5fdHdpdHRlcl9zdGF0ZV8nO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplKGNsaWVudElkLCByZWRpcmVjdFVybCwgZGVmYXVsdFNjb3BlcywgZm9yY2VMb2dpbiwgYXVkaWVuY2UpIHtcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xuICAgICAgICB0aGlzLnJlZGlyZWN0VXJsID0gcmVkaXJlY3RVcmwgIT09IG51bGwgJiYgcmVkaXJlY3RVcmwgIT09IHZvaWQgMCA/IHJlZGlyZWN0VXJsIDogbnVsbDtcbiAgICAgICAgaWYgKGRlZmF1bHRTY29wZXMgPT09IG51bGwgfHwgZGVmYXVsdFNjb3BlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVmYXVsdFNjb3Blcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNjb3BlcyA9IGRlZmF1bHRTY29wZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JjZUxvZ2luID0gZm9yY2VMb2dpbiAhPT0gbnVsbCAmJiBmb3JjZUxvZ2luICE9PSB2b2lkIDAgPyBmb3JjZUxvZ2luIDogZmFsc2U7XG4gICAgICAgIHRoaXMuYXVkaWVuY2UgPSBhdWRpZW5jZSAhPT0gbnVsbCAmJiBhdWRpZW5jZSAhPT0gdm9pZCAwID8gYXVkaWVuY2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGFzeW5jIGxvZ2luKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgIGlmICghdGhpcy5jbGllbnRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUd2l0dGVyIENsaWVudCBJRCBub3QgY29uZmlndXJlZC4gQ2FsbCBpbml0aWFsaXplKCkgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVkaXJlY3RVcmkgPSAoX2IgPSAoX2EgPSBvcHRpb25zLnJlZGlyZWN0VXJsKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLnJlZGlyZWN0VXJsKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICBjb25zdCBzY29wZXMgPSAoKF9jID0gb3B0aW9ucy5zY29wZXMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5sZW5ndGgpID8gb3B0aW9ucy5zY29wZXMgOiB0aGlzLmRlZmF1bHRTY29wZXM7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gKF9kID0gb3B0aW9ucy5zdGF0ZSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogdGhpcy5nZW5lcmF0ZVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IGNvZGVWZXJpZmllciA9IChfZSA9IG9wdGlvbnMuY29kZVZlcmlmaWVyKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiB0aGlzLmdlbmVyYXRlQ29kZVZlcmlmaWVyKCk7XG4gICAgICAgIGNvbnN0IGNvZGVDaGFsbGVuZ2UgPSBhd2FpdCB0aGlzLmdlbmVyYXRlQ29kZUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpO1xuICAgICAgICB0aGlzLnBlcnNpc3RQZW5kaW5nTG9naW4oc3RhdGUsIHtcbiAgICAgICAgICAgIGNvZGVWZXJpZmllcixcbiAgICAgICAgICAgIHJlZGlyZWN0VXJpLFxuICAgICAgICAgICAgc2NvcGVzLFxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQmFzZVNvY2lhbExvZ2luLk9BVVRIX1NUQVRFX0tFWSwgSlNPTi5zdHJpbmdpZnkoeyBwcm92aWRlcjogJ3R3aXR0ZXInLCBzdGF0ZSB9KSk7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgcmVzcG9uc2VfdHlwZTogJ2NvZGUnLFxuICAgICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVyaSxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZXMuam9pbignICcpLFxuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSxcbiAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogJ1MyNTYnLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCgoX2YgPSBvcHRpb25zLmZvcmNlTG9naW4pICE9PSBudWxsICYmIF9mICE9PSB2b2lkIDAgPyBfZiA6IHRoaXMuZm9yY2VMb2dpbikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBhcmFtcy5zZXQoJ2ZvcmNlX2xvZ2luJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdWRpZW5jZSkge1xuICAgICAgICAgICAgcGFyYW1zLnNldCgnYXVkaWVuY2UnLCB0aGlzLmF1ZGllbmNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhdXRoVXJsID0gYGh0dHBzOi8veC5jb20vaS9vYXV0aDIvYXV0aG9yaXplPyR7cGFyYW1zLnRvU3RyaW5nKCl9YDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSA1MDA7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDY1MDtcbiAgICAgICAgY29uc3QgbGVmdCA9IHdpbmRvdy5zY3JlZW5YICsgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICAgICAgY29uc3QgdG9wID0gd2luZG93LnNjcmVlblkgKyAod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gd2luZG93Lm9wZW4oYXV0aFVybCwgJ1hMb2dpbicsIGB3aWR0aD0ke3dpZHRofSxoZWlnaHQ9JHtoZWlnaHR9LGxlZnQ9JHtsZWZ0fSx0b3A9JHt0b3B9LHBvcHVwPTFgKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghcG9wdXApIHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdVbmFibGUgdG8gb3BlbiBsb2dpbiB3aW5kb3cuIFBsZWFzZSBhbGxvdyBwb3B1cHMuJykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNsZWFudXAgPSAobWVzc2FnZUhhbmRsZXIsIHRpbWVvdXRIYW5kbGUsIGludGVydmFsSGFuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtZXNzYWdlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGV2ZW50LmRhdGEpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50eXBlKSA9PT0gJ29hdXRoLXJlc3BvbnNlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGV2ZW50LmRhdGEpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wcm92aWRlcikgJiYgZXZlbnQuZGF0YS5wcm92aWRlciAhPT0gJ3R3aXR0ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cChtZXNzYWdlSGFuZGxlciwgdGltZW91dEhhbmRsZSwgcG9wdXBDbG9zZWRJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgX2UgPSBldmVudC5kYXRhLCB7IHByb3ZpZGVyOiBfaWdub3JlZFByb3ZpZGVyIH0gPSBfZSwgcGF5bG9hZCA9IF9fcmVzdChfZSwgW1wicHJvdmlkZXJcIl0pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiAndHdpdHRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgoKF9jID0gZXZlbnQuZGF0YSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnR5cGUpID09PSAnb2F1dGgtZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKF9kID0gZXZlbnQuZGF0YSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnByb3ZpZGVyKSAmJiBldmVudC5kYXRhLnByb3ZpZGVyICE9PSAndHdpdHRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKG1lc3NhZ2VIYW5kbGVyLCB0aW1lb3V0SGFuZGxlLCBwb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihldmVudC5kYXRhLmVycm9yIHx8ICdUd2l0dGVyIGxvZ2luIHdhcyBjYW5jZWxsZWQuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1lc3NhZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtZXNzYWdlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgcG9wdXAuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUd2l0dGVyIGxvZ2luIHRpbWVkIG91dC4nKSk7XG4gICAgICAgICAgICB9LCAzMDAwMDApO1xuICAgICAgICAgICAgY29uc3QgcG9wdXBDbG9zZWRJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1lc3NhZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwb3B1cENsb3NlZEludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdUd2l0dGVyIGxvZ2luIHdpbmRvdyB3YXMgY2xvc2VkLicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGxvZ291dCgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5UT0tFTlNfS0VZKTtcbiAgICB9XG4gICAgYXN5bmMgaXNMb2dnZWRJbigpIHtcbiAgICAgICAgY29uc3QgdG9rZW5zID0gdGhpcy5nZXRTdG9yZWRUb2tlbnMoKTtcbiAgICAgICAgaWYgKCF0b2tlbnMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGlzTG9nZ2VkSW46IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IHRva2Vucy5leHBpcmVzQXQgPiBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuVE9LRU5TX0tFWSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaXNMb2dnZWRJbjogaXNWYWxpZCB9O1xuICAgIH1cbiAgICBhc3luYyBnZXRBdXRob3JpemF0aW9uQ29kZSgpIHtcbiAgICAgICAgY29uc3QgdG9rZW5zID0gdGhpcy5nZXRTdG9yZWRUb2tlbnMoKTtcbiAgICAgICAgaWYgKCF0b2tlbnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHdpdHRlciBhY2Nlc3MgdG9rZW4gaXMgbm90IGF2YWlsYWJsZS4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjZXNzVG9rZW46IHRva2Vucy5hY2Nlc3NUb2tlbixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgY29uc3QgdG9rZW5zID0gdGhpcy5nZXRTdG9yZWRUb2tlbnMoKTtcbiAgICAgICAgaWYgKCEodG9rZW5zID09PSBudWxsIHx8IHRva2VucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdG9rZW5zLnJlZnJlc2hUb2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gVHdpdHRlciByZWZyZXNoIHRva2VuIGlzIGF2YWlsYWJsZS4gSW5jbHVkZSBvZmZsaW5lLmFjY2VzcyBzY29wZSB0byByZWNlaXZlIG9uZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2hXaXRoUmVmcmVzaFRva2VuKHRva2Vucy5yZWZyZXNoVG9rZW4pO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVPQXV0aFJlZGlyZWN0KHVybCwgZXhwZWN0ZWRTdGF0ZSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xuICAgICAgICBjb25zdCBzdGF0ZUZyb21VcmwgPSBleHBlY3RlZFN0YXRlICE9PSBudWxsICYmIGV4cGVjdGVkU3RhdGUgIT09IHZvaWQgMCA/IGV4cGVjdGVkU3RhdGUgOiBwYXJhbXMuZ2V0KCdzdGF0ZScpO1xuICAgICAgICBpZiAoIXN0YXRlRnJvbVVybCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGVuZGluZyA9IHRoaXMuY29uc3VtZVBlbmRpbmdMb2dpbihzdGF0ZUZyb21VcmwpO1xuICAgICAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6ICdUd2l0dGVyIGxvZ2luIHNlc3Npb24gZXhwaXJlZCBvciBzdGF0ZSBtaXNtYXRjaC4nIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXJyb3IgPSBwYXJhbXMuZ2V0KCdlcnJvcicpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHBhcmFtcy5nZXQoJ2Vycm9yX2Rlc2NyaXB0aW9uJykgfHwgZXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2RlID0gcGFyYW1zLmdldCgnY29kZScpO1xuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6ICdUd2l0dGVyIGF1dGhvcml6YXRpb24gY29kZSBtaXNzaW5nIGZyb20gcmVkaXJlY3QuJyB9O1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCB0aGlzLmV4Y2hhbmdlQXV0aG9yaXphdGlvbkNvZGUoY29kZSwgcGVuZGluZyk7XG4gICAgICAgICAgICBjb25zdCBwcm9maWxlID0gYXdhaXQgdGhpcy5mZXRjaFByb2ZpbGUodG9rZW5zLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICBjb25zdCBleHBpcmVzQXQgPSBEYXRlLm5vdygpICsgdG9rZW5zLmV4cGlyZXNfaW4gKiAxMDAwO1xuICAgICAgICAgICAgY29uc3Qgc2NvcGVBcnJheSA9IHRva2Vucy5zY29wZS5zcGxpdCgnICcpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIHRoaXMucGVyc2lzdFRva2Vucyh7XG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IHRva2Vucy5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRva2VuOiB0b2tlbnMucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICBleHBpcmVzQXQsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlQXJyYXksXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlbnMudG9rZW5fdHlwZSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHByb2ZpbGUuaWQsXG4gICAgICAgICAgICAgICAgcHJvZmlsZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogJ3R3aXR0ZXInLFxuICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2Vucy5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlblR5cGU6IHRva2Vucy50b2tlbl90eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlczogbmV3IERhdGUoZXhwaXJlc0F0KS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBwcm9maWxlLmlkLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoVG9rZW46IHRva2Vucy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGVBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlbnMudG9rZW5fdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJlc0luOiB0b2tlbnMuZXhwaXJlc19pbixcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogZXJyLm1lc3NhZ2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiAnVHdpdHRlciBsb2dpbiBmYWlsZWQgdW5leHBlY3RlZGx5LicgfTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEJhc2VTb2NpYWxMb2dpbi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGV4Y2hhbmdlQXV0aG9yaXphdGlvbkNvZGUoY29kZSwgcGVuZGluZykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ2F1dGhvcml6YXRpb25fY29kZScsXG4gICAgICAgICAgICBjbGllbnRfaWQ6IChfYSA9IHRoaXMuY2xpZW50SWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnLFxuICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogcGVuZGluZy5yZWRpcmVjdFVyaSxcbiAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IHBlbmRpbmcuY29kZVZlcmlmaWVyLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkueC5jb20vMi9vYXV0aDIvdG9rZW4nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogcGFyYW1zLnRvU3RyaW5nKCksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUd2l0dGVyIHRva2VuIGV4Y2hhbmdlIGZhaWxlZCAoJHtyZXNwb25zZS5zdGF0dXN9KTogJHt0ZXh0fWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcbiAgICB9XG4gICAgYXN5bmMgcmVmcmVzaFdpdGhSZWZyZXNoVG9rZW4ocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxuICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgY2xpZW50X2lkOiAoX2EgPSB0aGlzLmNsaWVudElkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLnguY29tLzIvb2F1dGgyL3Rva2VuJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IHBhcmFtcy50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVHdpdHRlciByZWZyZXNoIGZhaWxlZCAoJHtyZXNwb25zZS5zdGF0dXN9KTogJHt0ZXh0fWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRva2VucyA9IChhd2FpdCByZXNwb25zZS5qc29uKCkpO1xuICAgICAgICBjb25zdCBwcm9maWxlID0gYXdhaXQgdGhpcy5mZXRjaFByb2ZpbGUodG9rZW5zLmFjY2Vzc190b2tlbik7XG4gICAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IERhdGUubm93KCkgKyB0b2tlbnMuZXhwaXJlc19pbiAqIDEwMDA7XG4gICAgICAgIGNvbnN0IHNjb3BlQXJyYXkgPSB0b2tlbnMuc2NvcGUuc3BsaXQoJyAnKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgIHRoaXMucGVyc2lzdFRva2Vucyh7XG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogdG9rZW5zLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgIHJlZnJlc2hUb2tlbjogKF9iID0gdG9rZW5zLnJlZnJlc2hfdG9rZW4pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgIGV4cGlyZXNBdCxcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZUFycmF5LFxuICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlbnMudG9rZW5fdHlwZSxcbiAgICAgICAgICAgIHVzZXJJZDogcHJvZmlsZS5pZCxcbiAgICAgICAgICAgIHByb2ZpbGUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBmZXRjaFByb2ZpbGUoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBbJ3Byb2ZpbGVfaW1hZ2VfdXJsJywgJ3ZlcmlmaWVkJywgJ25hbWUnLCAndXNlcm5hbWUnXTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkueC5jb20vMi91c2Vycy9tZT91c2VyLmZpZWxkcz0ke2ZpZWxkcy5qb2luKCcsJyl9YCwge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmZXRjaCBUd2l0dGVyIHByb2ZpbGUgKCR7cmVzcG9uc2Uuc3RhdHVzfSk6ICR7dGV4dH1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXlsb2FkID0gKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICAgIGlmICghcGF5bG9hZC5kYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R3aXR0ZXIgcHJvZmlsZSBwYXlsb2FkIGlzIG1pc3NpbmcgZGF0YS4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IHBheWxvYWQuZGF0YS5pZCxcbiAgICAgICAgICAgIHVzZXJuYW1lOiBwYXlsb2FkLmRhdGEudXNlcm5hbWUsXG4gICAgICAgICAgICBuYW1lOiAoX2EgPSBwYXlsb2FkLmRhdGEubmFtZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogbnVsbCxcbiAgICAgICAgICAgIHByb2ZpbGVJbWFnZVVybDogKF9iID0gcGF5bG9hZC5kYXRhLnByb2ZpbGVfaW1hZ2VfdXJsKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsLFxuICAgICAgICAgICAgdmVyaWZpZWQ6IChfYyA9IHBheWxvYWQuZGF0YS52ZXJpZmllZCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogZmFsc2UsXG4gICAgICAgICAgICBlbWFpbDogKF9kID0gcGF5bG9hZC5kYXRhLmVtYWlsKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBwZXJzaXN0VG9rZW5zKHRva2Vucykge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLlRPS0VOU19LRVksIEpTT04uc3RyaW5naWZ5KHRva2VucykpO1xuICAgIH1cbiAgICBnZXRTdG9yZWRUb2tlbnMoKSB7XG4gICAgICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuVE9LRU5TX0tFWSk7XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBzdG9yZWQgVHdpdHRlciB0b2tlbnMnLCBlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGVyc2lzdFBlbmRpbmdMb2dpbihzdGF0ZSwgcGF5bG9hZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHt0aGlzLlNUQVRFX1BSRUZJWH0ke3N0YXRlfWAsIEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICB9XG4gICAgY29uc3VtZVBlbmRpbmdMb2dpbihzdGF0ZSkge1xuICAgICAgICBjb25zdCBrZXkgPSBgJHt0aGlzLlNUQVRFX1BSRUZJWH0ke3N0YXRlfWA7XG4gICAgICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBwYXJzZSBwZW5kaW5nIFR3aXR0ZXIgbG9naW4gcGF5bG9hZCcsIGVycik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5lcmF0ZVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gWy4uLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTYpKV0ubWFwKChiKSA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKS5qb2luKCcnKTtcbiAgICB9XG4gICAgZ2VuZXJhdGVDb2RlVmVyaWZpZXIoKSB7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoNjQpO1xuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycmF5KTtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oYXJyYXkpXG4gICAgICAgICAgICAubWFwKChiKSA9PiAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODktLl9+J1tiICUgNjZdKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbiAgICBhc3luYyBnZW5lcmF0ZUNvZGVDaGFsbGVuZ2UoY29kZVZlcmlmaWVyKSB7XG4gICAgICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGVuY29kZXIuZW5jb2RlKGNvZGVWZXJpZmllcik7XG4gICAgICAgIGNvbnN0IGRpZ2VzdCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmJhc2U2NFVybEVuY29kZShuZXcgVWludDhBcnJheShkaWdlc3QpKTtcbiAgICB9XG4gICAgYmFzZTY0VXJsRW5jb2RlKGJ1ZmZlcikge1xuICAgICAgICBsZXQgYmluYXJ5ID0gJyc7XG4gICAgICAgIGJ1ZmZlci5mb3JFYWNoKChiKSA9PiAoYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYikpKTtcbiAgICAgICAgcmV0dXJuIGJ0b2EoYmluYXJ5KS5yZXBsYWNlKC9cXCsvZywgJy0nKS5yZXBsYWNlKC9cXC8vZywgJ18nKS5yZXBsYWNlKC89KyQvLCAnJyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHdpdHRlci1wcm92aWRlci5qcy5tYXAiLCJpbXBvcnQgeyBXZWJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuaW1wb3J0IHsgQXBwbGVTb2NpYWxMb2dpbiB9IGZyb20gJy4vYXBwbGUtcHJvdmlkZXInO1xuaW1wb3J0IHsgRmFjZWJvb2tTb2NpYWxMb2dpbiB9IGZyb20gJy4vZmFjZWJvb2stcHJvdmlkZXInO1xuaW1wb3J0IHsgR29vZ2xlU29jaWFsTG9naW4gfSBmcm9tICcuL2dvb2dsZS1wcm92aWRlcic7XG5pbXBvcnQgeyBUd2l0dGVyU29jaWFsTG9naW4gfSBmcm9tICcuL3R3aXR0ZXItcHJvdmlkZXInO1xuZXhwb3J0IGNsYXNzIFNvY2lhbExvZ2luV2ViIGV4dGVuZHMgV2ViUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5nb29nbGVQcm92aWRlciA9IG5ldyBHb29nbGVTb2NpYWxMb2dpbigpO1xuICAgICAgICB0aGlzLmFwcGxlUHJvdmlkZXIgPSBuZXcgQXBwbGVTb2NpYWxMb2dpbigpO1xuICAgICAgICB0aGlzLmZhY2Vib29rUHJvdmlkZXIgPSBuZXcgRmFjZWJvb2tTb2NpYWxMb2dpbigpO1xuICAgICAgICB0aGlzLnR3aXR0ZXJQcm92aWRlciA9IG5ldyBUd2l0dGVyU29jaWFsTG9naW4oKTtcbiAgICAgICAgLy8gU2V0IHVwIGxpc3RlbmVyIGZvciBPQXV0aCByZWRpcmVjdHMgaWYgd2UgaGF2ZSBhIHBlbmRpbmcgT0F1dGggZmxvd1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oU29jaWFsTG9naW5XZWIuT0FVVEhfU1RBVEVfS0VZKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ09BVVRIX1NUQVRFX0tFWSBmb3VuZCcpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVPQXV0aFJlZGlyZWN0KCkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZpbmlzaCBPQXV0aCByZWRpcmVjdCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZU9BdXRoUmVkaXJlY3QoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgY29uc3Qgc3RhdGVSYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTb2NpYWxMb2dpbldlYi5PQVVUSF9TVEFURV9LRVkpO1xuICAgICAgICBsZXQgcHJvdmlkZXIgPSBudWxsO1xuICAgICAgICBsZXQgc3RhdGU7XG4gICAgICAgIGlmIChzdGF0ZVJhdykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHN0YXRlUmF3KTtcbiAgICAgICAgICAgICAgICBwcm92aWRlciA9IChfYSA9IHBhcnNlZC5wcm92aWRlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogbnVsbDtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHBhcnNlZC5zdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfZCkge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyID0gc3RhdGVSYXcgPT09ICd0cnVlJyA/ICdnb29nbGUnIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgc3dpdGNoIChwcm92aWRlcikge1xuICAgICAgICAgICAgY2FzZSAndHdpdHRlcic6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy50d2l0dGVyUHJvdmlkZXIuaGFuZGxlT0F1dGhSZWRpcmVjdCh1cmwsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2dvb2dsZSc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ29vZ2xlUHJvdmlkZXIuaGFuZGxlT0F1dGhSZWRpcmVjdCh1cmwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdlcnJvcicgaW4gcmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZFByb3ZpZGVyID0gcHJvdmlkZXIgIT09IG51bGwgJiYgcHJvdmlkZXIgIT09IHZvaWQgMCA/IHByb3ZpZGVyIDogbnVsbDtcbiAgICAgICAgICAgIChfYiA9IHdpbmRvdy5vcGVuZXIpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ29hdXRoLWVycm9yJyxcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogcmVzb2x2ZWRQcm92aWRlcixcbiAgICAgICAgICAgICAgICBlcnJvcjogcmVzdWx0LmVycm9yLFxuICAgICAgICAgICAgfSwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoX2MgPSB3aW5kb3cub3BlbmVyKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucG9zdE1lc3NhZ2UoT2JqZWN0LmFzc2lnbih7IHR5cGU6ICdvYXV0aC1yZXNwb25zZScsIHByb3ZpZGVyOiByZXN1bHQucHJvdmlkZXIgfSwgcmVzdWx0LnJlc3VsdCksIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH1cbiAgICBhc3luYyBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBjb25zdCBpbml0UHJvbWlzZXMgPSBbXTtcbiAgICAgICAgaWYgKChfYSA9IG9wdGlvbnMuZ29vZ2xlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eud2ViQ2xpZW50SWQpIHtcbiAgICAgICAgICAgIGluaXRQcm9taXNlcy5wdXNoKHRoaXMuZ29vZ2xlUHJvdmlkZXIuaW5pdGlhbGl6ZShvcHRpb25zLmdvb2dsZS53ZWJDbGllbnRJZCwgb3B0aW9ucy5nb29nbGUubW9kZSwgb3B0aW9ucy5nb29nbGUuaG9zdGVkRG9tYWluLCBvcHRpb25zLmdvb2dsZS5yZWRpcmVjdFVybCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoX2IgPSBvcHRpb25zLmFwcGxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2xpZW50SWQpIHtcbiAgICAgICAgICAgIGluaXRQcm9taXNlcy5wdXNoKHRoaXMuYXBwbGVQcm92aWRlci5pbml0aWFsaXplKG9wdGlvbnMuYXBwbGUuY2xpZW50SWQsIG9wdGlvbnMuYXBwbGUucmVkaXJlY3RVcmwsIG9wdGlvbnMuYXBwbGUudXNlUHJvcGVyVG9rZW5FeGNoYW5nZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoX2MgPSBvcHRpb25zLmZhY2Vib29rKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYXBwSWQpIHtcbiAgICAgICAgICAgIGluaXRQcm9taXNlcy5wdXNoKHRoaXMuZmFjZWJvb2tQcm92aWRlci5pbml0aWFsaXplKG9wdGlvbnMuZmFjZWJvb2suYXBwSWQsIG9wdGlvbnMuZmFjZWJvb2subG9jYWxlKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChfZCA9IG9wdGlvbnMudHdpdHRlcikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNsaWVudElkKSB7XG4gICAgICAgICAgICBpbml0UHJvbWlzZXMucHVzaCh0aGlzLnR3aXR0ZXJQcm92aWRlci5pbml0aWFsaXplKG9wdGlvbnMudHdpdHRlci5jbGllbnRJZCwgb3B0aW9ucy50d2l0dGVyLnJlZGlyZWN0VXJsLCBvcHRpb25zLnR3aXR0ZXIuZGVmYXVsdFNjb3Blcywgb3B0aW9ucy50d2l0dGVyLmZvcmNlTG9naW4sIG9wdGlvbnMudHdpdHRlci5hdWRpZW5jZSkpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGluaXRQcm9taXNlcyk7XG4gICAgfVxuICAgIGFzeW5jIGxvZ2luKG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChvcHRpb25zLnByb3ZpZGVyKSB7XG4gICAgICAgICAgICBjYXNlICdnb29nbGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZVByb3ZpZGVyLmxvZ2luKG9wdGlvbnMub3B0aW9ucyk7XG4gICAgICAgICAgICBjYXNlICdhcHBsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGVQcm92aWRlci5sb2dpbihvcHRpb25zLm9wdGlvbnMpO1xuICAgICAgICAgICAgY2FzZSAnZmFjZWJvb2snOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZhY2Vib29rUHJvdmlkZXIubG9naW4ob3B0aW9ucy5vcHRpb25zKTtcbiAgICAgICAgICAgIGNhc2UgJ3R3aXR0ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnR3aXR0ZXJQcm92aWRlci5sb2dpbihvcHRpb25zLm9wdGlvbnMpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvZ2luIGZvciAke29wdGlvbnMucHJvdmlkZXJ9IGlzIG5vdCBpbXBsZW1lbnRlZCBvbiB3ZWJgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBsb2dvdXQob3B0aW9ucykge1xuICAgICAgICBzd2l0Y2ggKG9wdGlvbnMucHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGNhc2UgJ2dvb2dsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ29vZ2xlUHJvdmlkZXIubG9nb3V0KCk7XG4gICAgICAgICAgICBjYXNlICdhcHBsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwbGVQcm92aWRlci5sb2dvdXQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2ZhY2Vib29rJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWNlYm9va1Byb3ZpZGVyLmxvZ291dCgpO1xuICAgICAgICAgICAgY2FzZSAndHdpdHRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHdpdHRlclByb3ZpZGVyLmxvZ291dCgpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvZ291dCBmb3IgJHtvcHRpb25zLnByb3ZpZGVyfSBpcyBub3QgaW1wbGVtZW50ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBpc0xvZ2dlZEluKG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChvcHRpb25zLnByb3ZpZGVyKSB7XG4gICAgICAgICAgICBjYXNlICdnb29nbGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZVByb3ZpZGVyLmlzTG9nZ2VkSW4oKTtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBsZVByb3ZpZGVyLmlzTG9nZ2VkSW4oKTtcbiAgICAgICAgICAgIGNhc2UgJ2ZhY2Vib29rJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWNlYm9va1Byb3ZpZGVyLmlzTG9nZ2VkSW4oKTtcbiAgICAgICAgICAgIGNhc2UgJ3R3aXR0ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnR3aXR0ZXJQcm92aWRlci5pc0xvZ2dlZEluKCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaXNMb2dnZWRJbiBmb3IgJHtvcHRpb25zLnByb3ZpZGVyfSBpcyBub3QgaW1wbGVtZW50ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRBdXRob3JpemF0aW9uQ29kZShvcHRpb25zKSB7XG4gICAgICAgIHN3aXRjaCAob3B0aW9ucy5wcm92aWRlcikge1xuICAgICAgICAgICAgY2FzZSAnZ29vZ2xlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nb29nbGVQcm92aWRlci5nZXRBdXRob3JpemF0aW9uQ29kZSgpO1xuICAgICAgICAgICAgY2FzZSAnYXBwbGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcGxlUHJvdmlkZXIuZ2V0QXV0aG9yaXphdGlvbkNvZGUoKTtcbiAgICAgICAgICAgIGNhc2UgJ2ZhY2Vib29rJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWNlYm9va1Byb3ZpZGVyLmdldEF1dGhvcml6YXRpb25Db2RlKCk7XG4gICAgICAgICAgICBjYXNlICd0d2l0dGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50d2l0dGVyUHJvdmlkZXIuZ2V0QXV0aG9yaXphdGlvbkNvZGUoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBnZXRBdXRob3JpemF0aW9uQ29kZSBmb3IgJHtvcHRpb25zLnByb3ZpZGVyfSBpcyBub3QgaW1wbGVtZW50ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyByZWZyZXNoKG9wdGlvbnMpIHtcbiAgICAgICAgc3dpdGNoIChvcHRpb25zLnByb3ZpZGVyKSB7XG4gICAgICAgICAgICBjYXNlICdnb29nbGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdvb2dsZVByb3ZpZGVyLnJlZnJlc2goKTtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcHBsZVByb3ZpZGVyLnJlZnJlc2goKTtcbiAgICAgICAgICAgIGNhc2UgJ2ZhY2Vib29rJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mYWNlYm9va1Byb3ZpZGVyLnJlZnJlc2gob3B0aW9ucy5vcHRpb25zKTtcbiAgICAgICAgICAgIGNhc2UgJ3R3aXR0ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnR3aXR0ZXJQcm92aWRlci5yZWZyZXNoKCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVmcmVzaCBmb3IgJHtvcHRpb25zLnByb3ZpZGVyfSBpcyBub3QgaW1wbGVtZW50ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBwcm92aWRlclNwZWNpZmljQ2FsbChvcHRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvdmlkZXIgc3BlY2lmaWMgY2FsbCBmb3IgJHtvcHRpb25zLmNhbGx9IGlzIG5vdCBpbXBsZW1lbnRlZGApO1xuICAgIH1cbiAgICBhc3luYyBnZXRQbHVnaW5WZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4geyB2ZXJzaW9uOiAnd2ViJyB9O1xuICAgIH1cbn1cblNvY2lhbExvZ2luV2ViLk9BVVRIX1NUQVRFX0tFWSA9ICdzb2NpYWxfbG9naW5fb2F1dGhfcGVuZGluZyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWIuanMubWFwIl0sIm5hbWVzIjpbIl9hIiwiX2IiLCJtZXNzYWdlSGFuZGxlciIsInRpbWVvdXRIYW5kbGUiLCJfYyIsIl9kIiwiX2UiXSwibWFwcGluZ3MiOiI7QUFDTyxNQUFNLHdCQUF3QixVQUFVO0FBQUEsRUFDM0MsY0FBYztBQUNWLFVBQUs7QUFBQSxFQUNUO0FBQUEsRUFDQSxTQUFTLE9BQU87QUFDWixVQUFNLFlBQVksTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3BDLFVBQU0sU0FBUyxVQUFVLFFBQVEsTUFBTSxHQUFHLEVBQUUsUUFBUSxNQUFNLEdBQUc7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
