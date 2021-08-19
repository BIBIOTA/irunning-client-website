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
                  <img style="width: 100px" src="./assets/strava/logo.jpeg" alt="">
                </figure>
              </v-btn>
            </v-list-item>

            <router-link to="/" >
            <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  首頁
                </v-list-item-title>
            </v-list-item>
            </router-link>

            <v-list-item v-if="login">
              <v-list-item-icon>
                <v-icon color="green darken-2">mdi-run</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <!-- <router-link> -->
                  我的跑步紀錄
                <!-- </router-link> -->
              </v-list-item-title>
            </v-list-item>

            <router-link to="/Events">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon class="twicon-main-island" color="green darken-2"></v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    全國賽會
                </v-list-item-title>
              </v-list-item>
            </router-link>

            <v-list-item v-if="login">
              <v-list-item-icon>
                <v-icon color="green darken-2">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>會員中心</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-card>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    ...mapActions([
      'getRequestAccessURL',
    ]),
    ...mapMutations([
      'setIsLogin',
      'setLoginData',
      'setIsLogin',
    ]),
    async setLogin() {
      this.getRequestAccessURL();
    },
    logout() {
      this.setIsLogin(false);
    },
  },
  computed: {
    ...mapState([
      'login',
    ]),
  },
  created() {
    const member = Cookies.get('member')?JSON.parse(Cookies.get('member')):false;
    if (member) {
      this.setIsLogin(true);
      this.setLoginData(member);
    }
  },
}
</script>
