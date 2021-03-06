import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
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
import Numeral from './plugins/numeral'
import firebase from 'firebase'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    warnning: colors.orange.lighten3,
    error: colors.red.lighten3,
    success: colors.green.lighten3
  }
})
Vue.use(VeeValidate)
Vue.use(VuexI18n.plugin, store)
Vue.i18n.add('pt-br', translations_ptbr)
Vue.i18n.add('en', translations_en)
Vue.use(Enum)
Vue.use(Moment)
Vue.use(Guid)
Vue.use(Numeral)

firebase.initializeApp({
  apiKey: "AIzaSyCtpqaE0_v2_YOmXZ9CaVpCMIYAd0ZHrzk",
  authDomain: "goal-afb6b.firebaseapp.com",
  databaseURL: "https://goal-afb6b.firebaseio.com",
  projectId: "goal-afb6b",
  storageBucket: "goal-afb6b.appspot.com",
  messagingSenderId: "1048625467134"
});

firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    data: {
      serviceWorkerRegistration: null,
      isSubscribed: null
    },
    created() {
      var culture = this.$store.state.culture;
      Vue.i18n.set(culture);
      this.setVeevalidatorLocale(culture);
      this.$moment.locale(culture);
      this.$store.commit('setUser', user);
    },
    mounted() {
      // this.registerServiceWorker();
    },
    methods: {
      setVeevalidatorLocale(culture) {
        this.$validator.locale = culture;
        if (culture == 'pt-br')
          var validatorConfiguration = {
            messages: VeeValidate_ptbr.messages
          };
        this.$validator.localize(culture, validatorConfiguration);
      },
      registerServiceWorker() {
        if ('serviceWorker' in navigator)
          navigator.serviceWorker.register('../service-worker.js')
            .then(this.afterRegisterServiceWorker)
      },
      afterRegisterServiceWorker(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        this.serviceWorkerRegistration = registration;
      }
    }
  })
})

