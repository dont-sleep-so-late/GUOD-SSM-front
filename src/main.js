import Vue from "vue";
import App from "./App";
//element-UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import axios from "@/utils/request";
import router from "./router";
import "./style/base.css";
import store from "@/store/index";
import globalWebSocket from "./global";
import global from "./globalFun";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$globalWebSocket = globalWebSocket; //全局消息订阅

Vue.use(ElementUI);

//创建vm
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
  store,
});
