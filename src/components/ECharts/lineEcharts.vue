<template>
    <div>
      <div :id="id" :style="{width: width, height: height}"
           :data="tableData"></div>
    </div>
</template>

<script>
import echarts from "echarts"
import westeros from "./theme/westeros"
import {fetch_task1Day} from "../../api/apis";
import Cookies from "js-cookie"
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
      structArray: [],
    }
  },
  mounted () {

    this.initChart()
  },
  methods: {

    initChart () {

      this.chart = echarts.init(document.getElementById(this.id), "westeros")
      //获取日期
      let nowDate = new Date();
      let year=nowDate.getFullYear()
      let month=("0" + (nowDate.getMonth() + 1)).slice(-2);
      let date=nowDate.getDate()
      let i=0

      for(i;i<8;i++) {
        let params = {'dateStart': year + '-' + month + '-' + (date-i)}
        fetch_task1Day(params).then(res => {
            console.log(res)
            this.structArray[i]=res.data
          }
        ).catch(err => {
          console.log(err)
        })

      }

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

            data: [8, 3, 4, 5, 7, 1, 4]
          }
         ]
      })
    }
  }
}
</script>

<style scoped>

</style>
