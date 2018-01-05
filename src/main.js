import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
