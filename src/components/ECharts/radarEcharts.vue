<template>
  <div class="hello">
    <div :id="radarEcharts" :style="{width: width, height: 300}">
      <wordcloud
        :data="defaultWords"
        nameKey="name"
        valueKey="value"
        :color="myColors"
        :showTooltip="false"
        :wordClick="wordClickHandler">
      </wordcloud>
    </div>
  </div>
</template>

<script>
  import wordcloud from 'vue-wordcloud'
  import {fetch_word} from "../../api/admin_apis";
  import axios from "axios"
  export default {
    name: 'radarEcharts',
    components: {
      wordcloud
    },
    data() {
      return {//13项目前
        myColors: ['#A0DDE0','#DFDD6C', '#FDC453', '#FE8D6F', '#F886AB','#FCD353','#FDCFBB', '#FAF1D6','#FAD4AE','#FDAFAB','#FADEE1','#D9F1F1','#B6E3E9'],
         defaultWords: [
          {
            "name": "C2C众包系统",
            "value": 260
          },
          {
            "name": "测试测试测试测试",
            "value": 200
          },
          {
            "name": "Cat",
            "value": 260
          },
          {
            "name": "fish",
            "value": 190
          },
          {
            "name": "things",
            "value": 180
          },
          {
            "name": "look",
            "value": 160
          },
          {
            "name": "two",
            "value": 150
          },
          {
            "name": "fun",
            "value": 90
          },
          {
            "name": "fun",
            "value": 190
          },
          {
            "name": "fun",
            "value": 90
          },
          {
            "name": "fun",
            "value": 90
          },
          {
            "name": "hhhhhhhhhhhhhhhhhh",
            "value": 260
          },
          {
            "name": "asbasdbognasd",
            "value": 260
          },
        ]
      }
    },
    methods: {

      wordClickHandler(name, value, vm) {

        console.log('wordClickHandler', name, value, vm);

      },

      this:axios.get('http://39.101.212.197:8080/tag/hot').then((res)=>{
        res =res.data
        let words=res.data

        console.log(words)
        // for (let i in res.length)
        // {
        //   this.defaultWords[i].name=words[i]
        //   this.defaultWords[i].value=200
        // }
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: err,
          type: "error"
        })
      }),
  },
  }


</script>

<style scoped>

</style>

