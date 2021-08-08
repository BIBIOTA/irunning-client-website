<template>
  <v-row class="justify-center position-relative z-index999">
    <v-alert
        v-if="error"
        transition="scroll-y-reverse-transition"
        width="50%"
        color="orange"
        type="error"
      >{{error}}</v-alert>
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
      'succes',
      'error',
    ]),
  },
}
</script>