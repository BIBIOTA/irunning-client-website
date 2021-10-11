<template>
  <v-app style="max-width: 480px; margin: auto; position:relative">
    <v-card
      v-show="!dialog"
      class="overflow-x-hidden"
      height="100vh"
      >
      <v-app-bar
        height="70"
        color="cyan"
        dark
      >
        <router-link to="/" style="color: white!important">
          <v-toolbar-title
            style="font-family: 'Pacifico', cursive !important;">
            I Running
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
      > 
        <v-list>
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
            <StravaBtn />
          </v-list-item>
        </v-list>
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
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

            <router-link to="/Activities"  v-if="login">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-run</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    我的跑步紀錄
                </v-list-item-title>
              </v-list-item>
            </router-link>

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

            <!-- <v-list-item v-if="login">
              <v-list-item-icon>
                <v-icon color="green darken-2">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>會員中心</v-list-item-title>
            </v-list-item> -->
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
      <Alert />
    </v-card>
    <div
      v-show="dialog"
      style="background-color: black; height: 100%; width: 100%">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
      >
        <v-carousel
          style="max-width: 480px; margin: auto"
          height="100vh"
          hide-delimiter-background
          @change="imgIndex = imgs[$event].index"
          :prev-icon="false"
          :next-icon="(imgIndex === imgs.length - 1) ? false : 'mdi-arrow-right'"
          >
          <v-carousel-item
            v-for="(item,i) in imgs"
            :key="`imgs_${i}`"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <IntroSectionOne v-show="i === 0" :transblack="transblack" />
            <IntroSectionTwo v-show="i === 1" :transblack="transblack" @closeIntro="closeIntro" />
            <IntroSectionThree v-show="i === 2" :transblack="transblack"
            :events="events"
            @closeIntro="closeIntro" />
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import StravaBtn from './components/StravaBtn.vue';
import IntroSectionOne from './components/IntroSectionOne.vue';
import IntroSectionTwo from './components/IntroSectionTwo.vue';
import IntroSectionThree from './components/IntroSectionThree.vue';
import Alert from './components/Alert.vue';
import { index } from './libs/index.js';
import { mapState, mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import localStorage from 'local-storage';

import bg1 from './assets/index/runner_mb.webp';
import bg2 from './assets/index/run_weather_mb.webp';
import bg3 from './assets/index/taipei_marathon_mb.webp';

export default {
  data() {
    return {
      drawer: false,
      group: null,
      dialog: true,
      transblack: 'rgba(0, 0, 0, 0.3)',
      imgIndex: 0,
      imgs: [
        {
          index: 0,
          src : bg1,
        },
        {
          index: 1,
          src : bg2,
        },
        {
          index: 2,
          src : bg3,
        },
      ],
      events: [],
    };
  },
  components: {
    StravaBtn,
    IntroSectionOne,
    IntroSectionTwo,
    IntroSectionThree,
    Alert,
  },
  methods: {
    ...mapMutations([
      'setIsLogin',
    ]),
    logout() {
      this.setIsLogin(false);
    },
    closeIntro() {
      this.dialog = false;
      localStorage.set('intro', true);
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
    }
    const intro = localStorage.get('intro');
    if (intro || this.$route.name === 'Login') {
      this.dialog = false;
    }
  },
  mounted() {
    index.getIndexEvents().then((res) => {
      if (res.status) {
        this.events = res.data;
      } else {
        console.log(res.message);
      }
    });
  },
}
</script>
