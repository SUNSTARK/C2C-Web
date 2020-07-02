<template>
  <div>
    <div class="title">
      <h3>待审核任务<el-button type="text" icon="el-icon-refresh" circle style="float: right" @click="this.getTask">刷新</el-button></h3>
    </div>
    <div class="autoPass" style="width: 100%">
      <template>
        <span style="font-size: 15px;font-weight: bold">过滤词设置：<span style="font-size: 13px;font-weight: bold">(某任务的内容含有过滤词时，将不会被自动通过，需人工审核)</span></span>
        <el-select
          v-model="selectValue"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择过滤词，支持输入进行自定义，仅过滤任务内容"
          style="width: calc(100% - 120px);margin-top: 7px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="success" size="mini" icon="el-icon-upload2" @click="autoPass" style="margin-left: 10px">自动通过</el-button>
      </template>
    </div>
    <template>
      <div class="container_table" style="margin-top: 10px">
        <el-table
          v-loading="loading"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            align="center"
            prop="task_id"
            label="任务ID"
            sortable
            width="110">
          </el-table-column>
          <el-table-column
            align="left"
            prop="task_name"
            label="任务标题">
          </el-table-column>
          <el-table-column
            align="left"
            prop="detail"
            label="任务内容">
          </el-table-column>
          <el-table-column
            align="center"
            prop="release_time"
            sortable
            label="开始时间">
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-check"
                size="mini"
                type="success"
                @click="handlePost(scope.row)">通过</el-button>
              <el-button
                icon="el-icon-close"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8, 15, 25]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next"
            :total="tableData.length"
            prev-text="上一页"
            next-text="下一页">
          </el-pagination>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {fetch_uncheck, pass_task,reject_task} from "../../api/admin_apis";
  export default {
    inject:['reload'],
    name:'list11',
    data() {
      return {
        currentPage: 1,  // 默认显示页面为1
        pagesize: 8,  // 每页的数据条数
        loading: true, // 表格默认开启加载，获取到数据后设置为false
        tableData: [],  //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
        selectValue: [], // 绑定过滤词选择框
        autoPassTaskID:[], // 符合条件的taskID
        options: [{
          value: '黄',
          label: '黄'
        }, {
          value: '赌',
          label: '赌'
        }, {
          value: '毒',
          label: '毒'
        }]
      }
    } ,
    watch:{
      name:function(){
        this.show();
      }
    },
    methods: {
      async autoPass() {
        if (this.selectValue.length == 0) {
          this.$message.error({
            message:'请至少输入一个汉字'
          })
          return
        }
        this.autoPassTaskID = []
        for (let item in this.tableData) {
          this.autoPassTaskID.push(this.tableData[item].task_id)
          this.forbiddenValidation(this.tableData[item].detail, this.tableData[item].task_id)
        }
        this.$notify.info({
          title:'提示',
          message:'自动通过进行中，请稍后',
        })
        for (let item in this.autoPassTaskID) {
          let id ={'task_id': this.autoPassTaskID[item]}
          await pass_task(id).then(res => {
            console.log(res)
            this.loading = true
          }).catch(err =>{
              console.log(err)
          })
        }
        this.$notify.close()
        this.reload()
        this.$notify.success({
          title:'提示',
          message:'自动通过已完成!'
        })
      },
      forbiddenValidation(str, index) {
        //定义敏感字符
        let re = '';
        for (let opt in this.selectValue) {
          if (opt == this.selectValue.length - 1) {
            re += this.selectValue[opt];
          }else{
            re += this.selectValue[opt] + "|";
          }
        }
        //定义正则表示式对象
        //利用RegExp可以动态生成正则表示式\
        // console.log(re)
        const pattern = new RegExp(re, "gm");
        if (pattern.test(str)) {
          this.autoPassTaskID.splice(this.autoPassTaskID.findIndex(item=> item=== index),1)
          console.log("有敏感词!!!  "+index);
          return false;
        } else {
          console.log("没有敏感词");
          return true;
        }
      },
      getTask(){
        fetch_uncheck().then(res => {
          this.tableData = []
          this.tableData = res.data
          // console.log(res.data)
          this.loading = false
        }).catch(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error!"
          })
        })
      },
      //上架任务
      handlePost (row) {
        let id ={'task_id': row.task_id}
        pass_task(id).then(res=> {
          if (res.code === 200) {
            this.loading = true
            this.getTask()
            this.$message({
              showClose: true,
              message: '任务上架成功!',
              type: "success"
            })
          }
        }
        ).catch(err=> {
          console.log(err)
        })
      },
      handleDelete (row) {
        let id ={'task_id': row.task_id}
        reject_task(id).then(res=> {
          if (res.code === 200) {
            this.loading = true
            this.getTask()
            this.$message({
              showClose: true,
              message: '任务退回成功!',
              type: "success"
            })
          }
        }
        ).catch(err=> {
          console.log(err)
        })
      },
      //每页下拉显示数据
      handleSizeChange: function(size) {
        this.pagesize = size;
      },
      //点击第几页
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
      }
    },
    created:function(){
      this.getTask();
    }
  };
</script>

<style scoped>
  h3{
    margin: 0px 0 10px;
    font-weight: 800;
    color: #409eff;
    font-size: 22px;
  }
  p{
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
  .pagination{
    text-align: center;
  }

  .fl{
    float: right;
    margin-right:20px;
  }
  .fy{
    text-align:center;
    margin-top:30px;
  }
</style>
