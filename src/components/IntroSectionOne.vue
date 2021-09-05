<template>
  <v-sheet
    :color="transblack"
    height="100%"
    class="margin auto"
    tile
  >
    <v-row
      class="fill-height flex-column"
      align="center"
      justify="center"
      column
    >
      <div
        style="font-family: 'Pacifico', cursive !important;"
        class="py-6 text-h2 white--text">
        I running
      </div>
      <div
        class="pb-6 text-subtitle-1 font-weight-bold white--text text-center">
        串連Strava<br />
        追蹤你的跑步紀錄!
      </div>
      <StravaBtn />
      <v-card width="80%" class="mt-2" style="background-color: transparent;">
        <ul class="dataList pl-0 pr-2 py-8">
          <li>
            <div class="font-weight-bold text-center white--text">
              <CountTo :startVal='0' :endVal='distance.year' :duration='3000' />
              公里
            </div>
            <div class="font-weight-bold text-center white--text">
              今年里程
            </div>
          </li>
          <v-divider
            inset
            vertical
            color="white"
          ></v-divider>
          <li>
            <div class="font-weight-bold text-center white--text">
              <CountTo :startVal='0' :endVal='distance.month' :duration='3000' />
              公里
            </div>
            <div class="font-weight-bold text-center white--text">
              本月里程
            </div>
          </li>
          <v-divider
            inset
            vertical
            color="white"
          ></v-divider>
          <li>
          <li>
            <div class="font-weight-bold text-center white--text">
              <CountTo :startVal='0' :endVal='distance.week' :duration='3000' />
              公里
            </div>
            <div class="font-weight-bold text-center white--text">
              本週里程
            </div>
          </li>
        </ul>
      </v-card>
    </v-row>
  </v-sheet>
</template>
<script>
import StravaBtn from './StravaBtn.vue';
import CountTo from 'vue-count-to';

export default {
  name: 'IntroSectionOne',
  props: {
    transblack: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      distance: {
        year: 1000,
        month: 100,
        week: 20,
      },
    };
  },
  components: {
    StravaBtn,
    CountTo,
  },
}
</script>