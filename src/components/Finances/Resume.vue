<template>
    <v-card>
      <v-flex>
       <v-list three-line>
        <v-list-tile avatar ripple class="grey lighten-3 expense-item">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('total') }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content class="align-end">{{ total }}</v-list-tile-content>
        </v-list-tile>
       </v-list>
      <v-list three-line>
          <v-list-tile avatar ripple class="grey lighten-3 expense-item">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('salary') }}</v-list-tile-title>
            </v-list-tile-content>
              <v-list-tile-content class="align-end">
                  <v-text-field :placeholder="$t('value')" class="salary"
                    v-model="salary" maxlength="10" @blur="salaryOnBlur"
                    :append-icon="salaryInvisible ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (salaryInvisible = !salaryInvisible)"
                    :type="salaryInvisible ? 'password' : 'text'"
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
    </v-card>
</template>

<script>
export default {
  name: "Resume",
  components: {},
  data: () => {
    return {
      salaryInvisible: true,
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
        this.$numeral(this.salary).value() - this.$numeral(this.total).value();
      return this.$numeral(balance).format("0,0.00");
    },
    salary: {
      get() {
        return this.$store.state.salary;
      },
      set(salary) {
        this.$store.commit("setSalary", salary);
      }
    },
    types() {
      return this.$store.getters.typesExpenses;
    },
    totalByExpenseType() {
      if (!this.type) return this.total;

      var total = 0;
      var expensesByType = this.$store.state.expenses.filter(expense => {
        return expense.types.some(type => {
          return type === this.type;
        });
      });
      for (let expense of expensesByType) {
        total = total + this.$numeral(expense.value).value();
      }
      return this.$numeral(total).format("0,0.00");
    }
  },
  mounted() {
    this.$store.dispatch("getSalary");
  },
  methods: {
    salaryOnBlur() {
      this.salary = this.$numeral(this.salary).format("0,0.00");
      this.$store.dispatch("saveSalary");
    }
  }
};
</script>

<style scoped>
.salary {
  width: 110px;
}

.expense-type {
  width: 160px;
}
</style>
