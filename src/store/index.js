import Vue from "vue"
import Vuex from "vuex"
import Cookies from "js-cookie"
import layout from "./modules/layout/index"
import routerData from "./modules/routerData"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get("token")
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set("token", token, { expires: 1 / 24 })  // 保留一个小时
    }
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit("setToken", token)
        resolve()
      })
    }
  },
  getters: {
    token: state => state.token,  // 登录后token
    logoShow: state => state.layout.logoShow,  // 展示logo
    isCollapse: state => state.layout.isCollapse,  // 折叠菜单
    routers: state => state.routerData.routers,  // 导航缓存
  },
  modules: {
    layout,  // 存储布局相关状态
    routerData // 存储路由相关状态
  }
})

export default store
