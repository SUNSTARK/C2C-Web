<template>
  <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
</template>

<style>

</style>
<script>
  import {pass_task} from "../api/apis";
  export default {
    methods:{
      submitForm () {
        // 真实请求参考
        let data = 17
        pass_task(data).then(res => {
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
