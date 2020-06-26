<template>
  <el-main>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="任务描述">
              <span>{{props.row.detail}} </span>
            </el-form-item>
            <el-form-item label="任务预算">
              <span>{{props.row.budget}} </span>
            </el-form-item>
            <el-form-item label="发布地点">
              <span>{{props.row.location}} </span>
            </el-form-item>
            <el-form-item label="目标套数">
              <span>{{props.row.target_num}} </span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>{{props.row.check_state}} </span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{props.row.task_state}} </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="名称"
        prop="task_name">
      </el-table-column>
      <el-table-column
        align="center"
        label="发布时间"
        prop="release_time">
      </el-table-column>
      <el-table-column
        align="center"
        label="截至时间"
        prop="end_time">
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="mini">上一页</el-button>
          <el-button type="primary" size="mini">下一页</el-button>
        </template>
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="warning"-->
          <!--            @click="handleEdit(scope.$index, scope.row)">取消-->
          <!--          </el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>

  export default {
    name: "task_list_table",
    props: {
      tableData: {
        required: true,
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>
