import Vue from 'vue'
import Router from 'vue-router'
import {comRouter} from "./com";
import store from "../vuex";
import NProgress from "nprogress";

Vue.use(Router);

let router = new Router({
  routes: comRouter,
});

// 路由设定
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 改变标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let isLogin = store.state.token; // 是否登录
  next();
});

router.afterEach(() => {
  NProgress.done()
})

export default router
