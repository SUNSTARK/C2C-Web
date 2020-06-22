export default {
  state: {
    isCollapse: false,
    logoShow: false,
  },
  mutations: {
    collapse (state, arg) {
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
