<template>
  <div>
    <v-card-title>
      我的跑步紀錄
    </v-card-title>
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateRangeText"
          label="查詢活動"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          clearable
          class="mx-4"
          height="35"
          @input="cleardateRangeText"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="search.date"
        no-title
        scrollable
        range
        locale="zh-tw"
      ></v-date-picker>
    </v-menu>
    <v-card
      class="ma-4"
      max-width="344"
      v-for="(data, i) in activities"
      :key="`activities_${i}`"
    >
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="cyan"
        >
          查看活動
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-center">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.total"
        :total-visible="6"
        circle
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import imgExample from '../assets/Actitivities/activitity_example.png';
import { activities } from '../libs/activities.js';
import { mapState } from 'vuex';
import polyline from '@mapbox/polyline';
import urljoin from 'url-join';

export default {
  name: 'Activities',
  data() {
    return {
      imgExample,
      dateMenu: false,
      activities: [],
      dateRangeText: null,
      search: {
        date: [],
      },
      pagination: {
        page: 1,
        total: 1,
      },
    };
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
        path,
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
    timeFormat(moving_time, format) {
      return this.moment.utc(moving_time*1000).format(format);
    },
    getData(id, page) {
      activities.getActivities({id, page, ...this.searchData}).then((res) => {
        if (res.status) {
          this.activities = res.data.data;
          this.pagination = {
            page: res.data.current_page,
            total: res.data.last_page,
          };
        } else {
          console.log(res.message);
        }
      });
    },
    cleardateRangeText() {
      this.search.date = [];
      this.dateRangeText = null;
      this.getData(this.loginData.id, this.pagination.page);
    },
    getDateRangeText () {
      if (this.search.date[0] && this.search.date[1]) {
        this.dateRangeText = this.search.date.join(' ~ ')
        this.getData(this.loginData.id, this.pagination.page);
      }
    },
  },
  computed: {
    ...mapState([
      'login',
      'loginData',
    ]),
    searchData() {
      const formData = {};
      Object.keys(this.search).forEach((key) => {
        if (this.search[key] !== null || this.search[key] !== '') {
          if (key === 'date') {
            if (this.search.date[0] && this.search.date[1]) {
              _.set(formData, 'startDay', this.search.date[0]);
              _.set(formData, 'endDay', this.search.date[1]);
            }
          }
        }
      });
      return formData;
    },
  },
  watch: {
    'pagination.page': {
      immediate: true,
      handler(newPage, oldPage) {
        if ((newPage && oldPage) && (newPage !== oldPage)) {
          this.activities = null;
          this.getData(this.loginData.id, newPage);
        }
      },
    },
    'search.date': {
      handler() {
        this.getDateRangeText();
      }
    },
  },
  mounted() {
    if (this.login) {
      this.getData(this.loginData.id, 1);
    }
  },
}
</script>