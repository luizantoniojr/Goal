<template>
    <v-flex xs12>
      <v-flex xs4 ml-3 v-show="hasExpenses">
        <v-select
          :items="types"
          v-model="filter.type"
          :label="$t('filter_for_a_type_of_expense')"
          single-line
        ></v-select>
      </v-flex>
       <v-card v-show="hasExpenses">
          <v-list two-line>
            <template v-for="(expense, index) in filteredExpenses">
              <div :key="index">
                <v-expense v-bind:expense="expense" v-bind:index="index"></v-expense>
                <v-divider v-if="index + 1 < filteredExpenses.length"></v-divider>
              </div>
            </template>
          </v-list>
        </v-card>
      <v-new-expense></v-new-expense>
    </v-flex>
</template>

<script>
import newExpense from "./NewExpense";
export default {
  name: "Expenses",
  components: {
    "v-new-expense": newExpense
  },
  data() {
    return {
      filter: {
        type: null
      },
      types: []
    };
  },
  computed: {
    filteredExpenses() {
      return [];
    },
    hasExpenses() {
      return this.filteredExpenses.length > 0;
    }
  }
};
</script>

<style scoped>

</style>
