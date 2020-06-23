import {fetchGet,fetchPost} from "../axios";


// 用户注册  POST
export function fetch_register (data) {
  return fetchPost('/user/registering', data)
}
