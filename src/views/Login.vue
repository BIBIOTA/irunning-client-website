<template>
  <Overlay :message="'登入中...'" />
</template>
<script>
import Overlay from '../components/Overlay.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  components: {
    Overlay,
  },
  methods: {
    ...mapMutations([
      'setOverlay',
    ]),
  },
  mounted() {
    this.setOverlay(true);
  }
}
</script>