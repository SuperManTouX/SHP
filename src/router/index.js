import Vue from "vue";
import VueRouter from "vue-router";
// 引入Vuex中的store
import store from "@/store";
import ElementUI from "element-ui";

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(ElementUI)
Vue.use(VueRouter);

// 路由器
let router = new VueRouter({
  routes: [
    {
      path: "/home",
      name: "Home",
      component: ()=>import('../pages/BaseHome'),
      meta: { NavIsShow: true, isHome: true },
    },
    {
      name: "Login",
      path: "/login",
      component: ()=>import('../pages/BaseLogin'),
    },
    {
      name: "Search",
      path: "/search",
      component: ()=>import('../pages/BaseSearch'),
    },
    {
      name: "Register",
      path: "/register",
      component: ()=>import('../pages/BaseRegister'),
    },
    {
      name: "Detail",
      path: "/detail/:goodId",
      props: true,
      component: ()=>import('../pages/BaseDetail'),
    },
    {
      name: "AddCart",
      path: "/addCart/:skuInfo/:skuNum",
      props: true,
      component: ()=>import('../pages/BaseAddCart'),
    },
    {
      name:'Cart',
      path: "/cart",
      props: true,
      component: ()=>import('../pages/BaseCart'),
    },
    {
      name:'Trade',
      path:'/trade',
      component:()=>import('../pages/BaseCartTrade')
    },
    {
      name:'Pay',
      path:'/pay',
      component:()=>import('../pages/BasePay'),
    },
    {
      name:'PaySuccess',
      path:'/paySuccess',
      component:()=>import('../pages/BasePaySuccess'),
    },
    {
      name:'Center',
      path:'/center',
      component:()=>import('../pages/BaseCenter'),
      children:[
        {
          path:'myOrder',
          component:()=>import('../pages/BaseCenter/GroupOrder')
        },
        {
          path:'groupOrder',
          component:()=>import('../pages/BaseCenter/MyOrder')
        },
        {
          path:'/center',
          redirect:'/center/myOrder'
        }
      ]
    },

    {
      path: "/",
      redirect: "/home",
    },
  ],
  // 跳转路由后自动滑到顶部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
  let userAccount = JSON.parse(localStorage.getItem("userAccount"))
  let name = store.state.loginOptions.userInfo.name;
  // 登录状态下
  if (userAccount) {
    // 登录状态下再去登录页面
    if (to.path == "/login") {
      alert("你还想再登录一遍？");
      next("/home");
    } else {
      // 登录状态下去非登录页面
      // 没有用户数据
      if (!name) {
        // 获得用户账户数据
        console.log('获得用户账户数据');
        let userAccount =JSON.parse(localStorage.getItem('userAccount'))
        store.dispatch("loginOptions/GetLogin",userAccount).then(res=>{
          store.dispatch("loginOptions/GetUserInfo");
        })
        next();
      }else{
        // 有用户数据
        console.log('未获取用户账户数据',name);
        next();
      }
    }
  } else {
    // 游客状态下
    if(to.path == '/center/myOrder'||to.path == '/cart'){
      ElementUI.Message('你需要登录')
    }else {
      next();

    }
  }
});

export default router;
