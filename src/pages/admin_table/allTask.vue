<template>
    <div>
      <div class="title">
        <h3>任务大厅<span class="tips">浅绿色——发布中，淡黄色——审核通过暂未发布</span>
        </h3>
      </div>
      <template>
        <el-table
          v-loading="loading"
          :data="tableData.slice((current_page-1) * page_size, current_page * page_size)"
          style="width: 100%"
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          @expand-change="expandSelect"
          @row-click="rowClick"
          :row-class-name="tableRowClassName">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="开始时间">
                  <span>{{ props.row.release_time }}</span>
                </el-form-item>
                <el-form-item label="截止时间">
                  <span>{{ props.row.end_time }}</span>
                </el-form-item>
                <el-form-item label="详情">
                  <span>{{ props.row.detail }}</span>
                </el-form-item>
                <el-form-item label="需要完成">
                  <span>{{ props.row.target_num }} 份</span>
                </el-form-item>
                <el-form-item label="任务酬金">
                  <span>{{ props.row.budget }} 元</span>
                </el-form-item>
                <el-form-item label="已完成">
                  <span>{{ props.row.complete_taskNum }} 份</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            label="任务ID"
            prop="task_id">
          </el-table-column>
          <el-table-column
            align="center"
            label="任务标签"
            prop="task_tag">
          </el-table-column>
          <el-table-column
            align="center"
            label="任务名称"
            prop="task_name">
          </el-table-column>
          <el-table-column
            align="center"
            label="地点"
            prop="location">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.row)" v-if="scope.row.task_state===2">下架</el-button>
              <el-button
                size="mini"
                type="danger"
                disabled v-else>下架</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current_page"
          :page-sizes="[9, 15, 20]"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next"
          :total='tableData.length'
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {fetch_allTask, stop_task} from "../../api/admin_apis";

  export default {
    data() {
      return {
        current_page: 1,
        page_size: 9,
        tableData: [],
        loading: true,
        expands: [] // 要展开的行，元素是row的key值
      }
    },
    methods: {
      getTableData:function() {
        fetch_allTask().then(res => {
          this.tableData = res.data
          this.loading = false
        }).catch(err => {
          console.log(err)
        })
      },
      tableRowClassName({row}) {
        if (row.task_state === 1) {
          return 'warning-row';
        } else if (row.task_state  === 2) {
          return 'success-row';
        }
        return '';
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
      // 下架任务操作
      handleDelete(row) {
        this.$confirm('此操作将下架该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {'task_id': row.task_id};
          stop_task(params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '下架成功!'
              });
              this.tableData = []
              this.loading = true
              this.getTableData()
            }
          }).catch(err => {
            console.log(this.tableData)
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消!'
          });
        });
      },
      handleSizeChange(val) {
        this.page_size = val
      },
      handleCurrentChange(val) {
        this.current_page = val
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

<style>
  h3 {
    margin: 0 0 20px;
    font-weight: 800;
    color: #409eff;
    font-size: 22px;
  }
  .title .tips {
    color: #409eff;
    font-size: 13px;
    font-weight: 500;
    margin-left: 20px;
  }
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
  .el-table .warning-row {
    background: #FFFFE0;
  }
  .el-table .success-row {
    background: #F0FFF0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    font-weight: 600;
  }
</style>
