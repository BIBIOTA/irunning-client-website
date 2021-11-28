<template>
  <v-col cols="2">
    <v-dialog
      v-model="dialog"
      max-width="480"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
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
          <Overlay :message="'資料讀取中...'" />
          <v-card-title>
            請填寫居住的縣市
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
            請填寫居住的鄉鎮區
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="area.district"
              :items="districts"
              label="請選擇鄉鎮區"
              item-text="AreaName"
              @input="setAreaData($event.CityName, $event.AreaName, area.siteName);getWeather($event.CityName, $event.AreaName)"
              return-object
            ></v-select>
          </v-card-text>
          <v-card-title>
              請選擇空氣品質測量站
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
</template>

<script>
import Overlay from './Overlay.vue';
import { cities } from '../libs/cities.js';
import { districts } from '../libs/districts.js';
import { aqi } from '../libs/aqi.js';
import { weather } from '../libs/weather.js';
import { node } from '../libs/node.js';
import { mapState, mapMutations } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'Weather',
  data() {
    return {
      dialog: false,
      cities: [],
      districts: [],
      site: [],
    };
  },
  components: {
    Overlay,
  },
  methods: {
    ...mapMutations([
      'setOverlay',
      'setAqi',
      'setArea',
      'setWeather',
      'setError',
    ]),
    getCities(county = null, propsDistrict = null, point = []) {
      cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
        } else {
          this.cities = [],
          this.setError(res.message);
        }
      }).then(() => {
        this.getDistrict(county ?? this.area.county, propsDistrict ?? this.area.district, point);
      });
    },
    getDistrict(county, propsDistrict = null, point = []) {
      this.setOverlay(true);
      districts.getDistricts(county).then((res) => {
        if (res.status) {
          this.districts = res.data;
          const district = res.data.filter((data) => data.AreaName === propsDistrict).length > 0 ? propsDistrict : this.districts[0].AreaName;
          this.setAreaData(county, district, this.area.siteName);
          this.getWeather(county, district);
          this.getAqi(point);
        } else {
          this.districts = [],
          this.setWeather(null);
          this.setError(res.message);
        }
      });
    },
    getAqi(point = []) {
      aqi.getAqi(this.area.county).then((res) => {
        if (res.status) {
          this.site = res.data;
          let aqiSite = this.hasAqiData(res) ?? res.data[0];
          if (point.length > 0) {
            let distance = null;
            res.data.forEach((data) => {
              const caculateDistance = d3.geoDistance(point, [data.Longitude, data.Latitude]);
              if (!distance || distance > caculateDistance) {
                distance = caculateDistance;
                aqiSite = data;
              }
            });
          }
          this.setAqi(aqiSite);
          this.setAreaData(this.area.county, this.area.district, aqiSite);
          this.setOverlay(false);
        } else {
          this.setAqi({});
          this.setError(res.message);
        }
      });
    },
    hasAqiData (res) {
      if (res.data.filter((item) => item.SiteName === this.area.siteName).length === 1) {
        return res.data.filter((item) => item.SiteName === this.area.siteName)[0];
      }
    },
    getAqiData(county, district, siteName) {
      this.site.forEach((data) => {
        if (siteName === data.SiteName) {
          this.setAqi(data);
        }
      });
      this.setAreaData(county, district, siteName);
    },
    getWeather(county, district) {
      this.setWeather({});
      weather.getWeather(county, district).then((res) => {
        if (res.status) {
          this.setWeather(res.data);
        } else {
          this.setWeather({});
          this.setError(res.message);
        }
      });
    },
    setAreaData(county, district, siteName = null) {
      const data = { county, district, siteName };
      this.setArea(data);
    },
    getLocation() {
      this.getCities();
      if (navigator.geolocation) {
        this.getCurrentPosition();
      } else {
        this.getMyLocation();
      }
    },
    getCurrentPosition() {
      let point = null;
      navigator.geolocation.getCurrentPosition((position) => {
        if (position?.coords?.longitude && position?.coords?.latitude) {
          point = [position.coords.longitude, position.coords.latitude];
          this.getGeoLocation(point);
        }
      });
      if (point === null) {
        this.getMyLocation();
      }
    },
    getMyLocation() {
      const { county, district, siteName } = this.area;
      if (county && district && siteName) {
        this.getAqiData(county, district, siteName);
      } else if (county && district) {
        this.setAreaData(county, district, siteName ?? null);
      }
    },
    getGeoLocation (point) {
      const [lng, lat] = point;
      node.district({ lng, lat }).then((res) => {
        console.log(res);
        if (res.status) {
          const { C_Name, T_Name } = res.data;
          console.log(C_Name, T_Name);
          this.getCities(C_Name, T_Name, point);
        } else {
          this.setError(res.message);
          this.getCities();
        }
      }).catch((err) => {
        console.log(err);
        this.setError('發生例外錯誤: 無法取得所在行政區');
        this.getCities();
      });
    },
  },
  computed: {
    ...mapState([
      'area',
      'login'
    ]),
  },
  mounted() {
    this.getLocation();
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