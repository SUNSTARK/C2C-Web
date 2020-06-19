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
        sortable
        prop="uid"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="stars"
        label="用户积分"
        width="130">
      </el-table-column>
      <el-table-column
        prop="city"
        label="用户地域">
      </el-table-column>
      <el-table-column
        prop="activity"
        label="用户活跃度">
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
          uid: "201801012345601",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-01",
          activity: "高"
        }, {
          uid: "201801012345602",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-02",
          activity: "低"
        }, {
          uid: "201801012345603",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-03",
          activity: "高"
        }, {
          uid: "201801012345604",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-03",
          activity: "高"
        }, {
          uid: "201801012345605",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-04",
          activity: "低"
        }, {
          uid: "201801012345606",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-04",
          activity: "高"
        }, {
          uid: "201801012345607",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-04",
          activity: "低"
        }, {
          uid: "201801012345608",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-04",
          activity: "高"
        }, {
          uid: "201801012345609",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-05",
          activity: "低"
        }, {
          uid: "201801012345610",
          name: "王小虎",
          stars: "2000分",
          city: "山东",
          date: "2018-01-05",
          activity: "高"
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
