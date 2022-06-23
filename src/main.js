import Vue from "vue";
import App from "./App.vue";
// 引入 less
import less from "less";
import router from "./router";
// 引入三级列表
import TypeNav from "./components/TypeNav";
// 引入轮播图
import SwiperCarousel from "./components/SwiperCarousel";
// 引入 Store
import store from "./store";
// 引入mock
import "./mock/mockServer";
// 引入lodash
import _ from "lodash";
// 引入图标库
import "bootstrap-icons/font/bootstrap-icons.css"
// 引入Element-Ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入api
import * as API from './api'
// 引入Swiper样式
import "swiper/css/swiper.css";
//引入图片懒加载 
import VueLazyload from 'vue-lazyload'

// 测试区域

// 取消生产提示
Vue.config.productionTip = false;

// 注册三级列表的全局组件
Vue.component("TypeNav", TypeNav);
// 注册横向轮播图的全局组件
Vue.component("SwiperCarousel", SwiperCarousel);


// 使用less插件
Vue.use(less);
// 使用ElementUI插件
Vue.use(ElementUI);
// 配置懒加载
import lazyLoad from './assets/lazyLoad.jpg'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  loading: lazyLoad,
})


// 将集中式接口管理挂载到vue原型对象上
Vue.prototype.$API = API

new Vue({ 
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
