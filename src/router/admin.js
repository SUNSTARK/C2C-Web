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
    component: () => import("../pages/login"),
    meta: {
      title: '登录页面'
    }
  }, {
    path: "/user",
    name: "personal_center",
    component: () => import("../pages/personal_center"),
    meta: {
      title: '个人中心'
    },
    children:[
      {
        path: "/user/info",
        name: "user_info",
        component: () => import("../pages/personal_center/user_info"),
        meta: {
          title: '个人中心/用户信息'
        },
      }
    ]
  }];

let adminRouterGuard = (to, next) => {
};

export {adminRouter, adminRouterGuard};
