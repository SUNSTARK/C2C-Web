<template>
  <el-drawer
    title="答案列表"
    :visible.sync="isDrawerShow"
    :modal-append-to-body="false"
    :modal="false"
    direction="rtl"
    :before-close="handleClose">
    <template v-for="(answer, index) in answers">
      <el-card :body-style="{ padding: '10px'}" style="margin: 10px;">
        <div>
          <span>匿名用户</span>
          <div style="margin: 10px 10px 0 10px">{{ answer.ans_body }}</div>
          <el-button type="text" style="float: right;" @click="showRateDialog(index)">评分</el-button>
        </div>
      </el-card>
    </template>

    <el-dialog
      title="评分"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
      :before-close="handleClose">
      <el-rate v-model="score"></el-rate>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="rating">确 定</el-button>
  </span>
    </el-dialog>
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
    data() {
      return {
        score: null,
        dialogVisible: false,
        asn_id: null,
      }
    },
    methods: {
      handleClose(done) {
        this.$emit("closeDrawer");
        // done()
      },
      showRateDialog(index) {
        this.dialogVisible = true;
        this.ans_id = this.answers[index].ans_id;
      },
      rating() {
        console.log(`评分---score:${this.score},ans_id:${this.ans_id}`);
        this.dialogVisible = false;
        this.score = null;
        this.ans_id = null;
      }
    }
  }
</script>

<style>
  .el-drawer {
    overflow: auto;
  }
</style>
