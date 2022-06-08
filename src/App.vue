<template>
  <v-app>
    <Header />
    <Footer />
  </v-app>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { index } from './libs/index.js';

export default {
  data() {
    return {
      dialog: true,
      transblack: 'rgba(0, 0, 0, 0.3)',
      events: [],
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {},
  created() {},
  mounted() {
    index.getIndexEvents().then((res) => {
      if (res.status) {
        this.events = res.data;
      } else {
        console.log(res.message);
      }
    });
  },
}
</script>
