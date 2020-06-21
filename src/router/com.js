/**普通用户路由 */

let comRouter = [
  {
    path: "/user",
    name: "personal_center",
    component: () => import("../pages/personal_center"),
    meta: {
      title: '个人中心'
    },
    children: [
      {
        path: "/user/info",
        name: "user_info",
        component: () => import("../pages/personal_center/user_info"),
        meta: {
          title: '用户信息'
        },
      }, {
        path: "/user/task/list",
        name: "task_list",
        component: () => import("../pages/personal_center/task_list"),
        meta: {
          title: '任务列表'
        },
      }, {
        path: "/user/task/history",
        name: "task_history",
        component: () => import("../pages/personal_center/task_history"),
        meta: {
          title: '历史任务'
        },
      }
    ]
  }
];

let comRouterGuard = (to, next) => {
};

export {comRouter, comRouterGuard};
