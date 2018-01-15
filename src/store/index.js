import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

const firebaseService = firebase.initializeApp({
  apiKey: "AIzaSyCtpqaE0_v2_YOmXZ9CaVpCMIYAd0ZHrzk",
  authDomain: "goal-afb6b.firebaseapp.com",
  databaseURL: "https://goal-afb6b.firebaseio.com",
  projectId: "goal-afb6b",
  storageBucket: "goal-afb6b.appspot.com",
  messagingSenderId: "1048625467134"
}).firebase_;

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
      var provider = new firebaseService.auth.GoogleAuthProvider()
      firebaseService.auth().signInWithPopup(provider).then((result) => {
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
      firebaseService.auth().signOut().then(() => {
        window.location.href = window.location.origin
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
