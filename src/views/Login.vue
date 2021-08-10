<template>
  <Overlay :message="'登入中...'" />
</template>
<script>
import Overlay from '../components/Overlay.vue';
import { mapActions, mapMutations } from 'vuex';

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
    async loginProcess(query) {
      if (query.code) {
        this.getToken(query.code);
      }
    },
  },
  mounted() {
    this.setOverlay(true);
    this.loginProcess(this.$route.query);
  }
}
</script>