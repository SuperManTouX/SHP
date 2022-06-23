<template>
  <div>
    <!-- 头部导航 -->
    <TypeNav />
    <!-- 窗口侧边栏 -->
    <ToolBar />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
            <!--面包屑-->
          <ul class="fl sui-tag">
            <!-- 面包屑 分类名  -->
            <li class="with-x" v-if="routeQuery.categoryName">
              {{ routeQuery.categoryName
              }}<i @click="removeRouteCategoryName">×</i>
            </li>
            <!-- 面包屑 关键字  -->
            <li class="with-x" v-if="routeQuery.keyword">
              {{ routeQuery.keyword }}<i @click="removeRouteKeyword">×</i>
            </li>
            <!-- 面包屑 品牌  -->
            <li class="with-x" v-if="routeQuery.trademark">
              {{ routeQuery.trademark.split(":")[1]
              }}<i @click="removeRouteTrademark">×</i>
            </li>
            <!-- 面包屑 售卖属性  -->
            <li
              class="with-x"
              v-for="(SP, index) in this.searchParams.props"
              :key="index"
            >
              {{ SP.split(":")[1] }}<i @click="removePropItem(SP)">×</i>
            </li>
          </ul>
        </div>

        <!--商品选择-->
        <SearchSelector @attrInfo="attrInfo" />

        <!--商品细节-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a @click="changeMode('1')"
                    >综合
                    <!-- 向上图标 -->
                    <i
                      v-show="!isDesc && isOne"
                      @click.stop="changeAscOrDesc('desc')"
                      class="bi bi-arrow-up"
                    ></i>
                    <!-- 向下图标 -->
                    <i
                      v-show="isDesc && isOne"
                      @click.stop="changeAscOrDesc('asc')"
                      class="bi bi-arrow-down"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: !isOne }">
                  <a @click="changeMode('2')"
                    >价格

                    <!-- 向上图标 -->
                    <i
                      v-show="!isDesc && !isOne"
                      @click.stop="changeAscOrDesc('desc')"
                      class="bi bi-arrow-up"
                    ></i>
                    <!-- 向下图标 -->
                    <i
                      v-show="isDesc && !isOne"
                      @click.stop="changeAscOrDesc('asc')"
                      class="bi bi-arrow-down"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`" 
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <div class="fr page">
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="searchList.total"
                @current-change="handleCurrentChange"
                :current-page="searchParams.pageNo"
                :pageSize="searchParams.pageSize"
              >
              </el-pagination>
            </div>
          </div>
        </div>

        <!--商品热卖-->
        <HotSale />
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import ToolBar from "./ToolBar";
import HotSale from "./HotSale";
import { mapGetters, mapState } from "vuex";

export default {
  name: "BaseSearch",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: { SearchSelector, ToolBar, HotSale },
  methods: {
    // 发请求获取搜索数据
    getData() {
      // 处理参数
      this.searchParams = {
        ...this.searchParams,
        ...this.$route.query,
        ...this.$route.params,
      };
      // 传数据发请求
      this.$store.dispatch("searchOptions/GetSearchList", this.searchParams);
    },

    clearCategory() {
      (this.searchParams.category1Id = undefined),
        (this.searchParams.category2Id = undefined),
        (this.searchParams.category3Id = undefined),
        (this.searchParams.categoryName = undefined),
        (this.searchParams.props = []);
    },

    // 删除面包屑 分类名 路由方法
    removeRouteCategoryName() {
      // ! 把query的数据从带getter setter 的对象，转变为普通对象
      const query = JSON.parse(JSON.stringify(this.routeQuery));
      // 删除分类名相关的参数
      query.category1Id = undefined;
      query.category2Id = undefined;
      query.category3Id = undefined;
      query.categoryName = undefined;
      this.$router.push({
        name: "Search",
        query,
      });
    },

    // 删除面包屑 关键字 路由方法
    removeRouteKeyword() {
      const query = JSON.parse(JSON.stringify(this.routeQuery));
      // 删除关键字相关的参数
      query.keyword = undefined;
      this.$router.push({
        name: "Search",
        query,
      });
    },

    // 删除面包屑 品牌 路由方法
    removeRouteTrademark() {
      const query = JSON.parse(JSON.stringify(this.routeQuery));
      // 删除品牌相关的参数
      query.trademark = undefined;
      this.$router.push({
        name: "Search",
        query,
      });
    },
    //  删除面包屑 删除售卖属性
    removePropItem(SP) {
      // 拿到被删除元素在原数组中的下标
      let index = this.searchParams.props.indexOf(SP);
      // 删除元素
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //  面包屑 接受售卖属性
    attrInfo(sellProperty) {
      // 组装数组并去重
      this.searchParams.props = _.uniq([
        sellProperty,
        ...this.searchParams.props,
      ]);
      this.getData();
    },

    // 切换排序模式
    changeMode(destination) {
      this.searchParams.order = `${destination}:desc`;
      this.getData();
    },
    // 切换升序降序模式
    changeAscOrDesc(val) {
      this.searchParams.order = `${
        this.searchParams.order.split(":")[0]
      }:${val}`;
      this.getData();
    },

    // 翻页更新页面
    handleCurrentChange(val) {
      this.searchParams.pageNo = val;
      this.getData();
    },
  },
  // 初始化
  created() {
    this.clearCategory();
    this.getData();
  },

  computed: {
    // 获取商品列表数据、品牌列表
    ...mapGetters("searchOptions", ["goodsList", "trademarkList"]),
    // 获取商品总数据
    ...mapState("searchOptions", ["searchList"]),
    // 获得query参数列表
    routeQuery() {
      return this.$route.query;
    },
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  watch: {
    // 路由变化的时候重新获得数据
    $route: {
      deep: true,
      handler() {
        this.getData();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 20px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
