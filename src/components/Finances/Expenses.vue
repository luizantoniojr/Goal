<template>
    <div>
      <v-flex xs12 md4 v-show="hasExpenses">
        <v-select
          :items="types"
          v-model="filter.type"
          :placeholder="$t('filter_for_a_type_of_expense')"
          single-line
          clearable
        ></v-select>
      </v-flex>
      <v-flex>
        <template v-for="(expense, index) in filteredExpenses">
          <v-expense v-bind:expense="expense" v-bind:index="index" :key="index"></v-expense>
          <v-divider v-if="index + 1 < filteredExpenses.length" :key="'divider' + index"></v-divider>
        </template>
      </v-flex>
      <v-new-expense></v-new-expense>
    </div>
</template>

<script>
import newExpense from "./NewExpense";
import expense from "./Expense";
export default {
  name: "Expenses",
  components: {
    "v-new-expense": newExpense,
    "v-expense": expense
  },
  data() {
    return {
      filter: {
        type: null
      }
    };
  },
  computed: {
    types() {
      return this.$store.getters.typesExpenses;
    },
    filteredExpenses() {
      return this.$store.state.expenses
        .filter(m => {
          return m.types.some(t => {
            return !!this.filter.type ? t == this.filter.type : true;
          });
        })
        .sort((a, b) => {
          return a.dayDue - b.dayDue;
        });
    },
    hasExpenses() {
      return this.filteredExpenses.length > 0;
    }
  },
  watch: {
    "$store.state.expenses": {
      handler() {
        this.$store.dispatch("saveExpenses");
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch("getExpenses");
  }
};
</script>

<style scoped>

</style>
