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
          color="primary"
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
              v-model="area.city_name"
              :items="cities"
              label="請選擇縣市"
              item-text="city_name"
              @input="getDistricts(computedCityId);getAqis(computedCityId)"
            ></v-select>
          </v-card-text>
          <v-card-title>
            請填寫居住的鄉鎮區
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="area.district_name"
              :items="districts"
              label="請選擇鄉鎮區"
              item-text="district_name"
              @input="getWeather(computedDistrictId)"
            ></v-select>
          </v-card-text>
          <v-card-title>
              請選擇空氣品質測量站
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="area.aqi_name"
              :items="aqis"
              label="請選擇測量站"
              item-text="sitename"
              @input="getAqi($event)"
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
      aqis: [],
      point: null,
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
    /* ===== 取得縣市資料 ======= */
    getCities() {
      return cities.getCities().then((res) => {
        if (res.status) {
          this.cities = res.data;
          return this.cities;
        } else {
          this.cities = [],
          this.setError(res.message);
          return false;
        }
      });
    },
    /* ===== 取得鄉鎮區資料 ======= */
    getDistricts(city_id, defaultlocation = null) {
      return districts.getDistricts(city_id).then((res) => {
        if (res.status) {
          this.districts = res.data;
          if (!defaultlocation) {
            this.area.district_name = res.data[0].district_name;
            this.getWeather(this.computedDistrictId);
          }
          return this.districts;
        } else {
          this.districts = [];
          this.setWeather(null);
          this.setError(res.message);
          return false;
        }
      });
    },
    /* ===== 取得空氣品質資料 ======= */
    getAqis(city_id) {
      return aqi.getAqis(city_id).then((res) => {
        if (res.status) {
          this.aqis = res.data;
          /* 如果第一次取得資料，預設初始值 */
          let aqi = null;
          this.area.aqi_name = this.aqis[0].id;
          aqi = this.aqis[0];
          if (this.point && this.point.length > 0) {
            aqi = this.getGPSAqiPosition(this.point, res.data);
          }
          this.setAqi(aqi);
          this.setArea({ aqi_name: aqi.sitename });
          this.setOverlay(false);
          return res.data;
        } else {
          this.setAqi({});
          this.setError(res.message);
          return false;
        }
      });
    },
    getGPSAqiPosition(point, data) {
      let aqi = null;
      let distance = null;
      data.forEach((data) => {
        const caculateDistance = d3.geoDistance(point, [data.longitude, data.latitude]);
        if (!distance || distance > caculateDistance) {
          distance = caculateDistance;
          aqi = data;
        }
      });
      return aqi;
    },
    getAqi(sitename) {
      if (sitename) {
        const data = this.aqis.find((item) => item.sitename === sitename);
        if (data) {
          this.setAqi(data);
          this.setArea({ aqi_name: sitename });
          return data;
        }
        return false;
      }
      return false;
    },
    /* ===== 取得空氣品質資料 end ======= */

    /* ===== 取得天氣資料 ======= */
    getWeather(district_id) {
      this.setWeather({});
      return weather.getWeather(district_id).then((res) => {
        if (res.status) {
          this.setWeather(res.data);
          return res.data;
        } else {
          this.setWeather({});
          this.setError(res.message);
          return false;
        }
      });
    },
    /* ===== 取得天氣資料 end ======= */

    /* ===== GPS function ====== */
    getCurrentPosition() {
      if (navigator.geolocation) {
        const point = new Promise((resolve, reject) =>
          navigator.permissions ?
  
            // Permission API is implemented
            navigator.permissions.query({
              name: 'geolocation'
            }).then(permission =>
              // is geolocation granted?
              permission.state === "granted"
                ? navigator.geolocation.getCurrentPosition(pos => resolve([pos.coords.longitude, pos.coords.latitude])) 
                : resolve(null)
            ) :
  
          // Permission API was not implemented
          reject(new Error("Permission API is not supported"))
        )
        if (point) {
          this.point = point;
          return point;
        }
      }
      return false;
    },
    getGeoLocationCityAndDistrict (point) {
      if (point) {
        const [lng, lat] = point;
        return node.district({ lng, lat }).then((res) => {
          if (res.status) {
            const { C_Name, T_Name } = res.data;
            return {
              city_name: C_Name,
              district_name: T_Name,
            };
          } else {
            this.setError(res.message);
            return false;
          }
        }).catch((err) => {
          console.log(err);
          this.setError('發生例外錯誤: 無法取得所在行政區');
          return false;
        });
      } else {
        this.setError('發生例外錯誤: 沒有GPS資料');
        return false;
      }
    },
    /* ===== GPS function end ====== */
  },
  computed: {
    ...mapState([
      'area',
      'login'
    ]),
    computedCityId() {
      let city_id = null;
      if (this.area.city_name && this.cities.length > 0) {
        this.cities.forEach((item) => {
          if (item.city_name === this.area.city_name) {
            city_id = item.id;
          }
        });
      }
      return city_id;
    },
    computedDistrictId() {
      let district_id = null;
      if (this.area.district_name && this.districts.length > 0) {
        this.districts.forEach((item) => {
          if (item.district_name === this.area.district_name) {
            district_id = item.id;
          }
        });
      }
      return district_id;
    },
    computedAqiId() {
      let aqi_id = null;
      if (this.area.aqi_name && this.aqis.length > 0) {
        this.aqis.forEach((item) => {
          if (item.sitename === this.area.aqi_name) {
            aqi_id = item.id;
          }
        });
      }
      return aqi_id;
    },
  },
  async mounted() {
    const defautLocation = {
      city_name: '臺北市',
      district_name: '北投區',
      aqi_name: '士林',
    };
    /* 如果確認有開啟定位，取得GPS位置，呼叫api取得目前所在的縣市及鄉鎮區 */
    const point = await this.getCurrentPosition();
    if (point) {
      const geoLocationCityAndDistrict = await this.getGeoLocationCityAndDistrict(point);
      if (geoLocationCityAndDistrict) {
        defautLocation.city_name = geoLocationCityAndDistrict.city_name;
        defautLocation.district_name = geoLocationCityAndDistrict.district_name;
        defautLocation.aqi_name = null;
      }
    }
    await this.setArea(defautLocation);
    await this.getCities();
    await this.getDistricts(this.computedCityId, defautLocation.district_name);
    await this.getWeather(this.computedDistrictId);
    await this.getAqis(this.computedCityId);
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