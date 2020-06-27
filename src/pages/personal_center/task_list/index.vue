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

    <el-pagination
      layout="prev, pager, next"
      :total="tableData.length"
      class="pagination">
    </el-pagination>
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
      label: '全部任务',
      name: 'all'
    },
    {
      label: '正在执行',
      name: 'executing'
    },
    {
      label: '已完成',
      name: 'completed'
    },
  ];
  const tabs_mine = [
    {
      label: '正在被执行',
      name: 'executed'
    },
    {
      label: '已被完成',
      name: 'end'
    },
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
      handleClick(tab,) {
        if (tab.name === 'all') {
          fetch_task_list().then(res => {
            console.log(res)
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.ACCEPT];
          })
        } else if (tab.name === 'executing') {
          fetch_task_executing().then(res => {
            console.log(res)
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.COMPLETED, this.buttonTypeEnum.CANCEL];
          })
        } else if (tab.name === 'executed') {
          fetch_task_executed().then(res => {
            console.log(res)
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.CANCEL, this.buttonTypeEnum.STOP];
          })
        } else if (tab.name === 'completed') {
          fetch_task_completed().then(res => {
            console.log(res)
            this.tableData = res.data
            this.buttonList = [];
          })
        } else if (tab.name === 'end') {
          fetch_task_end().then(res => {
            console.log(res)
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.COMMENT];
          })
        }
      }
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
    padding: 0 20px;
    margin: 0 20px;
    background-color: #fff;
    overflow: inherit;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
