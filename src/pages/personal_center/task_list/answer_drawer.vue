<template>
  <el-drawer
    title="答案列表"
    :visible.sync="isDrawerShow"
    :modal-append-to-body="false"
    direction="rtl"
    :before-close="handleClose">
    <template v-for="answer in answers">
      <el-card :body-style="{ padding: '10px'}" style="margin: 10px;">
        <div>
          <span>匿名用户</span>
          <div style="margin: 10px 10px 0 10px">{{ answer.ans_body }}</div>
          <el-button type="text" style="float: right;">评价</el-button>
        </div>
      </el-card>
    </template>
  </el-drawer>
</template>

<script>
  export default {
    name: "answer_drawer",
    props: {
      isDrawerShow: {
        required: true,
        type: Boolean
      },
      answers: {
        required: true,
        type: Array
      }
    },
    methods: {
      handleClose(done) {
        this.$emit("closeDrawer")
        // done()
      }
    }
  }
</script>

<style>
  .el-drawer {
    overflow: auto;
  }
</style>
