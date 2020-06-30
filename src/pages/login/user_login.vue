<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
        <!--        <div class="logo">-->
        <!--        <img src="../../assets/logo.png">-->
        <!--        </div>-->
      </div>
      <div class="loginBox">
        <div class="loginCon">
          <p class="title">欢迎登陆C2C众包平台</p>
          <el-card shadow="always" class="login-module" v-if="!isWechat">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
              <span class="titIconbox">
              <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
              <i class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer" @click="isWechat = !isWechat"></i>
            </span>
            </div>
            <el-form ref="loginForm" :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user" type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名" clearable></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="密码" show-password @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
              </el-form-item>
              <p class="smalltxt">
                <router-link class="a" to="/404">忘记密码</router-link>
                <router-link class="a" to="/register">免费注册</router-link>
                <router-link class="a" to="/home">返回主页<i class="el-icon-right el-icon--right"></i></router-link>
              </p>
            </el-form>
          </el-card>

          <el-card shadow="always" class="login-module" v-else>
            <div slot="header" class="clearfix formTitlt">
              <span>扫码登录</span>
              <span class="titIconbox">
              <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
              <i class="iconfont xu-imagevector el-icon--right fa-lg pointer" @click="isWechat = !isWechat"></i>
            </span>
            </div>
            <div class="ewmbox">
              <div class="ewm">
                <img src='@/assets/ewm.png' height="140" width="140">
              </div>
              <div class="ewmicon">
                <i class="iconfont xu-saomadenglu fa-2x iconcolor"></i>
                <p>打开 微信 扫码登录</p>
              </div>
              <p class="smalltxt">
                <router-link class="a" to="register">免费注册</router-link>
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {fetch_login} from "../../api/user_apis";
  export default {
    data () {
      return {
        isWechat: false,
        loginForm: {
          username: "",
          password: ""
        }
      }
    },
    methods: {
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm () {
        let that = this
        if (that.loginForm.username === "" || that.loginForm.password === "") {
          this.$notify.error({
            title: '登录失败',
            message: "账号或密码不能为空!",
            type: "error"
          })
          return false
        } else {
          let data = {'useraccount': that.loginForm.username, 'userpasswd': that.loginForm.password}
          // 登录参考
          fetch_login(data).then(res => {
            if (res.data.length === 2) {  // 服务器返回了token和state，即成功登录
              this.$store.dispatch("setAccount",that.loginForm.username)  // 把成功登录的用户名存下来
              if (res.data[1] === '1') { // 服务器返回的是用户身份
                this.$store.dispatch("setRole","user")
                this.$store.dispatch("setToken", res.data[0]).then(res => {
                  this.$router.push({path: "/"})
                  this.success_msg()
                })
              }else if (res.data[1] === '0') {
                this.$store.dispatch("setRole","admin")
                this.$store.dispatch("setToken", res.data[0]).then(res => {
                  this.$router.push({path: "/admin_home"})
                  this.success_msg()
                })
              }
            }else {
              this.$notify.error({
                title: '登录失败',
                message: '用户名或密码错误!'
              });
              this.resetForm('loginForm')
            }
          }).catch((err) => {
            console.log(err)
          }).catch(res => {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            })
          })
        }
      },
      success_msg() {
        let that = this
        this.$notify({
          type: "success",
          title: '登录成功',
          message: '欢迎您，'+that.loginForm.username,
          duration: 2500
        });
      }
    }
  }
</script>
<style>
  #login {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    background-color: #21282E;
  }
  #login .header {
    height: 60px;
    position: relative;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
  }
  #login .loginBox .iconcolor {
    color: #409EFF;
    font-size: 25px;
  }
  #login .loginBox .loginCon {
    width: 360px;
    margin: 0 auto;
    position: relative;
  }
  #login .loginBox .loginCon .el-card__header {
    border-bottom: 0px;
  }
  #login .loginBox .loginCon .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    margin-top: 100px;
    text-align: center;
  }
  #login .loginBox .loginCon .login-module {
    width: 360px;
    height: 305px;
    margin-top: 20px;
    position: relative;
  }
  #login .loginBox .loginCon .login-module .formTitlt {
    font-size: 18px;
    font-weight: 400;
  }
  #login .loginBox .loginCon .login-module .formTitlt .titIconbox {
    float: right;
  }
  #login .loginBox .loginCon .login-module .formTitlt .titIconbox .pointer {
    cursor: pointer;
    font-size: 25px;
  }
  #login .loginBox .loginCon .login-module .smalltxt {
    text-align: right;
  }
  #login .loginBox .loginCon .login-module .smalltxt .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    margin-left: 10px;
    font-weight: 500;
  }
  #login .loginBox .loginCon .el-form-item__content {
    margin-left: 0px !important;
  }
  #login .loginBox .loginCon .el-form-item__content .subBtn {
    width: 100%;
  }
  #login .loginBox .el-input__inner, #login .loginBox .el-button, #login .loginBox .el-card, #login .loginBox .el-message {
    border-radius: 30px !important;
  }
  #login .loginBox .el-form-item__content .ico {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    width: 40px;
    height: 39px;
    text-align: center;
    border-right: 1px solid #ccc;
  }
  #login .loginBox .ewmbox {
    width: 100%;
    height: 240px;
    margin-top: -25px;
  }
  #login .loginBox .ewmbox .ewm {
    width: 140px;
    height: 140px;
    margin: 20px auto;
  }
  #login .loginBox .ewmbox .ewm p {
    font-size: 12px;
    padding-left: 40px;
    margin: 0;
  }
  #login .loginBox .ewmbox .ewmicon {
    width: 140px;
    margin: 15px auto 0;
  }
  #login .loginBox .ewmbox .ewmicon .iconfont {
    float: left;
  }
  #login .loginBox .ewmbox .ewmicon p {
    font-size: 12px;
    padding-left: 30px;
    padding-top: 5px;
    margin: 0;
    text-align: center;
  }
</style>
