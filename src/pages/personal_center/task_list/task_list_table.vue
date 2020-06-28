<template>
  <el-main style="min-height: calc(100vh - 200px);">
    <el-table
      stripe
      :data="tableData"
      style="width: 100%; overflow: initial;"
      max-height="calc(100vh - 240px)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="任务描述">
              <span>{{props.row.detail}} </span>
            </el-form-item>
            <el-form-item label="任务预算">
              <span>{{props.row.budget}} </span>
            </el-form-item>
            <el-form-item label="发布地点">
              <span>{{props.row.location}} </span>
            </el-form-item>
            <el-form-item label="目标套数">
              <span>{{props.row.target_num}} </span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>{{props.row.check_state}} </span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{props.row.task_state}} </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="名称"
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
            @click="accept(scope.row)">接受
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.CANCEL)"
            size="mini"
            type="danger"
            @click="cancel(scope.row)">取消
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.STOP)"
            size="mini"
            type="warning"
            @click="stop(scope.row)">拉黑
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.COMPLETED)"
            size="mini"
            type="success"
            @click="completed(scope.row)">完成
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.COMMENT)"
            size="mini"
            type="success"
            @click="comment(scope.row)">查看答案
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <answer-drawer :isDrawerShow="isDrawerShow" :answers="answers" @closeDrawer="closeDrawer"></answer-drawer>
  </el-main>
</template>

<script>
  import answerDrawer from "./answer_drawer";
  import {fetch_accept_task, fetch_cancel_task, fetch_editpwd,fetch_reject_task ,fetch_task_getanswer} from "../../../api/user_apis";
  import Cookies from "js-cookie";
  import {fetchGet, fetchPost} from "../../../api/axios";

  export default {
    name: "task_list_table",
    components: {answerDrawer},
    props: {
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
        logmessage:'',
        unlogmessage:''
      }
    },
    methods: {
      closeDrawer() {
        this.isDrawerShow = false;
      },
      //接受任务 成功
      accept(row) {
        console.log('接受任务')
        console.log('任务编号:'+row.task_id)
        let url="/user/task/accepting/?task_id=";
        url=url+row.task_id;
        console.log(url)
        fetchPost(url,{})
          .then(res => {
            console.log('数据是:', res);
            if(res.msg=="成功！")
            {
              this.logmessage="接受任务成功，请及时完成任务！"
              this.messages();

            }else  if(res.msg=="早已选择该任务")
            {
              this.unlogmessage="早已选择该任务,请选择其他任务！"
              this.unmessages();
            }
          })
          .catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })

        // fetch_accept_task({task_id: row.task_id}).then(res => console.log(res))
      },
      //取消任务 接受了取消 成功
      cancel(row) {
        console.log('接受后取消任务')
        console.log('任务编号:'+row.task_id)
        let url="/user/task/quiting/?task_id=";
        url=url+row.task_id;
        console.log(url)
        fetchPost(url,{})
          .then(res => {
            console.log('数据是:', res);
            if(res.msg=="成功！")
            {
              this.logmessage="取消任务成功！"
              this.messages();

            }
          })
          .catch((e) => {
            console.log('获取数据失败');
            this.errmessages();
          })

       // fetch_cancel_task({task_id: row.task_id}).then(res => console.log(res))
      },
      //拉黑任务，不再出现到任务大厅  成功
      stop(row) {
        console.log('拉黑任务')
        console.log('任务编号:'+row.task_id)
        let url="/user/task/rejecting/?task_id=";
        url=url+row.task_id;
        console.log(url)
        fetchPost(url,{})
          .then(res => {
            console.log('数据是:', res);
            if(res.msg=="成功！")
            {
              this.logmessage="拉黑任务成功！"
              this.messages();
            }
          })
          .catch((e) => {
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
        this.isDrawerShow = true;
        console.log("查看答案");
        console.log('任务编号:'+row.task_id)
        let params= {task_id:row.task_id};
        fetch_task_getanswer(params)
          .then(res => {
            console.log('数据是:', res);
            if(res.msg=="成功！")
            {
              this.answers=res.data;
              console.log("获取答案成功");

            }
          })
          .catch((e) => {
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
      messages()
      {
        this.$message({
          showClose: true,
          message: this.logmessage,
          type: 'success'
        });
      },
      unmessages()
      {
        this.$message({
          showClose: true,
          message: this.unlogmessage,
          type: 'error'
        });
      },
      errmessages()
      {
        this.$message({
          showClose: true,
          message: '出bug了,联系管理员',
          type: 'warning'
        });
      },
    },
  }
</script>
