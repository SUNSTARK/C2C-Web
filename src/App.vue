<template>
  <div id="app">
    <transition name="fade" mode="in-out">
      <router-view v-if="isRouterAlive"/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide(){
      return {
        reload:this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      // 用于重新加载某个组件，需要先inject注入
      reload () {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      }
    }
  }
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
    font-family: Microsoft YaHei, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  a {
    color: #56a9ff;
  }
  #nprogress .bar {
    height: 3px !important;
    background: #56a9ff !important;
  }
</style>
