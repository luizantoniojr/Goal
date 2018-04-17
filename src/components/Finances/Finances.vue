<template>
    <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-tabs dark grow :scrollable="false">
        <v-toolbar color="cyan lighten-2" dark>
            <v-tabs-bar class="cyan lighten-2" >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tabs-item :href="'#tab-expenses'">
                {{$t("expenses")}}
              </v-tabs-item>
              <v-tabs-item :href="'#tab-resume'">
                {{$t("resume")}}
              </v-tabs-item>
              <v-tabs-item :href="'#tab-suggested-expenses'">
                {{$t("suggested_expenses")}}
              </v-tabs-item>
            </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
          <v-tabs-content id="tab-expenses">
           <v-expenses></v-expenses>
          </v-tabs-content>
          <v-tabs-content id="tab-resume">
           <v-resume></v-resume>
          </v-tabs-content>
          <v-tabs-content id="tab-suggested-expenses">
            <v-suggested-expenses></v-suggested-expenses>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import expenses from "./Expenses";
import resume from "./Resume";
import suggestedExpenses from "./SuggestedExpenses";

export default {
  name: "Finances",
  components: {
    "v-expenses": expenses,
    "v-resume": resume,
    "v-suggested-expenses": suggestedExpenses
  }
};
</script>

<style scoped>

</style>
