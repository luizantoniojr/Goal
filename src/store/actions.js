import firebase from 'firebase'

export default {
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
            window.location.href = `${window.location.origin}/#/`;
        }).catch((error) => {
            console.log(error)
        })
    },
    saveGoals({ state }) {
        if (state.user.uid)
            firebase.database().ref('goals/' + state.user.uid).set(state.goals);
    },
    getGoals({ commit, state }) {
        if (state.user)
            firebase.database().ref('goals/' + state.user.uid).on('value', function (snapshot) {
                commit('setGoals', snapshot.val());
            });;
    },
    saveExpenses({ state }) {
        if (state.user.uid)
            firebase.database().ref('expenses/' + state.user.uid).set(state.expenses);
    },
    getExpenses({ commit, state }) {
        if (state.user)
            firebase.database().ref('expenses/' + state.user.uid).on('value', function (snapshot) {
                commit('setExpenses', snapshot.val());
            });;
    },
    saveIncome({ state }) {
        if (state.user.uid)
            firebase.database().ref('income/' + state.user.uid).set(state.income);
    },
    getIncome({ commit, state }) {
        if (state.user)
            firebase.database().ref('income/' + state.user.uid).on('value', function (snapshot) {
                commit('setIncome', snapshot.val());
            });;
    },
    saveTypeSuggestedExpenses({ state }, typeSuggestedExpenses) {
        if (state.user.uid)
            firebase.database().ref('suggestedExpenses/type/' + state.user.uid).set(typeSuggestedExpenses);
    },
    getTypeSuggestedExpenses({ commit, state }) {
        if (state.user)
            firebase.database().ref('suggestedExpenses/type/' + state.user.uid).on('value', function (snapshot) {
                commit('setTypeSuggestedExpenses', snapshot.val());
            });
    }
}