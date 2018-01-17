<template>
 <v-list three-line>
    <v-list-tile avatar ripple v-bind:key="index" class="grey lighten-3 goal-item">
      <v-list-tile-content>
        <v-list-tile-title>{{ goal.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ goal.subtitle }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-list-tile-action-text>{{ $moment.formatterConclusion(goal) }}</v-list-tile-action-text>
        <v-bottom-sheet v-model="sheet">
          <v-btn slot="activator" flat icon color="cyan lighten-2">
            <v-icon>build</v-icon>
          </v-btn>
          <v-list>
            <v-subheader>{{$t('settings')}}</v-subheader>
            <v-list-tile @click="conclude">
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <v-icon color="cyan lighten-2">check</v-icon>
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>{{$t('conclude')}}</v-list-tile-title>
            </v-list-tile>
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
  name: "Goal",
  data() {
    return {
      sheet: false
    };
  },
  props: {
    goal: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    conclude() {
      this.goal.state = "Conclude";
      this.sheet = false;
    },
    remove() {
      var goal = this.goal;
      this.$store.state.goals = this.$store.state.goals.filter(item => {
        return item != goal;
      });
      this.sheet = false;
    },
    edit() {
      this.$store.commit("setGoal", this.goal);
      this.sheet = false;
      this.$store.commit("setDialogNewGoal", true);
    }
  }
};
</script>

<style scoped>
.dialog__container {
  display: none !important;
}

.goal-item:hover .dialog__container {
  display: inline !important;
}

.goal-item:focus .dialog__container {
  display: inline !important;
}
</style>
