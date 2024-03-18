import Vue from "vue";
import App from "./App";
//element-UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "@/utils/request";
import router from "./router";
import "./style/base.css";
import store from "@/store/index";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

//创建vm
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
  store,
});
