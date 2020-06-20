<template>
  <div>
    <div :id="id" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import westeros from "./theme/westeros"

  export default {
    name: "cityEcharts",
    props: {
      id: {
        type: String,
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
        var dataAxis =[
          '江苏', '北京', '上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南',
          '安徽','山东','新疆','江苏','浙江', '江西','湖北','广西','甘肃', '山西','内蒙古',
          '陕西','吉林','福建','贵州','广东','青海','西藏','四川','宁夏','海南','台湾','香港','澳门',];
        var data =['1', '2', '3','4','5','6','7','8','9','1',
          '2','3','4','5','6', '7','8','2','4', '5','6',
          '6','4','4','3','2','6','7','4','4','5','5','7','1',];
        var yMax = 10;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }

        this.chart.setOption({
          title: {
            text: '用户省份分布图',
            subtext: '鼠标滑动可放缩移动',
            x: 'center',
            textStyle: {
              fontSize: 20
            }
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#000',
                fontWeight: 600,
                fontSize: 13
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                color: 'rgba(0,0,0,0.05)'
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#ECB49F'},
                    {offset: 0.5, color: '#E59F99'},
                    {offset: 1, color: '#BB6566'}
                  ]
                )
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#BB6566'},
                      {offset: 0.7, color: '#BB6566'},
                      {offset: 1, color: '#BB6566'}
                    ]
                  )
                }
              },
              data: data
            }
          ]
        });
        var zoomSize = 6;
        this.chart.on('click', function (params) {
          console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
          this.chart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          })
        })
      }

    }

  }


</script>

<style scoped>

</style>

