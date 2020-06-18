<template>
  <div class="example-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in breadList"
        :key="item.path" :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        breadList: []
      };
    },
    created() {
      if (sessionStorage.getItem('breadlist')) {  // 如果sssion中能取到值则赋给页面初始化
        this.breadList = JSON.parse(sessionStorage.getItem('breadlist'))
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
        this.breadList = JSON.parse(sessionStorage.getItem('breadlist')) // 路由集合
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
        const list = []
        for (const item in matched) {
          list.push({path:matched[item].path,name:matched[item].meta.bread_name[0]})
        }
        sessionStorage.setItem('breadlist',JSON.stringify(list))  // 将面包板数据存至本地，防止刷新丢失
      }
    }
  }
</script>

<style scoped>

</style>
