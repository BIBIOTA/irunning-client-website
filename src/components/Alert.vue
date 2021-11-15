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