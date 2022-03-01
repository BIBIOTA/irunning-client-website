<template>
  <v-btn
    class="mx-auto overflow-hidden"
    rounded
    color="secondary"
    dark
    @click="setLogin"
    >
    Login 
    <figure class="flex">
      <img style="width: 100px" src="../assets/strava/logo.jpeg" alt="">
    </figure>
  </v-btn>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'StravaBtn',
  methods: {
    ...mapActions([
      'getRequestAccessURL',
    ]),
    async setLogin() {
      this.getRequestAccessURL();
    },
  },
}
</script>