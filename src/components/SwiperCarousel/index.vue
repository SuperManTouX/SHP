<template>
  <div ref="swiperContainer" class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carouselItem in carouselList"
        :key="carouselItem.id"
      >
        <img :src="carouselItem.imgUrl" />
      </div>
    </div>

    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "SwiperCarousel",
  mounted() {
    setTimeout(() => {
      new Swiper(this.$refs.swiperContainer, {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    }, 200);
  },
  props: {
    // 必须接受一个 数组 props 参数 ，数组内要有对象，对象内要有imgUrl这个属性
    carouselList: {
      type: Array,
      request: true,
    },
  },
};
</script>

<style></style>
