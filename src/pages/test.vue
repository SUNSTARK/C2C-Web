<template>
  <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
</template>

<style>

</style>
<script>
  import {stop_task,pass_task,reject_task,fetch_task1Day} from "../api/apis";
  import Cookies from "js-cookie"
  export default {
    methods:{
      submitForm () {
        console.log('当前cookie:\n'+Cookies.get('token'))
        let data = {'task_id':2}
        stop_task(data).then(res => {
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
