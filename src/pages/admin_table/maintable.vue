<template>
  <div>
    <p class="title"><i class="fa fa-sort-amount-desc"></i>用户积分排名</p>
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
        prop="points_level"
        label="用户活跃度水平">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {fetch_points} from "../../api/admin_apis";
  export default {
    name: "maintable",
    data () {
      return {
        tableData: []
      }
    },
    methods: {
      getRange() {
        fetch_points().then(res => {
          // console.log(res.data)
          res = res.data
          this.tableData=res
        }).catch((err) => {
          console.log(err)
        }).catch(res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error"
          })
        })
      }
    },
    mounted() {
     this.getRange ();
    }
  }
</script>

<style scoped>
</style>
