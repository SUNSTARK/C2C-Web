export default {
  state: {
    isCollapse: true,  // 默认折叠菜单
    logoShow: true,  // 默认展示logo
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
    }
  },
  actions: {
    collapse ({commit}, arg) {
      commit("collapse", arg)
    }
  }
}
