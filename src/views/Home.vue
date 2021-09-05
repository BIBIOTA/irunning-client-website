<template>
  <v-main>
    <StravaIndex />
    <Weather />
    <Aqi />
    <Alert />
  </v-main>
</template>

<script>
import '../scss/all.scss';
import Aqi from '../components/Aqi.vue';
import Alert from '../components/Alert.vue';
import Weather from '../components/Weather.vue';
import StravaIndex from '../components/StravaIndex.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Aqi,
    Alert,
    Weather,
    StravaIndex,
  },
  methods: {
    ...mapMutations([
      'setArea',
    ]),
  },
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
  created() {
    const data = {county: '臺北市', district:'北投區', siteName:'士林'};
    this.setArea(data);
  }
};
</script>
