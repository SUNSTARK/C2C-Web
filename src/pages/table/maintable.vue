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
        tableData: []

      }
    },
    methods: {

      getRange () {
        this.$axios.get('http://39.105.177.71:8080/api/admin/visual/points')
          .then(this.getRangeSuc)
      },

      getRangeSuc(res){
        //测试
         res=res.data
        if (res.data) {
          const data = res.data
            this.tableData=data
          this.$message({
            showClose: true,
            message: "用户积分排名已更新",
            type: "success"
          })

        }
      }
    },
    mounted() {
     this.getRange ();
    }
  }
</script>

<style scoped>

</style>
