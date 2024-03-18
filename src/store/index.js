//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
import menus from "./modules/menus";

//应用Vuex插件
Vue.use(Vuex);
//准备actions对象——响应组件中用户的动作
const actions = {};
//准备mutations对象——修改state中的数据
const mutations = {
  menuCollapse(state) {
    state.isCollapse = !state.isCollapse;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    localStorage.setItem("token", token);
  },
};
//准备state对象——保存具体的数据
const state = {
  isCollapse: false,
  token: "",
};
const modules = {
  menus,
};
//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  modules,
});
