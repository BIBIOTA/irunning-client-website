<template>
  <Overlay :message="'登入中...'" />
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
    ]),
    ...mapMutations([
      'setOverlay',
    ]),
    loginProcess(query) {
      if (query.error) {
        this.$router.push({name: 'Home'});
      }
      if (query.code) {
        this.getToken(query.code).then((res) => {
          if (res) {
            localStorage.set('intro', true);
            this.$router.push({name: 'Home'});
          } else {
            this.setOverlay(false);
            setTimeout(() => { this.$router.push({name: 'Home'}); }, 2000);
          }
        });
      }
    },
  },
  mounted() {
    this.setOverlay(true);
    this.loginProcess(this.$route.query);
  }
}
</script>