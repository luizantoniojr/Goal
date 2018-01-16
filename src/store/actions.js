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
            window.location.href = `${window.location.origin}/#/Home`;
        }).catch((error) => {
            console.log(error)
        })
    },
    saveGoals({ state }) {
        firebase.database().ref('goals/' + state.user.uid).set(state.goals);
    },
    getGoals({ commit, state }) {
        if (state.user)
            firebase.database().ref('goals/' + state.user.uid).on('value', function (snapshot) {
                commit('setGoals', snapshot.val());
            });;
    }
}