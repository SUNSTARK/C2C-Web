import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui";
import NProgress from "nprogress"
import store from "./store";


import "element-ui/lib/theme-chalk/index.css";
import * as functions from "./app/modules/functions";
import "font-awesome/css/font-awesome.css";
import 'element-ui/lib/theme-chalk/display.css';
import "nprogress/nprogress.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$fn = functions;

NProgress.inc(0.2)
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false })

// 路由设定
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 改变标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  //console.log('从：'+from.path+' 到：'+to.path);
  let isLogin = store.state.token; // 获取登录状态
  // 未登录且要去登陆页面的予以放行，防止死循环
  if (to.path === '/login' && !isLogin) {
    next()
  }
  // 未登录的都要重新登录
  if (!isLogin) {
    next({ path: '/login', });
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
