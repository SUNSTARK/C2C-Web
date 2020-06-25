<template>
    <div>
      <template>
        <el-table
          :data="tableData.filter(data => !search || data.task_name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          @expand-change="expandSelect"
          @row-click="rowClick">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="开始时间">
                  <span>{{ props.row.release_time }}</span>
                </el-form-item>
                <el-form-item label="结束时间">
                  <span>{{ props.row.end_time }}</span>
                </el-form-item>
                <el-form-item label="详情">
                  <span>{{ props.row.detail }}</span>
                </el-form-item>
                <el-form-item label="需要答案">
                  <span>{{ props.row.target_num }} 份</span>
                </el-form-item>
                <el-form-item label="任务酬金">
                  <span>{{ props.row.budget }} 元</span>
                </el-form-item>
                <el-form-item label="已收集答案">
                  <span>{{ props.row.demand_num }} 份</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="任务 ID"
            prop="task_id">
          </el-table-column>
          <el-table-column
            label="任务名称"
            prop="task_name">
          </el-table-column>
          <el-table-column
            label="地点"
            prop="location">
          </el-table-column>
          <el-table-column
            align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索" clearable/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.row)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {fetch_allTask, stop_task} from "../../api/admin_apis";

  export default {
    data() {
      return {
        tableData:[],
        search: '',
        expands:[] // 要展开的行，元素是row的key值
      }
    },
    methods: {
      getTableData:function() {
        fetch_allTask().then(res => {
          for (let item in res.data) {
            this.tableData.push(res.data[item])
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getRowKeys:function(row){
        return row.task_id
      },
      // 折叠面板每次只能展开一行，用于点击按钮操作
      expandSelect:function(row, expandedRows) {
        let that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.task_id)
          }
        }
        else {
          that.expands = [] // 默认不展开
        }
      },
      // 折叠面板每次只能展开一行，用于点击行操作
      rowClick(row) {
        let that = this
        let firstClick = true // 用于判断是否重复点击该行
        if (that.expands.length === 0) {
          that.expands.push(row.task_id)
        } else {
          if (that.expands[0] === row.task_id) {  // 已展开的行和点击的行相同
            that.expands = []
            firstClick = !firstClick
          }
          if (firstClick) {  // 第一次点击该行，则展开
            that.expands = [row.task_id];
            firstClick = !firstClick
          }else {  // 重复点击该行，则收起所有
            that.expands = []
            firstClick = !firstClick
          }
        }
      },
      handleDelete(row) {
        this.$confirm('此操作将下架该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {'task_id': row.task_id};
          stop_task(params).then(res => {
            if (res.code === 200){
              this.$message({
                type: 'success',
                message: '下架成功!'
              });
              this.tableData = []
              this.getTableData()
            }else {
              this.$message({
                type: 'warning',
                message: '出现未知错误!'
              });
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      message () {
        const h = this.$createElement
        this.$notify.info({
          title: "任务大厅",
          message: h("i", {style: "color: teal"}, "点击表格的行可展开详情"),
          duration: 4000
        })
      }
    },
    mounted () {
      this.message()
    },
    created() {
      this.getTableData()
    }
  }
</script>

<style scoped>
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
  }
  .block{
    text-align: center;
  }
</style>
