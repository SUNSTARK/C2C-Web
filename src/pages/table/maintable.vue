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
  //import axios from '/src/api/axios';
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

      getRange () {
        axios.get('http://39.105.177.71:8080/api/admin/visual/points')
          .then(this.getRangeSuc)
      },

      getRangeSuc(res){
         res=res.data
        if (res.data) {
          const data = res.data
          for(key=0;key<10;key++)
          {
            this.data[key].user_id=data[key].user_id,
            this.data[key].user_name=data[key].user_name,
            this.data[key].total_points=data[key].total_points,
            this.data[key].city="暂时未开放此功能",
            this.data[key].points_level=data[key].points_level
          }
        }
      }
    },
    mounted() {
     // this.getRange ();
    }
  }
</script>

<style scoped>

</style>
