<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app clipped fixed v-model="drawer" class="grey lighten-2">
          <v-list dense>
          <v-list-tile to="/Home">
            <v-list-tile-action>
              <v-icon>homel</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/Goals">
            <v-list-tile-action>
              <v-icon>done_all</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Goals</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/Setting">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Setting</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left class="cyan darken-2">
        <v-toolbar-side-icon color="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">Goal</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-badge overlap color="cyan darken-2">
        <span slot="badge">3</span>
        <v-btn color="cyan lighten-2" fab small dark>
          <v-icon dark>notifications</v-icon>
        </v-btn>
    </v-badge>
      </v-toolbar>
     <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view></router-view>        
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    drawer: false
  })
};
</script>

<style>

</style>
