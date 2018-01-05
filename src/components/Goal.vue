<template>
  <v-list-tile avatar ripple v-bind:key="index" @click="" class="grey lighten-3">
    <v-list-tile-content>
      <v-list-tile-title>{{ goal.title }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ goal.subtitle }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-list-tile-action-text>{{ goal.date }}</v-list-tile-action-text>
      <v-icon color="grey lighten-1">done</v-icon>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: "Goal",
  props: {
    goal: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
