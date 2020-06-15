# c2c-web

> c2c众包

## 目录结构

|-- README.md 说明文档<br/>
|-- package.json 依赖库配置<br/>
|-- static 放置静态文件<br/>
|-- src 源代码<br/>
|   |-- App.vue 页面主容器<br/>
|   |-- assets 资源文件<br/>
|   |-- components 一些公用的组件<br/>
|   |-- main.js vue 入口以及 vue 根实例<br/>
|   |-- pages 放置页面组件<br/>
|   |-- app app 目录，放置全局的文件<br/>
|   |-- |-- apis 封装的 api 目录<br/>
|   |-- |-- modules 封装数据的模块<br/>
|   |-- |-- |-- functions 全局函数，已挂载到$fn<br/>
|   |-- router vue-router 配置<br/>
|-- vue.config.js 打包和跨域配置<br/>

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```

