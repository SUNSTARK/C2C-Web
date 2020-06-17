/**管理员路由*/
import Login from '@/pages/login/index'
import Home from '@/pages/home/index'
import Layout from '@/pages/layout/index'

// 非必须组件使用懒加载
const AllJobs = () => import("@/pages/table/all_jobs")
const NotFound = () => import("@/pages/NotFound/page404")
const FilterTable = () => import("@/pages/table/filterTable")

let adminRouter = [
  {
    path: '/',
    redirect: {name:'主页'}, // 重定向到主页
  },
  {
    path: "/index",
    component: Layout,
    children: [
      {
        path: '/index',
        name: '主页',
        component: Home,
        meta: {
          title:'C2C后台管理系统'
        },
        children: []
      },
      {
        path: "/alljobs",
        name: "任务大厅",
        component: AllJobs
      },
      {
        path: "/filterTable",
        name: "待审任务",
        component: FilterTable
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: '登录页面'
    }
  },
  {
    path: "/404",
    name: "PageNotFound",
    component:NotFound,
    meata: {
      title: "您所访问的页面不存在",
    }
  }
  ]

export {adminRouter};
