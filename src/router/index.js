import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from  '../components/Login'
import Shake from  '../components/Shake'
import Vote from  '../components/Vote'

Vue.use(Router)

export default new Router({// 路由选中状态
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login   //login状态
    }, {
      path: '/login',
      component: Login   //login状态
    }, {
      path: '/shake',
      meta: {
        //meta元素
        requireAuth: true,
      },
      component: Shake  //shake状态
    }, {
      path: '/vote',
      meta: {
        //meta元素
        requireAuth: true,
      },
      component: Vote  //vote状态
    }
  ]
})
