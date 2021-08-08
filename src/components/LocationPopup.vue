<template>
  <v-row class="py-5 flex align-center">
    <v-col class="col-md-4">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-8"
            fab
            dark
            small
            v-bind="attrs"
            v-on="on"
            color="cyan"
          >
            <v-icon dark>
              mdi-pencil
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-overlay :value="overlay" class="text-center">
              <v-progress-circular
                :size="70"
                :width="8"
                indeterminate
                color="cyan lighten-3"
              ></v-progress-circular>
              <v-card-title class="pl-8">
                資料讀取中...
              </v-card-title>
            </v-overlay>
            <v-card-title>
              請選擇縣市
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="area.county"
                :items="cities"
                label="請選擇縣市"
                item-text="CityName"
                @input="getDistrict($event);"
              ></v-select>
            </v-card-text>
            <v-card-title>
              請選擇鄉鎮區
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="area.district"
                :items="districts"
                label="請選擇鄉鎮區"
                item-text="AreaName"
                @input="passVal($event.CityName, $event.AreaName, area.siteName);getWeather($event.CityName, $event.AreaName)"
                return-object
              ></v-select>
            </v-card-text>
            <v-card-title>
                選擇測量站
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="area.siteName"
                :items="site"
                label="請選擇測量站"
                item-text="SiteName"
                @input="getAqiData(area.county, area.district,$event);"
              ></v-select>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                color="primary"
                text
                @click="() => { 
                  dialog.value = false;
                }"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { cities } from '../libs/cities.js';
import { aqi } from '../libs/aqi.js';
import { weather } from '../libs/weather.js';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Weather',
  data() {
    return {
      cities: [],
      districts: [],
      site: [],
    };
  },
  components: {
  },
  methods: {
    ...mapMutations([
      'setOverlay',
      'setAqi',
      'setArea',
      'setWeather',
      'setError',
    ]),
    getCities() {
      cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
        } else {
          console.log(res.message);
        }
      }).then(() => {
        this.getDistrict(this.area.county, this.area.district);
      });
    },
    getDistrict(county, propsDistrict = null) {
      this.setOverlay(true);
      cities.getDistricts(county).then((res) => {
        if (res.status) {
          this.districts = res.data;
          const district = propsDistrict ? propsDistrict : this.districts[0].AreaName;
          const siteName = this.area.siteName ? this.area.siteName : null;
          this.passVal(county, district, siteName);
          this.getWeather(county, district);
          this.getAqi(siteName);
        } else {
          this.setWeather(null);
          this.setError(res.message);
        }
      });
    },
    getWeather(county, district) {
      weather.getWeather(county, district).then((res) => {
        if (res.status) {
          this.setWeather(res.data);
        } else {
          this.setWeather({});
          this.setError(res.message);
        }
      });
    },
    getAqi(siteName) {
      aqi.getAqi(this.area.county).then((res) => {
        if (res.status) {
          this.site = res.data;
          res.data.forEach((data) => {
            if (siteName === data.SiteName) {
              this.setAqi(data);
            } else {
              this.passVal(this.area.county, this.area.district, res.data[0].SiteName);
              this.setAqi(res.data[0]);
            }
          });
          this.setOverlay(false);
        } else {
          this.setAqi({});
          this.setError(res.message);
        }
      });
    },
    getAqiData(county, district, siteName) {
      this.site.forEach((data) => {
        if (siteName === data.SiteName) {
          this.setAqi(data);
        }
      });
      this.passVal(county, district, siteName);
    },
    passVal(county, district, siteName) {
      const data = { county, district ,siteName };
      this.setArea(data);
    },
  },
  computed: {
    ...mapState([
      'overlay',
      'area',
    ]),
  },
  mounted() {
    this.getCities();
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