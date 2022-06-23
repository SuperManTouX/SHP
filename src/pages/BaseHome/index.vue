<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="list in floorList" :key="list.id" :list="list" />
    <Brand />
  </div>
</template>

<script>
// 引入各个组件
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

import { mapState } from "vuex";
export default {
  name: "BaseHome",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 获得楼层数据
    this.$store.dispatch("homeOptions/GetFloorList");
  },
  computed: {
    ...mapState("homeOptions", { floorList: "floorList" }),
  },
};
</script>

<style></style>
