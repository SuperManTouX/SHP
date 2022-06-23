<template>
  <div>
    <!-- 放大镜 -->
    <div class="spec-preview">
      <img :src="EskuImageList[this.showImgIndex].imgUrl" />
      <div class="event" @mousemove="moveMask"></div>
      <div class="big" ref="big">
        <img ref="bigImg" :src="EskuImageList[this.showImgIndex].imgUrl" />
      </div>
      <div class="mask" ref="mask"></div>
    </div>

    <!-- 滑动缩略图 -->
    <div ref="swiperContainer" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(imgItem, index) in EskuImageList"
          :key="imgItem.id"
        >
          <img
            @click="changeImageIndex(index)"
            class="attrImg"
            :src="imgItem.imgUrl"
          />
        </div>
      </div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showImgIndex: 0,
    };
  },
  computed: {
    ...mapGetters("detailOptions", ["skuInfo"]),
    // 解决假报错问题
    EskuImageList() {
      return this.skuInfo.skuImageList || [{}];
    },
  },
  methods: {
    // 切换图片
    changeImageIndex(index) {
      this.showImgIndex = index;
    },
    // 放大镜
    moveMask(e) {
      let mask = this.$refs.mask;
      let bigImg = this.$refs.bigImg;
      mask.style.left = e.offsetX - 100 + "px";
      mask.style.top = e.offsetY - 100 + "px";
      bigImg.style.left = -parseInt(mask.style.left) * 2 + "px";
      bigImg.style.top = -parseInt(mask.style.top) * 2 + "px";
      // 放大区域碰到边界 蒙版不超出图片区域
      if (e.offsetX <= 100) mask.style.left = 0;
      if (e.offsetX >= 300) mask.style.left = 200 + "px";
      if (e.offsetY <= 100) mask.style.top = 0;
      if (e.offsetY >= 300) mask.style.top = 200 + "px";
      // 放大区域碰到边界 放大图片
      if (e.offsetX <= 100) bigImg.style.left = 0;
      if (e.offsetX >= 300) bigImg.style.left = -400 + "px";
      if (e.offsetY <= 100) bigImg.style.top = 0;
      if (e.offsetY >= 300) bigImg.style.top = -400 + "px";
    },
  },
  watch: {
    // 创建swiper实例
    EskuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiperContainer, {
          loop: false, // 循环模式选项
          slidesPerView: 3,

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
.specScroll {
  margin-top: 5px;
  width: 400px;
  overflow: hidden;
  .prev,
  .next {
    text-align: center;
    width: 10px;
    height: 54px;
    line-height: 54px;
    border: 1px solid #ccc;
    background: #ebebeb;
    cursor: pointer;
  }
  .prev {
    float: left;
    margin-right: 4px;
  }
  .next {
    float: right;
  }
  .items {
    float: left;
    position: relative;
    width: 372px;
    height: 56px;
    overflow: hidden;
    .itemsCon {
      position: absolute;
      width: 9999px;
      height: 56px;
      left: 0;
      img {
        float: left;
        text-align: center;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
    }
  }
}
.attrImg {
  text-align: center;
  border: 1px solid #ccc;
  padding: 2px;
  width: 50px;
  height: 50px;
  margin-right: 20px;
  margin-left: 36px;
  display: block;
}
</style>
