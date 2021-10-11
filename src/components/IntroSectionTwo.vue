<template>
  <v-sheet
    :color="transblack"
    height="100%"
    class="margin auto"
    tile
  >
    <v-row
      class="fill-height flex-column"
      align="center"
      justify="center"
      column
    >
      <v-carousel
        continuous
        cycle
        interval="3000"
        height="100"
        hide-delimiters
        :show-arrows="false"
        >
        <template>
          <v-carousel-item
            v-for="(count) in imgCount"
            :key="`weather_${ap}_${count}`"
          >
            <figure class="d-flex justify-center">
              <v-img
                max-width="100"
                :src="getWeatherImg(count)"
              />
            </figure>
          </v-carousel-item>
        </template>
      </v-carousel>
      <div
        class="py-6 text-h4 font-weight-bold white--text">
        今天適合跑步嗎?
      </div>
      <div
        class="pb-6 text-subtitle-1 font-weight-bold white--text text-center">
        快速取得空氣品質和天氣資訊!
      </div>
      <router-link :to="{ name: 'Home' }" >
        <v-btn
          class="white--text text-h5 py-6"
          @click="$emit('closeIntro')"
          color="cyan"
        >
          立即體驗
        </v-btn>
      </router-link>
    </v-row>
  </v-sheet>
</template>
<script>
export default {
  name: 'IntroSectionTwo',
  props: {
    transblack: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    getDayOrNight() {
      const hours = new Date().getHours()
      if (hours > 6 && hours < 18) {
        return 'day';
      } else {
        return 'night';
      }
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    },
    getWeatherImg(WxValue) {
      return `${process.env.VUE_APP_API_STORAGE}/weather/${this.getDayOrNight()}/${parseInt(WxValue, 10)}.svg`
    },
  },
  created() {
    const imgCount = [];
    for (let i = 1; i <= 5; i += 1) {
      const ramdom = this.getRandomInt(1, 42);
      if (ramdom !== 40) {
        imgCount.push(ramdom);
      }
    }
    this.imgCount = imgCount;
  },
  mounted() {
  },
}
</script>