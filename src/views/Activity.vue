<template>
  <v-main>
    <v-card
      v-show="computedHasData"
    >
      <RunningInfo :data="activity" :moreInfo="true" />
      <Backbtn class="mb-6" />
    </v-card>
    <Loading />
    <NoData />
  </v-main>
</template>
<script>
import RunningInfo from '../components/RunningInfo.vue';
import NoData from '../components/NoData.vue';
import Loading from '../components/Loading.vue';
import Backbtn from '../components/Backbtn.vue';
import { mapState, mapMutations } from 'vuex';
import { activities } from '../libs/activities.js';

export default {
  name: 'Activity',
  data() {
    return {
      activity: {},
    };
  },
  components: {
    RunningInfo,
    NoData,
    Loading,
    Backbtn,
  },
  methods: {
    ...mapMutations([
      'setError',
      'setLoading',
      'setNoData',
    ]),
    getData(runningUuid) {
      this.setLoading(true);
      activities.getActivity(runningUuid).then((res) => {
        this.setLoading(false);
        if (res.status) {
          this.setNoData(false);
          this.activity = res.data;
        } else {
          this.setError(res.message);
          this.setNoData(true);
        }
      });
    },
  },
  computed: {
    ...mapState([
      'login',
    ]),
    computedHasData() {
      return Object.keys(this.activity).length > 0;
    },
  },
  mounted() {
    if (this.login) {
      this.getData(this.$route.params.id);
    }
  },
}
</script>