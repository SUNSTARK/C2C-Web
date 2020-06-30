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
              <span>账号注册</span>
            </div>
            <el-form :rules="rules" ref="registerForm" :model="registerForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input ref="input" prefix-icon="el-icon-user" type="text" v-model="registerForm.username" auto-complete="off" placeholder="用户名" clearable></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.password" auto-complete="off"
                          placeholder="密码" show-password ></el-input>
              </el-form-item>
              <el-form-item prop="checkpassword">
                <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.checkpassword" auto-complete="off"
                          placeholder="确认密码" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm('registerForm')">注册</el-button>
              </el-form-item>
              <p class="smalltxt">
                <router-link class="a" to="/login">已有帐号?点击登陆</router-link>
                <router-link class="a" to="/home">返回主页<i class="el-icon-right el-icon--right"></i></router-link>
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
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else if (value.toString().length < 6) {
          callback(new Error("密码长度不能低于6位"))
        } else {
          if (this.registerForm.checkpassword !== "") {
            this.$refs.registerForm.validateField("checkpassword")
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"))
        } else if (value.toString().length < 6) {
          callback(new Error("密码长度不能低于6位"))
        } else if (value !== this.registerForm.password) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          username: '',
          password:'',
          checkpassword:'',
        },
        rules:{
          password: [
            {required: true, validator: validatePass, trigger: "blur"}
          ],
          checkpassword: [
            {required: true, validator: validatePass2, trigger: "blur"}
          ]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                let data ={'user_account':this.registerForm.username,'user_passwd':this.registerForm.password};
                fetch_register(data)
                  .then(res => {
                    if(res.msg=="成功！") {
                      this.messages();
                      this.$router.push('/login')
                    }else if(res.msg=="注册失败，用户名已存在") {
                      console.log("注册失败，用户名已存在")
                      this.resetForm('registerForm')
                      this.unmessages();
                    }
                  })
                  .catch((e) => {
                    console.log('获取数据失败');
                    this.errmessages();
                  })
          } else {
            console.log("error submit!!")
            return false
          }
        })
      },
      messages() {
        this.$notify({
          showClose: true,
          message: '注册成功!',
          type: 'success'
        });
      },
      unmessages() {
        this.$notify.error({
          title:'注册错误',
          message: '注册失败，用户名已存在!',
          type: 'error'
        });
      },
      errmessages() {
        this.$notify.error({
          title:'错误',
          message: '出Bug了，联系管理员!',
          type: 'warning'
        });
      }
    },
    mounted() {
      this.$nextTick(function(){ // 自动聚焦用户名
        this.$refs['input'].focus();
      })
    }
  }
</script>
<style>
  #register {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
    background-color: #21282E;
  }
  #register .header {
    height: 60px;
    position: relative;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
  }
  #register .registerBox .registerCon {
    width: 360px;
    margin: 0 auto;
    position: relative;
  }
  #register .registerBox .registerCon .el-card__header {
    border-bottom: 0px;
  }
  #register .registerBox .registerCon .title {
    font-size: 34px;
    font-weight: 600;
    color: #ffffff;
    margin-top: 100px;
    text-align: center;
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
    margin-left: 10px;
    font-weight: 500;
  }
  #register .registerBox .registerCon .el-form-item__content {
    margin-left: 0px !important;
  }
  #register .registerBox .registerCon .el-form-item__content .subBtn {
    width: 100%;
  }
  #register .registerBox .el-input__inner, #register .registerBox .el-button, #register .registerBox .el-card, #register .registerBox .el-message {
    border-radius: 30px !important;
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
</style>
