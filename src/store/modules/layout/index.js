export default {
  state: {
    isCollapse: false,  // 默认折叠菜单
    logoShow: false,  // 默认展示logo
    AllTasks: [] // 用于保存任务大厅的数据
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
    setAllTasks (state, list) {
      state.perDayTask = list
    }
  },
  actions: {
    collapse ({commit}, arg) {
      commit("collapse", arg)
    },
    setAllTasks ({commit}, list) {
      commit("setAllTasks", list)
    }
  }
}
