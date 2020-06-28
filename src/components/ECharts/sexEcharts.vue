<template>
  <div>
    <div :id="id" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import westeros from "./theme/westeros"
  import {fetch_genderNum} from "../../api/admin_apis";
  export default {
    name: "sexEcharts",
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
        chart: null
      }
    },
    mounted () {
      this.initChart()
    },
    methods: {


      initChart () {
        this.chart = echarts.init(document.getElementById(this.id), "westeros")

        var labelRight = {
          position: 'right'
        };


        //
        fetch_genderNum().then(res => {
            // console.log(res.data)
            res=res.data
            let woman=res.woman
            let man=res.man
          this.chart.setOption({
            series: [
            {
              name: '人数',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                formatter: '{b}'
              },
              data: [
                {value: -man, label: labelRight},
                {value: woman, label: labelRight},

              ]
            }
          ]
            }
          )

        }).catch(err => {
          console.log(err)
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          })
        }),

        this.chart.setOption({
          title: {
            text: '用户性别比例',
            subtext: '正负仅代表性别区分',
            x: 'center',
            textStyle: {
              color: '#2D3E53',
              fontSize: 20
            },
            subtextStyle:{
              color: '#2D3E53',
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 80,
            bottom: 30
          },
          xAxis: {
            type: 'value',
            position: 'top',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            type: 'category',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            data: [ 'male', 'female']
          },
          // series: [
          //   {
          //     name: '人数',
          //     type: 'bar',
          //     stack: '总量',
          //     label: {
          //       show: true,
          //       formatter: '{b}'
          //     },
          //     data: [
          //       {value: -9000, label: labelRight},
          //       {value: 10000, label: labelRight},
          //
          //     ]
          //   }
          // ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
