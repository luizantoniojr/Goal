<template>
    <v-card>
      <v-flex>
       <v-list three-line>
        <v-list-tile avatar ripple v-bind:key="index" class="grey lighten-3 expense-item">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('total') }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
          <v-list-tile-action-text>
            {{total}}
          </v-list-tile-action-text>
          </v-list-tile-action>
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
    return {};
  },
  computed: {
    total() {
      var total = 0;
      for (let expense of this.$store.state.expenses) {
        total = total + expense.value * 1;
      }
      return total;
    }
  }
};
</script>

<style scoped>

</style>
