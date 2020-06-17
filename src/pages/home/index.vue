<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large"></i>快捷方式</p>
          <ul>
            <li><router-link to="/alljobs" class="kjfs kjfs-bluee"><span><i class="el-icon-s-grid fa-2x"></i></span><span>任务大厅</span></router-link></li>
            <li><router-link to="/filterTable" class="kjfs kjfs-pinkk"><span><i class="fa fa-hand-stop-o fa-2x"></i></span><span>筛选示例</span></router-link></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="card dbsx">
          <p class="title"><i class="fa fa-list-ol"></i>待办事项</p>
          <ul>
            <li><router-link to="/filterTable"><span>待审任务</span><span class="num">10</span></router-link></li>
            <li><router-link to="/filterTable"><span>待审帖子</span><span class="num">5</span></router-link></li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <line-echarts id="lineEcharts" height="300px" ref="echarts"></line-echarts>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <maintable id="maintable"></maintable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LineEcharts from "../../components/ECharts/lineEcharts"
  import Maintable from "../table/maintable"
  export default {
    name: "mainIndex",
    components: {Maintable, LineEcharts},
    mounted () {
      this.selfAdaption()
    },
    methods: {
      // echart自适应
      selfAdaption () {
        let that = this
        setTimeout(() => {
          window.onresize = function () {
            if (that.$refs.echarts) {
              that.$refs.echarts.chart.resize()
            }
          }
        }, 10)
      }
    }
  }
</script>

<style>
  #maintable, #lineEcharts, .card {
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  #maintable .title, #lineEcharts .title, .card .title {
    font-size: 14px;
    padding: 10px;
  }
  #maintable .title i, #lineEcharts .title i, .card .title i {
    margin-right: 5px;
  }

  .card {
    color: #666;
  }
  .card ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .card ul li {
    flex: 1;
  }
  .card ul li a {
    color: #666666;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card ul li a span {
    height: 44px;
  }
  .card ul li a .num {
    line-height: 44px;
    font-size: 42px;
    color: #409eff;
    margin: 0px;
  }
  .card ul li .kjfs-bluee {
    color: #409eff;
  }
  .card ul li .kjfs-pinkk {
    color: #eec2d3;
  }
  .card ul li .kjfs-yelloww {
    color: #f4d884;
  }
  .card ul li .kjfs-grennn {
    color: #89dda0;
  }
  .card ul li .kjfs-purplee {
    color: #78a2ea;
  }
  .card ul li .kjfs-lightBluee {
    color: #b8d6ff;
  }
  .card ul li:hover .kjfs-bluee {
    color: #ffffff;
    background: #409eff;
  }
  .card ul li:hover .kjfs-pinkk {
    color: #ffffff;
    background: #eec2d3;
  }
  .card ul li:hover .kjfs-yelloww {
    color: #ffffff;
    background: #f4d884;
  }
  .card ul li:hover .kjfs-grennn {
    color: #ffffff;
    background: #89dda0;
  }
  .card ul li:hover .kjfs-purplee {
    color: #ffffff;
    background: #78a2ea;
  }
  .card ul li:hover .kjfs-lightBluee {
    color: #ffffff;
    background: #b8d6ff;
  }
  .card .table {
    padding: 21px;
  }
  .card .table p {
    height: 52px;
    line-height: 52px;
    border: 1px solid #cccccc;
    overflow: hidden;
    border-top: none;
    display: flex;
    justify-content: start;
  }
  .card .table p:first-child {
    border-top: 1px solid #cccccc;
  }
  .card .table p .tit {
    width: 90px;
    min-width: 90px;
    height: 100%;
    text-align: center;
    border-right: 1px solid #cccccc;
    margin-right: 18px;
  }
  .card .table p span.gitbox {
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
  .card .table p span.gitbox a:first-child {
    margin-right: 30px;
  }

  #lineEcharts {
    margin-top: 30px;
    padding-top: 30px;
  }

  #maintable {
    margin-top: 30px;
    padding-top: 10px;
  }
</style>
