<template>
  <div ref="wordcloud" class="wordcloud">
  </div>
</template>

<script>
  import echarts from 'echarts'
  import "echarts-wordcloud/dist/echarts-wordcloud";
  import "echarts-wordcloud/dist/echarts-wordcloud.min";
  import axios from "axios"
  export default {
    data() {
      return {
        wordList:[
          {
            name: "加载中....",
            value: 15000
          },
          {
            name: "加载中....",
            value: 10081
          },
          {
            name: "加载中....",
            value: 9386
          },
          {
            name: "加载中....",
            value: 7500
          },
          {
            name: "加载中....",
            value: 7500
          },
          {
            name: "加载中....",
            value: 6500
          },
          {
            name: "加载中....",
            value: 6500
          },
          {
            name: "加载中....",
            value: 6000
          },
          {
            name: "加载中....",
            value: 4500
          },
          {
            name: "加载中....",
            value: 3800
          },
          {
            name: "加载中....",
            value: 3000
          },
          {
            name: "加载中....",
            value: 2500
          },
          {
            name: "加载中....",
            value: 2300
          },
          {
            name: "加载中....",
            value: 2000
          },
          {
            name: "加载中....",
            value: 1900
          },
          {
            name: "加载中....",
            value: 1800
          },
          {
            name: "加载中....",
            value: 1700
          },
          {
            name: "加载中....",
            value: 1600
          },
          {
            name: "加载中....",
            value: 1500
          },
          {
            name: "加载中....",
            value: 1200
          },
        ]
      }
    },
    mounted(){
      this.initchart();
    },
    methods:{
      initchart(){
        let myChart = echarts.init(this.$refs.wordcloud);
        axios.get('http://39.101.212.197:8080/tag/hot').then((res)=>{
          res =res.data
          let word=res.data
          let datalist=[]
          for(let i in word)
          {
            datalist[i]={"name":word[i],"value": 20000-i*500}
          }
          console.log(datalist)
          myChart.setOption({
            title: {
              text: "用户任务高频tag图表",
              textStyle: {
                fontSize: 14,
                color:"#C3D6F2"
              }
            },
          series: [
            {
              type: "wordCloud",
              //用来调整词之间的距离
              gridSize: 10,
              //用来调整字的大小范围
              sizeRange: [14, 60],
              //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
              rotationRange: [0, 0],
              //随机生成字体颜色
              textStyle: {
                normal: {
                  color: function() {
                    return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                    );
                  }
                }
              },
              //位置相关设置
              left: "center",
              top: "center",
              right: null,
              bottom: null,
              width: "200%",
              height: "200%",
              //数据
              data: datalist
            }
          ]
        })

        })
      }
    }
  }
</script>
<style scoped>
  .wordcloud{
    width:100%;
    height:300px;
    margin:auto;
  }
</style>
