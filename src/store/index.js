import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goals: [],
    culture:'pt-br'
  },
  mutations: {
    addGoal: (state, goal) => {
      state.goals.push(goal)
    }
  }
})
