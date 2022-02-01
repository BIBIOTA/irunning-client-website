<template>
  <v-card
    class="ma-auto"
    tile
    elevation="0"
  >
    <v-row class="py-5 flex align-center">
      <v-col cols="10" class="pr-15">
        <div class="text-h7 text-center">
          天氣
        </div>
        <div class="text-h7 text-center">
          {{area.city_name}} {{area.district_name}}
        </div>
      </v-col>
      <LocationPopup />
    </v-row>
    <template v-if="Object.keys(weather).length === 0">
      <div class="pa-15 text-center">
        <v-progress-circular
          indeterminate
          color="cyan"
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <ul class="dataList pl-0">
        <li>
          <figure v-if="weather.imageUrl">
            <img :src="weather.imageUrl" alt="">
          </figure>
        </li>
        <li class="justify-center" v-if="weather.T">
          <h1 class="green--text text--darken-2 text-h3 font-weight-bold">{{weather.T}} °C</h1>
        </li>
      </ul>
      <div class="pa-5 text-center">
        <template v-if="weather.WxValue">
          {{weather.WxValue}} 
        </template>
        <template v-if="weather.CI">
          {{weather.CI}} 
        </template>
        <template v-if="weather.PoP6h">
          降雨機率: {{weather.PoP6h}}%
        </template>
      </div>
      <v-card-text class="text-right"  v-if="weather.updated_at">
          資料更新時間: {{new Date(weather.updated_at).toLocaleString()}}
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import LocationPopup from './LocationPopup.vue';
import { mapState } from 'vuex';

export default {
  name: 'Weather',
  data() {
    return {
    };
  },
  methods: {},
  components: {
    LocationPopup,
  },
  computed: {
    ...mapState([
      'area',
      'weather'
    ]),
  },
  mounted() {
  },
}
</script>

<style scoped lang="scss">
</style>