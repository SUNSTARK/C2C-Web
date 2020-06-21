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
          <p class="title">欢迎使用</p>
          <p class="title">C2C众包平台</p>
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
              <span class="titIconbox">
              <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
              <i class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer" @click="smdl = !smdl"></i>
            </span>
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
                <router-link class="a" to="register">免费注册</router-link>
              </p>
            </el-form>
          </el-card>

          <el-card shadow="always" class="login-module" v-else>
            <div slot="header" class="clearfix formTitlt">
              <span>扫码登录</span>
              <span class="titIconbox">
              <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
              <i class="iconfont xu-imagevector el-icon--right fa-lg pointer" @click="smdl = !smdl"></i>
            </span>
            </div>
            <div class="ewmbox">
              <div class="ewm">
<!--                <img src='./static/ewm.png' height="140" width="140">-->
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
  export default {
    data () {
      return {
        smdl: true,
        loginForm: {
          username: "123ti1me3",
          password: "123456"
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
          console.log("login success")
          that.axios.post('http://39.105.177.71:8080/api/user/login',
            {
              useraccount:that.loginForm.username,
              userpasswd:that.loginForm.password,
            })
            .then(res => {
              this.content = res.data.data;
              console.log('数据是:', res.data);
              if(res.data.msg=="成功！")
              {
                // alert("登陆成功");
                sessionStorage.setItem('token',this.content);
                // sessionStorage.setItem('uuid',res.data.data.uuid);
                // sessionStorage.setItem('username',this.loginForm.username);

                this.messages();

                // that.$router.push({path: "/add"});
              }else
              {
                this.unmessages();
              }

            })
            .catch((e) => {
              console.log('获取数据失败');
              this.errmessages();
            });
          // that.axios.post('./api/?s=App.User.LoginExt' +
          //   '&app_key=FE90D9A3ED981D3036ED7417B798891B' +
          //   '&sign=E9527F2F89012F8E9E9CC342B1F8F488',{
          //   username:that.loginForm.username,
          //   password:that.loginForm.password,
          // })
          //   .then(res => {
          //     this.content=res.data.data.token;
          //     console.log('数据是:', res);
          //     if(res.data.data.err_code==0)
          //     {
          //       // alert("登陆成功");
          //       sessionStorage.setItem('token',this.content);
          //       sessionStorage.setItem('uuid',res.data.data.uuid);
          //       sessionStorage.setItem('username',this.loginForm.username);
          //
          //       this.messages();
          //
          //       that.$router.push({path: "/add"});
          //     }else
          //     {
          //       this.unmessages();
          //     }
          //
          //
          //
          //   })
          //   .catch((e) => {
          //     console.log('获取数据失败');
          //     this.errmessages();
          //   });




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
          // that.$store.dispatch("setToken", that.loginForm.username).then(() => {
          //   that.$router.push({path: "/"})
          // }).catch(res => {
          //   that.$message({
          //     showClose: true,
          //     message: res,
          //     type: "error"
          //   })
          // })
        }
      },
      messages()
      {
        this.$message({
          showClose: true,
          message: '登陆成功，进入发布任务界面',
          type: 'success'
        });
      },
      unmessages()
      {
        this.$message({
          showClose: true,
          message: '登陆失败，检查用户名密码',
          type: 'error'
        });
      },
      errmessages()
      {
        this.$message({
          showClose: true,
          message: '出bug了,联系管理员',
          type: 'warning'
        });
      },

    },

  }
</script>
<style>
  #login {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
    margin: 0;
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
    padding: 74px 0 118px;
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
    float: left;
    margin-top: 0px;
  }
  #login .loginBox .loginCon .title:first-child {
    font-size: 34px;
    margin-top: 40px;
    margin-bottom: 30px;
  }
  #login .loginBox .loginCon .login-module {
    width: 380px;
    height: 325px;
    margin-top: 20px;
    border: none;
    position: absolute;
    right: 0;
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
    border-radius: 0px !important;
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
