<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <Aside/>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from './Aside'

  export default {
    name: "index",
    components: {Aside}
  }
</script>

<style scoped>

</style>
