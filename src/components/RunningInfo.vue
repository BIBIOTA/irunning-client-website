<template>
  <div>
    <v-card-text>
      <div>{{moment(data.start_date_local).format('LL')}} {{moment(data.start_date_local).format('LT')}}</div>
      <p class="text-h4 text--primary">
        {{data.name}}
      </p>
      <img v-if="data.summary_polyline" :src="getSrc(data.summary_polyline)" alt="activityImg">
      <div class="d-flex justify-space-between mt-5">
        <div class="text--primary">
          距離<br>
          {{data.distance}} km
        </div>
        <div class="text--primary">
          配速<br>
          {{data.pace}} km
        </div>
        <div class="text--primary">
          時間<br>
          <template v-if="parseInt(timeFormat(data.moving_time, 'HH')) > 0">
            {{timeFormat(data.moving_time, 'HH')}} 小時
          </template>
          <template v-if="parseInt(timeFormat(data.moving_time, 'mm')) > 0">
            {{timeFormat(data.moving_time, 'mm')}} 分
          </template>
          <template v-if="parseInt(timeFormat(data.moving_time, 'ss')) > 0">
            {{timeFormat(data.moving_time, 'ss')}} 秒
          </template>
        </div>
      </div>
    </v-card-text>
    <template v-if="moreInfo">
      <v-divider></v-divider>
      <v-card-text>
        <div class="text--primary d-flex" v-if="data.average_heartrate">
          平均心率
          <v-spacer></v-spacer>
          {{data.average_heartrate}} bpm
        </div>
        <div class="text--primary d-flex" v-if="data.max_heartrate">
          最大心率
          <v-spacer></v-spacer>
          {{data.max_heartrate}} bpm
        </div>
        <div class="text--primary d-flex" v-if="data.average_cadence">
          平均踏頻
          <v-spacer></v-spacer>
          {{Math.round(data.average_cadence * 2)}} spm
        </div>
        <div class="text--primary d-flex" v-if="data.calories">
          卡路里
          <v-spacer></v-spacer>
          {{data.calories}}
        </div>
        <div class="text--primary d-flex" v-if="data.device_name">
          紀錄裝置
          <v-spacer></v-spacer>
          {{data.device_name}}
        </div>
      </v-card-text>
      <GmapMap
        ref="map"
        v-if="data && data.start_latlng"
        :center="{lng: 0, lat: 0}"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
      >
        <GmapPolyline
          ref="polyline"
          :path="getPath(data.map.polyline)"
          :options="{ strokeColor:'#388E3C'}"
        />
      </GmapMap>
    </template>
  </div>
</template>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script> 
<script>
import polyline from '@mapbox/polyline';
import urljoin from 'url-join';

export default {
  name: 'RunningInfo',
  props: {
    data: {
      type: Object,
      required: true,
    },
    moreInfo: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    getSrc(map) {
      const mapData = polyline.decode(map);
      let path = '';
      for (let i = 0; i <= mapData.length -1; i ++) {
        if (i === 0) {
        path = `${mapData[i][0]}, ${mapData[i][1]}`;
        } else {
          path = `${path} | ${mapData[i][0]}, ${mapData[i][1]}`;
        }
      }
      const formData = {
        size: '600x300',
        maptype: 'roadmap',
        path: 'color:0x1D491E%7c'+path,
        key: 'AIzaSyAvjRz8URcOWoCuRfPqY2sab-4q_a-jo78',
      };
      let url = '';
      Object.keys(formData).forEach((key, i) => {
        if (i === 0) {
          url = `${key}=${formData[key]}`;
        } else {
          url = `${url}&${key}=${formData[key]}`
        }
      });
      return urljoin('https://maps.googleapis.com/maps/api/staticmap', `?${url}`);
    },
    getPath(map) {
      const mapData = polyline.decode(map);
      const path = [];
      for (let i = 0; i <= mapData.length -1; i ++) {
        const [lat, lng] = mapData[i];
        path.push({lat, lng});
      }
      return path;
    },
    timeFormat(moving_time, format) {
      return this.moment.utc(moving_time*1000).format(format);
    },
  },
  watch: {
    data(data) {
      if (this.moreInfo && data) {
        this.$nextTick(() => {
          this.$refs.map.$mapPromise.then(() => {
            const bounds = new google.maps.LatLngBounds();
            const { path } = this.$refs.polyline;
            if (path.length > 0) {
              path.forEach((geo) => {
                bounds.extend(geo);
              });
            }
            this.$refs.map.fitBounds(bounds);
          });
        })
      }
    },
  },
}
</script>