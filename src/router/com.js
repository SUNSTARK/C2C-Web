/**普通用户路由 */
import userHome from '@/pages/user_home/index'
import user_layout from '@/pages/user_layout/index'

let comRouter = [
  {
    path: '/',
    redirect: {path:'/home'}, // 重定向到主页
    children: []
  },
  {
    path: "/",
    name: "用户主页",
    component: user_layout,
    children: [
      {
        path: '/home',
        component: userHome,
        children: [],
        meta: {
          title: 'C2C众包平台',
          roles: ['admin', 'user']  // 用于权限判断
        }
      }
    ]
  },
  {
    path: "/addtask",
    name: "addtask",
    component: user_layout,
    children: [
      {
        path: '/addtask',
        component: ()=>import("../pages/personal_center/add_task/AddTask"),
        children: [],
        meta: {
          title: '发布任务',
          roles: ['admin', 'user']
        }
      }
    ]
  },

  {
    path: "/login",
    name: "登录",
    component: () => import("../pages/login"),
    meta: {
      title: '登录页面',
      roles: ['admin', 'user']
    },
    children: []
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/register/register"),
    meta: {
      title: '注册页面',
      roles: ['admin', 'user']
    },
    children: []
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
        children: []
      },
      {
        path: "/user/task/list",
        name: "task_list",
        component: () => import("../pages/personal_center/task_list"),
        meta: {
          title: '任务列表'
        },
        children: []
      },
      {
        path: "/user/task/history",
        name: "task_history",
        component: () => import("../pages/personal_center/task_history"),
        meta: {
          title: '历史任务'
        },
        children: []
      }
    ]
  }
]


export {comRouter};
