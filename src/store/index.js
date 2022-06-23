import Vuex from "vuex";
import Vue from "vue";

// 使用 Vuex插件
Vue.use(Vuex);

// 引入小仓库
import  homeOptions  from "./homeOptions";
import  searchOptions  from "./searchOptions";
import  registerOptions  from "./registerOptions";
import  loginOptions  from "./loginOptions";
import  detailOptions  from "./detailOptions";
import  cartOptions  from "./cartOptions";
import  tradeOptions  from "./tradeOptions";

// 暴露一个 Store 实例对象
export default new Vuex.Store({
  modules:{
    homeOptions,
    searchOptions,
    registerOptions,
    loginOptions,
    detailOptions,
    cartOptions,
    tradeOptions,
  }
});
