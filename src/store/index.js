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
    authInfo: {
      token: null,
      user: null
    },
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
    setAuthInfo: (state, authInfo) => {
      state.authInfo = authInfo;
    }
  },
  actions: {
    openGoogleSignInModal({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        commit('setAuthInfo', {
          token: result.credential.accessToken,
          user: result.user
        })
        window.location.href = `${window.location.origin}/#/goals`
      }).catch((error) => {
        console.log(error)
      })
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        window.location.href = window.location.origin
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
