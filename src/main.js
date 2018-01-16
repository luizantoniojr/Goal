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
import firebase from 'firebase'

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


let app;

firebase.initializeApp({
  apiKey: "AIzaSyCtpqaE0_v2_YOmXZ9CaVpCMIYAd0ZHrzk",
  authDomain: "goal-afb6b.firebaseapp.com",
  databaseURL: "https://goal-afb6b.firebaseio.com",
  projectId: "goal-afb6b",
  storageBucket: "goal-afb6b.appspot.com",
  messagingSenderId: "1048625467134"
});


firebase.auth().onAuthStateChanged((user) => {
  if (!app)
    app = new Vue({
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
        this.$store.commit('setUser', user);
      },
      mounted(){
        this.$store.dispatch("getGoals");
      },
      watch:{
        "$store.state.goals"() {
          this.$store.dispatch("saveGoals");
        }
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
})

