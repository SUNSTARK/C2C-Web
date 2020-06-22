<template>
  <el-main>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        label="属性1"
        prop="test1">
      </el-table-column>
      <el-table-column
        align="center"
        label="属性2"
        prop="test2">
      </el-table-column>
      <el-table-column
        align="center"
        label="属性3"
        prop="test3">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        prop="test4">
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
    name: "task_list",
    data() {
      return {
        tableData: [{
          test1: '属性1',
          test2: '属性2',
          test3: '属性3',
          test4: '未审核',
        }],
      }
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
