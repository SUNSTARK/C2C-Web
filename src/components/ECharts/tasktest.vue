<template>
  <div>
    <div :id="id" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
  import echarts from "echarts"
  import westeros from "./theme/westeros"
  import 'echarts/map/js/china.js'
  import {fetch_provinceNum} from "../../api/admin_apis";

  export default {
    name: "chinatest",
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

        let yData = [];
        let barData = [];

        fetch_provinceNum().then(res => {
          res=res.data
          let data = [
            {
              name: '江苏',
              value: 1
            },
            {
              name: '北京',
              value: 0
            },
            {
              name: '上海',
              value: 3
            },
            {
              name: '重庆',
              value: 2
            },
            {
              name: '河北',
              value: 0
            },
            {
              name: '河南',
              value: 4
            },
            {
              name: '云南',
              value: 2
            },
            {
              name: '辽宁',
              value:3
            },
            {
              name: '黑龙江',
              value: 1
            },
            {
              name: '湖南',
              value: 0
            },
            {
              name: '安徽',
              value: 4
            },
            {
              name: '山东',
              value: 5
            },
            {
              name: '新疆',
              value: 1
            },
            {
              name: '江苏',
              value: 0
            },
            {
              name: '浙江',
              value: 0
            },
            {
              name: '江西',
              value: 2
            },
            {
              name: '湖北',
              value: 0
            },
            {
              name: '广西',
              value: 4
            },
            {
              name: '甘肃',
              value: 0
            },
            {
              name: '山西',
              value: 1
            },
            {
              name: '内蒙古',
              value: 0
            },
            {
              name: '陕西',
              value: 0
            },
            {
              name: '吉林',
              value:5
            },
            {
              name: '福建',
              value: 0
            },
            {
              name: '贵州',
              value: 1
            },
            {
              name: '广东',
              value:2
            },
            {
              name: '青海',
              value:0
            },
            {
              name: '西藏',
              value:0
            },
            {
              name: '四川',
              value: 3
            },
            {
              name: '宁夏',
              value: 0
            },
            {
              name: '海南',
              value: 1
            },
            {
              name: '台湾',
              value: 3
            },
            {
              name: '香港',
              value: 1
            },
            {
              name: '澳门',
              value: 0
            },
            {
              name: '未知',
              value: 0
            }
          ];

          // for(let i=0;i<res.length;i++){//收到的数据
          //   for(let j=0;j < 34;j++){   //表内的默认数据
          //     if(res[i].province==data[j].name)
          //     {
          //       // console.log(i+"配对成功")
          //       data[j].value=res[i].count
          //     }
          //
          //   }
          // }
          let num =data

          //冒泡排序
          //console.log(num)

          for(let i=0;i<34;i++)
          {
            for(let j=0;j<33-i;j++)
            {
              if(num[j].value>num[j+1].value)
              {
                let  temp=num[j];
                num[j]=num[j+1];
                num[j+1]=temp;
              }
            }
          }
          let j=0
          for (let i = 33; i >23; i--) {
            barData.push(num[i]);
            yData.push(j+num[i].name);
            j++
          }

          this.chart.setOption({
            title: [{
              show: true,
              text: '平台任务全国分布排名',
              textStyle: {
                color: '#2D3E53',
                fontSize: 18
              },
              right: 95,
              top: 100
            }],
            tooltip: {
              show: true,
              formatter: function(params) {
                return params.name + '：' + params.value + '%'
              },
            },
            visualMap: {
              type: 'continuous',
              orient: 'horizontal',
              itemWidth: 10,
              itemHeight: 80,
              text: ['高', '低'],
              showLabel: true,
              seriesIndex: [0],
              min: 0,
              max: 2,
              inRange: {
                color: ['#71BBEE', '#FEB2DA', '#D395E0']
              },
              textStyle: {
                color: '#7B93A7'
              },
              bottom: 30,
              left: 'left',
            },
            grid: {
              right: 50,
              top: 135,
              bottom: 100,
              width: '20%'
            },
            xAxis: {
              show: false
            },
            yAxis: {
              type: 'category',
              inverse: true,
              nameGap: 16,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisTick: {
                show: false,
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                interval: 0,
                margin: 85,
                textStyle: {
                  color: '#455A74',
                  align: 'left',
                  fontSize: 14
                },
                rich: {
                  a: {
                    color: '#fff',
                    backgroundColor: '#FAAA39',
                    width: 20,
                    height: 20,
                    align: 'center',
                    borderRadius: 2
                  },
                  b: {
                    color: '#fff',
                    backgroundColor: '#4197FD',
                    width: 20,
                    height: 20,
                    align: 'center',
                    borderRadius: 2
                  }
                },
                formatter: function(params) {
                  if (parseInt(params.slice(0, 1)) < 3) {
                    return [
                      '{a|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                    ].join('\n')
                  } else {
                    return [
                      '{b|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                    ].join('\n')
                  }
                }
              },
              data: yData
            },
            geo: {
              map: 'china',
              layoutCenter: ['35%', '50%'], // 设置中国地图的位置
              layoutSize: 600,
              label: {
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  areaColor: '#fff464'  // 鼠标悬浮省份的颜色
                }
              }
            },
            series: [{
              name: 'mapSer',
              type: 'map',
              roam: false,
              geoIndex: 0,
              label: {
                show: false,
              },
              data: data
            }, {
              name: 'barSer',
              type: 'bar',
              roam: false,
              visualMap: false,
              zlevel: 2,
              barMaxWidth: 8,
              barGap: 0,
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    let colorList = [{
                      colorStops: [{
                        offset: 0,
                        color: '#FFD119' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#FFAC4C' // 100% 处的颜色
                      }]
                    },
                      {
                        colorStops: [{
                          offset: 0,
                          color: '#00C0FA' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#2F95FA' // 100% 处的颜色
                        }]
                      }
                    ];
                    if (params.dataIndex < 3) {
                      return colorList[0]
                    } else {
                      return colorList[1]
                    }
                  },
                  barBorderRadius: 15
                }
              },
              data: barData
            }]
          })
        })
//前十名



      }
    }
  }
</script>

<style scoped>

</style>

