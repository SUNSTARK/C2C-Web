/**管理员路由*/
let adminRouter = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "index" */ "../pages/admin_home"),
    meta: {
      title:'后台管理系统',
      requireAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login"),
    meta: {
      title: '登录页面'
    }
  }];

let adminRouterGuard = (to, next) => {};

export {adminRouter, adminRouterGuard};
