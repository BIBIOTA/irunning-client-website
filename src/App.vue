<template>
  <router-view />
</template>

<script>
import { mapMutations } from 'vuex';
import Cookies from 'js-cookie'

export default {
  methods: {
    ...mapMutations([
      'setIsLogin',
      'setLoginData',
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
