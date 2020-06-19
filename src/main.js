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
import fi from "element-ui/src/locale/lang/fi";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$fn = functions;

NProgress.inc(0.2)
NProgress.configure({ easing: "ease", speed: 500, showSpinner: true })

// 路由设定
router.beforeEach((to, from, next) => {
  let isLogin = store.state.token; // 获取登录状态
  let is1Login = true
  NProgress.start()
  // 改变标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (isLogin) {
    if (to.path === "/login") {
      next({path: "/"})
    } else {
        next()
      }
  } else {
    if (to.path === "/login") {
      next()
    }
    if (!is1Login){
      window.alert('没登陆还想改路由')
      is1Login = !is1Login
    }
    next({path: "/login"})
    NProgress.done()
  }
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
