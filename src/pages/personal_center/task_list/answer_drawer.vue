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

          <div><p >{{ answer.ans_body }}</p><br/>
            <div style="text-align: center">
            <el-image
              v-if="answer.img!=null"
              style="width: 100%; height: 100%;margin-bottom: 10px"
              :src='answer.img'
              :previewSrcList=[answer.img]>
            </el-image>
            </div>
          </div>
          <el-button v-if="answer.score===0" type="warning" size="mini" style="float: right;margin-bottom: 10px" @click="showRateDialog(index)" icon="el-icon-star-on" >评分</el-button>
        <el-button v-else type="warning" size="mini" style="float: right;margin-bottom: 10px" @click="showRateDialog(index)" icon="el-icon-star-on" disabled>已评分</el-button>
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
        if (this.score > 0) {
          let data={
            'id':this.ans_id,
            'score':this.score
          }
          fetch_task_score_answer(data).then(res => {
            console.log('数据是:', res);
            if(res.code == 200) {
              console.log("评价成功!");
              this.messages()
              this.$emit('callComment')  // 父组件方法，重新获取答案
            }
          }).catch(err => {
            console.log('获取数据失败\n'+err);
            this.errmessages();
          })
          this.dialogVisible = false;
          this.score = null;
          this.ans_id = null;
        } else {
          this.$message.error({
            message:'请最少打1分!',
            duration:2000
          })
        }
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
