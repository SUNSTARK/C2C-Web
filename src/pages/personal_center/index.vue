<template>
  <el-container>
    <el-header class="header">
      <div class="title">
        个人中心
      </div>
    </el-header>
    <el-container class="main">
      <Aside/>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from './Aside'
  import userheader from '../user_layout/header'

  export default {
    name: "index",
    components: {Aside}
  }
</script>

<style scoped>
  .header {
    background-color: #fff;
  }

  .main {
    padding: 0 50px;
  }

  .title{
    line-height: 60px;
    margin: 0 20px;
    font-weight: 600;
    font-size: 16px;
  }
</style>
