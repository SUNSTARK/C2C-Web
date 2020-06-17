/**管理员路由*/
import Login from '@/pages/login/index'
import Layout from '@/pages/layout/index'

// 非必须组件使用懒加载
const AllJobs = () => import("@/pages/table/all_jobs")
const NotFound = () => import("@/pages/NotFound/page404")
const FilterTable = () => import("@/pages/table/filterTable")
const Home = () => import('@/pages/home/index')
const DragTable = () => import("@/pages/table/dragTabe")

let adminRouter = [
  {
    path: '/',
    redirect: {name:'主页'}, // 重定向到主页
    children: []
  },
  {
    path: '/display',
    redirect: {name: '测试一'},
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
    name: "主页",
    icon:"fa fa-home",
    alone: true,
    children: [
      {
        path: '/index',
        component: Home,
        meta:{
          bread_name: ["主页"]
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
    icon: "fa fa-flag-checkered",
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
    path: "/display",
    component: Layout,
    name: "可视化",
    icon: "fa fa-line-chart",
    alone: false,
    children: [
      {
        path: "/display/alljbos",
        name: "测试一",
        component: AllJobs,
        meta:{
          bread_name: ['测试一', "可视化"]
        },
        children: []
      },
      {
        path: "/display/dragtable",
        name: "测试二",
        component: DragTable,
        meta:{
          bread_name: ['测试二', "可视化"]
        },
        children: []
      }
    ]
  },
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
