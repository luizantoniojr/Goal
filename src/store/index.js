import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

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
    user: null,
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
    },
    setUser: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    logIn({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        commit('setUser', result.user)
        window.location.href = `${window.location.origin}/#/Goals`
      }).catch((error) => {
        console.log(error)
      })
    },
    logOut({ commit }) {
      firebase.auth().signOut().then(() => {
        commit('setUser', null);
        window.location.href = `${window.location.origin}/#/Home`;
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
