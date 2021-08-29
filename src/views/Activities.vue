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
      <RunningInfo :data="data" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="cyan"
          @click="routerPush(data.id)"
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
import RunningInfo from '../components/RunningInfo.vue';
// import imgExample from '../assets/Actitivities/activitity_example.png';
import { activities } from '../libs/activities.js';
import { mapState } from 'vuex';

export default {
  name: 'Activities',
  data() {
    return {
      // imgExample,
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
  components: {
    RunningInfo,
  },
  methods: {
    routerPush(id) {
      this.$router.push({
        name: 'Activity',
        params: {id},
      });
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