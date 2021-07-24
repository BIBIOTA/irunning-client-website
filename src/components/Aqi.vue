<template>
  <v-card
    class="ma-auto"
    max-width="300"
    tile
  >
    <ul class="aqiList pl-0">
      <li>
        <v-icon
          large
          color="green darken-2"
        >
          mdi-emoticon-happy
        </v-icon>
        <div class="text-center">
          AQI
        </div>
        <div class="text-center">
          良好
        </div>
      </li>
      <li>
        <v-icon
          large
          color="green darken-2"
        >
          mdi-emoticon-neutral
        </v-icon>
        <div class="text-center">
          PM2.5
        </div>
        <div class="text-center">
          良好
        </div>
      </li>
      <li>
        <v-icon
          large
          color="green darken-2"
        >
          mdi-emoticon-dead
        </v-icon>
        <div class="text-center">
          PM10
        </div>
        <div class="text-center">
          良好
        </div>
      </li>
    </ul>
  </v-card>
</template>

<script>
import { aqi } from '../libs/aqi.js';

export default {
  name: 'Aqi',
  data() {
    return {
      aqiData: null,
    };
  },
  props: {
    area: Object,
  },
  components: {
  },
  mounted() {
    aqi.getAqi().then((res) => {
      if (res && res !== 404) {
        console.log(res);
        res.records.forEach((data) => {
          if (data.County === this.area.county && data.SiteName === this.area.siteName) {
            this.aqiData = data;
          }
        });
      } else {
        console.log('錯誤');
      }
    });
  },
}
</script>

<style scoped lang="scss">
    .aqiList {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
      }
    }
</style>