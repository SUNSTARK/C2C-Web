import {fetchGet, fetchPost} from "../axios";

// 账号密码登陆 POST
export const fetch_login = data => fetchPost('/user/login', data)

// 用户注册  POST
export const fetch_register = data => fetchPost('/user/registering', data)

//用户更改密码 POST
export const fetch_editpwd =data =>fetchPost('/user/modify/pwd',data)

//查询用户信息 GET
export const fetch_user_personal = () => fetchGet('/user/personal')

//修改用户信息 POST
export const fetch_editinfo =data =>fetchPost('/user/modify/info',data)

//修改用户头像 POST
export const fetch_editicon =data =>fetchPost('/user/modify/headportrait',data)

//查询用户头像 GET
export const fetch_user_icon = () => fetchGet('/user/headportrait')

//用户发布任务 POST
export const fetch_addtask = data => fetchPost('/task/release', data)

// 用户获取任务列表
export const fetch_task_list = () => fetchGet('/task/list')

// 查询正在执行的任务
export const fetch_task_executing = () => fetchGet('/user/task/executing')

// 查询正在被执行的任务
export const fetch_task_executed = () => fetchGet('/user/task/executed')

// 查询已完成的任务
export const fetch_task_completed = () => fetchGet('/user/task/completed')

// 查询已被完成的任务
export const fetch_task_end = () => fetchGet('/user/task/end')

// 用户接受任务
export const fetch_accept_task = ()=>fetchPost()

// 用户放弃任务
export const fetch_cancel_task = data => fetchPost('/user/task/quiting', data)

//用户取消已接受的任务
export const fetch_reject_task = data => fetchPost('/user/task/rejecting', data)

//发布方获取用户提交的任务答案 GET
export function fetch_task_getanswer (params) {
  return fetchGet('/task/getUserAnswer/', params)
}

//评价任务
export function fetch_task_score_answer (data) {
  return fetchPost('/task/answer/score', data)
}
