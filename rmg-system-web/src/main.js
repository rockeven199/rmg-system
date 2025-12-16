import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
import VueCookies from "vue-cookies";
import router from "./router/routers";
import autoInstallComponent from "./utils/loader";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import addr from "./utils/config";
import { requestData } from "./utils/requestData";
import { getTotalCount } from "./utils/getTotalCount";
import setupLocatorUI from "@locator/runtime";
import "animate.css";
import store from "./store/global_store";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI({
    adapter: "vue",
  });
}

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.addr = addr;
app.config.globalProperties.axios = axios;
app.config.globalProperties.g_reqData = requestData;
app.config.globalProperties.g_getCount = getTotalCount;
app.config.globalProperties.g_checkLogin = function () {
  // if (this.$cookies.get("token") == null) {
  //   this.$router.push("/");
  // }
};
app.use(router);
app.use(store);
app.use(autoInstallComponent);
app.use(ElementPlus);
app.use(VueCookies);
app.mount("#app");
