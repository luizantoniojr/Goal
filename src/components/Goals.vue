<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-tabs dark grow :scrollable="false">
        <v-toolbar color="cyan lighten-2" dark>
            <v-tabs-bar class="cyan lighten-2" >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tabs-item  v-for="(item, i) in levels" :key="i" :href="'#tab-' + item">
                {{ item }}
              </v-tabs-item>
            </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
          <v-tabs-content id="tab-Daily">
            <v-card v-show="dailyGoals.length > 0">
              <v-list two-line>
                <template v-for="(goal, index) in dailyGoals">
                  <goal v-bind:goal="goal" v-bind:index="index"></goal>
                  <v-divider v-if="index + 1 < dailyGoals.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab-Short">
            <v-card v-show="shortGoals.length > 0">
              <v-list two-line>
                <template v-for="(goal, index) in shortGoals">
                  <goal v-bind:goal="goal" v-bind:index="index"></goal>
                  <v-divider v-if="index + 1 < shortGoals.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab-Medium">
            <v-card v-show="mediumGoals.length > 0">
              <v-list two-line>
                <template v-for="(goal, index) in mediumGoals">
                  <goal v-bind:goal="goal" v-bind:index="index"></goal>
                  <v-divider v-if="index + 1 < mediumGoals.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab-Long">
           <v-card v-show="longGoals.length > 0">
            <v-list two-line>
              <template v-for="(goal, index) in longGoals">
                <goal v-bind:goal="goal" v-bind:index="index"></goal>
                <v-divider v-if="index + 1 < longGoals.length"></v-divider>
              </template>
            </v-list>
          </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-flex>
    <v-snackbar v-model="snackbar" color="cyan lighten-2">
      Add your first goal
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    <new-goal></new-goal>    
  </v-layout>
</template>

<script>
import NewGoal from "@/components/NewGoal";
import Goal from "@/components/Goal";
export default {
  name: "Goals",
  components: {
    "new-goal": NewGoal,
    goal: Goal
  },
  data() {
    return {
      snackbar: false,
      levels: ["Daily", "Short", "Medium", "Long"]
    };
  },
  mounted: function() {
    if (this.goals.length == 0) this.snackbar = true;
  },
  computed: {
    goals() {
      return this.$store.state.goals;
    },
    dailyGoals() {
      return this.$store.state.goals.filter(item => {
        return item.level == "Daily";
      });
    },
    shortGoals() {
      return this.$store.state.goals.filter(item => {
        return item.level == "Short";
      });
    },
    mediumGoals() {
      return this.$store.state.goals.filter(item => {
        return item.level == "Medium";
      });
    },
    longGoals() {
      return this.$store.state.goals.filter(item => {
        return item.level == "Long";
      });
    }
  }
};
</script>

<style scoped>
</style>
