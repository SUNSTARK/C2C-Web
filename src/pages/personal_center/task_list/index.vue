<template>
  <el-main class="tab-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="tab in tabs">
        <el-tab-pane :label="tab.label" :name="tab.name">
          <task-list-table :tableData="tableData" :buttonTypeEnum="buttonTypeEnum"
                           :buttonList="buttonList"></task-list-table>
        </el-tab-pane>
      </template>
    </el-tabs>

  </el-main>
</template>

<script>
  import taskListTable from "./task_list_table";
  import {
    fetch_task_list,
    fetch_task_executing,
    fetch_task_executed,
    fetch_task_completed,
    fetch_task_end
  } from "../../../api/user_apis";

  const tabs_list = [
    {
      label: '任务大厅',
      name: 'all'
    },
    {
      label: '执行中',
      name: 'executing'
    },
    {
      label: '已完成',
      name: 'completed'
    },
  ];
  const tabs_mine = [
    {
      label: '发布中',
      name: 'executed'
    },
    {
      label: '未过审',
      name: 'fail'
    },
    {
      label: '已结束',
      name: 'end'
    }
  ]

  export default {
    name: "task_list",
    components: {taskListTable},
    data() {
      return {
        activeName: 'all',
        tabs: [],
        tableData: [],
        buttonTypeEnum: {
          ACCEPT: 0,  //接受任务
          CANCEL: 1,  //放弃任务
          STOP: 2,     //拒绝任务
          COMPLETED: 3,  //完成任务
          COMMENT: 4, //评价任务
        },
        buttonList: []
      }
    },
    mounted() {
      const path = window.location.hash;
      if (path === "#/user/task/list") {
        this.tabs = tabs_list;
        this.handleClick({name: "all"})
      } else if (path === "#/user/task/mine") {
        this.tabs = tabs_mine;
        this.activeName = "executed";
        this.handleClick({name: "executed"})
      }
    },
    methods: {
      handleClick(tab) {
        //全部
        if (tab.name === 'all') {
          fetch_task_list().then(res => {
            // console.log(res)
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.ACCEPT,this.buttonTypeEnum.STOP];
          })
          //正在完成  别人的任务 接收方
        } else if (tab.name === 'executing') {
          fetch_task_executing().then(res => {
            // console.log(res)
            this.tableData = res.data;
            this.buttonList = [ this.buttonTypeEnum.CANCEL];
          })
          //正在发布中  发布方
        } else if (tab.name === 'executed') {
          fetch_task_executed().then(res => {
            console.log(res)
            this.tableData = res.data;
            let failCount = 0
            for (let item in this.tableData) {
              if (this.tableData[item].check_state === 2) { // 统计未过审的
                failCount += 1
              }
            }
            for (let item in this.tableData) {
              if (this.tableData[item].check_state === 2)  // 剔除未过审的
                this.tableData.splice(item, failCount)
            }
            this.buttonList = [];
          })
          //已完成的任务   ？
        } else if (tab.name === 'completed') {
          fetch_task_completed().then(res => {
            console.log(res)
            this.tableData = res.data
            this.buttonList = [];
          })
          //已被完成    自己的任务
        } else if (tab.name === 'end') {
          fetch_task_end().then(res => {
            console.log(res)
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.COMMENT];
          })
          // 未过审的  发布方
        } else if (tab.name === 'fail') {
          fetch_task_executed().then(res => {
            this.tableData = res.data;
            let passCount = 0
            for (let item in this.tableData) {
              if (this.tableData[item].check_state === 1) { // 统计过审的
                passCount += 1
              }
            }
            for (let item in this.tableData) {
              if (this.tableData[item].check_state === 1) { // 剔除过审的
                this.tableData.splice(item, passCount)
              }
            }
            this.buttonList = [];
          })
        }
      },
    },
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    padding: 0 5%;
  }

  .tab-wrap {
    margin-left: 20px;
    background-color: #fff;
    overflow: hidden;
    height: 93%;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
