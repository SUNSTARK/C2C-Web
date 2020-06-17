<!--该页面仅用于测试功能-->
<template>
  <div id="app">
    <ol>
      <li v-if="site.children.length>0 && site.children[0].alone==true" v-for="(site,index) in sites" :key="index">
        {{ site.children[0].name }}
        <br>
      </li>
      <li v-if="site.children.length>0 && site.children[0].alone==false" v-for="(site,index) in sites" :key="index">
        {{ site.children[0].name }}
      </li>
    </ol>
    <el-menu
      :default-active="$route.path"
      background-color="#020f1d"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item v-if="site.children.length>0 && site.alone==true" v-for="(site,i) in sites" :key="i" :index="site.children[0].path">
        <i :class="site.icon"></i>
        <span> {{ site.name }}</span>
      </el-menu-item>
      <el-submenu v-if="site.children.length>0 && site.alone==false" v-for="(site,index) in sites" :key="index">
        <template slot="title">
          <i :class="site.icon"></i>
          <span>{{ site.name }}</span>
        </template>
        <el-menu-item-group v-if="site.children.length>0 && site.alone==false" v-for="(item,index) in site.children" :key="index">
          <el-menu-item :index="item.path">{{ item.name }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "test",
      data() {
        return {
          sites: this.$store.getters.routers[0]
        }
      }
    }
</script>

<style scoped>

</style>
