<template>
  <div>
    <BaseHead />
    <router-view></router-view>
    <BaseFooter />
  </div>
</template>

<script>
import BaseHead from "./components/BaseHead";
import BaseFooter from "./components/BaseFooter";
export default {
  name: "App",
  components: {
    BaseHead,
    BaseFooter,
  },

};
</script>

<style></style>
