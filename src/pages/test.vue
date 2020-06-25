<template>
  <el-button class="subBtn" type="primary" @click="submitForm1">登录</el-button>
</template>

<style>

</style>
<script>
  import {stop_task,pass_task,reject_task,fetch_task1Day,fetch_allTask,fetch_uncheck} from "../api/admin_apis";
  import {fetch_login} from "../api/user_apis";

  export default {
    methods:{
      submitForm1 () {
          let params = {'task_id': 56}
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
