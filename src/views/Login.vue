<template>
  <Overlay :message="'登入中...'" />
</template>
<script>
import Overlay from '../components/Overlay.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
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
            if (this.loginData.is_register === 1) {
              this.$router.push({name: 'Home'});
            } else {
              this.$router.push({name: 'MemberForm', params: { formType: 'register' } });
            }
          } else {
            this.setOverlay(false);
            setTimeout(() => { this.$router.push({name: 'Home'}); }, 2000);
          }
        });
      }
    },
  },
  computed: {
    ...mapState([
      'loginData',
    ]),
  },
  mounted() {
    this.setOverlay(true);
    this.loginProcess(this.$route.query);
  }
}
</script>