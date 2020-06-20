import {fetchGet,fetchPost} from "../axios";

// 账号密码登陆
export function fetch_login (data) {
    return fetchPost('/admin/logining', data)
}

// 获取全部待审任务
export function fetch_uncheck () {
  return fetchGet('/admin/task/unchecking')
}

// 任务审核通过
export function pass_task (data) {
  return fetchPost('/admin/task/launching', data)
}

// 退回任务
export function reject_task (data) {
  return fetchPost('/admin/task/rejecting', data)
}

// 显示积分排名
export function fetch_points () {
  return fetchGet('/admin/visual/points')
}

// 单日发布任务数查询
export function fetch_task1Day () {
  return fetchGet('/admin/visual/taskDayNum')
}

// 任务状态显示
export function fetch_taskState () {
  return fetchGet('/admin/visual/task')
}

// 展示所有任务
export function fetch_allTask () {
  return fetchGet('/admin/task/display/allTask')
}

// 叫停任务
export function stop_task (data) {
  return fetchPost('/admin/task/stopping', data)
}
