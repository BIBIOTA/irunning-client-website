<template>
  <v-app>
    <v-main>
      <!-- <Weather /> -->
      <Aqi :area="area" />
    </v-main>
  </v-app>
</template>

<script>
// import Weather from './components/Weather.vue';
import Aqi from './components/Aqi.vue';

export default {
  name: 'App',
  data() {
    return {
      area: {
        county: '',
        siteName: '',
      },
    };
  },
  components: {
    // Weather,
    Aqi,
  },
};
</script>
