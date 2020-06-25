<template>
  <el-main>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-form-item label="任务概述">
              <span>props.row.name </span>
            </el-form-item>
            <el-form-item label="任务预算">
              <span>props.row.name </span>
            </el-form-item>
            <el-form-item label="目标套数">
              <span>props.row.name </span>
            </el-form-item>
            <el-form-item label="需求套数">
              <span>props.row.name </span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>props.row.name </span>
            </el-form-item>
            <el-form-item label="状态">
              <span>props.row.name </span>
            </el-form-item>
            <el-form-item label="详细描述">
              <span>props.row.name </span>
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
        prop="test2">
      </el-table-column>
      <el-table-column
        align="center"
        label="任务时长"
        prop="test3">
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
  import {fetch_task_list} from "../../../api/user_apis";

  export default {
    name: "task_list",
    data() {
      return {
        tableData: [{
          task_name: '属性1',
          test2: '属性2',
          test3: '属性3',
          test4: '未审核',
        }],
      }
    },
    mounted() {
      fetch_task_list().then(res => console.log(res))
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

<style scoped>

</style>
