import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/style.css";

window.GSheetReader = require("g-sheets-api");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
