<template>
  <div>
    <edit-password v-if="dialogPassVisible" :dialogVisible="dialogPassVisible" @editPwdCallback="editPwdCallback"/>
    <el-header id="userheader">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
        background-color="#21282E"
        text-color="#999999"
        active-text-color="#FFFFFF">
        <div class="logo-title"><p>C2C众包平台</p></div>
        <el-menu-item index="/home" >首页</el-menu-item>
        <el-menu-item index="/addtask">发布需求</el-menu-item>
        <ul class="personal" v-if="this.$store.getters.token">
          <li>
            <router-link v-if="this.$store.getters.role==='admin'" class="adminEntry" to="/admin_home">后台入口</router-link>
            <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link" @click="handleClick">
                    {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                <el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
        <div class="showLogin" v-else>
          <router-link class="link" to="/login">登录</router-link>
          <router-link class="link" to="/register">注册</router-link>
        </div>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
    import Cookies from "js-cookie";
    import UserInfo from "../../../components/userForm/userInfo"
    import EditPassword from "../../../components/userForm/editPassword"

    export default {
      inject:["reload"],  // 从app.vue注入reload方法，用于重新加载用户导航
      name: "userheader",
      components:{EditPassword},
      data() {
        return {
          account: this.$store.getters.account,
          activeIndex: window.location.hash.slice(1),
          dialogPassVisible: false // 默认不显示需修改密码对话框
        };
      },
      methods: {
        editPwdCallback () {
          this.dialogPassVisible = false
        },
        async handleClick() {
          await this.$router.push('/user/info')
          this.reload()  // 刷新导航组件，清空菜单选中状态
        },
        async handleCommand (command) {
          if (command === "userinfo") {
            if (this.activeIndex) {
              this.activeIndex = null  // 置空导航菜单激活index
            }
            await this.$router.push('/user/info')
            this.reload()  // 刷新导航组件，清空菜单选中状态
          } else if (command === "editPassword") {
            this.dialogPassVisible = true
          } else if (command === "logout") {
            Cookies.remove("token")
            await this.$store.dispatch("setRole", '')  // 清空$store内存相关信息
            await this.$store.dispatch("setAccount", '')
            location.reload()
          }
        },
        handleSelect () {
          this.reload()
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
    position: fixed;
  }
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
  .adminEntry {
    color: white;
    text-decoration: none;
    font-size: 14px;
    margin-right: 15px;
  }
</style>
