// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'//引入vue框架
import App from './App'//引入根组件
import login from './login' //引入login页面
import router from './router'//引入路由配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios.js'
import instanse from './axios.js'
import VueResource from 'vue-resource'
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(ElementUI)
Vue.use(VueResource);

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
/* eslint-disable no-new */
//定义实例

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
