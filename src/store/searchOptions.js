import { reqGetSearchList } from "../api";

const actions = {
  // 获得搜索数据
  async GetSearchList({ commit }, searchParams = {}) {
    const result = await reqGetSearchList(searchParams);
    if (result.code == 200) {
      // 传递搜索数据和分页器数据
      commit("GETSEARCHLIST", {
        searchList: result.data,
        pageNo: searchParams.pageNo,
      });
    }
  },
};

const mutations = {
  // 保存搜索数据 处理分页器展示的内容
  GETSEARCHLIST(state, dataObj) {
    // !根据分页器的页数，截取数组 slice（0,3）不包含 3
    state.searchList = dataObj.searchList;
     (state.searchList.goodsList = state.searchList.goodsList.slice(
      (dataObj.pageNo - 1) * 10,
      dataObj.pageNo * 10
    ));

  },
};
const state = {
  // 搜索数据保存处
  searchList: {},
};
const getters = {
  // 商品列表
  goodsList(state) {
    return state.searchList.goodsList;
  },
  // 品牌列表
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  // 属性列表
  attrsList(state) {
    return state.searchList.attrsList;
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
