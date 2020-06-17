import Vue from 'vue'
import Router from 'vue-router'
import {adminRouter} from "./admin";

Vue.use(Router);

let router = new Router({
  routes: adminRouter
});

// 去除重复导航报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
