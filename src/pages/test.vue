<template>
  <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
</template>

<style>

</style>
<script>
  export default {
    methods:{
      submitForm () {
        // 真实请求参考
        this.$axios.get('/admin/task/display/allTask').then(res => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        }).catch(res => {
          this.$message({
            showClose: true,
            message: res,
            type: "error"
          })
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
