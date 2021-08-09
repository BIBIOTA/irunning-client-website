<template>
  <v-overlay :value="overlay" class="text-center">
    <v-progress-circular
      :size="70"
      :width="8"
      indeterminate
      color="cyan lighten-3"
    ></v-progress-circular>
    <v-card-title style="padding-left: 0">
      {{message}}
    </v-card-title>
  </v-overlay>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Overlay',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState([
      'overlay',
    ]),
  },
}
</script>