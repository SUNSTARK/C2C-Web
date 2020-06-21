<template>
  <el-container style="flex-direction: column;">
    <home-header></home-header>
    <el-main>
      <img src="http://pic1.win4000.com/wallpaper/8/5811b0be26a3a.jpg">
    </el-main>
  </el-container>

</template>

<script>
  import HomeHeader from "./home_header"

  export default {
    name: "home",
    components: {HomeHeader}
  }
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }
</style>
