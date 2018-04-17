<template>
  <canvas id="chart"></canvas>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "Resume",
  components: {},
  data: () => {
    return {
      incomeInvisible: true,
      type: null,
      chart: null
    };
  },
  computed: {
    suggestedExpenditure() {
      var total = 0;
      for (let expense of this.$store.state.expenses) {
        total = total + this.$numeral(expense.value).value();
      }
      return this.$numeral(total).format("0,0.00");
    }
  },
  mounted() {
    this.chartInit();
    this.getWeeks();
  },
  methods: {
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
      this.chart = new Chart(this.$el, {
        type: "doughnut",
        data: this.getChartData(),
        options: {
          title: {
            display: true,
            text: this.$t('suggested_spending_this_month')
          }
        }
      });
    },
    getChartData() {
      return {
        datasets: [
          {
            data: [10, 20, 30, 40],
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)"
            ]
          }
        ],
        labels: this.getWeeks()
      };
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
