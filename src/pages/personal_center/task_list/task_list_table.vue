<template>
  <el-main style="min-height: calc(100vh - 200px);">
    <el-table
      stripe
      v-loading="loading"
      :data="tableData"
      style="width: 100%; overflow: auto;"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="expandSelect"
      @row-click="rowClick"
      max-height="calc(100vh - 240px)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="详情">
              <span>{{props.row.detail}} </span>
            </el-form-item>
            <el-form-item label="酬金">
              <span>{{props.row.budget}} 元</span>
            </el-form-item>
            <el-form-item label="地点">
              <span>{{props.row.location}} </span>
            </el-form-item>
            <el-form-item label="需要完成">
              <span>{{props.row.target_num}} 份</span>
            </el-form-item>
            <el-form-item label="已完成">
              <span>{{props.row.complete_taskNum}} 份</span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span v-if="props.row.check_state === 1">通过</span>
              <span v-if="props.row.check_state === 2">未通过</span>
              <span v-if="props.row.check_state === 0">待审核</span>
            </el-form-item>
            <el-form-item label="任务状态">
              <span v-if="props.row.task_state === 0">待审核</span>
              <span v-if="props.row.task_state === 1">审核通过暂未发布</span>
              <span v-if="props.row.task_state === 2">正在发布</span>
              <span v-if="props.row.task_state === 3">发布结束</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="任务标签"
        prop="task_tag">
      </el-table-column>
      <el-table-column
        align="center"
        label="任务名称"
        prop="task_name">
      </el-table-column>
      <el-table-column
        align="center"
        label="发布时间"
        prop="release_time">
      </el-table-column>
      <el-table-column
        align="center"
        label="截至时间"
        prop="end_time">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        v-if="buttonList.length>0">
        <template slot-scope="scope">
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.ACCEPT)"
            size="mini"
            type="primary"
            @click.stop="accept(scope.row)">接受
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.CANCEL)"
            size="mini"
            type="danger"
            @click.stop="cancel(scope.row)">取消
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.STOP)"
            size="mini"
            type="warning"
            @click.stop="stop(scope.row)">拉黑
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.COMPLETED)"
            size="mini"
            type="success"
            @click.stop="completed(scope.row)">完成
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.COMMENT)"
            size="mini"
            type="success"
            @click.stop="comment(scope.row)">查看答案
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <answer-drawer :isDrawerShow="isDrawerShow" :answers="answers" @closeDrawer="closeDrawer" @callComment="callComment"></answer-drawer>
  </el-main>

</template>

<script>
  import answerDrawer from "./answer_drawer";
  import {fetch_task_getanswer} from "../../../api/user_apis";
  import {fetchPost} from "../../../api/axios";

  export default {
    inject:['reload'],
    name: "task_list_table",
    components: {answerDrawer},
    props: {
      loading:{
        required: true,
        type: Boolean
      },
      tableData: {
        required: true,
        type: Array
      },
      buttonList: {
        required: true,
        type: Array,
      },
      buttonTypeEnum: {
        type: Object
      }
    },
    data() {
      return {
        isDrawerShow: false,
        answers: [],
        expands: [],  // 要展开的行，元素是row的key值，用于一次只能展开一行
        logmessage:'',
        unlogmessage:'',
        currentTaskRow:''
      }
    },
    methods: {
      callComment() {
        this.comment(this.currentTaskRow)
      },
      closeDrawer() {
        this.isDrawerShow = false;
      },
      getRowKeys:function(row){
        return row.task_id
      },
      // 折叠面板每次只能展开一行，用于点击按钮操作
      expandSelect:function(row, expandedRows) {
        let that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.task_id)
          }
        }
        else {
          that.expands = [] // 默认不展开
        }
      },
      // 折叠面板每次只能展开一行，用于点击行操作
      rowClick(row) {
        let that = this
        let firstClick = true // 用于判断是否重复点击该行
        if (that.expands.length === 0) {
          that.expands.push(row.task_id)
        } else {
          if (that.expands[0] === row.task_id) {  // 已展开的行和点击的行相同
            that.expands = []
            firstClick = !firstClick
          }
          if (firstClick) {  // 第一次点击该行，则展开
            that.expands = [row.task_id];
            firstClick = !firstClick
          }else {  // 重复点击该行，则收起所有
            that.expands = []
            firstClick = !firstClick
          }
        }
      },
      //接受任务 成功
      accept(row) {
        // console.log('接受任务')
        console.log('任务编号:'+row.task_id)
        let url="/user/task/accepting/?task_id=";
        url=url+row.task_id;
        // console.log(url)
        fetchPost(url,{}).then(res => {
            // console.log('数据是:', res);
            if(res.msg=="成功！") {
              this.logmessage="接受任务成功，请及时完成任务！"
              this.messages();
              this.reload()
            }else if(res.msg=="早已选择该任务") {
              this.unlogmessage="早已选择该任务,请选择其他任务！"
              this.unmessages();
            }
          }).catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })

        // fetch_accept_task({task_id: row.task_id}).then(res => console.log(res))
      },
      //取消任务 接受了取消 成功
      cancel(row) {
        // console.log('接受后取消任务')
        console.log('任务编号:'+row.task_id)
        let url="/user/task/quiting/?task_id=";
        url=url+row.task_id;
        // console.log(url)
        fetchPost(url,{}).then(res => {
            // console.log('数据是:', res);
            if(res.code==200) {
              this.logmessage="取消任务成功！"
              this.messages();
              this.reload()
            }
          }).catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })

       // fetch_cancel_task({task_id: row.task_id}).then(res => console.log(res))
      },
      //拉黑任务，不再出现到任务大厅  成功
      stop(row) {
        // console.log('拉黑任务')
        console.log('任务编号:'+row.task_id)
        let url="/user/task/rejecting/?task_id=";
        url=url+row.task_id;
        // console.log(url)
        fetchPost(url,{}).then(res => {
            // console.log('数据是:', res);
            if(res.code==200) {
              this.logmessage="拉黑任务成功！"
              this.messages();
              this.reload()
            }
          }).catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })

      },
      //无用
      completed(row) {
        console.log('完成任务')
      },
      //查看并评价答案
      comment(row) {
        this.answers = []
        this.isDrawerShow = true;
        this.currentTaskRow = row
        // console.log('任务编号:'+row.task_id)
        let params= {task_id:row.task_id};
        fetch_task_getanswer(params).then(res => {
            console.log('数据是:', res);
            if(res.code==200) {
              this.answers=res.data;
              console.log("获取答案成功");
            }
          }).catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })


        // this.answers = [{
        //   ans_body: "test",
        //   ans_id: 1,
        // }, {
        //   ans_body: "test",
        //   ans_id: 1,
        // }, {
        //   ans_body: "test",
        //   ans_id: 1,
        // }, {
        //   ans_body: "test",
        //   ans_id: 1,
        // },]
        // fetch_task_get_answer({task_id: row.task_id}).then(res => {
        //   console.log(res)
        //   this.answers = res.data;
        // })
      },
      messages() {
        this.$message({
          showClose: true,
          message: this.logmessage,
          type: 'success'
        });
      },
      unmessages() {
        this.$message({
          showClose: true,
          message: this.unlogmessage,
          type: 'error'
        });
      },
      errmessages() {
        this.$message({
          showClose: true,
          message: '出bug了,联系管理员',
          type: 'warning'
        });
      },
    },
  }
</script>

<style>
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    font-weight: 600;
  }
  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }
</style>
