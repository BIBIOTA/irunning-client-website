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
          <v-list-item v-if="login">
            <v-btn
              class="mx-auto overflow-hidden"
              rounded
              color="#F64906"
              dark
              width="150"
              @click="logout"
            >
              登出 
            </v-btn>
          </v-list-item>

          <v-list-item v-else>
            <v-btn
              class="mx-auto overflow-hidden"
              rounded
              color="#F64906"
              dark
              @click="setLogin"
            >
              Login 
              <figure class="flex">
                <img style="width: 100px" src="../assets/strava/logo.jpeg" alt="">
              </figure>
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="green darken-2">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>首頁</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="login">
            <v-list-item-icon>
              <v-icon color="green darken-2">mdi-run</v-icon>
            </v-list-item-icon>
            <v-list-item-title>我的跑步紀錄</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon class="twicon-main-island" color="green darken-2"></v-icon>
            </v-list-item-icon>
            <v-list-item-title>全國賽會</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="login">
            <v-list-item-icon>
              <v-icon color="green darken-2">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>會員中心</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <StravaIndex />
      <Weather />
      <Aqi />
      <Alert />
    </v-main>
  </v-card>
  </v-app>
</template>

<script>
import Aqi from '../components/Aqi.vue';
import Alert from '../components/Alert.vue';
import Weather from '../components/Weather.vue';
import StravaIndex from '../components/StravaIndex.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
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
    Aqi,
    Alert,
    Weather,
    StravaIndex,
  },
  methods: {
    ...mapActions([
      'getRequestAccessURL',
    ]),
    ...mapMutations([
      'setArea',
      'setIsLogin'
    ]),
    async setLogin() {
      this.getRequestAccessURL();
    },
    logout() {
      this.setIsLogin(false);
    },
  },
  watch: {
    login() {
      this.$router.go();
    },
  },
  computed: {
    ...mapState([
      'login',
    ]),
  },
  created() {
    const data = {county: '臺北市', district:'北投區', siteName:'士林'};
    this.setArea(data);
  }
};
</script>
