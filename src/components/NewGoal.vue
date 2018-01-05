<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn absolute dark fab right fixed bottom color="cyan lighten-2" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <form v-on:submit="save">
            <v-card-title>
            <span class="headline">New goal</span>
            </v-card-title>
            <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12>
                    <v-text-field label="Title" required v-model="goal.title"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select v-bind:items="levels" v-model="goal.level" label="Level" required></v-select>
                </v-flex>
                <v-flex xs12>
                    <v-text-field label="Subtitle" type="textbox" multi-line v-model="goal.subtitle"></v-text-field>
                </v-flex>
                </v-layout>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
            </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "NewGoal",
  data() {
    return {
      items: [],
      dialog: false,
      goal: {
        title: null,
        subtitle: null,
        state: "Active",
        level: null
      },
      levels: ["Daily", "Short", "Medium", "Long"]
    };
  },
  mounted: function() {
    this.goal.level = this.$store.state.level;
  },
  methods: {
    save(event) {
      event.preventDefault();
      this.$store.commit("addGoal", Object.assign({}, this.goal));
      this.clearGoal();
      this.dialog = false;
    },
    clearGoal(){
      this.goal.title = null;
      this.goal.subtitle = null;
      this.goal.level = null;
    }
  }
};
</script>

<style scoped>
.btn--bottom.btn--absolute {
  bottom: 50px;
}
</style>