import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Goals from '@/components/Goals'
import Setting from '@/components/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Goals',
      name: 'Goals',
      component: Goals
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
