<template>
  <v-main>
    <v-card>
      <v-row>
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
      <v-row>
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
        hide-default-footer
      >
        <template v-slot:item="events">
            <tr>
              <td class="td">
                {{events.item.name}}
                <div>
                  <v-chip
                    color="green darken-2"
                    v-for="(data, i) in events.item.distance"
                    text-color="white"
                    x-small
                    class="mx-1"
                    :key="`distance_${events.item.name}_${i}`"
                  >
                    {{ data }}
                  </v-chip>
                </div>
              </td>
              <td>
                <template v-for="(data, i) in events.item.date">
                  <span :key="`date_${events.item.name}_${i}`">
                    {{data}}
                  </span>
                </template>
                </td>
              <td>{{events.item.location}}</td>
              <td>
                  <v-btn
                    color="cyan"
                    elevation="2"
                    small
                    class="white--text"
                  >
                    更多資訊
                  </v-btn>
              </td>
            </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-main>
</template>
<script>
export default {
  name: 'Events',
  data() {
    return {
      date: [],
      dateMenu: false,
      search: '',
      headers: [
        {
          sortable: false,
          text: '賽事名稱',
          align: 'start',
          value: 'name',
          class: 'td',
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
      events: [
        {
          id: '1',
          name: '台北馬拉松',
          distance: ['42k', '21k'],
          date: ['2021-12-20'],
          location: '台北市政府前廣場',
        },
        {
          id: '2',
          name: '台北馬拉松',
          distance: ['42k', '21k'],
          date: ['2021-12-20', '06:00'],
          location: '台北市政府前廣場',
        },
        {
          id: '3',
          name: '台北馬拉松',
          distance: ['42k'],
          date:  ['2021-12-20', '06:00'],
          location: '台北市政府前廣場',
        },
      ],
    }
  },
  computed: {
    dateRangeText () {
      if (this.date[0] && this.date[1]) {
        return this.date.join(' ~ ')
      }
      return null;
    },
  },
}
</script>
<style lang="scss" scope>
  .td {
    display: flex;
    align-items: center;
  }
</style>