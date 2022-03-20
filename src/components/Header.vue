<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="primary"
      dark
    >
      <router-link to="/">
        <v-toolbar-title
          id="logo"
          @click="group = 0"
        >
          I Running
        </v-toolbar-title>
      </router-link>

      <template v-for="(data, i) in list">
        <router-link
          class="white--text font-weight-bold px-8 pt-2"
          :to="data.to"
          :key="`list_${i}`"
          v-if="(!$vuetify.breakpoint.mobile && !data.isMobile) && (!data.isLogin || login)"
        >
          <v-list-item>
              <v-list-item-title>
                {{data.name}}
              </v-list-item-title>
          </v-list-item>
        </router-link>
      </template>

      <v-spacer></v-spacer>

      <v-list color="transparent" v-if="!$vuetify.breakpoint.mobile">
        <v-list-item v-if="login">
          <v-btn
            class="mx-auto overflow-hidden"
            rounded
            color="secondary"
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

      <v-app-bar-nav-icon
        v-else
        @click="drawer = true"
      />

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
          <template v-for="(data, i) in list">
            <router-link
              :to="data.to" :key="`list_${i}`" v-if="!data.isLogin || login">
              <v-list-item>
                  <v-list-item-icon>
                    <v-icon :color="data.icon.color" :class="data.icon.class">{{data.icon.value}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{data.name}}
                  </v-list-item-title>
              </v-list-item>
            </router-link>
          </template>
          <!-- <router-link to="/">
            <v-list-item>
                <v-list-item-icon>
                  <v-icon color="green darken-2">mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  首頁
                </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{ name: 'Activities', params: { page: 1 } }"  v-if="login">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="green darken-2">mdi-run</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                  我的跑步紀錄
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{ name: 'Events', params: { page: 1 } }">
            <v-list-item>
              <v-list-item-icon>
                <v-icon class="twicon-main-island" color="green darken-2"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                  全國賽會
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="{ name: 'Member' }"  v-if="login">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="green darken-2">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                  會員資料
              </v-list-item-title>
            </v-list-item>
          </router-link> -->

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view />
    <Alert />
  </v-card>
</template>
<script>

import StravaBtn from '@/components/StravaBtn.vue';
import Alert from '@/components/Alert.vue';

import { mapState, mapMutations, mapActions } from 'vuex';

import Cookies from 'js-cookie';

const iconColor = 'green darken-2';

export default {
  name: 'Header',
  components: {
    StravaBtn,
    Alert,
  },
  data() {
    return {
      drawer: false,
      group: null,
      list: [
        {
          name: '首頁',
          isLogin: false,
          to: '/',
          icon: {
            color: iconColor,
            value: 'mdi-home',
          },
          isMobile: true,
        },
        {
          name: '我的跑步紀錄',
          isLogin: true,
          to: {
            name: 'Activities',
            params: { page: 1 },
          },
          icon: {
            color: iconColor,
            value: 'mdi-run',
          }
        },
        {
          name: '全國賽會',
          isLogin: false,
          to: { name: 'Events', params: { page: 1 } },
          icon: {
            color: iconColor,
            class: 'twicon-main-island',
          }
        },
        {
          name: '會員資料',
          isLogin: true,
          to: { name: 'Member' },
          icon: {
            color: iconColor,
            value: 'mdi-account',
          }
        },
      ],
    };
  },
  methods: {
    ...mapMutations([
      'setIsLogin',
    ]),
    ...mapActions([
      'actionLogout',
    ]),
    logout() {
      this.actionLogout().then((result) => {
        if (result) {
          if (this.$route.meta?.isLogin) {
            this.$router.push({
              name: 'Home',
            });
          }
        } else {
          this.setIsLogin(false);
          if (this.$route.meta?.isLogin) {
            this.$router.push({
              name: 'Home',
            });
          }
        }
      });
    },
  },
  created() {
    const member = Cookies.get('member') ?? false;
    if (member) {
      this.setIsLogin(true);
    }
  },
  computed: {
    ...mapState([
      'login',
    ]),
  },
}
</script>