<template>
    <div>
      <div :id="id" :style="{width: width, height: height}"></div>
    </div>
</template>

<script>
import echarts from "echarts"
import westeros from "./theme/westeros"
var taskNum
export default {

  name: "lineEcharts",
  props: {
    id: {
      type: String,
      default: "myChart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data () {
    return {
      chart: null,
      dataNum1: 2
      // dataNum:[]
    }
  },
  mounted () {

    this.initChart()
  },
  methods: {
    getNum(data){

     this.$axios.get('http://39.105.177.71:8080/api/admin/visual/taskDayNum/{'+data+'}')
        .then(this.getRangeSuc)

    },

    getRangeSuc(res){

      res=res.data
      const day1 = res.data
      this.dataNum1 = day1
     },

    initChart () {
      //获取日期
      let nowDate = new Date();
      let year=nowDate.getFullYear()
      let month=nowDate.getMonth()
      let date=nowDate.getDate()

      let day1=this.getNum(year + '-' +month+ '-' + date)

      this.$message({
        showClose: true,
        message: this.dataNum1,
        type: "success"
      })

      this.chart = echarts.init(document.getElementById(this.id), "westeros")
      this.chart.setOption({
        title: {
          text: "近七天用户活跃度",
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["发布任务数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [date-6+'号', date-5+'号', date-4+'号', date-3+'号', date-2+'号', date-1+'号', date+'号']
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "发布任务数",
            type: "line",
            stack: "总量",

            data: [2200, 3820, 1910, 2340, 4900, 3300, 1100]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
