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
                  <v-text-field :placeholder="$t('value')" v-model="salary" maxlength="10" @blur="salaryOnBlur"></v-text-field>
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
      </v-flex>
    </v-card>
</template>

<script>
export default {
  name: "Resume",
  components: {},
  data() {
    return {
      salary: null
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
    }
  },
  methods: {
    salaryOnBlur() {
      this.salary = this.$numeral(this.salary).format("0,0.00");
    }
  }
};
</script>

<style scoped>
.input-group {
  width: 72px;
}
</style>
