<template>
  <v-app>
    <v-card
      v-show="!dialog"
      min-width="300"
      class="mx-auto overflow-x-hidden"
      >
      <v-app-bar
        color="cyan"
        dark
      >
        <v-toolbar-title>I Running</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
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
              <StravaBtn />
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
    <div
      v-show="dialog"
      style="background-color: black; height: 100%; width: 100%">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
      >
        <v-carousel
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
import { index } from './libs/index.js';
import { mapState, mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import localStorage from 'local-storage';

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
          src : 'https://wallpaperaccess.com/full/1143289.jpg',
        },
        {
          index: 1,
          src : 'https://wallpaperaccess.com/full/1143289.jpg',
        },
        {
          index: 2,
          src : 'https://wallpaperaccess.com/full/1143289.jpg',
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
  },
  methods: {
    ...mapMutations([
      'setIsLogin',
      'setLoginData',
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
      this.setLoginData(member);
    }
    const intro = localStorage.get('intro');
    if (intro) {
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
