<template>
  <v-main>
    <v-card
      color="primary"
      tile
      outlined
    >
      <v-col dense>
        <StravaIndex />
        <Weather />
        <Aqi />
      </v-col>
    </v-card>
  </v-main>
</template>

<script>
import '../scss/all.scss';
import Aqi from '../components/Aqi.vue';
import Weather from '../components/Weather.vue';
import StravaIndex from '../components/StravaIndex.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Aqi,
    Weather,
    StravaIndex,
  },
  methods: {},
  watch: {
    login() {
      this.$router.go();
    },
  },
  computed: {
    ...mapState([
      'login',
    ]),
  },
};
</script>
