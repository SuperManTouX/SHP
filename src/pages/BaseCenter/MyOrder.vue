<template>
  <div class="order-right">
    <!--订单内容-->
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>

      <div class="orders">

        <table v-for="orderInfo in orderList" :key="orderInfo.id" class="order-item">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{orderInfo.createTime}}　订单编号：{{orderInfo.outTradeNo}}
                  <span class="pull-right delete"><img src="" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orderItem,index) in orderInfo.orderDetailList" :key="orderItem.id">
              <td   width="60%">
                <div class="typographic">
                  <img class="orderImg" :src="orderItem.imgUrl" />
                  <a href="#" class="block-text"
                    >{{orderItem.skuName}}</a
                  >
                  <span>x{{orderItem.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="orderInfo.orderDetailList.length" v-if="index == 0" width="8%" class="center">{{orderInfo.consignee}} </td>
              <td :rowspan="orderInfo.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{orderInfo.totalAmount}} </li>
                  <li>{{orderInfo.paymentWay}} </li>
                </ul>
              </td>
              <td :rowspan="orderInfo.orderDetailList.length" v-if="index == 0" width="8%" class="center">
                <a href="#" class="btn">{{orderInfo.orderStatusName}} </a>
              </td>
              <td :rowspan="orderInfo.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      <div class="choose-order">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="3"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 当前页码
      currentPage: 1,
      // 一页有多少个
      pageSize: 3,
      // 总共多少个
      total: 0,
      // 商品列表
      orderList:[]
    };
  },
  methods: {
    // 页码增加
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 获取当前页码的数据
    async getMyOrderList(currentPage, pageSize) {
     let result = await this.$API.reqGetMyOrderList(this.currentPage, this.pageSize);
     if(result.code == 200){
      this.orderList = result.data.records
      this.total = result.data.total
     }
    },
  },
  watch: {
    // 监测翻页，翻页就重新获取数据
    currentPage: {
      immediate: true,
      handler() {
        this.getMyOrderList(this.currentPage, this.pageSize);
      },
    },
  },
};
</script>

<style>
.orderImg {
  width: 60px;
  height: 60px;
}
</style>
