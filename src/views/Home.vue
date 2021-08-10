<template>
  <v-app>
    <v-card
    min-width="300"
    class="mx-auto overflow-x-hidden"
    >
    <v-app-bar
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>I Running</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >

          <v-list-item>
            <v-btn
              class="mx-auto overflow-hidden"
              rounded
              color="#F64906"
              dark
              @click="login"
            >
              Login 
              <figure class="flex">
                <img style="width: 100px" src="../assets/strava/logo.jpeg" alt="">
              </figure>
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Weather />
      <Aqi />
      <Alert />
    </v-main>
  </v-card>
  </v-app>
</template>

<script>
import Weather from '../components/Weather.vue';
import Aqi from '../components/Aqi.vue';
import Alert from '../components/Alert.vue';
import { mapActions, mapMutations } from 'vuex';
import '../scss/all.scss';

export default {
  name: 'Home',
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  components: {
    Weather,
    Aqi,
    Alert,
  },
  methods: {
    ...mapActions([
      'getRequestAccessURL',
    ]),
    ...mapMutations([
      'setArea',
    ]),
    async login() {
      this.getRequestAccessURL();
    },
  },
  created() {
    const data = {county: '臺北市', district:'北投區', siteName:'士林'};
    this.setArea(data);
  }
};
</script>
