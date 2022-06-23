// 对接口进行集中式管理
// 引入axios二次封装
import requests from "./requests";
// 引入 Mock 接口二次封装
import mockRequests from "./mockRequests";
// 获取三级列表的数据
export const reqGetBaseCategoryList = () => {
  return requests({
    //  因为配置了代理服务器，并且axios二次封装过BaseURL
    // 所以不需要写 http://gmall-h5-api.atguigu.cn 和 /api
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};
// 获取首页轮播图的数据 （假数据
export const reqGetBannerList = () => {
  return mockRequests({
    // 因为配置了 BaseURl ：'/mock' 所以不需要写
    url: "/banner",
    method: "get",
  });
};
// 获取楼层数据 （假数据
export const reqGetFloorList = () => {
  return mockRequests({
    // 因为配置了 BaseURl ：'/mock' 所以不需要写
    url: "/floor",
    method: "get",
  });
};
// 获取搜索数据
export const reqGetSearchList = (searchParams) => {
  return requests({
    url: "/list",
    method: "post",
    data: searchParams,
  });
};
// 商品详情的数据
export const reqGetGoodItem = (goodId) => {
  return requests({
    url: `/item/${goodId}`,
    method: "get",
  });
};
// 获取购物车数据
export const reqGetCartList = () => {
  return requests({
    url: `/cart/cartList`,
    method: "get",
  });
};
//添加到购物车中
export const reqAddCartList = (addParams) => {
  return requests({
    url: `/cart/addToCart/${addParams.skuId}/${addParams.skuNum}`,
    method: "post",
  });
};

// 切换商品选中状态
export const reqCheckCart = (checkParams) => {
  return requests({
    url: `/cart/checkCart/${checkParams.skuID}/${checkParams.isChecked}`,
    method: "get",
  });
};

// 删除商品状态
export const reqDeleteCart = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};


// 获取验证码的数据
export const reqSendPhoneCode = (phone) => {
  return requests({
    //! get请求传参方法
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};
// 完成注册
export const reqCreateAccount = (userData) => {
  return requests({
    url: "/user/passport/register",
    method: "post",
    data: userData,
  });
};

// 登录
export const reqUserLogin = (userAccount) => {
  return requests({
    url: "/user/passport/login",
    method: "post",
    data: userAccount,
  });
};
// 退出登录
export const reqUserLogout = () => {
  return requests({
    url: "/user/passport/logout",
    method: "get",
  });
};
// 获取用户信息
export const reqGetUserInfo= () => {
  return requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
};
 //获取订单交易页信息
 export const reqGetTradeInfo = ()=>{
  return requests({
    url:'/order/auth/trade',
    method:'get'
  })
 }
//  提交订单 
export const reqSubmitOrder = (submitParams)=>{
  return requests({
    url:`/order/auth/submitOrder?tradeNo=${submitParams.traderNo}`,
    method:'post',
    data:submitParams,
  })
}
// 获取订单支付信息
export const reqCreateNative = (orderId)=>{
  return requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get',
  })
}
// 获取订单支付状态
export const reqGetPayStatus = (orderId)=>{
  return requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get',
  })
}
// 获取我的订单列表
export const reqGetMyOrderList = (page,limit)=>{
  return requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get',
  })
}