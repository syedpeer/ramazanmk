import Vue from "vue";
import App from "./App.vue";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import 'dayjs/locale/sq';
import 'dayjs/locale/mk';
import 'dayjs/locale/tr';
import i18n from './i18n';
import "@/assets/css/style.css";
import Icon from "./components/Icon";
import './registerServiceWorker'

Vue.prototype.$dayjs = dayjs;

Vue.component("icon", Icon);

Vue.config.productionTip = false;

new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
