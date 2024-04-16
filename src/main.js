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

//导入markdown
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$globalWebSocket = globalWebSocket; //全局消息订阅

Vue.use(ElementUI);

Vue.use(VMdEditor);

//创建vm
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
  store,
});
