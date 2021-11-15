<template>
  <div
    class="ma-auto"
    tile
    v-if="memberIndex"
  >
    <!-- <v-row class="py-5 flex align-center">
      <v-col class="col-md-12">
        <div class="text-h5 text-center">
          Hello! Ota
        </div>
      </v-col>
    </v-row> -->
    <v-row class="py-5 flex ma-auto">
      <v-col class="col-md-12">
        <v-card class="ma-auto" height="220">
          <v-row>
            <v-col>
              <div class="pa-2">
                累積里程: 
              </div>
              <div class="text-center green--text text--darken-2 text-h3 font-weight-bold">
                {{memberIndex.totalDistance}}公里
              </div>
            </v-col>
          </v-row>
          <ul class="dataList pl-0 pr-2 py-8">
            <li>
              <div class="text-center">
                {{memberIndex.yearDistance}}公里
              </div>
              <div class="text-center">
                今年里程
              </div>
            </li>
            <v-divider
              inset
              vertical
            ></v-divider>
            <li>
              <div class="text-center">
                {{memberIndex.monthDistance}}公里
              </div>
              <div class="text-center">
                本月里程
              </div>
            </li>
            <v-divider
              inset
              vertical
            ></v-divider>
            <li>
            <li>
              <div class="text-center">
                {{memberIndex.weekDistance}}公里
              </div>
              <div class="text-center">
                本週里程
              </div>
            </li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapState, mapMutations } from 'vuex';
import { member } from '../libs/member.js';

export default {
  name: 'StravaIndex',
  data() {
    return {
      memberIndex: null
    };
  },
  methods: {
    ...mapMutations([
      'setError',
    ]),
    getData(id) {
      member.index(id).then((res) => {
        if (res.status) {
          this.memberIndex = res.data;
        }
      });
    },
  },
  computed: {
    ...mapState([
      'login',
      'loginData',
    ]),
  },
  mounted() {
    if (this.login) {
      const member = Cookies.get('member')?JSON.parse(Cookies.get('member')):false;
      if (member) {
        this.getData(member.id);
      }
    }
  },
}
</script>

<style scoped lang="scss">
</style>