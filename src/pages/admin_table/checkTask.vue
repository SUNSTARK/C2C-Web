<template>
  <div>
    <div class="title">
      <h3 >待审核任务</h3>
    </div>
    <template>
      <div class="container_table">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            prop="task_id"
            label="任务ID"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="overview"
            label="任务简介"
            width="180">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="任务内容">
          </el-table-column>
          <el-table-column
            prop="release_time"
            sortable
            label="上传时间">
          </el-table-column>
          <el-table-column
            prop="check_state"
            label="任务状态">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handlePost(scope.$index, scope.row)">通过</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
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
        pagesize: 5,  // 每页的数据条数
        tableData: []  //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      }
    } ,
    watch:{
      name:function(){
        console.log("changed");
        this.show();
      }
    },
    methods: {
      getTask(){
        fetch_uncheck().then(res => {
          console.log(res)
          res = res.data
          this.tableData=res
          // this.$message({
          //   showClose: true,
          //   message: res,
          //   type: "success"
          // })
        }).catch(res => {
          this.$message({
            showClose: true,
            message: res,
            type: "error"
          })
        })
      },
      //上架任务
      handlePost (index, row) {
        console.log(index,row)
        let id ={'task_id': this.tableData[index].task_id}
        pass_task(id).then(res=> {
            console.log(res)
            this.$message({
              showClose: true,
              message: '任务上架成功',
              type: "success"
            })
            //window.reload()
          }
        ).catch(err=> {
          console.log(err)
          this.$message({
            showClose: true,
            message: '请重试',
            type: "error"
          })
        })
      },
      handleDelete (index, row) {
        console.log(index, row)
        let id ={'task_id': this.tableData[index].task_id}
        reject_task(id).then(res=> {
            console.log(res)
            this.$message({
              showClose: true,
              message: '任务退回成功',
              type: "success"
            })
            window.reload()
          }
        ).catch(err=> {
          console.log(err)
          this.$message({
            showClose: true,
            message: '请重试',
            type: "error"
          })
        })
      },
      //每页下拉显示数据
      handleSizeChange: function(size) {
        this.pagesize = size;
        /*console.log(this.pagesize) */
      },
      //点击第几页
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        /*console.log(this.currentPage) */
      }
    },
    created:function(){
      this.getTask();
    },
    mounted() {
      // this.getTask()
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
