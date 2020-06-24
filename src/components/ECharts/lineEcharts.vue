<template>
  <div>
    <div :id="id" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import westeros from "./theme/westeros"
  import {fetch_task1Day} from "../../api/admin_apis";
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

        // let dates1 = year + '-' + month + '-' + (date-6)
        // let dates2 = year + '-' + month + '-' + (date-5)
        // let dates3 = year + '-' + month + '-' + (date-4)
        // let dates4 = year + '-' + month + '-' + (date-3)
        // let dates5 = year + '-' + month + '-' + (date-2)
        // let dates6 = year + '-' + month + '-' + (date-1)
        // let dates7 = year + '-' + month + '-' + date
        //
        // let dates=[dates1,dates2,dates3,dates4,dates5,dates6,dates7]
        // //let dates=['2020-06-18','2020-06-19']
        //
        // for(let item in dates){
        //   let params={'dateStart':dates[item]}
        //   fetch_task1Day(params).then(res => {
        //     console.log(res.data)
        //     let num=res.data
        //     this.chart.setOption({
        //       series: [
        //         {
        //           name: "发布任务数",
        //           type: "line",
        //           stack: "总量",
        //           data: [0,1,6, 1, 6, 1, 19]
        //         }
        //       ]
        //     })
        //   }).catch(err => {
        //     console.log(err)
        //   })
        //
        // }




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
