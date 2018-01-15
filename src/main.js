import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import VuexI18n from 'vuex-i18n'
import translations_ptbr from './translations/pt-br'
import translations_en from './translations/en'
import VeeValidate from 'vee-validate'
import VeeValidate_ptbr from 'vee-validate/dist/locale/pt_BR'
import Enum from './plugins/enum'
import Moment from './plugins/moment'
import Guid from './plugins/guid'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(VuexI18n.plugin, store)
Vue.i18n.add('pt-br', translations_ptbr)
Vue.i18n.add('en', translations_en)
Vue.use(Enum)
Vue.use(Moment)
Vue.use(Guid)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    var culture = this.$store.state.culture;
    Vue.i18n.set(culture);
    this.setVeevalidatorLocale(culture);
    this.$moment.locale(culture);
  },
  methods: {
    setVeevalidatorLocale(culture) {
      this.$validator.locale = culture;
      if (culture == 'pt-br')
        var validatorConfiguration = {
          messages: VeeValidate_ptbr.messages
        };
      this.$validator.localize(culture, validatorConfiguration);
    }
  }
})
