<template>
  <div>
    <p class="title"><i class="fa fa-sort-amount-desc"></i>用户积分前十名</p>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="用户名称">
      </el-table-column>
      <el-table-column
        sortable
        prop="total_points"
        label="用户积分"
        width="130">
      </el-table-column>
      <el-table-column
        prop="city"
        label="用户地域">
      </el-table-column>
      <el-table-column
        prop="points_level"
        label="用户活跃度水平">
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
  export default {
    name: "maintable",
    data () {
      return {
        tableData: [{
          user_id: "201801012345601",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "高"
        }, {
          user_id: "201801012345602",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "低"
        }, {
          user_id: "201801012345603",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "高"
        }, {
          user_id: "201801012345604",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "高"
        }, {
          user_id: "201801012345605",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "低"
        }, {
          user_id: "201801012345606",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "高"
        }, {
          user_id: "201801012345607",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "低"
        }, {
          user_id: "201801012345608",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "高"
        }, {
          user_id: "201801012345609",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "低"
        }, {
          user_id: "201801012345610",
          user_name: "王小虎",
          total_points: "2000分",
          city: "暂时未开放功能",
          points_level: "高"
        }]
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
        this.$message({
          showClose: true,
          message: index,
          row,
          type: "success"
        })
      },
      handleDelete (index, row) {
        console.log(index, row)
        this.$message({
          showClose: true,
          message: index,
          row,
          type: "success"
        })
      },
      filterHandler (value, row, column) {
        const property = column["property"]
        return row[property] === value
      }
    }
  }
</script>

<style scoped>

</style>
