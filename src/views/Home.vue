<template>
  <v-app>
    <v-main>
      <Weather />
      <Aqi />
      <Alert />
    </v-main>
  </v-app>
</template>

<script>
import Weather from '../components/Weather.vue';
import Aqi from '../components/Aqi.vue';
import Alert from '../components/Alert.vue';
import { mapMutations } from 'vuex';
import '../scss/all.scss';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Weather,
    Aqi,
    Alert,
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
