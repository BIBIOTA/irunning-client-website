<template>
  <v-main>
    <v-card>
      <v-col dense>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-card-title>
              全國賽會
            </v-card-title>
            <v-card-subtitle class="flex-column align-center mt-2">
              <div class="ma-2 d-flex text-no-wrap grey--text text--darken-2">
                <img class="cetificate" :src="iaaf" />
                IAAF認證賽事
              </div>
              <div class="ma-2 text-no-wrap grey--text text--darken-2">
                <img class="cetificate" :src="aims" />
                AIMS認證賽事
              </div>
              <div class="ma-2 text-no-wrap grey--text text--darken-2">
                <img class="cetificate" :src="courseOk" />
                本賽道經AIMS/IAAF丈量員丈量
              </div>
            </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col
            class="mx-auto"
            cols="11"
            sm="11"
            >
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
                  label="日期區間"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                  height="35"
                  @input="cleardateRangeText"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="search.date"
                @input="getDateRange()"
                no-title
                scrollable
                range
                locale="zh-tw"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            class="mx-auto"
            cols="11"
            sm="11"
            >
            <v-select
              v-model="search.distances"
              :items="distances"
              item-text="name"
              label="賽事里程"
              multiple
              chips
              height="35"
              clearable
              @input="setSearchDataAndResetPage()"
              class="select_distances"
            ></v-select>
          </v-col>
          <v-col
            class="mx-auto"
            cols="11"
            sm="11"
            >
            <v-text-field
              v-model="search.keywords"
              append-icon="mdi-magnify"
              label="搜尋賽事"
              single-line
              hide-details
              height="35"
              @keyup.enter="setSearchDataAndResetPage()"
            ></v-text-field>
          </v-col>
          <v-col
            class="d-flex justify-end py-4 pr-4"
            cols="12"
            sm="11"
            >
            <v-btn
              color="#F64906"
              elevation="2"
              medium
              class="white--text"
              @click="setSearchDataAndResetPage()"
            >
                查詢
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          mobile-breakpoint="0"
          :items="events"
          :options.sync="pagination"
          hide-default-footer
          item-key="name"
          class="elevation-1"
          dense
        >   
          <template
            v-slot:body="{ items }"
          >
            <tbody>
              <tr
                v-for="(item, i) in items"
                :key="`${item.name}_${i}`"
              >
                <td class="py-2" style="width: 40%">
                  <div>
                    <div :class="{ 'text-decoration-line-through': !item.event_status }">
                      {{item.event_name}}
                      <img v-if="item.event_certificate" :src="getCertificateImg(item.event_certificate)">
                    </div>
                    <div>
                      <template v-for="(data, i) in item.distance">
                        <v-chip
                          color="green darken-2"
                          text-color="white"
                          x-small
                          class="mx-1"
                          v-if="data.event_distance"
                          :key="`distance_${item.name}_${i}`"
                        >
                          {{ data.event_distance }}
                        </v-chip>
                      </template>
                    </div>
                  </div>
                </td>
                <td style="width: 30%">
                  {{item.event_date}} {{item.event_time ? moment(item.event_time, 'h:mm:ss').format('hh:mm') : ''}}
                </td>
                <!-- <td class="py-8">{{item.location}}</td> -->
                <td>
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="480"
                  >
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-card-title :class="{ 'text-decoration-line-through': !dialogTitle.event_status }">
                          {{dialogTitle.event_name}}
                          <img v-if="dialogTitle.event_certificate" class="cetificate mx-2" :src="getCertificateImg(item.event_certificate)">
                        </v-card-title>


                        <v-data-table
                          v-if="event"
                          :items="event"
                          hide-default-footer
                        >
                          <template
                            v-slot:body="{ items }"
                          >
                            <tbody>
                              <tr
                                v-for="(item, i) in items"
                                :key="`event_${i}`"
                                class="bb-grey"
                              >
                                <td class="py-4 bd-none">{{item.name}}</td>
                                <td class="bd-none" v-if="item.name === '里程'">
                                  <template v-for="(data, i) in item.value">
                                    <v-chip
                                      color="green darken-2"
                                      text-color="white"
                                      x-small
                                      class="mx-1"
                                      v-if="data.event_distance"
                                      :key="`event_distance_${item.name}_${i}`"
                                    >
                                      {{ data.event_distance }}
                                    </v-chip>
                                  </template>
                                </td>
                                <td class="bd-none" v-else-if="item.name === '報名連結'">
                                  <a :href="item.value" target="_blank" v-if="item.value">
                                    <v-btn
                                      color="cyan"
                                      elevation="2"
                                      small
                                      class="white--text"
                                    >
                                        點擊開啟
                                    </v-btn>
                                  </a>
                                </td>
                                <td class="bd-none" v-else>
                                  {{item.value}}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-data-table>

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
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="cyan"
                        elevation="2"
                        small
                        class="white--text"
                        v-bind="attrs"
                        v-on="on"
                        @click="processEventData(item)"
                      >
                        更多資訊
                      </v-btn>
                    </template>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <Loading />
        <NoData />
        <div class="text-center">
          <v-pagination
            v-model="page"
            @input="changePage($event)"
            :length="total"
            :total-visible="6"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-card>
  </v-main>
</template>
<script>
import NoData from '../components/NoData.vue';
import Loading from '../components/Loading.vue';
import { mapMutations } from 'vuex';
import { events } from '../libs/events.js';
import _ from 'lodash';
import iaaf from '../assets/logo/iaaf.gif';
import aims from '../assets/logo/aims_logo.gif';
import courseOk from '../assets/logo/course_ok.png';

const dataName = {
  event_date: '舉辦日期',
  event_time: '起跑時間',
  location: '地點',
  distance: '里程',
  agent: '承辦單位',
  participate: '報名日期',
  link: '報名連結',
};

export default {
  name: 'Events',
  data() {
    return {
      iaaf,
      aims,
      courseOk,
      page: 1,
      total: 1,
      pagination: {
        itemsPerPage: -1,
      },
      dateMenu: false,
      dateRangeText: null,
      search: {
        date: [],
        distances: '',
        keywords: '',
      },
      headers: [
        {
          sortable: false,
          text: '賽事名稱',
          align: 'start',
          value: 'name',
          width: '40%',
        },
        {
          sortable: false,
          text: '日期',
          value: 'date',
          width: '30%',
        },
        // {
        //   sortable: false,
        //   text: '地點',
        //   value: 'location',
        // },
        {
          sortable: false,
          text: '',
          value: 'data-table-expand',
          width: '20%',
        },
      ],
      distances: [
        {name:'全馬', value: 1},
        {name:'半馬', value: 2},
        {name:'三鐵', value: 3},
      ],
      events: [],
      dialogTitle: { 
        event_name: '',
        event_status: 1,
        event_certificate: null,
      },
      event: [],
    }
  },
  components: {
    NoData,
    Loading,
  },
  methods: {
    ...mapMutations([
      'setError',
      'setLoading',
      'setNoData',
    ]),
    getCertificateImg(certificate) {
      let img;
      switch (certificate) {
        case 1:
          img = this.iaaf;
          break;
        case 2:
          img = this.aims;
          break;
        case 3:
          img = this.courseOk;
          break;
        default:
          break;
      }
      return img;
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
    getData() {
      const formData = {};
       _.set(formData, 'page', this.$route.params.page);
      const { date, distances, keywords } = this.search;
      const [startDay, endDay] = date;
      if (startDay && endDay) {
        _.set(formData, 'startDay', startDay);
        _.set(formData, 'endDay', endDay);
      }
      if (distances) {
        _.set(formData, 'distances', distances);
      }
      if (keywords) {
        _.set(formData, 'keywords', keywords);
      }
      this.setLoading(true);
      this.events = [];
      events.getEvents(formData).then((res) => {
        this.setLoading(false);
        if (res.status) {
          this.setNoData(false);
          this.events = res.data.data;
          this.page = res.data.current_page;
          this.total = res.data.last_page;
          this.setQuery(formData);
        } else {
          this.setError(res.message);
          this.setNoData(true);
          this.page = 1;
          this.total = 1;
          this.events = [];
        }
      });
    },
    async processEventData(data) {
      this.event = [];
      this.dialogTitle.event_name = data.event_name;
      this.dialogTitle.event_status = data.event_status;
      this.dialogTitle.event_certificate = data.event_certificate;
      const arr = []
        Object.keys(dataName).forEach((nameKey) => {
          Object.keys(data).forEach((key) => {
          if (key === nameKey) {
            const obj = {};
            _.set(obj, 'name', dataName[nameKey]);
            _.set(obj, 'value', data[key]);
            arr.push(obj);
          }
        });
      });
      this.event = arr;
    },
    getSearchData() {
      const formData = {};
      const { date, distances, keywords } = this.search;
      const [startDay, endDay] = date;
      if (startDay && endDay) {
        _.set(formData, 'startDay', startDay);
        _.set(formData, 'endDay', endDay);
      }
      if (distances) {
        _.set(formData, 'distances', distances);
      }
      if (keywords) {
        _.set(formData, 'keywords', keywords);
      }
      return formData;
    },
    setQuery(formData) {
      const { page, date, ...data } = formData;
      const query = { ...data };
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
      const { startDay, endDay, distances, keywords } = this.$route.query;
      if (startDay && endDay) {
        this.search.date = [startDay, endDay];
        this.getDateRangeText();
      }
      if (distances) {
        this.search.distances = distances;
      }
      if (keywords) {
        this.search.keywords = keywords;
      }
    },
    setSearchDataAndResetPage() {
      this.page = 1;
      const query = this.getSearchData();
      this.routerSet(this.page, query)
      this.getData();
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
      await this.getData();
    },
  },
  async mounted() {
    this.page = await parseInt(this.$route.params.page);
    await this.getQuery();
    await this.getData();
  },
}
</script>
<style lang="scss" scope>
  .select_distances {
    label.v-label {
      top: 10px;
    }
    label.v-label--active {
      top: 0px;
    }
  }
  tbody, tfoot, thead, tr, th, td {
    vertical-align: middle !important;
  }
  .bb-grey {
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
  .bd-none {
    border: none !important;
  }
  .cetificate {
    margin-right: 10px;
    height: 20px;
  }
</style>