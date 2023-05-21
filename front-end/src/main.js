import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import VueMask from "v-mask";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueMask);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
