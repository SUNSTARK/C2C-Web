<template>
  <div>
    <h3>用户活跃度</h3>
    <el-row>
      <el-col :span="24">
        <line-echarts id="lineEcharts" height="300px" ref="echarts"></line-echarts>
      </el-col>
    </el-row>
    <br>
    <h3>任务占比</h3>
    <br>
    <el-row>
      <el-col :span="24">
        <line-echarts id="radarEcharts" height="300px" ref="echarts"></line-echarts>
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
  /*数据概览汉字部分*/
  .data-characters {
    font-weight: bold;
    font-size: 15px;
  }
  /*数据概览数字部分*/
  .num {
    line-height: 30px;
    font-size: 42px;
    color: #409eff;
    margin: 0px;
  }

  #lineEcharts {
    margin-top: 30px;
    padding-top: 30px;
  }

  #maintable {
    margin-top: 30px;
    padding-top: 10px;
  }

  /*雷达图部分*/
  #maintable, #radarEcharts, .card {
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

</style>
