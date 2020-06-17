<template>
  <div class="example-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadList"
        :key="item.path" :to="item.path">{{item.meta && item.meta.bread_name[0]}}</el-breadcrumb-item>
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
        return this.$route.path === "/index";
      },
      getBreadcrumb() {
        let matched = this.$route.matched.slice(1) // 截取掉localhost的router
        // 若有父级菜单
        if (matched[0].meta.bread_name.length == 2) {
          matched = [{path: matched[0].parent.path, meta:{bread_name: [matched[0].meta.bread_name[1]]}}].concat(matched)
        }
        // 如果不是首页
        if (!this.isHome()) {
          matched = [{ path: "/index", meta:{bread_name: ["主页"]}}].concat(matched);
        }
        this.breadList = matched;
      }
    }
  }
</script>

<style scoped>

</style>
