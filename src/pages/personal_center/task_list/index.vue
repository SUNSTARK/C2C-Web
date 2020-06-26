<template>
  <el-main>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部任务" name="all">
        <task-list-table :tableData="tableData"></task-list-table>
      </el-tab-pane>
      <el-tab-pane label="正在执行" name="executing">
        <task-list-table :tableData="tableData"></task-list-table>
      </el-tab-pane>
      <el-tab-pane label="正在被执行" name="executed">正在被执行</el-tab-pane>
      <el-tab-pane label="已完成" name="completed">已完成</el-tab-pane>
      <el-tab-pane label="已被完成" name="end">已被完成</el-tab-pane>
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

  export default {
    name: "task_list",
    components: {taskListTable},
    data() {
      return {
        activeName: 'all',
        tableData: [],
      }
    },
    mounted() {
      fetch_task_list().then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name === 'all') {
          fetch_task_list().then(res => {
            console.log(res)
            this.tableData = res.data
          })
        } else if (tab.name === 'executing') {
          fetch_task_executing().then(res => {
            console.log(res)
            this.tableData = res.data
          })
        } else if (tab.name === 'executed') {
          fetch_task_executed().then(res => {
            console.log(res)
            this.tableData = res.data
          })
        } else if (tab.name === 'completed') {
          fetch_task_completed().then(res => {
            console.log(res)
            this.tableData = res.data
          })
        } else if (tab.name === 'end') {
          fetch_task_end().then(res => {
            console.log(res)
            this.tableData = res.data
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
</style>
