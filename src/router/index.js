import Vue from 'vue'
import Router from 'vue-router'
import {adminRouter} from "./admin";
import {comRouter} from "./com";
import store from "../store";
import NProgress from "nprogress";

Vue.use(Router);

let router = new Router({
  routes: comRouter.concat(adminRouter)
});

// 去除重复导航报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由设定
router.beforeEach((to, from, next) => {
  let isLogin = store.state.token; // 获取登录状态
  NProgress.start()
  // 改变标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // if (isLogin) {
  //   if (to.path === "/login") {
  //     next({path: "/"})
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (to.path === "/login" || to.path === "/404") {
  //     next()
  //   }
  //   next({path: "/login"})
  //   NProgress.done()
  // }
  next()
});

router.afterEach(() => {
  NProgress.done()
})

export default router
