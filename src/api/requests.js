// 引入 axios
import axios from "axios";
// 引入 nprogress 进度条及其样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 引入 游客的临时id
import getUuid from "../utils/uuid_token";
//引入Vuex 的store
import store from "@/store";

// 创建一个 axios 实例 （目的在于简化操作
const requests = new axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 添加请求拦截器
requests.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    if (localStorage.getItem("userAccount")) {
      //  如果自动登录勾选过 将 用户 身份的token加入标头
      let userAccount = JSON.parse(localStorage.getItem("userAccount"))
      config.headers.token = userAccount.token;
    } else if(store.state.loginOptions.userToken){
      //  如果自动登录没有勾选过 将 用户 身份的token加入标头
      config.headers.token = store.state.loginOptions.userToken;
    }else {
      // 将 游客 身份的token加入标头
      config.headers.userTempId = getUuid();
    }

    // 加载进度条开始
    nprogress.start();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
requests.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    // 加载进度条结束
    nprogress.done();
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default requests;
