<template>
  <div id="login">
        <div class="loginConbox">
<!--          <div class="header">-->
<!--                    <div class="logo">-->
<!--                    <img src="../../assets/logo.png">-->
<!--                    </div>-->
<!--          </div>-->
          <div class="loginBox">
            <div class="loginCon">
              <p class="title">C2C众包平台管理系统</p>
              <el-card shadow="always" class="login-module" align="middle">
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
                    <router-link class="a" to="/404">忘记密码</router-link>
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
            this.$router.push({path: "/index"}) // 登录成功后，重定向至首页
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
    background-color: #21282E;
    overflow-x: auto;
    overflow-y: auto;
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
  /*width要和el-card一致才能居中*/
  #login .loginBox .loginCon {
    width: 360px;
    margin: 0 auto;
    position: relative;
  }
  #login .loginBox .loginCon .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    width: 360px;
    margin-top: 150px;
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
    text-align: center;
  }
  #login .loginBox .loginCon .login-module .smalltxt {
    text-align: right;
  }
  #login .loginBox .loginCon .login-module .smalltxt .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    font-weight: 500;
  }
  #login .loginBox .loginCon .el-form-item__content {
    margin-left: 0px !important;
  }
  /*登录按钮的长度*/
  #login .loginBox .loginCon .el-form-item__content .subBtn {
    width: 100%;
  }
  /*el-card的边框弧度*/
  #login .loginBox .el-input__inner, #login .loginBox .el-button, #login .loginBox .el-card, #login .loginBox .el-message {
    border-radius: 30px !important;
  }
</style>
