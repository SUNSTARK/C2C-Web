<template>
  <div>
    <el-aside id="asideNav">
      <div class="logo-name">
        <p v-if="$store.getters.logoShow"><img src="../../../../static/logo.png" class="logo-img"></p>
        <p v-else>C2C众包后台管理</p>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        router
        background-color="#020f1d"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="$store.getters.isCollapse">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          <i :class="item.icon"></i>
          <span> {{ item.navItem }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "asideNav",
  data() {
    return {
      navList:[
        {name:'/index',navItem:'主页',icon:"el-icon-s-home"},
        {name:'/alljobs',navItem:'任务大厅',icon:"fa fa-list-ul"},
        {name:'/filterTable',navItem:'待审任务',icon: "fa fa-flag-checkered "}
      ] }
  },
}
</script>

<style>
  #asideNav .logo-name {
    width: 100%;
  }

  #asideNav .el-menu-vertical:not(.el-menu--collapse) {
    height: 100%;
  }

  #asideNav {
    width: auto !important;
    display: flex;
    flex-direction: column;
    border-right: solid 1px #e6e6e6;
  }
  #asideNav .logo-name {
    background-color: #03152A !important;
    font-weight: 300;
    z-index: 999;
  }
  #asideNav .logo-name p {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: white;
  }
  #asideNav .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #asideNav .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
  }
  #asideNav .el-menu::-webkit-scrollbar {
    display: none;
  }
  #asideNav .el-menu .fa {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }
  #asideNav .el-menu .el-menu-item {
    background-color: #020f1d !important;
    border-bottom: 1px solid #020f1d;
  }
  #asideNav .el-menu .el-menu-item:hover {
    color: #ffffff !important;
    background-color: #375573 !important;
  }
  #asideNav .el-menu .el-menu-item.is-active {
    background-color: #56a9ff !important;
  }
  #asideNav .el-menu .is-opened > .el-submenu__title > .el-icon-arrow-down {
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
  }
  .logo-img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
</style>
