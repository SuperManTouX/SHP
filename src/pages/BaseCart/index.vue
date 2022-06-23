<template>
  <div>
    <!-- 标题栏 -->
    <TypeNav />
    <!-- 购物车部分 -->
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul
            class="cart-list"
            v-for="cartItem in cartInfoList"
            :key="cartItem.id"
          >
            <!-- 多选框 @@@@@@@-->
            <li class="cart-list-con1">
              <input
                type="checkbox"
                name="chk_list"
                :checked="cartItem.isChecked"
                @click="changeCheckBox(cartItem)"
              />
            </li>
            <li class="cart-list-con2">
              <img :src="cartItem.imgUrl" />
              <div class="item-msg">
                {{ cartItem.skuName }}
              </div>
            </li>
            <li class="cart-list-con3">
              <div class="item-txt">???</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ cartItem.cartPrice }}</span>
            </li>
            <!-- 购买数量 -->
            <li class="cart-list-con5">
              <a
                href="javascript:void(0)"
                class="mins"
                @click="changeNum('mins', cartItem.skuId, -1)"
                >-</a
              >
              <input
                autocomplete="off"
                type="text"
                :value="cartItem.skuNum"
                @change="
                  changeNum(
                    'change',
                    cartItem.skuId,
                    0,
                    cartItem.skuNum,
                    $event.target.value * 1
                  )
                "
                minnum="1"
                class="itxt"
              />
              <a
                href="javascript:void(0)"
                class="plus"
                @click="changeNum('plus', cartItem.skuId, 1)"
                >+</a
              >
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ cartItem.skuPrice * cartItem.skuNum }}</span>
            </li>
            <!-- 删除 @@@@@@@@ -->
            <li class="cart-list-con7">
              <a @click="deleteCartItem(cartItem.skuId)" class="sindelet"
                >删除</a
              >
              <br />
              <a>移到收藏</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteCheckedCartItem" href="javascript:;"
            >删除选中的商品</a
          >
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">已选择 <span>0</span>件商品</div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ totalSumPrice }}</i>
          </div>
          <div class="sumbtn">
            <a class="sum-btn" href="javascript:;" @click="goTrade">结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BaseCart",
  created() {
    // 重新获取购物车列表
    this.getData();
  },
  computed: {
    ...mapState("cartOptions", ["cartInfoList"]),
    // 总计价格
    totalSumPrice() {
      let sum = 0;
      this.cartInfoList.forEach((cartItem) => {
        sum += cartItem.skuPrice * cartItem.skuNum;
      });
      return sum;
    },
    // 判断是不是全选
    isAllChecked: {
      get() {
        // 遍历商品列表是不是都选中了 ，如果是，返回true
        let result = this.cartInfoList.every((cartItem) => {
          return cartItem.isChecked == 1;
        });
        // 如果购物车里没有商品，不勾选
        if(this.cartInfoList.length == 0) return  result = false
        return result;
      },
      // 修改勾选状态
      async set(val) {
        try {
          // 获取商品请求是否全部完成的Promise
          await this.$store.dispatch("cartOptions/CheckAllCart", val);
          // 重新获取购物车列表
          this.getData();
          //  如果try语句出现异常，则马上走catch语句。否则跳过catch语句
        } catch (error) {
          console.log(error.message);
        }
      },
    },
  },
  methods: {
    // 重新获取商品列表
    getData() {
      this.$store.dispatch("cartOptions/GetCartList");
    },
    //更改商品切换状态
    changeCheckBox(cartItem) {
      console.log(cartItem); // skuId isChecked
      let checkParams = {};
      // 判断是0 还是 1
      if (cartItem.isChecked == 0) {
        checkParams = { skuID: cartItem.skuId, isChecked: "1" };
      } else {
        checkParams = { skuID: cartItem.skuId, isChecked: "0" };
      }
      // 发请求更改商品切换状态
      this.$store.dispatch("cartOptions/CheckCart", checkParams);
      // 重新获取购物车列表
      this.getData();
    },
    // 更改购买数量
    async changeNum(type, skuId, skuNum, originNum, afterNum) {
      let changeNum = 0;
      // 处理加减商品个数
      switch (type) {
        case "plus":
          changeNum += skuNum;
          break;

        case "mins":
          changeNum += skuNum;
          break;

        default:
          // 检测用户输入的类型是否正确
          if (typeof afterNum != "number" || afterNum <= 0) {
            return alert("请输入一个数字");
          }
          // 计算商品增减或减少的值
          changeNum = afterNum - originNum;
          break;
      }
      // 发送加减商品个数的请求
      await this.$store.dispatch("cartOptions/AddCartList", {
        skuNum: changeNum,
        skuId,
      });
      // 更新模板
      this.getData();
    },
    // 删除单个商品
    async deleteCartItem(skuId) {
      await this.$store.dispatch("cartOptions/DeleteCart", skuId);
      this.getData()
    },
    // 删除选中的商品
    async deleteCheckedCartItem() {
      try {
        // 派发actions
        await this.$store.dispatch("cartOptions/DeleteAllCheckedCart");
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 去结算
    goTrade(){
      this.$router.replace({
        name:'Trade'
      })
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 4.1667%;
        }
        .cart-list-con2 {
          width: 25%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con3 {
          width: 20.8333%;
          .item-txt {
            text-align: center;
          }
        }
        .cart-list-con4 {
          width: 12.5%;
        }
        .cart-list-con5 {
          width: 12.5%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }
          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }
        .cart-list-con6 {
          width: 12.5%;
          .sum {
            font-size: 16px;
          }
        }
        .cart-list-con7 {
          width: 12.5%;
          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      span {
        vertical-align: middle;
      }
      input {
        vertical-align: middle;
      }
    }
    .option {
      padding: 10px;
      overflow: hidden;
      float: left;
      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }
    .money-box {
      float: right;
      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }
      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }
      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
