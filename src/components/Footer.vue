<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      color="primary"
      dark
    >
      <div class="d-flex align-center mx-auto">
        <span class="pr-2 pb-1" id="logo" style="font-size: 1rem !important">
          I Running
        </span>
        <span class="pr-2">
          {{ year }} All rights reserved.
        </span>
        <TelegramIcon :width="32" :height="32" :color="'white'" />
      </div>
      <div>
      </div>
    </v-app-bar>
  </v-card>
</template>
<script>

import TelegramIcon from './TelegramIcon.vue';

export default {
  name: 'Footer',
  components: {
    TelegramIcon,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  methods: {},
  created() {},
  computed: {},
}
</script>