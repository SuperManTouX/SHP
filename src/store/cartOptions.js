import {
  reqGetCartList,
  reqAddCartList,
  reqCheckCart,
  reqDeleteCart,
} from "../api";

const actions = {
  // 获取购物车列表
  async GetCartList({ commit }) {
    console.log("全选刷新");
    let result = await reqGetCartList();
    // 如果请求成功
    if (result.code == 200 ) {
      if (result.data.length == 0) {
        // 购物车没有数据，传空数组
        commit("GETCARLIST", []);
      }else{
        // 购物车有数据，传数据
        commit("GETCARLIST", result.data[0].cartInfoList);

      }
    }
  },
  //  添加到购物车中
  async AddCartList({ commit }, addParams) {
    let result = await reqAddCartList(addParams);
    if (result.code == 200) {
      return "ok";
    }
  },
  // 切换单个商品选中状态
  async CheckCart({ commit }, checkParams) {
    let result = await reqCheckCart(checkParams);
  },
  // 切换全部商品选中状态
  CheckAllCart({ dispatch, state }, val) {
    // promise数组
    const promiseAll = [];
    // 发送请求
    state.cartInfoList.forEach((cartItem) => {
      let checkParams = {};
      // 如果勾选，就全部勾选 反之
      if (val == true) {
        checkParams = { skuID: cartItem.skuId, isChecked: "1" };
      } else {
        checkParams = { skuID: cartItem.skuId, isChecked: "0" };
      }
      let promise = dispatch("CheckCart", checkParams);
      promiseAll.push(promise);
    });
    // 等待请求全部完成
    return Promise.all(promiseAll);
  },
  // 删除商品
  async DeleteCart({ commit, dispatch }, skuId) {
    let result = await reqDeleteCart(skuId);
    // 如果删完了，就刷新面板
    if (result.code == 200) {
      return "ok";
    }
  },
  // 删除选中的商品
  DeleteAllCheckedCart({ commit, dispatch }) {
    let promiseAll = [];
    state.cartInfoList.forEach((cartItem) => {
      if (cartItem.isChecked == 1) {
        let promise = dispatch("DeleteCart", cartItem.skuId);
        promiseAll.push(promise);
      }
    });
    // 等待所有请求响应
    return Promise.all(promiseAll);
  },
};

const mutations = {
  //将购物车列表保存
  GETCARLIST(state, cartInfoList) {
    state.cartInfoList = cartInfoList;
  },
};
const state = {
  cartInfoList: [],
};
const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
