export default {
  state: {
    isCollapse: false,  // 默认折叠菜单
    logoShow: false,  // 默认展示logo
    perDayTask: {} // 用于保存linechart数据
  },
  mutations: {
    collapse (state) {
      state.isCollapse = !state.isCollapse
      if (state.logoShow) {
        setTimeout(function () {
          state.logoShow = false
        }, 300)
      } else {
        state.logoShow = true
      }
    },
    setperDayTask (state, list) {
      state.perDayTask = list
    }
  },
  actions: {
    collapse ({commit}, arg) {
      commit("collapse", arg)
    },
    setperDayTask ({commit}, list) {
      commit("setperDayTask", list)
    }
  }
}
