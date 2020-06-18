/**管理员路由*/
import Login from '@/pages/login/index'
import Layout from '@/pages/layout/index'

// 非必须组件使用懒加载
const AllJobs = () => import("@/pages/table/all_jobs")
const InfoVisual = () => import("@/pages/table/infoVisual")
const NotFound = () => import("@/pages/NotFound/page404")
const FilterTable = () => import("@/pages/table/filterTable")
const Home = () => import('@/pages/home/index')
const DragTable = () => import("@/pages/table/dragTabe")

let adminRouter = [
  {
    path: '/',
    redirect: {path:'/index'}, // 重定向到主页
    children: []
  },
  {
    path: '/display',
    redirect: {name: '用户信息'},
    children: []
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    children: []
  },
  {
    path: "/",
    component: Layout,
    name: "主页",  // 定义该地址导航名称
    icon:"fa fa-home",  // 定义该地址所用的导航图标
    alone: true,  // 定义该页面是否含有子菜单，用于导航生成子菜单
    children: [
      {
        path: '/index',
        component: Home,
        meta:{
          bread_name: ["主页"]  // 定义面包屑名称，用于生成面包屑导航
        },
        children: []
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    name: "任务大厅",
    icon:"fa fa-list-ul",
    alone: true,
    children: [
      {
        path: "/alljobs",
        component: AllJobs,
        meta:{
          bread_name: ["任务大厅"]
        },
        children: []
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    name: "待审任务",
    icon: "fa fa-check-square-o",
    alone: true,
    children: [
      {
        path: "/filterTable",
        component: FilterTable,
        meta:{
          bread_name: ["待审任务"]
        },
        children: []
      }
    ]
  },
  {
    path: "/display", // 父菜单path，已重定向至第一个子菜单
    component: Layout,
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
          bread_name: ["任务信息","信息可视化"]  // 用于面包屑生成，依次为子菜单、父菜单名称
        },
        children: []
      },
      {
        path: "/display/user_info",
        name: "用户信息",
        icon: "fa fa-user",
        component: InfoVisual,
        meta:{
          bread_name: ["用户信息","信息可视化"]
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
      title: "测试页面"
    }
  },
  {
    path: "/404",
    name: "PageNotFound",
    component:NotFound,
    alone: true,
    children: [],
    meta: {
      title: "您所访问的页面不存在",
    }
  }
  ]

export {adminRouter};
