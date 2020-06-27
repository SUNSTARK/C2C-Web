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
            @click="cancel(scope.row)">放弃
          </el-button>
          <el-button
            v-if="buttonList.includes(buttonTypeEnum.STOP)"
            size="mini"
            type="warning"
            @click="stop(scope.row)">中止
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
  import {fetch_accept_task, fetch_cancel_task, fetch_task_get_answer} from "../../../api/user_apis";

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
        answers: []
      }
    },
    methods: {
      closeDrawer() {
        this.isDrawerShow = false;
      },
      accept(row) {
        console.log('接受任务')
        // fetch_accept_task({task_id: row.task_id}).then(res => console.log(res))
      },
      cancel(row) {
        console.log('放弃任务', row)
        fetch_cancel_task({task_id: row.task_id}).then(res => console.log(res))
      },
      stop(row) {
        console.log('中止任务')
      },
      completed(row) {
        console.log('完成任务')
      },
      comment(row) {
        this.isDrawerShow = true;
        this.answers = [{
          ans_body: "test",
          ans_id: 1,
        }, {
          ans_body: "test",
          ans_id: 1,
        }, {
          ans_body: "test",
          ans_id: 1,
        }, {
          ans_body: "test",
          ans_id: 1,
        },]
        // fetch_task_get_answer({task_id: row.task_id}).then(res => {
        //   console.log(res)
        //   this.answers = res.data;
        // })
      },
    },
  }
</script>
