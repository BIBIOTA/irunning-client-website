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
              @input="passVal($event.CityName, $event.AreaName, area.siteName);getWeather($event.CityName, $event.AreaName)"
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
import { aqi } from '../libs/aqi.js';
import { weather } from '../libs/weather.js';
import { member } from '../libs/member.js';
import { mapState, mapMutations } from 'vuex';
import Cookies from 'js-cookie';
import * as d3 from 'd3';
import TwGeoJson from '../assets/twGeoJson.json';

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
      'setLoginData',
    ]),
    getCities() {
      cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
        } else {
          this.cities = [],
          this.setError(res.message);
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
          this.getAqi();
        } else {
          this.districts = [],
          this.setWeather(null);
          this.setError(res.message);
        }
      });
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
    getAqi(point = []) {
      aqi.getAqi(this.area.county).then((res) => {
        if (res.status) {
          this.site = res.data;
          let aqiSite = res.data[0];
          let distance = null;
          res.data.forEach((data) => {
            if (point.length > 0) {
              const caculateDistance = d3.geoDistance(point, [data.Longitude, data.Latitude]) * 10000;
              if (!distance || distance < caculateDistance) {
                aqiSite = data;
              }
            }
            this.passVal(this.area.county, this.area.district, aqiSite.SiteName);
            this.setAqi(aqiSite);
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
    updateMemberLocation(area) {
      const data = { ...area, id: this.loginData.id };
      member.updateMemberLocation(data).then((res) => {
        if (res.status) {
          Cookies.set('member', JSON.stringify(res.data));
        } else {
          this.setError(res.message);
        }
      });
    },
    getLocation() {
      const vm = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else if (this.login) {
        const { county, district, siteName } = this.loginData;
        if (county && district && siteName) {
          this.passVal(county, district, siteName);
        } else {
          this.dialog = true;
        }
      }

      function showPosition(position) {
        const point = [position.coords.longitude, position.coords.latitude];
        const geoOut = TwGeoJson.features.filter((d) => {return d3.geoContains(d, point)});
        if (geoOut.length === 1) {
          const [geo] = geoOut;
          const { C_Name, T_Name } = geo.properties;
          vm.getDistrict(C_Name, T_Name);
          vm.getWeather(C_Name, T_Name);
          vm.getAqi(point);
        }
        const text = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
        console.log(text);
      }
    },
  },
  computed: {
    ...mapState([
      'area',
      'loginData',
      'login'
    ]),
  },
  watch: {
    'area': {
      deep: true,
      immediate: true,
      handler(data) {
        if (this.login) {
          this.updateMemberLocation(data);
        }
      },
    },
  },
  mounted() {
    this.getLocation();
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