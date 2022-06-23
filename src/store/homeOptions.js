// 在api文件中引入接口函数
import { reqGetBannerList, reqGetBaseCategoryList,reqGetFloorList } from "../api";

const actions = {
  // 获取三级列表的数据
  async GetCategoryList({ commit, state }) {
    // 如果已经获取过 categoryList 就不再获取
    if (state.categoryList.length !== 0) return;
    // Ajax 获取 categoryList
    const result = await reqGetBaseCategoryList();
    if (result.code === 200) {
      commit("CATEGORYList", result.data);
    }
  },
  // 获取轮播图数据
  async GetBannerList({commit}) {
    const result = await reqGetBannerList();
    if(result.code === 200)commit('BANNERLIST',result.data)
  },
  // 获取楼层数据
  async GetFloorList({commit}){
    const result  = await reqGetFloorList()
    if(result.code === 200)commit('FLOORLIST',result.data)
  },
  
};

const mutations = {
  // 保存三级列表数据
  CATEGORYList(state, categoryList) {
    return (state.categoryList = categoryList.splice(0, 15));
  },
  // 保存首页轮播图数据
  BANNERLIST(state, bannerList){
 return (state.bannerList = bannerList)
  },
  //保存楼层数据
  FLOORLIST(state, floorList){
 return (state.floorList = floorList)
  },
};

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
