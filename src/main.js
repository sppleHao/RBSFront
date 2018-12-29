// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import downMenu from './components/teacherMobile/myComponents/downMenu/downMenu.js'
import openAndCloseMenu from './components/teacherMobile/myComponents/openAndCloseMenu/openAndCloseMenu.js'
import AxiosPlugin from './AxiosPlugin'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$axios = axios
Vue.use(downMenu)
Vue.use(iView)
Vue.use(ElementUI)
Vue.use(openAndCloseMenu)
Vue.use(AxiosPlugin)


router.beforeEach((to, from, next) => {
  console.log("检查令牌");
  if (to.path === "/accountAndSettings/MTfindPassword") {
    next();
  } else {
    if (localStorage.token !== ''&&localStorage!=null ) {
      console.log("检查令牌通过");
      axios.defaults.headers['Authorization'] = localStorage.getItem('token')
      next();
    } else {
      console.log("检查令牌未通过");
      if (to.path === '/MTlogin') {
        next();
      } else {
        next('/MTlogin')
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created(){
    // axios.defaults.baseURL='http://gscawv.natappfree.cc/'
    axios.defaults.baseURL = 'http://119.29.24.35:8001'
  },
  components: { App },
  template: '<App/>'
})
