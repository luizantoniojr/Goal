<template>
    <v-dialog v-model="dialog" max-width="560px">
      <v-btn absolute dark fab right fixed bottom color="cyan lighten-2" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <form>
            <v-card-title>
            <span class="headline">{{ $t('new_expense') }}</span>
            </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        v-bind:label="$t('description')"
                        v-model="expense.description"
                        v-validate="'required'"
                        :error-messages="errors.collect('description')"
                        v-bind:data-vv-as="$t('description')"
                        data-vv-name="description"
                        required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-select
                        :items="types"
                        v-model="expense.type"
                        v-bind:label="$t('type')"
                        v-validate="'required'"
                        required
                        :error-messages="errors.collect('type')"
                        v-bind:data-vv-as="$t('type')"
                        data-vv-name="type"
                        autocomplete
                        chips
                        multiple
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        v-bind:label="$t('day_due')"
                        v-model="expense.dayDue"
                        v-validate="'required'"
                        :error-messages="errors.collect('day_due')"
                        v-bind:data-vv-as="$t('day_due')"
                        data-vv-name="day_due"
                        required
                        mask="##"
                        :rules="[rules.dayWeek]">
                      </v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm6>
                      <v-menu ref="menu" lazy v-model="lastParcelDateMenu" transition="scale-transition" 
                        offset-y full-width :nudge-right="40" max-width="290px" min-width="290px" :return-value.sync="expense.lastParcelDate">
                        <v-text-field slot="activator" v-bind:label="$t('last_parcel_date')" v-model="lastParcelDateDisplayed" append-icon="event" readonly></v-text-field>
                        <v-date-picker type="month" v-model="expense.lastParcelDate" no-title scrollable  v-bind:locale="$store.state.culture">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">{{ $t('close') }}</v-btn>
            <v-btn color="blue darken-1" flat type="button" v-on:click="submit">{{ $t('save') }}</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "NewExpense",
  data() {
    return {
      types: this.$enum.getTextValue("typesExpenses"),
      lastParcelDateMenu: false,
      rules: {
        dayWeek: value => {
          const maxDayWeek = 31;
          return (
            !(value > maxDayWeek) || this.$t("value_is_not_a_day_of_the_week")
          );
        }
      }
    };
  },
  watch: {
    dialog(newDialog) {
      if (!newDialog) this.clearExpense();
    }
  },
  computed: {
    lastParcelDateDisplayed() {
      if (!this.expense.lastParcelDate) return;
      return this.$moment.formatterMonthYear(this.expense.lastParcelDate);
    },
    expense: {
      get() {
        return this.$store.state.expense;
      },
      set(expense) {
        this.$store.commit("setExpense", expense);
      }
    },
    dialog: {
      get() {
        return this.$store.state.dialogNewExpense;
      },
      set(dialogNewExpense) {
        this.$store.commit("setDialogNewExpense", dialogNewExpense);
      }
    }
  },
  methods: {
    submit(event) {
      this.$validator.validateAll().then(this.save);
    },
    save(validation) {
      if (validation) {
        if (!this.expense.id) {
          this.expense.id = this.$guid.generate();
          this.$store.commit("addExpense", this.expense);
        } else this.$store.commit("editExpense", this.expense);

        this.dialog = false;
      }
    },
    clearExpense() {
      this.expense.id = null;
      this.expense.description = null;
      this.type = null;
      this.dayDue = null;
      this.lastParcelDate = null;
      this.clearErrors();
    },
    clearErrors() {
      this.$nextTick().then(() => {
        this.errors.clear();
      });
    }
  }
};
</script>

<style scoped>
.btn--bottom.btn--absolute {
  bottom: 50px;
}
</style>