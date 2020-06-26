/**管理员路由*/
import admin_Layout from '@/pages/admin_layout/index'
import user_layout from '@/pages/user_layout/index'
import Home from '@/pages/admin_home/index'

// 非必须组件使用懒加载
const allTask = () => import("@/pages/admin_table/allTask")
const InfoVisual = () => import("@/pages/admin_table/taskinfoVisual")
const UserInfoVisual = () => import("@/pages/admin_table/userInfoVisual")
const Page404 = () => import("@/pages/error/page404")
const checkTask = () => import("@/pages/admin_table/checkTask")

let adminRouter = [
  {
    path: '/display',
    redirect: {name: '用户信息'},
    children: []
  },
  {
    path: "/admin_home",
    component: admin_Layout,
    name: "主页",  // 定义该地址导航名称
    icon:"fa fa-home",  // 定义该地址所用的导航图标
    alone: true,  // 定义该页面是否含有子菜单，用于导航生成子菜单
    children: [
      {
        path: '/admin_home',
        component: Home,
        meta:{
          bread_name: ["主页"],  // 定义面包屑名称，用于生成面包屑导航
          roles: ['admin']
        },
        children: []
      }
    ]
  },
  {
    path: "/admin_home",
    component: admin_Layout,
    name: "任务大厅",
    icon:"fa fa-list-ul",
    alone: true,
    children: [
      {
        path: "/alltask",
        component: allTask,
        meta:{
          bread_name: ["任务大厅"],
          roles: ['admin']
        },
        children: []
      }
    ]
  },
  {
    path: "/admin_home",
    component: admin_Layout,
    name: "待审任务",
    icon: "fa fa-check-square-o",
    alone: true,
    children: [
      {
        path: "/checktask",
        component: checkTask,
        meta:{
          bread_name: ["待审任务"],
          roles: ['admin']
        },
        children: []
      }
    ]
  },
  {
    path: "/display", // 父菜单path，已重定向至第一个子菜单
    component: admin_Layout,
    name: "信息可视化",
    icon: "fa fa-line-chart",
    alone: false,
    children: [
      {
        path: "/display/job_info",  // 子菜单path
        name: "任务信息",  // 子菜单名称，用于导航生成
        icon: "fa fa-file-text",  // 定义子菜单的导航图标，可直接使用fontawesome或element-ui图标
        component: InfoVisual,
        meta:{
          bread_name: ["任务信息","信息可视化"], // 用于面包屑生成，依次为子菜单、父菜单名称
          roles: ['admin']
        },
        children: []
      },
      {
        path: "/display/user_info",
        name: "用户信息",
        icon: "fa fa-user",
        component: UserInfoVisual,
        meta:{
          bread_name: ["用户信息","信息可视化"],
          roles: ['admin']
        },
        children: []
      },
    ]
  },
  // 测试页面导航，发布时删除
  {
    path: "/test",
    component:() => import("@/pages/test"),
    children: [],
    alone: true,
    meta: {
      title: "测试页面",
      roles: ['admin', 'user']
    }
  },
  {
    path: "/ui",
    component:user_layout,
    children: [],
    alone: true,
    meta: {
      title: "测试页面",
      roles: ['admin', 'user']
    }
  },
  {
    path: "/404",
    name: "Page404",
    component: Page404,
    alone: true,
    children: [],
    meta: {
      title: "您所访问的页面不存在",
      roles: ['admin', 'user']
    }
  }
  ]

export {adminRouter};
