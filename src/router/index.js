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
import BlogEdit from '@/views/BlogEdit'
import BlogView from '@/views/BlogView'
import TestCalendar from '@/views/TestCalendar'
import ErrorPage from '@/components/ErrorPage'
import LibraryIndex from '@/views/library/Index'
import LibraryOss from '@/views/library/Oss'
import RollingLoad from '@/views/library/RollingLoad'
import Draggable from '@/views/library/Draggable'
import Select from '@/views/library/Select'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/library/index'
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: { title: '测试页面' , requiresAuth: false}
    },
    {
      path: '/library/index',
      name: 'LibraryIndex',
      component: LibraryIndex,
      children: [   // 添加子路由
        {
          path: '/',
          name: 'LibraryOss',
          component: LibraryOss
        },
        {
          path: '/library/oss',
          name: 'LibraryOss',
          component: LibraryOss
        },
        {
          path: '/library/rollingLoad',
          name: 'RollingLoad',
          component: RollingLoad
        },
        {
          path: '/library/draggable',
          name: 'Draggable',
          component: Draggable
        },
        {
          path: '/library/select',
          name: 'Select',
          component: Select
        }
      ]
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
    },
    {
      path: '/blogEdit',
      name: 'BlogEdit',
      component: BlogEdit
    },
    {
      path: '/blogView',
      name: 'BlogView',
      component: BlogView
    }, 
    {
      path: '/testCalendar',
      name: 'TestCalendar',
      component: TestCalendar
    }, 
    {
      path: '/*',
      name: 'ErrorPage',
      component: ErrorPage
    }
  ],
  mode: 'history'  //改变url地址的风格（#/ ==> /）
})
