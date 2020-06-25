import {fetchGet, fetchPost} from "../axios";

// 账号密码登陆 POST
export function fetch_login(data) {
  return fetchPost('/user/login', data)
}

// 用户注册  POST
export function fetch_register(data) {
  return fetchPost('/user/registering', data)
}

export const fetch_task_list = () => fetchGet('/task/list')
