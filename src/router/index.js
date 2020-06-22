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
  let role = store.state.role;  // 获取登录身份
  // console.log("from "+from.path+" to "+to.path)
  // console.log(isLogin)
  NProgress.start()
  // 改变标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(to.path === '/login') {  //如果是登录页，则跳过验证
    next()
    return
  }
  if (isLogin != null) {
    if (to.path === "/login") {
      next({path: "/"})
    } else {
      next()
    }
  } else {
    next({path:"/login"})
  }
});

router.afterEach(() => {
  NProgress.done()
})

export default router
