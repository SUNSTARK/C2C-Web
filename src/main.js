import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./vuex"
import ElementUI from "element-ui";
import NProgress from "nprogress"
import axios from 'axios'
import VueAxios from "vue-axios";

import "element-ui/lib/theme-chalk/index.css";
import * as functions from "./app/modules/functions";
import "@/assets/iconfont/iconfont.css";
import "font-awesome/css/font-awesome.css";
import 'element-ui/lib/theme-chalk/display.css';
import "nprogress/nprogress.css";

Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$fn = functions;

NProgress.inc(0.2)
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false })

router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

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
