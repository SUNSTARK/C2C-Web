<template>
  <el-carousel type="card" indicator-position="inside" :height="imgHeight-450+'px'">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img ref="imgHeight" :src='item.url' @load="imgLoad"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        imgHeight:"",
        imgList: [
          {id: 0, url: require('@/assets/carousel/carousel01.jpg')},
          {id: 1, url: require('@/assets/carousel/carousel02.jpg')},
          {id: 2, url: require('@/assets/carousel/carousel03.jpg')},
          {id: 3, url: require('@/assets/carousel/carousel04.jpg')},
          {id: 4, url: require('@/assets/carousel/carousel05.jpg')},
          {id: 5, url: require('@/assets/carousel/carousel06.jpg')}
        ]
      }
      let that = this
      that.imgHeight = '620px';
      window.onresize = function temp() { // 通过点语法获取img的height属性值
        that.imgHeight = `${that.$refs.imgHeight['0'].height}px`
        console.log(`${that.$refs.imgHeight['0'].height}px`)
      }
    },
    methods: {
      imgLoad() {
        this.$nextTick(() => {
          this.imgHeight = this.$refs.imgHeight[0].height
        })
      }
    },
    mounted() {
      this.imgLoad();
      window.addEventListener('resize', () => {
        this.imgHeight = this.$refs.imgHeight[0].height
        this.imgLoad();
      }, false);
    }
  }
</script>

<style>
</style>
