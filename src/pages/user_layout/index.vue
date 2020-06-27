<template>
  <div id="userlayout">
    <userHeader></userHeader>
    <el-main id="usermain">
      <transition name="main" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-main>
  </div>
</template>

<script>
  import userHeader from "./header"

  export default {
    name: "userlayout",
    components:{
      userHeader
    }
  }
</script>

<style>
  #userlayout {
    background-color: #F2F6FC;
  }
  #usermain {
    background-color: #f0f2f5;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    padding-top: 5px;
  }
  html, body, #userlayout, .el-container, ul.el-menu {
    height: 100%;
    width: 100%;
  }
  body {
    background-color: #f2f2f2;
    font-size: 14px;
    color: #333333;
  }
  .userHeader {

  }
</style>
