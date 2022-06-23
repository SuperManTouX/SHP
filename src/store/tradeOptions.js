import router from "@/router";
import { reqGetTradeInfo, reqSubmitOrder } from "../api";

const actions = {
  // 获取订单交易页信息
  async GetTradeInfo({ commit }) {
    let result = await reqGetTradeInfo();
    if (result.code == 200) {
      // 元数据
      let userTradeInfo = result.data;
      // 默认地址
      let userDefaultAddress = JSON.parse(
        localStorage.getItem("defaultAddress")
      );
      // 给地址添加是否选择的属性
      userTradeInfo.userAddressList.forEach((item) => {
        item.isSelected = false;
      });
      // 给默认地址默认选中
      userTradeInfo.userAddressList.forEach((item) => {
        // 如果所有地址中有地址与默认地址相同
        if (item.fullAddress == userDefaultAddress.fullAddress) {
          item.isSelected = true;
        }
      });
      commit("GETTRADEINFO", userTradeInfo, userDefaultAddress);
    }
  },
  // 提交订单
  async SubmitOrder({ commit }, submitParams) {
    let result = await reqSubmitOrder(submitParams);
    if (result.code == 200) {
      commit("SAVEORDERID", result.data);
    } else {
      alert(result.message);
    }
  },
};
const mutations = {
  // 保存订单信息
  GETTRADEINFO(state, userTradeInfo, userDefaultAddress) {
    state.userTradeInfo = userTradeInfo;
    state.userDefaultAddress = userDefaultAddress;
  },
  //   保存订单ID
  SAVEORDERID(state, orderId) {
    state.orderId = orderId;
    // 跳转路由
    router.push({
      name: "Pay",
      query: {
        orderId: state.orderId,
      },
    });
  },
};
const state = {
  // 用户信息
  userTradeInfo: {},
  //   收货地址
  userDefaultAddress: "",
  //   订单ID
  orderId: "",
};
const getters = {
  // 收货地址数据
  userAddressList(state) {
    return state.userTradeInfo.userAddressList || [];
  },
  // 代付款订单数据
  detailArrayList(state) {
    return state.userTradeInfo.detailArrayList || [];
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
