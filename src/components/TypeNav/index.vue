<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="changeShow" @mouseleave="changeShow">
        <transition name="sort">
          <div class="sort" v-show="NavIsShow">
            <div class="all-sort-list2">
              <!-- 一级标题 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseleave="clearCurrentIndex"
                @click="goSearch"
              >
                <!-- 滑动变色功能 -->
                <h3
                  @mouseenter="changeCurrentIndex(index)"
                  :class="{ cur: currentIndex == index }"
                >
                  <a
                    :data-category-name="c1.categoryName"
                    :data-category1-id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- JS实现滑动显示二级标题 -->
                  <div
                    class="item-list clearfix"
                    v-show="currentIndex == index"
                  >
                    <div class="subitem">
                      <!-- 二级标题 -->
                      <dl
                        class="fore"
                        v-for="c2 in c1.categoryChild"
                        :key="c2.categoryId"
                      >
                        <dt>
                          <a
                            :data-category-name="c2.categoryName"
                            :data-category2-id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <!-- 三级标题 -->
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-category-name="c3.categoryName"
                              :data-category3-id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </transition>
        <h2 class="all">全部商品分类</h2>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入防抖节流库--lodash
import _ from "lodash";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      NavIsShow: this.$route.meta.NavIsShow,
    };
  },
  created() {
    this.$store.dispatch("homeOptions/GetCategoryList");
  },

  computed: {
    ...mapState("homeOptions", { categoryList: "categoryList" }),
  },
  methods: {
    //  变化index
    // 使用节流解决快速移动三级列表卡顿的现象
    changeCurrentIndex: _.throttle(function (index) {
      this.currentIndex = index;
    }, 100),
    //  清除index
    clearCurrentIndex() {
      this.currentIndex = -1;
    },
    // 三级列表的路由跳转
    goSearch(e) {
      // 点击的时候，要知道点击的元素是 a 标签 ，并且要拿到a标签的categoryId ---> 用自定义属性来完成
      // 保存各个容器
      let attribute = e.target.dataset;
      let location = { name: "Search" };
      let query = {};
      // 判断是否为 a 标签
      if (attribute.categoryName) {
        query.categoryName = attribute.categoryName;
        // ! 判断是几级列表 之后把列表ID存在query对象中
        if (attribute.category1Id) {
          query.category1Id = attribute.category1Id;
        } else if (attribute.category2Id) {
          query.category2Id = attribute.category2Id;
        } else {
          query.category3Id = attribute.category3Id;
        }
        // 整理query参数
        location.query = {...query};
      }
      // 跳转路由
      this.$router.push(location);
    },
    changeShow() {
      if (this.$route.meta.isHome != true) this.NavIsShow = !this.NavIsShow;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .cur {
            background-color: rgb(156, 228, 235);
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }


          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0px;
      opacity: 0;
    }
    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }
    .sort-enter-active {
      transition: all 0.2s;
    }
    .sort-leave {
      height: 461px;
      opacity: 1;
    }
    .sort-leave-to {
      height: 0px;
      opacity: 0;
    }
    .sort-leave-active {
      transition: all 0.3s;
    }
  }
}
</style>
