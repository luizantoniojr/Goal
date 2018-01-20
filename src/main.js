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


let vm;

firebase.initializeApp({
  apiKey: "AIzaSyCtpqaE0_v2_YOmXZ9CaVpCMIYAd0ZHrzk",
  authDomain: "goal-afb6b.firebaseapp.com",
  databaseURL: "https://goal-afb6b.firebaseio.com",
  projectId: "goal-afb6b",
  storageBucket: "goal-afb6b.appspot.com",
  messagingSenderId: "1048625467134"
});

firebase.auth().onAuthStateChanged((user) => {
  if (!vm)
    vm = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App },
      data: {
        serviceWorkRegistration: null,
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
        this.$store.dispatch("getGoals");
        this.registerServiceWorker();
      },
      watch: {
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
        },
        registerServiceWorker() {
          if ('serviceWorker' in navigator)
            navigator.serviceWorker.register('../service-worker.js')
              .then(this.afterRegisterServiceWorker)
        },
        afterRegisterServiceWorker(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          // this.serviceWorkRegistration = registration;
          // this.subscribePushNotification();
        },
        subscribePushNotification() {
          this.serviceWorkRegistration.pushManager.getSubscription()
            .then(this.afterSubscribePushNotification);
        },
        afterSubscribePushNotification(subscription) {
          this.isSubscribed = !(subscription === null);
          this.subscribeUser();
        },
        subscribeUser() {
          this.serviceWorkRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BPuWFbbMbmJVzpJHkdPChmY8QmHRi0EA3OYlKLV4dJ3HZHMtJ1ACkP4mYM24Yq2NFirg9YthN694UyKiCjnoREs"
          })
          .then(function(subscription) {
            console.log('User is subscribed:', subscription);
            isSubscribed = true;
            updateBtn();
          });
        }
      }
    })
})

