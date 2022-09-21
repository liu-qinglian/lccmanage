import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store/index'
import "../mock/index"
// import '../mock/port/sys/sysAdmin/adminInfo'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

// import $axios from 'axios'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { initMenu } from './utils/menu'
import { getRequest, postRequest, delRequest, putRequest, delRequestForRest } from './utils/api'
import { downloadRequest } from './utils/download'

import 'babel-polyfill';

Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.delRequest = delRequest
Vue.prototype.delRequestForRest = delRequestForRest
Vue.prototype.putRequest = putRequest
Vue.prototype.downloadRequest = downloadRequest


Vue.use(VueAxios, axios) // 安装插件

Vue.config.productionTip = false
// Vue.use($axios);
Vue.use(ElementUI);

// Vue.prototype.$axios = axios
// Vue.prototype.$ajax = axios
// 全局前置路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);

  // 判断用户是否登录  看sessionStorage的tokenStr
  if (window.sessionStorage.getItem('tokenStr')) {
    // 初始化菜单
    initMenu(router, store);
    // console.log(router);
    // 判断用户信息是否存在
    if (!window.sessionStorage.getItem('user')) {
      return getRequest('/adminInfo').then(resp => {
        if (resp) {
          // 存入用户信息  sessionStorage只能字符串
          window.sessionStorage.setItem('user', JSON.stringify(resp));
          store.commit('INIT_ADMIN', resp);
          next();
        }
      })
    }
    next();
  } else {
    // 如果没有登录看是否在登录页
    if (to.path == '/') {
      next();
    } else {
      next('/?redirect=' + to.path);
    }

  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
