<template>
  <el-drawer
    title="答案列表"
    :visible.sync="isDrawerShow"
    :modal-append-to-body="false"
    :modal="false"
    direction="rtl"
    :before-close="handleClose1">
    <template v-for="(answer, index) in answers">
      <el-card :body-style="{ padding: '10px'}" style="margin: 10px;">

          <div slot="header" class="clearfix" style="height: 10px">
            <b><span>用户id:{{answer.user_id}}</span></b>
          </div>

          <div style="margin: 10px 10px 0 10px"><p style="text-indent:2em;">{{ answer.ans_body }}</p><br/>
            <el-image
              v-if="answer.img!=null"
              style="width: 270px; height: 180px"
              :src='answer.img'
              :previewSrcList=[answer.img]>
            </el-image>
          </div>
          <el-button type="text" style="float: right;" @click="showRateDialog(index)">评分</el-button>
      </el-card>
    </template>

    <el-dialog
      title="评分"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
      :before-close="handleClose2">
      <el-rate v-model="score" show-text style="text-align: center"></el-rate>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="rating">确 定</el-button>
  </span>
    </el-dialog>
  </el-drawer>
</template>

<script>
  import {fetch_task_score_answer} from "../../../api/user_apis";

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
        ans_id: null,
      }
    },
    methods: {
      handleClose1(done) {
        this.$emit("closeDrawer");
        // done()
      },
      handleClose2(done) {
        this.dialogVisible=false;
      },
      showRateDialog(index) {
        this.dialogVisible = true;
        this.ans_id = this.answers[index].answer_id;
        console.log("答案id:"+this.ans_id)
      },
      rating() {
        // console.log(`评分---score:${this.score},ans_id:${this.ans_id}`);
        let data={
          'id':this.ans_id,
          'score':this.score
        }
        console.log('发送的数据是：', data)
        fetch_task_score_answer(data).then(res => {
          console.log('数据是:', res);
          if(res.msg=="成功！") {
            console.log("答案评价成功");
            this.messages()
          }
        }).catch(err => {
            console.log('获取数据失败\n'+err);
            // this.errmessages();
          })
        this.dialogVisible = false;
        this.score = null;
        this.ans_id = null;
      },
      messages() {
        this.$message({
          showClose: true,
          message: '评价任务成功！',
          type: 'success'
        });
      },
      errmessages() {
        this.$message({
          showClose: true,
          message: '出bug了,联系管理员',
          type: 'warning'
        });
      },

    }
  }
</script>

<style>
  .el-drawer {
    overflow: auto;
  }
</style>
