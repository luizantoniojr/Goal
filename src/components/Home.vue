<template>
  <v-flex xs12>
    <v-parallax src="https://vuetifyjs.com/static/doc-images/parallax/material.jpg" :jumbotron="false">
      <v-layout  align-center justify-center>
        <h1 class="white--text">Goal</h1>
        <h4 class="white--text">{{ $t('manage_your_goals') }}</h4>
      </v-layout>
    </v-parallax>
  </v-flex>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>

</style>
