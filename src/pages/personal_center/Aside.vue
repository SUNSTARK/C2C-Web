<template>
  <el-aside width="200px" class="aside">
    <el-menu default-active="act" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
<!--      <router-link to="/user/info">-->
<!--        <el-menu-item index="/user/info">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">个人信息</span>-->
<!--        </el-menu-item>-->
<!--      </router-link>-->
      <router-link to="/user/task/list">
        <el-menu-item index="/task/list">
          <i class="el-icon-document"></i>
          <span slot="title">任务列表</span>
        </el-menu-item>
      </router-link>
      <router-link to="/user/task/mine">
        <el-menu-item index="/task/history">
          <i class="el-icon-document"></i>
          <span slot="title">我的任务</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "Aside",
    data() {
      return {
        act: window.location.pathname
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
  }
</style>
