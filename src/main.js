import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './routerPermission'
import hasPermission from "./permission";

// 按钮权限 自定义指令
Vue.directive('hasPermission', hasPermission);
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})