/**管理员路由*/
let adminRouter = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "index" */ "../pages/admin_home"),
    meta: {
      title: '后台管理系统',
      requireAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login/user_login"),
    meta: {
      title: '登录页面'
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/register/register"),
    meta: {
      title: '注册页面'
    }
  }];

let adminRouterGuard = (to, next) => {
};

export {adminRouter, adminRouterGuard};
