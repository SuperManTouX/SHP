"use strict";(self["webpackChunkshp"]=self["webpackChunkshp"]||[]).push([[609],{3609:function(s,e,t){t.r(e),t.d(e,{default:function(){return u}});var a=function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",[t("h3",{staticClass:"title"},[s._v("填写并核对订单信息")]),t("div",{staticClass:"content"},[t("h5",{staticClass:"receive"},[s._v("收件人信息")]),s._l(s.userAddressList,(function(e){return t("div",{key:e.id,staticClass:"address clearFix"},[t("p",{on:{click:function(t){return s.selectAddress(e,s.userAddressList)}}},[t("span",{ref:"consignee",refInFor:!0,class:{username:!0,selected:e.isSelected}},[s._v(s._s(e.consignee))]),t("span",{staticClass:"s1"},[s._v(s._s(e.fullAddress))]),t("span",{staticClass:"s2"},[s._v(s._s(e.phoneNum))]),t("span",{staticClass:"s3",on:{click:function(t){return s.changeDefaultAddress(e)}}},[s._v("默认地址")])])])})),t("div",{staticClass:"line"}),t("h5",{staticClass:"pay"},[s._v("支付方式")]),s._m(0),t("div",{staticClass:"line"}),t("h5",{staticClass:"pay"},[s._v("送货清单")]),s._m(1),t("div",{staticClass:"detail"},[t("h5",[s._v("商品清单")]),s._l(s.detailArrayList,(function(e){return t("ul",{key:e.id,staticClass:"list clearFix"},[t("li",[t("img",{staticClass:"cartImg",attrs:{src:e.imgUrl,alt:""}})]),t("li",[t("p",[s._v(" "+s._s(e.skuName)+" ")]),t("h4",[s._v("7天无理由退货")])]),t("li",[t("h3",[s._v("￥"+s._s(e.orderPrice))])]),t("li",[s._v("X1")]),t("li",[s._v("有货")])])}))],2),t("div",{staticClass:"bbs"},[t("h5",[s._v("买家留言：")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:s.msg,expression:"msg"}],staticClass:"remarks-cont",attrs:{placeholder:"建议留言前先与商家沟通确认"},domProps:{value:s.msg},on:{input:function(e){e.target.composing||(s.msg=e.target.value)}}})]),t("div",{staticClass:"line"}),s._m(2)],2),t("div",{staticClass:"money clearFix"},[t("ul",[t("li",[t("b",[t("i",[s._v(s._s(s.detailArrayList.length))]),s._v("件商品，总商品金额")]),t("span",[s._v("¥"+s._s(s.cartPriceSum))])]),s._m(3),s._m(4)])]),t("div",{staticClass:"trade"},[t("div",{staticClass:"price"},[s._v(" 应付金额:　"),t("span",[s._v("¥"+s._s(s.cartPriceSum))])]),s._m(5)]),t("div",{staticClass:"sub clearFix"},[t("a",{staticClass:"subBtn",on:{click:s.goPay}},[s._v("提交订单")])])])},i=[function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"address clearFix"},[t("span",{staticClass:"username selected"},[s._v("在线支付")]),t("span",{staticClass:"username",staticStyle:{"margin-left":"5px"}},[s._v("货到付款")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"way"},[t("h5",[s._v("配送方式")]),t("div",{staticClass:"info clearFix"},[t("span",{staticClass:"s1"},[s._v("天天快递")]),t("p",[s._v("配送时间：预计8月10日（周三）09:00-15:00送达")])])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"bill"},[t("h5",[s._v("发票信息：")]),t("div",[s._v("普通发票（电子） 个人 明细")]),t("h5",[s._v("使用优惠/抵用")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("li",[t("b",[s._v("返现：")]),t("span",[s._v("0.00")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("li",[t("b",[s._v("运费：")]),t("span",[s._v("0.00")])])},function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"receiveInfo"},[s._v(" 寄送至: "),t("span",[s._v("北京市昌平区宏福科技园综合楼6层")]),s._v(" 收货人："),t("span",[s._v("张三")]),t("span",[s._v("15010658793")])])}],r=t(4665),l={name:"BaseCartTrade",data(){return{msg:""}},computed:{...(0,r.rn)("tradeOptions",["userTradeInfo","userDefaultAddress","orderId"]),...(0,r.Se)("tradeOptions",["userAddressList","detailArrayList"]),cartPriceSum(){let s=0;return this.detailArrayList.forEach((e=>{s+=e.orderPrice})),s}},methods:{selectAddress(s,e){e.forEach((s=>s.isSelected=!1)),s.isSelected=!0},changeDefaultAddress(s){let{consignee:e,phoneNum:t,fullAddress:a}=s;localStorage.setItem("defaultAddress",JSON.stringify({consignee:e,phoneNum:t,fullAddress:a}))},goPay(){let s=this.userAddressList.find((s=>1==s.isSelected)),e={traderNo:this.userTradeInfo.tradeNo,consignee:s.consignee,consigneeTel:s.phoneNum,deliveryAddress:s.fullAddress,paymentWay:"ONLINE",orderComment:this.msg,orderDetailList:this.detailArrayList};this.$store.dispatch("tradeOptions/SubmitOrder",e)}},mounted(){this.$store.dispatch("tradeOptions/GetTradeInfo")}},n=l,c=t(1001),d=(0,c.Z)(n,a,i,!1,null,"63e79bba",null),u=d.exports}}]);
//# sourceMappingURL=609.9626b3f3.js.map