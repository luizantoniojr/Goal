<template>
    <v-dialog v-model="dialog"  max-width="560px">
      <v-btn absolute dark fab right fixed bottom color="cyan lighten-2" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <form v-on:submit="submit">
            <v-card-title>
            <span class="headline">{{ $t('new_goal') }}</span>
            </v-card-title>
            <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                <v-flex xs12>
                    <v-text-field
                      v-bind:label="$t('title')"
                      data-vv-name="title"
                      v-validate="'required'"
                      :error-messages="errors.collect('title')"
                      v-model="goal.title">
                    </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select 
                    v-bind:items="levels" 
                    item-text="text" 
                    item-value="value" 
                    v-model="goal.level" 
                    v-bind:label="$t('level')" 
                    data-vv-name="level"
                    v-validate="'required'"
                    :error-messages="errors.collect('title')"
                    >
                  </v-select>
                </v-flex>
                <v-flex xs12>
                    <v-text-field 
                      v-bind:label="$t('subtitle')" 
                      type="textbox" 
                      multi-line 
                      v-model="goal.subtitle">
                    </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <label class="subheading grey--text">{{ $t('conclusion') }}</label>
                  <v-date-picker 
                    color="cyan lighten-2" 
                    header-color="cyan lighten-2" 
                    v-model="goal.date" 
                    v-bind:locale="$store.state.culture" 
                    landscape 
                    required>
                  </v-date-picker>
                </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">{{ $t('close') }}</v-btn>
            <v-btn color="blue darken-1" flat type="submit">{{ $t('save') }}</v-btn>
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
        level: null,
        date: null
      },
      levels: this.$enum.getTextValue("levels")
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.$validator.validateAll().then(this.save);
    },
    save(validation) {
      if (validation) {
        this.$store.commit("addGoal", Object.assign({}, this.goal));
        this.clearGoal();
        this.dialog = false;
      }
    },
    clearGoal() {
      this.goal.title = null;
      this.goal.subtitle = null;
      this.goal.level = null;
      this.goal.date = null;
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

.date-label {
  font-size: 16px;
  color: #757575;
  font-weight: 300;
}
</style>