<template>
  <v-app>
    <Header />
    <div
      v-show="dialog"
      style="background-color: black; height: 100%; width: 100%">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
      >
        <v-carousel
          style="max-width: 480px; margin: auto"
          height="100vh"
          hide-delimiter-background
          @change="imgIndex = imgs[$event].index"
          :prev-icon="false"
          :next-icon="(imgIndex === imgs.length - 1) ? false : 'mdi-arrow-right'"
          >
          <v-carousel-item
            v-for="(item,i) in imgs"
            :key="`imgs_${i}`"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <IntroSectionOne v-show="i === 0" :transblack="transblack" />
            <IntroSectionTwo v-show="i === 1" :transblack="transblack"
            :events="events"
            @closeIntro="closeIntro" />
            <IntroSectionThree v-show="i === 2" :transblack="transblack" @closeIntro="closeIntro" />
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>

import Header from '@/components/Header.vue'
import IntroSectionOne from '@/components/IntroSectionOne.vue';
import IntroSectionTwo from '@/components/IntroSectionTwo.vue';
import IntroSectionThree from '@/components/IntroSectionThree.vue';

import { index } from './libs/index.js';

import { mapMutations } from 'vuex';

import localStorage from 'local-storage';

import bg1 from '@/assets/index/runner_mb.webp';
import bg2 from '@/assets/index/taipei_marathon_mb.webp';
import bg3 from '@/assets/index/run_weather_mb.webp';

export default {
  data() {
    return {
      dialog: true,
      transblack: 'rgba(0, 0, 0, 0.3)',
      imgIndex: 0,
      imgs: [
        {
          index: 0,
          src : bg1,
        },
        {
          index: 1,
          src : bg2,
        },
        {
          index: 2,
          src : bg3,
        },
      ],
      events: [],
    };
  },
  components: {
    Header,
    IntroSectionOne,
    IntroSectionTwo,
    IntroSectionThree,
  },
  methods: {
    ...mapMutations([
      'setIsMobile',
    ]),
    closeIntro() {
      this.dialog = false;
      localStorage.set('intro', true);
    },
    onResize () {
      this.setIsMobile(window.innerWidth < 768);
    },
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  created() {
    const intro = localStorage.get('intro');
    if (intro) {
      this.dialog = false;
    }
  },
  mounted() {
    index.getIndexEvents().then((res) => {
      if (res.status) {
        this.events = res.data;
      } else {
        console.log(res.message);
      }
    });

    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true })
  },
}
</script>
