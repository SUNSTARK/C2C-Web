<template>
  <div>
    <h3>前7天平台任务发布数</h3>
      <el-row>
        <el-col :span="24">
          <line-echarts id="lineEchartsPage" height="300px" ref="lineEchartsPage"></line-echarts>
        </el-col>
      </el-row>

    <br>
    <h3>任务地区分布</h3>
    <br>
    <el-row>
      <el-col :span="24">
        <city-echarts id="cityEcharts" height="500px" ref="radarEcharts"></city-echarts>
      </el-col>
    </el-row>

    <br>
    <h3>用户任务高频tag</h3>
    <el-row>
      <el-col :span="24">
        <radar-echarts id="radarEcharts" height="300px" ref="radarEcharts"></radar-echarts>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import LineEcharts from "../../components/ECharts/lineEcharts"
  import RadarEcharts from "../../components/ECharts/radarEcharts"
  import CityEcharts from "../../components/ECharts/tasktest"

  export default {
    name: "mainIndex",
    components: {RadarEcharts, LineEcharts,CityEcharts},
    mounted () {
      this.selfAdaption()
    },
    computed: {
      // 用于监听isCollapse值的改变
      get_isCollapse() {
        return this.$store.getters.isCollapse
      }
    },
    watch: {
      get_isCollapse: function () {
        setTimeout(this.echart_resize, 280)
      }
    },
    methods: {
      // echart窗体改变自适应，$refs后为echart标签的ref
      selfAdaption () {
        let that = this
        setTimeout(() => {
          window.onresize = function () {
            if (that.$refs.lineEchartsPage){
              that.$refs.lineEchartsPage.chart.resize()
              that.$refs.radarEcharts.chart.resize()
            }
          }
        }, 10)
      },
      // echart折叠展开导航自适应
      echart_resize() {
        let that = this
        if (that.$refs.lineEchartsPage){
          that.$refs.lineEchartsPage.chart.resize()
          that.$refs.radarEcharts.chart.resize()
        }
      }
    }
  }
</script>

<style>
  #cityEcharts,#radarEcharts, #lineEchartsPage, .card {
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  #cityEcharts.title,#radarEcharts .title, #lineEchartsPage .title, .card .title {
    font-size: 14px;
    padding: 10px;
  }
  #cityEcharts.title i,#radarEcharts .title i, #lineEchartsPage .title i, .card .title i {
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
  #lineEchartsPage {
    margin-top: 30px;
    padding-top: 5px;
  }

  #radarEcharts {
    margin-top: 30px;
    padding-top: 5px;
  }
</style>
