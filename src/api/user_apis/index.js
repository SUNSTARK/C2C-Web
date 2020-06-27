import {fetchGet, fetchPost} from "../axios";

// 账号密码登陆 POST
export const fetch_login = data => fetchPost('/user/login', data)


// 用户注册  POST
export const fetch_register = data => fetchPost('/user/registering', data)


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
export const fetch_accept_task = data => fetchPost('/api/user/task/accepting', data)

// 用户放弃任务
export const fetch_cancel_task = data => fetchPost('/api/user/task/quiting', data)
