# C2C-Web
C2C众包项目Web端

## 补充说明
1. 管理员接口已通过测试，封装参考在src/api/admin_apis/index.js，引用参考test.vue
2. $store新增role变量，使用sessionStorage存储用户的身份标识
3. 目前仅做了是否登录的权限路由，未加入用户身份标识
4. 用户界面user_layout引用参考router/com.js，父组件使用layout，在children属性中引入所需要的页面

## 更新日志
### v1.6
1. 目前所有管理员接口已通过测试，具体方法都封装在src/api/admin_apis/index.js中
2. 项目整合，管理员项目和普通用户项目合并

### v1.5
1. 封装get，post方法，添加了拦截器
2. 登录系统接入后端服务器

### v1.4
1. 重构登录界面，修改layout的部分样式
2. 优化router权限路由逻辑
3. 引入axios模块，未测试
4. 优化echart自适应及其部分显示效果
5. 任务大厅新增点击行展开操作，新增下架二次确认提示

### v1.3
1. 侧栏NavMenu改为路由动态生成
2. 面包屑导航改为路由动态生成
3. 删除前台相关组件
4. 新增NavMenu二级菜单
5. 优化部分显示效果

### v1.2
1. 新增标签页icon图标
2. 新增面包屑导航指引
3. 新增404页面

## 注意事项
```bash
# 安装依赖
yarn install

# 启动服务
yarn start

# 打包发布
yarn build
```
