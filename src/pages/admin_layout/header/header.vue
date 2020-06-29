<template>
  <div>
    <el-header id="header">
      <span class="hideAside" @click="collapse">
        <el-tooltip class="item" effect="dark" content="展开" placement="bottom" v-if="$store.getters.isCollapse">
          <i class="fa fa-indent fa-lg">
          </i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="折叠" placement="bottom" v-else>
          <i class="fa fa-outdent fa-lg">
          </i>
        </el-tooltip>
      </span>
      <div class="crumbs">
        <Breadcrumb></Breadcrumb>
      </div>
      <ul class="personal">
        <li class="fullScreen" @click="fullScreen">
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom"><i
            class="fa fa-arrows-alt fa-lg"></i></el-tooltip>
        </li>
        <li>
          <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="toHome">网站首页</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </el-header>
    <user-info v-if="dialogInfoVisible" :title="title" :dialogVisible="dialogInfoVisible" :userId="userId" @successCallback="successCallback"/>
    <edit-password v-if="dialogPassVisible" :dialogVisible="dialogPassVisible" @editPwdCallback="editPwdCallback"/>
  </div>
</template>

<script>
import Cookies from "js-cookie"
import UserInfo from "../../../components/userForm/userInfo"
import EditPassword from "../../../components/userForm/editPassword"
import Breadcrumb from "./Breadcrumb";

export default {
  name: "Header",
  components: {EditPassword, Breadcrumb, UserInfo},
  data () {
    return {
      dialogInfoVisible: false,
      dialogPassVisible: false,
      title: "",
      userId: "",
      account: this.$store.getters.account,
    }
  },
  methods: {
    collapse () {
      this.$store.dispatch("collapse")
    },
    successCallback () {
      this.dialogInfoVisible = false
    },
    editPwdCallback () {
      this.dialogPassVisible = false
    },
    async handleCommand (command) {
      if (command === "toHome") {
        // this.dialogInfoVisible = true
        // this.title = "编辑信息"
        await this.$router.push({path: '/home'})
        // this.userId = this.$store.getters.info.uid
      } else if (command === "editPassword") {
        this.dialogPassVisible = true
      } else if (command === "logout") {
        Cookies.remove("token")
        await this.$store.dispatch("setRole", '')  // 清空$store内存相关信息
        await this.$store.dispatch("setAccount", '')
        location.reload()
      }
    },
    fullScreen () {
      if (this.isfullScreen) {
        let docElm = document.documentElement
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen()
        }
        this.isfullScreen = false
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.isfullScreen = true
      }
    }
  }
}
</script>

<style>
  html, body, #app, .el-container, #asideNav, ul.el-menu {
    height: 100%;
  }

  #header .personal .el-dropdown-link, #header .personal , #header .hideAside {
    cursor: pointer;
  }

  #header {
    max-height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
  }
  #header .personal {
    display: flex;
    flex-direction: row;
  }
  #header .personal li {
    margin-left: 13px;
    margin-right: 13px;
    font-size: 12px;
  }
  /*面包屑*/
  .crumbs{
    position: relative;
    margin-right: auto ;
    left: 20px;
    top: 18px;
  }
</style>
