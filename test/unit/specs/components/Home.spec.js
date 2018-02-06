import Vue from 'vue'
import Home from '@/components/Home'
import VuexI18n from 'vuex-i18n'
import translations_ptbr from '@/translations/pt-br'
import translations_en from '@/translations/en'
import store from '@/store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VuexI18n.plugin, store)
Vue.i18n.add('pt-br', translations_ptbr)
Vue.i18n.add('en', translations_en)

describe('Home.vue', () => {
  it('should render correct title', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1.white--text').textContent).toBe('Goal')
  })

  it('should render correct subtitle', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h4.white--text').textContent).toBe(vm.$t('manage_your_goals'))
  })
})
