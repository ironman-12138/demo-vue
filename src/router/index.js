import Vue from 'vue'
import Router from 'vue-router'
import Count from '@/views/Count'
import App from '@/views/App'
import Test from '@/views/Test'
import Server from '@/views/Server'
import Quzhou from '@/views/Quzhou'
import Menu from '@/views/Menu'
import Index from '@/views/Index'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/test'
    },
    {
      path: '/count',
      name: 'Count',
      component: Count,
      meta: { title: '统计页面' , requiresAuth: false}
    },
    {
      path: '/app',
      name: 'App',
      component: App
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: { title: '测试页面' , requiresAuth: false}
    },
    {
      path: '/server',
      name: 'Server',
      component: Server
    },
    {
      path: '/quzhou',
      name: 'Quzhou',
      component: Quzhou
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      meta: {
        index: 1,
      },
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        index: 1,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        index: 0,
      },
    }
  ],
  mode: 'history'  //改变url地址的风格（#/ ==> /）
})
