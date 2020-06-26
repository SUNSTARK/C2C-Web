<template>
  <div class="hello">
    <div :id="app" :style="{width: width, height: height}">
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
  export default {
    name: 'app',
    components: {
      wordcloud
    },
    methods: {
      wordClickHandler(name, value, vm) {
        console.log('wordClickHandler', name, value, vm);
      }
    },
    data() {
      return {
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
    }
  }
</script>

<style scoped>

</style>

