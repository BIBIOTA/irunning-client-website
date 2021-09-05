<template>
  <div class="pa-15 text-center" v-if="loading">
    <v-progress-circular
      indeterminate
      color="cyan"
    ></v-progress-circular>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Loading',
  computed: {
    ...mapState([
      'loading',
    ]),
  },
}
</script>