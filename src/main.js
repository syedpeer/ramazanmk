import Vue from "vue";
import App from "./App.vue";
import dayjs from 'dayjs';
import 'dayjs/locale/sq';
import "@/assets/css/style.css";

Vue.prototype.$dayjs = dayjs;

window.GSheetReader = require("g-sheets-api");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
