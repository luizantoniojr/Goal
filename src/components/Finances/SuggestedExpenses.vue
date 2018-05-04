<template>
  <div>
    <v-flex md4 xs12>
      <v-select
        class="expense-type"
        :items="types"
        v-model="type"
        :placeholder="$t('select_an_expense_type')"
        single-line
        clearable
      ></v-select>
    </v-flex>
    <canvas id="chart" height="400" width="800"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "Resume",
  components: {},
  data: () => {
    return {
      incomeInvisible: true,
      chart: null,
      suggestedExpensesSoFar: null,
      expensesRemainingUntilEndMonth: null
    };
  },
  computed: {
    suggestedExpenditure() {
      var total = 0;
      for (let expense of this.$store.state.expenses) {
        total = total + this.$numeral(expense.value).value();
      }
      return this.$numeral(total).format("0,0.00");
    },
    types() {
      return this.$store.getters.typesExpenses;
    },
    type: {
      get() {
        return this.$store.state.typeSuggestedExpenses;
      },
      set(typeSuggestedExpenses) {
        this.$store.dispatch(
          "saveTypeSuggestedExpenses",
          typeSuggestedExpenses
        );
      }
    },
    income: {
      get() {
        return this.$store.state.income;
      },
      set(income) {
        this.$store.commit("setIncome", income);
      }
    }
  },
  watch: {
    type(type) {
      if (type) this.generateData();
      else this.clearData();
      setTimeout(this.chartInit, 2000);
    }
  },
  mounted() {
    this.$store.dispatch("getTypeSuggestedExpenses");
    this.chartInit();
    this.getWeeks();
  },
  methods: {
    generateData() {
      var dayNow = this.getDayNow();
      var daysNumberMonth = this.getDaysNumberMonth();
      var expensesNow = this.getExpensesByTypeAndDayDue(dayNow);
      var total = this.getExpenseTotal();
      var balance = this.getBalance(total);

      var balancePeerDay = balance / daysNumberMonth;
      var balancePeerDayNow = balancePeerDay * dayNow;
      var valueExpenseByTypeNow = this.sumExpensesValue(expensesNow);
      this.suggestedExpensesSoFar = balancePeerDayNow + valueExpenseByTypeNow;

      var expensesByType = this.getExpensesByType();
      var valueExpensesByTypeEndMonth = this.sumExpensesValue(expensesByType);
      var maxExpensesValue = balance + valueExpensesByTypeEndMonth;

      this.expensesRemainingUntilEndMonth =
        maxExpensesValue - this.suggestedExpensesSoFar;
    },
    getDayNow() {
      return this.$moment().format("DD") * 1;
    },
    getDaysNumberMonth() {
      return (
        this.$moment()
          .endOf("month")
          .format("DD") * 1
      );
    },
    getExpensesByTypeAndDayDue(dayNow) {
      return this.$store.state.expenses.filter(expense => {
        return (
          expense.dayDue <= dayNow &&
          expense.types.some(type => {
            return type == this.type;
          })
        );
      });
    },
    getExpensesByType() {
      return this.$store.state.expenses.filter(expense => {
        return expense.types.some(type => {
          return type == this.type;
        });
      });
    },
    getExpenseTotal() {
      return this.$store.state.expenses.reduce((a, b) => {
        return this.$numeral(a).value() + this.$numeral(b.value).value();
      }, 0);
    },
    getBalance(total) {
      return this.$numeral(this.income).value() - total;
    },
    sumExpensesValue(expenses) {
      return expenses.reduce((a, b) => {
        return this.$numeral(a).value() + this.$numeral(b.value).value();
      }, 0);
    },
    clearData() {
      this.suggestedExpensesSoFar = null;
      this.expensesRemainingUntilEndMonth = null;
    },
    getWeeksNumber() {
      return Math.round(
        this.$moment()
          .endOf("month")
          .format("DD") *
          1 /
          7
      );
    },
    getWeeks() {
      var weeks = [];
      for (let i = 1; i <= this.getWeeksNumber(); i++) {
        weeks.push(`${i}º ${this.$t("week")}`);
      }
      return weeks;
    },
    chartInit() {
      this.chart = new Chart(document.getElementById("chart"), {
        type: "doughnut",
        data: this.getChartData(),
        options: this.getChartOptions()
      });
    },
    getChartOptions() {
      return {
        title: {
          display: true,
          text: this.$t("suggested_spending_this_month")
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              var value = data.datasets[0].data[tooltipItem.index];
              return `${data.labels[tooltipItem.index]}: ${this.$numeral(
                value
              ).format("$0,0.00")}`;
            }
          }
        }
      };
    },
    getChartData() {
      return {
        datasets: [
          {
            data: [
              this.suggestedExpensesSoFar,
              this.expensesRemainingUntilEndMonth
            ],
            backgroundColor: ["#00E5FF", "#FFFF00"]
          }
        ],
        labels: [
          this.$t("expenditure suggested to date"),
          this.$t("remaining_balance_in_the_month")
        ]
      };
    }
  }
};
</script>

<style scoped>

</style>
