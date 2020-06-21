<template>
  <el-header class="header">
    <div class="title">c2c 众包</div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">发布需求</el-menu-item>
      <el-menu-item index="2">项目大厅</el-menu-item>
      <el-menu-item index="3">成为开发者</el-menu-item>
      <el-menu-item index="4">更多</el-menu-item>
      <el-menu-item index="5">
        <router-link to="/user/info">个人中心
        </router-link>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
  export default {
    name: "home_header",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-menu.el-menu--horizontal {
    border: none;
  }
</style>

<style>
  a {
    text-decoration: none;
  }
</style>

<style scoped>
  .header {
    display: flex;
  }

  .title {
    line-height: 60px;
    margin: 0 5vw;
    font-weight: 600;
  }
</style>
