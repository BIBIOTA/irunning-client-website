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
            v-for="(src, k) in imgSrc"
            :key="`weather_image_${k}`"
          >
            <figure class="d-flex justify-center">
              <v-img
                max-width="100"
                :src="src"
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
          color="rgba(13, 152, 186, 0.8)"
        >
          立即體驗
        </v-btn>
      </router-link>
    </v-row>
  </v-sheet>
</template>
<script>
import { images } from '../libs/images.js'

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
      imgSrc: [],
    };
  },
  methods: {
    async getWeatherImg() {
      return await images.getRamdomWeatherImage(5).then((src) => {
        return src;
      }).catch(() => {
        return null;
      });
    },
  },
  async created() {
    const res = await this.getWeatherImg(5);
    if (res.data && res.data.length > 0) {
      this.imgSrc = res.data;
    }
  },
  mounted() {
  },
}
</script>