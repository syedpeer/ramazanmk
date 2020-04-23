import Vue from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/sq";
import "dayjs/locale/mk";
import "dayjs/locale/tr";
import i18n from "./i18n";
import "@/assets/css/style.css";

Vue.prototype.$dayjs = dayjs;

window.GSheetReader = require("g-sheets-api");
Vue.component("icon", () => import("./components/Icon.vue"));

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
