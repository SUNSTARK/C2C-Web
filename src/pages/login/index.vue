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
          <p class="title">C2C众包平台管理系统</p>
          <el-card shadow="always" class="login-module">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
            </div>
            <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item>
                <el-input prefix-icon="el-icon-user" type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入登录账号" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入登录密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
              </el-form-item>
              <p class="smalltxt">
                <router-link class="a" to="#">忘记密码</router-link>
              </p>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loginForm: {
          username: "test",
          password: "test"
        }
      }
    },
    methods: {
      submitForm () {
        let that = this
        if (this.loginForm.username === "" || this.loginForm.password === "") {
          this.$message({
            showClose: true,
            message: "账号或密码不能为空",
            type: "error"
          })
          return false
        } else {
          // 真实请求参考
          // this.$request.fetchLogin({
          //   username: that.loginForm.username,
          //   password: that.loginForm.password
          // }).then(res => {
          //   that.$restBack(res.data, () => {
          //     that.$store.dispatch("setToken", res.data.data.access_token).then(res => {
          //       that.$router.push({path: "/"})
          //     })
          //   }, "登录成功")
          // }).catch((err) => {
          //   console.log(err)
          // })
          // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
          that.$store.dispatch("setToken", that.loginForm.username).then(() => {
            that.$router.push({path: "/index"}) // 登录成功后，重定向至首页
          }).catch(res => {
            that.$message({
              showClose: true,
              message: res,
              type: "error"
            })
          })
        }
      },
      message () {
        const h = this.$createElement
        this.$notify({
          title: "账号密码",
          message: h("i", {style: "color: teal"}, "账号密码随意填写，测试时被存储为临时假token"),
          duration: 3000
        })
      }
    },
    mounted () {
      this.message()
    }
  }
</script>
<style>
  #login {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #login .loginConbox {
    background: #2d3a4b;
  }
  #login .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
  }
  #login .header .logo {
    margin-left: 30px;
    width: 500px;
    float: left;
    height: 40px;
    padding-top: 10px;
  }
  #login .header .logo img {
    height: 100%;
  }
  #login .loginBox {
    padding-left: 38%;
  }
  #login .loginBox .iconcolor {
    color: #409EFF;
  }
  #login .loginBox .loginCon {
    width: 990px;
    margin: auto;
    position: relative;
    height: 388px;
  }
  #login .loginBox .loginCon .el-card__header {
    border-bottom: 0px;
  }
  #login .loginBox .loginCon .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    width: 500px;
    margin-top: 50px;
    margin-bottom: 30px;
    margin-left: 10px;
  }
  #login .loginBox .loginCon .login-module {
    width: 380px;
    height: 305px;
    margin-top: 20px;
    border: none;
    position: relative;
    right: 0;
  }
  #login .loginBox .loginCon .login-module .formTitlt {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }
  #login .loginBox .loginCon .login-module .formTitlt .titIconbox {
    float: right;
  }
  #login .loginBox .loginCon .login-module .formTitlt .titIconbox .pointer {
    cursor: pointer;
  }
  #login .loginBox .loginCon .login-module .smalltxt {
    text-align: right;
  }
  #login .loginBox .loginCon .login-module .smalltxt .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    margin-left: 8px;
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
</style>
