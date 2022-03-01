<template>
  <v-card
    class="mx-auto my-5"
    v-if="memberIndex"
  >
    <v-row class="py-5 flex align-center">
      <v-col>
        <div>
          <div class="px-4">
            累積里程: 
          </div>
          <div class="text-center green--text text--darken-2 text-h3 font-weight-bold">
            {{memberIndex.totalDistance}}公里
          </div>
        </div>
        <ul class="dataList pt-8">
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
      </v-col>
    </v-row>
  </v-card>
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
    getData() {
      member.index().then((res) => {
        if (res.status) {
          this.memberIndex = res.data;
        }
      });
    },
  },
  computed: {
    ...mapState([
      'login',
    ]),
  },
  mounted() {
    if (this.login) {
      const member = Cookies.get('member') ?? false;
      if (member) {
        this.getData();
      }
    }
  },
}
</script>

<style scoped lang="scss">
</style>