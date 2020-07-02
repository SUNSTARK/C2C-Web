<template>
  <el-main class="tab-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="tab in tabs">
        <el-tab-pane :label="tab.label" :name="tab.name">
          <task-list-table :tableData="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                           :buttonTypeEnum="buttonTypeEnum"
                           :buttonList="buttonList"
                           :loading="loading"
                           @callHandleClick="callHandleClick"></task-list-table>
        </el-tab-pane>
      </template>
    </el-tabs>
    <el-pagination
      layout="total, prev, pager, next"
      :total="tableData.length"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
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
    fetch_task_end,
    fech_checking_task
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
      label: '审核中',
      name: 'checking'
    },
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
        currentPage: 1,  // 默认显示页面为1
        pagesize: 8,  // 每页的数据条数
        activeName: 'all',
        currentTab: '',
        tabs: [],
        tableData: [],
        loading: true, // 表格默认开启加载，获取到数据后设置为false
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
        this.activeName = "checking";
        this.handleClick({name: "checking"})
      }
    },
    methods: {
      callHandleClick() {
        this.handleClick(this.currentTab)
      },
      //点击第几页
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
      },
      async handleClick(tab) {
        this.tableData = []
        //全部
        if (tab.name === 'all') {
          await fetch_task_list().then(res => {
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.ACCEPT,this.buttonTypeEnum.STOP];
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          //正在完成  别人的任务 接收方
        } else if (tab.name === 'executing') {
          await fetch_task_executing().then(res => {
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.CANCEL];
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          //正在发布中  发布方
        } else if (tab.name === 'executed') {
          await fetch_task_executed().then(res => {
            for (let item in res.data) {
              if (res.data[item].check_state === 1) { // 将过审的添加到tableData
                this.tableData.push(res.data[item])
              }
            }
            this.buttonList = [this.buttonTypeEnum.COMMENT];
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          //接收方  已完成的任务
        } else if (tab.name === 'completed') {
          await fetch_task_completed().then(res => {
            this.tableData = res.data
            this.buttonList = [];
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          //发布方  已结束的任务
        } else if (tab.name === 'end') {
          await fetch_task_end().then(res => {
            this.tableData = res.data;
            this.buttonList = [this.buttonTypeEnum.COMMENT];
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          // 未过审的  发布方
        } else if (tab.name === 'fail') {
          await fetch_task_executed().then(res => {
            for (let item in res.data) {
              if (res.data[item].check_state === 2) { // 将未过审的添加到tableData
                this.tableData.push(res.data[item])
                console.log(res.data[item])
              }
            }
            this.buttonList = [];
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
          // 发布方 获取自己待审核状态的任务
        } else if (tab.name === 'checking') {
          await fech_checking_task().then(res => {
            // this.tableData = []
            this.tableData = res.data;
            this.loading = false
          }).catch(err => {
            console.log(err)
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
    overflow: auto;
    height: 100%;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
