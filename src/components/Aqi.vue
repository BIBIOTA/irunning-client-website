<template>
  <div>
    <v-row class="py-5 flex align-center">
      <v-col class="col-md-8">
        <div class="text-h7 text-center">
          空氣品質
        </div>
        <div class="text-h7 text-center">
          {{aqi.SiteName}}
        </div>
      </v-col>
    </v-row>
    <template v-if="Object.keys(aqi).length === 0">
      <div class="pa-15 text-center">
        <v-progress-circular
          indeterminate
          color="cyan"
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
      <ul class="dataList pl-0">
        <li v-for="(list, i) in lists" :key="`${i}_aqi`">
          <v-icon
            large
            :color="list.color"
          >
            {{list.icon}}
          </v-icon>
          <div class="text-center">
            {{list.name}}
          </div>
          <div class="text-center">
            {{list.value}}
          </div>
        </li>
      </ul>
      <div class="pa-5 text-center">
        {{status}}
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Aqi',
  data() {
    return {
      lists: [
        { name: 'AQI', value: null, color: 'grey darken-2', icon: 'mdi-emoticon-happy' },
        { name: 'PM2.5', value: null, color: 'grey darken-2', icon: 'mdi-emoticon-happy' },
        { name: 'PM10', value: null, color: 'grey darken-2', icon: 'mdi-emoticon-happy'},
      ],
      status: null,
      style: {
        good: {
          color: 'green darken-2',
          icon: 'mdi-emoticon-happy',
        },
        normal: {
          color: 'yellow darken-2',
          icon: 'mdi-emoticon-neutral',
        },
        orangeBad: {
          color: 'orange darken-2',
          icon: 'mdi-emoticon-neutral',
        },
        redBad: {
          color: 'red darken-2',
          icon: 'mdi-emoticon-dead',
        },
        purpleBad: {
          color: 'deep-purple darken-2',
          icon: 'mdi-emoticon-dead',
        },
        dangerBad: {
          color: 'red darken-4',
          icon: 'mdi-emoticon-dead',
        },
      },
    };
  },
  components: {
  },
  methods: {
    putData(data) {
      this.lists.forEach((item) => {
          Object.keys(data).forEach((key) =>  {
            if (key === item.name) {
              item.value = data[key];
            } else if (item.name === 'PM2.5' && key === 'PM2-5') {
              item.value = data[key];
            }
          }
          );
        });
      this.status = data.Status;
      this.styleProcess();
    },
    styleProcess() {
      this.lists.forEach((item, i) => {
        if (item.name === 'AQI') {
          this.lists[i] = {...item, ...this.getAqiStyle};
        } else if (item.name === 'PM2.5') {
          this.lists[i] = {...item, ...this.getPM25Style};
        } else if (item.name === 'PM10') {
          this.lists[i] = {...item, ...this.getPM10Style};
        }
      });
    },
  },
  watch: {
    aqi(data) {
      this.putData(data);
    },
  },
  computed: {
    ...mapState([
      'aqi',
    ]),
    computedAqi() {
      return this.aqi.AQI;
    },
    computedPM25() {
      return this.aqi['PM2-5'];
    },
    computedPM10() {
      return this.aqi.PM10;
    },
    getAqiStyle() {
      const value = this.computedAqi;
      if (value <= 50) {
        return this.style.good;
      } else if (value >= 51 && value <= 100) {
        return this.style.normal;
      } else if (value >= 101 && value <= 150) {
        return this.style.orangeBad;
      } else if (value >= 151 && value <= 200) {
        return this.style.redBad;
      } else if (value >= 201 && value <= 300) {
        return this.style.purpleBad;
      } else if (value >= 301) {
        return this.style.purpleBad;
      } else {
        return null
      }
    },
    getPM25Style() {
      const value = this.computedPM25;
      if (value <= 15.4) {
        return this.style.good;
      } else if (value >= 15.5 && value <= 35.4) {
        return this.style.normal;
      } else if (value >= 35.5 && value <= 54.4) {
        return this.style.orangeBad;
      } else if (value >= 54.5 && value <= 150.4) {
        return this.style.redBad;
      } else if (value >= 150.5 && value <= 250.4) {
        return this.style.purpleBad;
      } else if (value >= 250.5) {
        return this.style.purpleBad;
      } else {
        return null;
      }
    },
    getPM10Style() {
      const value = this.computedPM10;
      if (value <= 50) {
        return this.style.good;
      } else if (value >= 51 && value <= 100) {
        return this.style.normal;
      } else if (value >= 101 && value <= 254) {
        return this.style.orangeBad;
      } else if (value >= 255 && value <= 354) {
        return this.style.redBad;
      } else if (value >= 355 && value <= 424) {
        return this.style.purpleBad;
      } else if (value >= 425) {
        return this.style.purpleBad;
      } else {
        return null;
      }
    }
  },
  mounted() {
    if (Object.keys(this.aqi).length > 0) {
      this.putData(this.aqi);
    }
  },
}
</script>

<style scoped lang="scss">
</style>