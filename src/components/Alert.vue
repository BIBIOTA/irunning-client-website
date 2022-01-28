<template>
  <v-row class="justify-center position-relative z-index999 mx-10">
    <v-alert
      v-if="error"
      transition="scroll-y-reverse-transition"
      width="100%"
      color="orange"
      type="error"
      class="text-center"
    >
      {{error}}
    </v-alert>
    <v-alert
      v-if="success"
      transition="scroll-y-reverse-transition"
      width="100%"
      color="cyan"
      type="success"
      class="text-center"
    >
      {{success}}
    </v-alert>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Alert',
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'success',
      'error',
    ]),
  },
}
</script>
<style lang="scss">
  .v-alert {
    max-width: 480px;
    position: fixed;
    left: 50%;
    bottom: 10px;
    transform: translate(-50%, -50%);
    margin: 0 auto;  // Without this the box extends the width of the page
  }
</style>