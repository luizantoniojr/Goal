<template>
 <v-list three-line>
    <v-list-tile avatar ripple v-bind:key="index" class="grey lighten-3 expense-item">
      <v-list-tile-content>
        <v-list-tile-title>{{ expense.description }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ expense.types.toString() }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
      <v-list-tile-action-text>
        <v-tooltip bottom :disabled="!expense.lastParcelDate" >
          <v-chip label small :color="getColorDayDue(expense.dayDue)" class="ml-0"  slot="activator"> {{ expense.dayDue }} </v-chip>
          <span v-if="expense.lastParcelDate"> {{ $t('last_parcel_date') }}: {{ $moment.formatterMonthYear(expense.lastParcelDate) }} </span>
        </v-tooltip>  
      </v-list-tile-action-text>
      <v-bottom-sheet v-model="sheet">
        <v-btn slot="activator" flat icon color="cyan lighten-2">
          <v-icon>build</v-icon>
        </v-btn>
        <v-list>
          <v-subheader>{{$t('settings')}}</v-subheader>
          <v-list-tile @click="edit">
            <v-list-tile-avatar>
              <v-avatar size="32px" tile>
                <v-icon color="cyan lighten-2">edit</v-icon>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title>{{$t('edit')}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="remove">
            <v-list-tile-avatar>
              <v-avatar size="32px" tile>
                <v-icon color="cyan lighten-2">delete</v-icon>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title>{{$t('remove')}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-bottom-sheet>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: "Expense",
  data() {
    return {
      sheet: false
    };
  },
  props: {
    expense: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    remove() {
      var expense = this.expense;
      this.$store.state.expenses = this.$store.state.expenses.filter(item => {
        return item != expense;
      });
      this.sheet = false;
    },
    edit() {
      this.$store.commit("setExpense", this.expense);
      this.sheet = false;
      this.$store.commit("setDialogNewExpense", true);
    },
    getColorDayDue(dayDue) {
      var dayNow = parseInt(this.$moment().format("D"));
      if (dayDue == dayNow) {
        return "error";
      } else if (dayDue > dayNow && dayDue <= dayNow + 7) {
        return "warnning";
      } else {
        return "success";
      }
    }
  }
};
</script>

<style scoped>
.dialog__container {
  display: none !important;
}

.expense-item:hover .dialog__container {
  display: inline !important;
}

.expense-item:focus .dialog__container {
  display: inline !important;
}
</style>
