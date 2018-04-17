import firebase from 'firebase'

export default {
    typesExpenses(state) {
        var types = state.expenses.map(m => { return m.types });
        var typesConcated = [];
        types.forEach(m => {
            typesConcated = typesConcated.concat(m)
        });

        return typesConcated.filter((el, i, a) => i === a.indexOf(el)).sort()
    }
}