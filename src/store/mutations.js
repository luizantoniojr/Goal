export default {
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
    setGoals: (state, goals) => {
        state.goals = goals || new Array();
    },
    setDialogNewGoal: (state, dialogNewGoal) => {
        state.dialogNewGoal = dialogNewGoal;
    },
    setUser: (state, user) => {
        state.user = user;
    }
}