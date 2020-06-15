import Vue from 'vue'
import Router from 'vue-router'
import {comRouter, comRouterGuard} from "./com";
import {adminRouter, adminRouterGuard} from "./admin";

Vue.use(Router);

let router = new Router({
  routes: comRouter.concat(adminRouter),
  mode: 'history'
});

// 路由设定
router.beforeEach((to, from, next) => {
  console.log(to.path);
  // 进行路由判断来处理未登录，复制url访问等情况
  comRouterGuard(to, next);
  adminRouterGuard(to, next);
  // 改变标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // let isLogin = store.state.token; // 是否登录
  next();
});


export default router
