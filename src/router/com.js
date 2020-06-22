/**普通用户路由 */

let comRouter = [
  {
    path: '/',
    redirect: {path:'/home'}, // 重定向到主页
    children: []
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../pages/admin_home"),
    meta: {
      title: 'C2C众包平台',
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
  },
  {
    path: "/user",
    name: "personal_center",
    component: () => import("../pages/personal_center"),
    meta: {
      title: '个人中心'
    },
    children: [
      {
        path: "/user/info",
        name: "user_info",
        component: () => import("../pages/personal_center/user_info"),
        meta: {
          title: '用户信息'
        },
      },
      {
        path: "/user/task/list",
        name: "task_list",
        component: () => import("../pages/personal_center/task_list"),
        meta: {
          title: '任务列表'
        },
      },
      {
        path: "/user/task/history",
        name: "task_history",
        component: () => import("../pages/personal_center/task_history"),
        meta: {
          title: '历史任务'
        },
      }
    ]
  }
]


export {comRouter};
