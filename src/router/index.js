import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Goals from '@/components/Goals/Goals'
import Finances from '@/components/Finances/Finances'
import Setting from '@/components/Setting'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
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
      path: '/Finances',
      name: 'Finances',
      component: Finances,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('')
  else next()
})

export default router
