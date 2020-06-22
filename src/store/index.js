import Vue from "vue"
import Vuex from "vuex"
import Cookies from "js-cookie"
import layout from "./modules/layout/index"
import routerData from "./modules/routerData"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get("token"),  // 存储用户登录状态
    role: sessionStorage.getItem("role")  // 当前用户的登录身份
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set("token", token, { expires: 1 / 24 })  // 保留一个小时
    },
    setRole (state, role) {
      state.role = role
      sessionStorage.setItem("role", role)
    }
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit("setToken", token)
        resolve()
      })
    },
    setRole ({commit}, role) {
      return new Promise((resolve, reject) => {
        commit("setRole", role)
        resolve()
      })
    }
  },
  getters: {
    token: state => state.token,  // 登录后token
    logoShow: state => state.layout.logoShow,  // 管理页面展示logo
    isCollapse: state => state.layout.isCollapse,  // 管理页面折叠菜单
    routers: state => state.routerData.routers,  // 管理页面导航缓存
    perDayTask: state => state.layout.perDayTask, // 管理页面用于保存linechart数据
    role: state => state.role  // 登录后的用户身份
  },
  modules: {
    layout,  // 存储布局相关状态
    routerData // 存储路由相关状态
  }
})

export default store
