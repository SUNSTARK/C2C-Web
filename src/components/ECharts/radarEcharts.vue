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
        myColors: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef','#629fc9','#629fc9','#629fc9','#629fc9','#629fc9'],
        defaultWords: [{
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
            "value": 90
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

