<template>
  <el-aside width="200px">
    <el-menu default-active="act" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <router-link to="/user/info">
        <el-menu-item index="/user/info">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </router-link>
      <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span slot="title">导航2</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">导航3</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "Aside",
    data(){
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
