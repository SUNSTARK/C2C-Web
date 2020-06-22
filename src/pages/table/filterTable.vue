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
            height="480"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="creatid"
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
          <el-pagination class="fy"
                         layout="prev, pager, next"
                         @current-change="current_change"
                         :total="total"
                         background
          >
          </el-pagination>
        </div>
    </template>
  </div>
</template>

<script>
  import {fetch_uncheck} from "../../api/apis";
  export default {

    name:'list11',
    data() {
      return {
        total:1000,//默认数据总数
        pagesize:9,//每页的数据条数
        currentPage:1,//默认开始页面
        istag: true,
        input:"",
        input21: '',
        value5: [],
        tableData: []
      };
    } ,
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

      })
    },

      handlePost (index, row) {
        console.log(index,row)
       let id = this.tableData[index].creatid
        this.$message({
          showClose: true,
          message: '此任务的id为'+id,
          type: "success"
        })
      },
      handleDelete (index, row) {
        console.log(index, row)
        let id = this.tableData[index].creatid
        this.$message({
          showClose: true,
          message: '此任务的id为'+id,
          type: "success"
        })
      },

      current_change:function(currentPage){
        this.currentPage = currentPage;
      }
    },
    created:function(){
      this.total=this.tableData.length;
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
  .block{
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
