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
    },
    addExpense: (state, expense) => {
        state.expenses.push(Object.assign({}, expense))
    },
    editExpense: (state, expense) => {
        state.expenses = state.expenses.filter(item => {
            return item.id != expense.id
        });
        state.expenses.push(Object.assign({}, expense))
    },
    setExpense: (state, expense) => {
        state.expense = Object.assign({}, expense);
    },
    setExpenses: (state, expenses) => {
        state.expenses = expenses || new Array();
    },
    setDialogNewExpense: (state, dialogNewExpense) => {
        state.dialogNewExpense = dialogNewExpense;
    },
    setSalary: (state, salary) => {
        state.salary = salary;
    }
}