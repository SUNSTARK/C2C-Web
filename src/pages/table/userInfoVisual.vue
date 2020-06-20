<template>
  <div>
    <h3>用户省份分布</h3>
    <el-row>
      <el-col :span="24">
        <city-echarts id="cityEcharts" height="500px" ref="cityEcharts"></city-echarts>
      </el-col>
    </el-row>
    <br>
    <h3>用户性别占比</h3>
    <el-row>
      <el-col :span="24">
        <sex-echarts id="sexEcharts" height="300px" ref="sexEcharts"></sex-echarts>
      </el-col>
    </el-row>
    <br>
  </div>

</template>

<script>
  import CityEcharts from "../../components/ECharts/cityEcharts"
  import SexEcharts from "../../components/ECharts/sexEcharts"

  export default {
    name: "mainIndex",
    components: {SexEcharts, CityEcharts},
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
            if (that.$refs.cityEcharts && that.$refs.sexEcharts.chart){
              that.$refs.cityEcharts.chart.resize()
              that.$refs.sexEcharts.chart.resize()
            }
          }
        }, 10)
      },
      // echart折叠展开导航自适应
      echart_resize() {
        let that = this
        if (that.$refs.cityEcharts && that.$refs.sexEcharts.chart){
          that.$refs.cityEcharts.chart.resize()
          that.$refs.sexEcharts.chart.resize()
        }
      }
    }
  }
</script>

<style>
  #sexEcharts, #cityEcharts, .card {
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  #sexEcharts .title, #cityEcharts .title, .card .title {
    font-size: 14px;
    padding: 10px;
  }
  #sexEcharts .title i, #cityEcharts .title i, .card .title i {
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

  #cityEcharts {
    margin-top: 30px;
    padding-top: 5px;
  }

  #sexEcharts {
    margin-top: 30px;
    padding-top: 5px;
  }


</style>
