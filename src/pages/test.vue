<!--该页面仅用于测试功能-->
<template>
  <div class="test">
    <el-row>
      <el-col :xs="12" :sm="15" :md="18" :lg="24">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "test",
      data() {
        return {
          loginForm: {
            username: "test",
            password: "test"
          }
        }
      }
    }
</script>

<style scoped>
  .test {
    margin-left: 37%;
  }
  .login-module {
    width: 380px;
    height: 305px;
    margin-top: 20px;
    border: none;
    position: relative;
  }
  .login-module .formTitlt {
    font-size: 18px;
    font-weight: 400;
    text-align: center;
  }
  .login-module .smalltxt {
    text-align: right;
  }
  .login-module .smalltxt .a {
    text-decoration: none;
    color: #999999;
    font-size: 12px;
    margin-left: 8px;
  }
</style>
