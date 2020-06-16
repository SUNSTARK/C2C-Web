# C2C-Web-admin

> C2C众包项目Web端后台

## 目录结构
```bash
|-- README.md 说明文档<br/>
|-- package.json 依赖库配置<br/>
|-- static 放置静态文件<br/>
|-- src 源代码<br/>
|   |-- App.vue 页面主容器<br/>
|   |-- assets 资源文件<br/>
|   |-- |-- iconfont 部分图标库<br/>
|   |-- components 一些公用的组件<br/>
|   |-- |-- ECharts ECharts相关组件<br/>
|   |-- |-- userFrom 用户表单<br/>
|   |-- main.js vue 入口以及 vue 根实例<br/>
|   |-- pages 放置页面组件<br/>
|   |-- |-- home 主页模块<br/>
|   |-- |-- layout 导航模块<br/>
|   |-- |-- login 登录模块<br/>
|   |-- |-- NotFound 404页面<br/>
|   |-- |-- table 一些表格模板<br/>
|   |-- app app 目录，放置全局的文件<br/>
|   |-- |-- apis 封装的 api 目录<br/>
|   |-- |-- modules 封装数据的模块<br/>
|   |-- |-- |-- functions 全局函数，已挂载到$fn<br/>
|   |-- router vue-router 配置<br/>
|   |--store 全局状态管理目录
|-- vue.config.js 打包和跨域配置<br/>
```

## 注意事项

```bash
# 安装依赖
yarn install

# 启动服务
yarn start
```
