import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goals: [],
    goal: {
      id: null,
      title: null,
      subtitle: null,
      state: "Active",
      level: null,
      conclusion: null
    },
    dialogNewGoal: false,
    culture: 'pt-br'
  },
  mutations: {
    addGoal: (state, goal) => {
      state.goals.push(Object.assign({}, goal))
    },
    editGoal: (state, goal) => {
      state.goals = state.goals.filter(item => {
        return item.id != goal.id
      });
      state.goals.push(Object.assign({}, goal))
    },
    setGoal: (state, goal) => {
      state.goal = Object.assign({}, goal);
    },
    setDialogNewGoal: (state, dialogNewGoal) => {
      state.dialogNewGoal = dialogNewGoal;
    }
  }
})
