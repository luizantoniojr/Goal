import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Goals from '@/components/Goals'
import Setting from '@/components/Setting'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Goals',
      name: 'Goals',
      component: Goals,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('Home')
  else next()
})

export default router
