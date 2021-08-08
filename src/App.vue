<template>
  <v-app>
    <v-main>
      <Weather />
      <Aqi />
    </v-main>
  </v-app>
</template>

<script>
import Weather from './components/Weather.vue';
import Aqi from './components/Aqi.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Weather,
    Aqi,
  },
  methods: {
    ...mapMutations([
      'setArea',
    ]),
  },
  created() {
    const data = {county: '臺北市', district:'北投區', siteName:'士林'};
    this.setArea(data);
  }
};
</script>
