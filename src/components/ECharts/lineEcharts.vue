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

        //获取前七天
        let myDate = new Date(); //获取今天日期
        myDate.setDate(myDate.getDate() - 7);
        let dateArray = [];
        let dateTemp;
        let flag = 1;
        for (let i = 0; i < 7; i++) {
          dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
          dateArray.push(dateTemp);
          myDate.setDate(myDate.getDate() + flag);
        }
        // console.log(dateArray)

       //数据异步获取
        let dates1 = year + '-' + '0'+dateArray[0]
        let dates2 = year + '-' + '0'+dateArray[1]
        let dates3 = year + '-' + '0'+dateArray[2]
        let dates4 = year + '-' + '0'+dateArray[3]
        let dates5 = year + '-' + '0'+dateArray[4]
        let dates6 = year + '-' + '0'+dateArray[5]
        let dates7 = year + '-' +'0'+dateArray[6]
        let params1={'dateStart':dates1}
        let params2={'dateStart':dates2}
        let params3={'dateStart':dates3}
        let params4={'dateStart':dates4}
        let params5={'dateStart':dates5}
        let params6={'dateStart':dates6}
        let params7={'dateStart':dates7}


        const num1=fetch_task1Day(params1).then(res => {
          let num=res.data
          return num;
        }).catch(err => {
          console.log(err)
          // this.$message({
          //   showClose: true,
          //   message: '折线图数据获取失败!',
          //   type: "error"
          // })
        })


        const num2=fetch_task1Day(params2).then(res => {
          let num=res.data
          return num;
        }).catch(err => {
          console.log(err)
        })

        const num3=fetch_task1Day(params3).then(res => {
          let num = res.data
          return num;
        }).catch(err => {
          console.log(err)
        })

        const num4=fetch_task1Day(params4).then(res => {
          let num=res.data
          return num;
        }).catch(err => {
          console.log(err)
        })

        const num5=fetch_task1Day(params5).then(res => {
          let num=res.data
          return num;
        }).catch(err => {
          console.log(err)
        })

        const num6=fetch_task1Day(params6).then(res => {
          let num=res.data
          return num;
        }).catch(err => {
          console.log(err)
        })

        const num7=fetch_task1Day(params7).then(res => {
            let num=res.data
            return num;
          }).catch(err => {
          console.log(err)
          })
        //promise all
        Promise.all([num1,num2,num3,num4,num5,num6,num7]).then(res=>{
          this.chart.setOption({
            series: [
              {
                name: "发布任务数",
                type: "line",
                stack: "总量",
                data: res
              }
            ]
          })
        })

        this.chart.setOption({
          title: {
            text: "前七天平台任务发布数目图表",
            textStyle: {
              fontSize: 14,
              color:"#C3D6F2"
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
            data: [dateArray[0]+'号', dateArray[1]+'号', dateArray[2]+'号',dateArray[3]+'号', dateArray[4]+'号', dateArray[5]+'号', dateArray[6]+'号']
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
