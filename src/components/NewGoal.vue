<template>
    <v-dialog v-model="dialog" max-width="560px">
      <v-btn absolute dark fab right fixed bottom color="cyan lighten-2" slot="activator">
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <form>
            <v-card-title>
            <span class="headline">{{ $t('new_goal') }}</span>
            </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        v-bind:label="$t('title')"
                        v-model="goal.title"
                        v-validate="'required'"
                        :error-messages="errors.collect('title')"
                        v-bind:data-vv-as="$t('title')"
                        data-vv-name="title"
                        required>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-select 
                        v-bind:label="$t('level')" 
                        v-bind:items="levels" 
                        v-model="goal.level" 
                        item-text="text" 
                        item-value="value" 
                        v-validate="'required'"
                        :error-messages="errors.collect('level')"
                        v-bind:data-vv-as="$t('level')"
                        data-vv-name="level"
                        required>
                      </v-select>
                    </v-flex>
                    <v-flex v-if="goal.level" xs12 >
                      <v-menu
                        lazy
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        max-width="290px"
                        min-width="290px">
                        <v-text-field
                          slot="activator"
                          v-bind:label="$t('conclusion')"
                          v-model="conclusionDisplayed"
                          v-validate="'required'"
                          :error-messages="errors.collect('conclusion')"
                          v-bind:data-vv-as="$t('conclusion')"
                          data-vv-name="conclusion"
                          required
                          readonly>
                          </v-text-field>
                        <v-time-picker 
                          v-if="typeOfPicker == 'time'"
                          header-color="cyan lighten-2" 
                          v-model="goal.conclusion">
                          <template slot-scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">{{$t('cancel')}}</v-btn>
                              <v-btn flat color="primary" @click="save">{{$t('confirm')}}</v-btn>
                            </v-card-actions>
                          </template>
                        </v-time-picker>
                        <v-date-picker 
                          v-else
                          v-model="goal.conclusion" 
                          scrollable 
                          actions
                          header-color="cyan lighten-2" 
                          v-bind:locale="$store.state.culture"
                          v-bind:type="typeOfPicker">
                          <template slot-scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">{{$t('cancel')}}</v-btn>
                              <v-btn flat color="primary" @click="save">{{$t('confirm')}}</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                    </v-menu>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field 
                        v-bind:label="$t('description')" 
                        type="textbox" 
                        multi-line 
                        v-model="goal.subtitle">
                      </v-text-field>
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
        conclusion: null
      },
      conclusionDisplayed: null,
      levels: this.$enum.getTextValue("levels")
    };
  },
  watch: {
    "goal.level"(newLevel) {
      if (newLevel) this.goal.conclusion = null;
    },
    "goal.conclusion"(newConclusion) {
      if (newConclusion)
        this.conclusionDisplayed = this.$moment.formatterConclusion(this.goal);
    }
  },
  computed: {
    typeOfPicker() {
      switch (this.goal.level) {
        case 1:
          return "time";
        case 2:
          return "date";
        default:
          return "month";
      }
    }
  },
  methods: {
    submit(event) {
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
      this.goal.conclusion = null;
      this.conclusionDisplayed = null;
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

.date-label {
  font-size: 16px;
  color: #757575;
  font-weight: 300;
}
</style>