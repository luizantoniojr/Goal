<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-tabs dark grow :scrollable="false">
        <v-toolbar color="cyan lighten-2" dark>
            <v-tabs-bar class="cyan lighten-2" >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tabs-item  v-for="(item, i) in levels" :key="i" :href="'#tab-' + item.value">
                {{ item.text }}
              </v-tabs-item>
            </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
          <v-tabs-content id="tab-1">
            <v-card v-show="shortGoals.length > 0">
              <v-list two-line>
                <template v-for="(goal, index) in shortGoals">
                  <div :key="index">
                    <goal v-bind:goal="goal" v-bind:index="index"></goal>
                    <v-divider v-if="index + 1 < shortGoals.length"></v-divider>
                  </div>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab-2">
            <v-card v-show="mediumGoals.length > 0">
              <v-list two-line>
                <template v-for="(goal, index) in mediumGoals">
                  <div :key="index">
                    <goal v-bind:goal="goal" v-bind:index="index"></goal>
                    <v-divider v-if="index + 1 < mediumGoals.length"></v-divider>
                  </div>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>
          <v-tabs-content id="tab-3">
           <v-card v-show="longGoals.length > 0">
            <v-list two-line>
              <template v-for="(goal, index) in longGoals">
                <div :key="index">
                  <goal v-bind:goal="goal" v-bind:index="index"></goal>
                  <v-divider v-if="index + 1 < longGoals.length"></v-divider>
                </div>
              </template>
            </v-list>
          </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-flex>
    <new-goal></new-goal>    
  </v-layout>
</template>

<script>
import NewGoal from "@/components/Goals/NewGoal";
import Goal from "@/components/Goals/Goal";

export default {
  name: "Goals",
  components: {
    "new-goal": NewGoal,
    goal: Goal
  },
  data() {
    return {
      levels: this.$enum.getTextValue("levels")
    };
  },
  computed: {
    goals() {
      return this.$store.state.goals;
    },
    shortGoals() {
      return this.$store.state.goals.filter(
        this.checkLevelAndState(this.$enum.levels.short)
      );
    },
    mediumGoals() {
      return this.$store.state.goals.filter(
        this.checkLevelAndState(this.$enum.levels.medium)
      );
    },
    longGoals() {
      return this.$store.state.goals.filter(
        this.checkLevelAndState(this.$enum.levels.long)
      );
    }
  },
  methods: {
    checkLevelAndState(level) {
      return item => {
        return item.level == level && item.state == "Active";
      };
    }
  }
};
</script>

<style scoped>

</style>
