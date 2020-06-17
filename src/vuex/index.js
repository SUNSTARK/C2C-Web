import Vue from "vue"
import Vuex from "vuex"
import Cookies from "js-cookie"
import layout from "./modules/layout/index"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get("token")
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set("token", token, { expires: 1 / 24 })
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
    token: state => state.token,
    info: state => state.role.info,
    logoShow: state => state.layout.logoShow,
    isCollapse: state => state.layout.isCollapse
  },
  modules: {
    layout
  }
})

export default store
