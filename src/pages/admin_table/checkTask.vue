<template>
  <div>
    <div class="title">
      <h3 >待审核任务</h3>
    </div>
    <template>
      <div class="container_table">
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
            prop="detail"
            label="任务内容">
          </el-table-column>
          <el-table-column
            align="center"
            prop="release_time"
            sortable
            label="开始时间">
          </el-table-column>
          <el-table-column label="操作" align="center">
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
    name:'list11',
    data() {
      return {
        currentPage: 1,  // 默认显示页面为1
        pagesize: 8,  // 每页的数据条数
        loading: true, // 表格默认开启加载，获取到数据后设置为false
        tableData: []  //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      }
    } ,
    watch:{
      name:function(){
        this.show();
      }
    },
    methods: {
      getTask(){
        fetch_uncheck().then(res => {
          this.tableData = []
          this.tableData = res.data
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
    margin: 0px 0 20px;
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
