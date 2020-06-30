<template>
  <div>
    <div class="logo-title"><p>C2C众包平台</p></div>
    <el-header id="userheader">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
        background-color="#21282E"
        text-color="#999999"
        active-text-color="#FFFFFF">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/addtask">发布需求</el-menu-item>
        <el-menu-item index="/user/task/list">我的工作台</el-menu-item>
        <el-menu-item index="/admin_home" v-if="this.$store.getters.role==='admin'">后台主页</el-menu-item>
        <el-menu-item index="/user/info" v-if="this.$store.getters.token" style="float: right;color: white;font-weight: bold">{{account}}
          <el-dropdown @command="handleCommand">
            <i class="el-icon-arrow-down" style="margin-top: -5px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-menu-item>
        <div class="showLogin" v-else>
          <router-link class="link" to="/login">登录</router-link>
          <router-link class="link" to="/register">注册</router-link>
        </div>
      </el-menu>
    </el-header>
    <edit-password v-if="dialogPassVisible" :dialogVisible="dialogPassVisible" @editPwdCallback="editPwdCallback"/>
  </div>
</template>

<script>
  import Cookies from "js-cookie";

  import EditPassword from "../../../components/userForm/editPassword"

  export default {
    inject:["reload"],  // 从app.vue注入reload方法，用于重新加载用户导航
    name: "userheader",
    components: {
      EditPassword
    },
    data() {
      return {
        account: this.$store.getters.account,
        activeIndex: window.location.hash.slice(1),
        dialogPassVisible: false // 默认不显示修改密码对话框
      };
    },
    methods: {
      editPwdCallback() {
        this.dialogPassVisible = false
      },
      async handleCommand(command) {
        if (command === "editPassword") {
          this.dialogPassVisible = true
        } else if (command === "logout") {
          Cookies.remove("token")
          await this.$store.dispatch("setRole", '')  // 清空$store内存相关信息
          await this.$store.dispatch("setAccount", '')
          location.reload()
        }
      }
    }
  }
</script>

<style>
  .logo-title {
    width: 200px;
    height: 60px;
    background-color: #21282E !important;
    position: fixed;
  }

  .logo-title p {
    font-family: 微软雅黑;
    font-weight: 600;
    font-size: 16px;
    color: white;
    text-align: center;
    margin-top: 18px;
  }

  #userheader {
    display: flex;
    flex-direction: column;
    border-right: solid 1px #e6e6e6;
    padding-right: 0;
    padding-left: 0;
  }

  #userheader .el-menu {
    flex: 1;
    border-right: none;
    margin-left: 200px;
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
    right: 40px;
    top: 19px;
  }

  #userheader .showLogin .link {
    font-size: 16px;
    color: white;
    margin-left: 15px;
    text-decoration: none;
    font-weight: bold;
    font-family: 微软雅黑;
  }

</style>
