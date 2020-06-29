<template>
  <el-aside width="140px" class="aside">
    <el-menu :default-active="act" class="el-menu-vertical-demo" router>
        <el-menu-item index="/user/info">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/user/task/list">
          <i class="el-icon-document"></i>
          <span slot="title">接受任务</span>
        </el-menu-item>
        <el-menu-item index="/user/task/mine">
          <i class="el-icon-user"></i>
          <span slot="title">我的发布</span>
        </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    inject:["reload"],
    name: "Aside",
    data() {
      return {
        act: window.location.hash.slice(1)
      }
    },
    methods: {
    },
    watch: {
      $route() {
        this.reload()
      }
    }
  }
</script>

<style>
  a {
    text-decoration: none;
  }
</style>

<style scoped>
  .aside {
    overflow: hidden;
    min-height: Calc(100vh - 80px);
    height: 93%;
  }
  /*选中特效*/
  .el-menu .el-menu-item.is-active {
    background-color: #EDF5FF;
    font-weight: bold;
  }
  ul.el-menu {
    height: 100%;
  }
</style>
