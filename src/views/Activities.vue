<template>
  <v-main>
    <v-card>
      <v-col dense>
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
            @input="getDateRange"
            no-title
            scrollable
            range
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
        <div class="d-flex justify-center flex-wrap">
          <v-card
            class="ma-2"
            v-for="(data, i) in activities"
            :key="`activities_${i}`"
            max-width="600px"
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
        </div>
        <Loading />
        <NoData />
        <div class="text-center pa-4">
          <v-pagination
            v-model="pagination.page"
            @input="changePage($event)"
            :length="pagination.total"
            :total-visible="6"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-card>
  </v-main>
</template>
<script>
import _ from 'lodash';
import RunningInfo from '../components/RunningInfo.vue';
import NoData from '../components/NoData.vue';
import Loading from '../components/Loading.vue';
// import imgExample from '../assets/Actitivities/activitity_example.png';
import { activities } from '../libs/activities.js';
import { mapState, mapMutations } from 'vuex';

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
    NoData,
    Loading,
  },
  methods: {
    ...mapMutations([
      'setError',
      'setLoading',
      'setNoData',
    ]),
    routerPush(id) {
      this.$router.push({
        name: 'Activity',
        params: {id},
      });
    },
    getData(page) {
      this.setLoading(true);
      this.activities = [];
      activities.getActivities({page, ...this.searchData}).then((res) => {
        this.setLoading(false);
        if (res.status) {
          this.setNoData(false);
          this.activities = res.data.data;
          this.pagination = {
            page: res.data.current_page,
            total: res.data.last_page,
          };
        } else {
          this.setError(res.message);
          this.setNoData(true);
          this.pagination = {
            page: 1,
            total: 1,
          };
        }
      });
    },
    cleardateRangeText() {
      this.search.date = [];
      this.dateRangeText = null;
      this.setSearchDataAndResetPage();
    },
    getDateRange () {
      if (this.search.date[0] && this.search.date[1]) {
        this.setSearchDataAndResetPage();
        this.getDateRangeText();
      }
    },
    getDateRangeText() {
      this.dateRangeText = this.search.date.join(' ~ ');
    },
    setQuery(formData) {
      const { page, date } = formData;
      const query = {};
      if (date) {
        const [startDay, endDay] = date;
        _.set(query, 'startDay', startDay);
        _.set(query, 'endDay', endDay);
      }
      this.$router.push({
        params: { page },
        query,
      });
    },
    getQuery() {
      const { startDay, endDay } = this.$route.query;
      if (startDay && endDay) {
        this.search.date = [startDay, endDay];
        this.getDateRangeText();
      }
    },
    setSearchDataAndResetPage() {
      this.page = 1;
      const query = this.searchData;
      this.routerSet(this.page, query)
      this.getData(1);
    },
    routerSet(page, query) {
      this.$router.push({
        params: { page },
        query: { ...query },
      });
    },
    async changePage(newPage) {
      this.page = newPage;
      await this.routerSet(this.page, this.$route.query);
      this.activities = null;
      await this.getData(newPage);
    },
  },
  computed: {
    ...mapState([
      'login',
    ]),
    searchData() {
      const formData = {};
      _.set(formData, 'rows', 12);
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
  async mounted() {
    if (this.login) {
      this.page = await parseInt(this.$route.params.page);
      await this.getQuery();
      this.getData(this.$route.params?.page ?? 1);
    }
  },
}
</script>
