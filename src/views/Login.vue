<template>
  <v-main>
    <v-card
      tile
      outlined
      id="mainCard"
    >
      <Overlay :message="'登入中...'" />
    </v-card>
  </v-main>
</template>
<script>
import Overlay from '../components/Overlay.vue';
import { mapActions, mapMutations } from 'vuex';
import localStorage from 'local-storage';

export default {
  name: 'Login',
  components: {
    Overlay,
  },
  methods: {
    ...mapActions([
      'getToken',
      'login',
    ]),
    ...mapMutations([
      'setOverlay',
    ]),
    async loginProcess(query) {
      if (query.error) {
        this.$router.push({name: 'Home'});
      }
      if (query.code) {
        const payload = await this.getToken(query.code);
        if (payload) {
          const res = await this.login(payload);
          if (res) {
            localStorage.set('intro', true);
            window.location.href = '/';
          } else {
            this.error();
          }
        } else {
          this.error();
        }
      }
    },
    error() {
      this.setOverlay(false);
      setTimeout(() => { window.location.href = '/' }, 2000);
    }
  },
  mounted() {
    this.setOverlay(true);
    this.loginProcess(this.$route.query);
  }
}
</script>