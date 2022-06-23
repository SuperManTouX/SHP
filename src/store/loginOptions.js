import router from "@/router";
import { reqUserLogin, reqUserLogout, reqGetUserInfo } from "../api";

const actions = {
  // 登录
  async GetLogin({ commit }, userAccount) {
    let result = await reqUserLogin(userAccount);
    if (result.code == 200) {
    //   如果勾选了自动登录
      if (userAccount.isAutoLogin == true) {
        userAccount.token = result.data.token
        localStorage.setItem("userAccount", JSON.stringify(userAccount));
      } else {
        commit("GETLOGIN", result.data.token);
      }
    } else {
      return 'no'
    }
  },
  // 退出登录
  async GetLogout({ commit }) {
    let result = await reqUserLogout();
    if (result.code == 200) {
      commit("GETLOGOUT");
    } else {
      alert(result.message);
    }
  },
  //获取用户信息
  async GetUserInfo({ commit }) {
    let result = await reqGetUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
    }
  },
};
const mutations = {
  // 登录
  GETLOGIN(state, userToken) {
    return (state.userToken = userToken);
  },
  // 退出登录
  GETLOGOUT(state) {
    localStorage.removeItem('userAccount')
    return (state.userInfo = {});
  },
  // 获取用户账户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
};
const state = {
  // 用户通行证（token）
  userToken: "",
  // 用户信息
  userInfo: {},
};
const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
