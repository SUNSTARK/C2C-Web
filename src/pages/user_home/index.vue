<template>
  <el-carousel type="card" indicator-position="inside" height="600px">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img :src='item.url'/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        imgList: [
          {id: 0, url: require('@/assets/carousel/carousel01.jpg')},
          {id: 1, url: require('@/assets/carousel/carousel02.jpg')},
          {id: 2, url: require('@/assets/carousel/carousel03.jpg')},
          {id: 3, url: require('@/assets/carousel/carousel04.jpg')},
          {id: 4, url: require('@/assets/carousel/carousel05.jpg')},
          {id: 5, url: require('@/assets/carousel/carousel06.jpg')}
        ]
      }
    }
  }
</script>

<style>
</style>
