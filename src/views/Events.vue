<template>
  <v-main>
    <v-card>
      <v-row dense>
        <v-col
          cols="12"
          sm="6"
        >
          <v-card-title>
            全國賽會
          </v-card-title>
          <v-card-subtitle class="d-flex align-center mt-2">
            <span class="mx-2 d-flex text-no-wrap">
              <img class="cetificate" :src="iaaf" />
              IAAF認證賽事
            </span>
            <span class="mx-2 text-no-wrap">
              <img class="cetificate" :src="aims" />
              AIMS認證賽事
            </span>
            <span class="mx-2 text-no-wrap">
              <img class="cetificate" :src="courseOk" />
              本賽道經AIMS/IAAF丈量員丈量
            </span>
          </v-card-subtitle>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          cols="6"
          sm="6"
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
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="search.date"
              no-title
              scrollable
              range
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="6"
          sm="6"
          >
          <v-text-field
            v-model="search.keywords"
            append-icon="mdi-magnify"
            label="搜尋賽事"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="events"
        :options.sync="pagination"
        :search="search.keywords"
        :custom-filter="inputKeywords"
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
              <td>
                <div :class="{ 'text-decoration-line-through': !item.event_status }">
                  {{item.event_name}}
                  <img v-if="item.event_certificate" :src="getCertificateImg(item.event_certificate)">
                </div>
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
              </td>
              <td>
                {{item.event_date}} {{item.event_time ? moment(item.event_time, 'h:mm:ss').format('hh:mm') : ''}}
                </td>
              <td class="py-8">{{item.location}}</td>
              <td>
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="600"
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
                        :options.sync="pagination"
                        hide-default-footer
                      >
                        <template
                          v-slot:body="{ items }"
                        >
                          <tbody>
                            <tr
                              v-for="(item, i) in items"
                              :key="`event_${i}`"
                            >
                              <td class="py-4">{{item.name}}</td>
                              <td v-if="item.name === '里程'">
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
                              <td v-else-if="item.name === '報名連結'">
                                <a :href="item.value" target="_blank">
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
                              <td v-else>
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
    </v-card>
  </v-main>
</template>
<script>
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
      pagination: {
        itemsPerPage: -1,
      },
      dateMenu: false,
      search: {
        date: [],
        keywords: '',
      },
      headers: [
        {
          sortable: false,
          text: '賽事名稱',
          align: 'start',
          value: 'name',
        },
        {
          sortable: false,
          text: '日期',
          value: 'date',
        },
        {
          sortable: false,
          text: '地點',
          value: 'location',
        },
        {
          sortable: false,
          text: '',
          value: 'data-table-expand',
        },
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
  methods: {
    ...mapMutations([
      'setError',
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
    inputKeywords(value, search, item) {
      return search != null  && Object.keys(item).find(key => (key  === 'event_name' || key  === 'location') && item[key].toLowerCase().indexOf(search) !== -1)
    },
    searchData(startDay, endDay) {
      const formData = {
        startDay,
        endDay,
      };
      this.getData(formData);
    },
    getData(formData) {
      events.getEvents(formData).then((res) => {
        if (res.status) {
          this.events = res.data;
        } else {
          this.setError(res.message);
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
  },
  computed: {
    dateRangeText () {
      if (this.search.date[0] && this.search.date[1]) {
        this.searchData(this.search.date[0], this.search.date[1]);
        return this.search.date.join(' ~ ')
      }
      return null;
    },
  },
  mounted() {
    this.getData();
  },
}
</script>
<style lang="scss" scope>
  .td {
    display: flex;
    align-items: center;
  }
  .cetificate {
    height: 20px;
  }
</style>