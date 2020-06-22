<template>
  <el-button class="subBtn" type="primary" @click="submitForm1">登录</el-button>
</template>

<style>

</style>
<script>
  import {stop_task,pass_task,reject_task,fetch_task1Day} from "../api/admin_apis";
  export default {
    methods:{
      submitForm () {
        let dates = ['2020-06-18', '2020-06-19']
        let result = []
        for (let item in dates) {
          let params = {'dateStart':dates[item]}
          fetch_task1Day(params).then(res => {
            // console.log(res.data)
            // result.push(res.data)
            result[item] = res.data
            console.log(result)
          }).catch(err => {
            console.log(err)
          })
        }
        console.log('当前数组：'+result.length)
        this.$store.dispatch("setperDayTask", result)
        console.log('store里的数组为：'+this.$store.getters.perDayTask)
        // console.log('当前cookie:\n'+Cookies.get('token'))
      },
      submitForm1 () {
          let params = {'dateStart': '2020-06-18'}
          fetch_task1Day(params).then(res => {
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
