<template>
  <div id="register">
    <div class="registerConbox">
      <div class="header">
        <!--        <div class="logo">-->
        <!--        <img src="../../assets/logo.png">-->
        <!--        </div>-->
      </div>
      <div class="registerBox">
        <div class="registerCon">
          <p class="title">欢迎注册C2C众包平台</p>

          <el-card shadow="always" class="register-module" >
            <div slot="header" class="clearfix formTitlt">
              <span>注册</span>

            </div>
            <el-form :model="registerForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item >
                <el-input prefix-icon="el-icon-user" type="text" v-model.number="registerForm.username" auto-complete="off" placeholder="用户名" clearable></el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.password" auto-complete="off"
                          placeholder="密码" show-password></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.checkpassword" auto-complete="off"
                          placeholder="确认密码" show-password></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">注册</el-button>
              </el-form-item>
              <p class="smalltxt">
                <router-link class="a" to="login">登陆</router-link>

              </p>
            </el-form>
          </el-card>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {fetch_register} from "../../api/user_apis";

  export default {
    data () {
      return {
        registerForm: {
          username: "",
          password:"",
          checkpassword:"",
        }
      }
    },
    methods: {
      submitForm () {
        let that = this
        if (this.registerForm.username === "" || this.registerForm.password === "") {
          this.$message({
            showClose: true,
            message: "账号或密码不能为空",
            type: "error"
          })
          return false
        } else {
          console.log("submit auccess!")
          if(this.registerForm.password!=this.registerForm.checkpassword)
          {
            this.$message({
              showClose: true,
              message: "两次密码输入不一致",
              type: "error"
            })
          }
        else{
          let data ={'user_account':this.registerForm.username,'user_passwd':this.registerForm.password};
          fetch_register(data)
              .then(res => {
                console.log('数据是:', res);

                if(res.msg=="成功！")
                {
                  this.messages();
                }else  if(res.msg=="注册失败，用户名已存在")
                {
                  this.unmessages();
                }
              })
              .catch((e) => {
                console.log('获取数据失败');
                this.errmessages();
              })
          }


        }
      },
      messages()
      {
        this.$message({
          showClose: true,
          message: '注册成功，进入发布任务界面',
          type: 'success'
        });
      },
      unmessages()
      {
        this.$message({
          showClose: true,
          message: '注册失败，用户名已存在',
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
  #register {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
  }
  #register .registerConbox {
    background: #2d3a4b;

  }
  #register .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
  }
  #register .header .logo {
    margin-left: 30px;
    width: 500px;
    float: left;
    height: 40px;
    padding-top: 10px;
  }
  #register .header .logo img {
    height: 100%;
  }
  #register .registerBox {
    padding: 74px 0 118px;
  }
  #register .registerBox .iconcolor {
    color: #409EFF;
  }
  #register .registerBox .registerCon {
    /*width: 990px;*/
    /*margin: auto;*/
    /*position: relative;*/
    /*height: 900px;*/
    width: 360px;
    margin: 0 auto;
    position: relative;
    height: 900px;
  }
  #register .registerBox .registerCon .el-card__header {
    border-bottom: 0px;
  }
  #register .registerBox .registerCon .title {
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    width: 500px;
    float: left;
    margin-top: 0px;
  }

  #register .registerBox .registerCon .register-module {
    width: 360px;
    height: 360px;
    margin-top: 20px;
    position: relative;
  }
  #register .registerBox .registerCon .register-module .formTitlt {
    font-size: 18px;
    font-weight: 400;
  }
  #register .registerBox .registerCon .register-module .formTitlt .titIconbox {
    float: right;
  }
  #register .registerBox .registerCon .register-module .formTitlt .titIconbox .pointer {
    cursor: pointer;
  }
  #register .registerBox .registerCon .register-module .smalltxt {
    text-align: right;
  }
  #register .registerBox .registerCon .register-module .smalltxt .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    margin-left: 8px;
  }
  #register .registerBox .registerCon .el-form-item__content {
    margin-left: 0px !important;
  }
  #register .registerBox .registerCon .el-form-item__content .subBtn {
    width: 100%;
  }
  #register .registerBox .el-input__inner, #register .registerBox .el-button, #register .registerBox .el-card, #register .registerBox .el-message {
    border-radius: 0px !important;
  }
  #register .registerBox .el-form-item__content .ico {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 999;
    width: 40px;
    height: 39px;
    text-align: center;
    border-right: 1px solid #ccc;
  }
  #register .registerBox .ewmbox {
    width: 100%;
    height: 240px;
    margin-top: -25px;
  }
  #register .registerBox .ewmbox .ewm {
    width: 140px;
    height: 140px;
    margin: 20px auto;
  }
  #register .registerBox .ewmbox .ewm p {
    font-size: 12px;
    padding-left: 40px;
    margin: 0;
  }
  #register .registerBox .ewmbox .ewmicon {
    width: 140px;
    margin: 15px auto 0;
  }
  #register .registerBox .ewmbox .ewmicon .iconfont {
    float: left;
  }
  #register .registerBox .ewmbox .ewmicon p {
    font-size: 12px;
    padding-left: 30px;
    padding-top: 5px;
    margin: 0;
    text-align: center;
  }
</style>
