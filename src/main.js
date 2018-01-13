import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import VuexI18n from 'vuex-i18n'
import ptBR from './translations/pt-br'
import enUS from './translations/en-us'
import Enum from './plugins/enum'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.use(VuexI18n.plugin, store)
Vue.i18n.add('pt-br', ptBR);
Vue.i18n.add('en-us', enUS);

Vue.use(Enum)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created(){
    Vue.i18n.set(this.$store.state.culture);
  }
})
