<template>
  <div>
    <el-header id="userheader">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
        @select="handleSelect"
        background-color="#21282E"
        text-color="#999999"
        active-text-color="#FFFFFF">
        <div class="logo-title"><p>C2C众包平台</p></div>
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/addtask">发布需求</el-menu-item>
        <el-menu-item index="3">测试2</el-menu-item>
        <el-submenu index="4">
          <template slot="title">更多</template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
          <el-menu-item index="4-3">选项3</el-menu-item>
        </el-submenu>
        <ul class="personal" v-if="this.$store.getters.token">
          <li>
            <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link" @click="handleClick">
                    {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">基本资料</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
        <div class="showLogin" v-else>
          <router-link class="link" to="/login">登录</router-link>
          <router-link class="link" to="/login">注册</router-link>
        </div>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
    import Cookies from "js-cookie";

    export default {
      name: "userheader",
      data() {
        return {
          account: this.$store.getters.account,
          activeIndex: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClick() {
          alert('个人中心');
        },
        handleCommand (command) {
          if (command === "info") {
            this.$router.push('/user/info')
            this.dialogInfoVisible = true
            this.title = "编辑信息"
            // this.userId = this.$store.getters.info.uid
          } else if (command === "logout") {
            Cookies.remove("token")
            this.$store.dispatch("setRole", '')  // 清空$store内存相关信息
            this.$store.dispatch("setAccount", '')
            location.reload()
          }
        }
      }
    }
</script>

<style>
  .logo-title {
    width: 100%;
    background-color: #21282E !important;
    z-index: 999;
    left: 30px;
    position: absolute;
    top: 2px;
  }
  .logo-title p {
    font-family: 微软雅黑;
    font-weight: 600;
    float: left;
    font-size: 16px;
    color: white;
    position: fixed;}
  #userheader {
    width: auto !important;
    display: flex;
    flex-direction: column;
    border-right: solid 1px #e6e6e6;
    padding-right: 0;
    padding-left: 0;
    justify-content: space-between;
    overflow-x: hidden;
  }
  #userheader .el-menu {
    flex: 1;
    overflow: inherit;
    border-right: none;
    position: relative;
    padding-left: 200px;
  }
  #userheader .el-menu .el-menu-item {
    background-color: #21282E !important;
    border-bottom: 1px solid #21282E;
  }
  /*导航项悬浮特效*/
  #userheader .el-menu .el-menu-item:hover {
    color: #ffffff !important;
    font-weight: bold;
    background-color: #375573 !important;
  }
  /*选中特效*/
  #userheader .el-menu .el-menu-item.is-active {
    background-color: #56a9ff !important;
    font-weight: bold;
  }
  #userheader .el-menu .is-opened > .el-submenu__title > .el-icon-arrow-down {
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
  }
  #userheader .personal {
    display: flex;
    flex-direction: row;
  }
  #userheader .personal li {
    position: fixed;
    right: 30px;
    top: 19px;
    font-size: 12px;
  }
  #userheader .el-dropdown-link {
    color: white;
    cursor: pointer;
  }
  #userheader .showLogin {
    position: fixed;
    right: 38px;
    top: 19px;
  }
  #userheader .showLogin .link {
    font-size: 15px;
    color: white;
    margin-left: 13px;
    text-decoration: none;
  }
</style>
