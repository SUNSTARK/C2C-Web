<template>
  <el-carousel type="card" indicator-position="inside" :height="currentHight-100+'px'">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img style="width: 100%;height: 100%" ref="imgHeight" :src='item.url' @load="imgLoad"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        imgHeight: '',
        imgWidth:'',
        currentHight:'',
        imgList: [
          {id: 0, url: require('@/assets/carousel/carousel01.png')},
          {id: 1, url: require('@/assets/carousel/carousel02.png')},
          {id: 2, url: require('@/assets/carousel/carousel03.png')},
          {id: 3, url: require('@/assets/carousel/carousel04.png')},
          {id: 4, url: require('@/assets/carousel/carousel05.png')},
          {id: 5, url: require('@/assets/carousel/carousel06.png')}
        ]
      }
    },
    methods: {
      imgLoad() {
        this.$nextTick(() => {
          this.$refs.imgHeight[0].height = document.body.clientHeight
          this.$refs.imgHeight[0].width = document.body.clientWidth
        })
      }
    },
    mounted() {
      this.currentHight = document.body.clientHeight
      window.addEventListener('resize', () => {
        this.currentHight = document.body.clientHeight
        this.imgLoad()
      },false)
    }
  }
</script>

<style>
</style>
