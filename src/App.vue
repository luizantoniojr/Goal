<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app clipped fixed v-model="drawer" :disable-route-watcher="true" class="grey lighten-2">
        <v-list dense>
          <v-list-tile to="/Goals">
            <v-list-tile-action>
              <v-icon>done_all</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('goals') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left class="cyan darken-2">
        <v-toolbar-side-icon v-if="hasUser" color="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Goal</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- logged -->
        <template v-if="hasUser">
           <!-- <v-badge overlap color="cyan darken-2">
              <span slot="badge">3</span>
              <v-btn color="cyan lighten-2" fab small dark>
                <v-icon dark>notifications</v-icon>
              </v-btn>
            </v-badge> -->
          <v-avatar class="cyan lighten-2">
            <span class="white--text headline">{{firstLetterUserName}}</span>
          </v-avatar>
           <v-btn flat icon dark  @click="logOut">
                <v-icon dark>exit_to_app</v-icon>
            </v-btn>
        </template>
        <!-- not logged in -->
        <template v-else>
          <v-btn outline color="cyan lighten-3" @click="logIn">{{$t('login')}}</v-btn>
        </template>
      </v-toolbar>
     <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view></router-view>        
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy;<a href="https://github.com/luizantoniojr/Goal">Goal</a> 2018</span>
    </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    drawer: false
  }),
  computed: {
    hasUser() {
      return !!this.$store.state.user;
    },
    firstLetterUserName() {
      return this.$store.state.user.displayName[0];
    }
  },
  watch: {
    hasUser(hasUser) {
      if (!this.hasUser && this.drawer) this.drawer = false;
    }
  },
  methods: {
    logIn() {
      this.$store.dispatch("logIn");
    },
    logOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>

<style>

</style>
