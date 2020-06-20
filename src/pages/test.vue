<template>
  <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
</template>

<style>

</style>
<script>
  import {fetch_taskState, fetch_points, fetch_allTask, fetch_uncheck, stop_task} from "../api/apis";
  import Cookies from "js-cookie"
  export default {
    methods:{
      submitForm () {
        console.log('当前cookie:\n'+Cookies.get('token'))
        let params = {'test':1}
        stop_task(params).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      message () {
        const h = this.$createElement
        this.$notify({
          title: "账号密码",
          message: h("i", {style: "color: teal"}, "账号密码随意填写，测试时被存储为临时假token"),
          duration: 1000
        })
      }
    },
    mounted () {
      this.message()
    }
  }
</script>
