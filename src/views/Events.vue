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
            <v-spacer></v-spacer>
          </v-card-title>
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
              v-model="date"
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
            v-model="search"
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
                      <v-card-title :class="{ 'text-decoration-line-through': !dialogTitle.event_status }">{{dialogTitle.event_name}}</v-card-title>


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

const dataName = {
  event_date: '舉辦日期',
  event_time: '起跑時間',
  location: '地點',
  distance: '里程',
  agent: '承辦單位',
  participate: '報名日期',
};

export default {
  name: 'Events',
  data() {
    return {
      pagination: {
        itemsPerPage: -1,
      },
      date: [],
      dateMenu: false,
      search: '',
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
      dialogTitle: { event_name: '', event_status: 1 },
      event: [],
    }
  },
  methods: {
    ...mapMutations([
      'setError',
    ]),
    getData() {
      events.getEvents().then((res) => {
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
      if (this.date[0] && this.date[1]) {
        return this.date.join(' ~ ')
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
</style>