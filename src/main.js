import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui";
import NProgress from "nprogress"
import store from "./store";
import axios from 'axios';

import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.css";
import 'element-ui/lib/theme-chalk/display.css';
import "nprogress/nprogress.css";
import "@/assets/iconfont/iconfont.css";

Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

NProgress.inc(0.2)
NProgress.configure({ easing: "ease", speed: 500, showSpinner: true })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
