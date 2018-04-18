<template>
    <v-flex mt-2>
       <v-list three-line>
        <v-list-tile avatar ripple class="grey lighten-3 expense-item">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('total_expenses') }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content class="align-end">{{ total }}</v-list-tile-content>
        </v-list-tile>
       </v-list>
      <v-list three-line>
          <v-list-tile avatar ripple class="grey lighten-3 expense-item">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('income') }}</v-list-tile-title>
            </v-list-tile-content>
              <v-list-tile-content class="align-end">
                  <v-text-field :placeholder="$t('value')" class="income"
                    name="income"
                    v-model="income" maxlength="10" @blur="incomeOnBlur"
                    :append-icon="incomeInvisible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (incomeInvisible = !incomeInvisible)"
                    :type="incomeInvisible ? 'password' : 'text'"
                  ></v-text-field>
              </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list three-line>
          <v-list-tile avatar ripple class="grey lighten-3 expense-item">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('balance') }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content class="align-end">{{ balance }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list three-line>
        <v-list-tile avatar ripple class="grey lighten-3 expense-item">
          <v-list-tile-content>
               <v-select
                  class="expense-type"
                  :items="types"
                  v-model="type"
                  :label="$t('types_expenses')"
                  single-line
                  clearable
                ></v-select>
          </v-list-tile-content>
          <v-list-tile-content class="align-end">{{ totalByExpenseType }}</v-list-tile-content>
        </v-list-tile>
       </v-list>
    </v-flex>
</template>

<script>
export default {
  name: "Resume",
  components: {},
  data: () => {
    return {
      incomeInvisible: true,
      type: null
    };
  },
  computed: {
    total() {
      var total = 0;
      for (let expense of this.$store.state.expenses) {
        total = total + this.$numeral(expense.value).value();
      }
      return this.$numeral(total).format("0,0.00");
    },
    balance() {
      var balance =
        this.$numeral(this.income).value() - this.$numeral(this.total).value();
      return this.$numeral(balance).format("0,0.00");
    },
    income: {
      get() {
        return this.$store.state.income;
      },
      set(income) {
        this.$store.commit("setIncome", income);
      }
    },
    types() {
      return this.$store.getters.typesExpenses;
    },
    totalByExpenseType() {
      if (!this.type) return this.total;
      var expensesByType = this.$store.state.expenses.filter(expense => {
        return expense.types.some(type => {
          return type === this.type;
        });
      });
      var total = expensesByType.reduce((a, b) => {
        return this.$numeral(a).value() + this.$numeral(b.value).value();
      }, 0);
      return this.$numeral(total).format("0,0.00");
    }
  },
  mounted() {
    this.$store.dispatch("getIncome");
  },
  methods: {
    incomeOnBlur() {
      this.income = this.$numeral(this.income).format("0,0.00");
      this.$store.dispatch("saveIncome");
    }
  }
};
</script>

<style scoped>
.income {
  width: 110px;
}

.expense-type {
  width: 160px;
}
</style>
