import { reqGetGoodItem } from "../api";

const actions = {
    // 商品详情的数据
    async GetGoodItem({commit},goodId){
        let result = await reqGetGoodItem(goodId);
        if(result.code == 200){
            commit('GETGOODITEM',result.data)
        }else{
            alert(result.message)
        }
    }
};
const mutations = {
    GETGOODITEM(state,detailData){
        state.detailData = detailData
    }
};
const state = {
    detailData:{}
};
const getters = {
    // 商品导航
    categoryView(state){
        // 假报错原因 ： 在服务器数据没有回来之前 detailData 是空对象。空对象中 打. 是undefined 。undefined 打. 会报错
        return state.detailData.categoryView||{}
    },
    // 商品详细信息
    skuInfo(state){
        return state.detailData.skuInfo||{}
    },
    skuImageList(state){
        return state.detailData.skuInfo.skuImageList
    },
    // 商品售卖套装
    spuSaleAttrList(state){
        return state.detailData.spuSaleAttrList||{}
    },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
