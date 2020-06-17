<template>
  <div class="example-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        breadList: [] // 路由集合
      };
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },
    methods: {
      isHome() {
        return this.$route.name === "主页";
      },
      getBreadcrumb() {
        let matched = this.$route.matched.slice(1) // 截取掉localhost的router
        // console.log(matched)
        // 如果不是首页
        if (!this.isHome()) {
          matched = [{ path: "/index", name: "主页"}].concat(matched);
        }
        this.breadList = matched;
      }
    },
    created() {
      this.getBreadcrumb();
    }
  }
</script>

<style scoped>

</style>
