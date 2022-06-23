import { reqSendPhoneCode } from "../api";

const actions = {
  // 请求验证码
  async GetSendCode({ commit },phone) {
    let result = await reqSendPhoneCode(phone);
    if (result.code == 200) {
      return commit("GETSENDCODE", result.data);
    }
  },
};
const mutations = {
  GETSENDCODE(state, serveCode) {
    state.serveCode = serveCode;
  },
};
const state = {
  serveCode: "",
};
const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
